import AsyncStorage from '@react-native-async-storage/async-storage';

import {ImageType, SavedImages} from '../domain';

const key = 'colourful_app_images';
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

export async function removeImages(type?: ImageType): Promise<void[]> {
	const promises: Promise<void>[] = [];

	if (!type) {
		promises.push(
			AsyncStorage.removeItem(iconsKeys.language),
			AsyncStorage.removeItem(iconsKeys.theme),
		);
	} else {
		promises.push(AsyncStorage.removeItem(iconsKeys[type]));
	}

	return await Promise.all(promises);
}

export async function loadImages(
	callback: (images: SavedImages) => void
): Promise<void> {
	const images = await Promise.all([
		AsyncStorage.getItem(iconsKeys.language),
		AsyncStorage.getItem(iconsKeys.theme)
	]);

	if (images[0]) {
		callback({
			flow: 'localize',
			localizationImage: JSON.parse(images[0])
		});
	}

	if (images[1]) {
		callback({
			flow: 'theme',
			themeImage: JSON.parse(images[1])
		});
	}
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
