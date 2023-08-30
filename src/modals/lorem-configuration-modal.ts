/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import * as lang from 'xd-localization-helper';

import { showDialog, types } from 'xd-dialog-helper';

import { InfoBox } from './info-box';
import { fetchSettings, saveSettings } from '../lib/fetch-settings';
import { selection, Text } from 'scenegraph';

/**
 * Display the Lorem Ipsum configuration dialog
 * @throws {Error} error when dialog gets canceled
 * @return {Promise<{trim: boolean, terminationString: string, includeLineBreaks: boolean, text: string}>}
 */
export async function showLoremIpsumOptionsModal() {
	const containsPointText = selection.items.some(
		node =>
			node instanceof Text &&
			// @ts-ignore
			node.layoutBox.type === Text.POINT
	);

	const uiOptions = await fetchSettings();

	try {
		/**
		 * The options for the Lorem Ipsum options
		 * @type {{text: string, terminationString: string, includeLineBreaks: boolean, trim: boolean}}
		 */
		const loremOptions = await showDialog(
			'lorem-main',
			'Lorem Ipsum',
			[
				{
					id: 'description',
					type: types.TEXT,
					label: lang.get('modal.lorem.description'),
					htmlAttributes: {}
				},
				...(containsPointText
					? [
							{
								id: 'info',
								type: InfoBox,
								boxType: 'warning',
								title: lang.get('modal.lorem.point-text-warning.title'),
								label: lang.get('modal.lorem.point-text-warning.description')
							}
					  ]
					: []),
				{
					type: types.SELECT,
					options: [
						{ value: 'lorem-lat', label: 'Lorem Ipsum (Latin, Standard)' },
						{ value: 'cicero-lat', label: 'Cicero (Latin)' },
						{ value: 'cicero-en', label: 'Cicero (English)' },
						{ value: 'pangram-en', label: 'Pangram (English)' },
						{ value: 'pangram-de', label: 'Pangram (German)' },
						{ value: 'pangram-es', label: 'Pangram (Espagnol)' },
						{ value: 'pangram-fr', label: 'Pangram (Français)' }
					],
					id: 'text',
					label: lang.get('modal.lorem.text.label'),
					value: uiOptions.text,
					htmlAttributes: {}
				},
				{
					type: types.SELECT,
					id: 'terminationString',
					label: lang.get('modal.lorem.terminate.label'),
					options: [
						{ value: 'n/a', label: lang.get('modal.lorem.terminate.none') },
						{ value: '.', label: lang.get('modal.lorem.terminate.period') },
						{ value: '…', label: lang.get('modal.lorem.terminate.ellipsis') }
					],
					htmlAttributes: {},
					value: uiOptions.terminationString
				},
				{
					type: types.CHECKBOX,
					id: 'includeLineBreaks',
					label: lang.get('modal.lorem.includeLineBreaks.label'),
					htmlAttributes: {},
					value: uiOptions.includeLineBreaks
				},
				{
					type: types.CHECKBOX,
					id: 'randomize',
					label: lang.get('modal.lorem.randomize.label'),
					htmlAttributes: {},
					value: uiOptions.randomize
				},
				{
					type: types.CHECKBOX,
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

					// Temporary fix for the enter key not working on macOS:
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
					}, 100);
				}
			}
		);

		await saveSettings(loremOptions);
		return loremOptions;
	} catch (e) {
		throw new Error('User canceled dialog');
	}
}
