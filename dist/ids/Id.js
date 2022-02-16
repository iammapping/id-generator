"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
/**
 * Represents an ID that can be used to store records in the immutable data-store with strong
 * guarantees of k-ordering.
 */
var Id = /** @class */ (function () {
    function Id(id, time) {
        this.id = id;
        this.time = time;
    }
    Id.prototype.getId = function () {
        return this.id;
    };
    Id.prototype.getTime = function () {
        return this.time;
    };
    return Id;
}());
exports.Id = Id;
