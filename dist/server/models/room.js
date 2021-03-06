"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var roomSchema = new mongoose.Schema({
    hotelName: String,
    roomNum: Number,
    floor: Number,
    wifi: String,
    location: String,
    details: String,
    availability: Boolean,
    userId: String
});
var Room = mongoose.model('Room', roomSchema);
exports.default = Room;
//# sourceMappingURL=room.js.map