"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclInterpolatedColorOfColors = void 0;
const hclInterpolatedColorOfTwoColors_1 = require("./hclInterpolatedColorOfTwoColors");
const util_1 = require("@anderjason/util");
function hclInterpolatedColorOfColors(colors, percent) {
    const decimalRatioPerStep = 1 / (colors.length - 1);
    if (percent.isFull) {
        return util_1.ArrayUtil.optionalLastValueGivenArray(colors);
    }
    const lowerBoundIdx = Math.floor(percent.toNumber(1) * (colors.length - 1));
    const upperBoundIdx = Math.ceil(percent.toNumber(1) * (colors.length - 1));
    const lowerColor = colors[lowerBoundIdx];
    const upperColor = colors[upperBoundIdx];
    const partRatio = util_1.Percent.givenFraction((percent.toNumber(1) - lowerBoundIdx * decimalRatioPerStep) /
        decimalRatioPerStep, 1);
    return hclInterpolatedColorOfTwoColors_1.hclInterpolatedColorOfTwoColors(lowerColor, upperColor, partRatio);
}
exports.hclInterpolatedColorOfColors = hclInterpolatedColorOfColors;
//# sourceMappingURL=hclInterpolatedColorOfColors.js.map