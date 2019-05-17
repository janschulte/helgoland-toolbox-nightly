import { EventEmitter } from '@angular/core';
export declare class TimeListSelectorComponent {
    timeList: number[];
    onTimeSelected: EventEmitter<number>;
    selectTime(timestamp: number): void;
}
