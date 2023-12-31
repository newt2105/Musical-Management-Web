const instrumentsRouter = require('./instruments')
const performanceRouter = require('./performances')
const siteRouter = require('./site')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const userRouter = require('./user')
const LogoutRouter = require('./logout')
const signupRouter = require('./signup')
function route(app){
    app.use('/admin',adminRouter)
    app.use('/user', userRouter)
    app.use('/instrument', instrumentsRouter)
    app.use('/performance', performanceRouter)
    app.use('/login',authRouter)
    app.use('/logout',LogoutRouter )
    app.use('/signup',signupRouter)
    app.use('/', siteRouter)
}

module.exports = route