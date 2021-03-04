/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

describe('Trimming the text area height', () => {
	/**
	 * @type {*}
	 */
	let textNode;

	beforeEach(() => {
		jest.mock('../helpers/debug');
		const {Text} = require('scenegraph');
		textNode = new Text();
		// @ts-ignore
		textNode._mode = Text.FIXED_HEIGHT;
		textNode.resize(240, 1000);
		textNode.text = 'Some short text';
	});

	it('shouldtrim the text area height', () => {
		const trimHeight = require('./trim-height');

		trimHeight(textNode);
		const clippedByArea = textNode.clippedByArea;
		textNode['_localBounds'].height--;
		const clippedByAreaWith1PxLessHeight = textNode.clippedByArea;

		expect(clippedByArea).toBeFalsy();
		expect(clippedByAreaWith1PxLessHeight).toBeTruthy();
	});
});
