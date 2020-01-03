/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const loremModal = require('./modals/lorem-configuration-modal');
const loremFunction = require('./functions/placeholder-text/fill-selection-with-placeholder-text');
const selectionError = require('./modals/selection-error-modal');
const init = require('./functions/init');
const fetchSettings = require('./functions/settings/fetch-settings');

/**
 * Run Lorem Ipsum with the configuration dialog
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
 * Run Lorem Ipsum with the previously used settings
 * @param {XDSelection} selection
 * @return {Promise<void>}
 */
async function quickLorem(selection) {
    if (await init(selection))
        await loremFunction(await fetchSettings());
    else
        await selectionError();
}

/**
 * Run Lorem Ipsum with Lorem Ipsum, line breaks and unadjusted text layer height
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
 * Run Lorem Ipsum with Lorem Ipsum, line breaks and adjusted text layer height
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
