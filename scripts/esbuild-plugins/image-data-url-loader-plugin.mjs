/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

/**
 * A plugin that loads images as data URLs.
 * @returns {esbuild.Plugin}
 */
export function imageDataUrlLoaderPlugin() {
	return {
		name: 'image-data-url-loader',
		setup(build) {
			build.initialOptions.loader = {
				...build.initialOptions.loader,
				'.png': 'dataurl',
				'.jpg': 'dataurl',
				'.jpeg': 'dataurl',
				'.gif': 'dataurl',
				'.svg': 'dataurl'
			};
		}
	};
}
