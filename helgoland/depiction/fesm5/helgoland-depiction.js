import { HttpClient } from '@angular/common/http';
import { Injectable, Component, Input, NgModule, EventEmitter, Output, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { IdCache, SettingsService, DatasetApiInterface, InternalIdHandler, PlatformTypes, Timespan, Dataset, Timeseries, Time, ColorService, HelgolandCoreModule, DatasetPresenterComponent } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { __extends } from 'tslib';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LabelMapperService = /** @class */ (function () {
    function LabelMapperService(httpClient, settingsSrvc) {
        this.httpClient = httpClient;
        this.settingsSrvc = settingsSrvc;
        this.cache = new IdCache();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    LabelMapperService.prototype.getMappedLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        var _this = this;
        return new Observable(function (observer) {
            if (!_this.settingsSrvc.getSettings().solveLabels) {
                _this.confirmLabel(observer, label);
            }
            else {
                /** @type {?} */
                var url_1 = _this.findUrl(label);
                if (url_1) {
                    if (_this.cache.has(url_1)) {
                        _this.confirmLabel(observer, _this.cache.get(url_1));
                    }
                    else {
                        /** @type {?} */
                        var labelUrl = _this.settingsSrvc.getSettings().proxyUrl ? _this.settingsSrvc.getSettings().proxyUrl + url_1 : url_1;
                        _this.httpClient.get(labelUrl, { responseType: 'text' }).subscribe(function (res) {
                            try {
                                /** @type {?} */
                                var xml = $.parseXML(res);
                                label = label.replace(url_1, $(xml).find('prefLabel').text());
                            }
                            catch (error) {
                                // currently do nothing and use old label
                            }
                            _this.cache.set(url_1, label);
                            _this.confirmLabel(observer, label);
                        }, function (error) {
                            /** @type {?} */
                            var resolvedLabel = label.substring(label.lastIndexOf('/') + 1, label.length);
                            _this.cache.set(url_1, resolvedLabel);
                            _this.confirmLabel(observer, resolvedLabel);
                        });
                    }
                }
                else {
                    _this.confirmLabel(observer, label);
                }
            }
        });
    };
    /**
     * @param {?} observer
     * @param {?} label
     * @return {?}
     */
    LabelMapperService.prototype.confirmLabel = /**
     * @param {?} observer
     * @param {?} label
     * @return {?}
     */
    function (observer, label) {
        observer.next(label);
        observer.complete();
    };
    /**
     * @param {?} label
     * @return {?}
     */
    LabelMapperService.prototype.findUrl = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        /** @type {?} */
        var source = (label || '').toString();
        /** @type {?} */
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?&\/\/=]+)/g;
        /** @type {?} */
        var matchArray = regexToken.exec(source);
        if (matchArray !== null) {
            return matchArray[0];
        }
        return null;
    };
    LabelMapperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LabelMapperService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SettingsService }
    ]; };
    return LabelMapperService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LabelMapperComponent = /** @class */ (function () {
    function LabelMapperComponent(labelMapperSrvc) {
        this.labelMapperSrvc = labelMapperSrvc;
        this.loading = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LabelMapperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes["label"]) {
            this.labelMapperSrvc.getMappedLabel(this.label)
                .subscribe(function (label) {
                _this.determinedLabel = label;
                _this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    };
    LabelMapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-label-mapper',
                    template: "<span *ngIf=\"determinedLabel\">{{determinedLabel}}</span>\n<span *ngIf=\"loading\">\n  <span class=\"glyphicon glyphicon-refresh icon-spin\"></span>\n  <span> loading label ...</span>\n</span>\n"
                },] },
    ];
    /** @nocollapse */
    LabelMapperComponent.ctorParameters = function () { return [
        { type: LabelMapperService }
    ]; };
    LabelMapperComponent.propDecorators = {
        label: [{ type: Input }]
    };
    return LabelMapperComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandLabelMapperModule = /** @class */ (function () {
    function HelgolandLabelMapperModule() {
    }
    HelgolandLabelMapperModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        LabelMapperComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        LabelMapperComponent
                    ],
                    providers: [
                        LabelMapperService
                    ]
                },] },
    ];
    return HelgolandLabelMapperModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Represents an abstract dataset entry for a list, which has the following functions:
 *  - can be selected and is selectable internally, with a corresponding output event
 *  - can be deleted, which also triggers an output event
 *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
 * @abstract
 */
