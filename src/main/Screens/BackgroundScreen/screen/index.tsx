import React from 'react';
import {ImageBackground, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {styles} from './styles';

import {Button, Description, ImagePicker, localize, Theme} from '@colourful/general';
import {NavigationParam} from '@colourful/navigation';
import {imageState} from '@colourful/state';
import {launchImageLibraryAsync, MediaTypeOptions} from 'expo-image-picker';

type Props = StackScreenProps<NavigationParam, 'Background'>

type State = {
	image: string | undefined
}

export class BackgroundScreen extends React.Component<Props, State> {
	state: Readonly<State> = {
		image: undefined
	};

	private readonly _onPickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [Theme.windowSize.width, Theme.windowSize.height],
			quality: 1,
		});

		if (!result.canceled) {
			this.setState({image: result.assets[0].uri});
		}
	};

	private readonly _onRemoveImage = () => this.setState({image: undefined});

	private readonly _onSaveImage = async () => {
		await imageState.changeBackgroundImage(this.state.image!)
			.then(this._onRemoveImage);
	};

	render(): React.ReactNode {
		return (
			<ImageBackground
				source={{uri: this.state.image}}
				style={styles.root}
			>
				<ImagePicker
					index={0}
					pickImage={this._onPickImage}
					title={localize('background_button')}
				/>			
				<View style={styles.description}>
					<Button
						disabled={this.state.image === undefined}
						title={localize('icons_save')} 
						onPress={this._onSaveImage}
					/>
					<Button
						title={localize('discard')}
						onPress={this._onRemoveImage}
					/>
					<Description descriptionKey={'background_description'} />
				</View>
			</ImageBackground>
		);
	}
}
