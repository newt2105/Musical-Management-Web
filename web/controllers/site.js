const Instrument = require('../models/instrument');
const instruments = require('./instruments');
const User = require('../models/user');
const { Op } = require('sequelize');

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
          role : req.session.user.role,        
        })
    }

    show = (req, res, next) => {
      const instrumentName = req.query.q;
  
      // Tìm ID của nhạc cụ dựa trên tên
      Instrument.findOne({
        where: {
            title: {
                [Op.like]: `%${instrumentName}%`
            }
        },
    })
      .then(instrument => {
          if (!instrument) {
              // Nếu không tìm thấy nhạc cụ, có thể xử lý ở đây (ví dụ: hiển thị thông báo lỗi)
              console.log('Không tìm thấy nhạc cụ');
              res.redirect('/'); // Điều hướng về trang chủ hoặc trang thông báo lỗi
              return;
          }
  
          const insId = instrument.id;
  
          Instrument.findAll({
              where: { id: insId },
              include: {
                  model: User,
                  required: true,
              },
          })
          .then(instruments => {
              console.log('INS: ', instruments);
              const instrument = instruments[0];
              const creatorEmail = instrument.user.email;
              console.log('EMAIL', creatorEmail);
  
              res.render('instruments/show', {
                  instrument: instrument,
                  creatorEmail: creatorEmail,
                  pageTitle: instrument.title,
                  path: '/instrument',
                  isAuthenticated: req.session.isLoggedIn,
              });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

}

module.exports = new SiteControllers