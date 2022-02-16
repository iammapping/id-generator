"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCombiner = void 0;
var BaseCombiner = /** @class */ (function () {
    function BaseCombiner(keyPrefix, interval, offset, logicalShardIdBits, sequenceBits, minLogicalShardId) {
        if (keyPrefix === void 0) { keyPrefix = 'id-generator'; }
        if (interval === void 0) { interval = 1; }
        if (offset === void 0) { offset = -(new Date().getTimezoneOffset() * 60 * 1000); }
        if (logicalShardIdBits === void 0) { logicalShardIdBits = 10; }
        if (sequenceBits === void 0) { sequenceBits = 12; }
        if (minLogicalShardId === void 0) { minLogicalShardId = 0; }
        this.keyPrefix = keyPrefix;
        this.interval = interval;
        this.offset = offset;
        this.logicalShardIdBits = logicalShardIdBits;
        this.sequenceBits = sequenceBits;
        this.minLogicalShardId = minLogicalShardId;
    }
    Object.defineProperty(BaseCombiner.prototype, "KEY_PREFIX", {
        get: function () {
            return this.keyPrefix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "LOGICAL_SHARD_ID_BITS", {
        get: function () {
            return this.logicalShardIdBits;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "SEQUENCE_BITS", {
        get: function () {
            return this.sequenceBits;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "TIMESTAMP_SHIFT", {
        get: function () {
            return this.logicalShardIdBits + this.sequenceBits;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "LOGICAL_SHARD_ID_SHIFT", {
        get: function () {
            return this.sequenceBits;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MAX_SEQUENCE", {
        get: function () {
            return ~(-1 << this.sequenceBits);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MAX_LOGICAL_SHARD_ID", {
        get: function () {
            return ~(-1 << this.logicalShardIdBits);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MIN_LOGICAL_SHARD_ID", {
        get: function () {
            return this.minLogicalShardId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MAX_BATCH_SIZE", {
        get: function () {
            return ~(-1 << this.sequenceBits);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "INTERVAL", {
        get: function () {
            return this.interval;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "OFFSET", {
        get: function () {
            return this.offset;
        },
        enumerable: false,
        configurable: true
    });
    return BaseCombiner;
}());
exports.BaseCombiner = BaseCombiner;
