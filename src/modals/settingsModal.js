/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const storage = require('../helpers/storage');

/**
 * @param {Selection} selection
 */
async function showModal(selection) {
    console.log('Showing TAT main modal');
    let options = await modalAsync(selection);
    const lorem = require('../functions/lorem');
    await lorem(selection, options);
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
        dialog.id = 'settingsModal';
        dialog.innerHTML = `
    <style>    
    form {
        min-width: 360px;
    }
    * {
        width: 100%;
    }
    </style>
    `;

        const form = document.createElement('form');
        form.method = 'dialog';

        const heading = document.createElement('h1');
        heading.innerHTML = 'Text Area Toolbox Settings';
        form.appendChild(heading);

        storage.get('settings', {
            optionA: 'a',
            optionB: 'b'
        }).then(settings => {
            console.log('Found settings: ', JSON.stringify(settings));

            const optionA = selectBox('Value A', [
                {value: 'a', label: 'Option A'},
                {value: 'b', label: 'Option B'},
                {value: 'c', label: 'Option C'},
            ], settings.optionA);

            const optionB = selectBox('Value B', [
                {value: 'a', label: 'Option A'},
                {value: 'b', label: 'Option B'},
                {value: 'c', label: 'Option C'},
            ], settings.optionB);

            form.appendChild(optionA);
            form.appendChild(optionB);


            const footer = document.createElement('footer');
            const btnOk = document.createElement('button');
            btnOk.id = "ok";
            btnOk.type = "submit";
            btnOk.innerHTML = 'Save settings';
            btnOk.setAttribute('uxp-variant', 'cta');
            btnOk.onclick = () => {
                storage.set('settings', {
                    optionA: optionA.childNodes.item(1).value,
                    optionB: optionB.childNodes.item(1).value
                }).then(() => {
                    dialog.close();
                    resolve();
                    document.body.innerHTML = '';
                }).catch(reason => reject(reason));
            };
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
            footer.appendChild(btnOk);
            form.appendChild(footer);
            dialog.appendChild(form);
            document.body.appendChild(dialog);
            dialog.showModal().then(() => resolve()).catch(() => reject());
        }).catch(reason => reject(reason));

    });
}

function selectBox(label, entries, defaultValue) {
    const lblSelect = document.createElement("label");
    const spanLblSelect = document.createElement('span');
    spanLblSelect.innerHTML = label;
    lblSelect.appendChild(spanLblSelect);
    const select = document.createElement('select');

    for (let entry of entries) {
        let optEntry = document.createElement("option");
        optEntry.value = entry.value;
        optEntry.innerHTML = entry.label;
        select.appendChild(optEntry);
    }
    if (defaultValue) {
        select.value = defaultValue;
    }
    lblSelect.appendChild(select);

    return lblSelect;
}

function checkBox(label, defaultChecked) {
    const lblCheck = document.createElement("label");
    Object.assign(lblCheck.style, {flexDirection: "row", alignItems: "center"});
    // lblCheck.class = 'row';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = label;
    checkBox.placeholder = label;
    if (defaultChecked) {
        checkBox.checked = true;
    }
    lblCheck.appendChild(checkBox);
    const spanLblCheck = document.createElement('span');
    spanLblCheck.innerHTML = label;
    lblCheck.appendChild(spanLblCheck);

    return lblCheck;
}

module.exports = showModal;