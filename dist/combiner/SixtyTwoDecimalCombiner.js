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
var SixtyTwoDecimalId_1 = require("./../ids/SixtyTwoDecimalId");
var SnowFlakeCombiner_1 = require("./SnowFlakeCombiner");
var SixtyTwoDecimalCombiner = (function (_super) {
    __extends(SixtyTwoDecimalCombiner, _super);
    function SixtyTwoDecimalCombiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SixtyTwoDecimalCombiner.prototype.toIds = function (response) {
        return _super.prototype.toIds.call(this, response).map(function (id) { return new SixtyTwoDecimalId_1.SixtyTwoDecimalId(id.getId(), id.getTime()); });
    };
    SixtyTwoDecimalCombiner.KEY_PREFIX = 'thirty-one-generator';
    SixtyTwoDecimalCombiner.LOGICAL_SHARD_ID_BITS = 4;
    SixtyTwoDecimalCombiner.SEQUENCE_BITS = 12;
    return SixtyTwoDecimalCombiner;
}(SnowFlakeCombiner_1.SnowFlakeCombiner));
exports.SixtyTwoDecimalCombiner = SixtyTwoDecimalCombiner;
