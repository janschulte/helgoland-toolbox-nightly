import { __decorate, __metadata, __extends } from 'tslib';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, Injectable, NgModule, ViewChild, ViewEncapsulation, IterableDiffers, defineInjectable, inject } from '@angular/core';
import { HasLoadableContent, Mixin, Time, ColorService, DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Timeseries, Timespan, HelgolandCoreModule } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { timeFormat, timeFormatLocale, mouse, select, line, curveLinear, area, axisRight, bisector, extent, scaleLinear, axisLeft, axisBottom, axisTop, timeSecond, timeMinute, timeHour, timeDay, timeMonth, timeWeek, timeYear, merge, voronoi, values, selectAll, event, zoom, drag, brushX, scaleTime, min } from 'd3';
import moment from 'moment';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var D3OverviewTimeseriesGraphComponent = /** @class */ (function () {
    function D3OverviewTimeseriesGraphComponent(timeSrvc, cd) {
        this.timeSrvc = timeSrvc;
        this.cd = cd;
        this.onTimespanChanged = new EventEmitter();
        this.onLoading = new EventEmitter();
        this.onContentLoading = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'n52-d3-overview-timeseries-graph',
                    template: "<n52-d3-timeseries-graph [datasetIds]=\"datasetIds\" [datasetOptions]=\"datasetOptions\" [reloadForDatasets]=\"reloadForDatasets\"\n    [timeInterval]=\"overviewTimespan\" [mainTimeInterval]=\"timespan\" [presenterOptions]=\"presenterOptions\" (onTimespanChanged)=\"timeSpanChanged($event)\"\n    (onContentLoading)=\"onGraphLoading($event)\"></n52-d3-timeseries-graph>",
                    styles: [":host .d3{height:100%}"]
                },] },
    ];
    /** @nocollapse */
    D3OverviewTimeseriesGraphComponent.ctorParameters = function () { return [
        { type: Time },
        { type: ChangeDetectorRef }
    ]; };
    D3OverviewTimeseriesGraphComponent.propDecorators = {
        datasetIds: [{ type: Input }],
        datasetOptions: [{ type: Input }],
        presenterOptions: [{ type: Input }],
        timeInterval: [{ type: Input }],
        rangefactor: [{ type: Input }],
        reloadForDatasets: [{ type: Input }],
        onTimespanChanged: [{ type: Output }],
        onLoading: [{ type: Output }],
        onContentLoading: [{ type: Output }]
    };
    D3OverviewTimeseriesGraphComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [Time,
            ChangeDetectorRef])
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
var D3TimeFormatLocaleService = /** @class */ (function () {
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
            return timeFormatLocale(this.timeFormatLocaleMapper.get(langCode)).format(specifier);
        }
        else {
            return timeFormat(specifier);
        }
    };
    D3TimeFormatLocaleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    D3TimeFormatLocaleService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    /** @nocollapse */ D3TimeFormatLocaleService.ngInjectableDef = defineInjectable({ factory: function D3TimeFormatLocaleService_Factory() { return new D3TimeFormatLocaleService(inject(TranslateService)); }, token: D3TimeFormatLocaleService, providedIn: "root" });
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
var D3TimeseriesGraphComponent = /** @class */ (function (_super) {
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
        _this.onHighlightChanged = new EventEmitter();
        _this.onClickDataPoint = new EventEmitter();
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
            var coords = mouse(_this.background.node());
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
                var textRectArray = selectAll('.focus-visibility').nodes();
                // get and sort all text labels and rectangle of the text labels and combine related
                for (var i = 0; i < textRectArray.length; i += 2) {
                    labelArray.push([textRectArray[i], textRectArray[i + 1]]);
                }
                // sory by y coordinate
                labelArray.sort(function (a, b) { return parseFloat(select(a[0]).attr('y')) - parseFloat(select(b[0]).attr('y')); });
                // translate if overlapping
                labelArray.forEach(function (el) {
                    // pairs of 2 objects (rectangle (equal) and label (odd))
                    select(el[0])
                        .attr('transform', function (d, i, f) {
                        if (select(el[0]).attr('visibility') !== 'hidden') {
                            visible_1 = true;
                            /** @type {?} */
                            var ycoord = parseFloat(select(el[0]).attr('y'));
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
                    select(el[1])
                        .attr('transform', function (d, i, f) {
                        if (select(el[1]).attr('visibility') !== 'hidden') {
                            visible_1 = true;
                            /** @type {?} */
                            var ycoord = parseFloat(select(el[0]).attr('y'));
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
            _this.dragMoveStart = event.x;
            _this.dragMoveRange = [_this.xAxisRange.from, _this.xAxisRange.to];
        };
        /**
         * Function that controlls the panning (dragging) of the graph.
         */
        _this.panMoveHandler = function () {
            _this.draggingMove = true;
            if (_this.dragMoveStart && _this.draggingMove) {
                /** @type {?} */
                var diff = -(event.x - _this.dragMoveStart);
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
            _this.dragStart = mouse(_this.background.node());
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
        this.rawSvg = select(this.d3Elem.nativeElement)
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
            select('g.d3line').attr('visibility', 'visible');
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
        this.onTimespanChanged.emit(new Timespan(from, to));
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
        if (dataset instanceof Timeseries) {
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
        var dataExtent = extent(dataEntry.data, function (d) {
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
        return (/** @type {?} */ (this.d3Elem.nativeElement)).clientHeight - this.margin.top - this.margin.bottom + (this.plotOptions.showTimeLabel ? 0 : 20);
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
                    select('g.d3line').attr('visibility', 'hidden');
                }
            }
            if (this.plotOptions.togglePanZoom === false) {
                this.background
                    .call(zoom()
                    .on('start', this.zoomStartHandler)
                    .on('zoom', this.zoomHandler)
                    .on('end', this.zoomEndHandler));
            }
            else {
                this.background
                    .call(drag()
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
            var brush = brushX()
                .extent([[0, 0], [this.width, this.height]])
                .on('end', function () {
                // on mouseclick change time after brush was moved
                if (_this.mousedownBrush) {
                    /** @type {?} */
                    var timeByCoord = _this.getTimestampByCoord(event.selection[0], event.selection[1]);
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
    function (entry, line$$1) {
        var _this = this;
        this.graphBody.selectAll('.hoverDots')
            .data(entry.data.filter(function (d) { return !isNaN(d.value); }))
            .enter().append('circle')
            .attr('class', 'hoverDots')
            .attr('id', function (d) { return 'hover-dot-' + d.timestamp + '-' + entry.id; })
            .attr('stroke', 'transparent')
            .attr('fill', 'transparent')
            .attr('cx', line$$1.x())
            .attr('cy', line$$1.y())
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
        this.xScaleBase = scaleTime()
            .domain([new Date(this.xAxisRange.from), new Date(this.xAxisRange.to)])
            .range([bufferXrange, this.width]);
        /** @type {?} */
        var xAxis = axisBottom(this.xScaleBase)
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
            var format = timeSecond(date) < date ? formatMillisecond
                : timeMinute(date) < date ? formatSecond
                    : timeHour(date) < date ? formatMinute
                        : timeDay(date) < date ? formatHour
                            : timeMonth(date) < date ? (timeWeek(date) < date ? formatDay : formatWeek)
                                : timeYear(date) < date ? formatMonth
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
            .call(axisTop(this.xScaleBase).ticks(0).tickSize(0));
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
        var yScale = scaleLinear()
            .domain([yMin - rangeOffset, yMax + rangeOffset])
            .range([this.height, 0]);
        /** @type {?} */
        var yAxisGen = axisLeft(yScale).ticks(5);
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
                select(k[0])
                    .attr('opacity', _this.opac.hover);
            })
                .on('mouseout', function (d, i, k) {
                if (!_this.yAxisSelect[id_1].clicked) {
                    select(k[0])
                        .attr('opacity', _this.opac.default);
                }
                else {
                    select(k[0])
                        .attr('opacity', _this.opac.click);
                }
            })
                .on('mouseup', function (d, i, k) {
                if (!_this.yAxisSelect[id_1].clicked) {
                    select(k[0])
                        .attr('opacity', _this.opac.default);
                }
                else {
                    select(k[0])
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
                .call(axisLeft(yScale)
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
                var line$$1 = this.createLine(this.xScaleBase, yScaleBase);
                this.graphBody
                    .append('svg:path')
                    .datum(entry.data)
                    .attr('class', 'line')
                    .attr('fill', 'none')
                    .attr('stroke', entry.color)
                    .attr('stroke-width', entry.lines.lineWidth)
                    .attr('d', line$$1);
                this.graphBody.selectAll('.graphDots')
                    .data(entry.data.filter(function (d) { return !isNaN(d.value); }))
                    .enter().append('circle')
                    .attr('class', 'graphDots')
                    .attr('id', function (d) { return 'dot-' + d.timestamp + '-' + entry.id; })
                    .attr('stroke', entry.color)
                    .attr('fill', entry.color)
                    .attr('cx', line$$1.x())
                    .attr('cy', line$$1.y())
                    .attr('r', entry.lines.pointRadius);
                if (this.plotOptions.hoverStyle === HoveringStyle.point) {
                    this.createPointHovering(entry, line$$1);
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
        return line()
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
            .curve(curveLinear);
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
            var coords = mouse(this.background.node());
            /** @type {?} */
            var dataset = this.datasetMap.get(entry.internalId);
            /** @type {?} */
            var rectBack = this.background.node().getBBox();
            if (coords[0] >= 0 && coords[0] <= rectBack.width && coords[1] >= 0 && coords[1] <= rectBack.height) {
                // highlight hovered dot
                select('#dot-' + d.timestamp + '-' + entry.id).attr('opacity', 0.8).attr('r', '8px');
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
            select('#dot-' + d.timestamp + '-' + entry.id)
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
        this.dragCurrent = mouse(this.background.node());
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
        var bisectDate = bisector(function (d) {
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
        selectAll('.focus-visibility')
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
        var min$$1 = min(this.distLabelXCoord);
        /** @type {?} */
        var idxOfMin = this.distLabelXCoord.findIndex(function (elem) { return elem === min$$1; });
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
            var text = select(this);
            /** @type {?} */
            var words = text.text().split(/\s+/).reverse();
            /** @type {?} */
            var word;
            /** @type {?} */
            var line$$1 = [];
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
                line$$1.push(word);
                tspan.text(line$$1.join(' '));
                /** @type {?} */
                var node = /** @type {?} */ (tspan.node());
                /** @type {?} */
                var hasGreaterWidth = node.getComputedTextLength() > width;
                if (hasGreaterWidth) {
                    line$$1.pop();
                    tspan.text(line$$1.join(' '));
                    line$$1 = [word];
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
        { type: Component, args: [{
                    selector: 'n52-d3-timeseries-graph',
                    template: "<div class=\"d3\" #d3timeseries></div>\n",
                    styles: [".d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}.d3 .formerButton,.d3 .laterButton{fill:grey;opacity:.3}.d3 .formerButton:hover,.d3 .laterButton:hover{opacity:.6}.d3 .arrow{stroke:grey;stroke-width:3px}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    D3TimeseriesGraphComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: D3TimeFormatLocaleService },
        { type: ColorService },
        { type: TranslateService }
    ]; };
    D3TimeseriesGraphComponent.propDecorators = {
        mainTimeInterval: [{ type: Input }],
        onHighlightChanged: [{ type: Output }],
        onClickDataPoint: [{ type: Output }],
        d3Elem: [{ type: ViewChild, args: ['d3timeseries',] }]
    };
    return D3TimeseriesGraphComponent;
}(DatasetPresenterComponent));

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
var D3SelectionRange = /** @class */ (function () {
    function D3SelectionRange() {
    }
    return D3SelectionRange;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var D3TrajectoryGraphComponent = /** @class */ (function (_super) {
    __extends(D3TrajectoryGraphComponent, _super);
    function D3TrajectoryGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) {
        var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.translateService = translateService;
        _this.onSelectionChangedFinished = new EventEmitter();
        _this.onSelectionChanged = new EventEmitter();
        _this.onHoverHighlight = new EventEmitter();
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
            var coords = mouse(_this.background.node());
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
            _this.dragStart = mouse(_this.background.node());
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
        this.rawSvg = select(this.d3Elem.nativeElement)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%');
        this.graph = this.rawSvg
            .append('g')
            .attr('transform', 'translate(' + (this.margin.left + this.maxLabelwidth) + ',' + this.margin.top + ')');
        this.lineFun = line()
            .x(this.calcXValue)
            .y(this.calcYValue)
            .curve(curveLinear);
        this.area = area()
            .x(this.calcXValue)
            .y0(this.height)
            .y1(this.calcYValue)
            .curve(curveLinear);
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
    function (values$$1, yScale, options) {
        this.graph.selectAll('dot')
            .data(values$$1)
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
    function (values$$1, yScale, options) {
        this.graph.append('svg:path')
            .datum(values$$1)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', options.color)
            .attr('stroke-width', 1)
            .attr('d', line()
            .x(this.calcXValue)
            .y(function (d) { return yScale(d[options.id]); })
            .curve(curveLinear));
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
            .call(axisRight(this.yScaleBase).tickSize(0).ticks(0));
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
        this.dragCurrent = mouse(this.background.node());
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
        var bisectDate = bisector(function (d) {
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
        var range = extent(this.baseValues, function (datum, index, array) {
            return datum[options.id]; // here with ID
        });
        /** @type {?} */
        var rangeOffset = (range[1] - range[0]) * 0.10;
        /** @type {?} */
        var yScale = scaleLinear()
            .domain([range[0] - rangeOffset, range[1] + rangeOffset])
            .range([this.height, 0]);
        this.yAxisGen = axisLeft(yScale).ticks(5);
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
                .call(axisLeft(yScale)
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
        this.xScaleBase = scaleLinear()
            .domain(this.getXDomain(this.baseValues))
            .range([buffer, this.width]);
        /** @type {?} */
        var xAxisGen = axisBottom(this.xScaleBase).ticks(5);
        if (this.presenterOptions.axisType === D3AxisType.Time) {
            xAxisGen.tickFormat(function (d) {
                return timeFormat('%d.%m.%Y %H:%M:%S')(new Date(d.valueOf()));
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
            .call(axisBottom(this.xScaleBase)
            .ticks(10)
            .tickSize(-this.height)
            .tickFormat(function () { return ''; }));
        // draw upper axis as border
        this.graph.append('svg:g')
            .attr('class', 'x axis')
            .call(axisTop(this.xScaleBase).ticks(0).tickSize(0));
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
    function (values$$1) {
        switch (this.presenterOptions.axisType) {
            case D3AxisType.Distance:
                return [values$$1[0].dist, values$$1[values$$1.length - 1].dist];
            case D3AxisType.Time:
                return [values$$1[0].timestamp, values$$1[values$$1.length - 1].timestamp];
            default:
                return [values$$1[0].tick, values$$1[values$$1.length - 1].tick];
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
        { type: Component, args: [{
                    selector: 'n52-d3-trajectory-graph',
                    template: "<div class=\"d3\" #dthree></div>",
                    styles: [".d3{height:100%}.d3 .axis line,.d3 .axis path{fill:none;stroke:#000}.d3 text{font-size:14px}.d3 .graphArea{fill:#b0c4de;fill-opacity:.7}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .map-highlight-label{fill:#fff;fill-opacity:.7}.d3 .mouse-focus-line{pointer-events:none;stroke-width:1px;stroke:#000}.d3 .mouse-drag{fill:rgba(0,0,255,.4);pointer-events:all;cursor:move}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    D3TrajectoryGraphComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: TranslateService }
    ]; };
    D3TrajectoryGraphComponent.propDecorators = {
        selection: [{ type: Input }],
        onSelectionChangedFinished: [{ type: Output }],
        onSelectionChanged: [{ type: Output }],
        onHoverHighlight: [{ type: Output }],
        d3Elem: [{ type: ViewChild, args: ['dthree',] }]
    };
    return D3TrajectoryGraphComponent;
}(DatasetPresenterComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends the common d3 component, with the ability to add additional data to the graph. To set or change  additional data, allways sets the complete array of data new. The componet just redraws if
 * the array is reset.
 */
var ExtendedDataD3TimeseriesGraphComponent = /** @class */ (function (_super) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var D3GeneralGraphComponent = /** @class */ (function () {
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
        this.rawSvg = select(this.d3Elem.nativeElement)
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
        var yScale = scaleLinear()
            .domain([yRange.min - yRangeOffset, yRange.max + yRangeOffset])
            .range([this.height, 0]);
        /** @type {?} */
        var yAxisGen = axisLeft(yScale).ticks(5);
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
            .call(axisLeft(yScale)
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
        var xScale = scaleLinear()
            .domain([xRange.min - xRangeOffset, xRange.max + xRangeOffset])
            .range([this.buffer, this.width]);
        /** @type {?} */
        var xAxis = axisBottom(xScale)
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
                var format = timeSecond(date) < date ? formatMillisecond
                    : timeMinute(date) < date ? formatSecond
                        : timeHour(date) < date ? formatMinute
                            : timeDay(date) < date ? formatHour
                                : timeMonth(date) < date ? (timeWeek(date) < date ? formatDay : formatWeek)
                                    : timeYear(date) < date ? formatMonth
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
            .call(axisTop(xScale)
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
        var graphLine = line()
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
            .curve(curveLinear);
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
        var x = scaleLinear();
        /** @type {?} */
        var y = scaleLinear();
        /** @type {?} */
        var vertices = merge(data.map(function (cl, lineIndex) {
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
        var Diffvoronoi = voronoi()
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
                var coords = mouse(_this.background.node());
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
                        select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
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
                    select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
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
                select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
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
        var range = extent(values(data.map(function (d) {
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
        return (/** @type {?} */ (this.d3Elem.nativeElement)).clientHeight - this.margin.top - this.margin.bottom;
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
        { type: Component, args: [{
                    selector: 'n52-d3-general-graph',
                    template: "<div class=\"d3\" #d3general></div>\n",
                    styles: [".d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .x{fill:orange;fill-opacity:.4}.d3 .x .tick{stroke:#00f;stroke-width:10px}.d3 .x .tick line{stroke:red;stroke-width:15px}.d3 .axis{fill:orange;fill-opacity:.4}.d3 .axis .tick{stroke:#00f;stroke-width:10px}.d3 .axis .tick line{stroke:#ffa07a;stroke-width:15px}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}"]
                },] },
    ];
    /** @nocollapse */
    D3GeneralGraphComponent.ctorParameters = function () { return [
        { type: D3TimeFormatLocaleService }
    ]; };
    D3GeneralGraphComponent.propDecorators = {
        d3Elem: [{ type: ViewChild, args: ['d3general',] }],
        generalD3Input: [{ type: Input }]
    };
    return D3GeneralGraphComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandD3Module = /** @class */ (function () {
    function HelgolandD3Module() {
    }
    HelgolandD3Module.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        D3TrajectoryGraphComponent,
                        D3TimeseriesGraphComponent,
                        D3OverviewTimeseriesGraphComponent,
                        ExtendedDataD3TimeseriesGraphComponent,
                        D3GeneralGraphComponent
                    ],
                    imports: [
                        HelgolandCoreModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { D3TrajectoryGraphComponent, D3TimeseriesGraphComponent, D3GeneralGraphComponent, D3OverviewTimeseriesGraphComponent, ExtendedDataD3TimeseriesGraphComponent, HelgolandD3Module, D3AxisType, D3SelectionRange, HoveringStyle, D3TimeFormatLocaleService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWQzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL21vZGVsL2QzLXBsb3Qtb3B0aW9ucy50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvZDMtdGltZXNlcmllcy1ncmFwaC9kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvbW9kZWwvZDMtYXhpcy10eXBlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9tb2RlbC9kMy1zZWxlY3Rpb24tcmFuZ2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC9leHRlbmRlZC1kYXRhLWQzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy1nZW5lcmFsLWdyYXBoL2QzLWdlbmVyYWwtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucywgSGFzTG9hZGFibGVDb250ZW50LCBNaXhpbiwgVGltZSwgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzUGxvdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9kMy1wbG90LW9wdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxuNTItZDMtdGltZXNlcmllcy1ncmFwaCBbZGF0YXNldElkc109XCJkYXRhc2V0SWRzXCIgW2RhdGFzZXRPcHRpb25zXT1cImRhdGFzZXRPcHRpb25zXCIgW3JlbG9hZEZvckRhdGFzZXRzXT1cInJlbG9hZEZvckRhdGFzZXRzXCJcbiAgICBbdGltZUludGVydmFsXT1cIm92ZXJ2aWV3VGltZXNwYW5cIiBbbWFpblRpbWVJbnRlcnZhbF09XCJ0aW1lc3BhblwiIFtwcmVzZW50ZXJPcHRpb25zXT1cInByZXNlbnRlck9wdGlvbnNcIiAob25UaW1lc3BhbkNoYW5nZWQpPVwidGltZVNwYW5DaGFuZ2VkKCRldmVudClcIlxuICAgIChvbkNvbnRlbnRMb2FkaW5nKT1cIm9uR3JhcGhMb2FkaW5nKCRldmVudClcIj48L241Mi1kMy10aW1lc2VyaWVzLWdyYXBoPmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5kM3toZWlnaHQ6MTAwJX1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBEM092ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBIYXNMb2FkYWJsZUNvbnRlbnQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBEYXRhc2V0T3B0aW9ucz47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwcmVzZW50ZXJPcHRpb25zOiBEM1Bsb3RPcHRpb25zO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByYW5nZWZhY3RvcjogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmVsb2FkRm9yRGF0YXNldHM6IHN0cmluZ1tdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZXNwYW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uTG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIHB1YmxpYyBvdmVydmlld1RpbWVzcGFuOiBUaW1lc3BhbjtcbiAgICBwdWJsaWMgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgcHJpdmF0ZSBpbml0ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc2VudGVyT3B0aW9ucy5vdmVydmlldyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMgPSB7IG92ZXJ2aWV3OiB0cnVlIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhbmdlZmFjdG9yID0gdGhpcy5yYW5nZWZhY3RvciB8fCAxO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsICYmIHRoaXMuaW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2QuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVTcGFuQ2hhbmdlZCh0aW1lc3BhbjogVGltZXNwYW4pIHtcbiAgICAgICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlZC5lbWl0KHRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25HcmFwaExvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcobG9hZGluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVydmlld1JhbmdlKCkge1xuICAgICAgICBjb25zdCB0aW1lc3BhbiA9IHRoaXMudGltZVNydmMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRoaXMudGltZUludGVydmFsKTtcbiAgICAgICAgdGhpcy50aW1lc3BhbiA9IHRpbWVzcGFuO1xuICAgICAgICB0aGlzLm92ZXJ2aWV3VGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGltZXNwYW4sIHRoaXMucmFuZ2VmYWN0b3IpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IHRpbWVGb3JtYXQsIHRpbWVGb3JtYXRMb2NhbGUsIFRpbWVMb2NhbGVEZWZpbml0aW9uIH0gZnJvbSAnZDMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBob2xkcyB0aGUgdHJhbnNsYXRpb25zIGZvciBkMyBjaGFydHMgdGltZSBheGlzIGxhYmVscy5cbiAqIEFkZCBhIG5ldyB0cmFuc2xhdGlvbiB3aXRoIHRoZSBtZXRob2QgJ2FkZFRpbWVGb3JtYXRMb2NhbGUnIGxpa2UgdGhpcyBzYW1wbGU6XG4gKlxuICogYWRkVGltZUZvcm1hdExvY2FsZSgnZGUnLFxuICoge1xuICogICAnZGF0ZVRpbWUnOiAnJWEgJWIgJWUgJVggJVknLFxuICogICAnZGF0ZSc6ICclZC0lbS0lWScsXG4gKiAgICd0aW1lJzogJyVIOiVNOiVTJyxcbiAqICAgJ3BlcmlvZHMnOiBbJ0FNJywgJ1BNJ10sXG4gKiAgICdkYXlzJzogWydTb25udGFnJywgJ01vbnRhZycsICdEaWVuc3RhZycsICdNaXR0d29jaCcsICdEb25uZXJzdGFnJywgJ0ZyZWl0YWcnLCAnU2Ftc3RhZyddLFxuICogICAnc2hvcnREYXlzJzogWydTbycsICdNbycsICdEaScsICdNaScsICdEbycsICdGcicsICdTYSddLFxuICogICAnbW9udGhzJzogWydKYW51YXInLCAnRmVicnVhcicsICdNw4PCpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPa3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ10sXG4gKiAgICdzaG9ydE1vbnRocyc6IFsnSmFuJywgJ0ZlYicsICdNw4PCpHInLCAnQXByJywgJ01haScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZXonXVxuICogfSlcbiAqXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgdGltZUZvcm1hdExvY2FsZU1hcHBlcjogTWFwPHN0cmluZywgVGltZUxvY2FsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBhZGRUaW1lRm9ybWF0TG9jYWxlKGxvY2FsZUNvZGU6IHN0cmluZywgZGVmaW5pdGlvbjogVGltZUxvY2FsZURlZmluaXRpb24pIHtcbiAgICB0aGlzLnRpbWVGb3JtYXRMb2NhbGVNYXBwZXIuc2V0KGxvY2FsZUNvZGUsIGRlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldFRpbWVMb2NhbGUoc3BlY2lmaWVyOiBzdHJpbmcpOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nIHtcbiAgICBjb25zdCBsYW5nQ29kZSA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5jdXJyZW50TGFuZztcbiAgICBpZiAodGhpcy50aW1lRm9ybWF0TG9jYWxlTWFwcGVyLmhhcyhsYW5nQ29kZSkpIHtcbiAgICAgIHJldHVybiB0aW1lRm9ybWF0TG9jYWxlKHRoaXMudGltZUZvcm1hdExvY2FsZU1hcHBlci5nZXQobGFuZ0NvZGUpKS5mb3JtYXQoc3BlY2lmaWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRpbWVGb3JtYXQoc3BlY2lmaWVyKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogUGxvdCBvcHRpb25zIGZvciBEMyBjb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEQzUGxvdE9wdGlvbnMge1xuXG4gICAgLyoqXG4gICAgICogc2hvdyByZWZlcmVuY2UgdmFsdWVzIGZvciBhIGdyYXBoXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIHNob3dSZWZlcmVuY2VWYWx1ZXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogcmVxdWVzdHMgdGhlIGRhdGFzZXQgZGF0YSBnZW5lcmFsaXplZFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBnZW5lcmFsaXplQWxsd2F5cz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGUgcGFubmluZyAodHJ1ZSkgYW5kIHpvb21pbmcgKGZhbHNlKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICB0b2dnbGVQYW5ab29tPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNob3cgb3IgaGlkZSB5IGF4aXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgeWF4aXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBvciBoaWRlIGdyaWQgbGluZXMgaW5zaWRlIHBsb3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgZ3JpZD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzaG93IG9yIGhpZGUgbGluZXMgd2l0aCB2YWx1ZXMgd2hlbiBob3ZlcmluZyB3aXRoIG1vdXNlXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIGhvdmVyYWJsZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzdHlsZSB3aGVuIGhvdmVyaW5nIHdpdGggbW91c2VcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgaG92ZXJTdHlsZT86IEhvdmVyaW5nU3R5bGU7XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0aW5nIGlmIGNvbXBvbmVudCBzaG91bGQgYnVpbGQgb3ZlcnZpZXcgZGlhZ3JhbSBvciBub3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgb3ZlcnZpZXc/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBjb3B5cmlnaHQgbGFiZWxcbiAgICAgKlxuICAgICAqIGRlZmF1bHQgcG9zaXRpb24gaXMgdG9wIGxlZnRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgY29weXJpZ2h0PzogRDNDb3B5cmlnaHQ7XG5cbiAgICAvKipcbiAgICAqIHRvZ2dsZSBkYXRhc2V0IGdyb3VwaW5nIGJ5IHVvbVxuICAgICogdHJ1ZSA9IGdyb3VwIHkgYXhpcyBieSB1b21cbiAgICAqIGZhbHNlID0gc2luZ2xlIHkgYXhpcyBmb3IgZWFjaCB0aW1lc2VyaWVzXG4gICAgKlxuICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAqL1xuICAgIGdyb3VwWWF4aXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgKiBzaG93IHRoZSBsYWJlbCBvZiB0aGUgeGF4aXNcbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgc2hvd1RpbWVMYWJlbD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAqIFJlcXVlc3QgdGhlIGRhdGEgd2l0aCBleHBhbmRlZD10cnVlLCB0byBnZXQgdmFsdWVCZWZvcmVUaW1lc3Bhbi92YWx1ZUFmdGVyVGltZXNwYW5cbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgcmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzPzogYm9vbGVhbjtcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEQzQ29weXJpZ2h0IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHBvc2l0aW9uWD86ICdyaWdodCcgfCAnbGVmdCc7XG4gICAgcG9zaXRpb25ZPzogJ3RvcCcgfCAnYm90dG9tJztcbn1cblxuZXhwb3J0IGVudW0gSG92ZXJpbmdTdHlsZSB7XG4gICAgbm9uZSA9ICdub25lJyxcbiAgICBsaW5lID0gJ2xpbmUnLFxuICAgIHBvaW50ID0gJ3BvaW50J1xufVxuIiwiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbG9yU2VydmljZSxcbiAgICBEYXRhLFxuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbERhdGFzZXRJZCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBNaW5NYXhSYW5nZSxcbiAgICBUaW1lLFxuICAgIFRpbWVzZXJpZXMsXG4gICAgVGltZXNlcmllc0RhdGEsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgeyBIaWdobGlnaHRPdXRwdXQgfSBmcm9tICcuLi9tb2RlbC9kMy1oaWdobGlnaHQnO1xuaW1wb3J0IHsgRDNQbG90T3B0aW9ucywgSG92ZXJpbmdTdHlsZSB9IGZyb20gJy4uL21vZGVsL2QzLXBsb3Qtb3B0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUVudHJ5IHtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIHhEaWFnQ29vcmQ/OiBudW1iZXI7XG4gICAgeURpYWdDb29yZD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbERhdGFFbnRyeSB7XG4gICAgaW50ZXJuYWxJZDogc3RyaW5nO1xuICAgIGlkPzogbnVtYmVyOyAvLyBUT0RPIG5lZWRlZD9cbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGRhdGE6IERhdGFFbnRyeVtdO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBwb2ludHM6IHtcbiAgICAgICAgZmlsbENvbG9yOiBzdHJpbmdcbiAgICB9O1xuICAgIGxpbmVzPzoge1xuICAgICAgICBsaW5lV2lkdGg/OiBudW1iZXI7XG4gICAgICAgIHBvaW50UmFkaXVzPzogbnVtYmVyO1xuICAgIH07XG4gICAgYmFycz86IHtcbiAgICAgICAgbGluZVdpZHRoPzogbnVtYmVyO1xuICAgIH07XG4gICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgdW9tOiBzdHJpbmc7XG4gICAgICAgIGxhYmVsPzogc3RyaW5nO1xuICAgICAgICB6ZXJvQmFzZWQ/OiBib29sZWFuO1xuICAgICAgICB5QXhpc1JhbmdlPzogTWluTWF4UmFuZ2U7XG4gICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gICAgICAgIHNlcGFyYXRlWUF4aXM/OiBib29sZWFuO1xuICAgICAgICBwYXJhbWV0ZXJzPzoge1xuICAgICAgICAgICAgZmVhdHVyZT86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICAgICAgcGhlbm9tZW5vbj86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICAgICAgb2ZmZXJpbmc/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgZm9jdXNMYWJlbFJlY3Q/OiBhbnk7XG4gICAgZm9jdXNMYWJlbD86IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhQ29uc3QgZXh0ZW5kcyBJRGF0YXNldCB7XG4gICAgZGF0YT86IERhdGE8W251bWJlciwgbnVtYmVyXT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWVJhbmdlcyB7XG4gICAgdW9tOiBzdHJpbmc7XG4gICAgcmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgcHJlUmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgb3JpZ2luUmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgemVyb0Jhc2VkOiBib29sZWFuO1xuICAgIGF1dG9SYW5nZTogYm9vbGVhbjtcbiAgICBvdXRPZnJhbmdlOiBib29sZWFuO1xuICAgIGlkPzogc3RyaW5nOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSBpbnRlcm5hbElkXG4gICAgaWRzPzogc3RyaW5nW107IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IHVvbVxuICAgIGZpcnN0PzogYm9vbGVhbjtcbiAgICB5U2NhbGU/OiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gICAgb2Zmc2V0PzogbnVtYmVyO1xuICAgIHBhcmFtZXRlcnM6IHsgICAvLyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciB0aGUgeSBheGlzIGxhYmVsXG4gICAgICAgIGZlYXR1cmU/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgcGhlbm9tZW5vbj86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICBvZmZlcmluZz86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgIH07XG59XG5cbmludGVyZmFjZSBZU2NhbGUge1xuICAgIGJ1ZmZlcjogbnVtYmVyO1xuICAgIHlTY2FsZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xufVxuXG5pbnRlcmZhY2UgWUF4aXNTZWxlY3Rpb24ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2xpY2tlZDogYm9vbGVhbjtcbiAgICBpZHM/OiBBcnJheTxzdHJpbmc+O1xuICAgIHVvbT86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEhpZ2hsaWdodERhdGFzZXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2hhbmdlOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkM1wiICNkM3RpbWVzZXJpZXM+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5ncmFwaERvdHN7c3Ryb2tlLXdpZHRoOjA7c3Ryb2tlLW9wYWNpdHk6MX0uZDMgLmdyYXBoRG90cyAuaG92ZXJ7c3Ryb2tlLXdpZHRoOjIwcHg7c3Ryb2tlLW9wYWNpdHk6LjV9LmQzIC5mb3JtZXJCdXR0b24sLmQzIC5sYXRlckJ1dHRvbntmaWxsOmdyZXk7b3BhY2l0eTouM30uZDMgLmZvcm1lckJ1dHRvbjpob3ZlciwuZDMgLmxhdGVyQnV0dG9uOmhvdmVye29wYWNpdHk6LjZ9LmQzIC5hcnJvd3tzdHJva2U6Z3JleTtzdHJva2Utd2lkdGg6M3B4fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIEQzUGxvdE9wdGlvbnM+XG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgLy8gZGlmZmVyZW5jZSB0byB0aW1lc3Bhbi90aW1lSW50ZXJ2YWwgLS0+IGlmIGJydXNoLCB0aGVuIHRoaXMgaXMgdGhlIHRpbWVzcGFuIG9mIHRoZSBtYWluLWRpYWdyYW1cbiAgICBwdWJsaWMgbWFpblRpbWVJbnRlcnZhbDogVGltZXNwYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25IaWdobGlnaHRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SGlnaGxpZ2h0T3V0cHV0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNsaWNrRGF0YVBvaW50OiBFdmVudEVtaXR0ZXI8VGltZXNlcmllc0RhdGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdkM3RpbWVzZXJpZXMnKVxuICAgIHB1YmxpYyBkM0VsZW06IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgaGlnaGxpZ2h0T3V0cHV0OiBIaWdobGlnaHRPdXRwdXQ7XG5cbiAgICAvLyBET00gZWxlbWVudHNcbiAgICBwcm90ZWN0ZWQgcmF3U3ZnOiBhbnk7IC8vIGQzLlNlbGVjdGlvbjxFbnRlckVsZW1lbnQsIHt9LCBudWxsLCB1bmRlZmluZWQ+O1xuICAgIHByb3RlY3RlZCBncmFwaDogYW55O1xuICAgIHByb3RlY3RlZCBncmFwaEZvY3VzOiBhbnk7XG4gICAgcHJvdGVjdGVkIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgZHJhZ1JlY3Q6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0RzogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgY29weXJpZ2h0OiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c0c6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodEZvY3VzOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c2xhYmVsVGltZTogYW55O1xuXG4gICAgLy8gb3B0aW9ucyBmb3IgaW50ZXJhY3Rpb25cbiAgICBwcml2YXRlIGRyYWdnaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgZHJhZ1N0YXJ0OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ0N1cnJlbnQ6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBkcmFnZ2luZ01vdmU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkcmFnTW92ZVN0YXJ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkcmFnTW92ZVJhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgbW91c2Vkb3duQnJ1c2g6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBvbGRHcm91cFlheGlzOiBib29sZWFuO1xuXG4gICAgLy8gZGF0YSB0eXBlc1xuICAgIHByb3RlY3RlZCBwcmVwYXJlZERhdGE6IEludGVybmFsRGF0YUVudHJ5W10gPSBbXTsgLy8gOiBEYXRhU2VyaWVzW11cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE1hcDogTWFwPHN0cmluZywgRGF0YUNvbnN0PiA9IG5ldyBNYXAoKTtcbiAgICBwcm90ZWN0ZWQgbGlzdE9mVW9tczogc3RyaW5nW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgeVJhbmdlc0VhY2hVb206IFlSYW5nZXNbXSA9IFtdOyAvLyB5IGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyByYW5nZXMgZm9yIGVhY2ggdW9tXG4gICAgcHJvdGVjdGVkIGRhdGFZcmFuZ2VzOiBZUmFuZ2VzW10gPSBbXTsgLy8geSBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmFuZ2VzIG9mIGFsbCBkYXRhc2V0c1xuICAgIHByaXZhdGUgeEF4aXNSYW5nZTogVGltZXNwYW47IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSB4QXhpc1JhbmdlT3JpZ2luOiBhbnkgPSBbXTsgLy8geCBkb21haW4gcmFuZ2VcbiAgICBwcml2YXRlIHhBeGlzUmFuZ2VQYW46IFtudW1iZXIsIG51bWJlcl07IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSBsaXN0T2ZTZXBhcmF0aW9uID0gQXJyYXkoKTtcbiAgICBwcml2YXRlIHlBeGlzU2VsZWN0O1xuXG4gICAgcHJpdmF0ZSB4U2NhbGVCYXNlOiBkMy5TY2FsZVRpbWU8bnVtYmVyLCBudW1iZXI+OyAvLyBjYWxjdWxhdGUgZGlhZ3JhbSBjb29yZCBvZiB4IHZhbHVlXG4gICAgcHJpdmF0ZSB5U2NhbGVCYXNlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47IC8vIGNhbGN1bGF0ZSBkaWFncmFtIGNvb3JkIG9mIHkgdmFsdWVcbiAgICAvLyBwcml2YXRlIGRvdHNPYmplY3RzOiBhbnlbXTtcbiAgICBwcml2YXRlIGxhYmVsVGltZXN0YW1wOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGxhYmVsWENvb3JkOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGRpc3RMYWJlbFhDb29yZDogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBidWZmZXJTdW06IG51bWJlcjtcblxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDQwXG4gICAgfTtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuICAgIHByaXZhdGUgb3BhYyA9IHtcbiAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgaG92ZXI6IDAuMyxcbiAgICAgICAgY2xpY2s6IDAuNVxuICAgIH07XG4gICAgcHJpdmF0ZSBhZGRMaW5lV2lkdGggPSAyOyAvLyB2YWx1ZSBhZGRlZCB0byBsaW5ld2lkdGhcbiAgICBwcml2YXRlIGxvYWRpbmdDb3VudGVyID0gMDtcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lSWQ6IHN0cmluZztcblxuICAgIC8vIGRlZmF1bHQgcGxvdCBvcHRpb25zXG4gICAgcHJpdmF0ZSBwbG90T3B0aW9uczogRDNQbG90T3B0aW9ucyA9IHtcbiAgICAgICAgc2hvd1JlZmVyZW5jZVZhbHVlczogZmFsc2UsXG4gICAgICAgIGdlbmVyYWxpemVBbGx3YXlzOiB0cnVlLFxuICAgICAgICB0b2dnbGVQYW5ab29tOiB0cnVlLFxuICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgIGhvdmVyU3R5bGU6IEhvdmVyaW5nU3R5bGUucG9pbnQsXG4gICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIHlheGlzOiB0cnVlLFxuICAgICAgICBvdmVydmlldzogZmFsc2UsXG4gICAgICAgIHNob3dUaW1lTGFiZWw6IHRydWUsXG4gICAgICAgIHJlcXVlc3RCZWZvcmVBZnRlclZhbHVlczogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaXRlcmFibGVEaWZmZXJzLCBhcGksIGRhdGFzZXRJZFJlc29sdmVyLCB0aW1lU3J2YywgdHJhbnNsYXRlU2VydmljZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUlkID0gdGhpcy51dWlkdjQoKTtcbiAgICAgICAgLy8gdGhpcy5kb3RzT2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmF3U3ZnID0gZDMuc2VsZWN0KHRoaXMuZDNFbGVtLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGhGb2N1cyA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMubW91c2Vkb3duQnJ1c2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGRhdGFzZXRJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0TWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0RGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGlkKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXMoaWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHRpbWVzZXJpZXMpID0+IHRoaXMubG9hZEFkZGVkRGF0YXNldCh0aW1lc2VyaWVzKSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YXNldCkgPT4gdGhpcy5sb2FkQWRkZWREYXRhc2V0KGRhdGFzZXQpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzID0gW107XG4gICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbiA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICBsZXQgc3BsaWNlSWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChzcGxpY2VJZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKHNwbGljZUlkeCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YShlbnRyeSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmICghdHNEYXRhLnNlbGVjdGVkIHx8IHRzRGF0YS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0c0RhdGEuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdHNEYXRhLmxpbmVzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyA+IDAgPyB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgKz0gdGhpcy5hZGRMaW5lV2lkdGggOiB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgKz0gMDtcbiAgICAgICAgICAgIHRzRGF0YS5iYXJzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHRzRGF0YS5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzIHx8ICF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKHRzRGF0YS5pbnRlcm5hbElkLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtpbnRlcm5hbElkXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2ludGVybmFsSWRdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0c0RhdGEuYXhpc09wdGlvbnMudW9tO1xuICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ1VvbSA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZChlbCA9PiBlbC51b20gPT09IGlkZW50aWZpZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tLmlkcy5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGludGVybmFsSWQpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3RvcihpZGVudGlmaWVyLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMucHVzaChpbnRlcm5hbElkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBheGlzIGZvciB1b20gb2YgZGF0YXNldCB3aXRoIHNlbGVjdGVkIGludGVybmFsSWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tICE9PSB1bmRlZmluZWQgJiYgZXhpc3RpbmdVb20uaWRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgaGlnaGxpZ2h0IGF4aXMgb2YgdW9tIGlmIGFsbCBkYXRhc2V0cyB3aXRoIHRoaXMgdW9tIGFyZSBoaWdobGlnaHRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY291bnQgZGF0YXNldHMgZm9yIHNwZWNpZmljIHVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzLmxlbmd0aCAhPT0gZXhpc3RpbmdVb20uaWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0c0RhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlKSA9PiBlLmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAodHNEYXRhLnNlbGVjdGVkIHx8IHRzRGF0YS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0c0RhdGEuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggLT0gdGhpcy5hZGRMaW5lV2lkdGg7XG4gICAgICAgICAgICB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgPiAwID8gdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzIC09IHRoaXMuYWRkTGluZVdpZHRoIDogdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzIC09IDA7XG4gICAgICAgICAgICB0c0RhdGEuYmFycy5saW5lV2lkdGggLT0gdGhpcy5hZGRMaW5lV2lkdGg7XG5cbiAgICAgICAgICAgIGlmICh0c0RhdGEuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyB8fCAhdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3Rvcih0c0RhdGEuaW50ZXJuYWxJZCwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W3RzRGF0YS5pbnRlcm5hbElkXS5pZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0c0RhdGEuYXhpc09wdGlvbnMudW9tO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllciwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMgPSB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcy5maWx0ZXIoZWwgPT4gZWwgIT09IGludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBEM1Bsb3RPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMub2xkR3JvdXBZYXhpcyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcztcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJTdHlsZSAhPT0gSG92ZXJpbmdTdHlsZS5wb2ludCAmJiBvcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnZy5kM2xpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGxvdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5yYXdTdmcgJiYgdGhpcy55UmFuZ2VzRWFjaFVvbSkge1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgdGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEoZGF0YXNldCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjZW50ZXJUaW1lKHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNlbnRlcmVkVGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNlbnRlclRpbWVzcGFuKHRoaXMudGltZXNwYW4sIG5ldyBEYXRlKHRpbWVzdGFtcCkpO1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQoY2VudGVyZWRUaW1lc3Bhbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQobmV3IFRpbWVzcGFuKGZyb20sIHRvKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQWRkZWREYXRhc2V0KGRhdGFzZXQ6IElEYXRhc2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCBkYXRhc2V0KTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEoZGF0YXNldCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgZGF0YSBvZiBkYXRhc2V0XG4gICAgcHJpdmF0ZSBsb2FkRGF0YXNldERhdGEoZGF0YXNldDogSURhdGFzZXQsIGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvdW50ZXIgPT09IDApIHsgdGhpcy5vbkNvbnRlbnRMb2FkaW5nLmVtaXQodHJ1ZSk7IH1cbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlcisrO1xuXG4gICAgICAgIGlmIChkYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRoaXMudGltZXNwYW4sIDAuMik7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFRzRGF0YTxbbnVtYmVyLCBudW1iZXJdPihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZmxvdCcsXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMgfHwgdGhpcy5wbG90T3B0aW9ucy5yZXF1ZXN0QmVmb3JlQWZ0ZXJWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYWxpemU6IHRoaXMucGxvdE9wdGlvbnMuZ2VuZXJhbGl6ZUFsbHdheXMgfHwgZGF0YXNldE9wdGlvbnMuZ2VuZXJhbGl6ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyBmb3JjZVVwZGF0ZTogZm9yY2UgfVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5wcmVwYXJlVHNEYXRhKGRhdGFzZXQsIHJlc3VsdCksXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25Db21wbGV0ZUxvYWRpbmdEYXRhKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29tcGxldGVMb2FkaW5nRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlci0tO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nQ291bnRlciA9PT0gMCkgeyB0aGlzLm9uQ29udGVudExvYWRpbmcuZW1pdChmYWxzZSk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBwcmVwYXJlIGVhY2ggZGF0YXNldCBmb3IgdGhlIGdyYXBoIGFuZCBhZGRpbmcgaXQgdG8gYW4gYXJyYXkgb2YgZGF0YXNldHMuXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0lEYXRhc2V0fSBPYmplY3Qgb2YgdGhlIHdob2xlIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUc0RhdGEoZGF0YXNldDogSURhdGFzZXQsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4pOiB2b2lkIHtcblxuICAgICAgICAvLyBhZGQgc3Vycm91bmRpbmcgZW50cmllcyB0byB0aGUgc2V0XG4gICAgICAgIGlmIChkYXRhLnZhbHVlQmVmb3JlVGltZXNwYW4pIHsgZGF0YS52YWx1ZXMudW5zaGlmdChkYXRhLnZhbHVlQmVmb3JlVGltZXNwYW4pOyB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlQWZ0ZXJUaW1lc3BhbikgeyBkYXRhLnZhbHVlcy5wdXNoKGRhdGEudmFsdWVBZnRlclRpbWVzcGFuKTsgfVxuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS5kYXRhID0gZGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldElkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuXG4gICAgICAgIC8vIFRPRE86IGNoYW5nZSB1b20gZm9yIHRlc3RpbmdcbiAgICAgICAgLy8gaWYgKHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgIGRhdGFzZXQudW9tID0gJ21jJztcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGdlbmVyYXRlIHJhbmRvbSBjb2xvciwgaWYgY29sb3IgaXMgbm90IGRlZmluZWRcbiAgICAgICAgaWYgKHN0eWxlcy5jb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLmNvbG9yU2VydmljZS5nZXRDb2xvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5kIG9mIGNoZWNrIGZvciBkYXRhc2V0c1xuICAgICAgICBjb25zdCBkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgaW50ZXJuYWxJZDogZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICAgICAgaWQ6IChkYXRhc2V0SWR4ID49IDAgPyBkYXRhc2V0SWR4IDogdGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoKSxcbiAgICAgICAgICAgIGNvbG9yOiBzdHlsZXMuY29sb3IsXG4gICAgICAgICAgICBkYXRhOiBzdHlsZXMudmlzaWJsZSA/IGRhdGEudmFsdWVzLm1hcChkID0+ICh7IHRpbWVzdGFtcDogZFswXSwgdmFsdWU6IGRbMV0gfSkpIDogW10sXG4gICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHN0eWxlcy5jb2xvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiBzdHlsZXMucG9pbnRSYWRpdXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB1b206IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhc2V0LmxhYmVsLFxuICAgICAgICAgICAgICAgIHplcm9CYXNlZDogc3R5bGVzLnplcm9CYXNlZFlBeGlzLFxuICAgICAgICAgICAgICAgIHlBeGlzUmFuZ2U6IHN0eWxlcy55QXhpc1JhbmdlLFxuICAgICAgICAgICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbjogc3R5bGVzLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICBzZXBhcmF0ZVlBeGlzOiBzdHlsZXMuc2VwYXJhdGVZQXhpcyxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmU6IGRhdGFzZXQucGFyYW1ldGVycy5mZWF0dXJlLFxuICAgICAgICAgICAgICAgICAgICBwaGVub21lbm9uOiBkYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbixcbiAgICAgICAgICAgICAgICAgICAgb2ZmZXJpbmc6IGRhdGFzZXQucGFyYW1ldGVycy5vZmZlcmluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBzdHlsZXMudmlzaWJsZVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBzZXBhcmF0aW9uSWR4OiBudW1iZXIgPSB0aGlzLmxpc3RPZlNlcGFyYXRpb24uZmluZEluZGV4KChpZCkgPT4gaWQgPT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChzdHlsZXMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgaWYgKHNlcGFyYXRpb25JZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0T2ZTZXBhcmF0aW9uLnB1c2goZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbiA9IHRoaXMubGlzdE9mU2VwYXJhdGlvbi5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbHRlcm5hdGl2ZSBsaW5ld1dpZHRoID0gdGhpcy5wbG90T3B0aW9ucy5zZWxlY3RlZC5pbmNsdWRlcyhkYXRhc2V0LnVvbSlcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2YoZGF0YXNldC5pbnRlcm5hbElkKSA+PSAwKSB7XG4gICAgICAgICAgICBkYXRhRW50cnkubGluZXMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuICAgICAgICAgICAgZGF0YUVudHJ5LmxpbmVzLnBvaW50UmFkaXVzID4gMCA/IGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyArPSB0aGlzLmFkZExpbmVXaWR0aCA6IGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyArPSAwO1xuICAgICAgICAgICAgZGF0YUVudHJ5LmJhcnMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKGRhdGFFbnRyeS5pbnRlcm5hbElkLCBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmlkcy5wdXNoKGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBzZWxlY3RlZCBkYXRhc2V0cyBmb3IgaGlnaGxpZ2h0aW5nXG4gICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMuZmluZEluZGV4KGVsID0+IGVsID09PSBkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZWQgPSB0aGlzLmNvdW50R3JvdXBlZERhdGFzZXRzKGRhdGFFbnRyeS5heGlzT3B0aW9ucy51b20sIGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLmxlbmd0aCA9PT0gY291bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdICYmIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLnB1c2goZGF0YUVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhc2V0SWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2RhdGFzZXRJZHhdID0gZGF0YUVudHJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChkYXRhRW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkUmVmZXJlbmNlVmFsdWVEYXRhKGRhdGFzZXQuaW50ZXJuYWxJZCwgc3R5bGVzLCBkYXRhLCBkYXRhc2V0LnVvbSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0RhdGEoZGF0YUVudHJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBhZGQgcmVmZXJlbmNldmFsdWVkYXRhIHRvIHRoZSBkYXRhc2V0IChlLmcuIG1lYW4pLlxuICAgICAqIEBwYXJhbSBpbnRlcm5hbElkIHtTdHJpbmd9IFN0cmluZyB3aXRoIHRoZSBpZCBvZiBhIGRhdGFzZXRcbiAgICAgKiBAcGFyYW0gc3R5bGVzIHtEYXRhc2V0T3B0aW9uc30gT2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gZm9yIGRhdGFzZXQgc3R5bGluZ1xuICAgICAqIEBwYXJhbSBkYXRhIHtEYXRhfSBBcnJheSBvZiBBcnJheXMgY29udGFpbmluZyB0aGUgbWVhc3VyZW1lbnQtZGF0YSBvZiB0aGUgZGF0YXNldFxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIHVvbSBvZiBhIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFJlZmVyZW5jZVZhbHVlRGF0YShpbnRlcm5hbElkOiBzdHJpbmcsIHN0eWxlczogRGF0YXNldE9wdGlvbnMsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4sIHVvbTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFlbnRyeS5pbnRlcm5hbElkLnN0YXJ0c1dpdGgoJ3JlZicgKyBpbnRlcm5hbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHN0eWxlcy5zaG93UmVmZXJlbmNlVmFsdWVzLmZvckVhY2goKHJlZlZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmRGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJuYWxJZDogJ3JlZicgKyBpbnRlcm5hbElkICsgcmVmVmFsdWUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZWZWYWx1ZS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5yZWZlcmVuY2VWYWx1ZXNbcmVmVmFsdWUuaWRdLm1hcChkID0+ICh7IHRpbWVzdGFtcDogZFswXSwgdmFsdWU6IGRbMV0gfSkpLFxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogcmVmVmFsdWUuY29sb3JcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiB1b21cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChyZWZEYXRhRW50cnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZGF0YSB0byBjYWxjdWxhdGUgeSBheGlzIHJhbmdlIG9mIGVhY2ggZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZGF0YUVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIGRhdGFzZXQgcmVsYXRlZCBkYXRhLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwcm9jZXNzRGF0YShkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIGxldCBjYWxjdWxhdGVkUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBsZXQgY2FsY3VsYXRlZFByZVJhbmdlOiBNaW5NYXhSYW5nZTtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRPcmlnaW5SYW5nZTogTWluTWF4UmFuZ2U7XG4gICAgICAgIGxldCBwcmVkZWZpbmVkUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBpZiAoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UgJiYgZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UubWluICE9PSBkYXRhRW50cnkuYXhpc09wdGlvbnMueUF4aXNSYW5nZS5tYXgpIHtcbiAgICAgICAgICAgIHByZWRlZmluZWRSYW5nZSA9IGRhdGFFbnRyeS5heGlzT3B0aW9ucy55QXhpc1JhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdXRvRGF0YUV4dGVudDogYm9vbGVhbiA9IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb247XG5cbiAgICAgICAgLy8gZ2V0IG1pbiBhbmQgbWF4IHZhbHVlIG9mIGRhdGFcbiAgICAgICAgY29uc3QgZGF0YUV4dGVudCA9IGQzLmV4dGVudDxEYXRhRW50cnksIG51bWJlcj4oZGF0YUVudHJ5LmRhdGEsIChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FsY3VsYXRlZE9yaWdpblJhbmdlID0geyBtaW46IGRhdGFFeHRlbnRbMF0sIG1heDogZGF0YUV4dGVudFsxXSB9O1xuXG4gICAgICAgIGxldCBzZXREYXRhRXh0ZW50ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIG91dCBvZiBwcmVkZWZpbmVkIHJhbmdlXG4gICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UgJiYgIXRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UubWluID4gcHJlZGVmaW5lZFJhbmdlLm1heCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWF4LCBtYXg6IHByZWRlZmluZWRSYW5nZS5taW4gfTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUHJlUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1heCwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWluIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWluLCBtYXg6IHByZWRlZmluZWRSYW5nZS5tYXggfTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUHJlUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1pbiwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWF4IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJlZGVmaW5lZFJhbmdlLm1pbiA+IGRhdGFFeHRlbnRbMV0gfHwgcHJlZGVmaW5lZFJhbmdlLm1heCA8IGRhdGFFeHRlbnRbMF0pIHtcbiAgICAgICAgICAgICAgICBzZXREYXRhRXh0ZW50ID0gYXV0b0RhdGFFeHRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXREYXRhRXh0ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXREYXRhRXh0ZW50KSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UgPSB7IG1pbjogZGF0YUV4dGVudFswXSwgbWF4OiBkYXRhRXh0ZW50WzFdIH07XG4gICAgICAgICAgICB0aGlzLmV4dGVuZFJhbmdlKGNhbGN1bGF0ZWRSYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHlsZSBvcHRpb24gJ3plcm8gYmFzZWQgeS1heGlzJyBpcyBjaGVja2VkLFxuICAgICAgICAvLyB0aGUgYXhpcyB3aWxsIGJlIGFsaWduZWQgdG8gdG9wIDAgKHdpdGggZGF0YSBiZWxvdyAwKSBvciB0byBib3R0b20gMCAod2l0aCBkYXRhIGFib3ZlIDApXG4gICAgICAgIC8vIGxldCB6ZXJvQmFzZWRWYWx1ZSA9IC0xO1xuICAgICAgICBpZiAoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnplcm9CYXNlZCAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgaWYgKGRhdGFFeHRlbnRbMV0gPD0gMCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZS5tYXggPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdGVkUHJlUmFuZ2UpIHsgY2FsY3VsYXRlZFByZVJhbmdlLm1heCA9IDA7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhRXh0ZW50WzBdID49IDApIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UubWluID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRlZFByZVJhbmdlKSB7IGNhbGN1bGF0ZWRQcmVSYW5nZS5taW4gPSAwOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdEYXRhc2V0SWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlKSA9PiBlLmludGVybmFsSWQgPT09IGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcblxuICAgICAgICAvLyBzZXQgcmFuZ2UsIHVvbSBhbmQgaWQgZm9yIGVhY2ggZGF0YXNldFxuICAgICAgICBpZiAoZGF0YUVudHJ5LnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0gPSB7XG4gICAgICAgICAgICAgICAgdW9tOiBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tLFxuICAgICAgICAgICAgICAgIGlkOiBkYXRhRW50cnkuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy56ZXJvQmFzZWQsXG4gICAgICAgICAgICAgICAgb3V0T2ZyYW5nZTogc2V0RGF0YUV4dGVudCxcbiAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IGF1dG9EYXRhRXh0ZW50LFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGNhbGN1bGF0ZWRSYW5nZS5taW4pICYmIGlzRmluaXRlKGNhbGN1bGF0ZWRSYW5nZS5tYXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XS5yYW5nZSA9IGNhbGN1bGF0ZWRSYW5nZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdLnByZVJhbmdlID0gY2FsY3VsYXRlZFByZVJhbmdlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0ub3JpZ2luUmFuZ2UgPSBjYWxjdWxhdGVkT3JpZ2luUmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCByYW5nZSBhbmQgYXJyYXkgb2YgSURzIGZvciBlYWNoIHVvbSB0byBnZW5lcmF0ZSB5LWF4aXMgbGF0ZXIgb25cbiAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbSA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzLmZvckVhY2goKHlSYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHlSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZEluZGV4KChlKSA9PiBlLnVvbSA9PT0geVJhbmdlLnVvbSk7XG4gICAgICAgICAgICAgICAgbGV0IHlyYW5nZU9iajogWVJhbmdlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdW9tOiB5UmFuZ2UudW9tLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogeVJhbmdlLnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBwcmVSYW5nZTogeVJhbmdlLnByZVJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5SYW5nZTogeVJhbmdlLm9yaWdpblJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpZHM6IFt5UmFuZ2UuaWRdLFxuICAgICAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IHlSYW5nZS56ZXJvQmFzZWQsXG4gICAgICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IHlSYW5nZS5vdXRPZnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IHlSYW5nZS5hdXRvUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHlSYW5nZS5wYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5hdXRvUmFuZ2UgfHwgeVJhbmdlLmF1dG9SYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLnByZVJhbmdlICYmIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5wcmVSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdwcmVSYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnByZVJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdyYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5hdXRvUmFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5UmFuZ2Uub3V0T2ZyYW5nZSAhPT0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLm91dE9mcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAnb3JpZ2luUmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5yYW5nZSA9IHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5vcmlnaW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAncmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFrZUxhdGVzdChpZHgsIHlSYW5nZSwgJ3JhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0uaWRzLnB1c2goeVJhbmdlLmlkKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20ucHVzaCh5cmFuZ2VPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmdyYXBoKSB7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2V0IHJhbmdlIHRvIGRlZmF1bHQgaW50ZXJ2YWwsIGlmIG1pbiBhbmQgbWF4IG9mIHJhbmdlIGFyZSBub3Qgc2V0LlxuICAgICAqIEBwYXJhbSByYW5nZSB7TWluTWF4UmFuZ2V9IHJhbmdlIHRvIGJlIHNldFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBleHRlbmRSYW5nZShyYW5nZTogTWluTWF4UmFuZ2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJhbmdlLm1pbiA9PT0gcmFuZ2UubWF4KSB7XG4gICAgICAgICAgICByYW5nZS5taW4gPSByYW5nZS5taW4gLSAxO1xuICAgICAgICAgICAgcmFuZ2UubWF4ID0gcmFuZ2UubWF4ICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNoZWNrIHJhbmdlcyBmb3IgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBJbmRleCBvZiBlbGVtZW50XG4gICAgICogQHBhcmFtIG9iaiB7WVJhbmdlc30gbmV3IG9iamVjdCB0byBiZSBjb21wYXJlZCB3aXRoIG9sZFxuICAgICAqIEBwYXJhbSBwb3Mge1N0cmluZ30gdHlwZSBvZiByYW5nZSAoZS5nLiBwcmVSYW5nZSwgcmFuZ2UsIG9yaWdpblJhbmdlKVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tDdXJyZW50TGF0ZXN0KGlkeDogbnVtYmVyLCBvYmo6IFlSYW5nZXMsIHBvczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5taW4gPiBvYmpbcG9zXS5taW4gJiYgIWlzTmFOKG9ialtwb3NdLm1pbikpIHtcbiAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdLm1pbiA9IG9ialtwb3NdLm1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10ubWF4IDwgb2JqW3Bvc10ubWF4ICYmICFpc05hTihvYmpbcG9zXS5tYXgpKSB7XG4gICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5tYXggPSBvYmpbcG9zXS5tYXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZXQgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBJbmRleCBvZiBlbGVtZW50XG4gICAgICogQHBhcmFtIG9iaiB7WVJhbmdlc30gbmV3IG9iamVjdFxuICAgICAqIEBwYXJhbSBwb3Mge1N0cmluZ30gdHlwZSBvZiByYW5nZSAoZS5nLiBwcmVSYW5nZSwgcmFuZ2UsIG9yaWdpblJhbmdlKVxuICAgICAqL1xuICAgIHByaXZhdGUgdGFrZUxhdGVzdChpZHg6IG51bWJlciwgb2JqOiBZUmFuZ2VzLCBwb3M6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXSA9IG9ialtwb3NdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tICsgKHRoaXMucGxvdE9wdGlvbnMuc2hvd1RpbWVMYWJlbCA/IDAgOiAyMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgZ3JhcGggZGlhZ3JhbS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkud2lkdGguYmFzZVZhbC52YWx1ZSAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMubWF4TGFiZWx3aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIHJhbmdlIGZvciBidWlsZGluZyB0aGUgeSBheGlzIGZvciBlYWNoIHVvbSBvZiBldmVyeSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHRoYXQgaXMgdGhlIHVvbSBvZiBhIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldHlBeGlzUmFuZ2UodW9tOiBzdHJpbmcpOiBNaW5NYXhSYW5nZSB7XG4gICAgICAgIGxldCByYW5nZU9iaiA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZChlbCA9PiBlbC51b20gPT09IHVvbSk7XG4gICAgICAgIGlmIChyYW5nZU9iaikge1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHplcm8gYmFzZWQgeSBheGlzXG4gICAgICAgICAgICAvLyBpZiAocmFuZ2VPYmouemVyb0Jhc2VkKSB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHJhbmdlT2JqLnplcm9CYXNlZFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJhbmdlLm1pbiA9IDA7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmFuZ2UubWF4ID0gMDtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VPYmoucmFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIGVycm9yOiB1b20gZG9lcyBub3QgZXhpc3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBwbG90IHRoZSBncmFwaCBhbmQgaXRzIGRlcGVuZGVuY2llc1xuICAgICAqIChncmFwaCBsaW5lLCBncmFwaCBheGVzLCBldmVudCBoYW5kbGVycylcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcGxvdEdyYXBoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dCA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgIGlkczogbmV3IE1hcCgpXG4gICAgICAgIH07XG4gICAgICAgIGlmICghdGhpcy55UmFuZ2VzRWFjaFVvbSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy5saXN0T2ZVb21zLmZpbmRJbmRleCgodW9tKSA9PiB1b20gPT09IGVudHJ5LmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICBpZiAoaWR4IDwgMCkgeyB0aGlzLmxpc3RPZlVvbXMucHVzaChlbnRyeS5heGlzT3B0aW9ucy51b20pOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkYXB0IGF4aXMgaGlnaGxpZ2h0aW5nLCB3aGVuIGNoYW5naW5nIGdyb3VwaW5nIG9mIHkgYXhpc1xuICAgICAgICBpZiAodGhpcy5vbGRHcm91cFlheGlzICE9PSB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlWXNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYWxjdWxhdGVXaWR0aCgpO1xuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdyYXBoRm9jdXMuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5idWZmZXJTdW0gPSAwO1xuICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBudWxsO1xuXG4gICAgICAgIC8vIGdldCByYW5nZSBvZiB4IGFuZCB5IGF4aXNcbiAgICAgICAgdGhpcy54QXhpc1JhbmdlID0gdGhpcy50aW1lc3BhbjtcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICBsZXQgeUF4aXNBcnJheTogWVJhbmdlc1tdID0gW107XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgfHwgdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHlBeGlzQXJyYXkgPSB0aGlzLnlSYW5nZXNFYWNoVW9tO1xuICAgICAgICAgICAgLy8gcHVzaCBhbGwgbGlzdE9mU2VwYXJhdGlvbiBpbnRvIHlBeGlzQXJyYXlcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RPZlNlcGFyYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbi5mb3JFYWNoKChzZXBJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RWw6IFlSYW5nZXMgPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiBlbC5pZCA9PT0gc2VwSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3RWwgJiYgKHlBeGlzQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBuZXdFbC5pZCkgPCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxsIGRhdGFzZXQgZm9yIHNwZWNpZmljIHVvbSBhcmUgc2VwYXJhdGVkIGZyb20gZ3JvdXBpbmcsIHRoZSB5YXhpcyBvZiB0aGlzIHVvbSB3aWxsIGJlIHJlbW92ZWQgZnJvbSBheGlzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdVb20gPSB5QXhpc0FycmF5LmZpbmRJbmRleChlbCA9PiBlbC51b20gPT09IG5ld0VsLnVvbSAmJiAoZWwuaWRzICE9PSB1bmRlZmluZWQgfHwgZWwuaWRzLmxlbmd0aCA9PT0gMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgaWQgZnJvbSBpZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRlSWQgPSB5QXhpc0FycmF5W2V4aXN0aW5nVW9tXS5pZHMuZmluZEluZGV4KGlkID0+IGlkID09PSBzZXBJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZUlkID49IDApIHsgeUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLnNwbGljZShkZWxldGVJZCwgMSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgeUF4aXNBcnJheVtleGlzdGluZ1VvbV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNBcnJheS5zcGxpY2UoZXhpc3RpbmdVb20sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHlBeGlzQXJyYXkucHVzaChuZXdFbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlBeGlzQXJyYXkgPSB0aGlzLmRhdGFZcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgeUF4aXNBcnJheS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZmlyc3QgPSAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5vZmZzZXQgPSB0aGlzLmJ1ZmZlclN1bTtcblxuICAgICAgICAgICAgICAgIGxldCB5QXhpc1Jlc3VsdCA9IHRoaXMuZHJhd1lheGlzKGVudHJ5KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlQmFzZSA9IHlBeGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSB5QXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSB5QXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVudHJ5LnlTY2FsZSA9IHlBeGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnlTY2FsZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeCBhbmQgeSBheGlzXG4gICAgICAgIHRoaXMuZHJhd1hheGlzKHRoaXMuYnVmZmVyU3VtKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJyk7XG5cbiAgICAgICAgdGhpcy5kcmF3QWxsR3JhcGhMaW5lcygpO1xuICAgICAgICB0aGlzLmFkZFRpbWVzcGFuSnVtcEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCByZWN0XG4gICAgICAgIGlmICghdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgLy8gZXhlY3V0ZSB3aGVuIGl0IGlzIG5vdCBhbiBvdmVydmlldyBkaWFncmFtXG4gICAgICAgICAgICAvLyBtb3VzZSBldmVudHMgaG92ZXJpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUxpbmVIb3ZlcmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnZy5kM2xpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMudG9nZ2xlUGFuWm9vbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZDMuem9vbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3N0YXJ0JywgdGhpcy56b29tU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd6b29tJywgdGhpcy56b29tSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZW5kJywgdGhpcy56b29tRW5kSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKGQzLmRyYWcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzdGFydCcsIHRoaXMucGFuU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdkcmFnJywgdGhpcy5wYW5Nb3ZlSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZW5kJywgdGhpcy5wYW5FbmRIYW5kbGVyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29weXJpZ2h0TGFiZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgd2hlbiBpdCBpcyBvdmVydmlldyBkaWFncmFtXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IFtudW1iZXIsIG51bWJlcl0gPSB0aGlzLmdldFhEb21haW5CeVRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgbGV0IG92ZXJ2aWV3VGltZXNwYW5JbnRlcnZhbCA9IFtpbnRlcnZhbFswXSwgaW50ZXJ2YWxbMV1dO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYnJ1c2hcbiAgICAgICAgICAgIGxldCBicnVzaCA9IGQzLmJydXNoWCgpXG4gICAgICAgICAgICAgICAgLmV4dGVudChbWzAsIDBdLCBbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdXSlcbiAgICAgICAgICAgICAgICAub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb24gbW91c2VjbGljayBjaGFuZ2UgdGltZSBhZnRlciBicnVzaCB3YXMgbW92ZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2Vkb3duQnJ1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lQnlDb29yZDogW251bWJlciwgbnVtYmVyXSA9IHRoaXMuZ2V0VGltZXN0YW1wQnlDb29yZChkMy5ldmVudC5zZWxlY3Rpb25bMF0sIGQzLmV2ZW50LnNlbGVjdGlvblsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGltZUJ5Q29vcmRbMF0sIHRpbWVCeUNvb3JkWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBicnVzaCB0byBzdmdcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoKVxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoLm1vdmUsIG92ZXJ2aWV3VGltZXNwYW5JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYWRkIGV2ZW50IHRvIHNlbGVjdGlvbiB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHJlLXJlbmRlcmluZyBvZiBicnVzaFxuICAgICAgICAgICAgICogYWRkIHN0eWxlIG9mIGJydXNoIHNlbGVjdGlvbiBoZXJlXG4gICAgICAgICAgICAgKiBlLmcuICdmaWxsJyBmb3IgY29sb3IsXG4gICAgICAgICAgICAgKiAnc3Ryb2tlJyBmb3IgYm9yZGVybGluZS1jb2xvcixcbiAgICAgICAgICAgICAqICdzdHJva2UtZGFzaGFycmF5JyBmb3IgY3VzdG9taXppbmcgYm9yZGVybGluZS1zdHlsZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQuc2VsZWN0QWxsKCcuc2VsZWN0aW9uJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZG8gbm90IGFsbG93IGNsZWFyIHNlbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNlbGVjdEFsbCgnLm92ZXJsYXknKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IHRvIHJlc2l6aW5nIGhhbmRsZSB0byBhbGxvdyBjaGFuZ2UgdGltZSBvbiByZXNpemVcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC5zZWxlY3RBbGwoJy5oYW5kbGUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdyZWQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDAuMylcbiAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUG9pbnRIb3ZlcmluZyhlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGxpbmU6IGQzLkxpbmU8RGF0YUVudHJ5Pikge1xuICAgICAgICB0aGlzLmdyYXBoQm9keS5zZWxlY3RBbGwoJy5ob3ZlckRvdHMnKVxuICAgICAgICAgICAgLmRhdGEoZW50cnkuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnZhbHVlKSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaG92ZXJEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkOiBEYXRhRW50cnkpID0+ICdob3Zlci1kb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIGxpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgbGluZS55KCkpXG4gICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzICsgMylcbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKGQ6IERhdGFFbnRyeSkgPT4gdGhpcy5tb3VzZU92ZXJQb2ludEhvdmVyaW5nKGQsIGVudHJ5KSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZDogRGF0YUVudHJ5KSA9PiB0aGlzLm1vdXNlT3V0UG9pbnRIb3ZlcmluZyhkLCBlbnRyeSkpXG4gICAgICAgICAgICAub24oJ21vdXNlZG93bicsIChkOiBEYXRhRW50cnkpID0+IHRoaXMuY2xpY2tEYXRhUG9pbnQoZCwgZW50cnkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmVIb3ZlcmluZygpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZS5mb2N1cycsIHRoaXMubW91c2Vtb3ZlSGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQuZm9jdXMnLCB0aGlzLm1vdXNlb3V0SGFuZGxlcik7XG4gICAgICAgIC8vIGxpbmUgaW5zaWRlIGdyYXBoXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1saW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MScsICcwJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgLy8gbGFiZWwgaW5zaWRlIGdyYXBoXG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3doaXRlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWwgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXdlaWdodCcsICdsaWdodGVyJyk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtdGltZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrRGF0YVBvaW50KGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljayBwb2ludCcpO1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlcm5hbElkOiBJbnRlcm5hbERhdGFzZXRJZCA9IHRoaXMuZGF0YXNldElkUmVzb2x2ZXIucmVzb2x2ZUludGVybmFsSWQoZW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBhcGl1cmwgPSBleHRlcm5hbElkLnVybDtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuOiBUaW1lc3BhbiA9IHsgZnJvbTogZC50aW1lc3RhbXAsIHRvOiBkLnRpbWVzdGFtcCB9O1xuXG4gICAgICAgICAgICAvLyByZXF1ZXN0IGFsbCB0aW1lc2VyaWVzIHRoYXQgaGF2ZSBkYXRhIGZvciB0aGUgc2FtZSBvZmZlcmluZyBhbmQgZmVhdHVyZVxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VGltZXNlcmllcyhhcGl1cmwsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvZmZlcmluZzogZW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycy5vZmZlcmluZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycy5mZWF0dXJlLmlkXG4gICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAodHNBcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNlcmllcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHNBcnJheS5mb3JFYWNoKHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc2VyaWVzLnB1c2godHMuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgdHMgZGF0YSBieSB0aW1lc2VyaWVzIElEIGZvciBzcGVjaWZpYyBvZmZlcmluZyBhbmQgZmVhdHVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VGltZXNlcmllc0RhdGEoYXBpdXJsLCB0aW1lc2VyaWVzLCB0aW1lc3BhbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHNEYXRhKSA9PiB0aGlzLm9uQ2xpY2tEYXRhUG9pbnQuZW1pdCh0c0RhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRpbWVzcGFuSnVtcEJ1dHRvbnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBkYXRhVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBsZXQgZm9ybWVyVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgbGV0IGxhdGVyVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMucmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdElkeEluVGltZXNwYW4gPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+ICh0aGlzLnRpbWVzcGFuLmZyb20gPCBlWzBdICYmIHRoaXMudGltZXNwYW4udG8gPiBlWzBdKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0SWR4SW5UaW1lc3BhbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdElkeEluVGltZXNwYW4gPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+IChlWzBdID4gdGhpcy50aW1lc3Bhbi5mcm9tICYmIGVbMF0gPiB0aGlzLnRpbWVzcGFuLnRvKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0SWR4SW5UaW1lc3BhbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlclRpbWVzdGFtcCA9IGVudHJ5LmRhdGFbZW50cnkuZGF0YS5sZW5ndGggLSAxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gZW50cnkuZGF0YS5maW5kSW5kZXgoZSA9PiAoZVswXSA8IHRoaXMudGltZXNwYW4uZnJvbSAmJiBlWzBdIDwgdGhpcy50aW1lc3Bhbi50bykgJiYgaXNGaW5pdGUoZVsxXSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtZXJUaW1lc3RhbXAgPSBlbnRyeS5kYXRhW2VudHJ5LmRhdGEubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRhVmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uV2lkdGggPSA1MDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRSaWdodCA9IDE1O1xuICAgICAgICAgICAgaWYgKGZvcm1lclRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSB0aGlzLmJhY2tncm91bmQuYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Zvcm1lckJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGJ1dHRvbldpZHRoICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyU3VtICsgJywgMCknKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jZW50ZXJUaW1lKGZvcm1lclRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgMCArIHRoaXMuYnVmZmVyU3VtICsgbGVmdFJpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgdGhpcy5oZWlnaHQgLyAyICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgMCArIHRoaXMuYnVmZmVyU3VtICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiAtIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCAwICsgdGhpcy5idWZmZXJTdW0gKyBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCAwICsgdGhpcy5idWZmZXJTdW0gKyAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXRlclRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSB0aGlzLmJhY2tncm91bmQuYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xhdGVyQnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzUwcHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy53aWR0aCAtIDUwKSArICcsIDApJylcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2VudGVyVGltZShsYXRlclRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy53aWR0aCAtIGxlZnRSaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIHRoaXMuaGVpZ2h0IC8gMiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIHRoaXMud2lkdGggLSAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIHRoaXMud2lkdGggLSBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCB0aGlzLndpZHRoIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiArIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvcHlyaWdodExhYmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQpIHtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICAgICAgLy8gZGVmYXVsdCA9IHRvcCBsZWZ0XG4gICAgICAgICAgICBsZXQgeCA9IDA7IC8vIGxlZnRcbiAgICAgICAgICAgIGxldCB5ID0gMDsgLy8gKyB0aGlzLm1hcmdpbi50b3A7IC8vIHRvcFxuICAgICAgICAgICAgdGhpcy5jb3B5cmlnaHQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpO1xuICAgICAgICAgICAgbGV0IGNvcHlyaWdodExhYmVsID0gdGhpcy5jb3B5cmlnaHQuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLnRleHQodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQubGFiZWwpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvcHlyaWdodCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnZ3JleScpO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuY29weXJpZ2h0LnBvc2l0aW9uWCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHggPSBiYWNrZ3JvdW5kLncgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhjb3B5cmlnaHRMYWJlbC5ub2RlKCkpLnc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQucG9zaXRpb25ZID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHkgPSBiYWNrZ3JvdW5kLmggLSB0aGlzLm1hcmdpbi50b3AgKiAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHlUcmFuc2Zvcm0gPSB5ICsgdGhpcy5nZXREaW1lbnNpb25zKGNvcHlyaWdodExhYmVsLm5vZGUoKSkuaCAtIDM7XG4gICAgICAgICAgICBsZXQgeFRyYW5zZm9ybSA9IHRoaXMuYnVmZmVyU3VtICsgeDtcbiAgICAgICAgICAgIGNvcHlyaWdodExhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHhUcmFuc2Zvcm0gKyAnLCAnICsgeVRyYW5zZm9ybSArICcpJyk7XG4gICAgICAgICAgICB0aGlzLmNvcHlyaWdodC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29weXJpZ2h0JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS5oKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4VHJhbnNmb3JtICsgJywgJyArIHkgKyAnKScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgZm9yIGV2ZXJ5IHByZXByYXJlZCBkYXRhIGVudHJ5IHRoZSBncmFwaCBsaW5lLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkcmF3QWxsR3JhcGhMaW5lcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0cgPSB0aGlzLmdyYXBoRm9jdXMuYXBwZW5kKCdnJyk7XG4gICAgICAgIGlmICgodGhpcy5wbG90T3B0aW9ucy5ob3ZlclN0eWxlID09PSBIb3ZlcmluZ1N0eWxlLnBvaW50KSAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGZvciBwb2ludCBob3ZlcmluZ1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLmRyYXdHcmFwaExpbmUoZW50cnkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHggZGlhZ3JhbSBjb29yZGluYXRlIGZvciB0aGUgYnJ1c2ggcmFuZ2VcbiAgICAgKiBmb3IgdGhlIG92ZXJ2aWV3IGRpYWdyYW0gYnkgdGhlIHNlbGVjdGVkIHRpbWUgaW50ZXJ2YWwgb2YgdGhlIG1haW4gZGlhZ3JhbS5cbiAgICAgKiBDYWxjdWxhdGUgdG8gZ2V0IGJydXNoIGV4dGVudCB3aGVuIG1haW4gZGlhZ3JhbSB0aW1lIGludGVydmFsIGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRYRG9tYWluQnlUaW1lc3RhbXAoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxjdWxhdGUgcmFuZ2Ugb2YgYnJ1c2ggd2l0aCB0aW1lc3RhbXAgYW5kIG5vdCBkaWFncmFtIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIGZvcm11bGE6XG4gICAgICAgICAqIGJydXNoX21pbiA9XG4gICAgICAgICAqIChvdmVydmlld193aWR0aCAvIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSAqIChicnVzaF9taW4gLSBvdmVydmlld19taW4pXG4gICAgICAgICAqIGJydXNfbWF4ID1cbiAgICAgICAgICogKG92ZXJ2aWV3X3dpZHRoIC8gKG92ZXJ2aWV3X21heCAtIG92ZXJ2aWV3X21pbikpICogKGJydXNoX21heCAtIG92ZXJ2aWV3X21pbilcbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG1pbk92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICBsZXQgbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICBsZXQgbWluRGlhZ3JhbVRpbWVzdGFtcCA9IHRoaXMubWFpblRpbWVJbnRlcnZhbC5mcm9tO1xuICAgICAgICBsZXQgbWF4RGlhZ3JhbVRpbWVzdGFtcCA9IHRoaXMubWFpblRpbWVJbnRlcnZhbC50bztcbiAgICAgICAgbGV0IGRpYWdyYW1XaWR0aCA9IHRoaXMud2lkdGg7XG5cbiAgICAgICAgbGV0IGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCA9IG1heE92ZXJ2aWV3VGltZUludGVydmFsIC0gbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG4gICAgICAgIGxldCBkaXZPdmVydmlld1RpbWVXaWR0aCA9IGRpYWdyYW1XaWR0aCAvIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1pbkNhbGNCcnVzaDogbnVtYmVyID0gZGl2T3ZlcnZpZXdUaW1lV2lkdGggKiAobWluRGlhZ3JhbVRpbWVzdGFtcCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsKTtcbiAgICAgICAgbGV0IG1heENhbGNCcnVzaDogbnVtYmVyID0gZGl2T3ZlcnZpZXdUaW1lV2lkdGggKiAobWF4RGlhZ3JhbVRpbWVzdGFtcCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsKTtcblxuICAgICAgICByZXR1cm4gW21pbkNhbGNCcnVzaCwgbWF4Q2FsY0JydXNoXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHRpbWVzdGFtcCBmb3IgdGhlIG1haW4gZGlhZ3JhbSBjYWxjdWxhdGVkXG4gICAgICogYnkgdGhlIHNlbGVjdGVkIGNvb3JkaW5hdGUgb2YgdGhlIGJydXNoIHJhbmdlLlxuICAgICAqIEBwYXJhbSBtaW5DYWxjQnJ1c2gge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1pbmltdW0gY29vcmRpbmF0ZSBvZiB0aGUgc2VsZWN0ZWQgYnJ1c2ggcmFuZ2UuXG4gICAgICogQHBhcmFtIG1heENhbGNCcnVzaCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgbWF4aW11bSBjb29yZGluYXRlIG9mIHRoZSBzZWxlY3RlZCBicnVzaCByYW5nZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcEJ5Q29vcmQobWluQ2FsY0JydXNoOiBudW1iZXIsIG1heENhbGNCcnVzaDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxjdWxhdGUgcmFuZ2Ugb2YgYnJ1c2ggd2l0aCB0aW1lc3RhbXAgYW5kIG5vdCBkaWFncmFtIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIGZvcm11bGE6XG4gICAgICAgICAqIG1pbkRpYWdyYW1UaW1lc3RhbXAgPVxuICAgICAgICAgKiAoKG1pbkNhbGNCcnVzaCAvIG92ZXJ2aWV3X3dpZHRoKSAqIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSArIG92ZXJ2aWV3X21pblxuICAgICAgICAgKiBtYXhEaWFncmFtVGltZXN0YW1wID1cbiAgICAgICAgICogKChtYXhDYWxjQnJ1c2ggLyBvdmVydmlld193aWR0aCkgKiAob3ZlcnZpZXdfbWF4IC0gb3ZlcnZpZXdfbWluKSkgKyBvdmVydmlld19taW5cbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG1pbk92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICBsZXQgbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICBsZXQgZGlhZ3JhbVdpZHRoID0gdGhpcy53aWR0aDtcblxuICAgICAgICBsZXQgZGlmZk92ZXJ2aWV3VGltZUludGVydmFsID0gbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgLSBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1pbkRpYWdyYW1UaW1lc3RhbXA6IG51bWJlciA9ICgobWluQ2FsY0JydXNoIC8gZGlhZ3JhbVdpZHRoKSAqIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCkgKyBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1heERpYWdyYW1UaW1lc3RhbXA6IG51bWJlciA9ICgobWF4Q2FsY0JydXNoIC8gZGlhZ3JhbVdpZHRoKSAqIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCkgKyBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcblxuICAgICAgICByZXR1cm4gW21pbkRpYWdyYW1UaW1lc3RhbXAsIG1heERpYWdyYW1UaW1lc3RhbXBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZHJhd3MgdGhlIHggYXhpcyB0byB0aGUgc3ZnIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGJ1ZmZlclhyYW5nZSB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBsZWZ0IGVkZ2UgYW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd1hheGlzKGJ1ZmZlclhyYW5nZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHJhbmdlIGZvciB4IGF4aXMgc2NhbGVcbiAgICAgICAgdGhpcy54U2NhbGVCYXNlID0gZDMuc2NhbGVUaW1lKClcbiAgICAgICAgICAgIC5kb21haW4oW25ldyBEYXRlKHRoaXMueEF4aXNSYW5nZS5mcm9tKSwgbmV3IERhdGUodGhpcy54QXhpc1JhbmdlLnRvKV0pXG4gICAgICAgICAgICAucmFuZ2UoW2J1ZmZlclhyYW5nZSwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20odGhpcy54U2NhbGVCYXNlKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGQudmFsdWVPZigpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFNlY29uZCA9ICc6JVMnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRNaW51dGUgPSAnJUg6JU0nLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF5ID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0V2VlayA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0WWVhciA9ICclWSc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBkMy50aW1lU2Vjb25kKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZUhvdXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWludXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lRGF5KGRhdGUpIDwgZGF0ZSA/IGZvcm1hdEhvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVZZWFyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmb3JtYXRZZWFyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyaWQpIHtcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHggZ3JpZCBsaW5lc1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAgICAgLmNhbGwoeEF4aXNcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDApLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyB0ZXh0IGxhYmVsIGZvciB0aGUgeCBheGlzXG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dUaW1lTGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgYnVmZmVyWHJhbmdlKSAvIDIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCd0aW1lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHRoZSB5IGF4aXMgZm9yIGVhY2ggZGF0YXNldC5cbiAgICAgKiBFYWNoIHVvbSBoYXMgaXRzIG93biBheGlzLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBhIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WWF4aXMoZW50cnk6IFlSYW5nZXMpOiBZU2NhbGUge1xuICAgICAgICBsZXQgc2hvd0F4aXMgPSAodGhpcy5wbG90T3B0aW9ucy5vdmVydmlldyA/IGZhbHNlIDogKHRoaXMucGxvdE9wdGlvbnMueWF4aXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLnBsb3RPcHRpb25zLnlheGlzKSk7XG4gICAgICAgIC8vIGNoZWNrIGZvciB5IGF4aXMgZ3JvdXBpbmdcbiAgICAgICAgbGV0IHJhbmdlO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBncm91cGVkIGF4aXNcbiAgICAgICAgICAgIGxldCB1b21JZHggPSB0aGlzLmxpc3RPZlVvbXMuZmluZEluZGV4KCh1b20pID0+IHVvbSA9PT0gZW50cnkudW9tKTtcbiAgICAgICAgICAgIGlmICh1b21JZHggPj0gMCAmJiBlbnRyeS5pZHMgJiYgZW50cnkuaWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBncm91cGVkIHdpdGggbW9yZSB0aGFuIG9ueSBkYXRhc2V0cyAoaWYgdW9tIGhhcyBtb3JlIHRoYW4gb25lIGRhdGFzZXRzKVxuICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXR5QXhpc1JhbmdlKGVudHJ5LnVvbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRlZCBpZCAoaWYgbm90IGVudHJ5LnVvbSkgT1IgZ3JvdXBlZCwgYnV0IG9ubHkgb25lIGRhdGFzZXQgKGlmIGVudHJ5IGlzIGdyb3VwZWQgYnV0IGhhcyBvbmx5IG9uZSBpZCA9PiB1c2UgcmFuZ2Ugb2YgdGhpcyBkYXRhc2V0KVxuICAgICAgICAgICAgICAgIGxldCBlbnRyeUVsZW0gPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiAoZW50cnkuaWQgPyBlbC5pZCA9PT0gZW50cnkuaWQgOiBlbC5pZCA9PT0gZW50cnkuaWRzWzBdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5RWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGVudHJ5RWxlbS5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZ2UgPSBlbnRyeUVsZW0ucHJlUmFuZ2UgPyBlbnRyeUVsZW0ucHJlUmFuZ2UgOiBlbnRyeUVsZW0ucmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdW5ncm91cGVkIGF4aXNcbiAgICAgICAgICAgIGxldCBlbnRyeUVsZW0gPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiBlbC5pZCA9PT0gZW50cnkuaWQpO1xuICAgICAgICAgICAgaWYgKGVudHJ5RWxlbSkge1xuICAgICAgICAgICAgICAgIHJhbmdlID0gZW50cnlFbGVtLnByZVJhbmdlID8gZW50cnlFbGVtLnByZVJhbmdlIDogZW50cnlFbGVtLnJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlNaW4gPSAtMTtcbiAgICAgICAgbGV0IHlNYXggPSAxO1xuICAgICAgICBpZiAocmFuZ2UgIT09IHVuZGVmaW5lZCAmJiByYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgeU1pbiA9IHJhbmdlLm1pbjtcbiAgICAgICAgICAgIHlNYXggPSByYW5nZS5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByYW5nZSBmb3IgeSBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHJhbmdlT2Zmc2V0ID0gKHlNYXggLSB5TWluKSAqIDAuMTA7XG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lNaW4gLSByYW5nZU9mZnNldCwgeU1heCArIHJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgICAgICBsZXQgeUF4aXNHZW4gPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDUpO1xuICAgICAgICBsZXQgYnVmZmVyID0gMDtcblxuICAgICAgICAvLyBvbmx5IGlmIHlBeGlzIHNob3VsZCBub3QgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoIXNob3dBeGlzKSB7XG4gICAgICAgICAgICB5QXhpc0dlblxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzXG4gICAgICAgIGNvbnN0IGF4aXMgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh5QXhpc0dlbik7XG5cbiAgICAgICAgLy8gb25seSBpZiB5QXhpcyBzaG91bGQgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoc2hvd0F4aXMpIHtcbiAgICAgICAgICAgIC8vIGRyYXcgeSBheGlzIGxhYmVsXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkeScsICcxZW0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5YXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250JywgJzE4cHggdGltZXMnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgIC50ZXh0KChlbnRyeS5pZCA/IChlbnRyeS51b20gKyAnIEAgJyArIGVudHJ5LnBhcmFtZXRlcnMuZmVhdHVyZS5sYWJlbCkgOiBlbnRyeS51b20pKTtcbiAgICAgICAgICAgIC8vIC50ZXh0KChlbnRyeS5pZCA/IChlbnRyeS5wYXJhbWV0ZXJzLnN0YXRpb24gKyAnICgnICsgZW50cnkudW9tICsgJyAnICsgZW50cnkucGFyYW1ldGVycy5waGVub21lbm9uICsgJyknKSA6IGVudHJ5LnVvbSkpO1xuXG4gICAgICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnLnlheGlzVGV4dExhYmVsJylcbiAgICAgICAgICAgICAgICAuY2FsbCh0aGlzLndyYXBUZXh0LCAoYXhpcy5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCAtIDEwKSwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgY29uc3QgYXhpc1dpZHRoID0gYXhpcy5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgMTAgKyB0aGlzLmdldERpbWVuc2lvbnModGV4dC5ub2RlKCkpLmg7XG4gICAgICAgICAgICAvLyBpZiB5QXhpcyBzaG91bGQgbm90IGJlIHZpc2libGUsIGJ1ZmZlciB3aWxsIGJlIHNldCB0byAwXG4gICAgICAgICAgICBidWZmZXIgPSAoc2hvd0F4aXMgPyBlbnRyeS5vZmZzZXQgKyAoYXhpc1dpZHRoIDwgdGhpcy5tYXJnaW4ubGVmdCA/IHRoaXMubWFyZ2luLmxlZnQgOiBheGlzV2lkdGgpIDogMCk7XG4gICAgICAgICAgICBjb25zdCBheGlzV2lkdGhEaXYgPSAoYXhpc1dpZHRoIDwgdGhpcy5tYXJnaW4ubGVmdCA/IHRoaXMubWFyZ2luLmxlZnQgOiBheGlzV2lkdGgpO1xuXG4gICAgICAgICAgICBpZiAoIWVudHJ5LmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgYXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBidWZmZXIgKyAnLCAwKScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBheGlzV2lkdGhEaXYgLSB0aGlzLm1hcmdpbi5sZWZ0O1xuICAgICAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRleHRPZmYgPSAtICh0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgICAgICBpZiAoZW50cnkuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0ZXh0T2ZmID0gdGhpcy5tYXJnaW4ubGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQuYXR0cigneScsIDAgLSB0ZXh0T2ZmKTtcblxuICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFdpZHRoID0gdGV4dC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0SGVpZ2h0ID0gdGV4dC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0ZXh0Lm5vZGUoKS5nZXRCQm94KCkueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdGV4dC5ub2RlKCkuZ2V0QkJveCgpLnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBheGlzcmFkaXVzID0gNDtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRPZlBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdGV4dFBvc2l0aW9uLnkgKyB0ZXh0SGVpZ2h0IC8gMiArIGF4aXNyYWRpdXMgLyAyLCAvLyArIDIgYmVjYXVzZSByYWRpdXMgPT09IDRcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5hYnModGV4dFBvc2l0aW9uLnggKyB0ZXh0V2lkdGgpIC0gYXhpc3JhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBwb2ludE9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Lmlkcy5mb3JFYWNoKChlbnRyeUlEKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YWVudHJ5ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZChlbCA9PiBlbC5pbnRlcm5hbElkID09PSBlbnRyeUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXNEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2F4aXNkb3QtJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIGRhdGFlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4Jywgc3RhcnRPZlBvaW50cy54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBzdGFydE9mUG9pbnRzLnkgLSBwb2ludE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBheGlzcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludE9mZnNldCArPSBheGlzcmFkaXVzICogMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFlbnRyeSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoZWwgPT4gZWwuaW50ZXJuYWxJZCA9PT0gZW50cnkuaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YWVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpc0RvdHMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdheGlzZG90LScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIHN0YXJ0T2ZQb2ludHMueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBzdGFydE9mUG9pbnRzLnkgLSBwb2ludE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGF4aXNyYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgaWQgdG8gdW9tLCBpZiBncm91cCB5YXhpcyBpcyB0b2dnbGVkLCBlbHNlIHNldCBpZCB0byBkYXRhc2V0IGlkXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IChlbnRyeS5pZCA/IGVudHJ5LmlkIDogZW50cnkudW9tKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWQsIGVudHJ5LnVvbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNEaXYgPSB0aGlzLmdyYXBoLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3lheGlzJyArIGlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzRGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBheGlzV2lkdGhEaXYpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2dyZXknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgKHRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQgPyB0aGlzLm9wYWMuY2xpY2sgOiB0aGlzLm9wYWMuZGVmYXVsdCkpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmhvdmVyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuY2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNldXAnLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuY2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQgPSAhdGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZW50cnlBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5QXJyYXkucHVzaChlbnRyeS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUFycmF5ID0gZW50cnkuaWRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0TGluZShlbnRyeUFycmF5KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFlbnRyeS5maXJzdCkge1xuICAgICAgICAgICAgICAgIGF4aXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeS5vZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF4aXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWF4TGFiZWx3aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeSBncmlkIGxpbmVzXG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgICAgICAuY2FsbChkMy5heGlzTGVmdCh5U2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrcyg1KVxuICAgICAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyBidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgICAgeVNjYWxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciBvYmplY3QgeUF4aXNTZWxlY3QgZXhpc3RzIHdpdGggc2VsZWN0ZWQgdW9tLlxuICAgICAqIElmIGl0IGRvZXMgbm90IGV4aXN0LCBpdCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHBhcmFtIGlkZW50aWZpZXIge1N0cmluZ30gU3RyaW5nIHByb3ZpZGluZyB0aGUgc2VsZWN0ZWQgdW9tIG9yIHRoZSBzZWxlY3RlZCBkYXRhc2V0IElELlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllcjogc3RyaW5nLCB1b206IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgaWQ6IGlkZW50aWZpZXIsXG4gICAgICAgICAgICBpZHM6ICh0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgPyB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcyA6IFtdKSxcbiAgICAgICAgICAgIHVvbTogdW9tLFxuICAgICAgICAgICAgY2xpY2tlZDogKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCA/IHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA6IGZhbHNlKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBhZGFwdCB5IGF4aXMgaGlnaGxpZ2h0aW5nIHRvIHNlbGVjdGVkIFRTIG9yIHNlbGVjdGVkIHVvbVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlWXNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgbGV0IGdyb3VwTGlzdCA9IHt9O1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmU6IGdyb3VwXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMueUF4aXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gdGhpcy55QXhpc1NlbGVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuaWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogZGF0YUVsLmF4aXNPcHRpb25zLnVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3RbaWRdID0gbmV3U2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmNsaWNrZWQgJiYgZWwudW9tICE9PSBlbC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdTZWxlY3RvcjogWUF4aXNTZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlbC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbZWwuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFFbC5heGlzT3B0aW9ucy51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtlbC5pZF0gPSBuZXdTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlOiBubyBncm91cFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IHRoaXMueUF4aXNTZWxlY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbklEO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFFbCAmJiBkYXRhRWwuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBpcyBkYXRhc2V0IHdpdGggaW50ZXJuYWxJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbklEID0gZGF0YUVsLmludGVybmFsSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBpcyB1b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25JRCA9IGVsLnVvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBMaXN0W3NlbGVjdGlvbklEXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VW9tOiBZQXhpc1NlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNlbGVjdGlvbklELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiBlbC51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0gPSBjdXJyZW50VW9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uaWRzLnB1c2goZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwudW9tID09PSBzZWxlY3Rpb25JRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgZm9yIGdyb3VwZWQgdW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwZWREYXRhc2V0cyA9IHRoaXMuY291bnRHcm91cGVkRGF0YXNldHMoc2VsZWN0aW9uSUQsIGVsLnVvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uaWRzLmxlbmd0aCA9PT0gZ3JvdXBlZERhdGFzZXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBmb3IgdW5ncm91cGVkIGRhdGFzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3Rbc2VsZWN0aW9uSURdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdCA9IHt9OyAvLyB1bnNlbGVjdCBhbGwgLSB5IGF4aXNcbiAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3QgPSBncm91cExpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbGRHcm91cFlheGlzID0gdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYW1vdW50IG9mIGRhdGFzZXRzIHRoYXQgYXJlIGdyb3VwZWQgd2l0aCB0aGUgc2FtZSB1b21cbiAgICAgKiBAcGFyYW0gdW9tIHtTdHJpbmd9IHVvbVxuICAgICAqIEBwYXJhbSBpZCB7U3RyaW5nfSBpbnRlcm5hbElkIG9mIHRoZSBkYXRhc2V0IHRoYXQgY2FuIGJlIHNraXBwZWRcbiAgICAgKiByZXR1cm5zIHtOdW1iZXJ9IGFtb3VudCBvZiBkYXRhc2V0cyB3aXRoIHRoZSBnaXZlbiB1b21cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvdW50R3JvdXBlZERhdGFzZXRzKHVvbTogc3RyaW5nLCBpZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGFycmF5VW9tQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsICE9PSBudWxsICYmIGVsLnVvbSA9PT0gdW9tICYmIGVsLmlkICE9PSBpZCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoZHMgPT4gZHMuaW50ZXJuYWxJZCA9PT0gZWwuaWQgJiYgZHMuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyA9PT0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkgeyBhcnJheVVvbUNvdW50Kys7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnJheVVvbUNvdW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNldCBzZWxlY3RlZCBJZHMgdGhhdCBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXG4gICAgICogQHBhcmFtIGlkcyB7QXJyYXl9IEFycmF5IG9mIFN0cmluZ3MgY29udGFpbmluZyB0aGUgSWRzLlxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIHVvbSBmb3IgdGhlIHNlbGVjdGVkIElkc1xuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0TGluZShpZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGxldCBjaGFuZ2VGYWxzZTogSGlnaGxpZ2h0RGF0YXNldFtdID0gW107XG4gICAgICAgIGxldCBjaGFuZ2VUcnVlOiBIaWdobGlnaHREYXRhc2V0W10gPSBbXTtcbiAgICAgICAgaWRzLmZvckVhY2goKElEKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihJRCkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZUZhbHNlLnB1c2goeyBpZDogSUQsIGNoYW5nZTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2VUcnVlLnB1c2goeyBpZDogSUQsIGNoYW5nZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IGNoYW5nZUZhbHNlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZElkcyhjaGFuZ2VGYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSWRzKGNoYW5nZVRydWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY2hhbmdlcyBzdGF0ZSBvZiBzZWxlY3RlZCBJZHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VTZWxlY3RlZElkcyh0b0hpZ2hsaWdodERhdGFzZXQ6IEhpZ2hsaWdodERhdGFzZXRbXSwgY2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgICAgIHRvSGlnaGxpZ2h0RGF0YXNldC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkSWQob2JqLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5zcGxpY2UodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkgPT09IG9iai5pZCksIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b0hpZ2hsaWdodERhdGFzZXQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2Yob2JqLmlkKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZElkKG9iai5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25EYXRhc2V0U2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkRGF0YXNldElkcyk7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgZ3JhcGggbGluZSBmb3IgZWFjaCBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBhIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGRyYXdHcmFwaExpbmUoZW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IGdldFlheGlzUmFuZ2UgPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmQoKG9iaikgPT4gb2JqLmlkcy5pbmRleE9mKGVudHJ5LmludGVybmFsSWQpID4gLTEpO1xuICAgICAgICAvLyBjaGVjayBmb3IgeSBheGlzIGdyb3VwaW5nXG4gICAgICAgIGxldCBnZXRZYXhpc1JhbmdlID0gdGhpcy5nZXRZYXhpc1JhbmdlKGVudHJ5KTtcblxuICAgICAgICBpZiAoZW50cnkuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZ2V0WWF4aXNSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHlTY2FsZUJhc2UgPSBnZXRZYXhpc1JhbmdlLnlTY2FsZTtcblxuICAgICAgICAgICAgICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGJvZHkgdG8gY2xpcCBncmFwaFxuICAgICAgICAgICAgICAgIC8vIHVuaXF1ZSBJRCBnZW5lcmF0ZWQgdGhyb3VnaCB0aGUgY3VycmVudCB0aW1lIChjdXJyZW50IHRpbWUgd2hlbiBpbml0aWFsaXplZClcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnlTZWxlY3RvckNsaXAgPSAnY2xpcCcgKyB0aGlzLmN1cnJlbnRUaW1lSWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpjbGlwUGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIHF1ZXJ5U2VsZWN0b3JDbGlwKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBncmFoIGxpbmVcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoQm9keSA9IHRoaXMuZ3JhcGhcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgcXVlcnlTZWxlY3RvckNsaXAgKyAnKScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGdyYXBoIGxpbmVcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMuY3JlYXRlTGluZSh0aGlzLnhTY2FsZUJhc2UsIHlTY2FsZUJhc2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuZGF0dW0oZW50cnkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgZW50cnkubGluZXMubGluZVdpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHkuc2VsZWN0QWxsKCcuZ3JhcGhEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoZW50cnkuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnZhbHVlKSkpXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyYXBoRG90cycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkOiBEYXRhRW50cnkpID0+ICdkb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgbGluZS54KCkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGxpbmUueSgpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQb2ludEhvdmVyaW5nKGVudHJ5LCBsaW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3dzIGxhYmVsaW5nIHZpYSBtb3VzbW92ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlbW92ZUhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICB0aGlzLmxhYmVsVGltZXN0YW1wID0gW107XG4gICAgICAgIHRoaXMubGFiZWxYQ29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5kaXN0TGFiZWxYQ29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnksIGVudHJ5SWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmdldEl0ZW1Gb3JYKGNvb3Jkc1swXSArIHRoaXMuYnVmZmVyU3VtLCBlbnRyeS5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RpYWdyYW1JbmRpY2F0b3IoZW50cnksIGlkeCwgY29vcmRzWzBdLCBlbnRyeUlkeCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvdXRwdXRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0SWRzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXRwdXRJZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdCBzaG93IGxpbmUgaW4gZ3JhcGggd2hlbiBubyBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZXN0YW1wXG4gICAgICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsYXN0ID0gMCxcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgZmlyc3QgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGxhYmVsQXJyYXk6IFtkMy5CYXNlVHlwZSwgZDMuQmFzZVR5cGVdW10gPSBbXSxcbiAgICAgICAgICAgICAgICB0ZXh0UmVjdEFycmF5OiBkMy5CYXNlVHlwZVtdID0gZDMuc2VsZWN0QWxsKCcuZm9jdXMtdmlzaWJpbGl0eScpLm5vZGVzKCk7XG5cbiAgICAgICAgICAgIC8vIGdldCBhbmQgc29ydCBhbGwgdGV4dCBsYWJlbHMgYW5kIHJlY3RhbmdsZSBvZiB0aGUgdGV4dCBsYWJlbHMgYW5kIGNvbWJpbmUgcmVsYXRlZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0UmVjdEFycmF5Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxBcnJheS5wdXNoKFt0ZXh0UmVjdEFycmF5W2ldLCB0ZXh0UmVjdEFycmF5W2kgKyAxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc29yeSBieSB5IGNvb3JkaW5hdGVcbiAgICAgICAgICAgIGxhYmVsQXJyYXkuc29ydCgoYSwgYikgPT4gcGFyc2VGbG9hdChkMy5zZWxlY3QoYVswXSkuYXR0cigneScpKSAtIHBhcnNlRmxvYXQoZDMuc2VsZWN0KGJbMF0pLmF0dHIoJ3knKSkpO1xuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgaWYgb3ZlcmxhcHBpbmdcbiAgICAgICAgICAgIGxhYmVsQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBwYWlycyBvZiAyIG9iamVjdHMgKHJlY3RhbmdsZSAoZXF1YWwpIGFuZCBsYWJlbCAob2RkKSlcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoZWxbMF0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCwgaSwgZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdChlbFswXSkuYXR0cigndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5Y29vcmQ6IG51bWJlciA9IHBhcnNlRmxvYXQoZDMuc2VsZWN0KGVsWzBdKS5hdHRyKCd5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgKGxhc3QgKyAzMCkgLSB5Y29vcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMTApIHsgb2Zmc2V0ID0gMTA7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KGVsWzFdKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGksIGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMy5zZWxlY3QoZWxbMV0pLmF0dHIoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeWNvb3JkOiBudW1iZXIgPSBwYXJzZUZsb2F0KGQzLnNlbGVjdChlbFswXSkuYXR0cigneScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IE1hdGgubWF4KDAsIChsYXN0ICsgMzApIC0geWNvb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8IDEwKSB7IG9mZnNldCA9IDEwOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QgPSBvZmZzZXQgKyB5Y29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25IaWdobGlnaHRDaGFuZ2VkLmVtaXQodGhpcy5oaWdobGlnaHRPdXRwdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgaGlkZXMgdGhlIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3VzZW91dEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaGlkZURpYWdyYW1JbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBzdGFydGluZyB0aGUgZHJhZyBoYW5kbGluZyBmb3IgdGhlIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYW5TdGFydEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVTdGFydCA9IGQzLmV2ZW50Lng7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVSYW5nZSA9IFt0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNvbnRyb2xscyB0aGUgcGFubmluZyAoZHJhZ2dpbmcpIG9mIHRoZSBncmFwaC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhbk1vdmVIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nTW92ZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmRyYWdNb3ZlU3RhcnQgJiYgdGhpcy5kcmFnZ2luZ01vdmUpIHtcbiAgICAgICAgICAgIGxldCBkaWZmID0gLShkMy5ldmVudC54IC0gdGhpcy5kcmFnTW92ZVN0YXJ0KTsgLy8gZDMuZXZlbnQuc3ViamVjdC54KTtcbiAgICAgICAgICAgIGxldCBhbW91bnRUaW1lc3RhbXAgPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMV0gLSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMF07XG4gICAgICAgICAgICBsZXQgcmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgPSBhbW91bnRUaW1lc3RhbXAgLyB0aGlzLndpZHRoO1xuICAgICAgICAgICAgbGV0IG5ld1RpbWVNaW4gPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMF0gKyAocmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgKiBkaWZmKTtcbiAgICAgICAgICAgIGxldCBuZXdUaW1lTWF4ID0gdGhpcy5kcmFnTW92ZVJhbmdlWzFdICsgKHJhdGlvVGltZXN0YW1wRGlhZ0Nvb3JkICogZGlmZik7XG5cbiAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZVBhbiA9IFtuZXdUaW1lTWluLCBuZXdUaW1lTWF4XTtcbiAgICAgICAgICAgIHRoaXMudGltZXNwYW4gPSB7IGZyb206IHRoaXMueEF4aXNSYW5nZVBhblswXSwgdG86IHRoaXMueEF4aXNSYW5nZVBhblsxXSB9O1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5kcyB0aGUgZHJhZ2dpbmcgY29udHJvbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhbkVuZEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnhBeGlzUmFuZ2VQYW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2VQYW5bMF0sIHRoaXMueEF4aXNSYW5nZVBhblsxXSk7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTW92ZVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnhBeGlzUmFuZ2VQYW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBzdGFydHMgdGhlIHpvb20gaGFuZGxpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSB6b29tU3RhcnRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIC8vIGRlcGVuZGVudCBvbiBwb2ludCBvciBsaW5lIGhvdmVyaW5nXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbi5wdXNoKFt0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkcmF3cyBhIHJlY3RhbmdsZSB3aGVuIHpvb20gaXMgc3RhcnRlZCBhbmQgdGhlIG1vdXNlIGlzIG1vdmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21IYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3RHJhZ1JlY3RhbmdsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5kcyB0aGUgem9vbSBoYW5kbGluZyBhbmQgY2FsY3VsYXRlcyB0aGUgdmlhIHpvb20gc2VsZWN0ZWQgdGltZSBpbnRlcnZhbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21FbmRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0IHx8ICF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gYmFjayB0byBvcmlnaW4gcmFuZ2UgKGZyb20gLSB0bylcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdWzBdLCB0aGlzLnhBeGlzUmFuZ2VPcmlnaW5bMF1bMV0pO1xuICAgICAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbiA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeERvbWFpblJhbmdlO1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0WzBdIDw9IHRoaXMuZHJhZ0N1cnJlbnRbMF0pIHtcbiAgICAgICAgICAgICAgICB4RG9tYWluUmFuZ2UgPSB0aGlzLmdldHhEb21haW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4RG9tYWluUmFuZ2UgPSB0aGlzLmdldHhEb21haW4odGhpcy5kcmFnQ3VycmVudFswXSwgdGhpcy5kcmFnU3RhcnRbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54QXhpc1JhbmdlID0geyBmcm9tOiB4RG9tYWluUmFuZ2VbMF0sIHRvOiB4RG9tYWluUmFuZ2VbMV0gfTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvKTtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzZXREcmFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lKHhTY2FsZUJhc2U6IGQzLlNjYWxlVGltZTxudW1iZXIsIG51bWJlcj4sIHlTY2FsZUJhc2U6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPikge1xuICAgICAgICByZXR1cm4gZDMubGluZTxEYXRhRW50cnk+KClcbiAgICAgICAgICAgIC5kZWZpbmVkKChkKSA9PiAhaXNOYU4oZC52YWx1ZSkpXG4gICAgICAgICAgICAueCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhEaWFnQ29vcmQgPSB4U2NhbGVCYXNlKGQudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHhEaWFnQ29vcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQueERpYWdDb29yZCA9IHhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueSgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHlEaWFnQ29vcmQgPSB5U2NhbGVCYXNlKGQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeURpYWdDb29yZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZC55RGlhZ0Nvb3JkID0geURpYWdDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUxpbmVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZU92ZXJQb2ludEhvdmVyaW5nKGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gdGhpcy5kYXRhc2V0TWFwLmdldChlbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIGxldCByZWN0QmFjayA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGNvb3Jkc1swXSA+PSAwICYmIGNvb3Jkc1swXSA8PSByZWN0QmFjay53aWR0aCAmJiBjb29yZHNbMV0gPj0gMCAmJiBjb29yZHNbMV0gPD0gcmVjdEJhY2suaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGhvdmVyZWQgZG90XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKS5hdHRyKCdvcGFjaXR5JywgMC44KS5hdHRyKCdyJywgJzhweCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgbGV0IGRvdExhYmVsID0gdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGAke2QudmFsdWV9ICR7ZW50cnkuYXhpc09wdGlvbnMudW9tfSAke21vbWVudChkLnRpbWVzdGFtcCkuZm9ybWF0KCdERC5NTS5ZWSBISDptbScpfWApXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZUhvdmVyRG90TGFiZWwnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKTtcbiAgICAgICAgICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bSkgLyAyID4gY29vcmRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTGVmdFNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVjdFg6IG51bWJlciA9IGQueERpYWdDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZC55RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGxldCByZWN0VzogbnVtYmVyID0gdGhpcy5nZXREaW1lbnNpb25zKGRvdExhYmVsLm5vZGUoKSkudyArIDg7XG4gICAgICAgICAgICAgICAgbGV0IHJlY3RIOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS5oOyAvLyArIDQ7XG4gICAgICAgICAgICAgICAgaWYgKCFvbkxlZnRTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RYID0gZC54RGlhZ0Nvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkLnlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoY29vcmRzWzFdICsgcmVjdEggKyA0KSA+IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGxhYmVsIGJlbG93IHggYXhpc1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRlIGxhYmVsIHRvIGEgaGlnaGVyIHBsYWNlLiAtIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWDogbnVtYmVyID0gZC54RGlhZ0Nvb3JkICsgNCArIDE1O1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IGQueURpYWdDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICBpZiAoIW9uTGVmdFNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxYID0gZC54RGlhZ0Nvb3JkIC0gcmVjdFcgKyA0IC0gMTU7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsWSA9IGQueURpYWdDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBsYWJlbFggKyAnLCAnICsgbGFiZWxZICsgJyknKTtcbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBvdXRwdXQgb2YgaGlnaGxpZ2h0ZWQgZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGQudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICBpZHM6IG5ldyBNYXAoKS5zZXQoZW50cnkuaW50ZXJuYWxJZCwgeyB0aW1lc3RhbXA6IGQudGltZXN0YW1wLCB2YWx1ZTogZC52YWx1ZSB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodENoYW5nZWQuZW1pdCh0aGlzLmhpZ2hsaWdodE91dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlT3V0UG9pbnRIb3ZlcmluZyhkOiBEYXRhRW50cnksIGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSkge1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzKTtcbiAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WWF4aXNSYW5nZShlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpOiBZUmFuZ2VzIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgZW50cnkgZGF0YXNldCBzaG91bGQgYmUgc2VwYXJhdGVkIG9yIGVudHJ5IGRhdGFzZXRzIHNob3VsZCBiZSBncm91cGVkXG4gICAgICAgIGlmICghZW50cnkuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyAmJiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueVJhbmdlc0VhY2hVb20uZmluZCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiBvYmoudW9tID09PSBlbnRyeS5heGlzT3B0aW9ucy51b20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSAvLyB1b20gZG9lcyBleGlzdCBpbiB0aGlzLnlSYW5nZXNFYWNoVW9tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYmogIT09IG51bGwgJiYgb2JqLmlkID09PSBlbnRyeS5pbnRlcm5hbElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gLy8gaWQgZG9lcyBleGlzdCBpbiB0aGlzLmRhdGFZcmFuZ2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdGltZXN0YW1wIG9mIHByb3ZpZGVkIHggZGlhZ3JhbSBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0gc3RhcnQge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1pbmltdW0gZGlhZ3JhbSBjb29yZGluYXRlLlxuICAgICAqIEBwYXJhbSBlbmQge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1heGltdW0gZGlhZ3JhbSBjb29yZGluYXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0eERvbWFpbihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgZG9tTWluQXJyID0gW107XG4gICAgICAgIGxldCBkb21NYXhBcnIgPSBbXTtcbiAgICAgICAgbGV0IGRvbU1pbjogbnVtYmVyO1xuICAgICAgICBsZXQgZG9tTWF4OiBudW1iZXI7XG4gICAgICAgIGxldCB0bXA7XG4gICAgICAgIGxldCBsb3dlc3RNaW4gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIGxldCBsb3dlc3RNYXggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgc3RhcnQgKz0gdGhpcy5idWZmZXJTdW07XG4gICAgICAgIGVuZCArPSB0aGlzLmJ1ZmZlclN1bTtcblxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgZG9tTWluQXJyLnB1c2goZW50cnkuZGF0YS5maW5kKChlbGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS54RGlhZ0Nvb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLnhEaWFnQ29vcmQgPj0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGRvbU1heEFyci5wdXNoKGVudHJ5LmRhdGEuZmluZCgoZWxlbSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ueERpYWdDb29yZCA+PSBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5W2luZGV4XSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZG9tTWluQXJyLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRvbU1pbkFycltpXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gZG9tTWluQXJyW2ldLnhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgaWYgKHRtcCA8IGxvd2VzdE1pbikge1xuICAgICAgICAgICAgICAgICAgICBsb3dlc3RNaW4gPSB0bXA7XG4gICAgICAgICAgICAgICAgICAgIGRvbU1pbiA9IGRvbU1pbkFycltpXS50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGRvbU1heEFyci5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkb21NYXhBcnJbal0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGRvbU1heEFycltqXS54RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPCBsb3dlc3RNYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXN0TWF4ID0gdG1wO1xuICAgICAgICAgICAgICAgICAgICBkb21NYXggPSBkb21NYXhBcnJbal0udGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2RvbU1pbiwgZG9tTWF4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNvbmZpZ3VyYXRlcyBhbmQgZHJhd3MgdGhlIHJlY3RhbmdsZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdEcmFnUmVjdGFuZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0KSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmRyYWdDdXJyZW50ID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG5cbiAgICAgICAgY29uc3QgeDEgPSBNYXRoLm1pbih0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5tYXgodGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kcmFnUmVjdCAmJiAhdGhpcy5kcmFnUmVjdEcpIHtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsLW9wYWNpdHknLCAuMilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmx1ZScpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gdGhpcy5kcmFnUmVjdEcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHgxICsgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWRyYWcnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdC5hdHRyKCd3aWR0aCcsIHgyIC0geDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZGlzYWJsZXMgdGhlIGRyYXdpbmcgcmVjdGFuZ2xlIGNvbnRyb2wuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldERyYWcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdSZWN0Rykge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0RyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgYSBzcGVjaWZpYyBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0geCB7TnVtYmVyfSBDb29yZGluYXRlcyBvZiB0aGUgbW91c2UgaW5zaWRlIHRoZSBkaWFncmFtLlxuICAgICAqIEBwYXJhbSBkYXRhIHtEYXRhRW50cnl9IEFycmF5IHdpdGggdGhlIGRhdGEgb2YgZWFjaCBkYXRhc2V0IGVudHJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0SXRlbUZvclgoeDogbnVtYmVyLCBkYXRhOiBEYXRhRW50cnlbXSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy54U2NhbGVCYXNlLmludmVydCh4KTtcbiAgICAgICAgY29uc3QgYmlzZWN0RGF0ZSA9IGQzLmJpc2VjdG9yKChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xuICAgICAgICB9KS5sZWZ0O1xuICAgICAgICByZXR1cm4gYmlzZWN0RGF0ZShkYXRhLCBpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkaXNhYmxlcyB0aGUgbGFiZWxpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlRGlhZ3JhbUluZGljYXRvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmZvY3VzLXZpc2liaWxpdHknKVxuICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBlbmFibGVzIHRoZSBsYWJsZWluZyBvZiBlYWNoIGRhdGFzZXQgZW50cnkuXG4gICAgICogQHBhcmFtIGVudHJ5IHtJbnRlcm5hbERhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgcG9zaXRpb24gb2YgdGhlIGRhdGFzZXQgZW50cnkgaW4gdGhlIGRhdGEgYXJyYXkuXG4gICAgICogQHBhcmFtIHhDb29yZE1vdXNlIHtOdW1iZXJ9IE51bWJlciBvZiB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZS5cbiAgICAgKiBAcGFyYW0gZW50cnlJZHgge051bWJlcn0gTnVtYmVyIG9mIHRoZSBpbmRleCBvZiB0aGUgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93RGlhZ3JhbUluZGljYXRvciA9IChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGlkeDogbnVtYmVyLCB4Q29vcmRNb3VzZTogbnVtYmVyLCBlbnRyeUlkeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW06IERhdGFFbnRyeSA9IGVudHJ5LmRhdGFbaWR4XTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3RMYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBudWxsO1xuXG4gICAgICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQgJiYgaXRlbS55RGlhZ0Nvb3JkICYmIGl0ZW1bMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2hlcmUgbW91c2UgaXNcbiAgICAgICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICAgIC8vIHNob3cgbGFiZWwgaWYgZGF0YSBhdmFpbGFibGUgZm9yIHRpbWVcbiAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgdHJ1ZSwgZW50cnlJZHgpO1xuXG4gICAgICAgICAgICBsZXQgeE1vdXNlQW5kQnVmZmVyID0geENvb3JkTW91c2UgKyB0aGlzLmJ1ZmZlclN1bTtcbiAgICAgICAgICAgIGxldCBsYWJlbEJ1ZmZlciA9ICgodGhpcy50aW1lc3Bhbi5mcm9tIC8gKHRoaXMudGltZXNwYW4udG8gLSB0aGlzLnRpbWVzcGFuLmZyb20pKSAqIDAuMDAwMSlcbiAgICAgICAgICAgICAgICAqICgodGhpcy50aW1lc3Bhbi5mcm9tIC8gKHRoaXMudGltZXNwYW4udG8gLSB0aGlzLnRpbWVzcGFuLmZyb20pKSAqIDAuMDAwMSk7XG5cbiAgICAgICAgICAgIGxhYmVsQnVmZmVyID0gTWF0aC5tYXgoMTAsIGxhYmVsQnVmZmVyKTtcblxuICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoZW50cnksIGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW0sIGVudHJ5SWR4LCB4TW91c2VBbmRCdWZmZXIpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS54RGlhZ0Nvb3JkID49IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW0gfHwgeE1vdXNlQW5kQnVmZmVyIDwgaXRlbS54RGlhZ0Nvb3JkIC0gbGFiZWxCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIGZhbHNlLCBlbnRyeUlkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh4TW91c2VBbmRCdWZmZXIgPCBpdGVtLnhEaWFnQ29vcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGF0YVtpZHggLSAxXSAmJiAoTWF0aC5hYnMoZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkIC0geE1vdXNlQW5kQnVmZmVyKSA8IE1hdGguYWJzKGl0ZW0ueERpYWdDb29yZCAtIHhNb3VzZUFuZEJ1ZmZlcikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBjbG9zZXN0IGVsZW1lbnQgdG8gbW91c2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoZW50cnksIGVudHJ5LmRhdGFbaWR4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lSW5kaWNhdG9yTGFiZWwoZW50cnkuZGF0YVtpZHggLSAxXSwgZW50cnlJZHgsIHhNb3VzZUFuZEJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgdHJ1ZSwgZW50cnlJZHgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBncmFwaCB3aWR0aCBhbmQgcmFuZ2UgYmV0d2VlbiBkYXRhIHBvaW50IGFuZCBtb3VzZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkID49IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVudHJ5LmRhdGFbaWR4IC0gMV0ueERpYWdDb29yZCA8PSB0aGlzLmJ1ZmZlclN1bVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkICsgbGFiZWxCdWZmZXIgPCB4TW91c2VBbmRCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IHNldCBob3ZlcmluZyBmb3IgbGFiZWxidWZmZXIgYWZ0ZXIgbGFzdCBhbmQgYmVmb3JlIGZpcnN0IHZhbHVlIG9mIHRoZSBncmFwaFxuICAgICAgICAgICAgLy8gaGlkZSBsYWJlbCBpZiBubyBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZVxuICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCBmYWxzZSwgZW50cnlJZHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hhbmdlIHZpc2liaWxpdHkgb2YgbGFiZWwgYW5kIHdoaXRlIHJlY3RhbmdsZSBpbnNpZGUgZ3JhcGggKG5leHQgdG8gbW91c2UtY3Vyc29yIGxpbmUpLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gdmlzaWJsZSB7Qm9vbGVhbn0gQm9vbGVhbiBnaXZpbmcgaW5mb3JtYXRpb24gYWJvdXQgdmlzaWJpbGl0eSBvZiBhIGxhYmVsLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hWaXNMYWJlbChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIHZpc2libGU6IGJvb2xlYW4sIGVudHJ5SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9jdXMtdmlzaWJpbGl0eScpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9jdXMtdmlzaWJpbGl0eScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFxuICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuICAgICAgICAgICAgdGhpcy5sYWJlbFRpbWVzdGFtcFtlbnRyeUlkeF0gPSBudWxsO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkc1tlbnRyeS5pbnRlcm5hbElkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNob3cgdGhlIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gaXRlbSB7RGF0YUVudHJ5fSBPYmplY3Qgb2YgdGhlIGVudHJ5IGluIHRoZSBkYXRhc2V0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd0xhYmVsVmFsdWVzKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSwgaXRlbTogRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIGxldCBpZCA9IDE7XG4gICAgICAgIGxldCBvbkxlZnRTaWRlOiBib29sZWFuID0gdGhpcy5jaGVja0xlZnRTaWRlKGl0ZW0ueERpYWdDb29yZCk7XG4gICAgICAgIGlmIChlbnRyeS5mb2N1c0xhYmVsKSB7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsLnRleHQoaXRlbVtpZF0gKyAoZW50cnkuYXhpc09wdGlvbnMudW9tID8gZW50cnkuYXhpc09wdGlvbnMudW9tIDogJycpKTtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5WDogbnVtYmVyID0gb25MZWZ0U2lkZSA/XG4gICAgICAgICAgICAgICAgaXRlbS54RGlhZ0Nvb3JkICsgNCA6IGl0ZW0ueERpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudyArIDQ7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeVgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBpdGVtLnlEaWFnQ29vcmQpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIGl0ZW0ueURpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkuaCArIDMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmgpO1xuXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF0gPSB7XG4gICAgICAgICAgICAgICAgJ3RpbWVzdGFtcCc6IGl0ZW1bMF0sXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogaXRlbVsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzaG93IHRoZSB0aW1lIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGl0ZW0ge0RhdGFFbnRyeX0gT2JqZWN0IG9mIHRoZSBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZW50cnlJZHgge051bWJlcn0gTnVtYmVyIG9mIHRoZSBpbmRleCBvZiB0aGUgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgZW50cnlJZHg6IG51bWJlciwgbW91c2VDb29yZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHRpbWVzdGFtcCBpcyB0aGUgdGltZSB3aGVyZSB0aGUgbW91c2UtY3Vyc29yIGlzXG4gICAgICAgIHRoaXMubGFiZWxUaW1lc3RhbXBbZW50cnlJZHhdID0gaXRlbVswXTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBpdGVtLnhEaWFnQ29vcmQ7XG4gICAgICAgIHRoaXMuZGlzdExhYmVsWENvb3JkW2VudHJ5SWR4XSA9IE1hdGguYWJzKG1vdXNlQ29vcmQgLSBpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBsZXQgbWluID0gZDMubWluKHRoaXMuZGlzdExhYmVsWENvb3JkKTtcbiAgICAgICAgbGV0IGlkeE9mTWluID0gdGhpcy5kaXN0TGFiZWxYQ29vcmQuZmluZEluZGV4KChlbGVtKSA9PiBlbGVtID09PSBtaW4pO1xuICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IHRoaXMuY2hlY2tMZWZ0U2lkZShpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmxhYmVsWENvb3JkW2lkeE9mTWluXSArIDI7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0gLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsVGltZS5ub2RlKCkpLncgLSAyO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lLnRleHQobW9tZW50KHRoaXMubGFiZWxUaW1lc3RhbXBbaWR4T2ZNaW5dKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJykpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyByaWdodCA6IGxlZnQpXG4gICAgICAgICAgICAuYXR0cigneScsIDEzKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1c1xuICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0pXG4gICAgICAgICAgICAuYXR0cigneTEnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0pXG4gICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0LnRpbWVzdGFtcCA9IHRoaXMubGFiZWxUaW1lc3RhbXBbaWR4T2ZNaW5dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGdpdmluZyBpbmZvcm1hdGlvbiBpZiB0aGUgbW91c2UgaXMgb24gbGVmdCBzaWRlIG9mIHRoZSBkaWFncmFtLlxuICAgICAqIEBwYXJhbSBpdGVtQ29vcmQge251bWJlcn0geCBjb29yZGluYXRlIG9mIHRoZSB2YWx1ZSAoZS5nLiBtb3VzZSkgdG8gYmUgY2hlY2tlZFxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tMZWZ0U2lkZShpdGVtQ29vcmQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBpdGVtQ29vcmQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHdyYXAgdGhlIHRleHQgZm9yIHRoZSB5IGF4aXMgbGFiZWwuXG4gICAgICogQHBhcmFtIHRleHQge2FueX0geSBheGlzIGxhYmVsXG4gICAgICogQHBhcmFtIHdpZHRoIHtOdW1iZXJ9IHdpZHRoIG9mIHRoZSBheGlzIHdoaWNoIG11c3Qgbm90IGJlIGNyb3NzZWRcbiAgICAgKiBAcGFyYW0geHBvc2l0aW9uIHtOdW1iZXJ9IHBvc2l0aW9uIHRvIGNlbnRlciB0aGUgbGFiZWwgaW4gdGhlIG1pZGRsZVxuICAgICAqL1xuICAgIHByaXZhdGUgd3JhcFRleHQodGV4dE9iajogYW55LCB3aWR0aDogbnVtYmVyLCB4cG9zaXRpb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0ZXh0T2JqLmVhY2goZnVuY3Rpb24gKHU6IGFueSwgaTogbnVtYmVyLCBkOiBOb2RlTGlzdCkge1xuICAgICAgICAgICAgbGV0IHRleHQgPSBkMy5zZWxlY3QodGhpcyksXG4gICAgICAgICAgICAgICAgd29yZHMgPSB0ZXh0LnRleHQoKS5zcGxpdCgvXFxzKy8pLnJldmVyc2UoKSxcbiAgICAgICAgICAgICAgICB3b3JkLFxuICAgICAgICAgICAgICAgIGxpbmUgPSBbXSxcbiAgICAgICAgICAgICAgICAvLyBsaW5lTnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0ID0gKGkgPT09IGQubGVuZ3RoIC0gMSA/IDAuMyA6IDEuMSksIC8vIGVtc1xuICAgICAgICAgICAgICAgIHkgPSB0ZXh0LmF0dHIoJ3knKSxcbiAgICAgICAgICAgICAgICBkeSA9IHBhcnNlRmxvYXQodGV4dC5hdHRyKCdkeScpKSxcbiAgICAgICAgICAgICAgICB0c3BhbiA9IHRleHQudGV4dChudWxsKS5hcHBlbmQoJ3RzcGFuJykuYXR0cigneCcsIDAgLSB4cG9zaXRpb24pLmF0dHIoJ3knLCB5KS5hdHRyKCdkeScsIGR5ICsgJ2VtJyk7XG4gICAgICAgICAgICB3aGlsZSAod29yZCA9IHdvcmRzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgbGluZS5wdXNoKHdvcmQpO1xuICAgICAgICAgICAgICAgIHRzcGFuLnRleHQobGluZS5qb2luKCcgJykpO1xuICAgICAgICAgICAgICAgIGxldCBub2RlOiBTVkdUU3BhbkVsZW1lbnQgPSA8U1ZHVFNwYW5FbGVtZW50PnRzcGFuLm5vZGUoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzR3JlYXRlcldpZHRoOiBib29sZWFuID0gbm9kZS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSA+IHdpZHRoO1xuICAgICAgICAgICAgICAgIGlmIChoYXNHcmVhdGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdHNwYW4udGV4dChsaW5lLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBbd29yZF07XG4gICAgICAgICAgICAgICAgICAgIHRzcGFuID0gdGV4dC5hcHBlbmQoJ3RzcGFuJykuYXR0cigneCcsIDAgLSB4cG9zaXRpb24pLmF0dHIoJ3knLCB5KS5hdHRyKCdkeScsIGxpbmVIZWlnaHQgKyBkeSArICdlbScpLnRleHQod29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGJvdW5kaW5ncyBvZiBhIGh0bWwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWwge09iamVjdH0gT2JqZWN0IG9mIHRoZSBodG1sIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREaW1lbnNpb25zKGVsOiBhbnkpOiB7IHc6IG51bWJlciwgaDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgdyA9IDA7XG4gICAgICAgIGxldCBoID0gMDtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZWwuZ2V0QkJveCgpO1xuICAgICAgICAgICAgdyA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICBoID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6IGdldERpbWVuc2lvbnMoKSAnICsgZWwgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdyxcbiAgICAgICAgICAgIGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBnZW5lcmF0ZSB1dWlkIGZvciBhIGRpYWdyYW1cbiAgICAgKi9cbiAgICBwcml2YXRlIHV1aWR2NCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zNCgpICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgdGhpcy5zNCgpICsgdGhpcy5zNCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNvbXBvbmVudHMgb2YgdGhlIHV1aWQgZm9yIGEgZGlhZ3JhbVxuICAgICAqL1xuICAgIHByaXZhdGUgczQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgbG9ncyB0aGUgZXJyb3IgaW4gdGhlIGNvbnNvbGUuXG4gICAgICogQHBhcmFtIGVycm9yIHtPYmplY3R9IE9iamVjdCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBlbnVtIEQzQXhpc1R5cGUge1xuICAgIERpc3RhbmNlLFxuICAgIFRpbWUsXG4gICAgVGlja3Ncbn1cbiIsImV4cG9ydCBjbGFzcyBEM1NlbGVjdGlvblJhbmdlIHtcbiAgICBwdWJsaWMgZnJvbTogbnVtYmVyO1xuICAgIHB1YmxpYyB0bzogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBMb2NhdGVkVGltZVZhbHVlRW50cnksXG4gICAgVGltZSxcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhcmVhLFxuICAgIGF4aXNCb3R0b20sXG4gICAgYXhpc0xlZnQsXG4gICAgYXhpc1JpZ2h0LFxuICAgIGF4aXNUb3AsXG4gICAgYmlzZWN0b3IsXG4gICAgY3VydmVMaW5lYXIsXG4gICAgZXh0ZW50LFxuICAgIGxpbmUsXG4gICAgbW91c2UsXG4gICAgU2NhbGVMaW5lYXIsXG4gICAgc2NhbGVMaW5lYXIsXG4gICAgc2VsZWN0LFxuICAgIHRpbWVGb3JtYXQsXG59IGZyb20gJ2QzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgRDNBeGlzVHlwZSB9IGZyb20gJy4uL21vZGVsL2QzLWF4aXMtdHlwZSc7XG5pbXBvcnQgeyBEM0dyYXBoT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2QzLWdyYXBoLW9wdGlvbnMnO1xuaW1wb3J0IHsgRDNTZWxlY3Rpb25SYW5nZSB9IGZyb20gJy4uL21vZGVsL2QzLXNlbGVjdGlvbi1yYW5nZSc7XG5cbmludGVyZmFjZSBEYXRhRW50cnkgZXh0ZW5kcyBMb2NhdGVkVGltZVZhbHVlRW50cnkge1xuICAgIGRpc3Q6IG51bWJlcjtcbiAgICB0aWNrOiBudW1iZXI7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB4RGlhZ0Nvb3JkPzogbnVtYmVyO1xuICAgIFtpZDogc3RyaW5nXTogYW55O1xufVxuXG5pbnRlcmZhY2UgRGF0YXNldENvbnN0ZWxsYXRpb24ge1xuICAgIGRhdGFzZXQ/OiBJRGF0YXNldDtcbiAgICBkYXRhPzogTG9jYXRlZFRpbWVWYWx1ZUVudHJ5W107XG4gICAgeVNjYWxlPzogU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIGRyYXdPcHRpb25zPzogRHJhd09wdGlvbnM7XG4gICAgZm9jdXNMYWJlbFJlY3Q/OiBhbnk7XG4gICAgZm9jdXNMYWJlbD86IGFueTtcbn1cblxuaW50ZXJmYWNlIERyYXdPcHRpb25zIHtcbiAgICB1b206IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZmlyc3Q6IGJvb2xlYW47XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLXRyYWplY3RvcnktZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2R0aHJlZT48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCV9LmQzIC5heGlzIGxpbmUsLmQzIC5heGlzIHBhdGh7ZmlsbDpub25lO3N0cm9rZTojMDAwfS5kMyB0ZXh0e2ZvbnQtc2l6ZToxNHB4fS5kMyAuZ3JhcGhBcmVhe2ZpbGw6I2IwYzRkZTtmaWxsLW9wYWNpdHk6Ljd9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5tYXAtaGlnaGxpZ2h0LWxhYmVse2ZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6Ljd9LmQzIC5tb3VzZS1mb2N1cy1saW5le3BvaW50ZXItZXZlbnRzOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2U6IzAwMH0uZDMgLm1vdXNlLWRyYWd7ZmlsbDpyZ2JhKDAsMCwyNTUsLjQpO3BvaW50ZXItZXZlbnRzOmFsbDtjdXJzb3I6bW92ZX1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEQzVHJhamVjdG9yeUdyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBEM0dyYXBoT3B0aW9ucz5cbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3Rpb246IEQzU2VsZWN0aW9uUmFuZ2U7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQ6IEV2ZW50RW1pdHRlcjxEM1NlbGVjdGlvblJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxEM1NlbGVjdGlvblJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkhvdmVySGlnaGxpZ2h0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2R0aHJlZScpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgZGF0YXNldE1hcDogTWFwPHN0cmluZywgRGF0YXNldENvbnN0ZWxsYXRpb24+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgcmF3U3ZnOiBhbnk7XG4gICAgcHJpdmF0ZSBncmFwaDogYW55O1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDQwXG4gICAgfTtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuICAgIHByaXZhdGUgbGluZUZ1bjogZDMuTGluZTxEYXRhRW50cnk+O1xuICAgIHByaXZhdGUgYXJlYTogZDMuQXJlYTxEYXRhRW50cnk+O1xuICAgIHByaXZhdGUgeFNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHByaXZhdGUgeVNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNsYWJlbFRpbWU6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzbGFiZWxZOiBhbnk7XG4gICAgcHJpdmF0ZSB5QXhpc0dlbjogZDMuQXhpczxudW1iZXIgfCB7IHZhbHVlT2YoKTogbnVtYmVyOyB9PjtcbiAgICBwcml2YXRlIGJhc2VWYWx1ZXM6IERhdGFFbnRyeVtdID0gW107XG4gICAgcHJpdmF0ZSBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRyYWdTdGFydDogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIGRyYWdDdXJyZW50OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ1JlY3Q6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0RzogYW55O1xuICAgIHByaXZhdGUgYnVmZmVyU3VtOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkYXRhTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRHcmFwaE9wdGlvbnM6IEQzR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBheGlzVHlwZTogRDNBeGlzVHlwZS5EaXN0YW5jZSxcbiAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNlcnZpY2UpO1xuICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMgPSB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmIChjaGFuZ2VzLnNlbGVjdGlvbiAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWxsRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IHNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1heExhYmVsd2lkdGgpICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLmxpbmVGdW4gPSBsaW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLnkodGhpcy5jYWxjWVZhbHVlKVxuICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmFyZWEgPSBhcmVhPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLnkwKHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLnkxKHRoaXMuY2FsY1lWYWx1ZSlcbiAgICAgICAgICAgIC5jdXJ2ZShjdXJ2ZUxpbmVhcik7XG5cbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgdGltZUludGVydmFsQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoZW50cnkuZGF0YXNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRNYXAuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgeyBkYXRhc2V0IH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShkYXRhc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0FsbERhdGEoKTtcbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBEM0dyYXBoT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgdGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGludGVybmFsSWQpLmRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVzcGFuICYmXG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhkYXRhc2V0LmludGVybmFsSWQpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aGlzLnRpbWVzcGFuLCAwLjIpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFRpbWVWYWx1ZUVudHJ5PihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbGl6ZTogb3B0aW9uLmdlbmVyYWxpemVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFMZW5ndGggPSByZXN1bHQudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmdldChkYXRhc2V0LmludGVybmFsSWQpLmRhdGEgPSByZXN1bHQudmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEYXRhRm9ySWQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0FsbERhdGEoKSB7XG4gICAgICAgIHRoaXMuYmFzZVZhbHVlcyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMuZm9yRWFjaCgoaWQpID0+IHRoaXMucHJvY2Vzc0RhdGFGb3JJZChpZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0RhdGFGb3JJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGludGVybmFsSWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXRFbnRyeSA9IHRoaXMuZGF0YXNldE1hcC5nZXQoaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEVudHJ5ID0gdGhpcy5iYXNlVmFsdWVzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGxldCBwcmV2aW91czogRGF0YUVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIGRhdGFzZXRFbnRyeS5kYXRhLmZvckVhY2goKGVsZW0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jcmVhdGVEYXRhRW50cnkoaW50ZXJuYWxJZCwgZWxlbSwgcHJldmlvdXMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSB0aGlzLnNlbGVjdGlvbi5mcm9tICYmIGlkeCA8PSB0aGlzLnNlbGVjdGlvbi50bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGVudHJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSB0aGlzLnNlbGVjdGlvbi5mcm9tICYmIGlkeCA8PSB0aGlzLnNlbGVjdGlvbi50bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhc2VWYWx1ZXNbaWR4IC0gdGhpcy5zZWxlY3Rpb24uZnJvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVzW2lkeCAtIHRoaXMuc2VsZWN0aW9uLmZyb21dW2ludGVybmFsSWRdID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iYXNlVmFsdWVzW2lkeF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZXNbaWR4XVtpbnRlcm5hbElkXSA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF0YUVudHJ5KFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGVudHJ5OiBMb2NhdGVkVGltZVZhbHVlRW50cnksXG4gICAgICAgIHByZXZpb3VzOiBEYXRhRW50cnksXG4gICAgICAgIGluZGV4OiBudW1iZXJcbiAgICApOiBEYXRhRW50cnkge1xuICAgICAgICBsZXQgZGlzdDogbnVtYmVyO1xuICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld2Rpc3QgPSB0aGlzLmRpc3RhbmNlQmV0d2VlbihcbiAgICAgICAgICAgICAgICBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5nZW9tZXRyeS5jb29yZGluYXRlc1swXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRpc3QgPSBwcmV2aW91cy5kaXN0ICsgTWF0aC5yb3VuZChuZXdkaXN0IC8gMTAwMCAqIDEwMDAwMCkgLyAxMDAwMDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXN0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGljazogaW5kZXgsXG4gICAgICAgICAgICBkaXN0OiBNYXRoLnJvdW5kKGRpc3QgKiAxMCkgLyAxMCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogZW50cnkudGltZXN0YW1wLFxuICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLFxuICAgICAgICAgICAgW2ludGVybmFsSWRdOiBlbnRyeS52YWx1ZSxcbiAgICAgICAgICAgIHg6IGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgeTogZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgICBnZW9tZXRyeTogZW50cnkuZ2VvbWV0cnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3RhbmNlQmV0d2VlbihsYXRpdHVkZTEsIGxvbmdpdHVkZTEsIGxhdGl0dWRlMiwgbG9uZ2l0dWRlMik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IFIgPSA2MzcxMDAwO1xuICAgICAgICBjb25zdCByYWQgPSBNYXRoLlBJIC8gMTgwO1xuICAgICAgICBjb25zdCBsYXQxID0gbGF0aXR1ZGUxICogcmFkO1xuICAgICAgICBjb25zdCBsYXQyID0gbGF0aXR1ZGUyICogcmFkO1xuICAgICAgICBjb25zdCBzaW5ETGF0ID0gTWF0aC5zaW4oKGxhdGl0dWRlMiAtIGxhdGl0dWRlMSkgKiByYWQgLyAyKTtcbiAgICAgICAgY29uc3Qgc2luRExvbiA9IE1hdGguc2luKChsb25naXR1ZGUyIC0gbG9uZ2l0dWRlMSkgKiByYWQgLyAyKTtcbiAgICAgICAgY29uc3QgYSA9IHNpbkRMYXQgKiBzaW5ETGF0ICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIHNpbkRMb24gKiBzaW5ETG9uO1xuICAgICAgICBjb25zdCBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgICAgICAgcmV0dXJuIFIgKiBjO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1lWYWx1ZSA9IChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMueVNjYWxlQmFzZShkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNYVmFsdWUgPSAoZDogRGF0YUVudHJ5LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgeERpYWdDb29yZCA9IHRoaXMueFNjYWxlQmFzZSh0aGlzLmdldFhWYWx1ZShkKSk7XG4gICAgICAgIGQueERpYWdDb29yZCA9IHhEaWFnQ29vcmQ7XG4gICAgICAgIHJldHVybiB4RGlhZ0Nvb3JkO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkuaGVpZ2h0LmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQgLSB0aGlzLm1heExhYmVsd2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYVmFsdWUoZGF0YTogRGF0YUVudHJ5KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGlzdDtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaW1lOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRpbWVzdGFtcDtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaWNrczpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aWNrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aWNrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3RG90cyh2YWx1ZXM6IERhdGFFbnRyeVtdLCB5U2NhbGU6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPiwgb3B0aW9uczogRHJhd09wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ncmFwaC5zZWxlY3RBbGwoJ2RvdCcpXG4gICAgICAgICAgICAuZGF0YSh2YWx1ZXMpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdyJywgMS41KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgdGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQ6IERhdGFFbnRyeSkgPT4geVNjYWxlKGRbb3B0aW9ucy5pZF0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdWYWx1ZUxpbmUodmFsdWVzOiBEYXRhRW50cnlbXSwgeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAuZGF0dW0odmFsdWVzKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAxKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgICAgIC54KHRoaXMuY2FsY1hWYWx1ZSlcbiAgICAgICAgICAgICAgICAueSgoZDogRGF0YUVudHJ5KSA9PiB5U2NhbGUoZFtvcHRpb25zLmlkXSkpXG4gICAgICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGgoeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuZG90dGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdEb3RzKHRoaXMuYmFzZVZhbHVlcywgeVNjYWxlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1ZhbHVlTGluZSh0aGlzLmJhc2VWYWx1ZXMsIHlTY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdMaW5lR3JhcGgoKSB7XG4gICAgICAgIGlmICghdGhpcy5iYXNlVmFsdWVzIHx8IHRoaXMuYmFzZVZhbHVlcy5sZW5ndGggPT09IDAgfHwgIXRoaXMuZ3JhcGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlV2lkdGgoKTtcblxuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyU3VtID0gMDtcblxuICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChkYXRhc2V0RW50cnksIGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5oYXMoaWQpICYmIGRhdGFzZXRFbnRyeS5kYXRhICYmIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgZGF0YXNldEVudHJ5LmRyYXdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFzZXRFbnRyeS5kYXRhc2V0LnVvbSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGFzZXRFbnRyeS5kYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4aXNSZXN1bHQgPSB0aGlzLmRyYXdZQXhpcyhkYXRhc2V0RW50cnkuZHJhd09wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U2NhbGVCYXNlID0gYXhpc1Jlc3VsdC55U2NhbGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSBheGlzUmVzdWx0LmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YXNldEVudHJ5LnlTY2FsZSA9IGF4aXNSZXN1bHQueVNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMueVNjYWxlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyByaWdodCBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy53aWR0aCArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGF4aXNSaWdodCh0aGlzLnlTY2FsZUJhc2UpLnRpY2tTaXplKDApLnRpY2tzKDApKTtcblxuICAgICAgICB0aGlzLmRyYXdYQXhpcyh0aGlzLmJ1ZmZlclN1bSk7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuaGFzKGlkKSAmJiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkudmlzaWJsZSAmJiBlbnRyeS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGgoZW50cnkueVNjYWxlLCBlbnRyeS5kcmF3T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoIC0gdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmZvY3VzJywgdGhpcy5tb3VzZW1vdmVIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dC5mb2N1cycsIHRoaXMubW91c2VvdXRIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24uZHJhZycsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmRyYWcnLCB0aGlzLmRyYWdIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZXVwLmRyYWcnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJyk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1saW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MScsICcwJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChlbnRyeSwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhpZCkgJiYgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLnZpc2libGUgJiYgZW50cnkuZGF0YSkge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC13ZWlnaHQnLCAnbGlnaHRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXgnKTtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsWSA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbC15Jyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYmFzZVZhbHVlcyB8fCB0aGlzLmJhc2VWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29vcmRzID0gbW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0SXRlbUZvclgoY29vcmRzWzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIHRoaXMuc2hvd0RpYWdyYW1JbmRpY2F0b3IoaWR4KTtcbiAgICAgICAgdGhpcy5vbkhvdmVySGlnaGxpZ2h0LmVtaXQodGhpcy5iYXNlVmFsdWVzW2lkeF0udGljayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZW91dEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZURpYWdyYW1JbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdTdGFydEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBtb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3RHJhZ1JlY3RhbmdsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ0VuZEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQgfHwgIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQuZW1pdCh7IGZyb206IDAsIHRvOiB0aGlzLmRhdGFMZW5ndGggfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdTdGFydFswXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICAgICAgY29uc3QgdG8gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ0N1cnJlbnRbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQuZW1pdCh0aGlzLnByZXBhcmVSYW5nZSh0aGlzLmJhc2VWYWx1ZXNbZnJvbV0udGljaywgdGhpcy5iYXNlVmFsdWVzW3RvXS50aWNrKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzZXREcmFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlUmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogRDNTZWxlY3Rpb25SYW5nZSB7XG4gICAgICAgIGlmIChmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICByZXR1cm4geyBmcm9tLCB0byB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGZyb206IHRvLCB0bzogZnJvbSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0RyYWdSZWN0YW5nbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kcmFnQ3VycmVudCA9IG1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuXG4gICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ1N0YXJ0WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIGNvbnN0IHRvID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdDdXJyZW50WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQodGhpcy5wcmVwYXJlUmFuZ2UodGhpcy5iYXNlVmFsdWVzW2Zyb21dLnRpY2ssIHRoaXMuYmFzZVZhbHVlc1t0b10udGljaykpO1xuXG4gICAgICAgIGNvbnN0IHgxID0gTWF0aC5taW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcblxuICAgICAgICBpZiAoIXRoaXMuZHJhZ1JlY3QgJiYgIXRoaXMuZHJhZ1JlY3RHKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdCA9IHRoaXMuZHJhZ1JlY3RHLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeDIgLSB4MSlcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1kcmFnJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgeDEgKyB0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0RHJhZygpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1JlY3RHKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0Ry5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlRGlhZ3JhbUluZGljYXRvcigpIHtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RGlhZ3JhbUluZGljYXRvciA9IChpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5iYXNlVmFsdWVzW2lkeF07XG4gICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1cy5hdHRyKCd4MScsIGl0ZW0ueERpYWdDb29yZClcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIDApXG4gICAgICAgICAgICAuYXR0cigneDInLCBpdGVtLnhEaWFnQ29vcmQpXG4gICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XG5cbiAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBpdGVtLnhEaWFnQ29vcmQpIHsgb25MZWZ0U2lkZSA9IHRydWU7IH1cblxuICAgICAgICB0aGlzLnNob3dMYWJlbFZhbHVlcyhpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW0sIG9uTGVmdFNpZGUpO1xuICAgICAgICB0aGlzLnNob3dCb3R0b21JbmRpY2F0b3JMYWJlbChpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dMYWJlbFZhbHVlcyhpdGVtOiBEYXRhRW50cnksIG9uTGVmdFNpZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmZvY3VzTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbC50ZXh0KGl0ZW1baWRdICsgKGVudHJ5LmRhdGFzZXQudW9tID8gZW50cnkuZGF0YXNldC51b20gOiAnJykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeVggPSBvbkxlZnRTaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLnc7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnlYKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBlbnRyeS55U2NhbGUoaXRlbVtpZF0pICsgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS5oIC0gMyk7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgZW50cnkueVNjYWxlKGl0ZW1baWRdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgb25MZWZ0U2lkZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lLnRleHQobW9tZW50KGl0ZW0udGltZXN0YW1wKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJykpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyBpdGVtLnhEaWFnQ29vcmQgKyAyIDogaXRlbS54RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuZm9jdXNsYWJlbFRpbWUubm9kZSgpKS53KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAxMyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Qm90dG9tSW5kaWNhdG9yTGFiZWwoaXRlbTogRGF0YUVudHJ5LCBvbkxlZnRTaWRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNsYWJlbFkudGV4dChpdGVtLmRpc3QgKyAnIGttJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSA9PT0gRDNBeGlzVHlwZS5UaWNrcykge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2xhYmVsWS50ZXh0KCdNZWFzdXJlbWVudDogJyArIGl0ZW0udGljayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsWVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpIC0gNSlcbiAgICAgICAgICAgIC5hdHRyKCd4Jywgb25MZWZ0U2lkZSA/IGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsWS5ub2RlKCkpLncpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KSB7XG4gICAgICAgIGxldCB3ID0gMDtcbiAgICAgICAgbGV0IGggPSAwO1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5nZXRCQm94KCk7XG4gICAgICAgICAgICB3ID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgIGggPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogZ2V0RGltZW5zaW9ucygpICcgKyBlbCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3LFxuICAgICAgICAgICAgaFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbUZvclgoeDogbnVtYmVyLCBkYXRhOiBEYXRhRW50cnlbXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMueFNjYWxlQmFzZS5pbnZlcnQoeCk7XG4gICAgICAgIGNvbnN0IGJpc2VjdERhdGUgPSBiaXNlY3RvcigoZDogRGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGlzdDtcbiAgICAgICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaWNrczpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC50aWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5sZWZ0O1xuICAgICAgICByZXR1cm4gYmlzZWN0RGF0ZSh0aGlzLmJhc2VWYWx1ZXMsIGluZGV4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdZQXhpcyhvcHRpb25zOiBEcmF3T3B0aW9ucyk6IGFueSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZXh0ZW50PERhdGFFbnRyeSwgbnVtYmVyPih0aGlzLmJhc2VWYWx1ZXMsIChkYXR1bSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0dW1bb3B0aW9ucy5pZF07IC8vIGhlcmUgd2l0aCBJRFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmFuZ2VPZmZzZXQgPSAocmFuZ2VbMV0gLSByYW5nZVswXSkgKiAwLjEwO1xuICAgICAgICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFtyYW5nZVswXSAtIHJhbmdlT2Zmc2V0LCByYW5nZVsxXSArIHJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgICAgICB0aGlzLnlBeGlzR2VuID0gYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCBheGlzID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwodGhpcy55QXhpc0dlbik7XG5cbiAgICAgICAgLy8gZHJhdyB5IGF4aXMgbGFiZWxcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJzFlbScpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy51b20pO1xuXG4gICAgICAgIGNvbnN0IGF4aXNXaWR0aCA9IGF4aXMubm9kZSgpLmdldEJCb3goKS53aWR0aCArIDUgKyB0aGlzLmdldERpbWVuc2lvbnModGV4dC5ub2RlKCkpLmg7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IG9wdGlvbnMub2Zmc2V0ICsgKGF4aXNXaWR0aCA8IDMwID8gMzAgOiBheGlzV2lkdGgpO1xuICAgICAgICBpZiAoIW9wdGlvbnMuZmlyc3QpIHtcbiAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHRPZmZzZXQgPSAhb3B0aW9ucy5maXJzdCA/IGJ1ZmZlciA6IG9wdGlvbnMub2Zmc2V0O1xuICAgICAgICB0ZXh0LmF0dHIoJ3knLCAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWF4TGFiZWx3aWR0aCArIHRleHRPZmZzZXQpXG4gICAgICAgICAgICAuYXR0cigneCcsIDAgLSAodGhpcy5oZWlnaHQgLyAyKSk7XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeSBncmlkIGxpbmVzIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgZGF0YXNldFxuICAgICAgICBpZiAodGhpcy5kYXRhc2V0SWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoYXhpc0xlZnQoeVNjYWxlKVxuICAgICAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICAgIHlTY2FsZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1hBeGlzKGJ1ZmZlcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueFNjYWxlQmFzZSA9IHNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4odGhpcy5nZXRYRG9tYWluKHRoaXMuYmFzZVZhbHVlcykpXG4gICAgICAgICAgICAucmFuZ2UoW2J1ZmZlciwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGNvbnN0IHhBeGlzR2VuID0gYXhpc0JvdHRvbSh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuVGltZSkge1xuICAgICAgICAgICAgeEF4aXNHZW4udGlja0Zvcm1hdCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lRm9ybWF0KCclZC4lbS4lWSAlSDolTTolUycpKG5ldyBEYXRlKGQudmFsdWVPZigpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeCBheGlzXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHRoaXMuaGVpZ2h0ICsgJyknKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNHZW4pO1xuXG4gICAgICAgIC8vIGRyYXcgdGhlIHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbChheGlzQm90dG9tKHRoaXMueFNjYWxlQmFzZSlcbiAgICAgICAgICAgICAgICAudGlja3MoMTApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gZHJhdyB1cHBlciBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuY2FsbChheGlzVG9wKHRoaXMueFNjYWxlQmFzZSkudGlja3MoMCkudGlja1NpemUoMCkpO1xuXG4gICAgICAgIC8vIHRleHQgbGFiZWwgZm9yIHRoZSB4IGF4aXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAodGhpcy53aWR0aCArIGJ1ZmZlcikgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAudGV4dCh0aGlzLmdldFhBeGlzTGFiZWwoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYRG9tYWluKHZhbHVlczogRGF0YUVudHJ5W10pIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3ZhbHVlc1swXS5kaXN0LCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLmRpc3RdO1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpbWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZXNbMF0udGltZXN0YW1wLCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLnRpbWVzdGFtcF07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbdmFsdWVzWzBdLnRpY2ssIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0udGlja107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFhBeGlzTGFiZWwoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEaXN0YW5jZSc7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RpbWUnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RpY2tzJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSwgRGF0YXNldEFwaUludGVyZmFjZSwgRGF0YXNldE9wdGlvbnMsIEludGVybmFsSWRIYW5kbGVyLCBNaW5NYXhSYW5nZSwgVGltZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBleHRlbnQgfSBmcm9tICdkMyc7XG5cbmltcG9ydCB7XG4gIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICBEYXRhRW50cnksXG4gIEludGVybmFsRGF0YUVudHJ5LFxufSBmcm9tICcuLi9kMy10aW1lc2VyaWVzLWdyYXBoL2QzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEFkZGl0aW9uYWwgRGF0YSB3aGljaCBjYW4gYmUgYWRkIHRvIHRoZSBjb21wb25lbnQge0BsaW5rIEV4dGVuZGVkRGF0YUQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50fSBhcyBJbnB1dC5cbiAqIE9uZSBvZiB0aGUgb3B0aW9uYWwgcHJvcGVydGllcyAnbGlua2VkRGF0YXNldElkJyBhbmQgJ3lheGlzTGFiZWwnIGlzIG1hbmRhdG9yeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZGRpdGlvbmFsRGF0YSB7XG4gIC8qKlxuICAgKiBMaW5rZWQgdG8gYW4gZXhpc3RpbmcgZGF0YXNldCBpbiB0aGUgZ3JhcGggY29tcG9uZW50IGFuZCB1c2VzIGl0IGRhdGFzZXQgb3B0aW9ucyBpZiBubyBvdGhlciBkYXRhc2V0b3B0aW9ucyBhcmUgcHJlc2VudGVkLlxuICAgKi9cbiAgbGlua2VkRGF0YXNldElkPzogc3RyaW5nO1xuICAvKipcbiAgICogWS1BeGlzIGxhYmVsIGlmIG5vIGxpbmsgdG8gYW4gZXhpc3RpbmcgZGF0YXNldCBpcyBnaXZlbi5cbiAgICovXG4gIHlheGlzTGFiZWw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZGF0YXNldCBvcHRpb25zLCB3aGljaCBkZXNjcmliZXMgdGhlIHN0eWxpbmcgb2YgdGhlIGFkZGl0aW9uYWwgZGF0YS5cbiAgICovXG4gIGRhdGFzZXRPcHRpb25zPzogRGF0YXNldE9wdGlvbnM7XG4gIC8qKlxuICAgKiBUaGUgYWRkaXRpb25hbCBkYXRhIGFycmV5IHdpdGggdHVwZWxzIG9mIHRpbWVzdGFtcCBhbmQgdmFsdWUuXG4gICAqL1xuICBkYXRhOiBBZGRpdGlvbmFsRGF0YUVudHJ5W107XG59XG5cbi8qKlxuICogQWRkaXRpb25hbCBkYXRhIGVudHJ5IHR1cGxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRkaXRpb25hbERhdGFFbnRyeSB7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIEV4dGVuZHMgdGhlIGNvbW1vbiBkMyBjb21wb25lbnQsIHdpdGggdGhlIGFiaWxpdHkgdG8gYWRkIGFkZGl0aW9uYWwgZGF0YSB0byB0aGUgZ3JhcGguIFRvIHNldCBvciBjaGFuZ2UgIGFkZGl0aW9uYWwgZGF0YSwgYWxsd2F5cyBzZXRzIHRoZSBjb21wbGV0ZSBhcnJheSBvZiBkYXRhIG5ldy4gVGhlIGNvbXBvbmV0IGp1c3QgcmVkcmF3cyBpZlxuICogdGhlIGFycmF5IGlzIHJlc2V0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZDNcIiAjZDN0aW1lc2VyaWVzPjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLmdyYXBoRG90c3tzdHJva2Utd2lkdGg6MDtzdHJva2Utb3BhY2l0eToxfS5kMyAuZ3JhcGhEb3RzIC5ob3ZlcntzdHJva2Utd2lkdGg6MjBweDtzdHJva2Utb3BhY2l0eTouNX0uZDMgLmZvcm1lckJ1dHRvbiwuZDMgLmxhdGVyQnV0dG9ue2ZpbGw6Z3JleTtvcGFjaXR5Oi4zfS5kMyAuZm9ybWVyQnV0dG9uOmhvdmVyLC5kMyAubGF0ZXJCdXR0b246aG92ZXJ7b3BhY2l0eTouNn0uZDMgLmFycm93e3N0cm9rZTpncmV5O3N0cm9rZS13aWR0aDozcHh9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgZXh0ZW5kcyBEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGFkZGl0aW9uYWxEYXRhOiBBZGRpdGlvbmFsRGF0YVtdID0gW107XG5cbiAgcHJpdmF0ZSBhZGRpdGlvbmFsUHJlcGFyZWREYXRhOiBJbnRlcm5hbERhdGFFbnRyeVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgcHJvdGVjdGVkIHRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlOiBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0aW1lRm9ybWF0TG9jYWxlU2VydmljZSwgY29sb3JTZXJ2aWNlLCB0cmFuc2xhdGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgaWYgKGNoYW5nZXMuYWRkaXRpb25hbERhdGEgJiYgdGhpcy5hZGRpdGlvbmFsRGF0YSAmJiB0aGlzLmdyYXBoKSB7XG4gICAgICB0aGlzLmNsZWFyQWRkaXRpb25hbERhdGEoKTtcbiAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBsb3RHcmFwaCgpIHtcbiAgICB0aGlzLnByZXBhcmVBZGRpdGlvbmFsRGF0YSgpO1xuICAgIHN1cGVyLnBsb3RHcmFwaCgpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBpZiAodGhpcy5hZGRpdGlvbmFsRGF0YSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsb3RHcmFwaCgpLCAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyQWRkaXRpb25hbERhdGEoKSB7XG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGUuaWRzLmluZGV4T2YoZGF0YS5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7IGUuaWRzLnNwbGljZShpZHgsIDEpOyB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tKSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQuaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhID0gW107XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVBZGRpdGlvbmFsRGF0YSgpIHtcbiAgICBpZiAodGhpcy5hZGRpdGlvbmFsRGF0YSkge1xuICAgICAgdGhpcy5hZGRpdGlvbmFsRGF0YS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgaWYgKChlbnRyeS5saW5rZWREYXRhc2V0SWQgfHwgZW50cnkueWF4aXNMYWJlbCkgJiYgZW50cnkuZGF0YSkge1xuXG4gICAgICAgICAgaWYgKGVudHJ5LmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBlbnRyeS5kYXRhc2V0T3B0aW9ucyB8fCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChlbnRyeS5saW5rZWREYXRhc2V0SWQpO1xuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSB0aGlzLmRhdGFzZXRNYXAuZ2V0KGVudHJ5LmxpbmtlZERhdGFzZXRJZCk7XG4gICAgICAgICAgICBjb25zdCBwcmVwRGF0YUlkeCA9IHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5maW5kSW5kZXgoZSA9PiBlLmludGVybmFsSWQuc3RhcnRzV2l0aChlbnRyeS5saW5rZWREYXRhc2V0SWQpIHx8IGUuaW50ZXJuYWxJZCA9PT0gZW50cnkueWF4aXNMYWJlbCk7XG4gICAgICAgICAgICBsZXQgZGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeTtcbiAgICAgICAgICAgIGlmIChwcmVwRGF0YUlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IGVudHJ5LmxpbmtlZERhdGFzZXRJZCA/IGVudHJ5LmxpbmtlZERhdGFzZXRJZCArICdhZGQnIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICBpZDogLTEsXG4gICAgICAgICAgICAgICAgY29sb3I6IG9wdGlvbnMuY29sb3IsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy52aXNpYmxlID8gZW50cnkuZGF0YS5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGUudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSA6IFtdLFxuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBvcHRpb25zLmNvbG9yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiBvcHRpb25zLmxpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiBvcHRpb25zLnBvaW50UmFkaXVzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IG9wdGlvbnMubGluZVdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgdW9tOiBkYXRhc2V0ID8gZGF0YXNldC51b20gOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFzZXQgPyBkYXRhc2V0LmxhYmVsIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogb3B0aW9ucy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICAgIHlBeGlzUmFuZ2U6IG9wdGlvbnMueUF4aXNSYW5nZSxcbiAgICAgICAgICAgICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbjogb3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICBzZXBhcmF0ZVlBeGlzOiBvcHRpb25zLnNlcGFyYXRlWUF4aXNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpc2libGU6IG9wdGlvbnMudmlzaWJsZVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZGF0YXNldC5wYXJhbWV0ZXJzLmZlYXR1cmUsXG4gICAgICAgICAgICAgICAgICBwaGVub21lbm9uOiBkYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbixcbiAgICAgICAgICAgICAgICAgIG9mZmVyaW5nOiBkYXRhc2V0LnBhcmFtZXRlcnMub2ZmZXJpbmdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5wdXNoKGRhdGFFbnRyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhRW50cnkgPSB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGFbcHJlcERhdGFJZHhdO1xuICAgICAgICAgICAgICBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tID0gZGF0YXNldCA/IGRhdGFzZXQudW9tIDogZW50cnkueWF4aXNMYWJlbDtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5LmF4aXNPcHRpb25zLmxhYmVsID0gZGF0YXNldCA/IGRhdGFzZXQubGFiZWwgOiBlbnRyeS55YXhpc0xhYmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXdEYXRhc2V0SWR4ID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoKGUpID0+IGUuaWRzLmluZGV4T2YoZW50cnkubGlua2VkRGF0YXNldElkKSA+IC0xKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFFeHRlbnQgPSBleHRlbnQ8RGF0YUVudHJ5LCBudW1iZXI+KGRhdGFFbnRyeS5kYXRhLCAoZCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy50aW1lc3Bhbi5mcm9tIDw9IGQudGltZXN0YW1wICYmIHRoaXMudGltZXNwYW4udG8gPj0gZC50aW1lc3RhbXApIHsgcmV0dXJuIGQudmFsdWU7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGRhdGFFeHRlbnRbMF0pICYmIGlzRmluaXRlKGRhdGFFeHRlbnRbMV0pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJhbmdlOiBNaW5NYXhSYW5nZSA9IHsgbWluOiBkYXRhRXh0ZW50WzBdLCBtYXg6IGRhdGFFeHRlbnRbMV0gfTtcbiAgICAgICAgICAgICAgdGhpcy5leHRlbmRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgIGlmIChuZXdEYXRhc2V0SWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQXhpc0luZGV4ID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoZSA9PiBlLmlkcy5pbmRleE9mKGVudHJ5LnlheGlzTGFiZWwpICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXhpc1JhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgdW9tOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgICAgYXV0b1JhbmdlOiBvcHRpb25zLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgIHByZVJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIG9yaWdpblJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogb3B0aW9ucy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaWRzOiBbZW50cnkueWF4aXNMYWJlbF0sXG4gICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBkYXRhRW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nQXhpc0luZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bZXhpc3RpbmdBeGlzSW5kZXhdID0gYXhpc1JhbmdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLnB1c2goYXhpc1JhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UubWluID0gTWF0aC5taW4ocmFuZ2UubWluLCB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1pbik7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1heCA9IE1hdGgubWF4KHJhbmdlLm1heCwgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZS5tYXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0uaWRzLnB1c2goZW50cnkubGlua2VkRGF0YXNldElkID8gZW50cnkubGlua2VkRGF0YXNldElkICsgJ2FkZCcgOiBlbnRyeS55YXhpc0xhYmVsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZW50cnkueWF4aXNMYWJlbCAmJiAhZW50cnkubGlua2VkRGF0YXNldElkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMubGlzdE9mVW9tcy5pbmRleE9mKGVudHJ5LnlheGlzTGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPCAwKSB7IHRoaXMubGlzdE9mVW9tcy5wdXNoKGVudHJ5LnlheGlzTGFiZWwpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgY2hlY2sgdGhlIGFkZGl0aW9uYWwgZW50cnksIGl0IG5lZWRzIGF0IGxlYXN0IGEgXFwnbGlua2VkRGF0YXNldElkXFwnIG9yIGEgXFwneWF4aXNMYWJlbFxcJyBwcm9wZXJ0eSBhbmQgYSBcXCdkYXRhXFwnIHByb3BlcnR5OiAnLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBkcmF3QWxsR3JhcGhMaW5lcygpIHtcbiAgICBzdXBlci5kcmF3QWxsR3JhcGhMaW5lcygpO1xuICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5mb3JFYWNoKGUgPT4gdGhpcy5kcmF3R3JhcGhMaW5lKGUpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gICAgRDNHZW5lcmFsRGF0YVBvaW50LFxuICAgIEQzR2VuZXJhbERhdGFzZXQsXG4gICAgRDNHZW5lcmFsSW5wdXQsXG4gICAgRDNHZW5lcmFsUGxvdE9wdGlvbnMsXG4gICAgRDNHZW5lcmFsQXhpc09wdGlvbnMsXG4gICAgUmFuZ2UsXG4gICAgRDNHZW5lcmFsR3JhcGhPcHRpb25zXG59IGZyb20gJy4uL21vZGVsL2QzLWdlbmVyYWwnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLWdlbmVyYWwtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2QzZ2VuZXJhbD48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLnh7ZmlsbDpvcmFuZ2U7ZmlsbC1vcGFjaXR5Oi40fS5kMyAueCAudGlja3tzdHJva2U6IzAwZjtzdHJva2Utd2lkdGg6MTBweH0uZDMgLnggLnRpY2sgbGluZXtzdHJva2U6cmVkO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuYXhpc3tmaWxsOm9yYW5nZTtmaWxsLW9wYWNpdHk6LjR9LmQzIC5heGlzIC50aWNre3N0cm9rZTojMDBmO3N0cm9rZS13aWR0aDoxMHB4fS5kMyAuYXhpcyAudGljayBsaW5le3N0cm9rZTojZmZhMDdhO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuZ3JhcGhEb3Rze3N0cm9rZS13aWR0aDowO3N0cm9rZS1vcGFjaXR5OjF9LmQzIC5ncmFwaERvdHMgLmhvdmVye3N0cm9rZS13aWR0aDoyMHB4O3N0cm9rZS1vcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBWaWV3Q2hpbGQoJ2QzZ2VuZXJhbCcpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdlbmVyYWxEM0lucHV0OiBEM0dlbmVyYWxJbnB1dDtcblxuICAgIC8vIGNvbXBvbmVubnQgZGF0YSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIGdlbmVyYWxEYXRhOiBEM0dlbmVyYWxEYXRhc2V0W10gPSBbXTtcbiAgICBwcml2YXRlIGF4aXNPcHRpb25zOiBEM0dlbmVyYWxBeGlzT3B0aW9ucyA9IHt9O1xuICAgIHByaXZhdGUgcGxvdE9wdGlvbnM6IEQzR2VuZXJhbFBsb3RPcHRpb25zID0ge1xuICAgICAgICB4bGFiZWw6ICd4JyxcbiAgICAgICAgeWxhYmVsOiAneScsXG4gICAgICAgIGRhdGU6IGZhbHNlXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGVmYXVsdEdyYXBoT3B0aW9uczogRDNHZW5lcmFsR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICBwb2ludFJhZGl1czogMlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGdyYXBoIGNvbXBvbmVudHNcbiAgICBwcml2YXRlIHJhd1N2ZzogYW55O1xuICAgIHByaXZhdGUgZ3JhcGg6IGFueTtcbiAgICBwcml2YXRlIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZ3JhcGhGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG5cbiAgICAvLyBjb21wb25lbnQgc2V0dGluZ3NcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGJ1ZmZlciA9IDA7XG4gICAgcHJpdmF0ZSBtYXhMYWJlbHdpZHRoID0gMDtcblxuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDEwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IGQzLnNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5tYXJnaW4ubGVmdCArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaEZvY3VzID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cblxuICAgICAgICB0aGlzLnByZXBhcmVEYXRhKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5nZW5lcmFsRDNJbnB1dCAmJiB0aGlzLnJhd1N2Zykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dCA9IGNoYW5nZXMuZ2VuZXJhbEQzSW5wdXQuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhbEQzSW5wdXQpIHtcbiAgICAgICAgICAgIC8vIGFkZCBhbGwgaW5wdXQgZGF0YXNldCBpbnRvIG9uZSBhcnJheSAocHVibGljIGdlbmVyYWxEYXRhKVxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dC5kYXRhc2V0cy5mb3JFYWNoKChkcywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXNldDogRDNHZW5lcmFsRGF0YXNldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZHMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoZHMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMgPSB0aGlzLmdlbmVyYWxEM0lucHV0LnBsb3RPcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy5kYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYXhpc09wdGlvbnMueFJhbmdlID0gdGhpcy5nZXRSYW5nZShkYXRhLCAneCcpO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55UmFuZ2UgPSB0aGlzLmdldFJhbmdlKGRhdGEsICd5Jyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsIGZ1bmN0aW9ucyByZWxhdGVkIHRvIHBsb3R0aW5nIGEgZGF0YXNldCBpbiBhIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGxvdEdyYXBoKCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55U2NhbGUgPSB0aGlzLmRyYXdZYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy54U2NhbGUgPSB0aGlzLmRyYXdYYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGhGb2N1cy5hcHBlbmQoJ2cnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0Jyk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGhMaW5lKGRhdGFzZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgeSBheGlzLlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHtEM0dlbmVyYWxEYXRhc2V0fSBPYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdZYXhpcyhvcHRpb25zOiBEM0dlbmVyYWxQbG90T3B0aW9ucykge1xuXG4gICAgICAgIC8vIHNldCByYW5nZSBvZmZzZXQgZm9yIHkgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgeVJhbmdlT2Zmc2V0ID0gMTA7XG4gICAgICAgIGNvbnN0IHlSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueVJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBpZiAoeVJhbmdlLm1heCAhPT0geVJhbmdlLm1pbikge1xuICAgICAgICAgICAgeVJhbmdlT2Zmc2V0ID0gKHlSYW5nZS5tYXggLSB5UmFuZ2UubWluKSAqIDAuMTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5UmFuZ2VPZmZzZXQgPSB5UmFuZ2UubWluICogMC4xMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lSYW5nZS5taW4gLSB5UmFuZ2VPZmZzZXQsIHlSYW5nZS5tYXggKyB5UmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGNvbnN0IHlBeGlzR2VuID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCB5QXhpcyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzR2VuKTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpcyBsYWJlbFxuICAgICAgICBjb25zdCB5QXhpc0xhYmVsID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgdGhpcy5oZWlnaHQgLyAyICsgJylyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5QXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQnLCAnMThweCB0aW1lcycpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy55bGFiZWwpO1xuXG4gICAgICAgIC8vIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcueUF4aXNUZXh0TGFiZWwnKVxuICAgICAgICB0aGlzLmJ1ZmZlciA9IHlBeGlzLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyAxMCArIHRoaXMuZ2V0RGltZW5zaW9ucyh5QXhpc0xhYmVsLm5vZGUoKSkuaDtcblxuICAgICAgICB5QXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cbiAgICAgICAgLy8gZHJhdyB5IGdyaWQgbGluZXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHlTY2FsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHggYXhpcy5cbiAgICAgKiBAcGFyYW0gZGF0YXNldCB7RDNHZW5lcmFsRGF0YXNldH0gT2JqZWN0IHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WGF4aXMob3B0aW9uczogRDNHZW5lcmFsUGxvdE9wdGlvbnMpIHtcbiAgICAgICAgLy8gc2V0IHJhbmdlIG9mZnNldCBmb3IgeCBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHhSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueFJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBsZXQgdGlja3MgPSAxMDtcbiAgICAgICAgbGV0IHhSYW5nZU9mZnNldCA9ICh4UmFuZ2UubWF4IC0geFJhbmdlLm1pbikgKiAwLjEwO1xuICAgICAgICBpZiAoeFJhbmdlLm1heCA9PT0geFJhbmdlLm1pbikge1xuICAgICAgICAgICAgdGlja3MgPSA1O1xuICAgICAgICAgICAgeFJhbmdlT2Zmc2V0ID0geFJhbmdlLm1pbiAqIDAuMTA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFt4UmFuZ2UubWluIC0geFJhbmdlT2Zmc2V0LCB4UmFuZ2UubWF4ICsgeFJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5idWZmZXIsIHRoaXMud2lkdGhdKTtcblxuICAgICAgICBjb25zdCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgICAgICAgICAgLnRpY2tzKHRpY2tzKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZC52YWx1ZU9mKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRTZWNvbmQgPSAnOiVTJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1pbnV0ZSA9ICclSDolTScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdERheSA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRXZWVrID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFllYXIgPSAnJVknO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGQzLnRpbWVTZWNvbmQoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVIb3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVEYXkoZGF0ZSkgPCBkYXRlID8gZm9ybWF0SG91clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lWWVhcihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdFllYXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJyArIGQudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcblxuICAgICAgICAvLyBkcmF3IHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpc1xuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tzKDApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyBkcmF3IHggYXhpcyBsYWJlbFxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi5ib3R0b20gLSA1KVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy54bGFiZWwpO1xuXG4gICAgICAgIHJldHVybiB4U2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgbGluZSBvZiB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0QzR2VuZXJhbERhdGFzZXR9IE9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkYXRzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGhMaW5lKGRhdGFzZXQ6IEQzR2VuZXJhbERhdGFzZXQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGdyYWggbGluZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5ncmFwaEJvZHkgPSB0aGlzLmdyYXBoXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgZGF0YXNldC5pZCArICcpJyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2l0aCBkYXRhc2V0XG4gICAgICAgIGxldCBncmFwaExpbmUgPSBkMy5saW5lPEQzR2VuZXJhbERhdGFQb2ludD4oKVxuICAgICAgICAgICAgLmRlZmluZWQoZCA9PiAoIWlzTmFOKGQueCkgJiYgIWlzTmFOKGQueSkpKVxuICAgICAgICAgICAgLngoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnhTY2FsZShkLngpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeENvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnhDb29yZCA9IHhDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnlTY2FsZShkLnkpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeUNvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnlDb29yZCA9IHlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmN1cnZlKGQzLmN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmdyYXBoQm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgLmRhdHVtKGRhdGFzZXQuZGF0YSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLmxpbmVXaWR0aCA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5saW5lcy5saW5lV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignZCcsIGdyYXBoTGluZSk7XG5cbiAgICAgICAgLy8gZHJhdyBjaXJjbGVzIGFyb3VuZCBkYXRhcG9pbnRzXG4gICAgICAgIHRoaXMuZ3JhcGhCb2R5LnNlbGVjdEFsbCgnLmdyYXBoRG90cycpXG4gICAgICAgICAgICAuZGF0YShkYXRhc2V0LmRhdGEuZmlsdGVyKChkKSA9PiAhaXNOYU4oZC55KSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JhcGhEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RvdC0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJy0nICsgZGF0YXNldC5pZCArICcnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5jb2xvciA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGguY29sb3IgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignY3gnLCBncmFwaExpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgZ3JhcGhMaW5lLnkoKSlcbiAgICAgICAgICAgIC5hdHRyKCdyJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV0IG9mIHBvbHlnb25zIG92ZXJsYXlpbmcgdGhlIGdyYXBocyB0byBkaXZpZGUgc2VjdGlvbnMgZm9yIGhvdmVyaW5nLlxuICAgICAqIEBwYXJhbSBpbnB1dERhdGEge0QzR2VuZXJhbERhdGFzZXRbXX0gZGF0YSBjb250YWluaW5nIGFuIGFycmF5IHdpdGggYWxsIGRhdGFwb2ludHMgYW5kIGFuIGlkIGZvciBlYWNoIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUhvdmVyaW5nTmV0KGlucHV0RGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgZGF0YSA9IGlucHV0RGF0YS5tYXAoZnVuY3Rpb24gKHNlcmllcywgaSkge1xuICAgICAgICAgICAgc2VyaWVzLmRhdGEgPSBzZXJpZXMuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgcG9pbnQuc2VyaWVzID0gaTtcbiAgICAgICAgICAgICAgICBwb2ludFswXSA9IHBvaW50Lng7XG4gICAgICAgICAgICAgICAgcG9pbnRbMV0gPSBwb2ludC55O1xuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlcmllcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLFxuICAgICAgICAgICAgeSA9IGQzLnNjYWxlTGluZWFyKCk7XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBkMy5tZXJnZShkYXRhLm1hcChmdW5jdGlvbiAoY2wsIGxpbmVJbmRleCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjbCA9IHsgZGF0YTogW3swOiBudW1iZXIsIDE6IG51bWJlciwgc2VyaWVzOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyfSwge30sIC4uLl0sIGlkOiBudW1iZXIgfVxuICAgICAgICAgICAgICogcG9pbnQgPSBlYWNoIHBvaW50IGluIGEgZGF0YXNldFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBvdXRwdXRMaW5lID0gY2wuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50LCBwb2ludEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dFBvaW50ID0gW3gocG9pbnQueENvb3JkKSwgeShwb2ludC55Q29vcmQpLCBsaW5lSW5kZXgsIHBvaW50SW5kZXgsIHBvaW50LCBjbF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFBvaW50OyAvLyBhZGRpbmcgc2VyaWVzIGluZGV4IHRvIHBvaW50IGJlY2F1c2UgZGF0YSBpcyBiZWluZyBmbGF0dGVuZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpbmU7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVmZmVyLCAvLyArIHRoaXMubWFyZ2luLmxlZnQsXG4gICAgICAgICAgICB0b3AgPSB0aGlzLm1hcmdpbi50b3AsXG4gICAgICAgICAgICByaWdodCA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIsIC8vICsgdGhpcy5tYXJnaW4ubGVmdCxcbiAgICAgICAgICAgIGJvdHRvbSA9IHRoaXMubWFyZ2luLnRvcCArIHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcblxuICAgICAgICAvLyBmaWx0ZXIgZGF0YXNldCAtIGRlbGV0ZSBhbGwgZW50cmllcyB0aGF0IGFyZSBOYU5cbiAgICAgICAgbGV0IHZlcnRpY2VzRmlsdGVyZWQgPSB2ZXJ0aWNlcy5maWx0ZXIoZCA9PiAhaXNOYU4oZFswXSkgfHwgIWlzTmFOKGRbMV0pKTtcbiAgICAgICAgY29uc3QgRGlmZnZvcm9ub2kgPSBkMy52b3Jvbm9pKClcbiAgICAgICAgICAgIC5leHRlbnQoW1tsZWZ0LCB0b3BdLCBbcmlnaHQsIGJvdHRvbV1dKTtcbiAgICAgICAgbGV0IGRpZmZWb3Jvbm9pMiA9IERpZmZ2b3Jvbm9pLnBvbHlnb25zKHZlcnRpY2VzRmlsdGVyZWQpO1xuXG4gICAgICAgIGxldCB3cmFwID0gdGhpcy5yYXdTdmcuc2VsZWN0QWxsKCdnLmQzbGluZScpLmRhdGEoW3ZlcnRpY2VzRmlsdGVyZWRdKTtcbiAgICAgICAgbGV0IGdFbnRlciA9IHdyYXAuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdkM2xpbmUnKS5hcHBlbmQoJ2cnKTtcbiAgICAgICAgZ0VudGVyLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BvaW50LXBhdGhzJyk7XG5cbiAgICAgICAgLy8gdG8gYXZvaWQgbm8gaG92ZXJpbmcgZm9yIG9ubHkgb25lIGRhdGFzZXQgd2l0aG91dCBpbnRlcmFjdGlvbiB0aGUgZm9sbG93aW5nIGxpbmVzIGFyZSBkb3VibGVkXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgdGhlIHBhdGhzLCB3aGljaCBjYW4gYmUgdXBkYXRlZCBsYXRlciBvbiAoYnkgdGhlICdleGl0KCkucmVtb3ZlKCknIGZ1bmN0aW9uIGNhbGxzKVxuICAgICAgICBsZXQgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHBvaW50UGF0aHMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBwb2ludFBhdGhzXG4gICAgICAgICAgICAuYXR0cignY2xpcC1wYXRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkLmRhdGFbNF0ueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQuZGF0YVs0XS54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjY2xpcC0nICsgZC5kYXRhWzVdLmlkICsgJy0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCcgJykgKyAnWic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbi5sZWZ0ICsgJywgJyArIHRoaXMubWFyZ2luLnRvcCArICcpJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSBkLmRhdGFbNF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gdGhpcy5jYWxjRGlzdGFuY2VIb3ZlcmluZyhkYXRhc2V0LCBjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEJhY2sgPSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPj0gMCAmJiBjb29yZHNbMF0gPD0gcmVjdEJhY2sud2lkdGggJiYgY29vcmRzWzFdID49IDAgJiYgY29vcmRzWzFdIDw9IHJlY3RCYWNrLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkYXRhc2V0eENvb3JkU3BsaXQgKyAnLScgKyBkLmRhdGFbNV0uaWQgKyAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwLjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgKHJhZGl1cyAqIDIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLnBsb3RPcHRpb25zLmRhdGUgPyAneDogJyArIG1vbWVudChkYXRhc2V0LngpLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKSArICcgeTogJyArIGRhdGFzZXQueSA6ICd4OiAnICsgZGF0YXNldC54ICsgJyB5OiAnICsgZGF0YXNldC55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkb3RMYWJlbCA9IHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdExhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgY29sb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMiA+IGNvb3Jkc1swXSkgeyBvbkxlZnRTaWRlID0gdHJ1ZTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZGF0YXNldC55Q29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RXOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS53ICsgODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEg6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLmg7IC8vICsgNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0WCA9IGRhdGFzZXQueENvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkYXRhc2V0LnlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvb3Jkc1sxXSArIHJlY3RIICsgNCkgPiB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBsYWJlbCBiZWxvdyB4IGF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RyYW5zbGF0ZSBsYWJlbCB0byBhIGhpZ2hlciBwbGFjZS4gLSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDQgKyAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFggPSBkYXRhc2V0LnhDb29yZCAtIHJlY3RXICsgNCAtIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFkgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGxhYmVsWCArICcsICcgKyBsYWJlbFkgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5oaWdobGlnaHQgaG92ZXJlZCBkb3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldCA9IGQuZGF0YVs0XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLnBvaW50UmFkaXVzIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmxpbmVzLnBvaW50UmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldHhDb29yZFNwbGl0ID0gZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJy0nICsgZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBtb3VzZSBhbmQgYSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHt9IENvb3JkaW5hdGVzIG9mIHRoZSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBjb29yZHMge30gQ29vcmRpbmF0ZXMgb2YgdGhlIG1vdXNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0Rpc3RhbmNlSG92ZXJpbmcoZGF0YXNldDogRDNHZW5lcmFsRGF0YVBvaW50LCBjb29yZHM6IFtudW1iZXIsIG51bWJlcl0pOiBudW1iZXIge1xuICAgICAgICBsZXQgbVggPSBjb29yZHNbMF0gKyB0aGlzLmJ1ZmZlcixcbiAgICAgICAgICAgIG1ZID0gY29vcmRzWzFdLCAvLyArIHRoaXMubWFyZ2luLnRvcCxcbiAgICAgICAgICAgIHBYID0gZGF0YXNldC54Q29vcmQsXG4gICAgICAgICAgICBwWSA9IGRhdGFzZXQueUNvb3JkO1xuICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludCBhbmQgbW91c2Ugd2hlbiBob3ZlcmluZ1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChwWCAtIG1YKSwgMikgKyBNYXRoLnBvdygocFkgLSBtWSksIDIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmdlKGRhdGE6IEQzR2VuZXJhbERhdGFQb2ludFtdLCBzZWxlY3Rvcjogc3RyaW5nKTogUmFuZ2Uge1xuICAgICAgICAvLyByYW5nZSBmb3IgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBkMy5leHRlbnQoZDMudmFsdWVzKGRhdGEubWFwKChkKSA9PiB7XG4gICAgICAgICAgICBpZiAoKCFpc05hTihkLngpICYmICFpc05hTihkLnkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkW3NlbGVjdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKTtcbiAgICAgICAgcmV0dXJuIHsgbWluOiByYW5nZVswXSwgbWF4OiByYW5nZVsxXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBib3VuZGluZ3Mgb2YgYSBodG1sIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsIHtPYmplY3R9IE9iamVjdCBvZiB0aGUgaHRtbCBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KTogeyB3OiBudW1iZXIsIGg6IG51bWJlciB9IHtcbiAgICAgICAgbGV0IHcgPSAwO1xuICAgICAgICBsZXQgaCA9IDA7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLmdldEJCb3goKTtcbiAgICAgICAgICAgIHcgPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgaCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBnZXREaW1lbnNpb25zKCkgJyArIGVsICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBoXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG59IGZyb20gJy4vZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy1nZW5lcmFsLWdyYXBoL2QzLWdlbmVyYWwtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRDNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJkMy5tb3VzZSIsImQzLnNlbGVjdEFsbCIsImQzLnNlbGVjdCIsImQzLmV2ZW50IiwiZDMuZXh0ZW50IiwiZDMuem9vbSIsImQzLmRyYWciLCJkMy5icnVzaFgiLCJsaW5lIiwiZDMuc2NhbGVUaW1lIiwiZDMuYXhpc0JvdHRvbSIsImQzLnRpbWVTZWNvbmQiLCJkMy50aW1lTWludXRlIiwiZDMudGltZUhvdXIiLCJkMy50aW1lRGF5IiwiZDMudGltZU1vbnRoIiwiZDMudGltZVdlZWsiLCJkMy50aW1lWWVhciIsImQzLmF4aXNUb3AiLCJkMy5zY2FsZUxpbmVhciIsImQzLmF4aXNMZWZ0IiwiZDMubGluZSIsImQzLmN1cnZlTGluZWFyIiwiZDMuYmlzZWN0b3IiLCJtaW4iLCJkMy5taW4iLCJ2YWx1ZXMiLCJkMy5tZXJnZSIsImQzLnZvcm9ub2kiLCJkMy52YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQTJESSw0Q0FDYyxRQUFjLEVBQ2QsRUFBcUI7UUFEckIsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUNkLE9BQUUsR0FBRixFQUFFLENBQW1CO2lDQWpCZ0IsSUFBSSxZQUFZLEVBQUU7eUJBRzNCLElBQUksWUFBWSxFQUFFO2dDQUdYLElBQUksWUFBWSxFQUFFO29CQU9wRCxLQUFLO1FBTWhCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3pDO2FBQU07WUFDSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDOUM7S0FDSjs7OztJQUVNLDREQUFlOzs7O1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7O0lBR3JCLHdEQUFXOzs7O2NBQUMsT0FBc0I7UUFDckMsSUFBSSxPQUFPLG9CQUFpQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ2pDOzs7OztJQUdFLHdEQUFXOzs7O1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7O0lBR2QsNERBQWU7Ozs7Y0FBQyxRQUFrQjtRQUNy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