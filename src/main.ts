/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { showLoremIpsumOptionsModal } from './modals/lorem-configuration-modal';
import { showSelectionError } from './modals/selection-error-modal';
import { fetchSettings } from './lib/fetch-settings';
import { ErrorHelper } from './lib/error';
import './styles.scss';
import { SelectionLoremIpsumStrategy } from './lorem-ipsum/selection-lorem-ipsum-strategy';
import { LoremIpsumOptions } from './model/lorem-ipsum-options';
import lang from 'xd-localization-helper';
import { checkSelection } from './lib/check-selection';

const strategy = new SelectionLoremIpsumStrategy();

async function applyLoremIpsumOrShowSelectionError(options: LoremIpsumOptions) {
	if (!(await strategy.apply(options))) await showSelectionError();
}

/**
 * Run Lorem Ipsum with the configuration dialog
 */
async function lorem() {
	await lang.load();
	await ErrorHelper.handleErrors(async () => {
		if (!checkSelection()) return await showSelectionError();

		const options = await showLoremIpsumOptionsModal().catch(() => undefined);
		if (!options) return;

		await applyLoremIpsumOrShowSelectionError(options);
	});
}

/**
 * Run Lorem Ipsum with the previously used settings
 */
async function quickLorem() {
	await lang.load();
	await ErrorHelper.handleErrors(async () => {
		const options = await fetchSettings();
		await applyLoremIpsumOrShowSelectionError(options);
	});
}

/**
 * Run Lorem Ipsum with Lorem Ipsum, line breaks and unadjusted text layer height
 */
async function loremPreconfigured() {
	await lang.load();
	await ErrorHelper.handleErrors(async () => {
		await applyLoremIpsumOrShowSelectionError({
			includeLineBreaks: true,
			trim: false,
			terminationString: 'n/a',
			text: 'lorem-lat'
		});
	});
}

/**
 * Run Lorem Ipsum with Lorem Ipsum, line breaks and adjusted text layer height
 */
async function loremPreconfiguredTrim() {
	await lang.load();
	await ErrorHelper.handleErrors(async () => {
		await applyLoremIpsumOrShowSelectionError({
			includeLineBreaks: true,
			trim: true,
			terminationString: '.',
			text: 'lorem-lat'
		});
	});
}

export const commands = {
	lorem,
	quickLorem,
	loremPreconfigured,
	loremPreconfiguredTrim
};
