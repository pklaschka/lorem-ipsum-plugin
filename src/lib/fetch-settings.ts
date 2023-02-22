/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import storage from 'xd-storage-helper';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';

const LOREM_OPTIONS_STORAGE_KEY = 'loremOptions';

/**
 * Fetch the settings from storage
 */
export async function fetchSettings(): Promise<LoremIpsumOptions> {
	return await storage.get('loremOptions', {
		text: 'lorem-lat',
		terminationString: 'n/a',
		includeLineBreaks: true,
		trim: false
	});
}

export async function saveSettings(options: LoremIpsumOptions) {
	await storage.set(LOREM_OPTIONS_STORAGE_KEY, options);
}
