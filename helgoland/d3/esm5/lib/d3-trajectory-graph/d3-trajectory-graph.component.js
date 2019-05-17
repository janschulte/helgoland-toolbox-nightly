/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, IterableDiffers, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { area, axisBottom, axisLeft, axisRight, axisTop, bisector, curveLinear, extent, line, mouse, scaleLinear, select, timeFormat, } from 'd3';
import moment from 'moment';
import { D3AxisType } from '../model/d3-axis-type';
import { D3SelectionRange } from '../model/d3-selection-range';
/**
 * @record
 */
function DataEntry() { }
/** @type {?} */
DataEntry.prototype.dist;
/** @type {?} */
DataEntry.prototype.tick;
/** @type {?} */
DataEntry.prototype.x;
/** @type {?} */
DataEntry.prototype.y;
/** @type {?|undefined} */
DataEntry.prototype.xDiagCoord;
/**
 * @record
 */
function DatasetConstellation() { }
/** @type {?|undefined} */
DatasetConstellation.prototype.dataset;
/** @type {?|undefined} */
DatasetConstellation.prototype.data;
/** @type {?|undefined} */
DatasetConstellation.prototype.yScale;
/** @type {?|undefined} */
DatasetConstellation.prototype.drawOptions;
/** @type {?|undefined} */
DatasetConstellation.prototype.focusLabelRect;
/** @type {?|undefined} */
DatasetConstellation.prototype.focusLabel;
/**
 * @record
 */
