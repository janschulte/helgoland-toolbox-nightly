import { DatasetTypes, PlatformTypes } from './enums';
import { Parameter } from './parameter';
import { Station } from './station';
export interface IDataset extends Parameter {
    url: string;
    uom: string;
    internalId: string;
    firstValue: FirstLastValue;
    lastValue: FirstLastValue;
    referenceValues: ReferenceValue[];
    parameters: ParameterConstellation;
    renderingHints: RenderingHints;
}
export declare class ParameterConstellation {
    service: Parameter;
    offering: Parameter;
    feature: Parameter;
    procedure: Parameter;
    phenomenon: Parameter;
    category: Parameter;
}
export declare class FirstLastValue {
    timestamp: number;
    value: number;
}
export declare class ReferenceValue {
    referenceValueId: string;
    label: string;
    lastValue: FirstLastValue;
    color?: string;
    visible?: boolean;
}
export interface RenderingHints {
    chartType: string;
    properties: {
        color: string;
    };
}
export interface LineRenderingHints extends RenderingHints {
    chartType: 'line';
    properties: {
        color: string;
        width: string;
        lineType: string;
    };
}
export interface BarRenderingHints {
    chartType: 'bar';
    properties: {
        color: string;
        width: string;
        interval: string;
    };
}
export declare class DatasetParameterConstellation extends ParameterConstellation {
    platform: PlatformParameter;
}
export declare class Dataset implements IDataset {
    id: string;
    label: string;
    url: string;
    uom: string;
    internalId: string;
    firstValue: FirstLastValue;
    lastValue: FirstLastValue;
    referenceValues: ReferenceValue[];
    datasetType: DatasetTypes;
    platformType: PlatformTypes;
    parameters: DatasetParameterConstellation;
    seriesParameters?: DatasetParameterConstellation;
    renderingHints: RenderingHints;
}
export declare class Timeseries implements IDataset {
    id: string;
    label: string;
    url: string;
    uom: string;
    internalId: string;
    firstValue: FirstLastValue;
    lastValue: FirstLastValue;
    referenceValues: ReferenceValue[];
    station: Station;
    parameters: ParameterConstellation;
    statusIntervals?: StatusInterval[];
    hasData: boolean;
    renderingHints: RenderingHints;
}
export interface TimeseriesExtras {
    license?: string;
    statusIntervals?: StatusInterval[];
}
export interface StatusInterval {
    lower: string;
    upper: string;
    name: string;
    color: string;
}
export interface PlatformParameter extends Parameter {
    platformType: PlatformTypes;
}
export declare class TimeseriesData {
    id: string;
    url: string;
    data: FirstLastValue[];
}
