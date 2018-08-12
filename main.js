/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

function modal() {
    const dialog = document.createElement('dialog');
    dialog.id = 'mainTATDialog';
    dialog.innerHTML = `
<form method="dialog">
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
        align-content: flex-end;
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
    <h1>Text Area Toolbox</h1>
    <main>
        <div class="cmdButton">
            <img src="img/trim.png" />
            <span class="label">Trim height</span>
            <span class="key">Q</span>
        </div>
        <div class="cmdButton">
            <img src="img/lorem.png" />
            <span class="label">Placeholder Text</span>
            <span class="key">W</span>
        </div>
        <div class="cmdButton">
            <img src="img/html.png" />
            <span class="label">Copy HTML</span>
            <span class="key">E</span>
        </div> 
        <div class="cmdButton">
            <img src="img/settings.png" />
            <span class="label">Settings</span>
            <span class="key">R</span>
        </div>            
        <div class="cmdButton">
            <img src="img/help.png" />
            <span class="label">Help</span>
            <span class="key">T</span>
        </div>
    </main>
    <footer>
        <button id="cancel">Cancel</button>
    </footer>
</form>
    `;

    document.appendChild(dialog);

    dialog.showModal();

    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => dialog.close());
}

function trimHeight() {
    console.log('trimHeight()');
}

function placeholderText() {
    console.log('placeholderText()');
}

function copyHTML() {
    console.log('copyHTML()');
}

module.exports = {
    commands: {
        modal: modal
    }
}