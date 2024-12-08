import { NumberUtil, Percent } from "@anderjason/util";
import { hsbGivenRgbFloat } from "./_internal/hsbGivenRgbFloat";
import { hslGivenRgbFloat } from "./_internal/hslGivenRgbFloat";
import { labGivenHcl } from "./_internal/labGivenHcl";
import { labGivenXyz } from "./_internal/labGivenXyz";
import { hclGivenLab } from "./_internal/hclGivenLab";
import { rgbFloatGivenHsl } from "./_internal/rgbFloatGivenHsl";
import { rgbFloatGivenXyz } from "./_internal/rgbFloatGivenXyz";
import { hsbStringGivenHsb } from "./_internal/hsbStringGivenHsb";
import { hslStringGivenHsl } from "./_internal/hslStringGivenHsl";
import { rgbStringGivenRgbFloat } from "./_internal/rgbStringGivenRgbFloat";
import { xyzGivenLab } from "./_internal/xyzGivenLab";
import { xyzGivenRgbFloat } from "./_internal/xyzGivenRgbFloat";
import { rgbFloatGivenHex } from "./_internal/rgbFloatGivenHex";
import { hexGivenRgb } from "./_internal/hexGivenRgb";
import { highContrastColorGivenColor } from "./_internal/highContrastColorGivenColor";
import { distanceGivenColors } from "./_internal/distanceGivenColors";

export interface HsbColor {
  h: Percent;
  s: Percent;
  b: Percent;
}

export interface HslColor {
  h: Percent;
  s: Percent;
  l: Percent;
}

export interface LabColor {
  l: number;
  a: number;
  b: number;
}

export interface HclColor {
  h: Percent;
  c: Percent;
  l: Percent;
}

export interface RgbFloatColor {
  r: Percent;
  g: Percent;
  b: Percent;
}

export interface XyzColor {
  x: number;
  y: number;
  z: number;
}

interface PortableColor {
  l: number;
  a: number;
  b: number;
  alpha?: number;
}

export class Color {
  readonly alpha: Percent;

  private _labColor: LabColor;
  private _hexString: string | undefined;

  static isEqual(a: Color, b: Color): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static givenHslFloat(
    hslColor: HslColor,
    alpha: Percent = Percent.givenFraction(1, 1)
  ): Color {
    return Color.givenRgbFloat(rgbFloatGivenHsl(hslColor), alpha);
  }

  static givenHexString(hexColor: string): Color {
    return Color.givenRgbFloat(rgbFloatGivenHex(hexColor));
  }

  static givenHclFloat(
    hclColor: HclColor,
    alpha: Percent = Percent.givenFraction(1, 1)
  ): Color {
    return new Color(labGivenHcl(hclColor), alpha);
  }

  static givenRgbFloat(
    rgbColor: RgbFloatColor,
    alpha: Percent = Percent.givenFraction(1, 1)
  ): Color {
    const labColor = labGivenXyz(xyzGivenRgbFloat(rgbColor));
    return new Color(labColor, alpha);
  }

  static givenRgb255(r: number, g: number, b: number, a?: Percent): Color {
    return Color.givenRgbFloat(
      {
        r: Percent.givenFraction(r, 255),
        g: Percent.givenFraction(g, 255),
        b: Percent.givenFraction(b, 255),
      },
      a
    );
  }

  static givenColorNumber(intColor: number, alpha: number = 1): Color {
    let alphaString;

    if (alpha === 1) {
      alphaString = "";
    } else {
      alphaString = Math.round(
        NumberUtil.numberWithHardLimit(alpha, 0, 1) * 255
      )
        .toString(16)
        .padStart(2, "0");
    }

    const hex = `#${intColor.toString(16).padStart(6, "0")}${alphaString}`;
    return Color.givenHexString(hex);
  }

  private constructor(labColor: LabColor, alpha: Percent) {
    this._labColor = labColor;
    this.alpha = alpha;
  }

