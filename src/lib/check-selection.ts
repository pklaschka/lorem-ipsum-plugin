/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { Artboard, GraphicNode, selection } from 'scenegraph';

export function checkSelection(): boolean {
	return (
		selection.items.length > 0 &&
		selection.items.some(
			node => node instanceof GraphicNode && !(node instanceof Artboard)
		)
	);
}
