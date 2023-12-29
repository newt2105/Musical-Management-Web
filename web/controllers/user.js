const Instrument = require('../models/instrument');

class UserControllers{

    getCreate = (req, res, next) => {
      

      if (req.session.isLoggedIn && req.session.user.role === 'user') {
        res.render('instruments/usercreate', {
          pageTitle: 'Add an instrument',
          editing: false,
          isAuthenticated: req.session.isLoggedIn,
          role : req.session.user.role,
        });
      } else {
        // Người dùng không có quyền truy cập trang này, bạn có thể chuyển hướng hoặc hiển thị thông báo lỗi
        // res.render('alert',{
        //   pageTitle: 'Error',
        //   editing: false,
        //   isAuthenticated: true,
        // })
        res.redirect('/'); // Chẳng hạn, chuyển hướng về trang chủ
      }
    };

    postCreate = (req, res, next) => {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const description = req.body.description;
      const videoId = req.body.videoId;
      // const instrument = new Instrument({
      //   title: title,
      //   imageUrl: imageUrl,
      //   description: description,
      //   videoId: videoId,
      // })
      // instrument
      //   .save()
      req.user
        .createInstrument({
        title: title,
        imageUrl: imageUrl,
        description: description,
        videoId: videoId,
        status :'pending'
        })
        .then(result =>{
          // console.log(result)
          console.log('Instrument created, waiting for approval');
          res.redirect('/');
        })
        .catch(err => {
          console.log(err)
        })
    };

  }

module.exports = new UserControllers