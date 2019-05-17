import { EventEmitter, OnInit } from '@angular/core';
import { DatasetApiInterface, Station, Timeseries } from '@helgoland/core';
export declare class ExtendedTimeseries extends Timeseries {
    selected: boolean;
}
export declare class DatasetByStationSelectorComponent implements OnInit {
    protected apiInterface: DatasetApiInterface;
    station: Station;
    url: string;
    defaultSelected: boolean;
    phenomenonId: string;
    onSelectionChanged: EventEmitter<Timeseries[]>;
    timeseriesList: ExtendedTimeseries[];
    counter: number;
    constructor(apiInterface: DatasetApiInterface);
    ngOnInit(): void;
    toggle(timeseries: ExtendedTimeseries): void;
    protected prepareResult(result: ExtendedTimeseries, selection: boolean): void;
    private updateSelection();
}
