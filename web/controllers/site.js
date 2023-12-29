const Instrument = require('../models/instrument');
const instruments = require('./instruments');

class SiteControllers{

    getInstrument = (req, res, next) => {
      // console.log(req.session.user.role)
        Instrument.findAll({ where: { status: 'approved' } })
          .then(instruments => {
            res.render('site/home', {
              ins: instruments,
              pageTitle: 'All Instruments',
              path: '/',
              isAuthenticated: req.session.isLoggedIn,
              role :  'default' ,
            });
          })
          .catch(err => console.log(err));
    }
  //   getInstrument2 = (req, res, next) => {
  //     Instrument.findAll({ where: { status: 'approved' } })
  //       .then(instruments => {
  //         res.render('site/home', {
  //           ins: instruments,
  //           pageTitle: 'All Instruments',
  //           path: '/homepage',
  //           isAuthenticated: req.session.isLoggedIn,
  //           role : req.session.user.role,
  //         });
  //       })
  //       .catch(err => console.log(err));

  // }

    //[GET] /search
    index2(req, res){
        res.render("site/post",{
          pageTitle: 'Add an instrument',
          isAuthenticated: req.session.isLoggedIn,          
        })
    }

}

module.exports = new SiteControllers