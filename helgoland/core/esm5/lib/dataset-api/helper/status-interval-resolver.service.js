/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var StatusIntervalResolverService = /** @class */ (function () {
    function StatusIntervalResolverService() {
    }
    /**
     * @param {?} value
     * @param {?} statusIntervals
     * @return {?}
     */
    StatusIntervalResolverService.prototype.getMatchingInterval = /**
     * @param {?} value
     * @param {?} statusIntervals
     * @return {?}
     */
    function (value, statusIntervals) {
        if (value && statusIntervals) {
            return statusIntervals.find(function (interval) {
                /** @type {?} */
                var upper = interval.upper ? parseFloat(interval.upper) : Number.MAX_VALUE;
                /** @type {?} */
                var lower = interval.lower ? parseFloat(interval.lower) : Number.MIN_VALUE;
                if (lower <= value && value < upper) {
                    return true;
                }
            });
        }
    };
    StatusIntervalResolverService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StatusIntervalResolverService.ctorParameters = function () { return []; };
    return StatusIntervalResolverService;
}());
export { StatusIntervalResolverService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWludGVydmFsLXJlc29sdmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGF0YXNldC1hcGkvaGVscGVyL3N0YXR1cy1pbnRlcnZhbC1yZXNvbHZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQU96QztLQUFpQjs7Ozs7O0lBRVYsMkRBQW1COzs7OztjQUFDLEtBQWEsRUFBRSxlQUFpQztRQUN6RSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7O2dCQUNuQyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOztnQkFDN0UsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDN0UsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2lCQUFFO2FBQ3RELENBQUMsQ0FBQztTQUNKOzs7Z0JBWkosVUFBVTs7Ozt3Q0FKWDs7U0FLYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0YXR1c0ludGVydmFsIH0gZnJvbSAnLi4vLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YXNldCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgZ2V0TWF0Y2hpbmdJbnRlcnZhbCh2YWx1ZTogbnVtYmVyLCBzdGF0dXNJbnRlcnZhbHM6IFN0YXR1c0ludGVydmFsW10pOiBTdGF0dXNJbnRlcnZhbCB7XG4gICAgaWYgKHZhbHVlICYmIHN0YXR1c0ludGVydmFscykge1xuICAgICAgcmV0dXJuIHN0YXR1c0ludGVydmFscy5maW5kKChpbnRlcnZhbCkgPT4ge1xuICAgICAgICBjb25zdCB1cHBlciA9IGludGVydmFsLnVwcGVyID8gcGFyc2VGbG9hdChpbnRlcnZhbC51cHBlcikgOiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICBjb25zdCBsb3dlciA9IGludGVydmFsLmxvd2VyID8gcGFyc2VGbG9hdChpbnRlcnZhbC5sb3dlcikgOiBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICBpZiAobG93ZXIgPD0gdmFsdWUgJiYgdmFsdWUgPCB1cHBlcikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==