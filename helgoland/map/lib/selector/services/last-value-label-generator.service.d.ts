import { Timeseries } from '@helgoland/core';
import * as L from 'leaflet';
import { LastValueLabelGenerator } from './last-value-label-generator.interface';
export declare class LastValueLabelGeneratorService extends LastValueLabelGenerator {
    constructor();
    createIconLabel(ts: Timeseries): L.DivIcon;
}
