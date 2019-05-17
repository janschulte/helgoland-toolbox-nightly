/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HTTP_SERVICE_INTERCEPTORS } from '@helgoland/core';
import { BasicAuthServiceMaintainer } from './basic-auth-service-maintainer.service';
import { BasicAuthService } from './basic-auth.service';
import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';
var HelgolandBasicAuthModule = /** @class */ (function () {
    function HelgolandBasicAuthModule() {
    }
    HelgolandBasicAuthModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        BasicAuthService,
                        BasicAuthServiceMaintainer,
                        {
                            provide: HTTP_SERVICE_INTERCEPTORS,
                            useClass: BasicAuthInterceptorService,
                            multi: true
                        }
                    ]
                },] },
    ];
    return HelgolandBasicAuthModule;
}());
export { HelgolandBasicAuthModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2F1dGgvIiwic291cmNlcyI6WyJsaWIvYmFzaWMtYXV0aC9iYXNpYy1hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Z0JBRTlFLFFBQVEsU0FBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsZ0JBQWdCO3dCQUNoQiwwQkFBMEI7d0JBQzFCOzRCQUNFLE9BQU8sRUFBRSx5QkFBeUI7NEJBQ2xDLFFBQVEsRUFBRSwyQkFBMkI7NEJBQ3JDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGOzttQ0FqQkQ7O1NBa0JhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZU1haW50YWluZXIgfSBmcm9tICcuL2Jhc2ljLWF1dGgtc2VydmljZS1tYWludGFpbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNBdXRoU2VydmljZSB9IGZyb20gJy4vYmFzaWMtYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2ljQXV0aEludGVyY2VwdG9yU2VydmljZSB9IGZyb20gJy4vYmFzaWMtYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQmFzaWNBdXRoU2VydmljZSxcbiAgICBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lcixcbiAgICB7XG4gICAgICBwcm92aWRlOiBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlQ2xhc3M6IEJhc2ljQXV0aEludGVyY2VwdG9yU2VydmljZSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZEJhc2ljQXV0aE1vZHVsZSB7IH1cbiJdfQ==