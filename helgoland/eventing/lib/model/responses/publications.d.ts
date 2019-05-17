import { Id, EventingEndpoint } from './common';
export interface Publication extends Id {
}
export interface PublicationResults extends EventingEndpoint<Publication> {
}
