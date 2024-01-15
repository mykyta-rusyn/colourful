import React from 'react';
import {Image} from 'react-native';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {useImages, useTheme} from '../../hooks';
import {AnimatedTouchableOpacity} from '../Animated';

import {styles} from './sharedStyles';

export const ThemeButton: React.FC = () => {
	const {colors, theme, toggleTheme} = useTheme();
	const {themeImage: image, changeImages} = useImages();

	const onError = React.useCallback(() => {
		changeImages('theme');
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
				source={{uri: image[theme]}}
				style={styles.image}
				tintColor={colors.themeSwitch}
				onError={onError}
			/>
		</AnimatedTouchableOpacity>
	);
};
