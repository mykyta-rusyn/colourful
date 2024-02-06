import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {changeLang, Languages} from '../../localization';
import {observer} from '../../utils';

import {defaultImages} from './res';
import {styles} from './sharedStyles';

import {imageState, themeState} from '@colourful/state';
import i18next from 'i18next';

export const LanguageButton: React.FC = observer(() => {
	const language = i18next.language as Languages;
	const localizationImages = imageState.localizationImages;

	const toggleLanguage = React.useCallback(() => {
		const newLanguage = language === 'en' ? 'uk' : 'en';

		changeLang(newLanguage);
	}, [language]);

	const onError = React.useCallback(() => {
		imageState.changeLocalizationImages();
	}, []);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={toggleLanguage}
		>
			<Image
				source={
					localizationImages
						? {uri: localizationImages[language]}
						: defaultImages[language]
				}
				style={styles.image}
				tintColor={
					localizationImages
						? undefined
						: themeState.colors.languageSwitch ?? undefined
				}
				onError={onError}
			/>
		</TouchableOpacity>
	);
});
