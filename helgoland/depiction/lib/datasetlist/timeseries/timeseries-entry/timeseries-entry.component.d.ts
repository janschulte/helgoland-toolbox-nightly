import { OnChanges } from '@angular/core';
import { ColorService, DatasetApiInterface, IdCache, InternalIdHandler, ReferenceValue, Time } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { FirstLatestTimeseriesEntryComponent } from '../first-latest-timeseries-entry/first-latest-timeseries-entry.component';
export declare class ReferenceValueColorCache extends IdCache<{
    color: string;
    visible: boolean;
}> {
}
/**
 * Extends the FirstLatestTimeseriesEntryComponent, with the following functions:
 *  - handles the reference values of the dataset entry
 */
export declare class TimeseriesEntryComponent extends FirstLatestTimeseriesEntryComponent implements OnChanges {
    protected api: DatasetApiInterface;
    protected timeSrvc: Time;
    protected internalIdHandler: InternalIdHandler;
    protected color: ColorService;
    protected refValCache: ReferenceValueColorCache;
    protected translateSrvc: TranslateService;
    informationVisible: boolean;
    referenceValues: ReferenceValue[];
    constructor(api: DatasetApiInterface, timeSrvc: Time, internalIdHandler: InternalIdHandler, color: ColorService, refValCache: ReferenceValueColorCache, translateSrvc: TranslateService);
    toggleInformation(): void;
    toggleReferenceValue(refValue: ReferenceValue): void;
    protected setParameters(): void;
    private createRefValId(refId);
}
