const { ProductInReceiptModel } = require('../initDBandSeed/db');

const addProductToReceipt = async (req, res) => {
    try {
        const { receiptId, productId } = req.params;
        const { quantity, price } = req.body;
    
        const productInReceipt = await ProductInReceiptModel.create({
            quantity,
            price,
            ReceiptId: receiptId,
            ProductId: productId,
        });
    
        res.status(201).json({ message: 'Product added to receipt', productInReceipt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeProductFromReceipt = async (req, res) => {
    try {
        const { receiptId, productId } = req.params;
    
        const productInReceipt = await ProductInReceiptModel.findOne({
            where: {
            ReceiptId: receiptId,
            ProductId: productId,
            },
        });
    
        if (!productInReceipt) {
            return res.status(404).json({ message: 'Product not found in receipt' });
        }
    
        await productInReceipt.destroy();
        res.json({ message: 'Product removed from receipt' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProductInReceipt = async (req, res) => {
    try {
        const { receiptId, productId } = req.params;
        const { quantity, price } = req.body;
    
        const productInReceipt = await ProductInReceiptModel.findOne({
            where: {
            ReceiptId: receiptId,
            ProductId: productId,
            },
        });
    
        if (!productInReceipt) {
            return res.status(404).json({ message: 'Product not found in receipt' });
        }
    
        productInReceipt.quantity = quantity;
        productInReceipt.price = price;
        await productInReceipt.save();
  
        res.json({ message: 'Product quantity updated in receipt' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addProductToReceipt,
    removeProductFromReceipt,
    updateProductInReceipt
}