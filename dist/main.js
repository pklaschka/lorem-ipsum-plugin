module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/xd-dialog-helper/dialog-helper.js":
/*!********************************************************!*\
  !*** ./node_modules/xd-dialog-helper/dialog-helper.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * dialog-helper.js v0.9.5
 * Copyright (c) 2018. by Pablo Klaschka
 */

let dialogs = {};

class DialogHelper {
    /**
     * A callback that gets triggered before the dialog gets shown, but after all contents got generated. You can – e.g., – manually adjust things here.
     * @callback onBeforeShowCallback
     * @param {HTMLDialogElement} dialogElement The dialog element that gets shown
     * @param {{wrapper, input?}[]} elements The dialog's elements in a key-value based manner (the key corresponds to the name of an input).,
     * @param {{close, cancel}} actions Dialog actions that can get triggered
     */

    /**
     * @callback onValidationCallback
     * @param {any[]} values The values (as they would be returned by the dialog)
     * @return {boolean} True if the dialog entries are valid
     */

    /**
     * Options regarding the dialogs properties
     * @typedef {Object} dialogOptions
     * @property {string} [okButtonText="Ok"] The text in the "ok" button (e.g., "ok", "insert" or similar)
     * @property {string} [cancelButtonText="Cancel"] The text in the "cancel" button (e.g., "cancel", "abort" or similar)
     * @property {string} [css] CSS code that gets injected into the style
     * @property {number} [width=360] The dialog width in px
     * @property {onBeforeShowCallback} [onBeforeShow] A function that gets triggered before the dialog gets shown. You can – e.g. – inject custom code here.
     * @property {onValidationCallback} [onValidate] A function that gets triggered when inputs change. Its return value determines if the inputs are value and therefore, if the ok button is clickable
     */

    /**
     * A content element of the dialog
     * @typedef {Object} contentElement
     * @property {HEADER | TEXT_INPUT | SLIDER | TEXT | SELECT | TEXT_AREA | HR | CHECKBOX} type The type of the element
     * @property {string} id The unique identifier of the element (will get used in the results object of the modal)
     * @property {Array<{value:string, label:string}>} [options] The options that can get chosen by the user (**only** relevant for type`DialogHelper.SELECT`)
     * @property {string} [label=id] The label of the element (i.e., e.g., explanatory text or the text itself for headlines and descriptions)
     * @property {string} [unit=''] The unit of the numeric value (only relevant for type `DialogHelper.SLIDER`)
     * @property {string|boolean|number} [value] The initial of a form field (will replace a value attribute in {@link contentElement.htmlAttributes} if one is set). For a {@link CHECKBOX}, a boolean value determines whether it is checked or not.
     * @property {Object} [htmlAttributes={}] Additional HTML attributes for the input field (e.g., `style`, `min` and `max` for numeric input etc.)
     */

    /**
     * Shows a dialog and awaits its results
     * @param {string} id The dialogs name / unique identifier
     * @param {string} title The title that gets displayed in the dialog
     * @param {{label: *, id: string, type: number, value: boolean}[]} [contents=[]] The contents of the dialog
     * @param {dialogOptions} [options={}] Additional options for the dialog
     * @return {Promise<object>} Promise, which resolves with the form values or rejects if the dialog gets canceled
     */
    static showDialog(id, title, contents, options) {
        contents = contents || [];
        options = options || {};

        return new Promise(async (resolve, reject) => {
            let dialog;
            if (!dialogs[id]) {
                // Generate the dialog
                dialog = document.createElement('dialog');
                dialog.id = id;
                dialogs[id] = dialog;
            } else {
                dialog = dialogs[id];
                dialog.innerHTML = ''; // Empty the dialog
            }

            const stylesheet = document.createElement('style');
            stylesheet.innerHTML = `
            dialog#${id} {
                width: ${options.width || 360}px;
            }
            
            ${options.css || ''}
            `;
            dialog.appendChild(stylesheet);

            // fill the dialog with contents
            const form = document.createElement('form');

            const titleElement = document.createElement('h1');
            titleElement.innerHTML = title;
            form.appendChild(titleElement);

            const elements = DialogHelper.parseElements(id, contents);

            for (let key in elements) {
                if (elements.hasOwnProperty(key))
                    form.appendChild(elements[key].wrapper);
            }

            const footer = document.createElement('footer');

            footer.innerHTML = `
        <button id="${id}-dialogHelperBtnCancel" uxp-variant="primary">${options.cancelButtonText || 'Cancel'}</button>
        <button id="${id}-dialogHelperBtnOk" type="submit" uxp-variant="cta">${options.okButtonText || 'Ok'}</button>`;

            form.appendChild(footer);

            function onsubmit() {
                dialog.close('ok');
            }

            form.onsubmit = onsubmit;

            dialog.appendChild(form);
            document.body.appendChild(dialog);

            const cancelButton = document.querySelector("#" + id + "-dialogHelperBtnCancel");
            cancelButton.addEventListener("click", () => dialog.close('reasonCanceled'));

            /**
             * The ok button
             * @type {HTMLButtonElement}
             */
            const okButton = document.querySelector("#" + id + "-dialogHelperBtnOk");
            okButton.addEventListener("click", e => {
                onsubmit();
                e.preventDefault();
            });

            if (options.onBeforeShow)
                options.onBeforeShow(dialog, elements, {
                    cancel: () => dialog.close('reasonCanceled'),
                    close: () => {
                        if (!okButton.disabled)
                            onsubmit();
                    }
                });

            if (options.onValidate)
                this.setupValidation(elements, okButton, options.onValidate);

            const result = await dialog.showModal();
            if (result !== 'reasonCanceled') {
                let returnValue = {};
                for (let key in elements) {
                    if (elements.hasOwnProperty(key)) {
                        const element = elements[key];

                        if (element.input) {
                            if (element.input.type === 'checkbox') {
                                returnValue[key] = element.input.checked;
                            } else if (element.input.type === 'range') {
                                // Numerical values
                                returnValue[key] = Number(element.input.value);
                            } else {
                                returnValue[key] = element.input.value === undefined ? '' : element.input.value;
                            }
                        }
                    }
                }

                resolve(returnValue);
            } else {
                reject(`Dialog '${id}' got canceled by the user`);
            }
        });
    }

