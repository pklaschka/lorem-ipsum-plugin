/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

const dialogHelper = require('xd-dialog-helper');

class errorHelper {
    /**
     *
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
            onBeforeShow: htmlDialogElement => {
                htmlDialogElement.appendChild(document.createElement('header'));
                const cancelButton = document.querySelector('lorem-error-dialog-dialogHelperBtnCancel');
                if (cancelButton)
                    cancelButton.remove();
            }
        });
    }
}

module.exports = errorHelper;
