import React from 'react';
import {DefaultTheme, NavigationContainer, Theme as NavigationTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Background, HeaderButtons, loadBackgroundImage, loadImages, loadSavedLang, loadTheme, Theme, useLocal, useTheme} from '@colourful/general';
import {BackgroundScreen, ColorsScreen, FontsScreen, HomeScreen, IconsScreen, NavigationParam} from '@colourful/screens';
import {hideAsync} from 'expo-splash-screen';
import i18n from 'i18next';

const Stack = createStackNavigator<NavigationParam>();
const navTheme: NavigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
};

export const Navigator: React.FC = () => {
	const {t} = useLocal();
	const {
		activeFont,
		backgroundImage,
		changeBackgroundImage,
		changeImages,
		changeTheme,
		colors,
	} = useTheme();
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [isLayout, setIsLayout] = React.useState(false);
	const [isFontLoaded, setIsFontLoaded] = React.useState(false);

	React.useEffect(() => {
		Promise.all([
			Theme.loadFonts(setIsFontLoaded),
			loadSavedLang(i18n.changeLanguage),
			loadTheme(changeTheme),
			loadImages(changeImages),
			loadBackgroundImage(changeBackgroundImage)
		])
			.then(() => setIsLoaded(true));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (isFontLoaded && isLoaded && isLayout) {
			hideAsync();
		}
	}, [isFontLoaded, isLayout, isLoaded]);

	const onLayout = React.useCallback(() => {
		setIsLayout(true);
	}, []);

	return (
		<Background onLayout={onLayout}>
			<NavigationContainer theme={navTheme}>
				{isFontLoaded
					? <Stack.Navigator
						screenOptions={{
							headerTitleStyle: {
								color: colors.textHeader,
								fontFamily: activeFont.Bold
							},
							headerStyle: {
								backgroundColor: backgroundImage ? 'transparent' : colors.backgroundHeader,
								shadowColor: backgroundImage ? 'transparent' : undefined,
								shadowOffset: backgroundImage ? {
									height: 0,
									width: 0
								} : undefined,
							},
							cardStyle: {
								backgroundColor: backgroundImage ? 'transparent' : colors.background,

							},
							headerRight: HeaderButtons,
						}}
					>
						<Stack.Screen
							component={HomeScreen}
							name='HomeScreen'
							options={{
								headerTitle: t('home_title'),
							}}
						/>
						<Stack.Screen
							component={ColorsScreen}
							name='ColorsScreen'
							options={{
								headerTitle: t('color_title')
							}}
						/>
						<Stack.Screen
							component={IconsScreen}
							name='IconsScreen'
							options={{
								headerTitle: t('icons_title')
							}}
						/>
						<Stack.Screen
							component={FontsScreen}
							name='FontsScreen'
							options={{
								headerTitle: t('fonts_title')
							}}
						/>
						<Stack.Screen
							component={BackgroundScreen}
							name='BackgroundScreen'
							options={{
								headerTitle: t('background_title')
							}}
						/>
					</Stack.Navigator>
					: null
				}
			</NavigationContainer>
		</Background>
	);
};
