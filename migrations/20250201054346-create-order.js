'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      orderNum: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryDate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      orderDate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      orderStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      customerId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};