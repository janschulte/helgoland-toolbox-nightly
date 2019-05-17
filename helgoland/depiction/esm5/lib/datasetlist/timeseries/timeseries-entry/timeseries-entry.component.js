/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { ColorService, DatasetApiInterface, IdCache, InternalIdHandler, Time } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { FirstLatestTimeseriesEntryComponent, } from '../first-latest-timeseries-entry/first-latest-timeseries-entry.component';
var ReferenceValueColorCache = /** @class */ (function (_super) {
    tslib_1.__extends(ReferenceValueColorCache, _super);
    function ReferenceValueColorCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReferenceValueColorCache.decorators = [
        { type: Injectable },
    ];
    return ReferenceValueColorCache;
}(IdCache));
export { ReferenceValueColorCache };
/**
 * Extends the FirstLatestTimeseriesEntryComponent, with the following functions:
 *  - handles the reference values of the dataset entry
 */
var TimeseriesEntryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TimeseriesEntryComponent, _super);
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
export { TimeseriesEntryComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBa0IsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUNILG1DQUFtQyxHQUN0QyxNQUFNLDBFQUEwRSxDQUFDOztJQUdwQyxvREFBNEM7Ozs7O2dCQUR6RixVQUFVOzttQ0FSWDtFQVM4QyxPQUFPO1NBQXhDLHdCQUF3Qjs7Ozs7O0lBc0ZTLG9EQUFtQztJQUs3RSxrQ0FDYyxHQUF3QixFQUN4QixRQUFjLEVBQ2QsaUJBQW9DLEVBQ3BDLEtBQW1CLEVBQ25CLFdBQXFDLEVBQ3JDLGFBQStCO1FBTjdDLFlBUUksa0JBQU0sR0FBRyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsU0FDekQ7UUFSYSxTQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4QixjQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2QsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLGlCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUNyQyxtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7bUNBVGpCLEtBQUs7O0tBWWhDOzs7O0lBRU0sb0RBQWlCOzs7O1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FB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QyxHQUFHLEdBQUcsS0FBSyxDQUFDOzs7Z0JBM0l2QyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG80SUEwRVA7b0JBQ0gsTUFBTSxFQUFFLENBQUMsODNDQUE4M0MsQ0FBQztvQkFDeDRDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7OztnQkE3RnNCLG1CQUFtQjtnQkFBOEMsSUFBSTtnQkFBdkMsaUJBQWlCO2dCQUE3RCxZQUFZO2dCQXdHVSx3QkFBd0I7Z0JBdkc5QyxnQkFBZ0I7O21DQUZ6QjtFQStGOEMsbUNBQW1DO1NBQXBFLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0YWJsZSwgT25DaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlLCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBJZENhY2hlLCBJbnRlcm5hbElkSGFuZGxlciwgUmVmZXJlbmNlVmFsdWUsIFRpbWUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuLi9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlIGV4dGVuZHMgSWRDYWNoZTx7IGNvbG9yOiBzdHJpbmcsIHZpc2libGU6IGJvb2xlYW4gfT4geyB9XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsIHdpdGggdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBoYW5kbGVzIHRoZSByZWZlcmVuY2UgdmFsdWVzIG9mIHRoZSBkYXRhc2V0IGVudHJ5XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXRpbWVzZXJpZXMtZW50cnknLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIiBbbmdTdHlsZV09XCJ7J2JvcmRlci1jb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogc2VsZWN0ZWR9XCJcbiAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdGlvbigpXCI+XG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgPGRpdiBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBmYS0zeCBmYS1md1wiPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbWhlYWRlclwiIFtuZ0NsYXNzXT1cInsnaGlnaGxpZ2h0JzogaGlnaGxpZ2h0fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1MYWJlbFwiIFtuZ1N0eWxlXT1cInsnY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twbGF0Zm9ybUxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG4gICAgICAgIDwhLS0gPG41Mi1mYXZvcml0ZS10b2dnbGVyIFtkYXRhc2V0XT1cImRhdGFzZXRcIj48L241Mi1mYXZvcml0ZS10b2dnbGVyPiAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vRGF0YVdhcm5pbmcgZmlyc3RMYXN0RW50cnlcIiAqbmdJZj1cIiFoYXNEYXRhXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSByZWRcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbC1sYWJlbFwiPktlaW5lIERhdGVuIHZlcmbDvGdiYXI8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgKGNsaWNrKT1cImp1bXBUb0xhc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+U3ByaW5nZSB6dXIgbGV0enRlbiBNZXNzdW5nPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCI+XG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3twaGVub21lbm9uTGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ1b21cIj5cbiAgICAgICAgICA8c3Bhbj5bPC9zcGFuPlxuICAgICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3t1b219fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgICAgICA8c3Bhbj5dPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbWFsbC1sYWJlbFwiPlxuICAgICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7cHJvY2VkdXJlTGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNtYWxsLWxhYmVsXCIgKm5nSWY9XCJjYXRlZ29yeUxhYmVsICE9IHBoZW5vbWVub25MYWJlbFwiPlxuICAgICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7Y2F0ZWdvcnlMYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImxlZ2VuZGljb25zXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhXCIgW25nQ2xhc3NdPVwieydmYS1jaGV2cm9uLWRvd24nOiAhaW5mb3JtYXRpb25WaXNpYmxlLCAnZmEtY2hldnJvbi11cCc6IGluZm9ybWF0aW9uVmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlSW5mb3JtYXRpb24oKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJ7J2ZhLWV5ZS1zbGFzaCc6IGRhdGFzZXRPcHRpb25zPy52aXNpYmxlLCAnZmEtZXllJzogIWRhdGFzZXRPcHRpb25zPy52aXNpYmxlfVwiIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLW1hcC1tYXJrZXJcIiAoY2xpY2spPVwic2hvd0dlb21ldHJ5KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIFtuZ1N0eWxlXT1cIntjb2xvcjogZGF0YXNldE9wdGlvbnM/LmNvbG9yfVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZUxlZ2VuZEVudHJ5IHNtYWxsLWxhYmVsXCIgKm5nSWY9XCJpbmZvcm1hdGlvblZpc2libGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaXJzdExhc3RFbnRyeSBhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAqbmdJZj1cImZpcnN0VmFsdWVcIiAoY2xpY2spPVwianVtcFRvRmlyc3RUaW1lU3RhbXAoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgIDxzcGFuPkVyc3RlciBXZXJ0IGJlaTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e3tmaXJzdFZhbHVlLnRpbWVzdGFtcHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZWRpdW1cIj4oe3tmaXJzdFZhbHVlLnZhbHVlfX0ge3t1b219fSk8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaXJzdExhc3RFbnRyeSBhZGRpdGlvbmFsTGVnZW5kRW50cnlcIiAqbmdJZj1cImxhc3RWYWx1ZVwiIChjbGljayk9XCJqdW1wVG9MYXN0VGltZVN0YW1wKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICA8c3Bhbj5MZXR6dGVyIFdlcnQgYmVpPC9zcGFuPlxuICAgICAgICA8c3Bhbj57e2xhc3RWYWx1ZS50aW1lc3RhbXB8IGRhdGU6ICdzaG9ydCd9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRkZW4tbWVkaXVtXCI+KHt7bGFzdFZhbHVlLnZhbHVlfX0ge3t1b219fSk8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJkYXRhc2V0Py5yZWZlcmVuY2VWYWx1ZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxMZWdlbmRFbnRyeVwiICpuZ0Zvcj1cImxldCByZWYgb2YgZGF0YXNldC5yZWZlcmVuY2VWYWx1ZXNcIiAoY2xpY2spPVwidG9nZ2xlUmVmZXJlbmNlVmFsdWUocmVmKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHJlZi52aXNpYmxlfVwiIFtuZ1N0eWxlXT1cIntjb2xvcjogcmVmLmNvbG9yfVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj57e3JlZi5sYWJlbH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbExlZ2VuZEVudHJ5XCIgbmctY2xpY2s9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGNyZWF0ZUV4cG9ydENzdih0aW1lc2VyaWVzKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1kb3dubG9hZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiB0cmFuc2xhdGU9XCJleHBvcnQubGFiZWxcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsTGVnZW5kRW50cnlcIj5cbiAgICAgICAgICAgICAgICA8c3djLXByb2NlZHVyZS1tZXRhZGF0YSB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy1wcm9jZWR1cmUtbWV0YWRhdGE+XG4gICAgICAgICAgICAgICAgPHN3Yy10aW1lc2VyaWVzLXJhdy1kYXRhLW91dHB1dCB0aW1lc2VyaWVzPSd0aW1lc2VyaWVzJz48L3N3Yy10aW1lc2VyaWVzLXJhdy1kYXRhLW91dHB1dD5cbiAgICAgICAgICAgICAgICA8c3djLXNvcy11cmwgdGltZXNlcmllcz0ndGltZXNlcmllcyc+PC9zd2Mtc29zLXVybD5cbiAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuZ2VvbWV0cnlWaWV3ZXJNb2RhbCAubW9kYWwtYm9keXtoZWlnaHQ6NTB2aH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLnNtYWxsLWxhYmVse2ZvbnQtc2l6ZTo5MCU7d29yZC1icmVhazpicmVhay1hbGx9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0uc2VsZWN0ZWR7cGFkZGluZzowO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVye2N1cnNvcjpwb2ludGVyfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVyLmhpZ2hsaWdodHtmb250LXdlaWdodDo3MDB9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZGljb25zIHNwYW57bWFyZ2luOjAgNCU7Zm9udC1zaXplOjE1MCV9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZGljb25zIHNwYW46aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmxlZ2VuZGljb25zIC5kZWxldGV7ei1pbmRleDo1fW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5ub0RhdGFXYXJuaW5ne2JvcmRlcjoycHggc29saWQgcmVkO2JvcmRlci1yYWRpdXM6NXB4O3BhZGRpbmc6M3B4fW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5ub0RhdGFXYXJuaW5nIC5yZWR7Y29sb3I6cmVkfW41Mi10aW1lc2VyaWVzLWVudHJ5IC5sZWdlbmRJdGVtIC5hZGRpdGlvbmFsTGVnZW5kRW50cnk6aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLmFkZGl0aW9uYWxMZWdlbmRFbnRyeS5zZWxlY3RlZHtmb250LXdlaWdodDpib2xkZXJ9bjUyLXRpbWVzZXJpZXMtZW50cnkgLmxlZ2VuZEl0ZW0gLnJlZkVudHJ5LnNlbGVjdGVke2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MnB4O2JvcmRlci1yYWRpdXM6MnB4O21hcmdpbjoycHggMH1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubG9hZGluZy1vdmVybGF5e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO29wYWNpdHk6LjU7ei1pbmRleDoxO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn1uNTItdGltZXNlcmllcy1lbnRyeSAubGVnZW5kSXRlbSAubG9hZGluZy1vdmVybGF5IC5mYS1zcGlue2NvbG9yOiNmZmY7Zm9udC1zaXplOjI1cHg7d2lkdGg6MjVweDtoZWlnaHQ6MjVweH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIEZpcnN0TGF0ZXN0VGltZXNlcmllc0VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIHB1YmxpYyBpbmZvcm1hdGlvblZpc2libGUgPSBmYWxzZTtcbiAgICBwdWJsaWMgcmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZVtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIGNvbG9yOiBDb2xvclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCByZWZWYWxDYWNoZTogUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihhcGksIGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjLCB0aW1lU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluZm9ybWF0aW9uVmlzaWJsZSA9ICF0aGlzLmluZm9ybWF0aW9uVmlzaWJsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlUmVmZXJlbmNlVmFsdWUocmVmVmFsdWU6IFJlZmVyZW5jZVZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gcmVmVmFsdWUucmVmZXJlbmNlVmFsdWVJZCk7XG4gICAgICAgIGNvbnN0IHJlZlZhbElkID0gdGhpcy5jcmVhdGVSZWZWYWxJZChyZWZWYWx1ZS5yZWZlcmVuY2VWYWx1ZUlkKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICByZWZWYWx1ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWZWYWx1ZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5wdXNoKHsgaWQ6IHJlZlZhbHVlLnJlZmVyZW5jZVZhbHVlSWQsIGNvbG9yOiByZWZWYWx1ZS5jb2xvciB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZlZhbENhY2hlLmdldChyZWZWYWxJZCkudmlzaWJsZSA9IHJlZlZhbHVlLnZpc2libGU7XG4gICAgICAgIHRoaXMub25VcGRhdGVPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhcmFtZXRlcnMoKSB7XG4gICAgICAgIHN1cGVyLnNldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldC5yZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldC5yZWZlcmVuY2VWYWx1ZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZlZhbElkID0gdGhpcy5jcmVhdGVSZWZWYWxJZChlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZlZhbE9wdGlvbiA9IHRoaXMuZGF0YXNldE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcy5maW5kKChvKSA9PiBvLmlkID09PSBlLnJlZmVyZW5jZVZhbHVlSWQpO1xuICAgICAgICAgICAgICAgIGlmIChyZWZWYWxPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZWYWxDYWNoZS5zZXQocmVmVmFsSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZWZWYWxPcHRpb24uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVmVmFsQ2FjaGUuaGFzKHJlZlZhbElkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZlZhbENhY2hlLnNldChyZWZWYWxJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IuZ2V0Q29sb3IoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLmNvbG9yID0gdGhpcy5yZWZWYWxDYWNoZS5nZXQocmVmVmFsSWQpLmNvbG9yO1xuICAgICAgICAgICAgICAgIGUudmlzaWJsZSA9IHRoaXMucmVmVmFsQ2FjaGUuZ2V0KHJlZlZhbElkKS52aXNpYmxlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJlZlZhbElkKHJlZklkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldC51cmwgKyByZWZJZDtcbiAgICB9XG5cbn1cbiJdfQ==