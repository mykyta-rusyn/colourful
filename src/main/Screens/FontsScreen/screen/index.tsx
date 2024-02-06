import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {styles} from './styles';

import {Button, Description, FontFamily, localize, Theme} from '@colourful/general';
import {NavigationParam} from '@colourful/navigation';
import {fontState} from '@colourful/state';
import {Observer} from 'mobx-react';

type Props = StackScreenProps<NavigationParam, 'Fonts'>

export class FontsScreen extends React.Component<Props> {

	private readonly _renderContent = () => {
		const activeFont = fontState.fontFamily;
		const fontFamilyArray = Object.keys(Theme.fonts);
		const FontViews: React.ReactNode[] = [];

		for (let i = 0; i < fontFamilyArray.length; i++) {
			const fontFamily = fontFamilyArray[i] as FontFamily;
			const fontArray = Object.values(Theme.fonts[fontFamily]);
			const tempViews: React.ReactNode[] = [];

			for (let x = 0; x < fontArray.length; x++) {
				const font = fontArray[x];

				tempViews.push(
					<Button
						backgroundColor={
							fontFamily === activeFont
								? '#FF000030'
								: undefined
						}
						fontFamily={font}
						key={font}
						title={font}
					/>
				);
			}

			FontViews.push(
				<View key={fontFamily} style={styles.family}>
					{tempViews}
				</View>
			);
		}

		return (
			<View style={styles.fontsRoot}>
				{FontViews}
			</View>
		);
	};

	render(): React.ReactNode {
		return (
			<View style={styles.root}>
				<Observer>{this._renderContent}</Observer>
				<Button
					backgroundColor={'#00FF0070'}
					title={localize('fonts_toggle')}
					onPress={this._toggleFont}
				/>
				<Description descriptionKey='fonts_description' />
			</View>
		);
	}

	private readonly _toggleFont = () => {
		fontState.toggleFontFamily();
	};
}
