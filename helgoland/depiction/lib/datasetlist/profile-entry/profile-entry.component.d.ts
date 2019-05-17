import { EventEmitter } from '@angular/core';
import { Dataset, DatasetApiInterface, InternalIdHandler, TimedDatasetOptions } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../list-entry.component';
export declare class ProfileEntryComponent extends ListEntryComponent {
    protected api: DatasetApiInterface;
    protected internalIdHandler: InternalIdHandler;
    protected translateSrvc: TranslateService;
    datasetOptions: TimedDatasetOptions[];
    onUpdateOptions: EventEmitter<TimedDatasetOptions[]>;
    onDeleteDatasetOptions: EventEmitter<TimedDatasetOptions>;
    onEditOptions: EventEmitter<TimedDatasetOptions>;
    onOpenInCombiView: EventEmitter<TimedDatasetOptions>;
    onShowGeometry: EventEmitter<GeoJSON.GeoJsonObject>;
    dataset: Dataset;
    editableOptions: TimedDatasetOptions;
    tempColor: string;
    constructor(api: DatasetApiInterface, internalIdHandler: InternalIdHandler, translateSrvc: TranslateService);
    removeDatasetOptions(options: TimedDatasetOptions): void;
    editDatasetOptions(options: TimedDatasetOptions): void;
    toggleVisibility(options: TimedDatasetOptions): void;
    isMobile(): boolean;
    openInCombiView(option: TimedDatasetOptions): void;
    showGeometry(option: TimedDatasetOptions): void;
    protected loadDataset(lang?: string): void;
}
