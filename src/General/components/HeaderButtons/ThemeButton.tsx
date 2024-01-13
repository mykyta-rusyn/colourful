import React from 'react';
import {Image} from 'react-native';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {removeImages} from '../../actions';
import {useTheme} from '../../theme';
import {AnimatedTouchableOpacity} from '../Animated';

import {images} from './res';
import {styles} from './sharedStyles';

import {globalState, useAppSelector} from '@colourful/states';

export const ThemeButton: React.FC = () => {
	const {colors, theme, toggleTheme, changeImages} = useTheme();
	const image = useAppSelector(globalState.selectors.themeImage);
	const isDark = theme === 'dark';
	const selectedImage
		= isDark
			? image
				? {uri: image.dark}
				: images.dark
			: image
				? {uri: image.light}
				: images.light;

	const onError = React.useCallback(() => {
		changeImages();
		removeImages('theme');
	}, [changeImages]);

	return (
		<AnimatedTouchableOpacity
			activeOpacity={0.7}
			entering={FadeIn}
			exiting={FadeOut}
			key={theme}
			onPress={toggleTheme}
		>
			<Image
				source={selectedImage}
				style={styles.image}
				tintColor={colors.themeSwitch}
				onError={onError}
			/>
		</AnimatedTouchableOpacity>
	);
};
