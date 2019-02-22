var express = require('express');
var router = express.Router();

const {Hotel, Room} = require('../models/hotel');

/* GET General Information page. */  
router.get('/GeneralInformation', function(req, res) {  
    Hotel.find({}, function(err, hotels){
    if(err)
    {
      console.log(err);
    }
    else {
      console.log(hotels);
      res.render('GeneralInformation', {
        title:'General Information',
        hotels : hotels
      });
    }
});
});


/* GET hotel history page. */
router.get('/hotelHistory', function(req, res) {
    res.render('hotelHistory', { title: 'Hotel History'});
  });

 //Add hotel form
router.get('/addHotel', function (req, res) {
  console.log('get add hotel form');
  res.render('addHotel', {
    title:'Add hotel'
  });
});

//Register process
router.post('/addHotel', function (req, res) {

  console.log('post add hotel form');

  const name = req.body.name;
  const location = req.body.location;
  const details = req.body.details;
  const phoneNum = req.body.phoneNum;
  const faxNum = req.body.faxNum;
  const checkinTime = req.body.checkinTime;
  const checkoutTime = req.body.checkoutTime;

  let newHotel = new Hotel({
    name:name,
    location:location,
    details:details,
    phoneNum:phoneNum,
    faxNum:faxNum,
    checkinTime:checkinTime,
    checkoutTime:checkoutTime,
  });

  newHotel.save(function (err) {
    if (err){
      console.log(err);
      return;
    } else{
      req.flash('success','Successfuly added the hotel');
      res.redirect('/hotel/GeneralInformation');
    }
  }); 
});

module.exports = router;
