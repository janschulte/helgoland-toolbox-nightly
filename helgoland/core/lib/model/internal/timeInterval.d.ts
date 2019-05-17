export declare abstract class TimeInterval {
}
export declare class Timespan extends TimeInterval {
    from: number;
    to: number;
    constructor(from: number, to?: number);
}
export declare class BufferedTime extends TimeInterval {
    timestamp: Date;
    bufferInterval: number;
    constructor(timestamp: Date, bufferInterval: number);
}
