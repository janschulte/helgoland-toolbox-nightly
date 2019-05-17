/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LocalStorage } from '@helgoland/core';
/** @type {?} */
var CACHE_PARAM_FAVORITES_SINGLE = 'SingleFavorites';
/** @type {?} */
var CACHE_PARAM_FAVORITES_GROUP = 'GroupFavorites';
var FavoriteService = /** @class */ (function () {
    function FavoriteService(localStorage) {
        this.localStorage = localStorage;
        this.groupCounter = 0;
        this.loadFavorites();
    }
    /**
     * @param {?} dataset
     * @param {?=} label
     * @return {?}
     */
    FavoriteService.prototype.addFavorite = /**
     * @param {?} dataset
     * @param {?=} label
     * @return {?}
     */
    function (dataset, label) {
        if (!this.singleFavs.has(dataset.internalId)) {
            this.singleFavs.set(dataset.internalId, {
                id: dataset.internalId,
                label: label ? label : dataset.label,
                favorite: dataset
            });
            this.saveFavorites();
            return true;
        }
        return false;
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    FavoriteService.prototype.hasFavorite = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        return this.singleFavs.has(dataset.internalId);
    };
    /**
     * @return {?}
     */
    FavoriteService.prototype.getFavorites = /**
     * @return {?}
     */
    function () {
        return Array.from(this.singleFavs.values());
    };
    /**
     * @param {?} favoriteId
     * @return {?}
     */
    FavoriteService.prototype.removeFavorite = /**
     * @param {?} favoriteId
     * @return {?}
     */
    function (favoriteId) {
        if (this.singleFavs.has(favoriteId)) {
            this.singleFavs.delete(favoriteId);
            this.saveFavorites();
            return true;
        }
        if (this.groupFavs.has(favoriteId)) {
            this.groupFavs.delete(favoriteId);
            this.saveFavorites();
            return true;
        }
        return false;
    };
    /**
     * @param {?} datasets
     * @param {?=} label
     * @return {?}
     */
    FavoriteService.prototype.addFavoriteGroup = /**
     * @param {?} datasets
     * @param {?=} label
     * @return {?}
     */
    function (datasets, label) {
        /** @type {?} */
        var id = 'Group' + this.groupCounter++;
        this.groupFavs.set(id, {
            id: id,
            label: label ? label : id,
            favorites: datasets
        });
        this.saveFavorites();
        return true;
    };
    /**
     * @return {?}
     */
    FavoriteService.prototype.getFavoriteGroups = /**
     * @return {?}
     */
    function () {
        return Array.from(this.groupFavs.values());
    };
    /**
     * @return {?}
     */
    FavoriteService.prototype.removeAllFavorites = /**
     * @return {?}
     */
    function () {
        this.singleFavs.clear();
        this.groupFavs.clear();
        this.saveFavorites();
        return true;
    };
    /**
     * @param {?} favorite
     * @param {?} label
     * @return {?}
     */
    FavoriteService.prototype.changeLabel = /**
     * @param {?} favorite
     * @param {?} label
     * @return {?}
     */
    function (favorite, label) {
        favorite.label = label;
        if (isSingleFavorite(favorite)) {
            this.singleFavs.set(favorite.id, favorite);
        }
        if (isGroupFavorite(favorite)) {
            this.groupFavs.set(favorite.id, favorite);
        }
        this.saveFavorites();
    };
    /**
     * @return {?}
     */
    FavoriteService.prototype.saveFavorites = /**
     * @return {?}
     */
    function () {
        this.localStorage.save(CACHE_PARAM_FAVORITES_SINGLE, this.getFavorites());
        this.localStorage.save(CACHE_PARAM_FAVORITES_GROUP, this.getFavoriteGroups());
    };
    /**
     * @return {?}
     */
    FavoriteService.prototype.loadFavorites = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.singleFavs = new Map();
        this.groupFavs = new Map();
        /** @type {?} */
        var loadedSingleFavs = this.localStorage.loadArray(CACHE_PARAM_FAVORITES_SINGLE);
        if (loadedSingleFavs) {
            loadedSingleFavs.forEach(function (entry) { return _this.singleFavs.set(entry.id, entry); });
        }
        /** @type {?} */
        var loadedGroupFavs = this.localStorage.loadArray(CACHE_PARAM_FAVORITES_GROUP);
        if (loadedGroupFavs) {
            loadedGroupFavs.forEach(function (entry) { return _this.groupFavs.set(entry.id, entry); });
        }
    };
    FavoriteService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FavoriteService.ctorParameters = function () { return [
        { type: LocalStorage }
    ]; };
    return FavoriteService;
}());
export { FavoriteService };
if (false) {
    /** @type {?} */
    FavoriteService.prototype.singleFavs;
    /** @type {?} */
    FavoriteService.prototype.groupFavs;
    /** @type {?} */
    FavoriteService.prototype.groupCounter;
    /** @type {?} */
    FavoriteService.prototype.localStorage;
}
/**
 * @record
 */
