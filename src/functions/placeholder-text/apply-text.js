/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const {RepeatGrid} = require('scenegraph');

/**
 * Applies text to the passed text layer (may the layer be inside a RepeatGrid or not)
 * @param {import('scenegraph').Text} textLayer
 * @param {string} text
 */
module.exports = function applyText(textLayer, text) {
    let optRepeatGridNode;
    if (textLayer.parent && textLayer.parent.parent && textLayer.parent.parent instanceof RepeatGrid) {
        optRepeatGridNode = textLayer.parent.parent;
    }

    if (optRepeatGridNode)
        optRepeatGridNode.attachTextDataSeries(textLayer, [text]);
    else
        textLayer.text = text;
};
