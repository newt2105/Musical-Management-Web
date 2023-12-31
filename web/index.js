const express = require('express')
const path = require('path')
const app = express()
const route = require('./routes')
const sequelize = require('./ulti/database');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const Instrument = require('./models/instrument');
const User = require('./models/user');
const Performance = require('./models/performance');



app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));


Instrument.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Instrument);
Performance.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Performance);
Performance.belongsToMany(Instrument, { through: 'PerformanceInstruments' });
Instrument.belongsToMany(Performance, { through: 'PerformanceInstruments' });

app.use(
  session({
    secret: "my secret",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, 
    proxy: true,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  // console.log("id: ",req.session.user.id)
  User.findByPk(req.session.user.id)
    .then(user => {
      // console.log("user: ",user)
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

route(app)
// app.get('/:id', (req,res) =>{
//     req.isloggin = true,
//     console.log(req.body.email)
//     res.send('a')
// })


sequelize
.sync()
  .then(user => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

