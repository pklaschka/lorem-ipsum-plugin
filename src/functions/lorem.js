/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const {Text, RepeatGrid} = require('scenegraph');
const trimHeight = require('./trimHeight');
const debugHelper = require('../helpers/debug');
require('../helpers/check-selection');
const analytics = require('../helpers/analytics');

/**
 * The available placeholder texts
 * @type {Object<string,string>}
 */
const texts = require('../placeholder-texts.json');

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
function applyToAreaText(element, options, terminationString) {
    let prevCount = 0;
    let count = 1;
    debugHelper.log('Propagating forward');
    do {
        prevCount = count;
        count *= 2;
        applyText(element, loremText(count, options.text, options.includeLineBreaks) + terminationString);
    } while (!element.clippedByArea && count < 100000);
    debugHelper.log('Propagating backwards from ', count);

    count = checkBetween(prevCount, count, (count) => {
        applyText(element, loremText(count, options.text, options.includeLineBreaks) + terminationString);
        return element.clippedByArea;
    });
    applyText(element, loremText(count, options.text, options.includeLineBreaks) + terminationString);

    debugHelper.log('Completed at ', count);
    if (options.trim) {
        trimHeight();
    }
}

/**
 * Apply placeholder text to Point Text
 * @param {import('scenegraph').Text} element
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 * @param {string} terminationString
 */
function applyToPointText(element, options, terminationString) {
    element.text = loremText(2, options.text, false) + terminationString;
}

/**
 * Fills text area with placeholder text (Lorem Ipsum)
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 */
function lorem(options) {
    const selection = require('scenegraph').selection;

    debugHelper.log('Lorem ipsum with options ', (options));
    let terminationString = options.terminationString === 'n/a' ? '' : options.terminationString;
    for (let element of selection.items) {
        if (element instanceof Text && element.areaBox) {
            applyToAreaText(element, options, terminationString);
        } else if (element instanceof Text) {
            applyToPointText(element, options, terminationString);
        } else {
            debugHelper.log('Node ', element, ' is not a text layer.');
        }
    }
    analytics.verifyAcceptance({
        pluginName: 'Lorem Ipsum',
        privacyPolicyLink: 'https://xdplugins.pabloklaschka.de/privacy-policy',
        color: '#2D4E64'
    }).then(()=>{
        analytics.send('lorem', options);
    });
}

/**
 * Applies text to the passed text layer (also, if it's e.g. inside a RepeatGrid, text gets applied)
 * @param {import('scenegraph').Text} textLayer
 * @param {string} text
 */
function applyText(textLayer, text) {
    let optRepeatGridNode;
    if (textLayer.parent && textLayer.parent.parent && textLayer.parent.parent instanceof RepeatGrid) {
        optRepeatGridNode = textLayer.parent.parent;
    }

    if (optRepeatGridNode)
        optRepeatGridNode.attachTextDataSeries(textLayer, [text]);
    else
        textLayer.text = text;
}

/**
 * A callback to determine whether a specific number of words clips the Area Text node
 * @callback isClipped
 * @param {number} n Number of words
 * @returns {boolean} number of words clip Area Text?
 */

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

/**
 *
 * @param {number} count
 * @param {string} text
 * @param {boolean} includeLineBreaks
 * @return {string}
 */
function loremText(count, text, includeLineBreaks) {
    /**
     *
     * @param {string} strText
     * @param {number} n Number of words
     * @param {boolean} includeLineBreaks
     * @return {string}
     */
    function trimToNWords(strText, n, includeLineBreaks) {
        // Ensure text is long enough:
        while (strText.split(' ').length < n) {
            strText = includeLineBreaks ? (strText + '\n' + strText) : (strText + ' ' + strText);
        }
        return strText
            .split(' ')
            .splice(0, n)
            .join(' ');
    }

    let originalString = texts[text];
    let strReturn = trimToNWords(originalString, count, includeLineBreaks).trim();
    if (strReturn.endsWith('.') || strReturn.endsWith(',') || strReturn.endsWith('?') || strReturn.endsWith(';') || strReturn.endsWith(':') || strReturn.endsWith('-') || strReturn.endsWith('–') || strReturn.endsWith('!'))
        strReturn = strReturn.substr(0, strReturn.length - 1);
    return strReturn;
}

module.exports = lorem;
