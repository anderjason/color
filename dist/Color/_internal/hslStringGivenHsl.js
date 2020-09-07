"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hslStringGivenHsl = void 0;
function hslStringGivenHsl(hslColor) {
    const h = Math.round(hslColor.h.toNumber(359));
    const s = Math.round(hslColor.s.toNumber(100));
    const l = Math.round(hslColor.l.toNumber(100));
    return `hsl(${h}, ${s}%, ${l}%)`;
}
exports.hslStringGivenHsl = hslStringGivenHsl;
//# sourceMappingURL=hslStringGivenHsl.js.map