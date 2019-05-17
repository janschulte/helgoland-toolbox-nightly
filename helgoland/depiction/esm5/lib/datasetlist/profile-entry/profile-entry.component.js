/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, InternalIdHandler, PlatformTypes, Timespan, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../list-entry.component';
var ProfileEntryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProfileEntryComponent, _super);
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
export { ProfileEntryComponent };
if (false) {
    /** @type {?} */
    ProfileEntryComponent.prototype.datasetOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onUpdateOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onDeleteDatasetOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onEditOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onOpenInCombiView;
    /** @type {?} */
    ProfileEntryComponent.prototype.onShowGeometry;
    /** @type {?} */
    ProfileEntryComponent.prototype.dataset;
    /** @type {?} */
    ProfileEntryComponent.prototype.editableOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.tempColor;
    /** @type {?} */
    ProfileEntryComponent.prototype.api;
    /** @type {?} */
    ProfileEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    ProfileEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC9wcm9maWxlLWVudHJ5L3Byb2ZpbGUtZW50cnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBRUgsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUdqQixhQUFhLEVBRWIsUUFBUSxHQUNYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBd0NsQixpREFBa0I7SUF5QnpELCtCQUNjLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxhQUErQjtRQUg3QyxZQUtJLGtCQUFNLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxTQUMxQztRQUxhLFNBQUcsR0FBSCxHQUFHLENBQXFCO1FBQ3hCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWEsR0FBYixhQUFhLENBQWtCO2dDQXRCaUIsSUFBSSxZQUFZLEVBQUU7dUNBR2IsSUFBSSxZQUFZLEVBQUU7OEJBRzNCLElBQUksWUFBWSxFQUFFO2tDQUdkLElBQUksWUFBWSxFQUFFOytCQUduQixJQUFJLFlBQVksRUFBRTs7S0FhOUU7Ozs7O0lBRU0sb0RBQW9COzs7O2NBQUMsT0FBNEI7UUFDcEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7O0lBR3ZDLGtEQUFrQjs7OztjQUFDLE9BQTRCO1FBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFD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dEVYO0VBcUQyQyxrQkFBa0I7U0FBaEQscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldCxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5LFxuICAgIFBhcmFtZXRlckZpbHRlcixcbiAgICBQbGF0Zm9ybVR5cGVzLFxuICAgIFRpbWVkRGF0YXNldE9wdGlvbnMsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExpc3RFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL2xpc3QtZW50cnkuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItcHJvZmlsZS1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5cbiAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1oZWFkZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbUxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wbGF0Zm9ybS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPlxuICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPHNwYW4gKm5nSWY9XCJkYXRhc2V0Py51b21cIj5bXG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0LnVvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPl08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wcm9jZWR1cmUubGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIiAqbmdJZj1cImRhdGFzZXQ/LnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWwgIT0gZGF0YXNldD8ucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhc2V0T3B0aW9uc1wiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogaXRlbS5jb2xvcn1cIj57e2l0ZW0udGltZXN0YW1wIHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogaXRlbS52aXNpYmxlLCAnZmEtZXllJzogIWl0ZW0udmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlVmlzaWJpbGl0eShpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLnZpc2liaWxpdHknIHwgdHJhbnNsYXRlfX1cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdTdHlsZV09XCJ7Y29sb3I6IGl0ZW0uY29sb3J9XCJcbiAgICAgICAgdGl0bGU9XCJ7eydwcm9maWxlcy5sZWdlbmQuZWRpdC1zdHlsZScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiB0aXRsZT1cInt7J3Byb2ZpbGVzLmxlZ2VuZC5zaG93LWdlb21ldHJ5JyB8IHRyYW5zbGF0ZX19XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0T3B0aW9ucyhpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLmRlbGV0ZS1zdWJlbnRyeScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IChjbGljayk9XCJvcGVuSW5Db21iaVZpZXcoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiAqbmdJZj1cImlzTW9iaWxlKClcIiBjbGFzcz1cInRvQ29tYmlWaWV3XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWFycm93LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPHNwYW4+e3sncHJvZmlsZXMubGVnZW5kLmdvLXRvLWNvbWJpLXZpZXcnIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAubGVnZW5kSXRlbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLmxlZ2VuZEl0ZW0gLnNtYWxse2ZvbnQtc2l6ZTo5MCU7d29yZC1icmVhazpicmVhay1hbGx9Omhvc3QgLmxlZ2VuZEl0ZW0uc2VsZWN0ZWR7cGFkZGluZzowO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkfTpob3N0IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVye2N1cnNvcjpwb2ludGVyfTpob3N0IC5sZWdlbmRJdGVtIC50b0NvbWJpVmlld3tjdXJzb3I6cG9pbnRlcn06aG9zdCAubGVnZW5kSXRlbSAuZmF7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZUVudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9uc1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkRlbGV0ZURhdGFzZXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPFRpbWVkRGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uT3BlbkluQ29tYmlWaWV3OiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TaG93R2VvbWV0cnk6IEV2ZW50RW1pdHRlcjxHZW9KU09OLkdlb0pzb25PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgZWRpdGFibGVPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zO1xuICAgIHB1YmxpYyB0ZW1wQ29sb3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZURhdGFzZXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy52aXNpYmxlID0gIW9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb2JpbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQucGxhdGZvcm1UeXBlID09PSBQbGF0Zm9ybVR5cGVzLm1vYmlsZUluc2l0dTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5JbkNvbWJpVmlldyhvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbk9wZW5JbkNvbWJpVmlldy5lbWl0KG9wdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHZW9tZXRyeShvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxJZCA9IHRoaXMuaW50ZXJuYWxJZEhhbmRsZXIucmVzb2x2ZUludGVybmFsSWQodGhpcy5kYXRhc2V0SWQpO1xuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihvcHRpb24udGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFByb2ZpbGVEYXRhRW50cnk+KGludGVybmFsSWQuaWQsIGludGVybmFsSWQudXJsLCB0aW1lc3Bhbikuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHJlc3VsdC52YWx1ZXNbMF0uZ2VvbWV0cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0UGxhdGZvcm0odGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0uaWQsIGludGVybmFsSWQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHBsYXRmb3JtLmdlb21ldHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==