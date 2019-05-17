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
var COMPONENTS = [
    PredefinedTimespanSelectorComponent,
    TimeListSelectorComponent,
    TimespanShiftSelectorComponent,
    TimespanButtonComponent
];
var HelgolandTimeModule = /** @class */ (function () {
    function HelgolandTimeModule() {
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
    return HelgolandTimeModule;
}());
export { HelgolandTimeModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3RpbWUvIiwic291cmNlcyI6WyJsaWIvdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQztBQUM1SCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQzs7QUFFN0csSUFBTSxVQUFVLEdBQUc7SUFDakIsbUNBQW1DO0lBQ25DLHlCQUF5QjtJQUN6Qiw4QkFBOEI7SUFDOUIsdUJBQXVCO0NBQ3hCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osVUFBVTtxQkFDWDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVU7cUJBQ1g7aUJBQ0Y7OzhCQTdCRDs7U0E4QmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBQcmVkZWZpbmVkVGltZXNwYW5TZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vcHJlZGVmaW5lZC10aW1lc3Bhbi1zZWxlY3Rvci9wcmVkZWZpbmVkLXRpbWVzcGFuLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lTGlzdFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLWxpc3Qtc2VsZWN0b3IvdGltZS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lc3BhbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vdGltZXNwYW4tYnV0dG9uL3RpbWVzcGFuLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZXNwYW5TaGlmdFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lc3Bhbi1zaGlmdC1zZWxlY3Rvci90aW1lc3Bhbi1zaGlmdC1zZWxlY3Rvci5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBQcmVkZWZpbmVkVGltZXNwYW5TZWxlY3RvckNvbXBvbmVudCxcbiAgVGltZUxpc3RTZWxlY3RvckNvbXBvbmVudCxcbiAgVGltZXNwYW5TaGlmdFNlbGVjdG9yQ29tcG9uZW50LFxuICBUaW1lc3BhbkJ1dHRvbkNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRUaW1lTW9kdWxlIHsgfVxuIl19