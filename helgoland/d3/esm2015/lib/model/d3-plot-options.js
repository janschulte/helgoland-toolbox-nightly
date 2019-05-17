/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Plot options for D3 component.
 *
 * @export
 * @record
 */
export function D3PlotOptions() { }
/**
 * show reference values for a graph
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.showReferenceValues;
/**
 * requests the dataset data generalized
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.generalizeAllways;
/**
 * toggle panning (true) and zooming (false)
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.togglePanZoom;
/**
 * show or hide y axis
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.yaxis;
/**
 * show or hide grid lines inside plot
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.grid;
/**
 * show or hide lines with values when hovering with mouse
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.hoverable;
/**
 * style when hovering with mouse
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.hoverStyle;
/**
 * indicating if component should build overview diagram or not
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.overview;
/**
 * show copyright label
 *
 * default position is top left
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.copyright;
/**
 * toggle dataset grouping by uom
 * true = group y axis by uom
 * false = single y axis for each timeseries
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.groupYaxis;
/**
 * show the label of the xaxis
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.showTimeLabel;
/**
 * Request the data with expanded=true, to get valueBeforeTimespan/valueAfterTimespan
 *
 * \@memberof D3PlotOptions
 * @type {?|undefined}
 */
D3PlotOptions.prototype.requestBeforeAfterValues;
/**
 * @record
 */
export function D3Copyright() { }
/** @type {?} */
D3Copyright.prototype.label;
/** @type {?|undefined} */
D3Copyright.prototype.positionX;
/** @type {?|undefined} */
D3Copyright.prototype.positionY;
/** @enum {string} */
const HoveringStyle = {
    none: 'none',
    line: 'line',
    point: 'point',
};
export { HoveringStyle };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtcGxvdC1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9kMy8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbC9kMy1wbG90LW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0dJLE1BQU8sTUFBTTtJQUNiLE1BQU8sTUFBTTtJQUNiLE9BQVEsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGxvdCBvcHRpb25zIGZvciBEMyBjb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEQzUGxvdE9wdGlvbnMge1xuXG4gICAgLyoqXG4gICAgICogc2hvdyByZWZlcmVuY2UgdmFsdWVzIGZvciBhIGdyYXBoXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIHNob3dSZWZlcmVuY2VWYWx1ZXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogcmVxdWVzdHMgdGhlIGRhdGFzZXQgZGF0YSBnZW5lcmFsaXplZFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICBnZW5lcmFsaXplQWxsd2F5cz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGUgcGFubmluZyAodHJ1ZSkgYW5kIHpvb21pbmcgKGZhbHNlKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAgKi9cbiAgICB0b2dnbGVQYW5ab29tPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNob3cgb3IgaGlkZSB5IGF4aXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgeWF4aXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBvciBoaWRlIGdyaWQgbGluZXMgaW5zaWRlIHBsb3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgZ3JpZD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzaG93IG9yIGhpZGUgbGluZXMgd2l0aCB2YWx1ZXMgd2hlbiBob3ZlcmluZyB3aXRoIG1vdXNlXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICAqL1xuICAgIGhvdmVyYWJsZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBzdHlsZSB3aGVuIGhvdmVyaW5nIHdpdGggbW91c2VcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgaG92ZXJTdHlsZT86IEhvdmVyaW5nU3R5bGU7XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0aW5nIGlmIGNvbXBvbmVudCBzaG91bGQgYnVpbGQgb3ZlcnZpZXcgZGlhZ3JhbSBvciBub3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgb3ZlcnZpZXc/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBjb3B5cmlnaHQgbGFiZWxcbiAgICAgKlxuICAgICAqIGRlZmF1bHQgcG9zaXRpb24gaXMgdG9wIGxlZnRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEM1Bsb3RPcHRpb25zXG4gICAgICovXG4gICAgY29weXJpZ2h0PzogRDNDb3B5cmlnaHQ7XG5cbiAgICAvKipcbiAgICAqIHRvZ2dsZSBkYXRhc2V0IGdyb3VwaW5nIGJ5IHVvbVxuICAgICogdHJ1ZSA9IGdyb3VwIHkgYXhpcyBieSB1b21cbiAgICAqIGZhbHNlID0gc2luZ2xlIHkgYXhpcyBmb3IgZWFjaCB0aW1lc2VyaWVzXG4gICAgKlxuICAgICogQG1lbWJlcm9mIEQzUGxvdE9wdGlvbnNcbiAgICAqL1xuICAgIGdyb3VwWWF4aXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgKiBzaG93IHRoZSBsYWJlbCBvZiB0aGUgeGF4aXNcbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgc2hvd1RpbWVMYWJlbD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAqIFJlcXVlc3QgdGhlIGRhdGEgd2l0aCBleHBhbmRlZD10cnVlLCB0byBnZXQgdmFsdWVCZWZvcmVUaW1lc3Bhbi92YWx1ZUFmdGVyVGltZXNwYW5cbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgRDNQbG90T3B0aW9uc1xuICAgICovXG4gICAgcmVxdWVzdEJlZm9yZUFmdGVyVmFsdWVzPzogYm9vbGVhbjtcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEQzQ29weXJpZ2h0IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHBvc2l0aW9uWD86ICdyaWdodCcgfCAnbGVmdCc7XG4gICAgcG9zaXRpb25ZPzogJ3RvcCcgfCAnYm90dG9tJztcbn1cblxuZXhwb3J0IGVudW0gSG92ZXJpbmdTdHlsZSB7XG4gICAgbm9uZSA9ICdub25lJyxcbiAgICBsaW5lID0gJ2xpbmUnLFxuICAgIHBvaW50ID0gJ3BvaW50J1xufVxuIl19