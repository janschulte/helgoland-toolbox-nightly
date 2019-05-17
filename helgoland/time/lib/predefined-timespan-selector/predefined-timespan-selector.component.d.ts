import { EventEmitter, OnInit } from '@angular/core';
import { ParsedTimespanPreset, Settings, SettingsService, Timespan, TimespanPreset } from '@helgoland/core';
export declare class PredefinedTimespanSelectorComponent implements OnInit {
    protected settingSrvc: SettingsService<Settings>;
    timespan: Timespan;
    onTimespanChange: EventEmitter<Timespan>;
    parsedTimespanPresets: ParsedTimespanPreset[];
    constructor(settingSrvc: SettingsService<Settings>);
    ngOnInit(): void;
    isSafeMomentExpression(expression: string): boolean;
    isSafeTimespanPreset(preset: TimespanPreset): boolean;
    parseMomentExpression(expression: string): Date;
    timespanChanged(preset: TimespanPreset): void;
}
