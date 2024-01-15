import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {saveLang} from '../../actions';
import {useImages, useTheme} from '../../hooks';
import {useLocal} from '../../localization';

import {styles} from './sharedStyles';

export const LanguageButton: React.FC = () => {
	const {currentLang, changeLanguage} = useLocal();
	const {colors} = useTheme();
	const {localizationImage: image, changeImages} = useImages();

	const toggleLanguage = React.useCallback(() => {
		const newLanguage = currentLang === 'en' ? 'uk' : 'en';

		changeLanguage(newLanguage);
		saveLang(newLanguage);
	}, [changeLanguage, currentLang]);

	const onError = React.useCallback(() => {
		changeImages('language');
	}, [changeImages]);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={toggleLanguage}
		>
			<Image
				source={{uri: image[currentLang]}}
				style={styles.image}
				tintColor={colors.languageSwitch ?? undefined}
				onError={onError}
			/>
		</TouchableOpacity>
	);
};
