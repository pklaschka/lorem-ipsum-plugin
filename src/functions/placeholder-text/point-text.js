/*
 * Copyright (c) 2020. by Pablo Klaschka
 */
const generatePlaceholderText = require('./generate-placeholder-text');

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
module.exports = function pointText(element, options, terminationString) {
    element.text = generatePlaceholderText(2, options.text, false) + terminationString;
};
