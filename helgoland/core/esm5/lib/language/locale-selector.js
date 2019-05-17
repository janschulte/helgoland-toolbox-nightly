/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
/**
 * @abstract
 */
var LocalSelectorComponent = /** @class */ (function () {
    function LocalSelectorComponent(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LocalSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["languageList"]) {
            this.setCurrentLang();
        }
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    LocalSelectorComponent.prototype.setLanguage = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.translate.use(lang.code);
        this.setCurrentLang();
    };
    /**
     * @return {?}
     */
    LocalSelectorComponent.prototype.setCurrentLang = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.currentLang = this.languageList.find(function (e) { return e.code === _this.translate.currentLang; });
    };
    LocalSelectorComponent.propDecorators = {
        languageList: [{ type: Input }]
    };
    return LocalSelectorComponent;
}());
export { LocalSelectorComponent };
if (false) {
    /** @type {?} */
    LocalSelectorComponent.prototype.languageList;
    /** @type {?} */
    LocalSelectorComponent.prototype.currentLang;
    /** @type {?} */
    LocalSelectorComponent.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLXNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2xhbmd1YWdlL2xvY2FsZS1zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7Ozs7O0lBWTVELGdDQUNjLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0tBQ3BDOzs7OztJQUVFLDRDQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxrQkFBZSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6Qjs7Ozs7O0lBR0UsNENBQVc7Ozs7Y0FBQyxJQUFjO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7O0lBR2xCLCtDQUFjOzs7OztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDOzs7K0JBckIzRixLQUFLOztpQ0FQVjs7U0FLc0Isc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMYW5ndWFnZSB9IGZyb20gJy4vbW9kZWwvbGFuZ3VhZ2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9jYWxTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBsYW5ndWFnZUxpc3Q6IExhbmd1YWdlW107XG5cbiAgICBwdWJsaWMgY3VycmVudExhbmc6IExhbmd1YWdlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFuZ3VhZ2VMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TGFuZ3VhZ2UobGFuZzogTGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmcuY29kZSk7XG4gICAgICAgIHRoaXMuc2V0Q3VycmVudExhbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEN1cnJlbnRMYW5nKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRMYW5nID0gdGhpcy5sYW5ndWFnZUxpc3QuZmluZCgoZSkgPT4gZS5jb2RlID09PSB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyk7XG4gICAgfVxuXG59XG4iXX0=