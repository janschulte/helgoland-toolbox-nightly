/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class PermalinkInMailComponent {
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
if (false) {
    /** @type {?} */
    PermalinkInMailComponent.prototype.url;
    /** @type {?} */
    PermalinkInMailComponent.prototype.onTriggered;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLWluLW1haWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9wZXJtYWxpbmsvIiwic291cmNlcyI6WyJsaWIvcGVybWFsaW5rLWluLW1haWwvcGVybWFsaW5rLWluLW1haWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTXZFLE1BQU07OzJCQU1xQyxJQUFJLFlBQVksRUFBUTs7Ozs7SUFFMUQsVUFBVTtRQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7OztZQWQzQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFLG9FQUFvRTthQUMvRTs7O2tCQUdFLEtBQUs7MEJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1wZXJtYWxpbmstaW4tbWFpbCcsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9wZW5Jbk1haWwoKVwiPm9wZW4gaW4gbWFpbDwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgUGVybWFsaW5rSW5NYWlsQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblRyaWdnZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHB1YmxpYyBvcGVuSW5NYWlsKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ21haWx0bzo/Ym9keT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMudXJsKTtcbiAgICB0aGlzLm9uVHJpZ2dlcmVkLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=