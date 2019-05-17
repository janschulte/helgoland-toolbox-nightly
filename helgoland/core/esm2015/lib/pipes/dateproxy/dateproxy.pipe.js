/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class DateProxyPipe {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    transform(value, pattern = 'mediumDate') {
        /** @type {?} */
        const builtinDatePipe = new DatePipe(this.translate.currentLang || 'en');
        try {
            return builtinDatePipe.transform(value, pattern);
        }
        catch (error) {
            console.error(error);
            return new DatePipe('en').transform(value, pattern);
        }
    }
}
DateProxyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dateI18n',
                pure: false
            },] },
];
/** @nocollapse */
DateProxyPipe.ctorParameters = () => [
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    DateProxyPipe.prototype.translate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXByb3h5LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvZGF0ZXByb3h5L2RhdGVwcm94eS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNdkQsTUFBTTs7OztJQUVGLFlBQ2MsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7S0FDcEM7Ozs7OztJQUVFLFNBQVMsQ0FBQyxLQUFVLEVBQUUsVUFBa0IsWUFBWTs7UUFFdkQsTUFBTSxlQUFlLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDO1lBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3BEO1FBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZEOzs7O1lBbEJSLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLEtBQUs7YUFDZDs7OztZQUxRLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdkYXRlSTE4bicsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVByb3h5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBwYXR0ZXJuOiBzdHJpbmcgPSAnbWVkaXVtRGF0ZScpOiBhbnkge1xuICAgICAgICAvLyBzaW1wbHkgZm9yd2FyZCB0byBidWlsdC1pbiBwaXBlLCBidXQgdGFrZSBpbnRvIGFjY291bnQgdGhlIGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICAgICAgY29uc3QgYnVpbHRpbkRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nIHx8ICdlbicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1aWx0aW5EYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIHBhdHRlcm4pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVQaXBlKCdlbicpLnRyYW5zZm9ybSh2YWx1ZSwgcGF0dGVybik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==