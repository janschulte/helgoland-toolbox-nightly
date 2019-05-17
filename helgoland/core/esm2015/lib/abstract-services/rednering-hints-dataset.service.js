/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DatasetService } from './dataset.service';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
export class RenderingHintsDatasetService extends DatasetService {
    /**
     * @param {?} api
     */
    constructor(api) {
        super();
        this.api = api;
    }
    /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    addDataset(internalId, options) {
        if (options) {
            this.datasetIds.push(internalId);
            this.datasetOptions.set(internalId, options);
        }
        else if (this.datasetIds.indexOf(internalId) < 0) {
            this.api.getSingleTimeseriesByInternalId(internalId).subscribe((timeseries) => this.addLoadedDataset(timeseries), (error) => {
                this.api.getDatasetByInternalId(internalId).subscribe((dataset) => this.addLoadedDataset(dataset));
            });
        }
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    addLoadedDataset(dataset) {
        this.datasetIds.push(dataset.internalId);
        this.datasetOptions.set(dataset.internalId, this.createOptionsOfRenderingHints(dataset));
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    createOptionsOfRenderingHints(dataset) {
        /** @type {?} */
        const options = /** @type {?} */ (this.createStyles(dataset.internalId));
        if (dataset.renderingHints) {
            if (dataset.renderingHints.properties && dataset.renderingHints.properties.color) {
                options.color = dataset.renderingHints.properties.color;
            }
            switch (dataset.renderingHints.chartType) {
                case 'line':
                    this.handleLineRenderingHints(/** @type {?} */ (dataset.renderingHints), options);
                    break;
                case 'bar':
                    this.handleBarRenderingHints(/** @type {?} */ (dataset.renderingHints), options);
                    break;
                default:
                    break;
            }
        }
        return /** @type {?} */ (options);
    }
    /**
     * @param {?} lineHints
     * @param {?} options
     * @return {?}
     */
    handleLineRenderingHints(lineHints, options) {
        if (lineHints.properties.width) {
            options.lineWidth = parseInt(lineHints.properties.width, 10);
        }
    }
    /**
     * @param {?} barHints
     * @param {?} options
     * @return {?}
     */
    handleBarRenderingHints(barHints, options) {
        if (barHints.properties.width) {
            options.lineWidth = parseInt(barHints.properties.width, 10);
        }
    }
}
if (false) {
    /** @type {?} */
    RenderingHintsDatasetService.prototype.api;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkbmVyaW5nLWhpbnRzLWRhdGFzZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1zZXJ2aWNlcy9yZWRuZXJpbmctaGludHMtZGF0YXNldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQUVuRCxNQUFNLG1DQUEwRixTQUFRLGNBQWlCOzs7O0lBRXJILFlBQ2MsR0FBd0I7UUFFbEMsS0FBSyxFQUFFLENBQUM7UUFGRSxRQUFHLEdBQUgsR0FBRyxDQUFxQjtLQUdyQzs7Ozs7O0lBRU0sVUFBVSxDQUFDLFVBQWtCLEVBQUUsT0FBVztRQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQzFELENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQ2pELENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQ2pELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQzlDLENBQUM7YUFDTCxDQUNKLENBQUM7U0FDTDs7Ozs7O0lBR0csZ0JBQWdCLENBQUMsT0FBaUI7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUdyRiw2QkFBNkIsQ0FBQyxPQUFpQjs7UUFDbkQsTUFBTSxPQUFPLHFCQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBbUIsRUFBQztRQUN4RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzthQUMzRDtZQUNELE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxNQUFNO29CQUNQLElBQUksQ0FBQyx3QkFBd0IsbUJBQUMsT0FBTyxDQUFDLGNBQW9DLEdBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3JGLEtBQUssQ0FBQztnQkFDVixLQUFLLEtBQUs7b0JBQ04sSUFBSSxDQUFDLHVCQUF1QixtQkFBQyxPQUFPLENBQUMsY0FBbUMsR0FBRSxPQUFPLENBQUMsQ0FBQztvQkFDbkYsS0FBSyxDQUFDO2dCQUNWO29CQUNJLEtBQUssQ0FBQzthQUNiO1NBQ0o7UUFDRCxNQUFNLG1CQUFDLE9BQVksRUFBQzs7Ozs7OztJQUloQix3QkFBd0IsQ0FBQyxTQUE2QixFQUFFLE9BQXVCO1FBQ25GLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRTs7Ozs7OztJQUdHLHVCQUF1QixDQUFDLFFBQTJCLEVBQUUsT0FBdUI7UUFDaEYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQy9EOztDQUVSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJy4uL2RhdGFzZXQtYXBpL2FwaS1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQmFyUmVuZGVyaW5nSGludHMsIElEYXRhc2V0LCBMaW5lUmVuZGVyaW5nSGludHMgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0JztcbmltcG9ydCB7IERhdGFzZXRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvb3B0aW9ucyc7XG5pbXBvcnQgeyBEYXRhc2V0U2VydmljZSB9IGZyb20gJy4vZGF0YXNldC5zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmluZ0hpbnRzRGF0YXNldFNlcnZpY2U8VCBleHRlbmRzIERhdGFzZXRPcHRpb25zIHwgRGF0YXNldE9wdGlvbnNbXT4gZXh0ZW5kcyBEYXRhc2V0U2VydmljZTxUPiB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9ucz86IFQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5wdXNoKGludGVybmFsSWQpO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhc2V0SWRzLmluZGV4T2YoaW50ZXJuYWxJZCkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS5nZXRTaW5nbGVUaW1lc2VyaWVzQnlJbnRlcm5hbElkKGludGVybmFsSWQpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAodGltZXNlcmllcykgPT4gdGhpcy5hZGRMb2FkZWREYXRhc2V0KHRpbWVzZXJpZXMpLFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5nZXREYXRhc2V0QnlJbnRlcm5hbElkKGludGVybmFsSWQpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhc2V0KSA9PiB0aGlzLmFkZExvYWRlZERhdGFzZXQoZGF0YXNldCksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTG9hZGVkRGF0YXNldChkYXRhc2V0OiBJRGF0YXNldCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMucHVzaChkYXRhc2V0LmludGVybmFsSWQpO1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChkYXRhc2V0LmludGVybmFsSWQsIHRoaXMuY3JlYXRlT3B0aW9uc09mUmVuZGVyaW5nSGludHMoZGF0YXNldCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlT3B0aW9uc09mUmVuZGVyaW5nSGludHMoZGF0YXNldDogSURhdGFzZXQpOiBUIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY3JlYXRlU3R5bGVzKGRhdGFzZXQuaW50ZXJuYWxJZCkgYXMgRGF0YXNldE9wdGlvbnM7XG4gICAgICAgIGlmIChkYXRhc2V0LnJlbmRlcmluZ0hpbnRzKSB7XG4gICAgICAgICAgICBpZiAoZGF0YXNldC5yZW5kZXJpbmdIaW50cy5wcm9wZXJ0aWVzICYmIGRhdGFzZXQucmVuZGVyaW5nSGludHMucHJvcGVydGllcy5jb2xvcikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29sb3IgPSBkYXRhc2V0LnJlbmRlcmluZ0hpbnRzLnByb3BlcnRpZXMuY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFzZXQucmVuZGVyaW5nSGludHMuY2hhcnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTGluZVJlbmRlcmluZ0hpbnRzKGRhdGFzZXQucmVuZGVyaW5nSGludHMgYXMgTGluZVJlbmRlcmluZ0hpbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYmFyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCYXJSZW5kZXJpbmdIaW50cyhkYXRhc2V0LnJlbmRlcmluZ0hpbnRzIGFzIEJhclJlbmRlcmluZ0hpbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnMgYXMgVDtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgaGFuZGxlTGluZVJlbmRlcmluZ0hpbnRzKGxpbmVIaW50czogTGluZVJlbmRlcmluZ0hpbnRzLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucykge1xuICAgICAgICBpZiAobGluZUhpbnRzLnByb3BlcnRpZXMud2lkdGgpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubGluZVdpZHRoID0gcGFyc2VJbnQobGluZUhpbnRzLnByb3BlcnRpZXMud2lkdGgsIDEwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQmFyUmVuZGVyaW5nSGludHMoYmFySGludHM6IEJhclJlbmRlcmluZ0hpbnRzLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucykge1xuICAgICAgICBpZiAoYmFySGludHMucHJvcGVydGllcy53aWR0aCkge1xuICAgICAgICAgICAgb3B0aW9ucy5saW5lV2lkdGggPSBwYXJzZUludChiYXJIaW50cy5wcm9wZXJ0aWVzLndpZHRoLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=