const { Sequelize } = require('sequelize');
const path = require('path');

const databasePath = path.join(__dirname, '..', 'mydatabase.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
});

const ProductModel = require('../models/Product')(sequelize);
const ReceiptModel = require('../models/Receipt')(sequelize);
const ProductInReceiptModel = require('../models/ProductInReceipt')(sequelize);

ProductModel.belongsToMany(ReceiptModel, { through: ProductInReceiptModel });
ReceiptModel.belongsToMany(ProductModel, { through: ProductInReceiptModel });

module.exports = {
    sequelize,
    ProductModel,
    ReceiptModel,
    ProductInReceiptModel,
  };