import { Observable } from 'rxjs/Observable';
import { FavoriteService } from './favorite.service';
export declare class JsonFavoriteExporterService {
    protected favoriteSrvc: FavoriteService;
    constructor(favoriteSrvc: FavoriteService);
    exportFavorites(): void;
    importFavorites(event: any): Observable<boolean>;
}
