"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SnowFlakeId_1 = require("./SnowFlakeId");
var SixtyTwoDecimalId = (function (_super) {
    __extends(SixtyTwoDecimalId, _super);
    function SixtyTwoDecimalId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SixtyTwoDecimalId.prototype.getCode = function () {
        var code = '';
        var dec = this.getId();
        do {
            code = SixtyTwoDecimalId.SIXTY_TWO_ALPHABET[dec.mod(62).toNumber()] + code;
            dec = dec.divToInt(62);
        } while (dec.gt(0));
        return code;
    };
    SixtyTwoDecimalId.prototype.toString = function () {
        return this.getCode();
    };
    SixtyTwoDecimalId.SIXTY_TWO_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return SixtyTwoDecimalId;
}(SnowFlakeId_1.SnowFlakeId));
exports.SixtyTwoDecimalId = SixtyTwoDecimalId;
