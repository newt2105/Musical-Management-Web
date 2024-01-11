const Instrument = require('../models/instrument');
const User = require('../models/user');
class InstrumentsControllers{
    // getInstrument = (req, res, next) => {
    //   Instrument.findAll()
    //     .then(instruments => {
    //       // console.log('nhac cu: ',instruments);
    //       res.render('admin/performance', {
    //         perf: instruments,
    //         pageTitle: 'All instrument',
    //         path: '/admin/instrument',
    //         isAuthenticated: req.session.isLoggedIn,
    //       });
    //     })
    //     .catch(err => console.log(err));
    // };
    // show = (req, res, next) => {
    //     const insId = req.params.instrumentId
    //     // console.log('params: ',req.params)
        
    //     // console.log('id: ',req.params)
    //     Instrument.findAll({where: {id: insId}})
    //       .then(instruments => {
    //         res.render('instruments/show', {
    //           instrument: instruments[0],
    //           pageTitle: instruments[0].title,
    //           path: '/instrument',
    //           isAuthenticated: req.session.isLoggedIn,
    //           // role : req.session.user.role,
              
    //         });
    //       })
    //       .catch(err => console.log(err));
    //     }
    show = (req, res, next) => {
      const insId = req.params.instrumentId;
    
      Instrument.findAll({
        where: { id: insId },
        include: {
          model: User,
          required: true,
        },
      })
        .then(instruments => {
          console.log('INS: ', instruments)
          const instrument = instruments[0];
          const creatorEmail = instrument.user.email;
          console.log('EMAIL', creatorEmail)
    
          res.render('instruments/show', {
            instrument: instrument,
            creatorEmail: creatorEmail,
            pageTitle: instrument.title,
            path: '/instrument',
            isAuthenticated: req.session.isLoggedIn,
          });
        })
        .catch(err => console.log(err));
    };
    
}




module.exports = new InstrumentsControllers