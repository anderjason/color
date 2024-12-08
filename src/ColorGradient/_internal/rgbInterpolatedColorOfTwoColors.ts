import { Color, RgbFloatColor } from "../../Color";
import { Percent } from "@anderjason/util";

export function rgbInterpolatedColorOfTwoColors(
  color1: Color,
  color2: Color,
  percent: Percent
): Color {
  if (color1 == null) {
    throw new Error("Color 1 is required");
  }

  if (color2 == null) {
    throw new Error("Color 2 is required");
  }

  if (percent.isZero) {
    return color1;
  }

  if (percent.isFull) {
    return color2;
  }

  const rgb1: RgbFloatColor = color1.toRgbFloatColor();
  const rgb2: RgbFloatColor = color2.toRgbFloatColor();

  const r1 = rgb1.r.toNumber(1);
  const g1 = rgb1.g.toNumber(1);
  const b1 = rgb1.b.toNumber(1);
  const a1 = color1.alpha.toNumber(1);

  const r2 = rgb2.r.toNumber(1);
  const g2 = rgb2.g.toNumber(1);
  const b2 = rgb2.b.toNumber(1);
  const a2 = color2.alpha.toNumber(1);
  return Color.givenRgbFloat(
    {
      r: Percent.givenFraction(r1 + percent.toNumber(1) * (r2 - r1), 1),
      g: Percent.givenFraction(g1 + percent.toNumber(1) * (g2 - g1), 1),
      b: Percent.givenFraction(b1 + percent.toNumber(1) * (b2 - b1), 1),
    },
    Percent.givenFraction(a1 + percent.toNumber(1) * (a2 - a1), 1)
  );
}
