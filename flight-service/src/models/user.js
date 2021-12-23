import Sequelize from 'sequelize';
import mysql from '../db/mysql';

const UserModel = mysql.define('sys_user',
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true,
    },
    user_email: {
      type: Sequelize.STRING(120),
      allowNull: false,
      unique: true
    },
    user_passwd: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    certification_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0身份证 1户口簿 2护照 3港澳台居民居住证 4其他
      validate: {
        min: 0,
        max: 4,
      }
    },
    certification_number: {
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    telephone: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    sex: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0, // 0女 1男 2其他
        max: 2,
      }
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 199,
      }
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    address: {
      type: Sequelize.STRING(120),
      allowNull: true,
    }
  }
)

export default UserModel;