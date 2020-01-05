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

class SceneNode {
    constructor() {
        this._parent = null;
    }
    get isContainer() { return false; }
    get parent() { return this._parent; }
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
        this._localBounds = { width: 240, height: 240, x: 5, y: 13 };
        this._rotation = 0;

        this.removeFromParent = jest.fn();
    }

    get rotation() { return this._rotation; }

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
    get isContainer() { return true; }
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

module.exports = { selection, Text, Group, RepeatGrid, Rectangle, GraphicNode, Color };
