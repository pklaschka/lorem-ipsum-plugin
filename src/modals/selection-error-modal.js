/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const errorHelper = require('../helpers/error');
const lang = require('xd-localization-helper');

/**
 * Show error dialog regarding the selection
 * @returns {Promise<void>}
 */
module.exports = async function selectionError() {
    return await errorHelper.showErrorDialog(lang.get('error.selection.title'), lang.get('error.selection.description'));
};

