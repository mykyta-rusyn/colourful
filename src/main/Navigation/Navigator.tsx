import React from 'react';
import {DefaultTheme, NavigationContainer, Theme as NavigationTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationParam} from './ScreenParams';

import {HeaderRight, localize} from '@colourful/general';
import {BackgroundScreen, ColorsScreen, FontsScreen, HomeScreen, ImagesScreen} from '@colourful/screens';
import {fontState, imageState, themeState} from '@colourful/state';
import {Observer} from 'mobx-react';

const Stack = createStackNavigator<NavigationParam>();
const navTheme: NavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
};

export class Navigator extends React.Component {
	private readonly _renderNavigator = () => {
		const font = fontState.font;
		const backgroundImage = imageState.backgroundImage;
		const colors = themeState.colors;

		return (
			<NavigationContainer theme={navTheme}>
				<Stack.Navigator
					screenOptions={{
						headerTitleStyle: {
							color: colors.textHeader,
							fontFamily: font.Bold
						},
						headerStyle: {
							backgroundColor: backgroundImage ? 'transparent' : colors.backgroundHeader,
							shadowColor: backgroundImage ? 'transparent' : undefined,
						},
						cardStyle: {
							backgroundColor: backgroundImage ? 'transparent' : colors.background,
						},
						headerRight: HeaderRight,
					}}
				>
					<Stack.Screen
						component={HomeScreen}
						name='Home'
						options={{
							headerTitle: localize('home_title'),
						}}
					/>
					<Stack.Screen
						component={ColorsScreen}
						name='Colors'
						options={{
							headerTitle: localize('color_title')
						}}
					/>
					<Stack.Screen
						component={ImagesScreen}
						name='Images'
						options={{
							headerTitle: localize('icons_title')
						}}
					/>
					<Stack.Screen
						component={FontsScreen}
						name='Fonts'
						options={{
							headerTitle: localize('fonts_title')
						}}
					/>
					<Stack.Screen
						component={BackgroundScreen}
						name='Background'
						options={{
							headerTitle: localize('background_title'),
							headerStyle: {
								backgroundColor: colors.backgroundHeader,
							}
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	};

	render(): React.ReactNode {
		return (
			<Observer>
				{this._renderNavigator}
			</Observer>
		);
	}
}
