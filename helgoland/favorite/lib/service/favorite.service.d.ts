import { IDataset, LocalStorage } from '@helgoland/core';
export declare class FavoriteService {
    protected localStorage: LocalStorage;
    private singleFavs;
    private groupFavs;
    private groupCounter;
    constructor(localStorage: LocalStorage);
    addFavorite(dataset: IDataset, label?: string): boolean;
    hasFavorite(dataset: IDataset): boolean;
    getFavorites(): SingleFavorite[];
    removeFavorite(favoriteId: string): boolean;
    addFavoriteGroup(datasets: IDataset[], label?: string): boolean;
    getFavoriteGroups(): GroupFavorite[];
    removeAllFavorites(): boolean;
    changeLabel(favorite: Favorite, label: string): void;
    private saveFavorites();
    private loadFavorites();
}
export interface Favorite {
    id: string;
    label: string;
}
export interface SingleFavorite extends Favorite {
    favorite: IDataset;
}
export interface GroupFavorite extends Favorite {
    favorites: IDataset[];
}
