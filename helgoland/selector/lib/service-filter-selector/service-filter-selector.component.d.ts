import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetApiInterface, LanguageChangNotifier, Parameter, ParameterFilter } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export declare class ServiceFilterSelectorComponent extends LanguageChangNotifier implements OnChanges {
    protected translate: TranslateService;
    protected apiInterface: DatasetApiInterface;
    endpoint: string;
    serviceUrl: string;
    filter: ParameterFilter;
    selectionId: string;
    onItemSelected: EventEmitter<Parameter>;
    loading: boolean;
    items: Parameter[];
    constructor(translate: TranslateService, apiInterface: DatasetApiInterface);
    ngOnChanges(changes: SimpleChanges): void;
    onSelectItem(item: Parameter): void;
    protected languageChanged(): void;
    private loadItems();
    private errorOnLoading();
    private setItems(res);
}
