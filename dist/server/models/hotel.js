"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    gymOpen: String,
    gymClose: String,
    poolOpen: String,
    poolClose: String,
    resturantOpen: String,
    resturantClose: String,
    spaOpen: String,
    spaClose: String,
    attractionBoardImage: String,
    hotelImage: String,
    hotelMap: String
});
var Hotel = mongoose.model('Hotel', hotelSchema);
exports.default = Hotel;
//# sourceMappingURL=hotel.js.map