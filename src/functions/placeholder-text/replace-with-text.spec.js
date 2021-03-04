/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

describe('replaceWithText()', () => {
    /**
     * @type {import('scenegraph').Rectangle}
     */
    let myRectangle;

    /**
     * @type {import('scenegraph')}
     */
    let scenegraph;

    /**
     * @type {function}
     */
    let replaceWithText;

    beforeEach(() => {
        jest.mock('scenegraph');
        scenegraph = require('scenegraph');

        myRectangle = new scenegraph.Rectangle();
        replaceWithText = require('./replace-with-text');
    });

    it('should throw if the passed node does not have a parent node', () => {
        expect(() => replaceWithText(myRectangle)).toThrow();
    });

    it('should throw if the parent node is not a container', () => {
        // @ts-ignore
        myRectangle._parent = new scenegraph.Text();
        expect(() => replaceWithText(myRectangle)).toThrow();
    });

    it('should replace the Rectangle with a Text', () => {
        const parent = new scenegraph.Group();
        // @ts-ignore
        myRectangle._parent = parent;
        const textNode = replaceWithText(myRectangle);

        expect(parent.addChildAfter).toHaveBeenCalledWith(textNode, myRectangle);
        expect(myRectangle.removeFromParent).toHaveBeenCalled();
        expect(scenegraph.selection.items).toContain(textNode);
    });

    it('should replace the Rectangle with Text in the selection', () => {
        const parent = new scenegraph.Group();
        let anotherNode = new scenegraph.Text();
        // @ts-ignore
        myRectangle._parent = parent;
        scenegraph.selection.items = [myRectangle, anotherNode];
        const selectionBefore = [...scenegraph.selection.items];
        const textNode = replaceWithText(myRectangle);
        const selectionAfter = [...scenegraph.selection.items];

        // Selection of unaffected node shouldn't change
        expect(selectionBefore).toContain(anotherNode);
        expect(selectionAfter).toContain(anotherNode);

        // Text node should become part of the selected nodes
        expect(selectionAfter).toContainEqual(textNode);

        // Rectangle should be removed from selection
        expect(selectionAfter).not.toContain(myRectangle);

    });

});
