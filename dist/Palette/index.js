"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = void 0;
const util_1 = require("@anderjason/util");
const colorsGivenCanvasImageSource_1 = require("./_internal/colorsGivenCanvasImageSource");
class Palette {
    constructor(colors) {
        this._colors = colors;
    }
    static givenColors(colors) {
        return new Palette(colors);
    }
    static givenCanvasImageSource(imageSource, maxColors) {
        const colors = colorsGivenCanvasImageSource_1.colorsGivenCanvasImageSource(imageSource, maxColors);
        return new Palette(colors);
    }
    get colors() {
        return [...this._colors];
    }
    isEqual(otherPalette) {
        if (otherPalette.colors.length !== this.colors.length) {
            return false;
        }
        return this.colors.every((color, idx) => {
            const otherColor = otherPalette.colors[idx];
            return color.isEqual(otherColor);
        });
    }
    toNearestIndexGivenColor(targetColor) {
        const distances = this._colors.map((c, idx) => {
            return {
                idx,
                distance: c.toDistanceGivenColor(targetColor),
            };
        });
        const ordered = util_1.ArrayUtil.arrayWithOrderFromValue(distances, (d) => d.distance, "ascending");
        return ordered[0].idx;
    }
    toNearestColorGivenColor(targetColor) {
        return this.toOptionalColorGivenIndex(this.toNearestIndexGivenColor(targetColor));
    }
    toOptionalColorGivenIndex(index) {
        return this._colors[index];
    }
    toIndexGivenColor(inputColor) {
        const index = this._colors.findIndex((c) => c.isEqual(inputColor));
        if (index == -1) {
            throw new Error("Color not found in toIndexGivenColor");
        }
        return index;
    }
}
exports.Palette = Palette;
//# sourceMappingURL=index.js.map