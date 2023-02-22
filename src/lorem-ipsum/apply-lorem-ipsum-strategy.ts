/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { LoremIpsumOptions } from '../model/lorem-ipsum-options';

export interface ApplyLoremIpsumStrategy {
	/**
	 * Applies the Lorem Ipsum strategy
	 * @param options Lorem Ipsum options
	 * @return true if the strategy edited the document, false otherwise
	 */
	apply(options: LoremIpsumOptions): Promise<boolean>;
}
