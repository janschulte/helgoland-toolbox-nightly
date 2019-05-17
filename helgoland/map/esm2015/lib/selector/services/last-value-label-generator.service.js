/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import moment from 'moment';
import { LastValueLabelGenerator } from './last-value-label-generator.interface';
export class LastValueLabelGeneratorService extends LastValueLabelGenerator {
    constructor() {
        super();
    }
    /**
     * @param {?} ts
     * @return {?}
     */
    createIconLabel(ts) {
        /** @type {?} */
        const date = moment(ts.lastValue.timestamp).fromNow();
        return L.divIcon({
            className: 'last-value-container',
            html: `<span class="last-value-label">${ts.lastValue.value}&nbsp;${ts.uom}</span><br><span class="last-value-date">${date}</span>`
        });
    }
}
LastValueLabelGeneratorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LastValueLabelGeneratorService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdG9yL3NlcnZpY2VzL2xhc3QtdmFsdWUtbGFiZWwtZ2VuZXJhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR2pGLE1BQU0scUNBQXNDLFNBQVEsdUJBQXVCO0lBRXpFO1FBQ0UsS0FBSyxFQUFFLENBQUM7S0FDVDs7Ozs7SUFFTSxlQUFlLENBQUMsRUFBYzs7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDZixTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLElBQUksRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDLEdBQUcsNENBQTRDLElBQUksU0FBUztTQUNuSSxDQUFDLENBQUM7Ozs7WUFaTixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZXNlcmllcyB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBMYXN0VmFsdWVMYWJlbEdlbmVyYXRvciB9IGZyb20gJy4vbGFzdC12YWx1ZS1sYWJlbC1nZW5lcmF0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yU2VydmljZSBleHRlbmRzIExhc3RWYWx1ZUxhYmVsR2VuZXJhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUljb25MYWJlbCh0czogVGltZXNlcmllcykge1xuICAgIGNvbnN0IGRhdGUgPSBtb21lbnQodHMubGFzdFZhbHVlLnRpbWVzdGFtcCkuZnJvbU5vdygpO1xuICAgIHJldHVybiBMLmRpdkljb24oe1xuICAgICAgY2xhc3NOYW1lOiAnbGFzdC12YWx1ZS1jb250YWluZXInLFxuICAgICAgaHRtbDogYDxzcGFuIGNsYXNzPVwibGFzdC12YWx1ZS1sYWJlbFwiPiR7dHMubGFzdFZhbHVlLnZhbHVlfSZuYnNwOyR7dHMudW9tfTwvc3Bhbj48YnI+PHNwYW4gY2xhc3M9XCJsYXN0LXZhbHVlLWRhdGVcIj4ke2RhdGV9PC9zcGFuPmBcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=