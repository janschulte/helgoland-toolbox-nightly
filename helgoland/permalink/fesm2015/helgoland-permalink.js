import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PermalinkInMailComponent {
    constructor() {
        this.onTriggered = new EventEmitter();
    }
    /**
     * @return {?}
     */
    openInMail() {
        window.location.href = 'mailto:?body=' + encodeURIComponent(this.url);
        this.onTriggered.emit();
    }
}
PermalinkInMailComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-permalink-in-mail',
                template: `<button type="button" (click)="openInMail()">open in mail</button>`
            },] },
];
PermalinkInMailComponent.propDecorators = {
    url: [{ type: Input }],
    onTriggered: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PermalinkNewWindowComponent {
    constructor() {
        this.onTriggered = new EventEmitter();
    }
    /**
     * @return {?}
     */
    openInNewWindow() {
        window.open(this.url, '_blank');
        this.onTriggered.emit();
    }
}
PermalinkNewWindowComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-permalink-new-window',
                template: `<button type="button" (click)="openInNewWindow()">open in new window</button>`
            },] },
];
PermalinkNewWindowComponent.propDecorators = {
    url: [{ type: Input }],
    onTriggered: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PermalinkToClipboardComponent {
    constructor() {
        this.onTriggered = new EventEmitter();
    }
}
PermalinkToClipboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-permalink-to-clipboard',
                template: `<button type="button" ngxClipboard [cbContent]="url" (click)="onTriggered.emit()">copy to clipboard</button>
`
            },] },
];
PermalinkToClipboardComponent.propDecorators = {
    url: [{ type: Input }],
    onTriggered: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const COMPONENTS = [
    PermalinkInMailComponent,
    PermalinkNewWindowComponent,
    PermalinkToClipboardComponent
];
class HelgolandPermalinkModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class PermalinkService {
    constructor() {
        this.createPermalink = () => {
            return this.generatePermalink();
        };
    }
    /**
     * @return {?}
     */
    createBaseUrl() {
        /** @type {?} */
        const url = window.location.href;
        if (url.indexOf('?') !== -1) {
            return url.substring(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandPermalinkModule, PermalinkInMailComponent, PermalinkNewWindowComponent, PermalinkToClipboardComponent, PermalinkService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXBlcm1hbGluay5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3Blcm1hbGluay1pbi1tYWlsL3Blcm1hbGluay1pbi1tYWlsLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3Blcm1hbGluay1uZXctd2luZG93L3Blcm1hbGluay1uZXctd2luZG93LmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3Blcm1hbGluay10by1jbGlwYm9hcmQvcGVybWFsaW5rLXRvLWNsaXBib2FyZC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvcGVybWFsaW5rL2xpYi9wZXJtYWxpbmsubW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL3Blcm1hbGluay9saWIvc2VydmljZXMvcGVybWFsaW5rLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLXBlcm1hbGluay1pbi1tYWlsJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib3BlbkluTWFpbCgpXCI+b3BlbiBpbiBtYWlsPC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtYWxpbmtJbk1haWxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHVibGljIG9wZW5Jbk1haWwoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnbWFpbHRvOj9ib2R5PScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy51cmwpO1xuICAgIHRoaXMub25UcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstbmV3LXdpbmRvdycsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW5Jbk5ld1dpbmRvdygpXCI+b3BlbiBpbiBuZXcgd2luZG93PC9idXR0b24+YFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtYWxpbmtOZXdXaW5kb3dDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHVibGljIG9wZW5Jbk5ld1dpbmRvdygpIHtcbiAgICB3aW5kb3cub3Blbih0aGlzLnVybCwgJ19ibGFuaycpO1xuICAgIHRoaXMub25UcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstdG8tY2xpcGJvYXJkJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuZ3hDbGlwYm9hcmQgW2NiQ29udGVudF09XCJ1cmxcIiAoY2xpY2spPVwib25UcmlnZ2VyZWQuZW1pdCgpXCI+Y29weSB0byBjbGlwYm9hcmQ8L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB1cmw6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIG9uVHJpZ2dlcmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbGlwYm9hcmRNb2R1bGUgfSBmcm9tICduZ3gtY2xpcGJvYXJkJztcblxuaW1wb3J0IHsgUGVybWFsaW5rSW5NYWlsQ29tcG9uZW50IH0gZnJvbSAnLi9wZXJtYWxpbmstaW4tbWFpbC9wZXJtYWxpbmstaW4tbWFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGVybWFsaW5rTmV3V2luZG93Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtYWxpbmstbmV3LXdpbmRvdy9wZXJtYWxpbmstbmV3LXdpbmRvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3Blcm1hbGluay10by1jbGlwYm9hcmQvcGVybWFsaW5rLXRvLWNsaXBib2FyZC5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBQZXJtYWxpbmtJbk1haWxDb21wb25lbnQsXG4gIFBlcm1hbGlua05ld1dpbmRvd0NvbXBvbmVudCxcbiAgUGVybWFsaW5rVG9DbGlwYm9hcmRDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENsaXBib2FyZE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRQZXJtYWxpbmtNb2R1bGUgeyB9XG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgUGVybWFsaW5rU2VydmljZTxUPiB7XG5cbiAgcHVibGljIGNyZWF0ZVBlcm1hbGluayA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVBlcm1hbGluaygpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHZhbGlkYXRlUGVyYW1saW5rKCk6IFQ7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdlbmVyYXRlUGVybWFsaW5rKCk6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgY3JlYXRlQmFzZVVybCgpIHtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBpZiAodXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKDAsIHVybC5pbmRleE9mKCc/JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7MkJBWTJDLElBQUksWUFBWSxFQUFROzs7OztJQUUxRCxVQUFVO1FBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDOzs7O1lBZDNCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUsb0VBQW9FO2FBQy9FOzs7a0JBR0UsS0FBSzswQkFHTCxNQUFNOzs7Ozs7O0FDWFQ7OzJCQVkyQyxJQUFJLFlBQVksRUFBUTs7Ozs7SUFFMUQsZUFBZTtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7OztZQWQzQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLCtFQUErRTthQUMxRjs7O2tCQUdFLEtBQUs7MEJBR0wsTUFBTTs7Ozs7OztBQ1hUOzsyQkFhMkMsSUFBSSxZQUFZLEVBQVE7Ozs7WUFYbEUsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFFBQVEsRUFBRTtDQUNYO2FBQ0E7OztrQkFHRSxLQUFLOzBCQUdMLE1BQU07Ozs7Ozs7QUNaVDtBQU9BLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IsNkJBQTZCO0NBQzlCLENBQUM7QUFlRjs7O1lBYkMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixVQUFVO2lCQUNYO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsVUFBVTtpQkFDWDtnQkFDRCxTQUFTLEVBQUUsRUFDVjthQUNGOzs7Ozs7Ozs7OztBQ3pCRDs7K0JBRTJCO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDakM7Ozs7O0lBTVMsYUFBYTs7UUFDckIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQztTQUNaO0tBQ0Y7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7In0=