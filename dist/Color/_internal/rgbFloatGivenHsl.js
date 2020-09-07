"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbFloatGivenHsl = void 0;
const util_1 = require("@anderjason/util");
function getRgbComponent(v1, v2, vH) {
    if (vH < 0) {
        vH += 1;
    }
    if (vH > 1) {
        vH -= 1;
    }
    if (6 * vH < 1) {
        return v1 + (v2 - v1) * 6 * vH;
    }
    if (2 * vH < 1) {
        return v2;
    }
    if (3 * vH < 2) {
        return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
    }
    return v1;
}
function rgbFloatGivenHsl(hslColor) {
    const h = hslColor.h.toNumber(1);
    const s = hslColor.s.toNumber(1);
    const l = hslColor.l.toNumber(1);
    if (s == 0) {
        return {
            r: hslColor.l,
            g: hslColor.l,
            b: hslColor.l,
        };
    }
    let var1;
    let var2;
    if (l < 0.5) {
        var2 = l * (1 + s);
    }
    else {
        var2 = l + s - s * l;
    }
    var1 = 2 * l - var2;
    return {
        r: util_1.Percent.givenFraction(getRgbComponent(var1, var2, h + 1 / 3), 1),
        g: util_1.Percent.givenFraction(getRgbComponent(var1, var2, h), 1),
        b: util_1.Percent.givenFraction(getRgbComponent(var1, var2, h - 1 / 3), 1),
    };
}
exports.rgbFloatGivenHsl = rgbFloatGivenHsl;
//# sourceMappingURL=rgbFloatGivenHsl.js.map