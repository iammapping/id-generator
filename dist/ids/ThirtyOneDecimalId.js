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
var ThirtyOneDecimalId = (function (_super) {
    __extends(ThirtyOneDecimalId, _super);
    function ThirtyOneDecimalId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThirtyOneDecimalId.prototype.getCode = function () {
        var code = '';
        var dec = this.getId();
        do {
            code = ThirtyOneDecimalId.THIRTY_ONE_ALPHABET[dec.mod(31).toNumber()] + code;
            dec = dec.divToInt(31);
        } while (dec.gt(0));
        return code;
    };
    ThirtyOneDecimalId.prototype.toString = function () {
        return this.getCode();
    };
    ThirtyOneDecimalId.THIRTY_ONE_ALPHABET = '0123456789abcdefhkmnpqrstuvwxyz';
    return ThirtyOneDecimalId;
}(SnowFlakeId_1.SnowFlakeId));
exports.ThirtyOneDecimalId = ThirtyOneDecimalId;
