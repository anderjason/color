"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbInterpolatedColorOfTwoColors = void 0;
const Color_1 = require("../../Color");
const util_1 = require("@anderjason/util");
function rgbInterpolatedColorOfTwoColors(color1, color2, percent) {
    if (color1 == null) {
        throw new Error("Color 1 is required");
    }
    if (color2 == null) {
        throw new Error("Color 2 is required");
    }
    if (percent.isZero) {
        return color1;
    }
    if (percent.isFull) {
        return color2;
    }
    const rgb1 = color1.toRgbFloatColor();
    const rgb2 = color2.toRgbFloatColor();
    const r1 = rgb1.r.toNumber(1);
    const g1 = rgb1.g.toNumber(1);
    const b1 = rgb1.b.toNumber(1);
    const r2 = rgb2.r.toNumber(1);
    const g2 = rgb2.g.toNumber(1);
    const b2 = rgb2.b.toNumber(1);
    return Color_1.Color.givenRgbFloat({
        r: util_1.Percent.givenFraction(r1 + percent.toNumber(1) * (r2 - r1), 1),
        g: util_1.Percent.givenFraction(g1 + percent.toNumber(1) * (g2 - g1), 1),
        b: util_1.Percent.givenFraction(b1 + percent.toNumber(1) * (b2 - b1), 1),
    });
}
exports.rgbInterpolatedColorOfTwoColors = rgbInterpolatedColorOfTwoColors;
//# sourceMappingURL=rgbInterpolatedColorOfTwoColors.js.map