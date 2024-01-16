import React from 'react';
import {Image} from 'react-native';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {useImages, useTheme} from '../../hooks';
import {AnimatedTouchableOpacity} from '../Animated';

import {images} from './res';
import {styles} from './sharedStyles';

export const ThemeButton: React.FC = () => {
	const {colors, theme, toggleTheme} = useTheme();
	const {themeImage, changeImages} = useImages();

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
				source={
					themeImage
						? {uri: themeImage[theme]}
						: images[theme]
				}
				style={styles.image}
				tintColor={themeImage ? undefined : colors.themeSwitch}
				onError={onError}
			/>
		</AnimatedTouchableOpacity>
	);
};
