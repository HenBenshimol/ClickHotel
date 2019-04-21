"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var roomSchema = new mongoose.Schema({
    hotelName: String,
    roomNum: Number,
    location: String,
    details: String,
    availability: Boolean
});
var Room = mongoose.model('Room', roomSchema);
exports.default = Room;
//# sourceMappingURL=room.js.map