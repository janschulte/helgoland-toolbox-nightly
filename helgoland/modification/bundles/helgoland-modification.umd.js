(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@helgoland/core'), require('ngx-color-picker')) :
    typeof define === 'function' && define.amd ? define('@helgoland/modification', ['exports', '@angular/core', '@angular/forms', '@helgoland/core', 'ngx-color-picker'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.modification = {}),global.ng.core,global.ng.forms,null,null));
}(this, (function (exports,core,forms,core$1,ngxColorPicker) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AxesOptionsComponent = (function () {
        function AxesOptionsComponent() {
            this.onChangeYAxesVisibility = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        AxesOptionsComponent.prototype.changeYAxesVisibility = /**
         * @return {?}
         */
            function () {
                this.onChangeYAxesVisibility.emit();
            };
        AxesOptionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-axes-options',
                        template: "<div class=\"btn-group\">\n  <button type=\"button\" class=\"btn btn-light\" (click)=\"changeYAxesVisibility()\">\n    <span class=\"fa fa-bar-chart\"></span>\n  </button>\n</div>\n"
                    },] },
        ];
        AxesOptionsComponent.propDecorators = {
            onChangeYAxesVisibility: [{ type: core.Output }]
        };
        return AxesOptionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ColorSelectorComponent = (function () {
        function ColorSelectorComponent() {
            this.onColorChange = new core.EventEmitter();
        }
        ColorSelectorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-color-selector',
                        template: "<div class=\"colorpicker\">\n  <span [(colorPicker)]=\"color\" [cpDialogDisplay]=\"'inline'\" [cpCancelButton]=\"true\" [cpCancelButtonText]=\"'Reset'\" [cpPresetColors]=\"colorList\"\n    [cpToggle]=\"true\" [cpPresetLabel]=\"'Presets:'\" (colorPickerChange)=\"onColorChange.emit($event)\">\n  </span>\n</div>"
                    },] },
        ];
        ColorSelectorComponent.propDecorators = {
            color: [{ type: core.Input }],
            colorList: [{ type: core.Input }],
            onColorChange: [{ type: core.Output }]
        };
        return ColorSelectorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DragOptionsComponent = (function () {
        function DragOptionsComponent() {
            this.onTogglePanZoom = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        DragOptionsComponent.prototype.togglePanZoom = /**
         * @return {?}
         */
            function () {
                this.onTogglePanZoom.emit();
            };
        DragOptionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-drag-options',
                        template: "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"togglePanZoom()\">\n        <span class=\"fa fa-cog\"></span>\n    </button>\n</div>\n"
                    },] },
        ];
        DragOptionsComponent.propDecorators = {
            onTogglePanZoom: [{ type: core.Output }]
        };
        return DragOptionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MinMaxRangeComponent = (function () {
        function MinMaxRangeComponent() {
            this.onRangeChange = new core.EventEmitter();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        MinMaxRangeComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes["range"] && this.range) {
                    this.rangeMin = this.range.min;
                    this.rangeMax = this.range.max;
                }
            };
        /**
         * @return {?}
         */
        MinMaxRangeComponent.prototype.setYaxisRange = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var min = (this.rangeMin === null || this.rangeMin === undefined) ? 0 : this.rangeMin;
                /** @type {?} */
                var max = (this.rangeMax === null || this.rangeMax === undefined) ? 0 : this.rangeMax;
                this.onRangeChange.emit({ min: min, max: max });
            };
        /**
         * @return {?}
         */
        MinMaxRangeComponent.prototype.resetYaxisRange = /**
         * @return {?}
         */
            function () {
                this.rangeMin = null;
                this.rangeMax = null;
                this.onRangeChange.emit();
            };
        MinMaxRangeComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-min-max-range',
                        template: "<input type=\"number\" [(ngModel)]=\"rangeMin\" (ngModelChange)=\"setYaxisRange()\">\n<input type=\"number\" [(ngModel)]=\"rangeMax\" (ngModelChange)=\"setYaxisRange()\">\n<button (click)=\"resetYaxisRange()\">reset</button>",
                        styles: [""]
                    },] },
        ];
        MinMaxRangeComponent.propDecorators = {
            range: [{ type: core.Input }],
            onRangeChange: [{ type: core.Output }]
        };
        return MinMaxRangeComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandModificationModule = (function () {
        function HelgolandModificationModule() {
        }
        HelgolandModificationModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            ColorSelectorComponent,
                            AxesOptionsComponent,
                            DragOptionsComponent,
                            MinMaxRangeComponent
                        ],
                        imports: [
                            core$1.HelgolandCoreModule,
                            forms.FormsModule,
                            ngxColorPicker.ColorPickerModule
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.HelgolandModificationModule = HelgolandModificationModule;
    exports.ColorSelectorComponent = ColorSelectorComponent;
    exports.AxesOptionsComponent = AxesOptionsComponent;
    exports.DragOptionsComponent = DragOptionsComponent;
    exports.MinMaxRangeComponent = MinMaxRangeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLW1vZGlmaWNhdGlvbi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvbW9kaWZpY2F0aW9uL2xpYi9heGVzLW9wdGlvbnMvYXhlcy1vcHRpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tb2RpZmljYXRpb24vbGliL2NvbG9yLXNlbGVjdG9yL2NvbG9yLXNlbGVjdG9yLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tb2RpZmljYXRpb24vbGliL2RyYWctb3B0aW9ucy9kcmFnLW9wdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL21vZGlmaWNhdGlvbi9saWIvbWluLW1heC1yYW5nZS9taW4tbWF4LXJhbmdlLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9tb2RpZmljYXRpb24vbGliL21vZGlmaWNhdGlvbi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItYXhlcy1vcHRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCIgKGNsaWNrKT1cImNoYW5nZVlBeGVzVmlzaWJpbGl0eSgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1iYXItY2hhcnRcIj48L3NwYW4+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEF4ZXNPcHRpb25zQ29tcG9uZW50IHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNoYW5nZVlBeGVzVmlzaWJpbGl0eTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGNoYW5nZVlBeGVzVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVlBeGVzVmlzaWJpbGl0eS5lbWl0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItY29sb3Itc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyXCI+XG4gIDxzcGFuIFsoY29sb3JQaWNrZXIpXT1cImNvbG9yXCIgW2NwRGlhbG9nRGlzcGxheV09XCInaW5saW5lJ1wiIFtjcENhbmNlbEJ1dHRvbl09XCJ0cnVlXCIgW2NwQ2FuY2VsQnV0dG9uVGV4dF09XCInUmVzZXQnXCIgW2NwUHJlc2V0Q29sb3JzXT1cImNvbG9yTGlzdFwiXG4gICAgW2NwVG9nZ2xlXT1cInRydWVcIiBbY3BQcmVzZXRMYWJlbF09XCInUHJlc2V0czonXCIgKGNvbG9yUGlja2VyQ2hhbmdlKT1cIm9uQ29sb3JDaGFuZ2UuZW1pdCgkZXZlbnQpXCI+XG4gIDwvc3Bhbj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29sb3JMaXN0OiBzdHJpbmdbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbG9yQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWRyYWctb3B0aW9ucycsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCIgKGNsaWNrKT1cInRvZ2dsZVBhblpvb20oKVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNvZ1wiPjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBEcmFnT3B0aW9uc0NvbXBvbmVudCB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Ub2dnbGVQYW5ab29tOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdG9nZ2xlUGFuWm9vbSgpIHtcbiAgICAgICAgdGhpcy5vblRvZ2dsZVBhblpvb20uZW1pdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbk1heFJhbmdlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLW1pbi1tYXgtcmFuZ2UnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgWyhuZ01vZGVsKV09XCJyYW5nZU1pblwiIChuZ01vZGVsQ2hhbmdlKT1cInNldFlheGlzUmFuZ2UoKVwiPlxuPGlucHV0IHR5cGU9XCJudW1iZXJcIiBbKG5nTW9kZWwpXT1cInJhbmdlTWF4XCIgKG5nTW9kZWxDaGFuZ2UpPVwic2V0WWF4aXNSYW5nZSgpXCI+XG48YnV0dG9uIChjbGljayk9XCJyZXNldFlheGlzUmFuZ2UoKVwiPnJlc2V0PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1pbk1heFJhbmdlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBwdWJsaWMgcmFuZ2VNaW46IG51bWJlcjtcbiAgcHVibGljIHJhbmdlTWF4OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJhbmdlOiBNaW5NYXhSYW5nZTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uUmFuZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNaW5NYXhSYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5yYW5nZSAmJiB0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnJhbmdlTWluID0gdGhpcy5yYW5nZS5taW47XG4gICAgICB0aGlzLnJhbmdlTWF4ID0gdGhpcy5yYW5nZS5tYXg7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFlheGlzUmFuZ2UoKSB7XG4gICAgY29uc3QgbWluID0gKHRoaXMucmFuZ2VNaW4gPT09IG51bGwgfHwgdGhpcy5yYW5nZU1pbiA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0aGlzLnJhbmdlTWluO1xuICAgIGNvbnN0IG1heCA9ICh0aGlzLnJhbmdlTWF4ID09PSBudWxsIHx8IHRoaXMucmFuZ2VNYXggPT09IHVuZGVmaW5lZCkgPyAwIDogdGhpcy5yYW5nZU1heDtcbiAgICB0aGlzLm9uUmFuZ2VDaGFuZ2UuZW1pdCh7IG1pbiwgbWF4IH0pO1xuICB9XG5cbiAgcHVibGljIHJlc2V0WWF4aXNSYW5nZSgpIHtcbiAgICB0aGlzLnJhbmdlTWluID0gbnVsbDtcbiAgICB0aGlzLnJhbmdlTWF4ID0gbnVsbDtcbiAgICB0aGlzLm9uUmFuZ2VDaGFuZ2UuZW1pdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbGdvbGFuZENvcmVNb2R1bGUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JQaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtY29sb3ItcGlja2VyJztcblxuaW1wb3J0IHsgQXhlc09wdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2F4ZXMtb3B0aW9ucy9heGVzLW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXNlbGVjdG9yL2NvbG9yLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFnT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vZHJhZy1vcHRpb25zL2RyYWctb3B0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWluTWF4UmFuZ2VDb21wb25lbnQgfSBmcm9tICcuL21pbi1tYXgtcmFuZ2UvbWluLW1heC1yYW5nZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDb2xvclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIEF4ZXNPcHRpb25zQ29tcG9uZW50LFxuICAgIERyYWdPcHRpb25zQ29tcG9uZW50LFxuICAgIE1pbk1heFJhbmdlQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvbG9yUGlja2VyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDb2xvclNlbGVjdG9yQ29tcG9uZW50LFxuICAgIEF4ZXNPcHRpb25zQ29tcG9uZW50LFxuICAgIERyYWdPcHRpb25zQ29tcG9uZW50LFxuICAgIE1pbk1heFJhbmdlQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZE1vZGlmaWNhdGlvbk1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJPdXRwdXQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiSGVsZ29sYW5kQ29yZU1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29sb3JQaWNrZXJNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7MkNBY3lELElBQUlBLGlCQUFZLEVBQUU7Ozs7O1FBRWhFLG9EQUFxQjs7OztnQkFDeEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDOzs7b0JBZjNDQyxjQUFTLFNBQUM7d0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsUUFBUSxFQUFFLHVMQUtiO3FCQUNBOzs7OENBR0lDLFdBQU07O21DQWJYOzs7Ozs7O0FDQUE7O2lDQW1CaUQsSUFBSUYsaUJBQVksRUFBVTs7O29CQWpCMUVDLGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsb0JBQW9CO3dCQUM5QixRQUFRLEVBQUUsd1RBSVA7cUJBQ047Ozs0QkFHSUUsVUFBSztnQ0FHTEEsVUFBSztvQ0FHTEQsV0FBTTs7cUNBbEJYOzs7Ozs7O0FDQUE7O21DQWNpRCxJQUFJRixpQkFBWSxFQUFFOzs7OztRQUV4RCw0Q0FBYTs7OztnQkFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O29CQWZuQ0MsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLFFBQVEsRUFBRSxpTEFLYjtxQkFDQTs7O3NDQUdJQyxXQUFNOzttQ0FiWDs7Ozs7OztBQ0FBOztpQ0FtQm9ELElBQUlGLGlCQUFZLEVBQUU7Ozs7OztRQUU3RCwwQ0FBVzs7OztzQkFBQyxPQUFzQjtnQkFDdkMsSUFBSSxPQUFPLGFBQVUsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDaEM7Ozs7O1FBR0ksNENBQWE7Ozs7O2dCQUNsQixJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDOztnQkFDeEYsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDeEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUM7Ozs7O1FBR2pDLDhDQUFlOzs7O2dCQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OztvQkFsQzdCQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjt3QkFDN0IsUUFBUSxFQUFFLGtPQUV1Qzt3QkFDakQsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO3FCQUNiOzs7NEJBTUVFLFVBQUs7b0NBR0xELFdBQU07O21DQWxCVDs7Ozs7OztBQ0FBOzs7O29CQVVDRSxhQUFRLFNBQUM7d0JBQ1IsWUFBWSxFQUFFOzRCQUNaLHNCQUFzQjs0QkFDdEIsb0JBQW9COzRCQUNwQixvQkFBb0I7NEJBQ3BCLG9CQUFvQjt5QkFDckI7d0JBQ0QsT0FBTyxFQUFFOzRCQUNQQywwQkFBbUI7NEJBQ25CQyxpQkFBVzs0QkFDWEMsZ0NBQWlCO3lCQUNsQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1Asc0JBQXNCOzRCQUN0QixvQkFBb0I7NEJBQ3BCLG9CQUFvQjs0QkFDcEIsb0JBQW9CO3lCQUNyQjt3QkFDRCxTQUFTLEVBQUUsRUFDVjtxQkFDRjs7MENBOUJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=