import { DatasetApiInterface } from '@helgoland/core';
import { Service } from '@helgoland/core';
import { BlacklistedService } from '@helgoland/core';
import { ParameterFilter } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
export declare class ServiceSelectorService {
    protected apiInterface: DatasetApiInterface;
    constructor(apiInterface: DatasetApiInterface);
    fetchServicesOfAPI(url: string, blacklist: BlacklistedService[], filter: ParameterFilter): Observable<Service[]>;
    private isServiceBlacklisted(serviceID, url, blacklist);
}
