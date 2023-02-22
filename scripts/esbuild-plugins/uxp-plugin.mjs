/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import {log} from '../lib/log.mjs';

/**
 * A plugin that tells esbuild to build the plugin to a UXP-compatible format.
 * @returns {import('esbuild').Plugin} The plugin
 */
export function uxpPlugin() {
	logUxpInfo();
	return {
		name: 'uxp',
		setup(build) {
			build.initialOptions.format = 'cjs';
			build.initialOptions.target = 'node12.18.3';
			build.initialOptions.external = [
				...(build.initialOptions.external || []),
				'scenegraph',
				'application',
				'clipboard',
				'commands',
				'assets',
				'uxp',
				'viewport',
				'photoshop'
			];
		}
	};
}

/**
 * Logs a message to the console to inform the user that the plugin is being built for UXP.
 */
function logUxpInfo() {
	log(
		'✨',
		'Building for UXP'
		// 'To load the plugin in the Adobe app, use the UXP Developer Tools (UDT).'
	);
}
