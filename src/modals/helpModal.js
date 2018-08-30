/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const storage = require('../helpers/storage');

/**
 * @param {Selection} selection
 */
async function showModal(selection) {
    console.log('Showing TAT help modal');
    let options = await modalAsync(selection);
    return true;
}

/**
 * @param {Selection} selection
 */
async function modalAsync(selection) {
    return new Promise((resolve, reject) => {
        storage.get('settings', {
            optionA: 'a',
            optionB: 'b'
        }).then(settings => {
            console.log('Found settings: ', JSON.stringify(settings));


            // Removing old instances
            document.body.innerHTML = '';

            const dialog = document.createElement('dialog');
            dialog.id = 'settingsModal';
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
            heading.innerHTML = 'Text Area Toolbox Help';
            form.appendChild(heading);

            const description = document.createElement('p');
            description.innerHTML = `
Help is coming soon. For now, I hope everything is intuitive enough ;-)
<br>
<b>Quick Tip:</b><br>
You can use the keyboard shortcuts (i.e. Q, W, E, R & T) shown below the action in the main dialog to quickly perform the corresponding action.
`;
            form.appendChild(description);

            const footer = document.createElement('footer');
            const btnCancel = document.createElement('button');
            btnCancel.id = "cancel";
            btnCancel.innerHTML = 'Close';
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