/**
 * Represents an ID that can be used to store records in the immutable data-store with strong
 * guarantees of k-ordering.
 */
export declare abstract class Id<T> {
    /**
     * A long value representing an ID as generated by the IdGenerator.
     */
    private id;
    /**
     * The timestamp this ID was created at, in milliseconds.
     */
    private time;
    constructor(id: T, time: number);
    getId(): T;
    getTime(): number;
    abstract toString(): string;
}