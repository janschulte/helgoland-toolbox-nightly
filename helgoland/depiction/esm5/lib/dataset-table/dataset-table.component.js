/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, IterableDiffers } from '@angular/core';
import { DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
var DatasetTableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DatasetTableComponent, _super);
    function DatasetTableComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
        var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.translateSrvc = translateSrvc;
        _this.preparedData = Array();
        _this.preparedColors = Array();
        _this.ready = false;
        _this.timeseriesArray = new Array();
        return _this;
    }
    /**
     * @return {?}
     */
    DatasetTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.additionalStylesheet = document.getElementById('selectedIdsStylesheet');
        if (!this.additionalStylesheet) {
            this.additionalStylesheet = document.createElement('style');
            this.additionalStylesheet.id = 'selectedIdsStylesheet';
            document.body.appendChild(this.additionalStylesheet);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatasetTableComponent.prototype.sort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var by = event.target.dataset.columnId;
        /** @type {?} */
        var direction = event.target.classList.contains('sorted-asc') ? 'desc' : 'asc';
        /** @type {?} */
        var directionNumber = (direction === 'asc' ? 1 : -1);
        // set CSS classes
        Array.from(event.target.parentElement.children).forEach(function (child) { return child.className = ''; });
        if (direction === 'asc') {
            (/** @type {?} */ (event.target)).classList.add('sorted-asc');
        }
        else {
            (/** @type {?} */ (event.target)).classList.add('sorted-desc');
        }
        /** @type {?} */
        var sortCallback;
        if (by === 'datetime') {
            sortCallback = function (e1, e2) { return directionNumber * (e1.datetime - e2.datetime); };
        }
        else {
            /** @type {?} */
            var index_1 = parseInt(by, 10);
            // basically the same as above, but take care of 'undefined' values
            sortCallback = function (e1, e2) {
                return (e1.values[index_1] === undefined ? 1 :
                    (e2.values[index_1] === undefined ? -1 :
                        (directionNumber * (e1.values[index_1] - e2.values[index_1]))));
            };
        }
        // do the sort
        this.preparedData = this.preparedData.sort(sortCallback);
    };
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    DatasetTableComponent.prototype.onLanguageChanged = /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    function (langChangeEvent) { };
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    DatasetTableComponent.prototype.reloadDataForDatasets = /**
     * @param {?} datasetIds
     * @return {?}
     */
    function (datasetIds) {
        // console.log('reload data at ' + new Date());
    };
    /**
     * @param {?} options
     * @return {?}
     */
    DatasetTableComponent.prototype.presenterOptionsChanged = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        // only included because it's required by abstract parent class (wouldn't compile without)
        // no point in implementing this method in a non-graphing component
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.getIndexFromInternalId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        // helper method
        return this.datasetIds.indexOf(internalId);
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.setSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        var index = this.getIndexFromInternalId(internalId);
        rules[index] = 'td:nth-child(' + (index + 2) + ') {font-weight: bold}';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.removeSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var rules = this.additionalStylesheet.innerHTML.split('\r\n');
        /** @type {?} */
        var index = this.getIndexFromInternalId(internalId);
        rules[index] = '';
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
    };
    /**
     * @return {?}
     */
    DatasetTableComponent.prototype.timeIntervalChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // the easiest method: delete everything and build preparedData from scratch.
        this.preparedData = [];
        this.timeseriesArray.forEach(function (timeseries) { return _this.loadTsData(timeseries); });
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetTableComponent.prototype.removeDataset = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var index = this.getIndexFromInternalId(internalId);
        // remove entries of this dataset in each datetime's `values` arrays
        this.preparedData.forEach(function (e) { return e.values.splice(index, 1); });
        // if a datetime became completely empty (i.e. there's only `undefined`s in the `values` array, delete this datetime)
        this.preparedData = this.preparedData.filter(function (e) { return e.values.reduce(function (a, c) { return a || c; }, undefined) !== undefined; });
        this.preparedColors.splice(index, 1);
        /** @type {?} */
        var rules = this.additionalStylesheet.innerHTML.split('\r\n');
        rules.splice(index, 1);
        this.additionalStylesheet.innerHTML = rules.join('\r\n');
        this.timeseriesArray.splice(index, 1);
    };
    /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    DatasetTableComponent.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    function (internalId, url) {
        var _this = this;
        this.timeseriesArray.length += 1; // create new empty slot
        this.preparedColors.push('darkgrey');
        this.additionalStylesheet.innerHTML += '\r\n';
        this.api.getSingleTimeseries(internalId, url)
            .subscribe(function (timeseries) { return _this.addTimeseries(timeseries); });
    };
    /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    DatasetTableComponent.prototype.datasetOptionsChanged = /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    function (internalId, options) {
        if (this.timeseriesArray.some(function (e) { return e !== undefined && e.internalId === internalId; })) {
            /** @type {?} */
            var index = this.getIndexFromInternalId(internalId);
            this.preparedColors[index] = options.color;
            // TODO-CF: Page isn't refreshed instantly, but only after the next sort (or possible other actions as well)
        }
    };
    /**
     * @return {?}
     */
    DatasetTableComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        // TODO-CF: needed???? probably not
    };
    /**
     * @param {?} timeseries
     * @return {?}
     */
    DatasetTableComponent.prototype.addTimeseries = /**
     * @param {?} timeseries
     * @return {?}
     */
    function (timeseries) {
        this.timeseriesArray[this.getIndexFromInternalId(timeseries.internalId)] = timeseries;
        this.loadTsData(timeseries);
    };
    /**
     * @param {?} timeseries
     * @return {?}
     */
    DatasetTableComponent.prototype.loadTsData = /**
     * @param {?} timeseries
     * @return {?}
     */
    function (timeseries) {
        var _this = this;
        if (this.timespan) {
            // const datasetOptions = this.datasetOptions.get(timeseries.internalId);
            this.api.getTsData(timeseries.id, timeseries.url, this.timespan, { format: 'flot' })
                .subscribe(function (result) {
                /** @type {?} */
                var index = _this.getIndexFromInternalId(timeseries.internalId);
                _this.prepareData(timeseries, result.values.map(function (e) {
                    /** @type {?} */
                    var a = new Array(_this.datasetIds.length).fill(undefined);
                    a[index] = e[1];
                    return { datetime: e[0], values: a };
                }));
            });
        }
    };
    /**
     * @param {?} timeseries
     * @param {?} newdata
     * @return {?}
     */
    DatasetTableComponent.prototype.prepareData = /**
     * @param {?} timeseries
     * @param {?} newdata
     * @return {?}
     */
    function (timeseries, newdata) {
        /** @type {?} */
        var index = this.getIndexFromInternalId(timeseries.internalId);
        // if datasetOptions are provided, use their color to style the header's "color band" (i.e. the 7px border-bottom of th)
        if (this.datasetOptions) {
            /** @type {?} */
            var datasetOptions = this.datasetOptions.get(timeseries.internalId);
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
            var i = 0;
            /** @type {?} */
            var j = 0; // loop variable for `newdata`
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
        this.ready = this.timeseriesArray.every(function (e) { return e !== undefined; });
    };
    DatasetTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-dataset-table',
                    template: "<table *ngIf=\"ready\">\n  <thead>\n    <tr>\n      <th (click)=\"sort($event)\" [attr.data-column-id]=\"'datetime'\" class=\"sorted-asc\">\n        Zeit\n      </th>\n      <th *ngFor=\"let series of this.timeseriesArray; let i = index\" (click)=\"sort($event)\" [attr.data-column-id]=\"i\" [ngStyle]=\"{ 'border-color': preparedColors[i] }\">\n        {{series?.label}} [{{series?.uom}}]\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of this.preparedData\">\n      <td>{{row.datetime | date: 'short'}}</td>\n      <td *ngFor=\"let value of row.values\">{{value}}</td>\n    </tr>\n  </tbody>\n</table>\n",
                    styles: [":host{flex:1;overflow-y:scroll;overflow-x:hidden}:host tbody,:host thead tr{display:table;table-layout:fixed;width:100%}:host table{display:block;border-collapse:separate;border-spacing:0 1px}:host thead{display:block;position:-webkit-sticky;position:sticky;top:0;border-spacing:0}:host tr:nth-child(2n){background-color:#eee}:host th{background-color:#a9a9a9;cursor:pointer;border-bottom-width:7px;border-bottom-style:solid;overflow-wrap:break-word}:host th:first-child{border-bottom-color:#a9a9a9}:host th:first-child.sorted-asc,:host th:first-child.sorted-desc{border-bottom-color:#555}:host th.sorted-asc,:host th.sorted-desc{background-color:#555;color:#fff}:host th.sorted-asc:after{content:\"\\25B4\";float:right}:host th.sorted-desc:after{content:\"\\25BE\";float:right}:host td{white-space:nowrap;border-bottom:1px solid gray}:host td,:host th{padding:5px 10px}"]
                },] },
    ];
    /** @nocollapse */
    DatasetTableComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: TranslateService }
    ]; };
    return DatasetTableComponent;
}(DatasetPresenterComponent));
export { DatasetTableComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0LXRhYmxlL2RhdGFzZXQtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUNMLG1CQUFtQixFQUVuQix5QkFBeUIsRUFFekIsaUJBQWlCLEVBQ2pCLElBQUksR0FFTCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBbUIsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUF5QjdCLGlEQUE4QztJQWN2RiwrQkFDWSxlQUFnQyxFQUNoQyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsUUFBYyxFQUNkLGFBQStCO1FBTDNDLFlBT0Usa0JBQU0sZUFBZSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLFNBQ3hFO1FBUFcscUJBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUcsR0FBSCxHQUFHLENBQXFCO1FBQ3hCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsY0FBUSxHQUFSLFFBQVEsQ0FBTTtRQUNkLG1CQUFhLEdBQWIsYUFBYSxDQUFrQjs2QkFaRCxLQUFLLEVBQUU7K0JBQ2YsS0FBSyxFQUFFO3NCQUMxQixLQUFLO2dDQUVtQixJQUFJLEtBQUssRUFBRTs7S0FXakQ7Ozs7SUFFTSx3Q0FBUTs7OztRQUNiLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMs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QUM7aUJBQ0w7YUFDRjtTQUNGO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxTQUFTLEVBQWYsQ0FBZSxDQUFDLENBQUM7OztnQkF2UG5FLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUseW5CQWtCWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx3MkJBQW8yQixDQUFDO2lCQUMvMkI7Ozs7Z0JBbENtQixlQUFlO2dCQUVqQyxtQkFBbUI7Z0JBSW5CLGlCQUFpQjtnQkFDakIsSUFBSTtnQkFHb0IsZ0JBQWdCOztnQ0FWMUM7RUFtQzJDLHlCQUF5QjtTQUF2RCxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEl0ZXJhYmxlRGlmZmVycywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICBEYXRhc2V0T3B0aW9ucyxcbiAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgRGF0YXNldFRhYmxlRGF0YSxcbiAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gIFRpbWUsXG4gIFRpbWVzZXJpZXMsXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWRhdGFzZXQtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDx0YWJsZSAqbmdJZj1cInJlYWR5XCI+XG4gIDx0aGVhZD5cbiAgICA8dHI+XG4gICAgICA8dGggKGNsaWNrKT1cInNvcnQoJGV2ZW50KVwiIFthdHRyLmRhdGEtY29sdW1uLWlkXT1cIidkYXRldGltZSdcIiBjbGFzcz1cInNvcnRlZC1hc2NcIj5cbiAgICAgICAgWmVpdFxuICAgICAgPC90aD5cbiAgICAgIDx0aCAqbmdGb3I9XCJsZXQgc2VyaWVzIG9mIHRoaXMudGltZXNlcmllc0FycmF5OyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cInNvcnQoJGV2ZW50KVwiIFthdHRyLmRhdGEtY29sdW1uLWlkXT1cImlcIiBbbmdTdHlsZV09XCJ7ICdib3JkZXItY29sb3InOiBwcmVwYXJlZENvbG9yc1tpXSB9XCI+XG4gICAgICAgIHt7c2VyaWVzPy5sYWJlbH19IFt7e3Nlcmllcz8udW9tfX1dXG4gICAgICA8L3RoPlxuICAgIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keT5cbiAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiB0aGlzLnByZXBhcmVkRGF0YVwiPlxuICAgICAgPHRkPnt7cm93LmRhdGV0aW1lIHwgZGF0ZTogJ3Nob3J0J319PC90ZD5cbiAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgdmFsdWUgb2Ygcm93LnZhbHVlc1wiPnt7dmFsdWV9fTwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3R7ZmxleDoxO292ZXJmbG93LXk6c2Nyb2xsO292ZXJmbG93LXg6aGlkZGVufTpob3N0IHRib2R5LDpob3N0IHRoZWFkIHRye2Rpc3BsYXk6dGFibGU7dGFibGUtbGF5b3V0OmZpeGVkO3dpZHRoOjEwMCV9Omhvc3QgdGFibGV7ZGlzcGxheTpibG9jaztib3JkZXItY29sbGFwc2U6c2VwYXJhdGU7Ym9yZGVyLXNwYWNpbmc6MCAxcHh9Omhvc3QgdGhlYWR7ZGlzcGxheTpibG9jaztwb3NpdGlvbjotd2Via2l0LXN0aWNreTtwb3NpdGlvbjpzdGlja3k7dG9wOjA7Ym9yZGVyLXNwYWNpbmc6MH06aG9zdCB0cjpudGgtY2hpbGQoMm4pe2JhY2tncm91bmQtY29sb3I6I2VlZX06aG9zdCB0aHtiYWNrZ3JvdW5kLWNvbG9yOiNhOWE5YTk7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbS13aWR0aDo3cHg7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmR9Omhvc3QgdGg6Zmlyc3QtY2hpbGR7Ym9yZGVyLWJvdHRvbS1jb2xvcjojYTlhOWE5fTpob3N0IHRoOmZpcnN0LWNoaWxkLnNvcnRlZC1hc2MsOmhvc3QgdGg6Zmlyc3QtY2hpbGQuc29ydGVkLWRlc2N7Ym9yZGVyLWJvdHRvbS1jb2xvcjojNTU1fTpob3N0IHRoLnNvcnRlZC1hc2MsOmhvc3QgdGguc29ydGVkLWRlc2N7YmFja2dyb3VuZC1jb2xvcjojNTU1O2NvbG9yOiNmZmZ9Omhvc3QgdGguc29ydGVkLWFzYzphZnRlcntjb250ZW50OlwiXFxcXDI1QjRcIjtmbG9hdDpyaWdodH06aG9zdCB0aC5zb3J0ZWQtZGVzYzphZnRlcntjb250ZW50OlwiXFxcXDI1QkVcIjtmbG9hdDpyaWdodH06aG9zdCB0ZHt3aGl0ZS1zcGFjZTpub3dyYXA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgZ3JheX06aG9zdCB0ZCw6aG9zdCB0aHtwYWRkaW5nOjVweCAxMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFzZXRUYWJsZUNvbXBvbmVudCBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIGFueT4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKlxuICAgIFRoZSBjb21wb25lbnQgZXh0ZW5kcyBEYXRhc2V0R3JhcGhDb21wb25lbnQsIGJ1dCBpbXBsZW1lbnRzIG9ubHkgcGFydHMgb2YgdGhhdCBjb21wb25lbnRzIGlucHV0cyBhbmQgb3V0cHV0cy5cbiAgICBJbXBsZW1lbnRlZDogZGF0YXNldElkcywgdGltZUludGVydmFsLCBzZWxlY3RlZERhdGFzZXRJZHMgYW5kIGRhdGFzZXRPcHRpb25zIGlucHV0czsgbm8gb3V0cHV0c1xuICAgIE5vdCBpbXBsZW1lbnRlZDogZ3JhcGhPcHRpb25zIGlucHV0OyBhbGwgb3V0cHV0cyAob25EYXRhc2V0U2VsZWN0ZWQsIG9uVGltZXNwYW5DaGFuZ2VkLCBvbk1lc3NhZ2VUaHJvd24sIG9uTG9hZGluZylcbiAgKi9cblxuICBwdWJsaWMgcHJlcGFyZWREYXRhOiBEYXRhc2V0VGFibGVEYXRhW10gPSBBcnJheSgpO1xuICBwdWJsaWMgcHJlcGFyZWRDb2xvcnM6IHN0cmluZ1tdID0gQXJyYXkoKTtcbiAgcHVibGljIHJlYWR5ID0gZmFsc2U7XG5cbiAgcHVibGljIHRpbWVzZXJpZXNBcnJheTogVGltZXNlcmllc1tdID0gbmV3IEFycmF5KCk7XG4gIHByaXZhdGUgYWRkaXRpb25hbFN0eWxlc2hlZXQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNydmMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZWRJZHNTdHlsZXNoZWV0Jyk7XG4gICAgaWYgKCF0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0KSB7XG4gICAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaWQgPSAnc2VsZWN0ZWRJZHNTdHlsZXNoZWV0JztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldCk7XG4gICAgfVxuICB9XG5cbiAgLyogY2FsbGVkIHdoZW4gdXNlciBjbGlja3Mgb24gdGFibGUgaGVhZGVycyAqL1xuICBwdWJsaWMgc29ydChldmVudDogYW55KSB7XG4gICAgLy8gY2FuIGJlICdkYXRldGltZScgb3IgYW4gaW50ZWdlciBpbmRpY2F0aW5nIHRoZSBpbmRleCBvZiB0aGUgY29sdW1uIGluIHRoZSB2YWx1ZXMgYXJyYXlcbiAgICBjb25zdCBieSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbklkO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NvcnRlZC1hc2MnKSA/ICdkZXNjJyA6ICdhc2MnO1xuICAgIGNvbnN0IGRpcmVjdGlvbk51bWJlciA9IChkaXJlY3Rpb24gPT09ICdhc2MnID8gMSA6IC0xKTtcblxuICAgIC8vIHNldCBDU1MgY2xhc3Nlc1xuICAgIEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkOiBFbGVtZW50KSA9PiBjaGlsZC5jbGFzc05hbWUgPSAnJyk7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIChldmVudC50YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnc29ydGVkLWFzYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ3NvcnRlZC1kZXNjJyk7XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGNvcnJlY3QgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHNvcnQgbWV0aG9kXG4gICAgbGV0IHNvcnRDYWxsYmFjaztcbiAgICBpZiAoYnkgPT09ICdkYXRldGltZScpIHtcbiAgICAgIHNvcnRDYWxsYmFjayA9IChlMTogYW55LCBlMjogYW55KSA9PiBkaXJlY3Rpb25OdW1iZXIgKiAoZTEuZGF0ZXRpbWUgLSBlMi5kYXRldGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoYnksIDEwKTtcbiAgICAgIC8vIGJhc2ljYWxseSB0aGUgc2FtZSBhcyBhYm92ZSwgYnV0IHRha2UgY2FyZSBvZiAndW5kZWZpbmVkJyB2YWx1ZXNcbiAgICAgIHNvcnRDYWxsYmFjayA9IChlMTogYW55LCBlMjogYW55KSA9PlxuICAgICAgICAoZTEudmFsdWVzW2luZGV4XSA9PT0gdW5kZWZpbmVkID8gMSA6XG4gICAgICAgICAgKGUyLnZhbHVlc1tpbmRleF0gPT09IHVuZGVmaW5lZCA/IC0xIDpcbiAgICAgICAgICAgIChkaXJlY3Rpb25OdW1iZXIgKiAoZTEudmFsdWVzW2luZGV4XSAtIGUyLnZhbHVlc1tpbmRleF0pKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBkbyB0aGUgc29ydFxuICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuc29ydChzb3J0Q2FsbGJhY2spO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7IH1cblxuICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ3JlbG9hZCBkYXRhIGF0ICcgKyBuZXcgRGF0ZSgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBhbnkpIHtcbiAgICAvLyBvbmx5IGluY2x1ZGVkIGJlY2F1c2UgaXQncyByZXF1aXJlZCBieSBhYnN0cmFjdCBwYXJlbnQgY2xhc3MgKHdvdWxkbid0IGNvbXBpbGUgd2l0aG91dClcbiAgICAvLyBubyBwb2ludCBpbiBpbXBsZW1lbnRpbmcgdGhpcyBtZXRob2QgaW4gYSBub24tZ3JhcGhpbmcgY29tcG9uZW50XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBoZWxwZXIgbWV0aG9kXG4gICAgcmV0dXJuIHRoaXMuZGF0YXNldElkcy5pbmRleE9mKGludGVybmFsSWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgLy8gcXVpdGUgZmFpcmx5IHRlc3RlZFxuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwuc3BsaXQoJ1xcclxcbicpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEZyb21JbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgIHJ1bGVzW2luZGV4XSA9ICd0ZDpudGgtY2hpbGQoJyArIChpbmRleCArIDIpICsgJykge2ZvbnQtd2VpZ2h0OiBib2xkfSc7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgPSBydWxlcy5qb2luKCdcXHJcXG4nKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgIC8vIGZhaXJseSB0ZXN0ZWRcbiAgICBjb25zdCBydWxlcyA9IHRoaXMuYWRkaXRpb25hbFN0eWxlc2hlZXQuaW5uZXJIVE1MLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICBydWxlc1tpbmRleF0gPSAnJztcbiAgICB0aGlzLmFkZGl0aW9uYWxTdHlsZXNoZWV0LmlubmVySFRNTCA9IHJ1bGVzLmpvaW4oJ1xcclxcbicpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKSB7XG4gICAgLy8gdGhlIGVhc2llc3QgbWV0aG9kOiBkZWxldGUgZXZlcnl0aGluZyBhbmQgYnVpbGQgcHJlcGFyZWREYXRhIGZyb20gc2NyYXRjaC5cbiAgICB0aGlzLnByZXBhcmVkRGF0YSA9IFtdO1xuICAgIHRoaXMudGltZXNlcmllc0FycmF5LmZvckVhY2goKHRpbWVzZXJpZXMpID0+IHRoaXMubG9hZFRzRGF0YSh0aW1lc2VyaWVzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAvLyBmYWlybHkgdGVzdGVkXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG5cbiAgICAvLyByZW1vdmUgZW50cmllcyBvZiB0aGlzIGRhdGFzZXQgaW4gZWFjaCBkYXRldGltZSdzIGB2YWx1ZXNgIGFycmF5c1xuICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGUpID0+IGUudmFsdWVzLnNwbGljZShpbmRleCwgMSkpO1xuICAgIC8vIGlmIGEgZGF0ZXRpbWUgYmVjYW1lIGNvbXBsZXRlbHkgZW1wdHkgKGkuZS4gdGhlcmUncyBvbmx5IGB1bmRlZmluZWRgcyBpbiB0aGUgYHZhbHVlc2AgYXJyYXksIGRlbGV0ZSB0aGlzIGRhdGV0aW1lKVxuICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlKSA9PiBlLnZhbHVlcy5yZWR1Y2UoKGEsIGMpID0+IGEgfHwgYywgdW5kZWZpbmVkKSAhPT0gdW5kZWZpbmVkKTtcblxuICAgIHRoaXMucHJlcGFyZWRDb2xvcnMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwuc3BsaXQoJ1xcclxcbicpO1xuICAgIHJ1bGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgPSBydWxlcy5qb2luKCdcXHJcXG4nKTtcblxuICAgIHRoaXMudGltZXNlcmllc0FycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50aW1lc2VyaWVzQXJyYXkubGVuZ3RoICs9IDE7ICAvLyBjcmVhdGUgbmV3IGVtcHR5IHNsb3RcbiAgICB0aGlzLnByZXBhcmVkQ29sb3JzLnB1c2goJ2RhcmtncmV5Jyk7XG4gICAgdGhpcy5hZGRpdGlvbmFsU3R5bGVzaGVldC5pbm5lckhUTUwgKz0gJ1xcclxcbic7XG4gICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyhpbnRlcm5hbElkLCB1cmwpXG4gICAgICAuc3Vic2NyaWJlKCh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzKSA9PiB0aGlzLmFkZFRpbWVzZXJpZXModGltZXNlcmllcykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRhdGFzZXRPcHRpb25zQ2hhbmdlZChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGltZXNlcmllc0FycmF5LnNvbWUoKGUpID0+IGUgIT09IHVuZGVmaW5lZCAmJiBlLmludGVybmFsSWQgPT09IGludGVybmFsSWQpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhGcm9tSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICAgIHRoaXMucHJlcGFyZWRDb2xvcnNbaW5kZXhdID0gb3B0aW9ucy5jb2xvcjtcbiAgICAgIC8vIFRPRE8tQ0Y6IFBhZ2UgaXNuJ3QgcmVmcmVzaGVkIGluc3RhbnRseSwgYnV0IG9ubHkgYWZ0ZXIgdGhlIG5leHQgc29ydCAob3IgcG9zc2libGUgb3RoZXIgYWN0aW9ucyBhcyB3ZWxsKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAvLyBUT0RPLUNGOiBuZWVkZWQ/Pz8/IHByb2JhYmx5IG5vdFxuICB9XG5cbiAgcHJpdmF0ZSBhZGRUaW1lc2VyaWVzKHRpbWVzZXJpZXM6IFRpbWVzZXJpZXMpIHtcbiAgICB0aGlzLnRpbWVzZXJpZXNBcnJheVt0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQodGltZXNlcmllcy5pbnRlcm5hbElkKV0gPSB0aW1lc2VyaWVzO1xuICAgIHRoaXMubG9hZFRzRGF0YSh0aW1lc2VyaWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFRzRGF0YSh0aW1lc2VyaWVzOiBUaW1lc2VyaWVzKSB7XG4gICAgaWYgKHRoaXMudGltZXNwYW4pIHtcbiAgICAgIC8vIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgIHRoaXMuYXBpLmdldFRzRGF0YTxbbnVtYmVyLCBudW1iZXJdPih0aW1lc2VyaWVzLmlkLCB0aW1lc2VyaWVzLnVybCwgdGhpcy50aW1lc3BhbiwgeyBmb3JtYXQ6ICdmbG90JyB9KVxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAvLyBicmluZyByZXN1bHQgaW50byBBcnJheTxEYXRhc2V0VGFibGVEYXRhPiBmb3JtYXQgYW5kIHBhc3MgdG8gcHJlcGFyZURhdGFcbiAgICAgICAgICAvLyBjb252ZW50aW9uIGZvciBsYXlvdXQgb2YgbmV3ZGF0YSBhcmd1bWVudDogc2VlIDMtbGluZS1jb21tZW50IGluIHByZXBhcmVEYXRhIGZ1bmN0aW9uXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgICAgICB0aGlzLnByZXBhcmVEYXRhKHRpbWVzZXJpZXMsIHJlc3VsdC52YWx1ZXMubWFwKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhID0gbmV3IEFycmF5KHRoaXMuZGF0YXNldElkcy5sZW5ndGgpLmZpbGwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGFbaW5kZXhdID0gZVsxXTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGV0aW1lOiBlWzBdLCB2YWx1ZXM6IGEgfTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZURhdGEodGltZXNlcmllczogVGltZXNlcmllcywgbmV3ZGF0YTogRGF0YXNldFRhYmxlRGF0YVtdKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4RnJvbUludGVybmFsSWQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcblxuICAgIC8vIGlmIGRhdGFzZXRPcHRpb25zIGFyZSBwcm92aWRlZCwgdXNlIHRoZWlyIGNvbG9yIHRvIHN0eWxlIHRoZSBoZWFkZXIncyBcImNvbG9yIGJhbmRcIiAoaS5lLiB0aGUgN3B4IGJvcmRlci1ib3R0b20gb2YgdGgpXG4gICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQodGltZXNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgIHRoaXMucHJlcGFyZWRDb2xvcnNbaW5kZXhdID0gZGF0YXNldE9wdGlvbnMuY29sb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdoZW4gbm8gY29sb3IgaXMgc3BlY2lmaWVkOiBtYWtlIGJvcmRlciB0cmFuc3BhcmVudCBzbyB0aGUgaGVhZGVyJ3MgYmFja2dyb3VuZCBjb2xvciBpcyB1c2VkIGZvciB0aGUgY29sb3IgYmFuZCwgdG9vXG4gICAgICB0aGlzLnByZXBhcmVkQ29sb3JzW2luZGV4XSA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZih0aW1lc2VyaWVzLmludGVybmFsSWQpICE9PSAtMSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZElkKHRpbWVzZXJpZXMuaW50ZXJuYWxJZCk7XG4gICAgfVxuXG4gICAgLy8gYG5ld2RhdGFgIGlzIGV4cGVjdGVkIGluIGV4YWN0bHkgdGhlIHNhbWUgZm9ybWF0IGBwcmVwYXJlZERhdGFgIHdvdWxkIGxvb2sgbGlrZSBpZiB0aGF0IHRpbWVzZXJpZXMgd2FzIHRoZSBvbmx5IG9uZVxuICAgIC8vIHRvIGFjdHVhbGx5IGhhdmUgZGF0YSAoaS5lLiBgdmFsdWVzYCBoYXMgdGhlIGxlbmd0aCBvZiB0aW1lc2VyaWVzQXJyYXksIGJ1dCBhbGwgc2xvdHMgYXJlIGB1bmRlZmluZWRgLCBleGNlcHQgZm9yXG4gICAgLy8gdGhlIHNsb3QgdGhhdCBjb3JyZXNwb25kcyB0byB0aGF0IHRpbWVzZXJpZXMpXG5cbiAgICAvLyBgdGltZXNlcmllc2AgaXMgZmlyc3QgdGltZXNlcmllcyBhZGRlZCAtPiBubyBvdGhlciBgcHJlcGFyZWREYXRhYCB0byBtZXJnZSB3aXRoXG4gICAgaWYgKHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gc2V0IG5ld2RhdGEgYXMgcHJlcGFyZWREYXRhIChhcyBwZXIgYWJvdmUpXG4gICAgICB0aGlzLnByZXBhcmVkRGF0YSA9IG5ld2RhdGE7XG5cbiAgICAgIC8vIGB0aW1lc2VyaWVzYCBpcyBub3QgdGhlIGZpcnN0IHRpbWVzZXJpZXMgYWRkZWQgLT4gd2UgaGF2ZSB0byBtZXJnZSBgbmV3ZGF0YWAgaW50byB0aGUgZXhpc3RpbmcgYHByZXBhcmVkRGF0YWBcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGkgPSAwOyAgLy8gbG9vcCB2YXJpYWJsZSBmb3IgYHByZXBhcmVkRGF0YWBcbiAgICAgIGxldCBqID0gMDsgIC8vIGxvb3AgdmFyaWFibGUgZm9yIGBuZXdkYXRhYFxuXG4gICAgICAvLyBnbyB0aHJvdWdoIGFsbCBkYXRhIHBvaW50cyBpbiBgbmV3ZGF0YWBcbiAgICAgIHdoaWxlIChqIDwgbmV3ZGF0YS5sZW5ndGgpIHtcblxuICAgICAgICAvLyB0aW1lc3RhbXBzIG1hdGNoXG4gICAgICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YVtpXSAmJiB0aGlzLnByZXBhcmVkRGF0YVtpXS5kYXRldGltZSA9PT0gbmV3ZGF0YVtqXS5kYXRldGltZSkge1xuICAgICAgICAgIC8vIGp1c3QgYWRkIGBuZXdkYXRhYCdzIHZhbHVlIHRvIHRoZSBleGlzdGluZyBgdmFsdWVzYCBhcnJheSBpbiBgcHJlcGFyZWREYXRhYFxuICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2ldLnZhbHVlc1tpbmRleF0gPSBuZXdkYXRhW2pdLnZhbHVlc1tpbmRleF07XG4gICAgICAgICAgLy8gaW5jcmVtZW50IGJvdGhcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgaisrO1xuXG4gICAgICAgICAgLy8gYG5ld2RhdGFgIGlzIGFoZWFkIG9mIGBwcmVwYXJlZERhdGFgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmVwYXJlZERhdGFbaV0gJiYgdGhpcy5wcmVwYXJlZERhdGFbaV0uZGF0ZXRpbWUgPCBuZXdkYXRhW2pdLmRhdGV0aW1lKSB7XG4gICAgICAgICAgLy8gZG8gbm90aGluZyBiZWNhdXNlIHRoZXJlJ3MgYWxyZWFkeSBhbiB1bmRlZmluZWQgdGhlcmVcbiAgICAgICAgICAvLyBnaXZlIHByZXBhcmVkRGF0YSB0aGUgY2hhbmNlIHRvIGNhdGNoIHVwIHdpdGggbmV3ZGF0YVxuICAgICAgICAgIGkrKztcblxuICAgICAgICAgIC8vIGBwcmVwYXJlZERhdGFgIGlzIGFoZWFkIG9mIGBuZXdkYXRhYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoZSBjdXJyZW50IGBuZXdkYXRhYCBpcyB0aGUgZmlyc3QgZGF0YXNldCB0aGF0IGhhcyB0aGlzIGRhdGV0aW1lIC0+IGFkZCBpdCB0byB0aGUgcHJlcGFyZWREYXRhIGFycmF5XG4gICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKGksIDAsIG5ld2RhdGFbal0pO1xuICAgICAgICAgIC8vIGdpdmUgbmV3ZGF0YSB0aGUgY2hhbmNlIHRvIGNhdGNoIHVwIHdpdGggcHJlcGFyZWREYXRhXG4gICAgICAgICAgaisrO1xuICAgICAgICAgIC8vIGJ1dCBwcmVwYXJlZERhdGEgaXMgMSBsb25nZXIgbm93LCB0b29cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlYWR5ID0gdGhpcy50aW1lc2VyaWVzQXJyYXkuZXZlcnkoKGUpID0+IGUgIT09IHVuZGVmaW5lZCk7XG4gIH1cbn1cbiJdfQ==