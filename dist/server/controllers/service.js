"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Service_1 = require("../models/Service");
var base_1 = require("./base");
var ServiceCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceCtrl, _super);
    function ServiceCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = Service_1.default;
        // Get service type
        _this.getServicesType = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.distinct('type')];
                    case 1:
                        obj = _a.sent();
                        console.log("type " + obj);
                        res.status(200).json(obj);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: err_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Get by type
        _this.getServicesByType = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find({ type: req.params.type })];
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
        return _this;
    }
    return ServiceCtrl;
}(base_1.default));
exports.default = ServiceCtrl;
//# sourceMappingURL=service.js.map