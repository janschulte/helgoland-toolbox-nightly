import { Injectable, NgModule, EventEmitter, Input, Output, Component, KeyValueDiffers, ChangeDetectorRef } from '@angular/core';
import { map, tileLayer, control, GeoJSON, geoJSON, circleMarker, markerClusterGroup, featureGroup, marker, Marker, divIcon } from 'leaflet';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import { HttpService, HelgolandCoreModule, DatasetApiInterface, HasLoadableContent, Mixin, StatusIntervalResolverService, Timespan } from '@helgoland/core';
import { __extends, __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import 'leaflet.markercluster';
import moment from 'moment';
import 'rxjs/add/observable/forkJoin';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    function (id, map$$1) {
        this.mapCache.set(id, map$$1);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS = [];
var HelgolandMapModule = /** @class */ (function () {
    function HelgolandMapModule() {
    }
    HelgolandMapModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        COMPONENTS
                    ],
                    imports: [],
                    exports: [
                        COMPONENTS
                    ],
                    providers: [
                        MapCache
                    ]
                },] },
    ];
    return HelgolandMapModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        this.map = map(this.mapId, this.mapOptions);
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
                    layer: tileLayer(DEFAULT_BASE_LAYER_URL, {
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
                    control.layers(this.oldBaseLayer, this.oldOverlayLayer, this.layerControlOptions).addTo(this.map);
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
            this.zoomControl = control.zoom(this.zoomControlOptions).addTo(this.map);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
GeoSearch = /** @class */ (function () {
    function GeoSearch() {
    }
    return GeoSearch;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NominatimGeoSearchService = /** @class */ (function () {
    function NominatimGeoSearchService(http) {
        this.http = http;
        this.serviceUrl = 'https://nominatim.openstreetmap.org/';
    }
    /**
     * @param {?} term
     * @param {?=} options
     * @return {?}
     */
    NominatimGeoSearchService.prototype.searchTerm = /**
     * @param {?} term
     * @param {?=} options
     * @return {?}
     */
    function (term, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var params = new HttpParams();
        params = params.set('q', term);
        params = params.set('format', 'json');
        params = params.set('limit', '1');
        if (options.countrycodes) {
            params = params.set('countrycodes', options.countrycodes.join(','));
        }
        if (options.addressdetails !== null) {
            params = params.set('addressdetails', options.addressdetails ? '1' : '0');
        }
        if (options.asPointGeometry !== null) {
            params = params.set('polygon_geojson', options.asPointGeometry ? '0' : '1');
        }
        if (options.acceptLanguage) {
            params = params.set('accept-language', options.acceptLanguage);
        }
        return this.http.client().get(this.serviceUrl + 'search', { params: params }).map(function (resArray) {
            if (resArray.length === 1) {
                /** @type {?} */
                var result = resArray[0];
                /** @type {?} */
                var name_1 = result.display_name;
                /** @type {?} */
                var geometry = void 0;
                if (result.geojson) {
                    geometry = result.geojson;
                }
                else {
                    geometry = {
                        type: 'Point',
                        coordinates: [parseFloat(result.lon), parseFloat(result.lat)]
                    };
                }
                /** @type {?} */
                var returnResult = { name: name_1, geometry: geometry };
                if (result.boundingbox) {
                    returnResult.bounds = [
                        [
                            result.boundingbox[0],
                            result.boundingbox[2]
                        ],
                        [
                            result.boundingbox[1],
                            result.boundingbox[3]
                        ]
                    ];
                }
                if (result.address) {
                    returnResult.address = result.address;
                }
                return returnResult;
            }
        });
    };
    /**
     * @param {?} point
     * @param {?=} options
     * @return {?}
     */
    NominatimGeoSearchService.prototype.reverse = /**
     * @param {?} point
     * @param {?=} options
     * @return {?}
     */
    function (point, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var params = new HttpParams();
        params = params.set('lat', point.coordinates[0].toString());
        params = params.set('lon', point.coordinates[1].toString());
        params = params.set('format', 'json');
        if (options && options.addressdetails !== undefined) {
            params = params.set('addressdetails', options.addressdetails ? '1' : '0');
        }
        if (options.acceptLanguage !== null) {
            params = params.set('accept-language', options.acceptLanguage);
        }
        if (options && options.zoom !== undefined) {
            params = params.set('zoom', "" + options.zoom);
        }
        return this.http.client().get(this.serviceUrl + 'reverse', { params: params }).map(function (res) {
            /** @type {?} */
            var result = /** @type {?} */ ({
                lat: res.lat,
                lon: res.lon,
                displayName: res.display_name,
                boundingbox: res.boundingbox
            });
            if (res.address) {
                result.address = {
                    city: res.address.city,
                    cityDistrict: res.address.city_district,
                    country: res.address.country,
                    countryCode: res.address.country_code,
                    county: res.address.county,
                    houseNumber: res.address.house_number,
                    neighbourhood: res.address.neighbourhood,
                    postcode: res.address.postcode,
                    road: res.address.road,
                    state: res.address.state,
                    stateDistrict: res.address.state_district,
                    suburb: res.address.suburb
                };
            }
            return result;
        });
    };
    NominatimGeoSearchService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NominatimGeoSearchService.ctorParameters = function () { return [
        { type: HttpService }
    ]; };
    return NominatimGeoSearchService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GeoCureGeoJSON = /** @class */ (function (_super) {
    __extends(GeoCureGeoJSON, _super);
    function GeoCureGeoJSON(options) {
        var _this = _super.call(this) || this;
        if (options) {
            _this.options = options;
        }
        return _this;
    }
    /**
     * @return {?}
     */
    GeoCureGeoJSON.prototype.getEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var events = {
            moveend: function (event) { return _this.fetchData(event.target); }
        };
        return events;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    GeoCureGeoJSON.prototype.onAdd = /**
     * @param {?} map
     * @return {?}
     */
    function (map$$1) {
        _super.prototype.onAdd.call(this, map$$1);
        this.fetchData(map$$1);
        return this;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    GeoCureGeoJSON.prototype.fetchData = /**
     * @param {?} map
     * @return {?}
     */
    function (map$$1) {
        /** @type {?} */
        var matchMaxZoom = this.options.showOnMaxZoom ? map$$1.getZoom() <= this.options.showOnMaxZoom : true;
        /** @type {?} */
        var matchMinZoom = this.options.showOnMinZoom ? map$$1.getZoom() >= this.options.showOnMinZoom : true;
        if (matchMinZoom && matchMaxZoom) {
            this.loadData(map$$1.getBounds());
        }
        else {
            this.clearLayers();
        }
    };
    /**
     * @param {?} bounds
     * @return {?}
     */
    GeoCureGeoJSON.prototype.loadData = /**
     * @param {?} bounds
     * @return {?}
     */
    function (bounds) {
        var _this = this;
        /** @type {?} */
        var bboxparam = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()].join(',');
        this.options.httpClient
            .get(this.options.url, {
            params: {
                bbox: bboxparam
            }
        })
            .subscribe(function (geojson) {
            _this.clearLayers();
            _this.addData(geojson);
        });
    };
    return GeoCureGeoJSON;
}(GeoJSON));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GeometryMapViewerComponent = /** @class */ (function (_super) {
    __extends(GeometryMapViewerComponent, _super);
    function GeometryMapViewerComponent(mapCache, differs) {
        var _this = _super.call(this, mapCache, differs) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.defaultStyle = {
            color: 'red',
            weight: 5,
            opacity: 0.65
        };
        _this.highlightStyle = {
            color: 'blue',
            weight: 10,
            opacity: 1
        };
        return _this;
    }
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.createMap();
        this.drawGeometry();
        this.showHighlight();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.map) {
            if (changes["highlight"] && changes["highlight"].currentValue) {
                this.showHighlight();
            }
            if (changes["geometry"]) {
                this.drawGeometry();
            }
            if (changes["zoomTo"]) {
                this.zoomToGeometry();
            }
        }
    };
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.zoomToGeometry = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var geometry = geoJSON(this.zoomTo);
        this.map.fitBounds(geometry.getBounds());
    };
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.showHighlight = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.highlightGeometry) {
            this.map.removeLayer(this.highlightGeometry);
        }
        this.highlightGeometry = geoJSON(this.highlight, {
            pointToLayer: function (feature, latlng) {
                return circleMarker(latlng, _this.highlightStyle);
            }
        });
        this.highlightGeometry.setStyle(this.highlightStyle);
        this.highlightGeometry.addTo(this.map);
    };
    /**
     * @return {?}
     */
    GeometryMapViewerComponent.prototype.drawGeometry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.geometry) {
            /** @type {?} */
            var geojson = geoJSON(this.geometry, {
                pointToLayer: function (feature, latlng) {
                    return circleMarker(latlng, _this.defaultStyle);
                }
            });
            geojson.setStyle(this.defaultStyle);
            geojson.addTo(this.map);
            if (!this.avoidZoomToGeometry) {
                this.map.fitBounds(geojson.getBounds());
            }
        }
    };
    GeometryMapViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-geometry-map-viewer',
                    template: "<div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n",
                    styles: [":host{height:100%;width:100%}:host .map-viewer{height:100%;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    GeometryMapViewerComponent.ctorParameters = function () { return [
        { type: MapCache },
        { type: KeyValueDiffers }
    ]; };
    GeometryMapViewerComponent.propDecorators = {
        highlight: [{ type: Input }],
        geometry: [{ type: Input }],
        zoomTo: [{ type: Input }],
        avoidZoomToGeometry: [{ type: Input }]
    };
    return GeometryMapViewerComponent;
}(CachedMapComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandMapViewModule = /** @class */ (function () {
    function HelgolandMapViewModule() {
    }
    HelgolandMapViewModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        GeometryMapViewerComponent
                    ],
                    imports: [
                        HelgolandMapModule
                    ],
                    exports: [
                        GeometryMapViewerComponent
                    ],
                    providers: []
                },] },
    ];
    return HelgolandMapViewModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ExtentControlComponent = /** @class */ (function () {
    function ExtentControlComponent(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @return {?}
     */
    ExtentControlComponent.prototype.zoomToExtent = /**
     * @return {?}
     */
    function () {
        this.mapCache.getMap(this.mapId).fitBounds(this.extent);
    };
    ExtentControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-extent-control',
                    template: "<div>\n  <button type=\"button\" (click)=\"zoomToExtent()\">zoom to extent</button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ExtentControlComponent.ctorParameters = function () { return [
        { type: MapCache }
    ]; };
    ExtentControlComponent.propDecorators = {
        mapId: [{ type: Input }],
        extent: [{ type: Input }]
    };
    return ExtentControlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
                    _this.resultGeometry = geoJSON(result.geometry).addTo(_this.mapCache.getMap(_this.mapId));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        var map$$1 = this.mapCache.getMap(id);
        map$$1.on(LOCATION_FOUND_EVENT, function (evt) {
            _this.removeMarker(map$$1);
            /** @type {?} */
            var marker$$1 = marker(evt.latlng).addTo(map$$1);
            marker$$1.options.title = LOCATED_MARKER_ID;
        });
        map$$1.on(LOCATION_ERROR, function (error) {
            console.error(error);
        });
        map$$1.locate({
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
        var map$$1 = this.mapCache.getMap(id);
        map$$1.stopLocate();
        map$$1.off(LOCATION_FOUND_EVENT);
        this.removeMarker(map$$1);
    };
    /**
     * @param {?} map
     * @return {?}
     */
    LocateService.prototype.removeMarker = /**
     * @param {?} map
     * @return {?}
     */
    function (map$$1) {
        map$$1.eachLayer(function (entry) {
            if (entry instanceof Marker && entry.options.title === LOCATED_MARKER_ID) {
                map$$1.removeLayer(entry);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LocateControlComponent = /** @class */ (function () {
    function LocateControlComponent(locateService) {
        this.locateService = locateService;
        this.isToggled = false;
    }
    /**
     * @return {?}
     */
    LocateControlComponent.prototype.locateUser = /**
     * @return {?}
     */
    function () {
        this.isToggled = !this.isToggled;
        if (this.isToggled) {
            this.locateService.startLocate(this.mapId);
        }
        else {
            this.locateService.stopLocate(this.mapId);
        }
    };
    LocateControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-locate-control',
                    template: "<div class=\"btn-group-vertical btn-group-sm map-control\">\n  <button type=\"button\" class=\"btn btn-sm\" (click)=\"locateUser()\" [ngClass]=\"isToggled ? 'btn-primary': 'btn-light'\">\n    locate\n  </button>\n</div>\n",
                    styles: [":host i{width:11px}"]
                },] },
    ];
    /** @nocollapse */
    LocateControlComponent.ctorParameters = function () { return [
        { type: LocateService }
    ]; };
    LocateControlComponent.propDecorators = {
        mapId: [{ type: Input }]
    };
    return LocateControlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ZoomControlComponent = /** @class */ (function () {
    function ZoomControlComponent(mapCache) {
        this.mapCache = mapCache;
    }
    /**
     * @return {?}
     */
    ZoomControlComponent.prototype.zoomIn = /**
     * @return {?}
     */
    function () {
        this.mapCache.getMap(this.mapId).zoomIn();
    };
    /**
     * @return {?}
     */
    ZoomControlComponent.prototype.zoomOut = /**
     * @return {?}
     */
    function () {
        this.mapCache.getMap(this.mapId).zoomOut();
    };
    ZoomControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-zoom-control',
                    template: "<div class=\"btn-group-vertical map-control\">\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"zoomIn()\">\n    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n  </button>\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"zoomOut()\">\n    <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n  </button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ZoomControlComponent.ctorParameters = function () { return [
        { type: MapCache }
    ]; };
    ZoomControlComponent.propDecorators = {
        mapId: [{ type: Input }]
    };
    return ZoomControlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS$1 = [
    LocateControlComponent,
    ZoomControlComponent,
    GeosearchControlComponent,
    ExtentControlComponent
];
var HelgolandMapControlModule = /** @class */ (function () {
    function HelgolandMapControlModule() {
    }
    HelgolandMapControlModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        COMPONENTS$1
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        HelgolandCoreModule,
                        HelgolandMapModule
                    ],
                    exports: [
                        COMPONENTS$1
                    ],
                    providers: [
                        LocateService
                    ]
                },] },
    ];
    return HelgolandMapControlModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var MapSelectorComponent = /** @class */ (function (_super) {
    __extends(MapSelectorComponent, _super);
    function MapSelectorComponent(mapCache, differs, cd) {
        var _this = _super.call(this, mapCache, differs) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        _this.onSelected = new EventEmitter();
        _this.onContentLoading = new EventEmitter();
        _this.onNoResultsFound = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    MapSelectorComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.createMap();
        setTimeout(function () {
            _this.drawGeometries();
            _this.cd.detectChanges();
        }, 10);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MapSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.map) {
            if (changes["serviceUrl"] || changes["filter"] || changes["cluster"]) {
                this.drawGeometries();
            }
        }
    };
    /**
     * Zooms to the given bounds
     *
     * @protected
     * @param bounds where to zoom
     * @memberof MapSelectorComponent
     */
    /**
     * Zooms to the given bounds
     *
     * @protected
     * \@memberof MapSelectorComponent
     * @param {?} bounds where to zoom
     * @return {?}
     */
    MapSelectorComponent.prototype.zoomToMarkerBounds = /**
     * Zooms to the given bounds
     *
     * @protected
     * \@memberof MapSelectorComponent
     * @param {?} bounds where to zoom
     * @return {?}
     */
    function (bounds) {
        if (!this.avoidZoomToSelection) {
            this.map.fitBounds(bounds, this.fitBoundsMarkerOptions || {});
        }
    };
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
    return MapSelectorComponent;
}(CachedMapComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
LastValueLabelGenerator = /** @class */ (function () {
    function LastValueLabelGenerator() {
    }
    return LastValueLabelGenerator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Displays selectable series with their last values on an map.
 */
var LastValueMapSelectorComponent = /** @class */ (function (_super) {
    __extends(LastValueMapSelectorComponent, _super);
    function LastValueMapSelectorComponent(mapCache, differs, cd, apiInterface, lastValueLabelGenerator, statusIntervalResolver) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        _this.apiInterface = apiInterface;
        _this.lastValueLabelGenerator = lastValueLabelGenerator;
        _this.statusIntervalResolver = statusIntervalResolver;
        /**
         * Presentation type how to display the series.
         */
        _this.lastValuePresentation = 0 /* Colorized */;
        /**
         * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
         */
        _this.ignoreStatusIntervalIfBeforeDuration = Infinity;
        return _this;
    }
    /**
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        this.isContentLoading(true);
        if (this.lastValueSeriesIDs && this.lastValueSeriesIDs.length) {
            this.createMarkersBySeriesIDs();
        }
    };
    /**
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createMarkersBySeriesIDs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.markerFeatureGroup = featureGroup();
        /** @type {?} */
        var obsList = [];
        this.lastValueSeriesIDs.forEach(function (entry) {
            /** @type {?} */
            var tsObs = _this.apiInterface.getSingleTimeseriesByInternalId(entry);
            obsList.push(tsObs.pipe(switchMap(function (val) { return _this.createMarker(val).pipe(tap(function (res) {
                _this.markerFeatureGroup.addLayer(res);
                res.on('click', function () { return _this.onSelected.emit(val); });
            })); })));
        });
        this.finalizeMarkerObservables(obsList);
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        switch (this.lastValuePresentation) {
            case 0 /* Colorized */:
                return this.createColorizedMarker(ts);
            case 1 /* Textual */:
                return this.createLabeledMarker(ts);
        }
        return this.createColorizedMarker(ts);
    };
    /**
     * @param {?} obsList
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.finalizeMarkerObservables = /**
     * @param {?} obsList
     * @return {?}
     */
    function (obsList) {
        var _this = this;
        forkJoin(obsList).subscribe(function () {
            console.log('do zoom to bounds');
            if (_this.map) {
                /** @type {?} */
                var bounds = _this.markerFeatureGroup.getBounds();
                _this.zoomToMarkerBounds(bounds);
                _this.map.invalidateSize();
            }
            _this.isContentLoading(false);
        });
        if (this.map) {
            this.markerFeatureGroup.addTo(this.map);
        }
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createColorizedMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        var _this = this;
        return new Observable(function (observer) {
            _this.apiInterface.getTimeseriesExtras(ts.id, ts.url).subscribe(function (extras) {
                /** @type {?} */
                var coloredMarker;
                if (extras.statusIntervals) {
                    if ((ts.lastValue.timestamp) > new Date().getTime() - _this.ignoreStatusIntervalIfBeforeDuration) {
                        /** @type {?} */
                        var interval = _this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                        if (interval) {
                            coloredMarker = _this.createColoredMarker(ts, interval.color);
                        }
                    }
                }
                if (!coloredMarker) {
                    coloredMarker = _this.createDefaultColoredMarker(ts);
                }
                observer.next(coloredMarker);
                observer.complete();
            });
        });
    };
    /**
     * @param {?} ts
     * @param {?} color
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createColoredMarker = /**
     * @param {?} ts
     * @param {?} color
     * @return {?}
     */
    function (ts, color) {
        return this.createFilledMarker(ts, color, 10);
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createDefaultColoredMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        return this.createFilledMarker(ts, '#000', 10);
    };
    /**
     * @param {?} ts
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createFilledMarker = /**
     * @param {?} ts
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    function (ts, color, radius) {
        var _this = this;
        /** @type {?} */
        var geometry;
        if (ts.station.geometry.type === 'Point') {
            /** @type {?} */
            var point = /** @type {?} */ (ts.station.geometry);
            geometry = circleMarker([point.coordinates[1], point.coordinates[0]], {
                color: '#000',
                fillColor: color,
                fillOpacity: 0.8,
                radius: 10,
                weight: 2
            });
        }
        else {
            geometry = geoJSON(ts.station.geometry, {
                style: function (feature) {
                    return {
                        color: '#000',
                        fillColor: color,
                        fillOpacity: 0.8,
                        weight: 2
                    };
                }
            });
        }
        if (geometry) {
            geometry.on('click', function () { return _this.onSelected.emit(ts); });
            return geometry;
        }
    };
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueMapSelectorComponent.prototype.createLabeledMarker = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        var _this = this;
        return new Observable(function (observer) {
            /** @type {?} */
            var icon = _this.lastValueLabelGenerator.createIconLabel(ts);
            if (ts.station.geometry.type === 'Point') {
                /** @type {?} */
                var point = /** @type {?} */ (ts.station.geometry);
                observer.next(marker([point.coordinates[1], point.coordinates[0]], { icon: icon }));
                observer.complete();
            }
        });
    };
    LastValueMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-last-value-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    LastValueMapSelectorComponent.ctorParameters = function () { return [
        { type: MapCache },
        { type: KeyValueDiffers },
        { type: ChangeDetectorRef },
        { type: DatasetApiInterface },
        { type: LastValueLabelGenerator },
        { type: StatusIntervalResolverService }
    ]; };
    LastValueMapSelectorComponent.propDecorators = {
        lastValueSeriesIDs: [{ type: Input }],
        lastValuePresentation: [{ type: Input }],
        ignoreStatusIntervalIfBeforeDuration: [{ type: Input }]
    };
    /**
     * Displays selectable series with their last values on an map.
     */
    LastValueMapSelectorComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [MapCache,
            KeyValueDiffers,
            ChangeDetectorRef,
            DatasetApiInterface,
            LastValueLabelGenerator,
            StatusIntervalResolverService])
    ], LastValueMapSelectorComponent);
    return LastValueMapSelectorComponent;
}(MapSelectorComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PlatformMapSelectorComponent = /** @class */ (function (_super) {
    __extends(PlatformMapSelectorComponent, _super);
    function PlatformMapSelectorComponent(apiInterface, mapCache, cd, differs) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.apiInterface = apiInterface;
        _this.mapCache = mapCache;
        _this.cd = cd;
        _this.differs = differs;
        return _this;
    }
    /**
     * @return {?}
     */
    PlatformMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isContentLoading(true);
        if (this.map && this.markerFeatureGroup) {
            this.map.removeLayer(this.markerFeatureGroup);
        }
        this.apiInterface.getPlatforms(this.serviceUrl, this.filter)
            .subscribe(function (res) {
            if (_this.map) {
                if (_this.cluster) {
                    _this.markerFeatureGroup = markerClusterGroup({ animate: true });
                }
                else {
                    _this.markerFeatureGroup = featureGroup();
                }
                if (res instanceof Array && res.length > 0) {
                    res.forEach(function (entry) {
                        /** @type {?} */
                        var marker$$1 = marker([entry.geometry.coordinates[1], entry.geometry.coordinates[0]]);
                        marker$$1.on('click', function () {
                            _this.onSelected.emit(entry);
                        });
                        _this.markerFeatureGroup.addLayer(marker$$1);
                    });
                    _this.markerFeatureGroup.addTo(_this.map);
                    _this.zoomToMarkerBounds(_this.markerFeatureGroup.getBounds());
                }
                else {
                    _this.onNoResultsFound.emit(true);
                }
                _this.map.invalidateSize();
                _this.isContentLoading(false);
            }
        });
    };
    PlatformMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-platform-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    PlatformMapSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: MapCache },
        { type: ChangeDetectorRef },
        { type: KeyValueDiffers }
    ]; };
    PlatformMapSelectorComponent.propDecorators = {
        cluster: [{ type: Input }]
    };
    PlatformMapSelectorComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [DatasetApiInterface,
            MapCache,
            ChangeDetectorRef,
            KeyValueDiffers])
    ], PlatformMapSelectorComponent);
    return PlatformMapSelectorComponent;
}(MapSelectorComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LastValueLabelGeneratorService = /** @class */ (function (_super) {
    __extends(LastValueLabelGeneratorService, _super);
    function LastValueLabelGeneratorService() {
        return _super.call(this) || this;
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueLabelGeneratorService.prototype.createIconLabel = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        /** @type {?} */
        var date = moment(ts.lastValue.timestamp).fromNow();
        return divIcon({
            className: 'last-value-container',
            html: "<span class=\"last-value-label\">" + ts.lastValue.value + "&nbsp;" + ts.uom + "</span><br><span class=\"last-value-date\">" + date + "</span>"
        });
    };
    LastValueLabelGeneratorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LastValueLabelGeneratorService.ctorParameters = function () { return []; };
    return LastValueLabelGeneratorService;
}(LastValueLabelGenerator));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StationMapSelectorComponent = /** @class */ (function (_super) {
    __extends(StationMapSelectorComponent, _super);
    function StationMapSelectorComponent(statusIntervalResolver, apiInterface, mapCache, differs, cd) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.statusIntervalResolver = statusIntervalResolver;
        _this.apiInterface = apiInterface;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        /**
         * Ignores all Statusintervals where the timestamp is before a given duration in milliseconds and draws instead the default marker.
         */
        _this.ignoreStatusIntervalIfBeforeDuration = Infinity;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    StationMapSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.map && changes["statusIntervals"]) {
            this.drawGeometries();
        }
    };
    /**
     * @return {?}
     */
    StationMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        this.isContentLoading(true);
        if (this.map && this.markerFeatureGroup) {
            this.map.removeLayer(this.markerFeatureGroup);
        }
        if (this.statusIntervals && this.filter && this.filter.phenomenon) {
            this.createValuedMarkers();
        }
        else {
            this.createStationGeometries();
        }
    };
    /**
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createValuedMarkers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var tempFilter = {
            phenomenon: this.filter.phenomenon,
            expanded: true
        };
        this.apiInterface.getTimeseries(this.serviceUrl, tempFilter).subscribe(function (timeseries) {
            _this.markerFeatureGroup = featureGroup();
            /** @type {?} */
            var obsList = [];
            timeseries.forEach(function (ts) {
                /** @type {?} */
                var obs = _this.apiInterface.getTimeseriesExtras(ts.id, _this.serviceUrl);
                obsList.push(obs);
                obs.subscribe(function (extras) {
                    /** @type {?} */
                    var marker$$1;
                    if (extras.statusIntervals) {
                        if ((ts.lastValue.timestamp) > new Date().getTime() - _this.ignoreStatusIntervalIfBeforeDuration) {
                            /** @type {?} */
                            var interval = _this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                            if (interval) {
                                marker$$1 = _this.createColoredMarker(ts.station, interval.color);
                            }
                        }
                    }
                    if (!marker$$1) {
                        marker$$1 = _this.createDefaultColoredMarker(ts.station);
                    }
                    marker$$1.on('click', function () {
                        _this.onSelected.emit(ts.station);
                    });
                    _this.markerFeatureGroup.addLayer(marker$$1);
                });
            });
            forkJoin(obsList).subscribe(function () {
                _this.zoomToMarkerBounds(_this.markerFeatureGroup.getBounds());
                if (_this.map) {
                    _this.map.invalidateSize();
                }
                _this.isContentLoading(false);
            });
            if (_this.map) {
                _this.markerFeatureGroup.addTo(_this.map);
            }
        });
    };
    /**
     * @param {?} station
     * @param {?} color
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createColoredMarker = /**
     * @param {?} station
     * @param {?} color
     * @return {?}
     */
    function (station, color) {
        if (this.markerSelectorGenerator.createFilledMarker) {
            return this.markerSelectorGenerator.createFilledMarker(station, color);
        }
        return this.createFilledMarker(station, color, 10);
    };
    /**
     * @param {?} station
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createDefaultColoredMarker = /**
     * @param {?} station
     * @return {?}
     */
    function (station) {
        if (this.markerSelectorGenerator.createDefaultFilledMarker) {
            return this.markerSelectorGenerator.createDefaultFilledMarker(station);
        }
        return this.createFilledMarker(station, '#000', 10);
    };
    /**
     * @param {?} station
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createFilledMarker = /**
     * @param {?} station
     * @param {?} color
     * @param {?} radius
     * @return {?}
     */
    function (station, color, radius) {
        var _this = this;
        /** @type {?} */
        var geometry;
        if (station.geometry.type === 'Point') {
            /** @type {?} */
            var point = /** @type {?} */ (station.geometry);
            geometry = circleMarker([point.coordinates[1], point.coordinates[0]], {
                color: '#000',
                fillColor: color,
                fillOpacity: 0.8,
                radius: 10,
                weight: 2
            });
        }
        else {
            geometry = geoJSON(station.geometry, {
                style: function (feature) {
                    return {
                        color: '#000',
                        fillColor: color,
                        fillOpacity: 0.8,
                        weight: 2
                    };
                }
            });
        }
        if (geometry) {
            geometry.on('click', function () {
                _this.onSelected.emit(station);
            });
            return geometry;
        }
    };
    /**
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createStationGeometries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.apiInterface.getStations(this.serviceUrl, this.filter)
            .subscribe(function (res) {
            if (_this.cluster) {
                _this.markerFeatureGroup = markerClusterGroup({ animate: true });
            }
            else {
                _this.markerFeatureGroup = featureGroup();
            }
            if (res instanceof Array && res.length > 0) {
                res.forEach(function (entry) {
                    /** @type {?} */
                    var marker$$1 = _this.createDefaultGeometry(entry);
                    if (marker$$1) {
                        _this.markerFeatureGroup.addLayer(marker$$1);
                    }
                });
                _this.markerFeatureGroup.addTo(_this.map);
                _this.zoomToMarkerBounds(_this.markerFeatureGroup.getBounds());
            }
            else {
                _this.onNoResultsFound.emit(true);
            }
            _this.map.invalidateSize();
            _this.isContentLoading(false);
        });
    };
    /**
     * @param {?} station
     * @return {?}
     */
    StationMapSelectorComponent.prototype.createDefaultGeometry = /**
     * @param {?} station
     * @return {?}
     */
    function (station) {
        var _this = this;
        if (this.markerSelectorGenerator && this.markerSelectorGenerator.createDefaultGeometry) {
            return this.markerSelectorGenerator.createDefaultGeometry(station);
        }
        if (station.geometry) {
            /** @type {?} */
            var geometry = geoJSON(station.geometry);
            geometry.on('click', function () { return _this.onSelected.emit(station); });
            return geometry;
        }
        else {
            console.error(station.id + ' has no geometry');
        }
    };
    StationMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-station-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    StationMapSelectorComponent.ctorParameters = function () { return [
        { type: StatusIntervalResolverService },
        { type: DatasetApiInterface },
        { type: MapCache },
        { type: KeyValueDiffers },
        { type: ChangeDetectorRef }
    ]; };
    StationMapSelectorComponent.propDecorators = {
        cluster: [{ type: Input }],
        statusIntervals: [{ type: Input }],
        ignoreStatusIntervalIfBeforeDuration: [{ type: Input }]
    };
    StationMapSelectorComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [StatusIntervalResolverService,
            DatasetApiInterface,
            MapCache,
            KeyValueDiffers,
            ChangeDetectorRef])
    ], StationMapSelectorComponent);
    return StationMapSelectorComponent;
}(MapSelectorComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ProfileTrajectoryMapSelectorComponent = /** @class */ (function (_super) {
    __extends(ProfileTrajectoryMapSelectorComponent, _super);
    function ProfileTrajectoryMapSelectorComponent(apiInterface, mapCache, differs, cd) {
        var _this = _super.call(this, mapCache, differs, cd) || this;
        _this.apiInterface = apiInterface;
        _this.mapCache = mapCache;
        _this.differs = differs;
        _this.cd = cd;
        _this.onTimeListDetermined = new EventEmitter();
        _this.defaultStyle = {
            color: 'red',
            weight: 5,
            opacity: 0.65
        };
        _this.highlightStyle = {
            color: 'blue',
            weight: 7,
            opacity: 1
        };
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes["selectedTimespan"] && this.selectedTimespan && this.map) {
            this.clearMap();
            this.initLayer();
            this.data.forEach(function (entry) {
                if (_this.selectedTimespan.from <= entry.timestamp && entry.timestamp <= _this.selectedTimespan.to) {
                    _this.layer.addLayer(_this.createGeoJson(entry, _this.dataset));
                }
            });
            this.layer.addTo(this.map);
        }
    };
    /**
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.drawGeometries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isContentLoading(true);
        this.apiInterface.getDatasets(this.serviceUrl, this.filter).subscribe(function (datasets) {
            datasets.forEach(function (dataset) {
                _this.dataset = dataset;
                /** @type {?} */
                var timespan = new Timespan(dataset.firstValue.timestamp, dataset.lastValue.timestamp);
                _this.apiInterface.getData(dataset.id, _this.serviceUrl, timespan)
                    .subscribe(function (data) {
                    if (_this.map && data.values instanceof Array) {
                        _this.initLayer();
                        _this.data = [];
                        /** @type {?} */
                        var timelist_1 = [];
                        data.values.forEach(function (entry) {
                            _this.data.push(entry);
                            /** @type {?} */
                            var geojson = _this.createGeoJson(entry, dataset);
                            timelist_1.push(entry.timestamp);
                            _this.layer.addLayer(geojson);
                        });
                        _this.onTimeListDetermined.emit(timelist_1);
                        _this.layer.addTo(_this.map);
                        _this.zoomToMarkerBounds(_this.layer.getBounds());
                    }
                    _this.isContentLoading(false);
                });
            });
        });
    };
    /**
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.initLayer = /**
     * @return {?}
     */
    function () {
        this.layer = markerClusterGroup({ animate: false });
    };
    /**
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.clearMap = /**
     * @return {?}
     */
    function () {
        if (this.map && this.layer) {
            this.map.removeLayer(this.layer);
        }
    };
    /**
     * @param {?} profileDataEntry
     * @param {?} dataset
     * @return {?}
     */
    ProfileTrajectoryMapSelectorComponent.prototype.createGeoJson = /**
     * @param {?} profileDataEntry
     * @param {?} dataset
     * @return {?}
     */
    function (profileDataEntry, dataset) {
        var _this = this;
        /** @type {?} */
        var geojson = new GeoJSON(profileDataEntry.geometry);
        geojson.setStyle(this.defaultStyle);
        geojson.on('click', function () {
            _this.onSelected.emit({
                dataset: dataset,
                data: profileDataEntry
            });
        });
        geojson.on('mouseover', function () {
            geojson.setStyle(_this.highlightStyle);
            geojson.bringToFront();
        });
        geojson.on('mouseout', function () {
            geojson.setStyle(_this.defaultStyle);
        });
        return geojson;
    };
    ProfileTrajectoryMapSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-profile-trajectory-map-selector',
                    template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                    styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                },] },
    ];
    /** @nocollapse */
    ProfileTrajectoryMapSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: MapCache },
        { type: KeyValueDiffers },
        { type: ChangeDetectorRef }
    ]; };
    ProfileTrajectoryMapSelectorComponent.propDecorators = {
        selectedTimespan: [{ type: Input }],
        onTimeListDetermined: [{ type: Output }]
    };
    ProfileTrajectoryMapSelectorComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [DatasetApiInterface,
            MapCache,
            KeyValueDiffers,
            ChangeDetectorRef])
    ], ProfileTrajectoryMapSelectorComponent);
    return ProfileTrajectoryMapSelectorComponent;
}(MapSelectorComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS$2 = [
    PlatformMapSelectorComponent,
    StationMapSelectorComponent,
    ProfileTrajectoryMapSelectorComponent,
    LastValueMapSelectorComponent
];
var HelgolandMapSelectorModule = /** @class */ (function () {
    function HelgolandMapSelectorModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    HelgolandMapSelectorModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: HelgolandMapSelectorModule,
            providers: [
                { provide: LastValueLabelGenerator, useClass: config && config.lastValueLabelGeneratorService || LastValueLabelGeneratorService }
            ]
        };
    };
    HelgolandMapSelectorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        COMPONENTS$2
                    ],
                    imports: [
                        CommonModule,
                        HelgolandCoreModule,
                        HelgolandMapModule
                    ],
                    exports: [
                        COMPONENTS$2
                    ],
                    providers: [
                        { provide: LastValueLabelGenerator, useClass: LastValueLabelGeneratorService }
                    ]
                },] },
    ];
    return HelgolandMapSelectorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandMapModule, MapCache, CachedMapComponent, GeoSearch, NominatimGeoSearchService, GeoCureGeoJSON, HelgolandMapViewModule, GeometryMapViewerComponent, HelgolandMapControlModule, ExtentControlComponent, GeosearchControlComponent, LocateControlComponent, LocateService, ZoomControlComponent, HelgolandMapSelectorModule, MapSelectorComponent, PlatformMapSelectorComponent, StationMapSelectorComponent, LastValueMapSelectorComponent, ProfileTrajectoryMapSelectorComponent, LastValueLabelGeneratorService, LastValueLabelGenerator };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLW1hcC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9iYXNlL21hcC5tb2R1bGUudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9iYXNlL2NhY2hlZC1tYXAtY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL21hcC9saWIvYmFzZS9nZW9zZWFyY2gvZ2Vvc2VhcmNoLnRzIiwibmc6Ly9AaGVsZ29sYW5kL21hcC9saWIvYmFzZS9nZW9zZWFyY2gvbm9taW5hdGltLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9iYXNlL2dlb2N1cmUvZ2VvY3VyZS1sYXllci50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3ZpZXcvZ2VvbWV0cnktbWFwLXZpZXdlci9nZW9tZXRyeS1tYXAtdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3ZpZXcvbW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL21hcC9saWIvY29udHJvbC9leHRlbnQvZXh0ZW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2NvbnRyb2wvZ2Vvc2VhcmNoL2dlb3NlYXJjaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9jb250cm9sL2xvY2F0ZS9sb2NhdGUuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2NvbnRyb2wvbG9jYXRlL2xvY2F0ZS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9jb250cm9sL3pvb20vem9vbS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9jb250cm9sL21vZHVsZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3NlbGVjdG9yL21hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9zZXJ2aWNlcy9sYXN0LXZhbHVlLWxhYmVsLWdlbmVyYXRvci5pbnRlcmZhY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9wbGF0Zm9ybS1tYXAtc2VsZWN0b3IvcGxhdGZvcm0tbWFwLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3NlbGVjdG9yL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9zdGF0aW9uLW1hcC1zZWxlY3Rvci9zdGF0aW9uLW1hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci90cmFqZWN0b3J5LW1hcC1zZWxlY3Rvci90cmFqZWN0b3J5LW1hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcENhY2hlIHtcblxuICAgIHByaXZhdGUgbWFwQ2FjaGU6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgcHVibGljIGdldE1hcChpZDogc3RyaW5nKTogTC5NYXAge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBDYWNoZS5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXAoaWQ6IHN0cmluZywgbWFwOiBMLk1hcCkge1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldChpZCwgbWFwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuZGVsZXRlKGlkKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi9tYXAtY2FjaGUuc2VydmljZSc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTWFwQ2FjaGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRNYXBNb2R1bGUgeyB9XG4iLCJpbXBvcnQge1xuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVyLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4vbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9tYXAtb3B0aW9ucyc7XG5cbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9OQU1FID0gJ0Jhc2VMYXllcic7XG5jb25zdCBERUZBVUxUX0JBU0VfTEFZRVJfVVJMID0gJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJztcbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9BVFRSSUJVVElPTiA9ICcmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWNoZWRNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2ssIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwIHdpdGggdGhlIGdpdmVuIElEIGlzIGNyZWF0ZWQgaW5zaWRlIHRoaXMgY29tcG9uZW50LiBUaGlzIElEIGNhbiBiZSB1c2VkIHRoZSBnZXQgdGhlIG1hcCBpbnN0YW5jZSBvdmVyIHRoZSBtYXAgY2FjaGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvcnJlc3BvbmRpbmcgbGVhZmxldCBtYXAgb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjbWFwLW9wdGlvbilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBPcHRpb25zOiBMLk1hcE9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBCb3VuZHMgZm9yIHRoZSBtYXBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaXRCb3VuZHM6IEwuTGF0TG5nQm91bmRzRXhwcmVzc2lvbjtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgd2hpY2ggaG9sZHMgYWxsIG92ZXJsYXkgbWFwIGxheWVyIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNsYXllcilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvdmVybGF5TWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgd2hpY2ggaG9sZHMgYWxsIGJhc2UgbWFwIGxheWVyIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNsYXllcilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBiYXNlTWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyB0aGUgdGhlIHpvb20gb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjY29udHJvbC1sYXllcnMpXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGF5ZXJDb250cm9sT3B0aW9uczogTC5Db250cm9sLkxheWVyc09wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmliZXMgdGhlIHRoZSB6b29tIGNvbnRyb2wgb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjY29udHJvbC16b29tKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHpvb21Db250cm9sT3B0aW9uczogTC5Db250cm9sLlpvb21PcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogSW5mb3JtcyB3aGVuIGluaXRpYWxpemF0aW9uIGlzIGRvbmUgd2l0aCBtYXAgaWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG1hcEluaXRpYWxpemVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXAgb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBtYXA6IEwuTWFwO1xuXG4gICAgcHJvdGVjdGVkIG9sZE92ZXJsYXlMYXllcjogTC5Db250cm9sLkxheWVyc09iamVjdCA9IHt9O1xuICAgIHByb3RlY3RlZCBvbGRCYXNlTGF5ZXI6IEwuQ29udHJvbC5MYXllcnNPYmplY3QgPSB7fTtcbiAgICBwcm90ZWN0ZWQgbGF5ZXJDb250cm9sOiBMLkNvbnRyb2wuTGF5ZXJzO1xuICAgIHByb3RlY3RlZCB6b29tQ29udHJvbDogTC5Db250cm9sLlpvb207XG5cbiAgICBwcml2YXRlIF9vdmVybGF5TWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcbiAgICBwcml2YXRlIF9kaWZmZXJPdmVybGF5TWFwczogS2V5VmFsdWVEaWZmZXI8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2Jhc2VNYXBzOiBNYXA8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2RpZmZlckJhc2VNYXBzOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIExheWVyT3B0aW9ucz47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICB0aGlzLl9kaWZmZXJPdmVybGF5TWFwcyA9IHRoaXMuZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5fZGlmZmVyQmFzZU1hcHMgPSB0aGlzLmRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tYXBJZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubWFwSWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWFwSWQgPSB0aGlzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5maXRCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHModGhpcy5maXRCb3VuZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuem9vbUNvbnRyb2xPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVab29tQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlck92ZXJsYXlNYXBzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyT3ZlcmxheU1hcHMuZGlmZih0aGlzLm92ZXJsYXlNYXBzKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKGUpID0+IHRoaXMucmVtb3ZlT3ZlcmxheU1hcChlLnByZXZpb3VzVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGUpID0+IHRoaXMuYWRkT3ZlcmxheU1hcChlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlckJhc2VNYXBzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyQmFzZU1hcHMuZGlmZih0aGlzLmJhc2VNYXBzKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKGUpID0+IHRoaXMucmVtb3ZlQmFzZU1hcChlLnByZXZpb3VzVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGUpID0+IHRoaXMuYWRkQmFzZU1hcChlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgICAgIHRoaXMubWFwQ2FjaGUuZGVsZXRlTWFwKHRoaXMubWFwSWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXAoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tYXBPcHRpb25zIHx8IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKSB7IHRoaXMubWFwT3B0aW9ucyA9IHsgem9vbUNvbnRyb2w6IGZhbHNlIH07IH1cbiAgICAgICAgdGhpcy5tYXAgPSBMLm1hcCh0aGlzLm1hcElkLCB0aGlzLm1hcE9wdGlvbnMpO1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldE1hcCh0aGlzLm1hcElkLCB0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMubWFwSW5pdGlhbGl6ZWQuZW1pdCh0aGlzLm1hcElkKTtcbiAgICAgICAgaWYgKHRoaXMuYmFzZU1hcHMgJiYgdGhpcy5iYXNlTWFwcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5iYXNlTWFwcy5mb3JFYWNoKChlbnRyeSwga2V5KSA9PiB0aGlzLmFkZEJhc2VNYXAoZW50cnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQmFzZU1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlNYXBzKSB7IHRoaXMub3ZlcmxheU1hcHMuZm9yRWFjaCgoZW50cnksIGtleSkgPT4gdGhpcy5hZGRPdmVybGF5TWFwKGVudHJ5KSk7IH1cbiAgICAgICAgdGhpcy51cGRhdGVab29tQ29udHJvbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29udHJvbCgpO1xuICAgICAgICBpZiAodGhpcy5maXRCb3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlVVVJRCgpOiBzdHJpbmcge1xuICAgICAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE92ZXJsYXlNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkT3ZlcmxheUxheWVyLmhhc093blByb3BlcnR5W2xheWVyT3B0aW9ucy5sYWJlbF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZE92ZXJsYXlMYXllcltsYXllck9wdGlvbnMubGFiZWxdID0gbGF5ZXJPcHRpb25zLmxheWVyO1xuICAgICAgICAgICAgICAgIGlmIChsYXllck9wdGlvbnMudmlzaWJsZSkgeyBsYXllck9wdGlvbnMubGF5ZXIuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU92ZXJsYXlNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMub2xkT3ZlcmxheUxheWVyLmhhc093blByb3BlcnR5KGxheWVyT3B0aW9ucy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEJhc2VNYXAobGF5ZXJPcHRpb25zPzogTGF5ZXJPcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJhc2VNYXBzIHx8IHRoaXMuYmFzZU1hcHMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IERFRkFVTFRfQkFTRV9MQVlFUl9OQU1FLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYXllcjogTC50aWxlTGF5ZXIoREVGQVVMVF9CQVNFX0xBWUVSX1VSTCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246IERFRkFVTFRfQkFTRV9MQVlFUl9BVFRSSUJVVElPTlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkQmFzZUxheWVyLmhhc093blByb3BlcnR5W2xheWVyT3B0aW9ucy5sYWJlbF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZEJhc2VMYXllcltsYXllck9wdGlvbnMubGFiZWxdID0gbGF5ZXJPcHRpb25zLmxheWVyO1xuICAgICAgICAgICAgICAgIGlmIChsYXllck9wdGlvbnMudmlzaWJsZSkgeyBsYXllck9wdGlvbnMubGF5ZXIuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUJhc2VNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMub2xkQmFzZUxheWVyLmhhc093blByb3BlcnR5KGxheWVyT3B0aW9ucy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxheWVyQ29udHJvbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXllckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVDb250cm9sKHRoaXMubGF5ZXJDb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyQ29udHJvbE9wdGlvbnNcbiAgICAgICAgICAgICAgICAmJiAoT2JqZWN0LmtleXModGhpcy5vbGRCYXNlTGF5ZXIpLmxlbmd0aCA+IDEgfHwgT2JqZWN0LmtleXModGhpcy5vbGRPdmVybGF5TGF5ZXIpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXllckNvbnRyb2wgPVxuICAgICAgICAgICAgICAgICAgICBMLmNvbnRyb2wubGF5ZXJzKHRoaXMub2xkQmFzZUxheWVyLCB0aGlzLm9sZE92ZXJsYXlMYXllciwgdGhpcy5sYXllckNvbnRyb2xPcHRpb25zKS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVpvb21Db250cm9sKCkge1xuICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCkgeyB0aGlzLm1hcC5yZW1vdmVDb250cm9sKHRoaXMuem9vbUNvbnRyb2wpOyB9XG4gICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IEwuY29udHJvbC56b29tKHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgTGF0TG5nQm91bmRzTGl0ZXJhbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvU2VhcmNoUmVzdWx0IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZ2VvbWV0cnk6IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcbiAgICBib3VuZHM/OiBMYXRMbmdCb3VuZHNMaXRlcmFsO1xuICAgIGFkZHJlc3M/OiB7XG4gICAgICAgIGNpdHk/OiBzdHJpbmc7XG4gICAgICAgIGNpdHlfZGlzdHJpY3Q/OiBzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdGlvbj86IHN0cmluZztcbiAgICAgICAgY29udGluZW50Pzogc3RyaW5nO1xuICAgICAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgICAgICBjb3VudHJ5X2NvZGU/OiBzdHJpbmc7XG4gICAgICAgIGhvdXNlX251bWJlcj86IHN0cmluZztcbiAgICAgICAgbmVpZ2hib3VyaG9vZD86IHN0cmluZztcbiAgICAgICAgcG9zdGNvZGU/OiBzdHJpbmc7XG4gICAgICAgIHB1YmxpY19idWlsZGluZz86IHN0cmluZztcbiAgICAgICAgcm9hZD86IHN0cmluZztcbiAgICAgICAgc3RhdGU/OiBzdHJpbmc7XG4gICAgICAgIHN1YnVyYj86IHN0cmluZztcbiAgICAgICAgdG93bj86IHN0cmluZztcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvU2VhcmNoT3B0aW9ucyB7XG4gICAgYWNjZXB0TGFuZ3VhZ2U/OiBzdHJpbmc7XG4gICAgYWRkcmVzc2RldGFpbHM/OiBib29sZWFuO1xuICAgIGFzUG9pbnRHZW9tZXRyeT86IGJvb2xlYW47XG4gICAgY291bnRyeWNvZGVzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvUmV2ZXJzZU9wdGlvbnMge1xuICAgIGFjY2VwdExhbmd1YWdlPzogc3RyaW5nO1xuICAgIGFkZHJlc3NkZXRhaWxzPzogYm9vbGVhbjtcbiAgICB6b29tPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlb1JldmVyc2VSZXN1bHQge1xuICAgIGxhdDogc3RyaW5nO1xuICAgIGxvbjogc3RyaW5nO1xuICAgIGRpc3BsYXlOYW1lPzogc3RyaW5nO1xuICAgIGFkZHJlc3M/OiB7XG4gICAgICAgIGNpdHk6IHN0cmluZztcbiAgICAgICAgY2l0eURpc3RyaWN0OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnk6IHN0cmluZztcbiAgICAgICAgY291bnRyeUNvZGU6IHN0cmluZztcbiAgICAgICAgY291bnR5OiBzdHJpbmc7XG4gICAgICAgIGhvdXNlTnVtYmVyOiBzdHJpbmc7XG4gICAgICAgIG5laWdoYm91cmhvb2Q6IHN0cmluZztcbiAgICAgICAgcG9zdGNvZGU6IHN0cmluZztcbiAgICAgICAgcm9hZDogc3RyaW5nO1xuICAgICAgICBzdGF0ZTogc3RyaW5nO1xuICAgICAgICBzdGF0ZURpc3RyaWN0OiBzdHJpbmc7XG4gICAgICAgIHN1YnVyYjogc3RyaW5nO1xuICAgIH07XG4gICAgYm91bmRpbmdib3g/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlb1NlYXJjaCB7XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2VhcmNoVGVybSh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM/OiBHZW9TZWFyY2hPcHRpb25zKTogT2JzZXJ2YWJsZTxHZW9TZWFyY2hSZXN1bHQ+O1xuXG4gICAgcHVibGljIGFic3RyYWN0IHJldmVyc2UocG9pbnQ6IFBvaW50LCBvcHRpb25zPzogR2VvUmV2ZXJzZU9wdGlvbnMpOiBPYnNlcnZhYmxlPEdlb1JldmVyc2VSZXN1bHQ+O1xuXG59XG4iLCJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEdlb1JldmVyc2VPcHRpb25zLCBHZW9SZXZlcnNlUmVzdWx0LCBHZW9TZWFyY2gsIEdlb1NlYXJjaE9wdGlvbnMsIEdlb1NlYXJjaFJlc3VsdCB9IGZyb20gJy4vZ2Vvc2VhcmNoJztcblxuaW50ZXJmYWNlIE5vbWluYXRpbVNlYXJjaFJlc3VsdCB7XG4gICAgZGlzcGxheV9uYW1lOiBzdHJpbmc7XG4gICAgZ2VvanNvbj86IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBib3VuZGluZ2JveDogbnVtYmVyW107XG4gICAgYWRkcmVzcz86IHtcbiAgICAgICAgY2l0eT86IHN0cmluZztcbiAgICAgICAgY2l0eV9kaXN0cmljdD86IHN0cmluZztcbiAgICAgICAgY29uc3RydWN0aW9uPzogc3RyaW5nO1xuICAgICAgICBjb250aW5lbnQ/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnk/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnlfY29kZT86IHN0cmluZztcbiAgICAgICAgaG91c2VfbnVtYmVyPzogc3RyaW5nO1xuICAgICAgICBuZWlnaGJvdXJob29kPzogc3RyaW5nO1xuICAgICAgICBwb3N0Y29kZT86IHN0cmluZztcbiAgICAgICAgcHVibGljX2J1aWxkaW5nPzogc3RyaW5nO1xuICAgICAgICBzdGF0ZT86IHN0cmluZztcbiAgICAgICAgc3VidXJiPzogc3RyaW5nO1xuICAgIH07XG59XG5cbmludGVyZmFjZSBBZGRyZXNzIHtcbiAgICBhZGRyZXNzMjk6IHN0cmluZztcbiAgICBob3VzZV9udW1iZXI6IHN0cmluZztcbiAgICByb2FkOiBzdHJpbmc7XG4gICAgbmVpZ2hib3VyaG9vZDogc3RyaW5nO1xuICAgIHN1YnVyYjogc3RyaW5nO1xuICAgIGNpdHlfZGlzdHJpY3Q6IHN0cmluZztcbiAgICBjaXR5OiBzdHJpbmc7XG4gICAgY291bnR5OiBzdHJpbmc7XG4gICAgc3RhdGVfZGlzdHJpY3Q6IHN0cmluZztcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHBvc3Rjb2RlOiBzdHJpbmc7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIGNvdW50cnlfY29kZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTm9taW5hdGltUmV2ZXJzZVJlc3VsdCB7XG4gICAgcGxhY2VfaWQ6IHN0cmluZztcbiAgICBsaWNlbmNlOiBzdHJpbmc7XG4gICAgb3NtX3R5cGU6IHN0cmluZztcbiAgICBvc21faWQ6IHN0cmluZztcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBhZGRyZXNzOiBBZGRyZXNzO1xuICAgIGJvdW5kaW5nYm94OiBzdHJpbmdbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vbWluYXRpbUdlb1NlYXJjaFNlcnZpY2UgaW1wbGVtZW50cyBHZW9TZWFyY2gge1xuXG4gICAgcHJvdGVjdGVkIHNlcnZpY2VVcmwgPSAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cFNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIHNlYXJjaFRlcm0odGVybTogc3RyaW5nLCBvcHRpb25zOiBHZW9TZWFyY2hPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEdlb1NlYXJjaFJlc3VsdD4ge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgncScsIHRlcm0pO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdmb3JtYXQnLCAnanNvbicpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdsaW1pdCcsICcxJyk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvdW50cnljb2RlcykgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdjb3VudHJ5Y29kZXMnLCBvcHRpb25zLmNvdW50cnljb2Rlcy5qb2luKCcsJykpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLmFkZHJlc3NkZXRhaWxzICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2FkZHJlc3NkZXRhaWxzJywgb3B0aW9ucy5hZGRyZXNzZGV0YWlscyA/ICcxJyA6ICcwJyk7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXNQb2ludEdlb21ldHJ5ICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ3BvbHlnb25fZ2VvanNvbicsIG9wdGlvbnMuYXNQb2ludEdlb21ldHJ5ID8gJzAnIDogJzEnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hY2NlcHRMYW5ndWFnZSkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhY2NlcHQtbGFuZ3VhZ2UnLCBvcHRpb25zLmFjY2VwdExhbmd1YWdlKTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmNsaWVudCgpLmdldChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZVVybCArICdzZWFyY2gnLFxuICAgICAgICAgICAgeyBwYXJhbXMgfVxuICAgICAgICApLm1hcCgocmVzQXJyYXk6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzQXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJlc3VsdC5kaXNwbGF5X25hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZ2VvanNvbikge1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IHJlc3VsdC5nZW9qc29uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbcGFyc2VGbG9hdChyZXN1bHQubG9uKSwgcGFyc2VGbG9hdChyZXN1bHQubGF0KV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuUmVzdWx0OiBHZW9TZWFyY2hSZXN1bHQgPSB7IG5hbWUsIGdlb21ldHJ5IH07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5ib3VuZGluZ2JveCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5SZXN1bHQuYm91bmRzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm91bmRpbmdib3hbMl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJvdW5kaW5nYm94WzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFszXVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmFkZHJlc3MpIHsgcmV0dXJuUmVzdWx0LmFkZHJlc3MgPSByZXN1bHQuYWRkcmVzczsgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5SZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXZlcnNlKHBvaW50OiBQb2ludCwgb3B0aW9uczogR2VvUmV2ZXJzZU9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8R2VvUmV2ZXJzZVJlc3VsdD4ge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgnbGF0JywgcG9pbnQuY29vcmRpbmF0ZXNbMF0udG9TdHJpbmcoKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2xvbicsIHBvaW50LmNvb3JkaW5hdGVzWzFdLnRvU3RyaW5nKCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdmb3JtYXQnLCAnanNvbicpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFkZHJlc3NkZXRhaWxzICE9PSB1bmRlZmluZWQpIHsgcGFyYW1zID0gcGFyYW1zLnNldCgnYWRkcmVzc2RldGFpbHMnLCBvcHRpb25zLmFkZHJlc3NkZXRhaWxzID8gJzEnIDogJzAnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hY2NlcHRMYW5ndWFnZSAhPT0gbnVsbCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhY2NlcHQtbGFuZ3VhZ2UnLCBvcHRpb25zLmFjY2VwdExhbmd1YWdlKTsgfVxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnpvb20gIT09IHVuZGVmaW5lZCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCd6b29tJywgYCR7b3B0aW9ucy56b29tfWApOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuY2xpZW50KCkuZ2V0KFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlVXJsICsgJ3JldmVyc2UnLFxuICAgICAgICAgICAgeyBwYXJhbXMgfVxuICAgICAgICApLm1hcCgocmVzOiBOb21pbmF0aW1SZXZlcnNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgbGF0OiByZXMubGF0LFxuICAgICAgICAgICAgICAgIGxvbjogcmVzLmxvbixcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcmVzLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICBib3VuZGluZ2JveDogcmVzLmJvdW5kaW5nYm94XG4gICAgICAgICAgICB9IGFzIEdlb1JldmVyc2VSZXN1bHQ7XG4gICAgICAgICAgICBpZiAocmVzLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkcmVzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY2l0eTogcmVzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgY2l0eURpc3RyaWN0OiByZXMuYWRkcmVzcy5jaXR5X2Rpc3RyaWN0LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXMuYWRkcmVzcy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogcmVzLmFkZHJlc3MuY291bnRyeV9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb3VudHk6IHJlcy5hZGRyZXNzLmNvdW50eSxcbiAgICAgICAgICAgICAgICAgICAgaG91c2VOdW1iZXI6IHJlcy5hZGRyZXNzLmhvdXNlX251bWJlcixcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3VyaG9vZDogcmVzLmFkZHJlc3MubmVpZ2hib3VyaG9vZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zdGNvZGU6IHJlcy5hZGRyZXNzLnBvc3Rjb2RlLFxuICAgICAgICAgICAgICAgICAgICByb2FkOiByZXMuYWRkcmVzcy5yb2FkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogcmVzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlRGlzdHJpY3Q6IHJlcy5hZGRyZXNzLnN0YXRlX2Rpc3RyaWN0LFxuICAgICAgICAgICAgICAgICAgICBzdWJ1cmI6IHJlcy5hZGRyZXNzLnN1YnVyYlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHZW9KU09OLCBHZW9KU09OT3B0aW9ucywgTGF0TG5nQm91bmRzLCBMZWFmbGV0RXZlbnQgfSBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IGludGVyZmFjZSBHZW9DdXJlR2VvSlNPTk9wdGlvbnMgZXh0ZW5kcyBHZW9KU09OT3B0aW9ucyB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaHR0cENsaWVudDogSHR0cENsaWVudDtcbiAgICBzaG93T25NaW5ab29tPzogbnVtYmVyO1xuICAgIHNob3dPbk1heFpvb20/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBHZW9DdXJlR2VvSlNPTiBleHRlbmRzIEdlb0pTT04ge1xuXG4gICAgcHVibGljIG9wdGlvbnM6IEdlb0N1cmVHZW9KU09OT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvcHRpb25zPzogR2VvQ3VyZUdlb0pTT05PcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICAgICAgbW92ZWVuZDogKGV2ZW50OiBMZWFmbGV0RXZlbnQpID0+IHRoaXMuZmV0Y2hEYXRhKGV2ZW50LnRhcmdldClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25BZGQobWFwOiBMLk1hcCk6IHRoaXMgIHtcbiAgICAgICAgc3VwZXIub25BZGQobWFwKTtcbiAgICAgICAgdGhpcy5mZXRjaERhdGEobWFwKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaERhdGEobWFwOiBMLk1hcCkge1xuICAgICAgICBjb25zdCBtYXRjaE1heFpvb20gPSB0aGlzLm9wdGlvbnMuc2hvd09uTWF4Wm9vbSA/IG1hcC5nZXRab29tKCkgPD0gdGhpcy5vcHRpb25zLnNob3dPbk1heFpvb20gOiB0cnVlO1xuICAgICAgICBjb25zdCBtYXRjaE1pblpvb20gPSB0aGlzLm9wdGlvbnMuc2hvd09uTWluWm9vbSA/IG1hcC5nZXRab29tKCkgPj0gdGhpcy5vcHRpb25zLnNob3dPbk1pblpvb20gOiB0cnVlO1xuICAgICAgICBpZiAobWF0Y2hNaW5ab29tICYmIG1hdGNoTWF4Wm9vbSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShtYXAuZ2V0Qm91bmRzKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGVhckxheWVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRGF0YShib3VuZHM6IExhdExuZ0JvdW5kcykge1xuICAgICAgICBjb25zdCBiYm94cGFyYW0gPSBbYm91bmRzLmdldFdlc3QoKSwgYm91bmRzLmdldFNvdXRoKCksIGJvdW5kcy5nZXRFYXN0KCksIGJvdW5kcy5nZXROb3J0aCgpXS5qb2luKCcsJyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50XG4gICAgICAgICAgICAuZ2V0PEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+KHRoaXMub3B0aW9ucy51cmwsIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmJveDogYmJveHBhcmFtXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGdlb2pzb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGREYXRhKGdlb2pzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgS2V5VmFsdWVEaWZmZXJzLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENhY2hlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2Jhc2UvY2FjaGVkLW1hcC1jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZ2VvbWV0cnktbWFwLXZpZXdlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IFthdHRyLmlkXT1cIm1hcElkXCIgY2xhc3M9XCJtYXAtdmlld2VyXCI+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfTpob3N0IC5tYXAtdmlld2Vye2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlNYXBWaWV3ZXJDb21wb25lbnQgZXh0ZW5kcyBDYWNoZWRNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaGlnaGxpZ2h0OiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZW9tZXRyeTogR2VvSlNPTi5HZW9Kc29uT2JqZWN0O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgem9vbVRvOiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhdm9pZFpvb21Ub0dlb21ldHJ5OiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRHZW9tZXRyeTogTC5HZW9KU09OO1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0U3R5bGU6IEwuUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgd2VpZ2h0OiA1LFxuICAgICAgICBvcGFjaXR5OiAwLjY1XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGlnaGxpZ2h0U3R5bGU6IEwuUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAnYmx1ZScsXG4gICAgICAgIHdlaWdodDogMTAsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgIHRoaXMuZHJhd0dlb21ldHJ5KCk7XG4gICAgICAgIHRoaXMuc2hvd0hpZ2hsaWdodCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmhpZ2hsaWdodCAmJiBjaGFuZ2VzLmhpZ2hsaWdodC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dIaWdobGlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2VvbWV0cnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLnpvb21Ubykge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvR2VvbWV0cnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgem9vbVRvR2VvbWV0cnkoKSB7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gTC5nZW9KU09OKHRoaXMuem9vbVRvKTtcbiAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKGdlb21ldHJ5LmdldEJvdW5kcygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dIaWdobGlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodEdlb21ldHJ5KSB7XG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLmhpZ2hsaWdodEdlb21ldHJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZ2hsaWdodEdlb21ldHJ5ID0gTC5nZW9KU09OKHRoaXMuaGlnaGxpZ2h0LCB7XG4gICAgICAgICAgICBwb2ludFRvTGF5ZXI6IChmZWF0dXJlLCBsYXRsbmcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTC5jaXJjbGVNYXJrZXIobGF0bG5nLCB0aGlzLmhpZ2hsaWdodFN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkuc2V0U3R5bGUodGhpcy5oaWdobGlnaHRTdHlsZSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkuYWRkVG8odGhpcy5tYXApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0dlb21ldHJ5KCkge1xuICAgICAgICBpZiAodGhpcy5nZW9tZXRyeSkge1xuICAgICAgICAgICAgY29uc3QgZ2VvanNvbiA9IEwuZ2VvSlNPTih0aGlzLmdlb21ldHJ5LCB7XG4gICAgICAgICAgICAgICAgcG9pbnRUb0xheWVyOiAoZmVhdHVyZSwgbGF0bG5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgICBnZW9qc29uLmFkZFRvKHRoaXMubWFwKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmF2b2lkWm9vbVRvR2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHMoZ2VvanNvbi5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRNYXBNb2R1bGUgfSBmcm9tICcuLi9iYXNlL21hcC5tb2R1bGUnO1xuaW1wb3J0IHsgR2VvbWV0cnlNYXBWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2dlb21ldHJ5LW1hcC12aWV3ZXIvZ2VvbWV0cnktbWFwLXZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBHZW9tZXRyeU1hcFZpZXdlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBIZWxnb2xhbmRNYXBNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgR2VvbWV0cnlNYXBWaWV3ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTWFwVmlld01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWV4dGVudC1jb250cm9sJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiem9vbVRvRXh0ZW50KClcIj56b29tIHRvIGV4dGVudDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEV4dGVudENvbnRyb2xDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBleHRlbnQ6IEwuTGF0TG5nQm91bmRzRXhwcmVzc2lvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlXG4gICkgeyB9XG5cbiAgcHVibGljIHpvb21Ub0V4dGVudCgpIHtcbiAgICB0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKS5maXRCb3VuZHModGhpcy5leHRlbnQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBHZW9TZWFyY2gsIEdlb1NlYXJjaE9wdGlvbnMsIEdlb1NlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uL2Jhc2UvZ2Vvc2VhcmNoL2dlb3NlYXJjaCc7XG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1nZW9zZWFyY2gtY29udHJvbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8aW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCIgKGtleXVwLmVudGVyKT1cInRyaWdnZXJTZWFyY2goKVwiPlxuICA8c3BhbiAqbmdJZj1cImxvYWRpbmdcIj5sb2FkaW5nLi4uPC9zcGFuPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHQgYnRuLXNtXCIgKGNsaWNrKT1cImNsZWFyU2VhcmNoKClcIj5YPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgR2Vvc2VhcmNoQ29udHJvbENvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IG1hcCBpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBzZWFyY2ggb3B0aW9ucy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvcHRpb25zOiBHZW9TZWFyY2hPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2VhcmNoIHJlc3VsdC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25SZXN1bHRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8R2VvU2VhcmNoUmVzdWx0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEluZm9ybXMsIHdoZW4gdGhlIHNlYXJjaCBpcyB0cmlnZ2VyZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VhcmNoVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgcmVzdWx0OiBHZW9TZWFyY2hSZXN1bHQ7XG5cbiAgICBwdWJsaWMgcmVzdWx0R2VvbWV0cnk6IEwuR2VvSlNPTjtcblxuICAgIHB1YmxpYyBzZWFyY2hUZXJtOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZ2Vvc2VhcmNoOiBHZW9TZWFyY2hcbiAgICApIHsgfVxuXG4gICAgcHVibGljIHRyaWdnZXJTZWFyY2goKSB7XG4gICAgICAgIHRoaXMub25TZWFyY2hUcmlnZ2VyZWQuZW1pdCgpO1xuICAgICAgICB0aGlzLnJlbW92ZU9sZEdlb21ldHJ5KCk7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdlb3NlYXJjaC5zZWFyY2hUZXJtKHRoaXMuc2VhcmNoVGVybSwgdGhpcy5vcHRpb25zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlc3VsdENoYW5nZWQuZW1pdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0R2VvbWV0cnkgPSBMLmdlb0pTT04ocmVzdWx0Lmdlb21ldHJ5KS5hZGRUbyh0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLmZpdEJvdW5kcyhyZXN1bHQuYm91bmRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkuZml0Qm91bmRzKHRoaXMucmVzdWx0R2VvbWV0cnkuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuc2VhcmNoVGVybSA9ICdlcnJvciBvY2N1cnJlZCcsXG4gICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLmxvYWRpbmcgPSBmYWxzZTsgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIHRoaXMub25SZXN1bHRDaGFuZ2VkLmVtaXQobnVsbCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT2xkR2VvbWV0cnkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU9sZEdlb21ldHJ5KCkge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRHZW9tZXRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRHZW9tZXRyeS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcblxuY29uc3QgTE9DQVRJT05fRk9VTkRfRVZFTlQgPSAnbG9jYXRpb25mb3VuZCc7XG5jb25zdCBMT0NBVElPTl9FUlJPUiA9ICdsb2NhdGlvbmVycm9yJztcbmNvbnN0IExPQ0FURURfTUFSS0VSX0lEID0gJ2xvY2F0ZWQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYXRlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZVxuICApIHsgfVxuXG4gIHB1YmxpYyBzdGFydExvY2F0ZShpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBDYWNoZS5nZXRNYXAoaWQpO1xuICAgIG1hcC5vbihMT0NBVElPTl9GT1VORF9FVkVOVCwgKGV2dDogTC5Mb2NhdGlvbkV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcihtYXApO1xuICAgICAgY29uc3QgbWFya2VyID0gTC5tYXJrZXIoZXZ0LmxhdGxuZykuYWRkVG8obWFwKTtcbiAgICAgIG1hcmtlci5vcHRpb25zLnRpdGxlID0gTE9DQVRFRF9NQVJLRVJfSUQ7XG4gICAgfSk7XG4gICAgbWFwLm9uKExPQ0FUSU9OX0VSUk9SLCAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuICAgIG1hcC5sb2NhdGUoe1xuICAgICAgd2F0Y2g6IHRydWUsXG4gICAgICBzZXRWaWV3OiB0cnVlLFxuICAgICAgdGltZW91dDogMzAwMDBcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wTG9jYXRlKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcENhY2hlLmdldE1hcChpZCk7XG4gICAgbWFwLnN0b3BMb2NhdGUoKTtcbiAgICBtYXAub2ZmKExPQ0FUSU9OX0ZPVU5EX0VWRU5UKTtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcihtYXApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVNYXJrZXIobWFwOiBMLk1hcCkge1xuICAgIG1hcC5lYWNoTGF5ZXIoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMLk1hcmtlciAmJiBlbnRyeS5vcHRpb25zLnRpdGxlID09PSBMT0NBVEVEX01BUktFUl9JRCkge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIoZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTG9jYXRlU2VydmljZSB9IGZyb20gJy4vbG9jYXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1sb2NhdGUtY29udHJvbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwLXZlcnRpY2FsIGJ0bi1ncm91cC1zbSBtYXAtY29udHJvbFwiPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc21cIiAoY2xpY2spPVwibG9jYXRlVXNlcigpXCIgW25nQ2xhc3NdPVwiaXNUb2dnbGVkID8gJ2J0bi1wcmltYXJ5JzogJ2J0bi1saWdodCdcIj5cbiAgICBsb2NhdGVcbiAgPC9idXR0b24+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IGl7d2lkdGg6MTFweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhdGVDb250cm9sQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1hcElkOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgaXNUb2dnbGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGxvY2F0ZVNlcnZpY2U6IExvY2F0ZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIGxvY2F0ZVVzZXIoKSB7XG4gICAgICAgIHRoaXMuaXNUb2dnbGVkID0gIXRoaXMuaXNUb2dnbGVkO1xuICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRlU2VydmljZS5zdGFydExvY2F0ZSh0aGlzLm1hcElkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRlU2VydmljZS5zdG9wTG9jYXRlKHRoaXMubWFwSWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItem9vbS1jb250cm9sJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwLXZlcnRpY2FsIG1hcC1jb250cm9sXCI+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodCBidG4tc21cIiAoY2xpY2spPVwiem9vbUluKClcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHQgYnRuLXNtXCIgKGNsaWNrKT1cInpvb21PdXQoKVwiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEtbWludXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFpvb21Db250cm9sQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbWFwSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlXG4gICkgeyB9XG5cbiAgcHVibGljIHpvb21JbigpIHtcbiAgICB0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKS56b29tSW4oKTtcbiAgfVxuXG4gIHB1YmxpYyB6b29tT3V0KCkge1xuICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLnpvb21PdXQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRNYXBNb2R1bGUgfSBmcm9tICcuLi9iYXNlL21hcC5tb2R1bGUnO1xuaW1wb3J0IHsgRXh0ZW50Q29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW50L2V4dGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vvc2VhcmNoQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZ2Vvc2VhcmNoL2dlb3NlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9jYXRlQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vbG9jYXRlL2xvY2F0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9jYXRlU2VydmljZSB9IGZyb20gJy4vbG9jYXRlL2xvY2F0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFpvb21Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi96b29tL3pvb20uY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgTG9jYXRlQ29udHJvbENvbXBvbmVudCxcbiAgWm9vbUNvbnRyb2xDb21wb25lbnQsXG4gIEdlb3NlYXJjaENvbnRyb2xDb21wb25lbnQsXG4gIEV4dGVudENvbnRyb2xDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgIEhlbGdvbGFuZE1hcE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBMb2NhdGVTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTWFwQ29udHJvbE1vZHVsZSB7IH1cbiIsImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIYXNMb2FkYWJsZUNvbnRlbnQsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBDYWNoZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2NhY2hlZC1tYXAtY29tcG9uZW50JztcbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJTZWxlY3RvckdlbmVyYXRvciB9IGZyb20gJy4vbW9kZWwvbWFya2VyLXNlbGVjdG9yLWdlbmVyYXRvcic7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXBTZWxlY3RvckNvbXBvbmVudDxUPlxuICAgIGV4dGVuZHMgQ2FjaGVkTWFwQ29tcG9uZW50XG4gICAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEhhc0xvYWRhYmxlQ29udGVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAaW5wdXQgVGhlIHNlcnZpY2VVcmwsIHdoZXJlIHRoZSBzZWxlY3Rpb24gc2hvdWxkIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXJ2aWNlVXJsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAaW5wdXQgVGhlIGZpbHRlciB3aGljaCBzaG91bGQgYmUgdXNlZCwgd2hpbGUgZmV0Y2hpbmcgdGhlIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGF2b2lkWm9vbVRvU2VsZWN0aW9uOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWFya2VyU2VsZWN0b3JHZW5lcmF0b3I6IE1hcmtlclNlbGVjdG9yR2VuZXJhdG9yO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbnRlbnRMb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAaW5wdXQgQWRkaXRpb25hbCBjb25maWd1cmF0aW9uIGZvciB0aGUgbWFya2VyIHpvb21pbmcgKGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNmaXRib3VuZHMtb3B0aW9ucylcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaXRCb3VuZHNNYXJrZXJPcHRpb25zOiBMLkZpdEJvdW5kc09wdGlvbnM7XG5cbiAgICBwdWJsaWMgaXNDb250ZW50TG9hZGluZzogKGxvYWRpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Ob1Jlc3VsdHNGb3VuZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3R2VvbWV0cmllcygpO1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5zZXJ2aWNlVXJsIHx8IGNoYW5nZXMuZmlsdGVyIHx8IGNoYW5nZXMuY2x1c3Rlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0dlb21ldHJpZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIHRoZSBnZW9tZXRyaWVzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIE1hcFNlbGVjdG9yQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGRyYXdHZW9tZXRyaWVzKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBab29tcyB0byB0aGUgZ2l2ZW4gYm91bmRzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHBhcmFtIGJvdW5kcyB3aGVyZSB0byB6b29tXG4gICAgICogQG1lbWJlcm9mIE1hcFNlbGVjdG9yQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJvdGVjdGVkIHpvb21Ub01hcmtlckJvdW5kcyhib3VuZHM6IEwuTGF0TG5nQm91bmRzRXhwcmVzc2lvbikge1xuICAgICAgICBpZiAoIXRoaXMuYXZvaWRab29tVG9TZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyhib3VuZHMsIHRoaXMuZml0Qm91bmRzTWFya2VyT3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgZW51bSBMYXN0VmFsdWVQcmVzZW50YXRpb24ge1xuICAvKipcbiAgICogY29sb3JpemVkIGNpcmNsZSBkZXBlbmRpbmcgb24gc3RhdHVzIGludGVydmFsc1xuICAgKi9cbiAgQ29sb3JpemVkLFxuICAvKipcbiAgICogdGV4dHVhbCBwcmVzZW50YXRpb24gb2YgdGhlIGxhc3QgdmFsdWUsIGRvbmUgd2l0aCBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvclxuICAgKi9cbiAgVGV4dHVhbFxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3Ige1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGljb24gbGFiZWwgYmFzZWQgb24gYSBnaXZlbiB0aW1lc2VyaWVzLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGNyZWF0ZUljb25MYWJlbCh0czogVGltZXNlcmllcyk7XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBLZXlWYWx1ZURpZmZlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gIEhhc0xvYWRhYmxlQ29udGVudCxcbiAgTWl4aW4sXG4gIFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlLFxuICBUaW1lc2VyaWVzLFxuICBUaW1lc2VyaWVzRXh0cmFzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgY2lyY2xlTWFya2VyLCBmZWF0dXJlR3JvdXAsIGdlb0pTT04sIExheWVyLCBtYXJrZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IsIExhc3RWYWx1ZVByZXNlbnRhdGlvbiB9IGZyb20gJy4uL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLmludGVyZmFjZSc7XG5cbi8qKlxuICogRGlzcGxheXMgc2VsZWN0YWJsZSBzZXJpZXMgd2l0aCB0aGVpciBsYXN0IHZhbHVlcyBvbiBhbiBtYXAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1sYXN0LXZhbHVlLW1hcC1zZWxlY3RvcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC13cmFwcGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gIDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5tYXAtdmlld2Vye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Omhvc3QgLm1hcC1ub3RpZmllcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjEwcHg7ei1pbmRleDoxMDAxO3dpZHRoOjEyMHB4O2hlaWdodDo3MHB4O3BhZGRpbmc6NXB4O29wYWNpdHk6Ljg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgTGFzdFZhbHVlTWFwU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxUaW1lc2VyaWVzPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBpbnRlcm5hbCBzZXJpZXMgSURzLCB3aGljaCBzaG91bGQgYmUgcHJlc2VudGVkIHdpdGggdGhlaXIgbGFzdCB2YWx1ZXMgb24gdGhlIG1hcC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBsYXN0VmFsdWVTZXJpZXNJRHM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBQcmVzZW50YXRpb24gdHlwZSBob3cgdG8gZGlzcGxheSB0aGUgc2VyaWVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGxhc3RWYWx1ZVByZXNlbnRhdGlvbjogTGFzdFZhbHVlUHJlc2VudGF0aW9uID0gTGFzdFZhbHVlUHJlc2VudGF0aW9uLkNvbG9yaXplZDtcblxuICAvKipcbiAgICogSWdub3JlcyBhbGwgU3RhdHVzaW50ZXJ2YWxzIHdoZXJlIHRoZSB0aW1lc3RhbXAgaXMgYmVmb3JlIGEgZ2l2ZW4gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIGFuZCBkcmF3cyBpbnN0ZWFkIHRoZSBkZWZhdWx0IG1hcmtlci5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpZ25vcmVTdGF0dXNJbnRlcnZhbElmQmVmb3JlRHVyYXRpb24gPSBJbmZpbml0eTtcblxuICBwcml2YXRlIG1hcmtlckZlYXR1cmVHcm91cDogTC5GZWF0dXJlR3JvdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgbGFzdFZhbHVlTGFiZWxHZW5lcmF0b3I6IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLFxuICAgIHByb3RlY3RlZCBzdGF0dXNJbnRlcnZhbFJlc29sdmVyOiBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZVxuICApIHtcbiAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycywgY2QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCk6IHZvaWQge1xuICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTtcbiAgICBpZiAodGhpcy5sYXN0VmFsdWVTZXJpZXNJRHMgJiYgdGhpcy5sYXN0VmFsdWVTZXJpZXNJRHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNyZWF0ZU1hcmtlcnNCeVNlcmllc0lEcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFya2Vyc0J5U2VyaWVzSURzKCkge1xuICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gZmVhdHVyZUdyb3VwKCk7XG4gICAgY29uc3Qgb2JzTGlzdDogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuICAgIHRoaXMubGFzdFZhbHVlU2VyaWVzSURzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgY29uc3QgdHNPYnMgPSB0aGlzLmFwaUludGVyZmFjZS5nZXRTaW5nbGVUaW1lc2VyaWVzQnlJbnRlcm5hbElkKGVudHJ5KTtcbiAgICAgIG9ic0xpc3QucHVzaCh0c09icy5waXBlKHN3aXRjaE1hcCh2YWwgPT4gdGhpcy5jcmVhdGVNYXJrZXIodmFsKS5waXBlKHRhcChyZXMgPT4ge1xuICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihyZXMpO1xuICAgICAgICByZXMub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5vblNlbGVjdGVkLmVtaXQodmFsKSk7XG4gICAgICB9KSkpKSk7XG4gICAgfSk7XG4gICAgdGhpcy5maW5hbGl6ZU1hcmtlck9ic2VydmFibGVzKG9ic0xpc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXIodHM6IFRpbWVzZXJpZXMpIHtcbiAgICBzd2l0Y2ggKHRoaXMubGFzdFZhbHVlUHJlc2VudGF0aW9uKSB7XG4gICAgICBjYXNlIExhc3RWYWx1ZVByZXNlbnRhdGlvbi5Db2xvcml6ZWQ6XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbG9yaXplZE1hcmtlcih0cyk7XG4gICAgICBjYXNlIExhc3RWYWx1ZVByZXNlbnRhdGlvbi5UZXh0dWFsOlxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVMYWJlbGVkTWFya2VyKHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29sb3JpemVkTWFya2VyKHRzKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluYWxpemVNYXJrZXJPYnNlcnZhYmxlcyhvYnNMaXN0OiBPYnNlcnZhYmxlPGFueT5bXSkge1xuICAgIGZvcmtKb2luKG9ic0xpc3QpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZG8gem9vbSB0byBib3VuZHMnKTtcbiAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICBjb25zdCBib3VuZHMgPSB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5nZXRCb3VuZHMoKTtcbiAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRUbyh0aGlzLm1hcCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb2xvcml6ZWRNYXJrZXIodHM6IFRpbWVzZXJpZXMpOiBPYnNlcnZhYmxlPExheWVyPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPExheWVyPigob2JzZXJ2ZXI6IE9ic2VydmVyPExheWVyPikgPT4ge1xuICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0VGltZXNlcmllc0V4dHJhcyh0cy5pZCwgdHMudXJsKS5zdWJzY3JpYmUoKGV4dHJhczogVGltZXNlcmllc0V4dHJhcykgPT4ge1xuICAgICAgICBsZXQgY29sb3JlZE1hcmtlcjtcbiAgICAgICAgaWYgKGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpIHtcbiAgICAgICAgICBpZiAoKHRzLmxhc3RWYWx1ZS50aW1lc3RhbXApID4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmlnbm9yZVN0YXR1c0ludGVydmFsSWZCZWZvcmVEdXJhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnN0YXR1c0ludGVydmFsUmVzb2x2ZXIuZ2V0TWF0Y2hpbmdJbnRlcnZhbCh0cy5sYXN0VmFsdWUudmFsdWUsIGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpO1xuICAgICAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgICAgIGNvbG9yZWRNYXJrZXIgPSB0aGlzLmNyZWF0ZUNvbG9yZWRNYXJrZXIodHMsIGludGVydmFsLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb2xvcmVkTWFya2VyKSB7XG4gICAgICAgICAgY29sb3JlZE1hcmtlciA9IHRoaXMuY3JlYXRlRGVmYXVsdENvbG9yZWRNYXJrZXIodHMpO1xuICAgICAgICB9XG4gICAgICAgIG9ic2VydmVyLm5leHQoY29sb3JlZE1hcmtlcik7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29sb3JlZE1hcmtlcih0czogVGltZXNlcmllcywgY29sb3I6IHN0cmluZyk6IExheWVyIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWxsZWRNYXJrZXIodHMsIGNvbG9yLCAxMCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURlZmF1bHRDb2xvcmVkTWFya2VyKHRzOiBUaW1lc2VyaWVzKTogTGF5ZXIge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcih0cywgJyMwMDAnLCAxMCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZpbGxlZE1hcmtlcih0czogVGltZXNlcmllcywgY29sb3I6IHN0cmluZywgcmFkaXVzOiBudW1iZXIpOiBMYXllciB7XG4gICAgbGV0IGdlb21ldHJ5OiBMYXllcjtcbiAgICBpZiAodHMuc3RhdGlvbi5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICBjb25zdCBwb2ludCA9IHRzLnN0YXRpb24uZ2VvbWV0cnkgYXMgR2VvSlNPTi5Qb2ludDtcbiAgICAgIGdlb21ldHJ5ID0gY2lyY2xlTWFya2VyKFtwb2ludC5jb29yZGluYXRlc1sxXSwgcG9pbnQuY29vcmRpbmF0ZXNbMF1dLCB7XG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgIGZpbGxDb2xvcjogY29sb3IsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgIHJhZGl1czogMTAsXG4gICAgICAgIHdlaWdodDogMlxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlb21ldHJ5ID0gZ2VvSlNPTih0cy5zdGF0aW9uLmdlb21ldHJ5LCB7XG4gICAgICAgIHN0eWxlOiAoZmVhdHVyZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICB3ZWlnaHQ6IDJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICBnZW9tZXRyeS5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0cykpO1xuICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGFiZWxlZE1hcmtlcih0czogVGltZXNlcmllcyk6IE9ic2VydmFibGU8TGF5ZXI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TGF5ZXI+KG9ic2VydmVyID0+IHtcbiAgICAgIGNvbnN0IGljb24gPSB0aGlzLmxhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLmNyZWF0ZUljb25MYWJlbCh0cyk7XG4gICAgICBpZiAodHMuc3RhdGlvbi5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ID0gdHMuc3RhdGlvbi5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50O1xuICAgICAgICBvYnNlcnZlci5uZXh0KG1hcmtlcihbcG9pbnQuY29vcmRpbmF0ZXNbMV0sIHBvaW50LmNvb3JkaW5hdGVzWzBdXSwgeyBpY29uIH0pKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgJ2xlYWZsZXQubWFya2VyY2x1c3Rlcic7XG5cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBLZXlWYWx1ZURpZmZlcnMsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgSGFzTG9hZGFibGVDb250ZW50LCBNaXhpbiwgUGxhdGZvcm0gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXBsYXRmb3JtLW1hcC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLXdyYXBwZXJcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cbiAgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZX06aG9zdCAubWFwLXZpZXdlcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfTpob3N0IC5tYXAtbm90aWZpZXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjEwcHg7bGVmdDoxMHB4O3otaW5kZXg6MTAwMTt3aWR0aDoxMjBweDtoZWlnaHQ6NzBweDtwYWRkaW5nOjVweDtvcGFjaXR5Oi44O3RleHQtYWxpZ246Y2VudGVyfWBdXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWFwU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxQbGF0Zm9ybT4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2x1c3RlcjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgbWFya2VyRmVhdHVyZUdyb3VwOiBMLkZlYXR1cmVHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCkge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCkgeyB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLm1hcmtlckZlYXR1cmVHcm91cCk7IH1cbiAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0UGxhdGZvcm1zKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2x1c3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IGFuaW1hdGU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCA9IEwuZmVhdHVyZUdyb3VwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXIgPSBMLm1hcmtlcihbZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZExheWVyKG1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob1Jlc3VsdHNGb3VuZC5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmludmFsaWRhdGVTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciB9IGZyb20gJy4vbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZSBleHRlbmRzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUljb25MYWJlbCh0czogVGltZXNlcmllcykge1xuICAgIGNvbnN0IGRhdGUgPSBtb21lbnQodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkuZnJvbU5vdygpO1xuICAgIHJldHVybiBMLmRpdkljb24oe1xuICAgICAgY2xhc3NOYW1lOiAnbGFzdC12YWx1ZS1jb250YWluZXInLFxuICAgICAgaHRtbDogYDxzcGFuIGNsYXNzPVwibGFzdC12YWx1ZS1sYWJlbFwiPiR7dHMubGFzdFZhbHVlLnZhbHVlfSZuYnNwOyR7dHMudW9tfTwvc3Bhbj48YnI+PHNwYW4gY2xhc3M9XCJsYXN0LXZhbHVlLWRhdGVcIj4ke2RhdGV9PC9zcGFuPmBcbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgJ2xlYWZsZXQubWFya2VyY2x1c3Rlcic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZm9ya0pvaW4nO1xuXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgSGFzTG9hZGFibGVDb250ZW50LFxuICAgIE1peGluLFxuICAgIFBhcmFtZXRlckZpbHRlcixcbiAgICBTdGF0aW9uLFxuICAgIFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlLFxuICAgIFRpbWVzZXJpZXMsXG4gICAgVGltZXNlcmllc0V4dHJhcyxcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCBHZW9KU09OIGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1zdGF0aW9uLW1hcC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLXdyYXBwZXJcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cbiAgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtwb3NpdGlvbjpyZWxhdGl2ZX06aG9zdCAubWFwLXZpZXdlcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfTpob3N0IC5tYXAtbm90aWZpZXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjEwcHg7bGVmdDoxMHB4O3otaW5kZXg6MTAwMTt3aWR0aDoxMjBweDtoZWlnaHQ6NzBweDtwYWRkaW5nOjVweDtvcGFjaXR5Oi44O3RleHQtYWxpZ246Y2VudGVyfWBdXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIFN0YXRpb25NYXBTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFN0YXRpb24+IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNsdXN0ZXI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzdGF0dXNJbnRlcnZhbHM6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBJZ25vcmVzIGFsbCBTdGF0dXNpbnRlcnZhbHMgd2hlcmUgdGhlIHRpbWVzdGFtcCBpcyBiZWZvcmUgYSBnaXZlbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgYW5kIGRyYXdzIGluc3RlYWQgdGhlIGRlZmF1bHQgbWFya2VyLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlnbm9yZVN0YXR1c0ludGVydmFsSWZCZWZvcmVEdXJhdGlvbiA9IEluZmluaXR5O1xuXG4gICAgcHJpdmF0ZSBtYXJrZXJGZWF0dXJlR3JvdXA6IEwuRmVhdHVyZUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzdGF0dXNJbnRlcnZhbFJlc29sdmVyOiBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycywgY2QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAodGhpcy5tYXAgJiYgY2hhbmdlcy5zdGF0dXNJbnRlcnZhbHMpIHsgdGhpcy5kcmF3R2VvbWV0cmllcygpOyB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCkge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCkgeyB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLm1hcmtlckZlYXR1cmVHcm91cCk7IH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzSW50ZXJ2YWxzICYmIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnBoZW5vbWVub24pIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmFsdWVkTWFya2VycygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGF0aW9uR2VvbWV0cmllcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVWYWx1ZWRNYXJrZXJzKCkge1xuICAgICAgICBjb25zdCB0ZW1wRmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7XG4gICAgICAgICAgICBwaGVub21lbm9uOiB0aGlzLmZpbHRlci5waGVub21lbm9uLFxuICAgICAgICAgICAgZXhwYW5kZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0VGltZXNlcmllcyh0aGlzLnNlcnZpY2VVcmwsIHRlbXBGaWx0ZXIpLnN1YnNjcmliZSgodGltZXNlcmllczogVGltZXNlcmllc1tdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCA9IEwuZmVhdHVyZUdyb3VwKCk7XG4gICAgICAgICAgICBjb25zdCBvYnNMaXN0OiBBcnJheTxPYnNlcnZhYmxlPFRpbWVzZXJpZXNFeHRyYXM+PiA9IFtdO1xuICAgICAgICAgICAgdGltZXNlcmllcy5mb3JFYWNoKCh0czogVGltZXNlcmllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9icyA9IHRoaXMuYXBpSW50ZXJmYWNlLmdldFRpbWVzZXJpZXNFeHRyYXModHMuaWQsIHRoaXMuc2VydmljZVVybCk7XG4gICAgICAgICAgICAgICAgb2JzTGlzdC5wdXNoKG9icyk7XG4gICAgICAgICAgICAgICAgb2JzLnN1YnNjcmliZSgoZXh0cmFzOiBUaW1lc2VyaWVzRXh0cmFzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXJrZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHRyYXMuc3RhdHVzSW50ZXJ2YWxzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRzLmxhc3RWYWx1ZS50aW1lc3RhbXApID4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmlnbm9yZVN0YXR1c0ludGVydmFsSWZCZWZvcmVEdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGludGVydmFsID0gdGhpcy5zdGF0dXNJbnRlcnZhbFJlc29sdmVyLmdldE1hdGNoaW5nSW50ZXJ2YWwodHMubGFzdFZhbHVlLnZhbHVlLCBleHRyYXMuc3RhdHVzSW50ZXJ2YWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHsgbWFya2VyID0gdGhpcy5jcmVhdGVDb2xvcmVkTWFya2VyKHRzLnN0YXRpb24sIGludGVydmFsLmNvbG9yKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWFya2VyKSB7IG1hcmtlciA9IHRoaXMuY3JlYXRlRGVmYXVsdENvbG9yZWRNYXJrZXIodHMuc3RhdGlvbik7IH1cbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RlZC5lbWl0KHRzLnN0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkTGF5ZXIobWFya2VyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3JrSm9pbihvYnNMaXN0KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXApIHsgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUoKTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWFwKSB7IHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZFRvKHRoaXMubWFwKTsgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvbG9yZWRNYXJrZXIoc3RhdGlvbjogU3RhdGlvbiwgY29sb3I6IHN0cmluZyk6IExheWVyIHtcbiAgICAgICAgaWYgKHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IuY3JlYXRlRmlsbGVkTWFya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVGaWxsZWRNYXJrZXIoc3RhdGlvbiwgY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uLCBjb2xvciwgMTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGVmYXVsdENvbG9yZWRNYXJrZXIoc3RhdGlvbjogU3RhdGlvbik6IExheWVyIHtcbiAgICAgICAgaWYgKHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IuY3JlYXRlRGVmYXVsdEZpbGxlZE1hcmtlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IuY3JlYXRlRGVmYXVsdEZpbGxlZE1hcmtlcihzdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGaWxsZWRNYXJrZXIoc3RhdGlvbiwgJyMwMDAnLCAxMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVGaWxsZWRNYXJrZXIoc3RhdGlvbjogU3RhdGlvbiwgY29sb3I6IHN0cmluZywgcmFkaXVzOiBudW1iZXIpOiBMYXllciB7XG4gICAgICAgIGxldCBnZW9tZXRyeTogTGF5ZXI7XG4gICAgICAgIGlmIChzdGF0aW9uLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gc3RhdGlvbi5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50O1xuICAgICAgICAgICAgZ2VvbWV0cnkgPSBMLmNpcmNsZU1hcmtlcihbcG9pbnQuY29vcmRpbmF0ZXNbMV0sIHBvaW50LmNvb3JkaW5hdGVzWzBdXSwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTogMC44LFxuICAgICAgICAgICAgICAgIHJhZGl1czogMTAsXG4gICAgICAgICAgICAgICAgd2VpZ2h0OiAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdlb21ldHJ5ID0gTC5nZW9KU09OKHN0YXRpb24uZ2VvbWV0cnksIHtcbiAgICAgICAgICAgICAgICBzdHlsZTogKGZlYXR1cmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodDogMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZW9tZXRyeSkge1xuICAgICAgICAgICAgZ2VvbWV0cnkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RlZC5lbWl0KHN0YXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVN0YXRpb25HZW9tZXRyaWVzKCkge1xuICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRTdGF0aW9ucyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2x1c3Rlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCA9IEwubWFya2VyQ2x1c3Rlckdyb3VwKHsgYW5pbWF0ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCA9IEwuZmVhdHVyZUdyb3VwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBBcnJheSAmJiByZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlciA9IHRoaXMuY3JlYXRlRGVmYXVsdEdlb21ldHJ5KGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIpIHsgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkTGF5ZXIobWFya2VyKTsgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkVG8odGhpcy5tYXApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Ub01hcmtlckJvdW5kcyh0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vUmVzdWx0c0ZvdW5kLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmludmFsaWRhdGVTaXplKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGVmYXVsdEdlb21ldHJ5KHN0YXRpb246IFN0YXRpb24pOiBMYXllciB7XG4gICAgICAgIGlmICh0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yICYmIHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IuY3JlYXRlRGVmYXVsdEdlb21ldHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0R2VvbWV0cnkoc3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRpb24uZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gTC5nZW9KU09OKHN0YXRpb24uZ2VvbWV0cnkpO1xuICAgICAgICAgICAgZ2VvbWV0cnkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5vblNlbGVjdGVkLmVtaXQoc3RhdGlvbikpO1xuICAgICAgICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0aW9uLmlkICsgJyBoYXMgbm8gZ2VvbWV0cnknKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcblxuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgSGFzTG9hZGFibGVDb250ZW50LFxuICAgIElEYXRhc2V0LFxuICAgIExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5LFxuICAgIE1peGluLFxuICAgIFRpbWVzcGFuLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFqZWN0b3J5UmVzdWx0IH0gZnJvbSAnLi4vbW9kZWwvdHJhamVjdG9yeS1yZXN1bHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1wcm9maWxlLXRyYWplY3RvcnktbWFwLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtYXAtd3JhcHBlclwiIHN0eWxlPVwiaGVpZ2h0OiAxMDAlO1wiPlxuICA8ZGl2IFthdHRyLmlkXT1cIm1hcElkXCIgY2xhc3M9XCJtYXAtdmlld2VyXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5tYXAtdmlld2Vye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Omhvc3QgLm1hcC1ub3RpZmllcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjEwcHg7ei1pbmRleDoxMDAxO3dpZHRoOjEyMHB4O2hlaWdodDo3MHB4O3BhZGRpbmc6NXB4O29wYWNpdHk6Ljg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZVRyYWplY3RvcnlNYXBTZWxlY3RvckNvbXBvbmVudFxuICAgIGV4dGVuZHMgTWFwU2VsZWN0b3JDb21wb25lbnQ8VHJhamVjdG9yeVJlc3VsdD5cbiAgICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWVzcGFuOiBUaW1lc3BhbjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRpbWVMaXN0RGV0ZXJtaW5lZDogRXZlbnRFbWl0dGVyPG51bWJlcltdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgbGF5ZXI6IEwuRmVhdHVyZUdyb3VwO1xuICAgIHByaXZhdGUgZGF0YTogTG9jYXRlZFByb2ZpbGVEYXRhRW50cnlbXTtcbiAgICBwcml2YXRlIGRhdGFzZXQ6IElEYXRhc2V0O1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0U3R5bGU6IEwuUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgd2VpZ2h0OiA1LFxuICAgICAgICBvcGFjaXR5OiAwLjY1XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGlnaGxpZ2h0U3R5bGU6IEwuUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAnYmx1ZScsXG4gICAgICAgIHdlaWdodDogNyxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycywgY2QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAoY2hhbmdlcy5zZWxlY3RlZFRpbWVzcGFuICYmIHRoaXMuc2VsZWN0ZWRUaW1lc3BhbiAmJiB0aGlzLm1hcCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhck1hcCgpO1xuICAgICAgICAgICAgdGhpcy5pbml0TGF5ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGltZXNwYW4uZnJvbSA8PSBlbnRyeS50aW1lc3RhbXAgJiYgZW50cnkudGltZXN0YW1wIDw9IHRoaXMuc2VsZWN0ZWRUaW1lc3Bhbi50bykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmFkZExheWVyKHRoaXMuY3JlYXRlR2VvSnNvbihlbnRyeSwgdGhpcy5kYXRhc2V0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBkcmF3R2VvbWV0cmllcygpIHtcbiAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKHRydWUpO1xuICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXREYXRhc2V0cyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKS5zdWJzY3JpYmUoKGRhdGFzZXRzKSA9PiB7XG4gICAgICAgICAgICBkYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihkYXRhc2V0LmZpcnN0VmFsdWUudGltZXN0YW1wLCBkYXRhc2V0Lmxhc3RWYWx1ZS50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldERhdGE8TG9jYXRlZFByb2ZpbGVEYXRhRW50cnk+KGRhdGFzZXQuaWQsIHRoaXMuc2VydmljZVVybCwgdGltZXNwYW4pXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcCAmJiBkYXRhLnZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0TGF5ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lbGlzdDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZhbHVlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlb2pzb24gPSB0aGlzLmNyZWF0ZUdlb0pzb24oZW50cnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGlzdC5wdXNoKGVudHJ5LnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkTGF5ZXIoZ2VvanNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblRpbWVMaXN0RGV0ZXJtaW5lZC5lbWl0KHRpbWVsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmFkZFRvKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Ub01hcmtlckJvdW5kcyh0aGlzLmxheWVyLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdExheWVyKCkge1xuICAgICAgICB0aGlzLmxheWVyID0gTC5tYXJrZXJDbHVzdGVyR3JvdXAoeyBhbmltYXRlOiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyTWFwKCkge1xuICAgICAgICBpZiAodGhpcy5tYXAgJiYgdGhpcy5sYXllcikge1xuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5sYXllcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUdlb0pzb24ocHJvZmlsZURhdGFFbnRyeTogTG9jYXRlZFByb2ZpbGVEYXRhRW50cnksIGRhdGFzZXQ6IElEYXRhc2V0KTogTC5HZW9KU09OIHtcbiAgICAgICAgY29uc3QgZ2VvanNvbiA9IG5ldyBMLkdlb0pTT04ocHJvZmlsZURhdGFFbnRyeS5nZW9tZXRyeSk7XG4gICAgICAgIGdlb2pzb24uc2V0U3R5bGUodGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICBnZW9qc29uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBkYXRhc2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IHByb2ZpbGVEYXRhRW50cnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2VvanNvbi5vbignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmhpZ2hsaWdodFN0eWxlKTtcbiAgICAgICAgICAgIGdlb2pzb24uYnJpbmdUb0Zyb250KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZW9qc29uLm9uKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgIGdlb2pzb24uc2V0U3R5bGUodGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdlb2pzb247XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgSGVsZ29sYW5kTWFwTW9kdWxlIH0gZnJvbSAnLi4vYmFzZS9tYXAubW9kdWxlJztcbmltcG9ydCB7IExhc3RWYWx1ZU1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxhdGZvcm1NYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vcGxhdGZvcm0tbWFwLXNlbGVjdG9yL3BsYXRmb3JtLW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IgfSBmcm9tICcuL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGlvbk1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zdGF0aW9uLW1hcC1zZWxlY3Rvci9zdGF0aW9uLW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZmlsZVRyYWplY3RvcnlNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IvdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgICBQbGF0Zm9ybU1hcFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFN0YXRpb25NYXBTZWxlY3RvckNvbXBvbmVudCxcbiAgICBQcm9maWxlVHJhamVjdG9yeU1hcFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIExhc3RWYWx1ZU1hcFNlbGVjdG9yQ29tcG9uZW50XG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlQ29uZmlnIHtcbiAgICBsYXN0VmFsdWVMYWJlbEdlbmVyYXRvclNlcnZpY2U6IFR5cGU8TGFzdFZhbHVlTGFiZWxHZW5lcmF0b3I+O1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDT01QT05FTlRTXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSGVsZ29sYW5kQ29yZU1vZHVsZSxcbiAgICAgICAgSGVsZ29sYW5kTWFwTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENPTVBPTkVOVFNcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLCB1c2VDbGFzczogTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JTZXJ2aWNlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBIZWxnb2xhbmRNYXBTZWxlY3Rvck1vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciwgdXNlQ2xhc3M6IGNvbmZpZyAmJiBjb25maWcubGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JTZXJ2aWNlIHx8IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIm1hcCIsIkwubWFwIiwiTC50aWxlTGF5ZXIiLCJMLmNvbnRyb2wiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkwuZ2VvSlNPTiIsIkwuY2lyY2xlTWFya2VyIiwibWFya2VyIiwiTC5tYXJrZXIiLCJMLk1hcmtlciIsIkNPTVBPTkVOVFMiLCJMLm1hcmtlckNsdXN0ZXJHcm91cCIsIkwuZmVhdHVyZUdyb3VwIiwiTC5kaXZJY29uIiwiTC5HZW9KU09OIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7d0JBTXlDLElBQUksR0FBRyxFQUFlOzs7Ozs7SUFFcEQseUJBQU07Ozs7Y0FBQyxFQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7SUFHMUIseUJBQU07Ozs7O2NBQUMsRUFBVSxFQUFFQSxNQUFVO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRUEsTUFBRyxDQUFDLENBQUM7Ozs7OztJQUd4Qix5QkFBTTs7OztjQUFDLEVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBRzFCLDRCQUFTOzs7O2NBQUMsRUFBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Z0JBbEJ2QyxVQUFVOzttQkFIWDs7Ozs7OztBQ0FBO0FBSUEsSUFBTSxVQUFVLEdBQUcsRUFDbEIsQ0FBQzs7Ozs7Z0JBRUQsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixVQUFVO3FCQUNYO29CQUNELE9BQU8sRUFBRSxFQUNSO29CQUNELE9BQU8sRUFBRTt3QkFDUCxVQUFVO3FC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