/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
LanguageChangNotifier = /** @class */ (function () {
    function LanguageChangNotifier(translate) {
        var _this = this;
        this.translate = translate;
        this.translate.onLangChange.subscribe(function () { return _this.languageChanged(); });
    }
    return LanguageChangNotifier;
}());
/**
 * @abstract
 */
export { LanguageChangNotifier };
if (false) {
    /** @type {?} */
    LanguageChangNotifier.prototype.translate;
    /**
     * @abstract
     * @return {?}
     */
    LanguageChangNotifier.prototype.languageChanged = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UtY2hhbmdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sYW5ndWFnZS9sYW5ndWFnZS1jaGFuZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7O0FBQUE7SUFFSSwrQkFDYyxTQUEyQjtRQUR6QyxpQkFJQztRQUhhLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBRXJDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsRUFBRSxFQUF0QixDQUFzQixDQUFDLENBQUM7S0FDdkU7Z0NBUkw7SUFZQyxDQUFBOzs7O0FBVkQsaUNBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYW5ndWFnZUNoYW5nTm90aWZpZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxhbmd1YWdlQ2hhbmdlZCgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbGFuZ3VhZ2VDaGFuZ2VkKCk6IHZvaWQ7XG5cbn1cbiJdfQ==