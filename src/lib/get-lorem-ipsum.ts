/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

/**
 * The available placeholder texts
 */
import texts from '../placeholder-texts.json';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';

export function getLoremIpsum(
	options: LoremIpsumOptions,
	length: number
): string {
	return (
		getText(length, options.text, options.includeLineBreaks) +
		getTerminationString(options.terminationString)
	);
}

function getTerminationString(
	terminationString: LoremIpsumOptions['terminationString']
) {
	return terminationString === 'n/a' ? '' : terminationString;
}

/**
 * Generates placeholder text
 * @param length text length in words
 * @param textKey placeholder text key
 * @param includeLineBreaks include line breaks in the placeholder text?
 * @return placeholder text
 */
function getText(
	length: number,
	textKey: keyof typeof texts,
	includeLineBreaks: boolean
) {
	const strReturn = trimToNWords(texts[textKey], length, includeLineBreaks);
	if (/[.?!,;:\-–]$/.test(strReturn)) return strReturn.slice(0, -1); // Remove punctuation at the end

	return strReturn;
}

/**
 * Trims a string to n words.
 * @param strText the source string
 * @param n Number of words
 * @param includeLineBreaks
 * @return the trimmed string
 */
function trimToNWords(strText: string, n: number, includeLineBreaks: boolean) {
	// Ensure the text is long enough:
	while (strText.split(' ').length < n) {
		strText = includeLineBreaks
			? `${strText}\n${strText}`
			: `${strText} ${strText}`;
	}

	return strText.split(' ').splice(0, n).join(' ').trim();
}
