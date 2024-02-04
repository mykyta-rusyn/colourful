import AsyncStorage from '@react-native-async-storage/async-storage';

import {Languages} from '.';

import {reloadAsync} from 'expo-updates';

const languageKey = 'colourful_app_language';

export async function loadSavedLang(): Promise<Languages> {
	const language = await AsyncStorage.getItem(languageKey);

	return language as Languages ?? 'en';
}

export async function changeLang(lang: Languages): Promise<void> {
	return await AsyncStorage.setItem(languageKey, lang)
		.then(reloadAsync);
}
