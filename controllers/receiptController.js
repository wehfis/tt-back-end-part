const Product = require('../models/Product').default;
const Receipt = require('../models/Receipt').default;
const ProductInReceipt = require('../models/ProductInReceipt').default;

exports.getAllProducts = async (req, res) => {
  try {
        const products = await Product.findAll();
        res.json(products);
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createReceipt = async (req, res) => {
    try {
        const { total } = req.body;
        const receipt = await Receipt.create({ total });
        res.status(201).json(receipt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addProductToReceipt = async (req, res) => {
    try {
        const { receiptId, productId } = req.params;
        const { quantity, price } = req.body;
    
        const productInReceipt = await ProductInReceipt.create({
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

exports.removeProductFromReceipt = async (req, res) => {
    try {
        const { receiptId, productId } = req.params;
    
        const productInReceipt = await ProductInReceipt.findOne({
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

exports.updateProductInReceipt = async (req, res) => {
    try {
        const { receiptId, productId } = req.params;
        const { quantity, price } = req.body;
    
        const productInReceipt = await ProductInReceipt.findOne({
            where: {
            ReceiptId: receiptId,
            ProductId: productId,
            },
        });
    
        if (!productInReceipt) {
            return res.status(404).json({ message: 'Product not found in receipt' });
        }
    
        productInReceipt.quantity = quantity;
        await productInReceipt.save();
  
      res.json({ message: 'Product quantity updated in receipt' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.closeReceipt = async (req, res) => {
    try {
        const { receiptId } = req.params;

        const receipt = await Receipt.findByPk(receiptId);
    
        if (!receipt) {
          return res.status(404).json({ message: 'Receipt not found' });
        }
        if (receipt.closed) {
          return res.status(400).json({ message: 'Receipt is already closed' });
        }
    
        await Receipt.update(
          { date: new Date(), closed: true },
          { where: { id: receiptId, closed: false } }
        );
    
        res.json({ message: 'Receipt closed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};