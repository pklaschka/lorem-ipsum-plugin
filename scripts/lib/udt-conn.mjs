/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import * as fs from 'node:fs/promises';
import {resolve} from 'node:path';
import WebSocket from 'ws';
import {log} from './log.mjs';
import {DIST} from './constants.mjs';

/**
 * Creates a promise and returns a tuple of the promise and a function to resolve it.
 * @returns {[Promise, (value: any) => void]} A tuple of the promise and a function to resolve it.
 *
 * @example
 * const [promise, resolve] = usePromiseValue();
 * resolve('foo');
 * promise.then((value) => console.log(value)); // 'foo'
 */
function usePromiseValue() {
	let setClientId;
	let clientId;
	clientId = new Promise((resolve) => {
		setClientId = resolve;
	});

	return [clientId, setClientId];
}

/**
 * The Client ID of the UXP host app.
 */
const [clientId, setClientId] = usePromiseValue();
/**
 * The path to the sandbox storage folder of the UXP host app.
 */
const [sandboxStoragePath, setSandboxStoragePath] = usePromiseValue();
/**
 * Whether the UXP host app is ready to receive messages.
 */
const [ready, setReady] = usePromiseValue();

/**
 * The next message ID to use for reply handling.
 * @type {number}
 */
let nextMessageID = 1;
/**
 * A map of request IDs to callbacks.
 * @type {Record<number, (any) => void>}
 */
const responseHandlers = {};

/**
 * The plugin session ID of the currently loaded plugin.
 * @type {string | undefined}
 */
let pluginSessionId = await fs
	.readFile(resolve(DIST, 'pluginSessionId.txt'), 'utf8')
	.catch(() => undefined);

const ws = new WebSocket('ws://localhost:14001/socket/cli', {
	perMessageDeflate: false
});

ws.on('open', function open() {
	log('✅', 'UDT connected.');
});

ws.on('close', function close() {
	log('❌', 'UDT disconnected.');
	pluginSessionId = undefined;
});

ws.on('message', onMessage);

function onMessage(data) {
	// log('✅', data);
	const message = JSON.parse(data);

	if (
		!message.hasOwnProperty('command') ||
		typeof message.command !== 'string'
	) {
		log('❌', 'Message does not have a command property');
		return;
	}

	if (message.command === 'didAddRuntimeClient') {
		try {
			setClientId(message.id);
			setSandboxStoragePath(message.app.sandboxStoragePath);
			log('✅', 'Client ID and Sandbox Storage Path set');
		} catch (e) {
			log('❌', 'Cannot set client ID and sandbox storage path.', e.message);
		}
	}

	if (message.command === 'didCompleteConnection') {
		setReady(true);
	}

	if (message.command === 'hostAppLog' && process.env.VERBOSE === 'true')
		log('✨', message.details.message);

	if (message.command === 'reply') {
		const { requestId } = message;
		const callback = responseHandlers[requestId];
		if (!callback) {
			log('❌', 'Invalid request id received from ', message);
			return;
		}
		callback(message);
	}

	if (message.command === 'didRemoveRuntimeClient') {
		log('❌', 'Host app disconnected.');
		ws.close();
		pluginSessionId = undefined;
	}
}

function onError(error) {
	log(
		'❌',
		'Error',
		'Error connecting to UXP host app.',
		'Make sure the UXP host app and UDT are running.',
		'Details:',
		error.message
	);
	pluginSessionId = undefined;
	process.exit(1);
}

ws.on('error', onError);

/**
 * Sends a message to the UXP host app.
 *
 * This automatically wraps the message in a proxy command, and adds the client ID and request ID.
 * @param {*} message The message to send
 * @returns {Promise<any>} A promise that resolves with the response from the host app
 *
 * @example
 * const response = await sendRequest({
 *   command: '...',
 *   // ...
 * });
 *
 * log('✅', response);
 */
async function sendRequest(message) {
	const id = nextMessageID++;
	const [response, setResponse] = usePromiseValue();
	responseHandlers[id] = setResponse;
	ws.send(
		JSON.stringify({
			command: 'proxy',
			clientId: await clientId,
			requestId: id,
			message
		})
	);
	return await response;
}

