const { ReceiptModel } = require('../initDBandSeed/db');

const createReceipt = async (req, res) => {
    try {
        const { total } = req.body;
        if (!total) {
            return res.status(400).json({ error: 'total is required' });
        }
        const receipt = await ReceiptModel.create({ total });
        res.status(201).json(receipt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const closeReceipt = async (req, res) => {
    try {
        const { receiptId } = req.params;

        const receipt = await ReceiptModel.findByPk(receiptId);
    
        if (!receipt) {
          return res.status(404).json({ message: 'Receipt not found' });
        }
        if (receipt.closed) {
          return res.status(400).json({ message: 'Receipt is already closed' });
        }
    
        await ReceiptModel.update(
          { date: new Date(), closed: true },
          { where: { id: receiptId, closed: false } }
        );
    
        res.json({ message: 'Receipt closed' });
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
    closeReceipt,
    removeReceipt
}