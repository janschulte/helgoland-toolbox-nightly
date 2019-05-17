export interface Id {
    id: string;
    href: string;
}
export interface CollectionMetadata {
    limit: number;
    offset: number;
    total: number;
}
export interface EventingEndpoint<T> {
    data: T[];
    metadata: CollectionMetadata;
}
