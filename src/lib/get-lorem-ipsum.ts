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
	length: number,
	seed: number = 0
): string {
	return (
		getText(length, options, options.randomize ? seed : 0) +
		getTerminationString(options.terminationString)
	);
}

/**
 * Generates a random number generator based on the mulberry32 algorithm (https://stackoverflow.com/a/47593316/1320237)
 *
 * @param a seed
 * @return a random number generator
 */
function mulberry32(a: number) {
	return function (): number {
		let t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function getTerminationString(
	terminationString: LoremIpsumOptions['terminationString']
) {
	return terminationString === 'n/a' ? '' : terminationString;
}

/**
 * The length of the segment (in words) that gets randomized
 *
 * The longer the segment, the longer the text will be randomized before repeating itself. However, the longer the
 * segment, the more computation is required.
 */
const RANDOM_SEGMENT_LENGTH = 5000;

/**
 * Generates placeholder text
 * @param length text length in words
 * @param text placeholder text key
 * @param includeLineBreaks include line breaks in the placeholder text?
 * @param seed seed for the random number generator. Must stay the same for the same SceneNode for auto-length
 * @return placeholder text
 */
function getText(
	length: number,
	{ text: textKey, includeLineBreaks, randomize }: LoremIpsumOptions,
	seed: number
) {
	const sentenceShuffleGenerator = mulberry32(seed);
	let text = texts[textKey];

	text = trimToNWords(text, RANDOM_SEGMENT_LENGTH)
		.trim()
		.split('\n')
		.join(' ')
		.split('  ')
		.join(' ');

	if (randomize) {
		// Randomize sentence order
		text = shuffleSentencesWithEnquotes(text, sentenceShuffleGenerator);
	}

	if (includeLineBreaks) {
		const r2 = mulberry32(seed + 1);

		// Add line breaks
		text = text
			.split('. ')
			.map((sentence, index) => {
				const sentences = text.split('. ');
				if (
					index % 10 > r2() * 15 &&
					index > 0 && // not before the first sentence
					index < sentences.length - 10 // not in the last 10 sentences
				) {
					return `\n${sentence}. `;
				} else {
					return sentence + '. ';
				}
			})
			.join('');
	}

	text = trimToNWords(text, length).trim();

	if (/[.?!,;:\-–]$/.test(text)) return text.slice(0, -1); // Remove punctuation at the end

	return text;
}

/**
 * Shuffles the sentences of a text while preserving enquoted sections
 * @param text the text
 * @param random a random number generator
 * @returns the shuffled text
 */
function shuffleSentencesWithEnquotes(
	text: string,
	random: () => number
): string {
	// Extract enquoted sections
	const enquotedSections: string[] = text.match(/"[^"]*"/g) || [];

	// Replace enquoted sections with placeholders
	let textWithPlaceholders = text.replace(/"[^"]*"/g, '###ENQUOTED###');

	// Split the text into sentences while preserving punctuation
	const sentences: string[] = textWithPlaceholders
		.split(/([.!?])/g)
		.filter(sentence => sentence.trim() !== '');

	// Group sentences with their respective punctuation
	const groupedSentences: string[] = [];
	for (let i = 0; i < sentences.length; i += 2) {
		const sentence = sentences[i].trim();
		const punctuation = sentences[i + 1] || '';
		groupedSentences.push(sentence + punctuation);
	}

	// Shuffle the sentences
	const shuffledSentences = [...groupedSentences].sort(() => random() - 0.5);

	// Reconstruct the text with shuffled sentences and enquoted sections
	let shuffledText = '';
	let enquoteIndex = 0;

	for (const sentence of shuffledSentences) {
		if (sentence.includes('###ENQUOTED###')) {
			shuffledText += sentence.replace(
				'###ENQUOTED###',
				enquotedSections[enquoteIndex]
			);
			enquoteIndex++;
		} else {
			shuffledText += sentence;
		}

		shuffledText += ' ';
	}

	return shuffledText;
}

/**
 * Trims a string to n words.
 * @param strText the source string
 * @param n Number of words
 * @return the trimmed string
 */
function trimToNWords(strText: string, n: number) {
	// Ensure the text is long enough:
	while (strText.split(' ').length < n) {
		strText = `${strText} ${strText}`;
	}

	return strText.split(' ').splice(0, n).join(' ').trim();
}
