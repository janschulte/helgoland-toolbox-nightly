/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceSelectorService } from './service-selector.service';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
var ServiceSelectorComponent = /** @class */ (function () {
    function ServiceSelectorComponent(serviceSelectorService) {
        this.serviceSelectorService = serviceSelectorService;
        this.onServiceSelected = new EventEmitter();
        this.loadingCount = 0;
    }
    /**
     * @return {?}
     */
    ServiceSelectorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.filter) {
            this.filter = {};
        }
        if (!this.providerBlacklist) {
            this.providerBlacklist = [];
        }
        if (this.datasetApiList) {
            this.loadingCount = this.datasetApiList.length;
            this.services = [];
            this.unResolvableServices = [];
            this.datasetApiList.forEach(function (api) {
                _this.serviceSelectorService.fetchServicesOfAPI(api.url, _this.providerBlacklist, _this.filter)
                    .subscribe(function (res) {
                    _this.loadingCount--;
                    if (res && res instanceof Array) {
                        res.forEach(function (entry) {
                            if (entry.quantities.platforms > 0
                                || _this.supportStations && entry.quantities.stations > 0) {
                                _this.services.push(entry);
                            }
                        });
                    }
                    _this.services.sort(function (a, b) {
                        if (a.label < b.label) {
                            return -1;
                        }
                        if (a.label > b.label) {
                            return 1;
                        }
                        return 0;
                    });
                }, function (error) {
                    if (_this.showUnresolvableServices) {
                        _this.unResolvableServices.push(api);
                    }
                    _this.loadingCount--;
                });
            });
        }
    };
    /**
     * @param {?} service
     * @return {?}
     */
    ServiceSelectorComponent.prototype.isSelected = /**
     * @param {?} service
     * @return {?}
     */
    function (service) {
        if (!this.selectedService) {
            return false;
        }
        return this.selectedService.id === service.id && this.selectedService.apiUrl === service.apiUrl;
    };
    /**
     * @param {?} service
     * @return {?}
     */
    ServiceSelectorComponent.prototype.selectService = /**
     * @param {?} service
     * @return {?}
     */
    function (service) {
        this.onServiceSelected.emit(service);
    };
    ServiceSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-service-selector',
                    template: "<div *ngIf=\"loadingCount > 0\">\n  <span>Requesting {{loadingCount}} providers...</span>\n</div>\n<div class=\"service-list\">\n  <div class=\"service-item\" *ngFor=\"let service of services\" (click)=\"selectService(service)\" [ngClass]=\"{'selected': isSelected(service)}\">\n    <div>{{service.label}}</div>\n    <div class=\"small\">{{service.type}}, {{service.version}}\n    </div>\n    <div class=\"small\" *ngIf=\"service.apiUrl\">{{'service-selector.service-url' | translate}}: {{service.apiUrl}}</div>\n    <div class=\"small\">\n      <span *ngIf=\"service.quantities.stations !== undefined\">{{'service-selector.stations' | translate}}: {{service.quantities.stations}}</span>\n      <span *ngIf=\"service.quantities.platforms !== undefined\">{{'service-selector.platforms' | translate}}: {{service.quantities.platforms}}</span>\n      <span *ngIf=\"service.quantities.timeseries !== undefined\">{{'service-selector.timeseries' | translate}}: {{service.quantities.timeseries}}</span>\n      <span *ngIf=\"service.quantities.datasets !== undefined\">{{'service-selector.datasets' | translate}}: {{service.quantities.datasets}}</span>\n      <span>{{'service-selector.phenomena' | translate}}: {{service.quantities.phenomena}}</span>\n    </div>\n  </div>\n  <div *ngFor=\"let item of unResolvableServices\">\n    <div style=\"color: red;\">{{item.name}} is currently not reachable</div>\n  </div>\n</div>\n",
                    styles: [":host .service-list .service-item{padding:5px}:host .service-list .service-item+.add-service,:host .service-list .service-item+.service-item{margin-top:10px}:host .service-list .service-item:hover{cursor:pointer}"]
                },] },
    ];
    /** @nocollapse */
    ServiceSelectorComponent.ctorParameters = function () { return [
        { type: ServiceSelectorService }
    ]; };
    ServiceSelectorComponent.propDecorators = {
        datasetApiList: [{ type: Input }],
        providerBlacklist: [{ type: Input }],
        supportStations: [{ type: Input }],
        selectedService: [{ type: Input }],
        filter: [{ type: Input }],
        showUnresolvableServices: [{ type: Input }],
        onServiceSelected: [{ type: Output }]
    };
    return ServiceSelectorComponent;
}());
export { ServiceSelectorComponent };
if (false) {
    /** @type {?} */
    ServiceSelectorComponent.prototype.datasetApiList;
    /** @type {?} */
    ServiceSelectorComponent.prototype.providerBlacklist;
    /** @type {?} */
    ServiceSelectorComponent.prototype.supportStations;
    /** @type {?} */
    ServiceSelectorComponent.prototype.selectedService;
    /** @type {?} */
    ServiceSelectorComponent.prototype.filter;
    /** @type {?} */
    ServiceSelectorComponent.prototype.showUnresolvableServices;
    /** @type {?} */
    ServiceSelectorComponent.prototype.onServiceSelected;
    /** @type {?} */
    ServiceSelectorComponent.prototype.services;
    /** @type {?} */
    ServiceSelectorComponent.prototype.unResolvableServices;
    /** @type {?} */
    ServiceSelectorComponent.prototype.loadingCount;
    /** @type {?} */
    ServiceSelectorComponent.prototype.serviceSelectorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2Utc2VsZWN0b3Ivc2VydmljZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0lBMERoRSxrQ0FDYyxzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtpQ0FQVixJQUFJLFlBQVksRUFBVzs0QkFJdkQsQ0FBQztLQUlsQjs7OztJQUVFLDJDQUFROzs7OztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUFFO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUM3RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO2dCQUM1QixLQUFJLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQztxQkFDdkYsU0FBUyxDQUNOLFVBQUMsR0FBRztvQkFDQSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7NEJBQ2QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQzttQ0FDM0IsS0FBSSxDQUFDLGVBQWUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMzRCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDN0I7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOO29CQUNELEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUFFO3dCQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQUU7d0JBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQ1osQ0FBQyxDQUFDO2lCQUNOLEVBQ0QsVUFBQyxLQUFLO29CQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7d0JBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFBRTtvQkFDM0UsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN2QixDQUFDLENBQUM7YUFDZCxDQUFDLENBQUM7U0FDTjs7Ozs7O0lBR0UsNkNBQVU7Ozs7Y0FBQyxPQUFnQjtRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUFFO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUc3RixnREFBYTs7OztjQUFDLE9BQWdCO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7OztnQkFqRzVDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsMDRDQXFCYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxzTkFBc04sQ0FBQztpQkFDbk87Ozs7Z0JBOUJRLHNCQUFzQjs7O2lDQWlDMUIsS0FBSztvQ0FHTCxLQUFLO2tDQUdMLEtBQUs7a0NBR0wsS0FBSzt5QkFHTCxLQUFLOzJDQUdMLEtBQUs7b0NBR0wsTUFBTTs7bUNBdERYOztTQWtDYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbGFja2xpc3RlZFNlcnZpY2UsIERhdGFzZXRBcGksIFBhcmFtZXRlckZpbHRlciwgU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IFNlcnZpY2VTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Utc2VsZWN0b3Iuc2VydmljZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIHNlbGVjdCBhbiBpdGVtIG91dCBvZiBhIGxpc3Qgb2YgcHJvdmlkZXIgd2l0aCBhIGdpdmVuIGZpbHRlciBjb21iaW5hdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItc2VydmljZS1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibG9hZGluZ0NvdW50ID4gMFwiPlxuICA8c3Bhbj5SZXF1ZXN0aW5nIHt7bG9hZGluZ0NvdW50fX0gcHJvdmlkZXJzLi4uPC9zcGFuPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwic2VydmljZS1saXN0XCI+XG4gIDxkaXYgY2xhc3M9XCJzZXJ2aWNlLWl0ZW1cIiAqbmdGb3I9XCJsZXQgc2VydmljZSBvZiBzZXJ2aWNlc1wiIChjbGljayk9XCJzZWxlY3RTZXJ2aWNlKHNlcnZpY2UpXCIgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGlzU2VsZWN0ZWQoc2VydmljZSl9XCI+XG4gICAgPGRpdj57e3NlcnZpY2UubGFiZWx9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPnt7c2VydmljZS50eXBlfX0sIHt7c2VydmljZS52ZXJzaW9ufX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIiAqbmdJZj1cInNlcnZpY2UuYXBpVXJsXCI+e3snc2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlLXVybCcgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLmFwaVVybH19PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlcnZpY2UucXVhbnRpdGllcy5zdGF0aW9ucyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci5zdGF0aW9ucycgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMuc3RhdGlvbnN9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VydmljZS5xdWFudGl0aWVzLnBsYXRmb3JtcyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci5wbGF0Zm9ybXMnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5xdWFudGl0aWVzLnBsYXRmb3Jtc319PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZXJ2aWNlLnF1YW50aXRpZXMudGltZXNlcmllcyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci50aW1lc2VyaWVzJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy50aW1lc2VyaWVzfX08L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlcnZpY2UucXVhbnRpdGllcy5kYXRhc2V0cyAhPT0gdW5kZWZpbmVkXCI+e3snc2VydmljZS1zZWxlY3Rvci5kYXRhc2V0cycgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMuZGF0YXNldHN9fTwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7J3NlcnZpY2Utc2VsZWN0b3IucGhlbm9tZW5hJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy5waGVub21lbmF9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdW5SZXNvbHZhYmxlU2VydmljZXNcIj5cbiAgICA8ZGl2IHN0eWxlPVwiY29sb3I6IHJlZDtcIj57e2l0ZW0ubmFtZX19IGlzIGN1cnJlbnRseSBub3QgcmVhY2hhYmxlPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAuc2VydmljZS1saXN0IC5zZXJ2aWNlLWl0ZW17cGFkZGluZzo1cHh9Omhvc3QgLnNlcnZpY2UtbGlzdCAuc2VydmljZS1pdGVtKy5hZGQtc2VydmljZSw6aG9zdCAuc2VydmljZS1saXN0IC5zZXJ2aWNlLWl0ZW0rLnNlcnZpY2UtaXRlbXttYXJnaW4tdG9wOjEwcHh9Omhvc3QgLnNlcnZpY2UtbGlzdCAuc2VydmljZS1pdGVtOmhvdmVye2N1cnNvcjpwb2ludGVyfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0QXBpTGlzdDogRGF0YXNldEFwaVtdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcHJvdmlkZXJCbGFja2xpc3Q6IEJsYWNrbGlzdGVkU2VydmljZVtdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc3VwcG9ydFN0YXRpb25zOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWRTZXJ2aWNlOiBTZXJ2aWNlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzaG93VW5yZXNvbHZhYmxlU2VydmljZXM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZXJ2aWNlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZXJ2aWNlPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VydmljZT4oKTtcblxuICAgIHB1YmxpYyBzZXJ2aWNlczogU2VydmljZVtdO1xuICAgIHB1YmxpYyB1blJlc29sdmFibGVTZXJ2aWNlczogRGF0YXNldEFwaVtdO1xuICAgIHB1YmxpYyBsb2FkaW5nQ291bnQgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlOiBTZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlcikgeyB0aGlzLmZpbHRlciA9IHt9OyB9XG4gICAgICAgIGlmICghdGhpcy5wcm92aWRlckJsYWNrbGlzdCkgeyB0aGlzLnByb3ZpZGVyQmxhY2tsaXN0ID0gW107IH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldEFwaUxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvdW50ID0gdGhpcy5kYXRhc2V0QXBpTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLnVuUmVzb2x2YWJsZVNlcnZpY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRBcGlMaXN0LmZvckVhY2goKGFwaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZVNlbGVjdG9yU2VydmljZS5mZXRjaFNlcnZpY2VzT2ZBUEkoYXBpLnVybCwgdGhpcy5wcm92aWRlckJsYWNrbGlzdCwgdGhpcy5maWx0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LnF1YW50aXRpZXMucGxhdGZvcm1zID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuc3VwcG9ydFN0YXRpb25zICYmIGVudHJ5LnF1YW50aXRpZXMuc3RhdGlvbnMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS5sYWJlbCA8IGIubGFiZWwpIHsgcmV0dXJuIC0xOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLmxhYmVsID4gYi5sYWJlbCkgeyByZXR1cm4gMTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93VW5yZXNvbHZhYmxlU2VydmljZXMpIHsgdGhpcy51blJlc29sdmFibGVTZXJ2aWNlcy5wdXNoKGFwaSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1NlbGVjdGVkKHNlcnZpY2U6IFNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkU2VydmljZSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmlkID09PSBzZXJ2aWNlLmlkICYmIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlLmFwaVVybCA9PT0gc2VydmljZS5hcGlVcmw7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdFNlcnZpY2Uoc2VydmljZTogU2VydmljZSkge1xuICAgICAgICB0aGlzLm9uU2VydmljZVNlbGVjdGVkLmVtaXQoc2VydmljZSk7XG4gICAgfVxufVxuIl19