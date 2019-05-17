/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class D3TimeseriesGraphComponent extends DatasetPresenterComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} api
     * @param {?} datasetIdResolver
     * @param {?} timeSrvc
     * @param {?} timeFormatLocaleService
     * @param {?} colorService
     * @param {?} translateService
     */
    constructor(iterableDiffers, api, datasetIdResolver, timeSrvc, timeFormatLocaleService, colorService, translateService) {
        super(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService);
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.timeFormatLocaleService = timeFormatLocaleService;
        this.colorService = colorService;
        this.translateService = translateService;
        this.onHighlightChanged = new EventEmitter();
        this.onClickDataPoint = new EventEmitter();
        // data types
        this.preparedData = [];
        this.datasetMap = new Map();
        this.listOfUoms = [];
        this.yRangesEachUom = [];
        this.dataYranges = [];
        this.xAxisRangeOrigin = [];
        this.listOfSeparation = Array();
        this.margin = {
            top: 10,
            right: 10,
            bottom: 40,
            left: 40
        };
        this.maxLabelwidth = 0;
        this.opac = {
            default: 0,
            hover: 0.3,
            click: 0.5
        };
        this.addLineWidth = 2;
        this.loadingCounter = 0;
        this.plotOptions = {
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
        this.mousemoveHandler = () => {
            /** @type {?} */
            const coords = d3.mouse(this.background.node());
            this.labelTimestamp = [];
            this.labelXCoord = [];
            this.distLabelXCoord = [];
            this.preparedData.forEach((entry, entryIdx) => {
                /** @type {?} */
                const idx = this.getItemForX(coords[0] + this.bufferSum, entry.data);
                this.showDiagramIndicator(entry, idx, coords[0], entryIdx);
            });
            /** @type {?} */
            let outputIds = [];
            for (const key in this.highlightOutput.ids) {
                if (this.highlightOutput.ids.hasOwnProperty(key)) {
                    outputIds.push(key);
                }
            }
            if (outputIds.length <= 0) {
                // do not show line in graph when no data available for timestamp
                this.focusG.style('visibility', 'hidden');
            }
            else {
                /** @type {?} */
                let last = 0;
                /** @type {?} */
                let visible = false;
                /** @type {?} */
                let first = true;
                /** @type {?} */
                let labelArray = [];
                /** @type {?} */
                let textRectArray = d3.selectAll('.focus-visibility').nodes();
                // get and sort all text labels and rectangle of the text labels and combine related
                for (let i = 0; i < textRectArray.length; i += 2) {
                    labelArray.push([textRectArray[i], textRectArray[i + 1]]);
                }
                // sory by y coordinate
                labelArray.sort((a, b) => parseFloat(d3.select(a[0]).attr('y')) - parseFloat(d3.select(b[0]).attr('y')));
                // translate if overlapping
                labelArray.forEach((el) => {
                    // pairs of 2 objects (rectangle (equal) and label (odd))
                    d3.select(el[0])
                        .attr('transform', (d, i, f) => {
                        if (d3.select(el[0]).attr('visibility') !== 'hidden') {
                            visible = true;
                            /** @type {?} */
                            let ycoord = parseFloat(d3.select(el[0]).attr('y'));
                            /** @type {?} */
                            let offset = 0;
                            if (!first) {
                                offset = Math.max(0, (last + 30) - ycoord);
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
                        .attr('transform', (d, i, f) => {
                        if (d3.select(el[1]).attr('visibility') !== 'hidden') {
                            visible = true;
                            /** @type {?} */
                            let ycoord = parseFloat(d3.select(el[0]).attr('y'));
                            /** @type {?} */
                            let offset = 0;
                            if (!first) {
                                offset = Math.max(0, (last + 30) - ycoord);
                                if (offset < 10) {
                                    offset = 10;
                                }
                            }
                            last = offset + ycoord;
                            if (offset > 0) {
                                return 'translate(0, ' + offset + ')';
                            }
                        }
                        return 'translate(0, 0)';
                    });
                    if (visible) {
                        first = false;
                    }
                });
            }
            this.onHighlightChanged.emit(this.highlightOutput);
        };
        /**
         * Function that hides the labeling inside the graph.
         */
        this.mouseoutHandler = () => {
            this.hideDiagramIndicator();
        };
        /**
         * Function starting the drag handling for the diagram.
         */
        this.panStartHandler = () => {
            this.draggingMove = false;
            this.dragMoveStart = d3.event.x;
            this.dragMoveRange = [this.xAxisRange.from, this.xAxisRange.to];
        };
        /**
         * Function that controlls the panning (dragging) of the graph.
         */
        this.panMoveHandler = () => {
            this.draggingMove = true;
            if (this.dragMoveStart && this.draggingMove) {
                /** @type {?} */
                let diff = -(d3.event.x - this.dragMoveStart);
                /** @type {?} */
                let amountTimestamp = this.dragMoveRange[1] - this.dragMoveRange[0];
                /** @type {?} */
                let ratioTimestampDiagCoord = amountTimestamp / this.width;
                /** @type {?} */
                let newTimeMin = this.dragMoveRange[0] + (ratioTimestampDiagCoord * diff);
                /** @type {?} */
                let newTimeMax = this.dragMoveRange[1] + (ratioTimestampDiagCoord * diff);
                this.xAxisRangePan = [newTimeMin, newTimeMax];
                this.timespan = { from: this.xAxisRangePan[0], to: this.xAxisRangePan[1] };
                this.plotGraph();
            }
        };
        /**
         * Function that ends the dragging control.
         */
        this.panEndHandler = () => {
            if (this.xAxisRangePan) {
                this.changeTime(this.xAxisRangePan[0], this.xAxisRangePan[1]);
                this.plotGraph();
                this.dragMoveStart = null;
                this.draggingMove = false;
                this.xAxisRangePan = null;
            }
        };
        /**
         * Function that starts the zoom handling.
         */
        this.zoomStartHandler = () => {
            this.dragging = false;
            // dependent on point or line hovering
            this.dragStart = d3.mouse(this.background.node());
            this.xAxisRangeOrigin.push([this.xAxisRange.from, this.xAxisRange.to]);
        };
        /**
         * Function that draws a rectangle when zoom is started and the mouse is moving.
         */
        this.zoomHandler = () => {
            this.dragging = true;
            this.drawDragRectangle();
        };
        /**
         * Function that ends the zoom handling and calculates the via zoom selected time interval.
         */
        this.zoomEndHandler = () => {
            if (!this.dragStart || !this.dragging) {
                if (this.xAxisRangeOrigin[0]) {
                    // back to origin range (from - to)
                    this.changeTime(this.xAxisRangeOrigin[0][0], this.xAxisRangeOrigin[0][1]);
                    this.xAxisRangeOrigin = [];
                    this.plotGraph();
                }
            }
            else {
                /** @type {?} */
                let xDomainRange;
                if (this.dragStart[0] <= this.dragCurrent[0]) {
                    xDomainRange = this.getxDomain(this.dragStart[0], this.dragCurrent[0]);
                }
                else {
                    xDomainRange = this.getxDomain(this.dragCurrent[0], this.dragStart[0]);
                }
                this.xAxisRange = { from: xDomainRange[0], to: xDomainRange[1] };
                this.changeTime(this.xAxisRange.from, this.xAxisRange.to);
                this.plotGraph();
            }
            this.dragStart = null;
            this.dragging = false;
            this.resetDrag();
        };
        /**
         * Function that enables the lableing of each dataset entry.
         * @param entry {InternalDataEntry} Object containing the dataset.
         * @param idx {Number} Number with the position of the dataset entry in the data array.
         * @param xCoordMouse {Number} Number of the x coordinate of the mouse.
         * @param entryIdx {Number} Number of the index of the entry.
         */
        this.showDiagramIndicator = (entry, idx, xCoordMouse, entryIdx) => {
            /** @type {?} */
            const item = entry.data[idx];
            this.labelXCoord[entryIdx] = null;
            this.distLabelXCoord[entryIdx] = null;
            if (item !== undefined && item.yDiagCoord && item[1] !== undefined) {
                // create line where mouse is
                this.focusG.style('visibility', 'visible');
                // show label if data available for time
                this.chVisLabel(entry, true, entryIdx);
                /** @type {?} */
                let xMouseAndBuffer = xCoordMouse + this.bufferSum;
                /** @type {?} */
                let labelBuffer = ((this.timespan.from / (this.timespan.to - this.timespan.from)) * 0.0001)
                    * ((this.timespan.from / (this.timespan.to - this.timespan.from)) * 0.0001);
                labelBuffer = Math.max(10, labelBuffer);
                this.showLabelValues(entry, item);
                this.showTimeIndicatorLabel(item, entryIdx, xMouseAndBuffer);
                if (item.xDiagCoord >= this.background.node().getBBox().width + this.bufferSum || xMouseAndBuffer < item.xDiagCoord - labelBuffer) {
                    this.chVisLabel(entry, false, entryIdx);
                }
                if (xMouseAndBuffer < item.xDiagCoord) {
                    if (entry.data[idx - 1] && (Math.abs(entry.data[idx - 1].xDiagCoord - xMouseAndBuffer) < Math.abs(item.xDiagCoord - xMouseAndBuffer))) {
                        this.chVisLabel(entry, false, entryIdx);
                        // show closest element to mouse
                        this.showLabelValues(entry, entry.data[idx - 1]);
                        this.showTimeIndicatorLabel(entry.data[idx - 1], entryIdx, xMouseAndBuffer);
                        this.chVisLabel(entry, true, entryIdx);
                        // check for graph width and range between data point and mouse
                        if (entry.data[idx - 1].xDiagCoord >= this.background.node().getBBox().width + this.bufferSum
                            || entry.data[idx - 1].xDiagCoord <= this.bufferSum
                            || entry.data[idx - 1].xDiagCoord + labelBuffer < xMouseAndBuffer) {
                            this.chVisLabel(entry, false, entryIdx);
                        }
                    }
                }
            }
            else {
                // TODO: set hovering for labelbuffer after last and before first value of the graph
                // hide label if no data available for time
                this.chVisLabel(entry, false, entryIdx);
            }
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) {
        this.plotGraph();
    }
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    reloadDataForDatasets(datasetIds) {
        datasetIds.forEach(id => {
            if (this.datasetMap.has(id)) {
                this.loadDatasetData(this.datasetMap.get(id), true);
            }
        });
    }
    /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    addDataset(id, url) {
        this.api.getSingleTimeseries(id, url).subscribe((timeseries) => this.loadAddedDataset(timeseries), (error) => {
            this.api.getDataset(id, url).subscribe((dataset) => this.loadAddedDataset(dataset));
        });
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeDataset(internalId) {
        this.dataYranges = [];
        this.xAxisRangeOrigin = [];
        this.datasetMap.delete(internalId);
        /** @type {?} */
        let spliceIdx = this.preparedData.findIndex((entry) => entry.internalId === internalId);
        if (spliceIdx >= 0) {
            this.preparedData.splice(spliceIdx, 1);
            if (this.preparedData.length <= 0) {
                this.yRangesEachUom = [];
                this.plotGraph();
            }
            else {
                this.preparedData.forEach((entry) => {
                    this.processData(entry);
                });
            }
        }
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    setSelectedId(internalId) {
        /** @type {?} */
        const tsData = this.preparedData.find((e) => e.internalId === internalId);
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
                let identifier = tsData.axisOptions.uom;
                /** @type {?} */
                let existingUom = this.yRangesEachUom.find(el => el.uom === identifier);
                if (existingUom.ids.findIndex(el => el === internalId) >= 0) {
                    this.checkYselector(identifier, tsData.axisOptions.uom);
                    this.yAxisSelect[identifier].clicked = true;
                    this.yAxisSelect[identifier].ids.push(internalId);
                    // check axis for uom of dataset with selected internalId
                    if (existingUom !== undefined && existingUom.ids !== undefined) {
                        // only highlight axis of uom if all datasets with this uom are highlighted
                        // count datasets for specific uom
                        if (this.yAxisSelect[identifier].ids.length !== existingUom.ids.length) {
                            this.yAxisSelect[identifier].clicked = false;
                        }
                        else {
                            this.yAxisSelect[identifier].clicked = true;
                        }
                    }
                }
            }
        }
        this.plotGraph();
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeSelectedId(internalId) {
        /** @type {?} */
        const tsData = this.preparedData.find((e) => e.internalId === internalId);
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
                let identifier = tsData.axisOptions.uom;
                this.checkYselector(identifier, tsData.axisOptions.uom);
                this.yAxisSelect[identifier].ids = this.yAxisSelect[identifier].ids.filter(el => el !== internalId);
                this.yAxisSelect[identifier].clicked = false;
            }
        }
        this.plotGraph();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    presenterOptionsChanged(options) {
        this.oldGroupYaxis = this.plotOptions.groupYaxis;
        if (this.plotOptions.hoverStyle !== HoveringStyle.point && options.hoverStyle === HoveringStyle.point) {
            d3.select('g.d3line').attr('visibility', 'visible');
        }
        Object.assign(this.plotOptions, options);
        if (this.rawSvg && this.yRangesEachUom) {
            this.plotGraph();
        }
    }
    /**
     * @param {?} internalId
     * @param {?} options
     * @param {?} firstChange
     * @return {?}
     */
    datasetOptionsChanged(internalId, options, firstChange) {
        if (!firstChange && this.datasetMap.has(internalId)) {
            this.loadDatasetData(this.datasetMap.get(internalId), false);
        }
    }
    /**
     * @return {?}
     */
    timeIntervalChanges() {
        this.datasetMap.forEach((dataset) => {
            this.loadDatasetData(dataset, false);
        });
    }
    /**
     * @return {?}
     */
    onResize() {
        this.plotGraph();
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    centerTime(timestamp) {
        /** @type {?} */
        const centeredTimespan = this.timeSrvc.centerTimespan(this.timespan, new Date(timestamp));
        this.onTimespanChanged.emit(centeredTimespan);
    }
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    changeTime(from, to) {
        this.onTimespanChanged.emit(new Timespan(from, to));
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    loadAddedDataset(dataset) {
        this.datasetMap.set(dataset.internalId, dataset);
        this.loadDatasetData(dataset, false);
    }
    /**
     * @param {?} dataset
     * @param {?} force
     * @return {?}
     */
    loadDatasetData(dataset, force) {
        /** @type {?} */
        const datasetOptions = this.datasetOptions.get(dataset.internalId);
        if (this.loadingCounter === 0) {
            this.onContentLoading.emit(true);
        }
        this.loadingCounter++;
        if (dataset instanceof Timeseries) {
            /** @type {?} */
            const buffer = this.timeSrvc.getBufferedTimespan(this.timespan, 0.2);
            this.api.getTsData(dataset.id, dataset.url, buffer, {
                format: 'flot',
                expanded: this.plotOptions.showReferenceValues || this.plotOptions.requestBeforeAfterValues,
                generalize: this.plotOptions.generalizeAllways || datasetOptions.generalize
            }, { forceUpdate: force }).subscribe((result) => this.prepareTsData(dataset, result), (error) => this.onError(error), () => this.onCompleteLoadingData());
        }
    }
    /**
     * @return {?}
     */
    onCompleteLoadingData() {
        this.loadingCounter--;
        if (this.loadingCounter === 0) {
            this.onContentLoading.emit(false);
        }
    }
    /**
     * Function to prepare each dataset for the graph and adding it to an array of datasets.
     * @param {?} dataset {IDataset} Object of the whole dataset
     * @param {?} data
     * @return {?}
     */
    prepareTsData(dataset, data) {
        // add surrounding entries to the set
        if (data.valueBeforeTimespan) {
            data.values.unshift(data.valueBeforeTimespan);
        }
        if (data.valueAfterTimespan) {
            data.values.push(data.valueAfterTimespan);
        }
        this.datasetMap.get(dataset.internalId).data = data;
        /** @type {?} */
        const datasetIdx = this.preparedData.findIndex((e) => e.internalId === dataset.internalId);
        /** @type {?} */
        const styles = this.datasetOptions.get(dataset.internalId);
        // TODO: change uom for testing
        // if (this.preparedData.length > 0) {
        //     dataset.uom = 'mc';
        // }
        // generate random color, if color is not defined
        if (styles.color === undefined) {
            styles.color = this.colorService.getColor();
        }
        /** @type {?} */
        const dataEntry = {
            internalId: dataset.internalId,
            id: (datasetIdx >= 0 ? datasetIdx : this.preparedData.length),
            color: styles.color,
            data: styles.visible ? data.values.map(d => ({ timestamp: d[0], value: d[1] })) : [],
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
        let separationIdx = this.listOfSeparation.findIndex((id) => id === dataset.internalId);
        if (styles.separateYAxis) {
            if (separationIdx < 0) {
                this.listOfSeparation.push(dataset.internalId);
            }
        }
        else {
            this.listOfSeparation = this.listOfSeparation.filter(entry => entry !== dataset.internalId);
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
                    let idx = this.yAxisSelect[dataEntry.axisOptions.uom].ids.findIndex(el => el === dataEntry.internalId);
                    if (idx >= 0) {
                        this.yAxisSelect[dataEntry.axisOptions.uom].ids.splice(idx, 1);
                    }
                    /** @type {?} */
                    let counted = this.countGroupedDatasets(dataEntry.axisOptions.uom, dataEntry.internalId);
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
    }
    /**
     * Function to add referencevaluedata to the dataset (e.g. mean).
     * @param {?} internalId {String} String with the id of a dataset
     * @param {?} styles {DatasetOptions} Object containing information for dataset styling
     * @param {?} data {Data} Array of Arrays containing the measurement-data of the dataset
     * @param {?} uom {String} String with the uom of a dataset
     * @return {?}
     */
    addReferenceValueData(internalId, styles, data, uom) {
        this.preparedData = this.preparedData.filter((entry) => {
            return !entry.internalId.startsWith('ref' + internalId);
        });
        if (this.plotOptions.showReferenceValues) {
            styles.showReferenceValues.forEach((refValue) => {
                /** @type {?} */
                const refDataEntry = {
                    internalId: 'ref' + internalId + refValue.id,
                    color: refValue.color,
                    visible: true,
                    data: data.referenceValues[refValue.id].map(d => ({ timestamp: d[0], value: d[1] })),
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
                this.preparedData.push(refDataEntry);
            });
        }
    }
    /**
     * Function that processes the data to calculate y axis range of each dataset.
     * @param {?} dataEntry {DataEntry} Object containing dataset related data.
     * @return {?}
     */
    processData(dataEntry) {
        /** @type {?} */
        let calculatedRange;
        /** @type {?} */
        let calculatedPreRange;
        /** @type {?} */
        let calculatedOriginRange;
        /** @type {?} */
        let predefinedRange;
        if (dataEntry.axisOptions.yAxisRange && dataEntry.axisOptions.yAxisRange.min !== dataEntry.axisOptions.yAxisRange.max) {
            predefinedRange = dataEntry.axisOptions.yAxisRange;
        }
        /** @type {?} */
        let autoDataExtent = dataEntry.axisOptions.autoRangeSelection;
        /** @type {?} */
        const dataExtent = d3.extent(dataEntry.data, (d) => {
            return d.value;
        });
        calculatedOriginRange = { min: dataExtent[0], max: dataExtent[1] };
        /** @type {?} */
        let setDataExtent = false;
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
        const newDatasetIdx = this.preparedData.findIndex((e) => e.internalId === dataEntry.internalId);
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
        this.dataYranges.forEach((yRange) => {
            if (yRange !== null) {
                /** @type {?} */
                let idx = this.yRangesEachUom.findIndex((e) => e.uom === yRange.uom);
                /** @type {?} */
                let yrangeObj = {
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
                    if (this.yRangesEachUom[idx].range) {
                        if (yRange.range) {
                            if (this.yRangesEachUom[idx].autoRange || yRange.autoRange) {
                                if (yRange.preRange && this.yRangesEachUom[idx].preRange) {
                                    this.checkCurrentLatest(idx, yRange, 'preRange');
                                    this.yRangesEachUom[idx].range = this.yRangesEachUom[idx].preRange;
                                }
                                else {
                                    this.checkCurrentLatest(idx, yRange, 'range');
                                }
                                this.yRangesEachUom[idx].autoRange = true;
                            }
                            else {
                                if (yRange.outOfrange !== this.yRangesEachUom[idx].outOfrange) {
                                    this.checkCurrentLatest(idx, yRange, 'originRange');
                                    this.yRangesEachUom[idx].range = this.yRangesEachUom[idx].originRange;
                                }
                                else {
                                    this.checkCurrentLatest(idx, yRange, 'range');
                                }
                            }
                        }
                    }
                    else {
                        this.takeLatest(idx, yRange, 'range');
                    }
                    this.yRangesEachUom[idx].ids.push(yRange.id);
                }
                else {
                    this.yRangesEachUom.push(yrangeObj);
                }
            }
        });
        if (this.graph) {
            this.plotGraph();
        }
    }
    /**
     * Function to set range to default interval, if min and max of range are not set.
     * @param {?} range {MinMaxRange} range to be set
     * @return {?}
     */
    extendRange(range) {
        if (range.min === range.max) {
            range.min = range.min - 1;
            range.max = range.max + 1;
        }
    }
    /**
     * Function to check ranges for min and max range.
     * @param {?} idx {Number} Index of element
     * @param {?} obj {YRanges} new object to be compared with old
     * @param {?} pos {String} type of range (e.g. preRange, range, originRange)
     * @return {?}
     */
    checkCurrentLatest(idx, obj, pos) {
        if (this.yRangesEachUom[idx][pos].min > obj[pos].min && !isNaN(obj[pos].min)) {
            this.yRangesEachUom[idx][pos].min = obj[pos].min;
        }
        if (this.yRangesEachUom[idx][pos].max < obj[pos].max && !isNaN(obj[pos].max)) {
            this.yRangesEachUom[idx][pos].max = obj[pos].max;
        }
    }
    /**
     * Function to set min and max range.
     * @param {?} idx {Number} Index of element
     * @param {?} obj {YRanges} new object
     * @param {?} pos {String} type of range (e.g. preRange, range, originRange)
     * @return {?}
     */
    takeLatest(idx, obj, pos) {
        this.yRangesEachUom[idx][pos] = obj[pos];
    }
    /**
     * Function that returns the height of the graph diagram.
     * @return {?}
     */
    calculateHeight() {
        return (/** @type {?} */ (this.d3Elem.nativeElement)).clientHeight - this.margin.top - this.margin.bottom + (this.plotOptions.showTimeLabel ? 0 : 20);
    }
    /**
     * Function that returns the width of the graph diagram.
     * @return {?}
     */
    calculateWidth() {
        return this.rawSvg.node().width.baseVal.value - this.margin.left - this.margin.right - this.maxLabelwidth;
    }
    /**
     * Function that returns the value range for building the y axis for each uom of every dataset.
     * @param {?} uom {String} String that is the uom of a dataset
     * @return {?}
     */
    getyAxisRange(uom) {
        /** @type {?} */
        let rangeObj = this.yRangesEachUom.find(el => el.uom === uom);
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
    }
    /**
     * Function to plot the graph and its dependencies
     * (graph line, graph axes, event handlers)
     * @return {?}
     */
    plotGraph() {
        this.highlightOutput = {
            timestamp: 0,
            ids: new Map()
        };
        if (!this.yRangesEachUom) {
            return;
        }
        this.preparedData.forEach((entry) => {
            /** @type {?} */
            let idx = this.listOfUoms.findIndex((uom) => uom === entry.axisOptions.uom);
            if (idx < 0) {
                this.listOfUoms.push(entry.axisOptions.uom);
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
        let yAxisArray = [];
        if (this.plotOptions.groupYaxis || this.plotOptions.groupYaxis === undefined) {
            yAxisArray = this.yRangesEachUom;
            // push all listOfSeparation into yAxisArray
            if (this.listOfSeparation.length > 0) {
                this.listOfSeparation.forEach((sepId) => {
                    /** @type {?} */
                    let newEl = this.dataYranges.find((el) => el !== null && el.id === sepId);
                    if (newEl && (yAxisArray.findIndex(el => el.id === newEl.id) < 0)) {
                        /** @type {?} */
                        let existingUom = yAxisArray.findIndex(el => el.uom === newEl.uom && (el.ids !== undefined || el.ids.length === 0));
                        if (existingUom >= 0) {
                            /** @type {?} */
                            let deleteId = yAxisArray[existingUom].ids.findIndex(id => id === sepId);
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
        yAxisArray.forEach((entry) => {
            if (entry !== null) {
                entry.first = (this.yScaleBase === null);
                entry.offset = this.bufferSum;
                /** @type {?} */
                let yAxisResult = this.drawYaxis(entry);
                if (this.yScaleBase === null) {
                    this.yScaleBase = yAxisResult.yScale;
                    this.bufferSum = yAxisResult.buffer;
                }
                else {
                    this.bufferSum = yAxisResult.buffer;
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
            let interval = this.getXDomainByTimestamp();
            /** @type {?} */
            let overviewTimespanInterval = [interval[0], interval[1]];
            /** @type {?} */
            let brush = d3.brushX()
                .extent([[0, 0], [this.width, this.height]])
                .on('end', () => {
                // on mouseclick change time after brush was moved
                if (this.mousedownBrush) {
                    /** @type {?} */
                    let timeByCoord = this.getTimestampByCoord(d3.event.selection[0], d3.event.selection[1]);
                    this.changeTime(timeByCoord[0], timeByCoord[1]);
                }
                this.mousedownBrush = false;
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
                .on('mousedown', () => {
                this.mousedownBrush = true;
            });
            // do not allow clear selection
            this.background.selectAll('.overlay')
                .remove();
            // add event to resizing handle to allow change time on resize
            this.background.selectAll('.handle')
                .style('fill', 'red')
                .style('opacity', 0.3)
                .attr('stroke', 'none')
                .on('mousedown', () => {
                this.mousedownBrush = true;
            });
        }
    }
    /**
     * @param {?} entry
     * @param {?} line
     * @return {?}
     */
    createPointHovering(entry, line) {
        this.graphBody.selectAll('.hoverDots')
            .data(entry.data.filter((d) => !isNaN(d.value)))
            .enter().append('circle')
            .attr('class', 'hoverDots')
            .attr('id', (d) => 'hover-dot-' + d.timestamp + '-' + entry.id)
            .attr('stroke', 'transparent')
            .attr('fill', 'transparent')
            .attr('cx', line.x())
            .attr('cy', line.y())
            .attr('r', entry.lines.pointRadius + 3)
            .on('mouseover', (d) => this.mouseOverPointHovering(d, entry))
            .on('mouseout', (d) => this.mouseOutPointHovering(d, entry))
            .on('mousedown', (d) => this.clickDataPoint(d, entry));
    }
    /**
     * @return {?}
     */
    createLineHovering() {
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
        this.preparedData.forEach((entry) => {
            // label inside graph
            entry.focusLabelRect = this.focusG.append('svg:rect')
                .attr('class', 'mouse-focus-label')
                .style('fill', 'white')
                .style('stroke', 'none')
                .style('pointer-events', 'none');
            entry.focusLabel = this.focusG.append('svg:text')
                .attr('class', 'mouse-focus-label')
                .style('pointer-events', 'none')
                .style('fill', entry.color)
                .style('font-weight', 'lighter');
            this.focuslabelTime = this.focusG.append('svg:text')
                .style('pointer-events', 'none')
                .attr('class', 'mouse-focus-time');
        });
    }
    /**
     * @param {?} d
     * @param {?} entry
     * @return {?}
     */
    clickDataPoint(d, entry) {
        console.log('click point');
        if (d !== undefined) {
            /** @type {?} */
            const externalId = this.datasetIdResolver.resolveInternalId(entry.internalId);
            /** @type {?} */
            const apiurl = externalId.url;
            /** @type {?} */
            const timespan = { from: d.timestamp, to: d.timestamp };
            // request all timeseries that have data for the same offering and feature
            this.api.getTimeseries(apiurl, {
                offering: entry.axisOptions.parameters.offering.id,
                feature: entry.axisOptions.parameters.feature.id
            }).subscribe((tsArray) => {
                /** @type {?} */
                const timeseries = [];
                tsArray.forEach(ts => {
                    timeseries.push(ts.id);
                });
                // request ts data by timeseries ID for specific offering and feature
                this.api.getTimeseriesData(apiurl, timeseries, timespan)
                    .subscribe((tsData) => this.onClickDataPoint.emit(tsData), (error) => console.error(error));
            }, (error) => console.error(error));
        }
    }
    /**
     * @return {?}
     */
    addTimespanJumpButtons() {
        /** @type {?} */
        let dataVisible = false;
        /** @type {?} */
        let formerTimestamp = null;
        /** @type {?} */
        let laterTimestamp = null;
        if (this.plotOptions.requestBeforeAfterValues) {
            this.preparedData.forEach((entry) => {
                /** @type {?} */
                const firstIdxInTimespan = entry.data.findIndex(e => (this.timespan.from < e[0] && this.timespan.to > e[0]) && isFinite(e[1]));
                if (firstIdxInTimespan < 0) {
                    /** @type {?} */
                    const lastIdxInTimespan = entry.data.findIndex(e => (e[0] > this.timespan.from && e[0] > this.timespan.to) && isFinite(e[1]));
                    if (lastIdxInTimespan >= 0) {
                        laterTimestamp = entry.data[entry.data.length - 1][0];
                    }
                    /** @type {?} */
                    const temp = entry.data.findIndex(e => (e[0] < this.timespan.from && e[0] < this.timespan.to) && isFinite(e[1]));
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
            const buttonWidth = 50;
            /** @type {?} */
            const leftRight = 15;
            if (formerTimestamp) {
                /** @type {?} */
                const g = this.background.append('g');
                g.append('svg:rect')
                    .attr('class', 'formerButton')
                    .attr('width', buttonWidth + 'px')
                    .attr('height', this.height + 'px')
                    .attr('transform', 'translate(' + this.bufferSum + ', 0)')
                    .on('click', () => this.centerTime(formerTimestamp));
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
                const g = this.background.append('g');
                g.append('svg:rect')
                    .attr('class', 'laterButton')
                    .attr('width', '50px')
                    .attr('height', this.height)
                    .attr('transform', 'translate(' + (this.width - 50) + ', 0)')
                    .on('click', () => this.centerTime(laterTimestamp));
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
    }
    /**
     * @return {?}
     */
    createCopyrightLabel() {
        if (this.plotOptions.copyright) {
            /** @type {?} */
            let background = this.getDimensions(this.background.node());
            /** @type {?} */
            let x = 0;
            /** @type {?} */
            let y = 0; // + this.margin.top; // top
            this.copyright = this.graph.append('g');
            /** @type {?} */
            let copyrightLabel = this.copyright.append('svg:text')
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
            let yTransform = y + this.getDimensions(copyrightLabel.node()).h - 3;
            /** @type {?} */
            let xTransform = this.bufferSum + x;
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
    }
    /**
     * Draws for every preprared data entry the graph line.
     * @return {?}
     */
    drawAllGraphLines() {
        this.focusG = this.graphFocus.append('g');
        if ((this.plotOptions.hoverStyle === HoveringStyle.point) && !this.plotOptions.overview) {
            // create label for point hovering
            this.highlightRect = this.focusG.append('svg:rect');
            this.highlightText = this.focusG.append('svg:text');
        }
        this.preparedData.forEach((entry) => this.drawGraphLine(entry));
    }
    /**
     * Function that calculates and returns the x diagram coordinate for the brush range
     * for the overview diagram by the selected time interval of the main diagram.
     * Calculate to get brush extent when main diagram time interval changes.
     * @return {?}
     */
    getXDomainByTimestamp() {
        /** *
         * calculate range of brush with timestamp and not diagram coordinates
         * formula:
         * brush_min =
         * (overview_width / (overview_max - overview_min)) * (brush_min - overview_min)
         * brus_max =
         * (overview_width / (overview_max - overview_min)) * (brush_max - overview_min)
          @type {?} */
        let minOverviewTimeInterval = this.timespan.from;
        /** @type {?} */
        let maxOverviewTimeInterval = this.timespan.to;
        /** @type {?} */
        let minDiagramTimestamp = this.mainTimeInterval.from;
        /** @type {?} */
        let maxDiagramTimestamp = this.mainTimeInterval.to;
        /** @type {?} */
        let diagramWidth = this.width;
        /** @type {?} */
        let diffOverviewTimeInterval = maxOverviewTimeInterval - minOverviewTimeInterval;
        /** @type {?} */
        let divOverviewTimeWidth = diagramWidth / diffOverviewTimeInterval;
        /** @type {?} */
        let minCalcBrush = divOverviewTimeWidth * (minDiagramTimestamp - minOverviewTimeInterval);
        /** @type {?} */
        let maxCalcBrush = divOverviewTimeWidth * (maxDiagramTimestamp - minOverviewTimeInterval);
        return [minCalcBrush, maxCalcBrush];
    }
    /**
     * Function that calculates and returns the timestamp for the main diagram calculated
     * by the selected coordinate of the brush range.
     * @param {?} minCalcBrush {Number} Number with the minimum coordinate of the selected brush range.
     * @param {?} maxCalcBrush {Number} Number with the maximum coordinate of the selected brush range.
     * @return {?}
     */
    getTimestampByCoord(minCalcBrush, maxCalcBrush) {
        /** *
         * calculate range of brush with timestamp and not diagram coordinates
         * formula:
         * minDiagramTimestamp =
         * ((minCalcBrush / overview_width) * (overview_max - overview_min)) + overview_min
         * maxDiagramTimestamp =
         * ((maxCalcBrush / overview_width) * (overview_max - overview_min)) + overview_min
          @type {?} */
        let minOverviewTimeInterval = this.timespan.from;
        /** @type {?} */
        let maxOverviewTimeInterval = this.timespan.to;
        /** @type {?} */
        let diagramWidth = this.width;
        /** @type {?} */
        let diffOverviewTimeInterval = maxOverviewTimeInterval - minOverviewTimeInterval;
        /** @type {?} */
        let minDiagramTimestamp = ((minCalcBrush / diagramWidth) * diffOverviewTimeInterval) + minOverviewTimeInterval;
        /** @type {?} */
        let maxDiagramTimestamp = ((maxCalcBrush / diagramWidth) * diffOverviewTimeInterval) + minOverviewTimeInterval;
        return [minDiagramTimestamp, maxDiagramTimestamp];
    }
    /**
     * Function that draws the x axis to the svg element.
     * @param {?} bufferXrange {Number} Number with the distance between left edge and the beginning of the graph.
     * @return {?}
     */
    drawXaxis(bufferXrange) {
        // range for x axis scale
        this.xScaleBase = d3.scaleTime()
            .domain([new Date(this.xAxisRange.from), new Date(this.xAxisRange.to)])
            .range([bufferXrange, this.width]);
        /** @type {?} */
        let xAxis = d3.axisBottom(this.xScaleBase)
            .tickFormat(d => {
            /** @type {?} */
            const date = new Date(d.valueOf());
            /** @type {?} */
            const formatMillisecond = '.%L';
            /** @type {?} */
            const formatSecond = ':%S';
            /** @type {?} */
            const formatMinute = '%H:%M';
            /** @type {?} */
            const formatHour = '%H:%M';
            /** @type {?} */
            const formatDay = '%b %d';
            /** @type {?} */
            const formatWeek = '%b %d';
            /** @type {?} */
            const formatMonth = '%B';
            /** @type {?} */
            const formatYear = '%Y';
            /** @type {?} */
            const format = d3.timeSecond(date) < date ? formatMillisecond
                : d3.timeMinute(date) < date ? formatSecond
                    : d3.timeHour(date) < date ? formatMinute
                        : d3.timeDay(date) < date ? formatHour
                            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                                : d3.timeYear(date) < date ? formatMonth
                                    : formatYear;
            return this.timeFormatLocaleService.getTimeLocale(format)(new Date(d.valueOf()));
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
                .tickFormat(() => ''));
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
    }
    /**
     * Function to draw the y axis for each dataset.
     * Each uom has its own axis.
     * @param {?} entry {DataEntry} Object containing a dataset.
     * @return {?}
     */
    drawYaxis(entry) {
        /** @type {?} */
        let showAxis = (this.plotOptions.overview ? false : (this.plotOptions.yaxis === undefined ? true : this.plotOptions.yaxis));
        /** @type {?} */
        let range;
        if (this.plotOptions.groupYaxis || this.plotOptions.groupYaxis === undefined) {
            /** @type {?} */
            let uomIdx = this.listOfUoms.findIndex((uom) => uom === entry.uom);
            if (uomIdx >= 0 && entry.ids && entry.ids.length > 1) {
                // grouped with more than ony datasets (if uom has more than one datasets)
                range = this.getyAxisRange(entry.uom);
            }
            else {
                /** @type {?} */
                let entryElem = this.dataYranges.find((el) => el !== null && (entry.id ? el.id === entry.id : el.id === entry.ids[0]));
                if (entryElem) {
                    range = entryElem.range;
                    // range = entryElem.preRange ? entryElem.preRange : entryElem.range;
                }
            }
        }
        else {
            /** @type {?} */
            let entryElem = this.dataYranges.find((el) => el !== null && el.id === entry.id);
            if (entryElem) {
                range = entryElem.preRange ? entryElem.preRange : entryElem.range;
            }
        }
        /** @type {?} */
        let yMin = -1;
        /** @type {?} */
        let yMax = 1;
        if (range !== undefined && range !== null) {
            yMin = range.min;
            yMax = range.max;
        }
        /** @type {?} */
        const rangeOffset = (yMax - yMin) * 0.10;
        /** @type {?} */
        const yScale = d3.scaleLinear()
            .domain([yMin - rangeOffset, yMax + rangeOffset])
            .range([this.height, 0]);
        /** @type {?} */
        let yAxisGen = d3.axisLeft(yScale).ticks(5);
        /** @type {?} */
        let buffer = 0;
        // only if yAxis should not be visible
        if (!showAxis) {
            yAxisGen
                .tickFormat(() => '')
                .tickSize(0);
        }
        /** @type {?} */
        const axis = this.graph.append('svg:g')
            .attr('class', 'y axis')
            .call(yAxisGen);
        // only if yAxis should be visible
        if (showAxis) {
            /** @type {?} */
            const text = this.graph.append('text')
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
            const axisWidth = axis.node().getBBox().width + 10 + this.getDimensions(text.node()).h;
            // if yAxis should not be visible, buffer will be set to 0
            buffer = (showAxis ? entry.offset + (axisWidth < this.margin.left ? this.margin.left : axisWidth) : 0);
            /** @type {?} */
            const axisWidthDiv = (axisWidth < this.margin.left ? this.margin.left : axisWidth);
            if (!entry.first) {
                axis.attr('transform', 'translate(' + buffer + ', 0)');
            }
            else {
                buffer = axisWidthDiv - this.margin.left;
                axis.attr('transform', 'translate(' + buffer + ', 0)');
            }
            /** @type {?} */
            let textOff = -(this.bufferSum);
            if (entry.first) {
                textOff = this.margin.left;
            }
            text.attr('y', 0 - textOff);
            if (text) {
                /** @type {?} */
                let textWidth = text.node().getBBox().width;
                /** @type {?} */
                let textHeight = text.node().getBBox().height;
                /** @type {?} */
                let textPosition = {
                    x: text.node().getBBox().x,
                    y: text.node().getBBox().y
                };
                /** @type {?} */
                let axisradius = 4;
                /** @type {?} */
                let startOfPoints = {
                    x: textPosition.y + textHeight / 2 + axisradius / 2,
                    // + 2 because radius === 4
                    y: Math.abs(textPosition.x + textWidth) - axisradius * 2
                };
                /** @type {?} */
                let pointOffset = 0;
                if (entry.ids) {
                    entry.ids.forEach((entryID) => {
                        /** @type {?} */
                        let dataentry = this.preparedData.find(el => el.internalId === entryID);
                        if (dataentry) {
                            this.graph.append('circle')
                                .attr('class', 'axisDots')
                                .attr('id', 'axisdot-' + entry.id)
                                .attr('stroke', dataentry.color)
                                .attr('fill', dataentry.color)
                                .attr('cx', startOfPoints.x)
                                .attr('cy', startOfPoints.y - pointOffset)
                                .attr('r', axisradius);
                            pointOffset += axisradius * 3;
                        }
                    });
                }
                else {
                    /** @type {?} */
                    let dataentry = this.preparedData.find(el => el.internalId === entry.id);
                    if (dataentry) {
                        this.graph.append('circle')
                            .attr('class', 'axisDots')
                            .attr('id', 'axisdot-' + entry.id)
                            .attr('stroke', dataentry.color)
                            .attr('fill', dataentry.color)
                            .attr('cx', startOfPoints.x)
                            .attr('cy', startOfPoints.y - pointOffset)
                            .attr('r', axisradius);
                    }
                }
            }
            /** @type {?} */
            let id = (entry.id ? entry.id : entry.uom);
            this.checkYselector(id, entry.uom);
            /** @type {?} */
            const axisDiv = this.graph.append('rect')
                .attr('class', 'axisDiv')
                .attr('width', axisWidthDiv)
                .attr('height', this.height)
                .attr('fill', 'grey')
                .attr('opacity', (this.yAxisSelect[id].clicked ? this.opac.click : this.opac.default))
                .on('mouseover', (d, i, k) => {
                d3.select(k[0])
                    .attr('opacity', this.opac.hover);
            })
                .on('mouseout', (d, i, k) => {
                if (!this.yAxisSelect[id].clicked) {
                    d3.select(k[0])
                        .attr('opacity', this.opac.default);
                }
                else {
                    d3.select(k[0])
                        .attr('opacity', this.opac.click);
                }
            })
                .on('mouseup', (d, i, k) => {
                if (!this.yAxisSelect[id].clicked) {
                    d3.select(k[0])
                        .attr('opacity', this.opac.default);
                }
                else {
                    d3.select(k[0])
                        .attr('opacity', this.opac.click);
                }
                this.yAxisSelect[id].clicked = !this.yAxisSelect[id].clicked;
                /** @type {?} */
                let entryArray = [];
                if (entry.id) {
                    entryArray.push(entry.id);
                }
                else {
                    entryArray = entry.ids;
                }
                this.highlightLine(entryArray);
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
                .tickFormat(() => ''));
        }
        return {
            buffer,
            yScale
        };
    }
    /**
     * Function to check whether object yAxisSelect exists with selected uom.
     * If it does not exist, it will be created.
     * @param {?} identifier {String} String providing the selected uom or the selected dataset ID.
     * @param {?} uom
     * @return {?}
     */
    checkYselector(identifier, uom) {
        if (this.yAxisSelect === undefined) {
            this.yAxisSelect = {};
        }
        /** @type {?} */
        let selector = {
            id: identifier,
            ids: (this.yAxisSelect[identifier] !== undefined ? this.yAxisSelect[identifier].ids : []),
            uom: uom,
            clicked: (this.yAxisSelect[identifier] !== undefined ? this.yAxisSelect[identifier].clicked : false)
        };
        this.yAxisSelect[identifier] = selector;
    }
    /**
     * Function to adapt y axis highlighting to selected TS or selected uom
     * @return {?}
     */
    changeYselection() {
        /** @type {?} */
        let groupList = {};
        if (this.yAxisSelect) {
            if (!this.plotOptions.groupYaxis) {
                // before: group
                for (let key in this.yAxisSelect) {
                    if (this.yAxisSelect.hasOwnProperty(key)) {
                        /** @type {?} */
                        let el = this.yAxisSelect[key];
                        if (el.ids.length > 0) {
                            el.ids.forEach((id) => {
                                /** @type {?} */
                                let dataEl = this.preparedData.find((entry) => entry.internalId === id);
                                /** @type {?} */
                                let newSelector = {
                                    id: id,
                                    ids: [id],
                                    clicked: true,
                                    uom: dataEl.axisOptions.uom
                                };
                                groupList[id] = newSelector;
                            });
                        }
                        else if (el.clicked && el.uom !== el.id) {
                            /** @type {?} */
                            let dataEl = this.preparedData.find((entry) => entry.internalId === el.id);
                            /** @type {?} */
                            let newSelector = {
                                id: el.id,
                                ids: [el.id],
                                clicked: true,
                                uom: dataEl.axisOptions.uom
                            };
                            groupList[el.id] = newSelector;
                        }
                    }
                }
            }
            else {
                // before: no group
                for (let key in this.yAxisSelect) {
                    if (this.yAxisSelect.hasOwnProperty(key)) {
                        /** @type {?} */
                        let el = this.yAxisSelect[key];
                        /** @type {?} */
                        let dataEl = this.preparedData.find((entry) => entry.internalId === el.id);
                        /** @type {?} */
                        let selectionID;
                        if (dataEl && dataEl.axisOptions.separateYAxis) {
                            // selection is dataset with internalId
                            selectionID = dataEl.internalId;
                        }
                        else {
                            // selection is uom
                            selectionID = el.uom;
                        }
                        if (!groupList[selectionID]) {
                            /** @type {?} */
                            let currentUom = {
                                id: selectionID,
                                ids: [],
                                clicked: false,
                                uom: el.uom
                            };
                            groupList[selectionID] = currentUom;
                        }
                        if (el.clicked) {
                            groupList[selectionID].ids.push(el.id);
                        }
                        if (el.uom === selectionID) {
                            /** @type {?} */
                            let groupedDatasets = this.countGroupedDatasets(selectionID, el.uom);
                            if (groupList[selectionID].ids.length === groupedDatasets) {
                                groupList[selectionID].clicked = true;
                            }
                        }
                        else if (el.clicked) {
                            // execute for ungrouped dataset
                            groupList[selectionID].clicked = true;
                        }
                    }
                }
            }
            this.yAxisSelect = {}; // unselect all - y axis
            this.yAxisSelect = groupList;
        }
        this.oldGroupYaxis = this.plotOptions.groupYaxis;
    }
    /**
     * Function that returns the amount of datasets that are grouped with the same uom
     * @param {?} uom {String} uom
     * @param {?} id {String} internalId of the dataset that can be skipped
     * returns {Number} amount of datasets with the given uom
     * @return {?}
     */
    countGroupedDatasets(uom, id) {
        /** @type {?} */
        let arrayUomCount = 0;
        this.dataYranges.forEach(el => {
            if (el !== null && el.uom === uom && el.id !== id) {
                /** @type {?} */
                let idx = this.preparedData.findIndex(ds => ds.internalId === el.id && ds.axisOptions.separateYAxis === false);
                if (idx >= 0) {
                    arrayUomCount++;
                }
            }
        });
        return arrayUomCount;
    }
    /**
     * Function to set selected Ids that should be highlighted.
     * @param {?} ids {Array} Array of Strings containing the Ids.
     * @return {?}
     */
    highlightLine(ids) {
        /** @type {?} */
        let changeFalse = [];
        /** @type {?} */
        let changeTrue = [];
        ids.forEach((ID) => {
            if (this.selectedDatasetIds.indexOf(ID) >= 0) {
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
    }
    /**
     * Function that changes state of selected Ids.
     * @param {?} toHighlightDataset
     * @param {?} change
     * @return {?}
     */
    changeSelectedIds(toHighlightDataset, change) {
        if (change) {
            toHighlightDataset.forEach((obj) => {
                this.removeSelectedId(obj.id);
                this.selectedDatasetIds.splice(this.selectedDatasetIds.findIndex((entry) => entry === obj.id), 1);
            });
        }
        else {
            toHighlightDataset.forEach((obj) => {
                if (this.selectedDatasetIds.indexOf(obj.id) < 0) {
                    this.setSelectedId(obj.id);
                    this.selectedDatasetIds.push(obj.id);
                }
            });
        }
        this.onDatasetSelected.emit(this.selectedDatasetIds);
        this.plotGraph();
    }
    /**
     * Function to draw the graph line for each dataset.
     * @param {?} entry {DataEntry} Object containing a dataset.
     * @return {?}
     */
    drawGraphLine(entry) {
        /** @type {?} */
        let getYaxisRange = this.getYaxisRange(entry);
        if (entry.data.length > 0) {
            if (getYaxisRange !== undefined) {
                /** @type {?} */
                let yScaleBase = getYaxisRange.yScale;
                /** @type {?} */
                let querySelectorClip = 'clip' + this.currentTimeId;
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
                let line = this.createLine(this.xScaleBase, yScaleBase);
                this.graphBody
                    .append('svg:path')
                    .datum(entry.data)
                    .attr('class', 'line')
                    .attr('fill', 'none')
                    .attr('stroke', entry.color)
                    .attr('stroke-width', entry.lines.lineWidth)
                    .attr('d', line);
                this.graphBody.selectAll('.graphDots')
                    .data(entry.data.filter((d) => !isNaN(d.value)))
                    .enter().append('circle')
                    .attr('class', 'graphDots')
                    .attr('id', (d) => 'dot-' + d.timestamp + '-' + entry.id)
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
    }
    /**
     * @param {?} xScaleBase
     * @param {?} yScaleBase
     * @return {?}
     */
    createLine(xScaleBase, yScaleBase) {
        return d3.line()
            .defined((d) => !isNaN(d.value))
            .x((d) => {
            /** @type {?} */
            const xDiagCoord = xScaleBase(d.timestamp);
            if (!isNaN(xDiagCoord)) {
                d.xDiagCoord = xDiagCoord;
                return xDiagCoord;
            }
        })
            .y((d) => {
            /** @type {?} */
            const yDiagCoord = yScaleBase(d.value);
            if (!isNaN(yDiagCoord)) {
                d.yDiagCoord = yDiagCoord;
                return yDiagCoord;
            }
        })
            .curve(d3.curveLinear);
    }
    /**
     * @param {?} d
     * @param {?} entry
     * @return {?}
     */
    mouseOverPointHovering(d, entry) {
        if (d !== undefined) {
            /** @type {?} */
            let coords = d3.mouse(this.background.node());
            /** @type {?} */
            let dataset = this.datasetMap.get(entry.internalId);
            /** @type {?} */
            let rectBack = this.background.node().getBBox();
            if (coords[0] >= 0 && coords[0] <= rectBack.width && coords[1] >= 0 && coords[1] <= rectBack.height) {
                // highlight hovered dot
                d3.select('#dot-' + d.timestamp + '-' + entry.id).attr('opacity', 0.8).attr('r', '8px');
                this.highlightRect.style('visibility', 'visible');
                this.highlightText.style('visibility', 'visible');
                /** @type {?} */
                let dotLabel = this.highlightText
                    .text(`${d.value} ${entry.axisOptions.uom} ${moment(d.timestamp).format('DD.MM.YY HH:mm')}`)
                    .attr('class', 'mouseHoverDotLabel')
                    .style('pointer-events', 'none')
                    .style('fill', 'black');
                /** @type {?} */
                let onLeftSide = false;
                if ((this.background.node().getBBox().width + this.bufferSum) / 2 > coords[0]) {
                    onLeftSide = true;
                }
                /** @type {?} */
                let rectX = d.xDiagCoord + 15;
                /** @type {?} */
                let rectY = d.yDiagCoord;
                /** @type {?} */
                let rectW = this.getDimensions(dotLabel.node()).w + 8;
                /** @type {?} */
                let rectH = this.getDimensions(dotLabel.node()).h; // + 4;
                if (!onLeftSide) {
                    rectX = d.xDiagCoord - 15 - rectW;
                    rectY = d.yDiagCoord;
                }
                if ((coords[1] + rectH + 4) > this.background.node().getBBox().height) {
                    // when label below x axis
                    console.log('Translate label to a higher place. - not yet implemented');
                }
                /** @type {?} */
                let dotRectangle = this.highlightRect
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
                let labelX = d.xDiagCoord + 4 + 15;
                /** @type {?} */
                let labelY = d.yDiagCoord + this.getDimensions(dotRectangle.node()).h - 4;
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
    }
    /**
     * @param {?} d
     * @param {?} entry
     * @return {?}
     */
    mouseOutPointHovering(d, entry) {
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
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    getYaxisRange(entry) {
        // check if entry dataset should be separated or entry datasets should be grouped
        if (!entry.axisOptions.separateYAxis && (this.plotOptions.groupYaxis || this.plotOptions.groupYaxis === undefined)) {
            return this.yRangesEachUom.find((obj) => {
                if (obj !== null && obj.uom === entry.axisOptions.uom) {
                    return true;
                } // uom does exist in this.yRangesEachUom
            });
        }
        else {
            return this.dataYranges.find((obj) => {
                if (obj !== null && obj.id === entry.internalId) {
                    return true;
                } // id does exist in this.dataYranges
            });
        }
    }
    /**
     * Function that returns the timestamp of provided x diagram coordinates.
     * @param {?} start {Number} Number with the minimum diagram coordinate.
     * @param {?} end {Number} Number with the maximum diagram coordinate.
     * @return {?}
     */
    getxDomain(start, end) {
        /** @type {?} */
        let domMinArr = [];
        /** @type {?} */
        let domMaxArr = [];
        /** @type {?} */
        let domMin;
        /** @type {?} */
        let domMax;
        /** @type {?} */
        let tmp;
        /** @type {?} */
        let lowestMin = Number.POSITIVE_INFINITY;
        /** @type {?} */
        let lowestMax = Number.POSITIVE_INFINITY;
        start += this.bufferSum;
        end += this.bufferSum;
        this.preparedData.forEach((entry) => {
            domMinArr.push(entry.data.find((elem, index, array) => {
                if (elem.xDiagCoord) {
                    if (elem.xDiagCoord >= start) {
                        return array[index] !== undefined;
                    }
                }
            }));
            domMaxArr.push(entry.data.find((elem, index, array) => {
                if (elem.xDiagCoord >= end) {
                    return array[index] !== undefined;
                }
            }));
        });
        for (let i = 0; i <= domMinArr.length - 1; i++) {
            if (domMinArr[i] != null) {
                tmp = domMinArr[i].xDiagCoord;
                if (tmp < lowestMin) {
                    lowestMin = tmp;
                    domMin = domMinArr[i].timestamp;
                }
            }
        }
        for (let j = 0; j <= domMaxArr.length - 1; j++) {
            if (domMaxArr[j] != null) {
                tmp = domMaxArr[j].xDiagCoord;
                if (tmp < lowestMax) {
                    lowestMax = tmp;
                    domMax = domMaxArr[j].timestamp;
                }
            }
        }
        return [domMin, domMax];
    }
    /**
     * Function that configurates and draws the rectangle.
     * @return {?}
     */
    drawDragRectangle() {
        if (!this.dragStart) {
            return;
        }
        this.dragCurrent = d3.mouse(this.background.node());
        /** @type {?} */
        const x1 = Math.min(this.dragStart[0], this.dragCurrent[0]);
        /** @type {?} */
        const x2 = Math.max(this.dragStart[0], this.dragCurrent[0]);
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
    }
    /**
     * Function that disables the drawing rectangle control.
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
     * Function that returns the metadata of a specific entry in the dataset.
     * @param {?} x {Number} Coordinates of the mouse inside the diagram.
     * @param {?} data {DataEntry} Array with the data of each dataset entry.
     * @return {?}
     */
    getItemForX(x, data) {
        /** @type {?} */
        const index = this.xScaleBase.invert(x);
        /** @type {?} */
        const bisectDate = d3.bisector((d) => {
            return d[0];
        }).left;
        return bisectDate(data, index);
    }
    /**
     * Function that disables the labeling.
     * @return {?}
     */
    hideDiagramIndicator() {
        this.focusG.style('visibility', 'hidden');
        d3.selectAll('.focus-visibility')
            .attr('visibility', 'hidden');
    }
    /**
     * Function to change visibility of label and white rectangle inside graph (next to mouse-cursor line).
     * @param {?} entry {DataEntry} Object containing the dataset.
     * @param {?} visible {Boolean} Boolean giving information about visibility of a label.
     * @param {?} entryIdx
     * @return {?}
     */
    chVisLabel(entry, visible, entryIdx) {
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
    }
    /**
     * Function to show the labeling inside the graph.
     * @param {?} entry {DataEntry} Object containg the dataset.
     * @param {?} item {DataEntry} Object of the entry in the dataset.
     * @return {?}
     */
    showLabelValues(entry, item) {
        /** @type {?} */
        let id = 1;
        /** @type {?} */
        let onLeftSide = this.checkLeftSide(item.xDiagCoord);
        if (entry.focusLabel) {
            entry.focusLabel.text(item[id] + (entry.axisOptions.uom ? entry.axisOptions.uom : ''));
            /** @type {?} */
            const entryX = onLeftSide ?
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
    }
    /**
     * Function to show the time labeling inside the graph.
     * @param {?} item {DataEntry} Object of the entry in the dataset.
     * @param {?} entryIdx {Number} Number of the index of the entry.
     * @param {?} mouseCoord
     * @return {?}
     */
    showTimeIndicatorLabel(item, entryIdx, mouseCoord) {
        // timestamp is the time where the mouse-cursor is
        this.labelTimestamp[entryIdx] = item[0];
        this.labelXCoord[entryIdx] = item.xDiagCoord;
        this.distLabelXCoord[entryIdx] = Math.abs(mouseCoord - item.xDiagCoord);
        /** @type {?} */
        let min = d3.min(this.distLabelXCoord);
        /** @type {?} */
        let idxOfMin = this.distLabelXCoord.findIndex((elem) => elem === min);
        /** @type {?} */
        let onLeftSide = this.checkLeftSide(item.xDiagCoord);
        /** @type {?} */
        let right = this.labelXCoord[idxOfMin] + 2;
        /** @type {?} */
        let left = this.labelXCoord[idxOfMin] - this.getDimensions(this.focuslabelTime.node()).w - 2;
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
    }
    /**
     * Function giving information if the mouse is on left side of the diagram.
     * @param {?} itemCoord {number} x coordinate of the value (e.g. mouse) to be checked
     * @return {?}
     */
    checkLeftSide(itemCoord) {
        return ((this.background.node().getBBox().width + this.bufferSum) / 2 > itemCoord) ? true : false;
    }
    /**
     * Function to wrap the text for the y axis label.
     * @param {?} textObj
     * @param {?} width {Number} width of the axis which must not be crossed
     * @param {?} xposition {Number} position to center the label in the middle
     * @return {?}
     */
    wrapText(textObj, width, xposition) {
        textObj.each(function (u, i, d) {
            /** @type {?} */
            let text = d3.select(this);
            /** @type {?} */
            let words = text.text().split(/\s+/).reverse();
            /** @type {?} */
            let word;
            /** @type {?} */
            let line = [];
            /** @type {?} */
            let 
            // lineNumber = 0,
            lineHeight = (i === d.length - 1 ? 0.3 : 1.1);
            /** @type {?} */
            let 
            // ems
            y = text.attr('y');
            /** @type {?} */
            let dy = parseFloat(text.attr('dy'));
            /** @type {?} */
            let tspan = text.text(null).append('tspan').attr('x', 0 - xposition).attr('y', y).attr('dy', dy + 'em');
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(' '));
                /** @type {?} */
                let node = /** @type {?} */ (tspan.node());
                /** @type {?} */
                let hasGreaterWidth = node.getComputedTextLength() > width;
                if (hasGreaterWidth) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = text.append('tspan').attr('x', 0 - xposition).attr('y', y).attr('dy', lineHeight + dy + 'em').text(word);
                }
            }
        });
    }
    /**
     * Function that returns the boundings of a html element.
     * @param {?} el {Object} Object of the html element.
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
     * Function to generate uuid for a diagram
     * @return {?}
     */
    uuidv4() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }
    /**
     * Function to generate components of the uuid for a diagram
     * @return {?}
     */
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    /**
     * Function that logs the error in the console.
     * @param {?} error {Object} Object with the error.
     * @return {?}
     */
    onError(error) {
        console.error(error);
    }
}
D3TimeseriesGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-d3-timeseries-graph',
                template: `<div class="d3" #d3timeseries></div>
`,
                styles: [`.d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}.d3 .formerButton,.d3 .laterButton{fill:grey;opacity:.3}.d3 .formerButton:hover,.d3 .laterButton:hover{opacity:.6}.d3 .arrow{stroke:grey;stroke-width:3px}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
D3TimeseriesGraphComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: Time },
    { type: D3TimeFormatLocaleService },
    { type: ColorService },
    { type: TranslateService }
];
D3TimeseriesGraphComponent.propDecorators = {
    mainTimeInterval: [{ type: Input }],
    onHighlightChanged: [{ type: Output }],
    onClickDataPoint: [{ type: Output }],
    d3Elem: [{ type: ViewChild, args: ['d3timeseries',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxZQUFZLEVBRVosbUJBQW1CLEVBRW5CLHlCQUF5QixFQUd6QixpQkFBaUIsRUFFakIsSUFBSSxFQUNKLFVBQVUsRUFFVixRQUFRLEdBQ1gsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQW1CLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDekIsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXBGLE9BQU8sRUFBaUIsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJGeEUsTUFBTSxpQ0FDRixTQUFRLHlCQUF3RDs7Ozs7Ozs7OztJQStGaEUsWUFDYyxlQUFnQyxFQUNoQyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsUUFBYyxFQUNkLHVCQUFrRCxFQUNsRCxZQUEwQixFQUMxQixnQkFBa0M7UUFFNUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsUUFB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QyxDQUFDO1lBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDcEQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNwRDs7Ozs7Ozs7O0lBU0csVUFBVSxDQUFDLEdBQVcsRUFBRSxHQUFZLEVBQUUsR0FBVztRQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBTXJDLGVBQWU7UUFDbkIsTUFBTSxDQUFDLG1CQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBNEIsRUFBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7SUFNOUksY0FBYztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFD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QjtZQUVqQixJQUFJO1lBU0MseUJBQXlCO1lBbEI5QixZQUFZO1lBY1UsZ0JBQWdCOzs7K0JBcUdyQyxLQUFLO2lDQUlMLE1BQU07K0JBR04sTUFBTTtxQkFHTixTQUFTLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb2xvclNlcnZpY2UsXG4gICAgRGF0YSxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRPcHRpb25zLFxuICAgIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gICAgSURhdGFzZXQsXG4gICAgSW50ZXJuYWxEYXRhc2V0SWQsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgTWluTWF4UmFuZ2UsXG4gICAgVGltZSxcbiAgICBUaW1lc2VyaWVzLFxuICAgIFRpbWVzZXJpZXNEYXRhLFxuICAgIFRpbWVzcGFuLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGlnaGxpZ2h0T3V0cHV0IH0gZnJvbSAnLi4vbW9kZWwvZDMtaGlnaGxpZ2h0JztcbmltcG9ydCB7IEQzUGxvdE9wdGlvbnMsIEhvdmVyaW5nU3R5bGUgfSBmcm9tICcuLi9tb2RlbC9kMy1wbG90LW9wdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFFbnRyeSB7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgdmFsdWU6IG51bWJlcjtcbiAgICB4RGlhZ0Nvb3JkPzogbnVtYmVyO1xuICAgIHlEaWFnQ29vcmQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxEYXRhRW50cnkge1xuICAgIGludGVybmFsSWQ6IHN0cmluZztcbiAgICBpZD86IG51bWJlcjsgLy8gVE9ETyBuZWVkZWQ/XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBkYXRhOiBEYXRhRW50cnlbXTtcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XG4gICAgcG9pbnRzOiB7XG4gICAgICAgIGZpbGxDb2xvcjogc3RyaW5nXG4gICAgfTtcbiAgICBsaW5lcz86IHtcbiAgICAgICAgbGluZVdpZHRoPzogbnVtYmVyO1xuICAgICAgICBwb2ludFJhZGl1cz86IG51bWJlcjtcbiAgICB9O1xuICAgIGJhcnM/OiB7XG4gICAgICAgIGxpbmVXaWR0aD86IG51bWJlcjtcbiAgICB9O1xuICAgIGF4aXNPcHRpb25zOiB7XG4gICAgICAgIHVvbTogc3RyaW5nO1xuICAgICAgICBsYWJlbD86IHN0cmluZztcbiAgICAgICAgemVyb0Jhc2VkPzogYm9vbGVhbjtcbiAgICAgICAgeUF4aXNSYW5nZT86IE1pbk1heFJhbmdlO1xuICAgICAgICBhdXRvUmFuZ2VTZWxlY3Rpb24/OiBib29sZWFuO1xuICAgICAgICBzZXBhcmF0ZVlBeGlzPzogYm9vbGVhbjtcbiAgICAgICAgcGFyYW1ldGVycz86IHtcbiAgICAgICAgICAgIGZlYXR1cmU/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgICAgIHBoZW5vbWVub24/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgICAgIG9mZmVyaW5nPzogeyBpZDogU3RyaW5nLCBsYWJlbDogU3RyaW5nIH07XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB2aXNpYmxlOiBib29sZWFuO1xuICAgIGZvY3VzTGFiZWxSZWN0PzogYW55O1xuICAgIGZvY3VzTGFiZWw/OiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUNvbnN0IGV4dGVuZHMgSURhdGFzZXQge1xuICAgIGRhdGE/OiBEYXRhPFtudW1iZXIsIG51bWJlcl0+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFlSYW5nZXMge1xuICAgIHVvbTogc3RyaW5nO1xuICAgIHJhbmdlPzogTWluTWF4UmFuZ2U7IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IHVvbVxuICAgIHByZVJhbmdlPzogTWluTWF4UmFuZ2U7IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IHVvbVxuICAgIG9yaWdpblJhbmdlPzogTWluTWF4UmFuZ2U7IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IHVvbVxuICAgIHplcm9CYXNlZDogYm9vbGVhbjtcbiAgICBhdXRvUmFuZ2U6IGJvb2xlYW47XG4gICAgb3V0T2ZyYW5nZTogYm9vbGVhbjtcbiAgICBpZD86IHN0cmluZzsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgaW50ZXJuYWxJZFxuICAgIGlkcz86IHN0cmluZ1tdOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSB1b21cbiAgICBmaXJzdD86IGJvb2xlYW47XG4gICAgeVNjYWxlPzogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIG9mZnNldD86IG51bWJlcjtcbiAgICBwYXJhbWV0ZXJzOiB7ICAgLy8gYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmb3IgdGhlIHkgYXhpcyBsYWJlbFxuICAgICAgICBmZWF0dXJlPzogeyBpZDogU3RyaW5nLCBsYWJlbDogU3RyaW5nIH07XG4gICAgICAgIHBoZW5vbWVub24/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgb2ZmZXJpbmc/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICB9O1xufVxuXG5pbnRlcmZhY2UgWVNjYWxlIHtcbiAgICBidWZmZXI6IG51bWJlcjtcbiAgICB5U2NhbGU6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPjtcbn1cblxuaW50ZXJmYWNlIFlBeGlzU2VsZWN0aW9uIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNsaWNrZWQ6IGJvb2xlYW47XG4gICAgaWRzPzogQXJyYXk8c3RyaW5nPjtcbiAgICB1b20/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBIaWdobGlnaHREYXRhc2V0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNoYW5nZTogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZDMtdGltZXNlcmllcy1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZDNcIiAjZDN0aW1lc2VyaWVzPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLmQze2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kMyAuZ3JpZCAudGljayBsaW5le3N0cm9rZTojZDNkM2QzO3N0cm9rZS1vcGFjaXR5Oi43O3NoYXBlLXJlbmRlcmluZzpjcmlzcEVkZ2VzfS5kMyAuZ3JhcGhEb3Rze3N0cm9rZS13aWR0aDowO3N0cm9rZS1vcGFjaXR5OjF9LmQzIC5ncmFwaERvdHMgLmhvdmVye3N0cm9rZS13aWR0aDoyMHB4O3N0cm9rZS1vcGFjaXR5Oi41fS5kMyAuZm9ybWVyQnV0dG9uLC5kMyAubGF0ZXJCdXR0b257ZmlsbDpncmV5O29wYWNpdHk6LjN9LmQzIC5mb3JtZXJCdXR0b246aG92ZXIsLmQzIC5sYXRlckJ1dHRvbjpob3ZlcntvcGFjaXR5Oi42fS5kMyAuYXJyb3d7c3Ryb2tlOmdyZXk7c3Ryb2tlLXdpZHRoOjNweH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBEM1Bsb3RPcHRpb25zPlxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKVxuICAgIC8vIGRpZmZlcmVuY2UgdG8gdGltZXNwYW4vdGltZUludGVydmFsIC0tPiBpZiBicnVzaCwgdGhlbiB0aGlzIGlzIHRoZSB0aW1lc3BhbiBvZiB0aGUgbWFpbi1kaWFncmFtXG4gICAgcHVibGljIG1haW5UaW1lSW50ZXJ2YWw6IFRpbWVzcGFuO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uSGlnaGxpZ2h0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPEhpZ2hsaWdodE91dHB1dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25DbGlja0RhdGFQb2ludDogRXZlbnRFbWl0dGVyPFRpbWVzZXJpZXNEYXRhW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZDN0aW1lc2VyaWVzJylcbiAgICBwdWJsaWMgZDNFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgcHVibGljIGhpZ2hsaWdodE91dHB1dDogSGlnaGxpZ2h0T3V0cHV0O1xuXG4gICAgLy8gRE9NIGVsZW1lbnRzXG4gICAgcHJvdGVjdGVkIHJhd1N2ZzogYW55OyAvLyBkMy5TZWxlY3Rpb248RW50ZXJFbGVtZW50LCB7fSwgbnVsbCwgdW5kZWZpbmVkPjtcbiAgICBwcm90ZWN0ZWQgZ3JhcGg6IGFueTtcbiAgICBwcm90ZWN0ZWQgZ3JhcGhGb2N1czogYW55O1xuICAgIHByb3RlY3RlZCBncmFwaEJvZHk6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBkcmFnUmVjdEc6IGFueTtcbiAgICBwcml2YXRlIGJhY2tncm91bmQ6IGFueTtcbiAgICBwcml2YXRlIGNvcHlyaWdodDogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRGb2N1czogYW55O1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0UmVjdDogYW55O1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0VGV4dDogYW55O1xuICAgIHByaXZhdGUgZm9jdXNsYWJlbFRpbWU6IGFueTtcblxuICAgIC8vIG9wdGlvbnMgZm9yIGludGVyYWN0aW9uXG4gICAgcHJpdmF0ZSBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRyYWdTdGFydDogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIGRyYWdDdXJyZW50OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ2dpbmdNb3ZlOiBib29sZWFuO1xuICAgIHByaXZhdGUgZHJhZ01vdmVTdGFydDogbnVtYmVyO1xuICAgIHByaXZhdGUgZHJhZ01vdmVSYW5nZTogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIG1vdXNlZG93bkJydXNoOiBib29sZWFuO1xuICAgIHByaXZhdGUgb2xkR3JvdXBZYXhpczogYm9vbGVhbjtcblxuICAgIC8vIGRhdGEgdHlwZXNcbiAgICBwcm90ZWN0ZWQgcHJlcGFyZWREYXRhOiBJbnRlcm5hbERhdGFFbnRyeVtdID0gW107IC8vIDogRGF0YVNlcmllc1tdXG4gICAgcHJvdGVjdGVkIGRhdGFzZXRNYXA6IE1hcDxzdHJpbmcsIERhdGFDb25zdD4gPSBuZXcgTWFwKCk7XG4gICAgcHJvdGVjdGVkIGxpc3RPZlVvbXM6IHN0cmluZ1tdID0gW107XG4gICAgcHJvdGVjdGVkIHlSYW5nZXNFYWNoVW9tOiBZUmFuZ2VzW10gPSBbXTsgLy8geSBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmFuZ2VzIGZvciBlYWNoIHVvbVxuICAgIHByb3RlY3RlZCBkYXRhWXJhbmdlczogWVJhbmdlc1tdID0gW107IC8vIHkgYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJhbmdlcyBvZiBhbGwgZGF0YXNldHNcbiAgICBwcml2YXRlIHhBeGlzUmFuZ2U6IFRpbWVzcGFuOyAvLyB4IGRvbWFpbiByYW5nZVxuICAgIHByaXZhdGUgeEF4aXNSYW5nZU9yaWdpbjogYW55ID0gW107IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSB4QXhpc1JhbmdlUGFuOiBbbnVtYmVyLCBudW1iZXJdOyAvLyB4IGRvbWFpbiByYW5nZVxuICAgIHByaXZhdGUgbGlzdE9mU2VwYXJhdGlvbiA9IEFycmF5KCk7XG4gICAgcHJpdmF0ZSB5QXhpc1NlbGVjdDtcblxuICAgIHByaXZhdGUgeFNjYWxlQmFzZTogZDMuU2NhbGVUaW1lPG51bWJlciwgbnVtYmVyPjsgLy8gY2FsY3VsYXRlIGRpYWdyYW0gY29vcmQgb2YgeCB2YWx1ZVxuICAgIHByaXZhdGUgeVNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+OyAvLyBjYWxjdWxhdGUgZGlhZ3JhbSBjb29yZCBvZiB5IHZhbHVlXG4gICAgLy8gcHJpdmF0ZSBkb3RzT2JqZWN0czogYW55W107XG4gICAgcHJpdmF0ZSBsYWJlbFRpbWVzdGFtcDogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBsYWJlbFhDb29yZDogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBkaXN0TGFiZWxYQ29vcmQ6IG51bWJlcltdO1xuICAgIHByaXZhdGUgYnVmZmVyU3VtOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIG1hcmdpbiA9IHtcbiAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgcmlnaHQ6IDEwLFxuICAgICAgICBib3R0b206IDQwLFxuICAgICAgICBsZWZ0OiA0MFxuICAgIH07XG4gICAgcHJpdmF0ZSBtYXhMYWJlbHdpZHRoID0gMDtcbiAgICBwcml2YXRlIG9wYWMgPSB7XG4gICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgIGhvdmVyOiAwLjMsXG4gICAgICAgIGNsaWNrOiAwLjVcbiAgICB9O1xuICAgIHByaXZhdGUgYWRkTGluZVdpZHRoID0gMjsgLy8gdmFsdWUgYWRkZWQgdG8gbGluZXdpZHRoXG4gICAgcHJpdmF0ZSBsb2FkaW5nQ291bnRlciA9IDA7XG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZUlkOiBzdHJpbmc7XG5cbiAgICAvLyBkZWZhdWx0IHBsb3Qgb3B0aW9uc1xuICAgIHByaXZhdGUgcGxvdE9wdGlvbnM6IEQzUGxvdE9wdGlvbnMgPSB7XG4gICAgICAgIHNob3dSZWZlcmVuY2VWYWx1ZXM6IGZhbHNlLFxuICAgICAgICBnZW5lcmFsaXplQWxsd2F5czogdHJ1ZSxcbiAgICAgICAgdG9nZ2xlUGFuWm9vbTogdHJ1ZSxcbiAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxuICAgICAgICBob3ZlclN0eWxlOiBIb3ZlcmluZ1N0eWxlLnBvaW50LFxuICAgICAgICBncmlkOiB0cnVlLFxuICAgICAgICB5YXhpczogdHJ1ZSxcbiAgICAgICAgb3ZlcnZpZXc6IGZhbHNlLFxuICAgICAgICBzaG93VGltZUxhYmVsOiB0cnVlLFxuICAgICAgICByZXF1ZXN0QmVmb3JlQWZ0ZXJWYWx1ZXM6IGZhbHNlXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlOiBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNlcnZpY2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVJZCA9IHRoaXMudXVpZHY0KCk7XG4gICAgICAgIC8vIHRoaXMuZG90c09iamVjdHMgPSBbXTtcblxuICAgICAgICB0aGlzLnJhd1N2ZyA9IGQzLnNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1heExhYmVsd2lkdGgpICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLmdyYXBoRm9jdXMgPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1heExhYmVsd2lkdGgpICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBkYXRhc2V0SWRzLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpZCksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRGF0YXNldChpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwaS5nZXRTaW5nbGVUaW1lc2VyaWVzKGlkLCB1cmwpLnN1YnNjcmliZShcbiAgICAgICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLmxvYWRBZGRlZERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KGlkLCB1cmwpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKGRhdGFzZXQpID0+IHRoaXMubG9hZEFkZGVkRGF0YXNldChkYXRhc2V0KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhWXJhbmdlcyA9IFtdO1xuICAgICAgICB0aGlzLnhBeGlzUmFuZ2VPcmlnaW4gPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgbGV0IHNwbGljZUlkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAoc3BsaWNlSWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnNwbGljZShzcGxpY2VJZHgsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0RhdGEoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBzZXRTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0c0RhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlKSA9PiBlLmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAoIXRzRGF0YS5zZWxlY3RlZCB8fCB0c0RhdGEuc2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdHNEYXRhLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggKz0gdGhpcy5hZGRMaW5lV2lkdGg7XG4gICAgICAgICAgICB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgPiAwID8gdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzICs9IHRoaXMuYWRkTGluZVdpZHRoIDogdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzICs9IDA7XG4gICAgICAgICAgICB0c0RhdGEuYmFycy5saW5lV2lkdGggKz0gdGhpcy5hZGRMaW5lV2lkdGg7XG5cbiAgICAgICAgICAgIGlmICh0c0RhdGEuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyB8fCAhdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3Rvcih0c0RhdGEuaW50ZXJuYWxJZCwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbaW50ZXJuYWxJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpbnRlcm5hbElkXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gdHNEYXRhLmF4aXNPcHRpb25zLnVvbTtcbiAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdVb20gPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmQoZWwgPT4gZWwudW9tID09PSBpZGVudGlmaWVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VvbS5pZHMuZmluZEluZGV4KGVsID0+IGVsID09PSBpbnRlcm5hbElkKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllciwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzLnB1c2goaW50ZXJuYWxJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgYXhpcyBmb3IgdW9tIG9mIGRhdGFzZXQgd2l0aCBzZWxlY3RlZCBpbnRlcm5hbElkXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VvbSAhPT0gdW5kZWZpbmVkICYmIGV4aXN0aW5nVW9tLmlkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGhpZ2hsaWdodCBheGlzIG9mIHVvbSBpZiBhbGwgZGF0YXNldHMgd2l0aCB0aGlzIHVvbSBhcmUgaGlnaGxpZ2h0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvdW50IGRhdGFzZXRzIGZvciBzcGVjaWZpYyB1b21cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcy5sZW5ndGggIT09IGV4aXN0aW5nVW9tLmlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdHNEYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKHRzRGF0YS5zZWxlY3RlZCB8fCB0c0RhdGEuc2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdHNEYXRhLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0c0RhdGEubGluZXMubGluZVdpZHRoIC09IHRoaXMuYWRkTGluZVdpZHRoO1xuICAgICAgICAgICAgdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzID4gMCA/IHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyAtPSB0aGlzLmFkZExpbmVXaWR0aCA6IHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyAtPSAwO1xuICAgICAgICAgICAgdHNEYXRhLmJhcnMubGluZVdpZHRoIC09IHRoaXMuYWRkTGluZVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAodHNEYXRhLmF4aXNPcHRpb25zLnNlcGFyYXRlWUF4aXMgfHwgIXRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IodHNEYXRhLmludGVybmFsSWQsIHRzRGF0YS5heGlzT3B0aW9ucy51b20pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W3RzRGF0YS5pbnRlcm5hbElkXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W3RzRGF0YS5pbnRlcm5hbElkXS5jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W3RzRGF0YS5pbnRlcm5hbElkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFt0c0RhdGEuaW50ZXJuYWxJZF0uaWRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gdHNEYXRhLmF4aXNPcHRpb25zLnVvbTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKGlkZW50aWZpZXIsIHRzRGF0YS5heGlzT3B0aW9ucy51b20pO1xuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzID0gdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMuZmlsdGVyKGVsID0+IGVsICE9PSBpbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogRDNQbG90T3B0aW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLm9sZEdyb3VwWWF4aXMgPSB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXM7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgIT09IEhvdmVyaW5nU3R5bGUucG9pbnQgJiYgb3B0aW9ucy5ob3ZlclN0eWxlID09PSBIb3ZlcmluZ1N0eWxlLnBvaW50KSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJ2cuZDNsaW5lJykuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnBsb3RPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMucmF3U3ZnICYmIHRoaXMueVJhbmdlc0VhY2hVb20pIHtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIGRhdGFzZXRPcHRpb25zQ2hhbmdlZChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zLCBmaXJzdENoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlICYmIHRoaXMuZGF0YXNldE1hcC5oYXMoaW50ZXJuYWxJZCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXREYXRhKHRoaXMuZGF0YXNldE1hcC5nZXQoaW50ZXJuYWxJZCksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgdGltZUludGVydmFsQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGRhdGFzZXQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXREYXRhKGRhdGFzZXQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2VudGVyVGltZSh0aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBjZW50ZXJlZFRpbWVzcGFuID0gdGhpcy50aW1lU3J2Yy5jZW50ZXJUaW1lc3Bhbih0aGlzLnRpbWVzcGFuLCBuZXcgRGF0ZSh0aW1lc3RhbXApKTtcbiAgICAgICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlZC5lbWl0KGNlbnRlcmVkVGltZXNwYW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVGltZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlZC5lbWl0KG5ldyBUaW1lc3Bhbihmcm9tLCB0bykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEFkZGVkRGF0YXNldChkYXRhc2V0OiBJRGF0YXNldCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgZGF0YXNldCk7XG4gICAgICAgIHRoaXMubG9hZERhdGFzZXREYXRhKGRhdGFzZXQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBsb2FkIGRhdGEgb2YgZGF0YXNldFxuICAgIHByaXZhdGUgbG9hZERhdGFzZXREYXRhKGRhdGFzZXQ6IElEYXRhc2V0LCBmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhc2V0T3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdDb3VudGVyID09PSAwKSB7IHRoaXMub25Db250ZW50TG9hZGluZy5lbWl0KHRydWUpOyB9XG4gICAgICAgIHRoaXMubG9hZGluZ0NvdW50ZXIrKztcblxuICAgICAgICBpZiAoZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aGlzLnRpbWVzcGFuLCAwLjIpO1xuXG4gICAgICAgICAgICB0aGlzLmFwaS5nZXRUc0RhdGE8W251bWJlciwgbnVtYmVyXT4oZGF0YXNldC5pZCwgZGF0YXNldC51cmwsIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2Zsb3QnLFxuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogdGhpcy5wbG90T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzIHx8IHRoaXMucGxvdE9wdGlvbnMucmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICBnZW5lcmFsaXplOiB0aGlzLnBsb3RPcHRpb25zLmdlbmVyYWxpemVBbGx3YXlzIHx8IGRhdGFzZXRPcHRpb25zLmdlbmVyYWxpemVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHsgZm9yY2VVcGRhdGU6IGZvcmNlIH1cbiAgICAgICAgICAgICkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMucHJlcGFyZVRzRGF0YShkYXRhc2V0LCByZXN1bHQpLFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm9uQ29tcGxldGVMb2FkaW5nRGF0YSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlTG9hZGluZ0RhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZGluZ0NvdW50ZXItLTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvdW50ZXIgPT09IDApIHsgdGhpcy5vbkNvbnRlbnRMb2FkaW5nLmVtaXQoZmFsc2UpOyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gcHJlcGFyZSBlYWNoIGRhdGFzZXQgZm9yIHRoZSBncmFwaCBhbmQgYWRkaW5nIGl0IHRvIGFuIGFycmF5IG9mIGRhdGFzZXRzLlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHtJRGF0YXNldH0gT2JqZWN0IG9mIHRoZSB3aG9sZSBkYXRhc2V0XG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlVHNEYXRhKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBEYXRhPFtudW1iZXIsIG51bWJlcl0+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gYWRkIHN1cnJvdW5kaW5nIGVudHJpZXMgdG8gdGhlIHNldFxuICAgICAgICBpZiAoZGF0YS52YWx1ZUJlZm9yZVRpbWVzcGFuKSB7IGRhdGEudmFsdWVzLnVuc2hpZnQoZGF0YS52YWx1ZUJlZm9yZVRpbWVzcGFuKTsgfVxuICAgICAgICBpZiAoZGF0YS52YWx1ZUFmdGVyVGltZXNwYW4pIHsgZGF0YS52YWx1ZXMucHVzaChkYXRhLnZhbHVlQWZ0ZXJUaW1lc3Bhbik7IH1cblxuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCkuZGF0YSA9IGRhdGE7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRJZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcblxuICAgICAgICAvLyBUT0RPOiBjaGFuZ2UgdW9tIGZvciB0ZXN0aW5nXG4gICAgICAgIC8vIGlmICh0aGlzLnByZXBhcmVkRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICBkYXRhc2V0LnVvbSA9ICdtYyc7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBnZW5lcmF0ZSByYW5kb20gY29sb3IsIGlmIGNvbG9yIGlzIG5vdCBkZWZpbmVkXG4gICAgICAgIGlmIChzdHlsZXMuY29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5jb2xvclNlcnZpY2UuZ2V0Q29sb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuZCBvZiBjaGVjayBmb3IgZGF0YXNldHNcbiAgICAgICAgY29uc3QgZGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSA9IHtcbiAgICAgICAgICAgIGludGVybmFsSWQ6IGRhdGFzZXQuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgIGlkOiAoZGF0YXNldElkeCA+PSAwID8gZGF0YXNldElkeCA6IHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCksXG4gICAgICAgICAgICBjb2xvcjogc3R5bGVzLmNvbG9yLFxuICAgICAgICAgICAgZGF0YTogc3R5bGVzLnZpc2libGUgPyBkYXRhLnZhbHVlcy5tYXAoZCA9PiAoeyB0aW1lc3RhbXA6IGRbMF0sIHZhbHVlOiBkWzFdIH0pKSA6IFtdLFxuICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgZmlsbENvbG9yOiBzdHlsZXMuY29sb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogc3R5bGVzLmxpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICBwb2ludFJhZGl1czogc3R5bGVzLnBvaW50UmFkaXVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFyczoge1xuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogc3R5bGVzLmxpbmVXaWR0aFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF4aXNPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgdW9tOiBkYXRhc2V0LnVvbSxcbiAgICAgICAgICAgICAgICBsYWJlbDogZGF0YXNldC5sYWJlbCxcbiAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IHN0eWxlcy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICB5QXhpc1JhbmdlOiBzdHlsZXMueUF4aXNSYW5nZSxcbiAgICAgICAgICAgICAgICBhdXRvUmFuZ2VTZWxlY3Rpb246IHN0eWxlcy5hdXRvUmFuZ2VTZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgc2VwYXJhdGVZQXhpczogc3R5bGVzLnNlcGFyYXRlWUF4aXMsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlOiBkYXRhc2V0LnBhcmFtZXRlcnMuZmVhdHVyZSxcbiAgICAgICAgICAgICAgICAgICAgcGhlbm9tZW5vbjogZGF0YXNldC5wYXJhbWV0ZXJzLnBoZW5vbWVub24sXG4gICAgICAgICAgICAgICAgICAgIG9mZmVyaW5nOiBkYXRhc2V0LnBhcmFtZXRlcnMub2ZmZXJpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogc3R5bGVzLnZpc2libGVcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc2VwYXJhdGlvbklkeDogbnVtYmVyID0gdGhpcy5saXN0T2ZTZXBhcmF0aW9uLmZpbmRJbmRleCgoaWQpID0+IGlkID09PSBkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgIGlmIChzZXBhcmF0aW9uSWR4IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbi5wdXNoKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RPZlNlcGFyYXRpb24gPSB0aGlzLmxpc3RPZlNlcGFyYXRpb24uZmlsdGVyKGVudHJ5ID0+IGVudHJ5ICE9PSBkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWx0ZXJuYXRpdmUgbGluZXdXaWR0aCA9IHRoaXMucGxvdE9wdGlvbnMuc2VsZWN0ZWQuaW5jbHVkZXMoZGF0YXNldC51b20pXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKGRhdGFzZXQuaW50ZXJuYWxJZCkgPj0gMCkge1xuICAgICAgICAgICAgZGF0YUVudHJ5LmxpbmVzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcbiAgICAgICAgICAgIGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyA+IDAgPyBkYXRhRW50cnkubGluZXMucG9pbnRSYWRpdXMgKz0gdGhpcy5hZGRMaW5lV2lkdGggOiBkYXRhRW50cnkubGluZXMucG9pbnRSYWRpdXMgKz0gMDtcbiAgICAgICAgICAgIGRhdGFFbnRyeS5iYXJzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHN0eWxlcy5zZXBhcmF0ZVlBeGlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3RvcihkYXRhRW50cnkuaW50ZXJuYWxJZCwgZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5pbnRlcm5hbElkXS5pZHMucHVzaChkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgc2VsZWN0ZWQgZGF0YXNldHMgZm9yIGhpZ2hsaWdodGluZ1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCkge1xuICAgICAgICAgICAgaWYgKHN0eWxlcy5zZXBhcmF0ZVlBeGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLmZpbmRJbmRleChlbCA9PiBlbCA9PT0gZGF0YUVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVkID0gdGhpcy5jb3VudEdyb3VwZWREYXRhc2V0cyhkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tLCBkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dLmlkcy5sZW5ndGggPT09IGNvdW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5pbnRlcm5hbElkXSAmJiB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5pbnRlcm5hbElkXS5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5heGlzT3B0aW9ucy51b21dLmlkcy5wdXNoKGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnlBeGlzU2VsZWN0W2RhdGFFbnRyeS5pbnRlcm5hbElkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YXNldElkeCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YVtkYXRhc2V0SWR4XSA9IGRhdGFFbnRyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2goZGF0YUVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFJlZmVyZW5jZVZhbHVlRGF0YShkYXRhc2V0LmludGVybmFsSWQsIHN0eWxlcywgZGF0YSwgZGF0YXNldC51b20pO1xuICAgICAgICB0aGlzLnByb2Nlc3NEYXRhKGRhdGFFbnRyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYWRkIHJlZmVyZW5jZXZhbHVlZGF0YSB0byB0aGUgZGF0YXNldCAoZS5nLiBtZWFuKS5cbiAgICAgKiBAcGFyYW0gaW50ZXJuYWxJZCB7U3RyaW5nfSBTdHJpbmcgd2l0aCB0aGUgaWQgb2YgYSBkYXRhc2V0XG4gICAgICogQHBhcmFtIHN0eWxlcyB7RGF0YXNldE9wdGlvbnN9IE9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGZvciBkYXRhc2V0IHN0eWxpbmdcbiAgICAgKiBAcGFyYW0gZGF0YSB7RGF0YX0gQXJyYXkgb2YgQXJyYXlzIGNvbnRhaW5pbmcgdGhlIG1lYXN1cmVtZW50LWRhdGEgb2YgdGhlIGRhdGFzZXRcbiAgICAgKiBAcGFyYW0gdW9tIHtTdHJpbmd9IFN0cmluZyB3aXRoIHRoZSB1b20gb2YgYSBkYXRhc2V0XG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRSZWZlcmVuY2VWYWx1ZURhdGEoaW50ZXJuYWxJZDogc3RyaW5nLCBzdHlsZXM6IERhdGFzZXRPcHRpb25zLCBkYXRhOiBEYXRhPFtudW1iZXIsIG51bWJlcl0+LCB1b206IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhZW50cnkuaW50ZXJuYWxJZC5zdGFydHNXaXRoKCdyZWYnICsgaW50ZXJuYWxJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzKSB7XG4gICAgICAgICAgICBzdHlsZXMuc2hvd1JlZmVyZW5jZVZhbHVlcy5mb3JFYWNoKChyZWZWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZkRhdGFFbnRyeTogSW50ZXJuYWxEYXRhRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVybmFsSWQ6ICdyZWYnICsgaW50ZXJuYWxJZCArIHJlZlZhbHVlLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmVmVmFsdWUuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEucmVmZXJlbmNlVmFsdWVzW3JlZlZhbHVlLmlkXS5tYXAoZCA9PiAoeyB0aW1lc3RhbXA6IGRbMF0sIHZhbHVlOiBkWzFdIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHJlZlZhbHVlLmNvbG9yXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogdW9tXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2gocmVmRGF0YUVudHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIGRhdGEgdG8gY2FsY3VsYXRlIHkgYXhpcyByYW5nZSBvZiBlYWNoIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGRhdGFFbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBkYXRhc2V0IHJlbGF0ZWQgZGF0YS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0RhdGEoZGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSk6IHZvaWQge1xuICAgICAgICBsZXQgY2FsY3VsYXRlZFJhbmdlOiBNaW5NYXhSYW5nZTtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRQcmVSYW5nZTogTWluTWF4UmFuZ2U7XG4gICAgICAgIGxldCBjYWxjdWxhdGVkT3JpZ2luUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBsZXQgcHJlZGVmaW5lZFJhbmdlOiBNaW5NYXhSYW5nZTtcbiAgICAgICAgaWYgKGRhdGFFbnRyeS5heGlzT3B0aW9ucy55QXhpc1JhbmdlICYmIGRhdGFFbnRyeS5heGlzT3B0aW9ucy55QXhpc1JhbmdlLm1pbiAhPT0gZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UubWF4KSB7XG4gICAgICAgICAgICBwcmVkZWZpbmVkUmFuZ2UgPSBkYXRhRW50cnkuYXhpc09wdGlvbnMueUF4aXNSYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXV0b0RhdGFFeHRlbnQ6IGJvb2xlYW4gPSBkYXRhRW50cnkuYXhpc09wdGlvbnMuYXV0b1JhbmdlU2VsZWN0aW9uO1xuXG4gICAgICAgIC8vIGdldCBtaW4gYW5kIG1heCB2YWx1ZSBvZiBkYXRhXG4gICAgICAgIGNvbnN0IGRhdGFFeHRlbnQgPSBkMy5leHRlbnQ8RGF0YUVudHJ5LCBudW1iZXI+KGRhdGFFbnRyeS5kYXRhLCAoZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNhbGN1bGF0ZWRPcmlnaW5SYW5nZSA9IHsgbWluOiBkYXRhRXh0ZW50WzBdLCBtYXg6IGRhdGFFeHRlbnRbMV0gfTtcblxuICAgICAgICBsZXQgc2V0RGF0YUV4dGVudCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBvdXQgb2YgcHJlZGVmaW5lZCByYW5nZVxuICAgICAgICBpZiAocHJlZGVmaW5lZFJhbmdlICYmICF0aGlzLnBsb3RPcHRpb25zLm92ZXJ2aWV3KSB7XG4gICAgICAgICAgICBpZiAocHJlZGVmaW5lZFJhbmdlLm1pbiA+IHByZWRlZmluZWRSYW5nZS5tYXgpIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1heCwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWluIH07XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFByZVJhbmdlID0geyBtaW46IHByZWRlZmluZWRSYW5nZS5tYXgsIG1heDogcHJlZGVmaW5lZFJhbmdlLm1pbiB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1pbiwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWF4IH07XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFByZVJhbmdlID0geyBtaW46IHByZWRlZmluZWRSYW5nZS5taW4sIG1heDogcHJlZGVmaW5lZFJhbmdlLm1heCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZWRlZmluZWRSYW5nZS5taW4gPiBkYXRhRXh0ZW50WzFdIHx8IHByZWRlZmluZWRSYW5nZS5tYXggPCBkYXRhRXh0ZW50WzBdKSB7XG4gICAgICAgICAgICAgICAgc2V0RGF0YUV4dGVudCA9IGF1dG9EYXRhRXh0ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0RGF0YUV4dGVudCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2V0RGF0YUV4dGVudCkge1xuICAgICAgICAgICAgY2FsY3VsYXRlZFJhbmdlID0geyBtaW46IGRhdGFFeHRlbnRbMF0sIG1heDogZGF0YUV4dGVudFsxXSB9O1xuICAgICAgICAgICAgdGhpcy5leHRlbmRSYW5nZShjYWxjdWxhdGVkUmFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgc3R5bGUgb3B0aW9uICd6ZXJvIGJhc2VkIHktYXhpcycgaXMgY2hlY2tlZCxcbiAgICAgICAgLy8gdGhlIGF4aXMgd2lsbCBiZSBhbGlnbmVkIHRvIHRvcCAwICh3aXRoIGRhdGEgYmVsb3cgMCkgb3IgdG8gYm90dG9tIDAgKHdpdGggZGF0YSBhYm92ZSAwKVxuICAgICAgICAvLyBsZXQgemVyb0Jhc2VkVmFsdWUgPSAtMTtcbiAgICAgICAgaWYgKGRhdGFFbnRyeS5heGlzT3B0aW9ucy56ZXJvQmFzZWQgJiYgIXRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgIGlmIChkYXRhRXh0ZW50WzFdIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UubWF4ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRlZFByZVJhbmdlKSB7IGNhbGN1bGF0ZWRQcmVSYW5nZS5tYXggPSAwOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YUV4dGVudFswXSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFJhbmdlLm1pbiA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0ZWRQcmVSYW5nZSkgeyBjYWxjdWxhdGVkUHJlUmFuZ2UubWluID0gMDsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3RGF0YXNldElkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG5cbiAgICAgICAgLy8gc2V0IHJhbmdlLCB1b20gYW5kIGlkIGZvciBlYWNoIGRhdGFzZXRcbiAgICAgICAgaWYgKGRhdGFFbnRyeS52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdID0ge1xuICAgICAgICAgICAgICAgIHVvbTogZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbSxcbiAgICAgICAgICAgICAgICBpZDogZGF0YUVudHJ5LmludGVybmFsSWQsXG4gICAgICAgICAgICAgICAgemVyb0Jhc2VkOiBkYXRhRW50cnkuYXhpc09wdGlvbnMuemVyb0Jhc2VkLFxuICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IHNldERhdGFFeHRlbnQsXG4gICAgICAgICAgICAgICAgYXV0b1JhbmdlOiBhdXRvRGF0YUV4dGVudCxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBkYXRhRW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZShjYWxjdWxhdGVkUmFuZ2UubWluKSAmJiBpc0Zpbml0ZShjYWxjdWxhdGVkUmFuZ2UubWF4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0ucmFuZ2UgPSBjYWxjdWxhdGVkUmFuZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XS5wcmVSYW5nZSA9IGNhbGN1bGF0ZWRQcmVSYW5nZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdLm9yaWdpblJhbmdlID0gY2FsY3VsYXRlZE9yaWdpblJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgcmFuZ2UgYW5kIGFycmF5IG9mIElEcyBmb3IgZWFjaCB1b20gdG8gZ2VuZXJhdGUgeS1heGlzIGxhdGVyIG9uXG4gICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20gPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhWXJhbmdlcy5mb3JFYWNoKCh5UmFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmICh5UmFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmRJbmRleCgoZSkgPT4gZS51b20gPT09IHlSYW5nZS51b20pO1xuICAgICAgICAgICAgICAgIGxldCB5cmFuZ2VPYmo6IFlSYW5nZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVvbTogeVJhbmdlLnVvbSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHlSYW5nZS5yYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgcHJlUmFuZ2U6IHlSYW5nZS5wcmVSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luUmFuZ2U6IHlSYW5nZS5vcmlnaW5SYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgaWRzOiBbeVJhbmdlLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgemVyb0Jhc2VkOiB5UmFuZ2UuemVyb0Jhc2VkLFxuICAgICAgICAgICAgICAgICAgICBvdXRPZnJhbmdlOiB5UmFuZ2Uub3V0T2ZyYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b1JhbmdlOiB5UmFuZ2UuYXV0b1JhbmdlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB5UmFuZ2UucGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5yYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHlSYW5nZS5yYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0uYXV0b1JhbmdlIHx8IHlSYW5nZS5hdXRvUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHlSYW5nZS5wcmVSYW5nZSAmJiB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ucHJlUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAncHJlUmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5yYW5nZSA9IHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5wcmVSYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAncmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0uYXV0b1JhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLm91dE9mcmFuZ2UgIT09IHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5vdXRPZnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ3VycmVudExhdGVzdChpZHgsIHlSYW5nZSwgJ29yaWdpblJhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ucmFuZ2UgPSB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0ub3JpZ2luUmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ3VycmVudExhdGVzdChpZHgsIHlSYW5nZSwgJ3JhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRha2VMYXRlc3QoaWR4LCB5UmFuZ2UsICdyYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLmlkcy5wdXNoKHlSYW5nZS5pZCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLnB1c2goeXJhbmdlT2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5ncmFwaCkge1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNldCByYW5nZSB0byBkZWZhdWx0IGludGVydmFsLCBpZiBtaW4gYW5kIG1heCBvZiByYW5nZSBhcmUgbm90IHNldC5cbiAgICAgKiBAcGFyYW0gcmFuZ2Uge01pbk1heFJhbmdlfSByYW5nZSB0byBiZSBzZXRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZXh0ZW5kUmFuZ2UocmFuZ2U6IE1pbk1heFJhbmdlKTogdm9pZCB7XG4gICAgICAgIGlmIChyYW5nZS5taW4gPT09IHJhbmdlLm1heCkge1xuICAgICAgICAgICAgcmFuZ2UubWluID0gcmFuZ2UubWluIC0gMTtcbiAgICAgICAgICAgIHJhbmdlLm1heCA9IHJhbmdlLm1heCArIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjaGVjayByYW5nZXMgZm9yIG1pbiBhbmQgbWF4IHJhbmdlLlxuICAgICAqIEBwYXJhbSBpZHgge051bWJlcn0gSW5kZXggb2YgZWxlbWVudFxuICAgICAqIEBwYXJhbSBvYmoge1lSYW5nZXN9IG5ldyBvYmplY3QgdG8gYmUgY29tcGFyZWQgd2l0aCBvbGRcbiAgICAgKiBAcGFyYW0gcG9zIHtTdHJpbmd9IHR5cGUgb2YgcmFuZ2UgKGUuZy4gcHJlUmFuZ2UsIHJhbmdlLCBvcmlnaW5SYW5nZSlcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrQ3VycmVudExhdGVzdChpZHg6IG51bWJlciwgb2JqOiBZUmFuZ2VzLCBwb3M6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10ubWluID4gb2JqW3Bvc10ubWluICYmICFpc05hTihvYmpbcG9zXS5taW4pKSB7XG4gICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5taW4gPSBvYmpbcG9zXS5taW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdLm1heCA8IG9ialtwb3NdLm1heCAmJiAhaXNOYU4ob2JqW3Bvc10ubWF4KSkge1xuICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10ubWF4ID0gb2JqW3Bvc10ubWF4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2V0IG1pbiBhbmQgbWF4IHJhbmdlLlxuICAgICAqIEBwYXJhbSBpZHgge051bWJlcn0gSW5kZXggb2YgZWxlbWVudFxuICAgICAqIEBwYXJhbSBvYmoge1lSYW5nZXN9IG5ldyBvYmplY3RcbiAgICAgKiBAcGFyYW0gcG9zIHtTdHJpbmd9IHR5cGUgb2YgcmFuZ2UgKGUuZy4gcHJlUmFuZ2UsIHJhbmdlLCBvcmlnaW5SYW5nZSlcbiAgICAgKi9cbiAgICBwcml2YXRlIHRha2VMYXRlc3QoaWR4OiBudW1iZXIsIG9iajogWVJhbmdlcywgcG9zOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10gPSBvYmpbcG9zXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgZ3JhcGggZGlhZ3JhbS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMuZDNFbGVtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsaWVudEhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbSArICh0aGlzLnBsb3RPcHRpb25zLnNob3dUaW1lTGFiZWwgPyAwIDogMjApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQgLSB0aGlzLm1heExhYmVsd2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSByYW5nZSBmb3IgYnVpbGRpbmcgdGhlIHkgYXhpcyBmb3IgZWFjaCB1b20gb2YgZXZlcnkgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gdW9tIHtTdHJpbmd9IFN0cmluZyB0aGF0IGlzIHRoZSB1b20gb2YgYSBkYXRhc2V0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXR5QXhpc1JhbmdlKHVvbTogc3RyaW5nKTogTWluTWF4UmFuZ2Uge1xuICAgICAgICBsZXQgcmFuZ2VPYmogPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmQoZWwgPT4gZWwudW9tID09PSB1b20pO1xuICAgICAgICBpZiAocmFuZ2VPYmopIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB6ZXJvIGJhc2VkIHkgYXhpc1xuICAgICAgICAgICAgLy8gaWYgKHJhbmdlT2JqLnplcm9CYXNlZCkge1xuICAgICAgICAgICAgLy8gICAgIGlmIChyYW5nZU9iai56ZXJvQmFzZWRWYWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByYW5nZS5taW4gPSAwO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJhbmdlLm1heCA9IDA7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlT2JqLnJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsOyAvLyBlcnJvcjogdW9tIGRvZXMgbm90IGV4aXN0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gcGxvdCB0aGUgZ3JhcGggYW5kIGl0cyBkZXBlbmRlbmNpZXNcbiAgICAgKiAoZ3JhcGggbGluZSwgZ3JhcGggYXhlcywgZXZlbnQgaGFuZGxlcnMpXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHBsb3RHcmFwaCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRPdXRwdXQgPSB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IDAsXG4gICAgICAgICAgICBpZHM6IG5ldyBNYXAoKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXRoaXMueVJhbmdlc0VhY2hVb20pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMubGlzdE9mVW9tcy5maW5kSW5kZXgoKHVvbSkgPT4gdW9tID09PSBlbnRyeS5heGlzT3B0aW9ucy51b20pO1xuICAgICAgICAgICAgaWYgKGlkeCA8IDApIHsgdGhpcy5saXN0T2ZVb21zLnB1c2goZW50cnkuYXhpc09wdGlvbnMudW9tKTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhZGFwdCBheGlzIGhpZ2hsaWdodGluZywgd2hlbiBjaGFuZ2luZyBncm91cGluZyBvZiB5IGF4aXNcbiAgICAgICAgaWYgKHRoaXMub2xkR3JvdXBZYXhpcyAhPT0gdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVlzZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlV2lkdGgoKTtcbiAgICAgICAgdGhpcy5ncmFwaC5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5ncmFwaEZvY3VzLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyU3VtID0gMDtcbiAgICAgICAgdGhpcy55U2NhbGVCYXNlID0gbnVsbDtcblxuICAgICAgICAvLyBnZXQgcmFuZ2Ugb2YgeCBhbmQgeSBheGlzXG4gICAgICAgIHRoaXMueEF4aXNSYW5nZSA9IHRoaXMudGltZXNwYW47XG5cbiAgICAgICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAgICAgbGV0IHlBeGlzQXJyYXk6IFlSYW5nZXNbXSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB5QXhpc0FycmF5ID0gdGhpcy55UmFuZ2VzRWFjaFVvbTtcbiAgICAgICAgICAgIC8vIHB1c2ggYWxsIGxpc3RPZlNlcGFyYXRpb24gaW50byB5QXhpc0FycmF5XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0T2ZTZXBhcmF0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RPZlNlcGFyYXRpb24uZm9yRWFjaCgoc2VwSWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0VsOiBZUmFuZ2VzID0gdGhpcy5kYXRhWXJhbmdlcy5maW5kKChlbCkgPT4gZWwgIT09IG51bGwgJiYgZWwuaWQgPT09IHNlcElkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0VsICYmICh5QXhpc0FycmF5LmZpbmRJbmRleChlbCA9PiBlbC5pZCA9PT0gbmV3RWwuaWQpIDwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBkYXRhc2V0IGZvciBzcGVjaWZpYyB1b20gYXJlIHNlcGFyYXRlZCBmcm9tIGdyb3VwaW5nLCB0aGUgeWF4aXMgb2YgdGhpcyB1b20gd2lsbCBiZSByZW1vdmVkIGZyb20gYXhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nVW9tID0geUF4aXNBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwudW9tID09PSBuZXdFbC51b20gJiYgKGVsLmlkcyAhPT0gdW5kZWZpbmVkIHx8IGVsLmlkcy5sZW5ndGggPT09IDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VvbSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIGlkIGZyb20gaWRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlbGV0ZUlkID0geUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLmZpbmRJbmRleChpZCA9PiBpZCA9PT0gc2VwSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWxldGVJZCA+PSAwKSB7IHlBeGlzQXJyYXlbZXhpc3RpbmdVb21dLmlkcy5zcGxpY2UoZGVsZXRlSWQsIDEpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHlBeGlzQXJyYXlbZXhpc3RpbmdVb21dLmlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIHlBeGlzQXJyYXlbZXhpc3RpbmdVb21dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlBeGlzQXJyYXkuc3BsaWNlKGV4aXN0aW5nVW9tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB5QXhpc0FycmF5LnB1c2gobmV3RWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5QXhpc0FycmF5ID0gdGhpcy5kYXRhWXJhbmdlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHlBeGlzQXJyYXkuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZpcnN0ID0gKHRoaXMueVNjYWxlQmFzZSA9PT0gbnVsbCk7XG4gICAgICAgICAgICAgICAgZW50cnkub2Zmc2V0ID0gdGhpcy5idWZmZXJTdW07XG5cbiAgICAgICAgICAgICAgICBsZXQgeUF4aXNSZXN1bHQgPSB0aGlzLmRyYXdZYXhpcyhlbnRyeSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVNjYWxlQmFzZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSB5QXhpc1Jlc3VsdC55U2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyU3VtID0geUF4aXNSZXN1bHQuYnVmZmVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyU3VtID0geUF4aXNSZXN1bHQuYnVmZmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbnRyeS55U2NhbGUgPSB5QXhpc1Jlc3VsdC55U2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdGhpcy55U2NhbGVCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IHggYW5kIHkgYXhpc1xuICAgICAgICB0aGlzLmRyYXdYYXhpcyh0aGlzLmJ1ZmZlclN1bSk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGJhY2tncm91bmQgYXMgcmVjdGFuZ2xlIHByb3ZpZGluZyBwYW5uaW5nXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoIC0gdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignaWQnLCAnYmFja2dyb3VuZFJlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5idWZmZXJTdW0gKyAnLCAwKScpO1xuXG4gICAgICAgIHRoaXMuZHJhd0FsbEdyYXBoTGluZXMoKTtcbiAgICAgICAgdGhpcy5hZGRUaW1lc3Bhbkp1bXBCdXR0b25zKCk7XG5cbiAgICAgICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAgICAgLy8gY3JlYXRlIGJhY2tncm91bmQgcmVjdFxuICAgICAgICBpZiAoIXRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgd2hlbiBpdCBpcyBub3QgYW4gb3ZlcnZpZXcgZGlhZ3JhbVxuICAgICAgICAgICAgLy8gbW91c2UgZXZlbnRzIGhvdmVyaW5nXG4gICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ob3ZlcmFibGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ob3ZlclN0eWxlID09PSBIb3ZlcmluZ1N0eWxlLmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVMaW5lSG92ZXJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJ2cuZDNsaW5lJykuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnRvZ2dsZVBhblpvb20gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKGQzLnpvb20oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzdGFydCcsIHRoaXMuem9vbVN0YXJ0SGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignem9vbScsIHRoaXMuem9vbUhhbmRsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2VuZCcsIHRoaXMuem9vbUVuZEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgICAuY2FsbChkMy5kcmFnKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc3RhcnQnLCB0aGlzLnBhblN0YXJ0SGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZHJhZycsIHRoaXMucGFuTW92ZUhhbmRsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2VuZCcsIHRoaXMucGFuRW5kSGFuZGxlcikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvcHlyaWdodExhYmVsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBleGVjdXRlIHdoZW4gaXQgaXMgb3ZlcnZpZXcgZGlhZ3JhbVxuICAgICAgICAgICAgbGV0IGludGVydmFsOiBbbnVtYmVyLCBudW1iZXJdID0gdGhpcy5nZXRYRG9tYWluQnlUaW1lc3RhbXAoKTtcbiAgICAgICAgICAgIGxldCBvdmVydmlld1RpbWVzcGFuSW50ZXJ2YWwgPSBbaW50ZXJ2YWxbMF0sIGludGVydmFsWzFdXTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGJydXNoXG4gICAgICAgICAgICBsZXQgYnJ1c2ggPSBkMy5icnVzaFgoKVxuICAgICAgICAgICAgICAgIC5leHRlbnQoW1swLCAwXSwgW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XV0pXG4gICAgICAgICAgICAgICAgLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9uIG1vdXNlY2xpY2sgY2hhbmdlIHRpbWUgYWZ0ZXIgYnJ1c2ggd2FzIG1vdmVkXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlZG93bkJydXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGltZUJ5Q29vcmQ6IFtudW1iZXIsIG51bWJlcl0gPSB0aGlzLmdldFRpbWVzdGFtcEJ5Q29vcmQoZDMuZXZlbnQuc2VsZWN0aW9uWzBdLCBkMy5ldmVudC5zZWxlY3Rpb25bMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKHRpbWVCeUNvb3JkWzBdLCB0aW1lQnlDb29yZFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZWRvd25CcnVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBhZGQgYnJ1c2ggdG8gc3ZnXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JydXNoJylcbiAgICAgICAgICAgICAgICAuY2FsbChicnVzaClcbiAgICAgICAgICAgICAgICAuY2FsbChicnVzaC5tb3ZlLCBvdmVydmlld1RpbWVzcGFuSW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGFkZCBldmVudCB0byBzZWxlY3Rpb24gdG8gcHJldmVudCB1bm5lY2Vzc2FyeSByZS1yZW5kZXJpbmcgb2YgYnJ1c2hcbiAgICAgICAgICAgICAqIGFkZCBzdHlsZSBvZiBicnVzaCBzZWxlY3Rpb24gaGVyZVxuICAgICAgICAgICAgICogZS5nLiAnZmlsbCcgZm9yIGNvbG9yLFxuICAgICAgICAgICAgICogJ3N0cm9rZScgZm9yIGJvcmRlcmxpbmUtY29sb3IsXG4gICAgICAgICAgICAgKiAnc3Ryb2tlLWRhc2hhcnJheScgZm9yIGN1c3RvbWl6aW5nIGJvcmRlcmxpbmUtc3R5bGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNlbGVjdEFsbCgnLnNlbGVjdGlvbicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZWRvd25CcnVzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCBhbGxvdyBjbGVhciBzZWxlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC5zZWxlY3RBbGwoJy5vdmVybGF5JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBldmVudCB0byByZXNpemluZyBoYW5kbGUgdG8gYWxsb3cgY2hhbmdlIHRpbWUgb24gcmVzaXplXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQuc2VsZWN0QWxsKCcuaGFuZGxlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAncmVkJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwLjMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZWRvd25CcnVzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVBvaW50SG92ZXJpbmcoZW50cnk6IEludGVybmFsRGF0YUVudHJ5LCBsaW5lOiBkMy5MaW5lPERhdGFFbnRyeT4pIHtcbiAgICAgICAgdGhpcy5ncmFwaEJvZHkuc2VsZWN0QWxsKCcuaG92ZXJEb3RzJylcbiAgICAgICAgICAgIC5kYXRhKGVudHJ5LmRhdGEuZmlsdGVyKChkKSA9PiAhaXNOYU4oZC52YWx1ZSkpKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hvdmVyRG90cycpXG4gICAgICAgICAgICAuYXR0cignaWQnLCAoZDogRGF0YUVudHJ5KSA9PiAnaG92ZXItZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICd0cmFuc3BhcmVudCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICd0cmFuc3BhcmVudCcpXG4gICAgICAgICAgICAuYXR0cignY3gnLCBsaW5lLngoKSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIGxpbmUueSgpKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBlbnRyeS5saW5lcy5wb2ludFJhZGl1cyArIDMpXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkOiBEYXRhRW50cnkpID0+IHRoaXMubW91c2VPdmVyUG9pbnRIb3ZlcmluZyhkLCBlbnRyeSkpXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgKGQ6IERhdGFFbnRyeSkgPT4gdGhpcy5tb3VzZU91dFBvaW50SG92ZXJpbmcoZCwgZW50cnkpKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24nLCAoZDogRGF0YUVudHJ5KSA9PiB0aGlzLmNsaWNrRGF0YVBvaW50KGQsIGVudHJ5KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lSG92ZXJpbmcoKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUuZm9jdXMnLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIpXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0LmZvY3VzJywgdGhpcy5tb3VzZW91dEhhbmRsZXIpO1xuICAgICAgICAvLyBsaW5lIGluc2lkZSBncmFwaFxuICAgICAgICB0aGlzLmhpZ2hsaWdodEZvY3VzID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6bGluZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGluZScpXG4gICAgICAgICAgICAuYXR0cigneDInLCAnMCcpXG4gICAgICAgICAgICAuYXR0cigneTInLCAnMCcpXG4gICAgICAgICAgICAuYXR0cigneDEnLCAnMCcpXG4gICAgICAgICAgICAuYXR0cigneTEnLCAnMCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsICcxcHgnKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIC8vIGxhYmVsIGluc2lkZSBncmFwaFxuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3QgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC13ZWlnaHQnLCAnbGlnaHRlcicpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2xhYmVsVGltZSA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLXRpbWUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0RhdGFQb2ludChkOiBEYXRhRW50cnksIGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgcG9pbnQnKTtcbiAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZXh0ZXJuYWxJZDogSW50ZXJuYWxEYXRhc2V0SWQgPSB0aGlzLmRhdGFzZXRJZFJlc29sdmVyLnJlc29sdmVJbnRlcm5hbElkKGVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgY29uc3QgYXBpdXJsID0gZXh0ZXJuYWxJZC51cmw7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3BhbjogVGltZXNwYW4gPSB7IGZyb206IGQudGltZXN0YW1wLCB0bzogZC50aW1lc3RhbXAgfTtcblxuICAgICAgICAgICAgLy8gcmVxdWVzdCBhbGwgdGltZXNlcmllcyB0aGF0IGhhdmUgZGF0YSBmb3IgdGhlIHNhbWUgb2ZmZXJpbmcgYW5kIGZlYXR1cmVcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFRpbWVzZXJpZXMoYXBpdXJsLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb2ZmZXJpbmc6IGVudHJ5LmF4aXNPcHRpb25zLnBhcmFtZXRlcnMub2ZmZXJpbmcuaWQsXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmU6IGVudHJ5LmF4aXNPcHRpb25zLnBhcmFtZXRlcnMuZmVhdHVyZS5pZFxuICAgICAgICAgICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHRzQXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzZXJpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRzQXJyYXkuZm9yRWFjaCh0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXNlcmllcy5wdXNoKHRzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IHRzIGRhdGEgYnkgdGltZXNlcmllcyBJRCBmb3Igc3BlY2lmaWMgb2ZmZXJpbmcgYW5kIGZlYXR1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldFRpbWVzZXJpZXNEYXRhKGFwaXVybCwgdGltZXNlcmllcywgdGltZXNwYW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRzRGF0YSkgPT4gdGhpcy5vbkNsaWNrRGF0YVBvaW50LmVtaXQodHNEYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUaW1lc3Bhbkp1bXBCdXR0b25zKCk6IHZvaWQge1xuICAgICAgICBsZXQgZGF0YVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgbGV0IGZvcm1lclRpbWVzdGFtcCA9IG51bGw7XG4gICAgICAgIGxldCBsYXRlclRpbWVzdGFtcCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnJlcXVlc3RCZWZvcmVBZnRlclZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJZHhJblRpbWVzcGFuID0gZW50cnkuZGF0YS5maW5kSW5kZXgoZSA9PiAodGhpcy50aW1lc3Bhbi5mcm9tIDwgZVswXSAmJiB0aGlzLnRpbWVzcGFuLnRvID4gZVswXSkgJiYgaXNGaW5pdGUoZVsxXSkpO1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdElkeEluVGltZXNwYW4gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJZHhJblRpbWVzcGFuID0gZW50cnkuZGF0YS5maW5kSW5kZXgoZSA9PiAoZVswXSA+IHRoaXMudGltZXNwYW4uZnJvbSAmJiBlWzBdID4gdGhpcy50aW1lc3Bhbi50bykgJiYgaXNGaW5pdGUoZVsxXSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdElkeEluVGltZXNwYW4gPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXJUaW1lc3RhbXAgPSBlbnRyeS5kYXRhW2VudHJ5LmRhdGEubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGVudHJ5LmRhdGEuZmluZEluZGV4KGUgPT4gKGVbMF0gPCB0aGlzLnRpbWVzcGFuLmZyb20gJiYgZVswXSA8IHRoaXMudGltZXNwYW4udG8pICYmIGlzRmluaXRlKGVbMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXAgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWVyVGltZXN0YW1wID0gZW50cnkuZGF0YVtlbnRyeS5kYXRhLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YVZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gNTA7XG4gICAgICAgICAgICBjb25zdCBsZWZ0UmlnaHQgPSAxNTtcbiAgICAgICAgICAgIGlmIChmb3JtZXJUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnID0gdGhpcy5iYWNrZ3JvdW5kLmFwcGVuZCgnZycpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmb3JtZXJCdXR0b24nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBidXR0b25XaWR0aCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJylcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2VudGVyVGltZShmb3JtZXJUaW1lc3RhbXApKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIDAgKyB0aGlzLmJ1ZmZlclN1bSArIGxlZnRSaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIHRoaXMuaGVpZ2h0IC8gMiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIDAgKyB0aGlzLmJ1ZmZlclN1bSArIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodCAvIDIgLSAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpIC8gMiArICdweCcpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgMCArIHRoaXMuYnVmZmVyU3VtICsgbGVmdFJpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgdGhpcy5oZWlnaHQgLyAyICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgMCArIHRoaXMuYnVmZmVyU3VtICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiArIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF0ZXJUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnID0gdGhpcy5iYWNrZ3JvdW5kLmFwcGVuZCgnZycpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsYXRlckJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICc1MHB4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMud2lkdGggLSA1MCkgKyAnLCAwKScpXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCAoKSA9PiB0aGlzLmNlbnRlclRpbWUobGF0ZXJUaW1lc3RhbXApKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIHRoaXMud2lkdGggLSBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCB0aGlzLndpZHRoIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiAtIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCB0aGlzLndpZHRoIC0gbGVmdFJpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgdGhpcy5oZWlnaHQgLyAyICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgdGhpcy53aWR0aCAtIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodCAvIDIgKyAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpIC8gMiArICdweCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDb3B5cmlnaHRMYWJlbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuY29weXJpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgYmFja2dyb3VuZCA9IHRoaXMuZ2V0RGltZW5zaW9ucyh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgPSB0b3AgbGVmdFxuICAgICAgICAgICAgbGV0IHggPSAwOyAvLyBsZWZ0XG4gICAgICAgICAgICBsZXQgeSA9IDA7IC8vICsgdGhpcy5tYXJnaW4udG9wOyAvLyB0b3BcbiAgICAgICAgICAgIHRoaXMuY29weXJpZ2h0ID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKTtcbiAgICAgICAgICAgIGxldCBjb3B5cmlnaHRMYWJlbCA9IHRoaXMuY29weXJpZ2h0LmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgICAgIC50ZXh0KHRoaXMucGxvdE9wdGlvbnMuY29weXJpZ2h0LmxhYmVsKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjb3B5cmlnaHQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ2dyZXknKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmNvcHlyaWdodC5wb3NpdGlvblggPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICB4ID0gYmFja2dyb3VuZC53IC0gdGhpcy5tYXJnaW4ucmlnaHQgLSB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS53O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuY29weXJpZ2h0LnBvc2l0aW9uWSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICB5ID0gYmFja2dyb3VuZC5oIC0gdGhpcy5tYXJnaW4udG9wICogMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB5VHJhbnNmb3JtID0geSArIHRoaXMuZ2V0RGltZW5zaW9ucyhjb3B5cmlnaHRMYWJlbC5ub2RlKCkpLmggLSAzO1xuICAgICAgICAgICAgbGV0IHhUcmFuc2Zvcm0gPSB0aGlzLmJ1ZmZlclN1bSArIHg7XG4gICAgICAgICAgICBjb3B5cmlnaHRMYWJlbFxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4VHJhbnNmb3JtICsgJywgJyArIHlUcmFuc2Zvcm0gKyAnKScpO1xuICAgICAgICAgICAgdGhpcy5jb3B5cmlnaHQuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvcHlyaWdodCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5nZXREaW1lbnNpb25zKGNvcHlyaWdodExhYmVsLm5vZGUoKSkudylcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5nZXREaW1lbnNpb25zKGNvcHlyaWdodExhYmVsLm5vZGUoKSkuaClcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgeFRyYW5zZm9ybSArICcsICcgKyB5ICsgJyknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIGZvciBldmVyeSBwcmVwcmFyZWQgZGF0YSBlbnRyeSB0aGUgZ3JhcGggbGluZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZHJhd0FsbEdyYXBoTGluZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNHID0gdGhpcy5ncmFwaEZvY3VzLmFwcGVuZCgnZycpO1xuICAgICAgICBpZiAoKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJTdHlsZSA9PT0gSG92ZXJpbmdTdHlsZS5wb2ludCkgJiYgIXRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBmb3IgcG9pbnQgaG92ZXJpbmdcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnJlY3QnKTtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4gdGhpcy5kcmF3R3JhcGhMaW5lKGVudHJ5KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjYWxjdWxhdGVzIGFuZCByZXR1cm5zIHRoZSB4IGRpYWdyYW0gY29vcmRpbmF0ZSBmb3IgdGhlIGJydXNoIHJhbmdlXG4gICAgICogZm9yIHRoZSBvdmVydmlldyBkaWFncmFtIGJ5IHRoZSBzZWxlY3RlZCB0aW1lIGludGVydmFsIG9mIHRoZSBtYWluIGRpYWdyYW0uXG4gICAgICogQ2FsY3VsYXRlIHRvIGdldCBicnVzaCBleHRlbnQgd2hlbiBtYWluIGRpYWdyYW0gdGltZSBpbnRlcnZhbCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0WERvbWFpbkJ5VGltZXN0YW1wKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogY2FsY3VsYXRlIHJhbmdlIG9mIGJydXNoIHdpdGggdGltZXN0YW1wIGFuZCBub3QgZGlhZ3JhbSBjb29yZGluYXRlc1xuICAgICAgICAgKiBmb3JtdWxhOlxuICAgICAgICAgKiBicnVzaF9taW4gPVxuICAgICAgICAgKiAob3ZlcnZpZXdfd2lkdGggLyAob3ZlcnZpZXdfbWF4IC0gb3ZlcnZpZXdfbWluKSkgKiAoYnJ1c2hfbWluIC0gb3ZlcnZpZXdfbWluKVxuICAgICAgICAgKiBicnVzX21heCA9XG4gICAgICAgICAqIChvdmVydmlld193aWR0aCAvIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSAqIChicnVzaF9tYXggLSBvdmVydmlld19taW4pXG4gICAgICAgICAqL1xuXG4gICAgICAgIGxldCBtaW5PdmVydmlld1RpbWVJbnRlcnZhbCA9IHRoaXMudGltZXNwYW4uZnJvbTtcbiAgICAgICAgbGV0IG1heE92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi50bztcbiAgICAgICAgbGV0IG1pbkRpYWdyYW1UaW1lc3RhbXAgPSB0aGlzLm1haW5UaW1lSW50ZXJ2YWwuZnJvbTtcbiAgICAgICAgbGV0IG1heERpYWdyYW1UaW1lc3RhbXAgPSB0aGlzLm1haW5UaW1lSW50ZXJ2YWwudG87XG4gICAgICAgIGxldCBkaWFncmFtV2lkdGggPSB0aGlzLndpZHRoO1xuXG4gICAgICAgIGxldCBkaWZmT3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSBtYXhPdmVydmlld1RpbWVJbnRlcnZhbCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsO1xuICAgICAgICBsZXQgZGl2T3ZlcnZpZXdUaW1lV2lkdGggPSBkaWFncmFtV2lkdGggLyBkaWZmT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG4gICAgICAgIGxldCBtaW5DYWxjQnJ1c2g6IG51bWJlciA9IGRpdk92ZXJ2aWV3VGltZVdpZHRoICogKG1pbkRpYWdyYW1UaW1lc3RhbXAgLSBtaW5PdmVydmlld1RpbWVJbnRlcnZhbCk7XG4gICAgICAgIGxldCBtYXhDYWxjQnJ1c2g6IG51bWJlciA9IGRpdk92ZXJ2aWV3VGltZVdpZHRoICogKG1heERpYWdyYW1UaW1lc3RhbXAgLSBtaW5PdmVydmlld1RpbWVJbnRlcnZhbCk7XG5cbiAgICAgICAgcmV0dXJuIFttaW5DYWxjQnJ1c2gsIG1heENhbGNCcnVzaF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjYWxjdWxhdGVzIGFuZCByZXR1cm5zIHRoZSB0aW1lc3RhbXAgZm9yIHRoZSBtYWluIGRpYWdyYW0gY2FsY3VsYXRlZFxuICAgICAqIGJ5IHRoZSBzZWxlY3RlZCBjb29yZGluYXRlIG9mIHRoZSBicnVzaCByYW5nZS5cbiAgICAgKiBAcGFyYW0gbWluQ2FsY0JydXNoIHtOdW1iZXJ9IE51bWJlciB3aXRoIHRoZSBtaW5pbXVtIGNvb3JkaW5hdGUgb2YgdGhlIHNlbGVjdGVkIGJydXNoIHJhbmdlLlxuICAgICAqIEBwYXJhbSBtYXhDYWxjQnJ1c2gge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1heGltdW0gY29vcmRpbmF0ZSBvZiB0aGUgc2VsZWN0ZWQgYnJ1c2ggcmFuZ2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRUaW1lc3RhbXBCeUNvb3JkKG1pbkNhbGNCcnVzaDogbnVtYmVyLCBtYXhDYWxjQnJ1c2g6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogY2FsY3VsYXRlIHJhbmdlIG9mIGJydXNoIHdpdGggdGltZXN0YW1wIGFuZCBub3QgZGlhZ3JhbSBjb29yZGluYXRlc1xuICAgICAgICAgKiBmb3JtdWxhOlxuICAgICAgICAgKiBtaW5EaWFncmFtVGltZXN0YW1wID1cbiAgICAgICAgICogKChtaW5DYWxjQnJ1c2ggLyBvdmVydmlld193aWR0aCkgKiAob3ZlcnZpZXdfbWF4IC0gb3ZlcnZpZXdfbWluKSkgKyBvdmVydmlld19taW5cbiAgICAgICAgICogbWF4RGlhZ3JhbVRpbWVzdGFtcCA9XG4gICAgICAgICAqICgobWF4Q2FsY0JydXNoIC8gb3ZlcnZpZXdfd2lkdGgpICogKG92ZXJ2aWV3X21heCAtIG92ZXJ2aWV3X21pbikpICsgb3ZlcnZpZXdfbWluXG4gICAgICAgICAqL1xuXG4gICAgICAgIGxldCBtaW5PdmVydmlld1RpbWVJbnRlcnZhbCA9IHRoaXMudGltZXNwYW4uZnJvbTtcbiAgICAgICAgbGV0IG1heE92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi50bztcbiAgICAgICAgbGV0IGRpYWdyYW1XaWR0aCA9IHRoaXMud2lkdGg7XG5cbiAgICAgICAgbGV0IGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCA9IG1heE92ZXJ2aWV3VGltZUludGVydmFsIC0gbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG4gICAgICAgIGxldCBtaW5EaWFncmFtVGltZXN0YW1wOiBudW1iZXIgPSAoKG1pbkNhbGNCcnVzaCAvIGRpYWdyYW1XaWR0aCkgKiBkaWZmT3ZlcnZpZXdUaW1lSW50ZXJ2YWwpICsgbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG4gICAgICAgIGxldCBtYXhEaWFncmFtVGltZXN0YW1wOiBudW1iZXIgPSAoKG1heENhbGNCcnVzaCAvIGRpYWdyYW1XaWR0aCkgKiBkaWZmT3ZlcnZpZXdUaW1lSW50ZXJ2YWwpICsgbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG5cbiAgICAgICAgcmV0dXJuIFttaW5EaWFncmFtVGltZXN0YW1wLCBtYXhEaWFncmFtVGltZXN0YW1wXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGRyYXdzIHRoZSB4IGF4aXMgdG8gdGhlIHN2ZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBidWZmZXJYcmFuZ2Uge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIGRpc3RhbmNlIGJldHdlZW4gbGVmdCBlZGdlIGFuZCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBncmFwaC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdYYXhpcyhidWZmZXJYcmFuZ2U6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyByYW5nZSBmb3IgeCBheGlzIHNjYWxlXG4gICAgICAgIHRoaXMueFNjYWxlQmFzZSA9IGQzLnNjYWxlVGltZSgpXG4gICAgICAgICAgICAuZG9tYWluKFtuZXcgRGF0ZSh0aGlzLnhBeGlzUmFuZ2UuZnJvbSksIG5ldyBEYXRlKHRoaXMueEF4aXNSYW5nZS50byldKVxuICAgICAgICAgICAgLnJhbmdlKFtidWZmZXJYcmFuZ2UsIHRoaXMud2lkdGhdKTtcblxuICAgICAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHRoaXMueFNjYWxlQmFzZSlcbiAgICAgICAgICAgIC50aWNrRm9ybWF0KGQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkLnZhbHVlT2YoKSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXRNaWxsaXNlY29uZCA9ICcuJUwnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRTZWNvbmQgPSAnOiVTJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0TWludXRlID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0SG91ciA9ICclSDolTScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdERheSA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFdlZWsgPSAnJWIgJWQnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRNb250aCA9ICclQicsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFllYXIgPSAnJVknO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gZDMudGltZVNlY29uZChkYXRlKSA8IGRhdGUgPyBmb3JtYXRNaWxsaXNlY29uZFxuICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVNaW51dGUoZGF0ZSkgPCBkYXRlID8gZm9ybWF0U2Vjb25kXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVIb3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZURheShkYXRlKSA8IGRhdGUgPyBmb3JtYXRIb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1vbnRoKGRhdGUpIDwgZGF0ZSA/IChkMy50aW1lV2VlayhkYXRlKSA8IGRhdGUgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lWWVhcihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZm9ybWF0WWVhcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50aW1lRm9ybWF0TG9jYWxlU2VydmljZS5nZXRUaW1lTG9jYWxlKGZvcm1hdCkobmV3IERhdGUoZC52YWx1ZU9mKCkpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcblxuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ncmlkKSB7XG4gICAgICAgICAgICAvLyBkcmF3IHRoZSB4IGdyaWQgbGluZXNcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHRoaXMuaGVpZ2h0ICsgJyknKVxuICAgICAgICAgICAgICAgIC5jYWxsKHhBeGlzXG4gICAgICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IHVwcGVyIGF4aXMgYXMgYm9yZGVyXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKGQzLmF4aXNUb3AodGhpcy54U2NhbGVCYXNlKS50aWNrcygwKS50aWNrU2l6ZSgwKSk7XG5cbiAgICAgICAgLy8gdGV4dCBsYWJlbCBmb3IgdGhlIHggYXhpc1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5zaG93VGltZUxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAodGhpcy53aWR0aCArIGJ1ZmZlclhyYW5nZSkgLyAyKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi5ib3R0b20gLSA1KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgICAgICAudGV4dCgndGltZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgeSBheGlzIGZvciBlYWNoIGRhdGFzZXQuXG4gICAgICogRWFjaCB1b20gaGFzIGl0cyBvd24gYXhpcy5cbiAgICAgKiBAcGFyYW0gZW50cnkge0RhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgYSBkYXRhc2V0LlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd1lheGlzKGVudHJ5OiBZUmFuZ2VzKTogWVNjYWxlIHtcbiAgICAgICAgbGV0IHNob3dBeGlzID0gKHRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcgPyBmYWxzZSA6ICh0aGlzLnBsb3RPcHRpb25zLnlheGlzID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5wbG90T3B0aW9ucy55YXhpcykpO1xuICAgICAgICAvLyBjaGVjayBmb3IgeSBheGlzIGdyb3VwaW5nXG4gICAgICAgIGxldCByYW5nZTtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyB8fCB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZ3JvdXBlZCBheGlzXG4gICAgICAgICAgICBsZXQgdW9tSWR4ID0gdGhpcy5saXN0T2ZVb21zLmZpbmRJbmRleCgodW9tKSA9PiB1b20gPT09IGVudHJ5LnVvbSk7XG4gICAgICAgICAgICBpZiAodW9tSWR4ID49IDAgJiYgZW50cnkuaWRzICYmIGVudHJ5Lmlkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gZ3JvdXBlZCB3aXRoIG1vcmUgdGhhbiBvbnkgZGF0YXNldHMgKGlmIHVvbSBoYXMgbW9yZSB0aGFuIG9uZSBkYXRhc2V0cylcbiAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0eUF4aXNSYW5nZShlbnRyeS51b20pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzZXBhcmF0ZWQgaWQgKGlmIG5vdCBlbnRyeS51b20pIE9SIGdyb3VwZWQsIGJ1dCBvbmx5IG9uZSBkYXRhc2V0IChpZiBlbnRyeSBpcyBncm91cGVkIGJ1dCBoYXMgb25seSBvbmUgaWQgPT4gdXNlIHJhbmdlIG9mIHRoaXMgZGF0YXNldClcbiAgICAgICAgICAgICAgICBsZXQgZW50cnlFbGVtID0gdGhpcy5kYXRhWXJhbmdlcy5maW5kKChlbCkgPT4gZWwgIT09IG51bGwgJiYgKGVudHJ5LmlkID8gZWwuaWQgPT09IGVudHJ5LmlkIDogZWwuaWQgPT09IGVudHJ5Lmlkc1swXSkpO1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBlbnRyeUVsZW0ucmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJhbmdlID0gZW50cnlFbGVtLnByZVJhbmdlID8gZW50cnlFbGVtLnByZVJhbmdlIDogZW50cnlFbGVtLnJhbmdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVuZ3JvdXBlZCBheGlzXG4gICAgICAgICAgICBsZXQgZW50cnlFbGVtID0gdGhpcy5kYXRhWXJhbmdlcy5maW5kKChlbCkgPT4gZWwgIT09IG51bGwgJiYgZWwuaWQgPT09IGVudHJ5LmlkKTtcbiAgICAgICAgICAgIGlmIChlbnRyeUVsZW0pIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IGVudHJ5RWxlbS5wcmVSYW5nZSA/IGVudHJ5RWxlbS5wcmVSYW5nZSA6IGVudHJ5RWxlbS5yYW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB5TWluID0gLTE7XG4gICAgICAgIGxldCB5TWF4ID0gMTtcbiAgICAgICAgaWYgKHJhbmdlICE9PSB1bmRlZmluZWQgJiYgcmFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHlNaW4gPSByYW5nZS5taW47XG4gICAgICAgICAgICB5TWF4ID0gcmFuZ2UubWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmFuZ2UgZm9yIHkgYXhpcyBzY2FsZVxuICAgICAgICBjb25zdCByYW5nZU9mZnNldCA9ICh5TWF4IC0geU1pbikgKiAwLjEwO1xuICAgICAgICBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFt5TWluIC0gcmFuZ2VPZmZzZXQsIHlNYXggKyByYW5nZU9mZnNldF0pXG4gICAgICAgICAgICAucmFuZ2UoW3RoaXMuaGVpZ2h0LCAwXSk7XG5cbiAgICAgICAgbGV0IHlBeGlzR2VuID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IDA7XG5cbiAgICAgICAgLy8gb25seSBpZiB5QXhpcyBzaG91bGQgbm90IGJlIHZpc2libGVcbiAgICAgICAgaWYgKCFzaG93QXhpcykge1xuICAgICAgICAgICAgeUF4aXNHZW5cbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICAgICAudGlja1NpemUoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCBheGlzID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoeUF4aXNHZW4pO1xuXG4gICAgICAgIC8vIG9ubHkgaWYgeUF4aXMgc2hvdWxkIGJlIHZpc2libGVcbiAgICAgICAgaWYgKHNob3dBeGlzKSB7XG4gICAgICAgICAgICAvLyBkcmF3IHkgYXhpcyBsYWJlbFxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtOTApJylcbiAgICAgICAgICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneWF4aXNUZXh0TGFiZWwnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udCcsICcxOHB4IHRpbWVzJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ2JsYWNrJylcbiAgICAgICAgICAgICAgICAudGV4dCgoZW50cnkuaWQgPyAoZW50cnkudW9tICsgJyBAICcgKyBlbnRyeS5wYXJhbWV0ZXJzLmZlYXR1cmUubGFiZWwpIDogZW50cnkudW9tKSk7XG4gICAgICAgICAgICAvLyAudGV4dCgoZW50cnkuaWQgPyAoZW50cnkucGFyYW1ldGVycy5zdGF0aW9uICsgJyAoJyArIGVudHJ5LnVvbSArICcgJyArIGVudHJ5LnBhcmFtZXRlcnMucGhlbm9tZW5vbiArICcpJykgOiBlbnRyeS51b20pKTtcblxuICAgICAgICAgICAgdGhpcy5ncmFwaC5zZWxlY3RBbGwoJy55YXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAgICAgLmNhbGwodGhpcy53cmFwVGV4dCwgKGF4aXMubm9kZSgpLmdldEJCb3goKS5oZWlnaHQgLSAxMCksIHRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNXaWR0aCA9IGF4aXMubm9kZSgpLmdldEJCb3goKS53aWR0aCArIDEwICsgdGhpcy5nZXREaW1lbnNpb25zKHRleHQubm9kZSgpKS5oO1xuICAgICAgICAgICAgLy8gaWYgeUF4aXMgc2hvdWxkIG5vdCBiZSB2aXNpYmxlLCBidWZmZXIgd2lsbCBiZSBzZXQgdG8gMFxuICAgICAgICAgICAgYnVmZmVyID0gKHNob3dBeGlzID8gZW50cnkub2Zmc2V0ICsgKGF4aXNXaWR0aCA8IHRoaXMubWFyZ2luLmxlZnQgPyB0aGlzLm1hcmdpbi5sZWZ0IDogYXhpc1dpZHRoKSA6IDApO1xuICAgICAgICAgICAgY29uc3QgYXhpc1dpZHRoRGl2ID0gKGF4aXNXaWR0aCA8IHRoaXMubWFyZ2luLmxlZnQgPyB0aGlzLm1hcmdpbi5sZWZ0IDogYXhpc1dpZHRoKTtcblxuICAgICAgICAgICAgaWYgKCFlbnRyeS5maXJzdCkge1xuICAgICAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYXhpc1dpZHRoRGl2IC0gdGhpcy5tYXJnaW4ubGVmdDtcbiAgICAgICAgICAgICAgICBheGlzLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGJ1ZmZlciArICcsIDApJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0ZXh0T2ZmID0gLSAodGhpcy5idWZmZXJTdW0pO1xuICAgICAgICAgICAgaWYgKGVudHJ5LmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGV4dE9mZiA9IHRoaXMubWFyZ2luLmxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0LmF0dHIoJ3knLCAwIC0gdGV4dE9mZik7XG5cbiAgICAgICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRleHRXaWR0aCA9IHRleHQubm9kZSgpLmdldEJCb3goKS53aWR0aDtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dEhlaWdodCA9IHRleHQubm9kZSgpLmdldEJCb3goKS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgbGV0IHRleHRQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdGV4dC5ub2RlKCkuZ2V0QkJveCgpLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRleHQubm9kZSgpLmdldEJCb3goKS55XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsZXQgYXhpc3JhZGl1cyA9IDQ7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0T2ZQb2ludHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRleHRQb3NpdGlvbi55ICsgdGV4dEhlaWdodCAvIDIgKyBheGlzcmFkaXVzIC8gMiwgLy8gKyAyIGJlY2F1c2UgcmFkaXVzID09PSA0XG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGguYWJzKHRleHRQb3NpdGlvbi54ICsgdGV4dFdpZHRoKSAtIGF4aXNyYWRpdXMgKiAyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnRPZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5Lmlkcykge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5pZHMuZm9yRWFjaCgoZW50cnlJRCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFlbnRyeSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoZWwgPT4gZWwuaW50ZXJuYWxJZCA9PT0gZW50cnlJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YWVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzRG90cycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdheGlzZG90LScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGRhdGFlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBkYXRhZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIHN0YXJ0T2ZQb2ludHMueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5Jywgc3RhcnRPZlBvaW50cy55IC0gcG9pbnRPZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgYXhpc3JhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRPZmZzZXQgKz0gYXhpc3JhZGl1cyAqIDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhZW50cnkgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKGVsID0+IGVsLmludGVybmFsSWQgPT09IGVudHJ5LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXNEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAnYXhpc2RvdC0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGRhdGFlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIGRhdGFlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3gnLCBzdGFydE9mUG9pbnRzLngpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5Jywgc3RhcnRPZlBvaW50cy55IC0gcG9pbnRPZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBheGlzcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IGlkIHRvIHVvbSwgaWYgZ3JvdXAgeWF4aXMgaXMgdG9nZ2xlZCwgZWxzZSBzZXQgaWQgdG8gZGF0YXNldCBpZFxuICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSAoZW50cnkuaWQgPyBlbnRyeS5pZCA6IGVudHJ5LnVvbSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKGlkLCBlbnRyeS51b20pO1xuXG4gICAgICAgICAgICBjb25zdCBheGlzRGl2ID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgIC8vIC5hdHRyKCdpZCcsICd5YXhpcycgKyBpZClcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpc0RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgYXhpc1dpZHRoRGl2KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsICdncmV5JylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICh0aGlzLnlBeGlzU2VsZWN0W2lkXS5jbGlja2VkID8gdGhpcy5vcGFjLmNsaWNrIDogdGhpcy5vcGFjLmRlZmF1bHQpKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKGQsIGksIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIHRoaXMub3BhYy5ob3Zlcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgKGQsIGksIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnlBeGlzU2VsZWN0W2lkXS5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIHRoaXMub3BhYy5kZWZhdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZXVwJywgKGQsIGksIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnlBeGlzU2VsZWN0W2lkXS5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIHRoaXMub3BhYy5kZWZhdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkXS5jbGlja2VkID0gIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudHJ5QXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUFycmF5LnB1c2goZW50cnkuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlBcnJheSA9IGVudHJ5LmlkcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodExpbmUoZW50cnlBcnJheSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghZW50cnkuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBheGlzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnkub2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBheGlzRGl2XG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgMCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1heExhYmVsd2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgdGhlIHkgZ3JpZCBsaW5lc1xuICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBidWZmZXIgKyAnLCAwKScpXG4gICAgICAgICAgICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeVNjYWxlKVxuICAgICAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLndpZHRoICsgYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICAgIHlTY2FsZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNoZWNrIHdoZXRoZXIgb2JqZWN0IHlBeGlzU2VsZWN0IGV4aXN0cyB3aXRoIHNlbGVjdGVkIHVvbS5cbiAgICAgKiBJZiBpdCBkb2VzIG5vdCBleGlzdCwgaXQgd2lsbCBiZSBjcmVhdGVkLlxuICAgICAqIEBwYXJhbSBpZGVudGlmaWVyIHtTdHJpbmd9IFN0cmluZyBwcm92aWRpbmcgdGhlIHNlbGVjdGVkIHVvbSBvciB0aGUgc2VsZWN0ZWQgZGF0YXNldCBJRC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrWXNlbGVjdG9yKGlkZW50aWZpZXI6IHN0cmluZywgdW9tOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGVjdG9yOiBZQXhpc1NlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgIGlkOiBpZGVudGlmaWVyLFxuICAgICAgICAgICAgaWRzOiAodGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkID8gdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMgOiBbXSksXG4gICAgICAgICAgICB1b206IHVvbSxcbiAgICAgICAgICAgIGNsaWNrZWQ6ICh0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgPyB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgOiBmYWxzZSlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdID0gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYWRhcHQgeSBheGlzIGhpZ2hsaWdodGluZyB0byBzZWxlY3RlZCBUUyBvciBzZWxlY3RlZCB1b21cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZVlzZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGxldCBncm91cExpc3QgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzKSB7XG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlOiBncm91cFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IHRoaXMueUF4aXNTZWxlY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5pZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmlkcy5mb3JFYWNoKChpZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUVsID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1NlbGVjdG9yOiBZQXhpc1NlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkczogW2lkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFFbC5heGlzT3B0aW9ucy51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W2lkXSA9IG5ld1NlbGVjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5jbGlja2VkICYmIGVsLnVvbSAhPT0gZWwuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUVsID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWQgPT09IGVsLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZWwuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkczogW2VsLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiBkYXRhRWwuYXhpc09wdGlvbnMudW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3RbZWwuaWRdID0gbmV3U2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGJlZm9yZTogbm8gZ3JvdXBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy55QXhpc1NlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSB0aGlzLnlBeGlzU2VsZWN0W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUVsID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWQgPT09IGVsLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhRWwgJiYgZGF0YUVsLmF4aXNPcHRpb25zLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gaXMgZGF0YXNldCB3aXRoIGludGVybmFsSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25JRCA9IGRhdGFFbC5pbnRlcm5hbElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gaXMgdW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uSUQgPSBlbC51b207XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3VwTGlzdFtzZWxlY3Rpb25JRF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFVvbTogWUF4aXNTZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBzZWxlY3Rpb25JRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogZWwudW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3Rbc2VsZWN0aW9uSURdID0gY3VycmVudFVvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3Rbc2VsZWN0aW9uSURdLmlkcy5wdXNoKGVsLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLnVvbSA9PT0gc2VsZWN0aW9uSUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlIGZvciBncm91cGVkIHVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncm91cGVkRGF0YXNldHMgPSB0aGlzLmNvdW50R3JvdXBlZERhdGFzZXRzKHNlbGVjdGlvbklELCBlbC51b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncm91cExpc3Rbc2VsZWN0aW9uSURdLmlkcy5sZW5ndGggPT09IGdyb3VwZWREYXRhc2V0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3Rbc2VsZWN0aW9uSURdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwuY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgZm9yIHVuZ3JvdXBlZCBkYXRhc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBMaXN0W3NlbGVjdGlvbklEXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3QgPSB7fTsgLy8gdW5zZWxlY3QgYWxsIC0geSBheGlzXG4gICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0ID0gZ3JvdXBMaXN0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2xkR3JvdXBZYXhpcyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFtb3VudCBvZiBkYXRhc2V0cyB0aGF0IGFyZSBncm91cGVkIHdpdGggdGhlIHNhbWUgdW9tXG4gICAgICogQHBhcmFtIHVvbSB7U3RyaW5nfSB1b21cbiAgICAgKiBAcGFyYW0gaWQge1N0cmluZ30gaW50ZXJuYWxJZCBvZiB0aGUgZGF0YXNldCB0aGF0IGNhbiBiZSBza2lwcGVkXG4gICAgICogcmV0dXJucyB7TnVtYmVyfSBhbW91bnQgb2YgZGF0YXNldHMgd2l0aCB0aGUgZ2l2ZW4gdW9tXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb3VudEdyb3VwZWREYXRhc2V0cyh1b206IHN0cmluZywgaWQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCBhcnJheVVvbUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kYXRhWXJhbmdlcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbCAhPT0gbnVsbCAmJiBlbC51b20gPT09IHVvbSAmJiBlbC5pZCAhPT0gaWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KGRzID0+IGRzLmludGVybmFsSWQgPT09IGVsLmlkICYmIGRzLmF4aXNPcHRpb25zLnNlcGFyYXRlWUF4aXMgPT09IGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID49IDApIHsgYXJyYXlVb21Db3VudCsrOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyYXlVb21Db3VudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZXQgc2VsZWN0ZWQgSWRzIHRoYXQgc2hvdWxkIGJlIGhpZ2hsaWdodGVkLlxuICAgICAqIEBwYXJhbSBpZHMge0FycmF5fSBBcnJheSBvZiBTdHJpbmdzIGNvbnRhaW5pbmcgdGhlIElkcy5cbiAgICAgKiBAcGFyYW0gdW9tIHtTdHJpbmd9IFN0cmluZyB3aXRoIHRoZSB1b20gZm9yIHRoZSBzZWxlY3RlZCBJZHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZ2hsaWdodExpbmUoaWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBsZXQgY2hhbmdlRmFsc2U6IEhpZ2hsaWdodERhdGFzZXRbXSA9IFtdO1xuICAgICAgICBsZXQgY2hhbmdlVHJ1ZTogSGlnaGxpZ2h0RGF0YXNldFtdID0gW107XG4gICAgICAgIGlkcy5mb3JFYWNoKChJRCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2YoSUQpID49IDApIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VGYWxzZS5wdXNoKHsgaWQ6IElELCBjaGFuZ2U6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhbmdlVHJ1ZS5wdXNoKHsgaWQ6IElELCBjaGFuZ2U6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpZHMubGVuZ3RoID09PSBjaGFuZ2VGYWxzZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0ZWRJZHMoY2hhbmdlRmFsc2UsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZElkcyhjaGFuZ2VUcnVlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNoYW5nZXMgc3RhdGUgb2Ygc2VsZWN0ZWQgSWRzLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlU2VsZWN0ZWRJZHModG9IaWdobGlnaHREYXRhc2V0OiBIaWdobGlnaHREYXRhc2V0W10sIGNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgICAgICB0b0hpZ2hsaWdodERhdGFzZXQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZElkKG9iai5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuc3BsaWNlKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5ID09PSBvYmouaWQpLCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9IaWdobGlnaHREYXRhc2V0LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKG9iai5pZCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJZChvYmouaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5wdXNoKG9iai5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRGF0YXNldFNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMpO1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgdGhlIGdyYXBoIGxpbmUgZm9yIGVhY2ggZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZW50cnkge0RhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgYSBkYXRhc2V0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkcmF3R3JhcGhMaW5lKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSk6IHZvaWQge1xuICAgICAgICAvLyBjb25zdCBnZXRZYXhpc1JhbmdlID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kKChvYmopID0+IG9iai5pZHMuaW5kZXhPZihlbnRyeS5pbnRlcm5hbElkKSA+IC0xKTtcbiAgICAgICAgLy8gY2hlY2sgZm9yIHkgYXhpcyBncm91cGluZ1xuICAgICAgICBsZXQgZ2V0WWF4aXNSYW5nZSA9IHRoaXMuZ2V0WWF4aXNSYW5nZShlbnRyeSk7XG5cbiAgICAgICAgaWYgKGVudHJ5LmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGdldFlheGlzUmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCB5U2NhbGVCYXNlID0gZ2V0WWF4aXNSYW5nZS55U2NhbGU7XG5cbiAgICAgICAgICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBib2R5IHRvIGNsaXAgZ3JhcGhcbiAgICAgICAgICAgICAgICAvLyB1bmlxdWUgSUQgZ2VuZXJhdGVkIHRocm91Z2ggdGhlIGN1cnJlbnQgdGltZSAoY3VycmVudCB0aW1lIHdoZW4gaW5pdGlhbGl6ZWQpXG4gICAgICAgICAgICAgICAgbGV0IHF1ZXJ5U2VsZWN0b3JDbGlwID0gJ2NsaXAnICsgdGhpcy5jdXJyZW50VGltZUlkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaFxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6Y2xpcFBhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBxdWVyeVNlbGVjdG9yQ2xpcClcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIDApXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIC8vIGRyYXcgZ3JhaCBsaW5lXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHkgPSB0aGlzLmdyYXBoXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xpcC1wYXRoJywgJ3VybCgjJyArIHF1ZXJ5U2VsZWN0b3JDbGlwICsgJyknKTtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBncmFwaCBsaW5lXG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSB0aGlzLmNyZWF0ZUxpbmUodGhpcy54U2NhbGVCYXNlLCB5U2NhbGVCYXNlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhcGhCb2R5XG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdHVtKGVudHJ5LmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGVudHJ5LmxpbmVzLmxpbmVXaWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhcGhCb2R5LnNlbGVjdEFsbCgnLmdyYXBoRG90cycpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKGVudHJ5LmRhdGEuZmlsdGVyKChkKSA9PiAhaXNOYU4oZC52YWx1ZSkpKVxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmFwaERvdHMnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAoZDogRGF0YUVudHJ5KSA9PiAnZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIGxpbmUueCgpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBsaW5lLnkoKSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBlbnRyeS5saW5lcy5wb2ludFJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ob3ZlclN0eWxlID09PSBIb3ZlcmluZ1N0eWxlLnBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9pbnRIb3ZlcmluZyhlbnRyeSwgbGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBzaG93cyBsYWJlbGluZyB2aWEgbW91c21vdmUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3VzZW1vdmVIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgdGhpcy5sYWJlbFRpbWVzdGFtcCA9IFtdO1xuICAgICAgICB0aGlzLmxhYmVsWENvb3JkID0gW107XG4gICAgICAgIHRoaXMuZGlzdExhYmVsWENvb3JkID0gW107XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5LCBlbnRyeUlkeCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRJdGVtRm9yWChjb29yZHNbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgZW50cnkuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnNob3dEaWFncmFtSW5kaWNhdG9yKGVudHJ5LCBpZHgsIGNvb3Jkc1swXSwgZW50cnlJZHgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3V0cHV0SWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG91dHB1dElkcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0cHV0SWRzLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAvLyBkbyBub3Qgc2hvdyBsaW5lIGluIGdyYXBoIHdoZW4gbm8gZGF0YSBhdmFpbGFibGUgZm9yIHRpbWVzdGFtcFxuICAgICAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IDAsXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZpcnN0ID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBsYWJlbEFycmF5OiBbZDMuQmFzZVR5cGUsIGQzLkJhc2VUeXBlXVtdID0gW10sXG4gICAgICAgICAgICAgICAgdGV4dFJlY3RBcnJheTogZDMuQmFzZVR5cGVbXSA9IGQzLnNlbGVjdEFsbCgnLmZvY3VzLXZpc2liaWxpdHknKS5ub2RlcygpO1xuXG4gICAgICAgICAgICAvLyBnZXQgYW5kIHNvcnQgYWxsIHRleHQgbGFiZWxzIGFuZCByZWN0YW5nbGUgb2YgdGhlIHRleHQgbGFiZWxzIGFuZCBjb21iaW5lIHJlbGF0ZWRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dFJlY3RBcnJheS5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIGxhYmVsQXJyYXkucHVzaChbdGV4dFJlY3RBcnJheVtpXSwgdGV4dFJlY3RBcnJheVtpICsgMV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNvcnkgYnkgeSBjb29yZGluYXRlXG4gICAgICAgICAgICBsYWJlbEFycmF5LnNvcnQoKGEsIGIpID0+IHBhcnNlRmxvYXQoZDMuc2VsZWN0KGFbMF0pLmF0dHIoJ3knKSkgLSBwYXJzZUZsb2F0KGQzLnNlbGVjdChiWzBdKS5hdHRyKCd5JykpKTtcblxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGlmIG92ZXJsYXBwaW5nXG4gICAgICAgICAgICBsYWJlbEFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcGFpcnMgb2YgMiBvYmplY3RzIChyZWN0YW5nbGUgKGVxdWFsKSBhbmQgbGFiZWwgKG9kZCkpXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KGVsWzBdKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGksIGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMy5zZWxlY3QoZWxbMF0pLmF0dHIoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeWNvb3JkOiBudW1iZXIgPSBwYXJzZUZsb2F0KGQzLnNlbGVjdChlbFswXSkuYXR0cigneScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IE1hdGgubWF4KDAsIChsYXN0ICsgMzApIC0geWNvb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8IDEwKSB7IG9mZnNldCA9IDEwOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAsICcgKyBvZmZzZXQgKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgMCknO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdChlbFsxXSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpLCBmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KGVsWzFdKS5hdHRyKCd2aXNpYmlsaXR5JykgIT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHljb29yZDogbnVtYmVyID0gcGFyc2VGbG9hdChkMy5zZWxlY3QoZWxbMF0pLmF0dHIoJ3knKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCAobGFzdCArIDMwKSAtIHljb29yZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPCAxMCkgeyBvZmZzZXQgPSAxMDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0ID0gb2Zmc2V0ICsgeWNvb3JkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAsICcgKyBvZmZzZXQgKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgMCknO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uSGlnaGxpZ2h0Q2hhbmdlZC5lbWl0KHRoaXMuaGlnaGxpZ2h0T3V0cHV0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGhpZGVzIHRoZSBsYWJlbGluZyBpbnNpZGUgdGhlIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgbW91c2VvdXRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmhpZGVEaWFncmFtSW5kaWNhdG9yKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gc3RhcnRpbmcgdGhlIGRyYWcgaGFuZGxpbmcgZm9yIHRoZSBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGFuU3RhcnRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nTW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdNb3ZlU3RhcnQgPSBkMy5ldmVudC54O1xuICAgICAgICB0aGlzLmRyYWdNb3ZlUmFuZ2UgPSBbdGhpcy54QXhpc1JhbmdlLmZyb20sIHRoaXMueEF4aXNSYW5nZS50b107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjb250cm9sbHMgdGhlIHBhbm5pbmcgKGRyYWdnaW5nKSBvZiB0aGUgZ3JhcGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYW5Nb3ZlSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ01vdmUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5kcmFnTW92ZVN0YXJ0ICYmIHRoaXMuZHJhZ2dpbmdNb3ZlKSB7XG4gICAgICAgICAgICBsZXQgZGlmZiA9IC0oZDMuZXZlbnQueCAtIHRoaXMuZHJhZ01vdmVTdGFydCk7IC8vIGQzLmV2ZW50LnN1YmplY3QueCk7XG4gICAgICAgICAgICBsZXQgYW1vdW50VGltZXN0YW1wID0gdGhpcy5kcmFnTW92ZVJhbmdlWzFdIC0gdGhpcy5kcmFnTW92ZVJhbmdlWzBdO1xuICAgICAgICAgICAgbGV0IHJhdGlvVGltZXN0YW1wRGlhZ0Nvb3JkID0gYW1vdW50VGltZXN0YW1wIC8gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIGxldCBuZXdUaW1lTWluID0gdGhpcy5kcmFnTW92ZVJhbmdlWzBdICsgKHJhdGlvVGltZXN0YW1wRGlhZ0Nvb3JkICogZGlmZik7XG4gICAgICAgICAgICBsZXQgbmV3VGltZU1heCA9IHRoaXMuZHJhZ01vdmVSYW5nZVsxXSArIChyYXRpb1RpbWVzdGFtcERpYWdDb29yZCAqIGRpZmYpO1xuXG4gICAgICAgICAgICB0aGlzLnhBeGlzUmFuZ2VQYW4gPSBbbmV3VGltZU1pbiwgbmV3VGltZU1heF07XG4gICAgICAgICAgICB0aGlzLnRpbWVzcGFuID0geyBmcm9tOiB0aGlzLnhBeGlzUmFuZ2VQYW5bMF0sIHRvOiB0aGlzLnhBeGlzUmFuZ2VQYW5bMV0gfTtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGVuZHMgdGhlIGRyYWdnaW5nIGNvbnRyb2wuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYW5FbmRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy54QXhpc1JhbmdlUGFuKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGhpcy54QXhpc1JhbmdlUGFuWzBdLCB0aGlzLnhBeGlzUmFuZ2VQYW5bMV0pO1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ01vdmVTdGFydCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy54QXhpc1JhbmdlUGFuID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgc3RhcnRzIHRoZSB6b29tIGhhbmRsaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgem9vbVN0YXJ0SGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAvLyBkZXBlbmRlbnQgb24gcG9pbnQgb3IgbGluZSBob3ZlcmluZ1xuICAgICAgICB0aGlzLmRyYWdTdGFydCA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICB0aGlzLnhBeGlzUmFuZ2VPcmlnaW4ucHVzaChbdGhpcy54QXhpc1JhbmdlLmZyb20sIHRoaXMueEF4aXNSYW5nZS50b10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZHJhd3MgYSByZWN0YW5nbGUgd2hlbiB6b29tIGlzIHN0YXJ0ZWQgYW5kIHRoZSBtb3VzZSBpcyBtb3ZpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSB6b29tSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhd0RyYWdSZWN0YW5nbGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGVuZHMgdGhlIHpvb20gaGFuZGxpbmcgYW5kIGNhbGN1bGF0ZXMgdGhlIHZpYSB6b29tIHNlbGVjdGVkIHRpbWUgaW50ZXJ2YWwuXG4gICAgICovXG4gICAgcHJpdmF0ZSB6b29tRW5kSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdTdGFydCB8fCAhdGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgaWYgKHRoaXMueEF4aXNSYW5nZU9yaWdpblswXSkge1xuICAgICAgICAgICAgICAgIC8vIGJhY2sgdG8gb3JpZ2luIHJhbmdlIChmcm9tIC0gdG8pXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKHRoaXMueEF4aXNSYW5nZU9yaWdpblswXVswXSwgdGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdWzFdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnhBeGlzUmFuZ2VPcmlnaW4gPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHhEb21haW5SYW5nZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTdGFydFswXSA8PSB0aGlzLmRyYWdDdXJyZW50WzBdKSB7XG4gICAgICAgICAgICAgICAgeERvbWFpblJhbmdlID0gdGhpcy5nZXR4RG9tYWluKHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeERvbWFpblJhbmdlID0gdGhpcy5nZXR4RG9tYWluKHRoaXMuZHJhZ0N1cnJlbnRbMF0sIHRoaXMuZHJhZ1N0YXJ0WzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZSA9IHsgZnJvbTogeERvbWFpblJhbmdlWzBdLCB0bzogeERvbWFpblJhbmdlWzFdIH07XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGhpcy54QXhpc1JhbmdlLmZyb20sIHRoaXMueEF4aXNSYW5nZS50byk7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc2V0RHJhZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTGluZSh4U2NhbGVCYXNlOiBkMy5TY2FsZVRpbWU8bnVtYmVyLCBudW1iZXI+LCB5U2NhbGVCYXNlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4pIHtcbiAgICAgICAgcmV0dXJuIGQzLmxpbmU8RGF0YUVudHJ5PigpXG4gICAgICAgICAgICAuZGVmaW5lZCgoZCkgPT4gIWlzTmFOKGQudmFsdWUpKVxuICAgICAgICAgICAgLngoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB4RGlhZ0Nvb3JkID0geFNjYWxlQmFzZShkLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih4RGlhZ0Nvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnhEaWFnQ29vcmQgPSB4RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geERpYWdDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5RGlhZ0Nvb3JkID0geVNjYWxlQmFzZShkLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHlEaWFnQ29vcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQueURpYWdDb29yZCA9IHlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY3VydmUoZDMuY3VydmVMaW5lYXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbW91c2VPdmVyUG9pbnRIb3ZlcmluZyhkOiBEYXRhRW50cnksIGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSkge1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgICAgICBsZXQgZGF0YXNldCA9IHRoaXMuZGF0YXNldE1hcC5nZXQoZW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBsZXQgcmVjdEJhY2sgPSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPj0gMCAmJiBjb29yZHNbMF0gPD0gcmVjdEJhY2sud2lkdGggJiYgY29vcmRzWzFdID49IDAgJiYgY29vcmRzWzFdIDw9IHJlY3RCYWNrLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RvdC0nICsgZC50aW1lc3RhbXAgKyAnLScgKyBlbnRyeS5pZCkuYXR0cignb3BhY2l0eScsIDAuOCkuYXR0cigncicsICc4cHgnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0ZXh0IGZvciBob3ZlcmluZyBsYWJlbFxuICAgICAgICAgICAgICAgIGxldCBkb3RMYWJlbCA9IHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAudGV4dChgJHtkLnZhbHVlfSAke2VudHJ5LmF4aXNPcHRpb25zLnVvbX0gJHttb21lbnQoZC50aW1lc3RhbXApLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKX1gKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdExhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW0pIC8gMiA+IGNvb3Jkc1swXSkge1xuICAgICAgICAgICAgICAgICAgICBvbkxlZnRTaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlY3RYOiBudW1iZXIgPSBkLnhEaWFnQ29vcmQgKyAxNTtcbiAgICAgICAgICAgICAgICBsZXQgcmVjdFk6IG51bWJlciA9IGQueURpYWdDb29yZDtcbiAgICAgICAgICAgICAgICBsZXQgcmVjdFc6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLncgKyA4O1xuICAgICAgICAgICAgICAgIGxldCByZWN0SDogbnVtYmVyID0gdGhpcy5nZXREaW1lbnNpb25zKGRvdExhYmVsLm5vZGUoKSkuaDsgLy8gKyA0O1xuICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICByZWN0WCA9IGQueERpYWdDb29yZCAtIDE1IC0gcmVjdFc7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RZID0gZC55RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKGNvb3Jkc1sxXSArIHJlY3RIICsgNCkgPiB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBsYWJlbCBiZWxvdyB4IGF4aXNcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RyYW5zbGF0ZSBsYWJlbCB0byBhIGhpZ2hlciBwbGFjZS4gLSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBob3ZlcmluZyBsYWJlbFxuICAgICAgICAgICAgICAgIGxldCBkb3RSZWN0YW5nbGUgPSB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlSG92ZXJEb3RSZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3doaXRlJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsLW9wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsICcxcHgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCByZWN0VylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHJlY3RIKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgcmVjdFggKyAnLCAnICsgcmVjdFkgKyAnKScpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFg6IG51bWJlciA9IGQueERpYWdDb29yZCArIDQgKyAxNTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSBkLnlEaWFnQ29vcmQgKyB0aGlzLmdldERpbWVuc2lvbnMoZG90UmVjdGFuZ2xlLm5vZGUoKSkuaCAtIDQ7XG4gICAgICAgICAgICAgICAgaWYgKCFvbkxlZnRTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsWCA9IGQueERpYWdDb29yZCAtIHJlY3RXICsgNCAtIDE1O1xuICAgICAgICAgICAgICAgICAgICBsYWJlbFkgPSBkLnlEaWFnQ29vcmQgKyB0aGlzLmdldERpbWVuc2lvbnMoZG90UmVjdGFuZ2xlLm5vZGUoKSkuaCAtIDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbGFiZWxYICsgJywgJyArIGxhYmVsWSArICcpJyk7XG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgb3V0cHV0IG9mIGhpZ2hsaWdodGVkIGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBkLnRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgaWRzOiBuZXcgTWFwKCkuc2V0KGVudHJ5LmludGVybmFsSWQsIHsgdGltZXN0YW1wOiBkLnRpbWVzdGFtcCwgdmFsdWU6IGQudmFsdWUgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMub25IaWdobGlnaHRDaGFuZ2VkLmVtaXQodGhpcy5oaWdobGlnaHRPdXRwdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZU91dFBvaW50SG92ZXJpbmcoZDogRGF0YUVudHJ5LCBlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpIHtcbiAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gdW5oaWdobGlnaHQgaG92ZXJlZCBkb3RcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RvdC0nICsgZC50aW1lc3RhbXAgKyAnLScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBlbnRyeS5saW5lcy5wb2ludFJhZGl1cyk7XG4gICAgICAgICAgICAvLyBtYWtlIGxhYmVsIGludmlzaWJsZVxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0XG4gICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFlheGlzUmFuZ2UoZW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogWVJhbmdlcyB7XG4gICAgICAgIC8vIGNoZWNrIGlmIGVudHJ5IGRhdGFzZXQgc2hvdWxkIGJlIHNlcGFyYXRlZCBvciBlbnRyeSBkYXRhc2V0cyBzaG91bGQgYmUgZ3JvdXBlZFxuICAgICAgICBpZiAoIWVudHJ5LmF4aXNPcHRpb25zLnNlcGFyYXRlWUF4aXMgJiYgKHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyB8fCB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmQoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYmogIT09IG51bGwgJiYgb2JqLnVvbSA9PT0gZW50cnkuYXhpc09wdGlvbnMudW9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gLy8gdW9tIGRvZXMgZXhpc3QgaW4gdGhpcy55UmFuZ2VzRWFjaFVvbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhWXJhbmdlcy5maW5kKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JqICE9PSBudWxsICYmIG9iai5pZCA9PT0gZW50cnkuaW50ZXJuYWxJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IC8vIGlkIGRvZXMgZXhpc3QgaW4gdGhpcy5kYXRhWXJhbmdlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHRpbWVzdGFtcCBvZiBwcm92aWRlZCB4IGRpYWdyYW0gY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIHN0YXJ0IHtOdW1iZXJ9IE51bWJlciB3aXRoIHRoZSBtaW5pbXVtIGRpYWdyYW0gY29vcmRpbmF0ZS5cbiAgICAgKiBAcGFyYW0gZW5kIHtOdW1iZXJ9IE51bWJlciB3aXRoIHRoZSBtYXhpbXVtIGRpYWdyYW0gY29vcmRpbmF0ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldHhEb21haW4oc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgbGV0IGRvbU1pbkFyciA9IFtdO1xuICAgICAgICBsZXQgZG9tTWF4QXJyID0gW107XG4gICAgICAgIGxldCBkb21NaW46IG51bWJlcjtcbiAgICAgICAgbGV0IGRvbU1heDogbnVtYmVyO1xuICAgICAgICBsZXQgdG1wO1xuICAgICAgICBsZXQgbG93ZXN0TWluID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgICBsZXQgbG93ZXN0TWF4ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG4gICAgICAgIHN0YXJ0ICs9IHRoaXMuYnVmZmVyU3VtO1xuICAgICAgICBlbmQgKz0gdGhpcy5idWZmZXJTdW07XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGRvbU1pbkFyci5wdXNoKGVudHJ5LmRhdGEuZmluZCgoZWxlbSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ueERpYWdDb29yZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS54RGlhZ0Nvb3JkID49IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbaW5kZXhdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBkb21NYXhBcnIucHVzaChlbnRyeS5kYXRhLmZpbmQoKGVsZW0sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLnhEaWFnQ29vcmQgPj0gZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGRvbU1pbkFyci5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkb21NaW5BcnJbaV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGRvbU1pbkFycltpXS54RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPCBsb3dlc3RNaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXN0TWluID0gdG1wO1xuICAgICAgICAgICAgICAgICAgICBkb21NaW4gPSBkb21NaW5BcnJbaV0udGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBkb21NYXhBcnIubGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZG9tTWF4QXJyW2pdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSBkb21NYXhBcnJbal0ueERpYWdDb29yZDtcbiAgICAgICAgICAgICAgICBpZiAodG1wIDwgbG93ZXN0TWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIGxvd2VzdE1heCA9IHRtcDtcbiAgICAgICAgICAgICAgICAgICAgZG9tTWF4ID0gZG9tTWF4QXJyW2pdLnRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtkb21NaW4sIGRvbU1heF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjb25maWd1cmF0ZXMgYW5kIGRyYXdzIHRoZSByZWN0YW5nbGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3RHJhZ1JlY3RhbmdsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdTdGFydCkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5kcmFnQ3VycmVudCA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuXG4gICAgICAgIGNvbnN0IHgxID0gTWF0aC5taW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcblxuICAgICAgICBpZiAoIXRoaXMuZHJhZ1JlY3QgJiYgIXRoaXMuZHJhZ1JlY3RHKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbC1vcGFjaXR5JywgLjIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ2JsdWUnKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdCA9IHRoaXMuZHJhZ1JlY3RHLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeDIgLSB4MSlcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1kcmFnJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgeDEgKyB0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGRpc2FibGVzIHRoZSBkcmF3aW5nIHJlY3RhbmdsZSBjb250cm9sLlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXREcmFnKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcmFnUmVjdEcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1ldGFkYXRhIG9mIGEgc3BlY2lmaWMgZW50cnkgaW4gdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIHgge051bWJlcn0gQ29vcmRpbmF0ZXMgb2YgdGhlIG1vdXNlIGluc2lkZSB0aGUgZGlhZ3JhbS5cbiAgICAgKiBAcGFyYW0gZGF0YSB7RGF0YUVudHJ5fSBBcnJheSB3aXRoIHRoZSBkYXRhIG9mIGVhY2ggZGF0YXNldCBlbnRyeS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEl0ZW1Gb3JYKHg6IG51bWJlciwgZGF0YTogRGF0YUVudHJ5W10pOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMueFNjYWxlQmFzZS5pbnZlcnQoeCk7XG4gICAgICAgIGNvbnN0IGJpc2VjdERhdGUgPSBkMy5iaXNlY3RvcigoZDogRGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZFswXTtcbiAgICAgICAgfSkubGVmdDtcbiAgICAgICAgcmV0dXJuIGJpc2VjdERhdGUoZGF0YSwgaW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZGlzYWJsZXMgdGhlIGxhYmVsaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlkZURpYWdyYW1JbmRpY2F0b3IoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICBkMy5zZWxlY3RBbGwoJy5mb2N1cy12aXNpYmlsaXR5JylcbiAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5hYmxlcyB0aGUgbGFibGVpbmcgb2YgZWFjaCBkYXRhc2V0IGVudHJ5LlxuICAgICAqIEBwYXJhbSBlbnRyeSB7SW50ZXJuYWxEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBpZHgge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIHBvc2l0aW9uIG9mIHRoZSBkYXRhc2V0IGVudHJ5IGluIHRoZSBkYXRhIGFycmF5LlxuICAgICAqIEBwYXJhbSB4Q29vcmRNb3VzZSB7TnVtYmVyfSBOdW1iZXIgb2YgdGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbW91c2UuXG4gICAgICogQHBhcmFtIGVudHJ5SWR4IHtOdW1iZXJ9IE51bWJlciBvZiB0aGUgaW5kZXggb2YgdGhlIGVudHJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd0RpYWdyYW1JbmRpY2F0b3IgPSAoZW50cnk6IEludGVybmFsRGF0YUVudHJ5LCBpZHg6IG51bWJlciwgeENvb3JkTW91c2U6IG51bWJlciwgZW50cnlJZHg6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBpdGVtOiBEYXRhRW50cnkgPSBlbnRyeS5kYXRhW2lkeF07XG4gICAgICAgIHRoaXMubGFiZWxYQ29vcmRbZW50cnlJZHhdID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaXN0TGFiZWxYQ29vcmRbZW50cnlJZHhdID0gbnVsbDtcblxuICAgICAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0ueURpYWdDb29yZCAmJiBpdGVtWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsaW5lIHdoZXJlIG1vdXNlIGlzXG4gICAgICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgICAvLyBzaG93IGxhYmVsIGlmIGRhdGEgYXZhaWxhYmxlIGZvciB0aW1lXG4gICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIHRydWUsIGVudHJ5SWR4KTtcblxuICAgICAgICAgICAgbGV0IHhNb3VzZUFuZEJ1ZmZlciA9IHhDb29yZE1vdXNlICsgdGhpcy5idWZmZXJTdW07XG4gICAgICAgICAgICBsZXQgbGFiZWxCdWZmZXIgPSAoKHRoaXMudGltZXNwYW4uZnJvbSAvICh0aGlzLnRpbWVzcGFuLnRvIC0gdGhpcy50aW1lc3Bhbi5mcm9tKSkgKiAwLjAwMDEpXG4gICAgICAgICAgICAgICAgKiAoKHRoaXMudGltZXNwYW4uZnJvbSAvICh0aGlzLnRpbWVzcGFuLnRvIC0gdGhpcy50aW1lc3Bhbi5mcm9tKSkgKiAwLjAwMDEpO1xuXG4gICAgICAgICAgICBsYWJlbEJ1ZmZlciA9IE1hdGgubWF4KDEwLCBsYWJlbEJ1ZmZlcik7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd0xhYmVsVmFsdWVzKGVudHJ5LCBpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVJbmRpY2F0b3JMYWJlbChpdGVtLCBlbnRyeUlkeCwgeE1vdXNlQW5kQnVmZmVyKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0ueERpYWdDb29yZCA+PSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtIHx8IHhNb3VzZUFuZEJ1ZmZlciA8IGl0ZW0ueERpYWdDb29yZCAtIGxhYmVsQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCBmYWxzZSwgZW50cnlJZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoeE1vdXNlQW5kQnVmZmVyIDwgaXRlbS54RGlhZ0Nvb3JkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmRhdGFbaWR4IC0gMV0gJiYgKE1hdGguYWJzKGVudHJ5LmRhdGFbaWR4IC0gMV0ueERpYWdDb29yZCAtIHhNb3VzZUFuZEJ1ZmZlcikgPCBNYXRoLmFicyhpdGVtLnhEaWFnQ29vcmQgLSB4TW91c2VBbmRCdWZmZXIpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIGZhbHNlLCBlbnRyeUlkeCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3cgY2xvc2VzdCBlbGVtZW50IHRvIG1vdXNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xhYmVsVmFsdWVzKGVudHJ5LCBlbnRyeS5kYXRhW2lkeCAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGVudHJ5LmRhdGFbaWR4IC0gMV0sIGVudHJ5SWR4LCB4TW91c2VBbmRCdWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIHRydWUsIGVudHJ5SWR4KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgZ3JhcGggd2lkdGggYW5kIHJhbmdlIGJldHdlZW4gZGF0YSBwb2ludCBhbmQgbW91c2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmRhdGFbaWR4IC0gMV0ueERpYWdDb29yZCA+PSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBlbnRyeS5kYXRhW2lkeCAtIDFdLnhEaWFnQ29vcmQgPD0gdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVudHJ5LmRhdGFbaWR4IC0gMV0ueERpYWdDb29yZCArIGxhYmVsQnVmZmVyIDwgeE1vdXNlQW5kQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIGZhbHNlLCBlbnRyeUlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBzZXQgaG92ZXJpbmcgZm9yIGxhYmVsYnVmZmVyIGFmdGVyIGxhc3QgYW5kIGJlZm9yZSBmaXJzdCB2YWx1ZSBvZiB0aGUgZ3JhcGhcbiAgICAgICAgICAgIC8vIGhpZGUgbGFiZWwgaWYgbm8gZGF0YSBhdmFpbGFibGUgZm9yIHRpbWVcbiAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNoYW5nZSB2aXNpYmlsaXR5IG9mIGxhYmVsIGFuZCB3aGl0ZSByZWN0YW5nbGUgaW5zaWRlIGdyYXBoIChuZXh0IHRvIG1vdXNlLWN1cnNvciBsaW5lKS5cbiAgICAgKiBAcGFyYW0gZW50cnkge0RhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIHZpc2libGUge0Jvb2xlYW59IEJvb2xlYW4gZ2l2aW5nIGluZm9ybWF0aW9uIGFib3V0IHZpc2liaWxpdHkgb2YgYSBsYWJlbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoVmlzTGFiZWwoZW50cnk6IEludGVybmFsRGF0YUVudHJ5LCB2aXNpYmxlOiBib29sZWFuLCBlbnRyeUlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZvY3VzLXZpc2liaWxpdHknKTtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0XG4gICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZvY3VzLXZpc2liaWxpdHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0XG4gICAgICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cbiAgICAgICAgICAgIHRoaXMubGFiZWxUaW1lc3RhbXBbZW50cnlJZHhdID0gbnVsbDtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzaG93IHRoZSBsYWJlbGluZyBpbnNpZGUgdGhlIGdyYXBoLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmcgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGl0ZW0ge0RhdGFFbnRyeX0gT2JqZWN0IG9mIHRoZSBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dMYWJlbFZhbHVlcyhlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGl0ZW06IERhdGFFbnRyeSk6IHZvaWQge1xuICAgICAgICBsZXQgaWQgPSAxO1xuICAgICAgICBsZXQgb25MZWZ0U2lkZTogYm9vbGVhbiA9IHRoaXMuY2hlY2tMZWZ0U2lkZShpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBpZiAoZW50cnkuZm9jdXNMYWJlbCkge1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbC50ZXh0KGl0ZW1baWRdICsgKGVudHJ5LmF4aXNPcHRpb25zLnVvbSA/IGVudHJ5LmF4aXNPcHRpb25zLnVvbSA6ICcnKSk7XG4gICAgICAgICAgICBjb25zdCBlbnRyeVg6IG51bWJlciA9IG9uTGVmdFNpZGUgP1xuICAgICAgICAgICAgICAgIGl0ZW0ueERpYWdDb29yZCArIDQgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLncgKyA0O1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnlYKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgaXRlbS55RGlhZ0Nvb3JkKTtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0XG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeVgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBpdGVtLnlEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmggKyAzKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudylcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS5oKTtcblxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPdXRwdXQuaWRzW2VudHJ5LmludGVybmFsSWRdID0ge1xuICAgICAgICAgICAgICAgICd0aW1lc3RhbXAnOiBpdGVtWzBdLFxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IGl0ZW1bMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5oaWdobGlnaHRPdXRwdXQuaWRzW2VudHJ5LmludGVybmFsSWRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2hvdyB0aGUgdGltZSBsYWJlbGluZyBpbnNpZGUgdGhlIGdyYXBoLlxuICAgICAqIEBwYXJhbSBpdGVtIHtEYXRhRW50cnl9IE9iamVjdCBvZiB0aGUgZW50cnkgaW4gdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGVudHJ5SWR4IHtOdW1iZXJ9IE51bWJlciBvZiB0aGUgaW5kZXggb2YgdGhlIGVudHJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd1RpbWVJbmRpY2F0b3JMYWJlbChpdGVtOiBEYXRhRW50cnksIGVudHJ5SWR4OiBudW1iZXIsIG1vdXNlQ29vcmQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyB0aW1lc3RhbXAgaXMgdGhlIHRpbWUgd2hlcmUgdGhlIG1vdXNlLWN1cnNvciBpc1xuICAgICAgICB0aGlzLmxhYmVsVGltZXN0YW1wW2VudHJ5SWR4XSA9IGl0ZW1bMF07XG4gICAgICAgIHRoaXMubGFiZWxYQ29vcmRbZW50cnlJZHhdID0gaXRlbS54RGlhZ0Nvb3JkO1xuICAgICAgICB0aGlzLmRpc3RMYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBNYXRoLmFicyhtb3VzZUNvb3JkIC0gaXRlbS54RGlhZ0Nvb3JkKTtcbiAgICAgICAgbGV0IG1pbiA9IGQzLm1pbih0aGlzLmRpc3RMYWJlbFhDb29yZCk7XG4gICAgICAgIGxldCBpZHhPZk1pbiA9IHRoaXMuZGlzdExhYmVsWENvb3JkLmZpbmRJbmRleCgoZWxlbSkgPT4gZWxlbSA9PT0gbWluKTtcbiAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSB0aGlzLmNoZWNrTGVmdFNpZGUoaXRlbS54RGlhZ0Nvb3JkKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0gKyAyO1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMubGFiZWxYQ29vcmRbaWR4T2ZNaW5dIC0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuZm9jdXNsYWJlbFRpbWUubm9kZSgpKS53IC0gMjtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsVGltZS50ZXh0KG1vbWVudCh0aGlzLmxhYmVsVGltZXN0YW1wW2lkeE9mTWluXSkuZm9ybWF0KCdERC5NTS5ZWSBISDptbScpKTtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsVGltZVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBvbkxlZnRTaWRlID8gcmlnaHQgOiBsZWZ0KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAxMyk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXNcbiAgICAgICAgICAgIC5hdHRyKCd4MScsIHRoaXMubGFiZWxYQ29vcmRbaWR4T2ZNaW5dKVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgMClcbiAgICAgICAgICAgIC5hdHRyKCd4MicsIHRoaXMubGFiZWxYQ29vcmRbaWR4T2ZNaW5dKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuY2xhc3NlZCgnaGlkZGVuJywgZmFsc2UpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dC50aW1lc3RhbXAgPSB0aGlzLmxhYmVsVGltZXN0YW1wW2lkeE9mTWluXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBnaXZpbmcgaW5mb3JtYXRpb24gaWYgdGhlIG1vdXNlIGlzIG9uIGxlZnQgc2lkZSBvZiB0aGUgZGlhZ3JhbS5cbiAgICAgKiBAcGFyYW0gaXRlbUNvb3JkIHtudW1iZXJ9IHggY29vcmRpbmF0ZSBvZiB0aGUgdmFsdWUgKGUuZy4gbW91c2UpIHRvIGJlIGNoZWNrZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrTGVmdFNpZGUoaXRlbUNvb3JkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICgodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bSkgLyAyID4gaXRlbUNvb3JkKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byB3cmFwIHRoZSB0ZXh0IGZvciB0aGUgeSBheGlzIGxhYmVsLlxuICAgICAqIEBwYXJhbSB0ZXh0IHthbnl9IHkgYXhpcyBsYWJlbFxuICAgICAqIEBwYXJhbSB3aWR0aCB7TnVtYmVyfSB3aWR0aCBvZiB0aGUgYXhpcyB3aGljaCBtdXN0IG5vdCBiZSBjcm9zc2VkXG4gICAgICogQHBhcmFtIHhwb3NpdGlvbiB7TnVtYmVyfSBwb3NpdGlvbiB0byBjZW50ZXIgdGhlIGxhYmVsIGluIHRoZSBtaWRkbGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHdyYXBUZXh0KHRleHRPYmo6IGFueSwgd2lkdGg6IG51bWJlciwgeHBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGV4dE9iai5lYWNoKGZ1bmN0aW9uICh1OiBhbnksIGk6IG51bWJlciwgZDogTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZDMuc2VsZWN0KHRoaXMpLFxuICAgICAgICAgICAgICAgIHdvcmRzID0gdGV4dC50ZXh0KCkuc3BsaXQoL1xccysvKS5yZXZlcnNlKCksXG4gICAgICAgICAgICAgICAgd29yZCxcbiAgICAgICAgICAgICAgICBsaW5lID0gW10sXG4gICAgICAgICAgICAgICAgLy8gbGluZU51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodCA9IChpID09PSBkLmxlbmd0aCAtIDEgPyAwLjMgOiAxLjEpLCAvLyBlbXNcbiAgICAgICAgICAgICAgICB5ID0gdGV4dC5hdHRyKCd5JyksXG4gICAgICAgICAgICAgICAgZHkgPSBwYXJzZUZsb2F0KHRleHQuYXR0cignZHknKSksXG4gICAgICAgICAgICAgICAgdHNwYW4gPSB0ZXh0LnRleHQobnVsbCkuYXBwZW5kKCd0c3BhbicpLmF0dHIoJ3gnLCAwIC0geHBvc2l0aW9uKS5hdHRyKCd5JywgeSkuYXR0cignZHknLCBkeSArICdlbScpO1xuICAgICAgICAgICAgd2hpbGUgKHdvcmQgPSB3b3Jkcy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIGxpbmUucHVzaCh3b3JkKTtcbiAgICAgICAgICAgICAgICB0c3Bhbi50ZXh0KGxpbmUuam9pbignICcpKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZTogU1ZHVFNwYW5FbGVtZW50ID0gPFNWR1RTcGFuRWxlbWVudD50c3Bhbi5ub2RlKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhhc0dyZWF0ZXJXaWR0aDogYm9vbGVhbiA9IG5vZGUuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCkgPiB3aWR0aDtcbiAgICAgICAgICAgICAgICBpZiAoaGFzR3JlYXRlcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRzcGFuLnRleHQobGluZS5qb2luKCcgJykpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gW3dvcmRdO1xuICAgICAgICAgICAgICAgICAgICB0c3BhbiA9IHRleHQuYXBwZW5kKCd0c3BhbicpLmF0dHIoJ3gnLCAwIC0geHBvc2l0aW9uKS5hdHRyKCd5JywgeSkuYXR0cignZHknLCBsaW5lSGVpZ2h0ICsgZHkgKyAnZW0nKS50ZXh0KHdvcmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBib3VuZGluZ3Mgb2YgYSBodG1sIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsIHtPYmplY3R9IE9iamVjdCBvZiB0aGUgaHRtbCBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KTogeyB3OiBudW1iZXIsIGg6IG51bWJlciB9IHtcbiAgICAgICAgbGV0IHcgPSAwO1xuICAgICAgICBsZXQgaCA9IDA7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLmdldEJCb3goKTtcbiAgICAgICAgICAgIHcgPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgaCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBnZXREaW1lbnNpb25zKCkgJyArIGVsICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZ2VuZXJhdGUgdXVpZCBmb3IgYSBkaWFncmFtXG4gICAgICovXG4gICAgcHJpdmF0ZSB1dWlkdjQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuczQoKSArIHRoaXMuczQoKSArICctJyArIHRoaXMuczQoKSArICctJyArIHRoaXMuczQoKSArICctJyArIHRoaXMuczQoKSArICctJyArIHRoaXMuczQoKSArIHRoaXMuczQoKSArIHRoaXMuczQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBnZW5lcmF0ZSBjb21wb25lbnRzIG9mIHRoZSB1dWlkIGZvciBhIGRpYWdyYW1cbiAgICAgKi9cbiAgICBwcml2YXRlIHM0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGxvZ3MgdGhlIGVycm9yIGluIHRoZSBjb25zb2xlLlxuICAgICAqIEBwYXJhbSBlcnJvciB7T2JqZWN0fSBPYmplY3Qgd2l0aCB0aGUgZXJyb3IuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuXG59XG4iXX0=