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
export class D3TimeFormatLocaleService {
    /**
     * @param {?} translateService
     */
    constructor(translateService) {
        this.translateService = translateService;
        this.timeFormatLocaleMapper = new Map();
    }
    /**
     * @param {?} localeCode
     * @param {?} definition
     * @return {?}
     */
    addTimeFormatLocale(localeCode, definition) {
        this.timeFormatLocaleMapper.set(localeCode, definition);
    }
    /**
     * @param {?} specifier
     * @return {?}
     */
    getTimeLocale(specifier) {
        /** @type {?} */
        const langCode = this.translateService.currentLang;
        if (this.timeFormatLocaleMapper.has(langCode)) {
            return timeFormatLocale(this.timeFormatLocaleMapper.get(langCode)).format(specifier);
        }
        else {
            return timeFormat(specifier);
        }
    }
}
D3TimeFormatLocaleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
D3TimeFormatLocaleService.ctorParameters = () => [
    { type: TranslateService }
];
/** @nocollapse */ D3TimeFormatLocaleService.ngInjectableDef = i0.defineInjectable({ factory: function D3TimeFormatLocaleService_Factory() { return new D3TimeFormatLocaleService(i0.inject(i1.TranslateService)); }, token: D3TimeFormatLocaleService, providedIn: "root" });
if (false) {
    /** @type {?} */
    D3TimeFormatLocaleService.prototype.timeFormatLocaleMapper;
    /** @type {?} */
    D3TimeFormatLocaleService.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMtdGltZS1mb3JtYXQtbG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2QzLyIsInNvdXJjZXMiOlsibGliL2hlbHBlci9kMy10aW1lLWZvcm1hdC1sb2NhbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUF3QixNQUFNLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQnhFLE1BQU07Ozs7SUFJSixZQUNVO1FBQUEscUJBQWdCLEdBQWhCLGdCQUFnQjtzQ0FIMEMsSUFBSSxHQUFHLEVBQUU7S0FJeEU7Ozs7OztJQUVFLG1CQUFtQixDQUFDLFVBQWtCLEVBQUUsVUFBZ0M7UUFDN0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7OztJQUduRCxhQUFhLENBQUMsU0FBaUI7O1FBQ3BDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7UUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUI7Ozs7WUFyQkosVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBdEJRLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IHRpbWVGb3JtYXQsIHRpbWVGb3JtYXRMb2NhbGUsIFRpbWVMb2NhbGVEZWZpbml0aW9uIH0gZnJvbSAnZDMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBob2xkcyB0aGUgdHJhbnNsYXRpb25zIGZvciBkMyBjaGFydHMgdGltZSBheGlzIGxhYmVscy5cbiAqIEFkZCBhIG5ldyB0cmFuc2xhdGlvbiB3aXRoIHRoZSBtZXRob2QgJ2FkZFRpbWVGb3JtYXRMb2NhbGUnIGxpa2UgdGhpcyBzYW1wbGU6XG4gKlxuICogYWRkVGltZUZvcm1hdExvY2FsZSgnZGUnLFxuICoge1xuICogICAnZGF0ZVRpbWUnOiAnJWEgJWIgJWUgJVggJVknLFxuICogICAnZGF0ZSc6ICclZC0lbS0lWScsXG4gKiAgICd0aW1lJzogJyVIOiVNOiVTJyxcbiAqICAgJ3BlcmlvZHMnOiBbJ0FNJywgJ1BNJ10sXG4gKiAgICdkYXlzJzogWydTb25udGFnJywgJ01vbnRhZycsICdEaWVuc3RhZycsICdNaXR0d29jaCcsICdEb25uZXJzdGFnJywgJ0ZyZWl0YWcnLCAnU2Ftc3RhZyddLFxuICogICAnc2hvcnREYXlzJzogWydTbycsICdNbycsICdEaScsICdNaScsICdEbycsICdGcicsICdTYSddLFxuICogICAnbW9udGhzJzogWydKYW51YXInLCAnRmVicnVhcicsICdNw6RyeicsICdBcHJpbCcsICdNYWknLCAnSnVuaScsICdKdWxpJywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2t0b2JlcicsICdOb3ZlbWJlcicsICdEZXplbWJlciddLFxuICogICAnc2hvcnRNb250aHMnOiBbJ0phbicsICdGZWInLCAnTcOkcicsICdBcHInLCAnTWFpJywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPa3QnLCAnTm92JywgJ0RleiddXG4gKiB9KVxuICpcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRDNUaW1lRm9ybWF0TG9jYWxlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB0aW1lRm9ybWF0TG9jYWxlTWFwcGVyOiBNYXA8c3RyaW5nLCBUaW1lTG9jYWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGFkZFRpbWVGb3JtYXRMb2NhbGUobG9jYWxlQ29kZTogc3RyaW5nLCBkZWZpbml0aW9uOiBUaW1lTG9jYWxlRGVmaW5pdGlvbikge1xuICAgIHRoaXMudGltZUZvcm1hdExvY2FsZU1hcHBlci5zZXQobG9jYWxlQ29kZSwgZGVmaW5pdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGltZUxvY2FsZShzcGVjaWZpZXI6IHN0cmluZyk6IChkYXRlOiBEYXRlKSA9PiBzdHJpbmcge1xuICAgIGNvbnN0IGxhbmdDb2RlID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMYW5nO1xuICAgIGlmICh0aGlzLnRpbWVGb3JtYXRMb2NhbGVNYXBwZXIuaGFzKGxhbmdDb2RlKSkge1xuICAgICAgcmV0dXJuIHRpbWVGb3JtYXRMb2NhbGUodGhpcy50aW1lRm9ybWF0TG9jYWxlTWFwcGVyLmdldChsYW5nQ29kZSkpLmZvcm1hdChzcGVjaWZpZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGltZUZvcm1hdChzcGVjaWZpZXIpO1xuICAgIH1cbiAgfVxufVxuIl19