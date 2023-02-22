/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

/**
 * Performs a binary search for the number n that's closest to the clipping number without clipping.
 *
 * n must be between clippingNumber and notClippingNumber
 *
 * Runs in O(log n), where n=abs(clippingNumber-notClippingNumber)
 *
 * @param clippingNumber a number of which it is known that it clips
 * @param notClippingNumber a number of which it is known that it doesn't clip
 * @param isClipping callback for checking whether a number n clips
 * @returns number n that's closest to the clipping number without clipping.
 */
export function binaryLengthSearch(
	clippingNumber: number,
	notClippingNumber: number,
	isClipping: (n: number) => boolean
): number {
	if (Math.abs(clippingNumber - notClippingNumber) < 2)
		return notClippingNumber;

	let half = Math.floor((clippingNumber + notClippingNumber) / 2);

	return isClipping(half)
		? binaryLengthSearch(half, notClippingNumber, isClipping)
		: binaryLengthSearch(clippingNumber, half, isClipping);
}
