const instrumentsRouter = require('./instruments')
const siteRouter = require('./site')



function route(app){
    app.use('/instrument', instrumentsRouter)
    app.use('/', siteRouter)
}

module.exports = route