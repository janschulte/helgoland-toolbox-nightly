import { ModuleWithProviders, Type } from '@angular/core';
import { LastValueLabelGenerator } from './services/last-value-label-generator.interface';
export interface HelgolandMapSelectorModuleConfig {
    lastValueLabelGeneratorService: Type<LastValueLabelGenerator>;
}
export declare class HelgolandMapSelectorModule {
    static forRoot(config?: HelgolandMapSelectorModuleConfig): ModuleWithProviders;
}
