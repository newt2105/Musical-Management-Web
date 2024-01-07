const Performance = require('../models/performance');
const PerformanceInstrument = require('../models/appear');
const Instrument = require('../models/instrument');
class PerformancesControllers{

//     show = (req, res, next) => {
//         const perfId = req.params.performanceId
//         // console.log('params: ',req.params)
        
//         // console.log('id: ',req.params)
//         Performance.findAll({where: {id: perfId}})
//           .then(performances => {
//             res.render('performances/show', {
//               performance: performances[0],
//               pageTitle: performances[0].title,
//               path: '/performance',
//               isAuthenticated: req.session.isLoggedIn,
//               // role : req.session.user.role,
              
//             });
//           })
//           .catch(err => console.log(err));
//         }

getPerformances = (req, res, next) => {
  Performance.findAll()
    .then(performances => {
      // console.log('nhac cu: ',performances);
      res.render('admin/performance', {
        perf: performances,
        pageTitle: 'All performance',
        path: '/admin/performance',
        isAuthenticated: req.session.isLoggedIn,
        // role : req.session.user.role,
      });
    })
    .catch(err => console.log(err));
};


// Trong controller của bạn
show = (req, res, next) => {
  const performanceId = req.params.performanceId;

  Performance.findByPk(performanceId)
    .then(performance => {
      if (!performance) {
        // Xử lý trường hợp không tìm thấy buổi biểu diễn
        return res.status(404).send('Performance not found');
      }

      // Truy vấn các nhạc cụ liên quan thông qua bảng liên kết
      PerformanceInstrument.findAll({
        where: { performanceId: performanceId },
        // include: Instrument, // Kết hợp với model Instrument
      })
        .then(performanceInstruments => {
          console.log("per: ", performanceInstruments)
          // Lấy mảng instrumentIds
          const instrumentIds = performanceInstruments.map(pi => pi.instrumentId);

          // Truy vấn thông tin chi tiết của các nhạc cụ từ bảng Instruments
          Instrument.findAll({
            where: { id: instrumentIds },
          })
            .then(instruments => {
              // Truyền dữ liệu sang view để hiển thị
              res.render('performances/show2', {
                performance: performance,
                instruments: instruments,
                pageTitle: 'Performance Details',
                isAuthenticated: req.session.isLoggedIn,  
              });
            })
            .catch(error => {
              console.error('Error fetching instruments:', error);
              res.status(500).send('Internal Server Error');
            });
        })
        .catch(error => {
          console.error('Error fetching performance instruments:', error);
          res.status(500).send('Internal Server Error');
        });
    })
    .catch(error => {
      console.error('Error fetching performance:', error);
      res.status(500).send('Internal Server Error');
    });
};




}






module.exports = new PerformancesControllers