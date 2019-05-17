import { AfterViewInit, IterableDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { ColorService, DatasetApiInterface, DatasetOptions, InternalIdHandler, Time } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { D3TimeseriesGraphComponent } from '../d3-timeseries-graph/d3-timeseries-graph.component';
import { D3TimeFormatLocaleService } from '../helper/d3-time-format-locale.service';
/**
 * Additional Data which can be add to the component {@link ExtendedDataD3TimeseriesGraphComponent} as Input.
 * One of the optional properties 'linkedDatasetId' and 'yaxisLabel' is mandatory.
 */
export interface AdditionalData {
    /**
     * Linked to an existing dataset in the graph component and uses it dataset options if no other datasetoptions are presented.
     */
    linkedDatasetId?: string;
    /**
     * Y-Axis label if no link to an existing dataset is given.
     */
    yaxisLabel?: string;
    /**
     * The dataset options, which describes the styling of the additional data.
     */
    datasetOptions?: DatasetOptions;
    /**
     * The additional data arrey with tupels of timestamp and value.
     */
    data: AdditionalDataEntry[];
}
/**
 * Additional data entry tuple
 */
export interface AdditionalDataEntry {
    timestamp: number;
    value: number;
}
/**
 * Extends the common d3 component, with the ability to add additional data to the graph. To set or change  additional data, allways sets the complete array of data new. The componet just redraws if
 * the array is reset.
 */
export declare class ExtendedDataD3TimeseriesGraphComponent extends D3TimeseriesGraphComponent implements OnChanges, AfterViewInit {
    protected iterableDiffers: IterableDiffers;
    protected api: DatasetApiInterface;
    protected datasetIdResolver: InternalIdHandler;
    protected timeSrvc: Time;
    protected timeFormatLocaleService: D3TimeFormatLocaleService;
    protected colorService: ColorService;
    protected translateService: TranslateService;
    additionalData: AdditionalData[];
    private additionalPreparedData;
    constructor(iterableDiffers: IterableDiffers, api: DatasetApiInterface, datasetIdResolver: InternalIdHandler, timeSrvc: Time, timeFormatLocaleService: D3TimeFormatLocaleService, colorService: ColorService, translateService: TranslateService);
    ngOnChanges(changes: SimpleChanges): void;
    protected plotGraph(): void;
    ngAfterViewInit(): void;
    private clearAdditionalData();
    private prepareAdditionalData();
    protected drawAllGraphLines(): void;
}
