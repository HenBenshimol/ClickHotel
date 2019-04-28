"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var serviceSchema = new mongoose.Schema({
    name: String,
    hotelName: String,
    type: String,
    openHour: String,
    closeHour: String,
    needDetails: Boolean,
    details: String
});
var Service = mongoose.model('service', serviceSchema);
exports.default = Service;
//# sourceMappingURL=Service.js.map