/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

/**
 * A callback to determine whether a specific number of words clips the Area Text node
 * @callback isClipped
 * @param {number} n Number of words
 * @returns {boolean} number of words clip Area Text?
 */

const debugHelper = require('../../helpers/debug');
const generatePlaceholderText = require('./generate-placeholder-text');

const applyText = require('./apply-text');
const trimHeight = require('../trimHeight');


/**
 * Apply placeholder text to Area Text
 * @param {import('scenegraph').Text} element
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 * @param {string} terminationString
 */
module.exports = function applyToAreaText(element, options, terminationString) {
    let prevCount = 0;
    let count = 1;
    debugHelper.log('Propagating forward');
    do {
        prevCount = count;
        count *= 2;
        applyText(element, generatePlaceholderText(count, options.text, options.includeLineBreaks) + terminationString);
    } while (!element.clippedByArea && count < 100000);
    debugHelper.log('Propagating backwards from ', count);

    count = checkBetween(prevCount, count, (count) => {
        applyText(element, generatePlaceholderText(count, options.text, options.includeLineBreaks) + terminationString);
        return element.clippedByArea;
    });
    applyText(element, generatePlaceholderText(count, options.text, options.includeLineBreaks) + terminationString);

    debugHelper.log('Completed at ', count);
    if (options.trim) {
        trimHeight();
    }
};

/**
 * @param {number} oldCount The highest count that was clipped
 * @param {number} newCount The lowest count that wasn't clipped
 * @param {isClipped} isClipped
 * @returns {number} The maximum number of words for which the text doesn't clip
 */
function checkBetween(oldCount, newCount, isClipped) {
    debugHelper.log('Checking between ', oldCount, ' and ', newCount);

    if (Math.abs(oldCount - newCount) < 2)
        return oldCount;

    let half = Math.floor((oldCount + newCount) / 2);

    return isClipped(half) ? checkBetween(oldCount, half, isClipped) : checkBetween(half, newCount, isClipped);
}
