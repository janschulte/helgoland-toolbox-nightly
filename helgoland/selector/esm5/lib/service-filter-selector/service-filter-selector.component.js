/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, LanguageChangNotifier } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
var ServiceFilterSelectorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceFilterSelectorComponent, _super);
    function ServiceFilterSelectorComponent(translate, apiInterface) {
        var _this = _super.call(this, translate) || this;
        _this.translate = translate;
        _this.apiInterface = apiInterface;
        _this.onItemSelected = new EventEmitter();
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ServiceFilterSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["endpoint"]) {
            this.loadItems();
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ServiceFilterSelectorComponent.prototype.onSelectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.onItemSelected.emit(item);
    };
    /**
     * @return {?}
     */
    ServiceFilterSelectorComponent.prototype.languageChanged = /**
     * @return {?}
     */
    function () {
        this.loadItems();
    };
    /**
     * @return {?}
     */
    ServiceFilterSelectorComponent.prototype.loadItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.loading = true;
        switch (this.endpoint) {
            case 'offering':
                this.apiInterface.getOfferings(this.serviceUrl, this.filter)
                    .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                break;
            case 'phenomenon':
                this.apiInterface.getPhenomena(this.serviceUrl, this.filter)
                    .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                break;
            case 'procedure':
                this.apiInterface.getProcedures(this.serviceUrl, this.filter)
                    .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                break;
            case 'category':
                this.apiInterface.getCategories(this.serviceUrl, this.filter)
                    .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                break;
            case 'feature':
                this.apiInterface.getFeatures(this.serviceUrl, this.filter)
                    .subscribe(function (res) { return _this.setItems(res); }, function (error) { return _this.errorOnLoading; });
                break;
            default:
                console.error('Wrong endpoint: ' + this.endpoint);
        }
    };
    /**
     * @return {?}
     */
    ServiceFilterSelectorComponent.prototype.errorOnLoading = /**
     * @return {?}
     */
    function () {
        this.loading = false;
    };
    /**
     * @param {?} res
     * @return {?}
     */
    ServiceFilterSelectorComponent.prototype.setItems = /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        if (res instanceof Array) {
            this.items = res;
        }
        else {
            this.items = [];
        }
        this.loading = false;
    };
    ServiceFilterSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-service-filter-selector',
                    template: "<div *ngIf=\"loading\">\n    loading...\n</div>\n<div *ngIf=\"!loading && items?.length === 0\">\n    no results found\n</div>\n<div class=\"selector-entry\" *ngFor=\"let item of items\" (click)=\"onSelectItem(item)\" [ngClass]=\"{'selected': selectionId === item.id}\">\n    <n52-label-mapper label=\"{{item.label}}\"></n52-label-mapper>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ServiceFilterSelectorComponent.ctorParameters = function () { return [
        { type: TranslateService },
        { type: DatasetApiInterface }
    ]; };
    ServiceFilterSelectorComponent.propDecorators = {
        endpoint: [{ type: Input }],
        serviceUrl: [{ type: Input }],
        filter: [{ type: Input }],
        selectionId: [{ type: Input }],
        onItemSelected: [{ type: Output }]
    };
    return ServiceFilterSelectorComponent;
}(LanguageChangNotifier));
export { ServiceFilterSelectorComponent };
if (false) {
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.endpoint;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.serviceUrl;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.filter;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.selectionId;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.onItemSelected;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.loading;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.items;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.translate;
    /** @type {?} */
    ServiceFilterSelectorComponent.prototype.apiInterface;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1maWx0ZXItc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQThCLE1BQU0saUJBQWlCLENBQUM7QUFDekcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0lBa0JILDBEQUFxQjtJQW9CckUsd0NBQ2MsU0FBMkIsRUFDM0IsWUFBaUM7UUFGL0MsWUFJSSxrQkFBTSxTQUFTLENBQUMsU0FDbkI7UUFKYSxlQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQixrQkFBWSxHQUFaLFlBQVksQ0FBcUI7K0JBUEUsSUFBSSxZQUFZLEVBQWE7O0tBVTdFOzs7OztJQUVNLG9EQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCOzs7Ozs7SUFHRSxxREFBWTs7OztjQUFDLElBQWU7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7O0lBR3pCLHdEQUFlOzs7SUFBekI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFTyxrREFBUzs7Ozs7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFL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ImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIExhbmd1YWdlQ2hhbmdOb3RpZmllciwgUGFyYW1ldGVyLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0byBzZWxlY3QgYW4gaXRlbSBvdXQgb2YgYSBsaXN0IG9mIHByb3ZpZGVyIHdpdGggYSBnaXZlbiBmaWx0ZXIgY29tYmluYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgbG9hZGluZy4uLlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiIWxvYWRpbmcgJiYgaXRlbXM/Lmxlbmd0aCA9PT0gMFwiPlxuICAgIG5vIHJlc3VsdHMgZm91bmRcbjwvZGl2PlxuPGRpdiBjbGFzcz1cInNlbGVjdG9yLWVudHJ5XCIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIiAoY2xpY2spPVwib25TZWxlY3RJdGVtKGl0ZW0pXCIgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHNlbGVjdGlvbklkID09PSBpdGVtLmlkfVwiPlxuICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tpdGVtLmxhYmVsfX1cIj48L241Mi1sYWJlbC1tYXBwZXI+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50IGV4dGVuZHMgTGFuZ3VhZ2VDaGFuZ05vdGlmaWVyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXJ2aWNlVXJsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGlvbklkOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25JdGVtU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxQYXJhbWV0ZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxQYXJhbWV0ZXI+KCk7XG5cbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbjtcbiAgICBwdWJsaWMgaXRlbXM6IFBhcmFtZXRlcltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIodHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5lbmRwb2ludCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkSXRlbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdEl0ZW0oaXRlbTogUGFyYW1ldGVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25JdGVtU2VsZWN0ZWQuZW1pdChpdGVtKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbGFuZ3VhZ2VDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLmxvYWRJdGVtcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEl0ZW1zKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZW5kcG9pbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ29mZmVyaW5nJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRPZmZlcmluZ3ModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcyksIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwaGVub21lbm9uJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRQaGVub21lbmEodGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcyksIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwcm9jZWR1cmUnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFByb2NlZHVyZXModGhpcy5zZXJ2aWNlVXJsLCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnNldEl0ZW1zKHJlcyksIChlcnJvcikgPT4gdGhpcy5lcnJvck9uTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXRlZ29yeSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0Q2F0ZWdvcmllcyh0aGlzLnNlcnZpY2VVcmwsIHRoaXMuZmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuc2V0SXRlbXMocmVzKSwgKGVycm9yKSA9PiB0aGlzLmVycm9yT25Mb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZlYXR1cmUnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldEZlYXR1cmVzKHRoaXMuc2VydmljZVVybCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5zZXRJdGVtcyhyZXMpLCAoZXJyb3IpID0+IHRoaXMuZXJyb3JPbkxvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXcm9uZyBlbmRwb2ludDogJyArIHRoaXMuZW5kcG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvck9uTG9hZGluZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJdGVtcyhyZXM6IFBhcmFtZXRlcltdKTogdm9pZCB7XG4gICAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=