import { ParameterConstellation, Timeseries } from './dataset';
import { Parameter } from './parameter';
export declare class Station {
    id: string;
    geometry: GeoJSON.GeometryObject;
    properties: StationProperties;
}
export interface StationProperties extends Parameter {
    timeseries: TimeseriesCollection | Timeseries;
}
export declare class TimeseriesCollection {
    [key: string]: ParameterConstellation;
}
