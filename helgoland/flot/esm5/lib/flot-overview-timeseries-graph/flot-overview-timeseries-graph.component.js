/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { HasLoadableContent, Mixin, Time, TimeInterval } from '@helgoland/core';
var FlotOverviewTimeseriesGraphComponent = /** @class */ (function () {
    function FlotOverviewTimeseriesGraphComponent(timeSrvc, cd) {
        this.timeSrvc = timeSrvc;
        this.cd = cd;
        this.onTimespanChanged = new EventEmitter();
        this.onLoading = new EventEmitter();
        this.onContentLoading = new EventEmitter();
        this.init = false;
    }
    /**
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.ngAfterViewInit = /**
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
    FlotOverviewTimeseriesGraphComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["timeInterval"] && this.init) {
            this.calculateOverviewRange();
        }
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.timeChanged = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        this.onTimespanChanged.emit(timespan);
    };
    /**
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.calculateOverviewRange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
        this.overviewTimespan = this.timeSrvc.getBufferedTimespan(timespan, this.rangefactor);
        this.graphOptions.selection.range = {
            from: timespan.from,
            to: timespan.to
        };
    };
    FlotOverviewTimeseriesGraphComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-flot-overview-timeseries-graph',
                    template: "<n52-flot-timeseries-graph [datasetIds]=\"datasetIds\" [timeInterval]=\"overviewTimespan\" [datasetOptions]=\"datasetOptions\"\n  [graphOptions]=\"graphOptions\" (onTimespanChanged)=\"timeChanged($event)\" (onContentLoading)=\"onContentLoading.emit($event)\"></n52-flot-timeseries-graph>\n",
                    styles: [":host .flot{height:100%}"]
                },] },
    ];
    /** @nocollapse */
    FlotOverviewTimeseriesGraphComponent.ctorParameters = function () { return [
        { type: Time },
        { type: ChangeDetectorRef }
    ]; };
    FlotOverviewTimeseriesGraphComponent.propDecorators = {
        datasetIds: [{ type: Input }],
        datasetOptions: [{ type: Input }],
        graphOptions: [{ type: Input }],
        timeInterval: [{ type: Input }],
        rangefactor: [{ type: Input }],
        onTimespanChanged: [{ type: Output }],
        onLoading: [{ type: Output }],
        onContentLoading: [{ type: Output }]
    };
    FlotOverviewTimeseriesGraphComponent = tslib_1.__decorate([
        Mixin([HasLoadableContent]),
        tslib_1.__metadata("design:paramtypes", [Time,
            ChangeDetectorRef])
    ], FlotOverviewTimeseriesGraphComponent);
    return FlotOverviewTimeseriesGraphComponent;
}());
export { FlotOverviewTimeseriesGraphComponent };
if (false) {
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.datasetIds;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.datasetOptions;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.graphOptions;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.timeInterval;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.rangefactor;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.onTimespanChanged;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.onLoading;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.onContentLoading;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.isContentLoading;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.overviewTimespan;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.init;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    FlotOverviewTimeseriesGraphComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZmxvdC8iLCJzb3VyY2VzIjpbImxpYi9mbG90LW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0Isa0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQVksTUFBTSxpQkFBaUIsQ0FBQzs7SUEwQ3RHLDhDQUNjLFFBQWMsRUFDZCxFQUFxQjtRQURyQixhQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2QsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7aUNBaEJnQixJQUFJLFlBQVksRUFBRTt5QkFHM0IsSUFBSSxZQUFZLEVBQUU7Z0NBR1gsSUFBSSxZQUFZLEVBQUU7b0JBTXBELEtBQUs7S0FLZjs7OztJQUVFLDhEQUFlOzs7O1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7O0lBR3JCLDBEQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxvQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7Ozs7OztJQUdFLDBEQUFXOzs7O2NBQUMsUUFBa0I7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7SUFHbEMscUVBQXNCOzs7OztRQUMxQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRztZQUNoQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDbkIsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1NBQ2xCLENBQUM7OztnQkFwRVQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLFFBQVEsRUFBRSxtU0FFYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztpQkFDdkM7Ozs7Z0JBUm1ELElBQUk7Z0JBUnBELGlCQUFpQjs7OzZCQW9CaEIsS0FBSztpQ0FHTCxLQUFLOytCQUdMLEtBQUs7K0JBR0wsS0FBSzs4QkFHTCxLQUFLO29DQUdMLE1BQU07NEJBR04sTUFBTTttQ0FHTixNQUFNOztJQXZCRSxvQ0FBb0M7UUFEaEQsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpREFrQ0EsSUFBSTtZQUNWLGlCQUFpQjtPQWxDMUIsb0NBQW9DLEVBOERoRDsrQ0FsRkQ7O1NBb0JhLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucywgSGFzTG9hZGFibGVDb250ZW50LCBNaXhpbiwgVGltZSwgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWZsb3Qtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCBbZGF0YXNldElkc109XCJkYXRhc2V0SWRzXCIgW3RpbWVJbnRlcnZhbF09XCJvdmVydmlld1RpbWVzcGFuXCIgW2RhdGFzZXRPcHRpb25zXT1cImRhdGFzZXRPcHRpb25zXCJcbiAgW2dyYXBoT3B0aW9uc109XCJncmFwaE9wdGlvbnNcIiAob25UaW1lc3BhbkNoYW5nZWQpPVwidGltZUNoYW5nZWQoJGV2ZW50KVwiIChvbkNvbnRlbnRMb2FkaW5nKT1cIm9uQ29udGVudExvYWRpbmcuZW1pdCgkZXZlbnQpXCI+PC9uNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoPlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgLmZsb3R7aGVpZ2h0OjEwMCV9YF1cbn0pXG5ATWl4aW4oW0hhc0xvYWRhYmxlQ29udGVudF0pXG5leHBvcnQgY2xhc3MgRmxvdE92ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBIYXNMb2FkYWJsZUNvbnRlbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldElkczogc3RyaW5nW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgRGF0YXNldE9wdGlvbnM+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ3JhcGhPcHRpb25zOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJhbmdlZmFjdG9yOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25UaW1lc3BhbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Mb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Db250ZW50TG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzQ29udGVudExvYWRpbmc6IChsb2FkaW5nOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gICAgcHVibGljIG92ZXJ2aWV3VGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgcHJpdmF0ZSBpbml0ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmFuZ2VmYWN0b3IgPSB0aGlzLnJhbmdlZmFjdG9yIHx8IDE7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpO1xuICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy50aW1lSW50ZXJ2YWwgJiYgdGhpcy5pbml0KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lQ2hhbmdlZCh0aW1lc3BhbjogVGltZXNwYW4pIHtcbiAgICAgICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlZC5lbWl0KHRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzcGFuID0gdGhpcy50aW1lU3J2Yy5jcmVhdGVUaW1lc3Bhbk9mSW50ZXJ2YWwodGhpcy50aW1lSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLm92ZXJ2aWV3VGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGltZXNwYW4sIHRoaXMucmFuZ2VmYWN0b3IpO1xuICAgICAgICB0aGlzLmdyYXBoT3B0aW9ucy5zZWxlY3Rpb24ucmFuZ2UgPSB7XG4gICAgICAgICAgICBmcm9tOiB0aW1lc3Bhbi5mcm9tLFxuICAgICAgICAgICAgdG86IHRpbWVzcGFuLnRvXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19