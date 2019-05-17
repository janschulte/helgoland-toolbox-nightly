import { OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
export declare class StringTogglerComponent implements OnChanges {
    value: string;
    option: string;
    icon: string;
    tooltip: string;
    onToggled: EventEmitter<string>;
    isToggled: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    toggle(): void;
}
