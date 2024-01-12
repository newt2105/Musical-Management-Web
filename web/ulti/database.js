const Sequelize = require('sequelize')

const sequelize = new Sequelize('minh7', 'root', 'meomeo21',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize
