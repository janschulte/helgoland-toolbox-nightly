/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DatasetImplApiInterface = /** @class */ (function (_super) {
    tslib_1.__extends(DatasetImplApiInterface, _super);
    function DatasetImplApiInterface(httpservice, internalDatasetId, translate) {
        var _this = _super.call(this, httpservice, translate) || this;
        _this.httpservice = httpservice;
        _this.internalDatasetId = internalDatasetId;
        _this.translate = translate;
        return _this;
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getServices = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'services');
        if (params) {
            params.expanded = true;
        }
        else {
            params = { expanded: true };
        }
        return this.requestApi(url, params, options).pipe(map(function (result) {
            result.forEach(function (entry) { return entry.apiUrl = apiUrl; });
            return result;
        }));
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getService = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'services', id);
        return this.requestApi(url, params, options).pipe(map(function (result) {
            result.apiUrl = apiUrl;
            return result;
        }));
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getStations = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'stations');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getStation = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'stations', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTimeseries = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries');
        return new Observable(function (observer) {
            _this.requestApiTexted(url, params, options).subscribe(function (result) {
                /** @type {?} */
                var timeseriesList = deserializeArray(Timeseries, result);
                timeseriesList.forEach(function (entry) {
                    entry.url = apiUrl;
                    _this.internalDatasetId.generateInternalId(entry);
                });
                observer.next(timeseriesList);
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    /**
     * @param {?} apiUrl
     * @param {?} ids
     * @param {?} timespan
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTimeseriesData = /**
     * @param {?} apiUrl
     * @param {?} ids
     * @param {?} timespan
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, ids, timespan, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries/getData');
        return new Observable(function (observer) {
            _this.requestApiTextedPost(url, {
                timespan: _this.createRequestTimespan(timespan),
                timeseries: ids
            }, options).subscribe(function (result) {
                /** @type {?} */
                var timeseriesList = [];
                for (var id in result) {
                    if (id) {
                        timeseriesList.push({
                            id: id,
                            url: apiUrl,
                            data: result[id].values
                        });
                    }
                }
                observer.next(timeseriesList);
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getSingleTimeseries = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    function (id, apiUrl, params) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries', id);
        return this.requestApiTexted(url, params).pipe(map(function (result) {
            /** @type {?} */
            var timeseries = deserialize(Timeseries, result);
            timeseries.url = apiUrl;
            _this.internalDatasetId.generateInternalId(timeseries);
            return timeseries;
        }));
    };
    /**
     * @param {?} internalId
     * @param {?=} params
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getSingleTimeseriesByInternalId = /**
     * @param {?} internalId
     * @param {?=} params
     * @return {?}
     */
    function (internalId, params) {
        /** @type {?} */
        var resolvedId = this.internalDatasetId.resolveInternalId(internalId);
        return this.getSingleTimeseries(resolvedId.id, resolvedId.url, params);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTimeseriesExtras = /**
     * @param {?} id
     * @param {?} apiUrl
     * @return {?}
     */
    function (id, apiUrl) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries', id);
        return this.requestApi(url + '/extras');
    };
    /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTsData = /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, timespan, params, options) {
        if (params === void 0) { params = {}; }
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries', id) + '/getData';
        params.timespan = this.createRequestTimespan(timespan);
        return this.requestApi(url, params, options).pipe(map(function (res) {
            if (params.expanded) {
                res = res[id];
            }
            return res;
        }));
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getCategories = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'categories');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getCategory = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    function (id, apiUrl, params) {
        // const url = this.createRequestUrl(apiUrl, 'categories', id);
        throw new Error('Not implemented');
        // return this.requestApi(url, params)
        //     .map(this.extractData);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPhenomena = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'phenomena');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPhenomenon = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'phenomena', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getOfferings = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'offerings');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getOffering = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'offerings', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getFeatures = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'features');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getFeature = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'features', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getProcedures = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'procedures');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getProcedure = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'procedures', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPlatforms = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'platforms');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPlatform = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'platforms', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getDatasets = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'datasets');
        return this.requestApi(url, params, options).pipe(map(function (list) { return list.map(function (entry) { return _this.prepareDataset(entry, apiUrl); }); }));
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getDataset = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'datasets', id);
        return this.requestApi(url, params, options).pipe(map(function (res) { return _this.prepareDataset(res, apiUrl); }));
    };
    /**
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getDatasetByInternalId = /**
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (internalId, params, options) {
        /** @type {?} */
        var resolvedId = this.internalDatasetId.resolveInternalId(internalId);
        return this.getDataset(resolvedId.id, resolvedId.url, params, options);
    };
    /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getData = /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, timespan, params, options) {
        if (params === void 0) { params = {}; }
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'datasets', id) + '/data';
        params.timespan = this.createRequestTimespan(timespan);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.requestApiTexted = /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return this.httpservice.client(options).get(url, {
            params: this.prepareParams(params),
            responseType: 'text'
        });
    };
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.requestApiTextedPost = /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return this.httpservice.client().post(url, params, {
            responseType: 'json'
        });
    };
    /**
     * @param {?} datasetObj
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetImplApiInterface.prototype.prepareDataset = /**
     * @param {?} datasetObj
     * @param {?} apiUrl
     * @return {?}
     */
    function (datasetObj, apiUrl) {
        /** @type {?} */
        var dataset = deserialize(Dataset, JSON.stringify(datasetObj));
        dataset.url = apiUrl;
        this.internalDatasetId.generateInternalId(dataset);
        if (dataset.seriesParameters) {
            dataset.parameters = dataset.seriesParameters;
            delete dataset.seriesParameters;
        }
        return dataset;
    };
    DatasetImplApiInterface.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DatasetImplApiInterface.ctorParameters = function () { return [
        { type: HttpService },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    return DatasetImplApiInterface;
}(DatasetApiInterface));
export { DatasetImplApiInterface };
if (false) {
    /** @type {?} */
    DatasetImplApiInterface.prototype.httpservice;
    /** @type {?} */
    DatasetImplApiInterface.prototype.internalDatasetId;
    /** @type {?} */
    DatasetImplApiInterface.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1pbXBsLWFwaS1pbnRlcmZhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LWFwaS9kYXRhc2V0LWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlyQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBb0MsTUFBTSw4QkFBOEIsQ0FBQztBQVVyRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0lBR3JCLG1EQUFtQjtJQUU1RCxpQ0FDYyxXQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsU0FBMkI7UUFIekMsWUFLSSxrQkFBTSxXQUFXLEVBQUUsU0FBUyxDQUFDLFNBQ2hDO1FBTGEsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFTLEdBQVQsU0FBUyxDQUFrQjs7S0FHeEM7Ozs7Ozs7SUFFTSw2Q0FBVzs7Ozs7O2NBQUMsTUFBYyxFQUFFLE1BQXdCLEVBQUUsT0FBNEI7O1FBQ3JGLElBQU0sR0FBRyxHQUFHLElBQUks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dEQsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFVLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsT0FBTyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDM0IsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7WUFDOUMsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7U0FDbkM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Z0JBM1J0QixVQUFVOzs7O2dCQUhGLFdBQVc7Z0JBQ1gsaUJBQWlCO2dCQW5CakIsZ0JBQWdCOztrQ0FIekI7RUF5QjZDLG1CQUFtQjtTQUFuRCx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IGRlc2VyaWFsaXplLCBkZXNlcmlhbGl6ZUFycmF5IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9jYXRlZ29yeSc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBUaW1lc2VyaWVzLCBUaW1lc2VyaWVzRGF0YSwgVGltZXNlcmllc0V4dHJhcyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2ZlYXR1cmUnO1xuaW1wb3J0IHsgT2ZmZXJpbmcgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9vZmZlcmluZyc7XG5pbXBvcnQgeyBQaGVub21lbm9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcGhlbm9tZW5vbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3BsYXRmb3JtJztcbmltcG9ydCB7IFByb2NlZHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3Byb2NlZHVyZSc7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbic7XG5pbXBvcnQgeyBEYXRhUGFyYW1ldGVyRmlsdGVyLCBIdHRwUmVxdWVzdE9wdGlvbnMsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJy4vYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnLi9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YXNldEltcGxBcGlJbnRlcmZhY2UgZXh0ZW5kcyBEYXRhc2V0QXBpSW50ZXJmYWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cHNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxEYXRhc2V0SWQ6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGh0dHBzZXJ2aWNlLCB0cmFuc2xhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXJ2aWNlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3NlcnZpY2VzJyk7XG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7IGV4cGFuZGVkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTZXJ2aWNlW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LmFwaVVybCA9IGFwaVVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VydmljZShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8U2VydmljZT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc2VydmljZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U2VydmljZT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hcGlVcmwgPSBhcGlVcmw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3RhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3RhdGlvbltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzdGF0aW9ucycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFN0YXRpb25bXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdGF0aW9uKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxTdGF0aW9uPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzdGF0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdGF0aW9uPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVzZXJpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllc1tdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzJyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUaW1lc2VyaWVzW10+KChvYnNlcnZlcjogT2JzZXJ2ZXI8VGltZXNlcmllc1tdPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QXBpVGV4dGVkKHVybCwgcGFyYW1zLCBvcHRpb25zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lc2VyaWVzTGlzdCA9IGRlc2VyaWFsaXplQXJyYXk8VGltZXNlcmllcz4oVGltZXNlcmllcywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZXNlcmllc0xpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnVybCA9IGFwaVVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQuZ2VuZXJhdGVJbnRlcm5hbElkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGltZXNlcmllc0xpc3QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiBvYnNlcnZlci5lcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgKCkgPT4gb2JzZXJ2ZXIuY29tcGxldGUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVzZXJpZXNEYXRhKGFwaVVybDogc3RyaW5nLCBpZHM6IHN0cmluZ1tdLCB0aW1lc3BhbjogVGltZXNwYW4sIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNEYXRhW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMvZ2V0RGF0YScpO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8VGltZXNlcmllc0RhdGFbXT4oKG9ic2VydmVyOiBPYnNlcnZlcjxPYmplY3Q+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RBcGlUZXh0ZWRQb3N0KHVybCwge1xuICAgICAgICAgICAgICAgIHRpbWVzcGFuOiB0aGlzLmNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbiksXG4gICAgICAgICAgICAgICAgdGltZXNlcmllczogaWRzXG4gICAgICAgICAgICB9LCBvcHRpb25zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lc2VyaWVzTGlzdDogVGltZXNlcmllc0RhdGFbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXNlcmllc0xpc3QucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRbaWRdLnZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRpbWVzZXJpZXNMaXN0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IG9ic2VydmVyLmNvbXBsZXRlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaW5nbGVUaW1lc2VyaWVzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGlUZXh0ZWQodXJsLCBwYXJhbXMpLnBpcGUobWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzZXJpZXMgPSBkZXNlcmlhbGl6ZTxUaW1lc2VyaWVzPihUaW1lc2VyaWVzLCByZXN1bHQpO1xuICAgICAgICAgICAgdGltZXNlcmllcy51cmwgPSBhcGlVcmw7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsRGF0YXNldElkLmdlbmVyYXRlSW50ZXJuYWxJZCh0aW1lc2VyaWVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aW1lc2VyaWVzO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRJZCA9IHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQucmVzb2x2ZUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpbmdsZVRpbWVzZXJpZXMocmVzb2x2ZWRJZC5pZCwgcmVzb2x2ZWRJZC51cmwsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVzZXJpZXNFeHRyYXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNFeHRyYXM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8VGltZXNlcmllc0V4dHJhcz4odXJsICsgJy9leHRyYXMnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHNEYXRhPFQ+KFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgdGltZXNwYW46IFRpbWVzcGFuLFxuICAgICAgICBwYXJhbXM6IERhdGFQYXJhbWV0ZXJGaWx0ZXIgPSB7fSxcbiAgICAgICAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzJywgaWQpICsgJy9nZXREYXRhJztcbiAgICAgICAgcGFyYW1zLnRpbWVzcGFuID0gdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGE8VD4+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZXhwYW5kZWQpIHsgcmVzID0gcmVzW2lkXTsgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhdGVnb3JpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Q2F0ZWdvcnlbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnY2F0ZWdvcmllcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPENhdGVnb3J5W10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcnkoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcik6IE9ic2VydmFibGU8Q2F0ZWdvcnk+IHtcbiAgICAgICAgLy8gY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2NhdGVnb3JpZXMnLCBpZCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLnJlcXVlc3RBcGkodXJsLCBwYXJhbXMpXG4gICAgICAgIC8vICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQaGVub21lbmEoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGhlbm9tZW5vbltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwaGVub21lbmEnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQaGVub21lbm9uW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGhlbm9tZW5vbihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8UGhlbm9tZW5vbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncGhlbm9tZW5hJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFBoZW5vbWVub24+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T2ZmZXJpbmdzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ29mZmVyaW5ncycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPE9mZmVyaW5nW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T2ZmZXJpbmcoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPE9mZmVyaW5nPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdvZmZlcmluZ3MnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8T2ZmZXJpbmc+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RmVhdHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdmZWF0dXJlcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPEZlYXR1cmVbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGZWF0dXJlKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdmZWF0dXJlcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxGZWF0dXJlPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2NlZHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3Byb2NlZHVyZXMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQcm9jZWR1cmVbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9jZWR1cmUoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFByb2NlZHVyZT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncHJvY2VkdXJlcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQcm9jZWR1cmU+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxhdGZvcm1zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBsYXRmb3JtW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3BsYXRmb3JtcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFBsYXRmb3JtW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxhdGZvcm0oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFBsYXRmb3JtPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwbGF0Zm9ybXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UGxhdGZvcm0+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YXNldHMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldFtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdkYXRhc2V0cycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGFzZXRbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGxpc3QpID0+IGxpc3QubWFwKChlbnRyeSkgPT4gdGhpcy5wcmVwYXJlRGF0YXNldChlbnRyeSwgYXBpVXJsKSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGFzZXQoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldD4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZGF0YXNldHMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RGF0YXNldD4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlcykgPT4gdGhpcy5wcmVwYXJlRGF0YXNldChyZXMsIGFwaVVybCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXQ+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRJZCA9IHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQucmVzb2x2ZUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGFzZXQocmVzb2x2ZWRJZC5pZCwgcmVzb2x2ZWRJZC51cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGE8VD4oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICB0aW1lc3BhbjogVGltZXNwYW4sXG4gICAgICAgIHBhcmFtczogRGF0YVBhcmFtZXRlckZpbHRlciA9IHt9LFxuICAgICAgICBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPERhdGE8VD4+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2RhdGFzZXRzJywgaWQpICsgJy9kYXRhJztcbiAgICAgICAgcGFyYW1zLnRpbWVzcGFuID0gdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGE8VD4+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgZ2V0R2VvbWV0cmllcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPyk6IE9ic2VydmFibGU8PiB7XG4gICAgLy8gICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4pOiBzdHJpbmcge1xuICAgIC8vICAgICByZXR1cm4gZW5jb2RlVVJJKG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5mb3JtYXQoKSArICcvJyArIG1vbWVudCh0aW1lc3Bhbi50bykuZm9ybWF0KCkpO1xuICAgIC8vIH1cblxuICAgIHByaXZhdGUgcmVxdWVzdEFwaVRleHRlZCh1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwc2VydmljZS5jbGllbnQob3B0aW9ucykuZ2V0KHVybCwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnByZXBhcmVQYXJhbXMocGFyYW1zKSxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVxdWVzdEFwaVRleHRlZFBvc3QodXJsOiBzdHJpbmcsIHBhcmFtczogUGFyYW1ldGVyRmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cHNlcnZpY2UuY2xpZW50KCkucG9zdCh1cmwsIHBhcmFtcywge1xuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbidcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YXNldChkYXRhc2V0T2JqOiBEYXRhc2V0LCBhcGlVcmw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZGVzZXJpYWxpemU8RGF0YXNldD4oRGF0YXNldCwgSlNPTi5zdHJpbmdpZnkoZGF0YXNldE9iaikpO1xuICAgICAgICBkYXRhc2V0LnVybCA9IGFwaVVybDtcbiAgICAgICAgdGhpcy5pbnRlcm5hbERhdGFzZXRJZC5nZW5lcmF0ZUludGVybmFsSWQoZGF0YXNldCk7XG4gICAgICAgIGlmIChkYXRhc2V0LnNlcmllc1BhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIGRhdGFzZXQucGFyYW1ldGVycyA9IGRhdGFzZXQuc2VyaWVzUGFyYW1ldGVycztcbiAgICAgICAgICAgIGRlbGV0ZSBkYXRhc2V0LnNlcmllc1BhcmFtZXRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfVxufVxuIl19