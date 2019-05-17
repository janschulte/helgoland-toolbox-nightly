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
var COMPONENTS = [
    TimeseriesEntryComponent,
    ConfigurableTimeseriesEntryComponent,
    SimpleTimeseriesEntryComponent,
    FirstLatestTimeseriesEntryComponent,
    ProfileEntryComponent,
    TrajectoryEntryComponent
];
var HelgolandDatasetlistModule = /** @class */ (function () {
    function HelgolandDatasetlistModule() {
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
    return HelgolandDatasetlistModule;
}());
export { HelgolandDatasetlistModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kZXBpY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZGF0YXNldGxpc3QvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFDTCxvQ0FBb0MsR0FDckMsTUFBTSxvRkFBb0YsQ0FBQztBQUM1RixPQUFPLEVBQ0wsbUNBQW1DLEdBQ3BDLE1BQU0sb0ZBQW9GLENBQUM7QUFDNUYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDeEgsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qix3QkFBd0IsR0FDekIsTUFBTSwwREFBMEQsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7QUFFekYsSUFBTSxVQUFVLEdBQUc7SUFDakIsd0JBQXdCO0lBQ3hCLG9DQUFvQztJQUNwQyw4QkFBOEI7SUFDOUIsbUNBQW1DO0lBQ25DLHFCQUFxQjtJQUNyQix3QkFBd0I7Q0FDekIsQ0FBQzs7Ozs7Z0JBRUQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQiwwQkFBMEI7d0JBQzFCLFdBQVc7cUJBQ1o7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHdCQUF3QjtxQkFDekI7aUJBQ0Y7O3FDQS9DRDs7U0FnRGEsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIH0gZnJvbSAnLi4vbGFiZWwtbWFwcGVyL2xhYmVsLW1hcHBlci5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZmlsZUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9wcm9maWxlLWVudHJ5L3Byb2ZpbGUtZW50cnkuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5L2NvbmZpZ3VyYWJsZS10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbn0gZnJvbSAnLi90aW1lc2VyaWVzL2ZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5L2ZpcnN0LWxhdGVzdC10aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVUaW1lc2VyaWVzRW50cnlDb21wb25lbnQgfSBmcm9tICcuL3RpbWVzZXJpZXMvc2ltcGxlLXRpbWVzZXJpZXMtZW50cnkvc2ltcGxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFJlZmVyZW5jZVZhbHVlQ29sb3JDYWNoZSxcbiAgVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxufSBmcm9tICcuL3RpbWVzZXJpZXMvdGltZXNlcmllcy1lbnRyeS90aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFqZWN0b3J5RW50cnlDb21wb25lbnQgfSBmcm9tICcuL3RyYWplY3RvcnktZW50cnkvdHJhamVjdG9yeS1lbnRyeS5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBUaW1lc2VyaWVzRW50cnlDb21wb25lbnQsXG4gIENvbmZpZ3VyYWJsZVRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgU2ltcGxlVGltZXNlcmllc0VudHJ5Q29tcG9uZW50LFxuICBGaXJzdExhdGVzdFRpbWVzZXJpZXNFbnRyeUNvbXBvbmVudCxcbiAgUHJvZmlsZUVudHJ5Q29tcG9uZW50LFxuICBUcmFqZWN0b3J5RW50cnlDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEhlbGdvbGFuZENvcmVNb2R1bGUsXG4gICAgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBSZWZlcmVuY2VWYWx1ZUNvbG9yQ2FjaGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmREYXRhc2V0bGlzdE1vZHVsZSB7XG59XG4iXX0=