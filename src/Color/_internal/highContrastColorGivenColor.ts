import { Color, HclColor } from "..";
import { Percent } from "@anderjason/util";

export function highContrastColorGivenColor(input: Color): Color {
  const hclColor: HclColor = input.toHclColor();

  let v: Percent;
  if (hclColor.l.toNumber(1) > 0.5) {
    v = Percent.ofZero();
  } else {
    v = Percent.givenFraction(1, 1);
  }

  return Color.givenRgbFloat({ r: v, g: v, b: v });
}
