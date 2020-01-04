/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const {Text, Group, Artboard, Color, selection} = require('scenegraph');
const lang = require('xd-localization-helper');

/**
 * Replaces a GraphicNode, e.g., a rectangle, with a Text Area of the same dimensions
 * @throws {Error} if oldNode's parent is not compatible
 * @param {import('scenegraph').GraphicNode | import('scenegraph').Rectangle} oldNode
 * @returns {import('scenegraph').Text} The created Text node
 */
module.exports = function replaceWithText(oldNode) {
    const textNode = new Text();
    textNode.text = 'a';
    textNode.areaBox = {width: 10, height: 10};
    textNode.fill = new Color('black');

    const parent = oldNode.parent;
    if (parent instanceof Group || parent instanceof Artboard) {
        parent.addChildAfter(textNode, oldNode);

        const {x, y} = oldNode.topLeftInParent;
        const {width, height} = oldNode.localBounds;
        const rotation = oldNode.rotation;

        textNode.rotateAround(rotation, textNode.localCenterPoint);
        textNode.placeInParentCoordinates({x: 0, y: 0}, {x, y});
        textNode.resize(width, height);

        oldNode.removeFromParent();
    } else {
        throw new Error(lang.get('error.messages.incompatibleParentNode'));
    }


    /*
        selection.items.push(textNode); // Add new node to selection

        const oldIndex = selection.items.findIndex(node => node === oldNode);

        // And remove old node from it
        if (oldIndex >= 0)
            selection.items.splice(oldIndex, 1);
    */

    return textNode;
};
