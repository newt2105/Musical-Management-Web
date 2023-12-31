const Instrument = require('../models/instrument');
const Performance = require('../models/performance');
const User = require('../models/user');
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

    getPerformances = (req, res, next) => {
      Performance.findAll()
        .then(performances => {
          console.log('nhac cu: ',performances);
          res.render('admin/performance', {
            perf: performances,
            pageTitle: 'All performance',
            path: '/admin/performance',
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

          getCreatePerformance = async (req, res, next) => {
            try {
              if (req.session.isLoggedIn && req.session.user.role === 'admin') {
                const instruments = await Instrument.findAll({
                  where: { status: 'approved' }, // Lấy danh sách nhạc cụ đã được phê duyệt
                });
          
                res.render('performances/create', {
                  pageTitle: 'Create a Performance',
                  isAuthenticated: req.session.isLoggedIn,
                  instruments: instruments, // Truyền danh sách nhạc cụ sang view
                });
              } else {
                res.redirect('/');
              }
            } catch (error) {
              console.error('Error fetching instruments:', error);
              res.redirect('/');
            }
          };
          

          // postCreatePerformance = (req, res, next) => {
          //   const title = req.body.title;
          //   const date = req.body.date;
          //   const location = req.body.location;
          //   const instrumentNames = req.body.instrumentNames;
          
          //     req.user
          //       .createPerformance({
          //         title: title,
          //         date: date,
          //         location: location,
          //       })
          //       .then(createdPerformance => {
          //         return Instrument.findAll({
          //           where: { title: instrumentNames },
          //           attributes: ['id'],
          //         });
          //       })

          //       .then(instruments => {
          //           //insert data into associative table
          //           const performanceInstrumentData = instruments.map(instrumentId => ({
          //             performanceId: createdPerformance.id,
          //             instrumentId: instrumentId,
          //           }));
                
          //           console.log('DATA: ', performanceInstrumentData);
          //           return PerformanceInstrument.bulkCreate(performanceInstrumentData);

          //       })
          //       .then(() => {
          //         console.log('Created performance');
          //         res.redirect('/');
          //       })
          //       .catch(error => {
          //         console.error('Error creating performance or instruments:', error);
          //         // res.redirect('/');
          //       });
          // };
          // postCreatePerformance
postCreatePerformance = (req, res, next) => {
  const title = req.body.title;
  const date = req.body.date;
  const location = req.body.location;
  const instrumentNames = req.body.instrumentNames;
  const imageUrl = req.body.imageUrl;
  const videoId = req.body.videoId;

  // Kiểm tra xem người dùng có vai trò là "admin" không
  if (req.session.isLoggedIn && req.session.user.role === 'admin') {
    // Tạo buổi biểu diễn
    Performance.create({
      title: title,
      date: date,
      location: location,
      imageUrl: imageUrl,
      videoId: videoId,
      
    })
      .then(createdPerformance => {
        // Ánh xạ tên nhạc cụ thành id của chúng
        return Instrument.findAll({
          where: { title: instrumentNames },
          attributes: ['id'],
        }).then(instruments => {

          createdPerformance.setInstruments(instruments).then(() => {
            console.log('Created performance');
            res.redirect('/');
          });
        });
      })
      .catch(error => {
        console.error('Error creating performance:', error);
        res.redirect('/');
      });
  } else {
    // Người dùng không phải là admin
    res.redirect('/');
  }
};

          
          



          }




module.exports = new AdminControllers