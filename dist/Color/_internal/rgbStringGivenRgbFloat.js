"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbStringGivenRgbFloat = void 0;
function rgbStringGivenRgbFloat(rgbColor, alpha) {
    const r = Math.round(rgbColor.r.toNumber(255));
    const g = Math.round(rgbColor.g.toNumber(255));
    const b = Math.round(rgbColor.b.toNumber(255));
    const a = alpha.toNumber(1);
    if (a === 1) {
        return `rgb(${r}, ${g}, ${b})`;
    }
    else {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}
exports.rgbStringGivenRgbFloat = rgbStringGivenRgbFloat;
//# sourceMappingURL=rgbStringGivenRgbFloat.js.map