    /**
     * Setting up validation of the dialog
     * @param {Array<Object<{wrapper: HTMLElement, input: HTMLElement}>>} elements The elements
     * @param {HTMLButtonElement} okButton The ok button (gets disabled if form is invalid)
     * @param {onValidationCallback} validationFunction
     */
    static setupValidation(elements, okButton, validationFunction) {
        function values(elements) {
            let returnValue = {};
            for (let key in elements) {
                if (elements.hasOwnProperty(key)) {
                    const element = elements[key];

                    if (element.input) {
                        if (element.input.type === 'checkbox') {
                            returnValue[key] = element.input.checked;
                        } else {
                            returnValue[key] = element.input.value === undefined ? '' : element.input.value;
                        }
                    }
                }
            }

            return returnValue;
        }

        if (validationFunction) {
            for (let key in elements) {
                if (elements.hasOwnProperty(key)) {
                    let element = elements[key];

                    if (element.hasOwnProperty('input')) {
                        element.input.addEventListener('change', () => {
                            okButton.disabled = !validationFunction(values(elements));
                        });
                        element.input.addEventListener('input', () => {
                            okButton.disabled = !validationFunction(values(elements));
                        });
                    }
                }
            }

            // Initial validation
            okButton.disabled = !validationFunction(
                values(elements)
            );
        }
    }

    /**
     * Create an object with the content elements in a key-value form (inside an object)
     * @private
     * @param {string} dialogId
     * @param {Array<contentElement>} contents
     * @return {Array<Object<{wrapper:HTMLElement, input: HTMLElement}>>} An object containing the elements in key-value form (with the key being the id)
     */
    static parseElements(dialogId, contents) {
        let elementsObject = {};
        for (let element of contents) {
            const virtualID = element.id;
            element.id = dialogId + '-' + element.id;
            switch (element.type) {
                case this.HEADER:
                    elementsObject[virtualID] = this.parseHeader(element);
                    break;
                case this.TEXT_INPUT:
                    elementsObject[virtualID] = this.parseInput(element, 'text');
                    break;
                /*case this.NUMBER_INPUT:
                    elementsObject[element.id] = this.parseInput(element, 'number');
                    break;*/
                case this.TEXT_AREA:
                    elementsObject[virtualID] = this.parseTextarea(element);
                    break;
                case this.SELECT:
                    elementsObject[virtualID] = this.parseSelect(element);
                    break;
                case this.SLIDER:
                    elementsObject[virtualID] = this.parseSlider(element);
                    break;
                case this.CHECKBOX:
                    elementsObject[virtualID] = this.parseCheckbox(element);
                    break;
                case this.HR:
                    elementsObject[virtualID] = this.parseHR(element);
                    break;
                default:
                    elementsObject[virtualID] = this.parseText(element);

            }
        }
        return elementsObject;
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement}}
     */
    static parseHeader(contentElement) {
        const header = document.createElement('h2');
        header.innerHTML = contentElement.label;
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                header.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        header.id = contentElement.id;

        return { wrapper: header };
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement}}
     */
    static parseText(contentElement) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = contentElement.label;
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                paragraph.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        paragraph.id = contentElement.id;

        return { wrapper: paragraph };
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement}}
     */
    static parseHR(contentElement) {
        const rule = document.createElement('hr');
        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                rule.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }
        rule.id = contentElement.id;

        return { wrapper: rule };
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @param {'text'|'number'} type
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseInput(contentElement, type) {
        let inputWrapper = document.createElement("label");
        inputWrapper.id = contentElement.id + '-wrapper';
        const input = document.createElement('input');
        input.type = type;
        input.id = contentElement.id;
        input.placeholder = contentElement.label;
        const inputLabel = document.createElement('span');
        inputLabel.id = contentElement.id + '-label';
        inputLabel.innerHTML = contentElement.label + '<br>';
        inputWrapper.appendChild(inputLabel);
        inputWrapper.appendChild(input);

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                input.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        if (contentElement.value !== undefined)
            input.value = contentElement.value;

        return { wrapper: inputWrapper, input: input };
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement} | null}
     */
    static parseSlider(contentElement) {
        if (
            contentElement.htmlAttributes === undefined ||
            (contentElement.htmlAttributes.value === undefined && contentElement.value === undefined) ||
            contentElement.htmlAttributes.min === undefined ||
            contentElement.htmlAttributes.max === undefined
        ) {
            console.error('A slider must have a min, max and value parameter specified in its `htmlAttributes` (value can also be specified outside the `htmlAttributes`).');
            return null;
        }

        const sliderWrapper = document.createElement("label");
        sliderWrapper.id = contentElement.id + '-wrapper';

        const label = document.createElement("span");
        label.textContent = contentElement.label;
        label.id = contentElement.id + '-label';

        const displayValue = document.createElement("span");
        displayValue.id = contentElement.id + '-value-label';
        displayValue.textContent = (contentElement.htmlAttributes.value || contentElement.value) + (contentElement.unit || '');

        const labelAndDisplay = document.createElement("div");
        labelAndDisplay.className = "row";
        labelAndDisplay.style.justifyContent = "space-between";
        labelAndDisplay.appendChild(label);
        labelAndDisplay.appendChild(displayValue);

        const slider = document.createElement("input");
        slider.id = contentElement.id;
        slider.setAttribute("type", "range");

        slider.addEventListener('change',
            () => displayValue.textContent = Math.round(slider.value) + (contentElement.unit || ''));

        sliderWrapper.appendChild(labelAndDisplay);
        sliderWrapper.appendChild(slider);

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                if (contentElement.htmlAttributes.hasOwnProperty(name))
                    slider.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        if (contentElement.value !== undefined)
            slider.value = contentElement.value;

        return { wrapper: sliderWrapper, input: slider }
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseTextarea(contentElement) {
        let textareaWrapper = document.createElement("label");
        textareaWrapper.id = contentElement.id + '-wrapper';
        const textarea = document.createElement('textarea');
        textarea.id = contentElement.id;
        textarea.placeholder = contentElement.label;
        const textareaLabel = document.createElement('span');
        textareaLabel.id = contentElement.id + '-label';
        textareaLabel.innerHTML = contentElement.label + '<br>';
        textareaWrapper.appendChild(textareaLabel);
        textareaWrapper.appendChild(textarea);


        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                textarea.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        if (contentElement.value !== undefined)
            textarea.value = contentElement.value;

        return { wrapper: textareaWrapper, input: textarea };
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseCheckbox(contentElement) {
        const checkboxWrapper = document.createElement("label");
        checkboxWrapper.id = contentElement.id + '-wrapper';
        Object.assign(checkboxWrapper.style, { flexDirection: "row", alignItems: "center" });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = contentElement.id;
        checkbox.placeholder = contentElement.label;

        checkboxWrapper.appendChild(checkbox);
        const checkboxLabel = document.createElement('span');
        checkboxLabel.id = contentElement.id + '-label';
        checkboxLabel.innerHTML = contentElement.label;
        checkboxWrapper.appendChild(checkboxLabel);


        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                checkbox.setAttribute(name, contentElement.htmlAttributes[name]);
            }
        }

        if (contentElement.value !== undefined) {
            checkbox.value = contentElement.value;
            checkbox.checked = contentElement.value === true;
        }

        return { wrapper: checkboxWrapper, input: checkbox };
    }

    /**
     * @private
     * @param {contentElement} contentElement
     * @return {{wrapper: HTMLElement, input: HTMLElement}}
     */
    static parseSelect(contentElement) {
        const selectWrapper = document.createElement("label");
        selectWrapper.id = contentElement.id + "-wrapper";
        const selectLabel = document.createElement('span');
        selectLabel.id = contentElement.id + "-label";
        selectLabel.innerHTML = contentElement.label;
        selectWrapper.appendChild(selectLabel);
        const select = document.createElement('select');
        select.id = contentElement.id;

        for (let entry of contentElement.options) {
            let optEntry = document.createElement("option");
            optEntry.value = entry.value;
            optEntry.innerHTML = entry.label;
            select.appendChild(optEntry);
        }
        selectWrapper.appendChild(select);

        if (contentElement.htmlAttributes) {
            for (let name in contentElement.htmlAttributes) {
                select.setAttribute(name, contentElement.htmlAttributes[name]);
            }
            // To select value in select:
            if (contentElement.htmlAttributes['value'])
                select.value = contentElement.htmlAttributes.value;
        }


        if (contentElement.value !== undefined)
            select.value = contentElement.value;

        return { wrapper: selectWrapper, input: select };
    }


    /**
     * A headline
     */
    static get HEADER() {
        return 0;
    }

    /**
     * A simple text (primarily used for descriptions)
     * @deprecated Deprecated since version 0.9.1, will be removed in v1.0.0. Use {@link TEXT} instead
     */
    static get DESCRIPTION() {
        return 1;
    }

    /**
     * A simple text (primarily used for descriptions)
     */
    static get TEXT() {
        return 1;
    }

    /**
     * A simple text input
     */
    static get TEXT_INPUT() {
        return 2;
    }

    /**
     * A text area
     */
    static get TEXT_AREA() {
        return 3;
    }

    /**
     * A dropdown select field
     */
    static get SELECT() {
        return 4;
    }

    /**
     * A slider
     */
    static get SLIDER() {
        return 5;
    }

    /**
     * An input for numeric values
     */

    /*static get NUMBER_INPUT() {
        return 6;
    }*/

    /**
     * A horizontal ruler (`<hr>`)
     */
    static get HR() {
        return 7;
    }

    /**
     * A checkbox
     */
    static get CHECKBOX() {
        return 8;
    }
}

