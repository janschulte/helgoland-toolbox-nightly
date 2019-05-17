import { EventEmitter } from '@angular/core';
import { Dataset, DatasetApiInterface, DatasetOptions, InternalIdHandler } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../list-entry.component';
export declare class TrajectoryEntryComponent extends ListEntryComponent {
    protected api: DatasetApiInterface;
    protected internalIdHandler: InternalIdHandler;
    protected translateSrvc: TranslateService;
    datasetOptions: DatasetOptions;
    onUpdateOptions: EventEmitter<DatasetOptions>;
    onEditOptions: EventEmitter<DatasetOptions>;
    dataset: Dataset;
    tempColor: string;
    constructor(api: DatasetApiInterface, internalIdHandler: InternalIdHandler, translateSrvc: TranslateService);
    toggleVisibility(): void;
    editDatasetOptions(options: DatasetOptions): void;
    protected loadDataset(lang?: string): void;
}
