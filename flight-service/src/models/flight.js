import Sequelize from "sequelize";
import mysql from "../db/mysql";

const FlightModel = mysql.define("flight", {
  flight_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  flight_model: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  from_city: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  to_city: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  from_airport: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  to_airport: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  departure_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  arrival_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  original_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  current_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  remain_seats: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default FlightModel;
