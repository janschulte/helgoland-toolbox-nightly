/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, Station, Timeseries } from '@helgoland/core';
var ExtendedTimeseries = /** @class */ (function (_super) {
    tslib_1.__extends(ExtendedTimeseries, _super);
    function ExtendedTimeseries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExtendedTimeseries;
}(Timeseries));
export { ExtendedTimeseries };
if (false) {
    /** @type {?} */
    ExtendedTimeseries.prototype.selected;
}
var DatasetByStationSelectorComponent = /** @class */ (function () {
    function DatasetByStationSelectorComponent(apiInterface) {
        this.apiInterface = apiInterface;
        this.defaultSelected = false;
        this.onSelectionChanged = new EventEmitter();
        this.timeseriesList = [];
    }
    /**
     * @return {?}
     */
    DatasetByStationSelectorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.station) {
            /** @type {?} */
            var stationId = this.station.properties && this.station.properties.id ? this.station.properties.id : this.station.id;
            this.apiInterface.getStation(stationId, this.url)
                .subscribe(function (station) {
                _this.station = station;
                _this.counter = 0;
                for (var id in _this.station.properties.timeseries) {
                    if (_this.station.properties.timeseries.hasOwnProperty(id)) {
                        _this.counter++;
                        _this.apiInterface.getSingleTimeseries(id, _this.url)
                            .subscribe(function (result) {
                            _this.prepareResult(/** @type {?} */ (result), _this.defaultSelected);
                            _this.counter--;
                        }, function (error) {
                            _this.counter--;
                        });
                    }
                }
            });
        }
    };
    /**
     * @param {?} timeseries
     * @return {?}
     */
    DatasetByStationSelectorComponent.prototype.toggle = /**
     * @param {?} timeseries
     * @return {?}
     */
    function (timeseries) {
        timeseries.selected = !timeseries.selected;
        this.updateSelection();
    };
    /**
     * @param {?} result
     * @param {?} selection
     * @return {?}
     */
    DatasetByStationSelectorComponent.prototype.prepareResult = /**
     * @param {?} result
     * @param {?} selection
     * @return {?}
     */
    function (result, selection) {
        result.selected = selection;
        this.timeseriesList.push(result);
        this.updateSelection();
    };
    /**
     * @return {?}
     */
    DatasetByStationSelectorComponent.prototype.updateSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selection = this.timeseriesList.filter(function (entry) { return entry.selected; });
        this.onSelectionChanged.emit(selection);
    };
    DatasetByStationSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-dataset-by-station-selector',
                    template: "<div class=\"item\" *ngFor=\"let timeseries of timeseriesList\" (click)=\"toggle(timeseries)\">\n    <div *ngIf=\"counter\">\n        {{counter}} timeseries are loading...\n    </div>\n    <div [ngClass]=\"{'selected': timeseries.selected}\">\n        <div>\n            {{timeseries.parameters.phenomenon.label}}\n        </div>\n        <span>{{timeseries.parameters.procedure.label}}</span>\n        <span *ngIf=\"timeseries.parameters.category.label && timeseries.parameters.category.label != timeseries.parameters.phenomenon.label\">({{timeseries.parameters.category.label}})</span>\n        <div class=\"additionalInfo\" *ngIf=\"timeseries.lastValue\">\n            <span>{{timeseries.lastValue.value}}</span>\n            <span>{{timeseries.uom}}</span>\n            <span>({{timeseries.lastValue.timestamp| date: 'short'}})</span>\n        </div>\n    </div>\n</div>\n",
                    styles: [":host .item+.item{padding-top:10px}:host .item.error{display:none}:host .item label{margin-bottom:0}"]
                },] },
    ];
    /** @nocollapse */
    DatasetByStationSelectorComponent.ctorParameters = function () { return [
        { type: DatasetApiInterface }
    ]; };
    DatasetByStationSelectorComponent.propDecorators = {
        station: [{ type: Input }],
        url: [{ type: Input }],
        defaultSelected: [{ type: Input }],
        phenomenonId: [{ type: Input }],
        onSelectionChanged: [{ type: Output }]
    };
    return DatasetByStationSelectorComponent;
}());
export { DatasetByStationSelectorComponent };
if (false) {
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.station;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.url;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.defaultSelected;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.phenomenonId;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.onSelectionChanged;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.timeseriesList;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.counter;
    /** @type {?} */
    DatasetByStationSelectorComponent.prototype.apiInterface;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvc2VsZWN0b3IvIiwic291cmNlcyI6WyJsaWIvZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yL2RhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0UsSUFBQTtJQUF3Qyw4Q0FBVTs7Ozs2QkFIbEQ7RUFHd0MsVUFBVSxFQUVqRCxDQUFBO0FBRkQsOEJBRUM7Ozs7OztJQTZDRywyQ0FDYyxZQUFpQztRQUFqQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7K0JBYnRCLEtBQUs7a0NBTTBCLElBQUksWUFBWSxFQUFnQjs4QkFFMUMsRUFBRTtLQU0zQzs7OztJQUVFLG9EQUFROzs7OztRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUNmLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN2SCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDNUMsU0FBUyxDQUFDLFVBQUMsT0FBTztnQkFDZixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQU0sRUFBRSxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsS0FBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDOUMsU0FBUyxDQUFDLFVBQUMsTUFBTTs0QkFDZCxLQUFJLENBQUMsYUFBYSxtQkFBQyxNQUE0QixHQUFFLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFDdkUsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3lCQUNsQixFQUFFLFVBQUMsS0FBSzs0QkFDTCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQ2xCLENBQUMsQ0FBQztxQkFDVjtpQkFDSjthQUNKLENBQUMsQ0FBQztTQUNWOzs7Ozs7SUFHRSxrREFBTTs7OztjQUFDLFVBQThCO1FBQ3hDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7OztJQUdqQix5REFBYTs7Ozs7SUFBdkIsVUFBd0IsTUFBMEIsRUFBRSxTQUFrQjtRQUNsRSxNQUFNLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDMUI7Ozs7SUFFTywyREFBZTs7Ozs7UUFDbkIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7OztnQkFuRi9DLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxRQUFRLEVBQUUsODJCQWlCYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxzR0FBc0csQ0FBQztpQkFDbkg7Ozs7Z0JBM0JRLG1CQUFtQjs7OzBCQThCdkIsS0FBSztzQkFHTCxLQUFLO2tDQUdMLEtBQUs7K0JBR0wsS0FBSztxQ0FHTCxNQUFNOzs0Q0EzQ1g7O1NBNkJhLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UsIFN0YXRpb24sIFRpbWVzZXJpZXMgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRUaW1lc2VyaWVzIGV4dGVuZHMgVGltZXNlcmllcyB7XG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kYXRhc2V0LWJ5LXN0YXRpb24tc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIml0ZW1cIiAqbmdGb3I9XCJsZXQgdGltZXNlcmllcyBvZiB0aW1lc2VyaWVzTGlzdFwiIChjbGljayk9XCJ0b2dnbGUodGltZXNlcmllcylcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiY291bnRlclwiPlxuICAgICAgICB7e2NvdW50ZXJ9fSB0aW1lc2VyaWVzIGFyZSBsb2FkaW5nLi4uXG4gICAgPC9kaXY+XG4gICAgPGRpdiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogdGltZXNlcmllcy5zZWxlY3RlZH1cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHt7dGltZXNlcmllcy5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWx9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4+e3t0aW1lc2VyaWVzLnBhcmFtZXRlcnMucHJvY2VkdXJlLmxhYmVsfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGltZXNlcmllcy5wYXJhbWV0ZXJzLmNhdGVnb3J5LmxhYmVsICYmIHRpbWVzZXJpZXMucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbCAhPSB0aW1lc2VyaWVzLnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbFwiPih7e3RpbWVzZXJpZXMucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbH19KTwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZGl0aW9uYWxJbmZvXCIgKm5nSWY9XCJ0aW1lc2VyaWVzLmxhc3RWYWx1ZVwiPlxuICAgICAgICAgICAgPHNwYW4+e3t0aW1lc2VyaWVzLmxhc3RWYWx1ZS52YWx1ZX19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e3t0aW1lc2VyaWVzLnVvbX19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+KHt7dGltZXNlcmllcy5sYXN0VmFsdWUudGltZXN0YW1wfCBkYXRlOiAnc2hvcnQnfX0pPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgLml0ZW0rLml0ZW17cGFkZGluZy10b3A6MTBweH06aG9zdCAuaXRlbS5lcnJvcntkaXNwbGF5Om5vbmV9Omhvc3QgLml0ZW0gbGFiZWx7bWFyZ2luLWJvdHRvbTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFzZXRCeVN0YXRpb25TZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzdGF0aW9uOiBTdGF0aW9uO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkZWZhdWx0U2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHBoZW5vbWVub25JZDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRpbWVzZXJpZXNbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVzZXJpZXNbXT4oKTtcblxuICAgIHB1YmxpYyB0aW1lc2VyaWVzTGlzdDogRXh0ZW5kZWRUaW1lc2VyaWVzW10gPSBbXTtcblxuICAgIHB1YmxpYyBjb3VudGVyOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRpb25JZCA9IHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzICYmIHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzLmlkID8gdGhpcy5zdGF0aW9uLnByb3BlcnRpZXMuaWQgOiB0aGlzLnN0YXRpb24uaWQ7XG4gICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRTdGF0aW9uKHN0YXRpb25JZCwgdGhpcy51cmwpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpb24gPSBzdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzLnRpbWVzZXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRpb24ucHJvcGVydGllcy50aW1lc2VyaWVzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFNpbmdsZVRpbWVzZXJpZXMoaWQsIHRoaXMudXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZVJlc3VsdChyZXN1bHQgYXMgRXh0ZW5kZWRUaW1lc2VyaWVzLCB0aGlzLmRlZmF1bHRTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXItLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXItLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUodGltZXNlcmllczogRXh0ZW5kZWRUaW1lc2VyaWVzKSB7XG4gICAgICAgIHRpbWVzZXJpZXMuc2VsZWN0ZWQgPSAhdGltZXNlcmllcy5zZWxlY3RlZDtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJlcGFyZVJlc3VsdChyZXN1bHQ6IEV4dGVuZGVkVGltZXNlcmllcywgc2VsZWN0aW9uOiBib29sZWFuKSB7XG4gICAgICAgIHJlc3VsdC5zZWxlY3RlZCA9IHNlbGVjdGlvbjtcbiAgICAgICAgdGhpcy50aW1lc2VyaWVzTGlzdC5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMudGltZXNlcmllc0xpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHNlbGVjdGlvbik7XG4gICAgfVxuXG59XG4iXX0=