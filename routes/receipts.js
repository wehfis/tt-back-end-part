const express = require('express');
const router = express.Router();
const { createReceipt, closeReceipt, removeReceipt } = require('../controllers/receiptController');

// Створення нового чеку
router.post('/', createReceipt);
// Закрити чек
router.put('/:receiptId/close', closeReceipt);
// Видалити чек
router.delete('/:receiptId', removeReceipt);


module.exports = router;
