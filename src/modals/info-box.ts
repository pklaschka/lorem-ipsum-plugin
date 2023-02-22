/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { ContentElementType } from 'xd-dialog-helper';
import './info-box.scss';

/**
 * A simple info box that can be used in dialogs
 *
 * Props:
 * - `title: string`: The title of the info box
 * - `label: string`: The text of the info box
 * - `boxType: string`: The type of the info box. Can be one of `info`, `warning`, `error` or `success`
 *
 * @example
 * import { showDialog, types } from 'xd-dialog-helper';
 * import { InfoBox } from 'xd-dialog-helper';
 *
 * await showDialog(
 *   'info-box-example',
 * 	 'Info Box Example',
 * 	 [
 *     {
 * 	     type: InfoBox,
 * 	     title: 'Info Box Title',
 * 	     label: 'This is an info box',
 * 	     boxType: 'info'
 * 	     id: 'info-box'
 * 	   }
 * 	 ]
 * );
 */
export const InfoBox: ContentElementType = {
	type: 'info-box',
	value: () => undefined,
	valid: () => true,
	render: (dialogId, props, actions) => {
		const type = props.boxType || 'info';
		const element = document.createElement('div');
		element.innerHTML = `
			<div class="info-box info-box--${type}" id="${dialogId}__${props.id}">
				<h3 class="info-box__title">${props.title}</h3>
				<div class="info-box__text">${props.label}</div>
			</div>
		`;
		return {
			wrapper: element.children[0] as HTMLElement,
			type: InfoBox,
			props
		};
	}
};
