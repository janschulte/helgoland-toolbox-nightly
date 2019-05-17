/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 */
export class IdCache {
    constructor() {
        this.cache = new Map();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    has(id) {
        return this.cache.has(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    get(id) {
        return this.cache.get(id);
    }
    /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    set(id, value) {
        this.cache.set(id, value);
    }
}
if (false) {
    /** @type {?} */
    IdCache.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtY2FjaGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvaW50ZXJuYWwvaWQtY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU07O3FCQUU4QixJQUFJLEdBQUcsRUFBRTs7Ozs7O0lBRWxDLEdBQUcsQ0FBQyxFQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBR3ZCLEdBQUcsQ0FBQyxFQUFVO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7OztJQUd2QixHQUFHLENBQUMsRUFBVSxFQUFFLEtBQVE7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOztDQUdqQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBJZENhY2hlPFQ+IHtcblxuICAgIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIFQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHVibGljIGhhcyhpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLmhhcyhpZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldChpZDogc3RyaW5nKTogVCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChpZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChpZDogc3RyaW5nLCB2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLmNhY2hlLnNldChpZCwgdmFsdWUpO1xuICAgIH1cblxufVxuIl19