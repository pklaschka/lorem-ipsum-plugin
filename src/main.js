/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const errorHelper = require('./helpers/error');

const loremModal = require('./modals/loremModal');
const loremFunction = require('./functions/lorem');
const storage = require('xd-storage-helper');
const SelectionChecker = require('./helpers/check-selection');

const lang = require('xd-localization-helper');

async function settings() {
    return await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminate: true,
        includeLineBreaks: true,
        trim: false
    });
}

async function selectionError() {
    return await errorHelper.showErrorDialog(lang.get('error-selection-title'), lang.get('error-selection-description'));
}

/**
 * Initialize all necessary components and check the selection for compatibility
 * @param {XDSelection} selection
 * @return {Promise<boolean>} Selection contains text layer?
 */
async function init(selection) {
    await lang.load();
    let checker = new SelectionChecker(selection);
    return checker.oneOrMore('Text');
}

/**
 *
 * @param {XDSelection} selection
 * @return {Promise<void>}
 */
async function lorem(selection) {
    if (await init(selection))
        await loremModal();
    else
        await selectionError();
}

/**
 *
 * @param {XDSelection} selection
 * @return {Promise<void>}
 */
async function quickLorem(selection) {
    if (await init(selection))
        await loremFunction(await settings());
    else
        await selectionError();
}

/**
 *
 * @param {XDSelection} selection
 * @return {Promise<void>}
 */
async function loremPreconfigured(selection) {
    if (await init(selection))
        await loremFunction({
            includeLineBreaks: true,
            trim: false,
            terminationString: 'n/a',
            text: 'lorem-lat'
        });
    else
        await selectionError();
}

/**
 *
 * @param {XDSelection} selection
 * @return {Promise<void>}
 */
async function loremPreconfiguredTrim(selection) {
    if (await init(selection))
        await loremFunction({
            includeLineBreaks: true,
            trim: true,
            terminationString: '.',
            text: 'lorem-lat'
        });
    else
        await selectionError();
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    commands: {
        lorem: lorem,
        quickLorem: quickLorem,
        loremPreconfigured: loremPreconfigured,
        loremPreconfiguredTrim: loremPreconfiguredTrim
    }
};
