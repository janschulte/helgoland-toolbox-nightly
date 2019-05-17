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
var HelgolandSelectorModule = /** @class */ (function () {
    function HelgolandSelectorModule() {
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
    return HelgolandSelectorModule;
}());
export { HelgolandSelectorModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9zZWxlY3Rvci8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUN4SCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsbUNBQW1DLEdBQ3BDLE1BQU0seUVBQXlFLENBQUM7QUFDakYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDN0csT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7O2dCQUVwRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIsOEJBQThCO3dCQUM5QixpQ0FBaUM7d0JBQ2pDLG1DQUFtQzt3QkFDbkMscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLDBCQUEwQjt3QkFDMUIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLGlDQUFpQzt3QkFDakMsbUNBQW1DO3dCQUNuQyxxQkFBcUI7cUJBQ3RCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxzQkFBc0I7d0JBQ3RCLG1CQUFtQjtxQkFDcEI7aUJBQ0Y7O2tDQXpDRDs7U0EwQ2EsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9kZXBpY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IERhdGFzZXRCeVN0YXRpb25TZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yL2RhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXNlbGVjdG9yL2xpc3Qtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL2xpc3Qtc2VsZWN0b3IvbGlzdC1zZWxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE11bHRpU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50LFxufSBmcm9tICcuL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3NlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL3NlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2aWNlU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3NlcnZpY2Utc2VsZWN0b3Ivc2VydmljZS1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VydmljZVNlbGVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS1zZWxlY3Rvci9zZXJ2aWNlLXNlbGVjdG9yLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTZXJ2aWNlU2VsZWN0b3JDb21wb25lbnQsXG4gICAgU2VydmljZUZpbHRlclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIERhdGFzZXRCeVN0YXRpb25TZWxlY3RvckNvbXBvbmVudCxcbiAgICBNdWx0aVNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBMaXN0U2VsZWN0b3JDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGUsXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2VydmljZVNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFNlcnZpY2VGaWx0ZXJTZWxlY3RvckNvbXBvbmVudCxcbiAgICBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTXVsdGlTZXJ2aWNlRmlsdGVyU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTGlzdFNlbGVjdG9yQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNlcnZpY2VTZWxlY3RvclNlcnZpY2UsXG4gICAgTGlzdFNlbGVjdG9yU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZFNlbGVjdG9yTW9kdWxlIHsgfVxuIl19