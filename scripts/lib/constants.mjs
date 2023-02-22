/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..', '..');
export const SRC = path.resolve(ROOT, 'src');
export const SRC_MAIN = path.resolve(SRC, 'main.ts');
export const STATIC = path.resolve(ROOT, 'static');
export const DIST = path.resolve(ROOT, 'dist');
export const DIST_MAIN = path.resolve(DIST, 'main.js');
export const BUILDS = path.resolve(ROOT, 'builds');
