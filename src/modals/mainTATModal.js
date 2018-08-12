/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

/**
 * @param {Selection} selection
 */
async function showModal(selection) {
    console.log('Showing TAT main modal');
    let result = await modalAsync(selection);
    switch (result) {
        case 'trimHeight':
            const trimHeight = require('../functions/trimHeight');
            await trimHeight(selection);
            break;
        case 'placeholderText':
            // await placeholderText(selection);
            break;
        case 'copyHTML':
            // await copyHTML(selection);
            break;
        case 'settings':
            // await settings();
            break;
        case 'help':
            // await help();
            break;
    }
    return true;
}

/**
 * @param {Selection} selection
 */
async function modalAsync(selection) {
    return new Promise((resolve, reject) => {
        // Removing old instances
        document.body.innerHTML = '';

        const dialog = document.createElement('dialog');
        dialog.id = 'mainTATDialog';
        dialog.innerHTML = `
    <style>
    main {
        margin-top: 16px;
        display: flex;
    }
    
    footer {
        width: 100%;
    }
    
    .cmdButton {
        width: 102px;
        height: 102px;
        background: #EFEFEF;
        display: flex;
        flex-direction: column;
        align-content: baseline;
        align-items: center;
        
        text-align: center;
        
        padding: 16px;
        
        font-family: "SF Pro Display", sans-serif;
        cursor: pointer;
    }
    
    .cmdButton:hover {
        background: #E1E1E1;
    }
    
    .cmdButton img {
        flex-grow: 1;
    }
    
    .cmdButton .label {
        font-size: 8px;
        font-weight: bold;
        color: #797979;
        font-family: "SF Pro Display", sans-serif;
        display: block;
        width: 80px;
        margin-top: 10px;
    }
    
    .cmdButton .key {
        font-size: 20px;
        color: #2C2C2C;
        display: block;
        width: 100%;
        margin-top: 2px;
    }
    
    .cmdButton + .cmdButton {
        margin-left: 16px;
    }
    </style>
    `;

        const form = document.createElement('form');
        form.method = 'dialog';

        const heading = document.createElement('h1');
        heading.innerHTML = 'Text Area Toolbox';
        form.appendChild(heading);


        console.log(dialog);

        form.appendChild(buttonGroup([
            {
                key: 'Q', label: 'Trim height', image: 'img/trim.png', id: 'btnTrimHeight', action: () => {
                    resolve('trimHeight');
                }
            },
            {
                key: 'W', label: 'Lorem Ipsum…', image: 'img/lorem.png', id: 'btnLorem', action: () => {
                    resolve('lorem');
                }
            },
            {
                key: 'E', label: 'Copy HTML…', image: 'img/html.png', id: 'btnTrimHeight', action: () => {
                    resolve('copyHTML');
                }
            },
            {
                key: 'R', label: 'Settings…', image: 'img/settings.png', id: 'btnTrimHeight', action: () => {
                    resolve('settings');
                }
            },
            {
                key: 'T', label: 'Help', image: 'img/help.png', id: 'btnTrimHeight', action: () => {
                    resolve('help');
                }
            }
        ], dialog));

        const footer = document.createElement('footer');
        const btnCancel = document.createElement('button');
        btnCancel.id = "cancel";
        btnCancel.innerHTML = 'Cancel';
        btnCancel.onclick = () => {
            console.log("Closing Text Area Tools");
            dialog.close();
            reject();
            document.body.innerHTML = '';
        };
        footer.appendChild(btnCancel);
        form.appendChild(footer);

        dialog.appendChild(form);

        document.body.appendChild(dialog);

        const cancelButton = document.getElementById("cancel");

        dialog.showModal().then(() => resolve()).catch(() => reject());
    });

}

class Button {
    /**
     * @param {string} id
     * @param {string} image
     * @param {string} label
     * @param {string} key
     * @param {function} action
     */
    constructor(id, image, label, key, action) {
        this.id = id;
        this.image = image;
        this.label = label;
        this.key = key;
        this.action = action;
    }
}

/**
 * @param {Button[]} buttons
 * @param {HTMLDialogElement} dialog
 */
function buttonGroup(buttons, dialog) {
    const main = document.createElement('main');
    buttons.forEach(button => {
        let btn = document.createElement('div');
        btn.className = 'cmdButton';
        btn.id = button.id;

        btn.onclick = () => {
            button.action();
            dialog.close();
        };

        btn.innerHTML = `
        <img src="${button.image}" />
        <span class="label">${button.label}</span>
        <span class="key">${button.key}</span>
        `;

        main.appendChild(btn);
    });
    return main;
}

module.exports = showModal;