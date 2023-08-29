const { ReceiptModel } = require('../initDBandSeed/db');

const createReceipt = async (req, res) => {
    try {
        const { total } = req.body;
        // if (!total) {
        //     return res.status(400).json({ error: 'total is required' });
        // }
        const deletedCount = await ReceiptModel.destroy({
            where: {
                closed: true
            }
        });

        const receipt = await ReceiptModel.create({ total });
        res.status(201).json(receipt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateReceipt = async (req, res) => {
    try {
        const { receiptId } = req.params;
        const { total, closed } = req.body
        
        const receipt = await ReceiptModel.findOne({ where: { id: receiptId } });

        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }

        receipt.total = total;
        receipt.closed = closed;
        await receipt.save();
    
        res.json({ message: 'Receipt updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeReceipt = async (req, res) => {
    try {
        const { receiptId } = req.params;

        const receipt = await ReceiptModel.findByPk(receiptId);
    
        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }
    
        await receipt.destroy();
        res.json({ message: 'Receipt removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createReceipt,
    updateReceipt,
    removeReceipt
}