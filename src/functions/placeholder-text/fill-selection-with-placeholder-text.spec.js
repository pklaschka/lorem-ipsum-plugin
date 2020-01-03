/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

describe('fillSelectionWithPlaceholderText()', () => {
    /**
     * @type {*}
     */
    let textNode;

    /**
     * @type {*}
     */
    let scenegraph;

    /**
     * @type {*}
     */
    let options;

    beforeEach(() => {
        scenegraph = require('scenegraph');

        jest.mock('./area-text');
        jest.mock('./point-text');
        jest.mock('../../helpers/debug');
        jest.mock('../../helpers/analytics');

        textNode = new scenegraph.Text();
        textNode.resize(24, 1);
        textNode.text = 'Some short text';

        scenegraph.selection.items = [textNode];

        options = {
            text: 'test',
            includeLineBreaks: false,
            trim: false,
            terminationString: '.'
        };
    });

    it('should apply placeholder text to area text', () => {
        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        fillSelectionWithPlaceholderText(options);
        expect(require('./area-text')).toHaveBeenLastCalledWith(textNode, options, '.');
    });

    it('should apply placeholder text to point text', () => {
        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        textNode._isPointText = true;
        fillSelectionWithPlaceholderText(options);
        expect(require('./point-text')).toHaveBeenLastCalledWith(textNode, options, '.');
    });

    it('should ignore non-Text nodes in selection', () => {
        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        const repeatGrid = new scenegraph.RepeatGrid();
        scenegraph.selection.items = [repeatGrid];
        fillSelectionWithPlaceholderText(options);
        expect(require('../../helpers/debug').log).toBeCalledTimes(2);
    });

    it('should correctly send analytics data', (done) => {
        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        const analyticsMock = require('../../helpers/analytics');

        fillSelectionWithPlaceholderText(options);

        expect(analyticsMock.verifyAcceptance).toHaveBeenCalled();
        setTimeout(() => {
            expect(analyticsMock.send).toHaveBeenCalledWith('lorem', options);
            done();
        }, 300);
    });

    describe('parsing options.terminationString', () => {
        it('should parse "n/a" as ""', () => {
            const naOptions = Object.assign(options, {terminationString: 'n/a'});

            const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
            fillSelectionWithPlaceholderText(options);
            expect(require('./area-text')).toHaveBeenLastCalledWith(textNode, options, '');
        });

        it('should parse other chars as themselves', () => {
            const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');

            for (let i = 21; i < 255; i++) {
                const char = String.fromCharCode(i);
                const terminateOptions = Object.assign(options, {terminationString: char});

                fillSelectionWithPlaceholderText(terminateOptions);
                expect(require('./area-text')).toHaveBeenLastCalledWith(textNode, options, char);
            }
        });
    });
});
