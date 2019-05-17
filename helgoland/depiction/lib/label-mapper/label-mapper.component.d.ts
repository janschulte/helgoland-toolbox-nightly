import { OnChanges, SimpleChanges } from '@angular/core';
import { LabelMapperService } from './label-mapper.service';
export declare class LabelMapperComponent implements OnChanges {
    protected labelMapperSrvc: LabelMapperService;
    label: string;
    determinedLabel: string;
    loading: boolean;
    constructor(labelMapperSrvc: LabelMapperService);
    ngOnChanges(changes: SimpleChanges): void;
}
