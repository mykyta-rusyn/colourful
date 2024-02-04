import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {LocalizationKey, localize} from '../../localization';

import {styles} from './styles';

import {fontState, themeState} from '@colourful/state';
import {observer} from 'mobx-react-lite';

type Props = {
	descriptionKey: LocalizationKey
}

export const Description: React.FC<Props> = observer((props) => {
	const descriptionStyle = StyleSheet.flatten<TextStyle>([
		styles.descriptionText, {
			color: themeState.colors.textDescription,
			fontFamily: fontState.font.Medium
		}
	]);

	return (
		<Text style={descriptionStyle}>
			{localize(props.descriptionKey)}
		</Text>
	);
});
