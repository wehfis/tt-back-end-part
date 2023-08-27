const { sequelize, ProductModel, ReceiptModel, ProductInReceiptModel } = require('./db');

(async () => {
  await sequelize.sync({ force: true }); // Drop and recreate tables

  const products = await Promise.all([
    ProductModel.create({ 
      name: 'Product 1', 
      price: 5.00,
    }),
    ProductModel.create({
      name: 'Product 2',
      price: 10.00,
    }),
    ProductModel.create({
      name: 'Product 3',
      price: 15.00,
    }),
    ProductModel.create({
      name: 'Product 4',
      price: 20.00,
    }),
    ProductModel.create({
      name: 'Product 5',
      price: 25.00,
    }),
    ProductModel.create({
      name: 'Product 6',
      price: 30.00,
    }),
    ProductModel.create({
      name: 'Product 7',
      price: 35.00,
    }),
    ProductModel.create({
      name: 'Product 8',
      price: 40.00,
    }),
    ProductModel.create({
      name: 'Product 9',
      price: 45.00,
    }),
    ProductModel.create({
      name: 'Product 10',
      price: 50.00,
    }),
  ]);

  const receipts = await Promise.all([
    ReceiptModel.create({
      date: new Date(),
      total: 20.00,
    }),
    ReceiptModel.create({
      date: new Date(),
      total: 75.00,
    }),
    ReceiptModel.create({
      date: new Date(),
      total: 120.00,
    }),
    ReceiptModel.create({
      date: new Date(),
      total: 35.00,
    }),
  ]);

  await Promise.all([
    ProductInReceiptModel.create({
      quantity: 2,
      price: 10.00,
      ProductId: products[0].id,
      ReceiptId: receipts[0].id,
    }),
    ProductInReceiptModel.create({
      quantity: 1,
      price: 10.00,
      ProductId: products[1].id,
      ReceiptId: receipts[0].id,
    }),
    ProductInReceiptModel.create({
      quantity: 3,
      price: 45.00,
      ProductId: products[2].id,
      ReceiptId: receipts[1].id,
    }),
    ProductInReceiptModel.create({
      quantity: 1,
      price: 30.00,
      ProductId: products[5].id,
      ReceiptId: receipts[1].id,
    }),
    ProductInReceiptModel.create({
      quantity: 2,
      price: 100.00,
      ProductId: products[9].id,
      ReceiptId: receipts[2].id,
    }),
    ProductInReceiptModel.create({
      quantity: 1,
      price: 20.00,
      ProductId: products[3].id,
      ReceiptId: receipts[2].id,
    }),
    ProductInReceiptModel.create({
      quantity: 1,
      price: 35.00,
      ProductId: products[6].id,
      ReceiptId: receipts[3].id,
    }),
  ]);

  console.log('Sample data seeded.');
})();
