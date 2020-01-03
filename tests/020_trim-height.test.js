/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

describe('Trimming the text area height', () => {
    let textNode;

    beforeEach(() => {
        jest.mock('../src/helpers/debug');
        textNode = new (require('scenegraph').Text)();
        textNode.resize(240, 1000);
        textNode.text = 'Some short text';
    });

    it('should correctly trim the text area height', () => {
        const trimHeight = require('../src/functions/trimHeight');

        trimHeight(textNode);
        const clippedByArea = textNode.clippedByArea;
        textNode._localBounds.height --;
        const clippedByAreaWith1PxLessHeight = textNode.clippedByArea;

        expect(clippedByArea).toBeFalsy();
        expect(clippedByAreaWith1PxLessHeight).toBeTruthy();

    });
});
