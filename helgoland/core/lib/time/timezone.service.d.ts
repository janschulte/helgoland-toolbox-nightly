import { EventEmitter } from '@angular/core';
export declare class TimezoneService {
    private timezoneOffset;
    timezoneOffsetChanged: EventEmitter<number>;
    constructor();
    /**
     * Sets the offset difference in minutes to Universal Coordinated Time (UTC).
     *
     * @param offset
     */
    setTimezoneOffset(offset: number): void;
    /**
     * Gets the current offset in minutes to UTC.
     *
     * @returns offset
     */
    getTimezoneOffset(): number;
}
