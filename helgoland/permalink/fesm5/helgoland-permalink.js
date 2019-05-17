import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PermalinkInMailComponent = /** @class */ (function () {
    function PermalinkInMailComponent() {
        this.onTriggered = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PermalinkInMailComponent.prototype.openInMail = /**
     * @return {?}
     */
    function () {
        window.location.href = 'mailto:?body=' + encodeURIComponent(this.url);
        this.onTriggered.emit();
    };
    PermalinkInMailComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-permalink-in-mail',
                    template: "<button type=\"button\" (click)=\"openInMail()\">open in mail</button>"
                },] },
    ];
    PermalinkInMailComponent.propDecorators = {
        url: [{ type: Input }],
        onTriggered: [{ type: Output }]
    };
    return PermalinkInMailComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PermalinkNewWindowComponent = /** @class */ (function () {
    function PermalinkNewWindowComponent() {
        this.onTriggered = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PermalinkNewWindowComponent.prototype.openInNewWindow = /**
     * @return {?}
     */
    function () {
        window.open(this.url, '_blank');
        this.onTriggered.emit();
    };
    PermalinkNewWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-permalink-new-window',
                    template: "<button type=\"button\" (click)=\"openInNewWindow()\">open in new window</button>"
                },] },
    ];
    PermalinkNewWindowComponent.propDecorators = {
        url: [{ type: Input }],
        onTriggered: [{ type: Output }]
    };
    return PermalinkNewWindowComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PermalinkToClipboardComponent = /** @class */ (function () {
    function PermalinkToClipboardComponent() {
        this.onTriggered = new EventEmitter();
    }
    PermalinkToClipboardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-permalink-to-clipboard',
                    template: "<button type=\"button\" ngxClipboard [cbContent]=\"url\" (click)=\"onTriggered.emit()\">copy to clipboard</button>\n"
                },] },
    ];
    PermalinkToClipboardComponent.propDecorators = {
        url: [{ type: Input }],
        onTriggered: [{ type: Output }]
    };
    return PermalinkToClipboardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS = [
    PermalinkInMailComponent,
    PermalinkNewWindowComponent,
    PermalinkToClipboardComponent
];
var HelgolandPermalinkModule = /** @class */ (function () {
    function HelgolandPermalinkModule() {
    }
    HelgolandPermalinkModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        COMPONENTS
                    ],
                    imports: [
                        ClipboardModule
                    ],
                    exports: [
                        COMPONENTS
                    ],
                    providers: []
                },] },
    ];
    return HelgolandPermalinkModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
