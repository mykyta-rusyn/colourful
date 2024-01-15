import React from 'react';
import {ImageBackground, View} from 'react-native';

import {BackgroundScreenProps} from '../../ScreenParams';

import {styles} from './styles';

import {Button, Description, ImagePicker, saveBackgroundImage, Theme, useImages, useLocal} from '@colourful/general';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';

export const BackgroundScreen: React.FC<BackgroundScreenProps> = () => {
	const [image, setImage] = React.useState<string>();
	const {changeBackgroundImage} = useImages();
	const {t} = useLocal();

	const pickImage = React.useCallback(async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [Theme.windowSize.width, Theme.windowSize.height],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	}, []);

	const onRemoveImage = React.useCallback(() => setImage(undefined), []);

	const onSaveImage = React.useCallback(async () => {
		await saveBackgroundImage(image!);
		changeBackgroundImage(image!);
		setImage(undefined);
	}, [changeBackgroundImage, image]);

	return (
		<ImageBackground
			source={{uri: image}}
			style={styles.root}
		>
			<ImagePicker
				index={0}
				pickImage={pickImage}
				title={t('background_button')}
			/>			
			<View style={styles.description}>
				<Button
					disabled={image === undefined}
					title={t('icons_save')} 
					onPress={onSaveImage}
				/>
				<Button
					title={t('discard')}
					onPress={onRemoveImage}
				/>
				<Description descriptionKey={'background_description'} />
			</View>
		</ImageBackground>
	);
};
