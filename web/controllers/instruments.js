const Instrument = require('../models/instrument');

class InstrumentsControllers{

    show = (req, res, next) => {
        const insId = req.params.instrumentId
        console.log('params: ',req.params)
        
        // console.log('id: ',req.params)
        Instrument.findAll({where: {id: insId}})
          .then(instruments => {
            res.render('instruments/show', {
              instrument: instruments[0],
              pageTitle: instruments[0].title,
              path: '/instrument',
              isAuthenticated: req.session.isLoggedIn,
              // role : req.session.user.role,
              
            });
          })
          .catch(err => console.log(err));
        }
}




module.exports = new InstrumentsControllers