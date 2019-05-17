import { EventEmitter, OnChanges } from '@angular/core';
import { DatasetApiInterface, Filter, LanguageChangNotifier, Parameter, ParameterFilter } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
export interface MultiServiceFilter {
    url: string;
    filter?: ParameterFilter;
}
export declare enum MultiServiceFilterEndpoint {
    offering = "offering",
    phenomenon = "phenomenon",
    procedure = "procedure",
    feature = "feature",
    category = "category",
    platform = "platform",
    dataset = "dataset",
}
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export declare class MultiServiceFilterSelectorComponent extends LanguageChangNotifier implements OnChanges {
    protected apiInterface: DatasetApiInterface;
    protected translate: TranslateService;
    endpoint: MultiServiceFilterEndpoint;
    filterList: MultiServiceFilter[];
    onItemSelected: EventEmitter<FilteredParameter>;
    loading: number;
    items: FilteredParameter[];
    constructor(apiInterface: DatasetApiInterface, translate: TranslateService);
    ngOnChanges(): void;
    onSelectItem(item: FilteredParameter): void;
    protected languageChanged(): void;
    private loadItems();
    private errorOnLoading();
    private setItems(res, prevfilter, url, service);
}
export interface FilteredParameter extends Parameter {
    filterList?: Filter[];
}
