/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import * as fs from 'node:fs/promises';
import {DIST, STATIC} from './lib/constants.mjs';
import {buildMain} from './lib/build-ts.mjs';
import {setupDistFolder} from './lib/setup-dist-folder.mjs';

await setupDistFolder();

// Copy the static files from the static folder to the dist folder
await fs.cp(STATIC, DIST, { recursive: true });

// Build the main script
await buildMain();
