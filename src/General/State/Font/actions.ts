import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontFamily} from '../../domain';

const fontFamilyKey = 'colourful_app_fontFamily';

export async function saveFontFamily(fontFamily: FontFamily): Promise<void> {
	return await AsyncStorage.setItem(fontFamilyKey, fontFamily);
}

export async function loadFontFamily(): Promise<string | null> {
	return await AsyncStorage.getItem(fontFamilyKey);
}
