import { OnChanges, SimpleChanges } from '@angular/core';
import { IDataset, NotifierService } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';
import { FavoriteService } from '../service/favorite.service';
export declare class FavoriteTogglerComponent implements OnChanges {
    protected favSrvc: FavoriteService;
    protected notifier: NotifierService;
    protected translate: TranslateService;
    dataset: IDataset;
    isFavorite: boolean;
    constructor(favSrvc: FavoriteService, notifier: NotifierService, translate: TranslateService);
    ngOnChanges(changes: SimpleChanges): void;
    toggle(): void;
}
