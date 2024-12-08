"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclInterpolatedColorOfTwoColors = void 0;
const Color_1 = require("../../Color");
const util_1 = require("@anderjason/util");
function hclInterpolatedColorOfTwoColors(color1, color2, percent) {
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
    const hcl1 = color1.toHclColor();
    const hcl2 = color2.toHclColor();
    const h1 = hcl1.h.toNumber(1);
    const c1 = hcl1.c.toNumber(1);
    const l1 = hcl1.l.toNumber(1);
    const a1 = color1.alpha.toNumber(1);
    const h2 = hcl2.h.toNumber(1);
    const c2 = hcl2.c.toNumber(1);
    const l2 = hcl2.l.toNumber(1);
    const a2 = color2.alpha.toNumber(1);
    let deltaH;
    if (h2 > h1 && h2 - h1 > 0.5) {
        deltaH = h2 - (h1 + 1);
    }
    else if (h2 < h1 && h1 - h2 > 0.5) {
        deltaH = h2 + 1 - h1;
    }
    else {
        deltaH = h2 - h1;
    }
    return Color_1.Color.givenHclFloat({
        h: util_1.Percent.givenFraction(h1 + percent.toNumber(1) * deltaH, 1),
        c: util_1.Percent.givenFraction(c1 + percent.toNumber(1) * (c2 - c1), 1),
        l: util_1.Percent.givenFraction(l1 + percent.toNumber(1) * (l2 - l1), 1),
    }, util_1.Percent.givenFraction(a1 + percent.toNumber(1) * (a2 - a1), 1));
}
exports.hclInterpolatedColorOfTwoColors = hclInterpolatedColorOfTwoColors;
//# sourceMappingURL=hclInterpolatedColorOfTwoColors.js.map