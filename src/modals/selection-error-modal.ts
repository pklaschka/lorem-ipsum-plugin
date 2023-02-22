/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { ErrorHelper } from '../lib/error';
import lang from 'xd-localization-helper';

/**
 * Show error dialog regarding the selection
 * @returns {Promise<void>}
 */
export async function showSelectionError() {
	await ErrorHelper.showErrorDialog(
		lang.get('error.selection.title'),
		lang.get('error.selection.description')
	).catch(() => {});
}
