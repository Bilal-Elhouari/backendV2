'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ajouter la colonne `password` et `role` à la table `Users`
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('ADMIN', 'EMPLOYEE', 'COMPANY', 'CLIENT'),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer les colonnes `password` et `role` si on annule la migration
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'role');
  }
};
