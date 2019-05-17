/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HTTP_SERVICE_INTERCEPTORS } from '@helgoland/core';
import { CachingInterceptor } from './cache-interceptor';
import { LocalHttpCache } from './local-http-cache';
import { LocalOngoingHttpCache } from './local-ongoing-http-cache';
import { HttpCache, OnGoingHttpCache } from './model';
export class HelgolandCachingModule {
}
HelgolandCachingModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [],
                exports: [],
                providers: [
                    {
                        provide: HttpCache,
                        useClass: LocalHttpCache
                    },
                    {
                        provide: HTTP_SERVICE_INTERCEPTORS,
                        useClass: CachingInterceptor,
                        multi: true
                    },
                    {
                        provide: OnGoingHttpCache,
                        useClass: LocalOngoingHttpCache
                    },
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvIiwic291cmNlcyI6WyJsaWIvY2FjaGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFzQnRELE1BQU07OztZQXBCTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsU0FBUzt3QkFDbEIsUUFBUSxFQUFFLGNBQWM7cUJBQ3pCO29CQUNEO3dCQUNFLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLEtBQUssRUFBRSxJQUFJO3FCQUNaO29CQUNEO3dCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7d0JBQ3pCLFFBQVEsRUFBRSxxQkFBcUI7cUJBQ2hDO2lCQUNGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IENhY2hpbmdJbnRlcmNlcHRvciB9IGZyb20gJy4vY2FjaGUtaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgTG9jYWxIdHRwQ2FjaGUgfSBmcm9tICcuL2xvY2FsLWh0dHAtY2FjaGUnO1xuaW1wb3J0IHsgTG9jYWxPbmdvaW5nSHR0cENhY2hlIH0gZnJvbSAnLi9sb2NhbC1vbmdvaW5nLWh0dHAtY2FjaGUnO1xuaW1wb3J0IHsgSHR0cENhY2hlLCBPbkdvaW5nSHR0cENhY2hlIH0gZnJvbSAnLi9tb2RlbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSHR0cENhY2hlLFxuICAgICAgdXNlQ2xhc3M6IExvY2FsSHR0cENhY2hlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlQ2xhc3M6IENhY2hpbmdJbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBPbkdvaW5nSHR0cENhY2hlLFxuICAgICAgdXNlQ2xhc3M6IExvY2FsT25nb2luZ0h0dHBDYWNoZVxuICAgIH0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kQ2FjaGluZ01vZHVsZSB7IH1cbiJdfQ==