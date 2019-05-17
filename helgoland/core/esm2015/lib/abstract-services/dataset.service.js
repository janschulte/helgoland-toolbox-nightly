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
    constructor() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2Fic3RyYWN0LXNlcnZpY2VzL2RhdGFzZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxNQUFNOzswQkFFNEIsRUFBRTs4QkFFUSxJQUFJLEdBQUcsRUFBRTs7Ozs7OztJQUUxQyxVQUFVLENBQUMsVUFBa0IsRUFBRSxPQUFXO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1lBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUNsQyxNQUFNLElBQUksR0FBRyxtQkFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQXFCLEVBQUMsQ0FBQztZQUN2RSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCOzs7OztJQUdFLGlCQUFpQjtRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7OztJQUdkLGFBQWEsQ0FBQyxVQUFrQjs7UUFDbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7O0lBR2QsV0FBVztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Ozs7Ozs7SUFHL0Isb0JBQW9CLENBQUMsT0FBVSxFQUFFLFVBQWtCO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O0NBU3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFzZXRTZXJ2aWNlPFQgZXh0ZW5kcyBEYXRhc2V0T3B0aW9ucyB8IERhdGFzZXRPcHRpb25zW10+IHtcblxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBUPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9ucz86IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldElkcy5pbmRleE9mKGludGVybmFsSWQpIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnB1c2goaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2V0KGludGVybmFsSWQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCB0aGlzLmNyZWF0ZVN0eWxlcyhpbnRlcm5hbElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9ICh0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpbnRlcm5hbElkKSBhcyBEYXRhc2V0T3B0aW9uc1tdKTtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4gdGVtcC5wdXNoKGUpKTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWxsRGF0YXNldHMoKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldElkcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRJZHggPSB0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGRhdGFzZXRJZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnNwbGljZShkYXRhc2V0SWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc0RhdGFzZXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0SWRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFQsIGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlU3R5bGVzKGludGVybmFsSWQ6IHN0cmluZyk6IFQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2F2ZVN0YXRlKCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbG9hZFN0YXRlKCk6IHZvaWQ7XG5cbn1cbiJdfQ==