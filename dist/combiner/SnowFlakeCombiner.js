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
var SnowFlakeId_1 = require("../ids/SnowFlakeId");
var Combiner_1 = require("./Combiner");
var BigNumber = RawBigNumber;
var SnowFlakeCombiner = (function (_super) {
    __extends(SnowFlakeCombiner, _super);
    function SnowFlakeCombiner(customEpoch) {
        if (customEpoch === void 0) { customEpoch = SnowFlakeCombiner.DEFAULT_CUSTOM_EPOCH; }
        var _this = _super.call(this) || this;
        _this.customEpoch = customEpoch;
        return _this;
    }
    SnowFlakeCombiner.prototype.toIds = function (response) {
        // We get the timestamp from Redis in seconds, but we get microseconds too, so we can make a timestamp in
        // milliseconds (losing some precision in the meantime for the sake of keeping things in 41 bits) using both of
        // these values.
        var timestamp = response.getTimeMilliSeconds();
        // shift to left 22 bit
        var shiftedTimestamp = new BigNumber(timestamp).minus(this.customEpoch).times(Math.pow(2, this.TIMESTAMP_SHIFT));
        var logicalShardId = response.getLogicalShardId();
        var shiftedLogicalShardId = logicalShardId << this.LOGICAL_SHARD_ID_SHIFT;
        var ids = [];
        for (var sequence = response.getStartSequence(); sequence <= response.getEndSequence(); sequence++) {
            // Here's the fun bit-shifting. The purpose of this is to get a 64-bit ID of the following
            // format:
            //
            //  ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDDDD
            //
            // Where:
            //   * A is the reserved signed bit of a Java long.
            //   * B is the timestamp in milliseconds since custom epoch bits, 41 in total.
            //   * C is the logical shard ID, 10 bits in total.
            //   * D is the sequence, 12 bits in total.
            var id = shiftedTimestamp.plus(shiftedLogicalShardId).plus(sequence);
            ids.push(new SnowFlakeId_1.SnowFlakeId(id, timestamp));
        }
        return ids;
    };
    Object.defineProperty(SnowFlakeCombiner.prototype, "OFFSET", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    // We specify an custom epoch that we will use to fit our timestamps within the bounds of the 41 bits we have
    // available. This gives us a range of ~69 years within which we can generate IDs.
    //
    // This timestamp must be in milliseconds.
    SnowFlakeCombiner.DEFAULT_CUSTOM_EPOCH = 1455788600316;
    return SnowFlakeCombiner;
}(Combiner_1.BaseCombiner));
exports.SnowFlakeCombiner = SnowFlakeCombiner;
