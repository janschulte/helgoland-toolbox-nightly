/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DatasetService } from './dataset.service';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var 
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
RenderingHintsDatasetService = /** @class */ (function (_super) {
    tslib_1.__extends(RenderingHintsDatasetService, _super);
    function RenderingHintsDatasetService(api) {
        var _this = _super.call(this) || this;
        _this.api = api;
        return _this;
    }
    /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    function (internalId, options) {
        var _this = this;
        if (options) {
            this.datasetIds.push(internalId);
            this.datasetOptions.set(internalId, options);
        }
        else if (this.datasetIds.indexOf(internalId) < 0) {
            this.api.getSingleTimeseriesByInternalId(internalId).subscribe(function (timeseries) { return _this.addLoadedDataset(timeseries); }, function (error) {
                _this.api.getDatasetByInternalId(internalId).subscribe(function (dataset) { return _this.addLoadedDataset(dataset); });
            });
        }
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.addLoadedDataset = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        this.datasetIds.push(dataset.internalId);
        this.datasetOptions.set(dataset.internalId, this.createOptionsOfRenderingHints(dataset));
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.createOptionsOfRenderingHints = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        /** @type {?} */
        var options = /** @type {?} */ (this.createStyles(dataset.internalId));
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
    };
    /**
     * @param {?} lineHints
     * @param {?} options
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.handleLineRenderingHints = /**
     * @param {?} lineHints
     * @param {?} options
     * @return {?}
     */
    function (lineHints, options) {
        if (lineHints.properties.width) {
            options.lineWidth = parseInt(lineHints.properties.width, 10);
        }
    };
    /**
     * @param {?} barHints
     * @param {?} options
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.handleBarRenderingHints = /**
     * @param {?} barHints
     * @param {?} options
     * @return {?}
     */
    function (barHints, options) {
        if (barHints.properties.width) {
            options.lineWidth = parseInt(barHints.properties.width, 10);
        }
    };
    return RenderingHintsDatasetService;
}(DatasetService));
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
export { RenderingHintsDatasetService };
if (false) {
    /** @type {?} */
    RenderingHintsDatasetService.prototype.api;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkbmVyaW5nLWhpbnRzLWRhdGFzZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hYnN0cmFjdC1zZXJ2aWNlcy9yZWRuZXJpbmctaGludHMtZGF0YXNldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFFbkQ7Ozs7OztBQUFBO0lBQXdHLHdEQUFpQjtJQUVySCxzQ0FDYyxHQUF3QjtRQUR0QyxZQUdJLGlCQUFPLFNBQ1Y7UUFIYSxTQUFHLEdBQUgsR0FBRyxDQUFxQjs7S0FHckM7Ozs7OztJQUVNLGlEQUFVOzs7OztjQUFDLFVBQWtCLEVBQUUsT0FBVzs7UUFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUMxRCxVQUFDLFVBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBakMsQ0FBaUMsRUFDakQsVUFBQyxLQUFLO2dCQUNGLEtBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUNqRCxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBOUIsQ0FBOEIsQ0FDOUMsQ0FBQzthQUNMLENBQ0osQ0FBQztTQUNMOzs7Ozs7SUFHRyx1REFBZ0I7Ozs7Y0FBQyxPQUFpQjtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBR3JGLG9FQUE2Qjs7OztjQUFDLE9BQWlCOztRQUNuRCxJQUFNLE9BQU8scUJBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFtQixFQUFDO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2FBQzNEO1lBQ0QsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLE1BQU07b0JBQ1AsSUFBSSxDQUFDLHdCQUF3QixtQkFBQyxPQUFPLENBQUMsY0FBb0MsR0FBRSxPQUFPLENBQUMsQ0FBQztvQkFDckYsS0FBSyxDQUFDO2dCQUNWLEtBQUssS0FBSztvQkFDTixJQUFJLENBQUMsdUJBQXVCLG1CQUFDLE9BQU8sQ0FBQyxjQUFtQyxHQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNuRixLQUFLLENBQUM7Z0JBQ1Y7b0JBQ0ksS0FBSyxDQUFDO2FBQ2I7U0FDSjtRQUNELE1BQU0sbUJBQUMsT0FBWSxFQUFDOzs7Ozs7O0lBSWhCLCtEQUF3Qjs7Ozs7Y0FBQyxTQUE2QixFQUFFLE9BQXVCO1FBQ25GLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRTs7Ozs7OztJQUdHLDhEQUF1Qjs7Ozs7Y0FBQyxRQUEyQixFQUFFLE9BQXVCO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvRDs7dUNBaEVUO0VBS3dHLGNBQWMsRUE2RHJILENBQUE7Ozs7OztBQTdERCx3Q0E2REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlIH0gZnJvbSAnLi4vZGF0YXNldC1hcGkvYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgeyBCYXJSZW5kZXJpbmdIaW50cywgSURhdGFzZXQsIExpbmVSZW5kZXJpbmdIaW50cyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zJztcbmltcG9ydCB7IERhdGFzZXRTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhc2V0LnNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyaW5nSGludHNEYXRhc2V0U2VydmljZTxUIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMgfCBEYXRhc2V0T3B0aW9uc1tdPiBleHRlbmRzIERhdGFzZXRTZXJ2aWNlPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZERhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zPzogVCkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnB1c2goaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoaW50ZXJuYWxJZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLmFkZExvYWRlZERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGFzZXQpID0+IHRoaXMuYWRkTG9hZGVkRGF0YXNldChkYXRhc2V0KSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRMb2FkZWREYXRhc2V0KGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIHRoaXMuZGF0YXNldElkcy5wdXNoKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgdGhpcy5jcmVhdGVPcHRpb25zT2ZSZW5kZXJpbmdIaW50cyhkYXRhc2V0KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVPcHRpb25zT2ZSZW5kZXJpbmdIaW50cyhkYXRhc2V0OiBJRGF0YXNldCk6IFQge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jcmVhdGVTdHlsZXMoZGF0YXNldC5pbnRlcm5hbElkKSBhcyBEYXRhc2V0T3B0aW9ucztcbiAgICAgICAgaWYgKGRhdGFzZXQucmVuZGVyaW5nSGludHMpIHtcbiAgICAgICAgICAgIGlmIChkYXRhc2V0LnJlbmRlcmluZ0hpbnRzLnByb3BlcnRpZXMgJiYgZGF0YXNldC5yZW5kZXJpbmdIaW50cy5wcm9wZXJ0aWVzLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb2xvciA9IGRhdGFzZXQucmVuZGVyaW5nSGludHMucHJvcGVydGllcy5jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YXNldC5yZW5kZXJpbmdIaW50cy5jaGFydFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVMaW5lUmVuZGVyaW5nSGludHMoZGF0YXNldC5yZW5kZXJpbmdIaW50cyBhcyBMaW5lUmVuZGVyaW5nSGludHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJhclJlbmRlcmluZ0hpbnRzKGRhdGFzZXQucmVuZGVyaW5nSGludHMgYXMgQmFyUmVuZGVyaW5nSGludHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucyBhcyBUO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBoYW5kbGVMaW5lUmVuZGVyaW5nSGludHMobGluZUhpbnRzOiBMaW5lUmVuZGVyaW5nSGludHMsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIGlmIChsaW5lSGludHMucHJvcGVydGllcy53aWR0aCkge1xuICAgICAgICAgICAgb3B0aW9ucy5saW5lV2lkdGggPSBwYXJzZUludChsaW5lSGludHMucHJvcGVydGllcy53aWR0aCwgMTApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVCYXJSZW5kZXJpbmdIaW50cyhiYXJIaW50czogQmFyUmVuZGVyaW5nSGludHMsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIGlmIChiYXJIaW50cy5wcm9wZXJ0aWVzLndpZHRoKSB7XG4gICAgICAgICAgICBvcHRpb25zLmxpbmVXaWR0aCA9IHBhcnNlSW50KGJhckhpbnRzLnByb3BlcnRpZXMud2lkdGgsIDEwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==