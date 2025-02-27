module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    });

    await queryInterface.addColumn('Orders', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    });

    await queryInterface.addColumn('Orders', 'totalPrice', {
      type: Sequelize.DOUBLE,
      allowNull: false
    });

    await queryInterface.addColumn('Orders', 'status', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'pending'
    });

    await queryInterface.addColumn('Orders', 'orderDate', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'userId');
    await queryInterface.removeColumn('Orders', 'createdBy');
    await queryInterface.removeColumn('Orders', 'totalPrice');
    await queryInterface.removeColumn('Orders', 'status');
    await queryInterface.removeColumn('Orders', 'orderDate');
  }
};
