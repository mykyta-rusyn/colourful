import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Animated, {FadeInDown, FadeInUp, FadeOutDown, FadeOutUp} from 'react-native-reanimated';

import {useTheme} from '../../theme';

import {images} from './res';
import {styles} from './sharedStyles';

import {globalState, useAppSelector} from '@colourful/states';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ThemeButton: React.FC = () => {
	const {colors, theme, toggleTheme} = useTheme();
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

	return (
		<AnimatedTouchableOpacity
			activeOpacity={0.7}
			entering={isDark ? FadeInDown : FadeInUp}
			exiting={isDark ? FadeOutDown : FadeOutUp}
			key={theme}
			onPress={toggleTheme}
		>
			<Image
				source={selectedImage}
				style={styles.image}
				tintColor={colors.themeSwitch}
			/>
		</AnimatedTouchableOpacity>
	);
};
