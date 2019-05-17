/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
/**
 * @abstract
 */
export class LocalSelectorComponent {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["languageList"]) {
            this.setCurrentLang();
        }
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setLanguage(lang) {
        this.translate.use(lang.code);
        this.setCurrentLang();
    }
    /**
     * @return {?}
     */
    setCurrentLang() {
        this.currentLang = this.languageList.find((e) => e.code === this.translate.currentLang);
    }
}
LocalSelectorComponent.propDecorators = {
    languageList: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LocalSelectorComponent.prototype.languageList;
    /** @type {?} */
    LocalSelectorComponent.prototype.currentLang;
    /** @type {?} */
    LocalSelectorComponent.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLXNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2xhbmd1YWdlL2xvY2FsZS1zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFLaEUsTUFBTTs7OztJQU9GLFlBQ2MsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7S0FDcEM7Ozs7O0lBRUUsV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sa0JBQWUsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7Ozs7OztJQUdFLFdBQVcsQ0FBQyxJQUFjO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7O0lBR2xCLGNBQWM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7OzJCQXJCM0YsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuL21vZGVsL2xhbmd1YWdlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExvY2FsU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFuZ3VhZ2VMaXN0OiBMYW5ndWFnZVtdO1xuXG4gICAgcHVibGljIGN1cnJlbnRMYW5nOiBMYW5ndWFnZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmxhbmd1YWdlTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGFuZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldExhbmd1YWdlKGxhbmc6IExhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLnVzZShsYW5nLmNvZGUpO1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRMYW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDdXJyZW50TGFuZygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IHRoaXMubGFuZ3VhZ2VMaXN0LmZpbmQoKGUpID0+IGUuY29kZSA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpO1xuICAgIH1cblxufVxuIl19