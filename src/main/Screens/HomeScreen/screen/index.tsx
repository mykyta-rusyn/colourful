import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {clearStorage} from '../actions';

import {styles} from './styles';

import {Button, localize} from '@colourful/general';
import {NavigationParam} from '@colourful/navigation';
import {fontState, imageState, themeState} from '@colourful/state';

type Props = StackScreenProps<NavigationParam, 'Home'>

export class HomeScreen extends React.Component<Props> {
	private readonly _onColorsPress = () => {
		this.props.navigation.navigate('Colors');
	};

	private readonly _onIconsPress = () => {
		this.props.navigation.navigate('Images');
	};

	private readonly _onFontsPress = () => {
		this.props.navigation.navigate('Fonts');
	};

	private readonly _onBackgroundPress = () => {
		this.props.navigation.navigate('Background');
	};

	render(): React.ReactNode {
		return (
			<View style={styles.root}>
				<View style={styles.navigation}>
					<Button
						title={localize('home_colors')}
						onPress={this._onColorsPress}
					/>
					<Button
						title={localize('home_icons')}
						onPress={this._onIconsPress}
					/>
					<Button
						title={localize('home_fonts')}
						onPress={this._onFontsPress}
					/>
					<Button
						title={localize('home_background')}
						onPress={this._onBackgroundPress}
					/>
				</View>
				<Button
					title={localize('home_discard')}
					onPress={this._removeData} 
				/>
			</View>
		);
	}

	private readonly _removeData = async () => {
		await clearStorage();
		fontState.changeFontFamily();
		imageState.changeBackgroundImage();
		imageState.changeLocalizationImages();
		imageState.changeThemeImages();
		themeState.changeColor();
		fontState.changeFontFamily();
	};
}
