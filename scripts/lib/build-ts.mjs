/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import * as esbuild from 'esbuild';
import {DIST_MAIN, SRC_MAIN} from './constants.mjs';
import {sassPlugin} from 'esbuild-sass-plugin';
import {reporterPlugin} from '../esbuild-plugins/reporter-plugin.mjs';
import {uxpPlugin} from '../esbuild-plugins/uxp-plugin.mjs';
import {imageDataUrlLoaderPlugin} from '../esbuild-plugins/image-data-url-loader-plugin.mjs';

const options = {
	entryPoints: [SRC_MAIN],
	bundle: true,
	outfile: DIST_MAIN,
	plugins: [
		uxpPlugin(),
		sassPlugin({
			type: 'style'
		}),
		reporterPlugin(),
		imageDataUrlLoaderPlugin()
	],
	logLevel: 'warning'
};

export async function buildMain() {
	await esbuild.build(options);
}
