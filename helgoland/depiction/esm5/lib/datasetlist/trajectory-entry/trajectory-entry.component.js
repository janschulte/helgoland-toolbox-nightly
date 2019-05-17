/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, DatasetOptions, InternalIdHandler } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../list-entry.component';
var TrajectoryEntryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TrajectoryEntryComponent, _super);
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
export { TrajectoryEntryComponent };
if (false) {
    /** @type {?} */
    TrajectoryEntryComponent.prototype.datasetOptions;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.onUpdateOptions;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.onEditOptions;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.dataset;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.tempColor;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.api;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhamVjdG9yeS1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQVcsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLGlCQUFpQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQWNmLG9EQUFrQjtJQWU1RCxrQ0FDYyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsYUFBK0I7UUFIN0MsWUFLSSxrQkFBTSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsU0FDMUM7UUFMYSxTQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4Qix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG1CQUFhLEdBQWIsYUFBYSxDQUFrQjtnQ0FaVSxJQUFJLFlBQVksRUFBRTs4QkFHcEIsSUFBSSxZQUFZLEVBQUU7O0tBWXRFOzs7O0lBRU0sbURBQWdCOzs7O1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7SUFHNUMscURBQWtCOzs7O2NBQUMsT0FBdUI7UUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztJQUczQiw4Q0FBVzs7OztJQUFyQixVQUFzQixJQUFhO1FBQW5DLGlCQVFDOztRQVBHLElBQU0sTUFBTSxHQUFvQixFQUFFLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBTztZQUNuRixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjs7Z0JBcERKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsd2pCQVFQO2lCQUNOOzs7O2dCQWhCaUIsbUJBQW1CO2dCQUFrQixpQkFBaUI7Z0JBQy9ELGdCQUFnQjs7O2lDQWtCcEIsS0FBSztrQ0FHTCxNQUFNO2dDQUdOLE1BQU07O21DQTFCWDtFQWtCOEMsa0JBQWtCO1NBQW5ELHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBEYXRhc2V0T3B0aW9ucywgSW50ZXJuYWxJZEhhbmRsZXIsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExpc3RFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL2xpc3QtZW50cnkuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItdHJhamVjdG9yeS1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IHN0eWxlPVwid2hpdGUtc3BhY2U6IG5vd3JhcDtcIiAoY2xpY2spPVwidG9nZ2xlVmlzaWJpbGl0eSgpXCI+XG4gIDxzcGFuPlxuICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1saWdodFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1wbHVzXCIgW25nQ2xhc3NdPVwieydmYS1leWUnOiAhZGF0YXNldE9wdGlvbnM/LnZpc2libGUsICdmYS1leWUtc2xhc2gnOiBkYXRhc2V0T3B0aW9ucz8udmlzaWJsZX1cIj48L3NwYW4+XG4gICAgPC9hPlxuICA8L3NwYW4+XG4gIDxzcGFuIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAxMHB4O1wiIFtuZ1N0eWxlXT1cInsnY29sb3InOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+e3tkYXRhc2V0Py5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWx9fTwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJmYSBmYS1wZW5jaWxcIiAoY2xpY2spPVwiZWRpdERhdGFzZXRPcHRpb25zKGRhdGFzZXRPcHRpb25zKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIFtuZ1N0eWxlXT1cIntjb2xvcjogZGF0YXNldE9wdGlvbnM/LmNvbG9yfVwiPjwvc3Bhbj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBEYXRhc2V0T3B0aW9ucztcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblVwZGF0ZU9wdGlvbnM6IEV2ZW50RW1pdHRlcjxEYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBkYXRhc2V0OiBEYXRhc2V0O1xuXG4gICAgcHVibGljIHRlbXBDb2xvcjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlID0gIXRoaXMuZGF0YXNldE9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZWRpdERhdGFzZXRPcHRpb25zKG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsb2FkRGF0YXNldChsYW5nPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmFtczogUGFyYW1ldGVyRmlsdGVyID0ge307XG4gICAgICAgIGlmIChsYW5nKSB7IHBhcmFtcy5sYW5nID0gbGFuZzsgfVxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KHRoaXMuaW50ZXJuYWxJZC5pZCwgdGhpcy5pbnRlcm5hbElkLnVybCwgcGFyYW1zKS5zdWJzY3JpYmUoKGRhdGFzZXQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldCA9IGRhdGFzZXQ7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=