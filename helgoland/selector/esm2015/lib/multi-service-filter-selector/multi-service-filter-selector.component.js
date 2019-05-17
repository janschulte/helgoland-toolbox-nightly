/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, LanguageChangNotifier } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * @record
 */
export function MultiServiceFilter() { }
/** @type {?} */
MultiServiceFilter.prototype.url;
/** @type {?|undefined} */
MultiServiceFilter.prototype.filter;
/** @enum {string} */
const MultiServiceFilterEndpoint = {
    offering: 'offering',
    phenomenon: 'phenomenon',
    procedure: 'procedure',
    feature: 'feature',
    category: 'category',
    platform: 'platform',
    dataset: 'dataset',
};
export { MultiServiceFilterEndpoint };
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export class MultiServiceFilterSelectorComponent extends LanguageChangNotifier {
    /**
     * @param {?} apiInterface
     * @param {?} translate
     */
    constructor(apiInterface, translate) {
        super(translate);
        this.apiInterface = apiInterface;
        this.translate = translate;
        this.onItemSelected = new EventEmitter();
        this.loading = 0;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.loadItems();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onSelectItem(item) {
        this.onItemSelected.emit(item);
    }
    /**
     * @return {?}
     */
    languageChanged() {
        this.loadItems();
    }
    /**
     * @return {?}
     */
    loadItems() {
        this.items = [];
        this.filterList.forEach((entry) => {
            this.loading++;
            /** @type {?} */
            const filter = entry.filter || {};
            switch (this.endpoint) {
                case MultiServiceFilterEndpoint.offering:
                    this.apiInterface.getOfferings(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                case MultiServiceFilterEndpoint.phenomenon:
                    this.apiInterface.getPhenomena(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                case MultiServiceFilterEndpoint.procedure:
                    this.apiInterface.getProcedures(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                case MultiServiceFilterEndpoint.feature:
                    this.apiInterface.getFeatures(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                case MultiServiceFilterEndpoint.category:
                    this.apiInterface.getCategories(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                case MultiServiceFilterEndpoint.platform:
                    this.apiInterface.getPlatforms(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                case MultiServiceFilterEndpoint.dataset:
                    this.apiInterface.getDatasets(entry.url, filter).subscribe((res) => this.setItems(res, filter, entry.url, filter.service), (error) => this.errorOnLoading);
                    break;
                default:
                    console.error('Wrong endpoint: ' + this.endpoint);
                    this.loading--;
            }
        });
    }
    /**
     * @return {?}
     */
    errorOnLoading() {
        this.loading--;
    }
    /**
     * @param {?} res
     * @param {?} prevfilter
     * @param {?} url
     * @param {?} service
     * @return {?}
     */
    setItems(res, prevfilter, url, service) {
        this.loading--;
        res.forEach((entry) => {
            /** @type {?} */
            const filter = {
                filter: prevfilter,
                itemId: entry.id,
                url,
                service
            };
            /** @type {?} */
            const item = this.items.find((elem) => {
                if (elem.label === entry.label) {
                    return true;
                }
            });
            if (item) {
                item.filterList.push(filter);
            }
            else {
                entry.filterList = [filter];
                this.items.push(entry);
            }
        });
    }
}
MultiServiceFilterSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-multi-service-filter-selector',
                template: `<div *ngIf="loading > 0">
    <span>loading...</span>
</div>
<div *ngFor="let item of items" (click)="onSelectItem(item)">
    {{item.id}} - {{item.label}}
</div>`
            },] },
];
/** @nocollapse */
MultiServiceFilterSelectorComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: TranslateService }
];
MultiServiceFilterSelectorComponent.propDecorators = {
    endpoint: [{ type: Input }],
    filterList: [{ type: Input }],
    onItemSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.endpoint;
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.filterList;
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.onItemSelected;
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.loading;
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.items;
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.apiInterface;
    /** @type {?} */
    MultiServiceFilterSelectorComponent.prototype.translate;
}
/**
 * @record
 */
export function FilteredParameter() { }
/** @type {?|undefined} */
FilteredParameter.prototype.filterList;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VydmljZS1maWx0ZXItc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFVLHFCQUFxQixFQUE4QixNQUFNLGlCQUFpQixDQUFDO0FBQ2pILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7OztJQVFuRCxVQUFXLFVBQVU7SUFDckIsWUFBYSxZQUFZO0lBQ3pCLFdBQVksV0FBVztJQUN2QixTQUFVLFNBQVM7SUFDbkIsVUFBVyxVQUFVO0lBQ3JCLFVBQVcsVUFBVTtJQUNyQixTQUFVLFNBQVM7Ozs7OztBQWV2QixNQUFNLDBDQUEyQyxTQUFRLHFCQUFxQjs7Ozs7SUFjMUUsWUFDYyxZQUFpQyxFQUNqQyxTQUEyQjtRQUVyQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFIUCxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7OEJBUGdCLElBQUksWUFBWSxFQUFxQjt1QkFFN0UsQ0FBQztLQVFqQjs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7OztJQUdkLFlBQVksQ0FBQyxJQUF1QjtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHekIsZUFBZTtRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFTyxTQUFTO1FB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QUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2lCQUFFO2FBQ25ELENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0osQ0FBQyxDQUFDOzs7O1lBdkhWLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QyxRQUFRLEVBQUU7Ozs7O09BS1A7YUFDTjs7OztZQTdCUSxtQkFBbUI7WUFDbkIsZ0JBQWdCOzs7dUJBK0JwQixLQUFLO3lCQUdMLEtBQUs7NkJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIEZpbHRlciwgTGFuZ3VhZ2VDaGFuZ05vdGlmaWVyLCBQYXJhbWV0ZXIsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXVsdGlTZXJ2aWNlRmlsdGVyIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBmaWx0ZXI/OiBQYXJhbWV0ZXJGaWx0ZXI7XG59XG5cbmV4cG9ydCBlbnVtIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50IHtcbiAgICBvZmZlcmluZyA9ICdvZmZlcmluZycsXG4gICAgcGhlbm9tZW5vbiA9ICdwaGVub21lbm9uJyxcbiAgICBwcm9jZWR1cmUgPSAncHJvY2VkdXJlJyxcbiAgICBmZWF0dXJlID0gJ2ZlYXR1cmUnLFxuICAgIGNhdGVnb3J5ID0gJ2NhdGVnb3J5JyxcbiAgICBwbGF0Zm9ybSA9ICdwbGF0Zm9ybScsXG4gICAgZGF0YXNldCA9ICdkYXRhc2V0J1xufVxuXG4vKipcbiAqIENvbXBvbmVudCB0byBzZWxlY3QgYW4gaXRlbSBvdXQgb2YgYSBsaXN0IG9mIHByb3ZpZGVyIHdpdGggYSBnaXZlbiBmaWx0ZXIgY29tYmluYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLW11bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJsb2FkaW5nID4gMFwiPlxuICAgIDxzcGFuPmxvYWRpbmcuLi48L3NwYW4+XG48L2Rpdj5cbjxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIiAoY2xpY2spPVwib25TZWxlY3RJdGVtKGl0ZW0pXCI+XG4gICAge3tpdGVtLmlkfX0gLSB7e2l0ZW0ubGFiZWx9fVxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCBleHRlbmRzIExhbmd1YWdlQ2hhbmdOb3RpZmllciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBlbmRwb2ludDogTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXJMaXN0OiBNdWx0aVNlcnZpY2VGaWx0ZXJbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPEZpbHRlcmVkUGFyYW1ldGVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsdGVyZWRQYXJhbWV0ZXI+KCk7XG5cbiAgICBwdWJsaWMgbG9hZGluZyA9IDA7XG4gICAgcHVibGljIGl0ZW1zOiBGaWx0ZXJlZFBhcmFtZXRlcltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIodHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMubG9hZEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0SXRlbShpdGVtOiBGaWx0ZXJlZFBhcmFtZXRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkSXRlbXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRJdGVtcygpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmZpbHRlckxpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZysrO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZW50cnkuZmlsdGVyIHx8IHt9O1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5vZmZlcmluZzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0T2ZmZXJpbmdzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LnBoZW5vbWVub246XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFBoZW5vbWVuYShlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5wcm9jZWR1cmU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFByb2NlZHVyZXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQuZmVhdHVyZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RmVhdHVyZXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQuY2F0ZWdvcnk6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldENhdGVnb3JpZXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQucGxhdGZvcm06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFBsYXRmb3JtcyhlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5kYXRhc2V0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXREYXRhc2V0cyhlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignV3JvbmcgZW5kcG9pbnQ6ICcgKyB0aGlzLmVuZHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXJyb3JPbkxvYWRpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZGluZy0tO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXRlbXMocmVzOiBGaWx0ZXJlZFBhcmFtZXRlcltdLCBwcmV2ZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXIsIHVybDogc3RyaW5nLCBzZXJ2aWNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nLS07XG4gICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyOiBGaWx0ZXIgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBwcmV2ZmlsdGVyLFxuICAgICAgICAgICAgICAgIGl0ZW1JZDogZW50cnkuaWQsXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtcy5maW5kKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ubGFiZWwgPT09IGVudHJ5LmxhYmVsKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5maWx0ZXJMaXN0LnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZmlsdGVyTGlzdCA9IFtmaWx0ZXJdO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlcmVkUGFyYW1ldGVyIGV4dGVuZHMgUGFyYW1ldGVyIHtcbiAgICBmaWx0ZXJMaXN0PzogRmlsdGVyW107XG59XG4iXX0=