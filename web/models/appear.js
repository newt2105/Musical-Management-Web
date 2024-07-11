// models/performanceInstrument.js
const Sequelize = require('sequelize');
const sequelize = require('../ulti/database');

const Appear = sequelize.define('appear', {
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
},{
  timestamps: false,
}
);

module.exports = Appear;
