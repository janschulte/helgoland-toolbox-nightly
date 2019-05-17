import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class LocalOngoingHttpCache {
    private cache;
    has(req: HttpRequest<any>): boolean;
    set(req: HttpRequest<any>, request: Observable<HttpEvent<any>>): void;
    observe(req: HttpRequest<any>): Observable<HttpEvent<any>>;
    clear(req: HttpRequest<any>): void;
}
