/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { SceneNode, Text } from 'scenegraph';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';
import { FixedAreaTextLoremIpsumStrategy } from './fixed-area-text-lorem-ipsum-strategy';

export class AutoAreaTextLoremIpsumStrategy implements ApplyLoremIpsumStrategy {
	private readonly node: Text;

	constructor(node: SceneNode) {
		if (!(node instanceof Text)) throw new Error('Node is not a text node');

		// @ts-ignore
		if (node.layoutBox.type !== Text.AUTO_HEIGHT) {
			throw new Error('Node is not a auto height area text node');
		}

		this.node = node;
	}

	async apply(options: LoremIpsumOptions) {
		// @ts-ignore
		this.node.layoutBox = {
			width: this.node.localBounds.width,
			height: this.node.localBounds.height,
			// @ts-ignore
			type: Text.FIXED_HEIGHT
		};

		const result = await new FixedAreaTextLoremIpsumStrategy(this.node).apply(
			options
		);

		// @ts-ignore
		this.node.layoutBox = {
			// @ts-ignore
			type: Text.AUTO_HEIGHT,
			width: this.node.localBounds.width
		};

		return result;
	}
}
