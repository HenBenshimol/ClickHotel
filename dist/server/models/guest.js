"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var guestSchema = new mongoose.Schema({
    userId: String,
    hotelName: String,
    checkinDate: Date,
    checkoutDate: Date,
    roomId: String,
    activeGuest: Boolean,
    ID: String,
    age: Number,
    fullName: String,
    guestStatus: String,
    guestPurpose: String,
    guestNumber: Number
});
var Guest = mongoose.model('Guest', guestSchema);
exports.default = Guest;
//# sourceMappingURL=guest.js.map