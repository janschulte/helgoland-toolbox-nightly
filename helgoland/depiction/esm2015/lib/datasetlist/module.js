/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { TranslateModule } from '@ngx-translate/core';
import { HelgolandLabelMapperModule } from '../label-mapper/label-mapper.module';
import { ProfileEntryComponent } from './profile-entry/profile-entry.component';
import { ConfigurableTimeseriesEntryComponent, } from './timeseries/configurable-timeseries-entry/configurable-timeseries-entry.component';
import { FirstLatestTimeseriesEntryComponent, } from './timeseries/first-latest-timeseries-entry/first-latest-timeseries-entry.component';
import { SimpleTimeseriesEntryComponent } from './timeseries/simple-timeseries-entry/simple-timeseries-entry.component';
import { ReferenceValueColorCache, TimeseriesEntryComponent, } from './timeseries/timeseries-entry/timeseries-entry.component';
import { TrajectoryEntryComponent } from './trajectory-entry/trajectory-entry.component';
/** @type {?} */
const COMPONENTS = [
    TimeseriesEntryComponent,
    ConfigurableTimeseriesEntryComponent,
    SimpleTimeseriesEntryComponent,
    FirstLatestTimeseriesEntryComponent,
    ProfileEntryComponent,
    TrajectoryEntryComponent
];
export class HelgolandDatasetlistModule {
}
HelgolandDatasetlistModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule,
                    HelgolandCoreModule,
                    HelgolandLabelMapperModule,
                    FormsModule
                ],
                declarations: [
                    COMPONENTS
                ],
                exports: [
                    COMPONENTS
                ],
                providers: [
                    ReferenceValueColorCache
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFDTCxvQ0FBb0MsR0FDckMsTUFBTSxvRkFBb0YsQ0FBQztBQUM1RixPQUFPLEVBQ0wsbUNBQW1DLEdBQ3BDLE1BQU0sb0ZBQW9GLENBQUM7QUFDNUYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDeEgsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qix3QkFBd0IsR0FDekIsTUFBTSwwREFBMEQsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7QUFFekYsTUFBTSxVQUFVLEdBQUc7SUFDakIsd0JBQXdCO0lBQ3hCLG9DQUFvQztJQUNwQyw4QkFBOEI7SUFDOUIsbUNBQW1DO0lBQ25DLHFCQUFxQjtJQUNyQix3QkFBd0I7Q0FDekIsQ0FBQztBQW9CRixNQUFNOzs7WUFsQkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQiwwQkFBMEI7b0JBQzFCLFdBQVc7aUJBQ1o7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFVBQVU7aUJBQ1g7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHdCQUF3QjtpQkFDekI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRMYWJlbE1hcHBlck1vZHVsZSB9IGZyb20gJy4uL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIubW9kdWxlJztcbmltcG9ydCB7IFByb2ZpbGVFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4vcHJvZmlsZS1lbnRyeS9wcm9maWxlLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4vdGltZXNlcmllcy9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS9jb25maWd1cmFibGUtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG59IGZyb20gJy4vdGltZXNlcmllcy9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS9maXJzdC1sYXRlc3QtdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lc2VyaWVzL3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5L3NpbXBsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGUsXG4gIFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL3RpbWVzZXJpZXMtZW50cnkvdGltZXNlcmllcy1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxuICBDb25maWd1cmFibGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIFNpbXBsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgRmlyc3RMYXRlc3RUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIFByb2ZpbGVFbnRyeUNvbXBvbmVudCxcbiAgVHJhamVjdG9yeUVudHJ5Q29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgIEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUmVmZXJlbmNlVmFsdWVDb2xvckNhY2hlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRGF0YXNldGxpc3RNb2R1bGUge1xufVxuIl19