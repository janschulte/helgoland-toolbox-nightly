import { EventEmitter } from '@angular/core';
export declare class PermalinkInMailComponent {
    url: string;
    onTriggered: EventEmitter<void>;
    openInMail(): void;
}
