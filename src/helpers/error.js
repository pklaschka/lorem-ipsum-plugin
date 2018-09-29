/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

class errorHelper {
    static async showErrorDialog(title, message) {


        // Removing old instances
        document.body.innerHTML = '';

        const dialog = document.createElement('dialog');
        dialog.id = 'loremErrorModal';
        dialog.innerHTML = `
    <style>    
    form {
        width: 360px;
    }
    
    </style>
    `;

        const form = document.createElement('form');
        form.method = 'dialog';

        const heading = document.createElement('h1');
        heading.innerHTML = title;
        form.appendChild(heading);

        const description = document.createElement('p');
        description.innerHTML = message;
        form.appendChild(description);

        const footer = document.createElement('footer');
        const btnOk = document.createElement('button');
        btnOk.id = "ok";
        btnOk.type = "submit";
        btnOk.innerHTML = 'Ok';
        btnOk.setAttribute('uxp-variant', 'cta');
        btnOk.onclick = () => {
            dialog.close();
            document.body.innerHTML = '';
        };
        footer.appendChild(btnOk);
        form.appendChild(footer);
        dialog.appendChild(form);
        document.body.appendChild(dialog);

        return await dialog.showModal();
    }
}


module.exports = errorHelper;