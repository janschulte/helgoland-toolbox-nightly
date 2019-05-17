/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, IterableDiffers, ViewEncapsulation, } from '@angular/core';
import { ColorService, DatasetApiInterface, InternalIdHandler, Time } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { extent } from 'd3';
import { D3TimeseriesGraphComponent, } from '../d3-timeseries-graph/d3-timeseries-graph.component';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
/**
 * Additional Data which can be add to the component {\@link ExtendedDataD3TimeseriesGraphComponent} as Input.
 * One of the optional properties 'linkedDatasetId' and 'yaxisLabel' is mandatory.
 * @record
 */
export function AdditionalData() { }
/**
 * Linked to an existing dataset in the graph component and uses it dataset options if no other datasetoptions are presented.
 * @type {?|undefined}
 */
AdditionalData.prototype.linkedDatasetId;
/**
 * Y-Axis label if no link to an existing dataset is given.
 * @type {?|undefined}
 */
AdditionalData.prototype.yaxisLabel;
/**
 * The dataset options, which describes the styling of the additional data.
 * @type {?|undefined}
 */
AdditionalData.prototype.datasetOptions;
/**
 * The additional data arrey with tupels of timestamp and value.
 * @type {?}
 */
AdditionalData.prototype.data;
/**
 * Additional data entry tuple
 * @record
 */
export function AdditionalDataEntry() { }
/** @type {?} */
AdditionalDataEntry.prototype.timestamp;
/** @type {?} */
AdditionalDataEntry.prototype.value;
/**
 * Extends the common d3 component, with the ability to add additional data to the graph. To set or change  additional data, allways sets the complete array of data new. The componet just redraws if
 * the array is reset.
 */
