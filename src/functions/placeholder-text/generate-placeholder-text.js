/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

/**
 * The available placeholder texts
 * @type {Object<string,string>}
 */
const texts = require('../../placeholder-texts.json');

/**
 * Generates placeholder text
 * @param {number} length text length in words
 * @param {string} textKey placeholder text key
 * @param {boolean} includeLineBreaks include line breaks in the placeholder text?
 * @return {string} placeholder text
 */
module.exports = function generatePlaceholderText(
    length,
    textKey,
    includeLineBreaks
) {
    let originalString = texts[textKey];
    let strReturn = trimToNWords(
        originalString,
        length,
        includeLineBreaks
    ).trim();
    if (
        strReturn.endsWith('.') ||
        strReturn.endsWith(',') ||
        strReturn.endsWith('?') ||
        strReturn.endsWith(';') ||
        strReturn.endsWith(':') ||
        strReturn.endsWith('-') ||
        strReturn.endsWith('–') ||
        strReturn.endsWith('!')
    )
        strReturn = strReturn.substr(0, strReturn.length - 1);
    return strReturn;
};

/**
 * Trims a string to n words.
 * @param {string} strText the source string
 * @param {number} n Number of words
 * @param {boolean} includeLineBreaks
 * @return {string} the trimmed string
 */
function trimToNWords(strText, n, includeLineBreaks) {
    // Ensure text is long enough:
    while (strText.split(' ').length < n) {
        strText = includeLineBreaks
            ? strText + '\n' + strText
            : strText + ' ' + strText;
    }
    return strText.split(' ').splice(0, n).join(' ');
}
