const Sequelize = require('sequelize')

const sequelize = new Sequelize('minh3', 'root', 'meomeo21',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize
