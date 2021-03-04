/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

/**
 *
 * @param {number} words
 */
module.exports = function (words) {
    let text = 'a';

    for (let i = 1; i < words; i++) {
        text += ' a';
    }

    return text;
};
