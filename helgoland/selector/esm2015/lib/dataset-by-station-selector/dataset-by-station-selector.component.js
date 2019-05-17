/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, Station, Timeseries } from '@helgoland/core';
export class ExtendedTimeseries extends Timeseries {
}
if (false) {
    /** @type {?} */
    ExtendedTimeseries.prototype.selected;
}
export class DatasetByStationSelectorComponent {
    /**
     * @param {?} apiInterface
     */
    constructor(apiInterface) {
        this.apiInterface = apiInterface;
        this.defaultSelected = false;
        this.onSelectionChanged = new EventEmitter();
        this.timeseriesList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.station) {
            /** @type {?} */
            const stationId = this.station.properties && this.station.properties.id ? this.station.properties.id : this.station.id;
            this.apiInterface.getStation(stationId, this.url)
                .subscribe((station) => {
                this.station = station;
                this.counter = 0;
                for (const id in this.station.properties.timeseries) {
                    if (this.station.properties.timeseries.hasOwnProperty(id)) {
                        this.counter++;
                        this.apiInterface.getSingleTimeseries(id, this.url)
                            .subscribe((result) => {
                            this.prepareResult(/** @type {?} */ (result), this.defaultSelected);
                            this.counter--;
                        }, (error) => {
                            this.counter--;
                        });
                    }
                }
            });
        }
    }
    /**
     * @param {?} timeseries
     * @return {?}
     */
    toggle(timeseries) {
        timeseries.selected = !timeseries.selected;
        this.updateSelection();
    }
    /**
     * @param {?} result
     * @param {?} selection
     * @return {?}
     */
    prepareResult(result, selection) {
        result.selected = selection;
        this.timeseriesList.push(result);
        this.updateSelection();
    }
    /**
     * @return {?}
     */
    updateSelection() {
        /** @type {?} */
        const selection = this.timeseriesList.filter((entry) => entry.selected);
        this.onSelectionChanged.emit(selection);
    }
}
DatasetByStationSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-dataset-by-station-selector',
                template: `<div class="item" *ngFor="let timeseries of timeseriesList" (click)="toggle(timeseries)">
    <div *ngIf="counter">
        {{counter}} timeseries are loading...
    </div>
    <div [ngClass]="{'selected': timeseries.selected}">
        <div>
            {{timeseries.parameters.phenomenon.label}}
        </div>
        <span>{{timeseries.parameters.procedure.label}}</span>
        <span *ngIf="timeseries.parameters.category.label && timeseries.parameters.category.label != timeseries.parameters.phenomenon.label">({{timeseries.parameters.category.label}})</span>
        <div class="additionalInfo" *ngIf="timeseries.lastValue">
            <span>{{timeseries.lastValue.value}}</span>
            <span>{{timeseries.uom}}</span>
            <span>({{timeseries.lastValue.timestamp| date: 'short'}})</span>
        </div>
    </div>
</div>
`,
                styles: [`:host .item+.item{padding-top:10px}:host .item.error{display:none}:host .item label{margin-bottom:0}`]
            },] },
];
/** @nocollapse */
DatasetByStationSelectorComponent.ctorParameters = () => [
    { type: DatasetApiInterface }
];
DatasetByStationSelectorComponent.propDecorators = {
    station: [{ type: Input }],
    url: [{ type: Input }],
    defaultSelected: [{ type: Input }],
    phenomenonId: [{ type: Input }],
    onSelectionChanged: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvc2VsZWN0b3IvIiwic291cmNlcyI6WyJsaWIvZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yL2RhdGFzZXQtYnktc3RhdGlvbi1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzRSxNQUFNLHlCQUEwQixTQUFRLFVBQVU7Q0FFakQ7Ozs7O0FBd0JELE1BQU07Ozs7SUFxQkYsWUFDYyxZQUFpQztRQUFqQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7K0JBYnRCLEtBQUs7a0NBTTBCLElBQUksWUFBWSxFQUFnQjs4QkFFMUMsRUFBRTtLQU0zQzs7OztJQUVFLFFBQVE7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDZixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDdkgsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQzVDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDOUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxhQUFhLG1CQUFDLE1BQTRCLEdBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzRCQUN2RSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQ2xCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQ2xCLENBQUMsQ0FBQztxQkFDVjtpQkFDSjthQUNKLENBQUMsQ0FBQztTQUNWOzs7Ozs7SUFHRSxNQUFNLENBQUMsVUFBOEI7UUFDeEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7O0lBR2pCLGFBQWEsQ0FBQyxNQUEwQixFQUFFLFNBQWtCO1FBQ2xFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUMxQjs7OztJQUVPLGVBQWU7O1FBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztZQW5GL0MsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsc0dBQXNHLENBQUM7YUFDbkg7Ozs7WUEzQlEsbUJBQW1COzs7c0JBOEJ2QixLQUFLO2tCQUdMLEtBQUs7OEJBR0wsS0FBSzsyQkFHTCxLQUFLO2lDQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlLCBTdGF0aW9uLCBUaW1lc2VyaWVzIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEV4dGVuZGVkVGltZXNlcmllcyBleHRlbmRzIFRpbWVzZXJpZXMge1xuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZGF0YXNldC1ieS1zdGF0aW9uLXNlbGVjdG9yJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpdGVtXCIgKm5nRm9yPVwibGV0IHRpbWVzZXJpZXMgb2YgdGltZXNlcmllc0xpc3RcIiAoY2xpY2spPVwidG9nZ2xlKHRpbWVzZXJpZXMpXCI+XG4gICAgPGRpdiAqbmdJZj1cImNvdW50ZXJcIj5cbiAgICAgICAge3tjb3VudGVyfX0gdGltZXNlcmllcyBhcmUgbG9hZGluZy4uLlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IHRpbWVzZXJpZXMuc2VsZWN0ZWR9XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7e3RpbWVzZXJpZXMucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuPnt7dGltZXNlcmllcy5wYXJhbWV0ZXJzLnByb2NlZHVyZS5sYWJlbH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInRpbWVzZXJpZXMucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbCAmJiB0aW1lc2VyaWVzLnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWwgIT0gdGltZXNlcmllcy5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWxcIj4oe3t0aW1lc2VyaWVzLnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWx9fSk8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsSW5mb1wiICpuZ0lmPVwidGltZXNlcmllcy5sYXN0VmFsdWVcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7dGltZXNlcmllcy5sYXN0VmFsdWUudmFsdWV9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPnt7dGltZXNlcmllcy51b219fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPih7e3RpbWVzZXJpZXMubGFzdFZhbHVlLnRpbWVzdGFtcHwgZGF0ZTogJ3Nob3J0J319KTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5pdGVtKy5pdGVte3BhZGRpbmctdG9wOjEwcHh9Omhvc3QgLml0ZW0uZXJyb3J7ZGlzcGxheTpub25lfTpob3N0IC5pdGVtIGxhYmVse21hcmdpbi1ib3R0b206MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhc2V0QnlTdGF0aW9uU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc3RhdGlvbjogU3RhdGlvbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGVmYXVsdFNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwaGVub21lbm9uSWQ6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxUaW1lc2VyaWVzW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lc2VyaWVzW10+KCk7XG5cbiAgICBwdWJsaWMgdGltZXNlcmllc0xpc3Q6IEV4dGVuZGVkVGltZXNlcmllc1tdID0gW107XG5cbiAgICBwdWJsaWMgY291bnRlcjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0aW9uSWQgPSB0aGlzLnN0YXRpb24ucHJvcGVydGllcyAmJiB0aGlzLnN0YXRpb24ucHJvcGVydGllcy5pZCA/IHRoaXMuc3RhdGlvbi5wcm9wZXJ0aWVzLmlkIDogdGhpcy5zdGF0aW9uLmlkO1xuICAgICAgICAgICAgdGhpcy5hcGlJbnRlcmZhY2UuZ2V0U3RhdGlvbihzdGF0aW9uSWQsIHRoaXMudXJsKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aW9uID0gc3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLnN0YXRpb24ucHJvcGVydGllcy50aW1lc2VyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0aW9uLnByb3BlcnRpZXMudGltZXNlcmllcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRTaW5nbGVUaW1lc2VyaWVzKGlkLCB0aGlzLnVybClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVSZXN1bHQocmVzdWx0IGFzIEV4dGVuZGVkVGltZXNlcmllcywgdGhpcy5kZWZhdWx0U2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlKHRpbWVzZXJpZXM6IEV4dGVuZGVkVGltZXNlcmllcykge1xuICAgICAgICB0aW1lc2VyaWVzLnNlbGVjdGVkID0gIXRpbWVzZXJpZXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHByZXBhcmVSZXN1bHQocmVzdWx0OiBFeHRlbmRlZFRpbWVzZXJpZXMsIHNlbGVjdGlvbjogYm9vbGVhbikge1xuICAgICAgICByZXN1bHQuc2VsZWN0ZWQgPSBzZWxlY3Rpb247XG4gICAgICAgIHRoaXMudGltZXNlcmllc0xpc3QucHVzaChyZXN1bHQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLnRpbWVzZXJpZXNMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQuZW1pdChzZWxlY3Rpb24pO1xuICAgIH1cblxufVxuIl19