"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbFloatGivenHex = void 0;
const util_1 = require("@anderjason/util");
const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
function rgbFloatGivenHex(hexColor) {
    if (!hexColor.match(hexRegex)) {
        throw new Error(`Unrecognized hex color: ${hexColor}`);
    }
    // remove optional leading #
    if (hexColor.length === 4 || hexColor.length === 7) {
        hexColor = hexColor.substr(1);
    }
    // expand short-notation to full six-digit
    if (hexColor.length === 3) {
        const parts = hexColor.split("");
        hexColor = parts[0] + parts[0] + parts[1] + parts[1] + parts[2] + parts[2];
    }
    const u = parseInt(hexColor, 16);
    const r = u >> 16;
    const g = (u >> 8) & 0xff;
    const b = u & 0xff;
    return {
        r: util_1.Percent.givenFraction(r, 255),
        g: util_1.Percent.givenFraction(g, 255),
        b: util_1.Percent.givenFraction(b, 255),
    };
}
exports.rgbFloatGivenHex = rgbFloatGivenHex;
//# sourceMappingURL=rgbFloatGivenHex.js.map