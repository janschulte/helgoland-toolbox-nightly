import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetApiInterface, DatasetApiMapping, FilteredProvider, IDataset, ParameterFilter } from '@helgoland/core';
import { FilteredParameter } from '../multi-service-filter-selector/multi-service-filter-selector.component';
import { ListSelectorParameter, ListSelectorService } from './list-selector.service';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export declare class ListSelectorComponent implements OnChanges {
    protected listSelectorService: ListSelectorService;
    protected apiInterface: DatasetApiInterface;
    protected apiMapping: DatasetApiMapping;
    parameters: ListSelectorParameter[];
    filter: ParameterFilter;
    providerList: FilteredProvider[];
    selectorId: string;
    onDatasetSelection: EventEmitter<IDataset[]>;
    activePanel: string;
    constructor(listSelectorService: ListSelectorService, apiInterface: DatasetApiInterface, apiMapping: DatasetApiMapping);
    ngOnChanges(changes: SimpleChanges): void;
    itemSelected(item: FilteredParameter, index: number): void;
    private openDataset(url, params);
    private isEqual(listOne, listTwo);
}
