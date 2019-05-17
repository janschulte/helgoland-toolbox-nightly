import { LocateService } from './locate.service';
export declare class LocateControlComponent {
    protected locateService: LocateService;
    mapId: string;
    isToggled: boolean;
    constructor(locateService: LocateService);
    locateUser(): void;
}
