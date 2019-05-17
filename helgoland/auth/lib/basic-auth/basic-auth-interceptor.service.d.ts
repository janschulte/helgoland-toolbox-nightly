import { HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpRequestOptions, HttpServiceHandler, HttpServiceInterceptor, Settings, SettingsService } from '@helgoland/core';
import { Observable } from 'rxjs';
import { BasicAuthServiceMaintainer } from './basic-auth-service-maintainer.service';
import { BasicAuthService } from './basic-auth.service';
/**
 * Interceptor to a basic auth token if needed.
 */
export declare class BasicAuthInterceptorService implements HttpServiceInterceptor {
    protected settings: SettingsService<Settings>;
    protected basicAuthServices: BasicAuthServiceMaintainer;
    protected basicAuthSrvc: BasicAuthService;
    protected receptor: BasicAuthInformer;
    constructor(settings: SettingsService<Settings>, basicAuthServices: BasicAuthServiceMaintainer, basicAuthSrvc: BasicAuthService, receptor: BasicAuthInformer);
    intercept(req: HttpRequest<any>, options: Partial<HttpRequestOptions>, next: HttpServiceHandler): Observable<HttpEvent<any>>;
}
export interface BasicAuthCredentials {
    username: string;
    password: string;
}
/**
 * Needs to be implemented to do the authentication for the given url.
 */
export declare abstract class BasicAuthInformer {
    abstract doBasicAuth(url: string): Observable<boolean>;
}
