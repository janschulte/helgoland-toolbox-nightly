/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/** @enum {number} */
const DatasetApiVersion = {
    V1: 0,
    V2: 1,
};
export { DatasetApiVersion };
DatasetApiVersion[DatasetApiVersion.V1] = 'V1';
DatasetApiVersion[DatasetApiVersion.V2] = 'V2';
export class DatasetApiMapping {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.cache = new Map();
    }
    /**
     * @param {?} apiUrl
     * @return {?}
     */
    getApiVersion(apiUrl) {
        return new Observable((observer) => {
            if (this.cache.has(apiUrl)) {
                this.confirmVersion(observer, this.cache.get(apiUrl));
            }
            else {
                this.http.get(apiUrl).subscribe((result) => {
                    /** @type {?} */
                    let version = DatasetApiVersion.V1;
                    result.forEach((entry) => {
                        if (entry.id === 'platforms') {
                            version = DatasetApiVersion.V2;
                        }
                    });
                    this.cache.set(apiUrl, version);
                    this.confirmVersion(observer, version);
                });
            }
        });
    }
    /**
     * @param {?} observer
     * @param {?} version
     * @return {?}
     */
    confirmVersion(observer, version) {
        observer.next(version);
        observer.complete();
    }
}
DatasetApiMapping.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DatasetApiMapping.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /** @type {?} */
    DatasetApiMapping.prototype.cache;
    /** @type {?} */
    DatasetApiMapping.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLW1hcHBpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9hcGktbWFwcGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDOzs7SUFHeEMsS0FBRTtJQUNGLEtBQUU7OztvQ0FERixFQUFFO29DQUNGLEVBQUU7QUFJTixNQUFNOzs7O0lBSUYsWUFDYyxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO3FCQUhrQixJQUFJLEdBQUcsRUFBNkI7S0FJL0U7Ozs7O0lBRUUsYUFBYSxDQUFDLE1BQWM7UUFDL0IsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFvQixDQUFDLFFBQXFDLEVBQUUsRUFBRTtZQUMvRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7b0JBQzlDLElBQUksT0FBTyxHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7eUJBQ2xDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7YUFDTjtTQUNKLENBQUMsQ0FBQzs7Ozs7OztJQUdDLGNBQWMsQ0FBQyxRQUFxQyxFQUFFLE9BQTBCO1FBQ3BGLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7O1lBOUIzQixVQUFVOzs7O1lBVEYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZW51bSBEYXRhc2V0QXBpVmVyc2lvbiB7XG4gICAgVjEsXG4gICAgVjJcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFzZXRBcGlNYXBwaW5nIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIERhdGFzZXRBcGlWZXJzaW9uPiA9IG5ldyBNYXA8c3RyaW5nLCBEYXRhc2V0QXBpVmVyc2lvbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZ2V0QXBpVmVyc2lvbihhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8RGF0YXNldEFwaVZlcnNpb24+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPERhdGFzZXRBcGlWZXJzaW9uPigob2JzZXJ2ZXI6IE9ic2VydmVyPERhdGFzZXRBcGlWZXJzaW9uPikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKGFwaVVybCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB0aGlzLmNhY2hlLmdldChhcGlVcmwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldDxhbnlbXT4oYXBpVXJsKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbiA9IERhdGFzZXRBcGlWZXJzaW9uLlYxO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pZCA9PT0gJ3BsYXRmb3JtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gRGF0YXNldEFwaVZlcnNpb24uVjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldChhcGlVcmwsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maXJtVmVyc2lvbihvYnNlcnZlcjogT2JzZXJ2ZXI8RGF0YXNldEFwaVZlcnNpb24+LCB2ZXJzaW9uOiBEYXRhc2V0QXBpVmVyc2lvbikge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHZlcnNpb24pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuIl19