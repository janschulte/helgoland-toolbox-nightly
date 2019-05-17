import { FilteredProvider, ParameterFilter } from '@helgoland/core';
export interface ListSelectorParameter {
    header: string;
    type: string;
    isDisabled?: boolean;
    headerAddition?: string;
    filterList?: ParameterFilter[];
}
export declare class ListSelectorService {
    cache: Map<string, ListSelectorParameter[]>;
    providerList: FilteredProvider[];
}
