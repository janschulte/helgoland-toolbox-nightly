/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetApiInterface, DatasetApiMapping, DatasetApiVersion, } from '@helgoland/core';
import { ListSelectorService } from './list-selector.service';
/**
 * Component to select an item out of a list of provider with a given filter combination.
 */
export class ListSelectorComponent {
    /**
     * @param {?} listSelectorService
     * @param {?} apiInterface
     * @param {?} apiMapping
     */
    constructor(listSelectorService, apiInterface, apiMapping) {
        this.listSelectorService = listSelectorService;
        this.apiInterface = apiInterface;
        this.apiMapping = apiMapping;
        this.onDatasetSelection = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["providerList"] && changes["providerList"].currentValue) {
            if (this.selectorId && this.listSelectorService.cache.has(this.selectorId)
                && this.isEqual(this.providerList, this.listSelectorService.providerList)) {
                this.parameters = this.listSelectorService.cache.get(this.selectorId);
                /** @type {?} */
                const idx = this.parameters.findIndex((entry) => {
                    return entry.isDisabled;
                }) - 1;
                this.activePanel = this.selectorId + '-' + idx;
            }
            else {
                if (this.selectorId) {
                    this.listSelectorService.cache.set(this.selectorId, this.parameters);
                }
                // create filterlist for first parameter entry
                this.parameters[0].filterList = this.providerList.map((entry) => {
                    entry.filter = Object.assign({}, this.filter);
                    return entry;
                });
                this.listSelectorService.providerList = this.providerList;
                // open first tab
                this.activePanel = this.selectorId + '-0';
                this.parameters[0].isDisabled = false;
                // disable parameterList
                for (let i = 1; i < this.parameters.length; i++) {
                    this.parameters[i].isDisabled = true;
                }
            }
        }
    }
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    itemSelected(item, index) {
        if (index < this.parameters.length - 1) {
            this.parameters[index].headerAddition = item.label;
            this.activePanel = this.selectorId + '-' + (index + 1);
            this.parameters[index + 1].isDisabled = false;
            // copy filter to new item
            this.parameters[index + 1].filterList = JSON.parse(JSON.stringify(item.filterList));
            // add filter for selected item to next
            this.parameters[index + 1].filterList.forEach((entry) => entry["filter"][this.parameters[index].type] = entry["itemId"]);
            for (let i = index + 2; i < this.parameters.length; i++) {
                this.parameters[i].isDisabled = true;
            }
            for (let j = index + 1; j < this.parameters.length; j++) {
                this.parameters[j].headerAddition = '';
            }
        }
        else {
            item.filterList.forEach((entry) => {
                entry.filter[this.parameters[index].type] = entry.itemId;
                this.openDataset(entry.url, entry.filter);
            });
        }
    }
    /**
     * @param {?} url
     * @param {?} params
     * @return {?}
     */
    openDataset(url, params) {
        this.apiMapping.getApiVersion(url).subscribe((apiVersionId) => {
            if (apiVersionId === DatasetApiVersion.V2) {
                this.apiInterface.getDatasets(url, params).subscribe((result) => this.onDatasetSelection.emit(result));
            }
            else if (apiVersionId === DatasetApiVersion.V1) {
                this.apiInterface.getTimeseries(url, params).subscribe((result) => this.onDatasetSelection.emit(result));
            }
        });
    }
    /**
     * @param {?} listOne
     * @param {?} listTwo
     * @return {?}
     */
    isEqual(listOne, listTwo) {
        /** @type {?} */
        let match = true;
        if (listOne.length === listTwo.length) {
            listOne.forEach((entryOne) => {
                /** @type {?} */
                const found = listTwo.find((entryTwo) => {
                    if (entryOne.id === entryTwo.id && entryOne.url === entryTwo.url) {
                        return true;
                    }
                    return false;
                });
                if (!found) {
                    match = false;
                }
            });
        }
        else {
            match = false;
        }
        return match;
    }
}
ListSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-list-selector',
                template: `<div>{{activePanel}}</div>
<div *ngFor="let param of parameters; let i = index">
  <h3>
    <span>{{param.header}}</span>
    <span *ngIf="param.headerAddition">-</span>
    <span>{{param.headerAddition}}</span>
  </h3>
  <div *ngIf="!param.isDisabled">
    <n52-multi-service-filter-selector [endpoint]="param.type" [filterList]="param.filterList" (onItemSelected)="itemSelected($event, i)"></n52-multi-service-filter-selector>
  </div>
</div>
`
            },] },
];
/** @nocollapse */
ListSelectorComponent.ctorParameters = () => [
    { type: ListSelectorService },
    { type: DatasetApiInterface },
    { type: DatasetApiMapping }
];
ListSelectorComponent.propDecorators = {
    parameters: [{ type: Input }],
    filter: [{ type: Input }],
    providerList: [{ type: Input }],
    selectorId: [{ type: Input }],
    onDatasetSelection: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ListSelectorComponent.prototype.parameters;
    /** @type {?} */
    ListSelectorComponent.prototype.filter;
    /** @type {?} */
    ListSelectorComponent.prototype.providerList;
    /** @type {?} */
    ListSelectorComponent.prototype.selectorId;
    /** @type {?} */
    ListSelectorComponent.prototype.onDatasetSelection;
    /** @type {?} */
    ListSelectorComponent.prototype.activePanel;
    /** @type {?} */
    ListSelectorComponent.prototype.listSelectorService;
    /** @type {?} */
    ListSelectorComponent.prototype.apiInterface;
    /** @type {?} */
    ListSelectorComponent.prototype.apiMapping;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yLyIsInNvdXJjZXMiOlsibGliL2xpc3Qtc2VsZWN0b3IvbGlzdC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUlwQixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLE9BQU8sRUFBeUIsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQW9CckYsTUFBTTs7Ozs7O0lBbUJGLFlBQ2MsbUJBQXdDLEVBQ3hDLFlBQWlDLEVBQ2pDLFVBQTZCO1FBRjdCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQW1CO2tDQVBXLElBQUksWUFBWSxFQUFjO0tBUS9FOzs7OztJQUVFLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFpQixPQUFPLGlCQUFjLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO21CQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJ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Qjs7O3lCQThCaEIsS0FBSztxQkFHTCxLQUFLOzJCQUdMLEtBQUs7eUJBR0wsS0FBSztpQ0FHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgIERhdGFzZXRBcGlNYXBwaW5nLFxuICAgIERhdGFzZXRBcGlWZXJzaW9uLFxuICAgIEZpbHRlcmVkUHJvdmlkZXIsXG4gICAgSURhdGFzZXQsXG4gICAgUGFyYW1ldGVyRmlsdGVyLFxufSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJlZFBhcmFtZXRlciB9IGZyb20gJy4uL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yL211bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0U2VsZWN0b3JQYXJhbWV0ZXIsIExpc3RTZWxlY3RvclNlcnZpY2UgfSBmcm9tICcuL2xpc3Qtc2VsZWN0b3Iuc2VydmljZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRvIHNlbGVjdCBhbiBpdGVtIG91dCBvZiBhIGxpc3Qgb2YgcHJvdmlkZXIgd2l0aCBhIGdpdmVuIGZpbHRlciBjb21iaW5hdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduNTItbGlzdC1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2Pnt7YWN0aXZlUGFuZWx9fTwvZGl2PlxuPGRpdiAqbmdGb3I9XCJsZXQgcGFyYW0gb2YgcGFyYW1ldGVyczsgbGV0IGkgPSBpbmRleFwiPlxuICA8aDM+XG4gICAgPHNwYW4+e3twYXJhbS5oZWFkZXJ9fTwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cInBhcmFtLmhlYWRlckFkZGl0aW9uXCI+LTwvc3Bhbj5cbiAgICA8c3Bhbj57e3BhcmFtLmhlYWRlckFkZGl0aW9ufX08L3NwYW4+XG4gIDwvaDM+XG4gIDxkaXYgKm5nSWY9XCIhcGFyYW0uaXNEaXNhYmxlZFwiPlxuICAgIDxuNTItbXVsdGktc2VydmljZS1maWx0ZXItc2VsZWN0b3IgW2VuZHBvaW50XT1cInBhcmFtLnR5cGVcIiBbZmlsdGVyTGlzdF09XCJwYXJhbS5maWx0ZXJMaXN0XCIgKG9uSXRlbVNlbGVjdGVkKT1cIml0ZW1TZWxlY3RlZCgkZXZlbnQsIGkpXCI+PC9uNTItbXVsdGktc2VydmljZS1maWx0ZXItc2VsZWN0b3I+XG4gIDwvZGl2PlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIExpc3RTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiBMaXN0U2VsZWN0b3JQYXJhbWV0ZXJbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcHJvdmlkZXJMaXN0OiBGaWx0ZXJlZFByb3ZpZGVyW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RvcklkOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25EYXRhc2V0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8SURhdGFzZXRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPElEYXRhc2V0W10+KCk7XG5cbiAgICBwdWJsaWMgYWN0aXZlUGFuZWw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbGlzdFNlbGVjdG9yU2VydmljZTogTGlzdFNlbGVjdG9yU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwaUludGVyZmFjZTogRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICAgICAgcHJvdGVjdGVkIGFwaU1hcHBpbmc6IERhdGFzZXRBcGlNYXBwaW5nXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnByb3ZpZGVyTGlzdCAmJiBjaGFuZ2VzLnByb3ZpZGVyTGlzdC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9ySWQgJiYgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLmNhY2hlLmhhcyh0aGlzLnNlbGVjdG9ySWQpXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5pc0VxdWFsKHRoaXMucHJvdmlkZXJMaXN0LCB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UucHJvdmlkZXJMaXN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMubGlzdFNlbGVjdG9yU2VydmljZS5jYWNoZS5nZXQodGhpcy5zZWxlY3RvcklkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnBhcmFtZXRlcnMuZmluZEluZGV4KChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50cnkuaXNEaXNhYmxlZDtcbiAgICAgICAgICAgICAgICB9KSAtIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVQYW5lbCA9IHRoaXMuc2VsZWN0b3JJZCArICctJyArIGlkeDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UuY2FjaGUuc2V0KHRoaXMuc2VsZWN0b3JJZCwgdGhpcy5wYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGZpbHRlcmxpc3QgZm9yIGZpcnN0IHBhcmFtZXRlciBlbnRyeVxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1swXS5maWx0ZXJMaXN0ID0gdGhpcy5wcm92aWRlckxpc3QubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5maWx0ZXIgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UucHJvdmlkZXJMaXN0ID0gdGhpcy5wcm92aWRlckxpc3Q7XG4gICAgICAgICAgICAgICAgLy8gb3BlbiBmaXJzdCB0YWJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBhbmVsID0gdGhpcy5zZWxlY3RvcklkICsgJy0wJztcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbMF0uaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgcGFyYW1ldGVyTGlzdFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpXS5pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXRlbVNlbGVjdGVkKGl0ZW06IEZpbHRlcmVkUGFyYW1ldGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpbmRleCA8IHRoaXMucGFyYW1ldGVycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaW5kZXhdLmhlYWRlckFkZGl0aW9uID0gaXRlbS5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFuZWwgPSB0aGlzLnNlbGVjdG9ySWQgKyAnLScgKyAoaW5kZXggKyAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpbmRleCArIDFdLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIGNvcHkgZmlsdGVyIHRvIG5ldyBpdGVtXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaW5kZXggKyAxXS5maWx0ZXJMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtLmZpbHRlckxpc3QpKTtcbiAgICAgICAgICAgIC8vIGFkZCBmaWx0ZXIgZm9yIHNlbGVjdGVkIGl0ZW0gdG8gbmV4dFxuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2luZGV4ICsgMV0uZmlsdGVyTGlzdC5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkuZmlsdGVyW3RoaXMucGFyYW1ldGVyc1tpbmRleF0udHlwZV0gPSBlbnRyeS5pdGVtSWQpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMjsgaSA8IHRoaXMucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpXS5pc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpbmRleCArIDE7IGogPCB0aGlzLnBhcmFtZXRlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbal0uaGVhZGVyQWRkaXRpb24gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uZmlsdGVyTGlzdC5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJ5LmZpbHRlclt0aGlzLnBhcmFtZXRlcnNbaW5kZXhdLnR5cGVdID0gZW50cnkuaXRlbUlkO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkRhdGFzZXQoZW50cnkudXJsLCBlbnRyeS5maWx0ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5EYXRhc2V0KHVybDogc3RyaW5nLCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlcikge1xuICAgICAgICB0aGlzLmFwaU1hcHBpbmcuZ2V0QXBpVmVyc2lvbih1cmwpLnN1YnNjcmliZSgoYXBpVmVyc2lvbklkKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXBpVmVyc2lvbklkID09PSBEYXRhc2V0QXBpVmVyc2lvbi5WMikge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldERhdGFzZXRzKHVybCwgcGFyYW1zKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4gdGhpcy5vbkRhdGFzZXRTZWxlY3Rpb24uZW1pdChyZXN1bHQpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXBpVmVyc2lvbklkID09PSBEYXRhc2V0QXBpVmVyc2lvbi5WMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBpSW50ZXJmYWNlLmdldFRpbWVzZXJpZXModXJsLCBwYXJhbXMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4gdGhpcy5vbkRhdGFzZXRTZWxlY3Rpb24uZW1pdChyZXN1bHQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VxdWFsKGxpc3RPbmU6IEZpbHRlcmVkUHJvdmlkZXJbXSwgbGlzdFR3bzogRmlsdGVyZWRQcm92aWRlcltdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBtYXRjaCA9IHRydWU7XG4gICAgICAgIGlmIChsaXN0T25lLmxlbmd0aCA9PT0gbGlzdFR3by5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpc3RPbmUuZm9yRWFjaCgoZW50cnlPbmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGxpc3RUd28uZmluZCgoZW50cnlUd28pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5T25lLmlkID09PSBlbnRyeVR3by5pZCAmJiBlbnRyeU9uZS51cmwgPT09IGVudHJ5VHdvLnVybCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkgeyBtYXRjaCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbn1cbiJdfQ==