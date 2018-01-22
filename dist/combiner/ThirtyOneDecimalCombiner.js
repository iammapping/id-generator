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
var SnowFlakeCombiner_1 = require("./SnowFlakeCombiner");
var ThirtyOneDecimalId_1 = require("../ids/ThirtyOneDecimalId");
var ThirtyOneDecimalCombiner = (function (_super) {
    __extends(ThirtyOneDecimalCombiner, _super);
    function ThirtyOneDecimalCombiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThirtyOneDecimalCombiner.prototype.toIds = function (response) {
        return _super.prototype.toIds.call(this, response).map(function (id) { return new ThirtyOneDecimalId_1.ThirtyOneDecimalId(id.getId(), id.getTime()); });
    };
    ThirtyOneDecimalCombiner.KEY_PREFIX = 'thirty-one-generator';
    ThirtyOneDecimalCombiner.LOGICAL_SHARD_ID_BITS = 4;
    ThirtyOneDecimalCombiner.SEQUENCE_BITS = 12;
    return ThirtyOneDecimalCombiner;
}(SnowFlakeCombiner_1.SnowFlakeCombiner));
exports.ThirtyOneDecimalCombiner = ThirtyOneDecimalCombiner;
