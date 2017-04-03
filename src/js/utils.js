"use strict";

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

/**
 * Load Script In Sequence
 *
 * @param {Array} scriptArray
 * @param {Function|null} [callback]
 * @method LoadScriptInSequence
 */
function LoadScriptInSequence(scriptArray, callback) {
    const loadScriptDOM = function (index) {
        if (index >= scriptArray.length) return callback ? callback() : null;
        let script = document.createElement("script");
        script.src = scriptArray[index];
        script.addEventListener('load', () => {
            loadScript(index + 1);
        });
        document.head.appendChild(script);
    };

    const loadScriptFetch = function (index) {
        if (index >= scriptArray.length) return callback ? callback() : null;
        return fetch(scriptArray[index], {
            method: "GET",
            redirect: 'follow',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'text/javascript'
            },
        })
            .then(res => res.blob())
            .then((blob) => {
                let script = document.createElement("script");
                script.src = URL.createObjectURL(blob);
                document.head.appendChild(script);

                return loadScript(index + 1);
            });
    };
    const loadScript = loadScriptDOM;

    let basePath = '';
    if (this instanceof HTMLScriptElement) {
        basePath = this.src.slice(0, this.src.lastIndexOf('/') + 1);

        scriptArray = scriptArray.map((src) => {
            if (src.startsWith('/')) return src;
            return basePath + src;
        });
    }
    return loadScript(0);
}

/**
 * Try convert an object to array
 * @param obj
 * @returns {*}
 */
Array.prototype.toArray = (obj) => {
    return Array.prototype.slice.call(obj);
};

/**
 * Get context between a string
 * @param {String} startString
 * @param {String} endString
 * @param {Number} [fromIndex] default = 0
 *
 * @returns {String} context
 */
String.prototype.getStringBetween = function (startString, endString, fromIndex) {
    if (fromIndex === undefined) fromIndex = 0;

    let startIndex = this.indexOf(startString, fromIndex);
    let endIndex = this.indexOf(endString, startIndex);

    if (startIndex === -1) return "";

    if (endIndex === -1) return this.substr(startIndex);

    //Remove Starting String
    startIndex += startString.length;

    return this.substring(startIndex, endIndex);
};

/**
 * Check whatever number in range
 *
 * @param {Number} minValue
 * @param {Number} maxValue
 * @returns {boolean}
 */
Number.prototype.inRange = function (minValue, maxValue) {
    return this >= minValue && this <= maxValue;
};

/**
 * Split string into lines
 * @returns {String[]} lines
 */
String.prototype.lines = function () {
    return this.split(/\r?\n/);
};

/**
 * The padStart() method pads the current string with another string (repeated, if needed)
 * so that the resulting string reaches the given length.
 *
 * The padding is applied from the start (left) of the current string.
 *
 * @param {Number} targetLength The length of the resulting string once the current string has been padded.
 *                  If the value is lower than the current string's length,
 *                  the current string will be returned as is.
 *
 * @param {String} [padString] The string to pad the current string with.
 *                              If this string is too long to stay within the target length,
 *                              it will be truncated and the left-most part will be applied.
 *                              The default value for this parameter is " " (U+0020).
 *
 * @returns {String} A String of the specified length with the pad string applied from the start.
 */
String.prototype.padStart = String.prototype.padStart || function (targetLength, padString) {
        if (padString === undefined) padString = ' ';
        let str = this.toString();
        while (str.length < targetLength) {
            str = padString + str;
        }

        return str;
    };

/**
 * Convert Object to integer
 * @param obj
 * @returns {Number}
 */
function intval(obj) {
    return parseInt(obj, 10);
}

/**
 * Convert Object to float
 * @param obj
 * @returns {Number}
 */
function floatval(obj) {
    return parseFloat(obj);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function (e) {
            reject(e);
        };
        img.src = src;
    });
}