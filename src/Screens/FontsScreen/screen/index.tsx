import React from 'react';
import {View} from 'react-native';

import {FontsScreenProps} from '../../ScreenParams';

import {styles} from './styles';

import {Button, Description, Theme, useFont, useLocal} from '@colourful/general';

export const FontsScreen: React.FC<FontsScreenProps> = () => {
	const {fontFamily, toggleFontFamily} = useFont();
	const {t} = useLocal();

	const Fonts = React.useCallback(() => (
		Object.keys(Theme.fonts).map((family) => (
			<View key={family} style={styles.family}>
				{Object.values(
					Theme.fonts[family as keyof typeof Theme.fonts]
				).map((font) => (
					<Button
						backgroundColor={
							family === fontFamily
								? '#FF000030'
								: undefined
						}
						fontFamily={font}
						key={font}
						title={font}
					/>
				))}
			</View>
		))
	), [fontFamily]);

	return (
		<View style={styles.root}>
			<View style={styles.fontsRoot}>
				<Fonts />
			</View>
			<Button
				backgroundColor={'#00FF0070'}
				title={t('fonts_toggle')}
				onPress={toggleFontFamily}
			/>
			<Description descriptionKey='fonts_description' />
		</View>
	);
};
