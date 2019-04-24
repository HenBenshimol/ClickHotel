"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseCtrl = /** @class */ (function () {
    function BaseCtrl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var docs, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({})];
                    case 1:
                        docs = _a.sent();
                        res.status(200).json(docs);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Count all
        this.count = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var count, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.count()];
                    case 1:
                        count = _a.sent();
                        res.status(200).json(count);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Insert
        this.insert = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new this.model(req.body).save()];
                    case 1:
                        obj = _a.sent();
                        res.status(201).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get by id
        this.get = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({ _id: req.params.id })];
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
        // Update by id
        this.update = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: req.params.id }, req.body)];
                    case 1:
                        _a.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_5.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Delete by id
        this.delete = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndRemove({ _id: req.params.id })];
                    case 1:
                        _a.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ error: err_6.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return BaseCtrl;
}());
exports.default = BaseCtrl;
//# sourceMappingURL=base.js.map