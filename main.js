/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const loremModal = require('./src/modals/loremModal');
const loremFunction = require('./src/functions/lorem');
const storage = require('./src/helpers/storage');

async function settings() {
    return await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminate: true,
        includeLineBreaks: true,
        trim: false
    })
}

async function lorem(selection) {
    await loremModal(selection);
}

async function quickLorem(selection) {
    loremFunction(selection, await settings());
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    commands: {
        lorem: lorem,
        quickLorem: quickLorem
    }
};