const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import du modèle User

const Product = sequelize.define('Product', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true 
  },
  nameProduct: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nom de la table User
      key: 'id'
    }
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userLastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Association avec User
Product.belongsTo(User, { foreignKey: 'userId' });

module.exports = Product;
