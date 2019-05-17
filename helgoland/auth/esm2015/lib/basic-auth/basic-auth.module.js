/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HTTP_SERVICE_INTERCEPTORS } from '@helgoland/core';
import { BasicAuthServiceMaintainer } from './basic-auth-service-maintainer.service';
import { BasicAuthService } from './basic-auth.service';
import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';
export class HelgolandBasicAuthModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2F1dGgvIiwic291cmNlcyI6WyJsaWIvYmFzaWMtYXV0aC9iYXNpYy1hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQWEvRSxNQUFNOzs7WUFYTCxRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNULGdCQUFnQjtvQkFDaEIsMEJBQTBCO29CQUMxQjt3QkFDRSxPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxRQUFRLEVBQUUsMkJBQTJCO3dCQUNyQyxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBCYXNpY0F1dGhTZXJ2aWNlTWFpbnRhaW5lciB9IGZyb20gJy4vYmFzaWMtYXV0aC1zZXJ2aWNlLW1haW50YWluZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNpY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9iYXNpYy1hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlIH0gZnJvbSAnLi9iYXNpYy1hdXRoLWludGVyY2VwdG9yLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBCYXNpY0F1dGhTZXJ2aWNlLFxuICAgIEJhc2ljQXV0aFNlcnZpY2VNYWludGFpbmVyLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogQmFzaWNBdXRoSW50ZXJjZXB0b3JTZXJ2aWNlLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kQmFzaWNBdXRoTW9kdWxlIHsgfVxuIl19