module.exports = DialogHelper;


/***/ }),

/***/ "./node_modules/xd-localization-helper/localization-helper.js":
/*!********************************************************************!*\
  !*** ./node_modules/xd-localization-helper/localization-helper.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){const r=n(1).storage,a=r.localFileSystem;let o,i=void 0,s=void 0;class l{static get lang(){return o}static get hasTranslation(){return void 0!==s}static unload(){o=void 0,i=void 0,s=void 0}static async load(t,e){l.unload(),o=n(2).appLanguage,t=t||"lang";let u=Object.assign({overrideLanguage:null},e||{});o=u.overrideLanguage?u.overrideLanguage:o;try{const e=await a.getPluginFolder();if(!(await e.getEntries()).find(e=>e.name===t))throw"translationFolderLocation '"+t+"' doesn't exist";const n=await e.getEntry(t);if(n.isFolder){const e=await n.getEntries();if(!e.find(t=>"default.json"===t.name))throw"required default.json file not available in the translation folder '"+t+"'...";{const t=await n.getEntry("default.json");i=JSON.parse((await t.read({format:r.formats.utf8})).toString())}if(e.find(t=>t.name===o+".json")){const t=await n.getEntry(o+".json");s=JSON.parse((await t.read({format:r.formats.utf8})).toString())}return!0}throw"translationFolderLocation '"+t+"' is not a folder"}catch(t){throw"Localization helper: Translations didn't load successfully: "+t}}static getNamespaced(t,e){if(t.hasOwnProperty(e))return t[e];for(let n=1;n<=e.split(".").length+1;n++){let r=e.split(".",n).join(".");if(t.hasOwnProperty(r))return this.getNamespaced(t[r],e.substring(r.length+1,e.length))}return!1}static get(t){if(s&&this.getNamespaced(s,t))return this.getNamespaced(s,t);if(i){if(this.getNamespaced(i,t))return this.getNamespaced(i,t);throw"Localization helper: String was not found, key: '"+t+"'"}throw"Localization helper: The library wasn't initialized. Please use 'await LocalizationHelper.load()' before getting a string."}}t.exports=l},function(t,e){t.exports=__webpack_require__(/*! uxp */ "uxp")},function(t,e){t.exports=__webpack_require__(/*! application */ "application")}]);

