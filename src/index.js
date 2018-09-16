/**
 * Take a fColor and sColor in parameter.
 * Use these 2 colors to compute a color diff ratio.
 * If the returned ratio is greater than the accepted (acptRatio) one.
 * Then we have to pick a new color from the rplColors array.
 * And we restart the process to to compute a new color diff ratio.
 *
 * @param {String} fColor
 * @param {String} sColor
 * @param {Number} acptRatio
 * @param {Array.<String>} rplColors
 */
export default function colorsDiff(fColor, sColor, acptRatio, rplColors/*, opts*/) {
    if (!fColor || !sColor) {
        return '#FFFFFF';
    }

    //let options = buildOpts(opts);
    let fRGB = hexOrRgbToRGBArray(fColor);
    let sRGB = hexOrRgbToRGBArray(sColor);

    if (fRGB === null && sRGB === null) {
        return '#FFFFFF';
    } else if (fRGB !== null && sRGB === null) {
        return fColor;
    } else if (fRGB === null && sRGB !== null) {
        return invertColor([], hexToRGBArray(sColor));
    }

    /*if (rplColors.length === 0) {
        if (options.invertColor) {
            return invertColor([], hexToRGBArray(sColor));
        }
        return fColor;
    }

    if (options.invertColor) {
        return invertColor(rplColors, sRGB);
    }*/
    return minColorDiff(rplColors, sColor, acptRatio);
}

/**
 * Check format of the color, and returns RGB Array.
 *
 * @param color
 */
function hexOrRgbToRGBArray(color) {
    if (isHex(color)) {
        return hexToRGBArray(color);
    }
    if (isRgb(color)) {
        return rgbToRGBArray(color);
    }
    return null;
}

/*function buildOpts(opts) {
    let options = {};

    if (typeof opts !== 'undefined') {
        options = opts;
    }
    if (typeof options.invertColor === 'undefined') {
        options.invertColor = false;
    }
    return options;
}*/

/**
 * Check if the given string is a hex format.
 *
 * @param color
 */
function isHex(color) {
    return color.indexOf('#') === 0 && color.length === 7;
}

/**
 * Check if the given string is a RGB format.
 *
 * @param color
 */
function isRgb(color) {
    let isRGB = false;
    if (
        color.indexOf('rgb') === 0 &&
        color.indexOf('(') === 3 &&
        (color.indexOf(')') === color.length - 1)
    ) {
        let rgbArray = color.split('(')[1]
            .split(')')[0]
            .split(',');
        if (rgbArray.length === 3) {
            isRGB = true;
        }
    }

    return isRGB;
}

/**
 * Take a string as a RGB format. And convert it into an array of number.
 * Array[0] = R
 * Array[1] = G
 * Array[2] = B
 *
 * @param color
 */
function rgbToRGBArray(color) {
    let rgb = [];
    let rgbColor = color.split('(')[1].split(')')[0].split(',');

    for (let i = 0; i < rgbColor.length; ++i) {
        rgb[i] = Number(rgbColor[i]);
    }
    return rgb;
}

/**
 * Take the given hex color string. And transform it to
 * an array of RGB.
 * Array[0] = R
 * Array[1] = G
 * Array[2] = B
 *
 * @param color
 */
function hexToRGBArray(color) {
    let rgb = [];
    let hexColor = color.substr(1);

    rgb[0] = parseInt(hexColor.substring(0, 2), 16);
    rgb[1] = parseInt(hexColor.substring(2, 4), 16);
    rgb[2] = parseInt(hexColor.substring(4, 6), 16);

    return rgb;
}

/**
 * Compute the diff between 2 colors.
 * And return a ratio.
 * 0 that means 2 colors are opposite.
 * 1 otherwise
 *
 * @param fRGB
 * @param sRGB
 */
function computeColorsDiff(fRGB, sRGB) {
    let r = 255 - Math.abs(fRGB[0] - sRGB[0]);
    let g = 255 - Math.abs(fRGB[1] - sRGB[1]);
    let b = 255 - Math.abs(fRGB[2] - sRGB[2]);

    r /= 255;
    g /= 255;
    b /= 255;

    return (r + g + b) / 3;
}

/**
 * If the fColor is too close of the cmpColor.
 * We have to replace fColor with the new one.
 * That's why we have to pick a new color in the rplColors array.
 * We have to pink one color which lower than the accepted diff.
 * If we don't have any color with a ratio lower than the accepted one.
 * We choose by default the first color.
 *
 * @param rplColors
 * @param cmpColor
 * @param acptRatio
 */
function minColorDiff(rplColors, cmpColor, acptRatio) {
    let minColor = rplColors[0];
    let cmpColorHex = hexToRGBArray(cmpColor);

    for (let i = 0; i < rplColors.length; ++i) {
        let curHexColor = hexToRGBArray(rplColors[i]);
        let colorDiff = computeColorsDiff(curHexColor, cmpColorHex);

        if (colorDiff < acptRatio) {
            minColor = rplColors[i];
        }
    }
    return minColor;
}

/**
 * See this article for more information about the formula.
 * https://goo.gl/TwXTEM
 *
 * According to the computation. If the result is lower than 186, we use first
 * color present in rplColors, otherwise we use the second color.
 *
 * If rplColors hasn't 2 colors length. We use black and white color by default.
 *
 * @param rplColors
 * @param sRGB
 */
function invertColor(rplColors, sRGB) {
    let shouldInvertColor = (
        sRGB[0] * 0.299 + sRGB[1] * 0.587 + sRGB[2] * 0.114
    ) > 186;

    if (rplColors.length < 2) {
        return (shouldInvertColor ? '#000000' : '#FFFFFF');
    }
    return (shouldInvertColor ? rplColors[0] : rplColors[1]);
}
