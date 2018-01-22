"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseCombiner = (function () {
    function BaseCombiner(keyPrefix, interval, logicalShardIdBits, sequenceBits, minLogicalShardId) {
        if (keyPrefix === void 0) { keyPrefix = 'id-generator'; }
        if (interval === void 0) { interval = 1; }
        if (logicalShardIdBits === void 0) { logicalShardIdBits = 10; }
        if (sequenceBits === void 0) { sequenceBits = 12; }
        if (minLogicalShardId === void 0) { minLogicalShardId = 0; }
        this.keyPrefix = keyPrefix;
        this.interval = interval;
        this.logicalShardIdBits = logicalShardIdBits;
        this.sequenceBits = sequenceBits;
        this.minLogicalShardId = minLogicalShardId;
    }
    Object.defineProperty(BaseCombiner.prototype, "KEY_PREFIX", {
        get: function () {
            return this.keyPrefix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "LOGICAL_SHARD_ID_BITS", {
        get: function () {
            return this.logicalShardIdBits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "SEQUENCE_BITS", {
        get: function () {
            return this.sequenceBits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "TIMESTAMP_SHIFT", {
        get: function () {
            return this.logicalShardIdBits + this.sequenceBits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "LOGICAL_SHARD_ID_SHIFT", {
        get: function () {
            return this.sequenceBits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MAX_SEQUENCE", {
        get: function () {
            return ~(-1 << this.sequenceBits);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MAX_LOGICAL_SHARD_ID", {
        get: function () {
            return ~(-1 << this.logicalShardIdBits);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MIN_LOGICAL_SHARD_ID", {
        get: function () {
            return this.minLogicalShardId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "MAX_BATCH_SIZE", {
        get: function () {
            return ~(-1 << this.sequenceBits);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCombiner.prototype, "INTERVAL", {
        get: function () {
            return this.interval;
        },
        enumerable: true,
        configurable: true
    });
    return BaseCombiner;
}());
exports.BaseCombiner = BaseCombiner;
