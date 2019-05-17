/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ColorService } from './color/color.service';
import { DatasetApiMapping } from './dataset-api/api-mapping.service';
import { StatusIntervalResolverService } from './dataset-api/helper/status-interval-resolver.service';
import { InternalIdHandler } from './dataset-api/internal-id-handler.service';
import { LocalStorage } from './local-storage/local-storage.service';
import { NotifierService } from './notifier/notifier.service';
import { DateProxyPipe } from './pipes/dateproxy/dateproxy.pipe';
import { DefinedTimespanService } from './time/defined-timespan.service';
import { Time } from './time/time.service';
var HelgolandCoreModule = /** @class */ (function () {
    function HelgolandCoreModule() {
    }
    HelgolandCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DateProxyPipe
                    ],
                    imports: [
                        HttpClientModule
                    ],
                    exports: [
                        DateProxyPipe
                    ],
                    providers: [
                        ColorService,
                        DatasetApiMapping,
                        DefinedTimespanService,
                        InternalIdHandler,
                        LocalStorage,
                        NotifierService,
                        StatusIntervalResolverService,
                        Time
                    ]
                },] },
    ];
    return HelgolandCoreModule;
}());
export { HelgolandCoreModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Z0JBRTFDLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osYUFBYTtxQkFDZDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsaUJBQWlCO3dCQUNqQixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsNkJBQTZCO3dCQUM3QixJQUFJO3FCQUNMO2lCQUNGOzs4QkFqQ0Q7O1NBa0NhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuL2NvbG9yL2NvbG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXNldEFwaU1hcHBpbmcgfSBmcm9tICcuL2RhdGFzZXQtYXBpL2FwaS1tYXBwaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UgfSBmcm9tICcuL2RhdGFzZXQtYXBpL2hlbHBlci9zdGF0dXMtaW50ZXJ2YWwtcmVzb2x2ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJy4vZGF0YXNldC1hcGkvaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJTZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmllci9ub3RpZmllci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVQcm94eVBpcGUgfSBmcm9tICcuL3BpcGVzL2RhdGVwcm94eS9kYXRlcHJveHkucGlwZSc7XG5pbXBvcnQgeyBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlIH0gZnJvbSAnLi90aW1lL2RlZmluZWQtdGltZXNwYW4uc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSAnLi90aW1lL3RpbWUuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERhdGVQcm94eVBpcGVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERhdGVQcm94eVBpcGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29sb3JTZXJ2aWNlLFxuICAgIERhdGFzZXRBcGlNYXBwaW5nLFxuICAgIERlZmluZWRUaW1lc3BhblNlcnZpY2UsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgTG9jYWxTdG9yYWdlLFxuICAgIE5vdGlmaWVyU2VydmljZSxcbiAgICBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZSxcbiAgICBUaW1lXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kQ29yZU1vZHVsZSB7IH1cbiJdfQ==