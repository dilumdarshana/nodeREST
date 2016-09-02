var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book', {
        title: String,
        auther: String,
        read: { type: Boolean, default: false}
    }),
    agent = request.agent(app);

describe ('Book CRUD test', function() {
    it('Should allow a book to be posted and return read and _id', function (done) {
        var testBook = {title: 'New Book', auther: 'Dilum Darshana'};
        
        agent.post('/api/Books')
            .send(testBook)
            .expect(200)
            .end(function(err, results) {
                results.body.read.should.not.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });
    
    afterEach(function(done) {
        Book.remove().exec();
        done(); 
    });
});