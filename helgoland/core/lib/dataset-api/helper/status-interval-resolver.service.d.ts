import { StatusInterval } from '../../model/dataset-api/dataset';
export declare class StatusIntervalResolverService {
    constructor();
    getMatchingInterval(value: number, statusIntervals: StatusInterval[]): StatusInterval;
}
