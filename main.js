/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const showModal = require('./src/modals/mainTATModal');

async function modal(selection) {
    await showModal(selection);
    console.log('TAT is done.')
}

function trimHeight(selection) {
    console.log('trimHeight()');
    const trim = require('./src/functions/trimHeight');
    trim(selection);
}

function lorem(selection) {
    console.log('lorem()');
}

function copyHTML(selection) {
    console.log('copyHTML()');
}

function settings() {
    console.log('settings()');
}

function help() {
    console.log('help()');
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    commands: {
        modal: modal,
        lorem: lorem,
        trimHeight: trimHeight,
        copyHTML: copyHTML,
        settings: settings,
        help: help,
    }
};