function DrawOptions() { }
/** @type {?} */
DrawOptions.prototype.uom;
/** @type {?} */
DrawOptions.prototype.id;
/** @type {?} */
DrawOptions.prototype.color;
/** @type {?} */
DrawOptions.prototype.first;
/** @type {?} */
DrawOptions.prototype.offset;
var D3TrajectoryGraphComponent = /** @class */ (function (_super) {
    tslib_1.__extends(D3TrajectoryGraphComponent, _super);
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
export { D3TrajectoryGraphComponent };
if (false) {
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.selection;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.onSelectionChangedFinished;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.onSelectionChanged;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.onHoverHighlight;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.d3Elem;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.datasetMap;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.rawSvg;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.graph;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.height;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.width;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.margin;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.maxLabelwidth;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.lineFun;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.area;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.xScaleBase;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.yScaleBase;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.background;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.focusG;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.highlightFocus;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.focuslabelTime;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.focuslabelY;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.yAxisGen;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.baseValues;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragging;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragStart;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragCurrent;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragRect;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragRectG;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.bufferSum;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dataLength;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.defaultGraphOptions;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.calcYValue;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.calcXValue;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.mousemoveHandler;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.mouseoutHandler;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragStartHandler;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragHandler;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.dragEndHandler;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.showDiagramIndicator;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.iterableDiffers;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.api;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.datasetIdResolver;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    D3TrajectoryGraphComponent.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixHQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsbUJBQW1CLEVBRW5CLHlCQUF5QixFQUV6QixpQkFBaUIsRUFFakIsSUFBSSxHQUNQLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFDSCxJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsRUFDUixTQUFTLEVBQ1QsT0FBTyxFQUNQLFFBQVEsRUFDUixXQUFXLEVBQ1gsTUFBTSxFQUNOLElBQUksRUFDSixLQUFLLEVBRUwsV0FBVyxFQUNYLE1BQU0sRUFDTixVQUFVLEdBQ2IsTUFBTSxJQUFJLENBQUM7QUFDWixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUNuRCxzREFBeUQ7SUFzRGpFLG9DQUNjLGVBQWdDLEVBQ2hDLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxRQUFjLEVBQ2QsZ0JBQWtDO1FBTGhELFlBT0ksa0JBQU0sZUFBZSxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZ0JBQWdC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ZixtQkFBbUI7Z0JBSW5CLGlCQUFpQjtnQkFFakIsSUFBSTtnQkFFa0IsZ0JBQWdCOzs7NEJBMkRyQyxLQUFLOzZDQUdMLE1BQU07cUNBR04sTUFBTTttQ0FHTixNQUFNO3lCQUdOLFNBQVMsU0FBQyxRQUFROztxQ0E3RnZCO0VBOEVZLHlCQUF5QjtTQUR4QiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBEYXRhc2V0T3B0aW9ucyxcbiAgICBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50LFxuICAgIElEYXRhc2V0LFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIExvY2F0ZWRUaW1lVmFsdWVFbnRyeSxcbiAgICBUaW1lLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge1xuICAgIGFyZWEsXG4gICAgYXhpc0JvdHRvbSxcbiAgICBheGlzTGVmdCxcbiAgICBheGlzUmlnaHQsXG4gICAgYXhpc1RvcCxcbiAgICBiaXNlY3RvcixcbiAgICBjdXJ2ZUxpbmVhcixcbiAgICBleHRlbnQsXG4gICAgbGluZSxcbiAgICBtb3VzZSxcbiAgICBTY2FsZUxpbmVhcixcbiAgICBzY2FsZUxpbmVhcixcbiAgICBzZWxlY3QsXG4gICAgdGltZUZvcm1hdCxcbn0gZnJvbSAnZDMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBEM0F4aXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwvZDMtYXhpcy10eXBlJztcbmltcG9ydCB7IEQzR3JhcGhPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvZDMtZ3JhcGgtb3B0aW9ucyc7XG5pbXBvcnQgeyBEM1NlbGVjdGlvblJhbmdlIH0gZnJvbSAnLi4vbW9kZWwvZDMtc2VsZWN0aW9uLXJhbmdlJztcblxuaW50ZXJmYWNlIERhdGFFbnRyeSBleHRlbmRzIExvY2F0ZWRUaW1lVmFsdWVFbnRyeSB7XG4gICAgZGlzdDogbnVtYmVyO1xuICAgIHRpY2s6IG51bWJlcjtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHhEaWFnQ29vcmQ/OiBudW1iZXI7XG4gICAgW2lkOiBzdHJpbmddOiBhbnk7XG59XG5cbmludGVyZmFjZSBEYXRhc2V0Q29uc3RlbGxhdGlvbiB7XG4gICAgZGF0YXNldD86IElEYXRhc2V0O1xuICAgIGRhdGE/OiBMb2NhdGVkVGltZVZhbHVlRW50cnlbXTtcbiAgICB5U2NhbGU/OiBTY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gICAgZHJhd09wdGlvbnM/OiBEcmF3T3B0aW9ucztcbiAgICBmb2N1c0xhYmVsUmVjdD86IGFueTtcbiAgICBmb2N1c0xhYmVsPzogYW55O1xufVxuXG5pbnRlcmZhY2UgRHJhd09wdGlvbnMge1xuICAgIHVvbTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBmaXJzdDogYm9vbGVhbjtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZDMtdHJhamVjdG9yeS1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZDNcIiAjZHRocmVlPjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJX0uZDMgLmF4aXMgbGluZSwuZDMgLmF4aXMgcGF0aHtmaWxsOm5vbmU7c3Ryb2tlOiMwMDB9LmQzIHRleHR7Zm9udC1zaXplOjE0cHh9LmQzIC5ncmFwaEFyZWF7ZmlsbDojYjBjNGRlO2ZpbGwtb3BhY2l0eTouN30uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLm1hcC1oaWdobGlnaHQtbGFiZWx7ZmlsbDojZmZmO2ZpbGwtb3BhY2l0eTouN30uZDMgLm1vdXNlLWZvY3VzLWxpbmV7cG9pbnRlci1ldmVudHM6bm9uZTtzdHJva2Utd2lkdGg6MXB4O3N0cm9rZTojMDAwfS5kMyAubW91c2UtZHJhZ3tmaWxsOnJnYmEoMCwwLDI1NSwuNCk7cG9pbnRlci1ldmVudHM6YWxsO2N1cnNvcjptb3ZlfWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIEQzR3JhcGhPcHRpb25zPlxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGlvbjogRDNTZWxlY3Rpb25SYW5nZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdGlvbkNoYW5nZWRGaW5pc2hlZDogRXZlbnRFbWl0dGVyPEQzU2VsZWN0aW9uUmFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPEQzU2VsZWN0aW9uUmFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uSG92ZXJIaWdobGlnaHQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZHRocmVlJylcbiAgICBwdWJsaWMgZDNFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBkYXRhc2V0TWFwOiBNYXA8c3RyaW5nLCBEYXRhc2V0Q29uc3RlbGxhdGlvbj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSByYXdTdmc6IGFueTtcbiAgICBwcml2YXRlIGdyYXBoOiBhbnk7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtYXJnaW4gPSB7XG4gICAgICAgIHRvcDogMTAsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgYm90dG9tOiA0MCxcbiAgICAgICAgbGVmdDogNDBcbiAgICB9O1xuICAgIHByaXZhdGUgbWF4TGFiZWx3aWR0aCA9IDA7XG4gICAgcHJpdmF0ZSBsaW5lRnVuOiBkMy5MaW5lPERhdGFFbnRyeT47XG4gICAgcHJpdmF0ZSBhcmVhOiBkMy5BcmVhPERhdGFFbnRyeT47XG4gICAgcHJpdmF0ZSB4U2NhbGVCYXNlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gICAgcHJpdmF0ZSB5U2NhbGVCYXNlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gICAgcHJpdmF0ZSBiYWNrZ3JvdW5kOiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c0c6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodEZvY3VzOiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c2xhYmVsVGltZTogYW55O1xuICAgIHByaXZhdGUgZm9jdXNsYWJlbFk6IGFueTtcbiAgICBwcml2YXRlIHlBeGlzR2VuOiBkMy5BeGlzPG51bWJlciB8IHsgdmFsdWVPZigpOiBudW1iZXI7IH0+O1xuICAgIHByaXZhdGUgYmFzZVZhbHVlczogRGF0YUVudHJ5W10gPSBbXTtcbiAgICBwcml2YXRlIGRyYWdnaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgZHJhZ1N0YXJ0OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ0N1cnJlbnQ6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBkcmFnUmVjdDogYW55O1xuICAgIHByaXZhdGUgZHJhZ1JlY3RHOiBhbnk7XG4gICAgcHJpdmF0ZSBidWZmZXJTdW06IG51bWJlcjtcbiAgICBwcml2YXRlIGRhdGFMZW5ndGg6IG51bWJlcjtcblxuICAgIHByaXZhdGUgZGVmYXVsdEdyYXBoT3B0aW9uczogRDNHcmFwaE9wdGlvbnMgPSB7XG4gICAgICAgIGF4aXNUeXBlOiBEM0F4aXNUeXBlLkRpc3RhbmNlLFxuICAgICAgICBkb3R0ZWQ6IGZhbHNlXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaXRlcmFibGVEaWZmZXJzLCBhcGksIGRhdGFzZXRJZFJlc29sdmVyLCB0aW1lU3J2YywgdHJhbnNsYXRlU2VydmljZSk7XG4gICAgICAgIHRoaXMucHJlc2VudGVyT3B0aW9ucyA9IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgaWYgKGNoYW5nZXMuc2VsZWN0aW9uICYmIHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NBbGxEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmF3U3ZnID0gc2VsZWN0KHRoaXMuZDNFbGVtLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMubGluZUZ1biA9IGxpbmU8RGF0YUVudHJ5PigpXG4gICAgICAgICAgICAueCh0aGlzLmNhbGNYVmFsdWUpXG4gICAgICAgICAgICAueSh0aGlzLmNhbGNZVmFsdWUpXG4gICAgICAgICAgICAuY3VydmUoY3VydmVMaW5lYXIpO1xuXG4gICAgICAgIHRoaXMuYXJlYSA9IGFyZWE8RGF0YUVudHJ5PigpXG4gICAgICAgICAgICAueCh0aGlzLmNhbGNYVmFsdWUpXG4gICAgICAgICAgICAueTAodGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAueTEodGhpcy5jYWxjWVZhbHVlKVxuICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWxvYWQgZGF0YSBhdCAnICsgbmV3IERhdGUoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7IH1cblxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShlbnRyeS5kYXRhc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZERhdGFzZXQoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldChpZCwgdXJsKS5zdWJzY3JpYmUoKGRhdGFzZXQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE1hcC5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCB7IGRhdGFzZXQgfSk7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKGRhdGFzZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQWxsRGF0YSgpO1xuICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IEQzR3JhcGhPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZUludGVydmFsQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucywgZmlyc3RDaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFmaXJzdENoYW5nZSAmJiB0aGlzLmRhdGFzZXRNYXAuaGFzKGludGVybmFsSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuZGF0YXNldE1hcC5nZXQoaW50ZXJuYWxJZCkuZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd0xpbmVHcmFwaCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZERhdGEoZGF0YXNldDogSURhdGFzZXQpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXNwYW4gJiZcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuaGFzKGRhdGFzZXQuaW50ZXJuYWxJZCkgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCkudmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRoaXMudGltZXNwYW4sIDAuMik7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YTxMb2NhdGVkVGltZVZhbHVlRW50cnk+KGRhdGFzZXQuaWQsIGRhdGFzZXQudXJsLCBidWZmZXIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmFsaXplOiBvcHRpb24uZ2VuZXJhbGl6ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUxlbmd0aCA9IHJlc3VsdC52YWx1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCkuZGF0YSA9IHJlc3VsdC52YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0RhdGFGb3JJZChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0xpbmVHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzQWxsRGF0YSgpIHtcbiAgICAgICAgdGhpcy5iYXNlVmFsdWVzID0gW107XG4gICAgICAgIHRoaXMuZGF0YXNldElkcy5mb3JFYWNoKChpZCkgPT4gdGhpcy5wcm9jZXNzRGF0YUZvcklkKGlkKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRGF0YUZvcklkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaW50ZXJuYWxJZCkudmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldEVudHJ5ID0gdGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RW50cnkgPSB0aGlzLmJhc2VWYWx1ZXMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzOiBEYXRhRW50cnkgPSBudWxsO1xuICAgICAgICAgICAgZGF0YXNldEVudHJ5LmRhdGEuZm9yRWFjaCgoZWxlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0RW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmNyZWF0ZURhdGFFbnRyeShpbnRlcm5hbElkLCBlbGVtLCBwcmV2aW91cywgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID49IHRoaXMuc2VsZWN0aW9uLmZyb20gJiYgaWR4IDw9IHRoaXMuc2VsZWN0aW9uLnRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVzLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVzLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gZW50cnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID49IHRoaXMuc2VsZWN0aW9uLmZyb20gJiYgaWR4IDw9IHRoaXMuc2VsZWN0aW9uLnRvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFzZVZhbHVlc1tpZHggLSB0aGlzLnNlbGVjdGlvbi5mcm9tXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZXNbaWR4IC0gdGhpcy5zZWxlY3Rpb24uZnJvbV1baW50ZXJuYWxJZF0gPSBlbGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhc2VWYWx1ZXNbaWR4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlc1tpZHhdW2ludGVybmFsSWRdID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRhRW50cnkoXG4gICAgICAgIGludGVybmFsSWQ6IHN0cmluZyxcbiAgICAgICAgZW50cnk6IExvY2F0ZWRUaW1lVmFsdWVFbnRyeSxcbiAgICAgICAgcHJldmlvdXM6IERhdGFFbnRyeSxcbiAgICAgICAgaW5kZXg6IG51bWJlclxuICAgICk6IERhdGFFbnRyeSB7XG4gICAgICAgIGxldCBkaXN0OiBudW1iZXI7XG4gICAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICAgICAgY29uc3QgbmV3ZGlzdCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuKFxuICAgICAgICAgICAgICAgIGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgICAgICAgIGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZGlzdCA9IHByZXZpb3VzLmRpc3QgKyBNYXRoLnJvdW5kKG5ld2Rpc3QgLyAxMDAwICogMTAwMDAwKSAvIDEwMDAwMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpc3QgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aWNrOiBpbmRleCxcbiAgICAgICAgICAgIGRpc3Q6IE1hdGgucm91bmQoZGlzdCAqIDEwKSAvIDEwLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBlbnRyeS50aW1lc3RhbXAsXG4gICAgICAgICAgICB2YWx1ZTogZW50cnkudmFsdWUsXG4gICAgICAgICAgICBbaW50ZXJuYWxJZF06IGVudHJ5LnZhbHVlLFxuICAgICAgICAgICAgeDogZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgICB5OiBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgIGdlb21ldHJ5OiBlbnRyeS5nZW9tZXRyeVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzdGFuY2VCZXR3ZWVuKGxhdGl0dWRlMSwgbG9uZ2l0dWRlMSwgbGF0aXR1ZGUyLCBsb25naXR1ZGUyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgUiA9IDYzNzEwMDA7XG4gICAgICAgIGNvbnN0IHJhZCA9IE1hdGguUEkgLyAxODA7XG4gICAgICAgIGNvbnN0IGxhdDEgPSBsYXRpdHVkZTEgKiByYWQ7XG4gICAgICAgIGNvbnN0IGxhdDIgPSBsYXRpdHVkZTIgKiByYWQ7XG4gICAgICAgIGNvbnN0IHNpbkRMYXQgPSBNYXRoLnNpbigobGF0aXR1ZGUyIC0gbGF0aXR1ZGUxKSAqIHJhZCAvIDIpO1xuICAgICAgICBjb25zdCBzaW5ETG9uID0gTWF0aC5zaW4oKGxvbmdpdHVkZTIgLSBsb25naXR1ZGUxKSAqIHJhZCAvIDIpO1xuICAgICAgICBjb25zdCBhID0gc2luRExhdCAqIHNpbkRMYXQgKyBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpICogc2luRExvbiAqIHNpbkRMb247XG4gICAgICAgIGNvbnN0IGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICAgICAgICByZXR1cm4gUiAqIGM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjWVZhbHVlID0gKGQ6IERhdGFFbnRyeSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy55U2NhbGVCYXNlKGQudmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1hWYWx1ZSA9IChkOiBEYXRhRW50cnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCB4RGlhZ0Nvb3JkID0gdGhpcy54U2NhbGVCYXNlKHRoaXMuZ2V0WFZhbHVlKGQpKTtcbiAgICAgICAgZC54RGlhZ0Nvb3JkID0geERpYWdDb29yZDtcbiAgICAgICAgcmV0dXJuIHhEaWFnQ29vcmQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3U3ZnLm5vZGUoKS5oZWlnaHQuYmFzZVZhbC52YWx1ZSAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkud2lkdGguYmFzZVZhbC52YWx1ZSAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMubWF4TGFiZWx3aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFhWYWx1ZShkYXRhOiBEYXRhRW50cnkpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5kaXN0O1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpbWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudGltZXN0YW1wO1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpY2tzOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRpY2s7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRpY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdEb3RzKHZhbHVlczogRGF0YUVudHJ5W10sIHlTY2FsZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+LCBvcHRpb25zOiBEcmF3T3B0aW9ucykge1xuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnZG90JylcbiAgICAgICAgICAgIC5kYXRhKHZhbHVlcylcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCAxLjUpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsIG9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignY3gnLCB0aGlzLmNhbGNYVmFsdWUpXG4gICAgICAgICAgICAuYXR0cignY3knLCAoZDogRGF0YUVudHJ5KSA9PiB5U2NhbGUoZFtvcHRpb25zLmlkXSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1ZhbHVlTGluZSh2YWx1ZXM6IERhdGFFbnRyeVtdLCB5U2NhbGU6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPiwgb3B0aW9uczogRHJhd09wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgICAgICAgIC5kYXR1bSh2YWx1ZXMpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDEpXG4gICAgICAgICAgICAuYXR0cignZCcsIGxpbmU8RGF0YUVudHJ5PigpXG4gICAgICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgICAgIC55KChkOiBEYXRhRW50cnkpID0+IHlTY2FsZShkW29wdGlvbnMuaWRdKSlcbiAgICAgICAgICAgICAgICAuY3VydmUoY3VydmVMaW5lYXIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdHcmFwaCh5U2NhbGU6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPiwgb3B0aW9uczogRHJhd09wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucy5kb3R0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0RvdHModGhpcy5iYXNlVmFsdWVzLCB5U2NhbGUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmF3VmFsdWVMaW5lKHRoaXMuYmFzZVZhbHVlcywgeVNjYWxlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0xpbmVHcmFwaCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJhc2VWYWx1ZXMgfHwgdGhpcy5iYXNlVmFsdWVzLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5ncmFwaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYWxjdWxhdGVXaWR0aCgpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5idWZmZXJTdW0gPSAwO1xuXG4gICAgICAgIHRoaXMueVNjYWxlQmFzZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGRhdGFzZXRFbnRyeSwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhpZCkgJiYgZGF0YXNldEVudHJ5LmRhdGEgJiYgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhc2V0RW50cnkuZHJhd09wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVvbTogZGF0YXNldEVudHJ5LmRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgICAgICBpZDogZGF0YXNldEVudHJ5LmRhdGFzZXQuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMueVNjYWxlQmFzZSA9PT0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLmJ1ZmZlclN1bVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgYXhpc1Jlc3VsdCA9IHRoaXMuZHJhd1lBeGlzKGRhdGFzZXRFbnRyeS5kcmF3T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVNjYWxlQmFzZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBheGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlclN1bSA9IGF4aXNSZXN1bHQuYnVmZmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhc2V0RW50cnkueVNjYWxlID0gYXhpc1Jlc3VsdC55U2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdGhpcy55U2NhbGVCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IHJpZ2h0IGF4aXMgYXMgYm9yZGVyXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLndpZHRoICsgJywgMCknKVxuICAgICAgICAgICAgLmNhbGwoYXhpc1JpZ2h0KHRoaXMueVNjYWxlQmFzZSkudGlja1NpemUoMCkudGlja3MoMCkpO1xuXG4gICAgICAgIHRoaXMuZHJhd1hBeGlzKHRoaXMuYnVmZmVyU3VtKTtcblxuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZW50cnksIGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5oYXMoaWQpICYmIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlICYmIGVudHJ5LmRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHcmFwaChlbnRyeS55U2NhbGUsIGVudHJ5LmRyYXdPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyU3VtICsgJywgMCknKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUuZm9jdXMnLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIpXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0LmZvY3VzJywgdGhpcy5tb3VzZW91dEhhbmRsZXIpXG4gICAgICAgICAgICAub24oJ21vdXNlZG93bi5kcmFnJywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUuZHJhZycsIHRoaXMuZHJhZ0hhbmRsZXIpXG4gICAgICAgICAgICAub24oJ21vdXNldXAuZHJhZycsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNHID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1cyA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOmxpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgJzAnKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgJzAnKVxuICAgICAgICAgICAgLmF0dHIoJ3gxJywgJzAnKVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgJzAnKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnYmxhY2snKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAnMXB4Jyk7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuaGFzKGlkKSAmJiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkudmlzaWJsZSAmJiBlbnRyeS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3QgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3doaXRlJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWwgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JykuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwteCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXdlaWdodCcsICdsaWdodGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFRpbWUgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwteCcpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxZID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXknKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5iYXNlVmFsdWVzIHx8IHRoaXMuYmFzZVZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb29yZHMgPSBtb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRJdGVtRm9yWChjb29yZHNbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgdGhpcy5zaG93RGlhZ3JhbUluZGljYXRvcihpZHgpO1xuICAgICAgICB0aGlzLm9uSG92ZXJIaWdobGlnaHQuZW1pdCh0aGlzLmJhc2VWYWx1ZXNbaWR4XS50aWNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlb3V0SGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlRGlhZ3JhbUluZGljYXRvcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ1N0YXJ0SGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdTdGFydCA9IG1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYXdEcmFnUmVjdGFuZ2xlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnRW5kSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdTdGFydCB8fCAhdGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWRGaW5pc2hlZC5lbWl0KHsgZnJvbTogMCwgdG86IHRoaXMuZGF0YUxlbmd0aCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ1N0YXJ0WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgICAgICBjb25zdCB0byA9IHRoaXMuZ2V0SXRlbUZvclgodGhpcy5kcmFnQ3VycmVudFswXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWRGaW5pc2hlZC5lbWl0KHRoaXMucHJlcGFyZVJhbmdlKHRoaXMuYmFzZVZhbHVlc1tmcm9tXS50aWNrLCB0aGlzLmJhc2VWYWx1ZXNbdG9dLnRpY2spKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdTdGFydCA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNldERyYWcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVSYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBEM1NlbGVjdGlvblJhbmdlIHtcbiAgICAgICAgaWYgKGZyb20gPD0gdG8pIHtcbiAgICAgICAgICAgIHJldHVybiB7IGZyb20sIHRvIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZnJvbTogdG8sIHRvOiBmcm9tIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3RHJhZ1JlY3RhbmdsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdTdGFydCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmRyYWdDdXJyZW50ID0gbW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG5cbiAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuZ2V0SXRlbUZvclgodGhpcy5kcmFnU3RhcnRbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgY29uc3QgdG8gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ0N1cnJlbnRbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQuZW1pdCh0aGlzLnByZXBhcmVSYW5nZSh0aGlzLmJhc2VWYWx1ZXNbZnJvbV0udGljaywgdGhpcy5iYXNlVmFsdWVzW3RvXS50aWNrKSk7XG5cbiAgICAgICAgY29uc3QgeDEgPSBNYXRoLm1pbih0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5tYXgodGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kcmFnUmVjdCAmJiAhdGhpcy5kcmFnUmVjdEcpIHtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gdGhpcy5kcmFnUmVjdEcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHgxICsgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWRyYWcnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdC5hdHRyKCd3aWR0aCcsIHgyIC0geDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXREcmFnKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnUmVjdEcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVEaWFncmFtSW5kaWNhdG9yKCkge1xuICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dEaWFncmFtSW5kaWNhdG9yID0gKGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmJhc2VWYWx1ZXNbaWR4XTtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodEZvY3VzLmF0dHIoJ3gxJywgaXRlbS54RGlhZ0Nvb3JkKVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgMClcbiAgICAgICAgICAgIC5hdHRyKCd4MicsIGl0ZW0ueERpYWdDb29yZClcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2hpZGRlbicsIGZhbHNlKTtcblxuICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IGZhbHNlO1xuICAgICAgICBpZiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW0pIC8gMiA+IGl0ZW0ueERpYWdDb29yZCkgeyBvbkxlZnRTaWRlID0gdHJ1ZTsgfVxuXG4gICAgICAgIHRoaXMuc2hvd0xhYmVsVmFsdWVzKGl0ZW0sIG9uTGVmdFNpZGUpO1xuICAgICAgICB0aGlzLnNob3dUaW1lSW5kaWNhdG9yTGFiZWwoaXRlbSwgb25MZWZ0U2lkZSk7XG4gICAgICAgIHRoaXMuc2hvd0JvdHRvbUluZGljYXRvckxhYmVsKGl0ZW0sIG9uTGVmdFNpZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0xhYmVsVmFsdWVzKGl0ZW06IERhdGFFbnRyeSwgb25MZWZ0U2lkZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZW50cnksIGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuZm9jdXNMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsLnRleHQoaXRlbVtpZF0gKyAoZW50cnkuZGF0YXNldC51b20gPyBlbnRyeS5kYXRhc2V0LnVvbSA6ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5WCA9IG9uTGVmdFNpZGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS54RGlhZ0Nvb3JkICsgMiA6IGl0ZW0ueERpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudztcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeVgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIGVudHJ5LnlTY2FsZShpdGVtW2lkXSkgKyB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmggLSAzKTtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnlYKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBlbnRyeS55U2NhbGUoaXRlbVtpZF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkuaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dUaW1lSW5kaWNhdG9yTGFiZWwoaXRlbTogRGF0YUVudHJ5LCBvbkxlZnRTaWRlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFRpbWUudGV4dChtb21lbnQoaXRlbS50aW1lc3RhbXApLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKSk7XG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFRpbWVcbiAgICAgICAgICAgIC5hdHRyKCd4Jywgb25MZWZ0U2lkZSA/IGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsVGltZS5ub2RlKCkpLncpXG4gICAgICAgICAgICAuYXR0cigneScsIDEzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dCb3R0b21JbmRpY2F0b3JMYWJlbChpdGVtOiBEYXRhRW50cnksIG9uTGVmdFNpZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSA9PT0gRDNBeGlzVHlwZS5EaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2xhYmVsWS50ZXh0KGl0ZW0uZGlzdCArICcga20nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlID09PSBEM0F4aXNUeXBlLlRpY2tzKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzbGFiZWxZLnRleHQoJ01lYXN1cmVtZW50OiAnICsgaXRlbS50aWNrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvY3VzbGFiZWxZXG4gICAgICAgICAgICAuYXR0cigneScsIHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCkgLSA1KVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBvbkxlZnRTaWRlID8gaXRlbS54RGlhZ0Nvb3JkICsgMiA6IGl0ZW0ueERpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyh0aGlzLmZvY3VzbGFiZWxZLm5vZGUoKSkudyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaW1lbnNpb25zKGVsOiBhbnkpIHtcbiAgICAgICAgbGV0IHcgPSAwO1xuICAgICAgICBsZXQgaCA9IDA7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLmdldEJCb3goKTtcbiAgICAgICAgICAgIHcgPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgaCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBnZXREaW1lbnNpb25zKCkgJyArIGVsICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtRm9yWCh4OiBudW1iZXIsIGRhdGE6IERhdGFFbnRyeVtdKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy54U2NhbGVCYXNlLmludmVydCh4KTtcbiAgICAgICAgY29uc3QgYmlzZWN0RGF0ZSA9IGJpc2VjdG9yKChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLkRpc3RhbmNlOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5kaXN0O1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaW1lOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpY2tzOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnRpY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmxlZnQ7XG4gICAgICAgIHJldHVybiBiaXNlY3REYXRlKHRoaXMuYmFzZVZhbHVlcywgaW5kZXgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1lBeGlzKG9wdGlvbnM6IERyYXdPcHRpb25zKTogYW55IHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBleHRlbnQ8RGF0YUVudHJ5LCBudW1iZXI+KHRoaXMuYmFzZVZhbHVlcywgKGRhdHVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkYXR1bVtvcHRpb25zLmlkXTsgLy8gaGVyZSB3aXRoIElEXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByYW5nZU9mZnNldCA9IChyYW5nZVsxXSAtIHJhbmdlWzBdKSAqIDAuMTA7XG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3JhbmdlWzBdIC0gcmFuZ2VPZmZzZXQsIHJhbmdlWzFdICsgcmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIHRoaXMueUF4aXNHZW4gPSBheGlzTGVmdCh5U2NhbGUpLnRpY2tzKDUpO1xuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzXG4gICAgICAgIGNvbnN0IGF4aXMgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh0aGlzLnlBeGlzR2VuKTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpcyBsYWJlbFxuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIG9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAudGV4dChvcHRpb25zLnVvbSk7XG5cbiAgICAgICAgY29uc3QgYXhpc1dpZHRoID0gYXhpcy5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgNSArIHRoaXMuZ2V0RGltZW5zaW9ucyh0ZXh0Lm5vZGUoKSkuaDtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gb3B0aW9ucy5vZmZzZXQgKyAoYXhpc1dpZHRoIDwgMzAgPyAzMCA6IGF4aXNXaWR0aCk7XG4gICAgICAgIGlmICghb3B0aW9ucy5maXJzdCkge1xuICAgICAgICAgICAgYXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBidWZmZXIgKyAnLCAwKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGV4dE9mZnNldCA9ICFvcHRpb25zLmZpcnN0ID8gYnVmZmVyIDogb3B0aW9ucy5vZmZzZXQ7XG4gICAgICAgIHRleHQuYXR0cigneScsIDAgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXhMYWJlbHdpZHRoICsgdGV4dE9mZnNldClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMCAtICh0aGlzLmhlaWdodCAvIDIpKTtcblxuICAgICAgICAvLyBkcmF3IHRoZSB5IGdyaWQgbGluZXMgd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBkYXRhc2V0XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgICAgICAuY2FsbChheGlzTGVmdCh5U2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrcyg1KVxuICAgICAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgICAgeVNjYWxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3WEF4aXMoYnVmZmVyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54U2NhbGVCYXNlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbih0aGlzLmdldFhEb21haW4odGhpcy5iYXNlVmFsdWVzKSlcbiAgICAgICAgICAgIC5yYW5nZShbYnVmZmVyLCB0aGlzLndpZHRoXSk7XG5cbiAgICAgICAgY29uc3QgeEF4aXNHZW4gPSBheGlzQm90dG9tKHRoaXMueFNjYWxlQmFzZSkudGlja3MoNSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSA9PT0gRDNBeGlzVHlwZS5UaW1lKSB7XG4gICAgICAgICAgICB4QXhpc0dlbi50aWNrRm9ybWF0KChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVGb3JtYXQoJyVkLiVtLiVZICVIOiVNOiVTJykobmV3IERhdGUoZC52YWx1ZU9mKCkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB4IGF4aXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpc0dlbik7XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeCBncmlkIGxpbmVzXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKGF4aXNCb3R0b20odGhpcy54U2NhbGVCYXNlKVxuICAgICAgICAgICAgICAgIC50aWNrcygxMClcbiAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBkcmF3IHVwcGVyIGF4aXMgYXMgYm9yZGVyXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKGF4aXNUb3AodGhpcy54U2NhbGVCYXNlKS50aWNrcygwKS50aWNrU2l6ZSgwKSk7XG5cbiAgICAgICAgLy8gdGV4dCBsYWJlbCBmb3IgdGhlIHggYXhpc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgYnVmZmVyKSAvIDIpXG4gICAgICAgICAgICAuYXR0cigneScsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4uYm90dG9tIC0gNSlcbiAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC50ZXh0KHRoaXMuZ2V0WEF4aXNMYWJlbCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFhEb21haW4odmFsdWVzOiBEYXRhRW50cnlbXSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLkRpc3RhbmNlOlxuICAgICAgICAgICAgICAgIHJldHVybiBbdmFsdWVzWzBdLmRpc3QsIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0uZGlzdF07XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3ZhbHVlc1swXS50aW1lc3RhbXAsIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0udGltZXN0YW1wXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZXNbMF0udGljaywgdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXS50aWNrXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0WEF4aXNMYWJlbCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0Rpc3RhbmNlJztcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaW1lOlxuICAgICAgICAgICAgICAgIHJldHVybiAnVGltZSc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnVGlja3MnO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=