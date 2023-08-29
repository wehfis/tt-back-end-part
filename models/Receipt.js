const { DataTypes, literal } = require('sequelize');

module.exports = sequelize => {
    const Receipt = sequelize.define('Receipt', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        number: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            defaultValue: 1000,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });

  return Receipt;
};
