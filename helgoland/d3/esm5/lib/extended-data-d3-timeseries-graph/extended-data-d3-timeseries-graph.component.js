/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, IterableDiffers, ViewEncapsulation, } from '@angular/core';
import { ColorService, DatasetApiInterface, InternalIdHandler, Time } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { extent } from 'd3';
import { D3TimeseriesGraphComponent, } from '../d3-timeseries-graph/d3-timeseries-graph.component';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
/**
 * Additional Data which can be add to the component {\@link ExtendedDataD3TimeseriesGraphComponent} as Input.
 * One of the optional properties 'linkedDatasetId' and 'yaxisLabel' is mandatory.
 * @record
 */
export function AdditionalData() { }
/**
 * Linked to an existing dataset in the graph component and uses it dataset options if no other datasetoptions are presented.
 * @type {?|undefined}
 */
AdditionalData.prototype.linkedDatasetId;
/**
 * Y-Axis label if no link to an existing dataset is given.
 * @type {?|undefined}
 */
AdditionalData.prototype.yaxisLabel;
/**
 * The dataset options, which describes the styling of the additional data.
 * @type {?|undefined}
 */
AdditionalData.prototype.datasetOptions;
/**
 * The additional data arrey with tupels of timestamp and value.
 * @type {?}
 */
AdditionalData.prototype.data;
/**
 * Additional data entry tuple
 * @record
 */
export function AdditionalDataEntry() { }
/** @type {?} */
AdditionalDataEntry.prototype.timestamp;
/** @type {?} */
AdditionalDataEntry.prototype.value;
/**
 * Extends the common d3 component, with the ability to add additional data to the graph. To set or change  additional data, allways sets the complete array of data new. The componet just redraws if
 * the array is reset.
 */
