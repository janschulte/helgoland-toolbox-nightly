/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class LanguageChangNotifier {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this.translate.onLangChange.subscribe(() => this.languageChanged());
    }
}
if (false) {
    /** @type {?} */
    LanguageChangNotifier.prototype.translate;
    /**
     * @abstract
     * @return {?}
     */
    LanguageChangNotifier.prototype.languageChanged = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UtY2hhbmdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9sYW5ndWFnZS1jaGFuZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxNQUFNOzs7O0lBRUYsWUFDYyxTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUVyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7S0FDdkU7Q0FJSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExhbmd1YWdlQ2hhbmdOb3RpZmllciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMubGFuZ3VhZ2VDaGFuZ2VkKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBsYW5ndWFnZUNoYW5nZWQoKTogdm9pZDtcblxufVxuIl19