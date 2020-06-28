import { InjectionToken } from '@angular/core';

export const GENERIC_CONFIG = new InjectionToken<GenericConfig>('GenericConfig');

export interface GenericConfig {
    style: LayoutStyle;
}

export enum LayoutStyle {
    Bootstrap = 1,
    Material = 2
}
