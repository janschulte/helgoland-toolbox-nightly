import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class BasicAuthService {
    private http;
    private basicAuthToken;
    constructor(http: HttpClient);
    auth(username: string, password: string, url: string): Observable<string>;
    clearToken(): void;
    hasToken(): boolean;
    getToken(): string;
}
