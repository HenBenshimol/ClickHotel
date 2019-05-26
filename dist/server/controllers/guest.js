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
            var arrAges, obj, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        arrAges = [];
                        return [4 /*yield*/, this.model.find({}, { age: 1, _id: 0 })];
                    case 1:
                        obj = _a.sent();
                        obj.forEach(function (element) {
                            arrAges.push(element.age);
                        });
                        res.status(200).json(arrAges);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get all guest family status
        _this.getAllGuestStatus = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var arrGuestStatus_1, obj, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        arrGuestStatus_1 = [];
                        return [4 /*yield*/, this.model.find({}, { guestStatus: 1, _id: 0 })];
                    case 1:
                        obj = _a.sent();
                        obj.forEach(function (element) {
                            // convert Single to '0'
                            if (element.guestStatus === 'single') {
                                arrGuestStatus_1.push(0);
                            }
                            // convert Married to '1'
                            else if (element.guestStatus === 'married') {
                                arrGuestStatus_1.push(1);
                            }
                            // convert Family to '2'
                            else if (element.guestStatus === 'family') {
                                arrGuestStatus_1.push(2);
                            }
                        });
                        res.status(200).json(arrGuestStatus_1);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_4.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get all guest purpose
        _this.getAllGuestPurpose = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var arrPurpose_1, obj, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        arrPurpose_1 = [];
                        return [4 /*yield*/, this.model.find({}, { guestPurpose: 1, _id: 0 })];
                    case 1:
                        obj = _a.sent();
                        obj.forEach(function (element) {
                            // convert Buisness to '3'
                            if (element.guestPurpose === 'Buisness') {
                                arrPurpose_1.push(3);
                            }
                            // convert Pleasure to '4'
                            if (element.guestPurpose === 'Pleasure') {
                                arrPurpose_1.push(4);
                            }
                        });
                        res.status(200).json(arrPurpose_1);
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
            var oneDay_1, vacationLength_1, dates, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        oneDay_1 = 24 * 60 * 60 * 1000;
                        vacationLength_1 = [];
                        return [4 /*yield*/, this.model.find({}, { checkinDate: 1, checkoutDate: 1, _id: 0 })];
                    case 1:
                        dates = _a.sent();
                        dates.forEach(function (element) {
                            vacationLength_1.push(Math.round(Math.abs((element.checkinDate.getTime() - element.checkoutDate.getTime()) / (oneDay_1))));
                        });
                        res.status(200).json(vacationLength_1);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_6.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return GuestCtrl;
}(base_1.default));
exports.default = GuestCtrl;
//# sourceMappingURL=guest.js.map