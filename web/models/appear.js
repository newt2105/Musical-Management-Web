// models/performanceInstrument.js
const Sequelize = require('sequelize');
const sequelize = require('../ulti/database');

const PerformanceInstrument = sequelize.define('performanceInstrument', {
  performanceId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  instrumentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = PerformanceInstrument;
