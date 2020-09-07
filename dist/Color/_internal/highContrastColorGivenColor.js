"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highContrastColorGivenColor = void 0;
const __1 = require("..");
const util_1 = require("@anderjason/util");
function highContrastColorGivenColor(input) {
    const hclColor = input.toHclColor();
    let v;
    if (hclColor.l.toNumber(1) > 0.5) {
        v = util_1.Percent.ofZero();
    }
    else {
        v = util_1.Percent.givenFraction(1, 1);
    }
    return __1.Color.givenRgbFloat({ r: v, g: v, b: v });
}
exports.highContrastColorGivenColor = highContrastColorGivenColor;
//# sourceMappingURL=highContrastColorGivenColor.js.map