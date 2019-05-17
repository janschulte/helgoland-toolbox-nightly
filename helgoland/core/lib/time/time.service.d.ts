import { LocalStorage } from '../local-storage/local-storage.service';
import { TimeInterval, Timespan } from '../model/internal/timeInterval';
export declare class Time {
    protected localStorage: LocalStorage;
    constructor(localStorage: LocalStorage);
    centerTimespan(timespan: Timespan, date: Date): Timespan;
    stepBack(timespan: Timespan): Timespan;
    stepForward(timespan: Timespan): Timespan;
    overlaps(timeInterval: TimeInterval, from: number, to: number): boolean;
    createTimespanOfInterval(timeInterval: TimeInterval): Timespan;
    getBufferedTimespan(timespan: Timespan, factor: number): Timespan;
    saveTimespan(param: string, timespan: Timespan): void;
    loadTimespan(param: string): Timespan;
    initTimespan(): Timespan;
    private getDuration(timespan);
}
