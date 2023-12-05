const instrumentsRouter = require('./instruments')
const siteRouter = require('./site')
const authRouter = require('./auth')
const adminRouter = require('./admin')


function route(app){
    app.use('/admin',adminRouter)
    app.use('/instrument', instrumentsRouter)
    app.use('/login',authRouter)
    app.use('/', siteRouter)
}

module.exports = route