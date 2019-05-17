/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output, } from '@angular/core';
import * as L from 'leaflet';
/** @type {?} */
const DEFAULT_BASE_LAYER_NAME = 'BaseLayer';
/** @type {?} */
const DEFAULT_BASE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
/** @type {?} */
const DEFAULT_BASE_LAYER_ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
/**
 * @abstract
 */
export class CachedMapComponent {
    /**
     * @param {?} mapCache
     * @param {?} differs
     */
    constructor(mapCache, differs) {
        this.mapCache = mapCache;
        this.differs = differs;
        /**
         * Informs when initialization is done with map id.
         */
        this.mapInitialized = new EventEmitter();
        this.oldOverlayLayer = {};
        this.oldBaseLayer = {};
        this._differOverlayMaps = this.differs.find({}).create();
        this._differBaseMaps = this.differs.find({}).create();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.mapId === undefined || this.mapId === null) {
            this.mapId = this.generateUUID();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.map) {
            if (changes["fitBounds"]) {
                this.map.fitBounds(this.fitBounds);
            }
            if (changes["zoomControlOptions"]) {
                this.updateZoomControl();
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differOverlayMaps) {
            /** @type {?} */
            const changes = this._differOverlayMaps.diff(this.overlayMaps);
            if (changes) {
                changes.forEachRemovedItem((e) => this.removeOverlayMap(e.previousValue));
                changes.forEachAddedItem((e) => this.addOverlayMap(e.currentValue));
                this.updateLayerControl();
            }
        }
        if (this._differBaseMaps) {
            /** @type {?} */
            const changes = this._differBaseMaps.diff(this.baseMaps);
            if (changes) {
                changes.forEachRemovedItem((e) => this.removeBaseMap(e.previousValue));
                changes.forEachAddedItem((e) => this.addBaseMap(e.currentValue));
                this.updateLayerControl();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.map.remove();
        this.map = null;
        this.mapCache.deleteMap(this.mapId);
    }
    /**
     * @return {?}
     */
    createMap() {
        if (!this.mapOptions || this.zoomControlOptions) {
            this.mapOptions = { zoomControl: false };
        }
        this.map = L.map(this.mapId, this.mapOptions);
        this.mapCache.setMap(this.mapId, this.map);
        this.mapInitialized.emit(this.mapId);
        if (this.baseMaps && this.baseMaps.size > 0) {
            this.baseMaps.forEach((entry, key) => this.addBaseMap(entry));
        }
        else {
            this.addBaseMap();
        }
        if (this.overlayMaps) {
            this.overlayMaps.forEach((entry, key) => this.addOverlayMap(entry));
        }
        this.updateZoomControl();
        this.updateLayerControl();
        if (this.fitBounds) {
            this.map.fitBounds(this.fitBounds);
        }
    }
    /**
     * @return {?}
     */
    generateUUID() {
        /**
         * @return {?}
         */
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    addOverlayMap(layerOptions) {
        if (this.map) {
            if (!this.oldOverlayLayer.hasOwnProperty[layerOptions.label]) {
                this.oldOverlayLayer[layerOptions.label] = layerOptions.layer;
                if (layerOptions.visible) {
                    layerOptions.layer.addTo(this.map);
                }
            }
        }
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    removeOverlayMap(layerOptions) {
        if (this.map && this.oldOverlayLayer.hasOwnProperty(layerOptions.label)) {
            this.map.removeLayer(this.oldOverlayLayer[layerOptions.label]);
            delete this.oldOverlayLayer[layerOptions.label];
        }
    }
    /**
     * @param {?=} layerOptions
     * @return {?}
     */
    addBaseMap(layerOptions) {
        if (this.map) {
            if (!this.baseMaps || this.baseMaps.size === 0) {
                layerOptions = {
                    label: DEFAULT_BASE_LAYER_NAME,
                    visible: true,
                    layer: L.tileLayer(DEFAULT_BASE_LAYER_URL, {
                        attribution: DEFAULT_BASE_LAYER_ATTRIBUTION
                    })
                };
            }
            if (!this.oldBaseLayer.hasOwnProperty[layerOptions.label]) {
                this.oldBaseLayer[layerOptions.label] = layerOptions.layer;
                if (layerOptions.visible) {
                    layerOptions.layer.addTo(this.map);
                }
            }
        }
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    removeBaseMap(layerOptions) {
        if (this.map && this.oldBaseLayer.hasOwnProperty(layerOptions.label)) {
            this.map.removeLayer(this.oldBaseLayer[layerOptions.label]);
            delete this.oldBaseLayer[layerOptions.label];
        }
    }
    /**
     * @return {?}
     */
    updateLayerControl() {
        if (this.map) {
            if (this.layerControl) {
                this.map.removeControl(this.layerControl);
            }
            if (this.layerControlOptions
                && (Object.keys(this.oldBaseLayer).length > 1 || Object.keys(this.oldOverlayLayer).length > 0)) {
                this.layerControl =
                    L.control.layers(this.oldBaseLayer, this.oldOverlayLayer, this.layerControlOptions).addTo(this.map);
            }
        }
    }
    /**
     * @return {?}
     */
    updateZoomControl() {
        if (this.zoomControl) {
            this.map.removeControl(this.zoomControl);
        }
        if (this.zoomControlOptions) {
            this.zoomControl = L.control.zoom(this.zoomControlOptions).addTo(this.map);
        }
    }
}
CachedMapComponent.propDecorators = {
    mapId: [{ type: Input }],
    mapOptions: [{ type: Input }],
    fitBounds: [{ type: Input }],
    overlayMaps: [{ type: Input }],
    baseMaps: [{ type: Input }],
    layerControlOptions: [{ type: Input }],
    zoomControlOptions: [{ type: Input }],
    mapInitialized: [{ type: Output }]
};
if (false) {
    /**
     * A map with the given ID is created inside this component. This ID can be used the get the map instance over the map cache service.
     * @type {?}
     */
    CachedMapComponent.prototype.mapId;
    /**
     * The corresponding leaflet map options (see: https://leafletjs.com/reference-1.3.4.html#map-option)
     * @type {?}
     */
    CachedMapComponent.prototype.mapOptions;
    /**
     * Bounds for the map
     * @type {?}
     */
    CachedMapComponent.prototype.fitBounds;
    /**
     * Map, which holds all overlay map layer (see: https://leafletjs.com/reference-1.3.4.html#layer)
     * @type {?}
     */
    CachedMapComponent.prototype.overlayMaps;
    /**
     * Map, which holds all base map layer (see: https://leafletjs.com/reference-1.3.4.html#layer)
     * @type {?}
     */
    CachedMapComponent.prototype.baseMaps;
    /**
     * Describes the the zoom options (see: https://leafletjs.com/reference-1.3.4.html#control-layers)
     * @type {?}
     */
    CachedMapComponent.prototype.layerControlOptions;
    /**
     * Describes the the zoom control options (see: https://leafletjs.com/reference-1.3.4.html#control-zoom)
     * @type {?}
     */
    CachedMapComponent.prototype.zoomControlOptions;
    /**
     * Informs when initialization is done with map id.
     * @type {?}
     */
    CachedMapComponent.prototype.mapInitialized;
    /**
     * The map object.
     * @type {?}
     */
    CachedMapComponent.prototype.map;
    /** @type {?} */
    CachedMapComponent.prototype.oldOverlayLayer;
    /** @type {?} */
    CachedMapComponent.prototype.oldBaseLayer;
    /** @type {?} */
    CachedMapComponent.prototype.layerControl;
    /** @type {?} */
    CachedMapComponent.prototype.zoomControl;
    /** @type {?} */
    CachedMapComponent.prototype._overlayMaps;
    /** @type {?} */
    CachedMapComponent.prototype._differOverlayMaps;
    /** @type {?} */
    CachedMapComponent.prototype._baseMaps;
    /** @type {?} */
    CachedMapComponent.prototype._differBaseMaps;
    /** @type {?} */
    CachedMapComponent.prototype.mapCache;
    /** @type {?} */
    CachedMapComponent.prototype.differs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkLW1hcC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9iYXNlL2NhY2hlZC1tYXAtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsWUFBWSxFQUNaLEtBQUssRUFNTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7O0FBSzdCLE1BQU0sdUJBQXVCLEdBQUcsV0FBVyxDQUFDOztBQUM1QyxNQUFNLHNCQUFzQixHQUFHLG9EQUFvRCxDQUFDOztBQUNwRixNQUFNLDhCQUE4QixHQUFHLDBFQUEwRSxDQUFDOzs7O0FBRWxILE1BQU07Ozs7O0lBaUVGLFlBQ2MsUUFBa0IsRUFDbEIsT0FBd0I7UUFEeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFpQjs7Ozs4QkFuQlEsSUFBSSxZQUFZLEVBQUU7K0JBT1osRUFBRTs0QkFDTCxFQUFFO1FBYS9DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pEOzs7O0lBRU0sUUFBUTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwQzs7Ozs7O0lBR0UsV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FB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QUFDLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxZQUFZO29CQUNiLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNHO1NBQ0o7Ozs7O0lBR0csaUJBQWlCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQUU7UUFDbkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUU7Ozs7b0JBbk1KLEtBQUs7eUJBTUwsS0FBSzt3QkFNTCxLQUFLOzBCQU1MLEtBQUs7dUJBTUwsS0FBSztrQ0FNTCxLQUFLO2lDQU1MLEtBQUs7NkJBTUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRG9DaGVjayxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVEaWZmZXIsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllck9wdGlvbnMgfSBmcm9tICcuL21hcC1vcHRpb25zJztcblxuY29uc3QgREVGQVVMVF9CQVNFX0xBWUVSX05BTUUgPSAnQmFzZUxheWVyJztcbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9VUkwgPSAnaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnO1xuY29uc3QgREVGQVVMVF9CQVNFX0xBWUVSX0FUVFJJQlVUSU9OID0gJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhY2hlZE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRG9DaGVjaywgT25EZXN0cm95LCBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQSBtYXAgd2l0aCB0aGUgZ2l2ZW4gSUQgaXMgY3JlYXRlZCBpbnNpZGUgdGhpcyBjb21wb25lbnQuIFRoaXMgSUQgY2FuIGJlIHVzZWQgdGhlIGdldCB0aGUgbWFwIGluc3RhbmNlIG92ZXIgdGhlIG1hcCBjYWNoZSBzZXJ2aWNlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1hcElkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29ycmVzcG9uZGluZyBsZWFmbGV0IG1hcCBvcHRpb25zIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNtYXAtb3B0aW9uKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1hcE9wdGlvbnM6IEwuTWFwT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEJvdW5kcyBmb3IgdGhlIG1hcFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpdEJvdW5kczogTC5MYXRMbmdCb3VuZHNFeHByZXNzaW9uO1xuXG4gICAgLyoqXG4gICAgICogTWFwLCB3aGljaCBob2xkcyBhbGwgb3ZlcmxheSBtYXAgbGF5ZXIgKHNlZTogaHR0cHM6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS0xLjMuNC5odG1sI2xheWVyKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG92ZXJsYXlNYXBzOiBNYXA8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuXG4gICAgLyoqXG4gICAgICogTWFwLCB3aGljaCBob2xkcyBhbGwgYmFzZSBtYXAgbGF5ZXIgKHNlZTogaHR0cHM6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS0xLjMuNC5odG1sI2xheWVyKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGJhc2VNYXBzOiBNYXA8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpYmVzIHRoZSB0aGUgem9vbSBvcHRpb25zIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNjb250cm9sLWxheWVycylcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBsYXllckNvbnRyb2xPcHRpb25zOiBMLkNvbnRyb2wuTGF5ZXJzT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyB0aGUgdGhlIHpvb20gY29udHJvbCBvcHRpb25zIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNjb250cm9sLXpvb20pXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgem9vbUNvbnRyb2xPcHRpb25zOiBMLkNvbnRyb2wuWm9vbU9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1zIHdoZW4gaW5pdGlhbGl6YXRpb24gaXMgZG9uZSB3aXRoIG1hcCBpZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgbWFwSW5pdGlhbGl6ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1hcCBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG1hcDogTC5NYXA7XG5cbiAgICBwcm90ZWN0ZWQgb2xkT3ZlcmxheUxheWVyOiBMLkNvbnRyb2wuTGF5ZXJzT2JqZWN0ID0ge307XG4gICAgcHJvdGVjdGVkIG9sZEJhc2VMYXllcjogTC5Db250cm9sLkxheWVyc09iamVjdCA9IHt9O1xuICAgIHByb3RlY3RlZCBsYXllckNvbnRyb2w6IEwuQ29udHJvbC5MYXllcnM7XG4gICAgcHJvdGVjdGVkIHpvb21Db250cm9sOiBMLkNvbnRyb2wuWm9vbTtcblxuICAgIHByaXZhdGUgX292ZXJsYXlNYXBzOiBNYXA8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2RpZmZlck92ZXJsYXlNYXBzOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIExheWVyT3B0aW9ucz47XG4gICAgcHJpdmF0ZSBfYmFzZU1hcHM6IE1hcDxzdHJpbmcsIExheWVyT3B0aW9ucz47XG4gICAgcHJpdmF0ZSBfZGlmZmVyQmFzZU1hcHM6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2RpZmZlck92ZXJsYXlNYXBzID0gdGhpcy5kaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLl9kaWZmZXJCYXNlTWFwcyA9IHRoaXMuZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1hcElkID09PSB1bmRlZmluZWQgfHwgdGhpcy5tYXBJZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tYXBJZCA9IHRoaXMuZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmZpdEJvdW5kcykge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy56b29tQ29udHJvbE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVpvb21Db250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGlmZmVyT3ZlcmxheU1hcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9kaWZmZXJPdmVybGF5TWFwcy5kaWZmKHRoaXMub3ZlcmxheU1hcHMpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgoZSkgPT4gdGhpcy5yZW1vdmVPdmVybGF5TWFwKGUucHJldmlvdXNWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgoZSkgPT4gdGhpcy5hZGRPdmVybGF5TWFwKGUuY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYXllckNvbnRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZGlmZmVyQmFzZU1hcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9kaWZmZXJCYXNlTWFwcy5kaWZmKHRoaXMuYmFzZU1hcHMpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgoZSkgPT4gdGhpcy5yZW1vdmVCYXNlTWFwKGUucHJldmlvdXNWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgoZSkgPT4gdGhpcy5hZGRCYXNlTWFwKGUuY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYXllckNvbnRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXBDYWNoZS5kZWxldGVNYXAodGhpcy5tYXBJZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcE9wdGlvbnMgfHwgdGhpcy56b29tQ29udHJvbE9wdGlvbnMpIHsgdGhpcy5tYXBPcHRpb25zID0geyB6b29tQ29udHJvbDogZmFsc2UgfTsgfVxuICAgICAgICB0aGlzLm1hcCA9IEwubWFwKHRoaXMubWFwSWQsIHRoaXMubWFwT3B0aW9ucyk7XG4gICAgICAgIHRoaXMubWFwQ2FjaGUuc2V0TWFwKHRoaXMubWFwSWQsIHRoaXMubWFwKTtcbiAgICAgICAgdGhpcy5tYXBJbml0aWFsaXplZC5lbWl0KHRoaXMubWFwSWQpO1xuICAgICAgICBpZiAodGhpcy5iYXNlTWFwcyAmJiB0aGlzLmJhc2VNYXBzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2VNYXBzLmZvckVhY2goKGVudHJ5LCBrZXkpID0+IHRoaXMuYWRkQmFzZU1hcChlbnRyeSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRCYXNlTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheU1hcHMpIHsgdGhpcy5vdmVybGF5TWFwcy5mb3JFYWNoKChlbnRyeSwga2V5KSA9PiB0aGlzLmFkZE92ZXJsYXlNYXAoZW50cnkpKTsgfVxuICAgICAgICB0aGlzLnVwZGF0ZVpvb21Db250cm9sKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgIGlmICh0aGlzLmZpdEJvdW5kcykge1xuICAgICAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKHRoaXMuZml0Qm91bmRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVVVUlEKCk6IHN0cmluZyB7XG4gICAgICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkT3ZlcmxheU1hcChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vbGRPdmVybGF5TGF5ZXIuaGFzT3duUHJvcGVydHlbbGF5ZXJPcHRpb25zLmxhYmVsXSkge1xuICAgICAgICAgICAgICAgIHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0gPSBsYXllck9wdGlvbnMubGF5ZXI7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyT3B0aW9ucy52aXNpYmxlKSB7IGxheWVyT3B0aW9ucy5sYXllci5hZGRUbyh0aGlzLm1hcCk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlT3ZlcmxheU1hcChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5vbGRPdmVybGF5TGF5ZXIuaGFzT3duUHJvcGVydHkobGF5ZXJPcHRpb25zLmxhYmVsKSkge1xuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5vbGRPdmVybGF5TGF5ZXJbbGF5ZXJPcHRpb25zLmxhYmVsXSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5vbGRPdmVybGF5TGF5ZXJbbGF5ZXJPcHRpb25zLmxhYmVsXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQmFzZU1hcChsYXllck9wdGlvbnM/OiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFzZU1hcHMgfHwgdGhpcy5iYXNlTWFwcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogREVGQVVMVF9CQVNFX0xBWUVSX05BTUUsXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxheWVyOiBMLnRpbGVMYXllcihERUZBVUxUX0JBU0VfTEFZRVJfVVJMLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogREVGQVVMVF9CQVNFX0xBWUVSX0FUVFJJQlVUSU9OXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5vbGRCYXNlTGF5ZXIuaGFzT3duUHJvcGVydHlbbGF5ZXJPcHRpb25zLmxhYmVsXSkge1xuICAgICAgICAgICAgICAgIHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0gPSBsYXllck9wdGlvbnMubGF5ZXI7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyT3B0aW9ucy52aXNpYmxlKSB7IGxheWVyT3B0aW9ucy5sYXllci5hZGRUbyh0aGlzLm1hcCk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlQmFzZU1hcChsYXllck9wdGlvbnM6IExheWVyT3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5vbGRCYXNlTGF5ZXIuaGFzT3duUHJvcGVydHkobGF5ZXJPcHRpb25zLmxhYmVsKSkge1xuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5vbGRCYXNlTGF5ZXJbbGF5ZXJPcHRpb25zLmxhYmVsXSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5vbGRCYXNlTGF5ZXJbbGF5ZXJPcHRpb25zLmxhYmVsXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTGF5ZXJDb250cm9sKCkge1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUNvbnRyb2wodGhpcy5sYXllckNvbnRyb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubGF5ZXJDb250cm9sT3B0aW9uc1xuICAgICAgICAgICAgICAgICYmIChPYmplY3Qua2V5cyh0aGlzLm9sZEJhc2VMYXllcikubGVuZ3RoID4gMSB8fCBPYmplY3Qua2V5cyh0aGlzLm9sZE92ZXJsYXlMYXllcikubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyQ29udHJvbCA9XG4gICAgICAgICAgICAgICAgICAgIEwuY29udHJvbC5sYXllcnModGhpcy5vbGRCYXNlTGF5ZXIsIHRoaXMub2xkT3ZlcmxheUxheWVyLCB0aGlzLmxheWVyQ29udHJvbE9wdGlvbnMpLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlWm9vbUNvbnRyb2woKSB7XG4gICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sKSB7IHRoaXMubWFwLnJlbW92ZUNvbnRyb2wodGhpcy56b29tQ29udHJvbCk7IH1cbiAgICAgICAgaWYgKHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnpvb21Db250cm9sID0gTC5jb250cm9sLnpvb20odGhpcy56b29tQ29udHJvbE9wdGlvbnMpLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==