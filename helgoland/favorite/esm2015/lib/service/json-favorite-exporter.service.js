/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FavoriteService } from './favorite.service';
export class JsonFavoriteExporterService {
    /**
     * @param {?} favoriteSrvc
     */
    constructor(favoriteSrvc) {
        this.favoriteSrvc = favoriteSrvc;
    }
    /**
     * @return {?}
     */
    exportFavorites() {
        /** @type {?} */
        const filename = 'favorites.json';
        /** @type {?} */
        const json = JSON.stringify(this.favoriteSrvc.getFavorites());
        /** @type {?} */
        const a = document.createElement('a');
        a.href = 'data:application/json,' + encodeURIComponent(json);
        a.target = '_blank';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    importFavorites(event) {
        return new Observable((observer) => {
            /** @type {?} */
            const files = event.target.files;
            if (files && files.length > 0) {
                this.favoriteSrvc.removeAllFavorites();
                /** @type {?} */
                const reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onerror = () => {
                    // alertService.error($translate.instant('favorite.import.wrongFile'));
                };
                reader.onload = (e) => {
                    /** @type {?} */
                    const result = e.target.result;
                    /** @type {?} */
                    const favorites = /** @type {?} */ (JSON.parse(result));
                    favorites.forEach((entry) => {
                        this.favoriteSrvc.addFavorite(entry.favorite, entry.label);
                    });
                    observer.next(true);
                    observer.complete();
                };
            }
        });
    }
}
JsonFavoriteExporterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JsonFavoriteExporterService.ctorParameters = () => [
    { type: FavoriteService }
];
if (false) {
    /** @type {?} */
    JsonFavoriteExporterService.prototype.favoriteSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1mYXZvcml0ZS1leHBvcnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9mYXZvcml0ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL2pzb24tZmF2b3JpdGUtZXhwb3J0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUdyRSxNQUFNOzs7O0lBRUosWUFDWSxZQUE2QjtRQUE3QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7S0FDcEM7Ozs7SUFFRSxlQUFlOztRQUNwQixNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQzs7UUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7O1FBUzlELE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLElBQUksR0FBRyx3QkFBd0IsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7SUFJTCxlQUFlLENBQUMsS0FBVTtRQUMvQixNQUFNLENBQUMsSUFBSSxVQUFVLENBQVUsQ0FBQyxRQUEyQixFQUFFLEVBQUU7O1lBQzdELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7Z0JBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFOztpQkFFckIsQ0FBQztnQkFDRixNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7O29CQUN6QixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7b0JBQy9CLE1BQU0sU0FBUyxxQkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBcUIsRUFBQztvQkFDekQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDNUQsQ0FBQyxDQUFDO29CQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDckIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDOzs7O1lBL0NOLFVBQVU7Ozs7WUFGRixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5pbXBvcnQgeyBGYXZvcml0ZVNlcnZpY2UsIFNpbmdsZUZhdm9yaXRlIH0gZnJvbSAnLi9mYXZvcml0ZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpzb25GYXZvcml0ZUV4cG9ydGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGZhdm9yaXRlU3J2YzogRmF2b3JpdGVTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGV4cG9ydEZhdm9yaXRlcygpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9ICdmYXZvcml0ZXMuanNvbic7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZmF2b3JpdGVTcnZjLmdldEZhdm9yaXRlcygpKTtcbiAgICAvLyBpZiAod2luZG93Lm5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XG4gICAgLy8gICAgIC8vIElFIHZlcnNpb24gPj0gMTBcbiAgICAvLyAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uXSwge1xuICAgIC8vICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODsnXG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZUJsb2IoYmxvYiwgZmlsZW5hbWUpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gRkYsIENocm9tZSAuLi5cbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb24sJyArIGVuY29kZVVSSUNvbXBvbmVudChqc29uKTtcbiAgICBhLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICAvLyB9XG4gIH1cblxuICBwdWJsaWMgaW1wb3J0RmF2b3JpdGVzKGV2ZW50OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgY29uc3QgZmlsZXMgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgICBpZiAoZmlsZXMgJiYgZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZhdm9yaXRlU3J2Yy5yZW1vdmVBbGxGYXZvcml0ZXMoKTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZXNbMF0pO1xuICAgICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAvLyBhbGVydFNlcnZpY2UuZXJyb3IoJHRyYW5zbGF0ZS5pbnN0YW50KCdmYXZvcml0ZS5pbXBvcnQud3JvbmdGaWxlJykpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICBjb25zdCBmYXZvcml0ZXMgPSBKU09OLnBhcnNlKHJlc3VsdCkgYXMgU2luZ2xlRmF2b3JpdGVbXTtcbiAgICAgICAgICBmYXZvcml0ZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVTcnZjLmFkZEZhdm9yaXRlKGVudHJ5LmZhdm9yaXRlLCBlbnRyeS5sYWJlbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=