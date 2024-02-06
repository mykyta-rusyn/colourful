import {Fonts, FontToLoad} from '@colourful/general';
import {loadAsync} from 'expo-font';

const fontsToLoad: FontToLoad = {
	Oswald: {
		'Oswald-Bold': require('./Oswald/Oswald-Bold.ttf'),
		'Oswald-Light': require('./Oswald/Oswald-Light.ttf'),
		'Oswald-Medium': require('./Oswald/Oswald-Medium.ttf'),
		'Oswald-Regular': require('./Oswald/Oswald-Regular.ttf')
	},
	Roboto: {
		'Roboto-Bold': require('./Roboto/Roboto-Bold.ttf'),
		'Roboto-Light': require('./Roboto/Roboto-Light.ttf'),
		'Roboto-Medium': require('./Roboto/Roboto-Medium.ttf'),
		'Roboto-Regular': require('./Roboto/Roboto-Regular.ttf')
	}
};

export async function loadFonts(): Promise<[void, void]> {
	return await Promise.all([
		loadAsync(fontsToLoad.Oswald),
		loadAsync(fontsToLoad.Roboto),
	]);
}

export const availableFonts: Fonts = {
	Oswald: {
		Bold: 'Oswald-Bold',
		Light: 'Oswald-Light',
		Medium: 'Oswald-Medium',
		Regular: 'Oswald-Regular'
	},
	Roboto: {
		Bold: 'Roboto-Bold',
		Light: 'Roboto-Light',
		Medium: 'Roboto-Medium',
		Regular: 'Roboto-Regular'
	}
};