var ExtendedDataD3TimeseriesGraphComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExtendedDataD3TimeseriesGraphComponent, _super);
    function ExtendedDataD3TimeseriesGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, timeFormatLocaleService, colorService, translateService) {
        var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, timeFormatLocaleService, colorService, translateService) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.timeFormatLocaleService = timeFormatLocaleService;
        _this.colorService = colorService;
        _this.translateService = translateService;
        _this.additionalData = [];
        _this.additionalPreparedData = [];
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ExtendedDataD3TimeseriesGraphComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes["additionalData"] && this.additionalData && this.graph) {
            this.clearAdditionalData();
            this.plotGraph();
        }
    };
    /**
     * @return {?}
     */
    ExtendedDataD3TimeseriesGraphComponent.prototype.plotGraph = /**
     * @return {?}
     */
    function () {
        this.prepareAdditionalData();
        _super.prototype.plotGraph.call(this);
    };
    /**
     * @return {?}
     */
    ExtendedDataD3TimeseriesGraphComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        if (this.additionalData) {
            setTimeout(function () { return _this.plotGraph(); }, 0);
        }
    };
    /**
     * @return {?}
     */
    ExtendedDataD3TimeseriesGraphComponent.prototype.clearAdditionalData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.additionalPreparedData.forEach(function (data) {
            _this.yRangesEachUom.forEach(function (e) {
                /** @type {?} */
                var idx = e.ids.indexOf(data.internalId);
                if (idx > -1) {
                    e.ids.splice(idx, 1);
                }
            });
        });
        if (this.yRangesEachUom) {
            for (var i = this.yRangesEachUom.length - 1; i >= 0; i--) {
                /** @type {?} */
                var element = this.yRangesEachUom[i];
                if (element.ids.length === 0) {
                    this.yRangesEachUom.splice(i, 1);
                }
            }
        }
        this.additionalPreparedData = [];
    };
    /**
     * @return {?}
     */
    ExtendedDataD3TimeseriesGraphComponent.prototype.prepareAdditionalData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.additionalData) {
            this.additionalData.forEach(function (entry) {
                if ((entry.linkedDatasetId || entry.yaxisLabel) && entry.data) {
                    if (entry.data.length > 0) {
                        /** @type {?} */
                        var options = entry.datasetOptions || _this.datasetOptions.get(entry.linkedDatasetId);
                        /** @type {?} */
                        var dataset = _this.datasetMap.get(entry.linkedDatasetId);
                        /** @type {?} */
                        var prepDataIdx = _this.additionalPreparedData.findIndex(function (e) { return e.internalId.startsWith(entry.linkedDatasetId) || e.internalId === entry.yaxisLabel; });
                        /** @type {?} */
                        var dataEntry = void 0;
                        if (prepDataIdx === -1) {
                            dataEntry = {
                                internalId: entry.linkedDatasetId ? entry.linkedDatasetId + 'add' : entry.yaxisLabel,
                                id: -1,
                                color: options.color,
                                data: options.visible ? entry.data.map(function (e) {
                                    return {
                                        timestamp: e.timestamp,
                                        value: e.value
                                    };
                                }) : [],
                                points: {
                                    fillColor: options.color
                                },
                                lines: {
                                    lineWidth: options.lineWidth,
                                    pointRadius: options.pointRadius
                                },
                                bars: {
                                    lineWidth: options.lineWidth
                                },
                                axisOptions: {
                                    uom: dataset ? dataset.uom : entry.yaxisLabel,
                                    label: dataset ? dataset.label : entry.yaxisLabel,
                                    zeroBased: options.zeroBasedYAxis,
                                    yAxisRange: options.yAxisRange,
                                    autoRangeSelection: options.autoRangeSelection,
                                    separateYAxis: options.separateYAxis
                                },
                                visible: options.visible
                            };
                            if (dataset) {
                                dataEntry.axisOptions.parameters = {
                                    feature: dataset.parameters.feature,
                                    phenomenon: dataset.parameters.phenomenon,
                                    offering: dataset.parameters.offering
                                };
                            }
                            _this.additionalPreparedData.push(dataEntry);
                        }
                        else {
                            dataEntry = _this.additionalPreparedData[prepDataIdx];
                            dataEntry.axisOptions.uom = dataset ? dataset.uom : entry.yaxisLabel;
                            dataEntry.axisOptions.label = dataset ? dataset.label : entry.yaxisLabel;
                        }
                        /** @type {?} */
                        var newDatasetIdx = _this.yRangesEachUom.findIndex(function (e) { return e.ids.indexOf(entry.linkedDatasetId) > -1; });
                        /** @type {?} */
                        var dataExtent = extent(dataEntry.data, function (d) {
                            if (_this.timespan.from <= d.timestamp && _this.timespan.to >= d.timestamp) {
                                return d.value;
                            }
                        });
                        if (isFinite(dataExtent[0]) && isFinite(dataExtent[1])) {
                            /** @type {?} */
                            var range = { min: dataExtent[0], max: dataExtent[1] };
                            _this.extendRange(range);
                            if (newDatasetIdx === -1) {
                                /** @type {?} */
                                var existingAxisIndex = _this.yRangesEachUom.findIndex(function (e) { return e.ids.indexOf(entry.yaxisLabel) !== -1; });
                                /** @type {?} */
                                var axisRange = {
                                    uom: entry.yaxisLabel,
                                    range: range,
                                    autoRange: options.autoRangeSelection,
                                    preRange: range,
                                    originRange: range,
                                    zeroBased: options.zeroBasedYAxis,
                                    outOfrange: false,
                                    ids: [entry.yaxisLabel],
                                    parameters: dataEntry.axisOptions.parameters
                                };
                                if (existingAxisIndex > -1) {
                                    _this.yRangesEachUom[existingAxisIndex] = axisRange;
                                }
                                else {
                                    _this.yRangesEachUom.push(axisRange);
                                }
                            }
                            else {
                                if (_this.yRangesEachUom[newDatasetIdx].range) {
                                    _this.yRangesEachUom[newDatasetIdx].range.min = Math.min(range.min, _this.yRangesEachUom[newDatasetIdx].range.min);
                                    _this.yRangesEachUom[newDatasetIdx].range.max = Math.max(range.max, _this.yRangesEachUom[newDatasetIdx].range.max);
                                }
                                else {
                                    _this.yRangesEachUom[newDatasetIdx].range = range;
                                }
                                _this.yRangesEachUom[newDatasetIdx].ids.push(entry.linkedDatasetId ? entry.linkedDatasetId + 'add' : entry.yaxisLabel);
                            }
                            if (entry.yaxisLabel && !entry.linkedDatasetId) {
                                /** @type {?} */
                                var idx = _this.listOfUoms.indexOf(entry.yaxisLabel);
                                if (idx < 0) {
                                    _this.listOfUoms.push(entry.yaxisLabel);
                                }
                            }
                        }
                    }
                }
                else {
                    console.warn('Please check the additional entry, it needs at least a \'linkedDatasetId\' or a \'yaxisLabel\' property and a \'data\' property: ', entry);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    ExtendedDataD3TimeseriesGraphComponent.prototype.drawAllGraphLines = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.drawAllGraphLines.call(this);
        this.additionalPreparedData.forEach(function (e) { return _this.drawGraphLine(e); });
    };
    ExtendedDataD3TimeseriesGraphComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-extended-data-d3-timeseries-graph',
                    template: "<div class=\"d3\" #d3timeseries></div>\n",
                    styles: [".d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}.d3 .formerButton,.d3 .laterButton{fill:grey;opacity:.3}.d3 .formerButton:hover,.d3 .laterButton:hover{opacity:.6}.d3 .arrow{stroke:grey;stroke-width:3px}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    ExtendedDataD3TimeseriesGraphComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: D3TimeFormatLocaleService },
        { type: ColorService },
        { type: TranslateService }
    ]; };
    ExtendedDataD3TimeseriesGraphComponent.propDecorators = {
        additionalData: [{ type: Input }]
    };
    return ExtendedDataD3TimeseriesGraphComponent;
}(D3TimeseriesGraphComponent));
export { ExtendedDataD3TimeseriesGraphComponent };
if (false) {
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.additionalData;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.additionalPreparedData;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.iterableDiffers;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.api;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.datasetIdResolver;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.timeFormatLocaleService;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.colorService;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZDMvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULEtBQUssRUFDTCxlQUFlLEVBR2YsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQWtCLGlCQUFpQixFQUFlLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFNUIsT0FBTyxFQUNMLDBCQUEwQixHQUczQixNQUFNLHNEQUFzRCxDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRDeEIsa0VBQTBCO0lBT3BGLGdEQUNZLGVBQWdDLEVBQ2hDLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxRQUFjLEVBQ2QsdUJBQWtELEVBQ2xELFlBQTBCLEVBQzFCLGdCQUFrQztRQVA5QyxZQVNFLGtCQUFNLGVBQWUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxTQUNsSDtRQVRXLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4Qix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGNBQVEs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U0FBQztvQkFDVCxRQUFRLEVBQUUsdUNBQXVDO29CQUNqRCxRQUFRLEVBQUUsMENBQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsaWVBQWllLENBQUM7b0JBQzNlLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7OztnQkF6REMsZUFBZTtnQkFLTSxtQkFBbUI7Z0JBQWtCLGlCQUFpQjtnQkFBZSxJQUFJO2dCQVN2Rix5QkFBeUI7Z0JBVHpCLFlBQVk7Z0JBQ1osZ0JBQWdCOzs7aUNBc0R0QixLQUFLOztpREFoRVI7RUE4RDRELDBCQUEwQjtTQUF6RSxzQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlLCBEYXRhc2V0QXBpSW50ZXJmYWNlLCBEYXRhc2V0T3B0aW9ucywgSW50ZXJuYWxJZEhhbmRsZXIsIE1pbk1heFJhbmdlLCBUaW1lIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IGV4dGVudCB9IGZyb20gJ2QzJztcblxuaW1wb3J0IHtcbiAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gIERhdGFFbnRyeSxcbiAgSW50ZXJuYWxEYXRhRW50cnksXG59IGZyb20gJy4uL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5cbi8qKlxuICogQWRkaXRpb25hbCBEYXRhIHdoaWNoIGNhbiBiZSBhZGQgdG8gdGhlIGNvbXBvbmVudCB7QGxpbmsgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnR9IGFzIElucHV0LlxuICogT25lIG9mIHRoZSBvcHRpb25hbCBwcm9wZXJ0aWVzICdsaW5rZWREYXRhc2V0SWQnIGFuZCAneWF4aXNMYWJlbCcgaXMgbWFuZGF0b3J5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFkZGl0aW9uYWxEYXRhIHtcbiAgLyoqXG4gICAqIExpbmtlZCB0byBhbiBleGlzdGluZyBkYXRhc2V0IGluIHRoZSBncmFwaCBjb21wb25lbnQgYW5kIHVzZXMgaXQgZGF0YXNldCBvcHRpb25zIGlmIG5vIG90aGVyIGRhdGFzZXRvcHRpb25zIGFyZSBwcmVzZW50ZWQuXG4gICAqL1xuICBsaW5rZWREYXRhc2V0SWQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBZLUF4aXMgbGFiZWwgaWYgbm8gbGluayB0byBhbiBleGlzdGluZyBkYXRhc2V0IGlzIGdpdmVuLlxuICAgKi9cbiAgeWF4aXNMYWJlbD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBkYXRhc2V0IG9wdGlvbnMsIHdoaWNoIGRlc2NyaWJlcyB0aGUgc3R5bGluZyBvZiB0aGUgYWRkaXRpb25hbCBkYXRhLlxuICAgKi9cbiAgZGF0YXNldE9wdGlvbnM/OiBEYXRhc2V0T3B0aW9ucztcbiAgLyoqXG4gICAqIFRoZSBhZGRpdGlvbmFsIGRhdGEgYXJyZXkgd2l0aCB0dXBlbHMgb2YgdGltZXN0YW1wIGFuZCB2YWx1ZS5cbiAgICovXG4gIGRhdGE6IEFkZGl0aW9uYWxEYXRhRW50cnlbXTtcbn1cblxuLyoqXG4gKiBBZGRpdGlvbmFsIGRhdGEgZW50cnkgdHVwbGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZGRpdGlvbmFsRGF0YUVudHJ5IHtcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgY29tbW9uIGQzIGNvbXBvbmVudCwgd2l0aCB0aGUgYWJpbGl0eSB0byBhZGQgYWRkaXRpb25hbCBkYXRhIHRvIHRoZSBncmFwaC4gVG8gc2V0IG9yIGNoYW5nZSAgYWRkaXRpb25hbCBkYXRhLCBhbGx3YXlzIHNldHMgdGhlIGNvbXBsZXRlIGFycmF5IG9mIGRhdGEgbmV3LiBUaGUgY29tcG9uZXQganVzdCByZWRyYXdzIGlmXG4gKiB0aGUgYXJyYXkgaXMgcmVzZXQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi1leHRlbmRlZC1kYXRhLWQzLXRpbWVzZXJpZXMtZ3JhcGgnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkM1wiICNkM3RpbWVzZXJpZXM+PC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmQze2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kMyAuZ3JpZCAudGljayBsaW5le3N0cm9rZTojZDNkM2QzO3N0cm9rZS1vcGFjaXR5Oi43O3NoYXBlLXJlbmRlcmluZzpjcmlzcEVkZ2VzfS5kMyAuZ3JhcGhEb3Rze3N0cm9rZS13aWR0aDowO3N0cm9rZS1vcGFjaXR5OjF9LmQzIC5ncmFwaERvdHMgLmhvdmVye3N0cm9rZS13aWR0aDoyMHB4O3N0cm9rZS1vcGFjaXR5Oi41fS5kMyAuZm9ybWVyQnV0dG9uLC5kMyAubGF0ZXJCdXR0b257ZmlsbDpncmV5O29wYWNpdHk6LjN9LmQzIC5mb3JtZXJCdXR0b246aG92ZXIsLmQzIC5sYXRlckJ1dHRvbjpob3ZlcntvcGFjaXR5Oi42fS5kMyAuYXJyb3d7c3Ryb2tlOmdyZXk7c3Ryb2tlLXdpZHRoOjNweH1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCBleHRlbmRzIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgYWRkaXRpb25hbERhdGE6IEFkZGl0aW9uYWxEYXRhW10gPSBbXTtcblxuICBwcml2YXRlIGFkZGl0aW9uYWxQcmVwYXJlZERhdGE6IEludGVybmFsRGF0YUVudHJ5W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLCBjb2xvclNlcnZpY2UsIHRyYW5zbGF0ZVNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICBpZiAoY2hhbmdlcy5hZGRpdGlvbmFsRGF0YSAmJiB0aGlzLmFkZGl0aW9uYWxEYXRhICYmIHRoaXMuZ3JhcGgpIHtcbiAgICAgIHRoaXMuY2xlYXJBZGRpdGlvbmFsRGF0YSgpO1xuICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGxvdEdyYXBoKCkge1xuICAgIHRoaXMucHJlcGFyZUFkZGl0aW9uYWxEYXRhKCk7XG4gICAgc3VwZXIucGxvdEdyYXBoKCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIGlmICh0aGlzLmFkZGl0aW9uYWxEYXRhKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxvdEdyYXBoKCksIDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJBZGRpdGlvbmFsRGF0YSgpIHtcbiAgICB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20uZm9yRWFjaChlID0+IHtcbiAgICAgICAgY29uc3QgaWR4ID0gZS5pZHMuaW5kZXhPZihkYXRhLmludGVybmFsSWQpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHsgZS5pZHMuc3BsaWNlKGlkeCwgMSk7IH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb20pIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnlSYW5nZXNFYWNoVW9tW2ldO1xuICAgICAgICBpZiAoZWxlbWVudC5pZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGEgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUFkZGl0aW9uYWxEYXRhKCkge1xuICAgIGlmICh0aGlzLmFkZGl0aW9uYWxEYXRhKSB7XG4gICAgICB0aGlzLmFkZGl0aW9uYWxEYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBpZiAoKGVudHJ5LmxpbmtlZERhdGFzZXRJZCB8fCBlbnRyeS55YXhpc0xhYmVsKSAmJiBlbnRyeS5kYXRhKSB7XG5cbiAgICAgICAgICBpZiAoZW50cnkuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGVudHJ5LmRhdGFzZXRPcHRpb25zIHx8IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGVudHJ5LmxpbmtlZERhdGFzZXRJZCk7XG4gICAgICAgICAgICBsZXQgZGF0YXNldCA9IHRoaXMuZGF0YXNldE1hcC5nZXQoZW50cnkubGlua2VkRGF0YXNldElkKTtcbiAgICAgICAgICAgIGNvbnN0IHByZXBEYXRhSWR4ID0gdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhLmZpbmRJbmRleChlID0+IGUuaW50ZXJuYWxJZC5zdGFydHNXaXRoKGVudHJ5LmxpbmtlZERhdGFzZXRJZCkgfHwgZS5pbnRlcm5hbElkID09PSBlbnRyeS55YXhpc0xhYmVsKTtcbiAgICAgICAgICAgIGxldCBkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5O1xuICAgICAgICAgICAgaWYgKHByZXBEYXRhSWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICBkYXRhRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxJZDogZW50cnkubGlua2VkRGF0YXNldElkID8gZW50cnkubGlua2VkRGF0YXNldElkICsgJ2FkZCcgOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgIGlkOiAtMSxcbiAgICAgICAgICAgICAgICBjb2xvcjogb3B0aW9ucy5jb2xvcixcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLnZpc2libGUgPyBlbnRyeS5kYXRhLm1hcChlID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZS50aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlLnZhbHVlXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pIDogW10sXG4gICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IG9wdGlvbnMuY29sb3JcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IG9wdGlvbnMubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgcG9pbnRSYWRpdXM6IG9wdGlvbnMucG9pbnRSYWRpdXNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogb3B0aW9ucy5saW5lV2lkdGhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGF4aXNPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICB1b206IGRhdGFzZXQgPyBkYXRhc2V0LnVvbSA6IGVudHJ5LnlheGlzTGFiZWwsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogZGF0YXNldCA/IGRhdGFzZXQubGFiZWwgOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgemVyb0Jhc2VkOiBvcHRpb25zLnplcm9CYXNlZFlBeGlzLFxuICAgICAgICAgICAgICAgICAgeUF4aXNSYW5nZTogb3B0aW9ucy55QXhpc1JhbmdlLFxuICAgICAgICAgICAgICAgICAgYXV0b1JhbmdlU2VsZWN0aW9uOiBvcHRpb25zLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgIHNlcGFyYXRlWUF4aXM6IG9wdGlvbnMuc2VwYXJhdGVZQXhpc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogb3B0aW9ucy52aXNpYmxlXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGlmIChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgZGF0YUVudHJ5LmF4aXNPcHRpb25zLnBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICBmZWF0dXJlOiBkYXRhc2V0LnBhcmFtZXRlcnMuZmVhdHVyZSxcbiAgICAgICAgICAgICAgICAgIHBoZW5vbWVub246IGRhdGFzZXQucGFyYW1ldGVycy5waGVub21lbm9uLFxuICAgICAgICAgICAgICAgICAgb2ZmZXJpbmc6IGRhdGFzZXQucGFyYW1ldGVycy5vZmZlcmluZ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhLnB1c2goZGF0YUVudHJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRhdGFFbnRyeSA9IHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YVtwcmVwRGF0YUlkeF07XG4gICAgICAgICAgICAgIGRhdGFFbnRyeS5heGlzT3B0aW9ucy51b20gPSBkYXRhc2V0ID8gZGF0YXNldC51b20gOiBlbnRyeS55YXhpc0xhYmVsO1xuICAgICAgICAgICAgICBkYXRhRW50cnkuYXhpc09wdGlvbnMubGFiZWwgPSBkYXRhc2V0ID8gZGF0YXNldC5sYWJlbCA6IGVudHJ5LnlheGlzTGFiZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0RhdGFzZXRJZHggPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmRJbmRleCgoZSkgPT4gZS5pZHMuaW5kZXhPZihlbnRyeS5saW5rZWREYXRhc2V0SWQpID4gLTEpO1xuICAgICAgICAgICAgY29uc3QgZGF0YUV4dGVudCA9IGV4dGVudDxEYXRhRW50cnksIG51bWJlcj4oZGF0YUVudHJ5LmRhdGEsIChkKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVzcGFuLmZyb20gPD0gZC50aW1lc3RhbXAgJiYgdGhpcy50aW1lc3Bhbi50byA+PSBkLnRpbWVzdGFtcCkgeyByZXR1cm4gZC52YWx1ZTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUoZGF0YUV4dGVudFswXSkgJiYgaXNGaW5pdGUoZGF0YUV4dGVudFsxXSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmFuZ2U6IE1pbk1heFJhbmdlID0geyBtaW46IGRhdGFFeHRlbnRbMF0sIG1heDogZGF0YUV4dGVudFsxXSB9O1xuICAgICAgICAgICAgICB0aGlzLmV4dGVuZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgaWYgKG5ld0RhdGFzZXRJZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdBeGlzSW5kZXggPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmRJbmRleChlID0+IGUuaWRzLmluZGV4T2YoZW50cnkueWF4aXNMYWJlbCkgIT09IC0xKTtcbiAgICAgICAgICAgICAgICBjb25zdCBheGlzUmFuZ2UgPSB7XG4gICAgICAgICAgICAgICAgICB1b206IGVudHJ5LnlheGlzTGFiZWwsXG4gICAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IG9wdGlvbnMuYXV0b1JhbmdlU2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgcHJlUmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgICAgb3JpZ2luUmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgICAgemVyb0Jhc2VkOiBvcHRpb25zLnplcm9CYXNlZFlBeGlzLFxuICAgICAgICAgICAgICAgICAgb3V0T2ZyYW5nZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBpZHM6IFtlbnRyeS55YXhpc0xhYmVsXSxcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdBeGlzSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtleGlzdGluZ0F4aXNJbmRleF0gPSBheGlzUmFuZ2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20ucHVzaChheGlzUmFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZS5taW4gPSBNYXRoLm1pbihyYW5nZS5taW4sIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UubWluKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UubWF4ID0gTWF0aC5tYXgocmFuZ2UubWF4LCB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1heCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UgPSByYW5nZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5pZHMucHVzaChlbnRyeS5saW5rZWREYXRhc2V0SWQgPyBlbnRyeS5saW5rZWREYXRhc2V0SWQgKyAnYWRkJyA6IGVudHJ5LnlheGlzTGFiZWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChlbnRyeS55YXhpc0xhYmVsICYmICFlbnRyeS5saW5rZWREYXRhc2V0SWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5saXN0T2ZVb21zLmluZGV4T2YoZW50cnkueWF4aXNMYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCA8IDApIHsgdGhpcy5saXN0T2ZVb21zLnB1c2goZW50cnkueWF4aXNMYWJlbCk7IH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1BsZWFzZSBjaGVjayB0aGUgYWRkaXRpb25hbCBlbnRyeSwgaXQgbmVlZHMgYXQgbGVhc3QgYSBcXCdsaW5rZWREYXRhc2V0SWRcXCcgb3IgYSBcXCd5YXhpc0xhYmVsXFwnIHByb3BlcnR5IGFuZCBhIFxcJ2RhdGFcXCcgcHJvcGVydHk6ICcsIGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGRyYXdBbGxHcmFwaExpbmVzKCkge1xuICAgIHN1cGVyLmRyYXdBbGxHcmFwaExpbmVzKCk7XG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhLmZvckVhY2goZSA9PiB0aGlzLmRyYXdHcmFwaExpbmUoZSkpO1xuICB9XG5cbn1cbiJdfQ==