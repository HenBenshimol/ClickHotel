const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'type',
    collection: 'hotels'
};

//Base schema
const Base = mongoose.model('Base', new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
}, baseOptions));

//Hotel schema
const Hotel = Base.discriminator('Hotel', new mongoose.Schema({}));

//Room schema
const Room = Base.discriminator('Room', new mongoose.Schema({
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