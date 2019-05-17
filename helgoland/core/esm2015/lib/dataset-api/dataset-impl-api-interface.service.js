/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { deserialize, deserializeArray } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dataset, Timeseries } from '../model/dataset-api/dataset';
import { DatasetApiInterface } from './api-interface';
import { HttpService } from './http.service';
import { InternalIdHandler } from './internal-id-handler.service';
export class DatasetImplApiInterface extends DatasetApiInterface {
    /**
     * @param {?} httpservice
     * @param {?} internalDatasetId
     * @param {?} translate
     */
    constructor(httpservice, internalDatasetId, translate) {
        super(httpservice, translate);
        this.httpservice = httpservice;
        this.internalDatasetId = internalDatasetId;
        this.translate = translate;
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getServices(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'services');
        if (params) {
            params.expanded = true;
        }
        else {
            params = { expanded: true };
        }
        return this.requestApi(url, params, options).pipe(map((result) => {
            result.forEach((entry) => entry.apiUrl = apiUrl);
            return result;
        }));
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getService(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'services', id);
        return this.requestApi(url, params, options).pipe(map((result) => {
            result.apiUrl = apiUrl;
            return result;
        }));
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getStations(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'stations');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getStation(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'stations', id);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getTimeseries(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'timeseries');
        return new Observable((observer) => {
            this.requestApiTexted(url, params, options).subscribe((result) => {
                /** @type {?} */
                const timeseriesList = deserializeArray(Timeseries, result);
                timeseriesList.forEach((entry) => {
                    entry.url = apiUrl;
                    this.internalDatasetId.generateInternalId(entry);
                });
                observer.next(timeseriesList);
            }, (error) => observer.error(error), () => observer.complete());
        });
    }
    /**
     * @param {?} apiUrl
     * @param {?} ids
     * @param {?} timespan
     * @param {?=} options
     * @return {?}
     */
    getTimeseriesData(apiUrl, ids, timespan, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'timeseries/getData');
        return new Observable((observer) => {
            this.requestApiTextedPost(url, {
                timespan: this.createRequestTimespan(timespan),
                timeseries: ids
            }, options).subscribe((result) => {
                /** @type {?} */
                const timeseriesList = [];
                for (const id in result) {
                    if (id) {
                        timeseriesList.push({
                            id: id,
                            url: apiUrl,
                            data: result[id].values
                        });
                    }
                }
                observer.next(timeseriesList);
            }, (error) => observer.error(error), () => observer.complete());
        });
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    getSingleTimeseries(id, apiUrl, params) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'timeseries', id);
        return this.requestApiTexted(url, params).pipe(map((result) => {
            /** @type {?} */
            const timeseries = deserialize(Timeseries, result);
            timeseries.url = apiUrl;
            this.internalDatasetId.generateInternalId(timeseries);
            return timeseries;
        }));
    }
    /**
     * @param {?} internalId
     * @param {?=} params
     * @return {?}
     */
    getSingleTimeseriesByInternalId(internalId, params) {
        /** @type {?} */
        const resolvedId = this.internalDatasetId.resolveInternalId(internalId);
        return this.getSingleTimeseries(resolvedId.id, resolvedId.url, params);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @return {?}
     */
    getTimeseriesExtras(id, apiUrl) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'timeseries', id);
        return this.requestApi(url + '/extras');
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
        const url = this.createRequestUrl(apiUrl, 'timeseries', id) + '/getData';
        params.timespan = this.createRequestTimespan(timespan);
        return this.requestApi(url, params, options).pipe(map((res) => {
            if (params.expanded) {
                res = res[id];
            }
            return res;
        }));
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getCategories(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'categories');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    getCategory(id, apiUrl, params) {
        // const url = this.createRequestUrl(apiUrl, 'categories', id);
        throw new Error('Not implemented');
        // return this.requestApi(url, params)
        //     .map(this.extractData);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getPhenomena(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'phenomena');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getPhenomenon(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'phenomena', id);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getOfferings(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'offerings');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getOffering(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'offerings', id);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getFeatures(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'features');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getFeature(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'features', id);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getProcedures(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'procedures');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getProcedure(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'procedures', id);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getPlatforms(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'platforms');
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getPlatform(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'platforms', id);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getDatasets(apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'datasets');
        return this.requestApi(url, params, options).pipe(map((list) => list.map((entry) => this.prepareDataset(entry, apiUrl))));
    }
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getDataset(id, apiUrl, params, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'datasets', id);
        return this.requestApi(url, params, options).pipe(map((res) => this.prepareDataset(res, apiUrl)));
    }
    /**
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    getDatasetByInternalId(internalId, params, options) {
        /** @type {?} */
        const resolvedId = this.internalDatasetId.resolveInternalId(internalId);
        return this.getDataset(resolvedId.id, resolvedId.url, params, options);
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
    getData(id, apiUrl, timespan, params = {}, options) {
        /** @type {?} */
        const url = this.createRequestUrl(apiUrl, 'datasets', id) + '/data';
        params.timespan = this.createRequestTimespan(timespan);
        return this.requestApi(url, params, options);
    }
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    requestApiTexted(url, params = {}, options = {}) {
        return this.httpservice.client(options).get(url, {
            params: this.prepareParams(params),
            responseType: 'text'
        });
    }
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    requestApiTextedPost(url, params = {}, options = {}) {
        return this.httpservice.client().post(url, params, {
            responseType: 'json'
        });
    }
    /**
     * @param {?} datasetObj
     * @param {?} apiUrl
     * @return {?}
     */
    prepareDataset(datasetObj, apiUrl) {
        /** @type {?} */
        const dataset = deserialize(Dataset, JSON.stringify(datasetObj));
        dataset.url = apiUrl;
        this.internalDatasetId.generateInternalId(dataset);
        if (dataset.seriesParameters) {
            dataset.parameters = dataset.seriesParameters;
            delete dataset.seriesParameters;
        }
        return dataset;
    }
}
DatasetImplApiInterface.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DatasetImplApiInterface.ctorParameters = () => [
    { type: HttpService },
    { type: InternalIdHandler },
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    DatasetImplApiInterface.prototype.httpservice;
    /** @type {?} */
    DatasetImplApiInterface.prototype.internalDatasetId;
    /** @type {?} */
    DatasetImplApiInterface.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1pbXBsLWFwaS1pbnRlcmZhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9kYXRhc2V0LWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFvQyxNQUFNLDhCQUE4QixDQUFDO0FBVXJHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUdsRSxNQUFNLDhCQUErQixTQUFRLG1CQUFtQjs7Ozs7O0lBRTVELFlBQ2MsV0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLFNBQTJCO1FBRXJDLEtBQUssQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFKcEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtLQUd4Qzs7Ozs7OztJQUVNLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBd0IsRUFBRSxPQUE0Qjs7UUFDckYsTUFBTSxHQUFH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QUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1lBQzlDLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDO1NBQ25DO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7OztZQTNSdEIsVUFBVTs7OztZQUhGLFdBQVc7WUFDWCxpQkFBaUI7WUFuQmpCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgZGVzZXJpYWxpemUsIGRlc2VyaWFsaXplQXJyYXkgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2NhdGVnb3J5JztcbmltcG9ydCB7IERhdGEgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhJztcbmltcG9ydCB7IERhdGFzZXQsIFRpbWVzZXJpZXMsIFRpbWVzZXJpZXNEYXRhLCBUaW1lc2VyaWVzRXh0cmFzIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YXNldCc7XG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZmVhdHVyZSc7XG5pbXBvcnQgeyBPZmZlcmluZyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL29mZmVyaW5nJztcbmltcG9ydCB7IFBoZW5vbWVub24gfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9waGVub21lbm9uJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcGxhdGZvcm0nO1xuaW1wb3J0IHsgUHJvY2VkdXJlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcHJvY2VkdXJlJztcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRpb24gfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9zdGF0aW9uJztcbmltcG9ydCB7IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIEh0dHBSZXF1ZXN0T3B0aW9ucywgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvaHR0cC1yZXF1ZXN0cyc7XG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlIH0gZnJvbSAnLi9hcGktaW50ZXJmYWNlJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW50ZXJuYWxJZEhhbmRsZXIgfSBmcm9tICcuL2ludGVybmFsLWlkLWhhbmRsZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhc2V0SW1wbEFwaUludGVyZmFjZSBleHRlbmRzIERhdGFzZXRBcGlJbnRlcmZhY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBodHRwc2VydmljZTogSHR0cFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbERhdGFzZXRJZDogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaHR0cHNlcnZpY2UsIHRyYW5zbGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlcnZpY2VzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFNlcnZpY2VbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc2VydmljZXMnKTtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgcGFyYW1zLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHsgZXhwYW5kZWQ6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFNlcnZpY2VbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkuYXBpVXJsID0gYXBpVXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXJ2aWNlKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxTZXJ2aWNlPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzZXJ2aWNlcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTZXJ2aWNlPih1cmwsIHBhcmFtcywgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFwaVVybCA9IGFwaVVybDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdGF0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdGF0aW9uW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3N0YXRpb25zJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U3RhdGlvbltdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN0YXRpb24oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFN0YXRpb24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3N0YXRpb25zJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFN0YXRpb24+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZXNlcmllcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFRpbWVzZXJpZXNbXT4oKG9ic2VydmVyOiBPYnNlcnZlcjxUaW1lc2VyaWVzW10+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RBcGlUZXh0ZWQodXJsLCBwYXJhbXMsIG9wdGlvbnMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzZXJpZXNMaXN0ID0gZGVzZXJpYWxpemVBcnJheTxUaW1lc2VyaWVzPihUaW1lc2VyaWVzLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lc2VyaWVzTGlzdC5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkudXJsID0gYXBpVXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5hbERhdGFzZXRJZC5nZW5lcmF0ZUludGVybmFsSWQoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aW1lc2VyaWVzTGlzdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICAoKSA9PiBvYnNlcnZlci5jb21wbGV0ZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZXNlcmllc0RhdGEoYXBpVXJsOiBzdHJpbmcsIGlkczogc3RyaW5nW10sIHRpbWVzcGFuOiBUaW1lc3Bhbiwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllc0RhdGFbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAndGltZXNlcmllcy9nZXREYXRhJyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUaW1lc2VyaWVzRGF0YVtdPigob2JzZXJ2ZXI6IE9ic2VydmVyPE9iamVjdD4pID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEFwaVRleHRlZFBvc3QodXJsLCB7XG4gICAgICAgICAgICAgICAgdGltZXNwYW46IHRoaXMuY3JlYXRlUmVxdWVzdFRpbWVzcGFuKHRpbWVzcGFuKSxcbiAgICAgICAgICAgICAgICB0aW1lc2VyaWVzOiBpZHNcbiAgICAgICAgICAgIH0sIG9wdGlvbnMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzZXJpZXNMaXN0OiBUaW1lc2VyaWVzRGF0YVtdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaWQgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc2VyaWVzTGlzdC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdFtpZF0udmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGltZXNlcmllc0xpc3QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiBvYnNlcnZlci5lcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgKCkgPT4gb2JzZXJ2ZXIuY29tcGxldGUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNpbmdsZVRpbWVzZXJpZXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcik6IE9ic2VydmFibGU8VGltZXNlcmllcz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAndGltZXNlcmllcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaVRleHRlZCh1cmwsIHBhcmFtcykucGlwZShtYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZXNlcmllcyA9IGRlc2VyaWFsaXplPFRpbWVzZXJpZXM+KFRpbWVzZXJpZXMsIHJlc3VsdCk7XG4gICAgICAgICAgICB0aW1lc2VyaWVzLnVybCA9IGFwaVVybDtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQuZ2VuZXJhdGVJbnRlcm5hbElkKHRpbWVzZXJpZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzZXJpZXM7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2luZ2xlVGltZXNlcmllc0J5SW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcik6IE9ic2VydmFibGU8VGltZXNlcmllcz4ge1xuICAgICAgICBjb25zdCByZXNvbHZlZElkID0gdGhpcy5pbnRlcm5hbERhdGFzZXRJZC5yZXNvbHZlSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2luZ2xlVGltZXNlcmllcyhyZXNvbHZlZElkLmlkLCByZXNvbHZlZElkLnVybCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZXNlcmllc0V4dHJhcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8VGltZXNlcmllc0V4dHJhcz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAndGltZXNlcmllcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxUaW1lc2VyaWVzRXh0cmFzPih1cmwgKyAnL2V4dHJhcycpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUc0RhdGE8VD4oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICB0aW1lc3BhbjogVGltZXNwYW4sXG4gICAgICAgIHBhcmFtczogRGF0YVBhcmFtZXRlckZpbHRlciA9IHt9LFxuICAgICAgICBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPERhdGE8VD4+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMnLCBpZCkgKyAnL2dldERhdGEnO1xuICAgICAgICBwYXJhbXMudGltZXNwYW4gPSB0aGlzLmNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3Bhbik7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RGF0YTxUPj4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5leHBhbmRlZCkgeyByZXMgPSByZXNbaWRdOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcmllcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxDYXRlZ29yeVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdjYXRlZ29yaWVzJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8Q2F0ZWdvcnlbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDYXRlZ29yeShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyKTogT2JzZXJ2YWJsZTxDYXRlZ29yeT4ge1xuICAgICAgICAvLyBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnY2F0ZWdvcmllcycsIGlkKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMucmVxdWVzdEFwaSh1cmwsIHBhcmFtcylcbiAgICAgICAgLy8gICAgIC5tYXAodGhpcy5leHRyYWN0RGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBoZW5vbWVuYShhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQaGVub21lbm9uW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3BoZW5vbWVuYScpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFBoZW5vbWVub25bXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQaGVub21lbm9uKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxQaGVub21lbm9uPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwaGVub21lbmEnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UGhlbm9tZW5vbj4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPZmZlcmluZ3MoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8T2ZmZXJpbmdbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnb2ZmZXJpbmdzJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8T2ZmZXJpbmdbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPZmZlcmluZyhcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8T2ZmZXJpbmc+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ29mZmVyaW5ncycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxPZmZlcmluZz4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGZWF0dXJlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2ZlYXR1cmVzJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RmVhdHVyZVtdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZlYXR1cmUoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPEZlYXR1cmU+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2ZlYXR1cmVzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPEZlYXR1cmU+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvY2VkdXJlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQcm9jZWR1cmVbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncHJvY2VkdXJlcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFByb2NlZHVyZVtdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2NlZHVyZShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8UHJvY2VkdXJlPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwcm9jZWR1cmVzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFByb2NlZHVyZT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQbGF0Zm9ybXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGxhdGZvcm1bXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncGxhdGZvcm1zJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UGxhdGZvcm1bXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQbGF0Zm9ybShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8UGxhdGZvcm0+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3BsYXRmb3JtcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQbGF0Zm9ybT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhc2V0cyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhc2V0W10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2RhdGFzZXRzJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RGF0YXNldFtdPih1cmwsIHBhcmFtcywgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIG1hcCgobGlzdCkgPT4gbGlzdC5tYXAoKGVudHJ5KSA9PiB0aGlzLnByZXBhcmVEYXRhc2V0KGVudHJ5LCBhcGlVcmwpKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YXNldChpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhc2V0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdkYXRhc2V0cycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxEYXRhc2V0Pih1cmwsIHBhcmFtcywgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzKSA9PiB0aGlzLnByZXBhcmVEYXRhc2V0KHJlcywgYXBpVXJsKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YXNldEJ5SW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldD4ge1xuICAgICAgICBjb25zdCByZXNvbHZlZElkID0gdGhpcy5pbnRlcm5hbERhdGFzZXRJZC5yZXNvbHZlSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YXNldChyZXNvbHZlZElkLmlkLCByZXNvbHZlZElkLnVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YTxUPihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHRpbWVzcGFuOiBUaW1lc3BhbixcbiAgICAgICAgcGFyYW1zOiBEYXRhUGFyYW1ldGVyRmlsdGVyID0ge30sXG4gICAgICAgIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8RGF0YTxUPj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZGF0YXNldHMnLCBpZCkgKyAnL2RhdGEnO1xuICAgICAgICBwYXJhbXMudGltZXNwYW4gPSB0aGlzLmNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3Bhbik7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RGF0YTxUPj4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIHB1YmxpYyBnZXRHZW9tZXRyaWVzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/KTogT2JzZXJ2YWJsZTw+IHtcbiAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICAvLyB9XG5cbiAgICAvLyBwcm90ZWN0ZWQgY3JlYXRlUmVxdWVzdFRpbWVzcGFuKHRpbWVzcGFuOiBUaW1lc3Bhbik6IHN0cmluZyB7XG4gICAgLy8gICAgIHJldHVybiBlbmNvZGVVUkkobW9tZW50KHRpbWVzcGFuLmZyb20pLmZvcm1hdCgpICsgJy8nICsgbW9tZW50KHRpbWVzcGFuLnRvKS5mb3JtYXQoKSk7XG4gICAgLy8gfVxuXG4gICAgcHJpdmF0ZSByZXF1ZXN0QXBpVGV4dGVkKHVybDogc3RyaW5nLCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9LCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBzZXJ2aWNlLmNsaWVudChvcHRpb25zKS5nZXQodXJsLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMucHJlcGFyZVBhcmFtcyhwYXJhbXMpLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXF1ZXN0QXBpVGV4dGVkUG9zdCh1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwc2VydmljZS5jbGllbnQoKS5wb3N0KHVybCwgcGFyYW1zLCB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVEYXRhc2V0KGRhdGFzZXRPYmo6IERhdGFzZXQsIGFwaVVybDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBkZXNlcmlhbGl6ZTxEYXRhc2V0PihEYXRhc2V0LCBKU09OLnN0cmluZ2lmeShkYXRhc2V0T2JqKSk7XG4gICAgICAgIGRhdGFzZXQudXJsID0gYXBpVXJsO1xuICAgICAgICB0aGlzLmludGVybmFsRGF0YXNldElkLmdlbmVyYXRlSW50ZXJuYWxJZChkYXRhc2V0KTtcbiAgICAgICAgaWYgKGRhdGFzZXQuc2VyaWVzUGFyYW1ldGVycykge1xuICAgICAgICAgICAgZGF0YXNldC5wYXJhbWV0ZXJzID0gZGF0YXNldC5zZXJpZXNQYXJhbWV0ZXJzO1xuICAgICAgICAgICAgZGVsZXRlIGRhdGFzZXQuc2VyaWVzUGFyYW1ldGVycztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9XG59XG4iXX0=