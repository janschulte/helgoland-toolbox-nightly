(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('@ngx-translate/core'), require('rxjs/Observable'), require('@angular/common'), require('@helgoland/depiction')) :
    typeof define === 'function' && define.amd ? define('@helgoland/selector', ['exports', '@angular/core', '@helgoland/core', '@ngx-translate/core', 'rxjs/Observable', '@angular/common', '@helgoland/depiction'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.selector = {}),global.ng.core,null,null,global.rxjs.Observable,global.ng.common,null));
}(this, (function (exports,core,core$1,core$2,Observable,common,depiction) { 'use strict';

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ExtendedTimeseries = (function (_super) {
        __extends(ExtendedTimeseries, _super);
        function ExtendedTimeseries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ExtendedTimeseries;
    }(core$1.Timeseries));
    var DatasetByStationSelectorComponent = (function () {
        function DatasetByStationSelectorComponent(apiInterface) {
            this.apiInterface = apiInterface;
            this.defaultSelected = false;
            this.onSelectionChanged = new core.EventEmitter();
            this.timeseriesList = [];
        }
        /**
         * @return {?}
         */
        DatasetByStationSelectorComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.station) {
                    /** @type {?} */
                    var stationId = this.station.properties && this.station.properties.id ? this.station.properties.id : this.station.id;
                    this.apiInterface.getStation(stationId, this.url)
                        .subscribe(function (station) {
                        _this.station = station;
                        _this.counter = 0;
                        for (var id in _this.station.properties.timeseries) {
                            if (_this.station.properties.timeseries.hasOwnProperty(id)) {
                                _this.counter++;
                                _this.apiInterface.getSingleTimeseries(id, _this.url)
                                    .subscribe(function (result) {
                                    _this.prepareResult(/** @type {?} */ (result), _this.defaultSelected);
                                    _this.counter--;
                                }, function (error) {
                                    _this.counter--;
                                });
                            }
                        }
                    });
                }
            };
        /**
         * @param {?} timeseries
         * @return {?}
         */
        DatasetByStationSelectorComponent.prototype.toggle = /**
         * @param {?} timeseries
         * @return {?}
         */
            function (timeseries) {
                timeseries.selected = !timeseries.selected;
                this.updateSelection();
            };
        /**
         * @param {?} result
         * @param {?} selection
         * @return {?}
         */
        DatasetByStationSelectorComponent.prototype.prepareResult = /**
         * @param {?} result
         * @param {?} selection
         * @return {?}
         */
            function (result, selection) {
                result.selected = selection;
                this.timeseriesList.push(result);
                this.updateSelection();
            };
        /**
         * @return {?}
         */
        DatasetByStationSelectorComponent.prototype.updateSelection = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var selection = this.timeseriesList.filter(function (entry) { return entry.selected; });
                this.onSelectionChanged.emit(selection);
            };
        DatasetByStationSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-dataset-by-station-selector',
                        template: "<div class=\"item\" *ngFor=\"let timeseries of timeseriesList\" (click)=\"toggle(timeseries)\">\n    <div *ngIf=\"counter\">\n        {{counter}} timeseries are loading...\n    </div>\n    <div [ngClass]=\"{'selected': timeseries.selected}\">\n        <div>\n            {{timeseries.parameters.phenomenon.label}}\n        </div>\n        <span>{{timeseries.parameters.procedure.label}}</span>\n        <span *ngIf=\"timeseries.parameters.category.label && timeseries.parameters.category.label != timeseries.parameters.phenomenon.label\">({{timeseries.parameters.category.label}})</span>\n        <div class=\"additionalInfo\" *ngIf=\"timeseries.lastValue\">\n            <span>{{timeseries.lastValue.value}}</span>\n            <span>{{timeseries.uom}}</span>\n            <span>({{timeseries.lastValue.timestamp| date: 'short'}})</span>\n        </div>\n    </div>\n</div>\n",
                        styles: [":host .item+.item{padding-top:10px}:host .item.error{display:none}:host .item label{margin-bottom:0}"]
                    },] },
        ];
        /** @nocollapse */
        DatasetByStationSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface }
            ];
        };
        DatasetByStationSelectorComponent.propDecorators = {
            station: [{ type: core.Input }],
            url: [{ type: core.Input }],
            defaultSelected: [{ type: core.Input }],
            phenomenonId: [{ type: core.Input }],
            onSelectionChanged: [{ type: core.Output }]
        };
        return DatasetByStationSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ListSelectorService = (function () {
        function ListSelectorService() {
            this.cache = new Map();
        }
        ListSelectorService.decorators = [
            { type: core.Injectable },
        ];
        return ListSelectorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Component to select an item out of a list of provider with a given filter combination.
     */
    var ListSelectorComponent = (function () {
        function ListSelectorComponent(listSelectorService, apiInterface, apiMapping) {
            this.listSelectorService = listSelectorService;
            this.apiInterface = apiInterface;
            this.apiMapping = apiMapping;
            this.onDatasetSelection = new core.EventEmitter();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        ListSelectorComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                var _this = this;
                if (changes["providerList"] && changes["providerList"].currentValue) {
                    if (this.selectorId && this.listSelectorService.cache.has(this.selectorId)
                        && this.isEqual(this.providerList, this.listSelectorService.providerList)) {
                        this.parameters = this.listSelectorService.cache.get(this.selectorId);
                        /** @type {?} */
                        var idx = this.parameters.findIndex(function (entry) {
                            return entry.isDisabled;
                        }) - 1;
                        this.activePanel = this.selectorId + '-' + idx;
                    }
                    else {
                        if (this.selectorId) {
                            this.listSelectorService.cache.set(this.selectorId, this.parameters);
                        }
                        // create filterlist for first parameter entry
                        this.parameters[0].filterList = this.providerList.map(function (entry) {
                            entry.filter = Object.assign({}, _this.filter);
                            return entry;
                        });
                        this.listSelectorService.providerList = this.providerList;
                        // open first tab
                        this.activePanel = this.selectorId + '-0';
                        this.parameters[0].isDisabled = false;
                        // disable parameterList
                        for (var i = 1; i < this.parameters.length; i++) {
                            this.parameters[i].isDisabled = true;
                        }
                    }
                }
            };
        /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        ListSelectorComponent.prototype.itemSelected = /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
            function (item, index) {
                var _this = this;
                if (index < this.parameters.length - 1) {
                    this.parameters[index].headerAddition = item.label;
                    this.activePanel = this.selectorId + '-' + (index + 1);
                    this.parameters[index + 1].isDisabled = false;
                    // copy filter to new item
                    this.parameters[index + 1].filterList = JSON.parse(JSON.stringify(item.filterList));
                    // add filter for selected item to next
                    this.parameters[index + 1].filterList.forEach(function (entry) { return entry["filter"][_this.parameters[index].type] = entry["itemId"]; });
                    for (var i = index + 2; i < this.parameters.length; i++) {
                        this.parameters[i].isDisabled = true;
                    }
                    for (var j = index + 1; j < this.parameters.length; j++) {
                        this.parameters[j].headerAddition = '';
                    }
                }
                else {
                    item.filterList.forEach(function (entry) {
                        entry.filter[_this.parameters[index].type] = entry.itemId;
                        _this.openDataset(entry.url, entry.filter);
                    });
                }
            };
        /**
         * @param {?} url
         * @param {?} params
         * @return {?}
         */
        ListSelectorComponent.prototype.openDataset = /**
         * @param {?} url
         * @param {?} params
         * @return {?}
         */
            function (url, params) {
                var _this = this;
                this.apiMapping.getApiVersion(url).subscribe(function (apiVersionId) {
                    if (apiVersionId === core$1.DatasetApiVersion.V2) {
                        _this.apiInterface.getDatasets(url, params).subscribe(function (result) { return _this.onDatasetSelection.emit(result); });
                    }
                    else if (apiVersionId === core$1.DatasetApiVersion.V1) {
                        _this.apiInterface.getTimeseries(url, params).subscribe(function (result) { return _this.onDatasetSelection.emit(result); });
                    }
                });
            };
        /**
         * @param {?} listOne
         * @param {?} listTwo
         * @return {?}
         */
        ListSelectorComponent.prototype.isEqual = /**
         * @param {?} listOne
         * @param {?} listTwo
         * @return {?}
         */
            function (listOne, listTwo) {
                /** @type {?} */
                var match = true;
                if (listOne.length === listTwo.length) {
                    listOne.forEach(function (entryOne) {
                        /** @type {?} */
                        var found = listTwo.find(function (entryTwo) {
                            if (entryOne.id === entryTwo.id && entryOne.url === entryTwo.url) {
                                return true;
                            }
                            return false;
                        });
                        if (!found) {
                            match = false;
                        }
                    });
                }
                else {
                    match = false;
                }
                return match;
            };
        ListSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-list-selector',
                        template: "<div>{{activePanel}}</div>\n<div *ngFor=\"let param of parameters; let i = index\">\n  <h3>\n    <span>{{param.header}}</span>\n    <span *ngIf=\"param.headerAddition\">-</span>\n    <span>{{param.headerAddition}}</span>\n  </h3>\n  <div *ngIf=\"!param.isDisabled\">\n    <n52-multi-service-filter-selector [endpoint]=\"param.type\" [filterList]=\"param.filterList\" (onItemSelected)=\"itemSelected($event, i)\"></n52-multi-service-filter-selector>\n  </div>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        ListSelectorComponent.ctorParameters = function () {
            return [
                { type: ListSelectorService },
                { type: core$1.DatasetApiInterface },
                { type: core$1.DatasetApiMapping }
            ];
        };
        ListSelectorComponent.propDecorators = {
            parameters: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            providerList: [{ type: core.Input }],
            selectorId: [{ type: core.Input }],
            onDatasetSelection: [{ type: core.Output }]
        };
        return ListSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var MultiServiceFilterEndpoint = {
        offering: 'offering',
        phenomenon: 'phenomenon',
        procedure: 'procedure',
        feature: 'feature',
        category: 'category',
        platform: 'platform',
        dataset: 'dataset',
    };
    /**
     * Component to select an item out of a list of provider with a given filter combination.
     */
    var MultiServiceFilterSelectorComponent = (function (_super) {
        __extends(MultiServiceFilterSelectorComponent, _super);
        function MultiServiceFilterSelectorComponent(apiInterface, translate) {
            var _this = _super.call(this, translate) || this;
            _this.apiInterface = apiInterface;
            _this.translate = translate;
            _this.onItemSelected = new core.EventEmitter();
            _this.loading = 0;
            return _this;
        }
        /**
         * @return {?}
         */
        MultiServiceFilterSelectorComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                this.loadItems();
            };
        /**
         * @param {?} item
         * @return {?}
         */
        MultiServiceFilterSelectorComponent.prototype.onSelectItem = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.onItemSelected.emit(item);
            };
        /**
         * @return {?}
         */
        MultiServiceFilterSelectorComponent.prototype.languageChanged = /**
         * @return {?}
         */
            function () {
                this.loadItems();
            };
        /**
         * @return {?}
         */
        MultiServiceFilterSelectorComponent.prototype.loadItems = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.items = [];
                this.filterList.forEach(function (entry) {
                    _this.loading++;
                    /** @type {?} */
                    var filter = entry.filter || {};
                    switch (_this.endpoint) {
                        case MultiServiceFilterEndpoint.offering:
                            _this.apiInterface.getOfferings(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        case MultiServiceFilterEndpoint.phenomenon:
                            _this.apiInterface.getPhenomena(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        case MultiServiceFilterEndpoint.procedure:
                            _this.apiInterface.getProcedures(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        case MultiServiceFilterEndpoint.feature:
                            _this.apiInterface.getFeatures(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        case MultiServiceFilterEndpoint.category:
                            _this.apiInterface.getCategories(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        case MultiServiceFilterEndpoint.platform:
                            _this.apiInterface.getPlatforms(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        case MultiServiceFilterEndpoint.dataset:
                            _this.apiInterface.getDatasets(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                            break;
                        default:
                            console.error('Wrong endpoint: ' + _this.endpoint);
                            _this.loading--;
                    }
                });
            };
        /**
         * @return {?}
         */
        MultiServiceFilterSelectorComponent.prototype.errorOnLoading = /**
         * @return {?}
         */
            function () {
                this.loading--;
            };
        /**
         * @param {?} res
         * @param {?} prevfilter
         * @param {?} url
         * @param {?} service
         * @return {?}
         */
        MultiServiceFilterSelectorComponent.prototype.setItems = /**
         * @param {?} res
         * @param {?} prevfilter
         * @param {?} url
         * @param {?} service
         * @return {?}
         */
            function (res, prevfilter, url, service) {
                var _this = this;
                this.loading--;
                res.forEach(function (entry) {
                    /** @type {?} */
                    var filter = {
                        filter: prevfilter,
                        itemId: entry.id,
                        url: url,
                        service: service
                    };
                    /** @type {?} */
                    var item = _this.items.find(function (elem) {
                        if (elem.label === entry.label) {
                            return true;
                        }
                    });
                    if (item) {
                        item.filterList.push(filter);
                    }
                    else {
                        entry.filterList = [filter];
                        _this.items.push(entry);
                    }
                });
            };
        MultiServiceFilterSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-multi-service-filter-selector',
                        template: "<div *ngIf=\"loading > 0\">\n    <span>loading...</span>\n</div>\n<div *ngFor=\"let item of items\" (click)=\"onSelectItem(item)\">\n    {{item.id}} - {{item.label}}\n</div>"
                    },] },
        ];
        /** @nocollapse */
        MultiServiceFilterSelectorComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$2.TranslateService }
            ];
        };
        MultiServiceFilterSelectorComponent.propDecorators = {
            endpoint: [{ type: core.Input }],
            filterList: [{ type: core.Input }],
            onItemSelected: [{ type: core.Output }]
        };
        return MultiServiceFilterSelectorComponent;
    }(core$1.LanguageChangNotifier));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Component to select an item out of a list of provider with a given filter combination.
     */
    var ServiceFilterSelectorComponent = (function (_super) {
        __extends(ServiceFilterSelectorComponent, _super);
        function ServiceFilterSelectorComponent(translate, apiInterface) {
            var _this = _super.call(this, translate) || this;
            _this.translate = translate;
            _this.apiInterface = apiInterface;
            _this.onItemSelected = new core.EventEmitter();
            return _this;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        ServiceFilterSelectorComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes["endpoint"]) {
                    this.loadItems();
                }
            };
        /**
         * @param {?} item
         * @return {?}
         */
        ServiceFilterSelectorComponent.prototype.onSelectItem = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.onItemSelected.emit(item);
            };
        /**
         * @return {?}
         */
        ServiceFilterSelectorComponent.prototype.languageChanged = /**
         * @return {?}
         */
            function () {
                this.loadItems();
            };
        /**
         * @return {?}
         */
        ServiceFilterSelectorComponent.prototype.loadItems = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.loading = true;
                switch (this.endpoint) {
                    case 'offering':
                        this.apiInterface.getOfferings(this.serviceUrl, this.filter)
                            .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                        break;
                    case 'phenomenon':
                        this.apiInterface.getPhenomena(this.serviceUrl, this.filter)
                            .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                        break;
                    case 'procedure':
                        this.apiInterface.getProcedures(this.serviceUrl, this.filter)
                            .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                        break;
                    case 'category':
                        this.apiInterface.getCategories(this.serviceUrl, this.filter)
                            .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                        break;
                    case 'feature':
                        this.apiInterface.getFeatures(this.serviceUrl, this.filter)
                            .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                        break;
                    default:
                        console.error('Wrong endpoint: ' + this.endpoint);
                }
            };
        /**
         * @return {?}
         */
        ServiceFilterSelectorComponent.prototype.errorOnLoading = /**
         * @return {?}
         */
            function () {
                this.loading = false;
            };
        /**
         * @param {?} res
         * @return {?}
         */
        ServiceFilterSelectorComponent.prototype.setItems = /**
         * @param {?} res
         * @return {?}
         */
            function (res) {
                if (res instanceof Array) {
                    this.items = res;
                }
                else {
                    this.items = [];
                }
                this.loading = false;
            };
        ServiceFilterSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-service-filter-selector',
                        template: "<div *ngIf=\"loading\">\n    loading...\n</div>\n<div *ngIf=\"!loading && items?.length === 0\">\n    no results found\n</div>\n<div class=\"selector-entry\" *ngFor=\"let item of items\" (click)=\"onSelectItem(item)\" [ngClass]=\"{'selected': selectionId === item.id}\">\n    <n52-label-mapper label=\"{{item.label}}\"></n52-label-mapper>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        ServiceFilterSelectorComponent.ctorParameters = function () {
            return [
                { type: core$2.TranslateService },
                { type: core$1.DatasetApiInterface }
            ];
        };
        ServiceFilterSelectorComponent.propDecorators = {
            endpoint: [{ type: core.Input }],
            serviceUrl: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            selectionId: [{ type: core.Input }],
            onItemSelected: [{ type: core.Output }]
        };
        return ServiceFilterSelectorComponent;
    }(core$1.LanguageChangNotifier));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ServiceSelectorService = (function () {
        function ServiceSelectorService(apiInterface) {
            this.apiInterface = apiInterface;
        }
        /**
         * @param {?} url
         * @param {?} blacklist
         * @param {?} filter
         * @return {?}
         */
        ServiceSelectorService.prototype.fetchServicesOfAPI = /**
         * @param {?} url
         * @param {?} blacklist
         * @param {?} filter
         * @return {?}
         */
            function (url, blacklist, filter) {
                var _this = this;
                return new Observable.Observable(function (observer) {
                    _this.apiInterface.getServices(url, filter)
                        .subscribe(function (services) {
                        if (services && services instanceof Array) {
                            /** @type {?} */
                            var usableServices = services.map(function (service) {
                                if (!_this.isServiceBlacklisted(service.id, url, blacklist)) {
                                    return service;
                                }
                            });
                            observer.next(usableServices);
                            observer.complete();
                        }
                    }, function (error) {
                        observer.error(error);
                        observer.complete();
                    });
                });
            };
        /**
         * @param {?} serviceID
         * @param {?} url
         * @param {?} blacklist
         * @return {?}
         */
        ServiceSelectorService.prototype.isServiceBlacklisted = /**
         * @param {?} serviceID
         * @param {?} url
         * @param {?} blacklist
         * @return {?}
         */
            function (serviceID, url, blacklist) {
                /** @type {?} */
                var isBlacklisted = false;
                blacklist.forEach(function (entry) {
                    if (entry.serviceId === serviceID && entry.apiUrl === url) {
                        isBlacklisted = true;
                    }
                });
                return isBlacklisted;
            };
        ServiceSelectorService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        ServiceSelectorService.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface }
            ];
        };
        return ServiceSelectorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Component to select an item out of a list of provider with a given filter combination.
     */
    var ServiceSelectorComponent = (function () {
        function ServiceSelectorComponent(serviceSelectorService) {
            this.serviceSelectorService = serviceSelectorService;
            this.onServiceSelected = new core.EventEmitter();
            this.loadingCount = 0;
        }
        /**
         * @return {?}
         */
        ServiceSelectorComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.filter) {
                    this.filter = {};
                }
                if (!this.providerBlacklist) {
                    this.providerBlacklist = [];
                }
                if (this.datasetApiList) {
                    this.loadingCount = this.datasetApiList.length;
                    this.services = [];
                    this.unResolvableServices = [];
                    this.datasetApiList.forEach(function (api) {
                        _this.serviceSelectorService.fetchServicesOfAPI(api.url, _this.providerBlacklist, _this.filter)
                            .subscribe(function (res) {
                            _this.loadingCount--;
                            if (res && res instanceof Array) {
                                res.forEach(function (entry) {
                                    if (entry.quantities.platforms > 0
                                        || _this.supportStations && entry.quantities.stations > 0) {
                                        _this.services.push(entry);
                                    }
                                });
                            }
                            _this.services.sort(function (a, b) {
                                if (a.label < b.label) {
                                    return -1;
                                }
                                if (a.label > b.label) {
                                    return 1;
                                }
                                return 0;
                            });
                        }, function (error) {
                            if (_this.showUnresolvableServices) {
                                _this.unResolvableServices.push(api);
                            }
                            _this.loadingCount--;
                        });
                    });
                }
            };
        /**
         * @param {?} service
         * @return {?}
         */
        ServiceSelectorComponent.prototype.isSelected = /**
         * @param {?} service
         * @return {?}
         */
            function (service) {
                if (!this.selectedService) {
                    return false;
                }
                return this.selectedService.id === service.id && this.selectedService.apiUrl === service.apiUrl;
            };
        /**
         * @param {?} service
         * @return {?}
         */
        ServiceSelectorComponent.prototype.selectService = /**
         * @param {?} service
         * @return {?}
         */
            function (service) {
                this.onServiceSelected.emit(service);
            };
        ServiceSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-service-selector',
                        template: "<div *ngIf=\"loadingCount > 0\">\n  <span>Requesting {{loadingCount}} providers...</span>\n</div>\n<div class=\"service-list\">\n  <div class=\"service-item\" *ngFor=\"let service of services\" (click)=\"selectService(service)\" [ngClass]=\"{'selected': isSelected(service)}\">\n    <div>{{service.label}}</div>\n    <div class=\"small\">{{service.type}}, {{service.version}}\n    </div>\n    <div class=\"small\" *ngIf=\"service.apiUrl\">{{'service-selector.service-url' | translate}}: {{service.apiUrl}}</div>\n    <div class=\"small\">\n      <span *ngIf=\"service.quantities.stations !== undefined\">{{'service-selector.stations' | translate}}: {{service.quantities.stations}}</span>\n      <span *ngIf=\"service.quantities.platforms !== undefined\">{{'service-selector.platforms' | translate}}: {{service.quantities.platforms}}</span>\n      <span *ngIf=\"service.quantities.timeseries !== undefined\">{{'service-selector.timeseries' | translate}}: {{service.quantities.timeseries}}</span>\n      <span *ngIf=\"service.quantities.datasets !== undefined\">{{'service-selector.datasets' | translate}}: {{service.quantities.datasets}}</span>\n      <span>{{'service-selector.phenomena' | translate}}: {{service.quantities.phenomena}}</span>\n    </div>\n  </div>\n  <div *ngFor=\"let item of unResolvableServices\">\n    <div style=\"color: red;\">{{item.name}} is currently not reachable</div>\n  </div>\n</div>\n",
                        styles: [":host .service-list .service-item{padding:5px}:host .service-list .service-item+.add-service,:host .service-list .service-item+.service-item{margin-top:10px}:host .service-list .service-item:hover{cursor:pointer}"]
                    },] },
        ];
        /** @nocollapse */
        ServiceSelectorComponent.ctorParameters = function () {
            return [
                { type: ServiceSelectorService }
            ];
        };
        ServiceSelectorComponent.propDecorators = {
            datasetApiList: [{ type: core.Input }],
            providerBlacklist: [{ type: core.Input }],
            supportStations: [{ type: core.Input }],
            selectedService: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            showUnresolvableServices: [{ type: core.Input }],
            onServiceSelected: [{ type: core.Output }]
        };
        return ServiceSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandSelectorModule = (function () {
        function HelgolandSelectorModule() {
        }
        HelgolandSelectorModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            ServiceSelectorComponent,
                            ServiceFilterSelectorComponent,
                            DatasetByStationSelectorComponent,
                            MultiServiceFilterSelectorComponent,
                            ListSelectorComponent
                        ],
                        imports: [
                            common.CommonModule,
                            core$2.TranslateModule,
                            depiction.HelgolandLabelMapperModule,
                            core$1.HelgolandCoreModule
                        ],
                        exports: [
                            ServiceSelectorComponent,
                            ServiceFilterSelectorComponent,
                            DatasetByStationSelectorComponent,
                            MultiServiceFilterSelectorComponent,
                            ListSelectorComponent
                        ],
                        providers: [
                            ServiceSelectorService,
                            ListSelectorService
                        ]
                    },] },
        ];
        return HelgolandSelectorModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.HelgolandSelectorModule = HelgolandSelectorModule;
    exports.ExtendedTimeseries = ExtendedTimeseries;
    exports.DatasetByStationSelectorComponent = DatasetByStationSelectorComponent;
    exports.ListSelectorComponent = ListSelectorComponent;
    exports.ListSelectorService = ListSelectorService;
    exports.MultiServiceFilterEndpoint = MultiServiceFilterEndpoint;
    exports.MultiServiceFilterSelectorComponent = MultiServiceFilterSelectorComponent;
    exports.ServiceSelectorComponent = ServiceSelectorComponent;
    exports.ServiceSelectorService = ServiceSelectorService;
    exports.ServiceFilterSelectorComponent = ServiceFilterSelectorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXNlbGVjdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yL2xpYi9kYXRhc2V0LWJ5LXN0YXRpb24tc2VsZWN0b3IvZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvbGlzdC1zZWxlY3Rvci9saXN0LXNlbGVjdG9yLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvc2VsZWN0b3IvbGliL2xpc3Qtc2VsZWN0b3IvbGlzdC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvc2VsZWN0b3IvbGliL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvc2VydmljZS1maWx0ZXItc2VsZWN0b3Ivc2VydmljZS1maWx0ZXItc2VsZWN0b3IuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yL2xpYi9zZXJ2aWNlLXNlbGVjdG9yL3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvc2VydmljZS1zZWxlY3Rvci9zZXJ2aWNlLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvc2VsZWN0b3IubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgU3RhdGlvbiwgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFRpbWVzZXJpZXMgZXh0ZW5kcyBUaW1lc2VyaWVzIHtcbiAgICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWRhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaXRlbVwiICpuZ0Zvcj1cImxldCB0aW1lc2VyaWVzIG9mIHRpbWVzZXJpZXNMaXN0XCIgKGNsaWNrKT1cInRvZ2dsZSh0aW1lc2VyaWVzKVwiPlxuICAgIDxkaXYgKm5nSWY9XCJjb3VudGVyXCI+XG4gICAgICAgIHt7Y291bnRlcn19IHRpbWVzZXJpZXMgYXJlIGxvYWRpbmcuLi5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiB0aW1lc2VyaWVzLnNlbGVjdGVkfVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge3t0aW1lc2VyaWVzLnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3Bhbj57e3RpbWVzZXJpZXMucGFyYW1ldGVycy5wcm9jZWR1cmUubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ0aW1lc2VyaWVzLnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWwgJiYgdGltZXNlcmllcy5wYXJhbWV0ZXJzLmNhdGVnb3J5LmxhYmVsICE9IHRpbWVzZXJpZXMucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsXCI+KHt7dGltZXNlcmllcy5wYXJhbWV0ZXJzLmNhdGVnb3J5LmxhYmVsfX0pPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbEluZm9cIiAqbmdJZj1cInRpbWVzZXJpZXMubGFzdFZhbHVlXCI+XG4gICAgICAgICAgICA8c3Bhbj57e3RpbWVzZXJpZXMubGFzdFZhbHVlLnZhbHVlfX08L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj57e3RpbWVzZXJpZXMudW9tfX08L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj4oe3t0aW1lc2VyaWVzLmxhc3RWYWx1ZS50aW1lc3RhbXB8IGRhdGU6ICdzaG9ydCd9fSk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAuaXRlbSsuaXRlbXtwYWRkaW5nLXRvcDoxMHB4fTpob3N0IC5pdGVtLmVycm9ye2Rpc3BsYXk6bm9uZX06aG9zdCAuaXRlbSBsYWJlbHttYXJnaW4tYm90dG9tOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YXNldEJ5U3RhdGlvblNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN0YXRpb246IFN0YXRpb247XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRlZmF1bHRTZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGhlbm9tZW5vbklkOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8VGltZXNlcmllc1tdPiA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZXNlcmllc1tdPigpO1xuXG4gICAgcHVibGljIHRpbWVzZXJpZXNMaXN0OiBFeHRlbmRlZFRpbWVzZXJpZXNbXSA9IFtdO1xuXG4gICAgcHVibGljIGNvdW50ZXI6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGlvbikge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGlvbklkID0gdGhpcy5zdGF0aW9uLnByb3BlcnRpZXMgJiYgdGhpcy5zdGF0aW9uLnByb3BlcnRpZXMuaWQgPyB0aGlzLnN0YXRpb24ucHJvcGVydGllcy5pZCA6IHRoaXMuc3RhdGlvbi5pZDtcbiAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFN0YXRpb24oc3RhdGlvbklkLCB0aGlzLnVybClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlvbiA9IHN0YXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5zdGF0aW9uLnByb3BlcnRpZXMudGltZXNlcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzLnRpbWVzZXJpZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0U2luZ2xlVGltZXNlcmllcyhpZCwgdGhpcy51cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3VsdCBhcyBFeHRlbmRlZFRpbWVzZXJpZXMsIHRoaXMuZGVmYXVsdFNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZSh0aW1lc2VyaWVzOiBFeHRlbmRlZFRpbWVzZXJpZXMpIHtcbiAgICAgICAgdGltZXNlcmllcy5zZWxlY3RlZCA9ICF0aW1lc2VyaWVzLnNlbGVjdGVkO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVwYXJlUmVzdWx0KHJlc3VsdDogRXh0ZW5kZWRUaW1lc2VyaWVzLCBzZWxlY3Rpb246IGJvb2xlYW4pIHtcbiAgICAgICAgcmVzdWx0LnNlbGVjdGVkID0gc2VsZWN0aW9uO1xuICAgICAgICB0aGlzLnRpbWVzZXJpZXNMaXN0LnB1c2gocmVzdWx0KTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNlbGVjdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy50aW1lc2VyaWVzTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQoc2VsZWN0aW9uKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlcmVkUHJvdmlkZXIsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlzdFNlbGVjdG9yUGFyYW1ldGVyIHtcbiAgICBoZWFkZXI6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgaXNEaXNhYmxlZD86IGJvb2xlYW47XG4gICAgaGVhZGVyQWRkaXRpb24/OiBzdHJpbmc7XG4gICAgZmlsdGVyTGlzdD86IFBhcmFtZXRlckZpbHRlcltdO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGlzdFNlbGVjdG9yU2VydmljZSB7XG4gICAgcHVibGljIGNhY2hlOiBNYXA8c3RyaW5nLCBMaXN0U2VsZWN0b3JQYXJhbWV0ZXJbXT4gPSBuZXcgTWFwPHN0cmluZywgTGlzdFNlbGVjdG9yUGFyYW1ldGVyW10+KCk7XG4gICAgcHVibGljIHByb3ZpZGVyTGlzdDogRmlsdGVyZWRQcm92aWRlcltdO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRBcGlNYXBwaW5nLFxuICAgIERhdGFzZXRBcGlWZXJzaW9uLFxuICAgIEZpbHRlcmVkUHJvdmlkZXIsXG4gICAgSURhdGFzZXQsXG4gICAgUGFyYW1ldGVyRmlsdGVyLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJlZFBhcmFtZXRlciB9IGZyb20gJy4uL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0U2VsZWN0b3JQYXJhbWV0ZXIsIExpc3RTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL2xpc3Qtc2VsZWN0b3Iuc2VydmljZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIHNlbGVjdCBhbiBpdGVtIG91dCBvZiBhIGxpc3Qgb2YgcHJvdmlkZXIgd2l0aCBhIGdpdmVuIGZpbHRlciBjb21iaW5hdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGlzdC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2Pnt7YWN0aXZlUGFuZWx9fTwvZGl2PlxuPGRpdiAqbmdGb3I9XCJsZXQgcGFyYW0gb2YgcGFyYW1ldGVyczsgbGV0IGkgPSBpbmRleFwiPlxuICA8aDM+XG4gICAgPHNwYW4+e3twYXJhbS5oZWFkZXJ9fTwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cInBhcmFtLmhlYWRlckFkZGl0aW9uXCI+LTwvc3Bhbj5cbiAgICA8c3Bhbj57e3BhcmFtLmhlYWRlckFkZGl0aW9ufX08L3NwYW4+XG4gIDwvaDM+XG4gIDxkaXYgKm5nSWY9XCIhcGFyYW0uaXNEaXNhYmxlZFwiPlxuICAgIDxuNTItbXVsdGktc2VydmljZS1maWx0ZXItc2VsZWN0b3IgW2VuZHBvaW50XT1cInBhcmFtLnR5cGVcIiBbZmlsdGVyTGlzdF09XCJwYXJhbS5maWx0ZXJMaXN0XCIgKG9uSXRlbVNlbGVjdGVkKT1cIml0ZW1TZWxlY3RlZCgkZXZlbnQsIGkpXCI+PC9uNTItbXVsdGktc2VydmljZS1maWx0ZXItc2VsZWN0b3I+XG4gIDwvZGl2PlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIExpc3RTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiBMaXN0U2VsZWN0b3JQYXJhbWV0ZXJbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcHJvdmlkZXJMaXN0OiBGaWx0ZXJlZFByb3ZpZGVyW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RvcklkOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25EYXRhc2V0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8SURhdGFzZXRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPElEYXRhc2V0W10+KCk7XG5cbiAgICBwdWJsaWMgYWN0aXZlUGFuZWw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGlzdFNlbGVjdG9yU2VydmljZTogTGlzdFNlbGVjdG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwaU1hcHBpbmc6IERhdGFzZXRBcGlNYXBwaW5nXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnByb3ZpZGVyTGlzdCAmJiBjaGFuZ2VzLnByb3ZpZGVyTGlzdC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9ySWQgJiYgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLmNhY2hlLmhhcyh0aGlzLnNlbGVjdG9ySWQpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5pc0VxdWFsKHRoaXMucHJvdmlkZXJMaXN0LCB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UucHJvdmlkZXJMaXN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMubGlzdFNlbGVjdG9yU2VydmljZS5jYWNoZS5nZXQodGhpcy5zZWxlY3RvcklkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnBhcmFtZXRlcnMuZmluZEluZGV4KChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50cnkuaXNEaXNhYmxlZDtcbiAgICAgICAgICAgICAgICB9KSAtIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVQYW5lbCA9IHRoaXMuc2VsZWN0b3JJZCArICctJyArIGlkeDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UuY2FjaGUuc2V0KHRoaXMuc2VsZWN0b3JJZCwgdGhpcy5wYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGZpbHRlcmxpc3QgZm9yIGZpcnN0IHBhcmFtZXRlciBlbnRyeVxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1swXS5maWx0ZXJMaXN0ID0gdGhpcy5wcm92aWRlckxpc3QubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5maWx0ZXIgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UucHJvdmlkZXJMaXN0ID0gdGhpcy5wcm92aWRlckxpc3Q7XG4gICAgICAgICAgICAgICAgLy8gb3BlbiBmaXJzdCB0YWJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBhbmVsID0gdGhpcy5zZWxlY3RvcklkICsgJy0wJztcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbMF0uaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgcGFyYW1ldGVyTGlzdFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpXS5pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXRlbVNlbGVjdGVkKGl0ZW06IEZpbHRlcmVkUGFyYW1ldGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpbmRleCA8IHRoaXMucGFyYW1ldGVycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaW5kZXhdLmhlYWRlckFkZGl0aW9uID0gaXRlbS5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFuZWwgPSB0aGlzLnNlbGVjdG9ySWQgKyAnLScgKyAoaW5kZXggKyAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpbmRleCArIDFdLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIGNvcHkgZmlsdGVyIHRvIG5ldyBpdGVtXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaW5kZXggKyAxXS5maWx0ZXJMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtLmZpbHRlckxpc3QpKTtcbiAgICAgICAgICAgIC8vIGFkZCBmaWx0ZXIgZm9yIHNlbGVjdGVkIGl0ZW0gdG8gbmV4dFxuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2luZGV4ICsgMV0uZmlsdGVyTGlzdC5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkuZmlsdGVyW3RoaXMucGFyYW1ldGVyc1tpbmRleF0udHlwZV0gPSBlbnRyeS5pdGVtSWQpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMjsgaSA8IHRoaXMucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpXS5pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpbmRleCArIDE7IGogPCB0aGlzLnBhcmFtZXRlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbal0uaGVhZGVyQWRkaXRpb24gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uZmlsdGVyTGlzdC5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZpbHRlclt0aGlzLnBhcmFtZXRlcnNbaW5kZXhdLnR5cGVdID0gZW50cnkuaXRlbUlkO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkRhdGFzZXQoZW50cnkudXJsLCBlbnRyeS5maWx0ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5EYXRhc2V0KHVybDogc3RyaW5nLCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlcikge1xuICAgICAgICB0aGlzLmFwaU1hcHBpbmcuZ2V0QXBpVmVyc2lvbih1cmwpLnN1YnNjcmliZSgoYXBpVmVyc2lvbklkKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXBpVmVyc2lvbklkID09PSBEYXRhc2V0QXBpVmVyc2lvbi5WMikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldERhdGFzZXRzKHVybCwgcGFyYW1zKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4gdGhpcy5vbkRhdGFzZXRTZWxlY3Rpb24uZW1pdChyZXN1bHQpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXBpVmVyc2lvbklkID09PSBEYXRhc2V0QXBpVmVyc2lvbi5WMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFRpbWVzZXJpZXModXJsLCBwYXJhbXMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkRhdGFzZXRTZWxlY3Rpb24uZW1pdChyZXN1bHQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VxdWFsKGxpc3RPbmU6IEZpbHRlcmVkUHJvdmlkZXJbXSwgbGlzdFR3bzogRmlsdGVyZWRQcm92aWRlcltdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBtYXRjaCA9IHRydWU7XG4gICAgICAgIGlmIChsaXN0T25lLmxlbmd0aCA9PT0gbGlzdFR3by5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpc3RPbmUuZm9yRWFjaCgoZW50cnlPbmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGxpc3RUd28uZmluZCgoZW50cnlUd28pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5T25lLmlkID09PSBlbnRyeVR3by5pZCAmJiBlbnRyeU9uZS51cmwgPT09IGVudHJ5VHdvLnVybCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkgeyBtYXRjaCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIEZpbHRlciwgTGFuZ3VhZ2VDaGFuZ05vdGlmaWVyLCBQYXJhbWV0ZXIsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXVsdGlTZXJ2aWNlRmlsdGVyIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBmaWx0ZXI/OiBQYXJhbWV0ZXJGaWx0ZXI7XG59XG5cbmV4cG9ydCBlbnVtIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50IHtcbiAgICBvZmZlcmluZyA9ICdvZmZlcmluZycsXG4gICAgcGhlbm9tZW5vbiA9ICdwaGVub21lbm9uJyxcbiAgICBwcm9jZWR1cmUgPSAncHJvY2VkdXJlJyxcbiAgICBmZWF0dXJlID0gJ2ZlYXR1cmUnLFxuICAgIGNhdGVnb3J5ID0gJ2NhdGVnb3J5JyxcbiAgICBwbGF0Zm9ybSA9ICdwbGF0Zm9ybScsXG4gICAgZGF0YXNldCA9ICdkYXRhc2V0J1xufVxuXG4vKipcbiAqIENvbXBvbmVudCB0byBzZWxlY3QgYW4gaXRlbSBvdXQgb2YgYSBsaXN0IG9mIHByb3ZpZGVyIHdpdGggYSBnaXZlbiBmaWx0ZXIgY29tYmluYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLW11bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJsb2FkaW5nID4gMFwiPlxuICAgIDxzcGFuPmxvYWRpbmcuLi48L3NwYW4+XG48L2Rpdj5cbjxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIiAoY2xpY2spPVwib25TZWxlY3RJdGVtKGl0ZW0pXCI+XG4gICAge3tpdGVtLmlkfX0gLSB7e2l0ZW0ubGFiZWx9fVxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIExhbmd1YWdlQ2hhbmdOb3RpZmllciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBlbmRwb2ludDogTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXJMaXN0OiBNdWx0aVNlcnZpY2VGaWx0ZXJbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPEZpbHRlcmVkUGFyYW1ldGVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsdGVyZWRQYXJhbWV0ZXI+KCk7XG5cbiAgICBwdWJsaWMgbG9hZGluZyA9IDA7XG4gICAgcHVibGljIGl0ZW1zOiBGaWx0ZXJlZFBhcmFtZXRlcltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIodHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMubG9hZEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0SXRlbShpdGVtOiBGaWx0ZXJlZFBhcmFtZXRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkSXRlbXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRJdGVtcygpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmZpbHRlckxpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZysrO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZW50cnkuZmlsdGVyIHx8IHt9O1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5vZmZlcmluZzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0T2ZmZXJpbmdzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LnBoZW5vbWVub246XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFBoZW5vbWVuYShlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5wcm9jZWR1cmU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFByb2NlZHVyZXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQuZmVhdHVyZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RmVhdHVyZXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQuY2F0ZWdvcnk6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldENhdGVnb3JpZXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQucGxhdGZvcm06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFBsYXRmb3JtcyhlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5kYXRhc2V0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXREYXRhc2V0cyhlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignV3JvbmcgZW5kcG9pbnQ6ICcgKyB0aGlzLmVuZHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXJyb3JPbkxvYWRpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZGluZy0tO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXRlbXMocmVzOiBGaWx0ZXJlZFBhcmFtZXRlcltdLCBwcmV2ZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXIsIHVybDogc3RyaW5nLCBzZXJ2aWNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nLS07XG4gICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyOiBGaWx0ZXIgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBwcmV2ZmlsdGVyLFxuICAgICAgICAgICAgICAgIGl0ZW1JZDogZW50cnkuaWQsXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtcy5maW5kKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ubGFiZWwgPT09IGVudHJ5LmxhYmVsKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWx0ZXJMaXN0LnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZmlsdGVyTGlzdCA9IFtmaWx0ZXJdO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlcmVkUGFyYW1ldGVyIGV4dGVuZHMgUGFyYW1ldGVyIHtcbiAgICBmaWx0ZXJMaXN0PzogRmlsdGVyW107XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlLCBMYW5ndWFnZUNoYW5nTm90aWZpZXIsIFBhcmFtZXRlciwgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdG8gc2VsZWN0IGFuIGl0ZW0gb3V0IG9mIGEgbGlzdCBvZiBwcm92aWRlciB3aXRoIGEgZ2l2ZW4gZmlsdGVyIGNvbWJpbmF0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1zZXJ2aWNlLWZpbHRlci1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibG9hZGluZ1wiPlxuICAgIGxvYWRpbmcuLi5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIiFsb2FkaW5nICYmIGl0ZW1zPy5sZW5ndGggPT09IDBcIj5cbiAgICBubyByZXN1bHRzIGZvdW5kXG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJzZWxlY3Rvci1lbnRyeVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCIgKGNsaWNrKT1cIm9uU2VsZWN0SXRlbShpdGVtKVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3Rpb25JZCA9PT0gaXRlbS5pZH1cIj5cbiAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7aXRlbS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIExhbmd1YWdlQ2hhbmdOb3RpZmllciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBlbmRwb2ludDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VydmljZVVybDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3Rpb25JZDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uSXRlbVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8UGFyYW1ldGVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGFyYW1ldGVyPigpO1xuXG4gICAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgcHVibGljIGl0ZW1zOiBQYXJhbWV0ZXJbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRyYW5zbGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZW5kcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZEl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TZWxlY3RJdGVtKGl0ZW06IFBhcmFtZXRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlQ2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkSXRlbXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRJdGVtcygpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmVuZHBvaW50KSB7XG4gICAgICAgICAgICBjYXNlICdvZmZlcmluZyc6XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0T2ZmZXJpbmdzKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMpLCAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGhlbm9tZW5vbic6XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0UGhlbm9tZW5hKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMpLCAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncHJvY2VkdXJlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQcm9jZWR1cmVzKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMpLCAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2F0ZWdvcnknOlxuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldENhdGVnb3JpZXModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcyksIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmZWF0dXJlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRGZWF0dXJlcyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzKSwgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignV3JvbmcgZW5kcG9pbnQ6ICcgKyB0aGlzLmVuZHBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXJyb3JPbkxvYWRpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXRlbXMocmVzOiBQYXJhbWV0ZXJbXSk6IHZvaWQge1xuICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IEJsYWNrbGlzdGVkU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmljZVNlbGVjdG9yU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZmV0Y2hTZXJ2aWNlc09mQVBJKFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgYmxhY2tsaXN0OiBCbGFja2xpc3RlZFNlcnZpY2VbXSxcbiAgICAgICAgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXJcbiAgICApOiBPYnNlcnZhYmxlPFNlcnZpY2VbXT4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8U2VydmljZVtdPigob2JzZXJ2ZXI6IE9ic2VydmVyPFNlcnZpY2VbXT4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFNlcnZpY2VzKHVybCwgZmlsdGVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChzZXJ2aWNlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VzICYmIHNlcnZpY2VzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2FibGVTZXJ2aWNlcyA9IHNlcnZpY2VzLm1hcCgoc2VydmljZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZXJ2aWNlQmxhY2tsaXN0ZWQoc2VydmljZS5pZCwgdXJsLCBibGFja2xpc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodXNhYmxlU2VydmljZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTZXJ2aWNlQmxhY2tsaXN0ZWQoc2VydmljZUlEOiBzdHJpbmcsIHVybDogc3RyaW5nLCBibGFja2xpc3Q6IEJsYWNrbGlzdGVkU2VydmljZVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpc0JsYWNrbGlzdGVkID0gZmFsc2U7XG4gICAgICAgIGJsYWNrbGlzdC5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LnNlcnZpY2VJZCA9PT0gc2VydmljZUlEICYmIGVudHJ5LmFwaVVybCA9PT0gdXJsKSB7XG4gICAgICAgICAgICAgICAgaXNCbGFja2xpc3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXNCbGFja2xpc3RlZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbGFja2xpc3RlZFNlcnZpY2UsIERhdGFzZXRBcGksIFBhcmFtZXRlckZpbHRlciwgU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IFNlcnZpY2VTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIHNlbGVjdCBhbiBpdGVtIG91dCBvZiBhIGxpc3Qgb2YgcHJvdmlkZXIgd2l0aCBhIGdpdmVuIGZpbHRlciBjb21iaW5hdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItc2VydmljZS1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibG9hZGluZ0NvdW50ID4gMFwiPlxuICA8c3Bhbj5SZXF1ZXN0aW5nIHt7bG9hZGluZ0NvdW50fX0gcHJvdmlkZXJzLi4uPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwic2VydmljZS1saXN0XCI+XG4gIDxkaXYgY2xhc3M9XCJzZXJ2aWNlLWl0ZW1cIiAqbmdGb3I9XCJsZXQgc2VydmljZSBvZiBzZXJ2aWNlc1wiIChjbGljayk9XCJzZWxlY3RTZXJ2aWNlKHNlcnZpY2UpXCIgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGlzU2VsZWN0ZWQoc2VydmljZSl9XCI+XG4gICAgPGRpdj57e3NlcnZpY2UubGFiZWx9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPnt7c2VydmljZS50eXBlfX0sIHt7c2VydmljZS52ZXJzaW9ufX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIiAqbmdJZj1cInNlcnZpY2UuYXBpVXJsXCI+e3snc2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlLXVybCcgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLmFwaVVybH19PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlcnZpY2UucXVhbnRpdGllcy5zdGF0aW9ucyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci5zdGF0aW9ucycgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMuc3RhdGlvbnN9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VydmljZS5xdWFudGl0aWVzLnBsYXRmb3JtcyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci5wbGF0Zm9ybXMnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5xdWFudGl0aWVzLnBsYXRmb3Jtc319PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZXJ2aWNlLnF1YW50aXRpZXMudGltZXNlcmllcyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci50aW1lc2VyaWVzJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy50aW1lc2VyaWVzfX08L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlcnZpY2UucXVhbnRpdGllcy5kYXRhc2V0cyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci5kYXRhc2V0cycgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMuZGF0YXNldHN9fTwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7J3NlcnZpY2Utc2VsZWN0b3IucGhlbm9tZW5hJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy5waGVub21lbmF9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdW5SZXNvbHZhYmxlU2VydmljZXNcIj5cbiAgICA8ZGl2IHN0eWxlPVwiY29sb3I6IHJlZDtcIj57e2l0ZW0ubmFtZX19IGlzIGN1cnJlbnRseSBub3QgcmVhY2hhYmxlPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAuc2VydmljZS1saXN0IC5zZXJ2aWNlLWl0ZW17cGFkZGluZzo1cHh9Omhvc3QgLnNlcnZpY2UtbGlzdCAuc2VydmljZS1pdGVtKy5hZGQtc2VydmljZSw6aG9zdCAuc2VydmljZS1saXN0IC5zZXJ2aWNlLWl0ZW0rLnNlcnZpY2UtaXRlbXttYXJnaW4tdG9wOjEwcHh9Omhvc3QgLnNlcnZpY2UtbGlzdCAuc2VydmljZS1pdGVtOmhvdmVye2N1cnNvcjpwb2ludGVyfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0QXBpTGlzdDogRGF0YXNldEFwaVtdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcHJvdmlkZXJCbGFja2xpc3Q6IEJsYWNrbGlzdGVkU2VydmljZVtdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc3VwcG9ydFN0YXRpb25zOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWRTZXJ2aWNlOiBTZXJ2aWNlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzaG93VW5yZXNvbHZhYmxlU2VydmljZXM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZXJ2aWNlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZXJ2aWNlPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VydmljZT4oKTtcblxuICAgIHB1YmxpYyBzZXJ2aWNlczogU2VydmljZVtdO1xuICAgIHB1YmxpYyB1blJlc29sdmFibGVTZXJ2aWNlczogRGF0YXNldEFwaVtdO1xuICAgIHB1YmxpYyBsb2FkaW5nQ291bnQgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlOiBTZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlcikgeyB0aGlzLmZpbHRlciA9IHt9OyB9XG4gICAgICAgIGlmICghdGhpcy5wcm92aWRlckJsYWNrbGlzdCkgeyB0aGlzLnByb3ZpZGVyQmxhY2tsaXN0ID0gW107IH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldEFwaUxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvdW50ID0gdGhpcy5kYXRhc2V0QXBpTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLnVuUmVzb2x2YWJsZVNlcnZpY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRBcGlMaXN0LmZvckVhY2goKGFwaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZVNlbGVjdG9yU2VydmljZS5mZXRjaFNlcnZpY2VzT2ZBUEkoYXBpLnVybCwgdGhpcy5wcm92aWRlckJsYWNrbGlzdCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LnF1YW50aXRpZXMucGxhdGZvcm1zID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuc3VwcG9ydFN0YXRpb25zICYmIGVudHJ5LnF1YW50aXRpZXMuc3RhdGlvbnMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5sYWJlbCA8IGIubGFiZWwpIHsgcmV0dXJuIC0xOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLmxhYmVsID4gYi5sYWJlbCkgeyByZXR1cm4gMTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93VW5yZXNvbHZhYmxlU2VydmljZXMpIHsgdGhpcy51blJlc29sdmFibGVTZXJ2aWNlcy5wdXNoKGFwaSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1NlbGVjdGVkKHNlcnZpY2U6IFNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkU2VydmljZSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmlkID09PSBzZXJ2aWNlLmlkICYmIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmFwaVVybCA9PT0gc2VydmljZS5hcGlVcmw7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdFNlcnZpY2Uoc2VydmljZTogU2VydmljZSkge1xuICAgICAgICB0aGlzLm9uU2VydmljZVNlbGVjdGVkLmVtaXQoc2VydmljZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9kZXBpY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IERhdGFzZXRCeVN0YXRpb25TZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yL2RhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXNlbGVjdG9yL2xpc3Qtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL2xpc3Qtc2VsZWN0b3IvbGlzdC1zZWxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE11bHRpU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50LFxufSBmcm9tICcuL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3NlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL3NlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2aWNlU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3NlcnZpY2Utc2VsZWN0b3Ivc2VydmljZS1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZVNlbGVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS1zZWxlY3Rvci9zZXJ2aWNlLXNlbGVjdG9yLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZXJ2aWNlU2VsZWN0b3JDb21wb25lbnQsXG4gICAgU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIERhdGFzZXRCeVN0YXRpb25TZWxlY3RvckNvbXBvbmVudCxcbiAgICBNdWx0aVNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBMaXN0U2VsZWN0b3JDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUsXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTXVsdGlTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTGlzdFNlbGVjdG9yQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNlcnZpY2VTZWxlY3RvclNlcnZpY2UsXG4gICAgTGlzdFNlbGVjdG9yU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZFNlbGVjdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiVGltZXNlcmllcyIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkRhdGFzZXRBcGlJbnRlcmZhY2UiLCJJbnB1dCIsIk91dHB1dCIsIkluamVjdGFibGUiLCJEYXRhc2V0QXBpVmVyc2lvbiIsIkRhdGFzZXRBcGlNYXBwaW5nIiwiVHJhbnNsYXRlU2VydmljZSIsIkxhbmd1YWdlQ2hhbmdOb3RpZmllciIsIk9ic2VydmFibGUiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlRyYW5zbGF0ZU1vZHVsZSIsIkhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIiwiSGVsZ29sYW5kQ29yZU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLHVCQUEwQixDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFnQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFN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QUFVO3dCQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDdkQsU0FBUyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBQSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBQSxDQUFDLENBQUM7d0JBQzVFLE1BQU07b0JBQ1YsS0FBSyxZQUFZO3dCQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDdkQsU0FBUyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBQSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBQSxDQUFDLENBQUM7d0JBQzVFLE1BQU07b0JBQ1YsS0FBSyxXQUFXO3dCQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDeEQsU0FBUyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBQSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBQSxDQUFDLENBQUM7d0JBQzVFLE1BQU07b0JBQ1YsS0FBSyxVQUFVO3dCQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDeEQsU0FBUyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBQSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBQSxDQUFDLENBQUM7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