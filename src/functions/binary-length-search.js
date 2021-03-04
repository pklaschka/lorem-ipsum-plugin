/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

/**
 * A callback to determine whether a specific number of words clips the Area Text node
 * @callback isClipping
 * @param {number} n Number of words
 * @returns {boolean} number of words clip Area Text?
 */

const debugHelper = require('../helpers/debug');

/**
 * Performs a binary search for the number n that's closest to the clipping number without clipping.
 *
 * n must be between clippingNumber and notClippingNumber
 *
 * Runs in O(log n), where n=abs(clippingNumber-notClippingNumber)
 *
 * @param {number} clippingNumber a number of which it is known that it clips
 * @param {number} notClippingNumber a number of which it is known that it doesn't clip
 * @param {isClipping} isClipping callback for checking whether a number n clips
 * @returns {number} number n that's closest to the clipping number without clipping.
 */
module.exports = function binaryLengthSearch(
    clippingNumber,
    notClippingNumber,
    isClipping
) {
    debugHelper.log(
        'Checking between ',
        clippingNumber,
        ' and ',
        notClippingNumber
    );

    if (Math.abs(clippingNumber - notClippingNumber) < 2)
        return notClippingNumber;

    let half = Math.floor((clippingNumber + notClippingNumber) / 2);

    return isClipping(half)
        ? binaryLengthSearch(half, notClippingNumber, isClipping)
        : binaryLengthSearch(clippingNumber, half, isClipping);
};
