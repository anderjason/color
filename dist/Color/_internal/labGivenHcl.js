"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labGivenHcl = void 0;
const DEG2RAD = Math.PI / 180;
function labGivenHcl(hclColor) {
    let h = hclColor.h.toNumber(359);
    let c = hclColor.c.toNumber(140);
    let l = hclColor.l.toNumber(100);
    h = h * DEG2RAD;
    return {
        l,
        a: Math.cos(h) * c,
        b: Math.sin(h) * c,
    };
}
exports.labGivenHcl = labGivenHcl;
//# sourceMappingURL=labGivenHcl.js.map