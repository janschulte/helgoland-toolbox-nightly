import { EventEmitter, OnInit } from '@angular/core';
import { BlacklistedService, DatasetApi, ParameterFilter, Service } from '@helgoland/core';
import { ServiceSelectorService } from './service-selector.service';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export declare class ServiceSelectorComponent implements OnInit {
    protected serviceSelectorService: ServiceSelectorService;
    datasetApiList: DatasetApi[];
    providerBlacklist: BlacklistedService[];
    supportStations: boolean;
    selectedService: Service;
    filter: ParameterFilter;
    showUnresolvableServices: boolean;
    onServiceSelected: EventEmitter<Service>;
    services: Service[];
    unResolvableServices: DatasetApi[];
    loadingCount: number;
    constructor(serviceSelectorService: ServiceSelectorService);
    ngOnInit(): void;
    isSelected(service: Service): boolean;
    selectService(service: Service): void;
}
