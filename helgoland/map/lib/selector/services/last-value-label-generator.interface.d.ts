import { Timeseries } from '@helgoland/core';
export declare const enum LastValuePresentation {
    /**
     * colorized circle depending on status intervals
     */
    Colorized = 0,
    /**
     * textual presentation of the last value, done with LastValueLabelGenerator
     */
    Textual = 1,
}
export declare abstract class LastValueLabelGenerator {
    /**
     * Creates an icon label based on a given timeseries.
     */
    abstract createIconLabel(ts: Timeseries): any;
}
