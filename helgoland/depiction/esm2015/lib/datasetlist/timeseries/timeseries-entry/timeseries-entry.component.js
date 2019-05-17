/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { ColorService, DatasetApiInterface, IdCache, InternalIdHandler, Time } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { FirstLatestTimeseriesEntryComponent, } from '../first-latest-timeseries-entry/first-latest-timeseries-entry.component';
export class ReferenceValueColorCache extends IdCache {
}
ReferenceValueColorCache.decorators = [
    { type: Injectable },
];
/**
 * Extends the FirstLatestTimeseriesEntryComponent, with the following functions:
 *  - handles the reference values of the dataset entry
 */
export class TimeseriesEntryComponent extends FirstLatestTimeseriesEntryComponent {
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
if (false) {
    /** @type {?} */
    TimeseriesEntryComponent.prototype.informationVisible;
    /** @type {?} */
    TimeseriesEntryComponent.prototype.referenceValues;
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
    /** @type {?} */
    TimeseriesEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFrQixJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQ0gsbUNBQW1DLEdBQ3RDLE1BQU0sMEVBQTBFLENBQUM7QUFHbEYsTUFBTSwrQkFBZ0MsU0FBUSxPQUE0Qzs7O1lBRHpGLFVBQVU7Ozs7OztBQXVGWCxNQUFNLCtCQUFnQyxTQUFRLG1DQUFtQzs7Ozs7Ozs7O0lBSzdFLFlBQ2MsR0FBd0IsRUFDeEIsUUFBYyxFQUNkLGlCQUFvQyxFQUNwQyxLQUFtQixFQUNuQixXQUFxQyxFQUNyQyxhQUErQjtRQUV6QyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQVA3QyxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUNyQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7a0NBVGpCLEtBQUs7S0FZaEM7Ozs7SUFFTSxpQkFBaUI7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFH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dkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwRVA7Z0JBQ0gsTUFBTSxFQUFFLENBQUMsODNDQUE4M0MsQ0FBQztnQkFDeDRDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7O1lBN0ZzQixtQkFBbUI7WUFBOEMsSUFBSTtZQUF2QyxpQkFBaUI7WUFBN0QsWUFBWTtZQXdHVSx3QkFBd0I7WUF2RzlDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0YWJsZSwgT25DaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlLCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBJZENhY2hlLCBJbnRlcm5hbElkSGFuZGxlciwgUmVmZXJlbmNlVmFsdWUsIFRpbWUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuLi9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlIGV4dGVuZHMgSWRDYWNoZTx7IGNvbG9yOiBzdHJpbmcsIHZpc2libGU6IGJvb2xlYW4gfT4geyB9XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsIHdpdGggdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBoYW5kbGVzIHRoZSByZWZlcmVuY2UgdmFsdWVzIG9mIHRoZSBkYXRhc2V0IGVudHJ5XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXRpbWVzZXJpZXMtZW50cnknLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIiBbbmdTdHlsZV09XCJ7J2JvcmRlci1jb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogc2VsZWN0ZWR9XCJcbiAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+XG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgPGRpdiBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBmYS0zeCBmYS1md1wiPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbWhlYWRlclwiIFtuZ0NsYXNzXT1cInsnaGlnaGxpZ2h0JzogaGlnaGxpZ2h0fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1MYWJlbFwiIFtuZ1N0eWxlXT1cInsnY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twbGF0Zm9ybUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICAgIDwhLS0gPG41Mi1mYXZvcml0ZS10b2dnbGVyIFtkYXRhc2V0XT1cImRhdGFzZXRcIj48L241Mi1mYXZvcml0ZS10b2dnbGVyPiAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vRGF0YVdhcm5pbmcgZmlyc3RMYXN0RW50cnlcIiAqbmdJZj1cIiFoYXNEYXRhXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSByZWRcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbC1sYWJlbFwiPktlaW5lIERhdGVuIHZlcmbDvGdiYXI8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+U3ByaW5nZSB6dXIgbGV0enRlbiBNZXNzdW5nPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twaGVub21lbm9uTGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ1b21cIj5cbiAgICAgICAgICA8c3Bhbj5bPC9zcGFuPlxuICAgICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3t1b219fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgICAgICA8c3Bhbj5dPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbWFsbC1sYWJlbFwiPlxuICAgICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7cHJvY2VkdXJlTGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCIgKm5nSWY9XCJjYXRlZ29yeUxhYmVsICE9IHBoZW5vbWVub25MYWJlbFwiPlxuICAgICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7Y2F0ZWdvcnlMYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImxlZ2VuZGljb25zXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhXCIgW25nQ2xhc3NdPVwieydmYS1jaGV2cm9uLWRvd24nOiAhaW5mb3JtYXRpb25WaXNpYmxlLCAnZmEtY2hldnJvbi11cCc6IGluZm9ybWF0aW9uVmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlSW5mb3JtYXRpb24oKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJ7J2ZhLWV5ZS1zbGFzaCc6IGRhdGFzZXRPcHRpb25zPy52aXNpYmxlLCAnZmEtZXllJzogIWRhdGFzZXRPcHRpb25zPy52aXNpYmxlfVwiIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLW1hcC1tYXJrZXJcIiAoY2xpY2spPVwic2hvd0dlb21ldHJ5KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIFtuZ1N0eWxlXT1cIntjb2xvcjogZGF0YXNldE9wdGlvbnM/LmNvbG9yfVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZUxlZ2VuZEVudHJ5IHNtYWxsLWxhYmVsXCIgKm5nSWY9XCJpbmZvcm1hdGlvblZpc2libGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaXJzdExhc3RFbnRyeSBhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAqbmdJZj1cImZpcnN0VmFsdWVcIiAoY2xpY2spPVwianVtcFRvRmlyc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuPkVyc3RlciBXZXJ0IGJlaTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e3tmaXJzdFZhbHVlLnRpbWVzdGFtcHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZWRpdW1cIj4oe3tmaXJzdFZhbHVlLnZhbHVlfX0ge3t1b219fSk8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaXJzdExhc3RFbnRyeSBhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAqbmdJZj1cImxhc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9MYXN0VGltZVN0YW1wKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICA8c3Bhbj5MZXR6dGVyIFdlcnQgYmVpPC9zcGFuPlxuICAgICAgICA8c3Bhbj57e2xhc3RWYWx1ZS50aW1lc3RhbXB8IGRhdGU6ICdzaG9ydCd9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRkZW4tbWVkaXVtXCI+KHt7bGFzdFZhbHVlLnZhbHVlfX0ge3t1b219fSk8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJkYXRhc2V0Py5yZWZlcmVuY2VWYWx1ZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0Zvcj1cImxldCByZWYgb2YgZGF0YXNldC5yZWZlcmVuY2VWYWx1ZXNcIiAoY2xpY2spPVwidG9nZ2xlUmVmZXJlbmNlVmFsdWUocmVmKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHJlZi52aXNpYmxlfVwiIFtuZ1N0eWxlXT1cIntjb2xvcjogcmVmLmNvbG9yfVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj57e3JlZi5sYWJlbH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgbmctY2xpY2s9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGNyZWF0ZUV4cG9ydENzdih0aW1lc2VyaWVzKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1kb3dubG9hZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiB0cmFuc2xhdGU9XCJleHBvcnQubGFiZWxcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIj5cbiAgICAgICAgICAgICAgICA8c3djLXByb2NlZHVyZS1tZXRhZGF0YSB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy1wcm9jZWR1cmUtbWV0YWRhdGE+XG4gICAgICAgICAgICAgICAgPHN3Yy10aW1lc2VyaWVzLXJhdy1kYXRhLW91dHB1dCB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy10aW1lc2VyaWVzLXJhdy1kYXRhLW91dHB1dD5cbiAgICAgICAgICAgICAgICA8c3djLXNvcy11cmwgdGltZXNlcmllcz0ndGltZXNlcmllcyc+PC9zd2Mtc29zLXVybD5cbiAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuZ2VvbWV0cnlWaWV3ZXJNb2RhbCAubW9kYWwtYm9keXtoZWlnaHQ6NTB2aH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLnNtYWxsLWxhYmVse2ZvbnQtc2l6ZTo5MCU7d29yZC1icmVhazpicmVhay1hbGx9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0uc2VsZWN0ZWR7cGFkZGluZzowO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVye2N1cnNvcjpwb2ludGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVyLmhpZ2hsaWdodHtmb250LXdlaWdodDo3MDB9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZGljb25zIHNwYW57bWFyZ2luOjAgNCU7Zm9udC1zaXplOjE1MCV9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZGljb25zIHNwYW46aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZGljb25zIC5kZWxldGV7ei1pbmRleDo1fW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5ub0RhdGFXYXJuaW5ne2JvcmRlcjoycHggc29saWQgcmVkO2JvcmRlci1yYWRpdXM6NXB4O3BhZGRpbmc6M3B4fW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5ub0RhdGFXYXJuaW5nIC5yZWR7Y29sb3I6cmVkfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5hZGRpdGlvbmFsTGVnZW5kRW50cnk6aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmFkZGl0aW9uYWxMZWdlbmRFbnRyeS5zZWxlY3RlZHtmb250LXdlaWdodDpib2xkZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLnJlZkVudHJ5LnNlbGVjdGVke2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MnB4O2JvcmRlci1yYWRpdXM6MnB4O21hcmdpbjoycHggMH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubG9hZGluZy1vdmVybGF5e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO29wYWNpdHk6LjU7ei1pbmRleDoxO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubG9hZGluZy1vdmVybGF5IC5mYS1zcGlue2NvbG9yOiNmZmY7Zm9udC1zaXplOjI1cHg7d2lkdGg6MjVweDtoZWlnaHQ6MjVweH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIHB1YmxpYyBpbmZvcm1hdGlvblZpc2libGUgPSBmYWxzZTtcbiAgICBwdWJsaWMgcmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZVtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIGNvbG9yOiBDb2xvclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCByZWZWYWxDYWNoZTogUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihhcGksIGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjLCB0aW1lU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluZm9ybWF0aW9uVmlzaWJsZSA9ICF0aGlzLmluZm9ybWF0aW9uVmlzaWJsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlUmVmZXJlbmNlVmFsdWUocmVmVmFsdWU6IFJlZmVyZW5jZVZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gcmVmVmFsdWUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgIGNvbnN0IHJlZlZhbElkID0gdGhpcy5jcmVhdGVSZWZWYWxJZChyZWZWYWx1ZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICByZWZWYWx1ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWZWYWx1ZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5wdXNoKHsgaWQ6IHJlZlZhbHVlLnJlZmVyZW5jZVZhbHVlSWQsIGNvbG9yOiByZWZWYWx1ZS5jb2xvciB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkudmlzaWJsZSA9IHJlZlZhbHVlLnZpc2libGU7XG4gICAgICAgIHRoaXMub25VcGRhdGVPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlcnMoKSB7XG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldC5yZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldC5yZWZlcmVuY2VWYWx1ZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZlZhbElkID0gdGhpcy5jcmVhdGVSZWZWYWxJZChlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZlZhbE9wdGlvbiA9IHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5maW5kKChvKSA9PiBvLmlkID09PSBlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICAgICAgICAgIGlmIChyZWZWYWxPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZWYWxDYWNoZS5zZXQocmVmVmFsSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZWZWYWxPcHRpb24uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVmVmFsQ2FjaGUuaGFzKHJlZlZhbElkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZlZhbENhY2hlLnNldChyZWZWYWxJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IuZ2V0Q29sb3IoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLmNvbG9yID0gdGhpcy5yZWZWYWxDYWNoZS5nZXQocmVmVmFsSWQpLmNvbG9yO1xuICAgICAgICAgICAgICAgIGUudmlzaWJsZSA9IHRoaXMucmVmVmFsQ2FjaGUuZ2V0KHJlZlZhbElkKS52aXNpYmxlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJlZlZhbElkKHJlZklkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldC51cmwgKyByZWZJZDtcbiAgICB9XG5cbn1cbiJdfQ==