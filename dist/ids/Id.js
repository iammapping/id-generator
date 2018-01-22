"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an ID that can be used to store records in the immutable data-store with strong
 * guarantees of k-ordering.
 */
var Id = (function () {
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
