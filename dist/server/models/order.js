"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    serviceId: String,
    hotelName: String,
    roomId: String,
    userId: String,
    type: String,
    date: Date,
    startHour: Date,
    details: String,
});
var Order = mongoose.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map