/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
const ID = 'helgoland-notifier';
/** @type {?} */
const TIME_IN_MS = 3000;
export class NotifierService {
    constructor() {
        /** @type {?} */
        const notifierElement = document.getElementById(ID);
        if (!notifierElement) {
            /** @type {?} */
            const node = document.createElement('div');
            node.id = ID;
            node.className = 'hide';
            /** @type {?} */
            const textNode = document.createTextNode('');
            node.appendChild(textNode);
            document.body.appendChild(node);
        }
    }
    /**
     * @param {?} text
     * @return {?}
     */
    notify(text) {
        clearTimeout(this.notifierTimeout);
        /** @type {?} */
        const notifierElement = document.getElementById(ID);
        notifierElement.innerHTML = text;
        notifierElement.className = notifierElement.className.replace('hide', 'show');
        this.notifierTimeout = setTimeout(() => {
            notifierElement.className = notifierElement.className.replace('show', 'hide');
        }, TIME_IN_MS);
    }
}
NotifierService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NotifierService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    NotifierService.prototype.notifierTimeout;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9ub3RpZmllci9ub3RpZmllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQzs7QUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBR3hCLE1BQU07SUFJSjs7UUFDRSxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7WUFDckIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDOztZQUN4QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7S0FDRjs7Ozs7SUFFTSxNQUFNLENBQUMsSUFBWTtRQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUNuQyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELGVBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNyQyxlQUFlLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvRSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7O1lBeEJsQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBJRCA9ICdoZWxnb2xhbmQtbm90aWZpZXInO1xuY29uc3QgVElNRV9JTl9NUyA9IDMwMDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgbm90aWZpZXJUaW1lb3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgbm90aWZpZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoSUQpO1xuICAgIGlmICghbm90aWZpZXJFbGVtZW50KSB7XG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBub2RlLmlkID0gSUQ7XG4gICAgICBub2RlLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBub3RpZnkodGV4dDogc3RyaW5nKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZpZXJUaW1lb3V0KTtcbiAgICBjb25zdCBub3RpZmllckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChJRCk7XG4gICAgbm90aWZpZXJFbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgbm90aWZpZXJFbGVtZW50LmNsYXNzTmFtZSA9IG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnaGlkZScsICdzaG93Jyk7XG4gICAgdGhpcy5ub3RpZmllclRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUgPSBub3RpZmllckVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ3Nob3cnLCAnaGlkZScpO1xuICAgIH0sIFRJTUVfSU5fTVMpO1xuICB9XG59XG4iXX0=