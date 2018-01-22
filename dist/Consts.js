"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We specify an custom epoch that we will use to fit our timestamps within the bounds of the 41 bits we have
// available. This gives us a range of ~69 years within which we can generate IDs.
//
// This timestamp must be in milliseconds.
exports.DEFAULT_CUSTOM_EPOCH = 1455788600316;
exports.ONE_SECOND_IN_MILLIS = 1000;
exports.ONE_MILLI_IN_MICRO_SECS = 1000;
exports.ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
