/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const errorHelper = require("./src/helpers/error");

const loremModal = require('./src/modals/loremModal');
const loremFunction = require('./src/functions/lorem');
const storage = require('./src/helpers/storage');
const SelectionChekcer = require('./src/helpers/check-selection');
const lang = require('./src/helpers/language');

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
        await loremFunction(selection, {includeLineBreaks: true, trim: false, terminate: true, text: 'lorem-lat'});
    else
        await selectionError();
}

async function loremPreconfiguredTrim(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, {includeLineBreaks: true, trim: true, terminate: true, text: 'lorem-lat'});
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