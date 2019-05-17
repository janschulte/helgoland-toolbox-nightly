/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class MapCache {
    constructor() {
        this.mapCache = new Map();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getMap(id) {
        return this.mapCache.get(id);
    }
    /**
     * @param {?} id
     * @param {?} map
     * @return {?}
     */
    setMap(id, map) {
        this.mapCache.set(id, map);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    hasMap(id) {
        return this.mapCache.has(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    deleteMap(id) {
        return this.mapCache.delete(id);
    }
}
MapCache.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    MapCache.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNhY2hlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07O3dCQUVtQyxJQUFJLEdBQUcsRUFBZTs7Ozs7O0lBRXBELE1BQU0sQ0FBQyxFQUFVO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7OztJQUcxQixNQUFNLENBQUMsRUFBVSxFQUFFLEdBQVU7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFHeEIsTUFBTSxDQUFDLEVBQVU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFHMUIsU0FBUyxDQUFDLEVBQVU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O1lBbEJ2QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcENhY2hlIHtcblxuICAgIHByaXZhdGUgbWFwQ2FjaGU6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgcHVibGljIGdldE1hcChpZDogc3RyaW5nKTogTC5NYXAge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBDYWNoZS5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXAoaWQ6IHN0cmluZywgbWFwOiBMLk1hcCkge1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldChpZCwgbWFwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuZGVsZXRlKGlkKTtcbiAgICB9XG5cbn1cbiJdfQ==