  isEqual(otherColor: Color): boolean {
    if (otherColor == null) {
      return false;
    }

    return (
      this._labColor.a === otherColor._labColor.a &&
      this._labColor.b === otherColor._labColor.b &&
      this._labColor.l === otherColor._labColor.l &&
      this.alpha === otherColor.alpha
    );
  }

  toPortableString(): string {
    const obj: PortableColor = {
      l: this._labColor.l,
      a: this._labColor.a,
      b: this._labColor.b,
      alpha: this.alpha.toNumber(1),
    };

    return JSON.stringify(obj);
  }

  withLightness(absoluteLightness: number): Color {
    const { a, b } = this._labColor;

    return new Color(
      {
        l: absoluteLightness * 100,
        a,
        b,
      },
      this.alpha
    );
  }

  withRelativeLightness(relativeLightness: number): Color {
    const { l } = this._labColor;

    return this.withLightness(l / 100 + relativeLightness);
  }

  withHue(absoluteHue: Percent): Color {
    const { s, l } = hslGivenRgbFloat(this.toRgbFloatColor());

    return new Color(
      labGivenXyz(
        xyzGivenRgbFloat(
          rgbFloatGivenHsl({
            h: absoluteHue,
            s,
            l,
          })
        )
      ),
      this.alpha
    );
  }

  withRelativeHue(relativeHue: Percent): Color {
    const { h } = hslGivenRgbFloat(this.toRgbFloatColor());

    let absoluteHue: number = h.toNumber(1) + relativeHue.toNumber(1);

    if (absoluteHue > 1) {
      absoluteHue -= 1;
    }
    if (absoluteHue < 0) {
      absoluteHue += 1;
    }

    return this.withHue(Percent.givenFraction(absoluteHue, 1));
  }

  withSaturation(absoluteSaturation: Percent): Color {
    let { l, h } = hclGivenLab(this._labColor);

    return new Color(labGivenHcl({ h, c: absoluteSaturation, l }), this.alpha);
  }

  withRelativeSaturation(relativeSaturation: Percent): Color {
    const hcl = hclGivenLab(this._labColor);
    let c = hcl.c.toNumber(1);

    c = NumberUtil.numberWithHardLimit(
      c + relativeSaturation.toNumber(1),
      0,
      1
    );

    return this.withSaturation(Percent.givenFraction(c, 1));
  }

  withAlpha(absoluteAlpha: Percent): Color {
    return new Color(this._labColor, absoluteAlpha);
  }

  toDistanceGivenColor(otherColor: Color): number {
    return distanceGivenColors(this, otherColor);
  }

  toString(): string {
    return this.toRgbString();
  }

  toHexString(): string {
    if (this._hexString == null) {
      this._hexString = hexGivenRgb(this.toRgbFloatColor(), this.alpha);
    }

    return this._hexString;
  }

  toLabColor(): LabColor {
    return {
      l: this._labColor.l,
      a: this._labColor.a,
      b: this._labColor.b,
    };
  }

  toRgbFloatColor(): RgbFloatColor {
    return rgbFloatGivenXyz(xyzGivenLab(this._labColor));
  }

  toRgbString(): string {
    return rgbStringGivenRgbFloat(this.toRgbFloatColor(), this.alpha);
  }

  toHslColor(): HslColor {
    return hslGivenRgbFloat(this.toRgbFloatColor());
  }

  toHslString(): string {
    return hslStringGivenHsl(this.toHslColor());
  }

  toHsbColor(): HsbColor {
    return hsbGivenRgbFloat(this.toRgbFloatColor());
  }

  toHsbString(): string {
    return hsbStringGivenHsb(this.toHsbColor());
  }

  toHclColor(): HclColor {
    return hclGivenLab(this._labColor);
  }

  toHighContrastColor(): Color {
    return highContrastColorGivenColor(this);
  }

  toColorNumber(): number {
    return parseInt(this.toHexString().slice(1, 7), 16);
  }
}
