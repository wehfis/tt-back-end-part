require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const product_routes = require('./routes/products');
const receipt_routes = require('./routes/receipts');
const productInReceipt_routes = require('./routes/productInReceipt');
const { sequelize } = require('./initDBandSeed/db');

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use(cors());
app.use(express.json());
app.use('/api/product', product_routes);
app.use('/api/receipt', receipt_routes);
app.use('/api/prodInRes', productInReceipt_routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});