const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'type',
    collection: 'hotels'
};

//HotelBase schema
const hotelBase = mongoose.model('hotelBase', new mongoose.Schema({
    name: {
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
    }
}, baseOptions));

//Hotel schema
const Hotel = hotelBase.discriminator('Hotel', new mongoose.Schema({
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
}));

//Room schema
const Room = hotelBase.discriminator('Room', new mongoose.Schema({
    roomNum: {
        type: String,
        required: true
    },
    floor: {
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
}));

module.exports = {
    Hotel,
    Room
}