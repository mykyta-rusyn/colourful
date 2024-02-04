import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

import {FontWeightName} from '../../domain';

import {styles} from './styles';

import {fontState, themeState} from '@colourful/state';
import {observer} from 'mobx-react-lite';

type Props = {
	backgroundColor?: string;
	disabled?: boolean;
	fontFamily?: FontWeightName;
	textColor?: string;
	title: string;
	onPress?: () => void
}

export const Button: React.FC<Props> = observer((props) => {
	const colors = themeState.colors;

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
		fontFamily: props.fontFamily ?? fontState.font.Regular
	}), [colors.textDescription, props.fontFamily, props.textColor]);

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
