/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

const storage = require('xd-storage-helper');

/**
 * Fetch the settings from storage
 * @returns {Promise<{text: string, terminationString: string, includeLineBreaks: boolean, trim: boolean}>}
 */
module.exports = async function fetchSettings() {
    return await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminationString: '.',
        includeLineBreaks: true,
        trim: false
    });
};
