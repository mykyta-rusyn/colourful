import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import {styles, useTheme} from '../../theme';

type Props = {
	onLayout: () => void
}

export const Background: React.FC<
	React.PropsWithChildren<Props>
> = React.memo((props) => {
	const children = React.useMemo(() => props.children, [props.children]);
	const {backgroundImage, colors} = useTheme();
	const style = React.useMemo(() => (
		StyleSheet.flatten([
			styles.flex1,
			{backgroundColor: colors.background}
		])
	), [colors.background]);

	if (backgroundImage !== undefined) {
		return (
			<ImageBackground
				source={{uri: backgroundImage}}
				style={style}
				onLayout={props.onLayout}
			>
				{children}
			</ImageBackground>
		);
	}

	return (
		<View
			style={style}
			onLayout={props.onLayout}
		>
			{children}
		</View>
	);
});