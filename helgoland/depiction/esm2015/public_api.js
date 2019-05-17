/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Public API Surface of depiction
 */
export { HelgolandDatasetlistModule } from './lib/datasetlist/module';
export { ProfileEntryComponent } from './lib/datasetlist/profile-entry/profile-entry.component';
export { ConfigurableTimeseriesEntryComponent } from './lib/datasetlist/timeseries/configurable-timeseries-entry/configurable-timeseries-entry.component';
export { FirstLatestTimeseriesEntryComponent } from './lib/datasetlist/timeseries/first-latest-timeseries-entry/first-latest-timeseries-entry.component';
export { SimpleTimeseriesEntryComponent } from './lib/datasetlist/timeseries/simple-timeseries-entry/simple-timeseries-entry.component';
export { ReferenceValueColorCache, TimeseriesEntryComponent } from './lib/datasetlist/timeseries/timeseries-entry/timeseries-entry.component';
export { TrajectoryEntryComponent } from './lib/datasetlist/trajectory-entry/trajectory-entry.component';
export { DatasetTableComponent } from './lib/dataset-table/dataset-table.component';
export { HelgolandDatasetTableModule } from './lib/dataset-table/module';
export { LabelMapperService } from './lib/label-mapper/label-mapper.service';
export { LabelMapperComponent } from './lib/label-mapper/label-mapper.component';
export { HelgolandLabelMapperModule } from './lib/label-mapper/label-mapper.module';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZGVwaWN0aW9uLyIsInNvdXJjZXMiOlsicHVibGljX2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsMkNBQWMsMEJBQTBCLENBQUM7QUFDekMsc0NBQWMseURBQXlELENBQUM7QUFDeEUscURBQWMsb0dBQW9HLENBQUM7QUFDbkgsb0RBQWMsb0dBQW9HLENBQUM7QUFDbkgsK0NBQWMsd0ZBQXdGLENBQUM7QUFDdkcsbUVBQWMsMEVBQTBFLENBQUM7QUFDekYseUNBQWMsK0RBQStELENBQUM7QUFFOUUsc0NBQWMsNkNBQTZDLENBQUM7QUFDNUQsNENBQWMsNEJBQTRCLENBQUM7QUFFM0MsbUNBQWMseUNBQXlDLENBQUM7QUFDeEQscUNBQWMsMkNBQTJDLENBQUM7QUFDMUQsMkNBQWMsd0NBQXdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGRlcGljdGlvblxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2RhdGFzZXRsaXN0L21vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kYXRhc2V0bGlzdC9wcm9maWxlLWVudHJ5L3Byb2ZpbGUtZW50cnkuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkvY29uZmlndXJhYmxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvZmlyc3QtbGF0ZXN0LXRpbWVzZXJpZXMtZW50cnkvZmlyc3QtbGF0ZXN0LXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvc2ltcGxlLXRpbWVzZXJpZXMtZW50cnkvc2ltcGxlLXRpbWVzZXJpZXMtZW50cnkuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RhdGFzZXRsaXN0L3RpbWVzZXJpZXMvdGltZXNlcmllcy1lbnRyeS90aW1lc2VyaWVzLWVudHJ5LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kYXRhc2V0bGlzdC90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50JztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZGF0YXNldC10YWJsZS9kYXRhc2V0LXRhYmxlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kYXRhc2V0LXRhYmxlL21vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2xhYmVsLW1hcHBlci9sYWJlbC1tYXBwZXIuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9sYWJlbC1tYXBwZXIvbGFiZWwtbWFwcGVyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9sYWJlbC1tYXBwZXIvbGFiZWwtbWFwcGVyLm1vZHVsZSc7XG4iXX0=