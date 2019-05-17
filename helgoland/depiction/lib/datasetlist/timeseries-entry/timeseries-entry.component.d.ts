import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ColorService, DatasetApiInterface, DatasetOptions, FirstLastValue, IDataset, IdCache, InternalIdHandler, ReferenceValue, Time, TimeInterval } from '@helgoland/core';
import { ListEntryComponent } from '../list-entry.component';
export declare class ReferenceValueColorCache extends IdCache<{
    color: string;
    visible: boolean;
}> {
}
export declare class TimeseriesEntryComponent extends ListEntryComponent implements OnChanges {
    protected api: DatasetApiInterface;
    protected timeSrvc: Time;
    protected internalIdHandler: InternalIdHandler;
    protected color: ColorService;
    protected refValCache: ReferenceValueColorCache;
    datasetOptions: DatasetOptions;
    timeInterval: TimeInterval;
    changedSelectedDatasets: string;
    onUpdateOptions: EventEmitter<DatasetOptions>;
    onEditOptions: EventEmitter<DatasetOptions>;
    onSelectDate: EventEmitter<Date>;
    onShowGeometry: EventEmitter<GeoJSON.GeoJsonObject>;
    platformLabel: string;
    phenomenonLabel: string;
    procedureLabel: string;
    categoryLabel: string;
    uom: string;
    firstValue: FirstLastValue;
    lastValue: FirstLastValue;
    informationVisible: boolean;
    tempColor: string;
    hasData: boolean;
    referenceValues: ReferenceValue[];
    loading: boolean;
    dataset: IDataset;
    constructor(api: DatasetApiInterface, timeSrvc: Time, internalIdHandler: InternalIdHandler, color: ColorService, refValCache: ReferenceValueColorCache);
    ngOnChanges(changes: SimpleChanges): void;
    toggleInformation(): void;
    jumpToFirstTimeStamp(): void;
    jumpToLastTimeStamp(): void;
    toggleVisibility(): void;
    toggleReferenceValue(refValue: ReferenceValue): void;
    editDatasetOptions(): void;
    showGeometry(): void;
    protected loadDataset(id: string, url: string): void;
    private setParameters();
    private createRefValId(refId);
    private checkDataInTimespan();
}
