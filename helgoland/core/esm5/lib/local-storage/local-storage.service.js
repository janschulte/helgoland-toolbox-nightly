/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * LocalStorage save objects with a given key
 *
 * @export
 */
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.localStorageEnabled = false;
        if (typeof (Storage) !== 'undefined') {
            this.localStorageEnabled = true;
        }
    }
    /**
     * Saves the object with the key in the local storage
     *
     * \@memberof LocalStorage
     * @param {?} key
     * @param {?} object
     * @return {?} successfull saving
     */
    LocalStorage.prototype.save = /**
     * Saves the object with the key in the local storage
     *
     * \@memberof LocalStorage
     * @param {?} key
     * @param {?} object
     * @return {?} successfull saving
     */
    function (key, object) {
        if (this.localStorageEnabled) {
            localStorage.setItem(key, JSON.stringify(object));
            return true;
        }
        return false;
    };
    /**
     * loads the object with for the key
     *
     * \@memberof LocalStorage
     * @template T
     * @param {?} key
     * @return {?} the object if exists, else null
     */
    LocalStorage.prototype.load = /**
     * loads the object with for the key
     *
     * \@memberof LocalStorage
     * @template T
     * @param {?} key
     * @return {?} the object if exists, else null
     */
    function (key) {
        if (this.localStorageEnabled) {
            /** @type {?} */
            var result = localStorage.getItem(key);
            if (result) {
                return JSON.parse(result);
            }
            return null;
        }
    };
    /**
     * loads an array of objects for the key
     *
     * \@memberof LocalStorage
     * @template T
     * @param {?} key
     * @return {?} the array of objects if exists, else null
     */
    LocalStorage.prototype.loadArray = /**
     * loads an array of objects for the key
     *
     * \@memberof LocalStorage
     * @template T
     * @param {?} key
     * @return {?} the array of objects if exists, else null
     */
    function (key) {
        if (this.localStorageEnabled) {
            /** @type {?} */
            var result = localStorage.getItem(key);
            if (result) {
                return JSON.parse(result);
            }
            return null;
        }
    };
    /**
     * load a textual string for the given key
     *
     * \@memberof LocalStorage
     * @param {?} key
     * @return {?} the string if exists, else null
     */
    LocalStorage.prototype.loadTextual = /**
     * load a textual string for the given key
     *
     * \@memberof LocalStorage
     * @param {?} key
     * @return {?} the string if exists, else null
     */
    function (key) {
        if (this.localStorageEnabled) {
            /** @type {?} */
            var result = localStorage.getItem(key);
            if (result) {
                return result;
            }
        }
        return null;
    };
    LocalStorage.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LocalStorage.ctorParameters = function () { return []; };
    return LocalStorage;
}());
export { LocalStorage };
if (false) {
    /** @type {?} */
    LocalStorage.prototype.localStorageEnabled;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lBWXZDO21DQUY4QixLQUFLO1FBRy9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDbkM7S0FDSjs7Ozs7Ozs7O0lBVU0sMkJBQUk7Ozs7Ozs7O2NBQUMsR0FBVyxFQUFFLE1BQVc7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7OztJQVVWLDJCQUFJOzs7Ozs7OztjQUFJLEdBQVc7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzs7WUFDM0IsSUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOzs7Ozs7Ozs7O0lBVUUsZ0NBQVM7Ozs7Ozs7O2NBQUksR0FBVztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOztZQUMzQixJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7Ozs7Ozs7OztJQVVFLGtDQUFXOzs7Ozs7O2NBQUMsR0FBVztRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOztZQUMzQixJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUFFO1NBQ2pDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzs7O2dCQXpFbkIsVUFBVTs7Ozt1QkFQWDs7U0FRYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIExvY2FsU3RvcmFnZSBzYXZlIG9iamVjdHMgd2l0aCBhIGdpdmVuIGtleVxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZSB7XG5cbiAgICBwcml2YXRlIGxvY2FsU3RvcmFnZUVuYWJsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAodHlwZW9mIChTdG9yYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgb2JqZWN0IHdpdGggdGhlIGtleSBpbiB0aGUgbG9jYWwgc3RvcmFnZVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyBzdWNjZXNzZnVsbCBzYXZpbmdcbiAgICAgKiBAbWVtYmVyb2YgTG9jYWxTdG9yYWdlXG4gICAgICovXG4gICAgcHVibGljIHNhdmUoa2V5OiBzdHJpbmcsIG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9hZHMgdGhlIG9iamVjdCB3aXRoIGZvciB0aGUga2V5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHJldHVybnMgdGhlIG9iamVjdCBpZiBleGlzdHMsIGVsc2UgbnVsbFxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZDxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWRzIGFuIGFycmF5IG9mIG9iamVjdHMgZm9yIHRoZSBrZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcmV0dXJucyB0aGUgYXJyYXkgb2Ygb2JqZWN0cyBpZiBleGlzdHMsIGVsc2UgbnVsbFxuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZEFycmF5PFQ+KGtleTogc3RyaW5nKTogVFtdIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkIGEgdGV4dHVhbCBzdHJpbmcgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcmV0dXJucyB0aGUgc3RyaW5nIGlmIGV4aXN0cywgZWxzZSBudWxsXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkVGV4dHVhbChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7IHJldHVybiByZXN1bHQ7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbn1cbiJdfQ==