/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Dataset, DatasetApiInterface, InternalIdHandler, Timeseries } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../../list-entry.component';
/**
 * Implements the abstract ListEntryComponent, which has the following functions:
 *  - can be selected and is selectable internally, with a corresponding output event
 *  - can be deleted, which also triggers an output event
 *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
 */
var SimpleTimeseriesEntryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleTimeseriesEntryComponent, _super);
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
export { SimpleTimeseriesEntryComponent };
if (false) {
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.dataset;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.platformLabel;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.phenomenonLabel;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.procedureLabel;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.categoryLabel;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.uom;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.api;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    SimpleTimeseriesEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQVksaUJBQWlCLEVBQW1CLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7OztJQW1CWiwwREFBa0I7SUFVcEUsd0NBQ1ksR0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLGFBQStCO1FBSDNDLFlBS0Usa0JBQU0saUJBQWlCLEVBQUUsYUFBYSxDQUFDLFNBQ3hDO1FBTFcsU0FBRyxHQUFILEdBQUcsQ0FBcUI7UUFDeEIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7O0tBRzFDOzs7OztJQUVTLG9EQUFXOzs7O0lBQXJCLFVBQXNCLElBQWE7UUFBbkMsaUJBVUM7O1FBVEMsSUFBTSxNQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQzthQUMxRSxTQUFTLENBQ1IsVUFBQyxVQUFVLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUEzQixDQUEyQixFQUMzQyxVQUFDLEtBQUs7WUFDSixLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7U0FDdkgsQ0FBQyxDQUFDO0tBQ1I7Ozs7O0lBRVMsbURBQVU7Ozs7SUFBcEIsVUFBcUIsVUFBb0I7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7O0lBRVMsc0RBQWE7OztJQUF2QjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDN0Q7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBWSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDOUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7S0FDN0I7O2dCQXpERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFLHFUQU1zQztvQkFDaEQsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7O2dCQXJCaUIsbUJBQW1CO2dCQUFZLGlCQUFpQjtnQkFDekQsZ0JBQWdCOzt5Q0FGekI7RUF1Qm9ELGtCQUFrQjtTQUF6RCw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXQsIERhdGFzZXRBcGlJbnRlcmZhY2UsIElEYXRhc2V0LCBJbnRlcm5hbElkSGFuZGxlciwgUGFyYW1ldGVyRmlsdGVyLCBUaW1lc2VyaWVzIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbGlzdC1lbnRyeS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEltcGxlbWVudHMgdGhlIGFic3RyYWN0IExpc3RFbnRyeUNvbXBvbmVudCwgd2hpY2ggaGFzIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zOlxuICogIC0gY2FuIGJlIHNlbGVjdGVkIGFuZCBpcyBzZWxlY3RhYmxlIGludGVybmFsbHksIHdpdGggYSBjb3JyZXNwb25kaW5nIG91dHB1dCBldmVudFxuICogIC0gY2FuIGJlIGRlbGV0ZWQsIHdoaWNoIGFsc28gdHJpZ2dlcnMgYW4gb3V0cHV0IGV2ZW50XG4gKiAgLSB0cmFuc2xhdGFibGUsIHNvIGl0IHRyaWdnZXJzIHRoZSBtZXRob2RlIG9uTGFuZ3VhZ2VDaGFuZ2VkIHdoZW4gdGhlIGxhbmd1YWdlIGlzIHN3aXRjaGVkXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1zaW1wbGUtdGltZXNlcmllcy1lbnRyeScsXG4gIHRlbXBsYXRlOiBgPHNwYW4+UGxhdGZvcm06IHt7cGxhdGZvcm1MYWJlbH19PC9zcGFuPlxuPHNwYW4+UGhlbm9tZW5vbjoge3twaGVub21lbm9uTGFiZWx9fTwvc3Bhbj5cbjxzcGFuPlByb2NlZHVyZToge3twcm9jZWR1cmVMYWJlbH19PC9zcGFuPlxuPHNwYW4+Q2F0ZWdvcnk6IHt7Y2F0ZWdvcnlMYWJlbH19PC9zcGFuPlxuPHNwYW4+VW9tOiB7e3VvbX19PC9zcGFuPlxuPGJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5zZWxlY3Q8L2J1dHRvbj5cbjxidXR0b24gKGNsaWNrKT1cInJlbW92ZURhdGFzZXQoKVwiPnJlbW92ZTwvYnV0dG9uPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgZXh0ZW5kcyBMaXN0RW50cnlDb21wb25lbnQge1xuXG4gIHB1YmxpYyBkYXRhc2V0OiBJRGF0YXNldDtcblxuICBwdWJsaWMgcGxhdGZvcm1MYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgcGhlbm9tZW5vbkxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBwcm9jZWR1cmVMYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgY2F0ZWdvcnlMYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgdW9tOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGludGVybmFsSWRIYW5kbGVyLCB0cmFuc2xhdGVTcnZjKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkRGF0YXNldChsYW5nPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICBpZiAobGFuZykgeyBwYXJhbXMubGFuZyA9IGxhbmc7IH1cbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXModGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAodGltZXNlcmllcykgPT4gdGhpcy5zZXREYXRhc2V0KHRpbWVzZXJpZXMpLFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KHRoaXMuaW50ZXJuYWxJZC5pZCwgdGhpcy5pbnRlcm5hbElkLnVybCwgcGFyYW1zKS5zdWJzY3JpYmUoKGRhdGFzZXQpID0+IHRoaXMuc2V0RGF0YXNldChkYXRhc2V0KSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldERhdGFzZXQodGltZXNlcmllczogSURhdGFzZXQpIHtcbiAgICB0aGlzLmRhdGFzZXQgPSB0aW1lc2VyaWVzO1xuICAgIHRoaXMuc2V0UGFyYW1ldGVycygpO1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFBhcmFtZXRlcnMoKSB7XG4gICAgaWYgKHRoaXMuZGF0YXNldCBpbnN0YW5jZW9mIERhdGFzZXQpIHtcbiAgICAgIHRoaXMucGxhdGZvcm1MYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBsYXRmb3JtLmxhYmVsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgdGhpcy5wbGF0Zm9ybUxhYmVsID0gdGhpcy5kYXRhc2V0LnN0YXRpb24ucHJvcGVydGllcy5sYWJlbDtcbiAgICB9XG4gICAgdGhpcy5waGVub21lbm9uTGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsO1xuICAgIHRoaXMucHJvY2VkdXJlTGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5wcm9jZWR1cmUubGFiZWw7XG4gICAgdGhpcy5jYXRlZ29yeUxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWw7XG4gICAgdGhpcy51b20gPSB0aGlzLmRhdGFzZXQudW9tO1xuICB9XG59XG4iXX0=