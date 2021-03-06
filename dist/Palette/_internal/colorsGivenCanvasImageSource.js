"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorsGivenCanvasImageSource = void 0;
const util_1 = require("@anderjason/util");
const Color_1 = require("../../Color");
function colorsGivenCanvasImageSource(input, maxColors) {
    const internalCanvas = document.createElement("canvas");
    internalCanvas.width = 50;
    internalCanvas.height = 50;
    const ctx = internalCanvas.getContext("2d");
    ctx.drawImage(input, 0, 0, internalCanvas.width, internalCanvas.height);
    const frequencyByHexString = new Map();
    const samplePixel = (x, y) => {
        const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
        if (a === 255) {
            const color = Color_1.Color.givenRgb255(r, g, b);
            const hexColor = color.toHexString();
            if (!frequencyByHexString.has(hexColor)) {
                frequencyByHexString.set(hexColor, 1);
            }
            else {
                frequencyByHexString.set(hexColor, frequencyByHexString.get(hexColor) + 1);
            }
        }
    };
    const imgPixelCount = internalCanvas.width * internalCanvas.height;
    if (imgPixelCount <= maxColors) {
        for (let x = 0; x < internalCanvas.width; x++) {
            for (let y = 0; y < internalCanvas.height; y++) {
                samplePixel(x, y);
            }
        }
    }
    else {
        // random sampling
        const sampleCount = maxColors * 8;
        for (let n = 0; n < sampleCount; n++) {
            const x = Math.floor(Math.random() * internalCanvas.width);
            const y = Math.floor(Math.random() * internalCanvas.height);
            samplePixel(x, y);
        }
    }
    let results = [];
    for (const [hexColor, frequency] of frequencyByHexString) {
        results.push({
            hexColor,
            frequency,
        });
    }
    results = util_1.ArrayUtil.arrayWithOrderFromValue(results, (r) => r.frequency, "descending");
    const clusters = [];
    let needsCluster = [...results];
    const distanceThreshold = 10;
    while (needsCluster.length > 1) {
        const targetColor = Color_1.Color.givenHexString(needsCluster[0].hexColor);
        const removeHexColors = new Set();
        const cluster = needsCluster.filter((item) => {
            const itemColor = Color_1.Color.givenHexString(item.hexColor);
            const distance = targetColor.toDistanceGivenColor(itemColor);
            const inCluster = distance < distanceThreshold;
            if (inCluster) {
                removeHexColors.add(item.hexColor);
            }
            return inCluster;
        });
        clusters.push(cluster);
        needsCluster = needsCluster.filter((item) => !removeHexColors.has(item.hexColor));
    }
    if (needsCluster.length > 0) {
        clusters.push([needsCluster[0]]);
    }
    results = clusters.map((cluster) => cluster[0]);
    results = results.slice(0, maxColors);
    let colors = results.map((r) => Color_1.Color.givenHexString(r.hexColor));
    const firstColor = colors[0];
    colors = util_1.ArrayUtil.arrayWithOrderFromValue(colors, (color) => {
        return firstColor.toDistanceGivenColor(color);
    }, "ascending");
    return colors;
}
exports.colorsGivenCanvasImageSource = colorsGivenCanvasImageSource;
//# sourceMappingURL=colorsGivenCanvasImageSource.js.map