const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController.js');

// Отримання всіх товарів
router.get('/', getAllProducts);

module.exports = router;
