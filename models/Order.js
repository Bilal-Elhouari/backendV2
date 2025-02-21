const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');  // Si tu as une relation avec l'utilisateur
const Product = require('./Product');  // Relation avec Product

const Order = sequelize.define('Order', {
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Définir les relations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: 'OrderProducts' });  // Relation many-to-many entre Order et Product

module.exports = Order;
