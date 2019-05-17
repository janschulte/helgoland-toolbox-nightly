/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpCache } from './model';
/**
 * @record
 */
function CachedItem() { }
/** @type {?} */
CachedItem.prototype.expirationAtMs;
/** @type {?} */
CachedItem.prototype.response;
/**
 * @record
 */
function Cache() { }
var LocalHttpCache = /** @class */ (function (_super) {
    tslib_1.__extends(LocalHttpCache, _super);
    function LocalHttpCache() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cache = {};
        return _this;
    }
    /**
     * @param {?} req
     * @param {?=} expirationAtMs
     * @return {?}
     */
    LocalHttpCache.prototype.get = /**
     * @param {?} req
     * @param {?=} expirationAtMs
     * @return {?}
     */
    function (req, expirationAtMs) {
        /** @type {?} */
        var key = req.urlWithParams;
        if (this.cache[key]) {
            /** @type {?} */
            var currentTime = new Date().getTime();
            if (isNaN(this.cache[key].expirationAtMs)) {
                this.cache[key].expirationAtMs = expirationAtMs;
                return this.cache[key].response;
            }
            else {
                if (this.cache[key].expirationAtMs >= currentTime) {
                    if (this.cache[key].expirationAtMs > expirationAtMs) {
                        this.cache[key].expirationAtMs = expirationAtMs;
                    }
                    return this.cache[key].response;
                }
                else {
                    delete this.cache[key];
                }
            }
        }
        return null;
    };
    /**
     * @param {?} req
     * @param {?} resp
     * @param {?=} expirationAtMs
     * @return {?}
     */
    LocalHttpCache.prototype.put = /**
     * @param {?} req
     * @param {?} resp
     * @param {?=} expirationAtMs
     * @return {?}
     */
    function (req, resp, expirationAtMs) {
        this.cache[req.urlWithParams] = {
            expirationAtMs: expirationAtMs || new Date().getTime() + 30000,
            response: resp
        };
    };
    LocalHttpCache.decorators = [
        { type: Injectable },
    ];
    return LocalHttpCache;
}(HttpCache));
export { LocalHttpCache };
if (false) {
    /** @type {?} */
    LocalHttpCache.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtaHR0cC1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbC1odHRwLWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQVlBLDBDQUFTOzs7c0JBRWxCLEVBQUU7Ozs7Ozs7O0lBRWxCLDRCQUFHOzs7OztjQUFDLEdBQXFCLEVBQUUsY0FBdUI7O1FBQ3JELElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ2xCLElBQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNuQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO3FCQUFFO29CQUN6RyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7aUJBQ25DO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUI7YUFDSjtTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7SUFHVCw0QkFBRzs7Ozs7O2NBQUMsR0FBcUIsRUFBRSxJQUF1QixFQUFFLGNBQXVCO1FBQzlFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHO1lBQzVCLGNBQWMsRUFBRSxjQUFjLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLO1lBQzlELFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7OztnQkE1QlQsVUFBVTs7eUJBZFg7RUFlb0MsU0FBUztTQUFoQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSHR0cENhY2hlIH0gZnJvbSAnLi9tb2RlbCc7XG5cbmludGVyZmFjZSBDYWNoZWRJdGVtIHtcbiAgICBleHBpcmF0aW9uQXRNczogbnVtYmVyO1xuICAgIHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pjtcbn1cblxuaW50ZXJmYWNlIENhY2hlIHtcbiAgICBbaWQ6IHN0cmluZ106IENhY2hlZEl0ZW07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbEh0dHBDYWNoZSBleHRlbmRzIEh0dHBDYWNoZSB7XG5cbiAgICBwcml2YXRlIGNhY2hlOiBDYWNoZSA9IHt9O1xuXG4gICAgcHVibGljIGdldChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIGV4cGlyYXRpb25BdE1zPzogbnVtYmVyKTogSHR0cFJlc3BvbnNlPGFueT4ge1xuICAgICAgICBjb25zdCBrZXkgPSByZXEudXJsV2l0aFBhcmFtcztcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGlmIChpc05hTih0aGlzLmNhY2hlW2tleV0uZXhwaXJhdGlvbkF0TXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVtrZXldLmV4cGlyYXRpb25BdE1zID0gZXhwaXJhdGlvbkF0TXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XS5yZXNwb25zZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA+PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZVtrZXldLmV4cGlyYXRpb25BdE1zID4gZXhwaXJhdGlvbkF0TXMpIHsgdGhpcy5jYWNoZVtrZXldLmV4cGlyYXRpb25BdE1zID0gZXhwaXJhdGlvbkF0TXM7IH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XS5yZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5jYWNoZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcDogSHR0cFJlc3BvbnNlPGFueT4sIGV4cGlyYXRpb25BdE1zPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2FjaGVbcmVxLnVybFdpdGhQYXJhbXNdID0ge1xuICAgICAgICAgICAgZXhwaXJhdGlvbkF0TXM6IGV4cGlyYXRpb25BdE1zIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMzAwMDAsXG4gICAgICAgICAgICByZXNwb25zZTogcmVzcFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==