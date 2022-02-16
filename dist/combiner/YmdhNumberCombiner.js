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
exports.YmdhNumberCombiner = void 0;
var Consts_1 = require("./../Consts");
var YmdhNumberId_1 = require("../ids/YmdhNumberId");
var leftPad = require("left-pad");
var DateNumberCombiner_1 = require("./DateNumberCombiner");
var YmdhNumberCombiner = /** @class */ (function (_super) {
    __extends(YmdhNumberCombiner, _super);
    function YmdhNumberCombiner(keyPrefix) {
        if (keyPrefix === void 0) { keyPrefix = '0:ymdh'; }
        return _super.call(this, keyPrefix, Consts_1.ONE_HOUR_IN_MILLIS, 2) || this;
    }
    YmdhNumberCombiner.prototype.toTimePrefix = function (datetime) {
        return String(datetime.getFullYear()).substring(2) +
            leftPad(datetime.getMonth() + 1, 2, 0) +
            leftPad(datetime.getDate(), 2, 0) +
            leftPad(datetime.getHours(), 2, 0);
    };
    YmdhNumberCombiner.prototype.toIds = function (response) {
        return _super.prototype.toIds.call(this, response).map(function (id) { return new YmdhNumberId_1.YmdhNumberId(id.getId(), id.getTime()); });
    };
    return YmdhNumberCombiner;
}(DateNumberCombiner_1.DateNumberCombiner));
exports.YmdhNumberCombiner = YmdhNumberCombiner;
