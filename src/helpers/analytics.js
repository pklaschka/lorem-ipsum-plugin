/*
 * Copyright (c) 2019. by Pablo Klaschka
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
        let req = new XMLHttpRequest();
        req.open('POST', 'https://xdplugins.pabloklaschka.de/_api/submit');
        req.send(JSON.stringify({
            plugin_name: 'Lorem Ipsum',
            feature: feature,
            options: options
        }));
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
        try {
            const result = await dialogHelper.showDialog('analytics-agreement', 'Analytics', [
                {
                    id: 'description',
                    type: dialogHelper.types.TEXT,
                    label: `
<p>To enhance your experience when using the plugin, completely anonymous data regarding your usage will get submitted to (secure) servers in Germany. The submitted data doesn't include any user id or similar means of identifying specific users. Since data gets submitted to our servers in the form of HTTP requests, you'll have to accept the privacy policy <a href="${options.privacyPolicyLink}">${options.privacyPolicyLink}</a>to use the plugin.
</p>
<h2>Data that gets submitted:</h2>
<p>Data that's technically required to perform an HTTP request, a timestamp (current date and time), the plugin that gets used (i.e. ${options.pluginName}), the feature that gets used (e.g., which menu item selected) and the options that get used (e.g., categorical settings you set in dialogs).
</p>
<h2>Data that explicitly won't get submitted:</h2>
<p>Any data identifying you (e.g., user ids or similar), any data regarding your document, files on your computer or similar, any data that I didn't list above in "Data that gets submitted"
</p>
                `,
                    htmlAttributes: {}
                },
                {
                    type: dialogHelper.types.CHECKBOX,
                    htmlAttributes: {},
                    required: true,
                    label: `I have read and accepted the privacy policy (${options.privacyPolicyLink})`,
                    id: 'accepted'
                }
            ], {
                width: 640,
                okButtonText: 'Accept',
                css: `
    header {
        background: ${options.color};
        height: 16px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
    }
    
    main {
        overflow-y: auto;
    }
            `,
                onBeforeShow: (dialogElement) => {
                    dialogElement.appendChild(document.createElement('header'));
                }
            });

            return result['accepted'];
        } catch (e) {
            return false;
        }
    }
}

module.exports = analyticsHelper;
