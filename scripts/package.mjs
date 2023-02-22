/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import {resolve} from 'node:path';
import {mkdir, readFile} from 'node:fs/promises';
import {zip} from 'zip-a-folder';
import {BUILDS, DIST} from './lib/constants.mjs';
import {log} from './lib/log.mjs';
import {getFileNameCompatibleTimestamp} from './lib/file-name-timestamp.mjs';

const manifest = JSON.parse(
	await readFile(resolve(DIST, 'manifest.json'), 'utf8')
);

log(
	'⏳',
	'Packaging plugin...',
	`ID: ${manifest.id}`,
	`Name: ${manifest.name}`,
	`Version: ${manifest.version}`
);

const fileName = `${manifest.id}--v${
	manifest.version
}--${getFileNameCompatibleTimestamp()}.xdx`;
const zipPath = resolve(BUILDS, fileName);

await mkdir(BUILDS, { recursive: true });
await zip(DIST, zipPath);

log('✅', 'Plugin packaged!', `Path: ${zipPath}`);
