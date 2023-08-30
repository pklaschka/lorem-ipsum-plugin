/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import texts from '../placeholder-texts.json';

export interface LoremIpsumOptions {
	trim: boolean;
	terminationString: '.' | '!' | '?' | 'n/a';
	includeLineBreaks: boolean;
	randomize: boolean;
	text: keyof typeof texts;
}
