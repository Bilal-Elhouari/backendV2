const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Finance = sequelize.define('Finance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.ENUM('INCOME', 'EXPENSE'), allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

module.exports = Finance;