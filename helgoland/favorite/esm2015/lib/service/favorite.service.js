/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LocalStorage } from '@helgoland/core';
/** @type {?} */
const CACHE_PARAM_FAVORITES_SINGLE = 'SingleFavorites';
/** @type {?} */
const CACHE_PARAM_FAVORITES_GROUP = 'GroupFavorites';
export class FavoriteService {
    /**
     * @param {?} localStorage
     */
    constructor(localStorage) {
        this.localStorage = localStorage;
        this.groupCounter = 0;
        this.loadFavorites();
    }
    /**
     * @param {?} dataset
     * @param {?=} label
     * @return {?}
     */
    addFavorite(dataset, label) {
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
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    hasFavorite(dataset) {
        return this.singleFavs.has(dataset.internalId);
    }
    /**
     * @return {?}
     */
    getFavorites() {
        return Array.from(this.singleFavs.values());
    }
    /**
     * @param {?} favoriteId
     * @return {?}
     */
    removeFavorite(favoriteId) {
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
    }
    /**
     * @param {?} datasets
     * @param {?=} label
     * @return {?}
     */
    addFavoriteGroup(datasets, label) {
        /** @type {?} */
        const id = 'Group' + this.groupCounter++;
        this.groupFavs.set(id, {
            id,
            label: label ? label : id,
            favorites: datasets
        });
        this.saveFavorites();
        return true;
    }
    /**
     * @return {?}
     */
    getFavoriteGroups() {
        return Array.from(this.groupFavs.values());
    }
    /**
     * @return {?}
     */
    removeAllFavorites() {
        this.singleFavs.clear();
        this.groupFavs.clear();
        this.saveFavorites();
        return true;
    }
    /**
     * @param {?} favorite
     * @param {?} label
     * @return {?}
     */
    changeLabel(favorite, label) {
        favorite.label = label;
        if (isSingleFavorite(favorite)) {
            this.singleFavs.set(favorite.id, favorite);
        }
        if (isGroupFavorite(favorite)) {
            this.groupFavs.set(favorite.id, favorite);
        }
        this.saveFavorites();
    }
    /**
     * @return {?}
     */
    saveFavorites() {
        this.localStorage.save(CACHE_PARAM_FAVORITES_SINGLE, this.getFavorites());
        this.localStorage.save(CACHE_PARAM_FAVORITES_GROUP, this.getFavoriteGroups());
    }
    /**
     * @return {?}
     */
    loadFavorites() {
        this.singleFavs = new Map();
        this.groupFavs = new Map();
        /** @type {?} */
        const loadedSingleFavs = this.localStorage.loadArray(CACHE_PARAM_FAVORITES_SINGLE);
        if (loadedSingleFavs) {
            loadedSingleFavs.forEach((entry) => this.singleFavs.set(entry.id, entry));
        }
        /** @type {?} */
        const loadedGroupFavs = this.localStorage.loadArray(CACHE_PARAM_FAVORITES_GROUP);
        if (loadedGroupFavs) {
            loadedGroupFavs.forEach((entry) => this.groupFavs.set(entry.id, entry));
        }
    }
}
FavoriteService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FavoriteService.ctorParameters = () => [
    { type: LocalStorage }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2b3JpdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZmF2b3JpdGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9mYXZvcml0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBWSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFekQsTUFBTSw0QkFBNEIsR0FBRyxpQkFBaUIsQ0FBQzs7QUFDdkQsTUFBTSwyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQztBQUdyRCxNQUFNOzs7O0lBTUosWUFDWSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYzs0QkFIZixDQUFDO1FBS3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7O0lBRU0sV0FBVyxDQUFDLE9BQWlCLEVBQUUsS0FBYztRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDdEMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUN0QixLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUNwQyxRQUFRLEVBQUUsT0FBTzthQUNsQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7O0lBR1IsV0FBVyxDQUFDLE9BQWlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxP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NEJBQTRCLENBQUMsQ0FBQztRQUNuRyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDckIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDM0U7O1FBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQWdCLDJCQUEyQixDQUFDLENBQUM7UUFDaEcsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwQixlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekU7Ozs7WUE1RkosVUFBVTs7OztZQUxRLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThHL0IsMEJBQTBCLE1BQVc7SUFDbkMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUM7Q0FDN0I7Ozs7Ozs7Ozs7O0FBTUQseUJBQXlCLE1BQVc7SUFDbEMsTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7Q0FDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRGF0YXNldCwgTG9jYWxTdG9yYWdlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuY29uc3QgQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX1NJTkdMRSA9ICdTaW5nbGVGYXZvcml0ZXMnO1xuY29uc3QgQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX0dST1VQID0gJ0dyb3VwRmF2b3JpdGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZhdm9yaXRlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzaW5nbGVGYXZzOiBNYXA8c3RyaW5nLCBTaW5nbGVGYXZvcml0ZT47XG4gIHByaXZhdGUgZ3JvdXBGYXZzOiBNYXA8c3RyaW5nLCBHcm91cEZhdm9yaXRlPjtcbiAgcHJpdmF0ZSBncm91cENvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVxuICApIHtcbiAgICB0aGlzLmxvYWRGYXZvcml0ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRGYXZvcml0ZShkYXRhc2V0OiBJRGF0YXNldCwgbGFiZWw/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuc2luZ2xlRmF2cy5oYXMoZGF0YXNldC5pbnRlcm5hbElkKSkge1xuICAgICAgdGhpcy5zaW5nbGVGYXZzLnNldChkYXRhc2V0LmludGVybmFsSWQsIHtcbiAgICAgICAgaWQ6IGRhdGFzZXQuaW50ZXJuYWxJZCxcbiAgICAgICAgbGFiZWw6IGxhYmVsID8gbGFiZWwgOiBkYXRhc2V0LmxhYmVsLFxuICAgICAgICBmYXZvcml0ZTogZGF0YXNldFxuICAgICAgfSk7XG4gICAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgaGFzRmF2b3JpdGUoZGF0YXNldDogSURhdGFzZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVGYXZzLmhhcyhkYXRhc2V0LmludGVybmFsSWQpO1xuICB9XG5cbiAgcHVibGljIGdldEZhdm9yaXRlcygpOiBTaW5nbGVGYXZvcml0ZVtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNpbmdsZUZhdnMudmFsdWVzKCkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUZhdm9yaXRlKGZhdm9yaXRlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNpbmdsZUZhdnMuaGFzKGZhdm9yaXRlSWQpKSB7XG4gICAgICB0aGlzLnNpbmdsZUZhdnMuZGVsZXRlKGZhdm9yaXRlSWQpO1xuICAgICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JvdXBGYXZzLmhhcyhmYXZvcml0ZUlkKSkge1xuICAgICAgdGhpcy5ncm91cEZhdnMuZGVsZXRlKGZhdm9yaXRlSWQpO1xuICAgICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFkZEZhdm9yaXRlR3JvdXAoZGF0YXNldHM6IElEYXRhc2V0W10sIGxhYmVsPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaWQgPSAnR3JvdXAnICsgdGhpcy5ncm91cENvdW50ZXIrKztcbiAgICB0aGlzLmdyb3VwRmF2cy5zZXQoaWQsIHtcbiAgICAgIGlkLFxuICAgICAgbGFiZWw6IGxhYmVsID8gbGFiZWwgOiBpZCxcbiAgICAgIGZhdm9yaXRlczogZGF0YXNldHNcbiAgICB9KTtcbiAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGYXZvcml0ZUdyb3VwcygpOiBHcm91cEZhdm9yaXRlW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZ3JvdXBGYXZzLnZhbHVlcygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBbGxGYXZvcml0ZXMoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5zaW5nbGVGYXZzLmNsZWFyKCk7XG4gICAgdGhpcy5ncm91cEZhdnMuY2xlYXIoKTtcbiAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VMYWJlbChmYXZvcml0ZTogRmF2b3JpdGUsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICBmYXZvcml0ZS5sYWJlbCA9IGxhYmVsO1xuICAgIGlmIChpc1NpbmdsZUZhdm9yaXRlKGZhdm9yaXRlKSkgeyB0aGlzLnNpbmdsZUZhdnMuc2V0KGZhdm9yaXRlLmlkLCBmYXZvcml0ZSk7IH1cbiAgICBpZiAoaXNHcm91cEZhdm9yaXRlKGZhdm9yaXRlKSkgeyB0aGlzLmdyb3VwRmF2cy5zZXQoZmF2b3JpdGUuaWQsIGZhdm9yaXRlKTsgfVxuICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzYXZlRmF2b3JpdGVzKCk6IHZvaWQge1xuICAgIHRoaXMubG9jYWxTdG9yYWdlLnNhdmUoQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX1NJTkdMRSwgdGhpcy5nZXRGYXZvcml0ZXMoKSk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZShDQUNIRV9QQVJBTV9GQVZPUklURVNfR1JPVVAsIHRoaXMuZ2V0RmF2b3JpdGVHcm91cHMoKSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRGYXZvcml0ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zaW5nbGVGYXZzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZ3JvdXBGYXZzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGxvYWRlZFNpbmdsZUZhdnMgPSB0aGlzLmxvY2FsU3RvcmFnZS5sb2FkQXJyYXk8U2luZ2xlRmF2b3JpdGU+KENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19TSU5HTEUpO1xuICAgIGlmIChsb2FkZWRTaW5nbGVGYXZzKSB7XG4gICAgICBsb2FkZWRTaW5nbGVGYXZzLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLnNpbmdsZUZhdnMuc2V0KGVudHJ5LmlkLCBlbnRyeSkpO1xuICAgIH1cbiAgICBjb25zdCBsb2FkZWRHcm91cEZhdnMgPSB0aGlzLmxvY2FsU3RvcmFnZS5sb2FkQXJyYXk8R3JvdXBGYXZvcml0ZT4oQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX0dST1VQKTtcbiAgICBpZiAobG9hZGVkR3JvdXBGYXZzKSB7XG4gICAgICBsb2FkZWRHcm91cEZhdnMuZm9yRWFjaCgoZW50cnkpID0+IHRoaXMuZ3JvdXBGYXZzLnNldChlbnRyeS5pZCwgZW50cnkpKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2luZ2xlRmF2b3JpdGUgZXh0ZW5kcyBGYXZvcml0ZSB7XG4gIGZhdm9yaXRlOiBJRGF0YXNldDtcbn1cblxuZnVuY3Rpb24gaXNTaW5nbGVGYXZvcml0ZShvYmplY3Q6IGFueSk6IG9iamVjdCBpcyBTaW5nbGVGYXZvcml0ZSB7XG4gIHJldHVybiAnZmF2b3JpdGUnIGluIG9iamVjdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcm91cEZhdm9yaXRlIGV4dGVuZHMgRmF2b3JpdGUge1xuICBmYXZvcml0ZXM6IElEYXRhc2V0W107XG59XG5cbmZ1bmN0aW9uIGlzR3JvdXBGYXZvcml0ZShvYmplY3Q6IGFueSk6IG9iamVjdCBpcyBHcm91cEZhdm9yaXRlIHtcbiAgcmV0dXJuICdmYXZvcml0ZXMnIGluIG9iamVjdDtcbn1cbiJdfQ==