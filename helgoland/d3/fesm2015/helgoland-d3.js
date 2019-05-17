import { __decorate, __metadata } from 'tslib';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, Injectable, NgModule, IterableDiffers, ViewEncapsulation, ViewChild, defineInjectable, inject } from '@angular/core';
import { HasLoadableContent, Mixin, Time, ColorService, DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Timeseries, Timespan, HelgolandCoreModule } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { timeFormat, timeFormatLocale, extent, mouse, select, line, curveLinear, area, axisRight, bisector, scaleLinear, axisLeft, axisBottom, axisTop, timeSecond, timeMinute, timeHour, timeDay, timeMonth, timeWeek, timeYear, merge, voronoi, values, selectAll, event, zoom, drag, brushX, scaleTime, min } from 'd3';
import moment from 'moment';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
let D3OverviewTimeseriesGraphComponent = class D3OverviewTimeseriesGraphComponent {
    /**
     * @param {?} timeSrvc
     * @param {?} cd
     */
    constructor(timeSrvc, cd) {
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
    ngAfterViewInit() {
        this.rangefactor = this.rangefactor || 1;
        this.calculateOverviewRange();
        this.init = true;
        this.cd.detectChanges();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeInterval"] && this.init) {
            this.calculateOverviewRange();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.cd.detach();
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    timeSpanChanged(timespan) {
        this.onTimespanChanged.emit(timespan);
    }
    /**
     * @param {?} loading
     * @return {?}
     */
    onGraphLoading(loading) {
        this.isContentLoading(loading);
    }
    /**
     * @return {?}
     */
    calculateOverviewRange() {
        /** @type {?} */
        const timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
        this.timespan = timespan;
        this.overviewTimespan = this.timeSrvc.getBufferedTimespan(timespan, this.rangefactor);
    }
};
D3OverviewTimeseriesGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-d3-overview-timeseries-graph',
                template: `<n52-d3-timeseries-graph [datasetIds]="datasetIds" [datasetOptions]="datasetOptions" [reloadForDatasets]="reloadForDatasets"
    [timeInterval]="overviewTimespan" [mainTimeInterval]="timespan" [presenterOptions]="presenterOptions" (onTimespanChanged)="timeSpanChanged($event)"
    (onContentLoading)="onGraphLoading($event)"></n52-d3-timeseries-graph>`,
                styles: [`:host .d3{height:100%}`]
            },] },
];
/** @nocollapse */
D3OverviewTimeseriesGraphComponent.ctorParameters = () => [
    { type: Time },
    { type: ChangeDetectorRef }
];
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
class D3TimeFormatLocaleService {
    /**
     * @param {?} translateService
     */
    constructor(translateService) {
        this.translateService = translateService;
        this.timeFormatLocaleMapper = new Map();
    }
    /**
     * @param {?} localeCode
     * @param {?} definition
     * @return {?}
     */
    addTimeFormatLocale(localeCode, definition) {
        this.timeFormatLocaleMapper.set(localeCode, definition);
    }
    /**
     * @param {?} specifier
     * @return {?}
     */
    getTimeLocale(specifier) {
        /** @type {?} */
        const langCode = this.translateService.currentLang;
        if (this.timeFormatLocaleMapper.has(langCode)) {
            return timeFormatLocale(this.timeFormatLocaleMapper.get(langCode)).format(specifier);
        }
        else {
            return timeFormat(specifier);
        }
    }
}
D3TimeFormatLocaleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
D3TimeFormatLocaleService.ctorParameters = () => [
    { type: TranslateService }
];
/** @nocollapse */ D3TimeFormatLocaleService.ngInjectableDef = defineInjectable({ factory: function D3TimeFormatLocaleService_Factory() { return new D3TimeFormatLocaleService(inject(TranslateService)); }, token: D3TimeFormatLocaleService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
const HoveringStyle = {
    none: 'none',
    line: 'line',
    point: 'point',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class D3TimeseriesGraphComponent extends DatasetPresenterComponent {
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
            const coords = mouse(this.background.node());
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
                let textRectArray = selectAll('.focus-visibility').nodes();
                // get and sort all text labels and rectangle of the text labels and combine related
                for (let i = 0; i < textRectArray.length; i += 2) {
                    labelArray.push([textRectArray[i], textRectArray[i + 1]]);
                }
                // sory by y coordinate
                labelArray.sort((a, b) => parseFloat(select(a[0]).attr('y')) - parseFloat(select(b[0]).attr('y')));
                // translate if overlapping
                labelArray.forEach((el) => {
                    // pairs of 2 objects (rectangle (equal) and label (odd))
                    select(el[0])
                        .attr('transform', (d, i, f) => {
                        if (select(el[0]).attr('visibility') !== 'hidden') {
                            visible = true;
                            /** @type {?} */
                            let ycoord = parseFloat(select(el[0]).attr('y'));
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
                    select(el[1])
                        .attr('transform', (d, i, f) => {
                        if (select(el[1]).attr('visibility') !== 'hidden') {
                            visible = true;
                            /** @type {?} */
                            let ycoord = parseFloat(select(el[0]).attr('y'));
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
            this.dragMoveStart = event.x;
            this.dragMoveRange = [this.xAxisRange.from, this.xAxisRange.to];
        };
        /**
         * Function that controlls the panning (dragging) of the graph.
         */
        this.panMoveHandler = () => {
            this.draggingMove = true;
            if (this.dragMoveStart && this.draggingMove) {
                /** @type {?} */
                let diff = -(event.x - this.dragMoveStart);
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
            this.dragStart = mouse(this.background.node());
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
            select('g.d3line').attr('visibility', 'visible');
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
        const dataExtent = extent(dataEntry.data, (d) => {
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
            let interval = this.getXDomainByTimestamp();
            /** @type {?} */
            let overviewTimespanInterval = [interval[0], interval[1]];
            /** @type {?} */
            let brush = brushX()
                .extent([[0, 0], [this.width, this.height]])
                .on('end', () => {
                // on mouseclick change time after brush was moved
                if (this.mousedownBrush) {
                    /** @type {?} */
                    let timeByCoord = this.getTimestampByCoord(event.selection[0], event.selection[1]);
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
    createPointHovering(entry, line$$1) {
        this.graphBody.selectAll('.hoverDots')
            .data(entry.data.filter((d) => !isNaN(d.value)))
            .enter().append('circle')
            .attr('class', 'hoverDots')
            .attr('id', (d) => 'hover-dot-' + d.timestamp + '-' + entry.id)
            .attr('stroke', 'transparent')
            .attr('fill', 'transparent')
            .attr('cx', line$$1.x())
            .attr('cy', line$$1.y())
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
        this.xScaleBase = scaleTime()
            .domain([new Date(this.xAxisRange.from), new Date(this.xAxisRange.to)])
            .range([bufferXrange, this.width]);
        /** @type {?} */
        let xAxis = axisBottom(this.xScaleBase)
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
            const format = timeSecond(date) < date ? formatMillisecond
                : timeMinute(date) < date ? formatSecond
                    : timeHour(date) < date ? formatMinute
                        : timeDay(date) < date ? formatHour
                            : timeMonth(date) < date ? (timeWeek(date) < date ? formatDay : formatWeek)
                                : timeYear(date) < date ? formatMonth
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
            .call(axisTop(this.xScaleBase).ticks(0).tickSize(0));
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
        const yScale = scaleLinear()
            .domain([yMin - rangeOffset, yMax + rangeOffset])
            .range([this.height, 0]);
        /** @type {?} */
        let yAxisGen = axisLeft(yScale).ticks(5);
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
                select(k[0])
                    .attr('opacity', this.opac.hover);
            })
                .on('mouseout', (d, i, k) => {
                if (!this.yAxisSelect[id].clicked) {
                    select(k[0])
                        .attr('opacity', this.opac.default);
                }
                else {
                    select(k[0])
                        .attr('opacity', this.opac.click);
                }
            })
                .on('mouseup', (d, i, k) => {
                if (!this.yAxisSelect[id].clicked) {
                    select(k[0])
                        .attr('opacity', this.opac.default);
                }
                else {
                    select(k[0])
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
                .call(axisLeft(yScale)
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
                let line$$1 = this.createLine(this.xScaleBase, yScaleBase);
                this.graphBody
                    .append('svg:path')
                    .datum(entry.data)
                    .attr('class', 'line')
                    .attr('fill', 'none')
                    .attr('stroke', entry.color)
                    .attr('stroke-width', entry.lines.lineWidth)
                    .attr('d', line$$1);
                this.graphBody.selectAll('.graphDots')
                    .data(entry.data.filter((d) => !isNaN(d.value)))
                    .enter().append('circle')
                    .attr('class', 'graphDots')
                    .attr('id', (d) => 'dot-' + d.timestamp + '-' + entry.id)
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
    }
    /**
     * @param {?} xScaleBase
     * @param {?} yScaleBase
     * @return {?}
     */
    createLine(xScaleBase, yScaleBase) {
        return line()
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
            .curve(curveLinear);
    }
    /**
     * @param {?} d
     * @param {?} entry
     * @return {?}
     */
    mouseOverPointHovering(d, entry) {
        if (d !== undefined) {
            /** @type {?} */
            let coords = mouse(this.background.node());
            /** @type {?} */
            let dataset = this.datasetMap.get(entry.internalId);
            /** @type {?} */
            let rectBack = this.background.node().getBBox();
            if (coords[0] >= 0 && coords[0] <= rectBack.width && coords[1] >= 0 && coords[1] <= rectBack.height) {
                // highlight hovered dot
                select('#dot-' + d.timestamp + '-' + entry.id).attr('opacity', 0.8).attr('r', '8px');
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
            select('#dot-' + d.timestamp + '-' + entry.id)
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
        this.dragCurrent = mouse(this.background.node());
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
        const bisectDate = bisector((d) => {
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
        selectAll('.focus-visibility')
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
        let min$$1 = min(this.distLabelXCoord);
        /** @type {?} */
        let idxOfMin = this.distLabelXCoord.findIndex((elem) => elem === min$$1);
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
            let text = select(this);
            /** @type {?} */
            let words = text.text().split(/\s+/).reverse();
            /** @type {?} */
            let word;
            /** @type {?} */
            let line$$1 = [];
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
                line$$1.push(word);
                tspan.text(line$$1.join(' '));
                /** @type {?} */
                let node = /** @type {?} */ (tspan.node());
                /** @type {?} */
                let hasGreaterWidth = node.getComputedTextLength() > width;
                if (hasGreaterWidth) {
                    line$$1.pop();
                    tspan.text(line$$1.join(' '));
                    line$$1 = [word];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const D3AxisType = {
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
class D3SelectionRange {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class D3TrajectoryGraphComponent extends DatasetPresenterComponent {
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
    drawDots(values$$1, yScale, options) {
        this.graph.selectAll('dot')
            .data(values$$1)
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
    drawValueLine(values$$1, yScale, options) {
        this.graph.append('svg:path')
            .datum(values$$1)
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
    getXDomain(values$$1) {
        switch (this.presenterOptions.axisType) {
            case D3AxisType.Distance:
                return [values$$1[0].dist, values$$1[values$$1.length - 1].dist];
            case D3AxisType.Time:
                return [values$$1[0].timestamp, values$$1[values$$1.length - 1].timestamp];
            default:
                return [values$$1[0].tick, values$$1[values$$1.length - 1].tick];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends the common d3 component, with the ability to add additional data to the graph. To set or change  additional data, allways sets the complete array of data new. The componet just redraws if
 * the array is reset.
 */
class ExtendedDataD3TimeseriesGraphComponent extends D3TimeseriesGraphComponent {
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
        super(iterableDiffers, api, datasetIdResolver, timeSrvc, timeFormatLocaleService, colorService, translateService);
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.timeFormatLocaleService = timeFormatLocaleService;
        this.colorService = colorService;
        this.translateService = translateService;
        this.additionalData = [];
        this.additionalPreparedData = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes["additionalData"] && this.additionalData && this.graph) {
            this.clearAdditionalData();
            this.plotGraph();
        }
    }
    /**
     * @return {?}
     */
    plotGraph() {
        this.prepareAdditionalData();
        super.plotGraph();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.additionalData) {
            setTimeout(() => this.plotGraph(), 0);
        }
    }
    /**
     * @return {?}
     */
    clearAdditionalData() {
        this.additionalPreparedData.forEach(data => {
            this.yRangesEachUom.forEach(e => {
                /** @type {?} */
                const idx = e.ids.indexOf(data.internalId);
                if (idx > -1) {
                    e.ids.splice(idx, 1);
                }
            });
        });
        if (this.yRangesEachUom) {
            for (let i = this.yRangesEachUom.length - 1; i >= 0; i--) {
                /** @type {?} */
                const element = this.yRangesEachUom[i];
                if (element.ids.length === 0) {
                    this.yRangesEachUom.splice(i, 1);
                }
            }
        }
        this.additionalPreparedData = [];
    }
    /**
     * @return {?}
     */
    prepareAdditionalData() {
        if (this.additionalData) {
            this.additionalData.forEach(entry => {
                if ((entry.linkedDatasetId || entry.yaxisLabel) && entry.data) {
                    if (entry.data.length > 0) {
                        /** @type {?} */
                        let options = entry.datasetOptions || this.datasetOptions.get(entry.linkedDatasetId);
                        /** @type {?} */
                        let dataset = this.datasetMap.get(entry.linkedDatasetId);
                        /** @type {?} */
                        const prepDataIdx = this.additionalPreparedData.findIndex(e => e.internalId.startsWith(entry.linkedDatasetId) || e.internalId === entry.yaxisLabel);
                        /** @type {?} */
                        let dataEntry;
                        if (prepDataIdx === -1) {
                            dataEntry = {
                                internalId: entry.linkedDatasetId ? entry.linkedDatasetId + 'add' : entry.yaxisLabel,
                                id: -1,
                                color: options.color,
                                data: options.visible ? entry.data.map(e => {
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
                            this.additionalPreparedData.push(dataEntry);
                        }
                        else {
                            dataEntry = this.additionalPreparedData[prepDataIdx];
                            dataEntry.axisOptions.uom = dataset ? dataset.uom : entry.yaxisLabel;
                            dataEntry.axisOptions.label = dataset ? dataset.label : entry.yaxisLabel;
                        }
                        /** @type {?} */
                        const newDatasetIdx = this.yRangesEachUom.findIndex((e) => e.ids.indexOf(entry.linkedDatasetId) > -1);
                        /** @type {?} */
                        const dataExtent = extent(dataEntry.data, (d) => {
                            if (this.timespan.from <= d.timestamp && this.timespan.to >= d.timestamp) {
                                return d.value;
                            }
                        });
                        if (isFinite(dataExtent[0]) && isFinite(dataExtent[1])) {
                            /** @type {?} */
                            const range = { min: dataExtent[0], max: dataExtent[1] };
                            this.extendRange(range);
                            if (newDatasetIdx === -1) {
                                /** @type {?} */
                                const existingAxisIndex = this.yRangesEachUom.findIndex(e => e.ids.indexOf(entry.yaxisLabel) !== -1);
                                /** @type {?} */
                                const axisRange = {
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
                                    this.yRangesEachUom[existingAxisIndex] = axisRange;
                                }
                                else {
                                    this.yRangesEachUom.push(axisRange);
                                }
                            }
                            else {
                                if (this.yRangesEachUom[newDatasetIdx].range) {
                                    this.yRangesEachUom[newDatasetIdx].range.min = Math.min(range.min, this.yRangesEachUom[newDatasetIdx].range.min);
                                    this.yRangesEachUom[newDatasetIdx].range.max = Math.max(range.max, this.yRangesEachUom[newDatasetIdx].range.max);
                                }
                                else {
                                    this.yRangesEachUom[newDatasetIdx].range = range;
                                }
                                this.yRangesEachUom[newDatasetIdx].ids.push(entry.linkedDatasetId ? entry.linkedDatasetId + 'add' : entry.yaxisLabel);
                            }
                            if (entry.yaxisLabel && !entry.linkedDatasetId) {
                                /** @type {?} */
                                let idx = this.listOfUoms.indexOf(entry.yaxisLabel);
                                if (idx < 0) {
                                    this.listOfUoms.push(entry.yaxisLabel);
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
    }
    /**
     * @return {?}
     */
    drawAllGraphLines() {
        super.drawAllGraphLines();
        this.additionalPreparedData.forEach(e => this.drawGraphLine(e));
    }
}
ExtendedDataD3TimeseriesGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-extended-data-d3-timeseries-graph',
                template: `<div class="d3" #d3timeseries></div>
`,
                styles: [`.d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}.d3 .formerButton,.d3 .laterButton{fill:grey;opacity:.3}.d3 .formerButton:hover,.d3 .laterButton:hover{opacity:.6}.d3 .arrow{stroke:grey;stroke-width:3px}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
ExtendedDataD3TimeseriesGraphComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: Time },
    { type: D3TimeFormatLocaleService },
    { type: ColorService },
    { type: TranslateService }
];
ExtendedDataD3TimeseriesGraphComponent.propDecorators = {
    additionalData: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class D3GeneralGraphComponent {
    /**
     * @param {?} timeFormatLocaleService
     */
    constructor(timeFormatLocaleService) {
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
    ngAfterViewInit() {
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.generalD3Input && this.rawSvg) {
            this.generalD3Input = changes.generalD3Input.currentValue;
            this.prepareData();
        }
    }
    /**
     * @return {?}
     */
    prepareData() {
        if (this.generalD3Input) {
            /** @type {?} */
            let data = [];
            this.generalD3Input.datasets.forEach((ds, index) => {
                /** @type {?} */
                let dataset = {
                    data: ds.data,
                    id: index
                };
                data = data.concat(ds.data);
                this.generalData.push(dataset);
            });
            this.plotOptions = this.generalD3Input.plotOptions;
            this.axisOptions.date = true;
            this.axisOptions.xRange = this.getRange(data, 'x');
            this.axisOptions.yRange = this.getRange(data, 'y');
            this.plotGraph();
        }
    }
    /**
     * Function to call functions related to plotting a dataset in a graph.
     * @return {?}
     */
    plotGraph() {
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
        this.generalData.forEach(dataset => {
            this.drawGraphLine(dataset);
        });
        this.createHoveringNet(this.generalData);
        this.createHoveringNet(this.generalData);
    }
    /**
     * Function to draw y axis.
     * @param {?} options
     * @return {?}
     */
    drawYaxis(options) {
        /** @type {?} */
        let yRangeOffset = 10;
        /** @type {?} */
        const yRange = this.axisOptions.yRange;
        // check for multiple datapoints
        if (yRange.max !== yRange.min) {
            yRangeOffset = (yRange.max - yRange.min) * 0.10;
        }
        else {
            yRangeOffset = yRange.min * 0.10;
        }
        /** @type {?} */
        const yScale = scaleLinear()
            .domain([yRange.min - yRangeOffset, yRange.max + yRangeOffset])
            .range([this.height, 0]);
        /** @type {?} */
        const yAxisGen = axisLeft(yScale).ticks(5);
        /** @type {?} */
        const yAxis = this.graph.append('svg:g')
            .attr('class', 'y axis')
            .call(yAxisGen);
        /** @type {?} */
        const yAxisLabel = this.graph.append('text')
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
            .tickFormat(() => ''));
        return yScale;
    }
    /**
     * Function to draw x axis.
     * @param {?} options
     * @return {?}
     */
    drawXaxis(options) {
        /** @type {?} */
        const xRange = this.axisOptions.xRange;
        /** @type {?} */
        let ticks = 10;
        /** @type {?} */
        let xRangeOffset = (xRange.max - xRange.min) * 0.10;
        if (xRange.max === xRange.min) {
            ticks = 5;
            xRangeOffset = xRange.min * 0.10;
        }
        /** @type {?} */
        const xScale = scaleLinear()
            .domain([xRange.min - xRangeOffset, xRange.max + xRangeOffset])
            .range([this.buffer, this.width]);
        /** @type {?} */
        const xAxis = axisBottom(xScale)
            .ticks(ticks)
            .tickFormat(d => {
            if (options.date) {
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
                const format = timeSecond(date) < date ? formatMillisecond
                    : timeMinute(date) < date ? formatSecond
                        : timeHour(date) < date ? formatMinute
                            : timeDay(date) < date ? formatHour
                                : timeMonth(date) < date ? (timeWeek(date) < date ? formatDay : formatWeek)
                                    : timeYear(date) < date ? formatMonth
                                        : formatYear;
                return this.timeFormatLocaleService.getTimeLocale(format)(new Date(d.valueOf()));
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
            .tickFormat(() => ''));
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
    }
    /**
     * Function to draw the line of the graph.
     * @param {?} dataset {D3GeneralDataset} Object with information about the datset.
     * @return {?}
     */
    drawGraphLine(dataset) {
        // create grah line component
        this.graphBody = this.graph
            .append('g')
            .attr('clip-path', 'url(#' + dataset.id + ')');
        /** @type {?} */
        let graphLine = line()
            .defined(d => (!isNaN(d.x) && !isNaN(d.y)))
            .x((d) => {
            /** @type {?} */
            const xCoord = this.axisOptions.xScale(d.x);
            if (!isNaN(xCoord)) {
                d.xCoord = xCoord;
                return xCoord;
            }
        })
            .y((d) => {
            /** @type {?} */
            const yCoord = this.axisOptions.yScale(d.y);
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
            .data(dataset.data.filter((d) => !isNaN(d.y)))
            .enter().append('circle')
            .attr('class', 'graphDots')
            .attr('id', function (d) {
            /** @type {?} */
            let datasetxCoordSplit = d.xCoord.toString().split('.')[0] + '-' + d.xCoord.toString().split('.')[1];
            return 'dot-' + datasetxCoordSplit + '-' + dataset.id + '';
        })
            .attr('stroke', this.plotOptions.graph ? this.plotOptions.graph.color : this.defaultGraphOptions.color)
            .attr('fill', this.plotOptions.graph ? this.plotOptions.graph.color : this.defaultGraphOptions.color)
            .attr('cx', graphLine.x())
            .attr('cy', graphLine.y())
            .attr('r', this.plotOptions.graph ? this.plotOptions.graph.lines.pointRadius : this.defaultGraphOptions.lines.pointRadius);
    }
    /**
     * Function to create a net of polygons overlaying the graphs to divide sections for hovering.
     * @param {?} inputData {D3GeneralDataset[]} data containing an array with all datapoints and an id for each dataset
     * @return {?}
     */
    createHoveringNet(inputData) {
        /** @type {?} */
        let data = inputData.map(function (series, i) {
            series.data = series.data.map(function (point) {
                point.series = i;
                point[0] = point.x;
                point[1] = point.y;
                return point;
            });
            return series;
        });
        /** @type {?} */
        let x = scaleLinear();
        /** @type {?} */
        let y = scaleLinear();
        /** @type {?} */
        let vertices = merge(data.map(function (cl, lineIndex) {
            /** *
             * cl = { data: [{0: number, 1: number, series: number, x: number, y: number}, {}, ...], id: number }
             * point = each point in a dataset
              @type {?} */
            let outputLine = cl.data.map(function (point, pointIndex) {
                /** @type {?} */
                let outputPoint = [x(point.xCoord), y(point.yCoord), lineIndex, pointIndex, point, cl];
                return outputPoint; // adding series index to point because data is being flattened
            });
            return outputLine;
        }));
        /** @type {?} */
        let left = this.buffer;
        /** @type {?} */
        let 
        // + this.margin.left,
        top = this.margin.top;
        /** @type {?} */
        let right = this.background.node().getBBox().width + this.buffer;
        /** @type {?} */
        let 
        // + this.margin.left,
        bottom = this.margin.top + this.background.node().getBBox().height;
        /** @type {?} */
        let verticesFiltered = vertices.filter(d => !isNaN(d[0]) || !isNaN(d[1]));
        /** @type {?} */
        const Diffvoronoi = voronoi()
            .extent([[left, top], [right, bottom]]);
        /** @type {?} */
        let diffVoronoi2 = Diffvoronoi.polygons(verticesFiltered);
        /** @type {?} */
        let wrap = this.rawSvg.selectAll('g.d3line').data([verticesFiltered]);
        /** @type {?} */
        let gEnter = wrap.enter().append('g').attr('class', 'd3line').append('g');
        gEnter.append('g').attr('class', 'point-paths');
        /** @type {?} */
        let pointPaths = wrap.select('.point-paths').selectAll('path')
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
                let datasetxCoordSplit = d.data[4].xCoord.toString().split('.')[0] + '-' + d.data[4].xCoord.toString().split('.')[1];
                return 'url(#clip-' + d.data[5].id + '-' + datasetxCoordSplit + ')';
            }
        })
            .attr('d', function (d) {
            if (d !== undefined) {
                return 'M' + d.join(' ') + 'Z';
            }
        })
            .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')
            .on('mousemove', (d) => {
            if (d !== undefined) {
                /** @type {?} */
                let coords = mouse(this.background.node());
                /** @type {?} */
                let dataset = d.data[4];
                /** @type {?} */
                let dist = this.calcDistanceHovering(dataset, coords);
                /** @type {?} */
                let radius = this.plotOptions.graph ? this.plotOptions.graph.lines.pointRadius : this.defaultGraphOptions.lines.pointRadius;
                /** @type {?} */
                let color = this.plotOptions.graph ? this.plotOptions.graph.color : this.defaultGraphOptions.color;
                if (dist <= 8) {
                    /** @type {?} */
                    let rectBack = this.background.node().getBBox();
                    if (coords[0] >= 0 && coords[0] <= rectBack.width && coords[1] >= 0 && coords[1] <= rectBack.height) {
                        /** @type {?} */
                        let datasetxCoordSplit = dataset.xCoord.toString().split('.')[0] + '-' + dataset.xCoord.toString().split('.')[1];
                        select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
                            .attr('opacity', 0.8)
                            .attr('r', (radius * 2));
                        this.highlightRect
                            .style('visibility', 'visible');
                        this.highlightText
                            .style('visibility', 'visible');
                        /** @type {?} */
                        let text = this.plotOptions.date ? 'x: ' + moment(dataset.x).format('DD.MM.YY HH:mm') + ' y: ' + dataset.y : 'x: ' + dataset.x + ' y: ' + dataset.y;
                        /** @type {?} */
                        let dotLabel = this.highlightText
                            .text(text)
                            .attr('class', 'mouseHoverDotLabel')
                            .style('pointer-events', 'none')
                            .style('fill', color);
                        /** @type {?} */
                        let onLeftSide = false;
                        if ((this.background.node().getBBox().width + this.buffer) / 2 > coords[0]) {
                            onLeftSide = true;
                        }
                        /** @type {?} */
                        let rectX = dataset.xCoord + 15;
                        /** @type {?} */
                        let rectY = dataset.yCoord;
                        /** @type {?} */
                        let rectW = this.getDimensions(dotLabel.node()).w + 8;
                        /** @type {?} */
                        let rectH = this.getDimensions(dotLabel.node()).h; // + 4;
                        if (!onLeftSide) {
                            rectX = dataset.xCoord - 15 - rectW;
                            rectY = dataset.yCoord;
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
                            .style('stroke', color)
                            .style('stroke-width', '1px')
                            .style('pointer-events', 'none')
                            .attr('width', rectW)
                            .attr('height', rectH)
                            .attr('transform', 'translate(' + rectX + ', ' + rectY + ')');
                        /** @type {?} */
                        let labelX = dataset.xCoord + 4 + 15;
                        /** @type {?} */
                        let labelY = dataset.yCoord + this.getDimensions(dotRectangle.node()).h - 4;
                        if (!onLeftSide) {
                            labelX = dataset.xCoord - rectW + 4 - 15;
                            labelY = dataset.yCoord + this.getDimensions(dotRectangle.node()).h - 4;
                        }
                        this.highlightText
                            .attr('transform', 'translate(' + labelX + ', ' + labelY + ')');
                    }
                }
                else {
                    /** @type {?} */
                    let datasetxCoordSplit = dataset.xCoord.toString().split('.')[0] + '-' + dataset.xCoord.toString().split('.')[1];
                    select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
                        .attr('opacity', 1)
                        .attr('r', radius);
                    // make label invisible
                    this.highlightRect
                        .style('visibility', 'hidden');
                    this.highlightText
                        .style('visibility', 'hidden');
                }
            }
        })
            .on('mouseout', (d) => {
            if (d !== undefined) {
                /** @type {?} */
                let dataset = d.data[4];
                /** @type {?} */
                let radius = this.plotOptions.graph ? this.plotOptions.graph.lines.pointRadius : this.defaultGraphOptions.lines.pointRadius;
                /** @type {?} */
                let datasetxCoordSplit = dataset.xCoord.toString().split('.')[0] + '-' + dataset.xCoord.toString().split('.')[1];
                select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
                    .attr('opacity', 1)
                    .attr('r', radius);
                // make label invisible
                this.highlightRect
                    .style('visibility', 'hidden');
                this.highlightText
                    .style('visibility', 'hidden');
            }
        });
    }
    /**
     * Function to calculate distance between mouse and a hovered point.
     * @param {?} dataset {} Coordinates of the hovered point.
     * @param {?} coords {} Coordinates of the mouse.
     * @return {?}
     */
    calcDistanceHovering(dataset, coords) {
        /** @type {?} */
        let mX = coords[0] + this.buffer;
        /** @type {?} */
        let mY = coords[1];
        /** @type {?} */
        let 
        // + this.margin.top,
        pX = dataset.xCoord;
        /** @type {?} */
        let pY = dataset.yCoord;
        // calculate distance between point and mouse when hovering
        return Math.sqrt(Math.pow((pX - mX), 2) + Math.pow((pY - mY), 2));
    }
    /**
     * @param {?} data
     * @param {?} selector
     * @return {?}
     */
    getRange(data, selector) {
        /** @type {?} */
        let range = extent(values(data.map((d) => {
            if ((!isNaN(d.x) && !isNaN(d.y))) {
                return d[selector];
            }
        })));
        return { min: range[0], max: range[1] };
    }
    /**
     * Function that returns the height of the graph diagram.
     * @return {?}
     */
    calculateHeight() {
        return (/** @type {?} */ (this.d3Elem.nativeElement)).clientHeight - this.margin.top - this.margin.bottom;
    }
    /**
     * Function that returns the width of the graph diagram.
     * @return {?}
     */
    calculateWidth() {
        return this.rawSvg.node().width.baseVal.value - this.margin.left - this.margin.right;
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
}
D3GeneralGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-d3-general-graph',
                template: `<div class="d3" #d3general></div>
`,
                styles: [`.d3{height:100%;width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.d3 .grid .tick line{stroke:#d3d3d3;stroke-opacity:.7;shape-rendering:crispEdges}.d3 .x{fill:orange;fill-opacity:.4}.d3 .x .tick{stroke:#00f;stroke-width:10px}.d3 .x .tick line{stroke:red;stroke-width:15px}.d3 .axis{fill:orange;fill-opacity:.4}.d3 .axis .tick{stroke:#00f;stroke-width:10px}.d3 .axis .tick line{stroke:#ffa07a;stroke-width:15px}.d3 .graphDots{stroke-width:0;stroke-opacity:1}.d3 .graphDots .hover{stroke-width:20px;stroke-opacity:.5}`]
            },] },
];
/** @nocollapse */
D3GeneralGraphComponent.ctorParameters = () => [
    { type: D3TimeFormatLocaleService }
];
D3GeneralGraphComponent.propDecorators = {
    d3Elem: [{ type: ViewChild, args: ['d3general',] }],
    generalD3Input: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HelgolandD3Module {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { D3TrajectoryGraphComponent, D3TimeseriesGraphComponent, D3GeneralGraphComponent, D3OverviewTimeseriesGraphComponent, ExtendedDataD3TimeseriesGraphComponent, HelgolandD3Module, D3AxisType, D3SelectionRange, HoveringStyle, D3TimeFormatLocaleService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWQzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL21vZGVsL2QzLXBsb3Qtb3B0aW9ucy50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvZDMtdGltZXNlcmllcy1ncmFwaC9kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9kMy9saWIvbW9kZWwvZDMtYXhpcy10eXBlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9tb2RlbC9kMy1zZWxlY3Rpb24tcmFuZ2UudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZDMvbGliL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC9leHRlbmRlZC1kYXRhLWQzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy1nZW5lcmFsLWdyYXBoL2QzLWdlbmVyYWwtZ3JhcGguY29tcG9uZW50LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2QzL2xpYi9kMy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucywgSGFzTG9hZGFibGVDb250ZW50LCBNaXhpbiwgVGltZSwgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzUGxvdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9kMy1wbG90LW9wdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxuNTItZDMtdGltZXNlcmllcy1ncmFwaCBbZGF0YXNldElkc109XCJkYXRhc2V0SWRzXCIgW2RhdGFzZXRPcHRpb25zXT1cImRhdGFzZXRPcHRpb25zXCIgW3JlbG9hZEZvckRhdGFzZXRzXT1cInJlbG9hZEZvckRhdGFzZXRzXCJcbiAgICBbdGltZUludGVydmFsXT1cIm92ZXJ2aWV3VGltZXNwYW5cIiBbbWFpblRpbWVJbnRlcnZhbF09XCJ0aW1lc3BhblwiIFtwcmVzZW50ZXJPcHRpb25zXT1cInByZXNlbnRlck9wdGlvbnNcIiAob25UaW1lc3BhbkNoYW5nZWQpPVwidGltZVNwYW5DaGFuZ2VkKCRldmVudClcIlxuICAgIChvbkNvbnRlbnRMb2FkaW5nKT1cIm9uR3JhcGhMb2FkaW5nKCRldmVudClcIj48L241Mi1kMy10aW1lc2VyaWVzLWdyYXBoPmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5kM3toZWlnaHQ6MTAwJX1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBEM092ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBIYXNMb2FkYWJsZUNvbnRlbnQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBEYXRhc2V0T3B0aW9ucz47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwcmVzZW50ZXJPcHRpb25zOiBEM1Bsb3RPcHRpb25zO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByYW5nZWZhY3RvcjogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmVsb2FkRm9yRGF0YXNldHM6IHN0cmluZ1tdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZXNwYW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uTG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIHB1YmxpYyBvdmVydmlld1RpbWVzcGFuOiBUaW1lc3BhbjtcbiAgICBwdWJsaWMgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgcHJpdmF0ZSBpbml0ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc2VudGVyT3B0aW9ucy5vdmVydmlldyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMgPSB7IG92ZXJ2aWV3OiB0cnVlIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhbmdlZmFjdG9yID0gdGhpcy5yYW5nZWZhY3RvciB8fCAxO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsICYmIHRoaXMuaW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2QuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVTcGFuQ2hhbmdlZCh0aW1lc3BhbjogVGltZXNwYW4pIHtcbiAgICAgICAgdGhpcy5vblRpbWVzcGFuQ2hhbmdlZC5lbWl0KHRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25HcmFwaExvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzQ29udGVudExvYWRpbmcobG9hZGluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVydmlld1JhbmdlKCkge1xuICAgICAgICBjb25zdCB0aW1lc3BhbiA9IHRoaXMudGltZVNydmMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRoaXMudGltZUludGVydmFsKTtcbiAgICAgICAgdGhpcy50aW1lc3BhbiA9IHRpbWVzcGFuO1xuICAgICAgICB0aGlzLm92ZXJ2aWV3VGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGltZXNwYW4sIHRoaXMucmFuZ2VmYWN0b3IpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IHRpbWVGb3JtYXQsIHRpbWVGb3JtYXRMb2NhbGUsIFRpbWVMb2NhbGVEZWZpbml0aW9uIH0gZnJvbSAnZDMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBob2xkcyB0aGUgdHJhbnNsYXRpb25zIGZvciBkMyBjaGFydHMgdGltZSBheGlzIGxhYmVscy5cbiAqIEFkZCBhIG5ldyB0cmFuc2xhdGlvbiB3aXRoIHRoZSBtZXRob2QgJ2FkZFRpbWVGb3JtYXRMb2NhbGUnIGxpa2UgdGhpcyBzYW1wbGU6XG4gKlxuICogYWRkVGltZUZvcm1hdExvY2FsZSgnZGUnLFxuICoge1xuICogICAnZGF0ZVRpbWUnOiAnJWEgJWIgJWUgJVggJVknLFxuICogICAnZGF0ZSc6ICclZC0lbS0lWScsXG4gKiAgICd0aW1lJzogJyVIOiVNOiVTJyxcbiAqICAgJ3BlcmlvZHMnOiBbJ0FNJywgJ1BNJ10sXG4gKiAgICdkYXlzJzogWydTb25udGFnJywgJ01vbnRhZycsICdEaWVuc3RhZycsICdNaXR0d29jaCcsICdEb25uZXJzdGFnJywgJ0ZyZWl0YWcnLCAnU2Ftc3RhZyddLFxuICogICAnc2hvcnREYXlzJzogWydTbycsICdNbycsICdEaScsICdNaScsICdEbycsICdGcicsICdTYSddLFxuICogICAnbW9udGhzJzogWydKYW51YXInLCAnRmVicnVhcicsICdNw4PCpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPa3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ10sXG4gKiAgICdzaG9ydE1vbnRocyc6IFsnSmFuJywgJ0ZlYicsICdNw4PCpHInLCAnQXByJywgJ01haScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZXonXVxuICogfSlcbiAqXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgdGltZUZvcm1hdExvY2FsZU1hcHBlcjogTWFwPHN0cmluZywgVGltZUxvY2FsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBhZGRUaW1lRm9ybWF0TG9jYWxlKGxvY2FsZUNvZGU6IHN0cmluZywgZGVmaW5pdGlvbjogVGltZUxvY2FsZURlZmluaXRpb24pIHtcbiAgICB0aGlzLnRpbWVGb3JtYXRMb2NhbGVNYXBwZXIuc2V0KGxvY2FsZUNvZGUsIGRlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldFRpbWVMb2NhbGUoc3BlY2lmaWVyOiBzdHJpbmcpOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nIHtcbiAgICBjb25zdCBsYW5nQ29kZSA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5jdXJyZW50TGFuZztcbiAgICBpZiAodGhpcy50aW1lRm9ybWF0TG9jYWxlTWFwcGVyLmhhcyhsYW5nQ29kZSkpIHtcbiAgICAgIHJldHVybiB0aW1lRm9ybWF0TG9jYWxlKHRoaXMudGltZUZvcm1hdExvY2FsZU1hcHBlci5nZXQobGFuZ0NvZGUpKS5mb3JtYXQoc3BlY2lmaWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRpbWVGb3JtYXQoc3BlY2lmaWVyKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogUGxvdCBvcHRpb25zIGZvciBEMyBjb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEQzUGxvdE9wdGlvbnMge1xuXG4gICAgLyoqXG4gICAgICogc2hvdyByZWZlcmVuY2UgdmFsdWVzIGZvciBhIGdyYXBoXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIHNob3dSZWZlcmVuY2VWYWx1ZXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogcmVxdWVzdHMgdGhlIGRhdGFzZXQgZGF0YSBnZW5lcmFsaXplZFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBnZW5lcmFsaXplQWxsd2F5cz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGUgcGFubmluZyAodHJ1ZSkgYW5kIHpvb21pbmcgKGZhbHNlKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICB0b2dnbGVQYW5ab29tPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNob3cgb3IgaGlkZSB5IGF4aXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgeWF4aXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBvciBoaWRlIGdyaWQgbGluZXMgaW5zaWRlIHBsb3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgZ3JpZD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzaG93IG9yIGhpZGUgbGluZXMgd2l0aCB2YWx1ZXMgd2hlbiBob3ZlcmluZyB3aXRoIG1vdXNlXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIGhvdmVyYWJsZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzdHlsZSB3aGVuIGhvdmVyaW5nIHdpdGggbW91c2VcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgaG92ZXJTdHlsZT86IEhvdmVyaW5nU3R5bGU7XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0aW5nIGlmIGNvbXBvbmVudCBzaG91bGQgYnVpbGQgb3ZlcnZpZXcgZGlhZ3JhbSBvciBub3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgb3ZlcnZpZXc/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBjb3B5cmlnaHQgbGFiZWxcbiAgICAgKlxuICAgICAqIGRlZmF1bHQgcG9zaXRpb24gaXMgdG9wIGxlZnRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgY29weXJpZ2h0PzogRDNDb3B5cmlnaHQ7XG5cbiAgICAvKipcbiAgICAqIHRvZ2dsZSBkYXRhc2V0IGdyb3VwaW5nIGJ5IHVvbVxuICAgICogdHJ1ZSA9IGdyb3VwIHkgYXhpcyBieSB1b21cbiAgICAqIGZhbHNlID0gc2luZ2xlIHkgYXhpcyBmb3IgZWFjaCB0aW1lc2VyaWVzXG4gICAgKlxuICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAqL1xuICAgIGdyb3VwWWF4aXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgKiBzaG93IHRoZSBsYWJlbCBvZiB0aGUgeGF4aXNcbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgc2hvd1RpbWVMYWJlbD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAqIFJlcXVlc3QgdGhlIGRhdGEgd2l0aCBleHBhbmRlZD10cnVlLCB0byBnZXQgdmFsdWVCZWZvcmVUaW1lc3Bhbi92YWx1ZUFmdGVyVGltZXNwYW5cbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgcmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzPzogYm9vbGVhbjtcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEQzQ29weXJpZ2h0IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHBvc2l0aW9uWD86ICdyaWdodCcgfCAnbGVmdCc7XG4gICAgcG9zaXRpb25ZPzogJ3RvcCcgfCAnYm90dG9tJztcbn1cblxuZXhwb3J0IGVudW0gSG92ZXJpbmdTdHlsZSB7XG4gICAgbm9uZSA9ICdub25lJyxcbiAgICBsaW5lID0gJ2xpbmUnLFxuICAgIHBvaW50ID0gJ3BvaW50J1xufVxuIiwiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbG9yU2VydmljZSxcbiAgICBEYXRhLFxuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbERhdGFzZXRJZCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBNaW5NYXhSYW5nZSxcbiAgICBUaW1lLFxuICAgIFRpbWVzZXJpZXMsXG4gICAgVGltZXNlcmllc0RhdGEsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgeyBIaWdobGlnaHRPdXRwdXQgfSBmcm9tICcuLi9tb2RlbC9kMy1oaWdobGlnaHQnO1xuaW1wb3J0IHsgRDNQbG90T3B0aW9ucywgSG92ZXJpbmdTdHlsZSB9IGZyb20gJy4uL21vZGVsL2QzLXBsb3Qtb3B0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUVudHJ5IHtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIHhEaWFnQ29vcmQ/OiBudW1iZXI7XG4gICAgeURpYWdDb29yZD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbERhdGFFbnRyeSB7XG4gICAgaW50ZXJuYWxJZDogc3RyaW5nO1xuICAgIGlkPzogbnVtYmVyOyAvLyBUT0RPIG5lZWRlZD9cbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGRhdGE6IERhdGFFbnRyeVtdO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICBwb2ludHM6IHtcbiAgICAgICAgZmlsbENvbG9yOiBzdHJpbmdcbiAgICB9O1xuICAgIGxpbmVzPzoge1xuICAgICAgICBsaW5lV2lkdGg/OiBudW1iZXI7XG4gICAgICAgIHBvaW50UmFkaXVzPzogbnVtYmVyO1xuICAgIH07XG4gICAgYmFycz86IHtcbiAgICAgICAgbGluZVdpZHRoPzogbnVtYmVyO1xuICAgIH07XG4gICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgdW9tOiBzdHJpbmc7XG4gICAgICAgIGxhYmVsPzogc3RyaW5nO1xuICAgICAgICB6ZXJvQmFzZWQ/OiBib29sZWFuO1xuICAgICAgICB5QXhpc1JhbmdlPzogTWluTWF4UmFuZ2U7XG4gICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gICAgICAgIHNlcGFyYXRlWUF4aXM/OiBib29sZWFuO1xuICAgICAgICBwYXJhbWV0ZXJzPzoge1xuICAgICAgICAgICAgZmVhdHVyZT86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICAgICAgcGhlbm9tZW5vbj86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICAgICAgb2ZmZXJpbmc/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHZpc2libGU6IGJvb2xlYW47XG4gICAgZm9jdXNMYWJlbFJlY3Q/OiBhbnk7XG4gICAgZm9jdXNMYWJlbD86IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhQ29uc3QgZXh0ZW5kcyBJRGF0YXNldCB7XG4gICAgZGF0YT86IERhdGE8W251bWJlciwgbnVtYmVyXT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWVJhbmdlcyB7XG4gICAgdW9tOiBzdHJpbmc7XG4gICAgcmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgcHJlUmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgb3JpZ2luUmFuZ2U/OiBNaW5NYXhSYW5nZTsgLy8gbmVjZXNzYXJ5IGlmIGdyb3VwZWQgYnkgdW9tXG4gICAgemVyb0Jhc2VkOiBib29sZWFuO1xuICAgIGF1dG9SYW5nZTogYm9vbGVhbjtcbiAgICBvdXRPZnJhbmdlOiBib29sZWFuO1xuICAgIGlkPzogc3RyaW5nOyAvLyBuZWNlc3NhcnkgaWYgZ3JvdXBlZCBieSBpbnRlcm5hbElkXG4gICAgaWRzPzogc3RyaW5nW107IC8vIG5lY2Vzc2FyeSBpZiBncm91cGVkIGJ5IHVvbVxuICAgIGZpcnN0PzogYm9vbGVhbjtcbiAgICB5U2NhbGU/OiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47XG4gICAgb2Zmc2V0PzogbnVtYmVyO1xuICAgIHBhcmFtZXRlcnM6IHsgICAvLyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZvciB0aGUgeSBheGlzIGxhYmVsXG4gICAgICAgIGZlYXR1cmU/OiB7IGlkOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcgfTtcbiAgICAgICAgcGhlbm9tZW5vbj86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgICAgICBvZmZlcmluZz86IHsgaWQ6IFN0cmluZywgbGFiZWw6IFN0cmluZyB9O1xuICAgIH07XG59XG5cbmludGVyZmFjZSBZU2NhbGUge1xuICAgIGJ1ZmZlcjogbnVtYmVyO1xuICAgIHlTY2FsZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xufVxuXG5pbnRlcmZhY2UgWUF4aXNTZWxlY3Rpb24ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2xpY2tlZDogYm9vbGVhbjtcbiAgICBpZHM/OiBBcnJheTxzdHJpbmc+O1xuICAgIHVvbT86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEhpZ2hsaWdodERhdGFzZXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2hhbmdlOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1kMy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkM1wiICNkM3RpbWVzZXJpZXM+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5ncmFwaERvdHN7c3Ryb2tlLXdpZHRoOjA7c3Ryb2tlLW9wYWNpdHk6MX0uZDMgLmdyYXBoRG90cyAuaG92ZXJ7c3Ryb2tlLXdpZHRoOjIwcHg7c3Ryb2tlLW9wYWNpdHk6LjV9LmQzIC5mb3JtZXJCdXR0b24sLmQzIC5sYXRlckJ1dHRvbntmaWxsOmdyZXk7b3BhY2l0eTouM30uZDMgLmZvcm1lckJ1dHRvbjpob3ZlciwuZDMgLmxhdGVyQnV0dG9uOmhvdmVye29wYWNpdHk6LjZ9LmQzIC5hcnJvd3tzdHJva2U6Z3JleTtzdHJva2Utd2lkdGg6M3B4fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIEQzUGxvdE9wdGlvbnM+XG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgLy8gZGlmZmVyZW5jZSB0byB0aW1lc3Bhbi90aW1lSW50ZXJ2YWwgLS0+IGlmIGJydXNoLCB0aGVuIHRoaXMgaXMgdGhlIHRpbWVzcGFuIG9mIHRoZSBtYWluLWRpYWdyYW1cbiAgICBwdWJsaWMgbWFpblRpbWVJbnRlcnZhbDogVGltZXNwYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25IaWdobGlnaHRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SGlnaGxpZ2h0T3V0cHV0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNsaWNrRGF0YVBvaW50OiBFdmVudEVtaXR0ZXI8VGltZXNlcmllc0RhdGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdkM3RpbWVzZXJpZXMnKVxuICAgIHB1YmxpYyBkM0VsZW06IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgaGlnaGxpZ2h0T3V0cHV0OiBIaWdobGlnaHRPdXRwdXQ7XG5cbiAgICAvLyBET00gZWxlbWVudHNcbiAgICBwcm90ZWN0ZWQgcmF3U3ZnOiBhbnk7IC8vIGQzLlNlbGVjdGlvbjxFbnRlckVsZW1lbnQsIHt9LCBudWxsLCB1bmRlZmluZWQ+O1xuICAgIHByb3RlY3RlZCBncmFwaDogYW55O1xuICAgIHByb3RlY3RlZCBncmFwaEZvY3VzOiBhbnk7XG4gICAgcHJvdGVjdGVkIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgZHJhZ1JlY3Q6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0RzogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgY29weXJpZ2h0OiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c0c6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodEZvY3VzOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c2xhYmVsVGltZTogYW55O1xuXG4gICAgLy8gb3B0aW9ucyBmb3IgaW50ZXJhY3Rpb25cbiAgICBwcml2YXRlIGRyYWdnaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgZHJhZ1N0YXJ0OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ0N1cnJlbnQ6IFtudW1iZXIsIG51bWJlcl07XG4gICAgcHJpdmF0ZSBkcmFnZ2luZ01vdmU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkcmFnTW92ZVN0YXJ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkcmFnTW92ZVJhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgbW91c2Vkb3duQnJ1c2g6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBvbGRHcm91cFlheGlzOiBib29sZWFuO1xuXG4gICAgLy8gZGF0YSB0eXBlc1xuICAgIHByb3RlY3RlZCBwcmVwYXJlZERhdGE6IEludGVybmFsRGF0YUVudHJ5W10gPSBbXTsgLy8gOiBEYXRhU2VyaWVzW11cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE1hcDogTWFwPHN0cmluZywgRGF0YUNvbnN0PiA9IG5ldyBNYXAoKTtcbiAgICBwcm90ZWN0ZWQgbGlzdE9mVW9tczogc3RyaW5nW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgeVJhbmdlc0VhY2hVb206IFlSYW5nZXNbXSA9IFtdOyAvLyB5IGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyByYW5nZXMgZm9yIGVhY2ggdW9tXG4gICAgcHJvdGVjdGVkIGRhdGFZcmFuZ2VzOiBZUmFuZ2VzW10gPSBbXTsgLy8geSBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmFuZ2VzIG9mIGFsbCBkYXRhc2V0c1xuICAgIHByaXZhdGUgeEF4aXNSYW5nZTogVGltZXNwYW47IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSB4QXhpc1JhbmdlT3JpZ2luOiBhbnkgPSBbXTsgLy8geCBkb21haW4gcmFuZ2VcbiAgICBwcml2YXRlIHhBeGlzUmFuZ2VQYW46IFtudW1iZXIsIG51bWJlcl07IC8vIHggZG9tYWluIHJhbmdlXG4gICAgcHJpdmF0ZSBsaXN0T2ZTZXBhcmF0aW9uID0gQXJyYXkoKTtcbiAgICBwcml2YXRlIHlBeGlzU2VsZWN0O1xuXG4gICAgcHJpdmF0ZSB4U2NhbGVCYXNlOiBkMy5TY2FsZVRpbWU8bnVtYmVyLCBudW1iZXI+OyAvLyBjYWxjdWxhdGUgZGlhZ3JhbSBjb29yZCBvZiB4IHZhbHVlXG4gICAgcHJpdmF0ZSB5U2NhbGVCYXNlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj47IC8vIGNhbGN1bGF0ZSBkaWFncmFtIGNvb3JkIG9mIHkgdmFsdWVcbiAgICAvLyBwcml2YXRlIGRvdHNPYmplY3RzOiBhbnlbXTtcbiAgICBwcml2YXRlIGxhYmVsVGltZXN0YW1wOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGxhYmVsWENvb3JkOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGRpc3RMYWJlbFhDb29yZDogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBidWZmZXJTdW06IG51bWJlcjtcblxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDQwXG4gICAgfTtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuICAgIHByaXZhdGUgb3BhYyA9IHtcbiAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgaG92ZXI6IDAuMyxcbiAgICAgICAgY2xpY2s6IDAuNVxuICAgIH07XG4gICAgcHJpdmF0ZSBhZGRMaW5lV2lkdGggPSAyOyAvLyB2YWx1ZSBhZGRlZCB0byBsaW5ld2lkdGhcbiAgICBwcml2YXRlIGxvYWRpbmdDb3VudGVyID0gMDtcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lSWQ6IHN0cmluZztcblxuICAgIC8vIGRlZmF1bHQgcGxvdCBvcHRpb25zXG4gICAgcHJpdmF0ZSBwbG90T3B0aW9uczogRDNQbG90T3B0aW9ucyA9IHtcbiAgICAgICAgc2hvd1JlZmVyZW5jZVZhbHVlczogZmFsc2UsXG4gICAgICAgIGdlbmVyYWxpemVBbGx3YXlzOiB0cnVlLFxuICAgICAgICB0b2dnbGVQYW5ab29tOiB0cnVlLFxuICAgICAgICBob3ZlcmFibGU6IHRydWUsXG4gICAgICAgIGhvdmVyU3R5bGU6IEhvdmVyaW5nU3R5bGUucG9pbnQsXG4gICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIHlheGlzOiB0cnVlLFxuICAgICAgICBvdmVydmlldzogZmFsc2UsXG4gICAgICAgIHNob3dUaW1lTGFiZWw6IHRydWUsXG4gICAgICAgIHJlcXVlc3RCZWZvcmVBZnRlclZhbHVlczogZmFsc2VcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaXRlcmFibGVEaWZmZXJzLCBhcGksIGRhdGFzZXRJZFJlc29sdmVyLCB0aW1lU3J2YywgdHJhbnNsYXRlU2VydmljZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUlkID0gdGhpcy51dWlkdjQoKTtcbiAgICAgICAgLy8gdGhpcy5kb3RzT2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmF3U3ZnID0gZDMuc2VsZWN0KHRoaXMuZDNFbGVtLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGhGb2N1cyA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWF4TGFiZWx3aWR0aCkgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMubW91c2Vkb3duQnJ1c2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGRhdGFzZXRJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0TWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhc2V0RGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGlkKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXMoaWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHRpbWVzZXJpZXMpID0+IHRoaXMubG9hZEFkZGVkRGF0YXNldCh0aW1lc2VyaWVzKSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YXNldCkgPT4gdGhpcy5sb2FkQWRkZWREYXRhc2V0KGRhdGFzZXQpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzID0gW107XG4gICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbiA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICBsZXQgc3BsaWNlSWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChzcGxpY2VJZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKHNwbGljZUlkeCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YShlbnRyeSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmICghdHNEYXRhLnNlbGVjdGVkIHx8IHRzRGF0YS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0c0RhdGEuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdHNEYXRhLmxpbmVzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5wb2ludFJhZGl1cyA+IDAgPyB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgKz0gdGhpcy5hZGRMaW5lV2lkdGggOiB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgKz0gMDtcbiAgICAgICAgICAgIHRzRGF0YS5iYXJzLmxpbmVXaWR0aCArPSB0aGlzLmFkZExpbmVXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHRzRGF0YS5heGlzT3B0aW9ucy5zZXBhcmF0ZVlBeGlzIHx8ICF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKHRzRGF0YS5pbnRlcm5hbElkLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtpbnRlcm5hbElkXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2ludGVybmFsSWRdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0c0RhdGEuYXhpc09wdGlvbnMudW9tO1xuICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ1VvbSA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZChlbCA9PiBlbC51b20gPT09IGlkZW50aWZpZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tLmlkcy5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGludGVybmFsSWQpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3RvcihpZGVudGlmaWVyLCB0c0RhdGEuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMucHVzaChpbnRlcm5hbElkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBheGlzIGZvciB1b20gb2YgZGF0YXNldCB3aXRoIHNlbGVjdGVkIGludGVybmFsSWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tICE9PSB1bmRlZmluZWQgJiYgZXhpc3RpbmdVb20uaWRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgaGlnaGxpZ2h0IGF4aXMgb2YgdW9tIGlmIGFsbCBkYXRhc2V0cyB3aXRoIHRoaXMgdW9tIGFyZSBoaWdobGlnaHRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY291bnQgZGF0YXNldHMgZm9yIHNwZWNpZmljIHVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uaWRzLmxlbmd0aCAhPT0gZXhpc3RpbmdVb20uaWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0c0RhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlKSA9PiBlLmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAodHNEYXRhLnNlbGVjdGVkIHx8IHRzRGF0YS5zZWxlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0c0RhdGEuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggLT0gdGhpcy5hZGRMaW5lV2lkdGg7XG4gICAgICAgICAgICB0c0RhdGEubGluZXMucG9pbnRSYWRpdXMgPiAwID8gdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzIC09IHRoaXMuYWRkTGluZVdpZHRoIDogdHNEYXRhLmxpbmVzLnBvaW50UmFkaXVzIC09IDA7XG4gICAgICAgICAgICB0c0RhdGEuYmFycy5saW5lV2lkdGggLT0gdGhpcy5hZGRMaW5lV2lkdGg7XG5cbiAgICAgICAgICAgIGlmICh0c0RhdGEuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyB8fCAhdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1lzZWxlY3Rvcih0c0RhdGEuaW50ZXJuYWxJZCwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdLmNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbdHNEYXRhLmludGVybmFsSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0W3RzRGF0YS5pbnRlcm5hbElkXS5pZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0c0RhdGEuYXhpc09wdGlvbnMudW9tO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllciwgdHNEYXRhLmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtpZGVudGlmaWVyXS5pZHMgPSB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcy5maWx0ZXIoZWwgPT4gZWwgIT09IGludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBEM1Bsb3RPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMub2xkR3JvdXBZYXhpcyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcztcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuaG92ZXJTdHlsZSAhPT0gSG92ZXJpbmdTdHlsZS5wb2ludCAmJiBvcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnZy5kM2xpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGxvdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5yYXdTdmcgJiYgdGhpcy55UmFuZ2VzRWFjaFVvbSkge1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgdGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEoZGF0YXNldCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjZW50ZXJUaW1lKHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNlbnRlcmVkVGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNlbnRlclRpbWVzcGFuKHRoaXMudGltZXNwYW4sIG5ldyBEYXRlKHRpbWVzdGFtcCkpO1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQoY2VudGVyZWRUaW1lc3Bhbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQobmV3IFRpbWVzcGFuKGZyb20sIHRvKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQWRkZWREYXRhc2V0KGRhdGFzZXQ6IElEYXRhc2V0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCBkYXRhc2V0KTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YXNldERhdGEoZGF0YXNldCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgZGF0YSBvZiBkYXRhc2V0XG4gICAgcHJpdmF0ZSBsb2FkRGF0YXNldERhdGEoZGF0YXNldDogSURhdGFzZXQsIGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvdW50ZXIgPT09IDApIHsgdGhpcy5vbkNvbnRlbnRMb2FkaW5nLmVtaXQodHJ1ZSk7IH1cbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlcisrO1xuXG4gICAgICAgIGlmIChkYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRoaXMudGltZXNwYW4sIDAuMik7XG5cbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFRzRGF0YTxbbnVtYmVyLCBudW1iZXJdPihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZmxvdCcsXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMgfHwgdGhpcy5wbG90T3B0aW9ucy5yZXF1ZXN0QmVmb3JlQWZ0ZXJWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYWxpemU6IHRoaXMucGxvdE9wdGlvbnMuZ2VuZXJhbGl6ZUFsbHdheXMgfHwgZGF0YXNldE9wdGlvbnMuZ2VuZXJhbGl6ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyBmb3JjZVVwZGF0ZTogZm9yY2UgfVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5wcmVwYXJlVHNEYXRhKGRhdGFzZXQsIHJlc3VsdCksXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25Db21wbGV0ZUxvYWRpbmdEYXRhKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29tcGxldGVMb2FkaW5nRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlci0tO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nQ291bnRlciA9PT0gMCkgeyB0aGlzLm9uQ29udGVudExvYWRpbmcuZW1pdChmYWxzZSk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBwcmVwYXJlIGVhY2ggZGF0YXNldCBmb3IgdGhlIGdyYXBoIGFuZCBhZGRpbmcgaXQgdG8gYW4gYXJyYXkgb2YgZGF0YXNldHMuXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0lEYXRhc2V0fSBPYmplY3Qgb2YgdGhlIHdob2xlIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUc0RhdGEoZGF0YXNldDogSURhdGFzZXQsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4pOiB2b2lkIHtcblxuICAgICAgICAvLyBhZGQgc3Vycm91bmRpbmcgZW50cmllcyB0byB0aGUgc2V0XG4gICAgICAgIGlmIChkYXRhLnZhbHVlQmVmb3JlVGltZXNwYW4pIHsgZGF0YS52YWx1ZXMudW5zaGlmdChkYXRhLnZhbHVlQmVmb3JlVGltZXNwYW4pOyB9XG4gICAgICAgIGlmIChkYXRhLnZhbHVlQWZ0ZXJUaW1lc3BhbikgeyBkYXRhLnZhbHVlcy5wdXNoKGRhdGEudmFsdWVBZnRlclRpbWVzcGFuKTsgfVxuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS5kYXRhID0gZGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldElkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuXG4gICAgICAgIC8vIFRPRE86IGNoYW5nZSB1b20gZm9yIHRlc3RpbmdcbiAgICAgICAgLy8gaWYgKHRoaXMucHJlcGFyZWREYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgIGRhdGFzZXQudW9tID0gJ21jJztcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGdlbmVyYXRlIHJhbmRvbSBjb2xvciwgaWYgY29sb3IgaXMgbm90IGRlZmluZWRcbiAgICAgICAgaWYgKHN0eWxlcy5jb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLmNvbG9yU2VydmljZS5nZXRDb2xvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5kIG9mIGNoZWNrIGZvciBkYXRhc2V0c1xuICAgICAgICBjb25zdCBkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgaW50ZXJuYWxJZDogZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICAgICAgaWQ6IChkYXRhc2V0SWR4ID49IDAgPyBkYXRhc2V0SWR4IDogdGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoKSxcbiAgICAgICAgICAgIGNvbG9yOiBzdHlsZXMuY29sb3IsXG4gICAgICAgICAgICBkYXRhOiBzdHlsZXMudmlzaWJsZSA/IGRhdGEudmFsdWVzLm1hcChkID0+ICh7IHRpbWVzdGFtcDogZFswXSwgdmFsdWU6IGRbMV0gfSkpIDogW10sXG4gICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHN0eWxlcy5jb2xvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiBzdHlsZXMucG9pbnRSYWRpdXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB1b206IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhc2V0LmxhYmVsLFxuICAgICAgICAgICAgICAgIHplcm9CYXNlZDogc3R5bGVzLnplcm9CYXNlZFlBeGlzLFxuICAgICAgICAgICAgICAgIHlBeGlzUmFuZ2U6IHN0eWxlcy55QXhpc1JhbmdlLFxuICAgICAgICAgICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbjogc3R5bGVzLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICBzZXBhcmF0ZVlBeGlzOiBzdHlsZXMuc2VwYXJhdGVZQXhpcyxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmU6IGRhdGFzZXQucGFyYW1ldGVycy5mZWF0dXJlLFxuICAgICAgICAgICAgICAgICAgICBwaGVub21lbm9uOiBkYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbixcbiAgICAgICAgICAgICAgICAgICAgb2ZmZXJpbmc6IGRhdGFzZXQucGFyYW1ldGVycy5vZmZlcmluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBzdHlsZXMudmlzaWJsZVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBzZXBhcmF0aW9uSWR4OiBudW1iZXIgPSB0aGlzLmxpc3RPZlNlcGFyYXRpb24uZmluZEluZGV4KChpZCkgPT4gaWQgPT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChzdHlsZXMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgaWYgKHNlcGFyYXRpb25JZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0T2ZTZXBhcmF0aW9uLnB1c2goZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbiA9IHRoaXMubGlzdE9mU2VwYXJhdGlvbi5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbHRlcm5hdGl2ZSBsaW5ld1dpZHRoID0gdGhpcy5wbG90T3B0aW9ucy5zZWxlY3RlZC5pbmNsdWRlcyhkYXRhc2V0LnVvbSlcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2YoZGF0YXNldC5pbnRlcm5hbElkKSA+PSAwKSB7XG4gICAgICAgICAgICBkYXRhRW50cnkubGluZXMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuICAgICAgICAgICAgZGF0YUVudHJ5LmxpbmVzLnBvaW50UmFkaXVzID4gMCA/IGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyArPSB0aGlzLmFkZExpbmVXaWR0aCA6IGRhdGFFbnRyeS5saW5lcy5wb2ludFJhZGl1cyArPSAwO1xuICAgICAgICAgICAgZGF0YUVudHJ5LmJhcnMubGluZVdpZHRoICs9IHRoaXMuYWRkTGluZVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrWXNlbGVjdG9yKGRhdGFFbnRyeS5pbnRlcm5hbElkLCBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuaW50ZXJuYWxJZF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmlkcy5wdXNoKGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBzZWxlY3RlZCBkYXRhc2V0cyBmb3IgaGlnaGxpZ2h0aW5nXG4gICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzLnNlcGFyYXRlWUF4aXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMuZmluZEluZGV4KGVsID0+IGVsID09PSBkYXRhRW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5pZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZWQgPSB0aGlzLmNvdW50R3JvdXBlZERhdGFzZXRzKGRhdGFFbnRyeS5heGlzT3B0aW9ucy51b20sIGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLmxlbmd0aCA9PT0gY291bnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5jbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdICYmIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbV0uaWRzLnB1c2goZGF0YUVudHJ5LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdFtkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tXS5jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMueUF4aXNTZWxlY3RbZGF0YUVudHJ5LmludGVybmFsSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhc2V0SWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2RhdGFzZXRJZHhdID0gZGF0YUVudHJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChkYXRhRW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkUmVmZXJlbmNlVmFsdWVEYXRhKGRhdGFzZXQuaW50ZXJuYWxJZCwgc3R5bGVzLCBkYXRhLCBkYXRhc2V0LnVvbSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0RhdGEoZGF0YUVudHJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBhZGQgcmVmZXJlbmNldmFsdWVkYXRhIHRvIHRoZSBkYXRhc2V0IChlLmcuIG1lYW4pLlxuICAgICAqIEBwYXJhbSBpbnRlcm5hbElkIHtTdHJpbmd9IFN0cmluZyB3aXRoIHRoZSBpZCBvZiBhIGRhdGFzZXRcbiAgICAgKiBAcGFyYW0gc3R5bGVzIHtEYXRhc2V0T3B0aW9uc30gT2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gZm9yIGRhdGFzZXQgc3R5bGluZ1xuICAgICAqIEBwYXJhbSBkYXRhIHtEYXRhfSBBcnJheSBvZiBBcnJheXMgY29udGFpbmluZyB0aGUgbWVhc3VyZW1lbnQtZGF0YSBvZiB0aGUgZGF0YXNldFxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIHVvbSBvZiBhIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkZFJlZmVyZW5jZVZhbHVlRGF0YShpbnRlcm5hbElkOiBzdHJpbmcsIHN0eWxlczogRGF0YXNldE9wdGlvbnMsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4sIHVvbTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFlbnRyeS5pbnRlcm5hbElkLnN0YXJ0c1dpdGgoJ3JlZicgKyBpbnRlcm5hbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHN0eWxlcy5zaG93UmVmZXJlbmNlVmFsdWVzLmZvckVhY2goKHJlZlZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmRGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJuYWxJZDogJ3JlZicgKyBpbnRlcm5hbElkICsgcmVmVmFsdWUuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZWZWYWx1ZS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5yZWZlcmVuY2VWYWx1ZXNbcmVmVmFsdWUuaWRdLm1hcChkID0+ICh7IHRpbWVzdGFtcDogZFswXSwgdmFsdWU6IGRbMV0gfSkpLFxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogcmVmVmFsdWUuY29sb3JcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiB1b21cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChyZWZEYXRhRW50cnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZGF0YSB0byBjYWxjdWxhdGUgeSBheGlzIHJhbmdlIG9mIGVhY2ggZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZGF0YUVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluaW5nIGRhdGFzZXQgcmVsYXRlZCBkYXRhLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwcm9jZXNzRGF0YShkYXRhRW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIGxldCBjYWxjdWxhdGVkUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBsZXQgY2FsY3VsYXRlZFByZVJhbmdlOiBNaW5NYXhSYW5nZTtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZWRPcmlnaW5SYW5nZTogTWluTWF4UmFuZ2U7XG4gICAgICAgIGxldCBwcmVkZWZpbmVkUmFuZ2U6IE1pbk1heFJhbmdlO1xuICAgICAgICBpZiAoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UgJiYgZGF0YUVudHJ5LmF4aXNPcHRpb25zLnlBeGlzUmFuZ2UubWluICE9PSBkYXRhRW50cnkuYXhpc09wdGlvbnMueUF4aXNSYW5nZS5tYXgpIHtcbiAgICAgICAgICAgIHByZWRlZmluZWRSYW5nZSA9IGRhdGFFbnRyeS5heGlzT3B0aW9ucy55QXhpc1JhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdXRvRGF0YUV4dGVudDogYm9vbGVhbiA9IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb247XG5cbiAgICAgICAgLy8gZ2V0IG1pbiBhbmQgbWF4IHZhbHVlIG9mIGRhdGFcbiAgICAgICAgY29uc3QgZGF0YUV4dGVudCA9IGQzLmV4dGVudDxEYXRhRW50cnksIG51bWJlcj4oZGF0YUVudHJ5LmRhdGEsIChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FsY3VsYXRlZE9yaWdpblJhbmdlID0geyBtaW46IGRhdGFFeHRlbnRbMF0sIG1heDogZGF0YUV4dGVudFsxXSB9O1xuXG4gICAgICAgIGxldCBzZXREYXRhRXh0ZW50ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIG91dCBvZiBwcmVkZWZpbmVkIHJhbmdlXG4gICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UgJiYgIXRoaXMucGxvdE9wdGlvbnMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgIGlmIChwcmVkZWZpbmVkUmFuZ2UubWluID4gcHJlZGVmaW5lZFJhbmdlLm1heCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWF4LCBtYXg6IHByZWRlZmluZWRSYW5nZS5taW4gfTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUHJlUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1heCwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWluIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZSA9IHsgbWluOiBwcmVkZWZpbmVkUmFuZ2UubWluLCBtYXg6IHByZWRlZmluZWRSYW5nZS5tYXggfTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUHJlUmFuZ2UgPSB7IG1pbjogcHJlZGVmaW5lZFJhbmdlLm1pbiwgbWF4OiBwcmVkZWZpbmVkUmFuZ2UubWF4IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJlZGVmaW5lZFJhbmdlLm1pbiA+IGRhdGFFeHRlbnRbMV0gfHwgcHJlZGVmaW5lZFJhbmdlLm1heCA8IGRhdGFFeHRlbnRbMF0pIHtcbiAgICAgICAgICAgICAgICBzZXREYXRhRXh0ZW50ID0gYXV0b0RhdGFFeHRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXREYXRhRXh0ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXREYXRhRXh0ZW50KSB7XG4gICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UgPSB7IG1pbjogZGF0YUV4dGVudFswXSwgbWF4OiBkYXRhRXh0ZW50WzFdIH07XG4gICAgICAgICAgICB0aGlzLmV4dGVuZFJhbmdlKGNhbGN1bGF0ZWRSYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHlsZSBvcHRpb24gJ3plcm8gYmFzZWQgeS1heGlzJyBpcyBjaGVja2VkLFxuICAgICAgICAvLyB0aGUgYXhpcyB3aWxsIGJlIGFsaWduZWQgdG8gdG9wIDAgKHdpdGggZGF0YSBiZWxvdyAwKSBvciB0byBib3R0b20gMCAod2l0aCBkYXRhIGFib3ZlIDApXG4gICAgICAgIC8vIGxldCB6ZXJvQmFzZWRWYWx1ZSA9IC0xO1xuICAgICAgICBpZiAoZGF0YUVudHJ5LmF4aXNPcHRpb25zLnplcm9CYXNlZCAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgaWYgKGRhdGFFeHRlbnRbMV0gPD0gMCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRSYW5nZS5tYXggPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdGVkUHJlUmFuZ2UpIHsgY2FsY3VsYXRlZFByZVJhbmdlLm1heCA9IDA7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhRXh0ZW50WzBdID49IDApIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkUmFuZ2UubWluID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRlZFByZVJhbmdlKSB7IGNhbGN1bGF0ZWRQcmVSYW5nZS5taW4gPSAwOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdEYXRhc2V0SWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlKSA9PiBlLmludGVybmFsSWQgPT09IGRhdGFFbnRyeS5pbnRlcm5hbElkKTtcblxuICAgICAgICAvLyBzZXQgcmFuZ2UsIHVvbSBhbmQgaWQgZm9yIGVhY2ggZGF0YXNldFxuICAgICAgICBpZiAoZGF0YUVudHJ5LnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0gPSB7XG4gICAgICAgICAgICAgICAgdW9tOiBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tLFxuICAgICAgICAgICAgICAgIGlkOiBkYXRhRW50cnkuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy56ZXJvQmFzZWQsXG4gICAgICAgICAgICAgICAgb3V0T2ZyYW5nZTogc2V0RGF0YUV4dGVudCxcbiAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IGF1dG9EYXRhRXh0ZW50LFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGNhbGN1bGF0ZWRSYW5nZS5taW4pICYmIGlzRmluaXRlKGNhbGN1bGF0ZWRSYW5nZS5tYXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWXJhbmdlc1tuZXdEYXRhc2V0SWR4XS5yYW5nZSA9IGNhbGN1bGF0ZWRSYW5nZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdLnByZVJhbmdlID0gY2FsY3VsYXRlZFByZVJhbmdlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVlyYW5nZXNbbmV3RGF0YXNldElkeF0ub3JpZ2luUmFuZ2UgPSBjYWxjdWxhdGVkT3JpZ2luUmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzW25ld0RhdGFzZXRJZHhdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCByYW5nZSBhbmQgYXJyYXkgb2YgSURzIGZvciBlYWNoIHVvbSB0byBnZW5lcmF0ZSB5LWF4aXMgbGF0ZXIgb25cbiAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbSA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzLmZvckVhY2goKHlSYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHlSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZEluZGV4KChlKSA9PiBlLnVvbSA9PT0geVJhbmdlLnVvbSk7XG4gICAgICAgICAgICAgICAgbGV0IHlyYW5nZU9iajogWVJhbmdlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdW9tOiB5UmFuZ2UudW9tLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogeVJhbmdlLnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBwcmVSYW5nZTogeVJhbmdlLnByZVJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5SYW5nZTogeVJhbmdlLm9yaWdpblJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBpZHM6IFt5UmFuZ2UuaWRdLFxuICAgICAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IHlSYW5nZS56ZXJvQmFzZWQsXG4gICAgICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IHlSYW5nZS5vdXRPZnJhbmdlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvUmFuZ2U6IHlSYW5nZS5hdXRvUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHlSYW5nZS5wYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5hdXRvUmFuZ2UgfHwgeVJhbmdlLmF1dG9SYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeVJhbmdlLnByZVJhbmdlICYmIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5wcmVSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdwcmVSYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnJhbmdlID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLnByZVJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0N1cnJlbnRMYXRlc3QoaWR4LCB5UmFuZ2UsICdyYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5hdXRvUmFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5UmFuZ2Uub3V0T2ZyYW5nZSAhPT0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdLm91dE9mcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAnb3JpZ2luUmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5yYW5nZSA9IHRoaXMueVJhbmdlc0VhY2hVb21baWR4XS5vcmlnaW5SYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDdXJyZW50TGF0ZXN0KGlkeCwgeVJhbmdlLCAncmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFrZUxhdGVzdChpZHgsIHlSYW5nZSwgJ3JhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF0uaWRzLnB1c2goeVJhbmdlLmlkKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20ucHVzaCh5cmFuZ2VPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmdyYXBoKSB7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2V0IHJhbmdlIHRvIGRlZmF1bHQgaW50ZXJ2YWwsIGlmIG1pbiBhbmQgbWF4IG9mIHJhbmdlIGFyZSBub3Qgc2V0LlxuICAgICAqIEBwYXJhbSByYW5nZSB7TWluTWF4UmFuZ2V9IHJhbmdlIHRvIGJlIHNldFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBleHRlbmRSYW5nZShyYW5nZTogTWluTWF4UmFuZ2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJhbmdlLm1pbiA9PT0gcmFuZ2UubWF4KSB7XG4gICAgICAgICAgICByYW5nZS5taW4gPSByYW5nZS5taW4gLSAxO1xuICAgICAgICAgICAgcmFuZ2UubWF4ID0gcmFuZ2UubWF4ICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNoZWNrIHJhbmdlcyBmb3IgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBJbmRleCBvZiBlbGVtZW50XG4gICAgICogQHBhcmFtIG9iaiB7WVJhbmdlc30gbmV3IG9iamVjdCB0byBiZSBjb21wYXJlZCB3aXRoIG9sZFxuICAgICAqIEBwYXJhbSBwb3Mge1N0cmluZ30gdHlwZSBvZiByYW5nZSAoZS5nLiBwcmVSYW5nZSwgcmFuZ2UsIG9yaWdpblJhbmdlKVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tDdXJyZW50TGF0ZXN0KGlkeDogbnVtYmVyLCBvYmo6IFlSYW5nZXMsIHBvczogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5taW4gPiBvYmpbcG9zXS5taW4gJiYgIWlzTmFOKG9ialtwb3NdLm1pbikpIHtcbiAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21baWR4XVtwb3NdLm1pbiA9IG9ialtwb3NdLm1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbVtpZHhdW3Bvc10ubWF4IDwgb2JqW3Bvc10ubWF4ICYmICFpc05hTihvYmpbcG9zXS5tYXgpKSB7XG4gICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXS5tYXggPSBvYmpbcG9zXS5tYXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZXQgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBJbmRleCBvZiBlbGVtZW50XG4gICAgICogQHBhcmFtIG9iaiB7WVJhbmdlc30gbmV3IG9iamVjdFxuICAgICAqIEBwYXJhbSBwb3Mge1N0cmluZ30gdHlwZSBvZiByYW5nZSAoZS5nLiBwcmVSYW5nZSwgcmFuZ2UsIG9yaWdpblJhbmdlKVxuICAgICAqL1xuICAgIHByaXZhdGUgdGFrZUxhdGVzdChpZHg6IG51bWJlciwgb2JqOiBZUmFuZ2VzLCBwb3M6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2lkeF1bcG9zXSA9IG9ialtwb3NdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tICsgKHRoaXMucGxvdE9wdGlvbnMuc2hvd1RpbWVMYWJlbCA/IDAgOiAyMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgZ3JhcGggZGlhZ3JhbS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkud2lkdGguYmFzZVZhbC52YWx1ZSAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMubWF4TGFiZWx3aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIHJhbmdlIGZvciBidWlsZGluZyB0aGUgeSBheGlzIGZvciBlYWNoIHVvbSBvZiBldmVyeSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHRoYXQgaXMgdGhlIHVvbSBvZiBhIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldHlBeGlzUmFuZ2UodW9tOiBzdHJpbmcpOiBNaW5NYXhSYW5nZSB7XG4gICAgICAgIGxldCByYW5nZU9iaiA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZChlbCA9PiBlbC51b20gPT09IHVvbSk7XG4gICAgICAgIGlmIChyYW5nZU9iaikge1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHplcm8gYmFzZWQgeSBheGlzXG4gICAgICAgICAgICAvLyBpZiAocmFuZ2VPYmouemVyb0Jhc2VkKSB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHJhbmdlT2JqLnplcm9CYXNlZFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJhbmdlLm1pbiA9IDA7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmFuZ2UubWF4ID0gMDtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VPYmoucmFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIGVycm9yOiB1b20gZG9lcyBub3QgZXhpc3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBwbG90IHRoZSBncmFwaCBhbmQgaXRzIGRlcGVuZGVuY2llc1xuICAgICAqIChncmFwaCBsaW5lLCBncmFwaCBheGVzLCBldmVudCBoYW5kbGVycylcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcGxvdEdyYXBoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dCA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogMCxcbiAgICAgICAgICAgIGlkczogbmV3IE1hcCgpXG4gICAgICAgIH07XG4gICAgICAgIGlmICghdGhpcy55UmFuZ2VzRWFjaFVvbSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy5saXN0T2ZVb21zLmZpbmRJbmRleCgodW9tKSA9PiB1b20gPT09IGVudHJ5LmF4aXNPcHRpb25zLnVvbSk7XG4gICAgICAgICAgICBpZiAoaWR4IDwgMCkgeyB0aGlzLmxpc3RPZlVvbXMucHVzaChlbnRyeS5heGlzT3B0aW9ucy51b20pOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkYXB0IGF4aXMgaGlnaGxpZ2h0aW5nLCB3aGVuIGNoYW5naW5nIGdyb3VwaW5nIG9mIHkgYXhpc1xuICAgICAgICBpZiAodGhpcy5vbGRHcm91cFlheGlzICE9PSB0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlWXNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYWxjdWxhdGVXaWR0aCgpO1xuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdyYXBoRm9jdXMuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5idWZmZXJTdW0gPSAwO1xuICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBudWxsO1xuXG4gICAgICAgIC8vIGdldCByYW5nZSBvZiB4IGFuZCB5IGF4aXNcbiAgICAgICAgdGhpcy54QXhpc1JhbmdlID0gdGhpcy50aW1lc3BhbjtcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICBsZXQgeUF4aXNBcnJheTogWVJhbmdlc1tdID0gW107XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMgfHwgdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHlBeGlzQXJyYXkgPSB0aGlzLnlSYW5nZXNFYWNoVW9tO1xuICAgICAgICAgICAgLy8gcHVzaCBhbGwgbGlzdE9mU2VwYXJhdGlvbiBpbnRvIHlBeGlzQXJyYXlcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RPZlNlcGFyYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdE9mU2VwYXJhdGlvbi5mb3JFYWNoKChzZXBJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RWw6IFlSYW5nZXMgPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiBlbC5pZCA9PT0gc2VwSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3RWwgJiYgKHlBeGlzQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBuZXdFbC5pZCkgPCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWxsIGRhdGFzZXQgZm9yIHNwZWNpZmljIHVvbSBhcmUgc2VwYXJhdGVkIGZyb20gZ3JvdXBpbmcsIHRoZSB5YXhpcyBvZiB0aGlzIHVvbSB3aWxsIGJlIHJlbW92ZWQgZnJvbSBheGlzXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdVb20gPSB5QXhpc0FycmF5LmZpbmRJbmRleChlbCA9PiBlbC51b20gPT09IG5ld0VsLnVvbSAmJiAoZWwuaWRzICE9PSB1bmRlZmluZWQgfHwgZWwuaWRzLmxlbmd0aCA9PT0gMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVW9tID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgaWQgZnJvbSBpZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRlSWQgPSB5QXhpc0FycmF5W2V4aXN0aW5nVW9tXS5pZHMuZmluZEluZGV4KGlkID0+IGlkID09PSBzZXBJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZUlkID49IDApIHsgeUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLnNwbGljZShkZWxldGVJZCwgMSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeUF4aXNBcnJheVtleGlzdGluZ1VvbV0uaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgeUF4aXNBcnJheVtleGlzdGluZ1VvbV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNBcnJheS5zcGxpY2UoZXhpc3RpbmdVb20sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHlBeGlzQXJyYXkucHVzaChuZXdFbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlBeGlzQXJyYXkgPSB0aGlzLmRhdGFZcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgeUF4aXNBcnJheS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZmlyc3QgPSAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5vZmZzZXQgPSB0aGlzLmJ1ZmZlclN1bTtcblxuICAgICAgICAgICAgICAgIGxldCB5QXhpc1Jlc3VsdCA9IHRoaXMuZHJhd1lheGlzKGVudHJ5KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy55U2NhbGVCYXNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlQmFzZSA9IHlBeGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSB5QXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSB5QXhpc1Jlc3VsdC5idWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVudHJ5LnlTY2FsZSA9IHlBeGlzUmVzdWx0LnlTY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnlTY2FsZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeCBhbmQgeSBheGlzXG4gICAgICAgIHRoaXMuZHJhd1hheGlzKHRoaXMuYnVmZmVyU3VtKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlclN1bSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJyk7XG5cbiAgICAgICAgdGhpcy5kcmF3QWxsR3JhcGhMaW5lcygpO1xuICAgICAgICB0aGlzLmFkZFRpbWVzcGFuSnVtcEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCByZWN0XG4gICAgICAgIGlmICghdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgLy8gZXhlY3V0ZSB3aGVuIGl0IGlzIG5vdCBhbiBvdmVydmlldyBkaWFncmFtXG4gICAgICAgICAgICAvLyBtb3VzZSBldmVudHMgaG92ZXJpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUxpbmVIb3ZlcmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnZy5kM2xpbmUnKS5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMudG9nZ2xlUGFuWm9vbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoZDMuem9vbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3N0YXJ0JywgdGhpcy56b29tU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd6b29tJywgdGhpcy56b29tSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZW5kJywgdGhpcy56b29tRW5kSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKGQzLmRyYWcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzdGFydCcsIHRoaXMucGFuU3RhcnRIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdkcmFnJywgdGhpcy5wYW5Nb3ZlSGFuZGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZW5kJywgdGhpcy5wYW5FbmRIYW5kbGVyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29weXJpZ2h0TGFiZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgd2hlbiBpdCBpcyBvdmVydmlldyBkaWFncmFtXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWw6IFtudW1iZXIsIG51bWJlcl0gPSB0aGlzLmdldFhEb21haW5CeVRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgbGV0IG92ZXJ2aWV3VGltZXNwYW5JbnRlcnZhbCA9IFtpbnRlcnZhbFswXSwgaW50ZXJ2YWxbMV1dO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYnJ1c2hcbiAgICAgICAgICAgIGxldCBicnVzaCA9IGQzLmJydXNoWCgpXG4gICAgICAgICAgICAgICAgLmV4dGVudChbWzAsIDBdLCBbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdXSlcbiAgICAgICAgICAgICAgICAub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb24gbW91c2VjbGljayBjaGFuZ2UgdGltZSBhZnRlciBicnVzaCB3YXMgbW92ZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2Vkb3duQnJ1c2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lQnlDb29yZDogW251bWJlciwgbnVtYmVyXSA9IHRoaXMuZ2V0VGltZXN0YW1wQnlDb29yZChkMy5ldmVudC5zZWxlY3Rpb25bMF0sIGQzLmV2ZW50LnNlbGVjdGlvblsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGltZUJ5Q29vcmRbMF0sIHRpbWVCeUNvb3JkWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCBicnVzaCB0byBzdmdcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYnJ1c2gnKVxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoKVxuICAgICAgICAgICAgICAgIC5jYWxsKGJydXNoLm1vdmUsIG92ZXJ2aWV3VGltZXNwYW5JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYWRkIGV2ZW50IHRvIHNlbGVjdGlvbiB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHJlLXJlbmRlcmluZyBvZiBicnVzaFxuICAgICAgICAgICAgICogYWRkIHN0eWxlIG9mIGJydXNoIHNlbGVjdGlvbiBoZXJlXG4gICAgICAgICAgICAgKiBlLmcuICdmaWxsJyBmb3IgY29sb3IsXG4gICAgICAgICAgICAgKiAnc3Ryb2tlJyBmb3IgYm9yZGVybGluZS1jb2xvcixcbiAgICAgICAgICAgICAqICdzdHJva2UtZGFzaGFycmF5JyBmb3IgY3VzdG9taXppbmcgYm9yZGVybGluZS1zdHlsZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQuc2VsZWN0QWxsKCcuc2VsZWN0aW9uJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZG8gbm90IGFsbG93IGNsZWFyIHNlbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNlbGVjdEFsbCgnLm92ZXJsYXknKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gYWRkIGV2ZW50IHRvIHJlc2l6aW5nIGhhbmRsZSB0byBhbGxvdyBjaGFuZ2UgdGltZSBvbiByZXNpemVcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC5zZWxlY3RBbGwoJy5oYW5kbGUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdyZWQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDAuMylcbiAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlZG93bkJydXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUG9pbnRIb3ZlcmluZyhlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGxpbmU6IGQzLkxpbmU8RGF0YUVudHJ5Pikge1xuICAgICAgICB0aGlzLmdyYXBoQm9keS5zZWxlY3RBbGwoJy5ob3ZlckRvdHMnKVxuICAgICAgICAgICAgLmRhdGEoZW50cnkuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnZhbHVlKSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnaG92ZXJEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkOiBEYXRhRW50cnkpID0+ICdob3Zlci1kb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIGxpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgbGluZS55KCkpXG4gICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzICsgMylcbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKGQ6IERhdGFFbnRyeSkgPT4gdGhpcy5tb3VzZU92ZXJQb2ludEhvdmVyaW5nKGQsIGVudHJ5KSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZDogRGF0YUVudHJ5KSA9PiB0aGlzLm1vdXNlT3V0UG9pbnRIb3ZlcmluZyhkLCBlbnRyeSkpXG4gICAgICAgICAgICAub24oJ21vdXNlZG93bicsIChkOiBEYXRhRW50cnkpID0+IHRoaXMuY2xpY2tEYXRhUG9pbnQoZCwgZW50cnkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmVIb3ZlcmluZygpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZS5mb2N1cycsIHRoaXMubW91c2Vtb3ZlSGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQuZm9jdXMnLCB0aGlzLm1vdXNlb3V0SGFuZGxlcik7XG4gICAgICAgIC8vIGxpbmUgaW5zaWRlIGdyYXBoXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1saW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MScsICcwJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgLy8gbGFiZWwgaW5zaWRlIGdyYXBoXG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsUmVjdCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3doaXRlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWwgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtbGFiZWwnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXdlaWdodCcsICdsaWdodGVyJyk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2UtZm9jdXMtdGltZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrRGF0YVBvaW50KGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljayBwb2ludCcpO1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlcm5hbElkOiBJbnRlcm5hbERhdGFzZXRJZCA9IHRoaXMuZGF0YXNldElkUmVzb2x2ZXIucmVzb2x2ZUludGVybmFsSWQoZW50cnkuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBhcGl1cmwgPSBleHRlcm5hbElkLnVybDtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuOiBUaW1lc3BhbiA9IHsgZnJvbTogZC50aW1lc3RhbXAsIHRvOiBkLnRpbWVzdGFtcCB9O1xuXG4gICAgICAgICAgICAvLyByZXF1ZXN0IGFsbCB0aW1lc2VyaWVzIHRoYXQgaGF2ZSBkYXRhIGZvciB0aGUgc2FtZSBvZmZlcmluZyBhbmQgZmVhdHVyZVxuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VGltZXNlcmllcyhhcGl1cmwsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvZmZlcmluZzogZW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycy5vZmZlcmluZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycy5mZWF0dXJlLmlkXG4gICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAodHNBcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNlcmllcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHNBcnJheS5mb3JFYWNoKHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc2VyaWVzLnB1c2godHMuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgdHMgZGF0YSBieSB0aW1lc2VyaWVzIElEIGZvciBzcGVjaWZpYyBvZmZlcmluZyBhbmQgZmVhdHVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VGltZXNlcmllc0RhdGEoYXBpdXJsLCB0aW1lc2VyaWVzLCB0aW1lc3BhbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHNEYXRhKSA9PiB0aGlzLm9uQ2xpY2tEYXRhUG9pbnQuZW1pdCh0c0RhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRpbWVzcGFuSnVtcEJ1dHRvbnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBkYXRhVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBsZXQgZm9ybWVyVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgbGV0IGxhdGVyVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMucmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdElkeEluVGltZXNwYW4gPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+ICh0aGlzLnRpbWVzcGFuLmZyb20gPCBlWzBdICYmIHRoaXMudGltZXNwYW4udG8gPiBlWzBdKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0SWR4SW5UaW1lc3BhbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdElkeEluVGltZXNwYW4gPSBlbnRyeS5kYXRhLmZpbmRJbmRleChlID0+IChlWzBdID4gdGhpcy50aW1lc3Bhbi5mcm9tICYmIGVbMF0gPiB0aGlzLnRpbWVzcGFuLnRvKSAmJiBpc0Zpbml0ZShlWzFdKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0SWR4SW5UaW1lc3BhbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRlclRpbWVzdGFtcCA9IGVudHJ5LmRhdGFbZW50cnkuZGF0YS5sZW5ndGggLSAxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gZW50cnkuZGF0YS5maW5kSW5kZXgoZSA9PiAoZVswXSA8IHRoaXMudGltZXNwYW4uZnJvbSAmJiBlWzBdIDwgdGhpcy50aW1lc3Bhbi50bykgJiYgaXNGaW5pdGUoZVsxXSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtZXJUaW1lc3RhbXAgPSBlbnRyeS5kYXRhW2VudHJ5LmRhdGEubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRhVmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uV2lkdGggPSA1MDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRSaWdodCA9IDE1O1xuICAgICAgICAgICAgaWYgKGZvcm1lclRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSB0aGlzLmJhY2tncm91bmQuYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Zvcm1lckJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGJ1dHRvbldpZHRoICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyU3VtICsgJywgMCknKVxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jZW50ZXJUaW1lKGZvcm1lclRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgMCArIHRoaXMuYnVmZmVyU3VtICsgbGVmdFJpZ2h0ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgdGhpcy5oZWlnaHQgLyAyICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gyJywgMCArIHRoaXMuYnVmZmVyU3VtICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiAtIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJyb3cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDEnLCAwICsgdGhpcy5idWZmZXJTdW0gKyBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCAwICsgdGhpcy5idWZmZXJTdW0gKyAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyICsgKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXRlclRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSB0aGlzLmJhY2tncm91bmQuYXBwZW5kKCdnJyk7XG4gICAgICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xhdGVyQnV0dG9uJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzUwcHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAodGhpcy53aWR0aCAtIDUwKSArICcsIDApJylcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2VudGVyVGltZShsYXRlclRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Fycm93JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy53aWR0aCAtIGxlZnRSaWdodCArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MScsIHRoaXMuaGVpZ2h0IC8gMiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MicsIHRoaXMud2lkdGggLSAoYnV0dG9uV2lkdGggLSBsZWZ0UmlnaHQpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgdGhpcy5oZWlnaHQgLyAyIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSAvIDIgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcnJvdycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsIHRoaXMud2lkdGggLSBsZWZ0UmlnaHQgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneTEnLCB0aGlzLmhlaWdodCAvIDIgKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneDInLCB0aGlzLndpZHRoIC0gKGJ1dHRvbldpZHRoIC0gbGVmdFJpZ2h0KSArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0IC8gMiArIChidXR0b25XaWR0aCAtIGxlZnRSaWdodCkgLyAyICsgJ3B4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvcHlyaWdodExhYmVsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQpIHtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICAgICAgLy8gZGVmYXVsdCA9IHRvcCBsZWZ0XG4gICAgICAgICAgICBsZXQgeCA9IDA7IC8vIGxlZnRcbiAgICAgICAgICAgIGxldCB5ID0gMDsgLy8gKyB0aGlzLm1hcmdpbi50b3A7IC8vIHRvcFxuICAgICAgICAgICAgdGhpcy5jb3B5cmlnaHQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpO1xuICAgICAgICAgICAgbGV0IGNvcHlyaWdodExhYmVsID0gdGhpcy5jb3B5cmlnaHQuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAgICAgLnRleHQodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQubGFiZWwpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvcHlyaWdodCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnZ3JleScpO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuY29weXJpZ2h0LnBvc2l0aW9uWCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHggPSBiYWNrZ3JvdW5kLncgLSB0aGlzLm1hcmdpbi5yaWdodCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhjb3B5cmlnaHRMYWJlbC5ub2RlKCkpLnc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5jb3B5cmlnaHQucG9zaXRpb25ZID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIHkgPSBiYWNrZ3JvdW5kLmggLSB0aGlzLm1hcmdpbi50b3AgKiAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHlUcmFuc2Zvcm0gPSB5ICsgdGhpcy5nZXREaW1lbnNpb25zKGNvcHlyaWdodExhYmVsLm5vZGUoKSkuaCAtIDM7XG4gICAgICAgICAgICBsZXQgeFRyYW5zZm9ybSA9IHRoaXMuYnVmZmVyU3VtICsgeDtcbiAgICAgICAgICAgIGNvcHlyaWdodExhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHhUcmFuc2Zvcm0gKyAnLCAnICsgeVRyYW5zZm9ybSArICcpJyk7XG4gICAgICAgICAgICB0aGlzLmNvcHlyaWdodC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29weXJpZ2h0JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoY29weXJpZ2h0TGFiZWwubm9kZSgpKS5oKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4VHJhbnNmb3JtICsgJywgJyArIHkgKyAnKScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgZm9yIGV2ZXJ5IHByZXByYXJlZCBkYXRhIGVudHJ5IHRoZSBncmFwaCBsaW5lLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkcmF3QWxsR3JhcGhMaW5lcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0cgPSB0aGlzLmdyYXBoRm9jdXMuYXBwZW5kKCdnJyk7XG4gICAgICAgIGlmICgodGhpcy5wbG90T3B0aW9ucy5ob3ZlclN0eWxlID09PSBIb3ZlcmluZ1N0eWxlLnBvaW50KSAmJiAhdGhpcy5wbG90T3B0aW9ucy5vdmVydmlldykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGZvciBwb2ludCBob3ZlcmluZ1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLmRyYXdHcmFwaExpbmUoZW50cnkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHggZGlhZ3JhbSBjb29yZGluYXRlIGZvciB0aGUgYnJ1c2ggcmFuZ2VcbiAgICAgKiBmb3IgdGhlIG92ZXJ2aWV3IGRpYWdyYW0gYnkgdGhlIHNlbGVjdGVkIHRpbWUgaW50ZXJ2YWwgb2YgdGhlIG1haW4gZGlhZ3JhbS5cbiAgICAgKiBDYWxjdWxhdGUgdG8gZ2V0IGJydXNoIGV4dGVudCB3aGVuIG1haW4gZGlhZ3JhbSB0aW1lIGludGVydmFsIGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRYRG9tYWluQnlUaW1lc3RhbXAoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxjdWxhdGUgcmFuZ2Ugb2YgYnJ1c2ggd2l0aCB0aW1lc3RhbXAgYW5kIG5vdCBkaWFncmFtIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIGZvcm11bGE6XG4gICAgICAgICAqIGJydXNoX21pbiA9XG4gICAgICAgICAqIChvdmVydmlld193aWR0aCAvIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSAqIChicnVzaF9taW4gLSBvdmVydmlld19taW4pXG4gICAgICAgICAqIGJydXNfbWF4ID1cbiAgICAgICAgICogKG92ZXJ2aWV3X3dpZHRoIC8gKG92ZXJ2aWV3X21heCAtIG92ZXJ2aWV3X21pbikpICogKGJydXNoX21heCAtIG92ZXJ2aWV3X21pbilcbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG1pbk92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICBsZXQgbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICBsZXQgbWluRGlhZ3JhbVRpbWVzdGFtcCA9IHRoaXMubWFpblRpbWVJbnRlcnZhbC5mcm9tO1xuICAgICAgICBsZXQgbWF4RGlhZ3JhbVRpbWVzdGFtcCA9IHRoaXMubWFpblRpbWVJbnRlcnZhbC50bztcbiAgICAgICAgbGV0IGRpYWdyYW1XaWR0aCA9IHRoaXMud2lkdGg7XG5cbiAgICAgICAgbGV0IGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCA9IG1heE92ZXJ2aWV3VGltZUludGVydmFsIC0gbWluT3ZlcnZpZXdUaW1lSW50ZXJ2YWw7XG4gICAgICAgIGxldCBkaXZPdmVydmlld1RpbWVXaWR0aCA9IGRpYWdyYW1XaWR0aCAvIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1pbkNhbGNCcnVzaDogbnVtYmVyID0gZGl2T3ZlcnZpZXdUaW1lV2lkdGggKiAobWluRGlhZ3JhbVRpbWVzdGFtcCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsKTtcbiAgICAgICAgbGV0IG1heENhbGNCcnVzaDogbnVtYmVyID0gZGl2T3ZlcnZpZXdUaW1lV2lkdGggKiAobWF4RGlhZ3JhbVRpbWVzdGFtcCAtIG1pbk92ZXJ2aWV3VGltZUludGVydmFsKTtcblxuICAgICAgICByZXR1cm4gW21pbkNhbGNCcnVzaCwgbWF4Q2FsY0JydXNoXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHRpbWVzdGFtcCBmb3IgdGhlIG1haW4gZGlhZ3JhbSBjYWxjdWxhdGVkXG4gICAgICogYnkgdGhlIHNlbGVjdGVkIGNvb3JkaW5hdGUgb2YgdGhlIGJydXNoIHJhbmdlLlxuICAgICAqIEBwYXJhbSBtaW5DYWxjQnJ1c2gge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1pbmltdW0gY29vcmRpbmF0ZSBvZiB0aGUgc2VsZWN0ZWQgYnJ1c2ggcmFuZ2UuXG4gICAgICogQHBhcmFtIG1heENhbGNCcnVzaCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgbWF4aW11bSBjb29yZGluYXRlIG9mIHRoZSBzZWxlY3RlZCBicnVzaCByYW5nZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcEJ5Q29vcmQobWluQ2FsY0JydXNoOiBudW1iZXIsIG1heENhbGNCcnVzaDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxjdWxhdGUgcmFuZ2Ugb2YgYnJ1c2ggd2l0aCB0aW1lc3RhbXAgYW5kIG5vdCBkaWFncmFtIGNvb3JkaW5hdGVzXG4gICAgICAgICAqIGZvcm11bGE6XG4gICAgICAgICAqIG1pbkRpYWdyYW1UaW1lc3RhbXAgPVxuICAgICAgICAgKiAoKG1pbkNhbGNCcnVzaCAvIG92ZXJ2aWV3X3dpZHRoKSAqIChvdmVydmlld19tYXggLSBvdmVydmlld19taW4pKSArIG92ZXJ2aWV3X21pblxuICAgICAgICAgKiBtYXhEaWFncmFtVGltZXN0YW1wID1cbiAgICAgICAgICogKChtYXhDYWxjQnJ1c2ggLyBvdmVydmlld193aWR0aCkgKiAob3ZlcnZpZXdfbWF4IC0gb3ZlcnZpZXdfbWluKSkgKyBvdmVydmlld19taW5cbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG1pbk92ZXJ2aWV3VGltZUludGVydmFsID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICBsZXQgbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICBsZXQgZGlhZ3JhbVdpZHRoID0gdGhpcy53aWR0aDtcblxuICAgICAgICBsZXQgZGlmZk92ZXJ2aWV3VGltZUludGVydmFsID0gbWF4T3ZlcnZpZXdUaW1lSW50ZXJ2YWwgLSBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1pbkRpYWdyYW1UaW1lc3RhbXA6IG51bWJlciA9ICgobWluQ2FsY0JydXNoIC8gZGlhZ3JhbVdpZHRoKSAqIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCkgKyBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcbiAgICAgICAgbGV0IG1heERpYWdyYW1UaW1lc3RhbXA6IG51bWJlciA9ICgobWF4Q2FsY0JydXNoIC8gZGlhZ3JhbVdpZHRoKSAqIGRpZmZPdmVydmlld1RpbWVJbnRlcnZhbCkgKyBtaW5PdmVydmlld1RpbWVJbnRlcnZhbDtcblxuICAgICAgICByZXR1cm4gW21pbkRpYWdyYW1UaW1lc3RhbXAsIG1heERpYWdyYW1UaW1lc3RhbXBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZHJhd3MgdGhlIHggYXhpcyB0byB0aGUgc3ZnIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGJ1ZmZlclhyYW5nZSB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBsZWZ0IGVkZ2UgYW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd1hheGlzKGJ1ZmZlclhyYW5nZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHJhbmdlIGZvciB4IGF4aXMgc2NhbGVcbiAgICAgICAgdGhpcy54U2NhbGVCYXNlID0gZDMuc2NhbGVUaW1lKClcbiAgICAgICAgICAgIC5kb21haW4oW25ldyBEYXRlKHRoaXMueEF4aXNSYW5nZS5mcm9tKSwgbmV3IERhdGUodGhpcy54QXhpc1JhbmdlLnRvKV0pXG4gICAgICAgICAgICAucmFuZ2UoW2J1ZmZlclhyYW5nZSwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20odGhpcy54U2NhbGVCYXNlKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGQudmFsdWVPZigpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFNlY29uZCA9ICc6JVMnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRNaW51dGUgPSAnJUg6JU0nLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF5ID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0V2VlayA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0WWVhciA9ICclWSc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXQgPSBkMy50aW1lU2Vjb25kKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZUhvdXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWludXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lRGF5KGRhdGUpIDwgZGF0ZSA/IGZvcm1hdEhvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVZZWFyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmb3JtYXRZZWFyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmdyaWQpIHtcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHggZ3JpZCBsaW5lc1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAgICAgLmNhbGwoeEF4aXNcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDApLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyB0ZXh0IGxhYmVsIGZvciB0aGUgeCBheGlzXG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dUaW1lTGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgYnVmZmVyWHJhbmdlKSAvIDIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCd0aW1lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHRoZSB5IGF4aXMgZm9yIGVhY2ggZGF0YXNldC5cbiAgICAgKiBFYWNoIHVvbSBoYXMgaXRzIG93biBheGlzLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBhIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WWF4aXMoZW50cnk6IFlSYW5nZXMpOiBZU2NhbGUge1xuICAgICAgICBsZXQgc2hvd0F4aXMgPSAodGhpcy5wbG90T3B0aW9ucy5vdmVydmlldyA/IGZhbHNlIDogKHRoaXMucGxvdE9wdGlvbnMueWF4aXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLnBsb3RPcHRpb25zLnlheGlzKSk7XG4gICAgICAgIC8vIGNoZWNrIGZvciB5IGF4aXMgZ3JvdXBpbmdcbiAgICAgICAgbGV0IHJhbmdlO1xuICAgICAgICBpZiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBncm91cGVkIGF4aXNcbiAgICAgICAgICAgIGxldCB1b21JZHggPSB0aGlzLmxpc3RPZlVvbXMuZmluZEluZGV4KCh1b20pID0+IHVvbSA9PT0gZW50cnkudW9tKTtcbiAgICAgICAgICAgIGlmICh1b21JZHggPj0gMCAmJiBlbnRyeS5pZHMgJiYgZW50cnkuaWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBncm91cGVkIHdpdGggbW9yZSB0aGFuIG9ueSBkYXRhc2V0cyAoaWYgdW9tIGhhcyBtb3JlIHRoYW4gb25lIGRhdGFzZXRzKVxuICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXR5QXhpc1JhbmdlKGVudHJ5LnVvbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRlZCBpZCAoaWYgbm90IGVudHJ5LnVvbSkgT1IgZ3JvdXBlZCwgYnV0IG9ubHkgb25lIGRhdGFzZXQgKGlmIGVudHJ5IGlzIGdyb3VwZWQgYnV0IGhhcyBvbmx5IG9uZSBpZCA9PiB1c2UgcmFuZ2Ugb2YgdGhpcyBkYXRhc2V0KVxuICAgICAgICAgICAgICAgIGxldCBlbnRyeUVsZW0gPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiAoZW50cnkuaWQgPyBlbC5pZCA9PT0gZW50cnkuaWQgOiBlbC5pZCA9PT0gZW50cnkuaWRzWzBdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5RWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGVudHJ5RWxlbS5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZ2UgPSBlbnRyeUVsZW0ucHJlUmFuZ2UgPyBlbnRyeUVsZW0ucHJlUmFuZ2UgOiBlbnRyeUVsZW0ucmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdW5ncm91cGVkIGF4aXNcbiAgICAgICAgICAgIGxldCBlbnRyeUVsZW0gPSB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKGVsKSA9PiBlbCAhPT0gbnVsbCAmJiBlbC5pZCA9PT0gZW50cnkuaWQpO1xuICAgICAgICAgICAgaWYgKGVudHJ5RWxlbSkge1xuICAgICAgICAgICAgICAgIHJhbmdlID0gZW50cnlFbGVtLnByZVJhbmdlID8gZW50cnlFbGVtLnByZVJhbmdlIDogZW50cnlFbGVtLnJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlNaW4gPSAtMTtcbiAgICAgICAgbGV0IHlNYXggPSAxO1xuICAgICAgICBpZiAocmFuZ2UgIT09IHVuZGVmaW5lZCAmJiByYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgeU1pbiA9IHJhbmdlLm1pbjtcbiAgICAgICAgICAgIHlNYXggPSByYW5nZS5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByYW5nZSBmb3IgeSBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHJhbmdlT2Zmc2V0ID0gKHlNYXggLSB5TWluKSAqIDAuMTA7XG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lNaW4gLSByYW5nZU9mZnNldCwgeU1heCArIHJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgICAgICBsZXQgeUF4aXNHZW4gPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDUpO1xuICAgICAgICBsZXQgYnVmZmVyID0gMDtcblxuICAgICAgICAvLyBvbmx5IGlmIHlBeGlzIHNob3VsZCBub3QgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoIXNob3dBeGlzKSB7XG4gICAgICAgICAgICB5QXhpc0dlblxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzXG4gICAgICAgIGNvbnN0IGF4aXMgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh5QXhpc0dlbik7XG5cbiAgICAgICAgLy8gb25seSBpZiB5QXhpcyBzaG91bGQgYmUgdmlzaWJsZVxuICAgICAgICBpZiAoc2hvd0F4aXMpIHtcbiAgICAgICAgICAgIC8vIGRyYXcgeSBheGlzIGxhYmVsXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkeScsICcxZW0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5YXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250JywgJzE4cHggdGltZXMnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgIC50ZXh0KChlbnRyeS5pZCA/IChlbnRyeS51b20gKyAnIEAgJyArIGVudHJ5LnBhcmFtZXRlcnMuZmVhdHVyZS5sYWJlbCkgOiBlbnRyeS51b20pKTtcbiAgICAgICAgICAgIC8vIC50ZXh0KChlbnRyeS5pZCA/IChlbnRyeS5wYXJhbWV0ZXJzLnN0YXRpb24gKyAnICgnICsgZW50cnkudW9tICsgJyAnICsgZW50cnkucGFyYW1ldGVycy5waGVub21lbm9uICsgJyknKSA6IGVudHJ5LnVvbSkpO1xuXG4gICAgICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnLnlheGlzVGV4dExhYmVsJylcbiAgICAgICAgICAgICAgICAuY2FsbCh0aGlzLndyYXBUZXh0LCAoYXhpcy5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCAtIDEwKSwgdGhpcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgY29uc3QgYXhpc1dpZHRoID0gYXhpcy5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgMTAgKyB0aGlzLmdldERpbWVuc2lvbnModGV4dC5ub2RlKCkpLmg7XG4gICAgICAgICAgICAvLyBpZiB5QXhpcyBzaG91bGQgbm90IGJlIHZpc2libGUsIGJ1ZmZlciB3aWxsIGJlIHNldCB0byAwXG4gICAgICAgICAgICBidWZmZXIgPSAoc2hvd0F4aXMgPyBlbnRyeS5vZmZzZXQgKyAoYXhpc1dpZHRoIDwgdGhpcy5tYXJnaW4ubGVmdCA/IHRoaXMubWFyZ2luLmxlZnQgOiBheGlzV2lkdGgpIDogMCk7XG4gICAgICAgICAgICBjb25zdCBheGlzV2lkdGhEaXYgPSAoYXhpc1dpZHRoIDwgdGhpcy5tYXJnaW4ubGVmdCA/IHRoaXMubWFyZ2luLmxlZnQgOiBheGlzV2lkdGgpO1xuXG4gICAgICAgICAgICBpZiAoIWVudHJ5LmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgYXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBidWZmZXIgKyAnLCAwKScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBheGlzV2lkdGhEaXYgLSB0aGlzLm1hcmdpbi5sZWZ0O1xuICAgICAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRleHRPZmYgPSAtICh0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgICAgICBpZiAoZW50cnkuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0ZXh0T2ZmID0gdGhpcy5tYXJnaW4ubGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQuYXR0cigneScsIDAgLSB0ZXh0T2ZmKTtcblxuICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFdpZHRoID0gdGV4dC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0SGVpZ2h0ID0gdGV4dC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0ZXh0Lm5vZGUoKS5nZXRCQm94KCkueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdGV4dC5ub2RlKCkuZ2V0QkJveCgpLnlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBheGlzcmFkaXVzID0gNDtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRPZlBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdGV4dFBvc2l0aW9uLnkgKyB0ZXh0SGVpZ2h0IC8gMiArIGF4aXNyYWRpdXMgLyAyLCAvLyArIDIgYmVjYXVzZSByYWRpdXMgPT09IDRcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5hYnModGV4dFBvc2l0aW9uLnggKyB0ZXh0V2lkdGgpIC0gYXhpc3JhZGl1cyAqIDJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBwb2ludE9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Lmlkcy5mb3JFYWNoKChlbnRyeUlEKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YWVudHJ5ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZChlbCA9PiBlbC5pbnRlcm5hbElkID09PSBlbnRyeUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXNEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2F4aXNkb3QtJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIGRhdGFlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4Jywgc3RhcnRPZlBvaW50cy54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBzdGFydE9mUG9pbnRzLnkgLSBwb2ludE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBheGlzcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludE9mZnNldCArPSBheGlzcmFkaXVzICogMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFlbnRyeSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoZWwgPT4gZWwuaW50ZXJuYWxJZCA9PT0gZW50cnkuaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YWVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpc0RvdHMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdheGlzZG90LScgKyBlbnRyeS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZGF0YWVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIHN0YXJ0T2ZQb2ludHMueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY3knLCBzdGFydE9mUG9pbnRzLnkgLSBwb2ludE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGF4aXNyYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgaWQgdG8gdW9tLCBpZiBncm91cCB5YXhpcyBpcyB0b2dnbGVkLCBlbHNlIHNldCBpZCB0byBkYXRhc2V0IGlkXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IChlbnRyeS5pZCA/IGVudHJ5LmlkIDogZW50cnkudW9tKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tZc2VsZWN0b3IoaWQsIGVudHJ5LnVvbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNEaXYgPSB0aGlzLmdyYXBoLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3lheGlzJyArIGlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzRGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBheGlzV2lkdGhEaXYpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2dyZXknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgKHRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQgPyB0aGlzLm9wYWMuY2xpY2sgOiB0aGlzLm9wYWMuZGVmYXVsdCkpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3Qoa1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmhvdmVyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuY2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNldXAnLCAoZCwgaSwgaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChrWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgdGhpcy5vcGFjLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KGtbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCB0aGlzLm9wYWMuY2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRdLmNsaWNrZWQgPSAhdGhpcy55QXhpc1NlbGVjdFtpZF0uY2xpY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZW50cnlBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5QXJyYXkucHVzaChlbnRyeS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUFycmF5ID0gZW50cnkuaWRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0TGluZShlbnRyeUFycmF5KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFlbnRyeS5maXJzdCkge1xuICAgICAgICAgICAgICAgIGF4aXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeS5vZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF4aXNEaXZcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWF4TGFiZWx3aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeSBncmlkIGxpbmVzXG4gICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgICAgICAuY2FsbChkMy5heGlzTGVmdCh5U2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrcyg1KVxuICAgICAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyBidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgICAgeVNjYWxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hlY2sgd2hldGhlciBvYmplY3QgeUF4aXNTZWxlY3QgZXhpc3RzIHdpdGggc2VsZWN0ZWQgdW9tLlxuICAgICAqIElmIGl0IGRvZXMgbm90IGV4aXN0LCBpdCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHBhcmFtIGlkZW50aWZpZXIge1N0cmluZ30gU3RyaW5nIHByb3ZpZGluZyB0aGUgc2VsZWN0ZWQgdW9tIG9yIHRoZSBzZWxlY3RlZCBkYXRhc2V0IElELlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tZc2VsZWN0b3IoaWRlbnRpZmllcjogc3RyaW5nLCB1b206IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnlBeGlzU2VsZWN0ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgaWQ6IGlkZW50aWZpZXIsXG4gICAgICAgICAgICBpZHM6ICh0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgPyB0aGlzLnlBeGlzU2VsZWN0W2lkZW50aWZpZXJdLmlkcyA6IFtdKSxcbiAgICAgICAgICAgIHVvbTogdW9tLFxuICAgICAgICAgICAgY2xpY2tlZDogKHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCA/IHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0uY2xpY2tlZCA6IGZhbHNlKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMueUF4aXNTZWxlY3RbaWRlbnRpZmllcl0gPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBhZGFwdCB5IGF4aXMgaGlnaGxpZ2h0aW5nIHRvIHNlbGVjdGVkIFRTIG9yIHNlbGVjdGVkIHVvbVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlWXNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgbGV0IGdyb3VwTGlzdCA9IHt9O1xuICAgICAgICBpZiAodGhpcy55QXhpc1NlbGVjdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsb3RPcHRpb25zLmdyb3VwWWF4aXMpIHtcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmU6IGdyb3VwXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMueUF4aXNTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueUF4aXNTZWxlY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gdGhpcy55QXhpc1NlbGVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuaWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2VsZWN0b3I6IFlBeGlzU2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogZGF0YUVsLmF4aXNPcHRpb25zLnVvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3RbaWRdID0gbmV3U2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmNsaWNrZWQgJiYgZWwudW9tICE9PSBlbC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdTZWxlY3RvcjogWUF4aXNTZWxlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlbC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbZWwuaWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFFbC5heGlzT3B0aW9ucy51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtlbC5pZF0gPSBuZXdTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlOiBubyBncm91cFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnlBeGlzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnlBeGlzU2VsZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IHRoaXMueUF4aXNTZWxlY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRWwgPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kKChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbklEO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFFbCAmJiBkYXRhRWwuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBpcyBkYXRhc2V0IHdpdGggaW50ZXJuYWxJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbklEID0gZGF0YUVsLmludGVybmFsSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBpcyB1b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25JRCA9IGVsLnVvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBMaXN0W3NlbGVjdGlvbklEXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VW9tOiBZQXhpc1NlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNlbGVjdGlvbklELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW9tOiBlbC51b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0gPSBjdXJyZW50VW9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uaWRzLnB1c2goZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwudW9tID09PSBzZWxlY3Rpb25JRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgZm9yIGdyb3VwZWQgdW9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwZWREYXRhc2V0cyA9IHRoaXMuY291bnRHcm91cGVkRGF0YXNldHMoc2VsZWN0aW9uSUQsIGVsLnVvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uaWRzLmxlbmd0aCA9PT0gZ3JvdXBlZERhdGFzZXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTGlzdFtzZWxlY3Rpb25JRF0uY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbC5jbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBmb3IgdW5ncm91cGVkIGRhdGFzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cExpc3Rbc2VsZWN0aW9uSURdLmNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy55QXhpc1NlbGVjdCA9IHt9OyAvLyB1bnNlbGVjdCBhbGwgLSB5IGF4aXNcbiAgICAgICAgICAgIHRoaXMueUF4aXNTZWxlY3QgPSBncm91cExpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbGRHcm91cFlheGlzID0gdGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYW1vdW50IG9mIGRhdGFzZXRzIHRoYXQgYXJlIGdyb3VwZWQgd2l0aCB0aGUgc2FtZSB1b21cbiAgICAgKiBAcGFyYW0gdW9tIHtTdHJpbmd9IHVvbVxuICAgICAqIEBwYXJhbSBpZCB7U3RyaW5nfSBpbnRlcm5hbElkIG9mIHRoZSBkYXRhc2V0IHRoYXQgY2FuIGJlIHNraXBwZWRcbiAgICAgKiByZXR1cm5zIHtOdW1iZXJ9IGFtb3VudCBvZiBkYXRhc2V0cyB3aXRoIHRoZSBnaXZlbiB1b21cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvdW50R3JvdXBlZERhdGFzZXRzKHVvbTogc3RyaW5nLCBpZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGFycmF5VW9tQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGFZcmFuZ2VzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsICE9PSBudWxsICYmIGVsLnVvbSA9PT0gdW9tICYmIGVsLmlkICE9PSBpZCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoZHMgPT4gZHMuaW50ZXJuYWxJZCA9PT0gZWwuaWQgJiYgZHMuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyA9PT0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPj0gMCkgeyBhcnJheVVvbUNvdW50Kys7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnJheVVvbUNvdW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNldCBzZWxlY3RlZCBJZHMgdGhhdCBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXG4gICAgICogQHBhcmFtIGlkcyB7QXJyYXl9IEFycmF5IG9mIFN0cmluZ3MgY29udGFpbmluZyB0aGUgSWRzLlxuICAgICAqIEBwYXJhbSB1b20ge1N0cmluZ30gU3RyaW5nIHdpdGggdGhlIHVvbSBmb3IgdGhlIHNlbGVjdGVkIElkc1xuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0TGluZShpZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGxldCBjaGFuZ2VGYWxzZTogSGlnaGxpZ2h0RGF0YXNldFtdID0gW107XG4gICAgICAgIGxldCBjaGFuZ2VUcnVlOiBIaWdobGlnaHREYXRhc2V0W10gPSBbXTtcbiAgICAgICAgaWRzLmZvckVhY2goKElEKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihJRCkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZUZhbHNlLnB1c2goeyBpZDogSUQsIGNoYW5nZTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2VUcnVlLnB1c2goeyBpZDogSUQsIGNoYW5nZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IGNoYW5nZUZhbHNlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZElkcyhjaGFuZ2VGYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSWRzKGNoYW5nZVRydWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgY2hhbmdlcyBzdGF0ZSBvZiBzZWxlY3RlZCBJZHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VTZWxlY3RlZElkcyh0b0hpZ2hsaWdodERhdGFzZXQ6IEhpZ2hsaWdodERhdGFzZXRbXSwgY2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgICAgIHRvSGlnaGxpZ2h0RGF0YXNldC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkSWQob2JqLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5zcGxpY2UodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkgPT09IG9iai5pZCksIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b0hpZ2hsaWdodERhdGFzZXQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLmluZGV4T2Yob2JqLmlkKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZElkKG9iai5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25EYXRhc2V0U2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkRGF0YXNldElkcyk7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgZ3JhcGggbGluZSBmb3IgZWFjaCBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyBhIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGRyYXdHcmFwaExpbmUoZW50cnk6IEludGVybmFsRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IGdldFlheGlzUmFuZ2UgPSB0aGlzLnlSYW5nZXNFYWNoVW9tLmZpbmQoKG9iaikgPT4gb2JqLmlkcy5pbmRleE9mKGVudHJ5LmludGVybmFsSWQpID4gLTEpO1xuICAgICAgICAvLyBjaGVjayBmb3IgeSBheGlzIGdyb3VwaW5nXG4gICAgICAgIGxldCBnZXRZYXhpc1JhbmdlID0gdGhpcy5nZXRZYXhpc1JhbmdlKGVudHJ5KTtcblxuICAgICAgICBpZiAoZW50cnkuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZ2V0WWF4aXNSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHlTY2FsZUJhc2UgPSBnZXRZYXhpc1JhbmdlLnlTY2FsZTtcblxuICAgICAgICAgICAgICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGJvZHkgdG8gY2xpcCBncmFwaFxuICAgICAgICAgICAgICAgIC8vIHVuaXF1ZSBJRCBnZW5lcmF0ZWQgdGhyb3VnaCB0aGUgY3VycmVudCB0aW1lIChjdXJyZW50IHRpbWUgd2hlbiBpbml0aWFsaXplZClcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnlTZWxlY3RvckNsaXAgPSAnY2xpcCcgKyB0aGlzLmN1cnJlbnRUaW1lSWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpjbGlwUGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIHF1ZXJ5U2VsZWN0b3JDbGlwKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBncmFoIGxpbmVcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoQm9keSA9IHRoaXMuZ3JhcGhcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgcXVlcnlTZWxlY3RvckNsaXAgKyAnKScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGdyYXBoIGxpbmVcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMuY3JlYXRlTGluZSh0aGlzLnhTY2FsZUJhc2UsIHlTY2FsZUJhc2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuZGF0dW0oZW50cnkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIGVudHJ5LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgZW50cnkubGluZXMubGluZVdpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaEJvZHkuc2VsZWN0QWxsKCcuZ3JhcGhEb3RzJylcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoZW50cnkuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnZhbHVlKSkpXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyYXBoRG90cycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkOiBEYXRhRW50cnkpID0+ICdkb3QtJyArIGQudGltZXN0YW1wICsgJy0nICsgZW50cnkuaWQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBlbnRyeS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgbGluZS54KCkpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGxpbmUueSgpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLmhvdmVyU3R5bGUgPT09IEhvdmVyaW5nU3R5bGUucG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQb2ludEhvdmVyaW5nKGVudHJ5LCBsaW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3dzIGxhYmVsaW5nIHZpYSBtb3VzbW92ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlbW92ZUhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICB0aGlzLmxhYmVsVGltZXN0YW1wID0gW107XG4gICAgICAgIHRoaXMubGFiZWxYQ29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5kaXN0TGFiZWxYQ29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEuZm9yRWFjaCgoZW50cnksIGVudHJ5SWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLmdldEl0ZW1Gb3JYKGNvb3Jkc1swXSArIHRoaXMuYnVmZmVyU3VtLCBlbnRyeS5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RpYWdyYW1JbmRpY2F0b3IoZW50cnksIGlkeCwgY29vcmRzWzBdLCBlbnRyeUlkeCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvdXRwdXRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0SWRzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXRwdXRJZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdCBzaG93IGxpbmUgaW4gZ3JhcGggd2hlbiBubyBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZXN0YW1wXG4gICAgICAgICAgICB0aGlzLmZvY3VzRy5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsYXN0ID0gMCxcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgZmlyc3QgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGxhYmVsQXJyYXk6IFtkMy5CYXNlVHlwZSwgZDMuQmFzZVR5cGVdW10gPSBbXSxcbiAgICAgICAgICAgICAgICB0ZXh0UmVjdEFycmF5OiBkMy5CYXNlVHlwZVtdID0gZDMuc2VsZWN0QWxsKCcuZm9jdXMtdmlzaWJpbGl0eScpLm5vZGVzKCk7XG5cbiAgICAgICAgICAgIC8vIGdldCBhbmQgc29ydCBhbGwgdGV4dCBsYWJlbHMgYW5kIHJlY3RhbmdsZSBvZiB0aGUgdGV4dCBsYWJlbHMgYW5kIGNvbWJpbmUgcmVsYXRlZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0UmVjdEFycmF5Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxBcnJheS5wdXNoKFt0ZXh0UmVjdEFycmF5W2ldLCB0ZXh0UmVjdEFycmF5W2kgKyAxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc29yeSBieSB5IGNvb3JkaW5hdGVcbiAgICAgICAgICAgIGxhYmVsQXJyYXkuc29ydCgoYSwgYikgPT4gcGFyc2VGbG9hdChkMy5zZWxlY3QoYVswXSkuYXR0cigneScpKSAtIHBhcnNlRmxvYXQoZDMuc2VsZWN0KGJbMF0pLmF0dHIoJ3knKSkpO1xuXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgaWYgb3ZlcmxhcHBpbmdcbiAgICAgICAgICAgIGxhYmVsQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBwYWlycyBvZiAyIG9iamVjdHMgKHJlY3RhbmdsZSAoZXF1YWwpIGFuZCBsYWJlbCAob2RkKSlcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoZWxbMF0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCwgaSwgZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdChlbFswXSkuYXR0cigndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5Y29vcmQ6IG51bWJlciA9IHBhcnNlRmxvYXQoZDMuc2VsZWN0KGVsWzBdKS5hdHRyKCd5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoMCwgKGxhc3QgKyAzMCkgLSB5Y29vcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMTApIHsgb2Zmc2V0ID0gMTA7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KGVsWzFdKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGksIGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkMy5zZWxlY3QoZWxbMV0pLmF0dHIoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeWNvb3JkOiBudW1iZXIgPSBwYXJzZUZsb2F0KGQzLnNlbGVjdChlbFswXSkuYXR0cigneScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IE1hdGgubWF4KDAsIChsYXN0ICsgMzApIC0geWNvb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8IDEwKSB7IG9mZnNldCA9IDEwOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QgPSBvZmZzZXQgKyB5Y29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwgJyArIG9mZnNldCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25IaWdobGlnaHRDaGFuZ2VkLmVtaXQodGhpcy5oaWdobGlnaHRPdXRwdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgaGlkZXMgdGhlIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb3VzZW91dEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaGlkZURpYWdyYW1JbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBzdGFydGluZyB0aGUgZHJhZyBoYW5kbGluZyBmb3IgdGhlIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYW5TdGFydEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVTdGFydCA9IGQzLmV2ZW50Lng7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVSYW5nZSA9IFt0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNvbnRyb2xscyB0aGUgcGFubmluZyAoZHJhZ2dpbmcpIG9mIHRoZSBncmFwaC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhbk1vdmVIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nTW92ZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmRyYWdNb3ZlU3RhcnQgJiYgdGhpcy5kcmFnZ2luZ01vdmUpIHtcbiAgICAgICAgICAgIGxldCBkaWZmID0gLShkMy5ldmVudC54IC0gdGhpcy5kcmFnTW92ZVN0YXJ0KTsgLy8gZDMuZXZlbnQuc3ViamVjdC54KTtcbiAgICAgICAgICAgIGxldCBhbW91bnRUaW1lc3RhbXAgPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMV0gLSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMF07XG4gICAgICAgICAgICBsZXQgcmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgPSBhbW91bnRUaW1lc3RhbXAgLyB0aGlzLndpZHRoO1xuICAgICAgICAgICAgbGV0IG5ld1RpbWVNaW4gPSB0aGlzLmRyYWdNb3ZlUmFuZ2VbMF0gKyAocmF0aW9UaW1lc3RhbXBEaWFnQ29vcmQgKiBkaWZmKTtcbiAgICAgICAgICAgIGxldCBuZXdUaW1lTWF4ID0gdGhpcy5kcmFnTW92ZVJhbmdlWzFdICsgKHJhdGlvVGltZXN0YW1wRGlhZ0Nvb3JkICogZGlmZik7XG5cbiAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZVBhbiA9IFtuZXdUaW1lTWluLCBuZXdUaW1lTWF4XTtcbiAgICAgICAgICAgIHRoaXMudGltZXNwYW4gPSB7IGZyb206IHRoaXMueEF4aXNSYW5nZVBhblswXSwgdG86IHRoaXMueEF4aXNSYW5nZVBhblsxXSB9O1xuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5kcyB0aGUgZHJhZ2dpbmcgY29udHJvbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBhbkVuZEhhbmRsZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnhBeGlzUmFuZ2VQYW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2VQYW5bMF0sIHRoaXMueEF4aXNSYW5nZVBhblsxXSk7XG4gICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgdGhpcy5kcmFnTW92ZVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnhBeGlzUmFuZ2VQYW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBzdGFydHMgdGhlIHpvb20gaGFuZGxpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSB6b29tU3RhcnRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIC8vIGRlcGVuZGVudCBvbiBwb2ludCBvciBsaW5lIGhvdmVyaW5nXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbi5wdXNoKFt0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkcmF3cyBhIHJlY3RhbmdsZSB3aGVuIHpvb20gaXMgc3RhcnRlZCBhbmQgdGhlIG1vdXNlIGlzIG1vdmluZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21IYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3RHJhZ1JlY3RhbmdsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZW5kcyB0aGUgem9vbSBoYW5kbGluZyBhbmQgY2FsY3VsYXRlcyB0aGUgdmlhIHpvb20gc2VsZWN0ZWQgdGltZSBpbnRlcnZhbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHpvb21FbmRIYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0IHx8ICF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gYmFjayB0byBvcmlnaW4gcmFuZ2UgKGZyb20gLSB0bylcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUodGhpcy54QXhpc1JhbmdlT3JpZ2luWzBdWzBdLCB0aGlzLnhBeGlzUmFuZ2VPcmlnaW5bMF1bMV0pO1xuICAgICAgICAgICAgICAgIHRoaXMueEF4aXNSYW5nZU9yaWdpbiA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeERvbWFpblJhbmdlO1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0WzBdIDw9IHRoaXMuZHJhZ0N1cnJlbnRbMF0pIHtcbiAgICAgICAgICAgICAgICB4RG9tYWluUmFuZ2UgPSB0aGlzLmdldHhEb21haW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4RG9tYWluUmFuZ2UgPSB0aGlzLmdldHhEb21haW4odGhpcy5kcmFnQ3VycmVudFswXSwgdGhpcy5kcmFnU3RhcnRbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54QXhpc1JhbmdlID0geyBmcm9tOiB4RG9tYWluUmFuZ2VbMF0sIHRvOiB4RG9tYWluUmFuZ2VbMV0gfTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh0aGlzLnhBeGlzUmFuZ2UuZnJvbSwgdGhpcy54QXhpc1JhbmdlLnRvKTtcbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzZXREcmFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lKHhTY2FsZUJhc2U6IGQzLlNjYWxlVGltZTxudW1iZXIsIG51bWJlcj4sIHlTY2FsZUJhc2U6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPikge1xuICAgICAgICByZXR1cm4gZDMubGluZTxEYXRhRW50cnk+KClcbiAgICAgICAgICAgIC5kZWZpbmVkKChkKSA9PiAhaXNOYU4oZC52YWx1ZSkpXG4gICAgICAgICAgICAueCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhEaWFnQ29vcmQgPSB4U2NhbGVCYXNlKGQudGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHhEaWFnQ29vcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQueERpYWdDb29yZCA9IHhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueSgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHlEaWFnQ29vcmQgPSB5U2NhbGVCYXNlKGQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeURpYWdDb29yZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZC55RGlhZ0Nvb3JkID0geURpYWdDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUxpbmVhcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZU92ZXJQb2ludEhvdmVyaW5nKGQ6IERhdGFFbnRyeSwgZW50cnk6IEludGVybmFsRGF0YUVudHJ5KSB7XG4gICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gdGhpcy5kYXRhc2V0TWFwLmdldChlbnRyeS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIGxldCByZWN0QmFjayA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgaWYgKGNvb3Jkc1swXSA+PSAwICYmIGNvb3Jkc1swXSA8PSByZWN0QmFjay53aWR0aCAmJiBjb29yZHNbMV0gPj0gMCAmJiBjb29yZHNbMV0gPD0gcmVjdEJhY2suaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGhvdmVyZWQgZG90XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKS5hdHRyKCdvcGFjaXR5JywgMC44KS5hdHRyKCdyJywgJzhweCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0LnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgbGV0IGRvdExhYmVsID0gdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGAke2QudmFsdWV9ICR7ZW50cnkuYXhpc09wdGlvbnMudW9tfSAke21vbWVudChkLnRpbWVzdGFtcCkuZm9ybWF0KCdERC5NTS5ZWSBISDptbScpfWApXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZUhvdmVyRG90TGFiZWwnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKTtcbiAgICAgICAgICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICgodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlclN1bSkgLyAyID4gY29vcmRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTGVmdFNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVjdFg6IG51bWJlciA9IGQueERpYWdDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZC55RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGxldCByZWN0VzogbnVtYmVyID0gdGhpcy5nZXREaW1lbnNpb25zKGRvdExhYmVsLm5vZGUoKSkudyArIDg7XG4gICAgICAgICAgICAgICAgbGV0IHJlY3RIOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS5oOyAvLyArIDQ7XG4gICAgICAgICAgICAgICAgaWYgKCFvbkxlZnRTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RYID0gZC54RGlhZ0Nvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkLnlEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoY29vcmRzWzFdICsgcmVjdEggKyA0KSA+IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGxhYmVsIGJlbG93IHggYXhpc1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRlIGxhYmVsIHRvIGEgaGlnaGVyIHBsYWNlLiAtIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZW50cnkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWDogbnVtYmVyID0gZC54RGlhZ0Nvb3JkICsgNCArIDE1O1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IGQueURpYWdDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICBpZiAoIW9uTGVmdFNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxYID0gZC54RGlhZ0Nvb3JkIC0gcmVjdFcgKyA0IC0gMTU7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsWSA9IGQueURpYWdDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBsYWJlbFggKyAnLCAnICsgbGFiZWxZICsgJyknKTtcbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBvdXRwdXQgb2YgaGlnaGxpZ2h0ZWQgZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGQudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICBpZHM6IG5ldyBNYXAoKS5zZXQoZW50cnkuaW50ZXJuYWxJZCwgeyB0aW1lc3RhbXA6IGQudGltZXN0YW1wLCB2YWx1ZTogZC52YWx1ZSB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodENoYW5nZWQuZW1pdCh0aGlzLmhpZ2hsaWdodE91dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdXNlT3V0UG9pbnRIb3ZlcmluZyhkOiBEYXRhRW50cnksIGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSkge1xuICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkLnRpbWVzdGFtcCArICctJyArIGVudHJ5LmlkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIGVudHJ5LmxpbmVzLnBvaW50UmFkaXVzKTtcbiAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0WWF4aXNSYW5nZShlbnRyeTogSW50ZXJuYWxEYXRhRW50cnkpOiBZUmFuZ2VzIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgZW50cnkgZGF0YXNldCBzaG91bGQgYmUgc2VwYXJhdGVkIG9yIGVudHJ5IGRhdGFzZXRzIHNob3VsZCBiZSBncm91cGVkXG4gICAgICAgIGlmICghZW50cnkuYXhpc09wdGlvbnMuc2VwYXJhdGVZQXhpcyAmJiAodGhpcy5wbG90T3B0aW9ucy5ncm91cFlheGlzIHx8IHRoaXMucGxvdE9wdGlvbnMuZ3JvdXBZYXhpcyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueVJhbmdlc0VhY2hVb20uZmluZCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiBvYmoudW9tID09PSBlbnRyeS5heGlzT3B0aW9ucy51b20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSAvLyB1b20gZG9lcyBleGlzdCBpbiB0aGlzLnlSYW5nZXNFYWNoVW9tXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFZcmFuZ2VzLmZpbmQoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYmogIT09IG51bGwgJiYgb2JqLmlkID09PSBlbnRyeS5pbnRlcm5hbElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gLy8gaWQgZG9lcyBleGlzdCBpbiB0aGlzLmRhdGFZcmFuZ2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdGltZXN0YW1wIG9mIHByb3ZpZGVkIHggZGlhZ3JhbSBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0gc3RhcnQge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1pbmltdW0gZGlhZ3JhbSBjb29yZGluYXRlLlxuICAgICAqIEBwYXJhbSBlbmQge051bWJlcn0gTnVtYmVyIHdpdGggdGhlIG1heGltdW0gZGlhZ3JhbSBjb29yZGluYXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0eERvbWFpbihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgZG9tTWluQXJyID0gW107XG4gICAgICAgIGxldCBkb21NYXhBcnIgPSBbXTtcbiAgICAgICAgbGV0IGRvbU1pbjogbnVtYmVyO1xuICAgICAgICBsZXQgZG9tTWF4OiBudW1iZXI7XG4gICAgICAgIGxldCB0bXA7XG4gICAgICAgIGxldCBsb3dlc3RNaW4gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIGxldCBsb3dlc3RNYXggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgc3RhcnQgKz0gdGhpcy5idWZmZXJTdW07XG4gICAgICAgIGVuZCArPSB0aGlzLmJ1ZmZlclN1bTtcblxuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgZG9tTWluQXJyLnB1c2goZW50cnkuZGF0YS5maW5kKChlbGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS54RGlhZ0Nvb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLnhEaWFnQ29vcmQgPj0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF0gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGRvbU1heEFyci5wdXNoKGVudHJ5LmRhdGEuZmluZCgoZWxlbSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ueERpYWdDb29yZCA+PSBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5W2luZGV4XSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZG9tTWluQXJyLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRvbU1pbkFycltpXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gZG9tTWluQXJyW2ldLnhEaWFnQ29vcmQ7XG4gICAgICAgICAgICAgICAgaWYgKHRtcCA8IGxvd2VzdE1pbikge1xuICAgICAgICAgICAgICAgICAgICBsb3dlc3RNaW4gPSB0bXA7XG4gICAgICAgICAgICAgICAgICAgIGRvbU1pbiA9IGRvbU1pbkFycltpXS50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGRvbU1heEFyci5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkb21NYXhBcnJbal0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRtcCA9IGRvbU1heEFycltqXS54RGlhZ0Nvb3JkO1xuICAgICAgICAgICAgICAgIGlmICh0bXAgPCBsb3dlc3RNYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXN0TWF4ID0gdG1wO1xuICAgICAgICAgICAgICAgICAgICBkb21NYXggPSBkb21NYXhBcnJbal0udGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2RvbU1pbiwgZG9tTWF4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNvbmZpZ3VyYXRlcyBhbmQgZHJhd3MgdGhlIHJlY3RhbmdsZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdEcmFnUmVjdGFuZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ1N0YXJ0KSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmRyYWdDdXJyZW50ID0gZDMubW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG5cbiAgICAgICAgY29uc3QgeDEgPSBNYXRoLm1pbih0aGlzLmRyYWdTdGFydFswXSwgdGhpcy5kcmFnQ3VycmVudFswXSk7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5tYXgodGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kcmFnUmVjdCAmJiAhdGhpcy5kcmFnUmVjdEcpIHtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcgPSB0aGlzLmdyYXBoLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsLW9wYWNpdHknLCAuMilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmx1ZScpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gdGhpcy5kcmFnUmVjdEcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHgxICsgdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWRyYWcnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdC5hdHRyKCd3aWR0aCcsIHgyIC0geDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZGlzYWJsZXMgdGhlIGRyYXdpbmcgcmVjdGFuZ2xlIGNvbnRyb2wuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldERyYWcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdSZWN0Rykge1xuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdEcucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0RyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgYSBzcGVjaWZpYyBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0geCB7TnVtYmVyfSBDb29yZGluYXRlcyBvZiB0aGUgbW91c2UgaW5zaWRlIHRoZSBkaWFncmFtLlxuICAgICAqIEBwYXJhbSBkYXRhIHtEYXRhRW50cnl9IEFycmF5IHdpdGggdGhlIGRhdGEgb2YgZWFjaCBkYXRhc2V0IGVudHJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0SXRlbUZvclgoeDogbnVtYmVyLCBkYXRhOiBEYXRhRW50cnlbXSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy54U2NhbGVCYXNlLmludmVydCh4KTtcbiAgICAgICAgY29uc3QgYmlzZWN0RGF0ZSA9IGQzLmJpc2VjdG9yKChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkWzBdO1xuICAgICAgICB9KS5sZWZ0O1xuICAgICAgICByZXR1cm4gYmlzZWN0RGF0ZShkYXRhLCBpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBkaXNhYmxlcyB0aGUgbGFiZWxpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlRGlhZ3JhbUluZGljYXRvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmZvY3VzLXZpc2liaWxpdHknKVxuICAgICAgICAgICAgLmF0dHIoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBlbmFibGVzIHRoZSBsYWJsZWluZyBvZiBlYWNoIGRhdGFzZXQgZW50cnkuXG4gICAgICogQHBhcmFtIGVudHJ5IHtJbnRlcm5hbERhdGFFbnRyeX0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIGlkeCB7TnVtYmVyfSBOdW1iZXIgd2l0aCB0aGUgcG9zaXRpb24gb2YgdGhlIGRhdGFzZXQgZW50cnkgaW4gdGhlIGRhdGEgYXJyYXkuXG4gICAgICogQHBhcmFtIHhDb29yZE1vdXNlIHtOdW1iZXJ9IE51bWJlciBvZiB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZS5cbiAgICAgKiBAcGFyYW0gZW50cnlJZHgge051bWJlcn0gTnVtYmVyIG9mIHRoZSBpbmRleCBvZiB0aGUgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93RGlhZ3JhbUluZGljYXRvciA9IChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIGlkeDogbnVtYmVyLCB4Q29vcmRNb3VzZTogbnVtYmVyLCBlbnRyeUlkeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW06IERhdGFFbnRyeSA9IGVudHJ5LmRhdGFbaWR4XTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3RMYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBudWxsO1xuXG4gICAgICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQgJiYgaXRlbS55RGlhZ0Nvb3JkICYmIGl0ZW1bMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2hlcmUgbW91c2UgaXNcbiAgICAgICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgICAgIC8vIHNob3cgbGFiZWwgaWYgZGF0YSBhdmFpbGFibGUgZm9yIHRpbWVcbiAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgdHJ1ZSwgZW50cnlJZHgpO1xuXG4gICAgICAgICAgICBsZXQgeE1vdXNlQW5kQnVmZmVyID0geENvb3JkTW91c2UgKyB0aGlzLmJ1ZmZlclN1bTtcbiAgICAgICAgICAgIGxldCBsYWJlbEJ1ZmZlciA9ICgodGhpcy50aW1lc3Bhbi5mcm9tIC8gKHRoaXMudGltZXNwYW4udG8gLSB0aGlzLnRpbWVzcGFuLmZyb20pKSAqIDAuMDAwMSlcbiAgICAgICAgICAgICAgICAqICgodGhpcy50aW1lc3Bhbi5mcm9tIC8gKHRoaXMudGltZXNwYW4udG8gLSB0aGlzLnRpbWVzcGFuLmZyb20pKSAqIDAuMDAwMSk7XG5cbiAgICAgICAgICAgIGxhYmVsQnVmZmVyID0gTWF0aC5tYXgoMTAsIGxhYmVsQnVmZmVyKTtcblxuICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoZW50cnksIGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW0sIGVudHJ5SWR4LCB4TW91c2VBbmRCdWZmZXIpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS54RGlhZ0Nvb3JkID49IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW0gfHwgeE1vdXNlQW5kQnVmZmVyIDwgaXRlbS54RGlhZ0Nvb3JkIC0gbGFiZWxCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoVmlzTGFiZWwoZW50cnksIGZhbHNlLCBlbnRyeUlkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh4TW91c2VBbmRCdWZmZXIgPCBpdGVtLnhEaWFnQ29vcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGF0YVtpZHggLSAxXSAmJiAoTWF0aC5hYnMoZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkIC0geE1vdXNlQW5kQnVmZmVyKSA8IE1hdGguYWJzKGl0ZW0ueERpYWdDb29yZCAtIHhNb3VzZUFuZEJ1ZmZlcikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBjbG9zZXN0IGVsZW1lbnQgdG8gbW91c2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxWYWx1ZXMoZW50cnksIGVudHJ5LmRhdGFbaWR4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lSW5kaWNhdG9yTGFiZWwoZW50cnkuZGF0YVtpZHggLSAxXSwgZW50cnlJZHgsIHhNb3VzZUFuZEJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgdHJ1ZSwgZW50cnlJZHgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBncmFwaCB3aWR0aCBhbmQgcmFuZ2UgYmV0d2VlbiBkYXRhIHBvaW50IGFuZCBtb3VzZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkID49IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVudHJ5LmRhdGFbaWR4IC0gMV0ueERpYWdDb29yZCA8PSB0aGlzLmJ1ZmZlclN1bVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgZW50cnkuZGF0YVtpZHggLSAxXS54RGlhZ0Nvb3JkICsgbGFiZWxCdWZmZXIgPCB4TW91c2VBbmRCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hWaXNMYWJlbChlbnRyeSwgZmFsc2UsIGVudHJ5SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IHNldCBob3ZlcmluZyBmb3IgbGFiZWxidWZmZXIgYWZ0ZXIgbGFzdCBhbmQgYmVmb3JlIGZpcnN0IHZhbHVlIG9mIHRoZSBncmFwaFxuICAgICAgICAgICAgLy8gaGlkZSBsYWJlbCBpZiBubyBkYXRhIGF2YWlsYWJsZSBmb3IgdGltZVxuICAgICAgICAgICAgdGhpcy5jaFZpc0xhYmVsKGVudHJ5LCBmYWxzZSwgZW50cnlJZHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2hhbmdlIHZpc2liaWxpdHkgb2YgbGFiZWwgYW5kIHdoaXRlIHJlY3RhbmdsZSBpbnNpZGUgZ3JhcGggKG5leHQgdG8gbW91c2UtY3Vyc29yIGxpbmUpLlxuICAgICAqIEBwYXJhbSBlbnRyeSB7RGF0YUVudHJ5fSBPYmplY3QgY29udGFpbmluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gdmlzaWJsZSB7Qm9vbGVhbn0gQm9vbGVhbiBnaXZpbmcgaW5mb3JtYXRpb24gYWJvdXQgdmlzaWJpbGl0eSBvZiBhIGxhYmVsLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hWaXNMYWJlbChlbnRyeTogSW50ZXJuYWxEYXRhRW50cnksIHZpc2libGU6IGJvb2xlYW4sIGVudHJ5SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9jdXMtdmlzaWJpbGl0eScpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZm9jdXMtdmlzaWJpbGl0eScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFxuICAgICAgICAgICAgICAgIC5hdHRyKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuICAgICAgICAgICAgdGhpcy5sYWJlbFRpbWVzdGFtcFtlbnRyeUlkeF0gPSBudWxsO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGlnaGxpZ2h0T3V0cHV0Lmlkc1tlbnRyeS5pbnRlcm5hbElkXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNob3cgdGhlIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGVudHJ5IHtEYXRhRW50cnl9IE9iamVjdCBjb250YWluZyB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gaXRlbSB7RGF0YUVudHJ5fSBPYmplY3Qgb2YgdGhlIGVudHJ5IGluIHRoZSBkYXRhc2V0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd0xhYmVsVmFsdWVzKGVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeSwgaXRlbTogRGF0YUVudHJ5KTogdm9pZCB7XG4gICAgICAgIGxldCBpZCA9IDE7XG4gICAgICAgIGxldCBvbkxlZnRTaWRlOiBib29sZWFuID0gdGhpcy5jaGVja0xlZnRTaWRlKGl0ZW0ueERpYWdDb29yZCk7XG4gICAgICAgIGlmIChlbnRyeS5mb2N1c0xhYmVsKSB7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsLnRleHQoaXRlbVtpZF0gKyAoZW50cnkuYXhpc09wdGlvbnMudW9tID8gZW50cnkuYXhpc09wdGlvbnMudW9tIDogJycpKTtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5WDogbnVtYmVyID0gb25MZWZ0U2lkZSA/XG4gICAgICAgICAgICAgICAgaXRlbS54RGlhZ0Nvb3JkICsgNCA6IGl0ZW0ueERpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudyArIDQ7XG4gICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBlbnRyeVgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBpdGVtLnlEaWFnQ29vcmQpO1xuICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbFJlY3RcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIGl0ZW0ueURpYWdDb29yZCAtIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkuaCArIDMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS53KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmgpO1xuXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF0gPSB7XG4gICAgICAgICAgICAgICAgJ3RpbWVzdGFtcCc6IGl0ZW1bMF0sXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogaXRlbVsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhpZ2hsaWdodE91dHB1dC5pZHNbZW50cnkuaW50ZXJuYWxJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzaG93IHRoZSB0aW1lIGxhYmVsaW5nIGluc2lkZSB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGl0ZW0ge0RhdGFFbnRyeX0gT2JqZWN0IG9mIHRoZSBlbnRyeSBpbiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0gZW50cnlJZHgge051bWJlcn0gTnVtYmVyIG9mIHRoZSBpbmRleCBvZiB0aGUgZW50cnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgZW50cnlJZHg6IG51bWJlciwgbW91c2VDb29yZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHRpbWVzdGFtcCBpcyB0aGUgdGltZSB3aGVyZSB0aGUgbW91c2UtY3Vyc29yIGlzXG4gICAgICAgIHRoaXMubGFiZWxUaW1lc3RhbXBbZW50cnlJZHhdID0gaXRlbVswXTtcbiAgICAgICAgdGhpcy5sYWJlbFhDb29yZFtlbnRyeUlkeF0gPSBpdGVtLnhEaWFnQ29vcmQ7XG4gICAgICAgIHRoaXMuZGlzdExhYmVsWENvb3JkW2VudHJ5SWR4XSA9IE1hdGguYWJzKG1vdXNlQ29vcmQgLSBpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBsZXQgbWluID0gZDMubWluKHRoaXMuZGlzdExhYmVsWENvb3JkKTtcbiAgICAgICAgbGV0IGlkeE9mTWluID0gdGhpcy5kaXN0TGFiZWxYQ29vcmQuZmluZEluZGV4KChlbGVtKSA9PiBlbGVtID09PSBtaW4pO1xuICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IHRoaXMuY2hlY2tMZWZ0U2lkZShpdGVtLnhEaWFnQ29vcmQpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmxhYmVsWENvb3JkW2lkeE9mTWluXSArIDI7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0gLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsVGltZS5ub2RlKCkpLncgLSAyO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lLnRleHQobW9tZW50KHRoaXMubGFiZWxUaW1lc3RhbXBbaWR4T2ZNaW5dKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJykpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyByaWdodCA6IGxlZnQpXG4gICAgICAgICAgICAuYXR0cigneScsIDEzKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1c1xuICAgICAgICAgICAgLmF0dHIoJ3gxJywgdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0pXG4gICAgICAgICAgICAuYXR0cigneTEnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ3gyJywgdGhpcy5sYWJlbFhDb29yZFtpZHhPZk1pbl0pXG4gICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3V0cHV0LnRpbWVzdGFtcCA9IHRoaXMubGFiZWxUaW1lc3RhbXBbaWR4T2ZNaW5dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGdpdmluZyBpbmZvcm1hdGlvbiBpZiB0aGUgbW91c2UgaXMgb24gbGVmdCBzaWRlIG9mIHRoZSBkaWFncmFtLlxuICAgICAqIEBwYXJhbSBpdGVtQ29vcmQge251bWJlcn0geCBjb29yZGluYXRlIG9mIHRoZSB2YWx1ZSAoZS5nLiBtb3VzZSkgdG8gYmUgY2hlY2tlZFxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tMZWZ0U2lkZShpdGVtQ29vcmQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBpdGVtQ29vcmQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHdyYXAgdGhlIHRleHQgZm9yIHRoZSB5IGF4aXMgbGFiZWwuXG4gICAgICogQHBhcmFtIHRleHQge2FueX0geSBheGlzIGxhYmVsXG4gICAgICogQHBhcmFtIHdpZHRoIHtOdW1iZXJ9IHdpZHRoIG9mIHRoZSBheGlzIHdoaWNoIG11c3Qgbm90IGJlIGNyb3NzZWRcbiAgICAgKiBAcGFyYW0geHBvc2l0aW9uIHtOdW1iZXJ9IHBvc2l0aW9uIHRvIGNlbnRlciB0aGUgbGFiZWwgaW4gdGhlIG1pZGRsZVxuICAgICAqL1xuICAgIHByaXZhdGUgd3JhcFRleHQodGV4dE9iajogYW55LCB3aWR0aDogbnVtYmVyLCB4cG9zaXRpb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0ZXh0T2JqLmVhY2goZnVuY3Rpb24gKHU6IGFueSwgaTogbnVtYmVyLCBkOiBOb2RlTGlzdCkge1xuICAgICAgICAgICAgbGV0IHRleHQgPSBkMy5zZWxlY3QodGhpcyksXG4gICAgICAgICAgICAgICAgd29yZHMgPSB0ZXh0LnRleHQoKS5zcGxpdCgvXFxzKy8pLnJldmVyc2UoKSxcbiAgICAgICAgICAgICAgICB3b3JkLFxuICAgICAgICAgICAgICAgIGxpbmUgPSBbXSxcbiAgICAgICAgICAgICAgICAvLyBsaW5lTnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0ID0gKGkgPT09IGQubGVuZ3RoIC0gMSA/IDAuMyA6IDEuMSksIC8vIGVtc1xuICAgICAgICAgICAgICAgIHkgPSB0ZXh0LmF0dHIoJ3knKSxcbiAgICAgICAgICAgICAgICBkeSA9IHBhcnNlRmxvYXQodGV4dC5hdHRyKCdkeScpKSxcbiAgICAgICAgICAgICAgICB0c3BhbiA9IHRleHQudGV4dChudWxsKS5hcHBlbmQoJ3RzcGFuJykuYXR0cigneCcsIDAgLSB4cG9zaXRpb24pLmF0dHIoJ3knLCB5KS5hdHRyKCdkeScsIGR5ICsgJ2VtJyk7XG4gICAgICAgICAgICB3aGlsZSAod29yZCA9IHdvcmRzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgbGluZS5wdXNoKHdvcmQpO1xuICAgICAgICAgICAgICAgIHRzcGFuLnRleHQobGluZS5qb2luKCcgJykpO1xuICAgICAgICAgICAgICAgIGxldCBub2RlOiBTVkdUU3BhbkVsZW1lbnQgPSA8U1ZHVFNwYW5FbGVtZW50PnRzcGFuLm5vZGUoKTtcbiAgICAgICAgICAgICAgICBsZXQgaGFzR3JlYXRlcldpZHRoOiBib29sZWFuID0gbm9kZS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKSA+IHdpZHRoO1xuICAgICAgICAgICAgICAgIGlmIChoYXNHcmVhdGVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdHNwYW4udGV4dChsaW5lLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBbd29yZF07XG4gICAgICAgICAgICAgICAgICAgIHRzcGFuID0gdGV4dC5hcHBlbmQoJ3RzcGFuJykuYXR0cigneCcsIDAgLSB4cG9zaXRpb24pLmF0dHIoJ3knLCB5KS5hdHRyKCdkeScsIGxpbmVIZWlnaHQgKyBkeSArICdlbScpLnRleHQod29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGJvdW5kaW5ncyBvZiBhIGh0bWwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWwge09iamVjdH0gT2JqZWN0IG9mIHRoZSBodG1sIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREaW1lbnNpb25zKGVsOiBhbnkpOiB7IHc6IG51bWJlciwgaDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgdyA9IDA7XG4gICAgICAgIGxldCBoID0gMDtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZWwuZ2V0QkJveCgpO1xuICAgICAgICAgICAgdyA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICBoID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6IGdldERpbWVuc2lvbnMoKSAnICsgZWwgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdyxcbiAgICAgICAgICAgIGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBnZW5lcmF0ZSB1dWlkIGZvciBhIGRpYWdyYW1cbiAgICAgKi9cbiAgICBwcml2YXRlIHV1aWR2NCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zNCgpICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgJy0nICsgdGhpcy5zNCgpICsgdGhpcy5zNCgpICsgdGhpcy5zNCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNvbXBvbmVudHMgb2YgdGhlIHV1aWQgZm9yIGEgZGlhZ3JhbVxuICAgICAqL1xuICAgIHByaXZhdGUgczQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgbG9ncyB0aGUgZXJyb3IgaW4gdGhlIGNvbnNvbGUuXG4gICAgICogQHBhcmFtIGVycm9yIHtPYmplY3R9IE9iamVjdCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBlbnVtIEQzQXhpc1R5cGUge1xuICAgIERpc3RhbmNlLFxuICAgIFRpbWUsXG4gICAgVGlja3Ncbn1cbiIsImV4cG9ydCBjbGFzcyBEM1NlbGVjdGlvblJhbmdlIHtcbiAgICBwdWJsaWMgZnJvbTogbnVtYmVyO1xuICAgIHB1YmxpYyB0bzogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBMb2NhdGVkVGltZVZhbHVlRW50cnksXG4gICAgVGltZSxcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhcmVhLFxuICAgIGF4aXNCb3R0b20sXG4gICAgYXhpc0xlZnQsXG4gICAgYXhpc1JpZ2h0LFxuICAgIGF4aXNUb3AsXG4gICAgYmlzZWN0b3IsXG4gICAgY3VydmVMaW5lYXIsXG4gICAgZXh0ZW50LFxuICAgIGxpbmUsXG4gICAgbW91c2UsXG4gICAgU2NhbGVMaW5lYXIsXG4gICAgc2NhbGVMaW5lYXIsXG4gICAgc2VsZWN0LFxuICAgIHRpbWVGb3JtYXQsXG59IGZyb20gJ2QzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgRDNBeGlzVHlwZSB9IGZyb20gJy4uL21vZGVsL2QzLWF4aXMtdHlwZSc7XG5pbXBvcnQgeyBEM0dyYXBoT3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2QzLWdyYXBoLW9wdGlvbnMnO1xuaW1wb3J0IHsgRDNTZWxlY3Rpb25SYW5nZSB9IGZyb20gJy4uL21vZGVsL2QzLXNlbGVjdGlvbi1yYW5nZSc7XG5cbmludGVyZmFjZSBEYXRhRW50cnkgZXh0ZW5kcyBMb2NhdGVkVGltZVZhbHVlRW50cnkge1xuICAgIGRpc3Q6IG51bWJlcjtcbiAgICB0aWNrOiBudW1iZXI7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB4RGlhZ0Nvb3JkPzogbnVtYmVyO1xuICAgIFtpZDogc3RyaW5nXTogYW55O1xufVxuXG5pbnRlcmZhY2UgRGF0YXNldENvbnN0ZWxsYXRpb24ge1xuICAgIGRhdGFzZXQ/OiBJRGF0YXNldDtcbiAgICBkYXRhPzogTG9jYXRlZFRpbWVWYWx1ZUVudHJ5W107XG4gICAgeVNjYWxlPzogU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIGRyYXdPcHRpb25zPzogRHJhd09wdGlvbnM7XG4gICAgZm9jdXNMYWJlbFJlY3Q/OiBhbnk7XG4gICAgZm9jdXNMYWJlbD86IGFueTtcbn1cblxuaW50ZXJmYWNlIERyYXdPcHRpb25zIHtcbiAgICB1b206IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZmlyc3Q6IGJvb2xlYW47XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLXRyYWplY3RvcnktZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2R0aHJlZT48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCV9LmQzIC5heGlzIGxpbmUsLmQzIC5heGlzIHBhdGh7ZmlsbDpub25lO3N0cm9rZTojMDAwfS5kMyB0ZXh0e2ZvbnQtc2l6ZToxNHB4fS5kMyAuZ3JhcGhBcmVhe2ZpbGw6I2IwYzRkZTtmaWxsLW9wYWNpdHk6Ljd9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5tYXAtaGlnaGxpZ2h0LWxhYmVse2ZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6Ljd9LmQzIC5tb3VzZS1mb2N1cy1saW5le3BvaW50ZXItZXZlbnRzOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2U6IzAwMH0uZDMgLm1vdXNlLWRyYWd7ZmlsbDpyZ2JhKDAsMCwyNTUsLjQpO3BvaW50ZXItZXZlbnRzOmFsbDtjdXJzb3I6bW92ZX1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEQzVHJhamVjdG9yeUdyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBEM0dyYXBoT3B0aW9ucz5cbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3Rpb246IEQzU2VsZWN0aW9uUmFuZ2U7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQ6IEV2ZW50RW1pdHRlcjxEM1NlbGVjdGlvblJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxEM1NlbGVjdGlvblJhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkhvdmVySGlnaGxpZ2h0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2R0aHJlZScpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgZGF0YXNldE1hcDogTWFwPHN0cmluZywgRGF0YXNldENvbnN0ZWxsYXRpb24+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgcmF3U3ZnOiBhbnk7XG4gICAgcHJpdmF0ZSBncmFwaDogYW55O1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDQwXG4gICAgfTtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuICAgIHByaXZhdGUgbGluZUZ1bjogZDMuTGluZTxEYXRhRW50cnk+O1xuICAgIHByaXZhdGUgYXJlYTogZDMuQXJlYTxEYXRhRW50cnk+O1xuICAgIHByaXZhdGUgeFNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHByaXZhdGUgeVNjYWxlQmFzZTogZDMuU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNsYWJlbFRpbWU6IGFueTtcbiAgICBwcml2YXRlIGZvY3VzbGFiZWxZOiBhbnk7XG4gICAgcHJpdmF0ZSB5QXhpc0dlbjogZDMuQXhpczxudW1iZXIgfCB7IHZhbHVlT2YoKTogbnVtYmVyOyB9PjtcbiAgICBwcml2YXRlIGJhc2VWYWx1ZXM6IERhdGFFbnRyeVtdID0gW107XG4gICAgcHJpdmF0ZSBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRyYWdTdGFydDogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIGRyYWdDdXJyZW50OiBbbnVtYmVyLCBudW1iZXJdO1xuICAgIHByaXZhdGUgZHJhZ1JlY3Q6IGFueTtcbiAgICBwcml2YXRlIGRyYWdSZWN0RzogYW55O1xuICAgIHByaXZhdGUgYnVmZmVyU3VtOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkYXRhTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRHcmFwaE9wdGlvbnM6IEQzR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBheGlzVHlwZTogRDNBeGlzVHlwZS5EaXN0YW5jZSxcbiAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNlcnZpY2UpO1xuICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnMgPSB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgIGlmIChjaGFuZ2VzLnNlbGVjdGlvbiAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWxsRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IHNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1heExhYmVsd2lkdGgpICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLmxpbmVGdW4gPSBsaW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLnkodGhpcy5jYWxjWVZhbHVlKVxuICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmFyZWEgPSBhcmVhPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgLngodGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLnkwKHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLnkxKHRoaXMuY2FsY1lWYWx1ZSlcbiAgICAgICAgICAgIC5jdXJ2ZShjdXJ2ZUxpbmVhcik7XG5cbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgdGltZUludGVydmFsQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZW50cnkuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoZW50cnkuZGF0YXNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRNYXAuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgeyBkYXRhc2V0IH0pO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShkYXRhc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0FsbERhdGEoKTtcbiAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBEM0dyYXBoT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgdGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGludGVybmFsSWQpLmRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVzcGFuICYmXG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhkYXRhc2V0LmludGVybmFsSWQpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aGlzLnRpbWVzcGFuLCAwLjIpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFRpbWVWYWx1ZUVudHJ5PihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbGl6ZTogb3B0aW9uLmdlbmVyYWxpemVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFMZW5ndGggPSByZXN1bHQudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmdldChkYXRhc2V0LmludGVybmFsSWQpLmRhdGEgPSByZXN1bHQudmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEYXRhRm9ySWQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3TGluZUdyYXBoKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdMaW5lR3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0FsbERhdGEoKSB7XG4gICAgICAgIHRoaXMuYmFzZVZhbHVlcyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMuZm9yRWFjaCgoaWQpID0+IHRoaXMucHJvY2Vzc0RhdGFGb3JJZChpZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0RhdGFGb3JJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGludGVybmFsSWQpLnZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXRFbnRyeSA9IHRoaXMuZGF0YXNldE1hcC5nZXQoaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEVudHJ5ID0gdGhpcy5iYXNlVmFsdWVzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGxldCBwcmV2aW91czogRGF0YUVudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIGRhdGFzZXRFbnRyeS5kYXRhLmZvckVhY2goKGVsZW0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jcmVhdGVEYXRhRW50cnkoaW50ZXJuYWxJZCwgZWxlbSwgcHJldmlvdXMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSB0aGlzLnNlbGVjdGlvbi5mcm9tICYmIGlkeCA8PSB0aGlzLnNlbGVjdGlvbi50bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVZhbHVlcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGVudHJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA+PSB0aGlzLnNlbGVjdGlvbi5mcm9tICYmIGlkeCA8PSB0aGlzLnNlbGVjdGlvbi50bykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhc2VWYWx1ZXNbaWR4IC0gdGhpcy5zZWxlY3Rpb24uZnJvbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVmFsdWVzW2lkeCAtIHRoaXMuc2VsZWN0aW9uLmZyb21dW2ludGVybmFsSWRdID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iYXNlVmFsdWVzW2lkeF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VWYWx1ZXNbaWR4XVtpbnRlcm5hbElkXSA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRGF0YUVudHJ5KFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGVudHJ5OiBMb2NhdGVkVGltZVZhbHVlRW50cnksXG4gICAgICAgIHByZXZpb3VzOiBEYXRhRW50cnksXG4gICAgICAgIGluZGV4OiBudW1iZXJcbiAgICApOiBEYXRhRW50cnkge1xuICAgICAgICBsZXQgZGlzdDogbnVtYmVyO1xuICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld2Rpc3QgPSB0aGlzLmRpc3RhbmNlQmV0d2VlbihcbiAgICAgICAgICAgICAgICBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBlbnRyeS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5nZW9tZXRyeS5jb29yZGluYXRlc1swXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRpc3QgPSBwcmV2aW91cy5kaXN0ICsgTWF0aC5yb3VuZChuZXdkaXN0IC8gMTAwMCAqIDEwMDAwMCkgLyAxMDAwMDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXN0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGljazogaW5kZXgsXG4gICAgICAgICAgICBkaXN0OiBNYXRoLnJvdW5kKGRpc3QgKiAxMCkgLyAxMCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogZW50cnkudGltZXN0YW1wLFxuICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLFxuICAgICAgICAgICAgW2ludGVybmFsSWRdOiBlbnRyeS52YWx1ZSxcbiAgICAgICAgICAgIHg6IGVudHJ5Lmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgeTogZW50cnkuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sXG4gICAgICAgICAgICBnZW9tZXRyeTogZW50cnkuZ2VvbWV0cnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc3RhbmNlQmV0d2VlbihsYXRpdHVkZTEsIGxvbmdpdHVkZTEsIGxhdGl0dWRlMiwgbG9uZ2l0dWRlMik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IFIgPSA2MzcxMDAwO1xuICAgICAgICBjb25zdCByYWQgPSBNYXRoLlBJIC8gMTgwO1xuICAgICAgICBjb25zdCBsYXQxID0gbGF0aXR1ZGUxICogcmFkO1xuICAgICAgICBjb25zdCBsYXQyID0gbGF0aXR1ZGUyICogcmFkO1xuICAgICAgICBjb25zdCBzaW5ETGF0ID0gTWF0aC5zaW4oKGxhdGl0dWRlMiAtIGxhdGl0dWRlMSkgKiByYWQgLyAyKTtcbiAgICAgICAgY29uc3Qgc2luRExvbiA9IE1hdGguc2luKChsb25naXR1ZGUyIC0gbG9uZ2l0dWRlMSkgKiByYWQgLyAyKTtcbiAgICAgICAgY29uc3QgYSA9IHNpbkRMYXQgKiBzaW5ETGF0ICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIHNpbkRMb24gKiBzaW5ETG9uO1xuICAgICAgICBjb25zdCBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgICAgICAgcmV0dXJuIFIgKiBjO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1lWYWx1ZSA9IChkOiBEYXRhRW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMueVNjYWxlQmFzZShkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNYVmFsdWUgPSAoZDogRGF0YUVudHJ5LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgeERpYWdDb29yZCA9IHRoaXMueFNjYWxlQmFzZSh0aGlzLmdldFhWYWx1ZShkKSk7XG4gICAgICAgIGQueERpYWdDb29yZCA9IHhEaWFnQ29vcmQ7XG4gICAgICAgIHJldHVybiB4RGlhZ0Nvb3JkO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkuaGVpZ2h0LmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQgLSB0aGlzLm1heExhYmVsd2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYVmFsdWUoZGF0YTogRGF0YUVudHJ5KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGlzdDtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaW1lOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRpbWVzdGFtcDtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaWNrczpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aWNrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50aWNrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3RG90cyh2YWx1ZXM6IERhdGFFbnRyeVtdLCB5U2NhbGU6IGQzLlNjYWxlTGluZWFyPG51bWJlciwgbnVtYmVyPiwgb3B0aW9uczogRHJhd09wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ncmFwaC5zZWxlY3RBbGwoJ2RvdCcpXG4gICAgICAgICAgICAuZGF0YSh2YWx1ZXMpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdyJywgMS41KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgdGhpcy5jYWxjWFZhbHVlKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQ6IERhdGFFbnRyeSkgPT4geVNjYWxlKGRbb3B0aW9ucy5pZF0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdWYWx1ZUxpbmUodmFsdWVzOiBEYXRhRW50cnlbXSwgeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAuZGF0dW0odmFsdWVzKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAxKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lPERhdGFFbnRyeT4oKVxuICAgICAgICAgICAgICAgIC54KHRoaXMuY2FsY1hWYWx1ZSlcbiAgICAgICAgICAgICAgICAueSgoZDogRGF0YUVudHJ5KSA9PiB5U2NhbGUoZFtvcHRpb25zLmlkXSkpXG4gICAgICAgICAgICAgICAgLmN1cnZlKGN1cnZlTGluZWFyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGgoeVNjYWxlOiBkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4sIG9wdGlvbnM6IERyYXdPcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuZG90dGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdEb3RzKHRoaXMuYmFzZVZhbHVlcywgeVNjYWxlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1ZhbHVlTGluZSh0aGlzLmJhc2VWYWx1ZXMsIHlTY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdMaW5lR3JhcGgoKSB7XG4gICAgICAgIGlmICghdGhpcy5iYXNlVmFsdWVzIHx8IHRoaXMuYmFzZVZhbHVlcy5sZW5ndGggPT09IDAgfHwgIXRoaXMuZ3JhcGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlV2lkdGgoKTtcblxuICAgICAgICB0aGlzLmdyYXBoLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyU3VtID0gMDtcblxuICAgICAgICB0aGlzLnlTY2FsZUJhc2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChkYXRhc2V0RW50cnksIGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucy5oYXMoaWQpICYmIGRhdGFzZXRFbnRyeS5kYXRhICYmIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgZGF0YXNldEVudHJ5LmRyYXdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFzZXRFbnRyeS5kYXRhc2V0LnVvbSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGFzZXRFbnRyeS5kYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5idWZmZXJTdW1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4aXNSZXN1bHQgPSB0aGlzLmRyYXdZQXhpcyhkYXRhc2V0RW50cnkuZHJhd09wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlTY2FsZUJhc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55U2NhbGVCYXNlID0gYXhpc1Jlc3VsdC55U2NhbGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTdW0gPSBheGlzUmVzdWx0LmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YXNldEVudHJ5LnlTY2FsZSA9IGF4aXNSZXN1bHQueVNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMueVNjYWxlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyByaWdodCBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy53aWR0aCArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGF4aXNSaWdodCh0aGlzLnlTY2FsZUJhc2UpLnRpY2tTaXplKDApLnRpY2tzKDApKTtcblxuICAgICAgICB0aGlzLmRyYXdYQXhpcyh0aGlzLmJ1ZmZlclN1bSk7XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuaGFzKGlkKSAmJiB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkudmlzaWJsZSAmJiBlbnRyeS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGgoZW50cnkueVNjYWxlLCBlbnRyeS5kcmF3T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoIC0gdGhpcy5idWZmZXJTdW0pXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlclN1bSArICcsIDApJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmZvY3VzJywgdGhpcy5tb3VzZW1vdmVIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dC5mb2N1cycsIHRoaXMubW91c2VvdXRIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24uZHJhZycsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlLmRyYWcnLCB0aGlzLmRyYWdIYW5kbGVyKVxuICAgICAgICAgICAgLm9uKCdtb3VzZXVwLmRyYWcnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdnJyk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Rm9jdXMgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1saW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MicsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgICAgIC5hdHRyKCd5MScsICcwJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuXG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChlbnRyeSwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zLmhhcyhpZCkgJiYgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaWQpLnZpc2libGUgJiYgZW50cnkuZGF0YSkge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5mb2N1c0xhYmVsID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpZCkuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC13ZWlnaHQnLCAnbGlnaHRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6dGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlLWZvY3VzLWxhYmVsLXgnKTtcbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsWSA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1mb2N1cy1sYWJlbC15Jyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYmFzZVZhbHVlcyB8fCB0aGlzLmJhc2VWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29vcmRzID0gbW91c2UodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKSk7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0SXRlbUZvclgoY29vcmRzWzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIHRoaXMuc2hvd0RpYWdyYW1JbmRpY2F0b3IoaWR4KTtcbiAgICAgICAgdGhpcy5vbkhvdmVySGlnaGxpZ2h0LmVtaXQodGhpcy5iYXNlVmFsdWVzW2lkeF0udGljayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3VzZW91dEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZURpYWdyYW1JbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdTdGFydEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBtb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmF3RHJhZ1JlY3RhbmdsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ0VuZEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQgfHwgIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQuZW1pdCh7IGZyb206IDAsIHRvOiB0aGlzLmRhdGFMZW5ndGggfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdTdGFydFswXSArIHRoaXMuYnVmZmVyU3VtLCB0aGlzLmJhc2VWYWx1ZXMpO1xuICAgICAgICAgICAgY29uc3QgdG8gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ0N1cnJlbnRbMF0gKyB0aGlzLmJ1ZmZlclN1bSwgdGhpcy5iYXNlVmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkRmluaXNoZWQuZW1pdCh0aGlzLnByZXBhcmVSYW5nZSh0aGlzLmJhc2VWYWx1ZXNbZnJvbV0udGljaywgdGhpcy5iYXNlVmFsdWVzW3RvXS50aWNrKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzZXREcmFnKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlUmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogRDNTZWxlY3Rpb25SYW5nZSB7XG4gICAgICAgIGlmIChmcm9tIDw9IHRvKSB7XG4gICAgICAgICAgICByZXR1cm4geyBmcm9tLCB0byB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGZyb206IHRvLCB0bzogZnJvbSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0RyYWdSZWN0YW5nbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnU3RhcnQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5kcmFnQ3VycmVudCA9IG1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuXG4gICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLmdldEl0ZW1Gb3JYKHRoaXMuZHJhZ1N0YXJ0WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIGNvbnN0IHRvID0gdGhpcy5nZXRJdGVtRm9yWCh0aGlzLmRyYWdDdXJyZW50WzBdICsgdGhpcy5idWZmZXJTdW0sIHRoaXMuYmFzZVZhbHVlcyk7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQodGhpcy5wcmVwYXJlUmFuZ2UodGhpcy5iYXNlVmFsdWVzW2Zyb21dLnRpY2ssIHRoaXMuYmFzZVZhbHVlc1t0b10udGljaykpO1xuXG4gICAgICAgIGNvbnN0IHgxID0gTWF0aC5taW4odGhpcy5kcmFnU3RhcnRbMF0sIHRoaXMuZHJhZ0N1cnJlbnRbMF0pO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMuZHJhZ1N0YXJ0WzBdLCB0aGlzLmRyYWdDdXJyZW50WzBdKTtcblxuICAgICAgICBpZiAoIXRoaXMuZHJhZ1JlY3QgJiYgIXRoaXMuZHJhZ1JlY3RHKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnUmVjdCA9IHRoaXMuZHJhZ1JlY3RHLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeDIgLSB4MSlcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCB4MSArIHRoaXMuYnVmZmVyU3VtKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZS1kcmFnJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QuYXR0cignd2lkdGgnLCB4MiAtIHgxKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgeDEgKyB0aGlzLmJ1ZmZlclN1bSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0RHJhZygpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1JlY3RHKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdSZWN0Ry5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3RHID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1JlY3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlRGlhZ3JhbUluZGljYXRvcigpIHtcbiAgICAgICAgdGhpcy5mb2N1c0cuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RGlhZ3JhbUluZGljYXRvciA9IChpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5iYXNlVmFsdWVzW2lkeF07XG4gICAgICAgIHRoaXMuZm9jdXNHLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRGb2N1cy5hdHRyKCd4MScsIGl0ZW0ueERpYWdDb29yZClcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIDApXG4gICAgICAgICAgICAuYXR0cigneDInLCBpdGVtLnhEaWFnQ29vcmQpXG4gICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5jbGFzc2VkKCdoaWRkZW4nLCBmYWxzZSk7XG5cbiAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCh0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS53aWR0aCArIHRoaXMuYnVmZmVyU3VtKSAvIDIgPiBpdGVtLnhEaWFnQ29vcmQpIHsgb25MZWZ0U2lkZSA9IHRydWU7IH1cblxuICAgICAgICB0aGlzLnNob3dMYWJlbFZhbHVlcyhpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICAgICAgdGhpcy5zaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW0sIG9uTGVmdFNpZGUpO1xuICAgICAgICB0aGlzLnNob3dCb3R0b21JbmRpY2F0b3JMYWJlbChpdGVtLCBvbkxlZnRTaWRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dMYWJlbFZhbHVlcyhpdGVtOiBEYXRhRW50cnksIG9uTGVmdFNpZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmZvckVhY2goKGVudHJ5LCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGlkKS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmZvY3VzTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZm9jdXNMYWJlbC50ZXh0KGl0ZW1baWRdICsgKGVudHJ5LmRhdGFzZXQudW9tID8gZW50cnkuZGF0YXNldC51b20gOiAnJykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeVggPSBvbkxlZnRTaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLnc7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZW50cnlYKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBlbnRyeS55U2NhbGUoaXRlbVtpZF0pICsgdGhpcy5nZXREaW1lbnNpb25zKGVudHJ5LmZvY3VzTGFiZWwubm9kZSgpKS5oIC0gMyk7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvY3VzTGFiZWxSZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVudHJ5WClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgZW50cnkueVNjYWxlKGl0ZW1baWRdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuZ2V0RGltZW5zaW9ucyhlbnRyeS5mb2N1c0xhYmVsLm5vZGUoKSkudylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmdldERpbWVuc2lvbnMoZW50cnkuZm9jdXNMYWJlbC5ub2RlKCkpLmgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VGltZUluZGljYXRvckxhYmVsKGl0ZW06IERhdGFFbnRyeSwgb25MZWZ0U2lkZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lLnRleHQobW9tZW50KGl0ZW0udGltZXN0YW1wKS5mb3JtYXQoJ0RELk1NLllZIEhIOm1tJykpO1xuICAgICAgICB0aGlzLmZvY3VzbGFiZWxUaW1lXG4gICAgICAgICAgICAuYXR0cigneCcsIG9uTGVmdFNpZGUgPyBpdGVtLnhEaWFnQ29vcmQgKyAyIDogaXRlbS54RGlhZ0Nvb3JkIC0gdGhpcy5nZXREaW1lbnNpb25zKHRoaXMuZm9jdXNsYWJlbFRpbWUubm9kZSgpKS53KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAxMyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Qm90dG9tSW5kaWNhdG9yTGFiZWwoaXRlbTogRGF0YUVudHJ5LCBvbkxlZnRTaWRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNsYWJlbFkudGV4dChpdGVtLmRpc3QgKyAnIGttJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSA9PT0gRDNBeGlzVHlwZS5UaWNrcykge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2xhYmVsWS50ZXh0KCdNZWFzdXJlbWVudDogJyArIGl0ZW0udGljayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c2xhYmVsWVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmNhbGN1bGF0ZUhlaWdodCgpIC0gNSlcbiAgICAgICAgICAgIC5hdHRyKCd4Jywgb25MZWZ0U2lkZSA/IGl0ZW0ueERpYWdDb29yZCArIDIgOiBpdGVtLnhEaWFnQ29vcmQgLSB0aGlzLmdldERpbWVuc2lvbnModGhpcy5mb2N1c2xhYmVsWS5ub2RlKCkpLncpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KSB7XG4gICAgICAgIGxldCB3ID0gMDtcbiAgICAgICAgbGV0IGggPSAwO1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBlbC5nZXRCQm94KCk7XG4gICAgICAgICAgICB3ID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgIGggPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjogZ2V0RGltZW5zaW9ucygpICcgKyBlbCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3LFxuICAgICAgICAgICAgaFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbUZvclgoeDogbnVtYmVyLCBkYXRhOiBEYXRhRW50cnlbXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMueFNjYWxlQmFzZS5pbnZlcnQoeCk7XG4gICAgICAgIGNvbnN0IGJpc2VjdERhdGUgPSBiaXNlY3RvcigoZDogRGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHJlc2VudGVyT3B0aW9ucy5heGlzVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGlzdDtcbiAgICAgICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5UaWNrczpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC50aWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5sZWZ0O1xuICAgICAgICByZXR1cm4gYmlzZWN0RGF0ZSh0aGlzLmJhc2VWYWx1ZXMsIGluZGV4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdZQXhpcyhvcHRpb25zOiBEcmF3T3B0aW9ucyk6IGFueSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZXh0ZW50PERhdGFFbnRyeSwgbnVtYmVyPih0aGlzLmJhc2VWYWx1ZXMsIChkYXR1bSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGF0dW1bb3B0aW9ucy5pZF07IC8vIGhlcmUgd2l0aCBJRFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmFuZ2VPZmZzZXQgPSAocmFuZ2VbMV0gLSByYW5nZVswXSkgKiAwLjEwO1xuICAgICAgICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFtyYW5nZVswXSAtIHJhbmdlT2Zmc2V0LCByYW5nZVsxXSArIHJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgICAgICB0aGlzLnlBeGlzR2VuID0gYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCBheGlzID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwodGhpcy55QXhpc0dlbik7XG5cbiAgICAgICAgLy8gZHJhdyB5IGF4aXMgbGFiZWxcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAncm90YXRlKC05MCknKVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJzFlbScpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBvcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy51b20pO1xuXG4gICAgICAgIGNvbnN0IGF4aXNXaWR0aCA9IGF4aXMubm9kZSgpLmdldEJCb3goKS53aWR0aCArIDUgKyB0aGlzLmdldERpbWVuc2lvbnModGV4dC5ub2RlKCkpLmg7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IG9wdGlvbnMub2Zmc2V0ICsgKGF4aXNXaWR0aCA8IDMwID8gMzAgOiBheGlzV2lkdGgpO1xuICAgICAgICBpZiAoIW9wdGlvbnMuZmlyc3QpIHtcbiAgICAgICAgICAgIGF4aXMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgYnVmZmVyICsgJywgMCknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHRPZmZzZXQgPSAhb3B0aW9ucy5maXJzdCA/IGJ1ZmZlciA6IG9wdGlvbnMub2Zmc2V0O1xuICAgICAgICB0ZXh0LmF0dHIoJ3knLCAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWF4TGFiZWx3aWR0aCArIHRleHRPZmZzZXQpXG4gICAgICAgICAgICAuYXR0cigneCcsIDAgLSAodGhpcy5oZWlnaHQgLyAyKSk7XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgeSBncmlkIGxpbmVzIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgZGF0YXNldFxuICAgICAgICBpZiAodGhpcy5kYXRhc2V0SWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoYXhpc0xlZnQoeVNjYWxlKVxuICAgICAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICAgIHlTY2FsZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1hBeGlzKGJ1ZmZlcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueFNjYWxlQmFzZSA9IHNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4odGhpcy5nZXRYRG9tYWluKHRoaXMuYmFzZVZhbHVlcykpXG4gICAgICAgICAgICAucmFuZ2UoW2J1ZmZlciwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGNvbnN0IHhBeGlzR2VuID0gYXhpc0JvdHRvbSh0aGlzLnhTY2FsZUJhc2UpLnRpY2tzKDUpO1xuXG4gICAgICAgIGlmICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUgPT09IEQzQXhpc1R5cGUuVGltZSkge1xuICAgICAgICAgICAgeEF4aXNHZW4udGlja0Zvcm1hdCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lRm9ybWF0KCclZC4lbS4lWSAlSDolTTolUycpKG5ldyBEYXRlKGQudmFsdWVPZigpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgeCBheGlzXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneCBheGlzJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIHRoaXMuaGVpZ2h0ICsgJyknKVxuICAgICAgICAgICAgLmNhbGwoeEF4aXNHZW4pO1xuXG4gICAgICAgIC8vIGRyYXcgdGhlIHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbChheGlzQm90dG9tKHRoaXMueFNjYWxlQmFzZSlcbiAgICAgICAgICAgICAgICAudGlja3MoMTApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gZHJhdyB1cHBlciBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuY2FsbChheGlzVG9wKHRoaXMueFNjYWxlQmFzZSkudGlja3MoMCkudGlja1NpemUoMCkpO1xuXG4gICAgICAgIC8vIHRleHQgbGFiZWwgZm9yIHRoZSB4IGF4aXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAodGhpcy53aWR0aCArIGJ1ZmZlcikgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAudGV4dCh0aGlzLmdldFhBeGlzTGFiZWwoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRYRG9tYWluKHZhbHVlczogRGF0YUVudHJ5W10pIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByZXNlbnRlck9wdGlvbnMuYXhpc1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRDNBeGlzVHlwZS5EaXN0YW5jZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3ZhbHVlc1swXS5kaXN0LCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLmRpc3RdO1xuICAgICAgICAgICAgY2FzZSBEM0F4aXNUeXBlLlRpbWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt2YWx1ZXNbMF0udGltZXN0YW1wLCB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLnRpbWVzdGFtcF07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbdmFsdWVzWzBdLnRpY2ssIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV0udGlja107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFhBeGlzTGFiZWwoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVzZW50ZXJPcHRpb25zLmF4aXNUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuRGlzdGFuY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdEaXN0YW5jZSc7XG4gICAgICAgICAgICBjYXNlIEQzQXhpc1R5cGUuVGltZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RpbWUnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RpY2tzJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSwgRGF0YXNldEFwaUludGVyZmFjZSwgRGF0YXNldE9wdGlvbnMsIEludGVybmFsSWRIYW5kbGVyLCBNaW5NYXhSYW5nZSwgVGltZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBleHRlbnQgfSBmcm9tICdkMyc7XG5cbmltcG9ydCB7XG4gIEQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICBEYXRhRW50cnksXG4gIEludGVybmFsRGF0YUVudHJ5LFxufSBmcm9tICcuLi9kMy10aW1lc2VyaWVzLWdyYXBoL2QzLXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXIvZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEFkZGl0aW9uYWwgRGF0YSB3aGljaCBjYW4gYmUgYWRkIHRvIHRoZSBjb21wb25lbnQge0BsaW5rIEV4dGVuZGVkRGF0YUQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50fSBhcyBJbnB1dC5cbiAqIE9uZSBvZiB0aGUgb3B0aW9uYWwgcHJvcGVydGllcyAnbGlua2VkRGF0YXNldElkJyBhbmQgJ3lheGlzTGFiZWwnIGlzIG1hbmRhdG9yeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZGRpdGlvbmFsRGF0YSB7XG4gIC8qKlxuICAgKiBMaW5rZWQgdG8gYW4gZXhpc3RpbmcgZGF0YXNldCBpbiB0aGUgZ3JhcGggY29tcG9uZW50IGFuZCB1c2VzIGl0IGRhdGFzZXQgb3B0aW9ucyBpZiBubyBvdGhlciBkYXRhc2V0b3B0aW9ucyBhcmUgcHJlc2VudGVkLlxuICAgKi9cbiAgbGlua2VkRGF0YXNldElkPzogc3RyaW5nO1xuICAvKipcbiAgICogWS1BeGlzIGxhYmVsIGlmIG5vIGxpbmsgdG8gYW4gZXhpc3RpbmcgZGF0YXNldCBpcyBnaXZlbi5cbiAgICovXG4gIHlheGlzTGFiZWw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZGF0YXNldCBvcHRpb25zLCB3aGljaCBkZXNjcmliZXMgdGhlIHN0eWxpbmcgb2YgdGhlIGFkZGl0aW9uYWwgZGF0YS5cbiAgICovXG4gIGRhdGFzZXRPcHRpb25zPzogRGF0YXNldE9wdGlvbnM7XG4gIC8qKlxuICAgKiBUaGUgYWRkaXRpb25hbCBkYXRhIGFycmV5IHdpdGggdHVwZWxzIG9mIHRpbWVzdGFtcCBhbmQgdmFsdWUuXG4gICAqL1xuICBkYXRhOiBBZGRpdGlvbmFsRGF0YUVudHJ5W107XG59XG5cbi8qKlxuICogQWRkaXRpb25hbCBkYXRhIGVudHJ5IHR1cGxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRkaXRpb25hbERhdGFFbnRyeSB7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIEV4dGVuZHMgdGhlIGNvbW1vbiBkMyBjb21wb25lbnQsIHdpdGggdGhlIGFiaWxpdHkgdG8gYWRkIGFkZGl0aW9uYWwgZGF0YSB0byB0aGUgZ3JhcGguIFRvIHNldCBvciBjaGFuZ2UgIGFkZGl0aW9uYWwgZGF0YSwgYWxsd2F5cyBzZXRzIHRoZSBjb21wbGV0ZSBhcnJheSBvZiBkYXRhIG5ldy4gVGhlIGNvbXBvbmV0IGp1c3QgcmVkcmF3cyBpZlxuICogdGhlIGFycmF5IGlzIHJlc2V0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduNTItZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZDNcIiAjZDN0aW1lc2VyaWVzPjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLmdyYXBoRG90c3tzdHJva2Utd2lkdGg6MDtzdHJva2Utb3BhY2l0eToxfS5kMyAuZ3JhcGhEb3RzIC5ob3ZlcntzdHJva2Utd2lkdGg6MjBweDtzdHJva2Utb3BhY2l0eTouNX0uZDMgLmZvcm1lckJ1dHRvbiwuZDMgLmxhdGVyQnV0dG9ue2ZpbGw6Z3JleTtvcGFjaXR5Oi4zfS5kMyAuZm9ybWVyQnV0dG9uOmhvdmVyLC5kMyAubGF0ZXJCdXR0b246aG92ZXJ7b3BhY2l0eTouNn0uZDMgLmFycm93e3N0cm9rZTpncmV5O3N0cm9rZS13aWR0aDozcHh9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgZXh0ZW5kcyBEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGFkZGl0aW9uYWxEYXRhOiBBZGRpdGlvbmFsRGF0YVtdID0gW107XG5cbiAgcHJpdmF0ZSBhZGRpdGlvbmFsUHJlcGFyZWREYXRhOiBJbnRlcm5hbERhdGFFbnRyeVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgcHJvdGVjdGVkIHRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlOiBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0aW1lRm9ybWF0TG9jYWxlU2VydmljZSwgY29sb3JTZXJ2aWNlLCB0cmFuc2xhdGVTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgaWYgKGNoYW5nZXMuYWRkaXRpb25hbERhdGEgJiYgdGhpcy5hZGRpdGlvbmFsRGF0YSAmJiB0aGlzLmdyYXBoKSB7XG4gICAgICB0aGlzLmNsZWFyQWRkaXRpb25hbERhdGEoKTtcbiAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBsb3RHcmFwaCgpIHtcbiAgICB0aGlzLnByZXBhcmVBZGRpdGlvbmFsRGF0YSgpO1xuICAgIHN1cGVyLnBsb3RHcmFwaCgpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBpZiAodGhpcy5hZGRpdGlvbmFsRGF0YSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsb3RHcmFwaCgpLCAwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyQWRkaXRpb25hbERhdGEoKSB7XG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGUuaWRzLmluZGV4T2YoZGF0YS5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7IGUuaWRzLnNwbGljZShpZHgsIDEpOyB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tKSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy55UmFuZ2VzRWFjaFVvbVtpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQuaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb20uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhID0gW107XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVBZGRpdGlvbmFsRGF0YSgpIHtcbiAgICBpZiAodGhpcy5hZGRpdGlvbmFsRGF0YSkge1xuICAgICAgdGhpcy5hZGRpdGlvbmFsRGF0YS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgaWYgKChlbnRyeS5saW5rZWREYXRhc2V0SWQgfHwgZW50cnkueWF4aXNMYWJlbCkgJiYgZW50cnkuZGF0YSkge1xuXG4gICAgICAgICAgaWYgKGVudHJ5LmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBlbnRyeS5kYXRhc2V0T3B0aW9ucyB8fCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChlbnRyeS5saW5rZWREYXRhc2V0SWQpO1xuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSB0aGlzLmRhdGFzZXRNYXAuZ2V0KGVudHJ5LmxpbmtlZERhdGFzZXRJZCk7XG4gICAgICAgICAgICBjb25zdCBwcmVwRGF0YUlkeCA9IHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5maW5kSW5kZXgoZSA9PiBlLmludGVybmFsSWQuc3RhcnRzV2l0aChlbnRyeS5saW5rZWREYXRhc2V0SWQpIHx8IGUuaW50ZXJuYWxJZCA9PT0gZW50cnkueWF4aXNMYWJlbCk7XG4gICAgICAgICAgICBsZXQgZGF0YUVudHJ5OiBJbnRlcm5hbERhdGFFbnRyeTtcbiAgICAgICAgICAgIGlmIChwcmVwRGF0YUlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IGVudHJ5LmxpbmtlZERhdGFzZXRJZCA/IGVudHJ5LmxpbmtlZERhdGFzZXRJZCArICdhZGQnIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICBpZDogLTEsXG4gICAgICAgICAgICAgICAgY29sb3I6IG9wdGlvbnMuY29sb3IsXG4gICAgICAgICAgICAgICAgZGF0YTogb3B0aW9ucy52aXNpYmxlID8gZW50cnkuZGF0YS5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGUudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSA6IFtdLFxuICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBvcHRpb25zLmNvbG9yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiBvcHRpb25zLmxpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiBvcHRpb25zLnBvaW50UmFkaXVzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IG9wdGlvbnMubGluZVdpZHRoXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBheGlzT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgdW9tOiBkYXRhc2V0ID8gZGF0YXNldC51b20gOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFzZXQgPyBkYXRhc2V0LmxhYmVsIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogb3B0aW9ucy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICAgIHlBeGlzUmFuZ2U6IG9wdGlvbnMueUF4aXNSYW5nZSxcbiAgICAgICAgICAgICAgICAgIGF1dG9SYW5nZVNlbGVjdGlvbjogb3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICBzZXBhcmF0ZVlBeGlzOiBvcHRpb25zLnNlcGFyYXRlWUF4aXNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpc2libGU6IG9wdGlvbnMudmlzaWJsZVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5heGlzT3B0aW9ucy5wYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgZmVhdHVyZTogZGF0YXNldC5wYXJhbWV0ZXJzLmZlYXR1cmUsXG4gICAgICAgICAgICAgICAgICBwaGVub21lbm9uOiBkYXRhc2V0LnBhcmFtZXRlcnMucGhlbm9tZW5vbixcbiAgICAgICAgICAgICAgICAgIG9mZmVyaW5nOiBkYXRhc2V0LnBhcmFtZXRlcnMub2ZmZXJpbmdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5wdXNoKGRhdGFFbnRyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhRW50cnkgPSB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGFbcHJlcERhdGFJZHhdO1xuICAgICAgICAgICAgICBkYXRhRW50cnkuYXhpc09wdGlvbnMudW9tID0gZGF0YXNldCA/IGRhdGFzZXQudW9tIDogZW50cnkueWF4aXNMYWJlbDtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5LmF4aXNPcHRpb25zLmxhYmVsID0gZGF0YXNldCA/IGRhdGFzZXQubGFiZWwgOiBlbnRyeS55YXhpc0xhYmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXdEYXRhc2V0SWR4ID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoKGUpID0+IGUuaWRzLmluZGV4T2YoZW50cnkubGlua2VkRGF0YXNldElkKSA+IC0xKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFFeHRlbnQgPSBleHRlbnQ8RGF0YUVudHJ5LCBudW1iZXI+KGRhdGFFbnRyeS5kYXRhLCAoZCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy50aW1lc3Bhbi5mcm9tIDw9IGQudGltZXN0YW1wICYmIHRoaXMudGltZXNwYW4udG8gPj0gZC50aW1lc3RhbXApIHsgcmV0dXJuIGQudmFsdWU7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGRhdGFFeHRlbnRbMF0pICYmIGlzRmluaXRlKGRhdGFFeHRlbnRbMV0pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJhbmdlOiBNaW5NYXhSYW5nZSA9IHsgbWluOiBkYXRhRXh0ZW50WzBdLCBtYXg6IGRhdGFFeHRlbnRbMV0gfTtcbiAgICAgICAgICAgICAgdGhpcy5leHRlbmRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgIGlmIChuZXdEYXRhc2V0SWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQXhpc0luZGV4ID0gdGhpcy55UmFuZ2VzRWFjaFVvbS5maW5kSW5kZXgoZSA9PiBlLmlkcy5pbmRleE9mKGVudHJ5LnlheGlzTGFiZWwpICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXhpc1JhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgdW9tOiBlbnRyeS55YXhpc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgICAgYXV0b1JhbmdlOiBvcHRpb25zLmF1dG9SYW5nZVNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgIHByZVJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIG9yaWdpblJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIHplcm9CYXNlZDogb3B0aW9ucy56ZXJvQmFzZWRZQXhpcyxcbiAgICAgICAgICAgICAgICAgIG91dE9mcmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaWRzOiBbZW50cnkueWF4aXNMYWJlbF0sXG4gICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBkYXRhRW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nQXhpc0luZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bZXhpc3RpbmdBeGlzSW5kZXhdID0gYXhpc1JhbmdlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLnB1c2goYXhpc1JhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UubWluID0gTWF0aC5taW4ocmFuZ2UubWluLCB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1pbik7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1heCA9IE1hdGgubWF4KHJhbmdlLm1heCwgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZS5tYXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0uaWRzLnB1c2goZW50cnkubGlua2VkRGF0YXNldElkID8gZW50cnkubGlua2VkRGF0YXNldElkICsgJ2FkZCcgOiBlbnRyeS55YXhpc0xhYmVsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZW50cnkueWF4aXNMYWJlbCAmJiAhZW50cnkubGlua2VkRGF0YXNldElkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMubGlzdE9mVW9tcy5pbmRleE9mKGVudHJ5LnlheGlzTGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPCAwKSB7IHRoaXMubGlzdE9mVW9tcy5wdXNoKGVudHJ5LnlheGlzTGFiZWwpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgY2hlY2sgdGhlIGFkZGl0aW9uYWwgZW50cnksIGl0IG5lZWRzIGF0IGxlYXN0IGEgXFwnbGlua2VkRGF0YXNldElkXFwnIG9yIGEgXFwneWF4aXNMYWJlbFxcJyBwcm9wZXJ0eSBhbmQgYSBcXCdkYXRhXFwnIHByb3BlcnR5OiAnLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBkcmF3QWxsR3JhcGhMaW5lcygpIHtcbiAgICBzdXBlci5kcmF3QWxsR3JhcGhMaW5lcygpO1xuICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5mb3JFYWNoKGUgPT4gdGhpcy5kcmF3R3JhcGhMaW5lKGUpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gICAgRDNHZW5lcmFsRGF0YVBvaW50LFxuICAgIEQzR2VuZXJhbERhdGFzZXQsXG4gICAgRDNHZW5lcmFsSW5wdXQsXG4gICAgRDNHZW5lcmFsUGxvdE9wdGlvbnMsXG4gICAgRDNHZW5lcmFsQXhpc09wdGlvbnMsXG4gICAgUmFuZ2UsXG4gICAgRDNHZW5lcmFsR3JhcGhPcHRpb25zXG59IGZyb20gJy4uL21vZGVsL2QzLWdlbmVyYWwnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLWdlbmVyYWwtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2QzZ2VuZXJhbD48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLnh7ZmlsbDpvcmFuZ2U7ZmlsbC1vcGFjaXR5Oi40fS5kMyAueCAudGlja3tzdHJva2U6IzAwZjtzdHJva2Utd2lkdGg6MTBweH0uZDMgLnggLnRpY2sgbGluZXtzdHJva2U6cmVkO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuYXhpc3tmaWxsOm9yYW5nZTtmaWxsLW9wYWNpdHk6LjR9LmQzIC5heGlzIC50aWNre3N0cm9rZTojMDBmO3N0cm9rZS13aWR0aDoxMHB4fS5kMyAuYXhpcyAudGljayBsaW5le3N0cm9rZTojZmZhMDdhO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuZ3JhcGhEb3Rze3N0cm9rZS13aWR0aDowO3N0cm9rZS1vcGFjaXR5OjF9LmQzIC5ncmFwaERvdHMgLmhvdmVye3N0cm9rZS13aWR0aDoyMHB4O3N0cm9rZS1vcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBWaWV3Q2hpbGQoJ2QzZ2VuZXJhbCcpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdlbmVyYWxEM0lucHV0OiBEM0dlbmVyYWxJbnB1dDtcblxuICAgIC8vIGNvbXBvbmVubnQgZGF0YSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIGdlbmVyYWxEYXRhOiBEM0dlbmVyYWxEYXRhc2V0W10gPSBbXTtcbiAgICBwcml2YXRlIGF4aXNPcHRpb25zOiBEM0dlbmVyYWxBeGlzT3B0aW9ucyA9IHt9O1xuICAgIHByaXZhdGUgcGxvdE9wdGlvbnM6IEQzR2VuZXJhbFBsb3RPcHRpb25zID0ge1xuICAgICAgICB4bGFiZWw6ICd4JyxcbiAgICAgICAgeWxhYmVsOiAneScsXG4gICAgICAgIGRhdGU6IGZhbHNlXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGVmYXVsdEdyYXBoT3B0aW9uczogRDNHZW5lcmFsR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICBwb2ludFJhZGl1czogMlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGdyYXBoIGNvbXBvbmVudHNcbiAgICBwcml2YXRlIHJhd1N2ZzogYW55O1xuICAgIHByaXZhdGUgZ3JhcGg6IGFueTtcbiAgICBwcml2YXRlIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZ3JhcGhGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG5cbiAgICAvLyBjb21wb25lbnQgc2V0dGluZ3NcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGJ1ZmZlciA9IDA7XG4gICAgcHJpdmF0ZSBtYXhMYWJlbHdpZHRoID0gMDtcblxuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDEwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IGQzLnNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5tYXJnaW4ubGVmdCArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaEZvY3VzID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cblxuICAgICAgICB0aGlzLnByZXBhcmVEYXRhKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5nZW5lcmFsRDNJbnB1dCAmJiB0aGlzLnJhd1N2Zykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dCA9IGNoYW5nZXMuZ2VuZXJhbEQzSW5wdXQuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhbEQzSW5wdXQpIHtcbiAgICAgICAgICAgIC8vIGFkZCBhbGwgaW5wdXQgZGF0YXNldCBpbnRvIG9uZSBhcnJheSAocHVibGljIGdlbmVyYWxEYXRhKVxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dC5kYXRhc2V0cy5mb3JFYWNoKChkcywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXNldDogRDNHZW5lcmFsRGF0YXNldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZHMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoZHMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMgPSB0aGlzLmdlbmVyYWxEM0lucHV0LnBsb3RPcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy5kYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYXhpc09wdGlvbnMueFJhbmdlID0gdGhpcy5nZXRSYW5nZShkYXRhLCAneCcpO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55UmFuZ2UgPSB0aGlzLmdldFJhbmdlKGRhdGEsICd5Jyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsIGZ1bmN0aW9ucyByZWxhdGVkIHRvIHBsb3R0aW5nIGEgZGF0YXNldCBpbiBhIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGxvdEdyYXBoKCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55U2NhbGUgPSB0aGlzLmRyYXdZYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy54U2NhbGUgPSB0aGlzLmRyYXdYYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGhGb2N1cy5hcHBlbmQoJ2cnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0Jyk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGhMaW5lKGRhdGFzZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgeSBheGlzLlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHtEM0dlbmVyYWxEYXRhc2V0fSBPYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdZYXhpcyhvcHRpb25zOiBEM0dlbmVyYWxQbG90T3B0aW9ucykge1xuXG4gICAgICAgIC8vIHNldCByYW5nZSBvZmZzZXQgZm9yIHkgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgeVJhbmdlT2Zmc2V0ID0gMTA7XG4gICAgICAgIGNvbnN0IHlSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueVJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBpZiAoeVJhbmdlLm1heCAhPT0geVJhbmdlLm1pbikge1xuICAgICAgICAgICAgeVJhbmdlT2Zmc2V0ID0gKHlSYW5nZS5tYXggLSB5UmFuZ2UubWluKSAqIDAuMTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5UmFuZ2VPZmZzZXQgPSB5UmFuZ2UubWluICogMC4xMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lSYW5nZS5taW4gLSB5UmFuZ2VPZmZzZXQsIHlSYW5nZS5tYXggKyB5UmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGNvbnN0IHlBeGlzR2VuID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCB5QXhpcyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzR2VuKTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpcyBsYWJlbFxuICAgICAgICBjb25zdCB5QXhpc0xhYmVsID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgdGhpcy5oZWlnaHQgLyAyICsgJylyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5QXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQnLCAnMThweCB0aW1lcycpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy55bGFiZWwpO1xuXG4gICAgICAgIC8vIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcueUF4aXNUZXh0TGFiZWwnKVxuICAgICAgICB0aGlzLmJ1ZmZlciA9IHlBeGlzLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyAxMCArIHRoaXMuZ2V0RGltZW5zaW9ucyh5QXhpc0xhYmVsLm5vZGUoKSkuaDtcblxuICAgICAgICB5QXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cbiAgICAgICAgLy8gZHJhdyB5IGdyaWQgbGluZXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHlTY2FsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHggYXhpcy5cbiAgICAgKiBAcGFyYW0gZGF0YXNldCB7RDNHZW5lcmFsRGF0YXNldH0gT2JqZWN0IHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WGF4aXMob3B0aW9uczogRDNHZW5lcmFsUGxvdE9wdGlvbnMpIHtcbiAgICAgICAgLy8gc2V0IHJhbmdlIG9mZnNldCBmb3IgeCBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHhSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueFJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBsZXQgdGlja3MgPSAxMDtcbiAgICAgICAgbGV0IHhSYW5nZU9mZnNldCA9ICh4UmFuZ2UubWF4IC0geFJhbmdlLm1pbikgKiAwLjEwO1xuICAgICAgICBpZiAoeFJhbmdlLm1heCA9PT0geFJhbmdlLm1pbikge1xuICAgICAgICAgICAgdGlja3MgPSA1O1xuICAgICAgICAgICAgeFJhbmdlT2Zmc2V0ID0geFJhbmdlLm1pbiAqIDAuMTA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFt4UmFuZ2UubWluIC0geFJhbmdlT2Zmc2V0LCB4UmFuZ2UubWF4ICsgeFJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5idWZmZXIsIHRoaXMud2lkdGhdKTtcblxuICAgICAgICBjb25zdCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgICAgICAgICAgLnRpY2tzKHRpY2tzKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZC52YWx1ZU9mKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRTZWNvbmQgPSAnOiVTJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1pbnV0ZSA9ICclSDolTScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdERheSA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRXZWVrID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFllYXIgPSAnJVknO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGQzLnRpbWVTZWNvbmQoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVIb3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVEYXkoZGF0ZSkgPCBkYXRlID8gZm9ybWF0SG91clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lWWVhcihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdFllYXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJyArIGQudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcblxuICAgICAgICAvLyBkcmF3IHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpc1xuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tzKDApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyBkcmF3IHggYXhpcyBsYWJlbFxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi5ib3R0b20gLSA1KVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy54bGFiZWwpO1xuXG4gICAgICAgIHJldHVybiB4U2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgbGluZSBvZiB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0QzR2VuZXJhbERhdGFzZXR9IE9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkYXRzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGhMaW5lKGRhdGFzZXQ6IEQzR2VuZXJhbERhdGFzZXQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGdyYWggbGluZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5ncmFwaEJvZHkgPSB0aGlzLmdyYXBoXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgZGF0YXNldC5pZCArICcpJyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2l0aCBkYXRhc2V0XG4gICAgICAgIGxldCBncmFwaExpbmUgPSBkMy5saW5lPEQzR2VuZXJhbERhdGFQb2ludD4oKVxuICAgICAgICAgICAgLmRlZmluZWQoZCA9PiAoIWlzTmFOKGQueCkgJiYgIWlzTmFOKGQueSkpKVxuICAgICAgICAgICAgLngoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnhTY2FsZShkLngpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeENvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnhDb29yZCA9IHhDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnlTY2FsZShkLnkpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeUNvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnlDb29yZCA9IHlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmN1cnZlKGQzLmN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmdyYXBoQm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgLmRhdHVtKGRhdGFzZXQuZGF0YSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLmxpbmVXaWR0aCA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5saW5lcy5saW5lV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignZCcsIGdyYXBoTGluZSk7XG5cbiAgICAgICAgLy8gZHJhdyBjaXJjbGVzIGFyb3VuZCBkYXRhcG9pbnRzXG4gICAgICAgIHRoaXMuZ3JhcGhCb2R5LnNlbGVjdEFsbCgnLmdyYXBoRG90cycpXG4gICAgICAgICAgICAuZGF0YShkYXRhc2V0LmRhdGEuZmlsdGVyKChkKSA9PiAhaXNOYU4oZC55KSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JhcGhEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RvdC0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJy0nICsgZGF0YXNldC5pZCArICcnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5jb2xvciA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGguY29sb3IgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignY3gnLCBncmFwaExpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgZ3JhcGhMaW5lLnkoKSlcbiAgICAgICAgICAgIC5hdHRyKCdyJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV0IG9mIHBvbHlnb25zIG92ZXJsYXlpbmcgdGhlIGdyYXBocyB0byBkaXZpZGUgc2VjdGlvbnMgZm9yIGhvdmVyaW5nLlxuICAgICAqIEBwYXJhbSBpbnB1dERhdGEge0QzR2VuZXJhbERhdGFzZXRbXX0gZGF0YSBjb250YWluaW5nIGFuIGFycmF5IHdpdGggYWxsIGRhdGFwb2ludHMgYW5kIGFuIGlkIGZvciBlYWNoIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUhvdmVyaW5nTmV0KGlucHV0RGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgZGF0YSA9IGlucHV0RGF0YS5tYXAoZnVuY3Rpb24gKHNlcmllcywgaSkge1xuICAgICAgICAgICAgc2VyaWVzLmRhdGEgPSBzZXJpZXMuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgcG9pbnQuc2VyaWVzID0gaTtcbiAgICAgICAgICAgICAgICBwb2ludFswXSA9IHBvaW50Lng7XG4gICAgICAgICAgICAgICAgcG9pbnRbMV0gPSBwb2ludC55O1xuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlcmllcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLFxuICAgICAgICAgICAgeSA9IGQzLnNjYWxlTGluZWFyKCk7XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBkMy5tZXJnZShkYXRhLm1hcChmdW5jdGlvbiAoY2wsIGxpbmVJbmRleCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjbCA9IHsgZGF0YTogW3swOiBudW1iZXIsIDE6IG51bWJlciwgc2VyaWVzOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyfSwge30sIC4uLl0sIGlkOiBudW1iZXIgfVxuICAgICAgICAgICAgICogcG9pbnQgPSBlYWNoIHBvaW50IGluIGEgZGF0YXNldFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBvdXRwdXRMaW5lID0gY2wuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50LCBwb2ludEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dFBvaW50ID0gW3gocG9pbnQueENvb3JkKSwgeShwb2ludC55Q29vcmQpLCBsaW5lSW5kZXgsIHBvaW50SW5kZXgsIHBvaW50LCBjbF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFBvaW50OyAvLyBhZGRpbmcgc2VyaWVzIGluZGV4IHRvIHBvaW50IGJlY2F1c2UgZGF0YSBpcyBiZWluZyBmbGF0dGVuZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpbmU7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVmZmVyLCAvLyArIHRoaXMubWFyZ2luLmxlZnQsXG4gICAgICAgICAgICB0b3AgPSB0aGlzLm1hcmdpbi50b3AsXG4gICAgICAgICAgICByaWdodCA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIsIC8vICsgdGhpcy5tYXJnaW4ubGVmdCxcbiAgICAgICAgICAgIGJvdHRvbSA9IHRoaXMubWFyZ2luLnRvcCArIHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcblxuICAgICAgICAvLyBmaWx0ZXIgZGF0YXNldCAtIGRlbGV0ZSBhbGwgZW50cmllcyB0aGF0IGFyZSBOYU5cbiAgICAgICAgbGV0IHZlcnRpY2VzRmlsdGVyZWQgPSB2ZXJ0aWNlcy5maWx0ZXIoZCA9PiAhaXNOYU4oZFswXSkgfHwgIWlzTmFOKGRbMV0pKTtcbiAgICAgICAgY29uc3QgRGlmZnZvcm9ub2kgPSBkMy52b3Jvbm9pKClcbiAgICAgICAgICAgIC5leHRlbnQoW1tsZWZ0LCB0b3BdLCBbcmlnaHQsIGJvdHRvbV1dKTtcbiAgICAgICAgbGV0IGRpZmZWb3Jvbm9pMiA9IERpZmZ2b3Jvbm9pLnBvbHlnb25zKHZlcnRpY2VzRmlsdGVyZWQpO1xuXG4gICAgICAgIGxldCB3cmFwID0gdGhpcy5yYXdTdmcuc2VsZWN0QWxsKCdnLmQzbGluZScpLmRhdGEoW3ZlcnRpY2VzRmlsdGVyZWRdKTtcbiAgICAgICAgbGV0IGdFbnRlciA9IHdyYXAuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdkM2xpbmUnKS5hcHBlbmQoJ2cnKTtcbiAgICAgICAgZ0VudGVyLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BvaW50LXBhdGhzJyk7XG5cbiAgICAgICAgLy8gdG8gYXZvaWQgbm8gaG92ZXJpbmcgZm9yIG9ubHkgb25lIGRhdGFzZXQgd2l0aG91dCBpbnRlcmFjdGlvbiB0aGUgZm9sbG93aW5nIGxpbmVzIGFyZSBkb3VibGVkXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgdGhlIHBhdGhzLCB3aGljaCBjYW4gYmUgdXBkYXRlZCBsYXRlciBvbiAoYnkgdGhlICdleGl0KCkucmVtb3ZlKCknIGZ1bmN0aW9uIGNhbGxzKVxuICAgICAgICBsZXQgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHBvaW50UGF0aHMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBwb2ludFBhdGhzXG4gICAgICAgICAgICAuYXR0cignY2xpcC1wYXRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkLmRhdGFbNF0ueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQuZGF0YVs0XS54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjY2xpcC0nICsgZC5kYXRhWzVdLmlkICsgJy0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCcgJykgKyAnWic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbi5sZWZ0ICsgJywgJyArIHRoaXMubWFyZ2luLnRvcCArICcpJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSBkLmRhdGFbNF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gdGhpcy5jYWxjRGlzdGFuY2VIb3ZlcmluZyhkYXRhc2V0LCBjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEJhY2sgPSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPj0gMCAmJiBjb29yZHNbMF0gPD0gcmVjdEJhY2sud2lkdGggJiYgY29vcmRzWzFdID49IDAgJiYgY29vcmRzWzFdIDw9IHJlY3RCYWNrLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkYXRhc2V0eENvb3JkU3BsaXQgKyAnLScgKyBkLmRhdGFbNV0uaWQgKyAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwLjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgKHJhZGl1cyAqIDIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLnBsb3RPcHRpb25zLmRhdGUgPyAneDogJyArIG1vbWVudChkYXRhc2V0LngpLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKSArICcgeTogJyArIGRhdGFzZXQueSA6ICd4OiAnICsgZGF0YXNldC54ICsgJyB5OiAnICsgZGF0YXNldC55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkb3RMYWJlbCA9IHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdExhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgY29sb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMiA+IGNvb3Jkc1swXSkgeyBvbkxlZnRTaWRlID0gdHJ1ZTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZGF0YXNldC55Q29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RXOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS53ICsgODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEg6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLmg7IC8vICsgNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0WCA9IGRhdGFzZXQueENvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkYXRhc2V0LnlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvb3Jkc1sxXSArIHJlY3RIICsgNCkgPiB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBsYWJlbCBiZWxvdyB4IGF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RyYW5zbGF0ZSBsYWJlbCB0byBhIGhpZ2hlciBwbGFjZS4gLSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDQgKyAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFggPSBkYXRhc2V0LnhDb29yZCAtIHJlY3RXICsgNCAtIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFkgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGxhYmVsWCArICcsICcgKyBsYWJlbFkgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5oaWdobGlnaHQgaG92ZXJlZCBkb3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldCA9IGQuZGF0YVs0XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLnBvaW50UmFkaXVzIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmxpbmVzLnBvaW50UmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldHhDb29yZFNwbGl0ID0gZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJy0nICsgZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBtb3VzZSBhbmQgYSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHt9IENvb3JkaW5hdGVzIG9mIHRoZSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBjb29yZHMge30gQ29vcmRpbmF0ZXMgb2YgdGhlIG1vdXNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0Rpc3RhbmNlSG92ZXJpbmcoZGF0YXNldDogRDNHZW5lcmFsRGF0YVBvaW50LCBjb29yZHM6IFtudW1iZXIsIG51bWJlcl0pOiBudW1iZXIge1xuICAgICAgICBsZXQgbVggPSBjb29yZHNbMF0gKyB0aGlzLmJ1ZmZlcixcbiAgICAgICAgICAgIG1ZID0gY29vcmRzWzFdLCAvLyArIHRoaXMubWFyZ2luLnRvcCxcbiAgICAgICAgICAgIHBYID0gZGF0YXNldC54Q29vcmQsXG4gICAgICAgICAgICBwWSA9IGRhdGFzZXQueUNvb3JkO1xuICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludCBhbmQgbW91c2Ugd2hlbiBob3ZlcmluZ1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChwWCAtIG1YKSwgMikgKyBNYXRoLnBvdygocFkgLSBtWSksIDIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmdlKGRhdGE6IEQzR2VuZXJhbERhdGFQb2ludFtdLCBzZWxlY3Rvcjogc3RyaW5nKTogUmFuZ2Uge1xuICAgICAgICAvLyByYW5nZSBmb3IgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBkMy5leHRlbnQoZDMudmFsdWVzKGRhdGEubWFwKChkKSA9PiB7XG4gICAgICAgICAgICBpZiAoKCFpc05hTihkLngpICYmICFpc05hTihkLnkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkW3NlbGVjdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKTtcbiAgICAgICAgcmV0dXJuIHsgbWluOiByYW5nZVswXSwgbWF4OiByYW5nZVsxXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBib3VuZGluZ3Mgb2YgYSBodG1sIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsIHtPYmplY3R9IE9iamVjdCBvZiB0aGUgaHRtbCBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KTogeyB3OiBudW1iZXIsIGg6IG51bWJlciB9IHtcbiAgICAgICAgbGV0IHcgPSAwO1xuICAgICAgICBsZXQgaCA9IDA7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLmdldEJCb3goKTtcbiAgICAgICAgICAgIHcgPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgaCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBnZXREaW1lbnNpb25zKCkgJyArIGVsICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBoXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IEQzT3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgvZDMtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRpbWVzZXJpZXMtZ3JhcGgvZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2QzLXRyYWplY3RvcnktZ3JhcGgvZDMtdHJhamVjdG9yeS1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRXh0ZW5kZWREYXRhRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG59IGZyb20gJy4vZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCB7IEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9kMy1nZW5lcmFsLWdyYXBoL2QzLWdlbmVyYWwtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSGVsZ29sYW5kQ29yZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRDNUcmFqZWN0b3J5R3JhcGhDb21wb25lbnQsXG4gICAgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRDNPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBEM0dlbmVyYWxHcmFwaENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRDNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZDMubW91c2UiLCJkMy5zZWxlY3RBbGwiLCJkMy5zZWxlY3QiLCJkMy5ldmVudCIsImQzLmV4dGVudCIsImQzLnpvb20iLCJkMy5kcmFnIiwiZDMuYnJ1c2hYIiwibGluZSIsImQzLnNjYWxlVGltZSIsImQzLmF4aXNCb3R0b20iLCJkMy50aW1lU2Vjb25kIiwiZDMudGltZU1pbnV0ZSIsImQzLnRpbWVIb3VyIiwiZDMudGltZURheSIsImQzLnRpbWVNb250aCIsImQzLnRpbWVXZWVrIiwiZDMudGltZVllYXIiLCJkMy5heGlzVG9wIiwiZDMuc2NhbGVMaW5lYXIiLCJkMy5heGlzTGVmdCIsImQzLmxpbmUiLCJkMy5jdXJ2ZUxpbmVhciIsImQzLmJpc2VjdG9yIiwibWluIiwiZDMubWluIiwidmFsdWVzIiwiZDMubWVyZ2UiLCJkMy52b3Jvbm9pIiwiZDMudmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQXVCYSxrQ0FBa0MsR0FSL0M7Ozs7O0lBNENJLFlBQ2MsUUFBYyxFQUNkLEVBQXFCO1FBRHJCLGFBQVEsR0FBUixRQUFRLENBQU07UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtpQ0FqQmdCLElBQUksWUFBWSxFQUFFO3lCQUczQixJQUFJLFlBQVksRUFBRTtnQ0FHWCxJQUFJLFlBQVksRUFBRTtvQkFPcEQsS0FBSztRQU1oQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN6QzthQUFNO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzlDO0tBQ0o7Ozs7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7O0lBR3JCLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxJQUFJLE9BQU8sb0JBQWlCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7Ozs7O0lBR0UsV0FBVztRQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7OztJQUdkLGVBQWUsQ0FBQyxRQUFrQjtRQUNyQyxJQUFJLENBQUMsaUJB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