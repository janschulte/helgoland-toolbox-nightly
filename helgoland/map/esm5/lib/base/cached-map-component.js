/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output, } from '@angular/core';
import * as L from 'leaflet';
/** @type {?} */
var DEFAULT_BASE_LAYER_NAME = 'BaseLayer';
/** @type {?} */
var DEFAULT_BASE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
/** @type {?} */
var DEFAULT_BASE_LAYER_ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
/**
 * @abstract
 */
var CachedMapComponent = /** @class */ (function () {
    function CachedMapComponent(mapCache, differs) {
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
    CachedMapComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.mapId === undefined || this.mapId === null) {
            this.mapId = this.generateUUID();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CachedMapComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.map) {
            if (changes["fitBounds"]) {
                this.map.fitBounds(this.fitBounds);
            }
            if (changes["zoomControlOptions"]) {
                this.updateZoomControl();
            }
        }
    };
    /**
     * @return {?}
     */
    CachedMapComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._differOverlayMaps) {
            /** @type {?} */
            var changes = this._differOverlayMaps.diff(this.overlayMaps);
            if (changes) {
                changes.forEachRemovedItem(function (e) { return _this.removeOverlayMap(e.previousValue); });
                changes.forEachAddedItem(function (e) { return _this.addOverlayMap(e.currentValue); });
                this.updateLayerControl();
            }
        }
        if (this._differBaseMaps) {
            /** @type {?} */
            var changes = this._differBaseMaps.diff(this.baseMaps);
            if (changes) {
                changes.forEachRemovedItem(function (e) { return _this.removeBaseMap(e.previousValue); });
                changes.forEachAddedItem(function (e) { return _this.addBaseMap(e.currentValue); });
                this.updateLayerControl();
            }
        }
    };
    /**
     * @return {?}
     */
    CachedMapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.map.remove();
        this.map = null;
        this.mapCache.deleteMap(this.mapId);
    };
    /**
     * @return {?}
     */
    CachedMapComponent.prototype.createMap = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.mapOptions || this.zoomControlOptions) {
            this.mapOptions = { zoomControl: false };
        }
        this.map = L.map(this.mapId, this.mapOptions);
        this.mapCache.setMap(this.mapId, this.map);
        this.mapInitialized.emit(this.mapId);
        if (this.baseMaps && this.baseMaps.size > 0) {
            this.baseMaps.forEach(function (entry, key) { return _this.addBaseMap(entry); });
        }
        else {
            this.addBaseMap();
        }
        if (this.overlayMaps) {
            this.overlayMaps.forEach(function (entry, key) { return _this.addOverlayMap(entry); });
        }
        this.updateZoomControl();
        this.updateLayerControl();
        if (this.fitBounds) {
            this.map.fitBounds(this.fitBounds);
        }
    };
    /**
     * @return {?}
     */
    CachedMapComponent.prototype.generateUUID = /**
     * @return {?}
     */
    function () {
        /**
         * @return {?}
         */
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    CachedMapComponent.prototype.addOverlayMap = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        if (this.map) {
            if (!this.oldOverlayLayer.hasOwnProperty[layerOptions.label]) {
                this.oldOverlayLayer[layerOptions.label] = layerOptions.layer;
                if (layerOptions.visible) {
                    layerOptions.layer.addTo(this.map);
                }
            }
        }
    };
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    CachedMapComponent.prototype.removeOverlayMap = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        if (this.map && this.oldOverlayLayer.hasOwnProperty(layerOptions.label)) {
            this.map.removeLayer(this.oldOverlayLayer[layerOptions.label]);
            delete this.oldOverlayLayer[layerOptions.label];
        }
    };
    /**
     * @param {?=} layerOptions
     * @return {?}
     */
    CachedMapComponent.prototype.addBaseMap = /**
     * @param {?=} layerOptions
     * @return {?}
     */
    function (layerOptions) {
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
    };
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    CachedMapComponent.prototype.removeBaseMap = /**
     * @param {?} layerOptions
     * @return {?}
     */
    function (layerOptions) {
        if (this.map && this.oldBaseLayer.hasOwnProperty(layerOptions.label)) {
            this.map.removeLayer(this.oldBaseLayer[layerOptions.label]);
            delete this.oldBaseLayer[layerOptions.label];
        }
    };
    /**
     * @return {?}
     */
    CachedMapComponent.prototype.updateLayerControl = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    CachedMapComponent.prototype.updateZoomControl = /**
     * @return {?}
     */
    function () {
        if (this.zoomControl) {
            this.map.removeControl(this.zoomControl);
        }
        if (this.zoomControlOptions) {
            this.zoomControl = L.control.zoom(this.zoomControlOptions).addTo(this.map);
        }
    };
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
    return CachedMapComponent;
}());
export { CachedMapComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkLW1hcC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL21hcC8iLCJzb3VyY2VzIjpbImxpYi9iYXNlL2NhY2hlZC1tYXAtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsWUFBWSxFQUNaLEtBQUssRUFNTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7O0FBSzdCLElBQU0sdUJBQXVCLEdBQUcsV0FBVyxDQUFDOztBQUM1QyxJQUFNLHNCQUFzQixHQUFHLG9EQUFvRCxDQUFDOztBQUNwRixJQUFNLDhCQUE4QixHQUFHLDBFQUEwRSxDQUFDOzs7OztJQW1FOUcsNEJBQ2MsUUFBa0IsRUFDbEIsT0FBd0I7UUFEeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFpQjs7Ozs4QkFuQlEsSUFBSSxZQUFZLEVBQUU7K0JBT1osRUFBRTs0QkFDTCxFQUFFO1FBYS9DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pEOzs7O0lBRU0scUNBQVE7Ozs7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDcEM7Ozs7OztJQUdFLHdDQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdB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QUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxZQUFZO29CQUNiLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNHO1NBQ0o7Ozs7O0lBR0csOENBQWlCOzs7O1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQUU7UUFDbkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUU7Ozt3QkFuTUosS0FBSzs2QkFNTCxLQUFLOzRCQU1MLEtBQUs7OEJBTUwsS0FBSzsyQkFNTCxLQUFLO3NDQU1MLEtBQUs7cUNBTUwsS0FBSztpQ0FNTCxNQUFNOzs2QkFwRVg7O1NBcUJzQixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVyLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4vbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9tYXAtb3B0aW9ucyc7XG5cbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9OQU1FID0gJ0Jhc2VMYXllcic7XG5jb25zdCBERUZBVUxUX0JBU0VfTEFZRVJfVVJMID0gJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJztcbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9BVFRSSUJVVElPTiA9ICcmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWNoZWRNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2ssIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwIHdpdGggdGhlIGdpdmVuIElEIGlzIGNyZWF0ZWQgaW5zaWRlIHRoaXMgY29tcG9uZW50LiBUaGlzIElEIGNhbiBiZSB1c2VkIHRoZSBnZXQgdGhlIG1hcCBpbnN0YW5jZSBvdmVyIHRoZSBtYXAgY2FjaGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvcnJlc3BvbmRpbmcgbGVhZmxldCBtYXAgb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjbWFwLW9wdGlvbilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBPcHRpb25zOiBMLk1hcE9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBCb3VuZHMgZm9yIHRoZSBtYXBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaXRCb3VuZHM6IEwuTGF0TG5nQm91bmRzRXhwcmVzc2lvbjtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgd2hpY2ggaG9sZHMgYWxsIG92ZXJsYXkgbWFwIGxheWVyIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNsYXllcilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvdmVybGF5TWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgd2hpY2ggaG9sZHMgYWxsIGJhc2UgbWFwIGxheWVyIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNsYXllcilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBiYXNlTWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyB0aGUgdGhlIHpvb20gb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjY29udHJvbC1sYXllcnMpXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGF5ZXJDb250cm9sT3B0aW9uczogTC5Db250cm9sLkxheWVyc09wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmliZXMgdGhlIHRoZSB6b29tIGNvbnRyb2wgb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjY29udHJvbC16b29tKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHpvb21Db250cm9sT3B0aW9uczogTC5Db250cm9sLlpvb21PcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogSW5mb3JtcyB3aGVuIGluaXRpYWxpemF0aW9uIGlzIGRvbmUgd2l0aCBtYXAgaWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG1hcEluaXRpYWxpemVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXAgb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBtYXA6IEwuTWFwO1xuXG4gICAgcHJvdGVjdGVkIG9sZE92ZXJsYXlMYXllcjogTC5Db250cm9sLkxheWVyc09iamVjdCA9IHt9O1xuICAgIHByb3RlY3RlZCBvbGRCYXNlTGF5ZXI6IEwuQ29udHJvbC5MYXllcnNPYmplY3QgPSB7fTtcbiAgICBwcm90ZWN0ZWQgbGF5ZXJDb250cm9sOiBMLkNvbnRyb2wuTGF5ZXJzO1xuICAgIHByb3RlY3RlZCB6b29tQ29udHJvbDogTC5Db250cm9sLlpvb207XG5cbiAgICBwcml2YXRlIF9vdmVybGF5TWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcbiAgICBwcml2YXRlIF9kaWZmZXJPdmVybGF5TWFwczogS2V5VmFsdWVEaWZmZXI8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2Jhc2VNYXBzOiBNYXA8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2RpZmZlckJhc2VNYXBzOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIExheWVyT3B0aW9ucz47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICB0aGlzLl9kaWZmZXJPdmVybGF5TWFwcyA9IHRoaXMuZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5fZGlmZmVyQmFzZU1hcHMgPSB0aGlzLmRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tYXBJZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubWFwSWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWFwSWQgPSB0aGlzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5maXRCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHModGhpcy5maXRCb3VuZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuem9vbUNvbnRyb2xPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVab29tQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlck92ZXJsYXlNYXBzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyT3ZlcmxheU1hcHMuZGlmZih0aGlzLm92ZXJsYXlNYXBzKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKGUpID0+IHRoaXMucmVtb3ZlT3ZlcmxheU1hcChlLnByZXZpb3VzVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGUpID0+IHRoaXMuYWRkT3ZlcmxheU1hcChlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlckJhc2VNYXBzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyQmFzZU1hcHMuZGlmZih0aGlzLmJhc2VNYXBzKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKGUpID0+IHRoaXMucmVtb3ZlQmFzZU1hcChlLnByZXZpb3VzVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGUpID0+IHRoaXMuYWRkQmFzZU1hcChlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgICAgIHRoaXMubWFwQ2FjaGUuZGVsZXRlTWFwKHRoaXMubWFwSWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXAoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tYXBPcHRpb25zIHx8IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKSB7IHRoaXMubWFwT3B0aW9ucyA9IHsgem9vbUNvbnRyb2w6IGZhbHNlIH07IH1cbiAgICAgICAgdGhpcy5tYXAgPSBMLm1hcCh0aGlzLm1hcElkLCB0aGlzLm1hcE9wdGlvbnMpO1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldE1hcCh0aGlzLm1hcElkLCB0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMubWFwSW5pdGlhbGl6ZWQuZW1pdCh0aGlzLm1hcElkKTtcbiAgICAgICAgaWYgKHRoaXMuYmFzZU1hcHMgJiYgdGhpcy5iYXNlTWFwcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5iYXNlTWFwcy5mb3JFYWNoKChlbnRyeSwga2V5KSA9PiB0aGlzLmFkZEJhc2VNYXAoZW50cnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQmFzZU1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlNYXBzKSB7IHRoaXMub3ZlcmxheU1hcHMuZm9yRWFjaCgoZW50cnksIGtleSkgPT4gdGhpcy5hZGRPdmVybGF5TWFwKGVudHJ5KSk7IH1cbiAgICAgICAgdGhpcy51cGRhdGVab29tQ29udHJvbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29udHJvbCgpO1xuICAgICAgICBpZiAodGhpcy5maXRCb3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlVVVJRCgpOiBzdHJpbmcge1xuICAgICAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE92ZXJsYXlNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkT3ZlcmxheUxheWVyLmhhc093blByb3BlcnR5W2xheWVyT3B0aW9ucy5sYWJlbF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZE92ZXJsYXlMYXllcltsYXllck9wdGlvbnMubGFiZWxdID0gbGF5ZXJPcHRpb25zLmxheWVyO1xuICAgICAgICAgICAgICAgIGlmIChsYXllck9wdGlvbnMudmlzaWJsZSkgeyBsYXllck9wdGlvbnMubGF5ZXIuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU92ZXJsYXlNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMub2xkT3ZlcmxheUxheWVyLmhhc093blByb3BlcnR5KGxheWVyT3B0aW9ucy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEJhc2VNYXAobGF5ZXJPcHRpb25zPzogTGF5ZXJPcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJhc2VNYXBzIHx8IHRoaXMuYmFzZU1hcHMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IERFRkFVTFRfQkFTRV9MQVlFUl9OQU1FLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYXllcjogTC50aWxlTGF5ZXIoREVGQVVMVF9CQVNFX0xBWUVSX1VSTCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246IERFRkFVTFRfQkFTRV9MQVlFUl9BVFRSSUJVVElPTlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkQmFzZUxheWVyLmhhc093blByb3BlcnR5W2xheWVyT3B0aW9ucy5sYWJlbF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZEJhc2VMYXllcltsYXllck9wdGlvbnMubGFiZWxdID0gbGF5ZXJPcHRpb25zLmxheWVyO1xuICAgICAgICAgICAgICAgIGlmIChsYXllck9wdGlvbnMudmlzaWJsZSkgeyBsYXllck9wdGlvbnMubGF5ZXIuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUJhc2VNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMub2xkQmFzZUxheWVyLmhhc093blByb3BlcnR5KGxheWVyT3B0aW9ucy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxheWVyQ29udHJvbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXllckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVDb250cm9sKHRoaXMubGF5ZXJDb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyQ29udHJvbE9wdGlvbnNcbiAgICAgICAgICAgICAgICAmJiAoT2JqZWN0LmtleXModGhpcy5vbGRCYXNlTGF5ZXIpLmxlbmd0aCA+IDEgfHwgT2JqZWN0LmtleXModGhpcy5vbGRPdmVybGF5TGF5ZXIpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXllckNvbnRyb2wgPVxuICAgICAgICAgICAgICAgICAgICBMLmNvbnRyb2wubGF5ZXJzKHRoaXMub2xkQmFzZUxheWVyLCB0aGlzLm9sZE92ZXJsYXlMYXllciwgdGhpcy5sYXllckNvbnRyb2xPcHRpb25zKS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVpvb21Db250cm9sKCkge1xuICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCkgeyB0aGlzLm1hcC5yZW1vdmVDb250cm9sKHRoaXMuem9vbUNvbnRyb2wpOyB9XG4gICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IEwuY29udHJvbC56b29tKHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=