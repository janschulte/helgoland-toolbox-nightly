import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare enum DatasetApiVersion {
    V1 = 0,
    V2 = 1,
}
export declare class DatasetApiMapping {
    protected http: HttpClient;
    private cache;
    constructor(http: HttpClient);
    getApiVersion(apiUrl: string): Observable<DatasetApiVersion>;
    private confirmVersion(observer, version);
}
