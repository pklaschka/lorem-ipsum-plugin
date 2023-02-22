/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import {loadPlugin, unloadPlugin} from './lib/udt-conn.mjs';
import {log} from './lib/log.mjs';

await loadPlugin();

// On quit, unload the plugin
process.on('SIGINT', async () => {
	log('✅', 'Received SIGINT.');
	await unloadPlugin();
	process.exit(0);
});
