'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({    id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
    orderName: DataTypes.STRING,
    deliveryDate: DataTypes.INTEGER,
    orderDate: DataTypes.INTEGER,
    orderStatus: DataTypes.STRING,
    customerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};