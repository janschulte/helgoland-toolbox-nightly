import { Timespan } from '../model/internal/timeInterval';
import { HttpHeaders } from '@angular/common/http';
export declare abstract class ApiInterface {
    protected createRequestUrl(apiUrl: string, endpoint: string, id?: string): string;
    protected createRequestTimespan(timespan: Timespan): string;
    protected createBasicAuthHeader(token: string): HttpHeaders;
}
