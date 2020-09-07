import { Color } from "../Color";
import { Percent } from "@anderjason/util";
import { hclInterpolatedColorOfColors } from "./_internal/hclInterpolatedColorOfColors";
import { rgbInterpolatedColorOfColors } from "./_internal/rgbInterpolatedColorOfColors";
import { hclStepsOfColorGradient } from "./_internal/hclStepsOfColorGradient";
import { rgbStepsOfColorGradient } from "./_internal/rgbStepsOfColorGradient";

export class ColorGradient {
  private _steps: Color[];

  static givenSteps(steps: Color[]): ColorGradient {
    if (steps.length < 2) {
      throw new Error("At least 2 steps are required");
    }

    return new ColorGradient(steps);
  }

  private constructor(steps: Color[]) {
    this._steps = steps;
  }

  toSteps(): Color[] {
    return this._steps;
  }

  toLinearGradientString(direction: string): string {
    const colors: string[] = this._steps.map((s) => s.toString());

    return `linear-gradient(${direction}, ${colors.join(",")})`;
  }

  toHclInterpolatedColor(percent: Percent): Color {
    return hclInterpolatedColorOfColors(this._steps, percent);
  }

  toRgbInterpolatedColor(percent: Percent): Color {
    return rgbInterpolatedColorOfColors(this._steps, percent);
  }

  withHclStepCount(stepCount: number): ColorGradient {
    return new ColorGradient(hclStepsOfColorGradient(this, stepCount));
  }

  withRgbStepCount(stepCount: number): ColorGradient {
    return new ColorGradient(rgbStepsOfColorGradient(this, stepCount));
  }
}