/***/ }),

/***/ "./node_modules/xd-storage-helper/storage-helper.js":
/*!**********************************************************!*\
  !*** ./node_modules/xd-storage-helper/storage-helper.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const storage = __webpack_require__(/*! uxp */ "uxp").storage;
const fs = storage.localFileSystem;

let data;

class storageHelper {
    /**
     * Creates a data file if none was previously existent.
     * @return {Promise<storage.File>} The data file
     * @private
     */
    static async init() {
        let dataFolder = await fs.getDataFolder();
        try {
            let returnFile = await dataFolder.getEntry('storage.json');
            data = JSON.parse((await returnFile.read({format: storage.formats.utf8})).toString());
            return returnFile;
        } catch (e) {
            const file = await dataFolder.createEntry('storage.json', {type: storage.types.file, overwrite: true});
            if (file.isFile) {
                await file.write('{}', {append: false});
                data = {};
                return file;
            } else {
                throw new Error('Storage file storage.json was not a file.');
            }
        }
    }

    /**
     * Retrieves a value from storage. Saves default value if none is set.
     * @param {string} key The identifier
     * @param {*} defaultValue The default value. Gets saved and returned if no value was previously set for the speciefied key.
     * @return {Promise<*>} The value retrieved from storage. If none is saved, the `defaultValue` is returned.
     */
    static async get(key, defaultValue) {
        if (!data) {
            const dataFile = await this.init();
            data = JSON.parse((await dataFile.read({format: storage.formats.utf8})).toString());
        }
        if (data[key] === undefined) {
            await this.set(key, defaultValue);
            return defaultValue;
        } else {
            return data[key];
        }
    }

    /**
     * Saves a certain key-value-pair to the storage.
     * @param {string} key The identifier
     * @param {*} value The value that get's saved
     * @return {Promise<void>}
     */
    static async set(key, value) {
        const dataFile = await this.init();
        data[key] = value;
        return await dataFile.write(JSON.stringify(data), {append: false, format: storage.formats.utf8})
    }

    /**
     * Deletes a certain key-value-pair from the storage
     * @param {string} key The key of the deleted pair
     * @return {Promise<void>}
     */
    static async delete(key) {
        return await this.set(key, undefined);
    }

    /**
     * Resets (i.e. purges) all stored settings.
     * @returns {Promise<void>}
     */
    static async reset() {
        const dataFile = await this.init();
        return await dataFile.write('{}', {append: false, format: storage.formats.utf8})

    }
}

module.exports = storageHelper;


/***/ }),

/***/ "./src/functions/lorem.js":
/*!********************************!*\
  !*** ./src/functions/lorem.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const {Text} = __webpack_require__(/*! scenegraph */ "scenegraph");
const trimHeight = __webpack_require__(/*! ./trimHeight */ "./src/functions/trimHeight.js");
const debugHelper = __webpack_require__(/*! ../helpers/debug */ "./src/helpers/debug.js");
__webpack_require__(/*! ../helpers/check-selection */ "./src/helpers/check-selection.js");
const analytics = __webpack_require__(/*! ../helpers/analytics */ "./src/helpers/analytics.js");

const texts = {
    'lorem-lat': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'cicero-lat': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    'cicero-en': 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.',
    'pangram-en': 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek\'s fun TV quiz game.',
    'pangram-de': 'Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. "Fix, Schwyz!" quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung. Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. "Fix, Schwyz!" quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung.Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim.',
    'pangram-es': 'Quiere la boca exhausta vid, kiwi, piña y fugaz jamón. Fabio me exige, sin tapujos, que añada cerveza al whisky. Jovencillo emponzoñado de whisky, ¡qué figurota exhibes! La cigüeña tocaba cada vez mejor el saxofón y el búho pedía kiwi y queso. El jefe buscó el éxtasis en un imprevisto baño de whisky y gozó como un duque. Exhíbanse politiquillos zafios, con orejas kilométricas y uñas de gavilán. El cadáver de Wamba, rey godo de España, fue exhumado y trasladado en una caja de zinc que pesó un kilo. El pingüino Wenceslao hizo kilómetros bajo exhaustiva lluvia y frío, añoraba a su querido cachorro. El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja. Quiere la boca exhausta vid, kiwi, piña y fugaz jamón. Fabio me exige, sin tapujos, que añada cerveza al whisky. Jovencillo emponzoñado de whisky, ¡qué figurota exhibes! La cigüeña tocaba cada vez mejor el saxofón y el búho pedía kiwi y queso. El jefe buscó el éxtasis en un imprevisto baño de whisky y gozó como un duque. Exhíbanse politiquillos zafios, con orejas kilométricas y uñas de gavilán. El cadáver de Wamba, rey godo de España, fue exhumado y trasladado en una caja de zinc que pesó un kilo. El pingüino Wenceslao hizo kilómetros bajo exhaustiva lluvia y frío, añoraba a su querido cachorro. El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.Quiere la boca exhausta vid, kiwi, piña y fugaz jamón. Fabio me exige, sin tapujos, que añada cerveza al whisky. Jovencillo emponzoñado de whisky, ¡qué figurota exhibes! La cigüeña tocaba cada vez mejor el saxofón y el búho pedía kiwi y queso.',
    'pangram-fr': 'Voyez ce jeu exquis wallon, de graphie en kit mais bref. Portez ce vieux whisky au juge blond qui fume sur son île intérieure, à côté de l\'alcôve ovoïde, où les bûches se consument dans l\'âtre, ce qui lui permet de penser à la cænogenèse de l\'être dont il est question dans la cause ambiguë entendue à Moÿ, dans un capharnaüm qui, pense-t-il, diminue çà et là la qualité de son œuvre. Prouvez, beau juge, que le fameux sandwich au yak tue. L\'île exiguë, Où l\'obèse jury mûr Fête l\'haï volapük, Âne ex æquo au whist, Ôtez ce vœu déçu. Vieux pelage que je modifie : breitschwanz ou yak ? Dès Noël où un zéphyr haï me vêt de glaçons würmiens, je dîne d’exquis rôtis de bœuf au kir à l’aÿ d’âge mûr & cætera ! Fougueux, j\'enivre la squaw au pack de beau zythum. Ketch, yawl, jonque flambant neuve… jugez des prix ! Voyez le brick géant que j\'examine près du wharf. Portez ce vieux whisky au juge blond qui fume. Bâchez la queue du wagon-taxi avec les pyjamas du fakir. Voix ambiguë d\'un cœur qui, au zéphyr, préfère les jattes de kiwis. Mon pauvre zébu ankylosé choque deux fois ton wagon jaune. Perchez dix, vingt woks. Qu\'y flambé-je ? Le moujik équipé de faux breitschwanz voyage. Kiwi fade, aptéryx, quel jambon vous gâchez ! Jugez qu\'un vieux whisky blond pur malt fonce. Faux kwachas ? Quel projet de voyage zambien ! Fripon, mixez l\'abject whisky qui vidange. Vif juge, trempez ce blond whisky aqueux. Vif P-DG mentor, exhibez la squaw jockey.',
};

