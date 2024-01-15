import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontFamily} from '../domain';

const fontFamilyKey = 'colourful_app_fontFamily';

export async function saveFontFamily(fontFamily: FontFamily): Promise<void> {
	return await AsyncStorage.setItem(fontFamilyKey, fontFamily);
}

export async function loadSavedFontFamily(
	callback: (fontFamily: FontFamily) => void
): Promise<void> {
	const fontFamily = await AsyncStorage.getItem(fontFamilyKey);

	if (fontFamily) {
		callback(fontFamily as FontFamily);
	}
}
