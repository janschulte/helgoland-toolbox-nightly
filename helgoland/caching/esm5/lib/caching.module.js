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
var HelgolandCachingModule = /** @class */ (function () {
    function HelgolandCachingModule() {
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
    return HelgolandCachingModule;
}());
export { HelgolandCachingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NhY2hpbmcvIiwic291cmNlcyI6WyJsaWIvY2FjaGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O2dCQUVyRCxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxFQUFFO29CQUNYLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsU0FBUzs0QkFDbEIsUUFBUSxFQUFFLGNBQWM7eUJBQ3pCO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSx5QkFBeUI7NEJBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7NEJBQzVCLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFFBQVEsRUFBRSxxQkFBcUI7eUJBQ2hDO3FCQUNGO2lCQUNGOztpQ0EzQkQ7O1NBNEJhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgQ2FjaGluZ0ludGVyY2VwdG9yIH0gZnJvbSAnLi9jYWNoZS1pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBMb2NhbEh0dHBDYWNoZSB9IGZyb20gJy4vbG9jYWwtaHR0cC1jYWNoZSc7XG5pbXBvcnQgeyBMb2NhbE9uZ29pbmdIdHRwQ2FjaGUgfSBmcm9tICcuL2xvY2FsLW9uZ29pbmctaHR0cC1jYWNoZSc7XG5pbXBvcnQgeyBIdHRwQ2FjaGUsIE9uR29pbmdIdHRwQ2FjaGUgfSBmcm9tICcuL21vZGVsJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBIdHRwQ2FjaGUsXG4gICAgICB1c2VDbGFzczogTG9jYWxIdHRwQ2FjaGVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogQ2FjaGluZ0ludGVyY2VwdG9yLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9uR29pbmdIdHRwQ2FjaGUsXG4gICAgICB1c2VDbGFzczogTG9jYWxPbmdvaW5nSHR0cENhY2hlXG4gICAgfSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRDYWNoaW5nTW9kdWxlIHsgfVxuIl19