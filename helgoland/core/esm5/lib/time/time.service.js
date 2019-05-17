/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import moment from 'moment';
import { LocalStorage } from '../local-storage/local-storage.service';
import { BufferedTime, Timespan } from '../model/internal/timeInterval';
var Time = /** @class */ (function () {
    function Time(localStorage) {
        this.localStorage = localStorage;
    }
    /**
     * @param {?} timespan
     * @param {?} date
     * @return {?}
     */
    Time.prototype.centerTimespan = /**
     * @param {?} timespan
     * @param {?} date
     * @return {?}
     */
    function (timespan, date) {
        /** @type {?} */
        var halfduration = this.getDuration(timespan).asMilliseconds() / 2;
        /** @type {?} */
        var from = moment(date).subtract(halfduration).unix() * 1000;
        /** @type {?} */
        var to = moment(date).add(halfduration).unix() * 1000;
        return new Timespan(from, to);
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    Time.prototype.stepBack = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        /** @type {?} */
        var duration = this.getDuration(timespan);
        /** @type {?} */
        var from = moment(timespan.from).subtract(duration).unix() * 1000;
        /** @type {?} */
        var to = moment(timespan.to).subtract(duration).unix() * 1000;
        return new Timespan(from, to);
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    Time.prototype.stepForward = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        /** @type {?} */
        var duration = this.getDuration(timespan);
        /** @type {?} */
        var from = moment(timespan.from).add(duration).unix() * 1000;
        /** @type {?} */
        var to = moment(timespan.to).add(duration).unix() * 1000;
        return new Timespan(from, to);
    };
    /**
     * @param {?} timeInterval
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    Time.prototype.overlaps = /**
     * @param {?} timeInterval
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    function (timeInterval, from, to) {
        /** @type {?} */
        var timespan = this.createTimespanOfInterval(timeInterval);
        if (timespan.from <= to && timespan.to >= from) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} timeInterval
     * @return {?}
     */
    Time.prototype.createTimespanOfInterval = /**
     * @param {?} timeInterval
     * @return {?}
     */
    function (timeInterval) {
        if (timeInterval instanceof Timespan) {
            return timeInterval;
        }
        else if (timeInterval instanceof BufferedTime) {
            /** @type {?} */
            var duration = moment.duration(timeInterval.bufferInterval / 2);
            /** @type {?} */
            var from = moment(timeInterval.timestamp).subtract(duration).unix() * 1000;
            /** @type {?} */
            var to = moment(timeInterval.timestamp).add(duration).unix() * 1000;
            return new Timespan(from, to);
        }
        else {
            console.error('Wrong time interval!');
        }
    };
    /**
     * @param {?} timespan
     * @param {?} factor
     * @return {?}
     */
    Time.prototype.getBufferedTimespan = /**
     * @param {?} timespan
     * @param {?} factor
     * @return {?}
     */
    function (timespan, factor) {
        /** @type {?} */
        var durationMillis = this.getDuration(timespan).asMilliseconds();
        /** @type {?} */
        var from = moment(timespan.from).subtract(durationMillis * factor).unix() * 1000;
        /** @type {?} */
        var to = moment(timespan.to).add(durationMillis * factor).unix() * 1000;
        return new Timespan(from, to);
    };
    /**
     * @param {?} param
     * @param {?} timespan
     * @return {?}
     */
    Time.prototype.saveTimespan = /**
     * @param {?} param
     * @param {?} timespan
     * @return {?}
     */
    function (param, timespan) {
        this.localStorage.save(param, timespan);
    };
    /**
     * @param {?} param
     * @return {?}
     */
    Time.prototype.loadTimespan = /**
     * @param {?} param
     * @return {?}
     */
    function (param) {
        /** @type {?} */
        var json = this.localStorage.load(param);
        if (json) {
            return plainToClass(Timespan, json);
        }
        return null;
    };
    /**
     * @return {?}
     */
    Time.prototype.initTimespan = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var now = new Date();
        /** @type {?} */
        var start = moment(now).startOf('day').unix() * 1000;
        /** @type {?} */
        var end = moment(now).endOf('day').unix() * 1000;
        return new Timespan(start, end);
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    Time.prototype.getDuration = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        /** @type {?} */
        var from = moment(timespan.from);
        /** @type {?} */
        var to = moment(timespan.to);
        return moment.duration(to.diff(from));
    };
    Time.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Time.ctorParameters = function () { return [
        { type: LocalStorage }
    ]; };
    return Time;
}());
export { Time };
if (false) {
    /** @type {?} */
    Time.prototype.localStorage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RpbWUvdGltZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQWdCLFFBQVEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztJQUtsRixjQUNjLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0tBQ25DOzs7Ozs7SUFFRSw2QkFBYzs7Ozs7Y0FBQyxRQUFrQixFQUFFLElBQVU7O1FBQ2hELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztRQUNyRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQzs7UUFDL0QsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7O0lBRzNCLHVCQUFROzs7O2NBQUMsUUFBa0I7O1FBQzlCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBQzVDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFR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QyxDQUFDOzs7Z0JBOUU3QyxVQUFVOzs7O2dCQUhGLFlBQVk7O2VBSnJCOztTQVFhLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4uL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1ZmZlcmVkVGltZSwgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIGNlbnRlclRpbWVzcGFuKHRpbWVzcGFuOiBUaW1lc3BhbiwgZGF0ZTogRGF0ZSk6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3QgaGFsZmR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbih0aW1lc3BhbikuYXNNaWxsaXNlY29uZHMoKSAvIDI7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoZGF0ZSkuc3VidHJhY3QoaGFsZmR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudChkYXRlKS5hZGQoaGFsZmR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RlcEJhY2sodGltZXNwYW46IFRpbWVzcGFuKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24odGltZXNwYW4pO1xuICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KHRpbWVzcGFuLmZyb20pLnN1YnRyYWN0KGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lc3Bhbi50bykuc3VidHJhY3QoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGVwRm9yd2FyZCh0aW1lc3BhbjogVGltZXNwYW4pOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbih0aW1lc3Bhbik7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZXNwYW4uZnJvbSkuYWRkKGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lc3Bhbi50bykuYWRkKGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcmxhcHModGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWwsIGZyb206IG51bWJlciwgdG86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB0aW1lc3BhbiA9IHRoaXMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRpbWVJbnRlcnZhbCk7XG4gICAgICAgIGlmICh0aW1lc3Bhbi5mcm9tIDw9IHRvICYmIHRpbWVzcGFuLnRvID49IGZyb20pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsKTogVGltZXNwYW4ge1xuICAgICAgICBpZiAodGltZUludGVydmFsIGluc3RhbmNlb2YgVGltZXNwYW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lSW50ZXJ2YWw7XG4gICAgICAgIH0gZWxzZSBpZiAodGltZUludGVydmFsIGluc3RhbmNlb2YgQnVmZmVyZWRUaW1lKSB7XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IG1vbWVudC5kdXJhdGlvbih0aW1lSW50ZXJ2YWwuYnVmZmVySW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZUludGVydmFsLnRpbWVzdGFtcCkuc3VidHJhY3QoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lSW50ZXJ2YWwudGltZXN0YW1wKS5hZGQoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dyb25nIHRpbWUgaW50ZXJ2YWwhJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4sIGZhY3RvcjogbnVtYmVyKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbk1pbGxpcyA9IHRoaXMuZ2V0RHVyYXRpb24odGltZXNwYW4pLmFzTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZXNwYW4uZnJvbSkuc3VidHJhY3QoZHVyYXRpb25NaWxsaXMgKiBmYWN0b3IpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHRvID0gbW9tZW50KHRpbWVzcGFuLnRvKS5hZGQoZHVyYXRpb25NaWxsaXMgKiBmYWN0b3IpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlVGltZXNwYW4ocGFyYW06IHN0cmluZywgdGltZXNwYW46IFRpbWVzcGFuKSB7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLnNhdmUocGFyYW0sIHRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFRpbWVzcGFuKHBhcmFtOiBzdHJpbmcpOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGpzb24gPSB0aGlzLmxvY2FsU3RvcmFnZS5sb2FkKHBhcmFtKTtcbiAgICAgICAgaWYgKGpzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBwbGFpblRvQ2xhc3M8VGltZXNwYW4sIG9iamVjdD4oVGltZXNwYW4sIGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0VGltZXNwYW4oKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChub3cpLnN0YXJ0T2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IGVuZCA9IG1vbWVudChub3cpLmVuZE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKHN0YXJ0LCBlbmQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RHVyYXRpb24odGltZXNwYW46IFRpbWVzcGFuKTogbW9tZW50LkR1cmF0aW9uIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKTtcbiAgICAgICAgY29uc3QgdG8gPSBtb21lbnQodGltZXNwYW4udG8pO1xuICAgICAgICByZXR1cm4gbW9tZW50LmR1cmF0aW9uKHRvLmRpZmYoZnJvbSkpO1xuICAgIH1cbn1cbiJdfQ==