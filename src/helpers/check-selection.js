/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

class SelectionChecker {
	/**
	 * Creates a new selection checker to check types of the selection
	 * @param {XDSelection} selection The selection passed into the main function
	 */
	constructor(selection) {
		this.selection = selection;
	}

	/**
	 * Checks if selection contains one or more of the specified SceneNode `types`
	 * @param {...string} types The SceneNode types
	 * @returns {boolean} `true` if the selection contains one or more of the specified SceneNode `types`
	 */
	oneOrMore(...types) {
		return this.count.apply(this, types) > 0;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Checks if selection contains `n` or more of the specified SceneNode `types`
	 * @param {...string} types The SceneNode types
	 * @param  {number} n The minimum number of occurrences in selection
	 * @returns {boolean} `true` if the selection contains `n` or more of the specified SceneNode `types`
	 */
	nOrMore(n, ...types) {
		return this.count.apply(this, types) >= n;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Checks if selection contains `n` or less of the specified SceneNode `types`
	 * @param {...string} types The SceneNode types
	 * @param  {number} n The maximum number of occurrences in selection
	 * @returns {boolean} `true` if the selection contains `n` or less of the specified SceneNode `types`
	 */
	nOrLess(n, ...types) {
		return this.count.apply(this, types) <= n;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Checks if selection contains exactly `n` occurrences of the specified SceneNode `types`
	 * @param {...string} types The SceneNode types
	 * @param  {number} n The desired number of occurrences in selection
	 * @returns {boolean} `true` if the selection contains exactly `n` occurrences of the specified SceneNode `types`
	 */
	exactlyN(n, ...types) {
		return this.count.apply(this, types) <= n;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Checks if selection contains exactly one occurrence of an element of the specified SceneNode `types`
	 * @param {...string} types The SceneNode types
	 * @returns {boolean} `true` if the selection contains exactly one occurrence of an element of the specified SceneNode `types`
	 */
	exactlyOne(...types) {
		return this.count.apply(this, types) === 1;
	}

	/**
	 * Checks if selection contains no occurrences of any of the specified SceneNode `types`
	 * @param {...string} types The SceneNode types
	 * @returns {boolean} `true` if the selection contains no occurrences of any of the specified SceneNode `types`
	 */
	no(...types) {
		return this.count.apply(this, types) < 1;
	}

	/**
	 * Counts the number of occurrences of the specified types
	 * @returns {number} The number of elements of the specified types
	 * @param {...string} types the SceneNode types
	 */
	count(...types) {
		return this.selection.items.reduce((previousValue, currentValue) => {
			let isOfOneOfTypes = false;
			for (let type of types) {
				if (SelectionChecker.checkForType(currentValue, type)) {
					isOfOneOfTypes = true;
					break;
				}
			}
			return previousValue + (isOfOneOfTypes ? 1 : 0);
		}, 0);
	}

	/**
	 * Checks if `node` matches type (specified as `string`)
	 * @param {import('scenegraph').SceneNode} node
	 * @param {(string)} type
	 * @returns {boolean} `true` if `node` matches specified ``type`
	 */
	static checkForType(node, type) {
		return typeCheckLookupTable[type]
			? typeCheckLookupTable[type](node)
			: false;
	}
}

/**
 * A Lookup-Table of type checking functions
 * @type {Object<string, function>}
 */
const typeCheckLookupTable = {
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Text
	 */
	Text: node => {
		const {Text} = require('scenegraph');
		return node instanceof Text;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Text as Area Text
	 */
	AreaText: node => {
		const {Text} = require('scenegraph');
		return node instanceof Text && node.areaBox !== undefined;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Text as Point Text
	 */
	PointText: node => {
		const {Text} = require('scenegraph');
		return node instanceof Text && node.areaBox === null;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Rectangle
	 */
	Rectangle: node => {
		const {Rectangle} = require('scenegraph');
		return node instanceof Rectangle;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Artboard
	 */
	Artboard: node => {
		const {Artboard} = require('scenegraph');
		return node instanceof Artboard;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Group
	 */
	Group: node => {
		const {Group} = require('scenegraph');
		return node instanceof Group;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof BooleanGroup
	 */
	BooleanGroup: node => {
		const {BooleanGroup} = require('scenegraph');
		return node instanceof BooleanGroup;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Ellipse
	 */
	Ellipse: node => {
		const {Ellipse} = require('scenegraph');
		return node instanceof Ellipse;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof GraphicNode
	 */
	GraphicNode: node => {
		const {GraphicNode} = require('scenegraph');
		return node instanceof GraphicNode;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Line
	 */
	Line: node => {
		const {Line} = require('scenegraph');
		return node instanceof Line;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof LinkedGraphic
	 */
	LinkedGraphic: node => {
		const {LinkedGraphic} = require('scenegraph');
		return node instanceof LinkedGraphic;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof Path
	 */
	Path: node => {
		const {Path} = require('scenegraph');
		return node instanceof Path;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof RepeatGrid
	 */
	RepeatGrid: node => {
		const {RepeatGrid} = require('scenegraph');
		return node instanceof RepeatGrid;
	},
	/**
	 * @param {import('scenegraph').SceneNode} node
	 * @return {boolean} node is instanceof SymbolInstance
	 */
	SymbolInstance: node => {
		const {SymbolInstance} = require('scenegraph');
		return node instanceof SymbolInstance;
	}
};

module.exports = SelectionChecker;
