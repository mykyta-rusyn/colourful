import React from 'react';
import {View} from 'react-native';

import {HomeScreenProps} from '../../ScreenParams';

import {styles} from './styles';

import {Button, clearStorage, useFont, useImages, useLocal, useTheme} from '@colourful/general';

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
	const {t} = useLocal();
	const {changeColor} = useTheme();
	const {changeBackgroundImage, changeImages} = useImages();
	const {setFontFamily} = useFont();

	function goToColors() {
		navigation.navigate('ColorsScreen');
	}

	function goToIcons() {
		navigation.navigate('ImagesScreen');
	}

	function goToFonts() {
		navigation.navigate('FontsScreen');
	}

	function goToBackground() {
		navigation.navigate('BackgroundScreen');
	}

	async function removeData() {
		await clearStorage();
		changeImages();
		changeColor();
		changeBackgroundImage();
		setFontFamily();
	}

	return (
		<View style={styles.root}>
			<View style={styles.navigation}>
				<Button
					title={t('home_colors')}
					onPress={goToColors}
				/>
				<Button
					title={t('home_icons')}
					onPress={goToIcons}
				/>
				<Button
					title={t('home_fonts')}
					onPress={goToFonts}
				/>
				<Button
					title={t('home_background')}
					onPress={goToBackground}
				/>
			</View>
			<Button
				title={t('home_discard')}
				onPress={removeData} 
			/>
		</View>
	);
};
