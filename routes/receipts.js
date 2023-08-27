const express = require('express');
const router = express.Router();
const { createReceipt, closeReceipt } = require('../controllers/receiptController');

// Створення нового чеку
router.post('/', createReceipt);
// Закрити чек
router.put('/:receiptId/close', closeReceipt);


module.exports = router;
