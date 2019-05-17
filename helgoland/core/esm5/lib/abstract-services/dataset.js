/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var 
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
DatasetService = /** @class */ (function () {
    function DatasetService(localStorage) {
        this.localStorage = localStorage;
        this.datasetIds = [];
        this.datasetOptions = new Map();
    }
    /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    DatasetService.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    function (internalId, options) {
        if (this.datasetIds.indexOf(internalId) < 0) {
            this.datasetIds.push(internalId);
            if (options) {
                this.datasetOptions.set(internalId, options);
            }
            else {
                this.datasetOptions.set(internalId, this.createStyles(internalId));
            }
            this.saveState();
        }
        else if (options instanceof Array) {
            /** @type {?} */
            var temp_1 = (/** @type {?} */ (this.datasetOptions.get(internalId)));
            options.forEach(function (e) { return temp_1.push(e); });
            this.saveState();
        }
    };
    /**
     * @return {?}
     */
    DatasetService.prototype.removeAllDatasets = /**
     * @return {?}
     */
    function () {
        this.datasetIds.length = 0;
        this.datasetOptions.clear();
        this.saveState();
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetService.prototype.removeDataset = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var datasetIdx = this.datasetIds.indexOf(internalId);
        if (datasetIdx > -1) {
            this.datasetIds.splice(datasetIdx, 1);
            this.datasetOptions.delete(internalId);
        }
        this.saveState();
    };
    /**
     * @return {?}
     */
    DatasetService.prototype.hasDatasets = /**
     * @return {?}
     */
    function () {
        return this.datasetIds.length > 0;
    };
    /**
     * @param {?} options
     * @param {?} internalId
     * @return {?}
     */
    DatasetService.prototype.updateDatasetOptions = /**
     * @param {?} options
     * @param {?} internalId
     * @return {?}
     */
    function (options, internalId) {
        this.datasetOptions.set(internalId, options);
        this.saveState();
    };
    return DatasetService;
}());
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
export { DatasetService };
if (false) {
    /** @type {?} */
    DatasetService.prototype.datasetIds;
    /** @type {?} */
    DatasetService.prototype.datasetOptions;
    /** @type {?} */
    DatasetService.prototype.localStorage;
    /**
     * @abstract
     * @param {?} internalId
     * @return {?}
     */
    DatasetService.prototype.createStyles = function (internalId) { };
    /**
     * @abstract
     * @return {?}
     */
    DatasetService.prototype.saveState = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DatasetService.prototype.loadState = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1zZXJ2aWNlcy9kYXRhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7Ozs7QUFBQTtJQU1JLHdCQUNjLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjOzBCQUxWLEVBQUU7OEJBRVEsSUFBSSxHQUFHLEVBQUU7S0FJNUM7Ozs7OztJQUVFLG1DQUFVOzs7OztjQUFDLFVBQWtCLEVBQUUsT0FBVztRQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2hEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFDbEMsSUFBTSxNQUFJLEdBQUcsbUJBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFxQixFQUFDLENBQUM7WUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLE1BQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQVosQ0FBWSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCOzs7OztJQUdFLDBDQUFpQjs7OztRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7OztJQUdkLHNDQUFhOzs7O2NBQUMsVUFBa0I7O1FBQ25DLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7OztJQUdkLG9DQUFXOzs7O1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7OztJQUcvQiw2Q0FBb0I7Ozs7O2NBQUMsT0FBVSxFQUFFLFVBQWtCO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O3lCQWxEekI7SUEyREMsQ0FBQTs7Ozs7O0FBeERELDBCQXdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4uL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFzZXRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvb3B0aW9ucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhc2V0U2VydmljZTxUIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMgfCBEYXRhc2V0T3B0aW9uc1tdPiB7XG5cbiAgICBwdWJsaWMgZGF0YXNldElkczogc3RyaW5nW10gPSBbXTtcblxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgVD4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZTogTG9jYWxTdG9yYWdlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9ucz86IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldElkcy5pbmRleE9mKGludGVybmFsSWQpIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnB1c2goaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2V0KGludGVybmFsSWQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCB0aGlzLmNyZWF0ZVN0eWxlcyhpbnRlcm5hbElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9ICh0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpbnRlcm5hbElkKSBhcyBEYXRhc2V0T3B0aW9uc1tdKTtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4gdGVtcC5wdXNoKGUpKTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWxsRGF0YXNldHMoKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldElkcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRJZHggPSB0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGRhdGFzZXRJZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnNwbGljZShkYXRhc2V0SWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc0RhdGFzZXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0SWRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFQsIGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlU3R5bGVzKGludGVybmFsSWQ6IHN0cmluZyk6IFQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2F2ZVN0YXRlKCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbG9hZFN0YXRlKCk6IHZvaWQ7XG5cbn1cbiJdfQ==