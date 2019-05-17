/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var MapCache = /** @class */ (function () {
    function MapCache() {
        this.mapCache = new Map();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    MapCache.prototype.getMap = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.mapCache.get(id);
    };
    /**
     * @param {?} id
     * @param {?} map
     * @return {?}
     */
    MapCache.prototype.setMap = /**
     * @param {?} id
     * @param {?} map
     * @return {?}
     */
    function (id, map) {
        this.mapCache.set(id, map);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    MapCache.prototype.hasMap = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.mapCache.has(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    MapCache.prototype.deleteMap = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.mapCache.delete(id);
    };
    MapCache.decorators = [
        { type: Injectable },
    ];
    return MapCache;
}());
export { MapCache };
if (false) {
    /** @type {?} */
    MapCache.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNhY2hlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7d0JBTUYsSUFBSSxHQUFHLEVBQWU7Ozs7OztJQUVwRCx5QkFBTTs7OztjQUFDLEVBQVU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7O0lBRzFCLHlCQUFNOzs7OztjQUFDLEVBQVUsRUFBRSxHQUFVO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBR3hCLHlCQUFNOzs7O2NBQUMsRUFBVTtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7OztJQUcxQiw0QkFBUzs7OztjQUFDLEVBQVU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Z0JBbEJ2QyxVQUFVOzttQkFIWDs7U0FJYSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcENhY2hlIHtcblxuICAgIHByaXZhdGUgbWFwQ2FjaGU6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgcHVibGljIGdldE1hcChpZDogc3RyaW5nKTogTC5NYXAge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBDYWNoZS5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXAoaWQ6IHN0cmluZywgbWFwOiBMLk1hcCkge1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldChpZCwgbWFwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuZGVsZXRlKGlkKTtcbiAgICB9XG5cbn1cbiJdfQ==