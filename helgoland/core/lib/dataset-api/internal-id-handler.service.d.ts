import 'rxjs/operator/map';
import { IDataset } from '../model/dataset-api/dataset';
export interface InternalDatasetId {
    id: string;
    url: string;
}
/**
 * Service to generate or resolve internal dataset IDs
 */
export declare class InternalIdHandler {
    /**
     * Generates an internal id for the given dataset.
     * @param dataset The dataset for which the internal id will be generated and saved.
     */
    generateInternalId(dataset: IDataset): void;
    /**
     * Resolves the internal ID to the url and the API specific dataset id.
     * @param internalId The internal id as string
     * @returns Construct of url and API id
     */
    resolveInternalId(internalId: string): InternalDatasetId;
}
