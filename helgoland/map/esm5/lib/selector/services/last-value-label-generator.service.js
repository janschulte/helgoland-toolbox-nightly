/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import moment from 'moment';
import { LastValueLabelGenerator } from './last-value-label-generator.interface';
var LastValueLabelGeneratorService = /** @class */ (function (_super) {
    tslib_1.__extends(LastValueLabelGeneratorService, _super);
    function LastValueLabelGeneratorService() {
        return _super.call(this) || this;
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    LastValueLabelGeneratorService.prototype.createIconLabel = /**
     * @param {?} ts
     * @return {?}
     */
    function (ts) {
        /** @type {?} */
        var date = moment(ts.lastValue.timestamp).fromNow();
        return L.divIcon({
            className: 'last-value-container',
            html: "<span class=\"last-value-label\">" + ts.lastValue.value + "&nbsp;" + ts.uom + "</span><br><span class=\"last-value-date\">" + date + "</span>"
        });
    };
    LastValueLabelGeneratorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LastValueLabelGeneratorService.ctorParameters = function () { return []; };
    return LastValueLabelGeneratorService;
}(LastValueLabelGenerator));
export { LastValueLabelGeneratorService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdG9yL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdCLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7SUFHN0IsMERBQXVCO0lBRXpFO2VBQ0UsaUJBQU87S0FDUjs7Ozs7SUFFTSx3REFBZTs7OztjQUFDLEVBQWM7O1FBQ25DLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2YsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxJQUFJLEVBQUUsc0NBQWtDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxjQUFTLEVBQUUsQ0FBQyxHQUFHLG1EQUE0QyxJQUFJLFlBQVM7U0FDbkksQ0FBQyxDQUFDOzs7Z0JBWk4sVUFBVTs7Ozt5Q0FQWDtFQVFvRCx1QkFBdUI7U0FBOUQsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciB9IGZyb20gJy4vbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZSBleHRlbmRzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUljb25MYWJlbCh0czogVGltZXNlcmllcykge1xuICAgIGNvbnN0IGRhdGUgPSBtb21lbnQodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkuZnJvbU5vdygpO1xuICAgIHJldHVybiBMLmRpdkljb24oe1xuICAgICAgY2xhc3NOYW1lOiAnbGFzdC12YWx1ZS1jb250YWluZXInLFxuICAgICAgaHRtbDogYDxzcGFuIGNsYXNzPVwibGFzdC12YWx1ZS1sYWJlbFwiPiR7dHMubGFzdFZhbHVlLnZhbHVlfSZuYnNwOyR7dHMudW9tfTwvc3Bhbj48YnI+PHNwYW4gY2xhc3M9XCJsYXN0LXZhbHVlLWRhdGVcIj4ke2RhdGV9PC9zcGFuPmBcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=