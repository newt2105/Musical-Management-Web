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
  description: Sequelize.STRING,
  videoId: Sequelize.STRING,

  status: {
    type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
})

module.exports = Instrument
