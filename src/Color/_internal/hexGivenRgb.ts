import { RgbFloatColor } from "..";
import { Percent } from "@anderjason/util";

export function hexGivenRgb(rgbColor: RgbFloatColor, alpha: Percent): string {
  const hexR: string = Math.round(rgbColor.r.toNumber(255))
    .toString(16)
    .padStart(2, "0");

  const hexG: string = Math.round(rgbColor.g.toNumber(255))
    .toString(16)
    .padStart(2, "0");

  const hexB: string = Math.round(rgbColor.b.toNumber(255))
    .toString(16)
    .padStart(2, "0");

  if (alpha.toNumber(1) === 1) {
    return `#${hexR}${hexG}${hexB}`;
  } else {
    const hexA = Math.round(alpha.toNumber(255)).toString(16).padStart(2, "0");
    return `#${hexR}${hexG}${hexB}${hexA}`;
  }
}