/**
 * Fills text area with placeholder text (Lorem Ipsum)
 * @param {Selection} selection
 * @param {object} options
 * @param {boolean} options.trim
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks
 * @param {string} options.text
 */
function lorem(selection, options) {
    // TODO: Add support for Groups inside RepeatGrids (on the other hand: forget that, it's currently unsupported by the APIs ;-))
    debugHelper.log('Lorem ipsum with options ', (options));
    let terminationString = options.terminationString === 'n/a' ? '' : options.terminationString;
    for (let element of selection.items) {
        if (element instanceof Text && element.areaBox) {
            let prevCount = 0;
            let count = 1;
            debugHelper.log('Propagating forward');
            do {
                prevCount = count;
                count *= 2;
                applyText(element, loremText(count, options.text, options.includeLineBreaks) + terminationString);
            } while (!element.clippedByArea && count < 100000);
            debugHelper.log('Propagating backwards from ', count);

            count = checkBetween(prevCount, count, (count) => {
                applyText(element, loremText(count, options.text, options.includeLineBreaks) + terminationString);
                return element.clippedByArea;
            });
            applyText(element, loremText(count, options.text, options.includeLineBreaks) + terminationString);

            debugHelper.log('Completed at ', count);
            if (options.trim) {
                trimHeight(selection);
            }
        } else if (element instanceof Text) {
            element.text = loremText(2, options.text, false) + terminationString;
        } else {
            debugHelper.log('Node ', element, ' is not a text layer.');
        }
    }
    analytics.verifyAcceptance({
        pluginName: 'Lorem Ipsum',
        privacyPolicyLink: 'https://xdplugins.pabloklaschka.de/privacy-policy'
    }).then(()=>{
        analytics.send('lorem', options);
    });
}

/**
 * Applies text to the passed text layer (also, if it's e.g. inside a RepeatGrid
 * @param {Text} textLayer
 * @param {string} text
 */
function applyText(textLayer, text) {
    let optRepeatGridNode;
    if (textLayer.parent.parent && textLayer.parent.parent.constructor.name === 'RepeatGrid') {
        optRepeatGridNode = textLayer.parent.parent;
    }

    if (optRepeatGridNode)
        optRepeatGridNode.attachTextDataSeries(textLayer, [text]);
    else
        textLayer.text = text;
}

/**
 * @param oldCount The highest count that was clipped
 * @param newCount The lowest count that wasn't clipped
 * @param {function(count:number): boolean} isClipped
 */
function checkBetween(oldCount, newCount, isClipped) {
    debugHelper.log('Checking between ', oldCount, ' and ', newCount);

    if (Math.abs(oldCount - newCount) < 2)
        return oldCount;

    let half = Math.floor((oldCount + newCount) / 2);

    return isClipped(half) ? checkBetween(oldCount, half, isClipped) : checkBetween(half, newCount, isClipped);
}

function loremText(count, text, includeLineBreaks) {
    function trimToNWords(strText, n, includeLineBreaks) {
        // Ensure text is long enough:
        while (strText.split(" ").length < n) {
            strText = includeLineBreaks ? (strText + "\n" + strText) : (strText + " " + strText);
        }
        return strText
            .split(" ")
            .splice(0, n)
            .join(" ");
    }

    let originalString = texts[text];
    let strReturn = trimToNWords(originalString, count, includeLineBreaks).trim();
    if (strReturn.endsWith('.') || strReturn.endsWith(',') || strReturn.endsWith('?') || strReturn.endsWith(';') || strReturn.endsWith(':') || strReturn.endsWith('-') || strReturn.endsWith('–') || strReturn.endsWith('!'))
        strReturn = strReturn.substr(0, strReturn.length - 1);
    return strReturn;
}

module.exports = lorem;


/***/ }),

/***/ "./src/functions/trimHeight.js":
/*!*************************************!*\
  !*** ./src/functions/trimHeight.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const {Text} = __webpack_require__(/*! scenegraph */ "scenegraph");
const debugHelper = __webpack_require__(/*! ../helpers/debug */ "./src/helpers/debug.js");
const SelectionChecker = __webpack_require__(/*! ../helpers/check-selection */ "./src/helpers/check-selection.js");

/**
 * Trims text area to suitable height
 * @param {Selection} selection
 */
function trim(selection) {
    for (let node of selection.items) {
        if (SelectionChecker.checkForType(node, 'AreaText')) {
            let oldHeight = node.localBounds.height;
            if (node.clippedByArea) {
                // Need to increase the height
                while (node.clippedByArea) {
                    oldHeight = node.localBounds.height;
                    node.resize(node.localBounds.width, node.localBounds.height * 2);
                }
                // Find correct height with O(log n) time complexity
                node.resize(node.localBounds.width,
                    checkBetween(oldHeight, node.localBounds.height,
                        (height) => {
                            node.resize(node.localBounds.width, height);
                            return node.clippedByArea;
                        }
                    )
                );
            } else {
                // Need to decrease the height
                while (!node.clippedByArea && node.localBounds.height > 0) {
                    oldHeight = node.localBounds.height;
                    node.resize(node.localBounds.width, Math.floor(node.localBounds.height / 2));
                }
                // Find correct height with O(log n) time complexity
                node.resize(node.localBounds.width,
                    checkBetween(node.localBounds.height, oldHeight,
                        (height) => {
                            node.resize(node.localBounds.width, height);
                            return node.clippedByArea;
                        }
                    )
                );
            }
        }
    }
}

