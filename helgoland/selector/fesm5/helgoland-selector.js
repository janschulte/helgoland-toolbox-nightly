import { __extends } from 'tslib';
import { Component, EventEmitter, Input, Output, Injectable, NgModule } from '@angular/core';
import { DatasetApiInterface, Timeseries, DatasetApiMapping, DatasetApiVersion, LanguageChangNotifier, HelgolandCoreModule } from '@helgoland/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { HelgolandLabelMapperModule } from '@helgoland/depiction';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ExtendedTimeseries = /** @class */ (function (_super) {
    __extends(ExtendedTimeseries, _super);
    function ExtendedTimeseries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExtendedTimeseries;
}(Timeseries));
var DatasetByStationSelectorComponent = /** @class */ (function () {
    function DatasetByStationSelectorComponent(apiInterface) {
        this.apiInterface = apiInterface;
        this.defaultSelected = false;
        this.onSelectionChanged = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'n52-dataset-by-station-selector',
                    template: "<div class=\"item\" *ngFor=\"let timeseries of timeseriesList\" (click)=\"toggle(timeseries)\">\n    <div *ngIf=\"counter\">\n        {{counter}} timeseries are loading...\n    </div>\n    <div [ngClass]=\"{'selected': timeseries.selected}\">\n        <div>\n            {{timeseries.parameters.phenomenon.label}}\n        </div>\n        <span>{{timeseries.parameters.procedure.label}}</span>\n        <span *ngIf=\"timeseries.parameters.category.label && timeseries.parameters.category.label != timeseries.parameters.phenomenon.label\">({{timeseries.parameters.category.label}})</span>\n        <div class=\"additionalInfo\" *ngIf=\"timeseries.lastValue\">\n            <span>{{timeseries.lastValue.value}}</span>\n            <span>{{timeseries.uom}}</span>\n            <span>({{timeseries.lastValue.timestamp| date: 'short'}})</span>\n        </div>\n    </div>\n</div>\n",
                    styles: [":host .item+.item{padding-top:10px}:host .item.error{display:none}:host .item label{margin-bottom:0}"]
                },] },
    ];
    /** @nocollapse */
    DatasetByStationSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface }
    ]; };
    DatasetByStationSelectorComponent.propDecorators = {
        station: [{ type: Input }],
        url: [{ type: Input }],
        defaultSelected: [{ type: Input }],
        phenomenonId: [{ type: Input }],
        onSelectionChanged: [{ type: Output }]
    };
    return DatasetByStationSelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ListSelectorService = /** @class */ (function () {
    function ListSelectorService() {
        this.cache = new Map();
    }
    ListSelectorService.decorators = [
        { type: Injectable },
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
var ListSelectorComponent = /** @class */ (function () {
    function ListSelectorComponent(listSelectorService, apiInterface, apiMapping) {
        this.listSelectorService = listSelectorService;
        this.apiInterface = apiInterface;
        this.apiMapping = apiMapping;
        this.onDatasetSelection = new EventEmitter();
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
            if (apiVersionId === DatasetApiVersion.V2) {
                _this.apiInterface.getDatasets(url, params).subscribe(function (result) { return _this.onDatasetSelection.emit(result); });
            }
            else if (apiVersionId === DatasetApiVersion.V1) {
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
        { type: Component, args: [{
                    selector: 'n52-list-selector',
                    template: "<div>{{activePanel}}</div>\n<div *ngFor=\"let param of parameters; let i = index\">\n  <h3>\n    <span>{{param.header}}</span>\n    <span *ngIf=\"param.headerAddition\">-</span>\n    <span>{{param.headerAddition}}</span>\n  </h3>\n  <div *ngIf=\"!param.isDisabled\">\n    <n52-multi-service-filter-selector [endpoint]=\"param.type\" [filterList]=\"param.filterList\" (onItemSelected)=\"itemSelected($event, i)\"></n52-multi-service-filter-selector>\n  </div>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ListSelectorComponent.ctorParameters = function () { return [
        { type: ListSelectorService },
        { type: DatasetApiInterface },
        { type: DatasetApiMapping }
    ]; };
    ListSelectorComponent.propDecorators = {
        parameters: [{ type: Input }],
        filter: [{ type: Input }],
        providerList: [{ type: Input }],
        selectorId: [{ type: Input }],
        onDatasetSelection: [{ type: Output }]
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
var MultiServiceFilterSelectorComponent = /** @class */ (function (_super) {
    __extends(MultiServiceFilterSelectorComponent, _super);
    function MultiServiceFilterSelectorComponent(apiInterface, translate) {
        var _this = _super.call(this, translate) || this;
        _this.apiInterface = apiInterface;
        _this.translate = translate;
        _this.onItemSelected = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'n52-multi-service-filter-selector',
                    template: "<div *ngIf=\"loading > 0\">\n    <span>loading...</span>\n</div>\n<div *ngFor=\"let item of items\" (click)=\"onSelectItem(item)\">\n    {{item.id}} - {{item.label}}\n</div>"
                },] },
    ];
    /** @nocollapse */
    MultiServiceFilterSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: TranslateService }
    ]; };
    MultiServiceFilterSelectorComponent.propDecorators = {
        endpoint: [{ type: Input }],
        filterList: [{ type: Input }],
        onItemSelected: [{ type: Output }]
    };
    return MultiServiceFilterSelectorComponent;
}(LanguageChangNotifier));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
var ServiceFilterSelectorComponent = /** @class */ (function (_super) {
    __extends(ServiceFilterSelectorComponent, _super);
    function ServiceFilterSelectorComponent(translate, apiInterface) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        _this.apiInterface = apiInterface;
        _this.onItemSelected = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'n52-service-filter-selector',
                    template: "<div *ngIf=\"loading\">\n    loading...\n</div>\n<div *ngIf=\"!loading && items?.length === 0\">\n    no results found\n</div>\n<div class=\"selector-entry\" *ngFor=\"let item of items\" (click)=\"onSelectItem(item)\" [ngClass]=\"{'selected': selectionId === item.id}\">\n    <n52-label-mapper label=\"{{item.label}}\"></n52-label-mapper>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ServiceFilterSelectorComponent.ctorParameters = function () { return [
        { type: TranslateService },
        { type: DatasetApiInterface }
    ]; };
    ServiceFilterSelectorComponent.propDecorators = {
        endpoint: [{ type: Input }],
        serviceUrl: [{ type: Input }],
        filter: [{ type: Input }],
        selectionId: [{ type: Input }],
        onItemSelected: [{ type: Output }]
    };
    return ServiceFilterSelectorComponent;
}(LanguageChangNotifier));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ServiceSelectorService = /** @class */ (function () {
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
        return new Observable(function (observer) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ServiceSelectorService.ctorParameters = function () { return [
        { type: DatasetApiInterface }
    ]; };
    return ServiceSelectorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
var ServiceSelectorComponent = /** @class */ (function () {
    function ServiceSelectorComponent(serviceSelectorService) {
        this.serviceSelectorService = serviceSelectorService;
        this.onServiceSelected = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'n52-service-selector',
                    template: "<div *ngIf=\"loadingCount > 0\">\n  <span>Requesting {{loadingCount}} providers...</span>\n</div>\n<div class=\"service-list\">\n  <div class=\"service-item\" *ngFor=\"let service of services\" (click)=\"selectService(service)\" [ngClass]=\"{'selected': isSelected(service)}\">\n    <div>{{service.label}}</div>\n    <div class=\"small\">{{service.type}}, {{service.version}}\n    </div>\n    <div class=\"small\" *ngIf=\"service.apiUrl\">{{'service-selector.service-url' | translate}}: {{service.apiUrl}}</div>\n    <div class=\"small\">\n      <span *ngIf=\"service.quantities.stations !== undefined\">{{'service-selector.stations' | translate}}: {{service.quantities.stations}}</span>\n      <span *ngIf=\"service.quantities.platforms !== undefined\">{{'service-selector.platforms' | translate}}: {{service.quantities.platforms}}</span>\n      <span *ngIf=\"service.quantities.timeseries !== undefined\">{{'service-selector.timeseries' | translate}}: {{service.quantities.timeseries}}</span>\n      <span *ngIf=\"service.quantities.datasets !== undefined\">{{'service-selector.datasets' | translate}}: {{service.quantities.datasets}}</span>\n      <span>{{'service-selector.phenomena' | translate}}: {{service.quantities.phenomena}}</span>\n    </div>\n  </div>\n  <div *ngFor=\"let item of unResolvableServices\">\n    <div style=\"color: red;\">{{item.name}} is currently not reachable</div>\n  </div>\n</div>\n",
                    styles: [":host .service-list .service-item{padding:5px}:host .service-list .service-item+.add-service,:host .service-list .service-item+.service-item{margin-top:10px}:host .service-list .service-item:hover{cursor:pointer}"]
                },] },
    ];
    /** @nocollapse */
    ServiceSelectorComponent.ctorParameters = function () { return [
        { type: ServiceSelectorService }
    ]; };
    ServiceSelectorComponent.propDecorators = {
        datasetApiList: [{ type: Input }],
        providerBlacklist: [{ type: Input }],
        supportStations: [{ type: Input }],
        selectedService: [{ type: Input }],
        filter: [{ type: Input }],
        showUnresolvableServices: [{ type: Input }],
        onServiceSelected: [{ type: Output }]
    };
    return ServiceSelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandSelectorModule = /** @class */ (function () {
    function HelgolandSelectorModule() {
    }
    HelgolandSelectorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ServiceSelectorComponent,
                        ServiceFilterSelectorComponent,
                        DatasetByStationSelectorComponent,
                        MultiServiceFilterSelectorComponent,
                        ListSelectorComponent
                    ],
                    imports: [
                        CommonModule,
                        TranslateModule,
                        HelgolandLabelMapperModule,
                        HelgolandCoreModule
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

export { HelgolandSelectorModule, ExtendedTimeseries, DatasetByStationSelectorComponent, ListSelectorComponent, ListSelectorService, MultiServiceFilterEndpoint, MultiServiceFilterSelectorComponent, ServiceSelectorComponent, ServiceSelectorService, ServiceFilterSelectorComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXNlbGVjdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yL2xpYi9kYXRhc2V0LWJ5LXN0YXRpb24tc2VsZWN0b3IvZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvbGlzdC1zZWxlY3Rvci9saXN0LXNlbGVjdG9yLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvc2VsZWN0b3IvbGliL2xpc3Qtc2VsZWN0b3IvbGlzdC1zZWxlY3Rvci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvc2VsZWN0b3IvbGliL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvc2VydmljZS1maWx0ZXItc2VsZWN0b3Ivc2VydmljZS1maWx0ZXItc2VsZWN0b3IuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yL2xpYi9zZXJ2aWNlLXNlbGVjdG9yL3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvc2VydmljZS1zZWxlY3Rvci9zZXJ2aWNlLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci9saWIvc2VsZWN0b3IubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIFN0YXRpb24sIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRUaW1lc2VyaWVzIGV4dGVuZHMgVGltZXNlcmllcyB7XG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kYXRhc2V0LWJ5LXN0YXRpb24tc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIml0ZW1cIiAqbmdGb3I9XCJsZXQgdGltZXNlcmllcyBvZiB0aW1lc2VyaWVzTGlzdFwiIChjbGljayk9XCJ0b2dnbGUodGltZXNlcmllcylcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiY291bnRlclwiPlxuICAgICAgICB7e2NvdW50ZXJ9fSB0aW1lc2VyaWVzIGFyZSBsb2FkaW5nLi4uXG4gICAgPC9kaXY+XG4gICAgPGRpdiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdGltZXNlcmllcy5zZWxlY3RlZH1cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHt7dGltZXNlcmllcy5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWx9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4+e3t0aW1lc2VyaWVzLnBhcmFtZXRlcnMucHJvY2VkdXJlLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGltZXNlcmllcy5wYXJhbWV0ZXJzLmNhdGVnb3J5LmxhYmVsICYmIHRpbWVzZXJpZXMucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbCAhPSB0aW1lc2VyaWVzLnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbFwiPih7e3RpbWVzZXJpZXMucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbH19KTwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxJbmZvXCIgKm5nSWY9XCJ0aW1lc2VyaWVzLmxhc3RWYWx1ZVwiPlxuICAgICAgICAgICAgPHNwYW4+e3t0aW1lc2VyaWVzLmxhc3RWYWx1ZS52YWx1ZX19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e3t0aW1lc2VyaWVzLnVvbX19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+KHt7dGltZXNlcmllcy5sYXN0VmFsdWUudGltZXN0YW1wfCBkYXRlOiAnc2hvcnQnfX0pPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgLml0ZW0rLml0ZW17cGFkZGluZy10b3A6MTBweH06aG9zdCAuaXRlbS5lcnJvcntkaXNwbGF5Om5vbmV9Omhvc3QgLml0ZW0gbGFiZWx7bWFyZ2luLWJvdHRvbTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFzZXRCeVN0YXRpb25TZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzdGF0aW9uOiBTdGF0aW9uO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkZWZhdWx0U2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHBoZW5vbWVub25JZDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRpbWVzZXJpZXNbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVzZXJpZXNbXT4oKTtcblxuICAgIHB1YmxpYyB0aW1lc2VyaWVzTGlzdDogRXh0ZW5kZWRUaW1lc2VyaWVzW10gPSBbXTtcblxuICAgIHB1YmxpYyBjb3VudGVyOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRpb25JZCA9IHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzICYmIHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzLmlkID8gdGhpcy5zdGF0aW9uLnByb3BlcnRpZXMuaWQgOiB0aGlzLnN0YXRpb24uaWQ7XG4gICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRTdGF0aW9uKHN0YXRpb25JZCwgdGhpcy51cmwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpb24gPSBzdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzLnRpbWVzZXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRpb24ucHJvcGVydGllcy50aW1lc2VyaWVzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFNpbmdsZVRpbWVzZXJpZXMoaWQsIHRoaXMudXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZVJlc3VsdChyZXN1bHQgYXMgRXh0ZW5kZWRUaW1lc2VyaWVzLCB0aGlzLmRlZmF1bHRTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXItLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXItLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUodGltZXNlcmllczogRXh0ZW5kZWRUaW1lc2VyaWVzKSB7XG4gICAgICAgIHRpbWVzZXJpZXMuc2VsZWN0ZWQgPSAhdGltZXNlcmllcy5zZWxlY3RlZDtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJlcGFyZVJlc3VsdChyZXN1bHQ6IEV4dGVuZGVkVGltZXNlcmllcywgc2VsZWN0aW9uOiBib29sZWFuKSB7XG4gICAgICAgIHJlc3VsdC5zZWxlY3RlZCA9IHNlbGVjdGlvbjtcbiAgICAgICAgdGhpcy50aW1lc2VyaWVzTGlzdC5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMudGltZXNlcmllc0xpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHNlbGVjdGlvbik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJlZFByb3ZpZGVyLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExpc3RTZWxlY3RvclBhcmFtZXRlciB7XG4gICAgaGVhZGVyOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIGhlYWRlckFkZGl0aW9uPzogc3RyaW5nO1xuICAgIGZpbHRlckxpc3Q/OiBQYXJhbWV0ZXJGaWx0ZXJbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExpc3RTZWxlY3RvclNlcnZpY2Uge1xuICAgIHB1YmxpYyBjYWNoZTogTWFwPHN0cmluZywgTGlzdFNlbGVjdG9yUGFyYW1ldGVyW10+ID0gbmV3IE1hcDxzdHJpbmcsIExpc3RTZWxlY3RvclBhcmFtZXRlcltdPigpO1xuICAgIHB1YmxpYyBwcm92aWRlckxpc3Q6IEZpbHRlcmVkUHJvdmlkZXJbXTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBEYXRhc2V0QXBpTWFwcGluZyxcbiAgICBEYXRhc2V0QXBpVmVyc2lvbixcbiAgICBGaWx0ZXJlZFByb3ZpZGVyLFxuICAgIElEYXRhc2V0LFxuICAgIFBhcmFtZXRlckZpbHRlcixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgRmlsdGVyZWRQYXJhbWV0ZXIgfSBmcm9tICcuLi9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdG9yUGFyYW1ldGVyLCBMaXN0U2VsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9saXN0LXNlbGVjdG9yLnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0byBzZWxlY3QgYW4gaXRlbSBvdXQgb2YgYSBsaXN0IG9mIHByb3ZpZGVyIHdpdGggYSBnaXZlbiBmaWx0ZXIgY29tYmluYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWxpc3Qtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdj57e2FjdGl2ZVBhbmVsfX08L2Rpdj5cbjxkaXYgKm5nRm9yPVwibGV0IHBhcmFtIG9mIHBhcmFtZXRlcnM7IGxldCBpID0gaW5kZXhcIj5cbiAgPGgzPlxuICAgIDxzcGFuPnt7cGFyYW0uaGVhZGVyfX08L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJwYXJhbS5oZWFkZXJBZGRpdGlvblwiPi08L3NwYW4+XG4gICAgPHNwYW4+e3twYXJhbS5oZWFkZXJBZGRpdGlvbn19PC9zcGFuPlxuICA8L2gzPlxuICA8ZGl2ICpuZ0lmPVwiIXBhcmFtLmlzRGlzYWJsZWRcIj5cbiAgICA8bjUyLW11bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yIFtlbmRwb2ludF09XCJwYXJhbS50eXBlXCIgW2ZpbHRlckxpc3RdPVwicGFyYW0uZmlsdGVyTGlzdFwiIChvbkl0ZW1TZWxlY3RlZCk9XCJpdGVtU2VsZWN0ZWQoJGV2ZW50LCBpKVwiPjwvbjUyLW11bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yPlxuICA8L2Rpdj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBMaXN0U2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGFyYW1ldGVyczogTGlzdFNlbGVjdG9yUGFyYW1ldGVyW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHByb3ZpZGVyTGlzdDogRmlsdGVyZWRQcm92aWRlcltdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0b3JJZDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRGF0YXNldFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPElEYXRhc2V0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YXNldFtdPigpO1xuXG4gICAgcHVibGljIGFjdGl2ZVBhbmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGxpc3RTZWxlY3RvclNlcnZpY2U6IExpc3RTZWxlY3RvclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcGlNYXBwaW5nOiBEYXRhc2V0QXBpTWFwcGluZ1xuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5wcm92aWRlckxpc3QgJiYgY2hhbmdlcy5wcm92aWRlckxpc3QuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvcklkICYmIHRoaXMubGlzdFNlbGVjdG9yU2VydmljZS5jYWNoZS5oYXModGhpcy5zZWxlY3RvcklkKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuaXNFcXVhbCh0aGlzLnByb3ZpZGVyTGlzdCwgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLnByb3ZpZGVyTGlzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UuY2FjaGUuZ2V0KHRoaXMuc2VsZWN0b3JJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5wYXJhbWV0ZXJzLmZpbmRJbmRleCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmlzRGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgfSkgLSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFuZWwgPSB0aGlzLnNlbGVjdG9ySWQgKyAnLScgKyBpZHg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLmNhY2hlLnNldCh0aGlzLnNlbGVjdG9ySWQsIHRoaXMucGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBmaWx0ZXJsaXN0IGZvciBmaXJzdCBwYXJhbWV0ZXIgZW50cnlcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbMF0uZmlsdGVyTGlzdCA9IHRoaXMucHJvdmlkZXJMaXN0Lm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZmlsdGVyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLnByb3ZpZGVyTGlzdCA9IHRoaXMucHJvdmlkZXJMaXN0O1xuICAgICAgICAgICAgICAgIC8vIG9wZW4gZmlyc3QgdGFiXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVQYW5lbCA9IHRoaXMuc2VsZWN0b3JJZCArICctMCc7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzWzBdLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHBhcmFtZXRlckxpc3RcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaV0uaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZW1TZWxlY3RlZChpdGVtOiBGaWx0ZXJlZFBhcmFtZXRlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoaW5kZXggPCB0aGlzLnBhcmFtZXRlcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2luZGV4XS5oZWFkZXJBZGRpdGlvbiA9IGl0ZW0ubGFiZWw7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBhbmVsID0gdGhpcy5zZWxlY3RvcklkICsgJy0nICsgKGluZGV4ICsgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaW5kZXggKyAxXS5pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBjb3B5IGZpbHRlciB0byBuZXcgaXRlbVxuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2luZGV4ICsgMV0uZmlsdGVyTGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbS5maWx0ZXJMaXN0KSk7XG4gICAgICAgICAgICAvLyBhZGQgZmlsdGVyIGZvciBzZWxlY3RlZCBpdGVtIHRvIG5leHRcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpbmRleCArIDFdLmZpbHRlckxpc3QuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LmZpbHRlclt0aGlzLnBhcmFtZXRlcnNbaW5kZXhdLnR5cGVdID0gZW50cnkuaXRlbUlkKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBpbmRleCArIDI7IGkgPCB0aGlzLnBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaV0uaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaW5kZXggKyAxOyBqIDwgdGhpcy5wYXJhbWV0ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2pdLmhlYWRlckFkZGl0aW9uID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmZpbHRlckxpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyeS5maWx0ZXJbdGhpcy5wYXJhbWV0ZXJzW2luZGV4XS50eXBlXSA9IGVudHJ5Lml0ZW1JZDtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EYXRhc2V0KGVudHJ5LnVybCwgZW50cnkuZmlsdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuRGF0YXNldCh1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5hcGlNYXBwaW5nLmdldEFwaVZlcnNpb24odXJsKS5zdWJzY3JpYmUoKGFwaVZlcnNpb25JZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFwaVZlcnNpb25JZCA9PT0gRGF0YXNldEFwaVZlcnNpb24uVjIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXREYXRhc2V0cyh1cmwsIHBhcmFtcykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHRoaXMub25EYXRhc2V0U2VsZWN0aW9uLmVtaXQocmVzdWx0KSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFwaVZlcnNpb25JZCA9PT0gRGF0YXNldEFwaVZlcnNpb24uVjEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzKHVybCwgcGFyYW1zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25EYXRhc2V0U2VsZWN0aW9uLmVtaXQocmVzdWx0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNFcXVhbChsaXN0T25lOiBGaWx0ZXJlZFByb3ZpZGVyW10sIGxpc3RUd286IEZpbHRlcmVkUHJvdmlkZXJbXSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbWF0Y2ggPSB0cnVlO1xuICAgICAgICBpZiAobGlzdE9uZS5sZW5ndGggPT09IGxpc3RUd28ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsaXN0T25lLmZvckVhY2goKGVudHJ5T25lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBsaXN0VHdvLmZpbmQoKGVudHJ5VHdvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeU9uZS5pZCA9PT0gZW50cnlUd28uaWQgJiYgZW50cnlPbmUudXJsID09PSBlbnRyeVR3by51cmwpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHsgbWF0Y2ggPSBmYWxzZTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlLCBGaWx0ZXIsIExhbmd1YWdlQ2hhbmdOb3RpZmllciwgUGFyYW1ldGVyLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE11bHRpU2VydmljZUZpbHRlciB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgZmlsdGVyPzogUGFyYW1ldGVyRmlsdGVyO1xufVxuXG5leHBvcnQgZW51bSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludCB7XG4gICAgb2ZmZXJpbmcgPSAnb2ZmZXJpbmcnLFxuICAgIHBoZW5vbWVub24gPSAncGhlbm9tZW5vbicsXG4gICAgcHJvY2VkdXJlID0gJ3Byb2NlZHVyZScsXG4gICAgZmVhdHVyZSA9ICdmZWF0dXJlJyxcbiAgICBjYXRlZ29yeSA9ICdjYXRlZ29yeScsXG4gICAgcGxhdGZvcm0gPSAncGxhdGZvcm0nLFxuICAgIGRhdGFzZXQgPSAnZGF0YXNldCdcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgdG8gc2VsZWN0IGFuIGl0ZW0gb3V0IG9mIGEgbGlzdCBvZiBwcm92aWRlciB3aXRoIGEgZ2l2ZW4gZmlsdGVyIGNvbWJpbmF0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibG9hZGluZyA+IDBcIj5cbiAgICA8c3Bhbj5sb2FkaW5nLi4uPC9zcGFuPlxuPC9kaXY+XG48ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCIgKGNsaWNrKT1cIm9uU2VsZWN0SXRlbShpdGVtKVwiPlxuICAgIHt7aXRlbS5pZH19IC0ge3tpdGVtLmxhYmVsfX1cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBMYW5ndWFnZUNoYW5nTm90aWZpZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZW5kcG9pbnQ6IE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsdGVyTGlzdDogTXVsdGlTZXJ2aWNlRmlsdGVyW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25JdGVtU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxGaWx0ZXJlZFBhcmFtZXRlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlcmVkUGFyYW1ldGVyPigpO1xuXG4gICAgcHVibGljIGxvYWRpbmcgPSAwO1xuICAgIHB1YmxpYyBpdGVtczogRmlsdGVyZWRQYXJhbWV0ZXJbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRyYW5zbGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmxvYWRJdGVtcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdEl0ZW0oaXRlbTogRmlsdGVyZWRQYXJhbWV0ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsYW5ndWFnZUNoYW5nZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5maWx0ZXJMaXN0LmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcrKztcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGVudHJ5LmZpbHRlciB8fCB7fTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQub2ZmZXJpbmc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldE9mZmVyaW5ncyhlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5waGVub21lbm9uOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQaGVub21lbmEoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQucHJvY2VkdXJlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQcm9jZWR1cmVzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LmZlYXR1cmU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldEZlYXR1cmVzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LmNhdGVnb3J5OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRDYXRlZ29yaWVzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LnBsYXRmb3JtOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQbGF0Zm9ybXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQuZGF0YXNldDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RGF0YXNldHMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dyb25nIGVuZHBvaW50OiAnICsgdGhpcy5lbmRwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yT25Mb2FkaW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRpbmctLTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zKHJlczogRmlsdGVyZWRQYXJhbWV0ZXJbXSwgcHJldmZpbHRlcjogUGFyYW1ldGVyRmlsdGVyLCB1cmw6IHN0cmluZywgc2VydmljZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZGluZy0tO1xuICAgICAgICByZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjogRmlsdGVyID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogcHJldmZpbHRlcixcbiAgICAgICAgICAgICAgICBpdGVtSWQ6IGVudHJ5LmlkLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmxhYmVsID09PSBlbnRyeS5sYWJlbCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsdGVyTGlzdC5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZpbHRlckxpc3QgPSBbZmlsdGVyXTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJlZFBhcmFtZXRlciBleHRlbmRzIFBhcmFtZXRlciB7XG4gICAgZmlsdGVyTGlzdD86IEZpbHRlcltdO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgTGFuZ3VhZ2VDaGFuZ05vdGlmaWVyLCBQYXJhbWV0ZXIsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIHNlbGVjdCBhbiBpdGVtIG91dCBvZiBhIGxpc3Qgb2YgcHJvdmlkZXIgd2l0aCBhIGdpdmVuIGZpbHRlciBjb21iaW5hdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItc2VydmljZS1maWx0ZXItc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImxvYWRpbmdcIj5cbiAgICBsb2FkaW5nLi4uXG48L2Rpdj5cbjxkaXYgKm5nSWY9XCIhbG9hZGluZyAmJiBpdGVtcz8ubGVuZ3RoID09PSAwXCI+XG4gICAgbm8gcmVzdWx0cyBmb3VuZFxuPC9kaXY+XG48ZGl2IGNsYXNzPVwic2VsZWN0b3ItZW50cnlcIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiIChjbGljayk9XCJvblNlbGVjdEl0ZW0oaXRlbSlcIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogc2VsZWN0aW9uSWQgPT09IGl0ZW0uaWR9XCI+XG4gICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2l0ZW0ubGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBMYW5ndWFnZUNoYW5nTm90aWZpZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZW5kcG9pbnQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlcnZpY2VVcmw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0aW9uSWQ6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFBhcmFtZXRlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPFBhcmFtZXRlcj4oKTtcblxuICAgIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuO1xuICAgIHB1YmxpYyBpdGVtczogUGFyYW1ldGVyW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZVxuICAgICkge1xuICAgICAgICBzdXBlcih0cmFuc2xhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmVuZHBvaW50KSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRJdGVtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0SXRlbShpdGVtOiBQYXJhbWV0ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsYW5ndWFnZUNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMubG9hZEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkSXRlbXMoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAodGhpcy5lbmRwb2ludCkge1xuICAgICAgICAgICAgY2FzZSAnb2ZmZXJpbmcnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldE9mZmVyaW5ncyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzKSwgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BoZW5vbWVub24nOlxuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFBoZW5vbWVuYSh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzKSwgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2NlZHVyZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0UHJvY2VkdXJlcyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzKSwgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhdGVnb3J5JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRDYXRlZ29yaWVzKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMpLCAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmVhdHVyZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RmVhdHVyZXModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcyksIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dyb25nIGVuZHBvaW50OiAnICsgdGhpcy5lbmRwb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yT25Mb2FkaW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zKHJlczogUGFyYW1ldGVyW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBCbGFja2xpc3RlZFNlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VTZWxlY3RvclNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIGZldGNoU2VydmljZXNPZkFQSShcbiAgICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAgIGJsYWNrbGlzdDogQmxhY2tsaXN0ZWRTZXJ2aWNlW10sXG4gICAgICAgIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyXG4gICAgKTogT2JzZXJ2YWJsZTxTZXJ2aWNlW10+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFNlcnZpY2VbXT4oKG9ic2VydmVyOiBPYnNlcnZlcjxTZXJ2aWNlW10+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRTZXJ2aWNlcyh1cmwsIGZpbHRlcilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoc2VydmljZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlcyAmJiBzZXJ2aWNlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNhYmxlU2VydmljZXMgPSBzZXJ2aWNlcy5tYXAoKHNlcnZpY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VydmljZUJsYWNrbGlzdGVkKHNlcnZpY2UuaWQsIHVybCwgYmxhY2tsaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHVzYWJsZVNlcnZpY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU2VydmljZUJsYWNrbGlzdGVkKHNlcnZpY2VJRDogc3RyaW5nLCB1cmw6IHN0cmluZywgYmxhY2tsaXN0OiBCbGFja2xpc3RlZFNlcnZpY2VbXSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNCbGFja2xpc3RlZCA9IGZhbHNlO1xuICAgICAgICBibGFja2xpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5zZXJ2aWNlSWQgPT09IHNlcnZpY2VJRCAmJiBlbnRyeS5hcGlVcmwgPT09IHVybCkge1xuICAgICAgICAgICAgICAgIGlzQmxhY2tsaXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzQmxhY2tsaXN0ZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmxhY2tsaXN0ZWRTZXJ2aWNlLCBEYXRhc2V0QXBpLCBQYXJhbWV0ZXJGaWx0ZXIsIFNlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBTZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlLXNlbGVjdG9yLnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0byBzZWxlY3QgYW4gaXRlbSBvdXQgb2YgYSBsaXN0IG9mIHByb3ZpZGVyIHdpdGggYSBnaXZlbiBmaWx0ZXIgY29tYmluYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXNlcnZpY2Utc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImxvYWRpbmdDb3VudCA+IDBcIj5cbiAgPHNwYW4+UmVxdWVzdGluZyB7e2xvYWRpbmdDb3VudH19IHByb3ZpZGVycy4uLjwvc3Bhbj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInNlcnZpY2UtbGlzdFwiPlxuICA8ZGl2IGNsYXNzPVwic2VydmljZS1pdGVtXCIgKm5nRm9yPVwibGV0IHNlcnZpY2Ugb2Ygc2VydmljZXNcIiAoY2xpY2spPVwic2VsZWN0U2VydmljZShzZXJ2aWNlKVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBpc1NlbGVjdGVkKHNlcnZpY2UpfVwiPlxuICAgIDxkaXY+e3tzZXJ2aWNlLmxhYmVsfX08L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIj57e3NlcnZpY2UudHlwZX19LCB7e3NlcnZpY2UudmVyc2lvbn19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCIgKm5nSWY9XCJzZXJ2aWNlLmFwaVVybFwiPnt7J3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZS11cmwnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5hcGlVcmx9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZXJ2aWNlLnF1YW50aXRpZXMuc3RhdGlvbnMgIT09IHVuZGVmaW5lZFwiPnt7J3NlcnZpY2Utc2VsZWN0b3Iuc3RhdGlvbnMnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5xdWFudGl0aWVzLnN0YXRpb25zfX08L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlcnZpY2UucXVhbnRpdGllcy5wbGF0Zm9ybXMgIT09IHVuZGVmaW5lZFwiPnt7J3NlcnZpY2Utc2VsZWN0b3IucGxhdGZvcm1zJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy5wbGF0Zm9ybXN9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VydmljZS5xdWFudGl0aWVzLnRpbWVzZXJpZXMgIT09IHVuZGVmaW5lZFwiPnt7J3NlcnZpY2Utc2VsZWN0b3IudGltZXNlcmllcycgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMudGltZXNlcmllc319PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZXJ2aWNlLnF1YW50aXRpZXMuZGF0YXNldHMgIT09IHVuZGVmaW5lZFwiPnt7J3NlcnZpY2Utc2VsZWN0b3IuZGF0YXNldHMnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5xdWFudGl0aWVzLmRhdGFzZXRzfX08L3NwYW4+XG4gICAgICA8c3Bhbj57eydzZXJ2aWNlLXNlbGVjdG9yLnBoZW5vbWVuYScgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMucGhlbm9tZW5hfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHVuUmVzb2x2YWJsZVNlcnZpY2VzXCI+XG4gICAgPGRpdiBzdHlsZT1cImNvbG9yOiByZWQ7XCI+e3tpdGVtLm5hbWV9fSBpcyBjdXJyZW50bHkgbm90IHJlYWNoYWJsZTwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgLnNlcnZpY2UtbGlzdCAuc2VydmljZS1pdGVte3BhZGRpbmc6NXB4fTpob3N0IC5zZXJ2aWNlLWxpc3QgLnNlcnZpY2UtaXRlbSsuYWRkLXNlcnZpY2UsOmhvc3QgLnNlcnZpY2UtbGlzdCAuc2VydmljZS1pdGVtKy5zZXJ2aWNlLWl0ZW17bWFyZ2luLXRvcDoxMHB4fTpob3N0IC5zZXJ2aWNlLWxpc3QgLnNlcnZpY2UtaXRlbTpob3ZlcntjdXJzb3I6cG9pbnRlcn1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldEFwaUxpc3Q6IERhdGFzZXRBcGlbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHByb3ZpZGVyQmxhY2tsaXN0OiBCbGFja2xpc3RlZFNlcnZpY2VbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN1cHBvcnRTdGF0aW9uczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkU2VydmljZTogU2VydmljZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2hvd1VucmVzb2x2YWJsZVNlcnZpY2VzOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VydmljZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VydmljZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlcnZpY2U+KCk7XG5cbiAgICBwdWJsaWMgc2VydmljZXM6IFNlcnZpY2VbXTtcbiAgICBwdWJsaWMgdW5SZXNvbHZhYmxlU2VydmljZXM6IERhdGFzZXRBcGlbXTtcbiAgICBwdWJsaWMgbG9hZGluZ0NvdW50ID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgc2VydmljZVNlbGVjdG9yU2VydmljZTogU2VydmljZVNlbGVjdG9yU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5maWx0ZXIpIHsgdGhpcy5maWx0ZXIgPSB7fTsgfVxuICAgICAgICBpZiAoIXRoaXMucHJvdmlkZXJCbGFja2xpc3QpIHsgdGhpcy5wcm92aWRlckJsYWNrbGlzdCA9IFtdOyB9XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRBcGlMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb3VudCA9IHRoaXMuZGF0YXNldEFwaUxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy51blJlc29sdmFibGVTZXJ2aWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0QXBpTGlzdC5mb3JFYWNoKChhcGkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VTZWxlY3RvclNlcnZpY2UuZmV0Y2hTZXJ2aWNlc09mQVBJKGFwaS51cmwsIHRoaXMucHJvdmlkZXJCbGFja2xpc3QsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5xdWFudGl0aWVzLnBsYXRmb3JtcyA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnN1cHBvcnRTdGF0aW9ucyAmJiBlbnRyeS5xdWFudGl0aWVzLnN0YXRpb25zID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEubGFiZWwgPCBiLmxhYmVsKSB7IHJldHVybiAtMTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5sYWJlbCA+IGIubGFiZWwpIHsgcmV0dXJuIDE7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1VucmVzb2x2YWJsZVNlcnZpY2VzKSB7IHRoaXMudW5SZXNvbHZhYmxlU2VydmljZXMucHVzaChhcGkpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTZWxlY3RlZChzZXJ2aWNlOiBTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFNlcnZpY2UpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkU2VydmljZS5pZCA9PT0gc2VydmljZS5pZCAmJiB0aGlzLnNlbGVjdGVkU2VydmljZS5hcGlVcmwgPT09IHNlcnZpY2UuYXBpVXJsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RTZXJ2aWNlKHNlcnZpY2U6IFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5vblNlcnZpY2VTZWxlY3RlZC5lbWl0KHNlcnZpY2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRMYWJlbE1hcHBlck1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvZGVwaWN0aW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL2RhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3Rvci9kYXRhc2V0LWJ5LXN0YXRpb24tc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1zZWxlY3Rvci9saXN0LXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0U2VsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9saXN0LXNlbGVjdG9yL2xpc3Qtc2VsZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQge1xuICBNdWx0aVNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbn0gZnJvbSAnLi9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zZXJ2aWNlLXNlbGVjdG9yL3NlcnZpY2Utc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFNlcnZpY2VTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Utc2VsZWN0b3Ivc2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTXVsdGlTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTGlzdFNlbGVjdG9yQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlLFxuICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNlcnZpY2VTZWxlY3RvckNvbXBvbmVudCxcbiAgICBTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQsXG4gICAgRGF0YXNldEJ5U3RhdGlvblNlbGVjdG9yQ29tcG9uZW50LFxuICAgIE11bHRpU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIExpc3RTZWxlY3RvckNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlLFxuICAgIExpc3RTZWxlY3RvclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRTZWxlY3Rvck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBR0E7SUFBd0NBLHNDQUFVOzs7OzZCQUhsRDtFQUd3QyxVQUFVLEVBRWpELENBQUE7QUFGRDtJQStDSSwyQ0FDYyxZQUFpQztRQUFqQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7K0JBYnRCLEtBQUs7a0NBTTBCLElBQUksWUFBWSxFQUFnQjs4QkFFMUMsRUFBRTtLQU0zQzs7OztJQUVFLG9EQUFROzs7OztRQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs7WUFDZCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3ZILElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUM1QyxTQUFTLENBQUMsVUFBQyxPQUFPO2dCQUNmLEtBQUksQ0FB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