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
var HelgolandD3Module = /** @class */ (function () {
    function HelgolandD3Module() {
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
    return HelgolandD3Module;
}());
export { HelgolandD3Module };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kMy8iLCJzb3VyY2VzIjpbImxpYi9kMy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sdUVBQXVFLENBQUM7QUFDM0gsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUNMLHNDQUFzQyxHQUN2QyxNQUFNLGlGQUFpRixDQUFDO0FBQ3pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDOzs7OztnQkFFdkYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsa0NBQWtDO3dCQUNsQyxzQ0FBc0M7d0JBQ3RDLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQixrQ0FBa0M7d0JBQ2xDLHNDQUFzQzt3QkFDdEMsdUJBQXVCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QseUJBQXlCO3FCQUMxQjtpQkFDRjs7NEJBakNEOztTQWtDYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG59IGZyb20gJy4vZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy1nZW5lcmFsLWdyYXBoL2QzLWdlbmVyYWwtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRDNNb2R1bGUgeyB9XG4iXX0=