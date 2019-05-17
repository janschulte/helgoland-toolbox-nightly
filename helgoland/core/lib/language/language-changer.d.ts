import { TranslateService } from '@ngx-translate/core';
export declare abstract class LanguageChangNotifier {
    protected translate: TranslateService;
    constructor(translate: TranslateService);
    protected abstract languageChanged(): void;
}
