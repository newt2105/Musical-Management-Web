const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'meomeo21',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize
