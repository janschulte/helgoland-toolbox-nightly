import { EventEmitter } from '@angular/core';
export declare class BoolTogglerComponent {
    value: boolean;
    icon: string;
    tooltip: string;
    onToggled: EventEmitter<boolean>;
    toggle(): void;
}
