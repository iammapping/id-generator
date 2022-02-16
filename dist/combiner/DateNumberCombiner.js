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
exports.DateNumberCombiner = void 0;
var Combiner_1 = require("./Combiner");
var Consts_1 = require("../Consts");
var leftPad = require("left-pad");
var StringId_1 = require("../ids/StringId");
var DateNumberCombiner = /** @class */ (function (_super) {
    __extends(DateNumberCombiner, _super);
    function DateNumberCombiner(keyPrefix, interval, seqPad) {
        if (keyPrefix === void 0) { keyPrefix = '0:ymd'; }
        if (interval === void 0) { interval = Consts_1.ONE_DAY_IN_MILLIS; }
        if (seqPad === void 0) { seqPad = 3; }
        var _this = _super.call(this, keyPrefix, interval) || this;
        _this.seqPad = seqPad;
        return _this;
    }
    DateNumberCombiner.prototype.toIds = function (response) {
        var timestamp = response.getTimeMilliSeconds();
        var datetime = new Date(timestamp + (new Date().getTimezoneOffset() * 60 * 1000 + response.getTimezoneOffset()));
        var idPrefix = this.toTimePrefix(datetime);
        idPrefix = idPrefix + response.getLogicalShardId();
        var ids = [];
        for (var sequence = response.getStartSequence(); sequence <= response.getEndSequence(); sequence++) {
            var id = idPrefix + leftPad(sequence, this.seqPad, '0');
            ids.push(new StringId_1.StringId(id, timestamp));
        }
        return ids;
    };
    Object.defineProperty(DateNumberCombiner.prototype, "MAX_SEQUENCE", {
        get: function () {
            return 9999999;
        },
        enumerable: false,
        configurable: true
    });
    return DateNumberCombiner;
}(Combiner_1.BaseCombiner));
exports.DateNumberCombiner = DateNumberCombiner;
