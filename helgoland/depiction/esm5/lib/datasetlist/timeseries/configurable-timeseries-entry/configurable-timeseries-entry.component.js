/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dataset, DatasetApiInterface, DatasetOptions, InternalIdHandler, Timeseries } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { SimpleTimeseriesEntryComponent } from '../simple-timeseries-entry/simple-timeseries-entry.component';
/**
 * Extends the SimpleTimeseriesEntryComponent, with the following functions:
 *  - dataset options and triggers the editation of the dataset options
 *  - triggers the show geometry event
 */
var ConfigurableTimeseriesEntryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ConfigurableTimeseriesEntryComponent, _super);
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
export { ConfigurableTimeseriesEntryComponent };
if (false) {
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.datasetOptions;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.highlight;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.onUpdateOptions;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.onEditOptions;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.onShowGeometry;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.api;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    ConfigurableTimeseriesEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDOzs7Ozs7O0lBcUJwRCxnRUFBOEI7SUFpQnRGLDhDQUNZLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxhQUErQjtRQUgzQyxZQUtFLGtCQUFNLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsU0FDN0M7UUFMVyxTQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4Qix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG1CQUFhLEdBQWIsYUFBYSxDQUFrQjtnQ0FYWSxJQUFJLFlBQVksRUFBRTs4QkFHcEIsSUFBSSxZQUFZLEVBQUU7K0JBR1YsSUFBSSxZQUFZLEVBQUU7O0tBUTlFOzs7O0lBRU0sK0RBQWdCOzs7O1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7OztJQUcxQyxpRUFBa0I7Ozs7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7OztJQUd4QywyREFBWTs7Ozs7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBWSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxRQUFRO2dCQUM3RixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0MsQ0FBQyxDQUFDO1NBQ0o7OztnQkF4REosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLFFBQVEsRUFBRSw2ZkFTNEM7b0JBQ3RELE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7OztnQkF2QmlCLG1CQUFtQjtnQkFBa0IsaUJBQWlCO2dCQUMvRCxnQkFBZ0I7OztpQ0F5QnRCLEtBQUs7NEJBR0wsS0FBSztrQ0FHTCxNQUFNO2dDQUdOLE1BQU07aUNBR04sTUFBTTs7K0NBdkNUO0VBeUIwRCw4QkFBOEI7U0FBM0Usb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXQsIERhdGFzZXRBcGlJbnRlcmZhY2UsIERhdGFzZXRPcHRpb25zLCBJbnRlcm5hbElkSGFuZGxlciwgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LCB3aXRoIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gZGF0YXNldCBvcHRpb25zIGFuZCB0cmlnZ2VycyB0aGUgZWRpdGF0aW9uIG9mIHRoZSBkYXRhc2V0IG9wdGlvbnNcbiAqICAtIHRyaWdnZXJzIHRoZSBzaG93IGdlb21ldHJ5IGV2ZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+UGxhdGZvcm06IHt7cGxhdGZvcm1MYWJlbH19PC9zcGFuPlxuPHNwYW4+UGhlbm9tZW5vbjoge3twaGVub21lbm9uTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlByb2NlZHVyZToge3twcm9jZWR1cmVMYWJlbH19PC9zcGFuPlxuPHNwYW4+Q2F0ZWdvcnk6IHt7Y2F0ZWdvcnlMYWJlbH19PC9zcGFuPlxuPHNwYW4+VW9tOiB7e3VvbX19PC9zcGFuPlxuPGJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj50b2dnbGUgc2VsZWN0aW9uPC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJyZW1vdmVEYXRhc2V0KClcIj5yZW1vdmU8L2J1dHRvbj5cbjxidXR0b24gKGNsaWNrKT1cInRvZ2dsZVZpc2liaWxpdHkoKVwiPnRvZ2dsZSB2aXNpYmlsaXR5PC9idXR0b24+XG48YnV0dG9uIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoKVwiPmVkaXQgT3B0aW9uczwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwic2hvd0dlb21ldHJ5KClcIj5zaG93IEdlb21ldHJ5PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBEYXRhc2V0T3B0aW9ucztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaGlnaGxpZ2h0OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8RGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uU2hvd0dlb21ldHJ5OiBFdmVudEVtaXR0ZXI8R2VvSlNPTi5HZW9Kc29uT2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoYXBpLCBpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnZpc2libGUgPSAhdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlO1xuICAgIHRoaXMub25VcGRhdGVPcHRpb25zLmVtaXQodGhpcy5kYXRhc2V0T3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZWRpdERhdGFzZXRPcHRpb25zKCkge1xuICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHNob3dHZW9tZXRyeSgpIHtcbiAgICBpZiAodGhpcy5kYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHRoaXMuZGF0YXNldC5zdGF0aW9uLmdlb21ldHJ5KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIERhdGFzZXQpIHtcbiAgICAgIHRoaXMuYXBpLmdldFBsYXRmb3JtKHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBsYXRmb3JtLmlkLCB0aGlzLmRhdGFzZXQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgIHRoaXMub25TaG93R2VvbWV0cnkuZW1pdChwbGF0Zm9ybS5nZW9tZXRyeSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIl19