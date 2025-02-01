'use strict';
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
      },
      ProductName: {
        type: Sequelize.STRING
      },
      ProductCode: {
        type: Sequelize.INTEGER
      },
      MrpPrice: {
        type: Sequelize.INTEGER
      },
      SalePrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Products');
  }
};