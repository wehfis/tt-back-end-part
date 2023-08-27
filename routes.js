const express = require('express');
const router = express.Router();
const receiptController = require('./controllers/receiptController');

// Отримання всіх товарів
router.get('/products', receiptController.getAllProducts);
// Створення нового чеку
router.post('/receipts', receiptController.createReceipt);
// Додати чек
router.post('/receipts/:receiptId/addProduct/:productId', receiptController.addProductToReceipt);
// Вилучити чек
router.delete('/receipts/:receiptId/removeProduct/:productId', receiptController.removeProductFromReceipt);
// Змінити кількість товару в чеку
router.put('/receipts/:receiptId/updateProduct/:productId', receiptController.updateProductInReceipt);
// Закрити чек
router.put('/receipts/:receiptId/close', receiptController.closeReceipt);


module.exports = router;
