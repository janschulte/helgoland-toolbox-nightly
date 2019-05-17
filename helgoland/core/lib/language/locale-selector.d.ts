import { OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './model/language';
export declare abstract class LocalSelectorComponent implements OnChanges {
    protected translate: TranslateService;
    languageList: Language[];
    currentLang: Language;
    constructor(translate: TranslateService);
    ngOnChanges(changes: SimpleChanges): void;
    setLanguage(lang: Language): void;
    private setCurrentLang();
}
