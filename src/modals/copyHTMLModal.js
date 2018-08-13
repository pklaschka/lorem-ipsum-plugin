/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

/**
 * @param {Selection} selection
 */
async function showModal(selection) {
    console.log('Showing TAT main modal');
    let options = await modalAsync(selection);
    /*const lorem = require('../functions/lorem');
    await lorem(selection, options);*/
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
        heading.innerHTML = 'Copy HTML';
        form.appendChild(heading);

        const description = document.createElement('p');
        description.innerHTML = `Copies markup for the selected nodes to clipboard as HTML. When multiple nodes are selected, the order the nodes were selected in determines the order in the HTML.
        `;
        form.appendChild(description);

        form.appendChild(checkBox('Include layer name comments', true));
        form.appendChild(checkBox('Sorround with layer name tags', false));
        form.appendChild(selectBox('Bold-Tag', [
            {value: 'strong', label: '&lt;strong&gt;[…]&lt;/strong&gt;'},
            {value: 'b', label: '&lt;b&gt;[…]&lt;/b&gt;'},
            {value: 'em', label: '&lt;em&gt;[…]&lt;/em&gt;'},
        ], 'strong'));
        form.appendChild(selectBox('Italics-Tag', [
            {value: 'i', label: '&lt;i&gt;[…]&lt;/strong&gt;'},
            {value: 'em', label: '&lt;em&gt;[…]&lt;/em&gt;'},
        ], 'i'));

        const footer = document.createElement('footer');
        const btnOk = document.createElement('button');
        btnOk.id = "ok";
        btnOk.type = "submit";
        btnOk.innerHTML = 'Copy HTML to clipboard';
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