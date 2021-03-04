/*
 * Copyright (c) 2021. by Pablo Klaschka
 */
const fs = require('fs');
const path = require('path');

describe('Localization', () => {
	it('should contain default translations', () => {
		const exists = fs.existsSync(
			path.join(__dirname, '../dist/lang/default.json')
		);

		expect(exists).toBeTruthy();
	});

	it('should have all language keys in all translations', () => {
		const contents = fs
			.readdirSync(path.join(__dirname, '../dist/lang/'))
			.filter(path => path.endsWith('.json'))
			.map(fileName => {
				return JSON.parse(
					fs
						.readFileSync(path.join(__dirname, '../dist/lang/', fileName))
						.toString()
				);
			});

		for (let content of contents) {
			expect(Object.keys(content)).toStrictEqual(Object.keys(contents[0]));
		}
	});
});
