/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { EventingApiService } from './eventing-api.service';
import { EventingImplApiInterface } from './eventing-impl-api-interface.service';
/**
 * Provides standard eventing api service implemention
 */
var HelgolandEventingModule = /** @class */ (function () {
    function HelgolandEventingModule() {
    }
    HelgolandEventingModule.decorators = [
        { type: NgModule, args: [{
                    providers: [{
                            provide: EventingApiService,
                            useClass: EventingImplApiInterface
                        }]
                },] },
    ];
    return HelgolandEventingModule;
}());
export { HelgolandEventingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9ldmVudGluZy8iLCJzb3VyY2VzIjpbImxpYi9ldmVudGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7Ozs7O2dCQUtoRixRQUFRLFNBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsUUFBUSxFQUFFLHdCQUF3Qjt5QkFDbkMsQ0FBQztpQkFDSDs7a0NBYkQ7O1NBY2EsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRXZlbnRpbmdBcGlTZXJ2aWNlIH0gZnJvbSAnLi9ldmVudGluZy1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBFdmVudGluZ0ltcGxBcGlJbnRlcmZhY2UgfSBmcm9tICcuL2V2ZW50aW5nLWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBQcm92aWRlcyBzdGFuZGFyZCBldmVudGluZyBhcGkgc2VydmljZSBpbXBsZW1lbnRpb25cbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IEV2ZW50aW5nQXBpU2VydmljZSxcbiAgICB1c2VDbGFzczogRXZlbnRpbmdJbXBsQXBpSW50ZXJmYWNlXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZEV2ZW50aW5nTW9kdWxlIHsgfVxuIl19