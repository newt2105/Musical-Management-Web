const Instrument = require('../models/instrument');

class InstrumentsControllers{

    show = (req, res, next) => {
        const insId = req.params.instrumentId
        Instrument.findById(insId)
          .then(([instrument]) => {
            res.render('instruments/show', {
              instrument: instrument[0],
              pageTitle: instrument.title,
              path: '/instrument'
            });
          })
          .catch(err => console.log(err));
        }

}


module.exports = new InstrumentsControllers