/**
 * @param smallerHeight The highest height that was clipped
 * @param biggerHeight The lowest height that wasn't clipped
 * @param {function(height:number): boolean} isClipped
 */
function checkBetween(smallerHeight, biggerHeight, isClipped) {
    debugHelper.log('Checking between ', smallerHeight, ' and ', biggerHeight);

    if (Math.abs(smallerHeight - biggerHeight) < 2)
        return biggerHeight;

    let half = Math.floor((smallerHeight + biggerHeight) / 2);

    return !isClipped(half) ? checkBetween(smallerHeight, half, isClipped) : checkBetween(half, biggerHeight, isClipped);
}

module.exports = trim;

/***/ }),

/***/ "./src/helpers/analytics.js":
/*!**********************************!*\
  !*** ./src/helpers/analytics.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const storage = __webpack_require__(/*! xd-storage-helper */ "./node_modules/xd-storage-helper/storage-helper.js");
let analyticsModal = null;


class analyticsHelper {
    static async send(feature, options) {
        let req = new XMLHttpRequest();
        req.open('POST', 'https://xdplugins.pabloklaschka.de/_api/submit');
        req.send(JSON.stringify({
            plugin_name: 'Lorem Ipsum',
            feature: feature,
            options: options
        }));
    }

    /**
     * Verifies that the user has accepted the privacy policy.
     * @param passedOptions
     * @param {string} passedOptions.pluginName
     * @param {string} passedOptions.privacyPolicyLink
     * @param {string} passedOptions.color
     * @return {Promise<boolean>}
     */
    static async verifyAcceptance(passedOptions) {
        if (await storage.get('analytics-accepted', false)) {
            return true;
        } else {
            let options = {
                pluginName: 'My plugin',
                privacyPolicyLink: 'https://www.mysite.com/privacy',
                color: '#2D4E64',
            };
            Object.assign(options, passedOptions);

            if (await this.dialog(options)) {
                await storage.set('analytics-accepted', true);
                return true;
            } else {
                throw new Error('Privacy policy wasn\'t accepted');
            }
        }
    }


    /**
     * @private
     * @param {object} options
     * @param {string} options.pluginName
     * @param {string} options.privacyPolicyLink
     * @param {string} options.color
     * @return {Promise<boolean>}
     */
    static async dialog(options) {

        if (!analyticsModal) {
            analyticsModal = document.createElement("dialog");
            analyticsModal.innerHTML = `
<style>
    header {
        background: ${options.color};
        height: 16px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
    }
    
    main {
        overflow-y: auto;
    }

    form {
        width: 640px;
        overflow-y: auto;
    }
    h1 {
        align-items: center;
        justify-content: space-between;
        display: flex;
        flex-direction: row;
    }
    
    input {
    width: 18px;
    }
    
    input[type="checkbox"] {
    width: 18px;
    }
</style>
<form method="dialog">
    <header></header>
    <main>
    <h1>
        <span>Analytics</span>
    </h1>
    <hr />
    <p>To enhance your experience when using the plugin, completely anonymous data regarding your usage will get submitted to (secure) servers in Germany. The submitted data doesn't include any user id or similar means of identifying specific users. Since data gets submitted to our servers in the form of HTTP requests, you'll have to accept the privacy policy <a href="${options.privacyPolicyLink}">${options.privacyPolicyLink}</a>to use the plugin.
</p>
<h2>Data that gets submitted:</h2>
<p>Data that's technically required to perform an HTTP request, a timestamp (current date and time), the plugin that gets used (i.e. ${options.pluginName}), the feature that gets used (e.g., which menu item selected) and the options that get used (e.g., categorical settings you set in dialogs).
</p>
<h2>Data that explicitly won't get submitted:</h2>
<p>Any data identifying you (e.g., user ids or similar), any data regarding your document, files on your computer or similar, any data that I didn't list above in "Data that gets submitted"
</p>
    <label style="flex-direction: row; align-items: center;">
        <input type="checkbox" /><span>I have read and accepted the privacy policy (${options.privacyPolicyLink})</span>
    </label>
    </main>
    <footer>
        <button id="cancel" uxp-variant="primary">Cancel</button>
        <button id="ok" type="submit" uxp-variant="cta">Accept</button>
    </footer>
</form>
        `;
        }

        document.querySelector('body').appendChild(analyticsModal);

        let form = document.querySelector('form');

        function onsubmit() {
            analyticsModal.close("ok");
        }

        form.onsubmit = onsubmit;

        const cancelButton = document.querySelector("#cancel");
        cancelButton.addEventListener("click", () => analyticsModal.close("reasonCanceled"));

        const okButton = document.querySelector("#ok");
        okButton.disabled = true;
        okButton.addEventListener("click", e => {
            onsubmit();
            e.preventDefault();
        });

        const checkbox = document.querySelector('input');
        checkbox.checked = false;
        checkbox.addEventListener('change', e => {
            console.log('checkbox: ', e.target.checked);
            okButton.disabled = !e.target.checked;
        });


        Object.assign(document.querySelector('label').style, {flexDirection: "row", alignItems: "center"});

        const pseudo = document.createElement('div');
        pseudo.appendChild(checkBox('Test', false));

        console.log(pseudo.innerHTML);

        return (await analyticsModal.showModal()) === 'ok';
    }
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


module.exports = analyticsHelper;


/***/ }),

