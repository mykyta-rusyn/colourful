import React from 'react';
import {ScrollView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {styles} from './styles';

import {Button, Description, ImagePicker, ImageType, LocalizationKey, localize} from '@colourful/general';
import {NavigationParam} from '@colourful/navigation';
import {imageState} from '@colourful/state';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';

type Props = StackScreenProps<NavigationParam, 'Images'>

type State = {
	type: ImageType;
	images: string[]
}

export class ImagesScreen extends React.Component<Props, State> {
	state: Readonly<State> = {
		images: [],
		type: 'localization'
	};

	private readonly _onSaveImages = async () => {
		const {images, type} = this.state;

		if (type === 'localization') {
			await imageState.changeLocalizationImages({
				en: images[0],
				uk: images[1]
			});
		} else {
			await imageState.changeThemeImages({
				dark: images[0],
				light: images[1]
			});
		}

		this._clearImages();
	};

	render(): React.ReactNode {
		const {images, type} = this.state;
		const anotherType = type === 'localization' ? 'theme' : 'localization';
		const iconTypes: LocalizationKey[] = type === 'localization' ? ['en', 'uk'] : ['dark', 'light'];

		return (
			<View style={styles.root}>
				<ScrollView
					contentContainerStyle={styles.pickers}
					showsVerticalScrollIndicator={false}
				>
					<ImagePicker
						image={images[0]}
						index={0}
						pickImage={this._pickImage}
						title={localize('icons', {
							take: localize(images[0] !== undefined ? 'retake' : 'take'),
							iconType: localize(iconTypes[0]),
							type: localize(type)
						})}
					/>
	
					<ImagePicker
						image={images[1]}
						index={1}
						pickImage={this._pickImage}
						title={localize('icons', {
							take: localize(images[1] !== undefined ? 'retake' : 'take'),
							iconType: localize(iconTypes[1]),
							type: localize(type)
						})}
					/>
				</ScrollView>
	
				<View style={styles.description}>
					<Button
						disabled={images.length < 2}
						title={localize('icons_save')} 
						onPress={this._onSaveImages}
					/>
					<Button
						title={localize('discard')}
						onPress={this._clearImages}
					/>
					<Button
						title={localize(`icons_toggle_${anotherType}`)}
						onPress={this._toggleType}
					/>
					<Description descriptionKey={`icons_description_${anotherType}`} />
				</View>
			</View>
		);
	}

	private readonly _pickImage = async (indexToChange: number) => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			const images = this.state.images;

			images[indexToChange] = result.assets[0].uri;
			this.setState({images});
		}
	};

	private readonly _toggleType = () => {
		const type: ImageType = this.state.type === 'localization' ? 'theme' : 'localization';

		this.setState({images: [], type});
	};

	private readonly _clearImages = () => this.setState({images: []});
}
