const express = require('express');
const session = require('express-session')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');

// Bring in User and hotel model
const {User, Guest} = require('../models/user');
const {Hotel, Room} = require('../models/hotel');

//Register form
router.get('/register', function (req, res) {
  console.log('get register form');
  res.render('register', {
    title:'Register'
  });
});

//Register process
router.post('/register', function (req, res) {

  console.log('post register form');

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userID = req.body.userID;
  const phoneNum = req.body.phoneNum;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('userID', 'Last name is required').notEmpty();
  req.checkBody('phoneNum', 'Phone number is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      title:'Register',
      errors:errors
    });
  } else {
    let newUser = new User ({
      firstName:firstName,
      lastName:lastName,
      userID:userID,
      phoneNum:phoneNum,
      email:email,
      password:password,
      isCheckedIn:false
    });

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function (err) {
          if (err){
            console.log(err);
            return;
          } else{
            req.flash('success','You are now register');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

//Login form
router.get('/login', function (req, res) {
  console.log('get login form');
  res.render('login', {
    title:'Login'
  });
});

//Login process
router.post('/login', function (req, res, next) {
  console.log('post login form');
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout process
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

//Checkin form
router.get('/checkin', function (req, res) {
  console.log('get checkin form');
  Hotel.find({}, function(err, hotels){
    if(err)
    {
      console.log(err);
    }
    else {
      console.log(hotels);
      res.render('checkin', {
        title:'Check-In',
        hotels : hotels,
        currentUser : req.user
      });
    }
  });
});

//Checkin process
router.post('/checkin', function (req, res) {

  console.log('post checkin form');

  const hotelName = req.body.hotelName;
  const currentUser = req.user;
  const checkInDate = req.body.checkInDate;
  const checkOutDate = req.body.checkOutDate;
  const status = req.body.status;
  const numOfGuests = req.body.numOfGuests;
  const numOfRooms = req.body.numOfRooms;
  const roomType = req.body.roomType;
  const purpose = req.body.purpose;
  const roomNum = "1";

  req.checkBody('hotelName', 'Hotel name is required').notEmpty();
  req.checkBody('status', 'Status is required').notEmpty();
  req.checkBody('numOfGuests', 'Number of guests is required').notEmpty();
  req.checkBody('purpose', 'Purpose is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    Hotel.find({}, function(err, hotels){
      if(err)
      {
        console.log(err);
      }
      else {
        console.log(hotels);
        res.render('checkin', {
          title:'Check-In',
          hotels : hotels,
          currentUser : currentUser
        });
      }
    });
  } else {
    let newGuest = new Guest({
      userID:currentUser.userID,
      hotelName:hotelName,
      checkInDate:checkInDate,
      checkOutDate:checkOutDate,
      roomNum:roomNum,
      status:status,
      numOfGuests:numOfGuests,
      numOfRooms:numOfRooms,
      roomType:roomType,
      purpose:purpose,
      activeGuest:true
    });

    newGuest.save(function (err) {
      if (err){
        console.log(err);
        return;
      } else {
        currentUser.isCheckedIn = true;
        currentUser.save(function (err) {
          if (err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now guest on the hotel');
            res.redirect('/users/typCheckin');
          }
        });
      }
    });
  }
});

//Checkout form
router.get('/checkout', function (req, res) {

  const currentUser = req.user;

  if(currentUser.isCheckedIn)
  {
    //Find current guest
    let query ={userID:currentUser.userID, activeGuest:true};

    Guest.findOne(query, function (err, guest) {
      if (err) throw err;
      
      if (!guest){
          return done(null, false, {message: 'No check-In found'});
      }  
      else 
      {
        console.log('get checkout form');
        res.render('checkout', {
          title:'Check-Out',
          currentUser : currentUser,
          currentGuest : guest
        }); 
      }  
    });
  }
  else
  {
    Hotel.find({}, function(err, hotels){
      if(err)
      {
        console.log(err);
      }
      else {
        console.log(hotels);
        res.render('checkin', {
          title:'Check-In',
          hotels : hotels,
          currentUser : currentUser
        });
      }
    });
  }
});

//Checkout process
router.post('/checkout', function (req, res) {
 
  console.log('post checkout form');

  const currentUser = req.user;
  const checkOutDate = req.body.checkOutDate;
  const rankHotel = req.body.rankHotel;
  const comment = req.body.comment;

  currentUser.isCheckedIn = false;
  currentUser.save(function (err) {
    if (err){
      console.log(err);
      return;
    } 
  });
  
  let query ={userID:currentUser.userID, activeGuest:true};

  Guest.findOne(query, function (err, guest) {
    if (err) throw err;
    
    if (!guest){
        return done(null, false, {message: 'No check-In found'});
    }  
    else 
    {
      guest.activeGuest = false;
      guest.checkOutDate = checkOutDate;
      guest.save(function (err) {
        if (err){
          console.log(err);
          return;
        } else {
          req.flash('success','You are checkd out');
          res.redirect('/');
        }
      });
    }
  });
});

//Checkin thank you page
router.get('/typCheckin', function (req, res) {
  console.log('get thank you page');

  const currentUser = req.user;

  if(currentUser.isCheckedIn)
  {
    //Find current guest
    let query ={userID:currentUser.userID, activeGuest:true};

    Guest.findOne(query, function (err, guest) {
      if (err) throw err;
      
      if (!guest){
          return done(null, false, {message: 'No check-In found'});
      }  

      let query ={hotelName:guest.hotelName, roomNum:guest.roomNum};
      
      Room.findOne(query, function (err, room) {
        if (err) throw err;
        
        if (!room){
            return done(null, false, {message: 'Room not found'});
        } else {
          res.render('typCheckin', {
            title:'You are checked in',
            room : room
          }); 
        }  
      });
    });
  }
  else
  {
    console.log("user not checked in");

    Hotel.find({}, function(err, hotels){
      if(err)
      {
        console.log(err);
      }
      else {
        console.log(hotels);
        res.render('checkin', {
          title:'Check-In',
          hotels : hotels,
          currentUser : currentUser
        });
      }
    });
  }
});

module.exports = router;