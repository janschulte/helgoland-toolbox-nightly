export declare abstract class PermalinkService<T> {
    createPermalink: () => string;
    abstract validatePeramlink(): T;
    protected abstract generatePermalink(): string;
    protected createBaseUrl(): string;
}
