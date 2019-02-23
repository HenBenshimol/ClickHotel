var express = require('express');
var router = express.Router();


const {User, Guest} = require('../models/user');
const {Hotel, Room} = require('../models/hotel');

// GET General Information page.   
    //Find current guest
    router.get('/GeneralInformation', function(req, res) { 

      const currentUser = req.user;

      let query ={userID:currentUser.userID, activeGuest:true};

      Guest.findOne(query, function (err, guest) {
        if (err) throw err;
        
        if (!guest){
            return done(null, false, {message: 'Not check-In'});
        }  

        console.log(guest.hotelName);
        let query2 ={hotelName:guest.hotelName};

        Hotel.findOne(query2, function (err, hotel) {
          if (err) throw err;

          if (!hotel){
            return done(null, false, {message: 'Hotel not defined'});
          }  
          res.render('GeneralInformation', {
            title:'General Information',
            hotel: hotel
          });
        });
      });
    });


/* GET hotel history page. */
router.get('/hotelHistory', function(req, res) {

  console.log('get hotel history page');

  const currentUser = req.user;
  let query ={userID:currentUser.userID};

  Guest.find(query, function (err, guests) {
    if (err) throw err;
    
    if (!guests){
        return done(null, false, {message: 'hotel history does not exists'});
    }
    else
    {
      res.render('hotelHistory', { 
        title: 'Hotel History',
        guests : guests
      });
    }    
  });
});

//Add hotel form
router.get('/addHotel', function (req, res) {
  console.log('get add hotel form');
  res.render('addHotel', {
    title:'Add hotel'
  });
});

//Register process - hotel
router.post('/addHotel', function (req, res) {

  console.log('post add hotel form');

  const hotelName = req.body.hotelName;
  const location = req.body.location;
  const details = req.body.details;
  const phoneNum = req.body.phoneNum;
  const faxNum = req.body.faxNum;
  const checkinTime = req.body.checkinTime;
  const checkoutTime = req.body.checkoutTime;

  let newHotel = new Hotel({
    hotelName:hotelName,
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
      res.redirect('/hotel/addHotel');
    }
  }); 
});

//Add room form
router.get('/addRoom', function (req, res) {
  console.log('get add room form');

  Hotel.find({}, function(err, hotels){
    if(err)
    {
      console.log(err);
    }
    else {
      console.log(hotels);
      res.render('addRoom', {
        title:'Add room',
        hotels : hotels
      });
    }  
  });
});

//Register process - room
router.post('/addRoom', function (req, res) {

  console.log('post add room form');

  const hotelName = req.body.hotelName;
  const roomNum = req.body.roomNum;
  const roomType = req.body.roomType;
  const floorNum = req.body.floorNum;
  const numOfGuests = req.body.numOfGuests;
  const WIFIpass = req.body.WIFIpass;

  let newRoom = new Room({
    hotelName:hotelName,
    roomNum:roomNum,
    roomType:roomType,
    floorNum:floorNum,
    availability:true,
    numOfGuests:numOfGuests,
    WIFIpass:WIFIpass,
  });

  newRoom.save(function (err) {
    if (err){
      console.log(err);
      return;
    } else{
      req.flash('success','Successfuly added the room');
      res.redirect('/hotel/addRoom');
    }
  }); 
});

module.exports = router;
