/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const storage = require('../helpers/storage');
const debugHelper = require('../helpers/debug');

/**
 * @param {Selection} selection
 */
async function showModal(selection) {
    debugHelper.log('Showing Lorem Ipsum modal');
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
        storage.get('loremOptions', {
            text: 'lorem-lat',
            terminate: true,
            includeLineBreaks: true,
            trim: false
        }).then(uiOptions => {

            // Removing old instances
            document.body.innerHTML = '';

            const dialog = document.createElement('dialog');
            dialog.id = 'loremModal';
            dialog.innerHTML = `
    <style>    
    form {
        min-width: 360px;
    }
    
    .pseudoInput {
        width: 0;
        height: 0;
    }
    
    input[type="checkbox"] {
    width: 18px;
    }
    </style>
    `;

            const form = document.createElement('form');
            form.method = 'dialog';

            const heading = document.createElement('h1');
            heading.innerHTML = 'Lorem Ipsum';
            form.appendChild(heading);

            const description = document.createElement('p');
            description.innerHTML = `Fills text area with placeholder text. This doesn't work with point text.
        `;
            form.appendChild(description);

            const text = selectBox('Placeholder text:', [
                {value: 'lorem-lat', label: 'Lorem Ipsum (Latin, Standard)'},
                {value: 'cicero-lat', label: 'Cicero (Latin)'},
                {value: 'cicero-en', label: 'Cicero (English)'},
                {value: 'pangram-en', label: 'Pangram (English)'},
                {value: 'pangram-de', label: 'Pangram (German)'},
                {value: 'pangram-es', label: 'Pangram (Espagnol)'},
                {value: 'pangram-fr', label: 'Pangram (Français)'},
            ], uiOptions.text);
            const terminate = checkBox('End with Period "."', uiOptions.terminate);
            const includeLineBreaks = checkBox('Include line breaks', uiOptions.includeLineBreaks);
            const trim = checkBox('Trim text area height after inserting text', uiOptions.trim);

            form.appendChild(text);
            form.appendChild(terminate);
            form.appendChild(includeLineBreaks);
            form.appendChild(trim);


            const pseudoInput = document.createElement('input');
            pseudoInput.className = 'pseudoInput';
            form.appendChild(pseudoInput);

            const footer = document.createElement('footer');
            const btnOk = document.createElement('button');
            btnOk.id = "ok";
            btnOk.type = "submit";
            btnOk.innerHTML = 'Insert text';
            btnOk.setAttribute('uxp-variant', 'cta');
            btnOk.onclick = () => {
                const loremOptions = {
                    text: text.childNodes.item(1).value,
                    terminate: terminate.childNodes.item(0).checked,
                    includeLineBreaks: includeLineBreaks.childNodes.item(0).checked,
                    trim: trim.childNodes.item(0).checked
                };
                storage.set('loremOptions', loremOptions).then(() => {
                    debugHelper.log("Lorem Ipsum");
                    dialog.close();
                    resolve(loremOptions);
                    document.body.innerHTML = '';
                });
            };
            const btnCancel = document.createElement('button');
            btnCancel.id = "cancel";
            btnCancel.innerHTML = 'Cancel';
            btnCancel.onclick = () => {
                debugHelper.log("Closing Text Area Tools");
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
        });
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