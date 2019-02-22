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
    Location: {
        type: String,
        required: true
    },
    Details: {
        type: String,
        required: true
    }
}, baseOptions));

//Hotel schema
const Hotel = Base.discriminator('Hotel', new mongoose.Schema({
    "Phone number": {
        type: String,
        required: true
    },
    "Fax number": {
        type: String,
        required: true
    },
    "Check-in time": {
        type: String,
        required: true
    },
    "Check-out time": {
        type: String,
        required: true
    },
    Logo: {
        type: ObjectId,
        required: true
    },
    Image1: {
        type: ObjectId,
        required: true
    },
    Image2: {
        type: ObjectId,
        required: true
    },
}));

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