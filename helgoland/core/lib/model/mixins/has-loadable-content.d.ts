import { EventEmitter } from '@angular/core';
export declare class HasLoadableContent {
    onContentLoading: EventEmitter<boolean>;
    isContentLoading(loading: boolean): void;
}
