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

class Text extends SceneNode {
    get localBounds() {
        return JSON.parse(JSON.stringify(this._localBounds));
    }

    get clippedByArea() {
        return (this.text.length / 20) > this.localBounds.height;
    }

    get textArea() {
        if (this._isPointText) {
            return null;
        } else {
            return this.localBounds;
        }
    }

    constructor() {
        super();

        this.text = '';
        /**
         *
         * @type {SceneNode}
         */
        this.parent = undefined;
        this._localBounds = { width: 240, height: 240 };
        this._isPointText = false;
    }

    resize(width, height) {
        this._localBounds.width = width;
        this._localBounds.height = height;
    }
}

class RepeatGrid extends SceneNode {
    /**
     * @param {Text[]} children
     */
    constructor(children) {
        super();
        this.children = children;
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

module.exports = { selection, Text, RepeatGrid };
