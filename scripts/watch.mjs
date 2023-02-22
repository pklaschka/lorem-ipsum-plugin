/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import * as fs from 'node:fs/promises';
import {DIST, SRC, STATIC} from './lib/constants.mjs';
import {buildMain} from './lib/build-ts.mjs';
import {setupDistFolder} from './lib/setup-dist-folder.mjs';
import {log} from './lib/log.mjs';
import {loadPlugin, reloadPlugin, unloadPlugin} from './lib/udt-conn.mjs';

log('❗', 'Running in watch mode', 'Note that there is no type checking.');

await setupDistFolder();

// Copy the static files from the static folder to the dist folder
await fs.cp(STATIC, DIST, { recursive: true });

// Build the main script
await buildMain().catch(() => Promise.resolve()); // ignore errors since we're watching for changes

await loadPlugin();

/**
 * Warns the user if they've edited the manifest.json file.
 * @param {FileChangeInfo<string>} event The event object from the fs.watch() call
 */
function warnIfManifestGotUpdated(event) {
	if (event.filename === 'manifest.json') {
		log(
			`⚠️`,
			`You've edited the manifest.json file. You'll need to perform a full reload in UDT.`
		);
	}
}

/**
 * Watches the static folder for changes and copies them to the dist folder.
 * @returns {Promise<void>}
 */
async function watchStaticFolder() {
	// watch for changes to the static folder and copy them to the dist folder
	for await (const event of fs.watch(STATIC, { recursive: true })) {
		if (event.filename) {
			log(
				`⏳`,
				`Detected change to ${event.filename} in static folder. Performing full reload...`
			);
			// warnIfManifestGotUpdated(event);
			const src = `${STATIC}/${event.filename}`;
			const dst = `${DIST}/${event.filename}`;
			try {
				await fs.copyFile(src, dst);
			} catch (err) {
				await fs.rm(dst, { recursive: true });
			} finally {
				await loadPlugin();
			}
		}
	}
}

/**
 * Watches the src folder for changes and rebuilds the main script.
 * @returns {Promise<void>}
 */
async function watchSrcFolder() {
	// watch for changes to the src folder and rebuild the main script
	for await (const event of fs.watch(SRC, { recursive: true })) {
		log(
			`⏳`,
			`Detected change to ${event.filename} in src folder. Rebuilding...`
		);
		await buildMain().catch(() => Promise.resolve());
		await reloadPlugin();
	}
}

// On quit, unload the plugin
process.on('SIGINT', async () => {
	log('✅', 'Received SIGINT.');
	await unloadPlugin();
	process.exit(0);
});

await Promise.all([watchStaticFolder(), watchSrcFolder()]);
