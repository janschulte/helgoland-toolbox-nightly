import { Settings, SettingsService } from '@helgoland/core';
export declare class BasicAuthServicesKeeper {
    protected settingsService: SettingsService<Settings>;
    private services;
    constructor(settingsService: SettingsService<Settings>);
    registerService(url: string): void;
    getCorrespondingService(url: string): string;
}