/***/ "./src/helpers/check-selection.js":
/*!****************************************!*\
  !*** ./src/helpers/check-selection.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

class SelectionChecker {
    /**
     * Creates a new selection checker to check types of the selection
     * @param {Selection} selection The selection passed into the main funciton
     */
    constructor(selection) {
        this.selection = selection;
    }

    /**
     * Checks if selection contains one or more of the specified SceneNode `types`
     * @param {...string} types The SceneNode types
     * @returns {boolean} `true` if the selection contains one or more of the specified SceneNode `types`
     */
    oneOrMore(...types) {
        return this.count.apply(this, types) > 0;
    }

    /**
     * Checks if selection contains `n` or more of the specified SceneNode `types`
     * @param {...string} types The SceneNode types
     * @param  {number} n The minimum number of occurances in selection
     * @returns {boolean} `true` if the selection contains `n` or more of the specified SceneNode `types`
     */
    nOrMore(n, ...types) {
        return this.count.apply(this, types) >= n;
    }

    /**
     * Checks if selection contains `n` or less of the specified SceneNode `types`
     * @param {...string} types The SceneNode types
     * @param  {number} n The maximum number of occurances in selection
     * @returns {boolean} `true` if the selection contains `n` or less of the specified SceneNode `types`
     */
    nOrLess(n, ...types) {
        return this.count.apply(this, types) <= n;
    }

    /**
     * Checks if selection contains exactly `n` occurances of the specified SceneNode `types`
     * @param {...string} types The SceneNode types
     * @param  {number} n The desired number of occurances in selection
     * @returns {boolean} `true` if the selection contains exactly `n` occurances of the specified SceneNode `types`
     */
    exactlyN(n, ...types) {
        return this.count.apply(this, types) <= n;
    }

    /**
     * Checks if selection contains exactly one occurance of an element of the specified SceneNode `types`
     * @param {...string} types The SceneNode types
     * @returns {boolean} `true` if the selection contains exactly one occurance of an element of the specified SceneNode `types`
     */
    exactlyOne(...types) {
        return this.count.apply(this, types) === 1;
    }

    /**
     * Checks if selection contains no occurances of any of the specified SceneNode `types`
     * @param {...string} types The SceneNode types
     * @returns {boolean} `true` if the selection contains no occurances of any of the specified SceneNode `types`
     */
    no(...types) {
        return this.count.apply(this, types) < 1;
    }

    /**
     * Counts the number of occurences of the scecified types
     * @returns {number} The number of elements of the specified types
     * @param {...string} types the SceneNode types
     */
    count(...types) {
        return this.selection.items.reduce((previousValue, currentValue) => {
            let isOfOneOfTypes = false;
            for (let type of types) {
                if (SelectionChecker.checkForType(currentValue, type)) {
                    isOfOneOfTypes = true;
                    break;
                }
            }
            return previousValue + isOfOneOfTypes ? 1 : 0;
        }, 0);
    }

    /**
     * Checks if `node` matches type (specified as `string`)
     * @param {SceneNode} node
     * @param {string} type
     * @returns {boolean} `true` if `node` matches specified ``type`
     */
    static checkForType(node, type) {
        const typeCheckLookupTable = {
            'Text': (node) => {
                const {Text} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Text;
            },
            'AreaText': (node) => {
                const {Text} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Text && node.areaBox;
            },
            'PointText': (node) => {
                const {Text} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Text && node.areaBox === null;
            },
            'Rectangle': (node) => {
                const {Rectangle} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Rectangle;
            },
            'Artboard': (node) => {
                const {Artboard} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Artboard;
            },
            'Group': (node) => {
                const {Group} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Group;
            },
            'BooleanGroup': (node) => {
                const {BooleanGroup} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof BooleanGroup;
            },
            'Ellipse': (node) => {
                const {Ellipse} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Ellipse;
            },
            'GraphicsNode': (node) => {
                const {GraphicsNode} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof GraphicsNode;
            },
            'Line': (node) => {
                const {Line} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Line;
            },
            'LinkedGraphic': (node) => {
                const {LinkedGraphic} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof LinkedGraphic;
            },
            'Path': (node) => {
                const {Path} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof Path;
            },
            'RepeatGrid': (node) => {
                const {RepeatGrid} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof RepeatGrid;
            },
            'RootNode': (node) => {
                const {RootNode} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof RootNode;
            },
            'SceneNode': (node) => {
                const {SceneNode} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof SceneNode;
            },
            'SymbolInstance': (node) => {
                const {SymbolInstance} = __webpack_require__(/*! scenegraph */ "scenegraph");
                return node instanceof SymbolInstance;
            },
        };
        return (typeCheckLookupTable[type]) ? typeCheckLookupTable[type](node) : false;
    }
}

module.exports = SelectionChecker;

/***/ }),

/***/ "./src/helpers/debug.js":
/*!******************************!*\
  !*** ./src/helpers/debug.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

class debugHelper {
    static shouldDebug() {
        return false;
    }

    /**
     * Logs elements to console
     * @param {*} objects Logged objects
     */
    static log(...objects) {
        if (debugHelper.shouldDebug()) {
            objects.unshift('Lorem Ipsum Plugin: ');
            const args = Array.prototype.slice.call(objects.map(value => value instanceof Object ? JSON.stringify(value) : value));
            console.log.apply(console, args);
        }
    }
}


module.exports = debugHelper;

/***/ }),

/***/ "./src/helpers/error.js":
/*!******************************!*\
  !*** ./src/helpers/error.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const dialogHelper = __webpack_require__(/*! xd-dialog-helper */ "./node_modules/xd-dialog-helper/dialog-helper.js");

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


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const errorHelper = __webpack_require__(/*! ./helpers/error */ "./src/helpers/error.js");

const loremModal = __webpack_require__(/*! ./modals/loremModal */ "./src/modals/loremModal.js");
const loremFunction = __webpack_require__(/*! ./functions/lorem */ "./src/functions/lorem.js");
const storage = __webpack_require__(/*! xd-storage-helper */ "./node_modules/xd-storage-helper/storage-helper.js");
const SelectionChekcer = __webpack_require__(/*! ./helpers/check-selection */ "./src/helpers/check-selection.js");

const lang = __webpack_require__(/*! xd-localization-helper */ "./node_modules/xd-localization-helper/localization-helper.js");

