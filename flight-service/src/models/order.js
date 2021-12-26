import Sequelize from "sequelize";
import mysql from "../db/mysql";
import FlightModel from "./flight";
import UserModel from "./user";

const OrderModel = mysql.define("order_record", {
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  flight_id: {
    type: Sequelize.INTEGER,
  },
  order_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  order_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  check_status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0, // 0待出行 1已完成 2异常
    validate: {
      min: 0,
      max: 2,
    }
  },
});

OrderModel.belongsTo(FlightModel, { foreignKey: "flight_id" });
OrderModel.belongsTo(UserModel, { foreignKey: "user_id" });
FlightModel.hasMany(OrderModel, { foreignKey: "flight_id" });
UserModel.hasMany(OrderModel, { foreignKey: "user_id" });

export default OrderModel;
