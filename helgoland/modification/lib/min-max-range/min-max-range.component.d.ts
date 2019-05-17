import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MinMaxRange } from '@helgoland/core';
export declare class MinMaxRangeComponent implements OnChanges {
    rangeMin: number;
    rangeMax: number;
    range: MinMaxRange;
    onRangeChange: EventEmitter<MinMaxRange>;
    ngOnChanges(changes: SimpleChanges): void;
    setYaxisRange(): void;
    resetYaxisRange(): void;
}
