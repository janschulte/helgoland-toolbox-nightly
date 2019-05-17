import * as L from 'leaflet';
export declare class MapCache {
    private mapCache;
    getMap(id: string): L.Map;
    setMap(id: string, map: L.Map): void;
    hasMap(id: string): boolean;
    deleteMap(id: string): boolean;
}
