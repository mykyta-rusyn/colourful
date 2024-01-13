import React from 'react';
import {ScrollView, View} from 'react-native';

import {ImagesScreenProp} from '../../ScreenParams';

import {styles} from './styles';

import {Button, Description, ImagePicker, ImageType, LocalizationKey, saveImages, useLocal, useTheme} from '@colourful/general';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';

export const ImagesScreen: React.FC<ImagesScreenProp> = () => {
	const {changeImages} = useTheme();
	const [type, setType] = React.useState<ImageType>('language');
	const anotherType = React.useMemo<ImageType>(() => (
		type === 'language' ? 'theme' : 'language'
	), [type]);
	const iconTypes = React.useMemo<LocalizationKey[]>(() => (
		type === 'language' ? ['en', 'uk'] : ['dark', 'light']
	), [type]);
	const [images, setImagesState] = React.useState<string[]>([]);
	const {t} = useLocal();

	const pickImage = React.useCallback(async (indexToChange: number) => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImagesState((prev) => {
				prev[indexToChange] = result.assets[0].uri;

				return [...prev];
			});
		}
	}, []);

	const onRemoveImages = React.useCallback(() => setImagesState([]), []);

	const toggleType = React.useCallback(() => {
		onRemoveImages();
		setType((prev) => prev === 'language' ? 'theme' : 'language');
	}, [onRemoveImages]);

	const onSaveImages = React.useCallback(async () => {
		await saveImages(images as [string, string], type);
		changeImages(type === 'language' ? {
			localize: {
				en: images[0],
				uk: images[1]
			}
		} : {
			theme: {
				dark: images[0],
				light: images[1]
			}
		});
	}, [images, type, changeImages]);

	return (
		<View style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.pickers}
				showsVerticalScrollIndicator={false}
			>
				<ImagePicker
					image={images[0]}
					index={0}
					pickImage={pickImage}
					title={t('icons', {
						take: t(images[0] !== undefined ? 'retake' : 'take'),
						iconType: t(iconTypes[0]),
						type: t(type)
					})}
				/>

				<ImagePicker
					image={images[1]}
					index={1}
					pickImage={pickImage}
					title={t('icons', {
						take: t(images[1] !== undefined ? 'retake' : 'take'),
						iconType: t(iconTypes[1]),
						type: t(type)
					})}
				/>
			</ScrollView>

			<View style={styles.description}>
				<Button
					disabled={images.length < 2}
					title={t('icons_save')} 
					onPress={onSaveImages}
				/>
				<Button
					title={t('discard')}
					onPress={onRemoveImages}
				/>
				<Button
					title={t(`icons_toggle_${anotherType}`)}
					onPress={toggleType}
				/>
				<Description descriptionKey={`icons_description_${anotherType}`} />
			</View>
		</View>
	);
};
