// We specify an custom epoch that we will use to fit our timestamps within the bounds of the 41 bits we have
// available. This gives us a range of ~69 years within which we can generate IDs.
//
// This timestamp must be in milliseconds.
export const DEFAULT_CUSTOM_EPOCH: number = 1455788600316;

export const ONE_SECOND_IN_MILLIS: number = 1000;
export const ONE_MILLI_IN_MICRO_SECS: number = 1000;
export const ONE_DAY_IN_MILLIS: number = 24 * 60 * 60 * 1000;
export const ONE_HOUR_IN_MILLIS: number = 60 * 60 * 1000;