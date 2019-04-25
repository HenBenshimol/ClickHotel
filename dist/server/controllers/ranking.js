"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ranking_1 = require("../models/ranking");
var base_1 = require("./base");
var RankingCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(RankingCtrl, _super);
    function RankingCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = ranking_1.default;
        return _this;
    }
    return RankingCtrl;
}(base_1.default));
exports.default = RankingCtrl;
//# sourceMappingURL=ranking.js.map