var ListEntryComponent = /** @class */ (function () {
    function ListEntryComponent(internalIdHandler, translateSrvc) {
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onDeleteDataset = new EventEmitter();
        this.onSelectDataset = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.datasetId) {
            this.internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
            this.loadDataset(this.translateSrvc.currentLang);
        }
        this.langChangeSubscription = this.translateSrvc.onLangChange.subscribe(function (langChangeEvent) { return _this.onLanguageChanged(langChangeEvent); });
    };
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.langChangeSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.removeDataset = /**
     * @return {?}
     */
    function () {
        this.onDeleteDataset.emit(true);
    };
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.toggleSelection = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
        this.onSelectDataset.emit(this.selected);
    };
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    ListEntryComponent.prototype.onLanguageChanged = /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    function (langChangeEvent) {
        if (this.internalId) {
            this.loadDataset(langChangeEvent.lang);
        }
    };
    ListEntryComponent.propDecorators = {
        datasetId: [{ type: Input }],
        selected: [{ type: Input }],
        onDeleteDataset: [{ type: Output }],
        onSelectDataset: [{ type: Output }]
    };
    return ListEntryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ProfileEntryComponent = /** @class */ (function (_super) {
    __extends(ProfileEntryComponent, _super);
    function ProfileEntryComponent(api, internalIdHandler, translateSrvc) {
        var _this = _super.call(this, internalIdHandler, translateSrvc) || this;
        _this.api = api;
        _this.internalIdHandler = internalIdHandler;
        _this.translateSrvc = translateSrvc;
        _this.onUpdateOptions = new EventEmitter();
        _this.onDeleteDatasetOptions = new EventEmitter();
        _this.onEditOptions = new EventEmitter();
        _this.onOpenInCombiView = new EventEmitter();
        _this.onShowGeometry = new EventEmitter();
        return _this;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    ProfileEntryComponent.prototype.removeDatasetOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.onDeleteDatasetOptions.emit(options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ProfileEntryComponent.prototype.editDatasetOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.onEditOptions.emit(options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ProfileEntryComponent.prototype.toggleVisibility = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        options.visible = !options.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    };
    /**
     * @return {?}
     */
    ProfileEntryComponent.prototype.isMobile = /**
     * @return {?}
     */
    function () {
        if (this.dataset) {
            return this.dataset.platformType === PlatformTypes.mobileInsitu;
        }
        return false;
    };
    /**
     * @param {?} option
     * @return {?}
     */
    ProfileEntryComponent.prototype.openInCombiView = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.onOpenInCombiView.emit(option);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    ProfileEntryComponent.prototype.showGeometry = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var _this = this;
        /** @type {?} */
        var internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
        if (this.isMobile()) {
            /** @type {?} */
            var timespan = new Timespan(option.timestamp);
            this.api.getData(internalId.id, internalId.url, timespan).subscribe(function (result) {
                if (result.values.length === 1) {
                    _this.onShowGeometry.emit(result.values[0].geometry);
                }
            });
        }
        else {
            this.api.getPlatform(this.dataset.parameters.platform.id, internalId.url).subscribe(function (platform) {
                _this.onShowGeometry.emit(platform.geometry);
            });
        }
    };
    /**
     * @param {?=} lang
     * @return {?}
     */
    ProfileEntryComponent.prototype.loadDataset = /**
     * @param {?=} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        /** @type {?} */
        var params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getDataset(this.internalId.id, this.internalId.url, params).subscribe(function (dataset) {
            _this.dataset = dataset;
            _this.loading = false;
        });
    };
    ProfileEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-profile-entry',
                    template: "<div class=\"legendItem\" style=\"position: relative;\" [ngClass]=\"{'selected': selected}\" (click)=\"toggleSelection()\">\n  <div class=\"legendItemheader\">\n    <div class=\"legendItemLabel\">\n      <n52-label-mapper label=\"{{dataset?.parameters.platform.label}}\"></n52-label-mapper>\n    </div>\n    <div class=\"small\">\n      <n52-label-mapper label=\"{{dataset?.parameters.phenomenon.label}}\"></n52-label-mapper>\n      <span *ngIf=\"dataset?.uom\">[\n        <n52-label-mapper label=\"{{dataset.uom}}\"></n52-label-mapper>]</span>\n    </div>\n    <div class=\"small\">\n      <n52-label-mapper label=\"{{dataset?.parameters.procedure.label}}\"></n52-label-mapper>\n    </div>\n    <div class=\"small\" *ngIf=\"dataset?.parameters.category.label != dataset?.parameters.phenomenon.label\">\n      <n52-label-mapper label=\"{{dataset?.parameters.category.label}}\"></n52-label-mapper>\n    </div>\n  </div>\n  <div *ngFor=\"let item of datasetOptions\">\n    <div>\n      <span [ngStyle]=\"{'color': item.color}\">{{item.timestamp | date: 'short'}}</span>\n      <span class=\"fa\" [ngClass]=\"{'fa-eye-slash': item.visible, 'fa-eye': !item.visible}\" (click)=\"toggleVisibility(item); $event.stopPropagation();\"\n        title=\"{{'profiles.legend.visibility' | translate}}\"></span>\n      <span class=\"fa fa-pencil\" (click)=\"editDatasetOptions(item); $event.stopPropagation();\" [ngStyle]=\"{color: item.color}\"\n        title=\"{{'profiles.legend.edit-style' | translate}}\"></span>\n      <span class=\"fa fa-map-marker\" (click)=\"showGeometry(item); $event.stopPropagation();\" title=\"{{'profiles.legend.show-geometry' | translate}}\"></span>\n      <span class=\"fa fa-times\" (click)=\"removeDatasetOptions(item); $event.stopPropagation();\" title=\"{{'profiles.legend.delete-subentry' | translate}}\"></span>\n    </div>\n    <div (click)=\"openInCombiView(item); $event.stopPropagation();\" *ngIf=\"isMobile()\" class=\"toCombiView\">\n      <span class=\"fa fa-arrow-right\"></span>\n      <span>{{'profiles.legend.go-to-combi-view' | translate}}</span>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}:host .legendItem .small{font-size:90%;word-break:break-all}:host .legendItem.selected{padding:0;border-width:5px;border-style:solid}:host .legendItem .legendItemheader{cursor:pointer}:host .legendItem .toCombiView{cursor:pointer}:host .legendItem .fa{cursor:pointer}"]
                },] },
    ];
    /** @nocollapse */
    ProfileEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    ProfileEntryComponent.propDecorators = {
        datasetOptions: [{ type: Input }],
        onUpdateOptions: [{ type: Output }],
        onDeleteDatasetOptions: [{ type: Output }],
        onEditOptions: [{ type: Output }],
        onOpenInCombiView: [{ type: Output }],
        onShowGeometry: [{ type: Output }]
    };
    return ProfileEntryComponent;
}(ListEntryComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Implements the abstract ListEntryComponent, which has the following functions:
 *  - can be selected and is selectable internally, with a corresponding output event
 *  - can be deleted, which also triggers an output event
 *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
 */
var SimpleTimeseriesEntryComponent = /** @class */ (function (_super) {
    __extends(SimpleTimeseriesEntryComponent, _super);
    function SimpleTimeseriesEntryComponent(api, internalIdHandler, translateSrvc) {
        var _this = _super.call(this, internalIdHandler, translateSrvc) || this;
        _this.api = api;
        _this.internalIdHandler = internalIdHandler;
        _this.translateSrvc = translateSrvc;
        return _this;
    }
    /**
     * @param {?=} lang
     * @return {?}
     */
    SimpleTimeseriesEntryComponent.prototype.loadDataset = /**
     * @param {?=} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        /** @type {?} */
        var params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getSingleTimeseries(this.internalId.id, this.internalId.url, params)
            .subscribe(function (timeseries) { return _this.setDataset(timeseries); }, function (error) {
            _this.api.getDataset(_this.internalId.id, _this.internalId.url, params).subscribe(function (dataset) { return _this.setDataset(dataset); });
        });
    };
    /**
     * @param {?} timeseries
     * @return {?}
     */
    SimpleTimeseriesEntryComponent.prototype.setDataset = /**
     * @param {?} timeseries
     * @return {?}
     */
    function (timeseries) {
        this.dataset = timeseries;
        this.setParameters();
        this.loading = false;
    };
    /**
     * @return {?}
     */
    SimpleTimeseriesEntryComponent.prototype.setParameters = /**
     * @return {?}
     */
    function () {
        if (this.dataset instanceof Dataset) {
            this.platformLabel = this.dataset.parameters.platform.label;
        }
        else if (this.dataset instanceof Timeseries) {
            this.platformLabel = this.dataset.station.properties.label;
        }
        this.phenomenonLabel = this.dataset.parameters.phenomenon.label;
        this.procedureLabel = this.dataset.parameters.procedure.label;
        this.categoryLabel = this.dataset.parameters.category.label;
        this.uom = this.dataset.uom;
    };
    SimpleTimeseriesEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-simple-timeseries-entry',
                    template: "<span>Platform: {{platformLabel}}</span>\n<span>Phenomenon: {{phenomenonLabel}}</span>\n<span>Procedure: {{procedureLabel}}</span>\n<span>Category: {{categoryLabel}}</span>\n<span>Uom: {{uom}}</span>\n<button (click)=\"toggleSelection()\">select</button>\n<button (click)=\"removeDataset()\">remove</button>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    SimpleTimeseriesEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    return SimpleTimeseriesEntryComponent;
}(ListEntryComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends the SimpleTimeseriesEntryComponent, with the following functions:
 *  - dataset options and triggers the editation of the dataset options
 *  - triggers the show geometry event
 */
var ConfigurableTimeseriesEntryComponent = /** @class */ (function (_super) {
    __extends(ConfigurableTimeseriesEntryComponent, _super);
    function ConfigurableTimeseriesEntryComponent(api, internalIdHandler, translateSrvc) {
        var _this = _super.call(this, api, internalIdHandler, translateSrvc) || this;
        _this.api = api;
        _this.internalIdHandler = internalIdHandler;
        _this.translateSrvc = translateSrvc;
        _this.onUpdateOptions = new EventEmitter();
        _this.onEditOptions = new EventEmitter();
        _this.onShowGeometry = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    ConfigurableTimeseriesEntryComponent.prototype.toggleVisibility = /**
     * @return {?}
     */
    function () {
        this.datasetOptions.visible = !this.datasetOptions.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    };
    /**
     * @return {?}
     */
    ConfigurableTimeseriesEntryComponent.prototype.editDatasetOptions = /**
     * @return {?}
     */
    function () {
        this.onEditOptions.emit(this.datasetOptions);
    };
    /**
     * @return {?}
     */
    ConfigurableTimeseriesEntryComponent.prototype.showGeometry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.dataset instanceof Timeseries) {
            this.onShowGeometry.emit(this.dataset.station.geometry);
        }
        if (this.dataset instanceof Dataset) {
            this.api.getPlatform(this.dataset.parameters.platform.id, this.dataset.url).subscribe(function (platform) {
                _this.onShowGeometry.emit(platform.geometry);
            });
        }
    };
    ConfigurableTimeseriesEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-configurable-timeseries-entry',
                    template: "<span>Platform: {{platformLabel}}</span>\n<span>Phenomenon: {{phenomenonLabel}}</span>\n<span>Procedure: {{procedureLabel}}</span>\n<span>Category: {{categoryLabel}}</span>\n<span>Uom: {{uom}}</span>\n<button (click)=\"toggleSelection()\">toggle selection</button>\n<button (click)=\"removeDataset()\">remove</button>\n<button (click)=\"toggleVisibility()\">toggle visibility</button>\n<button (click)=\"editDatasetOptions()\">edit Options</button>\n<button (click)=\"showGeometry()\">show Geometry</button>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    ConfigurableTimeseriesEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    ConfigurableTimeseriesEntryComponent.propDecorators = {
        datasetOptions: [{ type: Input }],
        highlight: [{ type: Input }],
        onUpdateOptions: [{ type: Output }],
        onEditOptions: [{ type: Output }],
        onShowGeometry: [{ type: Output }]
    };
    return ConfigurableTimeseriesEntryComponent;
}(SimpleTimeseriesEntryComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends the ConfigurableTimeseriesEntryComponent, with the following functions:
 *  - first and latest validation
 *  - jump to first and latest value events
 */
var FirstLatestTimeseriesEntryComponent = /** @class */ (function (_super) {
    __extends(FirstLatestTimeseriesEntryComponent, _super);
    function FirstLatestTimeseriesEntryComponent(api, internalIdHandler, translateSrvc, timeSrvc) {
        var _this = _super.call(this, api, internalIdHandler, translateSrvc) || this;
        _this.api = api;
        _this.internalIdHandler = internalIdHandler;
        _this.translateSrvc = translateSrvc;
        _this.timeSrvc = timeSrvc;
        _this.onSelectDate = new EventEmitter();
        _this.hasData = true;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["timeInterval"]) {
            this.checkDataInTimespan();
        }
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.jumpToFirstTimeStamp = /**
     * @return {?}
     */
    function () {
        this.onSelectDate.emit(new Date(this.dataset.firstValue.timestamp));
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.jumpToLastTimeStamp = /**
     * @return {?}
     */
    function () {
        this.onSelectDate.emit(new Date(this.dataset.lastValue.timestamp));
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.setParameters = /**
     * @return {?}
     */
    function () {
        _super.prototype.setParameters.call(this);
        this.firstValue = this.dataset.firstValue;
        this.lastValue = this.dataset.lastValue;
        this.checkDataInTimespan();
    };
    /**
     * @return {?}
     */
    FirstLatestTimeseriesEntryComponent.prototype.checkDataInTimespan = /**
     * @return {?}
     */
    function () {
        if (this.timeInterval && this.dataset) {
            this.hasData = this.timeSrvc.overlaps(this.timeInterval, this.dataset.firstValue.timestamp, this.dataset.lastValue.timestamp);
        }
    };
    FirstLatestTimeseriesEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-first-latest-timeseries-entry',
                    template: "<span>{{procedureLabel}} - {{platformLabel}}</span>\n<span>Has Data: {{hasData}}</span>\n<button *ngIf=\"firstValue\" (click)=\"jumpToFirstTimeStamp()\">{{firstValue.value}} - {{firstValue.timestamp | date}}</button>\n<button *ngIf=\"lastValue\" (click)=\"jumpToLastTimeStamp()\">{{lastValue.value}} - {{lastValue.timestamp | date}}</button>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    FirstLatestTimeseriesEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: TranslateService },
        { type: Time }
    ]; };
    FirstLatestTimeseriesEntryComponent.propDecorators = {
        timeInterval: [{ type: Input }],
        onSelectDate: [{ type: Output }]
    };
    return FirstLatestTimeseriesEntryComponent;
}(ConfigurableTimeseriesEntryComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ReferenceValueColorCache = /** @class */ (function (_super) {
    __extends(ReferenceValueColorCache, _super);
    function ReferenceValueColorCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReferenceValueColorCache.decorators = [
        { type: Injectable },
    ];
    return ReferenceValueColorCache;
}(IdCache));
/**
 * Extends the FirstLatestTimeseriesEntryComponent, with the following functions:
 *  - handles the reference values of the dataset entry
 */
var TimeseriesEntryComponent = /** @class */ (function (_super) {
    __extends(TimeseriesEntryComponent, _super);
    function TimeseriesEntryComponent(api, timeSrvc, internalIdHandler, color, refValCache, translateSrvc) {
        var _this = _super.call(this, api, internalIdHandler, translateSrvc, timeSrvc) || this;
        _this.api = api;
        _this.timeSrvc = timeSrvc;
        _this.internalIdHandler = internalIdHandler;
        _this.color = color;
        _this.refValCache = refValCache;
        _this.translateSrvc = translateSrvc;
        _this.informationVisible = false;
        return _this;
    }
    /**
     * @return {?}
     */
    TimeseriesEntryComponent.prototype.toggleInformation = /**
     * @return {?}
     */
    function () {
        this.informationVisible = !this.informationVisible;
    };
    /**
     * @param {?} refValue
     * @return {?}
     */
    TimeseriesEntryComponent.prototype.toggleReferenceValue = /**
     * @param {?} refValue
     * @return {?}
     */
    function (refValue) {
        /** @type {?} */
        var idx = this.datasetOptions.showReferenceValues.findIndex(function (entry) { return entry.id === refValue.referenceValueId; });
        /** @type {?} */
        var refValId = this.createRefValId(refValue.referenceValueId);
        if (idx > -1) {
            refValue.visible = false;
            this.datasetOptions.showReferenceValues.splice(idx, 1);
        }
        else {
            refValue.visible = true;
            this.datasetOptions.showReferenceValues.push({ id: refValue.referenceValueId, color: refValue.color });
        }
        this.refValCache.get(refValId).visible = refValue.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    };
    /**
     * @return {?}
     */
    TimeseriesEntryComponent.prototype.setParameters = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.setParameters.call(this);
        if (this.dataset.referenceValues) {
            this.dataset.referenceValues.forEach(function (e) {
                /** @type {?} */
                var refValId = _this.createRefValId(e.referenceValueId);
                /** @type {?} */
                var refValOption = _this.datasetOptions.showReferenceValues.find(function (o) { return o.id === e.referenceValueId; });
                if (refValOption) {
                    _this.refValCache.set(refValId, {
                        color: refValOption.color,
                        visible: true
                    });
                }
                if (!_this.refValCache.has(refValId)) {
                    _this.refValCache.set(refValId, {
                        color: _this.color.getColor(),
                        visible: false
                    });
                }
                e.color = _this.refValCache.get(refValId).color;
                e.visible = _this.refValCache.get(refValId).visible;
            });
        }
    };
    /**
     * @param {?} refId
     * @return {?}
     */
    TimeseriesEntryComponent.prototype.createRefValId = /**
     * @param {?} refId
     * @return {?}
     */
    function (refId) {
        return this.dataset.url + refId;
    };
    TimeseriesEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-timeseries-entry',
                    template: "<div class=\"legendItem\" style=\"position: relative;\" [ngStyle]=\"{'border-color': datasetOptions?.color}\" [ngClass]=\"{'selected': selected}\"\n  (click)=\"toggleSelection()\">\n  <div class=\"loading-overlay\" *ngIf=\"loading\" [ngStyle]=\"{'background-color': datasetOptions?.color}\">\n    <div class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></div>\n  </div>\n  <div>\n    <div class=\"legendItemheader\" [ngClass]=\"{'highlight': highlight}\">\n      <div class=\"legendItemLabel\" [ngStyle]=\"{'color': datasetOptions?.color}\">\n        <n52-label-mapper label=\"{{platformLabel}}\"></n52-label-mapper>\n        <!-- <n52-favorite-toggler [dataset]=\"dataset\"></n52-favorite-toggler> -->\n      </div>\n      <div class=\"noDataWarning firstLastEntry\" *ngIf=\"!hasData\">\n        <div>\n          <span class=\"fa fa-exclamation-triangle red\"></span>\n          <span class=\"small-label\">Keine Daten verf\u00FCgbar</span>\n        </div>\n        <div class=\"additionalLegendEntry\" (click)=\"jumpToLastTimeStamp(); $event.stopPropagation();\">\n          <span class=\"fa fa-chevron-right\"></span>\n          <span class=\"small-label\">Springe zur letzten Messung</span>\n        </div>\n      </div>\n      <div class=\"small-label\">\n        <n52-label-mapper label=\"{{phenomenonLabel}}\"></n52-label-mapper>\n        <span *ngIf=\"uom\">\n          <span>[</span>\n          <n52-label-mapper label=\"{{uom}}\"></n52-label-mapper>\n          <span>]</span>\n        </span>\n      </div>\n      <div class=\"small-label\">\n        <n52-label-mapper label=\"{{procedureLabel}}\"></n52-label-mapper>\n      </div>\n      <div class=\"small-label\" *ngIf=\"categoryLabel != phenomenonLabel\">\n        <n52-label-mapper label=\"{{categoryLabel}}\"></n52-label-mapper>\n      </div>\n    </div>\n    <div class=\"legendicons\">\n      <span class=\"fa\" [ngClass]=\"{'fa-chevron-down': !informationVisible, 'fa-chevron-up': informationVisible}\" (click)=\"toggleInformation(); $event.stopPropagation();\"></span>\n      <span class=\"fa\" [ngClass]=\"{'fa-eye-slash': datasetOptions?.visible, 'fa-eye': !datasetOptions?.visible}\" (click)=\"toggleVisibility(); $event.stopPropagation();\"></span>\n      <span class=\"fa fa-map-marker\" (click)=\"showGeometry(); $event.stopPropagation();\"></span>\n      <span class=\"fa fa-pencil\" (click)=\"editDatasetOptions(); $event.stopPropagation();\" [ngStyle]=\"{color: datasetOptions?.color}\"></span>\n      <span class=\"fa fa-times\" (click)=\"removeDataset(); $event.stopPropagation();\"></span>\n    </div>\n    <div class=\"collapseLegendEntry small-label\" *ngIf=\"informationVisible\">\n      <div class=\"firstLastEntry additionalLegendEntry\" *ngIf=\"firstValue\" (click)=\"jumpToFirstTimeStamp(); $event.stopPropagation();\">\n        <span class=\"fa fa-chevron-right\"></span>\n        <span>Erster Wert bei</span>\n        <span>{{firstValue.timestamp| date: 'short'}}</span>\n        <span class=\"hidden-medium\">({{firstValue.value}} {{uom}})</span>\n      </div>\n      <div class=\"firstLastEntry additionalLegendEntry\" *ngIf=\"lastValue\" (click)=\"jumpToLastTimeStamp(); $event.stopPropagation();\">\n        <span class=\"fa fa-chevron-right\"></span>\n        <span>Letzter Wert bei</span>\n        <span>{{lastValue.timestamp| date: 'short'}}</span>\n        <span class=\"hidden-medium\">({{lastValue.value}} {{uom}})</span>\n      </div>\n      <div *ngIf=\"dataset?.referenceValues\">\n        <div class=\"additionalLegendEntry\" *ngFor=\"let ref of dataset.referenceValues\" (click)=\"toggleReferenceValue(ref); $event.stopPropagation();\"\n          [ngClass]=\"{'selected': ref.visible}\" [ngStyle]=\"{color: ref.color}\">\n          <span class=\"fa fa-chevron-right\"></span>\n          <span>{{ref.label}}</span>\n        </div>\n      </div>\n      <!-- <div class=\"additionalLegendEntry\" ng-click=\"$event.stopPropagation(); createExportCsv(timeseries)\">\n                <span class=\"glyphicon glyphicon-download\"></span>\n                <span translate=\"export.label\"></span>\n            </div> -->\n      <!-- <div class=\"additionalLegendEntry\">\n                <swc-procedure-metadata timeseries='timeseries'></swc-procedure-metadata>\n                <swc-timeseries-raw-data-output timeseries='timeseries'></swc-timeseries-raw-data-output>\n                <swc-sos-url timeseries='timeseries'></swc-sos-url>\n            </div> -->\n    </div>\n  </div>\n</div>",
                    styles: [".geometryViewerModal .modal-body{height:50vh}n52-timeseries-entry .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}n52-timeseries-entry .legendItem .small-label{font-size:90%;word-break:break-all}n52-timeseries-entry .legendItem.selected{padding:0;border-width:5px;border-style:solid}n52-timeseries-entry .legendItem .legendItemheader{cursor:pointer}n52-timeseries-entry .legendItem .legendItemheader.highlight{font-weight:700}n52-timeseries-entry .legendItem .legendicons span{margin:0 4%;font-size:150%}n52-timeseries-entry .legendItem .legendicons span:hover{cursor:pointer}n52-timeseries-entry .legendItem .legendicons .delete{z-index:5}n52-timeseries-entry .legendItem .noDataWarning{border:2px solid red;border-radius:5px;padding:3px}n52-timeseries-entry .legendItem .noDataWarning .red{color:red}n52-timeseries-entry .legendItem .additionalLegendEntry:hover{cursor:pointer}n52-timeseries-entry .legendItem .additionalLegendEntry.selected{font-weight:bolder}n52-timeseries-entry .legendItem .refEntry.selected{border-style:solid;border-width:2px;border-radius:2px;margin:2px 0}n52-timeseries-entry .legendItem .loading-overlay{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.5;z-index:1;display:flex;justify-content:center;align-items:center}n52-timeseries-entry .legendItem .loading-overlay .fa-spin{color:#fff;font-size:25px;width:25px;height:25px}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    TimeseriesEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: Time },
        { type: InternalIdHandler },
        { type: ColorService },
        { type: ReferenceValueColorCache },
        { type: TranslateService }
    ]; };
    return TimeseriesEntryComponent;
}(FirstLatestTimeseriesEntryComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TrajectoryEntryComponent = /** @class */ (function (_super) {
    __extends(TrajectoryEntryComponent, _super);
    function TrajectoryEntryComponent(api, internalIdHandler, translateSrvc) {
        var _this = _super.call(this, internalIdHandler, translateSrvc) || this;
        _this.api = api;
        _this.internalIdHandler = internalIdHandler;
        _this.translateSrvc = translateSrvc;
        _this.onUpdateOptions = new EventEmitter();
        _this.onEditOptions = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    TrajectoryEntryComponent.prototype.toggleVisibility = /**
     * @return {?}
     */
    function () {
        this.datasetOptions.visible = !this.datasetOptions.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    TrajectoryEntryComponent.prototype.editDatasetOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.onEditOptions.emit(options);
    };
    /**
     * @param {?=} lang
     * @return {?}
     */
    TrajectoryEntryComponent.prototype.loadDataset = /**
     * @param {?=} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        /** @type {?} */
        var params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getDataset(this.internalId.id, this.internalId.url, params).subscribe(function (dataset) {
            _this.dataset = dataset;
            _this.loading = false;
        });
    };
    TrajectoryEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-trajectory-entry',
                    template: "<div style=\"white-space: nowrap;\" (click)=\"toggleVisibility()\">\n  <span>\n    <a class=\"btn btn-light\">\n      <span class=\"fa fa-plus\" [ngClass]=\"{'fa-eye': !datasetOptions?.visible, 'fa-eye-slash': datasetOptions?.visible}\"></span>\n    </a>\n  </span>\n  <span style=\"padding-left: 10px;\" [ngStyle]=\"{'color': datasetOptions?.color}\">{{dataset?.parameters.phenomenon.label}}</span>\n  <span class=\"fa fa-pencil\" (click)=\"editDatasetOptions(datasetOptions); $event.stopPropagation();\" [ngStyle]=\"{color: datasetOptions?.color}\"></span>\n</div>"
                },] },
    ];
    /** @nocollapse */
    TrajectoryEntryComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    TrajectoryEntryComponent.propDecorators = {
        datasetOptions: [{ type: Input }],
        onUpdateOptions: [{ type: Output }],
        onEditOptions: [{ type: Output }]
    };
    return TrajectoryEntryComponent;
}(ListEntryComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS = [
    TimeseriesEntryComponent,
    ConfigurableTimeseriesEntryComponent,
    SimpleTimeseriesEntryComponent,
    FirstLatestTimeseriesEntryComponent,
    ProfileEntryComponent,
    TrajectoryEntryComponent
];
var HelgolandDatasetlistModule = /** @class */ (function () {
    function HelgolandDatasetlistModule() {
    }
    HelgolandDatasetlistModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                        HelgolandCoreModule,
                        HelgolandLabelMapperModule,
                        FormsModule
                    ],
                    declarations: [
                        COMPONENTS
                    ],
                    exports: [
                        COMPONENTS
                    ],
                    providers: [
                        ReferenceValueColorCache
                    ]
                },] },
    ];
    return HelgolandDatasetlistModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DatasetTableComponent = /** @class */ (function (_super) {
    __extends(DatasetTableComponent, _super);
    function DatasetTableComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
        var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.translateSrvc = translateSrvc;
        _this.preparedData = Array();
        _this.preparedColors = Array();
        _this.ready = false;
        _this.timeseriesArray = new Array();
        return _this;
    }
    /**
     * @return {?}
     */
    DatasetTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.additionalStylesheet = document.getElementById('selectedIdsStylesheet');
        if (!this.additionalStylesheet) {
            this.additionalStylesheet = document.createElement('style');
            this.additionalStylesheet.id = 'selectedIdsStylesheet';
            document.body.appendChild(this.additionalStylesheet);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatasetTableComponent.prototype.sort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var by = event.target.dataset.columnId;
        /** @type {?} */
        var direction = event.target.classList.contains('sorted-asc') ? 'desc' : 'asc';
        /** @type {?} */
        var directionNumber = (direction === 'asc' ? 1 : -1);
        // set CSS classes
        Array.from(event.target.parentElement.children).forEach(function (child) { return child.className = ''; });
        if (direction === 'asc') {
            (/** @type {?} */ (event.target)).classList.add('sorted-asc');
        }
        else {
            (/** @type {?} */ (event.target)).classList.add('sorted-desc');
        }
        /** @type {?} */
        var sortCallback;
        if (by === 'datetime') {
            sortCallback = function (e1, e2) { return directionNumber * (e1.datetime - e2.datetime); };
        }
        else {
            /** @type {?} */
            var index_1 = parseInt(by, 10);
            // basically the same as above, but take care of 'undefined' values
            sortCallback = function (e1, e2) {
                return (e1.values[index_1] === undefined ? 1 :
                    (e2.values[index_1] === undefined ? -1 :
                        (directionNumber * (e1.values[index_1] - e2.values[index_1]))));
            };
        }
        // do the sort
        this.preparedData = this.preparedData.sort(sortCallback);
    };
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    DatasetTableComponent.prototype.onLanguageChanged = /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    function (langChangeEvent) { };
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    DatasetTableComponent.prototype.reloadDataForDatasets = /**
     * @param {?} datasetIds
     * @return {?}
     */
    function (datasetIds) {
        // console.log('reload data at ' + new Date());
    };
    /**
     * @param {?} options
     * @return {?}
     */
    DatasetTableComponent.prototype.presenterOptionsChanged = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        // only included because it's required by abstract parent class (wouldn't compile without)
        // no point in implementing this method in a non-graphing component
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.getIndexFromInternalId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        // helper method
        return this.datasetIds.indexOf(internalId);
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.setSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        var index = this.getIndexFromInternalId(internalId);
        rules[index] = 'td:nth-child(' + (index + 2) + ') {font-weight: bold}';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.removeSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        var index = this.getIndexFromInternalId(internalId);
        rules[index] = '';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    };
    /**
     * @return {?}
     */
    DatasetTableComponent.prototype.timeIntervalChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // the easiest method: delete everything and build preparedData from scratch.
        this.preparedData = [];
        this.timeseriesArray.forEach(function (timeseries) { return _this.loadTsData(timeseries); });
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.removeDataset = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var index = this.getIndexFromInternalId(internalId);
        // remove entries of this dataset in each datetime's `values` arrays
        this.preparedData.forEach(function (e) { return e.values.splice(index, 1); });
        // if a datetime became completely empty (i.e. there's only `undefined`s in the `values` array, delete this datetime)
        this.preparedData = this.preparedData.filter(function (e) { return e.values.reduce(function (a, c) { return a || c; }, undefined) !== undefined; });
        this.preparedColors.splice(index, 1);
        /** @type {?} */
        var rules = this.additionalStylesheet.innerHTML.split('\r\n');
        rules.splice(index, 1);
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
        this.timeseriesArray.splice(index, 1);
    };
    /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    DatasetTableComponent.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    function (internalId, url) {
        var _this = this;
        this.timeseriesArray.length += 1; // create new empty slot
        this.preparedColors.push('darkgrey');
        this.additionalStylesheet.innerHTML += '\r\n';
        this.api.getSingleTimeseries(internalId, url)
            .subscribe(function (timeseries) { return _this.addTimeseries(timeseries); });
    };
    /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    DatasetTableComponent.prototype.datasetOptionsChanged = /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    function (internalId, options) {
        if (this.timeseriesArray.some(function (e) { return e !== undefined && e.internalId === internalId; })) {
            /** @type {?} */
            var index = this.getIndexFromInternalId(internalId);
            this.preparedColors[index] = options.color;
            // TODO-CF: Page isn't refreshed instantly, but only after the next sort (or possible other actions as well)
        }
    };
    /**
     * @return {?}
     */
    DatasetTableComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        // TODO-CF: needed???? probably not
    };
    /**
     * @param {?} timeseries
     * @return {?}
     */
    DatasetTableComponent.prototype.addTimeseries = /**
     * @param {?} timeseries
     * @return {?}
     */
    function (timeseries) {
        this.timeseriesArray[this.getIndexFromInternalId(timeseries.internalId)] = timeseries;
        this.loadTsData(timeseries);
    };
    /**
     * @param {?} timeseries
     * @return {?}
     */
    DatasetTableComponent.prototype.loadTsData = /**
     * @param {?} timeseries
     * @return {?}
     */
    function (timeseries) {
        var _this = this;
        if (this.timespan) {
            // const datasetOptions = this.datasetOptions.get(timeseries.internalId);
            this.api.getTsData(timeseries.id, timeseries.url, this.timespan, { format: 'flot' })
                .subscribe(function (result) {
                /** @type {?} */
                var index = _this.getIndexFromInternalId(timeseries.internalId);
                _this.prepareData(timeseries, result.values.map(function (e) {
                    /** @type {?} */
                    var a = new Array(_this.datasetIds.length).fill(undefined);
                    a[index] = e[1];
                    return { datetime: e[0], values: a };
                }));
            });
        }
    };
    /**
     * @param {?} timeseries
     * @param {?} newdata
     * @return {?}
     */
    DatasetTableComponent.prototype.prepareData = /**
     * @param {?} timeseries
     * @param {?} newdata
     * @return {?}
     */
    function (timeseries, newdata) {
        /** @type {?} */
        var index = this.getIndexFromInternalId(timeseries.internalId);
        // if datasetOptions are provided, use their color to style the header's "color band" (i.e. the 7px border-bottom of th)
        if (this.datasetOptions) {
            /** @type {?} */
            var datasetOptions = this.datasetOptions.get(timeseries.internalId);
            this.preparedColors[index] = datasetOptions.color;
        }
        else {
            // when no color is specified: make border transparent so the header's background color is used for the color band, too
            this.preparedColors[index] = 'rgba(0,0,0,0)';
        }
        if (this.selectedDatasetIds.indexOf(timeseries.internalId) !== -1) {
            this.setSelectedId(timeseries.internalId);
        }
        // `newdata` is expected in exactly the same format `preparedData` would look like if that timeseries was the only one
        // to actually have data (i.e. `values` has the length of timeseriesArray, but all slots are `undefined`, except for
        // the slot that corresponds to that timeseries)
        // `timeseries` is first timeseries added -> no other `preparedData` to merge with
        if (this.preparedData.length === 0) {
            // set newdata as preparedData (as per above)
            this.preparedData = newdata;
            // `timeseries` is not the first timeseries added -> we have to merge `newdata` into the existing `preparedData`
        }
        else {
            /** @type {?} */
            var i = 0;
            /** @type {?} */
            var j = 0; // loop variable for `newdata`
            // go through all data points in `newdata`
            while (j < newdata.length) {
                // timestamps match
                if (this.preparedData[i] && this.preparedData[i].datetime === newdata[j].datetime) {
                    // just add `newdata`'s value to the existing `values` array in `preparedData`
                    this.preparedData[i].values[index] = newdata[j].values[index];
                    // increment both
                    i++;
                    j++;
                    // `newdata` is ahead of `preparedData`
                }
                else if (this.preparedData[i] && this.preparedData[i].datetime < newdata[j].datetime) {
                    // do nothing because there's already an undefined there
                    // give preparedData the chance to catch up with newdata
                    i++;
                    // `preparedData` is ahead of `newdata`
                }
                else {
                    // the current `newdata` is the first dataset that has this datetime -> add it to the preparedData array
                    this.preparedData.splice(i, 0, newdata[j]);
                    // give newdata the chance to catch up with preparedData
                    j++;
                    // but preparedData is 1 longer now, too
                    i++;
                }
            }
        }
        this.ready = this.timeseriesArray.every(function (e) { return e !== undefined; });
    };
    DatasetTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-dataset-table',
                    template: "<table *ngIf=\"ready\">\n  <thead>\n    <tr>\n      <th (click)=\"sort($event)\" [attr.data-column-id]=\"'datetime'\" class=\"sorted-asc\">\n        Zeit\n      </th>\n      <th *ngFor=\"let series of this.timeseriesArray; let i = index\" (click)=\"sort($event)\" [attr.data-column-id]=\"i\" [ngStyle]=\"{ 'border-color': preparedColors[i] }\">\n        {{series?.label}} [{{series?.uom}}]\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of this.preparedData\">\n      <td>{{row.datetime | date: 'short'}}</td>\n      <td *ngFor=\"let value of row.values\">{{value}}</td>\n    </tr>\n  </tbody>\n</table>\n",
                    styles: [":host{flex:1;overflow-y:scroll;overflow-x:hidden}:host tbody,:host thead tr{display:table;table-layout:fixed;width:100%}:host table{display:block;border-collapse:separate;border-spacing:0 1px}:host thead{display:block;position:-webkit-sticky;position:sticky;top:0;border-spacing:0}:host tr:nth-child(2n){background-color:#eee}:host th{background-color:#a9a9a9;cursor:pointer;border-bottom-width:7px;border-bottom-style:solid;overflow-wrap:break-word}:host th:first-child{border-bottom-color:#a9a9a9}:host th:first-child.sorted-asc,:host th:first-child.sorted-desc{border-bottom-color:#555}:host th.sorted-asc,:host th.sorted-desc{background-color:#555;color:#fff}:host th.sorted-asc:after{content:\"\\25B4\";float:right}:host th.sorted-desc:after{content:\"\\25BE\";float:right}:host td{white-space:nowrap;border-bottom:1px solid gray}:host td,:host th{padding:5px 10px}"]
                },] },
    ];
    /** @nocollapse */
    DatasetTableComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: TranslateService }
    ]; };
    return DatasetTableComponent;
}(DatasetPresenterComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandDatasetTableModule = /** @class */ (function () {
    function HelgolandDatasetTableModule() {
    }
    HelgolandDatasetTableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DatasetTableComponent
                    ],
                    imports: [
                        CommonModule,
                        TranslateModule,
                        HelgolandCoreModule
                    ],
                    exports: [
                        DatasetTableComponent
                    ],
                    providers: []
                },] },
    ];
    return HelgolandDatasetTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandDatasetlistModule, ProfileEntryComponent, ConfigurableTimeseriesEntryComponent, FirstLatestTimeseriesEntryComponent, SimpleTimeseriesEntryComponent, ReferenceValueColorCache, TimeseriesEntryComponent, TrajectoryEntryComponent, DatasetTableComponent, HelgolandDatasetTableModule, LabelMapperService, LabelMapperComponent, HelgolandLabelMapperModule, ListEntryComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWRlcGljdGlvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvbGFiZWwtbWFwcGVyL2xhYmVsLW1hcHBlci5tb2R1bGUudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC9saXN0LWVudHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXRsaXN0L3Byb2ZpbGUtZW50cnkvcHJvZmlsZS1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldGxpc3QvbW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldC10YWJsZS9kYXRhc2V0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXQtdGFibGUvbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJZENhY2hlLCBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IElkQ2FjaGU8c3RyaW5nPiA9IG5ldyBJZENhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByb3RlY3RlZCBzZXR0aW5nc1NydmM6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgICApIHsgfVxuXG4gICAgcHVibGljIGdldE1hcHBlZExhYmVsKGxhYmVsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5nc1NydmMuZ2V0U2V0dGluZ3MoKS5zb2x2ZUxhYmVscykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZmluZFVybChsYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIHRoaXMuY2FjaGUuZ2V0KHVybCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWxVcmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NTcnZjLmdldFNldHRpbmdzKCkucHJveHlVcmwgPyB0aGlzLnNldHRpbmdzU3J2Yy5nZXRTZXR0aW5ncygpLnByb3h5VXJsICsgdXJsIDogdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChsYWJlbFVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtbCA9ICQucGFyc2VYTUwocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKHVybCwgJCh4bWwpLmZpbmQoJ3ByZWZMYWJlbCcpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudGx5IGRvIG5vdGhpbmcgYW5kIHVzZSBvbGQgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbC5zdWJzdHJpbmcobGFiZWwubGFzdEluZGV4T2YoJy8nKSArIDEsIGxhYmVsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCByZXNvbHZlZExhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1MYWJlbChvYnNlcnZlciwgcmVzb2x2ZWRMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpcm1MYWJlbChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPiwgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGxhYmVsKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRVcmwobGFiZWw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAobGFiZWwgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlZ2V4VG9rZW4gPSAvKCgoZnRwfGh0dHBzPyk6XFwvXFwvKVtcXC1cXHdAOiVfXFwrLn4jPyZcXC9cXC89XSspL2c7XG4gICAgICAgIGNvbnN0IG1hdGNoQXJyYXkgPSByZWdleFRva2VuLmV4ZWMoc291cmNlKTtcbiAgICAgICAgaWYgKG1hdGNoQXJyYXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaEFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGFiZWwtbWFwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiZGV0ZXJtaW5lZExhYmVsXCI+e3tkZXRlcm1pbmVkTGFiZWx9fTwvc3Bhbj5cbjxzcGFuICpuZ0lmPVwibG9hZGluZ1wiPlxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBpY29uLXNwaW5cIj48L3NwYW4+XG4gIDxzcGFuPiBsb2FkaW5nIGxhYmVsIC4uLjwvc3Bhbj5cbjwvc3Bhbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBkZXRlcm1pbmVkTGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGFiZWxNYXBwZXJTcnZjOiBMYWJlbE1hcHBlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXBwZXJTcnZjLmdldE1hcHBlZExhYmVsKHRoaXMubGFiZWwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVkTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlckNvbXBvbmVudCB9IGZyb20gJy4vbGFiZWwtbWFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGFiZWxNYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTGFiZWxNYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTGFiZWxNYXBwZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnRlcm5hbERhdGFzZXRJZCwgSW50ZXJuYWxJZEhhbmRsZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGFic3RyYWN0IGRhdGFzZXQgZW50cnkgZm9yIGEgbGlzdCwgd2hpY2ggaGFzIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gY2FuIGJlIHNlbGVjdGVkIGFuZCBpcyBzZWxlY3RhYmxlIGludGVybmFsbHksIHdpdGggYSBjb3JyZXNwb25kaW5nIG91dHB1dCBldmVudFxuICogIC0gY2FuIGJlIGRlbGV0ZWQsIHdoaWNoIGFsc28gdHJpZ2dlcnMgYW4gb3V0cHV0IGV2ZW50XG4gKiAgLSB0cmFuc2xhdGFibGUsIHNvIGl0IHRyaWdnZXJzIHRoZSBtZXRob2RlIG9uTGFuZ3VhZ2VDaGFuZ2VkIHdoZW4gdGhlIGxhbmd1YWdlIGlzIHN3aXRjaGVkXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0RW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRGVsZXRlRGF0YXNldDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0RGF0YXNldDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGxvYWRpbmc7XG5cbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZDogSW50ZXJuYWxEYXRhc2V0SWQ7XG5cbiAgICBwcml2YXRlIGxhbmdDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRJZCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbElkID0gdGhpcy5pbnRlcm5hbElkSGFuZGxlci5yZXNvbHZlSW50ZXJuYWxJZCh0aGlzLmRhdGFzZXRJZCk7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0KHRoaXMudHJhbnNsYXRlU3J2Yy5jdXJyZW50TGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYW5nQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy50cmFuc2xhdGVTcnZjLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYW5nQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXQoKSB7XG4gICAgICAgIHRoaXMub25EZWxldGVEYXRhc2V0LmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgICB0aGlzLm9uU2VsZWN0RGF0YXNldC5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pbnRlcm5hbElkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0KGxhbmdDaGFuZ2VFdmVudC5sYW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBsb2FkRGF0YXNldChsYW5nPzogc3RyaW5nKTogdm9pZDtcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldCxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5LFxuICAgIFBhcmFtZXRlckZpbHRlcixcbiAgICBQbGF0Zm9ybVR5cGVzLFxuICAgIFRpbWVkRGF0YXNldE9wdGlvbnMsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExpc3RFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL2xpc3QtZW50cnkuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItcHJvZmlsZS1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5cbiAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1oZWFkZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbUxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wbGF0Zm9ybS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPlxuICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPHNwYW4gKm5nSWY9XCJkYXRhc2V0Py51b21cIj5bXG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0LnVvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPl08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wcm9jZWR1cmUubGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIiAqbmdJZj1cImRhdGFzZXQ/LnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWwgIT0gZGF0YXNldD8ucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhc2V0T3B0aW9uc1wiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogaXRlbS5jb2xvcn1cIj57e2l0ZW0udGltZXN0YW1wIHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogaXRlbS52aXNpYmxlLCAnZmEtZXllJzogIWl0ZW0udmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlVmlzaWJpbGl0eShpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLnZpc2liaWxpdHknIHwgdHJhbnNsYXRlfX1cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdTdHlsZV09XCJ7Y29sb3I6IGl0ZW0uY29sb3J9XCJcbiAgICAgICAgdGl0bGU9XCJ7eydwcm9maWxlcy5sZWdlbmQuZWRpdC1zdHlsZScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiB0aXRsZT1cInt7J3Byb2ZpbGVzLmxlZ2VuZC5zaG93LWdlb21ldHJ5JyB8IHRyYW5zbGF0ZX19XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0T3B0aW9ucyhpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLmRlbGV0ZS1zdWJlbnRyeScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IChjbGljayk9XCJvcGVuSW5Db21iaVZpZXcoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiAqbmdJZj1cImlzTW9iaWxlKClcIiBjbGFzcz1cInRvQ29tYmlWaWV3XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWFycm93LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPHNwYW4+e3sncHJvZmlsZXMubGVnZW5kLmdvLXRvLWNvbWJpLXZpZXcnIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAubGVnZW5kSXRlbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLmxlZ2VuZEl0ZW0gLnNtYWxse2ZvbnQtc2l6ZTo5MCU7d29yZC1icmVhazpicmVhay1hbGx9Omhvc3QgLmxlZ2VuZEl0ZW0uc2VsZWN0ZWR7cGFkZGluZzowO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkfTpob3N0IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVye2N1cnNvcjpwb2ludGVyfTpob3N0IC5sZWdlbmRJdGVtIC50b0NvbWJpVmlld3tjdXJzb3I6cG9pbnRlcn06aG9zdCAubGVnZW5kSXRlbSAuZmF7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZUVudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9uc1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkRlbGV0ZURhdGFzZXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPFRpbWVkRGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uT3BlbkluQ29tYmlWaWV3OiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TaG93R2VvbWV0cnk6IEV2ZW50RW1pdHRlcjxHZW9KU09OLkdlb0pzb25PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgZWRpdGFibGVPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zO1xuICAgIHB1YmxpYyB0ZW1wQ29sb3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZURhdGFzZXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy52aXNpYmxlID0gIW9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb2JpbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQucGxhdGZvcm1UeXBlID09PSBQbGF0Zm9ybVR5cGVzLm1vYmlsZUluc2l0dTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5JbkNvbWJpVmlldyhvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbk9wZW5JbkNvbWJpVmlldy5lbWl0KG9wdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHZW9tZXRyeShvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxJZCA9IHRoaXMuaW50ZXJuYWxJZEhhbmRsZXIucmVzb2x2ZUludGVybmFsSWQodGhpcy5kYXRhc2V0SWQpO1xuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihvcHRpb24udGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFByb2ZpbGVEYXRhRW50cnk+KGludGVybmFsSWQuaWQsIGludGVybmFsSWQudXJsLCB0aW1lc3Bhbikuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHJlc3VsdC52YWx1ZXNbMF0uZ2VvbWV0cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0UGxhdGZvcm0odGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0uaWQsIGludGVybmFsSWQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHBsYXRmb3JtLmdlb21ldHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldCwgRGF0YXNldEFwaUludGVyZmFjZSwgSURhdGFzZXQsIEludGVybmFsSWRIYW5kbGVyLCBQYXJhbWV0ZXJGaWx0ZXIsIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0RW50cnlDb21wb25lbnQgfSBmcm9tICcuLi8uLi9saXN0LWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgTGlzdEVudHJ5Q29tcG9uZW50LCB3aGljaCBoYXMgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBjYW4gYmUgc2VsZWN0ZWQgYW5kIGlzIHNlbGVjdGFibGUgaW50ZXJuYWxseSwgd2l0aCBhIGNvcnJlc3BvbmRpbmcgb3V0cHV0IGV2ZW50XG4gKiAgLSBjYW4gYmUgZGVsZXRlZCwgd2hpY2ggYWxzbyB0cmlnZ2VycyBhbiBvdXRwdXQgZXZlbnRcbiAqICAtIHRyYW5zbGF0YWJsZSwgc28gaXQgdHJpZ2dlcnMgdGhlIG1ldGhvZGUgb25MYW5ndWFnZUNoYW5nZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgc3dpdGNoZWRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXNpbXBsZS10aW1lc2VyaWVzLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj5QbGF0Zm9ybToge3twbGF0Zm9ybUxhYmVsfX08L3NwYW4+XG48c3Bhbj5QaGVub21lbm9uOiB7e3BoZW5vbWVub25MYWJlbH19PC9zcGFuPlxuPHNwYW4+UHJvY2VkdXJlOiB7e3Byb2NlZHVyZUxhYmVsfX08L3NwYW4+XG48c3Bhbj5DYXRlZ29yeToge3tjYXRlZ29yeUxhYmVsfX08L3NwYW4+XG48c3Bhbj5Vb206IHt7dW9tfX08L3NwYW4+XG48YnV0dG9uIChjbGljayk9XCJ0b2dnbGVTZWxlY3Rpb24oKVwiPnNlbGVjdDwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpXCI+cmVtb3ZlPC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIExpc3RFbnRyeUNvbXBvbmVudCB7XG5cbiAgcHVibGljIGRhdGFzZXQ6IElEYXRhc2V0O1xuXG4gIHB1YmxpYyBwbGF0Zm9ybUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBwaGVub21lbm9uTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHByb2NlZHVyZUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXRlZ29yeUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyB1b206IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9O1xuICAgIGlmIChsYW5nKSB7IHBhcmFtcy5sYW5nID0gbGFuZzsgfVxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyh0aGlzLmludGVybmFsSWQuaWQsIHRoaXMuaW50ZXJuYWxJZC51cmwsIHBhcmFtcylcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLnNldERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4gdGhpcy5zZXREYXRhc2V0KGRhdGFzZXQpKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0RGF0YXNldCh0aW1lc2VyaWVzOiBJRGF0YXNldCkge1xuICAgIHRoaXMuZGF0YXNldCA9IHRpbWVzZXJpZXM7XG4gICAgdGhpcy5zZXRQYXJhbWV0ZXJzKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVycygpIHtcbiAgICBpZiAodGhpcy5kYXRhc2V0IGluc3RhbmNlb2YgRGF0YXNldCkge1xuICAgICAgdGhpcy5wbGF0Zm9ybUxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0ubGFiZWw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFzZXQgaW5zdGFuY2VvZiBUaW1lc2VyaWVzKSB7XG4gICAgICB0aGlzLnBsYXRmb3JtTGFiZWwgPSB0aGlzLmRhdGFzZXQuc3RhdGlvbi5wcm9wZXJ0aWVzLmxhYmVsO1xuICAgIH1cbiAgICB0aGlzLnBoZW5vbWVub25MYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWw7XG4gICAgdGhpcy5wcm9jZWR1cmVMYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnByb2NlZHVyZS5sYWJlbDtcbiAgICB0aGlzLmNhdGVnb3J5TGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbDtcbiAgICB0aGlzLnVvbSA9IHRoaXMuZGF0YXNldC51b207XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBEYXRhc2V0T3B0aW9ucywgSW50ZXJuYWxJZEhhbmRsZXIsIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgfSBmcm9tICcuLi9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEV4dGVuZHMgdGhlIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCwgd2l0aCB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGRhdGFzZXQgb3B0aW9ucyBhbmQgdHJpZ2dlcnMgdGhlIGVkaXRhdGlvbiBvZiB0aGUgZGF0YXNldCBvcHRpb25zXG4gKiAgLSB0cmlnZ2VycyB0aGUgc2hvdyBnZW9tZXRyeSBldmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnknLFxuICB0ZW1wbGF0ZTogYDxzcGFuPlBsYXRmb3JtOiB7e3BsYXRmb3JtTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlBoZW5vbWVub246IHt7cGhlbm9tZW5vbkxhYmVsfX08L3NwYW4+XG48c3Bhbj5Qcm9jZWR1cmU6IHt7cHJvY2VkdXJlTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPkNhdGVnb3J5OiB7e2NhdGVnb3J5TGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlVvbToge3t1b219fTwvc3Bhbj5cbjxidXR0b24gKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+dG9nZ2xlIHNlbGVjdGlvbjwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpXCI+cmVtb3ZlPC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KClcIj50b2dnbGUgdmlzaWJpbGl0eTwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwiZWRpdERhdGFzZXRPcHRpb25zKClcIj5lZGl0IE9wdGlvbnM8L2J1dHRvbj5cbjxidXR0b24gKGNsaWNrKT1cInNob3dHZW9tZXRyeSgpXCI+c2hvdyBHZW9tZXRyeTwvYnV0dG9uPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgZXh0ZW5kcyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogRGF0YXNldE9wdGlvbnM7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGhpZ2hsaWdodDogYm9vbGVhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVXBkYXRlT3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uRWRpdE9wdGlvbnM6IEV2ZW50RW1pdHRlcjxEYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblNob3dHZW9tZXRyeTogRXZlbnRFbWl0dGVyPEdlb0pTT04uR2VvSnNvbk9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGFwaSwgaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlID0gIXRoaXMuZGF0YXNldE9wdGlvbnMudmlzaWJsZTtcbiAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucygpIHtcbiAgICB0aGlzLm9uRWRpdE9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93R2VvbWV0cnkoKSB7XG4gICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgIHRoaXMub25TaG93R2VvbWV0cnkuZW1pdCh0aGlzLmRhdGFzZXQuc3RhdGlvbi5nZW9tZXRyeSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGFzZXQgaW5zdGFuY2VvZiBEYXRhc2V0KSB7XG4gICAgICB0aGlzLmFwaS5nZXRQbGF0Zm9ybSh0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5wbGF0Zm9ybS5pZCwgdGhpcy5kYXRhc2V0LnVybCkuc3Vic2NyaWJlKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgICB0aGlzLm9uU2hvd0dlb21ldHJ5LmVtaXQocGxhdGZvcm0uZ2VvbWV0cnkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIEZpcnN0TGFzdFZhbHVlLCBJbnRlcm5hbElkSGFuZGxlciwgVGltZSwgVGltZUludGVydmFsIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtcbiAgQ29uZmlndXJhYmxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuLi9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEV4dGVuZHMgdGhlIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCwgd2l0aCB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGZpcnN0IGFuZCBsYXRlc3QgdmFsaWRhdGlvblxuICogIC0ganVtcCB0byBmaXJzdCBhbmQgbGF0ZXN0IHZhbHVlIGV2ZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZmlyc3QtbGF0ZXN0LXRpbWVzZXJpZXMtZW50cnknLFxuICB0ZW1wbGF0ZTogYDxzcGFuPnt7cHJvY2VkdXJlTGFiZWx9fSAtIHt7cGxhdGZvcm1MYWJlbH19PC9zcGFuPlxuPHNwYW4+SGFzIERhdGE6IHt7aGFzRGF0YX19PC9zcGFuPlxuPGJ1dHRvbiAqbmdJZj1cImZpcnN0VmFsdWVcIiAoY2xpY2spPVwianVtcFRvRmlyc3RUaW1lU3RhbXAoKVwiPnt7Zmlyc3RWYWx1ZS52YWx1ZX19IC0ge3tmaXJzdFZhbHVlLnRpbWVzdGFtcCB8IGRhdGV9fTwvYnV0dG9uPlxuPGJ1dHRvbiAqbmdJZj1cImxhc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9MYXN0VGltZVN0YW1wKClcIj57e2xhc3RWYWx1ZS52YWx1ZX19IC0ge3tsYXN0VmFsdWUudGltZXN0YW1wIHwgZGF0ZX19PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGV4dGVuZHMgQ29uZmlndXJhYmxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblNlbGVjdERhdGU6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICBwdWJsaWMgaGFzRGF0YSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZVxuICApIHtcbiAgICBzdXBlcihhcGksIGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsKSB7XG4gICAgICB0aGlzLmNoZWNrRGF0YUluVGltZXNwYW4oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMganVtcFRvRmlyc3RUaW1lU3RhbXAoKSB7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChuZXcgRGF0ZSh0aGlzLmRhdGFzZXQuZmlyc3RWYWx1ZS50aW1lc3RhbXApKTtcbiAgfVxuXG4gIHB1YmxpYyBqdW1wVG9MYXN0VGltZVN0YW1wKCkge1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobmV3IERhdGUodGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZS50aW1lc3RhbXApKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRQYXJhbWV0ZXJzKCkge1xuICAgIHN1cGVyLnNldFBhcmFtZXRlcnMoKTtcbiAgICB0aGlzLmZpcnN0VmFsdWUgPSB0aGlzLmRhdGFzZXQuZmlyc3RWYWx1ZTtcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IHRoaXMuZGF0YXNldC5sYXN0VmFsdWU7XG4gICAgdGhpcy5jaGVja0RhdGFJblRpbWVzcGFuKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRGF0YUluVGltZXNwYW4oKSB7XG4gICAgaWYgKHRoaXMudGltZUludGVydmFsICYmIHRoaXMuZGF0YXNldCkge1xuICAgICAgdGhpcy5oYXNEYXRhID0gdGhpcy50aW1lU3J2Yy5vdmVybGFwcyhcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwsXG4gICAgICAgIHRoaXMuZGF0YXNldC5maXJzdFZhbHVlLnRpbWVzdGFtcCxcbiAgICAgICAgdGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZS50aW1lc3RhbXBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0YWJsZSwgT25DaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlLCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBJZENhY2hlLCBJbnRlcm5hbElkSGFuZGxlciwgUmVmZXJlbmNlVmFsdWUsIFRpbWUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuLi9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlIGV4dGVuZHMgSWRDYWNoZTx7IGNvbG9yOiBzdHJpbmcsIHZpc2libGU6IGJvb2xlYW4gfT4geyB9XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsIHdpdGggdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBoYW5kbGVzIHRoZSByZWZlcmVuY2UgdmFsdWVzIG9mIHRoZSBkYXRhc2V0IGVudHJ5XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXRpbWVzZXJpZXMtZW50cnknLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIiBbbmdTdHlsZV09XCJ7J2JvcmRlci1jb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogc2VsZWN0ZWR9XCJcbiAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+XG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgPGRpdiBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBmYS0zeCBmYS1md1wiPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbWhlYWRlclwiIFtuZ0NsYXNzXT1cInsnaGlnaGxpZ2h0JzogaGlnaGxpZ2h0fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1MYWJlbFwiIFtuZ1N0eWxlXT1cInsnY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twbGF0Zm9ybUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICAgIDwhLS0gPG41Mi1mYXZvcml0ZS10b2dnbGVyIFtkYXRhc2V0XT1cImRhdGFzZXRcIj48L241Mi1mYXZvcml0ZS10b2dnbGVyPiAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vRGF0YVdhcm5pbmcgZmlyc3RMYXN0RW50cnlcIiAqbmdJZj1cIiFoYXNEYXRhXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSByZWRcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbC1sYWJlbFwiPktlaW5lIERhdGVuIHZlcmbDg8K8Z2Jhcjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAoY2xpY2spPVwianVtcFRvTGFzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGwtbGFiZWxcIj5TcHJpbmdlIHp1ciBsZXR6dGVuIE1lc3N1bmc8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3BoZW5vbWVub25MYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInVvbVwiPlxuICAgICAgICAgIDxzcGFuPls8L3NwYW4+XG4gICAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3VvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgICAgIDxzcGFuPl08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twcm9jZWR1cmVMYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIiAqbmdJZj1cImNhdGVnb3J5TGFiZWwgIT0gcGhlbm9tZW5vbkxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tjYXRlZ29yeUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kaWNvbnNcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJ7J2ZhLWNoZXZyb24tZG93bic6ICFpbmZvcm1hdGlvblZpc2libGUsICdmYS1jaGV2cm9uLXVwJzogaW5mb3JtYXRpb25WaXNpYmxlfVwiIChjbGljayk9XCJ0b2dnbGVJbmZvcm1hdGlvbigpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogZGF0YXNldE9wdGlvbnM/LnZpc2libGUsICdmYS1leWUnOiAhZGF0YXNldE9wdGlvbnM/LnZpc2libGV9XCIgKGNsaWNrKT1cInRvZ2dsZVZpc2liaWxpdHkoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgKGNsaWNrKT1cImVkaXREYXRhc2V0T3B0aW9ucygpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nU3R5bGVdPVwie2NvbG9yOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlTGVnZW5kRW50cnkgc21hbGwtbGFiZWxcIiAqbmdJZj1cImluZm9ybWF0aW9uVmlzaWJsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGFzdEVudHJ5IGFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0lmPVwiZmlyc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9GaXJzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4+RXJzdGVyIFdlcnQgYmVpPC9zcGFuPlxuICAgICAgICA8c3Bhbj57e2ZpcnN0VmFsdWUudGltZXN0YW1wfCBkYXRlOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1lZGl1bVwiPih7e2ZpcnN0VmFsdWUudmFsdWV9fSB7e3VvbX19KTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGFzdEVudHJ5IGFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0lmPVwibGFzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuPkxldHp0ZXIgV2VydCBiZWk8L3NwYW4+XG4gICAgICAgIDxzcGFuPnt7bGFzdFZhbHVlLnRpbWVzdGFtcHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZWRpdW1cIj4oe3tsYXN0VmFsdWUudmFsdWV9fSB7e3VvbX19KTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImRhdGFzZXQ/LnJlZmVyZW5jZVZhbHVlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKm5nRm9yPVwibGV0IHJlZiBvZiBkYXRhc2V0LnJlZmVyZW5jZVZhbHVlc1wiIChjbGljayk9XCJ0b2dnbGVSZWZlcmVuY2VWYWx1ZShyZWYpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogcmVmLnZpc2libGV9XCIgW25nU3R5bGVdPVwie2NvbG9yOiByZWYuY29sb3J9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPnt7cmVmLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgY3JlYXRlRXhwb3J0Q3N2KHRpbWVzZXJpZXMpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWRvd25sb2FkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT1cImV4cG9ydC5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiPlxuICAgICAgICAgICAgICAgIDxzd2MtcHJvY2VkdXJlLW1ldGFkYXRhIHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXByb2NlZHVyZS1tZXRhZGF0YT5cbiAgICAgICAgICAgICAgICA8c3djLXRpbWVzZXJpZXMtcmF3LWRhdGEtb3V0cHV0IHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXRpbWVzZXJpZXMtcmF3LWRhdGEtb3V0cHV0PlxuICAgICAgICAgICAgICAgIDxzd2Mtc29zLXVybCB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy1zb3MtdXJsPlxuICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5nZW9tZXRyeVZpZXdlck1vZGFsIC5tb2RhbC1ib2R5e2hlaWdodDo1MHZofW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVte2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjVweDtib3JkZXItcmFkaXVzOjVweDttYXJnaW4tYm90dG9tOjVweH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuc21hbGwtbGFiZWx7Zm9udC1zaXplOjkwJTt3b3JkLWJyZWFrOmJyZWFrLWFsbH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbS5zZWxlY3RlZHtwYWRkaW5nOjA7Ym9yZGVyLXdpZHRoOjVweDtib3JkZXItc3R5bGU6c29saWR9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXIuaGlnaGxpZ2h0e2ZvbnQtd2VpZ2h0OjcwMH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgc3BhbnttYXJnaW46MCA0JTtmb250LXNpemU6MTUwJX1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgc3Bhbjpob3ZlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgLmRlbGV0ZXt6LWluZGV4OjV9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLm5vRGF0YVdhcm5pbmd7Ym9yZGVyOjJweCBzb2xpZCByZWQ7Ym9yZGVyLXJhZGl1czo1cHg7cGFkZGluZzozcHh9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLm5vRGF0YVdhcm5pbmcgLnJlZHtjb2xvcjpyZWR9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmFkZGl0aW9uYWxMZWdlbmRFbnRyeTpob3ZlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuYWRkaXRpb25hbExlZ2VuZEVudHJ5LnNlbGVjdGVke2ZvbnQtd2VpZ2h0OmJvbGRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAucmVmRW50cnkuc2VsZWN0ZWR7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXJhZGl1czoycHg7bWFyZ2luOjJweCAwfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sb2FkaW5nLW92ZXJsYXl7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7b3BhY2l0eTouNTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sb2FkaW5nLW92ZXJsYXkgLmZhLXNwaW57Y29sb3I6I2ZmZjtmb250LXNpemU6MjVweDt3aWR0aDoyNXB4O2hlaWdodDoyNXB4fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGV4dGVuZHMgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgcHVibGljIGluZm9ybWF0aW9uVmlzaWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgY29sb3I6IENvbG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJlZlZhbENhY2hlOiBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGFwaSwgaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMsIHRpbWVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlSW5mb3JtYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5mb3JtYXRpb25WaXNpYmxlID0gIXRoaXMuaW5mb3JtYXRpb25WaXNpYmxlO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVSZWZlcmVuY2VWYWx1ZShyZWZWYWx1ZTogUmVmZXJlbmNlVmFsdWUpIHtcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LmlkID09PSByZWZWYWx1ZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgY29uc3QgcmVmVmFsSWQgPSB0aGlzLmNyZWF0ZVJlZlZhbElkKHJlZlZhbHVlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHJlZlZhbHVlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlZlZhbHVlLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLnB1c2goeyBpZDogcmVmVmFsdWUucmVmZXJlbmNlVmFsdWVJZCwgY29sb3I6IHJlZlZhbHVlLmNvbG9yIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmVmFsQ2FjaGUuZ2V0KHJlZlZhbElkKS52aXNpYmxlID0gcmVmVmFsdWUudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVycygpIHtcbiAgICAgICAgc3VwZXIuc2V0UGFyYW1ldGVycygpO1xuICAgICAgICBpZiAodGhpcy5kYXRhc2V0LnJlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0LnJlZmVyZW5jZVZhbHVlcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVmFsSWQgPSB0aGlzLmNyZWF0ZVJlZlZhbElkKGUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVmFsT3B0aW9uID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLmZpbmQoKG8pID0+IG8uaWQgPT09IGUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlZlZhbE9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZlZhbENhY2hlLnNldChyZWZWYWxJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZlZhbE9wdGlvbi5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWZWYWxDYWNoZS5oYXMocmVmVmFsSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmVmFsQ2FjaGUuc2V0KHJlZlZhbElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvci5nZXRDb2xvcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGUuY29sb3IgPSB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkuY29sb3I7XG4gICAgICAgICAgICAgICAgZS52aXNpYmxlID0gdGhpcy5yZWZWYWxDYWNoZS5nZXQocmVmVmFsSWQpLnZpc2libGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUmVmVmFsSWQocmVmSWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0LnVybCArIHJlZklkO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXQsIERhdGFzZXRBcGlJbnRlcmZhY2UsIERhdGFzZXRPcHRpb25zLCBJbnRlcm5hbElkSGFuZGxlciwgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vbGlzdC1lbnRyeS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi10cmFqZWN0b3J5LWVudHJ5JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KClcIj5cbiAgPHNwYW4+XG4gICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBsdXNcIiBbbmdDbGFzc109XCJ7J2ZhLWV5ZSc6ICFkYXRhc2V0T3B0aW9ucz8udmlzaWJsZSwgJ2ZhLWV5ZS1zbGFzaCc6IGRhdGFzZXRPcHRpb25zPy52aXNpYmxlfVwiPjwvc3Bhbj5cbiAgICA8L2E+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDEwcHg7XCIgW25nU3R5bGVdPVwieydjb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj57e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoZGF0YXNldE9wdGlvbnMpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nU3R5bGVdPVwie2NvbG9yOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+PC9zcGFuPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUcmFqZWN0b3J5RW50cnlDb21wb25lbnQgZXh0ZW5kcyBMaXN0RW50cnlDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IERhdGFzZXRPcHRpb25zO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVXBkYXRlT3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkVkaXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8RGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgdGVtcENvbG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnZpc2libGUgPSAhdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlO1xuICAgICAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlZGl0RGF0YXNldE9wdGlvbnMob3B0aW9uczogRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkVkaXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRMYWJlbE1hcHBlck1vZHVsZSB9IGZyb20gJy4uL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4vcHJvZmlsZS1lbnRyeS9wcm9maWxlLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4vdGltZXNlcmllcy9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4vdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lc2VyaWVzL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUsXG4gIFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIFByb2ZpbGVFbnRyeUNvbXBvbmVudCxcbiAgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgIEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRGF0YXNldGxpc3RNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJdGVyYWJsZURpZmZlcnMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgRGF0YXNldE9wdGlvbnMsXG4gIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gIERhdGFzZXRUYWJsZURhdGEsXG4gIEludGVybmFsSWRIYW5kbGVyLFxuICBUaW1lLFxuICBUaW1lc2VyaWVzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1kYXRhc2V0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8dGFibGUgKm5nSWY9XCJyZWFkeVwiPlxuICA8dGhlYWQ+XG4gICAgPHRyPlxuICAgICAgPHRoIChjbGljayk9XCJzb3J0KCRldmVudClcIiBbYXR0ci5kYXRhLWNvbHVtbi1pZF09XCInZGF0ZXRpbWUnXCIgY2xhc3M9XCJzb3J0ZWQtYXNjXCI+XG4gICAgICAgIFplaXRcbiAgICAgIDwvdGg+XG4gICAgICA8dGggKm5nRm9yPVwibGV0IHNlcmllcyBvZiB0aGlzLnRpbWVzZXJpZXNBcnJheTsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJzb3J0KCRldmVudClcIiBbYXR0ci5kYXRhLWNvbHVtbi1pZF09XCJpXCIgW25nU3R5bGVdPVwieyAnYm9yZGVyLWNvbG9yJzogcHJlcGFyZWRDb2xvcnNbaV0gfVwiPlxuICAgICAgICB7e3Nlcmllcz8ubGFiZWx9fSBbe3tzZXJpZXM/LnVvbX19XVxuICAgICAgPC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHk+XG4gICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgdGhpcy5wcmVwYXJlZERhdGFcIj5cbiAgICAgIDx0ZD57e3Jvdy5kYXRldGltZSB8IGRhdGU6ICdzaG9ydCd9fTwvdGQ+XG4gICAgICA8dGQgKm5nRm9yPVwibGV0IHZhbHVlIG9mIHJvdy52YWx1ZXNcIj57e3ZhbHVlfX08L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e2ZsZXg6MTtvdmVyZmxvdy15OnNjcm9sbDtvdmVyZmxvdy14OmhpZGRlbn06aG9zdCB0Ym9keSw6aG9zdCB0aGVhZCB0cntkaXNwbGF5OnRhYmxlO3RhYmxlLWxheW91dDpmaXhlZDt3aWR0aDoxMDAlfTpob3N0IHRhYmxle2Rpc3BsYXk6YmxvY2s7Ym9yZGVyLWNvbGxhcHNlOnNlcGFyYXRlO2JvcmRlci1zcGFjaW5nOjAgMXB4fTpob3N0IHRoZWFke2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246LXdlYmtpdC1zdGlja3k7cG9zaXRpb246c3RpY2t5O3RvcDowO2JvcmRlci1zcGFjaW5nOjB9Omhvc3QgdHI6bnRoLWNoaWxkKDJuKXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgdGh7YmFja2dyb3VuZC1jb2xvcjojYTlhOWE5O2N1cnNvcjpwb2ludGVyO2JvcmRlci1ib3R0b20td2lkdGg6N3B4O2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7b3ZlcmZsb3ctd3JhcDpicmVhay13b3JkfTpob3N0IHRoOmZpcnN0LWNoaWxke2JvcmRlci1ib3R0b20tY29sb3I6I2E5YTlhOX06aG9zdCB0aDpmaXJzdC1jaGlsZC5zb3J0ZWQtYXNjLDpob3N0IHRoOmZpcnN0LWNoaWxkLnNvcnRlZC1kZXNje2JvcmRlci1ib3R0b20tY29sb3I6IzU1NX06aG9zdCB0aC5zb3J0ZWQtYXNjLDpob3N0IHRoLnNvcnRlZC1kZXNje2JhY2tncm91bmQtY29sb3I6IzU1NTtjb2xvcjojZmZmfTpob3N0IHRoLnNvcnRlZC1hc2M6YWZ0ZXJ7Y29udGVudDpcIlxcXFwyNUI0XCI7ZmxvYXQ6cmlnaHR9Omhvc3QgdGguc29ydGVkLWRlc2M6YWZ0ZXJ7Y29udGVudDpcIlxcXFwyNUJFXCI7ZmxvYXQ6cmlnaHR9Omhvc3QgdGR7d2hpdGUtc3BhY2U6bm93cmFwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIGdyYXl9Omhvc3QgdGQsOmhvc3QgdGh7cGFkZGluZzo1cHggMTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhc2V0VGFibGVDb21wb25lbnQgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBhbnk+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLypcbiAgICBUaGUgY29tcG9uZW50IGV4dGVuZHMgRGF0YXNldEdyYXBoQ29tcG9uZW50LCBidXQgaW1wbGVtZW50cyBvbmx5IHBhcnRzIG9mIHRoYXQgY29tcG9uZW50cyBpbnB1dHMgYW5kIG91dHB1dHMuXG4gICAgSW1wbGVtZW50ZWQ6IGRhdGFzZXRJZHMsIHRpbWVJbnRlcnZhbCwgc2VsZWN0ZWREYXRhc2V0SWRzIGFuZCBkYXRhc2V0T3B0aW9ucyBpbnB1dHM7IG5vIG91dHB1dHNcbiAgICBOb3QgaW1wbGVtZW50ZWQ6IGdyYXBoT3B0aW9ucyBpbnB1dDsgYWxsIG91dHB1dHMgKG9uRGF0YXNldFNlbGVjdGVkLCBvblRpbWVzcGFuQ2hhbmdlZCwgb25NZXNzYWdlVGhyb3duLCBvbkxvYWRpbmcpXG4gICovXG5cbiAgcHVibGljIHByZXBhcmVkRGF0YTogRGF0YXNldFRhYmxlRGF0YVtdID0gQXJyYXkoKTtcbiAgcHVibGljIHByZXBhcmVkQ29sb3JzOiBzdHJpbmdbXSA9IEFycmF5KCk7XG4gIHB1YmxpYyByZWFkeSA9IGZhbHNlO1xuXG4gIHB1YmxpYyB0aW1lc2VyaWVzQXJyYXk6IFRpbWVzZXJpZXNbXSA9IG5ldyBBcnJheSgpO1xuICBwcml2YXRlIGFkZGl0aW9uYWxTdHlsZXNoZWV0OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTcnZjKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGVkSWRzU3R5bGVzaGVldCcpO1xuICAgIGlmICghdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCkge1xuICAgICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlkID0gJ3NlbGVjdGVkSWRzU3R5bGVzaGVldCc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGNhbGxlZCB3aGVuIHVzZXIgY2xpY2tzIG9uIHRhYmxlIGhlYWRlcnMgKi9cbiAgcHVibGljIHNvcnQoZXZlbnQ6IGFueSkge1xuICAgIC8vIGNhbiBiZSAnZGF0ZXRpbWUnIG9yIGFuIGludGVnZXIgaW5kaWNhdGluZyB0aGUgaW5kZXggb2YgdGhlIGNvbHVtbiBpbiB0aGUgdmFsdWVzIGFycmF5XG4gICAgY29uc3QgYnkgPSBldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW5JZDtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0ZWQtYXNjJykgPyAnZGVzYycgOiAnYXNjJztcbiAgICBjb25zdCBkaXJlY3Rpb25OdW1iZXIgPSAoZGlyZWN0aW9uID09PSAnYXNjJyA/IDEgOiAtMSk7XG5cbiAgICAvLyBzZXQgQ1NTIGNsYXNzZXNcbiAgICBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKChjaGlsZDogRWxlbWVudCkgPT4gY2hpbGQuY2xhc3NOYW1lID0gJycpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdhc2MnKSB7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ3NvcnRlZC1hc2MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdzb3J0ZWQtZGVzYycpO1xuICAgIH1cblxuICAgIC8vIGRlZmluZSBjb3JyZWN0IGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBzb3J0IG1ldGhvZFxuICAgIGxldCBzb3J0Q2FsbGJhY2s7XG4gICAgaWYgKGJ5ID09PSAnZGF0ZXRpbWUnKSB7XG4gICAgICBzb3J0Q2FsbGJhY2sgPSAoZTE6IGFueSwgZTI6IGFueSkgPT4gZGlyZWN0aW9uTnVtYmVyICogKGUxLmRhdGV0aW1lIC0gZTIuZGF0ZXRpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGJ5LCAxMCk7XG4gICAgICAvLyBiYXNpY2FsbHkgdGhlIHNhbWUgYXMgYWJvdmUsIGJ1dCB0YWtlIGNhcmUgb2YgJ3VuZGVmaW5lZCcgdmFsdWVzXG4gICAgICBzb3J0Q2FsbGJhY2sgPSAoZTE6IGFueSwgZTI6IGFueSkgPT5cbiAgICAgICAgKGUxLnZhbHVlc1tpbmRleF0gPT09IHVuZGVmaW5lZCA/IDEgOlxuICAgICAgICAgIChlMi52YWx1ZXNbaW5kZXhdID09PSB1bmRlZmluZWQgPyAtMSA6XG4gICAgICAgICAgICAoZGlyZWN0aW9uTnVtYmVyICogKGUxLnZhbHVlc1tpbmRleF0gLSBlMi52YWx1ZXNbaW5kZXhdKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZG8gdGhlIHNvcnRcbiAgICB0aGlzLnByZXBhcmVkRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLnNvcnQoc29ydENhbGxiYWNrKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWxvYWQgZGF0YSBhdCAnICsgbmV3IERhdGUoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogYW55KSB7XG4gICAgLy8gb25seSBpbmNsdWRlZCBiZWNhdXNlIGl0J3MgcmVxdWlyZWQgYnkgYWJzdHJhY3QgcGFyZW50IGNsYXNzICh3b3VsZG4ndCBjb21waWxlIHdpdGhvdXQpXG4gICAgLy8gbm8gcG9pbnQgaW4gaW1wbGVtZW50aW5nIHRoaXMgbWV0aG9kIGluIGEgbm9uLWdyYXBoaW5nIGNvbXBvbmVudFxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gaGVscGVyIG1ldGhvZFxuICAgIHJldHVybiB0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgIC8vIHF1aXRlIGZhaXJseSB0ZXN0ZWRcbiAgICBjb25zdCBydWxlcyA9IHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICBydWxlc1tpbmRleF0gPSAndGQ6bnRoLWNoaWxkKCcgKyAoaW5kZXggKyAyKSArICcpIHtmb250LXdlaWdodDogYm9sZH0nO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MID0gcnVsZXMuam9pbignXFxyXFxuJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBmYWlybHkgdGVzdGVkXG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTC5zcGxpdCgnXFxyXFxuJyk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgcnVsZXNbaW5kZXhdID0gJyc7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgPSBydWxlcy5qb2luKCdcXHJcXG4nKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCkge1xuICAgIC8vIHRoZSBlYXNpZXN0IG1ldGhvZDogZGVsZXRlIGV2ZXJ5dGhpbmcgYW5kIGJ1aWxkIHByZXBhcmVkRGF0YSBmcm9tIHNjcmF0Y2guXG4gICAgdGhpcy5wcmVwYXJlZERhdGEgPSBbXTtcbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheS5mb3JFYWNoKCh0aW1lc2VyaWVzKSA9PiB0aGlzLmxvYWRUc0RhdGEodGltZXNlcmllcykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gZmFpcmx5IHRlc3RlZFxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQpO1xuXG4gICAgLy8gcmVtb3ZlIGVudHJpZXMgb2YgdGhpcyBkYXRhc2V0IGluIGVhY2ggZGF0ZXRpbWUncyBgdmFsdWVzYCBhcnJheXNcbiAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlKSA9PiBlLnZhbHVlcy5zcGxpY2UoaW5kZXgsIDEpKTtcbiAgICAvLyBpZiBhIGRhdGV0aW1lIGJlY2FtZSBjb21wbGV0ZWx5IGVtcHR5IChpLmUuIHRoZXJlJ3Mgb25seSBgdW5kZWZpbmVkYHMgaW4gdGhlIGB2YWx1ZXNgIGFycmF5LCBkZWxldGUgdGhpcyBkYXRldGltZSlcbiAgICB0aGlzLnByZXBhcmVkRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbHRlcigoZSkgPT4gZS52YWx1ZXMucmVkdWNlKChhLCBjKSA9PiBhIHx8IGMsIHVuZGVmaW5lZCkgIT09IHVuZGVmaW5lZCk7XG5cbiAgICB0aGlzLnByZXBhcmVkQ29sb3JzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBjb25zdCBydWxlcyA9IHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBydWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MID0gcnVsZXMuam9pbignXFxyXFxuJyk7XG5cbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZERhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGltZXNlcmllc0FycmF5Lmxlbmd0aCArPSAxOyAgLy8gY3JlYXRlIG5ldyBlbXB0eSBzbG90XG4gICAgdGhpcy5wcmVwYXJlZENvbG9ycy5wdXNoKCdkYXJrZ3JleScpO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MICs9ICdcXHJcXG4nO1xuICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXMoaW50ZXJuYWxJZCwgdXJsKVxuICAgICAgLnN1YnNjcmliZSgodGltZXNlcmllczogVGltZXNlcmllcykgPT4gdGhpcy5hZGRUaW1lc2VyaWVzKHRpbWVzZXJpZXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpbWVzZXJpZXNBcnJheS5zb21lKChlKSA9PiBlICE9PSB1bmRlZmluZWQgJiYgZS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLnByZXBhcmVkQ29sb3JzW2luZGV4XSA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAvLyBUT0RPLUNGOiBQYWdlIGlzbid0IHJlZnJlc2hlZCBpbnN0YW50bHksIGJ1dCBvbmx5IGFmdGVyIHRoZSBuZXh0IHNvcnQgKG9yIHBvc3NpYmxlIG90aGVyIGFjdGlvbnMgYXMgd2VsbClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgLy8gVE9ETy1DRjogbmVlZGVkPz8/PyBwcm9iYWJseSBub3RcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGltZXNlcmllcyh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzKSB7XG4gICAgdGhpcy50aW1lc2VyaWVzQXJyYXlbdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCldID0gdGltZXNlcmllcztcbiAgICB0aGlzLmxvYWRUc0RhdGEodGltZXNlcmllcyk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRUc0RhdGEodGltZXNlcmllczogVGltZXNlcmllcykge1xuICAgIGlmICh0aGlzLnRpbWVzcGFuKSB7XG4gICAgICAvLyBjb25zdCBkYXRhc2V0T3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLmFwaS5nZXRUc0RhdGE8W251bWJlciwgbnVtYmVyXT4odGltZXNlcmllcy5pZCwgdGltZXNlcmllcy51cmwsIHRoaXMudGltZXNwYW4sIHsgZm9ybWF0OiAnZmxvdCcgfSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgLy8gYnJpbmcgcmVzdWx0IGludG8gQXJyYXk8RGF0YXNldFRhYmxlRGF0YT4gZm9ybWF0IGFuZCBwYXNzIHRvIHByZXBhcmVEYXRhXG4gICAgICAgICAgLy8gY29udmVudGlvbiBmb3IgbGF5b3V0IG9mIG5ld2RhdGEgYXJndW1lbnQ6IHNlZSAzLWxpbmUtY29tbWVudCBpbiBwcmVwYXJlRGF0YSBmdW5jdGlvblxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSh0aW1lc2VyaWVzLCByZXN1bHQudmFsdWVzLm1hcCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYSA9IG5ldyBBcnJheSh0aGlzLmRhdGFzZXRJZHMubGVuZ3RoKS5maWxsKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBhW2luZGV4XSA9IGVbMV07XG4gICAgICAgICAgICByZXR1cm4geyBkYXRldGltZTogZVswXSwgdmFsdWVzOiBhIH07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVEYXRhKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXMsIG5ld2RhdGE6IERhdGFzZXRUYWJsZURhdGFbXSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG5cbiAgICAvLyBpZiBkYXRhc2V0T3B0aW9ucyBhcmUgcHJvdmlkZWQsIHVzZSB0aGVpciBjb2xvciB0byBzdHlsZSB0aGUgaGVhZGVyJ3MgXCJjb2xvciBiYW5kXCIgKGkuZS4gdGhlIDdweCBib3JkZXItYm90dG9tIG9mIHRoKVxuICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zKSB7XG4gICAgICBjb25zdCBkYXRhc2V0T3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLnByZXBhcmVkQ29sb3JzW2luZGV4XSA9IGRhdGFzZXRPcHRpb25zLmNvbG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3aGVuIG5vIGNvbG9yIGlzIHNwZWNpZmllZDogbWFrZSBib3JkZXIgdHJhbnNwYXJlbnQgc28gdGhlIGhlYWRlcidzIGJhY2tncm91bmQgY29sb3IgaXMgdXNlZCBmb3IgdGhlIGNvbG9yIGJhbmQsIHRvb1xuICAgICAgdGhpcy5wcmVwYXJlZENvbG9yc1tpbmRleF0gPSAncmdiYSgwLDAsMCwwKSc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2YodGltZXNlcmllcy5pbnRlcm5hbElkKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJZCh0aW1lc2VyaWVzLmludGVybmFsSWQpO1xuICAgIH1cblxuICAgIC8vIGBuZXdkYXRhYCBpcyBleHBlY3RlZCBpbiBleGFjdGx5IHRoZSBzYW1lIGZvcm1hdCBgcHJlcGFyZWREYXRhYCB3b3VsZCBsb29rIGxpa2UgaWYgdGhhdCB0aW1lc2VyaWVzIHdhcyB0aGUgb25seSBvbmVcbiAgICAvLyB0byBhY3R1YWxseSBoYXZlIGRhdGEgKGkuZS4gYHZhbHVlc2AgaGFzIHRoZSBsZW5ndGggb2YgdGltZXNlcmllc0FycmF5LCBidXQgYWxsIHNsb3RzIGFyZSBgdW5kZWZpbmVkYCwgZXhjZXB0IGZvclxuICAgIC8vIHRoZSBzbG90IHRoYXQgY29ycmVzcG9uZHMgdG8gdGhhdCB0aW1lc2VyaWVzKVxuXG4gICAgLy8gYHRpbWVzZXJpZXNgIGlzIGZpcnN0IHRpbWVzZXJpZXMgYWRkZWQgLT4gbm8gb3RoZXIgYHByZXBhcmVkRGF0YWAgdG8gbWVyZ2Ugd2l0aFxuICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHNldCBuZXdkYXRhIGFzIHByZXBhcmVkRGF0YSAoYXMgcGVyIGFib3ZlKVxuICAgICAgdGhpcy5wcmVwYXJlZERhdGEgPSBuZXdkYXRhO1xuXG4gICAgICAvLyBgdGltZXNlcmllc2AgaXMgbm90IHRoZSBmaXJzdCB0aW1lc2VyaWVzIGFkZGVkIC0+IHdlIGhhdmUgdG8gbWVyZ2UgYG5ld2RhdGFgIGludG8gdGhlIGV4aXN0aW5nIGBwcmVwYXJlZERhdGFgXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpID0gMDsgIC8vIGxvb3AgdmFyaWFibGUgZm9yIGBwcmVwYXJlZERhdGFgXG4gICAgICBsZXQgaiA9IDA7ICAvLyBsb29wIHZhcmlhYmxlIGZvciBgbmV3ZGF0YWBcblxuICAgICAgLy8gZ28gdGhyb3VnaCBhbGwgZGF0YSBwb2ludHMgaW4gYG5ld2RhdGFgXG4gICAgICB3aGlsZSAoaiA8IG5ld2RhdGEubGVuZ3RoKSB7XG5cbiAgICAgICAgLy8gdGltZXN0YW1wcyBtYXRjaFxuICAgICAgICBpZiAodGhpcy5wcmVwYXJlZERhdGFbaV0gJiYgdGhpcy5wcmVwYXJlZERhdGFbaV0uZGF0ZXRpbWUgPT09IG5ld2RhdGFbal0uZGF0ZXRpbWUpIHtcbiAgICAgICAgICAvLyBqdXN0IGFkZCBgbmV3ZGF0YWAncyB2YWx1ZSB0byB0aGUgZXhpc3RpbmcgYHZhbHVlc2AgYXJyYXkgaW4gYHByZXBhcmVkRGF0YWBcbiAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YVtpXS52YWx1ZXNbaW5kZXhdID0gbmV3ZGF0YVtqXS52YWx1ZXNbaW5kZXhdO1xuICAgICAgICAgIC8vIGluY3JlbWVudCBib3RoXG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGorKztcblxuICAgICAgICAgIC8vIGBuZXdkYXRhYCBpcyBhaGVhZCBvZiBgcHJlcGFyZWREYXRhYFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJlcGFyZWREYXRhW2ldICYmIHRoaXMucHJlcGFyZWREYXRhW2ldLmRhdGV0aW1lIDwgbmV3ZGF0YVtqXS5kYXRldGltZSkge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgYmVjYXVzZSB0aGVyZSdzIGFscmVhZHkgYW4gdW5kZWZpbmVkIHRoZXJlXG4gICAgICAgICAgLy8gZ2l2ZSBwcmVwYXJlZERhdGEgdGhlIGNoYW5jZSB0byBjYXRjaCB1cCB3aXRoIG5ld2RhdGFcbiAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAvLyBgcHJlcGFyZWREYXRhYCBpcyBhaGVhZCBvZiBgbmV3ZGF0YWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGUgY3VycmVudCBgbmV3ZGF0YWAgaXMgdGhlIGZpcnN0IGRhdGFzZXQgdGhhdCBoYXMgdGhpcyBkYXRldGltZSAtPiBhZGQgaXQgdG8gdGhlIHByZXBhcmVkRGF0YSBhcnJheVxuICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnNwbGljZShpLCAwLCBuZXdkYXRhW2pdKTtcbiAgICAgICAgICAvLyBnaXZlIG5ld2RhdGEgdGhlIGNoYW5jZSB0byBjYXRjaCB1cCB3aXRoIHByZXBhcmVkRGF0YVxuICAgICAgICAgIGorKztcbiAgICAgICAgICAvLyBidXQgcHJlcGFyZWREYXRhIGlzIDEgbG9uZ2VyIG5vdywgdG9vXG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkeSA9IHRoaXMudGltZXNlcmllc0FycmF5LmV2ZXJ5KChlKSA9PiBlICE9PSB1bmRlZmluZWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IERhdGFzZXRUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0YXNldC10YWJsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEYXRhc2V0VGFibGVDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRGF0YXNldFRhYmxlQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZERhdGFzZXRUYWJsZU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBYUksNEJBQ2MsVUFBc0IsRUFDdEIsWUFBdUM7UUFEdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7cUJBSnBCLElBQUksT0FBTyxFQUFFO0tBS3pDOzs7OztJQUVFLDJDQUFjOzs7O2NBQUMsS0FBYTs7UUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FBUyxVQUFDLFFBQTBCO1lBQ3JELElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRTtnQkFDOUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdEM7aUJBQU07O2dCQUNILElBQU0sS0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksS0FBRyxFQUFFO29CQUNMLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBRyxDQUFDLEVBQUU7d0JBQ3JCLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3BEO3lCQUFNOzt3QkFDSCxJQUFNLFFBQVEsR0FDVixL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