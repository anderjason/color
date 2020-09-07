import { HslColor } from "..";

export function hslStringGivenHsl(hslColor: HslColor): string {
  const h = Math.round(hslColor.h.toNumber(359));
  const s = Math.round(hslColor.s.toNumber(100));
  const l = Math.round(hslColor.l.toNumber(100));

  return `hsl(${h}, ${s}%, ${l}%)`;
}
