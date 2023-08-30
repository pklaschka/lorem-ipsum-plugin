/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';
import { SceneNode, Text } from 'scenegraph';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import { applyText } from '../lib/apply-text';
import { getLoremIpsum } from '../lib/get-lorem-ipsum';

export class PointTextLoremIpsumStrategy implements ApplyLoremIpsumStrategy {
	private readonly textNode: Text;

	constructor(node: SceneNode) {
		if (!(node instanceof Text)) throw new Error('Node is not a text node');

		// @ts-ignore
		if (node.layoutBox.type !== Text.POINT) {
			throw new Error('Node is not a point text node');
		}

		this.textNode = node;
	}

	async apply(options: LoremIpsumOptions) {
		applyText(this.textNode, getLoremIpsum(options, 2, Date.now()));
		return true;
	}
}
