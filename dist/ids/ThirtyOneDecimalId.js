"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThirtyOneDecimalId = void 0;
var SnowFlakeId_1 = require("./SnowFlakeId");
var ThirtyOneDecimalId = /** @class */ (function (_super) {
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
