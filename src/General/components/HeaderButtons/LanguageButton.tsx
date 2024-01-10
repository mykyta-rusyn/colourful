import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {saveLang} from '../../actions';
import {useLocal} from '../../localization';
import {useTheme} from '../../theme';

import {images} from './res';
import {styles} from './sharedStyles';

import {globalState, useAppSelector} from '@colourful/states';

export const LanguageButton: React.FC = () => {
	const {currentLang, changeLanguage} = useLocal();
	const {colors} = useTheme();
	const image = useAppSelector(globalState.selectors.localizationImage);
	const isEng = currentLang === 'en';
	const selectedImage
		= isEng
			? image
				? {uri: image.en}
				: images.en
			: image
				? {uri: image.uk}
				: images.uk;

	const toggleLanguage = React.useCallback(() => {
		const newLanguage = isEng ? 'uk' : 'en';

		changeLanguage(newLanguage);
		saveLang(newLanguage);
	}, [changeLanguage, isEng]);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={toggleLanguage}
		>
			<Image
				source={selectedImage}
				style={styles.image}
				tintColor={colors.languageSwitch ?? undefined}
			/>
		</TouchableOpacity>
	);
};
