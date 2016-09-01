var express = require('express');

// attaching book model
var Book = require('../models/bookModel');

// define whole book routes as function
var routes = function() {
    
    // express router
    var bookRouter = express.Router();

    bookRouter.route('/')

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
            if(req.query.auther) {
                query.auther = req.query.auther;
            }

            Book.find(query, function(err, books) {        
                if(err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });
    
    // write middleware to avoid duplicate frags
    bookRouter.use('/:bookId', function (req, res, next) {
       
        Book.findById(req.params.bookId, function (err, book) {
            if(err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            } else {
                res.status(400).send ('No book found!');
            }
        });
    });

    // get book by id
    bookRouter.route('/:bookId')
        .get(function(req, res) {
            res.json(req.book);
        })
        .put(function(req, res) {     
            req.book.title = req.body.title;
            req.book.auther = req.body.auther;
            req.book.read = req.body.read;
            req.book.save(function(err) {             
                if(err)
                    res.status(500).send(err);
                else
                    res.json (req.book);
            });     
        })
        .patch(function(req, res) {
            
            if(req.body._id)
                delete req.body._id;
        
            for(var p in req.body) {       
                req.book[p] = req.body[p];
            }
            
            req.book.save(function(err) {             
                if(err)
                    res.status(500).send(err);
                else
                    res.json (req.book);
            });
        })
        .delete(function(req, res) {
            req.book.remove(function (err) {
                if(err)
                    res.status(500).send(err);
                else
                    res.status(240).send('Book has been removed!');
            });
        });
    
    return bookRouter;
};

module.exports = routes();