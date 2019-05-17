/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import moment from 'moment';
import { LocalStorage } from '../local-storage/local-storage.service';
import { BufferedTime, Timespan } from '../model/internal/timeInterval';
export class Time {
    /**
     * @param {?} localStorage
     */
    constructor(localStorage) {
        this.localStorage = localStorage;
    }
    /**
     * @param {?} timespan
     * @param {?} date
     * @return {?}
     */
    centerTimespan(timespan, date) {
        /** @type {?} */
        const halfduration = this.getDuration(timespan).asMilliseconds() / 2;
        /** @type {?} */
        const from = moment(date).subtract(halfduration).unix() * 1000;
        /** @type {?} */
        const to = moment(date).add(halfduration).unix() * 1000;
        return new Timespan(from, to);
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    stepBack(timespan) {
        /** @type {?} */
        const duration = this.getDuration(timespan);
        /** @type {?} */
        const from = moment(timespan.from).subtract(duration).unix() * 1000;
        /** @type {?} */
        const to = moment(timespan.to).subtract(duration).unix() * 1000;
        return new Timespan(from, to);
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    stepForward(timespan) {
        /** @type {?} */
        const duration = this.getDuration(timespan);
        /** @type {?} */
        const from = moment(timespan.from).add(duration).unix() * 1000;
        /** @type {?} */
        const to = moment(timespan.to).add(duration).unix() * 1000;
        return new Timespan(from, to);
    }
    /**
     * @param {?} timeInterval
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    overlaps(timeInterval, from, to) {
        /** @type {?} */
        const timespan = this.createTimespanOfInterval(timeInterval);
        if (timespan.from <= to && timespan.to >= from) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} timeInterval
     * @return {?}
     */
    createTimespanOfInterval(timeInterval) {
        if (timeInterval instanceof Timespan) {
            return timeInterval;
        }
        else if (timeInterval instanceof BufferedTime) {
            /** @type {?} */
            const duration = moment.duration(timeInterval.bufferInterval / 2);
            /** @type {?} */
            const from = moment(timeInterval.timestamp).subtract(duration).unix() * 1000;
            /** @type {?} */
            const to = moment(timeInterval.timestamp).add(duration).unix() * 1000;
            return new Timespan(from, to);
        }
        else {
            console.error('Wrong time interval!');
        }
    }
    /**
     * @param {?} timespan
     * @param {?} factor
     * @return {?}
     */
    getBufferedTimespan(timespan, factor) {
        /** @type {?} */
        const durationMillis = this.getDuration(timespan).asMilliseconds();
        /** @type {?} */
        const from = moment(timespan.from).subtract(durationMillis * factor).unix() * 1000;
        /** @type {?} */
        const to = moment(timespan.to).add(durationMillis * factor).unix() * 1000;
        return new Timespan(from, to);
    }
    /**
     * @param {?} param
     * @param {?} timespan
     * @return {?}
     */
    saveTimespan(param, timespan) {
        this.localStorage.save(param, timespan);
    }
    /**
     * @param {?} param
     * @return {?}
     */
    loadTimespan(param) {
        /** @type {?} */
        const json = this.localStorage.load(param);
        if (json) {
            return plainToClass(Timespan, json);
        }
        return null;
    }
    /**
     * @return {?}
     */
    initTimespan() {
        /** @type {?} */
        const now = new Date();
        /** @type {?} */
        const start = moment(now).startOf('day').unix() * 1000;
        /** @type {?} */
        const end = moment(now).endOf('day').unix() * 1000;
        return new Timespan(start, end);
    }
    /**
     * @param {?} timespan
     * @return {?}
     */
    getDuration(timespan) {
        /** @type {?} */
        const from = moment(timespan.from);
        /** @type {?} */
        const to = moment(timespan.to);
        return moment.duration(to.diff(from));
    }
}
Time.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Time.ctorParameters = () => [
    { type: LocalStorage }
];
if (false) {
    /** @type {?} */
    Time.prototype.localStorage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RpbWUvdGltZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQWdCLFFBQVEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBR3RGLE1BQU07Ozs7SUFFRixZQUNjLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0tBQ25DOzs7Ozs7SUFFRSxjQUFjLENBQUMsUUFBa0IsRUFBRSxJQUFVOztRQUNoRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7UUFDckUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7O1FBQy9ELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7OztJQUczQixRQUFRLENBQUMsUUFBa0I7O1FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBQzVDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxR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QUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICcuLi9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBCdWZmZXJlZFRpbWUsIFRpbWVJbnRlcnZhbCwgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZTogTG9jYWxTdG9yYWdlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBjZW50ZXJUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4sIGRhdGU6IERhdGUpOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGhhbGZkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24odGltZXNwYW4pLmFzTWlsbGlzZWNvbmRzKCkgLyAyO1xuICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KGRhdGUpLnN1YnRyYWN0KGhhbGZkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoZGF0ZSkuYWRkKGhhbGZkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0ZXBCYWNrKHRpbWVzcGFuOiBUaW1lc3Bhbik6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKHRpbWVzcGFuKTtcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5zdWJ0cmFjdChkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgY29uc3QgdG8gPSBtb21lbnQodGltZXNwYW4udG8pLnN1YnRyYWN0KGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RlcEZvcndhcmQodGltZXNwYW46IFRpbWVzcGFuKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24odGltZXNwYW4pO1xuICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KHRpbWVzcGFuLmZyb20pLmFkZChkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgY29uc3QgdG8gPSBtb21lbnQodGltZXNwYW4udG8pLmFkZChkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJsYXBzKHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdGltZXNwYW4gPSB0aGlzLmNyZWF0ZVRpbWVzcGFuT2ZJbnRlcnZhbCh0aW1lSW50ZXJ2YWwpO1xuICAgICAgICBpZiAodGltZXNwYW4uZnJvbSA8PSB0byAmJiB0aW1lc3Bhbi50byA+PSBmcm9tKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZVRpbWVzcGFuT2ZJbnRlcnZhbCh0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbCk6IFRpbWVzcGFuIHtcbiAgICAgICAgaWYgKHRpbWVJbnRlcnZhbCBpbnN0YW5jZW9mIFRpbWVzcGFuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZUludGVydmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbWVJbnRlcnZhbCBpbnN0YW5jZW9mIEJ1ZmZlcmVkVGltZSkge1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBtb21lbnQuZHVyYXRpb24odGltZUludGVydmFsLmJ1ZmZlckludGVydmFsIC8gMik7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KHRpbWVJbnRlcnZhbC50aW1lc3RhbXApLnN1YnRyYWN0KGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQodGltZUludGVydmFsLnRpbWVzdGFtcCkuYWRkKGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXcm9uZyB0aW1lIGludGVydmFsIScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEJ1ZmZlcmVkVGltZXNwYW4odGltZXNwYW46IFRpbWVzcGFuLCBmYWN0b3I6IG51bWJlcik6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb25NaWxsaXMgPSB0aGlzLmdldER1cmF0aW9uKHRpbWVzcGFuKS5hc01pbGxpc2Vjb25kcygpO1xuICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KHRpbWVzcGFuLmZyb20pLnN1YnRyYWN0KGR1cmF0aW9uTWlsbGlzICogZmFjdG9yKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lc3Bhbi50bykuYWRkKGR1cmF0aW9uTWlsbGlzICogZmFjdG9yKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZVRpbWVzcGFuKHBhcmFtOiBzdHJpbmcsIHRpbWVzcGFuOiBUaW1lc3Bhbikge1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5zYXZlKHBhcmFtLCB0aW1lc3Bhbik7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRUaW1lc3BhbihwYXJhbTogc3RyaW5nKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBqc29uID0gdGhpcy5sb2NhbFN0b3JhZ2UubG9hZChwYXJhbSk7XG4gICAgICAgIGlmIChqc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gcGxhaW5Ub0NsYXNzPFRpbWVzcGFuLCBvYmplY3Q+KFRpbWVzcGFuLCBqc29uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFRpbWVzcGFuKCk6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBtb21lbnQobm93KS5zdGFydE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCBlbmQgPSBtb21lbnQobm93KS5lbmRPZignZGF5JykudW5peCgpICogMTAwMDtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3BhbihzdGFydCwgZW5kKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldER1cmF0aW9uKHRpbWVzcGFuOiBUaW1lc3Bhbik6IG1vbWVudC5EdXJhdGlvbiB7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZXNwYW4uZnJvbSk7XG4gICAgICAgIGNvbnN0IHRvID0gbW9tZW50KHRpbWVzcGFuLnRvKTtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5kdXJhdGlvbih0by5kaWZmKGZyb20pKTtcbiAgICB9XG59XG4iXX0=