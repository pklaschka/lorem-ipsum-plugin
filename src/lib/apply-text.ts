/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { RepeatGrid, Text } from 'scenegraph';

/**
 * Applies text to the passed text layer (may the layer be inside a RepeatGrid or not)
 * @param textLayer
 * @param text
 */
export function applyText(textLayer: Text, text: string) {
	if (
		textLayer.parent &&
		textLayer.parent.parent &&
		textLayer.parent.parent instanceof RepeatGrid
	) {
		return textLayer.parent.parent.attachTextDataSeries(textLayer, [text]);
	}

	textLayer.text = text;
}
