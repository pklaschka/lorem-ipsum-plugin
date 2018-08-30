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
    const copyHTML = require('../functions/copyHTML');
    await copyHTML(selection, options);
    return true;
}

/**
 * @param {Selection} selection
 */
async function modalAsync(selection) {
    return new Promise((resolve, reject) => {
        storage.get('copyHTMLOptions', {
            layerNameComments: true,
            bold: '<strong>$</strong>',
            italics: '<i>$</i>',
            underline: '<a href="#">$</a>'
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

            const layerNameComments = checkBox('Include layer name comments', uiOptions.layerNameComments);
            form.appendChild(layerNameComments);

            // form.appendChild(checkBox('Sorround with layer name tags', false));
            const bold = selectBox('Bold-Tag', [
                {value: '<strong>$</strong>', label: '&lt;strong&gt;[…]&lt;/strong&gt;'},
                {value: '<b>$</b>', label: '&lt;b&gt;[…]&lt;/b&gt;'},
                {value: '<em>$</em>', label: '&lt;em&gt;[…]&lt;/em&gt;'},
            ], uiOptions.bold);
            form.appendChild(bold);

            const italics = selectBox('Italics-Tag', [
                {value: '<i>$</i>', label: '&lt;i&gt;[…]&lt;/strong&gt;'},
                {value: '<em>$</em>', label: '&lt;em&gt;[…]&lt;/em&gt;'},
            ], uiOptions.italics);
            form.appendChild(italics);

            const underline = selectBox('Underline-Tag', [
                {value: '<a href="#">$</a>', label: '&lt;a href="#"&gt;[…]&lt;/a&gt;'},
                {value: '<u>$</u>', label: '&lt;u&gt;[…]&lt;/u&gt;'},
            ], uiOptions.underline);
            form.appendChild(underline);

            const pseudoInput = document.createElement('input');
            pseudoInput.className = 'pseudoInput';
            form.appendChild(pseudoInput);

            const footer = document.createElement('footer');
            const btnOk = document.createElement('button');
            btnOk.id = "ok";
            btnOk.type = "submit";
            btnOk.innerHTML = 'Copy HTML to clipboard';
            btnOk.setAttribute('uxp-variant', 'cta');
            btnOk.onclick = () => {
                const options = {
                    layerNameComments: layerNameComments.childNodes.item(0).checked,
                    bold: bold.childNodes.item(1).value,
                    italics: italics.childNodes.item(1).value,
                    underline: underline.childNodes.item(1).value,
                };
                storage.set('copyHTMLOptions', options);
                console.log("Lorem Ipsum");
                dialog.close();
                resolve(options);
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