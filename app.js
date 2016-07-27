var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/note',require('./routes/note'))

app.use('/noteFolder',require('./routes/noteFolder'))

app.listen(3000,(req,res) => {
  console.log('Server is running!')
})
