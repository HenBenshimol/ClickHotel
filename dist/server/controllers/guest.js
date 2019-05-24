"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var guest_1 = require("../models/guest");
var base_1 = require("./base");
var GuestCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(GuestCtrl, _super);
    function GuestCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = guest_1.default;
        // Get by user id
        _this.getGuestByUserId = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({ userId: req.params.userId })];
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
        // Get active guest by user id
        _this.getActiveGuest = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ userId: req.params.userId, activeGuest: true })];
                    case 1:
                        obj = _a.sent();
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get all guest ages
        _this.getAllGuestAge = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find().map(function (item) { return item.age; })];
                    case 1:
                        obj = _a.sent();
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get all guest purpose
        _this.getAllGuestPurpose = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find().map(function (item) { return item.guestPurpose; })];
                    case 1:
                        obj = _a.sent();
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_4.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get all guest family status
        _this.getAllGuestStatus = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find().map(function (item) { return item.guestStatus; })];
                    case 1:
                        obj = _a.sent();
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_5.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get all guest vacation length
        _this.getAllVacationLength = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var dateIn, dateOut, dayDiff, timeDiff, i, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.model.find().map(function (item) { return item.checkinDate.Day(); })];
                    case 1:
                        dateIn = _a.sent();
                        return [4 /*yield*/, this.model.find().map(function (item) { return item.checkoutDate.Day(); })];
                    case 2:
                        dateOut = _a.sent();
                        dayDiff = [];
                        timeDiff = [];
                        for (i = 0; i < dateIn.length(); i++) {
                            timeDiff[i] = Math.abs(dateOut[i].getTime() - dateIn[i].getTime());
                            dayDiff[i] = Math.ceil(timeDiff[i] / (1000 * 3600 * 24));
                        }
                        res.status(200).json(dayDiff);
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_6.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return GuestCtrl;
}(base_1.default));
exports.default = GuestCtrl;
//# sourceMappingURL=guest.js.map