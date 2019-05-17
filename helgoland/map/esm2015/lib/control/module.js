/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandMapModule } from '../base/map.module';
import { ExtentControlComponent } from './extent/extent.component';
import { GeosearchControlComponent } from './geosearch/geosearch.component';
import { LocateControlComponent } from './locate/locate.component';
import { LocateService } from './locate/locate.service';
import { ZoomControlComponent } from './zoom/zoom.component';
/** @type {?} */
const COMPONENTS = [
    LocateControlComponent,
    ZoomControlComponent,
    GeosearchControlComponent,
    ExtentControlComponent
];
export class HelgolandMapControlModule {
}
HelgolandMapControlModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    COMPONENTS
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    HelgolandCoreModule,
                    HelgolandMapModule
                ],
                exports: [
                    COMPONENTS
                ],
                providers: [
                    LocateService
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvY29udHJvbC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTdELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLHNCQUFzQjtDQUN2QixDQUFDO0FBbUJGLE1BQU07OztZQWpCTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFVBQVU7aUJBQ1g7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGFBQWE7aUJBQ2Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgSGVsZ29sYW5kTWFwTW9kdWxlIH0gZnJvbSAnLi4vYmFzZS9tYXAubW9kdWxlJztcbmltcG9ydCB7IEV4dGVudENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2V4dGVudC9leHRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEdlb3NlYXJjaENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2dlb3NlYXJjaC9nZW9zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IExvY2F0ZUNvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2xvY2F0ZS9sb2NhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IExvY2F0ZVNlcnZpY2UgfSBmcm9tICcuL2xvY2F0ZS9sb2NhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBab29tQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vem9vbS96b29tLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIExvY2F0ZUNvbnRyb2xDb21wb25lbnQsXG4gIFpvb21Db250cm9sQ29tcG9uZW50LFxuICBHZW9zZWFyY2hDb250cm9sQ29tcG9uZW50LFxuICBFeHRlbnRDb250cm9sQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZSxcbiAgICBIZWxnb2xhbmRNYXBNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTG9jYXRlU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZE1hcENvbnRyb2xNb2R1bGUgeyB9XG4iXX0=