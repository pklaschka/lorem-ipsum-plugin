/*
 * Copyright (c) 2018. by Pablo Klaschka
 */

const {Text, Group, SceneNode} = require("scenegraph");
const clipboard = require("clipboard");

/**
 * Copies HTML code for a selection
 * @param {Selection} selection
 * @param {*} options
 * @param {string} options.bold The bold tag template (the bold text gents inserted in the `$` part of the template
 * @param {string} options.italics The italics tag template (the italic text gents inserted in the `$` part of the template
 * @param {boolean} options.layerNameComments Wheter to include layer name comments
 */
function copyHTML(selection, options) {
    let code = "";

    selection.items.forEach(node => {
        code += nodesHTML(node, options);
    });
    console.log(code);
    clipboard.copyText(code);
}

/**
 * Recursive function to retrieve elements HTML
 * @param {SceneNode} node
 * @param {*} options
 * @param {string} options.bold The bold tag template (the bold text gents inserted in the `$` part of the template
 * @param {string} options.italics The italics tag template (the italic text gents inserted in the `$` part of the template
 * @param {string} options.underline The underline tag template (the underline text gents inserted in the `$` part of the template
 * @param {boolean} options.layerNameComments Wheter to include layer name comments
 */
function nodesHTML(node, options) {
    let code = "<!-- " + node.name + " -->\n"; // Prefix node name (useful when multiple elements get selected)
    if (node instanceof Text) {
        code += "<p>"; // Every node begins with a paragraph
        let beginIndex = 0; // index of the beginning of the text
        node.styleRanges.forEach(range => {
            let text = node.text.substr(beginIndex, range.length); // Only use text of current style range

            text = text.split("&").join("&amp;"); // Replace all occurences
            text = text.split("<").join("&lt;"); // Replace all occurences
            text = text.split(">").join("&gt;"); // Replace all occurences
            text = text.split("\n").join("</p>\n<p>"); // Replace all occurences

            if (range.fontStyle === "Bold") {
                let bold = options.bold;
                text = bold.replace('$', text);
            } else if (range.fontStyle === "Italic") {
                let italics = options.italics;
                text = italics.replace('$', text);
            }

            if (range.underline) {
                let underline = options.underline;
                text = underline.replace('$', text);
            }

            code += text; // Text has been converted to html and can be added to code

            beginIndex += range.length;
        });
        code += "</p>\n";
    }
    else if (node instanceof Group) {
        let nodeClass = node.name.replace(/\W/g, '_');
        code += `<div class="${nodeClass}">`;
        node.children.forEach(sceneNode =>
            code += nodesHTML(sceneNode, options)
        );
        code += '</div>';
    }
    code += "<!-- " + node.name + " -->\n"; // Prefix node name (useful when multiple elements get selected)
    return code;
}

module.exports = copyHTML;