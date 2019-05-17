import { Settings } from '../model/settings/settings';
export declare abstract class SettingsService<T extends Settings> {
    private settings;
    constructor();
    getSettings(): T;
    protected setSettings(settings: T): void;
}
