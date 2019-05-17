/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class LocalHttpCache extends HttpCache {
    constructor() {
        super(...arguments);
        this.cache = {};
    }
    /**
     * @param {?} req
     * @param {?=} expirationAtMs
     * @return {?}
     */
    get(req, expirationAtMs) {
        /** @type {?} */
        const key = req.urlWithParams;
        if (this.cache[key]) {
            /** @type {?} */
            const currentTime = new Date().getTime();
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
    }
    /**
     * @param {?} req
     * @param {?} resp
     * @param {?=} expirationAtMs
     * @return {?}
     */
    put(req, resp, expirationAtMs) {
        this.cache[req.urlWithParams] = {
            expirationAtMs: expirationAtMs || new Date().getTime() + 30000,
            response: resp
        };
    }
}
LocalHttpCache.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    LocalHttpCache.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtaHR0cC1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY2FjaGluZy8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbC1odHRwLWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFZcEMsTUFBTSxxQkFBc0IsU0FBUSxTQUFTOzs7cUJBRWxCLEVBQUU7Ozs7Ozs7SUFFbEIsR0FBRyxDQUFDLEdBQXFCLEVBQUUsY0FBdUI7O1FBQ3JELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNuQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO3FCQUFFO29CQUN6RyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7aUJBQ25DO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUI7YUFDSjtTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7SUFHVCxHQUFHLENBQUMsR0FBcUIsRUFBRSxJQUF1QixFQUFFLGNBQXVCO1FBQzlFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHO1lBQzVCLGNBQWMsRUFBRSxjQUFjLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLO1lBQzlELFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7Ozs7WUE1QlQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZSB9IGZyb20gJy4vbW9kZWwnO1xuXG5pbnRlcmZhY2UgQ2FjaGVkSXRlbSB7XG4gICAgZXhwaXJhdGlvbkF0TXM6IG51bWJlcjtcbiAgICByZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT47XG59XG5cbmludGVyZmFjZSBDYWNoZSB7XG4gICAgW2lkOiBzdHJpbmddOiBDYWNoZWRJdGVtO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxIdHRwQ2FjaGUgZXh0ZW5kcyBIdHRwQ2FjaGUge1xuXG4gICAgcHJpdmF0ZSBjYWNoZTogQ2FjaGUgPSB7fTtcblxuICAgIHB1YmxpYyBnZXQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBleHBpcmF0aW9uQXRNcz86IG51bWJlcik6IEh0dHBSZXNwb25zZTxhbnk+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gcmVxLnVybFdpdGhQYXJhbXM7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5jYWNoZVtrZXldLmV4cGlyYXRpb25BdE1zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA9IGV4cGlyYXRpb25BdE1zO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0ucmVzcG9uc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlW2tleV0uZXhwaXJhdGlvbkF0TXMgPj0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA+IGV4cGlyYXRpb25BdE1zKSB7IHRoaXMuY2FjaGVba2V5XS5leHBpcmF0aW9uQXRNcyA9IGV4cGlyYXRpb25BdE1zOyB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2tleV0ucmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FjaGVba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHB1dChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHJlc3A6IEh0dHBSZXNwb25zZTxhbnk+LCBleHBpcmF0aW9uQXRNcz86IG51bWJlcikge1xuICAgICAgICB0aGlzLmNhY2hlW3JlcS51cmxXaXRoUGFyYW1zXSA9IHtcbiAgICAgICAgICAgIGV4cGlyYXRpb25BdE1zOiBleHBpcmF0aW9uQXRNcyB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDMwMDAwLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=