/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NotifierService } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { FavoriteService } from '../service/favorite.service';
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
export { FavoriteTogglerComponent };
if (false) {
    /** @type {?} */
    FavoriteTogglerComponent.prototype.dataset;
    /** @type {?} */
    FavoriteTogglerComponent.prototype.isFavorite;
    /** @type {?} */
    FavoriteTogglerComponent.prototype.favSrvc;
    /** @type {?} */
    FavoriteTogglerComponent.prototype.notifier;
    /** @type {?} */
    FavoriteTogglerComponent.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2b3JpdGUtdG9nZ2xlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2Zhdm9yaXRlLyIsInNvdXJjZXMiOlsibGliL2Zhdm9yaXRlLXRvZ2dsZXIvZmF2b3JpdGUtdG9nZ2xlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQVksZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQVk1RCxrQ0FDWSxPQUF3QixFQUN4QixRQUF5QixFQUN6QixTQUEyQjtRQUYzQixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUN6QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtLQUNsQzs7Ozs7SUFFRSw4Q0FBVzs7OztjQUFDLE9BQXNCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sZUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxRDs7Ozs7SUFHSSx5Q0FBTTs7Ozs7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsV0FBVztnQkFDNUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9ELENBQUMsQ0FBQztTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxXQUFXO2dCQUN6RSxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0QsQ0FBQyxDQUFDO1NBQ0o7OztnQkFuQ0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSx5SEFBbUg7aUJBQzlIOzs7O2dCQUxRLGVBQWU7Z0JBSEwsZUFBZTtnQkFDekIsZ0JBQWdCOzs7MEJBVXRCLEtBQUs7O21DQVpSOztTQVVhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSURhdGFzZXQsIE5vdGlmaWVyU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IEZhdm9yaXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZmF2b3JpdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1mYXZvcml0ZS10b2dnbGVyJyxcbiAgdGVtcGxhdGU6IGA8aSBjbGFzcz1cImZhXCIgKGNsaWNrKT1cInRvZ2dsZSgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nQ2xhc3NdPVwiaXNGYXZvcml0ZSA/ICdmYS1zdGFyJyA6ICdmYS1zdGFyLW8nXCI+PC9pPmBcbn0pXG5leHBvcnQgY2xhc3MgRmF2b3JpdGVUb2dnbGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZGF0YXNldDogSURhdGFzZXQ7XG4gIHB1YmxpYyBpc0Zhdm9yaXRlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBmYXZTcnZjOiBGYXZvcml0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG5vdGlmaWVyOiBOb3RpZmllclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuZGF0YXNldCAmJiB0aGlzLmRhdGFzZXQpIHtcbiAgICAgIHRoaXMuaXNGYXZvcml0ZSA9IHRoaXMuZmF2U3J2Yy5oYXNGYXZvcml0ZSh0aGlzLmRhdGFzZXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNGYXZvcml0ZSkge1xuICAgICAgdGhpcy5pc0Zhdm9yaXRlID0gZmFsc2U7XG4gICAgICB0aGlzLmZhdlNydmMucmVtb3ZlRmF2b3JpdGUodGhpcy5kYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgdGhpcy50cmFuc2xhdGUuZ2V0KCdmYXZvcml0ZS5ub3RpZmllci5yZW1vdmUtZmF2b3JpdGUnKS5zdWJzY3JpYmUoKHRyYW5zbGF0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpZXIubm90aWZ5KHRyYW5zbGF0aW9uICsgJzogJyArIHRoaXMuZGF0YXNldC5sYWJlbCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0Zhdm9yaXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmF2U3J2Yy5hZGRGYXZvcml0ZSh0aGlzLmRhdGFzZXQpO1xuICAgICAgdGhpcy50cmFuc2xhdGUuZ2V0KCdmYXZvcml0ZS5ub3RpZmllci5hZGQtZmF2b3JpdGUnKS5zdWJzY3JpYmUoKHRyYW5zbGF0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpZXIubm90aWZ5KHRyYW5zbGF0aW9uICsgJzogJyArIHRoaXMuZGF0YXNldC5sYWJlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==