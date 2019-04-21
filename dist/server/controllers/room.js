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
        return _this;
    }
    return RoomsCtrl;
}(base_1.default));
exports.default = RoomsCtrl;
//# sourceMappingURL=room.js.map