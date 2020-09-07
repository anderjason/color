import { RgbFloatColor } from "..";
import { Percent } from "@anderjason/util";

export function rgbStringGivenRgbFloat(
  rgbColor: RgbFloatColor,
  alpha: Percent
): string {
  const r = Math.round(rgbColor.r.toNumber(255));
  const g = Math.round(rgbColor.g.toNumber(255));
  const b = Math.round(rgbColor.b.toNumber(255));
  const a = alpha.toNumber(1);

  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}
