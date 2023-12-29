const Instrument = require('../models/instrument');

class AdminControllers{

    getCreate = (req, res, next) => {

      if (req.session.isLoggedIn && req.session.user.role === 'admin') {
        // Chỉ cho admin truy cập trang tạo mới instrument
        res.render('instruments/create', {
          pageTitle: 'Add an instrument',
          editing: false,
          isAuthenticated: req.session.isLoggedIn,
           
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
        status: 'approved',
        })
        .then(result =>{
          // console.log(result)
          console.log('created ins')
          res.redirect('/');
        })
        .catch(err => {
          console.log(err)
        })
    };

    // getEdit = (req, res, next) => {
    //   if (req.session.isLoggedIn && req.session.user.role === 'admin'){
    //   const editMode = req.query.edit;
    //   if (!editMode) {
    //     return res.redirect('/');
    //   }
    //   const insId = req.params.instrumentId
    //   Instrument.findByPk(insId)
    //     .then(instruments => {
    //       const instrument = instruments
    //       if (!instrument) {
    //         return res.redirect('/');
    //       }
    //       res.render('instruments/create', {
    //         pageTitle: 'Edit instrument',
    //         path: '/instrument/edit',
    //         editing: editMode,
    //         instrument: instrument,
    //         isAuthenticated: req.isLoggedin
    //       });
    //     })
    //     .catch(err => console.log(err));
    //   }
    //   else{
    //     res.redirect('/');
    //   }
    // };
    getEdit = (req, res, next) => {
      if (req.session.isLoggedIn && req.session.user.role === 'admin') {
        const editMode = req.query.edit === 'true'; // Đảm bảo editMode là true khi được đặt
        if (!editMode) {
          return res.redirect('/');
        }
    
        const insId = req.params.instrumentId;
        Instrument.findByPk(insId)
          .then(instrument => {
            if (!instrument) {
              return res.redirect('/');
            }
    
            res.render('instruments/create', {
              pageTitle: 'Edit instrument',
              path: '/instrument/edit',
              editing: editMode,
              instrument: instrument,
              isAuthenticated: req.session.isLoggedIn,
              // role : req.session.user.role,
            });
          })
          .catch(err => console.log(err));
      } else {
        res.redirect('/');
      }
    };
    

    postEdit = (req, res, next) => {
        const insId = req.body.instrumentId;
        const updatedTitle = req.body.title;
        const updatedVideoId = req.body.videoId;
        const updatedImageUrl = req.body.imageUrl;
        const updatedDesc = req.body.description;
        Instrument.findByPk(insId)
          .then(instrument => {
            instrument.title = updatedTitle;
            instrument.videoId = updatedVideoId;
            instrument.description = updatedDesc;
            instrument.imageUrl = updatedImageUrl;
            return instrument.save();
          })
          .then(result => {
            console.log('UPDATED instrument!');
            res.redirect('/');
          })
          .catch(err => console.log(err));
      }

    getInstruments = (req, res, next) => {
      Instrument.findAll()
        .then(instruments => {
          // console.log(instruments);
          res.render('admin/instruments', {
            ins: instruments,
            pageTitle: 'Admin Intruments',
            path: '/admin/instruments',
            isAuthenticated: req.isLoggedin,
            // role : req.session.user.role,
          });
        })
        .catch(err => console.log(err));
    };

    // postDelete = (req, res, next) => {

    //   const insId = req.body.instrumentId;
    //   // console.log(insId)

    //   Instrument.findByPk(insId)
    //     .then(instrument => {
    //       console.log('id: ', instrument)
    //       return instrument.destroy();
    //     })
    //     .then(result => {
    //       console.log('DESTROYED instrument');
    //       res.redirect('/');
    //     })
    //     .catch(err => console.log(err));
    // }; 
    postDelete = (req, res, next) => {
      if (req.session.isLoggedIn && req.session.user.role === 'admin') {
        const insId = req.body.instrumentId;
        Instrument.findByPk(insId)
          .then(instrument => {
            if (!instrument) {
              return res.redirect('/');
            }
            return instrument.destroy();
          })
          .then(result => {
            console.log('DESTROYED instrument');
            res.redirect('/');
          })
          .catch(err => console.log(err));
      } else {
        res.redirect('/');
      }
    };
    

    approveInstrument = (req, res, next) => {
      const instrumentId = req.params.instrumentId;
  
      Instrument.findByPk(instrumentId)
        .then(instrument => {
          if (!instrument) {
            return res.status(404).json({ message: 'Instrument not found' });
          }
  
          // Cập nhật trạng thái thành 'approved'
          instrument.status = 'approved';
  
          // Lưu thay đổi vào cơ sở dữ liệu
          return instrument.save();
        })
        .then(updatedInstrument => {
          res.status(200).json({ message: 'Instrument approved successfully', instrument: updatedInstrument });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Internal Server Error' });
        });
    };
  
    // Hàm reject instrument
    rejectInstrument = (req, res, next) => {
      const instrumentId = req.params.instrumentId;
  
      Instrument.findByPk(instrumentId)
        .then(instrument => {
          if (!instrument) {
            return res.status(404).json({ message: 'Instrument not found' });
          }
  
          // Cập nhật trạng thái thành 'rejected'
          instrument.status = 'rejected';
  
          // Lưu thay đổi vào cơ sở dữ liệu
          return instrument.save();
        })
        .then(updatedInstrument => {
          res.status(200).json({ message: 'Instrument rejected successfully', instrument: updatedInstrument });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Internal Server Error' });
        });
    };

    // Trong controller admin
          getPendingInstruments = (req, res, next) => {
            Instrument.findAll({
              where: {
                status: 'pending'
              }
            })
              .then(pendingInstruments => {
                res.render('instruments/pedingInstru', {
                  pendingInstruments: pendingInstruments,
                  pageTitle: 'Pending Instruments',
                  path: '/admin/pending-instruments',
                  isAuthenticated: req.session.isLoggedIn,
                });
              })
              .catch(err => console.log(err));
          };

          getCreatePerformance = (req, res, next) => {
            if (req.session.isLoggedIn && req.session.user.role === 'admin') {
              res.render('performances/create', {
                pageTitle: 'Create a Performance',
                isAuthenticated: req.session.isLoggedIn,
              });
            } else {
              res.redirect('/');
            }
          };

          postCreatePerformance = async (req, res, next) => {
            const date = req.body.date;
            const location = req.body.location;
            const instrumentNames = req.body.instrumentNames; // Assume you get an array of instrumentNames from the form
        
              // Tạo buổi biểu diễn
              const createdPerformance = await Performance.create({
                date: date,
                location: location,
                userId: req.session.user.id,
              });
        
              // Ánh xạ tên nhạc cụ thành id của chúng
              const instrumentIds = await Instrument.findAll({
                where: { title: instrumentNames },
                attributes: ['id'],
              });
        
              // Ghi thông tin về nhạc cụ sử dụng trong buổi biểu diễn vào bảng liên kết
              await PerformanceInstrument.bulkCreate(
                instrumentIds.map(instrumentId => ({
                  performanceId: createdPerformance.id,
                  instrumentId: instrumentId,
                }))
              );
        
              console.log('Created performance');
              res.redirect('/');

          };



          }




module.exports = new AdminControllers