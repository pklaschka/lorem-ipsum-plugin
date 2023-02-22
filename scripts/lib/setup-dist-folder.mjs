/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import fs from 'node:fs/promises';
import {DIST} from './constants.mjs';

/**
 * Deletes the dist folder if it exists and creates a new one, ensuring a clean slate.
 * @returns {Promise<void>}
 */
export async function setupDistFolder() {
	// Delete the dist folder if it exists
	try {
		await fs.rm(DIST, { recursive: true });
	} catch (e) {
		// Ignore
	}

	// Create the dist folder
	await fs.mkdir(DIST);
}
