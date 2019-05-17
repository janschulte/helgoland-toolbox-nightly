/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { HasLoadableContent, Mixin, Time, TimeInterval } from '@helgoland/core';
var D3OverviewTimeseriesGraphComponent = /** @class */ (function () {
    function D3OverviewTimeseriesGraphComponent(timeSrvc, cd) {
        this.timeSrvc = timeSrvc;
        this.cd = cd;
        this.onTimespanChanged = new EventEmitter();
        this.onLoading = new EventEmitter();
        this.onContentLoading = new EventEmitter();
        this.init = false;
        if (this.presenterOptions) {
            this.presenterOptions.overview = true;
        }
        else {
            this.presenterOptions = { overview: true };
        }
    }
    /**
     * @return {?}
     */
    D3OverviewTimeseriesGraphComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.rangefactor = this.rangefactor || 1;
        this.calculateOverviewRange();
        this.init = true;
        this.cd.detectChanges();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    D3OverviewTimeseriesGraphComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["timeInterval"] && this.init) {
            this.calculateOverviewRange();
        }
    };
    /**
     * @return {?}
     */
    D3OverviewTimeseriesGraphComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.cd.detach();
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    D3OverviewTimeseriesGraphComponent.prototype.timeSpanChanged = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        this.onTimespanChanged.emit(timespan);
    };
    /**
     * @param {?} loading
     * @return {?}
     */
    D3OverviewTimeseriesGraphComponent.prototype.onGraphLoading = /**
     * @param {?} loading
     * @return {?}
     */
    function (loading) {
        this.isContentLoading(loading);
    };
    /**
     * @return {?}
     */
    D3OverviewTimeseriesGraphComponent.prototype.calculateOverviewRange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
        this.timespan = timespan;
        this.overviewTimespan = this.timeSrvc.getBufferedTimespan(timespan, this.rangefactor);
    };
    D3OverviewTimeseriesGraphComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-d3-overview-timeseries-graph',
                    template: "<n52-d3-timeseries-graph [datasetIds]=\"datasetIds\" [datasetOptions]=\"datasetOptions\" [reloadForDatasets]=\"reloadForDatasets\"\n    [timeInterval]=\"overviewTimespan\" [mainTimeInterval]=\"timespan\" [presenterOptions]=\"presenterOptions\" (onTimespanChanged)=\"timeSpanChanged($event)\"\n    (onContentLoading)=\"onGraphLoading($event)\"></n52-d3-timeseries-graph>",
                    styles: [":host .d3{height:100%}"]
                },] },
    ];
    /** @nocollapse */
    D3OverviewTimeseriesGraphComponent.ctorParameters = function () { return [
        { type: Time },
        { type: ChangeDetectorRef }
    ]; };
    D3OverviewTimeseriesGraphComponent.propDecorators = {
        datasetIds: [{ type: Input }],
        datasetOptions: [{ type: Input }],
        presenterOptions: [{ type: Input }],
        timeInterval: [{ type: Input }],
        rangefactor: [{ type: Input }],
        reloadForDatasets: [{ type: Input }],
        onTimespanChanged: [{ type: Output }],
        onLoading: [{ type: Output }],
        onContentLoading: [{ type: Output }]
    };
    D3OverviewTimeseriesGraphComponent = tslib_1.__decorate([
        Mixin([HasLoadableContent]),
        tslib_1.__metadata("design:paramtypes", [Time,
            ChangeDetectorRef])
    ], D3OverviewTimeseriesGraphComponent);
    return D3OverviewTimeseriesGraphComponent;
}());
export { D3OverviewTimeseriesGraphComponent };
if (false) {
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.datasetIds;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.datasetOptions;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.presenterOptions;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.timeInterval;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.rangefactor;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.reloadForDatasets;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.onTimespanChanged;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.onLoading;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.onContentLoading;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.isContentLoading;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.overviewTimespan;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.timespan;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.init;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    D3OverviewTimeseriesGraphComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FHVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLGtCQUFrQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFZLE1BQU0saUJBQWlCLENBQUM7O0lBZ0R0Ryw0Q0FDYyxRQUFjLEVBQ2QsRUFBcUI7UUFEckIsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQW1CO2lDQWpCZ0IsSUFBSSxZQUFZLEVBQUU7eUJBRzNCLElBQUksWUFBWSxFQUFFO2dDQUdYLElBQUksWUFBWSxFQUFFO29CQU9wRCxLQUFLO1FBTWhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDekM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM5QztLQUNKOzs7O0lBRU0sNERBQWU7Ozs7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7Ozs7SUFHckIsd0RBQVc7Ozs7Y0FBQyxPQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQzs7Ozs7SUFHRSx3REFBVzs7OztRQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7OztJQUdkLDREQUFlOzs7O2NBQUMsUUFBa0I7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBR25DLDJEQUFjOzs7O2NBQUMsT0FBZ0I7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztJQUczQixtRUFBc0I7Ozs7O1FBQzFCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7OztnQkFuRjdGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxRQUFRLEVBQUUsbVhBRTZEO29CQUN2RSxNQUFNLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDckM7Ozs7Z0JBVm1ELElBQUk7Z0JBVHBELGlCQUFpQjs7OzZCQXVCaEIsS0FBSztpQ0FHTCxLQUFLO21DQUdMLEtBQUs7K0JBR0wsS0FBSzs4QkFHTCxLQUFLO29DQUdMLEtBQUs7b0NBR0wsTUFBTTs0QkFHTixNQUFNO21DQUdOLE1BQU07O0lBMUJFLGtDQUFrQztRQUQ5QyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lEQXNDQSxJQUFJO1lBQ1YsaUJBQWlCO09BdEMxQixrQ0FBa0MsRUE2RTlDOzZDQXBHRDs7U0F1QmEsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucywgSGFzTG9hZGFibGVDb250ZW50LCBNaXhpbiwgVGltZSwgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzUGxvdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9kMy1wbG90LW9wdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxuNTItZDMtdGltZXNlcmllcy1ncmFwaCBbZGF0YXNldElkc109XCJkYXRhc2V0SWRzXCIgW2RhdGFzZXRPcHRpb25zXT1cImRhdGFzZXRPcHRpb25zXCIgW3JlbG9hZEZvckRhdGFzZXRzXT1cInJlbG9hZEZvckRhdGFzZXRzXCJcbiAgICBbdGltZUludGVydmFsXT1cIm92ZXJ2aWV3VGltZXNwYW5cIiBbbWFpblRpbWVJbnRlcnZhbF09XCJ0aW1lc3BhblwiIFtwcmVzZW50ZXJPcHRpb25zXT1cInByZXNlbnRlck9wdGlvbnNcIiAob25UaW1lc3BhbkNoYW5nZWQpPVwidGltZVNwYW5DaGFuZ2VkKCRldmVudClcIlxuICAgIChvbkNvbnRlbnRMb2FkaW5nKT1cIm9uR3JhcGhMb2FkaW5nKCRldmVudClcIj48L241Mi1kMy10aW1lc2VyaWVzLWdyYXBoPmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5kM3toZWlnaHQ6MTAwJX1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBEM092ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBIYXNMb2FkYWJsZUNvbnRlbnQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBEYXRhc2V0T3B0aW9ucz47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwcmVzZW50ZXJPcHRpb25zOiBEM1Bsb3RPcHRpb25zO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByYW5nZWZhY3RvcjogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmVsb2FkRm9yRGF0YXNldHM6IHN0cmluZ1tdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZXNwYW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uTG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIHB1YmxpYyBvdmVydmlld1RpbWVzcGFuOiBUaW1lc3BhbjtcbiAgICBwdWJsaWMgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgcHJpdmF0ZSBpbml0ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc2VudGVyT3B0aW9ucy5vdmVydmlldyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMgPSB7IG92ZXJ2aWV3OiB0cnVlIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhbmdlZmFjdG9yID0gdGhpcy5yYW5nZWZhY3RvciB8fCAxO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsICYmIHRoaXMuaW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2QuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVTcGFuQ2hhbmdlZCh0aW1lc3BhbjogVGltZXNwYW4pIHtcbiAgICAgICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlZC5lbWl0KHRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25HcmFwaExvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcobG9hZGluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVydmlld1JhbmdlKCkge1xuICAgICAgICBjb25zdCB0aW1lc3BhbiA9IHRoaXMudGltZVNydmMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRoaXMudGltZUludGVydmFsKTtcbiAgICAgICAgdGhpcy50aW1lc3BhbiA9IHRpbWVzcGFuO1xuICAgICAgICB0aGlzLm92ZXJ2aWV3VGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGltZXNwYW4sIHRoaXMucmFuZ2VmYWN0b3IpO1xuICAgIH1cbn1cbiJdfQ==