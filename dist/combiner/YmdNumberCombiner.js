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
exports.YmdNumberCombiner = void 0;
var YmdNumberId_1 = require("../ids/YmdNumberId");
var leftPad = require("left-pad");
var DateNumberCombiner_1 = require("./DateNumberCombiner");
var YmdNumberCombiner = /** @class */ (function (_super) {
    __extends(YmdNumberCombiner, _super);
    function YmdNumberCombiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YmdNumberCombiner.prototype.toTimePrefix = function (datetime) {
        return String(datetime.getFullYear()).substring(2) +
            leftPad(datetime.getMonth() + 1, 2, 0) +
            leftPad(datetime.getDate(), 2, 0);
    };
    YmdNumberCombiner.prototype.toIds = function (response) {
        return _super.prototype.toIds.call(this, response).map(function (id) { return new YmdNumberId_1.YmdNumberId(id.getId(), id.getTime()); });
    };
    return YmdNumberCombiner;
}(DateNumberCombiner_1.DateNumberCombiner));
exports.YmdNumberCombiner = YmdNumberCombiner;
