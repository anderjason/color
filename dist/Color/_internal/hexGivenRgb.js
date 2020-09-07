"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexGivenRgb = void 0;
function hexGivenRgb(rgbColor, alpha) {
    const hexR = Math.round(rgbColor.r.toNumber(255))
        .toString(16)
        .padStart(2, "0");
    const hexG = Math.round(rgbColor.g.toNumber(255))
        .toString(16)
        .padStart(2, "0");
    const hexB = Math.round(rgbColor.b.toNumber(255))
        .toString(16)
        .padStart(2, "0");
    if (alpha.toNumber(1) === 1) {
        return `#${hexR}${hexG}${hexB}`;
    }
    else {
        const hexA = Math.round(alpha.toNumber(255)).toString(16).padStart(2, "0");
        return `#${hexR}${hexG}${hexB}${hexA}`;
    }
}
exports.hexGivenRgb = hexGivenRgb;
//# sourceMappingURL=hexGivenRgb.js.map