/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { MapCache } from '../../base/map-cache.service';
/** @type {?} */
const LOCATION_FOUND_EVENT = 'locationfound';
/** @type {?} */
const LOCATION_ERROR = 'locationerror';
/** @type {?} */
const LOCATED_MARKER_ID = 'located';
export class LocateService {
    /**
     * @param {?} mapCache
     */
    constructor(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    startLocate(id) {
        /** @type {?} */
        const map = this.mapCache.getMap(id);
        map.on(LOCATION_FOUND_EVENT, (evt) => {
            this.removeMarker(map);
            /** @type {?} */
            const marker = L.marker(evt.latlng).addTo(map);
            marker.options.title = LOCATED_MARKER_ID;
        });
        map.on(LOCATION_ERROR, (error) => {
            console.error(error);
        });
        map.locate({
            watch: true,
            setView: true,
            timeout: 30000
        });
    }
    /**
     * @param {?} id
     * @return {?}
     */
    stopLocate(id) {
        /** @type {?} */
        const map = this.mapCache.getMap(id);
        map.stopLocate();
        map.off(LOCATION_FOUND_EVENT);
        this.removeMarker(map);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    removeMarker(map) {
        map.eachLayer((entry) => {
            if (entry instanceof L.Marker && entry.options.title === LOCATED_MARKER_ID) {
                map.removeLayer(entry);
            }
        });
    }
}
LocateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LocateService.ctorParameters = () => [
    { type: MapCache }
];
if (false) {
    /** @type {?} */
    LocateService.prototype.mapCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL2xvY2F0ZS9sb2NhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRXhELE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDOztBQUM3QyxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUM7O0FBQ3ZDLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBR3BDLE1BQU07Ozs7SUFFSixZQUNZLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7S0FDekI7Ozs7O0lBRUUsV0FBVyxDQUFDLEVBQVU7O1FBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDdkIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ1QsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDOzs7Ozs7SUFHRSxVQUFVLENBQUMsRUFBVTs7UUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFHakIsWUFBWSxDQUFDLEdBQVU7UUFDN0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDM0UsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QjtTQUNGLENBQUMsQ0FBQzs7OztZQXBDTixVQUFVOzs7O1lBTkYsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5cbmNvbnN0IExPQ0FUSU9OX0ZPVU5EX0VWRU5UID0gJ2xvY2F0aW9uZm91bmQnO1xuY29uc3QgTE9DQVRJT05fRVJST1IgPSAnbG9jYXRpb25lcnJvcic7XG5jb25zdCBMT0NBVEVEX01BUktFUl9JRCA9ICdsb2NhdGVkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2F0ZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGVcbiAgKSB7IH1cblxuICBwdWJsaWMgc3RhcnRMb2NhdGUoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwQ2FjaGUuZ2V0TWFwKGlkKTtcbiAgICBtYXAub24oTE9DQVRJT05fRk9VTkRfRVZFTlQsIChldnQ6IEwuTG9jYXRpb25FdmVudCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIobWFwKTtcbiAgICAgIGNvbnN0IG1hcmtlciA9IEwubWFya2VyKGV2dC5sYXRsbmcpLmFkZFRvKG1hcCk7XG4gICAgICBtYXJrZXIub3B0aW9ucy50aXRsZSA9IExPQ0FURURfTUFSS0VSX0lEO1xuICAgIH0pO1xuICAgIG1hcC5vbihMT0NBVElPTl9FUlJPUiwgKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbiAgICBtYXAubG9jYXRlKHtcbiAgICAgIHdhdGNoOiB0cnVlLFxuICAgICAgc2V0VmlldzogdHJ1ZSxcbiAgICAgIHRpbWVvdXQ6IDMwMDAwXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RvcExvY2F0ZShpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBDYWNoZS5nZXRNYXAoaWQpO1xuICAgIG1hcC5zdG9wTG9jYXRlKCk7XG4gICAgbWFwLm9mZihMT0NBVElPTl9GT1VORF9FVkVOVCk7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXIobWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTWFya2VyKG1hcDogTC5NYXApIHtcbiAgICBtYXAuZWFjaExheWVyKChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTC5NYXJrZXIgJiYgZW50cnkub3B0aW9ucy50aXRsZSA9PT0gTE9DQVRFRF9NQVJLRVJfSUQpIHtcbiAgICAgICAgbWFwLnJlbW92ZUxheWVyKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=