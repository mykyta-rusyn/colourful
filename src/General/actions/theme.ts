import AsyncStorage from '@react-native-async-storage/async-storage';

import {ThemeType} from '../domain';

const themeKey = 'colourful_app_theme';

export async function saveTheme(theme: ThemeType): Promise<void> {
	return await AsyncStorage.setItem(themeKey, theme);
}

export async function loadTheme(
	callback: (theme: ThemeType) => void
): Promise<void> {
	const theme = await AsyncStorage.getItem(themeKey);

	if (theme) {
		callback(theme as ThemeType);
	}
}