/**
 * Calculates the path to the plugin's dist folder in the sandbox.
 *
 * This is the folder where the plugin's files are copied to.
 * @returns {Promise<string>} The path to the plugin's dist folder in the sandbox
 * @example
 * const SANDBOX_STORAGE_PATH = await getSandboxStoragePath();
 * const isInstalled = await fs.exists(SANDBOX_STORAGE_PATH);
 *
 * if (isInstalled) {
 *   log('✅', 'Plugin is installed');
 *   return;
 * }
 * log('❌', 'Plugin is not installed');
 */
async function getSandboxStoragePath() {
	const manifest = await fs.readFile(resolve(DIST, 'manifest.json'), 'utf-8');
	const { id: pluginId } = JSON.parse(manifest);
	return resolve(await sandboxStoragePath, 'UDTPlugins', `dist_${pluginId}`);
}

/**
 * Copies all files from the dist folder to the sandbox.
 *
 * Automatically waits for the sandbox storage path to be set.
 * @returns {Promise<void>} A promise that resolves when the files are copied
 * @example
 * await copyFilesToSandbox();
 */
async function copyFilesToSandbox() {
	const SANDBOX_STORAGE_PATH = await getSandboxStoragePath();

	await fs.mkdir(SANDBOX_STORAGE_PATH, { recursive: true });

	// Copy all files from DIST to SANDBOX_STORAGE_PATH
	const files = await fs.readdir(DIST);
	for (const file of files) {
		await Promise.all(
			files.map(async (file) => {
				await fs.cp(resolve(DIST, file), resolve(SANDBOX_STORAGE_PATH, file), {
					recursive: true
				});
			})
		);
	}
}

async function removeSandBoxFiles() {
	const SANDBOX_STORAGE_PATH = await getSandboxStoragePath();
	await fs.rm(SANDBOX_STORAGE_PATH, { recursive: true });
}

/**
 * Loads the plugin in the UXP host app.
 *
 * - Copies the plugin's files to the sandbox
 * - Waits for the UXP host app to be ready
 * - Sends a message to the UXP host app to load the plugin
 * @returns {Promise<void>} A promise that resolves when the plugin is loaded
 *
 * @example
 * await loadPlugin();
 */
export async function loadPlugin() {
	await ready;
	log('⏳', 'Loading plugin...');
	await copyFilesToSandbox();
	const resp = await sendRequest({
		command: 'Plugin',
		action: 'load',
		breakOnStart: false,
		params: {
			provider: {
				type: 'disk',
				path: DIST
			}
		}
	});
	pluginSessionId = resp.pluginSessionId;
	await fs.writeFile(resolve(DIST, 'pluginSessionId.txt'), pluginSessionId);
	log('✅', 'Plugin loaded.', `Session ID: ${pluginSessionId}`);
}

export async function reloadPlugin() {
	await ready;
	if (!pluginSessionId) {
		log('❌', 'Plugin cannot be reloaded', 'Plugin is not loaded.');
		return;
	}
	log('⏳', 'Reloading plugin...', `Session ID: ${pluginSessionId}`);
	await copyFilesToSandbox();
	await sendRequest({
		command: 'Plugin',
		action: 'reload',
		pluginSessionId
	});
	log('✅', 'Plugin reloaded.');
}

export async function unloadPlugin() {
	await ready;
	if (!pluginSessionId) {
		log('❌', 'Plugin cannot be unloaded', 'Plugin is not loaded.');
		return;
	}
	log('⏳', 'Unloading plugin...', `Session ID: ${pluginSessionId}`);
	await sendRequest({
		command: 'Plugin',
		action: 'unload',
		pluginSessionId
	});
	await removeSandBoxFiles();
	pluginSessionId = undefined;
	log('✅', 'Plugin unloaded.');
}

export async function debugPlugin() {
	await ready;
	if (!pluginSessionId) {
		log('❌', 'Plugin cannot be debugged', 'Plugin is not loaded.');
		return;
	}
	log('⏳', 'Debugging plugin...', `Session ID: ${pluginSessionId}`);
	const result = await sendRequest({
		command: 'Plugin',
		action: 'debug',
		pluginSessionId
	});
	log(
		'✅',
		'Debugging session is open.',
		`Launch Chrome DevTools at:`,
		result.chromeDevToolsUrl
	);
}

log(
	'⏳',
	'Connecting to UDT and UXP host app...',
	'Open them if they are not already open.'
);

await ready;

log('✅', 'UXP Connection ready.', `Client ID: ${await clientId}`);
