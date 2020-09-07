"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclStepsOfColorGradient = void 0;
const util_1 = require("@anderjason/util");
function hclStepsOfColorGradient(colorGradient, totalSteps) {
    if (totalSteps < 2) {
        throw new Error("At least two total steps are required");
    }
    return util_1.ArrayUtil.numberArrayGivenRange(0, totalSteps - 1).map((n) => colorGradient.toHclInterpolatedColor(util_1.Percent.givenFraction(n, totalSteps - 1)));
}
exports.hclStepsOfColorGradient = hclStepsOfColorGradient;
//# sourceMappingURL=hclStepsOfColorGradient.js.map