/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { AxesOptionsComponent } from './axes-options/axes-options.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { DragOptionsComponent } from './drag-options/drag-options.component';
import { MinMaxRangeComponent } from './min-max-range/min-max-range.component';
var HelgolandModificationModule = /** @class */ (function () {
    function HelgolandModificationModule() {
    }
    HelgolandModificationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ColorSelectorComponent,
                        AxesOptionsComponent,
                        DragOptionsComponent,
                        MinMaxRangeComponent
                    ],
                    imports: [
                        HelgolandCoreModule,
                        FormsModule,
                        ColorPickerModule
                    ],
                    exports: [
                        ColorSelectorComponent,
                        AxesOptionsComponent,
                        DragOptionsComponent,
                        MinMaxRangeComponent
                    ],
                    providers: []
                },] },
    ];
    return HelgolandModificationModule;
}());
export { HelgolandModificationModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpY2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL21vZGlmaWNhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXJELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7OztnQkFFOUUsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixvQkFBb0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLFdBQVc7d0JBQ1gsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asc0JBQXNCO3dCQUN0QixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUUsRUFDVjtpQkFDRjs7c0NBOUJEOztTQStCYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IENvbG9yUGlja2VyTW9kdWxlIH0gZnJvbSAnbmd4LWNvbG9yLXBpY2tlcic7XG5cbmltcG9ydCB7IEF4ZXNPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9heGVzLW9wdGlvbnMvYXhlcy1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvclNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1zZWxlY3Rvci9jb2xvci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJhZ09wdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2RyYWctb3B0aW9ucy9kcmFnLW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1pbk1heFJhbmdlQ29tcG9uZW50IH0gZnJvbSAnLi9taW4tbWF4LXJhbmdlL21pbi1tYXgtcmFuZ2UuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ29sb3JTZWxlY3RvckNvbXBvbmVudCxcbiAgICBBeGVzT3B0aW9uc0NvbXBvbmVudCxcbiAgICBEcmFnT3B0aW9uc0NvbXBvbmVudCxcbiAgICBNaW5NYXhSYW5nZUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb2xvclBpY2tlck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29sb3JTZWxlY3RvckNvbXBvbmVudCxcbiAgICBBeGVzT3B0aW9uc0NvbXBvbmVudCxcbiAgICBEcmFnT3B0aW9uc0NvbXBvbmVudCxcbiAgICBNaW5NYXhSYW5nZUNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRNb2RpZmljYXRpb25Nb2R1bGUgeyB9XG4iXX0=