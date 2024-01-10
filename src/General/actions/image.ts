import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ImageType, SavedImages} from '../domain';
import {localize} from '../localization';

import {getPermissionsAsync, requestPermissionsAsync, saveToLibraryAsync} from 'expo-media-library';

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
	const permission1 = await getPermissionsAsync();

	if (!permission1.granted) {
		const permission2 = await requestPermissionsAsync();

		if (!permission2.granted) {
			Alert.alert(
				localize('directory_permission_title'),
				localize('directory_permission_description')
			);

			return false;
		}
	}

	await Promise.all([
		saveToLibraryAsync(images[0]),
		saveToLibraryAsync(images[1])
	]);

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
	const permission1 = await getPermissionsAsync();

	if (!permission1.granted) {
		const permission2 = await requestPermissionsAsync();

		if (!permission2.granted) {
			Alert.alert(
				localize('directory_permission_title'),
				localize('directory_permission_description')
			);

			return false;
		}
	}

	await saveToLibraryAsync(image);
	await AsyncStorage.setItem(iconsKeys.background, image);

	return true;
}

export async function loadBackgroundImage(
	callback: (image: string) => void
): Promise<void> {
	const image = await AsyncStorage.getItem(iconsKeys.background);

	if (image) {
		callback(image);
	}
}
