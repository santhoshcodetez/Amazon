const { v4: uuidv4 } = require('uuid');

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        id: uuidv4(),
        ProductName: 'iPhone 15',
        ProductCode: 1001,
        MrpPrice: 1200,
        SalePrice: 999,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Samsung Galaxy S24',
        ProductCode: 1002,
        MrpPrice: 1100,
        SalePrice: 899,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'MacBook Pro 16"',
        ProductCode: 1003,
        MrpPrice: 2800,
        SalePrice: 2499,
        status: 'Out of Stock',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Apple Watch Series 8',
        ProductCode: 1004,
        MrpPrice: 399,
        SalePrice: 349,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Google Pixel 8',
        ProductCode: 1005,
        MrpPrice: 899,
        SalePrice: 799,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'OnePlus 11',
        ProductCode: 1006,
        MrpPrice: 899,
        SalePrice: 749,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Sony WH-1000XM5 Headphones',
        ProductCode: 1007,
        MrpPrice: 350,
        SalePrice: 299,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Dell XPS 13 Laptop',
        ProductCode: 1008,
        MrpPrice: 1500,
        SalePrice: 1300,
        status: 'Out of Stock',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Samsung Galaxy Buds Pro',
        ProductCode: 1009,
        MrpPrice: 199,
        SalePrice: 169,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        ProductName: 'Fitbit Charge 5',
        ProductCode: 1010,
        MrpPrice: 179,
        SalePrice: 149,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
