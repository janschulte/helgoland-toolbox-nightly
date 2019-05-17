/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FavoriteService } from './favorite.service';
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
export { JsonFavoriteExporterService };
if (false) {
    /** @type {?} */
    JsonFavoriteExporterService.prototype.favoriteSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1mYXZvcml0ZS1leHBvcnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9mYXZvcml0ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL2pzb24tZmF2b3JpdGUtZXhwb3J0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxvQkFBb0IsQ0FBQzs7SUFLbkUscUNBQ1ksWUFBNkI7UUFBN0IsaUJBQVksR0FBWixZQUFZLENBQWlCO0tBQ3BDOzs7O0lBRUUscURBQWU7Ozs7O1FBQ3BCLElBQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDOztRQUNsQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7UUFTOUQsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsSUFBSSxHQUFHLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7OztJQUlMLHFEQUFlOzs7O2NBQUMsS0FBVTs7UUFDL0IsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFVLFVBQUMsUUFBMkI7O1lBQ3pELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7Z0JBQ3ZDLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7O2lCQUVoQixDQUFDO2dCQUNGLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxDQUFNOztvQkFDckIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O29CQUMvQixJQUFNLFNBQVMscUJBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQXFCLEVBQUM7b0JBQ3pELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO3dCQUN0QixLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDNUQsQ0FBQyxDQUFDO29CQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDckIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDOzs7Z0JBL0NOLFVBQVU7Ozs7Z0JBRkYsZUFBZTs7c0NBSnhCOztTQU9hLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuaW1wb3J0IHsgRmF2b3JpdGVTZXJ2aWNlLCBTaW5nbGVGYXZvcml0ZSB9IGZyb20gJy4vZmF2b3JpdGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKc29uRmF2b3JpdGVFeHBvcnRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBmYXZvcml0ZVNydmM6IEZhdm9yaXRlU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBleHBvcnRGYXZvcml0ZXMoKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSAnZmF2b3JpdGVzLmpzb24nO1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmZhdm9yaXRlU3J2Yy5nZXRGYXZvcml0ZXMoKSk7XG4gICAgLy8gaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlQmxvYikge1xuICAgIC8vICAgICAvLyBJRSB2ZXJzaW9uID49IDEwXG4gICAgLy8gICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbanNvbl0sIHtcbiAgICAvLyAgICAgICAgIHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7J1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVCbG9iKGJsb2IsIGZpbGVuYW1lKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vIEZGLCBDaHJvbWUgLi4uXG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSAnZGF0YTphcHBsaWNhdGlvbi9qc29uLCcgKyBlbmNvZGVVUklDb21wb25lbnQoanNvbik7XG4gICAgYS50YXJnZXQgPSAnX2JsYW5rJztcbiAgICBhLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgLy8gfVxuICB9XG5cbiAgcHVibGljIGltcG9ydEZhdm9yaXRlcyhldmVudDogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGNvbnN0IGZpbGVzID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgaWYgKGZpbGVzICYmIGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mYXZvcml0ZVNydmMucmVtb3ZlQWxsRmF2b3JpdGVzKCk7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVzWzBdKTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgLy8gYWxlcnRTZXJ2aWNlLmVycm9yKCR0cmFuc2xhdGUuaW5zdGFudCgnZmF2b3JpdGUuaW1wb3J0Lndyb25nRmlsZScpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgY29uc3QgZmF2b3JpdGVzID0gSlNPTi5wYXJzZShyZXN1bHQpIGFzIFNpbmdsZUZhdm9yaXRlW107XG4gICAgICAgICAgZmF2b3JpdGVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZhdm9yaXRlU3J2Yy5hZGRGYXZvcml0ZShlbnRyeS5mYXZvcml0ZSwgZW50cnkubGFiZWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19