/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

describe('applyToPointText()', () => {
    /**
     * @type {*}
     */
    let textNode;

    beforeEach(() => {
        jest.mock('./apply-text');
        jest.mock('./generate-placeholder-text');
        jest.mock('../../helpers/debug');

        textNode = new (require('scenegraph').Text)();
        textNode.resize(24, 1);
        textNode.text = 'Some short text';
        textNode._isPointText = true;
    });

    it('should apply two words of placeholder text', () => {
        const applyToAreaText = require('./point-text');
        const applyTextMock = require('./apply-text');

        applyToAreaText(textNode, {
            text: 'lorem-lat',
            terminationString: '.',
            trim: false,
            includeLineBreaks: false
        }, '.');

        expect(applyTextMock).toHaveBeenLastCalledWith(textNode, 'a a.');
    });
});
