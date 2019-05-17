/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output, } from '@angular/core';
import { ResizableComponent } from '../model/internal/ResizableComponent';
import { TimeInterval } from '../model/internal/timeInterval';
/** @type {?} */
const equal = require('deep-equal');
/**
 * @record
 */
export function PresenterOptions() { }
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * Abstract superclass for all components, which will present datasets.
 * @abstract
 * @template T, U
 */
export class DatasetPresenterComponent extends ResizableComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} api
     * @param {?} datasetIdResolver
     * @param {?} timeSrvc
     * @param {?} translateService
     */
    constructor(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) {
        super();
        this.iterableDiffers = iterableDiffers;
        this.api = api;
        this.datasetIdResolver = datasetIdResolver;
        this.timeSrvc = timeSrvc;
        this.translateService = translateService;
        /**
         * List of presented dataset ids.
         */
        this.datasetIds = [];
        /**
         * List of presented selected dataset ids.
         */
        this.selectedDatasetIds = [];
        /**
         * Event with a list of selected datasets.
         */
        this.onDatasetSelected = new EventEmitter();
        /**
         * Event when the timespan in the presentation is adjusted.
         */
        this.onTimespanChanged = new EventEmitter();
        /**
         * Event, when there occured a message in the component.
         */
        this.onMessageThrown = new EventEmitter();
        /**
         * Event flag, while there is data loaded in the component.
         */
        this.onContentLoading = new EventEmitter();
        this.datasetIdsDiffer = this.iterableDiffers.find([]).create();
        this.selectedDatasetIdsDiffer = this.iterableDiffers.find([]).create();
        this.langChangeSubscription = this.translateService.onLangChange.subscribe((langChangeEvent) => this.onLanguageChanged(langChangeEvent));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeInterval"] && this.timeInterval) {
            this.timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
            this.timeIntervalChanges();
        }
        if (changes["reloadForDatasets"] && this.reloadForDatasets && this.reloadDataForDatasets.length > 0) {
            this.reloadDataForDatasets(this.reloadForDatasets);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.langChangeSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        const datasetIdsChanges = this.datasetIdsDiffer.diff(this.datasetIds);
        if (datasetIdsChanges) {
            datasetIdsChanges.forEachAddedItem((addedItem) => {
                this.addDatasetByInternalId(addedItem.item);
            });
            datasetIdsChanges.forEachRemovedItem((removedItem) => {
                this.removeDataset(removedItem.item);
            });
        }
        /** @type {?} */
        const selectedDatasetIdsChanges = this.selectedDatasetIdsDiffer.diff(this.selectedDatasetIds);
        if (selectedDatasetIdsChanges) {
            selectedDatasetIdsChanges.forEachAddedItem((addedItem) => {
                this.setSelectedId(addedItem.item);
            });
            selectedDatasetIdsChanges.forEachRemovedItem((removedItem) => {
                this.removeSelectedId(removedItem.item);
            });
        }
        if (!equal(this.oldPresenterOptions, this.presenterOptions)) {
            this.oldPresenterOptions = Object.assign({}, this.presenterOptions);
            /** @type {?} */
            const options = Object.assign({}, this.presenterOptions);
            this.presenterOptionsChanged(options);
        }
        if (this.datasetOptions) {
            /** @type {?} */
            const firstChange = this.oldDatasetOptions === undefined;
            if (firstChange) {
                this.oldDatasetOptions = new Map();
            }
            this.datasetOptions.forEach((value, key) => {
                if (!equal(value, this.oldDatasetOptions.get(key))) {
                    this.oldDatasetOptions.set(key, Object.assign({}, this.datasetOptions.get(key)));
                    this.datasetOptionsChanged(key, value, firstChange);
                }
            });
        }
    }
    /**
     * @param {?} internalId
     * @return {?}
     */
    addDatasetByInternalId(internalId) {
        /** @type {?} */
        const internalIdObj = this.datasetIdResolver.resolveInternalId(internalId);
        this.addDataset(internalIdObj.id, internalIdObj.url);
    }
}
DatasetPresenterComponent.propDecorators = {
    datasetIds: [{ type: Input }],
    selectedDatasetIds: [{ type: Input }],
    timeInterval: [{ type: Input }],
    datasetOptions: [{ type: Input }],
    presenterOptions: [{ type: Input }],
    reloadForDatasets: [{ type: Input }],
    onDatasetSelected: [{ type: Output }],
    onTimespanChanged: [{ type: Output }],
    onMessageThrown: [{ type: Output }],
    onContentLoading: [{ type: Output }]
};
if (false) {
    /**
     * List of presented dataset ids.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.datasetIds;
    /**
     * List of presented selected dataset ids.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.selectedDatasetIds;
    /**
     * The time interval in which the data should presented.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.timeInterval;
    /**
     * The corresponding dataset options.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.datasetOptions;
    /** @type {?} */
    DatasetPresenterComponent.prototype.oldDatasetOptions;
    /**
     * Options for general presentation of the data.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.presenterOptions;
    /** @type {?} */
    DatasetPresenterComponent.prototype.oldPresenterOptions;
    /**
     * List of datasets for which a reload should be triggered, when the Array is set to new value.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.reloadForDatasets;
    /**
     * Event with a list of selected datasets.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.onDatasetSelected;
    /**
     * Event when the timespan in the presentation is adjusted.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.onTimespanChanged;
    /**
     * Event, when there occured a message in the component.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.onMessageThrown;
    /**
     * Event flag, while there is data loaded in the component.
     * @type {?}
     */
    DatasetPresenterComponent.prototype.onContentLoading;
    /** @type {?} */
    DatasetPresenterComponent.prototype.isContentLoading;
    /** @type {?} */
    DatasetPresenterComponent.prototype.timespan;
    /** @type {?} */
    DatasetPresenterComponent.prototype.datasetIdsDiffer;
    /** @type {?} */
    DatasetPresenterComponent.prototype.selectedDatasetIdsDiffer;
    /** @type {?} */
    DatasetPresenterComponent.prototype.langChangeSubscription;
    /** @type {?} */
    DatasetPresenterComponent.prototype.iterableDiffers;
    /** @type {?} */
    DatasetPresenterComponent.prototype.api;
    /** @type {?} */
    DatasetPresenterComponent.prototype.datasetIdResolver;
    /** @type {?} */
    DatasetPresenterComponent.prototype.timeSrvc;
    /** @type {?} */
    DatasetPresenterComponent.prototype.translateService;
    /**
     * @abstract
     * @param {?} datasets
     * @return {?}
     */
    DatasetPresenterComponent.prototype.reloadDataForDatasets = function (datasets) { };
    /**
     * @abstract
     * @param {?} langChangeEvent
     * @return {?}
     */
    DatasetPresenterComponent.prototype.onLanguageChanged = function (langChangeEvent) { };
    /**
     * @abstract
     * @return {?}
     */
    DatasetPresenterComponent.prototype.timeIntervalChanges = function () { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    DatasetPresenterComponent.prototype.addDataset = function (id, url) { };
    /**
     * @abstract
     * @param {?} internalId
     * @return {?}
     */
    DatasetPresenterComponent.prototype.removeDataset = function (internalId) { };
    /**
     * @abstract
     * @param {?} internalId
     * @return {?}
     */
    DatasetPresenterComponent.prototype.setSelectedId = function (internalId) { };
    /**
     * @abstract
     * @param {?} internalId
     * @return {?}
     */
    DatasetPresenterComponent.prototype.removeSelectedId = function (internalId) { };
    /**
     * @abstract
     * @param {?} options
     * @return {?}
     */
    DatasetPresenterComponent.prototype.presenterOptionsChanged = function (options) { };
    /**
     * @abstract
     * @param {?} internalId
     * @param {?} options
     * @param {?} firstChange
     * @return {?}
     */
    DatasetPresenterComponent.prototype.datasetOptionsChanged = function (internalId, options, firstChange) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1wcmVzZW50ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3ByZXNlbnRpbmcvZGF0YXNldC1wcmVzZW50ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsWUFBWSxFQUNaLEtBQUssRUFLTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFPdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLGdDQUFnQyxDQUFDOztBQUt4RSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQU9wQyxNQUFNLGdDQUNGLFNBQVEsa0JBQWtCOzs7Ozs7OztJQXdFMUIsWUFDYyxlQUFnQyxFQUNoQyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsUUFBYyxFQUNkLGdCQUFrQztRQUU1QyxLQUFLLEVBQUUsQ0FBQztRQU5FLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQU07UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzs7OzBCQXZFbEIsRUFBRTs7OztrQ0FNTSxFQUFFOzs7O2lDQWdDVyxJQUFJLFlBQVksRUFBRTs7OztpQ0FNbEIsSUFBSSxZQUFZLEVBQUU7Ozs7K0JBTVosSUFBSSxZQUFZLEVBQUU7Ozs7Z0NBTTFCLElBQUksWUFBWSxFQUFFO1FBa0IvRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWdDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0tBQzdKOzs7OztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFpQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyx5QkFBc0IsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdEQ7Ozs7O0lBR0UsV0FBVztRQUNkLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7SUFHdkMsU0FBUzs7UUFDWixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNwQixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DLENBQUMsQ0FBQztZQUNILGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDLENBQUMsQ0FBQztTQUNOOztRQUVELE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RixFQUFFLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFDNUIseUJBQXlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEMsQ0FBQyxDQUFDO1lBQ0gseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7U0FDTjtRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztZQUNwRSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7WUFDdEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixLQUFLLFNBQVMsQ0FBQztZQUN6RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQUU7WUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUN2RDthQUNKLENBQUMsQ0FBQztTQUNOOzs7Ozs7SUFLSyxzQkFBc0IsQ0FBQyxVQUFrQjs7UUFDL0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEQ7Ozt5QkExSUEsS0FBSztpQ0FNTCxLQUFLOzJCQU1MLEtBQUs7NkJBTUwsS0FBSzsrQkFPTCxLQUFLO2dDQU9MLEtBQUs7Z0NBTUwsTUFBTTtnQ0FNTixNQUFNOzhCQU1OLE1BQU07K0JBTU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRG9DaGVjayxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ0NoYW5nZUV2ZW50LCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJy4uL2RhdGFzZXQtYXBpL2FwaS1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW50ZXJuYWxJZEhhbmRsZXIgfSBmcm9tICcuLi9kYXRhc2V0LWFwaS9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zJztcbmltcG9ydCB7IFJlc2l6YWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL1Jlc2l6YWJsZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lSW50ZXJ2YWwsIFRpbWVzcGFuIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsJztcbmltcG9ydCB7IEhhc0xvYWRhYmxlQ29udGVudCB9IGZyb20gJy4uL21vZGVsL21peGlucy9oYXMtbG9hZGFibGUtY29udGVudCc7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSAnLi4vdGltZS90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJlc2VudGVyTWVzc2FnZSB9IGZyb20gJy4vcHJlc2VudGVyLW1lc3NhZ2UnO1xuXG5jb25zdCBlcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcblxuZXhwb3J0IGludGVyZmFjZSBQcmVzZW50ZXJPcHRpb25zIHsgfVxuXG4vKipcbiAqIEFic3RyYWN0IHN1cGVyY2xhc3MgZm9yIGFsbCBjb21wb25lbnRzLCB3aGljaCB3aWxsIHByZXNlbnQgZGF0YXNldHMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhc2V0UHJlc2VudGVyQ29tcG9uZW50PFQgZXh0ZW5kcyBEYXRhc2V0T3B0aW9ucyB8IERhdGFzZXRPcHRpb25zW10sIFUgZXh0ZW5kcyBQcmVzZW50ZXJPcHRpb25zPlxuICAgIGV4dGVuZHMgUmVzaXphYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrLCBPbkRlc3Ryb3ksIEhhc0xvYWRhYmxlQ29udGVudCB7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHByZXNlbnRlZCBkYXRhc2V0IGlkcy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBwcmVzZW50ZWQgc2VsZWN0ZWQgZGF0YXNldCBpZHMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRhc2V0SWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpbWUgaW50ZXJ2YWwgaW4gd2hpY2ggdGhlIGRhdGEgc2hvdWxkIHByZXNlbnRlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb3JyZXNwb25kaW5nIGRhdGFzZXQgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgVD47XG4gICAgcHJvdGVjdGVkIG9sZERhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBUPjtcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgZm9yIGdlbmVyYWwgcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRhLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHByZXNlbnRlck9wdGlvbnM6IFU7XG4gICAgcHJvdGVjdGVkIG9sZFByZXNlbnRlck9wdGlvbnM6IFU7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGRhdGFzZXRzIGZvciB3aGljaCBhIHJlbG9hZCBzaG91bGQgYmUgdHJpZ2dlcmVkLCB3aGVuIHRoZSBBcnJheSBpcyBzZXQgdG8gbmV3IHZhbHVlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJlbG9hZEZvckRhdGFzZXRzOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHdpdGggYSBsaXN0IG9mIHNlbGVjdGVkIGRhdGFzZXRzLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkRhdGFzZXRTZWxlY3RlZDogRXZlbnRFbWl0dGVyPHN0cmluZ1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHdoZW4gdGhlIHRpbWVzcGFuIGluIHRoZSBwcmVzZW50YXRpb24gaXMgYWRqdXN0ZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVGltZXNwYW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQsIHdoZW4gdGhlcmUgb2NjdXJlZCBhIG1lc3NhZ2UgaW4gdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25NZXNzYWdlVGhyb3duOiBFdmVudEVtaXR0ZXI8UHJlc2VudGVyTWVzc2FnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmbGFnLCB3aGlsZSB0aGVyZSBpcyBkYXRhIGxvYWRlZCBpbiB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkNvbnRlbnRMb2FkaW5nOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNDb250ZW50TG9hZGluZzogKGxvYWRpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgdGltZXNwYW46IFRpbWVzcGFuO1xuXG4gICAgcHJpdmF0ZSBkYXRhc2V0SWRzRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+O1xuICAgIHByaXZhdGUgc2VsZWN0ZWREYXRhc2V0SWRzRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+O1xuICAgIHByaXZhdGUgbGFuZ0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFzZXRJZFJlc29sdmVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRpbWVTcnZjOiBUaW1lLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHNEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGFzZXRJZHNEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5sYW5nQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KSA9PiB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnRpbWVJbnRlcnZhbCAmJiB0aGlzLnRpbWVJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy50aW1lc3BhbiA9IHRoaXMudGltZVNydmMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRoaXMudGltZUludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMudGltZUludGVydmFsQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzLnJlbG9hZEZvckRhdGFzZXRzICYmIHRoaXMucmVsb2FkRm9yRGF0YXNldHMgJiYgdGhpcy5yZWxvYWREYXRhRm9yRGF0YXNldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZWxvYWREYXRhRm9yRGF0YXNldHModGhpcy5yZWxvYWRGb3JEYXRhc2V0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFuZ0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRJZHNDaGFuZ2VzID0gdGhpcy5kYXRhc2V0SWRzRGlmZmVyLmRpZmYodGhpcy5kYXRhc2V0SWRzKTtcbiAgICAgICAgaWYgKGRhdGFzZXRJZHNDaGFuZ2VzKSB7XG4gICAgICAgICAgICBkYXRhc2V0SWRzQ2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChhZGRlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZERhdGFzZXRCeUludGVybmFsSWQoYWRkZWRJdGVtLml0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYXRhc2V0SWRzQ2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlbW92ZWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEYXRhc2V0KHJlbW92ZWRJdGVtLml0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZERhdGFzZXRJZHNDaGFuZ2VzID0gdGhpcy5zZWxlY3RlZERhdGFzZXRJZHNEaWZmZXIuZGlmZih0aGlzLnNlbGVjdGVkRGF0YXNldElkcyk7XG4gICAgICAgIGlmIChzZWxlY3RlZERhdGFzZXRJZHNDaGFuZ2VzKSB7XG4gICAgICAgICAgICBzZWxlY3RlZERhdGFzZXRJZHNDaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGFkZGVkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJZChhZGRlZEl0ZW0uaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YXNldElkc0NoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyZW1vdmVkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWRJZChyZW1vdmVkSXRlbS5pdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlcXVhbCh0aGlzLm9sZFByZXNlbnRlck9wdGlvbnMsIHRoaXMucHJlc2VudGVyT3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMub2xkUHJlc2VudGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJlc2VudGVyT3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcmVzZW50ZXJPcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMucHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhc2V0T3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RDaGFuZ2UgPSB0aGlzLm9sZERhdGFzZXRPcHRpb25zID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFuZ2UpIHsgdGhpcy5vbGREYXRhc2V0T3B0aW9ucyA9IG5ldyBNYXAoKTsgfVxuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbCh2YWx1ZSwgdGhpcy5vbGREYXRhc2V0T3B0aW9ucy5nZXQoa2V5KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGREYXRhc2V0T3B0aW9ucy5zZXQoa2V5LCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRhdGFzZXRPcHRpb25zLmdldChrZXkpKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGtleSwgdmFsdWUsIGZpcnN0Q2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhYnN0cmFjdCByZWxvYWREYXRhRm9yRGF0YXNldHMoZGF0YXNldHM6IHN0cmluZ1tdKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhZGREYXRhc2V0QnlJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbnRlcm5hbElkT2JqID0gdGhpcy5kYXRhc2V0SWRSZXNvbHZlci5yZXNvbHZlSW50ZXJuYWxJZChpbnRlcm5hbElkKTtcbiAgICAgICAgdGhpcy5hZGREYXRhc2V0KGludGVybmFsSWRPYmouaWQsIGludGVybmFsSWRPYmoudXJsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHRpbWVJbnRlcnZhbENoYW5nZXMoKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhZGREYXRhc2V0KGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2V0U2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlbW92ZVNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBwcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zOiBVKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBkYXRhc2V0T3B0aW9uc0NoYW5nZWQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zOiBULCBmaXJzdENoYW5nZTogYm9vbGVhbik6IHZvaWQ7XG5cbn1cbiJdfQ==