/*
 * Copyright (c) 2023. by Pablo Klaschka
 */

export function getFileNameCompatibleTimestamp() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}
