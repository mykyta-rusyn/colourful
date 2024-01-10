import React from 'react';
import {initReactI18next} from 'react-i18next';
import {Provider} from 'react-redux';

import {languages, translations} from '@colourful/general';
import {Navigator} from '@colourful/navigation';
import {store} from '@colourful/states';
import {preventAutoHideAsync} from 'expo-splash-screen';
import i18n from 'i18next';

preventAutoHideAsync();

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources: translations,
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
	supportedLngs: languages,
});

export default function App(): React.ReactNode {
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	);
}
