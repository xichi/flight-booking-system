import Sequelize from 'sequelize';
import mysql from '../db/mysql';

const AdminModel = mysql.define('sys_admin',
  {
    admin_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    admin_name: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true,
    },
    admin_email: {
      type: Sequelize.STRING(120),
      allowNull: false,
      unique: true
    },
    admin_passwd: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
  }
)

export default AdminModel;