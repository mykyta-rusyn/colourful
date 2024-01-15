import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

import {FontWeightName} from '../../domain';
import {useFont, useTheme} from '../../hooks';

import {styles} from './styles';

type Props = {
	backgroundColor?: string;
	disabled?: boolean;
	fontFamily?: FontWeightName;
	textColor?: string;
	title: string;
	onPress?: () => void
}

export const Button: React.FC<Props> = React.memo((props) => {
	const {colors} = useTheme();
	const {activeFont} = useFont();

	const rootStyle = React.useMemo(() => {
		return StyleSheet.flatten<ViewStyle>([styles.root, {
			backgroundColor: props.backgroundColor ?? colors.backgroundButton,
			borderColor: colors.border,
			opacity: props.disabled ? 0.3 : undefined
		}]);
	}, [colors, props.backgroundColor, props.disabled]);

	const textStyle = React.useMemo<TextStyle>(() => ({
		flexWrap: 'wrap',
		width: '100%',
		textAlign: 'center',
		color: props.textColor ?? colors.textDescription,
		fontFamily: props.fontFamily ?? activeFont.Regular
	}), [activeFont, colors, props.fontFamily, props.textColor]);

	return (
		<TouchableOpacity 
			activeOpacity={0.7}
			disabled={props.disabled}
			style={rootStyle}
			onPress={props.onPress}
		>
			<Text style={textStyle}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
});
