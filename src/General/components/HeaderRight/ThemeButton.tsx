import React from 'react';
import {Image} from 'react-native';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {observer} from '../../utils';
import {AnimatedTouchableOpacity} from '../Animated';

import {defaultImages} from './res';
import {styles} from './sharedStyles';

import {imageState, themeState} from '@colourful/state';

export const ThemeButton: React.FC = observer(() => {
	const theme = themeState.theme;
	const themeImages = imageState.themeImages;

	return (
		<AnimatedTouchableOpacity
			activeOpacity={0.7}
			entering={FadeIn}
			exiting={FadeOut}
			key={theme}
			onPress={() => themeState.toggleTheme()}
		>
			<Image
				source={
					themeImages !== undefined
						? {uri: themeImages[theme]}
						: defaultImages[theme]
				}
				style={styles.image}
				tintColor={themeImages ? undefined : themeState.colors.themeSwitch}
				onError={() => imageState.changeThemeImages()}
			/>
		</AnimatedTouchableOpacity>
	);
});
