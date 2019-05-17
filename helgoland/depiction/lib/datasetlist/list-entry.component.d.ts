import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { InternalDatasetId, InternalIdHandler } from '@helgoland/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
/**
 * Represents an abstract dataset entry for a list, which has the following functions:
 *  - can be selected and is selectable internally, with a corresponding output event
 *  - can be deleted, which also triggers an output event
 *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
 */
export declare abstract class ListEntryComponent implements OnInit, OnDestroy {
    protected internalIdHandler: InternalIdHandler;
    protected translateSrvc: TranslateService;
    datasetId: string;
    selected: boolean;
    onDeleteDataset: EventEmitter<boolean>;
    onSelectDataset: EventEmitter<boolean>;
    loading: any;
    protected internalId: InternalDatasetId;
    private langChangeSubscription;
    constructor(internalIdHandler: InternalIdHandler, translateSrvc: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    removeDataset(): void;
    toggleSelection(): void;
    protected onLanguageChanged(langChangeEvent: LangChangeEvent): void;
    protected abstract loadDataset(lang?: string): void;
}
