/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { MapCache } from '../../base/map-cache.service';
/** @type {?} */
var LOCATION_FOUND_EVENT = 'locationfound';
/** @type {?} */
var LOCATION_ERROR = 'locationerror';
/** @type {?} */
var LOCATED_MARKER_ID = 'located';
var LocateService = /** @class */ (function () {
    function LocateService(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    LocateService.prototype.startLocate = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        /** @type {?} */
        var map = this.mapCache.getMap(id);
        map.on(LOCATION_FOUND_EVENT, function (evt) {
            _this.removeMarker(map);
            /** @type {?} */
            var marker = L.marker(evt.latlng).addTo(map);
            marker.options.title = LOCATED_MARKER_ID;
        });
        map.on(LOCATION_ERROR, function (error) {
            console.error(error);
        });
        map.locate({
            watch: true,
            setView: true,
            timeout: 30000
        });
    };
    /**
     * @param {?} id
     * @return {?}
     */
    LocateService.prototype.stopLocate = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var map = this.mapCache.getMap(id);
        map.stopLocate();
        map.off(LOCATION_FOUND_EVENT);
        this.removeMarker(map);
    };
    /**
     * @param {?} map
     * @return {?}
     */
    LocateService.prototype.removeMarker = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        map.eachLayer(function (entry) {
            if (entry instanceof L.Marker && entry.options.title === LOCATED_MARKER_ID) {
                map.removeLayer(entry);
            }
        });
    };
    LocateService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LocateService.ctorParameters = function () { return [
        { type: MapCache }
    ]; };
    return LocateService;
}());
export { LocateService };
if (false) {
    /** @type {?} */
    LocateService.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL2xvY2F0ZS9sb2NhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRXhELElBQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDOztBQUM3QyxJQUFNLGNBQWMsR0FBRyxlQUFlLENBQUM7O0FBQ3ZDLElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDOztJQUtsQyx1QkFDWSxRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0tBQ3pCOzs7OztJQUVFLG1DQUFXOzs7O2NBQUMsRUFBVTs7O1FBQzNCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxHQUFvQjtZQUNoRCxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUN2QixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7U0FDMUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxLQUFLO1lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNULEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQzs7Ozs7O0lBR0Usa0NBQVU7Ozs7Y0FBQyxFQUFVOztRQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztJQUdqQixvQ0FBWTs7OztjQUFDLEdBQVU7UUFDN0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1NBQ0YsQ0FBQyxDQUFDOzs7Z0JBcENOLFVBQVU7Ozs7Z0JBTkYsUUFBUTs7d0JBSGpCOztTQVVhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5jb25zdCBMT0NBVElPTl9GT1VORF9FVkVOVCA9ICdsb2NhdGlvbmZvdW5kJztcbmNvbnN0IExPQ0FUSU9OX0VSUk9SID0gJ2xvY2F0aW9uZXJyb3InO1xuY29uc3QgTE9DQVRFRF9NQVJLRVJfSUQgPSAnbG9jYXRlZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhdGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlXG4gICkgeyB9XG5cbiAgcHVibGljIHN0YXJ0TG9jYXRlKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcENhY2hlLmdldE1hcChpZCk7XG4gICAgbWFwLm9uKExPQ0FUSU9OX0ZPVU5EX0VWRU5ULCAoZXZ0OiBMLkxvY2F0aW9uRXZlbnQpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKG1hcCk7XG4gICAgICBjb25zdCBtYXJrZXIgPSBMLm1hcmtlcihldnQubGF0bG5nKS5hZGRUbyhtYXApO1xuICAgICAgbWFya2VyLm9wdGlvbnMudGl0bGUgPSBMT0NBVEVEX01BUktFUl9JRDtcbiAgICB9KTtcbiAgICBtYXAub24oTE9DQVRJT05fRVJST1IsIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSk7XG4gICAgbWFwLmxvY2F0ZSh7XG4gICAgICB3YXRjaDogdHJ1ZSxcbiAgICAgIHNldFZpZXc6IHRydWUsXG4gICAgICB0aW1lb3V0OiAzMDAwMFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0b3BMb2NhdGUoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwQ2FjaGUuZ2V0TWFwKGlkKTtcbiAgICBtYXAuc3RvcExvY2F0ZSgpO1xuICAgIG1hcC5vZmYoTE9DQVRJT05fRk9VTkRfRVZFTlQpO1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKG1hcCk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1hcmtlcihtYXA6IEwuTWFwKSB7XG4gICAgbWFwLmVhY2hMYXllcigoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIEwuTWFya2VyICYmIGVudHJ5Lm9wdGlvbnMudGl0bGUgPT09IExPQ0FURURfTUFSS0VSX0lEKSB7XG4gICAgICAgIG1hcC5yZW1vdmVMYXllcihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19