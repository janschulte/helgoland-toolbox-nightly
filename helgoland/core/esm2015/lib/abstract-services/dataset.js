/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
export class DatasetService {
    /**
     * @param {?} localStorage
     */
    constructor(localStorage) {
        this.localStorage = localStorage;
        this.datasetIds = [];
        this.datasetOptions = new Map();
    }
    /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    addDataset(internalId, options) {
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
            const temp = (/** @type {?} */ (this.datasetOptions.get(internalId)));
            options.forEach((e) => temp.push(e));
            this.saveState();
        }
    }
    /**
     * @return {?}
     */
    removeAllDatasets() {
        this.datasetIds.length = 0;
        this.datasetOptions.clear();
        this.saveState();
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeDataset(internalId) {
        /** @type {?} */
        const datasetIdx = this.datasetIds.indexOf(internalId);
        if (datasetIdx > -1) {
            this.datasetIds.splice(datasetIdx, 1);
            this.datasetOptions.delete(internalId);
        }
        this.saveState();
    }
    /**
     * @return {?}
     */
    hasDatasets() {
        return this.datasetIds.length > 0;
    }
    /**
     * @param {?} options
     * @param {?} internalId
     * @return {?}
     */
    updateDatasetOptions(options, internalId) {
        this.datasetOptions.set(internalId, options);
        this.saveState();
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1zZXJ2aWNlcy9kYXRhc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLE1BQU07Ozs7SUFNRixZQUNjLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjOzBCQUxWLEVBQUU7OEJBRVEsSUFBSSxHQUFHLEVBQUU7S0FJNUM7Ozs7OztJQUVFLFVBQVUsQ0FBQyxVQUFrQixFQUFFLE9BQVc7UUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNoRDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDdEU7WUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7O1lBQ2xDLE1BQU0sSUFBSSxHQUFHLG1CQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBcUIsRUFBQyxDQUFDO1lBQ3ZFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7Ozs7O0lBR0UsaUJBQWlCO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7O0lBR2QsYUFBYSxDQUFDLFVBQWtCOztRQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7SUFHZCxXQUFXO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7OztJQUcvQixvQkFBb0IsQ0FBQyxPQUFVLEVBQUUsVUFBa0I7UUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Q0FTeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICcuLi9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL29wdGlvbnMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YXNldFNlcnZpY2U8VCBleHRlbmRzIERhdGFzZXRPcHRpb25zIHwgRGF0YXNldE9wdGlvbnNbXT4ge1xuXG4gICAgcHVibGljIGRhdGFzZXRJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IE1hcDxzdHJpbmcsIFQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgYWRkRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM/OiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5wdXNoKGludGVybmFsSWQpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgdGhpcy5jcmVhdGVTdHlsZXMoaW50ZXJuYWxJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSAodGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaW50ZXJuYWxJZCkgYXMgRGF0YXNldE9wdGlvbnNbXSk7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKGUpID0+IHRlbXAucHVzaChlKSk7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFsbERhdGFzZXRzKCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5jbGVhcigpO1xuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRhc2V0SWR4ID0gdGhpcy5kYXRhc2V0SWRzLmluZGV4T2YoaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChkYXRhc2V0SWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5zcGxpY2UoZGF0YXNldElkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNEYXRhc2V0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldElkcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVEYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBULCBpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVN0eWxlcyhpbnRlcm5hbElkOiBzdHJpbmcpOiBUO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNhdmVTdGF0ZSgpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGxvYWRTdGF0ZSgpOiB2b2lkO1xuXG59XG4iXX0=