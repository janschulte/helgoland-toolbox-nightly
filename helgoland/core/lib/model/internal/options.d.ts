/**
 * Options for each dataset.
 *
 * @export
 */
export declare class DatasetOptions {
    /**
     * internal dataset id
     *
     * @memberof DatasetOptions
     */
    internalId: string;
    /**
     * color of the dataset
     *
     * @memberof DatasetOptions
     */
    color: string;
    /**
     * show or hide in the graph
     *
     * @memberof DatasetOptions
     */
    visible: boolean;
    /**
     * separate y axis of datasets with same unit
     *
     * @memberof DatasetOptions
     */
    separateYAxis?: boolean;
    /**
     * align graph that zero y axis is visible
     *
     * @memberof DatasetOptions
     */
    zeroBasedYAxis?: boolean;
    /**
     * auto zoom when range selection
     *
     * @memberof DatasetOptions
     */
    autoRangeSelection?: boolean;
    /**
     * marker to request dataset data generalized
     *
     * @memberof DatasetOptions
     */
    generalize?: boolean;
    /**
     * list of visible reference values
     *
     * @memberof DatasetOptions
     */
    showReferenceValues: ReferenceValueOption[];
    /**
     * radius of graphpoint
     *
     * @memberof DatasetOptions
     */
    pointRadius: number;
    /**
     * width of graphline
     *
     * @memberof DatasetOptions
     */
    lineWidth: number;
    /**
     * min and max range of y axis
     *
     * @memberof DatasetOptions
     */
    yAxisRange?: MinMaxRange;
    constructor(internalId: string, color: string);
}
export declare class ReferenceValueOption {
    id: string;
    color: string;
}
/**
 * numbered range with a min and a max value
 *
 * @export
 */
export interface MinMaxRange {
    min: number;
    max: number;
}
export declare class TimedDatasetOptions extends DatasetOptions {
    timestamp: number;
    constructor(internalId: string, color: string, timestamp: number);
}
