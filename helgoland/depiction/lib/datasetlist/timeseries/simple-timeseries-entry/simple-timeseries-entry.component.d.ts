import { DatasetApiInterface, IDataset, InternalIdHandler } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../../list-entry.component';
/**
 * Implements the abstract ListEntryComponent, which has the following functions:
 *  - can be selected and is selectable internally, with a corresponding output event
 *  - can be deleted, which also triggers an output event
 *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
 */
export declare class SimpleTimeseriesEntryComponent extends ListEntryComponent {
    protected api: DatasetApiInterface;
    protected internalIdHandler: InternalIdHandler;
    protected translateSrvc: TranslateService;
    dataset: IDataset;
    platformLabel: string;
    phenomenonLabel: string;
    procedureLabel: string;
    categoryLabel: string;
    uom: string;
    constructor(api: DatasetApiInterface, internalIdHandler: InternalIdHandler, translateSrvc: TranslateService);
    protected loadDataset(lang?: string): void;
    protected setDataset(timeseries: IDataset): void;
    protected setParameters(): void;
}
