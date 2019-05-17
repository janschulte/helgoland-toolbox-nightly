import { DatasetOptions } from '../model/internal/options';
export declare abstract class DatasetService<T extends DatasetOptions | DatasetOptions[]> {
    datasetIds: string[];
    datasetOptions: Map<string, T>;
    addDataset(internalId: string, options?: T): void;
    removeAllDatasets(): void;
    removeDataset(internalId: string): void;
    hasDatasets(): boolean;
    updateDatasetOptions(options: T, internalId: string): void;
    protected abstract createStyles(internalId: string): T;
    protected abstract saveState(): void;
    protected abstract loadState(): void;
}
