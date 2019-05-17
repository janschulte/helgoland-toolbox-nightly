import { AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { D3GeneralInput } from '../model/d3-general';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
export declare class D3GeneralGraphComponent implements AfterViewInit, OnChanges {
    protected timeFormatLocaleService: D3TimeFormatLocaleService;
    d3Elem: ElementRef;
    generalD3Input: D3GeneralInput;
    private generalData;
    private axisOptions;
    private plotOptions;
    private defaultGraphOptions;
    private rawSvg;
    private graph;
    private graphBody;
    private background;
    private graphFocus;
    private focusG;
    private highlightRect;
    private highlightText;
    private height;
    private width;
    private buffer;
    private maxLabelwidth;
    private margin;
    constructor(timeFormatLocaleService: D3TimeFormatLocaleService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
    private prepareData();
    /**
     * Function to call functions related to plotting a dataset in a graph.
     */
    private plotGraph();
    /**
     * Function to draw y axis.
     * @param dataset {D3GeneralDataset} Object with information about the dataset.
     */
    private drawYaxis(options);
    /**
     * Function to draw x axis.
     * @param dataset {D3GeneralDataset} Object with information about the dataset.
     */
    private drawXaxis(options);
    /**
     * Function to draw the line of the graph.
     * @param dataset {D3GeneralDataset} Object with information about the datset.
     */
    private drawGraphLine(dataset);
    /**
     * Function to create a net of polygons overlaying the graphs to divide sections for hovering.
     * @param inputData {D3GeneralDataset[]} data containing an array with all datapoints and an id for each dataset
     */
    private createHoveringNet(inputData);
    /**
     * Function to calculate distance between mouse and a hovered point.
     * @param dataset {} Coordinates of the hovered point.
     * @param coords {} Coordinates of the mouse.
     */
    private calcDistanceHovering(dataset, coords);
    private getRange(data, selector);
    /**
     * Function that returns the height of the graph diagram.
     */
    private calculateHeight();
    /**
     * Function that returns the width of the graph diagram.
     */
    private calculateWidth();
    /**
     * Function that returns the boundings of a html element.
     * @param el {Object} Object of the html element.
     */
    private getDimensions(el);
}
