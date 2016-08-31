// Dependencies
var express = require('express'),
    mongoose = require('mongoose');

var port = process.env.PORT || 4000; // define port

// Express
var app = express();

// db connection
var dbConString = 'mongodb://localhost/bookAPI';
var db = mongoose.connect(dbConString, function (err, res) {
    if (err)
        console.log('Failed to connect to: ' + dbConString + '. Err: ' + err);
    else
        console.log ('Successfully connected with: ' + dbConString);
});

// attaching book model
var Book = require('./models/bookModel');

// define routers
var bookRouter = express.Router();
bookRouter.route('/Books')
    .get(function (req, res) {
        
        Book.find(function (err, books) {
           
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send ('Wowwww!....Hellow there!');
});

// Server
app.listen(port, function() {
    console.log('Node running on port ' + port);
});
