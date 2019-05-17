/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
/**
 * Represents an abstract dataset entry for a list, which has the following functions:
 *  - can be selected and is selectable internally, with a corresponding output event
 *  - can be deleted, which also triggers an output event
 *  - translatable, so it triggers the methode onLanguageChanged when the language is switched
 * @abstract
 */
var ListEntryComponent = /** @class */ (function () {
    function ListEntryComponent(internalIdHandler, translateSrvc) {
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onDeleteDataset = new EventEmitter();
        this.onSelectDataset = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.datasetId) {
            this.internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
            this.loadDataset(this.translateSrvc.currentLang);
        }
        this.langChangeSubscription = this.translateSrvc.onLangChange.subscribe(function (langChangeEvent) { return _this.onLanguageChanged(langChangeEvent); });
    };
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.langChangeSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.removeDataset = /**
     * @return {?}
     */
    function () {
        this.onDeleteDataset.emit(true);
    };
    /**
     * @return {?}
     */
    ListEntryComponent.prototype.toggleSelection = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
        this.onSelectDataset.emit(this.selected);
    };
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    ListEntryComponent.prototype.onLanguageChanged = /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    function (langChangeEvent) {
        if (this.internalId) {
            this.loadDataset(langChangeEvent.lang);
        }
    };
    ListEntryComponent.propDecorators = {
        datasetId: [{ type: Input }],
        selected: [{ type: Input }],
        onDeleteDataset: [{ type: Output }],
        onSelectDataset: [{ type: Output }]
    };
    return ListEntryComponent;
}());
export { ListEntryComponent };
if (false) {
    /** @type {?} */
    ListEntryComponent.prototype.datasetId;
    /** @type {?} */
    ListEntryComponent.prototype.selected;
    /** @type {?} */
    ListEntryComponent.prototype.onDeleteDataset;
    /** @type {?} */
    ListEntryComponent.prototype.onSelectDataset;
    /** @type {?} */
    ListEntryComponent.prototype.loading;
    /** @type {?} */
    ListEntryComponent.prototype.internalId;
    /** @type {?} */
    ListEntryComponent.prototype.langChangeSubscription;
    /** @type {?} */
    ListEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    ListEntryComponent.prototype.translateSrvc;
    /**
     * @abstract
     * @param {?=} lang
     * @return {?}
     */
    ListEntryComponent.prototype.loadDataset = function (lang) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC9saXN0LWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBK0IzRSw0QkFDYyxpQkFBb0MsRUFDcEMsYUFBK0I7UUFEL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7K0JBYkcsSUFBSSxZQUFZLEVBQUU7K0JBR2xCLElBQUksWUFBWSxFQUFFO0tBVzdEOzs7O0lBRUUscUNBQVE7Ozs7O1FBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxlQUFnQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUM7Ozs7O0lBR3BKLHdDQUFXOzs7O1FBQ2QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztJQUd2QywwQ0FBYTs7OztRQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHN0IsNENBQWU7Ozs7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7SUFHbkMsOENBQWlCOzs7O0lBQTNCLFVBQTRCLGVBQWdDO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFDO0tBQ0o7OzRCQWhEQSxLQUFLOzJCQUdMLEtBQUs7a0NBR0wsTUFBTTtrQ0FHTixNQUFNOzs2QkF0Qlg7O1NBV3NCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEludGVybmFsRGF0YXNldElkLCBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYWJzdHJhY3QgZGF0YXNldCBlbnRyeSBmb3IgYSBsaXN0LCB3aGljaCBoYXMgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnM6XG4gKiAgLSBjYW4gYmUgc2VsZWN0ZWQgYW5kIGlzIHNlbGVjdGFibGUgaW50ZXJuYWxseSwgd2l0aCBhIGNvcnJlc3BvbmRpbmcgb3V0cHV0IGV2ZW50XG4gKiAgLSBjYW4gYmUgZGVsZXRlZCwgd2hpY2ggYWxzbyB0cmlnZ2VycyBhbiBvdXRwdXQgZXZlbnRcbiAqICAtIHRyYW5zbGF0YWJsZSwgc28gaXQgdHJpZ2dlcnMgdGhlIG1ldGhvZGUgb25MYW5ndWFnZUNoYW5nZWQgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgc3dpdGNoZWRcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpc3RFbnRyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25EZWxldGVEYXRhc2V0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TZWxlY3REYXRhc2V0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgbG9hZGluZztcblxuICAgIHByb3RlY3RlZCBpbnRlcm5hbElkOiBJbnRlcm5hbERhdGFzZXRJZDtcblxuICAgIHByaXZhdGUgbGFuZ0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbElkSGFuZGxlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTcnZjOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldElkKSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsSWQgPSB0aGlzLmludGVybmFsSWRIYW5kbGVyLnJlc29sdmVJbnRlcm5hbElkKHRoaXMuZGF0YXNldElkKTtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXQodGhpcy50cmFuc2xhdGVTcnZjLmN1cnJlbnRMYW5nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhbmdDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnRyYW5zbGF0ZVNydmMub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHRoaXMub25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhbmdDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRGF0YXNldCgpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZURhdGFzZXQuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMub25TZWxlY3REYXRhc2V0LmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmludGVybmFsSWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFzZXQobGFuZ0NoYW5nZUV2ZW50LmxhbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkO1xuXG59XG4iXX0=