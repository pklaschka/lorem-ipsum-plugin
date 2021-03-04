/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

const debugHelper = require('../../helpers/debug');
const generatePlaceholderText = require('./generate-placeholder-text');
const applyText = require('./apply-text');
const trimHeight = require('../trim-height');
const findNotClippingTextLength = require('../binary-length-search');

/**
 * Apply placeholder text to Area Text
 * @param {import('scenegraph').Text} textNode
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 * @param {string} parsedTerminationString The parsed termination string, i.e., '' for 'n/a'
 */
module.exports = function applyToAreaText(
	textNode,
	options,
	parsedTerminationString
) {
	/**
	 * Number of words n that clips the text area, such that n/2 doesn't clip
	 *
	 * A multiple of 2
	 * @type {number}
	 */
	let numberOfWords = 1;

	// Calculate numberOfWords:
	debugHelper.log('Propagating forward');
	do {
		numberOfWords *= 2;
		applyText(
			textNode,
			generatePlaceholderText(
				numberOfWords,
				options.text,
				options.includeLineBreaks
			) + parsedTerminationString
		);
	} while (!textNode.clippedByArea && numberOfWords < 100000);
	debugHelper.log('Propagating backwards from ', numberOfWords);

	/**
	 * Maximum number of words that doesn't clip the text area
	 * @type {number}
	 */
	const n = findNotClippingTextLength(numberOfWords, numberOfWords / 2, n => {
		applyText(
			textNode,
			generatePlaceholderText(n, options.text, options.includeLineBreaks) +
			parsedTerminationString
		);
		return textNode.clippedByArea;
	});
	applyText(
		textNode,
		generatePlaceholderText(n, options.text, options.includeLineBreaks) +
		parsedTerminationString
	);

	debugHelper.log('Completed at ', n);
	if (options.trim) {
		trimHeight(textNode);
	}
};
