/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
import moment from 'moment';
export class D3GeneralGraphComponent {
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
        const yScale = d3.scaleLinear()
            .domain([yRange.min - yRangeOffset, yRange.max + yRangeOffset])
            .range([this.height, 0]);
        /** @type {?} */
        const yAxisGen = d3.axisLeft(yScale).ticks(5);
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
            .call(d3.axisLeft(yScale)
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
        const xScale = d3.scaleLinear()
            .domain([xRange.min - xRangeOffset, xRange.max + xRangeOffset])
            .range([this.buffer, this.width]);
        /** @type {?} */
        const xAxis = d3.axisBottom(xScale)
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
                const format = d3.timeSecond(date) < date ? formatMillisecond
                    : d3.timeMinute(date) < date ? formatSecond
                        : d3.timeHour(date) < date ? formatMinute
                            : d3.timeDay(date) < date ? formatHour
                                : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                                    : d3.timeYear(date) < date ? formatMonth
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
        let graphLine = d3.line()
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
        let x = d3.scaleLinear();
        /** @type {?} */
        let y = d3.scaleLinear();
        /** @type {?} */
        let vertices = d3.merge(data.map(function (cl, lineIndex) {
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
        const Diffvoronoi = d3.voronoi()
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
                let coords = d3.mouse(this.background.node());
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
                        d3.select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
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
                    d3.select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
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
                d3.select('#dot-' + datasetxCoordSplit + '-' + d.data[5].id + '')
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
        let range = d3.extent(d3.values(data.map((d) => {
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
if (false) {
    /** @type {?} */
    D3GeneralGraphComponent.prototype.d3Elem;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.generalD3Input;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.generalData;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.axisOptions;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.plotOptions;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.defaultGraphOptions;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.rawSvg;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.graph;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.graphBody;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.background;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.graphFocus;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.focusG;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.highlightRect;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.highlightText;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.height;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.width;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.buffer;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.maxLabelwidth;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.margin;
    /** @type {?} */
    D3GeneralGraphComponent.prototype.timeFormatLocaleService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtZ2VuZXJhbC1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLWdlbmVyYWwtZ3JhcGgvZDMtZ2VuZXJhbC1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFVekIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBUTVCLE1BQU07Ozs7SUFnREYsWUFDYyx1QkFBa0Q7UUFBbEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUEyQjsyQkF4Q3RCLEVBQUU7MkJBQ0EsRUFBRTsyQkFDRjtZQUN4QyxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxHQUFHO1lBQ1gsSUFBSSxFQUFFLEtBQUs7U0FDZDttQ0FFb0Q7WUFDakQsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLENBQUM7Z0JBQ1osV0FBVyxFQUFFLENBQUM7YUFDakI7U0FDSjtzQkFlZ0IsQ0FBQzs2QkFDTSxDQUFDO3NCQUVSO1lBQ2IsR0FBRyxFQUFFLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEVBQUU7U0FDWDtLQUlJOzs7O0lBRUwsZUFBZTtRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQzthQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDckIsSUFBSSxDQUFD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LENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDTCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDckIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDekI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsTUFBTSxDQUFDO1lBQ0gsQ0FBQztZQUNELENBQUM7U0FDSixDQUFDOzs7O1lBcmpCVCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFO0NBQ2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsOGtCQUE4a0IsQ0FBQzthQUMzbEI7Ozs7WUFSUSx5QkFBeUI7OztxQkFXN0IsU0FBUyxTQUFDLFdBQVc7NkJBR3JCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCB7XG4gICAgRDNHZW5lcmFsRGF0YVBvaW50LFxuICAgIEQzR2VuZXJhbERhdGFzZXQsXG4gICAgRDNHZW5lcmFsSW5wdXQsXG4gICAgRDNHZW5lcmFsUGxvdE9wdGlvbnMsXG4gICAgRDNHZW5lcmFsQXhpc09wdGlvbnMsXG4gICAgUmFuZ2UsXG4gICAgRDNHZW5lcmFsR3JhcGhPcHRpb25zXG59IGZyb20gJy4uL21vZGVsL2QzLWdlbmVyYWwnO1xuaW1wb3J0IHsgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWQzLWdlbmVyYWwtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2QzZ2VuZXJhbD48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5kM3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZDMgLmdyaWQgLnRpY2sgbGluZXtzdHJva2U6I2QzZDNkMztzdHJva2Utb3BhY2l0eTouNztzaGFwZS1yZW5kZXJpbmc6Y3Jpc3BFZGdlc30uZDMgLnh7ZmlsbDpvcmFuZ2U7ZmlsbC1vcGFjaXR5Oi40fS5kMyAueCAudGlja3tzdHJva2U6IzAwZjtzdHJva2Utd2lkdGg6MTBweH0uZDMgLnggLnRpY2sgbGluZXtzdHJva2U6cmVkO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuYXhpc3tmaWxsOm9yYW5nZTtmaWxsLW9wYWNpdHk6LjR9LmQzIC5heGlzIC50aWNre3N0cm9rZTojMDBmO3N0cm9rZS13aWR0aDoxMHB4fS5kMyAuYXhpcyAudGljayBsaW5le3N0cm9rZTojZmZhMDdhO3N0cm9rZS13aWR0aDoxNXB4fS5kMyAuZ3JhcGhEb3Rze3N0cm9rZS13aWR0aDowO3N0cm9rZS1vcGFjaXR5OjF9LmQzIC5ncmFwaERvdHMgLmhvdmVye3N0cm9rZS13aWR0aDoyMHB4O3N0cm9rZS1vcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIEQzR2VuZXJhbEdyYXBoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBWaWV3Q2hpbGQoJ2QzZ2VuZXJhbCcpXG4gICAgcHVibGljIGQzRWxlbTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdlbmVyYWxEM0lucHV0OiBEM0dlbmVyYWxJbnB1dDtcblxuICAgIC8vIGNvbXBvbmVubnQgZGF0YSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIGdlbmVyYWxEYXRhOiBEM0dlbmVyYWxEYXRhc2V0W10gPSBbXTtcbiAgICBwcml2YXRlIGF4aXNPcHRpb25zOiBEM0dlbmVyYWxBeGlzT3B0aW9ucyA9IHt9O1xuICAgIHByaXZhdGUgcGxvdE9wdGlvbnM6IEQzR2VuZXJhbFBsb3RPcHRpb25zID0ge1xuICAgICAgICB4bGFiZWw6ICd4JyxcbiAgICAgICAgeWxhYmVsOiAneScsXG4gICAgICAgIGRhdGU6IGZhbHNlXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGVmYXVsdEdyYXBoT3B0aW9uczogRDNHZW5lcmFsR3JhcGhPcHRpb25zID0ge1xuICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICAgICAgICBwb2ludFJhZGl1czogMlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGdyYXBoIGNvbXBvbmVudHNcbiAgICBwcml2YXRlIHJhd1N2ZzogYW55O1xuICAgIHByaXZhdGUgZ3JhcGg6IGFueTtcbiAgICBwcml2YXRlIGdyYXBoQm9keTogYW55O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogYW55O1xuICAgIHByaXZhdGUgZ3JhcGhGb2N1czogYW55O1xuICAgIHByaXZhdGUgZm9jdXNHOiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRSZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBoaWdobGlnaHRUZXh0OiBhbnk7XG5cbiAgICAvLyBjb21wb25lbnQgc2V0dGluZ3NcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGJ1ZmZlciA9IDA7XG4gICAgcHJpdmF0ZSBtYXhMYWJlbHdpZHRoID0gMDtcblxuICAgIHByaXZhdGUgbWFyZ2luID0ge1xuICAgICAgICB0b3A6IDEwLFxuICAgICAgICByaWdodDogMTAsXG4gICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgIGxlZnQ6IDEwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZUZvcm1hdExvY2FsZVNlcnZpY2U6IEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnJhd1N2ZyA9IGQzLnNlbGVjdCh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGggPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgdGhpcy5tYXJnaW4ubGVmdCArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaEZvY3VzID0gdGhpcy5yYXdTdmdcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArICh0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXhMYWJlbHdpZHRoKSArICcsJyArIHRoaXMubWFyZ2luLnRvcCArICcpJyk7XG5cblxuICAgICAgICB0aGlzLnByZXBhcmVEYXRhKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5nZW5lcmFsRDNJbnB1dCAmJiB0aGlzLnJhd1N2Zykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dCA9IGNoYW5nZXMuZ2VuZXJhbEQzSW5wdXQuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhbEQzSW5wdXQpIHtcbiAgICAgICAgICAgIC8vIGFkZCBhbGwgaW5wdXQgZGF0YXNldCBpbnRvIG9uZSBhcnJheSAocHVibGljIGdlbmVyYWxEYXRhKVxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5nZW5lcmFsRDNJbnB1dC5kYXRhc2V0cy5mb3JFYWNoKChkcywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXNldDogRDNHZW5lcmFsRGF0YXNldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZHMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoZHMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMgPSB0aGlzLmdlbmVyYWxEM0lucHV0LnBsb3RPcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy5kYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYXhpc09wdGlvbnMueFJhbmdlID0gdGhpcy5nZXRSYW5nZShkYXRhLCAneCcpO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55UmFuZ2UgPSB0aGlzLmdldFJhbmdlKGRhdGEsICd5Jyk7XG5cbiAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsIGZ1bmN0aW9ucyByZWxhdGVkIHRvIHBsb3R0aW5nIGEgZGF0YXNldCBpbiBhIGdyYXBoLlxuICAgICAqL1xuICAgIHByaXZhdGUgcGxvdEdyYXBoKCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy55U2NhbGUgPSB0aGlzLmRyYXdZYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5heGlzT3B0aW9ucy54U2NhbGUgPSB0aGlzLmRyYXdYYXhpcyh0aGlzLnBsb3RPcHRpb25zKTtcblxuICAgICAgICAvLyBjcmVhdGUgYmFja2dyb3VuZCBhcyByZWN0YW5nbGUgcHJvdmlkaW5nIHBhbm5pbmdcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsICdiYWNrZ3JvdW5kUmVjdCcpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cblxuICAgICAgICB0aGlzLmZvY3VzRyA9IHRoaXMuZ3JhcGhGb2N1cy5hcHBlbmQoJ2cnKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0ID0gdGhpcy5mb2N1c0cuYXBwZW5kKCdzdmc6cmVjdCcpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHQgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2Zzp0ZXh0Jyk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmFsRGF0YS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3R3JhcGhMaW5lKGRhdGFzZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgICAgICB0aGlzLmNyZWF0ZUhvdmVyaW5nTmV0KHRoaXMuZ2VuZXJhbERhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgeSBheGlzLlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHtEM0dlbmVyYWxEYXRhc2V0fSBPYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdZYXhpcyhvcHRpb25zOiBEM0dlbmVyYWxQbG90T3B0aW9ucykge1xuXG4gICAgICAgIC8vIHNldCByYW5nZSBvZmZzZXQgZm9yIHkgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgeVJhbmdlT2Zmc2V0ID0gMTA7XG4gICAgICAgIGNvbnN0IHlSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueVJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBpZiAoeVJhbmdlLm1heCAhPT0geVJhbmdlLm1pbikge1xuICAgICAgICAgICAgeVJhbmdlT2Zmc2V0ID0gKHlSYW5nZS5tYXggLSB5UmFuZ2UubWluKSAqIDAuMTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5UmFuZ2VPZmZzZXQgPSB5UmFuZ2UubWluICogMC4xMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3lSYW5nZS5taW4gLSB5UmFuZ2VPZmZzZXQsIHlSYW5nZS5tYXggKyB5UmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGNvbnN0IHlBeGlzR2VuID0gZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrcyg1KTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpc1xuICAgICAgICBjb25zdCB5QXhpcyA9IHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAneSBheGlzJylcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzR2VuKTtcblxuICAgICAgICAvLyBkcmF3IHkgYXhpcyBsYWJlbFxuICAgICAgICBjb25zdCB5QXhpc0xhYmVsID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgdGhpcy5oZWlnaHQgLyAyICsgJylyb3RhdGUoLTkwKScpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnMWVtJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5QXhpc1RleHRMYWJlbCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQnLCAnMThweCB0aW1lcycpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy55bGFiZWwpO1xuXG4gICAgICAgIC8vIHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcueUF4aXNUZXh0TGFiZWwnKVxuICAgICAgICB0aGlzLmJ1ZmZlciA9IHlBeGlzLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyAxMCArIHRoaXMuZ2V0RGltZW5zaW9ucyh5QXhpc0xhYmVsLm5vZGUoKSkuaDtcblxuICAgICAgICB5QXhpcy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJyk7XG5cbiAgICAgICAgLy8gZHJhdyB5IGdyaWQgbGluZXNcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLmJ1ZmZlciArICcsIDApJylcbiAgICAgICAgICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHlTY2FsZSlcbiAgICAgICAgICAgICAgICAudGlja3MoNSlcbiAgICAgICAgICAgICAgICAudGlja1NpemUoLXRoaXMud2lkdGggKyB0aGlzLmJ1ZmZlcilcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHlTY2FsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHggYXhpcy5cbiAgICAgKiBAcGFyYW0gZGF0YXNldCB7RDNHZW5lcmFsRGF0YXNldH0gT2JqZWN0IHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRhdGFzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3WGF4aXMob3B0aW9uczogRDNHZW5lcmFsUGxvdE9wdGlvbnMpIHtcbiAgICAgICAgLy8gc2V0IHJhbmdlIG9mZnNldCBmb3IgeCBheGlzIHNjYWxlXG4gICAgICAgIGNvbnN0IHhSYW5nZSA9IHRoaXMuYXhpc09wdGlvbnMueFJhbmdlO1xuICAgICAgICAvLyBjaGVjayBmb3IgbXVsdGlwbGUgZGF0YXBvaW50c1xuICAgICAgICBsZXQgdGlja3MgPSAxMDtcbiAgICAgICAgbGV0IHhSYW5nZU9mZnNldCA9ICh4UmFuZ2UubWF4IC0geFJhbmdlLm1pbikgKiAwLjEwO1xuICAgICAgICBpZiAoeFJhbmdlLm1heCA9PT0geFJhbmdlLm1pbikge1xuICAgICAgICAgICAgdGlja3MgPSA1O1xuICAgICAgICAgICAgeFJhbmdlT2Zmc2V0ID0geFJhbmdlLm1pbiAqIDAuMTA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFt4UmFuZ2UubWluIC0geFJhbmdlT2Zmc2V0LCB4UmFuZ2UubWF4ICsgeFJhbmdlT2Zmc2V0XSlcbiAgICAgICAgICAgIC5yYW5nZShbdGhpcy5idWZmZXIsIHRoaXMud2lkdGhdKTtcblxuICAgICAgICBjb25zdCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeFNjYWxlKVxuICAgICAgICAgICAgLnRpY2tzKHRpY2tzKVxuICAgICAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZC52YWx1ZU9mKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gJy4lTCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRTZWNvbmQgPSAnOiVTJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1pbnV0ZSA9ICclSDolTScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRIb3VyID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdERheSA9ICclYiAlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRXZWVrID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE1vbnRoID0gJyVCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFllYXIgPSAnJVknO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGQzLnRpbWVTZWNvbmQoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZU1pbnV0ZShkYXRlKSA8IGRhdGUgPyBmb3JtYXRTZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVIb3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVEYXkoZGF0ZSkgPCBkYXRlID8gZm9ybWF0SG91clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTW9udGgoZGF0ZSkgPCBkYXRlID8gKGQzLnRpbWVXZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lWWVhcihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdFllYXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlLmdldFRpbWVMb2NhbGUoZm9ybWF0KShuZXcgRGF0ZShkLnZhbHVlT2YoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJyArIGQudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKTtcblxuICAgICAgICAvLyBkcmF3IHggZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgdGhpcy5oZWlnaHQgKyAnKScpXG4gICAgICAgICAgICAuY2FsbCh4QXhpc1xuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLnRpY2tGb3JtYXQoKCkgPT4gJycpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGRyYXcgdXBwZXIgYXhpcyBhcyBib3JkZXJcbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc1RvcCh4U2NhbGUpXG4gICAgICAgICAgICAgICAgLnRpY2tzKDApXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKDApKTtcblxuICAgICAgICAvLyBkcmF3IHggYXhpcyBsYWJlbFxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigneCcsICh0aGlzLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi5ib3R0b20gLSA1KVxuICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgLnRleHQob3B0aW9ucy54bGFiZWwpO1xuXG4gICAgICAgIHJldHVybiB4U2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB0aGUgbGluZSBvZiB0aGUgZ3JhcGguXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0QzR2VuZXJhbERhdGFzZXR9IE9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkYXRzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3R3JhcGhMaW5lKGRhdGFzZXQ6IEQzR2VuZXJhbERhdGFzZXQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGdyYWggbGluZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5ncmFwaEJvZHkgPSB0aGlzLmdyYXBoXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCAndXJsKCMnICsgZGF0YXNldC5pZCArICcpJyk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGxpbmUgd2l0aCBkYXRhc2V0XG4gICAgICAgIGxldCBncmFwaExpbmUgPSBkMy5saW5lPEQzR2VuZXJhbERhdGFQb2ludD4oKVxuICAgICAgICAgICAgLmRlZmluZWQoZCA9PiAoIWlzTmFOKGQueCkgJiYgIWlzTmFOKGQueSkpKVxuICAgICAgICAgICAgLngoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnhTY2FsZShkLngpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeENvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnhDb29yZCA9IHhDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5Q29vcmQgPSB0aGlzLmF4aXNPcHRpb25zLnlTY2FsZShkLnkpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeUNvb3JkKSkge1xuICAgICAgICAgICAgICAgICAgICBkLnlDb29yZCA9IHlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlDb29yZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmN1cnZlKGQzLmN1cnZlTGluZWFyKTtcblxuICAgICAgICB0aGlzLmdyYXBoQm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgLmRhdHVtKGRhdGFzZXQuZGF0YSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLmxpbmVXaWR0aCA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5saW5lcy5saW5lV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignZCcsIGdyYXBoTGluZSk7XG5cbiAgICAgICAgLy8gZHJhdyBjaXJjbGVzIGFyb3VuZCBkYXRhcG9pbnRzXG4gICAgICAgIHRoaXMuZ3JhcGhCb2R5LnNlbGVjdEFsbCgnLmdyYXBoRG90cycpXG4gICAgICAgICAgICAuZGF0YShkYXRhc2V0LmRhdGEuZmlsdGVyKChkKSA9PiAhaXNOYU4oZC55KSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JhcGhEb3RzJylcbiAgICAgICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RvdC0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJy0nICsgZGF0YXNldC5pZCArICcnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5jb2xvciA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGguY29sb3IgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignY3gnLCBncmFwaExpbmUueCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgZ3JhcGhMaW5lLnkoKSlcbiAgICAgICAgICAgIC5hdHRyKCdyJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV0IG9mIHBvbHlnb25zIG92ZXJsYXlpbmcgdGhlIGdyYXBocyB0byBkaXZpZGUgc2VjdGlvbnMgZm9yIGhvdmVyaW5nLlxuICAgICAqIEBwYXJhbSBpbnB1dERhdGEge0QzR2VuZXJhbERhdGFzZXRbXX0gZGF0YSBjb250YWluaW5nIGFuIGFycmF5IHdpdGggYWxsIGRhdGFwb2ludHMgYW5kIGFuIGlkIGZvciBlYWNoIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUhvdmVyaW5nTmV0KGlucHV0RGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgZGF0YSA9IGlucHV0RGF0YS5tYXAoZnVuY3Rpb24gKHNlcmllcywgaSkge1xuICAgICAgICAgICAgc2VyaWVzLmRhdGEgPSBzZXJpZXMuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgcG9pbnQuc2VyaWVzID0gaTtcbiAgICAgICAgICAgICAgICBwb2ludFswXSA9IHBvaW50Lng7XG4gICAgICAgICAgICAgICAgcG9pbnRbMV0gPSBwb2ludC55O1xuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlcmllcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHggPSBkMy5zY2FsZUxpbmVhcigpLFxuICAgICAgICAgICAgeSA9IGQzLnNjYWxlTGluZWFyKCk7XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBkMy5tZXJnZShkYXRhLm1hcChmdW5jdGlvbiAoY2wsIGxpbmVJbmRleCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjbCA9IHsgZGF0YTogW3swOiBudW1iZXIsIDE6IG51bWJlciwgc2VyaWVzOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyfSwge30sIC4uLl0sIGlkOiBudW1iZXIgfVxuICAgICAgICAgICAgICogcG9pbnQgPSBlYWNoIHBvaW50IGluIGEgZGF0YXNldFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBvdXRwdXRMaW5lID0gY2wuZGF0YS5tYXAoZnVuY3Rpb24gKHBvaW50LCBwb2ludEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dFBvaW50ID0gW3gocG9pbnQueENvb3JkKSwgeShwb2ludC55Q29vcmQpLCBsaW5lSW5kZXgsIHBvaW50SW5kZXgsIHBvaW50LCBjbF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFBvaW50OyAvLyBhZGRpbmcgc2VyaWVzIGluZGV4IHRvIHBvaW50IGJlY2F1c2UgZGF0YSBpcyBiZWluZyBmbGF0dGVuZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dExpbmU7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuYnVmZmVyLCAvLyArIHRoaXMubWFyZ2luLmxlZnQsXG4gICAgICAgICAgICB0b3AgPSB0aGlzLm1hcmdpbi50b3AsXG4gICAgICAgICAgICByaWdodCA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIsIC8vICsgdGhpcy5tYXJnaW4ubGVmdCxcbiAgICAgICAgICAgIGJvdHRvbSA9IHRoaXMubWFyZ2luLnRvcCArIHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodDtcblxuICAgICAgICAvLyBmaWx0ZXIgZGF0YXNldCAtIGRlbGV0ZSBhbGwgZW50cmllcyB0aGF0IGFyZSBOYU5cbiAgICAgICAgbGV0IHZlcnRpY2VzRmlsdGVyZWQgPSB2ZXJ0aWNlcy5maWx0ZXIoZCA9PiAhaXNOYU4oZFswXSkgfHwgIWlzTmFOKGRbMV0pKTtcbiAgICAgICAgY29uc3QgRGlmZnZvcm9ub2kgPSBkMy52b3Jvbm9pKClcbiAgICAgICAgICAgIC5leHRlbnQoW1tsZWZ0LCB0b3BdLCBbcmlnaHQsIGJvdHRvbV1dKTtcbiAgICAgICAgbGV0IGRpZmZWb3Jvbm9pMiA9IERpZmZ2b3Jvbm9pLnBvbHlnb25zKHZlcnRpY2VzRmlsdGVyZWQpO1xuXG4gICAgICAgIGxldCB3cmFwID0gdGhpcy5yYXdTdmcuc2VsZWN0QWxsKCdnLmQzbGluZScpLmRhdGEoW3ZlcnRpY2VzRmlsdGVyZWRdKTtcbiAgICAgICAgbGV0IGdFbnRlciA9IHdyYXAuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdkM2xpbmUnKS5hcHBlbmQoJ2cnKTtcbiAgICAgICAgZ0VudGVyLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BvaW50LXBhdGhzJyk7XG5cbiAgICAgICAgLy8gdG8gYXZvaWQgbm8gaG92ZXJpbmcgZm9yIG9ubHkgb25lIGRhdGFzZXQgd2l0aG91dCBpbnRlcmFjdGlvbiB0aGUgZm9sbG93aW5nIGxpbmVzIGFyZSBkb3VibGVkXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgdGhlIHBhdGhzLCB3aGljaCBjYW4gYmUgdXBkYXRlZCBsYXRlciBvbiAoYnkgdGhlICdleGl0KCkucmVtb3ZlKCknIGZ1bmN0aW9uIGNhbGxzKVxuICAgICAgICBsZXQgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcG9pbnRQYXRocyA9IHdyYXAuc2VsZWN0KCcucG9pbnQtcGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoZGlmZlZvcm9ub2kyKTtcbiAgICAgICAgcG9pbnRQYXRoc1xuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdwYXRoLScgKyBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHBvaW50UGF0aHMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBwb2ludFBhdGhzXG4gICAgICAgICAgICAuYXR0cignY2xpcC1wYXRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkLmRhdGFbNF0ueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGQuZGF0YVs0XS54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VybCgjY2xpcC0nICsgZC5kYXRhWzVdLmlkICsgJy0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ00nICsgZC5qb2luKCcgJykgKyAnWic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbi5sZWZ0ICsgJywgJyArIHRoaXMubWFyZ2luLnRvcCArICcpJylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb29yZHMgPSBkMy5tb3VzZSh0aGlzLmJhY2tncm91bmQubm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSBkLmRhdGFbNF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gdGhpcy5jYWxjRGlzdGFuY2VIb3ZlcmluZyhkYXRhc2V0LCBjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEJhY2sgPSB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb29yZHNbMF0gPj0gMCAmJiBjb29yZHNbMF0gPD0gcmVjdEJhY2sud2lkdGggJiYgY29vcmRzWzFdID49IDAgJiYgY29vcmRzWzFdIDw9IHJlY3RCYWNrLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcjZG90LScgKyBkYXRhc2V0eENvb3JkU3BsaXQgKyAnLScgKyBkLmRhdGFbNV0uaWQgKyAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwLjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgKHJhZGl1cyAqIDIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLnBsb3RPcHRpb25zLmRhdGUgPyAneDogJyArIG1vbWVudChkYXRhc2V0LngpLmZvcm1hdCgnREQuTU0uWVkgSEg6bW0nKSArICcgeTogJyArIGRhdGFzZXQueSA6ICd4OiAnICsgZGF0YXNldC54ICsgJyB5OiAnICsgZGF0YXNldC55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkb3RMYWJlbCA9IHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdExhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgY29sb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9uTGVmdFNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgdGhpcy5idWZmZXIpIC8gMiA+IGNvb3Jkc1swXSkgeyBvbkxlZnRTaWRlID0gdHJ1ZTsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0WTogbnVtYmVyID0gZGF0YXNldC55Q29vcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RXOiBudW1iZXIgPSB0aGlzLmdldERpbWVuc2lvbnMoZG90TGFiZWwubm9kZSgpKS53ICsgODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdEg6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLmg7IC8vICsgNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0WCA9IGRhdGFzZXQueENvb3JkIC0gMTUgLSByZWN0VztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdFkgPSBkYXRhc2V0LnlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvb3Jkc1sxXSArIHJlY3RIICsgNCkgPiB0aGlzLmJhY2tncm91bmQubm9kZSgpLmdldEJCb3goKS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBsYWJlbCBiZWxvdyB4IGF4aXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RyYW5zbGF0ZSBsYWJlbCB0byBhIGhpZ2hlciBwbGFjZS4gLSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGhvdmVyaW5nIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRvdFJlY3RhbmdsZSA9IHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VIb3ZlckRvdFJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHJlY3RXKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcmVjdEgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyByZWN0WCArICcsICcgKyByZWN0WSArICcpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSBkYXRhc2V0LnhDb29yZCArIDQgKyAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb25MZWZ0U2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFggPSBkYXRhc2V0LnhDb29yZCAtIHJlY3RXICsgNCAtIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFkgPSBkYXRhc2V0LnlDb29yZCArIHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RSZWN0YW5nbGUubm9kZSgpKS5oIC0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGxhYmVsWCArICcsICcgKyBsYWJlbFkgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5oaWdobGlnaHQgaG92ZXJlZCBkb3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldCA9IGQuZGF0YVs0XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmxpbmVzLnBvaW50UmFkaXVzIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmxpbmVzLnBvaW50UmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldHhDb29yZFNwbGl0ID0gZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJy0nICsgZGF0YXNldC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCByYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGFiZWwgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBtb3VzZSBhbmQgYSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHt9IENvb3JkaW5hdGVzIG9mIHRoZSBob3ZlcmVkIHBvaW50LlxuICAgICAqIEBwYXJhbSBjb29yZHMge30gQ29vcmRpbmF0ZXMgb2YgdGhlIG1vdXNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0Rpc3RhbmNlSG92ZXJpbmcoZGF0YXNldDogRDNHZW5lcmFsRGF0YVBvaW50LCBjb29yZHM6IFtudW1iZXIsIG51bWJlcl0pOiBudW1iZXIge1xuICAgICAgICBsZXQgbVggPSBjb29yZHNbMF0gKyB0aGlzLmJ1ZmZlcixcbiAgICAgICAgICAgIG1ZID0gY29vcmRzWzFdLCAvLyArIHRoaXMubWFyZ2luLnRvcCxcbiAgICAgICAgICAgIHBYID0gZGF0YXNldC54Q29vcmQsXG4gICAgICAgICAgICBwWSA9IGRhdGFzZXQueUNvb3JkO1xuICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgYmV0d2VlbiBwb2ludCBhbmQgbW91c2Ugd2hlbiBob3ZlcmluZ1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChwWCAtIG1YKSwgMikgKyBNYXRoLnBvdygocFkgLSBtWSksIDIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmdlKGRhdGE6IEQzR2VuZXJhbERhdGFQb2ludFtdLCBzZWxlY3Rvcjogc3RyaW5nKTogUmFuZ2Uge1xuICAgICAgICAvLyByYW5nZSBmb3IgYXhpcyBzY2FsZVxuICAgICAgICBsZXQgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gPSBkMy5leHRlbnQoZDMudmFsdWVzKGRhdGEubWFwKChkKSA9PiB7XG4gICAgICAgICAgICBpZiAoKCFpc05hTihkLngpICYmICFpc05hTihkLnkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkW3NlbGVjdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpKTtcbiAgICAgICAgcmV0dXJuIHsgbWluOiByYW5nZVswXSwgbWF4OiByYW5nZVsxXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBncmFwaCBkaWFncmFtLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5kM0VsZW0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXdTdmcubm9kZSgpLndpZHRoLmJhc2VWYWwudmFsdWUgLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBib3VuZGluZ3Mgb2YgYSBodG1sIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVsIHtPYmplY3R9IE9iamVjdCBvZiB0aGUgaHRtbCBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9ucyhlbDogYW55KTogeyB3OiBudW1iZXIsIGg6IG51bWJlciB9IHtcbiAgICAgICAgbGV0IHcgPSAwO1xuICAgICAgICBsZXQgaCA9IDA7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGVsLmdldEJCb3goKTtcbiAgICAgICAgICAgIHcgPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgICAgaCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBnZXREaW1lbnNpb25zKCkgJyArIGVsICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBoXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXX0=