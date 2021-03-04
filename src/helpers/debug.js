/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

/**
 * A helper class for debugging purposes
 */
class debugHelper {
    static shouldDebug() {
        return process.env.NODE_ENV === 'development';
    }

    /**
     * Logs elements to console
     * @param {*} objects Logged objects
     */
    static log(...objects) {
        if (debugHelper.shouldDebug()) {
            objects.unshift('Lorem Ipsum Plugin: ');
            const args = Array.prototype.slice.call(
                objects.map(
                    /**
                     *
                     * @param {any} value
                     * @return {any}
                     */
                    value => (value instanceof Object ? JSON.stringify(value) : value)
                )
            );
            const first = args.shift();
            console.log.apply(console, [first, ...args]);
        }
    }
}

module.exports = debugHelper;
