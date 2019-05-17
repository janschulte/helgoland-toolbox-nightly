import { Component, EventEmitter, IterableDiffers, Output, ViewChild, NgModule } from '@angular/core';
import { DatasetApiInterface, DatasetPresenterComponent, InternalIdHandler, Time, Timespan, HelgolandCoreModule } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { extent } from 'd3';
import { newPlot, relayout } from 'plotly.js';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const LINE_WIDTH_SELECTED = 5;
/** @type {?} */
const LINE_WIDTH = 2;
/** @type {?} */
const MARKER_SIZE_SELECTED = 10;
/** @type {?} */
const MARKER_SIZE = 6;
class PlotlyProfileGraphComponent extends DatasetPresenterComponent {
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
        const range = extent(data.value, (d) => d.value);
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
            axis.range = extent([range[0], range[1], axis.range[0], axis.range[1]]);
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
            newPlot(this.plotlyArea, this.preparedData, this.layout, this.settings);
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
            relayout(this.plotlyArea, {});
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HelgolandPlotlyModule {
}
HelgolandPlotlyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PlotlyProfileGraphComponent
                ],
                imports: [
                    HelgolandCoreModule
                ],
                exports: [
                    PlotlyProfileGraphComponent
                ],
                providers: []
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

export { HelgolandPlotlyModule, PlotlyProfileGraphComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLXBsb3RseS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGhlbGdvbGFuZC9wbG90bHkvbGliL3Bsb3RseS1wcm9maWxlLWdyYXBoL3Bsb3RseS1wcm9maWxlLWdyYXBoLmNvbXBvbmVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9wbG90bHkvbGliL3Bsb3RseS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEl0ZXJhYmxlRGlmZmVycywgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50LFxuICAgIElEYXRhc2V0LFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIFByZXNlbnRlckhpZ2hsaWdodCxcbiAgICBQcm9maWxlRGF0YUVudHJ5LFxuICAgIFRpbWUsXG4gICAgVGltZWREYXRhc2V0T3B0aW9ucyxcbiAgICBUaW1lc3Bhbixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0ICogYXMgUGxvdGx5IGZyb20gJ3Bsb3RseS5qcyc7XG5cbmludGVyZmFjZSBSYXdEYXRhIHtcbiAgICBkYXRhc2V0OiBJRGF0YXNldDtcbiAgICBkYXRhczogUHJvZmlsZURhdGFFbnRyeVtdO1xuICAgIG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnNbXTtcbn1cblxuaW50ZXJmYWNlIEV4dGVuZGVkU2NhdHRlckRhdGEgZXh0ZW5kcyBQYXJ0aWFsPFBsb3RseS5TY2F0dGVyRGF0YT4ge1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG59XG5cbmNvbnN0IExJTkVfV0lEVEhfU0VMRUNURUQgPSA1O1xuY29uc3QgTElORV9XSURUSCA9IDI7XG5jb25zdCBNQVJLRVJfU0laRV9TRUxFQ1RFRCA9IDEwO1xuY29uc3QgTUFSS0VSX1NJWkUgPSA2O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi1wbG90bHktcHJvZmlsZS1ncmFwaCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNwbG90bHk+PC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgZGl2e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGxvdGx5UHJvZmlsZUdyYXBoQ29tcG9uZW50XG4gICAgZXh0ZW5kcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PFRpbWVkRGF0YXNldE9wdGlvbnNbXSwgYW55PlxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25IaWdobGlnaHQ6IEV2ZW50RW1pdHRlcjxQcmVzZW50ZXJIaWdobGlnaHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgncGxvdGx5JylcbiAgICBwdWJsaWMgcGxvdGx5RWxlbTogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgcGxvdGx5QXJlYTogYW55O1xuICAgIHByaXZhdGUgcHJlcGFyZWREYXRhOiBFeHRlbmRlZFNjYXR0ZXJEYXRhW10gPSBbXTtcbiAgICBwcml2YXRlIHJhd0RhdGE6IE1hcDxzdHJpbmcsIFJhd0RhdGE+ID0gbmV3IE1hcCgpO1xuICAgIHByaXZhdGUgY291bnRlclhBeGlzID0gMDtcbiAgICBwcml2YXRlIGNvdW50ZXJZQXhpcyA9IDA7XG5cbiAgICBwcml2YXRlIGxheW91dDogTGF5b3V0ID0ge1xuICAgICAgICBhdXRvc2l6ZTogdHJ1ZSxcbiAgICAgICAgc2hvd2xlZ2VuZDogZmFsc2UsXG4gICAgICAgIGRyYWdtb2RlOiAncGFuJyxcbiAgICAgICAgbWFyZ2luOiB7XG4gICAgICAgICAgICBsOiA0MCxcbiAgICAgICAgICAgIHI6IDEwLFxuICAgICAgICAgICAgYjogNDAsXG4gICAgICAgICAgICB0OiAxMFxuICAgICAgICAgICAgLy8gcGFkOiAxMDBcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXJtb2RlOiAnY2xvc2VzdCdcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogUGFydGlhbDxhbnk+ID0ge1xuICAgICAgICBkaXNwbGF5TW9kZUJhcjogZmFsc2UsXG4gICAgICAgIG1vZGVCYXJCdXR0b25zVG9SZW1vdmU6IFtcbiAgICAgICAgICAgICdzZW5kRGF0YVRvQ2xvdWQnLFxuICAgICAgICAgICAgJ2hvdmVyQ29tcGFyZUNhcnRlc2lhbidcbiAgICAgICAgXSxcbiAgICAgICAgZGlzcGxheWxvZ286IGZhbHNlLFxuICAgICAgICBzaG93VGlwczogZmFsc2UsXG4gICAgICAgIHNjcm9sbFpvb206IHRydWVcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpdGVyYWJsZURpZmZlcnMsIGFwaSwgZGF0YXNldElkUmVzb2x2ZXIsIHRpbWVTcnZjLCB0cmFuc2xhdGVTcnZjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBsb3RseUFyZWEgPSB0aGlzLnBsb3RseUVsZW0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHsgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0SWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygncmVsb2FkIGRhdGEgYXQgJyArIG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByb3RlY3RlZCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRGF0YXNldChpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0KGlkLCB1cmwpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuID0gbmV3IFRpbWVzcGFuKG9wdGlvbi50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhPFByb2ZpbGVEYXRhRW50cnk+KGlkLCB1cmwsIHRpbWVzcGFuKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yYXdEYXRhLmhhcyhkYXRhc2V0LmludGVybmFsSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmF3RGF0YS5nZXQoZGF0YXNldC5pbnRlcm5hbElkKS5kYXRhcy5wdXNoKGRhdGEudmFsdWVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChkYXRhc2V0LmludGVybmFsSWQpLm9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmF3RGF0YS5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXM6IFtkYXRhLnZhbHVlc1swXV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbb3B0aW9uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmF3RGF0YS5kZWxldGUoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJvdGVjdGVkIHByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IGFueSk6IHZvaWQgeyB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogVGltZWREYXRhc2V0T3B0aW9uc1tdLCBmaXJzdENoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgdW51c2VkIG9wdGlvbnNcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRJZHggPSB0aGlzLnJhd0RhdGEuZ2V0KGludGVybmFsSWQpLm9wdGlvbnMuZmluZEluZGV4KChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBvcHRpb25zLmZpbmRJbmRleCgoZSkgPT4gZS50aW1lc3RhbXAgPT09IG9wdGlvbi50aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlbW92ZWRJZHggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmF3RGF0YS5nZXQoaW50ZXJuYWxJZCkub3B0aW9ucy5zcGxpY2UocmVtb3ZlZElkeCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yYXdEYXRhLmdldChpbnRlcm5hbElkKS5kYXRhcy5zcGxpY2UocmVtb3ZlZElkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZHJhd0NoYXJ0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRGF0YSgpIHtcbiAgICAgICAgdGhpcy5jbGVhckxheW91dCgpO1xuICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xuICAgICAgICB0aGlzLnJhd0RhdGEuZm9yRWFjaCgoZGF0YUVudHJ5KSA9PiB7XG4gICAgICAgICAgICBkYXRhRW50cnkub3B0aW9ucy5mb3JFYWNoKChvcHRpb24sIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZERhdGFzZXRJZHMuaW5kZXhPZihkYXRhRW50cnkuZGF0YXNldC5pbnRlcm5hbElkKSA+PSAwO1xuICAgICAgICAgICAgICAgICAgICBkYXRhRW50cnkuZGF0YXNba2V5XS52YWx1ZS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeC5wdXNoKGVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkucHVzaChlbnRyeS52ZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmVwYXJlZDogRXh0ZW5kZWRTY2F0dGVyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NjYXR0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG9wdGlvbi50aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZGF0YUVudHJ5LmRhdGFzZXQuaW50ZXJuYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlheGlzOiB0aGlzLmNyZWF0ZVlBeGlzKGRhdGFFbnRyeS5kYXRhc2V0LCBkYXRhRW50cnkuZGF0YXNba2V5XSksXG4gICAgICAgICAgICAgICAgICAgICAgICB4YXhpczogdGhpcy5jcmVhdGVYQXhpcyhkYXRhRW50cnkuZGF0YXNldCwgZGF0YUVudHJ5LmRhdGFzW2tleV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaG92ZXJ0ZXh0OiBkYXRhRW50cnkubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG9wdGlvbi5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2VsZWN0ZWQgPyBMSU5FX1dJRFRIX1NFTEVDVEVEIDogTElORV9XSURUSFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHNlbGVjdGVkID8gTUFSS0VSX1NJWkVfU0VMRUNURUQgOiBNQVJLRVJfU0laRVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVkRGF0YS5wdXNoKHByZXBhcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVBeGlzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVYQXhpcyhkYXRhc2V0OiBJRGF0YXNldCwgZGF0YTogUHJvZmlsZURhdGFFbnRyeSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBheGlzO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3hheGlzJykgJiYgdGhpcy5sYXlvdXRba2V5XS50aXRsZSA9PT0gZGF0YXNldC51b20pIHtcbiAgICAgICAgICAgICAgICBheGlzID0gdGhpcy5sYXlvdXRba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYW5nZSA9IGQzLmV4dGVudChkYXRhLnZhbHVlLCAoZCkgPT4gZC52YWx1ZSk7XG4gICAgICAgIGlmICghYXhpcykge1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyWEF4aXMgPSB0aGlzLmNvdW50ZXJYQXhpcyArIDE7XG4gICAgICAgICAgICBheGlzID0gdGhpcy5sYXlvdXRbJ3hheGlzJyArIHRoaXMuY291bnRlclhBeGlzXSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ3gnICsgKHRoaXMuY291bnRlclhBeGlzID4gMSA/IHRoaXMuY291bnRlclhBeGlzIDogJycpLFxuICAgICAgICAgICAgICAgIGFuY2hvcjogJ2ZyZWUnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhc2V0LnVvbSxcbiAgICAgICAgICAgICAgICB6ZXJvbGluZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBob3ZlcmZvcm1hdDogJy4yZicsXG4gICAgICAgICAgICAgICAgc2hvd2xpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBbcmFuZ2VbMF0sIHJhbmdlWzFdXSxcbiAgICAgICAgICAgICAgICBvdmVybGF5aW5nOiAnJyxcbiAgICAgICAgICAgICAgICAvLyByYW5nZW1vZGU6ICd0b3plcm8nLFxuICAgICAgICAgICAgICAgIGZpeGVkcmFuZ2U6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnRlclhBeGlzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgYXhpcy5vdmVybGF5aW5nID0gJ3gnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXhpcy5yYW5nZSA9IGQzLmV4dGVudChbcmFuZ2VbMF0sIHJhbmdlWzFdLCBheGlzLnJhbmdlWzBdLCBheGlzLnJhbmdlWzFdXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF4aXMuaWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVZQXhpcyhkYXRhc2V0OiBJRGF0YXNldCwgZGF0YTogUHJvZmlsZURhdGFFbnRyeSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBheGlzO1xuICAgICAgICAvLyBmaW5kIGF4aXNcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICAgICAgICAgICAga2V5LnN0YXJ0c1dpdGgoJ3lheGlzJykgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLnRpdGxlID09PSBkYXRhLnZlcnRpY2FsVW5pdCkge1xuICAgICAgICAgICAgICAgIGF4aXMgPSB0aGlzLmxheW91dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXhpcykge1xuICAgICAgICAgICAgLy8gYWRkIGF4aXNcbiAgICAgICAgICAgIHRoaXMuY291bnRlcllBeGlzID0gdGhpcy5jb3VudGVyWUF4aXMgKyAxO1xuICAgICAgICAgICAgYXhpcyA9IHRoaXMubGF5b3V0WygneWF4aXMnICsgdGhpcy5jb3VudGVyWUF4aXMpXSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ3knICsgKHRoaXMuY291bnRlcllBeGlzID4gMSA/IHRoaXMuY291bnRlcllBeGlzIDogJycpLFxuICAgICAgICAgICAgICAgIC8vIHplcm9saW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFuY2hvcjogJ2ZyZWUnLFxuICAgICAgICAgICAgICAgIGhvdmVyZm9ybWF0OiAnLjJyJyxcbiAgICAgICAgICAgICAgICBzaWRlOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgYXV0b3JhbmdlOiAncmV2ZXJzZWQnLFxuICAgICAgICAgICAgICAgIHNob3dsaW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvdmVybGF5aW5nOiAnJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogZGF0YS52ZXJ0aWNhbFVuaXQsXG4gICAgICAgICAgICAgICAgZml4ZWRyYW5nZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyWUF4aXMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBheGlzLm92ZXJsYXlpbmcgPSAneSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF4aXMuaWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVBeGlzKCkge1xuICAgICAgICBpZiAodGhpcy5jb3VudGVyWUF4aXMgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxheW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdGFydHNXaXRoKCd4YXhpcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0W2tleV0uZG9tYWluID0gWygwLjEgKiB0aGlzLmNvdW50ZXJZQXhpcykgLSAwLjEsIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB5YXhpc0NvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3lheGlzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5wb3NpdGlvbiA9IDAuMSAqIHlheGlzQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHlheGlzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY291bnRlclhBeGlzID4gMSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtrZXldLmRvbWFpbiA9IFsoMC4wNiAqIHRoaXMuY291bnRlclhBeGlzKSAtIDAuMDYsIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB4YXhpc0NvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Lmhhc093blByb3BlcnR5KGtleSkgJiYga2V5LnN0YXJ0c1dpdGgoJ3hheGlzJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5wb3NpdGlvbiA9IDAuMDYgKiB4YXhpc0NvdW50O1xuICAgICAgICAgICAgICAgICAgICB4YXhpc0NvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBvZmZzZXQgdG8geGF4aXMgcmFuZ2VzXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubGF5b3V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5sYXlvdXRba2V5XS5yYW5nZTtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZU9mZnNldCA9IChyYW5nZVsxXSAtIHJhbmdlWzBdKSAqIDAuMDU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRba2V5XS5yYW5nZSA9IFtyYW5nZVswXSAtIHJhbmdlT2Zmc2V0LCByYW5nZVsxXSArIHJhbmdlT2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0NoYXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5wbG90bHlBcmVhICYmIHRoaXMucmF3RGF0YS5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGF0YSgpO1xuICAgICAgICAgICAgUGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90bHlBcmVhLCB0aGlzLnByZXBhcmVkRGF0YSwgdGhpcy5sYXlvdXQsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICAgICAgdGhpcy5wbG90bHlBcmVhLm9uKCdwbG90bHlfaG92ZXInLCAoZW50cnk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5wb2ludHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25IaWdobGlnaHQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiBlbnRyeS5wb2ludHNbMF0uZGF0YS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJbmRleDogZW50cnkucG9pbnRzWzBdLnBvaW50TnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhckxheW91dCgpIHtcbiAgICAgICAgLy8gdG9kbyByZW1vdmUgeWF4aXNcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChrZXkuc3RhcnRzV2l0aCgneWF4aXMnKSB8fCBrZXkuc3RhcnRzV2l0aCgneGF4aXMnKSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5sYXlvdXRba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXNldCBjb3VudGVyXG4gICAgICAgIHRoaXMuY291bnRlcllBeGlzID0gMDtcbiAgICAgICAgdGhpcy5jb3VudGVyWEF4aXMgPSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJEYXRhKCkge1xuICAgICAgICB0aGlzLnByZXBhcmVkRGF0YSA9IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVkcmF3Q2hhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsb3RseUFyZWEpIHtcbiAgICAgICAgICAgIFBsb3RseS5yZWxheW91dCh0aGlzLnBsb3RseUFyZWEsIHt9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuaW50ZXJmYWNlIFNjYXR0ZXJEYXRhIGV4dGVuZHMgUGFydGlhbDxhbnk+IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTGF5b3V0IGV4dGVuZHMgUGFydGlhbDxhbnk+IHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVsZ29sYW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5cbmltcG9ydCB7IFBsb3RseVByb2ZpbGVHcmFwaENvbXBvbmVudCB9IGZyb20gJy4vcGxvdGx5LXByb2ZpbGUtZ3JhcGgvcGxvdGx5LXByb2ZpbGUtZ3JhcGguY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGxvdGx5UHJvZmlsZUdyYXBoQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIZWxnb2xhbmRDb3JlTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQbG90bHlQcm9maWxlR3JhcGhDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRQbG90bHlNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZDMuZXh0ZW50IiwiUGxvdGx5Lm5ld1Bsb3QiLCJQbG90bHkucmVsYXlvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQTJCQSxNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQzs7QUFDOUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDOztBQUNyQixNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQzs7QUFDaEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBT3RCLGlDQUNJLFNBQVEseUJBQXFEOzs7Ozs7OztJQXdDN0QsWUFDYyxlQUFnQyxFQUNoQyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsUUFBYyxFQUNkLGFBQStCO1FBRXpDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQU45RCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQWtCOzJCQXpDVSxJQUFJLFlBQVksRUFBRTs0QkFN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