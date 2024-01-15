import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {useFont, useTheme} from '../../hooks';
import {LocalizationKey, useLocal} from '../../localization';

import {styles} from './styles';

type Props = {
	descriptionKey: LocalizationKey
}

export const Description: React.FC<Props> = React.memo((props) => {
	const {colors} = useTheme();
	const {activeFont} = useFont();
	const {t} = useLocal();
	const descriptionStyle = React.useMemo(() => (
		StyleSheet.flatten<TextStyle>([styles.descriptionText, {
			color: colors.textDescription,
			fontFamily: activeFont.Medium
		}])
	), [activeFont, colors]);

	return (
		<Text style={descriptionStyle}>
			{t(props.descriptionKey)}
		</Text>
	);
});
