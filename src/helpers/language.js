/*
 * Copyright (c) 2019. by Pablo Klaschka
 */

const app = require('application');

class LanguageHelper {
    /**
     * @private
     * @type {{"error-selection-title": {default: string, de: string}, "error-selection-description": {default: string, de: string}, "modal-lorem-description": {default: string, de: string}, "modal-lorem-text-label": {default: string, de: string}, "modal-lorem-terminate-label": {default: string, de: string}, "modal-lorem-includeLineBreaks-label": {default: string, de: string}, "modal-lorem-trim-label": {default: string, de: string}, "modal-lorem-btn-ok": {default: string, de: string}, "modal-lorem-btn-cancel": {default: string, de: string}}}
     */
    static strings() {
        return {
            "error-selection-title": {
                "default": "No text selected",
                "de": "Kein Text ausgewählt"
            },
            "error-selection-description": {
                "default": "Please include at least one text node in your selection and try again.",
                "de": "Bitte wählen Sie mind. ein Textelement aus und versuchen Sie es nochmal."
            },
            "modal-lorem-description": {
                "default": "Fills selected text element(s) with placeholder text.",
                "de": "Füllt das bzw. die ausgewählte(n) Textelement(e) mit Platzhaltertext."
            },
            "modal-lorem-text-label": {
                "default": "Placeholder text:",
                "de": "Platzhaltertext:"
            },

            "modal-lorem-terminate-label": {
                "default": "End with punctuation mark:",
                "de": "Text mit Satzzeichen abschließen:"
            },
            "modal-lorem-terminate-none": {
                "default": "None",
                "de": "Kein Zeichen"
            },
            "modal-lorem-terminate-period": {
                "default": "Period ('.')",
                "de": "Punkt ('.')"
            },
            "modal-lorem-terminate-ellipsis": {
                "default": "Ellipsis ('…')",
                "de": "Auslassungspunkte ('…')"
            },

            "modal-lorem-includeLineBreaks-label": {
                "default": "Include line breaks",
                "de": "Zeilenumbrüche generieren"
            },
            "modal-lorem-trim-label": {
                "default": "Trim text area height to fit inserted text",
                "de": "Höhe dem eingefügten Text genau anpassen"
            },
            "modal-lorem-btn-ok": {
                "default": "Insert text",
                "de": "Text einfügen"
            },
            "modal-lorem-btn-cancel": {
                "default": "Cancel",
                "de": "Abbrechen"
            }
        };
    }

    /**
     * The app language
     * @type {string}
     * @private
     */
    static lang() {
        return app.appLanguage
    };

    /**
     *
     * @param {string} key The key of the translated string
     * @return {*|string} The translated string or – if not available – the default value.
     * @throws {Error} if the `key` was not found
     */
    static getString(key) {
        if (Object.keys(LanguageHelper.strings()).includes(key)) {
            const translationObject = LanguageHelper.strings()[key];
            return translationObject[LanguageHelper.lang()] || translationObject.default;
        } else {
            throw new Error('Translation for "' + key + '" was not defined.')
        }
    }
}

module.exports = LanguageHelper;