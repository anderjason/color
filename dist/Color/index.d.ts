import { Percent } from "@anderjason/util";
export interface HsbColor {
    h: Percent;
    s: Percent;
    b: Percent;
}
export interface HslColor {
    h: Percent;
    s: Percent;
    l: Percent;
}
export interface LabColor {
    l: number;
    a: number;
    b: number;
}
export interface HclColor {
    h: Percent;
    c: Percent;
    l: Percent;
}
export interface RgbFloatColor {
    r: Percent;
    g: Percent;
    b: Percent;
}
export interface XyzColor {
    x: number;
    y: number;
    z: number;
}
export declare class Color {
    readonly alpha: Percent;
    private _labColor;
    private _hexString;
    static isEqual(a: Color, b: Color): boolean;
    static givenHslFloat(hslColor: HslColor, alpha?: Percent): Color;
    static givenHexString(hexColor: string): Color;
    static givenHclFloat(hclColor: HclColor, alpha?: Percent): Color;
    static givenRgbFloat(rgbColor: RgbFloatColor, alpha?: Percent): Color;
    static givenRgb255(r: number, g: number, b: number, a?: Percent): Color;
    static givenColorNumber(intColor: number, alpha?: number): Color;
    private constructor();
    isEqual(otherColor: Color): boolean;
    toPortableString(): string;
    withLightness(absoluteLightness: number): Color;
    withRelativeLightness(relativeLightness: number): Color;
    withHue(absoluteHue: Percent): Color;
    withRelativeHue(relativeHue: Percent): Color;
    withSaturation(absoluteSaturation: Percent): Color;
    withRelativeSaturation(relativeSaturation: Percent): Color;
    withAlpha(absoluteAlpha: Percent): Color;
    toDistanceGivenColor(otherColor: Color): number;
    toString(): string;
    toHexString(): string;
    toLabColor(): LabColor;
    toRgbFloatColor(): RgbFloatColor;
    toRgbString(): string;
    toHslColor(): HslColor;
    toHslString(): string;
    toHsbColor(): HsbColor;
    toHsbString(): string;
    toHclColor(): HclColor;
    toHighContrastColor(): Color;
    toColorNumber(): number;
}
