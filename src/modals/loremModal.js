/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

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
        dialog.id = 'loremModal';
        dialog.innerHTML = `
    <style>    
    form {
        min-width: 360px;
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

        form.appendChild(selectBox('Placeholder text:', [
            {value: 'lorem-lat', label: 'Lorem Ipsum (Latin, Standard)'},
            {value: 'cicero-lat', label: 'Cicero (Latin)'},
            {value: 'cicero-en', label: 'Cicero (English)'},
            {value: 'pangram-en', label: 'Pangram (English)'},
            {value: 'pangram-de', label: 'Pangram (German)'},
            {value: 'pangram-es', label: 'Pangram (Espagnol)'},
            {value: 'pangram-fr', label: 'Pangram (Français)'},
        ], 'lorem-lat'));

        form.appendChild(checkBox('End with Period "."', true));
        form.appendChild(checkBox('Include line breaks', false));
        form.appendChild(document.createElement('hr'));
        form.appendChild(checkBox('Trim text area height after inserting text', true));

        const footer = document.createElement('footer');
        const btnOk = document.createElement('button');
        btnOk.id = "ok";
        btnOk.type = "submit";
        btnOk.innerHTML = 'Ok';
        btnOk.setAttribute('uxp-variant', 'cta');
        btnOk.onclick = () => {
            console.log("Lorem Ipsum");
            dialog.close();
            resolve();
            document.body.innerHTML = '';
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