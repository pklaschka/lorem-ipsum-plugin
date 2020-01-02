/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const {Text} = require('scenegraph');
const debugHelper = require('../helpers/debug');
require('../helpers/check-selection');
const analytics = require('../helpers/analytics');
const generatePlaceholderText = require('./generate-placeholder-text');
const applyToAreaText = require('./area-text');

/**
 * Fills text area with placeholder text (e.g., Lorem Ipsum)
 * @param {object} options
 * @param {boolean} options.trim trim text area height to fit contents after inserting text?
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks include line breaks in placeholder text?
 * @param {string} options.text key of the placeholder text
 * @returns {void}
 */
module.exports = function lorem(options) {
    const selection = require('scenegraph').selection;

    debugHelper.log('Lorem ipsum with options ', (options));
    let terminationString = options.terminationString === 'n/a' ? '' : options.terminationString;
    for (let element of selection.items) {
        if (element instanceof Text && element.areaBox) {
            applyToAreaText(element, options, terminationString);
        } else if (element instanceof Text) {
            applyToPointText(element, options, terminationString);
        } else {
            debugHelper.log('Node ', element, ' is not a text layer.');
        }
    }
    analytics.verifyAcceptance({
        pluginName: 'Lorem Ipsum',
        privacyPolicyLink: 'https://xdplugins.pabloklaschka.de/privacy-policy',
        color: '#2D4E64'
    }).then(()=>{
        analytics.send('lorem', options);
    });
};

/**
 * Apply placeholder text to Point Text
 * @param {import('scenegraph').Text} element
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 * @param {string} terminationString
 */
function applyToPointText(element, options, terminationString) {
    element.text = generatePlaceholderText(2, options.text, false) + terminationString;
}

