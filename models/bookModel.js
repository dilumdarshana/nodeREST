var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    
    title: {type: String},
    auther: {type: String},
    read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookSchema);