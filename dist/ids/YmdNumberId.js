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
var Id_1 = require("./Id");
var YmdNumberId = (function (_super) {
    __extends(YmdNumberId, _super);
    function YmdNumberId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YmdNumberId.prototype.toString = function () {
        return this.getId();
    };
    return YmdNumberId;
}(Id_1.Id));
exports.YmdNumberId = YmdNumberId;
