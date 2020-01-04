/*
 * Copyright (c) 2020. by Pablo Klaschka
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

class SceneNode {}

class GraphicNode extends SceneNode {
    get localBounds() {
        return JSON.parse(JSON.stringify(this._localBounds));
    }

    constructor() {
        super();
        /**
         * @type {SceneNode}
         */
        this.parent = undefined;
        this._localBounds = { width: 240, height: 240 };
    }

    resize(width, height) {
        this._localBounds.width = width;
        this._localBounds.height = height;
    }
}

class Text extends GraphicNode {

    get clippedByArea() {
        return (this.text.length / 20) > this.localBounds.height;
    }

    get areaBox() {
        if (this._isPointText) {
            return null;
        } else {
            return this.localBounds;
        }
    }

    constructor() {
        super();

        this.text = '';
        this._isPointText = false;
    }

}

class RepeatGrid extends SceneNode {
    constructor() {
        super();
    }

    /**
     *
     * @param {Text} node
     * @param {string[]} texts
     */
    attachTextDataSeries(node, texts) {
        node.text = texts[0];
    }
}

class Rectangle extends GraphicNode {
}

module.exports = { selection, Text, RepeatGrid, Rectangle, GraphicNode };
