import { Color } from "../Color";
import { Percent } from "@anderjason/util";
export declare class ColorGradient {
    private _steps;
    static givenSteps(steps: Color[]): ColorGradient;
    private constructor();
    toSteps(): Color[];
    toLinearGradientString(direction: string): string;
    toHclInterpolatedColor(percent: Percent): Color;
    toRgbInterpolatedColor(percent: Percent): Color;
    withHclStepCount(stepCount: number): ColorGradient;
    withRgbStepCount(stepCount: number): ColorGradient;
}
