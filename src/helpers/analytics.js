/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const storage = require('xd-storage-helper');
const dialogHelper = require('xd-dialog-helper');

class analyticsHelper {
    /**
     * Sends analytics data. Does not verify acceptance beforehand!
     * @param {string} feature
     * @param {*} options
     * @return {Promise<void>}
     */
    static async send(feature, options) {
        /*let req = new XMLHttpRequest();
        req.open('POST', 'https://xdplugins.pabloklaschka.de/_api/submit');
        req.send(JSON.stringify({
            plugin_name: 'Lorem Ipsum',
            feature: feature,
            options: options
        }));*/
    }

    /**
     * Verifies that the user has accepted the privacy policy.
     * @param {Object} [passedOptions]
     * @param {string} passedOptions.pluginName
     * @param {string} passedOptions.privacyPolicyLink
     * @param {string} passedOptions.color
     * @return {Promise<boolean>}
     */
    static async verifyAcceptance(passedOptions) {
        if (await storage.get('analytics-accepted', false)) {
            return true;
        } else {
            let options = {
                pluginName: 'My plugin',
                privacyPolicyLink: 'https://www.mysite.com/privacy',
                color: '#2D4E64',
            };
            Object.assign(options, passedOptions);

            if (await this.dialog(options)) {
                await storage.set('analytics-accepted', true);
                return true;
            } else {
                throw new Error('Privacy policy wasn\'t accepted');
            }
        }
    }


    /**
     * @private
     * @param {object} options
     * @param {string} options.pluginName
     * @param {string} options.privacyPolicyLink
     * @param {string} options.color
     * @return {Promise<boolean>}
     * @throws {Error} When something goes wrong
     */
    static async dialog(options) {
        return true;
    }
}

module.exports = analyticsHelper;
