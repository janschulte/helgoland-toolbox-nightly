import { __extends } from 'tslib';
import { Component, EventEmitter, IterableDiffers, Output, ViewChild, NgModule } from '@angular/core';
import { DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, Timespan, HelgolandCoreModule } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { extent } from 'd3';
import { newPlot, relayout } from 'plotly.js';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var LINE_WIDTH_SELECTED = 5;
/** @type {?} */
var LINE_WIDTH = 2;
/** @type {?} */
var MARKER_SIZE_SELECTED = 10;
/** @type {?} */
var MARKER_SIZE = 6;
var PlotlyProfileGraphComponent = /** @class */ (function (_super) {
    __extends(PlotlyProfileGraphComponent, _super);
    function PlotlyProfileGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
        var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.translateSrvc = translateSrvc;
        _this.onHighlight = new EventEmitter();
        _this.preparedData = [];
        _this.rawData = new Map();
        _this.counterXAxis = 0;
        _this.counterYAxis = 0;
        _this.layout = {
            autosize: true,
            showlegend: false,
            dragmode: 'pan',
            margin: {
                l: 40,
                r: 10,
                b: 40,
                t: 10
            },
            hovermode: 'closest'
        };
        _this.settings = {
            displayModeBar: false,
            modeBarButtonsToRemove: [
                'sendDataToCloud',
                'hoverCompareCartesian'
            ],
            displaylogo: false,
            showTips: false,
            scrollZoom: true
        };
        return _this;
    }
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.plotlyArea = this.plotlyElem.nativeElement;
        this.drawChart();
    };
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.onLanguageChanged = /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    function (langChangeEvent) { };
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.reloadDataForDatasets = /**
     * @param {?} datasetIds
     * @return {?}
     */
    function (datasetIds) {
        console.log('reload data at ' + new Date());
    };
    // tslint:disable-next-line:no-empty
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.timeIntervalChanges = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.addDataset = /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    function (id, url) {
        var _this = this;
        this.api.getDataset(id, url).subscribe(function (dataset) {
            /** @type {?} */
            var options = _this.datasetOptions.get(dataset.internalId);
            options.forEach(function (option) {
                if (option.timestamp) {
                    /** @type {?} */
                    var timespan = new Timespan(option.timestamp);
                    _this.api.getData(id, url, timespan).subscribe(function (data) {
                        if (data.values.length === 1) {
                            if (_this.rawData.has(dataset.internalId)) {
                                _this.rawData.get(dataset.internalId).datas.push(data.values[0]);
                                _this.rawData.get(dataset.internalId).options.push(option);
                            }
                            else {
                                _this.rawData.set(dataset.internalId, {
                                    dataset: dataset,
                                    datas: [data.values[0]],
                                    options: [option]
                                });
                            }
                        }
                        _this.drawChart();
                    });
                }
            });
        });
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.removeDataset = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        this.rawData.delete(internalId);
        this.drawChart();
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.setSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        this.drawChart();
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.removeSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        this.drawChart();
    };
    // tslint:disable-next-line:no-empty
    /**
     * @param {?} options
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.presenterOptionsChanged = /**
     * @param {?} options
     * @return {?}
     */
    function (options) { };
    /**
     * @param {?} internalId
     * @param {?} options
     * @param {?} firstChange
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.datasetOptionsChanged = /**
     * @param {?} internalId
     * @param {?} options
     * @param {?} firstChange
     * @return {?}
     */
    function (internalId, options, firstChange) {
        if (!firstChange) {
            /** @type {?} */
            var removedIdx = this.rawData.get(internalId).options.findIndex(function (option) {
                /** @type {?} */
                var idx = options.findIndex(function (e) { return e.timestamp === option.timestamp; });
                if (idx === -1) {
                    return true;
                }
            });
            if (removedIdx > -1) {
                this.rawData.get(internalId).options.splice(removedIdx, 1);
                this.rawData.get(internalId).datas.splice(removedIdx, 1);
            }
            this.drawChart();
        }
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        this.redrawChart();
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.processData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.clearLayout();
        this.clearData();
        this.rawData.forEach(function (dataEntry) {
            dataEntry.options.forEach(function (option, key) {
                if (option.visible) {
                    /** @type {?} */
                    var x_1 = new Array();
                    /** @type {?} */
                    var y_1 = new Array();
                    /** @type {?} */
                    var selected = _this.selectedDatasetIds.indexOf(dataEntry.dataset.internalId) >= 0;
                    dataEntry.datas[key].value.forEach(function (entry) {
                        x_1.push(entry.value);
                        y_1.push(entry.vertical);
                    });
                    /** @type {?} */
                    var prepared = {
                        x: x_1,
                        y: y_1,
                        type: 'scatter',
                        name: '',
                        timestamp: option.timestamp,
                        id: dataEntry.dataset.internalId,
                        yaxis: _this.createYAxis(dataEntry.dataset, dataEntry.datas[key]),
                        xaxis: _this.createXAxis(dataEntry.dataset, dataEntry.datas[key]),
                        // hovertext: dataEntry.label,
                        line: {
                            color: option.color,
                            width: selected ? LINE_WIDTH_SELECTED : LINE_WIDTH
                        },
                        marker: {
                            size: selected ? MARKER_SIZE_SELECTED : MARKER_SIZE
                        }
                    };
                    _this.preparedData.push(prepared);
                }
            });
        });
        this.updateAxis();
    };
    /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.createXAxis = /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    function (dataset, data) {
        /** @type {?} */
        var axis;
        for (var key in this.layout) {
            if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis') && this.layout[key].title === dataset.uom) {
                axis = this.layout[key];
            }
        }
        /** @type {?} */
        var range = extent(data.value, function (d) { return d.value; });
        if (!axis) {
            this.counterXAxis = this.counterXAxis + 1;
            axis = this.layout['xaxis' + this.counterXAxis] = {
                id: 'x' + (this.counterXAxis > 1 ? this.counterXAxis : ''),
                anchor: 'free',
                title: dataset.uom,
                zeroline: true,
                hoverformat: '.2f',
                showline: false,
                range: [range[0], range[1]],
                overlaying: '',
                // rangemode: 'tozero',
                fixedrange: false
            };
            if (this.counterXAxis !== 1) {
                axis.overlaying = 'x';
            }
        }
        else {
            axis.range = extent([range[0], range[1], axis.range[0], axis.range[1]]);
        }
        return axis.id;
    };
    /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.createYAxis = /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    function (dataset, data) {
        /** @type {?} */
        var axis;
        // find axis
        for (var key in this.layout) {
            if (this.layout.hasOwnProperty(key) &&
                key.startsWith('yaxis') &&
                this.layout[key].title === data.verticalUnit) {
                axis = this.layout[key];
            }
        }
        if (!axis) {
            // add axis
            this.counterYAxis = this.counterYAxis + 1;
            axis = this.layout[('yaxis' + this.counterYAxis)] = {
                id: 'y' + (this.counterYAxis > 1 ? this.counterYAxis : ''),
                // zeroline: true,
                anchor: 'free',
                hoverformat: '.2r',
                side: 'left',
                autorange: 'reversed',
                showline: false,
                overlaying: '',
                title: data.verticalUnit,
                fixedrange: false
            };
            if (this.counterYAxis !== 1) {
                axis.overlaying = 'y';
            }
        }
        return axis.id;
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.updateAxis = /**
     * @return {?}
     */
    function () {
        if (this.counterYAxis > 1) {
            for (var key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis')) {
                    this.layout[key].domain = [(0.1 * this.counterYAxis) - 0.1, 1];
                }
            }
            /** @type {?} */
            var yaxisCount = 0;
            for (var key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('yaxis')) {
                    this.layout[key].position = 0.1 * yaxisCount;
                    yaxisCount += 1;
                }
            }
        }
        if (this.counterXAxis > 1) {
            for (var key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('yaxis')) {
                    this.layout[key].domain = [(0.06 * this.counterXAxis) - 0.06, 1];
                }
            }
            /** @type {?} */
            var xaxisCount = 0;
            for (var key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis')) {
                    this.layout[key].position = 0.06 * xaxisCount;
                    xaxisCount += 1;
                }
            }
        }
        // add offset to xaxis ranges
        for (var key in this.layout) {
            if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis')) {
                /** @type {?} */
                var range = this.layout[key].range;
                /** @type {?} */
                var rangeOffset = (range[1] - range[0]) * 0.05;
                this.layout[key].range = [range[0] - rangeOffset, range[1] + rangeOffset];
            }
        }
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.drawChart = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.plotlyArea && this.rawData.size > 0) {
            this.processData();
            newPlot(this.plotlyArea, this.preparedData, this.layout, this.settings);
            this.plotlyArea.on('plotly_hover', function (entry) {
                if (entry.points.length === 1) {
                    _this.onHighlight.emit({
                        internalId: entry.points[0].data.id,
                        dataIndex: entry.points[0].pointNumber
                    });
                }
            });
        }
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.clearLayout = /**
     * @return {?}
     */
    function () {
        // todo remove yaxis
        for (var key in this.layout) {
            if (this.layout.hasOwnProperty(key) && (key.startsWith('yaxis') || key.startsWith('xaxis'))) {
                delete this.layout[key];
            }
        }
        // reset counter
        this.counterYAxis = 0;
        this.counterXAxis = 0;
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.clearData = /**
     * @return {?}
     */
    function () {
        this.preparedData = [];
    };
    /**
     * @return {?}
     */
    PlotlyProfileGraphComponent.prototype.redrawChart = /**
     * @return {?}
     */
    function () {
        if (this.plotlyArea) {
            relayout(this.plotlyArea, {});
        }
    };
    PlotlyProfileGraphComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-plotly-profile-graph',
                    template: "<div #plotly></div>",
                    styles: [":host div{width:100%;height:100%}"]
                },] },
    ];
    /** @nocollapse */
    PlotlyProfileGraphComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: TranslateService }
    ]; };
    PlotlyProfileGraphComponent.propDecorators = {
        onHighlight: [{ type: Output }],
        plotlyElem: [{ type: ViewChild, args: ['plotly',] }]
    };
    return PlotlyProfileGraphComponent;
}(DatasetPresenterComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandPlotlyModule = /** @class */ (function () {
    function HelgolandPlotlyModule() {
    }
    HelgolandPlotlyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PlotlyProfileGraphComponent
                    ],
                    imports: [
                        HelgolandCoreModule
                    ],
                    exports: [
                        PlotlyProfileGraphComponent
                    ],
                    providers: []
                },] },
    ];
    return HelgolandPlotlyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandPlotlyModule, PlotlyProfileGraphComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXBsb3RseS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9wbG90bHkvbGliL3Bsb3RseS1wcm9maWxlLWdyYXBoL3Bsb3RseS1wcm9maWxlLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wbG90bHkvbGliL3Bsb3RseS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEl0ZXJhYmxlRGlmZmVycywgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50LFxuICAgIElEYXRhc2V0LFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIFByZXNlbnRlckhpZ2hsaWdodCxcbiAgICBQcm9maWxlRGF0YUVudHJ5LFxuICAgIFRpbWUsXG4gICAgVGltZWREYXRhc2V0T3B0aW9ucyxcbiAgICBUaW1lc3Bhbixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0ICogYXMgUGxvdGx5IGZyb20gJ3Bsb3RseS5qcyc7XG5cbmludGVyZmFjZSBSYXdEYXRhIHtcbiAgICBkYXRhc2V0OiBJRGF0YXNldDtcbiAgICBkYXRhczogUHJvZmlsZURhdGFFbnRyeVtdO1xuICAgIG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnNbXTtcbn1cblxuaW50ZXJmYWNlIEV4dGVuZGVkU2NhdHRlckRhdGEgZXh0ZW5kcyBQYXJ0aWFsPFBsb3RseS5TY2F0dGVyRGF0YT4ge1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG59XG5cbmNvbnN0IExJTkVfV0lEVEhfU0VMRUNURUQgPSA1O1xuY29uc3QgTElORV9XSURUSCA9IDI7XG5jb25zdCBNQVJLRVJfU0laRV9TRUxFQ1RFRCA9IDEwO1xuY29uc3QgTUFSS0VSX1NJWkUgPSA2O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1wbG90bHktcHJvZmlsZS1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNwbG90bHk+PC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgZGl2e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGxvdGx5UHJvZmlsZUdyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PFRpbWVkRGF0YXNldE9wdGlvbnNbXSwgYW55PlxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25IaWdobGlnaHQ6IEV2ZW50RW1pdHRlcjxQcmVzZW50ZXJIaWdobGlnaHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgncGxvdGx5JylcbiAgICBwdWJsaWMgcGxvdGx5RWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgcGxvdGx5QXJlYTogYW55O1xuICAgIHByaXZhdGUgcHJlcGFyZWREYXRhOiBFeHRlbmRlZFNjYXR0ZXJEYXRhW10gPSBbXTtcbiAgICBwcml2YXRlIHJhd0RhdGE6IE1hcDxzdHJpbmcsIFJhd0RhdGE+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY291bnRlclhBeGlzID0gMDtcbiAgICBwcml2YXRlIGNvdW50ZXJZQXhpcyA9IDA7XG5cbiAgICBwcml2YXRlIGxheW91dDogTGF5b3V0ID0ge1xuICAgICAgICBhdXRvc2l6ZTogdHJ1ZSxcbiAgICAgICAgc2hvd2xlZ2VuZDogZmFsc2UsXG4gICAgICAgIGRyYWdtb2RlOiAncGFuJyxcbiAgICAgICAgbWFyZ2luOiB7XG4gICAgICAgICAgICBsOiA0MCxcbiAgICAgICAgICAgIHI6IDEwLFxuICAgICAgICAgICAgYjogNDAsXG4gICAgICAgICAgICB0OiAxMFxuICAgICAgICAgICAgLy8gcGFkOiAxMDBcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXJtb2RlOiAnY2xvc2VzdCdcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogUGFydGlhbDxhbnk+ID0ge1xuICAgICAgICBkaXNwbGF5TW9kZUJhcjogZmFsc2UsXG4gICAgICAgIG1vZGVCYXJCdXR0b25zVG9SZW1vdmU6IFtcbiAgICAgICAgICAgICdzZW5kRGF0YVRvQ2xvdWQnLFxuICAgICAgICAgICAgJ2hvdmVyQ29tcGFyZUNhcnRlc2lhbidcbiAgICAgICAgXSxcbiAgICAgICAgZGlzcGxheWxvZ286IGZhbHNlLFxuICAgICAgICBzaG93VGlwczogZmFsc2UsXG4gICAgICAgIHNjcm9sbFpvb206IHRydWVcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsb3RseUFyZWEgPSB0aGlzLnBsb3RseUVsZW0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHsgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRGF0YXNldChpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KGlkLCB1cmwpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuID0gbmV3IFRpbWVzcGFuKG9wdGlvbi50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhPFByb2ZpbGVEYXRhRW50cnk+KGlkLCB1cmwsIHRpbWVzcGFuKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yYXdEYXRhLmhhcyhkYXRhc2V0LmludGVybmFsSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmF3RGF0YS5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS5kYXRhcy5wdXNoKGRhdGEudmFsdWVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChkYXRhc2V0LmludGVybmFsSWQpLm9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmF3RGF0YS5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXM6IFtkYXRhLnZhbHVlc1swXV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbb3B0aW9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmF3RGF0YS5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJvdGVjdGVkIHByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IGFueSk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogVGltZWREYXRhc2V0T3B0aW9uc1tdLCBmaXJzdENoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgdW51c2VkIG9wdGlvbnNcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRJZHggPSB0aGlzLnJhd0RhdGEuZ2V0KGludGVybmFsSWQpLm9wdGlvbnMuZmluZEluZGV4KChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBvcHRpb25zLmZpbmRJbmRleCgoZSkgPT4gZS50aW1lc3RhbXAgPT09IG9wdGlvbi50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlbW92ZWRJZHggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmF3RGF0YS5nZXQoaW50ZXJuYWxJZCkub3B0aW9ucy5zcGxpY2UocmVtb3ZlZElkeCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChpbnRlcm5hbElkKS5kYXRhcy5zcGxpY2UocmVtb3ZlZElkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRGF0YSgpIHtcbiAgICAgICAgdGhpcy5jbGVhckxheW91dCgpO1xuICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xuICAgICAgICB0aGlzLnJhd0RhdGEuZm9yRWFjaCgoZGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICBkYXRhRW50cnkub3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihkYXRhRW50cnkuZGF0YXNldC5pbnRlcm5hbElkKSA+PSAwO1xuICAgICAgICAgICAgICAgICAgICBkYXRhRW50cnkuZGF0YXNba2V5XS52YWx1ZS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeC5wdXNoKGVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkucHVzaChlbnRyeS52ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmVwYXJlZDogRXh0ZW5kZWRTY2F0dGVyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NjYXR0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG9wdGlvbi50aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZGF0YUVudHJ5LmRhdGFzZXQuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlheGlzOiB0aGlzLmNyZWF0ZVlBeGlzKGRhdGFFbnRyeS5kYXRhc2V0LCBkYXRhRW50cnkuZGF0YXNba2V5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICB4YXhpczogdGhpcy5jcmVhdGVYQXhpcyhkYXRhRW50cnkuZGF0YXNldCwgZGF0YUVudHJ5LmRhdGFzW2tleV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaG92ZXJ0ZXh0OiBkYXRhRW50cnkubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG9wdGlvbi5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2VsZWN0ZWQgPyBMSU5FX1dJRFRIX1NFTEVDVEVEIDogTElORV9XSURUSFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHNlbGVjdGVkID8gTUFSS0VSX1NJWkVfU0VMRUNURUQgOiBNQVJLRVJfU0laRVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5wdXNoKHByZXBhcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVBeGlzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVYQXhpcyhkYXRhc2V0OiBJRGF0YXNldCwgZGF0YTogUHJvZmlsZURhdGFFbnRyeSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBheGlzO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3hheGlzJykgJiYgdGhpcy5sYXlvdXRba2V5XS50aXRsZSA9PT0gZGF0YXNldC51b20pIHtcbiAgICAgICAgICAgICAgICBheGlzID0gdGhpcy5sYXlvdXRba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYW5nZSA9IGQzLmV4dGVudChkYXRhLnZhbHVlLCAoZCkgPT4gZC52YWx1ZSk7XG4gICAgICAgIGlmICghYXhpcykge1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyWEF4aXMgPSB0aGlzLmNvdW50ZXJYQXhpcyArIDE7XG4gICAgICAgICAgICBheGlzID0gdGhpcy5sYXlvdXRbJ3hheGlzJyArIHRoaXMuY291bnRlclhBeGlzXSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ3gnICsgKHRoaXMuY291bnRlclhBeGlzID4gMSA/IHRoaXMuY291bnRlclhBeGlzIDogJycpLFxuICAgICAgICAgICAgICAgIGFuY2hvcjogJ2ZyZWUnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhc2V0LnVvbSxcbiAgICAgICAgICAgICAgICB6ZXJvbGluZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmZvcm1hdDogJy4yZicsXG4gICAgICAgICAgICAgICAgc2hvd2xpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBbcmFuZ2VbMF0sIHJhbmdlWzFdXSxcbiAgICAgICAgICAgICAgICBvdmVybGF5aW5nOiAnJyxcbiAgICAgICAgICAgICAgICAvLyByYW5nZW1vZGU6ICd0b3plcm8nLFxuICAgICAgICAgICAgICAgIGZpeGVkcmFuZ2U6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnRlclhBeGlzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgYXhpcy5vdmVybGF5aW5nID0gJ3gnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXhpcy5yYW5nZSA9IGQzLmV4dGVudChbcmFuZ2VbMF0sIHJhbmdlWzFdLCBheGlzLnJhbmdlWzBdLCBheGlzLnJhbmdlWzFdXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF4aXMuaWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVZQXhpcyhkYXRhc2V0OiBJRGF0YXNldCwgZGF0YTogUHJvZmlsZURhdGFFbnRyeSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBheGlzO1xuICAgICAgICAvLyBmaW5kIGF4aXNcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICAgICAgICAgICAga2V5LnN0YXJ0c1dpdGgoJ3lheGlzJykgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnRpdGxlID09PSBkYXRhLnZlcnRpY2FsVW5pdCkge1xuICAgICAgICAgICAgICAgIGF4aXMgPSB0aGlzLmxheW91dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXhpcykge1xuICAgICAgICAgICAgLy8gYWRkIGF4aXNcbiAgICAgICAgICAgIHRoaXMuY291bnRlcllBeGlzID0gdGhpcy5jb3VudGVyWUF4aXMgKyAxO1xuICAgICAgICAgICAgYXhpcyA9IHRoaXMubGF5b3V0WygneWF4aXMnICsgdGhpcy5jb3VudGVyWUF4aXMpXSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ3knICsgKHRoaXMuY291bnRlcllBeGlzID4gMSA/IHRoaXMuY291bnRlcllBeGlzIDogJycpLFxuICAgICAgICAgICAgICAgIC8vIHplcm9saW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFuY2hvcjogJ2ZyZWUnLFxuICAgICAgICAgICAgICAgIGhvdmVyZm9ybWF0OiAnLjJyJyxcbiAgICAgICAgICAgICAgICBzaWRlOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgYXV0b3JhbmdlOiAncmV2ZXJzZWQnLFxuICAgICAgICAgICAgICAgIHNob3dsaW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvdmVybGF5aW5nOiAnJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogZGF0YS52ZXJ0aWNhbFVuaXQsXG4gICAgICAgICAgICAgICAgZml4ZWRyYW5nZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyWUF4aXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBheGlzLm92ZXJsYXlpbmcgPSAneSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF4aXMuaWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBeGlzKCkge1xuICAgICAgICBpZiAodGhpcy5jb3VudGVyWUF4aXMgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdGFydHNXaXRoKCd4YXhpcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0W2tleV0uZG9tYWluID0gWygwLjEgKiB0aGlzLmNvdW50ZXJZQXhpcykgLSAwLjEsIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB5YXhpc0NvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3lheGlzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5wb3NpdGlvbiA9IDAuMSAqIHlheGlzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHlheGlzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY291bnRlclhBeGlzID4gMSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLmRvbWFpbiA9IFsoMC4wNiAqIHRoaXMuY291bnRlclhBeGlzKSAtIDAuMDYsIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB4YXhpc0NvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3hheGlzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5wb3NpdGlvbiA9IDAuMDYgKiB4YXhpc0NvdW50O1xuICAgICAgICAgICAgICAgICAgICB4YXhpc0NvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBvZmZzZXQgdG8geGF4aXMgcmFuZ2VzXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5sYXlvdXRba2V5XS5yYW5nZTtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZU9mZnNldCA9IChyYW5nZVsxXSAtIHJhbmdlWzBdKSAqIDAuMDU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5yYW5nZSA9IFtyYW5nZVswXSAtIHJhbmdlT2Zmc2V0LCByYW5nZVsxXSArIHJhbmdlT2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0NoYXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5wbG90bHlBcmVhICYmIHRoaXMucmF3RGF0YS5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YSgpO1xuICAgICAgICAgICAgUGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90bHlBcmVhLCB0aGlzLnByZXBhcmVkRGF0YSwgdGhpcy5sYXlvdXQsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICAgICAgdGhpcy5wbG90bHlBcmVhLm9uKCdwbG90bHlfaG92ZXInLCAoZW50cnk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5wb2ludHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25IaWdobGlnaHQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiBlbnRyeS5wb2ludHNbMF0uZGF0YS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJbmRleDogZW50cnkucG9pbnRzWzBdLnBvaW50TnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhckxheW91dCgpIHtcbiAgICAgICAgLy8gdG9kbyByZW1vdmUgeWF4aXNcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSB8fCBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5sYXlvdXRba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXNldCBjb3VudGVyXG4gICAgICAgIHRoaXMuY291bnRlcllBeGlzID0gMDtcbiAgICAgICAgdGhpcy5jb3VudGVyWEF4aXMgPSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJEYXRhKCkge1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YSA9IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVkcmF3Q2hhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsb3RseUFyZWEpIHtcbiAgICAgICAgICAgIFBsb3RseS5yZWxheW91dCh0aGlzLnBsb3RseUFyZWEsIHt9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuaW50ZXJmYWNlIFNjYXR0ZXJEYXRhIGV4dGVuZHMgUGFydGlhbDxhbnk+IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTGF5b3V0IGV4dGVuZHMgUGFydGlhbDxhbnk+IHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IFBsb3RseVByb2ZpbGVHcmFwaENvbXBvbmVudCB9IGZyb20gJy4vcGxvdGx5LXByb2ZpbGUtZ3JhcGgvcGxvdGx5LXByb2ZpbGUtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGxvdGx5UHJvZmlsZUdyYXBoQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQbG90bHlQcm9maWxlR3JhcGhDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRQbG90bHlNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJkMy5leHRlbnQiLCJQbG90bHkubmV3UGxvdCIsIlBsb3RseS5yZWxheW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBMkJBLElBQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDOztBQUM5QixJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7O0FBQ3JCLElBQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDOztBQUNoQyxJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUM7O0lBUVZBLCtDQUFxRDtJQXdDN0QscUNBQ2MsZUFBZ0MsRUFDaEMsR0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLFFBQWMsRUFDZCxhQUErQjtRQUw3QyxZQU9JLGtCQUFNLGVBQWUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxTQUMxRTtRQVBhLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4Qix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGNBQVEsR0FBUixRQUFRLENBQU07UUFDZCxtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7NEJBekNVLElBQUksWUFBWSxFQUFFOzZCQU0zQixFQUFFO3dCQUNSLElBQUksR0FBRyxFQUFFOzZCQUMxQixDQUFDOzZCQUNELENBQUM7dUJBRUM7WUFDckIsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRTtnQkFDSixDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRTtnQkFDTCxDQUFDLEVBQUUsRUFBRTthQUVSO1lBQ0QsU0FBUyxFQUFFLFNBQVM7U0FDdkI7eUJBRWdDO1lBQzdCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLHNCQUFzQixFQUFFO2dCQUNwQixpQkFBaUI7Z0JBQ2pCLHVCQUF1QjthQUMxQjtZQUNELFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsVUFBVSxFQUFFLElBQUk7U0FDbkI7O0tBVUE7Ozs7SUFFTSxxREFBZTs7OztRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7O0lBR1gsdURBQWlCOzs7O0lBQTNCLFVBQTRCLGVBQWdDLEtBQVc7Ozs7O0lBRWhFLDJEQUFxQjs7OztjQUFDLFVBQW9CO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFJdEMseURBQW1COzs7SUFBN0IsZUFBeUM7Ozs7OztJQUUvQixnREFBVTs7Ozs7SUFBcEIsVUFBcUIsRUFBVSxFQUFFLEdBQVc7UUFBNUMsaUJBd0JDO1FBdkJHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFPOztZQUMzQyxJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQ25CLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTs7b0JBQ2xCLElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQW1CLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTt3QkFDakUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzFCLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dDQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2hFLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUM3RDtpQ0FBTTtnQ0FDSCxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29DQUNqQyxPQUFPLFNBQUE7b0NBQ1AsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2lDQUNwQixDQUFDLENBQUM7NkJBQ047eUJBQ0o7d0JBQ0QsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3FCQUNwQixDQUFDLENBQUM7aUJBQ047YUFDSixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjs7Ozs7SUFFUyxtREFBYTs7OztJQUF2QixVQUF3QixVQUFrQjtRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDcEI7Ozs7O0lBRVMsbURBQWE7Ozs7SUFBdkIsVUFBd0IsVUFBa0I7UUFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3BCOzs7OztJQUVTLHNEQUFnQjs7OztJQUExQixVQUEyQixVQUFrQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDcEI7Ozs7OztJQUdTLDZEQUF1Qjs7OztJQUFqQyxVQUFrQyxPQUFZLEtBQVc7Ozs7Ozs7SUFFL0MsMkRBQXFCOzs7Ozs7SUFBL0IsVUFBZ0MsVUFBa0IsRUFBRSxPQUE4QixFQUFFLFdBQW9CO1FBQ3BHLElBQUksQ0FBQyxXQUFXLEVBQUU7O1lBRWQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07O2dCQUNyRSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsU0FBUyxHQUFBLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ1osT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSixDQUFDLENBQUM7WUFDSCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO0tBQ0o7Ozs7SUFFUyw4Q0FBUTs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCOzs7O0lBRU8saURBQVc7Ozs7O1FBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUUsR0FBRztnQkFDbEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOztvQkFDaEIsSUFBTSxHQUFDLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQzs7b0JBQzlCLElBQU0sR0FBQyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7O29CQUM5QixJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwRixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO3dCQUNyQyxHQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDcEIsR0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzFCLENBQUMsQ0FBQzs7b0JBQ0gsSUFBTSxRQUFRLEdBQXdCO3dCQUNsQyxDQUFDLEtBQUE7d0JBQ0QsQ0FBQyxLQUFBO3dCQUNELElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxFQUFFO3dCQUNSLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDM0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVTt3QkFDaEMsS0FBSyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNoRSxLQUFLLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O3dCQUVoRSxJQUFJLEVBQUU7NEJBQ0YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLOzRCQUNuQixLQUFLLEVBQUUsUUFBUSxHQUFHLG1CQUFtQixHQUFHLFVBQVU7eUJBQ3JEO3dCQUNELE1BQU0sRUFBRTs0QkFDSixJQUFJLEVBQUUsUUFBUSxHQUFHLG9CQUFvQixHQUFHLFdBQVc7eUJBQ3REO3FCQUNKLENBQUM7b0JBQ0YsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3BDO2FBQ0osQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7O0lBR2QsaURBQVc7Ozs7O2NBQUMsT0FBaUIsRUFBRSxJQUFzQjs7UUFDekQsSUFBSSxJQUFJLENBQUM7UUFDVCxLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7O1FBQ0QsSUFBTSxLQUFLLEdBQUdDLE1BQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEtBQUssR0FBQSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRztnQkFDOUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFDMUQsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHO2dCQUNsQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsVUFBVSxFQUFFLEVBQUU7O2dCQUVkLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUM7WUFDRixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN6QjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHQSxNQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7SUFHWCxpREFBVzs7Ozs7Y0FBQyxPQUFpQixFQUFFLElBQXNCOztRQUN6RCxJQUFJLElBQUksQ0FBQzs7UUFFVCxLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUM5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRTs7WUFFUCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUc7Z0JBQ2hELEVBQUUsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7O2dCQUUxRCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxFQUFFO2dCQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDeEIsVUFBVSxFQUFFLEtBQUs7YUFDcEIsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7O0lBR1gsZ0RBQVU7Ozs7UUFDZCxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsRTthQUNKOztZQUNELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNuQixLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztvQkFDN0MsVUFBVSxJQUFJLENBQUMsQ0FBQztpQkFDbkI7YUFDSjtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRTtZQUN2QixLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDcEU7YUFDSjs7WUFDRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUMzQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxVQUFVLENBQUM7b0JBQzlDLFVBQVUsSUFBSSxDQUFDLENBQUM7aUJBQ25CO2FBQ0o7U0FDSjs7UUFFRCxLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFOztnQkFDNUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7O2dCQUNyQyxJQUFNLFdBQVcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7Ozs7O0lBR0csK0NBQVM7Ozs7O1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkJDLE9BQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsS0FBVTtnQkFDMUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzNCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO3dCQUNsQixVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDbkMsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVztxQkFDekMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0osQ0FBQyxDQUFDO1NBQ047Ozs7O0lBR0csaURBQVc7Ozs7O1FBRWYsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtTQUNKOztRQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUdsQiwrQ0FBUzs7OztRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDOzs7OztJQUduQixpREFBVzs7OztRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQkMsUUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEM7OztnQkFwVFIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE1BQU0sRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2lCQUNoRDs7OztnQkFwQzRELGVBQWU7Z0JBRXhFLG1CQUFtQjtnQkFHbkIsaUJBQWlCO2dCQUdqQixJQUFJO2dCQUlrQixnQkFBZ0I7Ozs4QkE2QnJDLE1BQU07NkJBR04sU0FBUyxTQUFDLFFBQVE7O3NDQTVDdkI7RUFzQ1kseUJBQXlCOzs7Ozs7QUN0Q3JDOzs7O2dCQUtDLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osMkJBQTJCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsMkJBQTJCO3FCQUM1QjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDZDs7Z0NBaEJEOzs7Ozs7Ozs7Ozs7Ozs7In0=