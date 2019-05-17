/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearch } from '../../base/geosearch/geosearch';
import { MapCache } from '../../base/map-cache.service';
var GeosearchControlComponent = /** @class */ (function () {
    function GeosearchControlComponent(mapCache, geosearch) {
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
    GeosearchControlComponent.prototype.triggerSearch = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.onSearchTriggered.emit();
        this.removeOldGeometry();
        if (this.searchTerm) {
            this.loading = true;
            this.geosearch.searchTerm(this.searchTerm, this.options).subscribe(function (result) {
                if (!result) {
                    _this.searchTerm = '';
                    return;
                }
                _this.onResultChanged.emit(result);
                _this.result = result;
                if (_this.mapId) {
                    _this.resultGeometry = L.geoJSON(result.geometry).addTo(_this.mapCache.getMap(_this.mapId));
                    if (result.bounds) {
                        _this.mapCache.getMap(_this.mapId).fitBounds(result.bounds);
                    }
                    else {
                        _this.mapCache.getMap(_this.mapId).fitBounds(_this.resultGeometry.getBounds());
                    }
                }
            }, function (error) { return _this.searchTerm = 'error occurred'; }, function () { _this.loading = false; });
        }
    };
    /**
     * @return {?}
     */
    GeosearchControlComponent.prototype.clearSearch = /**
     * @return {?}
     */
    function () {
        this.searchTerm = '';
        this.onResultChanged.emit(null);
        this.removeOldGeometry();
    };
    /**
     * @return {?}
     */
    GeosearchControlComponent.prototype.removeOldGeometry = /**
     * @return {?}
     */
    function () {
        if (this.resultGeometry) {
            this.resultGeometry.remove();
        }
    };
    GeosearchControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-geosearch-control',
                    template: "<div>\n  <input [(ngModel)]=\"searchTerm\" (keyup.enter)=\"triggerSearch()\">\n  <span *ngIf=\"loading\">loading...</span>\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"clearSearch()\">X</button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    GeosearchControlComponent.ctorParameters = function () { return [
        { type: MapCache },
        { type: GeoSearch }
    ]; };
    GeosearchControlComponent.propDecorators = {
        mapId: [{ type: Input }],
        options: [{ type: Input }],
        onResultChanged: [{ type: Output }],
        onSearchTriggered: [{ type: Output }]
    };
    return GeosearchControlComponent;
}());
export { GeosearchControlComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2Vvc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZ2Vvc2VhcmNoL2dlb3NlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxFQUFFLFNBQVMsRUFBcUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0lBNkNwRCxtQ0FDYyxRQUFrQixFQUNsQixTQUFvQjtRQURwQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVc7Ozs7K0JBbEJzQixJQUFJLFlBQVksRUFBRTs7OztpQ0FNM0IsSUFBSSxZQUFZLEVBQUU7S0FhNUQ7Ozs7SUFFRSxpREFBYTs7Ozs7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDOUQsVUFBQyxNQUFNO2dCQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDckIsTUFBTSxDQUFDO2lCQUNWO2dCQUNELEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDckIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2IsS0FBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3pGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDN0Q7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7cUJBQy9FO2lCQUNKO2FBQ0osRUFDRCxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLEVBQWxDLENBQWtDLEVBQzdDLGNBQVEsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUNsQyxDQUFDO1NBQ0w7Ozs7O0lBR0UsK0NBQVc7Ozs7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7SUFHckIscURBQWlCOzs7O1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7OztnQkFyRlIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxxT0FLYjtpQkFDQTs7OztnQkFWUSxRQUFRO2dCQURSLFNBQVM7Ozt3QkFpQmIsS0FBSzswQkFNTCxLQUFLO2tDQU1MLE1BQU07b0NBTU4sTUFBTTs7b0NBdENYOztTQWVhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBHZW9TZWFyY2gsIEdlb1NlYXJjaE9wdGlvbnMsIEdlb1NlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uL2Jhc2UvZ2Vvc2VhcmNoL2dlb3NlYXJjaCc7XG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1nZW9zZWFyY2gtY29udHJvbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8aW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCIgKGtleXVwLmVudGVyKT1cInRyaWdnZXJTZWFyY2goKVwiPlxuICA8c3BhbiAqbmdJZj1cImxvYWRpbmdcIj5sb2FkaW5nLi4uPC9zcGFuPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHQgYnRuLXNtXCIgKGNsaWNrKT1cImNsZWFyU2VhcmNoKClcIj5YPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgR2Vvc2VhcmNoQ29udHJvbENvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IG1hcCBpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBzZWFyY2ggb3B0aW9ucy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvcHRpb25zOiBHZW9TZWFyY2hPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2VhcmNoIHJlc3VsdC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25SZXN1bHRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8R2VvU2VhcmNoUmVzdWx0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEluZm9ybXMsIHdoZW4gdGhlIHNlYXJjaCBpcyB0cmlnZ2VyZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VhcmNoVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgcmVzdWx0OiBHZW9TZWFyY2hSZXN1bHQ7XG5cbiAgICBwdWJsaWMgcmVzdWx0R2VvbWV0cnk6IEwuR2VvSlNPTjtcblxuICAgIHB1YmxpYyBzZWFyY2hUZXJtOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZ2Vvc2VhcmNoOiBHZW9TZWFyY2hcbiAgICApIHsgfVxuXG4gICAgcHVibGljIHRyaWdnZXJTZWFyY2goKSB7XG4gICAgICAgIHRoaXMub25TZWFyY2hUcmlnZ2VyZWQuZW1pdCgpO1xuICAgICAgICB0aGlzLnJlbW92ZU9sZEdlb21ldHJ5KCk7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdlb3NlYXJjaC5zZWFyY2hUZXJtKHRoaXMuc2VhcmNoVGVybSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlc3VsdENoYW5nZWQuZW1pdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0R2VvbWV0cnkgPSBMLmdlb0pTT04ocmVzdWx0Lmdlb21ldHJ5KS5hZGRUbyh0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLmZpdEJvdW5kcyhyZXN1bHQuYm91bmRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkuZml0Qm91bmRzKHRoaXMucmVzdWx0R2VvbWV0cnkuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuc2VhcmNoVGVybSA9ICdlcnJvciBvY2N1cnJlZCcsXG4gICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLmxvYWRpbmcgPSBmYWxzZTsgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIHRoaXMub25SZXN1bHRDaGFuZ2VkLmVtaXQobnVsbCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT2xkR2VvbWV0cnkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU9sZEdlb21ldHJ5KCkge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRHZW9tZXRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRHZW9tZXRyeS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19