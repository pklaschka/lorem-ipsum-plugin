/*
 * Copyright (c) 2021. by Pablo Klaschka
 */
const generatePlaceholderText = require('./generate-placeholder-text');
const applyText = require('./apply-text');

/**
 * Apply placeholder text to Point Text
 * @param {import('scenegraph').Text} element
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 * @param {string} parsedTerminationString The parsed termination string, i.e., '' for 'n/a'
 */
module.exports = function pointText(element, options, parsedTerminationString) {
	applyText(
		element,
		generatePlaceholderText(2, options.text, false) + parsedTerminationString
	);
};
