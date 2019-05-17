import { DoCheck, EventEmitter, IterableDiffers, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DatasetApiInterface } from '../dataset-api/api-interface';
import { InternalIdHandler } from '../dataset-api/internal-id-handler.service';
import { DatasetOptions } from '../model/internal/options';
import { ResizableComponent } from '../model/internal/ResizableComponent';
import { TimeInterval, Timespan } from '../model/internal/timeInterval';
import { HasLoadableContent } from '../model/mixins/has-loadable-content';
import { Time } from '../time/time.service';
import { PresenterMessage } from './presenter-message';
export interface PresenterOptions {
}
/**
 * Abstract superclass for all components, which will present datasets.
 */
export declare abstract class DatasetPresenterComponent<T extends DatasetOptions | DatasetOptions[], U extends PresenterOptions> extends ResizableComponent implements OnChanges, DoCheck, OnDestroy, HasLoadableContent {
    protected iterableDiffers: IterableDiffers;
    protected api: DatasetApiInterface;
    protected datasetIdResolver: InternalIdHandler;
    protected timeSrvc: Time;
    protected translateService: TranslateService;
    /**
     * List of presented dataset ids.
     */
    datasetIds: string[];
    /**
     * List of presented selected dataset ids.
     */
    selectedDatasetIds: string[];
    /**
     * The time interval in which the data should presented.
     */
    timeInterval: TimeInterval;
    /**
     * The corresponding dataset options.
     */
    datasetOptions: Map<string, T>;
    protected oldDatasetOptions: Map<string, T>;
    /**
     * Options for general presentation of the data.
     */
    presenterOptions: U;
    protected oldPresenterOptions: U;
    /**
     * List of datasets for which a reload should be triggered, when the Array is set to new value.
     */
    reloadForDatasets: string[];
    /**
     * Event with a list of selected datasets.
     */
    onDatasetSelected: EventEmitter<string[]>;
    /**
     * Event when the timespan in the presentation is adjusted.
     */
    onTimespanChanged: EventEmitter<Timespan>;
    /**
     * Event, when there occured a message in the component.
     */
    onMessageThrown: EventEmitter<PresenterMessage>;
    /**
     * Event flag, while there is data loaded in the component.
     */
    onContentLoading: EventEmitter<boolean>;
    isContentLoading: (loading: boolean) => void;
    protected timespan: Timespan;
    private datasetIdsDiffer;
    private selectedDatasetIdsDiffer;
    private langChangeSubscription;
    constructor(iterableDiffers: IterableDiffers, api: DatasetApiInterface, datasetIdResolver: InternalIdHandler, timeSrvc: Time, translateService: TranslateService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    abstract reloadDataForDatasets(datasets: string[]): void;
    protected addDatasetByInternalId(internalId: string): void;
    protected abstract onLanguageChanged(langChangeEvent: LangChangeEvent): void;
    protected abstract timeIntervalChanges(): void;
    protected abstract addDataset(id: string, url: string): void;
    protected abstract removeDataset(internalId: string): void;
    protected abstract setSelectedId(internalId: string): void;
    protected abstract removeSelectedId(internalId: string): void;
    protected abstract presenterOptionsChanged(options: U): void;
    protected abstract datasetOptionsChanged(internalId: string, options: T, firstChange: boolean): void;
}
