export declare class IdCache<T> {
    private cache;
    has(id: string): boolean;
    get(id: string): T;
    set(id: string, value: T): void;
}
