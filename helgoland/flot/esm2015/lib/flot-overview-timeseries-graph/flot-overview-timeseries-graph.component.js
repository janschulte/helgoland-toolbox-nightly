/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { HasLoadableContent, Mixin, Time, TimeInterval } from '@helgoland/core';
let FlotOverviewTimeseriesGraphComponent = class FlotOverviewTimeseriesGraphComponent {
    /**
     * @param {?} timeSrvc
     * @param {?} cd
     */
    constructor(timeSrvc, cd) {
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
    ngAfterViewInit() {
        this.rangefactor = this.rangefactor || 1;
        this.calculateOverviewRange();
        this.init = true;
        this.cd.detectChanges();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeInterval"] && this.init) {
            this.calculateOverviewRange();
        }
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    timeChanged(timespan) {
        this.onTimespanChanged.emit(timespan);
    }
    /**
     * @return {?}
     */
    calculateOverviewRange() {
        /** @type {?} */
        const timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
        this.overviewTimespan = this.timeSrvc.getBufferedTimespan(timespan, this.rangefactor);
        this.graphOptions.selection.range = {
            from: timespan.from,
            to: timespan.to
        };
    }
};
FlotOverviewTimeseriesGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-flot-overview-timeseries-graph',
                template: `<n52-flot-timeseries-graph [datasetIds]="datasetIds" [timeInterval]="overviewTimespan" [datasetOptions]="datasetOptions"
  [graphOptions]="graphOptions" (onTimespanChanged)="timeChanged($event)" (onContentLoading)="onContentLoading.emit($event)"></n52-flot-timeseries-graph>
`,
                styles: [`:host .flot{height:100%}`]
            },] },
];
/** @nocollapse */
FlotOverviewTimeseriesGraphComponent.ctorParameters = () => [
    { type: Time },
    { type: ChangeDetectorRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZmxvdC8iLCJzb3VyY2VzIjpbImxpYi9mbG90LW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0Isa0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUUxRyxJQVFhLG9DQUFvQyxHQVJqRDs7Ozs7SUF3Q0ksWUFDYyxRQUFjLEVBQ2QsRUFBcUI7UUFEckIsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQW1CO2lDQWhCZ0IsSUFBSSxZQUFZLEVBQUU7eUJBRzNCLElBQUksWUFBWSxFQUFFO2dDQUdYLElBQUksWUFBWSxFQUFFO29CQU1wRCxLQUFLO0tBS2Y7Ozs7SUFFRSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7O0lBR3JCLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQzs7Ozs7O0lBR0UsV0FBVyxDQUFDLFFBQWtCO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7O0lBR2xDLHNCQUFzQjs7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUc7WUFDaEMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRTtTQUNsQixDQUFDOztDQUVULENBQUE7O1lBdEVBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5QyxRQUFRLEVBQUU7O0NBRWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDdkM7Ozs7WUFSbUQsSUFBSTtZQVJwRCxpQkFBaUI7Ozt5QkFvQmhCLEtBQUs7NkJBR0wsS0FBSzsyQkFHTCxLQUFLOzJCQUdMLEtBQUs7MEJBR0wsS0FBSztnQ0FHTCxNQUFNO3dCQUdOLE1BQU07K0JBR04sTUFBTTs7QUF2QkUsb0NBQW9DO0lBRGhELEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7NkNBa0NBLElBQUk7UUFDVixpQkFBaUI7R0FsQzFCLG9DQUFvQyxFQThEaEQ7U0E5RFksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRPcHRpb25zLCBIYXNMb2FkYWJsZUNvbnRlbnQsIE1peGluLCBUaW1lLCBUaW1lSW50ZXJ2YWwsIFRpbWVzcGFuIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxuNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIFtkYXRhc2V0SWRzXT1cImRhdGFzZXRJZHNcIiBbdGltZUludGVydmFsXT1cIm92ZXJ2aWV3VGltZXNwYW5cIiBbZGF0YXNldE9wdGlvbnNdPVwiZGF0YXNldE9wdGlvbnNcIlxuICBbZ3JhcGhPcHRpb25zXT1cImdyYXBoT3B0aW9uc1wiIChvblRpbWVzcGFuQ2hhbmdlZCk9XCJ0aW1lQ2hhbmdlZCgkZXZlbnQpXCIgKG9uQ29udGVudExvYWRpbmcpPVwib25Db250ZW50TG9hZGluZy5lbWl0KCRldmVudClcIj48L241Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGg+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAuZmxvdHtoZWlnaHQ6MTAwJX1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBGbG90T3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEhhc0xvYWRhYmxlQ29udGVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBEYXRhc2V0T3B0aW9ucz47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBncmFwaE9wdGlvbnM6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmFuZ2VmYWN0b3I6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkxvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbnRlbnRMb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNDb250ZW50TG9hZGluZzogKGxvYWRpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBwdWJsaWMgb3ZlcnZpZXdUaW1lc3BhbjogVGltZXNwYW47XG5cbiAgICBwcml2YXRlIGluaXQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYW5nZWZhY3RvciA9IHRoaXMucmFuZ2VmYWN0b3IgfHwgMTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRpbWVJbnRlcnZhbCAmJiB0aGlzLmluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVDaGFuZ2VkKHRpbWVzcGFuOiBUaW1lc3Bhbikge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQodGltZXNwYW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpIHtcbiAgICAgICAgY29uc3QgdGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNyZWF0ZVRpbWVzcGFuT2ZJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMub3ZlcnZpZXdUaW1lc3BhbiA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aW1lc3BhbiwgdGhpcy5yYW5nZWZhY3Rvcik7XG4gICAgICAgIHRoaXMuZ3JhcGhPcHRpb25zLnNlbGVjdGlvbi5yYW5nZSA9IHtcbiAgICAgICAgICAgIGZyb206IHRpbWVzcGFuLmZyb20sXG4gICAgICAgICAgICB0bzogdGltZXNwYW4udG9cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=