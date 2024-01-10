import React from 'react';
import {View} from 'react-native';

import {ColorsScreenProps} from '../../ScreenParams';

import {styles} from './styles';

import {Button, ChangeColor, ColorModal, Description, ThemeColors, ThemeColorsKey, useLocal, useTheme} from '@colourful/general';

export const ColorsScreen: React.FC<ColorsScreenProps> = ({}) => {
	const {colors, theme, changeColor} = useTheme();
	const {t} = useLocal();
	const [selectedColor, setSelectedcolor] = React.useState<ChangeColor>();

	const onUpdateColor = React.useCallback((color: string) => {
		changeColor({color, key: selectedColor!.key});
		setSelectedcolor(undefined);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedColor]);

	return (
		<View style={styles.root}>
			<ColorModal
				initialColor={selectedColor?.color}
				onSave={onUpdateColor} 
			/>
			<View style={styles.colorButtons}>
				{Object.keys(colors).map((key) => {
					return (
						<Button
							key={key}
							title={t('colors', {
								key: t(key as keyof ThemeColors),
								theme: t(theme)
							})}
							onPress={() => {
								setSelectedcolor({
									color: colors[key as ThemeColorsKey]!,
									key: key as ThemeColorsKey
								});
							}}
						/>
					);
				})}
			</View>
			<Description descriptionKey='colors_description' />
		</View>
	);
};
