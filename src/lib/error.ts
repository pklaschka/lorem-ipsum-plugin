/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { showDialog, types } from 'xd-dialog-helper';

import lang from 'xd-localization-helper';

export class ErrorHelper {
	/**
	 * Wraps an operation in an error wrapper, showing an error dialog in case of an exception
	 * @param {function} operation The operation that should get run
	 * @returns {Promise<boolean>} resolves to `true` when the operation was successful, `false` if it wasn't
	 */
	static async handleErrors(operation: () => Promise<void>) {
		try {
			await operation();
		} catch (e) {
			console.error(e);
			try {
				await ErrorHelper.showErrorDialog(
					lang.get('error.general.title'),
					`${lang.get('error.general.description')}<br><code>${
						(e as Error).message
					}</code>`
				);
			} catch (e) {}
		}
	}

	/**
	 * Shows a simple error dialog
	 * @param {string} title
	 * @param {string} message
	 * @return {Promise<void>}
	 */
	static async showErrorDialog(title: string, message: string) {
		await showDialog(
			'lorem-error-dialog',
			title,
			[
				{
					type: types.TEXT,
					label: message,
					id: 'message',
					value: true,
					htmlAttributes: {}
				}
			],
			{
				width: 360,
				css: `
            header {
                background: #2D4E64;
                height: 16px;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
            }`,
				onBeforeShow: /* istanbul ignore next */ (
					htmlDialogElement,
					elements,
					actions
				) => {
					htmlDialogElement.appendChild(document.createElement('header'));
					const cancelButton = document.querySelector(
						'#lorem-error-dialog-dialogHelperBtnCancel'
					);
					if (cancelButton) cancelButton.remove();
				}
			}
		);
	}
}
