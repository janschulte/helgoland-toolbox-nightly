(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-clipboard')) :
    typeof define === 'function' && define.amd ? define('@helgoland/permalink', ['exports', '@angular/core', 'ngx-clipboard'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.permalink = {}),global.ng.core,null));
}(this, (function (exports,core,ngxClipboard) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PermalinkInMailComponent = (function () {
        function PermalinkInMailComponent() {
            this.onTriggered = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-permalink-in-mail',
                        template: "<button type=\"button\" (click)=\"openInMail()\">open in mail</button>"
                    },] },
        ];
        PermalinkInMailComponent.propDecorators = {
            url: [{ type: core.Input }],
            onTriggered: [{ type: core.Output }]
        };
        return PermalinkInMailComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PermalinkNewWindowComponent = (function () {
        function PermalinkNewWindowComponent() {
            this.onTriggered = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-permalink-new-window',
                        template: "<button type=\"button\" (click)=\"openInNewWindow()\">open in new window</button>"
                    },] },
        ];
        PermalinkNewWindowComponent.propDecorators = {
            url: [{ type: core.Input }],
            onTriggered: [{ type: core.Output }]
        };
        return PermalinkNewWindowComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PermalinkToClipboardComponent = (function () {
        function PermalinkToClipboardComponent() {
            this.onTriggered = new core.EventEmitter();
        }
        PermalinkToClipboardComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-permalink-to-clipboard',
                        template: "<button type=\"button\" ngxClipboard [cbContent]=\"url\" (click)=\"onTriggered.emit()\">copy to clipboard</button>\n"
                    },] },
        ];
        PermalinkToClipboardComponent.propDecorators = {
            url: [{ type: core.Input }],
            onTriggered: [{ type: core.Output }]
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
    var HelgolandPermalinkModule = (function () {
        function HelgolandPermalinkModule() {
        }
        HelgolandPermalinkModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            COMPONENTS
                        ],
                        imports: [
                            ngxClipboard.ClipboardModule
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
    var /**
     * @abstract
     * @template T
     */ PermalinkService = (function () {
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

    exports.HelgolandPermalinkModule = HelgolandPermalinkModule;
    exports.PermalinkInMailComponent = PermalinkInMailComponent;
    exports.PermalinkNewWindowComponent = PermalinkNewWindowComponent;
    exports.PermalinkToClipboardComponent = PermalinkToClipboardComponent;
    exports.PermalinkService = PermalinkService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXBlcm1hbGluay51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvcGVybWFsaW5rL2xpYi9wZXJtYWxpbmstaW4tbWFpbC9wZXJtYWxpbmstaW4tbWFpbC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvcGVybWFsaW5rL2xpYi9wZXJtYWxpbmstbmV3LXdpbmRvdy9wZXJtYWxpbmstbmV3LXdpbmRvdy5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvcGVybWFsaW5rL2xpYi9wZXJtYWxpbmstdG8tY2xpcGJvYXJkL3Blcm1hbGluay10by1jbGlwYm9hcmQuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL3Blcm1hbGluay9saWIvcGVybWFsaW5rLm1vZHVsZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvbGliL3NlcnZpY2VzL3Blcm1hbGluay5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstaW4tbWFpbCcsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW5Jbk1haWwoKVwiPm9wZW4gaW4gbWFpbDwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgUGVybWFsaW5rSW5NYWlsQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRyaWdnZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHB1YmxpYyBvcGVuSW5NYWlsKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ21haWx0bzo/Ym9keT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMudXJsKTtcbiAgICB0aGlzLm9uVHJpZ2dlcmVkLmVtaXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItcGVybWFsaW5rLW5ldy13aW5kb3cnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJvcGVuSW5OZXdXaW5kb3coKVwiPm9wZW4gaW4gbmV3IHdpbmRvdzwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgUGVybWFsaW5rTmV3V2luZG93Q29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRyaWdnZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHB1YmxpYyBvcGVuSW5OZXdXaW5kb3coKSB7XG4gICAgd2luZG93Lm9wZW4odGhpcy51cmwsICdfYmxhbmsnKTtcbiAgICB0aGlzLm9uVHJpZ2dlcmVkLmVtaXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItcGVybWFsaW5rLXRvLWNsaXBib2FyZCcsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmd4Q2xpcGJvYXJkIFtjYkNvbnRlbnRdPVwidXJsXCIgKGNsaWNrKT1cIm9uVHJpZ2dlcmVkLmVtaXQoKVwiPmNvcHkgdG8gY2xpcGJvYXJkPC9idXR0b24+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1hbGlua1RvQ2xpcGJvYXJkQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRyaWdnZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkTW9kdWxlIH0gZnJvbSAnbmd4LWNsaXBib2FyZCc7XG5cbmltcG9ydCB7IFBlcm1hbGlua0luTWFpbENvbXBvbmVudCB9IGZyb20gJy4vcGVybWFsaW5rLWluLW1haWwvcGVybWFsaW5rLWluLW1haWwuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1hbGlua05ld1dpbmRvd0NvbXBvbmVudCB9IGZyb20gJy4vcGVybWFsaW5rLW5ldy13aW5kb3cvcGVybWFsaW5rLW5ldy13aW5kb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1hbGlua1RvQ2xpcGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9wZXJtYWxpbmstdG8tY2xpcGJvYXJkL3Blcm1hbGluay10by1jbGlwYm9hcmQuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgUGVybWFsaW5rSW5NYWlsQ29tcG9uZW50LFxuICBQZXJtYWxpbmtOZXdXaW5kb3dDb21wb25lbnQsXG4gIFBlcm1hbGlua1RvQ2xpcGJvYXJkQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDbGlwYm9hcmRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kUGVybWFsaW5rTW9kdWxlIHsgfVxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBlcm1hbGlua1NlcnZpY2U8VD4ge1xuXG4gIHB1YmxpYyBjcmVhdGVQZXJtYWxpbmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVQZXJtYWxpbmsoKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCB2YWxpZGF0ZVBlcmFtbGluaygpOiBUO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZW5lcmF0ZVBlcm1hbGluaygpOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUJhc2VVcmwoKSB7XG4gICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgaWYgKHVybC5pbmRleE9mKCc/JykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdXJsLnN1YnN0cmluZygwLCB1cmwuaW5kZXhPZignPycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ2xpcGJvYXJkTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OytCQVkyQyxJQUFJQSxpQkFBWSxFQUFROzs7OztRQUUxRCw2Q0FBVTs7OztnQkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxlQUFlLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDOzs7b0JBZDNCQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHVCQUF1Qjt3QkFDakMsUUFBUSxFQUFFLHdFQUFvRTtxQkFDL0U7OzswQkFHRUMsVUFBSztrQ0FHTEMsV0FBTTs7dUNBWFQ7Ozs7Ozs7QUNBQTs7K0JBWTJDLElBQUlILGlCQUFZLEVBQVE7Ozs7O1FBRTFELHFEQUFlOzs7O2dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7OztvQkFkM0JDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsMEJBQTBCO3dCQUNwQyxRQUFRLEVBQUUsbUZBQStFO3FCQUMxRjs7OzBCQUdFQyxVQUFLO2tDQUdMQyxXQUFNOzswQ0FYVDs7Ozs7OztBQ0FBOzsrQkFhMkMsSUFBSUgsaUJBQVksRUFBUTs7O29CQVhsRUMsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSw0QkFBNEI7d0JBQ3RDLFFBQVEsRUFBRSxzSEFDWDtxQkFDQTs7OzBCQUdFQyxVQUFLO2tDQUdMQyxXQUFNOzs0Q0FaVDs7Ozs7OztBQ0FBO0lBT0EsSUFBTSxVQUFVLEdBQUc7UUFDakIsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQiw2QkFBNkI7S0FDOUIsQ0FBQzs7Ozs7b0JBRURDLGFBQVEsU0FBQzt3QkFDUixZQUFZLEVBQUU7NEJBQ1osVUFBVTt5QkFDWDt3QkFDRCxPQUFPLEVBQUU7NEJBQ1BDLDRCQUFlO3lCQUNoQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1AsVUFBVTt5QkFDWDt3QkFDRCxTQUFTLEVBQUUsRUFDVjtxQkFDRjs7dUNBekJEOzs7Ozs7Ozs7OztBQ0FBOzs7UUFBQTs7O21DQUUyQjtnQkFDdkIsT0FBTyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUNqQzs7Ozs7UUFNUyx3Q0FBYTs7O1lBQXZCOztnQkFDRSxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDakMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUMzQixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLENBQUM7aUJBQ1o7YUFDRjsrQkFqQkg7UUFrQkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9