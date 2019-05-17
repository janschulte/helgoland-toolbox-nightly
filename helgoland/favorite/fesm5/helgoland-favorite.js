import { Injectable, Component, Input, NgModule } from '@angular/core';
import { LocalStorage, NotifierService } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
/**
 * @param {?} object
 * @return {?}
 */
function isSingleFavorite(object) {
    return 'favorite' in object;
}
/**
 * @param {?} object
 * @return {?}
 */
function isGroupFavorite(object) {
    return 'favorites' in object;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FavoriteTogglerComponent = /** @class */ (function () {
    function FavoriteTogglerComponent(favSrvc, notifier, translate) {
        this.favSrvc = favSrvc;
        this.notifier = notifier;
        this.translate = translate;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FavoriteTogglerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["dataset"] && this.dataset) {
            this.isFavorite = this.favSrvc.hasFavorite(this.dataset);
        }
    };
    /**
     * @return {?}
     */
    FavoriteTogglerComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isFavorite) {
            this.isFavorite = false;
            this.favSrvc.removeFavorite(this.dataset.internalId);
            this.translate.get('favorite.notifier.remove-favorite').subscribe(function (translation) {
                _this.notifier.notify(translation + ': ' + _this.dataset.label);
            });
        }
        else {
            this.isFavorite = true;
            this.favSrvc.addFavorite(this.dataset);
            this.translate.get('favorite.notifier.add-favorite').subscribe(function (translation) {
                _this.notifier.notify(translation + ': ' + _this.dataset.label);
            });
        }
    };
    FavoriteTogglerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-favorite-toggler',
                    template: "<i class=\"fa\" (click)=\"toggle(); $event.stopPropagation();\" [ngClass]=\"isFavorite ? 'fa-star' : 'fa-star-o'\"></i>"
                },] },
    ];
    /** @nocollapse */
    FavoriteTogglerComponent.ctorParameters = function () { return [
        { type: FavoriteService },
        { type: NotifierService },
        { type: TranslateService }
    ]; };
    FavoriteTogglerComponent.propDecorators = {
        dataset: [{ type: Input }]
    };
    return FavoriteTogglerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var JsonFavoriteExporterService = /** @class */ (function () {
    function JsonFavoriteExporterService(favoriteSrvc) {
        this.favoriteSrvc = favoriteSrvc;
    }
    /**
     * @return {?}
     */
    JsonFavoriteExporterService.prototype.exportFavorites = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var filename = 'favorites.json';
        /** @type {?} */
        var json = JSON.stringify(this.favoriteSrvc.getFavorites());
        /** @type {?} */
        var a = document.createElement('a');
        a.href = 'data:application/json,' + encodeURIComponent(json);
        a.target = '_blank';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    JsonFavoriteExporterService.prototype.importFavorites = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        return new Observable(function (observer) {
            /** @type {?} */
            var files = event.target.files;
            if (files && files.length > 0) {
                _this.favoriteSrvc.removeAllFavorites();
                /** @type {?} */
                var reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onerror = function () {
                    // alertService.error($translate.instant('favorite.import.wrongFile'));
                };
                reader.onload = function (e) {
                    /** @type {?} */
                    var result = e.target.result;
                    /** @type {?} */
                    var favorites = /** @type {?} */ (JSON.parse(result));
                    favorites.forEach(function (entry) {
                        _this.favoriteSrvc.addFavorite(entry.favorite, entry.label);
                    });
                    observer.next(true);
                    observer.complete();
                };
            }
        });
    };
    JsonFavoriteExporterService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    JsonFavoriteExporterService.ctorParameters = function () { return [
        { type: FavoriteService }
    ]; };
    return JsonFavoriteExporterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS = [
    FavoriteTogglerComponent
];
var HelgolandFavoriteModule = /** @class */ (function () {
    function HelgolandFavoriteModule() {
    }
    HelgolandFavoriteModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        COMPONENTS
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        COMPONENTS
                    ],
                    providers: [
                        FavoriteService,
                        JsonFavoriteExporterService
                    ]
                },] },
    ];
    return HelgolandFavoriteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandFavoriteModule, FavoriteService, JsonFavoriteExporterService, FavoriteTogglerComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWZhdm9yaXRlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2Zhdm9yaXRlL2xpYi9zZXJ2aWNlL2Zhdm9yaXRlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZmF2b3JpdGUvbGliL2Zhdm9yaXRlLXRvZ2dsZXIvZmF2b3JpdGUtdG9nZ2xlci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZmF2b3JpdGUvbGliL3NlcnZpY2UvanNvbi1mYXZvcml0ZS1leHBvcnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2Zhdm9yaXRlL2xpYi9mYXZvcml0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSURhdGFzZXQsIExvY2FsU3RvcmFnZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmNvbnN0IENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19TSU5HTEUgPSAnU2luZ2xlRmF2b3JpdGVzJztcbmNvbnN0IENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19HUk9VUCA9ICdHcm91cEZhdm9yaXRlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGYXZvcml0ZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgc2luZ2xlRmF2czogTWFwPHN0cmluZywgU2luZ2xlRmF2b3JpdGU+O1xuICBwcml2YXRlIGdyb3VwRmF2czogTWFwPHN0cmluZywgR3JvdXBGYXZvcml0ZT47XG4gIHByaXZhdGUgZ3JvdXBDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2VcbiAgKSB7XG4gICAgdGhpcy5sb2FkRmF2b3JpdGVzKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkRmF2b3JpdGUoZGF0YXNldDogSURhdGFzZXQsIGxhYmVsPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnNpbmdsZUZhdnMuaGFzKGRhdGFzZXQuaW50ZXJuYWxJZCkpIHtcbiAgICAgIHRoaXMuc2luZ2xlRmF2cy5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCB7XG4gICAgICAgIGlkOiBkYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgIGxhYmVsOiBsYWJlbCA/IGxhYmVsIDogZGF0YXNldC5sYWJlbCxcbiAgICAgICAgZmF2b3JpdGU6IGRhdGFzZXRcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGhhc0Zhdm9yaXRlKGRhdGFzZXQ6IElEYXRhc2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlRmF2cy5oYXMoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGYXZvcml0ZXMoKTogU2luZ2xlRmF2b3JpdGVbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zaW5nbGVGYXZzLnZhbHVlcygpKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVGYXZvcml0ZShmYXZvcml0ZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zaW5nbGVGYXZzLmhhcyhmYXZvcml0ZUlkKSkge1xuICAgICAgdGhpcy5zaW5nbGVGYXZzLmRlbGV0ZShmYXZvcml0ZUlkKTtcbiAgICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmdyb3VwRmF2cy5oYXMoZmF2b3JpdGVJZCkpIHtcbiAgICAgIHRoaXMuZ3JvdXBGYXZzLmRlbGV0ZShmYXZvcml0ZUlkKTtcbiAgICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRGYXZvcml0ZUdyb3VwKGRhdGFzZXRzOiBJRGF0YXNldFtdLCBsYWJlbD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlkID0gJ0dyb3VwJyArIHRoaXMuZ3JvdXBDb3VudGVyKys7XG4gICAgdGhpcy5ncm91cEZhdnMuc2V0KGlkLCB7XG4gICAgICBpZCxcbiAgICAgIGxhYmVsOiBsYWJlbCA/IGxhYmVsIDogaWQsXG4gICAgICBmYXZvcml0ZXM6IGRhdGFzZXRzXG4gICAgfSk7XG4gICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmF2b3JpdGVHcm91cHMoKTogR3JvdXBGYXZvcml0ZVtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmdyb3VwRmF2cy52YWx1ZXMoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQWxsRmF2b3JpdGVzKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuc2luZ2xlRmF2cy5jbGVhcigpO1xuICAgIHRoaXMuZ3JvdXBGYXZzLmNsZWFyKCk7XG4gICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlTGFiZWwoZmF2b3JpdGU6IEZhdm9yaXRlLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgZmF2b3JpdGUubGFiZWwgPSBsYWJlbDtcbiAgICBpZiAoaXNTaW5nbGVGYXZvcml0ZShmYXZvcml0ZSkpIHsgdGhpcy5zaW5nbGVGYXZzLnNldChmYXZvcml0ZS5pZCwgZmF2b3JpdGUpOyB9XG4gICAgaWYgKGlzR3JvdXBGYXZvcml0ZShmYXZvcml0ZSkpIHsgdGhpcy5ncm91cEZhdnMuc2V0KGZhdm9yaXRlLmlkLCBmYXZvcml0ZSk7IH1cbiAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUZhdm9yaXRlcygpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zYXZlKENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19TSU5HTEUsIHRoaXMuZ2V0RmF2b3JpdGVzKCkpO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlLnNhdmUoQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX0dST1VQLCB0aGlzLmdldEZhdm9yaXRlR3JvdXBzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRmF2b3JpdGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2luZ2xlRmF2cyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmdyb3VwRmF2cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBsb2FkZWRTaW5nbGVGYXZzID0gdGhpcy5sb2NhbFN0b3JhZ2UubG9hZEFycmF5PFNpbmdsZUZhdm9yaXRlPihDQUNIRV9QQVJBTV9GQVZPUklURVNfU0lOR0xFKTtcbiAgICBpZiAobG9hZGVkU2luZ2xlRmF2cykge1xuICAgICAgbG9hZGVkU2luZ2xlRmF2cy5mb3JFYWNoKChlbnRyeSkgPT4gdGhpcy5zaW5nbGVGYXZzLnNldChlbnRyeS5pZCwgZW50cnkpKTtcbiAgICB9XG4gICAgY29uc3QgbG9hZGVkR3JvdXBGYXZzID0gdGhpcy5sb2NhbFN0b3JhZ2UubG9hZEFycmF5PEdyb3VwRmF2b3JpdGU+KENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19HUk9VUCk7XG4gICAgaWYgKGxvYWRlZEdyb3VwRmF2cykge1xuICAgICAgbG9hZGVkR3JvdXBGYXZzLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLmdyb3VwRmF2cy5zZXQoZW50cnkuaWQsIGVudHJ5KSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGUge1xuICBpZDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpbmdsZUZhdm9yaXRlIGV4dGVuZHMgRmF2b3JpdGUge1xuICBmYXZvcml0ZTogSURhdGFzZXQ7XG59XG5cbmZ1bmN0aW9uIGlzU2luZ2xlRmF2b3JpdGUob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgU2luZ2xlRmF2b3JpdGUge1xuICByZXR1cm4gJ2Zhdm9yaXRlJyBpbiBvYmplY3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JvdXBGYXZvcml0ZSBleHRlbmRzIEZhdm9yaXRlIHtcbiAgZmF2b3JpdGVzOiBJRGF0YXNldFtdO1xufVxuXG5mdW5jdGlvbiBpc0dyb3VwRmF2b3JpdGUob2JqZWN0OiBhbnkpOiBvYmplY3QgaXMgR3JvdXBGYXZvcml0ZSB7XG4gIHJldHVybiAnZmF2b3JpdGVzJyBpbiBvYmplY3Q7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElEYXRhc2V0LCBOb3RpZmllclNlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBGYXZvcml0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2Zhdm9yaXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZmF2b3JpdGUtdG9nZ2xlcicsXG4gIHRlbXBsYXRlOiBgPGkgY2xhc3M9XCJmYVwiIChjbGljayk9XCJ0b2dnbGUoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIFtuZ0NsYXNzXT1cImlzRmF2b3JpdGUgPyAnZmEtc3RhcicgOiAnZmEtc3Rhci1vJ1wiPjwvaT5gXG59KVxuZXhwb3J0IGNsYXNzIEZhdm9yaXRlVG9nZ2xlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGRhdGFzZXQ6IElEYXRhc2V0O1xuICBwdWJsaWMgaXNGYXZvcml0ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZmF2U3J2YzogRmF2b3JpdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBub3RpZmllcjogTm90aWZpZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmRhdGFzZXQgJiYgdGhpcy5kYXRhc2V0KSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSB0aGlzLmZhdlNydmMuaGFzRmF2b3JpdGUodGhpcy5kYXRhc2V0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzRmF2b3JpdGUpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5mYXZTcnZjLnJlbW92ZUZhdm9yaXRlKHRoaXMuZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLmdldCgnZmF2b3JpdGUubm90aWZpZXIucmVtb3ZlLWZhdm9yaXRlJykuc3Vic2NyaWJlKCh0cmFuc2xhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeSh0cmFuc2xhdGlvbiArICc6ICcgKyB0aGlzLmRhdGFzZXQubGFiZWwpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRydWU7XG4gICAgICB0aGlzLmZhdlNydmMuYWRkRmF2b3JpdGUodGhpcy5kYXRhc2V0KTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLmdldCgnZmF2b3JpdGUubm90aWZpZXIuYWRkLWZhdm9yaXRlJykuc3Vic2NyaWJlKCh0cmFuc2xhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWVyLm5vdGlmeSh0cmFuc2xhdGlvbiArICc6ICcgKyB0aGlzLmRhdGFzZXQubGFiZWwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5cbmltcG9ydCB7IEZhdm9yaXRlU2VydmljZSwgU2luZ2xlRmF2b3JpdGUgfSBmcm9tICcuL2Zhdm9yaXRlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvbkZhdm9yaXRlRXhwb3J0ZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZmF2b3JpdGVTcnZjOiBGYXZvcml0ZVNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgZXhwb3J0RmF2b3JpdGVzKCkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gJ2Zhdm9yaXRlcy5qc29uJztcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5mYXZvcml0ZVNydmMuZ2V0RmF2b3JpdGVzKCkpO1xuICAgIC8vIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcbiAgICAvLyAgICAgLy8gSUUgdmVyc2lvbiA+PSAxMFxuICAgIC8vICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2pzb25dLCB7XG4gICAgLy8gICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04OydcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCBmaWxlbmFtZSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyBGRiwgQ2hyb21lIC4uLlxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gJ2RhdGE6YXBwbGljYXRpb24vanNvbiwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGpzb24pO1xuICAgIGEudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuICAgIC8vIH1cbiAgfVxuXG4gIHB1YmxpYyBpbXBvcnRGYXZvcml0ZXMoZXZlbnQ6IGFueSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICAgIGlmIChmaWxlcyAmJiBmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZmF2b3JpdGVTcnZjLnJlbW92ZUFsbEZhdm9yaXRlcygpO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlc1swXSk7XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIC8vIGFsZXJ0U2VydmljZS5lcnJvcigkdHJhbnNsYXRlLmluc3RhbnQoJ2Zhdm9yaXRlLmltcG9ydC53cm9uZ0ZpbGUnKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZTogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgIGNvbnN0IGZhdm9yaXRlcyA9IEpTT04ucGFyc2UocmVzdWx0KSBhcyBTaW5nbGVGYXZvcml0ZVtdO1xuICAgICAgICAgIGZhdm9yaXRlcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZVNydmMuYWRkRmF2b3JpdGUoZW50cnkuZmF2b3JpdGUsIGVudHJ5LmxhYmVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGYXZvcml0ZVRvZ2dsZXJDb21wb25lbnQgfSBmcm9tICcuL2Zhdm9yaXRlLXRvZ2dsZXIvZmF2b3JpdGUtdG9nZ2xlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmF2b3JpdGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2Zhdm9yaXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnNvbkZhdm9yaXRlRXhwb3J0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2pzb24tZmF2b3JpdGUtZXhwb3J0ZXIuc2VydmljZSc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIEZhdm9yaXRlVG9nZ2xlckNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDT01QT05FTlRTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEZhdm9yaXRlU2VydmljZSxcbiAgICBKc29uRmF2b3JpdGVFeHBvcnRlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRGYXZvcml0ZU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFHQSxJQUFNLDRCQUE0QixHQUFHLGlCQUFpQixDQUFDOztBQUN2RCxJQUFNLDJCQUEyQixHQUFHLGdCQUFnQixDQUFDOztJQVNuRCx5QkFDWSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYzs0QkFIZixDQUFDO1FBS3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7O0lBRU0scUNBQVc7Ozs7O2NBQUMsT0FBaUIsRUFBRSxLQUFjO1FBQ2xELElB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