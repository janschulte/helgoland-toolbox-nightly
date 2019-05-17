/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { PredefinedTimespanSelectorComponent } from './predefined-timespan-selector/predefined-timespan-selector.component';
import { TimeListSelectorComponent } from './time-list-selector/time-list-selector.component';
import { TimespanButtonComponent } from './timespan-button/timespan-button.component';
import { TimespanShiftSelectorComponent } from './timespan-shift-selector/timespan-shift-selector.component';
/** @type {?} */
const COMPONENTS = [
    PredefinedTimespanSelectorComponent,
    TimeListSelectorComponent,
    TimespanShiftSelectorComponent,
    TimespanButtonComponent
];
export class HelgolandTimeModule {
}
HelgolandTimeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    COMPONENTS
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    HelgolandCoreModule
                ],
                exports: [
                    COMPONENTS
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3RpbWUvIiwic291cmNlcyI6WyJsaWIvdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUM1SCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQzs7QUFFN0csTUFBTSxVQUFVLEdBQUc7SUFDakIsbUNBQW1DO0lBQ25DLHlCQUF5QjtJQUN6Qiw4QkFBOEI7SUFDOUIsdUJBQXVCO0NBQ3hCLENBQUM7QUFlRixNQUFNOzs7WUFiTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxVQUFVO2lCQUNYO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IFByZWRlZmluZWRUaW1lc3BhblNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yL3ByZWRlZmluZWQtdGltZXNwYW4tc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVMaXN0U2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtbGlzdC1zZWxlY3Rvci90aW1lLWxpc3Qtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVzcGFuQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lc3Bhbi1idXR0b24vdGltZXNwYW4tYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lc3BhblNoaWZ0U2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yL3RpbWVzcGFuLXNoaWZ0LXNlbGVjdG9yLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIFByZWRlZmluZWRUaW1lc3BhblNlbGVjdG9yQ29tcG9uZW50LFxuICBUaW1lTGlzdFNlbGVjdG9yQ29tcG9uZW50LFxuICBUaW1lc3BhblNoaWZ0U2VsZWN0b3JDb21wb25lbnQsXG4gIFRpbWVzcGFuQnV0dG9uQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZFRpbWVNb2R1bGUgeyB9XG4iXX0=