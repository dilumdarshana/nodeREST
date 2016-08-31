// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 4000; // define port

// Mongo DB
mongoose.connect('mongodb://localhost/test');

// Express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send ('Wow!....Hellow there!');
});

// Routes
//app.use('/api', require('./routes/api'));

// Server
app.listen(port, function() {
    console.log('Node running on port ' + port);
});
