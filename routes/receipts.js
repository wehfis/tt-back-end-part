const express = require('express');
const router = express.Router();
const { createReceipt, updateReceipt, removeReceipt } = require('../controllers/receiptController');

// Створення нового чеку
router.post('/', createReceipt);
// Оновити чек
router.put('/:receiptId/updateReceipt', updateReceipt);
// Видалити чек
router.delete('/:receiptId', removeReceipt);


module.exports = router;
