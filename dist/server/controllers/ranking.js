"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ranking_1 = require("../models/ranking");
var base_1 = require("./base");
var RankingCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(RankingCtrl, _super);
    function RankingCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Get ranking by number of guest and dates
        _this.getRankingByDate = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.aggregate([
                                { $match: { checkinDate: { $gte: (new Date(req.params.checkinDate)) }, checkoutDate: { $lt: (new Date(req.params.checkoutDate)) } } },
                                { $group: {
                                        _id: { hotelName: "$hotelName" },
                                        total: { $sum: "$rate" },
                                        count: { $sum: 1 }
                                    }
                                }
                            ])];
                    case 1:
                        obj = _a.sent();
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.model = ranking_1.default;
        return _this;
    }
    return RankingCtrl;
}(base_1.default));
exports.default = RankingCtrl;
//# sourceMappingURL=ranking.js.map