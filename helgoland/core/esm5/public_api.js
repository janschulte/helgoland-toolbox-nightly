/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
* Public API Surface of core
*/
export { HelgolandCoreModule } from './lib/core.module';
export { ApiInterface } from './lib/abstract-services/api-interface';
export { DatasetService } from './lib/abstract-services/dataset.service';
export { RenderingHintsDatasetService } from './lib/abstract-services/rendering-hints-dataset.service';
export { ColorService } from './lib/color/color.service';
export { StatusIntervalResolverService } from './lib/dataset-api/helper/status-interval-resolver.service';
export { DatasetApiInterface, UriParameterCoder } from './lib/dataset-api/api-interface';
export { DatasetApiMapping, DatasetApiVersion } from './lib/dataset-api/api-mapping.service';
export { SplittedDataDatasetApiInterface } from './lib/dataset-api/splitted-data-api-interface.service';
export { DatasetImplApiInterface } from './lib/dataset-api/dataset-impl-api-interface.service';
export { InternalIdHandler } from './lib/dataset-api/internal-id-handler.service';
export { HTTP_SERVICE_INTERCEPTORS, HttpService } from './lib/dataset-api/http.service';
export { LanguageChangNotifier } from './lib/language/language-changer';
export { LocalSelectorComponent } from './lib/language/locale-selector';
export { LocalStorage } from './lib/local-storage/local-storage.service';
export { ReferenceValues } from './lib/model/dataset-api/data';
export { ParameterConstellation, FirstLastValue, ReferenceValue, DatasetParameterConstellation, Dataset, Timeseries, TimeseriesData } from './lib/model/dataset-api/dataset';
export { Station, TimeseriesCollection } from './lib/model/dataset-api/station';
export { PlatformTypes, ValueTypes, DatasetTypes } from './lib/model/dataset-api/enums';
export { Filter } from './lib/model/internal/filter';
export { TimeInterval, Timespan, BufferedTime } from './lib/model/internal/timeInterval';
export { DatasetOptions, ReferenceValueOption, TimedDatasetOptions } from './lib/model/internal/options';
export { IdCache } from './lib/model/internal/id-cache';
export { Mixin } from './lib/model/mixins/Mixin.decorator';
export { HasLoadableContent } from './lib/model/mixins/has-loadable-content';
export { NotifierService } from './lib/notifier/notifier.service';
export { DateProxyPipe } from './lib/pipes/dateproxy/dateproxy.pipe';
export { DatasetPresenterComponent } from './lib/presenting/dataset-presenter.component';
export { PresenterMessageType } from './lib/presenting/presenter-message-type';
export { SettingsService } from './lib/settings/settings.service';
export { StatusCheckService } from './lib/status-check/status-check.service';
export { DefinedTimespan, DefinedTimespanService } from './lib/time/defined-timespan.service';
export { Time } from './lib/time/time.service';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbInB1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLG9DQUFjLG1CQUFtQixDQUFDO0FBRWxDLDZCQUFjLHVDQUF1QyxDQUFDO0FBQ3RELCtCQUFjLHlDQUF5QyxDQUFDO0FBQ3hELDZDQUFjLHlEQUF5RCxDQUFDO0FBRXhFLDZCQUFjLDJCQUEyQixDQUFDO0FBSTFDLDhDQUFjLDJEQUEyRCxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQy9GLE9BQU8sRUFBcUIsaUJBQWlCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNyRyxPQUFPLEVBQ0gseUJBQXlCLEVBQ3pCLFdBQVcsRUFHZCxNQUFNLGdDQUFnQyxDQUFDO0FBR3hDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXhFLDZCQUFjLDJDQUEyQyxDQUFDO0FBRTFELGdDQUFjLDhCQUE4QixDQUFDO0FBQzdDLDJJQUFjLGlDQUFpQyxDQUFDO0FBR2hELDhDQUFjLGlDQUFpQyxDQUFDO0FBT2hELHdEQUFjLCtCQUErQixDQUFDO0FBRzlDLHVCQUFjLDZCQUE2QixDQUFDO0FBRTVDLHFEQUFjLG1DQUFtQyxDQUFDO0FBQ2xELDBFQUFjLDhCQUE4QixDQUFDO0FBQzdDLHdCQUFjLCtCQUErQixDQUFDO0FBQzlDLHNCQUFjLG9DQUFvQyxDQUFDO0FBQ25ELG1DQUFjLHlDQUF5QyxDQUFDO0FBR3hELGdDQUFjLGlDQUFpQyxDQUFDO0FBRWhELDhCQUFjLHNDQUFzQyxDQUFDO0FBRXJELDBDQUFjLDhDQUE4QyxDQUFDO0FBRTdELHFDQUFjLHlDQUF5QyxDQUFDO0FBR3hELGdDQUFjLGlDQUFpQyxDQUFDO0FBRWhELG1DQUFjLHlDQUF5QyxDQUFDO0FBRXhELHdEQUFjLHFDQUFxQyxDQUFDO0FBQ3BELHFCQUFjLHlCQUF5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiogUHVibGljIEFQSSBTdXJmYWNlIG9mIGNvcmVcbiovXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb3JlLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2Fic3RyYWN0LXNlcnZpY2VzL2FwaS1pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvYWJzdHJhY3Qtc2VydmljZXMvZGF0YXNldC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Fic3RyYWN0LXNlcnZpY2VzL3JlbmRlcmluZy1oaW50cy1kYXRhc2V0LnNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb2xvci9jb2xvci5zZXJ2aWNlJztcblxuZXhwb3J0IHsgRGF0YXNldEFwaVYxIH0gZnJvbSAnLi9saWIvZGF0YXNldC1hcGkvaW50ZXJmYWNlcy9hcGktdjEuaW50ZXJmYWNlJztcbmV4cG9ydCB7IERhdGFzZXRBcGlWMiB9IGZyb20gJy4vbGliL2RhdGFzZXQtYXBpL2ludGVyZmFjZXMvYXBpLXYyLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kYXRhc2V0LWFwaS9oZWxwZXIvc3RhdHVzLWludGVydmFsLXJlc29sdmVyLnNlcnZpY2UnO1xuZXhwb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSwgVXJpUGFyYW1ldGVyQ29kZXIgfSBmcm9tICcuL2xpYi9kYXRhc2V0LWFwaS9hcGktaW50ZXJmYWNlJztcbmV4cG9ydCB7IERhdGFzZXRBcGlNYXBwaW5nLCBEYXRhc2V0QXBpVmVyc2lvbiB9IGZyb20gJy4vbGliL2RhdGFzZXQtYXBpL2FwaS1tYXBwaW5nLnNlcnZpY2UnO1xuZXhwb3J0IHsgU3BsaXR0ZWREYXRhRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJy4vbGliL2RhdGFzZXQtYXBpL3NwbGl0dGVkLWRhdGEtYXBpLWludGVyZmFjZS5zZXJ2aWNlJztcbmV4cG9ydCB7IERhdGFzZXRJbXBsQXBpSW50ZXJmYWNlIH0gZnJvbSAnLi9saWIvZGF0YXNldC1hcGkvZGF0YXNldC1pbXBsLWFwaS1pbnRlcmZhY2Uuc2VydmljZSc7XG5leHBvcnQgeyBJbnRlcm5hbERhdGFzZXRJZCwgSW50ZXJuYWxJZEhhbmRsZXIgfSBmcm9tICcuL2xpYi9kYXRhc2V0LWFwaS9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuZXhwb3J0IHtcbiAgICBIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTLFxuICAgIEh0dHBTZXJ2aWNlLFxuICAgIEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3IsXG4gICAgSHR0cFNlcnZpY2VIYW5kbGVyXG59IGZyb20gJy4vbGliL2RhdGFzZXQtYXBpL2h0dHAuc2VydmljZSc7XG5cbmV4cG9ydCB7IExhbmd1YWdlIH0gZnJvbSAnLi9saWIvbGFuZ3VhZ2UvbW9kZWwvbGFuZ3VhZ2UnO1xuZXhwb3J0IHsgTGFuZ3VhZ2VDaGFuZ05vdGlmaWVyIH0gZnJvbSAnLi9saWIvbGFuZ3VhZ2UvbGFuZ3VhZ2UtY2hhbmdlcic7XG5leHBvcnQgeyBMb2NhbFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvbGFuZ3VhZ2UvbG9jYWxlLXNlbGVjdG9yJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvZGF0YXNldC1hcGkvcGFyYW1ldGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2RhdGFzZXQtYXBpL3NlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9wbGF0Zm9ybSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9waGVub21lbm9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2RhdGFzZXQtYXBpL3Byb2NlZHVyZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9vZmZlcmluZyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9mZWF0dXJlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2RhdGFzZXQtYXBpL2NhdGVnb3J5JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2RhdGFzZXQtYXBpL2VudW1zJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvaW50ZXJuYWwvcHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvaW50ZXJuYWwvZmlsdGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2ludGVybmFsL2RhdGFzZXQtdGFibGUtZGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvaW50ZXJuYWwvb3B0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9pbnRlcm5hbC9pZC1jYWNoZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9taXhpbnMvTWl4aW4uZGVjb3JhdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL21peGlucy9oYXMtbG9hZGFibGUtY29udGVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9zZXR0aW5ncy9zZXR0aW5ncyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL25vdGlmaWVyL25vdGlmaWVyLnNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9waXBlcy9kYXRlcHJveHkvZGF0ZXByb3h5LnBpcGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9wcmVzZW50aW5nL2RhdGFzZXQtcHJlc2VudGVyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9wcmVzZW50aW5nL3ByZXNlbnRlci1oaWdobGlnaHQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvcHJlc2VudGluZy9wcmVzZW50ZXItbWVzc2FnZS10eXBlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3ByZXNlbnRpbmcvcHJlc2VudGVyLW1lc3NhZ2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXR0aW5ncy9zZXR0aW5ncy5zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3RhdHVzLWNoZWNrL3N0YXR1cy1jaGVjay5zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvdGltZS9kZWZpbmVkLXRpbWVzcGFuLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvdGltZS90aW1lLnNlcnZpY2UnO1xuIl19