PermalinkService = /** @class */ (function () {
    function PermalinkService() {
        var _this = this;
        this.createPermalink = function () {
            return _this.generatePermalink();
        };
    }
    /**
     * @return {?}
     */
    PermalinkService.prototype.createBaseUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = window.location.href;
        if (url.indexOf('?') !== -1) {
            return url.substring(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    };
    return PermalinkService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandPermalinkModule, PermalinkInMailComponent, PermalinkNewWindowComponent, PermalinkToClipboardComponent, PermalinkService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXBlcm1hbGluay5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3Blcm1hbGluay1pbi1tYWlsL3Blcm1hbGluay1pbi1tYWlsLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3Blcm1hbGluay1uZXctd2luZG93L3Blcm1hbGluay1uZXctd2luZG93LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3Blcm1hbGluay10by1jbGlwYm9hcmQvcGVybWFsaW5rLXRvLWNsaXBib2FyZC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvcGVybWFsaW5rL2xpYi9wZXJtYWxpbmsubW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL3Blcm1hbGluay9saWIvc2VydmljZXMvcGVybWFsaW5rLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXBlcm1hbGluay1pbi1tYWlsJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib3BlbkluTWFpbCgpXCI+b3BlbiBpbiBtYWlsPC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtYWxpbmtJbk1haWxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHVibGljIG9wZW5Jbk1haWwoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnbWFpbHRvOj9ib2R5PScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy51cmwpO1xuICAgIHRoaXMub25UcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstbmV3LXdpbmRvdycsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW5Jbk5ld1dpbmRvdygpXCI+b3BlbiBpbiBuZXcgd2luZG93PC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtYWxpbmtOZXdXaW5kb3dDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHVibGljIG9wZW5Jbk5ld1dpbmRvdygpIHtcbiAgICB3aW5kb3cub3Blbih0aGlzLnVybCwgJ19ibGFuaycpO1xuICAgIHRoaXMub25UcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstdG8tY2xpcGJvYXJkJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuZ3hDbGlwYm9hcmQgW2NiQ29udGVudF09XCJ1cmxcIiAoY2xpY2spPVwib25UcmlnZ2VyZWQuZW1pdCgpXCI+Y29weSB0byBjbGlwYm9hcmQ8L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbGlwYm9hcmRNb2R1bGUgfSBmcm9tICduZ3gtY2xpcGJvYXJkJztcblxuaW1wb3J0IHsgUGVybWFsaW5rSW5NYWlsQ29tcG9uZW50IH0gZnJvbSAnLi9wZXJtYWxpbmstaW4tbWFpbC9wZXJtYWxpbmstaW4tbWFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGVybWFsaW5rTmV3V2luZG93Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtYWxpbmstbmV3LXdpbmRvdy9wZXJtYWxpbmstbmV3LXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3Blcm1hbGluay10by1jbGlwYm9hcmQvcGVybWFsaW5rLXRvLWNsaXBib2FyZC5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBQZXJtYWxpbmtJbk1haWxDb21wb25lbnQsXG4gIFBlcm1hbGlua05ld1dpbmRvd0NvbXBvbmVudCxcbiAgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENsaXBib2FyZE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRQZXJtYWxpbmtNb2R1bGUgeyB9XG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgUGVybWFsaW5rU2VydmljZTxUPiB7XG5cbiAgcHVibGljIGNyZWF0ZVBlcm1hbGluayA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVBlcm1hbGluaygpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHZhbGlkYXRlUGVyYW1saW5rKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdlbmVyYXRlUGVybWFsaW5rKCk6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY3JlYXRlQmFzZVVybCgpIHtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBpZiAodXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKDAsIHVybC5pbmRleE9mKCc/JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7MkJBWTJDLElBQUksWUFBWSxFQUFROzs7OztJQUUxRCw2Q0FBVTs7OztRQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2dCQWQzQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHdFQUFvRTtpQkFDL0U7OztzQkFHRSxLQUFLOzhCQUdMLE1BQU07O21DQVhUOzs7Ozs7O0FDQUE7OzJCQVkyQyxJQUFJLFlBQVksRUFBUTs7Ozs7SUFFMUQscURBQWU7Ozs7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7OztnQkFkM0IsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxtRkFBK0U7aUJBQzFGOzs7c0JBR0UsS0FBSzs4QkFHTCxNQUFNOztzQ0FYVDs7Ozs7OztBQ0FBOzsyQkFhMkMsSUFBSSxZQUFZLEVBQVE7OztnQkFYbEUsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRSxzSEFDWDtpQkFDQTs7O3NCQUdFLEtBQUs7OEJBR0wsTUFBTTs7d0NBWlQ7Ozs7Ozs7QUNBQTtBQU9BLElBQU0sVUFBVSxHQUFHO0lBQ2pCLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsNkJBQTZCO0NBQzlCLENBQUM7Ozs7O2dCQUVELFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osVUFBVTtxQkFDWDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFLEVBQ1Y7aUJBQ0Y7O21DQXpCRDs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUFBOzs7K0JBRTJCO1lBQ3ZCLE9BQU8sS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDakM7Ozs7O0lBTVMsd0NBQWE7OztJQUF2Qjs7UUFDRSxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDO1NBQ1o7S0FDRjsyQkFqQkg7SUFrQkM7Ozs7Ozs7Ozs7Ozs7OyJ9