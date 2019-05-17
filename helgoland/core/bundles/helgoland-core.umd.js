(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operator/map'), require('@angular/common'), require('@ngx-translate/core'), require('moment'), require('class-transformer'), require('rxjs/add/operator/map'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@helgoland/core', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operator/map', '@angular/common', '@ngx-translate/core', 'moment', 'class-transformer', 'rxjs/add/operator/map', 'rxjs/operators'], factory) :
    (factory((global.helgoland = global.helgoland || {}, global.helgoland.core = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs['operator/map'],global.ng.common,null,null,null,global.rxjs['add/operator/map'],global.rxjs.operators));
}(this, (function (exports,i0,i1,rxjs,map,common,core,moment,classTransformer,map$1,operators) { 'use strict';

    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ColorService = (function () {
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
            { type: i0.Injectable },
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
    var DatasetApiMapping = (function () {
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
                return new rxjs.Observable(function (observer) {
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DatasetApiMapping.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        return DatasetApiMapping;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StatusIntervalResolverService = (function () {
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
            { type: i0.Injectable },
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
    var InternalIdHandler = (function () {
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
            { type: i0.Injectable },
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
    var LocalStorage = (function () {
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
            { type: i0.Injectable },
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
    var NotifierService = (function () {
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        NotifierService.ctorParameters = function () { return []; };
        return NotifierService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DateProxyPipe = (function () {
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
                if (pattern === void 0) {
                    pattern = 'mediumDate';
                }
                /** @type {?} */
                var builtinDatePipe = new common.DatePipe(this.translate.currentLang || 'en');
                try {
                    return builtinDatePipe.transform(value, pattern);
                }
                catch (error) {
                    console.error(error);
                    return new common.DatePipe('en').transform(value, pattern);
                }
            };
        DateProxyPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'dateI18n',
                        pure: false
                    },] },
        ];
        /** @nocollapse */
        DateProxyPipe.ctorParameters = function () {
            return [
                { type: core.TranslateService }
            ];
        };
        return DateProxyPipe;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ TimeInterval = (function () {
        function TimeInterval() {
        }
        return TimeInterval;
    }());
    var Timespan = (function (_super) {
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
    var BufferedTime = (function (_super) {
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
    var DefinedTimespanService = (function () {
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DefinedTimespanService.ctorParameters = function () { return []; };
        return DefinedTimespanService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Time = (function () {
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
                    return classTransformer.plainToClass(Timespan, json);
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        Time.ctorParameters = function () {
            return [
                { type: LocalStorage }
            ];
        };
        return Time;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HelgolandCoreModule = (function () {
        function HelgolandCoreModule() {
        }
        HelgolandCoreModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            DateProxyPipe
                        ],
                        imports: [
                            i1.HttpClientModule
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
    var /**
     * @abstract
     */ ApiInterface = (function () {
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
                var headers = new i1.HttpHeaders();
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
    DatasetService = (function () {
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
                    var temp_1 = ((this.datasetOptions.get(internalId)));
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
    RenderingHintsDatasetService = (function (_super) {
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
                var options = (this.createStyles(dataset.internalId));
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
    var UriParameterCoder = (function () {
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
    var /**
     * @abstract
     */ DatasetApiInterface = (function (_super) {
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
                if (params === void 0) {
                    params = {};
                }
                if (options === void 0) {
                    options = {};
                }
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
                var httpParams = new i1.HttpParams({
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
    var ParameterConstellation = (function () {
        function ParameterConstellation() {
        }
        return ParameterConstellation;
    }());
    var FirstLastValue = (function () {
        function FirstLastValue() {
        }
        return FirstLastValue;
    }());
    var ReferenceValue = (function () {
        function ReferenceValue() {
        }
        return ReferenceValue;
    }());
    var DatasetParameterConstellation = (function (_super) {
        __extends(DatasetParameterConstellation, _super);
        function DatasetParameterConstellation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DatasetParameterConstellation;
    }(ParameterConstellation));
    var Dataset = (function () {
        function Dataset() {
        }
        return Dataset;
    }());
    var Timeseries = (function () {
        function Timeseries() {
            this.hasData = false;
        }
        return Timeseries;
    }());
    var TimeseriesData = (function () {
        function TimeseriesData() {
        }
        return TimeseriesData;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var HTTP_SERVICE_INTERCEPTORS = new i0.InjectionToken('HTTP_SERVICE_INTERCEPTORS');
    var HttpService = (function () {
        function HttpService(httpHandler, interceptors) {
            this.httpHandler = httpHandler;
            /** @type {?} */
            var handler = {
                handle: function (req, options) { return httpHandler.handle(req); }
            };
            if (interceptors) {
                handler = interceptors.reduceRight(function (next, interceptor) {
                    return ({
                        handle: function (req, options) { return interceptor.intercept(req, options, next); }
                    });
                }, handler);
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
                if (options === void 0) {
                    options = {};
                }
                return new i1.HttpClient({
                    handle: function (req) { return _this.handler.handle(req, options); }
                });
            };
        HttpService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        HttpService.ctorParameters = function () {
            return [
                { type: i1.HttpHandler },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [HTTP_SERVICE_INTERCEPTORS,] }] }
            ];
        };
        /** @nocollapse */ HttpService.ngInjectableDef = i0.defineInjectable({ factory: function HttpService_Factory() { return new HttpService(i0.inject(i1.HttpHandler), i0.inject(HTTP_SERVICE_INTERCEPTORS, 8)); }, token: HttpService, providedIn: "root" });
        return HttpService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DatasetImplApiInterface = (function (_super) {
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
                return this.requestApi(url, params, options).pipe(operators.map(function (result) {
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
                return this.requestApi(url, params, options).pipe(operators.map(function (result) {
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
                return new rxjs.Observable(function (observer) {
                    _this.requestApiTexted(url, params, options).subscribe(function (result) {
                        /** @type {?} */
                        var timeseriesList = classTransformer.deserializeArray(Timeseries, result);
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
                return new rxjs.Observable(function (observer) {
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
                return this.requestApiTexted(url, params).pipe(operators.map(function (result) {
                    /** @type {?} */
                    var timeseries = classTransformer.deserialize(Timeseries, result);
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
                if (params === void 0) {
                    params = {};
                }
                /** @type {?} */
                var url = this.createRequestUrl(apiUrl, 'timeseries', id) + '/getData';
                params.timespan = this.createRequestTimespan(timespan);
                return this.requestApi(url, params, options).pipe(operators.map(function (res) {
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
                return this.requestApi(url, params, options).pipe(operators.map(function (list) { return list.map(function (entry) { return _this.prepareDataset(entry, apiUrl); }); }));
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
                return this.requestApi(url, params, options).pipe(operators.map(function (res) { return _this.prepareDataset(res, apiUrl); }));
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
                if (params === void 0) {
                    params = {};
                }
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
                if (params === void 0) {
                    params = {};
                }
                if (options === void 0) {
                    options = {};
                }
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
                if (params === void 0) {
                    params = {};
                }
                if (options === void 0) {
                    options = {};
                }
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
                var dataset = classTransformer.deserialize(Dataset, JSON.stringify(datasetObj));
                dataset.url = apiUrl;
                this.internalDatasetId.generateInternalId(dataset);
                if (dataset.seriesParameters) {
                    dataset.parameters = dataset.seriesParameters;
                    delete dataset.seriesParameters;
                }
                return dataset;
            };
        DatasetImplApiInterface.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DatasetImplApiInterface.ctorParameters = function () {
            return [
                { type: HttpService },
                { type: InternalIdHandler },
                { type: core.TranslateService }
            ];
        };
        return DatasetImplApiInterface;
    }(DatasetApiInterface));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SplittedDataDatasetApiInterface = (function (_super) {
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
                if (params === void 0) {
                    params = {};
                }
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
                    return rxjs.forkJoin(requests).pipe(operators.map(function (entry) {
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        SplittedDataDatasetApiInterface.ctorParameters = function () {
            return [
                { type: HttpService },
                { type: InternalIdHandler },
                { type: core.TranslateService }
            ];
        };
        return SplittedDataDatasetApiInterface;
    }(DatasetImplApiInterface));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ LanguageChangNotifier = (function () {
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
    var LocalSelectorComponent = (function () {
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
            languageList: [{ type: i0.Input }]
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
    ReferenceValues = (function () {
        function ReferenceValues() {
        }
        return ReferenceValues;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Station = (function () {
        function Station() {
        }
        return Station;
    }());
    var TimeseriesCollection = (function () {
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
    var Filter = (function () {
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
    var /**
     * Options for each dataset.
     *
     * @export
     */ DatasetOptions = (function () {
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
    var ReferenceValueOption = (function () {
        function ReferenceValueOption() {
        }
        return ReferenceValueOption;
    }());
    var TimedDatasetOptions = (function (_super) {
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
    var /**
     * @template T
     */ IdCache = (function () {
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
    var HasLoadableContent = (function () {
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
    var ResizableComponent = (function () {
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
            onWindowResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
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
    var DatasetPresenterComponent = (function (_super) {
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
            _this.onDatasetSelected = new i0.EventEmitter();
            /**
             * Event when the timespan in the presentation is adjusted.
             */
            _this.onTimespanChanged = new i0.EventEmitter();
            /**
             * Event, when there occured a message in the component.
             */
            _this.onMessageThrown = new i0.EventEmitter();
            /**
             * Event flag, while there is data loaded in the component.
             */
            _this.onContentLoading = new i0.EventEmitter();
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
            datasetIds: [{ type: i0.Input }],
            selectedDatasetIds: [{ type: i0.Input }],
            timeInterval: [{ type: i0.Input }],
            datasetOptions: [{ type: i0.Input }],
            presenterOptions: [{ type: i0.Input }],
            reloadForDatasets: [{ type: i0.Input }],
            onDatasetSelected: [{ type: i0.Output }],
            onTimespanChanged: [{ type: i0.Output }],
            onMessageThrown: [{ type: i0.Output }],
            onContentLoading: [{ type: i0.Output }]
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
    SettingsService = (function () {
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
    var StatusCheckService = (function () {
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
                return new rxjs.Observable(function (observer) {
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
                return rxjs.forkJoin(requests).pipe(operators.map(function (checkedUrls) {
                    return checkedUrls.filter(function (entry) {
                        if (entry) {
                            return entry;
                        }
                    });
                }));
            };
        StatusCheckService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        StatusCheckService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
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

    exports.DatasetApiInterface = DatasetApiInterface;
    exports.UriParameterCoder = UriParameterCoder;
    exports.DatasetApiMapping = DatasetApiMapping;
    exports.DatasetApiVersion = DatasetApiVersion;
    exports.SplittedDataDatasetApiInterface = SplittedDataDatasetApiInterface;
    exports.DatasetImplApiInterface = DatasetImplApiInterface;
    exports.InternalIdHandler = InternalIdHandler;
    exports.HTTP_SERVICE_INTERCEPTORS = HTTP_SERVICE_INTERCEPTORS;
    exports.HttpService = HttpService;
    exports.LanguageChangNotifier = LanguageChangNotifier;
    exports.LocalSelectorComponent = LocalSelectorComponent;
    exports.HelgolandCoreModule = HelgolandCoreModule;
    exports.ApiInterface = ApiInterface;
    exports.DatasetService = DatasetService;
    exports.RenderingHintsDatasetService = RenderingHintsDatasetService;
    exports.ColorService = ColorService;
    exports.StatusIntervalResolverService = StatusIntervalResolverService;
    exports.LocalStorage = LocalStorage;
    exports.ReferenceValues = ReferenceValues;
    exports.ParameterConstellation = ParameterConstellation;
    exports.FirstLastValue = FirstLastValue;
    exports.ReferenceValue = ReferenceValue;
    exports.DatasetParameterConstellation = DatasetParameterConstellation;
    exports.Dataset = Dataset;
    exports.Timeseries = Timeseries;
    exports.TimeseriesData = TimeseriesData;
    exports.Station = Station;
    exports.TimeseriesCollection = TimeseriesCollection;
    exports.PlatformTypes = PlatformTypes;
    exports.ValueTypes = ValueTypes;
    exports.DatasetTypes = DatasetTypes;
    exports.Filter = Filter;
    exports.TimeInterval = TimeInterval;
    exports.Timespan = Timespan;
    exports.BufferedTime = BufferedTime;
    exports.DatasetOptions = DatasetOptions;
    exports.ReferenceValueOption = ReferenceValueOption;
    exports.TimedDatasetOptions = TimedDatasetOptions;
    exports.IdCache = IdCache;
    exports.Mixin = Mixin;
    exports.HasLoadableContent = HasLoadableContent;
    exports.NotifierService = NotifierService;
    exports.DateProxyPipe = DateProxyPipe;
    exports.DatasetPresenterComponent = DatasetPresenterComponent;
    exports.PresenterMessageType = PresenterMessageType;
    exports.SettingsService = SettingsService;
    exports.StatusCheckService = StatusCheckService;
    exports.DefinedTimespan = DefinedTimespan;
    exports.DefinedTimespanService = DefinedTimespanService;
    exports.Time = Time;
    exports.ɵa = ResizableComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsZ29sYW5kLWNvcmUudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2NvbG9yL2NvbG9yLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvZGF0YXNldC1hcGkvYXBpLW1hcHBpbmcuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9kYXRhc2V0LWFwaS9oZWxwZXIvc3RhdHVzLWludGVydmFsLXJlc29sdmVyLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvZGF0YXNldC1hcGkvaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL25vdGlmaWVyL25vdGlmaWVyLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvcGlwZXMvZGF0ZXByb3h5L2RhdGVwcm94eS5waXBlLnRzIixudWxsLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL3RpbWUvZGVmaW5lZC10aW1lc3Bhbi5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL3RpbWUvdGltZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2Fic3RyYWN0LXNlcnZpY2VzL2FwaS1pbnRlcmZhY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvYWJzdHJhY3Qtc2VydmljZXMvZGF0YXNldC5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2Fic3RyYWN0LXNlcnZpY2VzL3JlbmRlcmluZy1oaW50cy1kYXRhc2V0LnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvZGF0YXNldC1hcGkvYXBpLWludGVyZmFjZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9kYXRhc2V0LnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2RhdGFzZXQtYXBpL2h0dHAuc2VydmljZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9kYXRhc2V0LWFwaS9kYXRhc2V0LWltcGwtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2RhdGFzZXQtYXBpL3NwbGl0dGVkLWRhdGEtYXBpLWludGVyZmFjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL2xhbmd1YWdlL2xhbmd1YWdlLWNoYW5nZXIudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbGFuZ3VhZ2UvbG9jYWxlLXNlbGVjdG9yLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL21vZGVsL2RhdGFzZXQtYXBpL2RhdGEudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbi50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9kYXRhc2V0LWFwaS9lbnVtcy50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9pbnRlcm5hbC9maWx0ZXIudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvbW9kZWwvaW50ZXJuYWwvb3B0aW9ucy50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9pbnRlcm5hbC9pZC1jYWNoZS50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9taXhpbnMvTWl4aW4uZGVjb3JhdG9yLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL21vZGVsL21peGlucy9oYXMtbG9hZGFibGUtY29udGVudC50cyIsIm5nOi8vQGhlbGdvbGFuZC9jb3JlL2xpYi9tb2RlbC9pbnRlcm5hbC9SZXNpemFibGVDb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvcHJlc2VudGluZy9kYXRhc2V0LXByZXNlbnRlci5jb21wb25lbnQudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvcHJlc2VudGluZy9wcmVzZW50ZXItbWVzc2FnZS10eXBlLnRzIiwibmc6Ly9AaGVsZ29sYW5kL2NvcmUvbGliL3NldHRpbmdzL3NldHRpbmdzLnNlcnZpY2UudHMiLCJuZzovL0BoZWxnb2xhbmQvY29yZS9saWIvc3RhdHVzLWNoZWNrL3N0YXR1cy1jaGVjay5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbG9yU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmFuZG9tIGNvbG9yIGFuZCByZXR1cm4gaXQgYXMgYSBoZXggc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyBhbmQgb3BhY2l0eSBpbiBwZXJjZW50IHRvIFJHQkEgY29sb3IgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb252ZXJ0SGV4VG9SR0JBKGhleDogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBoZXggPSBoZXgucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICAgICAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcbiAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBvcGFjaXR5IC8gMTAwICsgJyknO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZG9tQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcbiAgICAgICAgbGV0IGNvbG9yID0gJyMnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZW51bSBEYXRhc2V0QXBpVmVyc2lvbiB7XG4gICAgVjEsXG4gICAgVjJcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFzZXRBcGlNYXBwaW5nIHtcblxuICAgIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIERhdGFzZXRBcGlWZXJzaW9uPiA9IG5ldyBNYXA8c3RyaW5nLCBEYXRhc2V0QXBpVmVyc2lvbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgZ2V0QXBpVmVyc2lvbihhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8RGF0YXNldEFwaVZlcnNpb24+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPERhdGFzZXRBcGlWZXJzaW9uPigob2JzZXJ2ZXI6IE9ic2VydmVyPERhdGFzZXRBcGlWZXJzaW9uPikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKGFwaVVybCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB0aGlzLmNhY2hlLmdldChhcGlVcmwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldDxhbnlbXT4oYXBpVXJsKS5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbiA9IERhdGFzZXRBcGlWZXJzaW9uLlYxO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pZCA9PT0gJ3BsYXRmb3JtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gRGF0YXNldEFwaVZlcnNpb24uVjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldChhcGlVcmwsIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1WZXJzaW9uKG9ic2VydmVyLCB2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maXJtVmVyc2lvbihvYnNlcnZlcjogT2JzZXJ2ZXI8RGF0YXNldEFwaVZlcnNpb24+LCB2ZXJzaW9uOiBEYXRhc2V0QXBpVmVyc2lvbikge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHZlcnNpb24pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdGF0dXNJbnRlcnZhbCB9IGZyb20gJy4uLy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdHVzSW50ZXJ2YWxSZXNvbHZlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIGdldE1hdGNoaW5nSW50ZXJ2YWwodmFsdWU6IG51bWJlciwgc3RhdHVzSW50ZXJ2YWxzOiBTdGF0dXNJbnRlcnZhbFtdKTogU3RhdHVzSW50ZXJ2YWwge1xuICAgIGlmICh2YWx1ZSAmJiBzdGF0dXNJbnRlcnZhbHMpIHtcbiAgICAgIHJldHVybiBzdGF0dXNJbnRlcnZhbHMuZmluZCgoaW50ZXJ2YWwpID0+IHtcbiAgICAgICAgY29uc3QgdXBwZXIgPSBpbnRlcnZhbC51cHBlciA/IHBhcnNlRmxvYXQoaW50ZXJ2YWwudXBwZXIpIDogTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgY29uc3QgbG93ZXIgPSBpbnRlcnZhbC5sb3dlciA/IHBhcnNlRmxvYXQoaW50ZXJ2YWwubG93ZXIpIDogTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgaWYgKGxvd2VyIDw9IHZhbHVlICYmIHZhbHVlIDwgdXBwZXIpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgJ3J4anMvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJRGF0YXNldCB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuXG5jb25zdCBJTlRFUk5BTF9JRF9TRVBFUkFUT1IgPSAnX18nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsRGF0YXNldElkIHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU2VydmljZSB0byBnZW5lcmF0ZSBvciByZXNvbHZlIGludGVybmFsIGRhdGFzZXQgSURzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnRlcm5hbElkSGFuZGxlciB7XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhbiBpbnRlcm5hbCBpZCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQuXG4gICAqIEBwYXJhbSBkYXRhc2V0IFRoZSBkYXRhc2V0IGZvciB3aGljaCB0aGUgaW50ZXJuYWwgaWQgd2lsbCBiZSBnZW5lcmF0ZWQgYW5kIHNhdmVkLlxuICAgKi9cbiAgcHVibGljIGdlbmVyYXRlSW50ZXJuYWxJZChkYXRhc2V0OiBJRGF0YXNldCkge1xuICAgIGRhdGFzZXQuaW50ZXJuYWxJZCA9IGRhdGFzZXQudXJsICsgSU5URVJOQUxfSURfU0VQRVJBVE9SICsgZGF0YXNldC5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgaW50ZXJuYWwgSUQgdG8gdGhlIHVybCBhbmQgdGhlIEFQSSBzcGVjaWZpYyBkYXRhc2V0IGlkLlxuICAgKiBAcGFyYW0gaW50ZXJuYWxJZCBUaGUgaW50ZXJuYWwgaWQgYXMgc3RyaW5nXG4gICAqIEByZXR1cm5zIENvbnN0cnVjdCBvZiB1cmwgYW5kIEFQSSBpZFxuICAgKi9cbiAgcHVibGljIHJlc29sdmVJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZyk6IEludGVybmFsRGF0YXNldElkIHtcbiAgICBjb25zdCBzcGxpdCA9IGludGVybmFsSWQuc3BsaXQoSU5URVJOQUxfSURfU0VQRVJBVE9SKTtcbiAgICBpZiAoc3BsaXQubGVuZ3RoICE9PSAyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdJbnRlcm5hbElEICcgKyBpbnRlcm5hbElkICsgJyBpcyBub3QgcmVzb2x2YWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHNwbGl0WzBdLFxuICAgICAgICBpZDogc3BsaXRbMV1cbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTG9jYWxTdG9yYWdlIHNhdmUgb2JqZWN0cyB3aXRoIGEgZ2l2ZW4ga2V5XG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlIHtcblxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKFN0b3JhZ2UpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBvYmplY3Qgd2l0aCB0aGUga2V5IGluIHRoZSBsb2NhbCBzdG9yYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHN1Y2Nlc3NmdWxsIHNhdmluZ1xuICAgICAqIEBtZW1iZXJvZiBMb2NhbFN0b3JhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc2F2ZShrZXk6IHN0cmluZywgb2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkcyB0aGUgb2JqZWN0IHdpdGggZm9yIHRoZSBrZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcmV0dXJucyB0aGUgb2JqZWN0IGlmIGV4aXN0cywgZWxzZSBudWxsXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkPFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9hZHMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBmb3IgdGhlIGtleVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEByZXR1cm5zIHRoZSBhcnJheSBvZiBvYmplY3RzIGlmIGV4aXN0cywgZWxzZSBudWxsXG4gICAgICogQG1lbWJlcm9mIExvY2FsU3RvcmFnZVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkQXJyYXk8VD4oa2V5OiBzdHJpbmcpOiBUW10ge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgYSB0ZXh0dWFsIHN0cmluZyBmb3IgdGhlIGdpdmVuIGtleVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEByZXR1cm5zIHRoZSBzdHJpbmcgaWYgZXhpc3RzLCBlbHNlIG51bGxcbiAgICAgKiBAbWVtYmVyb2YgTG9jYWxTdG9yYWdlXG4gICAgICovXG4gICAgcHVibGljIGxvYWRUZXh0dWFsKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHsgcmV0dXJuIHJlc3VsdDsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBJRCA9ICdoZWxnb2xhbmQtbm90aWZpZXInO1xuY29uc3QgVElNRV9JTl9NUyA9IDMwMDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgbm90aWZpZXJUaW1lb3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgbm90aWZpZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoSUQpO1xuICAgIGlmICghbm90aWZpZXJFbGVtZW50KSB7XG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBub2RlLmlkID0gSUQ7XG4gICAgICBub2RlLmNsYXNzTmFtZSA9ICdoaWRlJztcbiAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBub3RpZnkodGV4dDogc3RyaW5nKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubm90aWZpZXJUaW1lb3V0KTtcbiAgICBjb25zdCBub3RpZmllckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChJRCk7XG4gICAgbm90aWZpZXJFbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgbm90aWZpZXJFbGVtZW50LmNsYXNzTmFtZSA9IG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnaGlkZScsICdzaG93Jyk7XG4gICAgdGhpcy5ub3RpZmllclRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmaWVyRWxlbWVudC5jbGFzc05hbWUgPSBub3RpZmllckVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ3Nob3cnLCAnaGlkZScpO1xuICAgIH0sIFRJTUVfSU5fTVMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGF0ZUkxOG4nLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQcm94eVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IGFueSwgcGF0dGVybjogc3RyaW5nID0gJ21lZGl1bURhdGUnKTogYW55IHtcbiAgICAgICAgLy8gc2ltcGx5IGZvcndhcmQgdG8gYnVpbHQtaW4gcGlwZSwgYnV0IHRha2UgaW50byBhY2NvdW50IHRoZSBjdXJyZW50IGxhbmd1YWdlXG4gICAgICAgIGNvbnN0IGJ1aWx0aW5EYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSh0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyB8fCAnZW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBidWlsdGluRGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBwYXR0ZXJuKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGlwZSgnZW4nKS50cmFuc2Zvcm0odmFsdWUsIHBhdHRlcm4pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUaW1lSW50ZXJ2YWwge1xuXG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lc3BhbiBleHRlbmRzIFRpbWVJbnRlcnZhbCB7XG5cbiAgICBwdWJsaWMgZnJvbTogbnVtYmVyO1xuXG4gICAgcHVibGljIHRvOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZnJvbTogbnVtYmVyLFxuICAgICAgICB0bz86IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgICAgICBpZiAodG8pIHtcbiAgICAgICAgICAgIHRoaXMudG8gPSB0bztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG8gPSBmcm9tO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBCdWZmZXJlZFRpbWUgZXh0ZW5kcyBUaW1lSW50ZXJ2YWwge1xuICAgIHB1YmxpYyB0aW1lc3RhbXA6IERhdGU7XG4gICAgcHVibGljIGJ1ZmZlckludGVydmFsOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLFxuICAgICAgICBidWZmZXJJbnRlcnZhbDogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLmJ1ZmZlckludGVydmFsID0gYnVmZmVySW50ZXJ2YWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5cbmV4cG9ydCBlbnVtIERlZmluZWRUaW1lc3BhbiB7XG4gICAgTEFTVEhPVVIgPSAnbGFzdF9ob3VyJyxcbiAgICBUT0RBWSA9ICd0b2RheScsXG4gICAgWUVTVEVSREFZID0gJ3llc3RlcmRheScsXG4gICAgVE9EQVlfWUVTVEVSREFZID0gJ3RvZGF5X3llc3RlcmRheScsXG4gICAgQ1VSUkVOVF9XRUVLID0gJ2N1cnJlbnRfd2VlaycsXG4gICAgTEFTVF9XRUVLID0gJ2xhc3Rfd2VlaycsXG4gICAgQ1VSUkVOVF9NT05USCA9ICdjdXJyZW50X21vbnRoJyxcbiAgICBMQVNUX01PTlRIID0gJ2xhc3RfbW9udGgnLFxuICAgIENVUlJFTlRfWUVBUiA9ICdjdXJyZW50X3llYXInLFxuICAgIExBU1RfWUVBUiA9ICdsYXN0X3llYXInXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWZpbmVkVGltZXNwYW5TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgaW50ZXJ2YWxzOiBNYXA8RGVmaW5lZFRpbWVzcGFuLCAoKSA9PiBUaW1lc3Bhbj4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMuc2V0KERlZmluZWRUaW1lc3Bhbi5MQVNUSE9VUiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdob3VycycpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uVE9EQVksICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdGFydE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoKS5lbmRPZignZGF5JykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMuc2V0KERlZmluZWRUaW1lc3Bhbi5ZRVNURVJEQVksICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuZW5kT2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uVE9EQVlfWUVTVEVSREFZLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoKS5lbmRPZignZGF5JykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMuc2V0KERlZmluZWRUaW1lc3Bhbi5DVVJSRU5UX1dFRUssICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdGFydE9mKCdpc29XZWVrJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuZW5kT2YoJ2lzb1dlZWsnKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludGVydmFscy5zZXQoRGVmaW5lZFRpbWVzcGFuLkxBU1RfV0VFSywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrcycpLnN0YXJ0T2YoJ2lzb1dlZWsnKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2Vla3MnKS5lbmRPZignaXNvV2VlaycpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uQ1VSUkVOVF9NT05USCwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCgpLnN0YXJ0T2YoJ21vbnRoJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuZW5kT2YoJ21vbnRoJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMuc2V0KERlZmluZWRUaW1lc3Bhbi5MQVNUX01PTlRILCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRocycpLnN0YXJ0T2YoJ21vbnRoJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRocycpLmVuZE9mKCdtb250aCcpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzcGFuKGZyb20sIHRvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzLnNldChEZWZpbmVkVGltZXNwYW4uQ1VSUkVOVF9ZRUFSLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KCkuc3RhcnRPZigneWVhcicpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCB0byA9IG1vbWVudCgpLmVuZE9mKCd5ZWFyJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMuc2V0KERlZmluZWRUaW1lc3Bhbi5MQVNUX1lFQVIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAneWVhcnMnKS5zdGFydE9mKCd5ZWFyJykudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ3llYXJzJykuZW5kT2YoJ3llYXInKS51bml4KCkgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbnRlcnZhbChpbnRlcnZhbERlc2NyaWJlcjogRGVmaW5lZFRpbWVzcGFuKTogVGltZXNwYW4ge1xuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbHMuaGFzKGludGVydmFsRGVzY3JpYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWxzLmdldChpbnRlcnZhbERlc2NyaWJlcikoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi4vbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnVmZmVyZWRUaW1lLCBUaW1lSW50ZXJ2YWwsIFRpbWVzcGFuIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvdGltZUludGVydmFsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWUge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgY2VudGVyVGltZXNwYW4odGltZXNwYW46IFRpbWVzcGFuLCBkYXRlOiBEYXRlKTogVGltZXNwYW4ge1xuICAgICAgICBjb25zdCBoYWxmZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKHRpbWVzcGFuKS5hc01pbGxpc2Vjb25kcygpIC8gMjtcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudChkYXRlKS5zdWJ0cmFjdChoYWxmZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHRvID0gbW9tZW50KGRhdGUpLmFkZChoYWxmZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGVwQmFjayh0aW1lc3BhbjogVGltZXNwYW4pOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbih0aW1lc3Bhbik7XG4gICAgICAgIGNvbnN0IGZyb20gPSBtb21lbnQodGltZXNwYW4uZnJvbSkuc3VidHJhY3QoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHRvID0gbW9tZW50KHRpbWVzcGFuLnRvKS5zdWJ0cmFjdChkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0ZXBGb3J3YXJkKHRpbWVzcGFuOiBUaW1lc3Bhbik6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKHRpbWVzcGFuKTtcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5hZGQoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHRvID0gbW9tZW50KHRpbWVzcGFuLnRvKS5hZGQoZHVyYXRpb24pLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvdmVybGFwcyh0aW1lSW50ZXJ2YWw6IFRpbWVJbnRlcnZhbCwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRpbWVzcGFuID0gdGhpcy5jcmVhdGVUaW1lc3Bhbk9mSW50ZXJ2YWwodGltZUludGVydmFsKTtcbiAgICAgICAgaWYgKHRpbWVzcGFuLmZyb20gPD0gdG8gJiYgdGltZXNwYW4udG8gPj0gZnJvbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVUaW1lc3Bhbk9mSW50ZXJ2YWwodGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWwpOiBUaW1lc3BhbiB7XG4gICAgICAgIGlmICh0aW1lSW50ZXJ2YWwgaW5zdGFuY2VvZiBUaW1lc3Bhbikge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVJbnRlcnZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lSW50ZXJ2YWwgaW5zdGFuY2VvZiBCdWZmZXJlZFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gbW9tZW50LmR1cmF0aW9uKHRpbWVJbnRlcnZhbC5idWZmZXJJbnRlcnZhbCAvIDIpO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCh0aW1lSW50ZXJ2YWwudGltZXN0YW1wKS5zdWJ0cmFjdChkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gbW9tZW50KHRpbWVJbnRlcnZhbC50aW1lc3RhbXApLmFkZChkdXJhdGlvbikudW5peCgpICogMTAwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oZnJvbSwgdG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignV3JvbmcgdGltZSBpbnRlcnZhbCEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCdWZmZXJlZFRpbWVzcGFuKHRpbWVzcGFuOiBUaW1lc3BhbiwgZmFjdG9yOiBudW1iZXIpOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uTWlsbGlzID0gdGhpcy5nZXREdXJhdGlvbih0aW1lc3BhbikuYXNNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgY29uc3QgZnJvbSA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5zdWJ0cmFjdChkdXJhdGlvbk1pbGxpcyAqIGZhY3RvcikudW5peCgpICogMTAwMDtcbiAgICAgICAgY29uc3QgdG8gPSBtb21lbnQodGltZXNwYW4udG8pLmFkZChkdXJhdGlvbk1pbGxpcyAqIGZhY3RvcikudW5peCgpICogMTAwMDtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3Bhbihmcm9tLCB0byk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVUaW1lc3BhbihwYXJhbTogc3RyaW5nLCB0aW1lc3BhbjogVGltZXNwYW4pIHtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZShwYXJhbSwgdGltZXNwYW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkVGltZXNwYW4ocGFyYW06IHN0cmluZyk6IFRpbWVzcGFuIHtcbiAgICAgICAgY29uc3QganNvbiA9IHRoaXMubG9jYWxTdG9yYWdlLmxvYWQocGFyYW0pO1xuICAgICAgICBpZiAoanNvbikge1xuICAgICAgICAgICAgcmV0dXJuIHBsYWluVG9DbGFzczxUaW1lc3Bhbiwgb2JqZWN0PihUaW1lc3BhbiwganNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRUaW1lc3BhbigpOiBUaW1lc3BhbiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KG5vdykuc3RhcnRPZignZGF5JykudW5peCgpICogMTAwMDtcbiAgICAgICAgY29uc3QgZW5kID0gbW9tZW50KG5vdykuZW5kT2YoJ2RheScpLnVuaXgoKSAqIDEwMDA7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXNwYW4oc3RhcnQsIGVuZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREdXJhdGlvbih0aW1lc3BhbjogVGltZXNwYW4pOiBtb21lbnQuRHVyYXRpb24ge1xuICAgICAgICBjb25zdCBmcm9tID0gbW9tZW50KHRpbWVzcGFuLmZyb20pO1xuICAgICAgICBjb25zdCB0byA9IG1vbWVudCh0aW1lc3Bhbi50byk7XG4gICAgICAgIHJldHVybiBtb21lbnQuZHVyYXRpb24odG8uZGlmZihmcm9tKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4vY29sb3IvY29sb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpTWFwcGluZyB9IGZyb20gJy4vZGF0YXNldC1hcGkvYXBpLW1hcHBpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0dXNJbnRlcnZhbFJlc29sdmVyU2VydmljZSB9IGZyb20gJy4vZGF0YXNldC1hcGkvaGVscGVyL3N0YXR1cy1pbnRlcnZhbC1yZXNvbHZlci5zZXJ2aWNlJztcbmltcG9ydCB7IEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnLi9kYXRhc2V0LWFwaS9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmllclNlcnZpY2UgfSBmcm9tICcuL25vdGlmaWVyL25vdGlmaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZVByb3h5UGlwZSB9IGZyb20gJy4vcGlwZXMvZGF0ZXByb3h5L2RhdGVwcm94eS5waXBlJztcbmltcG9ydCB7IERlZmluZWRUaW1lc3BhblNlcnZpY2UgfSBmcm9tICcuL3RpbWUvZGVmaW5lZC10aW1lc3Bhbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWUgfSBmcm9tICcuL3RpbWUvdGltZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGF0ZVByb3h5UGlwZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGF0ZVByb3h5UGlwZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb2xvclNlcnZpY2UsXG4gICAgRGF0YXNldEFwaU1hcHBpbmcsXG4gICAgRGVmaW5lZFRpbWVzcGFuU2VydmljZSxcbiAgICBJbnRlcm5hbElkSGFuZGxlcixcbiAgICBMb2NhbFN0b3JhZ2UsXG4gICAgTm90aWZpZXJTZXJ2aWNlLFxuICAgIFN0YXR1c0ludGVydmFsUmVzb2x2ZXJTZXJ2aWNlLFxuICAgIFRpbWVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBIZWxnb2xhbmRDb3JlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwaUludGVyZmFjZSB7XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmVxdWVzdFVybChhcGlVcmw6IHN0cmluZywgZW5kcG9pbnQ6IHN0cmluZywgaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayB3aGV0aGVyIGFwaVVybCBlbmRzIHdpdGggc2xhc2hcbiAgICAgICAgbGV0IHJlcXVlc3RVcmwgPSBhcGlVcmwgKyBlbmRwb2ludDtcbiAgICAgICAgaWYgKGlkKSB7IHJlcXVlc3RVcmwgKz0gJy8nICsgaWQ7IH1cbiAgICAgICAgcmV0dXJuIHJlcXVlc3RVcmw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJKG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5mb3JtYXQoKSArICcvJyArIG1vbWVudCh0aW1lc3Bhbi50bykuZm9ybWF0KCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVCYXNpY0F1dGhIZWFkZXIodG9rZW46IHN0cmluZyk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICBpZiAodG9rZW4pIHsgcmV0dXJuIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgdG9rZW4pOyB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgRGF0YXNldE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9vcHRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFzZXRTZXJ2aWNlPFQgZXh0ZW5kcyBEYXRhc2V0T3B0aW9ucyB8IERhdGFzZXRPcHRpb25zW10+IHtcblxuICAgIHB1YmxpYyBkYXRhc2V0SWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgcHVibGljIGRhdGFzZXRPcHRpb25zOiBNYXA8c3RyaW5nLCBUPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBhZGREYXRhc2V0KGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9ucz86IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldElkcy5pbmRleE9mKGludGVybmFsSWQpIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnB1c2goaW50ZXJuYWxJZCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2V0KGludGVybmFsSWQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCB0aGlzLmNyZWF0ZVN0eWxlcyhpbnRlcm5hbElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9ICh0aGlzLmRhdGFzZXRPcHRpb25zLmdldChpbnRlcm5hbElkKSBhcyBEYXRhc2V0T3B0aW9uc1tdKTtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4gdGVtcC5wdXNoKGUpKTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWxsRGF0YXNldHMoKSB7XG4gICAgICAgIHRoaXMuZGF0YXNldElkcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURhdGFzZXQoaW50ZXJuYWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRJZHggPSB0aGlzLmRhdGFzZXRJZHMuaW5kZXhPZihpbnRlcm5hbElkKTtcbiAgICAgICAgaWYgKGRhdGFzZXRJZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnNwbGljZShkYXRhc2V0SWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuZGVsZXRlKGludGVybmFsSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc0RhdGFzZXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0SWRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZURhdGFzZXRPcHRpb25zKG9wdGlvbnM6IFQsIGludGVybmFsSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zLnNldChpbnRlcm5hbElkLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlU3R5bGVzKGludGVybmFsSWQ6IHN0cmluZyk6IFQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2F2ZVN0YXRlKCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbG9hZFN0YXRlKCk6IHZvaWQ7XG5cbn1cbiIsImltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UgfSBmcm9tICcuLi9kYXRhc2V0LWFwaS9hcGktaW50ZXJmYWNlJztcbmltcG9ydCB7IEJhclJlbmRlcmluZ0hpbnRzLCBJRGF0YXNldCwgTGluZVJlbmRlcmluZ0hpbnRzIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YXNldCc7XG5pbXBvcnQgeyBEYXRhc2V0T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL29wdGlvbnMnO1xuaW1wb3J0IHsgRGF0YXNldFNlcnZpY2UgfSBmcm9tICcuL2RhdGFzZXQuc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJpbmdIaW50c0RhdGFzZXRTZXJ2aWNlPFQgZXh0ZW5kcyBEYXRhc2V0T3B0aW9ucyB8IERhdGFzZXRPcHRpb25zW10+IGV4dGVuZHMgRGF0YXNldFNlcnZpY2U8VD4ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcsIG9wdGlvbnM/OiBUKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRJZHMucHVzaChpbnRlcm5hbElkKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuc2V0KGludGVybmFsSWQsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YXNldElkcy5pbmRleE9mKGludGVybmFsSWQpIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5hcGkuZ2V0U2luZ2xlVGltZXNlcmllc0J5SW50ZXJuYWxJZChpbnRlcm5hbElkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHRpbWVzZXJpZXMpID0+IHRoaXMuYWRkTG9hZGVkRGF0YXNldCh0aW1lc2VyaWVzKSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZ2V0RGF0YXNldEJ5SW50ZXJuYWxJZChpbnRlcm5hbElkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YXNldCkgPT4gdGhpcy5hZGRMb2FkZWREYXRhc2V0KGRhdGFzZXQpLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZExvYWRlZERhdGFzZXQoZGF0YXNldDogSURhdGFzZXQpIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0SWRzLnB1c2goZGF0YXNldC5pbnRlcm5hbElkKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0T3B0aW9ucy5zZXQoZGF0YXNldC5pbnRlcm5hbElkLCB0aGlzLmNyZWF0ZU9wdGlvbnNPZlJlbmRlcmluZ0hpbnRzKGRhdGFzZXQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU9wdGlvbnNPZlJlbmRlcmluZ0hpbnRzKGRhdGFzZXQ6IElEYXRhc2V0KTogVCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZVN0eWxlcyhkYXRhc2V0LmludGVybmFsSWQpIGFzIERhdGFzZXRPcHRpb25zO1xuICAgICAgICBpZiAoZGF0YXNldC5yZW5kZXJpbmdIaW50cykge1xuICAgICAgICAgICAgaWYgKGRhdGFzZXQucmVuZGVyaW5nSGludHMucHJvcGVydGllcyAmJiBkYXRhc2V0LnJlbmRlcmluZ0hpbnRzLnByb3BlcnRpZXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvbG9yID0gZGF0YXNldC5yZW5kZXJpbmdIaW50cy5wcm9wZXJ0aWVzLmNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChkYXRhc2V0LnJlbmRlcmluZ0hpbnRzLmNoYXJ0VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUxpbmVSZW5kZXJpbmdIaW50cyhkYXRhc2V0LnJlbmRlcmluZ0hpbnRzIGFzIExpbmVSZW5kZXJpbmdIaW50cywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Jhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQmFyUmVuZGVyaW5nSGludHMoZGF0YXNldC5yZW5kZXJpbmdIaW50cyBhcyBCYXJSZW5kZXJpbmdIaW50cywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zIGFzIFQ7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGhhbmRsZUxpbmVSZW5kZXJpbmdIaW50cyhsaW5lSGludHM6IExpbmVSZW5kZXJpbmdIaW50cywgb3B0aW9uczogRGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGxpbmVIaW50cy5wcm9wZXJ0aWVzLndpZHRoKSB7XG4gICAgICAgICAgICBvcHRpb25zLmxpbmVXaWR0aCA9IE1hdGgucm91bmQocGFyc2VGbG9hdChsaW5lSGludHMucHJvcGVydGllcy53aWR0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVCYXJSZW5kZXJpbmdIaW50cyhiYXJIaW50czogQmFyUmVuZGVyaW5nSGludHMsIG9wdGlvbnM6IERhdGFzZXRPcHRpb25zKSB7XG4gICAgICAgIGlmIChiYXJIaW50cy5wcm9wZXJ0aWVzLndpZHRoKSB7XG4gICAgICAgICAgICBvcHRpb25zLmxpbmVXaWR0aCA9IE1hdGgucm91bmQocGFyc2VGbG9hdChiYXJIaW50cy5wcm9wZXJ0aWVzLndpZHRoKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwUGFyYW1ldGVyQ29kZWMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFwaUludGVyZmFjZSB9IGZyb20gJy4uL2Fic3RyYWN0LXNlcnZpY2VzL2FwaS1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9jYXRlZ29yeSc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBUaW1lc2VyaWVzLCBUaW1lc2VyaWVzRGF0YSwgVGltZXNlcmllc0V4dHJhcyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2ZlYXR1cmUnO1xuaW1wb3J0IHsgT2ZmZXJpbmcgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9vZmZlcmluZyc7XG5pbXBvcnQgeyBQaGVub21lbm9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcGhlbm9tZW5vbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3BsYXRmb3JtJztcbmltcG9ydCB7IFByb2NlZHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3Byb2NlZHVyZSc7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbic7XG5pbXBvcnQgeyBEYXRhUGFyYW1ldGVyRmlsdGVyLCBIdHRwUmVxdWVzdE9wdGlvbnMsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhc2V0QXBpVjIgfSBmcm9tICcuL2ludGVyZmFjZXMvYXBpLXYyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBVcmlQYXJhbWV0ZXJDb2RlciBpbXBsZW1lbnRzIEh0dHBQYXJhbWV0ZXJDb2RlYyB7XG5cbiAgICBwdWJsaWMgZW5jb2RlS2V5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmNvZGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlY29kZUtleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlY29kZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YXNldEFwaUludGVyZmFjZSBleHRlbmRzIEFwaUludGVyZmFjZSBpbXBsZW1lbnRzIERhdGFzZXRBcGlWMiB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkgeyBzdXBlcigpOyB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UGxhdGZvcm1zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBsYXRmb3JtW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQbGF0Zm9ybShpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQbGF0Zm9ybT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGFzZXRzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXRbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGFzZXQoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldD47XG4gICAgcHVibGljIGFic3RyYWN0IGdldERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXQ+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXREYXRhPFQ+KGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCB0aW1lc3BhbjogVGltZXNwYW4sIHBhcmFtcz86IERhdGFQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGE8VD4+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTZXJ2aWNlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTZXJ2aWNlKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFNlcnZpY2U+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTdGF0aW9ucyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTdGF0aW9uW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTdGF0aW9uKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFN0YXRpb24+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRUaW1lc2VyaWVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFRpbWVzZXJpZXNEYXRhKGFwaVVybDogc3RyaW5nLCBpZHM6IHN0cmluZ1tdLCB0aW1lc3BhbjogVGltZXNwYW4sIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNEYXRhW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTaW5nbGVUaW1lc2VyaWVzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTaW5nbGVUaW1lc2VyaWVzQnlJbnRlcm5hbElkKGludGVybmFsSWQ6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUaW1lc2VyaWVzPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VGltZXNlcmllc0V4dHJhcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8VGltZXNlcmllc0V4dHJhcz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFRzRGF0YTxUPihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgdGltZXNwYW46IFRpbWVzcGFuLCBwYXJhbXM/OiBEYXRhUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Q2F0ZWdvcmllcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxDYXRlZ29yeVtdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Q2F0ZWdvcnkoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Q2F0ZWdvcnk+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQaGVub21lbmEoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGhlbm9tZW5vbltdPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0UGhlbm9tZW5vbihpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxQaGVub21lbm9uPjtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0T2ZmZXJpbmdzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRPZmZlcmluZyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxPZmZlcmluZz47XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZlYXR1cmVzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPEZlYXR1cmVbXT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZlYXR1cmUoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZT47XG4gICAgcHVibGljIGFic3RyYWN0IGdldFByb2NlZHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlW10+O1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRQcm9jZWR1cmUoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlPjtcblxuICAgIHByb3RlY3RlZCByZXF1ZXN0QXBpPFQ+KFxuICAgICAgICB1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge31cbiAgICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuY2xpZW50KG9wdGlvbnMpLmdldDxUPih1cmwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnByZXBhcmVQYXJhbXMocGFyYW1zKSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmNyZWF0ZUJhc2ljQXV0aEhlYWRlcihvcHRpb25zLmJhc2ljQXV0aFRva2VuKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcmVwYXJlUGFyYW1zKHBhcmFtczogUGFyYW1ldGVyRmlsdGVyKTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZSAmJiB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZykge1xuICAgICAgICAgICAgcGFyYW1zLmxvY2FsZSA9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe1xuICAgICAgICAgICAgZW5jb2RlcjogbmV3IFVyaVBhcmFtZXRlckNvZGVyKClcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHBhcmFtcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrZXksIHBhcmFtc1trZXldKSk7XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERhdGFzZXRUeXBlcywgUGxhdGZvcm1UeXBlcyB9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnLi9wYXJhbWV0ZXInO1xuaW1wb3J0IHsgU3RhdGlvbiB9IGZyb20gJy4vc3RhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFzZXQgZXh0ZW5kcyBQYXJhbWV0ZXIge1xuICAgIHVybDogc3RyaW5nO1xuICAgIHVvbTogc3RyaW5nO1xuICAgIGludGVybmFsSWQ6IHN0cmluZztcbiAgICBmaXJzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICBsYXN0VmFsdWU6IEZpcnN0TGFzdFZhbHVlO1xuICAgIHJlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVbXTtcbiAgICBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJDb25zdGVsbGF0aW9uO1xuICAgIHJlbmRlcmluZ0hpbnRzOiBSZW5kZXJpbmdIaW50cztcbn1cblxuZXhwb3J0IGNsYXNzIFBhcmFtZXRlckNvbnN0ZWxsYXRpb24ge1xuICAgIHB1YmxpYyBzZXJ2aWNlOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIG9mZmVyaW5nOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIGZlYXR1cmU6IFBhcmFtZXRlcjtcbiAgICBwdWJsaWMgcHJvY2VkdXJlOiBQYXJhbWV0ZXI7XG4gICAgcHVibGljIHBoZW5vbWVub246IFBhcmFtZXRlcjtcbiAgICBwdWJsaWMgY2F0ZWdvcnk6IFBhcmFtZXRlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEZpcnN0TGFzdFZhbHVlIHtcbiAgICBwdWJsaWMgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgcHVibGljIHZhbHVlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VWYWx1ZSB7XG4gICAgcHVibGljIHJlZmVyZW5jZVZhbHVlSWQ6IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwdWJsaWMgbGFzdFZhbHVlOiBGaXJzdExhc3RWYWx1ZTtcbiAgICBwdWJsaWMgY29sb3I/OiBzdHJpbmc7XG4gICAgcHVibGljIHZpc2libGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlcmluZ0hpbnRzIHtcbiAgICBjaGFydFR5cGU6IHN0cmluZztcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaW5lUmVuZGVyaW5nSGludHMgZXh0ZW5kcyBSZW5kZXJpbmdIaW50cyB7XG4gICAgY2hhcnRUeXBlOiAnbGluZSc7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgICAgICB3aWR0aDogc3RyaW5nO1xuICAgICAgICBsaW5lVHlwZTogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFyUmVuZGVyaW5nSGludHMge1xuICAgIGNoYXJ0VHlwZTogJ2Jhcic7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgICAgICB3aWR0aDogc3RyaW5nO1xuICAgICAgICBpbnRlcnZhbDogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhc2V0UGFyYW1ldGVyQ29uc3RlbGxhdGlvbiBleHRlbmRzIFBhcmFtZXRlckNvbnN0ZWxsYXRpb24ge1xuICAgIHB1YmxpYyBwbGF0Zm9ybTogUGxhdGZvcm1QYXJhbWV0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhc2V0IGltcGxlbWVudHMgSURhdGFzZXQge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgdW9tOiBzdHJpbmc7XG4gICAgcHVibGljIGludGVybmFsSWQ6IHN0cmluZztcbiAgICBwdWJsaWMgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIHJlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVbXTtcbiAgICBwdWJsaWMgZGF0YXNldFR5cGU6IERhdGFzZXRUeXBlcztcbiAgICBwdWJsaWMgcGxhdGZvcm1UeXBlOiBQbGF0Zm9ybVR5cGVzO1xuICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiBEYXRhc2V0UGFyYW1ldGVyQ29uc3RlbGxhdGlvbjtcbiAgICBwdWJsaWMgc2VyaWVzUGFyYW1ldGVycz86IERhdGFzZXRQYXJhbWV0ZXJDb25zdGVsbGF0aW9uO1xuICAgIHB1YmxpYyByZW5kZXJpbmdIaW50czogUmVuZGVyaW5nSGludHM7XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lc2VyaWVzIGltcGxlbWVudHMgSURhdGFzZXQge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgdW9tOiBzdHJpbmc7XG4gICAgcHVibGljIGludGVybmFsSWQ6IHN0cmluZztcbiAgICBwdWJsaWMgZmlyc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIGxhc3RWYWx1ZTogRmlyc3RMYXN0VmFsdWU7XG4gICAgcHVibGljIHJlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVbXTtcbiAgICBwdWJsaWMgc3RhdGlvbjogU3RhdGlvbjtcbiAgICBwdWJsaWMgcGFyYW1ldGVyczogUGFyYW1ldGVyQ29uc3RlbGxhdGlvbjtcbiAgICBwdWJsaWMgc3RhdHVzSW50ZXJ2YWxzPzogU3RhdHVzSW50ZXJ2YWxbXTtcbiAgICBwdWJsaWMgaGFzRGF0YSA9IGZhbHNlO1xuICAgIHB1YmxpYyByZW5kZXJpbmdIaW50czogUmVuZGVyaW5nSGludHM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZXNlcmllc0V4dHJhcyB7XG4gICAgbGljZW5zZT86IHN0cmluZztcbiAgICBzdGF0dXNJbnRlcnZhbHM/OiBTdGF0dXNJbnRlcnZhbFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXR1c0ludGVydmFsIHtcbiAgICBsb3dlcjogc3RyaW5nO1xuICAgIHVwcGVyOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNvbG9yOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxhdGZvcm1QYXJhbWV0ZXIgZXh0ZW5kcyBQYXJhbWV0ZXIge1xuICAgIHBsYXRmb3JtVHlwZTogUGxhdGZvcm1UeXBlcztcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXNEYXRhIHtcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIGRhdGE6IEZpcnN0TGFzdFZhbHVlW107XG59XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuXG5leHBvcnQgY29uc3QgSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIdHRwU2VydmljZUludGVyY2VwdG9yPignSFRUUF9TRVJWSUNFX0lOVEVSQ0VQVE9SUycpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBTZXJ2aWNlSGFuZGxlciB7XG4gICAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Piwgb3B0aW9uczogUGFydGlhbDxIdHRwUmVxdWVzdE9wdGlvbnM+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFNlcnZpY2VJbnRlcmNlcHRvciB7XG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55Piwgb3B0aW9uczogUGFydGlhbDxIdHRwUmVxdWVzdE9wdGlvbnM+LCBuZXh0OiBIdHRwU2VydmljZUhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pjtcbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBIdHRwU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGhhbmRsZXI6IEh0dHBTZXJ2aWNlSGFuZGxlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cEhhbmRsZXI6IEh0dHBIYW5kbGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEhUVFBfU0VSVklDRV9JTlRFUkNFUFRPUlMpIGludGVyY2VwdG9yczogSHR0cFNlcnZpY2VJbnRlcmNlcHRvcltdIHwgbnVsbFxuICAgICkge1xuICAgICAgICBsZXQgaGFuZGxlcjogSHR0cFNlcnZpY2VIYW5kbGVyID0ge1xuICAgICAgICAgICAgaGFuZGxlOiAocmVxLCBvcHRpb25zKSA9PiBodHRwSGFuZGxlci5oYW5kbGUocmVxKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaW50ZXJjZXB0b3JzKSB7XG4gICAgICAgICAgICBoYW5kbGVyID0gaW50ZXJjZXB0b3JzLnJlZHVjZVJpZ2h0KChuZXh0LCBpbnRlcmNlcHRvcikgPT4gKHtcbiAgICAgICAgICAgICAgICBoYW5kbGU6IChyZXEsIG9wdGlvbnMpID0+IGludGVyY2VwdG9yLmludGVyY2VwdChyZXEsIG9wdGlvbnMsIG5leHQpXG4gICAgICAgICAgICB9KSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpZW50KG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogSHR0cENsaWVudCB7XG4gICAgICAgIHJldHVybiBuZXcgSHR0cENsaWVudCh7XG4gICAgICAgICAgICBoYW5kbGU6IChyZXEpID0+IHRoaXMuaGFuZGxlci5oYW5kbGUocmVxLCBvcHRpb25zKVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IGRlc2VyaWFsaXplLCBkZXNlcmlhbGl6ZUFycmF5IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9jYXRlZ29yeSc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBUaW1lc2VyaWVzLCBUaW1lc2VyaWVzRGF0YSwgVGltZXNlcmllc0V4dHJhcyB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGFzZXQnO1xuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2ZlYXR1cmUnO1xuaW1wb3J0IHsgT2ZmZXJpbmcgfSBmcm9tICcuLi9tb2RlbC9kYXRhc2V0LWFwaS9vZmZlcmluZyc7XG5pbXBvcnQgeyBQaGVub21lbm9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvcGhlbm9tZW5vbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3BsYXRmb3JtJztcbmltcG9ydCB7IFByb2NlZHVyZSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL3Byb2NlZHVyZSc7XG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvc3RhdGlvbic7XG5pbXBvcnQgeyBEYXRhUGFyYW1ldGVyRmlsdGVyLCBIdHRwUmVxdWVzdE9wdGlvbnMsIFBhcmFtZXRlckZpbHRlciB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL2h0dHAtcmVxdWVzdHMnO1xuaW1wb3J0IHsgVGltZXNwYW4gfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC90aW1lSW50ZXJ2YWwnO1xuaW1wb3J0IHsgRGF0YXNldEFwaUludGVyZmFjZSB9IGZyb20gJy4vYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnLi9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YXNldEltcGxBcGlJbnRlcmZhY2UgZXh0ZW5kcyBEYXRhc2V0QXBpSW50ZXJmYWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cHNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxEYXRhc2V0SWQ6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGh0dHBzZXJ2aWNlLCB0cmFuc2xhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXJ2aWNlcyhhcGlVcmw6IHN0cmluZywgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLCBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxTZXJ2aWNlW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3NlcnZpY2VzJyk7XG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7IGV4cGFuZGVkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTZXJ2aWNlW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IGVudHJ5LmFwaVVybCA9IGFwaVVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VydmljZShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8U2VydmljZT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnc2VydmljZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8U2VydmljZT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hcGlVcmwgPSBhcGlVcmw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3RhdGlvbnMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8U3RhdGlvbltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzdGF0aW9ucycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFN0YXRpb25bXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdGF0aW9uKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxTdGF0aW9uPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdzdGF0aW9ucycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxTdGF0aW9uPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVzZXJpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VGltZXNlcmllc1tdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzJyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUaW1lc2VyaWVzW10+KChvYnNlcnZlcjogT2JzZXJ2ZXI8VGltZXNlcmllc1tdPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QXBpVGV4dGVkKHVybCwgcGFyYW1zLCBvcHRpb25zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lc2VyaWVzTGlzdCA9IGRlc2VyaWFsaXplQXJyYXk8VGltZXNlcmllcz4oVGltZXNlcmllcywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZXNlcmllc0xpc3QuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnVybCA9IGFwaVVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQuZ2VuZXJhdGVJbnRlcm5hbElkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGltZXNlcmllc0xpc3QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiBvYnNlcnZlci5lcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgKCkgPT4gb2JzZXJ2ZXIuY29tcGxldGUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVzZXJpZXNEYXRhKGFwaVVybDogc3RyaW5nLCBpZHM6IHN0cmluZ1tdLCB0aW1lc3BhbjogVGltZXNwYW4sIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNEYXRhW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMvZ2V0RGF0YScpO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8VGltZXNlcmllc0RhdGFbXT4oKG9ic2VydmVyOiBPYnNlcnZlcjxPYmplY3Q+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RBcGlUZXh0ZWRQb3N0KHVybCwge1xuICAgICAgICAgICAgICAgIHRpbWVzcGFuOiB0aGlzLmNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbiksXG4gICAgICAgICAgICAgICAgdGltZXNlcmllczogaWRzXG4gICAgICAgICAgICB9LCBvcHRpb25zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lc2VyaWVzTGlzdDogVGltZXNlcmllc0RhdGFbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXNlcmllc0xpc3QucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRbaWRdLnZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRpbWVzZXJpZXNMaXN0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IG9ic2VydmVyLmNvbXBsZXRlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaW5nbGVUaW1lc2VyaWVzKGlkOiBzdHJpbmcsIGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGlUZXh0ZWQodXJsLCBwYXJhbXMpLnBpcGUobWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzZXJpZXMgPSBkZXNlcmlhbGl6ZTxUaW1lc2VyaWVzPihUaW1lc2VyaWVzLCByZXN1bHQpO1xuICAgICAgICAgICAgdGltZXNlcmllcy51cmwgPSBhcGlVcmw7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsRGF0YXNldElkLmdlbmVyYXRlSW50ZXJuYWxJZCh0aW1lc2VyaWVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aW1lc2VyaWVzO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNpbmdsZVRpbWVzZXJpZXNCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXM+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRJZCA9IHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQucmVzb2x2ZUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpbmdsZVRpbWVzZXJpZXMocmVzb2x2ZWRJZC5pZCwgcmVzb2x2ZWRJZC51cmwsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVzZXJpZXNFeHRyYXMoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRpbWVzZXJpZXNFeHRyYXM+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3RpbWVzZXJpZXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8VGltZXNlcmllc0V4dHJhcz4odXJsICsgJy9leHRyYXMnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHNEYXRhPFQ+KFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgdGltZXNwYW46IFRpbWVzcGFuLFxuICAgICAgICBwYXJhbXM6IERhdGFQYXJhbWV0ZXJGaWx0ZXIgPSB7fSxcbiAgICAgICAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICd0aW1lc2VyaWVzJywgaWQpICsgJy9nZXREYXRhJztcbiAgICAgICAgcGFyYW1zLnRpbWVzcGFuID0gdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGE8VD4+KHVybCwgcGFyYW1zLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZXhwYW5kZWQpIHsgcmVzID0gcmVzW2lkXTsgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhdGVnb3JpZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8Q2F0ZWdvcnlbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnY2F0ZWdvcmllcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPENhdGVnb3J5W10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcnkoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcik6IE9ic2VydmFibGU8Q2F0ZWdvcnk+IHtcbiAgICAgICAgLy8gY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2NhdGVnb3JpZXMnLCBpZCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLnJlcXVlc3RBcGkodXJsLCBwYXJhbXMpXG4gICAgICAgIC8vICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQaGVub21lbmEoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UGhlbm9tZW5vbltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwaGVub21lbmEnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQaGVub21lbm9uW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGhlbm9tZW5vbihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXBpVXJsOiBzdHJpbmcsXG4gICAgICAgIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlcixcbiAgICAgICAgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8UGhlbm9tZW5vbj4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncGhlbm9tZW5hJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFBoZW5vbWVub24+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T2ZmZXJpbmdzKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPE9mZmVyaW5nW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ29mZmVyaW5ncycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPE9mZmVyaW5nW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T2ZmZXJpbmcoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPE9mZmVyaW5nPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdvZmZlcmluZ3MnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8T2ZmZXJpbmc+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RmVhdHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RmVhdHVyZVtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdmZWF0dXJlcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPEZlYXR1cmVbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGZWF0dXJlKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgcGFyYW1zPzogUGFyYW1ldGVyRmlsdGVyLFxuICAgICAgICBvcHRpb25zPzogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdmZWF0dXJlcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxGZWF0dXJlPih1cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2NlZHVyZXMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UHJvY2VkdXJlW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3Byb2NlZHVyZXMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQcm9jZWR1cmVbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9jZWR1cmUoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFByb2NlZHVyZT4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAncHJvY2VkdXJlcycsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFwaTxQcm9jZWR1cmU+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxhdGZvcm1zKGFwaVVybDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFBsYXRmb3JtW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ3BsYXRmb3JtcycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPFBsYXRmb3JtW10+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGxhdGZvcm0oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsXG4gICAgICAgIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPFBsYXRmb3JtPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdwbGF0Zm9ybXMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8UGxhdGZvcm0+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YXNldHMoYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldFtdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlUmVxdWVzdFVybChhcGlVcmwsICdkYXRhc2V0cycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGFzZXRbXT4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGxpc3QpID0+IGxpc3QubWFwKChlbnRyeSkgPT4gdGhpcy5wcmVwYXJlRGF0YXNldChlbnRyeSwgYXBpVXJsKSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGFzZXQoaWQ6IHN0cmluZywgYXBpVXJsOiBzdHJpbmcsIHBhcmFtcz86IFBhcmFtZXRlckZpbHRlciwgb3B0aW9ucz86IEh0dHBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8RGF0YXNldD4ge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVJlcXVlc3RVcmwoYXBpVXJsLCAnZGF0YXNldHMnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RBcGk8RGF0YXNldD4odXJsLCBwYXJhbXMsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlcykgPT4gdGhpcy5wcmVwYXJlRGF0YXNldChyZXMsIGFwaVVybCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGFzZXRCeUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nLCBwYXJhbXM/OiBQYXJhbWV0ZXJGaWx0ZXIsIG9wdGlvbnM/OiBIdHRwUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPERhdGFzZXQ+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRJZCA9IHRoaXMuaW50ZXJuYWxEYXRhc2V0SWQucmVzb2x2ZUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGFzZXQocmVzb2x2ZWRJZC5pZCwgcmVzb2x2ZWRJZC51cmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGE8VD4oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGFwaVVybDogc3RyaW5nLFxuICAgICAgICB0aW1lc3BhbjogVGltZXNwYW4sXG4gICAgICAgIHBhcmFtczogRGF0YVBhcmFtZXRlckZpbHRlciA9IHt9LFxuICAgICAgICBvcHRpb25zOiBIdHRwUmVxdWVzdE9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPERhdGE8VD4+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVSZXF1ZXN0VXJsKGFwaVVybCwgJ2RhdGFzZXRzJywgaWQpICsgJy9kYXRhJztcbiAgICAgICAgcGFyYW1zLnRpbWVzcGFuID0gdGhpcy5jcmVhdGVSZXF1ZXN0VGltZXNwYW4odGltZXNwYW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXBpPERhdGE8VD4+KHVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgZ2V0R2VvbWV0cmllcyhpZDogc3RyaW5nLCBhcGlVcmw6IHN0cmluZywgcGFyYW1zPyk6IE9ic2VydmFibGU8PiB7XG4gICAgLy8gICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgLy8gfVxuXG4gICAgLy8gcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3RUaW1lc3Bhbih0aW1lc3BhbjogVGltZXNwYW4pOiBzdHJpbmcge1xuICAgIC8vICAgICByZXR1cm4gZW5jb2RlVVJJKG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5mb3JtYXQoKSArICcvJyArIG1vbWVudCh0aW1lc3Bhbi50bykuZm9ybWF0KCkpO1xuICAgIC8vIH1cblxuICAgIHByaXZhdGUgcmVxdWVzdEFwaVRleHRlZCh1cmw6IHN0cmluZywgcGFyYW1zOiBQYXJhbWV0ZXJGaWx0ZXIgPSB7fSwgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwc2VydmljZS5jbGllbnQob3B0aW9ucykuZ2V0KHVybCwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnByZXBhcmVQYXJhbXMocGFyYW1zKSxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ3RleHQnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVxdWVzdEFwaVRleHRlZFBvc3QodXJsOiBzdHJpbmcsIHBhcmFtczogUGFyYW1ldGVyRmlsdGVyID0ge30sIG9wdGlvbnM6IEh0dHBSZXF1ZXN0T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cHNlcnZpY2UuY2xpZW50KCkucG9zdCh1cmwsIHBhcmFtcywge1xuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbidcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlRGF0YXNldChkYXRhc2V0T2JqOiBEYXRhc2V0LCBhcGlVcmw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gZGVzZXJpYWxpemU8RGF0YXNldD4oRGF0YXNldCwgSlNPTi5zdHJpbmdpZnkoZGF0YXNldE9iaikpO1xuICAgICAgICBkYXRhc2V0LnVybCA9IGFwaVVybDtcbiAgICAgICAgdGhpcy5pbnRlcm5hbERhdGFzZXRJZC5nZW5lcmF0ZUludGVybmFsSWQoZGF0YXNldCk7XG4gICAgICAgIGlmIChkYXRhc2V0LnNlcmllc1BhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIGRhdGFzZXQucGFyYW1ldGVycyA9IGRhdGFzZXQuc2VyaWVzUGFyYW1ldGVycztcbiAgICAgICAgICAgIGRlbGV0ZSBkYXRhc2V0LnNlcmllc1BhcmFtZXRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4uL21vZGVsL2RhdGFzZXQtYXBpL2RhdGEnO1xuaW1wb3J0IHsgRGF0YVBhcmFtZXRlckZpbHRlciwgSHR0cFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvaHR0cC1yZXF1ZXN0cyc7XG5pbXBvcnQgeyBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBEYXRhc2V0SW1wbEFwaUludGVyZmFjZSB9IGZyb20gJy4vZGF0YXNldC1pbXBsLWFwaS1pbnRlcmZhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnLi9pbnRlcm5hbC1pZC1oYW5kbGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3BsaXR0ZWREYXRhRGF0YXNldEFwaUludGVyZmFjZSBleHRlbmRzIERhdGFzZXRJbXBsQXBpSW50ZXJmYWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaHR0cHNlcnZpY2U6IEh0dHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxEYXRhc2V0SWQ6IEludGVybmFsSWRIYW5kbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGh0dHBzZXJ2aWNlLCBpbnRlcm5hbERhdGFzZXRJZCwgdHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHNEYXRhPFQ+KFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBhcGlVcmw6IHN0cmluZyxcbiAgICAgICAgdGltZXNwYW46IFRpbWVzcGFuLFxuICAgICAgICBwYXJhbXM6IERhdGFQYXJhbWV0ZXJGaWx0ZXIgPSB7fSxcbiAgICAgICAgb3B0aW9uczogSHR0cFJlcXVlc3RPcHRpb25zXG4gICAgKTogT2JzZXJ2YWJsZTxEYXRhPFQ+PiB7XG4gICAgICAgIGNvbnN0IG1heFRpbWVFeHRlbnQgPSBtb21lbnQuZHVyYXRpb24oMSwgJ3llYXInKS5hc01pbGxpc2Vjb25kcygpO1xuICAgICAgICBpZiAoKHRpbWVzcGFuLnRvIC0gdGltZXNwYW4uZnJvbSkgPiBtYXhUaW1lRXh0ZW50KSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0czogQXJyYXk8T2JzZXJ2YWJsZTxEYXRhPFQ+Pj4gPSBbXTtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IG1vbWVudCh0aW1lc3Bhbi5mcm9tKS5zdGFydE9mKCd5ZWFyJyk7XG4gICAgICAgICAgICBsZXQgZW5kID0gbW9tZW50KHRpbWVzcGFuLmZyb20pLmVuZE9mKCd5ZWFyJyk7XG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuaXNCZWZvcmUobW9tZW50KHRpbWVzcGFuLnRvKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVua1NwYW4gPSBuZXcgVGltZXNwYW4oc3RhcnQudW5peCgpICogMTAwMCwgZW5kLnVuaXgoKSAqIDEwMDApO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RzLnB1c2goc3VwZXIuZ2V0VHNEYXRhPFQ+KGlkLCBhcGlVcmwsIGNodW5rU3BhbiwgcGFyYW1zLCBvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQuYWRkKDEsICdtaWxsaXNlY29uZCcpO1xuICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudChzdGFydCkuZW5kT2YoJ3llYXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihyZXF1ZXN0cykucGlwZShtYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5LnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dDogRGF0YTxUPiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZVZhbHVlczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHByZXZpb3VzLnZhbHVlcy5jb25jYXQoY3VycmVudC52YWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByZXZpb3VzLnJlZmVyZW5jZVZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzLnJlZmVyZW5jZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5yZWZlcmVuY2VWYWx1ZXNba2V5XSA9IHByZXZpb3VzLnJlZmVyZW5jZVZhbHVlc1trZXldLmNvbmNhdChjdXJyZW50LnJlZmVyZW5jZVZhbHVlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5nZXRUc0RhdGE8VD4oaWQsIGFwaVVybCwgdGltZXNwYW4sIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExhbmd1YWdlQ2hhbmdOb3RpZmllciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMubGFuZ3VhZ2VDaGFuZ2VkKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBsYW5ndWFnZUNoYW5nZWQoKTogdm9pZDtcblxufVxuIiwiaW1wb3J0IHsgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBMYW5ndWFnZSB9IGZyb20gJy4vbW9kZWwvbGFuZ3VhZ2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9jYWxTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBsYW5ndWFnZUxpc3Q6IExhbmd1YWdlW107XG5cbiAgICBwdWJsaWMgY3VycmVudExhbmc6IExhbmd1YWdlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGFuZ3VhZ2VMaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TGFuZ3VhZ2UobGFuZzogTGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmcuY29kZSk7XG4gICAgICAgIHRoaXMuc2V0Q3VycmVudExhbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEN1cnJlbnRMYW5nKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRMYW5nID0gdGhpcy5sYW5ndWFnZUxpc3QuZmluZCgoZSkgPT4gZS5jb2RlID09PSB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyk7XG4gICAgfVxuXG59XG4iLCIvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhRW50cnkgeyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YTxUIGV4dGVuZHMgSURhdGFFbnRyeT4ge1xuICAgIHZhbHVlczogVFtdO1xuICAgIHJlZmVyZW5jZVZhbHVlczogUmVmZXJlbmNlVmFsdWVzPFQ+O1xuICAgIHZhbHVlQmVmb3JlVGltZXNwYW4/OiBUO1xuICAgIHZhbHVlQWZ0ZXJUaW1lc3Bhbj86IFQ7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VWYWx1ZXM8VCBleHRlbmRzIElEYXRhRW50cnk+IHtcbiAgICBba2V5OiBzdHJpbmddOiBUW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVZhbHVlRW50cnkgZXh0ZW5kcyBJRGF0YUVudHJ5IHtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB2YWx1ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvY2F0ZWRUaW1lVmFsdWVFbnRyeSBleHRlbmRzIFRpbWVWYWx1ZUVudHJ5IHtcbiAgICBnZW9tZXRyeTogR2VvSlNPTi5Qb2ludDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9maWxlRGF0YUVudHJ5IGV4dGVuZHMgSURhdGFFbnRyeSB7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgdmFsdWU6IEFycmF5PHsgdmFsdWU6IG51bWJlciwgdmVydGljYWw6IG51bWJlciB9PjtcbiAgICB2ZXJ0aWNhbFVuaXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2NhdGVkUHJvZmlsZURhdGFFbnRyeSBleHRlbmRzIFByb2ZpbGVEYXRhRW50cnkge1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIHZhbHVlOiBBcnJheTx7IHZhbHVlOiBudW1iZXIsIHZlcnRpY2FsOiBudW1iZXIgfT47XG4gICAgdmVydGljYWxVbml0OiBzdHJpbmc7XG4gICAgZ2VvbWV0cnk6IEdlb0pTT04uR2VvSnNvbk9iamVjdDtcbn1cbiIsImltcG9ydCB7IFBhcmFtZXRlckNvbnN0ZWxsYXRpb24sIFRpbWVzZXJpZXMgfSBmcm9tICcuL2RhdGFzZXQnO1xuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnLi9wYXJhbWV0ZXInO1xuXG5leHBvcnQgY2xhc3MgU3RhdGlvbiB7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIGdlb21ldHJ5OiBHZW9KU09OLkdlb21ldHJ5T2JqZWN0O1xuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBTdGF0aW9uUHJvcGVydGllcztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0aW9uUHJvcGVydGllcyBleHRlbmRzIFBhcmFtZXRlciB7XG4gICAgdGltZXNlcmllczogVGltZXNlcmllc0NvbGxlY3Rpb24gfCBUaW1lc2VyaWVzO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZXNlcmllc0NvbGxlY3Rpb24ge1xuICAgIFtrZXk6IHN0cmluZ106IFBhcmFtZXRlckNvbnN0ZWxsYXRpb247XG59XG4iLCJleHBvcnQgZW51bSBQbGF0Zm9ybVR5cGVzIHtcbiAgICBzdGF0aW9uYXJ5ID0gJ3N0YXRpb25hcnknLFxuICAgIG1vYmlsZSA9ICdtb2JpbGUnLFxuICAgIG1vYmlsZUluc2l0dSA9ICdtb2JpbGVfaW5zaXR1J1xufVxuXG5leHBvcnQgZW51bSBWYWx1ZVR5cGVzIHtcbiAgICBxdWFudGl0eSA9ICdxdWFudGl0eScsXG4gICAgcXVhbnRpdHlQcm9maWxlID0gJ3F1YW50aXR5LXByb2ZpbGUnXG59XG5cbmV4cG9ydCBlbnVtIERhdGFzZXRUeXBlcyB7XG4gICAgbWVhc3VyZW1lbnRcbn1cbiIsImltcG9ydCB7IFBhcmFtZXRlckZpbHRlciB9IGZyb20gJy4vLi4vaW50ZXJuYWwvaHR0cC1yZXF1ZXN0cyc7XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgc2VydmljZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpdGVtSWQ6IHN0cmluZztcbiAgICBwdWJsaWMgZmlsdGVyOiBQYXJhbWV0ZXJGaWx0ZXI7XG59XG4iLCIvKipcbiAqIE9wdGlvbnMgZm9yIGVhY2ggZGF0YXNldC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhc2V0T3B0aW9ucyB7XG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBkYXRhc2V0IGlkXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgaW50ZXJuYWxJZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogY29sb3Igb2YgdGhlIGRhdGFzZXRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBvciBoaWRlIGluIHRoZSBncmFwaFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogc2VwYXJhdGUgeSBheGlzIG9mIGRhdGFzZXRzIHdpdGggc2FtZSB1bml0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VwYXJhdGVZQXhpcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGFsaWduIGdyYXBoIHRoYXQgemVybyB5IGF4aXMgaXMgdmlzaWJsZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHplcm9CYXNlZFlBeGlzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogYXV0byB6b29tIHdoZW4gcmFuZ2Ugc2VsZWN0aW9uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBhdXRvUmFuZ2VTZWxlY3Rpb24/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBtYXJrZXIgdG8gcmVxdWVzdCBkYXRhc2V0IGRhdGEgZ2VuZXJhbGl6ZWRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBnZW5lcmFsaXplPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogbGlzdCBvZiB2aXNpYmxlIHJlZmVyZW5jZSB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEYXRhc2V0T3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzaG93UmVmZXJlbmNlVmFsdWVzOiBSZWZlcmVuY2VWYWx1ZU9wdGlvbltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiByYWRpdXMgb2YgZ3JhcGhwb2ludFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERhdGFzZXRPcHRpb25zXG4gICAgICovXG4gICAgcHVibGljIHBvaW50UmFkaXVzOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogd2lkdGggb2YgZ3JhcGhsaW5lXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIgPSAxO1xuXG4gICAgLyoqXG4gICAgICogbWluIGFuZCBtYXggcmFuZ2Ugb2YgeSBheGlzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgRGF0YXNldE9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgeUF4aXNSYW5nZT86IE1pbk1heFJhbmdlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGludGVybmFsSWQ6IHN0cmluZyxcbiAgICAgICAgY29sb3I6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmludGVybmFsSWQgPSBpbnRlcm5hbElkO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlVmFsdWVPcHRpb24ge1xuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIG51bWJlcmVkIHJhbmdlIHdpdGggYSBtaW4gYW5kIGEgbWF4IHZhbHVlXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1pbk1heFJhbmdlIHtcbiAgICBtaW46IG51bWJlcjtcbiAgICBtYXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVkRGF0YXNldE9wdGlvbnMgZXh0ZW5kcyBEYXRhc2V0T3B0aW9ucyB7XG4gICAgcHVibGljIHRpbWVzdGFtcDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGludGVybmFsSWQ6IHN0cmluZyxcbiAgICAgICAgY29sb3I6IHN0cmluZyxcbiAgICAgICAgdGltZXN0YW1wOiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoaW50ZXJuYWxJZCwgY29sb3IpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSWRDYWNoZTxUPiB7XG5cbiAgICBwcml2YXRlIGNhY2hlOiBNYXA8c3RyaW5nLCBUPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBoYXMoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5oYXMoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoaWQ6IHN0cmluZyk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQoaWQ6IHN0cmluZywgdmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5jYWNoZS5zZXQoaWQsIHZhbHVlKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBNaXhpbihiYXNlQ3RvcnM6IGFueVtdKSB7XG4gICAgcmV0dXJuIChkZXJpdmVkQ3RvcjogYW55KSA9PiB7XG4gICAgICAgIGJhc2VDdG9ycy5mb3JFYWNoKChiYXNlQ3RvcikgPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdID0gYmFzZUN0b3IucHJvdG90eXBlW25hbWVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEhhc0xvYWRhYmxlQ29udGVudCB7XG5cbiAgICBwdWJsaWMgb25Db250ZW50TG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuXG4gICAgcHVibGljIGlzQ29udGVudExvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9uQ29udGVudExvYWRpbmcuZW1pdChsb2FkaW5nKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVzaXphYmxlQ29tcG9uZW50IHtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICAgIHB1YmxpYyBvbldpbmRvd1Jlc2l6ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvblJlc2l6ZSgpOiB2b2lkO1xuXG59XG4iLCJpbXBvcnQge1xuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEl0ZXJhYmxlRGlmZmVyLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhbmdDaGFuZ2VFdmVudCwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFzZXRBcGlJbnRlcmZhY2UgfSBmcm9tICcuLi9kYXRhc2V0LWFwaS9hcGktaW50ZXJmYWNlJztcbmltcG9ydCB7IEludGVybmFsSWRIYW5kbGVyIH0gZnJvbSAnLi4vZGF0YXNldC1hcGkvaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFzZXRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWwvaW50ZXJuYWwvb3B0aW9ucyc7XG5pbXBvcnQgeyBSZXNpemFibGVDb21wb25lbnQgfSBmcm9tICcuLi9tb2RlbC9pbnRlcm5hbC9SZXNpemFibGVDb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZUludGVydmFsLCBUaW1lc3BhbiB9IGZyb20gJy4uL21vZGVsL2ludGVybmFsL3RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBIYXNMb2FkYWJsZUNvbnRlbnQgfSBmcm9tICcuLi9tb2RlbC9taXhpbnMvaGFzLWxvYWRhYmxlLWNvbnRlbnQnO1xuaW1wb3J0IHsgVGltZSB9IGZyb20gJy4uL3RpbWUvdGltZS5zZXJ2aWNlJztcbmltcG9ydCB7IFByZXNlbnRlck1lc3NhZ2UgfSBmcm9tICcuL3ByZXNlbnRlci1tZXNzYWdlJztcblxuY29uc3QgZXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJlc2VudGVyT3B0aW9ucyB7IH1cblxuLyoqXG4gKiBBYnN0cmFjdCBzdXBlcmNsYXNzIGZvciBhbGwgY29tcG9uZW50cywgd2hpY2ggd2lsbCBwcmVzZW50IGRhdGFzZXRzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YXNldFByZXNlbnRlckNvbXBvbmVudDxUIGV4dGVuZHMgRGF0YXNldE9wdGlvbnMgfCBEYXRhc2V0T3B0aW9uc1tdLCBVIGV4dGVuZHMgUHJlc2VudGVyT3B0aW9ucz5cbiAgICBleHRlbmRzIFJlc2l6YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRG9DaGVjaywgT25EZXN0cm95LCBIYXNMb2FkYWJsZUNvbnRlbnQge1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBwcmVzZW50ZWQgZGF0YXNldCBpZHMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldElkczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgcHJlc2VudGVkIHNlbGVjdGVkIGRhdGFzZXQgaWRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkRGF0YXNldElkczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aW1lIGludGVydmFsIGluIHdoaWNoIHRoZSBkYXRhIHNob3VsZCBwcmVzZW50ZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGltZUludGVydmFsOiBUaW1lSW50ZXJ2YWw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29ycmVzcG9uZGluZyBkYXRhc2V0IG9wdGlvbnMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZGF0YXNldE9wdGlvbnM6IE1hcDxzdHJpbmcsIFQ+O1xuICAgIHByb3RlY3RlZCBvbGREYXRhc2V0T3B0aW9uczogTWFwPHN0cmluZywgVD47XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25zIGZvciBnZW5lcmFsIHByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwcmVzZW50ZXJPcHRpb25zOiBVO1xuICAgIHByb3RlY3RlZCBvbGRQcmVzZW50ZXJPcHRpb25zOiBVO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBkYXRhc2V0cyBmb3Igd2hpY2ggYSByZWxvYWQgc2hvdWxkIGJlIHRyaWdnZXJlZCwgd2hlbiB0aGUgQXJyYXkgaXMgc2V0IHRvIG5ldyB2YWx1ZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByZWxvYWRGb3JEYXRhc2V0czogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB3aXRoIGEgbGlzdCBvZiBzZWxlY3RlZCBkYXRhc2V0cy5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25EYXRhc2V0U2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCB3aGVuIHRoZSB0aW1lc3BhbiBpbiB0aGUgcHJlc2VudGF0aW9uIGlzIGFkanVzdGVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblRpbWVzcGFuQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRpbWVzcGFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50LCB3aGVuIHRoZXJlIG9jY3VyZWQgYSBtZXNzYWdlIGluIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uTWVzc2FnZVRocm93bjogRXZlbnRFbWl0dGVyPFByZXNlbnRlck1lc3NhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmxhZywgd2hpbGUgdGhlcmUgaXMgZGF0YSBsb2FkZWQgaW4gdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgb25Db250ZW50TG9hZGluZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzQ29udGVudExvYWRpbmc6IChsb2FkaW5nOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIHRpbWVzcGFuOiBUaW1lc3BhbjtcblxuICAgIHByaXZhdGUgZGF0YXNldElkc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nPjtcbiAgICBwcml2YXRlIHNlbGVjdGVkRGF0YXNldElkc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nPjtcbiAgICBwcml2YXRlIGxhbmdDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIHByb3RlY3RlZCBhcGk6IERhdGFzZXRBcGlJbnRlcmZhY2UsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhc2V0SWRSZXNvbHZlcjogSW50ZXJuYWxJZEhhbmRsZXIsXG4gICAgICAgIHByb3RlY3RlZCB0aW1lU3J2YzogVGltZSxcbiAgICAgICAgcHJvdGVjdGVkIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0SWRzRGlmZmVyID0gdGhpcy5pdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzRGlmZmVyID0gdGhpcy5pdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMubGFuZ0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChsYW5nQ2hhbmdlRXZlbnQ6IExhbmdDaGFuZ2VFdmVudCkgPT4gdGhpcy5vbkxhbmd1YWdlQ2hhbmdlZChsYW5nQ2hhbmdlRXZlbnQpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy50aW1lSW50ZXJ2YWwgJiYgdGhpcy50aW1lSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXNwYW4gPSB0aGlzLnRpbWVTcnZjLmNyZWF0ZVRpbWVzcGFuT2ZJbnRlcnZhbCh0aGlzLnRpbWVJbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlcy5yZWxvYWRGb3JEYXRhc2V0cyAmJiB0aGlzLnJlbG9hZEZvckRhdGFzZXRzICYmIHRoaXMucmVsb2FkRGF0YUZvckRhdGFzZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkRGF0YUZvckRhdGFzZXRzKHRoaXMucmVsb2FkRm9yRGF0YXNldHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhbmdDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRhc2V0SWRzQ2hhbmdlcyA9IHRoaXMuZGF0YXNldElkc0RpZmZlci5kaWZmKHRoaXMuZGF0YXNldElkcyk7XG4gICAgICAgIGlmIChkYXRhc2V0SWRzQ2hhbmdlcykge1xuICAgICAgICAgICAgZGF0YXNldElkc0NoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgoYWRkZWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGREYXRhc2V0QnlJbnRlcm5hbElkKGFkZGVkSXRlbS5pdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGF0YXNldElkc0NoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyZW1vdmVkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRGF0YXNldChyZW1vdmVkSXRlbS5pdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRhc2V0SWRzQ2hhbmdlcyA9IHRoaXMuc2VsZWN0ZWREYXRhc2V0SWRzRGlmZmVyLmRpZmYodGhpcy5zZWxlY3RlZERhdGFzZXRJZHMpO1xuICAgICAgICBpZiAoc2VsZWN0ZWREYXRhc2V0SWRzQ2hhbmdlcykge1xuICAgICAgICAgICAgc2VsZWN0ZWREYXRhc2V0SWRzQ2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChhZGRlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkSWQoYWRkZWRJdGVtLml0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxlY3RlZERhdGFzZXRJZHNDaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVtb3ZlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkSWQocmVtb3ZlZEl0ZW0uaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXF1YWwodGhpcy5vbGRQcmVzZW50ZXJPcHRpb25zLCB0aGlzLnByZXNlbnRlck9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLm9sZFByZXNlbnRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByZXNlbnRlck9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJlc2VudGVyT3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnByZXNlbnRlck9wdGlvbnNDaGFuZ2VkKG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YXNldE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hhbmdlID0gdGhpcy5vbGREYXRhc2V0T3B0aW9ucyA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhbmdlKSB7IHRoaXMub2xkRGF0YXNldE9wdGlvbnMgPSBuZXcgTWFwKCk7IH1cbiAgICAgICAgICAgIHRoaXMuZGF0YXNldE9wdGlvbnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXF1YWwodmFsdWUsIHRoaXMub2xkRGF0YXNldE9wdGlvbnMuZ2V0KGtleSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2xkRGF0YXNldE9wdGlvbnMuc2V0KGtleSwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kYXRhc2V0T3B0aW9ucy5nZXQoa2V5KSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRPcHRpb25zQ2hhbmdlZChrZXksIHZhbHVlLCBmaXJzdENoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVsb2FkRGF0YUZvckRhdGFzZXRzKGRhdGFzZXRzOiBzdHJpbmdbXSk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWRkRGF0YXNldEJ5SW50ZXJuYWxJZChpbnRlcm5hbElkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxJZE9iaiA9IHRoaXMuZGF0YXNldElkUmVzb2x2ZXIucmVzb2x2ZUludGVybmFsSWQoaW50ZXJuYWxJZCk7XG4gICAgICAgIHRoaXMuYWRkRGF0YXNldChpbnRlcm5hbElkT2JqLmlkLCBpbnRlcm5hbElkT2JqLnVybCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uTGFuZ3VhZ2VDaGFuZ2VkKGxhbmdDaGFuZ2VFdmVudDogTGFuZ0NoYW5nZUV2ZW50KTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB0aW1lSW50ZXJ2YWxDaGFuZ2VzKCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWRkRGF0YXNldChpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVtb3ZlRGF0YXNldChpbnRlcm5hbElkOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNldFNlbGVjdGVkSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW1vdmVTZWxlY3RlZElkKGludGVybmFsSWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcHJlc2VudGVyT3B0aW9uc0NoYW5nZWQob3B0aW9uczogVSk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGF0YXNldE9wdGlvbnNDaGFuZ2VkKGludGVybmFsSWQ6IHN0cmluZywgb3B0aW9uczogVCwgZmlyc3RDaGFuZ2U6IGJvb2xlYW4pOiB2b2lkO1xuXG59XG4iLCJleHBvcnQgZW51bSBQcmVzZW50ZXJNZXNzYWdlVHlwZSB7XG4gICAgRVJST1IsXG4gICAgSU5GT1xufVxuIiwiaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuLi9tb2RlbC9zZXR0aW5ncy9zZXR0aW5ncyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTZXR0aW5nc1NlcnZpY2U8VCBleHRlbmRzIFNldHRpbmdzPiB7XG5cbiAgICBwcml2YXRlIHNldHRpbmdzOiBUO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIERlZmF1bHQgZW1wdHkgc2V0dGluZ3NcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9IGFzIFQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IFQpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgY2hlY2tzIFVSTHMgaWYgdGhleSBhcmUgcmVhY2hhYmxlIGJ5IGEgc2ltcGxlIGdldCByZXF1ZXN0LiBJZiB0aGV5IGdldHMgYW55dGhpbmcgYmFjaywgZXZlcnl0aGluZyBpcyBvaywgb3RoZXJ3aXNlXG4gKiB0aGUgY29ycmVzcG9uZGluZyBtZXRob2QgZ2l2ZXMgYmFjayB0aGUgVVJMcyB3aGljaCBhcmUgbm90IHJlYWNoYWJsZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXR1c0NoZWNrU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB1cmxzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudFxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgYWxsIGludGVybmFsIHJlZ2lzdGVyZWQgVVJMcyBpZiB0aGV5IGFyZSByZWFjaGFibGUuIEdpdmVzIGJhY2sgZXZlcnkgVVJMLCB3aGljaCB3YXMgbm90IHJlYWNoYWJsZVxuICAgKi9cbiAgcHVibGljIGNoZWNrQWxsKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5kb0NoZWNrKHRoaXMudXJscyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBnaXZlbiBVUkwuXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgd2l0aCB0aGUgVVJMIGlmIG5vdCByZWFjaGFibGUuXG4gICAqL1xuICBwdWJsaWMgY2hlY2tVcmwodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmRvQ2hlY2tVcmwodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGdpdmVuIFVSTHMuXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYWxsIG5vdCByZWFjaGFibGUgVVJMcy5cbiAgICovXG4gIHB1YmxpYyBjaGVja1VybHModXJsczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuZG9DaGVjayh1cmxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBVUkwgdG8gdGhlIGludGVybmFsIGNvbGxlY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgYWRkVXJsKHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnVybHMuaW5kZXhPZih1cmwpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgdGhpcy51cmxzLnB1c2godXJsKTsgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIFVSTCBvZiB0aGUgaW50ZXJuYWwgY29sbGVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZW1vdmVVcmwodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudXJscy5pbmRleE9mKHVybCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHsgdGhpcy51cmxzLnNwbGljZShpbmRleCwgMSk7IH1cbiAgfVxuXG4gIHByaXZhdGUgZG9DaGVja1VybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgdGhpcy5odHRwQ2xpZW50LmdldCh1cmwpLnN1YnNjcmliZShcbiAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh1cmwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRvQ2hlY2sodXJsczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgcmVxdWVzdHM6IEFycmF5PE9ic2VydmFibGU8c3RyaW5nPj4gPSBbXTtcbiAgICB1cmxzLmZvckVhY2goKHVybCkgPT4gcmVxdWVzdHMucHVzaCh0aGlzLmRvQ2hlY2tVcmwodXJsKSkpO1xuICAgIHJldHVybiBmb3JrSm9pbihyZXF1ZXN0cykucGlwZShcbiAgICAgIG1hcCgoY2hlY2tlZFVybHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNoZWNrZWRVcmxzLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiT2JzZXJ2YWJsZSIsIkh0dHBDbGllbnQiLCJEYXRlUGlwZSIsIlBpcGUiLCJUcmFuc2xhdGVTZXJ2aWNlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJwbGFpblRvQ2xhc3MiLCJOZ01vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJIdHRwSGVhZGVycyIsIkh0dHBQYXJhbXMiLCJJbmplY3Rpb25Ub2tlbiIsIkh0dHBIYW5kbGVyIiwiT3B0aW9uYWwiLCJJbmplY3QiLCJtYXAiLCJkZXNlcmlhbGl6ZUFycmF5IiwiZGVzZXJpYWxpemUiLCJmb3JrSm9pbiIsIklucHV0IiwiSG9zdExpc3RlbmVyIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztRQVFXLCtCQUFROzs7OztnQkFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7Ozs7UUFNMUIsdUNBQWdCOzs7Ozs7c0JBQUMsR0FBVyxFQUFFLE9BQWU7Z0JBQ2hELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Z0JBQzNCLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Z0JBQzVDLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Z0JBQzVDLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztn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