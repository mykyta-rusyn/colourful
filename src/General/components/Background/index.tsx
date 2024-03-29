import React from 'react';
import {StyleSheet} from 'react-native';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {removeBackgroundImage} from '../../actions';
import {useImages, useTheme} from '../../hooks';
import {Theme} from '../../theme';
import {AnimatedImageBackground} from '../Animated';

type Props = {
	onLayout: () => void
}

export const Background: React.FC<
	React.PropsWithChildren<Props>
> = React.memo((props) => {
	const children = React.useMemo(() => props.children, [props.children]);
	const {colors} = useTheme();
	const {backgroundImage, changeBackgroundImage} = useImages();
	const style = React.useMemo(() => (
		StyleSheet.flatten([
			Theme.styles.flex1,
			{backgroundColor: colors.background}
		])
	), [colors.background]);

	const onError = React.useCallback(() => {
		if (backgroundImage === '') {
			return;
		}
		
		changeBackgroundImage();
		removeBackgroundImage();
	}, [backgroundImage, changeBackgroundImage]);

	return (
		<AnimatedImageBackground
			entering={FadeIn}
			exiting={FadeOut}
			source={{uri: backgroundImage}}
			style={style}
			onError={onError}
			onLayout={props.onLayout}
		>
			{children}
		</AnimatedImageBackground>
	);
});