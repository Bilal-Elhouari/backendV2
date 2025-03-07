'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
