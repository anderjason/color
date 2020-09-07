import { HclColor, LabColor } from "..";

const DEG2RAD = Math.PI / 180;

export function labGivenHcl(hclColor: HclColor): LabColor {
  let h = hclColor.h.toNumber(359);
  let c = hclColor.c.toNumber(140);
  let l = hclColor.l.toNumber(100);

  h = h * DEG2RAD;

  return {
    l,
    a: Math.cos(h) * c,
    b: Math.sin(h) * c,
  };
}
