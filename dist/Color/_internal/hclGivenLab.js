"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclGivenLab = void 0;
const util_1 = require("@anderjason/util");
const RAD2DEG = 180 / Math.PI;
function hclGivenLab(labColor) {
    const { l, a, b } = labColor;
    const c = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * RAD2DEG + 360) % 360;
    if (Math.round(c * 10000) === 0) {
        h = Number.NaN;
    }
    return {
        h: util_1.Percent.givenFraction(h, 360),
        c: util_1.Percent.givenFraction(c, 140),
        l: util_1.Percent.givenFraction(l, 100),
    };
}
exports.hclGivenLab = hclGivenLab;
//# sourceMappingURL=hclGivenLab.js.map