/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const errorHelper = require("./helpers/error");

const loremModal = require('./modals/loremModal');
const loremFunction = require('./functions/lorem');
const storage = require('./helpers/storage');
const SelectionChekcer = require('./helpers/check-selection');
const lang = require('./helpers/language');

async function settings() {
    return await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminate: true,
        includeLineBreaks: true,
        trim: false
    })
}

async function selectionError() {
    return await errorHelper.showErrorDialog(lang.getString('error-selection-title'), lang.getString('error-selection-description'));
}

function checkSelection(selection) {
    let checker = new SelectionChekcer(selection);
    return checker.oneOrMore('Text');
}

async function lorem(selection) {
    if (checkSelection(selection))
        await loremModal(selection);
    else
        await selectionError();
}

async function quickLorem(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, await settings());
    else
        await selectionError();
}

async function loremPreconfigured(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, {
            includeLineBreaks: true,
            trim: false,
            terminationString: 'n/a',
            text: 'lorem-lat'
        });
    else
        await selectionError();
}

async function loremPreconfiguredTrim(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, {
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
