import { AfterViewInit, ChangeDetectorRef, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DatasetOptions, HasLoadableContent, Time, TimeInterval, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '../model/d3-plot-options';
export declare class D3OverviewTimeseriesGraphComponent implements OnChanges, AfterViewInit, HasLoadableContent, OnDestroy {
    protected timeSrvc: Time;
    protected cd: ChangeDetectorRef;
    datasetIds: string[];
    datasetOptions: Map<string, DatasetOptions>;
    presenterOptions: D3PlotOptions;
    timeInterval: TimeInterval;
    rangefactor: number;
    reloadForDatasets: string[];
    onTimespanChanged: EventEmitter<Timespan>;
    onLoading: EventEmitter<boolean>;
    onContentLoading: EventEmitter<boolean>;
    isContentLoading: (loading: boolean) => void;
    overviewTimespan: Timespan;
    timespan: Timespan;
    private init;
    constructor(timeSrvc: Time, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    timeSpanChanged(timespan: Timespan): void;
    onGraphLoading(loading: boolean): void;
    private calculateOverviewRange();
}
