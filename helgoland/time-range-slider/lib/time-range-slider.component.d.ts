import 'bootstrap-slider';
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { TimeRangeSliderCache } from './time-range-slider.service';
export declare class TimeRangeSliderComponent implements OnChanges {
    protected cache: TimeRangeSliderCache;
    id: string;
    timeList: number[];
    onTimespanSelected: EventEmitter<Timespan>;
    start: number;
    selectionStart: number;
    end: number;
    selectionEnd: number;
    constructor(cache: TimeRangeSliderCache);
    ngOnChanges(changes: SimpleChanges): void;
}
