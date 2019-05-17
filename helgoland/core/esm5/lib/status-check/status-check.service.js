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
var StatusCheckService = /** @class */ (function () {
    function StatusCheckService(httpClient) {
        this.httpClient = httpClient;
        this.urls = [];
    }
    /**
     * Checks all internal registered URLs if they are reachable. Gives back every URL, which was not reachable
     * @return {?}
     */
    StatusCheckService.prototype.checkAll = /**
     * Checks all internal registered URLs if they are reachable. Gives back every URL, which was not reachable
     * @return {?}
     */
    function () {
        return this.doCheck(this.urls);
    };
    /**
     * Checks the given URL.
     * @param {?} url
     * @return {?} Observable with the URL if not reachable.
     */
    StatusCheckService.prototype.checkUrl = /**
     * Checks the given URL.
     * @param {?} url
     * @return {?} Observable with the URL if not reachable.
     */
    function (url) {
        return this.doCheckUrl(url);
    };
    /**
     * Checks the given URLs.
     * @param {?} urls
     * @return {?} Observable of all not reachable URLs.
     */
    StatusCheckService.prototype.checkUrls = /**
     * Checks the given URLs.
     * @param {?} urls
     * @return {?} Observable of all not reachable URLs.
     */
    function (urls) {
        return this.doCheck(urls);
    };
    /**
     * Adds the URL to the internal collection.
     * @param {?} url
     * @return {?}
     */
    StatusCheckService.prototype.addUrl = /**
     * Adds the URL to the internal collection.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var index = this.urls.indexOf(url);
        if (index === -1) {
            this.urls.push(url);
        }
    };
    /**
     * Removes the URL of the internal collection.
     * @param {?} url
     * @return {?}
     */
    StatusCheckService.prototype.removeUrl = /**
     * Removes the URL of the internal collection.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var index = this.urls.indexOf(url);
        if (index > -1) {
            this.urls.splice(index, 1);
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    StatusCheckService.prototype.doCheckUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        return new Observable(function (observer) {
            _this.httpClient.get(url).subscribe(function (res) {
                observer.next(null);
                observer.complete();
            }, function (error) {
                observer.next(url);
                observer.complete();
            });
        });
    };
    /**
     * @param {?} urls
     * @return {?}
     */
    StatusCheckService.prototype.doCheck = /**
     * @param {?} urls
     * @return {?}
     */
    function (urls) {
        var _this = this;
        /** @type {?} */
        var requests = [];
        urls.forEach(function (url) { return requests.push(_this.doCheckUrl(url)); });
        return forkJoin(requests).pipe(map(function (checkedUrls) {
            return checkedUrls.filter(function (entry) {
                if (entry) {
                    return entry;
                }
            });
        }));
    };
    StatusCheckService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StatusCheckService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return StatusCheckService;
}());
export { StatusCheckService };
if (false) {
    /** @type {?} */
    StatusCheckService.prototype.urls;
    /** @type {?} */
    StatusCheckService.prototype.httpClient;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWNoZWNrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc3RhdHVzLWNoZWNrL3N0YXR1cy1jaGVjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztJQVduQyw0QkFDVTtRQUFBLGVBQVUsR0FBVixVQUFVO29CQUhLLEVBQUU7S0FJdEI7Ozs7O0lBS0UscUNBQVE7Ozs7O1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBTzFCLHFDQUFROzs7OztjQUFDLEdBQVc7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7SUFPdkIsc0NBQVM7Ozs7O2NBQUMsSUFBYztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztJQU1yQixtQ0FBTTs7Ozs7Y0FBQyxHQUFXOztRQUN2QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRTs7Ozs7OztJQU1yQyxzQ0FBUzs7Ozs7Y0FBQyxHQUFXOztRQUMxQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQUU7Ozs7OztJQUd6Qyx1Q0FBVTs7OztjQUFDLEdBQVc7O1FBQzVCLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQTBCO1lBQy9DLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FDaEMsVUFBQyxHQUFHO2dCQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQixFQUNELFVBQUMsS0FBSztnQkFDSixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckIsQ0FDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDOzs7Ozs7SUFHRyxvQ0FBTzs7OztjQUFDLElBQWM7OztRQUM1QixJQUFNLFFBQVEsR0FBOEIsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHLENBQUMsVUFBQyxXQUFXO1lBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ2Q7YUFDRixDQUFDLENBQUM7U0FDSixDQUFDLENBQ0gsQ0FBQzs7O2dCQTFFTCxVQUFVOzs7O2dCQVRGLFVBQVU7OzZCQUFuQjs7U0FVYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBjaGVja3MgVVJMcyBpZiB0aGV5IGFyZSByZWFjaGFibGUgYnkgYSBzaW1wbGUgZ2V0IHJlcXVlc3QuIElmIHRoZXkgZ2V0cyBhbnl0aGluZyBiYWNrLCBldmVyeXRoaW5nIGlzIG9rLCBvdGhlcndpc2VcbiAqIHRoZSBjb3JyZXNwb25kaW5nIG1ldGhvZCBnaXZlcyBiYWNrIHRoZSBVUkxzIHdoaWNoIGFyZSBub3QgcmVhY2hhYmxlLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdHVzQ2hlY2tTZXJ2aWNlIHtcblxuICBwcml2YXRlIHVybHM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50XG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBhbGwgaW50ZXJuYWwgcmVnaXN0ZXJlZCBVUkxzIGlmIHRoZXkgYXJlIHJlYWNoYWJsZS4gR2l2ZXMgYmFjayBldmVyeSBVUkwsIHdoaWNoIHdhcyBub3QgcmVhY2hhYmxlXG4gICAqL1xuICBwdWJsaWMgY2hlY2tBbGwoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLmRvQ2hlY2sodGhpcy51cmxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGdpdmVuIFVSTC5cbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSB3aXRoIHRoZSBVUkwgaWYgbm90IHJlYWNoYWJsZS5cbiAgICovXG4gIHB1YmxpYyBjaGVja1VybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuZG9DaGVja1VybCh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgZ2l2ZW4gVVJMcy5cbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbGwgbm90IHJlYWNoYWJsZSBVUkxzLlxuICAgKi9cbiAgcHVibGljIGNoZWNrVXJscyh1cmxzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5kb0NoZWNrKHVybHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIFVSTCB0byB0aGUgaW50ZXJuYWwgY29sbGVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyBhZGRVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudXJscy5pbmRleE9mKHVybCk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyB0aGlzLnVybHMucHVzaCh1cmwpOyB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgVVJMIG9mIHRoZSBpbnRlcm5hbCBjb2xsZWN0aW9uLlxuICAgKi9cbiAgcHVibGljIHJlbW92ZVVybCh1cmw6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy51cmxzLmluZGV4T2YodXJsKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgeyB0aGlzLnVybHMuc3BsaWNlKGluZGV4LCAxKTsgfVxuICB9XG5cbiAgcHJpdmF0ZSBkb0NoZWNrVXJsKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChudWxsKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHVybCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZG9DaGVjayh1cmxzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICBjb25zdCByZXF1ZXN0czogQXJyYXk8T2JzZXJ2YWJsZTxzdHJpbmc+PiA9IFtdO1xuICAgIHVybHMuZm9yRWFjaCgodXJsKSA9PiByZXF1ZXN0cy5wdXNoKHRoaXMuZG9DaGVja1VybCh1cmwpKSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKHJlcXVlc3RzKS5waXBlKFxuICAgICAgbWFwKChjaGVja2VkVXJscykgPT4ge1xuICAgICAgICByZXR1cm4gY2hlY2tlZFVybHMuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxufVxuIl19