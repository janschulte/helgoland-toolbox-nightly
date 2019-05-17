import { EventEmitter } from '@angular/core';
export declare class PermalinkNewWindowComponent {
    url: string;
    onTriggered: EventEmitter<void>;
    openInNewWindow(): void;
}
