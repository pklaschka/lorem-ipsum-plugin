/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

/**
 * The selection
 * @type {XDSelection}
 */
const selection = {
	focusedArtboard: null,
	editContext: undefined,
	hasArtboards: true,
	insertionParent: undefined,
	itemsIncludingLocked: this.items,
	hasArtwork: true,
	items: []
};

class SceneNode {
	constructor() {
		this._parent = null;
	}

	get isContainer() {
		return false;
	}

	get parent() {
		return this._parent;
	}
}

class GraphicNode extends SceneNode {
	get localBounds() {
		return JSON.parse(JSON.stringify(this._localBounds));
	}

	constructor() {
		super();
		/**
		 * @type {SceneNode}
		 */
		this._localBounds = {width: 240, height: 240, x: 5, y: 13};
		this._rotation = 0;

		this.removeFromParent = jest.fn();
	}

	get rotation() {
		return this._rotation;
	}

	rotateAround(reference, deltaRotation) {
		this._rotation += deltaRotation % 360;
	}

	resize(width, height) {
		this._localBounds.width = width;
		this._localBounds.height = height;
	}

	get topLeftInParent() {
		const {y, x} = this.localBounds;
		return {x, y};
	}

	placeInParentCoordinates(reference, position) {
		this._localBounds.x = position.x;
		this._localBounds.y = position.y;
	}
}

class Text extends GraphicNode {
	get clippedByArea() {
		if (this._mode === Text.FIXED_HEIGHT) {
			return this.text.length / 20 > this.localBounds.height;
		} else {
			throw new Error(
				'Access to non-available clippedByArea in non-fixed-height text'
			);
		}
	}

	get areaBox() {
		throw new Error('Access to deprecated Text.areaBox');
	}

	static get AUTO_HEIGHT() {
		return 'AUTO_HEIGHT';
	}

	static get FIXED_HEIGHT() {
		return 'FIXED_HEIGHT';
	}

	static get POINT() {
		return 'POINT';
	}

	get layoutBox() {
		switch (this._mode) {
			case 'AUTO_HEIGHT':
				return {type: Text.AUTO_HEIGHT, width: this.localBounds.width};
			case 'FIXED_HEIGHT':
				return {
					type: Text.FIXED_HEIGHT,
					width: this.localBounds.width,
					height: this.localBounds.height
				};
			case 'POINT':
				return {type: Text.POINT};
		}

		throw new Error(
			'Invalid testing mode parameter _mode set to ' + this._mode
		);
	}

	set layoutBox(newBox) {
		this._mode = newBox.type;
	}

	constructor() {
		super();

		this.text = '';
		this._mode = Text.AUTO_HEIGHT;
	}
}

class RepeatGrid extends SceneNode {
	constructor() {
		super();
		this.addChildAfter = jest.fn();
		this.addChildBefore = jest.fn();
	}

	/**
	 *
	 * @param {Text} node
	 * @param {string[]} texts
	 */
	attachTextDataSeries(node, texts) {
		node.text = texts[0];
	}

	get isContainer() {
		return true;
	}
}

class Rectangle extends GraphicNode {
}

class Group extends SceneNode {
	get isContainer() {
		return true;
	}

	constructor() {
		super();
		this.addChildAfter = jest.fn();
		this.addChildBefore = jest.fn();
	}
}

class Color {
	constructor(color) {
		this.color = color;
	}
}

module.exports = {
	selection,
	Text,
	Group,
	RepeatGrid,
	Rectangle,
	GraphicNode,
	Color
};
