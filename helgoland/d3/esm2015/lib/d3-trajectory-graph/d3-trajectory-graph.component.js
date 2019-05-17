/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class D3TrajectoryGraphComponent extends DatasetPresenterComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} api
     * @param {?} datasetIdResolver
     * @param {?} timeSrvc
     * @param {?} translateService
     */
    constructor(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) {
        super(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService);
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.translateService = translateService;
        this.onSelectionChangedFinished = new EventEmitter();
        this.onSelectionChanged = new EventEmitter();
        this.onHoverHighlight = new EventEmitter();
        this.datasetMap = new Map();
        this.margin = {
            top: 10,
            right: 10,
            bottom: 40,
            left: 40
        };
        this.maxLabelwidth = 0;
        this.baseValues = [];
        this.defaultGraphOptions = {
            axisType: D3AxisType.Distance,
            dotted: false
        };
        this.calcYValue = (d) => {
            return this.yScaleBase(d.value);
        };
        this.calcXValue = (d, i) => {
            /** @type {?} */
            const xDiagCoord = this.xScaleBase(this.getXValue(d));
            d.xDiagCoord = xDiagCoord;
            return xDiagCoord;
        };
        this.mousemoveHandler = () => {
            if (!this.baseValues || this.baseValues.length === 0) {
                return;
            }
            /** @type {?} */
            const coords = mouse(this.background.node());
            /** @type {?} */
            const idx = this.getItemForX(coords[0] + this.bufferSum, this.baseValues);
            this.showDiagramIndicator(idx);
            this.onHoverHighlight.emit(this.baseValues[idx].tick);
        };
        this.mouseoutHandler = () => {
            this.hideDiagramIndicator();
        };
        this.dragStartHandler = () => {
            this.dragging = false;
            this.dragStart = mouse(this.background.node());
        };
        this.dragHandler = () => {
            this.dragging = true;
            this.drawDragRectangle();
        };
        this.dragEndHandler = () => {
            if (!this.dragStart || !this.dragging) {
                this.onSelectionChangedFinished.emit({ from: 0, to: this.dataLength });
            }
            else {
                /** @type {?} */
                const from = this.getItemForX(this.dragStart[0] + this.bufferSum, this.baseValues);
                /** @type {?} */
                const to = this.getItemForX(this.dragCurrent[0] + this.bufferSum, this.baseValues);
                this.onSelectionChangedFinished.emit(this.prepareRange(this.baseValues[from].tick, this.baseValues[to].tick));
            }
            this.dragStart = null;
            this.dragging = false;
            this.resetDrag();
        };
        this.showDiagramIndicator = (idx) => {
            /** @type {?} */
            const item = this.baseValues[idx];
            this.focusG.style('visibility', 'visible');
            this.highlightFocus.attr('x1', item.xDiagCoord)
                .attr('y1', 0)
                .attr('x2', item.xDiagCoord)
                .attr('y2', this.height)
                .classed('hidden', false);
            /** @type {?} */
            let onLeftSide = false;
            if ((this.background.node().getBBox().width + this.bufferSum) / 2 > item.xDiagCoord) {
                onLeftSide = true;
            }
            this.showLabelValues(item, onLeftSide);
            this.showTimeIndicatorLabel(item, onLeftSide);
            this.showBottomIndicatorLabel(item, onLeftSide);
        };
        this.presenterOptions = this.defaultGraphOptions;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes["selection"] && this.selection) {
            this.processAllData();
            this.drawLineGraph();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
    }
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    reloadDataForDatasets(datasetIds) {
        console.log('reload data at ' + new Date());
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) { }
    /**
     * @return {?}
     */
    timeIntervalChanges() {
        this.datasetMap.forEach((entry) => {
            if (entry.dataset) {
                this.loadData(entry.dataset);
            }
        });
    }
    /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    addDataset(id, url) {
        this.api.getDataset(id, url).subscribe((dataset) => {
            this.datasetMap.set(dataset.internalId, { dataset });
            this.loadData(dataset);
        });
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeDataset(internalId) {
        this.datasetMap.delete(internalId);
        this.processAllData();
        this.drawLineGraph();
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    setSelectedId(internalId) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeSelectedId(internalId) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {?} options
     * @return {?}
     */
    presenterOptionsChanged(options) {
        this.timeIntervalChanges();
    }
    /**
     * @param {?} internalId
     * @param {?} options
     * @param {?} firstChange
     * @return {?}
     */
    datasetOptionsChanged(internalId, options, firstChange) {
        if (!firstChange && this.datasetMap.has(internalId)) {
            this.loadData(this.datasetMap.get(internalId).dataset);
        }
    }
    /**
     * @return {?}
     */
    onResize() {
        this.drawLineGraph();
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    loadData(dataset) {
        if (this.timespan &&
            this.datasetOptions.has(dataset.internalId) &&
            this.datasetOptions.get(dataset.internalId).visible) {
            /** @type {?} */
            const buffer = this.timeSrvc.getBufferedTimespan(this.timespan, 0.2);
            /** @type {?} */
            const option = this.datasetOptions.get(dataset.internalId);
            this.api.getData(dataset.id, dataset.url, buffer, {
                generalize: option.generalize
            })
                .subscribe((result) => {
                this.dataLength = result.values.length;
                this.datasetMap.get(dataset.internalId).data = result.values;
                this.processDataForId(dataset.internalId);
                this.drawLineGraph();
            });
        }
        else {
            this.drawLineGraph();
        }
    }
    /**
     * @return {?}
     */
    processAllData() {
        this.baseValues = [];
        this.datasetIds.forEach((id) => this.processDataForId(id));
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    processDataForId(internalId) {
        if (this.datasetOptions.get(internalId).visible) {
            /** @type {?} */
            const datasetEntry = this.datasetMap.get(internalId);
            /** @type {?} */
            const firstEntry = this.baseValues.length === 0;
            /** @type {?} */
            let previous = null;
            datasetEntry.data.forEach((elem, idx) => {
                if (firstEntry) {
                    /** @type {?} */
                    const entry = this.createDataEntry(internalId, elem, previous, idx);
                    if (this.selection) {
                        if (idx >= this.selection.from && idx <= this.selection.to) {
                            this.baseValues.push(entry);
                        }
                    }
                    else {
                        this.baseValues.push(entry);
                    }
                    previous = entry;
                }
                else {
                    if (this.selection) {
                        if (idx >= this.selection.from && idx <= this.selection.to) {
                            if (this.baseValues[idx - this.selection.from]) {
                                this.baseValues[idx - this.selection.from][internalId] = elem.value;
                            }
                        }
                    }
                    else {
                        if (this.baseValues[idx]) {
                            this.baseValues[idx][internalId] = elem.value;
                        }
                    }
                }
            });
        }
    }
    /**
     * @param {?} internalId
     * @param {?} entry
     * @param {?} previous
     * @param {?} index
     * @return {?}
     */
    createDataEntry(internalId, entry, previous, index) {
        /** @type {?} */
        let dist;
        if (previous) {
            /** @type {?} */
            const newdist = this.distanceBetween(entry.geometry.coordinates[1], entry.geometry.coordinates[0], previous.geometry.coordinates[1], previous.geometry.coordinates[0]);
            dist = previous.dist + Math.round(newdist / 1000 * 100000) / 100000;
        }
        else {
            dist = 0;
        }
        return {
            tick: index,
            dist: Math.round(dist * 10) / 10,
            timestamp: entry.timestamp,
            value: entry.value,
            [internalId]: entry.value,
            x: entry.geometry.coordinates[0],
            y: entry.geometry.coordinates[1],
            geometry: entry.geometry
        };
    }
    /**
     * @param {?} latitude1
     * @param {?} longitude1
     * @param {?} latitude2
     * @param {?} longitude2
     * @return {?}
     */
    distanceBetween(latitude1, longitude1, latitude2, longitude2) {
        /** @type {?} */
        const R = 6371000;
        /** @type {?} */
        const rad = Math.PI / 180;
        /** @type {?} */
        const lat1 = latitude1 * rad;
        /** @type {?} */
        const lat2 = latitude2 * rad;
        /** @type {?} */
        const sinDLat = Math.sin((latitude2 - latitude1) * rad / 2);
        /** @type {?} */
        const sinDLon = Math.sin((longitude2 - longitude1) * rad / 2);
        /** @type {?} */
        const a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
        /** @type {?} */
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    /**
     * @return {?}
     */
    calculateHeight() {
        return this.rawSvg.node().height.baseVal.value - this.margin.top - this.margin.bottom;
    }
    /**
     * @return {?}
     */
    calculateWidth() {
        return this.rawSvg.node().width.baseVal.value - this.margin.left - this.margin.right - this.maxLabelwidth;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getXValue(data) {
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
    }
    /**
     * @param {?} values
     * @param {?} yScale
     * @param {?} options
     * @return {?}
     */
    drawDots(values, yScale, options) {
        this.graph.selectAll('dot')
            .data(values)
            .enter().append('circle')
            .attr('stroke', options.color)
            .attr('r', 1.5)
            .attr('fill', options.color)
            .attr('cx', this.calcXValue)
            .attr('cy', (d) => yScale(d[options.id]));
    }
    /**
     * @param {?} values
     * @param {?} yScale
     * @param {?} options
     * @return {?}
     */
    drawValueLine(values, yScale, options) {
        this.graph.append('svg:path')
            .datum(values)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', options.color)
            .attr('stroke-width', 1)
            .attr('d', line()
            .x(this.calcXValue)
            .y((d) => yScale(d[options.id]))
            .curve(curveLinear));
    }
    /**
     * @param {?} yScale
     * @param {?} options
     * @return {?}
     */
    drawGraph(yScale, options) {
        if (this.presenterOptions.dotted) {
            this.drawDots(this.baseValues, yScale, options);
        }
        else {
            this.drawValueLine(this.baseValues, yScale, options);
        }
    }
    /**
     * @return {?}
     */
    drawLineGraph() {
        if (!this.baseValues || this.baseValues.length === 0 || !this.graph) {
            return;
        }
        this.height = this.calculateHeight();
        this.width = this.calculateWidth();
        this.graph.selectAll('*').remove();
        this.bufferSum = 0;
        this.yScaleBase = null;
        this.datasetMap.forEach((datasetEntry, id) => {
            if (this.datasetOptions.has(id) && datasetEntry.data && this.datasetOptions.get(id).visible) {
                datasetEntry.drawOptions = {
                    uom: datasetEntry.dataset.uom,
                    id: datasetEntry.dataset.internalId,
                    color: this.datasetOptions.get(id).color,
                    first: this.yScaleBase === null,
                    offset: this.bufferSum
                };
                /** @type {?} */
                const axisResult = this.drawYAxis(datasetEntry.drawOptions);
                if (this.yScaleBase === null) {
                    this.yScaleBase = axisResult.yScale;
                }
                else {
                    this.bufferSum = axisResult.buffer;
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
        this.datasetMap.forEach((entry, id) => {
            if (this.datasetOptions.has(id) && this.datasetOptions.get(id).visible && entry.data) {
                this.drawGraph(entry.yScale, entry.drawOptions);
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
        this.datasetMap.forEach((entry, id) => {
            if (this.datasetOptions.has(id) && this.datasetOptions.get(id).visible && entry.data) {
                entry.focusLabelRect = this.focusG.append('svg:rect')
                    .style('fill', 'white')
                    .style('stroke', 'none')
                    .style('pointer-events', 'none');
                entry.focusLabel = this.focusG.append('svg:text').attr('class', 'mouse-focus-label-x')
                    .style('pointer-events', 'none')
                    .style('fill', this.datasetOptions.get(id).color)
                    .style('font-weight', 'lighter');
            }
        });
        this.focuslabelTime = this.focusG.append('svg:text')
            .style('pointer-events', 'none')
            .attr('class', 'mouse-focus-label-x');
        this.focuslabelY = this.focusG.append('svg:text')
            .style('pointer-events', 'none')
            .attr('class', 'mouse-focus-label-y');
    }
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    prepareRange(from, to) {
        if (from <= to) {
            return { from, to };
        }
        return { from: to, to: from };
    }
    /**
     * @return {?}
     */
    drawDragRectangle() {
        if (!this.dragStart) {
            return;
        }
        this.dragCurrent = mouse(this.background.node());
        /** @type {?} */
        const from = this.getItemForX(this.dragStart[0] + this.bufferSum, this.baseValues);
        /** @type {?} */
        const to = this.getItemForX(this.dragCurrent[0] + this.bufferSum, this.baseValues);
        this.onSelectionChanged.emit(this.prepareRange(this.baseValues[from].tick, this.baseValues[to].tick));
        /** @type {?} */
        const x1 = Math.min(this.dragStart[0], this.dragCurrent[0]);
        /** @type {?} */
        const x2 = Math.max(this.dragStart[0], this.dragCurrent[0]);
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
    }
    /**
     * @return {?}
     */
    resetDrag() {
        if (this.dragRectG) {
            this.dragRectG.remove();
            this.dragRectG = null;
            this.dragRect = null;
        }
    }
    /**
     * @return {?}
     */
    hideDiagramIndicator() {
        this.focusG.style('visibility', 'hidden');
    }
    /**
     * @param {?} item
     * @param {?} onLeftSide
     * @return {?}
     */
    showLabelValues(item, onLeftSide) {
        this.datasetMap.forEach((entry, id) => {
            if (this.datasetOptions.get(id).visible) {
                if (entry.focusLabel) {
                    entry.focusLabel.text(item[id] + (entry.dataset.uom ? entry.dataset.uom : ''));
                    /** @type {?} */
                    const entryX = onLeftSide ?
                        item.xDiagCoord + 2 : item.xDiagCoord - this.getDimensions(entry.focusLabel.node()).w;
                    entry.focusLabel
                        .attr('x', entryX)
                        .attr('y', entry.yScale(item[id]) + this.getDimensions(entry.focusLabel.node()).h - 3);
                    entry.focusLabelRect
                        .attr('x', entryX)
                        .attr('y', entry.yScale(item[id]))
                        .attr('width', this.getDimensions(entry.focusLabel.node()).w)
                        .attr('height', this.getDimensions(entry.focusLabel.node()).h);
                }
            }
        });
    }
    /**
     * @param {?} item
     * @param {?} onLeftSide
     * @return {?}
     */
    showTimeIndicatorLabel(item, onLeftSide) {
        this.focuslabelTime.text(moment(item.timestamp).format('DD.MM.YY HH:mm'));
        this.focuslabelTime
            .attr('x', onLeftSide ? item.xDiagCoord + 2 : item.xDiagCoord - this.getDimensions(this.focuslabelTime.node()).w)
            .attr('y', 13);
    }
    /**
     * @param {?} item
     * @param {?} onLeftSide
     * @return {?}
     */
    showBottomIndicatorLabel(item, onLeftSide) {
        if (this.presenterOptions.axisType === D3AxisType.Distance) {
            this.focuslabelY.text(item.dist + ' km');
        }
        if (this.presenterOptions.axisType === D3AxisType.Ticks) {
            this.focuslabelY.text('Measurement: ' + item.tick);
        }
        this.focuslabelY
            .attr('y', this.calculateHeight() - 5)
            .attr('x', onLeftSide ? item.xDiagCoord + 2 : item.xDiagCoord - this.getDimensions(this.focuslabelY.node()).w);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getDimensions(el) {
        /** @type {?} */
        let w = 0;
        /** @type {?} */
        let h = 0;
        if (el) {
            /** @type {?} */
            const dimensions = el.getBBox();
            w = dimensions.width;
            h = dimensions.height;
        }
        else {
            console.log('error: getDimensions() ' + el + ' not found.');
        }
        return {
            w,
            h
        };
    }
    /**
     * @param {?} x
     * @param {?} data
     * @return {?}
     */
    getItemForX(x, data) {
        /** @type {?} */
        const index = this.xScaleBase.invert(x);
        /** @type {?} */
        const bisectDate = bisector((d) => {
            switch (this.presenterOptions.axisType) {
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
    }
    /**
     * @param {?} options
     * @return {?}
     */
    drawYAxis(options) {
        /** @type {?} */
        const range = extent(this.baseValues, (datum, index, array) => {
            return datum[options.id]; // here with ID
        });
        /** @type {?} */
        const rangeOffset = (range[1] - range[0]) * 0.10;
        /** @type {?} */
        const yScale = scaleLinear()
            .domain([range[0] - rangeOffset, range[1] + rangeOffset])
            .range([this.height, 0]);
        this.yAxisGen = axisLeft(yScale).ticks(5);
        /** @type {?} */
        const axis = this.graph.append('svg:g')
            .attr('class', 'y axis')
            .call(this.yAxisGen);
        /** @type {?} */
        const text = this.graph.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('fill', options.color)
            .text(options.uom);
        /** @type {?} */
        const axisWidth = axis.node().getBBox().width + 5 + this.getDimensions(text.node()).h;
        /** @type {?} */
        const buffer = options.offset + (axisWidth < 30 ? 30 : axisWidth);
        if (!options.first) {
            axis.attr('transform', 'translate(' + buffer + ', 0)');
        }
        /** @type {?} */
        const textOffset = !options.first ? buffer : options.offset;
        text.attr('y', 0 - this.margin.left - this.maxLabelwidth + textOffset)
            .attr('x', 0 - (this.height / 2));
        // draw the y grid lines when there is only one dataset
        if (this.datasetIds.length === 1) {
            this.graph.append('svg:g')
                .attr('class', 'grid')
                .call(axisLeft(yScale)
                .ticks(5)
                .tickSize(-this.width)
                .tickFormat(() => ''));
        }
        return {
            buffer,
            yScale
        };
    }
    /**
     * @param {?} buffer
     * @return {?}
     */
    drawXAxis(buffer) {
        this.xScaleBase = scaleLinear()
            .domain(this.getXDomain(this.baseValues))
            .range([buffer, this.width]);
        /** @type {?} */
        const xAxisGen = axisBottom(this.xScaleBase).ticks(5);
        if (this.presenterOptions.axisType === D3AxisType.Time) {
            xAxisGen.tickFormat((d) => {
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
            .tickFormat(() => ''));
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
    }
    /**
     * @param {?} values
     * @return {?}
     */
    getXDomain(values) {
        switch (this.presenterOptions.axisType) {
            case D3AxisType.Distance:
                return [values[0].dist, values[values.length - 1].dist];
            case D3AxisType.Time:
                return [values[0].timestamp, values[values.length - 1].timestamp];
            default:
                return [values[0].tick, values[values.length - 1].tick];
        }
    }
    /**
     * @return {?}
     */
    getXAxisLabel() {
        switch (this.presenterOptions.axisType) {
            case D3AxisType.Distance:
                return 'Distance';
            case D3AxisType.Time:
                return 'Time';
            default:
                return 'Ticks';
        }
    }
}
D3TrajectoryGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-d3-trajectory-graph',
                template: `<div class="d3" #dthree></div>`,
                styles: [`.d3{height:100%}.d3 .axis line,.d3 .axis path{fill:none;stroke:#000}.d3 text{font-size:14px}.d3 .graphArea{fill:#b0c4de;fill-opacity:.7}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .map-highlight-label{fill:#fff;fill-opacity:.7}.d3 .mouse-focus-line{pointer-events:none;stroke-width:1px;stroke:#000}.d3 .mouse-drag{fill:rgba(0,0,255,.4);pointer-events:all;cursor:move}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
D3TrajectoryGraphComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: Time },
    { type: TranslateService }
];
D3TrajectoryGraphComponent.propDecorators = {
    selection: [{ type: Input }],
    onSelectionChangedFinished: [{ type: Output }],
    onSelectionChanged: [{ type: Output }],
    onHoverHighlight: [{ type: Output }],
    d3Elem: [{ type: ViewChild, args: ['dthree',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsZUFBZSxFQUVmLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxtQkFBbUIsRUFFbkIseUJBQXlCLEVBRXpCLGlCQUFpQixFQUVqQixJQUFJLEdBQ1AsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQW1CLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUNILElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBQ1AsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sSUFBSSxFQUNKLEtBQUssRUFFTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsR0FDYixNQUFNLElBQUksQ0FBQztBQUNaLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDL0QsTUFBTSxpQ0FDRixTQUFRLHlCQUF5RDs7Ozs7Ozs7SUFzRGpFLFlBQ2MsZUFBZ0MsRUFDaEMsR0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLFFBQWMsRUFDZCxnQkFBa0M7UUFFNUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVB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QUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2FBQzlCLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUV2QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDdEYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQzFEOztRQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQzthQUNqRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFHdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENB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TUFBTTtxQkFHTixTQUFTLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRPcHRpb25zLFxuICAgIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gICAgSURhdGFzZXQsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgTG9jYXRlZFRpbWVWYWx1ZUVudHJ5LFxuICAgIFRpbWUsXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7XG4gICAgYXJlYSxcbiAgICBheGlzQm90dG9tLFxuICAgIGF4aXNMZWZ0LFxuICAgIGF4aXNSaWdodCxcbiAgICBheGlzVG9wLFxuICAgIGJpc2VjdG9yLFxuICAgIGN1cnZlTGluZWFyLFxuICAgIGV4dGVudCxcbiAgICBsaW5lLFxuICAgIG1vdXNlLFxuICAgIFNjYWxlTGluZWFyLFxuICAgIHNjYWxlTGluZWFyLFxuICAgIHNlbGVjdCxcbiAgICB0aW1lRm9ybWF0LFxufSBmcm9tICdkMyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IEQzQXhpc1R5cGUgfSBmcm9tICcuLi9tb2RlbC9kMy1heGlzLXR5cGUnO1xuaW1wb3J0IHsgRDNHcmFwaE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9kMy1ncmFwaC1vcHRpb25zJztcbmltcG9ydCB7IEQzU2VsZWN0aW9uUmFuZ2UgfSBmcm9tICcuLi9tb2RlbC9kMy1zZWxlY3Rpb24tcmFuZ2UnO1xuXG5pbnRlcmZhY2UgRGF0YUVudHJ5IGV4dGVuZHMgTG9jYXRlZFRpbWVWYWx1ZUVudHJ5IHtcbiAgICBkaXN0OiBudW1iZXI7XG4gICAgdGljazogbnVtYmVyO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgeERpYWdDb29yZD86IG51bWJlcjtcbiAgICBbaWQ6IHN0cmluZ106IGFueTtcbn1cblxuaW50ZXJmYWNlIERhdGFzZXRDb25zdGVsbGF0aW9uIHtcbiAgICBkYXRhc2V0PzogSURhdGFzZXQ7XG4gICAgZGF0YT86IExvY2F0ZWRUaW1lVmFsdWVFbnRyeVtdO1xuICAgIHlTY2FsZT86IFNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjtcbiAgICBkcmF3T3B0aW9ucz86IERyYXdPcHRpb25zO1xuICAgIGZvY3VzTGFiZWxSZWN0PzogYW55O1xuICAgIGZvY3VzTGFiZWw/OiBhbnk7XG59XG5cbmludGVyZmFjZSBEcmF3T3B0aW9ucyB7XG4gICAgdW9tOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGZpcnN0OiBib29sZWFuO1xuICAgIG9mZnNldDogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy10cmFqZWN0b3J5LWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkM1wiICNkdGhyZWU+PC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgLmQze2hlaWdodDoxMDAlfS5kMyAuYXhpcyBsaW5lLC5kMyAuYXhpcyBwYXRoe2ZpbGw6bm9uZTtzdHJva2U6IzAwMH0uZDMgdGV4dHtmb250LXNpemU6MTRweH0uZDMgLmdyYXBoQXJlYXtmaWxsOiNiMGM0ZGU7ZmlsbC1vcGFjaXR5Oi43fS5kMyAuZ3JpZCAudGljayBsaW5le3N0cm9rZTojZDNkM2QzO3N0cm9rZS1vcGFjaXR5Oi43O3NoYXBlLXJlbmRlcmluZzpjcmlzcEVkZ2VzfS5kMyAubWFwLWhpZ2hsaWdodC1sYWJlbHtmaWxsOiNmZmY7ZmlsbC1vcGFjaXR5Oi43fS5kMyAubW91c2UtZm9jdXMtbGluZXtwb2ludGVyLWV2ZW50czpub25lO3N0cm9rZS13aWR0aDoxcHg7c3Ryb2tlOiMwMDB9LmQzIC5tb3VzZS1kcmFne2ZpbGw6cmdiYSgwLDAsMjU1LC40KTtwb2ludGVyLWV2ZW50czphbGw7Y3Vyc29yOm1vdmV9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBEM1RyYWplY3RvcnlHcmFwaENvbXBvbmVudFxuICAgIGV4dGVuZHMgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudDxEYXRhc2V0T3B0aW9ucywgRDNHcmFwaE9wdGlvbnM+XG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBEM1NlbGVjdGlvblJhbmdlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0aW9uQ2hhbmdlZEZpbmlzaGVkOiBFdmVudEVtaXR0ZXI8RDNTZWxlY3Rpb25SYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8RDNTZWxlY3Rpb25SYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Ib3ZlckhpZ2hsaWdodDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdkdGhyZWUnKVxuICAgIHB1YmxpYyBkM0VsZW06IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIGRhdGFzZXRNYXA6IE1hcDxzdHJpbmcsIERhdGFzZXRDb25zdGVsbGF0aW9uPiA9IG5ldyBNYXAoKTtcbiAgICBwcml2YXRlIHJhd1N2ZzogYW55O1xuICAgIHByaXZhdGUgZ3JhcGg6IGFueTtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIG1hcmdpbiA9IHtcbiAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgcmlnaHQ6IDEwLFxuICAgICAgICBib3R0b206IDQwLFxuICAgICAgICBsZWZ0OiA0MFxuICAgIH07XG4gICAgcHJpdmF0ZSBtYXhMYWJlbHdpZHRoID0gMDtcbiAgICBwcml2YXRlIGxpbmVGdW46IGQzLkxpbmU8RGF0YUVudHJ5PjtcbiAgICBwcml2YXRlIGFyZWE6IGQzLkFyZWE8RGF0YUVudHJ5PjtcbiAgICBwcml2YXRlIHhTY2FsZUJhc2U6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjtcbiAgICBwcml2YXRlIHlTY2FsZUJhc2U6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjtcbiAgICBwcml2YXRlIGJhY2tncm91bmQ6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzRzogYW55O1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0Rm9jdXM6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzbGFiZWxUaW1lOiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c2xhYmVsWTogYW55O1xuICAgIHByaXZhdGUgeUF4aXNHZW46IGQzLkF4aXM8bnVtYmVyIHwgeyB2YWx1ZU9mKCk6IG51bWJlcjsgfT47XG4gICAgcHJpdmF0ZSBiYXNlVmFsdWVzOiBEYXRhRW50cnlbXSA9IFtdO1xuICAgIHByaXZhdGUgZHJhZ2dpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkcmFnU3RhcnQ6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBkcmFnQ3VycmVudDogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIGRyYWdSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBkcmFnUmVjdEc6IGFueTtcbiAgICBwcml2YXRlIGJ1ZmZlclN1bTogbnVtYmVyO1xuICAgIHByaXZhdGUgZGF0YUxlbmd0aDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0R3JhcGhPcHRpb25zOiBEM0dyYXBoT3B0aW9ucyA9IHtcbiAgICAgICAgYXhpc1R5cGU6IEQzQXhpc1R5cGUuRGlzdGFuY2UsXG4gICAgICAgIGRvdHRlZDogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5wcmVzZW50ZXJPcHRpb25zID0gdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICBpZiAoY2hhbmdlcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0FsbERhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0xpbmVHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYXdTdmcgPSBzZWxlY3QodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCAnMTAwJScpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcblxuICAgICAgICB0aGlzLmdyYXBoID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5saW5lRnVuID0gbGluZTxEYXRhRW50cnk+KClcbiAgICAgICAgICAgIC54KHRoaXMuY2FsY1hWYWx1ZSlcbiAgICAgICAgICAgIC55KHRoaXMuY2FsY1lWYWx1ZSlcbiAgICAgICAgICAgIC5jdXJ2ZShjdXJ2ZUxpbmVhcik7XG5cbiAgICAgICAgdGhpcy5hcmVhID0gYXJlYTxEYXRhRW50cnk+KClcbiAgICAgICAgICAgIC54KHRoaXMuY2FsY1hWYWx1ZSlcbiAgICAgICAgICAgIC55MCh0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC55MSh0aGlzLmNhbGNZVmFsdWUpXG4gICAgICAgICAgICAuY3VydmUoY3VydmVMaW5lYXIpO1xuXG4gICAgICAgIHRoaXMuZHJhd0xpbmVHcmFwaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxvYWREYXRhRm9yRGF0YXNldHMoZGF0YXNldElkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlbG9hZCBkYXRhIGF0ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHsgfVxuXG4gICAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKGVudHJ5LmRhdGFzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRGF0YXNldChpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KGlkLCB1cmwpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0TWFwLnNldChkYXRhc2V0LmludGVybmFsSWQsIHsgZGF0YXNldCB9KTtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICB0aGlzLnByb2Nlc3NBbGxEYXRhKCk7XG4gICAgICAgIHRoaXMuZHJhd0xpbmVHcmFwaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogRDNHcmFwaE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWxDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRhdGFzZXRPcHRpb25zQ2hhbmdlZChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zLCBmaXJzdENoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlICYmIHRoaXMuZGF0YXNldE1hcC5oYXMoaW50ZXJuYWxJZCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKS5kYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRGF0YShkYXRhc2V0OiBJRGF0YXNldCkge1xuICAgICAgICBpZiAodGhpcy50aW1lc3BhbiAmJlxuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5oYXMoZGF0YXNldC5pbnRlcm5hbElkKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGhpcy50aW1lc3BhbiwgMC4yKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhPExvY2F0ZWRUaW1lVmFsdWVFbnRyeT4oZGF0YXNldC5pZCwgZGF0YXNldC51cmwsIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYWxpemU6IG9wdGlvbi5nZW5lcmFsaXplXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhTGVuZ3RoID0gcmVzdWx0LnZhbHVlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldE1hcC5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS5kYXRhID0gcmVzdWx0LnZhbHVlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YUZvcklkKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0xpbmVHcmFwaCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NBbGxEYXRhKCkge1xuICAgICAgICB0aGlzLmJhc2VWYWx1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhc2V0SWRzLmZvckVhY2goKGlkKSA9PiB0aGlzLnByb2Nlc3NEYXRhRm9ySWQoaWQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NEYXRhRm9ySWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpbnRlcm5hbElkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0RW50cnkgPSB0aGlzLmRhdGFzZXRNYXAuZ2V0KGludGVybmFsSWQpO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RFbnRyeSA9IHRoaXMuYmFzZVZhbHVlcy5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXM6IERhdGFFbnRyeSA9IG51bGw7XG4gICAgICAgICAgICBkYXRhc2V0RW50cnkuZGF0YS5mb3JFYWNoKChlbGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuY3JlYXRlRGF0YUVudHJ5KGludGVybmFsSWQsIGVsZW0sIHByZXZpb3VzLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPj0gdGhpcy5zZWxlY3Rpb24uZnJvbSAmJiBpZHggPD0gdGhpcy5zZWxlY3Rpb24udG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBlbnRyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPj0gdGhpcy5zZWxlY3Rpb24uZnJvbSAmJiBpZHggPD0gdGhpcy5zZWxlY3Rpb24udG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iYXNlVmFsdWVzW2lkeCAtIHRoaXMuc2VsZWN0aW9uLmZyb21dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlc1tpZHggLSB0aGlzLnNlbGVjdGlvbi5mcm9tXVtpbnRlcm5hbElkXSA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFzZVZhbHVlc1tpZHhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVzW2lkeF1baW50ZXJuYWxJZF0gPSBlbGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZURhdGFFbnRyeShcbiAgICAgICAgaW50ZXJuYWxJZDogc3RyaW5nLFxuICAgICAgICBlbnRyeTogTG9jYXRlZFRpbWVWYWx1ZUVudHJ5LFxuICAgICAgICBwcmV2aW91czogRGF0YUVudHJ5LFxuICAgICAgICBpbmRleDogbnVtYmVyXG4gICAgKTogRGF0YUVudHJ5IHtcbiAgICAgICAgbGV0IGRpc3Q6IG51bWJlcjtcbiAgICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdkaXN0ID0gdGhpcy5kaXN0YW5jZUJldHdlZW4oXG4gICAgICAgICAgICAgICAgZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgICAgICAgZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0sXG4gICAgICAgICAgICAgICAgcHJldmlvdXMuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgICAgICAgcHJldmlvdXMuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkaXN0ID0gcHJldmlvdXMuZGlzdCArIE1hdGgucm91bmQobmV3ZGlzdCAvIDEwMDAgKiAxMDAwMDApIC8gMTAwMDAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzdCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpY2s6IGluZGV4LFxuICAgICAgICAgICAgZGlzdDogTWF0aC5yb3VuZChkaXN0ICogMTApIC8gMTAsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IGVudHJ5LnRpbWVzdGFtcCxcbiAgICAgICAgICAgIHZhbHVlOiBlbnRyeS52YWx1ZSxcbiAgICAgICAgICAgIFtpbnRlcm5hbElkXTogZW50cnkudmFsdWUsXG4gICAgICAgICAgICB4OiBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIHk6IGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLFxuICAgICAgICAgICAgZ2VvbWV0cnk6IGVudHJ5Lmdlb21ldHJ5XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXN0YW5jZUJldHdlZW4obGF0aXR1ZGUxLCBsb25naXR1ZGUxLCBsYXRpdHVkZTIsIGxvbmdpdHVkZTIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBSID0gNjM3MTAwMDtcbiAgICAgICAgY29uc3QgcmFkID0gTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgY29uc3QgbGF0MSA9IGxhdGl0dWRlMSAqIHJhZDtcbiAgICAgICAgY29uc3QgbGF0MiA9IGxhdGl0dWRlMiAqIHJhZDtcbiAgICAgICAgY29uc3Qgc2luRExhdCA9IE1hdGguc2luKChsYXRpdHVkZTIgLSBsYXRpdHVkZTEpICogcmFkIC8gMik7XG4gICAgICAgIGNvbnN0IHNpbkRMb24gPSBNYXRoLnNpbigobG9uZ2l0dWRlMiAtIGxvbmdpdHVkZTEpICogcmFkIC8gMik7XG4gICAgICAgIGNvbnN0IGEgPSBzaW5ETGF0ICogc2luRExhdCArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBzaW5ETG9uICogc2luRExvbjtcbiAgICAgICAgY29uc3QgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gICAgICAgIHJldHVybiBSICogYztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNZVmFsdWUgPSAoZDogRGF0YUVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnlTY2FsZUJhc2UoZC52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjWFZhbHVlID0gKGQ6IERhdGFFbnRyeSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHhEaWFnQ29vcmQgPSB0aGlzLnhTY2FsZUJhc2UodGhpcy5nZXRYVmFsdWUoZCkpO1xuICAgICAgICBkLnhEaWFnQ29vcmQgPSB4RGlhZ0Nvb3JkO1xuICAgICAgICByZXR1cm4geERpYWdDb29yZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLmhlaWdodC5iYXNlVmFsLnZhbHVlIC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3U3ZnLm5vZGUoKS53aWR0aC5iYXNlVmFsLnZhbHVlIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0IC0gdGhpcy5tYXhMYWJlbHdpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0WFZhbHVlKGRhdGE6IERhdGFFbnRyeSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLkRpc3RhbmNlOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmRpc3Q7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aW1lc3RhbXA7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGlja3M6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudGljaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudGljaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0RvdHModmFsdWVzOiBEYXRhRW50cnlbXSwgeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCdkb3QnKVxuICAgICAgICAgICAgLmRhdGEodmFsdWVzKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cigncicsIDEuNSlcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIHRoaXMuY2FsY1hWYWx1ZSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIChkOiBEYXRhRW50cnkpID0+IHlTY2FsZShkW29wdGlvbnMuaWRdKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3VmFsdWVMaW5lKHZhbHVlczogRGF0YUVudHJ5W10sIHlTY2FsZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+LCBvcHRpb25zOiBEcmF3T3B0aW9ucykge1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgLmRhdHVtKHZhbHVlcylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZTxEYXRhRW50cnk+KClcbiAgICAgICAgICAgICAgICAueCh0aGlzLmNhbGNYVmFsdWUpXG4gICAgICAgICAgICAgICAgLnkoKGQ6IERhdGFFbnRyeSkgPT4geVNjYWxlKGRbb3B0aW9ucy5pZF0pKVxuICAgICAgICAgICAgICAgIC5jdXJ2ZShjdXJ2ZUxpbmVhcikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0dyYXBoKHlTY2FsZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+LCBvcHRpb25zOiBEcmF3T3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmRvdHRlZCkge1xuICAgICAgICAgICAgdGhpcy5kcmF3RG90cyh0aGlzLmJhc2VWYWx1ZXMsIHlTY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdWYWx1ZUxpbmUodGhpcy5iYXNlVmFsdWVzLCB5U2NhbGUsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3TGluZUdyYXBoKCkge1xuICAgICAgICBpZiAoIXRoaXMuYmFzZVZhbHVlcyB8fCB0aGlzLmJhc2VWYWx1ZXMubGVuZ3RoID09PSAwIHx8ICF0aGlzLmdyYXBoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5ncmFwaC5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcblxuICAgICAgICB0aGlzLmJ1ZmZlclN1bSA9IDA7XG5cbiAgICAgICAgdGhpcy55U2NhbGVCYXNlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZGF0YXNldEVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuaGFzKGlkKSAmJiBkYXRhc2V0RW50cnkuZGF0YSAmJiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGRhdGFzZXRFbnRyeS5kcmF3T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdW9tOiBkYXRhc2V0RW50cnkuZGF0YXNldC51b20sXG4gICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhc2V0RW50cnkuZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy55U2NhbGVCYXNlID09PSBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMuYnVmZmVyU3VtXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBheGlzUmVzdWx0ID0gdGhpcy5kcmF3WUF4aXMoZGF0YXNldEVudHJ5LmRyYXdPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlQmFzZSA9IGF4aXNSZXN1bHQueVNjYWxlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyU3VtID0gYXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGFzZXRFbnRyeS55U2NhbGUgPSBheGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnlTY2FsZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgcmlnaHQgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMud2lkdGggKyAnLCAwKScpXG4gICAgICAgICAgICAuY2FsbChheGlzUmlnaHQodGhpcy55U2NhbGVCYXNlKS50aWNrU2l6ZSgwKS50aWNrcygwKSk7XG5cbiAgICAgICAgdGhpcy5kcmF3WEF4aXModGhpcy5idWZmZXJTdW0pO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChlbnRyeSwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhpZCkgJiYgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLnZpc2libGUgJiYgZW50cnkuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0dyYXBoKGVudHJ5LnlTY2FsZSwgZW50cnkuZHJhd09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5idWZmZXJTdW0gKyAnLCAwKScpXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZS5mb2N1cycsIHRoaXMubW91c2Vtb3ZlSGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQuZm9jdXMnLCB0aGlzLm1vdXNlb3V0SGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2Vkb3duLmRyYWcnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZS5kcmFnJywgdGhpcy5kcmFnSGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2V1cC5kcmFnJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XG5cbiAgICAgICAgdGhpcy5mb2N1c0cgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodEZvY3VzID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6bGluZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGluZScpXG4gICAgICAgICAgICAuYXR0cigneDInLCAnMCcpXG4gICAgICAgICAgICAuYXR0cigneTInLCAnMCcpXG4gICAgICAgICAgICAuYXR0cigneDEnLCAnMCcpXG4gICAgICAgICAgICAuYXR0cigneTEnLCAnMCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsICcxcHgnKTtcblxuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZW50cnksIGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5oYXMoaWQpICYmIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlICYmIGVudHJ5LmRhdGEpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKS5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbC14JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgJ2xpZ2h0ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsVGltZSA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbC14Jyk7XG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFkgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwteScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbW91c2Vtb3ZlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmJhc2VWYWx1ZXMgfHwgdGhpcy5iYXNlVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IG1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmdldEl0ZW1Gb3JYKGNvb3Jkc1swXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICB0aGlzLnNob3dEaWFncmFtSW5kaWNhdG9yKGlkeCk7XG4gICAgICAgIHRoaXMub25Ib3ZlckhpZ2hsaWdodC5lbWl0KHRoaXMuYmFzZVZhbHVlc1tpZHhdLnRpY2spO1xuICAgIH1cblxuICAgIHByaXZhdGUgbW91c2VvdXRIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhpZGVEaWFncmFtSW5kaWNhdG9yKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnU3RhcnRIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gbW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhd0RyYWdSZWN0YW5nbGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdFbmRIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0IHx8ICF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZEZpbmlzaGVkLmVtaXQoeyBmcm9tOiAwLCB0bzogdGhpcy5kYXRhTGVuZ3RoIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuZ2V0SXRlbUZvclgodGhpcy5kcmFnU3RhcnRbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdDdXJyZW50WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZEZpbmlzaGVkLmVtaXQodGhpcy5wcmVwYXJlUmFuZ2UodGhpcy5iYXNlVmFsdWVzW2Zyb21dLnRpY2ssIHRoaXMuYmFzZVZhbHVlc1t0b10udGljaykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc2V0RHJhZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IEQzU2VsZWN0aW9uUmFuZ2Uge1xuICAgICAgICBpZiAoZnJvbSA8PSB0bykge1xuICAgICAgICAgICAgcmV0dXJuIHsgZnJvbSwgdG8gfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBmcm9tOiB0bywgdG86IGZyb20gfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdEcmFnUmVjdGFuZ2xlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZHJhZ0N1cnJlbnQgPSBtb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcblxuICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdTdGFydFswXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICBjb25zdCB0byA9IHRoaXMuZ2V0SXRlbUZvclgodGhpcy5kcmFnQ3VycmVudFswXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHRoaXMucHJlcGFyZVJhbmdlKHRoaXMuYmFzZVZhbHVlc1tmcm9tXS50aWNrLCB0aGlzLmJhc2VWYWx1ZXNbdG9dLnRpY2spKTtcblxuICAgICAgICBjb25zdCB4MSA9IE1hdGgubWluKHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcbiAgICAgICAgY29uc3QgeDIgPSBNYXRoLm1heCh0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRyYWdSZWN0ICYmICF0aGlzLmRyYWdSZWN0Rykge1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0RyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QgPSB0aGlzLmRyYWdSZWN0Ry5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHgyIC0geDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgeDEgKyB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZHJhZycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0LmF0dHIoJ3dpZHRoJywgeDIgLSB4MSlcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHgxICsgdGhpcy5idWZmZXJTdW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldERyYWcoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdSZWN0Rykge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0RyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZURpYWdyYW1JbmRpY2F0b3IoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0RpYWdyYW1JbmRpY2F0b3IgPSAoaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYmFzZVZhbHVlc1tpZHhdO1xuICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMuYXR0cigneDEnLCBpdGVtLnhEaWFnQ29vcmQpXG4gICAgICAgICAgICAuYXR0cigneTEnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgaXRlbS54RGlhZ0Nvb3JkKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xuXG4gICAgICAgIGxldCBvbkxlZnRTaWRlID0gZmFsc2U7XG4gICAgICAgIGlmICgodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bSkgLyAyID4gaXRlbS54RGlhZ0Nvb3JkKSB7IG9uTGVmdFNpZGUgPSB0cnVlOyB9XG5cbiAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoaXRlbSwgb25MZWZ0U2lkZSk7XG4gICAgICAgIHRoaXMuc2hvd1RpbWVJbmRpY2F0b3JMYWJlbChpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICAgICAgdGhpcy5zaG93Qm90dG9tSW5kaWNhdG9yTGFiZWwoaXRlbSwgb25MZWZ0U2lkZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TGFiZWxWYWx1ZXMoaXRlbTogRGF0YUVudHJ5LCBvbkxlZnRTaWRlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChlbnRyeSwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5mb2N1c0xhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWwudGV4dChpdGVtW2lkXSArIChlbnRyeS5kYXRhc2V0LnVvbSA/IGVudHJ5LmRhdGFzZXQudW9tIDogJycpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cnlYID0gb25MZWZ0U2lkZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnhEaWFnQ29vcmQgKyAyIDogaXRlbS54RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS53O1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgZW50cnkueVNjYWxlKGl0ZW1baWRdKSArIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkuaCAtIDMpO1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeVgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIGVudHJ5LnlTY2FsZShpdGVtW2lkXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLncpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS5oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1RpbWVJbmRpY2F0b3JMYWJlbChpdGVtOiBEYXRhRW50cnksIG9uTGVmdFNpZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsVGltZS50ZXh0KG1vbWVudChpdGVtLnRpbWVzdGFtcCkuZm9ybWF0KCdERC5NTS5ZWSBISDptbScpKTtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsVGltZVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBvbkxlZnRTaWRlID8gaXRlbS54RGlhZ0Nvb3JkICsgMiA6IGl0ZW0ueERpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyh0aGlzLmZvY3VzbGFiZWxUaW1lLm5vZGUoKSkudylcbiAgICAgICAgICAgIC5hdHRyKCd5JywgMTMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0JvdHRvbUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgb25MZWZ0U2lkZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlID09PSBEM0F4aXNUeXBlLkRpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzbGFiZWxZLnRleHQoaXRlbS5kaXN0ICsgJyBrbScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuVGlja3MpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNsYWJlbFkudGV4dCgnTWVhc3VyZW1lbnQ6ICcgKyBpdGVtLnRpY2spO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9jdXNsYWJlbFlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5jYWxjdWxhdGVIZWlnaHQoKSAtIDUpXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyBpdGVtLnhEaWFnQ29vcmQgKyAyIDogaXRlbS54RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuZm9jdXNsYWJlbFkubm9kZSgpKS53KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpbWVuc2lvbnMoZWw6IGFueSkge1xuICAgICAgICBsZXQgdyA9IDA7XG4gICAgICAgIGxldCBoID0gMDtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZWwuZ2V0QkJveCgpO1xuICAgICAgICAgICAgdyA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICBoID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6IGdldERpbWVuc2lvbnMoKSAnICsgZWwgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdyxcbiAgICAgICAgICAgIGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEl0ZW1Gb3JYKHg6IG51bWJlciwgZGF0YTogRGF0YUVudHJ5W10pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnhTY2FsZUJhc2UuaW52ZXJ0KHgpO1xuICAgICAgICBjb25zdCBiaXNlY3REYXRlID0gYmlzZWN0b3IoKGQ6IERhdGFFbnRyeSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmRpc3Q7XG4gICAgICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpbWU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGlja3M6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGljaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkubGVmdDtcbiAgICAgICAgcmV0dXJuIGJpc2VjdERhdGUodGhpcy5iYXNlVmFsdWVzLCBpbmRleCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3WUF4aXMob3B0aW9uczogRHJhd09wdGlvbnMpOiBhbnkge1xuICAgICAgICBjb25zdCByYW5nZSA9IGV4dGVudDxEYXRhRW50cnksIG51bWJlcj4odGhpcy5iYXNlVmFsdWVzLCAoZGF0dW0sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRhdHVtW29wdGlvbnMuaWRdOyAvLyBoZXJlIHdpdGggSURcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJhbmdlT2Zmc2V0ID0gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pICogMC4xMDtcbiAgICAgICAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbcmFuZ2VbMF0gLSByYW5nZU9mZnNldCwgcmFuZ2VbMV0gKyByYW5nZU9mZnNldF0pXG4gICAgICAgICAgICAucmFuZ2UoW3RoaXMuaGVpZ2h0LCAwXSk7XG5cbiAgICAgICAgdGhpcy55QXhpc0dlbiA9IGF4aXNMZWZ0KHlTY2FsZSkudGlja3MoNSk7XG5cbiAgICAgICAgLy8gZHJhdyB5IGF4aXNcbiAgICAgICAgY29uc3QgYXhpcyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKHRoaXMueUF4aXNHZW4pO1xuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzIGxhYmVsXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtOTApJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsICcxZW0nKVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC50ZXh0KG9wdGlvbnMudW9tKTtcblxuICAgICAgICBjb25zdCBheGlzV2lkdGggPSBheGlzLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyA1ICsgdGhpcy5nZXREaW1lbnNpb25zKHRleHQubm9kZSgpKS5oO1xuICAgICAgICBjb25zdCBidWZmZXIgPSBvcHRpb25zLm9mZnNldCArIChheGlzV2lkdGggPCAzMCA/IDMwIDogYXhpc1dpZHRoKTtcbiAgICAgICAgaWYgKCFvcHRpb25zLmZpcnN0KSB7XG4gICAgICAgICAgICBheGlzLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGJ1ZmZlciArICcsIDApJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZXh0T2Zmc2V0ID0gIW9wdGlvbnMuZmlyc3QgPyBidWZmZXIgOiBvcHRpb25zLm9mZnNldDtcbiAgICAgICAgdGV4dC5hdHRyKCd5JywgMCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1heExhYmVsd2lkdGggKyB0ZXh0T2Zmc2V0KVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAwIC0gKHRoaXMuaGVpZ2h0IC8gMikpO1xuXG4gICAgICAgIC8vIGRyYXcgdGhlIHkgZ3JpZCBsaW5lcyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIGRhdGFzZXRcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldElkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgICAgIC5jYWxsKGF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tzKDUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy53aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgICB5U2NhbGVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdYQXhpcyhidWZmZXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLnhTY2FsZUJhc2UgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKHRoaXMuZ2V0WERvbWFpbih0aGlzLmJhc2VWYWx1ZXMpKVxuICAgICAgICAgICAgLnJhbmdlKFtidWZmZXIsIHRoaXMud2lkdGhdKTtcblxuICAgICAgICBjb25zdCB4QXhpc0dlbiA9IGF4aXNCb3R0b20odGhpcy54U2NhbGVCYXNlKS50aWNrcyg1KTtcblxuICAgICAgICBpZiAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlID09PSBEM0F4aXNUeXBlLlRpbWUpIHtcbiAgICAgICAgICAgIHhBeGlzR2VuLnRpY2tGb3JtYXQoKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZUZvcm1hdCgnJWQuJW0uJVkgJUg6JU06JVMnKShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IHggYXhpc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzR2VuKTtcblxuICAgICAgICAvLyBkcmF3IHRoZSB4IGdyaWQgbGluZXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHRoaXMuaGVpZ2h0ICsgJyknKVxuICAgICAgICAgICAgLmNhbGwoYXhpc0JvdHRvbSh0aGlzLnhTY2FsZUJhc2UpXG4gICAgICAgICAgICAgICAgLnRpY2tzKDEwKVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoYXhpc1RvcCh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDApLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyB0ZXh0IGxhYmVsIGZvciB0aGUgeCBheGlzXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKHRoaXMud2lkdGggKyBidWZmZXIpIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi5ib3R0b20gLSA1KVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLnRleHQodGhpcy5nZXRYQXhpc0xhYmVsKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0WERvbWFpbih2YWx1ZXM6IERhdGFFbnRyeVtdKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZXNbMF0uZGlzdCwgdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXS5kaXN0XTtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaW1lOlxuICAgICAgICAgICAgICAgIHJldHVybiBbdmFsdWVzWzBdLnRpbWVzdGFtcCwgdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXS50aW1lc3RhbXBdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3ZhbHVlc1swXS50aWNrLCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLnRpY2tdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYQXhpc0xhYmVsKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLkRpc3RhbmNlOlxuICAgICAgICAgICAgICAgIHJldHVybiAnRGlzdGFuY2UnO1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpbWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdUaW1lJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdUaWNrcyc7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==