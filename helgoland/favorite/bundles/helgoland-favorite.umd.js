(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('@ngx-translate/core'), require('rxjs/Observable'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@helgoland/favorite', ['exports', '@angular/core', '@helgoland/core', '@ngx-translate/core', 'rxjs/Observable', '@angular/common'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.favorite = {}),global.ng.core,null,null,global.rxjs.Observable,global.ng.common));
}(this, (function (exports,core,core$1,core$2,Observable,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CACHE_PARAM_FAVORITES_SINGLE = 'SingleFavorites';
    /** @type {?} */
    var CACHE_PARAM_FAVORITES_GROUP = 'GroupFavorites';
    var FavoriteService = (function () {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FavoriteService.ctorParameters = function () {
            return [
                { type: core$1.LocalStorage }
            ];
        };
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
    var FavoriteTogglerComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'n52-favorite-toggler',
                        template: "<i class=\"fa\" (click)=\"toggle(); $event.stopPropagation();\" [ngClass]=\"isFavorite ? 'fa-star' : 'fa-star-o'\"></i>"
                    },] },
        ];
        /** @nocollapse */
        FavoriteTogglerComponent.ctorParameters = function () {
            return [
                { type: FavoriteService },
                { type: core$1.NotifierService },
                { type: core$2.TranslateService }
            ];
        };
        FavoriteTogglerComponent.propDecorators = {
            dataset: [{ type: core.Input }]
        };
        return FavoriteTogglerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var JsonFavoriteExporterService = (function () {
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
                return new Observable.Observable(function (observer) {
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
                            var favorites = (JSON.parse(result));
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        JsonFavoriteExporterService.ctorParameters = function () {
            return [
                { type: FavoriteService }
            ];
        };
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
    var HelgolandFavoriteModule = (function () {
        function HelgolandFavoriteModule() {
        }
        HelgolandFavoriteModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            COMPONENTS
                        ],
                        imports: [
                            common.CommonModule
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

    exports.HelgolandFavoriteModule = HelgolandFavoriteModule;
    exports.FavoriteService = FavoriteService;
    exports.JsonFavoriteExporterService = JsonFavoriteExporterService;
    exports.ɵa = FavoriteTogglerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWZhdm9yaXRlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9mYXZvcml0ZS9saWIvc2VydmljZS9mYXZvcml0ZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2Zhdm9yaXRlL2xpYi9mYXZvcml0ZS10b2dnbGVyL2Zhdm9yaXRlLXRvZ2dsZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2Zhdm9yaXRlL2xpYi9zZXJ2aWNlL2pzb24tZmF2b3JpdGUtZXhwb3J0ZXIuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9mYXZvcml0ZS9saWIvZmF2b3JpdGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElEYXRhc2V0LCBMb2NhbFN0b3JhZ2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5jb25zdCBDQUNIRV9QQVJBTV9GQVZPUklURVNfU0lOR0xFID0gJ1NpbmdsZUZhdm9yaXRlcyc7XG5jb25zdCBDQUNIRV9QQVJBTV9GQVZPUklURVNfR1JPVVAgPSAnR3JvdXBGYXZvcml0ZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmF2b3JpdGVTZXJ2aWNlIHtcblxuICBwcml2YXRlIHNpbmdsZUZhdnM6IE1hcDxzdHJpbmcsIFNpbmdsZUZhdm9yaXRlPjtcbiAgcHJpdmF0ZSBncm91cEZhdnM6IE1hcDxzdHJpbmcsIEdyb3VwRmF2b3JpdGU+O1xuICBwcml2YXRlIGdyb3VwQ291bnRlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZTogTG9jYWxTdG9yYWdlXG4gICkge1xuICAgIHRoaXMubG9hZEZhdm9yaXRlcygpO1xuICB9XG5cbiAgcHVibGljIGFkZEZhdm9yaXRlKGRhdGFzZXQ6IElEYXRhc2V0LCBsYWJlbD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zaW5nbGVGYXZzLmhhcyhkYXRhc2V0LmludGVybmFsSWQpKSB7XG4gICAgICB0aGlzLnNpbmdsZUZhdnMuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwge1xuICAgICAgICBpZDogZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICBsYWJlbDogbGFiZWwgPyBsYWJlbCA6IGRhdGFzZXQubGFiZWwsXG4gICAgICAgIGZhdm9yaXRlOiBkYXRhc2V0XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNGYXZvcml0ZShkYXRhc2V0OiBJRGF0YXNldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZUZhdnMuaGFzKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmF2b3JpdGVzKCk6IFNpbmdsZUZhdm9yaXRlW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2luZ2xlRmF2cy52YWx1ZXMoKSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRmF2b3JpdGUoZmF2b3JpdGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmF2cy5oYXMoZmF2b3JpdGVJZCkpIHtcbiAgICAgIHRoaXMuc2luZ2xlRmF2cy5kZWxldGUoZmF2b3JpdGVJZCk7XG4gICAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncm91cEZhdnMuaGFzKGZhdm9yaXRlSWQpKSB7XG4gICAgICB0aGlzLmdyb3VwRmF2cy5kZWxldGUoZmF2b3JpdGVJZCk7XG4gICAgICB0aGlzLnNhdmVGYXZvcml0ZXMoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkRmF2b3JpdGVHcm91cChkYXRhc2V0czogSURhdGFzZXRbXSwgbGFiZWw/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBpZCA9ICdHcm91cCcgKyB0aGlzLmdyb3VwQ291bnRlcisrO1xuICAgIHRoaXMuZ3JvdXBGYXZzLnNldChpZCwge1xuICAgICAgaWQsXG4gICAgICBsYWJlbDogbGFiZWwgPyBsYWJlbCA6IGlkLFxuICAgICAgZmF2b3JpdGVzOiBkYXRhc2V0c1xuICAgIH0pO1xuICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldEZhdm9yaXRlR3JvdXBzKCk6IEdyb3VwRmF2b3JpdGVbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ncm91cEZhdnMudmFsdWVzKCkpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFsbEZhdm9yaXRlcygpOiBib29sZWFuIHtcbiAgICB0aGlzLnNpbmdsZUZhdnMuY2xlYXIoKTtcbiAgICB0aGlzLmdyb3VwRmF2cy5jbGVhcigpO1xuICAgIHRoaXMuc2F2ZUZhdm9yaXRlcygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNoYW5nZUxhYmVsKGZhdm9yaXRlOiBGYXZvcml0ZSwgbGFiZWw6IHN0cmluZykge1xuICAgIGZhdm9yaXRlLmxhYmVsID0gbGFiZWw7XG4gICAgaWYgKGlzU2luZ2xlRmF2b3JpdGUoZmF2b3JpdGUpKSB7IHRoaXMuc2luZ2xlRmF2cy5zZXQoZmF2b3JpdGUuaWQsIGZhdm9yaXRlKTsgfVxuICAgIGlmIChpc0dyb3VwRmF2b3JpdGUoZmF2b3JpdGUpKSB7IHRoaXMuZ3JvdXBGYXZzLnNldChmYXZvcml0ZS5pZCwgZmF2b3JpdGUpOyB9XG4gICAgdGhpcy5zYXZlRmF2b3JpdGVzKCk7XG4gIH1cblxuICBwcml2YXRlIHNhdmVGYXZvcml0ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZShDQUNIRV9QQVJBTV9GQVZPUklURVNfU0lOR0xFLCB0aGlzLmdldEZhdm9yaXRlcygpKTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zYXZlKENBQ0hFX1BBUkFNX0ZBVk9SSVRFU19HUk9VUCwgdGhpcy5nZXRGYXZvcml0ZUdyb3VwcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEZhdm9yaXRlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNpbmdsZUZhdnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5ncm91cEZhdnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgbG9hZGVkU2luZ2xlRmF2cyA9IHRoaXMubG9jYWxTdG9yYWdlLmxvYWRBcnJheTxTaW5nbGVGYXZvcml0ZT4oQ0FDSEVfUEFSQU1fRkFWT1JJVEVTX1NJTkdMRSk7XG4gICAgaWYgKGxvYWRlZFNpbmdsZUZhdnMpIHtcbiAgICAgIGxvYWRlZFNpbmdsZUZhdnMuZm9yRWFjaCgoZW50cnkpID0+IHRoaXMuc2luZ2xlRmF2cy5zZXQoZW50cnkuaWQsIGVudHJ5KSk7XG4gICAgfVxuICAgIGNvbnN0IGxvYWRlZEdyb3VwRmF2cyA9IHRoaXMubG9jYWxTdG9yYWdlLmxvYWRBcnJheTxHcm91cEZhdm9yaXRlPihDQUNIRV9QQVJBTV9GQVZPUklURVNfR1JPVVApO1xuICAgIGlmIChsb2FkZWRHcm91cEZhdnMpIHtcbiAgICAgIGxvYWRlZEdyb3VwRmF2cy5mb3JFYWNoKChlbnRyeSkgPT4gdGhpcy5ncm91cEZhdnMuc2V0KGVudHJ5LmlkLCBlbnRyeSkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlIHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaW5nbGVGYXZvcml0ZSBleHRlbmRzIEZhdm9yaXRlIHtcbiAgZmF2b3JpdGU6IElEYXRhc2V0O1xufVxuXG5mdW5jdGlvbiBpc1NpbmdsZUZhdm9yaXRlKG9iamVjdDogYW55KTogb2JqZWN0IGlzIFNpbmdsZUZhdm9yaXRlIHtcbiAgcmV0dXJuICdmYXZvcml0ZScgaW4gb2JqZWN0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwRmF2b3JpdGUgZXh0ZW5kcyBGYXZvcml0ZSB7XG4gIGZhdm9yaXRlczogSURhdGFzZXRbXTtcbn1cblxuZnVuY3Rpb24gaXNHcm91cEZhdm9yaXRlKG9iamVjdDogYW55KTogb2JqZWN0IGlzIEdyb3VwRmF2b3JpdGUge1xuICByZXR1cm4gJ2Zhdm9yaXRlcycgaW4gb2JqZWN0O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRGF0YXNldCwgTm90aWZpZXJTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgRmF2b3JpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9mYXZvcml0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWZhdm9yaXRlLXRvZ2dsZXInLFxuICB0ZW1wbGF0ZTogYDxpIGNsYXNzPVwiZmFcIiAoY2xpY2spPVwidG9nZ2xlKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdDbGFzc109XCJpc0Zhdm9yaXRlID8gJ2ZhLXN0YXInIDogJ2ZhLXN0YXItbydcIj48L2k+YFxufSlcbmV4cG9ydCBjbGFzcyBGYXZvcml0ZVRvZ2dsZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBkYXRhc2V0OiBJRGF0YXNldDtcbiAgcHVibGljIGlzRmF2b3JpdGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGZhdlNydmM6IEZhdm9yaXRlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbm90aWZpZXI6IE5vdGlmaWVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhc2V0ICYmIHRoaXMuZGF0YXNldCkge1xuICAgICAgdGhpcy5pc0Zhdm9yaXRlID0gdGhpcy5mYXZTcnZjLmhhc0Zhdm9yaXRlKHRoaXMuZGF0YXNldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5pc0Zhdm9yaXRlKSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZmF2U3J2Yy5yZW1vdmVGYXZvcml0ZSh0aGlzLmRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ2Zhdm9yaXRlLm5vdGlmaWVyLnJlbW92ZS1mYXZvcml0ZScpLnN1YnNjcmliZSgodHJhbnNsYXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkodHJhbnNsYXRpb24gKyAnOiAnICsgdGhpcy5kYXRhc2V0LmxhYmVsKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzRmF2b3JpdGUgPSB0cnVlO1xuICAgICAgdGhpcy5mYXZTcnZjLmFkZEZhdm9yaXRlKHRoaXMuZGF0YXNldCk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5nZXQoJ2Zhdm9yaXRlLm5vdGlmaWVyLmFkZC1mYXZvcml0ZScpLnN1YnNjcmliZSgodHJhbnNsYXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmllci5ub3RpZnkodHJhbnNsYXRpb24gKyAnOiAnICsgdGhpcy5kYXRhc2V0LmxhYmVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5pbXBvcnQgeyBGYXZvcml0ZVNlcnZpY2UsIFNpbmdsZUZhdm9yaXRlIH0gZnJvbSAnLi9mYXZvcml0ZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25GYXZvcml0ZUV4cG9ydGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGZhdm9yaXRlU3J2YzogRmF2b3JpdGVTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGV4cG9ydEZhdm9yaXRlcygpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9ICdmYXZvcml0ZXMuanNvbic7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZmF2b3JpdGVTcnZjLmdldEZhdm9yaXRlcygpKTtcbiAgICAvLyBpZiAod2luZG93Lm5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XG4gICAgLy8gICAgIC8vIElFIHZlcnNpb24gPj0gMTBcbiAgICAvLyAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uXSwge1xuICAgIC8vICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODsnXG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZUJsb2IoYmxvYiwgZmlsZW5hbWUpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gRkYsIENocm9tZSAuLi5cbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb24sJyArIGVuY29kZVVSSUNvbXBvbmVudChqc29uKTtcbiAgICBhLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICAvLyB9XG4gIH1cblxuICBwdWJsaWMgaW1wb3J0RmF2b3JpdGVzKGV2ZW50OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgY29uc3QgZmlsZXMgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgICBpZiAoZmlsZXMgJiYgZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZhdm9yaXRlU3J2Yy5yZW1vdmVBbGxGYXZvcml0ZXMoKTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZXNbMF0pO1xuICAgICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAvLyBhbGVydFNlcnZpY2UuZXJyb3IoJHRyYW5zbGF0ZS5pbnN0YW50KCdmYXZvcml0ZS5pbXBvcnQud3JvbmdGaWxlJykpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBjb25zdCBmYXZvcml0ZXMgPSBKU09OLnBhcnNlKHJlc3VsdCkgYXMgU2luZ2xlRmF2b3JpdGVbXTtcbiAgICAgICAgICBmYXZvcml0ZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVTcnZjLmFkZEZhdm9yaXRlKGVudHJ5LmZhdm9yaXRlLCBlbnRyeS5sYWJlbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmF2b3JpdGVUb2dnbGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mYXZvcml0ZS10b2dnbGVyL2Zhdm9yaXRlLXRvZ2dsZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhdm9yaXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9mYXZvcml0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEpzb25GYXZvcml0ZUV4cG9ydGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9qc29uLWZhdm9yaXRlLWV4cG9ydGVyLnNlcnZpY2UnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBGYXZvcml0ZVRvZ2dsZXJDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENPTVBPTkVOVFNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ09NUE9ORU5UU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBGYXZvcml0ZVNlcnZpY2UsXG4gICAgSnNvbkZhdm9yaXRlRXhwb3J0ZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRmF2b3JpdGVNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkxvY2FsU3RvcmFnZSIsIkNvbXBvbmVudCIsIk5vdGlmaWVyU2VydmljZSIsIlRyYW5zbGF0ZVNlcnZpY2UiLCJJbnB1dCIsIk9ic2VydmFibGUiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0lBR0EsSUFBTSw0QkFBNEIsR0FBRyxpQkFBaUIsQ0FBQzs7SUFDdkQsSUFBTSwyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFTbkQseUJBQ1ksWUFB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