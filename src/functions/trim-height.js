/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

const findContentFittingHeight = require('./binary-length-search');

/**
 * Trim an Area Text to fit its contents heights
 * @param {import('scenegraph').Text} node
 */
module.exports = function trimAreaTextNode(node) {
    node.resize(
        node.localBounds.width,
        findContentFittingHeight(
            0,
            node.localBounds.height,
            /**
             * @param {number} height
             * @returns {boolean}
             */
            height => {
                node.resize(node.localBounds.width, height);
                return node.clippedByArea;
            }
        )
    );
};
