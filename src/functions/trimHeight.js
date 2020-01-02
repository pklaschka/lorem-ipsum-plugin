/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const {Text} = require('scenegraph');
const debugHelper = require('../helpers/debug');

/**
 * Trim an Area Text
 * @param {import('scenegraph').Text} node
 */
function trimAreaTextNode(node) {
    let oldHeight = node.localBounds.height;
    if (node.clippedByArea) {
        // Need to increase the height
        while (node.clippedByArea) {
            oldHeight = node.localBounds.height;
            node.resize(node.localBounds.width, node.localBounds.height * 2);
        }
        // Find correct height with O(log n) time complexity
        node.resize(node.localBounds.width,
            checkBetween(oldHeight, node.localBounds.height,
                /**
                 * @param {number} height
                 * @returns {boolean}
                 */
                (height) => {
                    node.resize(node.localBounds.width, height);
                    return node.clippedByArea;
                }
            )
        );
    } else {
        // Need to decrease the height
        while (!node.clippedByArea && node.localBounds.height > 0) {
            oldHeight = node.localBounds.height;
            node.resize(node.localBounds.width, Math.floor(node.localBounds.height / 2));
        }
        // Find correct height with O(log n) time complexity
        node.resize(node.localBounds.width,
            checkBetween(node.localBounds.height, oldHeight,
                /**
                 * @param {number} height
                 * @returns {boolean}
                 */
                (height) => {
                    node.resize(node.localBounds.width, height);
                    return node.clippedByArea;
                }
            )
        );
    }
}

/**
 * Trims text area to suitable height
 */
function trim() {
    for (let node of require('scenegraph').selection.items) {
        if (node instanceof Text && node.areaBox) {
            trimAreaTextNode(node);
        }
    }
}

/**
 * @param {number} smallerHeight The highest height that was clipped
 * @param {number} biggerHeight The lowest height that wasn't clipped
 * @param {function} isClipped Function to check whether text area clips
 * @returns {number} The minimum height for which the text doesn't clip
 */
function checkBetween(smallerHeight, biggerHeight, isClipped) {
    debugHelper.log('Checking between ', smallerHeight, ' and ', biggerHeight);

    if (Math.abs(smallerHeight - biggerHeight) < 2)
        return biggerHeight;

    let half = Math.floor((smallerHeight + biggerHeight) / 2);

    return !isClipped(half) ? checkBetween(smallerHeight, half, isClipped) : checkBetween(half, biggerHeight, isClipped);
}

module.exports = trim;
