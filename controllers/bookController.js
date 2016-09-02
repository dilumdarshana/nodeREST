var bookController = function(Book) {
    
    // add new book
    var post = function(req, res) {      
        var newBook = new Book (req.body);
        newBook.save();
        res.status(201).send(newBook);
    }
    // find book by auther. If no auther provided, API will return all available books
    var get = function(req, res) {      
        var query = {};
        // only accept existing attributes
        if(req.query.auther) {
            query.auther = req.query.auther;
        }
        
        // find book from mongo
        Book.find(query, function(err, books) {        
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    }
    
    // returning all available functions
    return {
        post: post,
        get: get
    }
}

module.exports = bookController;