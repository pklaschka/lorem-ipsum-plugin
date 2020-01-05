/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const {Text, Color, selection} = require('scenegraph');
const lang = require('xd-localization-helper');

/**
 * Replaces a GraphicNode, e.g., a rectangle, with a Text Area of the same dimensions
 * @throws {Error} if oldNode's parent is not compatible
 * @param {import('scenegraph').GraphicNode | import('scenegraph').Rectangle} oldNode
 * @returns {import('scenegraph').Text} The created Text node
 */
module.exports = function replaceWithText(oldNode) {
    // Create the base text node
    const textNode = new Text();
    textNode.text = 'a';
    textNode.areaBox = {width: 10, height: 10};
    textNode.fill = new Color('black');

    const parent = oldNode.parent;
    if (isCompatible(parent)) {
        // Replace old node with text node (apply old transformation)
        if (isCompatible(parent)) {
            parent.addChildAfter(textNode, oldNode);
        }

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

    // Replace old node with new text node in selection:
    const newSelection = [...selection.items];
    newSelection.splice(newSelection.indexOf(oldNode), 1, textNode);
    selection.items = newSelection;

    return textNode;
};

/**
 * Checks whether a node is compatible
 * @param {import('scenegraph').SceneNode | null} node
 * @returns {node is {addChildAfter: function}}
 */
function isCompatible(node) {
    return (node !== null) && node.isContainer;
}
