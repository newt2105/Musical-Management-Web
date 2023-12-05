const Instrument = require('../models/instrument');
const instruments = require('./instruments');

class SiteControllers{

    getInstrument = (req, res, next) => {
        Instrument.findAll()
          .then(instruments => {
            res.render('site/home', {
              ins: instruments,
              pageTitle: 'All Instruments',
              path: '/'
            });
          })
          .catch(err => console.log(err));

    }
    //[GET] /search
    index2(req, res){
        res.render("site/search")
    }

}

module.exports = new SiteControllers