/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output, } from '@angular/core';
import * as L from 'leaflet';
import { CachedMapComponent } from '../base/cached-map-component';
/**
 * @abstract
 * @template T
 */
export class MapSelectorComponent extends CachedMapComponent {
    /**
     * @param {?} mapCache
     * @param {?} differs
     * @param {?} cd
     */
    constructor(mapCache, differs, cd) {
        super(mapCache, differs);
        this.mapCache = mapCache;
        this.differs = differs;
        this.cd = cd;
        this.onSelected = new EventEmitter();
        this.onContentLoading = new EventEmitter();
        this.onNoResultsFound = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.createMap();
        setTimeout(() => {
            this.drawGeometries();
            this.cd.detectChanges();
        }, 10);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (this.map) {
            if (changes["serviceUrl"] || changes["filter"] || changes["cluster"]) {
                this.drawGeometries();
            }
        }
    }
    /**
     * Zooms to the given bounds
     *
     * @protected
     * \@memberof MapSelectorComponent
     * @param {?} bounds where to zoom
     * @return {?}
     */
    zoomToMarkerBounds(bounds) {
        if (!this.avoidZoomToSelection) {
            this.map.fitBounds(bounds, this.fitBoundsMarkerOptions || {});
        }
    }
}
MapSelectorComponent.propDecorators = {
    serviceUrl: [{ type: Input }],
    filter: [{ type: Input }],
    avoidZoomToSelection: [{ type: Input }],
    markerSelectorGenerator: [{ type: Input }],
    onSelected: [{ type: Output }],
    onContentLoading: [{ type: Output }],
    fitBoundsMarkerOptions: [{ type: Input }],
    onNoResultsFound: [{ type: Output }]
};
if (false) {
    /**
     * \@input The serviceUrl, where the selection should be loaded.
     * @type {?}
     */
    MapSelectorComponent.prototype.serviceUrl;
    /**
     * \@input The filter which should be used, while fetching the selection.
     * @type {?}
     */
    MapSelectorComponent.prototype.filter;
    /** @type {?} */
    MapSelectorComponent.prototype.avoidZoomToSelection;
    /** @type {?} */
    MapSelectorComponent.prototype.markerSelectorGenerator;
    /** @type {?} */
    MapSelectorComponent.prototype.onSelected;
    /** @type {?} */
    MapSelectorComponent.prototype.onContentLoading;
    /**
     * \@input Additional configuration for the marker zooming (https://leafletjs.com/reference-1.3.4.html#fitbounds-options)
     * @type {?}
     */
    MapSelectorComponent.prototype.fitBoundsMarkerOptions;
    /** @type {?} */
    MapSelectorComponent.prototype.isContentLoading;
    /** @type {?} */
    MapSelectorComponent.prototype.onNoResultsFound;
    /** @type {?} */
    MapSelectorComponent.prototype.mapCache;
    /** @type {?} */
    MapSelectorComponent.prototype.differs;
    /** @type {?} */
    MapSelectorComponent.prototype.cd;
    /**
     * Draws the geometries
     *
     * @protected
     * @abstract
     * \@memberof MapSelectorComponent
     * @abstract
     * @return {?}
     */
    MapSelectorComponent.prototype.drawGeometries = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdG9yL21hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFHSCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUU3QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7QUFJbEUsTUFBTSwyQkFDRixTQUFRLGtCQUFrQjs7Ozs7O0lBc0MxQixZQUNjLFFBQWtCLEVBQ2xCLE9BQXdCLEVBQ3hCLEVBQXFCO1FBRS9CLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFKZixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLE9BQUUsR0FBRixFQUFFLENBQW1COzBCQW5CRSxJQUFJLFlBQVksRUFBSztnQ0FHVCxJQUFJLFlBQVksRUFBRTtnQ0FXbEIsSUFBSSxZQUFZLEVBQUU7S0FRbEU7Ozs7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDM0IsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBR0osV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxFQUFFLENBQUMsQ0FBQyxPQUFPLGtCQUFlLE9BQU8sVUFBTyxJQUFJLE9BQU8sV0FBUSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1NBQ0o7Ozs7Ozs7Ozs7SUFtQkssa0JBQWtCLENBQUMsTUFBZ0M7UUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDLENBQUM7U0FDakU7S0FDSjs7O3lCQTdFQSxLQUFLO3FCQU1MLEtBQUs7bUNBR0wsS0FBSztzQ0FHTCxLQUFLO3lCQUdMLE1BQU07K0JBR04sTUFBTTtxQ0FNTixLQUFLOytCQUtMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGFzTG9hZGFibGVDb250ZW50LCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgQ2FjaGVkTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9jYWNoZWQtbWFwLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyU2VsZWN0b3JHZW5lcmF0b3IgfSBmcm9tICcuL21vZGVsL21hcmtlci1zZWxlY3Rvci1nZW5lcmF0b3InO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwU2VsZWN0b3JDb21wb25lbnQ8VD5cbiAgICBleHRlbmRzIENhY2hlZE1hcENvbXBvbmVudFxuICAgIGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBIYXNMb2FkYWJsZUNvbnRlbnQge1xuXG4gICAgLyoqXG4gICAgICogQGlucHV0IFRoZSBzZXJ2aWNlVXJsLCB3aGVyZSB0aGUgc2VsZWN0aW9uIHNob3VsZCBiZSBsb2FkZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VydmljZVVybDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQGlucHV0IFRoZSBmaWx0ZXIgd2hpY2ggc2hvdWxkIGJlIHVzZWQsIHdoaWxlIGZldGNoaW5nIHRoZSBzZWxlY3Rpb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhdm9pZFpvb21Ub1NlbGVjdGlvbjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1hcmtlclNlbGVjdG9yR2VuZXJhdG9yOiBNYXJrZXJTZWxlY3RvckdlbmVyYXRvcjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Db250ZW50TG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQGlucHV0IEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIG1hcmtlciB6b29taW5nIChodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjZml0Ym91bmRzLW9wdGlvbnMpXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZml0Qm91bmRzTWFya2VyT3B0aW9uczogTC5GaXRCb3VuZHNPcHRpb25zO1xuXG4gICAgcHVibGljIGlzQ29udGVudExvYWRpbmc6IChsb2FkaW5nOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uTm9SZXN1bHRzRm91bmQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZU1hcCgpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0dlb21ldHJpZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuc2VydmljZVVybCB8fCBjaGFuZ2VzLmZpbHRlciB8fCBjaGFuZ2VzLmNsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHZW9tZXRyaWVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyB0aGUgZ2VvbWV0cmllc1xuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBNYXBTZWxlY3RvckNvbXBvbmVudFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBkcmF3R2VvbWV0cmllcygpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogWm9vbXMgdG8gdGhlIGdpdmVuIGJvdW5kc1xuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBwYXJhbSBib3VuZHMgd2hlcmUgdG8gem9vbVxuICAgICAqIEBtZW1iZXJvZiBNYXBTZWxlY3RvckNvbXBvbmVudFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB6b29tVG9NYXJrZXJCb3VuZHMoYm91bmRzOiBMLkxhdExuZ0JvdW5kc0V4cHJlc3Npb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmF2b2lkWm9vbVRvU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHMoYm91bmRzLCB0aGlzLmZpdEJvdW5kc01hcmtlck9wdGlvbnMgfHwge30pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=