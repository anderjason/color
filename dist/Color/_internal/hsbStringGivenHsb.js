"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsbStringGivenHsb = void 0;
function hsbStringGivenHsb(hsbColor) {
    const h = Math.round(hsbColor.h.toNumber(359));
    const s = Math.round(hsbColor.s.toNumber(100));
    const b = Math.round(hsbColor.b.toNumber(100));
    return `hsb(${h}, ${s}%, ${b}%)`;
}
exports.hsbStringGivenHsb = hsbStringGivenHsb;
//# sourceMappingURL=hsbStringGivenHsb.js.map