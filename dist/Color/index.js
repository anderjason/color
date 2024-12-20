"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const util_1 = require("@anderjason/util");
const hsbGivenRgbFloat_1 = require("./_internal/hsbGivenRgbFloat");
const hslGivenRgbFloat_1 = require("./_internal/hslGivenRgbFloat");
const labGivenHcl_1 = require("./_internal/labGivenHcl");
const labGivenXyz_1 = require("./_internal/labGivenXyz");
const hclGivenLab_1 = require("./_internal/hclGivenLab");
const rgbFloatGivenHsl_1 = require("./_internal/rgbFloatGivenHsl");
const rgbFloatGivenXyz_1 = require("./_internal/rgbFloatGivenXyz");
const hsbStringGivenHsb_1 = require("./_internal/hsbStringGivenHsb");
const hslStringGivenHsl_1 = require("./_internal/hslStringGivenHsl");
const rgbStringGivenRgbFloat_1 = require("./_internal/rgbStringGivenRgbFloat");
const xyzGivenLab_1 = require("./_internal/xyzGivenLab");
const xyzGivenRgbFloat_1 = require("./_internal/xyzGivenRgbFloat");
const rgbFloatGivenHex_1 = require("./_internal/rgbFloatGivenHex");
const hexGivenRgb_1 = require("./_internal/hexGivenRgb");
const highContrastColorGivenColor_1 = require("./_internal/highContrastColorGivenColor");
const distanceGivenColors_1 = require("./_internal/distanceGivenColors");
class Color {
    constructor(labColor, alpha) {
        this._labColor = labColor;
        this.alpha = alpha;
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    static givenHslFloat(hslColor, alpha = util_1.Percent.givenFraction(1, 1)) {
        return Color.givenRgbFloat(rgbFloatGivenHsl_1.rgbFloatGivenHsl(hslColor), alpha);
    }
    static givenHexString(hexColor) {
        return Color.givenRgbFloat(rgbFloatGivenHex_1.rgbFloatGivenHex(hexColor));
    }
    static givenHclFloat(hclColor, alpha = util_1.Percent.givenFraction(1, 1)) {
        return new Color(labGivenHcl_1.labGivenHcl(hclColor), alpha);
    }
    static givenRgbFloat(rgbColor, alpha = util_1.Percent.givenFraction(1, 1)) {
        const labColor = labGivenXyz_1.labGivenXyz(xyzGivenRgbFloat_1.xyzGivenRgbFloat(rgbColor));
        return new Color(labColor, alpha);
    }
    static givenRgb255(r, g, b, a) {
        return Color.givenRgbFloat({
            r: util_1.Percent.givenFraction(r, 255),
            g: util_1.Percent.givenFraction(g, 255),
            b: util_1.Percent.givenFraction(b, 255),
        }, a);
    }
    static givenColorNumber(intColor, alpha = 1) {
        let alphaString;
        if (alpha === 1) {
            alphaString = "";
        }
        else {
            alphaString = Math.round(util_1.NumberUtil.numberWithHardLimit(alpha, 0, 1) * 255)
                .toString(16)
                .padStart(2, "0");
        }
        const hex = `#${intColor.toString(16).padStart(6, "0")}${alphaString}`;
        return Color.givenHexString(hex);
    }
    isEqual(otherColor) {
        if (otherColor == null) {
            return false;
        }
        return (this._labColor.a === otherColor._labColor.a &&
            this._labColor.b === otherColor._labColor.b &&
            this._labColor.l === otherColor._labColor.l &&
            this.alpha === otherColor.alpha);
    }
    toPortableString() {
        const obj = {
            l: this._labColor.l,
            a: this._labColor.a,
            b: this._labColor.b,
            alpha: this.alpha.toNumber(1),
        };
        return JSON.stringify(obj);
    }
    withLightness(absoluteLightness) {
        const { a, b } = this._labColor;
        return new Color({
            l: absoluteLightness * 100,
            a,
            b,
        }, this.alpha);
    }
    withRelativeLightness(relativeLightness) {
        const { l } = this._labColor;
        return this.withLightness(l / 100 + relativeLightness);
    }
    withHue(absoluteHue) {
        const { s, l } = hslGivenRgbFloat_1.hslGivenRgbFloat(this.toRgbFloatColor());
        return new Color(labGivenXyz_1.labGivenXyz(xyzGivenRgbFloat_1.xyzGivenRgbFloat(rgbFloatGivenHsl_1.rgbFloatGivenHsl({
            h: absoluteHue,
            s,
            l,
        }))), this.alpha);
    }
    withRelativeHue(relativeHue) {
        const { h } = hslGivenRgbFloat_1.hslGivenRgbFloat(this.toRgbFloatColor());
        let absoluteHue = h.toNumber(1) + relativeHue.toNumber(1);
        if (absoluteHue > 1) {
            absoluteHue -= 1;
        }
        if (absoluteHue < 0) {
            absoluteHue += 1;
        }
        return this.withHue(util_1.Percent.givenFraction(absoluteHue, 1));
    }
    withSaturation(absoluteSaturation) {
        let { l, h } = hclGivenLab_1.hclGivenLab(this._labColor);
        return new Color(labGivenHcl_1.labGivenHcl({ h, c: absoluteSaturation, l }), this.alpha);
    }
    withRelativeSaturation(relativeSaturation) {
        const hcl = hclGivenLab_1.hclGivenLab(this._labColor);
        let c = hcl.c.toNumber(1);
        c = util_1.NumberUtil.numberWithHardLimit(c + relativeSaturation.toNumber(1), 0, 1);
        return this.withSaturation(util_1.Percent.givenFraction(c, 1));
    }
    withAlpha(absoluteAlpha) {
        return new Color(this._labColor, absoluteAlpha);
    }
    toDistanceGivenColor(otherColor) {
        return distanceGivenColors_1.distanceGivenColors(this, otherColor);
    }
    toString() {
        return this.toRgbString();
    }
    toHexString() {
        if (this._hexString == null) {
            this._hexString = hexGivenRgb_1.hexGivenRgb(this.toRgbFloatColor(), this.alpha);
        }
        return this._hexString;
    }
    toLabColor() {
        return {
            l: this._labColor.l,
            a: this._labColor.a,
            b: this._labColor.b,
        };
    }
    toRgbFloatColor() {
        return rgbFloatGivenXyz_1.rgbFloatGivenXyz(xyzGivenLab_1.xyzGivenLab(this._labColor));
    }
    toRgbString() {
        return rgbStringGivenRgbFloat_1.rgbStringGivenRgbFloat(this.toRgbFloatColor(), this.alpha);
    }
    toHslColor() {
        return hslGivenRgbFloat_1.hslGivenRgbFloat(this.toRgbFloatColor());
    }
    toHslString() {
        return hslStringGivenHsl_1.hslStringGivenHsl(this.toHslColor());
    }
    toHsbColor() {
        return hsbGivenRgbFloat_1.hsbGivenRgbFloat(this.toRgbFloatColor());
    }
    toHsbString() {
        return hsbStringGivenHsb_1.hsbStringGivenHsb(this.toHsbColor());
    }
    toHclColor() {
        return hclGivenLab_1.hclGivenLab(this._labColor);
    }
    toHighContrastColor() {
        return highContrastColorGivenColor_1.highContrastColorGivenColor(this);
    }
    toColorNumber() {
        return parseInt(this.toHexString().slice(1, 7), 16);
    }
}
exports.Color = Color;
//# sourceMappingURL=index.js.map