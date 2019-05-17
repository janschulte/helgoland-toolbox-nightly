/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Injectable, Input, Output, ViewEncapsulation, } from '@angular/core';
import { ColorService, Dataset, DatasetApiInterface, DatasetOptions, IdCache, InternalIdHandler, Time, TimeInterval, Timeseries, } from '@helgoland/core';
import { ListEntryComponent } from '../list-entry.component';
export class ReferenceValueColorCache extends IdCache {
}
ReferenceValueColorCache.decorators = [
    { type: Injectable },
];
export class TimeseriesEntryComponent extends ListEntryComponent {
    /**
     * @param {?} api
     * @param {?} timeSrvc
     * @param {?} internalIdHandler
     * @param {?} color
     * @param {?} refValCache
     */
    constructor(api, timeSrvc, internalIdHandler, color, refValCache) {
        super(internalIdHandler);
        this.api = api;
        this.timeSrvc = timeSrvc;
        this.internalIdHandler = internalIdHandler;
        this.color = color;
        this.refValCache = refValCache;
        this.onUpdateOptions = new EventEmitter();
        this.onEditOptions = new EventEmitter();
        this.onSelectDate = new EventEmitter();
        this.onShowGeometry = new EventEmitter();
        this.informationVisible = false;
        this.hasData = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["changedSelectedDatasets"]) {
            if (changes["changedSelectedDatasets"].firstChange !== true) {
                changes["changedSelectedDatasets"].currentValue.forEach((obj) => {
                    this.toggleUomSelection(obj.id, obj.change);
                });
            }
        }
        if (changes["timeInterval"]) {
            this.checkDataInTimespan();
        }
    }
    /**
     * @return {?}
     */
    toggleInformation() {
        this.informationVisible = !this.informationVisible;
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
    toggleVisibility() {
        this.datasetOptions.visible = !this.datasetOptions.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
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
    /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    loadDataset(id, url) {
        debugger;
        this.loading = true;
        this.api.getSingleTimeseries(id, url).subscribe((timeseries) => {
            this.dataset = timeseries;
            this.setParameters();
            this.loading = false;
        }, (error) => {
            this.api.getDataset(id, url).subscribe((dataset) => {
                this.dataset = dataset;
                this.setParameters();
                this.loading = false;
            });
        });
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
        this.firstValue = this.dataset.firstValue;
        this.lastValue = this.dataset.lastValue;
        this.uom = this.dataset.uom;
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
        this.checkDataInTimespan();
    }
    /**
     * @param {?} refId
     * @return {?}
     */
    createRefValId(refId) {
        return this.dataset.url + refId;
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
    { type: ReferenceValueColorCache }
];
TimeseriesEntryComponent.propDecorators = {
    datasetOptions: [{ type: Input }],
    timeInterval: [{ type: Input }],
    changedSelectedDatasets: [{ type: Input }],
    onUpdateOptions: [{ type: Output }],
    onEditOptions: [{ type: Output }],
    onSelectDate: [{ type: Output }],
    onShowGeometry: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TimeseriesEntryComponent.prototype.datasetOptions;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.timeInterval;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.changedSelectedDatasets;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.onUpdateOptions;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.onEditOptions;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.onSelectDate;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.onShowGeometry;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.platformLabel;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.phenomenonLabel;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.procedureLabel;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.categoryLabel;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.uom;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.firstValue;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.lastValue;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.informationVisible;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.tempColor;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.hasData;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.referenceValues;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.loading;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.dataset;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.api;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.timeSrvc;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.color;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.refValCache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzLWVudHJ5L3RpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFFTixpQkFBaUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFlBQVksRUFDWixPQUFPLEVBQ1AsbUJBQW1CLEVBQ25CLGNBQWMsRUFHZCxPQUFPLEVBQ1AsaUJBQWlCLEVBRWpCLElBQUksRUFDSixZQUFZLEVBQ1osVUFBVSxHQUNiLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHN0QsTUFBTSwrQkFBZ0MsU0FBUSxPQUE0Qzs7O1lBRHpGLFVBQVU7O0FBbUZYLE1BQU0sK0JBQWdDLFNBQVEsa0JBQWtCOzs7Ozs7OztJQXNDNUQsWUFDYyxHQUF3QixFQUN4QixRQUFjLEVBQ2QsaUJBQW9DLEVBQ3BDLEtBQW1CLEVBQ25CLFdBQXFDO1FBRS9DLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBTmYsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUNkLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7K0JBL0JJLElBQUksWUFBWSxFQUFFOzZCQUdwQixJQUFJLFlBQVksRUFBRTs0QkFHN0IsSUFBSSxZQUFZLEVBQUU7OEJBR0MsSUFBSSxZQUFZLEVBQUU7a0NBU25ELEtBQUs7dUJBRWhCLElBQUk7S0FjcEI7Ozs7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WUFBWSxFQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDbkMsQ0FBQztTQUNMOzs7O1lBMVBSLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEVQO2dCQUNILE1BQU0sRUFBRSxDQUFDLDgzQ0FBODNDLENBQUM7Z0JBQ3g0QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7OztZQWhHRyxtQkFBbUI7WUFPbkIsSUFBSTtZQUZKLGlCQUFpQjtZQVBqQixZQUFZO1lBOEllLHdCQUF3Qjs7OzZCQXpDbEQsS0FBSzsyQkFHTCxLQUFLO3NDQUdMLEtBQUs7OEJBR0wsTUFBTTs0QkFHTixNQUFNOzJCQUdOLE1BQU07NkJBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3RhYmxlLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbG9yU2VydmljZSxcbiAgICBEYXRhc2V0LFxuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRmlyc3RMYXN0VmFsdWUsXG4gICAgSURhdGFzZXQsXG4gICAgSWRDYWNoZSxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBSZWZlcmVuY2VWYWx1ZSxcbiAgICBUaW1lLFxuICAgIFRpbWVJbnRlcnZhbCxcbiAgICBUaW1lc2VyaWVzLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0RW50cnlDb21wb25lbnQgfSBmcm9tICcuLi9saXN0LWVudHJ5LmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUgZXh0ZW5kcyBJZENhY2hlPHsgY29sb3I6IHN0cmluZywgdmlzaWJsZTogYm9vbGVhbiB9PiB7IH1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItdGltZXNlcmllcy1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIFtuZ1N0eWxlXT1cInsnYm9yZGVyLWNvbG9yJzogZGF0YXNldE9wdGlvbnM/LmNvbG9yfVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIlxuICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5cbiAgPGRpdiBjbGFzcz1cImxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZ1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGZhLTN4IGZhLWZ3XCI+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJsZWdlbmRJdGVtaGVhZGVyXCIgW25nQ2xhc3NdPVwieydoaWdobGlnaHQnOiBoaWdobGlnaHR9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbUxhYmVsXCIgW25nU3R5bGVdPVwieydjb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3BsYXRmb3JtTGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgICAgPCEtLSA8bjUyLWZhdm9yaXRlLXRvZ2dsZXIgW2RhdGFzZXRdPVwiZGF0YXNldFwiPjwvbjUyLWZhdm9yaXRlLXRvZ2dsZXI+IC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm9EYXRhV2FybmluZyBmaXJzdExhc3RFbnRyeVwiICpuZ0lmPVwiIWhhc0RhdGFcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHJlZFwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+S2VpbmUgRGF0ZW4gdmVyZsO8Z2Jhcjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAoY2xpY2spPVwianVtcFRvTGFzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGwtbGFiZWxcIj5TcHJpbmdlIHp1ciBsZXR6dGVuIE1lc3N1bmc8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIj5cbiAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3BoZW5vbWVub25MYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInVvbVwiPlxuICAgICAgICAgIDxzcGFuPls8L3NwYW4+XG4gICAgICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e3VvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgICAgIDxzcGFuPl08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twcm9jZWR1cmVMYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic21hbGwtbGFiZWxcIiAqbmdJZj1cImNhdGVnb3J5TGFiZWwgIT0gcGhlbm9tZW5vbkxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tjYXRlZ29yeUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kaWNvbnNcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJ7J2ZhLWNoZXZyb24tZG93bic6ICFpbmZvcm1hdGlvblZpc2libGUsICdmYS1jaGV2cm9uLXVwJzogaW5mb3JtYXRpb25WaXNpYmxlfVwiIChjbGljayk9XCJ0b2dnbGVJbmZvcm1hdGlvbigpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogZGF0YXNldE9wdGlvbnM/LnZpc2libGUsICdmYS1leWUnOiAhZGF0YXNldE9wdGlvbnM/LnZpc2libGV9XCIgKGNsaWNrKT1cInRvZ2dsZVZpc2liaWxpdHkoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgKGNsaWNrKT1cImVkaXREYXRhc2V0T3B0aW9ucygpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nU3R5bGVdPVwie2NvbG9yOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlTGVnZW5kRW50cnkgc21hbGwtbGFiZWxcIiAqbmdJZj1cImluZm9ybWF0aW9uVmlzaWJsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGFzdEVudHJ5IGFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0lmPVwiZmlyc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9GaXJzdFRpbWVTdGFtcCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4+RXJzdGVyIFdlcnQgYmVpPC9zcGFuPlxuICAgICAgICA8c3Bhbj57e2ZpcnN0VmFsdWUudGltZXN0YW1wfCBkYXRlOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1lZGl1bVwiPih7e2ZpcnN0VmFsdWUudmFsdWV9fSB7e3VvbX19KTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGFzdEVudHJ5IGFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0lmPVwibGFzdFZhbHVlXCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuPkxldHp0ZXIgV2VydCBiZWk8L3NwYW4+XG4gICAgICAgIDxzcGFuPnt7bGFzdFZhbHVlLnRpbWVzdGFtcHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZWRpdW1cIj4oe3tsYXN0VmFsdWUudmFsdWV9fSB7e3VvbX19KTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImRhdGFzZXQ/LnJlZmVyZW5jZVZhbHVlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKm5nRm9yPVwibGV0IHJlZiBvZiBkYXRhc2V0LnJlZmVyZW5jZVZhbHVlc1wiIChjbGljayk9XCJ0b2dnbGVSZWZlcmVuY2VWYWx1ZShyZWYpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogcmVmLnZpc2libGV9XCIgW25nU3R5bGVdPVwie2NvbG9yOiByZWYuY29sb3J9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPnt7cmVmLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiBuZy1jbGljaz1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgY3JlYXRlRXhwb3J0Q3N2KHRpbWVzZXJpZXMpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWRvd25sb2FkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT1cImV4cG9ydC5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiPlxuICAgICAgICAgICAgICAgIDxzd2MtcHJvY2VkdXJlLW1ldGFkYXRhIHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXByb2NlZHVyZS1tZXRhZGF0YT5cbiAgICAgICAgICAgICAgICA8c3djLXRpbWVzZXJpZXMtcmF3LWRhdGEtb3V0cHV0IHRpbWVzZXJpZXM9J3RpbWVzZXJpZXMnPjwvc3djLXRpbWVzZXJpZXMtcmF3LWRhdGEtb3V0cHV0PlxuICAgICAgICAgICAgICAgIDxzd2Mtc29zLXVybCB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy1zb3MtdXJsPlxuICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5nZW9tZXRyeVZpZXdlck1vZGFsIC5tb2RhbC1ib2R5e2hlaWdodDo1MHZofW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVte2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjVweDtib3JkZXItcmFkaXVzOjVweDttYXJnaW4tYm90dG9tOjVweH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuc21hbGwtbGFiZWx7Zm9udC1zaXplOjkwJTt3b3JkLWJyZWFrOmJyZWFrLWFsbH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbS5zZWxlY3RlZHtwYWRkaW5nOjA7Ym9yZGVyLXdpZHRoOjVweDtib3JkZXItc3R5bGU6c29saWR9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZEl0ZW1oZWFkZXIuaGlnaGxpZ2h0e2ZvbnQtd2VpZ2h0OjcwMH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgc3BhbnttYXJnaW46MCA0JTtmb250LXNpemU6MTUwJX1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgc3Bhbjpob3ZlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubGVnZW5kaWNvbnMgLmRlbGV0ZXt6LWluZGV4OjV9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLm5vRGF0YVdhcm5pbmd7Ym9yZGVyOjJweCBzb2xpZCByZWQ7Ym9yZGVyLXJhZGl1czo1cHg7cGFkZGluZzozcHh9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLm5vRGF0YVdhcm5pbmcgLnJlZHtjb2xvcjpyZWR9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmFkZGl0aW9uYWxMZWdlbmRFbnRyeTpob3ZlcntjdXJzb3I6cG9pbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAuYWRkaXRpb25hbExlZ2VuZEVudHJ5LnNlbGVjdGVke2ZvbnQtd2VpZ2h0OmJvbGRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAucmVmRW50cnkuc2VsZWN0ZWR7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXJhZGl1czoycHg7bWFyZ2luOjJweCAwfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sb2FkaW5nLW92ZXJsYXl7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7b3BhY2l0eTouNTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sb2FkaW5nLW92ZXJsYXkgLmZhLXNwaW57Y29sb3I6I2ZmZjtmb250LXNpemU6MjVweDt3aWR0aDoyNXB4O2hlaWdodDoyNXB4fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBEYXRhc2V0T3B0aW9ucztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2hhbmdlZFNlbGVjdGVkRGF0YXNldHM6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblVwZGF0ZU9wdGlvbnM6IEV2ZW50RW1pdHRlcjxEYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdERhdGU6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNob3dHZW9tZXRyeTogRXZlbnRFbWl0dGVyPEdlb0pTT04uR2VvSnNvbk9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgcGxhdGZvcm1MYWJlbDogc3RyaW5nO1xuICAgIHB1YmxpYyBwaGVub21lbm9uTGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgcHJvY2VkdXJlTGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgY2F0ZWdvcnlMYWJlbDogc3RyaW5nO1xuICAgIHB1YmxpYyB1b206IHN0cmluZztcbiAgICBwdWJsaWMgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIGluZm9ybWF0aW9uVmlzaWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyB0ZW1wQ29sb3I6IHN0cmluZztcbiAgICBwdWJsaWMgaGFzRGF0YSA9IHRydWU7XG4gICAgcHVibGljIHJlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVbXTtcbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBkYXRhc2V0OiBJRGF0YXNldDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCBjb2xvcjogQ29sb3JTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgcmVmVmFsQ2FjaGU6IFJlZmVyZW5jZVZhbHVlQ29sb3JDYWNoZVxuICAgICkge1xuICAgICAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlcik7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuY2hhbmdlZFNlbGVjdGVkRGF0YXNldHMpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmNoYW5nZWRTZWxlY3RlZERhdGFzZXRzLmZpcnN0Q2hhbmdlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcy5jaGFuZ2VkU2VsZWN0ZWREYXRhc2V0cy5jdXJyZW50VmFsdWUuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVW9tU2VsZWN0aW9uKG9iai5pZCwgb2JqLmNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy50aW1lSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEYXRhSW5UaW1lc3BhbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluZm9ybWF0aW9uVmlzaWJsZSA9ICF0aGlzLmluZm9ybWF0aW9uVmlzaWJsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMganVtcFRvRmlyc3RUaW1lU3RhbXAoKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobmV3IERhdGUodGhpcy5kYXRhc2V0LmZpcnN0VmFsdWUudGltZXN0YW1wKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGp1bXBUb0xhc3RUaW1lU3RhbXAoKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobmV3IERhdGUodGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZS50aW1lc3RhbXApKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlID0gIXRoaXMuZGF0YXNldE9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlUmVmZXJlbmNlVmFsdWUocmVmVmFsdWU6IFJlZmVyZW5jZVZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gcmVmVmFsdWUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgIGNvbnN0IHJlZlZhbElkID0gdGhpcy5jcmVhdGVSZWZWYWxJZChyZWZWYWx1ZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICByZWZWYWx1ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWZWYWx1ZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5wdXNoKHsgaWQ6IHJlZlZhbHVlLnJlZmVyZW5jZVZhbHVlSWQsIGNvbG9yOiByZWZWYWx1ZS5jb2xvciB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkudmlzaWJsZSA9IHJlZlZhbHVlLnZpc2libGU7XG4gICAgICAgIHRoaXMub25VcGRhdGVPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5vbkVkaXRPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHZW9tZXRyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgICAgICAgIHRoaXMub25TaG93R2VvbWV0cnkuZW1pdCh0aGlzLmRhdGFzZXQuc3RhdGlvbi5nZW9tZXRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIERhdGFzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFBsYXRmb3JtKHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBsYXRmb3JtLmlkLCB0aGlzLmRhdGFzZXQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHBsYXRmb3JtLmdlb21ldHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmFwaS5nZXRTaW5nbGVUaW1lc2VyaWVzKGlkLCB1cmwpLnN1YnNjcmliZSgodGltZXNlcmllcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gdGltZXNlcmllcztcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVycygpO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldChpZCwgdXJsKS5zdWJzY3JpYmUoKGRhdGFzZXQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXQgPSBkYXRhc2V0O1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVycygpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFyYW1ldGVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIERhdGFzZXQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhdGZvcm1MYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBsYXRmb3JtLmxhYmVsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgICAgICAgIHRoaXMucGxhdGZvcm1MYWJlbCA9IHRoaXMuZGF0YXNldC5zdGF0aW9uLnByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waGVub21lbm9uTGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsO1xuICAgICAgICB0aGlzLnByb2NlZHVyZUxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucHJvY2VkdXJlLmxhYmVsO1xuICAgICAgICB0aGlzLmNhdGVnb3J5TGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbDtcbiAgICAgICAgdGhpcy5maXJzdFZhbHVlID0gdGhpcy5kYXRhc2V0LmZpcnN0VmFsdWU7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlID0gdGhpcy5kYXRhc2V0Lmxhc3RWYWx1ZTtcbiAgICAgICAgdGhpcy51b20gPSB0aGlzLmRhdGFzZXQudW9tO1xuICAgICAgICBpZiAodGhpcy5kYXRhc2V0LnJlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0LnJlZmVyZW5jZVZhbHVlcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVmFsSWQgPSB0aGlzLmNyZWF0ZVJlZlZhbElkKGUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVmFsT3B0aW9uID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzLmZpbmQoKG8pID0+IG8uaWQgPT09IGUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlZlZhbE9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZlZhbENhY2hlLnNldChyZWZWYWxJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZlZhbE9wdGlvbi5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWZWYWxDYWNoZS5oYXMocmVmVmFsSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmVmFsQ2FjaGUuc2V0KHJlZlZhbElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvci5nZXRDb2xvcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGUuY29sb3IgPSB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkuY29sb3I7XG4gICAgICAgICAgICAgICAgZS52aXNpYmxlID0gdGhpcy5yZWZWYWxDYWNoZS5nZXQocmVmVmFsSWQpLnZpc2libGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrRGF0YUluVGltZXNwYW4oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJlZlZhbElkKHJlZklkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldC51cmwgKyByZWZJZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGF0YUluVGltZXNwYW4oKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVJbnRlcnZhbCAmJiB0aGlzLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRGF0YSA9IHRoaXMudGltZVNydmMub3ZlcmxhcHMoXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0LmZpcnN0VmFsdWUudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldC5sYXN0VmFsdWUudGltZXN0YW1wXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19