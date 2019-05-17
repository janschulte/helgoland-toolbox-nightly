/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandLabelMapperModule } from '@helgoland/depiction';
import { TranslateModule } from '@ngx-translate/core';
import { DatasetByStationSelectorComponent } from './dataset-by-station-selector/dataset-by-station-selector.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { ListSelectorService } from './list-selector/list-selector.service';
import { MultiServiceFilterSelectorComponent, } from './multi-service-filter-selector/multi-service-filter-selector.component';
import { ServiceFilterSelectorComponent } from './service-filter-selector/service-filter-selector.component';
import { ServiceSelectorComponent } from './service-selector/service-selector.component';
import { ServiceSelectorService } from './service-selector/service-selector.service';
export class HelgolandSelectorModule {
}
HelgolandSelectorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ServiceSelectorComponent,
                    ServiceFilterSelectorComponent,
                    DatasetByStationSelectorComponent,
                    MultiServiceFilterSelectorComponent,
                    ListSelectorComponent
                ],
                imports: [
                    CommonModule,
                    TranslateModule,
                    HelgolandLabelMapperModule,
                    HelgolandCoreModule
                ],
                exports: [
                    ServiceSelectorComponent,
                    ServiceFilterSelectorComponent,
                    DatasetByStationSelectorComponent,
                    MultiServiceFilterSelectorComponent,
                    ListSelectorComponent
                ],
                providers: [
                    ServiceSelectorService,
                    ListSelectorService
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUN4SCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsbUNBQW1DLEdBQ3BDLE1BQU0seUVBQXlFLENBQUM7QUFDakYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDN0csT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUE0QnJGLE1BQU07OztZQTFCTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHdCQUF3QjtvQkFDeEIsOEJBQThCO29CQUM5QixpQ0FBaUM7b0JBQ2pDLG1DQUFtQztvQkFDbkMscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO29CQUNmLDBCQUEwQjtvQkFDMUIsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asd0JBQXdCO29CQUN4Qiw4QkFBOEI7b0JBQzlCLGlDQUFpQztvQkFDakMsbUNBQW1DO29CQUNuQyxxQkFBcUI7aUJBQ3RCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxzQkFBc0I7b0JBQ3RCLG1CQUFtQjtpQkFDcEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRMYWJlbE1hcHBlck1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvZGVwaWN0aW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL2RhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3Rvci9kYXRhc2V0LWJ5LXN0YXRpb24tc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1zZWxlY3Rvci9saXN0LXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0U2VsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9saXN0LXNlbGVjdG9yL2xpc3Qtc2VsZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQge1xuICBNdWx0aVNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbn0gZnJvbSAnLi9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9zZXJ2aWNlLXNlbGVjdG9yL3NlcnZpY2Utc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFNlcnZpY2VTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Utc2VsZWN0b3Ivc2VydmljZS1zZWxlY3Rvci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTXVsdGlTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTGlzdFNlbGVjdG9yQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlLFxuICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNlcnZpY2VTZWxlY3RvckNvbXBvbmVudCxcbiAgICBTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQsXG4gICAgRGF0YXNldEJ5U3RhdGlvblNlbGVjdG9yQ29tcG9uZW50LFxuICAgIE11bHRpU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIExpc3RTZWxlY3RvckNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZXJ2aWNlU2VsZWN0b3JTZXJ2aWNlLFxuICAgIExpc3RTZWxlY3RvclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRTZWxlY3Rvck1vZHVsZSB7IH1cbiJdfQ==