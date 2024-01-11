const instrumentsRouter = require('./instruments')
const performanceRouter = require('./performances')
const siteRouter = require('./site')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const userRouter = require('./user')
const LogoutRouter = require('./logout')
const signupRouter = require('./signup')
const isAdmin = require('../middleware/is-Admin')
const isUser = require('../middleware/is-User')
function route(app){
    app.use('/admin',isAdmin, adminRouter)
    app.use('/user', isUser ,userRouter)
    app.use('/instrument', instrumentsRouter)
    app.use('/performance', performanceRouter)
    app.use('/login',authRouter)
    app.use('/logout',LogoutRouter )
    app.use('/signup',signupRouter)
    app.use('/', siteRouter)
}

module.exports = route