"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var order_1 = require("../models/order");
var base_1 = require("./base");
var OrderCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(OrderCtrl, _super);
    function OrderCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = order_1.default;
        return _this;
    }
    return OrderCtrl;
}(base_1.default));
exports.default = OrderCtrl;
//# sourceMappingURL=order.js.map