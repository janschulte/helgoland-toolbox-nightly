(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@helgoland/core'), require('Flot/jquery.flot.js'), require('Flot/jquery.flot.time.js'), require('@helgoland/flot/jquery.flot.navigate.js'), require('@helgoland/flot/jquery.flot.selection.js'), require('@helgoland/flot/jquery.flot.touch.js'), require('@helgoland/depiction'), require('@ngx-translate/core'), require('rxjs/Observable')) :
    typeof define === 'function' && define.amd ? define('@helgoland/flot', ['exports', '@angular/core', '@helgoland/core', 'Flot/jquery.flot.js', 'Flot/jquery.flot.time.js', '@helgoland/flot/jquery.flot.navigate.js', '@helgoland/flot/jquery.flot.selection.js', '@helgoland/flot/jquery.flot.touch.js', '@helgoland/depiction', '@ngx-translate/core', 'rxjs/Observable'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.flot = {}),global.ng.core,null,null,null,null,null,null,null,null,global.rxjs.Observable));
}(this, (function (exports,core,core$1,jquery_flot_js,jquery_flot_time_js,jquery_flot_navigate_js,jquery_flot_selection_js,jquery_flot_touch_js,depiction,core$2,Observable) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlotOverviewTimeseriesGraphComponent = (function () {
        function FlotOverviewTimeseriesGraphComponent(timeSrvc, cd) {
            this.timeSrvc = timeSrvc;
            this.cd = cd;
            this.onTimespanChanged = new core.EventEmitter();
            this.onLoading = new core.EventEmitter();
            this.onContentLoading = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'n52-flot-overview-timeseries-graph',
                        template: "<n52-flot-timeseries-graph [datasetIds]=\"datasetIds\" [timeInterval]=\"overviewTimespan\" [datasetOptions]=\"datasetOptions\"\n  [graphOptions]=\"graphOptions\" (onTimespanChanged)=\"timeChanged($event)\" (onContentLoading)=\"onContentLoading.emit($event)\"></n52-flot-timeseries-graph>\n",
                        styles: [":host .flot{height:100%}"]
                    },] },
        ];
        /** @nocollapse */
        FlotOverviewTimeseriesGraphComponent.ctorParameters = function () {
            return [
                { type: core$1.Time },
                { type: core.ChangeDetectorRef }
            ];
        };
        FlotOverviewTimeseriesGraphComponent.propDecorators = {
            datasetIds: [{ type: core.Input }],
            datasetOptions: [{ type: core.Input }],
            graphOptions: [{ type: core.Input }],
            timeInterval: [{ type: core.Input }],
            rangefactor: [{ type: core.Input }],
            onTimespanChanged: [{ type: core.Output }],
            onLoading: [{ type: core.Output }],
            onContentLoading: [{ type: core.Output }]
        };
        FlotOverviewTimeseriesGraphComponent = __decorate([
            core$1.Mixin([core$1.HasLoadableContent]),
            __metadata("design:paramtypes", [core$1.Time,
                core.ChangeDetectorRef])
        ], FlotOverviewTimeseriesGraphComponent);
        return FlotOverviewTimeseriesGraphComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlotTimeseriesGraphComponent = (function (_super) {
        __extends(FlotTimeseriesGraphComponent, _super);
        function FlotTimeseriesGraphComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, labelMapper, translateSrvc) {
            var _this = _super.call(this, iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) || this;
            _this.iterableDiffers = iterableDiffers;
            _this.api = api;
            _this.datasetIdResolver = datasetIdResolver;
            _this.timeSrvc = timeSrvc;
            _this.labelMapper = labelMapper;
            _this.translateSrvc = translateSrvc;
            _this.onHighlight = new core.EventEmitter();
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
                this.onTimespanChanged.emit(new core$1.Timespan(from, to));
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
                return Observable.Observable.create(function (observer) {
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
                        if (dataset instanceof core$1.Timeseries) {
                            this.api.getTsData(dataset.id, dataset.url, buffer, {
                                format: 'flot',
                                expanded: this.plotOptions.showReferenceValues === true,
                                generalize: this.plotOptions.generalizeAllways || datasetOptions.generalize
                            }, options).subscribe(function (result) {
                                return _this.prepareData(dataset, result).subscribe(function () {
                                    _this.plotGraph();
                                });
                            }, function (error) { return _this.onError(error); }, function () { return _this.onCompleteLoadingData(dataset); });
                        }
                        if (dataset instanceof core$1.Dataset) {
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
            { type: core.Component, args: [{
                        selector: 'n52-flot-timeseries-graph',
                        template: "<div class=\"flot\" #flot></div>\n",
                        styles: ["n52-flot-timeseries-graph .flot{height:100%}n52-flot-timeseries-graph .axisTarget{cursor:pointer}n52-flot-timeseries-graph .axisLabel{position:absolute;font-size:90%;text-align:center}n52-flot-timeseries-graph .yaxisLabel{top:50%;transform:rotate(-90deg);-o-transform:rotate(-90deg);-ms-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);z-index:-9999;padding-bottom:8px}n52-flot-timeseries-graph .labelColorMarker{font-size:150%}n52-flot-timeseries-graph .graph-annotation{position:absolute;bottom:40px;right:15px;color:red}"],
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        FlotTimeseriesGraphComponent.ctorParameters = function () {
            return [
                { type: core.IterableDiffers },
                { type: core$1.DatasetApiInterface },
                { type: core$1.InternalIdHandler },
                { type: core$1.Time },
                { type: depiction.LabelMapperService },
                { type: core$2.TranslateService }
            ];
        };
        FlotTimeseriesGraphComponent.propDecorators = {
            onHighlight: [{ type: core.Output }],
            flotElem: [{ type: core.ViewChild, args: ['flot',] }]
        };
        FlotTimeseriesGraphComponent = __decorate([
            core$1.Mixin([core$1.HasLoadableContent]),
            __metadata("design:paramtypes", [core.IterableDiffers,
                core$1.DatasetApiInterface,
                core$1.InternalIdHandler,
                core$1.Time,
                depiction.LabelMapperService,
                core$2.TranslateService])
        ], FlotTimeseriesGraphComponent);
        return FlotTimeseriesGraphComponent;
    }(core$1.DatasetPresenterComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandFlotModule = (function () {
        function HelgolandFlotModule() {
        }
        HelgolandFlotModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            FlotTimeseriesGraphComponent,
                            FlotOverviewTimeseriesGraphComponent
                        ],
                        imports: [
                            depiction.HelgolandLabelMapperModule
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

    exports.HelgolandFlotModule = HelgolandFlotModule;
    exports.ɵb = FlotOverviewTimeseriesGraphComponent;
    exports.ɵa = FlotTimeseriesGraphComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWZsb3QudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0BoZWxnb2xhbmQvZmxvdC9saWIvZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2Zsb3Qtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZmxvdC9saWIvZmxvdC10aW1lc2VyaWVzLWdyYXBoL2Zsb3QtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvZmxvdC9saWIvZmxvdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMsIEhhc0xvYWRhYmxlQ29udGVudCwgTWl4aW4sIFRpbWUsIFRpbWVJbnRlcnZhbCwgVGltZXNwYW4gfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1mbG90LW92ZXJ2aWV3LXRpbWVzZXJpZXMtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPG41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggW2RhdGFzZXRJZHNdPVwiZGF0YXNldElkc1wiIFt0aW1lSW50ZXJ2YWxdPVwib3ZlcnZpZXdUaW1lc3BhblwiIFtkYXRhc2V0T3B0aW9uc109XCJkYXRhc2V0T3B0aW9uc1wiXG4gIFtncmFwaE9wdGlvbnNdPVwiZ3JhcGhPcHRpb25zXCIgKG9uVGltZXNwYW5DaGFuZ2VkKT1cInRpbWVDaGFuZ2VkKCRldmVudClcIiAob25Db250ZW50TG9hZGluZyk9XCJvbkNvbnRlbnRMb2FkaW5nLmVtaXQoJGV2ZW50KVwiPjwvbjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaD5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC5mbG90e2hlaWdodDoxMDAlfWBdXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIEZsb3RPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgSGFzTG9hZGFibGVDb250ZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRJZHM6IHN0cmluZ1tdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IE1hcDxzdHJpbmcsIERhdGFzZXRPcHRpb25zPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdyYXBoT3B0aW9uczogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByYW5nZWZhY3RvcjogbnVtYmVyO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZXNwYW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uTG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIHB1YmxpYyBvdmVydmlld1RpbWVzcGFuOiBUaW1lc3BhbjtcblxuICAgIHByaXZhdGUgaW5pdCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJhbmdlZmFjdG9yID0gdGhpcy5yYW5nZWZhY3RvciB8fCAxO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZU92ZXJ2aWV3UmFuZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsICYmIHRoaXMuaW5pdCkge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVPdmVydmlld1JhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZUNoYW5nZWQodGltZXNwYW46IFRpbWVzcGFuKSB7XG4gICAgICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZWQuZW1pdCh0aW1lc3Bhbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVPdmVydmlld1JhbmdlKCkge1xuICAgICAgICBjb25zdCB0aW1lc3BhbiA9IHRoaXMudGltZVNydmMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRoaXMudGltZUludGVydmFsKTtcbiAgICAgICAgdGhpcy5vdmVydmlld1RpbWVzcGFuID0gdGhpcy50aW1lU3J2Yy5nZXRCdWZmZXJlZFRpbWVzcGFuKHRpbWVzcGFuLCB0aGlzLnJhbmdlZmFjdG9yKTtcbiAgICAgICAgdGhpcy5ncmFwaE9wdGlvbnMuc2VsZWN0aW9uLnJhbmdlID0ge1xuICAgICAgICAgICAgZnJvbTogdGltZXNwYW4uZnJvbSxcbiAgICAgICAgICAgIHRvOiB0aW1lc3Bhbi50b1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCAnRmxvdC9qcXVlcnkuZmxvdC5qcyc7XG5pbXBvcnQgJ0Zsb3QvanF1ZXJ5LmZsb3QudGltZS5qcyc7XG5pbXBvcnQgJ0BoZWxnb2xhbmQvZmxvdC9qcXVlcnkuZmxvdC5uYXZpZ2F0ZS5qcyc7XG5pbXBvcnQgJ0BoZWxnb2xhbmQvZmxvdC9qcXVlcnkuZmxvdC5zZWxlY3Rpb24uanMnO1xuaW1wb3J0ICdAaGVsZ29sYW5kL2Zsb3QvanF1ZXJ5LmZsb3QudG91Y2guanMnO1xuXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YSxcbiAgICBEYXRhc2V0LFxuICAgIERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgRGF0YXNldE9wdGlvbnMsXG4gICAgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudCxcbiAgICBIYXNMb2FkYWJsZUNvbnRlbnQsXG4gICAgSHR0cFJlcXVlc3RPcHRpb25zLFxuICAgIElEYXRhc2V0LFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIE1peGluLFxuICAgIFRpbWUsXG4gICAgVGltZXNlcmllcyxcbiAgICBUaW1lc3Bhbixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhYmVsTWFwcGVyU2VydmljZSB9IGZyb20gJ0BoZWxnb2xhbmQvZGVwaWN0aW9uJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5pbXBvcnQgeyBEYXRhU2VyaWVzIH0gZnJvbSAnLi4vbW9kZWwvZGF0YVNlcmllcy5qcyc7XG5pbXBvcnQgeyBQbG90IH0gZnJvbSAnLi4vbW9kZWwvcGxvdC5qcyc7XG5pbXBvcnQgeyBQbG90T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL3Bsb3RPcHRpb25zLmpzJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGgnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZsb3RcIiAjZmxvdD48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYG41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggLmZsb3R7aGVpZ2h0OjEwMCV9bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCAuYXhpc1RhcmdldHtjdXJzb3I6cG9pbnRlcn1uNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIC5heGlzTGFiZWx7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjkwJTt0ZXh0LWFsaWduOmNlbnRlcn1uNTItZmxvdC10aW1lc2VyaWVzLWdyYXBoIC55YXhpc0xhYmVse3RvcDo1MCU7dHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpOy1vLXRyYW5zZm9ybTpyb3RhdGUoLTkwZGVnKTstbXMtdHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpOy1tb3otdHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtOTBkZWcpO3otaW5kZXg6LTk5OTk7cGFkZGluZy1ib3R0b206OHB4fW41Mi1mbG90LXRpbWVzZXJpZXMtZ3JhcGggLmxhYmVsQ29sb3JNYXJrZXJ7Zm9udC1zaXplOjE1MCV9bjUyLWZsb3QtdGltZXNlcmllcy1ncmFwaCAuZ3JhcGgtYW5ub3RhdGlvbntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NDBweDtyaWdodDoxNXB4O2NvbG9yOnJlZH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuQE1peGluKFtIYXNMb2FkYWJsZUNvbnRlbnRdKVxuZXhwb3J0IGNsYXNzIEZsb3RUaW1lc2VyaWVzR3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8RGF0YXNldE9wdGlvbnMsIFBsb3RPcHRpb25zPlxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25IaWdobGlnaHQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZmxvdCcpXG4gICAgcHVibGljIGZsb3RFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBwbG90YXJlYTogYW55O1xuXG4gICAgcHJpdmF0ZSBwcmVwYXJlZERhdGE6IERhdGFTZXJpZXNbXSA9IEFycmF5KCk7XG5cbiAgICBwcml2YXRlIHBsb3RPcHRpb25zOiBQbG90T3B0aW9ucyA9IHtcbiAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgYXV0b0hpZ2hsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAyLFxuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hhZG93U2l6ZTogMVxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3Rpb246IHtcbiAgICAgICAgICAgIG1vZGU6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgIG1vZGU6ICd0aW1lJyxcbiAgICAgICAgICAgIHRpbWV6b25lOiAnYnJvd3NlcicsXG4gICAgICAgIH0sXG4gICAgICAgIHlheGVzOiBbXSxcbiAgICAgICAgc2hvd1JlZmVyZW5jZVZhbHVlczogZmFsc2VcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBkYXRhc2V0TWFwOiBNYXA8c3RyaW5nLCBJRGF0YXNldD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIGxhc3RIaWdodGxpZ2h0OiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGxvYWRpbmdDb3VudGVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIGxhYmVsTWFwcGVyOiBMYWJlbE1hcHBlclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMucGxvdGFyZWEgPSB0aGlzLmZsb3RFbGVtLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgJCh0aGlzLnBsb3RhcmVhKS5iaW5kKCdwbG90em9vbScsIChldnQ6IGFueSwgcGxvdDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4YXhpcyA9IHBsb3QuZ2V0WEF4ZXMoKVswXTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh4YXhpcy5taW4sIHhheGlzLm1heCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBsb3QgcGFuIGVuZGVkIGV2ZW50XG4gICAgICAgICQodGhpcy5wbG90YXJlYSkuYmluZCgncGxvdHBhbkVuZCcsIChldnQ6IGFueSwgcGxvdDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4YXhpcyA9IHBsb3QuZ2V0WEF4ZXMoKVswXTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZSh4YXhpcy5taW4sIHhheGlzLm1heCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGhpcy5wbG90YXJlYSkuYmluZCgndG91Y2hlbmRlZCcsIChldnQ6IGFueSwgcGxvdDogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWUocGxvdC54YXhpcy5mcm9tLCBwbG90LnhheGlzLnRvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcGxvdCBzZWxlY3RlZCBldmVudFxuICAgICAgICAkKHRoaXMucGxvdGFyZWEpLmJpbmQoJ3Bsb3RzZWxlY3RlZCcsIChldnQ6IGFueSwgcmFuZ2VzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZShyYW5nZXMueGF4aXMuZnJvbSwgcmFuZ2VzLnhheGlzLnRvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCh0aGlzLnBsb3RhcmVhKS5iaW5kKCdwbG90aG92ZXInLCAoZXZ0OiBhbnksIHBvczogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodC5lbWl0KGl0ZW0uc2VyaWVzLmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoZXZ0LCBwb3MsIGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlnaGxpZ2h0LmVtaXQoJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRvb2x0aXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVUb29sdGlwKCk7XG5cbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHsgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMuZm9yRWFjaChpZCA9PiB0aGlzLmxvYWREYXRhKHRoaXMuZGF0YXNldE1hcC5nZXQoaWQpLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdyYXBoT3B0aW9uc0NoYW5nZWQob3B0aW9uczogUGxvdE9wdGlvbnMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnBsb3RPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wbG90T3B0aW9ucy55YXhlcyA9IFtdO1xuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdHNEYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKTtcbiAgICAgICAgdHNEYXRhLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdHNEYXRhLnBvaW50cy5yYWRpdXMgKj0gMztcbiAgICAgICAgdHNEYXRhLmxpbmVzLmxpbmVXaWR0aCAqPSAzO1xuICAgICAgICB0c0RhdGEuYmFycy5saW5lV2lkdGggKj0gMztcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdHNEYXRhID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZSkgPT4gZS5pbnRlcm5hbElkID09PSBpbnRlcm5hbElkKTtcbiAgICAgICAgdHNEYXRhLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRzRGF0YS5wb2ludHMucmFkaXVzIC89IDM7XG4gICAgICAgIHRzRGF0YS5saW5lcy5saW5lV2lkdGggLz0gMztcbiAgICAgICAgdHNEYXRhLmJhcnMubGluZVdpZHRoIC89IDM7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKGRhdGFzZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0TWFwLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVwYXJlZERhdGEoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZERhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwaS5nZXRTaW5nbGVUaW1lc2VyaWVzKGludGVybmFsSWQsIHVybCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHRpbWVzZXJpZXMpID0+IHRoaXMuYWRkTG9hZGVkRGF0YXNldCh0aW1lc2VyaWVzKSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaW50ZXJuYWxJZCwgdXJsKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChkYXRhc2V0KSA9PiB0aGlzLmFkZExvYWRlZERhdGFzZXQoZGF0YXNldClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRhc2V0TWFwLmhhcyhpbnRlcm5hbElkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLmRhdGFzZXRNYXAuZ2V0KGludGVybmFsSWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVRpbWUoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25UaW1lc3BhbkNoYW5nZWQuZW1pdChuZXcgVGltZXNwYW4oZnJvbSwgdG8pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBsb3RHcmFwaCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJlcGFyZWREYXRhXG4gICAgICAgICAgICAmJiB0aGlzLnBsb3RhcmVhXG4gICAgICAgICAgICAmJiB0aGlzLnByZXBhcmVkRGF0YS5sZW5ndGggIT09IDBcbiAgICAgICAgICAgICYmIHRoaXMucGxvdE9wdGlvbnNcbiAgICAgICAgICAgICYmIHRoaXMucGxvdGFyZWEuY2xpZW50SGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlQXhpc1BvcygpO1xuICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucy54YXhpcy5taW4gPSB0aGlzLnRpbWVzcGFuLmZyb207XG4gICAgICAgICAgICB0aGlzLnBsb3RPcHRpb25zLnhheGlzLm1heCA9IHRoaXMudGltZXNwYW4udG87XG4gICAgICAgICAgICBjb25zdCBwbG90T2JqOiBQbG90ID0gJC5wbG90KHRoaXMucGxvdGFyZWEsIHRoaXMucHJlcGFyZWREYXRhLCB0aGlzLnBsb3RPcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxvdEFubm90YXRpb24odGhpcy5wbG90YXJlYSwgdGhpcy5wbG90T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVlBeGlzKHBsb3RPYmopO1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24ocGxvdE9iaiwgdGhpcy5wbG90T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbG90YXJlYSkge1xuICAgICAgICAgICAgICAgICQodGhpcy5wbG90YXJlYSkuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlUHJlcGFyZWREYXRhKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICAvLyByZW1vdmUgZnJvbSBwcmVwYXJlZERhdGEgQXJyYXlcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkuaW50ZXJuYWxJZCA9PT0gaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChpZHggPj0gMCkgeyB0aGlzLnByZXBhcmVkRGF0YS5zcGxpY2UoaWR4LCAxKTsgfVxuICAgICAgICAvLyByZW1vdmUgZnJvbSBheGlzXG4gICAgICAgIGNvbnN0IGF4aXNJZHggPSB0aGlzLnBsb3RPcHRpb25zLnlheGVzLmZpbmRJbmRleCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGludGVybmFsSWRJbmRleCA9IGVudHJ5LmludGVybmFsSWRzLmluZGV4T2YoaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWxJZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaW50ZXJuYWxJZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmludGVybmFsSWRzLnNwbGljZShpbnRlcm5hbElkSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS50c0NvbG9ycy5zcGxpY2UoaW50ZXJuYWxJZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXhpc0lkeCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnBsb3RPcHRpb25zLnlheGVzLnNwbGljZShheGlzSWR4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZURhdGEoZGF0YXNldDogSURhdGFzZXQsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFJZHggPSB0aGlzLnByZXBhcmVkRGF0YS5maW5kSW5kZXgoKGUpID0+IGUuaW50ZXJuYWxJZCA9PT0gZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVBeGlzTGFiZWwoZGF0YXNldCkuc3Vic2NyaWJlKChsYWJlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBheGVQb3M7XG4gICAgICAgICAgICAgICAgY29uc3QgYXhlID0gdGhpcy5wbG90T3B0aW9ucy55YXhlcy5maW5kKCh5YXhpc0VudHJ5LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXhlUG9zID0gaWR4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlheGlzRW50cnkubGFiZWwgPT09IGxhYmVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChheGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF4ZS5pbnRlcm5hbElkcy5pbmRleE9mKGRhdGFzZXQuaW50ZXJuYWxJZCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBheGUuaW50ZXJuYWxJZHMucHVzaChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXhlLnRzQ29sb3JzLnB1c2goc3R5bGVzLmNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4ZS50c0NvbG9yc1theGUuaW50ZXJuYWxJZHMuaW5kZXhPZihkYXRhc2V0LmludGVybmFsSWQpXSA9IHN0eWxlcy5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBheGUubWluID0gc3R5bGVzLnplcm9CYXNlZFlBeGlzID8gMCA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbG90T3B0aW9ucy55YXhlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVvbTogZGF0YXNldC51b20sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRzQ29sb3JzOiBbc3R5bGVzLmNvbG9yXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVybmFsSWRzOiBbZGF0YXNldC5pbnRlcm5hbElkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogc3R5bGVzLnplcm9CYXNlZFlBeGlzID8gMCA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF4ZVBvcyA9IHRoaXMucGxvdE9wdGlvbnMueWF4ZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhRW50cnk6IERhdGFTZXJpZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IGRhdGFzZXQuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHN0eWxlcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc3R5bGVzLnZpc2libGUgPyBkYXRhLnZhbHVlcyA6IFtdLFxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogc3R5bGVzLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiBzdHlsZXMucG9pbnRSYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBzdHlsZXMucG9pbnRSYWRpdXMgPiAwID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IHN0eWxlcy5saW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBzdHlsZXMubGluZVdpZHRoID4gMCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBiYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5wb2ludHMucmFkaXVzICo9IDM7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5saW5lcy5saW5lV2lkdGggKj0gMztcbiAgICAgICAgICAgICAgICAgICAgZGF0YUVudHJ5LmJhcnMubGluZVdpZHRoICo9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhSWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGFbZGF0YUlkeF0gPSBkYXRhRW50cnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEucHVzaChkYXRhRW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJlZmVyZW5jZVZhbHVlRGF0YShkYXRhc2V0LmludGVybmFsSWQsIHN0eWxlcywgZGF0YSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJlZmVyZW5jZVZhbHVlRGF0YShpbnRlcm5hbElkOiBzdHJpbmcsIHN0eWxlczogRGF0YXNldE9wdGlvbnMsIGRhdGE6IERhdGE8W251bWJlciwgbnVtYmVyXT4pIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZERhdGEgPSB0aGlzLnByZXBhcmVkRGF0YS5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIWVudHJ5LmludGVybmFsSWQuc3RhcnRzV2l0aCgncmVmJyArIGludGVybmFsSWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucGxvdE9wdGlvbnMuc2hvd1JlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgc3R5bGVzLnNob3dSZWZlcmVuY2VWYWx1ZXMuZm9yRWFjaCgocmVmVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZEYXRhRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVybmFsSWQ6ICdyZWYnICsgaW50ZXJuYWxJZCArIHJlZlZhbHVlLmlkLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmVmVmFsdWUuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEucmVmZXJlbmNlVmFsdWVzW3JlZlZhbHVlLmlkXSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHJlZlZhbHVlLmNvbG9yXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2gocmVmRGF0YUVudHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlQXhpc1BvcygpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHVudXNlZCBheGVzXG4gICAgICAgIHRoaXMucGxvdE9wdGlvbnMueWF4ZXMgPSB0aGlzLnBsb3RPcHRpb25zLnlheGVzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LmludGVybmFsSWRzLmxlbmd0aCAhPT0gMCk7XG4gICAgICAgIHRoaXMucGxvdE9wdGlvbnMueWF4ZXMuZm9yRWFjaCgoeGF4aXMsIGlkeCkgPT4ge1xuICAgICAgICAgICAgeGF4aXMuaW50ZXJuYWxJZHMuZm9yRWFjaCgoaWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gdGhpcy5wcmVwYXJlZERhdGEuZmluZCgoZGF0YUVudHJ5KSA9PiBkYXRhRW50cnkuaW50ZXJuYWxJZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgIHRlbXAueWF4aXMgPSBpZHggKyAxO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQXhpc0xhYmVsKGRhdGFzZXQ6IElEYXRhc2V0KTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxNYXBwZXIuZ2V0TWFwcGVkTGFiZWwoZGF0YXNldC5wYXJhbWV0ZXJzLnBoZW5vbWVub24ubGFiZWwpXG4gICAgICAgICAgICAubWFwKChsYWJlbCkgPT4gbGFiZWwgKyAnIFsnICsgZGF0YXNldC51b20gKyAnXScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U2VsZWN0aW9uKHBsb3Q6IFBsb3QsIG9wdGlvbnM6IFBsb3RPcHRpb25zKSB7XG4gICAgICAgIGlmIChwbG90ICYmIG9wdGlvbnMuc2VsZWN0aW9uLnJhbmdlKSB7XG4gICAgICAgICAgICBwbG90LnNldFNlbGVjdGlvbih7XG4gICAgICAgICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogb3B0aW9ucy5zZWxlY3Rpb24ucmFuZ2UuZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgdG86IG9wdGlvbnMuc2VsZWN0aW9uLnJhbmdlLnRvXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVBsb3RBbm5vdGF0aW9uKHBsb3RBcmVhOiBhbnksIG9wdGlvbnM6IFBsb3RPcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFubm90YXRpb24pIHtcbiAgICAgICAgICAgIC8vIHBsb3RBcmVhLmFwcGVuZCgnPGRpdiBjbGFzcz1cImdyYXBoLWFubm90YXRpb25cIj5EYXRlbiBvaG5lIEdld8ODwqRocjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVZQXhpcyhwbG90OiBQbG90KSB7XG4gICAgICAgIGlmIChwbG90LmdldE9wdGlvbnMoKS55YXhpcy5zaG93KSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGxhYmVsc1xuICAgICAgICAgICAgJChwbG90LmdldFBsYWNlaG9sZGVyKCkpLmZpbmQoJy55YXhpc0xhYmVsJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZVlBeGlzXG4gICAgICAgICAgICAkLmVhY2gocGxvdC5nZXRBeGVzKCksIChpOiBudW1iZXIsIGF4aXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghYXhpcy5zaG93KSB7IHJldHVybjsgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGF4aXMuYm94O1xuICAgICAgICAgICAgICAgIGlmIChheGlzLmRpcmVjdGlvbiA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJheGlzVGFyZ2V0U3R5bGVcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyBsZWZ0OidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYm94LmxlZnQgKyAncHg7IHRvcDonICsgYm94LnRvcCArICdweDsgd2lkdGg6J1xuICAgICAgICAgICAgICAgICAgICAgICAgKyBib3gud2lkdGggKyAncHg7IGhlaWdodDonICsgYm94LmhlaWdodCArICdweFwiPjwvZGl2PicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnYXhpcy5uJywgYXhpcy5uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHBsb3QuZ2V0UGxhY2Vob2xkZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJheGlzVGFyZ2V0XCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgbGVmdDonXG4gICAgICAgICAgICAgICAgICAgICAgICArIGJveC5sZWZ0ICsgJ3B4OyB0b3A6JyArIGJveC50b3AgKyAncHg7IHdpZHRoOidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYm94LndpZHRoICsgJ3B4OyBoZWlnaHQ6JyArIGJveC5oZWlnaHQgKyAncHhcIj48L2Rpdj4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2F4aXMubicsIGF4aXMubilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhwbG90LmdldFBsYWNlaG9sZGVyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xpY2soKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKCcuYXhpc1RhcmdldCcpLCAoaW5kZXg6IG51bWJlciwgZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmRhdGEoJ2F4aXMubicpID09PSBlbGVtLmRhdGEoJ2F4aXMubicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGVsZW0uaGFzQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGJyZWFrIGxvb3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHBsb3QuZ2V0RGF0YSgpLCAoaW5kZXg6IG51bWJlciwgZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuZGF0YSgnYXhpcy5uJykgPT09IGVsZW0ueWF4aXMubikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZWxlY3RlZCA9ICFzZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKGVsZW0uaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YXNldFNlbGVjdGVkLmVtaXQoc2VsZWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFheGlzLm9wdGlvbnMuaGlkZUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5YXhpc0xhYmVsID0gJCgnPGRpdiBjbGFzcz1cImF4aXNMYWJlbCB5YXhpc0xhYmVsXCIgc3R5bGU9bGVmdDonXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBib3gubGVmdCArICdweDs+PC9kaXY+JykudGV4dChheGlzLm9wdGlvbnMubGFiZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHBsb3QuZ2V0UGxhY2Vob2xkZXIoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnYXhpcy5uJywgYXhpcy5uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChheGlzLm9wdGlvbnMudHNDb2xvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goYXhpcy5vcHRpb25zLnRzQ29sb3JzLCAoaWR4OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPHNwYW4+JykuaHRtbCgnJm5ic3A7JiN4MjVDRjsnKS5jc3MoJ2NvbG9yJywgY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xhYmVsQ29sb3JNYXJrZXInKS5hcHBlbmRUbyh5YXhpc0xhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHlheGlzTGFiZWwuY3NzKCdtYXJnaW4tbGVmdCcsIC00ICsgKHlheGlzTGFiZWwuaGVpZ2h0KCkgLSB5YXhpc0xhYmVsLndpZHRoKCkpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc2V0IHNlbGVjdGlvbiB0byBheGlzXG4gICAgICAgICAgICBwbG90LmdldERhdGEoKS5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuZmxvdC15JyArIGVsZW0ueWF4aXMubiArICctYXhpcycpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goJCgnLmF4aXNUYXJnZXQnKSwgKGk6IG51bWJlciwgZW50cnk6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGVudHJ5KS5kYXRhKCdheGlzLm4nKSA9PT0gZWxlbS55YXhpcy5uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkKGVudHJ5KS5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVudHJ5KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKCcuYXhpc1RhcmdldFN0eWxlJyksIChpOiBudW1iZXIsIGVudHJ5OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChlbnRyeSkuZGF0YSgnYXhpcy5uJykgPT09IGVsZW0ueWF4aXMubikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJChlbnRyeSkuaGFzQ2xhc3MoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbnRyeSkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goJCgnLmF4aXNMYWJlbC55YXhpc0xhYmVsJyksIChpOiBudW1iZXIsIGVudHJ5OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChlbnRyeSkuZGF0YSgnYXhpcy5uJykgPT09IGVsZW0ueWF4aXMubikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJChlbnRyeSkuaGFzQ2xhc3MoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbnRyeSkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRMb2FkZWREYXRhc2V0KGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIHRoaXMuZGF0YXNldE1hcC5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCBkYXRhc2V0KTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YShkYXRhc2V0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGRhdGFzZXQ6IElEYXRhc2V0LCByZWZyZXNoPzogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBkYXRhc2V0T3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChkYXRhc2V0T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZXNwYW4gJiYgdGhpcy5wbG90T3B0aW9ucyAmJiBkYXRhc2V0T3B0aW9ucy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG9hZGluZ0NvdW50ZXIgPT09IDApIHsgdGhpcy5pc0NvbnRlbnRMb2FkaW5nKHRydWUpOyB9XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ291bnRlcisrO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMudGltZVNydmMuZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aGlzLnRpbWVzcGFuLCAwLjIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoKSB7IG9wdGlvbnMuZm9yY2VVcGRhdGUgPSByZWZyZXNoOyB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzZXQgaW5zdGFuY2VvZiBUaW1lc2VyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldFRzRGF0YTxbbnVtYmVyLCBudW1iZXJdPihkYXRhc2V0LmlkLCBkYXRhc2V0LnVybCwgYnVmZmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2Zsb3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiB0aGlzLnBsb3RPcHRpb25zLnNob3dSZWZlcmVuY2VWYWx1ZXMgPT09IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbGl6ZTogdGhpcy5wbG90T3B0aW9ucy5nZW5lcmFsaXplQWxsd2F5cyB8fCBkYXRhc2V0T3B0aW9ucy5nZW5lcmFsaXplXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5wcmVwYXJlRGF0YShkYXRhc2V0LCByZXN1bHQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbG90R3JhcGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkNvbXBsZXRlTG9hZGluZ0RhdGEoZGF0YXNldClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzZXQgaW5zdGFuY2VvZiBEYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8W251bWJlciwgbnVtYmVyXT4oZGF0YXNldC5pZCwgZGF0YXNldC51cmwsIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdmbG90JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogdGhpcy5wbG90T3B0aW9ucy5zaG93UmVmZXJlbmNlVmFsdWVzID09PSB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYWxpemU6IHRoaXMucGxvdE9wdGlvbnMuZ2VuZXJhbGl6ZUFsbHdheXMgfHwgZGF0YXNldE9wdGlvbnMuZ2VuZXJhbGl6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICApLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMucHJlcGFyZURhdGEoZGF0YXNldCwgcmVzdWx0KS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wbG90R3JhcGgoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm9uQ29tcGxldGVMb2FkaW5nRGF0YShkYXRhc2V0KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWRhdGFzZXRPcHRpb25zLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVByZXBhcmVkRGF0YShkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxvdEdyYXBoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29tcGxldGVMb2FkaW5nRGF0YShkYXRhc2V0OiBJRGF0YXNldCkge1xuICAgICAgICB0aGlzLmxvYWRpbmdDb3VudGVyLS07XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdDb3VudGVyID09PSAwKSB7IHRoaXMuaXNDb250ZW50TG9hZGluZyhmYWxzZSk7IH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRvb2x0aXAoKSB7XG4gICAgICAgIGlmICgkKCcjdG9vbHRpcCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJCgnPGRpdiBpZD1cInRvb2x0aXBcIj48L2Rpdj4nKS5hcHBlbmRUbygnYm9keScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93VG9vbHRpcChldmVudDogYW55LCBwb3M6IGFueSwgaXRlbTogYW55KSB7XG4gICAgICAgICQoJyN0b29sdGlwJykuZW1wdHkoKTtcbiAgICAgICAgJCgnI3Rvb2x0aXAnKS5hcHBlbmQoJzxkaXY+JyArIGl0ZW0uZGF0YXBvaW50WzFdLnRvRml4ZWQoMikgKyAnICcgKyBpdGVtLnNlcmllcy55YXhpcy5vcHRpb25zLnVvbSArICc8L2Rpdj4nKTtcbiAgICAgICAgJCgnI3Rvb2x0aXAnKS5hcHBlbmQoJzxkaXY+JyArIGl0ZW0uc2VyaWVzLnhheGlzLnRpY2tGb3JtYXR0ZXIoaXRlbS5kYXRhcG9pbnRbMF0sIGl0ZW0uc2VyaWVzLnhheGlzKSArICc8L2Rpdj4nKTtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9ICQoJyN0b29sdGlwJykuc2hvdygpO1xuICAgICAgICBjb25zdCBoYWxmd2lkdGggPSAoZXZlbnQudGFyZ2V0LmNsaWVudFdpZHRoKSAvIDI7XG4gICAgICAgIGlmIChoYWxmd2lkdGggPj0gaXRlbS5wYWdlWCAtIGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSB7XG4gICAgICAgICAgICB0b29sdGlwLmNzcyh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgdG9wOiBpdGVtLnBhZ2VZICsgNSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBpdGVtLnBhZ2VYICsgNSxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvb2x0aXAuY3NzKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICB0b3A6IGl0ZW0ucGFnZVkgKyA1LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAoJCh3aW5kb3cpLndpZHRoKCkgLSBpdGVtLnBhZ2VYKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlVG9vbHRpcCgpIHtcbiAgICAgICAgJCgnI3Rvb2x0aXAnKS5oaWRlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIH0gZnJvbSAnQGhlbGdvbGFuZC9kZXBpY3Rpb24nO1xuXG5pbXBvcnQge1xuICBGbG90T3ZlcnZpZXdUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG59IGZyb20gJy4vZmxvdC1vdmVydmlldy10aW1lc2VyaWVzLWdyYXBoL2Zsb3Qtb3ZlcnZpZXctdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxvdFRpbWVzZXJpZXNHcmFwaENvbXBvbmVudCB9IGZyb20gJy4vZmxvdC10aW1lc2VyaWVzLWdyYXBoL2Zsb3QtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGbG90VGltZXNlcmllc0dyYXBoQ29tcG9uZW50LFxuICAgIEZsb3RPdmVydmlld1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSGVsZ29sYW5kTGFiZWxNYXBwZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZsb3RUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQsXG4gICAgRmxvdE92ZXJ2aWV3VGltZXNlcmllc0dyYXBoQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kRmxvdE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJUaW1lIiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJJbnB1dCIsIk91dHB1dCIsIk1peGluIiwiSGFzTG9hZGFibGVDb250ZW50IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJUaW1lc3BhbiIsIk9ic2VydmFibGUiLCJUaW1lc2VyaWVzIiwiRGF0YXNldCIsIlZpZXdFbmNhcHN1bGF0aW9uIiwiSXRlcmFibGVEaWZmZXJzIiwiRGF0YXNldEFwaUludGVyZmFjZSIsIkludGVybmFsSWRIYW5kbGVyIiwiTGFiZWxNYXBwZXJTZXJ2aWNlIiwiVHJhbnNsYXRlU2VydmljZSIsIlZpZXdDaGlsZCIsIkRhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQiLCJOZ01vZHVsZSIsIkhlbGdvbGFuZExhYmVsTWFwcGVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENB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