(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('@ngx-translate/core'), require('d3'), require('moment')) :
    typeof define === 'function' && define.amd ? define('@helgoland/d3', ['exports', '@angular/core', '@helgoland/core', '@ngx-translate/core', 'd3', 'moment'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.d3 = {}),global.ng.core,null,null,null,null));
}(this, (function (exports,i0,core,i1,d3,moment) { 'use strict';

    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

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
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var D3OverviewTimeseriesGraphComponent = (function () {
        function D3OverviewTimeseriesGraphComponent(timeSrvc, cd) {
            this.timeSrvc = timeSrvc;
            this.cd = cd;
            this.onTimespanChanged = new i0.EventEmitter();
            this.onLoading = new i0.EventEmitter();
            this.onContentLoading = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'n52-d3-overview-timeseries-graph',
                        template: "<n52-d3-timeseries-graph [datasetIds]=\"datasetIds\" [datasetOptions]=\"datasetOptions\" [reloadForDatasets]=\"reloadForDatasets\"\n    [timeInterval]=\"overviewTimespan\" [mainTimeInterval]=\"timespan\" [presenterOptions]=\"presenterOptions\" (onTimespanChanged)=\"timeSpanChanged($event)\"\n    (onContentLoading)=\"onGraphLoading($event)\"></n52-d3-timeseries-graph>",
                        styles: [":host .d3{height:100%}"]
                    },] },
        ];
        /** @nocollapse */
        D3OverviewTimeseriesGraphComponent.ctorParameters = function () {
            return [
                { type: core.Time },
                { type: i0.ChangeDetectorRef }
            ];
        };
        D3OverviewTimeseriesGraphComponent.propDecorators = {
            datasetIds: [{ type: i0.Input }],
            datasetOptions: [{ type: i0.Input }],
            presenterOptions: [{ type: i0.Input }],
            timeInterval: [{ type: i0.Input }],
            rangefactor: [{ type: i0.Input }],
            reloadForDatasets: [{ type: i0.Input }],
            onTimespanChanged: [{ type: i0.Output }],
            onLoading: [{ type: i0.Output }],
            onContentLoading: [{ type: i0.Output }]
        };
        D3OverviewTimeseriesGraphComponent = __decorate([
            core.Mixin([core.HasLoadableContent]),
            __metadata("design:paramtypes", [core.Time,
                i0.ChangeDetectorRef])
        ], D3OverviewTimeseriesGraphComponent);
        return D3OverviewTimeseriesGraphComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This service holds the translations for d3 charts time axis labels.
     * Add a new translation with the method 'addTimeFormatLocale' like this sample:
     *
     * addTimeFormatLocale('de',
     * {
     *   'dateTime': '%a %b %e %X %Y',
     *   'date': '%d-%m-%Y',
     *   'time': '%H:%M:%S',
     *   'periods': ['AM', 'PM'],
     *   'days': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
     *   'shortDays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
     *   'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
     *   'shortMonths': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
     * })
     *
     */
    var D3TimeFormatLocaleService = (function () {
        function D3TimeFormatLocaleService(translateService) {
            this.translateService = translateService;
            this.timeFormatLocaleMapper = new Map();
        }
        /**
         * @param {?} localeCode
         * @param {?} definition
         * @return {?}
         */
        D3TimeFormatLocaleService.prototype.addTimeFormatLocale = /**
         * @param {?} localeCode
         * @param {?} definition
         * @return {?}
         */
            function (localeCode, definition) {
                this.timeFormatLocaleMapper.set(localeCode, definition);
            };
        /**
         * @param {?} specifier
         * @return {?}
         */
        D3TimeFormatLocaleService.prototype.getTimeLocale = /**
         * @param {?} specifier
         * @return {?}
         */
            function (specifier) {
                /** @type {?} */
                var langCode = this.translateService.currentLang;
                if (this.timeFormatLocaleMapper.has(langCode)) {
                    return d3.timeFormatLocale(this.timeFormatLocaleMapper.get(langCode)).format(specifier);
                }
                else {
                    return d3.timeFormat(specifier);
                }
            };
        D3TimeFormatLocaleService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        D3TimeFormatLocaleService.ctorParameters = function () {
            return [
                { type: i1.TranslateService }
            ];
        };
        /** @nocollapse */ D3TimeFormatLocaleService.ngInjectableDef = i0.defineInjectable({ factory: function D3TimeFormatLocaleService_Factory() { return new D3TimeFormatLocaleService(i0.inject(i1.TranslateService)); }, token: D3TimeFormatLocaleService, providedIn: "root" });
        return D3TimeFormatLocaleService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var HoveringStyle = {
        none: 'none',
        line: 'line',
        point: 'point',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var D3TimeseriesGraphComponent = (function (_super) {
        __extends(D3TimeseriesGraphComponent, _super);
        function D3TimeseriesGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, timeFormatLocaleService, colorService, translateService) {
            var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) || this;
            _this.iterableDiffers = iterableDiffers;
            _this.api = api;
            _this.datasetIdResolver = datasetIdResolver;
            _this.timeSrvc = timeSrvc;
            _this.timeFormatLocaleService = timeFormatLocaleService;
            _this.colorService = colorService;
            _this.translateService = translateService;
            _this.onHighlightChanged = new i0.EventEmitter();
            _this.onClickDataPoint = new i0.EventEmitter();
            // data types
            _this.preparedData = [];
            _this.datasetMap = new Map();
            _this.listOfUoms = [];
            _this.yRangesEachUom = [];
            _this.dataYranges = [];
            _this.xAxisRangeOrigin = [];
            _this.listOfSeparation = Array();
            _this.margin = {
                top: 10,
                right: 10,
                bottom: 40,
                left: 40
            };
            _this.maxLabelwidth = 0;
            _this.opac = {
                default: 0,
                hover: 0.3,
                click: 0.5
            };
            _this.addLineWidth = 2;
            _this.loadingCounter = 0;
            _this.plotOptions = {
                showReferenceValues: false,
                generalizeAllways: true,
                togglePanZoom: true,
                hoverable: true,
                hoverStyle: HoveringStyle.point,
                grid: true,
                yaxis: true,
                overview: false,
                showTimeLabel: true,
                requestBeforeAfterValues: false
            };
            /**
             * Function that shows labeling via mousmove.
             */
            _this.mousemoveHandler = function () {
                /** @type {?} */
                var coords = d3.mouse(_this.background.node());
                _this.labelTimestamp = [];
                _this.labelXCoord = [];
                _this.distLabelXCoord = [];
                _this.preparedData.forEach(function (entry, entryIdx) {
                    /** @type {?} */
                    var idx = _this.getItemForX(coords[0] + _this.bufferSum, entry.data);
                    _this.showDiagramIndicator(entry, idx, coords[0], entryIdx);
                });
                /** @type {?} */
                var outputIds = [];
                for (var key in _this.highlightOutput.ids) {
                    if (_this.highlightOutput.ids.hasOwnProperty(key)) {
                        outputIds.push(key);
                    }
                }
                if (outputIds.length <= 0) {
                    // do not show line in graph when no data available for timestamp
                    // do not show line in graph when no data available for timestamp
                    _this.focusG.style('visibility', 'hidden');
                }
                else {
                    /** @type {?} */
                    var last_1 = 0;
                    /** @type {?} */
                    var visible_1 = false;
                    /** @type {?} */
                    var first_1 = true;
                    /** @type {?} */
                    var labelArray = [];
                    /** @type {?} */
                    var textRectArray = d3.selectAll('.focus-visibility').nodes();
                    // get and sort all text labels and rectangle of the text labels and combine related
                    for (var i = 0; i < textRectArray.length; i += 2) {
                        labelArray.push([textRectArray[i], textRectArray[i + 1]]);
                    }
                    // sory by y coordinate
                    labelArray.sort(function (a, b) { return parseFloat(d3.select(a[0]).attr('y')) - parseFloat(d3.select(b[0]).attr('y')); });
                    // translate if overlapping
                    labelArray.forEach(function (el) {
                        // pairs of 2 objects (rectangle (equal) and label (odd))
                        d3.select(el[0])
                            .attr('transform', function (d, i, f) {
                            if (d3.select(el[0]).attr('visibility') !== 'hidden') {
                                visible_1 = true;
                                /** @type {?} */
                                var ycoord = parseFloat(d3.select(el[0]).attr('y'));
                                /** @type {?} */
                                var offset = 0;
                                if (!first_1) {
                                    offset = Math.max(0, (last_1 + 30) - ycoord);
                                    if (offset < 10) {
                                        offset = 10;
                                    }
                                }
                                if (offset > 0) {
                                    return 'translate(0, ' + offset + ')';
                                }
                            }
                            return 'translate(0, 0)';
                        });
                        d3.select(el[1])
                            .attr('transform', function (d, i, f) {
                            if (d3.select(el[1]).attr('visibility') !== 'hidden') {
                                visible_1 = true;
                                /** @type {?} */
                                var ycoord = parseFloat(d3.select(el[0]).attr('y'));
                                /** @type {?} */
                                var offset = 0;
                                if (!first_1) {
                                    offset = Math.max(0, (last_1 + 30) - ycoord);
                                    if (offset < 10) {
                                        offset = 10;
                                    }
                                }
                                last_1 = offset + ycoord;
                                if (offset > 0) {
                                    return 'translate(0, ' + offset + ')';
                                }
                            }
                            return 'translate(0, 0)';
                        });
                        if (visible_1) {
                            first_1 = false;
                        }
                    });
                }
                _this.onHighlightChanged.emit(_this.highlightOutput);
            };
            /**
             * Function that hides the labeling inside the graph.
             */
            _this.mouseoutHandler = function () {
                _this.hideDiagramIndicator();
            };
            /**
             * Function starting the drag handling for the diagram.
             */
            _this.panStartHandler = function () {
                _this.draggingMove = false;
                _this.dragMoveStart = d3.event.x;
                _this.dragMoveRange = [_this.xAxisRange.from, _this.xAxisRange.to];
            };
            /**
             * Function that controlls the panning (dragging) of the graph.
             */
            _this.panMoveHandler = function () {
                _this.draggingMove = true;
                if (_this.dragMoveStart && _this.draggingMove) {
                    /** @type {?} */
                    var diff = -(d3.event.x - _this.dragMoveStart);
                    /** @type {?} */
                    var amountTimestamp = _this.dragMoveRange[1] - _this.dragMoveRange[0];
                    /** @type {?} */
                    var ratioTimestampDiagCoord = amountTimestamp / _this.width;
                    /** @type {?} */
                    var newTimeMin = _this.dragMoveRange[0] + (ratioTimestampDiagCoord * diff);
                    /** @type {?} */
                    var newTimeMax = _this.dragMoveRange[1] + (ratioTimestampDiagCoord * diff);
                    _this.xAxisRangePan = [newTimeMin, newTimeMax];
                    _this.timespan = { from: _this.xAxisRangePan[0], to: _this.xAxisRangePan[1] };
                    _this.plotGraph();
                }
            };
            /**
             * Function that ends the dragging control.
             */
            _this.panEndHandler = function () {
                if (_this.xAxisRangePan) {
                    _this.changeTime(_this.xAxisRangePan[0], _this.xAxisRangePan[1]);
                    _this.plotGraph();
                    _this.dragMoveStart = null;
                    _this.draggingMove = false;
                    _this.xAxisRangePan = null;
                }
            };
            /**
             * Function that starts the zoom handling.
             */
            _this.zoomStartHandler = function () {
                _this.dragging = false;
                // dependent on point or line hovering
                // dependent on point or line hovering
                _this.dragStart = d3.mouse(_this.background.node());
                _this.xAxisRangeOrigin.push([_this.xAxisRange.from, _this.xAxisRange.to]);
            };
            /**
             * Function that draws a rectangle when zoom is started and the mouse is moving.
             */
            _this.zoomHandler = function () {
                _this.dragging = true;
                _this.drawDragRectangle();
            };
            /**
             * Function that ends the zoom handling and calculates the via zoom selected time interval.
             */
            _this.zoomEndHandler = function () {
                if (!_this.dragStart || !_this.dragging) {
                    if (_this.xAxisRangeOrigin[0]) {
                        // back to origin range (from - to)
                        // back to origin range (from - to)
                        _this.changeTime(_this.xAxisRangeOrigin[0][0], _this.xAxisRangeOrigin[0][1]);
                        _this.xAxisRangeOrigin = [];
                        _this.plotGraph();
                    }
                }
                else {
                    /** @type {?} */
                    var xDomainRange = void 0;
                    if (_this.dragStart[0] <= _this.dragCurrent[0]) {
                        xDomainRange = _this.getxDomain(_this.dragStart[0], _this.dragCurrent[0]);
                    }
                    else {
                        xDomainRange = _this.getxDomain(_this.dragCurrent[0], _this.dragStart[0]);
                    }
                    _this.xAxisRange = { from: xDomainRange[0], to: xDomainRange[1] };
                    _this.changeTime(_this.xAxisRange.from, _this.xAxisRange.to);
                    _this.plotGraph();
                }
                _this.dragStart = null;
                _this.dragging = false;
                _this.resetDrag();
            };
            /**
             * Function that enables the lableing of each dataset entry.
             * @param entry {InternalDataEntry} Object containing the dataset.
             * @param idx {Number} Number with the position of the dataset entry in the data array.
             * @param xCoordMouse {Number} Number of the x coordinate of the mouse.
             * @param entryIdx {Number} Number of the index of the entry.
             */
            _this.showDiagramIndicator = function (entry, idx, xCoordMouse, entryIdx) {
                /** @type {?} */
                var item = entry.data[idx];
                _this.labelXCoord[entryIdx] = null;
                _this.distLabelXCoord[entryIdx] = null;
                if (item !== undefined && item.yDiagCoord && item[1] !== undefined) {
                    // create line where mouse is
                    // create line where mouse is
                    _this.focusG.style('visibility', 'visible');
                    // show label if data available for time
                    // show label if data available for time
                    _this.chVisLabel(entry, true, entryIdx);
                    /** @type {?} */
                    var xMouseAndBuffer = xCoordMouse + _this.bufferSum;
                    /** @type {?} */
                    var labelBuffer = ((_this.timespan.from / (_this.timespan.to - _this.timespan.from)) * 0.0001)
                        * ((_this.timespan.from / (_this.timespan.to - _this.timespan.from)) * 0.0001);
                    labelBuffer = Math.max(10, labelBuffer);
                    _this.showLabelValues(entry, item);
                    _this.showTimeIndicatorLabel(item, entryIdx, xMouseAndBuffer);
                    if (item.xDiagCoord >= _this.background.node().getBBox().width + _this.bufferSum || xMouseAndBuffer < item.xDiagCoord - labelBuffer) {
                        _this.chVisLabel(entry, false, entryIdx);
                    }
                    if (xMouseAndBuffer < item.xDiagCoord) {
                        if (entry.data[idx - 1] && (Math.abs(entry.data[idx - 1].xDiagCoord - xMouseAndBuffer) < Math.abs(item.xDiagCoord - xMouseAndBuffer))) {
                            _this.chVisLabel(entry, false, entryIdx);
                            // show closest element to mouse
                            // show closest element to mouse
                            _this.showLabelValues(entry, entry.data[idx - 1]);
                            _this.showTimeIndicatorLabel(entry.data[idx - 1], entryIdx, xMouseAndBuffer);
                            _this.chVisLabel(entry, true, entryIdx);
                            // check for graph width and range between data point and mouse
                            if (entry.data[idx - 1].xDiagCoord >= _this.background.node().getBBox().width + _this.bufferSum
                                || entry.data[idx - 1].xDiagCoord <= _this.bufferSum
                                || entry.data[idx - 1].xDiagCoord + labelBuffer < xMouseAndBuffer) {
                                _this.chVisLabel(entry, false, entryIdx);
                            }
                        }
                    }
                }
                else {
                    // TODO: set hovering for labelbuffer after last and before first value of the graph
                    // hide label if no data available for time
                    // TODO: set hovering for labelbuffer after last and before first value of the graph
                    // hide label if no data available for time
                    _this.chVisLabel(entry, false, entryIdx);
                }
            };
            return _this;
        }
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.currentTimeId = this.uuidv4();
                // this.dotsObjects = [];
                this.rawSvg = d3.select(this.d3Elem.nativeElement)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', '100%');
                this.graph = this.rawSvg
                    .append('g')
                    .attr('transform', 'translate(' + (this.margin.left + this.maxLabelwidth) + ',' + this.margin.top + ')');
                this.graphFocus = this.rawSvg
                    .append('g')
                    .attr('transform', 'translate(' + (this.margin.left + this.maxLabelwidth) + ',' + this.margin.top + ')');
                this.mousedownBrush = false;
                this.plotGraph();
            };
        /**
         * @param {?} langChangeEvent
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.onLanguageChanged = /**
         * @param {?} langChangeEvent
         * @return {?}
         */
            function (langChangeEvent) {
                this.plotGraph();
            };
        /**
         * @param {?} datasetIds
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.reloadDataForDatasets = /**
         * @param {?} datasetIds
         * @return {?}
         */
            function (datasetIds) {
                var _this = this;
                datasetIds.forEach(function (id) {
                    if (_this.datasetMap.has(id)) {
                        _this.loadDatasetData(_this.datasetMap.get(id), true);
                    }
                });
            };
        /**
         * @param {?} id
         * @param {?} url
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.addDataset = /**
         * @param {?} id
         * @param {?} url
         * @return {?}
         */
            function (id, url) {
                var _this = this;
                this.api.getSingleTimeseries(id, url).subscribe(function (timeseries) { return _this.loadAddedDataset(timeseries); }, function (error) {
                    _this.api.getDataset(id, url).subscribe(function (dataset) { return _this.loadAddedDataset(dataset); });
                });
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.removeDataset = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                var _this = this;
                this.dataYranges = [];
                this.xAxisRangeOrigin = [];
                this.datasetMap.delete(internalId);
                /** @type {?} */
                var spliceIdx = this.preparedData.findIndex(function (entry) { return entry.internalId === internalId; });
                if (spliceIdx >= 0) {
                    this.preparedData.splice(spliceIdx, 1);
                    if (this.preparedData.length <= 0) {
                        this.yRangesEachUom = [];
                        this.plotGraph();
                    }
                    else {
                        this.preparedData.forEach(function (entry) {
                            _this.processData(entry);
                        });
                    }
                }
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.setSelectedId = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                /** @type {?} */
                var tsData = this.preparedData.find(function (e) { return e.internalId === internalId; });
                if (!tsData.selected || tsData.selected === undefined) {
                    tsData.selected = true;
                    tsData.lines.lineWidth += this.addLineWidth;
                    tsData.lines.pointRadius > 0 ? tsData.lines.pointRadius += this.addLineWidth : tsData.lines.pointRadius += 0;
                    tsData.bars.lineWidth += this.addLineWidth;
                    if (tsData.axisOptions.separateYAxis || !this.plotOptions.groupYaxis) {
                        this.checkYselector(tsData.internalId, tsData.axisOptions.uom);
                        if (this.yAxisSelect[internalId]) {
                            this.yAxisSelect[internalId].clicked = true;
                        }
                    }
                    else {
                        /** @type {?} */
                        var identifier_1 = tsData.axisOptions.uom;
                        /** @type {?} */
                        var existingUom = this.yRangesEachUom.find(function (el) { return el.uom === identifier_1; });
                        if (existingUom.ids.findIndex(function (el) { return el === internalId; }) >= 0) {
                            this.checkYselector(identifier_1, tsData.axisOptions.uom);
                            this.yAxisSelect[identifier_1].clicked = true;
                            this.yAxisSelect[identifier_1].ids.push(internalId);
                            // check axis for uom of dataset with selected internalId
                            if (existingUom !== undefined && existingUom.ids !== undefined) {
                                // only highlight axis of uom if all datasets with this uom are highlighted
                                // count datasets for specific uom
                                if (this.yAxisSelect[identifier_1].ids.length !== existingUom.ids.length) {
                                    this.yAxisSelect[identifier_1].clicked = false;
                                }
                                else {
                                    this.yAxisSelect[identifier_1].clicked = true;
                                }
                            }
                        }
                    }
                }
                this.plotGraph();
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.removeSelectedId = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                /** @type {?} */
                var tsData = this.preparedData.find(function (e) { return e.internalId === internalId; });
                if (tsData.selected || tsData.selected === undefined) {
                    tsData.selected = false;
                    tsData.lines.lineWidth -= this.addLineWidth;
                    tsData.lines.pointRadius > 0 ? tsData.lines.pointRadius -= this.addLineWidth : tsData.lines.pointRadius -= 0;
                    tsData.bars.lineWidth -= this.addLineWidth;
                    if (tsData.axisOptions.separateYAxis || !this.plotOptions.groupYaxis) {
                        this.checkYselector(tsData.internalId, tsData.axisOptions.uom);
                        if (this.yAxisSelect[tsData.internalId]) {
                            this.yAxisSelect[tsData.internalId].clicked = false;
                            if (this.yAxisSelect[tsData.internalId]) {
                                this.yAxisSelect[tsData.internalId].ids = [];
                            }
                        }
                    }
                    else {
                        /** @type {?} */
                        var identifier = tsData.axisOptions.uom;
                        this.checkYselector(identifier, tsData.axisOptions.uom);
                        this.yAxisSelect[identifier].ids = this.yAxisSelect[identifier].ids.filter(function (el) { return el !== internalId; });
                        this.yAxisSelect[identifier].clicked = false;
                    }
                }
                this.plotGraph();
            };
        /**
         * @param {?} options
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.presenterOptionsChanged = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                this.oldGroupYaxis = this.plotOptions.groupYaxis;
                if (this.plotOptions.hoverStyle !== HoveringStyle.point && options.hoverStyle === HoveringStyle.point) {
                    d3.select('g.d3line').attr('visibility', 'visible');
                }
                Object.assign(this.plotOptions, options);
                if (this.rawSvg && this.yRangesEachUom) {
                    this.plotGraph();
                }
            };
        /**
         * @param {?} internalId
         * @param {?} options
         * @param {?} firstChange
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.datasetOptionsChanged = /**
         * @param {?} internalId
         * @param {?} options
         * @param {?} firstChange
         * @return {?}
         */
            function (internalId, options, firstChange) {
                if (!firstChange && this.datasetMap.has(internalId)) {
                    this.loadDatasetData(this.datasetMap.get(internalId), false);
                }
            };
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.timeIntervalChanges = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.datasetMap.forEach(function (dataset) {
                    _this.loadDatasetData(dataset, false);
                });
            };
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.onResize = /**
         * @return {?}
         */
            function () {
                this.plotGraph();
            };
        /**
         * @param {?} timestamp
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.centerTime = /**
         * @param {?} timestamp
         * @return {?}
         */
            function (timestamp) {
                /** @type {?} */
                var centeredTimespan = this.timeSrvc.centerTimespan(this.timespan, new Date(timestamp));
                this.onTimespanChanged.emit(centeredTimespan);
            };
        /**
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.changeTime = /**
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
            function (from, to) {
                this.onTimespanChanged.emit(new core.Timespan(from, to));
            };
        /**
         * @param {?} dataset
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.loadAddedDataset = /**
         * @param {?} dataset
         * @return {?}
         */
            function (dataset) {
                this.datasetMap.set(dataset.internalId, dataset);
                this.loadDatasetData(dataset, false);
            };
        /**
         * @param {?} dataset
         * @param {?} force
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.loadDatasetData = /**
         * @param {?} dataset
         * @param {?} force
         * @return {?}
         */
            function (dataset, force) {
                var _this = this;
                /** @type {?} */
                var datasetOptions = this.datasetOptions.get(dataset.internalId);
                if (this.loadingCounter === 0) {
                    this.onContentLoading.emit(true);
                }
                this.loadingCounter++;
                if (dataset instanceof core.Timeseries) {
                    /** @type {?} */
                    var buffer = this.timeSrvc.getBufferedTimespan(this.timespan, 0.2);
                    this.api.getTsData(dataset.id, dataset.url, buffer, {
                        format: 'flot',
                        expanded: this.plotOptions.showReferenceValues || this.plotOptions.requestBeforeAfterValues,
                        generalize: this.plotOptions.generalizeAllways || datasetOptions.generalize
                    }, { forceUpdate: force }).subscribe(function (result) { return _this.prepareTsData(dataset, result); }, function (error) { return _this.onError(error); }, function () { return _this.onCompleteLoadingData(); });
                }
            };
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.onCompleteLoadingData = /**
         * @return {?}
         */
            function () {
                this.loadingCounter--;
                if (this.loadingCounter === 0) {
                    this.onContentLoading.emit(false);
                }
            };
        /**
         * Function to prepare each dataset for the graph and adding it to an array of datasets.
         * @param {?} dataset {IDataset} Object of the whole dataset
         * @param {?} data
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.prepareTsData = /**
         * Function to prepare each dataset for the graph and adding it to an array of datasets.
         * @param {?} dataset {IDataset} Object of the whole dataset
         * @param {?} data
         * @return {?}
         */
            function (dataset, data) {
                // add surrounding entries to the set
                if (data.valueBeforeTimespan) {
                    data.values.unshift(data.valueBeforeTimespan);
                }
                if (data.valueAfterTimespan) {
                    data.values.push(data.valueAfterTimespan);
                }
                this.datasetMap.get(dataset.internalId).data = data;
                /** @type {?} */
                var datasetIdx = this.preparedData.findIndex(function (e) { return e.internalId === dataset.internalId; });
                /** @type {?} */
                var styles = this.datasetOptions.get(dataset.internalId);
                // TODO: change uom for testing
                // if (this.preparedData.length > 0) {
                //     dataset.uom = 'mc';
                // }
                // generate random color, if color is not defined
                if (styles.color === undefined) {
                    styles.color = this.colorService.getColor();
                }
                /** @type {?} */
                var dataEntry = {
                    internalId: dataset.internalId,
                    id: (datasetIdx >= 0 ? datasetIdx : this.preparedData.length),
                    color: styles.color,
                    data: styles.visible ? data.values.map(function (d) { return ({ timestamp: d[0], value: d[1] }); }) : [],
                    points: {
                        fillColor: styles.color
                    },
                    lines: {
                        lineWidth: styles.lineWidth,
                        pointRadius: styles.pointRadius
                    },
                    bars: {
                        lineWidth: styles.lineWidth
                    },
                    axisOptions: {
                        uom: dataset.uom,
                        label: dataset.label,
                        zeroBased: styles.zeroBasedYAxis,
                        yAxisRange: styles.yAxisRange,
                        autoRangeSelection: styles.autoRangeSelection,
                        separateYAxis: styles.separateYAxis,
                        parameters: {
                            feature: dataset.parameters.feature,
                            phenomenon: dataset.parameters.phenomenon,
                            offering: dataset.parameters.offering
                        }
                    },
                    visible: styles.visible
                };
                /** @type {?} */
                var separationIdx = this.listOfSeparation.findIndex(function (id) { return id === dataset.internalId; });
                if (styles.separateYAxis) {
                    if (separationIdx < 0) {
                        this.listOfSeparation.push(dataset.internalId);
                    }
                }
                else {
                    this.listOfSeparation = this.listOfSeparation.filter(function (entry) { return entry !== dataset.internalId; });
                }
                // alternative linewWidth = this.plotOptions.selected.includes(dataset.uom)
                if (this.selectedDatasetIds.indexOf(dataset.internalId) >= 0) {
                    dataEntry.lines.lineWidth += this.addLineWidth;
                    dataEntry.lines.pointRadius > 0 ? dataEntry.lines.pointRadius += this.addLineWidth : dataEntry.lines.pointRadius += 0;
                    dataEntry.bars.lineWidth += this.addLineWidth;
                    if (styles.separateYAxis) {
                        this.checkYselector(dataEntry.internalId, dataEntry.axisOptions.uom);
                        if (this.yAxisSelect[dataEntry.internalId]) {
                            this.yAxisSelect[dataEntry.internalId].clicked = true;
                            this.yAxisSelect[dataEntry.internalId].ids.push(dataEntry.internalId);
                        }
                    }
                }
                // check selected datasets for highlighting
                if (this.yAxisSelect) {
                    if (styles.separateYAxis) {
                        if (this.yAxisSelect[dataEntry.axisOptions.uom]) {
                            /** @type {?} */
                            var idx = this.yAxisSelect[dataEntry.axisOptions.uom].ids.findIndex(function (el) { return el === dataEntry.internalId; });
                            if (idx >= 0) {
                                this.yAxisSelect[dataEntry.axisOptions.uom].ids.splice(idx, 1);
                            }
                            /** @type {?} */
                            var counted = this.countGroupedDatasets(dataEntry.axisOptions.uom, dataEntry.internalId);
                            if (this.yAxisSelect[dataEntry.axisOptions.uom].ids.length === counted) {
                                this.yAxisSelect[dataEntry.axisOptions.uom].clicked = true;
                            }
                        }
                    }
                    else {
                        if (this.yAxisSelect[dataEntry.internalId] && this.yAxisSelect[dataEntry.axisOptions.uom]) {
                            if (this.yAxisSelect[dataEntry.internalId].clicked) {
                                this.yAxisSelect[dataEntry.axisOptions.uom].ids.push(dataEntry.internalId);
                            }
                            else {
                                this.yAxisSelect[dataEntry.axisOptions.uom].clicked = false;
                            }
                            delete this.yAxisSelect[dataEntry.internalId];
                        }
                    }
                }
                if (datasetIdx >= 0) {
                    this.preparedData[datasetIdx] = dataEntry;
                }
                else {
                    this.preparedData.push(dataEntry);
                }
                this.addReferenceValueData(dataset.internalId, styles, data, dataset.uom);
                this.processData(dataEntry);
            };
        /**
         * Function to add referencevaluedata to the dataset (e.g. mean).
         * @param {?} internalId {String} String with the id of a dataset
         * @param {?} styles {DatasetOptions} Object containing information for dataset styling
         * @param {?} data {Data} Array of Arrays containing the measurement-data of the dataset
         * @param {?} uom {String} String with the uom of a dataset
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.addReferenceValueData = /**
         * Function to add referencevaluedata to the dataset (e.g. mean).
         * @param {?} internalId {String} String with the id of a dataset
         * @param {?} styles {DatasetOptions} Object containing information for dataset styling
         * @param {?} data {Data} Array of Arrays containing the measurement-data of the dataset
         * @param {?} uom {String} String with the uom of a dataset
         * @return {?}
         */
            function (internalId, styles, data, uom) {
                var _this = this;
                this.preparedData = this.preparedData.filter(function (entry) {
                    return !entry.internalId.startsWith('ref' + internalId);
                });
                if (this.plotOptions.showReferenceValues) {
                    styles.showReferenceValues.forEach(function (refValue) {
                        /** @type {?} */
                        var refDataEntry = {
                            internalId: 'ref' + internalId + refValue.id,
                            color: refValue.color,
                            visible: true,
                            data: data.referenceValues[refValue.id].map(function (d) { return ({ timestamp: d[0], value: d[1] }); }),
                            points: {
                                fillColor: refValue.color
                            },
                            lines: {
                                lineWidth: 1
                            },
                            axisOptions: {
                                uom: uom
                            }
                        };
                        _this.preparedData.push(refDataEntry);
                    });
                }
            };
        /**
         * Function that processes the data to calculate y axis range of each dataset.
         * @param dataEntry {DataEntry} Object containing dataset related data.
         */
        /**
         * Function that processes the data to calculate y axis range of each dataset.
         * @param {?} dataEntry {DataEntry} Object containing dataset related data.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.processData = /**
         * Function that processes the data to calculate y axis range of each dataset.
         * @param {?} dataEntry {DataEntry} Object containing dataset related data.
         * @return {?}
         */
            function (dataEntry) {
                var _this = this;
                /** @type {?} */
                var calculatedRange;
                /** @type {?} */
                var calculatedPreRange;
                /** @type {?} */
                var calculatedOriginRange;
                /** @type {?} */
                var predefinedRange;
                if (dataEntry.axisOptions.yAxisRange && dataEntry.axisOptions.yAxisRange.min !== dataEntry.axisOptions.yAxisRange.max) {
                    predefinedRange = dataEntry.axisOptions.yAxisRange;
                }
                /** @type {?} */
                var autoDataExtent = dataEntry.axisOptions.autoRangeSelection;
                /** @type {?} */
                var dataExtent = d3.extent(dataEntry.data, function (d) {
                    return d.value;
                });
                calculatedOriginRange = { min: dataExtent[0], max: dataExtent[1] };
                /** @type {?} */
                var setDataExtent = false;
                // calculate out of predefined range
                if (predefinedRange && !this.plotOptions.overview) {
                    if (predefinedRange.min > predefinedRange.max) {
                        calculatedRange = { min: predefinedRange.max, max: predefinedRange.min };
                        calculatedPreRange = { min: predefinedRange.max, max: predefinedRange.min };
                    }
                    else {
                        calculatedRange = { min: predefinedRange.min, max: predefinedRange.max };
                        calculatedPreRange = { min: predefinedRange.min, max: predefinedRange.max };
                    }
                    if (predefinedRange.min > dataExtent[1] || predefinedRange.max < dataExtent[0]) {
                        setDataExtent = autoDataExtent ? false : true;
                    }
                }
                else {
                    setDataExtent = true;
                }
                if (setDataExtent) {
                    calculatedRange = { min: dataExtent[0], max: dataExtent[1] };
                    this.extendRange(calculatedRange);
                }
                // if style option 'zero based y-axis' is checked,
                // the axis will be aligned to top 0 (with data below 0) or to bottom 0 (with data above 0)
                // let zeroBasedValue = -1;
                if (dataEntry.axisOptions.zeroBased && !this.plotOptions.overview) {
                    if (dataExtent[1] <= 0) {
                        calculatedRange.max = 0;
                        if (calculatedPreRange) {
                            calculatedPreRange.max = 0;
                        }
                    }
                    if (dataExtent[0] >= 0) {
                        calculatedRange.min = 0;
                        if (calculatedPreRange) {
                            calculatedPreRange.min = 0;
                        }
                    }
                }
                /** @type {?} */
                var newDatasetIdx = this.preparedData.findIndex(function (e) { return e.internalId === dataEntry.internalId; });
                // set range, uom and id for each dataset
                if (dataEntry.visible) {
                    this.dataYranges[newDatasetIdx] = {
                        uom: dataEntry.axisOptions.uom,
                        id: dataEntry.internalId,
                        zeroBased: dataEntry.axisOptions.zeroBased,
                        outOfrange: setDataExtent,
                        autoRange: autoDataExtent,
                        parameters: dataEntry.axisOptions.parameters
                    };
                    if (isFinite(calculatedRange.min) && isFinite(calculatedRange.max)) {
                        this.dataYranges[newDatasetIdx].range = calculatedRange;
                        this.dataYranges[newDatasetIdx].preRange = calculatedPreRange;
                        this.dataYranges[newDatasetIdx].originRange = calculatedOriginRange;
                    }
                }
                else {
                    this.dataYranges[newDatasetIdx] = null;
                }
                // set range and array of IDs for each uom to generate y-axis later on
                this.yRangesEachUom = [];
                this.dataYranges.forEach(function (yRange) {
                    if (yRange !== null) {
                        /** @type {?} */
                        var idx = _this.yRangesEachUom.findIndex(function (e) { return e.uom === yRange.uom; });
                        /** @type {?} */
                        var yrangeObj = {
                            uom: yRange.uom,
                            range: yRange.range,
                            preRange: yRange.preRange,
                            originRange: yRange.originRange,
                            ids: [yRange.id],
                            zeroBased: yRange.zeroBased,
                            outOfrange: yRange.outOfrange,
                            autoRange: yRange.autoRange,
                            parameters: yRange.parameters
                        };
                        if (idx >= 0) {
                            if (_this.yRangesEachUom[idx].range) {
                                if (yRange.range) {
                                    if (_this.yRangesEachUom[idx].autoRange || yRange.autoRange) {
                                        if (yRange.preRange && _this.yRangesEachUom[idx].preRange) {
                                            _this.checkCurrentLatest(idx, yRange, 'preRange');
                                            _this.yRangesEachUom[idx].range = _this.yRangesEachUom[idx].preRange;
                                        }
                                        else {
                                            _this.checkCurrentLatest(idx, yRange, 'range');
                                        }
                                        _this.yRangesEachUom[idx].autoRange = true;
                                    }
                                    else {
                                        if (yRange.outOfrange !== _this.yRangesEachUom[idx].outOfrange) {
                                            _this.checkCurrentLatest(idx, yRange, 'originRange');
                                            _this.yRangesEachUom[idx].range = _this.yRangesEachUom[idx].originRange;
                                        }
                                        else {
                                            _this.checkCurrentLatest(idx, yRange, 'range');
                                        }
                                    }
                                }
                            }
                            else {
                                _this.takeLatest(idx, yRange, 'range');
                            }
                            _this.yRangesEachUom[idx].ids.push(yRange.id);
                        }
                        else {
                            _this.yRangesEachUom.push(yrangeObj);
                        }
                    }
                });
                if (this.graph) {
                    this.plotGraph();
                }
            };
        /**
         * Function to set range to default interval, if min and max of range are not set.
         * @param range {MinMaxRange} range to be set
         */
        /**
         * Function to set range to default interval, if min and max of range are not set.
         * @param {?} range {MinMaxRange} range to be set
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.extendRange = /**
         * Function to set range to default interval, if min and max of range are not set.
         * @param {?} range {MinMaxRange} range to be set
         * @return {?}
         */
            function (range) {
                if (range.min === range.max) {
                    range.min = range.min - 1;
                    range.max = range.max + 1;
                }
            };
        /**
         * Function to check ranges for min and max range.
         * @param {?} idx {Number} Index of element
         * @param {?} obj {YRanges} new object to be compared with old
         * @param {?} pos {String} type of range (e.g. preRange, range, originRange)
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.checkCurrentLatest = /**
         * Function to check ranges for min and max range.
         * @param {?} idx {Number} Index of element
         * @param {?} obj {YRanges} new object to be compared with old
         * @param {?} pos {String} type of range (e.g. preRange, range, originRange)
         * @return {?}
         */
            function (idx, obj, pos) {
                if (this.yRangesEachUom[idx][pos].min > obj[pos].min && !isNaN(obj[pos].min)) {
                    this.yRangesEachUom[idx][pos].min = obj[pos].min;
                }
                if (this.yRangesEachUom[idx][pos].max < obj[pos].max && !isNaN(obj[pos].max)) {
                    this.yRangesEachUom[idx][pos].max = obj[pos].max;
                }
            };
        /**
         * Function to set min and max range.
         * @param {?} idx {Number} Index of element
         * @param {?} obj {YRanges} new object
         * @param {?} pos {String} type of range (e.g. preRange, range, originRange)
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.takeLatest = /**
         * Function to set min and max range.
         * @param {?} idx {Number} Index of element
         * @param {?} obj {YRanges} new object
         * @param {?} pos {String} type of range (e.g. preRange, range, originRange)
         * @return {?}
         */
            function (idx, obj, pos) {
                this.yRangesEachUom[idx][pos] = obj[pos];
            };
        /**
         * Function that returns the height of the graph diagram.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.calculateHeight = /**
         * Function that returns the height of the graph diagram.
         * @return {?}
         */
            function () {
                return ((this.d3Elem.nativeElement)).clientHeight - this.margin.top - this.margin.bottom + (this.plotOptions.showTimeLabel ? 0 : 20);
            };
        /**
         * Function that returns the width of the graph diagram.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.calculateWidth = /**
         * Function that returns the width of the graph diagram.
         * @return {?}
         */
            function () {
                return this.rawSvg.node().width.baseVal.value - this.margin.left - this.margin.right - this.maxLabelwidth;
            };
        /**
         * Function that returns the value range for building the y axis for each uom of every dataset.
         * @param {?} uom {String} String that is the uom of a dataset
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getyAxisRange = /**
         * Function that returns the value range for building the y axis for each uom of every dataset.
         * @param {?} uom {String} String that is the uom of a dataset
         * @return {?}
         */
            function (uom) {
                /** @type {?} */
                var rangeObj = this.yRangesEachUom.find(function (el) { return el.uom === uom; });
                if (rangeObj) {
                    // check for zero based y axis
                    // if (rangeObj.zeroBased) {
                    //     if (rangeObj.zeroBasedValue === 0) {
                    //         range.min = 0;
                    //     } else {
                    //         range.max = 0;
                    //     }
                    // }
                    return rangeObj.range;
                }
                return null; // error: uom does not exist
            };
        /**
         * Function to plot the graph and its dependencies
         * (graph line, graph axes, event handlers)
         */
        /**
         * Function to plot the graph and its dependencies
         * (graph line, graph axes, event handlers)
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.plotGraph = /**
         * Function to plot the graph and its dependencies
         * (graph line, graph axes, event handlers)
         * @return {?}
         */
            function () {
                var _this = this;
                this.highlightOutput = {
                    timestamp: 0,
                    ids: new Map()
                };
                if (!this.yRangesEachUom) {
                    return;
                }
                this.preparedData.forEach(function (entry) {
                    /** @type {?} */
                    var idx = _this.listOfUoms.findIndex(function (uom) { return uom === entry.axisOptions.uom; });
                    if (idx < 0) {
                        _this.listOfUoms.push(entry.axisOptions.uom);
                    }
                });
                // adapt axis highlighting, when changing grouping of y axis
                if (this.oldGroupYaxis !== this.plotOptions.groupYaxis) {
                    this.changeYselection();
                }
                this.height = this.calculateHeight();
                this.width = this.calculateWidth();
                this.graph.selectAll('*').remove();
                this.graphFocus.selectAll('*').remove();
                this.bufferSum = 0;
                this.yScaleBase = null;
                // get range of x and y axis
                this.xAxisRange = this.timespan;
                /** @type {?} */
                var yAxisArray = [];
                if (this.plotOptions.groupYaxis || this.plotOptions.groupYaxis === undefined) {
                    yAxisArray = this.yRangesEachUom;
                    // push all listOfSeparation into yAxisArray
                    if (this.listOfSeparation.length > 0) {
                        this.listOfSeparation.forEach(function (sepId) {
                            /** @type {?} */
                            var newEl = _this.dataYranges.find(function (el) { return el !== null && el.id === sepId; });
                            if (newEl && (yAxisArray.findIndex(function (el) { return el.id === newEl.id; }) < 0)) {
                                /** @type {?} */
                                var existingUom = yAxisArray.findIndex(function (el) { return el.uom === newEl.uom && (el.ids !== undefined || el.ids.length === 0); });
                                if (existingUom >= 0) {
                                    /** @type {?} */
                                    var deleteId = yAxisArray[existingUom].ids.findIndex(function (id) { return id === sepId; });
                                    if (deleteId >= 0) {
                                        yAxisArray[existingUom].ids.splice(deleteId, 1);
                                    }
                                    if (yAxisArray[existingUom].ids.length === 0) {
                                        // delete yAxisArray[existingUom]
                                        yAxisArray.splice(existingUom, 1);
                                    }
                                }
                                yAxisArray.push(newEl);
                            }
                        });
                    }
                }
                else {
                    yAxisArray = this.dataYranges;
                }
                yAxisArray.forEach(function (entry) {
                    if (entry !== null) {
                        entry.first = (_this.yScaleBase === null);
                        entry.offset = _this.bufferSum;
                        /** @type {?} */
                        var yAxisResult = _this.drawYaxis(entry);
                        if (_this.yScaleBase === null) {
                            _this.yScaleBase = yAxisResult.yScale;
                            _this.bufferSum = yAxisResult.buffer;
                        }
                        else {
                            _this.bufferSum = yAxisResult.buffer;
                        }
                        entry.yScale = yAxisResult.yScale;
                    }
                });
                if (!this.yScaleBase) {
                    return;
                }
                // draw x and y axis
                this.drawXaxis(this.bufferSum);
                // create background as rectangle providing panning
                this.background = this.graph.append('svg:rect')
                    .attr('width', this.width - this.bufferSum)
                    .attr('height', this.height)
                    .attr('id', 'backgroundRect')
                    .attr('fill', 'none')
                    .attr('stroke', 'none')
                    .attr('pointer-events', 'all')
                    .attr('transform', 'translate(' + this.bufferSum + ', 0)');
                this.drawAllGraphLines();
                this.addTimespanJumpButtons();
                // #####################################################
                // create background rect
                if (!this.plotOptions.overview) {
                    // execute when it is not an overview diagram
                    // mouse events hovering
                    if (this.plotOptions.hoverable) {
                        if (this.plotOptions.hoverStyle === HoveringStyle.line) {
                            this.createLineHovering();
                        }
                        else {
                            d3.select('g.d3line').attr('visibility', 'hidden');
                        }
                    }
                    if (this.plotOptions.togglePanZoom === false) {
                        this.background
                            .call(d3.zoom()
                            .on('start', this.zoomStartHandler)
                            .on('zoom', this.zoomHandler)
                            .on('end', this.zoomEndHandler));
                    }
                    else {
                        this.background
                            .call(d3.drag()
                            .on('start', this.panStartHandler)
                            .on('drag', this.panMoveHandler)
                            .on('end', this.panEndHandler));
                    }
                    this.createCopyrightLabel();
                }
                else {
                    /** @type {?} */
                    var interval = this.getXDomainByTimestamp();
                    /** @type {?} */
                    var overviewTimespanInterval = [interval[0], interval[1]];
                    /** @type {?} */
                    var brush = d3.brushX()
                        .extent([[0, 0], [this.width, this.height]])
                        .on('end', function () {
                        // on mouseclick change time after brush was moved
                        if (_this.mousedownBrush) {
                            /** @type {?} */
                            var timeByCoord = _this.getTimestampByCoord(d3.event.selection[0], d3.event.selection[1]);
                            _this.changeTime(timeByCoord[0], timeByCoord[1]);
                        }
                        _this.mousedownBrush = false;
                    });
                    // add brush to svg
                    this.background = this.graph.append('g')
                        .attr('width', this.width)
                        .attr('height', this.height)
                        .attr('pointer-events', 'all')
                        .attr('class', 'brush')
                        .call(brush)
                        .call(brush.move, overviewTimespanInterval);
                    /**
                                 * add event to selection to prevent unnecessary re-rendering of brush
                                 * add style of brush selection here
                                 * e.g. 'fill' for color,
                                 * 'stroke' for borderline-color,
                                 * 'stroke-dasharray' for customizing borderline-style
                                 */
                    this.background.selectAll('.selection')
                        .attr('stroke', 'none')
                        .on('mousedown', function () {
                        _this.mousedownBrush = true;
                    });
                    // do not allow clear selection
                    this.background.selectAll('.overlay')
                        .remove();
                    // add event to resizing handle to allow change time on resize
                    this.background.selectAll('.handle')
                        .style('fill', 'red')
                        .style('opacity', 0.3)
                        .attr('stroke', 'none')
                        .on('mousedown', function () {
                        _this.mousedownBrush = true;
                    });
                }
            };
        /**
         * @param {?} entry
         * @param {?} line
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.createPointHovering = /**
         * @param {?} entry
         * @param {?} line
         * @return {?}
         */
            function (entry, line) {
                var _this = this;
                this.graphBody.selectAll('.hoverDots')
                    .data(entry.data.filter(function (d) { return !isNaN(d.value); }))
                    .enter().append('circle')
                    .attr('class', 'hoverDots')
                    .attr('id', function (d) { return 'hover-dot-' + d.timestamp + '-' + entry.id; })
                    .attr('stroke', 'transparent')
                    .attr('fill', 'transparent')
                    .attr('cx', line.x())
                    .attr('cy', line.y())
                    .attr('r', entry.lines.pointRadius + 3)
                    .on('mouseover', function (d) { return _this.mouseOverPointHovering(d, entry); })
                    .on('mouseout', function (d) { return _this.mouseOutPointHovering(d, entry); })
                    .on('mousedown', function (d) { return _this.clickDataPoint(d, entry); });
            };
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.createLineHovering = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.background
                    .on('mousemove.focus', this.mousemoveHandler)
                    .on('mouseout.focus', this.mouseoutHandler);
                // line inside graph
                this.highlightFocus = this.focusG.append('svg:line')
                    .attr('class', 'mouse-focus-line')
                    .attr('x2', '0')
                    .attr('y2', '0')
                    .attr('x1', '0')
                    .attr('y1', '0')
                    .style('stroke', 'black')
                    .style('stroke-width', '1px');
                this.preparedData.forEach(function (entry) {
                    // label inside graph
                    entry.focusLabelRect = _this.focusG.append('svg:rect')
                        .attr('class', 'mouse-focus-label')
                        .style('fill', 'white')
                        .style('stroke', 'none')
                        .style('pointer-events', 'none');
                    entry.focusLabel = _this.focusG.append('svg:text')
                        .attr('class', 'mouse-focus-label')
                        .style('pointer-events', 'none')
                        .style('fill', entry.color)
                        .style('font-weight', 'lighter');
                    _this.focuslabelTime = _this.focusG.append('svg:text')
                        .style('pointer-events', 'none')
                        .attr('class', 'mouse-focus-time');
                });
            };
        /**
         * @param {?} d
         * @param {?} entry
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.clickDataPoint = /**
         * @param {?} d
         * @param {?} entry
         * @return {?}
         */
            function (d, entry) {
                var _this = this;
                console.log('click point');
                if (d !== undefined) {
                    /** @type {?} */
                    var externalId = this.datasetIdResolver.resolveInternalId(entry.internalId);
                    /** @type {?} */
                    var apiurl_1 = externalId.url;
                    /** @type {?} */
                    var timespan_1 = { from: d.timestamp, to: d.timestamp };
                    // request all timeseries that have data for the same offering and feature
                    this.api.getTimeseries(apiurl_1, {
                        offering: entry.axisOptions.parameters.offering.id,
                        feature: entry.axisOptions.parameters.feature.id
                    }).subscribe(function (tsArray) {
                        /** @type {?} */
                        var timeseries = [];
                        tsArray.forEach(function (ts) {
                            timeseries.push(ts.id);
                        });
                        // request ts data by timeseries ID for specific offering and feature
                        // request ts data by timeseries ID for specific offering and feature
                        _this.api.getTimeseriesData(apiurl_1, timeseries, timespan_1)
                            .subscribe(function (tsData) { return _this.onClickDataPoint.emit(tsData); }, function (error) { return console.error(error); });
                    }, function (error) { return console.error(error); });
                }
            };
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.addTimespanJumpButtons = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var dataVisible = false;
                /** @type {?} */
                var formerTimestamp = null;
                /** @type {?} */
                var laterTimestamp = null;
                if (this.plotOptions.requestBeforeAfterValues) {
                    this.preparedData.forEach(function (entry) {
                        /** @type {?} */
                        var firstIdxInTimespan = entry.data.findIndex(function (e) { return (_this.timespan.from < e[0] && _this.timespan.to > e[0]) && isFinite(e[1]); });
                        if (firstIdxInTimespan < 0) {
                            /** @type {?} */
                            var lastIdxInTimespan = entry.data.findIndex(function (e) { return (e[0] > _this.timespan.from && e[0] > _this.timespan.to) && isFinite(e[1]); });
                            if (lastIdxInTimespan >= 0) {
                                laterTimestamp = entry.data[entry.data.length - 1][0];
                            }
                            /** @type {?} */
                            var temp = entry.data.findIndex(function (e) { return (e[0] < _this.timespan.from && e[0] < _this.timespan.to) && isFinite(e[1]); });
                            if (temp >= 0) {
                                formerTimestamp = entry.data[entry.data.length - 1][0];
                            }
                        }
                        else {
                            dataVisible = true;
                        }
                    });
                }
                if (!dataVisible) {
                    /** @type {?} */
                    var buttonWidth = 50;
                    /** @type {?} */
                    var leftRight = 15;
                    if (formerTimestamp) {
                        /** @type {?} */
                        var g = this.background.append('g');
                        g.append('svg:rect')
                            .attr('class', 'formerButton')
                            .attr('width', buttonWidth + 'px')
                            .attr('height', this.height + 'px')
                            .attr('transform', 'translate(' + this.bufferSum + ', 0)')
                            .on('click', function () { return _this.centerTime(formerTimestamp); });
                        g.append('line')
                            .attr('class', 'arrow')
                            .attr('x1', 0 + this.bufferSum + leftRight + 'px')
                            .attr('y1', this.height / 2 + 'px')
                            .attr('x2', 0 + this.bufferSum + (buttonWidth - leftRight) + 'px')
                            .attr('y2', this.height / 2 - (buttonWidth - leftRight) / 2 + 'px');
                        g.append('line')
                            .attr('class', 'arrow')
                            .attr('x1', 0 + this.bufferSum + leftRight + 'px')
                            .attr('y1', this.height / 2 + 'px')
                            .attr('x2', 0 + this.bufferSum + (buttonWidth - leftRight) + 'px')
                            .attr('y2', this.height / 2 + (buttonWidth - leftRight) / 2 + 'px');
                    }
                    if (laterTimestamp) {
                        /** @type {?} */
                        var g = this.background.append('g');
                        g.append('svg:rect')
                            .attr('class', 'laterButton')
                            .attr('width', '50px')
                            .attr('height', this.height)
                            .attr('transform', 'translate(' + (this.width - 50) + ', 0)')
                            .on('click', function () { return _this.centerTime(laterTimestamp); });
                        g.append('line')
                            .attr('class', 'arrow')
                            .attr('x1', this.width - leftRight + 'px')
                            .attr('y1', this.height / 2 + 'px')
                            .attr('x2', this.width - (buttonWidth - leftRight) + 'px')
                            .attr('y2', this.height / 2 - (buttonWidth - leftRight) / 2 + 'px');
                        g.append('line')
                            .attr('class', 'arrow')
                            .attr('x1', this.width - leftRight + 'px')
                            .attr('y1', this.height / 2 + 'px')
                            .attr('x2', this.width - (buttonWidth - leftRight) + 'px')
                            .attr('y2', this.height / 2 + (buttonWidth - leftRight) / 2 + 'px');
                    }
                }
            };
        /**
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.createCopyrightLabel = /**
         * @return {?}
         */
            function () {
                if (this.plotOptions.copyright) {
                    /** @type {?} */
                    var background = this.getDimensions(this.background.node());
                    /** @type {?} */
                    var x = 0;
                    /** @type {?} */
                    var y = 0; // + this.margin.top; // top
                    this.copyright = this.graph.append('g');
                    /** @type {?} */
                    var copyrightLabel = this.copyright.append('svg:text')
                        .text(this.plotOptions.copyright.label)
                        .attr('class', 'copyright')
                        .style('pointer-events', 'none')
                        .style('fill', 'grey');
                    if (this.plotOptions.copyright.positionX === 'right') {
                        x = background.w - this.margin.right - this.getDimensions(copyrightLabel.node()).w;
                    }
                    if (this.plotOptions.copyright.positionY === 'bottom') {
                        y = background.h - this.margin.top * 2;
                    }
                    /** @type {?} */
                    var yTransform = y + this.getDimensions(copyrightLabel.node()).h - 3;
                    /** @type {?} */
                    var xTransform = this.bufferSum + x;
                    copyrightLabel
                        .attr('transform', 'translate(' + xTransform + ', ' + yTransform + ')');
                    this.copyright.append('svg:rect')
                        .attr('class', 'copyright')
                        .style('fill', 'none')
                        .style('stroke', 'none')
                        .style('pointer-events', 'none')
                        .attr('width', this.getDimensions(copyrightLabel.node()).w)
                        .attr('height', this.getDimensions(copyrightLabel.node()).h)
                        .attr('transform', 'translate(' + xTransform + ', ' + y + ')');
                }
            };
        /**
         * Draws for every preprared data entry the graph line.
         */
        /**
         * Draws for every preprared data entry the graph line.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.drawAllGraphLines = /**
         * Draws for every preprared data entry the graph line.
         * @return {?}
         */
            function () {
                var _this = this;
                this.focusG = this.graphFocus.append('g');
                if ((this.plotOptions.hoverStyle === HoveringStyle.point) && !this.plotOptions.overview) {
                    // create label for point hovering
                    this.highlightRect = this.focusG.append('svg:rect');
                    this.highlightText = this.focusG.append('svg:text');
                }
                this.preparedData.forEach(function (entry) { return _this.drawGraphLine(entry); });
            };
        /**
         * Function that calculates and returns the x diagram coordinate for the brush range
         * for the overview diagram by the selected time interval of the main diagram.
         * Calculate to get brush extent when main diagram time interval changes.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getXDomainByTimestamp = /**
         * Function that calculates and returns the x diagram coordinate for the brush range
         * for the overview diagram by the selected time interval of the main diagram.
         * Calculate to get brush extent when main diagram time interval changes.
         * @return {?}
         */
            function () {
                /** *
                 * calculate range of brush with timestamp and not diagram coordinates
                 * formula:
                 * brush_min =
                 * (overview_width / (overview_max - overview_min)) * (brush_min - overview_min)
                 * brus_max =
                 * (overview_width / (overview_max - overview_min)) * (brush_max - overview_min)
                  @type {?} */
                var minOverviewTimeInterval = this.timespan.from;
                /** @type {?} */
                var maxOverviewTimeInterval = this.timespan.to;
                /** @type {?} */
                var minDiagramTimestamp = this.mainTimeInterval.from;
                /** @type {?} */
                var maxDiagramTimestamp = this.mainTimeInterval.to;
                /** @type {?} */
                var diagramWidth = this.width;
                /** @type {?} */
                var diffOverviewTimeInterval = maxOverviewTimeInterval - minOverviewTimeInterval;
                /** @type {?} */
                var divOverviewTimeWidth = diagramWidth / diffOverviewTimeInterval;
                /** @type {?} */
                var minCalcBrush = divOverviewTimeWidth * (minDiagramTimestamp - minOverviewTimeInterval);
                /** @type {?} */
                var maxCalcBrush = divOverviewTimeWidth * (maxDiagramTimestamp - minOverviewTimeInterval);
                return [minCalcBrush, maxCalcBrush];
            };
        /**
         * Function that calculates and returns the timestamp for the main diagram calculated
         * by the selected coordinate of the brush range.
         * @param {?} minCalcBrush {Number} Number with the minimum coordinate of the selected brush range.
         * @param {?} maxCalcBrush {Number} Number with the maximum coordinate of the selected brush range.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getTimestampByCoord = /**
         * Function that calculates and returns the timestamp for the main diagram calculated
         * by the selected coordinate of the brush range.
         * @param {?} minCalcBrush {Number} Number with the minimum coordinate of the selected brush range.
         * @param {?} maxCalcBrush {Number} Number with the maximum coordinate of the selected brush range.
         * @return {?}
         */
            function (minCalcBrush, maxCalcBrush) {
                /** *
                 * calculate range of brush with timestamp and not diagram coordinates
                 * formula:
                 * minDiagramTimestamp =
                 * ((minCalcBrush / overview_width) * (overview_max - overview_min)) + overview_min
                 * maxDiagramTimestamp =
                 * ((maxCalcBrush / overview_width) * (overview_max - overview_min)) + overview_min
                  @type {?} */
                var minOverviewTimeInterval = this.timespan.from;
                /** @type {?} */
                var maxOverviewTimeInterval = this.timespan.to;
                /** @type {?} */
                var diagramWidth = this.width;
                /** @type {?} */
                var diffOverviewTimeInterval = maxOverviewTimeInterval - minOverviewTimeInterval;
                /** @type {?} */
                var minDiagramTimestamp = ((minCalcBrush / diagramWidth) * diffOverviewTimeInterval) + minOverviewTimeInterval;
                /** @type {?} */
                var maxDiagramTimestamp = ((maxCalcBrush / diagramWidth) * diffOverviewTimeInterval) + minOverviewTimeInterval;
                return [minDiagramTimestamp, maxDiagramTimestamp];
            };
        /**
         * Function that draws the x axis to the svg element.
         * @param {?} bufferXrange {Number} Number with the distance between left edge and the beginning of the graph.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.drawXaxis = /**
         * Function that draws the x axis to the svg element.
         * @param {?} bufferXrange {Number} Number with the distance between left edge and the beginning of the graph.
         * @return {?}
         */
            function (bufferXrange) {
                var _this = this;
                // range for x axis scale
                this.xScaleBase = d3.scaleTime()
                    .domain([new Date(this.xAxisRange.from), new Date(this.xAxisRange.to)])
                    .range([bufferXrange, this.width]);
                /** @type {?} */
                var xAxis = d3.axisBottom(this.xScaleBase)
                    .tickFormat(function (d) {
                    /** @type {?} */
                    var date = new Date(d.valueOf());
                    /** @type {?} */
                    var formatMillisecond = '.%L';
                    /** @type {?} */
                    var formatSecond = ':%S';
                    /** @type {?} */
                    var formatMinute = '%H:%M';
                    /** @type {?} */
                    var formatHour = '%H:%M';
                    /** @type {?} */
                    var formatDay = '%b %d';
                    /** @type {?} */
                    var formatWeek = '%b %d';
                    /** @type {?} */
                    var formatMonth = '%B';
                    /** @type {?} */
                    var formatYear = '%Y';
                    /** @type {?} */
                    var format = d3.timeSecond(date) < date ? formatMillisecond
                        : d3.timeMinute(date) < date ? formatSecond
                            : d3.timeHour(date) < date ? formatMinute
                                : d3.timeDay(date) < date ? formatHour
                                    : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                                        : d3.timeYear(date) < date ? formatMonth
                                            : formatYear;
                    return _this.timeFormatLocaleService.getTimeLocale(format)(new Date(d.valueOf()));
                });
                this.graph.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.height + ')')
                    .call(xAxis)
                    .selectAll('text')
                    .style('text-anchor', 'middle');
                if (this.plotOptions.grid) {
                    // draw the x grid lines
                    this.graph.append('svg:g')
                        .attr('class', 'grid')
                        .attr('transform', 'translate(0,' + this.height + ')')
                        .call(xAxis
                        .tickSize(-this.height)
                        .tickFormat(function () { return ''; }));
                }
                // draw upper axis as border
                this.graph.append('svg:g')
                    .attr('class', 'x axis')
                    .call(d3.axisTop(this.xScaleBase).ticks(0).tickSize(0));
                // text label for the x axis
                if (this.plotOptions.showTimeLabel) {
                    this.graph.append('text')
                        .attr('x', (this.width + bufferXrange) / 2)
                        .attr('y', this.height + this.margin.bottom - 5)
                        .style('text-anchor', 'middle')
                        .text('time');
                }
            };
        /**
         * Function to draw the y axis for each dataset.
         * Each uom has its own axis.
         * @param {?} entry {DataEntry} Object containing a dataset.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.drawYaxis = /**
         * Function to draw the y axis for each dataset.
         * Each uom has its own axis.
         * @param {?} entry {DataEntry} Object containing a dataset.
         * @return {?}
         */
            function (entry) {
                var _this = this;
                /** @type {?} */
                var showAxis = (this.plotOptions.overview ? false : (this.plotOptions.yaxis === undefined ? true : this.plotOptions.yaxis));
                /** @type {?} */
                var range;
                if (this.plotOptions.groupYaxis || this.plotOptions.groupYaxis === undefined) {
                    /** @type {?} */
                    var uomIdx = this.listOfUoms.findIndex(function (uom) { return uom === entry.uom; });
                    if (uomIdx >= 0 && entry.ids && entry.ids.length > 1) {
                        // grouped with more than ony datasets (if uom has more than one datasets)
                        range = this.getyAxisRange(entry.uom);
                    }
                    else {
                        /** @type {?} */
                        var entryElem = this.dataYranges.find(function (el) { return el !== null && (entry.id ? el.id === entry.id : el.id === entry.ids[0]); });
                        if (entryElem) {
                            range = entryElem.range;
                            // range = entryElem.preRange ? entryElem.preRange : entryElem.range;
                        }
                    }
                }
                else {
                    /** @type {?} */
                    var entryElem = this.dataYranges.find(function (el) { return el !== null && el.id === entry.id; });
                    if (entryElem) {
                        range = entryElem.preRange ? entryElem.preRange : entryElem.range;
                    }
                }
                /** @type {?} */
                var yMin = -1;
                /** @type {?} */
                var yMax = 1;
                if (range !== undefined && range !== null) {
                    yMin = range.min;
                    yMax = range.max;
                }
                /** @type {?} */
                var rangeOffset = (yMax - yMin) * 0.10;
                /** @type {?} */
                var yScale = d3.scaleLinear()
                    .domain([yMin - rangeOffset, yMax + rangeOffset])
                    .range([this.height, 0]);
                /** @type {?} */
                var yAxisGen = d3.axisLeft(yScale).ticks(5);
                /** @type {?} */
                var buffer = 0;
                // only if yAxis should not be visible
                if (!showAxis) {
                    yAxisGen
                        .tickFormat(function () { return ''; })
                        .tickSize(0);
                }
                /** @type {?} */
                var axis = this.graph.append('svg:g')
                    .attr('class', 'y axis')
                    .call(yAxisGen);
                // only if yAxis should be visible
                if (showAxis) {
                    /** @type {?} */
                    var text = this.graph.append('text')
                        .attr('transform', 'rotate(-90)')
                        .attr('dy', '1em')
                        .attr('class', 'yaxisTextLabel')
                        .style('font', '18px times')
                        .style('text-anchor', 'middle')
                        .style('fill', 'black')
                        .text((entry.id ? (entry.uom + ' @ ' + entry.parameters.feature.label) : entry.uom));
                    // .text((entry.id ? (entry.parameters.station + ' (' + entry.uom + ' ' + entry.parameters.phenomenon + ')') : entry.uom));
                    this.graph.selectAll('.yaxisTextLabel')
                        .call(this.wrapText, (axis.node().getBBox().height - 10), this.height / 2);
                    /** @type {?} */
                    var axisWidth = axis.node().getBBox().width + 10 + this.getDimensions(text.node()).h;
                    // if yAxis should not be visible, buffer will be set to 0
                    buffer = (showAxis ? entry.offset + (axisWidth < this.margin.left ? this.margin.left : axisWidth) : 0);
                    /** @type {?} */
                    var axisWidthDiv = (axisWidth < this.margin.left ? this.margin.left : axisWidth);
                    if (!entry.first) {
                        axis.attr('transform', 'translate(' + buffer + ', 0)');
                    }
                    else {
                        buffer = axisWidthDiv - this.margin.left;
                        axis.attr('transform', 'translate(' + buffer + ', 0)');
                    }
                    /** @type {?} */
                    var textOff = -(this.bufferSum);
                    if (entry.first) {
                        textOff = this.margin.left;
                    }
                    text.attr('y', 0 - textOff);
                    if (text) {
                        /** @type {?} */
                        var textWidth = text.node().getBBox().width;
                        /** @type {?} */
                        var textHeight = text.node().getBBox().height;
                        /** @type {?} */
                        var textPosition = {
                            x: text.node().getBBox().x,
                            y: text.node().getBBox().y
                        };
                        /** @type {?} */
                        var axisradius_1 = 4;
                        /** @type {?} */
                        var startOfPoints_1 = {
                            x: textPosition.y + textHeight / 2 + axisradius_1 / 2,
                            // + 2 because radius === 4
                            y: Math.abs(textPosition.x + textWidth) - axisradius_1 * 2
                        };
                        /** @type {?} */
                        var pointOffset_1 = 0;
                        if (entry.ids) {
                            entry.ids.forEach(function (entryID) {
                                /** @type {?} */
                                var dataentry = _this.preparedData.find(function (el) { return el.internalId === entryID; });
                                if (dataentry) {
                                    _this.graph.append('circle')
                                        .attr('class', 'axisDots')
                                        .attr('id', 'axisdot-' + entry.id)
                                        .attr('stroke', dataentry.color)
                                        .attr('fill', dataentry.color)
                                        .attr('cx', startOfPoints_1.x)
                                        .attr('cy', startOfPoints_1.y - pointOffset_1)
                                        .attr('r', axisradius_1);
                                    pointOffset_1 += axisradius_1 * 3;
                                }
                            });
                        }
                        else {
                            /** @type {?} */
                            var dataentry = this.preparedData.find(function (el) { return el.internalId === entry.id; });
                            if (dataentry) {
                                this.graph.append('circle')
                                    .attr('class', 'axisDots')
                                    .attr('id', 'axisdot-' + entry.id)
                                    .attr('stroke', dataentry.color)
                                    .attr('fill', dataentry.color)
                                    .attr('cx', startOfPoints_1.x)
                                    .attr('cy', startOfPoints_1.y - pointOffset_1)
                                    .attr('r', axisradius_1);
                            }
                        }
                    }
                    /** @type {?} */
                    var id_1 = (entry.id ? entry.id : entry.uom);
                    this.checkYselector(id_1, entry.uom);
                    /** @type {?} */
                    var axisDiv = this.graph.append('rect')
                        .attr('class', 'axisDiv')
                        .attr('width', axisWidthDiv)
                        .attr('height', this.height)
                        .attr('fill', 'grey')
                        .attr('opacity', (this.yAxisSelect[id_1].clicked ? this.opac.click : this.opac.default))
                        .on('mouseover', function (d, i, k) {
                        d3.select(k[0])
                            .attr('opacity', _this.opac.hover);
                    })
                        .on('mouseout', function (d, i, k) {
                        if (!_this.yAxisSelect[id_1].clicked) {
                            d3.select(k[0])
                                .attr('opacity', _this.opac.default);
                        }
                        else {
                            d3.select(k[0])
                                .attr('opacity', _this.opac.click);
                        }
                    })
                        .on('mouseup', function (d, i, k) {
                        if (!_this.yAxisSelect[id_1].clicked) {
                            d3.select(k[0])
                                .attr('opacity', _this.opac.default);
                        }
                        else {
                            d3.select(k[0])
                                .attr('opacity', _this.opac.click);
                        }
                        _this.yAxisSelect[id_1].clicked = !_this.yAxisSelect[id_1].clicked;
                        /** @type {?} */
                        var entryArray = [];
                        if (entry.id) {
                            entryArray.push(entry.id);
                        }
                        else {
                            entryArray = entry.ids;
                        }
                        _this.highlightLine(entryArray);
                    });
                    if (!entry.first) {
                        axisDiv
                            .attr('x', entry.offset)
                            .attr('y', 0);
                    }
                    else {
                        axisDiv
                            .attr('x', 0 - this.margin.left - this.maxLabelwidth)
                            .attr('y', 0);
                    }
                }
                // draw the y grid lines
                if (this.yRangesEachUom.length === 1) {
                    this.graph.append('svg:g')
                        .attr('class', 'grid')
                        .attr('transform', 'translate(' + buffer + ', 0)')
                        .call(d3.axisLeft(yScale)
                        .ticks(5)
                        .tickSize(-this.width + buffer)
                        .tickFormat(function () { return ''; }));
                }
                return {
                    buffer: buffer,
                    yScale: yScale
                };
            };
        /**
         * Function to check whether object yAxisSelect exists with selected uom.
         * If it does not exist, it will be created.
         * @param {?} identifier {String} String providing the selected uom or the selected dataset ID.
         * @param {?} uom
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.checkYselector = /**
         * Function to check whether object yAxisSelect exists with selected uom.
         * If it does not exist, it will be created.
         * @param {?} identifier {String} String providing the selected uom or the selected dataset ID.
         * @param {?} uom
         * @return {?}
         */
            function (identifier, uom) {
                if (this.yAxisSelect === undefined) {
                    this.yAxisSelect = {};
                }
                /** @type {?} */
                var selector = {
                    id: identifier,
                    ids: (this.yAxisSelect[identifier] !== undefined ? this.yAxisSelect[identifier].ids : []),
                    uom: uom,
                    clicked: (this.yAxisSelect[identifier] !== undefined ? this.yAxisSelect[identifier].clicked : false)
                };
                this.yAxisSelect[identifier] = selector;
            };
        /**
         * Function to adapt y axis highlighting to selected TS or selected uom
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.changeYselection = /**
         * Function to adapt y axis highlighting to selected TS or selected uom
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var groupList = {};
                if (this.yAxisSelect) {
                    if (!this.plotOptions.groupYaxis) {
                        var _loop_1 = function (key) {
                            if (this_1.yAxisSelect.hasOwnProperty(key)) {
                                /** @type {?} */
                                var el_1 = this_1.yAxisSelect[key];
                                if (el_1.ids.length > 0) {
                                    el_1.ids.forEach(function (id) {
                                        /** @type {?} */
                                        var dataEl = _this.preparedData.find(function (entry) { return entry.internalId === id; });
                                        /** @type {?} */
                                        var newSelector = {
                                            id: id,
                                            ids: [id],
                                            clicked: true,
                                            uom: dataEl.axisOptions.uom
                                        };
                                        groupList[id] = newSelector;
                                    });
                                }
                                else if (el_1.clicked && el_1.uom !== el_1.id) {
                                    /** @type {?} */
                                    var dataEl = this_1.preparedData.find(function (entry) { return entry.internalId === el_1.id; });
                                    /** @type {?} */
                                    var newSelector = {
                                        id: el_1.id,
                                        ids: [el_1.id],
                                        clicked: true,
                                        uom: dataEl.axisOptions.uom
                                    };
                                    groupList[el_1.id] = newSelector;
                                }
                            }
                        };
                        var this_1 = this;
                        // before: group
                        for (var key in this.yAxisSelect) {
                            _loop_1(key);
                        }
                    }
                    else {
                        var _loop_2 = function (key) {
                            if (this_2.yAxisSelect.hasOwnProperty(key)) {
                                /** @type {?} */
                                var el_2 = this_2.yAxisSelect[key];
                                /** @type {?} */
                                var dataEl = this_2.preparedData.find(function (entry) { return entry.internalId === el_2.id; });
                                /** @type {?} */
                                var selectionID = void 0;
                                if (dataEl && dataEl.axisOptions.separateYAxis) {
                                    // selection is dataset with internalId
                                    selectionID = dataEl.internalId;
                                }
                                else {
                                    // selection is uom
                                    selectionID = el_2.uom;
                                }
                                if (!groupList[selectionID]) {
                                    /** @type {?} */
                                    var currentUom = {
                                        id: selectionID,
                                        ids: [],
                                        clicked: false,
                                        uom: el_2.uom
                                    };
                                    groupList[selectionID] = currentUom;
                                }
                                if (el_2.clicked) {
                                    groupList[selectionID].ids.push(el_2.id);
                                }
                                if (el_2.uom === selectionID) {
                                    /** @type {?} */
                                    var groupedDatasets = this_2.countGroupedDatasets(selectionID, el_2.uom);
                                    if (groupList[selectionID].ids.length === groupedDatasets) {
                                        groupList[selectionID].clicked = true;
                                    }
                                }
                                else if (el_2.clicked) {
                                    // execute for ungrouped dataset
                                    groupList[selectionID].clicked = true;
                                }
                            }
                        };
                        var this_2 = this;
                        // before: no group
                        for (var key in this.yAxisSelect) {
                            _loop_2(key);
                        }
                    }
                    this.yAxisSelect = {}; // unselect all - y axis
                    this.yAxisSelect = groupList;
                }
                this.oldGroupYaxis = this.plotOptions.groupYaxis;
            };
        /**
         * Function that returns the amount of datasets that are grouped with the same uom
         * @param {?} uom {String} uom
         * @param {?} id {String} internalId of the dataset that can be skipped
         * returns {Number} amount of datasets with the given uom
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.countGroupedDatasets = /**
         * Function that returns the amount of datasets that are grouped with the same uom
         * @param {?} uom {String} uom
         * @param {?} id {String} internalId of the dataset that can be skipped
         * returns {Number} amount of datasets with the given uom
         * @return {?}
         */
            function (uom, id) {
                var _this = this;
                /** @type {?} */
                var arrayUomCount = 0;
                this.dataYranges.forEach(function (el) {
                    if (el !== null && el.uom === uom && el.id !== id) {
                        /** @type {?} */
                        var idx = _this.preparedData.findIndex(function (ds) { return ds.internalId === el.id && ds.axisOptions.separateYAxis === false; });
                        if (idx >= 0) {
                            arrayUomCount++;
                        }
                    }
                });
                return arrayUomCount;
            };
        /**
         * Function to set selected Ids that should be highlighted.
         * @param {?} ids {Array} Array of Strings containing the Ids.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.highlightLine = /**
         * Function to set selected Ids that should be highlighted.
         * @param {?} ids {Array} Array of Strings containing the Ids.
         * @return {?}
         */
            function (ids) {
                var _this = this;
                /** @type {?} */
                var changeFalse = [];
                /** @type {?} */
                var changeTrue = [];
                ids.forEach(function (ID) {
                    if (_this.selectedDatasetIds.indexOf(ID) >= 0) {
                        changeFalse.push({ id: ID, change: false });
                    }
                    changeTrue.push({ id: ID, change: true });
                });
                if (ids.length === changeFalse.length) {
                    this.changeSelectedIds(changeFalse, true);
                }
                else {
                    this.changeSelectedIds(changeTrue, false);
                }
            };
        /**
         * Function that changes state of selected Ids.
         * @param {?} toHighlightDataset
         * @param {?} change
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.changeSelectedIds = /**
         * Function that changes state of selected Ids.
         * @param {?} toHighlightDataset
         * @param {?} change
         * @return {?}
         */
            function (toHighlightDataset, change) {
                var _this = this;
                if (change) {
                    toHighlightDataset.forEach(function (obj) {
                        _this.removeSelectedId(obj.id);
                        _this.selectedDatasetIds.splice(_this.selectedDatasetIds.findIndex(function (entry) { return entry === obj.id; }), 1);
                    });
                }
                else {
                    toHighlightDataset.forEach(function (obj) {
                        if (_this.selectedDatasetIds.indexOf(obj.id) < 0) {
                            _this.setSelectedId(obj.id);
                            _this.selectedDatasetIds.push(obj.id);
                        }
                    });
                }
                this.onDatasetSelected.emit(this.selectedDatasetIds);
                this.plotGraph();
            };
        /**
         * Function to draw the graph line for each dataset.
         * @param entry {DataEntry} Object containing a dataset.
         */
        /**
         * Function to draw the graph line for each dataset.
         * @param {?} entry {DataEntry} Object containing a dataset.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.drawGraphLine = /**
         * Function to draw the graph line for each dataset.
         * @param {?} entry {DataEntry} Object containing a dataset.
         * @return {?}
         */
            function (entry) {
                /** @type {?} */
                var getYaxisRange = this.getYaxisRange(entry);
                if (entry.data.length > 0) {
                    if (getYaxisRange !== undefined) {
                        /** @type {?} */
                        var yScaleBase = getYaxisRange.yScale;
                        /** @type {?} */
                        var querySelectorClip = 'clip' + this.currentTimeId;
                        this.graph
                            .append('svg:clipPath')
                            .attr('id', querySelectorClip)
                            .append('svg:rect')
                            .attr('x', this.bufferSum)
                            .attr('y', 0)
                            .attr('width', this.width - this.bufferSum)
                            .attr('height', this.height);
                        // draw grah line
                        this.graphBody = this.graph
                            .append('g')
                            .attr('clip-path', 'url(#' + querySelectorClip + ')');
                        /** @type {?} */
                        var line = this.createLine(this.xScaleBase, yScaleBase);
                        this.graphBody
                            .append('svg:path')
                            .datum(entry.data)
                            .attr('class', 'line')
                            .attr('fill', 'none')
                            .attr('stroke', entry.color)
                            .attr('stroke-width', entry.lines.lineWidth)
                            .attr('d', line);
                        this.graphBody.selectAll('.graphDots')
                            .data(entry.data.filter(function (d) { return !isNaN(d.value); }))
                            .enter().append('circle')
                            .attr('class', 'graphDots')
                            .attr('id', function (d) { return 'dot-' + d.timestamp + '-' + entry.id; })
                            .attr('stroke', entry.color)
                            .attr('fill', entry.color)
                            .attr('cx', line.x())
                            .attr('cy', line.y())
                            .attr('r', entry.lines.pointRadius);
                        if (this.plotOptions.hoverStyle === HoveringStyle.point) {
                            this.createPointHovering(entry, line);
                        }
                    }
                }
            };
        /**
         * @param {?} xScaleBase
         * @param {?} yScaleBase
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.createLine = /**
         * @param {?} xScaleBase
         * @param {?} yScaleBase
         * @return {?}
         */
            function (xScaleBase, yScaleBase) {
                return d3.line()
                    .defined(function (d) { return !isNaN(d.value); })
                    .x(function (d) {
                    /** @type {?} */
                    var xDiagCoord = xScaleBase(d.timestamp);
                    if (!isNaN(xDiagCoord)) {
                        d.xDiagCoord = xDiagCoord;
                        return xDiagCoord;
                    }
                })
                    .y(function (d) {
                    /** @type {?} */
                    var yDiagCoord = yScaleBase(d.value);
                    if (!isNaN(yDiagCoord)) {
                        d.yDiagCoord = yDiagCoord;
                        return yDiagCoord;
                    }
                })
                    .curve(d3.curveLinear);
            };
        /**
         * @param {?} d
         * @param {?} entry
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.mouseOverPointHovering = /**
         * @param {?} d
         * @param {?} entry
         * @return {?}
         */
            function (d, entry) {
                if (d !== undefined) {
                    /** @type {?} */
                    var coords = d3.mouse(this.background.node());
                    /** @type {?} */
                    var dataset = this.datasetMap.get(entry.internalId);
                    /** @type {?} */
                    var rectBack = this.background.node().getBBox();
                    if (coords[0] >= 0 && coords[0] <= rectBack.width && coords[1] >= 0 && coords[1] <= rectBack.height) {
                        // highlight hovered dot
                        d3.select('#dot-' + d.timestamp + '-' + entry.id).attr('opacity', 0.8).attr('r', '8px');
                        this.highlightRect.style('visibility', 'visible');
                        this.highlightText.style('visibility', 'visible');
                        /** @type {?} */
                        var dotLabel = this.highlightText
                            .text(d.value + " " + entry.axisOptions.uom + " " + moment(d.timestamp).format('DD.MM.YY HH:mm'))
                            .attr('class', 'mouseHoverDotLabel')
                            .style('pointer-events', 'none')
                            .style('fill', 'black');
                        /** @type {?} */
                        var onLeftSide = false;
                        if ((this.background.node().getBBox().width + this.bufferSum) / 2 > coords[0]) {
                            onLeftSide = true;
                        }
                        /** @type {?} */
                        var rectX = d.xDiagCoord + 15;
                        /** @type {?} */
                        var rectY = d.yDiagCoord;
                        /** @type {?} */
                        var rectW = this.getDimensions(dotLabel.node()).w + 8;
                        /** @type {?} */
                        var rectH = this.getDimensions(dotLabel.node()).h; // + 4;
                        if (!onLeftSide) {
                            rectX = d.xDiagCoord - 15 - rectW;
                            rectY = d.yDiagCoord;
                        }
                        if ((coords[1] + rectH + 4) > this.background.node().getBBox().height) {
                            // when label below x axis
                            console.log('Translate label to a higher place. - not yet implemented');
                        }
                        /** @type {?} */
                        var dotRectangle = this.highlightRect
                            .attr('class', 'mouseHoverDotRect')
                            .style('fill', 'white')
                            .style('fill-opacity', 1)
                            .style('stroke', entry.color)
                            .style('stroke-width', '1px')
                            .style('pointer-events', 'none')
                            .attr('width', rectW)
                            .attr('height', rectH)
                            .attr('transform', 'translate(' + rectX + ', ' + rectY + ')');
                        /** @type {?} */
                        var labelX = d.xDiagCoord + 4 + 15;
                        /** @type {?} */
                        var labelY = d.yDiagCoord + this.getDimensions(dotRectangle.node()).h - 4;
                        if (!onLeftSide) {
                            labelX = d.xDiagCoord - rectW + 4 - 15;
                            labelY = d.yDiagCoord + this.getDimensions(dotRectangle.node()).h - 4;
                        }
                        this.highlightText
                            .attr('transform', 'translate(' + labelX + ', ' + labelY + ')');
                        // generate output of highlighted data
                        this.highlightOutput = {
                            timestamp: d.timestamp,
                            ids: new Map().set(entry.internalId, { timestamp: d.timestamp, value: d.value })
                        };
                        this.onHighlightChanged.emit(this.highlightOutput);
                    }
                }
            };
        /**
         * @param {?} d
         * @param {?} entry
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.mouseOutPointHovering = /**
         * @param {?} d
         * @param {?} entry
         * @return {?}
         */
            function (d, entry) {
                if (d !== undefined) {
                    // unhighlight hovered dot
                    d3.select('#dot-' + d.timestamp + '-' + entry.id)
                        .attr('opacity', 1)
                        .attr('r', entry.lines.pointRadius);
                    // make label invisible
                    this.highlightRect
                        .style('visibility', 'hidden');
                    this.highlightText
                        .style('visibility', 'hidden');
                }
            };
        /**
         * @param {?} entry
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getYaxisRange = /**
         * @param {?} entry
         * @return {?}
         */
            function (entry) {
                // check if entry dataset should be separated or entry datasets should be grouped
                if (!entry.axisOptions.separateYAxis && (this.plotOptions.groupYaxis || this.plotOptions.groupYaxis === undefined)) {
                    return this.yRangesEachUom.find(function (obj) {
                        if (obj !== null && obj.uom === entry.axisOptions.uom) {
                            return true;
                        } // uom does exist in this.yRangesEachUom
                    });
                }
                else {
                    return this.dataYranges.find(function (obj) {
                        if (obj !== null && obj.id === entry.internalId) {
                            return true;
                        } // id does exist in this.dataYranges
                    });
                }
            };
        /**
         * Function that returns the timestamp of provided x diagram coordinates.
         * @param {?} start {Number} Number with the minimum diagram coordinate.
         * @param {?} end {Number} Number with the maximum diagram coordinate.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getxDomain = /**
         * Function that returns the timestamp of provided x diagram coordinates.
         * @param {?} start {Number} Number with the minimum diagram coordinate.
         * @param {?} end {Number} Number with the maximum diagram coordinate.
         * @return {?}
         */
            function (start, end) {
                /** @type {?} */
                var domMinArr = [];
                /** @type {?} */
                var domMaxArr = [];
                /** @type {?} */
                var domMin;
                /** @type {?} */
                var domMax;
                /** @type {?} */
                var tmp;
                /** @type {?} */
                var lowestMin = Number.POSITIVE_INFINITY;
                /** @type {?} */
                var lowestMax = Number.POSITIVE_INFINITY;
                start += this.bufferSum;
                end += this.bufferSum;
                this.preparedData.forEach(function (entry) {
                    domMinArr.push(entry.data.find(function (elem, index, array) {
                        if (elem.xDiagCoord) {
                            if (elem.xDiagCoord >= start) {
                                return array[index] !== undefined;
                            }
                        }
                    }));
                    domMaxArr.push(entry.data.find(function (elem, index, array) {
                        if (elem.xDiagCoord >= end) {
                            return array[index] !== undefined;
                        }
                    }));
                });
                for (var i = 0; i <= domMinArr.length - 1; i++) {
                    if (domMinArr[i] != null) {
                        tmp = domMinArr[i].xDiagCoord;
                        if (tmp < lowestMin) {
                            lowestMin = tmp;
                            domMin = domMinArr[i].timestamp;
                        }
                    }
                }
                for (var j = 0; j <= domMaxArr.length - 1; j++) {
                    if (domMaxArr[j] != null) {
                        tmp = domMaxArr[j].xDiagCoord;
                        if (tmp < lowestMax) {
                            lowestMax = tmp;
                            domMax = domMaxArr[j].timestamp;
                        }
                    }
                }
                return [domMin, domMax];
            };
        /**
         * Function that configurates and draws the rectangle.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.drawDragRectangle = /**
         * Function that configurates and draws the rectangle.
         * @return {?}
         */
            function () {
                if (!this.dragStart) {
                    return;
                }
                this.dragCurrent = d3.mouse(this.background.node());
                /** @type {?} */
                var x1 = Math.min(this.dragStart[0], this.dragCurrent[0]);
                /** @type {?} */
                var x2 = Math.max(this.dragStart[0], this.dragCurrent[0]);
                if (!this.dragRect && !this.dragRectG) {
                    this.dragRectG = this.graph.append('g')
                        .style('fill-opacity', .2)
                        .style('fill', 'blue');
                    this.dragRect = this.dragRectG.append('rect')
                        .attr('width', x2 - x1)
                        .attr('height', this.height)
                        .attr('x', x1 + this.bufferSum)
                        .attr('class', 'mouse-drag')
                        .style('pointer-events', 'none');
                }
                else {
                    this.dragRect.attr('width', x2 - x1)
                        .attr('x', x1 + this.bufferSum);
                }
            };
        /**
         * Function that disables the drawing rectangle control.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.resetDrag = /**
         * Function that disables the drawing rectangle control.
         * @return {?}
         */
            function () {
                if (this.dragRectG) {
                    this.dragRectG.remove();
                    this.dragRectG = null;
                    this.dragRect = null;
                }
            };
        /**
         * Function that returns the metadata of a specific entry in the dataset.
         * @param {?} x {Number} Coordinates of the mouse inside the diagram.
         * @param {?} data {DataEntry} Array with the data of each dataset entry.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getItemForX = /**
         * Function that returns the metadata of a specific entry in the dataset.
         * @param {?} x {Number} Coordinates of the mouse inside the diagram.
         * @param {?} data {DataEntry} Array with the data of each dataset entry.
         * @return {?}
         */
            function (x, data) {
                /** @type {?} */
                var index = this.xScaleBase.invert(x);
                /** @type {?} */
                var bisectDate = d3.bisector(function (d) {
                    return d[0];
                }).left;
                return bisectDate(data, index);
            };
        /**
         * Function that disables the labeling.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.hideDiagramIndicator = /**
         * Function that disables the labeling.
         * @return {?}
         */
            function () {
                this.focusG.style('visibility', 'hidden');
                d3.selectAll('.focus-visibility')
                    .attr('visibility', 'hidden');
            };
        /**
         * Function to change visibility of label and white rectangle inside graph (next to mouse-cursor line).
         * @param {?} entry {DataEntry} Object containing the dataset.
         * @param {?} visible {Boolean} Boolean giving information about visibility of a label.
         * @param {?} entryIdx
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.chVisLabel = /**
         * Function to change visibility of label and white rectangle inside graph (next to mouse-cursor line).
         * @param {?} entry {DataEntry} Object containing the dataset.
         * @param {?} visible {Boolean} Boolean giving information about visibility of a label.
         * @param {?} entryIdx
         * @return {?}
         */
            function (entry, visible, entryIdx) {
                if (visible) {
                    entry.focusLabel
                        .attr('visibility', 'visible')
                        .attr('class', 'focus-visibility');
                    entry.focusLabelRect
                        .attr('visibility', 'visible')
                        .attr('class', 'focus-visibility');
                }
                else {
                    entry.focusLabel
                        .attr('visibility', 'hidden');
                    entry.focusLabelRect
                        .attr('visibility', 'hidden');
                    this.labelTimestamp[entryIdx] = null;
                    delete this.highlightOutput.ids[entry.internalId];
                }
            };
        /**
         * Function to show the labeling inside the graph.
         * @param {?} entry {DataEntry} Object containg the dataset.
         * @param {?} item {DataEntry} Object of the entry in the dataset.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.showLabelValues = /**
         * Function to show the labeling inside the graph.
         * @param {?} entry {DataEntry} Object containg the dataset.
         * @param {?} item {DataEntry} Object of the entry in the dataset.
         * @return {?}
         */
            function (entry, item) {
                /** @type {?} */
                var id = 1;
                /** @type {?} */
                var onLeftSide = this.checkLeftSide(item.xDiagCoord);
                if (entry.focusLabel) {
                    entry.focusLabel.text(item[id] + (entry.axisOptions.uom ? entry.axisOptions.uom : ''));
                    /** @type {?} */
                    var entryX = onLeftSide ?
                        item.xDiagCoord + 4 : item.xDiagCoord - this.getDimensions(entry.focusLabel.node()).w + 4;
                    entry.focusLabel
                        .attr('x', entryX)
                        .attr('y', item.yDiagCoord);
                    entry.focusLabelRect
                        .attr('x', entryX)
                        .attr('y', item.yDiagCoord - this.getDimensions(entry.focusLabel.node()).h + 3)
                        .attr('width', this.getDimensions(entry.focusLabel.node()).w)
                        .attr('height', this.getDimensions(entry.focusLabel.node()).h);
                    this.highlightOutput.ids[entry.internalId] = {
                        'timestamp': item[0],
                        'value': item[1]
                    };
                }
                else {
                    delete this.highlightOutput.ids[entry.internalId];
                }
            };
        /**
         * Function to show the time labeling inside the graph.
         * @param {?} item {DataEntry} Object of the entry in the dataset.
         * @param {?} entryIdx {Number} Number of the index of the entry.
         * @param {?} mouseCoord
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.showTimeIndicatorLabel = /**
         * Function to show the time labeling inside the graph.
         * @param {?} item {DataEntry} Object of the entry in the dataset.
         * @param {?} entryIdx {Number} Number of the index of the entry.
         * @param {?} mouseCoord
         * @return {?}
         */
            function (item, entryIdx, mouseCoord) {
                // timestamp is the time where the mouse-cursor is
                this.labelTimestamp[entryIdx] = item[0];
                this.labelXCoord[entryIdx] = item.xDiagCoord;
                this.distLabelXCoord[entryIdx] = Math.abs(mouseCoord - item.xDiagCoord);
                /** @type {?} */
                var min = d3.min(this.distLabelXCoord);
                /** @type {?} */
                var idxOfMin = this.distLabelXCoord.findIndex(function (elem) { return elem === min; });
                /** @type {?} */
                var onLeftSide = this.checkLeftSide(item.xDiagCoord);
                /** @type {?} */
                var right = this.labelXCoord[idxOfMin] + 2;
                /** @type {?} */
                var left = this.labelXCoord[idxOfMin] - this.getDimensions(this.focuslabelTime.node()).w - 2;
                this.focuslabelTime.text(moment(this.labelTimestamp[idxOfMin]).format('DD.MM.YY HH:mm'));
                this.focuslabelTime
                    .attr('x', onLeftSide ? right : left)
                    .attr('y', 13);
                this.highlightFocus
                    .attr('x1', this.labelXCoord[idxOfMin])
                    .attr('y1', 0)
                    .attr('x2', this.labelXCoord[idxOfMin])
                    .attr('y2', this.height)
                    .classed('hidden', false);
                this.highlightOutput.timestamp = this.labelTimestamp[idxOfMin];
            };
        /**
         * Function giving information if the mouse is on left side of the diagram.
         * @param {?} itemCoord {number} x coordinate of the value (e.g. mouse) to be checked
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.checkLeftSide = /**
         * Function giving information if the mouse is on left side of the diagram.
         * @param {?} itemCoord {number} x coordinate of the value (e.g. mouse) to be checked
         * @return {?}
         */
            function (itemCoord) {
                return ((this.background.node().getBBox().width + this.bufferSum) / 2 > itemCoord) ? true : false;
            };
        /**
         * Function to wrap the text for the y axis label.
         * @param {?} textObj
         * @param {?} width {Number} width of the axis which must not be crossed
         * @param {?} xposition {Number} position to center the label in the middle
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.wrapText = /**
         * Function to wrap the text for the y axis label.
         * @param {?} textObj
         * @param {?} width {Number} width of the axis which must not be crossed
         * @param {?} xposition {Number} position to center the label in the middle
         * @return {?}
         */
            function (textObj, width, xposition) {
                textObj.each(function (u, i, d) {
                    /** @type {?} */
                    var text = d3.select(this);
                    /** @type {?} */
                    var words = text.text().split(/\s+/).reverse();
                    /** @type {?} */
                    var word;
                    /** @type {?} */
                    var line = [];
                    /** @type {?} */
                    var 
                    // lineNumber = 0,
                    lineHeight = (i === d.length - 1 ? 0.3 : 1.1);
                    /** @type {?} */
                    var 
                    // ems
                    y = text.attr('y');
                    /** @type {?} */
                    var dy = parseFloat(text.attr('dy'));
                    /** @type {?} */
                    var tspan = text.text(null).append('tspan').attr('x', 0 - xposition).attr('y', y).attr('dy', dy + 'em');
                    while (word = words.pop()) {
                        line.push(word);
                        tspan.text(line.join(' '));
                        /** @type {?} */
                        var node = (tspan.node());
                        /** @type {?} */
                        var hasGreaterWidth = node.getComputedTextLength() > width;
                        if (hasGreaterWidth) {
                            line.pop();
                            tspan.text(line.join(' '));
                            line = [word];
                            tspan = text.append('tspan').attr('x', 0 - xposition).attr('y', y).attr('dy', lineHeight + dy + 'em').text(word);
                        }
                    }
                });
            };
        /**
         * Function that returns the boundings of a html element.
         * @param {?} el {Object} Object of the html element.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.getDimensions = /**
         * Function that returns the boundings of a html element.
         * @param {?} el {Object} Object of the html element.
         * @return {?}
         */
            function (el) {
                /** @type {?} */
                var w = 0;
                /** @type {?} */
                var h = 0;
                if (el) {
                    /** @type {?} */
                    var dimensions = el.getBBox();
                    w = dimensions.width;
                    h = dimensions.height;
                }
                else {
                    console.log('error: getDimensions() ' + el + ' not found.');
                }
                return {
                    w: w,
                    h: h
                };
            };
        /**
         * Function to generate uuid for a diagram
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.uuidv4 = /**
         * Function to generate uuid for a diagram
         * @return {?}
         */
            function () {
                return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
            };
        /**
         * Function to generate components of the uuid for a diagram
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.s4 = /**
         * Function to generate components of the uuid for a diagram
         * @return {?}
         */
            function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            };
        /**
         * Function that logs the error in the console.
         * @param {?} error {Object} Object with the error.
         * @return {?}
         */
        D3TimeseriesGraphComponent.prototype.onError = /**
         * Function that logs the error in the console.
         * @param {?} error {Object} Object with the error.
         * @return {?}
         */
            function (error) {
                console.error(error);
            };
        D3TimeseriesGraphComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'n52-d3-timeseries-graph',
                        template: "<div class=\"d3\" #d3timeseries></div>\n",
                        styles: [".d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}.d3 .formerButton,.d3 .laterButton{fill:grey;opacity:.3}.d3 .formerButton:hover,.d3 .laterButton:hover{opacity:.6}.d3 .arrow{stroke:grey;stroke-width:3px}"],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        D3TimeseriesGraphComponent.ctorParameters = function () {
            return [
                { type: i0.IterableDiffers },
                { type: core.DatasetApiInterface },
                { type: core.InternalIdHandler },
                { type: core.Time },
                { type: D3TimeFormatLocaleService },
                { type: core.ColorService },
                { type: i1.TranslateService }
            ];
        };
        D3TimeseriesGraphComponent.propDecorators = {
            mainTimeInterval: [{ type: i0.Input }],
            onHighlightChanged: [{ type: i0.Output }],
            onClickDataPoint: [{ type: i0.Output }],
            d3Elem: [{ type: i0.ViewChild, args: ['d3timeseries',] }]
        };
        return D3TimeseriesGraphComponent;
    }(core.DatasetPresenterComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var D3AxisType = {
        Distance: 0,
        Time: 1,
        Ticks: 2,
    };
    D3AxisType[D3AxisType.Distance] = 'Distance';
    D3AxisType[D3AxisType.Time] = 'Time';
    D3AxisType[D3AxisType.Ticks] = 'Ticks';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var D3TrajectoryGraphComponent = (function (_super) {
        __extends(D3TrajectoryGraphComponent, _super);
        function D3TrajectoryGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) {
            var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) || this;
            _this.iterableDiffers = iterableDiffers;
            _this.api = api;
            _this.datasetIdResolver = datasetIdResolver;
            _this.timeSrvc = timeSrvc;
            _this.translateService = translateService;
            _this.onSelectionChangedFinished = new i0.EventEmitter();
            _this.onSelectionChanged = new i0.EventEmitter();
            _this.onHoverHighlight = new i0.EventEmitter();
            _this.datasetMap = new Map();
            _this.margin = {
                top: 10,
                right: 10,
                bottom: 40,
                left: 40
            };
            _this.maxLabelwidth = 0;
            _this.baseValues = [];
            _this.defaultGraphOptions = {
                axisType: D3AxisType.Distance,
                dotted: false
            };
            _this.calcYValue = function (d) {
                return _this.yScaleBase(d.value);
            };
            _this.calcXValue = function (d, i) {
                /** @type {?} */
                var xDiagCoord = _this.xScaleBase(_this.getXValue(d));
                d.xDiagCoord = xDiagCoord;
                return xDiagCoord;
            };
            _this.mousemoveHandler = function () {
                if (!_this.baseValues || _this.baseValues.length === 0) {
                    return;
                }
                /** @type {?} */
                var coords = d3.mouse(_this.background.node());
                /** @type {?} */
                var idx = _this.getItemForX(coords[0] + _this.bufferSum, _this.baseValues);
                _this.showDiagramIndicator(idx);
                _this.onHoverHighlight.emit(_this.baseValues[idx].tick);
            };
            _this.mouseoutHandler = function () {
                _this.hideDiagramIndicator();
            };
            _this.dragStartHandler = function () {
                _this.dragging = false;
                _this.dragStart = d3.mouse(_this.background.node());
            };
            _this.dragHandler = function () {
                _this.dragging = true;
                _this.drawDragRectangle();
            };
            _this.dragEndHandler = function () {
                if (!_this.dragStart || !_this.dragging) {
                    _this.onSelectionChangedFinished.emit({ from: 0, to: _this.dataLength });
                }
                else {
                    /** @type {?} */
                    var from = _this.getItemForX(_this.dragStart[0] + _this.bufferSum, _this.baseValues);
                    /** @type {?} */
                    var to = _this.getItemForX(_this.dragCurrent[0] + _this.bufferSum, _this.baseValues);
                    _this.onSelectionChangedFinished.emit(_this.prepareRange(_this.baseValues[from].tick, _this.baseValues[to].tick));
                }
                _this.dragStart = null;
                _this.dragging = false;
                _this.resetDrag();
            };
            _this.showDiagramIndicator = function (idx) {
                /** @type {?} */
                var item = _this.baseValues[idx];
                _this.focusG.style('visibility', 'visible');
                _this.highlightFocus.attr('x1', item.xDiagCoord)
                    .attr('y1', 0)
                    .attr('x2', item.xDiagCoord)
                    .attr('y2', _this.height)
                    .classed('hidden', false);
                /** @type {?} */
                var onLeftSide = false;
                if ((_this.background.node().getBBox().width + _this.bufferSum) / 2 > item.xDiagCoord) {
                    onLeftSide = true;
                }
                _this.showLabelValues(item, onLeftSide);
                _this.showTimeIndicatorLabel(item, onLeftSide);
                _this.showBottomIndicatorLabel(item, onLeftSide);
            };
            _this.presenterOptions = _this.defaultGraphOptions;
            return _this;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                _super.prototype.ngOnChanges.call(this, changes);
                if (changes["selection"] && this.selection) {
                    this.processAllData();
                    this.drawLineGraph();
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.rawSvg = d3.select(this.d3Elem.nativeElement)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', '100%');
                this.graph = this.rawSvg
                    .append('g')
                    .attr('transform', 'translate(' + (this.margin.left + this.maxLabelwidth) + ',' + this.margin.top + ')');
                this.lineFun = d3.line()
                    .x(this.calcXValue)
                    .y(this.calcYValue)
                    .curve(d3.curveLinear);
                this.area = d3.area()
                    .x(this.calcXValue)
                    .y0(this.height)
                    .y1(this.calcYValue)
                    .curve(d3.curveLinear);
                this.drawLineGraph();
            };
        /**
         * @param {?} datasetIds
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.reloadDataForDatasets = /**
         * @param {?} datasetIds
         * @return {?}
         */
            function (datasetIds) {
                console.log('reload data at ' + new Date());
            };
        /**
         * @param {?} langChangeEvent
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.onLanguageChanged = /**
         * @param {?} langChangeEvent
         * @return {?}
         */
            function (langChangeEvent) { };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.timeIntervalChanges = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.datasetMap.forEach(function (entry) {
                    if (entry.dataset) {
                        _this.loadData(entry.dataset);
                    }
                });
            };
        /**
         * @param {?} id
         * @param {?} url
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.addDataset = /**
         * @param {?} id
         * @param {?} url
         * @return {?}
         */
            function (id, url) {
                var _this = this;
                this.api.getDataset(id, url).subscribe(function (dataset) {
                    _this.datasetMap.set(dataset.internalId, { dataset: dataset });
                    _this.loadData(dataset);
                });
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.removeDataset = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                this.datasetMap.delete(internalId);
                this.processAllData();
                this.drawLineGraph();
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.setSelectedId = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                throw new Error('Method not implemented.');
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.removeSelectedId = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                throw new Error('Method not implemented.');
            };
        /**
         * @param {?} options
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.presenterOptionsChanged = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                this.timeIntervalChanges();
            };
        /**
         * @param {?} internalId
         * @param {?} options
         * @param {?} firstChange
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.datasetOptionsChanged = /**
         * @param {?} internalId
         * @param {?} options
         * @param {?} firstChange
         * @return {?}
         */
            function (internalId, options, firstChange) {
                if (!firstChange && this.datasetMap.has(internalId)) {
                    this.loadData(this.datasetMap.get(internalId).dataset);
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.onResize = /**
         * @return {?}
         */
            function () {
                this.drawLineGraph();
            };
        /**
         * @param {?} dataset
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.loadData = /**
         * @param {?} dataset
         * @return {?}
         */
            function (dataset) {
                var _this = this;
                if (this.timespan &&
                    this.datasetOptions.has(dataset.internalId) &&
                    this.datasetOptions.get(dataset.internalId).visible) {
                    /** @type {?} */
                    var buffer = this.timeSrvc.getBufferedTimespan(this.timespan, 0.2);
                    /** @type {?} */
                    var option = this.datasetOptions.get(dataset.internalId);
                    this.api.getData(dataset.id, dataset.url, buffer, {
                        generalize: option.generalize
                    })
                        .subscribe(function (result) {
                        _this.dataLength = result.values.length;
                        _this.datasetMap.get(dataset.internalId).data = result.values;
                        _this.processDataForId(dataset.internalId);
                        _this.drawLineGraph();
                    });
                }
                else {
                    this.drawLineGraph();
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.processAllData = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.baseValues = [];
                this.datasetIds.forEach(function (id) { return _this.processDataForId(id); });
            };
        /**
         * @param {?} internalId
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.processDataForId = /**
         * @param {?} internalId
         * @return {?}
         */
            function (internalId) {
                var _this = this;
                if (this.datasetOptions.get(internalId).visible) {
                    /** @type {?} */
                    var datasetEntry = this.datasetMap.get(internalId);
                    /** @type {?} */
                    var firstEntry_1 = this.baseValues.length === 0;
                    /** @type {?} */
                    var previous_1 = null;
                    datasetEntry.data.forEach(function (elem, idx) {
                        if (firstEntry_1) {
                            /** @type {?} */
                            var entry = _this.createDataEntry(internalId, elem, previous_1, idx);
                            if (_this.selection) {
                                if (idx >= _this.selection.from && idx <= _this.selection.to) {
                                    _this.baseValues.push(entry);
                                }
                            }
                            else {
                                _this.baseValues.push(entry);
                            }
                            previous_1 = entry;
                        }
                        else {
                            if (_this.selection) {
                                if (idx >= _this.selection.from && idx <= _this.selection.to) {
                                    if (_this.baseValues[idx - _this.selection.from]) {
                                        _this.baseValues[idx - _this.selection.from][internalId] = elem.value;
                                    }
                                }
                            }
                            else {
                                if (_this.baseValues[idx]) {
                                    _this.baseValues[idx][internalId] = elem.value;
                                }
                            }
                        }
                    });
                }
            };
        /**
         * @param {?} internalId
         * @param {?} entry
         * @param {?} previous
         * @param {?} index
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.createDataEntry = /**
         * @param {?} internalId
         * @param {?} entry
         * @param {?} previous
         * @param {?} index
         * @return {?}
         */
            function (internalId, entry, previous, index) {
                /** @type {?} */
                var dist;
                if (previous) {
                    /** @type {?} */
                    var newdist = this.distanceBetween(entry.geometry.coordinates[1], entry.geometry.coordinates[0], previous.geometry.coordinates[1], previous.geometry.coordinates[0]);
                    dist = previous.dist + Math.round(newdist / 1000 * 100000) / 100000;
                }
                else {
                    dist = 0;
                }
                return _a = {
                    tick: index,
                    dist: Math.round(dist * 10) / 10,
                    timestamp: entry.timestamp,
                    value: entry.value
                },
                    _a[internalId] = entry.value,
                    _a.x = entry.geometry.coordinates[0],
                    _a.y = entry.geometry.coordinates[1],
                    _a.geometry = entry.geometry,
                    _a;
                var _a;
            };
        /**
         * @param {?} latitude1
         * @param {?} longitude1
         * @param {?} latitude2
         * @param {?} longitude2
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.distanceBetween = /**
         * @param {?} latitude1
         * @param {?} longitude1
         * @param {?} latitude2
         * @param {?} longitude2
         * @return {?}
         */
            function (latitude1, longitude1, latitude2, longitude2) {
                /** @type {?} */
                var R = 6371000;
                /** @type {?} */
                var rad = Math.PI / 180;
                /** @type {?} */
                var lat1 = latitude1 * rad;
                /** @type {?} */
                var lat2 = latitude2 * rad;
                /** @type {?} */
                var sinDLat = Math.sin((latitude2 - latitude1) * rad / 2);
                /** @type {?} */
                var sinDLon = Math.sin((longitude2 - longitude1) * rad / 2);
                /** @type {?} */
                var a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
                /** @type {?} */
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return R * c;
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.calculateHeight = /**
         * @return {?}
         */
            function () {
                return this.rawSvg.node().height.baseVal.value - this.margin.top - this.margin.bottom;
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.calculateWidth = /**
         * @return {?}
         */
            function () {
                return this.rawSvg.node().width.baseVal.value - this.margin.left - this.margin.right - this.maxLabelwidth;
            };
        /**
         * @param {?} data
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.getXValue = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                switch (this.presenterOptions.axisType) {
                    case D3AxisType.Distance:
                        return data.dist;
                    case D3AxisType.Time:
                        return data.timestamp;
                    case D3AxisType.Ticks:
                        return data.tick;
                    default:
                        return data.tick;
                }
            };
        /**
         * @param {?} values
         * @param {?} yScale
         * @param {?} options
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawDots = /**
         * @param {?} values
         * @param {?} yScale
         * @param {?} options
         * @return {?}
         */
            function (values, yScale, options) {
                this.graph.selectAll('dot')
                    .data(values)
                    .enter().append('circle')
                    .attr('stroke', options.color)
                    .attr('r', 1.5)
                    .attr('fill', options.color)
                    .attr('cx', this.calcXValue)
                    .attr('cy', function (d) { return yScale(d[options.id]); });
            };
        /**
         * @param {?} values
         * @param {?} yScale
         * @param {?} options
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawValueLine = /**
         * @param {?} values
         * @param {?} yScale
         * @param {?} options
         * @return {?}
         */
            function (values, yScale, options) {
                this.graph.append('svg:path')
                    .datum(values)
                    .attr('class', 'line')
                    .attr('fill', 'none')
                    .attr('stroke', options.color)
                    .attr('stroke-width', 1)
                    .attr('d', d3.line()
                    .x(this.calcXValue)
                    .y(function (d) { return yScale(d[options.id]); })
                    .curve(d3.curveLinear));
            };
        /**
         * @param {?} yScale
         * @param {?} options
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawGraph = /**
         * @param {?} yScale
         * @param {?} options
         * @return {?}
         */
            function (yScale, options) {
                if (this.presenterOptions.dotted) {
                    this.drawDots(this.baseValues, yScale, options);
                }
                else {
                    this.drawValueLine(this.baseValues, yScale, options);
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawLineGraph = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.baseValues || this.baseValues.length === 0 || !this.graph) {
                    return;
                }
                this.height = this.calculateHeight();
                this.width = this.calculateWidth();
                this.graph.selectAll('*').remove();
                this.bufferSum = 0;
                this.yScaleBase = null;
                this.datasetMap.forEach(function (datasetEntry, id) {
                    if (_this.datasetOptions.has(id) && datasetEntry.data && _this.datasetOptions.get(id).visible) {
                        datasetEntry.drawOptions = {
                            uom: datasetEntry.dataset.uom,
                            id: datasetEntry.dataset.internalId,
                            color: _this.datasetOptions.get(id).color,
                            first: _this.yScaleBase === null,
                            offset: _this.bufferSum
                        };
                        /** @type {?} */
                        var axisResult = _this.drawYAxis(datasetEntry.drawOptions);
                        if (_this.yScaleBase === null) {
                            _this.yScaleBase = axisResult.yScale;
                        }
                        else {
                            _this.bufferSum = axisResult.buffer;
                        }
                        datasetEntry.yScale = axisResult.yScale;
                    }
                });
                if (!this.yScaleBase) {
                    return;
                }
                // draw right axis as border
                this.graph.append('svg:g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + this.width + ', 0)')
                    .call(d3.axisRight(this.yScaleBase).tickSize(0).ticks(0));
                this.drawXAxis(this.bufferSum);
                this.datasetMap.forEach(function (entry, id) {
                    if (_this.datasetOptions.has(id) && _this.datasetOptions.get(id).visible && entry.data) {
                        _this.drawGraph(entry.yScale, entry.drawOptions);
                    }
                });
                this.background = this.graph.append('svg:rect')
                    .attr('width', this.width - this.bufferSum)
                    .attr('height', this.height)
                    .attr('fill', 'none')
                    .attr('stroke', 'none')
                    .attr('pointer-events', 'all')
                    .attr('transform', 'translate(' + this.bufferSum + ', 0)')
                    .on('mousemove.focus', this.mousemoveHandler)
                    .on('mouseout.focus', this.mouseoutHandler)
                    .on('mousedown.drag', this.dragStartHandler)
                    .on('mousemove.drag', this.dragHandler)
                    .on('mouseup.drag', this.dragEndHandler);
                this.focusG = this.graph.append('g');
                this.highlightFocus = this.focusG.append('svg:line')
                    .attr('class', 'mouse-focus-line')
                    .attr('x2', '0')
                    .attr('y2', '0')
                    .attr('x1', '0')
                    .attr('y1', '0')
                    .style('stroke', 'black')
                    .style('stroke-width', '1px');
                this.datasetMap.forEach(function (entry, id) {
                    if (_this.datasetOptions.has(id) && _this.datasetOptions.get(id).visible && entry.data) {
                        entry.focusLabelRect = _this.focusG.append('svg:rect')
                            .style('fill', 'white')
                            .style('stroke', 'none')
                            .style('pointer-events', 'none');
                        entry.focusLabel = _this.focusG.append('svg:text').attr('class', 'mouse-focus-label-x')
                            .style('pointer-events', 'none')
                            .style('fill', _this.datasetOptions.get(id).color)
                            .style('font-weight', 'lighter');
                    }
                });
                this.focuslabelTime = this.focusG.append('svg:text')
                    .style('pointer-events', 'none')
                    .attr('class', 'mouse-focus-label-x');
                this.focuslabelY = this.focusG.append('svg:text')
                    .style('pointer-events', 'none')
                    .attr('class', 'mouse-focus-label-y');
            };
        /**
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.prepareRange = /**
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
            function (from, to) {
                if (from <= to) {
                    return { from: from, to: to };
                }
                return { from: to, to: from };
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawDragRectangle = /**
         * @return {?}
         */
            function () {
                if (!this.dragStart) {
                    return;
                }
                this.dragCurrent = d3.mouse(this.background.node());
                /** @type {?} */
                var from = this.getItemForX(this.dragStart[0] + this.bufferSum, this.baseValues);
                /** @type {?} */
                var to = this.getItemForX(this.dragCurrent[0] + this.bufferSum, this.baseValues);
                this.onSelectionChanged.emit(this.prepareRange(this.baseValues[from].tick, this.baseValues[to].tick));
                /** @type {?} */
                var x1 = Math.min(this.dragStart[0], this.dragCurrent[0]);
                /** @type {?} */
                var x2 = Math.max(this.dragStart[0], this.dragCurrent[0]);
                if (!this.dragRect && !this.dragRectG) {
                    this.dragRectG = this.graph.append('g');
                    this.dragRect = this.dragRectG.append('rect')
                        .attr('width', x2 - x1)
                        .attr('height', this.height)
                        .attr('x', x1 + this.bufferSum)
                        .attr('class', 'mouse-drag')
                        .style('pointer-events', 'none');
                }
                else {
                    this.dragRect.attr('width', x2 - x1)
                        .attr('x', x1 + this.bufferSum);
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.resetDrag = /**
         * @return {?}
         */
            function () {
                if (this.dragRectG) {
                    this.dragRectG.remove();
                    this.dragRectG = null;
                    this.dragRect = null;
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.hideDiagramIndicator = /**
         * @return {?}
         */
            function () {
                this.focusG.style('visibility', 'hidden');
            };
        /**
         * @param {?} item
         * @param {?} onLeftSide
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.showLabelValues = /**
         * @param {?} item
         * @param {?} onLeftSide
         * @return {?}
         */
            function (item, onLeftSide) {
                var _this = this;
                this.datasetMap.forEach(function (entry, id) {
                    if (_this.datasetOptions.get(id).visible) {
                        if (entry.focusLabel) {
                            entry.focusLabel.text(item[id] + (entry.dataset.uom ? entry.dataset.uom : ''));
                            /** @type {?} */
                            var entryX = onLeftSide ?
                                item.xDiagCoord + 2 : item.xDiagCoord - _this.getDimensions(entry.focusLabel.node()).w;
                            entry.focusLabel
                                .attr('x', entryX)
                                .attr('y', entry.yScale(item[id]) + _this.getDimensions(entry.focusLabel.node()).h - 3);
                            entry.focusLabelRect
                                .attr('x', entryX)
                                .attr('y', entry.yScale(item[id]))
                                .attr('width', _this.getDimensions(entry.focusLabel.node()).w)
                                .attr('height', _this.getDimensions(entry.focusLabel.node()).h);
                        }
                    }
                });
            };
        /**
         * @param {?} item
         * @param {?} onLeftSide
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.showTimeIndicatorLabel = /**
         * @param {?} item
         * @param {?} onLeftSide
         * @return {?}
         */
            function (item, onLeftSide) {
                this.focuslabelTime.text(moment(item.timestamp).format('DD.MM.YY HH:mm'));
                this.focuslabelTime
                    .attr('x', onLeftSide ? item.xDiagCoord + 2 : item.xDiagCoord - this.getDimensions(this.focuslabelTime.node()).w)
                    .attr('y', 13);
            };
        /**
         * @param {?} item
         * @param {?} onLeftSide
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.showBottomIndicatorLabel = /**
         * @param {?} item
         * @param {?} onLeftSide
         * @return {?}
         */
            function (item, onLeftSide) {
                if (this.presenterOptions.axisType === D3AxisType.Distance) {
                    this.focuslabelY.text(item.dist + ' km');
                }
                if (this.presenterOptions.axisType === D3AxisType.Ticks) {
                    this.focuslabelY.text('Measurement: ' + item.tick);
                }
                this.focuslabelY
                    .attr('y', this.calculateHeight() - 5)
                    .attr('x', onLeftSide ? item.xDiagCoord + 2 : item.xDiagCoord - this.getDimensions(this.focuslabelY.node()).w);
            };
        /**
         * @param {?} el
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.getDimensions = /**
         * @param {?} el
         * @return {?}
         */
            function (el) {
                /** @type {?} */
                var w = 0;
                /** @type {?} */
                var h = 0;
                if (el) {
                    /** @type {?} */
                    var dimensions = el.getBBox();
                    w = dimensions.width;
                    h = dimensions.height;
                }
                else {
                    console.log('error: getDimensions() ' + el + ' not found.');
                }
                return {
                    w: w,
                    h: h
                };
            };
        /**
         * @param {?} x
         * @param {?} data
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.getItemForX = /**
         * @param {?} x
         * @param {?} data
         * @return {?}
         */
            function (x, data) {
                var _this = this;
                /** @type {?} */
                var index = this.xScaleBase.invert(x);
                /** @type {?} */
                var bisectDate = d3.bisector(function (d) {
                    switch (_this.presenterOptions.axisType) {
                        case D3AxisType.Distance:
                            return d.dist;
                        case D3AxisType.Time:
                            return d.timestamp;
                        case D3AxisType.Ticks:
                        default:
                            return d.tick;
                    }
                }).left;
                return bisectDate(this.baseValues, index);
            };
        /**
         * @param {?} options
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawYAxis = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var range = d3.extent(this.baseValues, function (datum, index, array) {
                    return datum[options.id]; // here with ID
                });
                /** @type {?} */
                var rangeOffset = (range[1] - range[0]) * 0.10;
                /** @type {?} */
                var yScale = d3.scaleLinear()
                    .domain([range[0] - rangeOffset, range[1] + rangeOffset])
                    .range([this.height, 0]);
                this.yAxisGen = d3.axisLeft(yScale).ticks(5);
                /** @type {?} */
                var axis = this.graph.append('svg:g')
                    .attr('class', 'y axis')
                    .call(this.yAxisGen);
                /** @type {?} */
                var text = this.graph.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .style('fill', options.color)
                    .text(options.uom);
                /** @type {?} */
                var axisWidth = axis.node().getBBox().width + 5 + this.getDimensions(text.node()).h;
                /** @type {?} */
                var buffer = options.offset + (axisWidth < 30 ? 30 : axisWidth);
                if (!options.first) {
                    axis.attr('transform', 'translate(' + buffer + ', 0)');
                }
                /** @type {?} */
                var textOffset = !options.first ? buffer : options.offset;
                text.attr('y', 0 - this.margin.left - this.maxLabelwidth + textOffset)
                    .attr('x', 0 - (this.height / 2));
                // draw the y grid lines when there is only one dataset
                if (this.datasetIds.length === 1) {
                    this.graph.append('svg:g')
                        .attr('class', 'grid')
                        .call(d3.axisLeft(yScale)
                        .ticks(5)
                        .tickSize(-this.width)
                        .tickFormat(function () { return ''; }));
                }
                return {
                    buffer: buffer,
                    yScale: yScale
                };
            };
        /**
         * @param {?} buffer
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.drawXAxis = /**
         * @param {?} buffer
         * @return {?}
         */
            function (buffer) {
                this.xScaleBase = d3.scaleLinear()
                    .domain(this.getXDomain(this.baseValues))
                    .range([buffer, this.width]);
                /** @type {?} */
                var xAxisGen = d3.axisBottom(this.xScaleBase).ticks(5);
                if (this.presenterOptions.axisType === D3AxisType.Time) {
                    xAxisGen.tickFormat(function (d) {
                        return d3.timeFormat('%d.%m.%Y %H:%M:%S')(new Date(d.valueOf()));
                    });
                }
                // draw x axis
                this.graph.append('svg:g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.height + ')')
                    .call(xAxisGen);
                // draw the x grid lines
                this.graph.append('svg:g')
                    .attr('class', 'grid')
                    .attr('transform', 'translate(0,' + this.height + ')')
                    .call(d3.axisBottom(this.xScaleBase)
                    .ticks(10)
                    .tickSize(-this.height)
                    .tickFormat(function () { return ''; }));
                // draw upper axis as border
                this.graph.append('svg:g')
                    .attr('class', 'x axis')
                    .call(d3.axisTop(this.xScaleBase).ticks(0).tickSize(0));
                // text label for the x axis
                this.graph.append('text')
                    .attr('x', (this.width + buffer) / 2)
                    .attr('y', this.height + this.margin.bottom - 5)
                    .style('text-anchor', 'middle')
                    .text(this.getXAxisLabel());
            };
        /**
         * @param {?} values
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.getXDomain = /**
         * @param {?} values
         * @return {?}
         */
            function (values) {
                switch (this.presenterOptions.axisType) {
                    case D3AxisType.Distance:
                        return [values[0].dist, values[values.length - 1].dist];
                    case D3AxisType.Time:
                        return [values[0].timestamp, values[values.length - 1].timestamp];
                    default:
                        return [values[0].tick, values[values.length - 1].tick];
                }
            };
        /**
         * @return {?}
         */
        D3TrajectoryGraphComponent.prototype.getXAxisLabel = /**
         * @return {?}
         */
            function () {
                switch (this.presenterOptions.axisType) {
                    case D3AxisType.Distance:
                        return 'Distance';
                    case D3AxisType.Time:
                        return 'Time';
                    default:
                        return 'Ticks';
                }
            };
        D3TrajectoryGraphComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'n52-d3-trajectory-graph',
                        template: "<div class=\"d3\" #dthree></div>",
                        styles: [".d3{height:100%}.d3 .axis line,.d3 .axis path{fill:none;stroke:#000}.d3 text{font-size:14px}.d3 .graphArea{fill:#b0c4de;fill-opacity:.7}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .map-highlight-label{fill:#fff;fill-opacity:.7}.d3 .mouse-focus-line{pointer-events:none;stroke-width:1px;stroke:#000}.d3 .mouse-drag{fill:rgba(0,0,255,.4);pointer-events:all;cursor:move}"],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        D3TrajectoryGraphComponent.ctorParameters = function () {
            return [
                { type: i0.IterableDiffers },
                { type: core.DatasetApiInterface },
                { type: core.InternalIdHandler },
                { type: core.Time },
                { type: i1.TranslateService }
            ];
        };
        D3TrajectoryGraphComponent.propDecorators = {
            selection: [{ type: i0.Input }],
            onSelectionChangedFinished: [{ type: i0.Output }],
            onSelectionChanged: [{ type: i0.Output }],
            onHoverHighlight: [{ type: i0.Output }],
            d3Elem: [{ type: i0.ViewChild, args: ['dthree',] }]
        };
        return D3TrajectoryGraphComponent;
    }(core.DatasetPresenterComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Extends the common d3 component, with the ability to add additional data to the graph. To set or change  additional data, allways sets the complete array of data new. The componet just redraws if
     * the array is reset.
     */
    var ExtendedDataD3TimeseriesGraphComponent = (function (_super) {
        __extends(ExtendedDataD3TimeseriesGraphComponent, _super);
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
                                var dataExtent = d3.extent(dataEntry.data, function (d) {
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
            { type: i0.Component, args: [{
                        selector: 'n52-extended-data-d3-timeseries-graph',
                        template: "<div class=\"d3\" #d3timeseries></div>\n",
                        styles: [".d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}.d3 .formerButton,.d3 .laterButton{fill:grey;opacity:.3}.d3 .formerButton:hover,.d3 .laterButton:hover{opacity:.6}.d3 .arrow{stroke:grey;stroke-width:3px}"],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        ExtendedDataD3TimeseriesGraphComponent.ctorParameters = function () {
            return [
                { type: i0.IterableDiffers },
                { type: core.DatasetApiInterface },
                { type: core.InternalIdHandler },
                { type: core.Time },
                { type: D3TimeFormatLocaleService },
                { type: core.ColorService },
                { type: i1.TranslateService }
            ];
        };
        ExtendedDataD3TimeseriesGraphComponent.propDecorators = {
            additionalData: [{ type: i0.Input }]
        };
        return ExtendedDataD3TimeseriesGraphComponent;
    }(D3TimeseriesGraphComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var D3GeneralGraphComponent = (function () {
        function D3GeneralGraphComponent(timeFormatLocaleService) {
            this.timeFormatLocaleService = timeFormatLocaleService;
            this.generalData = [];
            this.axisOptions = {};
            this.plotOptions = {
                xlabel: 'x',
                ylabel: 'y',
                date: false
            };
            this.defaultGraphOptions = {
                color: 'red',
                lines: {
                    lineWidth: 2,
                    pointRadius: 2
                }
            };
            this.buffer = 0;
            this.maxLabelwidth = 0;
            this.margin = {
                top: 10,
                right: 10,
                bottom: 40,
                left: 10
            };
        }
        /**
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.rawSvg = d3.select(this.d3Elem.nativeElement)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', '100%');
                this.graph = this.rawSvg
                    .append('g')
                    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
                this.graphFocus = this.rawSvg
                    .append('g')
                    .attr('transform', 'translate(' + (this.margin.left + this.maxLabelwidth) + ',' + this.margin.top + ')');
                this.prepareData();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.generalD3Input && this.rawSvg) {
                    this.generalD3Input = changes.generalD3Input.currentValue;
                    this.prepareData();
                }
            };
        /**
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.prepareData = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.generalD3Input) {
                    /** @type {?} */
                    var data_1 = [];
                    this.generalD3Input.datasets.forEach(function (ds, index) {
                        /** @type {?} */
                        var dataset = {
                            data: ds.data,
                            id: index
                        };
                        data_1 = data_1.concat(ds.data);
                        _this.generalData.push(dataset);
                    });
                    this.plotOptions = this.generalD3Input.plotOptions;
                    this.axisOptions.date = true;
                    this.axisOptions.xRange = this.getRange(data_1, 'x');
                    this.axisOptions.yRange = this.getRange(data_1, 'y');
                    this.plotGraph();
                }
            };
        /**
         * Function to call functions related to plotting a dataset in a graph.
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.plotGraph = /**
         * Function to call functions related to plotting a dataset in a graph.
         * @return {?}
         */
            function () {
                var _this = this;
                this.height = this.calculateHeight();
                this.width = this.calculateWidth();
                this.axisOptions.yScale = this.drawYaxis(this.plotOptions);
                this.axisOptions.xScale = this.drawXaxis(this.plotOptions);
                // create background as rectangle providing panning
                this.background = this.graph.append('svg:rect')
                    .attr('width', this.width - this.buffer)
                    .attr('height', this.height)
                    .attr('id', 'backgroundRect')
                    .attr('fill', 'none')
                    .attr('stroke', 'none')
                    .attr('pointer-events', 'all')
                    .attr('transform', 'translate(' + this.buffer + ', 0)');
                this.focusG = this.graphFocus.append('g');
                this.highlightRect = this.focusG.append('svg:rect');
                this.highlightText = this.focusG.append('svg:text');
                this.generalData.forEach(function (dataset) {
                    _this.drawGraphLine(dataset);
                });
                this.createHoveringNet(this.generalData);
                this.createHoveringNet(this.generalData);
            };
        /**
         * Function to draw y axis.
         * @param {?} options
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.drawYaxis = /**
         * Function to draw y axis.
         * @param {?} options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var yRangeOffset = 10;
                /** @type {?} */
                var yRange = this.axisOptions.yRange;
                // check for multiple datapoints
                if (yRange.max !== yRange.min) {
                    yRangeOffset = (yRange.max - yRange.min) * 0.10;
                }
                else {
                    yRangeOffset = yRange.min * 0.10;
                }
                /** @type {?} */
                var yScale = d3.scaleLinear()
                    .domain([yRange.min - yRangeOffset, yRange.max + yRangeOffset])
                    .range([this.height, 0]);
                /** @type {?} */
                var yAxisGen = d3.axisLeft(yScale).ticks(5);
                /** @type {?} */
                var yAxis = this.graph.append('svg:g')
                    .attr('class', 'y axis')
                    .call(yAxisGen);
                /** @type {?} */
                var yAxisLabel = this.graph.append('text')
                    .attr('transform', 'translate(0, ' + this.height / 2 + ')rotate(-90)')
                    .attr('dy', '1em')
                    .attr('class', 'yAxisTextLabel')
                    .style('font', '18px times')
                    .style('text-anchor', 'middle')
                    .style('fill', 'black')
                    .text(options.ylabel);
                // this.graph.selectAll('.yAxisTextLabel')
                this.buffer = yAxis.node().getBBox().width + 10 + this.getDimensions(yAxisLabel.node()).h;
                yAxis.attr('transform', 'translate(' + this.buffer + ', 0)');
                // draw y grid lines
                this.graph.append('svg:g')
                    .attr('class', 'grid')
                    .attr('transform', 'translate(' + this.buffer + ', 0)')
                    .call(d3.axisLeft(yScale)
                    .ticks(5)
                    .tickSize(-this.width + this.buffer)
                    .tickFormat(function () { return ''; }));
                return yScale;
            };
        /**
         * Function to draw x axis.
         * @param {?} options
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.drawXaxis = /**
         * Function to draw x axis.
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var _this = this;
                /** @type {?} */
                var xRange = this.axisOptions.xRange;
                /** @type {?} */
                var ticks = 10;
                /** @type {?} */
                var xRangeOffset = (xRange.max - xRange.min) * 0.10;
                if (xRange.max === xRange.min) {
                    ticks = 5;
                    xRangeOffset = xRange.min * 0.10;
                }
                /** @type {?} */
                var xScale = d3.scaleLinear()
                    .domain([xRange.min - xRangeOffset, xRange.max + xRangeOffset])
                    .range([this.buffer, this.width]);
                /** @type {?} */
                var xAxis = d3.axisBottom(xScale)
                    .ticks(ticks)
                    .tickFormat(function (d) {
                    if (options.date) {
                        /** @type {?} */
                        var date = new Date(d.valueOf());
                        /** @type {?} */
                        var formatMillisecond = '.%L';
                        /** @type {?} */
                        var formatSecond = ':%S';
                        /** @type {?} */
                        var formatMinute = '%H:%M';
                        /** @type {?} */
                        var formatHour = '%H:%M';
                        /** @type {?} */
                        var formatDay = '%b %d';
                        /** @type {?} */
                        var formatWeek = '%b %d';
                        /** @type {?} */
                        var formatMonth = '%B';
                        /** @type {?} */
                        var formatYear = '%Y';
                        /** @type {?} */
                        var format = d3.timeSecond(date) < date ? formatMillisecond
                            : d3.timeMinute(date) < date ? formatSecond
                                : d3.timeHour(date) < date ? formatMinute
                                    : d3.timeDay(date) < date ? formatHour
                                        : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                                            : d3.timeYear(date) < date ? formatMonth
                                                : formatYear;
                        return _this.timeFormatLocaleService.getTimeLocale(format)(new Date(d.valueOf()));
                    }
                    else {
                        return '' + d.valueOf();
                    }
                });
                this.graph.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.height + ')')
                    .call(xAxis)
                    .selectAll('text')
                    .style('text-anchor', 'middle');
                // draw x grid lines
                this.graph.append('svg:g')
                    .attr('class', 'grid')
                    .attr('transform', 'translate(0,' + this.height + ')')
                    .call(xAxis
                    .tickSize(-this.height)
                    .tickFormat(function () { return ''; }));
                // draw upper axis as border
                this.graph.append('svg:g')
                    .attr('class', 'x axis')
                    .call(d3.axisTop(xScale)
                    .ticks(0)
                    .tickSize(0));
                // draw x axis label
                this.graph.append('text')
                    .attr('x', (this.width + this.buffer) / 2)
                    .attr('y', this.height + this.margin.bottom - 5)
                    .style('text-anchor', 'middle')
                    .text(options.xlabel);
                return xScale;
            };
        /**
         * Function to draw the line of the graph.
         * @param {?} dataset {D3GeneralDataset} Object with information about the datset.
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.drawGraphLine = /**
         * Function to draw the line of the graph.
         * @param {?} dataset {D3GeneralDataset} Object with information about the datset.
         * @return {?}
         */
            function (dataset) {
                var _this = this;
                // create grah line component
                this.graphBody = this.graph
                    .append('g')
                    .attr('clip-path', 'url(#' + dataset.id + ')');
                /** @type {?} */
                var graphLine = d3.line()
                    .defined(function (d) { return (!isNaN(d.x) && !isNaN(d.y)); })
                    .x(function (d) {
                    /** @type {?} */
                    var xCoord = _this.axisOptions.xScale(d.x);
                    if (!isNaN(xCoord)) {
                        d.xCoord = xCoord;
                        return xCoord;
                    }
                })
                    .y(function (d) {
                    /** @type {?} */
                    var yCoord = _this.axisOptions.yScale(d.y);
                    if (!isNaN(yCoord)) {
                        d.yCoord = yCoord;
                        return yCoord;
                    }
                })
                    .curve(d3.curveLinear);
                this.graphBody
                    .append('svg:path')
                    .datum(dataset.data)
                    .attr('class', 'line')
                    .attr('fill', 'none')
                    .attr('stroke', this.plotOptions.graph ? this.plotOptions.graph.color : this.defaultGraphOptions.color)
                    .attr('stroke-width', this.plotOptions.graph ? this.plotOptions.graph.lines.lineWidth : this.defaultGraphOptions.lines.lineWidth)
                    .attr('d', graphLine);
                // draw circles around datapoints
                this.graphBody.selectAll('.graphDots')
                    .data(dataset.data.filter(function (d) { return !isNaN(d.y); }))
                    .enter().append('circle')
                    .attr('class', 'graphDots')
                    .attr('id', function (d) {
                    /** @type {?} */
                    var datasetxCoordSplit = d.xCoord.toString().split('.')[0] + '-' + d.xCoord.toString().split('.')[1];
                    return 'dot-' + datasetxCoordSplit + '-' + dataset.id + '';
                })
                    .attr('stroke', this.plotOptions.graph ? this.plotOptions.graph.color : this.defaultGraphOptions.color)
                    .attr('fill', this.plotOptions.graph ? this.plotOptions.graph.color : this.defaultGraphOptions.color)
                    .attr('cx', graphLine.x())
                    .attr('cy', graphLine.y())
                    .attr('r', this.plotOptions.graph ? this.plotOptions.graph.lines.pointRadius : this.defaultGraphOptions.lines.pointRadius);
            };
        /**
         * Function to create a net of polygons overlaying the graphs to divide sections for hovering.
         * @param {?} inputData {D3GeneralDataset[]} data containing an array with all datapoints and an id for each dataset
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.createHoveringNet = /**
         * Function to create a net of polygons overlaying the graphs to divide sections for hovering.
         * @param {?} inputData {D3GeneralDataset[]} data containing an array with all datapoints and an id for each dataset
         * @return {?}
         */
            function (inputData) {
                var _this = this;
                /** @type {?} */
                var data = inputData.map(function (series, i) {
                    series.data = series.data.map(function (point) {
                        point.series = i;
                        point[0] = point.x;
                        point[1] = point.y;
                        return point;
                    });
                    return series;
                });
                /** @type {?} */
                var x = d3.scaleLinear();
                /** @type {?} */
                var y = d3.scaleLinear();
                /** @type {?} */
                var vertices = d3.merge(data.map(function (cl, lineIndex) {
                    /** *
                     * cl = { data: [{0: number, 1: number, series: number, x: number, y: number}, {}, ...], id: number }
                     * point = each point in a dataset
                      @type {?} */
                    var outputLine = cl.data.map(function (point, pointIndex) {
                        /** @type {?} */
                        var outputPoint = [x(point.xCoord), y(point.yCoord), lineIndex, pointIndex, point, cl];
                        return outputPoint; // adding series index to point because data is being flattened
                    });
                    return outputLine;
                }));
                /** @type {?} */
                var left = this.buffer;
                /** @type {?} */
                var 
                // + this.margin.left,
                top = this.margin.top;
                /** @type {?} */
                var right = this.background.node().getBBox().width + this.buffer;
                /** @type {?} */
                var 
                // + this.margin.left,
                bottom = this.margin.top + this.background.node().getBBox().height;
                /** @type {?} */
                var verticesFiltered = vertices.filter(function (d) { return !isNaN(d[0]) || !isNaN(d[1]); });
                /** @type {?} */
                var Diffvoronoi = d3.voronoi()
                    .extent([[left, top], [right, bottom]]);
                /** @type {?} */
                var diffVoronoi2 = Diffvoronoi.polygons(verticesFiltered);
                /** @type {?} */
                var wrap = this.rawSvg.selectAll('g.d3line').data([verticesFiltered]);
                /** @type {?} */
                var gEnter = wrap.enter().append('g').attr('class', 'd3line').append('g');
                gEnter.append('g').attr('class', 'point-paths');
                /** @type {?} */
                var pointPaths = wrap.select('.point-paths').selectAll('path')
                    .data(diffVoronoi2);
                pointPaths
                    .enter().append('path')
                    .attr('class', function (d, i) {
                    return 'path-' + i;
                });
                pointPaths = wrap.select('.point-paths').selectAll('path')
                    .data(diffVoronoi2);
                pointPaths
                    .enter().append('path')
                    .attr('class', function (d, i) {
                    return 'path-' + i;
                });
                pointPaths.exit().remove();
                pointPaths
                    .attr('clip-path', function (d) {
                    if (d !== undefined) {
                        /** @type {?} */
                        var datasetxCoordSplit = d.data[4].xCoord.toString().split('.')[0] + '-' + d.data[4].xCoord.toString().split('.')[1];
                        return 'url(#clip-' + d.data[5].id + '-' + datasetxCoordSplit + ')';
                    }
                })
                    .attr('d', function (d) {
                    if (d !== undefined) {
                        return 'M' + d.join(' ') + 'Z';
                    }
                })
                    .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')
                    .on('mousemove', function (d) {
                    if (d !== undefined) {
                        /** @type {?} */
                        var coords = d3.mouse(_this.background.node());
                        /** @type {?} */
                        var dataset = d.data[4];
                        /** @type {?} */
                        var dist = _this.calcDistanceHovering(dataset, coords);
                        /** @type {?} */
                        var radius = _this.plotOptions.graph ? _this.plotOptions.graph.lines.pointRadius : _this.defaultGraphOptions.lines.pointRadius;
                        /** @type {?} */
                        var color = _this.plotOptions.graph ? _this.plotOptions.graph.color : _this.defaultGraphOptions.color;
                        if (dist <= 8) {
                            /** @type {?} */
                            var rectBack = _this.background.node().getBBox();
                            if (coords[0] >= 0 && coords[0] <= rectBack.width && coords[1] >= 0 && coords[1] <= rectBack.height) {
                                /** @type {?} */
                                var datasetxCoordSplit = dataset.xCoord.toString().split('.')[0] + '-' + dataset.xCoord.toString().split('.')[1];
                                d3.select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
                                    .attr('opacity', 0.8)
                                    .attr('r', (radius * 2));
                                _this.highlightRect
                                    .style('visibility', 'visible');
                                _this.highlightText
                                    .style('visibility', 'visible');
                                /** @type {?} */
                                var text = _this.plotOptions.date ? 'x: ' + moment(dataset.x).format('DD.MM.YY HH:mm') + ' y: ' + dataset.y : 'x: ' + dataset.x + ' y: ' + dataset.y;
                                /** @type {?} */
                                var dotLabel = _this.highlightText
                                    .text(text)
                                    .attr('class', 'mouseHoverDotLabel')
                                    .style('pointer-events', 'none')
                                    .style('fill', color);
                                /** @type {?} */
                                var onLeftSide = false;
                                if ((_this.background.node().getBBox().width + _this.buffer) / 2 > coords[0]) {
                                    onLeftSide = true;
                                }
                                /** @type {?} */
                                var rectX = dataset.xCoord + 15;
                                /** @type {?} */
                                var rectY = dataset.yCoord;
                                /** @type {?} */
                                var rectW = _this.getDimensions(dotLabel.node()).w + 8;
                                /** @type {?} */
                                var rectH = _this.getDimensions(dotLabel.node()).h; // + 4;
                                if (!onLeftSide) {
                                    rectX = dataset.xCoord - 15 - rectW;
                                    rectY = dataset.yCoord;
                                }
                                if ((coords[1] + rectH + 4) > _this.background.node().getBBox().height) {
                                    // when label below x axis
                                    console.log('Translate label to a higher place. - not yet implemented');
                                }
                                /** @type {?} */
                                var dotRectangle = _this.highlightRect
                                    .attr('class', 'mouseHoverDotRect')
                                    .style('fill', 'white')
                                    .style('fill-opacity', 1)
                                    .style('stroke', color)
                                    .style('stroke-width', '1px')
                                    .style('pointer-events', 'none')
                                    .attr('width', rectW)
                                    .attr('height', rectH)
                                    .attr('transform', 'translate(' + rectX + ', ' + rectY + ')');
                                /** @type {?} */
                                var labelX = dataset.xCoord + 4 + 15;
                                /** @type {?} */
                                var labelY = dataset.yCoord + _this.getDimensions(dotRectangle.node()).h - 4;
                                if (!onLeftSide) {
                                    labelX = dataset.xCoord - rectW + 4 - 15;
                                    labelY = dataset.yCoord + _this.getDimensions(dotRectangle.node()).h - 4;
                                }
                                _this.highlightText
                                    .attr('transform', 'translate(' + labelX + ', ' + labelY + ')');
                            }
                        }
                        else {
                            /** @type {?} */
                            var datasetxCoordSplit = dataset.xCoord.toString().split('.')[0] + '-' + dataset.xCoord.toString().split('.')[1];
                            d3.select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
                                .attr('opacity', 1)
                                .attr('r', radius);
                            // make label invisible
                            // make label invisible
                            _this.highlightRect
                                .style('visibility', 'hidden');
                            _this.highlightText
                                .style('visibility', 'hidden');
                        }
                    }
                })
                    .on('mouseout', function (d) {
                    if (d !== undefined) {
                        /** @type {?} */
                        var dataset = d.data[4];
                        /** @type {?} */
                        var radius = _this.plotOptions.graph ? _this.plotOptions.graph.lines.pointRadius : _this.defaultGraphOptions.lines.pointRadius;
                        /** @type {?} */
                        var datasetxCoordSplit = dataset.xCoord.toString().split('.')[0] + '-' + dataset.xCoord.toString().split('.')[1];
                        d3.select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
                            .attr('opacity', 1)
                            .attr('r', radius);
                        // make label invisible
                        // make label invisible
                        _this.highlightRect
                            .style('visibility', 'hidden');
                        _this.highlightText
                            .style('visibility', 'hidden');
                    }
                });
            };
        /**
         * Function to calculate distance between mouse and a hovered point.
         * @param {?} dataset {} Coordinates of the hovered point.
         * @param {?} coords {} Coordinates of the mouse.
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.calcDistanceHovering = /**
         * Function to calculate distance between mouse and a hovered point.
         * @param {?} dataset {} Coordinates of the hovered point.
         * @param {?} coords {} Coordinates of the mouse.
         * @return {?}
         */
            function (dataset, coords) {
                /** @type {?} */
                var mX = coords[0] + this.buffer;
                /** @type {?} */
                var mY = coords[1];
                /** @type {?} */
                var 
                // + this.margin.top,
                pX = dataset.xCoord;
                /** @type {?} */
                var pY = dataset.yCoord;
                // calculate distance between point and mouse when hovering
                return Math.sqrt(Math.pow((pX - mX), 2) + Math.pow((pY - mY), 2));
            };
        /**
         * @param {?} data
         * @param {?} selector
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.getRange = /**
         * @param {?} data
         * @param {?} selector
         * @return {?}
         */
            function (data, selector) {
                /** @type {?} */
                var range = d3.extent(d3.values(data.map(function (d) {
                    if ((!isNaN(d.x) && !isNaN(d.y))) {
                        return d[selector];
                    }
                })));
                return { min: range[0], max: range[1] };
            };
        /**
         * Function that returns the height of the graph diagram.
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.calculateHeight = /**
         * Function that returns the height of the graph diagram.
         * @return {?}
         */
            function () {
                return ((this.d3Elem.nativeElement)).clientHeight - this.margin.top - this.margin.bottom;
            };
        /**
         * Function that returns the width of the graph diagram.
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.calculateWidth = /**
         * Function that returns the width of the graph diagram.
         * @return {?}
         */
            function () {
                return this.rawSvg.node().width.baseVal.value - this.margin.left - this.margin.right;
            };
        /**
         * Function that returns the boundings of a html element.
         * @param {?} el {Object} Object of the html element.
         * @return {?}
         */
        D3GeneralGraphComponent.prototype.getDimensions = /**
         * Function that returns the boundings of a html element.
         * @param {?} el {Object} Object of the html element.
         * @return {?}
         */
            function (el) {
                /** @type {?} */
                var w = 0;
                /** @type {?} */
                var h = 0;
                if (el) {
                    /** @type {?} */
                    var dimensions = el.getBBox();
                    w = dimensions.width;
                    h = dimensions.height;
                }
                else {
                    console.log('error: getDimensions() ' + el + ' not found.');
                }
                return {
                    w: w,
                    h: h
                };
            };
        D3GeneralGraphComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'n52-d3-general-graph',
                        template: "<div class=\"d3\" #d3general></div>\n",
                        styles: [".d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .x{fill:orange;fill-opacity:.4}.d3 .x .tick{stroke:#00f;stroke-width:10px}.d3 .x .tick line{stroke:red;stroke-width:15px}.d3 .axis{fill:orange;fill-opacity:.4}.d3 .axis .tick{stroke:#00f;stroke-width:10px}.d3 .axis .tick line{stroke:#ffa07a;stroke-width:15px}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}"]
                    },] },
        ];
        /** @nocollapse */
        D3GeneralGraphComponent.ctorParameters = function () {
            return [
                { type: D3TimeFormatLocaleService }
            ];
        };
        D3GeneralGraphComponent.propDecorators = {
            d3Elem: [{ type: i0.ViewChild, args: ['d3general',] }],
            generalD3Input: [{ type: i0.Input }]
        };
        return D3GeneralGraphComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandD3Module = (function () {
        function HelgolandD3Module() {
        }
        HelgolandD3Module.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            D3TrajectoryGraphComponent,
                            D3TimeseriesGraphComponent,
                            D3OverviewTimeseriesGraphComponent,
                            ExtendedDataD3TimeseriesGraphComponent,
                            D3GeneralGraphComponent
                        ],
                        imports: [
                            core.HelgolandCoreModule
                        ],
                        exports: [
                            D3TrajectoryGraphComponent,
                            D3TimeseriesGraphComponent,
                            D3OverviewTimeseriesGraphComponent,
                            ExtendedDataD3TimeseriesGraphComponent,
                            D3GeneralGraphComponent
                        ],
                        providers: [
                            D3TimeFormatLocaleService
                        ]
                    },] },
        ];
        return HelgolandD3Module;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var D3SelectionRange = (function () {
        function D3SelectionRange() {
        }
        return D3SelectionRange;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.D3TrajectoryGraphComponent = D3TrajectoryGraphComponent;
    exports.D3TimeseriesGraphComponent = D3TimeseriesGraphComponent;
    exports.D3GeneralGraphComponent = D3GeneralGraphComponent;
    exports.D3OverviewTimeseriesGraphComponent = D3OverviewTimeseriesGraphComponent;
    exports.ExtendedDataD3TimeseriesGraphComponent = ExtendedDataD3TimeseriesGraphComponent;
    exports.HelgolandD3Module = HelgolandD3Module;
    exports.D3AxisType = D3AxisType;
    exports.D3SelectionRange = D3SelectionRange;
    exports.HoveringStyle = HoveringStyle;
    exports.D3TimeFormatLocaleService = D3TimeFormatLocaleService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWQzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL21vZGVsL2QzLXBsb3Qtb3B0aW9ucy50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvZDMtdGltZXNlcmllcy1ncmFwaC9kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvbW9kZWwvZDMtYXhpcy10eXBlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy10cmFqZWN0b3J5LWdyYXBoL2QzLXRyYWplY3RvcnktZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9leHRlbmRlZC1kYXRhLWQzLXRpbWVzZXJpZXMtZ3JhcGgvZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvZDMtZ2VuZXJhbC1ncmFwaC9kMy1nZW5lcmFsLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvZDMubW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9tb2RlbC9kMy1zZWxlY3Rpb24tcmFuZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRPcHRpb25zLCBIYXNMb2FkYWJsZUNvbnRlbnQsIE1peGluLCBUaW1lLCBUaW1lSW50ZXJ2YWwsIFRpbWVzcGFuIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgRDNQbG90T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2QzLXBsb3Qtb3B0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPG41Mi1kMy10aW1lc2VyaWVzLWdyYXBoIFtkYXRhc2V0SWRzXT1cImRhdGFzZXRJZHNcIiBbZGF0YXNldE9wdGlvbnNdPVwiZGF0YXNldE9wdGlvbnNcIiBbcmVsb2FkRm9yRGF0YXNldHNdPVwicmVsb2FkRm9yRGF0YXNldHNcIlxuICAgIFt0aW1lSW50ZXJ2YWxdPVwib3ZlcnZpZXdUaW1lc3BhblwiIFttYWluVGltZUludGVydmFsXT1cInRpbWVzcGFuXCIgW3ByZXNlbnRlck9wdGlvbnNdPVwicHJlc2VudGVyT3B0aW9uc1wiIChvblRpbWVzcGFuQ2hhbmdlZCk9XCJ0aW1lU3BhbkNoYW5nZWQoJGV2ZW50KVwiXG4gICAgKG9uQ29udGVudExvYWRpbmcpPVwib25HcmFwaExvYWRpbmcoJGV2ZW50KVwiPjwvbjUyLWQzLXRpbWVzZXJpZXMtZ3JhcGg+YCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgLmQze2hlaWdodDoxMDAlfWBdXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEhhc0xvYWRhYmxlQ29udGVudCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRJZHM6IHN0cmluZ1tdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IE1hcDxzdHJpbmcsIERhdGFzZXRPcHRpb25zPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHByZXNlbnRlck9wdGlvbnM6IEQzUGxvdE9wdGlvbnM7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJhbmdlZmFjdG9yOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByZWxvYWRGb3JEYXRhc2V0czogc3RyaW5nW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25UaW1lc3BhbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Mb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Db250ZW50TG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzQ29udGVudExvYWRpbmc6IChsb2FkaW5nOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gICAgcHVibGljIG92ZXJ2aWV3VGltZXNwYW46IFRpbWVzcGFuO1xuICAgIHB1YmxpYyB0aW1lc3BhbjogVGltZXNwYW47XG5cbiAgICBwcml2YXRlIGluaXQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5wcmVzZW50ZXJPcHRpb25zLm92ZXJ2aWV3ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlc2VudGVyT3B0aW9ucyA9IHsgb3ZlcnZpZXc6IHRydWUgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmFuZ2VmYWN0b3IgPSB0aGlzLnJhbmdlZmFjdG9yIHx8IDE7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpO1xuICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy50aW1lSW50ZXJ2YWwgJiYgdGhpcy5pbml0KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZC5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZVNwYW5DaGFuZ2VkKHRpbWVzcGFuOiBUaW1lc3Bhbikge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQodGltZXNwYW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkdyYXBoTG9hZGluZyhsb2FkaW5nOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNDb250ZW50TG9hZGluZyhsb2FkaW5nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IHRpbWVzcGFuID0gdGhpcy50aW1lU3J2Yy5jcmVhdGVUaW1lc3Bhbk9mSW50ZXJ2YWwodGhpcy50aW1lSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnRpbWVzcGFuID0gdGltZXNwYW47XG4gICAgICAgIHRoaXMub3ZlcnZpZXdUaW1lc3BhbiA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aW1lc3BhbiwgdGhpcy5yYW5nZWZhY3Rvcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgdGltZUZvcm1hdCwgdGltZUZvcm1hdExvY2FsZSwgVGltZUxvY2FsZURlZmluaXRpb24gfSBmcm9tICdkMyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGhvbGRzIHRoZSB0cmFuc2xhdGlvbnMgZm9yIGQzIGNoYXJ0cyB0aW1lIGF4aXMgbGFiZWxzLlxuICogQWRkIGEgbmV3IHRyYW5zbGF0aW9uIHdpdGggdGhlIG1ldGhvZCAnYWRkVGltZUZvcm1hdExvY2FsZScgbGlrZSB0aGlzIHNhbXBsZTpcbiAqXG4gKiBhZGRUaW1lRm9ybWF0TG9jYWxlKCdkZScsXG4gKiB7XG4gKiAgICdkYXRlVGltZSc6ICclYSAlYiAlZSAlWCAlWScsXG4gKiAgICdkYXRlJzogJyVkLSVtLSVZJyxcbiAqICAgJ3RpbWUnOiAnJUg6JU06JVMnLFxuICogICAncGVyaW9kcyc6IFsnQU0nLCAnUE0nXSxcbiAqICAgJ2RheXMnOiBbJ1Nvbm50YWcnLCAnTW9udGFnJywgJ0RpZW5zdGFnJywgJ01pdHR3b2NoJywgJ0Rvbm5lcnN0YWcnLCAnRnJlaXRhZycsICdTYW1zdGFnJ10sXG4gKiAgICdzaG9ydERheXMnOiBbJ1NvJywgJ01vJywgJ0RpJywgJ01pJywgJ0RvJywgJ0ZyJywgJ1NhJ10sXG4gKiAgICdtb250aHMnOiBbJ0phbnVhcicsICdGZWJydWFyJywgJ03Dg8KkcnonLCAnQXByaWwnLCAnTWFpJywgJ0p1bmknLCAnSnVsaScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09rdG9iZXInLCAnTm92ZW1iZXInLCAnRGV6ZW1iZXInXSxcbiAqICAgJ3Nob3J0TW9udGhzJzogWydKYW4nLCAnRmViJywgJ03Dg8KkcicsICdBcHInLCAnTWFpJywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPa3QnLCAnTm92JywgJ0RleiddXG4gKiB9KVxuICpcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB0aW1lRm9ybWF0TG9jYWxlTWFwcGVyOiBNYXA8c3RyaW5nLCBUaW1lTG9jYWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGFkZFRpbWVGb3JtYXRMb2NhbGUobG9jYWxlQ29kZTogc3RyaW5nLCBkZWZpbml0aW9uOiBUaW1lTG9jYWxlRGVmaW5pdGlvbikge1xuICAgIHRoaXMudGltZUZvcm1hdExvY2FsZU1hcHBlci5zZXQobG9jYWxlQ29kZSwgZGVmaW5pdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGltZUxvY2FsZShzcGVjaWZpZXI6IHN0cmluZyk6IChkYXRlOiBEYXRlKSA9PiBzdHJpbmcge1xuICAgIGNvbnN0IGxhbmdDb2RlID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMYW5nO1xuICAgIGlmICh0aGlzLnRpbWVGb3JtYXRMb2NhbGVNYXBwZXIuaGFzKGxhbmdDb2RlKSkge1xuICAgICAgcmV0dXJuIHRpbWVGb3JtYXRMb2NhbGUodGhpcy50aW1lRm9ybWF0TG9jYWxlTWFwcGVyLmdldChsYW5nQ29kZSkpLmZvcm1hdChzcGVjaWZpZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGltZUZvcm1hdChzcGVjaWZpZXIpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBQbG90IG9wdGlvbnMgZm9yIEQzIGNvbXBvbmVudC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRDNQbG90T3B0aW9ucyB7XG5cbiAgICAvKipcbiAgICAgKiBzaG93IHJlZmVyZW5jZSB2YWx1ZXMgZm9yIGEgZ3JhcGhcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgc2hvd1JlZmVyZW5jZVZhbHVlcz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0cyB0aGUgZGF0YXNldCBkYXRhIGdlbmVyYWxpemVkXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIGdlbmVyYWxpemVBbGx3YXlzPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHRvZ2dsZSBwYW5uaW5nICh0cnVlKSBhbmQgem9vbWluZyAoZmFsc2UpXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIHRvZ2dsZVBhblpvb20/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBvciBoaWRlIHkgYXhpc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICB5YXhpcz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzaG93IG9yIGhpZGUgZ3JpZCBsaW5lcyBpbnNpZGUgcGxvdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBncmlkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNob3cgb3IgaGlkZSBsaW5lcyB3aXRoIHZhbHVlcyB3aGVuIGhvdmVyaW5nIHdpdGggbW91c2VcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgaG92ZXJhYmxlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHN0eWxlIHdoZW4gaG92ZXJpbmcgd2l0aCBtb3VzZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBob3ZlclN0eWxlPzogSG92ZXJpbmdTdHlsZTtcblxuICAgIC8qKlxuICAgICAqIGluZGljYXRpbmcgaWYgY29tcG9uZW50IHNob3VsZCBidWlsZCBvdmVydmlldyBkaWFncmFtIG9yIG5vdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBvdmVydmlldz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzaG93IGNvcHlyaWdodCBsYWJlbFxuICAgICAqXG4gICAgICogZGVmYXVsdCBwb3NpdGlvbiBpcyB0b3AgbGVmdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBjb3B5cmlnaHQ/OiBEM0NvcHlyaWdodDtcblxuICAgIC8qKlxuICAgICogdG9nZ2xlIGRhdGFzZXQgZ3JvdXBpbmcgYnkgdW9tXG4gICAgKiB0cnVlID0gZ3JvdXAgeSBheGlzIGJ5IHVvbVxuICAgICogZmFsc2UgPSBzaW5nbGUgeSBheGlzIGZvciBlYWNoIHRpbWVzZXJpZXNcbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgZ3JvdXBZYXhpcz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAqIHNob3cgdGhlIGxhYmVsIG9mIHRoZSB4YXhpc1xuICAgICpcbiAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgKi9cbiAgICBzaG93VGltZUxhYmVsPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICogUmVxdWVzdCB0aGUgZGF0YSB3aXRoIGV4cGFuZGVkPXRydWUsIHRvIGdldCB2YWx1ZUJlZm9yZVRpbWVzcGFuL3ZhbHVlQWZ0ZXJUaW1lc3BhblxuICAgICpcbiAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgKi9cbiAgICByZXF1ZXN0QmVmb3JlQWZ0ZXJWYWx1ZXM/OiBib29sZWFuO1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRDNDb3B5cmlnaHQge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgcG9zaXRpb25YPzogJ3JpZ2h0JyB8ICdsZWZ0JztcbiAgICBwb3NpdGlvblk/OiAndG9wJyB8ICdib3R0b20nO1xufVxuXG5leHBvcnQgZW51bSBIb3ZlcmluZ1N0eWxlIHtcbiAgICBub25lID0gJ25vbmUnLFxuICAgIGxpbmUgPSAnbGluZScsXG4gICAgcG9pbnQgPSAncG9pbnQnXG59XG4iLCJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29sb3JTZXJ2aWNlLFxuICAgIERhdGEsXG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBEYXRhc2V0T3B0aW9ucyxcbiAgICBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50LFxuICAgIElEYXRhc2V0LFxuICAgIEludGVybmFsRGF0YXNldElkLFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIE1pbk1heFJhbmdlLFxuICAgIFRpbWUsXG4gICAgVGltZXNlcmllcyxcbiAgICBUaW1lc2VyaWVzRGF0YSxcbiAgICBUaW1lc3Bhbixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhpZ2hsaWdodE91dHB1dCB9IGZyb20gJy4uL21vZGVsL2QzLWhpZ2hsaWdodCc7XG5pbXBvcnQgeyBEM1Bsb3RPcHRpb25zLCBIb3ZlcmluZ1N0eWxlIH0gZnJvbSAnLi4vbW9kZWwvZDMtcGxvdC1vcHRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhRW50cnkge1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgeERpYWdDb29yZD86IG51bWJlcjtcbiAgICB5RGlhZ0Nvb3JkPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsRGF0YUVudHJ5IHtcbiAgICBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgaWQ/OiBudW1iZXI7IC8vIFRPRE8gbmVlZGVkP1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZGF0YTogRGF0YUVudHJ5W107XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICAgIHBvaW50czoge1xuICAgICAgICBmaWxsQ29sb3I6IHN0cmluZ1xuICAgIH07XG4gICAgbGluZXM/OiB7XG4gICAgICAgIGxpbmVXaWR0aD86IG51bWJlcjtcbiAgICAgICAgcG9pbnRSYWRpdXM/OiBudW1iZXI7XG4gICAgfTtcbiAgICBiYXJzPzoge1xuICAgICAgICBsaW5lV2lkdGg/OiBudW1iZXI7XG4gICAgfTtcbiAgICBheGlzT3B0aW9uczoge1xuICAgICAgICB1b206IHN0cmluZztcbiAgICAgICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgICAgIHplcm9CYXNlZD86IGJvb2xlYW47XG4gICAgICAgIHlBeGlzUmFuZ2U/OiBNaW5NYXhSYW5nZTtcbiAgICAgICAgYXV0b1JhbmdlU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgICAgICAgc2VwYXJhdGVZQXhpcz86IGJvb2xlYW47XG4gICAgICAgIHBhcmFtZXRlcnM/OiB7XG4gICAgICAgICAgICBmZWF0dXJlPzogeyBpZDogU3RyaW5nLCBsYWJlbDogU3RyaW5nIH07XG4gICAgICAgICAgICBwaGVub21lbm9uPzogeyBpZDogU3RyaW5nLCBsYWJlbDogU3RyaW5nIH07XG4gICAgICAgICAgICBvZmZlcmluZz86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgdmlzaWJsZTogYm9vbGVhbjtcbiAgICBmb2N1c0xhYmVsUmVjdD86IGFueTtcbiAgICBmb2N1c0xhYmVsPzogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFDb25zdCBleHRlbmRzIElEYXRhc2V0IHtcbiAgICBkYXRhPzogRGF0YTxbbnVtYmVyLCBudW1iZXJdPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBZUmFuZ2VzIHtcbiAgICB1b206IHN0cmluZztcbiAgICByYW5nZT86IE1pbk1heFJhbmdlOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSB1b21cbiAgICBwcmVSYW5nZT86IE1pbk1heFJhbmdlOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSB1b21cbiAgICBvcmlnaW5SYW5nZT86IE1pbk1heFJhbmdlOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSB1b21cbiAgICB6ZXJvQmFzZWQ6IGJvb2xlYW47XG4gICAgYXV0b1JhbmdlOiBib29sZWFuO1xuICAgIG91dE9mcmFuZ2U6IGJvb2xlYW47XG4gICAgaWQ/OiBzdHJpbmc7IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IGludGVybmFsSWRcbiAgICBpZHM/OiBzdHJpbmdbXTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgZmlyc3Q/OiBib29sZWFuO1xuICAgIHlTY2FsZT86IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjtcbiAgICBvZmZzZXQ/OiBudW1iZXI7XG4gICAgcGFyYW1ldGVyczogeyAgIC8vIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gZm9yIHRoZSB5IGF4aXMgbGFiZWxcbiAgICAgICAgZmVhdHVyZT86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICBwaGVub21lbm9uPzogeyBpZDogU3RyaW5nLCBsYWJlbDogU3RyaW5nIH07XG4gICAgICAgIG9mZmVyaW5nPzogeyBpZDogU3RyaW5nLCBsYWJlbDogU3RyaW5nIH07XG4gICAgfTtcbn1cblxuaW50ZXJmYWNlIFlTY2FsZSB7XG4gICAgYnVmZmVyOiBudW1iZXI7XG4gICAgeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG59XG5cbmludGVyZmFjZSBZQXhpc1NlbGVjdGlvbiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjbGlja2VkOiBib29sZWFuO1xuICAgIGlkcz86IEFycmF5PHN0cmluZz47XG4gICAgdW9tPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSGlnaGxpZ2h0RGF0YXNldCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjaGFuZ2U6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLXRpbWVzZXJpZXMtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2QzdGltZXNlcmllcz48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLmdyYXBoRG90c3tzdHJva2Utd2lkdGg6MDtzdHJva2Utb3BhY2l0eToxfS5kMyAuZ3JhcGhEb3RzIC5ob3ZlcntzdHJva2Utd2lkdGg6MjBweDtzdHJva2Utb3BhY2l0eTouNX0uZDMgLmZvcm1lckJ1dHRvbiwuZDMgLmxhdGVyQnV0dG9ue2ZpbGw6Z3JleTtvcGFjaXR5Oi4zfS5kMyAuZm9ybWVyQnV0dG9uOmhvdmVyLC5kMyAubGF0ZXJCdXR0b246aG92ZXJ7b3BhY2l0eTouNn0uZDMgLmFycm93e3N0cm9rZTpncmV5O3N0cm9rZS13aWR0aDozcHh9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudFxuICAgIGV4dGVuZHMgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudDxEYXRhc2V0T3B0aW9ucywgRDNQbG90T3B0aW9ucz5cbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KClcbiAgICAvLyBkaWZmZXJlbmNlIHRvIHRpbWVzcGFuL3RpbWVJbnRlcnZhbCAtLT4gaWYgYnJ1c2gsIHRoZW4gdGhpcyBpcyB0aGUgdGltZXNwYW4gb2YgdGhlIG1haW4tZGlhZ3JhbVxuICAgIHB1YmxpYyBtYWluVGltZUludGVydmFsOiBUaW1lc3BhbjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkhpZ2hsaWdodENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxIaWdobGlnaHRPdXRwdXQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ2xpY2tEYXRhUG9pbnQ6IEV2ZW50RW1pdHRlcjxUaW1lc2VyaWVzRGF0YVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2QzdGltZXNlcmllcycpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBoaWdobGlnaHRPdXRwdXQ6IEhpZ2hsaWdodE91dHB1dDtcblxuICAgIC8vIERPTSBlbGVtZW50c1xuICAgIHByb3RlY3RlZCByYXdTdmc6IGFueTsgLy8gZDMuU2VsZWN0aW9uPEVudGVyRWxlbWVudCwge30sIG51bGwsIHVuZGVmaW5lZD47XG4gICAgcHJvdGVjdGVkIGdyYXBoOiBhbnk7XG4gICAgcHJvdGVjdGVkIGdyYXBoRm9jdXM6IGFueTtcbiAgICBwcm90ZWN0ZWQgZ3JhcGhCb2R5OiBhbnk7XG4gICAgcHJpdmF0ZSBkcmFnUmVjdDogYW55O1xuICAgIHByaXZhdGUgZHJhZ1JlY3RHOiBhbnk7XG4gICAgcHJpdmF0ZSBiYWNrZ3JvdW5kOiBhbnk7XG4gICAgcHJpdmF0ZSBjb3B5cmlnaHQ6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzRzogYW55O1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0Rm9jdXM6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodFJlY3Q6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodFRleHQ6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzbGFiZWxUaW1lOiBhbnk7XG5cbiAgICAvLyBvcHRpb25zIGZvciBpbnRlcmFjdGlvblxuICAgIHByaXZhdGUgZHJhZ2dpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkcmFnU3RhcnQ6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBkcmFnQ3VycmVudDogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIGRyYWdnaW5nTW92ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRyYWdNb3ZlU3RhcnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGRyYWdNb3ZlUmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBtb3VzZWRvd25CcnVzaDogYm9vbGVhbjtcbiAgICBwcml2YXRlIG9sZEdyb3VwWWF4aXM6IGJvb2xlYW47XG5cbiAgICAvLyBkYXRhIHR5cGVzXG4gICAgcHJvdGVjdGVkIHByZXBhcmVkRGF0YTogSW50ZXJuYWxEYXRhRW50cnlbXSA9IFtdOyAvLyA6IERhdGFTZXJpZXNbXVxuICAgIHByb3RlY3RlZCBkYXRhc2V0TWFwOiBNYXA8c3RyaW5nLCBEYXRhQ29uc3Q+ID0gbmV3IE1hcCgpO1xuICAgIHByb3RlY3RlZCBsaXN0T2ZVb21zOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByb3RlY3RlZCB5UmFuZ2VzRWFjaFVvbTogWVJhbmdlc1tdID0gW107IC8vIHkgYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJhbmdlcyBmb3IgZWFjaCB1b21cbiAgICBwcm90ZWN0ZWQgZGF0YVlyYW5nZXM6IFlSYW5nZXNbXSA9IFtdOyAvLyB5IGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyByYW5nZXMgb2YgYWxsIGRhdGFzZXRzXG4gICAgcHJpdmF0ZSB4QXhpc1JhbmdlOiBUaW1lc3BhbjsgLy8geCBkb21haW4gcmFuZ2VcbiAgICBwcml2YXRlIHhBeGlzUmFuZ2VPcmlnaW46IGFueSA9IFtdOyAvLyB4IGRvbWFpbiByYW5nZVxuICAgIHByaXZhdGUgeEF4aXNSYW5nZVBhbjogW251bWJlciwgbnVtYmVyXTsgLy8geCBkb21haW4gcmFuZ2VcbiAgICBwcml2YXRlIGxpc3RPZlNlcGFyYXRpb24gPSBBcnJheSgpO1xuICAgIHByaXZhdGUgeUF4aXNTZWxlY3Q7XG5cbiAgICBwcml2YXRlIHhTY2FsZUJhc2U6IGQzLlNjYWxlVGltZTxudW1iZXIsIG51bWJlcj47IC8vIGNhbGN1bGF0ZSBkaWFncmFtIGNvb3JkIG9mIHggdmFsdWVcbiAgICBwcml2YXRlIHlTY2FsZUJhc2U6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjsgLy8gY2FsY3VsYXRlIGRpYWdyYW0gY29vcmQgb2YgeSB2YWx1ZVxuICAgIC8vIHByaXZhdGUgZG90c09iamVjdHM6IGFueVtdO1xuICAgIHByaXZhdGUgbGFiZWxUaW1lc3RhbXA6IG51bWJlcltdO1xuICAgIHByaXZhdGUgbGFiZWxYQ29vcmQ6IG51bWJlcltdO1xuICAgIHByaXZhdGUgZGlzdExhYmVsWENvb3JkOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGJ1ZmZlclN1bTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtYXJnaW4gPSB7XG4gICAgICAgIHRvcDogMTAsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgYm90dG9tOiA0MCxcbiAgICAgICAgbGVmdDogNDBcbiAgICB9O1xuICAgIHByaXZhdGUgbWF4TGFiZWx3aWR0aCA9IDA7XG4gICAgcHJpdmF0ZSBvcGFjID0ge1xuICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICBob3ZlcjogMC4zLFxuICAgICAgICBjbGljazogMC41XG4gICAgfTtcbiAgICBwcml2YXRlIGFkZExpbmVXaWR0aCA9IDI7IC8vIHZhbHVlIGFkZGVkIHRvIGxpbmV3aWR0aFxuICAgIHByaXZhdGUgbG9hZGluZ0NvdW50ZXIgPSAwO1xuICAgIHByaXZhdGUgY3VycmVudFRpbWVJZDogc3RyaW5nO1xuXG4gICAgLy8gZGVmYXVsdCBwbG90IG9wdGlvbnNcbiAgICBwcml2YXRlIHBsb3RPcHRpb25zOiBEM1Bsb3RPcHRpb25zID0ge1xuICAgICAgICBzaG93UmVmZXJlbmNlVmFsdWVzOiBmYWxzZSxcbiAgICAgICAgZ2VuZXJhbGl6ZUFsbHdheXM6IHRydWUsXG4gICAgICAgIHRvZ2dsZVBhblpvb206IHRydWUsXG4gICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcbiAgICAgICAgaG92ZXJTdHlsZTogSG92ZXJpbmdTdHlsZS5wb2ludCxcbiAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgeWF4aXM6IHRydWUsXG4gICAgICAgIG92ZXJ2aWV3OiBmYWxzZSxcbiAgICAgICAgc2hvd1RpbWVMYWJlbDogdHJ1ZSxcbiAgICAgICAgcmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lRm9ybWF0TG9jYWxlU2VydmljZTogRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGNvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lSWQgPSB0aGlzLnV1aWR2NCgpO1xuICAgICAgICAvLyB0aGlzLmRvdHNPYmplY3RzID0gW107XG5cbiAgICAgICAgdGhpcy5yYXdTdmcgPSBkMy5zZWxlY3QodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCAnMTAwJScpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcblxuICAgICAgICB0aGlzLmdyYXBoID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaEZvY3VzID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5tb3VzZWRvd25CcnVzaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxvYWREYXRhRm9yRGF0YXNldHMoZGF0YXNldElkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgZGF0YXNldElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXREYXRhKHRoaXMuZGF0YXNldE1hcC5nZXQoaWQpLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZERhdGFzZXQoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyhpZCwgdXJsKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAodGltZXNlcmllcykgPT4gdGhpcy5sb2FkQWRkZWREYXRhc2V0KHRpbWVzZXJpZXMpLFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldChpZCwgdXJsKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChkYXRhc2V0KSA9PiB0aGlzLmxvYWRBZGRlZERhdGFzZXQoZGF0YXNldCksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YVlyYW5nZXMgPSBbXTtcbiAgICAgICAgdGhpcy54QXhpc1JhbmdlT3JpZ2luID0gW107XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIGxldCBzcGxpY2VJZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKHNwbGljZUlkeCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5zcGxpY2Uoc3BsaWNlSWR4LCAxKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20gPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEYXRhKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdHNEYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKCF0c0RhdGEuc2VsZWN0ZWQgfHwgdHNEYXRhLnNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRzRGF0YS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0c0RhdGEubGluZXMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuICAgICAgICAgICAgdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzID4gMCA/IHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyArPSB0aGlzLmFkZExpbmVXaWR0aCA6IHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyArPSAwO1xuICAgICAgICAgICAgdHNEYXRhLmJhcnMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAodHNEYXRhLmF4aXNPcHRpb25zLnNlcGFyYXRlWUF4aXMgfHwgIXRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IodHNEYXRhLmludGVybmFsSWQsIHRzRGF0YS5heGlzT3B0aW9ucy51b20pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2ludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaW50ZXJuYWxJZF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpZmllciA9IHRzRGF0YS5heGlzT3B0aW9ucy51b207XG4gICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nVW9tID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kKGVsID0+IGVsLnVvbSA9PT0gaWRlbnRpZmllcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVb20uaWRzLmZpbmRJbmRleChlbCA9PiBlbCA9PT0gaW50ZXJuYWxJZCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKGlkZW50aWZpZXIsIHRzRGF0YS5heGlzT3B0aW9ucy51b20pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcy5wdXNoKGludGVybmFsSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGF4aXMgZm9yIHVvbSBvZiBkYXRhc2V0IHdpdGggc2VsZWN0ZWQgaW50ZXJuYWxJZFxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVb20gIT09IHVuZGVmaW5lZCAmJiBleGlzdGluZ1VvbS5pZHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBoaWdobGlnaHQgYXhpcyBvZiB1b20gaWYgYWxsIGRhdGFzZXRzIHdpdGggdGhpcyB1b20gYXJlIGhpZ2hsaWdodGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3VudCBkYXRhc2V0cyBmb3Igc3BlY2lmaWMgdW9tXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMubGVuZ3RoICE9PSBleGlzdGluZ1VvbS5pZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmICh0c0RhdGEuc2VsZWN0ZWQgfHwgdHNEYXRhLnNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRzRGF0YS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdHNEYXRhLmxpbmVzLmxpbmVXaWR0aCAtPSB0aGlzLmFkZExpbmVXaWR0aDtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyA+IDAgPyB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgLT0gdGhpcy5hZGRMaW5lV2lkdGggOiB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgLT0gMDtcbiAgICAgICAgICAgIHRzRGF0YS5iYXJzLmxpbmVXaWR0aCAtPSB0aGlzLmFkZExpbmVXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHRzRGF0YS5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzIHx8ICF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKHRzRGF0YS5pbnRlcm5hbElkLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFt0c0RhdGEuaW50ZXJuYWxJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFt0c0RhdGEuaW50ZXJuYWxJZF0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFt0c0RhdGEuaW50ZXJuYWxJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdLmlkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpZmllciA9IHRzRGF0YS5heGlzT3B0aW9ucy51b207XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3RvcihpZGVudGlmaWVyLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcyA9IHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzLmZpbHRlcihlbCA9PiBlbCAhPT0gaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IEQzUGxvdE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbGRHcm91cFlheGlzID0gdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ob3ZlclN0eWxlICE9PSBIb3ZlcmluZ1N0eWxlLnBvaW50ICYmIG9wdGlvbnMuaG92ZXJTdHlsZSA9PT0gSG92ZXJpbmdTdHlsZS5wb2ludCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCdnLmQzbGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wbG90T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIGlmICh0aGlzLnJhd1N2ZyAmJiB0aGlzLnlSYW5nZXNFYWNoVW9tKSB7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucywgZmlyc3RDaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFmaXJzdENoYW5nZSAmJiB0aGlzLmRhdGFzZXRNYXAuaGFzKGludGVybmFsSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0RGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGludGVybmFsSWQpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0RGF0YShkYXRhc2V0LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNlbnRlclRpbWUodGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2VudGVyZWRUaW1lc3BhbiA9IHRoaXMudGltZVNydmMuY2VudGVyVGltZXNwYW4odGhpcy50aW1lc3BhbiwgbmV3IERhdGUodGltZXN0YW1wKSk7XG4gICAgICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZWQuZW1pdChjZW50ZXJlZFRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVRpbWUoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZWQuZW1pdChuZXcgVGltZXNwYW4oZnJvbSwgdG8pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBZGRlZERhdGFzZXQoZGF0YXNldDogSURhdGFzZXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLnNldChkYXRhc2V0LmludGVybmFsSWQsIGRhdGFzZXQpO1xuICAgICAgICB0aGlzLmxvYWREYXRhc2V0RGF0YShkYXRhc2V0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gbG9hZCBkYXRhIG9mIGRhdGFzZXRcbiAgICBwcml2YXRlIGxvYWREYXRhc2V0RGF0YShkYXRhc2V0OiBJRGF0YXNldCwgZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YXNldE9wdGlvbnMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nQ291bnRlciA9PT0gMCkgeyB0aGlzLm9uQ29udGVudExvYWRpbmcuZW1pdCh0cnVlKTsgfVxuICAgICAgICB0aGlzLmxvYWRpbmdDb3VudGVyKys7XG5cbiAgICAgICAgaWYgKGRhdGFzZXQgaW5zdGFuY2VvZiBUaW1lc2VyaWVzKSB7XG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGhpcy50aW1lc3BhbiwgMC4yKTtcblxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VHNEYXRhPFtudW1iZXIsIG51bWJlcl0+KGRhdGFzZXQuaWQsIGRhdGFzZXQudXJsLCBidWZmZXIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdmbG90JyxcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucGxvdE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcyB8fCB0aGlzLnBsb3RPcHRpb25zLnJlcXVlc3RCZWZvcmVBZnRlclZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbGl6ZTogdGhpcy5wbG90T3B0aW9ucy5nZW5lcmFsaXplQWxsd2F5cyB8fCBkYXRhc2V0T3B0aW9ucy5nZW5lcmFsaXplXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7IGZvcmNlVXBkYXRlOiBmb3JjZSB9XG4gICAgICAgICAgICApLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnByZXBhcmVUc0RhdGEoZGF0YXNldCwgcmVzdWx0KSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkNvbXBsZXRlTG9hZGluZ0RhdGEoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Db21wbGV0ZUxvYWRpbmdEYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRpbmdDb3VudGVyLS07XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdDb3VudGVyID09PSAwKSB7IHRoaXMub25Db250ZW50TG9hZGluZy5lbWl0KGZhbHNlKTsgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHByZXBhcmUgZWFjaCBkYXRhc2V0IGZvciB0aGUgZ3JhcGggYW5kIGFkZGluZyBpdCB0byBhbiBhcnJheSBvZiBkYXRhc2V0cy5cbiAgICAgKiBAcGFyYW0gZGF0YXNldCB7SURhdGFzZXR9IE9iamVjdCBvZiB0aGUgd2hvbGUgZGF0YXNldFxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVRzRGF0YShkYXRhc2V0OiBJRGF0YXNldCwgZGF0YTogRGF0YTxbbnVtYmVyLCBudW1iZXJdPik6IHZvaWQge1xuXG4gICAgICAgIC8vIGFkZCBzdXJyb3VuZGluZyBlbnRyaWVzIHRvIHRoZSBzZXRcbiAgICAgICAgaWYgKGRhdGEudmFsdWVCZWZvcmVUaW1lc3BhbikgeyBkYXRhLnZhbHVlcy51bnNoaWZ0KGRhdGEudmFsdWVCZWZvcmVUaW1lc3Bhbik7IH1cbiAgICAgICAgaWYgKGRhdGEudmFsdWVBZnRlclRpbWVzcGFuKSB7IGRhdGEudmFsdWVzLnB1c2goZGF0YS52YWx1ZUFmdGVyVGltZXNwYW4pOyB9XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmdldChkYXRhc2V0LmludGVybmFsSWQpLmRhdGEgPSBkYXRhO1xuICAgICAgICBjb25zdCBkYXRhc2V0SWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlKSA9PiBlLmludGVybmFsSWQgPT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCk7XG5cbiAgICAgICAgLy8gVE9ETzogY2hhbmdlIHVvbSBmb3IgdGVzdGluZ1xuICAgICAgICAvLyBpZiAodGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgZGF0YXNldC51b20gPSAnbWMnO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgcmFuZG9tIGNvbG9yLCBpZiBjb2xvciBpcyBub3QgZGVmaW5lZFxuICAgICAgICBpZiAoc3R5bGVzLmNvbG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMuY29sb3JTZXJ2aWNlLmdldENvbG9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmQgb2YgY2hlY2sgZm9yIGRhdGFzZXRzXG4gICAgICAgIGNvbnN0IGRhdGFFbnRyeTogSW50ZXJuYWxEYXRhRW50cnkgPSB7XG4gICAgICAgICAgICBpbnRlcm5hbElkOiBkYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgICAgICBpZDogKGRhdGFzZXRJZHggPj0gMCA/IGRhdGFzZXRJZHggOiB0aGlzLnByZXBhcmVkRGF0YS5sZW5ndGgpLFxuICAgICAgICAgICAgY29sb3I6IHN0eWxlcy5jb2xvcixcbiAgICAgICAgICAgIGRhdGE6IHN0eWxlcy52aXNpYmxlID8gZGF0YS52YWx1ZXMubWFwKGQgPT4gKHsgdGltZXN0YW1wOiBkWzBdLCB2YWx1ZTogZFsxXSB9KSkgOiBbXSxcbiAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogc3R5bGVzLmNvbG9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IHN0eWxlcy5saW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgcG9pbnRSYWRpdXM6IHN0eWxlcy5wb2ludFJhZGl1c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhcnM6IHtcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IHN0eWxlcy5saW5lV2lkdGhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHVvbTogZGF0YXNldC51b20sXG4gICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFzZXQubGFiZWwsXG4gICAgICAgICAgICAgICAgemVyb0Jhc2VkOiBzdHlsZXMuemVyb0Jhc2VkWUF4aXMsXG4gICAgICAgICAgICAgICAgeUF4aXNSYW5nZTogc3R5bGVzLnlBeGlzUmFuZ2UsXG4gICAgICAgICAgICAgICAgYXV0b1JhbmdlU2VsZWN0aW9uOiBzdHlsZXMuYXV0b1JhbmdlU2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHNlcGFyYXRlWUF4aXM6IHN0eWxlcy5zZXBhcmF0ZVlBeGlzLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZGF0YXNldC5wYXJhbWV0ZXJzLmZlYXR1cmUsXG4gICAgICAgICAgICAgICAgICAgIHBoZW5vbWVub246IGRhdGFzZXQucGFyYW1ldGVycy5waGVub21lbm9uLFxuICAgICAgICAgICAgICAgICAgICBvZmZlcmluZzogZGF0YXNldC5wYXJhbWV0ZXJzLm9mZmVyaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IHN0eWxlcy52aXNpYmxlXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHNlcGFyYXRpb25JZHg6IG51bWJlciA9IHRoaXMubGlzdE9mU2VwYXJhdGlvbi5maW5kSW5kZXgoKGlkKSA9PiBpZCA9PT0gZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKHN0eWxlcy5zZXBhcmF0ZVlBeGlzKSB7XG4gICAgICAgICAgICBpZiAoc2VwYXJhdGlvbklkeCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RPZlNlcGFyYXRpb24ucHVzaChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saXN0T2ZTZXBhcmF0aW9uID0gdGhpcy5saXN0T2ZTZXBhcmF0aW9uLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsdGVybmF0aXZlIGxpbmV3V2lkdGggPSB0aGlzLnBsb3RPcHRpb25zLnNlbGVjdGVkLmluY2x1ZGVzKGRhdGFzZXQudW9tKVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihkYXRhc2V0LmludGVybmFsSWQpID49IDApIHtcbiAgICAgICAgICAgIGRhdGFFbnRyeS5saW5lcy5saW5lV2lkdGggKz0gdGhpcy5hZGRMaW5lV2lkdGg7XG4gICAgICAgICAgICBkYXRhRW50cnkubGluZXMucG9pbnRSYWRpdXMgPiAwID8gZGF0YUVudHJ5LmxpbmVzLnBvaW50UmFkaXVzICs9IHRoaXMuYWRkTGluZVdpZHRoIDogZGF0YUVudHJ5LmxpbmVzLnBvaW50UmFkaXVzICs9IDA7XG4gICAgICAgICAgICBkYXRhRW50cnkuYmFycy5saW5lV2lkdGggKz0gdGhpcy5hZGRMaW5lV2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChzdHlsZXMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoZGF0YUVudHJ5LmludGVybmFsSWQsIGRhdGFFbnRyeS5heGlzT3B0aW9ucy51b20pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5pbnRlcm5hbElkXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5pbnRlcm5hbElkXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0uaWRzLnB1c2goZGF0YUVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHNlbGVjdGVkIGRhdGFzZXRzIGZvciBoaWdobGlnaHRpbmdcbiAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QpIHtcbiAgICAgICAgICAgIGlmIChzdHlsZXMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dLmlkcy5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dLmlkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlZCA9IHRoaXMuY291bnRHcm91cGVkRGF0YXNldHMoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbSwgZGF0YUVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMubGVuZ3RoID09PSBjb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0gJiYgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0uY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMucHVzaChkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFzZXRJZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGFbZGF0YXNldElkeF0gPSBkYXRhRW50cnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5wdXNoKGRhdGFFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRSZWZlcmVuY2VWYWx1ZURhdGEoZGF0YXNldC5pbnRlcm5hbElkLCBzdHlsZXMsIGRhdGEsIGRhdGFzZXQudW9tKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzRGF0YShkYXRhRW50cnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGFkZCByZWZlcmVuY2V2YWx1ZWRhdGEgdG8gdGhlIGRhdGFzZXQgKGUuZy4gbWVhbikuXG4gICAgICogQHBhcmFtIGludGVybmFsSWQge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIGlkIG9mIGEgZGF0YXNldFxuICAgICAqIEBwYXJhbSBzdHlsZXMge0RhdGFzZXRPcHRpb25zfSBPYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBmb3IgZGF0YXNldCBzdHlsaW5nXG4gICAgICogQHBhcmFtIGRhdGEge0RhdGF9IEFycmF5IG9mIEFycmF5cyBjb250YWluaW5nIHRoZSBtZWFzdXJlbWVudC1kYXRhIG9mIHRoZSBkYXRhc2V0XG4gICAgICogQHBhcmFtIHVvbSB7U3RyaW5nfSBTdHJpbmcgd2l0aCB0aGUgdW9tIG9mIGEgZGF0YXNldFxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkUmVmZXJlbmNlVmFsdWVEYXRhKGludGVybmFsSWQ6IHN0cmluZywgc3R5bGVzOiBEYXRhc2V0T3B0aW9ucywgZGF0YTogRGF0YTxbbnVtYmVyLCBudW1iZXJdPiwgdW9tOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIWVudHJ5LmludGVybmFsSWQuc3RhcnRzV2l0aCgncmVmJyArIGludGVybmFsSWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgc3R5bGVzLnNob3dSZWZlcmVuY2VWYWx1ZXMuZm9yRWFjaCgocmVmVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZEYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiAncmVmJyArIGludGVybmFsSWQgKyByZWZWYWx1ZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZlZhbHVlLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLnJlZmVyZW5jZVZhbHVlc1tyZWZWYWx1ZS5pZF0ubWFwKGQgPT4gKHsgdGltZXN0YW1wOiBkWzBdLCB2YWx1ZTogZFsxXSB9KSksXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiByZWZWYWx1ZS5jb2xvclxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGF4aXNPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1b206IHVvbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5wdXNoKHJlZkRhdGFFbnRyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBkYXRhIHRvIGNhbGN1bGF0ZSB5IGF4aXMgcmFuZ2Ugb2YgZWFjaCBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBkYXRhRW50cnkge0RhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgZGF0YXNldCByZWxhdGVkIGRhdGEuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NEYXRhKGRhdGFFbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRSYW5nZTogTWluTWF4UmFuZ2U7XG4gICAgICAgIGxldCBjYWxjdWxhdGVkUHJlUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBsZXQgY2FsY3VsYXRlZE9yaWdpblJhbmdlOiBNaW5NYXhSYW5nZTtcbiAgICAgICAgbGV0IHByZWRlZmluZWRSYW5nZTogTWluTWF4UmFuZ2U7XG4gICAgICAgIGlmIChkYXRhRW50cnkuYXhpc09wdGlvbnMueUF4aXNSYW5nZSAmJiBkYXRhRW50cnkuYXhpc09wdGlvbnMueUF4aXNSYW5nZS5taW4gIT09IGRhdGFFbnRyeS5heGlzT3B0aW9ucy55QXhpc1JhbmdlLm1heCkge1xuICAgICAgICAgICAgcHJlZGVmaW5lZFJhbmdlID0gZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF1dG9EYXRhRXh0ZW50OiBib29sZWFuID0gZGF0YUVudHJ5LmF4aXNPcHRpb25zLmF1dG9SYW5nZVNlbGVjdGlvbjtcblxuICAgICAgICAvLyBnZXQgbWluIGFuZCBtYXggdmFsdWUgb2YgZGF0YVxuICAgICAgICBjb25zdCBkYXRhRXh0ZW50ID0gZDMuZXh0ZW50PERhdGFFbnRyeSwgbnVtYmVyPihkYXRhRW50cnkuZGF0YSwgKGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjYWxjdWxhdGVkT3JpZ2luUmFuZ2UgPSB7IG1pbjogZGF0YUV4dGVudFswXSwgbWF4OiBkYXRhRXh0ZW50WzFdIH07XG5cbiAgICAgICAgbGV0IHNldERhdGFFeHRlbnQgPSBmYWxzZTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgb3V0IG9mIHByZWRlZmluZWQgcmFuZ2VcbiAgICAgICAgaWYgKHByZWRlZmluZWRSYW5nZSAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgaWYgKHByZWRlZmluZWRSYW5nZS5taW4gPiBwcmVkZWZpbmVkUmFuZ2UubWF4KSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFJhbmdlID0geyBtaW46IHByZWRlZmluZWRSYW5nZS5tYXgsIG1heDogcHJlZGVmaW5lZFJhbmdlLm1pbiB9O1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQcmVSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWF4LCBtYXg6IHByZWRlZmluZWRSYW5nZS5taW4gfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFJhbmdlID0geyBtaW46IHByZWRlZmluZWRSYW5nZS5taW4sIG1heDogcHJlZGVmaW5lZFJhbmdlLm1heCB9O1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRQcmVSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWluLCBtYXg6IHByZWRlZmluZWRSYW5nZS5tYXggfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UubWluID4gZGF0YUV4dGVudFsxXSB8fCBwcmVkZWZpbmVkUmFuZ2UubWF4IDwgZGF0YUV4dGVudFswXSkge1xuICAgICAgICAgICAgICAgIHNldERhdGFFeHRlbnQgPSBhdXRvRGF0YUV4dGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldERhdGFFeHRlbnQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldERhdGFFeHRlbnQpIHtcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBkYXRhRXh0ZW50WzBdLCBtYXg6IGRhdGFFeHRlbnRbMV0gfTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kUmFuZ2UoY2FsY3VsYXRlZFJhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0eWxlIG9wdGlvbiAnemVybyBiYXNlZCB5LWF4aXMnIGlzIGNoZWNrZWQsXG4gICAgICAgIC8vIHRoZSBheGlzIHdpbGwgYmUgYWxpZ25lZCB0byB0b3AgMCAod2l0aCBkYXRhIGJlbG93IDApIG9yIHRvIGJvdHRvbSAwICh3aXRoIGRhdGEgYWJvdmUgMClcbiAgICAgICAgLy8gbGV0IHplcm9CYXNlZFZhbHVlID0gLTE7XG4gICAgICAgIGlmIChkYXRhRW50cnkuYXhpc09wdGlvbnMuemVyb0Jhc2VkICYmICF0aGlzLnBsb3RPcHRpb25zLm92ZXJ2aWV3KSB7XG4gICAgICAgICAgICBpZiAoZGF0YUV4dGVudFsxXSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFJhbmdlLm1heCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0ZWRQcmVSYW5nZSkgeyBjYWxjdWxhdGVkUHJlUmFuZ2UubWF4ID0gMDsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGFFeHRlbnRbMF0gPj0gMCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZS5taW4gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdGVkUHJlUmFuZ2UpIHsgY2FsY3VsYXRlZFByZVJhbmdlLm1pbiA9IDA7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0RhdGFzZXRJZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gZGF0YUVudHJ5LmludGVybmFsSWQpO1xuXG4gICAgICAgIC8vIHNldCByYW5nZSwgdW9tIGFuZCBpZCBmb3IgZWFjaCBkYXRhc2V0XG4gICAgICAgIGlmIChkYXRhRW50cnkudmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XSA9IHtcbiAgICAgICAgICAgICAgICB1b206IGRhdGFFbnRyeS5heGlzT3B0aW9ucy51b20sXG4gICAgICAgICAgICAgICAgaWQ6IGRhdGFFbnRyeS5pbnRlcm5hbElkLFxuICAgICAgICAgICAgICAgIHplcm9CYXNlZDogZGF0YUVudHJ5LmF4aXNPcHRpb25zLnplcm9CYXNlZCxcbiAgICAgICAgICAgICAgICBvdXRPZnJhbmdlOiBzZXREYXRhRXh0ZW50LFxuICAgICAgICAgICAgICAgIGF1dG9SYW5nZTogYXV0b0RhdGFFeHRlbnQsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczogZGF0YUVudHJ5LmF4aXNPcHRpb25zLnBhcmFtZXRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUoY2FsY3VsYXRlZFJhbmdlLm1pbikgJiYgaXNGaW5pdGUoY2FsY3VsYXRlZFJhbmdlLm1heCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdLnJhbmdlID0gY2FsY3VsYXRlZFJhbmdlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0ucHJlUmFuZ2UgPSBjYWxjdWxhdGVkUHJlUmFuZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XS5vcmlnaW5SYW5nZSA9IGNhbGN1bGF0ZWRPcmlnaW5SYW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHJhbmdlIGFuZCBhcnJheSBvZiBJRHMgZm9yIGVhY2ggdW9tIHRvIGdlbmVyYXRlIHktYXhpcyBsYXRlciBvblxuICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tID0gW107XG4gICAgICAgIHRoaXMuZGF0YVlyYW5nZXMuZm9yRWFjaCgoeVJhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoeVJhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoKGUpID0+IGUudW9tID09PSB5UmFuZ2UudW9tKTtcbiAgICAgICAgICAgICAgICBsZXQgeXJhbmdlT2JqOiBZUmFuZ2VzID0ge1xuICAgICAgICAgICAgICAgICAgICB1b206IHlSYW5nZS51b20sXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB5UmFuZ2UucmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHByZVJhbmdlOiB5UmFuZ2UucHJlUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblJhbmdlOiB5UmFuZ2Uub3JpZ2luUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlkczogW3lSYW5nZS5pZF0sXG4gICAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogeVJhbmdlLnplcm9CYXNlZCxcbiAgICAgICAgICAgICAgICAgICAgb3V0T2ZyYW5nZTogeVJhbmdlLm91dE9mcmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9SYW5nZTogeVJhbmdlLmF1dG9SYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogeVJhbmdlLnBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5UmFuZ2UucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLmF1dG9SYW5nZSB8fCB5UmFuZ2UuYXV0b1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5UmFuZ2UucHJlUmFuZ2UgJiYgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnByZVJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ3VycmVudExhdGVzdChpZHgsIHlSYW5nZSwgJ3ByZVJhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ucmFuZ2UgPSB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ucHJlUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ3VycmVudExhdGVzdChpZHgsIHlSYW5nZSwgJ3JhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLmF1dG9SYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHlSYW5nZS5vdXRPZnJhbmdlICE9PSB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ub3V0T2ZyYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdvcmlnaW5SYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLm9yaWdpblJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdyYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWtlTGF0ZXN0KGlkeCwgeVJhbmdlLCAncmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5pZHMucHVzaCh5UmFuZ2UuaWQpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbS5wdXNoKHlyYW5nZU9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuZ3JhcGgpIHtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZXQgcmFuZ2UgdG8gZGVmYXVsdCBpbnRlcnZhbCwgaWYgbWluIGFuZCBtYXggb2YgcmFuZ2UgYXJlIG5vdCBzZXQuXG4gICAgICogQHBhcmFtIHJhbmdlIHtNaW5NYXhSYW5nZX0gcmFuZ2UgdG8gYmUgc2V0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGV4dGVuZFJhbmdlKHJhbmdlOiBNaW5NYXhSYW5nZSk6IHZvaWQge1xuICAgICAgICBpZiAocmFuZ2UubWluID09PSByYW5nZS5tYXgpIHtcbiAgICAgICAgICAgIHJhbmdlLm1pbiA9IHJhbmdlLm1pbiAtIDE7XG4gICAgICAgICAgICByYW5nZS5tYXggPSByYW5nZS5tYXggKyAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hlY2sgcmFuZ2VzIGZvciBtaW4gYW5kIG1heCByYW5nZS5cbiAgICAgKiBAcGFyYW0gaWR4IHtOdW1iZXJ9IEluZGV4IG9mIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2JqIHtZUmFuZ2VzfSBuZXcgb2JqZWN0IHRvIGJlIGNvbXBhcmVkIHdpdGggb2xkXG4gICAgICogQHBhcmFtIHBvcyB7U3RyaW5nfSB0eXBlIG9mIHJhbmdlIChlLmcuIHByZVJhbmdlLCByYW5nZSwgb3JpZ2luUmFuZ2UpXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0N1cnJlbnRMYXRlc3QoaWR4OiBudW1iZXIsIG9iajogWVJhbmdlcywgcG9zOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdLm1pbiA+IG9ialtwb3NdLm1pbiAmJiAhaXNOYU4ob2JqW3Bvc10ubWluKSkge1xuICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10ubWluID0gb2JqW3Bvc10ubWluO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5tYXggPCBvYmpbcG9zXS5tYXggJiYgIWlzTmFOKG9ialtwb3NdLm1heCkpIHtcbiAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdLm1heCA9IG9ialtwb3NdLm1heDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNldCBtaW4gYW5kIG1heCByYW5nZS5cbiAgICAgKiBAcGFyYW0gaWR4IHtOdW1iZXJ9IEluZGV4IG9mIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2JqIHtZUmFuZ2VzfSBuZXcgb2JqZWN0XG4gICAgICogQHBhcmFtIHBvcyB7U3RyaW5nfSB0eXBlIG9mIHJhbmdlIChlLmcuIHByZVJhbmdlLCByYW5nZSwgb3JpZ2luUmFuZ2UpXG4gICAgICovXG4gICAgcHJpdmF0ZSB0YWtlTGF0ZXN0KGlkeDogbnVtYmVyLCBvYmo6IFlSYW5nZXMsIHBvczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdID0gb2JqW3Bvc107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGllbnRIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b20gKyAodGhpcy5wbG90T3B0aW9ucy5zaG93VGltZUxhYmVsID8gMCA6IDIwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3U3ZnLm5vZGUoKS53aWR0aC5iYXNlVmFsLnZhbHVlIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0IC0gdGhpcy5tYXhMYWJlbHdpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgcmFuZ2UgZm9yIGJ1aWxkaW5nIHRoZSB5IGF4aXMgZm9yIGVhY2ggdW9tIG9mIGV2ZXJ5IGRhdGFzZXQuXG4gICAgICogQHBhcmFtIHVvbSB7U3RyaW5nfSBTdHJpbmcgdGhhdCBpcyB0aGUgdW9tIG9mIGEgZGF0YXNldFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0eUF4aXNSYW5nZSh1b206IHN0cmluZyk6IE1pbk1heFJhbmdlIHtcbiAgICAgICAgbGV0IHJhbmdlT2JqID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kKGVsID0+IGVsLnVvbSA9PT0gdW9tKTtcbiAgICAgICAgaWYgKHJhbmdlT2JqKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgemVybyBiYXNlZCB5IGF4aXNcbiAgICAgICAgICAgIC8vIGlmIChyYW5nZU9iai56ZXJvQmFzZWQpIHtcbiAgICAgICAgICAgIC8vICAgICBpZiAocmFuZ2VPYmouemVyb0Jhc2VkVmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmFuZ2UubWluID0gMDtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICByYW5nZS5tYXggPSAwO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHJldHVybiByYW5nZU9iai5yYW5nZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDsgLy8gZXJyb3I6IHVvbSBkb2VzIG5vdCBleGlzdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHBsb3QgdGhlIGdyYXBoIGFuZCBpdHMgZGVwZW5kZW5jaWVzXG4gICAgICogKGdyYXBoIGxpbmUsIGdyYXBoIGF4ZXMsIGV2ZW50IGhhbmRsZXJzKVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwbG90R3JhcGgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0ID0ge1xuICAgICAgICAgICAgdGltZXN0YW1wOiAwLFxuICAgICAgICAgICAgaWRzOiBuZXcgTWFwKClcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCF0aGlzLnlSYW5nZXNFYWNoVW9tKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSB0aGlzLmxpc3RPZlVvbXMuZmluZEluZGV4KCh1b20pID0+IHVvbSA9PT0gZW50cnkuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgIGlmIChpZHggPCAwKSB7IHRoaXMubGlzdE9mVW9tcy5wdXNoKGVudHJ5LmF4aXNPcHRpb25zLnVvbSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRhcHQgYXhpcyBoaWdobGlnaHRpbmcsIHdoZW4gY2hhbmdpbmcgZ3JvdXBpbmcgb2YgeSBheGlzXG4gICAgICAgIGlmICh0aGlzLm9sZEdyb3VwWWF4aXMgIT09IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VZc2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG4gICAgICAgIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZ3JhcGhGb2N1cy5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLmJ1ZmZlclN1bSA9IDA7XG4gICAgICAgIHRoaXMueVNjYWxlQmFzZSA9IG51bGw7XG5cbiAgICAgICAgLy8gZ2V0IHJhbmdlIG9mIHggYW5kIHkgYXhpc1xuICAgICAgICB0aGlzLnhBeGlzUmFuZ2UgPSB0aGlzLnRpbWVzcGFuO1xuXG4gICAgICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgICAgIGxldCB5QXhpc0FycmF5OiBZUmFuZ2VzW10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyB8fCB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeUF4aXNBcnJheSA9IHRoaXMueVJhbmdlc0VhY2hVb207XG4gICAgICAgICAgICAvLyBwdXNoIGFsbCBsaXN0T2ZTZXBhcmF0aW9uIGludG8geUF4aXNBcnJheVxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdE9mU2VwYXJhdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0T2ZTZXBhcmF0aW9uLmZvckVhY2goKHNlcElkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdFbDogWVJhbmdlcyA9IHRoaXMuZGF0YVlyYW5nZXMuZmluZCgoZWwpID0+IGVsICE9PSBudWxsICYmIGVsLmlkID09PSBzZXBJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdFbCAmJiAoeUF4aXNBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IG5ld0VsLmlkKSA8IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbGwgZGF0YXNldCBmb3Igc3BlY2lmaWMgdW9tIGFyZSBzZXBhcmF0ZWQgZnJvbSBncm91cGluZywgdGhlIHlheGlzIG9mIHRoaXMgdW9tIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIGF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ1VvbSA9IHlBeGlzQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLnVvbSA9PT0gbmV3RWwudW9tICYmIChlbC5pZHMgIT09IHVuZGVmaW5lZCB8fCBlbC5pZHMubGVuZ3RoID09PSAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVb20gPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBpZCBmcm9tIGlkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWxldGVJZCA9IHlBeGlzQXJyYXlbZXhpc3RpbmdVb21dLmlkcy5maW5kSW5kZXgoaWQgPT4gaWQgPT09IHNlcElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRlSWQgPj0gMCkgeyB5QXhpc0FycmF5W2V4aXN0aW5nVW9tXS5pZHMuc3BsaWNlKGRlbGV0ZUlkLCAxKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5QXhpc0FycmF5W2V4aXN0aW5nVW9tXS5pZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSB5QXhpc0FycmF5W2V4aXN0aW5nVW9tXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5QXhpc0FycmF5LnNwbGljZShleGlzdGluZ1VvbSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNBcnJheS5wdXNoKG5ld0VsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeUF4aXNBcnJheSA9IHRoaXMuZGF0YVlyYW5nZXM7XG4gICAgICAgIH1cblxuICAgICAgICB5QXhpc0FycmF5LmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS5maXJzdCA9ICh0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwpO1xuICAgICAgICAgICAgICAgIGVudHJ5Lm9mZnNldCA9IHRoaXMuYnVmZmVyU3VtO1xuXG4gICAgICAgICAgICAgICAgbGV0IHlBeGlzUmVzdWx0ID0gdGhpcy5kcmF3WWF4aXMoZW50cnkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U2NhbGVCYXNlID0geUF4aXNSZXN1bHQueVNjYWxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlclN1bSA9IHlBeGlzUmVzdWx0LmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlclN1bSA9IHlBeGlzUmVzdWx0LmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW50cnkueVNjYWxlID0geUF4aXNSZXN1bHQueVNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMueVNjYWxlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB4IGFuZCB5IGF4aXNcbiAgICAgICAgdGhpcy5kcmF3WGF4aXModGhpcy5idWZmZXJTdW0pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZ3JvdW5kIGFzIHJlY3RhbmdsZSBwcm92aWRpbmcgcGFubmluZ1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2JhY2tncm91bmRSZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyU3VtICsgJywgMCknKTtcblxuICAgICAgICB0aGlzLmRyYXdBbGxHcmFwaExpbmVzKCk7XG4gICAgICAgIHRoaXMuYWRkVGltZXNwYW5KdW1wQnV0dG9ucygpO1xuXG4gICAgICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZ3JvdW5kIHJlY3RcbiAgICAgICAgaWYgKCF0aGlzLnBsb3RPcHRpb25zLm92ZXJ2aWV3KSB7XG4gICAgICAgICAgICAvLyBleGVjdXRlIHdoZW4gaXQgaXMgbm90IGFuIG92ZXJ2aWV3IGRpYWdyYW1cbiAgICAgICAgICAgIC8vIG1vdXNlIGV2ZW50cyBob3ZlcmluZ1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJTdHlsZSA9PT0gSG92ZXJpbmdTdHlsZS5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTGluZUhvdmVyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCdnLmQzbGluZScpLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy50b2dnbGVQYW5ab29tID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgICAuY2FsbChkMy56b29tKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc3RhcnQnLCB0aGlzLnpvb21TdGFydEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3pvb20nLCB0aGlzLnpvb21IYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdlbmQnLCB0aGlzLnpvb21FbmRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZDMuZHJhZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3N0YXJ0JywgdGhpcy5wYW5TdGFydEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2RyYWcnLCB0aGlzLnBhbk1vdmVIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdlbmQnLCB0aGlzLnBhbkVuZEhhbmRsZXIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb3B5cmlnaHRMYWJlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXhlY3V0ZSB3aGVuIGl0IGlzIG92ZXJ2aWV3IGRpYWdyYW1cbiAgICAgICAgICAgIGxldCBpbnRlcnZhbDogW251bWJlciwgbnVtYmVyXSA9IHRoaXMuZ2V0WERvbWFpbkJ5VGltZXN0YW1wKCk7XG4gICAgICAgICAgICBsZXQgb3ZlcnZpZXdUaW1lc3BhbkludGVydmFsID0gW2ludGVydmFsWzBdLCBpbnRlcnZhbFsxXV07XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBicnVzaFxuICAgICAgICAgICAgbGV0IGJydXNoID0gZDMuYnJ1c2hYKClcbiAgICAgICAgICAgICAgICAuZXh0ZW50KFtbMCwgMF0sIFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF1dKVxuICAgICAgICAgICAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBvbiBtb3VzZWNsaWNrIGNoYW5nZSB0aW1lIGFmdGVyIGJydXNoIHdhcyBtb3ZlZFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VzZWRvd25CcnVzaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVCeUNvb3JkOiBbbnVtYmVyLCBudW1iZXJdID0gdGhpcy5nZXRUaW1lc3RhbXBCeUNvb3JkKGQzLmV2ZW50LnNlbGVjdGlvblswXSwgZDMuZXZlbnQuc2VsZWN0aW9uWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aW1lQnlDb29yZFswXSwgdGltZUJ5Q29vcmRbMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2Vkb3duQnJ1c2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gYWRkIGJydXNoIHRvIHN2Z1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdicnVzaCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoYnJ1c2gpXG4gICAgICAgICAgICAgICAgLmNhbGwoYnJ1c2gubW92ZSwgb3ZlcnZpZXdUaW1lc3BhbkludGVydmFsKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBhZGQgZXZlbnQgdG8gc2VsZWN0aW9uIHRvIHByZXZlbnQgdW5uZWNlc3NhcnkgcmUtcmVuZGVyaW5nIG9mIGJydXNoXG4gICAgICAgICAgICAgKiBhZGQgc3R5bGUgb2YgYnJ1c2ggc2VsZWN0aW9uIGhlcmVcbiAgICAgICAgICAgICAqIGUuZy4gJ2ZpbGwnIGZvciBjb2xvcixcbiAgICAgICAgICAgICAqICdzdHJva2UnIGZvciBib3JkZXJsaW5lLWNvbG9yLFxuICAgICAgICAgICAgICogJ3N0cm9rZS1kYXNoYXJyYXknIGZvciBjdXN0b21pemluZyBib3JkZXJsaW5lLXN0eWxlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC5zZWxlY3RBbGwoJy5zZWxlY3Rpb24nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2Vkb3duQnJ1c2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkbyBub3QgYWxsb3cgY2xlYXIgc2VsZWN0aW9uXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQuc2VsZWN0QWxsKCcub3ZlcmxheScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvLyBhZGQgZXZlbnQgdG8gcmVzaXppbmcgaGFuZGxlIHRvIGFsbG93IGNoYW5nZSB0aW1lIG9uIHJlc2l6ZVxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNlbGVjdEFsbCgnLmhhbmRsZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3JlZCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMC4zKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2Vkb3duQnJ1c2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQb2ludEhvdmVyaW5nKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSwgbGluZTogZDMuTGluZTxEYXRhRW50cnk+KSB7XG4gICAgICAgIHRoaXMuZ3JhcGhCb2R5LnNlbGVjdEFsbCgnLmhvdmVyRG90cycpXG4gICAgICAgICAgICAuZGF0YShlbnRyeS5kYXRhLmZpbHRlcigoZCkgPT4gIWlzTmFOKGQudmFsdWUpKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdob3ZlckRvdHMnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGQ6IERhdGFFbnRyeSkgPT4gJ2hvdmVyLWRvdC0nICsgZC50aW1lc3RhbXAgKyAnLScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAndHJhbnNwYXJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAndHJhbnNwYXJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgbGluZS54KCkpXG4gICAgICAgICAgICAuYXR0cignY3knLCBsaW5lLnkoKSlcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZW50cnkubGluZXMucG9pbnRSYWRpdXMgKyAzKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZDogRGF0YUVudHJ5KSA9PiB0aGlzLm1vdXNlT3ZlclBvaW50SG92ZXJpbmcoZCwgZW50cnkpKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkOiBEYXRhRW50cnkpID0+IHRoaXMubW91c2VPdXRQb2ludEhvdmVyaW5nKGQsIGVudHJ5KSlcbiAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKGQ6IERhdGFFbnRyeSkgPT4gdGhpcy5jbGlja0RhdGFQb2ludChkLCBlbnRyeSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTGluZUhvdmVyaW5nKCkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmZvY3VzJywgdGhpcy5tb3VzZW1vdmVIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dC5mb2N1cycsIHRoaXMubW91c2VvdXRIYW5kbGVyKTtcbiAgICAgICAgLy8gbGluZSBpbnNpZGUgZ3JhcGhcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1cyA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOmxpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgJzAnKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgJzAnKVxuICAgICAgICAgICAgLmF0dHIoJ3gxJywgJzAnKVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgJzAnKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnYmxhY2snKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAnMXB4Jyk7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAvLyBsYWJlbCBpbnNpZGUgZ3JhcGhcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgJ2xpZ2h0ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNsYWJlbFRpbWUgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy10aW1lJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xpY2tEYXRhUG9pbnQoZDogRGF0YUVudHJ5LCBlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrIHBvaW50Jyk7XG4gICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dGVybmFsSWQ6IEludGVybmFsRGF0YXNldElkID0gdGhpcy5kYXRhc2V0SWRSZXNvbHZlci5yZXNvbHZlSW50ZXJuYWxJZChlbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIGNvbnN0IGFwaXVybCA9IGV4dGVybmFsSWQudXJsO1xuICAgICAgICAgICAgY29uc3QgdGltZXNwYW46IFRpbWVzcGFuID0geyBmcm9tOiBkLnRpbWVzdGFtcCwgdG86IGQudGltZXN0YW1wIH07XG5cbiAgICAgICAgICAgIC8vIHJlcXVlc3QgYWxsIHRpbWVzZXJpZXMgdGhhdCBoYXZlIGRhdGEgZm9yIHRoZSBzYW1lIG9mZmVyaW5nIGFuZCBmZWF0dXJlXG4gICAgICAgICAgICB0aGlzLmFwaS5nZXRUaW1lc2VyaWVzKGFwaXVybCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9mZmVyaW5nOiBlbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzLm9mZmVyaW5nLmlkLFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlOiBlbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzLmZlYXR1cmUuaWRcbiAgICAgICAgICAgICAgICB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICh0c0FycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lc2VyaWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0c0FycmF5LmZvckVhY2godHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzZXJpZXMucHVzaCh0cy5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdCB0cyBkYXRhIGJ5IHRpbWVzZXJpZXMgSUQgZm9yIHNwZWNpZmljIG9mZmVyaW5nIGFuZCBmZWF0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXRUaW1lc2VyaWVzRGF0YShhcGl1cmwsIHRpbWVzZXJpZXMsIHRpbWVzcGFuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0c0RhdGEpID0+IHRoaXMub25DbGlja0RhdGFQb2ludC5lbWl0KHRzRGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGltZXNwYW5KdW1wQnV0dG9ucygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGRhdGFWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGxldCBmb3JtZXJUaW1lc3RhbXAgPSBudWxsO1xuICAgICAgICBsZXQgbGF0ZXJUaW1lc3RhbXAgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5yZXF1ZXN0QmVmb3JlQWZ0ZXJWYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SWR4SW5UaW1lc3BhbiA9IGVudHJ5LmRhdGEuZmluZEluZGV4KGUgPT4gKHRoaXMudGltZXNwYW4uZnJvbSA8IGVbMF0gJiYgdGhpcy50aW1lc3Bhbi50byA+IGVbMF0pICYmIGlzRmluaXRlKGVbMV0pKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RJZHhJblRpbWVzcGFuIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SWR4SW5UaW1lc3BhbiA9IGVudHJ5LmRhdGEuZmluZEluZGV4KGUgPT4gKGVbMF0gPiB0aGlzLnRpbWVzcGFuLmZyb20gJiYgZVswXSA+IHRoaXMudGltZXNwYW4udG8pICYmIGlzRmluaXRlKGVbMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RJZHhJblRpbWVzcGFuID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVyVGltZXN0YW1wID0gZW50cnkuZGF0YVtlbnRyeS5kYXRhLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+IChlWzBdIDwgdGhpcy50aW1lc3Bhbi5mcm9tICYmIGVbMF0gPCB0aGlzLnRpbWVzcGFuLnRvKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1lclRpbWVzdGFtcCA9IGVudHJ5LmRhdGFbZW50cnkuZGF0YS5sZW5ndGggLSAxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRhdGFWaXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b25XaWR0aCA9IDUwO1xuICAgICAgICAgICAgY29uc3QgbGVmdFJpZ2h0ID0gMTU7XG4gICAgICAgICAgICBpZiAoZm9ybWVyVGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZyA9IHRoaXMuYmFja2dyb3VuZC5hcHBlbmQoJ2cnKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9ybWVyQnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgYnV0dG9uV2lkdGggKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5idWZmZXJTdW0gKyAnLCAwKScpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCAoKSA9PiB0aGlzLmNlbnRlclRpbWUoZm9ybWVyVGltZXN0YW1wKSk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCAwICsgdGhpcy5idWZmZXJTdW0gKyBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCAwICsgdGhpcy5idWZmZXJTdW0gKyAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIDAgKyB0aGlzLmJ1ZmZlclN1bSArIGxlZnRSaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIHRoaXMuaGVpZ2h0IC8gMiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIDAgKyB0aGlzLmJ1ZmZlclN1bSArIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodCAvIDIgKyAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpIC8gMiArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhdGVyVGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZyA9IHRoaXMuYmFja2dyb3VuZC5hcHBlbmQoJ2cnKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGF0ZXJCdXR0b24nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCAnNTBweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLndpZHRoIC0gNTApICsgJywgMCknKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jZW50ZXJUaW1lKGxhdGVyVGltZXN0YW1wKSk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCB0aGlzLndpZHRoIC0gbGVmdFJpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgdGhpcy5oZWlnaHQgLyAyICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgdGhpcy53aWR0aCAtIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodCAvIDIgLSAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpIC8gMiArICdweCcpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy53aWR0aCAtIGxlZnRSaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIHRoaXMuaGVpZ2h0IC8gMiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIHRoaXMud2lkdGggLSAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ29weXJpZ2h0TGFiZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmNvcHlyaWdodCkge1xuICAgICAgICAgICAgbGV0IGJhY2tncm91bmQgPSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgICAgICAvLyBkZWZhdWx0ID0gdG9wIGxlZnRcbiAgICAgICAgICAgIGxldCB4ID0gMDsgLy8gbGVmdFxuICAgICAgICAgICAgbGV0IHkgPSAwOyAvLyArIHRoaXMubWFyZ2luLnRvcDsgLy8gdG9wXG4gICAgICAgICAgICB0aGlzLmNvcHlyaWdodCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICBsZXQgY29weXJpZ2h0TGFiZWwgPSB0aGlzLmNvcHlyaWdodC5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAudGV4dCh0aGlzLnBsb3RPcHRpb25zLmNvcHlyaWdodC5sYWJlbClcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29weXJpZ2h0JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdncmV5Jyk7XG4gICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQucG9zaXRpb25YID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgeCA9IGJhY2tncm91bmQudyAtIHRoaXMubWFyZ2luLnJpZ2h0IC0gdGhpcy5nZXREaW1lbnNpb25zKGNvcHlyaWdodExhYmVsLm5vZGUoKSkudztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmNvcHlyaWdodC5wb3NpdGlvblkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgeSA9IGJhY2tncm91bmQuaCAtIHRoaXMubWFyZ2luLnRvcCAqIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgeVRyYW5zZm9ybSA9IHkgKyB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS5oIC0gMztcbiAgICAgICAgICAgIGxldCB4VHJhbnNmb3JtID0gdGhpcy5idWZmZXJTdW0gKyB4O1xuICAgICAgICAgICAgY29weXJpZ2h0TGFiZWxcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgeFRyYW5zZm9ybSArICcsICcgKyB5VHJhbnNmb3JtICsgJyknKTtcbiAgICAgICAgICAgIHRoaXMuY29weXJpZ2h0LmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjb3B5cmlnaHQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhjb3B5cmlnaHRMYWJlbC5ub2RlKCkpLncpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhjb3B5cmlnaHRMYWJlbC5ub2RlKCkpLmgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHhUcmFuc2Zvcm0gKyAnLCAnICsgeSArICcpJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBmb3IgZXZlcnkgcHJlcHJhcmVkIGRhdGEgZW50cnkgdGhlIGdyYXBoIGxpbmUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGRyYXdBbGxHcmFwaExpbmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGhGb2N1cy5hcHBlbmQoJ2cnKTtcbiAgICAgICAgaWYgKCh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpICYmICF0aGlzLnBsb3RPcHRpb25zLm92ZXJ2aWV3KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZm9yIHBvaW50IGhvdmVyaW5nXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3QgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpyZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHRoaXMuZHJhd0dyYXBoTGluZShlbnRyeSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY2FsY3VsYXRlcyBhbmQgcmV0dXJucyB0aGUgeCBkaWFncmFtIGNvb3JkaW5hdGUgZm9yIHRoZSBicnVzaCByYW5nZVxuICAgICAqIGZvciB0aGUgb3ZlcnZpZXcgZGlhZ3JhbSBieSB0aGUgc2VsZWN0ZWQgdGltZSBpbnRlcnZhbCBvZiB0aGUgbWFpbiBkaWFncmFtLlxuICAgICAqIENhbGN1bGF0ZSB0byBnZXQgYnJ1c2ggZXh0ZW50IHdoZW4gbWFpbiBkaWFncmFtIHRpbWUgaW50ZXJ2YWwgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFhEb21haW5CeVRpbWVzdGFtcCgpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNhbGN1bGF0ZSByYW5nZSBvZiBicnVzaCB3aXRoIHRpbWVzdGFtcCBhbmQgbm90IGRpYWdyYW0gY29vcmRpbmF0ZXNcbiAgICAgICAgICogZm9ybXVsYTpcbiAgICAgICAgICogYnJ1c2hfbWluID1cbiAgICAgICAgICogKG92ZXJ2aWV3X3dpZHRoIC8gKG92ZXJ2aWV3X21heCAtIG92ZXJ2aWV3X21pbikpICogKGJydXNoX21pbiAtIG92ZXJ2aWV3X21pbilcbiAgICAgICAgICogYnJ1c19tYXggPVxuICAgICAgICAgKiAob3ZlcnZpZXdfd2lkdGggLyAob3ZlcnZpZXdfbWF4IC0gb3ZlcnZpZXdfbWluKSkgKiAoYnJ1c2hfbWF4IC0gb3ZlcnZpZXdfbWluKVxuICAgICAgICAgKi9cblxuICAgICAgICBsZXQgbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLmZyb207XG4gICAgICAgIGxldCBtYXhPdmVydmlld1RpbWVJbnRlcnZhbCA9IHRoaXMudGltZXNwYW4udG87XG4gICAgICAgIGxldCBtaW5EaWFncmFtVGltZXN0YW1wID0gdGhpcy5tYWluVGltZUludGVydmFsLmZyb207XG4gICAgICAgIGxldCBtYXhEaWFncmFtVGltZXN0YW1wID0gdGhpcy5tYWluVGltZUludGVydmFsLnRvO1xuICAgICAgICBsZXQgZGlhZ3JhbVdpZHRoID0gdGhpcy53aWR0aDtcblxuICAgICAgICBsZXQgZGlmZk92ZXJ2aWV3VGltZUludGVydmFsID0gbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgLSBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IGRpdk92ZXJ2aWV3VGltZVdpZHRoID0gZGlhZ3JhbVdpZHRoIC8gZGlmZk92ZXJ2aWV3VGltZUludGVydmFsO1xuICAgICAgICBsZXQgbWluQ2FsY0JydXNoOiBudW1iZXIgPSBkaXZPdmVydmlld1RpbWVXaWR0aCAqIChtaW5EaWFncmFtVGltZXN0YW1wIC0gbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWwpO1xuICAgICAgICBsZXQgbWF4Q2FsY0JydXNoOiBudW1iZXIgPSBkaXZPdmVydmlld1RpbWVXaWR0aCAqIChtYXhEaWFncmFtVGltZXN0YW1wIC0gbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWwpO1xuXG4gICAgICAgIHJldHVybiBbbWluQ2FsY0JydXNoLCBtYXhDYWxjQnJ1c2hdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY2FsY3VsYXRlcyBhbmQgcmV0dXJucyB0aGUgdGltZXN0YW1wIGZvciB0aGUgbWFpbiBkaWFncmFtIGNhbGN1bGF0ZWRcbiAgICAgKiBieSB0aGUgc2VsZWN0ZWQgY29vcmRpbmF0ZSBvZiB0aGUgYnJ1c2ggcmFuZ2UuXG4gICAgICogQHBhcmFtIG1pbkNhbGNCcnVzaCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgbWluaW11bSBjb29yZGluYXRlIG9mIHRoZSBzZWxlY3RlZCBicnVzaCByYW5nZS5cbiAgICAgKiBAcGFyYW0gbWF4Q2FsY0JydXNoIHtOdW1iZXJ9IE51bWJlciB3aXRoIHRoZSBtYXhpbXVtIGNvb3JkaW5hdGUgb2YgdGhlIHNlbGVjdGVkIGJydXNoIHJhbmdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VGltZXN0YW1wQnlDb29yZChtaW5DYWxjQnJ1c2g6IG51bWJlciwgbWF4Q2FsY0JydXNoOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNhbGN1bGF0ZSByYW5nZSBvZiBicnVzaCB3aXRoIHRpbWVzdGFtcCBhbmQgbm90IGRpYWdyYW0gY29vcmRpbmF0ZXNcbiAgICAgICAgICogZm9ybXVsYTpcbiAgICAgICAgICogbWluRGlhZ3JhbVRpbWVzdGFtcCA9XG4gICAgICAgICAqICgobWluQ2FsY0JydXNoIC8gb3ZlcnZpZXdfd2lkdGgpICogKG92ZXJ2aWV3X21heCAtIG92ZXJ2aWV3X21pbikpICsgb3ZlcnZpZXdfbWluXG4gICAgICAgICAqIG1heERpYWdyYW1UaW1lc3RhbXAgPVxuICAgICAgICAgKiAoKG1heENhbGNCcnVzaCAvIG92ZXJ2aWV3X3dpZHRoKSAqIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSArIG92ZXJ2aWV3X21pblxuICAgICAgICAgKi9cblxuICAgICAgICBsZXQgbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLmZyb207XG4gICAgICAgIGxldCBtYXhPdmVydmlld1RpbWVJbnRlcnZhbCA9IHRoaXMudGltZXNwYW4udG87XG4gICAgICAgIGxldCBkaWFncmFtV2lkdGggPSB0aGlzLndpZHRoO1xuXG4gICAgICAgIGxldCBkaWZmT3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSBtYXhPdmVydmlld1RpbWVJbnRlcnZhbCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsO1xuICAgICAgICBsZXQgbWluRGlhZ3JhbVRpbWVzdGFtcDogbnVtYmVyID0gKChtaW5DYWxjQnJ1c2ggLyBkaWFncmFtV2lkdGgpICogZGlmZk92ZXJ2aWV3VGltZUludGVydmFsKSArIG1pbk92ZXJ2aWV3VGltZUludGVydmFsO1xuICAgICAgICBsZXQgbWF4RGlhZ3JhbVRpbWVzdGFtcDogbnVtYmVyID0gKChtYXhDYWxjQnJ1c2ggLyBkaWFncmFtV2lkdGgpICogZGlmZk92ZXJ2aWV3VGltZUludGVydmFsKSArIG1pbk92ZXJ2aWV3VGltZUludGVydmFsO1xuXG4gICAgICAgIHJldHVybiBbbWluRGlhZ3JhbVRpbWVzdGFtcCwgbWF4RGlhZ3JhbVRpbWVzdGFtcF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkcmF3cyB0aGUgeCBheGlzIHRvIHRoZSBzdmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gYnVmZmVyWHJhbmdlIHtOdW1iZXJ9IE51bWJlciB3aXRoIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGxlZnQgZWRnZSBhbmQgdGhlIGJlZ2lubmluZyBvZiB0aGUgZ3JhcGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WGF4aXMoYnVmZmVyWHJhbmdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gcmFuZ2UgZm9yIHggYXhpcyBzY2FsZVxuICAgICAgICB0aGlzLnhTY2FsZUJhc2UgPSBkMy5zY2FsZVRpbWUoKVxuICAgICAgICAgICAgLmRvbWFpbihbbmV3IERhdGUodGhpcy54QXhpc1JhbmdlLmZyb20pLCBuZXcgRGF0ZSh0aGlzLnhBeGlzUmFuZ2UudG8pXSlcbiAgICAgICAgICAgIC5yYW5nZShbYnVmZmVyWHJhbmdlLCB0aGlzLndpZHRoXSk7XG5cbiAgICAgICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh0aGlzLnhTY2FsZUJhc2UpXG4gICAgICAgICAgICAudGlja0Zvcm1hdChkID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZC52YWx1ZU9mKCkpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0TWlsbGlzZWNvbmQgPSAnLiVMJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0U2Vjb25kID0gJzolUycsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdE1pbnV0ZSA9ICclSDolTScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEhvdXIgPSAnJUg6JU0nLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXREYXkgPSAnJWIgJWQnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRXZWVrID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0TW9udGggPSAnJUInLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRZZWFyID0gJyVZJztcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGQzLnRpbWVTZWNvbmQoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTWludXRlKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdFNlY29uZFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lSG91cihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNaW51dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVEYXkoZGF0ZSkgPCBkYXRlID8gZm9ybWF0SG91clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVNb250aChkYXRlKSA8IGRhdGUgPyAoZDMudGltZVdlZWsoZGF0ZSkgPCBkYXRlID8gZm9ybWF0RGF5IDogZm9ybWF0V2VlaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZVllYXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TW9udGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdFllYXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGltZUZvcm1hdExvY2FsZVNlcnZpY2UuZ2V0VGltZUxvY2FsZShmb3JtYXQpKG5ldyBEYXRlKGQudmFsdWVPZigpKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHRoaXMuaGVpZ2h0ICsgJyknKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXMpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJyk7XG5cbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuZ3JpZCkge1xuICAgICAgICAgICAgLy8gZHJhdyB0aGUgeCBncmlkIGxpbmVzXG4gICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgICAgICAuY2FsbCh4QXhpc1xuICAgICAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB1cHBlciBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuY2FsbChkMy5heGlzVG9wKHRoaXMueFNjYWxlQmFzZSkudGlja3MoMCkudGlja1NpemUoMCkpO1xuXG4gICAgICAgIC8vIHRleHQgbGFiZWwgZm9yIHRoZSB4IGF4aXNcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuc2hvd1RpbWVMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgKHRoaXMud2lkdGggKyBidWZmZXJYcmFuZ2UpIC8gMilcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4uYm90dG9tIC0gNSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAgICAgLnRleHQoJ3RpbWUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgdGhlIHkgYXhpcyBmb3IgZWFjaCBkYXRhc2V0LlxuICAgICAqIEVhY2ggdW9tIGhhcyBpdHMgb3duIGF4aXMuXG4gICAgICogQHBhcmFtIGVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIGEgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdZYXhpcyhlbnRyeTogWVJhbmdlcyk6IFlTY2FsZSB7XG4gICAgICAgIGxldCBzaG93QXhpcyA9ICh0aGlzLnBsb3RPcHRpb25zLm92ZXJ2aWV3ID8gZmFsc2UgOiAodGhpcy5wbG90T3B0aW9ucy55YXhpcyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMucGxvdE9wdGlvbnMueWF4aXMpKTtcbiAgICAgICAgLy8gY2hlY2sgZm9yIHkgYXhpcyBncm91cGluZ1xuICAgICAgICBsZXQgcmFuZ2U7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgfHwgdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGdyb3VwZWQgYXhpc1xuICAgICAgICAgICAgbGV0IHVvbUlkeCA9IHRoaXMubGlzdE9mVW9tcy5maW5kSW5kZXgoKHVvbSkgPT4gdW9tID09PSBlbnRyeS51b20pO1xuICAgICAgICAgICAgaWYgKHVvbUlkeCA+PSAwICYmIGVudHJ5LmlkcyAmJiBlbnRyeS5pZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIGdyb3VwZWQgd2l0aCBtb3JlIHRoYW4gb255IGRhdGFzZXRzIChpZiB1b20gaGFzIG1vcmUgdGhhbiBvbmUgZGF0YXNldHMpXG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldHlBeGlzUmFuZ2UoZW50cnkudW9tKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc2VwYXJhdGVkIGlkIChpZiBub3QgZW50cnkudW9tKSBPUiBncm91cGVkLCBidXQgb25seSBvbmUgZGF0YXNldCAoaWYgZW50cnkgaXMgZ3JvdXBlZCBidXQgaGFzIG9ubHkgb25lIGlkID0+IHVzZSByYW5nZSBvZiB0aGlzIGRhdGFzZXQpXG4gICAgICAgICAgICAgICAgbGV0IGVudHJ5RWxlbSA9IHRoaXMuZGF0YVlyYW5nZXMuZmluZCgoZWwpID0+IGVsICE9PSBudWxsICYmIChlbnRyeS5pZCA/IGVsLmlkID09PSBlbnRyeS5pZCA6IGVsLmlkID09PSBlbnRyeS5pZHNbMF0pKTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnlFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZW50cnlFbGVtLnJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAvLyByYW5nZSA9IGVudHJ5RWxlbS5wcmVSYW5nZSA/IGVudHJ5RWxlbS5wcmVSYW5nZSA6IGVudHJ5RWxlbS5yYW5nZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1bmdyb3VwZWQgYXhpc1xuICAgICAgICAgICAgbGV0IGVudHJ5RWxlbSA9IHRoaXMuZGF0YVlyYW5nZXMuZmluZCgoZWwpID0+IGVsICE9PSBudWxsICYmIGVsLmlkID09PSBlbnRyeS5pZCk7XG4gICAgICAgICAgICBpZiAoZW50cnlFbGVtKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSBlbnRyeUVsZW0ucHJlUmFuZ2UgPyBlbnRyeUVsZW0ucHJlUmFuZ2UgOiBlbnRyeUVsZW0ucmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeU1pbiA9IC0xO1xuICAgICAgICBsZXQgeU1heCA9IDE7XG4gICAgICAgIGlmIChyYW5nZSAhPT0gdW5kZWZpbmVkICYmIHJhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB5TWluID0gcmFuZ2UubWluO1xuICAgICAgICAgICAgeU1heCA9IHJhbmdlLm1heDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJhbmdlIGZvciB5IGF4aXMgc2NhbGVcbiAgICAgICAgY29uc3QgcmFuZ2VPZmZzZXQgPSAoeU1heCAtIHlNaW4pICogMC4xMDtcbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbeU1pbiAtIHJhbmdlT2Zmc2V0LCB5TWF4ICsgcmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGxldCB5QXhpc0dlbiA9IGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNSk7XG4gICAgICAgIGxldCBidWZmZXIgPSAwO1xuXG4gICAgICAgIC8vIG9ubHkgaWYgeUF4aXMgc2hvdWxkIG5vdCBiZSB2aXNpYmxlXG4gICAgICAgIGlmICghc2hvd0F4aXMpIHtcbiAgICAgICAgICAgIHlBeGlzR2VuXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB5IGF4aXNcbiAgICAgICAgY29uc3QgYXhpcyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzR2VuKTtcblxuICAgICAgICAvLyBvbmx5IGlmIHlBeGlzIHNob3VsZCBiZSB2aXNpYmxlXG4gICAgICAgIGlmIChzaG93QXhpcykge1xuICAgICAgICAgICAgLy8gZHJhdyB5IGF4aXMgbGFiZWxcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2R5JywgJzFlbScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3lheGlzVGV4dExhYmVsJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQnLCAnMThweCB0aW1lcycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdibGFjaycpXG4gICAgICAgICAgICAgICAgLnRleHQoKGVudHJ5LmlkID8gKGVudHJ5LnVvbSArICcgQCAnICsgZW50cnkucGFyYW1ldGVycy5mZWF0dXJlLmxhYmVsKSA6IGVudHJ5LnVvbSkpO1xuICAgICAgICAgICAgLy8gLnRleHQoKGVudHJ5LmlkID8gKGVudHJ5LnBhcmFtZXRlcnMuc3RhdGlvbiArICcgKCcgKyBlbnRyeS51b20gKyAnICcgKyBlbnRyeS5wYXJhbWV0ZXJzLnBoZW5vbWVub24gKyAnKScpIDogZW50cnkudW9tKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcueWF4aXNUZXh0TGFiZWwnKVxuICAgICAgICAgICAgICAgIC5jYWxsKHRoaXMud3JhcFRleHQsIChheGlzLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0IC0gMTApLCB0aGlzLmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICBjb25zdCBheGlzV2lkdGggPSBheGlzLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyAxMCArIHRoaXMuZ2V0RGltZW5zaW9ucyh0ZXh0Lm5vZGUoKSkuaDtcbiAgICAgICAgICAgIC8vIGlmIHlBeGlzIHNob3VsZCBub3QgYmUgdmlzaWJsZSwgYnVmZmVyIHdpbGwgYmUgc2V0IHRvIDBcbiAgICAgICAgICAgIGJ1ZmZlciA9IChzaG93QXhpcyA/IGVudHJ5Lm9mZnNldCArIChheGlzV2lkdGggPCB0aGlzLm1hcmdpbi5sZWZ0ID8gdGhpcy5tYXJnaW4ubGVmdCA6IGF4aXNXaWR0aCkgOiAwKTtcbiAgICAgICAgICAgIGNvbnN0IGF4aXNXaWR0aERpdiA9IChheGlzV2lkdGggPCB0aGlzLm1hcmdpbi5sZWZ0ID8gdGhpcy5tYXJnaW4ubGVmdCA6IGF4aXNXaWR0aCk7XG5cbiAgICAgICAgICAgIGlmICghZW50cnkuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBheGlzLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGJ1ZmZlciArICcsIDApJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGF4aXNXaWR0aERpdiAtIHRoaXMubWFyZ2luLmxlZnQ7XG4gICAgICAgICAgICAgICAgYXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBidWZmZXIgKyAnLCAwKScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdGV4dE9mZiA9IC0gKHRoaXMuYnVmZmVyU3VtKTtcbiAgICAgICAgICAgIGlmIChlbnRyeS5maXJzdCkge1xuICAgICAgICAgICAgICAgIHRleHRPZmYgPSB0aGlzLm1hcmdpbi5sZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dC5hdHRyKCd5JywgMCAtIHRleHRPZmYpO1xuXG4gICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0V2lkdGggPSB0ZXh0Lm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XG4gICAgICAgICAgICAgICAgbGV0IHRleHRIZWlnaHQgPSB0ZXh0Lm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0UG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRleHQubm9kZSgpLmdldEJCb3goKS54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0ZXh0Lm5vZGUoKS5nZXRCQm94KCkueVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IGF4aXNyYWRpdXMgPSA0O1xuICAgICAgICAgICAgICAgIGxldCBzdGFydE9mUG9pbnRzID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0ZXh0UG9zaXRpb24ueSArIHRleHRIZWlnaHQgLyAyICsgYXhpc3JhZGl1cyAvIDIsIC8vICsgMiBiZWNhdXNlIHJhZGl1cyA9PT0gNFxuICAgICAgICAgICAgICAgICAgICB5OiBNYXRoLmFicyh0ZXh0UG9zaXRpb24ueCArIHRleHRXaWR0aCkgLSBheGlzcmFkaXVzICogMlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50T2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuaWRzLmZvckVhY2goKGVudHJ5SUQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhZW50cnkgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKGVsID0+IGVsLmludGVybmFsSWQgPT09IGVudHJ5SUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpc0RvdHMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAnYXhpc2RvdC0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBkYXRhZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBzdGFydE9mUG9pbnRzLngpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIHN0YXJ0T2ZQb2ludHMueSAtIHBvaW50T2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGF4aXNyYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50T2Zmc2V0ICs9IGF4aXNyYWRpdXMgKiAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YWVudHJ5ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZChlbCA9PiBlbC5pbnRlcm5hbElkID09PSBlbnRyeS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzRG90cycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2F4aXNkb3QtJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBkYXRhZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBkYXRhZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4Jywgc3RhcnRPZlBvaW50cy54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIHN0YXJ0T2ZQb2ludHMueSAtIHBvaW50T2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgYXhpc3JhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCBpZCB0byB1b20sIGlmIGdyb3VwIHlheGlzIGlzIHRvZ2dsZWQsIGVsc2Ugc2V0IGlkIHRvIGRhdGFzZXQgaWRcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nID0gKGVudHJ5LmlkID8gZW50cnkuaWQgOiBlbnRyeS51b20pO1xuICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3RvcihpZCwgZW50cnkudW9tKTtcblxuICAgICAgICAgICAgY29uc3QgYXhpc0RpdiA9IHRoaXMuZ3JhcGguYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAvLyAuYXR0cignaWQnLCAneWF4aXMnICsgaWQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXNEaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGF4aXNXaWR0aERpdilcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnZ3JleScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAodGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZCA/IHRoaXMub3BhYy5jbGljayA6IHRoaXMub3BhYy5kZWZhdWx0KSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkLCBpLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuaG92ZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkLCBpLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIHRoaXMub3BhYy5jbGljayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignbW91c2V1cCcsIChkLCBpLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIHRoaXMub3BhYy5jbGljayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZCA9ICF0aGlzLnlBeGlzU2VsZWN0W2lkXS5jbGlja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRyeUFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlBcnJheS5wdXNoKGVudHJ5LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5QXJyYXkgPSBlbnRyeS5pZHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRMaW5lKGVudHJ5QXJyYXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWVudHJ5LmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgYXhpc0RpdlxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5Lm9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXhpc0RpdlxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIDAgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXhMYWJlbHdpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IHRoZSB5IGdyaWQgbGluZXNcbiAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb20ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKVxuICAgICAgICAgICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tzKDUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy53aWR0aCArIGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgICB5U2NhbGVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIG9iamVjdCB5QXhpc1NlbGVjdCBleGlzdHMgd2l0aCBzZWxlY3RlZCB1b20uXG4gICAgICogSWYgaXQgZG9lcyBub3QgZXhpc3QsIGl0IHdpbGwgYmUgY3JlYXRlZC5cbiAgICAgKiBAcGFyYW0gaWRlbnRpZmllciB7U3RyaW5nfSBTdHJpbmcgcHJvdmlkaW5nIHRoZSBzZWxlY3RlZCB1b20gb3IgdGhlIHNlbGVjdGVkIGRhdGFzZXQgSUQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja1lzZWxlY3RvcihpZGVudGlmaWVyOiBzdHJpbmcsIHVvbTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3QgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RvcjogWUF4aXNTZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICBpZDogaWRlbnRpZmllcixcbiAgICAgICAgICAgIGlkczogKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCA/IHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzIDogW10pLFxuICAgICAgICAgICAgdW9tOiB1b20sXG4gICAgICAgICAgICBjbGlja2VkOiAodGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkID8gdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkIDogZmFsc2UpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXSA9IHNlbGVjdG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGFkYXB0IHkgYXhpcyBoaWdobGlnaHRpbmcgdG8gc2VsZWN0ZWQgVFMgb3Igc2VsZWN0ZWQgdW9tXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VZc2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBsZXQgZ3JvdXBMaXN0ID0ge307XG4gICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcykge1xuICAgICAgICAgICAgICAgIC8vIGJlZm9yZTogZ3JvdXBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy55QXhpc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSB0aGlzLnlBeGlzU2VsZWN0W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuaWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5pZHMuZm9yRWFjaCgoaWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFFbCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pbnRlcm5hbElkID09PSBpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdTZWxlY3RvcjogWUF4aXNTZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IFtpZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiBkYXRhRWwuYXhpc09wdGlvbnMudW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtpZF0gPSBuZXdTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwuY2xpY2tlZCAmJiBlbC51b20gIT09IGVsLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFFbCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pbnRlcm5hbElkID09PSBlbC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1NlbGVjdG9yOiBZQXhpc1NlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGVsLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IFtlbC5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogZGF0YUVsLmF4aXNPcHRpb25zLnVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W2VsLmlkXSA9IG5ld1NlbGVjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmU6IG5vIGdyb3VwXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMueUF4aXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gdGhpcy55QXhpc1NlbGVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFFbCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pbnRlcm5hbElkID09PSBlbC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uSUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUVsICYmIGRhdGFFbC5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uIGlzIGRhdGFzZXQgd2l0aCBpbnRlcm5hbElkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uSUQgPSBkYXRhRWwuaW50ZXJuYWxJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uIGlzIHVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbklEID0gZWwudW9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFncm91cExpc3Rbc2VsZWN0aW9uSURdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVb206IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogc2VsZWN0aW9uSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1b206IGVsLnVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W3NlbGVjdGlvbklEXSA9IGN1cnJlbnRVb207XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W3NlbGVjdGlvbklEXS5pZHMucHVzaChlbC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC51b20gPT09IHNlbGVjdGlvbklEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBmb3IgZ3JvdXBlZCB1b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBlZERhdGFzZXRzID0gdGhpcy5jb3VudEdyb3VwZWREYXRhc2V0cyhzZWxlY3Rpb25JRCwgZWwudW9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBMaXN0W3NlbGVjdGlvbklEXS5pZHMubGVuZ3RoID09PSBncm91cGVkRGF0YXNldHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W3NlbGVjdGlvbklEXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlIGZvciB1bmdyb3VwZWQgZGF0YXNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0ID0ge307IC8vIHVuc2VsZWN0IGFsbCAtIHkgYXhpc1xuICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdCA9IGdyb3VwTGlzdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9sZEdyb3VwWWF4aXMgPSB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhbW91bnQgb2YgZGF0YXNldHMgdGhhdCBhcmUgZ3JvdXBlZCB3aXRoIHRoZSBzYW1lIHVvbVxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gdW9tXG4gICAgICogQHBhcmFtIGlkIHtTdHJpbmd9IGludGVybmFsSWQgb2YgdGhlIGRhdGFzZXQgdGhhdCBjYW4gYmUgc2tpcHBlZFxuICAgICAqIHJldHVybnMge051bWJlcn0gYW1vdW50IG9mIGRhdGFzZXRzIHdpdGggdGhlIGdpdmVuIHVvbVxuICAgICAqL1xuICAgIHByaXZhdGUgY291bnRHcm91cGVkRGF0YXNldHModW9tOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgYXJyYXlVb21Db3VudCA9IDA7XG4gICAgICAgIHRoaXMuZGF0YVlyYW5nZXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgIT09IG51bGwgJiYgZWwudW9tID09PSB1b20gJiYgZWwuaWQgIT09IGlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleChkcyA9PiBkcy5pbnRlcm5hbElkID09PSBlbC5pZCAmJiBkcy5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzID09PSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7IGFycmF5VW9tQ291bnQrKzsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycmF5VW9tQ291bnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2V0IHNlbGVjdGVkIElkcyB0aGF0IHNob3VsZCBiZSBoaWdobGlnaHRlZC5cbiAgICAgKiBAcGFyYW0gaWRzIHtBcnJheX0gQXJyYXkgb2YgU3RyaW5ncyBjb250YWluaW5nIHRoZSBJZHMuXG4gICAgICogQHBhcmFtIHVvbSB7U3RyaW5nfSBTdHJpbmcgd2l0aCB0aGUgdW9tIGZvciB0aGUgc2VsZWN0ZWQgSWRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRMaW5lKGlkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgbGV0IGNoYW5nZUZhbHNlOiBIaWdobGlnaHREYXRhc2V0W10gPSBbXTtcbiAgICAgICAgbGV0IGNoYW5nZVRydWU6IEhpZ2hsaWdodERhdGFzZXRbXSA9IFtdO1xuICAgICAgICBpZHMuZm9yRWFjaCgoSUQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKElEKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlRmFsc2UucHVzaCh7IGlkOiBJRCwgY2hhbmdlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoYW5nZVRydWUucHVzaCh7IGlkOiBJRCwgY2hhbmdlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaWRzLmxlbmd0aCA9PT0gY2hhbmdlRmFsc2UubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSWRzKGNoYW5nZUZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0ZWRJZHMoY2hhbmdlVHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHN0YXRlIG9mIHNlbGVjdGVkIElkcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZVNlbGVjdGVkSWRzKHRvSGlnaGxpZ2h0RGF0YXNldDogSGlnaGxpZ2h0RGF0YXNldFtdLCBjaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZSkge1xuICAgICAgICAgICAgdG9IaWdobGlnaHREYXRhc2V0LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWRJZChvYmouaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLnNwbGljZSh0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeSA9PT0gb2JqLmlkKSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvSGlnaGxpZ2h0RGF0YXNldC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihvYmouaWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkSWQob2JqLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGFzZXRJZHMucHVzaChvYmouaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkRhdGFzZXRTZWxlY3RlZC5lbWl0KHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzKTtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHRoZSBncmFwaCBsaW5lIGZvciBlYWNoIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIGEgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZHJhd0dyYXBoTGluZShlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc3QgZ2V0WWF4aXNSYW5nZSA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZCgob2JqKSA9PiBvYmouaWRzLmluZGV4T2YoZW50cnkuaW50ZXJuYWxJZCkgPiAtMSk7XG4gICAgICAgIC8vIGNoZWNrIGZvciB5IGF4aXMgZ3JvdXBpbmdcbiAgICAgICAgbGV0IGdldFlheGlzUmFuZ2UgPSB0aGlzLmdldFlheGlzUmFuZ2UoZW50cnkpO1xuXG4gICAgICAgIGlmIChlbnRyeS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChnZXRZYXhpc1JhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgeVNjYWxlQmFzZSA9IGdldFlheGlzUmFuZ2UueVNjYWxlO1xuXG4gICAgICAgICAgICAgICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYm9keSB0byBjbGlwIGdyYXBoXG4gICAgICAgICAgICAgICAgLy8gdW5pcXVlIElEIGdlbmVyYXRlZCB0aHJvdWdoIHRoZSBjdXJyZW50IHRpbWUgKGN1cnJlbnQgdGltZSB3aGVuIGluaXRpYWxpemVkKVxuICAgICAgICAgICAgICAgIGxldCBxdWVyeVNlbGVjdG9yQ2xpcCA9ICdjbGlwJyArIHRoaXMuY3VycmVudFRpbWVJZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhcGhcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOmNsaXBQYXRoJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgcXVlcnlTZWxlY3RvckNsaXApXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoIC0gdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAvLyBkcmF3IGdyYWggbGluZVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhcGhCb2R5ID0gdGhpcy5ncmFwaFxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoIycgKyBxdWVyeVNlbGVjdG9yQ2xpcCArICcpJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgZ3JhcGggbGluZVxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5jcmVhdGVMaW5lKHRoaXMueFNjYWxlQmFzZSwgeVNjYWxlQmFzZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoQm9keVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5kYXR1bShlbnRyeS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCBlbnRyeS5saW5lcy5saW5lV2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoQm9keS5zZWxlY3RBbGwoJy5ncmFwaERvdHMnKVxuICAgICAgICAgICAgICAgICAgICAuZGF0YShlbnRyeS5kYXRhLmZpbHRlcigoZCkgPT4gIWlzTmFOKGQudmFsdWUpKSlcbiAgICAgICAgICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JhcGhEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGQ6IERhdGFFbnRyeSkgPT4gJ2RvdC0nICsgZC50aW1lc3RhbXAgKyAnLScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBsaW5lLngoKSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgbGluZS55KCkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgZW50cnkubGluZXMucG9pbnRSYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJTdHlsZSA9PT0gSG92ZXJpbmdTdHlsZS5wb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBvaW50SG92ZXJpbmcoZW50cnksIGxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgc2hvd3MgbGFiZWxpbmcgdmlhIG1vdXNtb3ZlLlxuICAgICAqL1xuICAgIHByaXZhdGUgbW91c2Vtb3ZlSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIHRoaXMubGFiZWxUaW1lc3RhbXAgPSBbXTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZCA9IFtdO1xuICAgICAgICB0aGlzLmRpc3RMYWJlbFhDb29yZCA9IFtdO1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSwgZW50cnlJZHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0SXRlbUZvclgoY29vcmRzWzBdICsgdGhpcy5idWZmZXJTdW0sIGVudHJ5LmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5zaG93RGlhZ3JhbUluZGljYXRvcihlbnRyeSwgaWR4LCBjb29yZHNbMF0sIGVudHJ5SWR4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG91dHB1dElkczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5oaWdobGlnaHRPdXRwdXQuaWRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRPdXRwdXQuaWRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRJZHMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dHB1dElkcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgLy8gZG8gbm90IHNob3cgbGluZSBpbiBncmFwaCB3aGVuIG5vIGRhdGEgYXZhaWxhYmxlIGZvciB0aW1lc3RhbXBcbiAgICAgICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxhc3QgPSAwLFxuICAgICAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBmaXJzdCA9IHRydWUsXG4gICAgICAgICAgICAgICAgbGFiZWxBcnJheTogW2QzLkJhc2VUeXBlLCBkMy5CYXNlVHlwZV1bXSA9IFtdLFxuICAgICAgICAgICAgICAgIHRleHRSZWN0QXJyYXk6IGQzLkJhc2VUeXBlW10gPSBkMy5zZWxlY3RBbGwoJy5mb2N1cy12aXNpYmlsaXR5Jykubm9kZXMoKTtcblxuICAgICAgICAgICAgLy8gZ2V0IGFuZCBzb3J0IGFsbCB0ZXh0IGxhYmVscyBhbmQgcmVjdGFuZ2xlIG9mIHRoZSB0ZXh0IGxhYmVscyBhbmQgY29tYmluZSByZWxhdGVkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRSZWN0QXJyYXkubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICBsYWJlbEFycmF5LnB1c2goW3RleHRSZWN0QXJyYXlbaV0sIHRleHRSZWN0QXJyYXlbaSArIDFdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzb3J5IGJ5IHkgY29vcmRpbmF0ZVxuICAgICAgICAgICAgbGFiZWxBcnJheS5zb3J0KChhLCBiKSA9PiBwYXJzZUZsb2F0KGQzLnNlbGVjdChhWzBdKS5hdHRyKCd5JykpIC0gcGFyc2VGbG9hdChkMy5zZWxlY3QoYlswXSkuYXR0cigneScpKSk7XG5cbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBpZiBvdmVybGFwcGluZ1xuICAgICAgICAgICAgbGFiZWxBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHBhaXJzIG9mIDIgb2JqZWN0cyAocmVjdGFuZ2xlIChlcXVhbCkgYW5kIGxhYmVsIChvZGQpKVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChlbFswXSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpLCBmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KGVsWzBdKS5hdHRyKCd2aXNpYmlsaXR5JykgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHljb29yZDogbnVtYmVyID0gcGFyc2VGbG9hdChkMy5zZWxlY3QoZWxbMF0pLmF0dHIoJ3knKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCAobGFzdCArIDMwKSAtIHljb29yZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPCAxMCkgeyBvZmZzZXQgPSAxMDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAnICsgb2Zmc2V0ICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAsIDApJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoZWxbMV0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCwgaSwgZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdChlbFsxXSkuYXR0cigndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5Y29vcmQ6IG51bWJlciA9IHBhcnNlRmxvYXQoZDMuc2VsZWN0KGVsWzBdKS5hdHRyKCd5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgKGxhc3QgKyAzMCkgLSB5Y29vcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMTApIHsgb2Zmc2V0ID0gMTA7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG9mZnNldCArIHljb29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAnICsgb2Zmc2V0ICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAsIDApJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkhpZ2hsaWdodENoYW5nZWQuZW1pdCh0aGlzLmhpZ2hsaWdodE91dHB1dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBoaWRlcyB0aGUgbGFiZWxpbmcgaW5zaWRlIHRoZSBncmFwaC5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlb3V0SGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5oaWRlRGlhZ3JhbUluZGljYXRvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHN0YXJ0aW5nIHRoZSBkcmFnIGhhbmRsaW5nIGZvciB0aGUgZGlhZ3JhbS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhblN0YXJ0SGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ01vdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnTW92ZVN0YXJ0ID0gZDMuZXZlbnQueDtcbiAgICAgICAgdGhpcy5kcmFnTW92ZVJhbmdlID0gW3RoaXMueEF4aXNSYW5nZS5mcm9tLCB0aGlzLnhBeGlzUmFuZ2UudG9dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY29udHJvbGxzIHRoZSBwYW5uaW5nIChkcmFnZ2luZykgb2YgdGhlIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFuTW92ZUhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ01vdmVTdGFydCAmJiB0aGlzLmRyYWdnaW5nTW92ZSkge1xuICAgICAgICAgICAgbGV0IGRpZmYgPSAtKGQzLmV2ZW50LnggLSB0aGlzLmRyYWdNb3ZlU3RhcnQpOyAvLyBkMy5ldmVudC5zdWJqZWN0LngpO1xuICAgICAgICAgICAgbGV0IGFtb3VudFRpbWVzdGFtcCA9IHRoaXMuZHJhZ01vdmVSYW5nZVsxXSAtIHRoaXMuZHJhZ01vdmVSYW5nZVswXTtcbiAgICAgICAgICAgIGxldCByYXRpb1RpbWVzdGFtcERpYWdDb29yZCA9IGFtb3VudFRpbWVzdGFtcCAvIHRoaXMud2lkdGg7XG4gICAgICAgICAgICBsZXQgbmV3VGltZU1pbiA9IHRoaXMuZHJhZ01vdmVSYW5nZVswXSArIChyYXRpb1RpbWVzdGFtcERpYWdDb29yZCAqIGRpZmYpO1xuICAgICAgICAgICAgbGV0IG5ld1RpbWVNYXggPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMV0gKyAocmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgKiBkaWZmKTtcblxuICAgICAgICAgICAgdGhpcy54QXhpc1JhbmdlUGFuID0gW25ld1RpbWVNaW4sIG5ld1RpbWVNYXhdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3BhbiA9IHsgZnJvbTogdGhpcy54QXhpc1JhbmdlUGFuWzBdLCB0bzogdGhpcy54QXhpc1JhbmdlUGFuWzFdIH07XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBlbmRzIHRoZSBkcmFnZ2luZyBjb250cm9sLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFuRW5kSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMueEF4aXNSYW5nZVBhbikge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKHRoaXMueEF4aXNSYW5nZVBhblswXSwgdGhpcy54QXhpc1JhbmdlUGFuWzFdKTtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdNb3ZlU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZ01vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZVBhbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHN0YXJ0cyB0aGUgem9vbSBoYW5kbGluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21TdGFydEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gZGVwZW5kZW50IG9uIHBvaW50IG9yIGxpbmUgaG92ZXJpbmdcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgdGhpcy54QXhpc1JhbmdlT3JpZ2luLnB1c2goW3RoaXMueEF4aXNSYW5nZS5mcm9tLCB0aGlzLnhBeGlzUmFuZ2UudG9dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGRyYXdzIGEgcmVjdGFuZ2xlIHdoZW4gem9vbSBpcyBzdGFydGVkIGFuZCB0aGUgbW91c2UgaXMgbW92aW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgem9vbUhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYXdEcmFnUmVjdGFuZ2xlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBlbmRzIHRoZSB6b29tIGhhbmRsaW5nIGFuZCBjYWxjdWxhdGVzIHRoZSB2aWEgem9vbSBzZWxlY3RlZCB0aW1lIGludGVydmFsLlxuICAgICAqL1xuICAgIHByaXZhdGUgem9vbUVuZEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQgfHwgIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnhBeGlzUmFuZ2VPcmlnaW5bMF0pIHtcbiAgICAgICAgICAgICAgICAvLyBiYWNrIHRvIG9yaWdpbiByYW5nZSAoZnJvbSAtIHRvKVxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2VPcmlnaW5bMF1bMF0sIHRoaXMueEF4aXNSYW5nZU9yaWdpblswXVsxXSk7XG4gICAgICAgICAgICAgICAgdGhpcy54QXhpc1JhbmdlT3JpZ2luID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB4RG9tYWluUmFuZ2U7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnRbMF0gPD0gdGhpcy5kcmFnQ3VycmVudFswXSkge1xuICAgICAgICAgICAgICAgIHhEb21haW5SYW5nZSA9IHRoaXMuZ2V0eERvbWFpbih0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHhEb21haW5SYW5nZSA9IHRoaXMuZ2V0eERvbWFpbih0aGlzLmRyYWdDdXJyZW50WzBdLCB0aGlzLmRyYWdTdGFydFswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhBeGlzUmFuZ2UgPSB7IGZyb206IHhEb21haW5SYW5nZVswXSwgdG86IHhEb21haW5SYW5nZVsxXSB9O1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKHRoaXMueEF4aXNSYW5nZS5mcm9tLCB0aGlzLnhBeGlzUmFuZ2UudG8pO1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdTdGFydCA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNldERyYWcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmUoeFNjYWxlQmFzZTogZDMuU2NhbGVUaW1lPG51bWJlciwgbnVtYmVyPiwgeVNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+KSB7XG4gICAgICAgIHJldHVybiBkMy5saW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLmRlZmluZWQoKGQpID0+ICFpc05hTihkLnZhbHVlKSlcbiAgICAgICAgICAgIC54KChkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeERpYWdDb29yZCA9IHhTY2FsZUJhc2UoZC50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeERpYWdDb29yZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZC54RGlhZ0Nvb3JkID0geERpYWdDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC55KChkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeURpYWdDb29yZCA9IHlTY2FsZUJhc2UoZC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih5RGlhZ0Nvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnlEaWFnQ29vcmQgPSB5RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geURpYWdDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmN1cnZlKGQzLmN1cnZlTGluZWFyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlT3ZlclBvaW50SG92ZXJpbmcoZDogRGF0YUVudHJ5LCBlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpIHtcbiAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSB0aGlzLmRhdGFzZXRNYXAuZ2V0KGVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgbGV0IHJlY3RCYWNrID0gdGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICBpZiAoY29vcmRzWzBdID49IDAgJiYgY29vcmRzWzBdIDw9IHJlY3RCYWNrLndpZHRoICYmIGNvb3Jkc1sxXSA+PSAwICYmIGNvb3Jkc1sxXSA8PSByZWN0QmFjay5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAvLyBoaWdobGlnaHQgaG92ZXJlZCBkb3RcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpLmF0dHIoJ29wYWNpdHknLCAwLjgpLmF0dHIoJ3InLCAnOHB4Jyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3Quc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgdGV4dCBmb3IgaG92ZXJpbmcgbGFiZWxcbiAgICAgICAgICAgICAgICBsZXQgZG90TGFiZWwgPSB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoYCR7ZC52YWx1ZX0gJHtlbnRyeS5heGlzT3B0aW9ucy51b219ICR7bW9tZW50KGQudGltZXN0YW1wKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJyl9YClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlSG92ZXJEb3RMYWJlbCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdibGFjaycpO1xuICAgICAgICAgICAgICAgIGxldCBvbkxlZnRTaWRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBjb29yZHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgb25MZWZ0U2lkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZWN0WDogbnVtYmVyID0gZC54RGlhZ0Nvb3JkICsgMTU7XG4gICAgICAgICAgICAgICAgbGV0IHJlY3RZOiBudW1iZXIgPSBkLnlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgbGV0IHJlY3RXOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS53ICsgODtcbiAgICAgICAgICAgICAgICBsZXQgcmVjdEg6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLmg7IC8vICsgNDtcbiAgICAgICAgICAgICAgICBpZiAoIW9uTGVmdFNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFggPSBkLnhEaWFnQ29vcmQgLSAxNSAtIHJlY3RXO1xuICAgICAgICAgICAgICAgICAgICByZWN0WSA9IGQueURpYWdDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChjb29yZHNbMV0gKyByZWN0SCArIDQpID4gdGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gbGFiZWwgYmVsb3cgeCBheGlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUcmFuc2xhdGUgbGFiZWwgdG8gYSBoaWdoZXIgcGxhY2UuIC0gbm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgaG92ZXJpbmcgbGFiZWxcbiAgICAgICAgICAgICAgICBsZXQgZG90UmVjdGFuZ2xlID0gdGhpcy5oaWdobGlnaHRSZWN0XG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZUhvdmVyRG90UmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbC1vcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAnMXB4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgcmVjdFcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCByZWN0SClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHJlY3RYICsgJywgJyArIHJlY3RZICsgJyknKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSBkLnhEaWFnQ29vcmQgKyA0ICsgMTU7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWTogbnVtYmVyID0gZC55RGlhZ0Nvb3JkICsgdGhpcy5nZXREaW1lbnNpb25zKGRvdFJlY3RhbmdsZS5ub2RlKCkpLmggLSA0O1xuICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbFggPSBkLnhEaWFnQ29vcmQgLSByZWN0VyArIDQgLSAxNTtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxZID0gZC55RGlhZ0Nvb3JkICsgdGhpcy5nZXREaW1lbnNpb25zKGRvdFJlY3RhbmdsZS5ub2RlKCkpLmggLSA0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGxhYmVsWCArICcsICcgKyBsYWJlbFkgKyAnKScpO1xuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIG91dHB1dCBvZiBoaWdobGlnaHRlZCBkYXRhXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZC50aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgIGlkczogbmV3IE1hcCgpLnNldChlbnRyeS5pbnRlcm5hbElkLCB7IHRpbWVzdGFtcDogZC50aW1lc3RhbXAsIHZhbHVlOiBkLnZhbHVlIH0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlnaGxpZ2h0Q2hhbmdlZC5lbWl0KHRoaXMuaGlnaGxpZ2h0T3V0cHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW91c2VPdXRQb2ludEhvdmVyaW5nKGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHVuaGlnaGxpZ2h0IGhvdmVyZWQgZG90XG4gICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgZW50cnkubGluZXMucG9pbnRSYWRpdXMpO1xuICAgICAgICAgICAgLy8gbWFrZSBsYWJlbCBpbnZpc2libGVcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRZYXhpc1JhbmdlKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSk6IFlSYW5nZXMge1xuICAgICAgICAvLyBjaGVjayBpZiBlbnRyeSBkYXRhc2V0IHNob3VsZCBiZSBzZXBhcmF0ZWQgb3IgZW50cnkgZGF0YXNldHMgc2hvdWxkIGJlIGdyb3VwZWRcbiAgICAgICAgaWYgKCFlbnRyeS5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzICYmICh0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgfHwgdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JqICE9PSBudWxsICYmIG9iai51b20gPT09IGVudHJ5LmF4aXNPcHRpb25zLnVvbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IC8vIHVvbSBkb2VzIGV4aXN0IGluIHRoaXMueVJhbmdlc0VhY2hVb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVlyYW5nZXMuZmluZCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiBvYmouaWQgPT09IGVudHJ5LmludGVybmFsSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSAvLyBpZCBkb2VzIGV4aXN0IGluIHRoaXMuZGF0YVlyYW5nZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB0aW1lc3RhbXAgb2YgcHJvdmlkZWQgeCBkaWFncmFtIGNvb3JkaW5hdGVzLlxuICAgICAqIEBwYXJhbSBzdGFydCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgbWluaW11bSBkaWFncmFtIGNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIGVuZCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgbWF4aW11bSBkaWFncmFtIGNvb3JkaW5hdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXR4RG9tYWluKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIGxldCBkb21NaW5BcnIgPSBbXTtcbiAgICAgICAgbGV0IGRvbU1heEFyciA9IFtdO1xuICAgICAgICBsZXQgZG9tTWluOiBudW1iZXI7XG4gICAgICAgIGxldCBkb21NYXg6IG51bWJlcjtcbiAgICAgICAgbGV0IHRtcDtcbiAgICAgICAgbGV0IGxvd2VzdE1pbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICAgICAgbGV0IGxvd2VzdE1heCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgICAgICBzdGFydCArPSB0aGlzLmJ1ZmZlclN1bTtcbiAgICAgICAgZW5kICs9IHRoaXMuYnVmZmVyU3VtO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBkb21NaW5BcnIucHVzaChlbnRyeS5kYXRhLmZpbmQoKGVsZW0sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLnhEaWFnQ29vcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0ueERpYWdDb29yZCA+PSBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5W2luZGV4XSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgZG9tTWF4QXJyLnB1c2goZW50cnkuZGF0YS5maW5kKChlbGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS54RGlhZ0Nvb3JkID49IGVuZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbaW5kZXhdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBkb21NaW5BcnIubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZG9tTWluQXJyW2ldICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBkb21NaW5BcnJbaV0ueERpYWdDb29yZDtcbiAgICAgICAgICAgICAgICBpZiAodG1wIDwgbG93ZXN0TWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvd2VzdE1pbiA9IHRtcDtcbiAgICAgICAgICAgICAgICAgICAgZG9tTWluID0gZG9tTWluQXJyW2ldLnRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gZG9tTWF4QXJyLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICAgICAgaWYgKGRvbU1heEFycltqXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gZG9tTWF4QXJyW2pdLnhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgaWYgKHRtcCA8IGxvd2VzdE1heCkge1xuICAgICAgICAgICAgICAgICAgICBsb3dlc3RNYXggPSB0bXA7XG4gICAgICAgICAgICAgICAgICAgIGRvbU1heCA9IGRvbU1heEFycltqXS50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZG9tTWluLCBkb21NYXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY29uZmlndXJhdGVzIGFuZCBkcmF3cyB0aGUgcmVjdGFuZ2xlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd0RyYWdSZWN0YW5nbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuZHJhZ0N1cnJlbnQgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcblxuICAgICAgICBjb25zdCB4MSA9IE1hdGgubWluKHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcbiAgICAgICAgY29uc3QgeDIgPSBNYXRoLm1heCh0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRyYWdSZWN0ICYmICF0aGlzLmRyYWdSZWN0Rykge1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0RyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIC4yKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdibHVlJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QgPSB0aGlzLmRyYWdSZWN0Ry5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHgyIC0geDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgeDEgKyB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZHJhZycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0LmF0dHIoJ3dpZHRoJywgeDIgLSB4MSlcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHgxICsgdGhpcy5idWZmZXJTdW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkaXNhYmxlcyB0aGUgZHJhd2luZyByZWN0YW5nbGUgY29udHJvbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc2V0RHJhZygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1JlY3RHKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0Ry5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtZXRhZGF0YSBvZiBhIHNwZWNpZmljIGVudHJ5IGluIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB4IHtOdW1iZXJ9IENvb3JkaW5hdGVzIG9mIHRoZSBtb3VzZSBpbnNpZGUgdGhlIGRpYWdyYW0uXG4gICAgICogQHBhcmFtIGRhdGEge0RhdGFFbnRyeX0gQXJyYXkgd2l0aCB0aGUgZGF0YSBvZiBlYWNoIGRhdGFzZXQgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRJdGVtRm9yWCh4OiBudW1iZXIsIGRhdGE6IERhdGFFbnRyeVtdKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnhTY2FsZUJhc2UuaW52ZXJ0KHgpO1xuICAgICAgICBjb25zdCBiaXNlY3REYXRlID0gZDMuYmlzZWN0b3IoKGQ6IERhdGFFbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRbMF07XG4gICAgICAgIH0pLmxlZnQ7XG4gICAgICAgIHJldHVybiBiaXNlY3REYXRlKGRhdGEsIGluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGRpc2FibGVzIHRoZSBsYWJlbGluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZGVEaWFncmFtSW5kaWNhdG9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuZm9jdXMtdmlzaWJpbGl0eScpXG4gICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGVuYWJsZXMgdGhlIGxhYmxlaW5nIG9mIGVhY2ggZGF0YXNldCBlbnRyeS5cbiAgICAgKiBAcGFyYW0gZW50cnkge0ludGVybmFsRGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gaWR4IHtOdW1iZXJ9IE51bWJlciB3aXRoIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGF0YXNldCBlbnRyeSBpbiB0aGUgZGF0YSBhcnJheS5cbiAgICAgKiBAcGFyYW0geENvb3JkTW91c2Uge051bWJlcn0gTnVtYmVyIG9mIHRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlLlxuICAgICAqIEBwYXJhbSBlbnRyeUlkeCB7TnVtYmVyfSBOdW1iZXIgb2YgdGhlIGluZGV4IG9mIHRoZSBlbnRyeS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dEaWFncmFtSW5kaWNhdG9yID0gKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSwgaWR4OiBudW1iZXIsIHhDb29yZE1vdXNlOiBudW1iZXIsIGVudHJ5SWR4OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgaXRlbTogRGF0YUVudHJ5ID0gZW50cnkuZGF0YVtpZHhdO1xuICAgICAgICB0aGlzLmxhYmVsWENvb3JkW2VudHJ5SWR4XSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzdExhYmVsWENvb3JkW2VudHJ5SWR4XSA9IG51bGw7XG5cbiAgICAgICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCAmJiBpdGVtLnlEaWFnQ29vcmQgJiYgaXRlbVsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgbGluZSB3aGVyZSBtb3VzZSBpc1xuICAgICAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgICAgLy8gc2hvdyBsYWJlbCBpZiBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZVxuICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCB0cnVlLCBlbnRyeUlkeCk7XG5cbiAgICAgICAgICAgIGxldCB4TW91c2VBbmRCdWZmZXIgPSB4Q29vcmRNb3VzZSArIHRoaXMuYnVmZmVyU3VtO1xuICAgICAgICAgICAgbGV0IGxhYmVsQnVmZmVyID0gKCh0aGlzLnRpbWVzcGFuLmZyb20gLyAodGhpcy50aW1lc3Bhbi50byAtIHRoaXMudGltZXNwYW4uZnJvbSkpICogMC4wMDAxKVxuICAgICAgICAgICAgICAgICogKCh0aGlzLnRpbWVzcGFuLmZyb20gLyAodGhpcy50aW1lc3Bhbi50byAtIHRoaXMudGltZXNwYW4uZnJvbSkpICogMC4wMDAxKTtcblxuICAgICAgICAgICAgbGFiZWxCdWZmZXIgPSBNYXRoLm1heCgxMCwgbGFiZWxCdWZmZXIpO1xuXG4gICAgICAgICAgICB0aGlzLnNob3dMYWJlbFZhbHVlcyhlbnRyeSwgaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnNob3dUaW1lSW5kaWNhdG9yTGFiZWwoaXRlbSwgZW50cnlJZHgsIHhNb3VzZUFuZEJ1ZmZlcik7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLnhEaWFnQ29vcmQgPj0gdGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bSB8fCB4TW91c2VBbmRCdWZmZXIgPCBpdGVtLnhEaWFnQ29vcmQgLSBsYWJlbEJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHhNb3VzZUFuZEJ1ZmZlciA8IGl0ZW0ueERpYWdDb29yZCkge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5kYXRhW2lkeCAtIDFdICYmIChNYXRoLmFicyhlbnRyeS5kYXRhW2lkeCAtIDFdLnhEaWFnQ29vcmQgLSB4TW91c2VBbmRCdWZmZXIpIDwgTWF0aC5hYnMoaXRlbS54RGlhZ0Nvb3JkIC0geE1vdXNlQW5kQnVmZmVyKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCBmYWxzZSwgZW50cnlJZHgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBzaG93IGNsb3Nlc3QgZWxlbWVudCB0byBtb3VzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMYWJlbFZhbHVlcyhlbnRyeSwgZW50cnkuZGF0YVtpZHggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVJbmRpY2F0b3JMYWJlbChlbnRyeS5kYXRhW2lkeCAtIDFdLCBlbnRyeUlkeCwgeE1vdXNlQW5kQnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCB0cnVlLCBlbnRyeUlkeCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGdyYXBoIHdpZHRoIGFuZCByYW5nZSBiZXR3ZWVuIGRhdGEgcG9pbnQgYW5kIG1vdXNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5kYXRhW2lkeCAtIDFdLnhEaWFnQ29vcmQgPj0gdGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkIDw9IHRoaXMuYnVmZmVyU3VtXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBlbnRyeS5kYXRhW2lkeCAtIDFdLnhEaWFnQ29vcmQgKyBsYWJlbEJ1ZmZlciA8IHhNb3VzZUFuZEJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCBmYWxzZSwgZW50cnlJZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogc2V0IGhvdmVyaW5nIGZvciBsYWJlbGJ1ZmZlciBhZnRlciBsYXN0IGFuZCBiZWZvcmUgZmlyc3QgdmFsdWUgb2YgdGhlIGdyYXBoXG4gICAgICAgICAgICAvLyBoaWRlIGxhYmVsIGlmIG5vIGRhdGEgYXZhaWxhYmxlIGZvciB0aW1lXG4gICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIGZhbHNlLCBlbnRyeUlkeCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjaGFuZ2UgdmlzaWJpbGl0eSBvZiBsYWJlbCBhbmQgd2hpdGUgcmVjdGFuZ2xlIGluc2lkZSBncmFwaCAobmV4dCB0byBtb3VzZS1jdXJzb3IgbGluZSkuXG4gICAgICogQHBhcmFtIGVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB2aXNpYmxlIHtCb29sZWFufSBCb29sZWFuIGdpdmluZyBpbmZvcm1hdGlvbiBhYm91dCB2aXNpYmlsaXR5IG9mIGEgbGFiZWwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaFZpc0xhYmVsKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSwgdmlzaWJsZTogYm9vbGVhbiwgZW50cnlJZHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFxuICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmb2N1cy12aXNpYmlsaXR5Jyk7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdFxuICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmb2N1cy12aXNpYmlsaXR5Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdFxuICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGltZXN0YW1wW2VudHJ5SWR4XSA9IG51bGw7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5oaWdobGlnaHRPdXRwdXQuaWRzW2VudHJ5LmludGVybmFsSWRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2hvdyB0aGUgbGFiZWxpbmcgaW5zaWRlIHRoZSBncmFwaC5cbiAgICAgKiBAcGFyYW0gZW50cnkge0RhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5nIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBpdGVtIHtEYXRhRW50cnl9IE9iamVjdCBvZiB0aGUgZW50cnkgaW4gdGhlIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93TGFiZWxWYWx1ZXMoZW50cnk6IEludGVybmFsRGF0YUVudHJ5LCBpdGVtOiBEYXRhRW50cnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlkID0gMTtcbiAgICAgICAgbGV0IG9uTGVmdFNpZGU6IGJvb2xlYW4gPSB0aGlzLmNoZWNrTGVmdFNpZGUoaXRlbS54RGlhZ0Nvb3JkKTtcbiAgICAgICAgaWYgKGVudHJ5LmZvY3VzTGFiZWwpIHtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWwudGV4dChpdGVtW2lkXSArIChlbnRyeS5heGlzT3B0aW9ucy51b20gPyBlbnRyeS5heGlzT3B0aW9ucy51b20gOiAnJykpO1xuICAgICAgICAgICAgY29uc3QgZW50cnlYOiBudW1iZXIgPSBvbkxlZnRTaWRlID9cbiAgICAgICAgICAgICAgICBpdGVtLnhEaWFnQ29vcmQgKyA0IDogaXRlbS54RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS53ICsgNDtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIGl0ZW0ueURpYWdDb29yZCk7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdFxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnlYKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgaXRlbS55RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS5oICsgMylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLncpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkuaCk7XG5cbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkc1tlbnRyeS5pbnRlcm5hbElkXSA9IHtcbiAgICAgICAgICAgICAgICAndGltZXN0YW1wJzogaXRlbVswXSxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiBpdGVtWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkc1tlbnRyeS5pbnRlcm5hbElkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNob3cgdGhlIHRpbWUgbGFiZWxpbmcgaW5zaWRlIHRoZSBncmFwaC5cbiAgICAgKiBAcGFyYW0gaXRlbSB7RGF0YUVudHJ5fSBPYmplY3Qgb2YgdGhlIGVudHJ5IGluIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBlbnRyeUlkeCB7TnVtYmVyfSBOdW1iZXIgb2YgdGhlIGluZGV4IG9mIHRoZSBlbnRyeS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dUaW1lSW5kaWNhdG9yTGFiZWwoaXRlbTogRGF0YUVudHJ5LCBlbnRyeUlkeDogbnVtYmVyLCBtb3VzZUNvb3JkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gdGltZXN0YW1wIGlzIHRoZSB0aW1lIHdoZXJlIHRoZSBtb3VzZS1jdXJzb3IgaXNcbiAgICAgICAgdGhpcy5sYWJlbFRpbWVzdGFtcFtlbnRyeUlkeF0gPSBpdGVtWzBdO1xuICAgICAgICB0aGlzLmxhYmVsWENvb3JkW2VudHJ5SWR4XSA9IGl0ZW0ueERpYWdDb29yZDtcbiAgICAgICAgdGhpcy5kaXN0TGFiZWxYQ29vcmRbZW50cnlJZHhdID0gTWF0aC5hYnMobW91c2VDb29yZCAtIGl0ZW0ueERpYWdDb29yZCk7XG4gICAgICAgIGxldCBtaW4gPSBkMy5taW4odGhpcy5kaXN0TGFiZWxYQ29vcmQpO1xuICAgICAgICBsZXQgaWR4T2ZNaW4gPSB0aGlzLmRpc3RMYWJlbFhDb29yZC5maW5kSW5kZXgoKGVsZW0pID0+IGVsZW0gPT09IG1pbik7XG4gICAgICAgIGxldCBvbkxlZnRTaWRlID0gdGhpcy5jaGVja0xlZnRTaWRlKGl0ZW0ueERpYWdDb29yZCk7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMubGFiZWxYQ29vcmRbaWR4T2ZNaW5dICsgMjtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmxhYmVsWENvb3JkW2lkeE9mTWluXSAtIHRoaXMuZ2V0RGltZW5zaW9ucyh0aGlzLmZvY3VzbGFiZWxUaW1lLm5vZGUoKSkudyAtIDI7XG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFRpbWUudGV4dChtb21lbnQodGhpcy5sYWJlbFRpbWVzdGFtcFtpZHhPZk1pbl0pLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKSk7XG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFRpbWVcbiAgICAgICAgICAgIC5hdHRyKCd4Jywgb25MZWZ0U2lkZSA/IHJpZ2h0IDogbGVmdClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMTMpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodEZvY3VzXG4gICAgICAgICAgICAuYXR0cigneDEnLCB0aGlzLmxhYmVsWENvb3JkW2lkeE9mTWluXSlcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIDApXG4gICAgICAgICAgICAuYXR0cigneDInLCB0aGlzLmxhYmVsWENvb3JkW2lkeE9mTWluXSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRPdXRwdXQudGltZXN0YW1wID0gdGhpcy5sYWJlbFRpbWVzdGFtcFtpZHhPZk1pbl07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gZ2l2aW5nIGluZm9ybWF0aW9uIGlmIHRoZSBtb3VzZSBpcyBvbiBsZWZ0IHNpZGUgb2YgdGhlIGRpYWdyYW0uXG4gICAgICogQHBhcmFtIGl0ZW1Db29yZCB7bnVtYmVyfSB4IGNvb3JkaW5hdGUgb2YgdGhlIHZhbHVlIChlLmcuIG1vdXNlKSB0byBiZSBjaGVja2VkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0xlZnRTaWRlKGl0ZW1Db29yZDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW0pIC8gMiA+IGl0ZW1Db29yZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gd3JhcCB0aGUgdGV4dCBmb3IgdGhlIHkgYXhpcyBsYWJlbC5cbiAgICAgKiBAcGFyYW0gdGV4dCB7YW55fSB5IGF4aXMgbGFiZWxcbiAgICAgKiBAcGFyYW0gd2lkdGgge051bWJlcn0gd2lkdGggb2YgdGhlIGF4aXMgd2hpY2ggbXVzdCBub3QgYmUgY3Jvc3NlZFxuICAgICAqIEBwYXJhbSB4cG9zaXRpb24ge051bWJlcn0gcG9zaXRpb24gdG8gY2VudGVyIHRoZSBsYWJlbCBpbiB0aGUgbWlkZGxlXG4gICAgICovXG4gICAgcHJpdmF0ZSB3cmFwVGV4dCh0ZXh0T2JqOiBhbnksIHdpZHRoOiBudW1iZXIsIHhwb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRleHRPYmouZWFjaChmdW5jdGlvbiAodTogYW55LCBpOiBudW1iZXIsIGQ6IE5vZGVMaXN0KSB7XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGQzLnNlbGVjdCh0aGlzKSxcbiAgICAgICAgICAgICAgICB3b3JkcyA9IHRleHQudGV4dCgpLnNwbGl0KC9cXHMrLykucmV2ZXJzZSgpLFxuICAgICAgICAgICAgICAgIHdvcmQsXG4gICAgICAgICAgICAgICAgbGluZSA9IFtdLFxuICAgICAgICAgICAgICAgIC8vIGxpbmVOdW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQgPSAoaSA9PT0gZC5sZW5ndGggLSAxID8gMC4zIDogMS4xKSwgLy8gZW1zXG4gICAgICAgICAgICAgICAgeSA9IHRleHQuYXR0cigneScpLFxuICAgICAgICAgICAgICAgIGR5ID0gcGFyc2VGbG9hdCh0ZXh0LmF0dHIoJ2R5JykpLFxuICAgICAgICAgICAgICAgIHRzcGFuID0gdGV4dC50ZXh0KG51bGwpLmFwcGVuZCgndHNwYW4nKS5hdHRyKCd4JywgMCAtIHhwb3NpdGlvbikuYXR0cigneScsIHkpLmF0dHIoJ2R5JywgZHkgKyAnZW0nKTtcbiAgICAgICAgICAgIHdoaWxlICh3b3JkID0gd29yZHMucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBsaW5lLnB1c2god29yZCk7XG4gICAgICAgICAgICAgICAgdHNwYW4udGV4dChsaW5lLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGU6IFNWR1RTcGFuRWxlbWVudCA9IDxTVkdUU3BhbkVsZW1lbnQ+dHNwYW4ubm9kZSgpO1xuICAgICAgICAgICAgICAgIGxldCBoYXNHcmVhdGVyV2lkdGg6IGJvb2xlYW4gPSBub2RlLmdldENvbXB1dGVkVGV4dExlbmd0aCgpID4gd2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0dyZWF0ZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0c3Bhbi50ZXh0KGxpbmUuam9pbignICcpKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IFt3b3JkXTtcbiAgICAgICAgICAgICAgICAgICAgdHNwYW4gPSB0ZXh0LmFwcGVuZCgndHNwYW4nKS5hdHRyKCd4JywgMCAtIHhwb3NpdGlvbikuYXR0cigneScsIHkpLmF0dHIoJ2R5JywgbGluZUhlaWdodCArIGR5ICsgJ2VtJykudGV4dCh3b3JkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYm91bmRpbmdzIG9mIGEgaHRtbCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBlbCB7T2JqZWN0fSBPYmplY3Qgb2YgdGhlIGh0bWwgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldERpbWVuc2lvbnMoZWw6IGFueSk6IHsgdzogbnVtYmVyLCBoOiBudW1iZXIgfSB7XG4gICAgICAgIGxldCB3ID0gMDtcbiAgICAgICAgbGV0IGggPSAwO1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5nZXRCQm94KCk7XG4gICAgICAgICAgICB3ID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgIGggPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogZ2V0RGltZW5zaW9ucygpICcgKyBlbCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3LFxuICAgICAgICAgICAgaFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIHV1aWQgZm9yIGEgZGlhZ3JhbVxuICAgICAqL1xuICAgIHByaXZhdGUgdXVpZHY0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnM0KCkgKyB0aGlzLnM0KCkgKyAnLScgKyB0aGlzLnM0KCkgKyAnLScgKyB0aGlzLnM0KCkgKyAnLScgKyB0aGlzLnM0KCkgKyAnLScgKyB0aGlzLnM0KCkgKyB0aGlzLnM0KCkgKyB0aGlzLnM0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZ2VuZXJhdGUgY29tcG9uZW50cyBvZiB0aGUgdXVpZCBmb3IgYSBkaWFncmFtXG4gICAgICovXG4gICAgcHJpdmF0ZSBzNCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBsb2dzIHRoZSBlcnJvciBpbiB0aGUgY29uc29sZS5cbiAgICAgKiBAcGFyYW0gZXJyb3Ige09iamVjdH0gT2JqZWN0IHdpdGggdGhlIGVycm9yLlxuICAgICAqL1xuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcjogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGVudW0gRDNBeGlzVHlwZSB7XG4gICAgRGlzdGFuY2UsXG4gICAgVGltZSxcbiAgICBUaWNrc1xufVxuIiwiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBMb2NhdGVkVGltZVZhbHVlRW50cnksXG4gICAgVGltZSxcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhcmVhLFxuICAgIGF4aXNCb3R0b20sXG4gICAgYXhpc0xlZnQsXG4gICAgYXhpc1JpZ2h0LFxuICAgIGF4aXNUb3AsXG4gICAgYmlzZWN0b3IsXG4gICAgY3VydmVMaW5lYXIsXG4gICAgZXh0ZW50LFxuICAgIGxpbmUsXG4gICAgbW91c2UsXG4gICAgU2NhbGVMaW5lYXIsXG4gICAgc2NhbGVMaW5lYXIsXG4gICAgc2VsZWN0LFxuICAgIHRpbWVGb3JtYXQsXG59IGZyb20gJ2QzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgRDNBeGlzVHlwZSB9IGZyb20gJy4uL21vZGVsL2QzLWF4aXMtdHlwZSc7XG5pbXBvcnQgeyBEM0dyYXBoT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2QzLWdyYXBoLW9wdGlvbnMnO1xuaW1wb3J0IHsgRDNTZWxlY3Rpb25SYW5nZSB9IGZyb20gJy4uL21vZGVsL2QzLXNlbGVjdGlvbi1yYW5nZSc7XG5cbmludGVyZmFjZSBEYXRhRW50cnkgZXh0ZW5kcyBMb2NhdGVkVGltZVZhbHVlRW50cnkge1xuICAgIGRpc3Q6IG51bWJlcjtcbiAgICB0aWNrOiBudW1iZXI7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB4RGlhZ0Nvb3JkPzogbnVtYmVyO1xuICAgIFtpZDogc3RyaW5nXTogYW55O1xufVxuXG5pbnRlcmZhY2UgRGF0YXNldENvbnN0ZWxsYXRpb24ge1xuICAgIGRhdGFzZXQ/OiBJRGF0YXNldDtcbiAgICBkYXRhPzogTG9jYXRlZFRpbWVWYWx1ZUVudHJ5W107XG4gICAgeVNjYWxlPzogU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIGRyYXdPcHRpb25zPzogRHJhd09wdGlvbnM7XG4gICAgZm9jdXNMYWJlbFJlY3Q/OiBhbnk7XG4gICAgZm9jdXNMYWJlbD86IGFueTtcbn1cblxuaW50ZXJmYWNlIERyYXdPcHRpb25zIHtcbiAgICB1b206IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZmlyc3Q6IGJvb2xlYW47XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLXRyYWplY3RvcnktZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2R0aHJlZT48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCV9LmQzIC5heGlzIGxpbmUsLmQzIC5heGlzIHBhdGh7ZmlsbDpub25lO3N0cm9rZTojMDAwfS5kMyB0ZXh0e2ZvbnQtc2l6ZToxNHB4fS5kMyAuZ3JhcGhBcmVhe2ZpbGw6I2IwYzRkZTtmaWxsLW9wYWNpdHk6Ljd9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5tYXAtaGlnaGxpZ2h0LWxhYmVse2ZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6Ljd9LmQzIC5tb3VzZS1mb2N1cy1saW5le3BvaW50ZXItZXZlbnRzOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2U6IzAwMH0uZDMgLm1vdXNlLWRyYWd7ZmlsbDpyZ2JhKDAsMCwyNTUsLjQpO3BvaW50ZXItZXZlbnRzOmFsbDtjdXJzb3I6bW92ZX1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEQzVHJhamVjdG9yeUdyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBEM0dyYXBoT3B0aW9ucz5cbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3Rpb246IEQzU2VsZWN0aW9uUmFuZ2U7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQ6IEV2ZW50RW1pdHRlcjxEM1NlbGVjdGlvblJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxEM1NlbGVjdGlvblJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkhvdmVySGlnaGxpZ2h0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2R0aHJlZScpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgZGF0YXNldE1hcDogTWFwPHN0cmluZywgRGF0YXNldENvbnN0ZWxsYXRpb24+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgcmF3U3ZnOiBhbnk7XG4gICAgcHJpdmF0ZSBncmFwaDogYW55O1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDQwXG4gICAgfTtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuICAgIHByaXZhdGUgbGluZUZ1bjogZDMuTGluZTxEYXRhRW50cnk+O1xuICAgIHByaXZhdGUgYXJlYTogZDMuQXJlYTxEYXRhRW50cnk+O1xuICAgIHByaXZhdGUgeFNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHByaXZhdGUgeVNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNsYWJlbFRpbWU6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzbGFiZWxZOiBhbnk7XG4gICAgcHJpdmF0ZSB5QXhpc0dlbjogZDMuQXhpczxudW1iZXIgfCB7IHZhbHVlT2YoKTogbnVtYmVyOyB9PjtcbiAgICBwcml2YXRlIGJhc2VWYWx1ZXM6IERhdGFFbnRyeVtdID0gW107XG4gICAgcHJpdmF0ZSBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRyYWdTdGFydDogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIGRyYWdDdXJyZW50OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ1JlY3Q6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0RzogYW55O1xuICAgIHByaXZhdGUgYnVmZmVyU3VtOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkYXRhTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRHcmFwaE9wdGlvbnM6IEQzR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBheGlzVHlwZTogRDNBeGlzVHlwZS5EaXN0YW5jZSxcbiAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNlcnZpY2UpO1xuICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMgPSB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmIChjaGFuZ2VzLnNlbGVjdGlvbiAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWxsRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IHNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1heExhYmVsd2lkdGgpICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLmxpbmVGdW4gPSBsaW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLnkodGhpcy5jYWxjWVZhbHVlKVxuICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmFyZWEgPSBhcmVhPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLnkwKHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLnkxKHRoaXMuY2FsY1lWYWx1ZSlcbiAgICAgICAgICAgIC5jdXJ2ZShjdXJ2ZUxpbmVhcik7XG5cbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgdGltZUludGVydmFsQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoZW50cnkuZGF0YXNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRNYXAuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgeyBkYXRhc2V0IH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShkYXRhc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0FsbERhdGEoKTtcbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBEM0dyYXBoT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgdGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGludGVybmFsSWQpLmRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVzcGFuICYmXG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhkYXRhc2V0LmludGVybmFsSWQpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aGlzLnRpbWVzcGFuLCAwLjIpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFRpbWVWYWx1ZUVudHJ5PihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbGl6ZTogb3B0aW9uLmdlbmVyYWxpemVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFMZW5ndGggPSByZXN1bHQudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmdldChkYXRhc2V0LmludGVybmFsSWQpLmRhdGEgPSByZXN1bHQudmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEYXRhRm9ySWQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0FsbERhdGEoKSB7XG4gICAgICAgIHRoaXMuYmFzZVZhbHVlcyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMuZm9yRWFjaCgoaWQpID0+IHRoaXMucHJvY2Vzc0RhdGFGb3JJZChpZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0RhdGFGb3JJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGludGVybmFsSWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXRFbnRyeSA9IHRoaXMuZGF0YXNldE1hcC5nZXQoaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEVudHJ5ID0gdGhpcy5iYXNlVmFsdWVzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGxldCBwcmV2aW91czogRGF0YUVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIGRhdGFzZXRFbnRyeS5kYXRhLmZvckVhY2goKGVsZW0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jcmVhdGVEYXRhRW50cnkoaW50ZXJuYWxJZCwgZWxlbSwgcHJldmlvdXMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSB0aGlzLnNlbGVjdGlvbi5mcm9tICYmIGlkeCA8PSB0aGlzLnNlbGVjdGlvbi50bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGVudHJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSB0aGlzLnNlbGVjdGlvbi5mcm9tICYmIGlkeCA8PSB0aGlzLnNlbGVjdGlvbi50bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhc2VWYWx1ZXNbaWR4IC0gdGhpcy5zZWxlY3Rpb24uZnJvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVzW2lkeCAtIHRoaXMuc2VsZWN0aW9uLmZyb21dW2ludGVybmFsSWRdID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iYXNlVmFsdWVzW2lkeF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZXNbaWR4XVtpbnRlcm5hbElkXSA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF0YUVudHJ5KFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGVudHJ5OiBMb2NhdGVkVGltZVZhbHVlRW50cnksXG4gICAgICAgIHByZXZpb3VzOiBEYXRhRW50cnksXG4gICAgICAgIGluZGV4OiBudW1iZXJcbiAgICApOiBEYXRhRW50cnkge1xuICAgICAgICBsZXQgZGlzdDogbnVtYmVyO1xuICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld2Rpc3QgPSB0aGlzLmRpc3RhbmNlQmV0d2VlbihcbiAgICAgICAgICAgICAgICBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5nZW9tZXRyeS5jb29yZGluYXRlc1swXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRpc3QgPSBwcmV2aW91cy5kaXN0ICsgTWF0aC5yb3VuZChuZXdkaXN0IC8gMTAwMCAqIDEwMDAwMCkgLyAxMDAwMDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXN0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGljazogaW5kZXgsXG4gICAgICAgICAgICBkaXN0OiBNYXRoLnJvdW5kKGRpc3QgKiAxMCkgLyAxMCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogZW50cnkudGltZXN0YW1wLFxuICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLFxuICAgICAgICAgICAgW2ludGVybmFsSWRdOiBlbnRyeS52YWx1ZSxcbiAgICAgICAgICAgIHg6IGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgeTogZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgICBnZW9tZXRyeTogZW50cnkuZ2VvbWV0cnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3RhbmNlQmV0d2VlbihsYXRpdHVkZTEsIGxvbmdpdHVkZTEsIGxhdGl0dWRlMiwgbG9uZ2l0dWRlMik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IFIgPSA2MzcxMDAwO1xuICAgICAgICBjb25zdCByYWQgPSBNYXRoLlBJIC8gMTgwO1xuICAgICAgICBjb25zdCBsYXQxID0gbGF0aXR1ZGUxICogcmFkO1xuICAgICAgICBjb25zdCBsYXQyID0gbGF0aXR1ZGUyICogcmFkO1xuICAgICAgICBjb25zdCBzaW5ETGF0ID0gTWF0aC5zaW4oKGxhdGl0dWRlMiAtIGxhdGl0dWRlMSkgKiByYWQgLyAyKTtcbiAgICAgICAgY29uc3Qgc2luRExvbiA9IE1hdGguc2luKChsb25naXR1ZGUyIC0gbG9uZ2l0dWRlMSkgKiByYWQgLyAyKTtcbiAgICAgICAgY29uc3QgYSA9IHNpbkRMYXQgKiBzaW5ETGF0ICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIHNpbkRMb24gKiBzaW5ETG9uO1xuICAgICAgICBjb25zdCBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgICAgICAgcmV0dXJuIFIgKiBjO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1lWYWx1ZSA9IChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMueVNjYWxlQmFzZShkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNYVmFsdWUgPSAoZDogRGF0YUVudHJ5LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgeERpYWdDb29yZCA9IHRoaXMueFNjYWxlQmFzZSh0aGlzLmdldFhWYWx1ZShkKSk7XG4gICAgICAgIGQueERpYWdDb29yZCA9IHhEaWFnQ29vcmQ7XG4gICAgICAgIHJldHVybiB4RGlhZ0Nvb3JkO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkuaGVpZ2h0LmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQgLSB0aGlzLm1heExhYmVsd2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYVmFsdWUoZGF0YTogRGF0YUVudHJ5KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGlzdDtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaW1lOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRpbWVzdGFtcDtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaWNrczpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aWNrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aWNrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3RG90cyh2YWx1ZXM6IERhdGFFbnRyeVtdLCB5U2NhbGU6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPiwgb3B0aW9uczogRHJhd09wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ncmFwaC5zZWxlY3RBbGwoJ2RvdCcpXG4gICAgICAgICAgICAuZGF0YSh2YWx1ZXMpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdyJywgMS41KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgdGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQ6IERhdGFFbnRyeSkgPT4geVNjYWxlKGRbb3B0aW9ucy5pZF0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdWYWx1ZUxpbmUodmFsdWVzOiBEYXRhRW50cnlbXSwgeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAuZGF0dW0odmFsdWVzKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAxKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgICAgIC54KHRoaXMuY2FsY1hWYWx1ZSlcbiAgICAgICAgICAgICAgICAueSgoZDogRGF0YUVudHJ5KSA9PiB5U2NhbGUoZFtvcHRpb25zLmlkXSkpXG4gICAgICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGgoeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuZG90dGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdEb3RzKHRoaXMuYmFzZVZhbHVlcywgeVNjYWxlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1ZhbHVlTGluZSh0aGlzLmJhc2VWYWx1ZXMsIHlTY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdMaW5lR3JhcGgoKSB7XG4gICAgICAgIGlmICghdGhpcy5iYXNlVmFsdWVzIHx8IHRoaXMuYmFzZVZhbHVlcy5sZW5ndGggPT09IDAgfHwgIXRoaXMuZ3JhcGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlV2lkdGgoKTtcblxuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyU3VtID0gMDtcblxuICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChkYXRhc2V0RW50cnksIGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5oYXMoaWQpICYmIGRhdGFzZXRFbnRyeS5kYXRhICYmIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgZGF0YXNldEVudHJ5LmRyYXdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFzZXRFbnRyeS5kYXRhc2V0LnVvbSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGFzZXRFbnRyeS5kYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4aXNSZXN1bHQgPSB0aGlzLmRyYXdZQXhpcyhkYXRhc2V0RW50cnkuZHJhd09wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U2NhbGVCYXNlID0gYXhpc1Jlc3VsdC55U2NhbGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSBheGlzUmVzdWx0LmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YXNldEVudHJ5LnlTY2FsZSA9IGF4aXNSZXN1bHQueVNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMueVNjYWxlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyByaWdodCBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy53aWR0aCArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGF4aXNSaWdodCh0aGlzLnlTY2FsZUJhc2UpLnRpY2tTaXplKDApLnRpY2tzKDApKTtcblxuICAgICAgICB0aGlzLmRyYXdYQXhpcyh0aGlzLmJ1ZmZlclN1bSk7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuaGFzKGlkKSAmJiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkudmlzaWJsZSAmJiBlbnRyeS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGgoZW50cnkueVNjYWxlLCBlbnRyeS5kcmF3T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoIC0gdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmZvY3VzJywgdGhpcy5tb3VzZW1vdmVIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dC5mb2N1cycsIHRoaXMubW91c2VvdXRIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24uZHJhZycsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmRyYWcnLCB0aGlzLmRyYWdIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZXVwLmRyYWcnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJyk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1saW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MScsICcwJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChlbnRyeSwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhpZCkgJiYgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLnZpc2libGUgJiYgZW50cnkuZGF0YSkge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC13ZWlnaHQnLCAnbGlnaHRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXgnKTtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsWSA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbC15Jyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYmFzZVZhbHVlcyB8fCB0aGlzLmJhc2VWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29vcmRzID0gbW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0SXRlbUZvclgoY29vcmRzWzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIHRoaXMuc2hvd0RpYWdyYW1JbmRpY2F0b3IoaWR4KTtcbiAgICAgICAgdGhpcy5vbkhvdmVySGlnaGxpZ2h0LmVtaXQodGhpcy5iYXNlVmFsdWVzW2lkeF0udGljayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZW91dEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZURpYWdyYW1JbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdTdGFydEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBtb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3RHJhZ1JlY3RhbmdsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ0VuZEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQgfHwgIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQuZW1pdCh7IGZyb206IDAsIHRvOiB0aGlzLmRhdGFMZW5ndGggfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdTdGFydFswXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICAgICAgY29uc3QgdG8gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ0N1cnJlbnRbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQuZW1pdCh0aGlzLnByZXBhcmVSYW5nZSh0aGlzLmJhc2VWYWx1ZXNbZnJvbV0udGljaywgdGhpcy5iYXNlVmFsdWVzW3RvXS50aWNrKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzZXREcmFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlUmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogRDNTZWxlY3Rpb25SYW5nZSB7XG4gICAgICAgIGlmIChmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICByZXR1cm4geyBmcm9tLCB0byB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGZyb206IHRvLCB0bzogZnJvbSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0RyYWdSZWN0YW5nbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kcmFnQ3VycmVudCA9IG1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuXG4gICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ1N0YXJ0WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIGNvbnN0IHRvID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdDdXJyZW50WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQodGhpcy5wcmVwYXJlUmFuZ2UodGhpcy5iYXNlVmFsdWVzW2Zyb21dLnRpY2ssIHRoaXMuYmFzZVZhbHVlc1t0b10udGljaykpO1xuXG4gICAgICAgIGNvbnN0IHgxID0gTWF0aC5taW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcblxuICAgICAgICBpZiAoIXRoaXMuZHJhZ1JlY3QgJiYgIXRoaXMuZHJhZ1JlY3RHKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdCA9IHRoaXMuZHJhZ1JlY3RHLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeDIgLSB4MSlcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1kcmFnJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgeDEgKyB0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0RHJhZygpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1JlY3RHKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0Ry5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlRGlhZ3JhbUluZGljYXRvcigpIHtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RGlhZ3JhbUluZGljYXRvciA9IChpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5iYXNlVmFsdWVzW2lkeF07XG4gICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1cy5hdHRyKCd4MScsIGl0ZW0ueERpYWdDb29yZClcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIDApXG4gICAgICAgICAgICAuYXR0cigneDInLCBpdGVtLnhEaWFnQ29vcmQpXG4gICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XG5cbiAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBpdGVtLnhEaWFnQ29vcmQpIHsgb25MZWZ0U2lkZSA9IHRydWU7IH1cblxuICAgICAgICB0aGlzLnNob3dMYWJlbFZhbHVlcyhpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW0sIG9uTGVmdFNpZGUpO1xuICAgICAgICB0aGlzLnNob3dCb3R0b21JbmRpY2F0b3JMYWJlbChpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dMYWJlbFZhbHVlcyhpdGVtOiBEYXRhRW50cnksIG9uTGVmdFNpZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmZvY3VzTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbC50ZXh0KGl0ZW1baWRdICsgKGVudHJ5LmRhdGFzZXQudW9tID8gZW50cnkuZGF0YXNldC51b20gOiAnJykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeVggPSBvbkxlZnRTaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLnc7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnlYKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBlbnRyeS55U2NhbGUoaXRlbVtpZF0pICsgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS5oIC0gMyk7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgZW50cnkueVNjYWxlKGl0ZW1baWRdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgb25MZWZ0U2lkZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lLnRleHQobW9tZW50KGl0ZW0udGltZXN0YW1wKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJykpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyBpdGVtLnhEaWFnQ29vcmQgKyAyIDogaXRlbS54RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuZm9jdXNsYWJlbFRpbWUubm9kZSgpKS53KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAxMyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Qm90dG9tSW5kaWNhdG9yTGFiZWwoaXRlbTogRGF0YUVudHJ5LCBvbkxlZnRTaWRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNsYWJlbFkudGV4dChpdGVtLmRpc3QgKyAnIGttJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSA9PT0gRDNBeGlzVHlwZS5UaWNrcykge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2xhYmVsWS50ZXh0KCdNZWFzdXJlbWVudDogJyArIGl0ZW0udGljayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsWVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpIC0gNSlcbiAgICAgICAgICAgIC5hdHRyKCd4Jywgb25MZWZ0U2lkZSA/IGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsWS5ub2RlKCkpLncpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KSB7XG4gICAgICAgIGxldCB3ID0gMDtcbiAgICAgICAgbGV0IGggPSAwO1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5nZXRCQm94KCk7XG4gICAgICAgICAgICB3ID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgIGggPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogZ2V0RGltZW5zaW9ucygpICcgKyBlbCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3LFxuICAgICAgICAgICAgaFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbUZvclgoeDogbnVtYmVyLCBkYXRhOiBEYXRhRW50cnlbXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMueFNjYWxlQmFzZS5pbnZlcnQoeCk7XG4gICAgICAgIGNvbnN0IGJpc2VjdERhdGUgPSBiaXNlY3RvcigoZDogRGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGlzdDtcbiAgICAgICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaWNrczpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC50aWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5sZWZ0O1xuICAgICAgICByZXR1cm4gYmlzZWN0RGF0ZSh0aGlzLmJhc2VWYWx1ZXMsIGluZGV4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdZQXhpcyhvcHRpb25zOiBEcmF3T3B0aW9ucyk6IGFueSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZXh0ZW50PERhdGFFbnRyeSwgbnVtYmVyPih0aGlzLmJhc2VWYWx1ZXMsIChkYXR1bSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0dW1bb3B0aW9ucy5pZF07IC8vIGhlcmUgd2l0aCBJRFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmFuZ2VPZmZzZXQgPSAocmFuZ2VbMV0gLSByYW5nZVswXSkgKiAwLjEwO1xuICAgICAgICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFtyYW5nZVswXSAtIHJhbmdlT2Zmc2V0LCByYW5nZVsxXSArIHJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgICAgICB0aGlzLnlBeGlzR2VuID0gYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCBheGlzID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwodGhpcy55QXhpc0dlbik7XG5cbiAgICAgICAgLy8gZHJhdyB5IGF4aXMgbGFiZWxcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJzFlbScpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy51b20pO1xuXG4gICAgICAgIGNvbnN0IGF4aXNXaWR0aCA9IGF4aXMubm9kZSgpLmdldEJCb3goKS53aWR0aCArIDUgKyB0aGlzLmdldERpbWVuc2lvbnModGV4dC5ub2RlKCkpLmg7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IG9wdGlvbnMub2Zmc2V0ICsgKGF4aXNXaWR0aCA8IDMwID8gMzAgOiBheGlzV2lkdGgpO1xuICAgICAgICBpZiAoIW9wdGlvbnMuZmlyc3QpIHtcbiAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHRPZmZzZXQgPSAhb3B0aW9ucy5maXJzdCA/IGJ1ZmZlciA6IG9wdGlvbnMub2Zmc2V0O1xuICAgICAgICB0ZXh0LmF0dHIoJ3knLCAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWF4TGFiZWx3aWR0aCArIHRleHRPZmZzZXQpXG4gICAgICAgICAgICAuYXR0cigneCcsIDAgLSAodGhpcy5oZWlnaHQgLyAyKSk7XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeSBncmlkIGxpbmVzIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgZGF0YXNldFxuICAgICAgICBpZiAodGhpcy5kYXRhc2V0SWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoYXhpc0xlZnQoeVNjYWxlKVxuICAgICAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICAgIHlTY2FsZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1hBeGlzKGJ1ZmZlcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueFNjYWxlQmFzZSA9IHNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4odGhpcy5nZXRYRG9tYWluKHRoaXMuYmFzZVZhbHVlcykpXG4gICAgICAgICAgICAucmFuZ2UoW2J1ZmZlciwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGNvbnN0IHhBeGlzR2VuID0gYXhpc0JvdHRvbSh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuVGltZSkge1xuICAgICAgICAgICAgeEF4aXNHZW4udGlja0Zvcm1hdCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lRm9ybWF0KCclZC4lbS4lWSAlSDolTTolUycpKG5ldyBEYXRlKGQudmFsdWVPZigpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeCBheGlzXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHRoaXMuaGVpZ2h0ICsgJyknKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNHZW4pO1xuXG4gICAgICAgIC8vIGRyYXcgdGhlIHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbChheGlzQm90dG9tKHRoaXMueFNjYWxlQmFzZSlcbiAgICAgICAgICAgICAgICAudGlja3MoMTApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gZHJhdyB1cHBlciBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuY2FsbChheGlzVG9wKHRoaXMueFNjYWxlQmFzZSkudGlja3MoMCkudGlja1NpemUoMCkpO1xuXG4gICAgICAgIC8vIHRleHQgbGFiZWwgZm9yIHRoZSB4IGF4aXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAodGhpcy53aWR0aCArIGJ1ZmZlcikgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAudGV4dCh0aGlzLmdldFhBeGlzTGFiZWwoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYRG9tYWluKHZhbHVlczogRGF0YUVudHJ5W10pIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3ZhbHVlc1swXS5kaXN0LCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLmRpc3RdO1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpbWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZXNbMF0udGltZXN0YW1wLCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLnRpbWVzdGFtcF07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbdmFsdWVzWzBdLnRpY2ssIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0udGlja107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFhBeGlzTGFiZWwoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEaXN0YW5jZSc7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RpbWUnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RpY2tzJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSwgRGF0YXNldEFwaUludGVyZmFjZSwgRGF0YXNldE9wdGlvbnMsIEludGVybmFsSWRIYW5kbGVyLCBNaW5NYXhSYW5nZSwgVGltZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBleHRlbnQgfSBmcm9tICdkMyc7XG5cbmltcG9ydCB7XG4gIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICBEYXRhRW50cnksXG4gIEludGVybmFsRGF0YUVudHJ5LFxufSBmcm9tICcuLi9kMy10aW1lc2VyaWVzLWdyYXBoL2QzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEFkZGl0aW9uYWwgRGF0YSB3aGljaCBjYW4gYmUgYWRkIHRvIHRoZSBjb21wb25lbnQge0BsaW5rIEV4dGVuZGVkRGF0YUQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50fSBhcyBJbnB1dC5cbiAqIE9uZSBvZiB0aGUgb3B0aW9uYWwgcHJvcGVydGllcyAnbGlua2VkRGF0YXNldElkJyBhbmQgJ3lheGlzTGFiZWwnIGlzIG1hbmRhdG9yeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZGRpdGlvbmFsRGF0YSB7XG4gIC8qKlxuICAgKiBMaW5rZWQgdG8gYW4gZXhpc3RpbmcgZGF0YXNldCBpbiB0aGUgZ3JhcGggY29tcG9uZW50IGFuZCB1c2VzIGl0IGRhdGFzZXQgb3B0aW9ucyBpZiBubyBvdGhlciBkYXRhc2V0b3B0aW9ucyBhcmUgcHJlc2VudGVkLlxuICAgKi9cbiAgbGlua2VkRGF0YXNldElkPzogc3RyaW5nO1xuICAvKipcbiAgICogWS1BeGlzIGxhYmVsIGlmIG5vIGxpbmsgdG8gYW4gZXhpc3RpbmcgZGF0YXNldCBpcyBnaXZlbi5cbiAgICovXG4gIHlheGlzTGFiZWw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZGF0YXNldCBvcHRpb25zLCB3aGljaCBkZXNjcmliZXMgdGhlIHN0eWxpbmcgb2YgdGhlIGFkZGl0aW9uYWwgZGF0YS5cbiAgICovXG4gIGRhdGFzZXRPcHRpb25zPzogRGF0YXNldE9wdGlvbnM7XG4gIC8qKlxuICAgKiBUaGUgYWRkaXRpb25hbCBkYXRhIGFycmV5IHdpdGggdHVwZWxzIG9mIHRpbWVzdGFtcCBhbmQgdmFsdWUuXG4gICAqL1xuICBkYXRhOiBBZGRpdGlvbmFsRGF0YUVudHJ5W107XG59XG5cbi8qKlxuICogQWRkaXRpb25hbCBkYXRhIGVudHJ5IHR1cGxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRkaXRpb25hbERhdGFFbnRyeSB7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIEV4dGVuZHMgdGhlIGNvbW1vbiBkMyBjb21wb25lbnQsIHdpdGggdGhlIGFiaWxpdHkgdG8gYWRkIGFkZGl0aW9uYWwgZGF0YSB0byB0aGUgZ3JhcGguIFRvIHNldCBvciBjaGFuZ2UgIGFkZGl0aW9uYWwgZGF0YSwgYWxsd2F5cyBzZXRzIHRoZSBjb21wbGV0ZSBhcnJheSBvZiBkYXRhIG5ldy4gVGhlIGNvbXBvbmV0IGp1c3QgcmVkcmF3cyBpZlxuICogdGhlIGFycmF5IGlzIHJlc2V0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZDNcIiAjZDN0aW1lc2VyaWVzPjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLmdyYXBoRG90c3tzdHJva2Utd2lkdGg6MDtzdHJva2Utb3BhY2l0eToxfS5kMyAuZ3JhcGhEb3RzIC5ob3ZlcntzdHJva2Utd2lkdGg6MjBweDtzdHJva2Utb3BhY2l0eTouNX0uZDMgLmZvcm1lckJ1dHRvbiwuZDMgLmxhdGVyQnV0dG9ue2ZpbGw6Z3JleTtvcGFjaXR5Oi4zfS5kMyAuZm9ybWVyQnV0dG9uOmhvdmVyLC5kMyAubGF0ZXJCdXR0b246aG92ZXJ7b3BhY2l0eTouNn0uZDMgLmFycm93e3N0cm9rZTpncmV5O3N0cm9rZS13aWR0aDozcHh9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgZXh0ZW5kcyBEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGFkZGl0aW9uYWxEYXRhOiBBZGRpdGlvbmFsRGF0YVtdID0gW107XG5cbiAgcHJpdmF0ZSBhZGRpdGlvbmFsUHJlcGFyZWREYXRhOiBJbnRlcm5hbERhdGFFbnRyeVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgcHJvdGVjdGVkIHRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlOiBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0aW1lRm9ybWF0TG9jYWxlU2VydmljZSwgY29sb3JTZXJ2aWNlLCB0cmFuc2xhdGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgaWYgKGNoYW5nZXMuYWRkaXRpb25hbERhdGEgJiYgdGhpcy5hZGRpdGlvbmFsRGF0YSAmJiB0aGlzLmdyYXBoKSB7XG4gICAgICB0aGlzLmNsZWFyQWRkaXRpb25hbERhdGEoKTtcbiAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBsb3RHcmFwaCgpIHtcbiAgICB0aGlzLnByZXBhcmVBZGRpdGlvbmFsRGF0YSgpO1xuICAgIHN1cGVyLnBsb3RHcmFwaCgpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBpZiAodGhpcy5hZGRpdGlvbmFsRGF0YSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsb3RHcmFwaCgpLCAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyQWRkaXRpb25hbERhdGEoKSB7XG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGUuaWRzLmluZGV4T2YoZGF0YS5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7IGUuaWRzLnNwbGljZShpZHgsIDEpOyB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tKSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQuaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhID0gW107XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVBZGRpdGlvbmFsRGF0YSgpIHtcbiAgICBpZiAodGhpcy5hZGRpdGlvbmFsRGF0YSkge1xuICAgICAgdGhpcy5hZGRpdGlvbmFsRGF0YS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgaWYgKChlbnRyeS5saW5rZWREYXRhc2V0SWQgfHwgZW50cnkueWF4aXNMYWJlbCkgJiYgZW50cnkuZGF0YSkge1xuXG4gICAgICAgICAgaWYgKGVudHJ5LmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBlbnRyeS5kYXRhc2V0T3B0aW9ucyB8fCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChlbnRyeS5saW5rZWREYXRhc2V0SWQpO1xuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSB0aGlzLmRhdGFzZXRNYXAuZ2V0KGVudHJ5LmxpbmtlZERhdGFzZXRJZCk7XG4gICAgICAgICAgICBjb25zdCBwcmVwRGF0YUlkeCA9IHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5maW5kSW5kZXgoZSA9PiBlLmludGVybmFsSWQuc3RhcnRzV2l0aChlbnRyeS5saW5rZWREYXRhc2V0SWQpIHx8IGUuaW50ZXJuYWxJZCA9PT0gZW50cnkueWF4aXNMYWJlbCk7XG4gICAgICAgICAgICBsZXQgZGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeTtcbiAgICAgICAgICAgIGlmIChwcmVwRGF0YUlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IGVudHJ5LmxpbmtlZERhdGFzZXRJZCA/IGVudHJ5LmxpbmtlZERhdGFzZXRJZCArICdhZGQnIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICBpZDogLTEsXG4gICAgICAgICAgICAgICAgY29sb3I6IG9wdGlvbnMuY29sb3IsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy52aXNpYmxlID8gZW50cnkuZGF0YS5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGUudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSA6IFtdLFxuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBvcHRpb25zLmNvbG9yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiBvcHRpb25zLmxpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiBvcHRpb25zLnBvaW50UmFkaXVzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IG9wdGlvbnMubGluZVdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgdW9tOiBkYXRhc2V0ID8gZGF0YXNldC51b20gOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFzZXQgPyBkYXRhc2V0LmxhYmVsIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogb3B0aW9ucy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICAgIHlBeGlzUmFuZ2U6IG9wdGlvbnMueUF4aXNSYW5nZSxcbiAgICAgICAgICAgICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbjogb3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICBzZXBhcmF0ZVlBeGlzOiBvcHRpb25zLnNlcGFyYXRlWUF4aXNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpc2libGU6IG9wdGlvbnMudmlzaWJsZVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZGF0YXNldC5wYXJhbWV0ZXJzLmZlYXR1cmUsXG4gICAgICAgICAgICAgICAgICBwaGVub21lbm9uOiBkYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbixcbiAgICAgICAgICAgICAgICAgIG9mZmVyaW5nOiBkYXRhc2V0LnBhcmFtZXRlcnMub2ZmZXJpbmdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5wdXNoKGRhdGFFbnRyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhRW50cnkgPSB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGFbcHJlcERhdGFJZHhdO1xuICAgICAgICAgICAgICBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tID0gZGF0YXNldCA/IGRhdGFzZXQudW9tIDogZW50cnkueWF4aXNMYWJlbDtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5LmF4aXNPcHRpb25zLmxhYmVsID0gZGF0YXNldCA/IGRhdGFzZXQubGFiZWwgOiBlbnRyeS55YXhpc0xhYmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXdEYXRhc2V0SWR4ID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoKGUpID0+IGUuaWRzLmluZGV4T2YoZW50cnkubGlua2VkRGF0YXNldElkKSA+IC0xKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFFeHRlbnQgPSBleHRlbnQ8RGF0YUVudHJ5LCBudW1iZXI+KGRhdGFFbnRyeS5kYXRhLCAoZCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy50aW1lc3Bhbi5mcm9tIDw9IGQudGltZXN0YW1wICYmIHRoaXMudGltZXNwYW4udG8gPj0gZC50aW1lc3RhbXApIHsgcmV0dXJuIGQudmFsdWU7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGRhdGFFeHRlbnRbMF0pICYmIGlzRmluaXRlKGRhdGFFeHRlbnRbMV0pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJhbmdlOiBNaW5NYXhSYW5nZSA9IHsgbWluOiBkYXRhRXh0ZW50WzBdLCBtYXg6IGRhdGFFeHRlbnRbMV0gfTtcbiAgICAgICAgICAgICAgdGhpcy5leHRlbmRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgIGlmIChuZXdEYXRhc2V0SWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQXhpc0luZGV4ID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoZSA9PiBlLmlkcy5pbmRleE9mKGVudHJ5LnlheGlzTGFiZWwpICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXhpc1JhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgdW9tOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgICAgYXV0b1JhbmdlOiBvcHRpb25zLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgIHByZVJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIG9yaWdpblJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogb3B0aW9ucy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaWRzOiBbZW50cnkueWF4aXNMYWJlbF0sXG4gICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBkYXRhRW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nQXhpc0luZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bZXhpc3RpbmdBeGlzSW5kZXhdID0gYXhpc1JhbmdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLnB1c2goYXhpc1JhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UubWluID0gTWF0aC5taW4ocmFuZ2UubWluLCB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1pbik7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1heCA9IE1hdGgubWF4KHJhbmdlLm1heCwgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZS5tYXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0uaWRzLnB1c2goZW50cnkubGlua2VkRGF0YXNldElkID8gZW50cnkubGlua2VkRGF0YXNldElkICsgJ2FkZCcgOiBlbnRyeS55YXhpc0xhYmVsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZW50cnkueWF4aXNMYWJlbCAmJiAhZW50cnkubGlua2VkRGF0YXNldElkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMubGlzdE9mVW9tcy5pbmRleE9mKGVudHJ5LnlheGlzTGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPCAwKSB7IHRoaXMubGlzdE9mVW9tcy5wdXNoKGVudHJ5LnlheGlzTGFiZWwpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgY2hlY2sgdGhlIGFkZGl0aW9uYWwgZW50cnksIGl0IG5lZWRzIGF0IGxlYXN0IGEgXFwnbGlua2VkRGF0YXNldElkXFwnIG9yIGEgXFwneWF4aXNMYWJlbFxcJyBwcm9wZXJ0eSBhbmQgYSBcXCdkYXRhXFwnIHByb3BlcnR5OiAnLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBkcmF3QWxsR3JhcGhMaW5lcygpIHtcbiAgICBzdXBlci5kcmF3QWxsR3JhcGhMaW5lcygpO1xuICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5mb3JFYWNoKGUgPT4gdGhpcy5kcmF3R3JhcGhMaW5lKGUpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gICAgRDNHZW5lcmFsRGF0YVBvaW50LFxuICAgIEQzR2VuZXJhbERhdGFzZXQsXG4gICAgRDNHZW5lcmFsSW5wdXQsXG4gICAgRDNHZW5lcmFsUGxvdE9wdGlvbnMsXG4gICAgRDNHZW5lcmFsQXhpc09wdGlvbnMsXG4gICAgUmFuZ2UsXG4gICAgRDNHZW5lcmFsR3JhcGhPcHRpb25zXG59IGZyb20gJy4uL21vZGVsL2QzLWdlbmVyYWwnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLWdlbmVyYWwtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2QzZ2VuZXJhbD48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLnh7ZmlsbDpvcmFuZ2U7ZmlsbC1vcGFjaXR5Oi40fS5kMyAueCAudGlja3tzdHJva2U6IzAwZjtzdHJva2Utd2lkdGg6MTBweH0uZDMgLnggLnRpY2sgbGluZXtzdHJva2U6cmVkO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuYXhpc3tmaWxsOm9yYW5nZTtmaWxsLW9wYWNpdHk6LjR9LmQzIC5heGlzIC50aWNre3N0cm9rZTojMDBmO3N0cm9rZS13aWR0aDoxMHB4fS5kMyAuYXhpcyAudGljayBsaW5le3N0cm9rZTojZmZhMDdhO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuZ3JhcGhEb3Rze3N0cm9rZS13aWR0aDowO3N0cm9rZS1vcGFjaXR5OjF9LmQzIC5ncmFwaERvdHMgLmhvdmVye3N0cm9rZS13aWR0aDoyMHB4O3N0cm9rZS1vcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBWaWV3Q2hpbGQoJ2QzZ2VuZXJhbCcpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdlbmVyYWxEM0lucHV0OiBEM0dlbmVyYWxJbnB1dDtcblxuICAgIC8vIGNvbXBvbmVubnQgZGF0YSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIGdlbmVyYWxEYXRhOiBEM0dlbmVyYWxEYXRhc2V0W10gPSBbXTtcbiAgICBwcml2YXRlIGF4aXNPcHRpb25zOiBEM0dlbmVyYWxBeGlzT3B0aW9ucyA9IHt9O1xuICAgIHByaXZhdGUgcGxvdE9wdGlvbnM6IEQzR2VuZXJhbFBsb3RPcHRpb25zID0ge1xuICAgICAgICB4bGFiZWw6ICd4JyxcbiAgICAgICAgeWxhYmVsOiAneScsXG4gICAgICAgIGRhdGU6IGZhbHNlXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGVmYXVsdEdyYXBoT3B0aW9uczogRDNHZW5lcmFsR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICBwb2ludFJhZGl1czogMlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGdyYXBoIGNvbXBvbmVudHNcbiAgICBwcml2YXRlIHJhd1N2ZzogYW55O1xuICAgIHByaXZhdGUgZ3JhcGg6IGFueTtcbiAgICBwcml2YXRlIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZ3JhcGhGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG5cbiAgICAvLyBjb21wb25lbnQgc2V0dGluZ3NcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGJ1ZmZlciA9IDA7XG4gICAgcHJpdmF0ZSBtYXhMYWJlbHdpZHRoID0gMDtcblxuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDEwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IGQzLnNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5tYXJnaW4ubGVmdCArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaEZvY3VzID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cblxuICAgICAgICB0aGlzLnByZXBhcmVEYXRhKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5nZW5lcmFsRDNJbnB1dCAmJiB0aGlzLnJhd1N2Zykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dCA9IGNoYW5nZXMuZ2VuZXJhbEQzSW5wdXQuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhbEQzSW5wdXQpIHtcbiAgICAgICAgICAgIC8vIGFkZCBhbGwgaW5wdXQgZGF0YXNldCBpbnRvIG9uZSBhcnJheSAocHVibGljIGdlbmVyYWxEYXRhKVxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dC5kYXRhc2V0cy5mb3JFYWNoKChkcywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXNldDogRDNHZW5lcmFsRGF0YXNldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZHMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoZHMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMgPSB0aGlzLmdlbmVyYWxEM0lucHV0LnBsb3RPcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy5kYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYXhpc09wdGlvbnMueFJhbmdlID0gdGhpcy5nZXRSYW5nZShkYXRhLCAneCcpO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55UmFuZ2UgPSB0aGlzLmdldFJhbmdlKGRhdGEsICd5Jyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsIGZ1bmN0aW9ucyByZWxhdGVkIHRvIHBsb3R0aW5nIGEgZGF0YXNldCBpbiBhIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGxvdEdyYXBoKCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55U2NhbGUgPSB0aGlzLmRyYXdZYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy54U2NhbGUgPSB0aGlzLmRyYXdYYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGhGb2N1cy5hcHBlbmQoJ2cnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0Jyk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGhMaW5lKGRhdGFzZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgeSBheGlzLlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHtEM0dlbmVyYWxEYXRhc2V0fSBPYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdZYXhpcyhvcHRpb25zOiBEM0dlbmVyYWxQbG90T3B0aW9ucykge1xuXG4gICAgICAgIC8vIHNldCByYW5nZSBvZmZzZXQgZm9yIHkgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgeVJhbmdlT2Zmc2V0ID0gMTA7XG4gICAgICAgIGNvbnN0IHlSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueVJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBpZiAoeVJhbmdlLm1heCAhPT0geVJhbmdlLm1pbikge1xuICAgICAgICAgICAgeVJhbmdlT2Zmc2V0ID0gKHlSYW5nZS5tYXggLSB5UmFuZ2UubWluKSAqIDAuMTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5UmFuZ2VPZmZzZXQgPSB5UmFuZ2UubWluICogMC4xMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lSYW5nZS5taW4gLSB5UmFuZ2VPZmZzZXQsIHlSYW5nZS5tYXggKyB5UmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGNvbnN0IHlBeGlzR2VuID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCB5QXhpcyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzR2VuKTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpcyBsYWJlbFxuICAgICAgICBjb25zdCB5QXhpc0xhYmVsID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgdGhpcy5oZWlnaHQgLyAyICsgJylyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5QXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQnLCAnMThweCB0aW1lcycpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy55bGFiZWwpO1xuXG4gICAgICAgIC8vIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcueUF4aXNUZXh0TGFiZWwnKVxuICAgICAgICB0aGlzLmJ1ZmZlciA9IHlBeGlzLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyAxMCArIHRoaXMuZ2V0RGltZW5zaW9ucyh5QXhpc0xhYmVsLm5vZGUoKSkuaDtcblxuICAgICAgICB5QXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cbiAgICAgICAgLy8gZHJhdyB5IGdyaWQgbGluZXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHlTY2FsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHggYXhpcy5cbiAgICAgKiBAcGFyYW0gZGF0YXNldCB7RDNHZW5lcmFsRGF0YXNldH0gT2JqZWN0IHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WGF4aXMob3B0aW9uczogRDNHZW5lcmFsUGxvdE9wdGlvbnMpIHtcbiAgICAgICAgLy8gc2V0IHJhbmdlIG9mZnNldCBmb3IgeCBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHhSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueFJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBsZXQgdGlja3MgPSAxMDtcbiAgICAgICAgbGV0IHhSYW5nZU9mZnNldCA9ICh4UmFuZ2UubWF4IC0geFJhbmdlLm1pbikgKiAwLjEwO1xuICAgICAgICBpZiAoeFJhbmdlLm1heCA9PT0geFJhbmdlLm1pbikge1xuICAgICAgICAgICAgdGlja3MgPSA1O1xuICAgICAgICAgICAgeFJhbmdlT2Zmc2V0ID0geFJhbmdlLm1pbiAqIDAuMTA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFt4UmFuZ2UubWluIC0geFJhbmdlT2Zmc2V0LCB4UmFuZ2UubWF4ICsgeFJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5idWZmZXIsIHRoaXMud2lkdGhdKTtcblxuICAgICAgICBjb25zdCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgICAgICAgICAgLnRpY2tzKHRpY2tzKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZC52YWx1ZU9mKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRTZWNvbmQgPSAnOiVTJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1pbnV0ZSA9ICclSDolTScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdERheSA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRXZWVrID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFllYXIgPSAnJVknO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGQzLnRpbWVTZWNvbmQoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVIb3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVEYXkoZGF0ZSkgPCBkYXRlID8gZm9ybWF0SG91clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lWWVhcihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdFllYXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJyArIGQudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcblxuICAgICAgICAvLyBkcmF3IHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpc1xuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tzKDApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyBkcmF3IHggYXhpcyBsYWJlbFxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi5ib3R0b20gLSA1KVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy54bGFiZWwpO1xuXG4gICAgICAgIHJldHVybiB4U2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgbGluZSBvZiB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0QzR2VuZXJhbERhdGFzZXR9IE9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkYXRzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGhMaW5lKGRhdGFzZXQ6IEQzR2VuZXJhbERhdGFzZXQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGdyYWggbGluZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5ncmFwaEJvZHkgPSB0aGlzLmdyYXBoXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgZGF0YXNldC5pZCArICcpJyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2l0aCBkYXRhc2V0XG4gICAgICAgIGxldCBncmFwaExpbmUgPSBkMy5saW5lPEQzR2VuZXJhbERhdGFQb2ludD4oKVxuICAgICAgICAgICAgLmRlZmluZWQoZCA9PiAoIWlzTmFOKGQueCkgJiYgIWlzTmFOKGQueSkpKVxuICAgICAgICAgICAgLngoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnhTY2FsZShkLngpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeENvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnhDb29yZCA9IHhDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnlTY2FsZShkLnkpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeUNvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnlDb29yZCA9IHlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmN1cnZlKGQzLmN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmdyYXBoQm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgLmRhdHVtKGRhdGFzZXQuZGF0YSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLmxpbmVXaWR0aCA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5saW5lcy5saW5lV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignZCcsIGdyYXBoTGluZSk7XG5cbiAgICAgICAgLy8gZHJhdyBjaXJjbGVzIGFyb3VuZCBkYXRhcG9pbnRzXG4gICAgICAgIHRoaXMuZ3JhcGhCb2R5LnNlbGVjdEFsbCgnLmdyYXBoRG90cycpXG4gICAgICAgICAgICAuZGF0YShkYXRhc2V0LmRhdGEuZmlsdGVyKChkKSA9PiAhaXNOYU4oZC55KSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JhcGhEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RvdC0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJy0nICsgZGF0YXNldC5pZCArICcnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5jb2xvciA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGguY29sb3IgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignY3gnLCBncmFwaExpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgZ3JhcGhMaW5lLnkoKSlcbiAgICAgICAgICAgIC5hdHRyKCdyJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV0IG9mIHBvbHlnb25zIG92ZXJsYXlpbmcgdGhlIGdyYXBocyB0byBkaXZpZGUgc2VjdGlvbnMgZm9yIGhvdmVyaW5nLlxuICAgICAqIEBwYXJhbSBpbnB1dERhdGEge0QzR2VuZXJhbERhdGFzZXRbXX0gZGF0YSBjb250YWluaW5nIGFuIGFycmF5IHdpdGggYWxsIGRhdGFwb2ludHMgYW5kIGFuIGlkIGZvciBlYWNoIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUhvdmVyaW5nTmV0KGlucHV0RGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgZGF0YSA9IGlucHV0RGF0YS5tYXAoZnVuY3Rpb24gKHNlcmllcywgaSkge1xuICAgICAgICAgICAgc2VyaWVzLmRhdGEgPSBzZXJpZXMuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgcG9pbnQuc2VyaWVzID0gaTtcbiAgICAgICAgICAgICAgICBwb2ludFswXSA9IHBvaW50Lng7XG4gICAgICAgICAgICAgICAgcG9pbnRbMV0gPSBwb2ludC55O1xuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlcmllcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLFxuICAgICAgICAgICAgeSA9IGQzLnNjYWxlTGluZWFyKCk7XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBkMy5tZXJnZShkYXRhLm1hcChmdW5jdGlvbiAoY2wsIGxpbmVJbmRleCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjbCA9IHsgZGF0YTogW3swOiBudW1iZXIsIDE6IG51bWJlciwgc2VyaWVzOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyfSwge30sIC4uLl0sIGlkOiBudW1iZXIgfVxuICAgICAgICAgICAgICogcG9pbnQgPSBlYWNoIHBvaW50IGluIGEgZGF0YXNldFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBvdXRwdXRMaW5lID0gY2wuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50LCBwb2ludEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dFBvaW50ID0gW3gocG9pbnQueENvb3JkKSwgeShwb2ludC55Q29vcmQpLCBsaW5lSW5kZXgsIHBvaW50SW5kZXgsIHBvaW50LCBjbF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFBvaW50OyAvLyBhZGRpbmcgc2VyaWVzIGluZGV4IHRvIHBvaW50IGJlY2F1c2UgZGF0YSBpcyBiZWluZyBmbGF0dGVuZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpbmU7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVmZmVyLCAvLyArIHRoaXMubWFyZ2luLmxlZnQsXG4gICAgICAgICAgICB0b3AgPSB0aGlzLm1hcmdpbi50b3AsXG4gICAgICAgICAgICByaWdodCA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIsIC8vICsgdGhpcy5tYXJnaW4ubGVmdCxcbiAgICAgICAgICAgIGJvdHRvbSA9IHRoaXMubWFyZ2luLnRvcCArIHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcblxuICAgICAgICAvLyBmaWx0ZXIgZGF0YXNldCAtIGRlbGV0ZSBhbGwgZW50cmllcyB0aGF0IGFyZSBOYU5cbiAgICAgICAgbGV0IHZlcnRpY2VzRmlsdGVyZWQgPSB2ZXJ0aWNlcy5maWx0ZXIoZCA9PiAhaXNOYU4oZFswXSkgfHwgIWlzTmFOKGRbMV0pKTtcbiAgICAgICAgY29uc3QgRGlmZnZvcm9ub2kgPSBkMy52b3Jvbm9pKClcbiAgICAgICAgICAgIC5leHRlbnQoW1tsZWZ0LCB0b3BdLCBbcmlnaHQsIGJvdHRvbV1dKTtcbiAgICAgICAgbGV0IGRpZmZWb3Jvbm9pMiA9IERpZmZ2b3Jvbm9pLnBvbHlnb25zKHZlcnRpY2VzRmlsdGVyZWQpO1xuXG4gICAgICAgIGxldCB3cmFwID0gdGhpcy5yYXdTdmcuc2VsZWN0QWxsKCdnLmQzbGluZScpLmRhdGEoW3ZlcnRpY2VzRmlsdGVyZWRdKTtcbiAgICAgICAgbGV0IGdFbnRlciA9IHdyYXAuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdkM2xpbmUnKS5hcHBlbmQoJ2cnKTtcbiAgICAgICAgZ0VudGVyLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BvaW50LXBhdGhzJyk7XG5cbiAgICAgICAgLy8gdG8gYXZvaWQgbm8gaG92ZXJpbmcgZm9yIG9ubHkgb25lIGRhdGFzZXQgd2l0aG91dCBpbnRlcmFjdGlvbiB0aGUgZm9sbG93aW5nIGxpbmVzIGFyZSBkb3VibGVkXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgdGhlIHBhdGhzLCB3aGljaCBjYW4gYmUgdXBkYXRlZCBsYXRlciBvbiAoYnkgdGhlICdleGl0KCkucmVtb3ZlKCknIGZ1bmN0aW9uIGNhbGxzKVxuICAgICAgICBsZXQgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHBvaW50UGF0aHMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBwb2ludFBhdGhzXG4gICAgICAgICAgICAuYXR0cignY2xpcC1wYXRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkLmRhdGFbNF0ueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQuZGF0YVs0XS54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjY2xpcC0nICsgZC5kYXRhWzVdLmlkICsgJy0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCcgJykgKyAnWic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbi5sZWZ0ICsgJywgJyArIHRoaXMubWFyZ2luLnRvcCArICcpJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSBkLmRhdGFbNF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gdGhpcy5jYWxjRGlzdGFuY2VIb3ZlcmluZyhkYXRhc2V0LCBjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEJhY2sgPSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPj0gMCAmJiBjb29yZHNbMF0gPD0gcmVjdEJhY2sud2lkdGggJiYgY29vcmRzWzFdID49IDAgJiYgY29vcmRzWzFdIDw9IHJlY3RCYWNrLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkYXRhc2V0eENvb3JkU3BsaXQgKyAnLScgKyBkLmRhdGFbNV0uaWQgKyAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwLjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgKHJhZGl1cyAqIDIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLnBsb3RPcHRpb25zLmRhdGUgPyAneDogJyArIG1vbWVudChkYXRhc2V0LngpLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKSArICcgeTogJyArIGRhdGFzZXQueSA6ICd4OiAnICsgZGF0YXNldC54ICsgJyB5OiAnICsgZGF0YXNldC55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkb3RMYWJlbCA9IHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdExhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgY29sb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMiA+IGNvb3Jkc1swXSkgeyBvbkxlZnRTaWRlID0gdHJ1ZTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZGF0YXNldC55Q29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RXOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS53ICsgODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEg6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLmg7IC8vICsgNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0WCA9IGRhdGFzZXQueENvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkYXRhc2V0LnlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvb3Jkc1sxXSArIHJlY3RIICsgNCkgPiB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBsYWJlbCBiZWxvdyB4IGF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RyYW5zbGF0ZSBsYWJlbCB0byBhIGhpZ2hlciBwbGFjZS4gLSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDQgKyAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFggPSBkYXRhc2V0LnhDb29yZCAtIHJlY3RXICsgNCAtIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFkgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGxhYmVsWCArICcsICcgKyBsYWJlbFkgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5oaWdobGlnaHQgaG92ZXJlZCBkb3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldCA9IGQuZGF0YVs0XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLnBvaW50UmFkaXVzIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmxpbmVzLnBvaW50UmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldHhDb29yZFNwbGl0ID0gZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJy0nICsgZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBtb3VzZSBhbmQgYSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHt9IENvb3JkaW5hdGVzIG9mIHRoZSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBjb29yZHMge30gQ29vcmRpbmF0ZXMgb2YgdGhlIG1vdXNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0Rpc3RhbmNlSG92ZXJpbmcoZGF0YXNldDogRDNHZW5lcmFsRGF0YVBvaW50LCBjb29yZHM6IFtudW1iZXIsIG51bWJlcl0pOiBudW1iZXIge1xuICAgICAgICBsZXQgbVggPSBjb29yZHNbMF0gKyB0aGlzLmJ1ZmZlcixcbiAgICAgICAgICAgIG1ZID0gY29vcmRzWzFdLCAvLyArIHRoaXMubWFyZ2luLnRvcCxcbiAgICAgICAgICAgIHBYID0gZGF0YXNldC54Q29vcmQsXG4gICAgICAgICAgICBwWSA9IGRhdGFzZXQueUNvb3JkO1xuICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludCBhbmQgbW91c2Ugd2hlbiBob3ZlcmluZ1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChwWCAtIG1YKSwgMikgKyBNYXRoLnBvdygocFkgLSBtWSksIDIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmdlKGRhdGE6IEQzR2VuZXJhbERhdGFQb2ludFtdLCBzZWxlY3Rvcjogc3RyaW5nKTogUmFuZ2Uge1xuICAgICAgICAvLyByYW5nZSBmb3IgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBkMy5leHRlbnQoZDMudmFsdWVzKGRhdGEubWFwKChkKSA9PiB7XG4gICAgICAgICAgICBpZiAoKCFpc05hTihkLngpICYmICFpc05hTihkLnkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkW3NlbGVjdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKTtcbiAgICAgICAgcmV0dXJuIHsgbWluOiByYW5nZVswXSwgbWF4OiByYW5nZVsxXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBib3VuZGluZ3Mgb2YgYSBodG1sIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsIHtPYmplY3R9IE9iamVjdCBvZiB0aGUgaHRtbCBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KTogeyB3OiBudW1iZXIsIGg6IG51bWJlciB9IHtcbiAgICAgICAgbGV0IHcgPSAwO1xuICAgICAgICBsZXQgaCA9IDA7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLmdldEJCb3goKTtcbiAgICAgICAgICAgIHcgPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgaCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBnZXREaW1lbnNpb25zKCkgJyArIGVsICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBoXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG59IGZyb20gJy4vZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy1nZW5lcmFsLWdyYXBoL2QzLWdlbmVyYWwtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRDNNb2R1bGUgeyB9XG4iLCJleHBvcnQgY2xhc3MgRDNTZWxlY3Rpb25SYW5nZSB7XG4gICAgcHVibGljIGZyb206IG51bWJlcjtcbiAgICBwdWJsaWMgdG86IG51bWJlcjtcbn1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJUaW1lIiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJJbnB1dCIsIk91dHB1dCIsIk1peGluIiwiSGFzTG9hZGFibGVDb250ZW50IiwidGltZUZvcm1hdExvY2FsZSIsInRpbWVGb3JtYXQiLCJJbmplY3RhYmxlIiwiVHJhbnNsYXRlU2VydmljZSIsInRzbGliXzEuX19leHRlbmRzIiwiZDMubW91c2UiLCJkMy5zZWxlY3RBbGwiLCJkMy5zZWxlY3QiLCJkMy5ldmVudCIsIlRpbWVzcGFuIiwiVGltZXNlcmllcyIsImQzLmV4dGVudCIsImQzLnpvb20iLCJkMy5kcmFnIiwiZDMuYnJ1c2hYIiwiZDMuc2NhbGVUaW1lIiwiZDMuYXhpc0JvdHRvbSIsImQzLnRpbWVTZWNvbmQiLCJkMy50aW1lTWludXRlIiwiZDMudGltZUhvdXIiLCJkMy50aW1lRGF5IiwiZDMudGltZU1vbnRoIiwiZDMudGltZVdlZWsiLCJkMy50aW1lWWVhciIsImQzLmF4aXNUb3AiLCJkMy5zY2FsZUxpbmVhciIsImQzLmF4aXNMZWZ0IiwiZDMubGluZSIsImQzLmN1cnZlTGluZWFyIiwiZDMuYmlzZWN0b3IiLCJkMy5taW4iLCJWaWV3RW5jYXBzdWxhdGlvbiIsIkl0ZXJhYmxlRGlmZmVycyIsIkRhdGFzZXRBcGlJbnRlcmZhY2UiLCJJbnRlcm5hbElkSGFuZGxlciIsIkNvbG9yU2VydmljZSIsIlZpZXdDaGlsZCIsIkRhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQiLCJtb3VzZSIsInNlbGVjdCIsImxpbmUiLCJjdXJ2ZUxpbmVhciIsImFyZWEiLCJheGlzUmlnaHQiLCJiaXNlY3RvciIsImV4dGVudCIsInNjYWxlTGluZWFyIiwiYXhpc0xlZnQiLCJheGlzQm90dG9tIiwiYXhpc1RvcCIsImQzLm1lcmdlIiwiZDMudm9yb25vaSIsImQzLnZhbHVlcyIsIk5nTW9kdWxlIiwiSGVsZ29sYW5kQ29yZU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsdUJBQTBCLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENB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