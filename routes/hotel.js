var express = require('express');
var router = express.Router();
const Hotel = require('../models/hotel');

/* GET General Information page. */  
router.get('/GeneralInformation', function(req, res) { 
  res.render('GeneralInformation', { title: 'General Information'});
});

/* GET hotel history page. */
router.get('/hotelHistory', function(req, res) {
    res.render('hotelHistory', { title: 'Hotel History'});
  });


module.exports = router;
