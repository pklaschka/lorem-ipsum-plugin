/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import {log} from '../lib/log.mjs';

/**
 * A plugin that logs the build results to the console.
 * @returns {import('esbuild').Plugin}
 */
export function reporterPlugin() {
	return {
		name: 'reporter',
		setup(build) {
			build.initialOptions.metafile = true;
			build.onEnd(({ errors, metafile }) => {
				// if ()
				if (errors.length > 0) {
					log(
						'❌  Build failed!',
						'See the errors above for more information.'
					);
					return;
				}
				const outputFileName = Object.keys(metafile.outputs)[0];
				const outputFile = metafile.outputs[outputFileName];
				const bytes = formatBytes(outputFile.bytes);

				log(
					`✅`,
					`Build complete!`,
					`${
						Object.keys(metafile.inputs).length
					} sources compiled to ${outputFileName} (${bytes})`,
					'Reload the plugin in UDT to see the changes.'
				);
				// console.log(`✅ Build complete! ${outputFiles.length} files written to ${DIST_MAIN}`);
			});
		}
	};
}

function formatBytes(bytes) {
	if (bytes < 1024) return bytes + ' bytes';
	else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KiB';
	else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MiB';
	else return (bytes / 1073741824).toFixed(3) + ' GiB';
}
