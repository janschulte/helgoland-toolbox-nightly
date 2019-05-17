import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Settings, SettingsService } from '@helgoland/core';
export declare class RefreshButtonComponent implements OnChanges, OnInit {
    protected settings: SettingsService<Settings>;
    refreshInterval: number;
    toggled: boolean;
    refreshing: EventEmitter<boolean>;
    private interval;
    constructor(settings: SettingsService<Settings>);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    toggle(): void;
    private evaluteRefreshing();
    private startRefreshInterval();
    private stopRefreshInterval();
    private refresh();
}
