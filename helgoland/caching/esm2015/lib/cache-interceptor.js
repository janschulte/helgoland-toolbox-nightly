/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { HttpCache, OnGoingHttpCache } from './model';
export class CachingInterceptor {
    /**
     * @param {?} cache
     * @param {?} ongoingCache
     */
    constructor(cache, ongoingCache) {
        this.cache = cache;
        this.ongoingCache = ongoingCache;
    }
    /**
     * @param {?} req
     * @param {?} metadata
     * @param {?} next
     * @return {?}
     */
    intercept(req, metadata, next) {
        // Before doing anything, it's important to only cache GET requests.
        // Skip this interceptor if the request method isn't GET.
        if (req.method !== 'GET') {
            return next.handle(req, metadata);
        }
        if (metadata.forceUpdate) {
            return next.handle(req, metadata);
        }
        /** @type {?} */
        const cachedResponse = this.cache.get(req, metadata.expirationAtMs);
        if (cachedResponse) {
            // A cached response exists. Serve it instead of forwarding
            // the request to the next handler.
            return of(cachedResponse);
        }
        // check if the same request is still in the pipe
        if (this.ongoingCache.has(req)) {
            return this.ongoingCache.observe(req);
        }
        else {
            // No cached response exists. Go to the network, and cache
            // the response when it arrives.
            return new Observable((observer) => {
                /** @type {?} */
                const shared = next.handle(req, metadata).pipe(share());
                shared.subscribe((res) => {
                    if (res instanceof HttpResponse) {
                        this.cache.put(req, res, metadata.expirationAtMs);
                        this.ongoingCache.clear(req);
                        observer.next(res);
                        observer.complete();
                    }
                }, (error) => {
                    observer.error(error);
                    observer.complete();
                });
                this.ongoingCache.set(req, shared);
            });
        }
    }
}
CachingInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CachingInterceptor.ctorParameters = () => [
    { type: HttpCache },
    { type: OnGoingHttpCache }
];
if (false) {
    /** @type {?} */
    CachingInterceptor.prototype.cache;
    /** @type {?} */
    CachingInterceptor.prototype.ongoingCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvIiwic291cmNlcyI6WyJsaWIvY2FjaGUtaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBMEIsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUd0RCxNQUFNOzs7OztJQUNGLFlBQ2MsS0FBZ0IsRUFDaEIsWUFBOEI7UUFEOUIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7S0FDdkM7Ozs7Ozs7SUFFRSxTQUFTLENBQ1osR0FBcUIsRUFBRSxRQUE0QixFQUFFLElBQXdCOzs7UUFLN0UsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNyQztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNyQzs7UUFHRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztZQUdqQixNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzdCOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekM7UUFBQyxJQUFJLENBQUMsQ0FBQzs7O1lBR0osTUFBTSxDQUFDLElBQUksVUFBVSxDQUFpQixDQUFDLFFBQWtDLEVBQUUsRUFBRTs7Z0JBQ3pFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25CLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDdkI7aUJBQ0osRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNULFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN0QyxDQUFDLENBQUM7U0FDTjs7OztZQWxEUixVQUFVOzs7O1lBRkYsU0FBUztZQUFFLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBFdmVudCwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucywgSHR0cFNlcnZpY2VIYW5kbGVyLCBIdHRwU2VydmljZUludGVyY2VwdG9yIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZSwgT25Hb2luZ0h0dHBDYWNoZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FjaGluZ0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBjYWNoZTogSHR0cENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgb25nb2luZ0NhY2hlOiBPbkdvaW5nSHR0cENhY2hlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBpbnRlcmNlcHQoXG4gICAgICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbWV0YWRhdGE6IEh0dHBSZXF1ZXN0T3B0aW9ucywgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyXG4gICAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuXG4gICAgICAgIC8vIEJlZm9yZSBkb2luZyBhbnl0aGluZywgaXQncyBpbXBvcnRhbnQgdG8gb25seSBjYWNoZSBHRVQgcmVxdWVzdHMuXG4gICAgICAgIC8vIFNraXAgdGhpcyBpbnRlcmNlcHRvciBpZiB0aGUgcmVxdWVzdCBtZXRob2QgaXNuJ3QgR0VULlxuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRhZGF0YS5mb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QsIGNoZWNrIHRoZSBjYWNoZSB0byBzZWUgaWYgdGhpcyByZXF1ZXN0IGV4aXN0cy5cbiAgICAgICAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSB0aGlzLmNhY2hlLmdldChyZXEsIG1ldGFkYXRhLmV4cGlyYXRpb25BdE1zKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBBIGNhY2hlZCByZXNwb25zZSBleGlzdHMuIFNlcnZlIGl0IGluc3RlYWQgb2YgZm9yd2FyZGluZ1xuICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgdG8gdGhlIG5leHQgaGFuZGxlci5cbiAgICAgICAgICAgIHJldHVybiBvZihjYWNoZWRSZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2FtZSByZXF1ZXN0IGlzIHN0aWxsIGluIHRoZSBwaXBlXG4gICAgICAgIGlmICh0aGlzLm9uZ29pbmdDYWNoZS5oYXMocmVxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25nb2luZ0NhY2hlLm9ic2VydmUocmVxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIGNhY2hlZCByZXNwb25zZSBleGlzdHMuIEdvIHRvIHRoZSBuZXR3b3JrLCBhbmQgY2FjaGVcbiAgICAgICAgICAgIC8vIHRoZSByZXNwb25zZSB3aGVuIGl0IGFycml2ZXMuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+KChvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PGFueT4+KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcmVkID0gbmV4dC5oYW5kbGUocmVxLCBtZXRhZGF0YSkucGlwZShzaGFyZSgpKTtcbiAgICAgICAgICAgICAgICBzaGFyZWQuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5wdXQocmVxLCByZXMsIG1ldGFkYXRhLmV4cGlyYXRpb25BdE1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25nb2luZ0NhY2hlLmNsZWFyKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uZ29pbmdDYWNoZS5zZXQocmVxLCBzaGFyZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=