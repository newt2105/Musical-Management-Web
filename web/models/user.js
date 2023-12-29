const Sequelize = require('sequelize');

const sequelize = require('../ulti/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,

  role: {
    type: Sequelize.ENUM('user', 'admin'),
    defaultValue: 'user', // Mặc định là 'user' nếu không có giá trị được cung cấp
    allowNull: true,
  },
});

module.exports = User;
