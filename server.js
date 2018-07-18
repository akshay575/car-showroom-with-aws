var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use('/', index);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'dist')));

var port = process.env.PORT || 4200;

app.listen(port, () => {
    console.log('Server running on port: ', port)
})