// Dependencies
var express = require('express');
var router = express.Router();

// Routers
router.get('/products', function(req, res) {
   
    res.send('API is working fine');
});

// Return router
module.export = router;