import { RgbFloatColor, HslColor } from "..";
import { Percent } from "@anderjason/util";

export function hslGivenRgbFloat(rgbColor: RgbFloatColor): HslColor {
  const r = rgbColor.r.toNumber(1);
  const g = rgbColor.g.toNumber(1);
  const b = rgbColor.b.toNumber(1);

  let min = Math.min(r, g, b); //Min. value of RGB
  let max = Math.max(r, g, b); //Max. value of RGB
  let delMax = max - min; //Delta RGB value
  let delR: number;
  let delG: number;
  let delB: number;
  let h: number = 0;
  let s: number = 0;
  let l = (max + min) / 2;

  if (delMax == 0) {
    h = 0;
    s = 0;
  } else {
    if (l < 0.5) {
      s = delMax / (max + min);
    } else {
      s = delMax / (2 - max - min);
    }

    delR = ((max - r) / 6 + delMax / 2) / delMax;
    delG = ((max - g) / 6 + delMax / 2) / delMax;
    delB = ((max - b) / 6 + delMax / 2) / delMax;

    if (r == max) {
      h = delB - delG;
    } else if (g == max) {
      h = 1 / 3 + delR - delB;
    } else if (b == max) {
      h = 2 / 3 + delG - delR;
    }

    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
  }

  return {
    h: Percent.givenFraction(h, 1),
    s: Percent.givenFraction(s, 1),
    l: Percent.givenFraction(l, 1),
  };
}
