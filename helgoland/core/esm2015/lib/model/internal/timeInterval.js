/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class TimeInterval {
}
export class Timespan extends TimeInterval {
    /**
     * @param {?} from
     * @param {?=} to
     */
    constructor(from, to) {
        super();
        this.from = from;
        if (to) {
            this.to = to;
        }
        else {
            this.to = from;
        }
    }
}
if (false) {
    /** @type {?} */
    Timespan.prototype.from;
    /** @type {?} */
    Timespan.prototype.to;
}
export class BufferedTime extends TimeInterval {
    /**
     * @param {?} timestamp
     * @param {?} bufferInterval
     */
    constructor(timestamp, bufferInterval) {
        super();
        this.timestamp = timestamp;
        this.bufferInterval = bufferInterval;
    }
}
if (false) {
    /** @type {?} */
    BufferedTime.prototype.timestamp;
    /** @type {?} */
    BufferedTime.prototype.bufferInterval;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsTUFBTTtDQUVMO0FBRUQsTUFBTSxlQUFnQixTQUFRLFlBQVk7Ozs7O0lBTXRDLFlBQ0ksSUFBWSxFQUNaLEVBQVc7UUFFWCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNoQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDbEI7S0FDSjtDQUVKOzs7Ozs7O0FBRUQsTUFBTSxtQkFBb0IsU0FBUSxZQUFZOzs7OztJQUkxQyxZQUNJLFNBQWUsRUFDZixjQUFzQjtRQUV0QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0tBQ3hDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgVGltZUludGVydmFsIHtcblxufVxuXG5leHBvcnQgY2xhc3MgVGltZXNwYW4gZXh0ZW5kcyBUaW1lSW50ZXJ2YWwge1xuXG4gICAgcHVibGljIGZyb206IG51bWJlcjtcblxuICAgIHB1YmxpYyB0bzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGZyb206IG51bWJlcixcbiAgICAgICAgdG8/OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgaWYgKHRvKSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gdG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gZnJvbTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQnVmZmVyZWRUaW1lIGV4dGVuZHMgVGltZUludGVydmFsIHtcbiAgICBwdWJsaWMgdGltZXN0YW1wOiBEYXRlO1xuICAgIHB1YmxpYyBidWZmZXJJbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZSxcbiAgICAgICAgYnVmZmVySW50ZXJ2YWw6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5idWZmZXJJbnRlcnZhbCA9IGJ1ZmZlckludGVydmFsO1xuICAgIH1cbn1cbiJdfQ==