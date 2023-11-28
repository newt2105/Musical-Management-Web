const express = require('express')
const path = require('path')
const app = express()
const route = require('./routes')

app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

route(app)

app.listen(3000)