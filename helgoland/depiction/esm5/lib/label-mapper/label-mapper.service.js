/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdCache, SettingsService } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
var LabelMapperService = /** @class */ (function () {
    function LabelMapperService(httpClient, settingsSrvc) {
        this.httpClient = httpClient;
        this.settingsSrvc = settingsSrvc;
        this.cache = new IdCache();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    LabelMapperService.prototype.getMappedLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        var _this = this;
        return new Observable(function (observer) {
            if (!_this.settingsSrvc.getSettings().solveLabels) {
                _this.confirmLabel(observer, label);
            }
            else {
                /** @type {?} */
                var url_1 = _this.findUrl(label);
                if (url_1) {
                    if (_this.cache.has(url_1)) {
                        _this.confirmLabel(observer, _this.cache.get(url_1));
                    }
                    else {
                        /** @type {?} */
                        var labelUrl = _this.settingsSrvc.getSettings().proxyUrl ? _this.settingsSrvc.getSettings().proxyUrl + url_1 : url_1;
                        _this.httpClient.get(labelUrl, { responseType: 'text' }).subscribe(function (res) {
                            try {
                                /** @type {?} */
                                var xml = $.parseXML(res);
                                label = label.replace(url_1, $(xml).find('prefLabel').text());
                            }
                            catch (error) {
                                // currently do nothing and use old label
                            }
                            _this.cache.set(url_1, label);
                            _this.confirmLabel(observer, label);
                        }, function (error) {
                            /** @type {?} */
                            var resolvedLabel = label.substring(label.lastIndexOf('/') + 1, label.length);
                            _this.cache.set(url_1, resolvedLabel);
                            _this.confirmLabel(observer, resolvedLabel);
                        });
                    }
                }
                else {
                    _this.confirmLabel(observer, label);
                }
            }
        });
    };
    /**
     * @param {?} observer
     * @param {?} label
     * @return {?}
     */
    LabelMapperService.prototype.confirmLabel = /**
     * @param {?} observer
     * @param {?} label
     * @return {?}
     */
    function (observer, label) {
        observer.next(label);
        observer.complete();
    };
    /**
     * @param {?} label
     * @return {?}
     */
    LabelMapperService.prototype.findUrl = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        /** @type {?} */
        var source = (label || '').toString();
        /** @type {?} */
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?&\/\/=]+)/g;
        /** @type {?} */
        var matchArray = regexToken.exec(source);
        if (matchArray !== null) {
            return matchArray[0];
        }
        return null;
    };
    LabelMapperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LabelMapperService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SettingsService }
    ]; };
    return LabelMapperService;
}());
export { LabelMapperService };
if (false) {
    /** @type {?} */
    LabelMapperService.prototype.cache;
    /** @type {?} */
    LabelMapperService.prototype.httpClient;
    /** @type {?} */
    LabelMapperService.prototype.settingsSrvc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwtbWFwcGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGVsZ29sYW5kL2RlcGljdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9sYWJlbC1tYXBwZXIvbGFiZWwtbWFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQVksZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQVV6Qyw0QkFDYyxVQUFzQixFQUN0QixZQUF1QztRQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtxQkFKcEIsSUFBSSxPQUFPLEVBQUU7S0FLekM7Ozs7O0lBRUUsMkNBQWM7Ozs7Y0FBQyxLQUFhOztRQUMvQixNQUFNLENBQUMsSUFBSSxVQUFVLENBQVMsVUFBQyxRQUEwQjtZQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdEM7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ0osSUFBTSxLQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3BEO29CQUFDLElBQUksQ0FBQyxDQUFDOzt3QkFDSixJQUFNLFFBQVEsR0FDVixLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUM7d0JBQ3BHLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7NEJBQ2xFLElBQUksQ0FBQzs7Z0NBQ0QsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDNUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzs2QkFDL0Q7NEJBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7OzZCQUVoQjs0QkFDRCxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQzNCLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUN0QyxFQUFFLFVBQUMsS0FBSzs7NEJBQ0wsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ2hGLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQzs0QkFDbkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7eUJBQzlDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdEM7YUFDSjtTQUNKLENBQUMsQ0FBQzs7Ozs7OztJQUdDLHlDQUFZOzs7OztjQUFDLFFBQTBCLEVBQUUsS0FBYTtRQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7O0lBR2hCLG9DQUFPOzs7O2NBQUMsS0FBYTs7UUFDekIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBQ3hDLElBQU0sVUFBVSxHQUFHLCtDQUErQyxDQUFDOztRQUNuRSxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Z0JBeERuQixVQUFVOzs7O2dCQVJGLFVBQVU7Z0JBRVMsZUFBZTs7NkJBRjNDOztTQVNhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJZENhY2hlLCBTZXR0aW5ncywgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnQGhlbGdvbGFuZC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGFiZWxNYXBwZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IElkQ2FjaGU8c3RyaW5nPiA9IG5ldyBJZENhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgICAgIHByb3RlY3RlZCBzZXR0aW5nc1NydmM6IFNldHRpbmdzU2VydmljZTxTZXR0aW5ncz5cbiAgICApIHsgfVxuXG4gICAgcHVibGljIGdldE1hcHBlZExhYmVsKGxhYmVsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8c3RyaW5nPigob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5nc1NydmMuZ2V0U2V0dGluZ3MoKS5zb2x2ZUxhYmVscykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZmluZFVybChsYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIHRoaXMuY2FjaGUuZ2V0KHVybCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWxVcmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NTcnZjLmdldFNldHRpbmdzKCkucHJveHlVcmwgPyB0aGlzLnNldHRpbmdzU3J2Yy5nZXRTZXR0aW5ncygpLnByb3h5VXJsICsgdXJsIDogdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmdldChsYWJlbFVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtbCA9ICQucGFyc2VYTUwocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKHVybCwgJCh4bWwpLmZpbmQoJ3ByZWZMYWJlbCcpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudGx5IGRvIG5vdGhpbmcgYW5kIHVzZSBvbGQgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtTGFiZWwob2JzZXJ2ZXIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBsYWJlbC5zdWJzdHJpbmcobGFiZWwubGFzdEluZGV4T2YoJy8nKSArIDEsIGxhYmVsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodXJsLCByZXNvbHZlZExhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1MYWJlbChvYnNlcnZlciwgcmVzb2x2ZWRMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUxhYmVsKG9ic2VydmVyLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpcm1MYWJlbChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPiwgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGxhYmVsKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRVcmwobGFiZWw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAobGFiZWwgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlZ2V4VG9rZW4gPSAvKCgoZnRwfGh0dHBzPyk6XFwvXFwvKVtcXC1cXHdAOiVfXFwrLn4jPyZcXC9cXC89XSspL2c7XG4gICAgICAgIGNvbnN0IG1hdGNoQXJyYXkgPSByZWdleFRva2VuLmV4ZWMoc291cmNlKTtcbiAgICAgICAgaWYgKG1hdGNoQXJyYXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaEFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiJdfQ==