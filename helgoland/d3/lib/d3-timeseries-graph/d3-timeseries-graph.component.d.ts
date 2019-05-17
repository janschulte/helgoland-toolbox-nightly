import { AfterViewInit, ElementRef, EventEmitter, IterableDiffers } from '@angular/core';
import { ColorService, Data, DatasetApiInterface, DatasetOptions, DatasetPresenterComponent, IDataset, InternalIdHandler, MinMaxRange, Time, TimeseriesData, Timespan } from '@helgoland/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as d3 from 'd3';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
import { HighlightOutput } from '../model/d3-highlight';
import { D3PlotOptions } from '../model/d3-plot-options';
export interface DataEntry {
    timestamp: number;
    value: number;
    xDiagCoord?: number;
    yDiagCoord?: number;
}
export interface InternalDataEntry {
    internalId: string;
    id?: number;
    color: string;
    data: DataEntry[];
    selected?: boolean;
    points: {
        fillColor: string;
    };
    lines?: {
        lineWidth?: number;
        pointRadius?: number;
    };
    bars?: {
        lineWidth?: number;
    };
    axisOptions: {
        uom: string;
        label?: string;
        zeroBased?: boolean;
        yAxisRange?: MinMaxRange;
        autoRangeSelection?: boolean;
        separateYAxis?: boolean;
        parameters?: {
            feature?: {
                id: String;
                label: String;
            };
            phenomenon?: {
                id: String;
                label: String;
            };
            offering?: {
                id: String;
                label: String;
            };
        };
    };
    visible: boolean;
    focusLabelRect?: any;
    focusLabel?: any;
}
export interface DataConst extends IDataset {
    data?: Data<[number, number]>;
}
export interface YRanges {
    uom: string;
    range?: MinMaxRange;
    preRange?: MinMaxRange;
    originRange?: MinMaxRange;
    zeroBased: boolean;
    autoRange: boolean;
    outOfrange: boolean;
    id?: string;
    ids?: string[];
    first?: boolean;
    yScale?: d3.ScaleLinear<number, number>;
    offset?: number;
    parameters: {
        feature?: {
            id: String;
            label: String;
        };
        phenomenon?: {
            id: String;
            label: String;
        };
        offering?: {
            id: String;
            label: String;
        };
    };
}
export declare class D3TimeseriesGraphComponent extends DatasetPresenterComponent<DatasetOptions, D3PlotOptions> implements AfterViewInit {
    protected iterableDiffers: IterableDiffers;
    protected api: DatasetApiInterface;
    protected datasetIdResolver: InternalIdHandler;
    protected timeSrvc: Time;
    protected timeFormatLocaleService: D3TimeFormatLocaleService;
    protected colorService: ColorService;
    protected translateService: TranslateService;
    mainTimeInterval: Timespan;
    onHighlightChanged: EventEmitter<HighlightOutput>;
    onClickDataPoint: EventEmitter<TimeseriesData[]>;
    d3Elem: ElementRef;
    highlightOutput: HighlightOutput;
    protected rawSvg: any;
    protected graph: any;
    protected graphFocus: any;
    protected graphBody: any;
    private dragRect;
    private dragRectG;
    private background;
    private copyright;
    private focusG;
    private highlightFocus;
    private highlightRect;
    private highlightText;
    private focuslabelTime;
    private dragging;
    private dragStart;
    private dragCurrent;
    private draggingMove;
    private dragMoveStart;
    private dragMoveRange;
    private mousedownBrush;
    private oldGroupYaxis;
    protected preparedData: InternalDataEntry[];
    protected datasetMap: Map<string, DataConst>;
    protected listOfUoms: string[];
    protected yRangesEachUom: YRanges[];
    protected dataYranges: YRanges[];
    private xAxisRange;
    private xAxisRangeOrigin;
    private xAxisRangePan;
    private listOfSeparation;
    private yAxisSelect;
    private xScaleBase;
    private yScaleBase;
    private labelTimestamp;
    private labelXCoord;
    private distLabelXCoord;
    private bufferSum;
    private height;
    private width;
    private margin;
    private maxLabelwidth;
    private opac;
    private addLineWidth;
    private loadingCounter;
    private currentTimeId;
    private plotOptions;
    constructor(iterableDiffers: IterableDiffers, api: DatasetApiInterface, datasetIdResolver: InternalIdHandler, timeSrvc: Time, timeFormatLocaleService: D3TimeFormatLocaleService, colorService: ColorService, translateService: TranslateService);
    ngAfterViewInit(): void;
    protected onLanguageChanged(langChangeEvent: LangChangeEvent): void;
    reloadDataForDatasets(datasetIds: string[]): void;
    protected addDataset(id: string, url: string): void;
    protected removeDataset(internalId: string): void;
    protected setSelectedId(internalId: string): void;
    protected removeSelectedId(internalId: string): void;
    protected presenterOptionsChanged(options: D3PlotOptions): void;
    protected datasetOptionsChanged(internalId: string, options: DatasetOptions, firstChange: boolean): void;
    protected timeIntervalChanges(): void;
    protected onResize(): void;
    centerTime(timestamp: number): void;
    private changeTime(from, to);
    private loadAddedDataset(dataset);
    private loadDatasetData(dataset, force);
    private onCompleteLoadingData();
    /**
     * Function to prepare each dataset for the graph and adding it to an array of datasets.
     * @param dataset {IDataset} Object of the whole dataset
     */
    private prepareTsData(dataset, data);
    /**
     * Function to add referencevaluedata to the dataset (e.g. mean).
     * @param internalId {String} String with the id of a dataset
     * @param styles {DatasetOptions} Object containing information for dataset styling
     * @param data {Data} Array of Arrays containing the measurement-data of the dataset
     * @param uom {String} String with the uom of a dataset
     */
    private addReferenceValueData(internalId, styles, data, uom);
    /**
     * Function that processes the data to calculate y axis range of each dataset.
     * @param dataEntry {DataEntry} Object containing dataset related data.
     */
    protected processData(dataEntry: InternalDataEntry): void;
    /**
     * Function to set range to default interval, if min and max of range are not set.
     * @param range {MinMaxRange} range to be set
     */
    protected extendRange(range: MinMaxRange): void;
    /**
     * Function to check ranges for min and max range.
     * @param idx {Number} Index of element
     * @param obj {YRanges} new object to be compared with old
     * @param pos {String} type of range (e.g. preRange, range, originRange)
     */
    private checkCurrentLatest(idx, obj, pos);
    /**
     * Function to set min and max range.
     * @param idx {Number} Index of element
     * @param obj {YRanges} new object
     * @param pos {String} type of range (e.g. preRange, range, originRange)
     */
    private takeLatest(idx, obj, pos);
    /**
     * Function that returns the height of the graph diagram.
     */
    private calculateHeight();
    /**
     * Function that returns the width of the graph diagram.
     */
    private calculateWidth();
    /**
     * Function that returns the value range for building the y axis for each uom of every dataset.
     * @param uom {String} String that is the uom of a dataset
     */
    private getyAxisRange(uom);
    /**
     * Function to plot the graph and its dependencies
     * (graph line, graph axes, event handlers)
     */
    protected plotGraph(): void;
    private createPointHovering(entry, line);
    private createLineHovering();
    private clickDataPoint(d, entry);
    private addTimespanJumpButtons();
    private createCopyrightLabel();
    /**
     * Draws for every preprared data entry the graph line.
     */
    protected drawAllGraphLines(): void;
    /**
     * Function that calculates and returns the x diagram coordinate for the brush range
     * for the overview diagram by the selected time interval of the main diagram.
     * Calculate to get brush extent when main diagram time interval changes.
     */
    private getXDomainByTimestamp();
    /**
     * Function that calculates and returns the timestamp for the main diagram calculated
     * by the selected coordinate of the brush range.
     * @param minCalcBrush {Number} Number with the minimum coordinate of the selected brush range.
     * @param maxCalcBrush {Number} Number with the maximum coordinate of the selected brush range.
     */
    private getTimestampByCoord(minCalcBrush, maxCalcBrush);
    /**
     * Function that draws the x axis to the svg element.
     * @param bufferXrange {Number} Number with the distance between left edge and the beginning of the graph.
     */
    private drawXaxis(bufferXrange);
    /**
     * Function to draw the y axis for each dataset.
     * Each uom has its own axis.
     * @param entry {DataEntry} Object containing a dataset.
     */
    private drawYaxis(entry);
    /**
     * Function to check whether object yAxisSelect exists with selected uom.
     * If it does not exist, it will be created.
     * @param identifier {String} String providing the selected uom or the selected dataset ID.
     */
    private checkYselector(identifier, uom);
    /**
     * Function to adapt y axis highlighting to selected TS or selected uom
     */
    private changeYselection();
    /**
     * Function that returns the amount of datasets that are grouped with the same uom
     * @param uom {String} uom
     * @param id {String} internalId of the dataset that can be skipped
     * returns {Number} amount of datasets with the given uom
     */
    private countGroupedDatasets(uom, id);
    /**
     * Function to set selected Ids that should be highlighted.
     * @param ids {Array} Array of Strings containing the Ids.
     * @param uom {String} String with the uom for the selected Ids
     */
    private highlightLine(ids);
    /**
     * Function that changes state of selected Ids.
     */
    private changeSelectedIds(toHighlightDataset, change);
    /**
     * Function to draw the graph line for each dataset.
     * @param entry {DataEntry} Object containing a dataset.
     */
    protected drawGraphLine(entry: InternalDataEntry): void;
    /**
     * Function that shows labeling via mousmove.
     */
    private mousemoveHandler;
    /**
     * Function that hides the labeling inside the graph.
     */
    private mouseoutHandler;
    /**
     * Function starting the drag handling for the diagram.
     */
    private panStartHandler;
    /**
     * Function that controlls the panning (dragging) of the graph.
     */
    private panMoveHandler;
    /**
     * Function that ends the dragging control.
     */
    private panEndHandler;
    /**
     * Function that starts the zoom handling.
     */
    private zoomStartHandler;
    /**
     * Function that draws a rectangle when zoom is started and the mouse is moving.
     */
    private zoomHandler;
    /**
     * Function that ends the zoom handling and calculates the via zoom selected time interval.
     */
    private zoomEndHandler;
    private createLine(xScaleBase, yScaleBase);
    private mouseOverPointHovering(d, entry);
    private mouseOutPointHovering(d, entry);
    protected getYaxisRange(entry: InternalDataEntry): YRanges;
    /**
     * Function that returns the timestamp of provided x diagram coordinates.
     * @param start {Number} Number with the minimum diagram coordinate.
     * @param end {Number} Number with the maximum diagram coordinate.
     */
    private getxDomain(start, end);
    /**
     * Function that configurates and draws the rectangle.
     */
    private drawDragRectangle();
    /**
     * Function that disables the drawing rectangle control.
     */
    private resetDrag();
    /**
     * Function that returns the metadata of a specific entry in the dataset.
     * @param x {Number} Coordinates of the mouse inside the diagram.
     * @param data {DataEntry} Array with the data of each dataset entry.
     */
    private getItemForX(x, data);
    /**
     * Function that disables the labeling.
     */
    private hideDiagramIndicator();
    /**
     * Function that enables the lableing of each dataset entry.
     * @param entry {InternalDataEntry} Object containing the dataset.
     * @param idx {Number} Number with the position of the dataset entry in the data array.
     * @param xCoordMouse {Number} Number of the x coordinate of the mouse.
     * @param entryIdx {Number} Number of the index of the entry.
     */
    private showDiagramIndicator;
    /**
     * Function to change visibility of label and white rectangle inside graph (next to mouse-cursor line).
     * @param entry {DataEntry} Object containing the dataset.
     * @param visible {Boolean} Boolean giving information about visibility of a label.
     */
    private chVisLabel(entry, visible, entryIdx);
    /**
     * Function to show the labeling inside the graph.
     * @param entry {DataEntry} Object containg the dataset.
     * @param item {DataEntry} Object of the entry in the dataset.
     */
    private showLabelValues(entry, item);
    /**
     * Function to show the time labeling inside the graph.
     * @param item {DataEntry} Object of the entry in the dataset.
     * @param entryIdx {Number} Number of the index of the entry.
     */
    private showTimeIndicatorLabel(item, entryIdx, mouseCoord);
    /**
     * Function giving information if the mouse is on left side of the diagram.
     * @param itemCoord {number} x coordinate of the value (e.g. mouse) to be checked
     */
    private checkLeftSide(itemCoord);
    /**
     * Function to wrap the text for the y axis label.
     * @param text {any} y axis label
     * @param width {Number} width of the axis which must not be crossed
     * @param xposition {Number} position to center the label in the middle
     */
    private wrapText(textObj, width, xposition);
    /**
     * Function that returns the boundings of a html element.
     * @param el {Object} Object of the html element.
     */
    private getDimensions(el);
    /**
     * Function to generate uuid for a diagram
     */
    private uuidv4();
    /**
     * Function to generate components of the uuid for a diagram
     */
    private s4();
    /**
     * Function that logs the error in the console.
     * @param error {Object} Object with the error.
     */
    private onError(error);
}
