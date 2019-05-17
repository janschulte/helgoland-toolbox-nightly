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
    function DatasetService() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2Fic3RyYWN0LXNlcnZpY2VzL2RhdGFzZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7Ozs7O0FBQUE7OzBCQUVrQyxFQUFFOzhCQUVRLElBQUksR0FBRyxFQUFFOzs7Ozs7O0lBRTFDLG1DQUFVOzs7OztjQUFDLFVBQWtCLEVBQUUsT0FBVztRQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2hEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFDbEMsSUFBTSxNQUFJLEdBQUcsbUJBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFxQixFQUFDLENBQUM7WUFDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLE1BQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQVosQ0FBWSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCOzs7OztJQUdFLDBDQUFpQjs7OztRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7OztJQUdkLHNDQUFhOzs7O2NBQUMsVUFBa0I7O1FBQ25DLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7OztJQUdkLG9DQUFXOzs7O1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7OztJQUcvQiw2Q0FBb0I7Ozs7O2NBQUMsT0FBVSxFQUFFLFVBQWtCO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O3lCQTdDekI7SUFzREMsQ0FBQTs7Ozs7O0FBcERELDBCQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFzZXRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvb3B0aW9ucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhc2V0U2VydmljZTxUIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMgfCBEYXRhc2V0T3B0aW9uc1tdPiB7XG5cbiAgICBwdWJsaWMgZGF0YXNldElkczogc3RyaW5nW10gPSBbXTtcblxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgVD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgYWRkRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM/OiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5wdXNoKGludGVybmFsSWQpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgdGhpcy5jcmVhdGVTdHlsZXMoaW50ZXJuYWxJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSAodGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaW50ZXJuYWxJZCkgYXMgRGF0YXNldE9wdGlvbnNbXSk7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKGUpID0+IHRlbXAucHVzaChlKSk7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFsbERhdGFzZXRzKCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5jbGVhcigpO1xuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRhc2V0SWR4ID0gdGhpcy5kYXRhc2V0SWRzLmluZGV4T2YoaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChkYXRhc2V0SWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5zcGxpY2UoZGF0YXNldElkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNEYXRhc2V0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldElkcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVEYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBULCBpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVN0eWxlcyhpbnRlcm5hbElkOiBzdHJpbmcpOiBUO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNhdmVTdGF0ZSgpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGxvYWRTdGF0ZSgpOiB2b2lkO1xuXG59XG4iXX0=