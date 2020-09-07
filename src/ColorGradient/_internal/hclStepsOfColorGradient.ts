import { Color } from "../../Color";
import { ColorGradient } from "..";
import { ArrayUtil, Percent } from "@anderjason/util";

export function hclStepsOfColorGradient(
  colorGradient: ColorGradient,
  totalSteps: number
): Color[] {
  if (totalSteps < 2) {
    throw new Error("At least two total steps are required");
  }

  return ArrayUtil.numberArrayGivenRange(0, totalSteps - 1).map((n) =>
    colorGradient.toHclInterpolatedColor(
      Percent.givenFraction(n, totalSteps - 1)
    )
  );
}
