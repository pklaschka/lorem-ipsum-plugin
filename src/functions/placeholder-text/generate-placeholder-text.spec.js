/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

/**
 *
 * @type {Object<string,string>}
 */
const placeholderTexts = require('../../placeholder-texts.json');

describe('Generating placeholder text', () => {
    beforeEach(() => {
    });

    describe('placeholder text', () => {
        it('shouldgenerate all placeholder texts without line breaks', () => {
            const generatePlaceholderText = require('./generate-placeholder-text');

            for (const key of Object.keys(placeholderTexts)) {
                const text = placeholderTexts[key];

                const generatedText = generatePlaceholderText(1000, key, false);

                expect(generatedText.startsWith(text));
                expect(generatedText).not.toMatch(/.*\n.*/);
            }
        });

        it('shouldgenerate placeholder texts with line breaks', () => {
            const generatePlaceholderText = require('./generate-placeholder-text');
            const generatedText = generatePlaceholderText(
                1000,
                Object.keys(placeholderTexts)[0],
                true
            );

            expect(generatedText).toMatch(/.*\n.*/);
        });
    });
});
