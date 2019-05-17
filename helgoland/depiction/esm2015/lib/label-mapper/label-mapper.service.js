/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdCache, SettingsService } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
export class LabelMapperService {
    /**
     * @param {?} httpClient
     * @param {?} settingsSrvc
     */
    constructor(httpClient, settingsSrvc) {
        this.httpClient = httpClient;
        this.settingsSrvc = settingsSrvc;
        this.cache = new IdCache();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    getMappedLabel(label) {
        return new Observable((observer) => {
            if (!this.settingsSrvc.getSettings().solveLabels) {
                this.confirmLabel(observer, label);
            }
            else {
                /** @type {?} */
                const url = this.findUrl(label);
                if (url) {
                    if (this.cache.has(url)) {
                        this.confirmLabel(observer, this.cache.get(url));
                    }
                    else {
                        /** @type {?} */
                        const labelUrl = this.settingsSrvc.getSettings().proxyUrl ? this.settingsSrvc.getSettings().proxyUrl + url : url;
                        this.httpClient.get(labelUrl, { responseType: 'text' }).subscribe((res) => {
                            try {
                                /** @type {?} */
                                const xml = $.parseXML(res);
                                label = label.replace(url, $(xml).find('prefLabel').text());
                            }
                            catch (error) {
                                // currently do nothing and use old label
                            }
                            this.cache.set(url, label);
                            this.confirmLabel(observer, label);
                        }, (error) => {
                            /** @type {?} */
                            const resolvedLabel = label.substring(label.lastIndexOf('/') + 1, label.length);
                            this.cache.set(url, resolvedLabel);
                            this.confirmLabel(observer, resolvedLabel);
                        });
                    }
                }
                else {
                    this.confirmLabel(observer, label);
                }
            }
        });
    }
    /**
     * @param {?} observer
     * @param {?} label
     * @return {?}
     */
    confirmLabel(observer, label) {
        observer.next(label);
        observer.complete();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    findUrl(label) {
        /** @type {?} */
        const source = (label || '').toString();
        /** @type {?} */
        const regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?&\/\/=]+)/g;
        /** @type {?} */
        const matchArray = regexToken.exec(source);
        if (matchArray !== null) {
            return matchArray[0];
        }
        return null;
    }
}
LabelMapperService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LabelMapperService.ctorParameters = () => [
    { type: HttpClient },
    { type: SettingsService }
];
if (false) {
    /** @type {?} */
    LabelMapperService.prototype.cache;
    /** @type {?} */
    LabelMapperService.prototype.httpClient;
    /** @type {?} */
    LabelMapperService.prototype.settingsSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwtbWFwcGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9sYWJlbC1tYXBwZXIvbGFiZWwtbWFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQVksZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBTTdDLE1BQU07Ozs7O0lBSUYsWUFDYyxVQUFzQixFQUN0QixZQUF1QztRQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtxQkFKcEIsSUFBSSxPQUFPLEVBQUU7S0FLekM7Ozs7O0lBRUUsY0FBYyxDQUFDLEtBQWE7UUFDL0IsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFTLENBQUMsUUFBMEIsRUFBRSxFQUFFO1lBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN0QztZQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDSixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDcEQ7b0JBQUMsSUFBSSxDQUFDLENBQUM7O3dCQUNKLE1BQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ3RFLElBQUksQ0FBQzs7Z0NBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDNUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzs2QkFDL0Q7NEJBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7OzZCQUVoQjs0QkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUN0QyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7OzRCQUNULE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNoRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7NEJBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3lCQUM5QyxDQUFDLENBQUM7cUJBQ047aUJBQ0o7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0o7U0FDSixDQUFDLENBQUM7Ozs7Ozs7SUFHQyxZQUFZLENBQUMsUUFBMEIsRUFBRSxLQUFhO1FBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7Ozs7SUFHaEIsT0FBTyxDQUFDLEtBQWE7O1FBQ3pCLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDOztRQUN4QyxNQUFNLFVBQVUsR0FBRywrQ0FBK0MsQ0FBQzs7UUFDbkUsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzs7OztZQXhEbkIsVUFBVTs7OztZQVJGLFVBQVU7WUFFUyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElkQ2FjaGUsIFNldHRpbmdzLCBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tICdAaGVsZ29sYW5kL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMYWJlbE1hcHBlclNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjYWNoZTogSWRDYWNoZTxzdHJpbmc+ID0gbmV3IElkQ2FjaGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICAgICAgcHJvdGVjdGVkIHNldHRpbmdzU3J2YzogU2V0dGluZ3NTZXJ2aWNlPFNldHRpbmdzPlxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwcGVkTGFiZWwobGFiZWw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxzdHJpbmc+KChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzU3J2Yy5nZXRTZXR0aW5ncygpLnNvbHZlTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIGxhYmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5maW5kVXJsKGxhYmVsKTtcbiAgICAgICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1MYWJlbChvYnNlcnZlciwgdGhpcy5jYWNoZS5nZXQodXJsKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbFVybCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1NydmMuZ2V0U2V0dGluZ3MoKS5wcm94eVVybCA/IHRoaXMuc2V0dGluZ3NTcnZjLmdldFNldHRpbmdzKCkucHJveHlVcmwgKyB1cmwgOiB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQuZ2V0KGxhYmVsVXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeG1sID0gJC5wYXJzZVhNTChyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UodXJsLCAkKHhtbCkuZmluZCgncHJlZkxhYmVsJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50bHkgZG8gbm90aGluZyBhbmQgdXNlIG9sZCBsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldCh1cmwsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1MYWJlbChvYnNlcnZlciwgbGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRMYWJlbCA9IGxhYmVsLnN1YnN0cmluZyhsYWJlbC5sYXN0SW5kZXhPZignLycpICsgMSwgbGFiZWwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldCh1cmwsIHJlc29sdmVkTGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCByZXNvbHZlZExhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlybUxhYmVsKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+LCBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIG9ic2VydmVyLm5leHQobGFiZWwpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZFVybChsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChsYWJlbCB8fCAnJykudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgcmVnZXhUb2tlbiA9IC8oKChmdHB8aHR0cHM/KTpcXC9cXC8pW1xcLVxcd0A6JV9cXCsufiM/JlxcL1xcLz1dKykvZztcbiAgICAgICAgY29uc3QgbWF0Y2hBcnJheSA9IHJlZ2V4VG9rZW4uZXhlYyhzb3VyY2UpO1xuICAgICAgICBpZiAobWF0Y2hBcnJheSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoQXJyYXlbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIl19