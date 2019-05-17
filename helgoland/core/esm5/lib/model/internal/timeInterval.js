/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @abstract
 */
var /**
 * @abstract
 */
TimeInterval = /** @class */ (function () {
    function TimeInterval() {
    }
    return TimeInterval;
}());
/**
 * @abstract
 */
export { TimeInterval };
var Timespan = /** @class */ (function (_super) {
    tslib_1.__extends(Timespan, _super);
    function Timespan(from, to) {
        var _this = _super.call(this) || this;
        _this.from = from;
        if (to) {
            _this.to = to;
        }
        else {
            _this.to = from;
        }
        return _this;
    }
    return Timespan;
}(TimeInterval));
export { Timespan };
if (false) {
    /** @type {?} */
    Timespan.prototype.from;
    /** @type {?} */
    Timespan.prototype.to;
}
var BufferedTime = /** @class */ (function (_super) {
    tslib_1.__extends(BufferedTime, _super);
    function BufferedTime(timestamp, bufferInterval) {
        var _this = _super.call(this) || this;
        _this.timestamp = timestamp;
        _this.bufferInterval = bufferInterval;
        return _this;
    }
    return BufferedTime;
}(TimeInterval));
export { BufferedTime };
if (false) {
    /** @type {?} */
    BufferedTime.prototype.timestamp;
    /** @type {?} */
    BufferedTime.prototype.bufferInterval;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7QUFBQTs7O3VCQUFBO0lBRUMsQ0FBQTs7OztBQUZELHdCQUVDO0FBRUQsSUFBQTtJQUE4QixvQ0FBWTtJQU10QyxrQkFDSSxJQUFZLEVBQ1osRUFBVztRQUZmLFlBSUksaUJBQU8sU0FPVjtRQU5HLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTCxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNoQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDbEI7O0tBQ0o7bUJBckJMO0VBSThCLFlBQVksRUFtQnpDLENBQUE7QUFuQkQsb0JBbUJDOzs7Ozs7O0FBRUQsSUFBQTtJQUFrQyx3Q0FBWTtJQUkxQyxzQkFDSSxTQUFlLEVBQ2YsY0FBc0I7UUFGMUIsWUFJSSxpQkFBTyxTQUdWO1FBRkcsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7O0tBQ3hDO3VCQXBDTDtFQXlCa0MsWUFBWSxFQVk3QyxDQUFBO0FBWkQsd0JBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgVGltZUludGVydmFsIHtcblxufVxuXG5leHBvcnQgY2xhc3MgVGltZXNwYW4gZXh0ZW5kcyBUaW1lSW50ZXJ2YWwge1xuXG4gICAgcHVibGljIGZyb206IG51bWJlcjtcblxuICAgIHB1YmxpYyB0bzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGZyb206IG51bWJlcixcbiAgICAgICAgdG8/OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgaWYgKHRvKSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gdG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gZnJvbTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQnVmZmVyZWRUaW1lIGV4dGVuZHMgVGltZUludGVydmFsIHtcbiAgICBwdWJsaWMgdGltZXN0YW1wOiBEYXRlO1xuICAgIHB1YmxpYyBidWZmZXJJbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZSxcbiAgICAgICAgYnVmZmVySW50ZXJ2YWw6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5idWZmZXJJbnRlcnZhbCA9IGJ1ZmZlckludGVydmFsO1xuICAgIH1cbn1cbiJdfQ==