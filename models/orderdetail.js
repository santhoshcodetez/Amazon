'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetail.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Quantity: DataTypes.INTEGER,
    Price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    customerId: DataTypes.UUID,
    productId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};