async function settings() {
    return await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminate: true,
        includeLineBreaks: true,
        trim: false
    })
}

async function selectionError() {
    return await errorHelper.showErrorDialog(lang.get('error-selection-title'), lang.get('error-selection-description'));
}

/**
 * Initialize all necessary components and check the selection for compatibhility
 * @param {Selection} selection
 * @return {Promise<boolean>} Selection contains text layer?
 */
async function init(selection) {
    await lang.load();
    let checker = new SelectionChekcer(selection);
    return checker.oneOrMore('Text');
}

async function lorem(selection) {
    if (await init(selection))
        await loremModal(selection);
    else
        await selectionError();
}

async function quickLorem(selection) {
    if (await init(selection))
        await loremFunction(selection, await settings());
    else
        await selectionError();
}

async function loremPreconfigured(selection) {
    if (await init(selection))
        await loremFunction(selection, {
            includeLineBreaks: true,
            trim: false,
            terminationString: 'n/a',
            text: 'lorem-lat'
        });
    else
        await selectionError();
}

async function loremPreconfiguredTrim(selection) {
    if (await init(selection))
        await loremFunction(selection, {
            includeLineBreaks: true,
            trim: true,
            terminationString: '.',
            text: 'lorem-lat'
        });
    else
        await selectionError();
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    commands: {
        lorem: lorem,
        quickLorem: quickLorem,
        loremPreconfigured: loremPreconfigured,
        loremPreconfiguredTrim: loremPreconfiguredTrim
    }
};


/***/ }),

/***/ "./src/modals/loremModal.js":
/*!**********************************!*\
  !*** ./src/modals/loremModal.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const storage = __webpack_require__(/*! xd-storage-helper */ "./node_modules/xd-storage-helper/storage-helper.js");
const debugHelper = __webpack_require__(/*! ../helpers/debug */ "./src/helpers/debug.js");
const lang = __webpack_require__(/*! xd-localization-helper */ "./node_modules/xd-localization-helper/localization-helper.js");
const analytics = __webpack_require__(/*! ../helpers/analytics */ "./src/helpers/analytics.js");
const dialogHelper = __webpack_require__(/*! xd-dialog-helper */ "./node_modules/xd-dialog-helper/dialog-helper.js");

/**
 * @param {Selection} selection
 */
async function showModal(selection) {
    await analytics.verifyAcceptance({
        pluginName: 'Lorem Ipsum',
        privacyPolicyLink: 'https://xdplugins.pabloklaschka.de/privacy-policy',
        color: '#2D4E64'
    });
    debugHelper.log('Showing Lorem Ipsum modal');
    let options = await modalAsync(selection);
    const lorem = __webpack_require__(/*! ../functions/lorem */ "./src/functions/lorem.js");
    await lorem(selection, options);
    return true;
}

/**
 * @throws {Error} error when dialog gets canceled
 */
async function modalAsync() {
    const uiOptions = await storage.get('loremOptions', {
        text: 'lorem-lat',
        terminationString: 'n/a',
        includeLineBreaks: true,
        trim: false
    });

    try {
        const loremOptions = await dialogHelper.showDialog('lorem-main', 'Lorem Ipsum', [
                {
                    id: 'description',
                    type: dialogHelper.TEXT,
                    label: lang.get('modal-lorem-description')
                },
                {
                    type: dialogHelper.SELECT,
                    options: [
                        {value: 'lorem-lat', label: 'Lorem Ipsum (Latin, Standard)'},
                        {value: 'cicero-lat', label: 'Cicero (Latin)'},
                        {value: 'cicero-en', label: 'Cicero (English)'},
                        {value: 'pangram-en', label: 'Pangram (English)'},
                        {value: 'pangram-de', label: 'Pangram (German)'},
                        {value: 'pangram-es', label: 'Pangram (Espagnol)'},
                        {value: 'pangram-fr', label: 'Pangram (Français)'}
                    ],
                    id: 'text',
                    label: lang.get('modal-lorem-text-label'),
                    value: uiOptions.text
                },
                {
                    type: dialogHelper.SELECT,
                    id: 'terminationString',
                    label: lang.get('modal-lorem-terminate-label'),
                    options: [
                        {value: 'n/a', label: lang.get('modal-lorem-terminate-none')},
                        {value: '.', label: lang.get('modal-lorem-terminate-period')},
                        {value: '…', label: lang.get('modal-lorem-terminate-ellipsis')},
                    ],
                    value: uiOptions.terminationString
                },
                {
                    type: dialogHelper.CHECKBOX,
                    id: 'includeLineBreaks',
                    label: lang.get('modal-lorem-includeLineBreaks-label'),
                    value: uiOptions.includeLineBreaks
                },
                {
                    type: dialogHelper.CHECKBOX,
                    id: 'trim',
                    label: lang.get('modal-lorem-trim-label'),
                    value: uiOptions.trim
                }
            ],
            {
                okButtonText: lang.get('modal-lorem-btn-ok'),
                cancelButtonText:
                    lang.get('modal-lorem-btn-cancel'),
                width:
                    400,
                css: `
                header {
                    background: #2D4E64;
                    height: 16px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                }
                input[type="checkbox"] {
                    width: 18px;
                }`,
                onBeforeShow:
                    htmlDialogElement => {
                        htmlDialogElement.appendChild(document.createElement('header'));

                        document.getElementById('lorem-main-dialogHelperBtnOk').setAttribute('autofocus', 'autofocus');
                    }
            });
        await storage.set('loremOptions', loremOptions);
        debugHelper.log("Lorem Ipsum");
        return loremOptions;
    } catch (e) {
        throw new Error('User canceled dialog');
    }
}

module.exports = showModal;


/***/ }),

/***/ "application":
/*!******************************!*\
  !*** external "application" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("application");

/***/ }),

/***/ "scenegraph":
/*!*****************************!*\
  !*** external "scenegraph" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("scenegraph");

/***/ }),

/***/ "uxp":
/*!**********************!*\
  !*** external "uxp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uxp");

/***/ })

/******/ });