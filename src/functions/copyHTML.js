/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const {Text} = require("scenegraph");

/**
 * Copies HTML code for a selection
 * @param {Selection} selection
 */
function copyHTML(selection) {
    for (let node of selection.items) {
        if (node instanceof Text && node.areaBox) {
            if (node.clippedByArea) {
                // Need to increase the height
                while (node.clippedByArea) {
                    node.resize(node.localBounds.width, node.localBounds.height + 1);
                }
            } else {
                // Need to decrease the height
                while (!node.clippedByArea) {
                    node.resize(node.localBounds.width, node.localBounds.height - 1);
                }
                node.resize(node.localBounds.width, node.localBounds.height + 1);
            }
        }
    }
}

module.exports = copyHTML;