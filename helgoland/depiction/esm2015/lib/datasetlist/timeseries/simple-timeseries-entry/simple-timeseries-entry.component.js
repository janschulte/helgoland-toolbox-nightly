/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class SimpleTimeseriesEntryComponent extends ListEntryComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvdGltZXNlcmllcy9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS9zaW1wbGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBWSxpQkFBaUIsRUFBbUIsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUFtQmhFLE1BQU0scUNBQXNDLFNBQVEsa0JBQWtCOzs7Ozs7SUFVcEUsWUFDWSxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsYUFBK0I7UUFFekMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBSjlCLFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO0tBRzFDOzs7OztJQUVTLFdBQVcsQ0FBQyxJQUFhOztRQUNqQyxNQUFNLE1BQU0sR0FBb0IsRUFBRSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO2FBQzFFLFNBQVMsQ0FDUixDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFDM0MsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3ZILENBQUMsQ0FBQztLQUNSOzs7OztJQUVTLFVBQVUsQ0FBQyxVQUFvQjtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7S0FDdEI7Ozs7SUFFUyxhQUFhO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDN0Q7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBWSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDOUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7S0FDN0I7OztZQXpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFOzs7Ozs7a0RBTXNDO2dCQUNoRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQXJCaUIsbUJBQW1CO1lBQVksaUJBQWlCO1lBQ3pELGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldCwgRGF0YXNldEFwaUludGVyZmFjZSwgSURhdGFzZXQsIEludGVybmFsSWRIYW5kbGVyLCBQYXJhbWV0ZXJGaWx0ZXIsIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMaXN0RW50cnlDb21wb25lbnQgfSBmcm9tICcuLi8uLi9saXN0LWVudHJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgYWJzdHJhY3QgTGlzdEVudHJ5Q29tcG9uZW50LCB3aGljaCBoYXMgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBjYW4gYmUgc2VsZWN0ZWQgYW5kIGlzIHNlbGVjdGFibGUgaW50ZXJuYWxseSwgd2l0aCBhIGNvcnJlc3BvbmRpbmcgb3V0cHV0IGV2ZW50XG4gKiAgLSBjYW4gYmUgZGVsZXRlZCwgd2hpY2ggYWxzbyB0cmlnZ2VycyBhbiBvdXRwdXQgZXZlbnRcbiAqICAtIHRyYW5zbGF0YWJsZSwgc28gaXQgdHJpZ2dlcnMgdGhlIG1ldGhvZGUgb25MYW5ndWFnZUNoYW5nZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgc3dpdGNoZWRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXNpbXBsZS10aW1lc2VyaWVzLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGA8c3Bhbj5QbGF0Zm9ybToge3twbGF0Zm9ybUxhYmVsfX08L3NwYW4+XG48c3Bhbj5QaGVub21lbm9uOiB7e3BoZW5vbWVub25MYWJlbH19PC9zcGFuPlxuPHNwYW4+UHJvY2VkdXJlOiB7e3Byb2NlZHVyZUxhYmVsfX08L3NwYW4+XG48c3Bhbj5DYXRlZ29yeToge3tjYXRlZ29yeUxhYmVsfX08L3NwYW4+XG48c3Bhbj5Vb206IHt7dW9tfX08L3NwYW4+XG48YnV0dG9uIChjbGljayk9XCJ0b2dnbGVTZWxlY3Rpb24oKVwiPnNlbGVjdDwvYnV0dG9uPlxuPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlRGF0YXNldCgpXCI+cmVtb3ZlPC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCBleHRlbmRzIExpc3RFbnRyeUNvbXBvbmVudCB7XG5cbiAgcHVibGljIGRhdGFzZXQ6IElEYXRhc2V0O1xuXG4gIHB1YmxpYyBwbGF0Zm9ybUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBwaGVub21lbm9uTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHByb2NlZHVyZUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBjYXRlZ29yeUxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyB1b206IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9O1xuICAgIGlmIChsYW5nKSB7IHBhcmFtcy5sYW5nID0gbGFuZzsgfVxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyh0aGlzLmludGVybmFsSWQuaWQsIHRoaXMuaW50ZXJuYWxJZC51cmwsIHBhcmFtcylcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLnNldERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4gdGhpcy5zZXREYXRhc2V0KGRhdGFzZXQpKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0RGF0YXNldCh0aW1lc2VyaWVzOiBJRGF0YXNldCkge1xuICAgIHRoaXMuZGF0YXNldCA9IHRpbWVzZXJpZXM7XG4gICAgdGhpcy5zZXRQYXJhbWV0ZXJzKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0UGFyYW1ldGVycygpIHtcbiAgICBpZiAodGhpcy5kYXRhc2V0IGluc3RhbmNlb2YgRGF0YXNldCkge1xuICAgICAgdGhpcy5wbGF0Zm9ybUxhYmVsID0gdGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0ubGFiZWw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFzZXQgaW5zdGFuY2VvZiBUaW1lc2VyaWVzKSB7XG4gICAgICB0aGlzLnBsYXRmb3JtTGFiZWwgPSB0aGlzLmRhdGFzZXQuc3RhdGlvbi5wcm9wZXJ0aWVzLmxhYmVsO1xuICAgIH1cbiAgICB0aGlzLnBoZW5vbWVub25MYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWw7XG4gICAgdGhpcy5wcm9jZWR1cmVMYWJlbCA9IHRoaXMuZGF0YXNldC5wYXJhbWV0ZXJzLnByb2NlZHVyZS5sYWJlbDtcbiAgICB0aGlzLmNhdGVnb3J5TGFiZWwgPSB0aGlzLmRhdGFzZXQucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbDtcbiAgICB0aGlzLnVvbSA9IHRoaXMuZGF0YXNldC51b207XG4gIH1cbn1cbiJdfQ==