import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare abstract class HttpCache {
    /**
     * Returns a cached response, if any, or null if not present.
     */
    abstract get(req: HttpRequest<any>, expirationAtMs?: number): HttpResponse<any> | null;
    /**
     * Adds or updates the response in the cache.
     */
    abstract put(req: HttpRequest<any>, resp: HttpResponse<any>, expirationAtMs?: number): void;
}
export declare abstract class OnGoingHttpCache {
    abstract has(req: HttpRequest<any>): boolean;
    abstract set(req: HttpRequest<any>, request: Observable<HttpEvent<any>>): void;
    abstract observe(req: HttpRequest<any>): Observable<HttpEvent<any>>;
    abstract clear(req: HttpRequest<any>): void;
}
