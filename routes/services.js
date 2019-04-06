var express = require('express');
var router = express.Router();


const {User, Guest} = require('../models/user');
const {Hotel, Room} = require('../models/hotel');
const {HotelService, AvailableService, OrderService} = require('../models/service');

//Add service form
router.get('/addService', function (req, res) {
    console.log('get add service form');
    Hotel.find({}, function(err, hotels){
        if(err)
        {
          console.log(err);
        }
        else {
          console.log(hotels);
          res.render('addService', {
            title:'Add service',
            hotels : hotels
          });
        }
    });
});


//Register process - hotel
router.post('/addService', function (req, res) {

    console.log('post add service form');
  
    const hotelName = req.body.hotelName;
    const serviceName = req.body.serviceName;
    const serviceType = req.body.serviceType;
    const openHour = req.body.openHour;
    const closeHour = req.body.closeHour;

    let newService = new HotelService({
      hotelName:hotelName,
      serviceName:serviceName,
      serviceType:serviceType,
      openHour:openHour,
      closeHour:closeHour,
    });
  
    newService.save(function (err) {
      if (err){
        console.log(err);
        return;
      } else{
        req.flash('success','Successfuly added the hotel');
        res.redirect('/services/addService');
      }
    }); 
  });

module.exports = router;