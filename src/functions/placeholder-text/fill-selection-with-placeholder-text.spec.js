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
        jest.mock('./replace-with-text');
        jest.mock('../../helpers/debug');
        jest.mock('../../helpers/analytics');
        jest.mock('../../helpers/error');

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

    it('should convert Rectangles to text and apply placeholder text', () => {
        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        const rectangle = new scenegraph.Rectangle();
        // noinspection JSConstantReassignment
        rectangle.parent = new scenegraph.Group();
        scenegraph.selection.items = [rectangle];
        fillSelectionWithPlaceholderText(options);
        expect(require('./replace-with-text')).toHaveBeenCalled();
        expect(require('./area-text')).toHaveBeenCalled();
    });

    it('should ignore non-Text nodes in selection', () => {
        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        const repeatGrid = new scenegraph.RepeatGrid();
        scenegraph.selection.items = [repeatGrid];
        fillSelectionWithPlaceholderText(options);
        expect(require('../../helpers/debug').log).toBeCalledTimes(2);
    });

    it('should display the error dialog on Error', () => {
        /**
         * @type {*}
         */
        const replaceWithTextMock = require('./replace-with-text');

        replaceWithTextMock.mockImplementation(() => {
            throw new Error();
        });

        const fillSelectionWithPlaceholderText = require('./fill-selection-with-placeholder-text');
        const rectangle = new scenegraph.Rectangle();
        scenegraph.selection.items = [rectangle];
        fillSelectionWithPlaceholderText(options);

        expect(require('./replace-with-text')).toHaveBeenCalled();
        expect(require('../../helpers/error').showErrorDialog).toHaveBeenCalled();
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
            fillSelectionWithPlaceholderText(naOptions);
            expect(require('./area-text')).toHaveBeenLastCalledWith(textNode, naOptions, '');
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
