const mongoose = require('mongoose');


const hotelServiceOptions = {
    discriminatorKey: 'type',
    collection: 'hotelServices'
};

const availableServiceOptions = {
    discriminatorKey: 'type',
    collection: 'availableServices'
};

const orderServiceOptions = {
    discriminatorKey: 'type',
    collection: 'orderServices'
};

//Base schema
const HotelService = mongoose.model('HotelService', new mongoose.Schema({
    hotelName:
    {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    openHour: {
        type: String,
        required: true
    },
    closeHour: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    ranking: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    timeRange: {
        type: Number,
        required: false
    },
}, hotelServiceOptions));

// Availability service type time
const AvailableService = mongoose.model('AvailableService', new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    roomNum: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    finishTime: {
        type: Date,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
}, availableServiceOptions));

//Order service schema
const OrderService = mongoose.model('OrderService', new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    roomNum: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    orderTime: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
},orderServiceOptions));

module.exports = {
    HotelService,
    AvailableService,
    OrderService
}