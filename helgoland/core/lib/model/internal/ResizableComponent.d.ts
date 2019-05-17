export declare abstract class ResizableComponent {
    onWindowResize(event: Event): void;
    protected abstract onResize(): void;
}
