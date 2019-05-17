/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { timeFormat, timeFormatLocale } from 'd3';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
/**
 * This service holds the translations for d3 charts time axis labels.
 * Add a new translation with the method 'addTimeFormatLocale' like this sample:
 *
 * addTimeFormatLocale('de',
 * {
 *   'dateTime': '%a %b %e %X %Y',
 *   'date': '%d-%m-%Y',
 *   'time': '%H:%M:%S',
 *   'periods': ['AM', 'PM'],
 *   'days': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
 *   'shortDays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
 *   'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
 *   'shortMonths': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
 * })
 *
 */
var D3TimeFormatLocaleService = /** @class */ (function () {
    function D3TimeFormatLocaleService(translateService) {
        this.translateService = translateService;
        this.timeFormatLocaleMapper = new Map();
    }
    /**
     * @param {?} localeCode
     * @param {?} definition
     * @return {?}
     */
    D3TimeFormatLocaleService.prototype.addTimeFormatLocale = /**
     * @param {?} localeCode
     * @param {?} definition
     * @return {?}
     */
    function (localeCode, definition) {
        this.timeFormatLocaleMapper.set(localeCode, definition);
    };
    /**
     * @param {?} specifier
     * @return {?}
     */
    D3TimeFormatLocaleService.prototype.getTimeLocale = /**
     * @param {?} specifier
     * @return {?}
     */
    function (specifier) {
        /** @type {?} */
        var langCode = this.translateService.currentLang;
        if (this.timeFormatLocaleMapper.has(langCode)) {
            return timeFormatLocale(this.timeFormatLocaleMapper.get(langCode)).format(specifier);
        }
        else {
            return timeFormat(specifier);
        }
    };
    D3TimeFormatLocaleService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    D3TimeFormatLocaleService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    /** @nocollapse */ D3TimeFormatLocaleService.ngInjectableDef = i0.defineInjectable({ factory: function D3TimeFormatLocaleService_Factory() { return new D3TimeFormatLocaleService(i0.inject(i1.TranslateService)); }, token: D3TimeFormatLocaleService, providedIn: "root" });
    return D3TimeFormatLocaleService;
}());
export { D3TimeFormatLocaleService };
if (false) {
    /** @type {?} */
    D3TimeFormatLocaleService.prototype.timeFormatLocaleMapper;
    /** @type {?} */
    D3TimeFormatLocaleService.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUF3QixNQUFNLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMEJ0RSxtQ0FDVTtRQUFBLHFCQUFnQixHQUFoQixnQkFBZ0I7c0NBSDBDLElBQUksR0FBRyxFQUFFO0tBSXhFOzs7Ozs7SUFFRSx1REFBbUI7Ozs7O2NBQUMsVUFBa0IsRUFBRSxVQUFnQztRQUM3RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7O0lBR25ELGlEQUFhOzs7O2NBQUMsU0FBaUI7O1FBQ3BDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7UUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUI7OztnQkFyQkosVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkF0QlEsZ0JBQWdCOzs7b0NBRHpCOztTQXdCYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyB0aW1lRm9ybWF0LCB0aW1lRm9ybWF0TG9jYWxlLCBUaW1lTG9jYWxlRGVmaW5pdGlvbiB9IGZyb20gJ2QzJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgaG9sZHMgdGhlIHRyYW5zbGF0aW9ucyBmb3IgZDMgY2hhcnRzIHRpbWUgYXhpcyBsYWJlbHMuXG4gKiBBZGQgYSBuZXcgdHJhbnNsYXRpb24gd2l0aCB0aGUgbWV0aG9kICdhZGRUaW1lRm9ybWF0TG9jYWxlJyBsaWtlIHRoaXMgc2FtcGxlOlxuICpcbiAqIGFkZFRpbWVGb3JtYXRMb2NhbGUoJ2RlJyxcbiAqIHtcbiAqICAgJ2RhdGVUaW1lJzogJyVhICViICVlICVYICVZJyxcbiAqICAgJ2RhdGUnOiAnJWQtJW0tJVknLFxuICogICAndGltZSc6ICclSDolTTolUycsXG4gKiAgICdwZXJpb2RzJzogWydBTScsICdQTSddLFxuICogICAnZGF5cyc6IFsnU29ubnRhZycsICdNb250YWcnLCAnRGllbnN0YWcnLCAnTWl0dHdvY2gnLCAnRG9ubmVyc3RhZycsICdGcmVpdGFnJywgJ1NhbXN0YWcnXSxcbiAqICAgJ3Nob3J0RGF5cyc6IFsnU28nLCAnTW8nLCAnRGknLCAnTWknLCAnRG8nLCAnRnInLCAnU2EnXSxcbiAqICAgJ21vbnRocyc6IFsnSmFudWFyJywgJ0ZlYnJ1YXInLCAnTcOkcnonLCAnQXByaWwnLCAnTWFpJywgJ0p1bmknLCAnSnVsaScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09rdG9iZXInLCAnTm92ZW1iZXInLCAnRGV6ZW1iZXInXSxcbiAqICAgJ3Nob3J0TW9udGhzJzogWydKYW4nLCAnRmViJywgJ03DpHInLCAnQXByJywgJ01haScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZXonXVxuICogfSlcbiAqXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEQzVGltZUZvcm1hdExvY2FsZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgdGltZUZvcm1hdExvY2FsZU1hcHBlcjogTWFwPHN0cmluZywgVGltZUxvY2FsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBhZGRUaW1lRm9ybWF0TG9jYWxlKGxvY2FsZUNvZGU6IHN0cmluZywgZGVmaW5pdGlvbjogVGltZUxvY2FsZURlZmluaXRpb24pIHtcbiAgICB0aGlzLnRpbWVGb3JtYXRMb2NhbGVNYXBwZXIuc2V0KGxvY2FsZUNvZGUsIGRlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldFRpbWVMb2NhbGUoc3BlY2lmaWVyOiBzdHJpbmcpOiAoZGF0ZTogRGF0ZSkgPT4gc3RyaW5nIHtcbiAgICBjb25zdCBsYW5nQ29kZSA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5jdXJyZW50TGFuZztcbiAgICBpZiAodGhpcy50aW1lRm9ybWF0TG9jYWxlTWFwcGVyLmhhcyhsYW5nQ29kZSkpIHtcbiAgICAgIHJldHVybiB0aW1lRm9ybWF0TG9jYWxlKHRoaXMudGltZUZvcm1hdExvY2FsZU1hcHBlci5nZXQobGFuZ0NvZGUpKS5mb3JtYXQoc3BlY2lmaWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRpbWVGb3JtYXQoc3BlY2lmaWVyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==