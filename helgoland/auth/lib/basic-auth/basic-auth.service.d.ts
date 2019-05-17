import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * Maintains all basic auth tokens and also do the authentication process.
 */
export declare class BasicAuthService {
    private http;
    private basicAuthTokens;
    constructor(http: HttpClient);
    /**
     * Do the authentication.
     */
    auth(username: string, password: string, url: string): Observable<string>;
    /**
     * Removes existing token.
     */
    clearToken(url: string): void;
    /**
     * Checks if a token exists.
     */
    hasToken(url: string): boolean;
    /**
     * Gets the token for the given service url.
     */
    getToken(url: string): string;
}
