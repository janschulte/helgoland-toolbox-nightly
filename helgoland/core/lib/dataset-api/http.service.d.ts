import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptions } from '../model/internal/http-requests';
export declare const HTTP_SERVICE_INTERCEPTORS: InjectionToken<HttpServiceInterceptor>;
export interface HttpServiceHandler {
    handle(req: HttpRequest<any>, options: Partial<HttpRequestOptions>): Observable<HttpEvent<any>>;
}
export interface HttpServiceInterceptor {
    intercept(req: HttpRequest<any>, options: Partial<HttpRequestOptions>, next: HttpServiceHandler): Observable<HttpEvent<any>>;
}
export declare class HttpService {
    protected httpHandler: HttpHandler;
    private handler;
    constructor(httpHandler: HttpHandler, interceptors: HttpServiceInterceptor[] | null);
    client(options?: HttpRequestOptions): HttpClient;
}
