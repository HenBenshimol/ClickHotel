"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var room_1 = require("../models/room");
var base_1 = require("./base");
var RoomsCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(RoomsCtrl, _super);
    function RoomsCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = room_1.default;
        // Get room by id
        _this.getRoomById = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ _id: req.params.roomId })];
                    case 1:
                        obj = _a.sent();
                        console.log(obj);
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getRandomRoom = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ hotelName: req.params.hotelName, availability: true })];
                    case 1:
                        obj = _a.sent();
                        console.log("random " + obj);
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getRoomByUserId = function (req, res) {
            try {
                var obj = _this.model.findOne({ userId: req.params.userId });
                console.log("room by user id: " + obj);
                res.status(200).json(obj);
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        };
        return _this;
    }
    return RoomsCtrl;
}(base_1.default));
exports.default = RoomsCtrl;
//# sourceMappingURL=room.js.map