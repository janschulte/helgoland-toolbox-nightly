import { DatasetApiInterface } from '../dataset-api/api-interface';
import { DatasetOptions } from '../model/internal/options';
import { DatasetService } from './dataset.service';
export declare abstract class RenderingHintsDatasetService<T extends DatasetOptions | DatasetOptions[]> extends DatasetService<T> {
    protected api: DatasetApiInterface;
    constructor(api: DatasetApiInterface);
    addDataset(internalId: string, options?: T): void;
    private addLoadedDataset(dataset);
    private createOptionsOfRenderingHints(dataset);
    private handleLineRenderingHints(lineHints, options);
    private handleBarRenderingHints(barHints, options);
}
