/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandMapModule } from '../base/map.module';
import { LastValueMapSelectorComponent } from './last-value-map-selector/last-value-map-selector.component';
import { PlatformMapSelectorComponent } from './platform-map-selector/platform-map-selector.component';
import { LastValueLabelGenerator } from './services/last-value-label-generator.interface';
import { LastValueLabelGeneratorService } from './services/last-value-label-generator.service';
import { StationMapSelectorComponent } from './station-map-selector/station-map-selector.component';
import { ProfileTrajectoryMapSelectorComponent } from './trajectory-map-selector/trajectory-map-selector.component';
/** @type {?} */
const COMPONENTS = [
    PlatformMapSelectorComponent,
    StationMapSelectorComponent,
    ProfileTrajectoryMapSelectorComponent,
    LastValueMapSelectorComponent
];
/**
 * @record
 */
export function HelgolandMapSelectorModuleConfig() { }
/** @type {?} */
HelgolandMapSelectorModuleConfig.prototype.lastValueLabelGeneratorService;
export class HelgolandMapSelectorModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: HelgolandMapSelectorModule,
            providers: [
                { provide: LastValueLabelGenerator, useClass: config && config.lastValueLabelGeneratorService || LastValueLabelGeneratorService }
            ]
        };
    }
}
HelgolandMapSelectorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    COMPONENTS
                ],
                imports: [
                    CommonModule,
                    HelgolandCoreModule,
                    HelgolandMapModule
                ],
                exports: [
                    COMPONENTS
                ],
                providers: [
                    { provide: LastValueLabelGenerator, useClass: LastValueLabelGeneratorService }
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0b3IvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDNUcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDMUYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0YsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sNkRBQTZELENBQUM7O0FBRXBILE1BQU0sVUFBVSxHQUFHO0lBQ2YsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQixxQ0FBcUM7SUFDckMsNkJBQTZCO0NBQ2hDLENBQUM7Ozs7Ozs7QUFzQkYsTUFBTTs7Ozs7SUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXlDO1FBQ3BELE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsU0FBUyxFQUFFO2dCQUNQLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLDhCQUE4QixJQUFJLDhCQUE4QixFQUFFO2FBQ3BJO1NBQ0osQ0FBQztLQUNMOzs7WUF4QkosUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixVQUFVO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsVUFBVTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLDhCQUE4QixFQUFFO2lCQUNqRjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgSGVsZ29sYW5kTWFwTW9kdWxlIH0gZnJvbSAnLi4vYmFzZS9tYXAubW9kdWxlJztcbmltcG9ydCB7IExhc3RWYWx1ZU1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci9sYXN0LXZhbHVlLW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxhdGZvcm1NYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vcGxhdGZvcm0tbWFwLXNlbGVjdG9yL3BsYXRmb3JtLW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3IgfSBmcm9tICcuL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGlvbk1hcFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zdGF0aW9uLW1hcC1zZWxlY3Rvci9zdGF0aW9uLW1hcC1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZmlsZVRyYWplY3RvcnlNYXBTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IvdHJhamVjdG9yeS1tYXAtc2VsZWN0b3IuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgICBQbGF0Zm9ybU1hcFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFN0YXRpb25NYXBTZWxlY3RvckNvbXBvbmVudCxcbiAgICBQcm9maWxlVHJhamVjdG9yeU1hcFNlbGVjdG9yQ29tcG9uZW50LFxuICAgIExhc3RWYWx1ZU1hcFNlbGVjdG9yQ29tcG9uZW50XG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlQ29uZmlnIHtcbiAgICBsYXN0VmFsdWVMYWJlbEdlbmVyYXRvclNlcnZpY2U6IFR5cGU8TGFzdFZhbHVlTGFiZWxHZW5lcmF0b3I+O1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDT01QT05FTlRTXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSGVsZ29sYW5kQ29yZU1vZHVsZSxcbiAgICAgICAgSGVsZ29sYW5kTWFwTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENPTVBPTkVOVFNcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yLCB1c2VDbGFzczogTGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JTZXJ2aWNlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBIZWxnb2xhbmRNYXBTZWxlY3Rvck1vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEhlbGdvbGFuZE1hcFNlbGVjdG9yTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciwgdXNlQ2xhc3M6IGNvbmZpZyAmJiBjb25maWcubGFzdFZhbHVlTGFiZWxHZW5lcmF0b3JTZXJ2aWNlIHx8IExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19