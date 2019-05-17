import { EventEmitter } from '@angular/core';
import { DatasetApiInterface, DatasetOptions, InternalIdHandler } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { SimpleTimeseriesEntryComponent } from '../simple-timeseries-entry/simple-timeseries-entry.component';
/**
 * Extends the SimpleTimeseriesEntryComponent, with the following functions:
 *  - dataset options and triggers the editation of the dataset options
 *  - triggers the show geometry event
 */
export declare class ConfigurableTimeseriesEntryComponent extends SimpleTimeseriesEntryComponent {
    protected api: DatasetApiInterface;
    protected internalIdHandler: InternalIdHandler;
    protected translateSrvc: TranslateService;
    datasetOptions: DatasetOptions;
    highlight: boolean;
    onUpdateOptions: EventEmitter<DatasetOptions>;
    onEditOptions: EventEmitter<DatasetOptions>;
    onShowGeometry: EventEmitter<GeoJSON.GeoJsonObject>;
    constructor(api: DatasetApiInterface, internalIdHandler: InternalIdHandler, translateSrvc: TranslateService);
    toggleVisibility(): void;
    editDatasetOptions(): void;
    showGeometry(): void;
}
