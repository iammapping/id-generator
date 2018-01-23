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
var RawBigNumber = require("bignumber.js");
var Combiner_1 = require("./Combiner");
var YmdNumberId_1 = require("../ids/YmdNumberId");
var Consts_1 = require("../Consts");
var leftPad = require("left-pad");
var BigNumber = RawBigNumber;
var YmdNumberCombiner = (function (_super) {
    __extends(YmdNumberCombiner, _super);
    function YmdNumberCombiner(keyPrefix) {
        if (keyPrefix === void 0) { keyPrefix = '0:ymd'; }
        var _this = _super.call(this, keyPrefix, Consts_1.ONE_DAY_IN_MILLIS) || this;
        _this.seqPad = 3;
        return _this;
    }
    YmdNumberCombiner.prototype.toIds = function (response) {
        var timestamp = response.getTimeMilliSeconds();
        var datetime = new Date(timestamp + (new Date().getTimezoneOffset() * 60 * 1000 + response.getTimezoneOffset()));
        var idPrefix = String(datetime.getFullYear()).substr(2) +
            leftPad(datetime.getMonth() + 1, 2, 0) +
            leftPad(datetime.getDate(), 2, 0);
        idPrefix = idPrefix + response.getLogicalShardId();
        var ids = [];
        for (var sequence = response.getStartSequence(); sequence <= response.getEndSequence(); sequence++) {
            var id = idPrefix + leftPad(sequence, this.seqPad, '0');
            ids.push(new YmdNumberId_1.YmdNumberId(id, timestamp));
        }
        return ids;
    };
    Object.defineProperty(YmdNumberCombiner.prototype, "MAX_SEQUENCE", {
        get: function () {
            return 9999999;
        },
        enumerable: true,
        configurable: true
    });
    return YmdNumberCombiner;
}(Combiner_1.BaseCombiner));
exports.YmdNumberCombiner = YmdNumberCombiner;
