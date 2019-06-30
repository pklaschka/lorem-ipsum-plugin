/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const dialogHelper = require("xd-dialog-helper");

class errorHelper {
    static async showErrorDialog(title, message) {
        await dialogHelper.showDialog('lorem-error-dialog', title, [
            {
                type: dialogHelper.TEXT,
                label: message,
                id: 'message',
                value: true
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
                (document.getElementById('lorem-error-dialog-dialogHelperBtnCancel')).remove();
            }
        });
    }
}

module.exports = errorHelper;
