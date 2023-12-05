

class AuthControllers{
    getLogin = (req, res, next) =>{
        res.render('auth/login',{
        path :'/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn,
        
        })
        
    }
    postLogin = (req, res, next) =>{
        req.isLoggedIn = true,
        res.redirect('/')
    }

}

module.exports = new AuthControllers