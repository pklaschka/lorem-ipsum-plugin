/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

class SelectionChecker {
    /**
     *
     * @param {Selection} selection
     */
    constructor(selection) {
        this.selection = selection;
    }

    /**
     * Checks if selection contains one or more of the specified SceneNode `types`
     * @param {...SceneNode} types The SceneNode types
     * @returns {boolean} `true` if the selection contains one or more of the specified SceneNode `types`
     */
    oneOrMore(...types) {
        return this.count.apply(this, types) > 0;
    }

    /**
     * Checks if selection contains exactly one occurance of an element of the specified SceneNode `types`
     * @param {...SceneNode} types The SceneNode types
     * @returns {boolean} `true` if the selection contains exactly one occurance of an element of the specified SceneNode `types`
     */
    exactlyOne(...types) {
        return this.count.apply(this, types) === 1;
    }

    /**
     * Checks if selection contains no occurances of any of the specified SceneNode `types`
     * @param {...SceneNode} types The SceneNode types
     * @returns {boolean} `true` if the selection contains no occurances of any of the specified SceneNode `types`
     */
    no(...types) {
        return this.count.apply(this, types) < 1;
    }

    /**
     * Counts the number of occurences of the scecified types
     * @returns {number} The number of elements of the specified types
     * @param {...SceneNode} types the SceneNode types
     */
    count(...types) {
        return this.selection.items.reduce((previousValue, currentValue) => {
            let isOfOneOfTypes = false;
            for (let type of types) {
                if (currentValue instanceof type) {
                    isOfOneOfTypes = true;
                    break;
                }
            }
            return previousValue + isOfOneOfTypes ? 1 : 0;
        }, 0);
    }
}


module.exports = SelectionChecker;