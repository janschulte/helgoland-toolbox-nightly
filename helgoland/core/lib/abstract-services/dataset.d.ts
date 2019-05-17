import { LocalStorage } from '../local-storage/local-storage.service';
import { DatasetOptions } from '../model/internal/options';
export declare abstract class DatasetService<T extends DatasetOptions | DatasetOptions[]> {
    protected localStorage: LocalStorage;
    datasetIds: string[];
    datasetOptions: Map<string, T>;
    constructor(localStorage: LocalStorage);
    addDataset(internalId: string, options?: T): void;
    removeAllDatasets(): void;
    removeDataset(internalId: string): void;
    hasDatasets(): boolean;
    updateDatasetOptions(options: T, internalId: string): void;
    protected abstract createStyles(internalId: string): T;
    protected abstract saveState(): void;
    protected abstract loadState(): void;
}
