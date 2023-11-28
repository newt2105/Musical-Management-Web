const Instrument = require('../models/instrument');

class SiteControllers{

    getInstrument = (req, res, next) => {
        Instrument.fetchAll()
          .then(([rows, fieldData]) => {
            res.render('site/home', {
              ins: rows,
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