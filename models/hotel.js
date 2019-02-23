const mongoose = require('mongoose');

const hotelOptions = {
    discriminatorKey: 'type',
    collection: 'Hotels'
};

const roomOptions = {
    discriminatorKey: 'type',
    collection: 'Rooms'
};

//Hotel schema
const Hotel = mongoose.model('Hotel', new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    phoneNum: {
        type: String,
        required: true
    },
    faxNum: {
        type: String,
        required: true
    },
    checkinTime: {
        type: String,
        required: false
    },
    checkoutTime: {
        type: String,
        required: false
    },
    logo: {
        type: Object,
        required: false
    },
    image1: {
        type: Object,
        required: false
    },
    image2: {
        type: Object,
        required: false
    },
}, hotelOptions));

//Room schema
const Room = mongoose.model('Room', new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    roomNum: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    floorNum: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    numOfGuests: {
        type: Number,
        required: true
    },
}, roomOptions));

module.exports = {
    Hotel,
    Room
}