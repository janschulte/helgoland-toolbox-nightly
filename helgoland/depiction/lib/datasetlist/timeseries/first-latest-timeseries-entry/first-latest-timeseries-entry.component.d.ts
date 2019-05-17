import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetApiInterface, FirstLastValue, InternalIdHandler, Time, TimeInterval } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurableTimeseriesEntryComponent } from '../configurable-timeseries-entry/configurable-timeseries-entry.component';
/**
 * Extends the ConfigurableTimeseriesEntryComponent, with the following functions:
 *  - first and latest validation
 *  - jump to first and latest value events
 */
export declare class FirstLatestTimeseriesEntryComponent extends ConfigurableTimeseriesEntryComponent implements OnChanges {
    protected api: DatasetApiInterface;
    protected internalIdHandler: InternalIdHandler;
    protected translateSrvc: TranslateService;
    protected timeSrvc: Time;
    timeInterval: TimeInterval;
    onSelectDate: EventEmitter<Date>;
    firstValue: FirstLastValue;
    lastValue: FirstLastValue;
    hasData: boolean;
    constructor(api: DatasetApiInterface, internalIdHandler: InternalIdHandler, translateSrvc: TranslateService, timeSrvc: Time);
    ngOnChanges(changes: SimpleChanges): void;
    jumpToFirstTimeStamp(): void;
    jumpToLastTimeStamp(): void;
    protected setParameters(): void;
    private checkDataInTimespan();
}
