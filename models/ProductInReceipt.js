const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const ProductInReceipt = sequelize.define('ProductInReceipt', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
  });

  return ProductInReceipt;
};
