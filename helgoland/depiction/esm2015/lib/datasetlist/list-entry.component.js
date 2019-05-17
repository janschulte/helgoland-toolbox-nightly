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
export class ListEntryComponent {
    /**
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(internalIdHandler, translateSrvc) {
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onDeleteDataset = new EventEmitter();
        this.onSelectDataset = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.datasetId) {
            this.internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
            this.loadDataset(this.translateSrvc.currentLang);
        }
        this.langChangeSubscription = this.translateSrvc.onLangChange.subscribe((langChangeEvent) => this.onLanguageChanged(langChangeEvent));
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
    removeDataset() {
        this.onDeleteDataset.emit(true);
    }
    /**
     * @return {?}
     */
    toggleSelection() {
        this.selected = !this.selected;
        this.onSelectDataset.emit(this.selected);
    }
    /**
     * @param {?} langChangeEvent
     * @return {?}
     */
    onLanguageChanged(langChangeEvent) {
        if (this.internalId) {
            this.loadDataset(langChangeEvent.lang);
        }
    }
}
ListEntryComponent.propDecorators = {
    datasetId: [{ type: Input }],
    selected: [{ type: Input }],
    onDeleteDataset: [{ type: Output }],
    onSelectDataset: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC9saXN0LWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFXL0UsTUFBTTs7Ozs7SUFvQkYsWUFDYyxpQkFBb0MsRUFDcEMsYUFBK0I7UUFEL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7K0JBYkcsSUFBSSxZQUFZLEVBQUU7K0JBR2xCLElBQUksWUFBWSxFQUFFO0tBVzdEOzs7O0lBRUUsUUFBUTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZ0MsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBR3BKLFdBQVc7UUFDZCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBR3ZDLGFBQWE7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7O0lBRzdCLGVBQWU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7SUFHbkMsaUJBQWlCLENBQUMsZUFBZ0M7UUFDeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUM7S0FDSjs7O3dCQWhEQSxLQUFLO3VCQUdMLEtBQUs7OEJBR0wsTUFBTTs4QkFHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW50ZXJuYWxEYXRhc2V0SWQsIEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBhYnN0cmFjdCBkYXRhc2V0IGVudHJ5IGZvciBhIGxpc3QsIHdoaWNoIGhhcyB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uczpcbiAqICAtIGNhbiBiZSBzZWxlY3RlZCBhbmQgaXMgc2VsZWN0YWJsZSBpbnRlcm5hbGx5LCB3aXRoIGEgY29ycmVzcG9uZGluZyBvdXRwdXQgZXZlbnRcbiAqICAtIGNhbiBiZSBkZWxldGVkLCB3aGljaCBhbHNvIHRyaWdnZXJzIGFuIG91dHB1dCBldmVudFxuICogIC0gdHJhbnNsYXRhYmxlLCBzbyBpdCB0cmlnZ2VycyB0aGUgbWV0aG9kZSBvbkxhbmd1YWdlQ2hhbmdlZCB3aGVuIHRoZSBsYW5ndWFnZSBpcyBzd2l0Y2hlZFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGlzdEVudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkRlbGV0ZURhdGFzZXQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblNlbGVjdERhdGFzZXQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBsb2FkaW5nO1xuXG4gICAgcHJvdGVjdGVkIGludGVybmFsSWQ6IEludGVybmFsRGF0YXNldElkO1xuXG4gICAgcHJpdmF0ZSBsYW5nQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRhc2V0SWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxJZCA9IHRoaXMuaW50ZXJuYWxJZEhhbmRsZXIucmVzb2x2ZUludGVybmFsSWQodGhpcy5kYXRhc2V0SWQpO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldCh0aGlzLnRyYW5zbGF0ZVNydmMuY3VycmVudExhbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFuZ0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMudHJhbnNsYXRlU3J2Yy5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4gdGhpcy5vbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFuZ0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVEYXRhc2V0KCkge1xuICAgICAgICB0aGlzLm9uRGVsZXRlRGF0YXNldC5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgdGhpcy5vblNlbGVjdERhdGFzZXQuZW1pdCh0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJuYWxJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YXNldChsYW5nQ2hhbmdlRXZlbnQubGFuZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbG9hZERhdGFzZXQobGFuZz86IHN0cmluZyk6IHZvaWQ7XG5cbn1cbiJdfQ==