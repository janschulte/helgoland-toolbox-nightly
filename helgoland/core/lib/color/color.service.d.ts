export declare class ColorService {
    /**
     * Creates a random color and return it as a hex string.
     */
    getColor(): string;
    /**
     * Converts a hex string and opacity in percent to RGBA color as string.
     */
    convertHexToRGBA(hex: string, opacity: number): string;
    private getRandomColor();
}
