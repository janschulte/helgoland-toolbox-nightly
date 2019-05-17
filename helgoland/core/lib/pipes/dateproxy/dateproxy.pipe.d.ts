import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export declare class DateProxyPipe implements PipeTransform {
    protected translate: TranslateService;
    constructor(translate: TranslateService);
    transform(value: any, pattern?: string): any;
}
