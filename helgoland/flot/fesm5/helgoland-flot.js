import { __decorate, __metadata, __extends } from 'tslib';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, IterableDiffers, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { HasLoadableContent, Mixin, Time, Dataset, DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Timeseries, Timespan } from '@helgoland/core';
import 'Flot/jquery.flot.js';
import 'Flot/jquery.flot.time.js';
import '@helgoland/flot/jquery.flot.navigate.js';
import '@helgoland/flot/jquery.flot.selection.js';
import '@helgoland/flot/jquery.flot.touch.js';
import { LabelMapperService, HelgolandLabelMapperModule } from '@helgoland/depiction';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FlotOverviewTimeseriesGraphComponent = /** @class */ (function () {
    function FlotOverviewTimeseriesGraphComponent(timeSrvc, cd) {
        this.timeSrvc = timeSrvc;
        this.cd = cd;
        this.onTimespanChanged = new EventEmitter();
        this.onLoading = new EventEmitter();
        this.onContentLoading = new EventEmitter();
        this.init = false;
    }
    /**
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.rangefactor = this.rangefactor || 1;
        this.calculateOverviewRange();
        this.init = true;
        this.cd.detectChanges();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["timeInterval"] && this.init) {
            this.calculateOverviewRange();
        }
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.timeChanged = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        this.onTimespanChanged.emit(timespan);
    };
    /**
     * @return {?}
     */
    FlotOverviewTimeseriesGraphComponent.prototype.calculateOverviewRange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
        this.overviewTimespan = this.timeSrvc.getBufferedTimespan(timespan, this.rangefactor);
        this.graphOptions.selection.range = {
            from: timespan.from,
            to: timespan.to
        };
    };
    FlotOverviewTimeseriesGraphComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-flot-overview-timeseries-graph',
                    template: "<n52-flot-timeseries-graph [datasetIds]=\"datasetIds\" [timeInterval]=\"overviewTimespan\" [datasetOptions]=\"datasetOptions\"\n  [graphOptions]=\"graphOptions\" (onTimespanChanged)=\"timeChanged($event)\" (onContentLoading)=\"onContentLoading.emit($event)\"></n52-flot-timeseries-graph>\n",
                    styles: [":host .flot{height:100%}"]
                },] },
    ];
    /** @nocollapse */
    FlotOverviewTimeseriesGraphComponent.ctorParameters = function () { return [
        { type: Time },
        { type: ChangeDetectorRef }
    ]; };
    FlotOverviewTimeseriesGraphComponent.propDecorators = {
        datasetIds: [{ type: Input }],
        datasetOptions: [{ type: Input }],
        graphOptions: [{ type: Input }],
        timeInterval: [{ type: Input }],
        rangefactor: [{ type: Input }],
        onTimespanChanged: [{ type: Output }],
        onLoading: [{ type: Output }],
        onContentLoading: [{ type: Output }]
    };
    FlotOverviewTimeseriesGraphComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [Time,
            ChangeDetectorRef])
    ], FlotOverviewTimeseriesGraphComponent);
    return FlotOverviewTimeseriesGraphComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FlotTimeseriesGraphComponent = /** @class */ (function (_super) {
    __extends(FlotTimeseriesGraphComponent, _super);
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
        if (options.annotation) ;
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
    FlotTimeseriesGraphComponent = __decorate([
        Mixin([HasLoadableContent]),
        __metadata("design:paramtypes", [IterableDiffers,
            DatasetApiInterface,
            InternalIdHandler,
            Time,
            LabelMapperService,
            TranslateService])
    ], FlotTimeseriesGraphComponent);
    return FlotTimeseriesGraphComponent;
}(DatasetPresenterComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandFlotModule = /** @class */ (function () {
    function HelgolandFlotModule() {
    }
    HelgolandFlotModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FlotTimeseriesGraphComponent,
                        FlotOverviewTimeseriesGraphComponent
                    ],
                    imports: [
                        HelgolandLabelMapperModule
                    ],
                    exports: [
                        FlotTimeseriesGraphComponent,
                        FlotOverviewTimeseriesGraphComponent
                    ],
                    providers: []
                },] },
    ];
    return HelgolandFlotModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { HelgolandFlotModule, FlotOverviewTimeseriesGraphComponent as ɵb, FlotTimeseriesGraphComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWZsb3QuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvZmxvdC9saWIvZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2Zsb3Qtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZmxvdC9saWIvZmxvdC10aW1lc2VyaWVzLWdyYXBoL2Zsb3QtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZmxvdC9saWIvZmxvdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXRPcHRpb25zLCBIYXNMb2FkYWJsZUNvbnRlbnQsIE1peGluLCBUaW1lLCBUaW1lSW50ZXJ2YWwsIFRpbWVzcGFuIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxuNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIFtkYXRhc2V0SWRzXT1cImRhdGFzZXRJZHNcIiBbdGltZUludGVydmFsXT1cIm92ZXJ2aWV3VGltZXNwYW5cIiBbZGF0YXNldE9wdGlvbnNdPVwiZGF0YXNldE9wdGlvbnNcIlxuICBbZ3JhcGhPcHRpb25zXT1cImdyYXBoT3B0aW9uc1wiIChvblRpbWVzcGFuQ2hhbmdlZCk9XCJ0aW1lQ2hhbmdlZCgkZXZlbnQpXCIgKG9uQ29udGVudExvYWRpbmcpPVwib25Db250ZW50TG9hZGluZy5lbWl0KCRldmVudClcIj48L241Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGg+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAuZmxvdHtoZWlnaHQ6MTAwJX1gXVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBGbG90T3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEhhc0xvYWRhYmxlQ29udGVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBEYXRhc2V0T3B0aW9ucz47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBncmFwaE9wdGlvbnM6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmFuZ2VmYWN0b3I6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkxvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbnRlbnRMb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNDb250ZW50TG9hZGluZzogKGxvYWRpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBwdWJsaWMgb3ZlcnZpZXdUaW1lc3BhbjogVGltZXNwYW47XG5cbiAgICBwcml2YXRlIGluaXQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYW5nZWZhY3RvciA9IHRoaXMucmFuZ2VmYWN0b3IgfHwgMTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRpbWVJbnRlcnZhbCAmJiB0aGlzLmluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVDaGFuZ2VkKHRpbWVzcGFuOiBUaW1lc3Bhbikge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQodGltZXNwYW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlT3ZlcnZpZXdSYW5nZSgpIHtcbiAgICAgICAgY29uc3QgdGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNyZWF0ZVRpbWVzcGFuT2ZJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMub3ZlcnZpZXdUaW1lc3BhbiA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aW1lc3BhbiwgdGhpcy5yYW5nZWZhY3Rvcik7XG4gICAgICAgIHRoaXMuZ3JhcGhPcHRpb25zLnNlbGVjdGlvbi5yYW5nZSA9IHtcbiAgICAgICAgICAgIGZyb206IHRpbWVzcGFuLmZyb20sXG4gICAgICAgICAgICB0bzogdGltZXNwYW4udG9cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgJ0Zsb3QvanF1ZXJ5LmZsb3QuanMnO1xuaW1wb3J0ICdGbG90L2pxdWVyeS5mbG90LnRpbWUuanMnO1xuaW1wb3J0ICdAaGVsZ29sYW5kL2Zsb3QvanF1ZXJ5LmZsb3QubmF2aWdhdGUuanMnO1xuaW1wb3J0ICdAaGVsZ29sYW5kL2Zsb3QvanF1ZXJ5LmZsb3Quc2VsZWN0aW9uLmpzJztcbmltcG9ydCAnQGhlbGdvbGFuZC9mbG90L2pxdWVyeS5mbG90LnRvdWNoLmpzJztcblxuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGEsXG4gICAgRGF0YXNldCxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRPcHRpb25zLFxuICAgIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gICAgSGFzTG9hZGFibGVDb250ZW50LFxuICAgIEh0dHBSZXF1ZXN0T3B0aW9ucyxcbiAgICBJRGF0YXNldCxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBNaXhpbixcbiAgICBUaW1lLFxuICAgIFRpbWVzZXJpZXMsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYWJlbE1hcHBlclNlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2RlcGljdGlvbic7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuaW1wb3J0IHsgRGF0YVNlcmllcyB9IGZyb20gJy4uL21vZGVsL2RhdGFTZXJpZXMuanMnO1xuaW1wb3J0IHsgUGxvdCB9IGZyb20gJy4uL21vZGVsL3Bsb3QuanMnO1xuaW1wb3J0IHsgUGxvdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9wbG90T3B0aW9ucy5qcyc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmbG90XCIgI2Zsb3Q+PC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BuNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIC5mbG90e2hlaWdodDoxMDAlfW41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggLmF4aXNUYXJnZXR7Y3Vyc29yOnBvaW50ZXJ9bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCAuYXhpc0xhYmVse3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZTo5MCU7dGV4dC1hbGlnbjpjZW50ZXJ9bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCAueWF4aXNMYWJlbHt0b3A6NTAlO3RyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstby10cmFuc2Zvcm06cm90YXRlKC05MGRlZyk7LW1zLXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstbW96LXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTt6LWluZGV4Oi05OTk5O3BhZGRpbmctYm90dG9tOjhweH1uNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIC5sYWJlbENvbG9yTWFya2Vye2ZvbnQtc2l6ZToxNTAlfW41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggLmdyYXBoLWFubm90YXRpb257cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjQwcHg7cmlnaHQ6MTVweDtjb2xvcjpyZWR9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbkBNaXhpbihbSGFzTG9hZGFibGVDb250ZW50XSlcbmV4cG9ydCBjbGFzcyBGbG90VGltZXNlcmllc0dyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PERhdGFzZXRPcHRpb25zLCBQbG90T3B0aW9ucz5cbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uSGlnaGxpZ2h0OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Zsb3QnKVxuICAgIHB1YmxpYyBmbG90RWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgcGxvdGFyZWE6IGFueTtcblxuICAgIHByaXZhdGUgcHJlcGFyZWREYXRhOiBEYXRhU2VyaWVzW10gPSBBcnJheSgpO1xuXG4gICAgcHJpdmF0ZSBwbG90T3B0aW9uczogUGxvdE9wdGlvbnMgPSB7XG4gICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgIGF1dG9IaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICBob3ZlcmFibGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJhZGl1czogMixcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNoYWRvd1NpemU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0aW9uOiB7XG4gICAgICAgICAgICBtb2RlOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICBtb2RlOiAndGltZScsXG4gICAgICAgICAgICB0aW1lem9uZTogJ2Jyb3dzZXInLFxuICAgICAgICB9LFxuICAgICAgICB5YXhlczogW10sXG4gICAgICAgIHNob3dSZWZlcmVuY2VWYWx1ZXM6IGZhbHNlXG4gICAgfTtcblxuICAgIHByaXZhdGUgZGF0YXNldE1hcDogTWFwPHN0cmluZywgSURhdGFzZXQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSBsYXN0SGlnaHRsaWdodDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBsb2FkaW5nQ291bnRlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCBsYWJlbE1hcHBlcjogTGFiZWxNYXBwZXJTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBsb3RhcmVhID0gdGhpcy5mbG90RWxlbS5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICQodGhpcy5wbG90YXJlYSkuYmluZCgncGxvdHpvb20nLCAoZXZ0OiBhbnksIHBsb3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeGF4aXMgPSBwbG90LmdldFhBeGVzKClbMF07XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUoeGF4aXMubWluLCB4YXhpcy5tYXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBwbG90IHBhbiBlbmRlZCBldmVudFxuICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmJpbmQoJ3Bsb3RwYW5FbmQnLCAoZXZ0OiBhbnksIHBsb3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeGF4aXMgPSBwbG90LmdldFhBeGVzKClbMF07XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUoeGF4aXMubWluLCB4YXhpcy5tYXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmJpbmQoJ3RvdWNoZW5kZWQnLCAoZXZ0OiBhbnksIHBsb3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lKHBsb3QueGF4aXMuZnJvbSwgcGxvdC54YXhpcy50byk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBsb3Qgc2VsZWN0ZWQgZXZlbnRcbiAgICAgICAgJCh0aGlzLnBsb3RhcmVhKS5iaW5kKCdwbG90c2VsZWN0ZWQnLCAoZXZ0OiBhbnksIHJhbmdlczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUocmFuZ2VzLnhheGlzLmZyb20sIHJhbmdlcy54YXhpcy50byk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGhpcy5wbG90YXJlYSkuYmluZCgncGxvdGhvdmVyJywgKGV2dDogYW55LCBwb3M6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IaWdobGlnaHQuZW1pdChpdGVtLnNlcmllcy5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUb29sdGlwKGV2dCwgcG9zLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodC5lbWl0KCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVUb29sdGlwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbHRpcCgpO1xuXG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7IH1cblxuICAgIHB1YmxpYyByZWxvYWREYXRhRm9yRGF0YXNldHMoZGF0YXNldElkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlbG9hZCBkYXRhIGF0ICcgKyBuZXcgRGF0ZSgpKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0SWRzLmZvckVhY2goaWQgPT4gdGhpcy5sb2FkRGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGlkKSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBncmFwaE9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IFBsb3RPcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wbG90T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGxvdE9wdGlvbnMueWF4ZXMgPSBbXTtcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWxDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIHRzRGF0YS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRzRGF0YS5wb2ludHMucmFkaXVzICo9IDM7XG4gICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggKj0gMztcbiAgICAgICAgdHNEYXRhLmJhcnMubGluZVdpZHRoICo9IDM7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRzRGF0YSA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIHRzRGF0YS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0c0RhdGEucG9pbnRzLnJhZGl1cyAvPSAzO1xuICAgICAgICB0c0RhdGEubGluZXMubGluZVdpZHRoIC89IDM7XG4gICAgICAgIHRzRGF0YS5iYXJzLmxpbmVXaWR0aCAvPSAzO1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShkYXRhc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJlcGFyZWREYXRhKGludGVybmFsSWQpO1xuICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllcyhpbnRlcm5hbElkLCB1cmwpLnN1YnNjcmliZShcbiAgICAgICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLmFkZExvYWRlZERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KGludGVybmFsSWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YXNldCkgPT4gdGhpcy5hZGRMb2FkZWREYXRhc2V0KGRhdGFzZXQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldE1hcC5oYXMoaW50ZXJuYWxJZCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhc2V0TWFwLmdldChpbnRlcm5hbElkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5DaGFuZ2VkLmVtaXQobmV3IFRpbWVzcGFuKGZyb20sIHRvKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbG90R3JhcGgoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXBhcmVkRGF0YVxuICAgICAgICAgICAgJiYgdGhpcy5wbG90YXJlYVxuICAgICAgICAgICAgJiYgdGhpcy5wcmVwYXJlZERhdGEubGVuZ3RoICE9PSAwXG4gICAgICAgICAgICAmJiB0aGlzLnBsb3RPcHRpb25zXG4gICAgICAgICAgICAmJiB0aGlzLnBsb3RhcmVhLmNsaWVudEhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUF4aXNQb3MoKTtcbiAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMueGF4aXMubWluID0gdGhpcy50aW1lc3Bhbi5mcm9tO1xuICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucy54YXhpcy5tYXggPSB0aGlzLnRpbWVzcGFuLnRvO1xuICAgICAgICAgICAgY29uc3QgcGxvdE9iajogUGxvdCA9ICQucGxvdCh0aGlzLnBsb3RhcmVhLCB0aGlzLnByZXBhcmVkRGF0YSwgdGhpcy5wbG90T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBsb3RBbm5vdGF0aW9uKHRoaXMucGxvdGFyZWEsIHRoaXMucGxvdE9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVZQXhpcyhwbG90T2JqKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHBsb3RPYmosIHRoaXMucGxvdE9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxvdGFyZWEpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVByZXBhcmVkRGF0YShpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGZyb20gcHJlcGFyZWREYXRhIEFycmF5XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWQgPT09IGludGVybmFsSWQpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHsgdGhpcy5wcmVwYXJlZERhdGEuc3BsaWNlKGlkeCwgMSk7IH1cbiAgICAgICAgLy8gcmVtb3ZlIGZyb20gYXhpc1xuICAgICAgICBjb25zdCBheGlzSWR4ID0gdGhpcy5wbG90T3B0aW9ucy55YXhlcy5maW5kSW5kZXgoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcm5hbElkSW5kZXggPSBlbnRyeS5pbnRlcm5hbElkcy5pbmRleE9mKGludGVybmFsSWQpO1xuICAgICAgICAgICAgaWYgKGludGVybmFsSWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmludGVybmFsSWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5pbnRlcm5hbElkcy5zcGxpY2UoaW50ZXJuYWxJZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkudHNDb2xvcnMuc3BsaWNlKGludGVybmFsSWRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGF4aXNJZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucy55YXhlcy5zcGxpY2UoYXhpc0lkeCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVEYXRhKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBEYXRhPFtudW1iZXIsIG51bWJlcl0+KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhSWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlKSA9PiBlLmludGVybmFsSWQgPT09IGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQXhpc0xhYmVsKGRhdGFzZXQpLnN1YnNjcmliZSgobGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXhlUG9zO1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4ZSA9IHRoaXMucGxvdE9wdGlvbnMueWF4ZXMuZmluZCgoeWF4aXNFbnRyeSwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGF4ZVBvcyA9IGlkeCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5YXhpc0VudHJ5LmxhYmVsID09PSBsYWJlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXhlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGUuaW50ZXJuYWxJZHMuaW5kZXhPZihkYXRhc2V0LmludGVybmFsSWQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXhlLmludGVybmFsSWRzLnB1c2goZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4ZS50c0NvbG9ycy5wdXNoKHN0eWxlcy5jb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBheGUudHNDb2xvcnNbYXhlLmludGVybmFsSWRzLmluZGV4T2YoZGF0YXNldC5pbnRlcm5hbElkKV0gPSBzdHlsZXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXhlLm1pbiA9IHN0eWxlcy56ZXJvQmFzZWRZQXhpcyA/IDAgOiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxvdE9wdGlvbnMueWF4ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1b206IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0c0NvbG9yczogW3N0eWxlcy5jb2xvcl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkczogW2RhdGFzZXQuaW50ZXJuYWxJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IHN0eWxlcy56ZXJvQmFzZWRZQXhpcyA/IDAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBheGVQb3MgPSB0aGlzLnBsb3RPcHRpb25zLnlheGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YUVudHJ5OiBEYXRhU2VyaWVzID0ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiBkYXRhc2V0LmludGVybmFsSWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdHlsZXMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHN0eWxlcy52aXNpYmxlID8gZGF0YS52YWx1ZXMgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHN0eWxlcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogc3R5bGVzLnBvaW50UmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogc3R5bGVzLnBvaW50UmFkaXVzID4gMCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiBzdHlsZXMubGluZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogc3R5bGVzLmxpbmVXaWR0aCA+IDAgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmFyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhRW50cnkucG9pbnRzLnJhZGl1cyAqPSAzO1xuICAgICAgICAgICAgICAgICAgICBkYXRhRW50cnkubGluZXMubGluZVdpZHRoICo9IDM7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5iYXJzLmxpbmVXaWR0aCAqPSAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YUlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhW2RhdGFJZHhdID0gZGF0YUVudHJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2goZGF0YUVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZWZlcmVuY2VWYWx1ZURhdGEoZGF0YXNldC5pbnRlcm5hbElkLCBzdHlsZXMsIGRhdGEpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRSZWZlcmVuY2VWYWx1ZURhdGEoaW50ZXJuYWxJZDogc3RyaW5nLCBzdHlsZXM6IERhdGFzZXRPcHRpb25zLCBkYXRhOiBEYXRhPFtudW1iZXIsIG51bWJlcl0+KSB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFlbnRyeS5pbnRlcm5hbElkLnN0YXJ0c1dpdGgoJ3JlZicgKyBpbnRlcm5hbElkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgIHN0eWxlcy5zaG93UmVmZXJlbmNlVmFsdWVzLmZvckVhY2goKHJlZlZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmRGF0YUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiAncmVmJyArIGludGVybmFsSWQgKyByZWZWYWx1ZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZlZhbHVlLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLnJlZmVyZW5jZVZhbHVlc1tyZWZWYWx1ZS5pZF0sXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiByZWZWYWx1ZS5jb2xvclxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5wdXNoKHJlZkRhdGFFbnRyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUF4aXNQb3MoKSB7XG4gICAgICAgIC8vIHJlbW92ZSB1bnVzZWQgYXhlc1xuICAgICAgICB0aGlzLnBsb3RPcHRpb25zLnlheGVzID0gdGhpcy5wbG90T3B0aW9ucy55YXhlcy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pbnRlcm5hbElkcy5sZW5ndGggIT09IDApO1xuICAgICAgICB0aGlzLnBsb3RPcHRpb25zLnlheGVzLmZvckVhY2goKHhheGlzLCBpZHgpID0+IHtcbiAgICAgICAgICAgIHhheGlzLmludGVybmFsSWRzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IHRoaXMucHJlcGFyZWREYXRhLmZpbmQoKGRhdGFFbnRyeSkgPT4gZGF0YUVudHJ5LmludGVybmFsSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICB0ZW1wLnlheGlzID0gaWR4ICsgMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUF4aXNMYWJlbChkYXRhc2V0OiBJRGF0YXNldCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVsTWFwcGVyLmdldE1hcHBlZExhYmVsKGRhdGFzZXQucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsKVxuICAgICAgICAgICAgLm1hcCgobGFiZWwpID0+IGxhYmVsICsgJyBbJyArIGRhdGFzZXQudW9tICsgJ10nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNlbGVjdGlvbihwbG90OiBQbG90LCBvcHRpb25zOiBQbG90T3B0aW9ucykge1xuICAgICAgICBpZiAocGxvdCAmJiBvcHRpb25zLnNlbGVjdGlvbi5yYW5nZSkge1xuICAgICAgICAgICAgcGxvdC5zZXRTZWxlY3Rpb24oe1xuICAgICAgICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyb206IG9wdGlvbnMuc2VsZWN0aW9uLnJhbmdlLmZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvOiBvcHRpb25zLnNlbGVjdGlvbi5yYW5nZS50b1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQbG90QW5ub3RhdGlvbihwbG90QXJlYTogYW55LCBvcHRpb25zOiBQbG90T3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICAvLyBwbG90QXJlYS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJncmFwaC1hbm5vdGF0aW9uXCI+RGF0ZW4gb2huZSBHZXfDg8KkaHI8L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlWUF4aXMocGxvdDogUGxvdCkge1xuICAgICAgICBpZiAocGxvdC5nZXRPcHRpb25zKCkueWF4aXMuc2hvdykge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBsYWJlbHNcbiAgICAgICAgICAgICQocGxvdC5nZXRQbGFjZWhvbGRlcigpKS5maW5kKCcueWF4aXNMYWJlbCcpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGVZQXhpc1xuICAgICAgICAgICAgJC5lYWNoKHBsb3QuZ2V0QXhlcygpLCAoaTogbnVtYmVyLCBheGlzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWF4aXMuc2hvdykgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBheGlzLmJveDtcbiAgICAgICAgICAgICAgICBpZiAoYXhpcy5kaXJlY3Rpb24gPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiYXhpc1RhcmdldFN0eWxlXCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgbGVmdDonXG4gICAgICAgICAgICAgICAgICAgICAgICArIGJveC5sZWZ0ICsgJ3B4OyB0b3A6JyArIGJveC50b3AgKyAncHg7IHdpZHRoOidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYm94LndpZHRoICsgJ3B4OyBoZWlnaHQ6JyArIGJveC5oZWlnaHQgKyAncHhcIj48L2Rpdj4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2F4aXMubicsIGF4aXMubilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhwbG90LmdldFBsYWNlaG9sZGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiYXhpc1RhcmdldFwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IGxlZnQ6J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyBib3gubGVmdCArICdweDsgdG9wOicgKyBib3gudG9wICsgJ3B4OyB3aWR0aDonXG4gICAgICAgICAgICAgICAgICAgICAgICArIGJveC53aWR0aCArICdweDsgaGVpZ2h0OicgKyBib3guaGVpZ2h0ICsgJ3B4XCI+PC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdheGlzLm4nLCBheGlzLm4pXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8ocGxvdC5nZXRQbGFjZWhvbGRlcigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goJCgnLmF4aXNUYXJnZXQnKSwgKGluZGV4OiBudW1iZXIsIGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5kYXRhKCdheGlzLm4nKSA9PT0gZWxlbS5kYXRhKCdheGlzLm4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBlbGVtLmhhc0NsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBicmVhayBsb29wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChwbG90LmdldERhdGEoKSwgKGluZGV4OiBudW1iZXIsIGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmRhdGEoJ2F4aXMubicpID09PSBlbGVtLnlheGlzLm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2VsZWN0ZWQgPSAhc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbnMucHVzaChlbGVtLmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFzZXRTZWxlY3RlZC5lbWl0KHNlbGVjdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYXhpcy5vcHRpb25zLmhpZGVMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeWF4aXNMYWJlbCA9ICQoJzxkaXYgY2xhc3M9XCJheGlzTGFiZWwgeWF4aXNMYWJlbFwiIHN0eWxlPWxlZnQ6J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgYm94LmxlZnQgKyAncHg7PjwvZGl2PicpLnRleHQoYXhpcy5vcHRpb25zLmxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhwbG90LmdldFBsYWNlaG9sZGVyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2F4aXMubicsIGF4aXMubik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcy5vcHRpb25zLnRzQ29sb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGF4aXMub3B0aW9ucy50c0NvbG9ycywgKGlkeDogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJzxzcGFuPicpLmh0bWwoJyZuYnNwOyYjeDI1Q0Y7JykuY3NzKCdjb2xvcicsIGNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsYWJlbENvbG9yTWFya2VyJykuYXBwZW5kVG8oeWF4aXNMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB5YXhpc0xhYmVsLmNzcygnbWFyZ2luLWxlZnQnLCAtNCArICh5YXhpc0xhYmVsLmhlaWdodCgpIC0geWF4aXNMYWJlbC53aWR0aCgpKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNldCBzZWxlY3Rpb24gdG8gYXhpc1xuICAgICAgICAgICAgcGxvdC5nZXREYXRhKCkuZm9yRWFjaCgoZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZsb3QteScgKyBlbGVtLnlheGlzLm4gKyAnLWF4aXMnKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoJy5heGlzVGFyZ2V0JyksIChpOiBudW1iZXIsIGVudHJ5OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChlbnRyeSkuZGF0YSgnYXhpcy5uJykgPT09IGVsZW0ueWF4aXMubikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJChlbnRyeSkuaGFzQ2xhc3MoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbnRyeSkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goJCgnLmF4aXNUYXJnZXRTdHlsZScpLCAoaTogbnVtYmVyLCBlbnRyeTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoZW50cnkpLmRhdGEoJ2F4aXMubicpID09PSBlbGVtLnlheGlzLm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoZW50cnkpLmhhc0NsYXNzKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZW50cnkpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoJy5heGlzTGFiZWwueWF4aXNMYWJlbCcpLCAoaTogbnVtYmVyLCBlbnRyeTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoZW50cnkpLmRhdGEoJ2F4aXMubicpID09PSBlbGVtLnlheGlzLm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoZW50cnkpLmhhc0NsYXNzKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZW50cnkpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTG9hZGVkRGF0YXNldChkYXRhc2V0OiBJRGF0YXNldCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRNYXAuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgZGF0YXNldCk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoZGF0YXNldCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRGF0YShkYXRhc2V0OiBJRGF0YXNldCwgcmVmcmVzaD86IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgZGF0YXNldE9wdGlvbnMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICBpZiAoZGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVzcGFuICYmIHRoaXMucGxvdE9wdGlvbnMgJiYgZGF0YXNldE9wdGlvbnMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmdDb3VudGVyID09PSAwKSB7IHRoaXMuaXNDb250ZW50TG9hZGluZyh0cnVlKTsgfVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLnRpbWVTcnZjLmdldEJ1ZmZlcmVkVGltZXNwYW4odGhpcy50aW1lc3BhbiwgMC4yKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAocmVmcmVzaCkgeyBvcHRpb25zLmZvcmNlVXBkYXRlID0gcmVmcmVzaDsgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhc2V0IGluc3RhbmNlb2YgVGltZXNlcmllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXRUc0RhdGE8W251bWJlciwgbnVtYmVyXT4oZGF0YXNldC5pZCwgZGF0YXNldC51cmwsIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdmbG90JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogdGhpcy5wbG90T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzID09PSB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYWxpemU6IHRoaXMucGxvdE9wdGlvbnMuZ2VuZXJhbGl6ZUFsbHdheXMgfHwgZGF0YXNldE9wdGlvbnMuZ2VuZXJhbGl6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICApLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMucHJlcGFyZURhdGEoZGF0YXNldCwgcmVzdWx0KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4gdGhpcy5vbkVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25Db21wbGV0ZUxvYWRpbmdEYXRhKGRhdGFzZXQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhc2V0IGluc3RhbmNlb2YgRGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhPFtudW1iZXIsIG51bWJlcl0+KGRhdGFzZXQuaWQsIGRhdGFzZXQudXJsLCBidWZmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZmxvdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHRoaXMucGxvdE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcyA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmFsaXplOiB0aGlzLnBsb3RPcHRpb25zLmdlbmVyYWxpemVBbGx3YXlzIHx8IGRhdGFzZXRPcHRpb25zLmdlbmVyYWxpemVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB0aGlzLnByZXBhcmVEYXRhKGRhdGFzZXQsIHJlc3VsdCkuc3Vic2NyaWJlKCgpID0+IHRoaXMucGxvdEdyYXBoKCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkNvbXBsZXRlTG9hZGluZ0RhdGEoZGF0YXNldClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFkYXRhc2V0T3B0aW9ucy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQcmVwYXJlZERhdGEoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlTG9hZGluZ0RhdGEoZGF0YXNldDogSURhdGFzZXQpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlci0tO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nQ291bnRlciA9PT0gMCkgeyB0aGlzLmlzQ29udGVudExvYWRpbmcoZmFsc2UpOyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVUb29sdGlwKCkge1xuICAgICAgICBpZiAoJCgnI3Rvb2x0aXAnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICQoJzxkaXYgaWQ9XCJ0b29sdGlwXCI+PC9kaXY+JykuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1Rvb2x0aXAoZXZlbnQ6IGFueSwgcG9zOiBhbnksIGl0ZW06IGFueSkge1xuICAgICAgICAkKCcjdG9vbHRpcCcpLmVtcHR5KCk7XG4gICAgICAgICQoJyN0b29sdGlwJykuYXBwZW5kKCc8ZGl2PicgKyBpdGVtLmRhdGFwb2ludFsxXS50b0ZpeGVkKDIpICsgJyAnICsgaXRlbS5zZXJpZXMueWF4aXMub3B0aW9ucy51b20gKyAnPC9kaXY+Jyk7XG4gICAgICAgICQoJyN0b29sdGlwJykuYXBwZW5kKCc8ZGl2PicgKyBpdGVtLnNlcmllcy54YXhpcy50aWNrRm9ybWF0dGVyKGl0ZW0uZGF0YXBvaW50WzBdLCBpdGVtLnNlcmllcy54YXhpcykgKyAnPC9kaXY+Jyk7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSAkKCcjdG9vbHRpcCcpLnNob3coKTtcbiAgICAgICAgY29uc3QgaGFsZndpZHRoID0gKGV2ZW50LnRhcmdldC5jbGllbnRXaWR0aCkgLyAyO1xuICAgICAgICBpZiAoaGFsZndpZHRoID49IGl0ZW0ucGFnZVggLSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkge1xuICAgICAgICAgICAgdG9vbHRpcC5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIHRvcDogaXRlbS5wYWdlWSArIDUsXG4gICAgICAgICAgICAgICAgbGVmdDogaXRlbS5wYWdlWCArIDUsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b29sdGlwLmNzcyh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgdG9wOiBpdGVtLnBhZ2VZICsgNSxcbiAgICAgICAgICAgICAgICByaWdodDogKCQod2luZG93KS53aWR0aCgpIC0gaXRlbS5wYWdlWCksXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZVRvb2x0aXAoKSB7XG4gICAgICAgICQoJyN0b29sdGlwJykuaGlkZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWxnb2xhbmRMYWJlbE1hcHBlck1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvZGVwaWN0aW9uJztcblxuaW1wb3J0IHtcbiAgRmxvdE92ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxufSBmcm9tICcuL2Zsb3Qtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC9mbG90LW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEZsb3RUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2Zsb3QtdGltZXNlcmllcy1ncmFwaC9mbG90LXRpbWVzZXJpZXMtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRmxvdFRpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgICBGbG90T3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBGbG90VGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICAgIEZsb3RPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEhlbGdvbGFuZEZsb3RNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0RJLDhDQUNjLFFBQWMsRUFDZCxFQUFxQjtRQURyQixhQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2QsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7aUNBaEJnQixJQUFJLFlBQVksRUFBRTt5QkFHM0IsSUFBSSxZQUFZLEVBQUU7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