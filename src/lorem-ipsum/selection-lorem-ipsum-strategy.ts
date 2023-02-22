/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import { selection } from 'scenegraph';
import { AutoLengthLoremIpsumStrategy } from './auto-length-lorem-ipsum-strategy';

export class SelectionLoremIpsumStrategy implements ApplyLoremIpsumStrategy {
	async apply(options: LoremIpsumOptions): Promise<boolean> {
		const results = await Promise.all(
			selection.items
				.map(node => new AutoLengthLoremIpsumStrategy(node))
				.map(strategy => strategy.apply(options))
		);

		return results.some(result => result);
	}
}
