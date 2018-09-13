/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const {Text} = require("scenegraph");
const debugHelper = require('../helpers/debug');

/**
 * Trims text area to suitable height
 * @param {Selection} selection
 */
function trim(selection) {
    for (let node of selection.items) {
        if (node instanceof Text && node.areaBox) {
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
                        (height) => {
                            node.resize(node.localBounds.width, height);
                            return node.clippedByArea;
                        }
                    )
                );
            }
        }
    }
}

/**
 * @param smallerHeight The highest height that was clipped
 * @param biggerHeight The lowest height that wasn't clipped
 * @param {function(height:number): boolean} isClipped
 */
function checkBetween(smallerHeight, biggerHeight, isClipped) {
    debugHelper.log('Checking between ', smallerHeight, ' and ', biggerHeight);

    if (Math.abs(smallerHeight - biggerHeight) < 2)
        return biggerHeight;

    let half = Math.floor((smallerHeight + biggerHeight) / 2);

    return !isClipped(half) ? checkBetween(smallerHeight, half, isClipped) : checkBetween(half, biggerHeight, isClipped);
}

module.exports = trim;