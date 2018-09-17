/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const errorHelper = require("./src/helpers/error");

const loremModal = require('./src/modals/loremModal');
const loremFunction = require('./src/functions/lorem');
const storage = require('./src/helpers/storage');
const SelectionChekcer = require('./src/helpers/check-selection');

async function settings() {
    return await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminate: true,
        includeLineBreaks: true,
        trim: false
    })
}

function checkSelection(selection) {
    let checker = new SelectionChekcer(selection);
    return checker.oneOrMore('Text');
}

async function lorem(selection) {
    if (checkSelection(selection))
        await loremModal(selection);
    else
        await errorHelper.showErrorDialog('No text selected', 'The Lorem Ipsum plugin could not load since you haven\'t selected any text elements. Please select at least one text element and try again.');
}

async function quickLorem(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, await settings());
    else
        await errorHelper.showErrorDialog('No text selected', 'The Lorem Ipsum plugin could not load since you haven\'t selected any text elements. Please select at least one text element and try again.');
}

async function loremPreconfigured(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, {includeLineBreaks: true, trim: false, terminate: true, text: 'lorem'});
    else
        await errorHelper.showErrorDialog('No text selected', 'The Lorem Ipsum plugin could not load since you haven\'t selected any text elements. Please select at least one text element and try again.');
}

async function loremPreconfiguredTrim(selection) {
    if (checkSelection(selection))
        await loremFunction(selection, {includeLineBreaks: true, trim: true, terminate: true, text: 'lorem'});
    else
        await errorHelper.showErrorDialog('No text selected', 'The Lorem Ipsum plugin could not load since you haven\'t selected any text elements. Please select at least one text element and try again.');
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