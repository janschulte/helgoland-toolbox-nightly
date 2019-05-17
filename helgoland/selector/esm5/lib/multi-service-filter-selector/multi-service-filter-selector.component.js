/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var MultiServiceFilterEndpoint = {
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
var MultiServiceFilterSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MultiServiceFilterSelectorComponent, _super);
    function MultiServiceFilterSelectorComponent(apiInterface, translate) {
        var _this = _super.call(this, translate) || this;
        _this.apiInterface = apiInterface;
        _this.translate = translate;
        _this.onItemSelected = new EventEmitter();
        _this.loading = 0;
        return _this;
    }
    /**
     * @return {?}
     */
    MultiServiceFilterSelectorComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.loadItems();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MultiServiceFilterSelectorComponent.prototype.onSelectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.onItemSelected.emit(item);
    };
    /**
     * @return {?}
     */
    MultiServiceFilterSelectorComponent.prototype.languageChanged = /**
     * @return {?}
     */
    function () {
        this.loadItems();
    };
    /**
     * @return {?}
     */
    MultiServiceFilterSelectorComponent.prototype.loadItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.items = [];
        this.filterList.forEach(function (entry) {
            _this.loading++;
            /** @type {?} */
            var filter = entry.filter || {};
            switch (_this.endpoint) {
                case MultiServiceFilterEndpoint.offering:
                    _this.apiInterface.getOfferings(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                case MultiServiceFilterEndpoint.phenomenon:
                    _this.apiInterface.getPhenomena(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                case MultiServiceFilterEndpoint.procedure:
                    _this.apiInterface.getProcedures(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                case MultiServiceFilterEndpoint.feature:
                    _this.apiInterface.getFeatures(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                case MultiServiceFilterEndpoint.category:
                    _this.apiInterface.getCategories(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                case MultiServiceFilterEndpoint.platform:
                    _this.apiInterface.getPlatforms(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                case MultiServiceFilterEndpoint.dataset:
                    _this.apiInterface.getDatasets(entry.url, filter).subscribe(function (res) { return _this.setItems(res, filter, entry.url, filter.service); }, function (error) { return _this.errorOnLoading; });
                    break;
                default:
                    console.error('Wrong endpoint: ' + _this.endpoint);
                    _this.loading--;
            }
        });
    };
    /**
     * @return {?}
     */
    MultiServiceFilterSelectorComponent.prototype.errorOnLoading = /**
     * @return {?}
     */
    function () {
        this.loading--;
    };
    /**
     * @param {?} res
     * @param {?} prevfilter
     * @param {?} url
     * @param {?} service
     * @return {?}
     */
    MultiServiceFilterSelectorComponent.prototype.setItems = /**
     * @param {?} res
     * @param {?} prevfilter
     * @param {?} url
     * @param {?} service
     * @return {?}
     */
    function (res, prevfilter, url, service) {
        var _this = this;
        this.loading--;
        res.forEach(function (entry) {
            /** @type {?} */
            var filter = {
                filter: prevfilter,
                itemId: entry.id,
                url: url,
                service: service
            };
            /** @type {?} */
            var item = _this.items.find(function (elem) {
                if (elem.label === entry.label) {
                    return true;
                }
            });
            if (item) {
                item.filterList.push(filter);
            }
            else {
                entry.filterList = [filter];
                _this.items.push(entry);
            }
        });
    };
    MultiServiceFilterSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-multi-service-filter-selector',
                    template: "<div *ngIf=\"loading > 0\">\n    <span>loading...</span>\n</div>\n<div *ngFor=\"let item of items\" (click)=\"onSelectItem(item)\">\n    {{item.id}} - {{item.label}}\n</div>"
                },] },
    ];
    /** @nocollapse */
    MultiServiceFilterSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface },
        { type: TranslateService }
    ]; };
    MultiServiceFilterSelectorComponent.propDecorators = {
        endpoint: [{ type: Input }],
        filterList: [{ type: Input }],
        onItemSelected: [{ type: Output }]
    };
    return MultiServiceFilterSelectorComponent;
}(LanguageChangNotifier));
export { MultiServiceFilterSelectorComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VydmljZS1maWx0ZXItc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBVSxxQkFBcUIsRUFBOEIsTUFBTSxpQkFBaUIsQ0FBQztBQUNqSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7SUFRbkQsVUFBVyxVQUFVO0lBQ3JCLFlBQWEsWUFBWTtJQUN6QixXQUFZLFdBQVc7SUFDdkIsU0FBVSxTQUFTO0lBQ25CLFVBQVcsVUFBVTtJQUNyQixVQUFXLFVBQVU7SUFDckIsU0FBVSxTQUFTOzs7Ozs7O0lBZWtDLCtEQUFxQjtJQWMxRSw2Q0FDYyxZQUFpQyxFQUNqQyxTQUEyQjtRQUZ6QyxZQUlJLGtCQUFNLFNBQVMsQ0FBQyxTQUNuQjtRQUphLGtCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxlQUFTLEdBQVQsU0FBUyxDQUFrQjsrQkFQZ0IsSUFBSSxZQUFZLEVBQXFCO3dCQUU3RSxDQUFDOztLQVFqQjs7OztJQUVNLHlEQUFXOzs7O1FBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7Ozs7SUFHZCwwREFBWTs7OztjQUFDLElBQXVCO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQUd6Qiw2REFBZTs7O0lBQXpCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3BCOzs7O0lBRU8sdURBQVM7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RUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsR0FBRyxLQUFBO2dCQUNILE9BQU8sU0FBQTthQUNWLENBQUM7O1lBQ0YsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQUU7YUFDbkQsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7U0FDSixDQUFDLENBQUM7OztnQkF2SFYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLFFBQVEsRUFBRSwrS0FLUDtpQkFDTjs7OztnQkE3QlEsbUJBQW1CO2dCQUNuQixnQkFBZ0I7OzsyQkErQnBCLEtBQUs7NkJBR0wsS0FBSztpQ0FHTCxNQUFNOzs4Q0F2Q1g7RUErQnlELHFCQUFxQjtTQUFqRSxtQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlLCBGaWx0ZXIsIExhbmd1YWdlQ2hhbmdOb3RpZmllciwgUGFyYW1ldGVyLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE11bHRpU2VydmljZUZpbHRlciB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgZmlsdGVyPzogUGFyYW1ldGVyRmlsdGVyO1xufVxuXG5leHBvcnQgZW51bSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludCB7XG4gICAgb2ZmZXJpbmcgPSAnb2ZmZXJpbmcnLFxuICAgIHBoZW5vbWVub24gPSAncGhlbm9tZW5vbicsXG4gICAgcHJvY2VkdXJlID0gJ3Byb2NlZHVyZScsXG4gICAgZmVhdHVyZSA9ICdmZWF0dXJlJyxcbiAgICBjYXRlZ29yeSA9ICdjYXRlZ29yeScsXG4gICAgcGxhdGZvcm0gPSAncGxhdGZvcm0nLFxuICAgIGRhdGFzZXQgPSAnZGF0YXNldCdcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgdG8gc2VsZWN0IGFuIGl0ZW0gb3V0IG9mIGEgbGlzdCBvZiBwcm92aWRlciB3aXRoIGEgZ2l2ZW4gZmlsdGVyIGNvbWJpbmF0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibG9hZGluZyA+IDBcIj5cbiAgICA8c3Bhbj5sb2FkaW5nLi4uPC9zcGFuPlxuPC9kaXY+XG48ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCIgKGNsaWNrKT1cIm9uU2VsZWN0SXRlbShpdGVtKVwiPlxuICAgIHt7aXRlbS5pZH19IC0ge3tpdGVtLmxhYmVsfX1cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQgZXh0ZW5kcyBMYW5ndWFnZUNoYW5nTm90aWZpZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZW5kcG9pbnQ6IE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsdGVyTGlzdDogTXVsdGlTZXJ2aWNlRmlsdGVyW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25JdGVtU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxGaWx0ZXJlZFBhcmFtZXRlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlcmVkUGFyYW1ldGVyPigpO1xuXG4gICAgcHVibGljIGxvYWRpbmcgPSAwO1xuICAgIHB1YmxpYyBpdGVtczogRmlsdGVyZWRQYXJhbWV0ZXJbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpSW50ZXJmYWNlOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHRyYW5zbGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmxvYWRJdGVtcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdEl0ZW0oaXRlbTogRmlsdGVyZWRQYXJhbWV0ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsYW5ndWFnZUNoYW5nZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkSXRlbXMoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5maWx0ZXJMaXN0LmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcrKztcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGVudHJ5LmZpbHRlciB8fCB7fTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQub2ZmZXJpbmc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldE9mZmVyaW5ncyhlbnRyeS51cmwsIGZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMsIGZpbHRlciwgZW50cnkudXJsLCBmaWx0ZXIuc2VydmljZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNdWx0aVNlcnZpY2VGaWx0ZXJFbmRwb2ludC5waGVub21lbm9uOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQaGVub21lbmEoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQucHJvY2VkdXJlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQcm9jZWR1cmVzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LmZlYXR1cmU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldEZlYXR1cmVzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LmNhdGVnb3J5OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRDYXRlZ29yaWVzKGVudHJ5LnVybCwgZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcywgZmlsdGVyLCBlbnRyeS51cmwsIGZpbHRlci5zZXJ2aWNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE11bHRpU2VydmljZUZpbHRlckVuZHBvaW50LnBsYXRmb3JtOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQbGF0Zm9ybXMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTXVsdGlTZXJ2aWNlRmlsdGVyRW5kcG9pbnQuZGF0YXNldDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0RGF0YXNldHMoZW50cnkudXJsLCBmaWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzLCBmaWx0ZXIsIGVudHJ5LnVybCwgZmlsdGVyLnNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dyb25nIGVuZHBvaW50OiAnICsgdGhpcy5lbmRwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yT25Mb2FkaW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRpbmctLTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zKHJlczogRmlsdGVyZWRQYXJhbWV0ZXJbXSwgcHJldmZpbHRlcjogUGFyYW1ldGVyRmlsdGVyLCB1cmw6IHN0cmluZywgc2VydmljZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZGluZy0tO1xuICAgICAgICByZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjogRmlsdGVyID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogcHJldmZpbHRlcixcbiAgICAgICAgICAgICAgICBpdGVtSWQ6IGVudHJ5LmlkLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLmxhYmVsID09PSBlbnRyeS5sYWJlbCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmlsdGVyTGlzdC5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZpbHRlckxpc3QgPSBbZmlsdGVyXTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJlZFBhcmFtZXRlciBleHRlbmRzIFBhcmFtZXRlciB7XG4gICAgZmlsdGVyTGlzdD86IEZpbHRlcltdO1xufVxuIl19