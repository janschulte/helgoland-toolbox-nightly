(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('@helgoland/core'), require('rxjs/Observable'), require('@angular/common'), require('@ngx-translate/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@helgoland/depiction', ['exports', '@angular/common/http', '@angular/core', '@helgoland/core', 'rxjs/Observable', '@angular/common', '@ngx-translate/core', '@angular/forms'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.depiction = {}),global.ng.common.http,global.ng.core,null,global.rxjs.Observable,global.ng.common,null,global.ng.forms));
}(this, (function (exports,http,core,core$1,Observable,common,core$2,forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LabelMapperService = (function () {
        function LabelMapperService(httpClient, settingsSrvc) {
            this.httpClient = httpClient;
            this.settingsSrvc = settingsSrvc;
            this.cache = new core$1.IdCache();
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
                return new Observable.Observable(function (observer) {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        LabelMapperService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: core$1.SettingsService }
            ];
        };
        return LabelMapperService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LabelMapperComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'n52-label-mapper',
                        template: "<span *ngIf=\"determinedLabel\">{{determinedLabel}}</span>\n<span *ngIf=\"loading\">\n  <span class=\"glyphicon glyphicon-refresh icon-spin\"></span>\n  <span> loading label ...</span>\n</span>\n"
                    },] },
        ];
        /** @nocollapse */
        LabelMapperComponent.ctorParameters = function () {
            return [
                { type: LabelMapperService }
            ];
        };
        LabelMapperComponent.propDecorators = {
            label: [{ type: core.Input }]
        };
        return LabelMapperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandLabelMapperModule = (function () {
        function HelgolandLabelMapperModule() {
        }
        HelgolandLabelMapperModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            LabelMapperComponent
                        ],
                        imports: [
                            common.CommonModule
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
    /**
     * Represents an abstract dataset entry for a list, which has the following functions:
     *  - can be selected and is selectable internally, with a corresponding output event
     *  - can be deleted, which also triggers an output event
     *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
     * @abstract
     */
    var ListEntryComponent = (function () {
        function ListEntryComponent(internalIdHandler, translateSrvc) {
            this.internalIdHandler = internalIdHandler;
            this.translateSrvc = translateSrvc;
            this.onDeleteDataset = new core.EventEmitter();
            this.onSelectDataset = new core.EventEmitter();
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
            datasetId: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            onDeleteDataset: [{ type: core.Output }],
            onSelectDataset: [{ type: core.Output }]
        };
        return ListEntryComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ProfileEntryComponent = (function (_super) {
        __extends(ProfileEntryComponent, _super);
        function ProfileEntryComponent(api, internalIdHandler, translateSrvc) {
            var _this = _super.call(this, internalIdHandler, translateSrvc) || this;
            _this.api = api;
            _this.internalIdHandler = internalIdHandler;
            _this.translateSrvc = translateSrvc;
            _this.onUpdateOptions = new core.EventEmitter();
            _this.onDeleteDatasetOptions = new core.EventEmitter();
            _this.onEditOptions = new core.EventEmitter();
            _this.onOpenInCombiView = new core.EventEmitter();
            _this.onShowGeometry = new core.EventEmitter();
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
                    return this.dataset.platformType === core$1.PlatformTypes.mobileInsitu;
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
                    var timespan = new core$1.Timespan(option.timestamp);
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
            { type: core.Component, args: [{
                        selector: 'n52-profile-entry',
                        template: "<div class=\"legendItem\" style=\"position: relative;\" [ngClass]=\"{'selected': selected}\" (click)=\"toggleSelection()\">\n  <div class=\"legendItemheader\">\n    <div class=\"legendItemLabel\">\n      <n52-label-mapper label=\"{{dataset?.parameters.platform.label}}\"></n52-label-mapper>\n    </div>\n    <div class=\"small\">\n      <n52-label-mapper label=\"{{dataset?.parameters.phenomenon.label}}\"></n52-label-mapper>\n      <span *ngIf=\"dataset?.uom\">[\n        <n52-label-mapper label=\"{{dataset.uom}}\"></n52-label-mapper>]</span>\n    </div>\n    <div class=\"small\">\n      <n52-label-mapper label=\"{{dataset?.parameters.procedure.label}}\"></n52-label-mapper>\n    </div>\n    <div class=\"small\" *ngIf=\"dataset?.parameters.category.label != dataset?.parameters.phenomenon.label\">\n      <n52-label-mapper label=\"{{dataset?.parameters.category.label}}\"></n52-label-mapper>\n    </div>\n  </div>\n  <div *ngFor=\"let item of datasetOptions\">\n    <div>\n      <span [ngStyle]=\"{'color': item.color}\">{{item.timestamp | date: 'short'}}</span>\n      <span class=\"fa\" [ngClass]=\"{'fa-eye-slash': item.visible, 'fa-eye': !item.visible}\" (click)=\"toggleVisibility(item); $event.stopPropagation();\"\n        title=\"{{'profiles.legend.visibility' | translate}}\"></span>\n      <span class=\"fa fa-pencil\" (click)=\"editDatasetOptions(item); $event.stopPropagation();\" [ngStyle]=\"{color: item.color}\"\n        title=\"{{'profiles.legend.edit-style' | translate}}\"></span>\n      <span class=\"fa fa-map-marker\" (click)=\"showGeometry(item); $event.stopPropagation();\" title=\"{{'profiles.legend.show-geometry' | translate}}\"></span>\n      <span class=\"fa fa-times\" (click)=\"removeDatasetOptions(item); $event.stopPropagation();\" title=\"{{'profiles.legend.delete-subentry' | translate}}\"></span>\n    </div>\n    <div (click)=\"openInCombiView(item); $event.stopPropagation();\" *ngIf=\"isMobile()\" class=\"toCombiView\">\n      <span class=\"fa fa-arrow-right\"></span>\n      <span>{{'profiles.legend.go-to-combi-view' | translate}}</span>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}:host .legendItem .small{font-size:90%;word-break:break-all}:host .legendItem.selected{padding:0;border-width:5px;border-style:solid}:host .legendItem .legendItemheader{cursor:pointer}:host .legendItem .toCombiView{cursor:pointer}:host .legendItem .fa{cursor:pointer}"]
                    },] },
        ];
        /** @nocollapse */
        ProfileEntryComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$2.TranslateService }
            ];
        };
        ProfileEntryComponent.propDecorators = {
            datasetOptions: [{ type: core.Input }],
            onUpdateOptions: [{ type: core.Output }],
            onDeleteDatasetOptions: [{ type: core.Output }],
            onEditOptions: [{ type: core.Output }],
            onOpenInCombiView: [{ type: core.Output }],
            onShowGeometry: [{ type: core.Output }]
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
    var SimpleTimeseriesEntryComponent = (function (_super) {
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
                if (this.dataset instanceof core$1.Dataset) {
                    this.platformLabel = this.dataset.parameters.platform.label;
                }
                else if (this.dataset instanceof core$1.Timeseries) {
                    this.platformLabel = this.dataset.station.properties.label;
                }
                this.phenomenonLabel = this.dataset.parameters.phenomenon.label;
                this.procedureLabel = this.dataset.parameters.procedure.label;
                this.categoryLabel = this.dataset.parameters.category.label;
                this.uom = this.dataset.uom;
            };
        SimpleTimeseriesEntryComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-simple-timeseries-entry',
                        template: "<span>Platform: {{platformLabel}}</span>\n<span>Phenomenon: {{phenomenonLabel}}</span>\n<span>Procedure: {{procedureLabel}}</span>\n<span>Category: {{categoryLabel}}</span>\n<span>Uom: {{uom}}</span>\n<button (click)=\"toggleSelection()\">select</button>\n<button (click)=\"removeDataset()\">remove</button>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        SimpleTimeseriesEntryComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$2.TranslateService }
            ];
        };
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
    var ConfigurableTimeseriesEntryComponent = (function (_super) {
        __extends(ConfigurableTimeseriesEntryComponent, _super);
        function ConfigurableTimeseriesEntryComponent(api, internalIdHandler, translateSrvc) {
            var _this = _super.call(this, api, internalIdHandler, translateSrvc) || this;
            _this.api = api;
            _this.internalIdHandler = internalIdHandler;
            _this.translateSrvc = translateSrvc;
            _this.onUpdateOptions = new core.EventEmitter();
            _this.onEditOptions = new core.EventEmitter();
            _this.onShowGeometry = new core.EventEmitter();
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
                if (this.dataset instanceof core$1.Timeseries) {
                    this.onShowGeometry.emit(this.dataset.station.geometry);
                }
                if (this.dataset instanceof core$1.Dataset) {
                    this.api.getPlatform(this.dataset.parameters.platform.id, this.dataset.url).subscribe(function (platform) {
                        _this.onShowGeometry.emit(platform.geometry);
                    });
                }
            };
        ConfigurableTimeseriesEntryComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-configurable-timeseries-entry',
                        template: "<span>Platform: {{platformLabel}}</span>\n<span>Phenomenon: {{phenomenonLabel}}</span>\n<span>Procedure: {{procedureLabel}}</span>\n<span>Category: {{categoryLabel}}</span>\n<span>Uom: {{uom}}</span>\n<button (click)=\"toggleSelection()\">toggle selection</button>\n<button (click)=\"removeDataset()\">remove</button>\n<button (click)=\"toggleVisibility()\">toggle visibility</button>\n<button (click)=\"editDatasetOptions()\">edit Options</button>\n<button (click)=\"showGeometry()\">show Geometry</button>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        ConfigurableTimeseriesEntryComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$2.TranslateService }
            ];
        };
        ConfigurableTimeseriesEntryComponent.propDecorators = {
            datasetOptions: [{ type: core.Input }],
            highlight: [{ type: core.Input }],
            onUpdateOptions: [{ type: core.Output }],
            onEditOptions: [{ type: core.Output }],
            onShowGeometry: [{ type: core.Output }]
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
    var FirstLatestTimeseriesEntryComponent = (function (_super) {
        __extends(FirstLatestTimeseriesEntryComponent, _super);
        function FirstLatestTimeseriesEntryComponent(api, internalIdHandler, translateSrvc, timeSrvc) {
            var _this = _super.call(this, api, internalIdHandler, translateSrvc) || this;
            _this.api = api;
            _this.internalIdHandler = internalIdHandler;
            _this.translateSrvc = translateSrvc;
            _this.timeSrvc = timeSrvc;
            _this.onSelectDate = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-first-latest-timeseries-entry',
                        template: "<span>{{procedureLabel}} - {{platformLabel}}</span>\n<span>Has Data: {{hasData}}</span>\n<button *ngIf=\"firstValue\" (click)=\"jumpToFirstTimeStamp()\">{{firstValue.value}} - {{firstValue.timestamp | date}}</button>\n<button *ngIf=\"lastValue\" (click)=\"jumpToLastTimeStamp()\">{{lastValue.value}} - {{lastValue.timestamp | date}}</button>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        FirstLatestTimeseriesEntryComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$2.TranslateService },
                { type: core$1.Time }
            ];
        };
        FirstLatestTimeseriesEntryComponent.propDecorators = {
            timeInterval: [{ type: core.Input }],
            onSelectDate: [{ type: core.Output }]
        };
        return FirstLatestTimeseriesEntryComponent;
    }(ConfigurableTimeseriesEntryComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ReferenceValueColorCache = (function (_super) {
        __extends(ReferenceValueColorCache, _super);
        function ReferenceValueColorCache() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ReferenceValueColorCache.decorators = [
            { type: core.Injectable },
        ];
        return ReferenceValueColorCache;
    }(core$1.IdCache));
    /**
     * Extends the FirstLatestTimeseriesEntryComponent, with the following functions:
     *  - handles the reference values of the dataset entry
     */
    var TimeseriesEntryComponent = (function (_super) {
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
            { type: core.Component, args: [{
                        selector: 'n52-timeseries-entry',
                        template: "<div class=\"legendItem\" style=\"position: relative;\" [ngStyle]=\"{'border-color': datasetOptions?.color}\" [ngClass]=\"{'selected': selected}\"\n  (click)=\"toggleSelection()\">\n  <div class=\"loading-overlay\" *ngIf=\"loading\" [ngStyle]=\"{'background-color': datasetOptions?.color}\">\n    <div class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></div>\n  </div>\n  <div>\n    <div class=\"legendItemheader\" [ngClass]=\"{'highlight': highlight}\">\n      <div class=\"legendItemLabel\" [ngStyle]=\"{'color': datasetOptions?.color}\">\n        <n52-label-mapper label=\"{{platformLabel}}\"></n52-label-mapper>\n        <!-- <n52-favorite-toggler [dataset]=\"dataset\"></n52-favorite-toggler> -->\n      </div>\n      <div class=\"noDataWarning firstLastEntry\" *ngIf=\"!hasData\">\n        <div>\n          <span class=\"fa fa-exclamation-triangle red\"></span>\n          <span class=\"small-label\">Keine Daten verf\u00FCgbar</span>\n        </div>\n        <div class=\"additionalLegendEntry\" (click)=\"jumpToLastTimeStamp(); $event.stopPropagation();\">\n          <span class=\"fa fa-chevron-right\"></span>\n          <span class=\"small-label\">Springe zur letzten Messung</span>\n        </div>\n      </div>\n      <div class=\"small-label\">\n        <n52-label-mapper label=\"{{phenomenonLabel}}\"></n52-label-mapper>\n        <span *ngIf=\"uom\">\n          <span>[</span>\n          <n52-label-mapper label=\"{{uom}}\"></n52-label-mapper>\n          <span>]</span>\n        </span>\n      </div>\n      <div class=\"small-label\">\n        <n52-label-mapper label=\"{{procedureLabel}}\"></n52-label-mapper>\n      </div>\n      <div class=\"small-label\" *ngIf=\"categoryLabel != phenomenonLabel\">\n        <n52-label-mapper label=\"{{categoryLabel}}\"></n52-label-mapper>\n      </div>\n    </div>\n    <div class=\"legendicons\">\n      <span class=\"fa\" [ngClass]=\"{'fa-chevron-down': !informationVisible, 'fa-chevron-up': informationVisible}\" (click)=\"toggleInformation(); $event.stopPropagation();\"></span>\n      <span class=\"fa\" [ngClass]=\"{'fa-eye-slash': datasetOptions?.visible, 'fa-eye': !datasetOptions?.visible}\" (click)=\"toggleVisibility(); $event.stopPropagation();\"></span>\n      <span class=\"fa fa-map-marker\" (click)=\"showGeometry(); $event.stopPropagation();\"></span>\n      <span class=\"fa fa-pencil\" (click)=\"editDatasetOptions(); $event.stopPropagation();\" [ngStyle]=\"{color: datasetOptions?.color}\"></span>\n      <span class=\"fa fa-times\" (click)=\"removeDataset(); $event.stopPropagation();\"></span>\n    </div>\n    <div class=\"collapseLegendEntry small-label\" *ngIf=\"informationVisible\">\n      <div class=\"firstLastEntry additionalLegendEntry\" *ngIf=\"firstValue\" (click)=\"jumpToFirstTimeStamp(); $event.stopPropagation();\">\n        <span class=\"fa fa-chevron-right\"></span>\n        <span>Erster Wert bei</span>\n        <span>{{firstValue.timestamp| date: 'short'}}</span>\n        <span class=\"hidden-medium\">({{firstValue.value}} {{uom}})</span>\n      </div>\n      <div class=\"firstLastEntry additionalLegendEntry\" *ngIf=\"lastValue\" (click)=\"jumpToLastTimeStamp(); $event.stopPropagation();\">\n        <span class=\"fa fa-chevron-right\"></span>\n        <span>Letzter Wert bei</span>\n        <span>{{lastValue.timestamp| date: 'short'}}</span>\n        <span class=\"hidden-medium\">({{lastValue.value}} {{uom}})</span>\n      </div>\n      <div *ngIf=\"dataset?.referenceValues\">\n        <div class=\"additionalLegendEntry\" *ngFor=\"let ref of dataset.referenceValues\" (click)=\"toggleReferenceValue(ref); $event.stopPropagation();\"\n          [ngClass]=\"{'selected': ref.visible}\" [ngStyle]=\"{color: ref.color}\">\n          <span class=\"fa fa-chevron-right\"></span>\n          <span>{{ref.label}}</span>\n        </div>\n      </div>\n      <!-- <div class=\"additionalLegendEntry\" ng-click=\"$event.stopPropagation(); createExportCsv(timeseries)\">\n                <span class=\"glyphicon glyphicon-download\"></span>\n                <span translate=\"export.label\"></span>\n            </div> -->\n      <!-- <div class=\"additionalLegendEntry\">\n                <swc-procedure-metadata timeseries='timeseries'></swc-procedure-metadata>\n                <swc-timeseries-raw-data-output timeseries='timeseries'></swc-timeseries-raw-data-output>\n                <swc-sos-url timeseries='timeseries'></swc-sos-url>\n            </div> -->\n    </div>\n  </div>\n</div>",
                        styles: [".geometryViewerModal .modal-body{height:50vh}n52-timeseries-entry .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}n52-timeseries-entry .legendItem .small-label{font-size:90%;word-break:break-all}n52-timeseries-entry .legendItem.selected{padding:0;border-width:5px;border-style:solid}n52-timeseries-entry .legendItem .legendItemheader{cursor:pointer}n52-timeseries-entry .legendItem .legendItemheader.highlight{font-weight:700}n52-timeseries-entry .legendItem .legendicons span{margin:0 4%;font-size:150%}n52-timeseries-entry .legendItem .legendicons span:hover{cursor:pointer}n52-timeseries-entry .legendItem .legendicons .delete{z-index:5}n52-timeseries-entry .legendItem .noDataWarning{border:2px solid red;border-radius:5px;padding:3px}n52-timeseries-entry .legendItem .noDataWarning .red{color:red}n52-timeseries-entry .legendItem .additionalLegendEntry:hover{cursor:pointer}n52-timeseries-entry .legendItem .additionalLegendEntry.selected{font-weight:bolder}n52-timeseries-entry .legendItem .refEntry.selected{border-style:solid;border-width:2px;border-radius:2px;margin:2px 0}n52-timeseries-entry .legendItem .loading-overlay{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.5;z-index:1;display:flex;justify-content:center;align-items:center}n52-timeseries-entry .legendItem .loading-overlay .fa-spin{color:#fff;font-size:25px;width:25px;height:25px}"],
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        TimeseriesEntryComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$1.Time },
                { type: core$1.InternalIdHandler },
                { type: core$1.ColorService },
                { type: ReferenceValueColorCache },
                { type: core$2.TranslateService }
            ];
        };
        return TimeseriesEntryComponent;
    }(FirstLatestTimeseriesEntryComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TrajectoryEntryComponent = (function (_super) {
        __extends(TrajectoryEntryComponent, _super);
        function TrajectoryEntryComponent(api, internalIdHandler, translateSrvc) {
            var _this = _super.call(this, internalIdHandler, translateSrvc) || this;
            _this.api = api;
            _this.internalIdHandler = internalIdHandler;
            _this.translateSrvc = translateSrvc;
            _this.onUpdateOptions = new core.EventEmitter();
            _this.onEditOptions = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-trajectory-entry',
                        template: "<div style=\"white-space: nowrap;\" (click)=\"toggleVisibility()\">\n  <span>\n    <a class=\"btn btn-light\">\n      <span class=\"fa fa-plus\" [ngClass]=\"{'fa-eye': !datasetOptions?.visible, 'fa-eye-slash': datasetOptions?.visible}\"></span>\n    </a>\n  </span>\n  <span style=\"padding-left: 10px;\" [ngStyle]=\"{'color': datasetOptions?.color}\">{{dataset?.parameters.phenomenon.label}}</span>\n  <span class=\"fa fa-pencil\" (click)=\"editDatasetOptions(datasetOptions); $event.stopPropagation();\" [ngStyle]=\"{color: datasetOptions?.color}\"></span>\n</div>"
                    },] },
        ];
        /** @nocollapse */
        TrajectoryEntryComponent.ctorParameters = function () {
            return [
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$2.TranslateService }
            ];
        };
        TrajectoryEntryComponent.propDecorators = {
            datasetOptions: [{ type: core.Input }],
            onUpdateOptions: [{ type: core.Output }],
            onEditOptions: [{ type: core.Output }]
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
    var HelgolandDatasetlistModule = (function () {
        function HelgolandDatasetlistModule() {
        }
        HelgolandDatasetlistModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            core$2.TranslateModule,
                            core$1.HelgolandCoreModule,
                            HelgolandLabelMapperModule,
                            forms.FormsModule
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
    var DatasetTableComponent = (function (_super) {
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
                    ((event.target)).classList.add('sorted-asc');
                }
                else {
                    ((event.target)).classList.add('sorted-desc');
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
            { type: core.Component, args: [{
                        selector: 'n52-dataset-table',
                        template: "<table *ngIf=\"ready\">\n  <thead>\n    <tr>\n      <th (click)=\"sort($event)\" [attr.data-column-id]=\"'datetime'\" class=\"sorted-asc\">\n        Zeit\n      </th>\n      <th *ngFor=\"let series of this.timeseriesArray; let i = index\" (click)=\"sort($event)\" [attr.data-column-id]=\"i\" [ngStyle]=\"{ 'border-color': preparedColors[i] }\">\n        {{series?.label}} [{{series?.uom}}]\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of this.preparedData\">\n      <td>{{row.datetime | date: 'short'}}</td>\n      <td *ngFor=\"let value of row.values\">{{value}}</td>\n    </tr>\n  </tbody>\n</table>\n",
                        styles: [":host{flex:1;overflow-y:scroll;overflow-x:hidden}:host tbody,:host thead tr{display:table;table-layout:fixed;width:100%}:host table{display:block;border-collapse:separate;border-spacing:0 1px}:host thead{display:block;position:-webkit-sticky;position:sticky;top:0;border-spacing:0}:host tr:nth-child(2n){background-color:#eee}:host th{background-color:#a9a9a9;cursor:pointer;border-bottom-width:7px;border-bottom-style:solid;overflow-wrap:break-word}:host th:first-child{border-bottom-color:#a9a9a9}:host th:first-child.sorted-asc,:host th:first-child.sorted-desc{border-bottom-color:#555}:host th.sorted-asc,:host th.sorted-desc{background-color:#555;color:#fff}:host th.sorted-asc:after{content:\"\\25B4\";float:right}:host th.sorted-desc:after{content:\"\\25BE\";float:right}:host td{white-space:nowrap;border-bottom:1px solid gray}:host td,:host th{padding:5px 10px}"]
                    },] },
        ];
        /** @nocollapse */
        DatasetTableComponent.ctorParameters = function () {
            return [
                { type: core.IterableDiffers },
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$1.Time },
                { type: core$2.TranslateService }
            ];
        };
        return DatasetTableComponent;
    }(core$1.DatasetPresenterComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandDatasetTableModule = (function () {
        function HelgolandDatasetTableModule() {
        }
        HelgolandDatasetTableModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            DatasetTableComponent
                        ],
                        imports: [
                            common.CommonModule,
                            core$2.TranslateModule,
                            core$1.HelgolandCoreModule
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

    exports.HelgolandDatasetlistModule = HelgolandDatasetlistModule;
    exports.ProfileEntryComponent = ProfileEntryComponent;
    exports.ConfigurableTimeseriesEntryComponent = ConfigurableTimeseriesEntryComponent;
    exports.FirstLatestTimeseriesEntryComponent = FirstLatestTimeseriesEntryComponent;
    exports.SimpleTimeseriesEntryComponent = SimpleTimeseriesEntryComponent;
    exports.ReferenceValueColorCache = ReferenceValueColorCache;
    exports.TimeseriesEntryComponent = TimeseriesEntryComponent;
    exports.TrajectoryEntryComponent = TrajectoryEntryComponent;
    exports.DatasetTableComponent = DatasetTableComponent;
    exports.HelgolandDatasetTableModule = HelgolandDatasetTableModule;
    exports.LabelMapperService = LabelMapperService;
    exports.LabelMapperComponent = LabelMapperComponent;
    exports.HelgolandLabelMapperModule = HelgolandLabelMapperModule;
    exports.ɵa = ListEntryComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWRlcGljdGlvbi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9sYWJlbC1tYXBwZXIvbGFiZWwtbWFwcGVyLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9sYWJlbC1tYXBwZXIvbGFiZWwtbWFwcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIubW9kdWxlLnRzIixudWxsLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC9saXN0LWVudHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXRsaXN0L3Byb2ZpbGUtZW50cnkvcHJvZmlsZS1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldGxpc3QvbW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldC10YWJsZS9kYXRhc2V0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXQtdGFibGUvbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJZENhY2hlLCBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IElkQ2FjaGU8c3RyaW5nPiA9IG5ldyBJZENhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByb3RlY3RlZCBzZXR0aW5nc1NydmM6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgICApIHsgfVxuXG4gICAgcHVibGljIGdldE1hcHBlZExhYmVsKGxhYmVsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5nc1NydmMuZ2V0U2V0dGluZ3MoKS5zb2x2ZUxhYmVscykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZmluZFVybChsYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIHRoaXMuY2FjaGUuZ2V0KHVybCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWxVcmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NTcnZjLmdldFNldHRpbmdzKCkucHJveHlVcmwgPyB0aGlzLnNldHRpbmdzU3J2Yy5nZXRTZXR0aW5ncygpLnByb3h5VXJsICsgdXJsIDogdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChsYWJlbFVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtbCA9ICQucGFyc2VYTUwocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKHVybCwgJCh4bWwpLmZpbmQoJ3ByZWZMYWJlbCcpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudGx5IGRvIG5vdGhpbmcgYW5kIHVzZSBvbGQgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbC5zdWJzdHJpbmcobGFiZWwubGFzdEluZGV4T2YoJy8nKSArIDEsIGxhYmVsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCByZXNvbHZlZExhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1MYWJlbChvYnNlcnZlciwgcmVzb2x2ZWRMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpcm1MYWJlbChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPiwgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGxhYmVsKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRVcmwobGFiZWw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAobGFiZWwgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlZ2V4VG9rZW4gPSAvKCgoZnRwfGh0dHBzPyk6XFwvXFwvKVtcXC1cXHdAOiVfXFwrLn4jPyZcXC9cXC89XSspL2c7XG4gICAgICAgIGNvbnN0IG1hdGNoQXJyYXkgPSByZWdleFRva2VuLmV4ZWMoc291cmNlKTtcbiAgICAgICAgaWYgKG1hdGNoQXJyYXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaEFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGFiZWwtbWFwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiZGV0ZXJtaW5lZExhYmVsXCI+e3tkZXRlcm1pbmVkTGFiZWx9fTwvc3Bhbj5cbjxzcGFuICpuZ0lmPVwibG9hZGluZ1wiPlxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBpY29uLXNwaW5cIj48L3NwYW4+XG4gIDxzcGFuPiBsb2FkaW5nIGxhYmVsIC4uLjwvc3Bhbj5cbjwvc3Bhbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBkZXRlcm1pbmVkTGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGFiZWxNYXBwZXJTcnZjOiBMYWJlbE1hcHBlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXBwZXJTcnZjLmdldE1hcHBlZExhYmVsKHRoaXMubGFiZWwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVkTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlckNvbXBvbmVudCB9IGZyb20gJy4vbGFiZWwtbWFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGFiZWxNYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTGFiZWxNYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTGFiZWxNYXBwZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUgeyB9XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEludGVybmFsRGF0YXNldElkLCBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYWJzdHJhY3QgZGF0YXNldCBlbnRyeSBmb3IgYSBsaXN0LCB3aGljaCBoYXMgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBjYW4gYmUgc2VsZWN0ZWQgYW5kIGlzIHNlbGVjdGFibGUgaW50ZXJuYWxseSwgd2l0aCBhIGNvcnJlc3BvbmRpbmcgb3V0cHV0IGV2ZW50XG4gKiAgLSBjYW4gYmUgZGVsZXRlZCwgd2hpY2ggYWxzbyB0cmlnZ2VycyBhbiBvdXRwdXQgZXZlbnRcbiAqICAtIHRyYW5zbGF0YWJsZSwgc28gaXQgdHJpZ2dlcnMgdGhlIG1ldGhvZGUgb25MYW5ndWFnZUNoYW5nZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgc3dpdGNoZWRcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpc3RFbnRyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25EZWxldGVEYXRhc2V0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3REYXRhc2V0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgbG9hZGluZztcblxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkOiBJbnRlcm5hbERhdGFzZXRJZDtcblxuICAgIHByaXZhdGUgbGFuZ0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldElkKSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsSWQgPSB0aGlzLmludGVybmFsSWRIYW5kbGVyLnJlc29sdmVJbnRlcm5hbElkKHRoaXMuZGF0YXNldElkKTtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXQodGhpcy50cmFuc2xhdGVTcnZjLmN1cnJlbnRMYW5nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhbmdDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnRyYW5zbGF0ZVNydmMub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHRoaXMub25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhbmdDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRGF0YXNldCgpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZURhdGFzZXQuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMub25TZWxlY3REYXRhc2V0LmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmludGVybmFsSWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXQobGFuZ0NoYW5nZUV2ZW50LmxhbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0LFxuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgTG9jYXRlZFByb2ZpbGVEYXRhRW50cnksXG4gICAgUGFyYW1ldGVyRmlsdGVyLFxuICAgIFBsYXRmb3JtVHlwZXMsXG4gICAgVGltZWREYXRhc2V0T3B0aW9ucyxcbiAgICBUaW1lc3Bhbixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vbGlzdC1lbnRyeS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1wcm9maWxlLWVudHJ5JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsZWdlbmRJdGVtXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHNlbGVjdGVkfVwiIChjbGljayk9XCJ0b2dnbGVTZWxlY3Rpb24oKVwiPlxuICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbWhlYWRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJsZWdlbmRJdGVtTGFiZWxcIj5cbiAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0Py5wYXJhbWV0ZXJzLnBsYXRmb3JtLmxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICA8c3BhbiAqbmdJZj1cImRhdGFzZXQ/LnVvbVwiPltcbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2RhdGFzZXQudW9tfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIj5cbiAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0Py5wYXJhbWV0ZXJzLnByb2NlZHVyZS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiICpuZ0lmPVwiZGF0YXNldD8ucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbCAhPSBkYXRhc2V0Py5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWxcIj5cbiAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0Py5wYXJhbWV0ZXJzLmNhdGVnb3J5LmxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGFzZXRPcHRpb25zXCI+XG4gICAgPGRpdj5cbiAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsnY29sb3InOiBpdGVtLmNvbG9yfVwiPnt7aXRlbS50aW1lc3RhbXAgfCBkYXRlOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhXCIgW25nQ2xhc3NdPVwieydmYS1leWUtc2xhc2gnOiBpdGVtLnZpc2libGUsICdmYS1leWUnOiAhaXRlbS52aXNpYmxlfVwiIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KGl0ZW0pOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCJcbiAgICAgICAgdGl0bGU9XCJ7eydwcm9maWxlcy5sZWdlbmQudmlzaWJpbGl0eScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgKGNsaWNrKT1cImVkaXREYXRhc2V0T3B0aW9ucyhpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIFtuZ1N0eWxlXT1cIntjb2xvcjogaXRlbS5jb2xvcn1cIlxuICAgICAgICB0aXRsZT1cInt7J3Byb2ZpbGVzLmxlZ2VuZC5lZGl0LXN0eWxlJyB8IHRyYW5zbGF0ZX19XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1tYXAtbWFya2VyXCIgKGNsaWNrKT1cInNob3dHZW9tZXRyeShpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLnNob3ctZ2VvbWV0cnknIHwgdHJhbnNsYXRlfX1cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRpbWVzXCIgKGNsaWNrKT1cInJlbW92ZURhdGFzZXRPcHRpb25zKGl0ZW0pOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgdGl0bGU9XCJ7eydwcm9maWxlcy5sZWdlbmQuZGVsZXRlLXN1YmVudHJ5JyB8IHRyYW5zbGF0ZX19XCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKGNsaWNrKT1cIm9wZW5JbkNvbWJpVmlldyhpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiICpuZ0lmPVwiaXNNb2JpbGUoKVwiIGNsYXNzPVwidG9Db21iaVZpZXdcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtYXJyb3ctcmlnaHRcIj48L3NwYW4+XG4gICAgICA8c3Bhbj57eydwcm9maWxlcy5sZWdlbmQuZ28tdG8tY29tYmktdmlldycgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5sZWdlbmRJdGVte2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjVweDtib3JkZXItcmFkaXVzOjVweDttYXJnaW4tYm90dG9tOjVweH06aG9zdCAubGVnZW5kSXRlbSAuc21hbGx7Zm9udC1zaXplOjkwJTt3b3JkLWJyZWFrOmJyZWFrLWFsbH06aG9zdCAubGVnZW5kSXRlbS5zZWxlY3RlZHtwYWRkaW5nOjA7Ym9yZGVyLXdpZHRoOjVweDtib3JkZXItc3R5bGU6c29saWR9Omhvc3QgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXJ7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLmxlZ2VuZEl0ZW0gLnRvQ29tYmlWaWV3e2N1cnNvcjpwb2ludGVyfTpob3N0IC5sZWdlbmRJdGVtIC5mYXtjdXJzb3I6cG9pbnRlcn1gXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlRW50cnlDb21wb25lbnQgZXh0ZW5kcyBMaXN0RW50cnlDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnNbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblVwZGF0ZU9wdGlvbnM6IEV2ZW50RW1pdHRlcjxUaW1lZERhdGFzZXRPcHRpb25zW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRGVsZXRlRGF0YXNldE9wdGlvbnM6IEV2ZW50RW1pdHRlcjxUaW1lZERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkVkaXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25PcGVuSW5Db21iaVZpZXc6IEV2ZW50RW1pdHRlcjxUaW1lZERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNob3dHZW9tZXRyeTogRXZlbnRFbWl0dGVyPEdlb0pTT04uR2VvSnNvbk9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgZGF0YXNldDogRGF0YXNldDtcblxuICAgIHB1YmxpYyBlZGl0YWJsZU9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnM7XG4gICAgcHVibGljIHRlbXBDb2xvcjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRGF0YXNldE9wdGlvbnMob3B0aW9uczogVGltZWREYXRhc2V0T3B0aW9ucykge1xuICAgICAgICB0aGlzLm9uRGVsZXRlRGF0YXNldE9wdGlvbnMuZW1pdChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZWRpdERhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkVkaXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkob3B0aW9uczogVGltZWREYXRhc2V0T3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnZpc2libGUgPSAhb3B0aW9ucy52aXNpYmxlO1xuICAgICAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc01vYmlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldC5wbGF0Zm9ybVR5cGUgPT09IFBsYXRmb3JtVHlwZXMubW9iaWxlSW5zaXR1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkluQ29tYmlWaWV3KG9wdGlvbjogVGltZWREYXRhc2V0T3B0aW9ucykge1xuICAgICAgICB0aGlzLm9uT3BlbkluQ29tYmlWaWV3LmVtaXQob3B0aW9uKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0dlb21ldHJ5KG9wdGlvbjogVGltZWREYXRhc2V0T3B0aW9ucykge1xuICAgICAgICBjb25zdCBpbnRlcm5hbElkID0gdGhpcy5pbnRlcm5hbElkSGFuZGxlci5yZXNvbHZlSW50ZXJuYWxJZCh0aGlzLmRhdGFzZXRJZCk7XG4gICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuID0gbmV3IFRpbWVzcGFuKG9wdGlvbi50aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YTxMb2NhdGVkUHJvZmlsZURhdGFFbnRyeT4oaW50ZXJuYWxJZC5pZCwgaW50ZXJuYWxJZC51cmwsIHRpbWVzcGFuKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvd0dlb21ldHJ5LmVtaXQocmVzdWx0LnZhbHVlc1swXS5nZW9tZXRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwaS5nZXRQbGF0Zm9ybSh0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5wbGF0Zm9ybS5pZCwgaW50ZXJuYWxJZC51cmwpLnN1YnNjcmliZSgocGxhdGZvcm0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvd0dlb21ldHJ5LmVtaXQocGxhdGZvcm0uZ2VvbWV0cnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbG9hZERhdGFzZXQobGFuZz86IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9O1xuICAgICAgICBpZiAobGFuZykgeyBwYXJhbXMubGFuZyA9IGxhbmc7IH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldCh0aGlzLmludGVybmFsSWQuaWQsIHRoaXMuaW50ZXJuYWxJZC51cmwsIHBhcmFtcykuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXQgPSBkYXRhc2V0O1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBJRGF0YXNldCwgSW50ZXJuYWxJZEhhbmRsZXIsIFBhcmFtZXRlckZpbHRlciwgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExpc3RFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xpc3QtZW50cnkuY29tcG9uZW50JztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBMaXN0RW50cnlDb21wb25lbnQsIHdoaWNoIGhhcyB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGNhbiBiZSBzZWxlY3RlZCBhbmQgaXMgc2VsZWN0YWJsZSBpbnRlcm5hbGx5LCB3aXRoIGEgY29ycmVzcG9uZGluZyBvdXRwdXQgZXZlbnRcbiAqICAtIGNhbiBiZSBkZWxldGVkLCB3aGljaCBhbHNvIHRyaWdnZXJzIGFuIG91dHB1dCBldmVudFxuICogIC0gdHJhbnNsYXRhYmxlLCBzbyBpdCB0cmlnZ2VycyB0aGUgbWV0aG9kZSBvbkxhbmd1YWdlQ2hhbmdlZCB3aGVuIHRoZSBsYW5ndWFnZSBpcyBzd2l0Y2hlZFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItc2ltcGxlLXRpbWVzZXJpZXMtZW50cnknLFxuICB0ZW1wbGF0ZTogYDxzcGFuPlBsYXRmb3JtOiB7e3BsYXRmb3JtTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlBoZW5vbWVub246IHt7cGhlbm9tZW5vbkxhYmVsfX08L3NwYW4+XG48c3Bhbj5Qcm9jZWR1cmU6IHt7cHJvY2VkdXJlTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPkNhdGVnb3J5OiB7e2NhdGVnb3J5TGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlVvbToge3t1b219fTwvc3Bhbj5cbjxidXR0b24gKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+c2VsZWN0PC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJyZW1vdmVEYXRhc2V0KClcIj5yZW1vdmU8L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IHtcblxuICBwdWJsaWMgZGF0YXNldDogSURhdGFzZXQ7XG5cbiAgcHVibGljIHBsYXRmb3JtTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHBoZW5vbWVub25MYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgcHJvY2VkdXJlTGFiZWw6IHN0cmluZztcbiAgcHVibGljIGNhdGVnb3J5TGFiZWw6IHN0cmluZztcbiAgcHVibGljIHVvbTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZERhdGFzZXQobGFuZz86IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHBhcmFtczogUGFyYW1ldGVyRmlsdGVyID0ge307XG4gICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmFwaS5nZXRTaW5nbGVUaW1lc2VyaWVzKHRoaXMuaW50ZXJuYWxJZC5pZCwgdGhpcy5pbnRlcm5hbElkLnVybCwgcGFyYW1zKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHRpbWVzZXJpZXMpID0+IHRoaXMuc2V0RGF0YXNldCh0aW1lc2VyaWVzKSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldCh0aGlzLmludGVybmFsSWQuaWQsIHRoaXMuaW50ZXJuYWxJZC51cmwsIHBhcmFtcykuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB0aGlzLnNldERhdGFzZXQoZGF0YXNldCkpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXREYXRhc2V0KHRpbWVzZXJpZXM6IElEYXRhc2V0KSB7XG4gICAgdGhpcy5kYXRhc2V0ID0gdGltZXNlcmllcztcbiAgICB0aGlzLnNldFBhcmFtZXRlcnMoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRQYXJhbWV0ZXJzKCkge1xuICAgIGlmICh0aGlzLmRhdGFzZXQgaW5zdGFuY2VvZiBEYXRhc2V0KSB7XG4gICAgICB0aGlzLnBsYXRmb3JtTGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5wbGF0Zm9ybS5sYWJlbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgIHRoaXMucGxhdGZvcm1MYWJlbCA9IHRoaXMuZGF0YXNldC5zdGF0aW9uLnByb3BlcnRpZXMubGFiZWw7XG4gICAgfVxuICAgIHRoaXMucGhlbm9tZW5vbkxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbDtcbiAgICB0aGlzLnByb2NlZHVyZUxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucHJvY2VkdXJlLmxhYmVsO1xuICAgIHRoaXMuY2F0ZWdvcnlMYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLmNhdGVnb3J5LmxhYmVsO1xuICAgIHRoaXMudW9tID0gdGhpcy5kYXRhc2V0LnVvbTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXQsIERhdGFzZXRBcGlJbnRlcmZhY2UsIERhdGFzZXRPcHRpb25zLCBJbnRlcm5hbElkSGFuZGxlciwgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LCB3aXRoIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gZGF0YXNldCBvcHRpb25zIGFuZCB0cmlnZ2VycyB0aGUgZWRpdGF0aW9uIG9mIHRoZSBkYXRhc2V0IG9wdGlvbnNcbiAqICAtIHRyaWdnZXJzIHRoZSBzaG93IGdlb21ldHJ5IGV2ZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+UGxhdGZvcm06IHt7cGxhdGZvcm1MYWJlbH19PC9zcGFuPlxuPHNwYW4+UGhlbm9tZW5vbjoge3twaGVub21lbm9uTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlByb2NlZHVyZToge3twcm9jZWR1cmVMYWJlbH19PC9zcGFuPlxuPHNwYW4+Q2F0ZWdvcnk6IHt7Y2F0ZWdvcnlMYWJlbH19PC9zcGFuPlxuPHNwYW4+VW9tOiB7e3VvbX19PC9zcGFuPlxuPGJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj50b2dnbGUgc2VsZWN0aW9uPC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJyZW1vdmVEYXRhc2V0KClcIj5yZW1vdmU8L2J1dHRvbj5cbjxidXR0b24gKGNsaWNrKT1cInRvZ2dsZVZpc2liaWxpdHkoKVwiPnRvZ2dsZSB2aXNpYmlsaXR5PC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoKVwiPmVkaXQgT3B0aW9uczwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwic2hvd0dlb21ldHJ5KClcIj5zaG93IEdlb21ldHJ5PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBEYXRhc2V0T3B0aW9ucztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaGlnaGxpZ2h0OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8RGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uU2hvd0dlb21ldHJ5OiBFdmVudEVtaXR0ZXI8R2VvSlNPTi5HZW9Kc29uT2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoYXBpLCBpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnZpc2libGUgPSAhdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlO1xuICAgIHRoaXMub25VcGRhdGVPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZWRpdERhdGFzZXRPcHRpb25zKCkge1xuICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHNob3dHZW9tZXRyeSgpIHtcbiAgICBpZiAodGhpcy5kYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHRoaXMuZGF0YXNldC5zdGF0aW9uLmdlb21ldHJ5KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIERhdGFzZXQpIHtcbiAgICAgIHRoaXMuYXBpLmdldFBsYXRmb3JtKHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBsYXRmb3JtLmlkLCB0aGlzLmRhdGFzZXQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgIHRoaXMub25TaG93R2VvbWV0cnkuZW1pdChwbGF0Zm9ybS5nZW9tZXRyeSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgRmlyc3RMYXN0VmFsdWUsIEludGVybmFsSWRIYW5kbGVyLCBUaW1lLCBUaW1lSW50ZXJ2YWwgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4uL2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5L2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgQ29uZmlndXJhYmxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LCB3aXRoIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gZmlyc3QgYW5kIGxhdGVzdCB2YWxpZGF0aW9uXG4gKiAgLSBqdW1wIHRvIGZpcnN0IGFuZCBsYXRlc3QgdmFsdWUgZXZlbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+e3twcm9jZWR1cmVMYWJlbH19IC0ge3twbGF0Zm9ybUxhYmVsfX08L3NwYW4+XG48c3Bhbj5IYXMgRGF0YToge3toYXNEYXRhfX08L3NwYW4+XG48YnV0dG9uICpuZ0lmPVwiZmlyc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9GaXJzdFRpbWVTdGFtcCgpXCI+e3tmaXJzdFZhbHVlLnZhbHVlfX0gLSB7e2ZpcnN0VmFsdWUudGltZXN0YW1wIHwgZGF0ZX19PC9idXR0b24+XG48YnV0dG9uICpuZ0lmPVwibGFzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKVwiPnt7bGFzdFZhbHVlLnZhbHVlfX0gLSB7e2xhc3RWYWx1ZS50aW1lc3RhbXAgfCBkYXRlfX08L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgZXh0ZW5kcyBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbDtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uU2VsZWN0RGF0ZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBmaXJzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gIHB1YmxpYyBoYXNEYXRhID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lXG4gICkge1xuICAgIHN1cGVyKGFwaSwgaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy50aW1lSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMuY2hlY2tEYXRhSW5UaW1lc3BhbigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBqdW1wVG9GaXJzdFRpbWVTdGFtcCgpIHtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KG5ldyBEYXRlKHRoaXMuZGF0YXNldC5maXJzdFZhbHVlLnRpbWVzdGFtcCkpO1xuICB9XG5cbiAgcHVibGljIGp1bXBUb0xhc3RUaW1lU3RhbXAoKSB7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChuZXcgRGF0ZSh0aGlzLmRhdGFzZXQubGFzdFZhbHVlLnRpbWVzdGFtcCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFBhcmFtZXRlcnMoKSB7XG4gICAgc3VwZXIuc2V0UGFyYW1ldGVycygpO1xuICAgIHRoaXMuZmlyc3RWYWx1ZSA9IHRoaXMuZGF0YXNldC5maXJzdFZhbHVlO1xuICAgIHRoaXMubGFzdFZhbHVlID0gdGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZTtcbiAgICB0aGlzLmNoZWNrRGF0YUluVGltZXNwYW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tEYXRhSW5UaW1lc3BhbigpIHtcbiAgICBpZiAodGhpcy50aW1lSW50ZXJ2YWwgJiYgdGhpcy5kYXRhc2V0KSB7XG4gICAgICB0aGlzLmhhc0RhdGEgPSB0aGlzLnRpbWVTcnZjLm92ZXJsYXBzKFxuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbCxcbiAgICAgICAgdGhpcy5kYXRhc2V0LmZpcnN0VmFsdWUudGltZXN0YW1wLFxuICAgICAgICB0aGlzLmRhdGFzZXQubGFzdFZhbHVlLnRpbWVzdGFtcFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3RhYmxlLCBPbkNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UsIERhdGFzZXRBcGlJbnRlcmZhY2UsIElkQ2FjaGUsIEludGVybmFsSWRIYW5kbGVyLCBSZWZlcmVuY2VWYWx1ZSwgVGltZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4uL2ZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5L2ZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUgZXh0ZW5kcyBJZENhY2hlPHsgY29sb3I6IHN0cmluZywgdmlzaWJsZTogYm9vbGVhbiB9PiB7IH1cblxuLyoqXG4gKiBFeHRlbmRzIHRoZSBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCwgd2l0aCB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGhhbmRsZXMgdGhlIHJlZmVyZW5jZSB2YWx1ZXMgb2YgdGhlIGRhdGFzZXQgZW50cnlcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItdGltZXNlcmllcy1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIFtuZ1N0eWxlXT1cInsnYm9yZGVyLWNvbG9yJzogZGF0YXNldE9wdGlvbnM/LmNvbG9yfVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIlxuICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5cbiAgPGRpdiBjbGFzcz1cImxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZ1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGZhLTN4IGZhLWZ3XCI+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJsZWdlbmRJdGVtaGVhZGVyXCIgW25nQ2xhc3NdPVwieydoaWdobGlnaHQnOiBoaWdobGlnaHR9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbUxhYmVsXCIgW25nU3R5bGVdPVwieydjb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3BsYXRmb3JtTGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgICAgPCEtLSA8bjUyLWZhdm9yaXRlLXRvZ2dsZXIgW2RhdGFzZXRdPVwiZGF0YXNldFwiPjwvbjUyLWZhdm9yaXRlLXRvZ2dsZXI+IC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm9EYXRhV2FybmluZyBmaXJzdExhc3RFbnRyeVwiICpuZ0lmPVwiIWhhc0RhdGFcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHJlZFwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+S2VpbmUgRGF0ZW4gdmVyZsODwrxnYmFyPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiIChjbGljayk9XCJqdW1wVG9MYXN0VGltZVN0YW1wKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbC1sYWJlbFwiPlNwcmluZ2UgenVyIGxldHp0ZW4gTWVzc3VuZzwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbWFsbC1sYWJlbFwiPlxuICAgICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7cGhlbm9tZW5vbkxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidW9tXCI+XG4gICAgICAgICAgPHNwYW4+Wzwvc3Bhbj5cbiAgICAgICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7dW9tfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICAgICAgPHNwYW4+XTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3Byb2NlZHVyZUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbWFsbC1sYWJlbFwiICpuZ0lmPVwiY2F0ZWdvcnlMYWJlbCAhPSBwaGVub21lbm9uTGFiZWxcIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2NhdGVnb3J5TGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJsZWdlbmRpY29uc1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtY2hldnJvbi1kb3duJzogIWluZm9ybWF0aW9uVmlzaWJsZSwgJ2ZhLWNoZXZyb24tdXAnOiBpbmZvcm1hdGlvblZpc2libGV9XCIgKGNsaWNrKT1cInRvZ2dsZUluZm9ybWF0aW9uKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhXCIgW25nQ2xhc3NdPVwieydmYS1leWUtc2xhc2gnOiBkYXRhc2V0T3B0aW9ucz8udmlzaWJsZSwgJ2ZhLWV5ZSc6ICFkYXRhc2V0T3B0aW9ucz8udmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlVmlzaWJpbGl0eSgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1tYXAtbWFya2VyXCIgKGNsaWNrKT1cInNob3dHZW9tZXRyeSgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1wZW5jaWxcIiAoY2xpY2spPVwiZWRpdERhdGFzZXRPcHRpb25zKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdTdHlsZV09XCJ7Y29sb3I6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRpbWVzXCIgKGNsaWNrKT1cInJlbW92ZURhdGFzZXQoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2VMZWdlbmRFbnRyeSBzbWFsbC1sYWJlbFwiICpuZ0lmPVwiaW5mb3JtYXRpb25WaXNpYmxlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmlyc3RMYXN0RW50cnkgYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKm5nSWY9XCJmaXJzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0ZpcnN0VGltZVN0YW1wKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICA8c3Bhbj5FcnN0ZXIgV2VydCBiZWk8L3NwYW4+XG4gICAgICAgIDxzcGFuPnt7Zmlyc3RWYWx1ZS50aW1lc3RhbXB8IGRhdGU6ICdzaG9ydCd9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRkZW4tbWVkaXVtXCI+KHt7Zmlyc3RWYWx1ZS52YWx1ZX19IHt7dW9tfX0pPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmlyc3RMYXN0RW50cnkgYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKm5nSWY9XCJsYXN0VmFsdWVcIiAoY2xpY2spPVwianVtcFRvTGFzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4+TGV0enRlciBXZXJ0IGJlaTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e3tsYXN0VmFsdWUudGltZXN0YW1wfCBkYXRlOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1lZGl1bVwiPih7e2xhc3RWYWx1ZS52YWx1ZX19IHt7dW9tfX0pPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZGF0YXNldD8ucmVmZXJlbmNlVmFsdWVzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAqbmdGb3I9XCJsZXQgcmVmIG9mIGRhdGFzZXQucmVmZXJlbmNlVmFsdWVzXCIgKGNsaWNrKT1cInRvZ2dsZVJlZmVyZW5jZVZhbHVlKHJlZik7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiByZWYudmlzaWJsZX1cIiBbbmdTdHlsZV09XCJ7Y29sb3I6IHJlZi5jb2xvcn1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4+e3tyZWYubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiIG5nLWNsaWNrPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBjcmVhdGVFeHBvcnRDc3YodGltZXNlcmllcylcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZG93bmxvYWRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPVwiZXhwb3J0LmxhYmVsXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCI+XG4gICAgICAgICAgICAgICAgPHN3Yy1wcm9jZWR1cmUtbWV0YWRhdGEgdGltZXNlcmllcz0ndGltZXNlcmllcyc+PC9zd2MtcHJvY2VkdXJlLW1ldGFkYXRhPlxuICAgICAgICAgICAgICAgIDxzd2MtdGltZXNlcmllcy1yYXctZGF0YS1vdXRwdXQgdGltZXNlcmllcz0ndGltZXNlcmllcyc+PC9zd2MtdGltZXNlcmllcy1yYXctZGF0YS1vdXRwdXQ+XG4gICAgICAgICAgICAgICAgPHN3Yy1zb3MtdXJsIHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXNvcy11cmw+XG4gICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgLmdlb21ldHJ5Vmlld2VyTW9kYWwgLm1vZGFsLWJvZHl7aGVpZ2h0OjUwdmh9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW17YmFja2dyb3VuZC1jb2xvcjojZmZmO3BhZGRpbmc6NXB4O2JvcmRlci1yYWRpdXM6NXB4O21hcmdpbi1ib3R0b206NXB4fW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5zbWFsbC1sYWJlbHtmb250LXNpemU6OTAlO3dvcmQtYnJlYWs6YnJlYWstYWxsfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtLnNlbGVjdGVke3BhZGRpbmc6MDtib3JkZXItd2lkdGg6NXB4O2JvcmRlci1zdHlsZTpzb2xpZH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kSXRlbWhlYWRlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kSXRlbWhlYWRlci5oaWdobGlnaHR7Zm9udC13ZWlnaHQ6NzAwfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRpY29ucyBzcGFue21hcmdpbjowIDQlO2ZvbnQtc2l6ZToxNTAlfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRpY29ucyBzcGFuOmhvdmVye2N1cnNvcjpwb2ludGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRpY29ucyAuZGVsZXRle3otaW5kZXg6NX1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubm9EYXRhV2FybmluZ3tib3JkZXI6MnB4IHNvbGlkIHJlZDtib3JkZXItcmFkaXVzOjVweDtwYWRkaW5nOjNweH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubm9EYXRhV2FybmluZyAucmVke2NvbG9yOnJlZH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuYWRkaXRpb25hbExlZ2VuZEVudHJ5OmhvdmVye2N1cnNvcjpwb2ludGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5hZGRpdGlvbmFsTGVnZW5kRW50cnkuc2VsZWN0ZWR7Zm9udC13ZWlnaHQ6Ym9sZGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5yZWZFbnRyeS5zZWxlY3RlZHtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjJweDtib3JkZXItcmFkaXVzOjJweDttYXJnaW46MnB4IDB9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxvYWRpbmctb3ZlcmxheXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtvcGFjaXR5Oi41O3otaW5kZXg6MTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxvYWRpbmctb3ZlcmxheSAuZmEtc3Bpbntjb2xvcjojZmZmO2ZvbnQtc2l6ZToyNXB4O3dpZHRoOjI1cHg7aGVpZ2h0OjI1cHh9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgZXh0ZW5kcyBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBwdWJsaWMgaW5mb3JtYXRpb25WaXNpYmxlID0gZmFsc2U7XG4gICAgcHVibGljIHJlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCBjb2xvcjogQ29sb3JTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgcmVmVmFsQ2FjaGU6IFJlZmVyZW5jZVZhbHVlQ29sb3JDYWNoZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoYXBpLCBpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2YywgdGltZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVJbmZvcm1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5pbmZvcm1hdGlvblZpc2libGUgPSAhdGhpcy5pbmZvcm1hdGlvblZpc2libGU7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVJlZmVyZW5jZVZhbHVlKHJlZlZhbHVlOiBSZWZlcmVuY2VWYWx1ZSkge1xuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmRhdGFzZXRPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkuaWQgPT09IHJlZlZhbHVlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICBjb25zdCByZWZWYWxJZCA9IHRoaXMuY3JlYXRlUmVmVmFsSWQocmVmVmFsdWUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgcmVmVmFsdWUudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVmVmFsdWUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMucHVzaCh7IGlkOiByZWZWYWx1ZS5yZWZlcmVuY2VWYWx1ZUlkLCBjb2xvcjogcmVmVmFsdWUuY29sb3IgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZWYWxDYWNoZS5nZXQocmVmVmFsSWQpLnZpc2libGUgPSByZWZWYWx1ZS52aXNpYmxlO1xuICAgICAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRQYXJhbWV0ZXJzKCkge1xuICAgICAgICBzdXBlci5zZXRQYXJhbWV0ZXJzKCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXQucmVmZXJlbmNlVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXQucmVmZXJlbmNlVmFsdWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZWYWxJZCA9IHRoaXMuY3JlYXRlUmVmVmFsSWQoZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZWYWxPcHRpb24gPSB0aGlzLmRhdGFzZXRPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMuZmluZCgobykgPT4gby5pZCA9PT0gZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgICAgICAgICBpZiAocmVmVmFsT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmVmFsQ2FjaGUuc2V0KHJlZlZhbElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmVmVmFsT3B0aW9uLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlZlZhbENhY2hlLmhhcyhyZWZWYWxJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZWYWxDYWNoZS5zZXQocmVmVmFsSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLmdldENvbG9yKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZS5jb2xvciA9IHRoaXMucmVmVmFsQ2FjaGUuZ2V0KHJlZlZhbElkKS5jb2xvcjtcbiAgICAgICAgICAgICAgICBlLnZpc2libGUgPSB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkudmlzaWJsZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZWZWYWxJZChyZWZJZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQudXJsICsgcmVmSWQ7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldCwgRGF0YXNldEFwaUludGVyZmFjZSwgRGF0YXNldE9wdGlvbnMsIEludGVybmFsSWRIYW5kbGVyLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0RW50cnlDb21wb25lbnQgfSBmcm9tICcuLi9saXN0LWVudHJ5LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXRyYWplY3RvcnktZW50cnknLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXA7XCIgKGNsaWNrKT1cInRvZ2dsZVZpc2liaWxpdHkoKVwiPlxuICA8c3Bhbj5cbiAgICA8YSBjbGFzcz1cImJ0biBidG4tbGlnaHRcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGx1c1wiIFtuZ0NsYXNzXT1cInsnZmEtZXllJzogIWRhdGFzZXRPcHRpb25zPy52aXNpYmxlLCAnZmEtZXllLXNsYXNoJzogZGF0YXNldE9wdGlvbnM/LnZpc2libGV9XCI+PC9zcGFuPlxuICAgIDwvYT5cbiAgPC9zcGFuPlxuICA8c3BhbiBzdHlsZT1cInBhZGRpbmctbGVmdDogMTBweDtcIiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogZGF0YXNldE9wdGlvbnM/LmNvbG9yfVwiPnt7ZGF0YXNldD8ucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsfX08L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgKGNsaWNrKT1cImVkaXREYXRhc2V0T3B0aW9ucyhkYXRhc2V0T3B0aW9ucyk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdTdHlsZV09XCJ7Y29sb3I6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj48L3NwYW4+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFRyYWplY3RvcnlFbnRyeUNvbXBvbmVudCBleHRlbmRzIExpc3RFbnRyeUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogRGF0YXNldE9wdGlvbnM7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8RGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRWRpdE9wdGlvbnM6IEV2ZW50RW1pdHRlcjxEYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgZGF0YXNldDogRGF0YXNldDtcblxuICAgIHB1YmxpYyB0ZW1wQ29sb3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMudmlzaWJsZSA9ICF0aGlzLmRhdGFzZXRPcHRpb25zLnZpc2libGU7XG4gICAgICAgIHRoaXMub25VcGRhdGVPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBEYXRhc2V0T3B0aW9ucykge1xuICAgICAgICB0aGlzLm9uRWRpdE9wdGlvbnMuZW1pdChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbG9hZERhdGFzZXQobGFuZz86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9O1xuICAgICAgICBpZiAobGFuZykgeyBwYXJhbXMubGFuZyA9IGxhbmc7IH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldCh0aGlzLmludGVybmFsSWQuaWQsIHRoaXMuaW50ZXJuYWxJZC51cmwsIHBhcmFtcykuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXQgPSBkYXRhc2V0O1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIH0gZnJvbSAnLi4vbGFiZWwtbWFwcGVyL2xhYmVsLW1hcHBlci5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZmlsZUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9wcm9maWxlLWVudHJ5L3Byb2ZpbGUtZW50cnkuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5L2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL2ZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5L2ZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgfSBmcm9tICcuL3RpbWVzZXJpZXMvc2ltcGxlLXRpbWVzZXJpZXMtZW50cnkvc2ltcGxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFJlZmVyZW5jZVZhbHVlQ29sb3JDYWNoZSxcbiAgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuL3RpbWVzZXJpZXMvdGltZXNlcmllcy1lbnRyeS90aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFqZWN0b3J5RW50cnlDb21wb25lbnQgfSBmcm9tICcuL3RyYWplY3RvcnktZW50cnkvdHJhamVjdG9yeS1lbnRyeS5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxuICBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgUHJvZmlsZUVudHJ5Q29tcG9uZW50LFxuICBUcmFqZWN0b3J5RW50cnlDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEhlbGdvbGFuZENvcmVNb2R1bGUsXG4gICAgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmREYXRhc2V0bGlzdE1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEl0ZXJhYmxlRGlmZmVycywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICBEYXRhc2V0T3B0aW9ucyxcbiAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgRGF0YXNldFRhYmxlRGF0YSxcbiAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gIFRpbWUsXG4gIFRpbWVzZXJpZXMsXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWRhdGFzZXQtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDx0YWJsZSAqbmdJZj1cInJlYWR5XCI+XG4gIDx0aGVhZD5cbiAgICA8dHI+XG4gICAgICA8dGggKGNsaWNrKT1cInNvcnQoJGV2ZW50KVwiIFthdHRyLmRhdGEtY29sdW1uLWlkXT1cIidkYXRldGltZSdcIiBjbGFzcz1cInNvcnRlZC1hc2NcIj5cbiAgICAgICAgWmVpdFxuICAgICAgPC90aD5cbiAgICAgIDx0aCAqbmdGb3I9XCJsZXQgc2VyaWVzIG9mIHRoaXMudGltZXNlcmllc0FycmF5OyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cInNvcnQoJGV2ZW50KVwiIFthdHRyLmRhdGEtY29sdW1uLWlkXT1cImlcIiBbbmdTdHlsZV09XCJ7ICdib3JkZXItY29sb3InOiBwcmVwYXJlZENvbG9yc1tpXSB9XCI+XG4gICAgICAgIHt7c2VyaWVzPy5sYWJlbH19IFt7e3Nlcmllcz8udW9tfX1dXG4gICAgICA8L3RoPlxuICAgIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keT5cbiAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiB0aGlzLnByZXBhcmVkRGF0YVwiPlxuICAgICAgPHRkPnt7cm93LmRhdGV0aW1lIHwgZGF0ZTogJ3Nob3J0J319PC90ZD5cbiAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgdmFsdWUgb2Ygcm93LnZhbHVlc1wiPnt7dmFsdWV9fTwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7ZmxleDoxO292ZXJmbG93LXk6c2Nyb2xsO292ZXJmbG93LXg6aGlkZGVufTpob3N0IHRib2R5LDpob3N0IHRoZWFkIHRye2Rpc3BsYXk6dGFibGU7dGFibGUtbGF5b3V0OmZpeGVkO3dpZHRoOjEwMCV9Omhvc3QgdGFibGV7ZGlzcGxheTpibG9jaztib3JkZXItY29sbGFwc2U6c2VwYXJhdGU7Ym9yZGVyLXNwYWNpbmc6MCAxcHh9Omhvc3QgdGhlYWR7ZGlzcGxheTpibG9jaztwb3NpdGlvbjotd2Via2l0LXN0aWNreTtwb3NpdGlvbjpzdGlja3k7dG9wOjA7Ym9yZGVyLXNwYWNpbmc6MH06aG9zdCB0cjpudGgtY2hpbGQoMm4pe2JhY2tncm91bmQtY29sb3I6I2VlZX06aG9zdCB0aHtiYWNrZ3JvdW5kLWNvbG9yOiNhOWE5YTk7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbS13aWR0aDo3cHg7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmR9Omhvc3QgdGg6Zmlyc3QtY2hpbGR7Ym9yZGVyLWJvdHRvbS1jb2xvcjojYTlhOWE5fTpob3N0IHRoOmZpcnN0LWNoaWxkLnNvcnRlZC1hc2MsOmhvc3QgdGg6Zmlyc3QtY2hpbGQuc29ydGVkLWRlc2N7Ym9yZGVyLWJvdHRvbS1jb2xvcjojNTU1fTpob3N0IHRoLnNvcnRlZC1hc2MsOmhvc3QgdGguc29ydGVkLWRlc2N7YmFja2dyb3VuZC1jb2xvcjojNTU1O2NvbG9yOiNmZmZ9Omhvc3QgdGguc29ydGVkLWFzYzphZnRlcntjb250ZW50OlwiXFxcXDI1QjRcIjtmbG9hdDpyaWdodH06aG9zdCB0aC5zb3J0ZWQtZGVzYzphZnRlcntjb250ZW50OlwiXFxcXDI1QkVcIjtmbG9hdDpyaWdodH06aG9zdCB0ZHt3aGl0ZS1zcGFjZTpub3dyYXA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgZ3JheX06aG9zdCB0ZCw6aG9zdCB0aHtwYWRkaW5nOjVweCAxMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFzZXRUYWJsZUNvbXBvbmVudCBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIGFueT4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKlxuICAgIFRoZSBjb21wb25lbnQgZXh0ZW5kcyBEYXRhc2V0R3JhcGhDb21wb25lbnQsIGJ1dCBpbXBsZW1lbnRzIG9ubHkgcGFydHMgb2YgdGhhdCBjb21wb25lbnRzIGlucHV0cyBhbmQgb3V0cHV0cy5cbiAgICBJbXBsZW1lbnRlZDogZGF0YXNldElkcywgdGltZUludGVydmFsLCBzZWxlY3RlZERhdGFzZXRJZHMgYW5kIGRhdGFzZXRPcHRpb25zIGlucHV0czsgbm8gb3V0cHV0c1xuICAgIE5vdCBpbXBsZW1lbnRlZDogZ3JhcGhPcHRpb25zIGlucHV0OyBhbGwgb3V0cHV0cyAob25EYXRhc2V0U2VsZWN0ZWQsIG9uVGltZXNwYW5DaGFuZ2VkLCBvbk1lc3NhZ2VUaHJvd24sIG9uTG9hZGluZylcbiAgKi9cblxuICBwdWJsaWMgcHJlcGFyZWREYXRhOiBEYXRhc2V0VGFibGVEYXRhW10gPSBBcnJheSgpO1xuICBwdWJsaWMgcHJlcGFyZWRDb2xvcnM6IHN0cmluZ1tdID0gQXJyYXkoKTtcbiAgcHVibGljIHJlYWR5ID0gZmFsc2U7XG5cbiAgcHVibGljIHRpbWVzZXJpZXNBcnJheTogVGltZXNlcmllc1tdID0gbmV3IEFycmF5KCk7XG4gIHByaXZhdGUgYWRkaXRpb25hbFN0eWxlc2hlZXQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZWRJZHNTdHlsZXNoZWV0Jyk7XG4gICAgaWYgKCF0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0KSB7XG4gICAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaWQgPSAnc2VsZWN0ZWRJZHNTdHlsZXNoZWV0JztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCk7XG4gICAgfVxuICB9XG5cbiAgLyogY2FsbGVkIHdoZW4gdXNlciBjbGlja3Mgb24gdGFibGUgaGVhZGVycyAqL1xuICBwdWJsaWMgc29ydChldmVudDogYW55KSB7XG4gICAgLy8gY2FuIGJlICdkYXRldGltZScgb3IgYW4gaW50ZWdlciBpbmRpY2F0aW5nIHRoZSBpbmRleCBvZiB0aGUgY29sdW1uIGluIHRoZSB2YWx1ZXMgYXJyYXlcbiAgICBjb25zdCBieSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbklkO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NvcnRlZC1hc2MnKSA/ICdkZXNjJyA6ICdhc2MnO1xuICAgIGNvbnN0IGRpcmVjdGlvbk51bWJlciA9IChkaXJlY3Rpb24gPT09ICdhc2MnID8gMSA6IC0xKTtcblxuICAgIC8vIHNldCBDU1MgY2xhc3Nlc1xuICAgIEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkOiBFbGVtZW50KSA9PiBjaGlsZC5jbGFzc05hbWUgPSAnJyk7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIChldmVudC50YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnc29ydGVkLWFzYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ3NvcnRlZC1kZXNjJyk7XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGNvcnJlY3QgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHNvcnQgbWV0aG9kXG4gICAgbGV0IHNvcnRDYWxsYmFjaztcbiAgICBpZiAoYnkgPT09ICdkYXRldGltZScpIHtcbiAgICAgIHNvcnRDYWxsYmFjayA9IChlMTogYW55LCBlMjogYW55KSA9PiBkaXJlY3Rpb25OdW1iZXIgKiAoZTEuZGF0ZXRpbWUgLSBlMi5kYXRldGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoYnksIDEwKTtcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgc2FtZSBhcyBhYm92ZSwgYnV0IHRha2UgY2FyZSBvZiAndW5kZWZpbmVkJyB2YWx1ZXNcbiAgICAgIHNvcnRDYWxsYmFjayA9IChlMTogYW55LCBlMjogYW55KSA9PlxuICAgICAgICAoZTEudmFsdWVzW2luZGV4XSA9PT0gdW5kZWZpbmVkID8gMSA6XG4gICAgICAgICAgKGUyLnZhbHVlc1tpbmRleF0gPT09IHVuZGVmaW5lZCA/IC0xIDpcbiAgICAgICAgICAgIChkaXJlY3Rpb25OdW1iZXIgKiAoZTEudmFsdWVzW2luZGV4XSAtIGUyLnZhbHVlc1tpbmRleF0pKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBkbyB0aGUgc29ydFxuICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuc29ydChzb3J0Q2FsbGJhY2spO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7IH1cblxuICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlbG9hZCBkYXRhIGF0ICcgKyBuZXcgRGF0ZSgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBhbnkpIHtcbiAgICAvLyBvbmx5IGluY2x1ZGVkIGJlY2F1c2UgaXQncyByZXF1aXJlZCBieSBhYnN0cmFjdCBwYXJlbnQgY2xhc3MgKHdvdWxkbid0IGNvbXBpbGUgd2l0aG91dClcbiAgICAvLyBubyBwb2ludCBpbiBpbXBsZW1lbnRpbmcgdGhpcyBtZXRob2QgaW4gYSBub24tZ3JhcGhpbmcgY29tcG9uZW50XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBoZWxwZXIgbWV0aG9kXG4gICAgcmV0dXJuIHRoaXMuZGF0YXNldElkcy5pbmRleE9mKGludGVybmFsSWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gcXVpdGUgZmFpcmx5IHRlc3RlZFxuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwuc3BsaXQoJ1xcclxcbicpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgIHJ1bGVzW2luZGV4XSA9ICd0ZDpudGgtY2hpbGQoJyArIChpbmRleCArIDIpICsgJykge2ZvbnQtd2VpZ2h0OiBib2xkfSc7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgPSBydWxlcy5qb2luKCdcXHJcXG4nKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgIC8vIGZhaXJseSB0ZXN0ZWRcbiAgICBjb25zdCBydWxlcyA9IHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICBydWxlc1tpbmRleF0gPSAnJztcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTCA9IHJ1bGVzLmpvaW4oJ1xcclxcbicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKSB7XG4gICAgLy8gdGhlIGVhc2llc3QgbWV0aG9kOiBkZWxldGUgZXZlcnl0aGluZyBhbmQgYnVpbGQgcHJlcGFyZWREYXRhIGZyb20gc2NyYXRjaC5cbiAgICB0aGlzLnByZXBhcmVkRGF0YSA9IFtdO1xuICAgIHRoaXMudGltZXNlcmllc0FycmF5LmZvckVhY2goKHRpbWVzZXJpZXMpID0+IHRoaXMubG9hZFRzRGF0YSh0aW1lc2VyaWVzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBmYWlybHkgdGVzdGVkXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG5cbiAgICAvLyByZW1vdmUgZW50cmllcyBvZiB0aGlzIGRhdGFzZXQgaW4gZWFjaCBkYXRldGltZSdzIGB2YWx1ZXNgIGFycmF5c1xuICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGUpID0+IGUudmFsdWVzLnNwbGljZShpbmRleCwgMSkpO1xuICAgIC8vIGlmIGEgZGF0ZXRpbWUgYmVjYW1lIGNvbXBsZXRlbHkgZW1wdHkgKGkuZS4gdGhlcmUncyBvbmx5IGB1bmRlZmluZWRgcyBpbiB0aGUgYHZhbHVlc2AgYXJyYXksIGRlbGV0ZSB0aGlzIGRhdGV0aW1lKVxuICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlKSA9PiBlLnZhbHVlcy5yZWR1Y2UoKGEsIGMpID0+IGEgfHwgYywgdW5kZWZpbmVkKSAhPT0gdW5kZWZpbmVkKTtcblxuICAgIHRoaXMucHJlcGFyZWRDb2xvcnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwuc3BsaXQoJ1xcclxcbicpO1xuICAgIHJ1bGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgPSBydWxlcy5qb2luKCdcXHJcXG4nKTtcblxuICAgIHRoaXMudGltZXNlcmllc0FycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50aW1lc2VyaWVzQXJyYXkubGVuZ3RoICs9IDE7ICAvLyBjcmVhdGUgbmV3IGVtcHR5IHNsb3RcbiAgICB0aGlzLnByZXBhcmVkQ29sb3JzLnB1c2goJ2RhcmtncmV5Jyk7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgKz0gJ1xcclxcbic7XG4gICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyhpbnRlcm5hbElkLCB1cmwpXG4gICAgICAuc3Vic2NyaWJlKCh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzKSA9PiB0aGlzLmFkZFRpbWVzZXJpZXModGltZXNlcmllcykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRhdGFzZXRPcHRpb25zQ2hhbmdlZChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGltZXNlcmllc0FycmF5LnNvbWUoKGUpID0+IGUgIT09IHVuZGVmaW5lZCAmJiBlLmludGVybmFsSWQgPT09IGludGVybmFsSWQpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICAgIHRoaXMucHJlcGFyZWRDb2xvcnNbaW5kZXhdID0gb3B0aW9ucy5jb2xvcjtcbiAgICAgIC8vIFRPRE8tQ0Y6IFBhZ2UgaXNuJ3QgcmVmcmVzaGVkIGluc3RhbnRseSwgYnV0IG9ubHkgYWZ0ZXIgdGhlIG5leHQgc29ydCAob3IgcG9zc2libGUgb3RoZXIgYWN0aW9ucyBhcyB3ZWxsKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAvLyBUT0RPLUNGOiBuZWVkZWQ/Pz8/IHByb2JhYmx5IG5vdFxuICB9XG5cbiAgcHJpdmF0ZSBhZGRUaW1lc2VyaWVzKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXMpIHtcbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheVt0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQodGltZXNlcmllcy5pbnRlcm5hbElkKV0gPSB0aW1lc2VyaWVzO1xuICAgIHRoaXMubG9hZFRzRGF0YSh0aW1lc2VyaWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFRzRGF0YSh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzKSB7XG4gICAgaWYgKHRoaXMudGltZXNwYW4pIHtcbiAgICAgIC8vIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgIHRoaXMuYXBpLmdldFRzRGF0YTxbbnVtYmVyLCBudW1iZXJdPih0aW1lc2VyaWVzLmlkLCB0aW1lc2VyaWVzLnVybCwgdGhpcy50aW1lc3BhbiwgeyBmb3JtYXQ6ICdmbG90JyB9KVxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAvLyBicmluZyByZXN1bHQgaW50byBBcnJheTxEYXRhc2V0VGFibGVEYXRhPiBmb3JtYXQgYW5kIHBhc3MgdG8gcHJlcGFyZURhdGFcbiAgICAgICAgICAvLyBjb252ZW50aW9uIGZvciBsYXlvdXQgb2YgbmV3ZGF0YSBhcmd1bWVudDogc2VlIDMtbGluZS1jb21tZW50IGluIHByZXBhcmVEYXRhIGZ1bmN0aW9uXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgICAgICB0aGlzLnByZXBhcmVEYXRhKHRpbWVzZXJpZXMsIHJlc3VsdC52YWx1ZXMubWFwKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhID0gbmV3IEFycmF5KHRoaXMuZGF0YXNldElkcy5sZW5ndGgpLmZpbGwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGFbaW5kZXhdID0gZVsxXTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGV0aW1lOiBlWzBdLCB2YWx1ZXM6IGEgfTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZURhdGEodGltZXNlcmllczogVGltZXNlcmllcywgbmV3ZGF0YTogRGF0YXNldFRhYmxlRGF0YVtdKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcblxuICAgIC8vIGlmIGRhdGFzZXRPcHRpb25zIGFyZSBwcm92aWRlZCwgdXNlIHRoZWlyIGNvbG9yIHRvIHN0eWxlIHRoZSBoZWFkZXIncyBcImNvbG9yIGJhbmRcIiAoaS5lLiB0aGUgN3B4IGJvcmRlci1ib3R0b20gb2YgdGgpXG4gICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgIHRoaXMucHJlcGFyZWRDb2xvcnNbaW5kZXhdID0gZGF0YXNldE9wdGlvbnMuY29sb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdoZW4gbm8gY29sb3IgaXMgc3BlY2lmaWVkOiBtYWtlIGJvcmRlciB0cmFuc3BhcmVudCBzbyB0aGUgaGVhZGVyJ3MgYmFja2dyb3VuZCBjb2xvciBpcyB1c2VkIGZvciB0aGUgY29sb3IgYmFuZCwgdG9vXG4gICAgICB0aGlzLnByZXBhcmVkQ29sb3JzW2luZGV4XSA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZih0aW1lc2VyaWVzLmludGVybmFsSWQpICE9PSAtMSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgfVxuXG4gICAgLy8gYG5ld2RhdGFgIGlzIGV4cGVjdGVkIGluIGV4YWN0bHkgdGhlIHNhbWUgZm9ybWF0IGBwcmVwYXJlZERhdGFgIHdvdWxkIGxvb2sgbGlrZSBpZiB0aGF0IHRpbWVzZXJpZXMgd2FzIHRoZSBvbmx5IG9uZVxuICAgIC8vIHRvIGFjdHVhbGx5IGhhdmUgZGF0YSAoaS5lLiBgdmFsdWVzYCBoYXMgdGhlIGxlbmd0aCBvZiB0aW1lc2VyaWVzQXJyYXksIGJ1dCBhbGwgc2xvdHMgYXJlIGB1bmRlZmluZWRgLCBleGNlcHQgZm9yXG4gICAgLy8gdGhlIHNsb3QgdGhhdCBjb3JyZXNwb25kcyB0byB0aGF0IHRpbWVzZXJpZXMpXG5cbiAgICAvLyBgdGltZXNlcmllc2AgaXMgZmlyc3QgdGltZXNlcmllcyBhZGRlZCAtPiBubyBvdGhlciBgcHJlcGFyZWREYXRhYCB0byBtZXJnZSB3aXRoXG4gICAgaWYgKHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gc2V0IG5ld2RhdGEgYXMgcHJlcGFyZWREYXRhIChhcyBwZXIgYWJvdmUpXG4gICAgICB0aGlzLnByZXBhcmVkRGF0YSA9IG5ld2RhdGE7XG5cbiAgICAgIC8vIGB0aW1lc2VyaWVzYCBpcyBub3QgdGhlIGZpcnN0IHRpbWVzZXJpZXMgYWRkZWQgLT4gd2UgaGF2ZSB0byBtZXJnZSBgbmV3ZGF0YWAgaW50byB0aGUgZXhpc3RpbmcgYHByZXBhcmVkRGF0YWBcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGkgPSAwOyAgLy8gbG9vcCB2YXJpYWJsZSBmb3IgYHByZXBhcmVkRGF0YWBcbiAgICAgIGxldCBqID0gMDsgIC8vIGxvb3AgdmFyaWFibGUgZm9yIGBuZXdkYXRhYFxuXG4gICAgICAvLyBnbyB0aHJvdWdoIGFsbCBkYXRhIHBvaW50cyBpbiBgbmV3ZGF0YWBcbiAgICAgIHdoaWxlIChqIDwgbmV3ZGF0YS5sZW5ndGgpIHtcblxuICAgICAgICAvLyB0aW1lc3RhbXBzIG1hdGNoXG4gICAgICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YVtpXSAmJiB0aGlzLnByZXBhcmVkRGF0YVtpXS5kYXRldGltZSA9PT0gbmV3ZGF0YVtqXS5kYXRldGltZSkge1xuICAgICAgICAgIC8vIGp1c3QgYWRkIGBuZXdkYXRhYCdzIHZhbHVlIHRvIHRoZSBleGlzdGluZyBgdmFsdWVzYCBhcnJheSBpbiBgcHJlcGFyZWREYXRhYFxuICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2ldLnZhbHVlc1tpbmRleF0gPSBuZXdkYXRhW2pdLnZhbHVlc1tpbmRleF07XG4gICAgICAgICAgLy8gaW5jcmVtZW50IGJvdGhcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgaisrO1xuXG4gICAgICAgICAgLy8gYG5ld2RhdGFgIGlzIGFoZWFkIG9mIGBwcmVwYXJlZERhdGFgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmVwYXJlZERhdGFbaV0gJiYgdGhpcy5wcmVwYXJlZERhdGFbaV0uZGF0ZXRpbWUgPCBuZXdkYXRhW2pdLmRhdGV0aW1lKSB7XG4gICAgICAgICAgLy8gZG8gbm90aGluZyBiZWNhdXNlIHRoZXJlJ3MgYWxyZWFkeSBhbiB1bmRlZmluZWQgdGhlcmVcbiAgICAgICAgICAvLyBnaXZlIHByZXBhcmVkRGF0YSB0aGUgY2hhbmNlIHRvIGNhdGNoIHVwIHdpdGggbmV3ZGF0YVxuICAgICAgICAgIGkrKztcblxuICAgICAgICAgIC8vIGBwcmVwYXJlZERhdGFgIGlzIGFoZWFkIG9mIGBuZXdkYXRhYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoZSBjdXJyZW50IGBuZXdkYXRhYCBpcyB0aGUgZmlyc3QgZGF0YXNldCB0aGF0IGhhcyB0aGlzIGRhdGV0aW1lIC0+IGFkZCBpdCB0byB0aGUgcHJlcGFyZWREYXRhIGFycmF5XG4gICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKGksIDAsIG5ld2RhdGFbal0pO1xuICAgICAgICAgIC8vIGdpdmUgbmV3ZGF0YSB0aGUgY2hhbmNlIHRvIGNhdGNoIHVwIHdpdGggcHJlcGFyZWREYXRhXG4gICAgICAgICAgaisrO1xuICAgICAgICAgIC8vIGJ1dCBwcmVwYXJlZERhdGEgaXMgMSBsb25nZXIgbm93LCB0b29cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlYWR5ID0gdGhpcy50aW1lc2VyaWVzQXJyYXkuZXZlcnkoKGUpID0+IGUgIT09IHVuZGVmaW5lZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgRGF0YXNldFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhc2V0LXRhYmxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIERhdGFzZXRUYWJsZUNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICAgICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEYXRhc2V0VGFibGVDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRGF0YXNldFRhYmxlTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIklkQ2FjaGUiLCJPYnNlcnZhYmxlIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJTZXR0aW5nc1NlcnZpY2UiLCJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJQbGF0Zm9ybVR5cGVzIiwiVGltZXNwYW4iLCJEYXRhc2V0QXBpSW50ZXJmYWNlIiwiSW50ZXJuYWxJZEhhbmRsZXIiLCJUcmFuc2xhdGVTZXJ2aWNlIiwiRGF0YXNldCIsIlRpbWVzZXJpZXMiLCJUaW1lIiwiVmlld0VuY2Fwc3VsYXRpb24iLCJDb2xvclNlcnZpY2UiLCJUcmFuc2xhdGVNb2R1bGUiLCJIZWxnb2xhbmRDb3JlTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJJdGVyYWJsZURpZmZlcnMiLCJEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFhSSw0QkFDYyxVQUFzQixFQUN0QixZQUF1QztZQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1lBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjt5QkFKcEIsSUFBSUEsY0FBTyxFQUFFO1NBS3pDOzs7OztRQUVFLDJDQUFjOzs7O3NCQUFDLEtBQWE7O2dCQUMvQixPQUFPLElBQUlDLHFCQUFVLENBQVMsVUFBQyxRQUEwQjtvQkFDckQsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFO3dCQUM5QyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDdEM7eUJBQU07O3dCQUNILElBQU0sS0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hDLElBQUksS0FBRyxFQUFFOzRCQUNMLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBRyxDQUFDLEVBQUU7Z0NBQ3JCLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUM7NkJBQ3BEO2lDQUFNOztnQ0FDSCxJQUFNLFFBQVEsR0FDVixLQUFJLENBQUMs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