import { MapCache } from '../../base/map-cache.service';
export declare class ZoomControlComponent {
    protected mapCache: MapCache;
    mapId: string;
    constructor(mapCache: MapCache);
    zoomIn(): void;
    zoomOut(): void;
}
