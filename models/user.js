const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'type',
    collection: 'users'
};

//Base schema
const Base = mongoose.model('Base', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
}, baseOptions));

//User schema
const User = Base.discriminator('User', new mongoose.Schema({}));

//Guest schema
const Guest = mongoose.model('Guest', new mongoose.Schema({
    hotelID: {
        type: String,
        required: true
    },
    roomID: {
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
    purpose: {
        type: String,
        required: true
    },
    recommendations: {
        type: String,
        required: false
    },
}));

//Employee schema
const Employee = Base.discriminator('Employee', new mongoose.Schema({}));

module.exports = {
    User,
    Guest,
    Employee
}