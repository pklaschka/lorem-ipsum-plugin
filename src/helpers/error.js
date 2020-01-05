/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const dialogHelper = require('xd-dialog-helper');
const lang = require('xd-localization-helper');
const logger = require('./debug');

class ErrorHelper {
    /**
     * Wraps an operation in an error wrapper, showing an error dialog in case of an exception
     * @param {function} operation The operation that should get run
     * @returns {Promise<boolean>} resolves to `true` when the operation was successful, `false` if it wasn't
     */
    static async handleErrors(operation) {
        let returnValue;
        try {
            await operation();
            returnValue = true;
        } catch (e) {
            logger.log(e);
            try {
                await ErrorHelper.showErrorDialog(lang.get('error.general.title'), `${lang.get('error.general.description')}<br><code>${e.message}</code>`);
            } finally { returnValue = false; }
        }
        return returnValue;
    }

    /**
     * Shows a simple error dialog
     * @param {string} title
     * @param {string} message
     * @return {Promise<void>}
     */
    static async showErrorDialog(title, message) {
        await dialogHelper.showDialog('lorem-error-dialog', title, [
            {
                type: dialogHelper.types.TEXT,
                label: message,
                id: 'message',
                value: true,
                htmlAttributes: {}
            }
        ], {
            width: 360,
            css: `
            header {
                background: #2D4E64;
                height: 16px;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
            }`,
            onBeforeShow: /* istanbul ignore next */ htmlDialogElement => {
                htmlDialogElement.appendChild(document.createElement('header'));
                const cancelButton = document.querySelector('lorem-error-dialog-dialogHelperBtnCancel');
                if (cancelButton)
                    cancelButton.remove();
            }
        });
    }
}

module.exports = ErrorHelper;
