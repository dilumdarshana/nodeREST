var express = require('express');

var routes = function() {
    
    // attaching book model
    var Book = require('../models/bookModel');
    
    // express router
    var bookRouter = express.Router();

    bookRouter.route('/Books')

        // add a new book
        .post(function(req, res) {      
            var newBook = new Book (req.body);
            newBook.save();
            res.status(201).send(newBook);
        })
        // get all books
        .get(function(req, res) {      
            var query = {};
            // only accept existing attributes
            if (req.query.auther) {
                query.auther = req.query.auther;
            }

            Book.find(query, function(err, books) {        
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });

    // get book by id
    bookRouter.route('/Books/:bookId')
        .get(function (req, res) {

            Book.findById(req.params.bookId, function (err, book) {

                if (err)
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        });
    
    return bookRouter;
};

module.exports = routes();