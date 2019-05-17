import { EventEmitter } from '@angular/core';
import { Time, Timespan } from '@helgoland/core';
export declare class TimespanShiftSelectorComponent {
    protected timeSrvc: Time;
    timespan: Timespan;
    onTimespanChange: EventEmitter<Timespan>;
    onOpenTimeSettings: EventEmitter<void>;
    constructor(timeSrvc: Time);
    back(): void;
    forward(): void;
    open(): void;
}
