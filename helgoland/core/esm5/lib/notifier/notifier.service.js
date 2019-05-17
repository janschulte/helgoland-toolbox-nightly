/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
var ID = 'helgoland-notifier';
/** @type {?} */
var TIME_IN_MS = 3000;
var NotifierService = /** @class */ (function () {
    function NotifierService() {
        /** @type {?} */
        var notifierElement = document.getElementById(ID);
        if (!notifierElement) {
            /** @type {?} */
            var node = document.createElement('div');
            node.id = ID;
            node.className = 'hide';
            /** @type {?} */
            var textNode = document.createTextNode('');
            node.appendChild(textNode);
            document.body.appendChild(node);
        }
    }
    /**
     * @param {?} text
     * @return {?}
     */
    NotifierService.prototype.notify = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        clearTimeout(this.notifierTimeout);
        /** @type {?} */
        var notifierElement = document.getElementById(ID);
        notifierElement.innerHTML = text;
        notifierElement.className = notifierElement.className.replace('hide', 'show');
        this.notifierTimeout = setTimeout(function () {
            notifierElement.className = notifierElement.className.replace('show', 'hide');
        }, TIME_IN_MS);
    };
    NotifierService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotifierService.ctorParameters = function () { return []; };
    return NotifierService;
}());
export { NotifierService };
if (false) {
    /** @type {?} */
    NotifierService.prototype.notifierTimeout;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9ub3RpZmllci9ub3RpZmllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxJQUFNLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQzs7QUFDaEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDOztJQU90Qjs7UUFDRSxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7WUFDckIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDOztZQUN4QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7S0FDRjs7Ozs7SUFFTSxnQ0FBTTs7OztjQUFDLElBQVk7UUFDeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7UUFDbkMsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRCxlQUFlLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQyxlQUFlLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztZQUNoQyxlQUFlLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvRSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7Z0JBeEJsQixVQUFVOzs7OzBCQUxYOztTQU1hLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IElEID0gJ2hlbGdvbGFuZC1ub3RpZmllcic7XG5jb25zdCBUSU1FX0lOX01TID0gMzAwMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWVyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBub3RpZmllclRpbWVvdXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBub3RpZmllckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChJRCk7XG4gICAgaWYgKCFub3RpZmllckVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG5vZGUuaWQgPSBJRDtcbiAgICAgIG5vZGUuY2xhc3NOYW1lID0gJ2hpZGUnO1xuICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5vdGlmeSh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZmllclRpbWVvdXQpO1xuICAgIGNvbnN0IG5vdGlmaWVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKElEKTtcbiAgICBub3RpZmllckVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICBub3RpZmllckVsZW1lbnQuY2xhc3NOYW1lID0gbm90aWZpZXJFbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKCdoaWRlJywgJ3Nob3cnKTtcbiAgICB0aGlzLm5vdGlmaWVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbm90aWZpZXJFbGVtZW50LmNsYXNzTmFtZSA9IG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnc2hvdycsICdoaWRlJyk7XG4gICAgfSwgVElNRV9JTl9NUyk7XG4gIH1cbn1cbiJdfQ==