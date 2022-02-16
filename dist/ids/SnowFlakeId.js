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
exports.SnowFlakeId = void 0;
var leftPad = require("left-pad");
var Id_1 = require("./Id");
var SnowFlakeId = /** @class */ (function (_super) {
    __extends(SnowFlakeId, _super);
    function SnowFlakeId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SnowFlakeId.prototype.toString = function () {
        return this.getId().toString(10);
    };
    SnowFlakeId.prototype.toBinaryString = function () {
        return leftPad(this.getId().toString(2), 64, 0);
    };
    return SnowFlakeId;
}(Id_1.Id));
exports.SnowFlakeId = SnowFlakeId;
