/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import { PermalinkInMailComponent } from './permalink-in-mail/permalink-in-mail.component';
import { PermalinkNewWindowComponent } from './permalink-new-window/permalink-new-window.component';
import { PermalinkToClipboardComponent } from './permalink-to-clipboard/permalink-to-clipboard.component';
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
export { HelgolandPermalinkModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvcGVybWFsaW5rLyIsInNvdXJjZXMiOlsibGliL3Blcm1hbGluay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQzs7QUFFMUcsSUFBTSxVQUFVLEdBQUc7SUFDakIsd0JBQXdCO0lBQ3hCLDJCQUEyQjtJQUMzQiw2QkFBNkI7Q0FDOUIsQ0FBQzs7Ozs7Z0JBRUQsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixVQUFVO3FCQUNYO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsVUFBVTtxQkFDWDtvQkFDRCxTQUFTLEVBQUUsRUFDVjtpQkFDRjs7bUNBekJEOztTQTBCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkTW9kdWxlIH0gZnJvbSAnbmd4LWNsaXBib2FyZCc7XG5cbmltcG9ydCB7IFBlcm1hbGlua0luTWFpbENvbXBvbmVudCB9IGZyb20gJy4vcGVybWFsaW5rLWluLW1haWwvcGVybWFsaW5rLWluLW1haWwuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1hbGlua05ld1dpbmRvd0NvbXBvbmVudCB9IGZyb20gJy4vcGVybWFsaW5rLW5ldy13aW5kb3cvcGVybWFsaW5rLW5ldy13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1hbGlua1RvQ2xpcGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9wZXJtYWxpbmstdG8tY2xpcGJvYXJkL3Blcm1hbGluay10by1jbGlwYm9hcmQuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgUGVybWFsaW5rSW5NYWlsQ29tcG9uZW50LFxuICBQZXJtYWxpbmtOZXdXaW5kb3dDb21wb25lbnQsXG4gIFBlcm1hbGlua1RvQ2xpcGJvYXJkQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDbGlwYm9hcmRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kUGVybWFsaW5rTW9kdWxlIHsgfVxuIl19