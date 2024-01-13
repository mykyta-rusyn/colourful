import AsyncStorage from '@react-native-async-storage/async-storage';

import {ImageType, SavedImages} from '../domain';

const key = 'colourful_images';
const iconsKeys = {
	background: `${key}_background`,
	theme: `${key}_theme`,
	language: `${key}_language`
};

export async function saveImages(
	images: [string, string],
	type: ImageType
): Promise<boolean> {
	const items = JSON.stringify(type === 'language' ? {
		en: images[0],
		uk: images[1]
	} : {
		dark: images[0],
		light: images[1],
	});

	await AsyncStorage.setItem(iconsKeys[type], items);

	return true;
}

export async function removeImages(type: ImageType): Promise<void> {
	return await AsyncStorage.removeItem(iconsKeys[type]);
}

export async function loadImages(
	callback: (images: SavedImages) => void
): Promise<void> {
	const localizeImages = await AsyncStorage.getItem(iconsKeys.language);
	const themeImages = await AsyncStorage.getItem(iconsKeys.theme);

	const images: SavedImages = {};

	if (localizeImages) {
		images.localize = JSON.parse(localizeImages);
	}

	if (themeImages) {
		images.theme = JSON.parse(themeImages);
	}

	callback(images);
}

export async function saveBackgroundImage(image: string): Promise<boolean> {
	await AsyncStorage.setItem(iconsKeys.background, image);

	return true;
}

export async function removeBackgroundImage(): Promise<void> {
	return await AsyncStorage.removeItem(iconsKeys.background);
}

export async function loadBackgroundImage(
	callback: (image: string) => void
): Promise<void> {
	const image = await AsyncStorage.getItem(iconsKeys.background);

	if (image) {
		callback(image);
	}
}
