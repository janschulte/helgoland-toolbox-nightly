import { EventEmitter } from '@angular/core';
import { DefinedTimespan, DefinedTimespanService, Timespan } from '@helgoland/core';
export declare class TimespanButtonComponent {
    protected predefinedSrvc: DefinedTimespanService;
    predefined: string | DefinedTimespan;
    label: string;
    timespanFunc: () => Timespan;
    onTimespanSelected: EventEmitter<Timespan>;
    constructor(predefinedSrvc: DefinedTimespanService);
    clicked(): void;
}