export function Favorite() { }
/** @type {?} */
Favorite.prototype.id;
/** @type {?} */
Favorite.prototype.label;
/**
 * @record
 */
export function SingleFavorite() { }
/** @type {?} */
SingleFavorite.prototype.favorite;
/**
 * @param {?} object
 * @return {?}
 */
function isSingleFavorite(object) {
    return 'favorite' in object;
}
/**
 * @record
 */
export function GroupFavorite() { }
/** @type {?} */
GroupFavorite.prototype.favorites;
/**
 * @param {?} object
 * @return {?}
 */
function isGroupFavorite(object) {
    return 'favorites' in object;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2b3JpdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZmF2b3JpdGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9mYXZvcml0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBWSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFekQsSUFBTSw0QkFBNEIsR0FBRyxpQkFBaUIsQ0FBQzs7QUFDdkQsSUFBTSwyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQzs7SUFTbkQseUJBQ1ksWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7NEJBSGYsQ0FBQztRQUt0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEI7Ozs7OztJQUVNLHFDQUFXOzs7OztjQUFDLE9BQWlCLEVBQUUsS0FBYztRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDdEMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUN0QixLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUNwQyxRQUFRLEVBQUUsT0FBTzthQUNsQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7O0lBR1IscUNBQVc7Ozs7Y0FBQyxPQUFpQjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FB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QUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFpQiw0QkFBNEIsQ0FBQyxDQUFDO1FBQ25HLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7U0FDM0U7O1FBQ0QsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQWdCLDJCQUEyQixDQUFDLENBQUM7UUFDaEcsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwQixlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1NBQ3pFOzs7Z0JBNUZKLFVBQVU7Ozs7Z0JBTFEsWUFBWTs7MEJBRC9COztTQU9hLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0c1QiwwQkFBMEIsTUFBVztJQUNuQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQztDQUM3Qjs7Ozs7Ozs7Ozs7QUFNRCx5QkFBeUIsTUFBVztJQUNsQyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQztDQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElEYXRhc2V0LCBMb2NhbFN0b3JhZ2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5jb25zdCBDQUNIRV9QQVJBTV9GQVZPUklURVNfU0lOR0xFID0gJ1NpbmdsZUZhdm9yaXRlcyc7XG5jb25zdCBDQUNIRV9QQVJBTV9GQVZPUklURVNfR1JPVVAgPSAnR3JvdXBGYXZvcml0ZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmF2b3JpdGVTZXJ2aWNlIHtcblxuICBwcml2YXRlIHNpbmdsZUZhdnM6IE1hcDxzdHJpbmcsIFNpbmdsZUZhdm9yaXRlPjtcbiAgcHJpdmF0ZSBncm91cEZhdnM6IE1hcDxzdHJpbmcsIEdyb3VwRmF2b3JpdGU+O1xuICBwcml2YXRlIGdyb3VwQ291bnRlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZTogTG9jYWxTdG9yYWdlXG4gICkge1xuICAgIHRoaXMubG9hZEZhdm9yaXRlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZEZhdm9yaXRlKGRhdGFzZXQ6IElEYXRhc2V0LCBsYWJlbD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zaW5nbGVGYXZzLmhhcyhkYXRhc2V0LmludGVybmFsSWQpKSB7XG4gICAgICB0aGlzLnNpbmdsZUZhdnMuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwge1xuICAgICAgICBpZDogZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICBsYWJlbDogbGFiZWwgPyBsYWJlbCA6IGRhdGFzZXQubGFiZWwsXG4gICAgICAgIGZhdm9yaXRlOiBkYXRhc2V0XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNGYXZvcml0ZShkYXRhc2V0OiBJRGF0YXNldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZUZhdnMuaGFzKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmF2b3JpdGVzKCk6IFNpbmdsZUZhdm9yaXRlW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2luZ2xlRmF2cy52YWx1ZXMoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRmF2b3JpdGUoZmF2b3JpdGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmF2cy5oYXMoZmF2b3JpdGVJZCkpIHtcbiAgICAgIHRoaXMuc2luZ2xlRmF2cy5kZWxldGUoZmF2b3JpdGVJZCk7XG4gICAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncm91cEZhdnMuaGFzKGZhdm9yaXRlSWQpKSB7XG4gICAgICB0aGlzLmdyb3VwRmF2cy5kZWxldGUoZmF2b3JpdGVJZCk7XG4gICAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkRmF2b3JpdGVHcm91cChkYXRhc2V0czogSURhdGFzZXRbXSwgbGFiZWw/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBpZCA9ICdHcm91cCcgKyB0aGlzLmdyb3VwQ291bnRlcisrO1xuICAgIHRoaXMuZ3JvdXBGYXZzLnNldChpZCwge1xuICAgICAgaWQsXG4gICAgICBsYWJlbDogbGFiZWwgPyBsYWJlbCA6IGlkLFxuICAgICAgZmF2b3JpdGVzOiBkYXRhc2V0c1xuICAgIH0pO1xuICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldEZhdm9yaXRlR3JvdXBzKCk6IEdyb3VwRmF2b3JpdGVbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ncm91cEZhdnMudmFsdWVzKCkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFsbEZhdm9yaXRlcygpOiBib29sZWFuIHtcbiAgICB0aGlzLnNpbmdsZUZhdnMuY2xlYXIoKTtcbiAgICB0aGlzLmdyb3VwRmF2cy5jbGVhcigpO1xuICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNoYW5nZUxhYmVsKGZhdm9yaXRlOiBGYXZvcml0ZSwgbGFiZWw6IHN0cmluZykge1xuICAgIGZhdm9yaXRlLmxhYmVsID0gbGFiZWw7XG4gICAgaWYgKGlzU2luZ2xlRmF2b3JpdGUoZmF2b3JpdGUpKSB7IHRoaXMuc2luZ2xlRmF2cy5zZXQoZmF2b3JpdGUuaWQsIGZhdm9yaXRlKTsgfVxuICAgIGlmIChpc0dyb3VwRmF2b3JpdGUoZmF2b3JpdGUpKSB7IHRoaXMuZ3JvdXBGYXZzLnNldChmYXZvcml0ZS5pZCwgZmF2b3JpdGUpOyB9XG4gICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gIH1cblxuICBwcml2YXRlIHNhdmVGYXZvcml0ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZShDQUNIRV9QQVJBTV9GQVZPUklURVNfU0lOR0xFLCB0aGlzLmdldEZhdm9yaXRlcygpKTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zYXZlKENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19HUk9VUCwgdGhpcy5nZXRGYXZvcml0ZUdyb3VwcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEZhdm9yaXRlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNpbmdsZUZhdnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5ncm91cEZhdnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgbG9hZGVkU2luZ2xlRmF2cyA9IHRoaXMubG9jYWxTdG9yYWdlLmxvYWRBcnJheTxTaW5nbGVGYXZvcml0ZT4oQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX1NJTkdMRSk7XG4gICAgaWYgKGxvYWRlZFNpbmdsZUZhdnMpIHtcbiAgICAgIGxvYWRlZFNpbmdsZUZhdnMuZm9yRWFjaCgoZW50cnkpID0+IHRoaXMuc2luZ2xlRmF2cy5zZXQoZW50cnkuaWQsIGVudHJ5KSk7XG4gICAgfVxuICAgIGNvbnN0IGxvYWRlZEdyb3VwRmF2cyA9IHRoaXMubG9jYWxTdG9yYWdlLmxvYWRBcnJheTxHcm91cEZhdm9yaXRlPihDQUNIRV9QQVJBTV9GQVZPUklURVNfR1JPVVApO1xuICAgIGlmIChsb2FkZWRHcm91cEZhdnMpIHtcbiAgICAgIGxvYWRlZEdyb3VwRmF2cy5mb3JFYWNoKChlbnRyeSkgPT4gdGhpcy5ncm91cEZhdnMuc2V0KGVudHJ5LmlkLCBlbnRyeSkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlIHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaW5nbGVGYXZvcml0ZSBleHRlbmRzIEZhdm9yaXRlIHtcbiAgZmF2b3JpdGU6IElEYXRhc2V0O1xufVxuXG5mdW5jdGlvbiBpc1NpbmdsZUZhdm9yaXRlKG9iamVjdDogYW55KTogb2JqZWN0IGlzIFNpbmdsZUZhdm9yaXRlIHtcbiAgcmV0dXJuICdmYXZvcml0ZScgaW4gb2JqZWN0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwRmF2b3JpdGUgZXh0ZW5kcyBGYXZvcml0ZSB7XG4gIGZhdm9yaXRlczogSURhdGFzZXRbXTtcbn1cblxuZnVuY3Rpb24gaXNHcm91cEZhdm9yaXRlKG9iamVjdDogYW55KTogb2JqZWN0IGlzIEdyb3VwRmF2b3JpdGUge1xuICByZXR1cm4gJ2Zhdm9yaXRlcycgaW4gb2JqZWN0O1xufVxuIl19