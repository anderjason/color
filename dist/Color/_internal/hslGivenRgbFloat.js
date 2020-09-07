"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hslGivenRgbFloat = void 0;
const util_1 = require("@anderjason/util");
function hslGivenRgbFloat(rgbColor) {
    const r = rgbColor.r.toNumber(1);
    const g = rgbColor.g.toNumber(1);
    const b = rgbColor.b.toNumber(1);
    let min = Math.min(r, g, b); //Min. value of RGB
    let max = Math.max(r, g, b); //Max. value of RGB
    let delMax = max - min; //Delta RGB value
    let delR;
    let delG;
    let delB;
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    if (delMax == 0) {
        h = 0;
        s = 0;
    }
    else {
        if (l < 0.5) {
            s = delMax / (max + min);
        }
        else {
            s = delMax / (2 - max - min);
        }
        delR = ((max - r) / 6 + delMax / 2) / delMax;
        delG = ((max - g) / 6 + delMax / 2) / delMax;
        delB = ((max - b) / 6 + delMax / 2) / delMax;
        if (r == max) {
            h = delB - delG;
        }
        else if (g == max) {
            h = 1 / 3 + delR - delB;
        }
        else if (b == max) {
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
        h: util_1.Percent.givenFraction(h, 1),
        s: util_1.Percent.givenFraction(s, 1),
        l: util_1.Percent.givenFraction(l, 1),
    };
}
exports.hslGivenRgbFloat = hslGivenRgbFloat;
//# sourceMappingURL=hslGivenRgbFloat.js.map