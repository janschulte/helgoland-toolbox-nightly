/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import 'Flot/jquery.flot.js';
import 'Flot/jquery.flot.time.js';
import '@helgoland/flot/jquery.flot.navigate.js';
import '@helgoland/flot/jquery.flot.selection.js';
import '@helgoland/flot/jquery.flot.touch.js';
import { Component, ElementRef, EventEmitter, IterableDiffers, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Dataset, DatasetApiInterface, DatasetPresenterComponent, HasLoadableContent, InternalIdHandler, Mixin, Time, Timeseries, Timespan, } from '@helgoland/core';
import { LabelMapperService } from '@helgoland/depiction';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
var FlotTimeseriesGraphComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FlotTimeseriesGraphComponent, _super);
    function FlotTimeseriesGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, labelMapper, translateSrvc) {
        var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.labelMapper = labelMapper;
        _this.translateSrvc = translateSrvc;
        _this.onHighlight = new EventEmitter();
        _this.preparedData = Array();
        _this.plotOptions = {
            grid: {
                autoHighlight: true,
                hoverable: true
            },
            series: {
                lines: {
                    fill: false,
                    show: true
                },
                points: {
                    fill: true,
                    radius: 2,
                    show: false
                },
                shadowSize: 1
            },
            selection: {
                mode: null
            },
            xaxis: {
                mode: 'time',
                timezone: 'browser',
            },
            yaxes: [],
            showReferenceValues: false
        };
        _this.datasetMap = new Map();
        _this.loadingCounter = 0;
        return _this;
    }
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.plotarea = this.flotElem.nativeElement;
        $(this.plotarea).bind('plotzoom', function (evt, plot) {
            /** @type {?} */
            var xaxis = plot.getXAxes()[0];
            _this.changeTime(xaxis.min, xaxis.max);
        });
        // plot pan ended event
        $(this.plotarea).bind('plotpanEnd', function (evt, plot) {
            /** @type {?} */
            var xaxis = plot.getXAxes()[0];
            _this.changeTime(xaxis.min, xaxis.max);
        });
        $(this.plotarea).bind('touchended', function (evt, plot) {
            _this.changeTime(plot.xaxis.from, plot.xaxis.to);
        });
        // plot selected event
        $(this.plotarea).bind('plotselected', function (evt, ranges) {
            _this.changeTime(ranges.xaxis.from, ranges.xaxis.to);
        });
        $(this.plotarea).bind('plothover', function (evt, pos, item) {
            if (item) {
                _this.onHighlight.emit(item.series.internalId);
                _this.showTooltip(evt, pos, item);
            }
            else {
                _this.onHighlight.emit('');
                _this.hideTooltip();
            }
        });
        this.createTooltip();
        this.plotGraph();
    };
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.onLanguageChanged = /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    function (langChangeEvent) { };
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.reloadDataForDatasets = /**
     * @param {?} datasetIds
     * @return {?}
     */
    function (datasetIds) {
        var _this = this;
        console.log('reload data at ' + new Date());
        this.datasetIds.forEach(function (id) { return _this.loadData(_this.datasetMap.get(id), true); });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.graphOptionsChanged = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        Object.assign(this.plotOptions, options);
        this.plotOptions.yaxes = [];
        this.timeIntervalChanges();
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.setSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var tsData = this.preparedData.find(function (e) { return e.internalId === internalId; });
        tsData.selected = true;
        tsData.points.radius *= 3;
        tsData.lines.lineWidth *= 3;
        tsData.bars.lineWidth *= 3;
        this.plotGraph();
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.removeSelectedId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var tsData = this.preparedData.find(function (e) { return e.internalId === internalId; });
        tsData.selected = false;
        tsData.points.radius /= 3;
        tsData.lines.lineWidth /= 3;
        tsData.bars.lineWidth /= 3;
        this.plotGraph();
    };
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.timeIntervalChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.datasetMap.forEach(function (dataset) {
            _this.loadData(dataset);
        });
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.removeDataset = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        this.datasetMap.delete(internalId);
        this.removePreparedData(internalId);
        this.plotGraph();
    };
    /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?} url
     * @return {?}
     */
    function (internalId, url) {
        var _this = this;
        this.api.getSingleTimeseries(internalId, url).subscribe(function (timeseries) { return _this.addLoadedDataset(timeseries); }, function (error) {
            _this.api.getDataset(internalId, url).subscribe(function (dataset) { return _this.addLoadedDataset(dataset); });
        });
    };
    /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.datasetOptionsChanged = /**
     * @param {?} internalId
     * @param {?} options
     * @return {?}
     */
    function (internalId, options) {
        if (this.datasetMap.has(internalId)) {
            this.loadData(this.datasetMap.get(internalId));
        }
    };
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        this.plotGraph();
    };
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.changeTime = /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    function (from, to) {
        this.onTimespanChanged.emit(new Timespan(from, to));
    };
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.plotGraph = /**
     * @return {?}
     */
    function () {
        if (this.preparedData
            && this.plotarea
            && this.preparedData.length !== 0
            && this.plotOptions
            && this.plotarea.clientHeight > 0) {
            this.prepareAxisPos();
            this.plotOptions.xaxis.min = this.timespan.from;
            this.plotOptions.xaxis.max = this.timespan.to;
            /** @type {?} */
            var plotObj = $.plot(this.plotarea, this.preparedData, this.plotOptions);
            this.createPlotAnnotation(this.plotarea, this.plotOptions);
            this.createYAxis(plotObj);
            this.setSelection(plotObj, this.plotOptions);
        }
        else {
            if (this.plotarea) {
                $(this.plotarea).empty();
            }
        }
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.removePreparedData = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var idx = this.preparedData.findIndex(function (entry) { return entry.internalId === internalId; });
        if (idx >= 0) {
            this.preparedData.splice(idx, 1);
        }
        /** @type {?} */
        var axisIdx = this.plotOptions.yaxes.findIndex(function (entry) {
            /** @type {?} */
            var internalIdIndex = entry.internalIds.indexOf(internalId);
            if (internalIdIndex > -1) {
                if (entry.internalIds.length === 1) {
                    return true;
                }
                else {
                    entry.internalIds.splice(internalIdIndex, 1);
                    entry.tsColors.splice(internalIdIndex, 1);
                }
            }
            return false;
        });
        if (axisIdx > -1) {
            this.plotOptions.yaxes.splice(axisIdx, 1);
        }
    };
    /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.prepareData = /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    function (dataset, data) {
        var _this = this;
        return Observable.create(function (observer) {
            /** @type {?} */
            var dataIdx = _this.preparedData.findIndex(function (e) { return e.internalId === dataset.internalId; });
            /** @type {?} */
            var selectedIndex = _this.selectedDatasetIds.indexOf(dataset.internalId);
            /** @type {?} */
            var styles = _this.datasetOptions.get(dataset.internalId);
            _this.createAxisLabel(dataset).subscribe(function (label) {
                /** @type {?} */
                var axePos;
                /** @type {?} */
                var axe = _this.plotOptions.yaxes.find(function (yaxisEntry, idx) {
                    axePos = idx + 1;
                    return yaxisEntry.label === label;
                });
                if (axe) {
                    if (axe.internalIds.indexOf(dataset.internalId) < 0) {
                        axe.internalIds.push(dataset.internalId);
                        axe.tsColors.push(styles.color);
                    }
                    else {
                        axe.tsColors[axe.internalIds.indexOf(dataset.internalId)] = styles.color;
                    }
                    axe.min = styles.zeroBasedYAxis ? 0 : null;
                }
                else {
                    _this.plotOptions.yaxes.push({
                        uom: dataset.uom,
                        label: label,
                        tsColors: [styles.color],
                        internalIds: [dataset.internalId],
                        min: styles.zeroBasedYAxis ? 0 : null
                    });
                    axePos = _this.plotOptions.yaxes.length;
                }
                /** @type {?} */
                var dataEntry = {
                    internalId: dataset.internalId,
                    color: styles.color,
                    data: styles.visible ? data.values : [],
                    points: {
                        fillColor: styles.color,
                        radius: styles.pointRadius,
                        show: styles.pointRadius > 0 ? true : false
                    },
                    lines: {
                        lineWidth: styles.lineWidth,
                        show: styles.lineWidth > 0 ? true : false
                    },
                    bars: {
                        lineWidth: 1
                    }
                };
                if (selectedIndex >= 0) {
                    dataEntry.points.radius *= 3;
                    dataEntry.lines.lineWidth *= 3;
                    dataEntry.bars.lineWidth *= 3;
                }
                if (dataIdx >= 0) {
                    _this.preparedData[dataIdx] = dataEntry;
                }
                else {
                    _this.preparedData.push(dataEntry);
                }
                _this.addReferenceValueData(dataset.internalId, styles, data);
                observer.next(true);
            });
        });
    };
    /**
     * @param {?} internalId
     * @param {?} styles
     * @param {?} data
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.addReferenceValueData = /**
     * @param {?} internalId
     * @param {?} styles
     * @param {?} data
     * @return {?}
     */
    function (internalId, styles, data) {
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
                    data: data.referenceValues[refValue.id],
                    points: {
                        fillColor: refValue.color
                    },
                    lines: {
                        lineWidth: 1
                    },
                };
                _this.preparedData.push(refDataEntry);
            });
        }
    };
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.prepareAxisPos = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // remove unused axes
        this.plotOptions.yaxes = this.plotOptions.yaxes.filter(function (entry) { return entry.internalIds.length !== 0; });
        this.plotOptions.yaxes.forEach(function (xaxis, idx) {
            xaxis.internalIds.forEach(function (id) {
                /** @type {?} */
                var temp = _this.preparedData.find(function (dataEntry) { return dataEntry.internalId === id; });
                temp.yaxis = idx + 1;
            });
        });
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.createAxisLabel = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        return this.labelMapper.getMappedLabel(dataset.parameters.phenomenon.label)
            .map(function (label) { return label + ' [' + dataset.uom + ']'; });
    };
    /**
     * @param {?} plot
     * @param {?} options
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.setSelection = /**
     * @param {?} plot
     * @param {?} options
     * @return {?}
     */
    function (plot, options) {
        if (plot && options.selection.range) {
            plot.setSelection({
                xaxis: {
                    from: options.selection.range.from,
                    to: options.selection.range.to
                }
            }, true);
        }
    };
    /**
     * @param {?} plotArea
     * @param {?} options
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.createPlotAnnotation = /**
     * @param {?} plotArea
     * @param {?} options
     * @return {?}
     */
    function (plotArea, options) {
        if (options.annotation) {
            // plotArea.append('<div class="graph-annotation">Daten ohne Gewähr</div>');
        }
    };
    /**
     * @param {?} plot
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.createYAxis = /**
     * @param {?} plot
     * @return {?}
     */
    function (plot) {
        var _this = this;
        if (plot.getOptions().yaxis.show) {
            // remove old labels
            $(plot.getPlaceholder()).find('.yaxisLabel').remove();
            // createYAxis
            $.each(plot.getAxes(), function (i, axis) {
                if (!axis.show) {
                    return;
                }
                /** @type {?} */
                var box = axis.box;
                if (axis.direction === 'y') {
                    $('<div class="axisTargetStyle" style="position:absolute; left:'
                        + box.left + 'px; top:' + box.top + 'px; width:'
                        + box.width + 'px; height:' + box.height + 'px"></div>')
                        .data('axis.n', axis.n)
                        .appendTo(plot.getPlaceholder());
                    $('<div class="axisTarget" style="position:absolute; left:'
                        + box.left + 'px; top:' + box.top + 'px; width:'
                        + box.width + 'px; height:' + box.height + 'px"></div>')
                        .data('axis.n', axis.n)
                        .appendTo(plot.getPlaceholder())
                        .click(function (event) {
                        /** @type {?} */
                        var target = $(event.currentTarget);
                        /** @type {?} */
                        var selected = false;
                        $.each($('.axisTarget'), function (index, elem) {
                            elem = $(elem);
                            if (target.data('axis.n') === elem.data('axis.n')) {
                                selected = elem.hasClass('selected');
                                return false; // break loop
                            }
                        });
                        /** @type {?} */
                        var selections = [];
                        $.each(plot.getData(), function (index, elem) {
                            if (target.data('axis.n') === elem.yaxis.n) {
                                elem.selected = !selected;
                                if (elem.selected) {
                                    selections.push(elem.internalId);
                                }
                            }
                        });
                        _this.onDatasetSelected.emit(selections);
                        if (!selected) {
                            target.addClass('selected');
                        }
                        _this.plotGraph();
                    });
                    if (!axis.options.hideLabel) {
                        /** @type {?} */
                        var yaxisLabel_1 = $('<div class="axisLabel yaxisLabel" style=left:'
                            + box.left + 'px;></div>').text(axis.options.label)
                            .appendTo(plot.getPlaceholder())
                            .data('axis.n', axis.n);
                        if (axis.options.tsColors) {
                            $.each(axis.options.tsColors, function (idx, color) {
                                $('<span>').html('&nbsp;&#x25CF;').css('color', color)
                                    .addClass('labelColorMarker').appendTo(yaxisLabel_1);
                            });
                        }
                        yaxisLabel_1.css('margin-left', -4 + (yaxisLabel_1.height() - yaxisLabel_1.width()) / 2);
                    }
                }
            });
            // set selection to axis
            plot.getData().forEach(function (elem) {
                if (elem.selected) {
                    $('.flot-y' + elem.yaxis.n + '-axis').addClass('selected');
                    $.each($('.axisTarget'), function (i, entry) {
                        if ($(entry).data('axis.n') === elem.yaxis.n) {
                            if (!$(entry).hasClass('selected')) {
                                $(entry).addClass('selected');
                                return false;
                            }
                        }
                    });
                    $.each($('.axisTargetStyle'), function (i, entry) {
                        if ($(entry).data('axis.n') === elem.yaxis.n) {
                            if (!$(entry).hasClass('selected')) {
                                $(entry).addClass('selected');
                                return false;
                            }
                        }
                    });
                    $.each($('.axisLabel.yaxisLabel'), function (i, entry) {
                        if ($(entry).data('axis.n') === elem.yaxis.n) {
                            if (!$(entry).hasClass('selected')) {
                                $(entry).addClass('selected');
                                return false;
                            }
                        }
                    });
                }
            });
        }
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.addLoadedDataset = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        this.datasetMap.set(dataset.internalId, dataset);
        this.loadData(dataset);
    };
    /**
     * @param {?} dataset
     * @param {?=} refresh
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.loadData = /**
     * @param {?} dataset
     * @param {?=} refresh
     * @return {?}
     */
    function (dataset, refresh) {
        var _this = this;
        /** @type {?} */
        var datasetOptions = this.datasetOptions.get(dataset.internalId);
        if (datasetOptions) {
            if (this.timespan && this.plotOptions && datasetOptions.visible) {
                if (this.loadingCounter === 0) {
                    this.isContentLoading(true);
                }
                this.loadingCounter++;
                /** @type {?} */
                var buffer = this.timeSrvc.getBufferedTimespan(this.timespan, 0.2);
                /** @type {?} */
                var options = {};
                if (refresh) {
                    options.forceUpdate = refresh;
                }
                if (dataset instanceof Timeseries) {
                    this.api.getTsData(dataset.id, dataset.url, buffer, {
                        format: 'flot',
                        expanded: this.plotOptions.showReferenceValues === true,
                        generalize: this.plotOptions.generalizeAllways || datasetOptions.generalize
                    }, options).subscribe(function (result) { return _this.prepareData(dataset, result).subscribe(function () {
                        _this.plotGraph();
                    }); }, function (error) { return _this.onError(error); }, function () { return _this.onCompleteLoadingData(dataset); });
                }
                if (dataset instanceof Dataset) {
                    this.api.getData(dataset.id, dataset.url, buffer, {
                        format: 'flot',
                        expanded: this.plotOptions.showReferenceValues === true,
                        generalize: this.plotOptions.generalizeAllways || datasetOptions.generalize
                    }, options).subscribe(function (result) { return _this.prepareData(dataset, result).subscribe(function () { return _this.plotGraph(); }); }, function (error) { return _this.onError(error); }, function () { return _this.onCompleteLoadingData(dataset); });
                }
            }
            else if (!datasetOptions.visible) {
                this.removePreparedData(dataset.internalId);
                this.plotGraph();
            }
        }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.onError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        console.error(error);
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.onCompleteLoadingData = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        this.loadingCounter--;
        if (this.loadingCounter === 0) {
            this.isContentLoading(false);
        }
    };
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.createTooltip = /**
     * @return {?}
     */
    function () {
        if ($('#tooltip').length === 0) {
            $('<div id="tooltip"></div>').appendTo('body');
        }
    };
    /**
     * @param {?} event
     * @param {?} pos
     * @param {?} item
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.showTooltip = /**
     * @param {?} event
     * @param {?} pos
     * @param {?} item
     * @return {?}
     */
    function (event, pos, item) {
        $('#tooltip').empty();
        $('#tooltip').append('<div>' + item.datapoint[1].toFixed(2) + ' ' + item.series.yaxis.options.uom + '</div>');
        $('#tooltip').append('<div>' + item.series.xaxis.tickFormatter(item.datapoint[0], item.series.xaxis) + '</div>');
        /** @type {?} */
        var tooltip = $('#tooltip').show();
        /** @type {?} */
        var halfwidth = (event.target.clientWidth) / 2;
        if (halfwidth >= item.pageX - event.target.getBoundingClientRect().left) {
            tooltip.css({
                position: 'absolute',
                top: item.pageY + 5,
                left: item.pageX + 5,
                right: 'auto'
            });
        }
        else {
            tooltip.css({
                position: 'absolute',
                top: item.pageY + 5,
                right: ($(window).width() - item.pageX),
                left: 'auto'
            });
        }
    };
    /**
     * @return {?}
     */
    FlotTimeseriesGraphComponent.prototype.hideTooltip = /**
     * @return {?}
     */
    function () {
        $('#tooltip').hide();
    };
    FlotTimeseriesGraphComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-flot-timeseries-graph',
                    template: "<div class=\"flot\" #flot></div>\n",
                    styles: ["n52-flot-timeseries-graph .flot{height:100%}n52-flot-timeseries-graph .axisTarget{cursor:pointer}n52-flot-timeseries-graph .axisLabel{position:absolute;font-size:90%;text-align:center}n52-flot-timeseries-graph .yaxisLabel{top:50%;transform:rotate(-90deg);-o-transform:rotate(-90deg);-ms-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);z-index:-9999;padding-bottom:8px}n52-flot-timeseries-graph .labelColorMarker{font-size:150%}n52-flot-timeseries-graph .graph-annotation{position:absolute;bottom:40px;right:15px;color:red}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    FlotTimeseriesGraphComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DatasetApiInterface },
        { type: InternalIdHandler },
        { type: Time },
        { type: LabelMapperService },
        { type: TranslateService }
    ]; };
    FlotTimeseriesGraphComponent.propDecorators = {
        onHighlight: [{ type: Output }],
        flotElem: [{ type: ViewChild, args: ['flot',] }]
    };
    FlotTimeseriesGraphComponent = tslib_1.__decorate([
        Mixin([HasLoadableContent]),
        tslib_1.__metadata("design:paramtypes", [IterableDiffers,
            DatasetApiInterface,
            InternalIdHandler,
            Time,
            LabelMapperService,
            TranslateService])
    ], FlotTimeseriesGraphComponent);
    return FlotTimeseriesGraphComponent;
}(DatasetPresenterComponent));
export { FlotTimeseriesGraphComponent };
if (false) {
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.onHighlight;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.flotElem;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.plotarea;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.preparedData;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.plotOptions;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.datasetMap;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.lastHightlight;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.loadingCounter;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.iterableDiffers;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.api;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.datasetIdResolver;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.labelMapper;
    /** @type {?} */
    FlotTimeseriesGraphComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdC10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZmxvdC8iLCJzb3VyY2VzIjpbImxpYi9mbG90LXRpbWVzZXJpZXMtZ3JhcGgvZmxvdC10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8scUJBQXFCLENBQUM7QUFDN0IsT0FBTywwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sMENBQTBDLENBQUM7QUFDbEQsT0FBTyxzQ0FBc0MsQ0FBQztBQUU5QyxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCxPQUFPLEVBQ1AsbUJBQW1CLEVBRW5CLHlCQUF5QixFQUN6QixrQkFBa0IsRUFHbEIsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsR0FDWCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBbUIsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBa0JqQyx3REFBc0Q7SUErQzlELHNDQUNjLGVBQWdDLEVBQ2hDLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxRQUFjLEVBQ2QsV0FBK0IsRUFDL0IsYUFBK0I7UUFON0MsWUFRSSxrQkFBTSxlQUFlLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsU0FDMUU7UUFSYSxxQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBRyxHQUFILEdBQUcs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Q0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2dCQW5nQjVCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUUsb0NBQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsb2pCQUFvakIsQ0FBQztvQkFDOWpCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7OztnQkFyQ0csZUFBZTtnQkFRZixtQkFBbUI7Z0JBTW5CLGlCQUFpQjtnQkFFakIsSUFBSTtnQkFJQyxrQkFBa0I7Z0JBQ0QsZ0JBQWdCOzs7OEJBc0JyQyxNQUFNOzJCQUdOLFNBQVMsU0FBQyxNQUFNOztJQVBSLDRCQUE0QjtRQUR4QyxLQUFLLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lEQWtETyxlQUFlO1lBQzNCLG1CQUFtQjtZQUNMLGlCQUFpQjtZQUMxQixJQUFJO1lBQ0Qsa0JBQWtCO1lBQ2hCLGdCQUFnQjtPQXREcEMsNEJBQTRCLEVBNmZ4Qzt1Q0EvaUJEO0VBbURZLHlCQUF5QjtTQUR4Qiw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Zsb3QvanF1ZXJ5LmZsb3QuanMnO1xuaW1wb3J0ICdGbG90L2pxdWVyeS5mbG90LnRpbWUuanMnO1xuaW1wb3J0ICdAaGVsZ29sYW5kL2Zsb3QvanF1ZXJ5LmZsb3QubmF2aWdhdGUuanMnO1xuaW1wb3J0ICdAaGVsZ29sYW5kL2Zsb3QvanF1ZXJ5LmZsb3Quc2VsZWN0aW9uLmpzJztcbmltcG9ydCAnQGhlbGdvbGFuZC9mbG90L2pxdWVyeS5mbG90LnRvdWNoLmpzJztcblxuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGEsXG4gICAgRGF0YXNldCxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRPcHRpb25zLFxuICAgIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gICAgSGFzTG9hZGFibGVDb250ZW50LFxuICAgIEh0dHBSZXF1ZXN0T3B0aW9ucyxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBNaXhpbixcbiAgICBUaW1lLFxuICAgIFRpbWVzZXJpZXMsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2RlcGljdGlvbic7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuaW1wb3J0IHsgRGF0YVNlcmllcyB9IGZyb20gJy4uL21vZGVsL2RhdGFTZXJpZXMuanMnO1xuaW1wb3J0IHsgUGxvdCB9IGZyb20gJy4uL21vZGVsL3Bsb3QuanMnO1xuaW1wb3J0IHsgUGxvdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9wbG90T3B0aW9ucy5qcyc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmbG90XCIgI2Zsb3Q+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BuNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIC5mbG90e2hlaWdodDoxMDAlfW41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggLmF4aXNUYXJnZXR7Y3Vyc29yOnBvaW50ZXJ9bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCAuYXhpc0xhYmVse3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZTo5MCU7dGV4dC1hbGlnbjpjZW50ZXJ9bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCAueWF4aXNMYWJlbHt0b3A6NTAlO3RyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstby10cmFuc2Zvcm06cm90YXRlKC05MGRlZyk7LW1zLXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstbW96LXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTt6LWluZGV4Oi05OTk5O3BhZGRpbmctYm90dG9tOjhweH1uNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIC5sYWJlbENvbG9yTWFya2Vye2ZvbnQtc2l6ZToxNTAlfW41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggLmdyYXBoLWFubm90YXRpb257cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjQwcHg7cmlnaHQ6MTVweDtjb2xvcjpyZWR9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBGbG90VGltZXNlcmllc0dyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBQbG90T3B0aW9ucz5cbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uSGlnaGxpZ2h0OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Zsb3QnKVxuICAgIHB1YmxpYyBmbG90RWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgcGxvdGFyZWE6IGFueTtcblxuICAgIHByaXZhdGUgcHJlcGFyZWREYXRhOiBEYXRhU2VyaWVzW10gPSBBcnJheSgpO1xuXG4gICAgcHJpdmF0ZSBwbG90T3B0aW9uczogUGxvdE9wdGlvbnMgPSB7XG4gICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgIGF1dG9IaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJhZGl1czogMixcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0aW9uOiB7XG4gICAgICAgICAgICBtb2RlOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICBtb2RlOiAndGltZScsXG4gICAgICAgICAgICB0aW1lem9uZTogJ2Jyb3dzZXInLFxuICAgICAgICB9LFxuICAgICAgICB5YXhlczogW10sXG4gICAgICAgIHNob3dSZWZlcmVuY2VWYWx1ZXM6IGZhbHNlXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGF0YXNldE1hcDogTWFwPHN0cmluZywgSURhdGFzZXQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBsYXN0SGlnaHRsaWdodDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBsb2FkaW5nQ291bnRlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBsYWJlbE1hcHBlcjogTGFiZWxNYXBwZXJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBsb3RhcmVhID0gdGhpcy5mbG90RWxlbS5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICQodGhpcy5wbG90YXJlYSkuYmluZCgncGxvdHpvb20nLCAoZXZ0OiBhbnksIHBsb3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeGF4aXMgPSBwbG90LmdldFhBeGVzKClbMF07XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUoeGF4aXMubWluLCB4YXhpcy5tYXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBwbG90IHBhbiBlbmRlZCBldmVudFxuICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmJpbmQoJ3Bsb3RwYW5FbmQnLCAoZXZ0OiBhbnksIHBsb3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeGF4aXMgPSBwbG90LmdldFhBeGVzKClbMF07XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUoeGF4aXMubWluLCB4YXhpcy5tYXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmJpbmQoJ3RvdWNoZW5kZWQnLCAoZXZ0OiBhbnksIHBsb3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKHBsb3QueGF4aXMuZnJvbSwgcGxvdC54YXhpcy50byk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBsb3Qgc2VsZWN0ZWQgZXZlbnRcbiAgICAgICAgJCh0aGlzLnBsb3RhcmVhKS5iaW5kKCdwbG90c2VsZWN0ZWQnLCAoZXZ0OiBhbnksIHJhbmdlczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUocmFuZ2VzLnhheGlzLmZyb20sIHJhbmdlcy54YXhpcy50byk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGhpcy5wbG90YXJlYSkuYmluZCgncGxvdGhvdmVyJywgKGV2dDogYW55LCBwb3M6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IaWdobGlnaHQuZW1pdChpdGVtLnNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUb29sdGlwKGV2dCwgcG9zLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodC5lbWl0KCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVUb29sdGlwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbHRpcCgpO1xuXG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7IH1cblxuICAgIHB1YmxpYyByZWxvYWREYXRhRm9yRGF0YXNldHMoZGF0YXNldElkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlbG9hZCBkYXRhIGF0ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0SWRzLmZvckVhY2goaWQgPT4gdGhpcy5sb2FkRGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGlkKSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBncmFwaE9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IFBsb3RPcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wbG90T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGxvdE9wdGlvbnMueWF4ZXMgPSBbXTtcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWxDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIHRzRGF0YS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRzRGF0YS5wb2ludHMucmFkaXVzICo9IDM7XG4gICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggKj0gMztcbiAgICAgICAgdHNEYXRhLmJhcnMubGluZVdpZHRoICo9IDM7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIHRzRGF0YS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0c0RhdGEucG9pbnRzLnJhZGl1cyAvPSAzO1xuICAgICAgICB0c0RhdGEubGluZXMubGluZVdpZHRoIC89IDM7XG4gICAgICAgIHRzRGF0YS5iYXJzLmxpbmVXaWR0aCAvPSAzO1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShkYXRhc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJlcGFyZWREYXRhKGludGVybmFsSWQpO1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyhpbnRlcm5hbElkLCB1cmwpLnN1YnNjcmliZShcbiAgICAgICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLmFkZExvYWRlZERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KGludGVybmFsSWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YXNldCkgPT4gdGhpcy5hZGRMb2FkZWREYXRhc2V0KGRhdGFzZXQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldE1hcC5oYXMoaW50ZXJuYWxJZCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQobmV3IFRpbWVzcGFuKGZyb20sIHRvKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbG90R3JhcGgoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YVxuICAgICAgICAgICAgJiYgdGhpcy5wbG90YXJlYVxuICAgICAgICAgICAgJiYgdGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoICE9PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnBsb3RPcHRpb25zXG4gICAgICAgICAgICAmJiB0aGlzLnBsb3RhcmVhLmNsaWVudEhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUF4aXNQb3MoKTtcbiAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMueGF4aXMubWluID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucy54YXhpcy5tYXggPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICAgICAgY29uc3QgcGxvdE9iajogUGxvdCA9ICQucGxvdCh0aGlzLnBsb3RhcmVhLCB0aGlzLnByZXBhcmVkRGF0YSwgdGhpcy5wbG90T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBsb3RBbm5vdGF0aW9uKHRoaXMucGxvdGFyZWEsIHRoaXMucGxvdE9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVZQXhpcyhwbG90T2JqKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHBsb3RPYmosIHRoaXMucGxvdE9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdGFyZWEpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVByZXBhcmVkRGF0YShpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGZyb20gcHJlcGFyZWREYXRhIEFycmF5XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHsgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKGlkeCwgMSk7IH1cbiAgICAgICAgLy8gcmVtb3ZlIGZyb20gYXhpc1xuICAgICAgICBjb25zdCBheGlzSWR4ID0gdGhpcy5wbG90T3B0aW9ucy55YXhlcy5maW5kSW5kZXgoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcm5hbElkSW5kZXggPSBlbnRyeS5pbnRlcm5hbElkcy5pbmRleE9mKGludGVybmFsSWQpO1xuICAgICAgICAgICAgaWYgKGludGVybmFsSWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmludGVybmFsSWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5pbnRlcm5hbElkcy5zcGxpY2UoaW50ZXJuYWxJZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkudHNDb2xvcnMuc3BsaWNlKGludGVybmFsSWRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGF4aXNJZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucy55YXhlcy5zcGxpY2UoYXhpc0lkeCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVEYXRhKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBEYXRhPFtudW1iZXIsIG51bWJlcl0+KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhSWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlKSA9PiBlLmludGVybmFsSWQgPT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQXhpc0xhYmVsKGRhdGFzZXQpLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXhlUG9zO1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4ZSA9IHRoaXMucGxvdE9wdGlvbnMueWF4ZXMuZmluZCgoeWF4aXNFbnRyeSwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGF4ZVBvcyA9IGlkeCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5YXhpc0VudHJ5LmxhYmVsID09PSBsYWJlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXhlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGUuaW50ZXJuYWxJZHMuaW5kZXhPZihkYXRhc2V0LmludGVybmFsSWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXhlLmludGVybmFsSWRzLnB1c2goZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4ZS50c0NvbG9ycy5wdXNoKHN0eWxlcy5jb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBheGUudHNDb2xvcnNbYXhlLmludGVybmFsSWRzLmluZGV4T2YoZGF0YXNldC5pbnRlcm5hbElkKV0gPSBzdHlsZXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXhlLm1pbiA9IHN0eWxlcy56ZXJvQmFzZWRZQXhpcyA/IDAgOiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMueWF4ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0c0NvbG9yczogW3N0eWxlcy5jb2xvcl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkczogW2RhdGFzZXQuaW50ZXJuYWxJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IHN0eWxlcy56ZXJvQmFzZWRZQXhpcyA/IDAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBheGVQb3MgPSB0aGlzLnBsb3RPcHRpb25zLnlheGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YUVudHJ5OiBEYXRhU2VyaWVzID0ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiBkYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdHlsZXMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHN0eWxlcy52aXNpYmxlID8gZGF0YS52YWx1ZXMgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHN0eWxlcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogc3R5bGVzLnBvaW50UmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogc3R5bGVzLnBvaW50UmFkaXVzID4gMCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogc3R5bGVzLmxpbmVXaWR0aCA+IDAgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmFyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhRW50cnkucG9pbnRzLnJhZGl1cyAqPSAzO1xuICAgICAgICAgICAgICAgICAgICBkYXRhRW50cnkubGluZXMubGluZVdpZHRoICo9IDM7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5iYXJzLmxpbmVXaWR0aCAqPSAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YUlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2RhdGFJZHhdID0gZGF0YUVudHJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2goZGF0YUVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZWZlcmVuY2VWYWx1ZURhdGEoZGF0YXNldC5pbnRlcm5hbElkLCBzdHlsZXMsIGRhdGEpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRSZWZlcmVuY2VWYWx1ZURhdGEoaW50ZXJuYWxJZDogc3RyaW5nLCBzdHlsZXM6IERhdGFzZXRPcHRpb25zLCBkYXRhOiBEYXRhPFtudW1iZXIsIG51bWJlcl0+KSB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFlbnRyeS5pbnRlcm5hbElkLnN0YXJ0c1dpdGgoJ3JlZicgKyBpbnRlcm5hbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHN0eWxlcy5zaG93UmVmZXJlbmNlVmFsdWVzLmZvckVhY2goKHJlZlZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmRGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiAncmVmJyArIGludGVybmFsSWQgKyByZWZWYWx1ZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZlZhbHVlLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLnJlZmVyZW5jZVZhbHVlc1tyZWZWYWx1ZS5pZF0sXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiByZWZWYWx1ZS5jb2xvclxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5wdXNoKHJlZkRhdGFFbnRyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUF4aXNQb3MoKSB7XG4gICAgICAgIC8vIHJlbW92ZSB1bnVzZWQgYXhlc1xuICAgICAgICB0aGlzLnBsb3RPcHRpb25zLnlheGVzID0gdGhpcy5wbG90T3B0aW9ucy55YXhlcy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pbnRlcm5hbElkcy5sZW5ndGggIT09IDApO1xuICAgICAgICB0aGlzLnBsb3RPcHRpb25zLnlheGVzLmZvckVhY2goKHhheGlzLCBpZHgpID0+IHtcbiAgICAgICAgICAgIHhheGlzLmludGVybmFsSWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGRhdGFFbnRyeSkgPT4gZGF0YUVudHJ5LmludGVybmFsSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICB0ZW1wLnlheGlzID0gaWR4ICsgMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUF4aXNMYWJlbChkYXRhc2V0OiBJRGF0YXNldCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVsTWFwcGVyLmdldE1hcHBlZExhYmVsKGRhdGFzZXQucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsKVxuICAgICAgICAgICAgLm1hcCgobGFiZWwpID0+IGxhYmVsICsgJyBbJyArIGRhdGFzZXQudW9tICsgJ10nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbihwbG90OiBQbG90LCBvcHRpb25zOiBQbG90T3B0aW9ucykge1xuICAgICAgICBpZiAocGxvdCAmJiBvcHRpb25zLnNlbGVjdGlvbi5yYW5nZSkge1xuICAgICAgICAgICAgcGxvdC5zZXRTZWxlY3Rpb24oe1xuICAgICAgICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyb206IG9wdGlvbnMuc2VsZWN0aW9uLnJhbmdlLmZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvOiBvcHRpb25zLnNlbGVjdGlvbi5yYW5nZS50b1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQbG90QW5ub3RhdGlvbihwbG90QXJlYTogYW55LCBvcHRpb25zOiBQbG90T3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICAvLyBwbG90QXJlYS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJncmFwaC1hbm5vdGF0aW9uXCI+RGF0ZW4gb2huZSBHZXfDpGhyPC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVlBeGlzKHBsb3Q6IFBsb3QpIHtcbiAgICAgICAgaWYgKHBsb3QuZ2V0T3B0aW9ucygpLnlheGlzLnNob3cpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgbGFiZWxzXG4gICAgICAgICAgICAkKHBsb3QuZ2V0UGxhY2Vob2xkZXIoKSkuZmluZCgnLnlheGlzTGFiZWwnKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlWUF4aXNcbiAgICAgICAgICAgICQuZWFjaChwbG90LmdldEF4ZXMoKSwgKGk6IG51bWJlciwgYXhpczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFheGlzLnNob3cpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgY29uc3QgYm94ID0gYXhpcy5ib3g7XG4gICAgICAgICAgICAgICAgaWYgKGF4aXMuZGlyZWN0aW9uID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cImF4aXNUYXJnZXRTdHlsZVwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IGxlZnQ6J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyBib3gubGVmdCArICdweDsgdG9wOicgKyBib3gudG9wICsgJ3B4OyB3aWR0aDonXG4gICAgICAgICAgICAgICAgICAgICAgICArIGJveC53aWR0aCArICdweDsgaGVpZ2h0OicgKyBib3guaGVpZ2h0ICsgJ3B4XCI+PC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdheGlzLm4nLCBheGlzLm4pXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8ocGxvdC5nZXRQbGFjZWhvbGRlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cImF4aXNUYXJnZXRcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyBsZWZ0OidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYm94LmxlZnQgKyAncHg7IHRvcDonICsgYm94LnRvcCArICdweDsgd2lkdGg6J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyBib3gud2lkdGggKyAncHg7IGhlaWdodDonICsgYm94LmhlaWdodCArICdweFwiPjwvZGl2PicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnYXhpcy5uJywgYXhpcy5uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHBsb3QuZ2V0UGxhY2Vob2xkZXIoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGljaygoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoJy5heGlzVGFyZ2V0JyksIChpbmRleDogbnVtYmVyLCBlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuZGF0YSgnYXhpcy5uJykgPT09IGVsZW0uZGF0YSgnYXhpcy5uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZWxlbS5oYXNDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gYnJlYWsgbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocGxvdC5nZXREYXRhKCksIChpbmRleDogbnVtYmVyLCBlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5kYXRhKCdheGlzLm4nKSA9PT0gZWxlbS55YXhpcy5uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNlbGVjdGVkID0gIXNlbGVjdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25zLnB1c2goZWxlbS5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25EYXRhc2V0U2VsZWN0ZWQuZW1pdChzZWxlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWF4aXMub3B0aW9ucy5oaWRlTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHlheGlzTGFiZWwgPSAkKCc8ZGl2IGNsYXNzPVwiYXhpc0xhYmVsIHlheGlzTGFiZWxcIiBzdHlsZT1sZWZ0OidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGJveC5sZWZ0ICsgJ3B4Oz48L2Rpdj4nKS50ZXh0KGF4aXMub3B0aW9ucy5sYWJlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8ocGxvdC5nZXRQbGFjZWhvbGRlcigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdheGlzLm4nLCBheGlzLm4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMub3B0aW9ucy50c0NvbG9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChheGlzLm9wdGlvbnMudHNDb2xvcnMsIChpZHg6IG51bWJlciwgY29sb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCc8c3Bhbj4nKS5odG1sKCcmbmJzcDsmI3gyNUNGOycpLmNzcygnY29sb3InLCBjb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGFiZWxDb2xvck1hcmtlcicpLmFwcGVuZFRvKHlheGlzTGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgeWF4aXNMYWJlbC5jc3MoJ21hcmdpbi1sZWZ0JywgLTQgKyAoeWF4aXNMYWJlbC5oZWlnaHQoKSAtIHlheGlzTGFiZWwud2lkdGgoKSkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzZXQgc2VsZWN0aW9uIHRvIGF4aXNcbiAgICAgICAgICAgIHBsb3QuZ2V0RGF0YSgpLmZvckVhY2goKGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mbG90LXknICsgZWxlbS55YXhpcy5uICsgJy1heGlzJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKCcuYXhpc1RhcmdldCcpLCAoaTogbnVtYmVyLCBlbnRyeTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoZW50cnkpLmRhdGEoJ2F4aXMubicpID09PSBlbGVtLnlheGlzLm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoZW50cnkpLmhhc0NsYXNzKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZW50cnkpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoJy5heGlzVGFyZ2V0U3R5bGUnKSwgKGk6IG51bWJlciwgZW50cnk6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGVudHJ5KS5kYXRhKCdheGlzLm4nKSA9PT0gZWxlbS55YXhpcy5uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkKGVudHJ5KS5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVudHJ5KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKCcuYXhpc0xhYmVsLnlheGlzTGFiZWwnKSwgKGk6IG51bWJlciwgZW50cnk6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGVudHJ5KS5kYXRhKCdheGlzLm4nKSA9PT0gZWxlbS55YXhpcy5uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkKGVudHJ5KS5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVudHJ5KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZExvYWRlZERhdGFzZXQoZGF0YXNldDogSURhdGFzZXQpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLnNldChkYXRhc2V0LmludGVybmFsSWQsIGRhdGFzZXQpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKGRhdGFzZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZERhdGEoZGF0YXNldDogSURhdGFzZXQsIHJlZnJlc2g/OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGRhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lc3BhbiAmJiB0aGlzLnBsb3RPcHRpb25zICYmIGRhdGFzZXRPcHRpb25zLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nQ291bnRlciA9PT0gMCkgeyB0aGlzLmlzQ29udGVudExvYWRpbmcodHJ1ZSk7IH1cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRoaXMudGltZXNwYW4sIDAuMik7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgaWYgKHJlZnJlc2gpIHsgb3B0aW9ucy5mb3JjZVVwZGF0ZSA9IHJlZnJlc2g7IH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldCBpbnN0YW5jZW9mIFRpbWVzZXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0VHNEYXRhPFtudW1iZXIsIG51bWJlcl0+KGRhdGFzZXQuaWQsIGRhdGFzZXQudXJsLCBidWZmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZmxvdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucGxvdE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcyA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmFsaXplOiB0aGlzLnBsb3RPcHRpb25zLmdlbmVyYWxpemVBbGx3YXlzIHx8IGRhdGFzZXRPcHRpb25zLmdlbmVyYWxpemVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnByZXBhcmVEYXRhKGRhdGFzZXQsIHJlc3VsdCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm9uQ29tcGxldGVMb2FkaW5nRGF0YShkYXRhc2V0KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldCBpbnN0YW5jZW9mIERhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YTxbbnVtYmVyLCBudW1iZXJdPihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2Zsb3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMgPT09IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbGl6ZTogdGhpcy5wbG90T3B0aW9ucy5nZW5lcmFsaXplQWxsd2F5cyB8fCBkYXRhc2V0T3B0aW9ucy5nZW5lcmFsaXplXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5wcmVwYXJlRGF0YShkYXRhc2V0LCByZXN1bHQpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnBsb3RHcmFwaCgpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25Db21wbGV0ZUxvYWRpbmdEYXRhKGRhdGFzZXQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICghZGF0YXNldE9wdGlvbnMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJlcGFyZWREYXRhKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db21wbGV0ZUxvYWRpbmdEYXRhKGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIHRoaXMubG9hZGluZ0NvdW50ZXItLTtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvdW50ZXIgPT09IDApIHsgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKGZhbHNlKTsgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKCQoJyN0b29sdGlwJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAkKCc8ZGl2IGlkPVwidG9vbHRpcFwiPjwvZGl2PicpLmFwcGVuZFRvKCdib2R5Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dUb29sdGlwKGV2ZW50OiBhbnksIHBvczogYW55LCBpdGVtOiBhbnkpIHtcbiAgICAgICAgJCgnI3Rvb2x0aXAnKS5lbXB0eSgpO1xuICAgICAgICAkKCcjdG9vbHRpcCcpLmFwcGVuZCgnPGRpdj4nICsgaXRlbS5kYXRhcG9pbnRbMV0udG9GaXhlZCgyKSArICcgJyArIGl0ZW0uc2VyaWVzLnlheGlzLm9wdGlvbnMudW9tICsgJzwvZGl2PicpO1xuICAgICAgICAkKCcjdG9vbHRpcCcpLmFwcGVuZCgnPGRpdj4nICsgaXRlbS5zZXJpZXMueGF4aXMudGlja0Zvcm1hdHRlcihpdGVtLmRhdGFwb2ludFswXSwgaXRlbS5zZXJpZXMueGF4aXMpICsgJzwvZGl2PicpO1xuICAgICAgICBjb25zdCB0b29sdGlwID0gJCgnI3Rvb2x0aXAnKS5zaG93KCk7XG4gICAgICAgIGNvbnN0IGhhbGZ3aWR0aCA9IChldmVudC50YXJnZXQuY2xpZW50V2lkdGgpIC8gMjtcbiAgICAgICAgaWYgKGhhbGZ3aWR0aCA+PSBpdGVtLnBhZ2VYIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpIHtcbiAgICAgICAgICAgIHRvb2x0aXAuY3NzKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICB0b3A6IGl0ZW0ucGFnZVkgKyA1LFxuICAgICAgICAgICAgICAgIGxlZnQ6IGl0ZW0ucGFnZVggKyA1LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9vbHRpcC5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIHRvcDogaXRlbS5wYWdlWSArIDUsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICgkKHdpbmRvdykud2lkdGgoKSAtIGl0ZW0ucGFnZVgpLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVUb29sdGlwKCkge1xuICAgICAgICAkKCcjdG9vbHRpcCcpLmhpZGUoKTtcbiAgICB9XG59XG4iXX0=