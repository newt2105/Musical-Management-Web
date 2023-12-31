// performance.js
const Sequelize = require('sequelize');
const sequelize = require('../ulti/database');

const Performance = sequelize.define('performance', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  date: Sequelize.DATE,
  location: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  videoId: Sequelize.STRING,

});

module.exports = Performance;
