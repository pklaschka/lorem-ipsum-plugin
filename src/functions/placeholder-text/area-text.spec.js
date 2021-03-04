/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

describe('applyToAreaText()', () => {
	/**
	 * @type {*}
	 */
	let textNode;

	beforeEach(() => {
		jest.mock('./apply-text');
		jest.mock('./generate-placeholder-text');
		jest.mock('../trim-height');
		jest.mock('../binary-length-search');
		jest.mock('../../helpers/debug');

		const Text = require('scenegraph').Text;
		textNode = new Text();
		textNode.resize(24, 1);
		textNode.text = 'Some short text';
		// @ts-ignore
		textNode._mode = Text.FIXED_HEIGHT;
	});

	it('shouldapply the correct length of area text', () => {
		const applyToAreaText = require('./area-text');
		const applyTextMock = require('./apply-text');

		applyToAreaText(
			textNode,
			{
				text: 'lorem-lat',
				terminationString: '.',
				trim: false,
				includeLineBreaks: false
			},
			'.'
		);

		expect(applyTextMock).toHaveBeenLastCalledWith(textNode, 'a a a a a.');
		expect(require('../trim-height')).not.toHaveBeenCalled();
	});
	it('should call "trim-height.js" when needed', () => {
		const applyToAreaText = require('./area-text');
		require('../trim-height');
		applyToAreaText(
			textNode,
			{
				text: 'lorem-lat',
				terminationString: '.',
				trim: true,
				includeLineBreaks: false
			},
			'.'
		);

		expect(require('../trim-height')).toHaveBeenCalled();
	});
});
