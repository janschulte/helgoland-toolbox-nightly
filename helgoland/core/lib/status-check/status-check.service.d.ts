import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * This class checks URLs if they are reachable by a simple get request. If they gets anything back, everything is ok, otherwise
 * the corresponding method gives back the URLs which are not reachable.
 */
export declare class StatusCheckService {
    private httpClient;
    private urls;
    constructor(httpClient: HttpClient);
    /**
     * Checks all internal registered URLs if they are reachable. Gives back every URL, which was not reachable
     */
    checkAll(): Observable<string[]>;
    /**
     * Checks the given URL.
     * @returns Observable with the URL if not reachable.
     */
    checkUrl(url: string): Observable<string>;
    /**
     * Checks the given URLs.
     * @returns Observable of all not reachable URLs.
     */
    checkUrls(urls: string[]): Observable<string[]>;
    /**
     * Adds the URL to the internal collection.
     */
    addUrl(url: string): void;
    /**
     * Removes the URL of the internal collection.
     */
    removeUrl(url: string): void;
    private doCheckUrl(url);
    private doCheck(urls);
}
