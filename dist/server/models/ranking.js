"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var rankingSchema = new mongoose.Schema({
    userId: String,
    hotelName: String,
    roomId: String,
    comment: String,
    ranking: Number
});
var Ranking = mongoose.model('Ranking', rankingSchema);
exports.default = Ranking;
//# sourceMappingURL=ranking.js.map