//  Schema for Instruments
const sequelize = require('../ulti/database');
const Sequelize = require('sequelize')

const Instrument = sequelize.define('instrument',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  description: Sequelize.TEXT,
  videoId: Sequelize.STRING,
  userId: Sequelize.INTEGER, 
  genre : Sequelize.STRING,


  status: {
    type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
},{
  timestamps: false,
}
);

module.exports = Instrument
