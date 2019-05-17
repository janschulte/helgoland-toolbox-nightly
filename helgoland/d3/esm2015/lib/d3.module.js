/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HelgolandCoreModule } from '@helgoland/core';
import { D3OverviewTimeseriesGraphComponent } from './d3-overview-timeseries-graph/d3-overview-timeseries-graph.component';
import { D3TimeseriesGraphComponent } from './d3-timeseries-graph/d3-timeseries-graph.component';
import { D3TrajectoryGraphComponent } from './d3-trajectory-graph/d3-trajectory-graph.component';
import { ExtendedDataD3TimeseriesGraphComponent, } from './extended-data-d3-timeseries-graph/extended-data-d3-timeseries-graph.component';
import { D3TimeFormatLocaleService } from './helper/d3-time-format-locale.service';
import { D3GeneralGraphComponent } from './d3-general-graph/d3-general-graph.component';
export class HelgolandD3Module {
}
HelgolandD3Module.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    D3TrajectoryGraphComponent,
                    D3TimeseriesGraphComponent,
                    D3OverviewTimeseriesGraphComponent,
                    ExtendedDataD3TimeseriesGraphComponent,
                    D3GeneralGraphComponent
                ],
                imports: [
                    HelgolandCoreModule
                ],
                exports: [
                    D3TrajectoryGraphComponent,
                    D3TimeseriesGraphComponent,
                    D3OverviewTimeseriesGraphComponent,
                    ExtendedDataD3TimeseriesGraphComponent,
                    D3GeneralGraphComponent
                ],
                providers: [
                    D3TimeFormatLocaleService
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kMy8iLCJzb3VyY2VzIjpbImxpYi9kMy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sdUVBQXVFLENBQUM7QUFDM0gsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUNMLHNDQUFzQyxHQUN2QyxNQUFNLGlGQUFpRixDQUFDO0FBQ3pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBd0J4RixNQUFNOzs7WUF0QkwsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsa0NBQWtDO29CQUNsQyxzQ0FBc0M7b0JBQ3RDLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQixrQ0FBa0M7b0JBQ2xDLHNDQUFzQztvQkFDdEMsdUJBQXVCO2lCQUN4QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QseUJBQXlCO2lCQUMxQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBEM092ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy10aW1lc2VyaWVzLWdyYXBoL2QzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEQzVHJhamVjdG9yeUdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy10cmFqZWN0b3J5LWdyYXBoL2QzLXRyYWplY3RvcnktZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7XG4gIEV4dGVuZGVkRGF0YUQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxufSBmcm9tICcuL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC9leHRlbmRlZC1kYXRhLWQzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UgfSBmcm9tICcuL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgeyBEM0dlbmVyYWxHcmFwaENvbXBvbmVudCB9IGZyb20gJy4vZDMtZ2VuZXJhbC1ncmFwaC9kMy1nZW5lcmFsLWdyYXBoLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEQzVHJhamVjdG9yeUdyYXBoQ29tcG9uZW50LFxuICAgIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICAgIEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNHZW5lcmFsR3JhcGhDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEQzVHJhamVjdG9yeUdyYXBoQ29tcG9uZW50LFxuICAgIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICAgIEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNHZW5lcmFsR3JhcGhDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZEQzTW9kdWxlIHsgfVxuIl19