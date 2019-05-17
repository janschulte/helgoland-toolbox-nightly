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
export class HelgolandCoreModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQXVCM0MsTUFBTTs7O1lBckJMLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osYUFBYTtpQkFDZDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtpQkFDZDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsWUFBWTtvQkFDWixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtvQkFDdEIsaUJBQWlCO29CQUNqQixZQUFZO29CQUNaLGVBQWU7b0JBQ2YsNkJBQTZCO29CQUM3QixJQUFJO2lCQUNMO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi9jb2xvci9jb2xvci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFzZXRBcGlNYXBwaW5nIH0gZnJvbSAnLi9kYXRhc2V0LWFwaS9hcGktbWFwcGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhc2V0LWFwaS9oZWxwZXIvc3RhdHVzLWludGVydmFsLXJlc29sdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW50ZXJuYWxJZEhhbmRsZXIgfSBmcm9tICcuL2RhdGFzZXQtYXBpL2ludGVybmFsLWlkLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWVyU2VydmljZSB9IGZyb20gJy4vbm90aWZpZXIvbm90aWZpZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlUHJveHlQaXBlIH0gZnJvbSAnLi9waXBlcy9kYXRlcHJveHkvZGF0ZXByb3h5LnBpcGUnO1xuaW1wb3J0IHsgRGVmaW5lZFRpbWVzcGFuU2VydmljZSB9IGZyb20gJy4vdGltZS9kZWZpbmVkLXRpbWVzcGFuLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gJy4vdGltZS90aW1lLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRlUHJveHlQaXBlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEYXRlUHJveHlQaXBlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvbG9yU2VydmljZSxcbiAgICBEYXRhc2V0QXBpTWFwcGluZyxcbiAgICBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlLFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIExvY2FsU3RvcmFnZSxcbiAgICBOb3RpZmllclNlcnZpY2UsXG4gICAgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UsXG4gICAgVGltZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZENvcmVNb2R1bGUgeyB9XG4iXX0=