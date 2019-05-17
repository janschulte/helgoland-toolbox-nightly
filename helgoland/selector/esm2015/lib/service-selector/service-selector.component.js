/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceSelectorService } from './service-selector.service';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export class ServiceSelectorComponent {
    /**
     * @param {?} serviceSelectorService
     */
    constructor(serviceSelectorService) {
        this.serviceSelectorService = serviceSelectorService;
        this.onServiceSelected = new EventEmitter();
        this.loadingCount = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
            this.datasetApiList.forEach((api) => {
                this.serviceSelectorService.fetchServicesOfAPI(api.url, this.providerBlacklist, this.filter)
                    .subscribe((res) => {
                    this.loadingCount--;
                    if (res && res instanceof Array) {
                        res.forEach((entry) => {
                            if (entry.quantities.platforms > 0
                                || this.supportStations && entry.quantities.stations > 0) {
                                this.services.push(entry);
                            }
                        });
                    }
                    this.services.sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        if (a.label > b.label) {
                            return 1;
                        }
                        return 0;
                    });
                }, (error) => {
                    if (this.showUnresolvableServices) {
                        this.unResolvableServices.push(api);
                    }
                    this.loadingCount--;
                });
            });
        }
    }
    /**
     * @param {?} service
     * @return {?}
     */
    isSelected(service) {
        if (!this.selectedService) {
            return false;
        }
        return this.selectedService.id === service.id && this.selectedService.apiUrl === service.apiUrl;
    }
    /**
     * @param {?} service
     * @return {?}
     */
    selectService(service) {
        this.onServiceSelected.emit(service);
    }
}
ServiceSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-service-selector',
                template: `<div *ngIf="loadingCount > 0">
  <span>Requesting {{loadingCount}} providers...</span>
</div>
<div class="service-list">
  <div class="service-item" *ngFor="let service of services" (click)="selectService(service)" [ngClass]="{'selected': isSelected(service)}">
    <div>{{service.label}}</div>
    <div class="small">{{service.type}}, {{service.version}}
    </div>
    <div class="small" *ngIf="service.apiUrl">{{'service-selector.service-url' | translate}}: {{service.apiUrl}}</div>
    <div class="small">
      <span *ngIf="service.quantities.stations !== undefined">{{'service-selector.stations' | translate}}: {{service.quantities.stations}}</span>
      <span *ngIf="service.quantities.platforms !== undefined">{{'service-selector.platforms' | translate}}: {{service.quantities.platforms}}</span>
      <span *ngIf="service.quantities.timeseries !== undefined">{{'service-selector.timeseries' | translate}}: {{service.quantities.timeseries}}</span>
      <span *ngIf="service.quantities.datasets !== undefined">{{'service-selector.datasets' | translate}}: {{service.quantities.datasets}}</span>
      <span>{{'service-selector.phenomena' | translate}}: {{service.quantities.phenomena}}</span>
    </div>
  </div>
  <div *ngFor="let item of unResolvableServices">
    <div style="color: red;">{{item.name}} is currently not reachable</div>
  </div>
</div>
`,
                styles: [`:host .service-list .service-item{padding:5px}:host .service-list .service-item+.add-service,:host .service-list .service-item+.service-item{margin-top:10px}:host .service-list .service-item:hover{cursor:pointer}`]
            },] },
];
/** @nocollapse */
ServiceSelectorComponent.ctorParameters = () => [
    { type: ServiceSelectorService }
];
ServiceSelectorComponent.propDecorators = {
    datasetApiList: [{ type: Input }],
    providerBlacklist: [{ type: Input }],
    supportStations: [{ type: Input }],
    selectedService: [{ type: Input }],
    filter: [{ type: Input }],
    showUnresolvableServices: [{ type: Input }],
    onServiceSelected: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2Utc2VsZWN0b3Ivc2VydmljZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUErQnBFLE1BQU07Ozs7SUEyQkYsWUFDYyxzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtpQ0FQVixJQUFJLFlBQVksRUFBVzs0QkFJdkQsQ0FBQztLQUlsQjs7OztJQUVFLFFBQVE7UUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FBRTtRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1NBQUU7UUFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUN2RixTQUFTLENBQ04sQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDO21DQUMzQixJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUM3Qjt5QkFDSixDQUFDLENBQUM7cUJBQ047b0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUFFO3dCQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQUU7d0JBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQ1osQ0FBQyxDQUFDO2lCQUNOLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO3dCQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQUU7b0JBQzNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ2QsQ0FBQyxDQUFDO1NBQ047Ozs7OztJQUdFLFVBQVUsQ0FBQyxPQUFnQjtRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUFFO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUc3RixhQUFhLENBQUMsT0FBZ0I7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztZQWpHNUMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHNOQUFzTixDQUFDO2FBQ25POzs7O1lBOUJRLHNCQUFzQjs7OzZCQWlDMUIsS0FBSztnQ0FHTCxLQUFLOzhCQUdMLEtBQUs7OEJBR0wsS0FBSztxQkFHTCxLQUFLO3VDQUdMLEtBQUs7Z0NBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJsYWNrbGlzdGVkU2VydmljZSwgRGF0YXNldEFwaSwgUGFyYW1ldGVyRmlsdGVyLCBTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgU2VydmljZVNlbGVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdG8gc2VsZWN0IGFuIGl0ZW0gb3V0IG9mIGEgbGlzdCBvZiBwcm92aWRlciB3aXRoIGEgZ2l2ZW4gZmlsdGVyIGNvbWJpbmF0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1zZXJ2aWNlLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJsb2FkaW5nQ291bnQgPiAwXCI+XG4gIDxzcGFuPlJlcXVlc3Rpbmcge3tsb2FkaW5nQ291bnR9fSBwcm92aWRlcnMuLi48L3NwYW4+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJzZXJ2aWNlLWxpc3RcIj5cbiAgPGRpdiBjbGFzcz1cInNlcnZpY2UtaXRlbVwiICpuZ0Zvcj1cImxldCBzZXJ2aWNlIG9mIHNlcnZpY2VzXCIgKGNsaWNrKT1cInNlbGVjdFNlcnZpY2Uoc2VydmljZSlcIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogaXNTZWxlY3RlZChzZXJ2aWNlKX1cIj5cbiAgICA8ZGl2Pnt7c2VydmljZS5sYWJlbH19PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+e3tzZXJ2aWNlLnR5cGV9fSwge3tzZXJ2aWNlLnZlcnNpb259fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiICpuZ0lmPVwic2VydmljZS5hcGlVcmxcIj57eydzZXJ2aWNlLXNlbGVjdG9yLnNlcnZpY2UtdXJsJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UuYXBpVXJsfX08L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VydmljZS5xdWFudGl0aWVzLnN0YXRpb25zICE9PSB1bmRlZmluZWRcIj57eydzZXJ2aWNlLXNlbGVjdG9yLnN0YXRpb25zJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy5zdGF0aW9uc319PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZXJ2aWNlLnF1YW50aXRpZXMucGxhdGZvcm1zICE9PSB1bmRlZmluZWRcIj57eydzZXJ2aWNlLXNlbGVjdG9yLnBsYXRmb3JtcycgfCB0cmFuc2xhdGV9fToge3tzZXJ2aWNlLnF1YW50aXRpZXMucGxhdGZvcm1zfX08L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cInNlcnZpY2UucXVhbnRpdGllcy50aW1lc2VyaWVzICE9PSB1bmRlZmluZWRcIj57eydzZXJ2aWNlLXNlbGVjdG9yLnRpbWVzZXJpZXMnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5xdWFudGl0aWVzLnRpbWVzZXJpZXN9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VydmljZS5xdWFudGl0aWVzLmRhdGFzZXRzICE9PSB1bmRlZmluZWRcIj57eydzZXJ2aWNlLXNlbGVjdG9yLmRhdGFzZXRzJyB8IHRyYW5zbGF0ZX19OiB7e3NlcnZpY2UucXVhbnRpdGllcy5kYXRhc2V0c319PC9zcGFuPlxuICAgICAgPHNwYW4+e3snc2VydmljZS1zZWxlY3Rvci5waGVub21lbmEnIHwgdHJhbnNsYXRlfX06IHt7c2VydmljZS5xdWFudGl0aWVzLnBoZW5vbWVuYX19PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB1blJlc29sdmFibGVTZXJ2aWNlc1wiPlxuICAgIDxkaXYgc3R5bGU9XCJjb2xvcjogcmVkO1wiPnt7aXRlbS5uYW1lfX0gaXMgY3VycmVudGx5IG5vdCByZWFjaGFibGU8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5zZXJ2aWNlLWxpc3QgLnNlcnZpY2UtaXRlbXtwYWRkaW5nOjVweH06aG9zdCAuc2VydmljZS1saXN0IC5zZXJ2aWNlLWl0ZW0rLmFkZC1zZXJ2aWNlLDpob3N0IC5zZXJ2aWNlLWxpc3QgLnNlcnZpY2UtaXRlbSsuc2VydmljZS1pdGVte21hcmdpbi10b3A6MTBweH06aG9zdCAuc2VydmljZS1saXN0IC5zZXJ2aWNlLWl0ZW06aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRBcGlMaXN0OiBEYXRhc2V0QXBpW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwcm92aWRlckJsYWNrbGlzdDogQmxhY2tsaXN0ZWRTZXJ2aWNlW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzdXBwb3J0U3RhdGlvbnM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZFNlcnZpY2U6IFNlcnZpY2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNob3dVbnJlc29sdmFibGVTZXJ2aWNlczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlcnZpY2VTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFNlcnZpY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXJ2aWNlPigpO1xuXG4gICAgcHVibGljIHNlcnZpY2VzOiBTZXJ2aWNlW107XG4gICAgcHVibGljIHVuUmVzb2x2YWJsZVNlcnZpY2VzOiBEYXRhc2V0QXBpW107XG4gICAgcHVibGljIGxvYWRpbmdDb3VudCA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHNlcnZpY2VTZWxlY3RvclNlcnZpY2U6IFNlcnZpY2VTZWxlY3RvclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7IHRoaXMuZmlsdGVyID0ge307IH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3ZpZGVyQmxhY2tsaXN0KSB7IHRoaXMucHJvdmlkZXJCbGFja2xpc3QgPSBbXTsgfVxuICAgICAgICBpZiAodGhpcy5kYXRhc2V0QXBpTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ291bnQgPSB0aGlzLmRhdGFzZXRBcGlMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudW5SZXNvbHZhYmxlU2VydmljZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldEFwaUxpc3QuZm9yRWFjaCgoYXBpKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlLmZldGNoU2VydmljZXNPZkFQSShhcGkudXJsLCB0aGlzLnByb3ZpZGVyQmxhY2tsaXN0LCB0aGlzLmZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkucXVhbnRpdGllcy5wbGF0Zm9ybXMgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5zdXBwb3J0U3RhdGlvbnMgJiYgZW50cnkucXVhbnRpdGllcy5zdGF0aW9ucyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLmxhYmVsIDwgYi5sYWJlbCkgeyByZXR1cm4gLTE7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEubGFiZWwgPiBiLmxhYmVsKSB7IHJldHVybiAxOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dVbnJlc29sdmFibGVTZXJ2aWNlcykgeyB0aGlzLnVuUmVzb2x2YWJsZVNlcnZpY2VzLnB1c2goYXBpKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2VsZWN0ZWQoc2VydmljZTogU2VydmljZSkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRTZXJ2aWNlKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFNlcnZpY2UuaWQgPT09IHNlcnZpY2UuaWQgJiYgdGhpcy5zZWxlY3RlZFNlcnZpY2UuYXBpVXJsID09PSBzZXJ2aWNlLmFwaVVybDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0U2VydmljZShzZXJ2aWNlOiBTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMub25TZXJ2aWNlU2VsZWN0ZWQuZW1pdChzZXJ2aWNlKTtcbiAgICB9XG59XG4iXX0=