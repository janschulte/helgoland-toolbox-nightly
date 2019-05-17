/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * This class checks URLs if they are reachable by a simple get request. If they gets anything back, everything is ok, otherwise
 * the corresponding method gives back the URLs which are not reachable.
 */
export class StatusCheckService {
    /**
     * @param {?} httpClient
     */
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.urls = [];
    }
    /**
     * Checks all internal registered URLs if they are reachable. Gives back every URL, which was not reachable
     * @return {?}
     */
    checkAll() {
        return this.doCheck(this.urls);
    }
    /**
     * Checks the given URL.
     * @param {?} url
     * @return {?} Observable with the URL if not reachable.
     */
    checkUrl(url) {
        return this.doCheckUrl(url);
    }
    /**
     * Checks the given URLs.
     * @param {?} urls
     * @return {?} Observable of all not reachable URLs.
     */
    checkUrls(urls) {
        return this.doCheck(urls);
    }
    /**
     * Adds the URL to the internal collection.
     * @param {?} url
     * @return {?}
     */
    addUrl(url) {
        /** @type {?} */
        const index = this.urls.indexOf(url);
        if (index === -1) {
            this.urls.push(url);
        }
    }
    /**
     * Removes the URL of the internal collection.
     * @param {?} url
     * @return {?}
     */
    removeUrl(url) {
        /** @type {?} */
        const index = this.urls.indexOf(url);
        if (index > -1) {
            this.urls.splice(index, 1);
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    doCheckUrl(url) {
        return new Observable((observer) => {
            this.httpClient.get(url).subscribe((res) => {
                observer.next(null);
                observer.complete();
            }, (error) => {
                observer.next(url);
                observer.complete();
            });
        });
    }
    /**
     * @param {?} urls
     * @return {?}
     */
    doCheck(urls) {
        /** @type {?} */
        const requests = [];
        urls.forEach((url) => requests.push(this.doCheckUrl(url)));
        return forkJoin(requests).pipe(map((checkedUrls) => {
            return checkedUrls.filter((entry) => {
                if (entry) {
                    return entry;
                }
            });
        }));
    }
}
StatusCheckService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StatusCheckService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /** @type {?} */
    StatusCheckService.prototype.urls;
    /** @type {?} */
    StatusCheckService.prototype.httpClient;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWNoZWNrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc3RhdHVzLWNoZWNrL3N0YXR1cy1jaGVjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBT3JDLE1BQU07Ozs7SUFJSixZQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7b0JBSEssRUFBRTtLQUl0Qjs7Ozs7SUFLRSxRQUFRO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBTzFCLFFBQVEsQ0FBQyxHQUFXO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0lBT3ZCLFNBQVMsQ0FBQyxJQUFjO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBTXJCLE1BQU0sQ0FBQyxHQUFXOztRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRTs7Ozs7OztJQU1yQyxTQUFTLENBQUMsR0FBVzs7UUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUFFOzs7Ozs7SUFHekMsVUFBVSxDQUFDLEdBQVc7UUFDNUIsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsUUFBMEIsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FDaEMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDTixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckIsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQixDQUNGLENBQUM7U0FDSCxDQUFDLENBQUM7Ozs7OztJQUdHLE9BQU8sQ0FBQyxJQUFjOztRQUM1QixNQUFNLFFBQVEsR0FBOEIsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDZDthQUNGLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FDSCxDQUFDOzs7O1lBMUVMLFVBQVU7Ozs7WUFURixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgY2hlY2tzIFVSTHMgaWYgdGhleSBhcmUgcmVhY2hhYmxlIGJ5IGEgc2ltcGxlIGdldCByZXF1ZXN0LiBJZiB0aGV5IGdldHMgYW55dGhpbmcgYmFjaywgZXZlcnl0aGluZyBpcyBvaywgb3RoZXJ3aXNlXG4gKiB0aGUgY29ycmVzcG9uZGluZyBtZXRob2QgZ2l2ZXMgYmFjayB0aGUgVVJMcyB3aGljaCBhcmUgbm90IHJlYWNoYWJsZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXR1c0NoZWNrU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB1cmxzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudFxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgYWxsIGludGVybmFsIHJlZ2lzdGVyZWQgVVJMcyBpZiB0aGV5IGFyZSByZWFjaGFibGUuIEdpdmVzIGJhY2sgZXZlcnkgVVJMLCB3aGljaCB3YXMgbm90IHJlYWNoYWJsZVxuICAgKi9cbiAgcHVibGljIGNoZWNrQWxsKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5kb0NoZWNrKHRoaXMudXJscyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBnaXZlbiBVUkwuXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgd2l0aCB0aGUgVVJMIGlmIG5vdCByZWFjaGFibGUuXG4gICAqL1xuICBwdWJsaWMgY2hlY2tVcmwodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmRvQ2hlY2tVcmwodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGdpdmVuIFVSTHMuXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYWxsIG5vdCByZWFjaGFibGUgVVJMcy5cbiAgICovXG4gIHB1YmxpYyBjaGVja1VybHModXJsczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuZG9DaGVjayh1cmxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBVUkwgdG8gdGhlIGludGVybmFsIGNvbGxlY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgYWRkVXJsKHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnVybHMuaW5kZXhPZih1cmwpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgdGhpcy51cmxzLnB1c2godXJsKTsgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIFVSTCBvZiB0aGUgaW50ZXJuYWwgY29sbGVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZW1vdmVVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudXJscy5pbmRleE9mKHVybCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHsgdGhpcy51cmxzLnNwbGljZShpbmRleCwgMSk7IH1cbiAgfVxuXG4gIHByaXZhdGUgZG9DaGVja1VybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgdGhpcy5odHRwQ2xpZW50LmdldCh1cmwpLnN1YnNjcmliZShcbiAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh1cmwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRvQ2hlY2sodXJsczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgcmVxdWVzdHM6IEFycmF5PE9ic2VydmFibGU8c3RyaW5nPj4gPSBbXTtcbiAgICB1cmxzLmZvckVhY2goKHVybCkgPT4gcmVxdWVzdHMucHVzaCh0aGlzLmRvQ2hlY2tVcmwodXJsKSkpO1xuICAgIHJldHVybiBmb3JrSm9pbihyZXF1ZXN0cykucGlwZShcbiAgICAgIG1hcCgoY2hlY2tlZFVybHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNoZWNrZWRVcmxzLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiJdfQ==