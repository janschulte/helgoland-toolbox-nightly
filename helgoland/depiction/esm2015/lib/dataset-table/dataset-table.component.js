/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, IterableDiffers } from '@angular/core';
import { DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
export class DatasetTableComponent extends DatasetPresenterComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} api
     * @param {?} datasetIdResolver
     * @param {?} timeSrvc
     * @param {?} translateSrvc
     */
    constructor(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
        super(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc);
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.translateSrvc = translateSrvc;
        this.preparedData = Array();
        this.preparedColors = Array();
        this.ready = false;
        this.timeseriesArray = new Array();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.additionalStylesheet = document.getElementById('selectedIdsStylesheet');
        if (!this.additionalStylesheet) {
            this.additionalStylesheet = document.createElement('style');
            this.additionalStylesheet.id = 'selectedIdsStylesheet';
            document.body.appendChild(this.additionalStylesheet);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    sort(event) {
        /** @type {?} */
        const by = event.target.dataset.columnId;
        /** @type {?} */
        const direction = event.target.classList.contains('sorted-asc') ? 'desc' : 'asc';
        /** @type {?} */
        const directionNumber = (direction === 'asc' ? 1 : -1);
        // set CSS classes
        Array.from(event.target.parentElement.children).forEach((child) => child.className = '');
        if (direction === 'asc') {
            (/** @type {?} */ (event.target)).classList.add('sorted-asc');
        }
        else {
            (/** @type {?} */ (event.target)).classList.add('sorted-desc');
        }
        /** @type {?} */
        let sortCallback;
        if (by === 'datetime') {
            sortCallback = (e1, e2) => directionNumber * (e1.datetime - e2.datetime);
        }
        else {
            /** @type {?} */
            const index = parseInt(by, 10);
            // basically the same as above, but take care of 'undefined' values
            sortCallback = (e1, e2) => (e1.values[index] === undefined ? 1 :
                (e2.values[index] === undefined ? -1 :
                    (directionNumber * (e1.values[index] - e2.values[index]))));
        }
        // do the sort
        this.preparedData = this.preparedData.sort(sortCallback);
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) { }
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    reloadDataForDatasets(datasetIds) {
        // console.log('reload data at ' + new Date());
    }
    /**
     * @param {?} options
     * @return {?}
     */
    presenterOptionsChanged(options) {
        // only included because it's required by abstract parent class (wouldn't compile without)
        // no point in implementing this method in a non-graphing component
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    getIndexFromInternalId(internalId) {
        // helper method
        return this.datasetIds.indexOf(internalId);
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    setSelectedId(internalId) {
        /** @type {?} */
        const rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        const index = this.getIndexFromInternalId(internalId);
        rules[index] = 'td:nth-child(' + (index + 2) + ') {font-weight: bold}';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeSelectedId(internalId) {
        /** @type {?} */
        const rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        const index = this.getIndexFromInternalId(internalId);
        rules[index] = '';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    }
    /**
     * @return {?}
     */
    timeIntervalChanges() {
        // the easiest method: delete everything and build preparedData from scratch.
        this.preparedData = [];
        this.timeseriesArray.forEach((timeseries) => this.loadTsData(timeseries));
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeDataset(internalId) {
        /** @type {?} */
        const index = this.getIndexFromInternalId(internalId);
        // remove entries of this dataset in each datetime's `values` arrays
        this.preparedData.forEach((e) => e.values.splice(index, 1));
        // if a datetime became completely empty (i.e. there's only `undefined`s in the `values` array, delete this datetime)
        this.preparedData = this.preparedData.filter((e) => e.values.reduce((a, c) => a || c, undefined) !== undefined);
        this.preparedColors.splice(index, 1);
        /** @type {?} */
        const rules = this.additionalStylesheet.innerHTML.split('\r\n');
        rules.splice(index, 1);
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
        this.timeseriesArray.splice(index, 1);
    }
    /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    addDataset(internalId, url) {
        this.timeseriesArray.length += 1; // create new empty slot
        this.preparedColors.push('darkgrey');
        this.additionalStylesheet.innerHTML += '\r\n';
        this.api.getSingleTimeseries(internalId, url)
            .subscribe((timeseries) => this.addTimeseries(timeseries));
    }
    /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    datasetOptionsChanged(internalId, options) {
        if (this.timeseriesArray.some((e) => e !== undefined && e.internalId === internalId)) {
            /** @type {?} */
            const index = this.getIndexFromInternalId(internalId);
            this.preparedColors[index] = options.color;
            // TODO-CF: Page isn't refreshed instantly, but only after the next sort (or possible other actions as well)
        }
    }
    /**
     * @return {?}
     */
    onResize() {
        // TODO-CF: needed???? probably not
    }
    /**
     * @param {?} timeseries
     * @return {?}
     */
    addTimeseries(timeseries) {
        this.timeseriesArray[this.getIndexFromInternalId(timeseries.internalId)] = timeseries;
        this.loadTsData(timeseries);
    }
    /**
     * @param {?} timeseries
     * @return {?}
     */
    loadTsData(timeseries) {
        if (this.timespan) {
            // const datasetOptions = this.datasetOptions.get(timeseries.internalId);
            this.api.getTsData(timeseries.id, timeseries.url, this.timespan, { format: 'flot' })
                .subscribe((result) => {
                /** @type {?} */
                const index = this.getIndexFromInternalId(timeseries.internalId);
                this.prepareData(timeseries, result.values.map((e) => {
                    /** @type {?} */
                    const a = new Array(this.datasetIds.length).fill(undefined);
                    a[index] = e[1];
                    return { datetime: e[0], values: a };
                }));
            });
        }
    }
    /**
     * @param {?} timeseries
     * @param {?} newdata
     * @return {?}
     */
    prepareData(timeseries, newdata) {
        /** @type {?} */
        const index = this.getIndexFromInternalId(timeseries.internalId);
        // if datasetOptions are provided, use their color to style the header's "color band" (i.e. the 7px border-bottom of th)
        if (this.datasetOptions) {
            /** @type {?} */
            const datasetOptions = this.datasetOptions.get(timeseries.internalId);
            this.preparedColors[index] = datasetOptions.color;
        }
        else {
            // when no color is specified: make border transparent so the header's background color is used for the color band, too
            this.preparedColors[index] = 'rgba(0,0,0,0)';
        }
        if (this.selectedDatasetIds.indexOf(timeseries.internalId) !== -1) {
            this.setSelectedId(timeseries.internalId);
        }
        // `newdata` is expected in exactly the same format `preparedData` would look like if that timeseries was the only one
        // to actually have data (i.e. `values` has the length of timeseriesArray, but all slots are `undefined`, except for
        // the slot that corresponds to that timeseries)
        // `timeseries` is first timeseries added -> no other `preparedData` to merge with
        if (this.preparedData.length === 0) {
            // set newdata as preparedData (as per above)
            this.preparedData = newdata;
            // `timeseries` is not the first timeseries added -> we have to merge `newdata` into the existing `preparedData`
        }
        else {
            /** @type {?} */
            let i = 0;
            /** @type {?} */
            let j = 0; // loop variable for `newdata`
            // go through all data points in `newdata`
            while (j < newdata.length) {
                // timestamps match
                if (this.preparedData[i] && this.preparedData[i].datetime === newdata[j].datetime) {
                    // just add `newdata`'s value to the existing `values` array in `preparedData`
                    this.preparedData[i].values[index] = newdata[j].values[index];
                    // increment both
                    i++;
                    j++;
                    // `newdata` is ahead of `preparedData`
                }
                else if (this.preparedData[i] && this.preparedData[i].datetime < newdata[j].datetime) {
                    // do nothing because there's already an undefined there
                    // give preparedData the chance to catch up with newdata
                    i++;
                    // `preparedData` is ahead of `newdata`
                }
                else {
                    // the current `newdata` is the first dataset that has this datetime -> add it to the preparedData array
                    this.preparedData.splice(i, 0, newdata[j]);
                    // give newdata the chance to catch up with preparedData
                    j++;
                    // but preparedData is 1 longer now, too
                    i++;
                }
            }
        }
        this.ready = this.timeseriesArray.every((e) => e !== undefined);
    }
}
DatasetTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-dataset-table',
                template: `<table *ngIf="ready">
  <thead>
    <tr>
      <th (click)="sort($event)" [attr.data-column-id]="'datetime'" class="sorted-asc">
        Zeit
      </th>
      <th *ngFor="let series of this.timeseriesArray; let i = index" (click)="sort($event)" [attr.data-column-id]="i" [ngStyle]="{ 'border-color': preparedColors[i] }">
        {{series?.label}} [{{series?.uom}}]
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of this.preparedData">
      <td>{{row.datetime | date: 'short'}}</td>
      <td *ngFor="let value of row.values">{{value}}</td>
    </tr>
  </tbody>
</table>
`,
                styles: [`:host{flex:1;overflow-y:scroll;overflow-x:hidden}:host tbody,:host thead tr{display:table;table-layout:fixed;width:100%}:host table{display:block;border-collapse:separate;border-spacing:0 1px}:host thead{display:block;position:-webkit-sticky;position:sticky;top:0;border-spacing:0}:host tr:nth-child(2n){background-color:#eee}:host th{background-color:#a9a9a9;cursor:pointer;border-bottom-width:7px;border-bottom-style:solid;overflow-wrap:break-word}:host th:first-child{border-bottom-color:#a9a9a9}:host th:first-child.sorted-asc,:host th:first-child.sorted-desc{border-bottom-color:#555}:host th.sorted-asc,:host th.sorted-desc{background-color:#555;color:#fff}:host th.sorted-asc:after{content:"\\25B4";float:right}:host th.sorted-desc:after{content:"\\25BE";float:right}:host td{white-space:nowrap;border-bottom:1px solid gray}:host td,:host th{padding:5px 10px}`]
            },] },
];
/** @nocollapse */
DatasetTableComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: Time },
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    DatasetTableComponent.prototype.preparedData;
    /** @type {?} */
    DatasetTableComponent.prototype.preparedColors;
    /** @type {?} */
    DatasetTableComponent.prototype.ready;
    /** @type {?} */
    DatasetTableComponent.prototype.timeseriesArray;
    /** @type {?} */
    DatasetTableComponent.prototype.additionalStylesheet;
    /** @type {?} */
    DatasetTableComponent.prototype.iterableDiffers;
    /** @type {?} */
    DatasetTableComponent.prototype.api;
    /** @type {?} */
    DatasetTableComponent.prototype.datasetIdResolver;
    /** @type {?} */
    DatasetTableComponent.prototype.timeSrvc;
    /** @type {?} */
    DatasetTableComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LXRhYmxlL2RhdGFzZXQtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsbUJBQW1CLEVBRW5CLHlCQUF5QixFQUV6QixpQkFBaUIsRUFDakIsSUFBSSxHQUVMLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBeUJ4RSxNQUFNLDRCQUE2QixTQUFRLHlCQUE4Qzs7Ozs7Ozs7SUFjdkYsWUFDWSxlQUFnQyxFQUNoQyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsUUFBYyxFQUNkLGFBQStCO1FBRXpDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQU45RCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQWtCOzRCQVpELEtBQUssRUFBRTs4QkFDZixLQUFLLEVBQUU7cUJBQzFCLEtBQUs7K0JBRW1CLElBQUksS0FBSyxFQUFFO0tBV2pEOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxvQkFBb0Is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QkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsbzJCQUFvMkIsQ0FBQzthQUMvMkI7Ozs7WUFsQ21CLGVBQWU7WUFFakMsbUJBQW1CO1lBSW5CLGlCQUFpQjtZQUNqQixJQUFJO1lBR29CLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSXRlcmFibGVEaWZmZXJzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gIERhdGFzZXRPcHRpb25zLFxuICBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50LFxuICBEYXRhc2V0VGFibGVEYXRhLFxuICBJbnRlcm5hbElkSGFuZGxlcixcbiAgVGltZSxcbiAgVGltZXNlcmllcyxcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZGF0YXNldC10YWJsZScsXG4gIHRlbXBsYXRlOiBgPHRhYmxlICpuZ0lmPVwicmVhZHlcIj5cbiAgPHRoZWFkPlxuICAgIDx0cj5cbiAgICAgIDx0aCAoY2xpY2spPVwic29ydCgkZXZlbnQpXCIgW2F0dHIuZGF0YS1jb2x1bW4taWRdPVwiJ2RhdGV0aW1lJ1wiIGNsYXNzPVwic29ydGVkLWFzY1wiPlxuICAgICAgICBaZWl0XG4gICAgICA8L3RoPlxuICAgICAgPHRoICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgdGhpcy50aW1lc2VyaWVzQXJyYXk7IGxldCBpID0gaW5kZXhcIiAoY2xpY2spPVwic29ydCgkZXZlbnQpXCIgW2F0dHIuZGF0YS1jb2x1bW4taWRdPVwiaVwiIFtuZ1N0eWxlXT1cInsgJ2JvcmRlci1jb2xvcic6IHByZXBhcmVkQ29sb3JzW2ldIH1cIj5cbiAgICAgICAge3tzZXJpZXM/LmxhYmVsfX0gW3t7c2VyaWVzPy51b219fV1cbiAgICAgIDwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHRoaXMucHJlcGFyZWREYXRhXCI+XG4gICAgICA8dGQ+e3tyb3cuZGF0ZXRpbWUgfCBkYXRlOiAnc2hvcnQnfX08L3RkPlxuICAgICAgPHRkICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiByb3cudmFsdWVzXCI+e3t2YWx1ZX19PC90ZD5cbiAgICA8L3RyPlxuICA8L3Rib2R5PlxuPC90YWJsZT5cbmAsXG4gIHN0eWxlczogW2A6aG9zdHtmbGV4OjE7b3ZlcmZsb3cteTpzY3JvbGw7b3ZlcmZsb3cteDpoaWRkZW59Omhvc3QgdGJvZHksOmhvc3QgdGhlYWQgdHJ7ZGlzcGxheTp0YWJsZTt0YWJsZS1sYXlvdXQ6Zml4ZWQ7d2lkdGg6MTAwJX06aG9zdCB0YWJsZXtkaXNwbGF5OmJsb2NrO2JvcmRlci1jb2xsYXBzZTpzZXBhcmF0ZTtib3JkZXItc3BhY2luZzowIDFweH06aG9zdCB0aGVhZHtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOi13ZWJraXQtc3RpY2t5O3Bvc2l0aW9uOnN0aWNreTt0b3A6MDtib3JkZXItc3BhY2luZzowfTpob3N0IHRyOm50aC1jaGlsZCgybil7YmFja2dyb3VuZC1jb2xvcjojZWVlfTpob3N0IHRoe2JhY2tncm91bmQtY29sb3I6I2E5YTlhOTtjdXJzb3I6cG9pbnRlcjtib3JkZXItYm90dG9tLXdpZHRoOjdweDtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO292ZXJmbG93LXdyYXA6YnJlYWstd29yZH06aG9zdCB0aDpmaXJzdC1jaGlsZHtib3JkZXItYm90dG9tLWNvbG9yOiNhOWE5YTl9Omhvc3QgdGg6Zmlyc3QtY2hpbGQuc29ydGVkLWFzYyw6aG9zdCB0aDpmaXJzdC1jaGlsZC5zb3J0ZWQtZGVzY3tib3JkZXItYm90dG9tLWNvbG9yOiM1NTV9Omhvc3QgdGguc29ydGVkLWFzYyw6aG9zdCB0aC5zb3J0ZWQtZGVzY3tiYWNrZ3JvdW5kLWNvbG9yOiM1NTU7Y29sb3I6I2ZmZn06aG9zdCB0aC5zb3J0ZWQtYXNjOmFmdGVye2NvbnRlbnQ6XCJcXFxcMjVCNFwiO2Zsb2F0OnJpZ2h0fTpob3N0IHRoLnNvcnRlZC1kZXNjOmFmdGVye2NvbnRlbnQ6XCJcXFxcMjVCRVwiO2Zsb2F0OnJpZ2h0fTpob3N0IHRke3doaXRlLXNwYWNlOm5vd3JhcDtib3JkZXItYm90dG9tOjFweCBzb2xpZCBncmF5fTpob3N0IHRkLDpob3N0IHRoe3BhZGRpbmc6NXB4IDEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YXNldFRhYmxlQ29tcG9uZW50IGV4dGVuZHMgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudDxEYXRhc2V0T3B0aW9ucywgYW55PiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qXG4gICAgVGhlIGNvbXBvbmVudCBleHRlbmRzIERhdGFzZXRHcmFwaENvbXBvbmVudCwgYnV0IGltcGxlbWVudHMgb25seSBwYXJ0cyBvZiB0aGF0IGNvbXBvbmVudHMgaW5wdXRzIGFuZCBvdXRwdXRzLlxuICAgIEltcGxlbWVudGVkOiBkYXRhc2V0SWRzLCB0aW1lSW50ZXJ2YWwsIHNlbGVjdGVkRGF0YXNldElkcyBhbmQgZGF0YXNldE9wdGlvbnMgaW5wdXRzOyBubyBvdXRwdXRzXG4gICAgTm90IGltcGxlbWVudGVkOiBncmFwaE9wdGlvbnMgaW5wdXQ7IGFsbCBvdXRwdXRzIChvbkRhdGFzZXRTZWxlY3RlZCwgb25UaW1lc3BhbkNoYW5nZWQsIG9uTWVzc2FnZVRocm93biwgb25Mb2FkaW5nKVxuICAqL1xuXG4gIHB1YmxpYyBwcmVwYXJlZERhdGE6IERhdGFzZXRUYWJsZURhdGFbXSA9IEFycmF5KCk7XG4gIHB1YmxpYyBwcmVwYXJlZENvbG9yczogc3RyaW5nW10gPSBBcnJheSgpO1xuICBwdWJsaWMgcmVhZHkgPSBmYWxzZTtcblxuICBwdWJsaWMgdGltZXNlcmllc0FycmF5OiBUaW1lc2VyaWVzW10gPSBuZXcgQXJyYXkoKTtcbiAgcHJpdmF0ZSBhZGRpdGlvbmFsU3R5bGVzaGVldDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaXRlcmFibGVEaWZmZXJzLCBhcGksIGRhdGFzZXRJZFJlc29sdmVyLCB0aW1lU3J2YywgdHJhbnNsYXRlU3J2Yyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZElkc1N0eWxlc2hlZXQnKTtcbiAgICBpZiAoIXRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQpIHtcbiAgICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pZCA9ICdzZWxlY3RlZElkc1N0eWxlc2hlZXQnO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0KTtcbiAgICB9XG4gIH1cblxuICAvKiBjYWxsZWQgd2hlbiB1c2VyIGNsaWNrcyBvbiB0YWJsZSBoZWFkZXJzICovXG4gIHB1YmxpYyBzb3J0KGV2ZW50OiBhbnkpIHtcbiAgICAvLyBjYW4gYmUgJ2RhdGV0aW1lJyBvciBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gaW4gdGhlIHZhbHVlcyBhcnJheVxuICAgIGNvbnN0IGJ5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uSWQ7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc29ydGVkLWFzYycpID8gJ2Rlc2MnIDogJ2FzYyc7XG4gICAgY29uc3QgZGlyZWN0aW9uTnVtYmVyID0gKGRpcmVjdGlvbiA9PT0gJ2FzYycgPyAxIDogLTEpO1xuXG4gICAgLy8gc2V0IENTUyBjbGFzc2VzXG4gICAgQXJyYXkuZnJvbShldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaCgoY2hpbGQ6IEVsZW1lbnQpID0+IGNoaWxkLmNsYXNzTmFtZSA9ICcnKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnYXNjJykge1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdzb3J0ZWQtYXNjJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIChldmVudC50YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnc29ydGVkLWRlc2MnKTtcbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgY29ycmVjdCBjYWxsYmFjayBmdW5jdGlvbiBmb3Igc29ydCBtZXRob2RcbiAgICBsZXQgc29ydENhbGxiYWNrO1xuICAgIGlmIChieSA9PT0gJ2RhdGV0aW1lJykge1xuICAgICAgc29ydENhbGxiYWNrID0gKGUxOiBhbnksIGUyOiBhbnkpID0+IGRpcmVjdGlvbk51bWJlciAqIChlMS5kYXRldGltZSAtIGUyLmRhdGV0aW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChieSwgMTApO1xuICAgICAgLy8gYmFzaWNhbGx5IHRoZSBzYW1lIGFzIGFib3ZlLCBidXQgdGFrZSBjYXJlIG9mICd1bmRlZmluZWQnIHZhbHVlc1xuICAgICAgc29ydENhbGxiYWNrID0gKGUxOiBhbnksIGUyOiBhbnkpID0+XG4gICAgICAgIChlMS52YWx1ZXNbaW5kZXhdID09PSB1bmRlZmluZWQgPyAxIDpcbiAgICAgICAgICAoZTIudmFsdWVzW2luZGV4XSA9PT0gdW5kZWZpbmVkID8gLTEgOlxuICAgICAgICAgICAgKGRpcmVjdGlvbk51bWJlciAqIChlMS52YWx1ZXNbaW5kZXhdIC0gZTIudmFsdWVzW2luZGV4XSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGRvIHRoZSBzb3J0XG4gICAgdGhpcy5wcmVwYXJlZERhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5zb3J0KHNvcnRDYWxsYmFjayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHsgfVxuXG4gIHB1YmxpYyByZWxvYWREYXRhRm9yRGF0YXNldHMoZGF0YXNldElkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IGFueSkge1xuICAgIC8vIG9ubHkgaW5jbHVkZWQgYmVjYXVzZSBpdCdzIHJlcXVpcmVkIGJ5IGFic3RyYWN0IHBhcmVudCBjbGFzcyAod291bGRuJ3QgY29tcGlsZSB3aXRob3V0KVxuICAgIC8vIG5vIHBvaW50IGluIGltcGxlbWVudGluZyB0aGlzIG1ldGhvZCBpbiBhIG5vbi1ncmFwaGluZyBjb21wb25lbnRcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgIC8vIGhlbHBlciBtZXRob2RcbiAgICByZXR1cm4gdGhpcy5kYXRhc2V0SWRzLmluZGV4T2YoaW50ZXJuYWxJZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBxdWl0ZSBmYWlybHkgdGVzdGVkXG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTC5zcGxpdCgnXFxyXFxuJyk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgcnVsZXNbaW5kZXhdID0gJ3RkOm50aC1jaGlsZCgnICsgKGluZGV4ICsgMikgKyAnKSB7Zm9udC13ZWlnaHQ6IGJvbGR9JztcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTCA9IHJ1bGVzLmpvaW4oJ1xcclxcbicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gZmFpcmx5IHRlc3RlZFxuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwuc3BsaXQoJ1xcclxcbicpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgIHJ1bGVzW2luZGV4XSA9ICcnO1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MID0gcnVsZXMuam9pbignXFxyXFxuJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdGltZUludGVydmFsQ2hhbmdlcygpIHtcbiAgICAvLyB0aGUgZWFzaWVzdCBtZXRob2Q6IGRlbGV0ZSBldmVyeXRoaW5nIGFuZCBidWlsZCBwcmVwYXJlZERhdGEgZnJvbSBzY3JhdGNoLlxuICAgIHRoaXMucHJlcGFyZWREYXRhID0gW107XG4gICAgdGhpcy50aW1lc2VyaWVzQXJyYXkuZm9yRWFjaCgodGltZXNlcmllcykgPT4gdGhpcy5sb2FkVHNEYXRhKHRpbWVzZXJpZXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZykge1xuICAgIC8vIGZhaXJseSB0ZXN0ZWRcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcblxuICAgIC8vIHJlbW92ZSBlbnRyaWVzIG9mIHRoaXMgZGF0YXNldCBpbiBlYWNoIGRhdGV0aW1lJ3MgYHZhbHVlc2AgYXJyYXlzXG4gICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZSkgPT4gZS52YWx1ZXMuc3BsaWNlKGluZGV4LCAxKSk7XG4gICAgLy8gaWYgYSBkYXRldGltZSBiZWNhbWUgY29tcGxldGVseSBlbXB0eSAoaS5lLiB0aGVyZSdzIG9ubHkgYHVuZGVmaW5lZGBzIGluIHRoZSBgdmFsdWVzYCBhcnJheSwgZGVsZXRlIHRoaXMgZGF0ZXRpbWUpXG4gICAgdGhpcy5wcmVwYXJlZERhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maWx0ZXIoKGUpID0+IGUudmFsdWVzLnJlZHVjZSgoYSwgYykgPT4gYSB8fCBjLCB1bmRlZmluZWQpICE9PSB1bmRlZmluZWQpO1xuXG4gICAgdGhpcy5wcmVwYXJlZENvbG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgY29uc3QgcnVsZXMgPSB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTC5zcGxpdCgnXFxyXFxuJyk7XG4gICAgcnVsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTCA9IHJ1bGVzLmpvaW4oJ1xcclxcbicpO1xuXG4gICAgdGhpcy50aW1lc2VyaWVzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheS5sZW5ndGggKz0gMTsgIC8vIGNyZWF0ZSBuZXcgZW1wdHkgc2xvdFxuICAgIHRoaXMucHJlcGFyZWRDb2xvcnMucHVzaCgnZGFya2dyZXknKTtcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTCArPSAnXFxyXFxuJztcbiAgICB0aGlzLmFwaS5nZXRTaW5nbGVUaW1lc2VyaWVzKGludGVybmFsSWQsIHVybClcbiAgICAgIC5zdWJzY3JpYmUoKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXMpID0+IHRoaXMuYWRkVGltZXNlcmllcyh0aW1lc2VyaWVzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50aW1lc2VyaWVzQXJyYXkuc29tZSgoZSkgPT4gZSAhPT0gdW5kZWZpbmVkICYmIGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgICAgdGhpcy5wcmVwYXJlZENvbG9yc1tpbmRleF0gPSBvcHRpb25zLmNvbG9yO1xuICAgICAgLy8gVE9ETy1DRjogUGFnZSBpc24ndCByZWZyZXNoZWQgaW5zdGFudGx5LCBidXQgb25seSBhZnRlciB0aGUgbmV4dCBzb3J0IChvciBwb3NzaWJsZSBvdGhlciBhY3Rpb25zIGFzIHdlbGwpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgIC8vIFRPRE8tQ0Y6IG5lZWRlZD8/Pz8gcHJvYmFibHkgbm90XG4gIH1cblxuICBwcml2YXRlIGFkZFRpbWVzZXJpZXModGltZXNlcmllczogVGltZXNlcmllcykge1xuICAgIHRoaXMudGltZXNlcmllc0FycmF5W3RoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZCh0aW1lc2VyaWVzLmludGVybmFsSWQpXSA9IHRpbWVzZXJpZXM7XG4gICAgdGhpcy5sb2FkVHNEYXRhKHRpbWVzZXJpZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkVHNEYXRhKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXMpIHtcbiAgICBpZiAodGhpcy50aW1lc3Bhbikge1xuICAgICAgLy8gY29uc3QgZGF0YXNldE9wdGlvbnMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldCh0aW1lc2VyaWVzLmludGVybmFsSWQpO1xuICAgICAgdGhpcy5hcGkuZ2V0VHNEYXRhPFtudW1iZXIsIG51bWJlcl0+KHRpbWVzZXJpZXMuaWQsIHRpbWVzZXJpZXMudXJsLCB0aGlzLnRpbWVzcGFuLCB7IGZvcm1hdDogJ2Zsb3QnIH0pXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIC8vIGJyaW5nIHJlc3VsdCBpbnRvIEFycmF5PERhdGFzZXRUYWJsZURhdGE+IGZvcm1hdCBhbmQgcGFzcyB0byBwcmVwYXJlRGF0YVxuICAgICAgICAgIC8vIGNvbnZlbnRpb24gZm9yIGxheW91dCBvZiBuZXdkYXRhIGFyZ3VtZW50OiBzZWUgMy1saW5lLWNvbW1lbnQgaW4gcHJlcGFyZURhdGEgZnVuY3Rpb25cbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZCh0aW1lc2VyaWVzLmludGVybmFsSWQpO1xuICAgICAgICAgIHRoaXMucHJlcGFyZURhdGEodGltZXNlcmllcywgcmVzdWx0LnZhbHVlcy5tYXAoKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBuZXcgQXJyYXkodGhpcy5kYXRhc2V0SWRzLmxlbmd0aCkuZmlsbCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgYVtpbmRleF0gPSBlWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0ZXRpbWU6IGVbMF0sIHZhbHVlczogYSB9O1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlRGF0YSh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzLCBuZXdkYXRhOiBEYXRhc2V0VGFibGVEYXRhW10pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZCh0aW1lc2VyaWVzLmludGVybmFsSWQpO1xuXG4gICAgLy8gaWYgZGF0YXNldE9wdGlvbnMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlaXIgY29sb3IgdG8gc3R5bGUgdGhlIGhlYWRlcidzIFwiY29sb3IgYmFuZFwiIChpLmUuIHRoZSA3cHggYm9yZGVyLWJvdHRvbSBvZiB0aClcbiAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucykge1xuICAgICAgY29uc3QgZGF0YXNldE9wdGlvbnMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldCh0aW1lc2VyaWVzLmludGVybmFsSWQpO1xuICAgICAgdGhpcy5wcmVwYXJlZENvbG9yc1tpbmRleF0gPSBkYXRhc2V0T3B0aW9ucy5jb2xvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2hlbiBubyBjb2xvciBpcyBzcGVjaWZpZWQ6IG1ha2UgYm9yZGVyIHRyYW5zcGFyZW50IHNvIHRoZSBoZWFkZXIncyBiYWNrZ3JvdW5kIGNvbG9yIGlzIHVzZWQgZm9yIHRoZSBjb2xvciBiYW5kLCB0b29cbiAgICAgIHRoaXMucHJlcGFyZWRDb2xvcnNbaW5kZXhdID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCkgIT09IC0xKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkSWQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICB9XG5cbiAgICAvLyBgbmV3ZGF0YWAgaXMgZXhwZWN0ZWQgaW4gZXhhY3RseSB0aGUgc2FtZSBmb3JtYXQgYHByZXBhcmVkRGF0YWAgd291bGQgbG9vayBsaWtlIGlmIHRoYXQgdGltZXNlcmllcyB3YXMgdGhlIG9ubHkgb25lXG4gICAgLy8gdG8gYWN0dWFsbHkgaGF2ZSBkYXRhIChpLmUuIGB2YWx1ZXNgIGhhcyB0aGUgbGVuZ3RoIG9mIHRpbWVzZXJpZXNBcnJheSwgYnV0IGFsbCBzbG90cyBhcmUgYHVuZGVmaW5lZGAsIGV4Y2VwdCBmb3JcbiAgICAvLyB0aGUgc2xvdCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoYXQgdGltZXNlcmllcylcblxuICAgIC8vIGB0aW1lc2VyaWVzYCBpcyBmaXJzdCB0aW1lc2VyaWVzIGFkZGVkIC0+IG5vIG90aGVyIGBwcmVwYXJlZERhdGFgIHRvIG1lcmdlIHdpdGhcbiAgICBpZiAodGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBzZXQgbmV3ZGF0YSBhcyBwcmVwYXJlZERhdGEgKGFzIHBlciBhYm92ZSlcbiAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gbmV3ZGF0YTtcblxuICAgICAgLy8gYHRpbWVzZXJpZXNgIGlzIG5vdCB0aGUgZmlyc3QgdGltZXNlcmllcyBhZGRlZCAtPiB3ZSBoYXZlIHRvIG1lcmdlIGBuZXdkYXRhYCBpbnRvIHRoZSBleGlzdGluZyBgcHJlcGFyZWREYXRhYFxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaSA9IDA7ICAvLyBsb29wIHZhcmlhYmxlIGZvciBgcHJlcGFyZWREYXRhYFxuICAgICAgbGV0IGogPSAwOyAgLy8gbG9vcCB2YXJpYWJsZSBmb3IgYG5ld2RhdGFgXG5cbiAgICAgIC8vIGdvIHRocm91Z2ggYWxsIGRhdGEgcG9pbnRzIGluIGBuZXdkYXRhYFxuICAgICAgd2hpbGUgKGogPCBuZXdkYXRhLmxlbmd0aCkge1xuXG4gICAgICAgIC8vIHRpbWVzdGFtcHMgbWF0Y2hcbiAgICAgICAgaWYgKHRoaXMucHJlcGFyZWREYXRhW2ldICYmIHRoaXMucHJlcGFyZWREYXRhW2ldLmRhdGV0aW1lID09PSBuZXdkYXRhW2pdLmRhdGV0aW1lKSB7XG4gICAgICAgICAgLy8ganVzdCBhZGQgYG5ld2RhdGFgJ3MgdmFsdWUgdG8gdGhlIGV4aXN0aW5nIGB2YWx1ZXNgIGFycmF5IGluIGBwcmVwYXJlZERhdGFgXG4gICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGFbaV0udmFsdWVzW2luZGV4XSA9IG5ld2RhdGFbal0udmFsdWVzW2luZGV4XTtcbiAgICAgICAgICAvLyBpbmNyZW1lbnQgYm90aFxuICAgICAgICAgIGkrKztcbiAgICAgICAgICBqKys7XG5cbiAgICAgICAgICAvLyBgbmV3ZGF0YWAgaXMgYWhlYWQgb2YgYHByZXBhcmVkRGF0YWBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXBhcmVkRGF0YVtpXSAmJiB0aGlzLnByZXBhcmVkRGF0YVtpXS5kYXRldGltZSA8IG5ld2RhdGFbal0uZGF0ZXRpbWUpIHtcbiAgICAgICAgICAvLyBkbyBub3RoaW5nIGJlY2F1c2UgdGhlcmUncyBhbHJlYWR5IGFuIHVuZGVmaW5lZCB0aGVyZVxuICAgICAgICAgIC8vIGdpdmUgcHJlcGFyZWREYXRhIHRoZSBjaGFuY2UgdG8gY2F0Y2ggdXAgd2l0aCBuZXdkYXRhXG4gICAgICAgICAgaSsrO1xuXG4gICAgICAgICAgLy8gYHByZXBhcmVkRGF0YWAgaXMgYWhlYWQgb2YgYG5ld2RhdGFgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGhlIGN1cnJlbnQgYG5ld2RhdGFgIGlzIHRoZSBmaXJzdCBkYXRhc2V0IHRoYXQgaGFzIHRoaXMgZGF0ZXRpbWUgLT4gYWRkIGl0IHRvIHRoZSBwcmVwYXJlZERhdGEgYXJyYXlcbiAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5zcGxpY2UoaSwgMCwgbmV3ZGF0YVtqXSk7XG4gICAgICAgICAgLy8gZ2l2ZSBuZXdkYXRhIHRoZSBjaGFuY2UgdG8gY2F0Y2ggdXAgd2l0aCBwcmVwYXJlZERhdGFcbiAgICAgICAgICBqKys7XG4gICAgICAgICAgLy8gYnV0IHByZXBhcmVkRGF0YSBpcyAxIGxvbmdlciBub3csIHRvb1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVhZHkgPSB0aGlzLnRpbWVzZXJpZXNBcnJheS5ldmVyeSgoZSkgPT4gZSAhPT0gdW5kZWZpbmVkKTtcbiAgfVxufVxuIl19