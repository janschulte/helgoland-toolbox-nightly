/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearch } from '../../base/geosearch/geosearch';
import { MapCache } from '../../base/map-cache.service';
export class GeosearchControlComponent {
    /**
     * @param {?} mapCache
     * @param {?} geosearch
     */
    constructor(mapCache, geosearch) {
        this.mapCache = mapCache;
        this.geosearch = geosearch;
        /**
         * Returns the search result.
         */
        this.onResultChanged = new EventEmitter();
        /**
         * Informs, when the search is triggered.
         */
        this.onSearchTriggered = new EventEmitter();
    }
    /**
     * @return {?}
     */
    triggerSearch() {
        this.onSearchTriggered.emit();
        this.removeOldGeometry();
        if (this.searchTerm) {
            this.loading = true;
            this.geosearch.searchTerm(this.searchTerm, this.options).subscribe((result) => {
                if (!result) {
                    this.searchTerm = '';
                    return;
                }
                this.onResultChanged.emit(result);
                this.result = result;
                if (this.mapId) {
                    this.resultGeometry = L.geoJSON(result.geometry).addTo(this.mapCache.getMap(this.mapId));
                    if (result.bounds) {
                        this.mapCache.getMap(this.mapId).fitBounds(result.bounds);
                    }
                    else {
                        this.mapCache.getMap(this.mapId).fitBounds(this.resultGeometry.getBounds());
                    }
                }
            }, (error) => this.searchTerm = 'error occurred', () => { this.loading = false; });
        }
    }
    /**
     * @return {?}
     */
    clearSearch() {
        this.searchTerm = '';
        this.onResultChanged.emit(null);
        this.removeOldGeometry();
    }
    /**
     * @return {?}
     */
    removeOldGeometry() {
        if (this.resultGeometry) {
            this.resultGeometry.remove();
        }
    }
}
GeosearchControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-geosearch-control',
                template: `<div>
  <input [(ngModel)]="searchTerm" (keyup.enter)="triggerSearch()">
  <span *ngIf="loading">loading...</span>
  <button type="button" class="btn btn-light btn-sm" (click)="clearSearch()">X</button>
</div>
`
            },] },
];
/** @nocollapse */
GeosearchControlComponent.ctorParameters = () => [
    { type: MapCache },
    { type: GeoSearch }
];
GeosearchControlComponent.propDecorators = {
    mapId: [{ type: Input }],
    options: [{ type: Input }],
    onResultChanged: [{ type: Output }],
    onSearchTriggered: [{ type: Output }]
};
if (false) {
    /**
     * Connect map id.
     * @type {?}
     */
    GeosearchControlComponent.prototype.mapId;
    /**
     * Additional search options.
     * @type {?}
     */
    GeosearchControlComponent.prototype.options;
    /**
     * Returns the search result.
     * @type {?}
     */
    GeosearchControlComponent.prototype.onResultChanged;
    /**
     * Informs, when the search is triggered.
     * @type {?}
     */
    GeosearchControlComponent.prototype.onSearchTriggered;
    /** @type {?} */
    GeosearchControlComponent.prototype.result;
    /** @type {?} */
    GeosearchControlComponent.prototype.resultGeometry;
    /** @type {?} */
    GeosearchControlComponent.prototype.searchTerm;
    /** @type {?} */
    GeosearchControlComponent.prototype.loading;
    /** @type {?} */
    GeosearchControlComponent.prototype.mapCache;
    /** @type {?} */
    GeosearchControlComponent.prototype.geosearch;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vvc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZ2Vvc2VhcmNoL2dlb3NlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxFQUFFLFNBQVMsRUFBcUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFXeEQsTUFBTTs7Ozs7SUFrQ0YsWUFDYyxRQUFrQixFQUNsQixTQUFvQjtRQURwQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVc7Ozs7K0JBbEJzQixJQUFJLFlBQVksRUFBRTs7OztpQ0FNM0IsSUFBSSxZQUFZLEVBQUU7S0FhNUQ7Ozs7SUFFRSxhQUFhO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQzlELENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1AsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNWLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO29CQUNyQixNQUFNLENBQUM7aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDYixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDekYsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUM3RDtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztxQkFDL0U7aUJBQ0o7YUFDSixFQUNELENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQixFQUM3QyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQ2xDLENBQUM7U0FDTDs7Ozs7SUFHRSxXQUFXO1FBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Ozs7O0lBR3JCLGlCQUFpQjtRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hDOzs7O1lBckZSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7O0NBS2I7YUFDQTs7OztZQVZRLFFBQVE7WUFEUixTQUFTOzs7b0JBaUJiLEtBQUs7c0JBTUwsS0FBSzs4QkFNTCxNQUFNO2dDQU1OLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgR2VvU2VhcmNoLCBHZW9TZWFyY2hPcHRpb25zLCBHZW9TZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9iYXNlL2dlb3NlYXJjaC9nZW9zZWFyY2gnO1xuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZ2Vvc2VhcmNoLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgPGlucHV0IFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiIChrZXl1cC5lbnRlcik9XCJ0cmlnZ2VyU2VhcmNoKClcIj5cbiAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nXCI+bG9hZGluZy4uLjwvc3Bhbj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0IGJ0bi1zbVwiIChjbGljayk9XCJjbGVhclNlYXJjaCgpXCI+WDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEdlb3NlYXJjaENvbnRyb2xDb21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCBtYXAgaWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWFwSWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgc2VhcmNoIG9wdGlvbnMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3B0aW9uczogR2VvU2VhcmNoT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlYXJjaCByZXN1bHQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uUmVzdWx0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPEdlb1NlYXJjaFJlc3VsdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1zLCB3aGVuIHRoZSBzZWFyY2ggaXMgdHJpZ2dlcmVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlYXJjaFRyaWdnZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHJlc3VsdDogR2VvU2VhcmNoUmVzdWx0O1xuXG4gICAgcHVibGljIHJlc3VsdEdlb21ldHJ5OiBMLkdlb0pTT047XG5cbiAgICBwdWJsaWMgc2VhcmNoVGVybTogc3RyaW5nO1xuXG4gICAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGdlb3NlYXJjaDogR2VvU2VhcmNoXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyB0cmlnZ2VyU2VhcmNoKCkge1xuICAgICAgICB0aGlzLm9uU2VhcmNoVHJpZ2dlcmVkLmVtaXQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPbGRHZW9tZXRyeSgpO1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hUZXJtKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nZW9zZWFyY2guc2VhcmNoVGVybSh0aGlzLnNlYXJjaFRlcm0sIHRoaXMub3B0aW9ucykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZXN1bHRDaGFuZ2VkLmVtaXQocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdEdlb21ldHJ5ID0gTC5nZW9KU09OKHJlc3VsdC5nZW9tZXRyeSkuYWRkVG8odGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5ib3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKS5maXRCb3VuZHMocmVzdWx0LmJvdW5kcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLmZpdEJvdW5kcyh0aGlzLnJlc3VsdEdlb21ldHJ5LmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLnNlYXJjaFRlcm0gPSAnZXJyb3Igb2NjdXJyZWQnLFxuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5sb2FkaW5nID0gZmFsc2U7IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJTZWFyY2goKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICB0aGlzLm9uUmVzdWx0Q2hhbmdlZC5lbWl0KG51bGwpO1xuICAgICAgICB0aGlzLnJlbW92ZU9sZEdlb21ldHJ5KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVPbGRHZW9tZXRyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0R2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0R2VvbWV0cnkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==