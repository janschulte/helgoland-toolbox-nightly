import { AfterViewInit, ChangeDetectorRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetOptions, HasLoadableContent, Time, TimeInterval, Timespan } from '@helgoland/core';
export declare class FlotOverviewTimeseriesGraphComponent implements OnChanges, AfterViewInit, HasLoadableContent {
    protected timeSrvc: Time;
    protected cd: ChangeDetectorRef;
    datasetIds: string[];
    datasetOptions: Map<string, DatasetOptions>;
    graphOptions: any;
    timeInterval: TimeInterval;
    rangefactor: number;
    onTimespanChanged: EventEmitter<Timespan>;
    onLoading: EventEmitter<boolean>;
    onContentLoading: EventEmitter<boolean>;
    isContentLoading: (loading: boolean) => void;
    overviewTimespan: Timespan;
    private init;
    constructor(timeSrvc: Time, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    timeChanged(timespan: Timespan): void;
    private calculateOverviewRange();
}
