/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, IterableDiffers, Output, ViewChild } from '@angular/core';
import { DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, Timespan, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import * as d3 from 'd3';
import * as Plotly from 'plotly.js';
/**
 * @record
 */
function RawData() { }
/** @type {?} */
RawData.prototype.dataset;
/** @type {?} */
RawData.prototype.datas;
/** @type {?} */
RawData.prototype.options;
/**
 * @record
 */
function ExtendedScatterData() { }
/** @type {?} */
ExtendedScatterData.prototype.timestamp;
/** @type {?} */
ExtendedScatterData.prototype.id;
/** @type {?} */
const LINE_WIDTH_SELECTED = 5;
/** @type {?} */
const LINE_WIDTH = 2;
/** @type {?} */
const MARKER_SIZE_SELECTED = 10;
/** @type {?} */
const MARKER_SIZE = 6;
export class PlotlyProfileGraphComponent extends DatasetPresenterComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} api
     * @param {?} datasetIdResolver
     * @param {?} timeSrvc
     * @param {?} translateSrvc
     */
    constructor(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc) {
        super(iterableDiffers, api, datasetIdResolver, timeSrvc, translateSrvc);
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.translateSrvc = translateSrvc;
        this.onHighlight = new EventEmitter();
        this.preparedData = [];
        this.rawData = new Map();
        this.counterXAxis = 0;
        this.counterYAxis = 0;
        this.layout = {
            autosize: true,
            showlegend: false,
            dragmode: 'pan',
            margin: {
                l: 40,
                r: 10,
                b: 40,
                t: 10
            },
            hovermode: 'closest'
        };
        this.settings = {
            displayModeBar: false,
            modeBarButtonsToRemove: [
                'sendDataToCloud',
                'hoverCompareCartesian'
            ],
            displaylogo: false,
            showTips: false,
            scrollZoom: true
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.plotlyArea = this.plotlyElem.nativeElement;
        this.drawChart();
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) { }
    /**
     * @param {?} datasetIds
     * @return {?}
     */
    reloadDataForDatasets(datasetIds) {
        console.log('reload data at ' + new Date());
    }
    /**
     * @return {?}
     */
    timeIntervalChanges() { }
    /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    addDataset(id, url) {
        this.api.getDataset(id, url).subscribe((dataset) => {
            /** @type {?} */
            const options = this.datasetOptions.get(dataset.internalId);
            options.forEach((option) => {
                if (option.timestamp) {
                    /** @type {?} */
                    const timespan = new Timespan(option.timestamp);
                    this.api.getData(id, url, timespan).subscribe((data) => {
                        if (data.values.length === 1) {
                            if (this.rawData.has(dataset.internalId)) {
                                this.rawData.get(dataset.internalId).datas.push(data.values[0]);
                                this.rawData.get(dataset.internalId).options.push(option);
                            }
                            else {
                                this.rawData.set(dataset.internalId, {
                                    dataset,
                                    datas: [data.values[0]],
                                    options: [option]
                                });
                            }
                        }
                        this.drawChart();
                    });
                }
            });
        });
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeDataset(internalId) {
        this.rawData.delete(internalId);
        this.drawChart();
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    setSelectedId(internalId) {
        this.drawChart();
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    removeSelectedId(internalId) {
        this.drawChart();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    presenterOptionsChanged(options) { }
    /**
     * @param {?} internalId
     * @param {?} options
     * @param {?} firstChange
     * @return {?}
     */
    datasetOptionsChanged(internalId, options, firstChange) {
        if (!firstChange) {
            /** @type {?} */
            const removedIdx = this.rawData.get(internalId).options.findIndex((option) => {
                /** @type {?} */
                const idx = options.findIndex((e) => e.timestamp === option.timestamp);
                if (idx === -1) {
                    return true;
                }
            });
            if (removedIdx > -1) {
                this.rawData.get(internalId).options.splice(removedIdx, 1);
                this.rawData.get(internalId).datas.splice(removedIdx, 1);
            }
            this.drawChart();
        }
    }
    /**
     * @return {?}
     */
    onResize() {
        this.redrawChart();
    }
    /**
     * @return {?}
     */
    processData() {
        this.clearLayout();
        this.clearData();
        this.rawData.forEach((dataEntry) => {
            dataEntry.options.forEach((option, key) => {
                if (option.visible) {
                    /** @type {?} */
                    const x = new Array();
                    /** @type {?} */
                    const y = new Array();
                    /** @type {?} */
                    const selected = this.selectedDatasetIds.indexOf(dataEntry.dataset.internalId) >= 0;
                    dataEntry.datas[key].value.forEach((entry) => {
                        x.push(entry.value);
                        y.push(entry.vertical);
                    });
                    /** @type {?} */
                    const prepared = {
                        x,
                        y,
                        type: 'scatter',
                        name: '',
                        timestamp: option.timestamp,
                        id: dataEntry.dataset.internalId,
                        yaxis: this.createYAxis(dataEntry.dataset, dataEntry.datas[key]),
                        xaxis: this.createXAxis(dataEntry.dataset, dataEntry.datas[key]),
                        // hovertext: dataEntry.label,
                        line: {
                            color: option.color,
                            width: selected ? LINE_WIDTH_SELECTED : LINE_WIDTH
                        },
                        marker: {
                            size: selected ? MARKER_SIZE_SELECTED : MARKER_SIZE
                        }
                    };
                    this.preparedData.push(prepared);
                }
            });
        });
        this.updateAxis();
    }
    /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    createXAxis(dataset, data) {
        /** @type {?} */
        let axis;
        for (const key in this.layout) {
            if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis') && this.layout[key].title === dataset.uom) {
                axis = this.layout[key];
            }
        }
        /** @type {?} */
        const range = d3.extent(data.value, (d) => d.value);
        if (!axis) {
            this.counterXAxis = this.counterXAxis + 1;
            axis = this.layout['xaxis' + this.counterXAxis] = {
                id: 'x' + (this.counterXAxis > 1 ? this.counterXAxis : ''),
                anchor: 'free',
                title: dataset.uom,
                zeroline: true,
                hoverformat: '.2f',
                showline: false,
                range: [range[0], range[1]],
                overlaying: '',
                // rangemode: 'tozero',
                fixedrange: false
            };
            if (this.counterXAxis !== 1) {
                axis.overlaying = 'x';
            }
        }
        else {
            axis.range = d3.extent([range[0], range[1], axis.range[0], axis.range[1]]);
        }
        return axis.id;
    }
    /**
     * @param {?} dataset
     * @param {?} data
     * @return {?}
     */
    createYAxis(dataset, data) {
        /** @type {?} */
        let axis;
        // find axis
        for (const key in this.layout) {
            if (this.layout.hasOwnProperty(key) &&
                key.startsWith('yaxis') &&
                this.layout[key].title === data.verticalUnit) {
                axis = this.layout[key];
            }
        }
        if (!axis) {
            // add axis
            this.counterYAxis = this.counterYAxis + 1;
            axis = this.layout[('yaxis' + this.counterYAxis)] = {
                id: 'y' + (this.counterYAxis > 1 ? this.counterYAxis : ''),
                // zeroline: true,
                anchor: 'free',
                hoverformat: '.2r',
                side: 'left',
                autorange: 'reversed',
                showline: false,
                overlaying: '',
                title: data.verticalUnit,
                fixedrange: false
            };
            if (this.counterYAxis !== 1) {
                axis.overlaying = 'y';
            }
        }
        return axis.id;
    }
    /**
     * @return {?}
     */
    updateAxis() {
        if (this.counterYAxis > 1) {
            for (const key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis')) {
                    this.layout[key].domain = [(0.1 * this.counterYAxis) - 0.1, 1];
                }
            }
            /** @type {?} */
            let yaxisCount = 0;
            for (const key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('yaxis')) {
                    this.layout[key].position = 0.1 * yaxisCount;
                    yaxisCount += 1;
                }
            }
        }
        if (this.counterXAxis > 1) {
            for (const key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('yaxis')) {
                    this.layout[key].domain = [(0.06 * this.counterXAxis) - 0.06, 1];
                }
            }
            /** @type {?} */
            let xaxisCount = 0;
            for (const key in this.layout) {
                if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis')) {
                    this.layout[key].position = 0.06 * xaxisCount;
                    xaxisCount += 1;
                }
            }
        }
        // add offset to xaxis ranges
        for (const key in this.layout) {
            if (this.layout.hasOwnProperty(key) && key.startsWith('xaxis')) {
                /** @type {?} */
                const range = this.layout[key].range;
                /** @type {?} */
                const rangeOffset = (range[1] - range[0]) * 0.05;
                this.layout[key].range = [range[0] - rangeOffset, range[1] + rangeOffset];
            }
        }
    }
    /**
     * @return {?}
     */
    drawChart() {
        if (this.plotlyArea && this.rawData.size > 0) {
            this.processData();
            Plotly.newPlot(this.plotlyArea, this.preparedData, this.layout, this.settings);
            this.plotlyArea.on('plotly_hover', (entry) => {
                if (entry.points.length === 1) {
                    this.onHighlight.emit({
                        internalId: entry.points[0].data.id,
                        dataIndex: entry.points[0].pointNumber
                    });
                }
            });
        }
    }
    /**
     * @return {?}
     */
    clearLayout() {
        // todo remove yaxis
        for (const key in this.layout) {
            if (this.layout.hasOwnProperty(key) && (key.startsWith('yaxis') || key.startsWith('xaxis'))) {
                delete this.layout[key];
            }
        }
        // reset counter
        this.counterYAxis = 0;
        this.counterXAxis = 0;
    }
    /**
     * @return {?}
     */
    clearData() {
        this.preparedData = [];
    }
    /**
     * @return {?}
     */
    redrawChart() {
        if (this.plotlyArea) {
            Plotly.relayout(this.plotlyArea, {});
        }
    }
}
PlotlyProfileGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-plotly-profile-graph',
                template: `<div #plotly></div>`,
                styles: [`:host div{width:100%;height:100%}`]
            },] },
];
/** @nocollapse */
PlotlyProfileGraphComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: Time },
    { type: TranslateService }
];
PlotlyProfileGraphComponent.propDecorators = {
    onHighlight: [{ type: Output }],
    plotlyElem: [{ type: ViewChild, args: ['plotly',] }]
};
if (false) {
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.onHighlight;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.plotlyElem;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.plotlyArea;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.preparedData;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.rawData;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.counterXAxis;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.counterYAxis;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.layout;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.settings;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.iterableDiffers;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.api;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.datasetIdResolver;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    PlotlyProfileGraphComponent.prototype.translateSrvc;
}
/**
 * @record
 */
