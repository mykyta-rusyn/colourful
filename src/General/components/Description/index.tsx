import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {LocalizationKey, useLocal} from '../../localization';
import {useTheme} from '../../theme';

import {styles} from './styles';

type Props = {
	descriptionKey: LocalizationKey
}

export const Description: React.FC<Props> = React.memo((props) => {
	const {activeFont: activeFonts, colors} = useTheme();
	const {t} = useLocal();
	const descriptionStyle = React.useMemo(() => (
		StyleSheet.flatten<TextStyle>([styles.descriptionText, {
			color: colors.textDescription,
			fontFamily: activeFonts.Medium
		}])
	), [activeFonts, colors]);

	return (
		<Text style={descriptionStyle}>
			{t(props.descriptionKey)}
		</Text>
	);
});
