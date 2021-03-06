/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

const { Text, Rectangle } = require('scenegraph');
const debugHelper = require('../../helpers/debug');
const analytics = require('../../helpers/analytics');
const applyToAreaText = require('./area-text');
const applyToPointText = require('./point-text');
const replaceWithText = require('./replace-with-text');
const showErrorDialog = require('../../helpers/error').showErrorDialog;
const lang = require('xd-localization-helper');

/**
 * Fills text area with placeholder text (e.g., Lorem Ipsum)
 * @param {object} options
 * @param {boolean} options.trim trim text area height to fit contents after inserting text?
 * @param {string} options.terminationString n/a for no termination string
 * @param {boolean} options.includeLineBreaks include line breaks in placeholder text?
 * @param {string} options.text key of the placeholder text
 * @returns {void}
 */
module.exports = function fillSelectionWithPlaceholderText(options) {
	const selection = require('scenegraph').selection;

	debugHelper.log('Lorem ipsum with options ', options);

	// Parse termination string:
	let terminationString =
		options.terminationString === 'n/a' ? '' : options.terminationString;

	try {
		for (let sceneNode of selection.items) {
			if (sceneNode instanceof Rectangle) {
				applyToAreaText(replaceWithText(sceneNode), options, terminationString);
			} else if (
				sceneNode instanceof Text &&
				// @ts-ignore
				sceneNode.layoutBox.type === Text.FIXED_HEIGHT
			) {
				applyToAreaText(sceneNode, options, terminationString);
			} else if (
				sceneNode instanceof Text &&
				// @ts-ignore
				sceneNode.layoutBox.type === Text.POINT
			) {
				applyToPointText(sceneNode, options, terminationString);
			} else if (
				sceneNode instanceof Text &&
				// @ts-ignore
				sceneNode.layoutBox.type === Text.AUTO_HEIGHT
			) {
				// Convert to fixed-height text with same dimensions, apply "normal" procedure, than convert back.

				// @ts-ignore
				sceneNode.layoutBox = {
					width: sceneNode.localBounds.width,
					height: sceneNode.localBounds.height,
					// @ts-ignore
					type: Text.FIXED_HEIGHT
				};
				applyToAreaText(sceneNode, options, terminationString);
				// @ts-ignore
				sceneNode.layoutBox = {
					// @ts-ignore
					type: Text.AUTO_HEIGHT,
					width: sceneNode.localBounds.width
				};
				// applyToAutoHeightText(sceneNode, options, terminationString);
			} else {
				debugHelper.log('Node', sceneNode, 'is not a text layer.');
			}
		}
	} catch (e) {
		showErrorDialog(
			lang.get('error.general.title'),
			lang.get('error.general.description') + '<br>' + e.message
		);
	}

	analytics
		.verifyAcceptance({
			pluginName: 'Lorem Ipsum',
			privacyPolicyLink: 'https://xdplugins.pabloklaschka.de/privacy-policy',
			color: '#2D4E64'
		})
		.then(() => {
			analytics.send('lorem', options);
		});
};
