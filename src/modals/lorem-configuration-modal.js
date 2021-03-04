/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

const storage = require('xd-storage-helper');
const debugHelper = require('../helpers/debug');
const lang = require('xd-localization-helper');
const analytics = require('../helpers/analytics');
const dialogHelper = require('xd-dialog-helper');

/**
 * Run Lorem Ipsum with configuration dialog
 */
async function loremWithModal() {
	try {
		await analytics.verifyAcceptance({
			pluginName: 'Lorem Ipsum',
			privacyPolicyLink: 'https://xdplugins.pabloklaschka.de/privacy-policy',
			color: '#2D4E64'
		});
	} catch (e) {
		return false;
	}
	debugHelper.log('Showing Lorem Ipsum modal');
	let options;
	try {
		options = await modalAsync();
	} catch (e) {
		return false;
	}
	const lorem = require('../functions/placeholder-text/fill-selection-with-placeholder-text');
	await lorem(options);
	return true;
}

/**
 * Display the Lorem Ipsum configuration dialog
 * @throws {Error} error when dialog gets canceled
 * @return {Promise<{trim: boolean, terminationString: string, includeLineBreaks: boolean, text: string}>}
 */
async function modalAsync() {
	const uiOptions = await storage.get('loremOptions', {
		text: 'lorem-lat',
		terminationString: 'n/a',
		includeLineBreaks: true,
		trim: false
	});

	try {
		/**
		 * The options for the Lorem Ipsum options
		 * @type {{text: string, terminationString: string, includeLineBreaks: boolean, trim: boolean}}
		 */
		const loremOptions = await dialogHelper.showDialog(
			'lorem-main',
			'Lorem Ipsum',
			[
				{
					id: 'description',
					type: dialogHelper.types.TEXT,
					label: lang.get('modal.lorem.description'),
					htmlAttributes: {}
				},
				{
					type: dialogHelper.types.SELECT,
					options: [
						{value: 'lorem-lat', label: 'Lorem Ipsum (Latin, Standard)'},
						{value: 'cicero-lat', label: 'Cicero (Latin)'},
						{value: 'cicero-en', label: 'Cicero (English)'},
						{value: 'pangram-en', label: 'Pangram (English)'},
						{value: 'pangram-de', label: 'Pangram (German)'},
						{value: 'pangram-es', label: 'Pangram (Espagnol)'},
						{value: 'pangram-fr', label: 'Pangram (Français)'}
					],
					id: 'text',
					label: lang.get('modal.lorem.text.label'),
					value: uiOptions.text,
					htmlAttributes: {}
				},
				{
					type: dialogHelper.types.SELECT,
					id: 'terminationString',
					label: lang.get('modal.lorem.terminate.label'),
					options: [
						{value: 'n/a', label: lang.get('modal.lorem.terminate.none')},
						{value: '.', label: lang.get('modal.lorem.terminate.period')},
						{value: '…', label: lang.get('modal.lorem.terminate.ellipsis')}
					],
					htmlAttributes: {},
					value: uiOptions.terminationString
				},
				{
					type: dialogHelper.types.CHECKBOX,
					id: 'includeLineBreaks',
					label: lang.get('modal.lorem.includeLineBreaks.label'),
					htmlAttributes: {},
					value: uiOptions.includeLineBreaks
				},
				{
					type: dialogHelper.types.CHECKBOX,
					id: 'trim',
					label: lang.get('modal.lorem.trim.label'),
					htmlAttributes: {},
					value: uiOptions.trim
				}
			],
			{
				okButtonText: lang.get('modal.lorem.btn.ok'),
				cancelButtonText: lang.get('modal.lorem.btn.cancel'),
				width: 400,
				css: `
                header {
                    background: #2D4E64;
                    height: 16px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                }
                input[type="checkbox"] {
                    width: 18px;
                }`,
				onBeforeShow: (dialogElement, elements, actions) => {
					dialogElement.appendChild(document.createElement('header'));

					const okButton = document.getElementById(
						'lorem-main-dialogHelperBtnOk'
					);

					if (!okButton) {
						throw new Error(
							'Ok button was not found and could therefore not get selected!'
						);
					}

					// Temporary fix for enter key not working on macOS:
					okButton.addEventListener('keydown', evt => {
						if (evt.key === 'Enter') {
							evt.stopPropagation();
							evt.preventDefault();

							actions.close();
						}
					});

					okButton.setAttribute('autofocus', 'autofocus');

					// For Racing condition bug on Windows:
					setTimeout(() => {
						okButton.focus();
					}, 200);
				}
			}
		);
		await storage.set('loremOptions', loremOptions);
		debugHelper.log('Lorem Ipsum');
		return loremOptions;
	} catch (e) {
		throw new Error('User canceled dialog');
	}
}

module.exports = loremWithModal;
