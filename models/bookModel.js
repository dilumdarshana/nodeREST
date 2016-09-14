var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({

    title: String,
    auther: String,
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('book', bookSchema);

//Date.now