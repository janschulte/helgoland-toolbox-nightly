import { MapCache } from '../../base/map-cache.service';
export declare class LocateService {
    protected mapCache: MapCache;
    constructor(mapCache: MapCache);
    startLocate(id: string): void;
    stopLocate(id: string): void;
    private removeMarker(map);
}
