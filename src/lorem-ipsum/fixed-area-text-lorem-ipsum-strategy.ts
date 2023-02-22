/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { SceneNode, Text } from 'scenegraph';
import { applyText } from '../lib/apply-text';
import { getLoremIpsum } from '../lib/get-lorem-ipsum';
import { binaryLengthSearch } from '../lib/binary-length-search';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';

export class FixedAreaTextLoremIpsumStrategy
	implements ApplyLoremIpsumStrategy
{
	private static readonly MAX_NUMBER_OF_WORDS = 100000;
	private static readonly INITIAL_NUMBER_OF_WORDS = 1;
	private numberOfWords =
		FixedAreaTextLoremIpsumStrategy.INITIAL_NUMBER_OF_WORDS;
	private readonly node: Text;

	constructor(node: SceneNode) {
		if (!(node instanceof Text)) throw new Error('Node is not a text node');

		// @ts-ignore
		if (node.layoutBox.type !== Text.FIXED_HEIGHT) {
			throw new Error('Node is not a fixed height area text node');
		}

		this.node = node;
	}

	async apply(options: LoremIpsumOptions) {
		// Find out how many words we can fit in the text area
		this.doubleWordsUntilItClips(options);
		this.binarySearchNumberOfWords(options);

		// Apply the text
		applyText(this.node, getLoremIpsum(options, this.numberOfWords));

		// Apply post-processing
		this.trimIfSpecified(options);

		return true;
	}

	private trimIfSpecified(options: LoremIpsumOptions) {
		if (!options.trim) {
			return;
		}

		this.node.resize(
			this.node.localBounds.width,
			binaryLengthSearch(0, this.node.localBounds.height, height => {
				this.node.resize(this.node.localBounds.width, height);
				return this.node.clippedByArea;
			})
		);
	}

	private binarySearchNumberOfWords(options: LoremIpsumOptions) {
		/**
		 * Maximum number of words that doesn't clip the text area
		 */
		this.numberOfWords = binaryLengthSearch(
			this.numberOfWords,
			this.numberOfWords / 2,
			n => {
				applyText(this.node, getLoremIpsum(options, n));
				return this.node.clippedByArea;
			}
		);
	}

	private doubleWordsUntilItClips(options: LoremIpsumOptions) {
		do {
			this.numberOfWords *= 2;
			applyText(this.node, getLoremIpsum(options, this.numberOfWords));
		} while (
			!this.node.clippedByArea &&
			this.numberOfWords < FixedAreaTextLoremIpsumStrategy.MAX_NUMBER_OF_WORDS
		);
	}
}
