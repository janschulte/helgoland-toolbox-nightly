import { HttpClient } from '@angular/common/http';
import { Settings, SettingsService } from '@helgoland/core';
import { Observable } from 'rxjs/Observable';
export declare class LabelMapperService {
    protected httpClient: HttpClient;
    protected settingsSrvc: SettingsService<Settings>;
    private cache;
    constructor(httpClient: HttpClient, settingsSrvc: SettingsService<Settings>);
    getMappedLabel(label: string): Observable<string>;
    private confirmLabel(observer, label);
    private findUrl(label);
}
