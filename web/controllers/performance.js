const Performance = require('../models/performance');

class PerformancesControllers{

    show = (req, res, next) => {
        const perfId = req.params.performanceId
        // console.log('params: ',req.params)
        
        // console.log('id: ',req.params)
        Performance.findAll({where: {id: perfId}})
          .then(performances => {
            res.render('performances/show', {
              performance: performances[0],
              pageTitle: performances[0].title,
              path: '/performance',
              isAuthenticated: req.session.isLoggedIn,
              // role : req.session.user.role,
              
            });
          })
          .catch(err => console.log(err));
        }
}




module.exports = new PerformancesControllers