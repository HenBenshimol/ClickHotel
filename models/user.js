const mongoose = require('mongoose');

const userOptions = {
    discriminatorKey: 'type',
    collection: 'Users'
};

const guestOptions = {
    discriminatorKey: 'type',
    collection: 'Guests'
};

//User schema
const User = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isCheckedIn:{
        type: Boolean,
        require: true
    },
}, userOptions));

//Guest schema
const Guest = mongoose.model('Guest', new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    checkInDate: {
        type: String,
        required: true
    },
    checkOutDate: {
        type: String,
        required: true
    },
    roomNum: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    numOfGuests: {
        type: String,
        required: true
    },
    numOfRooms: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    recommendations: {
        type: String,
        required: false
    },
}, guestOptions));

//Employee schema
//const Employee = Base.discriminator('Employee', new mongoose.Schema({}));

module.exports = {
    User,
    Guest
  //  Employee
}