export class ExtendedDataD3TimeseriesGraphComponent extends D3TimeseriesGraphComponent {
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
if (false) {
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.additionalData;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.additionalPreparedData;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.iterableDiffers;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.api;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.datasetIdResolver;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.timeSrvc;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.timeFormatLocaleService;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.colorService;
    /** @type {?} */
    ExtendedDataD3TimeseriesGraphComponent.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvZDMvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtZGF0YS1kMy10aW1lc2VyaWVzLWdyYXBoL2V4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFHZixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBa0IsaUJBQWlCLEVBQWUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQztBQUU1QixPQUFPLEVBQ0wsMEJBQTBCLEdBRzNCLE1BQU0sc0RBQXNELENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q3BGLE1BQU0sNkNBQThDLFNBQVEsMEJBQTBCOzs7Ozs7Ozs7O0lBT3BGLFlBQ1ksZUFBZ0MsRUFDaEMsR0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLFFBQWMsRUFDZCx1QkFBa0QsRUFDbEQsWUFBMEIsRUFDMUIsZ0JBQWtDO1FBRTVDLEtBQUssQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQVJ4RyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFDeEIsc0JBQWlCLEdBQWpCLGlC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QztnQkFDakQsUUFBUSxFQUFFO0NBQ1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsaWVBQWllLENBQUM7Z0JBQzNlLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7O1lBekRDLGVBQWU7WUFLTSxtQkFBbUI7WUFBa0IsaUJBQWlCO1lBQWUsSUFBSTtZQVN2Rix5QkFBeUI7WUFUekIsWUFBWTtZQUNaLGdCQUFnQjs7OzZCQXNEdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2UsIERhdGFzZXRBcGlJbnRlcmZhY2UsIERhdGFzZXRPcHRpb25zLCBJbnRlcm5hbElkSGFuZGxlciwgTWluTWF4UmFuZ2UsIFRpbWUgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgZXh0ZW50IH0gZnJvbSAnZDMnO1xuXG5pbXBvcnQge1xuICBEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudCxcbiAgRGF0YUVudHJ5LFxuICBJbnRlcm5hbERhdGFFbnRyeSxcbn0gZnJvbSAnLi4vZDMtdGltZXNlcmllcy1ncmFwaC9kMy10aW1lc2VyaWVzLWdyYXBoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEM1RpbWVGb3JtYXRMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVyL2QzLXRpbWUtZm9ybWF0LWxvY2FsZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBBZGRpdGlvbmFsIERhdGEgd2hpY2ggY2FuIGJlIGFkZCB0byB0aGUgY29tcG9uZW50IHtAbGluayBFeHRlbmRlZERhdGFEM1RpbWVzZXJpZXNHcmFwaENvbXBvbmVudH0gYXMgSW5wdXQuXG4gKiBPbmUgb2YgdGhlIG9wdGlvbmFsIHByb3BlcnRpZXMgJ2xpbmtlZERhdGFzZXRJZCcgYW5kICd5YXhpc0xhYmVsJyBpcyBtYW5kYXRvcnkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRkaXRpb25hbERhdGEge1xuICAvKipcbiAgICogTGlua2VkIHRvIGFuIGV4aXN0aW5nIGRhdGFzZXQgaW4gdGhlIGdyYXBoIGNvbXBvbmVudCBhbmQgdXNlcyBpdCBkYXRhc2V0IG9wdGlvbnMgaWYgbm8gb3RoZXIgZGF0YXNldG9wdGlvbnMgYXJlIHByZXNlbnRlZC5cbiAgICovXG4gIGxpbmtlZERhdGFzZXRJZD86IHN0cmluZztcbiAgLyoqXG4gICAqIFktQXhpcyBsYWJlbCBpZiBubyBsaW5rIHRvIGFuIGV4aXN0aW5nIGRhdGFzZXQgaXMgZ2l2ZW4uXG4gICAqL1xuICB5YXhpc0xhYmVsPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGRhdGFzZXQgb3B0aW9ucywgd2hpY2ggZGVzY3JpYmVzIHRoZSBzdHlsaW5nIG9mIHRoZSBhZGRpdGlvbmFsIGRhdGEuXG4gICAqL1xuICBkYXRhc2V0T3B0aW9ucz86IERhdGFzZXRPcHRpb25zO1xuICAvKipcbiAgICogVGhlIGFkZGl0aW9uYWwgZGF0YSBhcnJleSB3aXRoIHR1cGVscyBvZiB0aW1lc3RhbXAgYW5kIHZhbHVlLlxuICAgKi9cbiAgZGF0YTogQWRkaXRpb25hbERhdGFFbnRyeVtdO1xufVxuXG4vKipcbiAqIEFkZGl0aW9uYWwgZGF0YSBlbnRyeSB0dXBsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFkZGl0aW9uYWxEYXRhRW50cnkge1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgdmFsdWU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIHRoZSBjb21tb24gZDMgY29tcG9uZW50LCB3aXRoIHRoZSBhYmlsaXR5IHRvIGFkZCBhZGRpdGlvbmFsIGRhdGEgdG8gdGhlIGdyYXBoLiBUbyBzZXQgb3IgY2hhbmdlICBhZGRpdGlvbmFsIGRhdGEsIGFsbHdheXMgc2V0cyB0aGUgY29tcGxldGUgYXJyYXkgb2YgZGF0YSBuZXcuIFRoZSBjb21wb25ldCBqdXN0IHJlZHJhd3MgaWZcbiAqIHRoZSBhcnJheSBpcyByZXNldC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbjUyLWV4dGVuZGVkLWRhdGEtZDMtdGltZXNlcmllcy1ncmFwaCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImQzXCIgI2QzdGltZXNlcmllcz48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZDN7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmQzIC5ncmlkIC50aWNrIGxpbmV7c3Ryb2tlOiNkM2QzZDM7c3Ryb2tlLW9wYWNpdHk6Ljc7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmQzIC5ncmFwaERvdHN7c3Ryb2tlLXdpZHRoOjA7c3Ryb2tlLW9wYWNpdHk6MX0uZDMgLmdyYXBoRG90cyAuaG92ZXJ7c3Ryb2tlLXdpZHRoOjIwcHg7c3Ryb2tlLW9wYWNpdHk6LjV9LmQzIC5mb3JtZXJCdXR0b24sLmQzIC5sYXRlckJ1dHRvbntmaWxsOmdyZXk7b3BhY2l0eTouM30uZDMgLmZvcm1lckJ1dHRvbjpob3ZlciwuZDMgLmxhdGVyQnV0dG9uOmhvdmVye29wYWNpdHk6LjZ9LmQzIC5hcnJvd3tzdHJva2U6Z3JleTtzdHJva2Utd2lkdGg6M3B4fWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEV4dGVuZGVkRGF0YUQzVGltZXNlcmllc0dyYXBoQ29tcG9uZW50IGV4dGVuZHMgRDNUaW1lc2VyaWVzR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBhZGRpdGlvbmFsRGF0YTogQWRkaXRpb25hbERhdGFbXSA9IFtdO1xuXG4gIHByaXZhdGUgYWRkaXRpb25hbFByZXBhcmVkRGF0YTogSW50ZXJuYWxEYXRhRW50cnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgIHByb3RlY3RlZCB0aW1lRm9ybWF0TG9jYWxlU2VydmljZTogRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaXRlcmFibGVEaWZmZXJzLCBhcGksIGRhdGFzZXRJZFJlc29sdmVyLCB0aW1lU3J2YywgdGltZUZvcm1hdExvY2FsZVNlcnZpY2UsIGNvbG9yU2VydmljZSwgdHJhbnNsYXRlU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICAgIGlmIChjaGFuZ2VzLmFkZGl0aW9uYWxEYXRhICYmIHRoaXMuYWRkaXRpb25hbERhdGEgJiYgdGhpcy5ncmFwaCkge1xuICAgICAgdGhpcy5jbGVhckFkZGl0aW9uYWxEYXRhKCk7XG4gICAgICB0aGlzLnBsb3RHcmFwaCgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwbG90R3JhcGgoKSB7XG4gICAgdGhpcy5wcmVwYXJlQWRkaXRpb25hbERhdGEoKTtcbiAgICBzdXBlci5wbG90R3JhcGgoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgaWYgKHRoaXMuYWRkaXRpb25hbERhdGEpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbG90R3JhcGgoKSwgMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckFkZGl0aW9uYWxEYXRhKCkge1xuICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbS5mb3JFYWNoKGUgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBlLmlkcy5pbmRleE9mKGRhdGEuaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChpZHggPiAtMSkgeyBlLmlkcy5zcGxpY2UoaWR4LCAxKTsgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy55UmFuZ2VzRWFjaFVvbSkge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMueVJhbmdlc0VhY2hVb20ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMueVJhbmdlc0VhY2hVb21baV07XG4gICAgICAgIGlmIChlbGVtZW50Lmlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYWRkaXRpb25hbFByZXBhcmVkRGF0YSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlQWRkaXRpb25hbERhdGEoKSB7XG4gICAgaWYgKHRoaXMuYWRkaXRpb25hbERhdGEpIHtcbiAgICAgIHRoaXMuYWRkaXRpb25hbERhdGEuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIGlmICgoZW50cnkubGlua2VkRGF0YXNldElkIHx8IGVudHJ5LnlheGlzTGFiZWwpICYmIGVudHJ5LmRhdGEpIHtcblxuICAgICAgICAgIGlmIChlbnRyeS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gZW50cnkuZGF0YXNldE9wdGlvbnMgfHwgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoZW50cnkubGlua2VkRGF0YXNldElkKTtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gdGhpcy5kYXRhc2V0TWFwLmdldChlbnRyeS5saW5rZWREYXRhc2V0SWQpO1xuICAgICAgICAgICAgY29uc3QgcHJlcERhdGFJZHggPSB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGEuZmluZEluZGV4KGUgPT4gZS5pbnRlcm5hbElkLnN0YXJ0c1dpdGgoZW50cnkubGlua2VkRGF0YXNldElkKSB8fCBlLmludGVybmFsSWQgPT09IGVudHJ5LnlheGlzTGFiZWwpO1xuICAgICAgICAgICAgbGV0IGRhdGFFbnRyeTogSW50ZXJuYWxEYXRhRW50cnk7XG4gICAgICAgICAgICBpZiAocHJlcERhdGFJZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgIGRhdGFFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbElkOiBlbnRyeS5saW5rZWREYXRhc2V0SWQgPyBlbnRyeS5saW5rZWREYXRhc2V0SWQgKyAnYWRkJyA6IGVudHJ5LnlheGlzTGFiZWwsXG4gICAgICAgICAgICAgICAgaWQ6IC0xLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBvcHRpb25zLmNvbG9yLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMudmlzaWJsZSA/IGVudHJ5LmRhdGEubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBlLnRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGUudmFsdWVcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkgOiBbXSxcbiAgICAgICAgICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogb3B0aW9ucy5jb2xvclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogb3B0aW9ucy5saW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgICBwb2ludFJhZGl1czogb3B0aW9ucy5wb2ludFJhZGl1c1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYmFyczoge1xuICAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiBvcHRpb25zLmxpbmVXaWR0aFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXhpc09wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgIHVvbTogZGF0YXNldCA/IGRhdGFzZXQudW9tIDogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhc2V0ID8gZGF0YXNldC5sYWJlbCA6IGVudHJ5LnlheGlzTGFiZWwsXG4gICAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IG9wdGlvbnMuemVyb0Jhc2VkWUF4aXMsXG4gICAgICAgICAgICAgICAgICB5QXhpc1JhbmdlOiBvcHRpb25zLnlBeGlzUmFuZ2UsXG4gICAgICAgICAgICAgICAgICBhdXRvUmFuZ2VTZWxlY3Rpb246IG9wdGlvbnMuYXV0b1JhbmdlU2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgc2VwYXJhdGVZQXhpczogb3B0aW9ucy5zZXBhcmF0ZVlBeGlzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBvcHRpb25zLnZpc2libGVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgaWYgKGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICBkYXRhRW50cnkuYXhpc09wdGlvbnMucGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgICAgICAgIGZlYXR1cmU6IGRhdGFzZXQucGFyYW1ldGVycy5mZWF0dXJlLFxuICAgICAgICAgICAgICAgICAgcGhlbm9tZW5vbjogZGF0YXNldC5wYXJhbWV0ZXJzLnBoZW5vbWVub24sXG4gICAgICAgICAgICAgICAgICBvZmZlcmluZzogZGF0YXNldC5wYXJhbWV0ZXJzLm9mZmVyaW5nXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGEucHVzaChkYXRhRW50cnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5ID0gdGhpcy5hZGRpdGlvbmFsUHJlcGFyZWREYXRhW3ByZXBEYXRhSWR4XTtcbiAgICAgICAgICAgICAgZGF0YUVudHJ5LmF4aXNPcHRpb25zLnVvbSA9IGRhdGFzZXQgPyBkYXRhc2V0LnVvbSA6IGVudHJ5LnlheGlzTGFiZWw7XG4gICAgICAgICAgICAgIGRhdGFFbnRyeS5heGlzT3B0aW9ucy5sYWJlbCA9IGRhdGFzZXQgPyBkYXRhc2V0LmxhYmVsIDogZW50cnkueWF4aXNMYWJlbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbmV3RGF0YXNldElkeCA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZEluZGV4KChlKSA9PiBlLmlkcy5pbmRleE9mKGVudHJ5LmxpbmtlZERhdGFzZXRJZCkgPiAtMSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhRXh0ZW50ID0gZXh0ZW50PERhdGFFbnRyeSwgbnVtYmVyPihkYXRhRW50cnkuZGF0YSwgKGQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXNwYW4uZnJvbSA8PSBkLnRpbWVzdGFtcCAmJiB0aGlzLnRpbWVzcGFuLnRvID49IGQudGltZXN0YW1wKSB7IHJldHVybiBkLnZhbHVlOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZShkYXRhRXh0ZW50WzBdKSAmJiBpc0Zpbml0ZShkYXRhRXh0ZW50WzFdKSkge1xuICAgICAgICAgICAgICBjb25zdCByYW5nZTogTWluTWF4UmFuZ2UgPSB7IG1pbjogZGF0YUV4dGVudFswXSwgbWF4OiBkYXRhRXh0ZW50WzFdIH07XG4gICAgICAgICAgICAgIHRoaXMuZXh0ZW5kUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgICBpZiAobmV3RGF0YXNldElkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ0F4aXNJbmRleCA9IHRoaXMueVJhbmdlc0VhY2hVb20uZmluZEluZGV4KGUgPT4gZS5pZHMuaW5kZXhPZihlbnRyeS55YXhpc0xhYmVsKSAhPT0gLTEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4aXNSYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgIHVvbTogZW50cnkueWF4aXNMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICAgIGF1dG9SYW5nZTogb3B0aW9ucy5hdXRvUmFuZ2VTZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICBwcmVSYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgICBvcmlnaW5SYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgICB6ZXJvQmFzZWQ6IG9wdGlvbnMuemVyb0Jhc2VkWUF4aXMsXG4gICAgICAgICAgICAgICAgICBvdXRPZnJhbmdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIGlkczogW2VudHJ5LnlheGlzTGFiZWxdLFxuICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogZGF0YUVudHJ5LmF4aXNPcHRpb25zLnBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0F4aXNJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW2V4aXN0aW5nQXhpc0luZGV4XSA9IGF4aXNSYW5nZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbS5wdXNoKGF4aXNSYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLnJhbmdlLm1pbiA9IE1hdGgubWluKHJhbmdlLm1pbiwgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZS5taW4pO1xuICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZS5tYXggPSBNYXRoLm1heChyYW5nZS5tYXgsIHRoaXMueVJhbmdlc0VhY2hVb21bbmV3RGF0YXNldElkeF0ucmFuZ2UubWF4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy55UmFuZ2VzRWFjaFVvbVtuZXdEYXRhc2V0SWR4XS5yYW5nZSA9IHJhbmdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnlSYW5nZXNFYWNoVW9tW25ld0RhdGFzZXRJZHhdLmlkcy5wdXNoKGVudHJ5LmxpbmtlZERhdGFzZXRJZCA/IGVudHJ5LmxpbmtlZERhdGFzZXRJZCArICdhZGQnIDogZW50cnkueWF4aXNMYWJlbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGVudHJ5LnlheGlzTGFiZWwgJiYgIWVudHJ5LmxpbmtlZERhdGFzZXRJZCkge1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLmxpc3RPZlVvbXMuaW5kZXhPZihlbnRyeS55YXhpc0xhYmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoaWR4IDwgMCkgeyB0aGlzLmxpc3RPZlVvbXMucHVzaChlbnRyeS55YXhpc0xhYmVsKTsgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybignUGxlYXNlIGNoZWNrIHRoZSBhZGRpdGlvbmFsIGVudHJ5LCBpdCBuZWVkcyBhdCBsZWFzdCBhIFxcJ2xpbmtlZERhdGFzZXRJZFxcJyBvciBhIFxcJ3lheGlzTGFiZWxcXCcgcHJvcGVydHkgYW5kIGEgXFwnZGF0YVxcJyBwcm9wZXJ0eTogJywgZW50cnkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZHJhd0FsbEdyYXBoTGluZXMoKSB7XG4gICAgc3VwZXIuZHJhd0FsbEdyYXBoTGluZXMoKTtcbiAgICB0aGlzLmFkZGl0aW9uYWxQcmVwYXJlZERhdGEuZm9yRWFjaChlID0+IHRoaXMuZHJhd0dyYXBoTGluZShlKSk7XG4gIH1cblxufVxuIl19