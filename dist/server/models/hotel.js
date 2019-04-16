"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    details: String,
    image: String
});
var Hotel = mongoose.model('Hotel', hotelSchema);
exports.default = Hotel;
//# sourceMappingURL=hotel.js.map