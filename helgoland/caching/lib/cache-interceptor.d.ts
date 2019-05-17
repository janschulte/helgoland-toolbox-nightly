import { HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpRequestOptions, HttpServiceHandler, HttpServiceInterceptor } from '@helgoland/core';
import { Observable } from 'rxjs';
import { HttpCache, OnGoingHttpCache } from './model';
export declare class CachingInterceptor implements HttpServiceInterceptor {
    protected cache: HttpCache;
    protected ongoingCache: OnGoingHttpCache;
    constructor(cache: HttpCache, ongoingCache: OnGoingHttpCache);
    intercept(req: HttpRequest<any>, metadata: HttpRequestOptions, next: HttpServiceHandler): Observable<HttpEvent<any>>;
}
