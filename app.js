// Dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 4000; // define port

// Express
var app = express();

// db connection
// adding testing and production db. Testing db use for unit testing and integrated testing
var dbConString = (process.env.ENV == 'Test') ? 'mongodb://localhost/bookAPI_test' : 'mongodb://localhost/bookAPI';

var db = mongoose.connect(dbConString, function (err, res) {
    if (err)
        console.log('Failed to connect to: ' + dbConString + '. Err: ' + err);
    else
        console.log ('Successfully connected with: ' + dbConString);
});

// inform that we are going to use body-parser
// body-parser use to convert http post data to json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json ());

// define routers
var bookRouter = require('./routes/bookRouter');
app.use('/api/Books', bookRouter);

// old style route
app.get('/', function(req, res) {
    res.send ('Wowwww!....Hellow there!');
});

// Server
app.listen(port, function() {
    console.log('Node running on port ' + port);
});

// we do this since, integrated testing using
module.exports = app;