function ScatterData() { }
/** @type {?} */
ScatterData.prototype.id;
/** @type {?} */
ScatterData.prototype.timestamp;
/**
 * @record
 */
function Layout() { }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LXByb2ZpbGUtZ3JhcGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9wbG90bHkvIiwic291cmNlcyI6WyJsaWIvcGxvdGx5LXByb2ZpbGUtZ3JhcGgvcGxvdGx5LXByb2ZpbGUtZ3JhcGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIseUJBQXlCLEVBRXpCLGlCQUFpQixFQUdqQixJQUFJLEVBRUosUUFBUSxHQUNYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxNQUFNLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFwQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQzs7QUFDOUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDOztBQUNyQixNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQzs7QUFDaEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBT3RCLE1BQU0sa0NBQ0YsU0FBUSx5QkFBcUQ7Ozs7Ozs7O0lBd0M3RCxZQUNjLGVBQWdDLEVBQ2hDLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxRQUFjLEVBQ2QsYUFBK0I7UUFFekMsS0FBSyxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBTjlELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlC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LENBQUMsQ0FBQyxDQUFDLFdBQVc7cUJBQ3pDLENBQUMsQ0FBQztpQkFDTjthQUNKLENBQUMsQ0FBQztTQUNOOzs7OztJQUdHLFdBQVc7O1FBRWYsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtTQUNKOztRQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUdsQixTQUFTO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7Ozs7O0lBR25CLFdBQVc7UUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEM7Ozs7WUFwVFIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLE1BQU0sRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2FBQ2hEOzs7O1lBcEM0RCxlQUFlO1lBRXhFLG1CQUFtQjtZQUduQixpQkFBaUI7WUFHakIsSUFBSTtZQUlrQixnQkFBZ0I7OzswQkE2QnJDLE1BQU07eUJBR04sU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSXRlcmFibGVEaWZmZXJzLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQsXG4gICAgSURhdGFzZXQsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgUHJlc2VudGVySGlnaGxpZ2h0LFxuICAgIFByb2ZpbGVEYXRhRW50cnksXG4gICAgVGltZSxcbiAgICBUaW1lZERhdGFzZXRPcHRpb25zLFxuICAgIFRpbWVzcGFuLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQgKiBhcyBQbG90bHkgZnJvbSAncGxvdGx5LmpzJztcblxuaW50ZXJmYWNlIFJhd0RhdGEge1xuICAgIGRhdGFzZXQ6IElEYXRhc2V0O1xuICAgIGRhdGFzOiBQcm9maWxlRGF0YUVudHJ5W107XG4gICAgb3B0aW9uczogVGltZWREYXRhc2V0T3B0aW9uc1tdO1xufVxuXG5pbnRlcmZhY2UgRXh0ZW5kZWRTY2F0dGVyRGF0YSBleHRlbmRzIFBhcnRpYWw8UGxvdGx5LlNjYXR0ZXJEYXRhPiB7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgaWQ6IHN0cmluZztcbn1cblxuY29uc3QgTElORV9XSURUSF9TRUxFQ1RFRCA9IDU7XG5jb25zdCBMSU5FX1dJRFRIID0gMjtcbmNvbnN0IE1BUktFUl9TSVpFX1NFTEVDVEVEID0gMTA7XG5jb25zdCBNQVJLRVJfU0laRSA9IDY7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLXBsb3RseS1wcm9maWxlLWdyYXBoJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgI3Bsb3RseT48L2Rpdj5gLFxuICAgIHN0eWxlczogW2A6aG9zdCBkaXZ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBQbG90bHlQcm9maWxlR3JhcGhDb21wb25lbnRcbiAgICBleHRlbmRzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8VGltZWREYXRhc2V0T3B0aW9uc1tdLCBhbnk+XG4gICAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkhpZ2hsaWdodDogRXZlbnRFbWl0dGVyPFByZXNlbnRlckhpZ2hsaWdodD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdwbG90bHknKVxuICAgIHB1YmxpYyBwbG90bHlFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBwbG90bHlBcmVhOiBhbnk7XG4gICAgcHJpdmF0ZSBwcmVwYXJlZERhdGE6IEV4dGVuZGVkU2NhdHRlckRhdGFbXSA9IFtdO1xuICAgIHByaXZhdGUgcmF3RGF0YTogTWFwPHN0cmluZywgUmF3RGF0YT4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBjb3VudGVyWEF4aXMgPSAwO1xuICAgIHByaXZhdGUgY291bnRlcllBeGlzID0gMDtcblxuICAgIHByaXZhdGUgbGF5b3V0OiBMYXlvdXQgPSB7XG4gICAgICAgIGF1dG9zaXplOiB0cnVlLFxuICAgICAgICBzaG93bGVnZW5kOiBmYWxzZSxcbiAgICAgICAgZHJhZ21vZGU6ICdwYW4nLFxuICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgIGw6IDQwLFxuICAgICAgICAgICAgcjogMTAsXG4gICAgICAgICAgICBiOiA0MCxcbiAgICAgICAgICAgIHQ6IDEwXG4gICAgICAgICAgICAvLyBwYWQ6IDEwMFxuICAgICAgICB9LFxuICAgICAgICBob3Zlcm1vZGU6ICdjbG9zZXN0J1xuICAgIH07XG5cbiAgICBwcml2YXRlIHNldHRpbmdzOiBQYXJ0aWFsPGFueT4gPSB7XG4gICAgICAgIGRpc3BsYXlNb2RlQmFyOiBmYWxzZSxcbiAgICAgICAgbW9kZUJhckJ1dHRvbnNUb1JlbW92ZTogW1xuICAgICAgICAgICAgJ3NlbmREYXRhVG9DbG91ZCcsXG4gICAgICAgICAgICAnaG92ZXJDb21wYXJlQ2FydGVzaWFuJ1xuICAgICAgICBdLFxuICAgICAgICBkaXNwbGF5bG9nbzogZmFsc2UsXG4gICAgICAgIHNob3dUaXBzOiBmYWxzZSxcbiAgICAgICAgc2Nyb2xsWm9vbTogdHJ1ZVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGl0ZXJhYmxlRGlmZmVycywgYXBpLCBkYXRhc2V0SWRSZXNvbHZlciwgdGltZVNydmMsIHRyYW5zbGF0ZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxvdGx5QXJlYSA9IHRoaXMucGxvdGx5RWxlbS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQgeyB9XG5cbiAgICBwdWJsaWMgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRJZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWxvYWQgZGF0YSBhdCAnICsgbmV3IERhdGUoKSk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJvdGVjdGVkIHRpbWVJbnRlcnZhbENoYW5nZXMoKTogdm9pZCB7IH1cblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQoaWQsIHVybCkuc3Vic2NyaWJlKChkYXRhc2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi50aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW4gPSBuZXcgVGltZXNwYW4ob3B0aW9uLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8UHJvZmlsZURhdGFFbnRyeT4oaWQsIHVybCwgdGltZXNwYW4pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhd0RhdGEuaGFzKGRhdGFzZXQuaW50ZXJuYWxJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChkYXRhc2V0LmludGVybmFsSWQpLmRhdGFzLnB1c2goZGF0YS52YWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhd0RhdGEuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCkub3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLnNldChkYXRhc2V0LmludGVybmFsSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhczogW2RhdGEudmFsdWVzWzBdXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtvcHRpb25dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYXdEYXRhLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcm90ZWN0ZWQgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogYW55KTogdm9pZCB7IH1cblxuICAgIHByb3RlY3RlZCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zW10sIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB1bnVzZWQgb3B0aW9uc1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZElkeCA9IHRoaXMucmF3RGF0YS5nZXQoaW50ZXJuYWxJZCkub3B0aW9ucy5maW5kSW5kZXgoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IG9wdGlvbnMuZmluZEluZGV4KChlKSA9PiBlLnRpbWVzdGFtcCA9PT0gb3B0aW9uLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVtb3ZlZElkeCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChpbnRlcm5hbElkKS5vcHRpb25zLnNwbGljZShyZW1vdmVkSWR4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhd0RhdGEuZ2V0KGludGVybmFsSWQpLmRhdGFzLnNwbGljZShyZW1vdmVkSWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVkcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NEYXRhKCkge1xuICAgICAgICB0aGlzLmNsZWFyTGF5b3V0KCk7XG4gICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XG4gICAgICAgIHRoaXMucmF3RGF0YS5mb3JFYWNoKChkYXRhRW50cnkpID0+IHtcbiAgICAgICAgICAgIGRhdGFFbnRyeS5vcHRpb25zLmZvckVhY2goKG9wdGlvbiwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkRGF0YXNldElkcy5pbmRleE9mKGRhdGFFbnRyeS5kYXRhc2V0LmludGVybmFsSWQpID49IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFFbnRyeS5kYXRhc1trZXldLnZhbHVlLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4LnB1c2goZW50cnkudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeS5wdXNoKGVudHJ5LnZlcnRpY2FsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXBhcmVkOiBFeHRlbmRlZFNjYXR0ZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2NhdHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogb3B0aW9uLnRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhRW50cnkuZGF0YXNldC5pbnRlcm5hbElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWF4aXM6IHRoaXMuY3JlYXRlWUF4aXMoZGF0YUVudHJ5LmRhdGFzZXQsIGRhdGFFbnRyeS5kYXRhc1trZXldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhheGlzOiB0aGlzLmNyZWF0ZVhBeGlzKGRhdGFFbnRyeS5kYXRhc2V0LCBkYXRhRW50cnkuZGF0YXNba2V5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBob3ZlcnRleHQ6IGRhdGFFbnRyeS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogb3B0aW9uLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzZWxlY3RlZCA/IExJTkVfV0lEVEhfU0VMRUNURUQgOiBMSU5FX1dJRFRIXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogc2VsZWN0ZWQgPyBNQVJLRVJfU0laRV9TRUxFQ1RFRCA6IE1BUktFUl9TSVpFXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZWREYXRhLnB1c2gocHJlcGFyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUF4aXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVhBeGlzKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBQcm9maWxlRGF0YUVudHJ5KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGF4aXM7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSAmJiB0aGlzLmxheW91dFtrZXldLnRpdGxlID09PSBkYXRhc2V0LnVvbSkge1xuICAgICAgICAgICAgICAgIGF4aXMgPSB0aGlzLmxheW91dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZDMuZXh0ZW50KGRhdGEudmFsdWUsIChkKSA9PiBkLnZhbHVlKTtcbiAgICAgICAgaWYgKCFheGlzKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJYQXhpcyA9IHRoaXMuY291bnRlclhBeGlzICsgMTtcbiAgICAgICAgICAgIGF4aXMgPSB0aGlzLmxheW91dFsneGF4aXMnICsgdGhpcy5jb3VudGVyWEF4aXNdID0ge1xuICAgICAgICAgICAgICAgIGlkOiAneCcgKyAodGhpcy5jb3VudGVyWEF4aXMgPiAxID8gdGhpcy5jb3VudGVyWEF4aXMgOiAnJyksXG4gICAgICAgICAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGRhdGFzZXQudW9tLFxuICAgICAgICAgICAgICAgIHplcm9saW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhvdmVyZm9ybWF0OiAnLjJmJyxcbiAgICAgICAgICAgICAgICBzaG93bGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFtyYW5nZVswXSwgcmFuZ2VbMV1dLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlpbmc6ICcnLFxuICAgICAgICAgICAgICAgIC8vIHJhbmdlbW9kZTogJ3RvemVybycsXG4gICAgICAgICAgICAgICAgZml4ZWRyYW5nZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyWEF4aXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBheGlzLm92ZXJsYXlpbmcgPSAneCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBheGlzLnJhbmdlID0gZDMuZXh0ZW50KFtyYW5nZVswXSwgcmFuZ2VbMV0sIGF4aXMucmFuZ2VbMF0sIGF4aXMucmFuZ2VbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXhpcy5pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVlBeGlzKGRhdGFzZXQ6IElEYXRhc2V0LCBkYXRhOiBQcm9maWxlRGF0YUVudHJ5KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGF4aXM7XG4gICAgICAgIC8vIGZpbmQgYXhpc1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiZcbiAgICAgICAgICAgICAgICBrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0W2tleV0udGl0bGUgPT09IGRhdGEudmVydGljYWxVbml0KSB7XG4gICAgICAgICAgICAgICAgYXhpcyA9IHRoaXMubGF5b3V0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFheGlzKSB7XG4gICAgICAgICAgICAvLyBhZGQgYXhpc1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyWUF4aXMgPSB0aGlzLmNvdW50ZXJZQXhpcyArIDE7XG4gICAgICAgICAgICBheGlzID0gdGhpcy5sYXlvdXRbKCd5YXhpcycgKyB0aGlzLmNvdW50ZXJZQXhpcyldID0ge1xuICAgICAgICAgICAgICAgIGlkOiAneScgKyAodGhpcy5jb3VudGVyWUF4aXMgPiAxID8gdGhpcy5jb3VudGVyWUF4aXMgOiAnJyksXG4gICAgICAgICAgICAgICAgLy8gemVyb2xpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgICAgICAgICAgaG92ZXJmb3JtYXQ6ICcuMnInLFxuICAgICAgICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBhdXRvcmFuZ2U6ICdyZXZlcnNlZCcsXG4gICAgICAgICAgICAgICAgc2hvd2xpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlpbmc6ICcnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLnZlcnRpY2FsVW5pdCxcbiAgICAgICAgICAgICAgICBmaXhlZHJhbmdlOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ZXJZQXhpcyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGF4aXMub3ZlcmxheWluZyA9ICd5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXhpcy5pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUF4aXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ZXJZQXhpcyA+IDEpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3hheGlzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5kb21haW4gPSBbKDAuMSAqIHRoaXMuY291bnRlcllBeGlzKSAtIDAuMSwgMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHlheGlzQ291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnBvc2l0aW9uID0gMC4xICogeWF4aXNDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgeWF4aXNDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb3VudGVyWEF4aXMgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdGFydHNXaXRoKCd5YXhpcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0W2tleV0uZG9tYWluID0gWygwLjA2ICogdGhpcy5jb3VudGVyWEF4aXMpIC0gMC4wNiwgMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHhheGlzQ291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnBvc2l0aW9uID0gMC4wNiAqIHhheGlzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHhheGlzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIG9mZnNldCB0byB4YXhpcyByYW5nZXNcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdGFydHNXaXRoKCd4YXhpcycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmxheW91dFtrZXldLnJhbmdlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlT2Zmc2V0ID0gKHJhbmdlWzFdIC0gcmFuZ2VbMF0pICogMC4wNTtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnJhbmdlID0gW3JhbmdlWzBdIC0gcmFuZ2VPZmZzZXQsIHJhbmdlWzFdICsgcmFuZ2VPZmZzZXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3Q2hhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsb3RseUFyZWEgJiYgdGhpcy5yYXdEYXRhLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NEYXRhKCk7XG4gICAgICAgICAgICBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3RseUFyZWEsIHRoaXMucHJlcGFyZWREYXRhLCB0aGlzLmxheW91dCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICAgICAgICB0aGlzLnBsb3RseUFyZWEub24oJ3Bsb3RseV9ob3ZlcicsIChlbnRyeTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnBvaW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhpZ2hsaWdodC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IGVudHJ5LnBvaW50c1swXS5kYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiBlbnRyeS5wb2ludHNbMF0ucG9pbnROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyTGF5b3V0KCkge1xuICAgICAgICAvLyB0b2RvIHJlbW92ZSB5YXhpc1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGtleS5zdGFydHNXaXRoKCd5YXhpcycpIHx8IGtleS5zdGFydHNXaXRoKCd4YXhpcycpKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxheW91dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJlc2V0IGNvdW50ZXJcbiAgICAgICAgdGhpcy5jb3VudGVyWUF4aXMgPSAwO1xuICAgICAgICB0aGlzLmNvdW50ZXJYQXhpcyA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhckRhdGEoKSB7XG4gICAgICAgIHRoaXMucHJlcGFyZWREYXRhID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWRyYXdDaGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxvdGx5QXJlYSkge1xuICAgICAgICAgICAgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdGx5QXJlYSwge30pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgU2NhdHRlckRhdGEgZXh0ZW5kcyBQYXJ0aWFsPGFueT4ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBMYXlvdXQgZXh0ZW5kcyBQYXJ0aWFsPGFueT4ge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cbiJdfQ==