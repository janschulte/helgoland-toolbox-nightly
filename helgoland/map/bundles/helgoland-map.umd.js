(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('leaflet'), require('rxjs/add/operator/map'), require('@angular/common/http'), require('@helgoland/core'), require('@angular/common'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('leaflet.markercluster'), require('moment'), require('rxjs/add/observable/forkJoin')) :
    typeof define === 'function' && define.amd ? define('@helgoland/map', ['exports', '@angular/core', 'leaflet', 'rxjs/add/operator/map', '@angular/common/http', '@helgoland/core', '@angular/common', '@angular/forms', 'rxjs', 'rxjs/operators', 'leaflet.markercluster', 'moment', 'rxjs/add/observable/forkJoin'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.map = {}),global.ng.core,null,global.rxjs['add/operator/map'],global.ng.common.http,null,global.ng.common,global.ng.forms,global.rxjs,global.rxjs.operators,null,null));
}(this, (function (exports,core,L,map,http,core$1,common,forms,rxjs,operators,leaflet_markercluster,moment) { 'use strict';

    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MapCache = (function () {
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
            { type: core.Injectable },
        ];
        return MapCache;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPONENTS = [];
    var HelgolandMapModule = (function () {
        function HelgolandMapModule() {
        }
        HelgolandMapModule.decorators = [
            { type: core.NgModule, args: [{
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
    var CachedMapComponent = (function () {
        function CachedMapComponent(mapCache, differs) {
            this.mapCache = mapCache;
            this.differs = differs;
            /**
             * Informs when initialization is done with map id.
             */
            this.mapInitialized = new core.EventEmitter();
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
            mapId: [{ type: core.Input }],
            mapOptions: [{ type: core.Input }],
            fitBounds: [{ type: core.Input }],
            overlayMaps: [{ type: core.Input }],
            baseMaps: [{ type: core.Input }],
            layerControlOptions: [{ type: core.Input }],
            zoomControlOptions: [{ type: core.Input }],
            mapInitialized: [{ type: core.Output }]
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
    var /**
     * @abstract
     */ GeoSearch = (function () {
        function GeoSearch() {
        }
        return GeoSearch;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NominatimGeoSearchService = (function () {
        function NominatimGeoSearchService(http$$1) {
            this.http = http$$1;
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
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var params = new http.HttpParams();
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
                if (options === void 0) {
                    options = {};
                }
                /** @type {?} */
                var params = new http.HttpParams();
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
                    var result = ({
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NominatimGeoSearchService.ctorParameters = function () {
            return [
                { type: core$1.HttpService }
            ];
        };
        return NominatimGeoSearchService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GeoCureGeoJSON = (function (_super) {
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
    }(L.GeoJSON));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GeometryMapViewerComponent = (function (_super) {
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
                var geometry = L.geoJSON(this.zoomTo);
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
                this.highlightGeometry = L.geoJSON(this.highlight, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, _this.highlightStyle);
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
                    var geojson = L.geoJSON(this.geometry, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, _this.defaultStyle);
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
            { type: core.Component, args: [{
                        selector: 'n52-geometry-map-viewer',
                        template: "<div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n",
                        styles: [":host{height:100%;width:100%}:host .map-viewer{height:100%;width:100%}"]
                    },] },
        ];
        /** @nocollapse */
        GeometryMapViewerComponent.ctorParameters = function () {
            return [
                { type: MapCache },
                { type: core.KeyValueDiffers }
            ];
        };
        GeometryMapViewerComponent.propDecorators = {
            highlight: [{ type: core.Input }],
            geometry: [{ type: core.Input }],
            zoomTo: [{ type: core.Input }],
            avoidZoomToGeometry: [{ type: core.Input }]
        };
        return GeometryMapViewerComponent;
    }(CachedMapComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandMapViewModule = (function () {
        function HelgolandMapViewModule() {
        }
        HelgolandMapViewModule.decorators = [
            { type: core.NgModule, args: [{
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
    var ExtentControlComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'n52-extent-control',
                        template: "<div>\n  <button type=\"button\" (click)=\"zoomToExtent()\">zoom to extent</button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        ExtentControlComponent.ctorParameters = function () {
            return [
                { type: MapCache }
            ];
        };
        ExtentControlComponent.propDecorators = {
            mapId: [{ type: core.Input }],
            extent: [{ type: core.Input }]
        };
        return ExtentControlComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GeosearchControlComponent = (function () {
        function GeosearchControlComponent(mapCache, geosearch) {
            this.mapCache = mapCache;
            this.geosearch = geosearch;
            /**
             * Returns the search result.
             */
            this.onResultChanged = new core.EventEmitter();
            /**
             * Informs, when the search is triggered.
             */
            this.onSearchTriggered = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-geosearch-control',
                        template: "<div>\n  <input [(ngModel)]=\"searchTerm\" (keyup.enter)=\"triggerSearch()\">\n  <span *ngIf=\"loading\">loading...</span>\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"clearSearch()\">X</button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        GeosearchControlComponent.ctorParameters = function () {
            return [
                { type: MapCache },
                { type: GeoSearch }
            ];
        };
        GeosearchControlComponent.propDecorators = {
            mapId: [{ type: core.Input }],
            options: [{ type: core.Input }],
            onResultChanged: [{ type: core.Output }],
            onSearchTriggered: [{ type: core.Output }]
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
    var LocateService = (function () {
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
                    var marker = L.marker(evt.latlng).addTo(map$$1);
                    marker.options.title = LOCATED_MARKER_ID;
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
                    if (entry instanceof L.Marker && entry.options.title === LOCATED_MARKER_ID) {
                        map$$1.removeLayer(entry);
                    }
                });
            };
        LocateService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        LocateService.ctorParameters = function () {
            return [
                { type: MapCache }
            ];
        };
        return LocateService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LocateControlComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'n52-locate-control',
                        template: "<div class=\"btn-group-vertical btn-group-sm map-control\">\n  <button type=\"button\" class=\"btn btn-sm\" (click)=\"locateUser()\" [ngClass]=\"isToggled ? 'btn-primary': 'btn-light'\">\n    locate\n  </button>\n</div>\n",
                        styles: [":host i{width:11px}"]
                    },] },
        ];
        /** @nocollapse */
        LocateControlComponent.ctorParameters = function () {
            return [
                { type: LocateService }
            ];
        };
        LocateControlComponent.propDecorators = {
            mapId: [{ type: core.Input }]
        };
        return LocateControlComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ZoomControlComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'n52-zoom-control',
                        template: "<div class=\"btn-group-vertical map-control\">\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"zoomIn()\">\n    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\n  </button>\n  <button type=\"button\" class=\"btn btn-light btn-sm\" (click)=\"zoomOut()\">\n    <i class=\"fa fa-minus\" aria-hidden=\"true\"></i>\n  </button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        ZoomControlComponent.ctorParameters = function () {
            return [
                { type: MapCache }
            ];
        };
        ZoomControlComponent.propDecorators = {
            mapId: [{ type: core.Input }]
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
    var HelgolandMapControlModule = (function () {
        function HelgolandMapControlModule() {
        }
        HelgolandMapControlModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            COMPONENTS$1
                        ],
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            core$1.HelgolandCoreModule,
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
    var MapSelectorComponent = (function (_super) {
        __extends(MapSelectorComponent, _super);
        function MapSelectorComponent(mapCache, differs, cd) {
            var _this = _super.call(this, mapCache, differs) || this;
            _this.mapCache = mapCache;
            _this.differs = differs;
            _this.cd = cd;
            _this.onSelected = new core.EventEmitter();
            _this.onContentLoading = new core.EventEmitter();
            _this.onNoResultsFound = new core.EventEmitter();
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
            serviceUrl: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            avoidZoomToSelection: [{ type: core.Input }],
            markerSelectorGenerator: [{ type: core.Input }],
            onSelected: [{ type: core.Output }],
            onContentLoading: [{ type: core.Output }],
            fitBoundsMarkerOptions: [{ type: core.Input }],
            onNoResultsFound: [{ type: core.Output }]
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
    var /**
     * @abstract
     */ LastValueLabelGenerator = (function () {
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
    var LastValueMapSelectorComponent = (function (_super) {
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
                this.markerFeatureGroup = L.featureGroup();
                /** @type {?} */
                var obsList = [];
                this.lastValueSeriesIDs.forEach(function (entry) {
                    /** @type {?} */
                    var tsObs = _this.apiInterface.getSingleTimeseriesByInternalId(entry);
                    obsList.push(tsObs.pipe(operators.switchMap(function (val) {
                        return _this.createMarker(val).pipe(operators.tap(function (res) {
                            _this.markerFeatureGroup.addLayer(res);
                            res.on('click', function () { return _this.onSelected.emit(val); });
                        }));
                    })));
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
                rxjs.forkJoin(obsList).subscribe(function () {
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
                return new rxjs.Observable(function (observer) {
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
                    var point = (ts.station.geometry);
                    geometry = L.circleMarker([point.coordinates[1], point.coordinates[0]], {
                        color: '#000',
                        fillColor: color,
                        fillOpacity: 0.8,
                        radius: 10,
                        weight: 2
                    });
                }
                else {
                    geometry = L.geoJSON(ts.station.geometry, {
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
                return new rxjs.Observable(function (observer) {
                    /** @type {?} */
                    var icon = _this.lastValueLabelGenerator.createIconLabel(ts);
                    if (ts.station.geometry.type === 'Point') {
                        /** @type {?} */
                        var point = (ts.station.geometry);
                        observer.next(L.marker([point.coordinates[1], point.coordinates[0]], { icon: icon }));
                        observer.complete();
                    }
                });
            };
        LastValueMapSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-last-value-map-selector',
                        template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                        styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                    },] },
        ];
        /** @nocollapse */
        LastValueMapSelectorComponent.ctorParameters = function () {
            return [
                { type: MapCache },
                { type: core.KeyValueDiffers },
                { type: core.ChangeDetectorRef },
                { type: core$1.DatasetApiInterface },
                { type: LastValueLabelGenerator },
                { type: core$1.StatusIntervalResolverService }
            ];
        };
        LastValueMapSelectorComponent.propDecorators = {
            lastValueSeriesIDs: [{ type: core.Input }],
            lastValuePresentation: [{ type: core.Input }],
            ignoreStatusIntervalIfBeforeDuration: [{ type: core.Input }]
        };
        /**
         * Displays selectable series with their last values on an map.
         */
        LastValueMapSelectorComponent = __decorate([
            core$1.Mixin([core$1.HasLoadableContent]),
            __metadata("design:paramtypes", [MapCache,
                core.KeyValueDiffers,
                core.ChangeDetectorRef,
                core$1.DatasetApiInterface,
                LastValueLabelGenerator,
                core$1.StatusIntervalResolverService])
        ], LastValueMapSelectorComponent);
        return LastValueMapSelectorComponent;
    }(MapSelectorComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PlatformMapSelectorComponent = (function (_super) {
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
                            _this.markerFeatureGroup = L.markerClusterGroup({ animate: true });
                        }
                        else {
                            _this.markerFeatureGroup = L.featureGroup();
                        }
                        if (res instanceof Array && res.length > 0) {
                            res.forEach(function (entry) {
                                /** @type {?} */
                                var marker = L.marker([entry.geometry.coordinates[1], entry.geometry.coordinates[0]]);
                                marker.on('click', function () {
                                    _this.onSelected.emit(entry);
                                });
                                _this.markerFeatureGroup.addLayer(marker);
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
            { type: core.Component, args: [{
                        selector: 'n52-platform-map-selector',
                        template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                        styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                    },] },
        ];
        /** @nocollapse */
        PlatformMapSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: MapCache },
                { type: core.ChangeDetectorRef },
                { type: core.KeyValueDiffers }
            ];
        };
        PlatformMapSelectorComponent.propDecorators = {
            cluster: [{ type: core.Input }]
        };
        PlatformMapSelectorComponent = __decorate([
            core$1.Mixin([core$1.HasLoadableContent]),
            __metadata("design:paramtypes", [core$1.DatasetApiInterface,
                MapCache,
                core.ChangeDetectorRef,
                core.KeyValueDiffers])
        ], PlatformMapSelectorComponent);
        return PlatformMapSelectorComponent;
    }(MapSelectorComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LastValueLabelGeneratorService = (function (_super) {
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
                return L.divIcon({
                    className: 'last-value-container',
                    html: "<span class=\"last-value-label\">" + ts.lastValue.value + "&nbsp;" + ts.uom + "</span><br><span class=\"last-value-date\">" + date + "</span>"
                });
            };
        LastValueLabelGeneratorService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        LastValueLabelGeneratorService.ctorParameters = function () { return []; };
        return LastValueLabelGeneratorService;
    }(LastValueLabelGenerator));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StationMapSelectorComponent = (function (_super) {
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
                    _this.markerFeatureGroup = L.featureGroup();
                    /** @type {?} */
                    var obsList = [];
                    timeseries.forEach(function (ts) {
                        /** @type {?} */
                        var obs = _this.apiInterface.getTimeseriesExtras(ts.id, _this.serviceUrl);
                        obsList.push(obs);
                        obs.subscribe(function (extras) {
                            /** @type {?} */
                            var marker;
                            if (extras.statusIntervals) {
                                if ((ts.lastValue.timestamp) > new Date().getTime() - _this.ignoreStatusIntervalIfBeforeDuration) {
                                    /** @type {?} */
                                    var interval = _this.statusIntervalResolver.getMatchingInterval(ts.lastValue.value, extras.statusIntervals);
                                    if (interval) {
                                        marker = _this.createColoredMarker(ts.station, interval.color);
                                    }
                                }
                            }
                            if (!marker) {
                                marker = _this.createDefaultColoredMarker(ts.station);
                            }
                            marker.on('click', function () {
                                _this.onSelected.emit(ts.station);
                            });
                            _this.markerFeatureGroup.addLayer(marker);
                        });
                    });
                    rxjs.forkJoin(obsList).subscribe(function () {
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
                    var point = (station.geometry);
                    geometry = L.circleMarker([point.coordinates[1], point.coordinates[0]], {
                        color: '#000',
                        fillColor: color,
                        fillOpacity: 0.8,
                        radius: 10,
                        weight: 2
                    });
                }
                else {
                    geometry = L.geoJSON(station.geometry, {
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
                        _this.markerFeatureGroup = L.markerClusterGroup({ animate: true });
                    }
                    else {
                        _this.markerFeatureGroup = L.featureGroup();
                    }
                    if (res instanceof Array && res.length > 0) {
                        res.forEach(function (entry) {
                            /** @type {?} */
                            var marker = _this.createDefaultGeometry(entry);
                            if (marker) {
                                _this.markerFeatureGroup.addLayer(marker);
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
                    var geometry = L.geoJSON(station.geometry);
                    geometry.on('click', function () { return _this.onSelected.emit(station); });
                    return geometry;
                }
                else {
                    console.error(station.id + ' has no geometry');
                }
            };
        StationMapSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-station-map-selector',
                        template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                        styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                    },] },
        ];
        /** @nocollapse */
        StationMapSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.StatusIntervalResolverService },
                { type: core$1.DatasetApiInterface },
                { type: MapCache },
                { type: core.KeyValueDiffers },
                { type: core.ChangeDetectorRef }
            ];
        };
        StationMapSelectorComponent.propDecorators = {
            cluster: [{ type: core.Input }],
            statusIntervals: [{ type: core.Input }],
            ignoreStatusIntervalIfBeforeDuration: [{ type: core.Input }]
        };
        StationMapSelectorComponent = __decorate([
            core$1.Mixin([core$1.HasLoadableContent]),
            __metadata("design:paramtypes", [core$1.StatusIntervalResolverService,
                core$1.DatasetApiInterface,
                MapCache,
                core.KeyValueDiffers,
                core.ChangeDetectorRef])
        ], StationMapSelectorComponent);
        return StationMapSelectorComponent;
    }(MapSelectorComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProfileTrajectoryMapSelectorComponent = (function (_super) {
        __extends(ProfileTrajectoryMapSelectorComponent, _super);
        function ProfileTrajectoryMapSelectorComponent(apiInterface, mapCache, differs, cd) {
            var _this = _super.call(this, mapCache, differs, cd) || this;
            _this.apiInterface = apiInterface;
            _this.mapCache = mapCache;
            _this.differs = differs;
            _this.cd = cd;
            _this.onTimeListDetermined = new core.EventEmitter();
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
                        var timespan = new core$1.Timespan(dataset.firstValue.timestamp, dataset.lastValue.timestamp);
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
                this.layer = L.markerClusterGroup({ animate: false });
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
                var geojson = new L.GeoJSON(profileDataEntry.geometry);
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
            { type: core.Component, args: [{
                        selector: 'n52-profile-trajectory-map-selector',
                        template: "<div class=\"map-wrapper\" style=\"height: 100%;\">\n  <div [attr.id]=\"mapId\" class=\"map-viewer\"></div>\n</div>\n",
                        styles: [":host{position:relative}:host .map-viewer{width:100%;height:100%}:host .map-notifier{position:absolute;bottom:10px;left:10px;z-index:1001;width:120px;height:70px;padding:5px;opacity:.8;text-align:center}"]
                    },] },
        ];
        /** @nocollapse */
        ProfileTrajectoryMapSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: MapCache },
                { type: core.KeyValueDiffers },
                { type: core.ChangeDetectorRef }
            ];
        };
        ProfileTrajectoryMapSelectorComponent.propDecorators = {
            selectedTimespan: [{ type: core.Input }],
            onTimeListDetermined: [{ type: core.Output }]
        };
        ProfileTrajectoryMapSelectorComponent = __decorate([
            core$1.Mixin([core$1.HasLoadableContent]),
            __metadata("design:paramtypes", [core$1.DatasetApiInterface,
                MapCache,
                core.KeyValueDiffers,
                core.ChangeDetectorRef])
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
    var HelgolandMapSelectorModule = (function () {
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
            { type: core.NgModule, args: [{
                        declarations: [
                            COMPONENTS$2
                        ],
                        imports: [
                            common.CommonModule,
                            core$1.HelgolandCoreModule,
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

    exports.HelgolandMapModule = HelgolandMapModule;
    exports.MapCache = MapCache;
    exports.CachedMapComponent = CachedMapComponent;
    exports.GeoSearch = GeoSearch;
    exports.NominatimGeoSearchService = NominatimGeoSearchService;
    exports.GeoCureGeoJSON = GeoCureGeoJSON;
    exports.HelgolandMapViewModule = HelgolandMapViewModule;
    exports.GeometryMapViewerComponent = GeometryMapViewerComponent;
    exports.HelgolandMapControlModule = HelgolandMapControlModule;
    exports.ExtentControlComponent = ExtentControlComponent;
    exports.GeosearchControlComponent = GeosearchControlComponent;
    exports.LocateControlComponent = LocateControlComponent;
    exports.LocateService = LocateService;
    exports.ZoomControlComponent = ZoomControlComponent;
    exports.HelgolandMapSelectorModule = HelgolandMapSelectorModule;
    exports.MapSelectorComponent = MapSelectorComponent;
    exports.PlatformMapSelectorComponent = PlatformMapSelectorComponent;
    exports.StationMapSelectorComponent = StationMapSelectorComponent;
    exports.LastValueMapSelectorComponent = LastValueMapSelectorComponent;
    exports.ProfileTrajectoryMapSelectorComponent = ProfileTrajectoryMapSelectorComponent;
    exports.LastValueLabelGeneratorService = LastValueLabelGeneratorService;
    exports.LastValueLabelGenerator = LastValueLabelGenerator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLW1hcC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL21hcC9saWIvYmFzZS9tYXAubW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL21hcC9saWIvYmFzZS9jYWNoZWQtbWFwLWNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2Jhc2UvZ2Vvc2VhcmNoL2dlb3NlYXJjaC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2Jhc2UvZ2Vvc2VhcmNoL25vbWluYXRpbS5zZXJ2aWNlLnRzIixudWxsLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9iYXNlL2dlb2N1cmUvZ2VvY3VyZS1sYXllci50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3ZpZXcvZ2VvbWV0cnktbWFwLXZpZXdlci9nZW9tZXRyeS1tYXAtdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3ZpZXcvbW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL21hcC9saWIvY29udHJvbC9leHRlbnQvZXh0ZW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2NvbnRyb2wvZ2Vvc2VhcmNoL2dlb3NlYXJjaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9jb250cm9sL2xvY2F0ZS9sb2NhdGUuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL2NvbnRyb2wvbG9jYXRlL2xvY2F0ZS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9jb250cm9sL3pvb20vem9vbS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9jb250cm9sL21vZHVsZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3NlbGVjdG9yL21hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9zZXJ2aWNlcy9sYXN0LXZhbHVlLWxhYmVsLWdlbmVyYXRvci5pbnRlcmZhY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9wbGF0Zm9ybS1tYXAtc2VsZWN0b3IvcGxhdGZvcm0tbWFwLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tYXAvbGliL3NlbGVjdG9yL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9zdGF0aW9uLW1hcC1zZWxlY3Rvci9zdGF0aW9uLW1hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci90cmFqZWN0b3J5LW1hcC1zZWxlY3Rvci90cmFqZWN0b3J5LW1hcC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvbWFwL2xpYi9zZWxlY3Rvci9tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcENhY2hlIHtcblxuICAgIHByaXZhdGUgbWFwQ2FjaGU6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgcHVibGljIGdldE1hcChpZDogc3RyaW5nKTogTC5NYXAge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBDYWNoZS5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXAoaWQ6IHN0cmluZywgbWFwOiBMLk1hcCkge1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldChpZCwgbWFwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWFwKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwQ2FjaGUuZGVsZXRlKGlkKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi9tYXAtY2FjaGUuc2VydmljZSc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTWFwQ2FjaGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRNYXBNb2R1bGUgeyB9XG4iLCJpbXBvcnQge1xuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVyLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4vbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9tYXAtb3B0aW9ucyc7XG5cbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9OQU1FID0gJ0Jhc2VMYXllcic7XG5jb25zdCBERUZBVUxUX0JBU0VfTEFZRVJfVVJMID0gJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJztcbmNvbnN0IERFRkFVTFRfQkFTRV9MQVlFUl9BVFRSSUJVVElPTiA9ICcmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWNoZWRNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2ssIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqIEEgbWFwIHdpdGggdGhlIGdpdmVuIElEIGlzIGNyZWF0ZWQgaW5zaWRlIHRoaXMgY29tcG9uZW50LiBUaGlzIElEIGNhbiBiZSB1c2VkIHRoZSBnZXQgdGhlIG1hcCBpbnN0YW5jZSBvdmVyIHRoZSBtYXAgY2FjaGUgc2VydmljZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvcnJlc3BvbmRpbmcgbGVhZmxldCBtYXAgb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjbWFwLW9wdGlvbilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXBPcHRpb25zOiBMLk1hcE9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBCb3VuZHMgZm9yIHRoZSBtYXBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaXRCb3VuZHM6IEwuTGF0TG5nQm91bmRzRXhwcmVzc2lvbjtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgd2hpY2ggaG9sZHMgYWxsIG92ZXJsYXkgbWFwIGxheWVyIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNsYXllcilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvdmVybGF5TWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgd2hpY2ggaG9sZHMgYWxsIGJhc2UgbWFwIGxheWVyIChzZWU6IGh0dHBzOi8vbGVhZmxldGpzLmNvbS9yZWZlcmVuY2UtMS4zLjQuaHRtbCNsYXllcilcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBiYXNlTWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyB0aGUgdGhlIHpvb20gb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjY29udHJvbC1sYXllcnMpXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGF5ZXJDb250cm9sT3B0aW9uczogTC5Db250cm9sLkxheWVyc09wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmliZXMgdGhlIHRoZSB6b29tIGNvbnRyb2wgb3B0aW9ucyAoc2VlOiBodHRwczovL2xlYWZsZXRqcy5jb20vcmVmZXJlbmNlLTEuMy40Lmh0bWwjY29udHJvbC16b29tKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHpvb21Db250cm9sT3B0aW9uczogTC5Db250cm9sLlpvb21PcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogSW5mb3JtcyB3aGVuIGluaXRpYWxpemF0aW9uIGlzIGRvbmUgd2l0aCBtYXAgaWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG1hcEluaXRpYWxpemVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXAgb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBtYXA6IEwuTWFwO1xuXG4gICAgcHJvdGVjdGVkIG9sZE92ZXJsYXlMYXllcjogTC5Db250cm9sLkxheWVyc09iamVjdCA9IHt9O1xuICAgIHByb3RlY3RlZCBvbGRCYXNlTGF5ZXI6IEwuQ29udHJvbC5MYXllcnNPYmplY3QgPSB7fTtcbiAgICBwcm90ZWN0ZWQgbGF5ZXJDb250cm9sOiBMLkNvbnRyb2wuTGF5ZXJzO1xuICAgIHByb3RlY3RlZCB6b29tQ29udHJvbDogTC5Db250cm9sLlpvb207XG5cbiAgICBwcml2YXRlIF9vdmVybGF5TWFwczogTWFwPHN0cmluZywgTGF5ZXJPcHRpb25zPjtcbiAgICBwcml2YXRlIF9kaWZmZXJPdmVybGF5TWFwczogS2V5VmFsdWVEaWZmZXI8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2Jhc2VNYXBzOiBNYXA8c3RyaW5nLCBMYXllck9wdGlvbnM+O1xuICAgIHByaXZhdGUgX2RpZmZlckJhc2VNYXBzOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIExheWVyT3B0aW9ucz47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICB0aGlzLl9kaWZmZXJPdmVybGF5TWFwcyA9IHRoaXMuZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5fZGlmZmVyQmFzZU1hcHMgPSB0aGlzLmRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tYXBJZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubWFwSWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWFwSWQgPSB0aGlzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5maXRCb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHModGhpcy5maXRCb3VuZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuem9vbUNvbnRyb2xPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVab29tQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlck92ZXJsYXlNYXBzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyT3ZlcmxheU1hcHMuZGlmZih0aGlzLm92ZXJsYXlNYXBzKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKGUpID0+IHRoaXMucmVtb3ZlT3ZlcmxheU1hcChlLnByZXZpb3VzVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGUpID0+IHRoaXMuYWRkT3ZlcmxheU1hcChlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlckJhc2VNYXBzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyQmFzZU1hcHMuZGlmZih0aGlzLmJhc2VNYXBzKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKGUpID0+IHRoaXMucmVtb3ZlQmFzZU1hcChlLnByZXZpb3VzVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGUpID0+IHRoaXMuYWRkQmFzZU1hcChlLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgICAgIHRoaXMubWFwQ2FjaGUuZGVsZXRlTWFwKHRoaXMubWFwSWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXAoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tYXBPcHRpb25zIHx8IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKSB7IHRoaXMubWFwT3B0aW9ucyA9IHsgem9vbUNvbnRyb2w6IGZhbHNlIH07IH1cbiAgICAgICAgdGhpcy5tYXAgPSBMLm1hcCh0aGlzLm1hcElkLCB0aGlzLm1hcE9wdGlvbnMpO1xuICAgICAgICB0aGlzLm1hcENhY2hlLnNldE1hcCh0aGlzLm1hcElkLCB0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMubWFwSW5pdGlhbGl6ZWQuZW1pdCh0aGlzLm1hcElkKTtcbiAgICAgICAgaWYgKHRoaXMuYmFzZU1hcHMgJiYgdGhpcy5iYXNlTWFwcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5iYXNlTWFwcy5mb3JFYWNoKChlbnRyeSwga2V5KSA9PiB0aGlzLmFkZEJhc2VNYXAoZW50cnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQmFzZU1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlNYXBzKSB7IHRoaXMub3ZlcmxheU1hcHMuZm9yRWFjaCgoZW50cnksIGtleSkgPT4gdGhpcy5hZGRPdmVybGF5TWFwKGVudHJ5KSk7IH1cbiAgICAgICAgdGhpcy51cGRhdGVab29tQ29udHJvbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29udHJvbCgpO1xuICAgICAgICBpZiAodGhpcy5maXRCb3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlVVVJRCgpOiBzdHJpbmcge1xuICAgICAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE92ZXJsYXlNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkT3ZlcmxheUxheWVyLmhhc093blByb3BlcnR5W2xheWVyT3B0aW9ucy5sYWJlbF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZE92ZXJsYXlMYXllcltsYXllck9wdGlvbnMubGFiZWxdID0gbGF5ZXJPcHRpb25zLmxheWVyO1xuICAgICAgICAgICAgICAgIGlmIChsYXllck9wdGlvbnMudmlzaWJsZSkgeyBsYXllck9wdGlvbnMubGF5ZXIuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU92ZXJsYXlNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMub2xkT3ZlcmxheUxheWVyLmhhc093blByb3BlcnR5KGxheWVyT3B0aW9ucy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2xkT3ZlcmxheUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEJhc2VNYXAobGF5ZXJPcHRpb25zPzogTGF5ZXJPcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJhc2VNYXBzIHx8IHRoaXMuYmFzZU1hcHMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IERFRkFVTFRfQkFTRV9MQVlFUl9OQU1FLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYXllcjogTC50aWxlTGF5ZXIoREVGQVVMVF9CQVNFX0xBWUVSX1VSTCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRpb246IERFRkFVTFRfQkFTRV9MQVlFUl9BVFRSSUJVVElPTlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMub2xkQmFzZUxheWVyLmhhc093blByb3BlcnR5W2xheWVyT3B0aW9ucy5sYWJlbF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZEJhc2VMYXllcltsYXllck9wdGlvbnMubGFiZWxdID0gbGF5ZXJPcHRpb25zLmxheWVyO1xuICAgICAgICAgICAgICAgIGlmIChsYXllck9wdGlvbnMudmlzaWJsZSkgeyBsYXllck9wdGlvbnMubGF5ZXIuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUJhc2VNYXAobGF5ZXJPcHRpb25zOiBMYXllck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMub2xkQmFzZUxheWVyLmhhc093blByb3BlcnR5KGxheWVyT3B0aW9ucy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMub2xkQmFzZUxheWVyW2xheWVyT3B0aW9ucy5sYWJlbF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxheWVyQ29udHJvbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXllckNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVDb250cm9sKHRoaXMubGF5ZXJDb250cm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyQ29udHJvbE9wdGlvbnNcbiAgICAgICAgICAgICAgICAmJiAoT2JqZWN0LmtleXModGhpcy5vbGRCYXNlTGF5ZXIpLmxlbmd0aCA+IDEgfHwgT2JqZWN0LmtleXModGhpcy5vbGRPdmVybGF5TGF5ZXIpLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXllckNvbnRyb2wgPVxuICAgICAgICAgICAgICAgICAgICBMLmNvbnRyb2wubGF5ZXJzKHRoaXMub2xkQmFzZUxheWVyLCB0aGlzLm9sZE92ZXJsYXlMYXllciwgdGhpcy5sYXllckNvbnRyb2xPcHRpb25zKS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVpvb21Db250cm9sKCkge1xuICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCkgeyB0aGlzLm1hcC5yZW1vdmVDb250cm9sKHRoaXMuem9vbUNvbnRyb2wpOyB9XG4gICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IEwuY29udHJvbC56b29tKHRoaXMuem9vbUNvbnRyb2xPcHRpb25zKS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgTGF0TG5nQm91bmRzTGl0ZXJhbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvU2VhcmNoUmVzdWx0IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZ2VvbWV0cnk6IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcbiAgICBib3VuZHM/OiBMYXRMbmdCb3VuZHNMaXRlcmFsO1xuICAgIGFkZHJlc3M/OiB7XG4gICAgICAgIGNpdHk/OiBzdHJpbmc7XG4gICAgICAgIGNpdHlfZGlzdHJpY3Q/OiBzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdGlvbj86IHN0cmluZztcbiAgICAgICAgY29udGluZW50Pzogc3RyaW5nO1xuICAgICAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgICAgICBjb3VudHJ5X2NvZGU/OiBzdHJpbmc7XG4gICAgICAgIGhvdXNlX251bWJlcj86IHN0cmluZztcbiAgICAgICAgbmVpZ2hib3VyaG9vZD86IHN0cmluZztcbiAgICAgICAgcG9zdGNvZGU/OiBzdHJpbmc7XG4gICAgICAgIHB1YmxpY19idWlsZGluZz86IHN0cmluZztcbiAgICAgICAgcm9hZD86IHN0cmluZztcbiAgICAgICAgc3RhdGU/OiBzdHJpbmc7XG4gICAgICAgIHN1YnVyYj86IHN0cmluZztcbiAgICAgICAgdG93bj86IHN0cmluZztcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvU2VhcmNoT3B0aW9ucyB7XG4gICAgYWNjZXB0TGFuZ3VhZ2U/OiBzdHJpbmc7XG4gICAgYWRkcmVzc2RldGFpbHM/OiBib29sZWFuO1xuICAgIGFzUG9pbnRHZW9tZXRyeT86IGJvb2xlYW47XG4gICAgY291bnRyeWNvZGVzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvUmV2ZXJzZU9wdGlvbnMge1xuICAgIGFjY2VwdExhbmd1YWdlPzogc3RyaW5nO1xuICAgIGFkZHJlc3NkZXRhaWxzPzogYm9vbGVhbjtcbiAgICB6b29tPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlb1JldmVyc2VSZXN1bHQge1xuICAgIGxhdDogc3RyaW5nO1xuICAgIGxvbjogc3RyaW5nO1xuICAgIGRpc3BsYXlOYW1lPzogc3RyaW5nO1xuICAgIGFkZHJlc3M/OiB7XG4gICAgICAgIGNpdHk6IHN0cmluZztcbiAgICAgICAgY2l0eURpc3RyaWN0OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnk6IHN0cmluZztcbiAgICAgICAgY291bnRyeUNvZGU6IHN0cmluZztcbiAgICAgICAgY291bnR5OiBzdHJpbmc7XG4gICAgICAgIGhvdXNlTnVtYmVyOiBzdHJpbmc7XG4gICAgICAgIG5laWdoYm91cmhvb2Q6IHN0cmluZztcbiAgICAgICAgcG9zdGNvZGU6IHN0cmluZztcbiAgICAgICAgcm9hZDogc3RyaW5nO1xuICAgICAgICBzdGF0ZTogc3RyaW5nO1xuICAgICAgICBzdGF0ZURpc3RyaWN0OiBzdHJpbmc7XG4gICAgICAgIHN1YnVyYjogc3RyaW5nO1xuICAgIH07XG4gICAgYm91bmRpbmdib3g/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlb1NlYXJjaCB7XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2VhcmNoVGVybSh0ZXJtOiBzdHJpbmcsIG9wdGlvbnM/OiBHZW9TZWFyY2hPcHRpb25zKTogT2JzZXJ2YWJsZTxHZW9TZWFyY2hSZXN1bHQ+O1xuXG4gICAgcHVibGljIGFic3RyYWN0IHJldmVyc2UocG9pbnQ6IFBvaW50LCBvcHRpb25zPzogR2VvUmV2ZXJzZU9wdGlvbnMpOiBPYnNlcnZhYmxlPEdlb1JldmVyc2VSZXN1bHQ+O1xuXG59XG4iLCJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEdlb1JldmVyc2VPcHRpb25zLCBHZW9SZXZlcnNlUmVzdWx0LCBHZW9TZWFyY2gsIEdlb1NlYXJjaE9wdGlvbnMsIEdlb1NlYXJjaFJlc3VsdCB9IGZyb20gJy4vZ2Vvc2VhcmNoJztcblxuaW50ZXJmYWNlIE5vbWluYXRpbVNlYXJjaFJlc3VsdCB7XG4gICAgZGlzcGxheV9uYW1lOiBzdHJpbmc7XG4gICAgZ2VvanNvbj86IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBib3VuZGluZ2JveDogbnVtYmVyW107XG4gICAgYWRkcmVzcz86IHtcbiAgICAgICAgY2l0eT86IHN0cmluZztcbiAgICAgICAgY2l0eV9kaXN0cmljdD86IHN0cmluZztcbiAgICAgICAgY29uc3RydWN0aW9uPzogc3RyaW5nO1xuICAgICAgICBjb250aW5lbnQ/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnk/OiBzdHJpbmc7XG4gICAgICAgIGNvdW50cnlfY29kZT86IHN0cmluZztcbiAgICAgICAgaG91c2VfbnVtYmVyPzogc3RyaW5nO1xuICAgICAgICBuZWlnaGJvdXJob29kPzogc3RyaW5nO1xuICAgICAgICBwb3N0Y29kZT86IHN0cmluZztcbiAgICAgICAgcHVibGljX2J1aWxkaW5nPzogc3RyaW5nO1xuICAgICAgICBzdGF0ZT86IHN0cmluZztcbiAgICAgICAgc3VidXJiPzogc3RyaW5nO1xuICAgIH07XG59XG5cbmludGVyZmFjZSBBZGRyZXNzIHtcbiAgICBhZGRyZXNzMjk6IHN0cmluZztcbiAgICBob3VzZV9udW1iZXI6IHN0cmluZztcbiAgICByb2FkOiBzdHJpbmc7XG4gICAgbmVpZ2hib3VyaG9vZDogc3RyaW5nO1xuICAgIHN1YnVyYjogc3RyaW5nO1xuICAgIGNpdHlfZGlzdHJpY3Q6IHN0cmluZztcbiAgICBjaXR5OiBzdHJpbmc7XG4gICAgY291bnR5OiBzdHJpbmc7XG4gICAgc3RhdGVfZGlzdHJpY3Q6IHN0cmluZztcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHBvc3Rjb2RlOiBzdHJpbmc7XG4gICAgY291bnRyeTogc3RyaW5nO1xuICAgIGNvdW50cnlfY29kZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTm9taW5hdGltUmV2ZXJzZVJlc3VsdCB7XG4gICAgcGxhY2VfaWQ6IHN0cmluZztcbiAgICBsaWNlbmNlOiBzdHJpbmc7XG4gICAgb3NtX3R5cGU6IHN0cmluZztcbiAgICBvc21faWQ6IHN0cmluZztcbiAgICBsYXQ6IHN0cmluZztcbiAgICBsb246IHN0cmluZztcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBhZGRyZXNzOiBBZGRyZXNzO1xuICAgIGJvdW5kaW5nYm94OiBzdHJpbmdbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vbWluYXRpbUdlb1NlYXJjaFNlcnZpY2UgaW1wbGVtZW50cyBHZW9TZWFyY2gge1xuXG4gICAgcHJvdGVjdGVkIHNlcnZpY2VVcmwgPSAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cFNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIHNlYXJjaFRlcm0odGVybTogc3RyaW5nLCBvcHRpb25zOiBHZW9TZWFyY2hPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPEdlb1NlYXJjaFJlc3VsdD4ge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgncScsIHRlcm0pO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdmb3JtYXQnLCAnanNvbicpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdsaW1pdCcsICcxJyk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvdW50cnljb2RlcykgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdjb3VudHJ5Y29kZXMnLCBvcHRpb25zLmNvdW50cnljb2Rlcy5qb2luKCcsJykpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLmFkZHJlc3NkZXRhaWxzICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2FkZHJlc3NkZXRhaWxzJywgb3B0aW9ucy5hZGRyZXNzZGV0YWlscyA/ICcxJyA6ICcwJyk7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXNQb2ludEdlb21ldHJ5ICE9PSBudWxsKSB7IHBhcmFtcyA9IHBhcmFtcy5zZXQoJ3BvbHlnb25fZ2VvanNvbicsIG9wdGlvbnMuYXNQb2ludEdlb21ldHJ5ID8gJzAnIDogJzEnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hY2NlcHRMYW5ndWFnZSkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhY2NlcHQtbGFuZ3VhZ2UnLCBvcHRpb25zLmFjY2VwdExhbmd1YWdlKTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmNsaWVudCgpLmdldChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZVVybCArICdzZWFyY2gnLFxuICAgICAgICAgICAgeyBwYXJhbXMgfVxuICAgICAgICApLm1hcCgocmVzQXJyYXk6IE5vbWluYXRpbVNlYXJjaFJlc3VsdFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzQXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzQXJyYXlbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJlc3VsdC5kaXNwbGF5X25hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZ2VvanNvbikge1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IHJlc3VsdC5nZW9qc29uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbcGFyc2VGbG9hdChyZXN1bHQubG9uKSwgcGFyc2VGbG9hdChyZXN1bHQubGF0KV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuUmVzdWx0OiBHZW9TZWFyY2hSZXN1bHQgPSB7IG5hbWUsIGdlb21ldHJ5IH07XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5ib3VuZGluZ2JveCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5SZXN1bHQuYm91bmRzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm91bmRpbmdib3hbMl1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJvdW5kaW5nYm94WzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3VuZGluZ2JveFszXVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmFkZHJlc3MpIHsgcmV0dXJuUmVzdWx0LmFkZHJlc3MgPSByZXN1bHQuYWRkcmVzczsgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5SZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXZlcnNlKHBvaW50OiBQb2ludCwgb3B0aW9uczogR2VvUmV2ZXJzZU9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8R2VvUmV2ZXJzZVJlc3VsdD4ge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgnbGF0JywgcG9pbnQuY29vcmRpbmF0ZXNbMF0udG9TdHJpbmcoKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ2xvbicsIHBvaW50LmNvb3JkaW5hdGVzWzFdLnRvU3RyaW5nKCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdmb3JtYXQnLCAnanNvbicpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFkZHJlc3NkZXRhaWxzICE9PSB1bmRlZmluZWQpIHsgcGFyYW1zID0gcGFyYW1zLnNldCgnYWRkcmVzc2RldGFpbHMnLCBvcHRpb25zLmFkZHJlc3NkZXRhaWxzID8gJzEnIDogJzAnKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5hY2NlcHRMYW5ndWFnZSAhPT0gbnVsbCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCdhY2NlcHQtbGFuZ3VhZ2UnLCBvcHRpb25zLmFjY2VwdExhbmd1YWdlKTsgfVxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnpvb20gIT09IHVuZGVmaW5lZCkgeyBwYXJhbXMgPSBwYXJhbXMuc2V0KCd6b29tJywgYCR7b3B0aW9ucy56b29tfWApOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuY2xpZW50KCkuZ2V0KFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlVXJsICsgJ3JldmVyc2UnLFxuICAgICAgICAgICAgeyBwYXJhbXMgfVxuICAgICAgICApLm1hcCgocmVzOiBOb21pbmF0aW1SZXZlcnNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgbGF0OiByZXMubGF0LFxuICAgICAgICAgICAgICAgIGxvbjogcmVzLmxvbixcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcmVzLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICBib3VuZGluZ2JveDogcmVzLmJvdW5kaW5nYm94XG4gICAgICAgICAgICB9IGFzIEdlb1JldmVyc2VSZXN1bHQ7XG4gICAgICAgICAgICBpZiAocmVzLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkcmVzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY2l0eTogcmVzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgY2l0eURpc3RyaWN0OiByZXMuYWRkcmVzcy5jaXR5X2Rpc3RyaWN0LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXMuYWRkcmVzcy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogcmVzLmFkZHJlc3MuY291bnRyeV9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb3VudHk6IHJlcy5hZGRyZXNzLmNvdW50eSxcbiAgICAgICAgICAgICAgICAgICAgaG91c2VOdW1iZXI6IHJlcy5hZGRyZXNzLmhvdXNlX251bWJlcixcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3VyaG9vZDogcmVzLmFkZHJlc3MubmVpZ2hib3VyaG9vZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zdGNvZGU6IHJlcy5hZGRyZXNzLnBvc3Rjb2RlLFxuICAgICAgICAgICAgICAgICAgICByb2FkOiByZXMuYWRkcmVzcy5yb2FkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogcmVzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlRGlzdHJpY3Q6IHJlcy5hZGRyZXNzLnN0YXRlX2Rpc3RyaWN0LFxuICAgICAgICAgICAgICAgICAgICBzdWJ1cmI6IHJlcy5hZGRyZXNzLnN1YnVyYlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdlb0pTT04sIEdlb0pTT05PcHRpb25zLCBMYXRMbmdCb3VuZHMsIExlYWZsZXRFdmVudCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlb0N1cmVHZW9KU09OT3B0aW9ucyBleHRlbmRzIEdlb0pTT05PcHRpb25zIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBodHRwQ2xpZW50OiBIdHRwQ2xpZW50O1xuICAgIHNob3dPbk1pblpvb20/OiBudW1iZXI7XG4gICAgc2hvd09uTWF4Wm9vbT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEdlb0N1cmVHZW9KU09OIGV4dGVuZHMgR2VvSlNPTiB7XG5cbiAgICBwdWJsaWMgb3B0aW9uczogR2VvQ3VyZUdlb0pTT05PcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG9wdGlvbnM/OiBHZW9DdXJlR2VvSlNPTk9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgICAgICBtb3ZlZW5kOiAoZXZlbnQ6IExlYWZsZXRFdmVudCkgPT4gdGhpcy5mZXRjaERhdGEoZXZlbnQudGFyZ2V0KVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkFkZChtYXA6IEwuTWFwKTogdGhpcyAge1xuICAgICAgICBzdXBlci5vbkFkZChtYXApO1xuICAgICAgICB0aGlzLmZldGNoRGF0YShtYXApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRGF0YShtYXA6IEwuTWFwKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoTWF4Wm9vbSA9IHRoaXMub3B0aW9ucy5zaG93T25NYXhab29tID8gbWFwLmdldFpvb20oKSA8PSB0aGlzLm9wdGlvbnMuc2hvd09uTWF4Wm9vbSA6IHRydWU7XG4gICAgICAgIGNvbnN0IG1hdGNoTWluWm9vbSA9IHRoaXMub3B0aW9ucy5zaG93T25NaW5ab29tID8gbWFwLmdldFpvb20oKSA+PSB0aGlzLm9wdGlvbnMuc2hvd09uTWluWm9vbSA6IHRydWU7XG4gICAgICAgIGlmIChtYXRjaE1pblpvb20gJiYgbWF0Y2hNYXhab29tKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKG1hcC5nZXRCb3VuZHMoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGJvdW5kczogTGF0TG5nQm91bmRzKSB7XG4gICAgICAgIGNvbnN0IGJib3hwYXJhbSA9IFtib3VuZHMuZ2V0V2VzdCgpLCBib3VuZHMuZ2V0U291dGgoKSwgYm91bmRzLmdldEVhc3QoKSwgYm91bmRzLmdldE5vcnRoKCldLmpvaW4oJywnKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnRcbiAgICAgICAgICAgIC5nZXQ8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj4odGhpcy5vcHRpb25zLnVybCwge1xuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBiYm94OiBiYm94cGFyYW1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZ2VvanNvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJMYXllcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZERhdGEoZ2VvanNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBLZXlWYWx1ZURpZmZlcnMsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgQ2FjaGVkTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vYmFzZS9jYWNoZWQtbWFwLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1nZW9tZXRyeS1tYXAtdmlld2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Omhvc3QgLm1hcC12aWV3ZXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeU1hcFZpZXdlckNvbXBvbmVudCBleHRlbmRzIENhY2hlZE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBoaWdobGlnaHQ6IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdlb21ldHJ5OiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB6b29tVG86IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGF2b2lkWm9vbVRvR2VvbWV0cnk6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGhpZ2hsaWdodEdlb21ldHJ5OiBMLkdlb0pTT047XG5cbiAgICBwcml2YXRlIGRlZmF1bHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICB3ZWlnaHQ6IDUsXG4gICAgICAgIG9wYWNpdHk6IDAuNjVcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdibHVlJyxcbiAgICAgICAgd2VpZ2h0OiAxMCxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVyc1xuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVNYXAoKTtcbiAgICAgICAgdGhpcy5kcmF3R2VvbWV0cnkoKTtcbiAgICAgICAgdGhpcy5zaG93SGlnaGxpZ2h0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuaGlnaGxpZ2h0ICYmIGNoYW5nZXMuaGlnaGxpZ2h0LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hpZ2hsaWdodCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHZW9tZXRyeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuem9vbVRvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tVG9HZW9tZXRyeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB6b29tVG9HZW9tZXRyeSgpIHtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBMLmdlb0pTT04odGhpcy56b29tVG8pO1xuICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHMoZ2VvbWV0cnkuZ2V0Qm91bmRzKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0hpZ2hsaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0R2VvbWV0cnkgPSBMLmdlb0pTT04odGhpcy5oaWdobGlnaHQsIHtcbiAgICAgICAgICAgIHBvaW50VG9MYXllcjogKGZlYXR1cmUsIGxhdGxuZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRHZW9tZXRyeS5zZXRTdHlsZSh0aGlzLmhpZ2hsaWdodFN0eWxlKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRHZW9tZXRyeS5hZGRUbyh0aGlzLm1hcCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R2VvbWV0cnkoKSB7XG4gICAgICAgIGlmICh0aGlzLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBnZW9qc29uID0gTC5nZW9KU09OKHRoaXMuZ2VvbWV0cnksIHtcbiAgICAgICAgICAgICAgICBwb2ludFRvTGF5ZXI6IChmZWF0dXJlLCBsYXRsbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEwuY2lyY2xlTWFya2VyKGxhdGxuZywgdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZW9qc29uLnNldFN0eWxlKHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICAgIGdlb2pzb24uYWRkVG8odGhpcy5tYXApO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXZvaWRab29tVG9HZW9tZXRyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyhnZW9qc29uLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhlbGdvbGFuZE1hcE1vZHVsZSB9IGZyb20gJy4uL2Jhc2UvbWFwLm1vZHVsZSc7XG5pbXBvcnQgeyBHZW9tZXRyeU1hcFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vZ2VvbWV0cnktbWFwLXZpZXdlci9nZW9tZXRyeS1tYXAtdmlld2VyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEdlb21ldHJ5TWFwVmlld2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEhlbGdvbGFuZE1hcE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBHZW9tZXRyeU1hcFZpZXdlckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRNYXBWaWV3TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZXh0ZW50LWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ6b29tVG9FeHRlbnQoKVwiPnpvb20gdG8gZXh0ZW50PC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW50Q29udHJvbENvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIG1hcElkOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGV4dGVudDogTC5MYXRMbmdCb3VuZHNFeHByZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGVcbiAgKSB7IH1cblxuICBwdWJsaWMgem9vbVRvRXh0ZW50KCkge1xuICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLmZpdEJvdW5kcyh0aGlzLmV4dGVudCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IEdlb1NlYXJjaCwgR2VvU2VhcmNoT3B0aW9ucywgR2VvU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vLi4vYmFzZS9nZW9zZWFyY2gvZ2Vvc2VhcmNoJztcbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWdlb3NlYXJjaC1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxpbnB1dCBbKG5nTW9kZWwpXT1cInNlYXJjaFRlcm1cIiAoa2V5dXAuZW50ZXIpPVwidHJpZ2dlclNlYXJjaCgpXCI+XG4gIDxzcGFuICpuZ0lmPVwibG9hZGluZ1wiPmxvYWRpbmcuLi48L3NwYW4+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodCBidG4tc21cIiAoY2xpY2spPVwiY2xlYXJTZWFyY2goKVwiPlg8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBHZW9zZWFyY2hDb250cm9sQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgbWFwIGlkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1hcElkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIHNlYXJjaCBvcHRpb25zLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG9wdGlvbnM6IEdlb1NlYXJjaE9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzZWFyY2ggcmVzdWx0LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblJlc3VsdENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxHZW9TZWFyY2hSZXN1bHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogSW5mb3Jtcywgd2hlbiB0aGUgc2VhcmNoIGlzIHRyaWdnZXJlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWFyY2hUcmlnZ2VyZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyByZXN1bHQ6IEdlb1NlYXJjaFJlc3VsdDtcblxuICAgIHB1YmxpYyByZXN1bHRHZW9tZXRyeTogTC5HZW9KU09OO1xuXG4gICAgcHVibGljIHNlYXJjaFRlcm06IHN0cmluZztcblxuICAgIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBnZW9zZWFyY2g6IEdlb1NlYXJjaFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlclNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5vblNlYXJjaFRyaWdnZXJlZC5lbWl0KCk7XG4gICAgICAgIHRoaXMucmVtb3ZlT2xkR2VvbWV0cnkoKTtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGVybSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2Vvc2VhcmNoLnNlYXJjaFRlcm0odGhpcy5zZWFyY2hUZXJtLCB0aGlzLm9wdGlvbnMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVzdWx0Q2hhbmdlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXBJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRHZW9tZXRyeSA9IEwuZ2VvSlNPTihyZXN1bHQuZ2VvbWV0cnkpLmFkZFRvKHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkuZml0Qm91bmRzKHJlc3VsdC5ib3VuZHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENhY2hlLmdldE1hcCh0aGlzLm1hcElkKS5maXRCb3VuZHModGhpcy5yZXN1bHRHZW9tZXRyeS5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5zZWFyY2hUZXJtID0gJ2Vycm9yIG9jY3VycmVkJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMubG9hZGluZyA9IGZhbHNlOyB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyU2VhcmNoKCkge1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgdGhpcy5vblJlc3VsdENoYW5nZWQuZW1pdChudWxsKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPbGRHZW9tZXRyeSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlT2xkR2VvbWV0cnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEdlb21ldHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdEdlb21ldHJ5LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuXG5jb25zdCBMT0NBVElPTl9GT1VORF9FVkVOVCA9ICdsb2NhdGlvbmZvdW5kJztcbmNvbnN0IExPQ0FUSU9OX0VSUk9SID0gJ2xvY2F0aW9uZXJyb3InO1xuY29uc3QgTE9DQVRFRF9NQVJLRVJfSUQgPSAnbG9jYXRlZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhdGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlXG4gICkgeyB9XG5cbiAgcHVibGljIHN0YXJ0TG9jYXRlKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcENhY2hlLmdldE1hcChpZCk7XG4gICAgbWFwLm9uKExPQ0FUSU9OX0ZPVU5EX0VWRU5ULCAoZXZ0OiBMLkxvY2F0aW9uRXZlbnQpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKG1hcCk7XG4gICAgICBjb25zdCBtYXJrZXIgPSBMLm1hcmtlcihldnQubGF0bG5nKS5hZGRUbyhtYXApO1xuICAgICAgbWFya2VyLm9wdGlvbnMudGl0bGUgPSBMT0NBVEVEX01BUktFUl9JRDtcbiAgICB9KTtcbiAgICBtYXAub24oTE9DQVRJT05fRVJST1IsIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSk7XG4gICAgbWFwLmxvY2F0ZSh7XG4gICAgICB3YXRjaDogdHJ1ZSxcbiAgICAgIHNldFZpZXc6IHRydWUsXG4gICAgICB0aW1lb3V0OiAzMDAwMFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0b3BMb2NhdGUoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwQ2FjaGUuZ2V0TWFwKGlkKTtcbiAgICBtYXAuc3RvcExvY2F0ZSgpO1xuICAgIG1hcC5vZmYoTE9DQVRJT05fRk9VTkRfRVZFTlQpO1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKG1hcCk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1hcmtlcihtYXA6IEwuTWFwKSB7XG4gICAgbWFwLmVhY2hMYXllcigoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIEwuTWFya2VyICYmIGVudHJ5Lm9wdGlvbnMudGl0bGUgPT09IExPQ0FURURfTUFSS0VSX0lEKSB7XG4gICAgICAgIG1hcC5yZW1vdmVMYXllcihlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMb2NhdGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWxvY2F0ZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAtdmVydGljYWwgYnRuLWdyb3VwLXNtIG1hcC1jb250cm9sXCI+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zbVwiIChjbGljayk9XCJsb2NhdGVVc2VyKClcIiBbbmdDbGFzc109XCJpc1RvZ2dsZWQgPyAnYnRuLXByaW1hcnknOiAnYnRuLWxpZ2h0J1wiPlxuICAgIGxvY2F0ZVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgaXt3aWR0aDoxMXB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIExvY2F0ZUNvbnRyb2xDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWFwSWQ6IHN0cmluZztcblxuICAgIHB1YmxpYyBpc1RvZ2dsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbG9jYXRlU2VydmljZTogTG9jYXRlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbG9jYXRlVXNlcigpIHtcbiAgICAgICAgdGhpcy5pc1RvZ2dsZWQgPSAhdGhpcy5pc1RvZ2dsZWQ7XG4gICAgICAgIGlmICh0aGlzLmlzVG9nZ2xlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGVTZXJ2aWNlLnN0YXJ0TG9jYXRlKHRoaXMubWFwSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGVTZXJ2aWNlLnN0b3BMb2NhdGUodGhpcy5tYXBJZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi16b29tLWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAtdmVydGljYWwgbWFwLWNvbnRyb2xcIj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0IGJ0bi1zbVwiIChjbGljayk9XCJ6b29tSW4oKVwiPlxuICAgIDxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgPC9idXR0b24+XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saWdodCBidG4tc21cIiAoY2xpY2spPVwiem9vbU91dCgpXCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1taW51c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgWm9vbUNvbnRyb2xDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBtYXBJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGVcbiAgKSB7IH1cblxuICBwdWJsaWMgem9vbUluKCkge1xuICAgIHRoaXMubWFwQ2FjaGUuZ2V0TWFwKHRoaXMubWFwSWQpLnpvb21JbigpO1xuICB9XG5cbiAgcHVibGljIHpvb21PdXQoKSB7XG4gICAgdGhpcy5tYXBDYWNoZS5nZXRNYXAodGhpcy5tYXBJZCkuem9vbU91dCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEhlbGdvbGFuZE1hcE1vZHVsZSB9IGZyb20gJy4uL2Jhc2UvbWFwLm1vZHVsZSc7XG5pbXBvcnQgeyBFeHRlbnRDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9leHRlbnQvZXh0ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9zZWFyY2hDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9nZW9zZWFyY2gvZ2Vvc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2NhdGVDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9sb2NhdGUvbG9jYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2NhdGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhdGUvbG9jYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgWm9vbUNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL3pvb20vem9vbS5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBMb2NhdGVDb250cm9sQ29tcG9uZW50LFxuICBab29tQ29udHJvbENvbXBvbmVudCxcbiAgR2Vvc2VhcmNoQ29udHJvbENvbXBvbmVudCxcbiAgRXh0ZW50Q29udHJvbENvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEhlbGdvbGFuZENvcmVNb2R1bGUsXG4gICAgSGVsZ29sYW5kTWFwTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIExvY2F0ZVNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRNYXBDb250cm9sTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhhc0xvYWRhYmxlQ29udGVudCwgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENhY2hlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvY2FjaGVkLW1hcC1jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlclNlbGVjdG9yR2VuZXJhdG9yIH0gZnJvbSAnLi9tb2RlbC9tYXJrZXItc2VsZWN0b3ItZ2VuZXJhdG9yJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFQ+XG4gICAgZXh0ZW5kcyBDYWNoZWRNYXBDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgSGFzTG9hZGFibGVDb250ZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCBUaGUgc2VydmljZVVybCwgd2hlcmUgdGhlIHNlbGVjdGlvbiBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlcnZpY2VVcmw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCBUaGUgZmlsdGVyIHdoaWNoIHNob3VsZCBiZSB1c2VkLCB3aGlsZSBmZXRjaGluZyB0aGUgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYXZvaWRab29tVG9TZWxlY3Rpb246IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXJrZXJTZWxlY3RvckdlbmVyYXRvcjogTWFya2VyU2VsZWN0b3JHZW5lcmF0b3I7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBpbnB1dCBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBtYXJrZXIgem9vbWluZyAoaHR0cHM6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS0xLjMuNC5odG1sI2ZpdGJvdW5kcy1vcHRpb25zKVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpdEJvdW5kc01hcmtlck9wdGlvbnM6IEwuRml0Qm91bmRzT3B0aW9ucztcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbk5vUmVzdWx0c0ZvdW5kOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIG1hcENhY2hlOiBNYXBDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihtYXBDYWNoZSwgZGlmZmVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVNYXAoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdHZW9tZXRyaWVzKCk7XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLnNlcnZpY2VVcmwgfHwgY2hhbmdlcy5maWx0ZXIgfHwgY2hhbmdlcy5jbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R2VvbWV0cmllcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIGdlb21ldHJpZXNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VsZWN0b3JDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZHJhd0dlb21ldHJpZXMoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFpvb21zIHRvIHRoZSBnaXZlbiBib3VuZHNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0gYm91bmRzIHdoZXJlIHRvIHpvb21cbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VsZWN0b3JDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgem9vbVRvTWFya2VyQm91bmRzKGJvdW5kczogTC5MYXRMbmdCb3VuZHNFeHByZXNzaW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5hdm9pZFpvb21Ub1NlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKGJvdW5kcywgdGhpcy5maXRCb3VuZHNNYXJrZXJPcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIExhc3RWYWx1ZVByZXNlbnRhdGlvbiB7XG4gIC8qKlxuICAgKiBjb2xvcml6ZWQgY2lyY2xlIGRlcGVuZGluZyBvbiBzdGF0dXMgaW50ZXJ2YWxzXG4gICAqL1xuICBDb2xvcml6ZWQsXG4gIC8qKlxuICAgKiB0ZXh0dWFsIHByZXNlbnRhdGlvbiBvZiB0aGUgbGFzdCB2YWx1ZSwgZG9uZSB3aXRoIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yXG4gICAqL1xuICBUZXh0dWFsXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaWNvbiBsYWJlbCBiYXNlZCBvbiBhIGdpdmVuIHRpbWVzZXJpZXMuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlSWNvbkxhYmVsKHRzOiBUaW1lc2VyaWVzKTtcblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIEtleVZhbHVlRGlmZmVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgSGFzTG9hZGFibGVDb250ZW50LFxuICBNaXhpbixcbiAgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UsXG4gIFRpbWVzZXJpZXMsXG4gIFRpbWVzZXJpZXNFeHRyYXMsXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBjaXJjbGVNYXJrZXIsIGZlYXR1cmVHcm91cCwgZ2VvSlNPTiwgTGF5ZXIsIG1hcmtlciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWFwQ2FjaGUgfSBmcm9tICcuLi8uLi9iYXNlL21hcC1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciwgTGFzdFZhbHVlUHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vc2VydmljZXMvbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBEaXNwbGF5cyBzZWxlY3RhYmxlIHNlcmllcyB3aXRoIHRoZWlyIGxhc3QgdmFsdWVzIG9uIGFuIG1hcC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWxhc3QtdmFsdWUtbWFwLXNlbGVjdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLXdyYXBwZXJcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cbiAgPGRpdiBbYXR0ci5pZF09XCJtYXBJZFwiIGNsYXNzPVwibWFwLXZpZXdlclwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLm1hcC12aWV3ZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX06aG9zdCAubWFwLW5vdGlmaWVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6MTBweDt6LWluZGV4OjEwMDE7d2lkdGg6MTIwcHg7aGVpZ2h0OjcwcHg7cGFkZGluZzo1cHg7b3BhY2l0eTouODt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBMYXN0VmFsdWVNYXBTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFRpbWVzZXJpZXM+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGludGVybmFsIHNlcmllcyBJRHMsIHdoaWNoIHNob3VsZCBiZSBwcmVzZW50ZWQgd2l0aCB0aGVpciBsYXN0IHZhbHVlcyBvbiB0aGUgbWFwLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGxhc3RWYWx1ZVNlcmllc0lEczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFByZXNlbnRhdGlvbiB0eXBlIGhvdyB0byBkaXNwbGF5IHRoZSBzZXJpZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgbGFzdFZhbHVlUHJlc2VudGF0aW9uOiBMYXN0VmFsdWVQcmVzZW50YXRpb24gPSBMYXN0VmFsdWVQcmVzZW50YXRpb24uQ29sb3JpemVkO1xuXG4gIC8qKlxuICAgKiBJZ25vcmVzIGFsbCBTdGF0dXNpbnRlcnZhbHMgd2hlcmUgdGhlIHRpbWVzdGFtcCBpcyBiZWZvcmUgYSBnaXZlbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgYW5kIGRyYXdzIGluc3RlYWQgdGhlIGRlZmF1bHQgbWFya2VyLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGlnbm9yZVN0YXR1c0ludGVydmFsSWZCZWZvcmVEdXJhdGlvbiA9IEluZmluaXR5O1xuXG4gIHByaXZhdGUgbWFya2VyRmVhdHVyZUdyb3VwOiBMLkZlYXR1cmVHcm91cDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBsYXN0VmFsdWVMYWJlbEdlbmVyYXRvcjogTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IsXG4gICAgcHJvdGVjdGVkIHN0YXR1c0ludGVydmFsUmVzb2x2ZXI6IFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZHJhd0dlb21ldHJpZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKHRydWUpO1xuICAgIGlmICh0aGlzLmxhc3RWYWx1ZVNlcmllc0lEcyAmJiB0aGlzLmxhc3RWYWx1ZVNlcmllc0lEcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3JlYXRlTWFya2Vyc0J5U2VyaWVzSURzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXJzQnlTZXJpZXNJRHMoKSB7XG4gICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAgPSBmZWF0dXJlR3JvdXAoKTtcbiAgICBjb25zdCBvYnNMaXN0OiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG4gICAgdGhpcy5sYXN0VmFsdWVTZXJpZXNJRHMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBjb25zdCB0c09icyA9IHRoaXMuYXBpSW50ZXJmYWNlLmdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoZW50cnkpO1xuICAgICAgb2JzTGlzdC5wdXNoKHRzT2JzLnBpcGUoc3dpdGNoTWFwKHZhbCA9PiB0aGlzLmNyZWF0ZU1hcmtlcih2YWwpLnBpcGUodGFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZExheWVyKHJlcyk7XG4gICAgICAgIHJlcy5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh2YWwpKTtcbiAgICAgIH0pKSkpKTtcbiAgICB9KTtcbiAgICB0aGlzLmZpbmFsaXplTWFya2VyT2JzZXJ2YWJsZXMob2JzTGlzdCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcmtlcih0czogVGltZXNlcmllcykge1xuICAgIHN3aXRjaCAodGhpcy5sYXN0VmFsdWVQcmVzZW50YXRpb24pIHtcbiAgICAgIGNhc2UgTGFzdFZhbHVlUHJlc2VudGF0aW9uLkNvbG9yaXplZDpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29sb3JpemVkTWFya2VyKHRzKTtcbiAgICAgIGNhc2UgTGFzdFZhbHVlUHJlc2VudGF0aW9uLlRleHR1YWw6XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUxhYmVsZWRNYXJrZXIodHMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb2xvcml6ZWRNYXJrZXIodHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5hbGl6ZU1hcmtlck9ic2VydmFibGVzKG9ic0xpc3Q6IE9ic2VydmFibGU8YW55PltdKSB7XG4gICAgZm9ya0pvaW4ob2JzTGlzdCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdkbyB6b29tIHRvIGJvdW5kcycpO1xuICAgICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpO1xuICAgICAgICB0aGlzLnpvb21Ub01hcmtlckJvdW5kcyhib3VuZHMpO1xuICAgICAgICB0aGlzLm1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmFkZFRvKHRoaXMubWFwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbG9yaXplZE1hcmtlcih0czogVGltZXNlcmllcyk6IE9ic2VydmFibGU8TGF5ZXI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TGF5ZXI+KChvYnNlcnZlcjogT2JzZXJ2ZXI8TGF5ZXI+KSA9PiB7XG4gICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzRXh0cmFzKHRzLmlkLCB0cy51cmwpLnN1YnNjcmliZSgoZXh0cmFzOiBUaW1lc2VyaWVzRXh0cmFzKSA9PiB7XG4gICAgICAgIGxldCBjb2xvcmVkTWFya2VyO1xuICAgICAgICBpZiAoZXh0cmFzLnN0YXR1c0ludGVydmFscykge1xuICAgICAgICAgIGlmICgodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuaWdub3JlU3RhdHVzSW50ZXJ2YWxJZkJlZm9yZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHRoaXMuc3RhdHVzSW50ZXJ2YWxSZXNvbHZlci5nZXRNYXRjaGluZ0ludGVydmFsKHRzLmxhc3RWYWx1ZS52YWx1ZSwgZXh0cmFzLnN0YXR1c0ludGVydmFscyk7XG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgY29sb3JlZE1hcmtlciA9IHRoaXMuY3JlYXRlQ29sb3JlZE1hcmtlcih0cywgaW50ZXJ2YWwuY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbG9yZWRNYXJrZXIpIHtcbiAgICAgICAgICBjb2xvcmVkTWFya2VyID0gdGhpcy5jcmVhdGVEZWZhdWx0Q29sb3JlZE1hcmtlcih0cyk7XG4gICAgICAgIH1cbiAgICAgICAgb2JzZXJ2ZXIubmV4dChjb2xvcmVkTWFya2VyKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb2xvcmVkTWFya2VyKHRzOiBUaW1lc2VyaWVzLCBjb2xvcjogc3RyaW5nKTogTGF5ZXIge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcih0cywgY29sb3IsIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRGVmYXVsdENvbG9yZWRNYXJrZXIodHM6IFRpbWVzZXJpZXMpOiBMYXllciB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRmlsbGVkTWFya2VyKHRzLCAnIzAwMCcsIDEwKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRmlsbGVkTWFya2VyKHRzOiBUaW1lc2VyaWVzLCBjb2xvcjogc3RyaW5nLCByYWRpdXM6IG51bWJlcik6IExheWVyIHtcbiAgICBsZXQgZ2VvbWV0cnk6IExheWVyO1xuICAgIGlmICh0cy5zdGF0aW9uLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gdHMuc3RhdGlvbi5nZW9tZXRyeSBhcyBHZW9KU09OLlBvaW50O1xuICAgICAgZ2VvbWV0cnkgPSBjaXJjbGVNYXJrZXIoW3BvaW50LmNvb3JkaW5hdGVzWzFdLCBwb2ludC5jb29yZGluYXRlc1swXV0sIHtcbiAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgZmlsbENvbG9yOiBjb2xvcixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgICAgICAgcmFkaXVzOiAxMCxcbiAgICAgICAgd2VpZ2h0OiAyXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvbWV0cnkgPSBnZW9KU09OKHRzLnN0YXRpb24uZ2VvbWV0cnksIHtcbiAgICAgICAgc3R5bGU6IChmZWF0dXJlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgICAgICBmaWxsQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgICAgICAgICAgIHdlaWdodDogMlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZ2VvbWV0cnkpIHtcbiAgICAgIGdlb21ldHJ5Lm9uKCdjbGljaycsICgpID0+IHRoaXMub25TZWxlY3RlZC5lbWl0KHRzKSk7XG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMYWJlbGVkTWFya2VyKHRzOiBUaW1lc2VyaWVzKTogT2JzZXJ2YWJsZTxMYXllcj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxMYXllcj4ob2JzZXJ2ZXIgPT4ge1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IuY3JlYXRlSWNvbkxhYmVsKHRzKTtcbiAgICAgIGlmICh0cy5zdGF0aW9uLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSB0cy5zdGF0aW9uLmdlb21ldHJ5IGFzIEdlb0pTT04uUG9pbnQ7XG4gICAgICAgIG9ic2VydmVyLm5leHQobWFya2VyKFtwb2ludC5jb29yZGluYXRlc1sxXSwgcG9pbnQuY29vcmRpbmF0ZXNbMF1dLCB7IGljb24gfSkpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcblxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIEtleVZhbHVlRGlmZmVycywgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlLCBIYXNMb2FkYWJsZUNvbnRlbnQsIE1peGluLCBQbGF0Zm9ybSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtc2VsZWN0b3IuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItcGxhdGZvcm0tbWFwLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtYXAtd3JhcHBlclwiIHN0eWxlPVwiaGVpZ2h0OiAxMDAlO1wiPlxuICA8ZGl2IFthdHRyLmlkXT1cIm1hcElkXCIgY2xhc3M9XCJtYXAtdmlld2VyXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5tYXAtdmlld2Vye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Omhvc3QgLm1hcC1ub3RpZmllcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjEwcHg7ei1pbmRleDoxMDAxO3dpZHRoOjEyMHB4O2hlaWdodDo3MHB4O3BhZGRpbmc6NXB4O29wYWNpdHk6Ljg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1NYXBTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIE1hcFNlbGVjdG9yQ29tcG9uZW50PFBsYXRmb3JtPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjbHVzdGVyOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBtYXJrZXJGZWF0dXJlR3JvdXA6IEwuRmVhdHVyZUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBtYXBDYWNoZTogTWFwQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIobWFwQ2FjaGUsIGRpZmZlcnMsIGNkKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd0dlb21ldHJpZXMoKSB7XG4gICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwKSB7IHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwKTsgfVxuICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQbGF0Zm9ybXModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cCA9IEwubWFya2VyQ2x1c3Rlckdyb3VwKHsgYW5pbWF0ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgQXJyYXkgJiYgcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlciA9IEwubWFya2VyKFtlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSwgZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkTGF5ZXIobWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkVG8odGhpcy5tYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHModGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vUmVzdWx0c0ZvdW5kLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lc2VyaWVzIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yIH0gZnJvbSAnLi9sYXN0LXZhbHVlLWxhYmVsLWdlbmVyYXRvci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JTZXJ2aWNlIGV4dGVuZHMgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlSWNvbkxhYmVsKHRzOiBUaW1lc2VyaWVzKSB7XG4gICAgY29uc3QgZGF0ZSA9IG1vbWVudCh0cy5sYXN0VmFsdWUudGltZXN0YW1wKS5mcm9tTm93KCk7XG4gICAgcmV0dXJuIEwuZGl2SWNvbih7XG4gICAgICBjbGFzc05hbWU6ICdsYXN0LXZhbHVlLWNvbnRhaW5lcicsXG4gICAgICBodG1sOiBgPHNwYW4gY2xhc3M9XCJsYXN0LXZhbHVlLWxhYmVsXCI+JHt0cy5sYXN0VmFsdWUudmFsdWV9Jm5ic3A7JHt0cy51b219PC9zcGFuPjxicj48c3BhbiBjbGFzcz1cImxhc3QtdmFsdWUtZGF0ZVwiPiR7ZGF0ZX08L3NwYW4+YFxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mb3JrSm9pbic7XG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBIYXNMb2FkYWJsZUNvbnRlbnQsXG4gICAgTWl4aW4sXG4gICAgUGFyYW1ldGVyRmlsdGVyLFxuICAgIFN0YXRpb24sXG4gICAgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UsXG4gICAgVGltZXNlcmllcyxcbiAgICBUaW1lc2VyaWVzRXh0cmFzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IEdlb0pTT04gZnJvbSAnZ2VvanNvbic7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE1hcENhY2hlIH0gZnJvbSAnLi4vLi4vYmFzZS9tYXAtY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXN0YXRpb24tbWFwLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtYXAtd3JhcHBlclwiIHN0eWxlPVwiaGVpZ2h0OiAxMDAlO1wiPlxuICA8ZGl2IFthdHRyLmlkXT1cIm1hcElkXCIgY2xhc3M9XCJtYXAtdmlld2VyXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e3Bvc2l0aW9uOnJlbGF0aXZlfTpob3N0IC5tYXAtdmlld2Vye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Omhvc3QgLm1hcC1ub3RpZmllcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjEwcHg7ei1pbmRleDoxMDAxO3dpZHRoOjEyMHB4O2hlaWdodDo3MHB4O3BhZGRpbmc6NXB4O29wYWNpdHk6Ljg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgU3RhdGlvbk1hcFNlbGVjdG9yQ29tcG9uZW50IGV4dGVuZHMgTWFwU2VsZWN0b3JDb21wb25lbnQ8U3RhdGlvbj4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2x1c3RlcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN0YXR1c0ludGVydmFsczogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIElnbm9yZXMgYWxsIFN0YXR1c2ludGVydmFscyB3aGVyZSB0aGUgdGltZXN0YW1wIGlzIGJlZm9yZSBhIGdpdmVuIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyBhbmQgZHJhd3MgaW5zdGVhZCB0aGUgZGVmYXVsdCBtYXJrZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaWdub3JlU3RhdHVzSW50ZXJ2YWxJZkJlZm9yZUR1cmF0aW9uID0gSW5maW5pdHk7XG5cbiAgICBwcml2YXRlIG1hcmtlckZlYXR1cmVHcm91cDogTC5GZWF0dXJlR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHN0YXR1c0ludGVydmFsUmVzb2x2ZXI6IFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiBjaGFuZ2VzLnN0YXR1c0ludGVydmFscykgeyB0aGlzLmRyYXdHZW9tZXRyaWVzKCk7IH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJhd0dlb21ldHJpZXMoKSB7XG4gICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMubWFwICYmIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwKSB7IHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwKTsgfVxuICAgICAgICBpZiAodGhpcy5zdGF0dXNJbnRlcnZhbHMgJiYgdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIucGhlbm9tZW5vbikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVWYWx1ZWRNYXJrZXJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXRpb25HZW9tZXRyaWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZhbHVlZE1hcmtlcnMoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBGaWx0ZXI6IFBhcmFtZXRlckZpbHRlciA9IHtcbiAgICAgICAgICAgIHBoZW5vbWVub246IHRoaXMuZmlsdGVyLnBoZW5vbWVub24sXG4gICAgICAgICAgICBleHBhbmRlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzKHRoaXMuc2VydmljZVVybCwgdGVtcEZpbHRlcikuc3Vic2NyaWJlKCh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcbiAgICAgICAgICAgIGNvbnN0IG9ic0xpc3Q6IEFycmF5PE9ic2VydmFibGU8VGltZXNlcmllc0V4dHJhcz4+ID0gW107XG4gICAgICAgICAgICB0aW1lc2VyaWVzLmZvckVhY2goKHRzOiBUaW1lc2VyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzID0gdGhpcy5hcGlJbnRlcmZhY2UuZ2V0VGltZXNlcmllc0V4dHJhcyh0cy5pZCwgdGhpcy5zZXJ2aWNlVXJsKTtcbiAgICAgICAgICAgICAgICBvYnNMaXN0LnB1c2gob2JzKTtcbiAgICAgICAgICAgICAgICBvYnMuc3Vic2NyaWJlKChleHRyYXM6IFRpbWVzZXJpZXNFeHRyYXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hcmtlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuaWdub3JlU3RhdHVzSW50ZXJ2YWxJZkJlZm9yZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnN0YXR1c0ludGVydmFsUmVzb2x2ZXIuZ2V0TWF0Y2hpbmdJbnRlcnZhbCh0cy5sYXN0VmFsdWUudmFsdWUsIGV4dHJhcy5zdGF0dXNJbnRlcnZhbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcnZhbCkgeyBtYXJrZXIgPSB0aGlzLmNyZWF0ZUNvbG9yZWRNYXJrZXIodHMuc3RhdGlvbiwgaW50ZXJ2YWwuY29sb3IpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXJrZXIpIHsgbWFya2VyID0gdGhpcy5jcmVhdGVEZWZhdWx0Q29sb3JlZE1hcmtlcih0cy5zdGF0aW9uKTsgfVxuICAgICAgICAgICAgICAgICAgICBtYXJrZXIub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQodHMuc3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihtYXJrZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvcmtKb2luKG9ic0xpc3QpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tVG9NYXJrZXJCb3VuZHModGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcCkgeyB0aGlzLm1hcC5pbnZhbGlkYXRlU2l6ZSgpOyB9XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tYXApIHsgdGhpcy5tYXJrZXJGZWF0dXJlR3JvdXAuYWRkVG8odGhpcy5tYXApOyB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ29sb3JlZE1hcmtlcihzdGF0aW9uOiBTdGF0aW9uLCBjb2xvcjogc3RyaW5nKTogTGF5ZXIge1xuICAgICAgICBpZiAodGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVGaWxsZWRNYXJrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRmlsbGVkTWFya2VyKHN0YXRpb24sIGNvbG9yLCAxMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEZWZhdWx0Q29sb3JlZE1hcmtlcihzdGF0aW9uOiBTdGF0aW9uKTogTGF5ZXIge1xuICAgICAgICBpZiAodGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0RmlsbGVkTWFya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0RmlsbGVkTWFya2VyKHN0YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uLCAnIzAwMCcsIDEwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUZpbGxlZE1hcmtlcihzdGF0aW9uOiBTdGF0aW9uLCBjb2xvcjogc3RyaW5nLCByYWRpdXM6IG51bWJlcik6IExheWVyIHtcbiAgICAgICAgbGV0IGdlb21ldHJ5OiBMYXllcjtcbiAgICAgICAgaWYgKHN0YXRpb24uZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBzdGF0aW9uLmdlb21ldHJ5IGFzIEdlb0pTT04uUG9pbnQ7XG4gICAgICAgICAgICBnZW9tZXRyeSA9IEwuY2lyY2xlTWFya2VyKFtwb2ludC5jb29yZGluYXRlc1sxXSwgcG9pbnQuY29vcmRpbmF0ZXNbMF1dLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAxMCxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvbWV0cnkgPSBMLmdlb0pTT04oc3RhdGlvbi5nZW9tZXRyeSwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiAoZmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTogMC44LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICAgICAgICBnZW9tZXRyeS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQoc3RhdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU3RhdGlvbkdlb21ldHJpZXMoKSB7XG4gICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFN0YXRpb25zKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5tYXJrZXJDbHVzdGVyR3JvdXAoeyBhbmltYXRlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyRmVhdHVyZUdyb3VwID0gTC5mZWF0dXJlR3JvdXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gdGhpcy5jcmVhdGVEZWZhdWx0R2VvbWV0cnkoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlcikgeyB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRMYXllcihtYXJrZXIpOyB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckZlYXR1cmVHcm91cC5hZGRUbyh0aGlzLm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubWFya2VyRmVhdHVyZUdyb3VwLmdldEJvdW5kcygpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9SZXN1bHRzRm91bmQuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEZWZhdWx0R2VvbWV0cnkoc3RhdGlvbjogU3RhdGlvbik6IExheWVyIHtcbiAgICAgICAgaWYgKHRoaXMubWFya2VyU2VsZWN0b3JHZW5lcmF0b3IgJiYgdGhpcy5tYXJrZXJTZWxlY3RvckdlbmVyYXRvci5jcmVhdGVEZWZhdWx0R2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmtlclNlbGVjdG9yR2VuZXJhdG9yLmNyZWF0ZURlZmF1bHRHZW9tZXRyeShzdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGlvbi5nZW9tZXRyeSkge1xuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBMLmdlb0pTT04oc3RhdGlvbi5nZW9tZXRyeSk7XG4gICAgICAgICAgICBnZW9tZXRyeS5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdChzdGF0aW9uKSk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHN0YXRpb24uaWQgKyAnIGhhcyBubyBnZW9tZXRyeScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0ICdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInO1xuXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBIYXNMb2FkYWJsZUNvbnRlbnQsXG4gICAgSURhdGFzZXQsXG4gICAgTG9jYXRlZFByb2ZpbGVEYXRhRW50cnksXG4gICAgTWl4aW4sXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBNYXBDYWNoZSB9IGZyb20gJy4uLy4uL2Jhc2UvbWFwLWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYWplY3RvcnlSZXN1bHQgfSBmcm9tICcuLi9tb2RlbC90cmFqZWN0b3J5LXJlc3VsdCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXByb2ZpbGUtdHJhamVjdG9yeS1tYXAtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC13cmFwcGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XG4gIDxkaXYgW2F0dHIuaWRdPVwibWFwSWRcIiBjbGFzcz1cIm1hcC12aWV3ZXJcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7cG9zaXRpb246cmVsYXRpdmV9Omhvc3QgLm1hcC12aWV3ZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX06aG9zdCAubWFwLW5vdGlmaWVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6MTBweDt6LWluZGV4OjEwMDE7d2lkdGg6MTIwcHg7aGVpZ2h0OjcwcHg7cGFkZGluZzo1cHg7b3BhY2l0eTouODt0ZXh0LWFsaWduOmNlbnRlcn1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlVHJhamVjdG9yeU1hcFNlbGVjdG9yQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBNYXBTZWxlY3RvckNvbXBvbmVudDxUcmFqZWN0b3J5UmVzdWx0PlxuICAgIGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkVGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZUxpc3REZXRlcm1pbmVkOiBFdmVudEVtaXR0ZXI8bnVtYmVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBsYXllcjogTC5GZWF0dXJlR3JvdXA7XG4gICAgcHJpdmF0ZSBkYXRhOiBMb2NhdGVkUHJvZmlsZURhdGFFbnRyeVtdO1xuICAgIHByaXZhdGUgZGF0YXNldDogSURhdGFzZXQ7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICB3ZWlnaHQ6IDUsXG4gICAgICAgIG9wYWNpdHk6IDAuNjVcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRTdHlsZTogTC5QYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6ICdibHVlJyxcbiAgICAgICAgd2VpZ2h0OiA3LFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgbWFwQ2FjaGU6IE1hcENhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1hcENhY2hlLCBkaWZmZXJzLCBjZCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmIChjaGFuZ2VzLnNlbGVjdGVkVGltZXNwYW4gJiYgdGhpcy5zZWxlY3RlZFRpbWVzcGFuICYmIHRoaXMubWFwKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTWFwKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRMYXllcigpO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaW1lc3Bhbi5mcm9tIDw9IGVudHJ5LnRpbWVzdGFtcCAmJiBlbnRyeS50aW1lc3RhbXAgPD0gdGhpcy5zZWxlY3RlZFRpbWVzcGFuLnRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkTGF5ZXIodGhpcy5jcmVhdGVHZW9Kc29uKGVudHJ5LCB0aGlzLmRhdGFzZXQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkVG8odGhpcy5tYXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRyYXdHZW9tZXRyaWVzKCkge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldERhdGFzZXRzKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpLnN1YnNjcmliZSgoZGF0YXNldHMpID0+IHtcbiAgICAgICAgICAgIGRhdGFzZXRzLmZvckVhY2goKGRhdGFzZXQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXQgPSBkYXRhc2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuID0gbmV3IFRpbWVzcGFuKGRhdGFzZXQuZmlyc3RWYWx1ZS50aW1lc3RhbXAsIGRhdGFzZXQubGFzdFZhbHVlLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RGF0YTxMb2NhdGVkUHJvZmlsZURhdGFFbnRyeT4oZGF0YXNldC5pZCwgdGhpcy5zZXJ2aWNlVXJsLCB0aW1lc3BhbilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwICYmIGRhdGEudmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRMYXllcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVsaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmFsdWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VvanNvbiA9IHRoaXMuY3JlYXRlR2VvSnNvbihlbnRyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaXN0LnB1c2goZW50cnkudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5hZGRMYXllcihnZW9qc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVGltZUxpc3REZXRlcm1pbmVkLmVtaXQodGltZWxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkVG8odGhpcy5tYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvTWFya2VyQm91bmRzKHRoaXMubGF5ZXIuZ2V0Qm91bmRzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TGF5ZXIoKSB7XG4gICAgICAgIHRoaXMubGF5ZXIgPSBMLm1hcmtlckNsdXN0ZXJHcm91cCh7IGFuaW1hdGU6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJNYXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLmxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlR2VvSnNvbihwcm9maWxlRGF0YUVudHJ5OiBMb2NhdGVkUHJvZmlsZURhdGFFbnRyeSwgZGF0YXNldDogSURhdGFzZXQpOiBMLkdlb0pTT04ge1xuICAgICAgICBjb25zdCBnZW9qc29uID0gbmV3IEwuR2VvSlNPTihwcm9maWxlRGF0YUVudHJ5Lmdlb21ldHJ5KTtcbiAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIGdlb2pzb24ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGRhdGFzZXQsXG4gICAgICAgICAgICAgICAgZGF0YTogcHJvZmlsZURhdGFFbnRyeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZW9qc29uLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW9qc29uLnNldFN0eWxlKHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgICAgICAgICAgZ2VvanNvbi5icmluZ1RvRnJvbnQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdlb2pzb24ub24oJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgZ2VvanNvbi5zZXRTdHlsZSh0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2VvanNvbjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRNYXBNb2R1bGUgfSBmcm9tICcuLi9iYXNlL21hcC5tb2R1bGUnO1xuaW1wb3J0IHsgTGFzdFZhbHVlTWFwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL2xhc3QtdmFsdWUtbWFwLXNlbGVjdG9yL2xhc3QtdmFsdWUtbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9wbGF0Zm9ybS1tYXAtc2VsZWN0b3IvcGxhdGZvcm0tbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciB9IGZyb20gJy4vc2VydmljZXMvbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlJztcbmltcG9ydCB7IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0aW9uTWFwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3N0YXRpb24tbWFwLXNlbGVjdG9yL3N0YXRpb24tbWFwLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9maWxlVHJhamVjdG9yeU1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90cmFqZWN0b3J5LW1hcC1zZWxlY3Rvci90cmFqZWN0b3J5LW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICAgIFBsYXRmb3JtTWFwU2VsZWN0b3JDb21wb25lbnQsXG4gICAgU3RhdGlvbk1hcFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFByb2ZpbGVUcmFqZWN0b3J5TWFwU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTGFzdFZhbHVlTWFwU2VsZWN0b3JDb21wb25lbnRcbl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVsZ29sYW5kTWFwU2VsZWN0b3JNb2R1bGVDb25maWcge1xuICAgIGxhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZTogVHlwZTxMYXN0VmFsdWVMYWJlbEdlbmVyYXRvcj47XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENPTVBPTkVOVFNcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgICAgICBIZWxnb2xhbmRNYXBNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ09NUE9ORU5UU1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IsIHVzZUNsYXNzOiBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvclNlcnZpY2UgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTWFwU2VsZWN0b3JNb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogSGVsZ29sYW5kTWFwU2VsZWN0b3JNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLCB1c2VDbGFzczogY29uZmlnICYmIGNvbmZpZy5sYXN0VmFsdWVMYWJlbEdlbmVyYXRvclNlcnZpY2UgfHwgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JTZXJ2aWNlIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsibWFwIiwiSW5qZWN0YWJsZSIsIk5nTW9kdWxlIiwiRXZlbnRFbWl0dGVyIiwiTC5tYXAiLCJMLnRpbGVMYXllciIsIkwuY29udHJvbCIsIklucHV0IiwiT3V0cHV0IiwiaHR0cCIsIkh0dHBQYXJhbXMiLCJIdHRwU2VydmljZSIsInRzbGliXzEuX19leHRlbmRzIiwiR2VvSlNPTiIsIkwuZ2VvSlNPTiIsIkwuY2lyY2xlTWFya2VyIiwiQ29tcG9uZW50IiwiS2V5VmFsdWVEaWZmZXJzIiwiTC5tYXJrZXIiLCJMLk1hcmtlciIsIkNPTVBPTkVOVFMiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkhlbGdvbGFuZENvcmVNb2R1bGUiLCJmZWF0dXJlR3JvdXAiLCJzd2l0Y2hNYXAiLCJ0YXAiLCJmb3JrSm9pbiIsIk9ic2VydmFibGUiLCJjaXJjbGVNYXJrZXIiLCJnZW9KU09OIiwibWFya2VyIiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJEYXRhc2V0QXBpSW50ZXJmYWNlIiwiU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UiLCJNaXhpbiIsIkhhc0xvYWRhYmxlQ29udGVudCIsIkwubWFya2VyQ2x1c3Rlckdyb3VwIiwiTC5mZWF0dXJlR3JvdXAiLCJMLmRpdkljb24iLCJUaW1lc3BhbiIsIkwuR2VvSlNPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7OzRCQU15QyxJQUFJLEdBQUcsRUFBZTs7Ozs7O1FBRXBELHlCQUFNOzs7O3NCQUFDLEVBQVU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7UUFHMUIseUJBQU07Ozs7O3NCQUFDLEVBQVUsRUFBRUEsTUFBVTtnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFQSxNQUFHLENBQUMsQ0FBQzs7Ozs7O1FBR3hCLHlCQUFNOzs7O3NCQUFDLEVBQVU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7OztRQUcxQiw0QkFBUzs7OztzQkFBQyxFQUFVO2dCQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7b0JBbEJ2Q0MsZUFBVTs7dUJBSFg7Ozs7Ozs7QUNBQTtJQUlBLElBQU0sVUFBVSxHQUFHLEVBQ2xCLENBQUM7Ozs7O29CQUVEQyxhQUFRLFNBQUM7d0JBQ1IsWUFBWSxFQUFFOzRCQUNaLFVBQVU7eUJBQ1g7d0JBQ0QsT0FBTyxFQUFFLEVBQ1I7d0JBQ0QsT0FBTyxFQUFFOzRCQUNQLFVBQVU7eUJBQ1g7d0JBQ0QsU0FBUyxFQUFFOzRC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