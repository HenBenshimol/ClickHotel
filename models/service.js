const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'type',
    collection: 'services'
};

//Base schema
const Base = mongoose.model('Base', new mongoose.Schema({
    Name: {
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
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    ranking: {
        type: String,
        required: true
    }
}, baseOptions));

//Service schema
const Service = Base.discriminator('Service', new mongoose.Schema({}));

//Room service schema
const RoomService = Base.discriminator('RoomService', new mongoose.Schema({
    roomNum: {
        type: String,
        required: true
    },
    availableDate: {
        type: Date,
        required: true
    },
    availableTime: {
        type: TimeRanges,
        required: true
    },
    facilitiesList: {
        type: String,
        required: true
    },
}));

//Hotel service schema
const HotelService = Base.discriminator('HotelService', new mongoose.Schema({
    guestID: {
        type: String,
        required: true
    },
}));

//BabySitting schema
const BabySitting = RoomService.discriminator('BabySitting ', new mongoose.Schema({
    numOfChildren: {
        type: Number,
        required: true
    },
}));

//Laundry schema
const Laundry = RoomService.discriminator('Laundry ', new mongoose.Schema({
    KG: {
        type: Number,
        required: true
    },
    specialRequests: {
        type: String,
        required: true
    },
}));

//Cleaning schema
const Cleaning = RoomService.discriminator('Cleaning ', new mongoose.Schema({
    clean: {
        type: Boolean,
        required: true
    },
    cleaningHoures: {
        type: String,
        required: true
    },
}));

module.exports = {
    RoomService,
    HotelService,
    BabySitting,
    Laundry,
    Cleaning
}

