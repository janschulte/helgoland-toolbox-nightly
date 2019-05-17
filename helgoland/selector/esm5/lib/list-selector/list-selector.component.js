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
var ListSelectorComponent = /** @class */ (function () {
    function ListSelectorComponent(listSelectorService, apiInterface, apiMapping) {
        this.listSelectorService = listSelectorService;
        this.apiInterface = apiInterface;
        this.apiMapping = apiMapping;
        this.onDatasetSelection = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ListSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes["providerList"] && changes["providerList"].currentValue) {
            if (this.selectorId && this.listSelectorService.cache.has(this.selectorId)
                && this.isEqual(this.providerList, this.listSelectorService.providerList)) {
                this.parameters = this.listSelectorService.cache.get(this.selectorId);
                /** @type {?} */
                var idx = this.parameters.findIndex(function (entry) {
                    return entry.isDisabled;
                }) - 1;
                this.activePanel = this.selectorId + '-' + idx;
            }
            else {
                if (this.selectorId) {
                    this.listSelectorService.cache.set(this.selectorId, this.parameters);
                }
                // create filterlist for first parameter entry
                this.parameters[0].filterList = this.providerList.map(function (entry) {
                    entry.filter = Object.assign({}, _this.filter);
                    return entry;
                });
                this.listSelectorService.providerList = this.providerList;
                // open first tab
                this.activePanel = this.selectorId + '-0';
                this.parameters[0].isDisabled = false;
                // disable parameterList
                for (var i = 1; i < this.parameters.length; i++) {
                    this.parameters[i].isDisabled = true;
                }
            }
        }
    };
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    ListSelectorComponent.prototype.itemSelected = /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    function (item, index) {
        var _this = this;
        if (index < this.parameters.length - 1) {
            this.parameters[index].headerAddition = item.label;
            this.activePanel = this.selectorId + '-' + (index + 1);
            this.parameters[index + 1].isDisabled = false;
            // copy filter to new item
            this.parameters[index + 1].filterList = JSON.parse(JSON.stringify(item.filterList));
            // add filter for selected item to next
            this.parameters[index + 1].filterList.forEach(function (entry) { return entry["filter"][_this.parameters[index].type] = entry["itemId"]; });
            for (var i = index + 2; i < this.parameters.length; i++) {
                this.parameters[i].isDisabled = true;
            }
            for (var j = index + 1; j < this.parameters.length; j++) {
                this.parameters[j].headerAddition = '';
            }
        }
        else {
            item.filterList.forEach(function (entry) {
                entry.filter[_this.parameters[index].type] = entry.itemId;
                _this.openDataset(entry.url, entry.filter);
            });
        }
    };
    /**
     * @param {?} url
     * @param {?} params
     * @return {?}
     */
    ListSelectorComponent.prototype.openDataset = /**
     * @param {?} url
     * @param {?} params
     * @return {?}
     */
    function (url, params) {
        var _this = this;
        this.apiMapping.getApiVersion(url).subscribe(function (apiVersionId) {
            if (apiVersionId === DatasetApiVersion.V2) {
                _this.apiInterface.getDatasets(url, params).subscribe(function (result) { return _this.onDatasetSelection.emit(result); });
            }
            else if (apiVersionId === DatasetApiVersion.V1) {
                _this.apiInterface.getTimeseries(url, params).subscribe(function (result) { return _this.onDatasetSelection.emit(result); });
            }
        });
    };
    /**
     * @param {?} listOne
     * @param {?} listTwo
     * @return {?}
     */
    ListSelectorComponent.prototype.isEqual = /**
     * @param {?} listOne
     * @param {?} listTwo
     * @return {?}
     */
    function (listOne, listTwo) {
        /** @type {?} */
        var match = true;
        if (listOne.length === listTwo.length) {
            listOne.forEach(function (entryOne) {
                /** @type {?} */
                var found = listTwo.find(function (entryTwo) {
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
    };
    ListSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'n52-list-selector',
                    template: "<div>{{activePanel}}</div>\n<div *ngFor=\"let param of parameters; let i = index\">\n  <h3>\n    <span>{{param.header}}</span>\n    <span *ngIf=\"param.headerAddition\">-</span>\n    <span>{{param.headerAddition}}</span>\n  </h3>\n  <div *ngIf=\"!param.isDisabled\">\n    <n52-multi-service-filter-selector [endpoint]=\"param.type\" [filterList]=\"param.filterList\" (onItemSelected)=\"itemSelected($event, i)\"></n52-multi-service-filter-selector>\n  </div>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    ListSelectorComponent.ctorParameters = function () { return [
        { type: ListSelectorService },
        { type: DatasetApiInterface },
        { type: DatasetApiMapping }
    ]; };
    ListSelectorComponent.propDecorators = {
        parameters: [{ type: Input }],
        filter: [{ type: Input }],
        providerList: [{ type: Input }],
        selectorId: [{ type: Input }],
        onDatasetSelection: [{ type: Output }]
    };
    return ListSelectorComponent;
}());
export { ListSelectorComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL3NlbGVjdG9yLyIsInNvdXJjZXMiOlsibGliL2xpc3Qtc2VsZWN0b3IvbGlzdC1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUlwQixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLE9BQU8sRUFBeUIsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7SUF1Q2pGLCtCQUNjLG1CQUF3QyxFQUN4QyxZQUFpQyxFQUNqQyxVQUE2QjtRQUY3Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtrQ0FQVyxJQUFJLFlBQVksRUFBYztLQVEvRTs7Ozs7SUFFRSwyQ0FBVzs7OztjQUFDLE9BQXNCOztRQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFpQixPQUFPLGlCQUFjLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO21CQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUN0RSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7b0JBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2lCQUMzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ2xEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN4RTs7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO29CQUN4RCxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDaEIsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Z0JBRTFELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzs7Z0JBRXRDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUN4QzthQUNKO1NBQ0o7Ozs7Ozs7SUFHRSw0Q0FBWTs7Ozs7Y0FBQyxJQUF1QixFQUFFLEtBQWE7O1FBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDOztZQUU5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztZQUVwRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxXQUFRLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxVQUFPLEVBQXhELENBQXdELENBQUMsQ0FBQztZQUNuSCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDeEM7WUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7YUFDMUM7U0FDSjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO2dCQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDekQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QyxDQUFDLENBQUM7U0FDTjs7Ozs7OztJQUdHLDJDQUFXOzs7OztjQUFDLEdBQVcsRUFBRSxNQUF1Qjs7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsWUFBWTtZQUN0RCxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQzthQUMxRztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsS0FBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDbEQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFwQyxDQUFvQyxDQUNuRCxDQUFDO2FBQ0w7U0FDSixDQUFDLENBQUM7Ozs7Ozs7SUFHQyx1Q0FBTzs7Ozs7Y0FBQyxPQUEyQixFQUFFLE9BQTJCOztRQUNwRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTs7Z0JBQ3JCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO29CQUNoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUFFO29CQUNsRixNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQUU7YUFDakMsQ0FBQyxDQUFDO1NBQ047UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDakI7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Z0JBdEhwQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHNkQVdiO2lCQUNBOzs7O2dCQW5CK0IsbUJBQW1CO2dCQVQvQyxtQkFBbUI7Z0JBQ25CLGlCQUFpQjs7OzZCQThCaEIsS0FBSzt5QkFHTCxLQUFLOytCQUdMLEtBQUs7NkJBR0wsS0FBSztxQ0FHTCxNQUFNOztnQ0E3Q1g7O1NBK0JhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0YXNldEFwaUludGVyZmFjZSxcbiAgICBEYXRhc2V0QXBpTWFwcGluZyxcbiAgICBEYXRhc2V0QXBpVmVyc2lvbixcbiAgICBGaWx0ZXJlZFByb3ZpZGVyLFxuICAgIElEYXRhc2V0LFxuICAgIFBhcmFtZXRlckZpbHRlcixcbn0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgRmlsdGVyZWRQYXJhbWV0ZXIgfSBmcm9tICcuLi9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci9tdWx0aS1zZXJ2aWNlLWZpbHRlci1zZWxlY3Rvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdG9yUGFyYW1ldGVyLCBMaXN0U2VsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9saXN0LXNlbGVjdG9yLnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0byBzZWxlY3QgYW4gaXRlbSBvdXQgb2YgYSBsaXN0IG9mIHByb3ZpZGVyIHdpdGggYSBnaXZlbiBmaWx0ZXIgY29tYmluYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbjUyLWxpc3Qtc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlOiBgPGRpdj57e2FjdGl2ZVBhbmVsfX08L2Rpdj5cbjxkaXYgKm5nRm9yPVwibGV0IHBhcmFtIG9mIHBhcmFtZXRlcnM7IGxldCBpID0gaW5kZXhcIj5cbiAgPGgzPlxuICAgIDxzcGFuPnt7cGFyYW0uaGVhZGVyfX08L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJwYXJhbS5oZWFkZXJBZGRpdGlvblwiPi08L3NwYW4+XG4gICAgPHNwYW4+e3twYXJhbS5oZWFkZXJBZGRpdGlvbn19PC9zcGFuPlxuICA8L2gzPlxuICA8ZGl2ICpuZ0lmPVwiIXBhcmFtLmlzRGlzYWJsZWRcIj5cbiAgICA8bjUyLW11bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yIFtlbmRwb2ludF09XCJwYXJhbS50eXBlXCIgW2ZpbHRlckxpc3RdPVwicGFyYW0uZmlsdGVyTGlzdFwiIChvbkl0ZW1TZWxlY3RlZCk9XCJpdGVtU2VsZWN0ZWQoJGV2ZW50LCBpKVwiPjwvbjUyLW11bHRpLXNlcnZpY2UtZmlsdGVyLXNlbGVjdG9yPlxuICA8L2Rpdj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBMaXN0U2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGFyYW1ldGVyczogTGlzdFNlbGVjdG9yUGFyYW1ldGVyW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaWx0ZXI6IFBhcmFtZXRlckZpbHRlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHByb3ZpZGVyTGlzdDogRmlsdGVyZWRQcm92aWRlcltdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0b3JJZDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRGF0YXNldFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPElEYXRhc2V0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxJRGF0YXNldFtdPigpO1xuXG4gICAgcHVibGljIGFjdGl2ZVBhbmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGxpc3RTZWxlY3RvclNlcnZpY2U6IExpc3RTZWxlY3RvclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcGlJbnRlcmZhY2U6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcGlNYXBwaW5nOiBEYXRhc2V0QXBpTWFwcGluZ1xuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5wcm92aWRlckxpc3QgJiYgY2hhbmdlcy5wcm92aWRlckxpc3QuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvcklkICYmIHRoaXMubGlzdFNlbGVjdG9yU2VydmljZS5jYWNoZS5oYXModGhpcy5zZWxlY3RvcklkKVxuICAgICAgICAgICAgICAgICYmIHRoaXMuaXNFcXVhbCh0aGlzLnByb3ZpZGVyTGlzdCwgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLnByb3ZpZGVyTGlzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLmxpc3RTZWxlY3RvclNlcnZpY2UuY2FjaGUuZ2V0KHRoaXMuc2VsZWN0b3JJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5wYXJhbWV0ZXJzLmZpbmRJbmRleCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmlzRGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgfSkgLSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFuZWwgPSB0aGlzLnNlbGVjdG9ySWQgKyAnLScgKyBpZHg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9ySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLmNhY2hlLnNldCh0aGlzLnNlbGVjdG9ySWQsIHRoaXMucGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBmaWx0ZXJsaXN0IGZvciBmaXJzdCBwYXJhbWV0ZXIgZW50cnlcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbMF0uZmlsdGVyTGlzdCA9IHRoaXMucHJvdmlkZXJMaXN0Lm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZmlsdGVyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0U2VsZWN0b3JTZXJ2aWNlLnByb3ZpZGVyTGlzdCA9IHRoaXMucHJvdmlkZXJMaXN0O1xuICAgICAgICAgICAgICAgIC8vIG9wZW4gZmlyc3QgdGFiXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVQYW5lbCA9IHRoaXMuc2VsZWN0b3JJZCArICctMCc7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzWzBdLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHBhcmFtZXRlckxpc3RcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaV0uaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGl0ZW1TZWxlY3RlZChpdGVtOiBGaWx0ZXJlZFBhcmFtZXRlciwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoaW5kZXggPCB0aGlzLnBhcmFtZXRlcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2luZGV4XS5oZWFkZXJBZGRpdGlvbiA9IGl0ZW0ubGFiZWw7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBhbmVsID0gdGhpcy5zZWxlY3RvcklkICsgJy0nICsgKGluZGV4ICsgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaW5kZXggKyAxXS5pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBjb3B5IGZpbHRlciB0byBuZXcgaXRlbVxuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2luZGV4ICsgMV0uZmlsdGVyTGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbS5maWx0ZXJMaXN0KSk7XG4gICAgICAgICAgICAvLyBhZGQgZmlsdGVyIGZvciBzZWxlY3RlZCBpdGVtIHRvIG5leHRcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyc1tpbmRleCArIDFdLmZpbHRlckxpc3QuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LmZpbHRlclt0aGlzLnBhcmFtZXRlcnNbaW5kZXhdLnR5cGVdID0gZW50cnkuaXRlbUlkKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBpbmRleCArIDI7IGkgPCB0aGlzLnBhcmFtZXRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnNbaV0uaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaW5kZXggKyAxOyBqIDwgdGhpcy5wYXJhbWV0ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzW2pdLmhlYWRlckFkZGl0aW9uID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmZpbHRlckxpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyeS5maWx0ZXJbdGhpcy5wYXJhbWV0ZXJzW2luZGV4XS50eXBlXSA9IGVudHJ5Lml0ZW1JZDtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EYXRhc2V0KGVudHJ5LnVybCwgZW50cnkuZmlsdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuRGF0YXNldCh1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5hcGlNYXBwaW5nLmdldEFwaVZlcnNpb24odXJsKS5zdWJzY3JpYmUoKGFwaVZlcnNpb25JZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFwaVZlcnNpb25JZCA9PT0gRGF0YXNldEFwaVZlcnNpb24uVjIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXREYXRhc2V0cyh1cmwsIHBhcmFtcykuc3Vic2NyaWJlKChyZXN1bHQpID0+IHRoaXMub25EYXRhc2V0U2VsZWN0aW9uLmVtaXQocmVzdWx0KSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFwaVZlcnNpb25JZCA9PT0gRGF0YXNldEFwaVZlcnNpb24uVjEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUludGVyZmFjZS5nZXRUaW1lc2VyaWVzKHVybCwgcGFyYW1zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHRoaXMub25EYXRhc2V0U2VsZWN0aW9uLmVtaXQocmVzdWx0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNFcXVhbChsaXN0T25lOiBGaWx0ZXJlZFByb3ZpZGVyW10sIGxpc3RUd286IEZpbHRlcmVkUHJvdmlkZXJbXSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbWF0Y2ggPSB0cnVlO1xuICAgICAgICBpZiAobGlzdE9uZS5sZW5ndGggPT09IGxpc3RUd28ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsaXN0T25lLmZvckVhY2goKGVudHJ5T25lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBsaXN0VHdvLmZpbmQoKGVudHJ5VHdvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeU9uZS5pZCA9PT0gZW50cnlUd28uaWQgJiYgZW50cnlPbmUudXJsID09PSBlbnRyeVR3by51cmwpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHsgbWF0Y2ggPSBmYWxzZTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG59XG4iXX0=