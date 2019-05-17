/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/** @enum {number} */
var DatasetApiVersion = {
    V1: 0,
    V2: 1,
};
export { DatasetApiVersion };
DatasetApiVersion[DatasetApiVersion.V1] = 'V1';
DatasetApiVersion[DatasetApiVersion.V2] = 'V2';
var DatasetApiMapping = /** @class */ (function () {
    function DatasetApiMapping(http) {
        this.http = http;
        this.cache = new Map();
    }
    /**
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetApiMapping.prototype.getApiVersion = /**
     * @param {?} apiUrl
     * @return {?}
     */
    function (apiUrl) {
        var _this = this;
        return new Observable(function (observer) {
            if (_this.cache.has(apiUrl)) {
                _this.confirmVersion(observer, _this.cache.get(apiUrl));
            }
            else {
                _this.http.get(apiUrl).subscribe(function (result) {
                    /** @type {?} */
                    var version = DatasetApiVersion.V1;
                    result.forEach(function (entry) {
                        if (entry.id === 'platforms') {
                            version = DatasetApiVersion.V2;
                        }
                    });
                    _this.cache.set(apiUrl, version);
                    _this.confirmVersion(observer, version);
                });
            }
        });
    };
    /**
     * @param {?} observer
     * @param {?} version
     * @return {?}
     */
    DatasetApiMapping.prototype.confirmVersion = /**
     * @param {?} observer
     * @param {?} version
     * @return {?}
     */
    function (observer, version) {
        observer.next(version);
        observer.complete();
    };
    DatasetApiMapping.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DatasetApiMapping.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return DatasetApiMapping;
}());
export { DatasetApiMapping };
if (false) {
    /** @type {?} */
    DatasetApiMapping.prototype.cache;
    /** @type {?} */
    DatasetApiMapping.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLW1hcHBpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9hcGktbWFwcGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDOzs7SUFHeEMsS0FBRTtJQUNGLEtBQUU7OztvQ0FERixFQUFFO29DQUNGLEVBQUU7O0lBUUYsMkJBQ2MsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtxQkFIa0IsSUFBSSxHQUFHLEVBQTZCO0tBSS9FOzs7OztJQUVFLHlDQUFhOzs7O2NBQUMsTUFBYzs7UUFDL0IsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFvQixVQUFDLFFBQXFDO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN6RDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFRLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07O29CQUMxQyxJQUFJLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO3dCQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7eUJBQ2xDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7YUFDTjtTQUNKLENBQUMsQ0FBQzs7Ozs7OztJQUdDLDBDQUFjOzs7OztjQUFDLFFBQXFDLEVBQUUsT0FBMEI7UUFDcEYsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7OztnQkE5QjNCLFVBQVU7Ozs7Z0JBVEYsVUFBVTs7NEJBQW5COztTQVVhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZW51bSBEYXRhc2V0QXBpVmVyc2lvbiB7XG4gICAgVjEsXG4gICAgVjJcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFzZXRBcGlNYXBwaW5nIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIERhdGFzZXRBcGlWZXJzaW9uPiA9IG5ldyBNYXA8c3RyaW5nLCBEYXRhc2V0QXBpVmVyc2lvbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZ2V0QXBpVmVyc2lvbihhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8RGF0YXNldEFwaVZlcnNpb24+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPERhdGFzZXRBcGlWZXJzaW9uPigob2JzZXJ2ZXI6IE9ic2VydmVyPERhdGFzZXRBcGlWZXJzaW9uPikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKGFwaVVybCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB0aGlzLmNhY2hlLmdldChhcGlVcmwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldDxhbnlbXT4oYXBpVXJsKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbiA9IERhdGFzZXRBcGlWZXJzaW9uLlYxO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pZCA9PT0gJ3BsYXRmb3JtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gRGF0YXNldEFwaVZlcnNpb24uVjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldChhcGlVcmwsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maXJtVmVyc2lvbihvYnNlcnZlcjogT2JzZXJ2ZXI8RGF0YXNldEFwaVZlcnNpb24+LCB2ZXJzaW9uOiBEYXRhc2V0QXBpVmVyc2lvbikge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHZlcnNpb24pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuIl19