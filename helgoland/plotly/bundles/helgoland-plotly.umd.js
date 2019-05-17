(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('@ngx-translate/core'), require('d3'), require('plotly.js')) :
    typeof define === 'function' && define.amd ? define('@helgoland/plotly', ['exports', '@angular/core', '@helgoland/core', '@ngx-translate/core', 'd3', 'plotly.js'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.plotly = {}),global.ng.core,null,null,null,null));
}(this, (function (exports,core,core$1,core$2,d3,Plotly) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
    var PlotlyProfileGraphComponent = (function (_super) {
        __extends(PlotlyProfileGraphComponent, _super);
        function PlotlyProfileGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
            var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) || this;
            _this.iterableDiffers = iterableDiffers;
            _this.api = api;
            _this.datasetIdResolver = datasetIdResolver;
            _this.timeSrvc = timeSrvc;
            _this.translateSrvc = translateSrvc;
            _this.onHighlight = new core.EventEmitter();
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
                            var timespan = new core$1.Timespan(option.timestamp);
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
                var range = d3.extent(data.value, function (d) { return d.value; });
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
                    axis.range = d3.extent([range[0], range[1], axis.range[0], axis.range[1]]);
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
                    Plotly.newPlot(this.plotlyArea, this.preparedData, this.layout, this.settings);
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
                    Plotly.relayout(this.plotlyArea, {});
                }
            };
        PlotlyProfileGraphComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'n52-plotly-profile-graph',
                        template: "<div #plotly></div>",
                        styles: [":host div{width:100%;height:100%}"]
                    },] },
        ];
        /** @nocollapse */
        PlotlyProfileGraphComponent.ctorParameters = function () {
            return [
                { type: core.IterableDiffers },
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$1.Time },
                { type: core$2.TranslateService }
            ];
        };
        PlotlyProfileGraphComponent.propDecorators = {
            onHighlight: [{ type: core.Output }],
            plotlyElem: [{ type: core.ViewChild, args: ['plotly',] }]
        };
        return PlotlyProfileGraphComponent;
    }(core$1.DatasetPresenterComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandPlotlyModule = (function () {
        function HelgolandPlotlyModule() {
        }
        HelgolandPlotlyModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            PlotlyProfileGraphComponent
                        ],
                        imports: [
                            core$1.HelgolandCoreModule
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

    exports.HelgolandPlotlyModule = HelgolandPlotlyModule;
    exports.PlotlyProfileGraphComponent = PlotlyProfileGraphComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXBsb3RseS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGhlbGdvbGFuZC9wbG90bHkvbGliL3Bsb3RseS1wcm9maWxlLWdyYXBoL3Bsb3RseS1wcm9maWxlLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wbG90bHkvbGliL3Bsb3RseS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSXRlcmFibGVEaWZmZXJzLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gICAgSURhdGFzZXQsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgUHJlc2VudGVySGlnaGxpZ2h0LFxuICAgIFByb2ZpbGVEYXRhRW50cnksXG4gICAgVGltZSxcbiAgICBUaW1lZERhdGFzZXRPcHRpb25zLFxuICAgIFRpbWVzcGFuLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQgKiBhcyBQbG90bHkgZnJvbSAncGxvdGx5LmpzJztcblxuaW50ZXJmYWNlIFJhd0RhdGEge1xuICAgIGRhdGFzZXQ6IElEYXRhc2V0O1xuICAgIGRhdGFzOiBQcm9maWxlRGF0YUVudHJ5W107XG4gICAgb3B0aW9uczogVGltZWREYXRhc2V0T3B0aW9uc1tdO1xufVxuXG5pbnRlcmZhY2UgRXh0ZW5kZWRTY2F0dGVyRGF0YSBleHRlbmRzIFBhcnRpYWw8UGxvdGx5LlNjYXR0ZXJEYXRhPiB7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgaWQ6IHN0cmluZztcbn1cblxuY29uc3QgTElORV9XSURUSF9TRUxFQ1RFRCA9IDU7XG5jb25zdCBMSU5FX1dJRFRIID0gMjtcbmNvbnN0IE1BUktFUl9TSVpFX1NFTEVDVEVEID0gMTA7XG5jb25zdCBNQVJLRVJfU0laRSA9IDY7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXBsb3RseS1wcm9maWxlLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgI3Bsb3RseT48L2Rpdj5gLFxuICAgIHN0eWxlczogW2A6aG9zdCBkaXZ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBQbG90bHlQcm9maWxlR3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8VGltZWREYXRhc2V0T3B0aW9uc1tdLCBhbnk+XG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkhpZ2hsaWdodDogRXZlbnRFbWl0dGVyPFByZXNlbnRlckhpZ2hsaWdodD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdwbG90bHknKVxuICAgIHB1YmxpYyBwbG90bHlFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBwbG90bHlBcmVhOiBhbnk7XG4gICAgcHJpdmF0ZSBwcmVwYXJlZERhdGE6IEV4dGVuZGVkU2NhdHRlckRhdGFbXSA9IFtdO1xuICAgIHByaXZhdGUgcmF3RGF0YTogTWFwPHN0cmluZywgUmF3RGF0YT4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb3VudGVyWEF4aXMgPSAwO1xuICAgIHByaXZhdGUgY291bnRlcllBeGlzID0gMDtcblxuICAgIHByaXZhdGUgbGF5b3V0OiBMYXlvdXQgPSB7XG4gICAgICAgIGF1dG9zaXplOiB0cnVlLFxuICAgICAgICBzaG93bGVnZW5kOiBmYWxzZSxcbiAgICAgICAgZHJhZ21vZGU6ICdwYW4nLFxuICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgIGw6IDQwLFxuICAgICAgICAgICAgcjogMTAsXG4gICAgICAgICAgICBiOiA0MCxcbiAgICAgICAgICAgIHQ6IDEwXG4gICAgICAgICAgICAvLyBwYWQ6IDEwMFxuICAgICAgICB9LFxuICAgICAgICBob3Zlcm1vZGU6ICdjbG9zZXN0J1xuICAgIH07XG5cbiAgICBwcml2YXRlIHNldHRpbmdzOiBQYXJ0aWFsPGFueT4gPSB7XG4gICAgICAgIGRpc3BsYXlNb2RlQmFyOiBmYWxzZSxcbiAgICAgICAgbW9kZUJhckJ1dHRvbnNUb1JlbW92ZTogW1xuICAgICAgICAgICAgJ3NlbmREYXRhVG9DbG91ZCcsXG4gICAgICAgICAgICAnaG92ZXJDb21wYXJlQ2FydGVzaWFuJ1xuICAgICAgICBdLFxuICAgICAgICBkaXNwbGF5bG9nbzogZmFsc2UsXG4gICAgICAgIHNob3dUaXBzOiBmYWxzZSxcbiAgICAgICAgc2Nyb2xsWm9vbTogdHJ1ZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxvdGx5QXJlYSA9IHRoaXMucGxvdGx5RWxlbS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWxvYWQgZGF0YSBhdCAnICsgbmV3IERhdGUoKSk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKTogdm9pZCB7IH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi50aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW4gPSBuZXcgVGltZXNwYW4ob3B0aW9uLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8UHJvZmlsZURhdGFFbnRyeT4oaWQsIHVybCwgdGltZXNwYW4pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhd0RhdGEuaGFzKGRhdGFzZXQuaW50ZXJuYWxJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChkYXRhc2V0LmludGVybmFsSWQpLmRhdGFzLnB1c2goZGF0YS52YWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhd0RhdGEuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCkub3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLnNldChkYXRhc2V0LmludGVybmFsSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhczogW2RhdGEudmFsdWVzWzBdXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtvcHRpb25dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYXdEYXRhLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcm90ZWN0ZWQgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogYW55KTogdm9pZCB7IH1cblxuICAgIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zW10sIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB1bnVzZWQgb3B0aW9uc1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZElkeCA9IHRoaXMucmF3RGF0YS5nZXQoaW50ZXJuYWxJZCkub3B0aW9ucy5maW5kSW5kZXgoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IG9wdGlvbnMuZmluZEluZGV4KChlKSA9PiBlLnRpbWVzdGFtcCA9PT0gb3B0aW9uLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVtb3ZlZElkeCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChpbnRlcm5hbElkKS5vcHRpb25zLnNwbGljZShyZW1vdmVkSWR4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhd0RhdGEuZ2V0KGludGVybmFsSWQpLmRhdGFzLnNwbGljZShyZW1vdmVkSWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NEYXRhKCkge1xuICAgICAgICB0aGlzLmNsZWFyTGF5b3V0KCk7XG4gICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XG4gICAgICAgIHRoaXMucmF3RGF0YS5mb3JFYWNoKChkYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgIGRhdGFFbnRyeS5vcHRpb25zLmZvckVhY2goKG9wdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKGRhdGFFbnRyeS5kYXRhc2V0LmludGVybmFsSWQpID49IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5kYXRhc1trZXldLnZhbHVlLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4LnB1c2goZW50cnkudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeS5wdXNoKGVudHJ5LnZlcnRpY2FsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXBhcmVkOiBFeHRlbmRlZFNjYXR0ZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2NhdHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogb3B0aW9uLnRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhRW50cnkuZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWF4aXM6IHRoaXMuY3JlYXRlWUF4aXMoZGF0YUVudHJ5LmRhdGFzZXQsIGRhdGFFbnRyeS5kYXRhc1trZXldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhheGlzOiB0aGlzLmNyZWF0ZVhBeGlzKGRhdGFFbnRyeS5kYXRhc2V0LCBkYXRhRW50cnkuZGF0YXNba2V5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBob3ZlcnRleHQ6IGRhdGFFbnRyeS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogb3B0aW9uLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzZWxlY3RlZCA/IExJTkVfV0lEVEhfU0VMRUNURUQgOiBMSU5FX1dJRFRIXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogc2VsZWN0ZWQgPyBNQVJLRVJfU0laRV9TRUxFQ1RFRCA6IE1BUktFUl9TSVpFXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2gocHJlcGFyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUF4aXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVhBeGlzKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBQcm9maWxlRGF0YUVudHJ5KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGF4aXM7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSAmJiB0aGlzLmxheW91dFtrZXldLnRpdGxlID09PSBkYXRhc2V0LnVvbSkge1xuICAgICAgICAgICAgICAgIGF4aXMgPSB0aGlzLmxheW91dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZDMuZXh0ZW50KGRhdGEudmFsdWUsIChkKSA9PiBkLnZhbHVlKTtcbiAgICAgICAgaWYgKCFheGlzKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJYQXhpcyA9IHRoaXMuY291bnRlclhBeGlzICsgMTtcbiAgICAgICAgICAgIGF4aXMgPSB0aGlzLmxheW91dFsneGF4aXMnICsgdGhpcy5jb3VudGVyWEF4aXNdID0ge1xuICAgICAgICAgICAgICAgIGlkOiAneCcgKyAodGhpcy5jb3VudGVyWEF4aXMgPiAxID8gdGhpcy5jb3VudGVyWEF4aXMgOiAnJyksXG4gICAgICAgICAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgIHplcm9saW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyZm9ybWF0OiAnLjJmJyxcbiAgICAgICAgICAgICAgICBzaG93bGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFtyYW5nZVswXSwgcmFuZ2VbMV1dLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlpbmc6ICcnLFxuICAgICAgICAgICAgICAgIC8vIHJhbmdlbW9kZTogJ3RvemVybycsXG4gICAgICAgICAgICAgICAgZml4ZWRyYW5nZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyWEF4aXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBheGlzLm92ZXJsYXlpbmcgPSAneCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBheGlzLnJhbmdlID0gZDMuZXh0ZW50KFtyYW5nZVswXSwgcmFuZ2VbMV0sIGF4aXMucmFuZ2VbMF0sIGF4aXMucmFuZ2VbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXhpcy5pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVlBeGlzKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBQcm9maWxlRGF0YUVudHJ5KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGF4aXM7XG4gICAgICAgIC8vIGZpbmQgYXhpc1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiZcbiAgICAgICAgICAgICAgICBrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0W2tleV0udGl0bGUgPT09IGRhdGEudmVydGljYWxVbml0KSB7XG4gICAgICAgICAgICAgICAgYXhpcyA9IHRoaXMubGF5b3V0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFheGlzKSB7XG4gICAgICAgICAgICAvLyBhZGQgYXhpc1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyWUF4aXMgPSB0aGlzLmNvdW50ZXJZQXhpcyArIDE7XG4gICAgICAgICAgICBheGlzID0gdGhpcy5sYXlvdXRbKCd5YXhpcycgKyB0aGlzLmNvdW50ZXJZQXhpcyldID0ge1xuICAgICAgICAgICAgICAgIGlkOiAneScgKyAodGhpcy5jb3VudGVyWUF4aXMgPiAxID8gdGhpcy5jb3VudGVyWUF4aXMgOiAnJyksXG4gICAgICAgICAgICAgICAgLy8gemVyb2xpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgICAgICAgICAgaG92ZXJmb3JtYXQ6ICcuMnInLFxuICAgICAgICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBhdXRvcmFuZ2U6ICdyZXZlcnNlZCcsXG4gICAgICAgICAgICAgICAgc2hvd2xpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlpbmc6ICcnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLnZlcnRpY2FsVW5pdCxcbiAgICAgICAgICAgICAgICBmaXhlZHJhbmdlOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ZXJZQXhpcyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGF4aXMub3ZlcmxheWluZyA9ICd5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXhpcy5pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUF4aXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ZXJZQXhpcyA+IDEpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3hheGlzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5kb21haW4gPSBbKDAuMSAqIHRoaXMuY291bnRlcllBeGlzKSAtIDAuMSwgMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHlheGlzQ291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnBvc2l0aW9uID0gMC4xICogeWF4aXNDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgeWF4aXNDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb3VudGVyWEF4aXMgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdGFydHNXaXRoKCd5YXhpcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0W2tleV0uZG9tYWluID0gWygwLjA2ICogdGhpcy5jb3VudGVyWEF4aXMpIC0gMC4wNiwgMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHhheGlzQ291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnBvc2l0aW9uID0gMC4wNiAqIHhheGlzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHhheGlzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIG9mZnNldCB0byB4YXhpcyByYW5nZXNcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdGFydHNXaXRoKCd4YXhpcycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmxheW91dFtrZXldLnJhbmdlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlT2Zmc2V0ID0gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pICogMC4wNTtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnJhbmdlID0gW3JhbmdlWzBdIC0gcmFuZ2VPZmZzZXQsIHJhbmdlWzFdICsgcmFuZ2VPZmZzZXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3Q2hhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsb3RseUFyZWEgJiYgdGhpcy5yYXdEYXRhLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NEYXRhKCk7XG4gICAgICAgICAgICBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3RseUFyZWEsIHRoaXMucHJlcGFyZWREYXRhLCB0aGlzLmxheW91dCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICAgICAgICB0aGlzLnBsb3RseUFyZWEub24oJ3Bsb3RseV9ob3ZlcicsIChlbnRyeTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnBvaW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IGVudHJ5LnBvaW50c1swXS5kYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiBlbnRyeS5wb2ludHNbMF0ucG9pbnROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyTGF5b3V0KCkge1xuICAgICAgICAvLyB0b2RvIHJlbW92ZSB5YXhpc1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGtleS5zdGFydHNXaXRoKCd5YXhpcycpIHx8IGtleS5zdGFydHNXaXRoKCd4YXhpcycpKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxheW91dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJlc2V0IGNvdW50ZXJcbiAgICAgICAgdGhpcy5jb3VudGVyWUF4aXMgPSAwO1xuICAgICAgICB0aGlzLmNvdW50ZXJYQXhpcyA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhckRhdGEoKSB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWRyYXdDaGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxvdGx5QXJlYSkge1xuICAgICAgICAgICAgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdGx5QXJlYSwge30pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgU2NhdHRlckRhdGEgZXh0ZW5kcyBQYXJ0aWFsPGFueT4ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBMYXlvdXQgZXh0ZW5kcyBQYXJ0aWFsPGFueT4ge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRDb3JlTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgUGxvdGx5UHJvZmlsZUdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9wbG90bHktcHJvZmlsZS1ncmFwaC9wbG90bHktcHJvZmlsZS1ncmFwaC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQbG90bHlQcm9maWxlR3JhcGhDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEhlbGdvbGFuZENvcmVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBsb3RseVByb2ZpbGVHcmFwaENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZFBsb3RseU1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsIkV2ZW50RW1pdHRlciIsIlRpbWVzcGFuIiwiZDMuZXh0ZW50IiwiUGxvdGx5Lm5ld1Bsb3QiLCJQbG90bHkucmVsYXlvdXQiLCJDb21wb25lbnQiLCJJdGVyYWJsZURpZmZlcnMiLCJEYXRhc2V0QXBpSW50ZXJmYWNlIiwiSW50ZXJuYWxJZEhhbmRsZXIiLCJUaW1lIiwiVHJhbnNsYXRlU2VydmljZSIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIkRhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQiLCJOZ01vZHVsZSIsIkhlbGdvbGFuZENvcmVNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFFRix1QkFBMEIsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMs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