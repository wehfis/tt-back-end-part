const express = require('express');
const router = express.Router();
const  { 
    addProductToReceipt,
    removeProductFromReceipt,
    updateProductInReceipt
} = require('../controllers/prodInResController.js')

// Додати товар до чеку
router.post('/:receiptId/addProdInRes/:productId', addProductToReceipt);
// Вилучити товар з чеку
router.delete('/:receiptId/removeProdInRes/:productId', removeProductFromReceipt);
// Змінити кількість товару в чеку
router.put('/:receiptId/updateProdInRes/:productId', updateProductInReceipt);


module.exports = router;
