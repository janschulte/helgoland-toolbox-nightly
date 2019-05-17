import { Injectable, Pipe, NgModule, Inject, InjectionToken, Optional, HostListener, Input, defineInjectable, inject, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import 'rxjs/operator/map';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { __extends } from 'tslib';
import moment from 'moment';
import { plainToClass, deserialize, deserializeArray } from 'class-transformer';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ColorService = /** @class */ (function () {
    function ColorService() {
    }
    /**
     * Creates a random color and return it as a hex string.
     * @return {?}
     */
    ColorService.prototype.getColor = /**
     * Creates a random color and return it as a hex string.
     * @return {?}
     */
    function () {
        return this.getRandomColor();
    };
    /**
     * Converts a hex string and opacity in percent to RGBA color as string.
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    ColorService.prototype.convertHexToRGBA = /**
     * Converts a hex string and opacity in percent to RGBA color as string.
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    function (hex, opacity) {
        hex = hex.replace('#', '');
        /** @type {?} */
        var r = parseInt(hex.substring(0, 2), 16);
        /** @type {?} */
        var g = parseInt(hex.substring(2, 4), 16);
        /** @type {?} */
        var b = parseInt(hex.substring(4, 6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    };
    /**
     * @return {?}
     */
    ColorService.prototype.getRandomColor = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var letters = '0123456789ABCDEF';
        /** @type {?} */
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    ColorService.decorators = [
        { type: Injectable },
    ];
    return ColorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var DatasetApiVersion = {
    V1: 0,
    V2: 1,
};
DatasetApiVersion[DatasetApiVersion.V1] = 'V1';
DatasetApiVersion[DatasetApiVersion.V2] = 'V2';
var DatasetApiMapping = /** @class */ (function () {
    function DatasetApiMapping(http) {
        this.http = http;
        this.cache = new Map();
    }
    /**
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetApiMapping.prototype.getApiVersion = /**
     * @param {?} apiUrl
     * @return {?}
     */
    function (apiUrl) {
        var _this = this;
        return new Observable(function (observer) {
            if (_this.cache.has(apiUrl)) {
                _this.confirmVersion(observer, _this.cache.get(apiUrl));
            }
            else {
                _this.http.get(apiUrl).subscribe(function (result) {
                    /** @type {?} */
                    var version = DatasetApiVersion.V1;
                    result.forEach(function (entry) {
                        if (entry.id === 'platforms') {
                            version = DatasetApiVersion.V2;
                        }
                    });
                    _this.cache.set(apiUrl, version);
                    _this.confirmVersion(observer, version);
                });
            }
        });
    };
    /**
     * @param {?} observer
     * @param {?} version
     * @return {?}
     */
    DatasetApiMapping.prototype.confirmVersion = /**
     * @param {?} observer
     * @param {?} version
     * @return {?}
     */
    function (observer, version) {
        observer.next(version);
        observer.complete();
    };
    DatasetApiMapping.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DatasetApiMapping.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return DatasetApiMapping;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StatusIntervalResolverService = /** @class */ (function () {
    function StatusIntervalResolverService() {
    }
    /**
     * @param {?} value
     * @param {?} statusIntervals
     * @return {?}
     */
    StatusIntervalResolverService.prototype.getMatchingInterval = /**
     * @param {?} value
     * @param {?} statusIntervals
     * @return {?}
     */
    function (value, statusIntervals) {
        if (value && statusIntervals) {
            return statusIntervals.find(function (interval) {
                /** @type {?} */
                var upper = interval.upper ? parseFloat(interval.upper) : Number.MAX_VALUE;
                /** @type {?} */
                var lower = interval.lower ? parseFloat(interval.lower) : Number.MIN_VALUE;
                if (lower <= value && value < upper) {
                    return true;
                }
            });
        }
    };
    StatusIntervalResolverService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StatusIntervalResolverService.ctorParameters = function () { return []; };
    return StatusIntervalResolverService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var INTERNAL_ID_SEPERATOR = '__';
/**
 * Service to generate or resolve internal dataset IDs
 */
var InternalIdHandler = /** @class */ (function () {
    function InternalIdHandler() {
    }
    /**
     * Generates an internal id for the given dataset.
     * @param {?} dataset The dataset for which the internal id will be generated and saved.
     * @return {?}
     */
    InternalIdHandler.prototype.generateInternalId = /**
     * Generates an internal id for the given dataset.
     * @param {?} dataset The dataset for which the internal id will be generated and saved.
     * @return {?}
     */
    function (dataset) {
        dataset.internalId = dataset.url + INTERNAL_ID_SEPERATOR + dataset.id;
    };
    /**
     * Resolves the internal ID to the url and the API specific dataset id.
     * @param {?} internalId The internal id as string
     * @return {?} Construct of url and API id
     */
    InternalIdHandler.prototype.resolveInternalId = /**
     * Resolves the internal ID to the url and the API specific dataset id.
     * @param {?} internalId The internal id as string
     * @return {?} Construct of url and API id
     */
    function (internalId) {
        /** @type {?} */
        var split = internalId.split(INTERNAL_ID_SEPERATOR);
        if (split.length !== 2) {
            console.error('InternalID ' + internalId + ' is not resolvable');
        }
        else {
            return {
                url: split[0],
                id: split[1]
            };
        }
    };
    InternalIdHandler.decorators = [
        { type: Injectable },
    ];
    return InternalIdHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var ID = 'helgoland-notifier';
/** @type {?} */
var TIME_IN_MS = 3000;
var NotifierService = /** @class */ (function () {
    function NotifierService() {
        /** @type {?} */
        var notifierElement = document.getElementById(ID);
        if (!notifierElement) {
            /** @type {?} */
            var node = document.createElement('div');
            node.id = ID;
            node.className = 'hide';
            /** @type {?} */
            var textNode = document.createTextNode('');
            node.appendChild(textNode);
            document.body.appendChild(node);
        }
    }
    /**
     * @param {?} text
     * @return {?}
     */
    NotifierService.prototype.notify = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        clearTimeout(this.notifierTimeout);
        /** @type {?} */
        var notifierElement = document.getElementById(ID);
        notifierElement.innerHTML = text;
        notifierElement.className = notifierElement.className.replace('hide', 'show');
        this.notifierTimeout = setTimeout(function () {
            notifierElement.className = notifierElement.className.replace('show', 'hide');
        }, TIME_IN_MS);
    };
    NotifierService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotifierService.ctorParameters = function () { return []; };
    return NotifierService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DateProxyPipe = /** @class */ (function () {
    function DateProxyPipe(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    DateProxyPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        /** @type {?} */
        var builtinDatePipe = new DatePipe(this.translate.currentLang || 'en');
        try {
            return builtinDatePipe.transform(value, pattern);
        }
        catch (error) {
            console.error(error);
            return new DatePipe('en').transform(value, pattern);
        }
    };
    DateProxyPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'dateI18n',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    DateProxyPipe.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return DateProxyPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
TimeInterval = /** @class */ (function () {
    function TimeInterval() {
    }
    return TimeInterval;
}());
var Timespan = /** @class */ (function (_super) {
    __extends(Timespan, _super);
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
var BufferedTime = /** @class */ (function (_super) {
    __extends(BufferedTime, _super);
    function BufferedTime(timestamp, bufferInterval) {
        var _this = _super.call(this) || this;
        _this.timestamp = timestamp;
        _this.bufferInterval = bufferInterval;
        return _this;
    }
    return BufferedTime;
}(TimeInterval));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
var DefinedTimespan = {
    LASTHOUR: 'last_hour',
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    TODAY_YESTERDAY: 'today_yesterday',
    CURRENT_WEEK: 'current_week',
    LAST_WEEK: 'last_week',
    CURRENT_MONTH: 'current_month',
    LAST_MONTH: 'last_month',
    CURRENT_YEAR: 'current_year',
    LAST_YEAR: 'last_year',
};
var DefinedTimespanService = /** @class */ (function () {
    function DefinedTimespanService() {
        this.intervals = new Map();
        this.intervals.set(DefinedTimespan.LASTHOUR, function () {
            /** @type {?} */
            var from = moment().subtract(1, 'hours').unix() * 1000;
            /** @type {?} */
            var to = moment().unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.TODAY, function () {
            /** @type {?} */
            var from = moment().startOf('day').unix() * 1000;
            /** @type {?} */
            var to = moment().endOf('day').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.YESTERDAY, function () {
            /** @type {?} */
            var from = moment().subtract(1, 'days').startOf('day').unix() * 1000;
            /** @type {?} */
            var to = moment().subtract(1, 'days').endOf('day').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.TODAY_YESTERDAY, function () {
            /** @type {?} */
            var from = moment().subtract(1, 'days').startOf('day').unix() * 1000;
            /** @type {?} */
            var to = moment().endOf('day').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.CURRENT_WEEK, function () {
            /** @type {?} */
            var from = moment().startOf('isoWeek').unix() * 1000;
            /** @type {?} */
            var to = moment().endOf('isoWeek').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.LAST_WEEK, function () {
            /** @type {?} */
            var from = moment().subtract(1, 'weeks').startOf('isoWeek').unix() * 1000;
            /** @type {?} */
            var to = moment().subtract(1, 'weeks').endOf('isoWeek').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.CURRENT_MONTH, function () {
            /** @type {?} */
            var from = moment().startOf('month').unix() * 1000;
            /** @type {?} */
            var to = moment().endOf('month').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.LAST_MONTH, function () {
            /** @type {?} */
            var from = moment().subtract(1, 'months').startOf('month').unix() * 1000;
            /** @type {?} */
            var to = moment().subtract(1, 'months').endOf('month').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.CURRENT_YEAR, function () {
            /** @type {?} */
            var from = moment().startOf('year').unix() * 1000;
            /** @type {?} */
            var to = moment().endOf('year').unix() * 1000;
            return new Timespan(from, to);
        });
        this.intervals.set(DefinedTimespan.LAST_YEAR, function () {
            /** @type {?} */
            var from = moment().subtract(1, 'years').startOf('year').unix() * 1000;
            /** @type {?} */
            var to = moment().subtract(1, 'years').endOf('year').unix() * 1000;
            return new Timespan(from, to);
        });
    }
    /**
     * @param {?} intervalDescriber
     * @return {?}
     */
    DefinedTimespanService.prototype.getInterval = /**
     * @param {?} intervalDescriber
     * @return {?}
     */
    function (intervalDescriber) {
        if (this.intervals.has(intervalDescriber)) {
            return this.intervals.get(intervalDescriber)();
        }
    };
    DefinedTimespanService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DefinedTimespanService.ctorParameters = function () { return []; };
    return DefinedTimespanService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HelgolandCoreModule = /** @class */ (function () {
    function HelgolandCoreModule() {
    }
    HelgolandCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DateProxyPipe
                    ],
                    imports: [
                        HttpClientModule
                    ],
                    exports: [
                        DateProxyPipe
                    ],
                    providers: [
                        ColorService,
                        DatasetApiMapping,
                        DefinedTimespanService,
                        InternalIdHandler,
                        LocalStorage,
                        NotifierService,
                        StatusIntervalResolverService,
                        Time
                    ]
                },] },
    ];
    return HelgolandCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
ApiInterface = /** @class */ (function () {
    function ApiInterface() {
    }
    /**
     * @param {?} apiUrl
     * @param {?} endpoint
     * @param {?=} id
     * @return {?}
     */
    ApiInterface.prototype.createRequestUrl = /**
     * @param {?} apiUrl
     * @param {?} endpoint
     * @param {?=} id
     * @return {?}
     */
    function (apiUrl, endpoint, id) {
        /** @type {?} */
        var requestUrl = apiUrl + endpoint;
        if (id) {
            requestUrl += '/' + id;
        }
        return requestUrl;
    };
    /**
     * @param {?} timespan
     * @return {?}
     */
    ApiInterface.prototype.createRequestTimespan = /**
     * @param {?} timespan
     * @return {?}
     */
    function (timespan) {
        return encodeURI(moment(timespan.from).format() + '/' + moment(timespan.to).format());
    };
    /**
     * @param {?} token
     * @return {?}
     */
    ApiInterface.prototype.createBasicAuthHeader = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var headers = new HttpHeaders();
        if (token) {
            return headers.set('Authorization', token);
        }
        return headers;
    };
    return ApiInterface;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var  
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
DatasetService = /** @class */ (function () {
    function DatasetService() {
        this.datasetIds = [];
        this.datasetOptions = new Map();
    }
    /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    DatasetService.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    function (internalId, options) {
        if (this.datasetIds.indexOf(internalId) < 0) {
            this.datasetIds.push(internalId);
            if (options) {
                this.datasetOptions.set(internalId, options);
            }
            else {
                this.datasetOptions.set(internalId, this.createStyles(internalId));
            }
            this.saveState();
        }
        else if (options instanceof Array) {
            /** @type {?} */
            var temp_1 = (/** @type {?} */ (this.datasetOptions.get(internalId)));
            options.forEach(function (e) { return temp_1.push(e); });
            this.saveState();
        }
    };
    /**
     * @return {?}
     */
    DatasetService.prototype.removeAllDatasets = /**
     * @return {?}
     */
    function () {
        this.datasetIds.length = 0;
        this.datasetOptions.clear();
        this.saveState();
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetService.prototype.removeDataset = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var datasetIdx = this.datasetIds.indexOf(internalId);
        if (datasetIdx > -1) {
            this.datasetIds.splice(datasetIdx, 1);
            this.datasetOptions.delete(internalId);
        }
        this.saveState();
    };
    /**
     * @return {?}
     */
    DatasetService.prototype.hasDatasets = /**
     * @return {?}
     */
    function () {
        return this.datasetIds.length > 0;
    };
    /**
     * @param {?} options
     * @param {?} internalId
     * @return {?}
     */
    DatasetService.prototype.updateDatasetOptions = /**
     * @param {?} options
     * @param {?} internalId
     * @return {?}
     */
    function (options, internalId) {
        this.datasetOptions.set(internalId, options);
        this.saveState();
    };
    return DatasetService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var  
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
RenderingHintsDatasetService = /** @class */ (function (_super) {
    __extends(RenderingHintsDatasetService, _super);
    function RenderingHintsDatasetService(api) {
        var _this = _super.call(this) || this;
        _this.api = api;
        return _this;
    }
    /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.addDataset = /**
     * @param {?} internalId
     * @param {?=} options
     * @return {?}
     */
    function (internalId, options) {
        var _this = this;
        if (options) {
            this.datasetIds.push(internalId);
            this.datasetOptions.set(internalId, options);
        }
        else if (this.datasetIds.indexOf(internalId) < 0) {
            this.api.getSingleTimeseriesByInternalId(internalId).subscribe(function (timeseries) { return _this.addLoadedDataset(timeseries); }, function (error) {
                _this.api.getDatasetByInternalId(internalId).subscribe(function (dataset) { return _this.addLoadedDataset(dataset); });
            });
        }
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.addLoadedDataset = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        this.datasetIds.push(dataset.internalId);
        this.datasetOptions.set(dataset.internalId, this.createOptionsOfRenderingHints(dataset));
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.createOptionsOfRenderingHints = /**
     * @param {?} dataset
     * @return {?}
     */
    function (dataset) {
        /** @type {?} */
        var options = /** @type {?} */ (this.createStyles(dataset.internalId));
        if (dataset.renderingHints) {
            if (dataset.renderingHints.properties && dataset.renderingHints.properties.color) {
                options.color = dataset.renderingHints.properties.color;
            }
            switch (dataset.renderingHints.chartType) {
                case 'line':
                    this.handleLineRenderingHints(/** @type {?} */ (dataset.renderingHints), options);
                    break;
                case 'bar':
                    this.handleBarRenderingHints(/** @type {?} */ (dataset.renderingHints), options);
                    break;
                default:
                    break;
            }
        }
        return /** @type {?} */ (options);
    };
    /**
     * @param {?} lineHints
     * @param {?} options
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.handleLineRenderingHints = /**
     * @param {?} lineHints
     * @param {?} options
     * @return {?}
     */
    function (lineHints, options) {
        if (lineHints.properties.width) {
            options.lineWidth = Math.round(parseFloat(lineHints.properties.width));
        }
    };
    /**
     * @param {?} barHints
     * @param {?} options
     * @return {?}
     */
    RenderingHintsDatasetService.prototype.handleBarRenderingHints = /**
     * @param {?} barHints
     * @param {?} options
     * @return {?}
     */
    function (barHints, options) {
        if (barHints.properties.width) {
            options.lineWidth = Math.round(parseFloat(barHints.properties.width));
        }
    };
    return RenderingHintsDatasetService;
}(DatasetService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var UriParameterCoder = /** @class */ (function () {
    function UriParameterCoder() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    UriParameterCoder.prototype.encodeKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return encodeURIComponent(key);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UriParameterCoder.prototype.encodeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return encodeURIComponent(value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UriParameterCoder.prototype.decodeKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return key;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UriParameterCoder.prototype.decodeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value;
    };
    return UriParameterCoder;
}());
/**
 * @abstract
 */
var  /**
 * @abstract
 */
DatasetApiInterface = /** @class */ (function (_super) {
    __extends(DatasetApiInterface, _super);
    function DatasetApiInterface(httpService, translate) {
        var _this = _super.call(this) || this;
        _this.httpService = httpService;
        _this.translate = translate;
        return _this;
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetApiInterface.prototype.requestApi = /**
     * @template T
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return this.httpService.client(options).get(url, {
            params: this.prepareParams(params),
            headers: this.createBasicAuthHeader(options.basicAuthToken)
        });
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DatasetApiInterface.prototype.prepareParams = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (this.translate && this.translate.currentLang) {
            params["locale"] = this.translate.currentLang;
        }
        /** @type {?} */
        var httpParams = new HttpParams({
            encoder: new UriParameterCoder()
        });
        Object.getOwnPropertyNames(params)
            .forEach(function (key) { return httpParams = httpParams.set(key, params[key]); });
        return httpParams;
    };
    return DatasetApiInterface;
}(ApiInterface));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ParameterConstellation = /** @class */ (function () {
    function ParameterConstellation() {
    }
    return ParameterConstellation;
}());
var FirstLastValue = /** @class */ (function () {
    function FirstLastValue() {
    }
    return FirstLastValue;
}());
var ReferenceValue = /** @class */ (function () {
    function ReferenceValue() {
    }
    return ReferenceValue;
}());
var DatasetParameterConstellation = /** @class */ (function (_super) {
    __extends(DatasetParameterConstellation, _super);
    function DatasetParameterConstellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DatasetParameterConstellation;
}(ParameterConstellation));
var Dataset = /** @class */ (function () {
    function Dataset() {
    }
    return Dataset;
}());
var Timeseries = /** @class */ (function () {
    function Timeseries() {
        this.hasData = false;
    }
    return Timeseries;
}());
var TimeseriesData = /** @class */ (function () {
    function TimeseriesData() {
    }
    return TimeseriesData;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var HTTP_SERVICE_INTERCEPTORS = new InjectionToken('HTTP_SERVICE_INTERCEPTORS');
var HttpService = /** @class */ (function () {
    function HttpService(httpHandler, interceptors) {
        this.httpHandler = httpHandler;
        /** @type {?} */
        var handler = {
            handle: function (req, options) { return httpHandler.handle(req); }
        };
        if (interceptors) {
            handler = interceptors.reduceRight(function (next, interceptor) { return ({
                handle: function (req, options) { return interceptor.intercept(req, options, next); }
            }); }, handler);
        }
        this.handler = handler;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    HttpService.prototype.client = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HttpClient({
            handle: function (req) { return _this.handler.handle(req, options); }
        });
    };
    HttpService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    HttpService.ctorParameters = function () { return [
        { type: HttpHandler },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HTTP_SERVICE_INTERCEPTORS,] }] }
    ]; };
    /** @nocollapse */ HttpService.ngInjectableDef = defineInjectable({ factory: function HttpService_Factory() { return new HttpService(inject(HttpHandler), inject(HTTP_SERVICE_INTERCEPTORS, 8)); }, token: HttpService, providedIn: "root" });
    return HttpService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DatasetImplApiInterface = /** @class */ (function (_super) {
    __extends(DatasetImplApiInterface, _super);
    function DatasetImplApiInterface(httpservice, internalDatasetId, translate) {
        var _this = _super.call(this, httpservice, translate) || this;
        _this.httpservice = httpservice;
        _this.internalDatasetId = internalDatasetId;
        _this.translate = translate;
        return _this;
    }
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getServices = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'services');
        if (params) {
            params.expanded = true;
        }
        else {
            params = { expanded: true };
        }
        return this.requestApi(url, params, options).pipe(map(function (result) {
            result.forEach(function (entry) { return entry.apiUrl = apiUrl; });
            return result;
        }));
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getService = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'services', id);
        return this.requestApi(url, params, options).pipe(map(function (result) {
            result.apiUrl = apiUrl;
            return result;
        }));
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getStations = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'stations');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getStation = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'stations', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTimeseries = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries');
        return new Observable(function (observer) {
            _this.requestApiTexted(url, params, options).subscribe(function (result) {
                /** @type {?} */
                var timeseriesList = deserializeArray(Timeseries, result);
                timeseriesList.forEach(function (entry) {
                    entry.url = apiUrl;
                    _this.internalDatasetId.generateInternalId(entry);
                });
                observer.next(timeseriesList);
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    /**
     * @param {?} apiUrl
     * @param {?} ids
     * @param {?} timespan
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTimeseriesData = /**
     * @param {?} apiUrl
     * @param {?} ids
     * @param {?} timespan
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, ids, timespan, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries/getData');
        return new Observable(function (observer) {
            _this.requestApiTextedPost(url, {
                timespan: _this.createRequestTimespan(timespan),
                timeseries: ids
            }, options).subscribe(function (result) {
                /** @type {?} */
                var timeseriesList = [];
                for (var id in result) {
                    if (id) {
                        timeseriesList.push({
                            id: id,
                            url: apiUrl,
                            data: result[id].values
                        });
                    }
                }
                observer.next(timeseriesList);
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getSingleTimeseries = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    function (id, apiUrl, params) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries', id);
        return this.requestApiTexted(url, params).pipe(map(function (result) {
            /** @type {?} */
            var timeseries = deserialize(Timeseries, result);
            timeseries.url = apiUrl;
            _this.internalDatasetId.generateInternalId(timeseries);
            return timeseries;
        }));
    };
    /**
     * @param {?} internalId
     * @param {?=} params
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getSingleTimeseriesByInternalId = /**
     * @param {?} internalId
     * @param {?=} params
     * @return {?}
     */
    function (internalId, params) {
        /** @type {?} */
        var resolvedId = this.internalDatasetId.resolveInternalId(internalId);
        return this.getSingleTimeseries(resolvedId.id, resolvedId.url, params);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTimeseriesExtras = /**
     * @param {?} id
     * @param {?} apiUrl
     * @return {?}
     */
    function (id, apiUrl) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries', id);
        return this.requestApi(url + '/extras');
    };
    /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getTsData = /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, timespan, params, options) {
        if (params === void 0) { params = {}; }
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'timeseries', id) + '/getData';
        params.timespan = this.createRequestTimespan(timespan);
        return this.requestApi(url, params, options).pipe(map(function (res) {
            if (params.expanded) {
                res = res[id];
            }
            return res;
        }));
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getCategories = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'categories');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getCategory = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @return {?}
     */
    function (id, apiUrl, params) {
        // const url = this.createRequestUrl(apiUrl, 'categories', id);
        throw new Error('Not implemented');
        // return this.requestApi(url, params)
        //     .map(this.extractData);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPhenomena = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'phenomena');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPhenomenon = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'phenomena', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getOfferings = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'offerings');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getOffering = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'offerings', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getFeatures = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'features');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getFeature = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'features', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getProcedures = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'procedures');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getProcedure = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'procedures', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPlatforms = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'platforms');
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getPlatform = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'platforms', id);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getDatasets = /**
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (apiUrl, params, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'datasets');
        return this.requestApi(url, params, options).pipe(map(function (list) { return list.map(function (entry) { return _this.prepareDataset(entry, apiUrl); }); }));
    };
    /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getDataset = /**
     * @param {?} id
     * @param {?} apiUrl
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, params, options) {
        var _this = this;
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'datasets', id);
        return this.requestApi(url, params, options).pipe(map(function (res) { return _this.prepareDataset(res, apiUrl); }));
    };
    /**
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getDatasetByInternalId = /**
     * @param {?} internalId
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (internalId, params, options) {
        /** @type {?} */
        var resolvedId = this.internalDatasetId.resolveInternalId(internalId);
        return this.getDataset(resolvedId.id, resolvedId.url, params, options);
    };
    /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.getData = /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, timespan, params, options) {
        if (params === void 0) { params = {}; }
        /** @type {?} */
        var url = this.createRequestUrl(apiUrl, 'datasets', id) + '/data';
        params.timespan = this.createRequestTimespan(timespan);
        return this.requestApi(url, params, options);
    };
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.requestApiTexted = /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return this.httpservice.client(options).get(url, {
            params: this.prepareParams(params),
            responseType: 'text'
        });
    };
    /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    DatasetImplApiInterface.prototype.requestApiTextedPost = /**
     * @param {?} url
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (url, params, options) {
        if (params === void 0) { params = {}; }
        if (options === void 0) { options = {}; }
        return this.httpservice.client().post(url, params, {
            responseType: 'json'
        });
    };
    /**
     * @param {?} datasetObj
     * @param {?} apiUrl
     * @return {?}
     */
    DatasetImplApiInterface.prototype.prepareDataset = /**
     * @param {?} datasetObj
     * @param {?} apiUrl
     * @return {?}
     */
    function (datasetObj, apiUrl) {
        /** @type {?} */
        var dataset = deserialize(Dataset, JSON.stringify(datasetObj));
        dataset.url = apiUrl;
        this.internalDatasetId.generateInternalId(dataset);
        if (dataset.seriesParameters) {
            dataset.parameters = dataset.seriesParameters;
            delete dataset.seriesParameters;
        }
        return dataset;
    };
    DatasetImplApiInterface.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DatasetImplApiInterface.ctorParameters = function () { return [
        { type: HttpService },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    return DatasetImplApiInterface;
}(DatasetApiInterface));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SplittedDataDatasetApiInterface = /** @class */ (function (_super) {
    __extends(SplittedDataDatasetApiInterface, _super);
    function SplittedDataDatasetApiInterface(httpservice, internalDatasetId, translate) {
        var _this = _super.call(this, httpservice, internalDatasetId, translate) || this;
        _this.httpservice = httpservice;
        _this.internalDatasetId = internalDatasetId;
        _this.translate = translate;
        return _this;
    }
    /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    SplittedDataDatasetApiInterface.prototype.getTsData = /**
     * @template T
     * @param {?} id
     * @param {?} apiUrl
     * @param {?} timespan
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    function (id, apiUrl, timespan, params, options) {
        if (params === void 0) { params = {}; }
        /** @type {?} */
        var maxTimeExtent = moment.duration(1, 'year').asMilliseconds();
        if ((timespan.to - timespan.from) > maxTimeExtent) {
            /** @type {?} */
            var requests = [];
            /** @type {?} */
            var start = moment(timespan.from).startOf('year');
            /** @type {?} */
            var end = moment(timespan.from).endOf('year');
            while (start.isBefore(moment(timespan.to))) {
                /** @type {?} */
                var chunkSpan = new Timespan(start.unix() * 1000, end.unix() * 1000);
                requests.push(_super.prototype.getTsData.call(this, id, apiUrl, chunkSpan, params, options));
                start = end.add(1, 'millisecond');
                end = moment(start).endOf('year');
            }
            return forkJoin(requests).pipe(map(function (entry) {
                return entry.reduce(function (previous, current) {
                    /** @type {?} */
                    var next = {
                        referenceValues: {},
                        values: previous.values.concat(current.values)
                    };
                    for (var key in previous.referenceValues) {
                        if (previous.referenceValues.hasOwnProperty(key)) {
                            next.referenceValues[key] = previous.referenceValues[key].concat(current.referenceValues[key]);
                        }
                    }
                    return next;
                });
            }));
        }
        else {
            return _super.prototype.getTsData.call(this, id, apiUrl, timespan, params, options);
        }
    };
    SplittedDataDatasetApiInterface.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SplittedDataDatasetApiInterface.ctorParameters = function () { return [
        { type: HttpService },
        { type: InternalIdHandler },
        { type: TranslateService }
    ]; };
    return SplittedDataDatasetApiInterface;
}(DatasetImplApiInterface));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
LanguageChangNotifier = /** @class */ (function () {
    function LanguageChangNotifier(translate) {
        var _this = this;
        this.translate = translate;
        this.translate.onLangChange.subscribe(function () { return _this.languageChanged(); });
    }
    return LanguageChangNotifier;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var LocalSelectorComponent = /** @class */ (function () {
    function LocalSelectorComponent(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LocalSelectorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["languageList"]) {
            this.setCurrentLang();
        }
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    LocalSelectorComponent.prototype.setLanguage = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.translate.use(lang.code);
        this.setCurrentLang();
    };
    /**
     * @return {?}
     */
    LocalSelectorComponent.prototype.setCurrentLang = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.currentLang = this.languageList.find(function (e) { return e.code === _this.translate.currentLang; });
    };
    LocalSelectorComponent.propDecorators = {
        languageList: [{ type: Input }]
    };
    return LocalSelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
var  
// unsupported: template constraints.
/**
 * @template T
 */
ReferenceValues = /** @class */ (function () {
    function ReferenceValues() {
    }
    return ReferenceValues;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Station = /** @class */ (function () {
    function Station() {
    }
    return Station;
}());
var TimeseriesCollection = /** @class */ (function () {
    function TimeseriesCollection() {
    }
    return TimeseriesCollection;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
var PlatformTypes = {
    stationary: 'stationary',
    mobile: 'mobile',
    mobileInsitu: 'mobile_insitu',
};
/** @enum {string} */
var ValueTypes = {
    quantity: 'quantity',
    quantityProfile: 'quantity-profile',
};
/** @enum {number} */
var DatasetTypes = {
    measurement: 0,
};
DatasetTypes[DatasetTypes.measurement] = 'measurement';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Filter = /** @class */ (function () {
    function Filter() {
    }
    return Filter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Options for each dataset.
 *
 * @export
 */
var  /**
 * Options for each dataset.
 *
 * @export
 */
DatasetOptions = /** @class */ (function () {
    function DatasetOptions(internalId, color) {
        /**
         * show or hide in the graph
         *
         * \@memberof DatasetOptions
         */
        this.visible = true;
        /**
         * separate y axis of datasets with same unit
         *
         * \@memberof DatasetOptions
         */
        this.separateYAxis = false;
        /**
         * align graph that zero y axis is visible
         *
         * \@memberof DatasetOptions
         */
        this.zeroBasedYAxis = false;
        /**
         * auto zoom when range selection
         *
         * \@memberof DatasetOptions
         */
        this.autoRangeSelection = false;
        /**
         * marker to request dataset data generalized
         *
         * \@memberof DatasetOptions
         */
        this.generalize = false;
        /**
         * list of visible reference values
         *
         * \@memberof DatasetOptions
         */
        this.showReferenceValues = [];
        /**
         * radius of graphpoint
         *
         * \@memberof DatasetOptions
         */
        this.pointRadius = 0;
        /**
         * width of graphline
         *
         * \@memberof DatasetOptions
         */
        this.lineWidth = 1;
        this.internalId = internalId;
        this.color = color;
    }
    return DatasetOptions;
}());
var ReferenceValueOption = /** @class */ (function () {
    function ReferenceValueOption() {
    }
    return ReferenceValueOption;
}());
var TimedDatasetOptions = /** @class */ (function (_super) {
    __extends(TimedDatasetOptions, _super);
    function TimedDatasetOptions(internalId, color, timestamp) {
        var _this = _super.call(this, internalId, color) || this;
        _this.timestamp = timestamp;
        return _this;
    }
    return TimedDatasetOptions;
}(DatasetOptions));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
IdCache = /** @class */ (function () {
    function IdCache() {
        this.cache = new Map();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    IdCache.prototype.has = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.cache.has(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    IdCache.prototype.get = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.cache.get(id);
    };
    /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    IdCache.prototype.set = /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    function (id, value) {
        this.cache.set(id, value);
    };
    return IdCache;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} baseCtors
 * @return {?}
 */
function Mixin(baseCtors) {
    return function (derivedCtor) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HasLoadableContent = /** @class */ (function () {
    function HasLoadableContent() {
    }
    /**
     * @param {?} loading
     * @return {?}
     */
    HasLoadableContent.prototype.isContentLoading = /**
     * @param {?} loading
     * @return {?}
     */
    function (loading) {
        this.onContentLoading.emit(loading);
    };
    return HasLoadableContent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var ResizableComponent = /** @class */ (function () {
    function ResizableComponent() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ResizableComponent.prototype.onWindowResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onResize();
    };
    ResizableComponent.propDecorators = {
        onWindowResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ResizableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var equal = require('deep-equal');
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * Abstract superclass for all components, which will present datasets.
 * @abstract
 * @template T, U
 */
var DatasetPresenterComponent = /** @class */ (function (_super) {
    __extends(DatasetPresenterComponent, _super);
    function DatasetPresenterComponent(iterableDiffers, api, datasetIdResolver, timeSrvc, translateService) {
        var _this = _super.call(this) || this;
        _this.iterableDiffers = iterableDiffers;
        _this.api = api;
        _this.datasetIdResolver = datasetIdResolver;
        _this.timeSrvc = timeSrvc;
        _this.translateService = translateService;
        /**
         * List of presented dataset ids.
         */
        _this.datasetIds = [];
        /**
         * List of presented selected dataset ids.
         */
        _this.selectedDatasetIds = [];
        /**
         * Event with a list of selected datasets.
         */
        _this.onDatasetSelected = new EventEmitter();
        /**
         * Event when the timespan in the presentation is adjusted.
         */
        _this.onTimespanChanged = new EventEmitter();
        /**
         * Event, when there occured a message in the component.
         */
        _this.onMessageThrown = new EventEmitter();
        /**
         * Event flag, while there is data loaded in the component.
         */
        _this.onContentLoading = new EventEmitter();
        _this.datasetIdsDiffer = _this.iterableDiffers.find([]).create();
        _this.selectedDatasetIdsDiffer = _this.iterableDiffers.find([]).create();
        _this.langChangeSubscription = _this.translateService.onLangChange.subscribe(function (langChangeEvent) { return _this.onLanguageChanged(langChangeEvent); });
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    DatasetPresenterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["timeInterval"] && this.timeInterval) {
            this.timespan = this.timeSrvc.createTimespanOfInterval(this.timeInterval);
            this.timeIntervalChanges();
        }
        if (changes["reloadForDatasets"] && this.reloadForDatasets && this.reloadDataForDatasets.length > 0) {
            this.reloadDataForDatasets(this.reloadForDatasets);
        }
    };
    /**
     * @return {?}
     */
    DatasetPresenterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.langChangeSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DatasetPresenterComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var datasetIdsChanges = this.datasetIdsDiffer.diff(this.datasetIds);
        if (datasetIdsChanges) {
            datasetIdsChanges.forEachAddedItem(function (addedItem) {
                _this.addDatasetByInternalId(addedItem.item);
            });
            datasetIdsChanges.forEachRemovedItem(function (removedItem) {
                _this.removeDataset(removedItem.item);
            });
        }
        /** @type {?} */
        var selectedDatasetIdsChanges = this.selectedDatasetIdsDiffer.diff(this.selectedDatasetIds);
        if (selectedDatasetIdsChanges) {
            selectedDatasetIdsChanges.forEachAddedItem(function (addedItem) {
                _this.setSelectedId(addedItem.item);
            });
            selectedDatasetIdsChanges.forEachRemovedItem(function (removedItem) {
                _this.removeSelectedId(removedItem.item);
            });
        }
        if (!equal(this.oldPresenterOptions, this.presenterOptions)) {
            this.oldPresenterOptions = Object.assign({}, this.presenterOptions);
            /** @type {?} */
            var options = Object.assign({}, this.presenterOptions);
            this.presenterOptionsChanged(options);
        }
        if (this.datasetOptions) {
            /** @type {?} */
            var firstChange_1 = this.oldDatasetOptions === undefined;
            if (firstChange_1) {
                this.oldDatasetOptions = new Map();
            }
            this.datasetOptions.forEach(function (value, key) {
                if (!equal(value, _this.oldDatasetOptions.get(key))) {
                    _this.oldDatasetOptions.set(key, Object.assign({}, _this.datasetOptions.get(key)));
                    _this.datasetOptionsChanged(key, value, firstChange_1);
                }
            });
        }
    };
    /**
     * @param {?} internalId
     * @return {?}
     */
    DatasetPresenterComponent.prototype.addDatasetByInternalId = /**
     * @param {?} internalId
     * @return {?}
     */
    function (internalId) {
        /** @type {?} */
        var internalIdObj = this.datasetIdResolver.resolveInternalId(internalId);
        this.addDataset(internalIdObj.id, internalIdObj.url);
    };
    DatasetPresenterComponent.propDecorators = {
        datasetIds: [{ type: Input }],
        selectedDatasetIds: [{ type: Input }],
        timeInterval: [{ type: Input }],
        datasetOptions: [{ type: Input }],
        presenterOptions: [{ type: Input }],
        reloadForDatasets: [{ type: Input }],
        onDatasetSelected: [{ type: Output }],
        onTimespanChanged: [{ type: Output }],
        onMessageThrown: [{ type: Output }],
        onContentLoading: [{ type: Output }]
    };
    return DatasetPresenterComponent;
}(ResizableComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var PresenterMessageType = {
    ERROR: 0,
    INFO: 1,
};
PresenterMessageType[PresenterMessageType.ERROR] = 'ERROR';
PresenterMessageType[PresenterMessageType.INFO] = 'INFO';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var  
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
SettingsService = /** @class */ (function () {
    function SettingsService() {
        // Default empty settings
        this.settings = /** @type {?} */ ({});
    }
    /**
     * @return {?}
     */
    SettingsService.prototype.getSettings = /**
     * @return {?}
     */
    function () {
        return this.settings;
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    SettingsService.prototype.setSettings = /**
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        this.settings = settings;
    };
    return SettingsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This class checks URLs if they are reachable by a simple get request. If they gets anything back, everything is ok, otherwise
 * the corresponding method gives back the URLs which are not reachable.
 */
var StatusCheckService = /** @class */ (function () {
    function StatusCheckService(httpClient) {
        this.httpClient = httpClient;
        this.urls = [];
    }
    /**
     * Checks all internal registered URLs if they are reachable. Gives back every URL, which was not reachable
     * @return {?}
     */
    StatusCheckService.prototype.checkAll = /**
     * Checks all internal registered URLs if they are reachable. Gives back every URL, which was not reachable
     * @return {?}
     */
    function () {
        return this.doCheck(this.urls);
    };
    /**
     * Checks the given URL.
     * @param {?} url
     * @return {?} Observable with the URL if not reachable.
     */
    StatusCheckService.prototype.checkUrl = /**
     * Checks the given URL.
     * @param {?} url
     * @return {?} Observable with the URL if not reachable.
     */
    function (url) {
        return this.doCheckUrl(url);
    };
    /**
     * Checks the given URLs.
     * @param {?} urls
     * @return {?} Observable of all not reachable URLs.
     */
    StatusCheckService.prototype.checkUrls = /**
     * Checks the given URLs.
     * @param {?} urls
     * @return {?} Observable of all not reachable URLs.
     */
    function (urls) {
        return this.doCheck(urls);
    };
    /**
     * Adds the URL to the internal collection.
     * @param {?} url
     * @return {?}
     */
    StatusCheckService.prototype.addUrl = /**
     * Adds the URL to the internal collection.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var index = this.urls.indexOf(url);
        if (index === -1) {
            this.urls.push(url);
        }
    };
    /**
     * Removes the URL of the internal collection.
     * @param {?} url
     * @return {?}
     */
    StatusCheckService.prototype.removeUrl = /**
     * Removes the URL of the internal collection.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var index = this.urls.indexOf(url);
        if (index > -1) {
            this.urls.splice(index, 1);
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    StatusCheckService.prototype.doCheckUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        return new Observable(function (observer) {
            _this.httpClient.get(url).subscribe(function (res) {
                observer.next(null);
                observer.complete();
            }, function (error) {
                observer.next(url);
                observer.complete();
            });
        });
    };
    /**
     * @param {?} urls
     * @return {?}
     */
    StatusCheckService.prototype.doCheck = /**
     * @param {?} urls
     * @return {?}
     */
    function (urls) {
        var _this = this;
        /** @type {?} */
        var requests = [];
        urls.forEach(function (url) { return requests.push(_this.doCheckUrl(url)); });
        return forkJoin(requests).pipe(map(function (checkedUrls) {
            return checkedUrls.filter(function (entry) {
                if (entry) {
                    return entry;
                }
            });
        }));
    };
    StatusCheckService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StatusCheckService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return StatusCheckService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DatasetApiInterface, UriParameterCoder, DatasetApiMapping, DatasetApiVersion, SplittedDataDatasetApiInterface, DatasetImplApiInterface, InternalIdHandler, HTTP_SERVICE_INTERCEPTORS, HttpService, LanguageChangNotifier, LocalSelectorComponent, HelgolandCoreModule, ApiInterface, DatasetService, RenderingHintsDatasetService, ColorService, StatusIntervalResolverService, LocalStorage, ReferenceValues, ParameterConstellation, FirstLastValue, ReferenceValue, DatasetParameterConstellation, Dataset, Timeseries, TimeseriesData, Station, TimeseriesCollection, PlatformTypes, ValueTypes, DatasetTypes, Filter, TimeInterval, Timespan, BufferedTime, DatasetOptions, ReferenceValueOption, TimedDatasetOptions, IdCache, Mixin, HasLoadableContent, NotifierService, DateProxyPipe, DatasetPresenterComponent, PresenterMessageType, SettingsService, StatusCheckService, DefinedTimespan, DefinedTimespanService, Time, ResizableComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWNvcmUuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvY29sb3IvY29sb3Iuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9kYXRhc2V0LWFwaS9hcGktbWFwcGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2RhdGFzZXQtYXBpL2hlbHBlci9zdGF0dXMtaW50ZXJ2YWwtcmVzb2x2ZXIuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9kYXRhc2V0LWFwaS9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbm90aWZpZXIvbm90aWZpZXIuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9waXBlcy9kYXRlcHJveHkvZGF0ZXByb3h5LnBpcGUudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL3RpbWUvZGVmaW5lZC10aW1lc3Bhbi5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL3RpbWUvdGltZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2Fic3RyYWN0LXNlcnZpY2VzL2FwaS1pbnRlcmZhY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvYWJzdHJhY3Qtc2VydmljZXMvZGF0YXNldC5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2Fic3RyYWN0LXNlcnZpY2VzL3JlbmRlcmluZy1oaW50cy1kYXRhc2V0LnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvZGF0YXNldC1hcGkvYXBpLWludGVyZmFjZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2RhdGFzZXQtYXBpL2h0dHAuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9kYXRhc2V0LWFwaS9kYXRhc2V0LWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2RhdGFzZXQtYXBpL3NwbGl0dGVkLWRhdGEtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2xhbmd1YWdlL2xhbmd1YWdlLWNoYW5nZXIudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbGFuZ3VhZ2UvbG9jYWxlLXNlbGVjdG9yLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL21vZGVsL2RhdGFzZXQtYXBpL2RhdGEudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbi50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9lbnVtcy50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9pbnRlcm5hbC9maWx0ZXIudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbW9kZWwvaW50ZXJuYWwvb3B0aW9ucy50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9pbnRlcm5hbC9pZC1jYWNoZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9taXhpbnMvTWl4aW4uZGVjb3JhdG9yLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL21vZGVsL21peGlucy9oYXMtbG9hZGFibGUtY29udGVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9pbnRlcm5hbC9SZXNpemFibGVDb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvcHJlc2VudGluZy9kYXRhc2V0LXByZXNlbnRlci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvcHJlc2VudGluZy9wcmVzZW50ZXItbWVzc2FnZS10eXBlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL3NldHRpbmdzL3NldHRpbmdzLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvc3RhdHVzLWNoZWNrL3N0YXR1cy1jaGVjay5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbG9yU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmFuZG9tIGNvbG9yIGFuZCByZXR1cm4gaXQgYXMgYSBoZXggc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyBhbmQgb3BhY2l0eSBpbiBwZXJjZW50IHRvIFJHQkEgY29sb3IgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb252ZXJ0SGV4VG9SR0JBKGhleDogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBoZXggPSBoZXgucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICAgICAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcbiAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBvcGFjaXR5IC8gMTAwICsgJyknO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZG9tQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcbiAgICAgICAgbGV0IGNvbG9yID0gJyMnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZW51bSBEYXRhc2V0QXBpVmVyc2lvbiB7XG4gICAgVjEsXG4gICAgVjJcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFzZXRBcGlNYXBwaW5nIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIERhdGFzZXRBcGlWZXJzaW9uPiA9IG5ldyBNYXA8c3RyaW5nLCBEYXRhc2V0QXBpVmVyc2lvbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZ2V0QXBpVmVyc2lvbihhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8RGF0YXNldEFwaVZlcnNpb24+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPERhdGFzZXRBcGlWZXJzaW9uPigob2JzZXJ2ZXI6IE9ic2VydmVyPERhdGFzZXRBcGlWZXJzaW9uPikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKGFwaVVybCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB0aGlzLmNhY2hlLmdldChhcGlVcmwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldDxhbnlbXT4oYXBpVXJsKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbiA9IERhdGFzZXRBcGlWZXJzaW9uLlYxO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pZCA9PT0gJ3BsYXRmb3JtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gRGF0YXNldEFwaVZlcnNpb24uVjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldChhcGlVcmwsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maXJtVmVyc2lvbihvYnNlcnZlcjogT2JzZXJ2ZXI8RGF0YXNldEFwaVZlcnNpb24+LCB2ZXJzaW9uOiBEYXRhc2V0QXBpVmVyc2lvbikge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHZlcnNpb24pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdGF0dXNJbnRlcnZhbCB9IGZyb20gJy4uLy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIGdldE1hdGNoaW5nSW50ZXJ2YWwodmFsdWU6IG51bWJlciwgc3RhdHVzSW50ZXJ2YWxzOiBTdGF0dXNJbnRlcnZhbFtdKTogU3RhdHVzSW50ZXJ2YWwge1xuICAgIGlmICh2YWx1ZSAmJiBzdGF0dXNJbnRlcnZhbHMpIHtcbiAgICAgIHJldHVybiBzdGF0dXNJbnRlcnZhbHMuZmluZCgoaW50ZXJ2YWwpID0+IHtcbiAgICAgICAgY29uc3QgdXBwZXIgPSBpbnRlcnZhbC51cHBlciA/IHBhcnNlRmxvYXQoaW50ZXJ2YWwudXBwZXIpIDogTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgY29uc3QgbG93ZXIgPSBpbnRlcnZhbC5sb3dlciA/IHBhcnNlRmxvYXQoaW50ZXJ2YWwubG93ZXIpIDogTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgaWYgKGxvd2VyIDw9IHZhbHVlICYmIHZhbHVlIDwgdXBwZXIpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgJ3J4anMvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJRGF0YXNldCB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuXG5jb25zdCBJTlRFUk5BTF9JRF9TRVBFUkFUT1IgPSAnX18nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsRGF0YXNldElkIHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU2VydmljZSB0byBnZW5lcmF0ZSBvciByZXNvbHZlIGludGVybmFsIGRhdGFzZXQgSURzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnRlcm5hbElkSGFuZGxlciB7XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhbiBpbnRlcm5hbCBpZCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQuXG4gICAqIEBwYXJhbSBkYXRhc2V0IFRoZSBkYXRhc2V0IGZvciB3aGljaCB0aGUgaW50ZXJuYWwgaWQgd2lsbCBiZSBnZW5lcmF0ZWQgYW5kIHNhdmVkLlxuICAgKi9cbiAgcHVibGljIGdlbmVyYXRlSW50ZXJuYWxJZChkYXRhc2V0OiBJRGF0YXNldCkge1xuICAgIGRhdGFzZXQuaW50ZXJuYWxJZCA9IGRhdGFzZXQudXJsICsgSU5URVJOQUxfSURfU0VQRVJBVE9SICsgZGF0YXNldC5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgaW50ZXJuYWwgSUQgdG8gdGhlIHVybCBhbmQgdGhlIEFQSSBzcGVjaWZpYyBkYXRhc2V0IGlkLlxuICAgKiBAcGFyYW0gaW50ZXJuYWxJZCBUaGUgaW50ZXJuYWwgaWQgYXMgc3RyaW5nXG4gICAqIEByZXR1cm5zIENvbnN0cnVjdCBvZiB1cmwgYW5kIEFQSSBpZFxuICAgKi9cbiAgcHVibGljIHJlc29sdmVJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZyk6IEludGVybmFsRGF0YXNldElkIHtcbiAgICBjb25zdCBzcGxpdCA9IGludGVybmFsSWQuc3BsaXQoSU5URVJOQUxfSURfU0VQRVJBVE9SKTtcbiAgICBpZiAoc3BsaXQubGVuZ3RoICE9PSAyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdJbnRlcm5hbElEICcgKyBpbnRlcm5hbElkICsgJyBpcyBub3QgcmVzb2x2YWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHNwbGl0WzBdLFxuICAgICAgICBpZDogc3BsaXRbMV1cbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTG9jYWxTdG9yYWdlIHNhdmUgb2JqZWN0cyB3aXRoIGEgZ2l2ZW4ga2V5XG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlIHtcblxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKFN0b3JhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBvYmplY3Qgd2l0aCB0aGUga2V5IGluIHRoZSBsb2NhbCBzdG9yYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHN1Y2Nlc3NmdWxsIHNhdmluZ1xuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc2F2ZShrZXk6IHN0cmluZywgb2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkcyB0aGUgb2JqZWN0IHdpdGggZm9yIHRoZSBrZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcmV0dXJucyB0aGUgb2JqZWN0IGlmIGV4aXN0cywgZWxzZSBudWxsXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkPFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9hZHMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBmb3IgdGhlIGtleVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEByZXR1cm5zIHRoZSBhcnJheSBvZiBvYmplY3RzIGlmIGV4aXN0cywgZWxzZSBudWxsXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkQXJyYXk8VD4oa2V5OiBzdHJpbmcpOiBUW10ge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgYSB0ZXh0dWFsIHN0cmluZyBmb3IgdGhlIGdpdmVuIGtleVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEByZXR1cm5zIHRoZSBzdHJpbmcgaWYgZXhpc3RzLCBlbHNlIG51bGxcbiAgICAgKiBAbWVtYmVyb2YgTG9jYWxTdG9yYWdlXG4gICAgICovXG4gICAgcHVibGljIGxvYWRUZXh0dWFsKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHsgcmV0dXJuIHJlc3VsdDsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBJRCA9ICdoZWxnb2xhbmQtbm90aWZpZXInO1xuY29uc3QgVElNRV9JTl9NUyA9IDMwMDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgbm90aWZpZXJUaW1lb3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgbm90aWZpZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoSUQpO1xuICAgIGlmICghbm90aWZpZXJFbGVtZW50KSB7XG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBub2RlLmlkID0gSUQ7XG4gICAgICBub2RlLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBub3RpZnkodGV4dDogc3RyaW5nKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZpZXJUaW1lb3V0KTtcbiAgICBjb25zdCBub3RpZmllckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChJRCk7XG4gICAgbm90aWZpZXJFbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgbm90aWZpZXJFbGVtZW50LmNsYXNzTmFtZSA9IG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnaGlkZScsICdzaG93Jyk7XG4gICAgdGhpcy5ub3RpZmllclRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUgPSBub3RpZmllckVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ3Nob3cnLCAnaGlkZScpO1xuICAgIH0sIFRJTUVfSU5fTVMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGF0ZUkxOG4nLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQcm94eVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IGFueSwgcGF0dGVybjogc3RyaW5nID0gJ21lZGl1bURhdGUnKTogYW55IHtcbiAgICAgICAgLy8gc2ltcGx5IGZvcndhcmQgdG8gYnVpbHQtaW4gcGlwZSwgYnV0IHRha2UgaW50byBhY2NvdW50IHRoZSBjdXJyZW50IGxhbmd1YWdlXG4gICAgICAgIGNvbnN0IGJ1aWx0aW5EYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyB8fCAnZW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBidWlsdGluRGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBwYXR0ZXJuKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGlwZSgnZW4nKS50cmFuc2Zvcm0odmFsdWUsIHBhdHRlcm4pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgVGltZUludGVydmFsIHtcblxufVxuXG5leHBvcnQgY2xhc3MgVGltZXNwYW4gZXh0ZW5kcyBUaW1lSW50ZXJ2YWwge1xuXG4gICAgcHVibGljIGZyb206IG51bWJlcjtcblxuICAgIHB1YmxpYyB0bzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGZyb206IG51bWJlcixcbiAgICAgICAgdG8/OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgaWYgKHRvKSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gdG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gZnJvbTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQnVmZmVyZWRUaW1lIGV4dGVuZHMgVGltZUludGVydmFsIHtcbiAgICBwdWJsaWMgdGltZXN0YW1wOiBEYXRlO1xuICAgIHB1YmxpYyBidWZmZXJJbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZSxcbiAgICAgICAgYnVmZmVySW50ZXJ2YWw6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5idWZmZXJJbnRlcnZhbCA9IGJ1ZmZlckludGVydmFsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuXG5leHBvcnQgZW51bSBEZWZpbmVkVGltZXNwYW4ge1xuICAgIExBU1RIT1VSID0gJ2xhc3RfaG91cicsXG4gICAgVE9EQVkgPSAndG9kYXknLFxuICAgIFlFU1RFUkRBWSA9ICd5ZXN0ZXJkYXknLFxuICAgIFRPREFZX1lFU1RFUkRBWSA9ICd0b2RheV95ZXN0ZXJkYXknLFxuICAgIENVUlJFTlRfV0VFSyA9ICdjdXJyZW50X3dlZWsnLFxuICAgIExBU1RfV0VFSyA9ICdsYXN0X3dlZWsnLFxuICAgIENVUlJFTlRfTU9OVEggPSAnY3VycmVudF9tb250aCcsXG4gICAgTEFTVF9NT05USCA9ICdsYXN0X21vbnRoJyxcbiAgICBDVVJSRU5UX1lFQVIgPSAnY3VycmVudF95ZWFyJyxcbiAgICBMQVNUX1lFQVIgPSAnbGFzdF95ZWFyJ1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVmaW5lZFRpbWVzcGFuU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGludGVydmFsczogTWFwPERlZmluZWRUaW1lc3BhbiwgKCkgPT4gVGltZXNwYW4+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uTEFTVEhPVVIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnaG91cnMnKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVydmFscy5zZXQoRGVmaW5lZFRpbWVzcGFuLlRPREFZLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3RhcnRPZignZGF5JykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuZW5kT2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uWUVTVEVSREFZLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLmVuZE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVydmFscy5zZXQoRGVmaW5lZFRpbWVzcGFuLlRPREFZX1lFU1RFUkRBWSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuZW5kT2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uQ1VSUkVOVF9XRUVLLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3RhcnRPZignaXNvV2VlaycpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLmVuZE9mKCdpc29XZWVrJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMuc2V0KERlZmluZWRUaW1lc3Bhbi5MQVNUX1dFRUssICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2Vla3MnKS5zdGFydE9mKCdpc29XZWVrJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWtzJykuZW5kT2YoJ2lzb1dlZWsnKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVydmFscy5zZXQoRGVmaW5lZFRpbWVzcGFuLkNVUlJFTlRfTU9OVEgsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdGFydE9mKCdtb250aCcpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLmVuZE9mKCdtb250aCcpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uTEFTVF9NT05USCwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aHMnKS5zdGFydE9mKCdtb250aCcpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aHMnKS5lbmRPZignbW9udGgnKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVydmFscy5zZXQoRGVmaW5lZFRpbWVzcGFuLkNVUlJFTlRfWUVBUiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCgpLnN0YXJ0T2YoJ3llYXInKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoKS5lbmRPZigneWVhcicpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uTEFTVF9ZRUFSLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ3llYXJzJykuc3RhcnRPZigneWVhcicpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICd5ZWFycycpLmVuZE9mKCd5ZWFyJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW50ZXJ2YWwoaW50ZXJ2YWxEZXNjcmliZXI6IERlZmluZWRUaW1lc3Bhbik6IFRpbWVzcGFuIHtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWxzLmhhcyhpbnRlcnZhbERlc2NyaWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmludGVydmFscy5nZXQoaW50ZXJ2YWxEZXNjcmliZXIpKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4uL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1ZmZlcmVkVGltZSwgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIGNlbnRlclRpbWVzcGFuKHRpbWVzcGFuOiBUaW1lc3BhbiwgZGF0ZTogRGF0ZSk6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3QgaGFsZmR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbih0aW1lc3BhbikuYXNNaWxsaXNlY29uZHMoKSAvIDI7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoZGF0ZSkuc3VidHJhY3QoaGFsZmR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudChkYXRlKS5hZGQoaGFsZmR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RlcEJhY2sodGltZXNwYW46IFRpbWVzcGFuKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24odGltZXNwYW4pO1xuICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KHRpbWVzcGFuLmZyb20pLnN1YnRyYWN0KGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lc3Bhbi50bykuc3VidHJhY3QoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGVwRm9yd2FyZCh0aW1lc3BhbjogVGltZXNwYW4pOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbih0aW1lc3Bhbik7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZXNwYW4uZnJvbSkuYWRkKGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lc3Bhbi50bykuYWRkKGR1cmF0aW9uKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcmxhcHModGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWwsIGZyb206IG51bWJlciwgdG86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB0aW1lc3BhbiA9IHRoaXMuY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRpbWVJbnRlcnZhbCk7XG4gICAgICAgIGlmICh0aW1lc3Bhbi5mcm9tIDw9IHRvICYmIHRpbWVzcGFuLnRvID49IGZyb20pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVGltZXNwYW5PZkludGVydmFsKHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsKTogVGltZXNwYW4ge1xuICAgICAgICBpZiAodGltZUludGVydmFsIGluc3RhbmNlb2YgVGltZXNwYW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lSW50ZXJ2YWw7XG4gICAgICAgIH0gZWxzZSBpZiAodGltZUludGVydmFsIGluc3RhbmNlb2YgQnVmZmVyZWRUaW1lKSB7XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IG1vbWVudC5kdXJhdGlvbih0aW1lSW50ZXJ2YWwuYnVmZmVySW50ZXJ2YWwgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZUludGVydmFsLnRpbWVzdGFtcCkuc3VidHJhY3QoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lSW50ZXJ2YWwudGltZXN0YW1wKS5hZGQoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dyb25nIHRpbWUgaW50ZXJ2YWwhJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnVmZmVyZWRUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4sIGZhY3RvcjogbnVtYmVyKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbk1pbGxpcyA9IHRoaXMuZ2V0RHVyYXRpb24odGltZXNwYW4pLmFzTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZXNwYW4uZnJvbSkuc3VidHJhY3QoZHVyYXRpb25NaWxsaXMgKiBmYWN0b3IpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHRvID0gbW9tZW50KHRpbWVzcGFuLnRvKS5hZGQoZHVyYXRpb25NaWxsaXMgKiBmYWN0b3IpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlVGltZXNwYW4ocGFyYW06IHN0cmluZywgdGltZXNwYW46IFRpbWVzcGFuKSB7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLnNhdmUocGFyYW0sIHRpbWVzcGFuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFRpbWVzcGFuKHBhcmFtOiBzdHJpbmcpOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGpzb24gPSB0aGlzLmxvY2FsU3RvcmFnZS5sb2FkKHBhcmFtKTtcbiAgICAgICAgaWYgKGpzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBwbGFpblRvQ2xhc3M8VGltZXNwYW4sIG9iamVjdD4oVGltZXNwYW4sIGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0VGltZXNwYW4oKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChub3cpLnN0YXJ0T2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IGVuZCA9IG1vbWVudChub3cpLmVuZE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKHN0YXJ0LCBlbmQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RHVyYXRpb24odGltZXNwYW46IFRpbWVzcGFuKTogbW9tZW50LkR1cmF0aW9uIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKTtcbiAgICAgICAgY29uc3QgdG8gPSBtb21lbnQodGltZXNwYW4udG8pO1xuICAgICAgICByZXR1cm4gbW9tZW50LmR1cmF0aW9uKHRvLmRpZmYoZnJvbSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb2xvclNlcnZpY2UgfSBmcm9tICcuL2NvbG9yL2NvbG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXNldEFwaU1hcHBpbmcgfSBmcm9tICcuL2RhdGFzZXQtYXBpL2FwaS1tYXBwaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2UgfSBmcm9tICcuL2RhdGFzZXQtYXBpL2hlbHBlci9zdGF0dXMtaW50ZXJ2YWwtcmVzb2x2ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJy4vZGF0YXNldC1hcGkvaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpZXJTZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmllci9ub3RpZmllci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVQcm94eVBpcGUgfSBmcm9tICcuL3BpcGVzL2RhdGVwcm94eS9kYXRlcHJveHkucGlwZSc7XG5pbXBvcnQgeyBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlIH0gZnJvbSAnLi90aW1lL2RlZmluZWQtdGltZXNwYW4uc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSAnLi90aW1lL3RpbWUuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERhdGVQcm94eVBpcGVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERhdGVQcm94eVBpcGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29sb3JTZXJ2aWNlLFxuICAgIERhdGFzZXRBcGlNYXBwaW5nLFxuICAgIERlZmluZWRUaW1lc3BhblNlcnZpY2UsXG4gICAgSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgTG9jYWxTdG9yYWdlLFxuICAgIE5vdGlmaWVyU2VydmljZSxcbiAgICBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZSxcbiAgICBUaW1lXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSGVsZ29sYW5kQ29yZU1vZHVsZSB7IH1cbiIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcGlJbnRlcmZhY2Uge1xuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsOiBzdHJpbmcsIGVuZHBvaW50OiBzdHJpbmcsIGlkPzogc3RyaW5nKSB7XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgd2hldGhlciBhcGlVcmwgZW5kcyB3aXRoIHNsYXNoXG4gICAgICAgIGxldCByZXF1ZXN0VXJsID0gYXBpVXJsICsgZW5kcG9pbnQ7XG4gICAgICAgIGlmIChpZCkgeyByZXF1ZXN0VXJsICs9ICcvJyArIGlkOyB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0VXJsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW46IFRpbWVzcGFuKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSShtb21lbnQodGltZXNwYW4uZnJvbSkuZm9ybWF0KCkgKyAnLycgKyBtb21lbnQodGltZXNwYW4udG8pLmZvcm1hdCgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlQmFzaWNBdXRoSGVhZGVyKHRva2VuOiBzdHJpbmcpOiBIdHRwSGVhZGVycyB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgaWYgKHRva2VuKSB7IHJldHVybiBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIHRva2VuKTsgfVxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IERhdGFzZXRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvb3B0aW9ucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhc2V0U2VydmljZTxUIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMgfCBEYXRhc2V0T3B0aW9uc1tdPiB7XG5cbiAgICBwdWJsaWMgZGF0YXNldElkczogc3RyaW5nW10gPSBbXTtcblxuICAgIHB1YmxpYyBkYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgVD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgYWRkRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM/OiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5wdXNoKGludGVybmFsSWQpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgdGhpcy5jcmVhdGVTdHlsZXMoaW50ZXJuYWxJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSAodGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoaW50ZXJuYWxJZCkgYXMgRGF0YXNldE9wdGlvbnNbXSk7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKGUpID0+IHRlbXAucHVzaChlKSk7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFsbERhdGFzZXRzKCkge1xuICAgICAgICB0aGlzLmRhdGFzZXRJZHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5jbGVhcigpO1xuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVEYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRhc2V0SWR4ID0gdGhpcy5kYXRhc2V0SWRzLmluZGV4T2YoaW50ZXJuYWxJZCk7XG4gICAgICAgIGlmIChkYXRhc2V0SWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldElkcy5zcGxpY2UoZGF0YXNldElkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmRlbGV0ZShpbnRlcm5hbElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNEYXRhc2V0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldElkcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVEYXRhc2V0T3B0aW9ucyhvcHRpb25zOiBULCBpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoaW50ZXJuYWxJZCwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVN0eWxlcyhpbnRlcm5hbElkOiBzdHJpbmcpOiBUO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNhdmVTdGF0ZSgpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGxvYWRTdGF0ZSgpOiB2b2lkO1xuXG59XG4iLCJpbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlIH0gZnJvbSAnLi4vZGF0YXNldC1hcGkvYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgeyBCYXJSZW5kZXJpbmdIaW50cywgSURhdGFzZXQsIExpbmVSZW5kZXJpbmdIaW50cyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zJztcbmltcG9ydCB7IERhdGFzZXRTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhc2V0LnNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyaW5nSGludHNEYXRhc2V0U2VydmljZTxUIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMgfCBEYXRhc2V0T3B0aW9uc1tdPiBleHRlbmRzIERhdGFzZXRTZXJ2aWNlPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZERhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nLCBvcHRpb25zPzogVCkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnB1c2goaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoaW50ZXJuYWxJZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICh0aW1lc2VyaWVzKSA9PiB0aGlzLmFkZExvYWRlZERhdGFzZXQodGltZXNlcmllcyksXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpLmdldERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGFzZXQpID0+IHRoaXMuYWRkTG9hZGVkRGF0YXNldChkYXRhc2V0KSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRMb2FkZWREYXRhc2V0KGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgICAgIHRoaXMuZGF0YXNldElkcy5wdXNoKGRhdGFzZXQuaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2V0KGRhdGFzZXQuaW50ZXJuYWxJZCwgdGhpcy5jcmVhdGVPcHRpb25zT2ZSZW5kZXJpbmdIaW50cyhkYXRhc2V0KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVPcHRpb25zT2ZSZW5kZXJpbmdIaW50cyhkYXRhc2V0OiBJRGF0YXNldCk6IFQge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jcmVhdGVTdHlsZXMoZGF0YXNldC5pbnRlcm5hbElkKSBhcyBEYXRhc2V0T3B0aW9ucztcbiAgICAgICAgaWYgKGRhdGFzZXQucmVuZGVyaW5nSGludHMpIHtcbiAgICAgICAgICAgIGlmIChkYXRhc2V0LnJlbmRlcmluZ0hpbnRzLnByb3BlcnRpZXMgJiYgZGF0YXNldC5yZW5kZXJpbmdIaW50cy5wcm9wZXJ0aWVzLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb2xvciA9IGRhdGFzZXQucmVuZGVyaW5nSGludHMucHJvcGVydGllcy5jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YXNldC5yZW5kZXJpbmdIaW50cy5jaGFydFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVMaW5lUmVuZGVyaW5nSGludHMoZGF0YXNldC5yZW5kZXJpbmdIaW50cyBhcyBMaW5lUmVuZGVyaW5nSGludHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJhclJlbmRlcmluZ0hpbnRzKGRhdGFzZXQucmVuZGVyaW5nSGludHMgYXMgQmFyUmVuZGVyaW5nSGludHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucyBhcyBUO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBoYW5kbGVMaW5lUmVuZGVyaW5nSGludHMobGluZUhpbnRzOiBMaW5lUmVuZGVyaW5nSGludHMsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIGlmIChsaW5lSGludHMucHJvcGVydGllcy53aWR0aCkge1xuICAgICAgICAgICAgb3B0aW9ucy5saW5lV2lkdGggPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQobGluZUhpbnRzLnByb3BlcnRpZXMud2lkdGgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQmFyUmVuZGVyaW5nSGludHMoYmFySGludHM6IEJhclJlbmRlcmluZ0hpbnRzLCBvcHRpb25zOiBEYXRhc2V0T3B0aW9ucykge1xuICAgICAgICBpZiAoYmFySGludHMucHJvcGVydGllcy53aWR0aCkge1xuICAgICAgICAgICAgb3B0aW9ucy5saW5lV2lkdGggPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoYmFySGludHMucHJvcGVydGllcy53aWR0aCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cFBhcmFtZXRlckNvZGVjLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlJbnRlcmZhY2UgfSBmcm9tICcuLi9hYnN0cmFjdC1zZXJ2aWNlcy9hcGktaW50ZXJmYWNlJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvY2F0ZWdvcnknO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGEnO1xuaW1wb3J0IHsgRGF0YXNldCwgVGltZXNlcmllcywgVGltZXNlcmllc0RhdGEsIFRpbWVzZXJpZXNFeHRyYXMgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0JztcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9mZWF0dXJlJztcbmltcG9ydCB7IE9mZmVyaW5nIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvb2ZmZXJpbmcnO1xuaW1wb3J0IHsgUGhlbm9tZW5vbiB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3BoZW5vbWVub24nO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBQcm9jZWR1cmUgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9wcm9jZWR1cmUnO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3NlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGlvbiB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3N0YXRpb24nO1xuaW1wb3J0IHsgRGF0YVBhcmFtZXRlckZpbHRlciwgSHR0cFJlcXVlc3RPcHRpb25zLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9odHRwLXJlcXVlc3RzJztcbmltcG9ydCB7IFRpbWVzcGFuIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXNldEFwaVYyIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2FwaS12Mi5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgVXJpUGFyYW1ldGVyQ29kZXIgaW1wbGVtZW50cyBIdHRwUGFyYW1ldGVyQ29kZWMge1xuXG4gICAgcHVibGljIGVuY29kZUtleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5jb2RlVmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWNvZGVLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWNvZGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFzZXRBcGlJbnRlcmZhY2UgZXh0ZW5kcyBBcGlJbnRlcmZhY2UgaW1wbGVtZW50cyBEYXRhc2V0QXBpVjIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBodHRwU2VydmljZTogSHR0cFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHsgc3VwZXIoKTsgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IGdldFBsYXRmb3JtcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQbGF0Zm9ybVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UGxhdGZvcm0oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGxhdGZvcm0+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXREYXRhc2V0cyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhc2V0W10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXREYXRhc2V0KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXQ+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXREYXRhc2V0QnlJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhc2V0PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0RGF0YTxUPihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgdGltZXNwYW46IFRpbWVzcGFuLCBwYXJhbXM/OiBEYXRhUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U2VydmljZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U2VydmljZShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U3RhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3RhdGlvbltdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U3RhdGlvbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdGF0aW9uPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VGltZXNlcmllcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRUaW1lc2VyaWVzRGF0YShhcGlVcmw6IHN0cmluZywgaWRzOiBzdHJpbmdbXSwgdGltZXNwYW46IFRpbWVzcGFuLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzRGF0YVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U2luZ2xlVGltZXNlcmllcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U2luZ2xlVGltZXNlcmllc0J5SW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllcz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFRpbWVzZXJpZXNFeHRyYXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNFeHRyYXM+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRUc0RhdGE8VD4oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHRpbWVzcGFuOiBUaW1lc3BhbiwgcGFyYW1zPzogRGF0YVBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YTxUPj47XG4gICAgcHVibGljIGFic3RyYWN0IGdldENhdGVnb3JpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Q2F0ZWdvcnlbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldENhdGVnb3J5KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPENhdGVnb3J5PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UGhlbm9tZW5hKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBoZW5vbWVub25bXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFBoZW5vbWVub24oaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGhlbm9tZW5vbj47XG4gICAgcHVibGljIGFic3RyYWN0IGdldE9mZmVyaW5ncyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxPZmZlcmluZ1tdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0T2ZmZXJpbmcoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8T2ZmZXJpbmc+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRGZWF0dXJlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxGZWF0dXJlW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRGZWF0dXJlKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmU+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQcm9jZWR1cmVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFByb2NlZHVyZVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UHJvY2VkdXJlKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFByb2NlZHVyZT47XG5cbiAgICBwcm90ZWN0ZWQgcmVxdWVzdEFwaTxUPihcbiAgICAgICAgdXJsOiBzdHJpbmcsIHBhcmFtczogUGFyYW1ldGVyRmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9XG4gICAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmNsaWVudChvcHRpb25zKS5nZXQ8VD4odXJsLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5wcmVwYXJlUGFyYW1zKHBhcmFtcyksXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5jcmVhdGVCYXNpY0F1dGhIZWFkZXIob3B0aW9ucy5iYXNpY0F1dGhUb2tlbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJlcGFyZVBhcmFtcyhwYXJhbXM6IFBhcmFtZXRlckZpbHRlcik6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGUgJiYgdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpIHtcbiAgICAgICAgICAgIHBhcmFtcy5sb2NhbGUgPSB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZztcbiAgICAgICAgfVxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHtcbiAgICAgICAgICAgIGVuY29kZXI6IG5ldyBVcmlQYXJhbWV0ZXJDb2RlcigpXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwYXJhbXMpXG4gICAgICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PiBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5XSkpO1xuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEYXRhc2V0VHlwZXMsIFBsYXRmb3JtVHlwZXMgfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IFBhcmFtZXRlciB9IGZyb20gJy4vcGFyYW1ldGVyJztcbmltcG9ydCB7IFN0YXRpb24gfSBmcm9tICcuL3N0YXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhc2V0IGV4dGVuZHMgUGFyYW1ldGVyIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICB1b206IHN0cmluZztcbiAgICBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgbGFzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG4gICAgcGFyYW1ldGVyczogUGFyYW1ldGVyQ29uc3RlbGxhdGlvbjtcbiAgICByZW5kZXJpbmdIaW50czogUmVuZGVyaW5nSGludHM7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uIHtcbiAgICBwdWJsaWMgc2VydmljZTogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBvZmZlcmluZzogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBmZWF0dXJlOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIHByb2NlZHVyZTogUGFyYW1ldGVyO1xuICAgIHB1YmxpYyBwaGVub21lbm9uOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIGNhdGVnb3J5OiBQYXJhbWV0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGaXJzdExhc3RWYWx1ZSB7XG4gICAgcHVibGljIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWUge1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZUlkOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIGNvbG9yPzogc3RyaW5nO1xuICAgIHB1YmxpYyB2aXNpYmxlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJpbmdIaW50cyB7XG4gICAgY2hhcnRUeXBlOiBzdHJpbmc7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluZVJlbmRlcmluZ0hpbnRzIGV4dGVuZHMgUmVuZGVyaW5nSGludHMge1xuICAgIGNoYXJ0VHlwZTogJ2xpbmUnO1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY29sb3I6IHN0cmluZztcbiAgICAgICAgd2lkdGg6IHN0cmluZztcbiAgICAgICAgbGluZVR5cGU6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhclJlbmRlcmluZ0hpbnRzIHtcbiAgICBjaGFydFR5cGU6ICdiYXInO1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY29sb3I6IHN0cmluZztcbiAgICAgICAgd2lkdGg6IHN0cmluZztcbiAgICAgICAgaW50ZXJ2YWw6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YXNldFBhcmFtZXRlckNvbnN0ZWxsYXRpb24gZXh0ZW5kcyBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uIHtcbiAgICBwdWJsaWMgcGxhdGZvcm06IFBsYXRmb3JtUGFyYW1ldGVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YXNldCBpbXBsZW1lbnRzIElEYXRhc2V0IHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHVvbTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgcHVibGljIGZpcnN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG4gICAgcHVibGljIGRhdGFzZXRUeXBlOiBEYXRhc2V0VHlwZXM7XG4gICAgcHVibGljIHBsYXRmb3JtVHlwZTogUGxhdGZvcm1UeXBlcztcbiAgICBwdWJsaWMgcGFyYW1ldGVyczogRGF0YXNldFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG4gICAgcHVibGljIHNlcmllc1BhcmFtZXRlcnM/OiBEYXRhc2V0UGFyYW1ldGVyQ29uc3RlbGxhdGlvbjtcbiAgICBwdWJsaWMgcmVuZGVyaW5nSGludHM6IFJlbmRlcmluZ0hpbnRzO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZXNlcmllcyBpbXBsZW1lbnRzIElEYXRhc2V0IHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHVvbTogc3RyaW5nO1xuICAgIHB1YmxpYyBpbnRlcm5hbElkOiBzdHJpbmc7XG4gICAgcHVibGljIGZpcnN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHB1YmxpYyByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlW107XG4gICAgcHVibGljIHN0YXRpb246IFN0YXRpb247XG4gICAgcHVibGljIHBhcmFtZXRlcnM6IFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG4gICAgcHVibGljIHN0YXR1c0ludGVydmFscz86IFN0YXR1c0ludGVydmFsW107XG4gICAgcHVibGljIGhhc0RhdGEgPSBmYWxzZTtcbiAgICBwdWJsaWMgcmVuZGVyaW5nSGludHM6IFJlbmRlcmluZ0hpbnRzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVzZXJpZXNFeHRyYXMge1xuICAgIGxpY2Vuc2U/OiBzdHJpbmc7XG4gICAgc3RhdHVzSW50ZXJ2YWxzPzogU3RhdHVzSW50ZXJ2YWxbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0dXNJbnRlcnZhbCB7XG4gICAgbG93ZXI6IHN0cmluZztcbiAgICB1cHBlcjogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjb2xvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXRmb3JtUGFyYW1ldGVyIGV4dGVuZHMgUGFyYW1ldGVyIHtcbiAgICBwbGF0Zm9ybVR5cGU6IFBsYXRmb3JtVHlwZXM7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lc2VyaWVzRGF0YSB7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyBkYXRhOiBGaXJzdExhc3RWYWx1ZVtdO1xufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9odHRwLXJlcXVlc3RzJztcblxuZXhwb3J0IGNvbnN0IEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SHR0cFNlcnZpY2VJbnRlcmNlcHRvcj4oJ0hUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMnKTtcblxuZXhwb3J0IGludGVyZmFjZSBIdHRwU2VydmljZUhhbmRsZXIge1xuICAgIGhhbmRsZShyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG9wdGlvbnM6IFBhcnRpYWw8SHR0cFJlcXVlc3RPcHRpb25zPik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3Ige1xuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG9wdGlvbnM6IFBhcnRpYWw8SHR0cFJlcXVlc3RPcHRpb25zPiwgbmV4dDogSHR0cFNlcnZpY2VIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSHR0cFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBoYW5kbGVyOiBIdHRwU2VydmljZUhhbmRsZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBIYW5kbGVyOiBIdHRwSGFuZGxlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChIVFRQX1NFUlZJQ0VfSU5URVJDRVBUT1JTKSBpbnRlcmNlcHRvcnM6IEh0dHBTZXJ2aWNlSW50ZXJjZXB0b3JbXSB8IG51bGxcbiAgICApIHtcbiAgICAgICAgbGV0IGhhbmRsZXI6IEh0dHBTZXJ2aWNlSGFuZGxlciA9IHtcbiAgICAgICAgICAgIGhhbmRsZTogKHJlcSwgb3B0aW9ucykgPT4gaHR0cEhhbmRsZXIuaGFuZGxlKHJlcSlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGludGVyY2VwdG9ycykge1xuICAgICAgICAgICAgaGFuZGxlciA9IGludGVyY2VwdG9ycy5yZWR1Y2VSaWdodCgobmV4dCwgaW50ZXJjZXB0b3IpID0+ICh7XG4gICAgICAgICAgICAgICAgaGFuZGxlOiAocmVxLCBvcHRpb25zKSA9PiBpbnRlcmNlcHRvci5pbnRlcmNlcHQocmVxLCBvcHRpb25zLCBuZXh0KVxuICAgICAgICAgICAgfSksIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGNsaWVudChvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IEh0dHBDbGllbnQge1xuICAgICAgICByZXR1cm4gbmV3IEh0dHBDbGllbnQoe1xuICAgICAgICAgICAgaGFuZGxlOiAocmVxKSA9PiB0aGlzLmhhbmRsZXIuaGFuZGxlKHJlcSwgb3B0aW9ucylcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBkZXNlcmlhbGl6ZSwgZGVzZXJpYWxpemVBcnJheSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvY2F0ZWdvcnknO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGEnO1xuaW1wb3J0IHsgRGF0YXNldCwgVGltZXNlcmllcywgVGltZXNlcmllc0RhdGEsIFRpbWVzZXJpZXNFeHRyYXMgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0JztcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9mZWF0dXJlJztcbmltcG9ydCB7IE9mZmVyaW5nIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvb2ZmZXJpbmcnO1xuaW1wb3J0IHsgUGhlbm9tZW5vbiB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3BoZW5vbWVub24nO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBQcm9jZWR1cmUgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9wcm9jZWR1cmUnO1xuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3NlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGlvbiB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3N0YXRpb24nO1xuaW1wb3J0IHsgRGF0YVBhcmFtZXRlckZpbHRlciwgSHR0cFJlcXVlc3RPcHRpb25zLCBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9odHRwLXJlcXVlc3RzJztcbmltcG9ydCB7IFRpbWVzcGFuIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsJztcbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UgfSBmcm9tICcuL2FwaS1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJy4vaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFzZXRJbXBsQXBpSW50ZXJmYWNlIGV4dGVuZHMgRGF0YXNldEFwaUludGVyZmFjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBzZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsRGF0YXNldElkOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihodHRwc2VydmljZSwgdHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VydmljZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U2VydmljZVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzZXJ2aWNlcycpO1xuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyYW1zID0geyBleHBhbmRlZDogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U2VydmljZVtdPih1cmwsIHBhcmFtcywgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGVudHJ5KSA9PiBlbnRyeS5hcGlVcmwgPSBhcGlVcmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlcnZpY2UoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFNlcnZpY2U+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3NlcnZpY2VzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFNlcnZpY2U+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYXBpVXJsID0gYXBpVXJsO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN0YXRpb25zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN0YXRpb25bXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc3RhdGlvbnMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdGF0aW9uW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3RhdGlvbihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8U3RhdGlvbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc3RhdGlvbnMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U3RhdGlvbj4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lc2VyaWVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAndGltZXNlcmllcycpO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8VGltZXNlcmllc1tdPigob2JzZXJ2ZXI6IE9ic2VydmVyPFRpbWVzZXJpZXNbXT4pID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEFwaVRleHRlZCh1cmwsIHBhcmFtcywgb3B0aW9ucykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNlcmllc0xpc3QgPSBkZXNlcmlhbGl6ZUFycmF5PFRpbWVzZXJpZXM+KFRpbWVzZXJpZXMsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVzZXJpZXNMaXN0LmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS51cmwgPSBhcGlVcmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVybmFsRGF0YXNldElkLmdlbmVyYXRlSW50ZXJuYWxJZChlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRpbWVzZXJpZXNMaXN0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IG9ic2VydmVyLmNvbXBsZXRlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lc2VyaWVzRGF0YShhcGlVcmw6IHN0cmluZywgaWRzOiBzdHJpbmdbXSwgdGltZXNwYW46IFRpbWVzcGFuLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzRGF0YVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzL2dldERhdGEnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFRpbWVzZXJpZXNEYXRhW10+KChvYnNlcnZlcjogT2JzZXJ2ZXI8T2JqZWN0PikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QXBpVGV4dGVkUG9zdCh1cmwsIHtcbiAgICAgICAgICAgICAgICB0aW1lc3BhbjogdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pLFxuICAgICAgICAgICAgICAgIHRpbWVzZXJpZXM6IGlkc1xuICAgICAgICAgICAgfSwgb3B0aW9ucykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXNlcmllc0xpc3Q6IFRpbWVzZXJpZXNEYXRhW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpZCBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzZXJpZXNMaXN0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0W2lkXS52YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aW1lc2VyaWVzTGlzdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICAoKSA9PiBvYnNlcnZlci5jb21wbGV0ZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2luZ2xlVGltZXNlcmllcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpVGV4dGVkKHVybCwgcGFyYW1zKS5waXBlKG1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lc2VyaWVzID0gZGVzZXJpYWxpemU8VGltZXNlcmllcz4oVGltZXNlcmllcywgcmVzdWx0KTtcbiAgICAgICAgICAgIHRpbWVzZXJpZXMudXJsID0gYXBpVXJsO1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbERhdGFzZXRJZC5nZW5lcmF0ZUludGVybmFsSWQodGltZXNlcmllcyk7XG4gICAgICAgICAgICByZXR1cm4gdGltZXNlcmllcztcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaW5nbGVUaW1lc2VyaWVzQnlJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzPiB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkSWQgPSB0aGlzLmludGVybmFsRGF0YXNldElkLnJlc29sdmVJbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaW5nbGVUaW1lc2VyaWVzKHJlc29sdmVkSWQuaWQsIHJlc29sdmVkSWQudXJsLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lc2VyaWVzRXh0cmFzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzRXh0cmFzPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFRpbWVzZXJpZXNFeHRyYXM+KHVybCArICcvZXh0cmFzJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRzRGF0YTxUPihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHRpbWVzcGFuOiBUaW1lc3BhbixcbiAgICAgICAgcGFyYW1zOiBEYXRhUGFyYW1ldGVyRmlsdGVyID0ge30sXG4gICAgICAgIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8RGF0YTxUPj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAndGltZXNlcmllcycsIGlkKSArICcvZ2V0RGF0YSc7XG4gICAgICAgIHBhcmFtcy50aW1lc3BhbiA9IHRoaXMuY3JlYXRlUmVxdWVzdFRpbWVzcGFuKHRpbWVzcGFuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxEYXRhPFQ+Pih1cmwsIHBhcmFtcywgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmV4cGFuZGVkKSB7IHJlcyA9IHJlc1tpZF07IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDYXRlZ29yaWVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPENhdGVnb3J5W10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2NhdGVnb3JpZXMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxDYXRlZ29yeVtdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhdGVnb3J5KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIpOiBPYnNlcnZhYmxlPENhdGVnb3J5PiB7XG4gICAgICAgIC8vIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdjYXRlZ29yaWVzJywgaWQpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpKHVybCwgcGFyYW1zKVxuICAgICAgICAvLyAgICAgLm1hcCh0aGlzLmV4dHJhY3REYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGhlbm9tZW5hKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBoZW5vbWVub25bXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncGhlbm9tZW5hJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UGhlbm9tZW5vbltdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBoZW5vbWVub24oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFBoZW5vbWVub24+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3BoZW5vbWVuYScsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQaGVub21lbm9uPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE9mZmVyaW5ncyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxPZmZlcmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdvZmZlcmluZ3MnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxPZmZlcmluZ1tdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE9mZmVyaW5nKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxPZmZlcmluZz4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnb2ZmZXJpbmdzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPE9mZmVyaW5nPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZlYXR1cmVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZmVhdHVyZXMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxGZWF0dXJlW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RmVhdHVyZShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8RmVhdHVyZT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZmVhdHVyZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RmVhdHVyZT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9jZWR1cmVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFByb2NlZHVyZVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwcm9jZWR1cmVzJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UHJvY2VkdXJlW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvY2VkdXJlKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxQcm9jZWR1cmU+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3Byb2NlZHVyZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UHJvY2VkdXJlPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsYXRmb3JtcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQbGF0Zm9ybVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwbGF0Zm9ybXMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQbGF0Zm9ybVtdPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBsYXRmb3JtKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxQbGF0Zm9ybT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncGxhdGZvcm1zJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFBsYXRmb3JtPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGFzZXRzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXRbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZGF0YXNldHMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxEYXRhc2V0W10+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChsaXN0KSA9PiBsaXN0Lm1hcCgoZW50cnkpID0+IHRoaXMucHJlcGFyZURhdGFzZXQoZW50cnksIGFwaVVybCkpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhc2V0KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXQ+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2RhdGFzZXRzJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGFzZXQ+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXMpID0+IHRoaXMucHJlcGFyZURhdGFzZXQocmVzLCBhcGlVcmwpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhc2V0QnlJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhc2V0PiB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkSWQgPSB0aGlzLmludGVybmFsRGF0YXNldElkLnJlc29sdmVJbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhc2V0KHJlc29sdmVkSWQuaWQsIHJlc29sdmVkSWQudXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhPFQ+KFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgdGltZXNwYW46IFRpbWVzcGFuLFxuICAgICAgICBwYXJhbXM6IERhdGFQYXJhbWV0ZXJGaWx0ZXIgPSB7fSxcbiAgICAgICAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdkYXRhc2V0cycsIGlkKSArICcvZGF0YSc7XG4gICAgICAgIHBhcmFtcy50aW1lc3BhbiA9IHRoaXMuY3JlYXRlUmVxdWVzdFRpbWVzcGFuKHRpbWVzcGFuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxEYXRhPFQ+Pih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIGdldEdlb21ldHJpZXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz8pOiBPYnNlcnZhYmxlPD4ge1xuICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIC8vIH1cblxuICAgIC8vIHByb3RlY3RlZCBjcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW46IFRpbWVzcGFuKTogc3RyaW5nIHtcbiAgICAvLyAgICAgcmV0dXJuIGVuY29kZVVSSShtb21lbnQodGltZXNwYW4uZnJvbSkuZm9ybWF0KCkgKyAnLycgKyBtb21lbnQodGltZXNwYW4udG8pLmZvcm1hdCgpKTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RBcGlUZXh0ZWQodXJsOiBzdHJpbmcsIHBhcmFtczogUGFyYW1ldGVyRmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cHNlcnZpY2UuY2xpZW50KG9wdGlvbnMpLmdldCh1cmwsIHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5wcmVwYXJlUGFyYW1zKHBhcmFtcyksXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICd0ZXh0J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RBcGlUZXh0ZWRQb3N0KHVybDogc3RyaW5nLCBwYXJhbXM6IFBhcmFtZXRlckZpbHRlciA9IHt9LCBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBzZXJ2aWNlLmNsaWVudCgpLnBvc3QodXJsLCBwYXJhbXMsIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZURhdGFzZXQoZGF0YXNldE9iajogRGF0YXNldCwgYXBpVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGRlc2VyaWFsaXplPERhdGFzZXQ+KERhdGFzZXQsIEpTT04uc3RyaW5naWZ5KGRhdGFzZXRPYmopKTtcbiAgICAgICAgZGF0YXNldC51cmwgPSBhcGlVcmw7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQuZ2VuZXJhdGVJbnRlcm5hbElkKGRhdGFzZXQpO1xuICAgICAgICBpZiAoZGF0YXNldC5zZXJpZXNQYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBkYXRhc2V0LnBhcmFtZXRlcnMgPSBkYXRhc2V0LnNlcmllc1BhcmFtZXRlcnM7XG4gICAgICAgICAgICBkZWxldGUgZGF0YXNldC5zZXJpZXNQYXJhbWV0ZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGEgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhJztcbmltcG9ydCB7IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIEh0dHBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgRGF0YXNldEltcGxBcGlJbnRlcmZhY2UgfSBmcm9tICcuL2RhdGFzZXQtaW1wbC1hcGktaW50ZXJmYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJy4vaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVkRGF0YURhdGFzZXRBcGlJbnRlcmZhY2UgZXh0ZW5kcyBEYXRhc2V0SW1wbEFwaUludGVyZmFjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBzZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsRGF0YXNldElkOiBJbnRlcm5hbElkSGFuZGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihodHRwc2VydmljZSwgaW50ZXJuYWxEYXRhc2V0SWQsIHRyYW5zbGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRzRGF0YTxUPihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHRpbWVzcGFuOiBUaW1lc3BhbixcbiAgICAgICAgcGFyYW1zOiBEYXRhUGFyYW1ldGVyRmlsdGVyID0ge30sXG4gICAgICAgIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8RGF0YTxUPj4ge1xuICAgICAgICBjb25zdCBtYXhUaW1lRXh0ZW50ID0gbW9tZW50LmR1cmF0aW9uKDEsICd5ZWFyJykuYXNNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgaWYgKCh0aW1lc3Bhbi50byAtIHRpbWVzcGFuLmZyb20pID4gbWF4VGltZUV4dGVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHM6IEFycmF5PE9ic2VydmFibGU8RGF0YTxUPj4+ID0gW107XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBtb21lbnQodGltZXNwYW4uZnJvbSkuc3RhcnRPZigneWVhcicpO1xuICAgICAgICAgICAgbGV0IGVuZCA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5lbmRPZigneWVhcicpO1xuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0LmlzQmVmb3JlKG1vbWVudCh0aW1lc3Bhbi50bykpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmtTcGFuID0gbmV3IFRpbWVzcGFuKHN0YXJ0LnVuaXgoKSAqIDEwMDAsIGVuZC51bml4KCkgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0cy5wdXNoKHN1cGVyLmdldFRzRGF0YTxUPihpZCwgYXBpVXJsLCBjaHVua1NwYW4sIHBhcmFtcywgb3B0aW9ucykpO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kLmFkZCgxLCAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgICAgICAgICBlbmQgPSBtb21lbnQoc3RhcnQpLmVuZE9mKCd5ZWFyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm9ya0pvaW4ocmVxdWVzdHMpLnBpcGUobWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeS5yZWR1Y2UoKHByZXZpb3VzLCBjdXJyZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQ6IERhdGE8VD4gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2VWYWx1ZXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBwcmV2aW91cy52YWx1ZXMuY29uY2F0KGN1cnJlbnQudmFsdWVzKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcmV2aW91cy5yZWZlcmVuY2VWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cy5yZWZlcmVuY2VWYWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucmVmZXJlbmNlVmFsdWVzW2tleV0gPSBwcmV2aW91cy5yZWZlcmVuY2VWYWx1ZXNba2V5XS5jb25jYXQoY3VycmVudC5yZWZlcmVuY2VWYWx1ZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuZ2V0VHNEYXRhPFQ+KGlkLCBhcGlVcmwsIHRpbWVzcGFuLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYW5ndWFnZUNoYW5nTm90aWZpZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxhbmd1YWdlQ2hhbmdlZCgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbGFuZ3VhZ2VDaGFuZ2VkKCk6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuL21vZGVsL2xhbmd1YWdlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExvY2FsU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbGFuZ3VhZ2VMaXN0OiBMYW5ndWFnZVtdO1xuXG4gICAgcHVibGljIGN1cnJlbnRMYW5nOiBMYW5ndWFnZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmxhbmd1YWdlTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGFuZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldExhbmd1YWdlKGxhbmc6IExhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLnVzZShsYW5nLmNvZGUpO1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRMYW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDdXJyZW50TGFuZygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IHRoaXMubGFuZ3VhZ2VMaXN0LmZpbmQoKGUpID0+IGUuY29kZSA9PT0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcpO1xuICAgIH1cblxufVxuIiwiLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5LWludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVudHJ5IHsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGE8VCBleHRlbmRzIElEYXRhRW50cnk+IHtcbiAgICB2YWx1ZXM6IFRbXTtcbiAgICByZWZlcmVuY2VWYWx1ZXM6IFJlZmVyZW5jZVZhbHVlczxUPjtcbiAgICB2YWx1ZUJlZm9yZVRpbWVzcGFuPzogVDtcbiAgICB2YWx1ZUFmdGVyVGltZXNwYW4/OiBUO1xufVxuXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVzPFQgZXh0ZW5kcyBJRGF0YUVudHJ5PiB7XG4gICAgW2tleTogc3RyaW5nXTogVFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVWYWx1ZUVudHJ5IGV4dGVuZHMgSURhdGFFbnRyeSB7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgdmFsdWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2NhdGVkVGltZVZhbHVlRW50cnkgZXh0ZW5kcyBUaW1lVmFsdWVFbnRyeSB7XG4gICAgZ2VvbWV0cnk6IEdlb0pTT04uUG9pbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZmlsZURhdGFFbnRyeSBleHRlbmRzIElEYXRhRW50cnkge1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIHZhbHVlOiBBcnJheTx7IHZhbHVlOiBudW1iZXIsIHZlcnRpY2FsOiBudW1iZXIgfT47XG4gICAgdmVydGljYWxVbml0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYXRlZFByb2ZpbGVEYXRhRW50cnkgZXh0ZW5kcyBQcm9maWxlRGF0YUVudHJ5IHtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB2YWx1ZTogQXJyYXk8eyB2YWx1ZTogbnVtYmVyLCB2ZXJ0aWNhbDogbnVtYmVyIH0+O1xuICAgIHZlcnRpY2FsVW5pdDogc3RyaW5nO1xuICAgIGdlb21ldHJ5OiBHZW9KU09OLkdlb0pzb25PYmplY3Q7XG59XG4iLCJpbXBvcnQgeyBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uLCBUaW1lc2VyaWVzIH0gZnJvbSAnLi9kYXRhc2V0JztcbmltcG9ydCB7IFBhcmFtZXRlciB9IGZyb20gJy4vcGFyYW1ldGVyJztcblxuZXhwb3J0IGNsYXNzIFN0YXRpb24ge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBnZW9tZXRyeTogR2VvSlNPTi5HZW9tZXRyeU9iamVjdDtcbiAgICBwdWJsaWMgcHJvcGVydGllczogU3RhdGlvblByb3BlcnRpZXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGlvblByb3BlcnRpZXMgZXh0ZW5kcyBQYXJhbWV0ZXIge1xuICAgIHRpbWVzZXJpZXM6IFRpbWVzZXJpZXNDb2xsZWN0aW9uIHwgVGltZXNlcmllcztcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXNDb2xsZWN0aW9uIHtcbiAgICBba2V5OiBzdHJpbmddOiBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uO1xufVxuIiwiZXhwb3J0IGVudW0gUGxhdGZvcm1UeXBlcyB7XG4gICAgc3RhdGlvbmFyeSA9ICdzdGF0aW9uYXJ5JyxcbiAgICBtb2JpbGUgPSAnbW9iaWxlJyxcbiAgICBtb2JpbGVJbnNpdHUgPSAnbW9iaWxlX2luc2l0dSdcbn1cblxuZXhwb3J0IGVudW0gVmFsdWVUeXBlcyB7XG4gICAgcXVhbnRpdHkgPSAncXVhbnRpdHknLFxuICAgIHF1YW50aXR5UHJvZmlsZSA9ICdxdWFudGl0eS1wcm9maWxlJ1xufVxuXG5leHBvcnQgZW51bSBEYXRhc2V0VHlwZXMge1xuICAgIG1lYXN1cmVtZW50XG59XG4iLCJpbXBvcnQgeyBQYXJhbWV0ZXJGaWx0ZXIgfSBmcm9tICcuLy4uL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyIHtcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIHNlcnZpY2U6IHN0cmluZztcbiAgICBwdWJsaWMgaXRlbUlkOiBzdHJpbmc7XG4gICAgcHVibGljIGZpbHRlcjogUGFyYW1ldGVyRmlsdGVyO1xufVxuIiwiLyoqXG4gKiBPcHRpb25zIGZvciBlYWNoIGRhdGFzZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgRGF0YXNldE9wdGlvbnMge1xuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgZGF0YXNldCBpZFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIGludGVybmFsSWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGNvbG9yIG9mIHRoZSBkYXRhc2V0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHNob3cgb3IgaGlkZSBpbiB0aGUgZ3JhcGhcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIHNlcGFyYXRlIHkgYXhpcyBvZiBkYXRhc2V0cyB3aXRoIHNhbWUgdW5pdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHNlcGFyYXRlWUF4aXM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBhbGlnbiBncmFwaCB0aGF0IHplcm8geSBheGlzIGlzIHZpc2libGVcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyB6ZXJvQmFzZWRZQXhpcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGF1dG8gem9vbSB3aGVuIHJhbmdlIHNlbGVjdGlvblxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgYXV0b1JhbmdlU2VsZWN0aW9uPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogbWFya2VyIHRvIHJlcXVlc3QgZGF0YXNldCBkYXRhIGdlbmVyYWxpemVkXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2VuZXJhbGl6ZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGxpc3Qgb2YgdmlzaWJsZSByZWZlcmVuY2UgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd1JlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVPcHRpb25bXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogcmFkaXVzIG9mIGdyYXBocG9pbnRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBwb2ludFJhZGl1czogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIHdpZHRoIG9mIGdyYXBobGluZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyID0gMTtcblxuICAgIC8qKlxuICAgICAqIG1pbiBhbmQgbWF4IHJhbmdlIG9mIHkgYXhpc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHlBeGlzUmFuZ2U/OiBNaW5NYXhSYW5nZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGNvbG9yOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbElkID0gaW50ZXJuYWxJZDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZmVyZW5jZVZhbHVlT3B0aW9uIHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgY29sb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBudW1iZXJlZCByYW5nZSB3aXRoIGEgbWluIGFuZCBhIG1heCB2YWx1ZVxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNaW5NYXhSYW5nZSB7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lZERhdGFzZXRPcHRpb25zIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMge1xuICAgIHB1YmxpYyB0aW1lc3RhbXA6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbnRlcm5hbElkOiBzdHJpbmcsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHRpbWVzdGFtcDogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGludGVybmFsSWQsIGNvbG9yKTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIElkQ2FjaGU8VD4ge1xuXG4gICAgcHJpdmF0ZSBjYWNoZTogTWFwPHN0cmluZywgVD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgaGFzKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KGlkOiBzdHJpbmcpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0KGlkOiBzdHJpbmcsIHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuY2FjaGUuc2V0KGlkLCB2YWx1ZSk7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gTWl4aW4oYmFzZUN0b3JzOiBhbnlbXSkge1xuICAgIHJldHVybiAoZGVyaXZlZEN0b3I6IGFueSkgPT4ge1xuICAgICAgICBiYXNlQ3RvcnMuZm9yRWFjaCgoYmFzZUN0b3IpID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXSA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBIYXNMb2FkYWJsZUNvbnRlbnQge1xuXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nKGxvYWRpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vbkNvbnRlbnRMb2FkaW5nLmVtaXQobG9hZGluZyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc2l6YWJsZUNvbXBvbmVudCB7XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgICBwdWJsaWMgb25XaW5kb3dSZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25SZXNpemUoKTogdm9pZDtcblxufVxuIiwiaW1wb3J0IHtcbiAgICBEb0NoZWNrLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZURpZmZlcixcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYW5nQ2hhbmdlRXZlbnQsIFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhc2V0QXBpSW50ZXJmYWNlIH0gZnJvbSAnLi4vZGF0YXNldC1hcGkvYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgeyBJbnRlcm5hbElkSGFuZGxlciB9IGZyb20gJy4uL2RhdGFzZXQtYXBpL2ludGVybmFsLWlkLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL29wdGlvbnMnO1xuaW1wb3J0IHsgUmVzaXphYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvUmVzaXphYmxlQ29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVJbnRlcnZhbCwgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgSGFzTG9hZGFibGVDb250ZW50IH0gZnJvbSAnLi4vbW9kZWwvbWl4aW5zL2hhcy1sb2FkYWJsZS1jb250ZW50JztcbmltcG9ydCB7IFRpbWUgfSBmcm9tICcuLi90aW1lL3RpbWUuc2VydmljZSc7XG5pbXBvcnQgeyBQcmVzZW50ZXJNZXNzYWdlIH0gZnJvbSAnLi9wcmVzZW50ZXItbWVzc2FnZSc7XG5cbmNvbnN0IGVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByZXNlbnRlck9wdGlvbnMgeyB9XG5cbi8qKlxuICogQWJzdHJhY3Qgc3VwZXJjbGFzcyBmb3IgYWxsIGNvbXBvbmVudHMsIHdoaWNoIHdpbGwgcHJlc2VudCBkYXRhc2V0cy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFzZXRQcmVzZW50ZXJDb21wb25lbnQ8VCBleHRlbmRzIERhdGFzZXRPcHRpb25zIHwgRGF0YXNldE9wdGlvbnNbXSwgVSBleHRlbmRzIFByZXNlbnRlck9wdGlvbnM+XG4gICAgZXh0ZW5kcyBSZXNpemFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2ssIE9uRGVzdHJveSwgSGFzTG9hZGFibGVDb250ZW50IHtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgcHJlc2VudGVkIGRhdGFzZXQgaWRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHByZXNlbnRlZCBzZWxlY3RlZCBkYXRhc2V0IGlkcy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZERhdGFzZXRJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGltZSBpbnRlcnZhbCBpbiB3aGljaCB0aGUgZGF0YSBzaG91bGQgcHJlc2VudGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpbWVJbnRlcnZhbDogVGltZUludGVydmFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvcnJlc3BvbmRpbmcgZGF0YXNldCBvcHRpb25zLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBUPjtcbiAgICBwcm90ZWN0ZWQgb2xkRGF0YXNldE9wdGlvbnM6IE1hcDxzdHJpbmcsIFQ+O1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgZ2VuZXJhbCBwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcHJlc2VudGVyT3B0aW9uczogVTtcbiAgICBwcm90ZWN0ZWQgb2xkUHJlc2VudGVyT3B0aW9uczogVTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgZGF0YXNldHMgZm9yIHdoaWNoIGEgcmVsb2FkIHNob3VsZCBiZSB0cmlnZ2VyZWQsIHdoZW4gdGhlIEFycmF5IGlzIHNldCB0byBuZXcgdmFsdWUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmVsb2FkRm9yRGF0YXNldHM6IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgd2l0aCBhIGxpc3Qgb2Ygc2VsZWN0ZWQgZGF0YXNldHMuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uRGF0YXNldFNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgd2hlbiB0aGUgdGltZXNwYW4gaW4gdGhlIHByZXNlbnRhdGlvbiBpcyBhZGp1c3RlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25UaW1lc3BhbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxUaW1lc3Bhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCwgd2hlbiB0aGVyZSBvY2N1cmVkIGEgbWVzc2FnZSBpbiB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbk1lc3NhZ2VUaHJvd246IEV2ZW50RW1pdHRlcjxQcmVzZW50ZXJNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZsYWcsIHdoaWxlIHRoZXJlIGlzIGRhdGEgbG9hZGVkIGluIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uQ29udGVudExvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0NvbnRlbnRMb2FkaW5nOiAobG9hZGluZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIHByb3RlY3RlZCB0aW1lc3BhbjogVGltZXNwYW47XG5cbiAgICBwcml2YXRlIGRhdGFzZXRJZHNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZz47XG4gICAgcHJpdmF0ZSBzZWxlY3RlZERhdGFzZXRJZHNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZz47XG4gICAgcHJpdmF0ZSBsYW5nQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICBwcm90ZWN0ZWQgYXBpOiBEYXRhc2V0QXBpSW50ZXJmYWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YXNldElkUmVzb2x2ZXI6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdGltZVNydmM6IFRpbWUsXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZGF0YXNldElkc0RpZmZlciA9IHRoaXMuaXRlcmFibGVEaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YXNldElkc0RpZmZlciA9IHRoaXMuaXRlcmFibGVEaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLmxhbmdDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2Uub25MYW5nQ2hhbmdlLnN1YnNjcmliZSgobGFuZ0NoYW5nZUV2ZW50OiBMYW5nQ2hhbmdlRXZlbnQpID0+IHRoaXMub25MYW5ndWFnZUNoYW5nZWQobGFuZ0NoYW5nZUV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudGltZUludGVydmFsICYmIHRoaXMudGltZUludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVzcGFuID0gdGhpcy50aW1lU3J2Yy5jcmVhdGVUaW1lc3Bhbk9mSW50ZXJ2YWwodGhpcy50aW1lSW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWxDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXMucmVsb2FkRm9yRGF0YXNldHMgJiYgdGhpcy5yZWxvYWRGb3JEYXRhc2V0cyAmJiB0aGlzLnJlbG9hZERhdGFGb3JEYXRhc2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZERhdGFGb3JEYXRhc2V0cyh0aGlzLnJlbG9hZEZvckRhdGFzZXRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYW5nQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YXNldElkc0NoYW5nZXMgPSB0aGlzLmRhdGFzZXRJZHNEaWZmZXIuZGlmZih0aGlzLmRhdGFzZXRJZHMpO1xuICAgICAgICBpZiAoZGF0YXNldElkc0NoYW5nZXMpIHtcbiAgICAgICAgICAgIGRhdGFzZXRJZHNDaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKGFkZGVkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRGF0YXNldEJ5SW50ZXJuYWxJZChhZGRlZEl0ZW0uaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRhdGFzZXRJZHNDaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVtb3ZlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURhdGFzZXQocmVtb3ZlZEl0ZW0uaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRGF0YXNldElkc0NoYW5nZXMgPSB0aGlzLnNlbGVjdGVkRGF0YXNldElkc0RpZmZlci5kaWZmKHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkRGF0YXNldElkc0NoYW5nZXMpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YXNldElkc0NoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgoYWRkZWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZElkKGFkZGVkSXRlbS5pdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZWN0ZWREYXRhc2V0SWRzQ2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlbW92ZWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZElkKHJlbW92ZWRJdGVtLml0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVxdWFsKHRoaXMub2xkUHJlc2VudGVyT3B0aW9ucywgdGhpcy5wcmVzZW50ZXJPcHRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5vbGRQcmVzZW50ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcmVzZW50ZXJPcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByZXNlbnRlck9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5wcmVzZW50ZXJPcHRpb25zQ2hhbmdlZChvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdENoYW5nZSA9IHRoaXMub2xkRGF0YXNldE9wdGlvbnMgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChmaXJzdENoYW5nZSkgeyB0aGlzLm9sZERhdGFzZXRPcHRpb25zID0gbmV3IE1hcCgpOyB9XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVxdWFsKHZhbHVlLCB0aGlzLm9sZERhdGFzZXRPcHRpb25zLmdldChrZXkpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9sZERhdGFzZXRPcHRpb25zLnNldChrZXksIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YXNldE9wdGlvbnMuZ2V0KGtleSkpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9uc0NoYW5nZWQoa2V5LCB2YWx1ZSwgZmlyc3RDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IHJlbG9hZERhdGFGb3JEYXRhc2V0cyhkYXRhc2V0czogc3RyaW5nW10pOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFkZERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGludGVybmFsSWRPYmogPSB0aGlzLmRhdGFzZXRJZFJlc29sdmVyLnJlc29sdmVJbnRlcm5hbElkKGludGVybmFsSWQpO1xuICAgICAgICB0aGlzLmFkZERhdGFzZXQoaW50ZXJuYWxJZE9iai5pZCwgaW50ZXJuYWxJZE9iai51cmwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdGltZUludGVydmFsQ2hhbmdlcygpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGFkZERhdGFzZXQoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBzZXRTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVtb3ZlU2VsZWN0ZWRJZChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnM6IFUpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGRhdGFzZXRPcHRpb25zQ2hhbmdlZChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM6IFQsIGZpcnN0Q2hhbmdlOiBib29sZWFuKTogdm9pZDtcblxufVxuIiwiZXhwb3J0IGVudW0gUHJlc2VudGVyTWVzc2FnZVR5cGUge1xuICAgIEVSUk9SLFxuICAgIElORk9cbn1cbiIsImltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vbW9kZWwvc2V0dGluZ3Mvc2V0dGluZ3MnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2V0dGluZ3NTZXJ2aWNlPFQgZXh0ZW5kcyBTZXR0aW5ncz4ge1xuXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogVDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBEZWZhdWx0IGVtcHR5IHNldHRpbmdzXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fSBhcyBUO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3M7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNldHRpbmdzKHNldHRpbmdzOiBUKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGNoZWNrcyBVUkxzIGlmIHRoZXkgYXJlIHJlYWNoYWJsZSBieSBhIHNpbXBsZSBnZXQgcmVxdWVzdC4gSWYgdGhleSBnZXRzIGFueXRoaW5nIGJhY2ssIGV2ZXJ5dGhpbmcgaXMgb2ssIG90aGVyd2lzZVxuICogdGhlIGNvcnJlc3BvbmRpbmcgbWV0aG9kIGdpdmVzIGJhY2sgdGhlIFVSTHMgd2hpY2ggYXJlIG5vdCByZWFjaGFibGUuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0dXNDaGVja1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgdXJsczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRcbiAgKSB7IH1cblxuICAvKipcbiAgICogQ2hlY2tzIGFsbCBpbnRlcm5hbCByZWdpc3RlcmVkIFVSTHMgaWYgdGhleSBhcmUgcmVhY2hhYmxlLiBHaXZlcyBiYWNrIGV2ZXJ5IFVSTCwgd2hpY2ggd2FzIG5vdCByZWFjaGFibGVcbiAgICovXG4gIHB1YmxpYyBjaGVja0FsbCgpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuZG9DaGVjayh0aGlzLnVybHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgZ2l2ZW4gVVJMLlxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIHdpdGggdGhlIFVSTCBpZiBub3QgcmVhY2hhYmxlLlxuICAgKi9cbiAgcHVibGljIGNoZWNrVXJsKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5kb0NoZWNrVXJsKHVybCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBnaXZlbiBVUkxzLlxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFsbCBub3QgcmVhY2hhYmxlIFVSTHMuXG4gICAqL1xuICBwdWJsaWMgY2hlY2tVcmxzKHVybHM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLmRvQ2hlY2sodXJscyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgVVJMIHRvIHRoZSBpbnRlcm5hbCBjb2xsZWN0aW9uLlxuICAgKi9cbiAgcHVibGljIGFkZFVybCh1cmw6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy51cmxzLmluZGV4T2YodXJsKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IHRoaXMudXJscy5wdXNoKHVybCk7IH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBVUkwgb2YgdGhlIGludGVybmFsIGNvbGxlY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlVXJsKHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnVybHMuaW5kZXhPZih1cmwpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7IHRoaXMudXJscy5zcGxpY2UoaW5kZXgsIDEpOyB9XG4gIH1cblxuICBwcml2YXRlIGRvQ2hlY2tVcmwodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHN0cmluZz4pID0+IHtcbiAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQodXJsKS5zdWJzY3JpYmUoXG4gICAgICAgIChyZXMpID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KG51bGwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQodXJsKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0NoZWNrKHVybHM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IHJlcXVlc3RzOiBBcnJheTxPYnNlcnZhYmxlPHN0cmluZz4+ID0gW107XG4gICAgdXJscy5mb3JFYWNoKCh1cmwpID0+IHJlcXVlc3RzLnB1c2godGhpcy5kb0NoZWNrVXJsKHVybCkpKTtcbiAgICByZXR1cm4gZm9ya0pvaW4ocmVxdWVzdHMpLnBpcGUoXG4gICAgICBtYXAoKGNoZWNrZWRVcmxzKSA9PiB7XG4gICAgICAgIHJldHVybiBjaGVja2VkVXJscy5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztJQVFXLCtCQUFROzs7OztRQUNYLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7Ozs7OztJQU0xQix1Q0FBZ0I7Ozs7OztjQUFDLEdBQVcsRUFBRSxPQUFlO1FBQ2hELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7UUFDM0IsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztRQUM1QyxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFB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