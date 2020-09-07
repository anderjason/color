import { LabColor, HclColor } from "..";
import { Percent } from "@anderjason/util";

const RAD2DEG = 180 / Math.PI;

export function hclGivenLab(labColor: LabColor): HclColor {
  const { l, a, b } = labColor;

  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * RAD2DEG + 360) % 360;
  if (Math.round(c * 10000) === 0) {
    h = Number.NaN;
  }

  return {
    h: Percent.givenFraction(h, 360),
    c: Percent.givenFraction(c, 140),
    l: Percent.givenFraction(l, 100),
  };
}
