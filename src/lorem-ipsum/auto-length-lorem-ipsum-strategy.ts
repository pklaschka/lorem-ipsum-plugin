/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

import { ApplyLoremIpsumStrategy } from './apply-lorem-ipsum-strategy';
import { SceneNode } from 'scenegraph';
import { LoremIpsumOptions } from '../model/lorem-ipsum-options';
import { AutoAreaTextLoremIpsumStrategy } from './auto-area-text-lorem-ipsum-strategy';
import { FixedAreaTextLoremIpsumStrategy } from './fixed-area-text-lorem-ipsum-strategy';
import { PointTextLoremIpsumStrategy } from './point-text-lorem-ipsum-strategy';
import { UnknownLoremIpsumStrategy } from './unknown-lorem-ipsum-strategy';
import { GraphicNodeLoremIpsumStrategy } from './graphic-node-lorem-ipsum-strategy';

export class AutoLengthLoremIpsumStrategy implements ApplyLoremIpsumStrategy {
	constructor(private node: SceneNode) {}

	async apply(options: LoremIpsumOptions) {
		return this.promisify(() => new AutoAreaTextLoremIpsumStrategy(this.node))
			.catch(() => new FixedAreaTextLoremIpsumStrategy(this.node))
			.catch(() => new PointTextLoremIpsumStrategy(this.node))
			.catch(() => new GraphicNodeLoremIpsumStrategy(this.node))
			.catch(() => new UnknownLoremIpsumStrategy())
			.then(strategy => strategy.apply(options));
	}

	/**
	 * Converts a synchronous function to an asynchronous one
	 */
	private async promisify<T>(fn: () => T): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			try {
				resolve(fn());
			} catch (e) {
				reject(e);
			}
		});
	}
}
