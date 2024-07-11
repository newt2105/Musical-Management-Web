const Instrument = require('../models/instrument');

class UserControllers{

    getCreate = (req, res, next) => {
        res.render('instruments/usercreate', {
          pageTitle: 'Add an instrument',
          editing: false,
          isAuthenticated: req.session.isLoggedIn,
          role : req.session.user.role,
        });
    };

    postCreate = (req, res, next) => {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const description = req.body.description;
      const videoId = req.body.videoId;
      const genre = req.body.genre;
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
        genre: genre,
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