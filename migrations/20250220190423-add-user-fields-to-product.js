'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Le nom de ta table User
        key: 'id'
      },
    })
    .then(() => {
      return queryInterface.addColumn('Products', 'userName', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    })
    .then(() => {
      return queryInterface.addColumn('Products', 'userLastName', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 'userId')
    .then(() => {
      return queryInterface.removeColumn('Products', 'userName');
    })
    .then(() => {
      return queryInterface.removeColumn('Products', 'userLastName');
    });
  }
};
