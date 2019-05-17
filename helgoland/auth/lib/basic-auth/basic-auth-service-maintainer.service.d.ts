import { Settings, SettingsService } from '@helgoland/core';
/**
 * This service maintaines all service urls which are secured with basic auth. The service is used to check for every servie url if it is necessary to work with basic auth. It is possible to
 * register a url and it also checks every dataset url in the settings.
 */
export declare class BasicAuthServiceMaintainer {
    protected settingsService: SettingsService<Settings>;
    private services;
    constructor(settingsService: SettingsService<Settings>);
    /**
     * Register an additional service url, which is secured with basic auth.
     */
    registerService(url: string): void;
    /**
     * Checks if a given url is registered as secured with basic auth.
     */
    getCorrespondingService(url: string): string;
}
