import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Data } from '../model/dataset-api/data';
import { DataParameterFilter, HttpRequestOptions } from '../model/internal/http-requests';
import { Timespan } from '../model/internal/timeInterval';
import { DatasetImplApiInterface } from './dataset-impl-api-interface.service';
import { HttpService } from './http.service';
import { InternalIdHandler } from './internal-id-handler.service';
export declare class SplittedDataDatasetApiInterface extends DatasetImplApiInterface {
    protected httpservice: HttpService;
    protected internalDatasetId: InternalIdHandler;
    protected translate: TranslateService;
    constructor(httpservice: HttpService, internalDatasetId: InternalIdHandler, translate: TranslateService);
    getTsData<T>(id: string, apiUrl: string, timespan: Timespan, params: DataParameterFilter, options: HttpRequestOptions): Observable<Data<T>>;
}
