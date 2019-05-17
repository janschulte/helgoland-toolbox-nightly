/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, InternalIdHandler, PlatformTypes, Timespan, } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { ListEntryComponent } from '../list-entry.component';
export class ProfileEntryComponent extends ListEntryComponent {
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
        this.onDeleteDatasetOptions = new EventEmitter();
        this.onEditOptions = new EventEmitter();
        this.onOpenInCombiView = new EventEmitter();
        this.onShowGeometry = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    removeDatasetOptions(options) {
        this.onDeleteDatasetOptions.emit(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    editDatasetOptions(options) {
        this.onEditOptions.emit(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    toggleVisibility(options) {
        options.visible = !options.visible;
        this.onUpdateOptions.emit(this.datasetOptions);
    }
    /**
     * @return {?}
     */
    isMobile() {
        if (this.dataset) {
            return this.dataset.platformType === PlatformTypes.mobileInsitu;
        }
        return false;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    openInCombiView(option) {
        this.onOpenInCombiView.emit(option);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    showGeometry(option) {
        /** @type {?} */
        const internalId = this.internalIdHandler.resolveInternalId(this.datasetId);
        if (this.isMobile()) {
            /** @type {?} */
            const timespan = new Timespan(option.timestamp);
            this.api.getData(internalId.id, internalId.url, timespan).subscribe((result) => {
                if (result.values.length === 1) {
                    this.onShowGeometry.emit(result.values[0].geometry);
                }
            });
        }
        else {
            this.api.getPlatform(this.dataset.parameters.platform.id, internalId.url).subscribe((platform) => {
                this.onShowGeometry.emit(platform.geometry);
            });
        }
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
ProfileEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-profile-entry',
                template: `<div class="legendItem" style="position: relative;" [ngClass]="{'selected': selected}" (click)="toggleSelection()">
  <div class="legendItemheader">
    <div class="legendItemLabel">
      <n52-label-mapper label="{{dataset?.parameters.platform.label}}"></n52-label-mapper>
    </div>
    <div class="small">
      <n52-label-mapper label="{{dataset?.parameters.phenomenon.label}}"></n52-label-mapper>
      <span *ngIf="dataset?.uom">[
        <n52-label-mapper label="{{dataset.uom}}"></n52-label-mapper>]</span>
    </div>
    <div class="small">
      <n52-label-mapper label="{{dataset?.parameters.procedure.label}}"></n52-label-mapper>
    </div>
    <div class="small" *ngIf="dataset?.parameters.category.label != dataset?.parameters.phenomenon.label">
      <n52-label-mapper label="{{dataset?.parameters.category.label}}"></n52-label-mapper>
    </div>
  </div>
  <div *ngFor="let item of datasetOptions">
    <div>
      <span [ngStyle]="{'color': item.color}">{{item.timestamp | date: 'short'}}</span>
      <span class="fa" [ngClass]="{'fa-eye-slash': item.visible, 'fa-eye': !item.visible}" (click)="toggleVisibility(item); $event.stopPropagation();"
        title="{{'profiles.legend.visibility' | translate}}"></span>
      <span class="fa fa-pencil" (click)="editDatasetOptions(item); $event.stopPropagation();" [ngStyle]="{color: item.color}"
        title="{{'profiles.legend.edit-style' | translate}}"></span>
      <span class="fa fa-map-marker" (click)="showGeometry(item); $event.stopPropagation();" title="{{'profiles.legend.show-geometry' | translate}}"></span>
      <span class="fa fa-times" (click)="removeDatasetOptions(item); $event.stopPropagation();" title="{{'profiles.legend.delete-subentry' | translate}}"></span>
    </div>
    <div (click)="openInCombiView(item); $event.stopPropagation();" *ngIf="isMobile()" class="toCombiView">
      <span class="fa fa-arrow-right"></span>
      <span>{{'profiles.legend.go-to-combi-view' | translate}}</span>
    </div>
  </div>
</div>
`,
                styles: [`:host .legendItem{background-color:#fff;padding:5px;border-radius:5px;margin-bottom:5px}:host .legendItem .small{font-size:90%;word-break:break-all}:host .legendItem.selected{padding:0;border-width:5px;border-style:solid}:host .legendItem .legendItemheader{cursor:pointer}:host .legendItem .toCombiView{cursor:pointer}:host .legendItem .fa{cursor:pointer}`]
            },] },
];
/** @nocollapse */
ProfileEntryComponent.ctorParameters = () => [
    { type: DatasetApiInterface },
    { type: InternalIdHandler },
    { type: TranslateService }
];
ProfileEntryComponent.propDecorators = {
    datasetOptions: [{ type: Input }],
    onUpdateOptions: [{ type: Output }],
    onDeleteDatasetOptions: [{ type: Output }],
    onEditOptions: [{ type: Output }],
    onOpenInCombiView: [{ type: Output }],
    onShowGeometry: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ProfileEntryComponent.prototype.datasetOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onUpdateOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onDeleteDatasetOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onEditOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.onOpenInCombiView;
    /** @type {?} */
    ProfileEntryComponent.prototype.onShowGeometry;
    /** @type {?} */
    ProfileEntryComponent.prototype.dataset;
    /** @type {?} */
    ProfileEntryComponent.prototype.editableOptions;
    /** @type {?} */
    ProfileEntryComponent.prototype.tempColor;
    /** @type {?} */
    ProfileEntryComponent.prototype.api;
    /** @type {?} */
    ProfileEntryComponent.prototype.internalIdHandler;
    /** @type {?} */
    ProfileEntryComponent.prototype.translateSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1lbnRyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRhc2V0bGlzdC9wcm9maWxlLWVudHJ5L3Byb2ZpbGUtZW50cnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFFSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBR2pCLGFBQWEsRUFFYixRQUFRLEdBQ1gsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQXdDN0QsTUFBTSw0QkFBNkIsU0FBUSxrQkFBa0I7Ozs7OztJQXlCekQsWUFDYyxHQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsYUFBK0I7UUFFekMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBSjlCLFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWtCOytCQXRCaUIsSUFBSSxZQUFZLEVBQUU7c0NBR2IsSUFBSSxZQUFZLEVBQUU7NkJBRzNCLElBQUksWUFBWSxFQUFFO2lDQUdkLElBQUksWUFBWSxFQUFFOzhCQUduQixJQUFJLFlBQVksRUFBRTtLQWE5RTs7Ozs7SUFFTSxvQkFBb0IsQ0FBQyxPQUE0QjtRQUNwRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7SUFHdkMsa0JBQWtCLENBQUMsT0FBNEI7UUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FB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QU07Z0NBR04sTUFBTTs2QkFHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldCxcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIEludGVybmFsSWRIYW5kbGVyLFxuICAgIExvY2F0ZWRQcm9maWxlRGF0YUVudHJ5LFxuICAgIFBhcmFtZXRlckZpbHRlcixcbiAgICBQbGF0Zm9ybVR5cGVzLFxuICAgIFRpbWVkRGF0YXNldE9wdGlvbnMsXG4gICAgVGltZXNwYW4sXG59IGZyb20gJ0BoZWxnb2xhbmQvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExpc3RFbnRyeUNvbXBvbmVudCB9IGZyb20gJy4uL2xpc3QtZW50cnkuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItcHJvZmlsZS1lbnRyeScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZH1cIiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKClcIj5cbiAgPGRpdiBjbGFzcz1cImxlZ2VuZEl0ZW1oZWFkZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGVnZW5kSXRlbUxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wbGF0Zm9ybS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzbWFsbFwiPlxuICAgICAgPG41Mi1sYWJlbC1tYXBwZXIgbGFiZWw9XCJ7e2RhdGFzZXQ/LnBhcmFtZXRlcnMucGhlbm9tZW5vbi5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgICAgPHNwYW4gKm5nSWY9XCJkYXRhc2V0Py51b21cIj5bXG4gICAgICAgIDxuNTItbGFiZWwtbWFwcGVyIGxhYmVsPVwie3tkYXRhc2V0LnVvbX19XCI+PC9uNTItbGFiZWwtbWFwcGVyPl08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNtYWxsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5wcm9jZWR1cmUubGFiZWx9fVwiPjwvbjUyLWxhYmVsLW1hcHBlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxcIiAqbmdJZj1cImRhdGFzZXQ/LnBhcmFtZXRlcnMuY2F0ZWdvcnkubGFiZWwgIT0gZGF0YXNldD8ucGFyYW1ldGVycy5waGVub21lbm9uLmxhYmVsXCI+XG4gICAgICA8bjUyLWxhYmVsLW1hcHBlciBsYWJlbD1cInt7ZGF0YXNldD8ucGFyYW1ldGVycy5jYXRlZ29yeS5sYWJlbH19XCI+PC9uNTItbGFiZWwtbWFwcGVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhc2V0T3B0aW9uc1wiPlxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogaXRlbS5jb2xvcn1cIj57e2l0ZW0udGltZXN0YW1wIHwgZGF0ZTogJ3Nob3J0J319PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInsnZmEtZXllLXNsYXNoJzogaXRlbS52aXNpYmxlLCAnZmEtZXllJzogIWl0ZW0udmlzaWJsZX1cIiAoY2xpY2spPVwidG9nZ2xlVmlzaWJpbGl0eShpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXG4gICAgICAgIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLnZpc2liaWxpdHknIHwgdHJhbnNsYXRlfX1cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIChjbGljayk9XCJlZGl0RGF0YXNldE9wdGlvbnMoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBbbmdTdHlsZV09XCJ7Y29sb3I6IGl0ZW0uY29sb3J9XCJcbiAgICAgICAgdGl0bGU9XCJ7eydwcm9maWxlcy5sZWdlbmQuZWRpdC1zdHlsZScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIChjbGljayk9XCJzaG93R2VvbWV0cnkoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiB0aXRsZT1cInt7J3Byb2ZpbGVzLmxlZ2VuZC5zaG93LWdlb21ldHJ5JyB8IHRyYW5zbGF0ZX19XCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVEYXRhc2V0T3B0aW9ucyhpdGVtKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIHRpdGxlPVwie3sncHJvZmlsZXMubGVnZW5kLmRlbGV0ZS1zdWJlbnRyeScgfCB0cmFuc2xhdGV9fVwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IChjbGljayk9XCJvcGVuSW5Db21iaVZpZXcoaXRlbSk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiAqbmdJZj1cImlzTW9iaWxlKClcIiBjbGFzcz1cInRvQ29tYmlWaWV3XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWFycm93LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPHNwYW4+e3sncHJvZmlsZXMubGVnZW5kLmdvLXRvLWNvbWJpLXZpZXcnIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdCAubGVnZW5kSXRlbXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzo1cHg7Ym9yZGVyLXJhZGl1czo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLmxlZ2VuZEl0ZW0gLnNtYWxse2ZvbnQtc2l6ZTo5MCU7d29yZC1icmVhazpicmVhay1hbGx9Omhvc3QgLmxlZ2VuZEl0ZW0uc2VsZWN0ZWR7cGFkZGluZzowO2JvcmRlci13aWR0aDo1cHg7Ym9yZGVyLXN0eWxlOnNvbGlkfTpob3N0IC5sZWdlbmRJdGVtIC5sZWdlbmRJdGVtaGVhZGVye2N1cnNvcjpwb2ludGVyfTpob3N0IC5sZWdlbmRJdGVtIC50b0NvbWJpVmlld3tjdXJzb3I6cG9pbnRlcn06aG9zdCAubGVnZW5kSXRlbSAuZmF7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZUVudHJ5Q29tcG9uZW50IGV4dGVuZHMgTGlzdEVudHJ5Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zW107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25VcGRhdGVPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9uc1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkRlbGV0ZURhdGFzZXRPcHRpb25zOiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25FZGl0T3B0aW9uczogRXZlbnRFbWl0dGVyPFRpbWVkRGF0YXNldE9wdGlvbnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uT3BlbkluQ29tYmlWaWV3OiBFdmVudEVtaXR0ZXI8VGltZWREYXRhc2V0T3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25TaG93R2VvbWV0cnk6IEV2ZW50RW1pdHRlcjxHZW9KU09OLkdlb0pzb25PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGRhdGFzZXQ6IERhdGFzZXQ7XG5cbiAgICBwdWJsaWMgZWRpdGFibGVPcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zO1xuICAgIHB1YmxpYyB0ZW1wQ29sb3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxJZEhhbmRsZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlU3J2YzogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihpbnRlcm5hbElkSGFuZGxlciwgdHJhbnNsYXRlU3J2Yyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZURhdGFzZXRPcHRpb25zLmVtaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXREYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBUaW1lZERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMub25FZGl0T3B0aW9ucy5lbWl0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KG9wdGlvbnM6IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy52aXNpYmxlID0gIW9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZU9wdGlvbnMuZW1pdCh0aGlzLmRhdGFzZXRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb2JpbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQucGxhdGZvcm1UeXBlID09PSBQbGF0Zm9ybVR5cGVzLm1vYmlsZUluc2l0dTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5JbkNvbWJpVmlldyhvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vbk9wZW5JbkNvbWJpVmlldy5lbWl0KG9wdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHZW9tZXRyeShvcHRpb246IFRpbWVkRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxJZCA9IHRoaXMuaW50ZXJuYWxJZEhhbmRsZXIucmVzb2x2ZUludGVybmFsSWQodGhpcy5kYXRhc2V0SWQpO1xuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3BhbiA9IG5ldyBUaW1lc3BhbihvcHRpb24udGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGE8TG9jYXRlZFByb2ZpbGVEYXRhRW50cnk+KGludGVybmFsSWQuaWQsIGludGVybmFsSWQudXJsLCB0aW1lc3Bhbikuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHJlc3VsdC52YWx1ZXNbMF0uZ2VvbWV0cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0UGxhdGZvcm0odGhpcy5kYXRhc2V0LnBhcmFtZXRlcnMucGxhdGZvcm0uaWQsIGludGVybmFsSWQudXJsKS5zdWJzY3JpYmUoKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dHZW9tZXRyeS5lbWl0KHBsYXRmb3JtLmdlb21ldHJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWREYXRhc2V0KGxhbmc/OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGxhbmcpIHsgcGFyYW1zLmxhbmcgPSBsYW5nOyB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXQodGhpcy5pbnRlcm5hbElkLmlkLCB0aGlzLmludGVybmFsSWQudXJsLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YXNldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0ID0gZGF0YXNldDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==