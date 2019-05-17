import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpCache } from './model';
export declare class LocalHttpCache extends HttpCache {
    private cache;
    get(req: HttpRequest<any>, expirationAtMs?: number): HttpResponse<any>;
    put(req: HttpRequest<any>, resp: HttpResponse<any>, expirationAtMs?: number): void;
}
