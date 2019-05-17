/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import 'bootstrap-slider';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { TimeRangeSliderCache } from './time-range-slider.service';
import jquery from 'jquery';
export class TimeRangeSliderComponent {
    /**
     * @param {?} cache
     */
    constructor(cache) {
        this.cache = cache;
        this.id = '';
        this.onTimespanSelected = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["timeList"] && this.timeList) {
            /** @type {?} */
            let min;
            /** @type {?} */
            let max;
            this.start = min = this.timeList[0];
            this.end = max = this.timeList[this.timeList.length - 1];
            if (this.id && this.cache.has(this.id)) {
                this.selectionStart = this.cache.get(this.id).from;
                this.selectionEnd = this.cache.get(this.id).to;
            }
            else {
                this.selectionStart = this.start;
                this.selectionEnd = this.end;
            }
            jquery('#slider').slider({
                tooltip: 'hide',
                min,
                max,
                value: [this.selectionStart, this.selectionEnd]
            }).on('slideStop', (event) => {
                /** @type {?} */
                const timespan = new Timespan(event.value[0], event.value[1]);
                this.cache.set(this.id, timespan);
                this.onTimespanSelected.emit(timespan);
            }).on('slide', (event) => {
                this.selectionStart = event.value[0];
                this.selectionEnd = event.value[1];
            });
        }
    }
}
TimeRangeSliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'n52-time-range-slider',
                template: `<div class="time-range-slider" [hidden]="!timeList">
  <div class="slider-container">
    <div class="left-start">
      <span>{{start | date : 'short'}}</span>
    </div>
    <div class="center">
      <input id="slider" type="text" />
    </div>
    <div class="right-end">
      <span>{{end | date : 'short'}}</span>
    </div>
  </div>
  <div class="selection" *ngIf="selectionStart">
    <span>{{selectionStart | date : 'short'}}</span>
    <span> - </span>
    <span>{{selectionEnd | date : 'short'}}</span>
  </div>
</div>
`,
                styles: [`n52-time-range-slider-selector .time-range-slider{width:100%}n52-time-range-slider-selector .time-range-slider .slider-container{display:flex;display:-webkit-flex}n52-time-range-slider-selector .time-range-slider .left-start,n52-time-range-slider-selector .time-range-slider .right-end{width:150px;padding:0 15px}n52-time-range-slider-selector .time-range-slider .left-start{text-align:right}n52-time-range-slider-selector .time-range-slider .center{flex:1}n52-time-range-slider-selector .time-range-slider .center .slider{width:100%}n52-time-range-slider-selector .time-range-slider .selection{text-align:center}`, `/*! =======================================================
                      VERSION  9.9.0              
========================================================= *//*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
  *
 * bootstrap-slider is released under the MIT License
 * Copyright (c) 2017 Kyle Kemp, Rohit Kalkur, and contributors
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * ========================================================= */.slider{display:inline-block;vertical-align:middle;position:relative}.slider.slider-horizontal{width:210px;height:20px}.slider.slider-horizontal .slider-track{height:10px;width:100%;margin-top:-5px;top:50%;left:0}.slider.slider-horizontal .slider-selection,.slider.slider-horizontal .slider-track-high,.slider.slider-horizontal .slider-track-low{height:100%;top:0;bottom:0}.slider.slider-horizontal .slider-handle,.slider.slider-horizontal .slider-tick{margin-left:-10px}.slider.slider-horizontal .slider-handle.triangle,.slider.slider-horizontal .slider-tick.triangle{position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);border-width:0 10px 10px;width:0;height:0;border-bottom-color:#2e6da4;margin-top:0}.slider.slider-horizontal .slider-tick-container{white-space:nowrap;position:absolute;top:0;left:0;width:100%}.slider.slider-horizontal .slider-tick-label-container{white-space:nowrap;margin-top:20px}.slider.slider-horizontal .slider-tick-label-container .slider-tick-label{padding-top:4px;display:inline-block;text-align:center}.slider.slider-horizontal.slider-rtl .slider-track{left:initial;right:0}.slider.slider-horizontal.slider-rtl .slider-handle,.slider.slider-horizontal.slider-rtl .slider-tick{margin-left:initial;margin-right:-10px}.slider.slider-horizontal.slider-rtl .slider-tick-container{left:initial;right:0}.slider.slider-vertical{height:210px;width:20px}.slider.slider-vertical .slider-track{width:10px;height:100%;left:25%;top:0}.slider.slider-vertical .slider-selection{width:100%;left:0;top:0;bottom:0}.slider.slider-vertical .slider-track-high,.slider.slider-vertical .slider-track-low{width:100%;left:0;right:0}.slider.slider-vertical .slider-handle,.slider.slider-vertical .slider-tick{margin-top:-10px}.slider.slider-vertical .slider-handle.triangle,.slider.slider-vertical .slider-tick.triangle{border-width:10px 0 10px 10px;width:1px;height:1px;border-left-color:#2e6da4;border-right-color:#2e6da4;margin-left:0;margin-right:0}.slider.slider-vertical .slider-tick-label-container{white-space:nowrap}.slider.slider-vertical .slider-tick-label-container .slider-tick-label{padding-left:4px}.slider.slider-vertical.slider-rtl .slider-track{left:initial;right:25%}.slider.slider-vertical.slider-rtl .slider-selection{left:initial;right:0}.slider.slider-vertical.slider-rtl .slider-handle.triangle,.slider.slider-vertical.slider-rtl .slider-tick.triangle{border-width:10px 10px 10px 0}.slider.slider-vertical.slider-rtl .slider-tick-label-container .slider-tick-label{padding-left:initial;padding-right:4px}.slider.slider-disabled .slider-handle{background-image:linear-gradient(to bottom,#dfdfdf 0,#bebebe 100%);background-repeat:repeat-x}.slider.slider-disabled .slider-track{background-image:linear-gradient(to bottom,#e5e5e5 0,#e9e9e9 100%);background-repeat:repeat-x;cursor:not-allowed}.slider input{display:none}.slider .tooltip.top{margin-top:-36px}.slider .tooltip-inner{white-space:nowrap;max-width:none}.slider .hide{display:none}.slider-track{position:absolute;cursor:pointer;background-image:linear-gradient(to bottom,#f5f5f5 0,#f9f9f9 100%);background-repeat:repeat-x;box-shadow:inset 0 1px 2px rgba(0,0,0,.1);border-radius:4px}.slider-selection{position:absolute;background-image:linear-gradient(to bottom,#f9f9f9 0,#f5f5f5 100%);background-repeat:repeat-x;box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-sizing:border-box;border-radius:4px}.slider-selection.tick-slider-selection{background-image:linear-gradient(to bottom,#8ac1ef 0,#82b3de 100%);background-repeat:repeat-x}.slider-track-high,.slider-track-low{position:absolute;background:0 0;box-sizing:border-box;border-radius:4px}.slider-handle{position:absolute;top:0;width:20px;height:20px;background-color:#337ab7;background-image:linear-gradient(to bottom,#337ab7 0,#2e6da4 100%);background-repeat:repeat-x;-webkit-filter:none;filter:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 1px 2px rgba(0,0,0,.05);border:0 solid transparent}.slider-handle.round{border-radius:50%}.slider-handle.custom,.slider-handle.triangle{background:0 0}.slider-handle.custom::before{line-height:20px;font-size:20px;content:'\\2605';color:#726204}.slider-tick{position:absolute;width:20px;height:20px;background-image:linear-gradient(to bottom,#f9f9f9 0,#f5f5f5 100%);background-repeat:repeat-x;box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-sizing:border-box;-webkit-filter:none;filter:none;opacity:.8;border:0 solid transparent}.slider-tick.round{border-radius:50%}.slider-tick.custom,.slider-tick.triangle{background:0 0}.slider-tick.custom::before{line-height:20px;font-size:20px;content:'\\2605';color:#726204}.slider-tick.in-selection{background-image:linear-gradient(to bottom,#8ac1ef 0,#82b3de 100%);background-repeat:repeat-x;opacity:1}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
TimeRangeSliderComponent.ctorParameters = () => [
    { type: TimeRangeSliderCache }
];
TimeRangeSliderComponent.propDecorators = {
    id: [{ type: Input }],
    timeList: [{ type: Input }],
    onTimespanSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TimeRangeSliderComponent.prototype.id;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.timeList;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.onTimespanSelected;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.start;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.selectionStart;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.end;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.selectionEnd;
    /** @type {?} */
    TimeRangeSliderComponent.prototype.cache;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1yYW5nZS1zbGlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC90aW1lLXJhbmdlLXNsaWRlci8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXJhbmdlLXNsaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQWlFNUIsTUFBTTs7OztJQWdCSixZQUNZLEtBQTJCO1FBQTNCLFVBQUssR0FBTCxLQUFLLENBQXNCO2tCQWQzQixFQUFFO2tDQU1zQyxJQUFJLFlBQVksRUFBRTtLQVNqRTs7Ozs7SUFFRSxXQUFXLENBQUMsT0FBc0I7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxnQkFBYSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDdEMsSUFBSSxHQUFHLENBQUM7O1lBQUMsSUFBSSxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDaEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUM5QjtZQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLEdBQUc7Z0JBQ0gsR0FBRztnQkFDSCxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTs7Z0JBQ2hDLE1BQU0sUUFBUSxHQUFhLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQztTQUNKOzs7O1lBNUdKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx1bUJBQXVtQixFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d3RKQXVDb21JLENBQUM7Z0JBQ3Z0SixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7OztZQWxFUSxvQkFBb0I7OztpQkFxRTFCLEtBQUs7dUJBR0wsS0FBSztpQ0FHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdib290c3RyYXAtc2xpZGVyJztcblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVzcGFuIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcblxuaW1wb3J0IHsgVGltZVJhbmdlU2xpZGVyQ2FjaGUgfSBmcm9tICcuL3RpbWUtcmFuZ2Utc2xpZGVyLnNlcnZpY2UnO1xuXG5pbXBvcnQganF1ZXJ5IGZyb20gJ2pxdWVyeSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ241Mi10aW1lLXJhbmdlLXNsaWRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInRpbWUtcmFuZ2Utc2xpZGVyXCIgW2hpZGRlbl09XCIhdGltZUxpc3RcIj5cbiAgPGRpdiBjbGFzcz1cInNsaWRlci1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGVmdC1zdGFydFwiPlxuICAgICAgPHNwYW4+e3tzdGFydCB8IGRhdGUgOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlxuICAgICAgPGlucHV0IGlkPVwic2xpZGVyXCIgdHlwZT1cInRleHRcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyaWdodC1lbmRcIj5cbiAgICAgIDxzcGFuPnt7ZW5kIHwgZGF0ZSA6ICdzaG9ydCd9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzZWxlY3Rpb25cIiAqbmdJZj1cInNlbGVjdGlvblN0YXJ0XCI+XG4gICAgPHNwYW4+e3tzZWxlY3Rpb25TdGFydCB8IGRhdGUgOiAnc2hvcnQnfX08L3NwYW4+XG4gICAgPHNwYW4+IC0gPC9zcGFuPlxuICAgIDxzcGFuPnt7c2VsZWN0aW9uRW5kIHwgZGF0ZSA6ICdzaG9ydCd9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BuNTItdGltZS1yYW5nZS1zbGlkZXItc2VsZWN0b3IgLnRpbWUtcmFuZ2Utc2xpZGVye3dpZHRoOjEwMCV9bjUyLXRpbWUtcmFuZ2Utc2xpZGVyLXNlbGVjdG9yIC50aW1lLXJhbmdlLXNsaWRlciAuc2xpZGVyLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7ZGlzcGxheTotd2Via2l0LWZsZXh9bjUyLXRpbWUtcmFuZ2Utc2xpZGVyLXNlbGVjdG9yIC50aW1lLXJhbmdlLXNsaWRlciAubGVmdC1zdGFydCxuNTItdGltZS1yYW5nZS1zbGlkZXItc2VsZWN0b3IgLnRpbWUtcmFuZ2Utc2xpZGVyIC5yaWdodC1lbmR7d2lkdGg6MTUwcHg7cGFkZGluZzowIDE1cHh9bjUyLXRpbWUtcmFuZ2Utc2xpZGVyLXNlbGVjdG9yIC50aW1lLXJhbmdlLXNsaWRlciAubGVmdC1zdGFydHt0ZXh0LWFsaWduOnJpZ2h0fW41Mi10aW1lLXJhbmdlLXNsaWRlci1zZWxlY3RvciAudGltZS1yYW5nZS1zbGlkZXIgLmNlbnRlcntmbGV4OjF9bjUyLXRpbWUtcmFuZ2Utc2xpZGVyLXNlbGVjdG9yIC50aW1lLXJhbmdlLXNsaWRlciAuY2VudGVyIC5zbGlkZXJ7d2lkdGg6MTAwJX1uNTItdGltZS1yYW5nZS1zbGlkZXItc2VsZWN0b3IgLnRpbWUtcmFuZ2Utc2xpZGVyIC5zZWxlY3Rpb257dGV4dC1hbGlnbjpjZW50ZXJ9YCwgYC8qISA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgICAgICAgICAgICAgVkVSU0lPTiAgOS45LjAgICAgICAgICAgICAgIFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovLyohID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogYm9vdHN0cmFwLXNsaWRlci5qc1xuICpcbiAqIE1haW50YWluZXJzOlxuICpcdFx0S3lsZSBLZW1wXG4gKlx0XHRcdC0gVHdpdHRlcjogQHNlaXlyaWFcbiAqXHRcdFx0LSBHaXRodWI6ICBzZWl5cmlhXG4gKlx0XHRSb2hpdCBLYWxrdXJcbiAqXHRcdFx0LSBUd2l0dGVyOiBAUm92b2x1dGlvbmFyeVxuICpcdFx0XHQtIEdpdGh1YjogIHJvdm9sdXRpb25cbiAqXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgKlxuICogYm9vdHN0cmFwLXNsaWRlciBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBLeWxlIEtlbXAsIFJvaGl0IEthbGt1ciwgYW5kIGNvbnRyaWJ1dG9yc1xuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICogcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICogY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAqIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuICogRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG4gKiBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuICogTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbiAqIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuICogV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG4gKiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovLnNsaWRlcntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9zaXRpb246cmVsYXRpdmV9LnNsaWRlci5zbGlkZXItaG9yaXpvbnRhbHt3aWR0aDoyMTBweDtoZWlnaHQ6MjBweH0uc2xpZGVyLnNsaWRlci1ob3Jpem9udGFsIC5zbGlkZXItdHJhY2t7aGVpZ2h0OjEwcHg7d2lkdGg6MTAwJTttYXJnaW4tdG9wOi01cHg7dG9wOjUwJTtsZWZ0OjB9LnNsaWRlci5zbGlkZXItaG9yaXpvbnRhbCAuc2xpZGVyLXNlbGVjdGlvbiwuc2xpZGVyLnNsaWRlci1ob3Jpem9udGFsIC5zbGlkZXItdHJhY2staGlnaCwuc2xpZGVyLnNsaWRlci1ob3Jpem9udGFsIC5zbGlkZXItdHJhY2stbG93e2hlaWdodDoxMDAlO3RvcDowO2JvdHRvbTowfS5zbGlkZXIuc2xpZGVyLWhvcml6b250YWwgLnNsaWRlci1oYW5kbGUsLnNsaWRlci5zbGlkZXItaG9yaXpvbnRhbCAuc2xpZGVyLXRpY2t7bWFyZ2luLWxlZnQ6LTEwcHh9LnNsaWRlci5zbGlkZXItaG9yaXpvbnRhbCAuc2xpZGVyLWhhbmRsZS50cmlhbmdsZSwuc2xpZGVyLnNsaWRlci1ob3Jpem9udGFsIC5zbGlkZXItdGljay50cmlhbmdsZXtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7Ym9yZGVyLXdpZHRoOjAgMTBweCAxMHB4O3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWJvdHRvbS1jb2xvcjojMmU2ZGE0O21hcmdpbi10b3A6MH0uc2xpZGVyLnNsaWRlci1ob3Jpem9udGFsIC5zbGlkZXItdGljay1jb250YWluZXJ7d2hpdGUtc3BhY2U6bm93cmFwO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlfS5zbGlkZXIuc2xpZGVyLWhvcml6b250YWwgLnNsaWRlci10aWNrLWxhYmVsLWNvbnRhaW5lcnt3aGl0ZS1zcGFjZTpub3dyYXA7bWFyZ2luLXRvcDoyMHB4fS5zbGlkZXIuc2xpZGVyLWhvcml6b250YWwgLnNsaWRlci10aWNrLWxhYmVsLWNvbnRhaW5lciAuc2xpZGVyLXRpY2stbGFiZWx7cGFkZGluZy10b3A6NHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RleHQtYWxpZ246Y2VudGVyfS5zbGlkZXIuc2xpZGVyLWhvcml6b250YWwuc2xpZGVyLXJ0bCAuc2xpZGVyLXRyYWNre2xlZnQ6aW5pdGlhbDtyaWdodDowfS5zbGlkZXIuc2xpZGVyLWhvcml6b250YWwuc2xpZGVyLXJ0bCAuc2xpZGVyLWhhbmRsZSwuc2xpZGVyLnNsaWRlci1ob3Jpem9udGFsLnNsaWRlci1ydGwgLnNsaWRlci10aWNre21hcmdpbi1sZWZ0OmluaXRpYWw7bWFyZ2luLXJpZ2h0Oi0xMHB4fS5zbGlkZXIuc2xpZGVyLWhvcml6b250YWwuc2xpZGVyLXJ0bCAuc2xpZGVyLXRpY2stY29udGFpbmVye2xlZnQ6aW5pdGlhbDtyaWdodDowfS5zbGlkZXIuc2xpZGVyLXZlcnRpY2Fse2hlaWdodDoyMTBweDt3aWR0aDoyMHB4fS5zbGlkZXIuc2xpZGVyLXZlcnRpY2FsIC5zbGlkZXItdHJhY2t7d2lkdGg6MTBweDtoZWlnaHQ6MTAwJTtsZWZ0OjI1JTt0b3A6MH0uc2xpZGVyLnNsaWRlci12ZXJ0aWNhbCAuc2xpZGVyLXNlbGVjdGlvbnt3aWR0aDoxMDAlO2xlZnQ6MDt0b3A6MDtib3R0b206MH0uc2xpZGVyLnNsaWRlci12ZXJ0aWNhbCAuc2xpZGVyLXRyYWNrLWhpZ2gsLnNsaWRlci5zbGlkZXItdmVydGljYWwgLnNsaWRlci10cmFjay1sb3d7d2lkdGg6MTAwJTtsZWZ0OjA7cmlnaHQ6MH0uc2xpZGVyLnNsaWRlci12ZXJ0aWNhbCAuc2xpZGVyLWhhbmRsZSwuc2xpZGVyLnNsaWRlci12ZXJ0aWNhbCAuc2xpZGVyLXRpY2t7bWFyZ2luLXRvcDotMTBweH0uc2xpZGVyLnNsaWRlci12ZXJ0aWNhbCAuc2xpZGVyLWhhbmRsZS50cmlhbmdsZSwuc2xpZGVyLnNsaWRlci12ZXJ0aWNhbCAuc2xpZGVyLXRpY2sudHJpYW5nbGV7Ym9yZGVyLXdpZHRoOjEwcHggMCAxMHB4IDEwcHg7d2lkdGg6MXB4O2hlaWdodDoxcHg7Ym9yZGVyLWxlZnQtY29sb3I6IzJlNmRhNDtib3JkZXItcmlnaHQtY29sb3I6IzJlNmRhNDttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowfS5zbGlkZXIuc2xpZGVyLXZlcnRpY2FsIC5zbGlkZXItdGljay1sYWJlbC1jb250YWluZXJ7d2hpdGUtc3BhY2U6bm93cmFwfS5zbGlkZXIuc2xpZGVyLXZlcnRpY2FsIC5zbGlkZXItdGljay1sYWJlbC1jb250YWluZXIgLnNsaWRlci10aWNrLWxhYmVse3BhZGRpbmctbGVmdDo0cHh9LnNsaWRlci5zbGlkZXItdmVydGljYWwuc2xpZGVyLXJ0bCAuc2xpZGVyLXRyYWNre2xlZnQ6aW5pdGlhbDtyaWdodDoyNSV9LnNsaWRlci5zbGlkZXItdmVydGljYWwuc2xpZGVyLXJ0bCAuc2xpZGVyLXNlbGVjdGlvbntsZWZ0OmluaXRpYWw7cmlnaHQ6MH0uc2xpZGVyLnNsaWRlci12ZXJ0aWNhbC5zbGlkZXItcnRsIC5zbGlkZXItaGFuZGxlLnRyaWFuZ2xlLC5zbGlkZXIuc2xpZGVyLXZlcnRpY2FsLnNsaWRlci1ydGwgLnNsaWRlci10aWNrLnRyaWFuZ2xle2JvcmRlci13aWR0aDoxMHB4IDEwcHggMTBweCAwfS5zbGlkZXIuc2xpZGVyLXZlcnRpY2FsLnNsaWRlci1ydGwgLnNsaWRlci10aWNrLWxhYmVsLWNvbnRhaW5lciAuc2xpZGVyLXRpY2stbGFiZWx7cGFkZGluZy1sZWZ0OmluaXRpYWw7cGFkZGluZy1yaWdodDo0cHh9LnNsaWRlci5zbGlkZXItZGlzYWJsZWQgLnNsaWRlci1oYW5kbGV7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCNkZmRmZGYgMCwjYmViZWJlIDEwMCUpO2JhY2tncm91bmQtcmVwZWF0OnJlcGVhdC14fS5zbGlkZXIuc2xpZGVyLWRpc2FibGVkIC5zbGlkZXItdHJhY2t7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCNlNWU1ZTUgMCwjZTllOWU5IDEwMCUpO2JhY2tncm91bmQtcmVwZWF0OnJlcGVhdC14O2N1cnNvcjpub3QtYWxsb3dlZH0uc2xpZGVyIGlucHV0e2Rpc3BsYXk6bm9uZX0uc2xpZGVyIC50b29sdGlwLnRvcHttYXJnaW4tdG9wOi0zNnB4fS5zbGlkZXIgLnRvb2x0aXAtaW5uZXJ7d2hpdGUtc3BhY2U6bm93cmFwO21heC13aWR0aDpub25lfS5zbGlkZXIgLmhpZGV7ZGlzcGxheTpub25lfS5zbGlkZXItdHJhY2t7cG9zaXRpb246YWJzb2x1dGU7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCNmNWY1ZjUgMCwjZjlmOWY5IDEwMCUpO2JhY2tncm91bmQtcmVwZWF0OnJlcGVhdC14O2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMnB4IHJnYmEoMCwwLDAsLjEpO2JvcmRlci1yYWRpdXM6NHB4fS5zbGlkZXItc2VsZWN0aW9ue3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjZjlmOWY5IDAsI2Y1ZjVmNSAxMDAlKTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteDtib3gtc2hhZG93Omluc2V0IDAgLTFweCAwIHJnYmEoMCwwLDAsLjE1KTtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXJhZGl1czo0cHh9LnNsaWRlci1zZWxlY3Rpb24udGljay1zbGlkZXItc2VsZWN0aW9ue2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjOGFjMWVmIDAsIzgyYjNkZSAxMDAlKTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteH0uc2xpZGVyLXRyYWNrLWhpZ2gsLnNsaWRlci10cmFjay1sb3d7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZDowIDA7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci1yYWRpdXM6NHB4fS5zbGlkZXItaGFuZGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7YmFja2dyb3VuZC1jb2xvcjojMzM3YWI3O2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjMzM3YWI3IDAsIzJlNmRhNCAxMDAlKTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteDstd2Via2l0LWZpbHRlcjpub25lO2ZpbHRlcjpub25lO2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LC4yKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMDUpO2JvcmRlcjowIHNvbGlkIHRyYW5zcGFyZW50fS5zbGlkZXItaGFuZGxlLnJvdW5ke2JvcmRlci1yYWRpdXM6NTAlfS5zbGlkZXItaGFuZGxlLmN1c3RvbSwuc2xpZGVyLWhhbmRsZS50cmlhbmdsZXtiYWNrZ3JvdW5kOjAgMH0uc2xpZGVyLWhhbmRsZS5jdXN0b206OmJlZm9yZXtsaW5lLWhlaWdodDoyMHB4O2ZvbnQtc2l6ZToyMHB4O2NvbnRlbnQ6J1xcXFwyNjA1Jztjb2xvcjojNzI2MjA0fS5zbGlkZXItdGlja3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjZjlmOWY5IDAsI2Y1ZjVmNSAxMDAlKTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteDtib3gtc2hhZG93Omluc2V0IDAgLTFweCAwIHJnYmEoMCwwLDAsLjE1KTtib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1maWx0ZXI6bm9uZTtmaWx0ZXI6bm9uZTtvcGFjaXR5Oi44O2JvcmRlcjowIHNvbGlkIHRyYW5zcGFyZW50fS5zbGlkZXItdGljay5yb3VuZHtib3JkZXItcmFkaXVzOjUwJX0uc2xpZGVyLXRpY2suY3VzdG9tLC5zbGlkZXItdGljay50cmlhbmdsZXtiYWNrZ3JvdW5kOjAgMH0uc2xpZGVyLXRpY2suY3VzdG9tOjpiZWZvcmV7bGluZS1oZWlnaHQ6MjBweDtmb250LXNpemU6MjBweDtjb250ZW50OidcXFxcMjYwNSc7Y29sb3I6IzcyNjIwNH0uc2xpZGVyLXRpY2suaW4tc2VsZWN0aW9ue2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjOGFjMWVmIDAsIzgyYjNkZSAxMDAlKTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteDtvcGFjaXR5OjF9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVGltZVJhbmdlU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaWQgPSAnJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGltZUxpc3Q6IG51bWJlcltdO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25UaW1lc3BhblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8VGltZXNwYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBzdGFydDogbnVtYmVyO1xuICBwdWJsaWMgc2VsZWN0aW9uU3RhcnQ6IG51bWJlcjtcbiAgcHVibGljIGVuZDogbnVtYmVyO1xuICBwdWJsaWMgc2VsZWN0aW9uRW5kOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNhY2hlOiBUaW1lUmFuZ2VTbGlkZXJDYWNoZVxuICApIHsgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudGltZUxpc3QgJiYgdGhpcy50aW1lTGlzdCkge1xuICAgICAgbGV0IG1pbjsgbGV0IG1heDtcbiAgICAgIHRoaXMuc3RhcnQgPSBtaW4gPSB0aGlzLnRpbWVMaXN0WzBdO1xuICAgICAgdGhpcy5lbmQgPSBtYXggPSB0aGlzLnRpbWVMaXN0W3RoaXMudGltZUxpc3QubGVuZ3RoIC0gMV07XG4gICAgICBpZiAodGhpcy5pZCAmJiB0aGlzLmNhY2hlLmhhcyh0aGlzLmlkKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5jYWNoZS5nZXQodGhpcy5pZCkuZnJvbTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSB0aGlzLmNhY2hlLmdldCh0aGlzLmlkKS50bztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnN0YXJ0O1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHRoaXMuZW5kO1xuICAgICAgfVxuICAgICAganF1ZXJ5KCcjc2xpZGVyJykuc2xpZGVyKHtcbiAgICAgICAgdG9vbHRpcDogJ2hpZGUnLFxuICAgICAgICBtaW4sXG4gICAgICAgIG1heCxcbiAgICAgICAgdmFsdWU6IFt0aGlzLnNlbGVjdGlvblN0YXJ0LCB0aGlzLnNlbGVjdGlvbkVuZF1cbiAgICAgIH0pLm9uKCdzbGlkZVN0b3AnLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCB0aW1lc3BhbjogVGltZXNwYW4gPSBuZXcgVGltZXNwYW4oZXZlbnQudmFsdWVbMF0sIGV2ZW50LnZhbHVlWzFdKTtcbiAgICAgICAgdGhpcy5jYWNoZS5zZXQodGhpcy5pZCwgdGltZXNwYW4pO1xuICAgICAgICB0aGlzLm9uVGltZXNwYW5TZWxlY3RlZC5lbWl0KHRpbWVzcGFuKTtcbiAgICAgIH0pLm9uKCdzbGlkZScsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSBldmVudC52YWx1ZVswXTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25FbmQgPSBldmVudC52YWx1ZVsxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19