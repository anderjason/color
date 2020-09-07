import { hclInterpolatedColorOfTwoColors } from "./hclInterpolatedColorOfTwoColors";
import { ArrayUtil, Percent } from "@anderjason/util";
import { Color } from "../../Color";

export function hclInterpolatedColorOfColors(
  colors: Color[],
  percent: Percent
): Color {
  const decimalRatioPerStep: number = 1 / (colors.length - 1);

  if (percent.isFull) {
    return ArrayUtil.optionalLastValueGivenArray(colors)!;
  }

  const lowerBoundIdx = Math.floor(percent.toNumber(1) * (colors.length - 1));
  const upperBoundIdx = Math.ceil(percent.toNumber(1) * (colors.length - 1));

  const lowerColor = colors[lowerBoundIdx];
  const upperColor = colors[upperBoundIdx];

  const partRatio = Percent.givenFraction(
    (percent.toNumber(1) - lowerBoundIdx * decimalRatioPerStep) /
      decimalRatioPerStep,
    1
  );

  return hclInterpolatedColorOfTwoColors(lowerColor, upperColor, partRatio);
}
