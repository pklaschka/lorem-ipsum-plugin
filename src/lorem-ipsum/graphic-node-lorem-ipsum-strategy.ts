/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';
import {
	Artboard,
	Color,
	GraphicNode,
	Group,
	RootNode,
	SceneNode,
	selection,
	Text
} from 'scenegraph';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import lang from 'xd-localization-helper';
import { FixedAreaTextLoremIpsumStrategy } from './fixed-area-text-lorem-ipsum-strategy';

export class GraphicNodeLoremIpsumStrategy implements ApplyLoremIpsumStrategy {
	private readonly node: GraphicNode;

	constructor(node: SceneNode) {
		if (!(node instanceof GraphicNode)) {
			throw new Error('The node is not a GraphicNode');
		}

		if (node instanceof Artboard) {
			throw new Error('The node is an Artboard');
		}

		this.node = node;
	}

	apply(options: LoremIpsumOptions): Promise<boolean> {
		const textNode = this.convertToText();
		return new FixedAreaTextLoremIpsumStrategy(textNode).apply(options);
	}

	protected convertToText() {
		const textNode = this.createTextNode();

		const parent = this.node.parent;

		if (!this.isGrouplike(parent)) {
			throw new Error(lang.get('error.messages.incompatibleParentNode'));
		}

		// Replace old node with text node (apply old transformation)
		parent.addChildAfter(textNode, this.node);

		const { x, y } = this.node.topLeftInParent;
		const { width, height } = this.node.localBounds;
		const rotation = this.node.rotation;

		textNode.rotateAround(rotation, textNode.localCenterPoint);
		textNode.placeInParentCoordinates({ x: 0, y: 0 }, { x, y });
		textNode.resize(width, height);

		this.node.removeFromParent();

		// Replace the old node with the new text node in selection:
		this.updateSelection(textNode);

		return textNode;
	}

	private updateSelection(textNode: Text) {
		const newSelection = [...selection.items];
		newSelection.splice(newSelection.indexOf(this.node), 1, textNode);
		selection.items = newSelection;
	}

	private createTextNode() {
		// Create the base text node
		const textNode = new Text();
		textNode.text = 'a';
		textNode.areaBox = { width: 10, height: 10 };
		textNode.fill = new Color('black');
		return textNode;
	}

	private isGrouplike(
		node: SceneNode | null
	): node is Group | Artboard | RootNode {
		return node !== null && node.isContainer;
	}
}
