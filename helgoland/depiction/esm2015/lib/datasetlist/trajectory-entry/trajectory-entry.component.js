/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, DatasetOptions, InternalIdHandler } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../list-entry.component';
export class TrajectoryEntryComponent extends ListEntryComponent {
    /**
     * @param {?} api
     * @param {?} internalIdHandler
     * @param {?} translateSrvc
     */
    constructor(api, internalIdHandler, translateSrvc) {
        super(internalIdHandler, translateSrvc);
        this.api = api;
        this.internalIdHandler = internalIdHandler;
        this.translateSrvc = translateSrvc;
        this.onUpdateOptions = new EventEmitter();
        this.onEditOptions = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggleVisibility() {
        this.datasetOptions.visible = !this.datasetOptions.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    editDatasetOptions(options) {
        this.onEditOptions.emit(options);
    }
    /**
     * @param {?=} lang
     * @return {?}
     */
    loadDataset(lang) {
        /** @type {?} */
        const params = {};
        if (lang) {
            params.lang = lang;
        }
        this.loading = true;
        this.api.getDataset(this.internalId.id, this.internalId.url, params).subscribe((dataset) => {
            this.dataset = dataset;
            this.loading = false;
        });
    }
}
TrajectoryEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-trajectory-entry',
                template: `<div style="white-space: nowrap;" (click)="toggleVisibility()">
  <span>
    <a class="btn btn-light">
      <span class="fa fa-plus" [ngClass]="{'fa-eye': !datasetOptions?.visible, 'fa-eye-slash': datasetOptions?.visible}"></span>
    </a>
  </span>
  <span style="padding-left: 10px;" [ngStyle]="{'color': datasetOptions?.color}">{{dataset?.parameters.phenomenon.label}}</span>
  <span class="fa fa-pencil" (click)="editDatasetOptions(datasetOptions); $event.stopPropagation();" [ngStyle]="{color: datasetOptions?.color}"></span>
</div>`
            },] },
];
/** @nocollapse */
TrajectoryEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService }
];
TrajectoryEntryComponent.propDecorators = {
    datasetOptions: [{ type: Input }],
    onUpdateOptions: [{ type: Output }],
    onEditOptions: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TrajectoryEntryComponent.prototype.datasetOptions;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.onUpdateOptions;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.onEditOptions;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.dataset;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.tempColor;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.api;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    TrajectoryEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhamVjdG9yeS1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC90cmFqZWN0b3J5LWVudHJ5L3RyYWplY3RvcnktZW50cnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBVyxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0saUJBQWlCLENBQUM7QUFDbkgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFjN0QsTUFBTSwrQkFBZ0MsU0FBUSxrQkFBa0I7Ozs7OztJQWU1RCxZQUNjLEdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxhQUErQjtRQUV6QyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFKOUIsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7K0JBWlUsSUFBSSxZQUFZLEVBQUU7NkJBR3BCLElBQUksWUFBWSxFQUFFO0tBWXRFOzs7O0lBRU0sZ0JBQWdCO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7SUFHNUMsa0JBQWtCLENBQUMsT0FBdUI7UUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztJQUczQixXQUFXLENBQUMsSUFBYTs7UUFDL0IsTUFBTSxNQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN2RixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjs7O1lBcERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7O09BUVA7YUFDTjs7OztZQWhCaUIsbUJBQW1CO1lBQWtCLGlCQUFpQjtZQUMvRCxnQkFBZ0I7Ozs2QkFrQnBCLEtBQUs7OEJBR0wsTUFBTTs0QkFHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFzZXQsIERhdGFzZXRBcGlJbnRlcmZhY2UsIERhdGFzZXRPcHRpb25zLCBJbnRlcm5hbElkSGFuZGxlciwgUGFyYW1ldGVyRmlsdGVyIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi4vbGlzdC1lbnRyeS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ241Mi10cmFqZWN0b3J5LWVudHJ5JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiIChjbGljayk9XCJ0b2dnbGVWaXNpYmlsaXR5KClcIj5cbiAgPHNwYW4+XG4gICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpZ2h0XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBsdXNcIiBbbmdDbGFzc109XCJ7J2ZhLWV5ZSc6ICFkYXRhc2V0T3B0aW9ucz8udmlzaWJsZSwgJ2ZhLWV5ZS1zbGFzaCc6IGRhdGFzZXRPcHRpb25zPy52aXNpYmxlfVwiPjwvc3Bhbj5cbiAgICA8L2E+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDEwcHg7XCIgW25nU3R5bGVdPVwieydjb2xvcic6IGRhdGFzZXRPcHRpb25zPy5jb2xvcn1cIj57e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoZGF0YXNldE9wdGlvbnMpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgW25nU3R5bGVdPVwie2NvbG9yOiBkYXRhc2V0T3B0aW9ucz8uY29sb3J9XCI+PC9zcGFuPlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUcmFqZWN0b3J5RW50cnlDb21wb25lbnQgZXh0ZW5kcyBMaXN0RW50cnlDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IERhdGFzZXRPcHRpb25zO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uVXBkYXRlT3B0aW9uczogRXZlbnRFbWl0dGVyPERhdGFzZXRPcHRpb25zPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkVkaXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8RGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgdGVtcENvbG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGFwaTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsSWRIYW5kbGVyOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNydmM6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaW50ZXJuYWxJZEhhbmRsZXIsIHRyYW5zbGF0ZVNydmMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnZpc2libGUgPSAhdGhpcy5kYXRhc2V0T3B0aW9ucy52aXNpYmxlO1xuICAgICAgICB0aGlzLm9uVXBkYXRlT3B0aW9ucy5lbWl0KHRoaXMuZGF0YXNldE9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlZGl0RGF0YXNldE9wdGlvbnMob3B0aW9uczogRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkVkaXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==