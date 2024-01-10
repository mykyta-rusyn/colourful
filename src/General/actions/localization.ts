import AsyncStorage from '@react-native-async-storage/async-storage';

import {Languages} from '../localization';

const languageKey = 'colourful_app_language';

export async function loadSavedLang(
	callback: (lang: Languages) => Promise<unknown>
): Promise<void> {
	const lang = await AsyncStorage.getItem(languageKey);

	if (lang) {
		await callback(lang as Languages);
	}
}

export async function saveLang(lang: Languages): Promise<void> {
	return await AsyncStorage.setItem(languageKey, lang);
}
