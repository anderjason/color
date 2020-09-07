import { HsbColor } from "..";

export function hsbStringGivenHsb(hsbColor: HsbColor): string {
  const h = Math.round(hsbColor.h.toNumber(359));
  const s = Math.round(hsbColor.s.toNumber(100));
  const b = Math.round(hsbColor.b.toNumber(100));

  return `hsb(${h}, ${s}%, ${b}%)`;
}
