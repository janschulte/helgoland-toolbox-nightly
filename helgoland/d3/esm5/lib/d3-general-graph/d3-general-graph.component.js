/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
import moment from 'moment';
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
export { D3GeneralGraphComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtZ2VuZXJhbC1ncmFwaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2QzLWdlbmVyYWwtZ3JhcGgvZDMtZ2VuZXJhbC1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFVekIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDOztJQXdEeEIsaUNBQ2MsdUJBQWtEO1FBQWxELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBMkI7MkJBeEN0QixFQUFFOzJCQUNBLEVBQUU7MkJBQ0Y7WUFDeEMsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLElBQUksRUFBRSxLQUFLO1NBQ2Q7bUNBRW9EO1lBQ2pELEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxDQUFDO2dCQUNaLFdBQVcsRUFBRSxDQUFDO2FBQ2pCO1NBQ0o7c0JBZWdCLENBQUM7NkJBQ00sQ0FBQztzQkFFUjtZQUNiLEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLElBQUksRUFBRSxFQUFFO1NBQ1g7S0FJSTs7OztJQUVMLGlEQUFlOzs7SUFBZjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQzthQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDckIsSUFBSSxDQUFDLFFB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QUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDTCxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDckIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDekI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsTUFBTSxDQUFDO1lBQ0gsQ0FBQyxHQUFBO1lBQ0QsQ0FBQyxHQUFBO1NBQ0osQ0FBQzs7O2dCQXJqQlQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSx1Q0FDYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyw4a0JBQThrQixDQUFDO2lCQUMzbEI7Ozs7Z0JBUlEseUJBQXlCOzs7eUJBVzdCLFNBQVMsU0FBQyxXQUFXO2lDQUdyQixLQUFLOztrQ0FoQ1Y7O1NBMkJhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHtcbiAgICBEM0dlbmVyYWxEYXRhUG9pbnQsXG4gICAgRDNHZW5lcmFsRGF0YXNldCxcbiAgICBEM0dlbmVyYWxJbnB1dCxcbiAgICBEM0dlbmVyYWxQbG90T3B0aW9ucyxcbiAgICBEM0dlbmVyYWxBeGlzT3B0aW9ucyxcbiAgICBSYW5nZSxcbiAgICBEM0dlbmVyYWxHcmFwaE9wdGlvbnNcbn0gZnJvbSAnLi4vbW9kZWwvZDMtZ2VuZXJhbCc7XG5pbXBvcnQgeyBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZDMtZ2VuZXJhbC1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZDNcIiAjZDNnZW5lcmFsPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLmQze2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kMyAuZ3JpZCAudGljayBsaW5le3N0cm9rZTojZDNkM2QzO3N0cm9rZS1vcGFjaXR5Oi43O3NoYXBlLXJlbmRlcmluZzpjcmlzcEVkZ2VzfS5kMyAueHtmaWxsOm9yYW5nZTtmaWxsLW9wYWNpdHk6LjR9LmQzIC54IC50aWNre3N0cm9rZTojMDBmO3N0cm9rZS13aWR0aDoxMHB4fS5kMyAueCAudGljayBsaW5le3N0cm9rZTpyZWQ7c3Ryb2tlLXdpZHRoOjE1cHh9LmQzIC5heGlze2ZpbGw6b3JhbmdlO2ZpbGwtb3BhY2l0eTouNH0uZDMgLmF4aXMgLnRpY2t7c3Ryb2tlOiMwMGY7c3Ryb2tlLXdpZHRoOjEwcHh9LmQzIC5heGlzIC50aWNrIGxpbmV7c3Ryb2tlOiNmZmEwN2E7c3Ryb2tlLXdpZHRoOjE1cHh9LmQzIC5ncmFwaERvdHN7c3Ryb2tlLXdpZHRoOjA7c3Ryb2tlLW9wYWNpdHk6MX0uZDMgLmdyYXBoRG90cyAuaG92ZXJ7c3Ryb2tlLXdpZHRoOjIwcHg7c3Ryb2tlLW9wYWNpdHk6LjV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRDNHZW5lcmFsR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQFZpZXdDaGlsZCgnZDNnZW5lcmFsJylcbiAgICBwdWJsaWMgZDNFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2VuZXJhbEQzSW5wdXQ6IEQzR2VuZXJhbElucHV0O1xuXG4gICAgLy8gY29tcG9uZW5udCBkYXRhIHZhcmlhYmxlc1xuICAgIHByaXZhdGUgZ2VuZXJhbERhdGE6IEQzR2VuZXJhbERhdGFzZXRbXSA9IFtdO1xuICAgIHByaXZhdGUgYXhpc09wdGlvbnM6IEQzR2VuZXJhbEF4aXNPcHRpb25zID0ge307XG4gICAgcHJpdmF0ZSBwbG90T3B0aW9uczogRDNHZW5lcmFsUGxvdE9wdGlvbnMgPSB7XG4gICAgICAgIHhsYWJlbDogJ3gnLFxuICAgICAgICB5bGFiZWw6ICd5JyxcbiAgICAgICAgZGF0ZTogZmFsc2VcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0R3JhcGhPcHRpb25zOiBEM0dlbmVyYWxHcmFwaE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgICAgICAgIHBvaW50UmFkaXVzOiAyXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZ3JhcGggY29tcG9uZW50c1xuICAgIHByaXZhdGUgcmF3U3ZnOiBhbnk7XG4gICAgcHJpdmF0ZSBncmFwaDogYW55O1xuICAgIHByaXZhdGUgZ3JhcGhCb2R5OiBhbnk7XG4gICAgcHJpdmF0ZSBiYWNrZ3JvdW5kOiBhbnk7XG4gICAgcHJpdmF0ZSBncmFwaEZvY3VzOiBhbnk7XG4gICAgcHJpdmF0ZSBmb2N1c0c6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodFJlY3Q6IGFueTtcbiAgICBwcml2YXRlIGhpZ2hsaWdodFRleHQ6IGFueTtcblxuICAgIC8vIGNvbXBvbmVudCBzZXR0aW5nc1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgYnVmZmVyID0gMDtcbiAgICBwcml2YXRlIG1heExhYmVsd2lkdGggPSAwO1xuXG4gICAgcHJpdmF0ZSBtYXJnaW4gPSB7XG4gICAgICAgIHRvcDogMTAsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgYm90dG9tOiA0MCxcbiAgICAgICAgbGVmdDogMTBcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0aW1lRm9ybWF0TG9jYWxlU2VydmljZTogRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMucmF3U3ZnID0gZDMuc2VsZWN0KHRoaXMuZDNFbGVtLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHRoaXMucmF3U3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbi5sZWZ0ICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLmdyYXBoRm9jdXMgPSB0aGlzLnJhd1N2Z1xuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1heExhYmVsd2lkdGgpICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuXG4gICAgICAgIHRoaXMucHJlcGFyZURhdGEoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmdlbmVyYWxEM0lucHV0ICYmIHRoaXMucmF3U3ZnKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYWxEM0lucHV0ID0gY2hhbmdlcy5nZW5lcmFsRDNJbnB1dC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVEYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5nZW5lcmFsRDNJbnB1dCkge1xuICAgICAgICAgICAgLy8gYWRkIGFsbCBpbnB1dCBkYXRhc2V0IGludG8gb25lIGFycmF5IChwdWJsaWMgZ2VuZXJhbERhdGEpXG4gICAgICAgICAgICBsZXQgZGF0YSA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLmdlbmVyYWxEM0lucHV0LmRhdGFzZXRzLmZvckVhY2goKGRzLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0OiBEM0dlbmVyYWxEYXRhc2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkcy5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBpZDogaW5kZXhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChkcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYWxEYXRhLnB1c2goZGF0YXNldCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucyA9IHRoaXMuZ2VuZXJhbEQzSW5wdXQucGxvdE9wdGlvbnM7XG4gICAgICAgICAgICB0aGlzLmF4aXNPcHRpb25zLmRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5heGlzT3B0aW9ucy54UmFuZ2UgPSB0aGlzLmdldFJhbmdlKGRhdGEsICd4Jyk7XG4gICAgICAgICAgICB0aGlzLmF4aXNPcHRpb25zLnlSYW5nZSA9IHRoaXMuZ2V0UmFuZ2UoZGF0YSwgJ3knKTtcblxuICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNhbGwgZnVuY3Rpb25zIHJlbGF0ZWQgdG8gcGxvdHRpbmcgYSBkYXRhc2V0IGluIGEgZ3JhcGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBwbG90R3JhcGgoKSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FsY3VsYXRlV2lkdGgoKTtcblxuICAgICAgICB0aGlzLmF4aXNPcHRpb25zLnlTY2FsZSA9IHRoaXMuZHJhd1lheGlzKHRoaXMucGxvdE9wdGlvbnMpO1xuICAgICAgICB0aGlzLmF4aXNPcHRpb25zLnhTY2FsZSA9IHRoaXMuZHJhd1hheGlzKHRoaXMucGxvdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBiYWNrZ3JvdW5kIGFzIHJlY3RhbmdsZSBwcm92aWRpbmcgcGFubmluZ1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOnJlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAtIHRoaXMuYnVmZmVyKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2JhY2tncm91bmRSZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdub25lJylcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyICsgJywgMCknKTtcblxuXG4gICAgICAgIHRoaXMuZm9jdXNHID0gdGhpcy5ncmFwaEZvY3VzLmFwcGVuZCgnZycpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFJlY3QgPSB0aGlzLmZvY3VzRy5hcHBlbmQoJ3N2ZzpyZWN0Jyk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dCA9IHRoaXMuZm9jdXNHLmFwcGVuZCgnc3ZnOnRleHQnKTtcblxuICAgICAgICB0aGlzLmdlbmVyYWxEYXRhLmZvckVhY2goZGF0YXNldCA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdHcmFwaExpbmUoZGF0YXNldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlSG92ZXJpbmdOZXQodGhpcy5nZW5lcmFsRGF0YSk7XG4gICAgICAgIHRoaXMuY3JlYXRlSG92ZXJpbmdOZXQodGhpcy5nZW5lcmFsRGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gZHJhdyB5IGF4aXMuXG4gICAgICogQHBhcmFtIGRhdGFzZXQge0QzR2VuZXJhbERhdGFzZXR9IE9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkYXRhc2V0LlxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd1lheGlzKG9wdGlvbnM6IEQzR2VuZXJhbFBsb3RPcHRpb25zKSB7XG5cbiAgICAgICAgLy8gc2V0IHJhbmdlIG9mZnNldCBmb3IgeSBheGlzIHNjYWxlXG4gICAgICAgIGxldCB5UmFuZ2VPZmZzZXQgPSAxMDtcbiAgICAgICAgY29uc3QgeVJhbmdlID0gdGhpcy5heGlzT3B0aW9ucy55UmFuZ2U7XG4gICAgICAgIC8vIGNoZWNrIGZvciBtdWx0aXBsZSBkYXRhcG9pbnRzXG4gICAgICAgIGlmICh5UmFuZ2UubWF4ICE9PSB5UmFuZ2UubWluKSB7XG4gICAgICAgICAgICB5UmFuZ2VPZmZzZXQgPSAoeVJhbmdlLm1heCAtIHlSYW5nZS5taW4pICogMC4xMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHlSYW5nZU9mZnNldCA9IHlSYW5nZS5taW4gKiAwLjEwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbeVJhbmdlLm1pbiAtIHlSYW5nZU9mZnNldCwgeVJhbmdlLm1heCArIHlSYW5nZU9mZnNldF0pXG4gICAgICAgICAgICAucmFuZ2UoW3RoaXMuaGVpZ2h0LCAwXSk7XG5cbiAgICAgICAgY29uc3QgeUF4aXNHZW4gPSBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tzKDUpO1xuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzXG4gICAgICAgIGNvbnN0IHlBeGlzID0gdGhpcy5ncmFwaC5hcHBlbmQoJ3N2ZzpnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd5IGF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoeUF4aXNHZW4pO1xuXG4gICAgICAgIC8vIGRyYXcgeSBheGlzIGxhYmVsXG4gICAgICAgIGNvbnN0IHlBeGlzTGFiZWwgPSB0aGlzLmdyYXBoLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAvLyAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtOTApJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsICcgKyB0aGlzLmhlaWdodCAvIDIgKyAnKXJvdGF0ZSgtOTApJylcbiAgICAgICAgICAgIC5hdHRyKCdkeScsICcxZW0nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3lBeGlzVGV4dExhYmVsJylcbiAgICAgICAgICAgIC5zdHlsZSgnZm9udCcsICcxOHB4IHRpbWVzJylcbiAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdibGFjaycpXG4gICAgICAgICAgICAudGV4dChvcHRpb25zLnlsYWJlbCk7XG5cbiAgICAgICAgLy8gdGhpcy5ncmFwaC5zZWxlY3RBbGwoJy55QXhpc1RleHRMYWJlbCcpXG4gICAgICAgIHRoaXMuYnVmZmVyID0geUF4aXMubm9kZSgpLmdldEJCb3goKS53aWR0aCArIDEwICsgdGhpcy5nZXREaW1lbnNpb25zKHlBeGlzTGFiZWwubm9kZSgpKS5oO1xuXG4gICAgICAgIHlBeGlzLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyICsgJywgMCknKTtcblxuICAgICAgICAvLyBkcmF3IHkgZ3JpZCBsaW5lc1xuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMuYnVmZmVyICsgJywgMCknKVxuICAgICAgICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeVNjYWxlKVxuICAgICAgICAgICAgICAgIC50aWNrcyg1KVxuICAgICAgICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy53aWR0aCArIHRoaXMuYnVmZmVyKVxuICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KCgpID0+ICcnKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4geVNjYWxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGRyYXcgeCBheGlzLlxuICAgICAqIEBwYXJhbSBkYXRhc2V0IHtEM0dlbmVyYWxEYXRhc2V0fSBPYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZGF0YXNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdYYXhpcyhvcHRpb25zOiBEM0dlbmVyYWxQbG90T3B0aW9ucykge1xuICAgICAgICAvLyBzZXQgcmFuZ2Ugb2Zmc2V0IGZvciB4IGF4aXMgc2NhbGVcbiAgICAgICAgY29uc3QgeFJhbmdlID0gdGhpcy5heGlzT3B0aW9ucy54UmFuZ2U7XG4gICAgICAgIC8vIGNoZWNrIGZvciBtdWx0aXBsZSBkYXRhcG9pbnRzXG4gICAgICAgIGxldCB0aWNrcyA9IDEwO1xuICAgICAgICBsZXQgeFJhbmdlT2Zmc2V0ID0gKHhSYW5nZS5tYXggLSB4UmFuZ2UubWluKSAqIDAuMTA7XG4gICAgICAgIGlmICh4UmFuZ2UubWF4ID09PSB4UmFuZ2UubWluKSB7XG4gICAgICAgICAgICB0aWNrcyA9IDU7XG4gICAgICAgICAgICB4UmFuZ2VPZmZzZXQgPSB4UmFuZ2UubWluICogMC4xMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oW3hSYW5nZS5taW4gLSB4UmFuZ2VPZmZzZXQsIHhSYW5nZS5tYXggKyB4UmFuZ2VPZmZzZXRdKVxuICAgICAgICAgICAgLnJhbmdlKFt0aGlzLmJ1ZmZlciwgdGhpcy53aWR0aF0pO1xuXG4gICAgICAgIGNvbnN0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgICAgICAgICAudGlja3ModGlja3MpXG4gICAgICAgICAgICAudGlja0Zvcm1hdChkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkLnZhbHVlT2YoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0TWlsbGlzZWNvbmQgPSAnLiVMJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFNlY29uZCA9ICc6JVMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0TWludXRlID0gJyVIOiVNJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdEhvdXIgPSAnJUg6JU0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0RGF5ID0gJyViICVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdFdlZWsgPSAnJWIgJWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0TW9udGggPSAnJUInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0WWVhciA9ICclWSc7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ID0gZDMudGltZVNlY29uZChkYXRlKSA8IGRhdGUgPyBmb3JtYXRNaWxsaXNlY29uZFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkMy50aW1lTWludXRlKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdFNlY29uZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZUhvdXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWludXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZDMudGltZURheShkYXRlKSA8IGRhdGUgPyBmb3JtYXRIb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVNb250aChkYXRlKSA8IGRhdGUgPyAoZDMudGltZVdlZWsoZGF0ZSkgPCBkYXRlID8gZm9ybWF0RGF5IDogZm9ybWF0V2VlaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGQzLnRpbWVZZWFyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZm9ybWF0WWVhcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGltZUZvcm1hdExvY2FsZVNlcnZpY2UuZ2V0VGltZUxvY2FsZShmb3JtYXQpKG5ldyBEYXRlKGQudmFsdWVPZigpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnICsgZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ncmFwaC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpO1xuXG4gICAgICAgIC8vIGRyYXcgeCBncmlkIGxpbmVzXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCdzdmc6ZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmhlaWdodCArICcpJylcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzXG4gICAgICAgICAgICAgICAgLnRpY2tTaXplKC10aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdCgoKSA9PiAnJylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gZHJhdyB1cHBlciBheGlzIGFzIGJvcmRlclxuICAgICAgICB0aGlzLmdyYXBoLmFwcGVuZCgnc3ZnOmcnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3ggYXhpcycpXG4gICAgICAgICAgICAuY2FsbChkMy5heGlzVG9wKHhTY2FsZSlcbiAgICAgICAgICAgICAgICAudGlja3MoMClcbiAgICAgICAgICAgICAgICAudGlja1NpemUoMCkpO1xuXG4gICAgICAgIC8vIGRyYXcgeCBheGlzIGxhYmVsXG4gICAgICAgIHRoaXMuZ3JhcGguYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKHRoaXMud2lkdGggKyB0aGlzLmJ1ZmZlcikgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLmJvdHRvbSAtIDUpXG4gICAgICAgICAgICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgICAgICAudGV4dChvcHRpb25zLnhsYWJlbCk7XG5cbiAgICAgICAgcmV0dXJuIHhTY2FsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBkcmF3IHRoZSBsaW5lIG9mIHRoZSBncmFwaC5cbiAgICAgKiBAcGFyYW0gZGF0YXNldCB7RDNHZW5lcmFsRGF0YXNldH0gT2JqZWN0IHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRhdHNldC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdHcmFwaExpbmUoZGF0YXNldDogRDNHZW5lcmFsRGF0YXNldCkge1xuICAgICAgICAvLyBjcmVhdGUgZ3JhaCBsaW5lIGNvbXBvbmVudFxuICAgICAgICB0aGlzLmdyYXBoQm9keSA9IHRoaXMuZ3JhcGhcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoIycgKyBkYXRhc2V0LmlkICsgJyknKTtcblxuICAgICAgICAvLyBjcmVhdGUgbGluZSB3aXRoIGRhdGFzZXRcbiAgICAgICAgbGV0IGdyYXBoTGluZSA9IGQzLmxpbmU8RDNHZW5lcmFsRGF0YVBvaW50PigpXG4gICAgICAgICAgICAuZGVmaW5lZChkID0+ICghaXNOYU4oZC54KSAmJiAhaXNOYU4oZC55KSkpXG4gICAgICAgICAgICAueCgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHRoaXMuYXhpc09wdGlvbnMueFNjYWxlKGQueCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih4Q29vcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQueENvb3JkID0geENvb3JkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geENvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueSgoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHlDb29yZCA9IHRoaXMuYXhpc09wdGlvbnMueVNjYWxlKGQueSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih5Q29vcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQueUNvb3JkID0geUNvb3JkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geUNvb3JkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY3VydmUoZDMuY3VydmVMaW5lYXIpO1xuXG4gICAgICAgIHRoaXMuZ3JhcGhCb2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAuZGF0dW0oZGF0YXNldC5kYXRhKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGguY29sb3IgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMuY29sb3IpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMubGluZVdpZHRoIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmxpbmVzLmxpbmVXaWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZ3JhcGhMaW5lKTtcblxuICAgICAgICAvLyBkcmF3IGNpcmNsZXMgYXJvdW5kIGRhdGFwb2ludHNcbiAgICAgICAgdGhpcy5ncmFwaEJvZHkuc2VsZWN0QWxsKCcuZ3JhcGhEb3RzJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGFzZXQuZGF0YS5maWx0ZXIoKGQpID0+ICFpc05hTihkLnkpKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmFwaERvdHMnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXNldHhDb29yZFNwbGl0ID0gZC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJy0nICsgZC54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgIHJldHVybiAnZG90LScgKyBkYXRhc2V0eENvb3JkU3BsaXQgKyAnLScgKyBkYXRhc2V0LmlkICsgJyc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIHRoaXMucGxvdE9wdGlvbnMuZ3JhcGggPyB0aGlzLnBsb3RPcHRpb25zLmdyYXBoLmNvbG9yIDogdGhpcy5kZWZhdWx0R3JhcGhPcHRpb25zLmNvbG9yKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5jb2xvciA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIGdyYXBoTGluZS54KCkpXG4gICAgICAgICAgICAuYXR0cignY3knLCBncmFwaExpbmUueSgpKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5saW5lcy5wb2ludFJhZGl1cyA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5saW5lcy5wb2ludFJhZGl1cyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjcmVhdGUgYSBuZXQgb2YgcG9seWdvbnMgb3ZlcmxheWluZyB0aGUgZ3JhcGhzIHRvIGRpdmlkZSBzZWN0aW9ucyBmb3IgaG92ZXJpbmcuXG4gICAgICogQHBhcmFtIGlucHV0RGF0YSB7RDNHZW5lcmFsRGF0YXNldFtdfSBkYXRhIGNvbnRhaW5pbmcgYW4gYXJyYXkgd2l0aCBhbGwgZGF0YXBvaW50cyBhbmQgYW4gaWQgZm9yIGVhY2ggZGF0YXNldFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlSG92ZXJpbmdOZXQoaW5wdXREYXRhKTogdm9pZCB7XG4gICAgICAgIGxldCBkYXRhID0gaW5wdXREYXRhLm1hcChmdW5jdGlvbiAoc2VyaWVzLCBpKSB7XG4gICAgICAgICAgICBzZXJpZXMuZGF0YSA9IHNlcmllcy5kYXRhLm1hcChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgICAgICBwb2ludC5zZXJpZXMgPSBpO1xuICAgICAgICAgICAgICAgIHBvaW50WzBdID0gcG9pbnQueDtcbiAgICAgICAgICAgICAgICBwb2ludFsxXSA9IHBvaW50Lnk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2VyaWVzO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgeCA9IGQzLnNjYWxlTGluZWFyKCksXG4gICAgICAgICAgICB5ID0gZDMuc2NhbGVMaW5lYXIoKTtcblxuICAgICAgICBsZXQgdmVydGljZXM6IFtudW1iZXIsIG51bWJlcl1bXSA9IGQzLm1lcmdlKGRhdGEubWFwKGZ1bmN0aW9uIChjbCwgbGluZUluZGV4KSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGNsID0geyBkYXRhOiBbezA6IG51bWJlciwgMTogbnVtYmVyLCBzZXJpZXM6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXJ9LCB7fSwgLi4uXSwgaWQ6IG51bWJlciB9XG4gICAgICAgICAgICAgKiBwb2ludCA9IGVhY2ggcG9pbnQgaW4gYSBkYXRhc2V0XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGV0IG91dHB1dExpbmUgPSBjbC5kYXRhLm1hcChmdW5jdGlvbiAocG9pbnQsIHBvaW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3V0cHV0UG9pbnQgPSBbeChwb2ludC54Q29vcmQpLCB5KHBvaW50LnlDb29yZCksIGxpbmVJbmRleCwgcG9pbnRJbmRleCwgcG9pbnQsIGNsXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0UG9pbnQ7IC8vIGFkZGluZyBzZXJpZXMgaW5kZXggdG8gcG9pbnQgYmVjYXVzZSBkYXRhIGlzIGJlaW5nIGZsYXR0ZW5lZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0TGluZTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5idWZmZXIsIC8vICsgdGhpcy5tYXJnaW4ubGVmdCxcbiAgICAgICAgICAgIHRvcCA9IHRoaXMubWFyZ2luLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlciwgLy8gKyB0aGlzLm1hcmdpbi5sZWZ0LFxuICAgICAgICAgICAgYm90dG9tID0gdGhpcy5tYXJnaW4udG9wICsgdGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0O1xuXG4gICAgICAgIC8vIGZpbHRlciBkYXRhc2V0IC0gZGVsZXRlIGFsbCBlbnRyaWVzIHRoYXQgYXJlIE5hTlxuICAgICAgICBsZXQgdmVydGljZXNGaWx0ZXJlZCA9IHZlcnRpY2VzLmZpbHRlcihkID0+ICFpc05hTihkWzBdKSB8fCAhaXNOYU4oZFsxXSkpO1xuICAgICAgICBjb25zdCBEaWZmdm9yb25vaSA9IGQzLnZvcm9ub2koKVxuICAgICAgICAgICAgLmV4dGVudChbW2xlZnQsIHRvcF0sIFtyaWdodCwgYm90dG9tXV0pO1xuICAgICAgICBsZXQgZGlmZlZvcm9ub2kyID0gRGlmZnZvcm9ub2kucG9seWdvbnModmVydGljZXNGaWx0ZXJlZCk7XG5cbiAgICAgICAgbGV0IHdyYXAgPSB0aGlzLnJhd1N2Zy5zZWxlY3RBbGwoJ2cuZDNsaW5lJykuZGF0YShbdmVydGljZXNGaWx0ZXJlZF0pO1xuICAgICAgICBsZXQgZ0VudGVyID0gd3JhcC5lbnRlcigpLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2QzbGluZScpLmFwcGVuZCgnZycpO1xuICAgICAgICBnRW50ZXIuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncG9pbnQtcGF0aHMnKTtcblxuICAgICAgICAvLyB0byBhdm9pZCBubyBob3ZlcmluZyBmb3Igb25seSBvbmUgZGF0YXNldCB3aXRob3V0IGludGVyYWN0aW9uIHRoZSBmb2xsb3dpbmcgbGluZXMgYXJlIGRvdWJsZWRcbiAgICAgICAgLy8gdGhpcyB3aWxsIGNyZWF0ZSB0aGUgcGF0aHMsIHdoaWNoIGNhbiBiZSB1cGRhdGVkIGxhdGVyIG9uIChieSB0aGUgJ2V4aXQoKS5yZW1vdmUoKScgZnVuY3Rpb24gY2FsbHMpXG4gICAgICAgIGxldCBwb2ludFBhdGhzID0gd3JhcC5zZWxlY3QoJy5wb2ludC1wYXRocycpLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YShkaWZmVm9yb25vaTIpO1xuICAgICAgICBwb2ludFBhdGhzXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3BhdGgtJyArIGk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBwb2ludFBhdGhzID0gd3JhcC5zZWxlY3QoJy5wb2ludC1wYXRocycpLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YShkaWZmVm9yb25vaTIpO1xuICAgICAgICBwb2ludFBhdGhzXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3BhdGgtJyArIGk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcG9pbnRQYXRocy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHBvaW50UGF0aHNcbiAgICAgICAgICAgIC5hdHRyKCdjbGlwLXBhdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGQuZGF0YVs0XS54Q29vcmQudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJy0nICsgZC5kYXRhWzRdLnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCNjbGlwLScgKyBkLmRhdGFbNV0uaWQgKyAnLScgKyBkYXRhc2V0eENvb3JkU3BsaXQgKyAnKSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnTScgKyBkLmpvaW4oJyAnKSArICdaJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMubWFyZ2luLmxlZnQgKyAnLCAnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGQzLm1vdXNlKHRoaXMuYmFja2dyb3VuZC5ub2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YXNldCA9IGQuZGF0YVs0XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3QgPSB0aGlzLmNhbGNEaXN0YW5jZUhvdmVyaW5nKGRhdGFzZXQsIGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXMgPSB0aGlzLnBsb3RPcHRpb25zLmdyYXBoID8gdGhpcy5wbG90T3B0aW9ucy5ncmFwaC5saW5lcy5wb2ludFJhZGl1cyA6IHRoaXMuZGVmYXVsdEdyYXBoT3B0aW9ucy5saW5lcy5wb2ludFJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGguY29sb3IgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDw9IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0QmFjayA9IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvb3Jkc1swXSA+PSAwICYmIGNvb3Jkc1swXSA8PSByZWN0QmFjay53aWR0aCAmJiBjb29yZHNbMV0gPj0gMCAmJiBjb29yZHNbMV0gPD0gcmVjdEJhY2suaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGhvdmVyZWQgZG90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGRhdGFzZXQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGRhdGFzZXQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJyNkb3QtJyArIGRhdGFzZXR4Q29vcmRTcGxpdCArICctJyArIGQuZGF0YVs1XS5pZCArICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDAuOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCAocmFkaXVzICogMikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgdGV4dCBmb3IgaG92ZXJpbmcgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRoaXMucGxvdE9wdGlvbnMuZGF0ZSA/ICd4OiAnICsgbW9tZW50KGRhdGFzZXQueCkuZm9ybWF0KCdERC5NTS5ZWSBISDptbScpICsgJyB5OiAnICsgZGF0YXNldC55IDogJ3g6ICcgKyBkYXRhc2V0LnggKyAnIHk6ICcgKyBkYXRhc2V0Lnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRvdExhYmVsID0gdGhpcy5oaWdobGlnaHRUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZUhvdmVyRG90TGFiZWwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBjb2xvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb25MZWZ0U2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy5iYWNrZ3JvdW5kLm5vZGUoKS5nZXRCQm94KCkud2lkdGggKyB0aGlzLmJ1ZmZlcikgLyAyID4gY29vcmRzWzBdKSB7IG9uTGVmdFNpZGUgPSB0cnVlOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdFg6IG51bWJlciA9IGRhdGFzZXQueENvb3JkICsgMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY3RZOiBudW1iZXIgPSBkYXRhc2V0LnlDb29yZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdFc6IG51bWJlciA9IHRoaXMuZ2V0RGltZW5zaW9ucyhkb3RMYWJlbC5ub2RlKCkpLncgKyA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0SDogbnVtYmVyID0gdGhpcy5nZXREaW1lbnNpb25zKGRvdExhYmVsLm5vZGUoKSkuaDsgLy8gKyA0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvbkxlZnRTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3RYID0gZGF0YXNldC54Q29vcmQgLSAxNSAtIHJlY3RXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0WSA9IGRhdGFzZXQueUNvb3JkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29vcmRzWzFdICsgcmVjdEggKyA0KSA+IHRoaXMuYmFja2dyb3VuZC5ub2RlKCkuZ2V0QkJveCgpLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGxhYmVsIGJlbG93IHggYXhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRlIGxhYmVsIHRvIGEgaGlnaGVyIHBsYWNlLiAtIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgaG92ZXJpbmcgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZG90UmVjdGFuZ2xlID0gdGhpcy5oaWdobGlnaHRSZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtb3VzZUhvdmVyRG90UmVjdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbC1vcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBjb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAnMXB4JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgcmVjdFcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCByZWN0SClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHJlY3RYICsgJywgJyArIHJlY3RZICsgJyknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYWJlbFg6IG51bWJlciA9IGRhdGFzZXQueENvb3JkICsgNCArIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IGRhdGFzZXQueUNvb3JkICsgdGhpcy5nZXREaW1lbnNpb25zKGRvdFJlY3RhbmdsZS5ub2RlKCkpLmggLSA0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvbkxlZnRTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsWCA9IGRhdGFzZXQueENvb3JkIC0gcmVjdFcgKyA0IC0gMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsWSA9IGRhdGFzZXQueUNvb3JkICsgdGhpcy5nZXREaW1lbnNpb25zKGRvdFJlY3RhbmdsZS5ub2RlKCkpLmggLSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbGFiZWxYICsgJywgJyArIGxhYmVsWSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1bmhpZ2hsaWdodCBob3ZlcmVkIGRvdFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFzZXR4Q29vcmRTcGxpdCA9IGRhdGFzZXQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXSArICctJyArIGRhdGFzZXQueENvb3JkLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RvdC0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJy0nICsgZC5kYXRhWzVdLmlkICsgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgcmFkaXVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBsYWJlbCBpbnZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gZC5kYXRhWzRdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5wbG90T3B0aW9ucy5ncmFwaCA/IHRoaXMucGxvdE9wdGlvbnMuZ3JhcGgubGluZXMucG9pbnRSYWRpdXMgOiB0aGlzLmRlZmF1bHRHcmFwaE9wdGlvbnMubGluZXMucG9pbnRSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuaGlnaGxpZ2h0IGhvdmVyZWQgZG90XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhc2V0eENvb3JkU3BsaXQgPSBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnLScgKyBkYXRhc2V0LnhDb29yZC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnI2RvdC0nICsgZGF0YXNldHhDb29yZFNwbGl0ICsgJy0nICsgZC5kYXRhWzVdLmlkICsgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBsYWJlbCBpbnZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0VGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBkaXN0YW5jZSBiZXR3ZWVuIG1vdXNlIGFuZCBhIGhvdmVyZWQgcG9pbnQuXG4gICAgICogQHBhcmFtIGRhdGFzZXQge30gQ29vcmRpbmF0ZXMgb2YgdGhlIGhvdmVyZWQgcG9pbnQuXG4gICAgICogQHBhcmFtIGNvb3JkcyB7fSBDb29yZGluYXRlcyBvZiB0aGUgbW91c2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjRGlzdGFuY2VIb3ZlcmluZyhkYXRhc2V0OiBEM0dlbmVyYWxEYXRhUG9pbnQsIGNvb3JkczogW251bWJlciwgbnVtYmVyXSk6IG51bWJlciB7XG4gICAgICAgIGxldCBtWCA9IGNvb3Jkc1swXSArIHRoaXMuYnVmZmVyLFxuICAgICAgICAgICAgbVkgPSBjb29yZHNbMV0sIC8vICsgdGhpcy5tYXJnaW4udG9wLFxuICAgICAgICAgICAgcFggPSBkYXRhc2V0LnhDb29yZCxcbiAgICAgICAgICAgIHBZID0gZGF0YXNldC55Q29vcmQ7XG4gICAgICAgIC8vIGNhbGN1bGF0ZSBkaXN0YW5jZSBiZXR3ZWVuIHBvaW50IGFuZCBtb3VzZSB3aGVuIGhvdmVyaW5nXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coKHBYIC0gbVgpLCAyKSArIE1hdGgucG93KChwWSAtIG1ZKSwgMikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZ2UoZGF0YTogRDNHZW5lcmFsRGF0YVBvaW50W10sIHNlbGVjdG9yOiBzdHJpbmcpOiBSYW5nZSB7XG4gICAgICAgIC8vIHJhbmdlIGZvciBheGlzIHNjYWxlXG4gICAgICAgIGxldCByYW5nZTogW251bWJlciwgbnVtYmVyXSA9IGQzLmV4dGVudChkMy52YWx1ZXMoZGF0YS5tYXAoKGQpID0+IHtcbiAgICAgICAgICAgIGlmICgoIWlzTmFOKGQueCkgJiYgIWlzTmFOKGQueSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRbc2VsZWN0b3JdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSkpO1xuICAgICAgICByZXR1cm4geyBtaW46IHJhbmdlWzBdLCBtYXg6IHJhbmdlWzFdIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIGdyYXBoIGRpYWdyYW0uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmQzRWxlbS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGllbnRIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgZ3JhcGggZGlhZ3JhbS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1N2Zy5ub2RlKCkud2lkdGguYmFzZVZhbC52YWx1ZSAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGJvdW5kaW5ncyBvZiBhIGh0bWwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZWwge09iamVjdH0gT2JqZWN0IG9mIHRoZSBodG1sIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREaW1lbnNpb25zKGVsOiBhbnkpOiB7IHc6IG51bWJlciwgaDogbnVtYmVyIH0ge1xuICAgICAgICBsZXQgdyA9IDA7XG4gICAgICAgIGxldCBoID0gMDtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0gZWwuZ2V0QkJveCgpO1xuICAgICAgICAgICAgdyA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICBoID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3I6IGdldERpbWVuc2lvbnMoKSAnICsgZWwgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdyxcbiAgICAgICAgICAgIGhcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdfQ==