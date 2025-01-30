'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      orderName: {
        type: Sequelize.STRING
      },
      deliveryDate: {
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.INTEGER
      },
      orderStatus: {
        type: Sequelize.STRING
      },
      customerId: {
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