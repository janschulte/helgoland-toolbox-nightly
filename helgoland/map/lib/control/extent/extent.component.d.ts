import { MapCache } from '../../base/map-cache.service';
export declare class ExtentControlComponent {
    protected mapCache: MapCache;
    mapId: string;
    extent: L.LatLngBoundsExpression;
    constructor(mapCache: MapCache);
    zoomToExtent(): void;
}
