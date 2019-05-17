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
export class HelgolandModificationModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpY2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL21vZGlmaWNhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXJELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBdUIvRSxNQUFNOzs7WUFyQkwsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixvQkFBb0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLFdBQVc7b0JBQ1gsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO29CQUN0QixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO2lCQUNyQjtnQkFDRCxTQUFTLEVBQUUsRUFDVjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBDb2xvclBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1jb2xvci1waWNrZXInO1xuXG5pbXBvcnQgeyBBeGVzT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vYXhlcy1vcHRpb25zL2F4ZXMtb3B0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sb3JTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IERyYWdPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9kcmFnLW9wdGlvbnMvZHJhZy1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNaW5NYXhSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4vbWluLW1heC1yYW5nZS9taW4tbWF4LXJhbmdlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENvbG9yU2VsZWN0b3JDb21wb25lbnQsXG4gICAgQXhlc09wdGlvbnNDb21wb25lbnQsXG4gICAgRHJhZ09wdGlvbnNDb21wb25lbnQsXG4gICAgTWluTWF4UmFuZ2VDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEhlbGdvbGFuZENvcmVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQ29sb3JQaWNrZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbG9yU2VsZWN0b3JDb21wb25lbnQsXG4gICAgQXhlc09wdGlvbnNDb21wb25lbnQsXG4gICAgRHJhZ09wdGlvbnNDb21wb25lbnQsXG4gICAgTWluTWF4UmFuZ2VDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kTW9kaWZpY2F0aW9uTW9kdWxlIHsgfVxuIl19