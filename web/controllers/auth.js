
const bcrypt = require('bcryptjs')
const User = require('../models/user');

class AuthControllers{

      getLogin = (req, res, next) => {
        res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          isAuthenticated: false,
          
        });
      };

      postLogin = (req, res, next) => {
        const email = req.body.email
        const password = req.body.password
        User.findOne({where: {email: email}})
          .then(user => {
            if(!user){
              return res.redirect('/login')
            }
            bcrypt
              .compare(password, user.password)
              .then(doMatch => {
                if (doMatch) {
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  req.session.user.role = user.role ;
                  return req.session.save(err => {
                    
                    console.log(err);
                    res.redirect('/');
                  });
                }
                res.redirect('/login');
              })
              .catch(err => {
                console.log(err);
                res.redirect('/login');
              });
            })
            .catch(err => console.log(err));
      };

      postLogout = (req, res, next) => {
        req.session.destroy(err => {
          console.log(err);
          res.redirect('/');
        });
      }

      getSignup = (req, res, next) => {
        res.render('auth/signup', {
          path: '/signup',
          pageTitle: 'Signup',
          isAuthenticated: false,
        });
      };

      postSignup = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({where: {email: email}})
          .then(userDoc => {
            console.log('email: ', userDoc)
            if(userDoc){
              return res.redirect('/signup')
            }
            return bcrypt
              .hash(password, 12)
              .then(hashPassword => {
                const user = new User({
                  email: email,
                  password: hashPassword,
                })
                return user.save()
          })
          .then(result => {
            res.redirect('/login');
          })
          })
          .catch(err => {console.log('loine: ',err)})
      };
      
}

module.exports = new AuthControllers