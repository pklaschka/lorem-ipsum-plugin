/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

/**
 * Logs a message (with potentially multiple lines) to the console with a timestamp and emoji prefix.
 * @param emoji The emoji to use as a prefix
 * @param firstLine The first line of the message
 * @param otherLines Any other lines of the message
 */
export function log(emoji, firstLine, ...otherLines) {
	if (emoji.length > 1) {
		throw new Error('Emoji must be a single character');
	}
	const prefix = `(${logTimestamp()}) ${emoji}  `;
	console.log(prefix + `${firstLine}`);
	otherLines.forEach((line) => {
		console.log(' '.repeat(prefix.length) + line);
	});
}

/**
 * Returns the current timestamp in the format HH:mm:ss.SSS
 * @returns {string} The timestamp
 */
function logTimestamp() {
	// a nice formatting that includes the time including milliseconds
	return new Date().toISOString().split('T')[1].replace(/ .+/, '');
}
