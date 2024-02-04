import AsyncStorage from '@react-native-async-storage/async-storage';

import {ImageType, LocalizationImage, SavedImages, ThemeImage} from '../../domain';

const key = 'colourful_app_images';
const imagesKeys = {
	background: `${key}_background`,
	theme: `${key}_theme`,
	localization: `${key}_localization`
};

export async function saveLocalizationImages(images: LocalizationImage): Promise<void> {
	return await AsyncStorage.setItem(imagesKeys.localization, JSON.stringify(images));
}

export async function saveThemeImages(images: ThemeImage): Promise<void> {
	return await AsyncStorage.setItem(imagesKeys.theme, JSON.stringify(images));
}

export async function removeImages(type?: ImageType): Promise<unknown> {
	if (!type) {
		return await Promise.all([
			AsyncStorage.removeItem(imagesKeys.localization),
			AsyncStorage.removeItem(imagesKeys.theme),
		]);
	} else {
		return await AsyncStorage.removeItem(imagesKeys[type]);
	}
}

export async function loadImages(): Promise<Partial<SavedImages>> {
	const images = await Promise.all([
		AsyncStorage.getItem(imagesKeys.localization),
		AsyncStorage.getItem(imagesKeys.theme)
	]);

	return {
		localizationImage: images[0] !== null
			?	JSON.parse(images[0])
			: undefined,
		themeImage: images[1] !== null
			? JSON.parse(images[1])
			: undefined
	};
}

export async function saveBackgroundImage(image: string): Promise<void> {
	return await AsyncStorage.setItem(imagesKeys.background, image);
}

export async function removeBackgroundImage(): Promise<void> {
	return await AsyncStorage.removeItem(imagesKeys.background);
}

export async function loadBackgroundImage(): Promise<string | null> {
	return await AsyncStorage.getItem(imagesKeys.background);
}
