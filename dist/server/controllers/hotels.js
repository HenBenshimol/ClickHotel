"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var hotel_1 = require("../models/hotel");
var base_1 = require("./base");
var HotelsCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(HotelsCtrl, _super);
    function HotelsCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = hotel_1.default;
        return _this;
    }
    return HotelsCtrl;
}(base_1.default));
exports.default = HotelsCtrl;
//# sourceMappingURL=hotels.js.map