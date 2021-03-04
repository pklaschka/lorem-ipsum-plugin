/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

const lang = require('xd-localization-helper');
const SelectionChecker = require('../helpers/check-selection');

/**
 * Initialize all necessary components and check the selection for compatibility
 * @param {XDSelection} selection
 * @return {Promise<boolean>} Selection contains text layer?
 */
module.exports = async function init(selection) {
	await lang.load();
	let checker = new SelectionChecker(selection);
	return checker.oneOrMore('Text') || checker.oneOrMore('Rectangle');
};
