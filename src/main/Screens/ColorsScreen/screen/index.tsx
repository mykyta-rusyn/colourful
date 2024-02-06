import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {styles} from './styles';

import {Button, ChangeColor, ColorModal, Description, localize, ThemeColors, ThemeColorsKey} from '@colourful/general';
import {NavigationParam} from '@colourful/navigation';
import {themeState} from '@colourful/state';
import {Observer} from 'mobx-react';

type Props = StackScreenProps<NavigationParam, 'Colors'>

type State = {
	selectedColor: ChangeColor | undefined
}

export class ColorsScreen extends React.Component<Props, State> {
	state: Readonly<State> = {
		selectedColor: undefined
	};

	private readonly _onUpdateColor = (color: string) => {
		themeState.changeColor({color, key: this.state.selectedColor!.key});
		this._onDiscard();
	};

	private readonly _onDiscard = () => {
		this.setState({selectedColor: undefined});
	};

	private readonly _onColorPress = (color: string, key: ThemeColorsKey) => {
		this.setState({
			selectedColor: {
				color,
				key
			}
		});
	};

	private readonly _renderContent = () => {
		const colors = themeState.colors;
		const ColorButtons: React.ReactNode[] = [];
		const array = Object.keys(colors) as unknown as Array<keyof ThemeColors>;

		for (let i = 0; i < array.length; i++) {
			ColorButtons.push(
				<Button
					key={array[i]}
					title={localize('colors', {
						key: localize(array[i]),
						theme: localize(themeState.theme)
					})}
					onPress={() => (
						this._onColorPress(
							colors[array[i]]!,
							array[i]
						)
					)}
				/>
			);
		}

		return (
			<View style={styles.colorButtons}>
				{ColorButtons}
			</View>
		);
	};

	render(): React.ReactNode {
		return (
			<View style={styles.root}>
				<ColorModal
					initialColor={this.state.selectedColor?.color}
					onDiscard={this._onDiscard}
					onSave={this._onUpdateColor}
				/>
				<Observer>{this._renderContent}</Observer>
				<Description descriptionKey='colors_description' />
			</View>
		);
	}
}
