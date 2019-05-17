import { HttpClient } from '@angular/common/http';
import { Injectable, Component, Input, NgModule, EventEmitter, Output, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { IdCache, SettingsService, DatasetApiInterface, InternalIdHandler, PlatformTypes, Timespan, Dataset, Timeseries, Time, ColorService, HelgolandCoreModule, DatasetPresenterComponent } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LabelMapperService {
    /**
     * @param {?} httpClient
     * @param {?} settingsSrvc
     */
    constructor(httpClient, settingsSrvc) {
        this.httpClient = httpClient;
        this.settingsSrvc = settingsSrvc;
        this.cache = new IdCache();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    getMappedLabel(label) {
        return new Observable((observer) => {
            if (!this.settingsSrvc.getSettings().solveLabels) {
                this.confirmLabel(observer, label);
            }
            else {
                /** @type {?} */
                const url = this.findUrl(label);
                if (url) {
                    if (this.cache.has(url)) {
                        this.confirmLabel(observer, this.cache.get(url));
                    }
                    else {
                        /** @type {?} */
                        const labelUrl = this.settingsSrvc.getSettings().proxyUrl ? this.settingsSrvc.getSettings().proxyUrl + url : url;
                        this.httpClient.get(labelUrl, { responseType: 'text' }).subscribe((res) => {
                            try {
                                /** @type {?} */
                                const xml = $.parseXML(res);
                                label = label.replace(url, $(xml).find('prefLabel').text());
                            }
                            catch (error) {
                                // currently do nothing and use old label
                            }
                            this.cache.set(url, label);
                            this.confirmLabel(observer, label);
                        }, (error) => {
                            /** @type {?} */
                            const resolvedLabel = label.substring(label.lastIndexOf('/') + 1, label.length);
                            this.cache.set(url, resolvedLabel);
                            this.confirmLabel(observer, resolvedLabel);
                        });
                    }
                }
                else {
                    this.confirmLabel(observer, label);
                }
            }
        });
    }
    /**
     * @param {?} observer
     * @param {?} label
     * @return {?}
     */
    confirmLabel(observer, label) {
        observer.next(label);
        observer.complete();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    findUrl(label) {
        /** @type {?} */
        const source = (label || '').toString();
        /** @type {?} */
        const regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?&\/\/=]+)/g;
        /** @type {?} */
        const matchArray = regexToken.exec(source);
        if (matchArray !== null) {
            return matchArray[0];
        }
        return null;
    }
}
LabelMapperService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LabelMapperService.ctorParameters = () => [
    { type: HttpClient },
    { type: SettingsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LabelMapperComponent {
    /**
     * @param {?} labelMapperSrvc
     */
    constructor(labelMapperSrvc) {
        this.labelMapperSrvc = labelMapperSrvc;
        this.loading = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["label"]) {
            this.labelMapperSrvc.getMappedLabel(this.label)
                .subscribe((label) => {
                this.determinedLabel = label;
                this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    }
}
LabelMapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-label-mapper',
                template: `<span *ngIf="determinedLabel">{{determinedLabel}}</span>
<span *ngIf="loading">
  <span class="glyphicon glyphicon-refresh icon-spin"></span>
  <span> loading label ...</span>
</span>
`
            },] },
];
/** @nocollapse */
LabelMapperComponent.ctorParameters = () => [
    { type: LabelMapperService }
];
LabelMapperComponent.propDecorators = {
    label: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HelgolandLabelMapperModule {
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
class ListEntryComponent {
    /**
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(internalIdHandler, translateSrvc) {
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onDeleteDataset = new EventEmitter();
        this.onSelectDataset = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.datasetId) {
            this.internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
            this.loadDataset(this.translateSrvc.currentLang);
        }
        this.langChangeSubscription = this.translateSrvc.onLangChange.subscribe((langChangeEvent) => this.onLanguageChanged(langChangeEvent));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.langChangeSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    removeDataset() {
        this.onDeleteDataset.emit(true);
    }
    /**
     * @return {?}
     */
    toggleSelection() {
        this.selected = !this.selected;
        this.onSelectDataset.emit(this.selected);
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) {
        if (this.internalId) {
            this.loadDataset(langChangeEvent.lang);
        }
    }
}
ListEntryComponent.propDecorators = {
    datasetId: [{ type: Input }],
    selected: [{ type: Input }],
    onDeleteDataset: [{ type: Output }],
    onSelectDataset: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ProfileEntryComponent extends ListEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(api, internalIdHandler, translateSrvc) {
        super(internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onUpdateOptions = new EventEmitter();
        this.onDeleteDatasetOptions = new EventEmitter();
        this.onEditOptions = new EventEmitter();
        this.onOpenInCombiView = new EventEmitter();
        this.onShowGeometry = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    removeDatasetOptions(options) {
        this.onDeleteDatasetOptions.emit(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    editDatasetOptions(options) {
        this.onEditOptions.emit(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    toggleVisibility(options) {
        options.visible = !options.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    }
    /**
     * @return {?}
     */
    isMobile() {
        if (this.dataset) {
            return this.dataset.platformType === PlatformTypes.mobileInsitu;
        }
        return false;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    openInCombiView(option) {
        this.onOpenInCombiView.emit(option);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    showGeometry(option) {
        /** @type {?} */
        const internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
        if (this.isMobile()) {
            /** @type {?} */
            const timespan = new Timespan(option.timestamp);
            this.api.getData(internalId.id, internalId.url, timespan).subscribe((result) => {
                if (result.values.length === 1) {
                    this.onShowGeometry.emit(result.values[0].geometry);
                }
            });
        }
        else {
            this.api.getPlatform(this.dataset.parameters.platform.id, internalId.url).subscribe((platform) => {
                this.onShowGeometry.emit(platform.geometry);
            });
        }
    }
    /**
     * @param {?=} lang
     * @return {?}
     */
    loadDataset(lang) {
        /** @type {?} */
        const params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getDataset(this.internalId.id, this.internalId.url, params).subscribe((dataset) => {
            this.dataset = dataset;
            this.loading = false;
        });
    }
}
ProfileEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-profile-entry',
                template: `<div class="legendItem" style="position: relative;" [ngClass]="{'selected': selected}" (click)="toggleSelection()">
  <div class="legendItemheader">
    <div class="legendItemLabel">
      <n52-label-mapper label="{{dataset?.parameters.platform.label}}"></n52-label-mapper>
    </div>
    <div class="small">
      <n52-label-mapper label="{{dataset?.parameters.phenomenon.label}}"></n52-label-mapper>
      <span *ngIf="dataset?.uom">[
        <n52-label-mapper label="{{dataset.uom}}"></n52-label-mapper>]</span>
    </div>
    <div class="small">
      <n52-label-mapper label="{{dataset?.parameters.procedure.label}}"></n52-label-mapper>
    </div>
    <div class="small" *ngIf="dataset?.parameters.category.label != dataset?.parameters.phenomenon.label">
      <n52-label-mapper label="{{dataset?.parameters.category.label}}"></n52-label-mapper>
    </div>
  </div>
  <div *ngFor="let item of datasetOptions">
    <div>
      <span [ngStyle]="{'color': item.color}">{{item.timestamp | date: 'short'}}</span>
      <span class="fa" [ngClass]="{'fa-eye-slash': item.visible, 'fa-eye': !item.visible}" (click)="toggleVisibility(item); $event.stopPropagation();"
        title="{{'profiles.legend.visibility' | translate}}"></span>
      <span class="fa fa-pencil" (click)="editDatasetOptions(item); $event.stopPropagation();" [ngStyle]="{color: item.color}"
        title="{{'profiles.legend.edit-style' | translate}}"></span>
      <span class="fa fa-map-marker" (click)="showGeometry(item); $event.stopPropagation();" title="{{'profiles.legend.show-geometry' | translate}}"></span>
      <span class="fa fa-times" (click)="removeDatasetOptions(item); $event.stopPropagation();" title="{{'profiles.legend.delete-subentry' | translate}}"></span>
    </div>
    <div (click)="openInCombiView(item); $event.stopPropagation();" *ngIf="isMobile()" class="toCombiView">
      <span class="fa fa-arrow-right"></span>
      <span>{{'profiles.legend.go-to-combi-view' | translate}}</span>
    </div>
  </div>
</div>
`,
                styles: [`:host .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}:host .legendItem .small{font-size:90%;word-break:break-all}:host .legendItem.selected{padding:0;border-width:5px;border-style:solid}:host .legendItem .legendItemheader{cursor:pointer}:host .legendItem .toCombiView{cursor:pointer}:host .legendItem .fa{cursor:pointer}`]
            },] },
];
/** @nocollapse */
ProfileEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService }
];
ProfileEntryComponent.propDecorators = {
    datasetOptions: [{ type: Input }],
    onUpdateOptions: [{ type: Output }],
    onDeleteDatasetOptions: [{ type: Output }],
    onEditOptions: [{ type: Output }],
    onOpenInCombiView: [{ type: Output }],
    onShowGeometry: [{ type: Output }]
};

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
class SimpleTimeseriesEntryComponent extends ListEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(api, internalIdHandler, translateSrvc) {
        super(internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
    }
    /**
     * @param {?=} lang
     * @return {?}
     */
    loadDataset(lang) {
        /** @type {?} */
        const params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getSingleTimeseries(this.internalId.id, this.internalId.url, params)
            .subscribe((timeseries) => this.setDataset(timeseries), (error) => {
            this.api.getDataset(this.internalId.id, this.internalId.url, params).subscribe((dataset) => this.setDataset(dataset));
        });
    }
    /**
     * @param {?} timeseries
     * @return {?}
     */
    setDataset(timeseries) {
        this.dataset = timeseries;
        this.setParameters();
        this.loading = false;
    }
    /**
     * @return {?}
     */
    setParameters() {
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
    }
}
SimpleTimeseriesEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-simple-timeseries-entry',
                template: `<span>Platform: {{platformLabel}}</span>
<span>Phenomenon: {{phenomenonLabel}}</span>
<span>Procedure: {{procedureLabel}}</span>
<span>Category: {{categoryLabel}}</span>
<span>Uom: {{uom}}</span>
<button (click)="toggleSelection()">select</button>
<button (click)="removeDataset()">remove</button>`,
                styles: [``]
            },] },
];
/** @nocollapse */
SimpleTimeseriesEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends the SimpleTimeseriesEntryComponent, with the following functions:
 *  - dataset options and triggers the editation of the dataset options
 *  - triggers the show geometry event
 */
class ConfigurableTimeseriesEntryComponent extends SimpleTimeseriesEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(api, internalIdHandler, translateSrvc) {
        super(api, internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onUpdateOptions = new EventEmitter();
        this.onEditOptions = new EventEmitter();
        this.onShowGeometry = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggleVisibility() {
        this.datasetOptions.visible = !this.datasetOptions.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    }
    /**
     * @return {?}
     */
    editDatasetOptions() {
        this.onEditOptions.emit(this.datasetOptions);
    }
    /**
     * @return {?}
     */
    showGeometry() {
        if (this.dataset instanceof Timeseries) {
            this.onShowGeometry.emit(this.dataset.station.geometry);
        }
        if (this.dataset instanceof Dataset) {
            this.api.getPlatform(this.dataset.parameters.platform.id, this.dataset.url).subscribe((platform) => {
                this.onShowGeometry.emit(platform.geometry);
            });
        }
    }
}
ConfigurableTimeseriesEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-configurable-timeseries-entry',
                template: `<span>Platform: {{platformLabel}}</span>
<span>Phenomenon: {{phenomenonLabel}}</span>
<span>Procedure: {{procedureLabel}}</span>
<span>Category: {{categoryLabel}}</span>
<span>Uom: {{uom}}</span>
<button (click)="toggleSelection()">toggle selection</button>
<button (click)="removeDataset()">remove</button>
<button (click)="toggleVisibility()">toggle visibility</button>
<button (click)="editDatasetOptions()">edit Options</button>
<button (click)="showGeometry()">show Geometry</button>`,
                styles: [``]
            },] },
];
/** @nocollapse */
ConfigurableTimeseriesEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService }
];
ConfigurableTimeseriesEntryComponent.propDecorators = {
    datasetOptions: [{ type: Input }],
    highlight: [{ type: Input }],
    onUpdateOptions: [{ type: Output }],
    onEditOptions: [{ type: Output }],
    onShowGeometry: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends the ConfigurableTimeseriesEntryComponent, with the following functions:
 *  - first and latest validation
 *  - jump to first and latest value events
 */
class FirstLatestTimeseriesEntryComponent extends ConfigurableTimeseriesEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     * @param {?} timeSrvc
     */
    constructor(api, internalIdHandler, translateSrvc, timeSrvc) {
        super(api, internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.timeSrvc = timeSrvc;
        this.onSelectDate = new EventEmitter();
        this.hasData = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeInterval"]) {
            this.checkDataInTimespan();
        }
    }
    /**
     * @return {?}
     */
    jumpToFirstTimeStamp() {
        this.onSelectDate.emit(new Date(this.dataset.firstValue.timestamp));
    }
    /**
     * @return {?}
     */
    jumpToLastTimeStamp() {
        this.onSelectDate.emit(new Date(this.dataset.lastValue.timestamp));
    }
    /**
     * @return {?}
     */
    setParameters() {
        super.setParameters();
        this.firstValue = this.dataset.firstValue;
        this.lastValue = this.dataset.lastValue;
        this.checkDataInTimespan();
    }
    /**
     * @return {?}
     */
    checkDataInTimespan() {
        if (this.timeInterval && this.dataset) {
            this.hasData = this.timeSrvc.overlaps(this.timeInterval, this.dataset.firstValue.timestamp, this.dataset.lastValue.timestamp);
        }
    }
}
FirstLatestTimeseriesEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-first-latest-timeseries-entry',
                template: `<span>{{procedureLabel}} - {{platformLabel}}</span>
<span>Has Data: {{hasData}}</span>
<button *ngIf="firstValue" (click)="jumpToFirstTimeStamp()">{{firstValue.value}} - {{firstValue.timestamp | date}}</button>
<button *ngIf="lastValue" (click)="jumpToLastTimeStamp()">{{lastValue.value}} - {{lastValue.timestamp | date}}</button>`,
                styles: [``]
            },] },
];
/** @nocollapse */
FirstLatestTimeseriesEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService },
    { type: Time }
];
FirstLatestTimeseriesEntryComponent.propDecorators = {
    timeInterval: [{ type: Input }],
    onSelectDate: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ReferenceValueColorCache extends IdCache {
}
ReferenceValueColorCache.decorators = [
    { type: Injectable },
];
/**
 * Extends the FirstLatestTimeseriesEntryComponent, with the following functions:
 *  - handles the reference values of the dataset entry
 */
class TimeseriesEntryComponent extends FirstLatestTimeseriesEntryComponent {
    /**
     * @param {?} api
     * @param {?} timeSrvc
     * @param {?} internalIdHandler
     * @param {?} color
     * @param {?} refValCache
     * @param {?} translateSrvc
     */
    constructor(api, timeSrvc, internalIdHandler, color, refValCache, translateSrvc) {
        super(api, internalIdHandler, translateSrvc, timeSrvc);
        this.api = api;
        this.timeSrvc = timeSrvc;
        this.internalIdHandler = internalIdHandler;
        this.color = color;
        this.refValCache = refValCache;
        this.translateSrvc = translateSrvc;
        this.informationVisible = false;
    }
    /**
     * @return {?}
     */
    toggleInformation() {
        this.informationVisible = !this.informationVisible;
    }
    /**
     * @param {?} refValue
     * @return {?}
     */
    toggleReferenceValue(refValue) {
        /** @type {?} */
        const idx = this.datasetOptions.showReferenceValues.findIndex((entry) => entry.id === refValue.referenceValueId);
        /** @type {?} */
        const refValId = this.createRefValId(refValue.referenceValueId);
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
    }
    /**
     * @return {?}
     */
    setParameters() {
        super.setParameters();
        if (this.dataset.referenceValues) {
            this.dataset.referenceValues.forEach((e) => {
                /** @type {?} */
                const refValId = this.createRefValId(e.referenceValueId);
                /** @type {?} */
                const refValOption = this.datasetOptions.showReferenceValues.find((o) => o.id === e.referenceValueId);
                if (refValOption) {
                    this.refValCache.set(refValId, {
                        color: refValOption.color,
                        visible: true
                    });
                }
                if (!this.refValCache.has(refValId)) {
                    this.refValCache.set(refValId, {
                        color: this.color.getColor(),
                        visible: false
                    });
                }
                e.color = this.refValCache.get(refValId).color;
                e.visible = this.refValCache.get(refValId).visible;
            });
        }
    }
    /**
     * @param {?} refId
     * @return {?}
     */
    createRefValId(refId) {
        return this.dataset.url + refId;
    }
}
TimeseriesEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-timeseries-entry',
                template: `<div class="legendItem" style="position: relative;" [ngStyle]="{'border-color': datasetOptions?.color}" [ngClass]="{'selected': selected}"
  (click)="toggleSelection()">
  <div class="loading-overlay" *ngIf="loading" [ngStyle]="{'background-color': datasetOptions?.color}">
    <div class="fa fa-refresh fa-spin fa-3x fa-fw"></div>
  </div>
  <div>
    <div class="legendItemheader" [ngClass]="{'highlight': highlight}">
      <div class="legendItemLabel" [ngStyle]="{'color': datasetOptions?.color}">
        <n52-label-mapper label="{{platformLabel}}"></n52-label-mapper>
        <!-- <n52-favorite-toggler [dataset]="dataset"></n52-favorite-toggler> -->
      </div>
      <div class="noDataWarning firstLastEntry" *ngIf="!hasData">
        <div>
          <span class="fa fa-exclamation-triangle red"></span>
          <span class="small-label">Keine Daten verfügbar</span>
        </div>
        <div class="additionalLegendEntry" (click)="jumpToLastTimeStamp(); $event.stopPropagation();">
          <span class="fa fa-chevron-right"></span>
          <span class="small-label">Springe zur letzten Messung</span>
        </div>
      </div>
      <div class="small-label">
        <n52-label-mapper label="{{phenomenonLabel}}"></n52-label-mapper>
        <span *ngIf="uom">
          <span>[</span>
          <n52-label-mapper label="{{uom}}"></n52-label-mapper>
          <span>]</span>
        </span>
      </div>
      <div class="small-label">
        <n52-label-mapper label="{{procedureLabel}}"></n52-label-mapper>
      </div>
      <div class="small-label" *ngIf="categoryLabel != phenomenonLabel">
        <n52-label-mapper label="{{categoryLabel}}"></n52-label-mapper>
      </div>
    </div>
    <div class="legendicons">
      <span class="fa" [ngClass]="{'fa-chevron-down': !informationVisible, 'fa-chevron-up': informationVisible}" (click)="toggleInformation(); $event.stopPropagation();"></span>
      <span class="fa" [ngClass]="{'fa-eye-slash': datasetOptions?.visible, 'fa-eye': !datasetOptions?.visible}" (click)="toggleVisibility(); $event.stopPropagation();"></span>
      <span class="fa fa-map-marker" (click)="showGeometry(); $event.stopPropagation();"></span>
      <span class="fa fa-pencil" (click)="editDatasetOptions(); $event.stopPropagation();" [ngStyle]="{color: datasetOptions?.color}"></span>
      <span class="fa fa-times" (click)="removeDataset(); $event.stopPropagation();"></span>
    </div>
    <div class="collapseLegendEntry small-label" *ngIf="informationVisible">
      <div class="firstLastEntry additionalLegendEntry" *ngIf="firstValue" (click)="jumpToFirstTimeStamp(); $event.stopPropagation();">
        <span class="fa fa-chevron-right"></span>
        <span>Erster Wert bei</span>
        <span>{{firstValue.timestamp| date: 'short'}}</span>
        <span class="hidden-medium">({{firstValue.value}} {{uom}})</span>
      </div>
      <div class="firstLastEntry additionalLegendEntry" *ngIf="lastValue" (click)="jumpToLastTimeStamp(); $event.stopPropagation();">
        <span class="fa fa-chevron-right"></span>
        <span>Letzter Wert bei</span>
        <span>{{lastValue.timestamp| date: 'short'}}</span>
        <span class="hidden-medium">({{lastValue.value}} {{uom}})</span>
      </div>
      <div *ngIf="dataset?.referenceValues">
        <div class="additionalLegendEntry" *ngFor="let ref of dataset.referenceValues" (click)="toggleReferenceValue(ref); $event.stopPropagation();"
          [ngClass]="{'selected': ref.visible}" [ngStyle]="{color: ref.color}">
          <span class="fa fa-chevron-right"></span>
          <span>{{ref.label}}</span>
        </div>
      </div>
      <!-- <div class="additionalLegendEntry" ng-click="$event.stopPropagation(); createExportCsv(timeseries)">
                <span class="glyphicon glyphicon-download"></span>
                <span translate="export.label"></span>
            </div> -->
      <!-- <div class="additionalLegendEntry">
                <swc-procedure-metadata timeseries='timeseries'></swc-procedure-metadata>
                <swc-timeseries-raw-data-output timeseries='timeseries'></swc-timeseries-raw-data-output>
                <swc-sos-url timeseries='timeseries'></swc-sos-url>
            </div> -->
    </div>
  </div>
</div>`,
                styles: [`.geometryViewerModal .modal-body{height:50vh}n52-timeseries-entry .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}n52-timeseries-entry .legendItem .small-label{font-size:90%;word-break:break-all}n52-timeseries-entry .legendItem.selected{padding:0;border-width:5px;border-style:solid}n52-timeseries-entry .legendItem .legendItemheader{cursor:pointer}n52-timeseries-entry .legendItem .legendItemheader.highlight{font-weight:700}n52-timeseries-entry .legendItem .legendicons span{margin:0 4%;font-size:150%}n52-timeseries-entry .legendItem .legendicons span:hover{cursor:pointer}n52-timeseries-entry .legendItem .legendicons .delete{z-index:5}n52-timeseries-entry .legendItem .noDataWarning{border:2px solid red;border-radius:5px;padding:3px}n52-timeseries-entry .legendItem .noDataWarning .red{color:red}n52-timeseries-entry .legendItem .additionalLegendEntry:hover{cursor:pointer}n52-timeseries-entry .legendItem .additionalLegendEntry.selected{font-weight:bolder}n52-timeseries-entry .legendItem .refEntry.selected{border-style:solid;border-width:2px;border-radius:2px;margin:2px 0}n52-timeseries-entry .legendItem .loading-overlay{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.5;z-index:1;display:flex;justify-content:center;align-items:center}n52-timeseries-entry .legendItem .loading-overlay .fa-spin{color:#fff;font-size:25px;width:25px;height:25px}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
TimeseriesEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: Time },
    { type: InternalIdHandler },
    { type: ColorService },
    { type: ReferenceValueColorCache },
    { type: TranslateService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TrajectoryEntryComponent extends ListEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(api, internalIdHandler, translateSrvc) {
        super(internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onUpdateOptions = new EventEmitter();
        this.onEditOptions = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggleVisibility() {
        this.datasetOptions.visible = !this.datasetOptions.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    editDatasetOptions(options) {
        this.onEditOptions.emit(options);
    }
    /**
     * @param {?=} lang
     * @return {?}
     */
    loadDataset(lang) {
        /** @type {?} */
        const params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getDataset(this.internalId.id, this.internalId.url, params).subscribe((dataset) => {
            this.dataset = dataset;
            this.loading = false;
        });
    }
}
TrajectoryEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-trajectory-entry',
                template: `<div style="white-space: nowrap;" (click)="toggleVisibility()">
  <span>
    <a class="btn btn-light">
      <span class="fa fa-plus" [ngClass]="{'fa-eye': !datasetOptions?.visible, 'fa-eye-slash': datasetOptions?.visible}"></span>
    </a>
  </span>
  <span style="padding-left: 10px;" [ngStyle]="{'color': datasetOptions?.color}">{{dataset?.parameters.phenomenon.label}}</span>
  <span class="fa fa-pencil" (click)="editDatasetOptions(datasetOptions); $event.stopPropagation();" [ngStyle]="{color: datasetOptions?.color}"></span>
</div>`
            },] },
];
/** @nocollapse */
TrajectoryEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService }
];
TrajectoryEntryComponent.propDecorators = {
    datasetOptions: [{ type: Input }],
    onUpdateOptions: [{ type: Output }],
    onEditOptions: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const COMPONENTS = [
    TimeseriesEntryComponent,
    ConfigurableTimeseriesEntryComponent,
    SimpleTimeseriesEntryComponent,
    FirstLatestTimeseriesEntryComponent,
    ProfileEntryComponent,
    TrajectoryEntryComponent
];
class HelgolandDatasetlistModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DatasetTableComponent extends DatasetPresenterComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} api
     * @param {?} datasetIdResolver
     * @param {?} timeSrvc
     * @param {?} translateSrvc
     */
    constructor(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
        super(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc);
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.translateSrvc = translateSrvc;
        this.preparedData = Array();
        this.preparedColors = Array();
        this.ready = false;
        this.timeseriesArray = new Array();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.additionalStylesheet = document.getElementById('selectedIdsStylesheet');
        if (!this.additionalStylesheet) {
            this.additionalStylesheet = document.createElement('style');
            this.additionalStylesheet.id = 'selectedIdsStylesheet';
            document.body.appendChild(this.additionalStylesheet);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    sort(event) {
        /** @type {?} */
        const by = event.target.dataset.columnId;
        /** @type {?} */
        const direction = event.target.classList.contains('sorted-asc') ? 'desc' : 'asc';
        /** @type {?} */
        const directionNumber = (direction === 'asc' ? 1 : -1);
        // set CSS classes
        Array.from(event.target.parentElement.children).forEach((child) => child.className = '');
        if (direction === 'asc') {
            (/** @type {?} */ (event.target)).classList.add('sorted-asc');
        }
        else {
            (/** @type {?} */ (event.target)).classList.add('sorted-desc');
        }
        /** @type {?} */
        let sortCallback;
        if (by === 'datetime') {
            sortCallback = (e1, e2) => directionNumber * (e1.datetime - e2.datetime);
        }
        else {
            /** @type {?} */
            const index = parseInt(by, 10);
            // basically the same as above, but take care of 'undefined' values
            sortCallback = (e1, e2) => (e1.values[index] === undefined ? 1 :
                (e2.values[index] === undefined ? -1 :
                    (directionNumber * (e1.values[index] - e2.values[index]))));
        }
        // do the sort
        this.preparedData = this.preparedData.sort(sortCallback);
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) { }
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    reloadDataForDatasets(datasetIds) {
        // console.log('reload data at ' + new Date());
    }
    /**
     * @param {?} options
     * @return {?}
     */
    presenterOptionsChanged(options) {
        // only included because it's required by abstract parent class (wouldn't compile without)
        // no point in implementing this method in a non-graphing component
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    getIndexFromInternalId(internalId) {
        // helper method
        return this.datasetIds.indexOf(internalId);
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    setSelectedId(internalId) {
        /** @type {?} */
        const rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        const index = this.getIndexFromInternalId(internalId);
        rules[index] = 'td:nth-child(' + (index + 2) + ') {font-weight: bold}';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeSelectedId(internalId) {
        /** @type {?} */
        const rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        const index = this.getIndexFromInternalId(internalId);
        rules[index] = '';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    }
    /**
     * @return {?}
     */
    timeIntervalChanges() {
        // the easiest method: delete everything and build preparedData from scratch.
        this.preparedData = [];
        this.timeseriesArray.forEach((timeseries) => this.loadTsData(timeseries));
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeDataset(internalId) {
        /** @type {?} */
        const index = this.getIndexFromInternalId(internalId);
        // remove entries of this dataset in each datetime's `values` arrays
        this.preparedData.forEach((e) => e.values.splice(index, 1));
        // if a datetime became completely empty (i.e. there's only `undefined`s in the `values` array, delete this datetime)
        this.preparedData = this.preparedData.filter((e) => e.values.reduce((a, c) => a || c, undefined) !== undefined);
        this.preparedColors.splice(index, 1);
        /** @type {?} */
        const rules = this.additionalStylesheet.innerHTML.split('\r\n');
        rules.splice(index, 1);
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
        this.timeseriesArray.splice(index, 1);
    }
    /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    addDataset(internalId, url) {
        this.timeseriesArray.length += 1; // create new empty slot
        this.preparedColors.push('darkgrey');
        this.additionalStylesheet.innerHTML += '\r\n';
        this.api.getSingleTimeseries(internalId, url)
            .subscribe((timeseries) => this.addTimeseries(timeseries));
    }
    /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    datasetOptionsChanged(internalId, options) {
        if (this.timeseriesArray.some((e) => e !== undefined && e.internalId === internalId)) {
            /** @type {?} */
            const index = this.getIndexFromInternalId(internalId);
            this.preparedColors[index] = options.color;
            // TODO-CF: Page isn't refreshed instantly, but only after the next sort (or possible other actions as well)
        }
    }
    /**
     * @return {?}
     */
    onResize() {
        // TODO-CF: needed???? probably not
    }
    /**
     * @param {?} timeseries
     * @return {?}
     */
    addTimeseries(timeseries) {
        this.timeseriesArray[this.getIndexFromInternalId(timeseries.internalId)] = timeseries;
        this.loadTsData(timeseries);
    }
    /**
     * @param {?} timeseries
     * @return {?}
     */
    loadTsData(timeseries) {
        if (this.timespan) {
            // const datasetOptions = this.datasetOptions.get(timeseries.internalId);
            this.api.getTsData(timeseries.id, timeseries.url, this.timespan, { format: 'flot' })
                .subscribe((result) => {
                /** @type {?} */
                const index = this.getIndexFromInternalId(timeseries.internalId);
                this.prepareData(timeseries, result.values.map((e) => {
                    /** @type {?} */
                    const a = new Array(this.datasetIds.length).fill(undefined);
                    a[index] = e[1];
                    return { datetime: e[0], values: a };
                }));
            });
        }
    }
    /**
     * @param {?} timeseries
     * @param {?} newdata
     * @return {?}
     */
    prepareData(timeseries, newdata) {
        /** @type {?} */
        const index = this.getIndexFromInternalId(timeseries.internalId);
        // if datasetOptions are provided, use their color to style the header's "color band" (i.e. the 7px border-bottom of th)
        if (this.datasetOptions) {
            /** @type {?} */
            const datasetOptions = this.datasetOptions.get(timeseries.internalId);
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
            let i = 0;
            /** @type {?} */
            let j = 0; // loop variable for `newdata`
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
        this.ready = this.timeseriesArray.every((e) => e !== undefined);
    }
}
DatasetTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-dataset-table',
                template: `<table *ngIf="ready">
  <thead>
    <tr>
      <th (click)="sort($event)" [attr.data-column-id]="'datetime'" class="sorted-asc">
        Zeit
      </th>
      <th *ngFor="let series of this.timeseriesArray; let i = index" (click)="sort($event)" [attr.data-column-id]="i" [ngStyle]="{ 'border-color': preparedColors[i] }">
        {{series?.label}} [{{series?.uom}}]
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of this.preparedData">
      <td>{{row.datetime | date: 'short'}}</td>
      <td *ngFor="let value of row.values">{{value}}</td>
    </tr>
  </tbody>
</table>
`,
                styles: [`:host{flex:1;overflow-y:scroll;overflow-x:hidden}:host tbody,:host thead tr{display:table;table-layout:fixed;width:100%}:host table{display:block;border-collapse:separate;border-spacing:0 1px}:host thead{display:block;position:-webkit-sticky;position:sticky;top:0;border-spacing:0}:host tr:nth-child(2n){background-color:#eee}:host th{background-color:#a9a9a9;cursor:pointer;border-bottom-width:7px;border-bottom-style:solid;overflow-wrap:break-word}:host th:first-child{border-bottom-color:#a9a9a9}:host th:first-child.sorted-asc,:host th:first-child.sorted-desc{border-bottom-color:#555}:host th.sorted-asc,:host th.sorted-desc{background-color:#555;color:#fff}:host th.sorted-asc:after{content:"\\25B4";float:right}:host th.sorted-desc:after{content:"\\25BE";float:right}:host td{white-space:nowrap;border-bottom:1px solid gray}:host td,:host th{padding:5px 10px}`]
            },] },
];
/** @nocollapse */
DatasetTableComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: Time },
    { type: TranslateService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HelgolandDatasetTableModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandDatasetlistModule, ProfileEntryComponent, ConfigurableTimeseriesEntryComponent, FirstLatestTimeseriesEntryComponent, SimpleTimeseriesEntryComponent, ReferenceValueColorCache, TimeseriesEntryComponent, TrajectoryEntryComponent, DatasetTableComponent, HelgolandDatasetTableModule, LabelMapperService, LabelMapperComponent, HelgolandLabelMapperModule, ListEntryComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWRlcGljdGlvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvbGFiZWwtbWFwcGVyL2xhYmVsLW1hcHBlci5tb2R1bGUudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC9saXN0LWVudHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXRsaXN0L3Byb2ZpbGUtZW50cnkvcHJvZmlsZS1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uL2xpYi9kYXRhc2V0bGlzdC90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldGxpc3QvbW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi9saWIvZGF0YXNldC10YWJsZS9kYXRhc2V0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vbGliL2RhdGFzZXQtdGFibGUvbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJZENhY2hlLCBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IElkQ2FjaGU8c3RyaW5nPiA9IG5ldyBJZENhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByb3RlY3RlZCBzZXR0aW5nc1NydmM6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgICApIHsgfVxuXG4gICAgcHVibGljIGdldE1hcHBlZExhYmVsKGxhYmVsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5nc1NydmMuZ2V0U2V0dGluZ3MoKS5zb2x2ZUxhYmVscykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZmluZFVybChsYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIHRoaXMuY2FjaGUuZ2V0KHVybCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWxVcmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NTcnZjLmdldFNldHRpbmdzKCkucHJveHlVcmwgPyB0aGlzLnNldHRpbmdzU3J2Yy5nZXRTZXR0aW5ncygpLnByb3h5VXJsICsgdXJsIDogdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChsYWJlbFVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtbCA9ICQucGFyc2VYTUwocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKHVybCwgJCh4bWwpLmZpbmQoJ3ByZWZMYWJlbCcpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudGx5IGRvIG5vdGhpbmcgYW5kIHVzZSBvbGQgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbC5zdWJzdHJpbmcobGFiZWwubGFzdEluZGV4T2YoJy8nKSArIDEsIGxhYmVsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCByZXNvbHZlZExhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1MYWJlbChvYnNlcnZlciwgcmVzb2x2ZWRMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpcm1MYWJlbChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPiwgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGxhYmVsKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRVcmwobGFiZWw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAobGFiZWwgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlZ2V4VG9rZW4gPSAvKCgoZnRwfGh0dHBzPyk6XFwvXFwvKVtcXC1cXHdAOiVfXFwrLn4jPyZcXC9cXC89XSspL2c7XG4gICAgICAgIGNvbnN0IG1hdGNoQXJyYXkgPSByZWdleFRva2VuLmV4ZWMoc291cmNlKTtcbiAgICAgICAgaWYgKG1hdGNoQXJyYXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaEFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGFiZWwtbWFwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiZGV0ZXJtaW5lZExhYmVsXCI+e3tkZXRlcm1pbmVkTGFiZWx9fTwvc3Bhbj5cbjxzcGFuICpuZ0lmPVwibG9hZGluZ1wiPlxuICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVmcmVzaCBpY29uLXNwaW5cIj48L3NwYW4+XG4gIDxzcGFuPiBsb2FkaW5nIGxhYmVsIC4uLjwvc3Bhbj5cbjwvc3Bhbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBkZXRlcm1pbmVkTGFiZWw6IHN0cmluZztcblxuICAgIHB1YmxpYyBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGFiZWxNYXBwZXJTcnZjOiBMYWJlbE1hcHBlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXBwZXJTcnZjLmdldE1hcHBlZExhYmVsKHRoaXMubGFiZWwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlcm1pbmVkTGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYWJlbE1hcHBlckNvbXBvbmVudCB9IGZyb20gJy4vbGFiZWwtbWFwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL2xhYmVsLW1hcHBlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTGFiZWxNYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTGFiZWxNYXBwZXJDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTGFiZWxNYXBwZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnRlcm5hbERhdGFzZXRJZCwgSW50ZXJuYWxJZEhhbmRsZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGFic3RyYWN0IGRhdGFzZXQgZW50cnkgZm9yIGEgbGlzdCwgd2hpY2ggaGFzIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gY2FuIGJlIHNlbGVjdGVkIGFuZCBpcyBzZWxlY3RhYmxlIGludGVybmFsbHksIHdpdGggYSBjb3JyZXNwb25kaW5nIG91dHB1dCBldmVudFxuICogIC0gY2FuIGJlIGRlbGV0ZWQsIHdoaWNoIGFsc28gdHJpZ2dlcnMgYW4gb3V0cHV0IGV2ZW50XG4gKiAgLSB0cmFuc2xhdGFibGUsIHNvIGl0IHRyaWdnZXJzIHRoZSBtZXRob2RlIG9uTGFuZ3VhZ2VDaGFuZ2VkIHdoZW4gdGhlIGxhbmd1YWdlIGlzIHN3aXRjaGVkXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0RW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRGVsZXRlRGF0YXNldDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0RGF0YXNldDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGxvYWRpbmc7XG5cbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZDogSW50ZXJuYWxEYXRhc2V0SWQ7XG5cbiAgICBwcml2YXRlIGxhbmdDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRJZCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbElkID0gdGhpcy5pbnRlcm5hbElkSGFuZGxlci5yZXNvbHZlSW50ZXJuYWxJZCh0aGlzLmRhdGFzZXRJZCk7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0KHRoaXMudHJhbnNsYXRlU3J2Yy5jdXJyZW50TGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYW5nQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy50cmFuc2xhdGVTcnZjLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYW5nQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXQoKSB7XG4gICAgICAgIHRoaXMub25EZWxldGVEYXRhc2V0LmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgICB0aGlzLm9uU2VsZWN0RGF0YXNldC5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pbnRlcm5hbElkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0KGxhbmdDaGFuZ2VFdmVudC5sYW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBsb2FkRGF0YXNldChsYW5nPzogc3RyaW5nKTogdm9pZDtcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldCxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5LFxuICAgIFBhcmFtZXRlckZpbHRlcixcbiAgICBQbGF0Zm9ybVR5cGVzLFxuICAgIFRpbWVkRGF0YXNldE9wdGlvbnMsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExpc3RFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL2xpc3QtZW50cnkuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItcHJvZmlsZS1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5cbiAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1oZWFkZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbUxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wbGF0Zm9ybS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPlxuICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPHNwYW4gKm5nSWY9XCJkYXRhc2V0Py51b21cIj5bXG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0LnVvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPl08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wcm9jZWR1cmUubGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIiAqbmdJZj1cImRhdGFzZXQ/LnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWwgIT0gZGF0YXNldD8ucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhc2V0T3B0aW9uc1wiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogaXRlbS5jb2xvcn1cIj57e2l0ZW0udGltZXN0YW1wIHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogaXRlbS52aXNpYmxlLCAnZmEtZXllJzogIWl0ZW0udmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlVmlzaWJpbGl0eShpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLnZpc2liaWxpdHknIHwgdHJhbnNsYXRlfX1cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdTdHlsZV09XCJ7Y29sb3I6IGl0ZW0uY29sb3J9XCJcbiAgICAgICAgdGl0bGU9XCJ7eydwcm9maWxlcy5sZWdlbmQuZWRpdC1zdHlsZScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiB0aXRsZT1cInt7J3Byb2ZpbGVzLmxlZ2VuZC5zaG93LWdlb21ldHJ5JyB8IHRyYW5zbGF0ZX19XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0T3B0aW9ucyhpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLmRlbGV0ZS1zdWJlbnRyeScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IChjbGljayk9XCJvcGVuSW5Db21iaVZpZXcoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiAqbmdJZj1cImlzTW9iaWxlKClcIiBjbGFzcz1cInRvQ29tYmlWaWV3XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWFycm93LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPHNwYW4+e3sncHJvZmlsZXMubGVnZW5kLmdvLXRvLWNvbWJpLXZpZXcnIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAubGVnZW5kSXRlbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLmxlZ2VuZEl0ZW0gLnNtYWxse2ZvbnQtc2l6ZTo5MCU7d29yZC1icmVhazpicmVhay1hbGx9Omhvc3QgLmxlZ2VuZEl0ZW0uc2VsZWN0ZWR7cGFkZGluZzowO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkfTpob3N0IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVye2N1cnNvcjpwb2ludGVyfTpob3N0IC5sZWdlbmRJdGVtIC50b0NvbWJpVmlld3tjdXJzb3I6cG9pbnRlcn06aG9zdCAubGVnZW5kSXRlbSAuZmF7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZUVudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9uc1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkRlbGV0ZURhdGFzZXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPFRpbWVkRGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uT3BlbkluQ29tYmlWaWV3OiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TaG93R2VvbWV0cnk6IEV2ZW50RW1pdHRlcjxHZW9KU09OLkdlb0pzb25PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgZWRpdGFibGVPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zO1xuICAgIHB1YmxpYyB0ZW1wQ29sb3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZURhdGFzZXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy52aXNpYmxlID0gIW9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb2JpbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQucGxhdGZvcm1UeXBlID09PSBQbGF0Zm9ybVR5cGVzLm1vYmlsZUluc2l0dTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5JbkNvbWJpVmlldyhvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbk9wZW5JbkNvbWJpVmlldy5lbWl0KG9wdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHZW9tZXRyeShvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxJZCA9IHRoaXMuaW50ZXJuYWxJZEhhbmRsZXIucmVzb2x2ZUludGVybmFsSWQodGhpcy5kYXRhc2V0SWQpO1xuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihvcHRpb24udGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFByb2ZpbGVEYXRhRW50cnk+KGludGVybmFsSWQuaWQsIGludGVybmFsSWQudXJsLCB0aW1lc3Bhbikuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHJlc3VsdC52YWx1ZXNbMF0uZ2VvbWV0cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0UGxhdGZvcm0odGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0uaWQsIGludGVybmFsSWQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHBsYXRmb3JtLmdlb21ldHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldCwgRGF0YXNldEFwaUludGVyZmFjZSwgSURhdGFzZXQsIEludGVybmFsSWRIYW5kbGVyLCBQYXJhbWV0ZXJGaWx0ZXIsIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0RW50cnlDb21wb25lbnQgfSBmcm9tICcuLi8uLi9saXN0LWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgTGlzdEVudHJ5Q29tcG9uZW50LCB3aGljaCBoYXMgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBjYW4gYmUgc2VsZWN0ZWQgYW5kIGlzIHNlbGVjdGFibGUgaW50ZXJuYWxseSwgd2l0aCBhIGNvcnJlc3BvbmRpbmcgb3V0cHV0IGV2ZW50XG4gKiAgLSBjYW4gYmUgZGVsZXRlZCwgd2hpY2ggYWxzbyB0cmlnZ2VycyBhbiBvdXRwdXQgZXZlbnRcbiAqICAtIHRyYW5zbGF0YWJsZSwgc28gaXQgdHJpZ2dlcnMgdGhlIG1ldGhvZGUgb25MYW5ndWFnZUNoYW5nZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgc3dpdGNoZWRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXNpbXBsZS10aW1lc2VyaWVzLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj5QbGF0Zm9ybToge3twbGF0Zm9ybUxhYmVsfX08L3NwYW4+XG48c3Bhbj5QaGVub21lbm9uOiB7e3BoZW5vbWVub25MYWJlbH19PC9zcGFuPlxuPHNwYW4+UHJvY2VkdXJlOiB7e3Byb2NlZHVyZUxhYmVsfX08L3NwYW4+XG48c3Bhbj5DYXRlZ29yeToge3tjYXRlZ29yeUxhYmVsfX08L3NwYW4+XG48c3Bhbj5Vb206IHt7dW9tfX08L3NwYW4+XG48YnV0dG9uIChjbGljayk9XCJ0b2dnbGVTZWxlY3Rpb24oKVwiPnNlbGVjdDwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpXCI+cmVtb3ZlPC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIExpc3RFbnRyeUNvbXBvbmVudCB7XG5cbiAgcHVibGljIGRhdGFzZXQ6IElEYXRhc2V0O1xuXG4gIHB1YmxpYyBwbGF0Zm9ybUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBwaGVub21lbm9uTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHByb2NlZHVyZUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXRlZ29yeUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyB1b206IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9O1xuICAgIGlmIChsYW5nKSB7IHBhcmFtcy5sYW5nID0gbGFuZzsgfVxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyh0aGlzLmludGVybmFsSWQuaWQsIHRoaXMuaW50ZXJuYWxJZC51cmwsIHBhcmFtcylcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLnNldERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4gdGhpcy5zZXREYXRhc2V0KGRhdGFzZXQpKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0RGF0YXNldCh0aW1lc2VyaWVzOiBJRGF0YXNldCkge1xuICAgIHRoaXMuZGF0YXNldCA9IHRpbWVzZXJpZXM7XG4gICAgdGhpcy5zZXRQYXJhbWV0ZXJzKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVycygpIHtcbiAgICBpZiAodGhpcy5kYXRhc2V0IGluc3RhbmNlb2YgRGF0YXNldCkge1xuICAgICAgdGhpcy5wbGF0Zm9ybUxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0ubGFiZWw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFzZXQgaW5zdGFuY2VvZiBUaW1lc2VyaWVzKSB7XG4gICAgICB0aGlzLnBsYXRmb3JtTGFiZWwgPSB0aGlzLmRhdGFzZXQuc3RhdGlvbi5wcm9wZXJ0aWVzLmxhYmVsO1xuICAgIH1cbiAgICB0aGlzLnBoZW5vbWVub25MYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWw7XG4gICAgdGhpcy5wcm9jZWR1cmVMYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnByb2NlZHVyZS5sYWJlbDtcbiAgICB0aGlzLmNhdGVnb3J5TGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbDtcbiAgICB0aGlzLnVvbSA9IHRoaXMuZGF0YXNldC51b207XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBEYXRhc2V0T3B0aW9ucywgSW50ZXJuYWxJZEhhbmRsZXIsIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgfSBmcm9tICcuLi9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEV4dGVuZHMgdGhlIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCwgd2l0aCB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGRhdGFzZXQgb3B0aW9ucyBhbmQgdHJpZ2dlcnMgdGhlIGVkaXRhdGlvbiBvZiB0aGUgZGF0YXNldCBvcHRpb25zXG4gKiAgLSB0cmlnZ2VycyB0aGUgc2hvdyBnZW9tZXRyeSBldmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnknLFxuICB0ZW1wbGF0ZTogYDxzcGFuPlBsYXRmb3JtOiB7e3BsYXRmb3JtTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlBoZW5vbWVub246IHt7cGhlbm9tZW5vbkxhYmVsfX08L3NwYW4+XG48c3Bhbj5Qcm9jZWR1cmU6IHt7cHJvY2VkdXJlTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPkNhdGVnb3J5OiB7e2NhdGVnb3J5TGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlVvbToge3t1b219fTwvc3Bhbj5cbjxidXR0b24gKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+dG9nZ2xlIHNlbGVjdGlvbjwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpXCI+cmVtb3ZlPC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KClcIj50b2dnbGUgdmlzaWJpbGl0eTwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwiZWRpdERhdGFzZXRPcHRpb25zKClcIj5lZGl0IE9wdGlvbnM8L2J1dHRvbj5cbjxidXR0b24gKGNsaWNrKT1cInNob3dHZW9tZXRyeSgpXCI+c2hvdyBHZW9tZXRyeTwvYnV0dG9uPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgZXh0ZW5kcyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogRGF0YXNldE9wdGlvbnM7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGhpZ2hsaWdodDogYm9vbGVhbjtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVXBkYXRlT3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uRWRpdE9wdGlvbnM6IEV2ZW50RW1pdHRlcjxEYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblNob3dHZW9tZXRyeTogRXZlbnRFbWl0dGVyPEdlb0pTT04uR2VvSnNvbk9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGFwaSwgaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlID0gIXRoaXMuZGF0YXNldE9wdGlvbnMudmlzaWJsZTtcbiAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucygpIHtcbiAgICB0aGlzLm9uRWRpdE9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93R2VvbWV0cnkoKSB7XG4gICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgIHRoaXMub25TaG93R2VvbWV0cnkuZW1pdCh0aGlzLmRhdGFzZXQuc3RhdGlvbi5nZW9tZXRyeSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGFzZXQgaW5zdGFuY2VvZiBEYXRhc2V0KSB7XG4gICAgICB0aGlzLmFwaS5nZXRQbGF0Zm9ybSh0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5wbGF0Zm9ybS5pZCwgdGhpcy5kYXRhc2V0LnVybCkuc3Vic2NyaWJlKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgICB0aGlzLm9uU2hvd0dlb21ldHJ5LmVtaXQocGxhdGZvcm0uZ2VvbWV0cnkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIEZpcnN0TGFzdFZhbHVlLCBJbnRlcm5hbElkSGFuZGxlciwgVGltZSwgVGltZUludGVydmFsIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtcbiAgQ29uZmlndXJhYmxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuLi9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEV4dGVuZHMgdGhlIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCwgd2l0aCB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGZpcnN0IGFuZCBsYXRlc3QgdmFsaWRhdGlvblxuICogIC0ganVtcCB0byBmaXJzdCBhbmQgbGF0ZXN0IHZhbHVlIGV2ZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZmlyc3QtbGF0ZXN0LXRpbWVzZXJpZXMtZW50cnknLFxuICB0ZW1wbGF0ZTogYDxzcGFuPnt7cHJvY2VkdXJlTGFiZWx9fSAtIHt7cGxhdGZvcm1MYWJlbH19PC9zcGFuPlxuPHNwYW4+SGFzIERhdGE6IHt7aGFzRGF0YX19PC9zcGFuPlxuPGJ1dHRvbiAqbmdJZj1cImZpcnN0VmFsdWVcIiAoY2xpY2spPVwianVtcFRvRmlyc3RUaW1lU3RhbXAoKVwiPnt7Zmlyc3RWYWx1ZS52YWx1ZX19IC0ge3tmaXJzdFZhbHVlLnRpbWVzdGFtcCB8IGRhdGV9fTwvYnV0dG9uPlxuPGJ1dHRvbiAqbmdJZj1cImxhc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9MYXN0VGltZVN0YW1wKClcIj57e2xhc3RWYWx1ZS52YWx1ZX19IC0ge3tsYXN0VmFsdWUudGltZXN0YW1wIHwgZGF0ZX19PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGV4dGVuZHMgQ29uZmlndXJhYmxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblNlbGVjdERhdGU6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICBwdWJsaWMgaGFzRGF0YSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZVxuICApIHtcbiAgICBzdXBlcihhcGksIGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsKSB7XG4gICAgICB0aGlzLmNoZWNrRGF0YUluVGltZXNwYW4oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMganVtcFRvRmlyc3RUaW1lU3RhbXAoKSB7XG4gICAgdGhpcy5vblNlbGVjdERhdGUuZW1pdChuZXcgRGF0ZSh0aGlzLmRhdGFzZXQuZmlyc3RWYWx1ZS50aW1lc3RhbXApKTtcbiAgfVxuXG4gIHB1YmxpYyBqdW1wVG9MYXN0VGltZVN0YW1wKCkge1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobmV3IERhdGUodGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZS50aW1lc3RhbXApKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRQYXJhbWV0ZXJzKCkge1xuICAgIHN1cGVyLnNldFBhcmFtZXRlcnMoKTtcbiAgICB0aGlzLmZpcnN0VmFsdWUgPSB0aGlzLmRhdGFzZXQuZmlyc3RWYWx1ZTtcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IHRoaXMuZGF0YXNldC5sYXN0VmFsdWU7XG4gICAgdGhpcy5jaGVja0RhdGFJblRpbWVzcGFuKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRGF0YUluVGltZXNwYW4oKSB7XG4gICAgaWYgKHRoaXMudGltZUludGVydmFsICYmIHRoaXMuZGF0YXNldCkge1xuICAgICAgdGhpcy5oYXNEYXRhID0gdGhpcy50aW1lU3J2Yy5vdmVybGFwcyhcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwsXG4gICAgICAgIHRoaXMuZGF0YXNldC5maXJzdFZhbHVlLnRpbWVzdGFtcCxcbiAgICAgICAgdGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZS50aW1lc3RhbXBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0YWJsZSwgT25DaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlLCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBJZENhY2hlLCBJbnRlcm5hbElkSGFuZGxlciwgUmVmZXJlbmNlVmFsdWUsIFRpbWUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuLi9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlIGV4dGVuZHMgSWRDYWNoZTx7IGNvbG9yOiBzdHJpbmcsIHZpc2libGU6IGJvb2xlYW4gfT4geyB9XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsIHdpdGggdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBoYW5kbGVzIHRoZSByZWZlcmVuY2UgdmFsdWVzIG9mIHRoZSBkYXRhc2V0IGVudHJ5XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXRpbWVzZXJpZXMtZW50cnknLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIiBbbmdTdHlsZV09XCJ7J2JvcmRlci1jb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogc2VsZWN0ZWR9XCJcbiAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+XG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgPGRpdiBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBmYS0zeCBmYS1md1wiPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbWhlYWRlclwiIFtuZ0NsYXNzXT1cInsnaGlnaGxpZ2h0JzogaGlnaGxpZ2h0fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1MYWJlbFwiIFtuZ1N0eWxlXT1cInsnY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twbGF0Zm9ybUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICAgIDwhLS0gPG41Mi1mYXZvcml0ZS10b2dnbGVyIFtkYXRhc2V0XT1cImRhdGFzZXRcIj48L241Mi1mYXZvcml0ZS10b2dnbGVyPiAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vRGF0YVdhcm5pbmcgZmlyc3RMYXN0RW50cnlcIiAqbmdJZj1cIiFoYXNEYXRhXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSByZWRcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbC1sYWJlbFwiPktlaW5lIERhdGVuIHZlcmbDg8K8Z2Jhcjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAoY2xpY2spPVwianVtcFRvTGFzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGwtbGFiZWxcIj5TcHJpbmdlIHp1ciBsZXR6dGVuIE1lc3N1bmc8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3BoZW5vbWVub25MYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInVvbVwiPlxuICAgICAgICAgIDxzcGFuPls8L3NwYW4+XG4gICAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3VvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgICAgIDxzcGFuPl08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twcm9jZWR1cmVMYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIiAqbmdJZj1cImNhdGVnb3J5TGFiZWwgIT0gcGhlbm9tZW5vbkxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tjYXRlZ29yeUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kaWNvbnNcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJ7J2ZhLWNoZXZyb24tZG93bic6ICFpbmZvcm1hdGlvblZpc2libGUsICdmYS1jaGV2cm9uLXVwJzogaW5mb3JtYXRpb25WaXNpYmxlfVwiIChjbGljayk9XCJ0b2dnbGVJbmZvcm1hdGlvbigpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogZGF0YXNldE9wdGlvbnM/LnZpc2libGUsICdmYS1leWUnOiAhZGF0YXNldE9wdGlvbnM/LnZpc2libGV9XCIgKGNsaWNrKT1cInRvZ2dsZVZpc2liaWxpdHkoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgKGNsaWNrKT1cImVkaXREYXRhc2V0T3B0aW9ucygpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nU3R5bGVdPVwie2NvbG9yOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlTGVnZW5kRW50cnkgc21hbGwtbGFiZWxcIiAqbmdJZj1cImluZm9ybWF0aW9uVmlzaWJsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGFzdEVudHJ5IGFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0lmPVwiZmlyc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9GaXJzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4+RXJzdGVyIFdlcnQgYmVpPC9zcGFuPlxuICAgICAgICA8c3Bhbj57e2ZpcnN0VmFsdWUudGltZXN0YW1wfCBkYXRlOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1lZGl1bVwiPih7e2ZpcnN0VmFsdWUudmFsdWV9fSB7e3VvbX19KTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGFzdEVudHJ5IGFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0lmPVwibGFzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuPkxldHp0ZXIgV2VydCBiZWk8L3NwYW4+XG4gICAgICAgIDxzcGFuPnt7bGFzdFZhbHVlLnRpbWVzdGFtcHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZWRpdW1cIj4oe3tsYXN0VmFsdWUudmFsdWV9fSB7e3VvbX19KTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImRhdGFzZXQ/LnJlZmVyZW5jZVZhbHVlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKm5nRm9yPVwibGV0IHJlZiBvZiBkYXRhc2V0LnJlZmVyZW5jZVZhbHVlc1wiIChjbGljayk9XCJ0b2dnbGVSZWZlcmVuY2VWYWx1ZShyZWYpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogcmVmLnZpc2libGV9XCIgW25nU3R5bGVdPVwie2NvbG9yOiByZWYuY29sb3J9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPnt7cmVmLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgY3JlYXRlRXhwb3J0Q3N2KHRpbWVzZXJpZXMpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWRvd25sb2FkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT1cImV4cG9ydC5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiPlxuICAgICAgICAgICAgICAgIDxzd2MtcHJvY2VkdXJlLW1ldGFkYXRhIHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXByb2NlZHVyZS1tZXRhZGF0YT5cbiAgICAgICAgICAgICAgICA8c3djLXRpbWVzZXJpZXMtcmF3LWRhdGEtb3V0cHV0IHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXRpbWVzZXJpZXMtcmF3LWRhdGEtb3V0cHV0PlxuICAgICAgICAgICAgICAgIDxzd2Mtc29zLXVybCB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy1zb3MtdXJsPlxuICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5nZW9tZXRyeVZpZXdlck1vZGFsIC5tb2RhbC1ib2R5e2hlaWdodDo1MHZofW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVte2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjVweDtib3JkZXItcmFkaXVzOjVweDttYXJnaW4tYm90dG9tOjVweH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuc21hbGwtbGFiZWx7Zm9udC1zaXplOjkwJTt3b3JkLWJyZWFrOmJyZWFrLWFsbH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbS5zZWxlY3RlZHtwYWRkaW5nOjA7Ym9yZGVyLXdpZHRoOjVweDtib3JkZXItc3R5bGU6c29saWR9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXIuaGlnaGxpZ2h0e2ZvbnQtd2VpZ2h0OjcwMH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgc3BhbnttYXJnaW46MCA0JTtmb250LXNpemU6MTUwJX1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgc3Bhbjpob3ZlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgLmRlbGV0ZXt6LWluZGV4OjV9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLm5vRGF0YVdhcm5pbmd7Ym9yZGVyOjJweCBzb2xpZCByZWQ7Ym9yZGVyLXJhZGl1czo1cHg7cGFkZGluZzozcHh9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLm5vRGF0YVdhcm5pbmcgLnJlZHtjb2xvcjpyZWR9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmFkZGl0aW9uYWxMZWdlbmRFbnRyeTpob3ZlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuYWRkaXRpb25hbExlZ2VuZEVudHJ5LnNlbGVjdGVke2ZvbnQtd2VpZ2h0OmJvbGRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAucmVmRW50cnkuc2VsZWN0ZWR7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXJhZGl1czoycHg7bWFyZ2luOjJweCAwfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sb2FkaW5nLW92ZXJsYXl7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7b3BhY2l0eTouNTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sb2FkaW5nLW92ZXJsYXkgLmZhLXNwaW57Y29sb3I6I2ZmZjtmb250LXNpemU6MjVweDt3aWR0aDoyNXB4O2hlaWdodDoyNXB4fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGV4dGVuZHMgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgcHVibGljIGluZm9ybWF0aW9uVmlzaWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgY29sb3I6IENvbG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJlZlZhbENhY2hlOiBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGFwaSwgaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMsIHRpbWVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlSW5mb3JtYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5mb3JtYXRpb25WaXNpYmxlID0gIXRoaXMuaW5mb3JtYXRpb25WaXNpYmxlO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVSZWZlcmVuY2VWYWx1ZShyZWZWYWx1ZTogUmVmZXJlbmNlVmFsdWUpIHtcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LmlkID09PSByZWZWYWx1ZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgY29uc3QgcmVmVmFsSWQgPSB0aGlzLmNyZWF0ZVJlZlZhbElkKHJlZlZhbHVlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHJlZlZhbHVlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlZlZhbHVlLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLnB1c2goeyBpZDogcmVmVmFsdWUucmVmZXJlbmNlVmFsdWVJZCwgY29sb3I6IHJlZlZhbHVlLmNvbG9yIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmVmFsQ2FjaGUuZ2V0KHJlZlZhbElkKS52aXNpYmxlID0gcmVmVmFsdWUudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVycygpIHtcbiAgICAgICAgc3VwZXIuc2V0UGFyYW1ldGVycygpO1xuICAgICAgICBpZiAodGhpcy5kYXRhc2V0LnJlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0LnJlZmVyZW5jZVZhbHVlcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVmFsSWQgPSB0aGlzLmNyZWF0ZVJlZlZhbElkKGUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVmFsT3B0aW9uID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLmZpbmQoKG8pID0+IG8uaWQgPT09IGUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlZlZhbE9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZlZhbENhY2hlLnNldChyZWZWYWxJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZlZhbE9wdGlvbi5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWZWYWxDYWNoZS5oYXMocmVmVmFsSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmVmFsQ2FjaGUuc2V0KHJlZlZhbElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvci5nZXRDb2xvcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGUuY29sb3IgPSB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkuY29sb3I7XG4gICAgICAgICAgICAgICAgZS52aXNpYmxlID0gdGhpcy5yZWZWYWxDYWNoZS5nZXQocmVmVmFsSWQpLnZpc2libGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUmVmVmFsSWQocmVmSWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0LnVybCArIHJlZklkO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXQsIERhdGFzZXRBcGlJbnRlcmZhY2UsIERhdGFzZXRPcHRpb25zLCBJbnRlcm5hbElkSGFuZGxlciwgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vbGlzdC1lbnRyeS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi10cmFqZWN0b3J5LWVudHJ5JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KClcIj5cbiAgPHNwYW4+XG4gICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBsdXNcIiBbbmdDbGFzc109XCJ7J2ZhLWV5ZSc6ICFkYXRhc2V0T3B0aW9ucz8udmlzaWJsZSwgJ2ZhLWV5ZS1zbGFzaCc6IGRhdGFzZXRPcHRpb25zPy52aXNpYmxlfVwiPjwvc3Bhbj5cbiAgICA8L2E+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDEwcHg7XCIgW25nU3R5bGVdPVwieydjb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj57e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoZGF0YXNldE9wdGlvbnMpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nU3R5bGVdPVwie2NvbG9yOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+PC9zcGFuPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUcmFqZWN0b3J5RW50cnlDb21wb25lbnQgZXh0ZW5kcyBMaXN0RW50cnlDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IERhdGFzZXRPcHRpb25zO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVXBkYXRlT3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkVkaXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8RGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgdGVtcENvbG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnZpc2libGUgPSAhdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlO1xuICAgICAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlZGl0RGF0YXNldE9wdGlvbnMob3B0aW9uczogRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkVkaXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRMYWJlbE1hcHBlck1vZHVsZSB9IGZyb20gJy4uL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4vcHJvZmlsZS1lbnRyeS9wcm9maWxlLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4vdGltZXNlcmllcy9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4vdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lc2VyaWVzL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUsXG4gIFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIFByb2ZpbGVFbnRyeUNvbXBvbmVudCxcbiAgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgIEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRGF0YXNldGxpc3RNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJdGVyYWJsZURpZmZlcnMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgRGF0YXNldE9wdGlvbnMsXG4gIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gIERhdGFzZXRUYWJsZURhdGEsXG4gIEludGVybmFsSWRIYW5kbGVyLFxuICBUaW1lLFxuICBUaW1lc2VyaWVzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1kYXRhc2V0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8dGFibGUgKm5nSWY9XCJyZWFkeVwiPlxuICA8dGhlYWQ+XG4gICAgPHRyPlxuICAgICAgPHRoIChjbGljayk9XCJzb3J0KCRldmVudClcIiBbYXR0ci5kYXRhLWNvbHVtbi1pZF09XCInZGF0ZXRpbWUnXCIgY2xhc3M9XCJzb3J0ZWQtYXNjXCI+XG4gICAgICAgIFplaXRcbiAgICAgIDwvdGg+XG4gICAgICA8dGggKm5nRm9yPVwibGV0IHNlcmllcyBvZiB0aGlzLnRpbWVzZXJpZXNBcnJheTsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJzb3J0KCRldmVudClcIiBbYXR0ci5kYXRhLWNvbHVtbi1pZF09XCJpXCIgW25nU3R5bGVdPVwieyAnYm9yZGVyLWNvbG9yJzogcHJlcGFyZWRDb2xvcnNbaV0gfVwiPlxuICAgICAgICB7e3Nlcmllcz8ubGFiZWx9fSBbe3tzZXJpZXM/LnVvbX19XVxuICAgICAgPC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHk+XG4gICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgdGhpcy5wcmVwYXJlZERhdGFcIj5cbiAgICAgIDx0ZD57e3Jvdy5kYXRldGltZSB8IGRhdGU6ICdzaG9ydCd9fTwvdGQ+XG4gICAgICA8dGQgKm5nRm9yPVwibGV0IHZhbHVlIG9mIHJvdy52YWx1ZXNcIj57e3ZhbHVlfX08L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0e2ZsZXg6MTtvdmVyZmxvdy15OnNjcm9sbDtvdmVyZmxvdy14OmhpZGRlbn06aG9zdCB0Ym9keSw6aG9zdCB0aGVhZCB0cntkaXNwbGF5OnRhYmxlO3RhYmxlLWxheW91dDpmaXhlZDt3aWR0aDoxMDAlfTpob3N0IHRhYmxle2Rpc3BsYXk6YmxvY2s7Ym9yZGVyLWNvbGxhcHNlOnNlcGFyYXRlO2JvcmRlci1zcGFjaW5nOjAgMXB4fTpob3N0IHRoZWFke2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246LXdlYmtpdC1zdGlja3k7cG9zaXRpb246c3RpY2t5O3RvcDowO2JvcmRlci1zcGFjaW5nOjB9Omhvc3QgdHI6bnRoLWNoaWxkKDJuKXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgdGh7YmFja2dyb3VuZC1jb2xvcjojYTlhOWE5O2N1cnNvcjpwb2ludGVyO2JvcmRlci1ib3R0b20td2lkdGg6N3B4O2JvcmRlci1ib3R0b20tc3R5bGU6c29saWQ7b3ZlcmZsb3ctd3JhcDpicmVhay13b3JkfTpob3N0IHRoOmZpcnN0LWNoaWxke2JvcmRlci1ib3R0b20tY29sb3I6I2E5YTlhOX06aG9zdCB0aDpmaXJzdC1jaGlsZC5zb3J0ZWQtYXNjLDpob3N0IHRoOmZpcnN0LWNoaWxkLnNvcnRlZC1kZXNje2JvcmRlci1ib3R0b20tY29sb3I6IzU1NX06aG9zdCB0aC5zb3J0ZWQtYXNjLDpob3N0IHRoLnNvcnRlZC1kZXNje2JhY2tncm91bmQtY29sb3I6IzU1NTtjb2xvcjojZmZmfTpob3N0IHRoLnNvcnRlZC1hc2M6YWZ0ZXJ7Y29udGVudDpcIlxcXFwyNUI0XCI7ZmxvYXQ6cmlnaHR9Omhvc3QgdGguc29ydGVkLWRlc2M6YWZ0ZXJ7Y29udGVudDpcIlxcXFwyNUJFXCI7ZmxvYXQ6cmlnaHR9Omhvc3QgdGR7d2hpdGUtc3BhY2U6bm93cmFwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIGdyYXl9Omhvc3QgdGQsOmhvc3QgdGh7cGFkZGluZzo1cHggMTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhc2V0VGFibGVDb21wb25lbnQgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBhbnk+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLypcbiAgICBUaGUgY29tcG9uZW50IGV4dGVuZHMgRGF0YXNldEdyYXBoQ29tcG9uZW50LCBidXQgaW1wbGVtZW50cyBvbmx5IHBhcnRzIG9mIHRoYXQgY29tcG9uZW50cyBpbnB1dHMgYW5kIG91dHB1dHMuXG4gICAgSW1wbGVtZW50ZWQ6IGRhdGFzZXRJZHMsIHRpbWVJbnRlcnZhbCwgc2VsZWN0ZWREYXRhc2V0SWRzIGFuZCBkYXRhc2V0T3B0aW9ucyBpbnB1dHM7IG5vIG91dHB1dHNcbiAgICBOb3QgaW1wbGVtZW50ZWQ6IGdyYXBoT3B0aW9ucyBpbnB1dDsgYWxsIG91dHB1dHMgKG9uRGF0YXNldFNlbGVjdGVkLCBvblRpbWVzcGFuQ2hhbmdlZCwgb25NZXNzYWdlVGhyb3duLCBvbkxvYWRpbmcpXG4gICovXG5cbiAgcHVibGljIHByZXBhcmVkRGF0YTogRGF0YXNldFRhYmxlRGF0YVtdID0gQXJyYXkoKTtcbiAgcHVibGljIHByZXBhcmVkQ29sb3JzOiBzdHJpbmdbXSA9IEFycmF5KCk7XG4gIHB1YmxpYyByZWFkeSA9IGZhbHNlO1xuXG4gIHB1YmxpYyB0aW1lc2VyaWVzQXJyYXk6IFRpbWVzZXJpZXNbXSA9IG5ldyBBcnJheSgpO1xuICBwcml2YXRlIGFkZGl0aW9uYWxTdHlsZXNoZWV0OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTcnZjKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGVkSWRzU3R5bGVzaGVldCcpO1xuICAgIGlmICghdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCkge1xuICAgICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlkID0gJ3NlbGVjdGVkSWRzU3R5bGVzaGVldCc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGNhbGxlZCB3aGVuIHVzZXIgY2xpY2tzIG9uIHRhYmxlIGhlYWRlcnMgKi9cbiAgcHVibGljIHNvcnQoZXZlbnQ6IGFueSkge1xuICAgIC8vIGNhbiBiZSAnZGF0ZXRpbWUnIG9yIGFuIGludGVnZXIgaW5kaWNhdGluZyB0aGUgaW5kZXggb2YgdGhlIGNvbHVtbiBpbiB0aGUgdmFsdWVzIGFycmF5XG4gICAgY29uc3QgYnkgPSBldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW5JZDtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0ZWQtYXNjJykgPyAnZGVzYycgOiAnYXNjJztcbiAgICBjb25zdCBkaXJlY3Rpb25OdW1iZXIgPSAoZGlyZWN0aW9uID09PSAnYXNjJyA/IDEgOiAtMSk7XG5cbiAgICAvLyBzZXQgQ1NTIGNsYXNzZXNcbiAgICBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKChjaGlsZDogRWxlbWVudCkgPT4gY2hpbGQuY2xhc3NOYW1lID0gJycpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdhc2MnKSB7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ3NvcnRlZC1hc2MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdzb3J0ZWQtZGVzYycpO1xuICAgIH1cblxuICAgIC8vIGRlZmluZSBjb3JyZWN0IGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBzb3J0IG1ldGhvZFxuICAgIGxldCBzb3J0Q2FsbGJhY2s7XG4gICAgaWYgKGJ5ID09PSAnZGF0ZXRpbWUnKSB7XG4gICAgICBzb3J0Q2FsbGJhY2sgPSAoZTE6IGFueSwgZTI6IGFueSkgPT4gZGlyZWN0aW9uTnVtYmVyICogKGUxLmRhdGV0aW1lIC0gZTIuZGF0ZXRpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGJ5LCAxMCk7XG4gICAgICAvLyBiYXNpY2FsbHkgdGhlIHNhbWUgYXMgYWJvdmUsIGJ1dCB0YWtlIGNhcmUgb2YgJ3VuZGVmaW5lZCcgdmFsdWVzXG4gICAgICBzb3J0Q2FsbGJhY2sgPSAoZTE6IGFueSwgZTI6IGFueSkgPT5cbiAgICAgICAgKGUxLnZhbHVlc1tpbmRleF0gPT09IHVuZGVmaW5lZCA/IDEgOlxuICAgICAgICAgIChlMi52YWx1ZXNbaW5kZXhdID09PSB1bmRlZmluZWQgPyAtMSA6XG4gICAgICAgICAgICAoZGlyZWN0aW9uTnVtYmVyICogKGUxLnZhbHVlc1tpbmRleF0gLSBlMi52YWx1ZXNbaW5kZXhdKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZG8gdGhlIHNvcnRcbiAgICB0aGlzLnByZXBhcmVkRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLnNvcnQoc29ydENhbGxiYWNrKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWxvYWQgZGF0YSBhdCAnICsgbmV3IERhdGUoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogYW55KSB7XG4gICAgLy8gb25seSBpbmNsdWRlZCBiZWNhdXNlIGl0J3MgcmVxdWlyZWQgYnkgYWJzdHJhY3QgcGFyZW50IGNsYXNzICh3b3VsZG4ndCBjb21waWxlIHdpdGhvdXQpXG4gICAgLy8gbm8gcG9pbnQgaW4gaW1wbGVtZW50aW5nIHRoaXMgbWV0aG9kIGluIGEgbm9uLWdyYXBoaW5nIGNvbXBvbmVudFxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gaGVscGVyIG1ldGhvZFxuICAgIHJldHVybiB0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgIC8vIHF1aXRlIGZhaXJseSB0ZXN0ZWRcbiAgICBjb25zdCBydWxlcyA9IHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICBydWxlc1tpbmRleF0gPSAndGQ6bnRoLWNoaWxkKCcgKyAoaW5kZXggKyAyKSArICcpIHtmb250LXdlaWdodDogYm9sZH0nO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MID0gcnVsZXMuam9pbignXFxyXFxuJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBmYWlybHkgdGVzdGVkXG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTC5zcGxpdCgnXFxyXFxuJyk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgcnVsZXNbaW5kZXhdID0gJyc7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgPSBydWxlcy5qb2luKCdcXHJcXG4nKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCkge1xuICAgIC8vIHRoZSBlYXNpZXN0IG1ldGhvZDogZGVsZXRlIGV2ZXJ5dGhpbmcgYW5kIGJ1aWxkIHByZXBhcmVkRGF0YSBmcm9tIHNjcmF0Y2guXG4gICAgdGhpcy5wcmVwYXJlZERhdGEgPSBbXTtcbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheS5mb3JFYWNoKCh0aW1lc2VyaWVzKSA9PiB0aGlzLmxvYWRUc0RhdGEodGltZXNlcmllcykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gZmFpcmx5IHRlc3RlZFxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQpO1xuXG4gICAgLy8gcmVtb3ZlIGVudHJpZXMgb2YgdGhpcyBkYXRhc2V0IGluIGVhY2ggZGF0ZXRpbWUncyBgdmFsdWVzYCBhcnJheXNcbiAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlKSA9PiBlLnZhbHVlcy5zcGxpY2UoaW5kZXgsIDEpKTtcbiAgICAvLyBpZiBhIGRhdGV0aW1lIGJlY2FtZSBjb21wbGV0ZWx5IGVtcHR5IChpLmUuIHRoZXJlJ3Mgb25seSBgdW5kZWZpbmVkYHMgaW4gdGhlIGB2YWx1ZXNgIGFycmF5LCBkZWxldGUgdGhpcyBkYXRldGltZSlcbiAgICB0aGlzLnByZXBhcmVkRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbHRlcigoZSkgPT4gZS52YWx1ZXMucmVkdWNlKChhLCBjKSA9PiBhIHx8IGMsIHVuZGVmaW5lZCkgIT09IHVuZGVmaW5lZCk7XG5cbiAgICB0aGlzLnByZXBhcmVkQ29sb3JzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBjb25zdCBydWxlcyA9IHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBydWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MID0gcnVsZXMuam9pbignXFxyXFxuJyk7XG5cbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZERhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGltZXNlcmllc0FycmF5Lmxlbmd0aCArPSAxOyAgLy8gY3JlYXRlIG5ldyBlbXB0eSBzbG90XG4gICAgdGhpcy5wcmVwYXJlZENvbG9ycy5wdXNoKCdkYXJrZ3JleScpO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MICs9ICdcXHJcXG4nO1xuICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXMoaW50ZXJuYWxJZCwgdXJsKVxuICAgICAgLnN1YnNjcmliZSgodGltZXNlcmllczogVGltZXNlcmllcykgPT4gdGhpcy5hZGRUaW1lc2VyaWVzKHRpbWVzZXJpZXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpbWVzZXJpZXNBcnJheS5zb21lKChlKSA9PiBlICE9PSB1bmRlZmluZWQgJiYgZS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLnByZXBhcmVkQ29sb3JzW2luZGV4XSA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAvLyBUT0RPLUNGOiBQYWdlIGlzbid0IHJlZnJlc2hlZCBpbnN0YW50bHksIGJ1dCBvbmx5IGFmdGVyIHRoZSBuZXh0IHNvcnQgKG9yIHBvc3NpYmxlIG90aGVyIGFjdGlvbnMgYXMgd2VsbClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgLy8gVE9ETy1DRjogbmVlZGVkPz8/PyBwcm9iYWJseSBub3RcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGltZXNlcmllcyh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzKSB7XG4gICAgdGhpcy50aW1lc2VyaWVzQXJyYXlbdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCldID0gdGltZXNlcmllcztcbiAgICB0aGlzLmxvYWRUc0RhdGEodGltZXNlcmllcyk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRUc0RhdGEodGltZXNlcmllczogVGltZXNlcmllcykge1xuICAgIGlmICh0aGlzLnRpbWVzcGFuKSB7XG4gICAgICAvLyBjb25zdCBkYXRhc2V0T3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLmFwaS5nZXRUc0RhdGE8W251bWJlciwgbnVtYmVyXT4odGltZXNlcmllcy5pZCwgdGltZXNlcmllcy51cmwsIHRoaXMudGltZXNwYW4sIHsgZm9ybWF0OiAnZmxvdCcgfSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgLy8gYnJpbmcgcmVzdWx0IGludG8gQXJyYXk8RGF0YXNldFRhYmxlRGF0YT4gZm9ybWF0IGFuZCBwYXNzIHRvIHByZXBhcmVEYXRhXG4gICAgICAgICAgLy8gY29udmVudGlvbiBmb3IgbGF5b3V0IG9mIG5ld2RhdGEgYXJndW1lbnQ6IHNlZSAzLWxpbmUtY29tbWVudCBpbiBwcmVwYXJlRGF0YSBmdW5jdGlvblxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSh0aW1lc2VyaWVzLCByZXN1bHQudmFsdWVzLm1hcCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYSA9IG5ldyBBcnJheSh0aGlzLmRhdGFzZXRJZHMubGVuZ3RoKS5maWxsKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBhW2luZGV4XSA9IGVbMV07XG4gICAgICAgICAgICByZXR1cm4geyBkYXRldGltZTogZVswXSwgdmFsdWVzOiBhIH07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVEYXRhKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXMsIG5ld2RhdGE6IERhdGFzZXRUYWJsZURhdGFbXSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG5cbiAgICAvLyBpZiBkYXRhc2V0T3B0aW9ucyBhcmUgcHJvdmlkZWQsIHVzZSB0aGVpciBjb2xvciB0byBzdHlsZSB0aGUgaGVhZGVyJ3MgXCJjb2xvciBiYW5kXCIgKGkuZS4gdGhlIDdweCBib3JkZXItYm90dG9tIG9mIHRoKVxuICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zKSB7XG4gICAgICBjb25zdCBkYXRhc2V0T3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLnByZXBhcmVkQ29sb3JzW2luZGV4XSA9IGRhdGFzZXRPcHRpb25zLmNvbG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3aGVuIG5vIGNvbG9yIGlzIHNwZWNpZmllZDogbWFrZSBib3JkZXIgdHJhbnNwYXJlbnQgc28gdGhlIGhlYWRlcidzIGJhY2tncm91bmQgY29sb3IgaXMgdXNlZCBmb3IgdGhlIGNvbG9yIGJhbmQsIHRvb1xuICAgICAgdGhpcy5wcmVwYXJlZENvbG9yc1tpbmRleF0gPSAncmdiYSgwLDAsMCwwKSc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2YodGltZXNlcmllcy5pbnRlcm5hbElkKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJZCh0aW1lc2VyaWVzLmludGVybmFsSWQpO1xuICAgIH1cblxuICAgIC8vIGBuZXdkYXRhYCBpcyBleHBlY3RlZCBpbiBleGFjdGx5IHRoZSBzYW1lIGZvcm1hdCBgcHJlcGFyZWREYXRhYCB3b3VsZCBsb29rIGxpa2UgaWYgdGhhdCB0aW1lc2VyaWVzIHdhcyB0aGUgb25seSBvbmVcbiAgICAvLyB0byBhY3R1YWxseSBoYXZlIGRhdGEgKGkuZS4gYHZhbHVlc2AgaGFzIHRoZSBsZW5ndGggb2YgdGltZXNlcmllc0FycmF5LCBidXQgYWxsIHNsb3RzIGFyZSBgdW5kZWZpbmVkYCwgZXhjZXB0IGZvclxuICAgIC8vIHRoZSBzbG90IHRoYXQgY29ycmVzcG9uZHMgdG8gdGhhdCB0aW1lc2VyaWVzKVxuXG4gICAgLy8gYHRpbWVzZXJpZXNgIGlzIGZpcnN0IHRpbWVzZXJpZXMgYWRkZWQgLT4gbm8gb3RoZXIgYHByZXBhcmVkRGF0YWAgdG8gbWVyZ2Ugd2l0aFxuICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHNldCBuZXdkYXRhIGFzIHByZXBhcmVkRGF0YSAoYXMgcGVyIGFib3ZlKVxuICAgICAgdGhpcy5wcmVwYXJlZERhdGEgPSBuZXdkYXRhO1xuXG4gICAgICAvLyBgdGltZXNlcmllc2AgaXMgbm90IHRoZSBmaXJzdCB0aW1lc2VyaWVzIGFkZGVkIC0+IHdlIGhhdmUgdG8gbWVyZ2UgYG5ld2RhdGFgIGludG8gdGhlIGV4aXN0aW5nIGBwcmVwYXJlZERhdGFgXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpID0gMDsgIC8vIGxvb3AgdmFyaWFibGUgZm9yIGBwcmVwYXJlZERhdGFgXG4gICAgICBsZXQgaiA9IDA7ICAvLyBsb29wIHZhcmlhYmxlIGZvciBgbmV3ZGF0YWBcblxuICAgICAgLy8gZ28gdGhyb3VnaCBhbGwgZGF0YSBwb2ludHMgaW4gYG5ld2RhdGFgXG4gICAgICB3aGlsZSAoaiA8IG5ld2RhdGEubGVuZ3RoKSB7XG5cbiAgICAgICAgLy8gdGltZXN0YW1wcyBtYXRjaFxuICAgICAgICBpZiAodGhpcy5wcmVwYXJlZERhdGFbaV0gJiYgdGhpcy5wcmVwYXJlZERhdGFbaV0uZGF0ZXRpbWUgPT09IG5ld2RhdGFbal0uZGF0ZXRpbWUpIHtcbiAgICAgICAgICAvLyBqdXN0IGFkZCBgbmV3ZGF0YWAncyB2YWx1ZSB0byB0aGUgZXhpc3RpbmcgYHZhbHVlc2AgYXJyYXkgaW4gYHByZXBhcmVkRGF0YWBcbiAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YVtpXS52YWx1ZXNbaW5kZXhdID0gbmV3ZGF0YVtqXS52YWx1ZXNbaW5kZXhdO1xuICAgICAgICAgIC8vIGluY3JlbWVudCBib3RoXG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGorKztcblxuICAgICAgICAgIC8vIGBuZXdkYXRhYCBpcyBhaGVhZCBvZiBgcHJlcGFyZWREYXRhYFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJlcGFyZWREYXRhW2ldICYmIHRoaXMucHJlcGFyZWREYXRhW2ldLmRhdGV0aW1lIDwgbmV3ZGF0YVtqXS5kYXRldGltZSkge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmcgYmVjYXVzZSB0aGVyZSdzIGFscmVhZHkgYW4gdW5kZWZpbmVkIHRoZXJlXG4gICAgICAgICAgLy8gZ2l2ZSBwcmVwYXJlZERhdGEgdGhlIGNoYW5jZSB0byBjYXRjaCB1cCB3aXRoIG5ld2RhdGFcbiAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAvLyBgcHJlcGFyZWREYXRhYCBpcyBhaGVhZCBvZiBgbmV3ZGF0YWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGUgY3VycmVudCBgbmV3ZGF0YWAgaXMgdGhlIGZpcnN0IGRhdGFzZXQgdGhhdCBoYXMgdGhpcyBkYXRldGltZSAtPiBhZGQgaXQgdG8gdGhlIHByZXBhcmVkRGF0YSBhcnJheVxuICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnNwbGljZShpLCAwLCBuZXdkYXRhW2pdKTtcbiAgICAgICAgICAvLyBnaXZlIG5ld2RhdGEgdGhlIGNoYW5jZSB0byBjYXRjaCB1cCB3aXRoIHByZXBhcmVkRGF0YVxuICAgICAgICAgIGorKztcbiAgICAgICAgICAvLyBidXQgcHJlcGFyZWREYXRhIGlzIDEgbG9uZ2VyIG5vdywgdG9vXG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkeSA9IHRoaXMudGltZXNlcmllc0FycmF5LmV2ZXJ5KChlKSA9PiBlICE9PSB1bmRlZmluZWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IERhdGFzZXRUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0YXNldC10YWJsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEYXRhc2V0VGFibGVDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRGF0YXNldFRhYmxlQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZERhdGFzZXRUYWJsZU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFhSSxZQUNjLFVBQXNCLEVBQ3RCLFlBQXVDO1FBRHZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQTJCO3FCQUpwQixJQUFJLE9BQU8sRUFBRTtLQUt6Qzs7Ozs7SUFFRSxjQUFjLENBQUMsS0FBYTtRQUMvQixPQUFPLElBQUksVUFBVSxDQUFTLENBQUMsUUFBMEI7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFO2dCQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN0QztpQkFBTTs7Z0JBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDcEQ7eUJBQU07O3dCQUNILE1BQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsV0FB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