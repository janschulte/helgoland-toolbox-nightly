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
var COMPONENTS = [
    LocateControlComponent,
    ZoomControlComponent,
    GeosearchControlComponent,
    ExtentControlComponent
];
var HelgolandMapControlModule = /** @class */ (function () {
    function HelgolandMapControlModule() {
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
    return HelgolandMapControlModule;
}());
export { HelgolandMapControlModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9tYXAvIiwic291cmNlcyI6WyJsaWIvY29udHJvbC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTdELElBQU0sVUFBVSxHQUFHO0lBQ2pCLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLHNCQUFzQjtDQUN2QixDQUFDOzs7OztnQkFFRCxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGtCQUFrQjtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULGFBQWE7cUJBQ2Q7aUJBQ0Y7O29DQW5DRDs7U0FvQ2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBIZWxnb2xhbmRNYXBNb2R1bGUgfSBmcm9tICcuLi9iYXNlL21hcC5tb2R1bGUnO1xuaW1wb3J0IHsgRXh0ZW50Q29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZXh0ZW50L2V4dGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2Vvc2VhcmNoQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZ2Vvc2VhcmNoL2dlb3NlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9jYXRlQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vbG9jYXRlL2xvY2F0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9jYXRlU2VydmljZSB9IGZyb20gJy4vbG9jYXRlL2xvY2F0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFpvb21Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi96b29tL3pvb20uY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgTG9jYXRlQ29udHJvbENvbXBvbmVudCxcbiAgWm9vbUNvbnRyb2xDb21wb25lbnQsXG4gIEdlb3NlYXJjaENvbnRyb2xDb21wb25lbnQsXG4gIEV4dGVudENvbnRyb2xDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgIEhlbGdvbGFuZE1hcE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBMb2NhdGVTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTWFwQ29udHJvbE1vZHVsZSB7IH1cbiJdfQ==