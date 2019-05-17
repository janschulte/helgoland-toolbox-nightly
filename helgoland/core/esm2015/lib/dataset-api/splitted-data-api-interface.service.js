/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timespan } from '../model/internal/timeInterval';
import { DatasetImplApiInterface } from './dataset-impl-api-interface.service';
import { HttpService } from './http.service';
import { InternalIdHandler } from './internal-id-handler.service';
export class SplittedDataDatasetApiInterface extends DatasetImplApiInterface {
    /**
     * @param {?} httpservice
     * @param {?} internalDatasetId
     * @param {?} translate
     */
    constructor(httpservice, internalDatasetId, translate) {
        super(httpservice, internalDatasetId, translate);
        this.httpservice = httpservice;
        this.internalDatasetId = internalDatasetId;
        this.translate = translate;
    }
    /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getTsData(id, apiUrl, timespan, params = {}, options) {
        /** @type {?} */
        const maxTimeExtent = moment.duration(1, 'year').asMilliseconds();
        if ((timespan.to - timespan.from) > maxTimeExtent) {
            /** @type {?} */
            const requests = [];
            /** @type {?} */
            let start = moment(timespan.from).startOf('year');
            /** @type {?} */
            let end = moment(timespan.from).endOf('year');
            while (start.isBefore(moment(timespan.to))) {
                /** @type {?} */
                const chunkSpan = new Timespan(start.unix() * 1000, end.unix() * 1000);
                requests.push(super.getTsData(id, apiUrl, chunkSpan, params, options));
                start = end.add(1, 'millisecond');
                end = moment(start).endOf('year');
            }
            return forkJoin(requests).pipe(map((entry) => {
                return entry.reduce((previous, current) => {
                    /** @type {?} */
                    const next = {
                        referenceValues: {},
                        values: previous.values.concat(current.values)
                    };
                    for (const key in previous.referenceValues) {
                        if (previous.referenceValues.hasOwnProperty(key)) {
                            next.referenceValues[key] = previous.referenceValues[key].concat(current.referenceValues[key]);
                        }
                    }
                    return next;
                });
            }));
        }
        else {
            return super.getTsData(id, apiUrl, timespan, params, options);
        }
    }
}
SplittedDataDatasetApiInterface.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SplittedDataDatasetApiInterface.ctorParameters = () => [
    { type: HttpService },
    { type: InternalIdHandler },
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    SplittedDataDatasetApiInterface.prototype.httpservice;
    /** @type {?} */
    SplittedDataDatasetApiInterface.prototype.internalDatasetId;
    /** @type {?} */
    SplittedDataDatasetApiInterface.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZWQtZGF0YS1hcGktaW50ZXJmYWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGF0YXNldC1hcGkvc3BsaXR0ZWQtZGF0YS1hcGktaW50ZXJmYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFHbEUsTUFBTSxzQ0FBdUMsU0FBUSx1QkFBdUI7Ozs7OztJQUV4RSxZQUNjLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxTQUEyQjtRQUVyQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBSnZDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7S0FHeEM7Ozs7Ozs7Ozs7SUFFTSxTQUFTLENBQ1osRUFBVSxFQUNWLE1BQWMsRUFDZCxRQUFrQixFQUNsQixTQUE4QixFQUFFLEVBQ2hDLE9BQTJCOztRQUUzQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7O1lBQ2hELE1BQU0sUUFBUSxHQUErQixFQUFFLENBQUM7O1lBQ2hELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUNsRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7O2dCQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdkUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFOztvQkFDdEMsTUFBTSxJQUFJLEdBQVk7d0JBQ2xCLGVBQWUsRUFBRSxFQUFFO3dCQUNuQixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztxQkFDakQsQ0FBQztvQkFDRixHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzt3QkFDekMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDbEc7cUJBQ0o7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDZixDQUFDLENBQUM7YUFDTixDQUFDLENBQUMsQ0FBQztTQUNQO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDcEU7Ozs7WUE3Q1IsVUFBVTs7OztZQUhGLFdBQVc7WUFDWCxpQkFBaUI7WUFWakIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGEnO1xuaW1wb3J0IHsgRGF0YVBhcmFtZXRlckZpbHRlciwgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvaHR0cC1yZXF1ZXN0cyc7XG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBEYXRhc2V0SW1wbEFwaUludGVyZmFjZSB9IGZyb20gJy4vZGF0YXNldC1pbXBsLWFwaS1pbnRlcmZhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnLi9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3BsaXR0ZWREYXRhRGF0YXNldEFwaUludGVyZmFjZSBleHRlbmRzIERhdGFzZXRJbXBsQXBpSW50ZXJmYWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cHNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxEYXRhc2V0SWQ6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGh0dHBzZXJ2aWNlLCBpbnRlcm5hbERhdGFzZXRJZCwgdHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHNEYXRhPFQ+KFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgdGltZXNwYW46IFRpbWVzcGFuLFxuICAgICAgICBwYXJhbXM6IERhdGFQYXJhbWV0ZXJGaWx0ZXIgPSB7fSxcbiAgICAgICAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PiB7XG4gICAgICAgIGNvbnN0IG1heFRpbWVFeHRlbnQgPSBtb21lbnQuZHVyYXRpb24oMSwgJ3llYXInKS5hc01pbGxpc2Vjb25kcygpO1xuICAgICAgICBpZiAoKHRpbWVzcGFuLnRvIC0gdGltZXNwYW4uZnJvbSkgPiBtYXhUaW1lRXh0ZW50KSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0czogQXJyYXk8T2JzZXJ2YWJsZTxEYXRhPFQ+Pj4gPSBbXTtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5zdGFydE9mKCd5ZWFyJyk7XG4gICAgICAgICAgICBsZXQgZW5kID0gbW9tZW50KHRpbWVzcGFuLmZyb20pLmVuZE9mKCd5ZWFyJyk7XG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuaXNCZWZvcmUobW9tZW50KHRpbWVzcGFuLnRvKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVua1NwYW4gPSBuZXcgVGltZXNwYW4oc3RhcnQudW5peCgpICogMTAwMCwgZW5kLnVuaXgoKSAqIDEwMDApO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RzLnB1c2goc3VwZXIuZ2V0VHNEYXRhPFQ+KGlkLCBhcGlVcmwsIGNodW5rU3BhbiwgcGFyYW1zLCBvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQuYWRkKDEsICdtaWxsaXNlY29uZCcpO1xuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChzdGFydCkuZW5kT2YoJ3llYXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihyZXF1ZXN0cykucGlwZShtYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5LnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dDogRGF0YTxUPiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZVZhbHVlczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHByZXZpb3VzLnZhbHVlcy5jb25jYXQoY3VycmVudC52YWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByZXZpb3VzLnJlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzLnJlZmVyZW5jZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5yZWZlcmVuY2VWYWx1ZXNba2V5XSA9IHByZXZpb3VzLnJlZmVyZW5jZVZhbHVlc1trZXldLmNvbmNhdChjdXJyZW50LnJlZmVyZW5jZVZhbHVlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5nZXRUc0RhdGE8VD4oaWQsIGFwaVVybCwgdGltZXNwYW4sIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==