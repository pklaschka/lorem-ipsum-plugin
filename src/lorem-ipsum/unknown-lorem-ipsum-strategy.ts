/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';

export class UnknownLoremIpsumStrategy implements ApplyLoremIpsumStrategy {
	apply(options: LoremIpsumOptions) {
		return Promise.resolve(false);
	}
}
