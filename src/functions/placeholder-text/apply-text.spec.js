/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

describe('applyText()', () => {
	/**
	 * @type {*}
	 */
	let textNode;

	describe('text node inside RepeatGrid', () => {
		beforeEach(() => {
			textNode = new (require('scenegraph').Text)();
			textNode.resize(24, 1);
			textNode.text = 'Initial';
			textNode._isPointText = true;
			textNode._parent = {
				parent: new (require('scenegraph').RepeatGrid)()
			};
			textNode.parent.parent.attachTextDataSeries = jest.fn();
		});

		it('should call the RepeatGrid\'s "attachTextDataSeries()" function', () => {
			const applyText = require('./apply-text');
			applyText(textNode, 'Applied');
			expect(
				textNode.parent.parent.attachTextDataSeries
			).toHaveBeenLastCalledWith(textNode, ['Applied']);
		});
	});

	describe('normal text node', () => {
		beforeEach(() => {
			textNode = new (require('scenegraph').Text)();
			textNode.resize(24, 1);
			textNode.text = 'Initial';
			textNode._isPointText = true;
		});

		it('should apply two words of placeholder text', () => {
			const applyText = require('./apply-text');
			applyText(textNode, 'Applied');

			expect(textNode.text).toBe('Applied');
		});
	});
});
