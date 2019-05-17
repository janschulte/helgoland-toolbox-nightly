import { Timespan } from '../model/internal/timeInterval';
export declare enum DefinedTimespan {
    LASTHOUR = "last_hour",
    TODAY = "today",
    YESTERDAY = "yesterday",
    TODAY_YESTERDAY = "today_yesterday",
    CURRENT_WEEK = "current_week",
    LAST_WEEK = "last_week",
    CURRENT_MONTH = "current_month",
    LAST_MONTH = "last_month",
    CURRENT_YEAR = "current_year",
    LAST_YEAR = "last_year",
}
export declare class DefinedTimespanService {
    private intervals;
    constructor();
    getInterval(intervalDescriber: DefinedTimespan): Timespan;
}
