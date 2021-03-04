/*
 * Copyright (c) 2021. by Pablo Klaschka
 */

module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2018
	},
	plugins: ['prettier'],
	rules: {
		'no-unused-vars': 0,
		'no-console': 'off',
		'no-undef': 'off'
	}
};
