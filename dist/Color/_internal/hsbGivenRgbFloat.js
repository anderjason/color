"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsbGivenRgbFloat = void 0;
const util_1 = require("@anderjason/util");
function hsbGivenRgbFloat(rgbFloatColor) {
    const r = rgbFloatColor.r.toNumber(1);
    const g = rgbFloatColor.g.toNumber(1);
    const b = rgbFloatColor.b.toNumber(1);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta != 0) {
        if (r == max) {
            h = (g - b) / delta;
        }
        else {
            if (g == max) {
                h = 2 + (b - r) / delta;
            }
            else {
                h = 4 + (r - g) / delta;
            }
        }
        h *= 60;
        if (h < 0) {
            h += 360;
        }
    }
    return {
        h: util_1.Percent.givenFraction(h, 360),
        s: util_1.Percent.givenFraction(max == 0 ? 0 : (max - min) / max, 1),
        b: util_1.Percent.givenFraction(max, 1),
    };
}
exports.hsbGivenRgbFloat = hsbGivenRgbFloat;
//# sourceMappingURL=hsbGivenRgbFloat.js.map