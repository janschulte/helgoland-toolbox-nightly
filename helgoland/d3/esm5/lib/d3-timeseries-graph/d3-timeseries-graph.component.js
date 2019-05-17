/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, IterableDiffers, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { ColorService, DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, Timeseries, Timespan, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import * as d3 from 'd3';
import moment from 'moment';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
import { HoveringStyle } from '../model/d3-plot-options';
/**
 * @record
 */
export function DataEntry() { }
/** @type {?} */
DataEntry.prototype.timestamp;
/** @type {?} */
DataEntry.prototype.value;
/** @type {?|undefined} */
DataEntry.prototype.xDiagCoord;
/** @type {?|undefined} */
DataEntry.prototype.yDiagCoord;
/**
 * @record
 */
export function InternalDataEntry() { }
/** @type {?} */
InternalDataEntry.prototype.internalId;
/** @type {?|undefined} */
InternalDataEntry.prototype.id;
/** @type {?} */
InternalDataEntry.prototype.color;
/** @type {?} */
InternalDataEntry.prototype.data;
/** @type {?|undefined} */
InternalDataEntry.prototype.selected;
/** @type {?} */
InternalDataEntry.prototype.points;
/** @type {?|undefined} */
InternalDataEntry.prototype.lines;
/** @type {?|undefined} */
InternalDataEntry.prototype.bars;
/** @type {?} */
InternalDataEntry.prototype.axisOptions;
/** @type {?} */
InternalDataEntry.prototype.visible;
/** @type {?|undefined} */
InternalDataEntry.prototype.focusLabelRect;
/** @type {?|undefined} */
InternalDataEntry.prototype.focusLabel;
/**
 * @record
 */
export function DataConst() { }
/** @type {?|undefined} */
DataConst.prototype.data;
/**
 * @record
 */
export function YRanges() { }
/** @type {?} */
YRanges.prototype.uom;
/** @type {?|undefined} */
YRanges.prototype.range;
/** @type {?|undefined} */
YRanges.prototype.preRange;
/** @type {?|undefined} */
YRanges.prototype.originRange;
/** @type {?} */
YRanges.prototype.zeroBased;
/** @type {?} */
YRanges.prototype.autoRange;
/** @type {?} */
YRanges.prototype.outOfrange;
/** @type {?|undefined} */
YRanges.prototype.id;
/** @type {?|undefined} */
YRanges.prototype.ids;
/** @type {?|undefined} */
YRanges.prototype.first;
/** @type {?|undefined} */
YRanges.prototype.yScale;
/** @type {?|undefined} */
YRanges.prototype.offset;
/** @type {?} */
YRanges.prototype.parameters;
/**
 * @record
 */
function YScale() { }
/** @type {?} */
YScale.prototype.buffer;
/** @type {?} */
YScale.prototype.yScale;
/**
 * @record
 */
function YAxisSelection() { }
/** @type {?} */
YAxisSelection.prototype.id;
/** @type {?} */
YAxisSelection.prototype.clicked;
/** @type {?|undefined} */
YAxisSelection.prototype.ids;
/** @type {?|undefined} */
YAxisSelection.prototype.uom;
/**
 * @record
 */
function HighlightDataset() { }
/** @type {?} */
HighlightDataset.prototype.id;
/** @type {?} */
HighlightDataset.prototype.change;
var D3TimeseriesGraphComponent = /** @class */ (function (_super) {
    tslib_1.__extends(D3TimeseriesGraphComponent, _super);
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
                var node = /** @type {?} */ (tspan.node());
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
export { D3TimeseriesGraphComponent };
if (false) {
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.mainTimeInterval;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.onHighlightChanged;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.onClickDataPoint;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.d3Elem;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.highlightOutput;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.rawSvg;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.graph;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.graphFocus;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.graphBody;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragRect;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragRectG;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.background;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.copyright;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.focusG;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.highlightFocus;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.highlightRect;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.highlightText;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.focuslabelTime;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragging;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragStart;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragCurrent;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.draggingMove;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragMoveStart;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dragMoveRange;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.mousedownBrush;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.oldGroupYaxis;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.preparedData;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.datasetMap;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.listOfUoms;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.yRangesEachUom;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.dataYranges;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.xAxisRange;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.xAxisRangeOrigin;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.xAxisRangePan;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.listOfSeparation;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.yAxisSelect;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.xScaleBase;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.yScaleBase;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.labelTimestamp;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.labelXCoord;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.distLabelXCoord;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.bufferSum;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.height;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.width;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.margin;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.maxLabelwidth;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.opac;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.addLineWidth;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.loadingCounter;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.currentTimeId;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.plotOptions;
    /**
     * Function that shows labeling via mousmove.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.mousemoveHandler;
    /**
     * Function that hides the labeling inside the graph.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.mouseoutHandler;
    /**
     * Function starting the drag handling for the diagram.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.panStartHandler;
    /**
     * Function that controlls the panning (dragging) of the graph.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.panMoveHandler;
    /**
     * Function that ends the dragging control.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.panEndHandler;
    /**
     * Function that starts the zoom handling.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.zoomStartHandler;
    /**
     * Function that draws a rectangle when zoom is started and the mouse is moving.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.zoomHandler;
    /**
     * Function that ends the zoom handling and calculates the via zoom selected time interval.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.zoomEndHandler;
    /**
     * Function that enables the lableing of each dataset entry.
     * \@param entry {InternalDataEntry} Object containing the dataset.
     * \@param idx {Number} Number with the position of the dataset entry in the data array.
     * \@param xCoordMouse {Number} Number of the x coordinate of the mouse.
     * \@param entryIdx {Number} Number of the index of the entry.
     * @type {?}
     */
    D3TimeseriesGraphComponent.prototype.showDiagramIndicator;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.iterableDiffers;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.api;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.datasetIdResolver;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.timeFormatLocaleService;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.colorService;
    /** @type {?} */
    D3TimeseriesGraphComponent.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixHQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUVaLG1CQUFtQixFQUVuQix5QkFBeUIsRUFHekIsaUJBQWlCLEVBRWpCLElBQUksRUFDSixVQUFVLEVBRVYsUUFBUSxHQUNYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUVwRixPQUFPLEVBQWlCLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNEY1RCxzREFBd0Q7SUErRmhFLG9DQUNjLGVBQWdDLEVBQ2hDLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxRQUFjLEVBQ2QsdUJBQWtELEVBQ2xELFlBQTBCLEVBQzFCLGdCQUFrQztRQVBoRCxZQVNJLGtCQUFNLGVBQWUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLFNB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OztRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Ozs7O0lBTXpILHVDQUFFOzs7OztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQzthQUMzQyxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBT2QsNENBQU87Ozs7O2NBQUMsS0FBVTtRQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBMXBFNUIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSwwQ0FDYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxpZUFBaWUsQ0FBQztvQkFDM2UsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7O2dCQXBIRyxlQUFlO2dCQVFmLG1CQUFtQjtnQkFLbkIsaUJBQWlCO2dCQUVqQixJQUFJO2dCQVNDLHlCQUF5QjtnQkFsQjlCLFlBQVk7Z0JBY1UsZ0JBQWdCOzs7bUNBcUdyQyxLQUFLO3FDQUlMLE1BQU07bUNBR04sTUFBTTt5QkFHTixTQUFTLFNBQUMsY0FBYzs7cUNBekk3QjtFQTRIWSx5QkFBeUI7U0FEeEIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbG9yU2VydmljZSxcbiAgICBEYXRhLFxuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbERhdGFzZXRJZCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBNaW5NYXhSYW5nZSxcbiAgICBUaW1lLFxuICAgIFRpbWVzZXJpZXMsXG4gICAgVGltZXNlcmllc0RhdGEsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgeyBIaWdobGlnaHRPdXRwdXQgfSBmcm9tICcuLi9tb2RlbC9kMy1oaWdobGlnaHQnO1xuaW1wb3J0IHsgRDNQbG90T3B0aW9ucywgSG92ZXJpbmdTdHlsZSB9IGZyb20gJy4uL21vZGVsL2QzLXBsb3Qtb3B0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUVudHJ5IHtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIHhEaWFnQ29vcmQ/OiBudW1iZXI7XG4gICAgeURpYWdDb29yZD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbERhdGFFbnRyeSB7XG4gICAgaW50ZXJuYWxJZDogc3RyaW5nO1xuICAgIGlkPzogbnVtYmVyOyAvLyBUT0RPIG5lZWRlZD9cbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGRhdGE6IERhdGFFbnRyeVtdO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBwb2ludHM6IHtcbiAgICAgICAgZmlsbENvbG9yOiBzdHJpbmdcbiAgICB9O1xuICAgIGxpbmVzPzoge1xuICAgICAgICBsaW5lV2lkdGg/OiBudW1iZXI7XG4gICAgICAgIHBvaW50UmFkaXVzPzogbnVtYmVyO1xuICAgIH07XG4gICAgYmFycz86IHtcbiAgICAgICAgbGluZVdpZHRoPzogbnVtYmVyO1xuICAgIH07XG4gICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgdW9tOiBzdHJpbmc7XG4gICAgICAgIGxhYmVsPzogc3RyaW5nO1xuICAgICAgICB6ZXJvQmFzZWQ/OiBib29sZWFuO1xuICAgICAgICB5QXhpc1JhbmdlPzogTWluTWF4UmFuZ2U7XG4gICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gICAgICAgIHNlcGFyYXRlWUF4aXM/OiBib29sZWFuO1xuICAgICAgICBwYXJhbWV0ZXJzPzoge1xuICAgICAgICAgICAgZmVhdHVyZT86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICAgICAgcGhlbm9tZW5vbj86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICAgICAgb2ZmZXJpbmc/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgZm9jdXNMYWJlbFJlY3Q/OiBhbnk7XG4gICAgZm9jdXNMYWJlbD86IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhQ29uc3QgZXh0ZW5kcyBJRGF0YXNldCB7XG4gICAgZGF0YT86IERhdGE8W251bWJlciwgbnVtYmVyXT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWVJhbmdlcyB7XG4gICAgdW9tOiBzdHJpbmc7XG4gICAgcmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgcHJlUmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgb3JpZ2luUmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgemVyb0Jhc2VkOiBib29sZWFuO1xuICAgIGF1dG9SYW5nZTogYm9vbGVhbjtcbiAgICBvdXRPZnJhbmdlOiBib29sZWFuO1xuICAgIGlkPzogc3RyaW5nOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSBpbnRlcm5hbElkXG4gICAgaWRzPzogc3RyaW5nW107IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IHVvbVxuICAgIGZpcnN0PzogYm9vbGVhbjtcbiAgICB5U2NhbGU/OiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gICAgb2Zmc2V0PzogbnVtYmVyO1xuICAgIHBhcmFtZXRlcnM6IHsgICAvLyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciB0aGUgeSBheGlzIGxhYmVsXG4gICAgICAgIGZlYXR1cmU/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgcGhlbm9tZW5vbj86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICBvZmZlcmluZz86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgIH07XG59XG5cbmludGVyZmFjZSBZU2NhbGUge1xuICAgIGJ1ZmZlcjogbnVtYmVyO1xuICAgIHlTY2FsZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xufVxuXG5pbnRlcmZhY2UgWUF4aXNTZWxlY3Rpb24ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2xpY2tlZDogYm9vbGVhbjtcbiAgICBpZHM/OiBBcnJheTxzdHJpbmc+O1xuICAgIHVvbT86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEhpZ2hsaWdodERhdGFzZXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2hhbmdlOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkM1wiICNkM3RpbWVzZXJpZXM+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5ncmFwaERvdHN7c3Ryb2tlLXdpZHRoOjA7c3Ryb2tlLW9wYWNpdHk6MX0uZDMgLmdyYXBoRG90cyAuaG92ZXJ7c3Ryb2tlLXdpZHRoOjIwcHg7c3Ryb2tlLW9wYWNpdHk6LjV9LmQzIC5mb3JtZXJCdXR0b24sLmQzIC5sYXRlckJ1dHRvbntmaWxsOmdyZXk7b3BhY2l0eTouM30uZDMgLmZvcm1lckJ1dHRvbjpob3ZlciwuZDMgLmxhdGVyQnV0dG9uOmhvdmVye29wYWNpdHk6LjZ9LmQzIC5hcnJvd3tzdHJva2U6Z3JleTtzdHJva2Utd2lkdGg6M3B4fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIEQzUGxvdE9wdGlvbnM+XG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgLy8gZGlmZmVyZW5jZSB0byB0aW1lc3Bhbi90aW1lSW50ZXJ2YWwgLS0+IGlmIGJydXNoLCB0aGVuIHRoaXMgaXMgdGhlIHRpbWVzcGFuIG9mIHRoZSBtYWluLWRpYWdyYW1cbiAgICBwdWJsaWMgbWFpblRpbWVJbnRlcnZhbDogVGltZXNwYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25IaWdobGlnaHRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SGlnaGxpZ2h0T3V0cHV0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNsaWNrRGF0YVBvaW50OiBFdmVudEVtaXR0ZXI8VGltZXNlcmllc0RhdGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdkM3RpbWVzZXJpZXMnKVxuICAgIHB1YmxpYyBkM0VsZW06IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgaGlnaGxpZ2h0T3V0cHV0OiBIaWdobGlnaHRPdXRwdXQ7XG5cbiAgICAvLyBET00gZWxlbWVudHNcbiAgICBwcm90ZWN0ZWQgcmF3U3ZnOiBhbnk7IC8vIGQzLlNlbGVjdGlvbjxFbnRlckVsZW1lbnQsIHt9LCBudWxsLCB1bmRlZmluZWQ+O1xuICAgIHByb3RlY3RlZCBncmFwaDogYW55O1xuICAgIHByb3RlY3RlZCBncmFwaEZvY3VzOiBhbnk7XG4gICAgcHJvdGVjdGVkIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgZHJhZ1JlY3Q6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0RzogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgY29weXJpZ2h0OiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c0c6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodEZvY3VzOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c2xhYmVsVGltZTogYW55O1xuXG4gICAgLy8gb3B0aW9ucyBmb3IgaW50ZXJhY3Rpb25cbiAgICBwcml2YXRlIGRyYWdnaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgZHJhZ1N0YXJ0OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ0N1cnJlbnQ6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBkcmFnZ2luZ01vdmU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkcmFnTW92ZVN0YXJ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkcmFnTW92ZVJhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgbW91c2Vkb3duQnJ1c2g6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBvbGRHcm91cFlheGlzOiBib29sZWFuO1xuXG4gICAgLy8gZGF0YSB0eXBlc1xuICAgIHByb3RlY3RlZCBwcmVwYXJlZERhdGE6IEludGVybmFsRGF0YUVudHJ5W10gPSBbXTsgLy8gOiBEYXRhU2VyaWVzW11cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE1hcDogTWFwPHN0cmluZywgRGF0YUNvbnN0PiA9IG5ldyBNYXAoKTtcbiAgICBwcm90ZWN0ZWQgbGlzdE9mVW9tczogc3RyaW5nW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgeVJhbmdlc0VhY2hVb206IFlSYW5nZXNbXSA9IFtdOyAvLyB5IGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyByYW5nZXMgZm9yIGVhY2ggdW9tXG4gICAgcHJvdGVjdGVkIGRhdGFZcmFuZ2VzOiBZUmFuZ2VzW10gPSBbXTsgLy8geSBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmFuZ2VzIG9mIGFsbCBkYXRhc2V0c1xuICAgIHByaXZhdGUgeEF4aXNSYW5nZTogVGltZXNwYW47IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSB4QXhpc1JhbmdlT3JpZ2luOiBhbnkgPSBbXTsgLy8geCBkb21haW4gcmFuZ2VcbiAgICBwcml2YXRlIHhBeGlzUmFuZ2VQYW46IFtudW1iZXIsIG51bWJlcl07IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSBsaXN0T2ZTZXBhcmF0aW9uID0gQXJyYXkoKTtcbiAgICBwcml2YXRlIHlBeGlzU2VsZWN0O1xuXG4gICAgcHJpdmF0ZSB4U2NhbGVCYXNlOiBkMy5TY2FsZVRpbWU8bnVtYmVyLCBudW1iZXI+OyAvLyBjYWxjdWxhdGUgZGlhZ3JhbSBjb29yZCBvZiB4IHZhbHVlXG4gICAgcHJpdmF0ZSB5U2NhbGVCYXNlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47IC8vIGNhbGN1bGF0ZSBkaWFncmFtIGNvb3JkIG9mIHkgdmFsdWVcbiAgICAvLyBwcml2YXRlIGRvdHNPYmplY3RzOiBhbnlbXTtcbiAgICBwcml2YXRlIGxhYmVsVGltZXN0YW1wOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGxhYmVsWENvb3JkOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGRpc3RMYWJlbFhDb29yZDogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBidWZmZXJTdW06IG51bWJlcjtcblxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDQwXG4gICAgfTtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuICAgIHByaXZhdGUgb3BhYyA9IHtcbiAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgaG92ZXI6IDAuMyxcbiAgICAgICAgY2xpY2s6IDAuNVxuICAgIH07XG4gICAgcHJpdmF0ZSBhZGRMaW5lV2lkdGggPSAyOyAvLyB2YWx1ZSBhZGRlZCB0byBsaW5ld2lkdGhcbiAgICBwcml2YXRlIGxvYWRpbmdDb3VudGVyID0gMDtcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lSWQ6IHN0cmluZztcblxuICAgIC8vIGRlZmF1bHQgcGxvdCBvcHRpb25zXG4gICAgcHJpdmF0ZSBwbG90T3B0aW9uczogRDNQbG90T3B0aW9ucyA9IHtcbiAgICAgICAgc2hvd1JlZmVyZW5jZVZhbHVlczogZmFsc2UsXG4gICAgICAgIGdlbmVyYWxpemVBbGx3YXlzOiB0cnVlLFxuICAgICAgICB0b2dnbGVQYW5ab29tOiB0cnVlLFxuICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgIGhvdmVyU3R5bGU6IEhvdmVyaW5nU3R5bGUucG9pbnQsXG4gICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIHlheGlzOiB0cnVlLFxuICAgICAgICBvdmVydmlldzogZmFsc2UsXG4gICAgICAgIHNob3dUaW1lTGFiZWw6IHRydWUsXG4gICAgICAgIHJlcXVlc3RCZWZvcmVBZnRlclZhbHVlczogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaXRlcmFibGVEaWZmZXJzLCBhcGksIGRhdGFzZXRJZFJlc29sdmVyLCB0aW1lU3J2YywgdHJhbnNsYXRlU2VydmljZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUlkID0gdGhpcy51dWlkdjQoKTtcbiAgICAgICAgLy8gdGhpcy5kb3RzT2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmF3U3ZnID0gZDMuc2VsZWN0KHRoaXMuZDNFbGVtLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGhGb2N1cyA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMubW91c2Vkb3duQnJ1c2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGRhdGFzZXRJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0TWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0RGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGlkKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXMoaWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHRpbWVzZXJpZXMpID0+IHRoaXMubG9hZEFkZGVkRGF0YXNldCh0aW1lc2VyaWVzKSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YXNldCkgPT4gdGhpcy5sb2FkQWRkZWREYXRhc2V0KGRhdGFzZXQpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzID0gW107XG4gICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbiA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICBsZXQgc3BsaWNlSWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChzcGxpY2VJZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKHNwbGljZUlkeCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YShlbnRyeSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmICghdHNEYXRhLnNlbGVjdGVkIHx8IHRzRGF0YS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0c0RhdGEuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdHNEYXRhLmxpbmVzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyA+IDAgPyB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgKz0gdGhpcy5hZGRMaW5lV2lkdGggOiB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgKz0gMDtcbiAgICAgICAgICAgIHRzRGF0YS5iYXJzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHRzRGF0YS5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzIHx8ICF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKHRzRGF0YS5pbnRlcm5hbElkLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtpbnRlcm5hbElkXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2ludGVybmFsSWRdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0c0RhdGEuYXhpc09wdGlvbnMudW9tO1xuICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ1VvbSA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZChlbCA9PiBlbC51b20gPT09IGlkZW50aWZpZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tLmlkcy5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGludGVybmFsSWQpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3RvcihpZGVudGlmaWVyLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMucHVzaChpbnRlcm5hbElkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBheGlzIGZvciB1b20gb2YgZGF0YXNldCB3aXRoIHNlbGVjdGVkIGludGVybmFsSWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tICE9PSB1bmRlZmluZWQgJiYgZXhpc3RpbmdVb20uaWRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgaGlnaGxpZ2h0IGF4aXMgb2YgdW9tIGlmIGFsbCBkYXRhc2V0cyB3aXRoIHRoaXMgdW9tIGFyZSBoaWdobGlnaHRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY291bnQgZGF0YXNldHMgZm9yIHNwZWNpZmljIHVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzLmxlbmd0aCAhPT0gZXhpc3RpbmdVb20uaWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0c0RhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlKSA9PiBlLmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAodHNEYXRhLnNlbGVjdGVkIHx8IHRzRGF0YS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0c0RhdGEuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggLT0gdGhpcy5hZGRMaW5lV2lkdGg7XG4gICAgICAgICAgICB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgPiAwID8gdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzIC09IHRoaXMuYWRkTGluZVdpZHRoIDogdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzIC09IDA7XG4gICAgICAgICAgICB0c0RhdGEuYmFycy5saW5lV2lkdGggLT0gdGhpcy5hZGRMaW5lV2lkdGg7XG5cbiAgICAgICAgICAgIGlmICh0c0RhdGEuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyB8fCAhdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3Rvcih0c0RhdGEuaW50ZXJuYWxJZCwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W3RzRGF0YS5pbnRlcm5hbElkXS5pZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0c0RhdGEuYXhpc09wdGlvbnMudW9tO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllciwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMgPSB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcy5maWx0ZXIoZWwgPT4gZWwgIT09IGludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBEM1Bsb3RPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMub2xkR3JvdXBZYXhpcyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcztcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJTdHlsZSAhPT0gSG92ZXJpbmdTdHlsZS5wb2ludCAmJiBvcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnZy5kM2xpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGxvdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5yYXdTdmcgJiYgdGhpcy55UmFuZ2VzRWFjaFVvbSkge1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgdGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEoZGF0YXNldCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjZW50ZXJUaW1lKHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNlbnRlcmVkVGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNlbnRlclRpbWVzcGFuKHRoaXMudGltZXNwYW4sIG5ldyBEYXRlKHRpbWVzdGFtcCkpO1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQoY2VudGVyZWRUaW1lc3Bhbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQobmV3IFRpbWVzcGFuKGZyb20sIHRvKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQWRkZWREYXRhc2V0KGRhdGFzZXQ6IElEYXRhc2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCBkYXRhc2V0KTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEoZGF0YXNldCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgZGF0YSBvZiBkYXRhc2V0XG4gICAgcHJpdmF0ZSBsb2FkRGF0YXNldERhdGEoZGF0YXNldDogSURhdGFzZXQsIGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvdW50ZXIgPT09IDApIHsgdGhpcy5vbkNvbnRlbnRMb2FkaW5nLmVtaXQodHJ1ZSk7IH1cbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlcisrO1xuXG4gICAgICAgIGlmIChkYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRoaXMudGltZXNwYW4sIDAuMik7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFRzRGF0YTxbbnVtYmVyLCBudW1iZXJdPihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZmxvdCcsXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMgfHwgdGhpcy5wbG90T3B0aW9ucy5yZXF1ZXN0QmVmb3JlQWZ0ZXJWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYWxpemU6IHRoaXMucGxvdE9wdGlvbnMuZ2VuZXJhbGl6ZUFsbHdheXMgfHwgZGF0YXNldE9wdGlvbnMuZ2VuZXJhbGl6ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyBmb3JjZVVwZGF0ZTogZm9yY2UgfVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5wcmVwYXJlVHNEYXRhKGRhdGFzZXQsIHJlc3VsdCksXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25Db21wbGV0ZUxvYWRpbmdEYXRhKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29tcGxldGVMb2FkaW5nRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlci0tO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nQ291bnRlciA9PT0gMCkgeyB0aGlzLm9uQ29udGVudExvYWRpbmcuZW1pdChmYWxzZSk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBwcmVwYXJlIGVhY2ggZGF0YXNldCBmb3IgdGhlIGdyYXBoIGFuZCBhZGRpbmcgaXQgdG8gYW4gYXJyYXkgb2YgZGF0YXNldHMuXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0lEYXRhc2V0fSBPYmplY3Qgb2YgdGhlIHdob2xlIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUc0RhdGEoZGF0YXNldDogSURhdGFzZXQsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4pOiB2b2lkIHtcblxuICAgICAgICAvLyBhZGQgc3Vycm91bmRpbmcgZW50cmllcyB0byB0aGUgc2V0XG4gICAgICAgIGlmIChkYXRhLnZhbHVlQmVmb3JlVGltZXNwYW4pIHsgZGF0YS52YWx1ZXMudW5zaGlmdChkYXRhLnZhbHVlQmVmb3JlVGltZXNwYW4pOyB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlQWZ0ZXJUaW1lc3BhbikgeyBkYXRhLnZhbHVlcy5wdXNoKGRhdGEudmFsdWVBZnRlclRpbWVzcGFuKTsgfVxuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS5kYXRhID0gZGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldElkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuXG4gICAgICAgIC8vIFRPRE86IGNoYW5nZSB1b20gZm9yIHRlc3RpbmdcbiAgICAgICAgLy8gaWYgKHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgIGRhdGFzZXQudW9tID0gJ21jJztcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGdlbmVyYXRlIHJhbmRvbSBjb2xvciwgaWYgY29sb3IgaXMgbm90IGRlZmluZWRcbiAgICAgICAgaWYgKHN0eWxlcy5jb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLmNvbG9yU2VydmljZS5nZXRDb2xvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5kIG9mIGNoZWNrIGZvciBkYXRhc2V0c1xuICAgICAgICBjb25zdCBkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgaW50ZXJuYWxJZDogZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICAgICAgaWQ6IChkYXRhc2V0SWR4ID49IDAgPyBkYXRhc2V0SWR4IDogdGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoKSxcbiAgICAgICAgICAgIGNvbG9yOiBzdHlsZXMuY29sb3IsXG4gICAgICAgICAgICBkYXRhOiBzdHlsZXMudmlzaWJsZSA/IGRhdGEudmFsdWVzLm1hcChkID0+ICh7IHRpbWVzdGFtcDogZFswXSwgdmFsdWU6IGRbMV0gfSkpIDogW10sXG4gICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHN0eWxlcy5jb2xvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiBzdHlsZXMucG9pbnRSYWRpdXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB1b206IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhc2V0LmxhYmVsLFxuICAgICAgICAgICAgICAgIHplcm9CYXNlZDogc3R5bGVzLnplcm9CYXNlZFlBeGlzLFxuICAgICAgICAgICAgICAgIHlBeGlzUmFuZ2U6IHN0eWxlcy55QXhpc1JhbmdlLFxuICAgICAgICAgICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbjogc3R5bGVzLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICBzZXBhcmF0ZVlBeGlzOiBzdHlsZXMuc2VwYXJhdGVZQXhpcyxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmU6IGRhdGFzZXQucGFyYW1ldGVycy5mZWF0dXJlLFxuICAgICAgICAgICAgICAgICAgICBwaGVub21lbm9uOiBkYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbixcbiAgICAgICAgICAgICAgICAgICAgb2ZmZXJpbmc6IGRhdGFzZXQucGFyYW1ldGVycy5vZmZlcmluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBzdHlsZXMudmlzaWJsZVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBzZXBhcmF0aW9uSWR4OiBudW1iZXIgPSB0aGlzLmxpc3RPZlNlcGFyYXRpb24uZmluZEluZGV4KChpZCkgPT4gaWQgPT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChzdHlsZXMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgaWYgKHNlcGFyYXRpb25JZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0T2ZTZXBhcmF0aW9uLnB1c2goZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbiA9IHRoaXMubGlzdE9mU2VwYXJhdGlvbi5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbHRlcm5hdGl2ZSBsaW5ld1dpZHRoID0gdGhpcy5wbG90T3B0aW9ucy5zZWxlY3RlZC5pbmNsdWRlcyhkYXRhc2V0LnVvbSlcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2YoZGF0YXNldC5pbnRlcm5hbElkKSA+PSAwKSB7XG4gICAgICAgICAgICBkYXRhRW50cnkubGluZXMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuICAgICAgICAgICAgZGF0YUVudHJ5LmxpbmVzLnBvaW50UmFkaXVzID4gMCA/IGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyArPSB0aGlzLmFkZExpbmVXaWR0aCA6IGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyArPSAwO1xuICAgICAgICAgICAgZGF0YUVudHJ5LmJhcnMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKGRhdGFFbnRyeS5pbnRlcm5hbElkLCBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmlkcy5wdXNoKGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBzZWxlY3RlZCBkYXRhc2V0cyBmb3IgaGlnaGxpZ2h0aW5nXG4gICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMuZmluZEluZGV4KGVsID0+IGVsID09PSBkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZWQgPSB0aGlzLmNvdW50R3JvdXBlZERhdGFzZXRzKGRhdGFFbnRyeS5heGlzT3B0aW9ucy51b20sIGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLmxlbmd0aCA9PT0gY291bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdICYmIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLnB1c2goZGF0YUVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhc2V0SWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2RhdGFzZXRJZHhdID0gZGF0YUVudHJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChkYXRhRW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkUmVmZXJlbmNlVmFsdWVEYXRhKGRhdGFzZXQuaW50ZXJuYWxJZCwgc3R5bGVzLCBkYXRhLCBkYXRhc2V0LnVvbSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0RhdGEoZGF0YUVudHJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBhZGQgcmVmZXJlbmNldmFsdWVkYXRhIHRvIHRoZSBkYXRhc2V0IChlLmcuIG1lYW4pLlxuICAgICAqIEBwYXJhbSBpbnRlcm5hbElkIHtTdHJpbmd9IFN0cmluZyB3aXRoIHRoZSBpZCBvZiBhIGRhdGFzZXRcbiAgICAgKiBAcGFyYW0gc3R5bGVzIHtEYXRhc2V0T3B0aW9uc30gT2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gZm9yIGRhdGFzZXQgc3R5bGluZ1xuICAgICAqIEBwYXJhbSBkYXRhIHtEYXRhfSBBcnJheSBvZiBBcnJheXMgY29udGFpbmluZyB0aGUgbWVhc3VyZW1lbnQtZGF0YSBvZiB0aGUgZGF0YXNldFxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIHVvbSBvZiBhIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFJlZmVyZW5jZVZhbHVlRGF0YShpbnRlcm5hbElkOiBzdHJpbmcsIHN0eWxlczogRGF0YXNldE9wdGlvbnMsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4sIHVvbTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFlbnRyeS5pbnRlcm5hbElkLnN0YXJ0c1dpdGgoJ3JlZicgKyBpbnRlcm5hbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHN0eWxlcy5zaG93UmVmZXJlbmNlVmFsdWVzLmZvckVhY2goKHJlZlZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmRGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJuYWxJZDogJ3JlZicgKyBpbnRlcm5hbElkICsgcmVmVmFsdWUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZWZWYWx1ZS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5yZWZlcmVuY2VWYWx1ZXNbcmVmVmFsdWUuaWRdLm1hcChkID0+ICh7IHRpbWVzdGFtcDogZFswXSwgdmFsdWU6IGRbMV0gfSkpLFxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogcmVmVmFsdWUuY29sb3JcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiB1b21cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChyZWZEYXRhRW50cnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZGF0YSB0byBjYWxjdWxhdGUgeSBheGlzIHJhbmdlIG9mIGVhY2ggZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZGF0YUVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIGRhdGFzZXQgcmVsYXRlZCBkYXRhLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwcm9jZXNzRGF0YShkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIGxldCBjYWxjdWxhdGVkUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBsZXQgY2FsY3VsYXRlZFByZVJhbmdlOiBNaW5NYXhSYW5nZTtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRPcmlnaW5SYW5nZTogTWluTWF4UmFuZ2U7XG4gICAgICAgIGxldCBwcmVkZWZpbmVkUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBpZiAoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UgJiYgZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UubWluICE9PSBkYXRhRW50cnkuYXhpc09wdGlvbnMueUF4aXNSYW5nZS5tYXgpIHtcbiAgICAgICAgICAgIHByZWRlZmluZWRSYW5nZSA9IGRhdGFFbnRyeS5heGlzT3B0aW9ucy55QXhpc1JhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdXRvRGF0YUV4dGVudDogYm9vbGVhbiA9IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb247XG5cbiAgICAgICAgLy8gZ2V0IG1pbiBhbmQgbWF4IHZhbHVlIG9mIGRhdGFcbiAgICAgICAgY29uc3QgZGF0YUV4dGVudCA9IGQzLmV4dGVudDxEYXRhRW50cnksIG51bWJlcj4oZGF0YUVudHJ5LmRhdGEsIChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FsY3VsYXRlZE9yaWdpblJhbmdlID0geyBtaW46IGRhdGFFeHRlbnRbMF0sIG1heDogZGF0YUV4dGVudFsxXSB9O1xuXG4gICAgICAgIGxldCBzZXREYXRhRXh0ZW50ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIG91dCBvZiBwcmVkZWZpbmVkIHJhbmdlXG4gICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UgJiYgIXRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UubWluID4gcHJlZGVmaW5lZFJhbmdlLm1heCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWF4LCBtYXg6IHByZWRlZmluZWRSYW5nZS5taW4gfTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUHJlUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1heCwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWluIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWluLCBtYXg6IHByZWRlZmluZWRSYW5nZS5tYXggfTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUHJlUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1pbiwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWF4IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJlZGVmaW5lZFJhbmdlLm1pbiA+IGRhdGFFeHRlbnRbMV0gfHwgcHJlZGVmaW5lZFJhbmdlLm1heCA8IGRhdGFFeHRlbnRbMF0pIHtcbiAgICAgICAgICAgICAgICBzZXREYXRhRXh0ZW50ID0gYXV0b0RhdGFFeHRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXREYXRhRXh0ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXREYXRhRXh0ZW50KSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UgPSB7IG1pbjogZGF0YUV4dGVudFswXSwgbWF4OiBkYXRhRXh0ZW50WzFdIH07XG4gICAgICAgICAgICB0aGlzLmV4dGVuZFJhbmdlKGNhbGN1bGF0ZWRSYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHlsZSBvcHRpb24gJ3plcm8gYmFzZWQgeS1heGlzJyBpcyBjaGVja2VkLFxuICAgICAgICAvLyB0aGUgYXhpcyB3aWxsIGJlIGFsaWduZWQgdG8gdG9wIDAgKHdpdGggZGF0YSBiZWxvdyAwKSBvciB0byBib3R0b20gMCAod2l0aCBkYXRhIGFib3ZlIDApXG4gICAgICAgIC8vIGxldCB6ZXJvQmFzZWRWYWx1ZSA9IC0xO1xuICAgICAgICBpZiAoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnplcm9CYXNlZCAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgaWYgKGRhdGFFeHRlbnRbMV0gPD0gMCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZS5tYXggPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdGVkUHJlUmFuZ2UpIHsgY2FsY3VsYXRlZFByZVJhbmdlLm1heCA9IDA7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhRXh0ZW50WzBdID49IDApIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UubWluID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRlZFByZVJhbmdlKSB7IGNhbGN1bGF0ZWRQcmVSYW5nZS5taW4gPSAwOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdEYXRhc2V0SWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlKSA9PiBlLmludGVybmFsSWQgPT09IGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcblxuICAgICAgICAvLyBzZXQgcmFuZ2UsIHVvbSBhbmQgaWQgZm9yIGVhY2ggZGF0YXNldFxuICAgICAgICBpZiAoZGF0YUVudHJ5LnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0gPSB7XG4gICAgICAgICAgICAgICAgdW9tOiBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tLFxuICAgICAgICAgICAgICAgIGlkOiBkYXRhRW50cnkuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy56ZXJvQmFzZWQsXG4gICAgICAgICAgICAgICAgb3V0T2ZyYW5nZTogc2V0RGF0YUV4dGVudCxcbiAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IGF1dG9EYXRhRXh0ZW50LFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGNhbGN1bGF0ZWRSYW5nZS5taW4pICYmIGlzRmluaXRlKGNhbGN1bGF0ZWRSYW5nZS5tYXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XS5yYW5nZSA9IGNhbGN1bGF0ZWRSYW5nZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdLnByZVJhbmdlID0gY2FsY3VsYXRlZFByZVJhbmdlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0ub3JpZ2luUmFuZ2UgPSBjYWxjdWxhdGVkT3JpZ2luUmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCByYW5nZSBhbmQgYXJyYXkgb2YgSURzIGZvciBlYWNoIHVvbSB0byBnZW5lcmF0ZSB5LWF4aXMgbGF0ZXIgb25cbiAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbSA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzLmZvckVhY2goKHlSYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHlSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZEluZGV4KChlKSA9PiBlLnVvbSA9PT0geVJhbmdlLnVvbSk7XG4gICAgICAgICAgICAgICAgbGV0IHlyYW5nZU9iajogWVJhbmdlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdW9tOiB5UmFuZ2UudW9tLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogeVJhbmdlLnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBwcmVSYW5nZTogeVJhbmdlLnByZVJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5SYW5nZTogeVJhbmdlLm9yaWdpblJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpZHM6IFt5UmFuZ2UuaWRdLFxuICAgICAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IHlSYW5nZS56ZXJvQmFzZWQsXG4gICAgICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IHlSYW5nZS5vdXRPZnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IHlSYW5nZS5hdXRvUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHlSYW5nZS5wYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5hdXRvUmFuZ2UgfHwgeVJhbmdlLmF1dG9SYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLnByZVJhbmdlICYmIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5wcmVSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdwcmVSYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnByZVJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdyYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5hdXRvUmFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5UmFuZ2Uub3V0T2ZyYW5nZSAhPT0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLm91dE9mcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAnb3JpZ2luUmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5yYW5nZSA9IHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5vcmlnaW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAncmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFrZUxhdGVzdChpZHgsIHlSYW5nZSwgJ3JhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0uaWRzLnB1c2goeVJhbmdlLmlkKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20ucHVzaCh5cmFuZ2VPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmdyYXBoKSB7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2V0IHJhbmdlIHRvIGRlZmF1bHQgaW50ZXJ2YWwsIGlmIG1pbiBhbmQgbWF4IG9mIHJhbmdlIGFyZSBub3Qgc2V0LlxuICAgICAqIEBwYXJhbSByYW5nZSB7TWluTWF4UmFuZ2V9IHJhbmdlIHRvIGJlIHNldFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBleHRlbmRSYW5nZShyYW5nZTogTWluTWF4UmFuZ2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJhbmdlLm1pbiA9PT0gcmFuZ2UubWF4KSB7XG4gICAgICAgICAgICByYW5nZS5taW4gPSByYW5nZS5taW4gLSAxO1xuICAgICAgICAgICAgcmFuZ2UubWF4ID0gcmFuZ2UubWF4ICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNoZWNrIHJhbmdlcyBmb3IgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBJbmRleCBvZiBlbGVtZW50XG4gICAgICogQHBhcmFtIG9iaiB7WVJhbmdlc30gbmV3IG9iamVjdCB0byBiZSBjb21wYXJlZCB3aXRoIG9sZFxuICAgICAqIEBwYXJhbSBwb3Mge1N0cmluZ30gdHlwZSBvZiByYW5nZSAoZS5nLiBwcmVSYW5nZSwgcmFuZ2UsIG9yaWdpblJhbmdlKVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tDdXJyZW50TGF0ZXN0KGlkeDogbnVtYmVyLCBvYmo6IFlSYW5nZXMsIHBvczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5taW4gPiBvYmpbcG9zXS5taW4gJiYgIWlzTmFOKG9ialtwb3NdLm1pbikpIHtcbiAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdLm1pbiA9IG9ialtwb3NdLm1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10ubWF4IDwgb2JqW3Bvc10ubWF4ICYmICFpc05hTihvYmpbcG9zXS5tYXgpKSB7XG4gICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5tYXggPSBvYmpbcG9zXS5tYXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZXQgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBJbmRleCBvZiBlbGVtZW50XG4gICAgICogQHBhcmFtIG9iaiB7WVJhbmdlc30gbmV3IG9iamVjdFxuICAgICAqIEBwYXJhbSBwb3Mge1N0cmluZ30gdHlwZSBvZiByYW5nZSAoZS5nLiBwcmVSYW5nZSwgcmFuZ2UsIG9yaWdpblJhbmdlKVxuICAgICAqL1xuICAgIHByaXZhdGUgdGFrZUxhdGVzdChpZHg6IG51bWJlciwgb2JqOiBZUmFuZ2VzLCBwb3M6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXSA9IG9ialtwb3NdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tICsgKHRoaXMucGxvdE9wdGlvbnMuc2hvd1RpbWVMYWJlbCA/IDAgOiAyMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgZ3JhcGggZGlhZ3JhbS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkud2lkdGguYmFzZVZhbC52YWx1ZSAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMubWF4TGFiZWx3aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIHJhbmdlIGZvciBidWlsZGluZyB0aGUgeSBheGlzIGZvciBlYWNoIHVvbSBvZiBldmVyeSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHRoYXQgaXMgdGhlIHVvbSBvZiBhIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldHlBeGlzUmFuZ2UodW9tOiBzdHJpbmcpOiBNaW5NYXhSYW5nZSB7XG4gICAgICAgIGxldCByYW5nZU9iaiA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZChlbCA9PiBlbC51b20gPT09IHVvbSk7XG4gICAgICAgIGlmIChyYW5nZU9iaikge1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHplcm8gYmFzZWQgeSBheGlzXG4gICAgICAgICAgICAvLyBpZiAocmFuZ2VPYmouemVyb0Jhc2VkKSB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHJhbmdlT2JqLnplcm9CYXNlZFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJhbmdlLm1pbiA9IDA7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmFuZ2UubWF4ID0gMDtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VPYmoucmFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIGVycm9yOiB1b20gZG9lcyBub3QgZXhpc3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBwbG90IHRoZSBncmFwaCBhbmQgaXRzIGRlcGVuZGVuY2llc1xuICAgICAqIChncmFwaCBsaW5lLCBncmFwaCBheGVzLCBldmVudCBoYW5kbGVycylcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcGxvdEdyYXBoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dCA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgIGlkczogbmV3IE1hcCgpXG4gICAgICAgIH07XG4gICAgICAgIGlmICghdGhpcy55UmFuZ2VzRWFjaFVvbSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy5saXN0T2ZVb21zLmZpbmRJbmRleCgodW9tKSA9PiB1b20gPT09IGVudHJ5LmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICBpZiAoaWR4IDwgMCkgeyB0aGlzLmxpc3RPZlVvbXMucHVzaChlbnRyeS5heGlzT3B0aW9ucy51b20pOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkYXB0IGF4aXMgaGlnaGxpZ2h0aW5nLCB3aGVuIGNoYW5naW5nIGdyb3VwaW5nIG9mIHkgYXhpc1xuICAgICAgICBpZiAodGhpcy5vbGRHcm91cFlheGlzICE9PSB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlWXNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYWxjdWxhdGVXaWR0aCgpO1xuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdyYXBoRm9jdXMuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5idWZmZXJTdW0gPSAwO1xuICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBudWxsO1xuXG4gICAgICAgIC8vIGdldCByYW5nZSBvZiB4IGFuZCB5IGF4aXNcbiAgICAgICAgdGhpcy54QXhpc1JhbmdlID0gdGhpcy50aW1lc3BhbjtcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICBsZXQgeUF4aXNBcnJheTogWVJhbmdlc1tdID0gW107XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgfHwgdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHlBeGlzQXJyYXkgPSB0aGlzLnlSYW5nZXNFYWNoVW9tO1xuICAgICAgICAgICAgLy8gcHVzaCBhbGwgbGlzdE9mU2VwYXJhdGlvbiBpbnRvIHlBeGlzQXJyYXlcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RPZlNlcGFyYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbi5mb3JFYWNoKChzZXBJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RWw6IFlSYW5nZXMgPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiBlbC5pZCA9PT0gc2VwSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3RWwgJiYgKHlBeGlzQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBuZXdFbC5pZCkgPCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxsIGRhdGFzZXQgZm9yIHNwZWNpZmljIHVvbSBhcmUgc2VwYXJhdGVkIGZyb20gZ3JvdXBpbmcsIHRoZSB5YXhpcyBvZiB0aGlzIHVvbSB3aWxsIGJlIHJlbW92ZWQgZnJvbSBheGlzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdVb20gPSB5QXhpc0FycmF5LmZpbmRJbmRleChlbCA9PiBlbC51b20gPT09IG5ld0VsLnVvbSAmJiAoZWwuaWRzICE9PSB1bmRlZmluZWQgfHwgZWwuaWRzLmxlbmd0aCA9PT0gMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgaWQgZnJvbSBpZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRlSWQgPSB5QXhpc0FycmF5W2V4aXN0aW5nVW9tXS5pZHMuZmluZEluZGV4KGlkID0+IGlkID09PSBzZXBJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZUlkID49IDApIHsgeUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLnNwbGljZShkZWxldGVJZCwgMSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgeUF4aXNBcnJheVtleGlzdGluZ1VvbV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNBcnJheS5zcGxpY2UoZXhpc3RpbmdVb20sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHlBeGlzQXJyYXkucHVzaChuZXdFbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlBeGlzQXJyYXkgPSB0aGlzLmRhdGFZcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgeUF4aXNBcnJheS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZmlyc3QgPSAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5vZmZzZXQgPSB0aGlzLmJ1ZmZlclN1bTtcblxuICAgICAgICAgICAgICAgIGxldCB5QXhpc1Jlc3VsdCA9IHRoaXMuZHJhd1lheGlzKGVudHJ5KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlQmFzZSA9IHlBeGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSB5QXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSB5QXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVudHJ5LnlTY2FsZSA9IHlBeGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnlTY2FsZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeCBhbmQgeSBheGlzXG4gICAgICAgIHRoaXMuZHJhd1hheGlzKHRoaXMuYnVmZmVyU3VtKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJyk7XG5cbiAgICAgICAgdGhpcy5kcmF3QWxsR3JhcGhMaW5lcygpO1xuICAgICAgICB0aGlzLmFkZFRpbWVzcGFuSnVtcEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCByZWN0XG4gICAgICAgIGlmICghdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgLy8gZXhlY3V0ZSB3aGVuIGl0IGlzIG5vdCBhbiBvdmVydmlldyBkaWFncmFtXG4gICAgICAgICAgICAvLyBtb3VzZSBldmVudHMgaG92ZXJpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUxpbmVIb3ZlcmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnZy5kM2xpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMudG9nZ2xlUGFuWm9vbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZDMuem9vbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3N0YXJ0JywgdGhpcy56b29tU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd6b29tJywgdGhpcy56b29tSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZW5kJywgdGhpcy56b29tRW5kSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKGQzLmRyYWcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzdGFydCcsIHRoaXMucGFuU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdkcmFnJywgdGhpcy5wYW5Nb3ZlSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZW5kJywgdGhpcy5wYW5FbmRIYW5kbGVyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29weXJpZ2h0TGFiZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgd2hlbiBpdCBpcyBvdmVydmlldyBkaWFncmFtXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IFtudW1iZXIsIG51bWJlcl0gPSB0aGlzLmdldFhEb21haW5CeVRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgbGV0IG92ZXJ2aWV3VGltZXNwYW5JbnRlcnZhbCA9IFtpbnRlcnZhbFswXSwgaW50ZXJ2YWxbMV1dO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYnJ1c2hcbiAgICAgICAgICAgIGxldCBicnVzaCA9IGQzLmJydXNoWCgpXG4gICAgICAgICAgICAgICAgLmV4dGVudChbWzAsIDBdLCBbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdXSlcbiAgICAgICAgICAgICAgICAub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb24gbW91c2VjbGljayBjaGFuZ2UgdGltZSBhZnRlciBicnVzaCB3YXMgbW92ZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2Vkb3duQnJ1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lQnlDb29yZDogW251bWJlciwgbnVtYmVyXSA9IHRoaXMuZ2V0VGltZXN0YW1wQnlDb29yZChkMy5ldmVudC5zZWxlY3Rpb25bMF0sIGQzLmV2ZW50LnNlbGVjdGlvblsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGltZUJ5Q29vcmRbMF0sIHRpbWVCeUNvb3JkWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBicnVzaCB0byBzdmdcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoKVxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoLm1vdmUsIG92ZXJ2aWV3VGltZXNwYW5JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYWRkIGV2ZW50IHRvIHNlbGVjdGlvbiB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHJlLXJlbmRlcmluZyBvZiBicnVzaFxuICAgICAgICAgICAgICogYWRkIHN0eWxlIG9mIGJydXNoIHNlbGVjdGlvbiBoZXJlXG4gICAgICAgICAgICAgKiBlLmcuICdmaWxsJyBmb3IgY29sb3IsXG4gICAgICAgICAgICAgKiAnc3Ryb2tlJyBmb3IgYm9yZGVybGluZS1jb2xvcixcbiAgICAgICAgICAgICAqICdzdHJva2UtZGFzaGFycmF5JyBmb3IgY3VzdG9taXppbmcgYm9yZGVybGluZS1zdHlsZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQuc2VsZWN0QWxsKCcuc2VsZWN0aW9uJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZG8gbm90IGFsbG93IGNsZWFyIHNlbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNlbGVjdEFsbCgnLm92ZXJsYXknKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IHRvIHJlc2l6aW5nIGhhbmRsZSB0byBhbGxvdyBjaGFuZ2UgdGltZSBvbiByZXNpemVcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC5zZWxlY3RBbGwoJy5oYW5kbGUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdyZWQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDAuMylcbiAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUG9pbnRIb3ZlcmluZyhlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGxpbmU6IGQzLkxpbmU8RGF0YUVudHJ5Pikge1xuICAgICAgICB0aGlzLmdyYXBoQm9keS5zZWxlY3RBbGwoJy5ob3ZlckRvdHMnKVxuICAgICAgICAgICAgLmRhdGEoZW50cnkuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnZhbHVlKSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaG92ZXJEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkOiBEYXRhRW50cnkpID0+ICdob3Zlci1kb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIGxpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgbGluZS55KCkpXG4gICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzICsgMylcbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKGQ6IERhdGFFbnRyeSkgPT4gdGhpcy5tb3VzZU92ZXJQb2ludEhvdmVyaW5nKGQsIGVudHJ5KSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZDogRGF0YUVudHJ5KSA9PiB0aGlzLm1vdXNlT3V0UG9pbnRIb3ZlcmluZyhkLCBlbnRyeSkpXG4gICAgICAgICAgICAub24oJ21vdXNlZG93bicsIChkOiBEYXRhRW50cnkpID0+IHRoaXMuY2xpY2tEYXRhUG9pbnQoZCwgZW50cnkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmVIb3ZlcmluZygpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZS5mb2N1cycsIHRoaXMubW91c2Vtb3ZlSGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQuZm9jdXMnLCB0aGlzLm1vdXNlb3V0SGFuZGxlcik7XG4gICAgICAgIC8vIGxpbmUgaW5zaWRlIGdyYXBoXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1saW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MScsICcwJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgLy8gbGFiZWwgaW5zaWRlIGdyYXBoXG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3doaXRlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWwgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXdlaWdodCcsICdsaWdodGVyJyk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtdGltZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrRGF0YVBvaW50KGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljayBwb2ludCcpO1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlcm5hbElkOiBJbnRlcm5hbERhdGFzZXRJZCA9IHRoaXMuZGF0YXNldElkUmVzb2x2ZXIucmVzb2x2ZUludGVybmFsSWQoZW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBhcGl1cmwgPSBleHRlcm5hbElkLnVybDtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuOiBUaW1lc3BhbiA9IHsgZnJvbTogZC50aW1lc3RhbXAsIHRvOiBkLnRpbWVzdGFtcCB9O1xuXG4gICAgICAgICAgICAvLyByZXF1ZXN0IGFsbCB0aW1lc2VyaWVzIHRoYXQgaGF2ZSBkYXRhIGZvciB0aGUgc2FtZSBvZmZlcmluZyBhbmQgZmVhdHVyZVxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VGltZXNlcmllcyhhcGl1cmwsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvZmZlcmluZzogZW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycy5vZmZlcmluZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycy5mZWF0dXJlLmlkXG4gICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAodHNBcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNlcmllcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHNBcnJheS5mb3JFYWNoKHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc2VyaWVzLnB1c2godHMuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgdHMgZGF0YSBieSB0aW1lc2VyaWVzIElEIGZvciBzcGVjaWZpYyBvZmZlcmluZyBhbmQgZmVhdHVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VGltZXNlcmllc0RhdGEoYXBpdXJsLCB0aW1lc2VyaWVzLCB0aW1lc3BhbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHNEYXRhKSA9PiB0aGlzLm9uQ2xpY2tEYXRhUG9pbnQuZW1pdCh0c0RhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRpbWVzcGFuSnVtcEJ1dHRvbnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBkYXRhVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBsZXQgZm9ybWVyVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgbGV0IGxhdGVyVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMucmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdElkeEluVGltZXNwYW4gPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+ICh0aGlzLnRpbWVzcGFuLmZyb20gPCBlWzBdICYmIHRoaXMudGltZXNwYW4udG8gPiBlWzBdKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0SWR4SW5UaW1lc3BhbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdElkeEluVGltZXNwYW4gPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+IChlWzBdID4gdGhpcy50aW1lc3Bhbi5mcm9tICYmIGVbMF0gPiB0aGlzLnRpbWVzcGFuLnRvKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0SWR4SW5UaW1lc3BhbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlclRpbWVzdGFtcCA9IGVudHJ5LmRhdGFbZW50cnkuZGF0YS5sZW5ndGggLSAxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gZW50cnkuZGF0YS5maW5kSW5kZXgoZSA9PiAoZVswXSA8IHRoaXMudGltZXNwYW4uZnJvbSAmJiBlWzBdIDwgdGhpcy50aW1lc3Bhbi50bykgJiYgaXNGaW5pdGUoZVsxXSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtZXJUaW1lc3RhbXAgPSBlbnRyeS5kYXRhW2VudHJ5LmRhdGEubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRhVmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uV2lkdGggPSA1MDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRSaWdodCA9IDE1O1xuICAgICAgICAgICAgaWYgKGZvcm1lclRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSB0aGlzLmJhY2tncm91bmQuYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Zvcm1lckJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGJ1dHRvbldpZHRoICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyU3VtICsgJywgMCknKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jZW50ZXJUaW1lKGZvcm1lclRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgMCArIHRoaXMuYnVmZmVyU3VtICsgbGVmdFJpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgdGhpcy5oZWlnaHQgLyAyICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgMCArIHRoaXMuYnVmZmVyU3VtICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiAtIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCAwICsgdGhpcy5idWZmZXJTdW0gKyBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCAwICsgdGhpcy5idWZmZXJTdW0gKyAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXRlclRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSB0aGlzLmJhY2tncm91bmQuYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xhdGVyQnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzUwcHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy53aWR0aCAtIDUwKSArICcsIDApJylcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2VudGVyVGltZShsYXRlclRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy53aWR0aCAtIGxlZnRSaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIHRoaXMuaGVpZ2h0IC8gMiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIHRoaXMud2lkdGggLSAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIHRoaXMud2lkdGggLSBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCB0aGlzLndpZHRoIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiArIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvcHlyaWdodExhYmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQpIHtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICAgICAgLy8gZGVmYXVsdCA9IHRvcCBsZWZ0XG4gICAgICAgICAgICBsZXQgeCA9IDA7IC8vIGxlZnRcbiAgICAgICAgICAgIGxldCB5ID0gMDsgLy8gKyB0aGlzLm1hcmdpbi50b3A7IC8vIHRvcFxuICAgICAgICAgICAgdGhpcy5jb3B5cmlnaHQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpO1xuICAgICAgICAgICAgbGV0IGNvcHlyaWdodExhYmVsID0gdGhpcy5jb3B5cmlnaHQuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLnRleHQodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQubGFiZWwpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvcHlyaWdodCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnZ3JleScpO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuY29weXJpZ2h0LnBvc2l0aW9uWCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHggPSBiYWNrZ3JvdW5kLncgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhjb3B5cmlnaHRMYWJlbC5ub2RlKCkpLnc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQucG9zaXRpb25ZID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHkgPSBiYWNrZ3JvdW5kLmggLSB0aGlzLm1hcmdpbi50b3AgKiAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHlUcmFuc2Zvcm0gPSB5ICsgdGhpcy5nZXREaW1lbnNpb25zKGNvcHlyaWdodExhYmVsLm5vZGUoKSkuaCAtIDM7XG4gICAgICAgICAgICBsZXQgeFRyYW5zZm9ybSA9IHRoaXMuYnVmZmVyU3VtICsgeDtcbiAgICAgICAgICAgIGNvcHlyaWdodExhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHhUcmFuc2Zvcm0gKyAnLCAnICsgeVRyYW5zZm9ybSArICcpJyk7XG4gICAgICAgICAgICB0aGlzLmNvcHlyaWdodC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29weXJpZ2h0JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS5oKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4VHJhbnNmb3JtICsgJywgJyArIHkgKyAnKScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgZm9yIGV2ZXJ5IHByZXByYXJlZCBkYXRhIGVudHJ5IHRoZSBncmFwaCBsaW5lLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkcmF3QWxsR3JhcGhMaW5lcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0cgPSB0aGlzLmdyYXBoRm9jdXMuYXBwZW5kKCdnJyk7XG4gICAgICAgIGlmICgodGhpcy5wbG90T3B0aW9ucy5ob3ZlclN0eWxlID09PSBIb3ZlcmluZ1N0eWxlLnBvaW50KSAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGZvciBwb2ludCBob3ZlcmluZ1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLmRyYXdHcmFwaExpbmUoZW50cnkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHggZGlhZ3JhbSBjb29yZGluYXRlIGZvciB0aGUgYnJ1c2ggcmFuZ2VcbiAgICAgKiBmb3IgdGhlIG92ZXJ2aWV3IGRpYWdyYW0gYnkgdGhlIHNlbGVjdGVkIHRpbWUgaW50ZXJ2YWwgb2YgdGhlIG1haW4gZGlhZ3JhbS5cbiAgICAgKiBDYWxjdWxhdGUgdG8gZ2V0IGJydXNoIGV4dGVudCB3aGVuIG1haW4gZGlhZ3JhbSB0aW1lIGludGVydmFsIGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRYRG9tYWluQnlUaW1lc3RhbXAoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxjdWxhdGUgcmFuZ2Ugb2YgYnJ1c2ggd2l0aCB0aW1lc3RhbXAgYW5kIG5vdCBkaWFncmFtIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIGZvcm11bGE6XG4gICAgICAgICAqIGJydXNoX21pbiA9XG4gICAgICAgICAqIChvdmVydmlld193aWR0aCAvIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSAqIChicnVzaF9taW4gLSBvdmVydmlld19taW4pXG4gICAgICAgICAqIGJydXNfbWF4ID1cbiAgICAgICAgICogKG92ZXJ2aWV3X3dpZHRoIC8gKG92ZXJ2aWV3X21heCAtIG92ZXJ2aWV3X21pbikpICogKGJydXNoX21heCAtIG92ZXJ2aWV3X21pbilcbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG1pbk92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICBsZXQgbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICBsZXQgbWluRGlhZ3JhbVRpbWVzdGFtcCA9IHRoaXMubWFpblRpbWVJbnRlcnZhbC5mcm9tO1xuICAgICAgICBsZXQgbWF4RGlhZ3JhbVRpbWVzdGFtcCA9IHRoaXMubWFpblRpbWVJbnRlcnZhbC50bztcbiAgICAgICAgbGV0IGRpYWdyYW1XaWR0aCA9IHRoaXMud2lkdGg7XG5cbiAgICAgICAgbGV0IGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCA9IG1heE92ZXJ2aWV3VGltZUludGVydmFsIC0gbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG4gICAgICAgIGxldCBkaXZPdmVydmlld1RpbWVXaWR0aCA9IGRpYWdyYW1XaWR0aCAvIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1pbkNhbGNCcnVzaDogbnVtYmVyID0gZGl2T3ZlcnZpZXdUaW1lV2lkdGggKiAobWluRGlhZ3JhbVRpbWVzdGFtcCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsKTtcbiAgICAgICAgbGV0IG1heENhbGNCcnVzaDogbnVtYmVyID0gZGl2T3ZlcnZpZXdUaW1lV2lkdGggKiAobWF4RGlhZ3JhbVRpbWVzdGFtcCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsKTtcblxuICAgICAgICByZXR1cm4gW21pbkNhbGNCcnVzaCwgbWF4Q2FsY0JydXNoXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHRpbWVzdGFtcCBmb3IgdGhlIG1haW4gZGlhZ3JhbSBjYWxjdWxhdGVkXG4gICAgICogYnkgdGhlIHNlbGVjdGVkIGNvb3JkaW5hdGUgb2YgdGhlIGJydXNoIHJhbmdlLlxuICAgICAqIEBwYXJhbSBtaW5DYWxjQnJ1c2gge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1pbmltdW0gY29vcmRpbmF0ZSBvZiB0aGUgc2VsZWN0ZWQgYnJ1c2ggcmFuZ2UuXG4gICAgICogQHBhcmFtIG1heENhbGNCcnVzaCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgbWF4aW11bSBjb29yZGluYXRlIG9mIHRoZSBzZWxlY3RlZCBicnVzaCByYW5nZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcEJ5Q29vcmQobWluQ2FsY0JydXNoOiBudW1iZXIsIG1heENhbGNCcnVzaDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxjdWxhdGUgcmFuZ2Ugb2YgYnJ1c2ggd2l0aCB0aW1lc3RhbXAgYW5kIG5vdCBkaWFncmFtIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIGZvcm11bGE6XG4gICAgICAgICAqIG1pbkRpYWdyYW1UaW1lc3RhbXAgPVxuICAgICAgICAgKiAoKG1pbkNhbGNCcnVzaCAvIG92ZXJ2aWV3X3dpZHRoKSAqIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSArIG92ZXJ2aWV3X21pblxuICAgICAgICAgKiBtYXhEaWFncmFtVGltZXN0YW1wID1cbiAgICAgICAgICogKChtYXhDYWxjQnJ1c2ggLyBvdmVydmlld193aWR0aCkgKiAob3ZlcnZpZXdfbWF4IC0gb3ZlcnZpZXdfbWluKSkgKyBvdmVydmlld19taW5cbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG1pbk92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICBsZXQgbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICBsZXQgZGlhZ3JhbVdpZHRoID0gdGhpcy53aWR0aDtcblxuICAgICAgICBsZXQgZGlmZk92ZXJ2aWV3VGltZUludGVydmFsID0gbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgLSBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1pbkRpYWdyYW1UaW1lc3RhbXA6IG51bWJlciA9ICgobWluQ2FsY0JydXNoIC8gZGlhZ3JhbVdpZHRoKSAqIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCkgKyBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1heERpYWdyYW1UaW1lc3RhbXA6IG51bWJlciA9ICgobWF4Q2FsY0JydXNoIC8gZGlhZ3JhbVdpZHRoKSAqIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCkgKyBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcblxuICAgICAgICByZXR1cm4gW21pbkRpYWdyYW1UaW1lc3RhbXAsIG1heERpYWdyYW1UaW1lc3RhbXBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZHJhd3MgdGhlIHggYXhpcyB0byB0aGUgc3ZnIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGJ1ZmZlclhyYW5nZSB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBsZWZ0IGVkZ2UgYW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd1hheGlzKGJ1ZmZlclhyYW5nZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHJhbmdlIGZvciB4IGF4aXMgc2NhbGVcbiAgICAgICAgdGhpcy54U2NhbGVCYXNlID0gZDMuc2NhbGVUaW1lKClcbiAgICAgICAgICAgIC5kb21haW4oW25ldyBEYXRlKHRoaXMueEF4aXNSYW5nZS5mcm9tKSwgbmV3IERhdGUodGhpcy54QXhpc1JhbmdlLnRvKV0pXG4gICAgICAgICAgICAucmFuZ2UoW2J1ZmZlclhyYW5nZSwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20odGhpcy54U2NhbGVCYXNlKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGQudmFsdWVPZigpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFNlY29uZCA9ICc6JVMnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRNaW51dGUgPSAnJUg6JU0nLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF5ID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0V2VlayA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0WWVhciA9ICclWSc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBkMy50aW1lU2Vjb25kKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZUhvdXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWludXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lRGF5KGRhdGUpIDwgZGF0ZSA/IGZvcm1hdEhvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVZZWFyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmb3JtYXRZZWFyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyaWQpIHtcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHggZ3JpZCBsaW5lc1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAgICAgLmNhbGwoeEF4aXNcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDApLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyB0ZXh0IGxhYmVsIGZvciB0aGUgeCBheGlzXG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dUaW1lTGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgYnVmZmVyWHJhbmdlKSAvIDIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCd0aW1lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHRoZSB5IGF4aXMgZm9yIGVhY2ggZGF0YXNldC5cbiAgICAgKiBFYWNoIHVvbSBoYXMgaXRzIG93biBheGlzLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBhIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WWF4aXMoZW50cnk6IFlSYW5nZXMpOiBZU2NhbGUge1xuICAgICAgICBsZXQgc2hvd0F4aXMgPSAodGhpcy5wbG90T3B0aW9ucy5vdmVydmlldyA/IGZhbHNlIDogKHRoaXMucGxvdE9wdGlvbnMueWF4aXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLnBsb3RPcHRpb25zLnlheGlzKSk7XG4gICAgICAgIC8vIGNoZWNrIGZvciB5IGF4aXMgZ3JvdXBpbmdcbiAgICAgICAgbGV0IHJhbmdlO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBncm91cGVkIGF4aXNcbiAgICAgICAgICAgIGxldCB1b21JZHggPSB0aGlzLmxpc3RPZlVvbXMuZmluZEluZGV4KCh1b20pID0+IHVvbSA9PT0gZW50cnkudW9tKTtcbiAgICAgICAgICAgIGlmICh1b21JZHggPj0gMCAmJiBlbnRyeS5pZHMgJiYgZW50cnkuaWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBncm91cGVkIHdpdGggbW9yZSB0aGFuIG9ueSBkYXRhc2V0cyAoaWYgdW9tIGhhcyBtb3JlIHRoYW4gb25lIGRhdGFzZXRzKVxuICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXR5QXhpc1JhbmdlKGVudHJ5LnVvbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRlZCBpZCAoaWYgbm90IGVudHJ5LnVvbSkgT1IgZ3JvdXBlZCwgYnV0IG9ubHkgb25lIGRhdGFzZXQgKGlmIGVudHJ5IGlzIGdyb3VwZWQgYnV0IGhhcyBvbmx5IG9uZSBpZCA9PiB1c2UgcmFuZ2Ugb2YgdGhpcyBkYXRhc2V0KVxuICAgICAgICAgICAgICAgIGxldCBlbnRyeUVsZW0gPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiAoZW50cnkuaWQgPyBlbC5pZCA9PT0gZW50cnkuaWQgOiBlbC5pZCA9PT0gZW50cnkuaWRzWzBdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5RWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGVudHJ5RWxlbS5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZ2UgPSBlbnRyeUVsZW0ucHJlUmFuZ2UgPyBlbnRyeUVsZW0ucHJlUmFuZ2UgOiBlbnRyeUVsZW0ucmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdW5ncm91cGVkIGF4aXNcbiAgICAgICAgICAgIGxldCBlbnRyeUVsZW0gPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiBlbC5pZCA9PT0gZW50cnkuaWQpO1xuICAgICAgICAgICAgaWYgKGVudHJ5RWxlbSkge1xuICAgICAgICAgICAgICAgIHJhbmdlID0gZW50cnlFbGVtLnByZVJhbmdlID8gZW50cnlFbGVtLnByZVJhbmdlIDogZW50cnlFbGVtLnJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlNaW4gPSAtMTtcbiAgICAgICAgbGV0IHlNYXggPSAxO1xuICAgICAgICBpZiAocmFuZ2UgIT09IHVuZGVmaW5lZCAmJiByYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgeU1pbiA9IHJhbmdlLm1pbjtcbiAgICAgICAgICAgIHlNYXggPSByYW5nZS5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByYW5nZSBmb3IgeSBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHJhbmdlT2Zmc2V0ID0gKHlNYXggLSB5TWluKSAqIDAuMTA7XG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lNaW4gLSByYW5nZU9mZnNldCwgeU1heCArIHJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgICAgICBsZXQgeUF4aXNHZW4gPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDUpO1xuICAgICAgICBsZXQgYnVmZmVyID0gMDtcblxuICAgICAgICAvLyBvbmx5IGlmIHlBeGlzIHNob3VsZCBub3QgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoIXNob3dBeGlzKSB7XG4gICAgICAgICAgICB5QXhpc0dlblxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzXG4gICAgICAgIGNvbnN0IGF4aXMgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh5QXhpc0dlbik7XG5cbiAgICAgICAgLy8gb25seSBpZiB5QXhpcyBzaG91bGQgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoc2hvd0F4aXMpIHtcbiAgICAgICAgICAgIC8vIGRyYXcgeSBheGlzIGxhYmVsXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkeScsICcxZW0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5YXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250JywgJzE4cHggdGltZXMnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgIC50ZXh0KChlbnRyeS5pZCA/IChlbnRyeS51b20gKyAnIEAgJyArIGVudHJ5LnBhcmFtZXRlcnMuZmVhdHVyZS5sYWJlbCkgOiBlbnRyeS51b20pKTtcbiAgICAgICAgICAgIC8vIC50ZXh0KChlbnRyeS5pZCA/IChlbnRyeS5wYXJhbWV0ZXJzLnN0YXRpb24gKyAnICgnICsgZW50cnkudW9tICsgJyAnICsgZW50cnkucGFyYW1ldGVycy5waGVub21lbm9uICsgJyknKSA6IGVudHJ5LnVvbSkpO1xuXG4gICAgICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnLnlheGlzVGV4dExhYmVsJylcbiAgICAgICAgICAgICAgICAuY2FsbCh0aGlzLndyYXBUZXh0LCAoYXhpcy5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCAtIDEwKSwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgY29uc3QgYXhpc1dpZHRoID0gYXhpcy5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgMTAgKyB0aGlzLmdldERpbWVuc2lvbnModGV4dC5ub2RlKCkpLmg7XG4gICAgICAgICAgICAvLyBpZiB5QXhpcyBzaG91bGQgbm90IGJlIHZpc2libGUsIGJ1ZmZlciB3aWxsIGJlIHNldCB0byAwXG4gICAgICAgICAgICBidWZmZXIgPSAoc2hvd0F4aXMgPyBlbnRyeS5vZmZzZXQgKyAoYXhpc1dpZHRoIDwgdGhpcy5tYXJnaW4ubGVmdCA/IHRoaXMubWFyZ2luLmxlZnQgOiBheGlzV2lkdGgpIDogMCk7XG4gICAgICAgICAgICBjb25zdCBheGlzV2lkdGhEaXYgPSAoYXhpc1dpZHRoIDwgdGhpcy5tYXJnaW4ubGVmdCA/IHRoaXMubWFyZ2luLmxlZnQgOiBheGlzV2lkdGgpO1xuXG4gICAgICAgICAgICBpZiAoIWVudHJ5LmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgYXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBidWZmZXIgKyAnLCAwKScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBheGlzV2lkdGhEaXYgLSB0aGlzLm1hcmdpbi5sZWZ0O1xuICAgICAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRleHRPZmYgPSAtICh0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgICAgICBpZiAoZW50cnkuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0ZXh0T2ZmID0gdGhpcy5tYXJnaW4ubGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQuYXR0cigneScsIDAgLSB0ZXh0T2ZmKTtcblxuICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFdpZHRoID0gdGV4dC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0SGVpZ2h0ID0gdGV4dC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0ZXh0Lm5vZGUoKS5nZXRCQm94KCkueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdGV4dC5ub2RlKCkuZ2V0QkJveCgpLnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBheGlzcmFkaXVzID0gNDtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRPZlBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdGV4dFBvc2l0aW9uLnkgKyB0ZXh0SGVpZ2h0IC8gMiArIGF4aXNyYWRpdXMgLyAyLCAvLyArIDIgYmVjYXVzZSByYWRpdXMgPT09IDRcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5hYnModGV4dFBvc2l0aW9uLnggKyB0ZXh0V2lkdGgpIC0gYXhpc3JhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBwb2ludE9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Lmlkcy5mb3JFYWNoKChlbnRyeUlEKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YWVudHJ5ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZChlbCA9PiBlbC5pbnRlcm5hbElkID09PSBlbnRyeUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXNEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2F4aXNkb3QtJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIGRhdGFlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4Jywgc3RhcnRPZlBvaW50cy54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBzdGFydE9mUG9pbnRzLnkgLSBwb2ludE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBheGlzcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludE9mZnNldCArPSBheGlzcmFkaXVzICogMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFlbnRyeSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoZWwgPT4gZWwuaW50ZXJuYWxJZCA9PT0gZW50cnkuaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YWVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpc0RvdHMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdheGlzZG90LScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIHN0YXJ0T2ZQb2ludHMueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBzdGFydE9mUG9pbnRzLnkgLSBwb2ludE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGF4aXNyYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgaWQgdG8gdW9tLCBpZiBncm91cCB5YXhpcyBpcyB0b2dnbGVkLCBlbHNlIHNldCBpZCB0byBkYXRhc2V0IGlkXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IChlbnRyeS5pZCA/IGVudHJ5LmlkIDogZW50cnkudW9tKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWQsIGVudHJ5LnVvbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNEaXYgPSB0aGlzLmdyYXBoLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3lheGlzJyArIGlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzRGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBheGlzV2lkdGhEaXYpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2dyZXknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgKHRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQgPyB0aGlzLm9wYWMuY2xpY2sgOiB0aGlzLm9wYWMuZGVmYXVsdCkpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmhvdmVyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuY2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNldXAnLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuY2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQgPSAhdGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZW50cnlBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5QXJyYXkucHVzaChlbnRyeS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUFycmF5ID0gZW50cnkuaWRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0TGluZShlbnRyeUFycmF5KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFlbnRyeS5maXJzdCkge1xuICAgICAgICAgICAgICAgIGF4aXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeS5vZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF4aXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWF4TGFiZWx3aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeSBncmlkIGxpbmVzXG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgICAgICAuY2FsbChkMy5heGlzTGVmdCh5U2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrcyg1KVxuICAgICAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyBidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgICAgeVNjYWxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciBvYmplY3QgeUF4aXNTZWxlY3QgZXhpc3RzIHdpdGggc2VsZWN0ZWQgdW9tLlxuICAgICAqIElmIGl0IGRvZXMgbm90IGV4aXN0LCBpdCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHBhcmFtIGlkZW50aWZpZXIge1N0cmluZ30gU3RyaW5nIHByb3ZpZGluZyB0aGUgc2VsZWN0ZWQgdW9tIG9yIHRoZSBzZWxlY3RlZCBkYXRhc2V0IElELlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllcjogc3RyaW5nLCB1b206IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgaWQ6IGlkZW50aWZpZXIsXG4gICAgICAgICAgICBpZHM6ICh0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgPyB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcyA6IFtdKSxcbiAgICAgICAgICAgIHVvbTogdW9tLFxuICAgICAgICAgICAgY2xpY2tlZDogKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCA/IHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA6IGZhbHNlKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBhZGFwdCB5IGF4aXMgaGlnaGxpZ2h0aW5nIHRvIHNlbGVjdGVkIFRTIG9yIHNlbGVjdGVkIHVvbVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlWXNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgbGV0IGdyb3VwTGlzdCA9IHt9O1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmU6IGdyb3VwXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMueUF4aXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gdGhpcy55QXhpc1NlbGVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuaWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogZGF0YUVsLmF4aXNPcHRpb25zLnVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3RbaWRdID0gbmV3U2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmNsaWNrZWQgJiYgZWwudW9tICE9PSBlbC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdTZWxlY3RvcjogWUF4aXNTZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlbC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbZWwuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFFbC5heGlzT3B0aW9ucy51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtlbC5pZF0gPSBuZXdTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlOiBubyBncm91cFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IHRoaXMueUF4aXNTZWxlY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbklEO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFFbCAmJiBkYXRhRWwuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBpcyBkYXRhc2V0IHdpdGggaW50ZXJuYWxJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbklEID0gZGF0YUVsLmludGVybmFsSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBpcyB1b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25JRCA9IGVsLnVvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBMaXN0W3NlbGVjdGlvbklEXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VW9tOiBZQXhpc1NlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNlbGVjdGlvbklELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiBlbC51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0gPSBjdXJyZW50VW9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uaWRzLnB1c2goZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwudW9tID09PSBzZWxlY3Rpb25JRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgZm9yIGdyb3VwZWQgdW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwZWREYXRhc2V0cyA9IHRoaXMuY291bnRHcm91cGVkRGF0YXNldHMoc2VsZWN0aW9uSUQsIGVsLnVvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uaWRzLmxlbmd0aCA9PT0gZ3JvdXBlZERhdGFzZXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBmb3IgdW5ncm91cGVkIGRhdGFzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3Rbc2VsZWN0aW9uSURdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdCA9IHt9OyAvLyB1bnNlbGVjdCBhbGwgLSB5IGF4aXNcbiAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3QgPSBncm91cExpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbGRHcm91cFlheGlzID0gdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYW1vdW50IG9mIGRhdGFzZXRzIHRoYXQgYXJlIGdyb3VwZWQgd2l0aCB0aGUgc2FtZSB1b21cbiAgICAgKiBAcGFyYW0gdW9tIHtTdHJpbmd9IHVvbVxuICAgICAqIEBwYXJhbSBpZCB7U3RyaW5nfSBpbnRlcm5hbElkIG9mIHRoZSBkYXRhc2V0IHRoYXQgY2FuIGJlIHNraXBwZWRcbiAgICAgKiByZXR1cm5zIHtOdW1iZXJ9IGFtb3VudCBvZiBkYXRhc2V0cyB3aXRoIHRoZSBnaXZlbiB1b21cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvdW50R3JvdXBlZERhdGFzZXRzKHVvbTogc3RyaW5nLCBpZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGFycmF5VW9tQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsICE9PSBudWxsICYmIGVsLnVvbSA9PT0gdW9tICYmIGVsLmlkICE9PSBpZCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoZHMgPT4gZHMuaW50ZXJuYWxJZCA9PT0gZWwuaWQgJiYgZHMuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyA9PT0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkgeyBhcnJheVVvbUNvdW50Kys7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnJheVVvbUNvdW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNldCBzZWxlY3RlZCBJZHMgdGhhdCBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXG4gICAgICogQHBhcmFtIGlkcyB7QXJyYXl9IEFycmF5IG9mIFN0cmluZ3MgY29udGFpbmluZyB0aGUgSWRzLlxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIHVvbSBmb3IgdGhlIHNlbGVjdGVkIElkc1xuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0TGluZShpZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGxldCBjaGFuZ2VGYWxzZTogSGlnaGxpZ2h0RGF0YXNldFtdID0gW107XG4gICAgICAgIGxldCBjaGFuZ2VUcnVlOiBIaWdobGlnaHREYXRhc2V0W10gPSBbXTtcbiAgICAgICAgaWRzLmZvckVhY2goKElEKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihJRCkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZUZhbHNlLnB1c2goeyBpZDogSUQsIGNoYW5nZTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2VUcnVlLnB1c2goeyBpZDogSUQsIGNoYW5nZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IGNoYW5nZUZhbHNlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZElkcyhjaGFuZ2VGYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSWRzKGNoYW5nZVRydWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY2hhbmdlcyBzdGF0ZSBvZiBzZWxlY3RlZCBJZHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VTZWxlY3RlZElkcyh0b0hpZ2hsaWdodERhdGFzZXQ6IEhpZ2hsaWdodERhdGFzZXRbXSwgY2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgICAgIHRvSGlnaGxpZ2h0RGF0YXNldC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkSWQob2JqLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5zcGxpY2UodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkgPT09IG9iai5pZCksIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b0hpZ2hsaWdodERhdGFzZXQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2Yob2JqLmlkKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZElkKG9iai5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25EYXRhc2V0U2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkRGF0YXNldElkcyk7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgZ3JhcGggbGluZSBmb3IgZWFjaCBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBhIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGRyYXdHcmFwaExpbmUoZW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IGdldFlheGlzUmFuZ2UgPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmQoKG9iaikgPT4gb2JqLmlkcy5pbmRleE9mKGVudHJ5LmludGVybmFsSWQpID4gLTEpO1xuICAgICAgICAvLyBjaGVjayBmb3IgeSBheGlzIGdyb3VwaW5nXG4gICAgICAgIGxldCBnZXRZYXhpc1JhbmdlID0gdGhpcy5nZXRZYXhpc1JhbmdlKGVudHJ5KTtcblxuICAgICAgICBpZiAoZW50cnkuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZ2V0WWF4aXNSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHlTY2FsZUJhc2UgPSBnZXRZYXhpc1JhbmdlLnlTY2FsZTtcblxuICAgICAgICAgICAgICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGJvZHkgdG8gY2xpcCBncmFwaFxuICAgICAgICAgICAgICAgIC8vIHVuaXF1ZSBJRCBnZW5lcmF0ZWQgdGhyb3VnaCB0aGUgY3VycmVudCB0aW1lIChjdXJyZW50IHRpbWUgd2hlbiBpbml0aWFsaXplZClcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnlTZWxlY3RvckNsaXAgPSAnY2xpcCcgKyB0aGlzLmN1cnJlbnRUaW1lSWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpjbGlwUGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIHF1ZXJ5U2VsZWN0b3JDbGlwKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBncmFoIGxpbmVcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoQm9keSA9IHRoaXMuZ3JhcGhcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgcXVlcnlTZWxlY3RvckNsaXAgKyAnKScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGdyYXBoIGxpbmVcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMuY3JlYXRlTGluZSh0aGlzLnhTY2FsZUJhc2UsIHlTY2FsZUJhc2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuZGF0dW0oZW50cnkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgZW50cnkubGluZXMubGluZVdpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHkuc2VsZWN0QWxsKCcuZ3JhcGhEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoZW50cnkuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnZhbHVlKSkpXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyYXBoRG90cycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkOiBEYXRhRW50cnkpID0+ICdkb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgbGluZS54KCkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGxpbmUueSgpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQb2ludEhvdmVyaW5nKGVudHJ5LCBsaW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3dzIGxhYmVsaW5nIHZpYSBtb3VzbW92ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlbW92ZUhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICB0aGlzLmxhYmVsVGltZXN0YW1wID0gW107XG4gICAgICAgIHRoaXMubGFiZWxYQ29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5kaXN0TGFiZWxYQ29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnksIGVudHJ5SWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmdldEl0ZW1Gb3JYKGNvb3Jkc1swXSArIHRoaXMuYnVmZmVyU3VtLCBlbnRyeS5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RpYWdyYW1JbmRpY2F0b3IoZW50cnksIGlkeCwgY29vcmRzWzBdLCBlbnRyeUlkeCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvdXRwdXRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0SWRzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXRwdXRJZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdCBzaG93IGxpbmUgaW4gZ3JhcGggd2hlbiBubyBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZXN0YW1wXG4gICAgICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsYXN0ID0gMCxcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgZmlyc3QgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGxhYmVsQXJyYXk6IFtkMy5CYXNlVHlwZSwgZDMuQmFzZVR5cGVdW10gPSBbXSxcbiAgICAgICAgICAgICAgICB0ZXh0UmVjdEFycmF5OiBkMy5CYXNlVHlwZVtdID0gZDMuc2VsZWN0QWxsKCcuZm9jdXMtdmlzaWJpbGl0eScpLm5vZGVzKCk7XG5cbiAgICAgICAgICAgIC8vIGdldCBhbmQgc29ydCBhbGwgdGV4dCBsYWJlbHMgYW5kIHJlY3RhbmdsZSBvZiB0aGUgdGV4dCBsYWJlbHMgYW5kIGNvbWJpbmUgcmVsYXRlZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0UmVjdEFycmF5Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxBcnJheS5wdXNoKFt0ZXh0UmVjdEFycmF5W2ldLCB0ZXh0UmVjdEFycmF5W2kgKyAxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc29yeSBieSB5IGNvb3JkaW5hdGVcbiAgICAgICAgICAgIGxhYmVsQXJyYXkuc29ydCgoYSwgYikgPT4gcGFyc2VGbG9hdChkMy5zZWxlY3QoYVswXSkuYXR0cigneScpKSAtIHBhcnNlRmxvYXQoZDMuc2VsZWN0KGJbMF0pLmF0dHIoJ3knKSkpO1xuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgaWYgb3ZlcmxhcHBpbmdcbiAgICAgICAgICAgIGxhYmVsQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBwYWlycyBvZiAyIG9iamVjdHMgKHJlY3RhbmdsZSAoZXF1YWwpIGFuZCBsYWJlbCAob2RkKSlcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoZWxbMF0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCwgaSwgZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdChlbFswXSkuYXR0cigndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5Y29vcmQ6IG51bWJlciA9IHBhcnNlRmxvYXQoZDMuc2VsZWN0KGVsWzBdKS5hdHRyKCd5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgKGxhc3QgKyAzMCkgLSB5Y29vcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMTApIHsgb2Zmc2V0ID0gMTA7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KGVsWzFdKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGksIGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMy5zZWxlY3QoZWxbMV0pLmF0dHIoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeWNvb3JkOiBudW1iZXIgPSBwYXJzZUZsb2F0KGQzLnNlbGVjdChlbFswXSkuYXR0cigneScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IE1hdGgubWF4KDAsIChsYXN0ICsgMzApIC0geWNvb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8IDEwKSB7IG9mZnNldCA9IDEwOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QgPSBvZmZzZXQgKyB5Y29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25IaWdobGlnaHRDaGFuZ2VkLmVtaXQodGhpcy5oaWdobGlnaHRPdXRwdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgaGlkZXMgdGhlIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3VzZW91dEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaGlkZURpYWdyYW1JbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBzdGFydGluZyB0aGUgZHJhZyBoYW5kbGluZyBmb3IgdGhlIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYW5TdGFydEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVTdGFydCA9IGQzLmV2ZW50Lng7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVSYW5nZSA9IFt0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNvbnRyb2xscyB0aGUgcGFubmluZyAoZHJhZ2dpbmcpIG9mIHRoZSBncmFwaC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhbk1vdmVIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nTW92ZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmRyYWdNb3ZlU3RhcnQgJiYgdGhpcy5kcmFnZ2luZ01vdmUpIHtcbiAgICAgICAgICAgIGxldCBkaWZmID0gLShkMy5ldmVudC54IC0gdGhpcy5kcmFnTW92ZVN0YXJ0KTsgLy8gZDMuZXZlbnQuc3ViamVjdC54KTtcbiAgICAgICAgICAgIGxldCBhbW91bnRUaW1lc3RhbXAgPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMV0gLSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMF07XG4gICAgICAgICAgICBsZXQgcmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgPSBhbW91bnRUaW1lc3RhbXAgLyB0aGlzLndpZHRoO1xuICAgICAgICAgICAgbGV0IG5ld1RpbWVNaW4gPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMF0gKyAocmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgKiBkaWZmKTtcbiAgICAgICAgICAgIGxldCBuZXdUaW1lTWF4ID0gdGhpcy5kcmFnTW92ZVJhbmdlWzFdICsgKHJhdGlvVGltZXN0YW1wRGlhZ0Nvb3JkICogZGlmZik7XG5cbiAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZVBhbiA9IFtuZXdUaW1lTWluLCBuZXdUaW1lTWF4XTtcbiAgICAgICAgICAgIHRoaXMudGltZXNwYW4gPSB7IGZyb206IHRoaXMueEF4aXNSYW5nZVBhblswXSwgdG86IHRoaXMueEF4aXNSYW5nZVBhblsxXSB9O1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5kcyB0aGUgZHJhZ2dpbmcgY29udHJvbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhbkVuZEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnhBeGlzUmFuZ2VQYW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2VQYW5bMF0sIHRoaXMueEF4aXNSYW5nZVBhblsxXSk7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTW92ZVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnhBeGlzUmFuZ2VQYW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBzdGFydHMgdGhlIHpvb20gaGFuZGxpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSB6b29tU3RhcnRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIC8vIGRlcGVuZGVudCBvbiBwb2ludCBvciBsaW5lIGhvdmVyaW5nXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbi5wdXNoKFt0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkcmF3cyBhIHJlY3RhbmdsZSB3aGVuIHpvb20gaXMgc3RhcnRlZCBhbmQgdGhlIG1vdXNlIGlzIG1vdmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21IYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3RHJhZ1JlY3RhbmdsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5kcyB0aGUgem9vbSBoYW5kbGluZyBhbmQgY2FsY3VsYXRlcyB0aGUgdmlhIHpvb20gc2VsZWN0ZWQgdGltZSBpbnRlcnZhbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21FbmRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0IHx8ICF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gYmFjayB0byBvcmlnaW4gcmFuZ2UgKGZyb20gLSB0bylcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdWzBdLCB0aGlzLnhBeGlzUmFuZ2VPcmlnaW5bMF1bMV0pO1xuICAgICAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbiA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeERvbWFpblJhbmdlO1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0WzBdIDw9IHRoaXMuZHJhZ0N1cnJlbnRbMF0pIHtcbiAgICAgICAgICAgICAgICB4RG9tYWluUmFuZ2UgPSB0aGlzLmdldHhEb21haW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4RG9tYWluUmFuZ2UgPSB0aGlzLmdldHhEb21haW4odGhpcy5kcmFnQ3VycmVudFswXSwgdGhpcy5kcmFnU3RhcnRbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54QXhpc1JhbmdlID0geyBmcm9tOiB4RG9tYWluUmFuZ2VbMF0sIHRvOiB4RG9tYWluUmFuZ2VbMV0gfTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvKTtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzZXREcmFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lKHhTY2FsZUJhc2U6IGQzLlNjYWxlVGltZTxudW1iZXIsIG51bWJlcj4sIHlTY2FsZUJhc2U6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPikge1xuICAgICAgICByZXR1cm4gZDMubGluZTxEYXRhRW50cnk+KClcbiAgICAgICAgICAgIC5kZWZpbmVkKChkKSA9PiAhaXNOYU4oZC52YWx1ZSkpXG4gICAgICAgICAgICAueCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhEaWFnQ29vcmQgPSB4U2NhbGVCYXNlKGQudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHhEaWFnQ29vcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQueERpYWdDb29yZCA9IHhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueSgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHlEaWFnQ29vcmQgPSB5U2NhbGVCYXNlKGQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeURpYWdDb29yZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZC55RGlhZ0Nvb3JkID0geURpYWdDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUxpbmVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZU92ZXJQb2ludEhvdmVyaW5nKGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gdGhpcy5kYXRhc2V0TWFwLmdldChlbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIGxldCByZWN0QmFjayA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGNvb3Jkc1swXSA+PSAwICYmIGNvb3Jkc1swXSA8PSByZWN0QmFjay53aWR0aCAmJiBjb29yZHNbMV0gPj0gMCAmJiBjb29yZHNbMV0gPD0gcmVjdEJhY2suaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGhvdmVyZWQgZG90XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKS5hdHRyKCdvcGFjaXR5JywgMC44KS5hdHRyKCdyJywgJzhweCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgbGV0IGRvdExhYmVsID0gdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGAke2QudmFsdWV9ICR7ZW50cnkuYXhpc09wdGlvbnMudW9tfSAke21vbWVudChkLnRpbWVzdGFtcCkuZm9ybWF0KCdERC5NTS5ZWSBISDptbScpfWApXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZUhvdmVyRG90TGFiZWwnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKTtcbiAgICAgICAgICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bSkgLyAyID4gY29vcmRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTGVmdFNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVjdFg6IG51bWJlciA9IGQueERpYWdDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZC55RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGxldCByZWN0VzogbnVtYmVyID0gdGhpcy5nZXREaW1lbnNpb25zKGRvdExhYmVsLm5vZGUoKSkudyArIDg7XG4gICAgICAgICAgICAgICAgbGV0IHJlY3RIOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS5oOyAvLyArIDQ7XG4gICAgICAgICAgICAgICAgaWYgKCFvbkxlZnRTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RYID0gZC54RGlhZ0Nvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkLnlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoY29vcmRzWzFdICsgcmVjdEggKyA0KSA+IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGxhYmVsIGJlbG93IHggYXhpc1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRlIGxhYmVsIHRvIGEgaGlnaGVyIHBsYWNlLiAtIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWDogbnVtYmVyID0gZC54RGlhZ0Nvb3JkICsgNCArIDE1O1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IGQueURpYWdDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICBpZiAoIW9uTGVmdFNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxYID0gZC54RGlhZ0Nvb3JkIC0gcmVjdFcgKyA0IC0gMTU7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsWSA9IGQueURpYWdDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBsYWJlbFggKyAnLCAnICsgbGFiZWxZICsgJyknKTtcbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBvdXRwdXQgb2YgaGlnaGxpZ2h0ZWQgZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGQudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICBpZHM6IG5ldyBNYXAoKS5zZXQoZW50cnkuaW50ZXJuYWxJZCwgeyB0aW1lc3RhbXA6IGQudGltZXN0YW1wLCB2YWx1ZTogZC52YWx1ZSB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodENoYW5nZWQuZW1pdCh0aGlzLmhpZ2hsaWdodE91dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlT3V0UG9pbnRIb3ZlcmluZyhkOiBEYXRhRW50cnksIGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSkge1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzKTtcbiAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WWF4aXNSYW5nZShlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpOiBZUmFuZ2VzIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgZW50cnkgZGF0YXNldCBzaG91bGQgYmUgc2VwYXJhdGVkIG9yIGVudHJ5IGRhdGFzZXRzIHNob3VsZCBiZSBncm91cGVkXG4gICAgICAgIGlmICghZW50cnkuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyAmJiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueVJhbmdlc0VhY2hVb20uZmluZCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiBvYmoudW9tID09PSBlbnRyeS5heGlzT3B0aW9ucy51b20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSAvLyB1b20gZG9lcyBleGlzdCBpbiB0aGlzLnlSYW5nZXNFYWNoVW9tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYmogIT09IG51bGwgJiYgb2JqLmlkID09PSBlbnRyeS5pbnRlcm5hbElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gLy8gaWQgZG9lcyBleGlzdCBpbiB0aGlzLmRhdGFZcmFuZ2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdGltZXN0YW1wIG9mIHByb3ZpZGVkIHggZGlhZ3JhbSBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0gc3RhcnQge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1pbmltdW0gZGlhZ3JhbSBjb29yZGluYXRlLlxuICAgICAqIEBwYXJhbSBlbmQge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1heGltdW0gZGlhZ3JhbSBjb29yZGluYXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0eERvbWFpbihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgZG9tTWluQXJyID0gW107XG4gICAgICAgIGxldCBkb21NYXhBcnIgPSBbXTtcbiAgICAgICAgbGV0IGRvbU1pbjogbnVtYmVyO1xuICAgICAgICBsZXQgZG9tTWF4OiBudW1iZXI7XG4gICAgICAgIGxldCB0bXA7XG4gICAgICAgIGxldCBsb3dlc3RNaW4gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIGxldCBsb3dlc3RNYXggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgc3RhcnQgKz0gdGhpcy5idWZmZXJTdW07XG4gICAgICAgIGVuZCArPSB0aGlzLmJ1ZmZlclN1bTtcblxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgZG9tTWluQXJyLnB1c2goZW50cnkuZGF0YS5maW5kKChlbGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS54RGlhZ0Nvb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLnhEaWFnQ29vcmQgPj0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGRvbU1heEFyci5wdXNoKGVudHJ5LmRhdGEuZmluZCgoZWxlbSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ueERpYWdDb29yZCA+PSBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5W2luZGV4XSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZG9tTWluQXJyLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRvbU1pbkFycltpXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gZG9tTWluQXJyW2ldLnhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgaWYgKHRtcCA8IGxvd2VzdE1pbikge1xuICAgICAgICAgICAgICAgICAgICBsb3dlc3RNaW4gPSB0bXA7XG4gICAgICAgICAgICAgICAgICAgIGRvbU1pbiA9IGRvbU1pbkFycltpXS50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGRvbU1heEFyci5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkb21NYXhBcnJbal0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGRvbU1heEFycltqXS54RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPCBsb3dlc3RNYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXN0TWF4ID0gdG1wO1xuICAgICAgICAgICAgICAgICAgICBkb21NYXggPSBkb21NYXhBcnJbal0udGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2RvbU1pbiwgZG9tTWF4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNvbmZpZ3VyYXRlcyBhbmQgZHJhd3MgdGhlIHJlY3RhbmdsZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdEcmFnUmVjdGFuZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0KSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmRyYWdDdXJyZW50ID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG5cbiAgICAgICAgY29uc3QgeDEgPSBNYXRoLm1pbih0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5tYXgodGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kcmFnUmVjdCAmJiAhdGhpcy5kcmFnUmVjdEcpIHtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsLW9wYWNpdHknLCAuMilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmx1ZScpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gdGhpcy5kcmFnUmVjdEcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHgxICsgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWRyYWcnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdC5hdHRyKCd3aWR0aCcsIHgyIC0geDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZGlzYWJsZXMgdGhlIGRyYXdpbmcgcmVjdGFuZ2xlIGNvbnRyb2wuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldERyYWcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdSZWN0Rykge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0RyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgYSBzcGVjaWZpYyBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0geCB7TnVtYmVyfSBDb29yZGluYXRlcyBvZiB0aGUgbW91c2UgaW5zaWRlIHRoZSBkaWFncmFtLlxuICAgICAqIEBwYXJhbSBkYXRhIHtEYXRhRW50cnl9IEFycmF5IHdpdGggdGhlIGRhdGEgb2YgZWFjaCBkYXRhc2V0IGVudHJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0SXRlbUZvclgoeDogbnVtYmVyLCBkYXRhOiBEYXRhRW50cnlbXSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy54U2NhbGVCYXNlLmludmVydCh4KTtcbiAgICAgICAgY29uc3QgYmlzZWN0RGF0ZSA9IGQzLmJpc2VjdG9yKChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xuICAgICAgICB9KS5sZWZ0O1xuICAgICAgICByZXR1cm4gYmlzZWN0RGF0ZShkYXRhLCBpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkaXNhYmxlcyB0aGUgbGFiZWxpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlRGlhZ3JhbUluZGljYXRvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmZvY3VzLXZpc2liaWxpdHknKVxuICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBlbmFibGVzIHRoZSBsYWJsZWluZyBvZiBlYWNoIGRhdGFzZXQgZW50cnkuXG4gICAgICogQHBhcmFtIGVudHJ5IHtJbnRlcm5hbERhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgcG9zaXRpb24gb2YgdGhlIGRhdGFzZXQgZW50cnkgaW4gdGhlIGRhdGEgYXJyYXkuXG4gICAgICogQHBhcmFtIHhDb29yZE1vdXNlIHtOdW1iZXJ9IE51bWJlciBvZiB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZS5cbiAgICAgKiBAcGFyYW0gZW50cnlJZHgge051bWJlcn0gTnVtYmVyIG9mIHRoZSBpbmRleCBvZiB0aGUgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93RGlhZ3JhbUluZGljYXRvciA9IChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGlkeDogbnVtYmVyLCB4Q29vcmRNb3VzZTogbnVtYmVyLCBlbnRyeUlkeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW06IERhdGFFbnRyeSA9IGVudHJ5LmRhdGFbaWR4XTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3RMYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBudWxsO1xuXG4gICAgICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQgJiYgaXRlbS55RGlhZ0Nvb3JkICYmIGl0ZW1bMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2hlcmUgbW91c2UgaXNcbiAgICAgICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICAgIC8vIHNob3cgbGFiZWwgaWYgZGF0YSBhdmFpbGFibGUgZm9yIHRpbWVcbiAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgdHJ1ZSwgZW50cnlJZHgpO1xuXG4gICAgICAgICAgICBsZXQgeE1vdXNlQW5kQnVmZmVyID0geENvb3JkTW91c2UgKyB0aGlzLmJ1ZmZlclN1bTtcbiAgICAgICAgICAgIGxldCBsYWJlbEJ1ZmZlciA9ICgodGhpcy50aW1lc3Bhbi5mcm9tIC8gKHRoaXMudGltZXNwYW4udG8gLSB0aGlzLnRpbWVzcGFuLmZyb20pKSAqIDAuMDAwMSlcbiAgICAgICAgICAgICAgICAqICgodGhpcy50aW1lc3Bhbi5mcm9tIC8gKHRoaXMudGltZXNwYW4udG8gLSB0aGlzLnRpbWVzcGFuLmZyb20pKSAqIDAuMDAwMSk7XG5cbiAgICAgICAgICAgIGxhYmVsQnVmZmVyID0gTWF0aC5tYXgoMTAsIGxhYmVsQnVmZmVyKTtcblxuICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoZW50cnksIGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW0sIGVudHJ5SWR4LCB4TW91c2VBbmRCdWZmZXIpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS54RGlhZ0Nvb3JkID49IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW0gfHwgeE1vdXNlQW5kQnVmZmVyIDwgaXRlbS54RGlhZ0Nvb3JkIC0gbGFiZWxCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIGZhbHNlLCBlbnRyeUlkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh4TW91c2VBbmRCdWZmZXIgPCBpdGVtLnhEaWFnQ29vcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGF0YVtpZHggLSAxXSAmJiAoTWF0aC5hYnMoZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkIC0geE1vdXNlQW5kQnVmZmVyKSA8IE1hdGguYWJzKGl0ZW0ueERpYWdDb29yZCAtIHhNb3VzZUFuZEJ1ZmZlcikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBjbG9zZXN0IGVsZW1lbnQgdG8gbW91c2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoZW50cnksIGVudHJ5LmRhdGFbaWR4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lSW5kaWNhdG9yTGFiZWwoZW50cnkuZGF0YVtpZHggLSAxXSwgZW50cnlJZHgsIHhNb3VzZUFuZEJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgdHJ1ZSwgZW50cnlJZHgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBncmFwaCB3aWR0aCBhbmQgcmFuZ2UgYmV0d2VlbiBkYXRhIHBvaW50IGFuZCBtb3VzZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkID49IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVudHJ5LmRhdGFbaWR4IC0gMV0ueERpYWdDb29yZCA8PSB0aGlzLmJ1ZmZlclN1bVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkICsgbGFiZWxCdWZmZXIgPCB4TW91c2VBbmRCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IHNldCBob3ZlcmluZyBmb3IgbGFiZWxidWZmZXIgYWZ0ZXIgbGFzdCBhbmQgYmVmb3JlIGZpcnN0IHZhbHVlIG9mIHRoZSBncmFwaFxuICAgICAgICAgICAgLy8gaGlkZSBsYWJlbCBpZiBubyBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZVxuICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCBmYWxzZSwgZW50cnlJZHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hhbmdlIHZpc2liaWxpdHkgb2YgbGFiZWwgYW5kIHdoaXRlIHJlY3RhbmdsZSBpbnNpZGUgZ3JhcGggKG5leHQgdG8gbW91c2UtY3Vyc29yIGxpbmUpLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gdmlzaWJsZSB7Qm9vbGVhbn0gQm9vbGVhbiBnaXZpbmcgaW5mb3JtYXRpb24gYWJvdXQgdmlzaWJpbGl0eSBvZiBhIGxhYmVsLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hWaXNMYWJlbChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIHZpc2libGU6IGJvb2xlYW4sIGVudHJ5SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9jdXMtdmlzaWJpbGl0eScpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9jdXMtdmlzaWJpbGl0eScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFxuICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuICAgICAgICAgICAgdGhpcy5sYWJlbFRpbWVzdGFtcFtlbnRyeUlkeF0gPSBudWxsO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkc1tlbnRyeS5pbnRlcm5hbElkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNob3cgdGhlIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gaXRlbSB7RGF0YUVudHJ5fSBPYmplY3Qgb2YgdGhlIGVudHJ5IGluIHRoZSBkYXRhc2V0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd0xhYmVsVmFsdWVzKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSwgaXRlbTogRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIGxldCBpZCA9IDE7XG4gICAgICAgIGxldCBvbkxlZnRTaWRlOiBib29sZWFuID0gdGhpcy5jaGVja0xlZnRTaWRlKGl0ZW0ueERpYWdDb29yZCk7XG4gICAgICAgIGlmIChlbnRyeS5mb2N1c0xhYmVsKSB7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsLnRleHQoaXRlbVtpZF0gKyAoZW50cnkuYXhpc09wdGlvbnMudW9tID8gZW50cnkuYXhpc09wdGlvbnMudW9tIDogJycpKTtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5WDogbnVtYmVyID0gb25MZWZ0U2lkZSA/XG4gICAgICAgICAgICAgICAgaXRlbS54RGlhZ0Nvb3JkICsgNCA6IGl0ZW0ueERpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudyArIDQ7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeVgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBpdGVtLnlEaWFnQ29vcmQpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIGl0ZW0ueURpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkuaCArIDMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmgpO1xuXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF0gPSB7XG4gICAgICAgICAgICAgICAgJ3RpbWVzdGFtcCc6IGl0ZW1bMF0sXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogaXRlbVsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzaG93IHRoZSB0aW1lIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGl0ZW0ge0RhdGFFbnRyeX0gT2JqZWN0IG9mIHRoZSBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZW50cnlJZHgge051bWJlcn0gTnVtYmVyIG9mIHRoZSBpbmRleCBvZiB0aGUgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgZW50cnlJZHg6IG51bWJlciwgbW91c2VDb29yZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHRpbWVzdGFtcCBpcyB0aGUgdGltZSB3aGVyZSB0aGUgbW91c2UtY3Vyc29yIGlzXG4gICAgICAgIHRoaXMubGFiZWxUaW1lc3RhbXBbZW50cnlJZHhdID0gaXRlbVswXTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBpdGVtLnhEaWFnQ29vcmQ7XG4gICAgICAgIHRoaXMuZGlzdExhYmVsWENvb3JkW2VudHJ5SWR4XSA9IE1hdGguYWJzKG1vdXNlQ29vcmQgLSBpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBsZXQgbWluID0gZDMubWluKHRoaXMuZGlzdExhYmVsWENvb3JkKTtcbiAgICAgICAgbGV0IGlkeE9mTWluID0gdGhpcy5kaXN0TGFiZWxYQ29vcmQuZmluZEluZGV4KChlbGVtKSA9PiBlbGVtID09PSBtaW4pO1xuICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IHRoaXMuY2hlY2tMZWZ0U2lkZShpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmxhYmVsWENvb3JkW2lkeE9mTWluXSArIDI7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0gLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsVGltZS5ub2RlKCkpLncgLSAyO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lLnRleHQobW9tZW50KHRoaXMubGFiZWxUaW1lc3RhbXBbaWR4T2ZNaW5dKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJykpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyByaWdodCA6IGxlZnQpXG4gICAgICAgICAgICAuYXR0cigneScsIDEzKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1c1xuICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0pXG4gICAgICAgICAgICAuYXR0cigneTEnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0pXG4gICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0LnRpbWVzdGFtcCA9IHRoaXMubGFiZWxUaW1lc3RhbXBbaWR4T2ZNaW5dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGdpdmluZyBpbmZvcm1hdGlvbiBpZiB0aGUgbW91c2UgaXMgb24gbGVmdCBzaWRlIG9mIHRoZSBkaWFncmFtLlxuICAgICAqIEBwYXJhbSBpdGVtQ29vcmQge251bWJlcn0geCBjb29yZGluYXRlIG9mIHRoZSB2YWx1ZSAoZS5nLiBtb3VzZSkgdG8gYmUgY2hlY2tlZFxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tMZWZ0U2lkZShpdGVtQ29vcmQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBpdGVtQ29vcmQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHdyYXAgdGhlIHRleHQgZm9yIHRoZSB5IGF4aXMgbGFiZWwuXG4gICAgICogQHBhcmFtIHRleHQge2FueX0geSBheGlzIGxhYmVsXG4gICAgICogQHBhcmFtIHdpZHRoIHtOdW1iZXJ9IHdpZHRoIG9mIHRoZSBheGlzIHdoaWNoIG11c3Qgbm90IGJlIGNyb3NzZWRcbiAgICAgKiBAcGFyYW0geHBvc2l0aW9uIHtOdW1iZXJ9IHBvc2l0aW9uIHRvIGNlbnRlciB0aGUgbGFiZWwgaW4gdGhlIG1pZGRsZVxuICAgICAqL1xuICAgIHByaXZhdGUgd3JhcFRleHQodGV4dE9iajogYW55LCB3aWR0aDogbnVtYmVyLCB4cG9zaXRpb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0ZXh0T2JqLmVhY2goZnVuY3Rpb24gKHU6IGFueSwgaTogbnVtYmVyLCBkOiBOb2RlTGlzdCkge1xuICAgICAgICAgICAgbGV0IHRleHQgPSBkMy5zZWxlY3QodGhpcyksXG4gICAgICAgICAgICAgICAgd29yZHMgPSB0ZXh0LnRleHQoKS5zcGxpdCgvXFxzKy8pLnJldmVyc2UoKSxcbiAgICAgICAgICAgICAgICB3b3JkLFxuICAgICAgICAgICAgICAgIGxpbmUgPSBbXSxcbiAgICAgICAgICAgICAgICAvLyBsaW5lTnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0ID0gKGkgPT09IGQubGVuZ3RoIC0gMSA/IDAuMyA6IDEuMSksIC8vIGVtc1xuICAgICAgICAgICAgICAgIHkgPSB0ZXh0LmF0dHIoJ3knKSxcbiAgICAgICAgICAgICAgICBkeSA9IHBhcnNlRmxvYXQodGV4dC5hdHRyKCdkeScpKSxcbiAgICAgICAgICAgICAgICB0c3BhbiA9IHRleHQudGV4dChudWxsKS5hcHBlbmQoJ3RzcGFuJykuYXR0cigneCcsIDAgLSB4cG9zaXRpb24pLmF0dHIoJ3knLCB5KS5hdHRyKCdkeScsIGR5ICsgJ2VtJyk7XG4gICAgICAgICAgICB3aGlsZSAod29yZCA9IHdvcmRzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgbGluZS5wdXNoKHdvcmQpO1xuICAgICAgICAgICAgICAgIHRzcGFuLnRleHQobGluZS5qb2luKCcgJykpO1xuICAgICAgICAgICAgICAgIGxldCBub2RlOiBTVkdUU3BhbkVsZW1lbnQgPSA8U1ZHVFNwYW5FbGVtZW50PnRzcGFuLm5vZGUoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzR3JlYXRlcldpZHRoOiBib29sZWFuID0gbm9kZS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSA+IHdpZHRoO1xuICAgICAgICAgICAgICAgIGlmIChoYXNHcmVhdGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdHNwYW4udGV4dChsaW5lLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBbd29yZF07XG4gICAgICAgICAgICAgICAgICAgIHRzcGFuID0gdGV4dC5hcHBlbmQoJ3RzcGFuJykuYXR0cigneCcsIDAgLSB4cG9zaXRpb24pLmF0dHIoJ3knLCB5KS5hdHRyKCdkeScsIGxpbmVIZWlnaHQgKyBkeSArICdlbScpLnRleHQod29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGJvdW5kaW5ncyBvZiBhIGh0bWwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWwge09iamVjdH0gT2JqZWN0IG9mIHRoZSBodG1sIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREaW1lbnNpb25zKGVsOiBhbnkpOiB7IHc6IG51bWJlciwgaDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgdyA9IDA7XG4gICAgICAgIGxldCBoID0gMDtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZWwuZ2V0QkJveCgpO1xuICAgICAgICAgICAgdyA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICBoID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6IGdldERpbWVuc2lvbnMoKSAnICsgZWwgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdyxcbiAgICAgICAgICAgIGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBnZW5lcmF0ZSB1dWlkIGZvciBhIGRpYWdyYW1cbiAgICAgKi9cbiAgICBwcml2YXRlIHV1aWR2NCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zNCgpICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgdGhpcy5zNCgpICsgdGhpcy5zNCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNvbXBvbmVudHMgb2YgdGhlIHV1aWQgZm9yIGEgZGlhZ3JhbVxuICAgICAqL1xuICAgIHByaXZhdGUgczQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgbG9ncyB0aGUgZXJyb3IgaW4gdGhlIGNvbnNvbGUuXG4gICAgICogQHBhcmFtIGVycm9yIHtPYmplY3R9IE9iamVjdCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG5cbn1cbiJdfQ==